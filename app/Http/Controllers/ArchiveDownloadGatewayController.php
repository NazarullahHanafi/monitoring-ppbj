<?php

namespace App\Http\Controllers;

use App\Models\Torpr;
use App\Services\PrArchiveService;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\UriInterface;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;

class ArchiveDownloadGatewayController extends Controller
{
    public function indexed(Request $request, int $source): Response
    {
        abort_unless($request->user()?->department === 'umum', 403);
        abort_unless(config('procurement_search.enabled'), 404);
        $row = DB::table('procurement_search_sources')->where('id', $source)->where('active', true)
            ->whereIn('kind', \App\Services\ProcurementFileSources::KINDS)
            ->where('verified_at', '>=', now()->subMinutes(config('procurement_search.archive_fresh_minutes')))
            ->where(function ($access) use ($request) {
                if ($request->user()?->role !== 'superadmin') {
                    $access->whereExists(fn ($links) => $links->selectRaw('1')->from('procurement_search_links')->join('ppbj', 'ppbj.id', '=', 'procurement_search_links.ppbj_id')->whereColumn('source_id', 'procurement_search_sources.id'));
                }
            })
            ->first(['id', 'kind', 'source_key', 'label', 'fingerprint']);
        abort_unless($row, 404);
        if (str_starts_with($row->kind, 'local_')) {
            $attachment = \App\Models\ProcurementDetailAttachment::findOrFail($row->source_key);
            abort_unless($attachment->kind === ($row->kind === 'local_sp_attachment' ? 'sp' : 'spph'), 404);
            $document = ($attachment->kind === 'sp' ? \App\Models\Sp::class : \App\Models\Spph::class)::find($attachment->document_id);
            abort_unless($document, 404);
            $path = app(\App\Services\ProcurementLocalFiles::class)->path($attachment);
            abort_unless($path, 404);

            return response()->file($path, ['Cache-Control' => 'private, no-store', 'X-Content-Type-Options' => 'nosniff', 'Content-Security-Policy' => "sandbox; default-src 'none'"])->setPrivate();
        }
        $target = Cache::get('procurement-search:download:'.$row->id);
        abort_unless(is_array($target) && is_string($target['url'] ?? null) && ($target['fingerprint'] ?? '') === $row->fingerprint, 404, 'Tautan lampiran sedang disinkronkan. Coba kembali sebentar lagi.');
        abort_unless($this->isTrustedArchiveUrl($target['url']), 404);

        // Reuse the authenticated stream; no cloud URL/signature is exposed in search JSON.
        $response = $this->streamArchiveFile($request, $target['url'], $row->label, false);
        $mime = strtolower(trim(explode(';', (string) $response->headers->get('Content-Type'))[0]));
        if (! in_array($mime, ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'text/plain'], true)) {
            $response->headers->set('Content-Disposition', HeaderUtils::makeDisposition('attachment', $this->safeFileName($row->label), 'dokumen-arsip'));
            $response->headers->set('Content-Security-Policy', "sandbox; default-src 'none'");
        }

        return $response;
    }

    public function __invoke(Request $request, PrArchiveService $archiveService): Response
    {
        $validated = $request->validate([
            'pr' => ['required', 'string', 'max:160'],
            'file' => ['required', 'string', 'max:160', 'regex:/^[A-Za-z0-9._:-]+$/'],
            'action' => ['required', Rule::in(['preview', 'download', 'package'])],
        ]);

        $user = $request->user();
        abort_unless(in_array($user?->department, ['umum', 'operasional'], true), 403);
        if ($user->department === 'operasional') {
            // Match the ownership boundary of TORPR's archive metadata endpoint.
            // Check before reading even warm API metadata or resolving file IDs.
            abort_unless(Torpr::query()
                ->where('created_by_user_id', $user->id)
                ->where('nomor_pr', trim($validated['pr']))
                ->exists(), 403);
        }

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
        $body = null;
        $streaming = false;
        try {
            $upstreamRequest = Http::connectTimeout(5)
                ->timeout(300)
                ->withOptions([
                    'stream' => true,
                    'read_timeout' => 15,
                    'allow_redirects' => [
                        'max' => 5,
                        'strict' => true,
                        'referer' => false,
                        'on_redirect' => function (RequestInterface $request, ResponseInterface $response, UriInterface $uri): void {
                            if (! $this->isTrustedStreamUrl((string) $uri)) {
                                $response->getBody()->close();
                                abort(502, 'Pengalihan unduhan arsip tidak valid.');
                            }
                        },
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
            $body = $upstream->toPsrResponse()->getBody();

            if ($request->hasHeader('Range') && $upstream->status() === 416) {
                $headers = $this->securityHeaders();
                $contentRange = $upstream->header('Content-Range');
                if (preg_match('/^bytes \*\/\d+$/', $contentRange) === 1) {
                    $headers['Content-Range'] = $contentRange;
                }

                return response('', 416, $headers);
            }

            abort_unless(in_array($upstream->status(), [200, 206], true), 502, 'File arsip belum dapat diunduh.');

            $fileName = $this->safeFileName($name);
            $headers = array_merge($this->securityHeaders(), [
                'Content-Type' => $upstream->header('Content-Type') ?: 'application/octet-stream',
                'Content-Disposition' => HeaderUtils::makeDisposition(
                    $download ? HeaderUtils::DISPOSITION_ATTACHMENT : HeaderUtils::DISPOSITION_INLINE,
                    $fileName,
                    str_replace('%', '_', Str::ascii($fileName)) ?: 'dokumen-arsip'
                ),
                'Accept-Ranges' => $upstream->header('Accept-Ranges') ?: 'bytes',
                'X-Accel-Buffering' => 'no',
            ]);

            foreach (['Content-Length', 'Content-Range', 'ETag', 'Last-Modified'] as $header) {
                if (($value = $upstream->header($header)) !== '') {
                    $headers[$header] = $value;
                }
            }

            $response = response()->stream(function () use ($body): void {
                $bytesSent = 0;
                try {
                    while (! connection_aborted() && ! $body->eof()) {
                        $chunk = $body->read(262144);
                        if ($chunk === '') {
                            if ($body->eof()) {
                                break;
                            }
                            throw new \RuntimeException('Archive stream stopped producing bytes.');
                        }
                        echo $chunk;
                        $bytesSent += strlen($chunk);

                        if (ob_get_level() > 0) {
                            @ob_flush();
                        }

                        flush();
                    }
                } catch (Throwable $exception) {
                    // Headers may already be sent: never append an error page to file bytes.
                    Log::notice('Streaming file arsip terhenti.', [
                        'exception_class' => $exception::class,
                        'bytes_sent' => $bytesSent,
                    ]);
                } finally {
                    $body->close();
                }
            }, $upstream->status(), $headers);
            $streaming = true;

            return $response;
        } catch (ConnectionException $exception) {
            Log::notice('Streaming file arsip gagal terhubung.', [
                'target_host' => parse_url($target, PHP_URL_HOST),
                'exception_class' => $exception::class,
            ]);
        } catch (HttpExceptionInterface $exception) {
            throw $exception;
        } catch (Throwable $exception) {
            Log::warning('Persiapan streaming file arsip gagal.', ['exception_class' => $exception::class]);
        } finally {
            if (! $streaming && $body !== null) {
                $body->close();
            }
        }

        abort(502, 'File arsip sedang tidak dapat diunduh. Silakan coba kembali.');
    }

    private function safeFileName(string $name): string
    {
        $name = trim(preg_replace('/[\x00-\x1f\x7f]/', '', $name) ?? '');
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

        if (! is_array($targetParts) || ! is_array($baseParts)
            || isset($targetParts['user']) || isset($targetParts['pass'])
            || preg_match('/[\x00-\x20\x7f\\\\]/', $target)) {
            return false;
        }

        $targetScheme = strtolower((string) ($targetParts['scheme'] ?? ''));
        $baseScheme = strtolower((string) ($baseParts['scheme'] ?? ''));
        $targetHost = strtolower((string) ($targetParts['host'] ?? ''));
        $baseHost = strtolower((string) ($baseParts['host'] ?? ''));
        $targetPort = (int) ($targetParts['port'] ?? ($targetScheme === 'https' ? 443 : 80));
        $basePort = (int) ($baseParts['port'] ?? ($baseScheme === 'https' ? 443 : 80));
        $path = rawurldecode((string) ($targetParts['path'] ?? ''));

        return in_array($targetScheme, ['http', 'https'], true)
            && $targetScheme === $baseScheme
            && $targetHost !== ''
            && hash_equals($baseHost, $targetHost)
            && $targetPort === $basePort
            && str_starts_with($path, '/api/archive/')
            && ! preg_match('~(?:^|/)\.\.?(?:/|$)|[\x00-\x1f\x7f\\\\]~', $path);
    }

    private function isTrustedStreamUrl(string $target): bool
    {
        if ($this->isTrustedArchiveUrl($target)) {
            return true;
        }
        $parts = parse_url($target);
        if (! is_array($parts) || ($parts['scheme'] ?? '') !== 'https'
            || isset($parts['user']) || isset($parts['pass']) || ($parts['port'] ?? 443) !== 443
            || preg_match('/[\x00-\x20\x7f\\\\]/', $target)) {
            return false;
        }
        // Archive remote attachments redirect to OneDrive. Match the existing
        // vendor download domain boundary, including a check at every later hop.
        $host = strtolower($parts['host'] ?? '');
        foreach (['sharepoint.com', '1drv.com', '1drv.ms', 'onedrive.com', 'live.com', 'microsoft.com'] as $domain) {
            if ($host === $domain || str_ends_with($host, '.'.$domain)) {
                return true;
            }
        }

        return false;
    }
}
