<?php

namespace App\Services;

/** Private SSH-only transport: originals remain private and the database stays on hosting. */
class ProcurementStdioOcrProcessor extends ProcurementOcrProcessor
{
    protected function deepReader(): bool
    {
        return true;
    }

    public function read(string $file, string $extension, int $start = 1, ?int $count = null, ?int $pixels = null): array
    {
        if (PHP_SAPI !== 'cli') {
            throw new \RuntimeException('cli_only');
        }
        $allowed = realpath(storage_path('app/private/procurement-search/work'));
        $path = realpath($file);
        if (! $allowed || ! $path || dirname($path) !== $allowed || filesize($path) > 30 * 1024 * 1024) {
            throw new \RuntimeException('offload_path');
        }
        $id = bin2hex(random_bytes(16));
        $checksum = hash_file('sha256', $path);
        fwrite(STDOUT, json_encode(['type' => 'ocr', 'id' => $id, 'path' => $path, 'checksum' => $checksum, 'bytes' => filesize($path), 'extension' => $extension, 'start' => $start, 'count' => 1, 'max_pixels' => 8000000, 'profile' => 'deep'], JSON_THROW_ON_ERROR)."\n");
        fflush(STDOUT);
        stream_set_blocking(STDIN, false);
        $raw = '';
        $deadline = microtime(true) + 175;
        try {
            while (! str_contains($raw, "\n")) {
                if (microtime(true) > $deadline || feof(STDIN)) {
                    throw new \RuntimeException('offload_timeout');
                }
                $read = [STDIN];
                $write = $except = null;
                $ready = stream_select($read, $write, $except, 1);
                if ($ready === false) {
                    throw new \RuntimeException('offload_transport');
                }
                if ($ready) {
                    $chunk = fread(STDIN, 65536);
                    if ($chunk === false) {
                        throw new \RuntimeException('offload_transport');
                    }$raw .= $chunk;
                }
                if (strlen($raw) > 6 * 1024 * 1024) {
                    throw new \RuntimeException('offload_result_limit');
                }
            }
        } finally {
            stream_set_blocking(STDIN, true);
        }
        $packet = json_decode(trim($raw), true, flags: JSON_THROW_ON_ERROR);
        if (($packet['id'] ?? null) !== $id || ($packet['checksum'] ?? null) !== $checksum || isset($packet['error'])) {
            throw new \RuntimeException('offload_failed');
        }

        return $this->validateReadResult($packet['result'] ?? null, $start, 1);
    }
}
