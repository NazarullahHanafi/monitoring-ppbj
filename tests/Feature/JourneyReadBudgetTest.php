<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class JourneyReadBudgetTest extends TestCase
{
    use RefreshDatabase;

    private function package(): Ppbj
    {
        $pr = Ppbj::create(['ppbj_no' => 'AUDIT/JOURNEY', 'uraian' => 'Read budget test', 'total_sebelum_ppn' => 1000000]);
        foreach (['sps' => ['nomor_sp', 'tanggal_sp'], 'spphs' => ['nomor_spph', 'tanggal']] as $table => [$number, $date]) {
            // Respect the business constraint: one document of each kind per PR.
            $id = DB::table($table)->insertGetId([$number => 'AUDIT/'.$table, $date => '2026-11-03',
                'sequence_number' => 1, 'nama_vendor' => 'Audit vendor', 'pic' => 'Audit',
                'deskripsi_pengadaan' => 'Read-only fixture', 'created_at' => now(), 'updated_at' => now()]);
            $pr->$table()->attach($id);
        }

        return $pr;
    }

    public function test_command_journey_uses_one_existence_query_without_hydrating_documents(): void
    {
        Http::preventStrayRequests();
        $this->actingAs(User::factory()->create(['department' => 'umum']));
        $pr = $this->package();
        $hydrated = 0;
        Sp::retrieved(function () use (&$hydrated) {
            $hydrated++;
        });
        Spph::retrieved(function () use (&$hydrated) {
            $hydrated++;
        });
        $sql = [];
        DB::listen(function ($query) use (&$sql) {
            $sql[] = strtolower($query->sql);
        });
        $this->getJson(route('command-center.journey', $pr))->assertOk()
            ->assertJsonPath('stages.2.done', true)->assertJsonPath('stages.3.done', true);
        $this->assertSame(0, $hydrated, 'Stage existence does not need SP/SPPH model hydration.');
        $queries = collect($sql)->filter(fn ($query) => str_contains($query, 'sp_ppbj') || str_contains($query, 'spph_ppbj'));
        $this->assertCount(1, $queries);
        $this->assertStringContainsString('exists', $queries->first());
        Http::assertNothingSent();
    }

    public function test_quick_detail_reuses_loaded_references_without_an_additional_existence_query(): void
    {
        Http::preventStrayRequests();
        $this->actingAs(User::factory()->create(['department' => 'umum']));
        $pr = $this->package();
        $sql = [];
        DB::listen(function ($query) use (&$sql) {
            $sql[] = strtolower($query->sql);
        });
        $url = route('procurement.quick-detail', ['kind' => 'ppbj', 'id' => $pr->id]);
        $this->getJson($url)->assertOk()->assertJsonCount(2, 'documents')
            ->assertJsonPath('stages.2.done', true)->assertJsonPath('stages.3.done', true);
        $queries = collect($sql)->filter(fn ($query) => str_contains($query, 'sp_ppbj') || str_contains($query, 'spph_ppbj'));
        $this->assertCount(2, $queries, 'Preview references must not be fetched twice.');
        $sql = [];
        $this->getJson($url)->assertOk();
        $this->assertCount(0, collect($sql)->filter(fn ($query) => str_contains($query, 'sp_ppbj') || str_contains($query, 'spph_ppbj')));
        Http::assertNothingSent();
    }

    public function test_soft_deleted_documents_do_not_mark_stages_complete_but_legacy_fields_still_can(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'umum']));
        $pr = $this->package();
        DB::table('sps')->update(['deleted_at' => now()]);
        DB::table('spphs')->update(['deleted_at' => now()]);
        $url = route('procurement.quick-detail', ['kind' => 'ppbj', 'id' => $pr->id]);
        $this->getJson($url)->assertOk()->assertJsonCount(0, 'documents')
            ->assertJsonPath('stages.2.done', false)->assertJsonPath('stages.3.done', false);
        $this->getJson(route('command-center.journey', $pr))->assertOk()
            ->assertJsonPath('stages.2.done', false)->assertJsonPath('stages.3.done', false);
        $pr->update(['spph_rfq_1' => 'LEGACY-RFQ', 'awarding_sp' => 'LEGACY-SP']);
        $this->getJson($url.'?fresh=1')->assertOk()->assertJsonCount(0, 'documents')
            ->assertJsonPath('stages.2.done', true)->assertJsonPath('stages.3.done', true);
        $sql = [];
        DB::listen(function ($query) use (&$sql) {
            $sql[] = strtolower($query->sql);
        });
        $this->getJson(route('command-center.journey', $pr))->assertOk()
            ->assertJsonPath('stages.2.done', true)->assertJsonPath('stages.3.done', true);
        $this->assertCount(0, collect($sql)->filter(fn ($query) => str_contains($query, 'sp_ppbj') || str_contains($query, 'spph_ppbj')),
            'Existing legacy references already establish stage existence; no relation query is needed.');
    }
}
