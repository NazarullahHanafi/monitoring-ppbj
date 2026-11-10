<?php

// CLI-only adapter: the archive application keeps its own credentials and cloud client.
// This file is outside the public webroot and never accepts HTTP input.
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit(1);
}
try {
    $input = json_decode(stream_get_contents(STDIN, 32768), true, flags: JSON_THROW_ON_ERROR);
    $root = realpath($argv[1] ?? '');
    if (! $root || ! is_file($root.'/bootstrap/app.php') || ! is_file($root.'/vendor/autoload.php')) {
        throw new RuntimeException('archive_root');
    }
    chdir($root);
    require $root.'/vendor/autoload.php';
    $app = require $root.'/bootstrap/app.php';
    $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
    $baseUrl = $argv[3] ?? '';
    if (filter_var($baseUrl, FILTER_VALIDATE_URL) && in_array(parse_url($baseUrl, PHP_URL_SCHEME), ['https', 'http'], true)) {
        Illuminate\Support\Facades\URL::forceRootUrl(rtrim($baseUrl, '/'));
        Illuminate\Support\Facades\URL::forceScheme(parse_url($baseUrl, PHP_URL_SCHEME));
    }
    $kind = $input['kind'] ?? '';
    if (! in_array($kind, ['archive_document', 'archive_attachment'], true)) {
        throw new RuntimeException('kind');
    }
    $attachment = $kind === 'archive_attachment';
    $model = $attachment ? new App\Models\DokumenAttachment : new App\Models\Dokumen;
    $documentColumns = ['id', 'judul', 'nomor_surat', 'jenis_dokumen', 'status', 'deleted_at', 'file_path', 'file_checksum', 'perihal', 'pengirim', 'catatan', 'kode_dokumen'];
    $query = $attachment ? $model->newQuery()->select(['id', 'dokumen_id', 'source_module', 'document_number', 'original_name', 'document_type', 'file_path', 'extension', 'remote_item_id', 'content_checksum', 'remote_size', 'size', 'metadata', 'notes', 'cloud_deleted_at', 'storage_provider'])
        ->with(['dokumen' => fn ($q) => $q->withTrashed()->select($documentColumns)]) : $model->newQuery()->withTrashed()->select($documentColumns);
    $sourceDisk = Illuminate\Support\Facades\Storage::disk('public');
    $sourceRoot = realpath($sourceDisk->path(''));
    $describe = function ($row) use ($attachment, $kind, $sourceDisk, $sourceRoot) {
        $parent = $attachment ? $row->dokumen : $row;
        $meta = $attachment ? ($row->metadata ?? []) : [];
        $active = $parent && ! $parent->deleted_at && $parent->status !== 'musnahkan' && (! $attachment || ! $row->cloud_deleted_at);
        $localPath = filled($row->file_path) ? realpath($sourceDisk->path($row->file_path)) : false;
        $hasLocalFile = $localPath && $sourceRoot && str_starts_with($localPath, $sourceRoot.DIRECTORY_SEPARATOR) && is_file($localPath);
        $hasRemoteFile = $attachment && $row->storage_provider === 'onedrive' && filled($row->remote_item_id);
        $active = $active && ($hasLocalFile || $hasRemoteFile);
        if (! $attachment && (mb_strtolower((string) $row->jenis_dokumen) === 'paket simonpr' || str_starts_with((string) $row->kode_dokumen, 'SIMONPR-INBOX-D'))) {
            $active = false;
        }
        $extension = strtolower($attachment ? ($row->extension ?: pathinfo((string) $row->file_path, PATHINFO_EXTENSION)) : pathinfo((string) $row->file_path, PATHINFO_EXTENSION));
        $version = [$row->file_path, $attachment ? $row->remote_item_id : null, $attachment ? $row->content_checksum : $row->file_checksum, $attachment ? ($row->remote_size ?: $row->size) : null];

        return ['kind' => $kind, 'key' => (string) $row->id, 'active' => (bool) $active, 'extension' => $extension,
            'label' => (string) ($attachment ? ($row->original_name ?: $row->document_type) : $row->judul),
            'reference' => (string) ($attachment ? $row->document_number : $row->nomor_surat),
            'pr' => (string) ($parent?->nomor_surat ?? ''),
            'pr_numbers' => array_values(array_filter([$parent?->nomor_surat, $meta['nomor_pr'] ?? null, $meta['nomor_ppbj'] ?? null], 'is_string')),
            'module' => $attachment ? (string) $row->source_module : '',
            'download_target' => $active ? Illuminate\Support\Facades\URL::temporarySignedRoute($attachment ? 'api.archive.attachment.download' : 'api.archive.download', now()->addMinutes(15), [$attachment ? 'attachment' : 'dokumen' => $row->id]) : null,
            'metadata' => mb_substr(implode(' ', array_filter([$parent?->perihal, $parent?->pengirim, $attachment ? $row->notes : $row->catatan, $meta['deskripsi'] ?? null, $meta['nama_vendor'] ?? null], 'is_string')), 0, 8000),
            'version' => hash('sha256', json_encode($version, JSON_INVALID_UTF8_SUBSTITUTE))];
    };
    if (($input['action'] ?? '') === 'manifest') {
        $rows = $query->where('id', '>', max(0, (int) ($input['after'] ?? 0)))->orderBy('id')->limit(min(200, max(1, (int) ($input['limit'] ?? 80))))->get();
        echo json_encode(['rows' => $rows->map($describe)->all(), 'last' => $rows->last()?->id ?? 0], JSON_THROW_ON_ERROR | JSON_INVALID_UTF8_SUBSTITUTE);
        exit(0);
    }
    if (($input['action'] ?? '') !== 'file') {
        throw new RuntimeException('action');
    }
    $row = $query->findOrFail((int) ($input['id'] ?? 0));
    $description = $describe($row);
    if (! $description['active']) {
        throw new RuntimeException('inactive');
    }
    $destination = $input['destination'] ?? '';
    $allowed = realpath($argv[2] ?? '');
    if (! $allowed || realpath(dirname($destination)) !== $allowed || ! preg_match('/^[a-f0-9]{32}\.bin$/D', basename($destination))) {
        throw new RuntimeException('destination');
    }
    $max = min(30 * 1024 * 1024, max(1, (int) ($input['max_bytes'] ?? 0)));
    $disk = Illuminate\Support\Facades\Storage::disk('public');
    $path = filled($row->file_path) ? realpath($disk->path($row->file_path)) : false;
    $diskRoot = realpath($disk->path(''));
    $in = null;
    if ($path && $diskRoot && str_starts_with($path, $diskRoot.DIRECTORY_SEPARATOR) && is_file($path)) {
        if (filesize($path) > $max) {
            throw new RuntimeException('size');
        }
        $in = fopen($path, 'rb');
    } elseif ($attachment && $row->storage_provider === 'onedrive' && filled($row->remote_item_id)) {
        if ((int) ($row->remote_size ?: $row->size) > $max) {
            throw new RuntimeException('size');
        }
        $url = app(App\Services\OneDriveService::class)->temporaryDownloadUrl($row->remote_item_id);
        $response = Illuminate\Support\Facades\Http::connectTimeout(5)->timeout(35)->withOptions(['stream' => true, 'allow_redirects' => false])->get($url)->throw();
        $in = $response->toPsrResponse()->getBody()->detach();
    }
    if (! is_resource($in)) {
        throw new RuntimeException('missing');
    }
    $out = fopen($destination, 'xb');
    if (! $out) {
        throw new RuntimeException('destination');
    }
    chmod($destination, 0600);
    try {
        $size = stream_copy_to_stream($in, $out, $max + 1);
    } finally {
        fclose($in);
        fclose($out);
    }
    if (! $size || $size > $max) {
        unlink($destination);
        throw new RuntimeException('size');
    }
    $checksum = hash_file('sha256', $destination);
    $expected = $attachment ? $row->content_checksum : $row->file_checksum;
    if (is_string($expected) && preg_match('/^[a-f0-9]{64}$/iD', $expected) && ! hash_equals(strtolower($expected), $checksum)) {
        unlink($destination);
        throw new RuntimeException('checksum');
    }
    echo json_encode($description + ['checksum' => $checksum, 'size' => $size], JSON_THROW_ON_ERROR | JSON_INVALID_UTF8_SUBSTITUTE);
} catch (Throwable $error) {
    // No tokens, file paths, document contents, or cloud download URLs in logs/stdout.
    fwrite(STDERR, 'ARCHIVE_BRIDGE_FAILED'.PHP_EOL);
    exit(1);
}
