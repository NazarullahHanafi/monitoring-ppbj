<?php

namespace App\Http\Controllers;

use App\Services\PrArchiveService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class ArchiveDownloadGatewayController extends Controller
{
    public function __invoke(Request $request, PrArchiveService $archiveService): RedirectResponse
    {
        $validated = $request->validate([
            'pr' => ['required', 'string', 'max:160'],
            'file' => ['required', 'string', 'max:160', 'regex:/^[A-Za-z0-9._:-]+$/'],
            'action' => ['required', Rule::in(['preview', 'download', 'package'])],
        ]);

        // PrArchiveService caches metadata for less time than the archive signature lifetime.
        // Reusing that short cache keeps downloads fast while an old page still receives a
        // newly resolved URL once its metadata cache has expired.
        $archive = $archiveService->findByPrNumber($validated['pr']);
        $target = $this->resolveTarget($archive, $validated['file'], $validated['action']);

        abort_if($target === null, 404, 'Tautan arsip tidak ditemukan atau sudah tidak tersedia.');

        if (! $this->isTrustedArchiveUrl($target)) {
            Log::warning('Redirect gateway arsip ditolak karena target tidak tepercaya.', [
                'pr_hash' => hash('sha256', $validated['pr']),
                'file' => $validated['file'],
                'action' => $validated['action'],
                'target_host' => parse_url($target, PHP_URL_HOST),
            ]);

            abort(404, 'Tautan arsip tidak valid.');
        }

        return redirect()->away($target, 302, [
            'Cache-Control' => 'no-store, private, max-age=0',
            'Pragma' => 'no-cache',
            'Referrer-Policy' => 'no-referrer',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    private function resolveTarget(array $archive, string $fileId, string $action): ?string
    {
        $collection = $action === 'package'
            ? ($archive['packages'] ?? [])
            : ($archive['documents'] ?? []);

        $item = collect($collection)->first(
            fn ($entry) => is_array($entry) && (string) ($entry['id'] ?? '') === $fileId
        );

        if (! is_array($item)) {
            return null;
        }

        $target = match ($action) {
            'preview' => $item['preview_url'] ?? $item['download_url'] ?? null,
            'download' => $item['download_url'] ?? null,
            'package' => $item['package_download_url'] ?? null,
        };

        return is_string($target) && $target !== '' ? $target : null;
    }

    private function isTrustedArchiveUrl(string $target): bool
    {
        $baseUrl = rtrim((string) config('services.pr_archive.base_url'), '/');
        $targetParts = parse_url($target);
        $baseParts = parse_url($baseUrl);

        if (! is_array($targetParts) || ! is_array($baseParts)) {
            return false;
        }

        $targetScheme = strtolower((string) ($targetParts['scheme'] ?? ''));
        $baseScheme = strtolower((string) ($baseParts['scheme'] ?? ''));
        $targetHost = strtolower((string) ($targetParts['host'] ?? ''));
        $baseHost = strtolower((string) ($baseParts['host'] ?? ''));
        $targetPort = (int) ($targetParts['port'] ?? ($targetScheme === 'https' ? 443 : 80));
        $basePort = (int) ($baseParts['port'] ?? ($baseScheme === 'https' ? 443 : 80));
        $path = (string) ($targetParts['path'] ?? '');

        return $targetScheme !== ''
            && $targetScheme === $baseScheme
            && $targetHost !== ''
            && hash_equals($baseHost, $targetHost)
            && $targetPort === $basePort
            && str_starts_with($path, '/api/archive/');
    }
}
