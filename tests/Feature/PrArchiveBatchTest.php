<?php

namespace Tests\Feature;

use App\Services\PrArchiveService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class PrArchiveBatchTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        config(['services.pr_archive.base_url' => 'https://archive.example.test', 'services.pr_archive.token' => 'test-secret',
            'services.pr_archive.lookup_concurrency' => 3, 'services.pr_archive.lookup_budget_seconds' => 10]);
    }

    public function test_batch_deduplicates_preserves_order_reuses_single_lookup_cache_and_retries_transient_failures(): void
    {
        $attempts = 0;
        Http::fake(function ($request) use (&$attempts) {
            $attempts++;

            return match (true) {
                str_contains($request->url(), 'PR-OK') => Http::response(['documents' => [['id' => 1, 'name' => 'PDF', 'download_url' => '/api/archive/attachments/1/download']]]),
                str_contains($request->url(), 'PR-EMPTY') => Http::response([], 404),
                str_contains($request->url(), 'PR-FAIL') => Http::response([], 503),
                default => (Http::failedConnection())($request),
            };
        });
        $service = app(PrArchiveService::class);
        $numbers = [' PR-OK ', 'PR-EMPTY', 'PR-OK', 'PR-FAIL', 'PR-OFFLINE'];
        $result = $service->findByPrNumbers($numbers);
        $this->assertSame(['PR-OK', 'PR-EMPTY', 'PR-FAIL', 'PR-OFFLINE'], array_keys($result));
        $this->assertSame(['available', 'empty', 'unavailable', 'unavailable'], array_column($result, 'state'));
        $this->assertStringStartsWith('/archive-gateway?', $result['PR-OK']['documents'][0]['download_gateway_url']);
        $this->assertSame(4, $attempts);
        Http::assertSent(fn ($request) => $request->hasHeader('Authorization', 'Bearer test-secret'));
        $this->assertSame($result['PR-OK'], $service->findByPrNumber('PR-OK'));
        $this->assertSame($result, $service->findByPrNumbers($numbers));
        $this->assertSame(4, $attempts);
        $this->travel(11)->seconds();
        $service->findByPrNumbers($numbers);
        $this->assertSame(6, $attempts);
    }

    public function test_batch_is_capped_and_unconfigured_lookups_never_send_requests(): void
    {
        Http::fake(['*' => Http::response([], 404)]);
        $result = app(PrArchiveService::class)->findByPrNumbers(array_map(fn ($n) => 'PR-'.$n, range(1, 35)));
        $this->assertCount(20, $result);
        Http::assertSentCount(20);
        config(['services.pr_archive.base_url' => '']);
        $empty = app(PrArchiveService::class)->findByPrNumbers(['A', 'B']);
        $this->assertSame(['unconfigured', 'unconfigured'], array_column($empty, 'state'));
        Http::assertSentCount(20);
    }

    public function test_fresh_lookup_replaces_metadata_without_losing_ordinary_cache_hits(): void
    {
        Http::fakeSequence()->push(['documents' => [['id' => 1, 'name' => 'Before']]])->push(['documents' => [['id' => 1, 'name' => 'After']]]);
        $service = app(PrArchiveService::class);
        $this->assertSame('Before', $service->findByPrNumber('PR-1')['documents'][0]['name']);
        $this->assertSame('After', $service->findByPrNumber('PR-1', true)['documents'][0]['name']);
        $this->assertSame('After', $service->findByPrNumber('PR-1')['documents'][0]['name']);
        Http::assertSentCount(2);
    }

    public function test_deadline_defers_unattempted_prs_without_negative_caching_and_retries_make_progress(): void
    {
        $service = $this->clockedService();
        Http::fake(function () use ($service) {
            $service->time = 11;

            return Http::response([], 404);
        });
        $numbers = ['A', 'B', 'C', 'D', 'E', 'F'];
        $first = $service->findByPrNumbers($numbers);
        Http::assertSentCount(3);
        $this->assertSame('empty', $first['A']['state']);
        $this->assertTrue($first['D']['refresh_deferred']);
        $this->assertSame('unavailable', $first['D']['state']);
        $service->time = 0;
        $second = $service->findByPrNumbers($numbers);
        Http::assertSentCount(6);
        $this->assertSame(array_fill(0, 6, 'empty'), array_column($second, 'state'));
    }

    public function test_fresh_retry_prioritizes_missing_prs_and_preserves_valid_cached_fallbacks(): void
    {
        $service = $this->clockedService();
        $expireBudget = false;
        Http::fake(function ($request) use ($service, &$expireBudget) {
            if ($expireBudget) {
                $service->time = 11;
            }

            return Http::response(['documents' => [['id' => 1, 'name' => 'Cached document']]]);
        });
        $service->findByPrNumbers(['A', 'B', 'C']);
        $expireBudget = true;
        $result = $service->findByPrNumbers(['A', 'B', 'C', 'D', 'E', 'F'], true);
        Http::assertSentCount(6);
        $this->assertSame('available', $result['A']['state']);
        $this->assertTrue($result['A']['refresh_deferred']);
        $this->assertArrayNotHasKey('refresh_deferred', $result['D']);
        $normal = $service->findByPrNumbers(['A', 'B', 'C', 'D', 'E', 'F']);
        $this->assertArrayNotHasKey('refresh_deferred', $normal['A']);
        Http::assertSentCount(6);
    }

    private function clockedService(): PrArchiveService
    {
        return new class extends PrArchiveService
        {
            public float $time = 0;

            protected function lookupClock(): float
            {
                return $this->time;
            }
        };
    }

    public function test_concurrent_lookup_does_not_wait_duplicate_http_or_cache_a_false_empty(): void
    {
        Http::fake(['*' => Http::response([], 404)]);
        $key = 'pr_archive:'.hash('sha256', 'https://archive.example.test|BUSY');
        $lock = Cache::lock($key.':lookup', 10);
        $this->assertTrue($lock->get());
        try {
            $result = app(PrArchiveService::class)->findByPrNumber('BUSY');
            $this->assertSame('unavailable', $result['state']);
            $this->assertTrue($result['refresh_deferred']);
            $this->assertNull(Cache::get($key));
            Http::assertNothingSent();
        } finally {
            $lock->release();
        }
        $this->assertSame('empty', app(PrArchiveService::class)->findByPrNumber('BUSY')['state']);
        Http::assertSentCount(1);
        $probe = Cache::lock($key.':lookup', 10);
        $this->assertTrue($probe->get(), 'Completed lookups must release their lock.');
        $probe->release();
    }
}
