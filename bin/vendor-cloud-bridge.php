<?php

// CLI only. Bootstrap the archive app in a clean child environment so its
// encrypted OneDrive credentials never enter the web application or browser.
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit(1);
}
try {
    $input = json_decode(stream_get_contents(STDIN, 16384), true, flags: JSON_THROW_ON_ERROR);
    $root = realpath($argv[1] ?? '');
    $work = realpath($argv[2] ?? '');
    if (! $root || ! $work || ! is_file($root.'/bootstrap/app.php')) {
        throw new RuntimeException('configuration');
    }
    chdir($root);
    require $root.'/vendor/autoload.php';
    $app = require $root.'/bootstrap/app.php';
    $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
    $cloud = app(App\Services\OneDriveService::class);
    $action = $input['action'] ?? '';
    if ($action === 'status') {
        echo json_encode(['ok' => true, 'connected' => $cloud->isConnected()]);
        exit;
    }
    $path = $input['cloud_path'] ?? '';
    require_once dirname(__DIR__).'/app/Support/ProcurementUploadFormats.php';
    if (! preg_match('~^SIMONPR-Vendor/[0-9]{4}/(?:0[1-9]|1[0-2])/[0-9a-f-]{36}\.([a-z0-9]{2,5})$~D', $path, $pathMatch)
        || ! isset(App\Support\ProcurementUploadFormats::FORMATS[$pathMatch[1]])) {
        throw new RuntimeException('path');
    }
    $item = null;
    $token = $cloud->accessToken();
    $lookup = function (?string $specificId = null) use ($token, $path, $input) {
        $itemId = $specificId ?? $input['item_id'] ?? null;
        if ($itemId !== null && (! is_string($itemId) || strlen($itemId) > 255 || $itemId === '')) {
            throw new RuntimeException('item');
        }
        $url = $itemId ? 'https://graph.microsoft.com/v1.0/me/drive/items/'.rawurlencode($itemId)
            : 'https://graph.microsoft.com/v1.0/me/drive/root:/'.implode('/', array_map('rawurlencode', explode('/', $path)));
        $response = Illuminate\Support\Facades\Http::withToken($token)->connectTimeout(10)->timeout(30)
            ->get($url, ['$select' => 'id,size,eTag']);
        if ($response->status() === 404) {
            return null;
        }
        $response->throw();

        return $response->json();
    };
    if ($action === 'delete') {
        $item = $lookup();
        if ($item) {
            $cloud->delete($item['id']);
        }
        echo json_encode(['ok' => true]);
        exit;
    }
    if ($action === 'link') {
        $item = $lookup();
        if (! $item || (int) $item['size'] !== (int) ($input['size'] ?? 0) || empty($input['etag'])
            || ! hash_equals($input['etag'], $item['eTag'] ?? '')) {
            throw new RuntimeException('download integrity');
        }
        $response = Illuminate\Support\Facades\Http::withToken($token)->connectTimeout(10)->timeout(20)
            ->withOptions(['allow_redirects' => false])->get('https://graph.microsoft.com/v1.0/me/drive/items/'.rawurlencode($item['id']).'/content');
        $response->throw();
        if (! $response->redirect()) {
            throw new RuntimeException('download link');
        }
        echo json_encode(['ok' => true, 'url' => $response->header('Location')]);
        exit;
    }
    $local = $input['local'] ?? '';
    if (! preg_match('/^[0-9a-f]{32}\.bin$/D', $local)) {
        throw new RuntimeException('local');
    }
    $destination = $work.DIRECTORY_SEPARATOR.$local;
    if (is_link($destination)) {
        throw new RuntimeException('symlink');
    }
    $checksum = $input['checksum'] ?? '';
    $size = (int) ($input['size'] ?? 0);
    if (! preg_match('/^[a-f0-9]{64}$/D', $checksum) || $size < 1 || $size > 10 * 1024 * 1024) {
        throw new RuntimeException('size');
    }
    if ($action === 'upload') {
        if (! is_file($destination) || filesize($destination) !== $size || ! hash_equals($checksum, hash_file('sha256', $destination))) {
            throw new RuntimeException('upload integrity');
        }
        // Existing monthly folders need one PUT, rather than resolving every
        // ancestor for every upload. Only a missing parent uses provisioning.
        $stream = fopen($destination, 'rb');
        try {
            $response = Illuminate\Support\Facades\Http::withToken($token)->connectTimeout(10)->timeout(120)
                ->withBody($stream, 'application/octet-stream')->put('https://graph.microsoft.com/v1.0/me/drive/root:/'.implode('/', array_map('rawurlencode', explode('/', $path))).':/content');
        } finally {
            fclose($stream);
        }
        if ($response->status() === 404) {
            $segments = explode('/', $path);
            $name = array_pop($segments);
            $uploaded = $cloud->upload($destination, $name, 'application/octet-stream', $segments);
            $item = $lookup($uploaded['item_id']);
        } else {
            $response->throw();
            $item = $response->json();
        }
        if (empty($item['id']) || (int) ($item['size'] ?? 0) !== $size) {
            throw new RuntimeException('upload integrity');
        }
        $id = $item['id'];
    } elseif ($action === 'download') {
        $item = $lookup();
        if (! $item || (int) $item['size'] !== $size || file_exists($destination)) {
            throw new RuntimeException('download integrity');
        }
        $id = $item['id'];
    } else {
        throw new RuntimeException('action');
    }
    // Verify cloud bytes before acknowledging success. Bound every transfer to
    // the validated ten MiB file size; no original is retained on hosting.
    $verifiedPath = $action === 'download' ? $destination : $work.DIRECTORY_SEPARATOR.bin2hex(random_bytes(16)).'.bin';
    $handle = fopen($verifiedPath, 'x+b');
    if (! $handle) {
        throw new RuntimeException('destination');
    }
    chmod($verifiedPath, 0600);
    try {
        $downloadResponse = Illuminate\Support\Facades\Http::withToken($token)->connectTimeout(10)->timeout(120)
            ->withOptions(['sink' => $handle, 'allow_redirects' => true, 'progress' => function ($total, $downloaded) use ($size) {
                if ($total > $size || $downloaded > $size) {
                    throw new RuntimeException('download exceeds size');
                }
            }])->get('https://graph.microsoft.com/v1.0/me/drive/items/'.rawurlencode($id).'/content')->throw();
    } finally {
        if (is_resource($handle)) {
            fclose($handle);
        }
    }
    clearstatcache(true, $verifiedPath);
    if (filesize($verifiedPath) !== $size || ! hash_equals($checksum, hash_file('sha256', $verifiedPath))) {
        throw new RuntimeException('cloud integrity');
    }
    if ($action === 'upload') {
        unlink($verifiedPath);
        $verifiedPath = null;
    }
    echo json_encode(['ok' => true, 'item_id' => $id, 'etag' => $item['eTag'] ?? null, 'verified' => true]);
} catch (Throwable $e) {
    if (isset($verifiedPath) && $verifiedPath && is_file($verifiedPath)) {
        @unlink($verifiedPath);
    }
    // Keep cloud responses, identifiers, tokens and document text out of logs.
    $reason = 'cloud';
    if ($e instanceof Illuminate\Http\Client\RequestException) {
        $reason = in_array($e->response->status(), [401, 403], true) ? 'authentication' : ($e->response->status() === 429 ? 'busy' : 'cloud');
    } elseif ($e instanceof RuntimeException && in_array($e->getMessage(), ['upload integrity', 'download integrity', 'cloud integrity', 'download exceeds size'], true)) {
        $reason = 'integrity';
    }
    echo json_encode(['ok' => false, 'error' => $reason]);
    fwrite(STDERR, "Vendor cloud operation failed.\n");
    exit(1);
}
