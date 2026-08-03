<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\UploadedFile;
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

    public function uploadDocument(array $metadata, UploadedFile $file): array
    {
        $baseUrl = rtrim((string) config('services.pr_archive.base_url'), '/');

        if ($baseUrl === '') {
            return $this->result(
                'unconfigured',
                'Upload arsip belum bisa dipakai karena koneksi ke Sistem Arsip belum dikonfigurasi.',
                ['configured' => false]
            );
        }

        $path = (string) config('services.pr_archive.upload_path', '/api/documents');
        $url = $baseUrl . '/' . ltrim($path, '/');
        $token = trim((string) config('services.pr_archive.token'));

        try {
            $request = Http::acceptJson()
                ->connectTimeout(max(1, (int) config('services.pr_archive.connect_timeout', 2)))
                ->timeout(max(5, (int) config('services.pr_archive.timeout', 8)));

            if ($token !== '') {
                $request = $request->withToken($token);
            }

            $response = $request
                ->attach('file', file_get_contents($file->getRealPath()), $file->getClientOriginalName())
                ->post($url, $this->cleanUploadMetadata($metadata));

            if ($response->status() === 409) {
                $payload = $response->json();
                $previousDocument = is_array($payload)
                    ? $this->normaliseUploadedDocument(['document' => Arr::get($payload, 'previous_document', [])], $baseUrl)
                    : [];

                return $this->result('duplicate', $payload['message'] ?? 'Dokumen dengan jenis yang sama sudah pernah diupload.', [
                    'has_archive' => true,
                    'document_count' => 1,
                    'previous_document' => $previousDocument,
                ]);
            }

            if (!$response->successful()) {
                Log::warning('Upload dokumen ke sistem arsip gagal.', [
                    'status' => $response->status(),
                    'source_module' => $metadata['source_module'] ?? null,
                    'nomor_pr' => $metadata['nomor_pr'] ?? null,
                    'nomor_dokumen' => $metadata['nomor_dokumen'] ?? null,
                ]);

                return $this->result(
                    $response->status() === 404 ? 'unavailable' : 'failed',
                    $response->status() === 404
                        ? 'Endpoint upload Sistem Arsip belum tersedia.'
                        : 'Dokumen belum berhasil dikirim ke Sistem Arsip.'
                );
            }

            $payload = $response->json();
            $document = is_array($payload) ? $this->normaliseUploadedDocument($payload, $baseUrl) : [];

            $this->forgetPrCache((string) ($metadata['nomor_pr'] ?? ''));

            return $this->result('uploaded', 'Dokumen berhasil dikirim ke Sistem Arsip.', [
                'has_archive' => true,
                'document_count' => 1,
                'document' => $document,
                'replaced' => (bool) ($payload['replaced'] ?? false),
            ]);
        } catch (Throwable $exception) {
            report($exception);
        }

        return $this->result('unavailable', 'Sistem arsip sedang tidak dapat menerima upload dokumen.');
    }

    public function forgetPrCache(?string $prNumber): void
    {
        $prNumber = trim((string) $prNumber);
        $baseUrl = rtrim((string) config('services.pr_archive.base_url'), '/');

        if ($prNumber === '' || $baseUrl === '') {
            return;
        }

        Cache::forget('pr_archive:' . hash('sha256', $baseUrl . '|' . $prNumber));
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
            $packages = $this->normalisePackages($payload, $baseUrl);
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
                    'packages' => $packages,
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
                $previewUrl = $item['preview_url']
                    ?? $item['view_url']
                    ?? $url;

                return [
                    'id' => $item['id'] ?? $item['attachment_id'] ?? null,
                    'name' => (string) ($item['name']
                        ?? $item['title']
                        ?? $item['filename']
                        ?? $item['nama_dokumen']
                        ?? $item['nama']
                        ?? 'Dokumen arsip'),
                    'type' => (string) ($item['type'] ?? $item['category'] ?? $item['mime_type'] ?? 'PDF'),
                    'date' => $item['date'] ?? $item['uploaded_at'] ?? $item['created_at'] ?? null,
                    'size' => $item['size_label'] ?? $item['size'] ?? null,
                    'location' => $this->normaliseLocation($item),
                    'preview_url' => $this->normaliseUrl($previewUrl, $baseUrl),
                    'download_url' => $this->normaliseUrl($url, $baseUrl),
                    'uploaded_by' => $item['uploaded_by'] ?? null,
                    'uploaded_at' => $item['uploaded_at'] ?? $item['created_at'] ?? null,
                ];
            })
            ->values()
            ->all();
    }

    private function normalisePackages(array $payload, string $baseUrl): array
    {
        $items = Arr::get($payload, 'packages')
            ?? Arr::get($payload, 'data.packages')
            ?? [];

        if (!is_array($items) || !array_is_list($items)) {
            return [];
        }

        return collect($items)
            ->filter(fn ($item) => is_array($item))
            ->map(function (array $item) use ($baseUrl) {
                $zipUrl = $item['package_download_url']
                    ?? $item['zip_url']
                    ?? $item['download_package_url']
                    ?? null;

                return [
                    'id' => $item['id'] ?? null,
                    'name' => (string) ($item['name']
                        ?? $item['title']
                        ?? $item['document_number']
                        ?? 'Paket arsip PR'),
                    'document_number' => $item['document_number'] ?? null,
                    'file_count' => (int) ($item['file_count'] ?? $item['attachment_count'] ?? 0),
                    'location' => $this->normaliseLocation($item),
                    'package_download_url' => $this->normaliseUrl($zipUrl, $baseUrl),
                ];
            })
            ->filter(fn (array $item) => filled($item['package_download_url']))
            ->values()
            ->all();
    }

    private function normaliseUploadedDocument(array $payload, string $baseUrl): array
    {
        $item = Arr::get($payload, 'document')
            ?? Arr::get($payload, 'data.document')
            ?? Arr::get($payload, 'data')
            ?? $payload;

        if (!is_array($item)) {
            return [];
        }

        return $this->normaliseDocuments(['documents' => [$item]], $baseUrl)[0] ?? [];
    }

    private function cleanUploadMetadata(array $metadata): array
    {
        return collect($metadata)
            ->map(fn ($value) => is_scalar($value) || is_null($value) ? trim((string) $value) : $value)
            ->filter(fn ($value) => !($value === '' || $value === [] || $value === null))
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

    private function normaliseLocation(array $item): array
    {
        $location = is_array($item['location'] ?? null) ? $item['location'] : [];

        return [
            'label' => $location['label']
                ?? $item['location_label']
                ?? $item['lokasi']
                ?? null,
            'rak' => $location['rak'] ?? $item['rak'] ?? $item['rak_nama'] ?? null,
            'rak_number' => $location['rak_number'] ?? $item['rak_number'] ?? $item['nomor_rak'] ?? null,
            'rak_location' => $location['rak_location'] ?? $item['rak_location'] ?? null,
            'tingkat' => $location['tingkat'] ?? $item['tingkat'] ?? $item['nomor_tingkat'] ?? null,
            'box' => $location['box'] ?? $item['box'] ?? $item['nomor_box'] ?? null,
            'box_code' => $location['box_code'] ?? $item['box_code'] ?? $item['kode_box'] ?? null,
            'box_description' => $location['box_description'] ?? $item['box_description'] ?? null,
        ];
    }

    private function result(string $state, string $message, array $extra = []): array
    {
        return array_merge([
            'configured' => true,
            'state' => $state,
            'has_archive' => false,
            'document_count' => 0,
            'documents' => [],
            'packages' => [],
            'message' => $message,
            'checked_at' => now()->toIso8601String(),
        ], $extra);
    }
}
