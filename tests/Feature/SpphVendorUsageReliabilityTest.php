<?php

namespace Tests\Feature;

use App\Http\Controllers\SpphController;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class SpphVendorUsageReliabilityTest extends TestCase
{
    use RefreshDatabase;

    private function spph(int $id, array $extra = []): Spph
    {
        return Spph::create($extra + ['nomor_spph' => $id.'/AUDIT/SPPH/2026', 'sequence_number' => $id,
            'tanggal' => '2026-11-18', 'nama_vendor' => 'Vendor Audit', 'deskripsi_pengadaan' => 'Synthetic', 'pic' => 'Audit']);
    }

    public function test_empty_statistics_are_a_private_json_dictionary_and_warm_reads_use_no_procurement_sql(): void
    {
        Cache::forget('vendor:usage-stats:spph-sp:v2');
        $queries = [];
        DB::listen(function ($event) use (&$queries) {
            if (preg_match('/^select .*\b(spphs|sps)\b/i', $event->sql)) {
                $queries[] = $event->sql;
            }
        });
        $controller = app(SpphController::class);
        $response = $controller->vendorUsageStatsJson();
        $this->assertSame('{"stats":{}}', $response->getContent());
        $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
        $this->assertCount(2, $queries);
        $queries = [];
        $this->assertSame($response->getContent(), $controller->vendorUsageStatsJson()->getContent());
        $this->assertSame([], $queries);
    }

    public function test_vendor_aliases_count_each_document_once_and_archived_documents_are_excluded(): void
    {
        $this->spph(1, ['nama_vendor' => ' Vendor   Audit ', 'vendor_names' => ['VENDOR AUDIT', 'vendor  audit', 'Vendor Lain']]);
        $archived = $this->spph(2);
        $archived->delete();
        Sp::create(['nomor_sp' => '1/AUDIT/SP/2026', 'sequence_number' => 1, 'tanggal_sp' => '2026-11-19',
            'nama_vendor' => 'vendor audit', 'deskripsi_pengadaan' => 'Synthetic', 'pic' => 'Audit']);
        Cache::forget('vendor:usage-stats:spph-sp:v2');
        $stats = app(SpphController::class)->vendorUsageStatsJson()->getData(true)['stats'];
        $this->assertSame(1, $stats['vendor audit']['spph_count']);
        $this->assertSame(1, $stats['vendor audit']['sp_count']);
        $this->assertSame(2, $stats['vendor audit']['total_count']);
        $this->assertSame('1/AUDIT/SP/2026', $stats['vendor audit']['last_document']);
        $this->assertSame('2026-11-19', $stats['vendor audit']['last_used_at']);
        $this->assertSame(1, $stats['vendor lain']['spph_count']);
    }

    public function test_old_cache_does_not_preserve_inflated_counts_and_read_does_not_write_documents(): void
    {
        $this->spph(1);
        Cache::put('vendor:usage-stats:spph-sp:v1', ['vendor audit' => ['total_count' => 999]], 3600);
        Cache::forget('vendor:usage-stats:spph-sp:v2');
        $before = DB::table('spphs')->first();
        $stats = app(SpphController::class)->vendorUsageStatsJson()->getData(true)['stats'];
        $this->assertSame(1, $stats['vendor audit']['total_count']);
        $this->assertEquals($before, DB::table('spphs')->first());
    }

    public function test_statistics_keep_existing_read_permissions_and_rate_limit(): void
    {
        $actor = User::factory()->create(['department' => 'umum', 'role' => 'viewer']);
        $this->actingAs($actor)->getJson(route('spph.vendor-usage-stats'))->assertOk()->assertHeader('Cache-Control', 'no-store, private');
        $actor->department = 'operasional';
        $actor->save();
        $this->actingAs($actor)->getJson(route('spph.vendor-usage-stats'))->assertForbidden();
        $this->assertContains('throttle:30,1,spph-get-vendor-usage-stats:', app('router')->getRoutes()->getByName('spph.vendor-usage-stats')->gatherMiddleware());
    }

    public function test_sp_and_spph_saves_invalidate_the_new_statistics_cache(): void
    {
        $actor = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($actor);
        foreach (['sp', 'spph'] as $kind) {
            Cache::put('vendor:usage-stats:spph-sp:v2', ['stale' => true], 3600);
            $payload = ['nama_vendor' => 'Vendor Audit', 'deskripsi_pengadaan' => 'Synthetic', 'pic' => $actor->name];
            $payload += $kind === 'sp'
                ? ['nomor_sp' => '499/PKU-XI/SP/2026', 'tanggal_sp' => '2026-11-18', 'nilai_sp' => 1000, 'nilai_pr' => 1000]
                : ['nomor_spph' => '499/PKU-XI/SPPH/2026', 'tanggal' => '2026-11-18'];
            $this->postJson(route($kind.'.store'), $payload)->assertOk();
            $this->assertFalse(Cache::has('vendor:usage-stats:spph-sp:v2'));
        }
        $stats = app(SpphController::class)->vendorUsageStatsJson()->getData(true)['stats'];
        $this->assertSame(2, $stats['vendor audit']['total_count']);
    }
}
