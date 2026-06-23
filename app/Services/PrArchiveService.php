<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class PrArchiveService
{
    public function findByPrNumber(?string $prNumber, bool $fresh = false): array
    {
        $prNumber = trim((string) $prNumber);

        if ($prNumber === '') {
            return $this->result('empty', 'Nomor PR belum tersedia.');
        }

        $baseUrl = rtrim((string) config('services.pr_archive.base_url'), '/');

        if ($baseUrl === '') {
            return $this->result(
                'unconfigured',
                'Koneksi ke sistem arsip belum dikonfigurasi.',
                ['configured' => false]
            );
        }

        $cacheKey = 'pr_archive:' . hash('sha256', $baseUrl . '|' . $prNumber);

        if ($fresh) {
            Cache::forget($cacheKey);
        }

        return Cache::remember(
            $cacheKey,
            max(30, (int) config('services.pr_archive.cache_seconds', 300)),
            fn () => $this->requestArchive($baseUrl, $prNumber)
        );
    }

    private function requestArchive(string $baseUrl, string $prNumber): array
    {
        $path = (string) config('services.pr_archive.pr_path', '/api/pr/documents');
        $url = $this->buildLookupUrl($baseUrl, $path, $prNumber);
        $token = trim((string) config('services.pr_archive.token'));

        try {
            $request = Http::acceptJson()
                ->connectTimeout(max(1, (int) config('services.pr_archive.connect_timeout', 2)))
                ->timeout(max(2, (int) config('services.pr_archive.timeout', 5)));

            if ($token !== '') {
                $request = $request->withToken($token);
            }

            $response = $request->get($url);

            if ($response->status() === 404) {
                return $this->result('empty', 'Belum ada arsip atau laporan untuk PR ini.');
            }

            if (!$response->successful()) {
                Log::warning('Pengecekan arsip PR gagal.', [
                    'pr_number' => $prNumber,
                    'status' => $response->status(),
                ]);

                return $this->result('unavailable', 'Sistem arsip sedang tidak dapat memberikan data.');
            }

            $payload = $response->json();

            if (!is_array($payload)) {
                return $this->result('unavailable', 'Format jawaban sistem arsip tidak dikenali.');
            }

            $documents = $this->normaliseDocuments($payload, $baseUrl);
            $reportedCount = (int) (Arr::get($payload, 'document_count')
                ?? Arr::get($payload, 'data.document_count')
                ?? count($documents));
            $hasArchive = (bool) (Arr::get($payload, 'has_archive')
                ?? Arr::get($payload, 'data.has_archive')
                ?? ($reportedCount > 0 || count($documents) > 0));
            $documentCount = max($reportedCount, count($documents));

            if (!$hasArchive && $documentCount === 0) {
                return $this->result('empty', 'Belum ada arsip atau laporan untuk PR ini.');
            }

            return $this->result(
                'available',
                $documentCount . ' dokumen arsip ditemukan.',
                [
                    'has_archive' => true,
                    'document_count' => $documentCount,
                    'documents' => $documents,
                ]
            );
        } catch (ConnectionException $exception) {
            Log::notice('Sistem arsip PR tidak dapat dihubungi.', [
                'pr_number' => $prNumber,
                'message' => $exception->getMessage(),
            ]);
        } catch (Throwable $exception) {
            report($exception);
        }

        return $this->result('unavailable', 'Sistem arsip sedang tidak dapat dihubungi.');
    }

    private function normaliseDocuments(array $payload, string $baseUrl): array
    {
        $items = Arr::get($payload, 'documents')
            ?? Arr::get($payload, 'data.documents')
            ?? Arr::get($payload, 'files')
            ?? Arr::get($payload, 'data.files')
            ?? Arr::get($payload, 'data');

        if (!is_array($items) || !array_is_list($items)) {
            return [];
        }

        return collect($items)
            ->filter(fn ($item) => is_array($item))
            ->map(function (array $item) use ($baseUrl) {
                $url = $item['download_url']
                    ?? $item['file_url']
                    ?? $item['url']
                    ?? $item['link']
                    ?? $item['path']
                    ?? null;

                return [
                    'id' => $item['id'] ?? null,
                    'name' => (string) ($item['name']
                        ?? $item['title']
                        ?? $item['filename']
                        ?? $item['nama_dokumen']
                        ?? $item['nama']
                        ?? 'Dokumen arsip'),
                    'type' => (string) ($item['type'] ?? $item['category'] ?? $item['mime_type'] ?? 'PDF'),
                    'date' => $item['date'] ?? $item['uploaded_at'] ?? $item['created_at'] ?? null,
                    'size' => $item['size_label'] ?? $item['size'] ?? null,
                    'download_url' => $this->normaliseUrl($url, $baseUrl),
                ];
            })
            ->values()
            ->all();
    }

    private function buildLookupUrl(string $baseUrl, string $path, string $prNumber): string
    {
        if (str_contains($path, '{nomor_pr}')) {
            $path = str_replace('{nomor_pr}', rawurlencode($prNumber), $path);

            return $baseUrl . '/' . ltrim($path, '/');
        }

        $separator = str_contains($path, '?') ? '&' : '?';

        return $baseUrl . '/' . ltrim($path, '/') . $separator . http_build_query([
            'nomor_pr' => $prNumber,
        ], '', '&', PHP_QUERY_RFC3986);
    }

    private function normaliseUrl(mixed $url, string $baseUrl): ?string
    {
        if (!is_string($url) || trim($url) === '') {
            return null;
        }

        $url = trim($url);

        if (preg_match('#^https?://#i', $url)) {
            return $url;
        }

        if (str_starts_with($url, '/')) {
            $parts = parse_url($baseUrl);
            $origin = ($parts['scheme'] ?? 'https') . '://' . ($parts['host'] ?? '');

            if (isset($parts['port'])) {
                $origin .= ':' . $parts['port'];
            }

            return $origin . $url;
        }

        return $baseUrl . '/' . ltrim($url, '/');
    }

    private function result(string $state, string $message, array $extra = []): array
    {
        return array_merge([
            'configured' => true,
            'state' => $state,
            'has_archive' => false,
            'document_count' => 0,
            'documents' => [],
            'message' => $message,
            'checked_at' => now()->toIso8601String(),
        ], $extra);
    }
}
