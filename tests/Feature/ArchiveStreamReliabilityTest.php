<?php

namespace Tests\Feature;

use App\Http\Controllers\ArchiveDownloadGatewayController;
use App\Models\User;
use App\Services\PrArchiveService;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\Psr7\Request as UpstreamRequest;
use GuzzleHttp\Psr7\Response as UpstreamResponse;
use GuzzleHttp\Psr7\StreamDecoratorTrait;
use GuzzleHttp\Psr7\Utils;
use Illuminate\Http\Client\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Testing\TestResponse;
use PHPUnit\Framework\Attributes\DataProvider;
use Psr\Http\Message\StreamInterface;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Tests\TestCase;

class ArchiveStreamReliabilityTest extends TestCase
{
    private const TARGET = 'https://arsip.example.test/api/archive/attachments/71/download?signature=private';

    private function download(MockHandler $handler, array $headers = [], string $name = 'lampiran.pdf'): TestResponse
    {
        config(['services.pr_archive.base_url' => 'https://arsip.example.test']);
        $pending = (new Factory)->setHandler($handler)->connectTimeout(5);
        Http::shouldReceive('connectTimeout')->once()->with(5)->andReturn($pending);
        $service = $this->mock(PrArchiveService::class);
        $service->shouldReceive('findByPrNumber')->once()->with('PR-STREAM')->andReturn([
            'documents' => [['id' => 71, 'name' => $name, 'download_url' => self::TARGET]],
        ]);
        $request = Request::create('/archive-gateway', 'GET', ['pr' => 'PR-STREAM', 'file' => '71', 'action' => 'download']);
        $request->headers->add($headers);
        $request->setUserResolver(fn () => new User(['department' => 'umum']));

        return TestResponse::fromBaseResponse(app(ArchiveDownloadGatewayController::class)($request, $service));
    }

    #[DataProvider('blockedRedirects')]
    public function test_redirect_is_rejected_before_a_second_network_request(string $url): void
    {
        $handler = new MockHandler([new UpstreamResponse(302, ['Location' => $url]), new UpstreamResponse(200, [], 'private')]);
        try {
            $this->download($handler);
            $this->fail('Untrusted redirect was followed.');
        } catch (HttpExceptionInterface $exception) {
            $this->assertSame(502, $exception->getStatusCode());
            $this->assertStringNotContainsString('signature', $exception->getMessage());
        }
        $this->assertSame(1, $handler->count(), 'The blocked destination must never be requested.');
    }

    public static function blockedRedirects(): array
    {
        return array_map(fn ($url) => [$url], [
            'https://attacker.example/private',
            'http://127.0.0.1/private',
            'https://tenant.sharepoint.com.attacker.example/file',
            'https://evilsharepoint.com/file',
            'https://tenant.sharepoint.com:8443/file',
            'http://tenant.sharepoint.com/file',
            'https://user:secret@tenant.sharepoint.com/file',
            'https://arsip.example.test/admin',
            'https://arsip.example.test:8443/api/archive/file',
        ]);
    }

    public function test_every_redirect_is_checked_including_a_hop_after_onedrive(): void
    {
        $handler = new MockHandler([
            new UpstreamResponse(302, ['Location' => 'https://tenant.sharepoint.com/file']),
            new UpstreamResponse(302, ['Location' => 'https://attacker.example/file']),
            new UpstreamResponse(200, [], 'private'),
        ]);
        try {
            $this->download($handler);
            $this->fail('A later untrusted hop was followed.');
        } catch (HttpExceptionInterface $exception) {
            $this->assertSame(502, $exception->getStatusCode());
        }
        $this->assertSame(1, $handler->count());
    }

    public function test_archive_and_onedrive_redirects_preserve_range_and_stream_in_bounded_chunks(): void
    {
        $contents = str_repeat('archive-byte-', 60000);
        $body = $this->body($contents);
        $handler = new MockHandler([
            new UpstreamResponse(302, ['Location' => '/api/archive/attachments/72/download?signature=next']),
            new UpstreamResponse(302, ['Location' => 'https://tenant.sharepoint.com/file?token=private']),
            new UpstreamResponse(302, ['Location' => 'https://public.dm.files.1drv.com/file?token=private']),
            new UpstreamResponse(206, ['Content-Type' => 'application/pdf', 'Content-Length' => strlen($contents),
                'Content-Range' => 'bytes 0-779999/900000', 'ETag' => '"file-version"'], $body),
        ]);
        $response = $this->download($handler, ['Range' => 'bytes=0-779999']);
        $response->assertStatus(206)->assertHeader('Cache-Control', 'max-age=0, no-store, private')
            ->assertHeader('Content-Range', 'bytes 0-779999/900000')->assertHeader('ETag', '"file-version"');
        $this->assertSame($contents, $response->streamedContent());
        $this->assertTrue($body->closed);
        $this->assertGreaterThan(1, count($body->reads));
        $this->assertLessThanOrEqual(262144, max($body->reads));
        $this->assertSame('bytes=0-779999', $handler->getLastRequest()->getHeaderLine('Range'));
        $this->assertFalse($handler->getLastRequest()->hasHeader('Referer'));
        $this->assertSame(15, $handler->getLastOptions()['read_timeout'] ?? null);
    }

    public function test_unsatisfied_range_returns_416_and_closes_upstream_without_reading_error_body(): void
    {
        $body = $this->body('private upstream error');
        $handler = new MockHandler([new UpstreamResponse(416, ['Content-Range' => 'bytes */900'], $body)]);
        $this->download($handler, ['Range' => 'bytes=999-'])->assertStatus(416)
            ->assertHeader('Content-Range', 'bytes */900')->assertHeader('Cache-Control', 'max-age=0, no-store, private')
            ->assertContent('');
        $this->assertTrue($body->closed);
        $this->assertSame([], $body->reads);
    }

    public function test_upstream_failure_closes_body_without_downloading_it(): void
    {
        $body = $this->body('private upstream error');
        try {
            $this->download(new MockHandler([new UpstreamResponse(503, [], $body)]));
            $this->fail('Unavailable upstream must not produce a download.');
        } catch (HttpExceptionInterface $exception) {
            $this->assertSame(502, $exception->getStatusCode());
        }
        $this->assertTrue($body->closed);
        $this->assertSame([], $body->reads);
    }

    #[DataProvider('readFailures')]
    public function test_mid_stream_failure_stops_without_a_busy_loop_or_error_text_in_the_file(string $failure): void
    {
        Log::spy();
        $body = $this->body('unused');
        $body->reader = function (int $attempt) use ($failure): string {
            if ($attempt === 1) {
                return '%PDF-first-chunk';
            }
            if ($failure === 'empty' && $attempt === 2) {
                return '';
            }
            throw new \RuntimeException('private URL https://secret.example/?signature=secret');
        };
        $response = $this->download(new MockHandler([new UpstreamResponse(200, ['Content-Length' => '900'], $body)]));
        $this->assertSame('%PDF-first-chunk', $response->streamedContent());
        $this->assertCount(2, $body->reads);
        $this->assertTrue($body->closed);
        Log::shouldHaveReceived('notice')->once()->withArgs(fn ($message, $context) => $message === 'Streaming file arsip terhenti.' && $context['bytes_sent'] === 16
            && ! str_contains(json_encode($context), 'signature') && ! str_contains(json_encode($context), 'secret'));
    }

    public static function readFailures(): array
    {
        return [['empty'], ['exception']];
    }

    public function test_control_characters_in_a_file_name_do_not_break_the_download_header(): void
    {
        $response = $this->download(new MockHandler([new UpstreamResponse(200, [], 'file')]), [], "lamp\0iran\r\n.pdf");
        $response->assertOk()->assertHeader('Content-Disposition', 'attachment; filename=lampiran.pdf');
        $this->assertSame('file', $response->streamedContent());
    }

    public function test_percent_and_unicode_in_file_names_remain_downloadable(): void
    {
        $response = $this->download(new MockHandler([new UpstreamResponse(200, ['Content-Length' => '0'], '')]), [], 'réalisasi 100%.pdf');
        $response->assertOk()->assertHeader('Content-Length', '0');
        $this->assertStringContainsString("filename*=utf-8''r%C3%A9alisasi%20100%25.pdf", $response->headers->get('Content-Disposition'));
        $this->assertSame('', $response->streamedContent());
    }

    public function test_connection_failure_logs_no_signed_url_or_remote_error_text(): void
    {
        Log::spy();
        $handler = new MockHandler([new ConnectException('Failed: '.self::TARGET, new UpstreamRequest('GET', self::TARGET))]);
        try {
            $this->download($handler);
            $this->fail('Connection failure must not produce a download.');
        } catch (HttpExceptionInterface $exception) {
            $this->assertSame(502, $exception->getStatusCode());
        }
        Log::shouldHaveReceived('notice')->once()->withArgs(fn ($message, $context) => $message === 'Streaming file arsip gagal terhubung.' && $context['target_host'] === 'arsip.example.test'
            && ! str_contains(json_encode($context), 'signature') && ! str_contains(json_encode($context), 'private'));
    }

    #[DataProvider('unsafeInitialUrls')]
    public function test_unsafe_initial_urls_are_rejected_before_network_access(string $url): void
    {
        config(['services.pr_archive.base_url' => 'https://arsip.example.test']);
        Http::preventStrayRequests();
        $service = $this->mock(PrArchiveService::class);
        $service->shouldReceive('findByPrNumber')->once()->andReturn([
            'documents' => [['id' => 71, 'name' => 'file.pdf', 'download_url' => $url]],
        ]);
        $request = Request::create('/archive-gateway', 'GET', ['pr' => 'PR-STREAM', 'file' => '71', 'action' => 'download']);
        $request->setUserResolver(fn () => new User(['department' => 'umum']));
        try {
            app(ArchiveDownloadGatewayController::class)($request, $service);
            $this->fail('Invalid initial URL must be rejected.');
        } catch (HttpExceptionInterface $exception) {
            $this->assertSame(404, $exception->getStatusCode());
        }
        Http::assertNothingSent();
    }

    public static function unsafeInitialUrls(): array
    {
        return array_map(fn ($url) => [$url], [
            'https://user:secret@arsip.example.test/api/archive/file',
            'https://arsip.example.test/api/archive/../admin',
            'https://arsip.example.test/api/archive/%2e%2e/admin',
            'https://arsip.example.test/api/archive/%5cadmin',
            'https://arsip.example.test/api/archive/%00file',
            'https://arsip.example.test/api/archive/file'."\n",
            'https://tenant.sharepoint.com/file',
        ]);
    }

    private function body(string $contents): StreamInterface
    {
        return new class(Utils::streamFor($contents)) implements StreamInterface
        {
            use StreamDecoratorTrait;

            private StreamInterface $stream;

            public array $reads = [];

            public bool $closed = false;

            public ?\Closure $reader = null;

            public function read($length): string
            {
                $this->reads[] = $length;

                return $this->reader ? ($this->reader)(count($this->reads)) : $this->stream->read($length);
            }

            public function close(): void
            {
                $this->closed = true;
                $this->stream->close();
            }
        };
    }
}
