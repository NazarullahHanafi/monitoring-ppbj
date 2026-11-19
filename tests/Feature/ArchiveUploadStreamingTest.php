<?php

namespace Tests\Feature;

use App\Services\PrArchiveService;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Client\Factory;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class ArchiveUploadStreamingTest extends TestCase
{
    private const TARGET = 'https://arsip.example.test/api/documents';

    private function transport(MockHandler $handler): void
    {
        config(['services.pr_archive.base_url' => 'https://arsip.example.test', 'services.pr_archive.token' => 'private-token']);
        Http::swap(new class($handler) extends Factory
        {
            public function __construct(private MockHandler $handler)
            {
                parent::__construct();
            }

            protected function newPendingRequest()
            {
                return parent::newPendingRequest()->setHandler($this->handler);
            }
        });
    }

    #[DataProvider('uploadOutcomes')]
    public function test_file_is_streamed_and_closed_for_every_upload_outcome(int $status, array $payload, string $state): void
    {
        $file = UploadedFile::fake()->createWithContent('lampiran.pdf', '%PDF-'.str_repeat('synthetic-archive-', 100000));
        $expectedHash = hash_file('sha256', $file->getRealPath());
        $resource = null;
        $streamed = false;
        $actualHash = null;
        $handler = new MockHandler([function ($request, $options) use (&$resource, &$streamed, &$actualHash, $status, $payload) {
            $part = collect($options['laravel_data'])->firstWhere('name', 'file');
            $resource = $part['contents'];
            $streamed = is_resource($resource) && stream_get_meta_data($resource)['mode'] === 'rb';
            $context = hash_init('sha256');
            if (is_resource($resource)) {
                hash_update_stream($context, $resource);
            } else {
                hash_update($context, $resource);
            }
            $actualHash = hash_final($context);

            return new Response($status, ['Content-Type' => 'application/json'], json_encode($payload));
        }]);
        $this->transport($handler);
        $key = 'pr_archive:'.hash('sha256', 'https://arsip.example.test|PR-UPLOAD');
        Cache::put($key, ['state' => 'available'], 300);
        $result = app(PrArchiveService::class)->uploadDocument([
            'nomor_pr' => 'PR-UPLOAD', 'source_module' => 'SP', 'replace_existing' => true, 'notes' => ' Audit ',
        ], $file);

        $this->assertTrue($streamed, 'The original file must be sent as a binary read stream.');
        $this->assertSame($expectedHash, $actualHash);
        $this->assertFalse(is_resource($resource), 'The file descriptor must be closed before returning.');
        $this->assertSame($state, $result['state']);
        $this->assertSame($state !== 'uploaded', Cache::has($key));
        $request = $handler->getLastRequest();
        $this->assertSame('POST', $request->getMethod());
        $this->assertSame(self::TARGET, (string) $request->getUri());
        $this->assertSame('Bearer private-token', $request->getHeaderLine('Authorization'));
        $parts = collect($handler->getLastOptions()['laravel_data'])->pluck('contents', 'name');
        $this->assertSame('1', $parts['replace_existing']);
        $this->assertSame('Audit', $parts['notes']);
        $this->assertSame(0, $handler->count());
    }

    public static function uploadOutcomes(): array
    {
        return [
            [201, ['document' => ['id' => 71, 'download_url' => '/api/archive/attachments/71/download']], 'uploaded'],
            [200, ['data' => ['id' => 71, 'preview_url' => '/api/archive/attachments/71/preview'], 'replaced' => true], 'uploaded'],
            [409, ['previous_document' => ['attachment_id' => 71, 'preview_url' => '/api/archive/attachments/71/preview']], 'duplicate'],
            [404, ['message' => 'missing'], 'unavailable'],
            [422, ['message' => 'invalid'], 'failed'],
            [503, ['message' => 'busy'], 'failed'],
        ];
    }

    #[DataProvider('redirectStatuses')]
    public function test_upload_redirects_never_forward_private_file_bytes(int $status): void
    {
        $handler = new MockHandler([
            new Response($status, ['Location' => 'https://attacker.example/receive']),
            new Response(201, ['Content-Type' => 'application/json'], '{"document":{"id":72}}'),
        ]);
        $this->transport($handler);
        $result = app(PrArchiveService::class)->uploadDocument(['nomor_pr' => 'PR-UPLOAD'], UploadedFile::fake()->createWithContent('private.pdf', '%PDF-private'));

        $this->assertSame('failed', $result['state']);
        $this->assertSame(1, $handler->count(), 'No redirect destination may receive an upload request.');
        $this->assertSame(self::TARGET, (string) $handler->getLastRequest()->getUri());
        $part = collect($handler->getLastOptions()['laravel_data'])->firstWhere('name', 'file');
        $this->assertFalse(is_resource($part['contents']));
    }

    public static function redirectStatuses(): array
    {
        return [[301], [302], [303], [307], [308]];
    }

    public function test_connection_failure_closes_the_stream_and_redacts_transport_details(): void
    {
        $resource = null;
        $handler = new MockHandler([function ($request, $options) use (&$resource) {
            $resource = collect($options['laravel_data'])->firstWhere('name', 'file')['contents'];
            throw new ConnectException('private-token /private/server/file.pdf', new Request('POST', self::TARGET));
        }]);
        $this->transport($handler);
        Log::spy();
        $result = app(PrArchiveService::class)->uploadDocument(['nomor_pr' => 'PR-UPLOAD'], UploadedFile::fake()->createWithContent('private.pdf', '%PDF-private'));

        $this->assertSame('unavailable', $result['state']);
        $this->assertFalse(is_resource($resource));
        $this->assertSame(0, $handler->count(), 'Ambiguous writes must never be automatically retried.');
        Log::shouldHaveReceived('notice')->once()->withArgs(fn ($message, $context) => $message === 'Pengiriman dokumen ke sistem arsip terhenti.'
            && isset($context['exception_class']) && ! str_contains(json_encode($context), 'private'));
    }

    public function test_a_missing_source_is_not_sent_as_an_empty_upload(): void
    {
        $file = UploadedFile::fake()->createWithContent('missing.pdf', '%PDF-source');
        unlink($file->getRealPath());
        config(['services.pr_archive.base_url' => 'https://arsip.example.test']);
        Http::preventStrayRequests();
        Log::spy();

        $result = app(PrArchiveService::class)->uploadDocument(['nomor_pr' => 'PR-UPLOAD'], $file);

        $this->assertSame('unavailable', $result['state']);
        Http::assertNothingSent();
    }
}
