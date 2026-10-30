<?php

namespace Tests\Feature;

use App\Models\CollaborationEvent;
use App\Models\ContactMessage;
use App\Models\Ppbj;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Cache\Events\KeyWritten;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class MenuPerformanceAuditTest extends TestCase
{
    use RefreshDatabase;

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    public function test_calendar_reuses_derived_events_but_not_stale_rows_or_private_permissions(): void
    {
        Carbon::setTestNow('2026-10-30 09:00:00');
        $general = User::factory()->create(['department' => 'umum']);
        $operational = User::factory()->create(['department' => 'operasional']);
        $row = Ppbj::create([
            'ppbj_no' => 'AUDIT/CALENDAR', 'uraian' => 'Original description',
            'total_sebelum_ppn' => 1000000, 'tgl_spk' => '2026-10-20',
            'promised_date' => '2026-10-31', 'status' => 'ACTIVE',
        ]);
        $writes = 0;
        Event::listen(KeyWritten::class, function ($event) use (&$writes) {
            if (str_starts_with($event->key, 'calendar:system-events:')) {
                $writes++;
            }
        });
        $url = route('collaboration-calendar.events', ['start' => '2026-10-01', 'end' => '2026-11-10']);
        $first = $this->actingAs($general)->getJson($url)->assertOk();
        $this->assertSame(1, $writes);
        $warm = $this->getJson($url)->assertOk();
        $this->assertSame($first->json('events'), $warm->json('events'));
        $this->assertSame(1, $writes, 'Warm requests must reuse the calculated system events.');

        // A raw SQL update deliberately bypasses Eloquent events and updated_at.
        DB::table('ppbj')->where('id', $row->id)->update(['uraian' => 'Changed immediately']);
        $this->getJson($url)->assertOk()->assertJsonFragment(['uraian' => 'Changed immediately']);
        $this->assertSame(2, $writes);

        CollaborationEvent::create([
            'title' => 'Private general agenda', 'starts_at' => '2026-10-30 10:00:00',
            'audience' => 'umum', 'creator_id' => $general->id,
            'priority' => 'normal', 'status' => 'planned',
        ]);
        $this->getJson($url)->assertJsonFragment(['title' => 'Private general agenda']);
        $this->assertSame(2, $writes);
        $crossRole = $this->actingAs($operational)->getJson($url)->assertOk()
            ->assertJsonMissing(['title' => 'Private general agenda']);
        $this->assertStringContainsString('/tracking-pr?', $crossRole->json('events.0.url'));
        $this->assertStringContainsString('/ppbj?', $warm->json('events.0.url'));

        Carbon::setTestNow('2026-10-31 09:00:00');
        $this->getJson($url)->assertOk();
        $this->assertSame(4, $writes, 'Changing day must not reuse yesterday\'s calculations.');
    }

    public function test_calendar_date_filter_is_index_friendly_and_source_filter_narrows_candidate_rows(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        Ppbj::create(['ppbj_no' => 'DATE/INSIDE', 'tgl_ppbj' => '2026-10-30']);
        Ppbj::create(['ppbj_no' => 'DATE/OUTSIDE', 'tgl_ppbj' => '2026-10-29']);
        $sql = [];
        DB::listen(function ($query) use (&$sql) {
            $sql[] = strtolower($query->sql);
        });
        $this->actingAs($user)->getJson(route('collaboration-calendar.ppbj-search', [
            'date_from' => '2026-10-30', 'date_to' => '2026-10-30',
        ]))->assertOk()->assertJsonCount(1, 'results')->assertJsonPath('results.0.ppbj_no', 'DATE/INSIDE');
        $this->assertFalse(collect($sql)->contains(fn ($query) => str_contains($query, 'strftime') || str_contains($query, 'date("tgl_ppbj")')));

        $sql = [];
        $this->getJson(route('collaboration-calendar.events', [
            'start' => '2026-10-01', 'end' => '2026-10-31', 'source' => 'contract',
        ]))->assertOk();
        $candidate = collect($sql)->first(fn ($query) => str_contains($query, 'from "ppbj"'));
        $this->assertStringContainsString('"promised_date" between', $candidate);
        $this->assertStringNotContainsString('"tgl_terima_pr" between', $candidate);
    }

    public function test_report_keeps_snapshot_status_consistent_without_hydrating_each_model(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        foreach (['ON TRACK', 'WARNING', 'OVERDUE', 'CANCELLED'] as $index => $status) {
            DB::table('ppbj')->insert([
                'ppbj_no' => 'REPORT/AUDIT/'.$index, 'status_sla' => $status,
                'status' => $status === 'CANCELLED' ? 'CANCELLED' : 'ACTIVE',
                'created_at' => now(), 'updated_at' => now(),
            ]);
        }
        $hydrated = 0;
        Ppbj::retrieved(function () use (&$hydrated) {
            $hydrated++;
        });
        $response = $this->actingAs($user)->getJson(route('ppbj.report.data'))->assertOk();
        $this->assertSame(0, $hydrated, 'Report JSON must not hydrate and calculate every PPBJ.');
        $response->assertJsonPath('stats.total', 4)->assertJsonPath('stats.on_track', 1)
            ->assertJsonPath('stats.warning', 1)->assertJsonPath('stats.overdue', 1)->assertJsonPath('stats.cancelled', 1);
        $this->assertEqualsCanonicalizing(['ON TRACK', 'WARNING', 'OVERDUE', 'CANCELLED'], array_column($response->json('data'), 'status_sla'));
    }

    public function test_contact_summary_is_one_aggregate_and_respects_empty_and_filtered_lists(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $this->actingAs($user)->get(route('contact-messages.index'))->assertOk()->assertViewHas('stats', ['total' => 0, 'unread' => 0, 'read' => 0]);
        foreach ([null, now(), now()] as $readAt) {
            ContactMessage::create(['name' => 'Test', 'email' => 'test@example.com', 'subject' => 'Audit', 'message' => 'Read test', 'read_at' => $readAt]);
        }
        $this->get(route('contact-messages.index', ['status' => 'unread']))
            ->assertOk()->assertViewHas('stats', ['total' => 3, 'unread' => 1, 'read' => 2]);
    }

    public function test_real_tracking_lookup_index_is_idempotent_and_used_for_lookup(): void
    {
        // Production has a legacy table with only a primary key; reproduce that drift.
        foreach (Schema::getIndexes('ppbj_real_trackings') as $index) {
            if (($index['columns'][0] ?? null) === 'ppbj_id') {
                Schema::table('ppbj_real_trackings', fn ($table) => $table->dropIndex($index['name']));
            }
        }
        $migration = require database_path('migrations/2026_10_30_000001_add_menu_audit_lookup_indexes.php');
        $migration->up();
        $migration->up();
        $this->assertTrue(Schema::hasIndex('ppbj_real_trackings', 'real_tracking_ppbj_id_index'));
        $plan = DB::select('EXPLAIN QUERY PLAN SELECT * FROM ppbj_real_trackings WHERE ppbj_id = ? ORDER BY id DESC LIMIT 80', [1]);
        $this->assertStringContainsString('real_tracking_ppbj_id_index', json_encode($plan));
    }

    public function test_real_tracking_migration_does_not_duplicate_existing_lookup_indexes(): void
    {
        $migration = require database_path('migrations/2026_10_30_000001_add_menu_audit_lookup_indexes.php');
        $before = count(Schema::getIndexes('ppbj_real_trackings'));
        $migration->up();
        $this->assertSame($before, count(Schema::getIndexes('ppbj_real_trackings')));
    }

    public function test_audit_log_date_lookup_is_indexed(): void
    {
        $this->assertTrue(Schema::hasIndex('activity_logs', 'activity_created_id_index'));
        $plan = DB::select('EXPLAIN QUERY PLAN SELECT created_at FROM activity_logs ORDER BY created_at DESC LIMIT 1');
        $this->assertStringContainsString('activity_created_id_index', json_encode($plan));
    }
}
