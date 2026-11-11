<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\User;
use App\Services\ProcurementArchiveBridge;
use App\Services\ProcurementOcrProcessor;
use App\Services\ProcurementOcrQueue;
use App\Services\ProcurementSearchSync;
use App\Services\ProcurementSearchWriter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ProcurementOcrQueueTest extends TestCase
{
    use RefreshDatabase;

    private Ppbj $pr;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']));
        $this->pr = Ppbj::create(['ppbj_no' => 'PR-QUEUE-1', 'uraian' => 'Rincian lampiran', 'tgl_ppbj' => '2026-11-11']);
        Http::preventStrayRequests();
    }

    private function source(string $key): int
    {
        return app(ProcurementSearchWriter::class)->source('archive_attachment', $key, 'Scan', 'REF-'.$key, 'sensor', '', [$this->pr->id], hash('sha256', $key), true);
    }

    public function test_fair_queue_prioritizes_first_pages_but_reserves_every_third_turn_for_old_work(): void
    {
        $old = [$this->source('old-a'), $this->source('old-b')];
        DB::table('procurement_search_sources')->whereIn('id', $old)->update(['priority_until' => null, 'priority_pages' => 0, 'page' => 10, 'updated_at' => now()->subDay()]);
        $new = [$this->source('new-a'), $this->source('new-b')];
        $selected = [];
        for ($i = 0; $i < 6; $i++) {
            $source = (new ProcurementOcrQueue)->next();
            $selected[] = $source->id;
            DB::table('procurement_search_sources')->where('id', $source->id)->update(['page' => $source->page + 1, 'updated_at' => now()]);
        }
        $this->assertSame([$new[0], $new[1], $old[0], $new[0], $new[1], $old[1]], $selected);
        $this->assertSame(0, Cache::get('procurement-search:queue-turn'));
    }

    public function test_priority_expiry_page_budget_and_retry_backoff_are_respected(): void
    {
        $old = $this->source('old');
        $new = $this->source('new');
        DB::table('procurement_search_sources')->where('id', $old)->update(['priority_until' => null, 'updated_at' => now()->subDay()]);
        DB::table('procurement_search_sources')->where('id', $new)->update(['priority_until' => now()->subSecond()]);
        $queue = app(ProcurementOcrQueue::class);
        $this->assertSame($old, $queue->next()->id);
        DB::table('procurement_search_sources')->where('id', $new)->update(['priority_until' => now()->addMinutes(15), 'page' => 4]);
        $this->assertSame($old, $queue->next()->id);
        DB::table('procurement_search_sources')->where('id', $old)->update(['active' => false]);
        DB::table('procurement_search_sources')->where('id', $new)->update(['state' => 'failed', 'page' => 0, 'retry_at' => now()->addMinute()]);
        $this->assertNull($queue->next());
        $this->assertNull($queue->next($new));
        DB::table('procurement_search_sources')->where('id', $new)->update(['retry_at' => null, 'attempts' => 3]);
        $this->assertNull($queue->next());
        DB::table('procurement_search_sources')->where('id', $new)->update(['reader_revision' => 1]);
        $this->assertSame($new, $queue->next($new)->id);
    }

    public function test_unchanged_sync_does_not_renew_priority_and_a_new_version_requeues_only_its_own_text(): void
    {
        $id = $this->source('version');
        $original = DB::table('procurement_search_sources')->find($id);
        $this->travel(6)->minutes();
        $this->source('version');
        $this->assertSame($original->priority_until, DB::table('procurement_search_sources')->find($id)->priority_until);
        app(ProcurementSearchWriter::class)->source('archive_attachment', 'version', 'Scan', 'REF-version', 'sensor berubah', '', [$this->pr->id], hash('sha256', 'version-2'), true);
        $updated = DB::table('procurement_search_sources')->find($id);
        $this->assertGreaterThan($original->priority_until, $updated->priority_until);
        $this->assertSame(4, $updated->priority_pages);
        $this->assertSame(0, $updated->page);
    }

    public function test_priority_requests_are_bounded_coalesced_private_and_never_run_ocr_in_the_request(): void
    {
        $ids = [];
        for ($i = 0; $i < 6; $i++) {
            $ids[] = $this->source('request-'.$i);
        }
        DB::table('procurement_search_sources')->update(['priority_until' => null, 'priority_pages' => 0, 'page' => 8]);
        $this->mock(ProcurementOcrProcessor::class, fn ($mock) => $mock->shouldNotReceive('next', 'read'));
        $route = route('procurement.search.priority', $this->pr);
        $response = $this->postJson($route)->assertOk()->assertJsonPath('queued', 3)->assertJsonPath('cooldown', false);
        $this->assertStringContainsString('private', $response->headers->get('Cache-Control'));
        $this->assertSame(3, DB::table('procurement_search_sources')->whereNotNull('priority_until')->count());
        $this->assertSame([12], DB::table('procurement_search_sources')->whereNotNull('priority_until')->distinct()->pluck('priority_pages')->all());
        $this->postJson($route)->assertOk()->assertJsonPath('queued', 0)->assertJsonPath('cooldown', true);
        Http::assertNothingSent();
    }

    public function test_stale_unlinked_inactive_terminal_and_backoff_sources_cannot_be_promoted(): void
    {
        foreach (['stale', 'unlinked', 'inactive', 'terminal', 'backoff'] as $kind) {
            $id = $this->source($kind);
            $values = ['priority_until' => null, 'priority_pages' => 0];
            if ($kind === 'stale') {
                $values['verified_at'] = now()->subHour();
            }
            if ($kind === 'inactive') {
                $values['active'] = false;
            }
            if ($kind === 'terminal') {
                $values += ['state' => 'unsupported'];
            }
            if ($kind === 'backoff') {
                $values += ['state' => 'failed', 'retry_at' => now()->addMinutes(5)];
            }
            DB::table('procurement_search_sources')->where('id', $id)->update($values);
            if ($kind === 'unlinked') {
                DB::table('procurement_search_links')->where('source_id', $id)->delete();
            }
        }
        $this->postJson(route('procurement.search.priority', $this->pr))->assertOk()->assertJsonPath('queued', 0);
        $this->assertSame(0, DB::table('procurement_search_sources')->whereNotNull('priority_until')->count());
        $this->source('fresh');
        $this->postJson(route('procurement.search.priority', $this->pr))->assertOk()->assertJsonPath('queued', 1);
    }

    public function test_queue_status_is_cached_read_only_and_priority_respects_department_and_read_only_mode(): void
    {
        Cache::forever('procurement-search:progress', ['waiting' => 719, 'priority_waiting' => 2, 'checked_at' => now()->toIso8601String()]);
        $response = $this->getJson(route('procurement.search.status'))->assertOk()->assertJsonPath('index.waiting', 719);
        $this->assertStringContainsString('no-store', $response->headers->get('Cache-Control'));
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'viewer']));
        $this->getJson(route('procurement.search.status'))->assertOk();
        $this->postJson(route('procurement.search.priority', $this->pr))->assertForbidden();
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']));
        Cache::put('simonpr:read_only_mode', true);
        $this->postJson(route('procurement.search.priority', $this->pr))->assertForbidden();
        Cache::forget('simonpr:read_only_mode');
        $this->actingAs(User::factory()->create(['department' => 'operasional', 'role' => 'user']));
        $this->getJson(route('procurement.search.status'))->assertForbidden();
        $this->postJson(route('procurement.search.priority', $this->pr))->assertForbidden();
        auth()->logout();
        $this->getJson(route('procurement.search.status'))->assertUnauthorized();
    }

    public function test_recent_manifest_rows_do_not_advance_or_skip_the_regular_archive_cursor(): void
    {
        Cache::put('procurement-search:cursor:archive_attachment', 40);
        $this->mock(ProcurementArchiveBridge::class, function ($mock) {
            $mock->shouldReceive('call')->once()->with(['action' => 'manifest', 'kind' => 'archive_attachment', 'after' => 40, 'limit' => 2, 'recent_limit' => 20])
                ->andReturn(['rows' => [], 'last' => 42, 'has_more' => true]);
        });
        app(ProcurementSearchSync::class)->archives(2, ['archive_attachment']);
        $this->assertSame(42, Cache::get('procurement-search:cursor:archive_attachment'));
    }
}
