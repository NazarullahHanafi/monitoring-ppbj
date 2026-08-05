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
        $sourcePath = $response->getFile()->getPathname();

        if (! is_file($sourcePath) || filesize($sourcePath) <= 0) {
            abort(500, 'File preview gagal dibuat.');
        }

        $filename = self::filenameFromResponse($response) ?: $fallbackFilename;
        $filename = self::sanitizeFilename($filename);
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION) ?: pathinfo($sourcePath, PATHINFO_EXTENSION) ?: 'docx');
        $token = (string) Str::uuid();
        $userId = (int) auth()->id();
        $directory = self::DIRECTORY.'/'.$userId;

        self::cleanupOldFiles($directory);

        $baseName = pathinfo($filename, PATHINFO_FILENAME);
        $storedName = $token.'-'.$baseName.'.'.$extension;
        $relativePath = $directory.'/'.$storedName;
        $targetPath = storage_path('app/'.$relativePath);

        if (! is_dir(dirname($targetPath))) {
            mkdir(dirname($targetPath), 0775, true);
        }

        copy($sourcePath, $targetPath);
        @unlink($sourcePath);

        Cache::put(self::CACHE_PREFIX.$token, [
            'user_id' => $userId,
            'path' => $relativePath,
            'filename' => $filename,
            'extension' => $extension,
            'created_at' => now()->toDateTimeString(),
        ], now()->addMinutes(self::TTL_MINUTES));

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
        $preview = Cache::get(self::CACHE_PREFIX.$token);

        if (! is_array($preview)) {
            abort(404, 'Preview sudah kedaluwarsa. Silakan buka ulang dari SIMONPR.');
        }

        if ((int) ($preview['user_id'] ?? 0) !== (int) auth()->id()) {
            abort(403, 'Preview ini bukan milik sesi login Anda.');
        }

        $path = storage_path('app/'.ltrim((string) ($preview['path'] ?? ''), '/\\'));

        if (! is_file($path)) {
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
        $extension = pathinfo($filename, PATHINFO_EXTENSION);
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

        foreach (glob($absoluteDirectory.'/*') ?: [] as $file) {
            if (is_file($file) && filemtime($file) < $threshold) {
                @unlink($file);
            }
        }
    }
}
