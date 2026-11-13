<?php

namespace App\Support;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PrintPreviewFile
{
    public const CACHE_PREFIX = 'print-preview:file:';

    public const DIRECTORY = 'print-previews';

    public const TTL_MINUTES = 90;

    public static function store(BinaryFileResponse $response, string $fallbackFilename = 'dokumen.docx'): array
    {
        $userId = (int) auth()->id();
        abort_unless($userId > 0, 401);
        $sourcePath = $response->getFile()->getPathname();

        if (! is_file($sourcePath) || filesize($sourcePath) <= 0) {
            abort(500, 'File preview gagal dibuat.');
        }

        $filename = self::filenameFromResponse($response) ?: $fallbackFilename;
        $filename = self::sanitizeFilename($filename);
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION) ?: pathinfo($sourcePath, PATHINFO_EXTENSION) ?: 'docx');
        $token = (string) Str::uuid();
        $directory = self::DIRECTORY.'/'.$userId;

        if (Cache::add('print-preview:cleanup:'.$userId, true, 600)) {
            self::cleanupOldFiles($directory);
        }

        // Storage paths do not need the display name (which can exceed a
        // filesystem's byte limit for long Unicode document titles).
        $storedName = $token.'.'.$extension;
        $relativePath = $directory.'/'.$storedName;
        $targetPath = storage_path('app/'.$relativePath);

        if (! is_dir(dirname($targetPath)) && ! @mkdir(dirname($targetPath), 0700, true) && ! is_dir(dirname($targetPath))) {
            throw new \RuntimeException('Direktori preview belum dapat dibuat.');
        }

        $temporary = @tempnam(dirname($targetPath), '.preview-');
        if ($temporary === false) {
            throw new \RuntimeException('Berkas sementara preview belum dapat dibuat.');
        }
        if (realpath(dirname($temporary)) !== realpath(dirname($targetPath))) {
            @unlink($temporary);
            throw new \RuntimeException('Berkas sementara preview harus berada di direktori privat.');
        }
        try {
            $hash = hash_file('sha256', $sourcePath);
            if ($hash === false || ! @copy($sourcePath, $temporary)
                || ! hash_equals($hash, (string) @hash_file('sha256', $temporary))
                || ! @rename($temporary, $targetPath)) {
                throw new \RuntimeException('Salinan preview belum dapat diverifikasi. Berkas sumber tetap dipertahankan.');
            }

            $payload = self::urls($token, $filename, $extension);
            if (! Cache::put(self::CACHE_PREFIX.$token, [
                'user_id' => $userId,
                'path' => $relativePath,
                'filename' => $filename,
                'extension' => $extension,
                'sha256' => $hash,
                'created_at' => now()->toDateTimeString(),
            ], now()->addMinutes(self::TTL_MINUTES))) {
                throw new \RuntimeException('Preview belum dapat didaftarkan. Berkas sumber tetap dipertahankan.');
            }
        } catch (\Throwable $error) {
            @unlink($temporary);
            @unlink($targetPath);
            throw $error;
        }

        @unlink($sourcePath);

        return $payload;
    }

    private static function urls(string $token, string $filename, string $extension): array
    {
        $fileUrl = URL::temporarySignedRoute(
            'document-previews.file',
            now()->addMinutes(self::TTL_MINUTES),
            ['token' => $token]
        );

        $downloadUrl = URL::temporarySignedRoute(
            'document-previews.file',
            now()->addMinutes(self::TTL_MINUTES),
            ['token' => $token, 'download' => 1]
        );

        $frameUrl = in_array($extension, ['doc', 'docx'], true)
            ? URL::temporarySignedRoute(
                'laravel-file-viewer.docx-frame',
                now()->addMinutes(self::TTL_MINUTES),
                ['url' => $fileUrl]
            )
            : null;

        return [
            'token' => $token,
            'filename' => $filename,
            'fileUrl' => $fileUrl,
            'downloadUrl' => $downloadUrl,
            'previewFrameUrl' => $frameUrl,
            'extension' => $extension,
            'expiresText' => now()->addMinutes(self::TTL_MINUTES)->format('d/m/Y H:i'),
        ];
    }

    public static function resolve(string $token): array
    {
        abort_unless(auth()->check(), 401);
        abort_unless(Str::isUuid($token), 404);
        $preview = Cache::get(self::CACHE_PREFIX.$token);

        if (! is_array($preview)) {
            abort(404, 'Preview sudah kedaluwarsa. Silakan buka ulang dari SIMONPR.');
        }

        if ((int) ($preview['user_id'] ?? 0) !== (int) auth()->id()) {
            abort(403, 'Preview ini bukan milik sesi login Anda.');
        }

        $base = realpath(storage_path('app/'.self::DIRECTORY));
        $path = realpath(storage_path('app/'.ltrim((string) ($preview['path'] ?? ''), '/\\')));
        $ownerDirectory = $base.DIRECTORY_SEPARATOR.(int) auth()->id().DIRECTORY_SEPARATOR;

        if ($base === false || $path === false || ! is_file($path) || ! str_starts_with($path, $ownerDirectory)) {
            Cache::forget(self::CACHE_PREFIX.$token);
            abort(404, 'File preview sudah tidak tersedia. Silakan buka ulang dari SIMONPR.');
        }

        $preview['absolute_path'] = $path;

        return $preview;
    }

    private static function filenameFromResponse(BinaryFileResponse $response): ?string
    {
        $disposition = (string) $response->headers->get('Content-Disposition');

        if (preg_match("/filename\\*=UTF-8''([^;]+)/i", $disposition, $match)) {
            return urldecode(trim($match[1], "\"' "));
        }

        if (preg_match('/filename="?([^";]+)"?/i', $disposition, $match)) {
            return trim($match[1], "\"' ");
        }

        return null;
    }

    private static function sanitizeFilename(string $filename): string
    {
        $filename = trim($filename);
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        $extension = preg_match('/^[a-z0-9]{1,10}$/', $extension) ? $extension : 'docx';
        $baseName = pathinfo($filename, PATHINFO_FILENAME);
        $baseName = preg_replace('/[^\pL\pN\s._-]+/u', ' ', $baseName) ?: 'dokumen';
        $baseName = trim(preg_replace('/\s+/', ' ', $baseName));
        $baseName = Str::limit($baseName, 120, '');

        return $extension ? $baseName.'.'.strtolower($extension) : $baseName.'.docx';
    }

    private static function cleanupOldFiles(string $directory): void
    {
        $absoluteDirectory = storage_path('app/'.$directory);

        if (! is_dir($absoluteDirectory)) {
            return;
        }

        $threshold = now()->subHours(3)->getTimestamp();

        foreach (new \DirectoryIterator($absoluteDirectory) as $file) {
            if ($file->isFile() && ! $file->isLink() && $file->getMTime() < $threshold) {
                @unlink($file->getPathname());
            }
        }
    }
}
