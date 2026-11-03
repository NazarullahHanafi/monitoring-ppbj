<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class OwnerSnapshotPerformanceTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_snapshot_scans_each_module_once_and_preserves_existing_totals(): void
    {
        $this->travelTo(now()->startOfMonth()->addDays(2));
        $owner = User::factory()->create(['role' => 'superadmin', 'department' => 'umum']);
        config(['app.owner_emails' => [$owner->email]]);
        User::factory()->create(['role' => 'viewer', 'department' => 'umum']);
        User::factory()->create(['role' => 'user', 'department' => 'operasional']);
        Ppbj::create(['ppbj_no' => 'SNAPSHOT/1']);
        foreach ([Sp::class, Spph::class] as $model) {
            foreach ([false, true] as $trashed) {
                $key = $model === Sp::class ? 'nomor_sp' : 'nomor_spph';
                $dateKey = $model === Sp::class ? 'tanggal_sp' : 'tanggal';
                $document = $model::create([$key => 'SNAPSHOT/'.(int) $trashed, 'sequence_number' => (int) $trashed + 1,
                    $dateKey => now()->toDateString(), 'nama_vendor' => 'Snapshot vendor', 'deskripsi_pengadaan' => 'Snapshot', 'pic' => 'Test']);
                if ($trashed) {
                    $document->delete();
                }
            }
        }
        Cache::forget('owner:dashboard-summary:v3');
        DB::enableQueryLog();
        $response = $this->actingAs($owner)->get(route('owner.index'))->assertOk();
        $queries = collect(DB::getQueryLog())->pluck('query');
        DB::disableQueryLog();
        $this->assertSame(3, $response->viewData('stats')['users']);
        $this->assertSame(['superadmin' => 1, 'user' => 1, 'viewer' => 1, 'umum' => 2, 'operasional' => 1], $response->viewData('userBreakdown'));
        $modules = collect($response->viewData('userActivityInsights')['module_totals'])->keyBy('label');
        foreach (['SP', 'SPPH'] as $label) {
            $this->assertSame(1, $modules[$label]['total']);
            $this->assertSame(2, $modules[$label]['month'], 'Monthly creations retain the historical inclusion of later-trashed documents.');
        }
        foreach (['ppbj', 'torprs', 'sps', 'spphs'] as $table) {
            $this->assertCount(1, $queries->filter(fn ($sql) => str_contains($sql, 'from "'.$table.'"')), $table.' should be aggregated once.');
        }
        DB::flushQueryLog();
        DB::enableQueryLog();
        $this->get(route('owner.index'))->assertOk();
        $warm = collect(DB::getQueryLog())->pluck('query');
        DB::disableQueryLog();
        $this->assertFalse($warm->contains(fn ($sql) => str_contains($sql, 'from "sps"') || str_contains($sql, 'from "ppbj"')));
    }
}
