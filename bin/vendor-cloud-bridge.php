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
    if (! preg_match('~^SIMONPR-Vendor/[0-9]{4}/(?:0[1-9]|1[0-2])/[0-9a-f-]{36}\.(pdf|jpg|png)$~D', $path)) {
        throw new RuntimeException('path');
    }
    $item = null;
    $lookup = function () use ($cloud, $path, $input) {
        $itemId = $input['item_id'] ?? null;
        if ($itemId !== null && (! is_string($itemId) || strlen($itemId) > 255 || $itemId === '')) {
            throw new RuntimeException('item');
        }
        $url = $itemId ? 'https://graph.microsoft.com/v1.0/me/drive/items/'.rawurlencode($itemId)
            : 'https://graph.microsoft.com/v1.0/me/drive/root:/'.implode('/', array_map('rawurlencode', explode('/', $path)));
        $response = Illuminate\Support\Facades\Http::withToken($cloud->accessToken())->timeout(30)
            ->get($url, ['$select' => 'id,size']);
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
        $segments = explode('/', $path);
        $name = array_pop($segments);
        $item = $cloud->upload($destination, $name, 'application/octet-stream', $segments);
        $id = $item['item_id'];
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
    $response = Illuminate\Support\Facades\Http::withToken($cloud->accessToken())->timeout(120)
        ->withOptions(['allow_redirects' => true, 'progress' => function ($total, $downloaded) use ($size) {
            if ($total > $size || $downloaded > $size) {
                throw new RuntimeException('download exceeds size');
            }
        }])->get('https://graph.microsoft.com/v1.0/me/drive/items/'.rawurlencode($id).'/content')->throw();
    $body = $response->body();
    if (strlen($body) !== $size || ! hash_equals($checksum, hash('sha256', $body))) {
        throw new RuntimeException('cloud integrity');
    }
    if ($action === 'download') {
        $handle = fopen($destination, 'x+b');
        if (! $handle) {
            throw new RuntimeException('destination');
        }
        try {
            chmod($destination, 0600);
            if (fwrite($handle, $body) !== $size) {
                throw new RuntimeException('write');
            }
        } finally {
            fclose($handle);
        }
    }
    echo json_encode(['ok' => true, 'item_id' => $id, 'verified' => true]);
} catch (Throwable $e) {
    // Keep cloud responses, identifiers, tokens and document text out of logs.
    fwrite(STDERR, "Vendor cloud operation failed.\n");
    exit(1);
}
