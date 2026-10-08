<?php

namespace App\Http\Controllers;

use App\Services\PrArchiveService;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;

class ArchiveDownloadGatewayController extends Controller
{
    public function __invoke(Request $request, PrArchiveService $archiveService): Response
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
        [$item, $target] = $this->resolveItemAndTarget($archive, $validated['file'], $validated['action']);

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

        if ($validated['action'] === 'package') {
            return redirect()->away($target, 302, $this->securityHeaders());
        }

        return $this->streamArchiveFile(
            $request,
            $target,
            (string) ($item['name'] ?? 'dokumen-arsip'),
            $validated['action'] === 'download'
        );
    }

    private function resolveItemAndTarget(array $archive, string $fileId, string $action): array
    {
        $collection = $action === 'package'
            ? ($archive['packages'] ?? [])
            : ($archive['documents'] ?? []);

        $item = collect($collection)->first(
            fn ($entry) => is_array($entry) && (string) ($entry['id'] ?? '') === $fileId
        );

        if (! is_array($item)) {
            return [null, null];
        }

        $target = match ($action) {
            'preview' => $item['preview_url'] ?? $item['download_url'] ?? null,
            'download' => $item['download_url'] ?? null,
            'package' => $item['package_download_url'] ?? null,
        };

        return [$item, is_string($target) && $target !== '' ? $target : null];
    }

    private function streamArchiveFile(Request $request, string $target, string $name, bool $download): Response
    {
        try {
            $upstreamRequest = Http::connectTimeout(5)
                ->timeout(300)
                ->withOptions([
                    'stream' => true,
                    'allow_redirects' => [
                        'max' => 5,
                        'strict' => true,
                        'referer' => false,
                    ],
                ]);

            if ($request->hasHeader('Range')) {
                $range = (string) $request->header('Range');
                abort_unless(
                    preg_match('/^bytes=(?:\d+-\d*|-\d+)$/', $range) === 1,
                    416,
                    'Rentang file tidak valid.'
                );
                $upstreamRequest = $upstreamRequest->withHeader('Range', $range);
            }

            $upstream = $upstreamRequest->get($target);

            abort_unless(in_array($upstream->status(), [200, 206], true), 502, 'File arsip belum dapat diunduh.');

            $body = $upstream->toPsrResponse()->getBody();
            $fileName = $this->safeFileName($name);
            $headers = array_merge($this->securityHeaders(), [
                'Content-Type' => $upstream->header('Content-Type') ?: 'application/octet-stream',
                'Content-Disposition' => HeaderUtils::makeDisposition(
                    $download ? HeaderUtils::DISPOSITION_ATTACHMENT : HeaderUtils::DISPOSITION_INLINE,
                    $fileName,
                    Str::ascii($fileName) ?: 'dokumen-arsip'
                ),
                'Accept-Ranges' => $upstream->header('Accept-Ranges') ?: 'bytes',
                'X-Accel-Buffering' => 'no',
            ]);

            foreach (['Content-Length', 'Content-Range', 'ETag', 'Last-Modified'] as $header) {
                if ($value = $upstream->header($header)) {
                    $headers[$header] = $value;
                }
            }

            return response()->stream(function () use ($body): void {
                try {
                    while (! $body->eof()) {
                        echo $body->read(262144);

                        if (ob_get_level() > 0) {
                            @ob_flush();
                        }

                        flush();
                    }
                } finally {
                    $body->close();
                }
            }, $upstream->status(), $headers);
        } catch (ConnectionException $exception) {
            Log::notice('Streaming file arsip gagal terhubung.', [
                'target_host' => parse_url($target, PHP_URL_HOST),
                'message' => $exception->getMessage(),
            ]);
        } catch (HttpExceptionInterface $exception) {
            throw $exception;
        } catch (Throwable $exception) {
            report($exception);
        }

        abort(502, 'File arsip sedang tidak dapat diunduh. Silakan coba kembali.');
    }

    private function safeFileName(string $name): string
    {
        $name = trim(str_replace(["\r", "\n", '\0'], '', $name));
        $name = preg_replace('~[\\\/:*?"<>|]+~u', '-', $name) ?: 'dokumen-arsip';

        return Str::limit($name, 180, '');
    }

    private function securityHeaders(): array
    {
        return [
            'Cache-Control' => 'no-store, private, max-age=0',
            'Pragma' => 'no-cache',
            'Referrer-Policy' => 'no-referrer',
            'X-Content-Type-Options' => 'nosniff',
        ];
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
