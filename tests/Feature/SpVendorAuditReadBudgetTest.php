<?php

namespace Tests\Feature;

use App\Http\Controllers\SpController;
use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SpVendorAuditReadBudgetTest extends TestCase
{
    use RefreshDatabase;

    private function sp(string $number, string $pr, string $vendor = 'Vendor utama'): Sp
    {
        return Sp::create(['nomor_sp' => $number, 'sequence_number' => Sp::withTrashed()->count() + 1,
            'tanggal_sp' => '2026-11-19', 'nomor_pr' => $pr, 'nama_vendor' => $vendor, 'pic' => 'Penguji', 'deskripsi_pengadaan' => 'Audit vendor']);
    }

    private function pr(string $number, ?string $spph): Ppbj
    {
        return Ppbj::create(['ppbj_no' => $number, 'spph_rfq_1' => $spph, 'status' => 'ACTIVE']);
    }

    private function spph(string $number, array $vendors = ['Vendor utama', 'Vendor cadangan']): Spph
    {
        return Spph::create(['nomor_spph' => $number, 'sequence_number' => Spph::withTrashed()->count() + 1,
            'tanggal' => '2026-11-19', 'nama_vendor' => $vendors[0] ?? '', 'vendor_names' => $vendors,
            'pic' => 'Penguji', 'deskripsi_pengadaan' => 'Audit vendor']);
    }

    private function audit(Collection $documents): array
    {
        DB::enableQueryLog();
        DB::flushQueryLog();
        $result = (new \ReflectionMethod(SpController::class, 'buildSpVendorAuditMap'))->invoke(app(SpController::class), $documents);
        $queries = DB::getQueryLog();
        DB::disableQueryLog();

        return [$result, $queries];
    }

    public function test_loaded_primary_prs_are_reused_and_all_vendor_statuses_remain_correct(): void
    {
        $this->spph('SPPH/main');
        $this->spph('SPPH/empty', []);
        $deleted = $this->spph('SPPH/deleted');
        $deleted->delete();
        $ids = [];
        foreach ([['match', 'SPPH/main', '  VENDOR   UTAMA '], ['mismatch', 'SPPH/main', 'Vendor lain'],
            ['no_spph', null, 'Vendor utama'], ['no_vendor', 'SPPH/empty', 'Vendor utama'],
            ['deleted', 'SPPH/deleted', 'Vendor utama']] as [$number, $spph, $vendor]) {
            $pr = $this->pr('PR/'.$number, $spph);
            $sp = $this->sp('SP/'.$number, $pr->ppbj_no, $vendor);
            $sp->ppbjs()->attach($pr->id, ['urutan' => 1]);
            $ids[$number] = $sp->id;
        }
        $manual = $this->sp('SP/manual', 'PR/not-in-system');
        $documents = Sp::with('ppbjs:id,ppbj_no,spph_rfq_1')->get();
        [$result, $queries] = $this->audit($documents);

        $this->assertSame('match', $result[$ids['match']]['status']);
        $this->assertSame('mismatch', $result[$ids['mismatch']]['status']);
        $this->assertSame('no_spph', $result[$ids['no_spph']]['status']);
        $this->assertSame('no_vendor', $result[$ids['no_vendor']]['status']);
        $this->assertSame('no_vendor', $result[$ids['deleted']]['status']);
        $this->assertSame('manual', $result[$manual->id]['status']);
        $this->assertSame(['Vendor utama', 'Vendor cadangan'], $result[$ids['match']]['vendors']);
        $this->assertCount(2, $queries);
        $prQuery = collect($queries)->first(fn ($query) => str_contains($query['query'], 'from "ppbj"'));
        $this->assertSame(['PR/not-in-system'], $prQuery['bindings'], 'Only primary references missing from eager-loaded relations need another PR read.');
    }

    public function test_fully_linked_page_needs_one_vendor_read_and_no_repeated_pr_read(): void
    {
        $this->spph('SPPH/shared');
        foreach (range(1, 10) as $number) {
            $pr = $this->pr('PR/'.$number, 'SPPH/shared');
            $this->sp('SP/'.$number, $pr->ppbj_no)->ppbjs()->attach($pr->id, ['urutan' => 1]);
        }
        [$result, $queries] = $this->audit(Sp::with('ppbjs:id,ppbj_no,spph_rfq_1')->get());

        $this->assertCount(10, $result);
        $this->assertSame(['match'], array_values(array_unique(array_column($result, 'status'))));
        $this->assertCount(1, $queries);
        $this->assertStringContainsString('from "spphs"', $queries[0]['query']);
        $this->assertSame(['SPPH/shared'], $queries[0]['bindings']);
    }

    public function test_secondary_grouped_pr_never_replaces_the_primary_reference_and_incomplete_relations_fall_back(): void
    {
        $this->spph('SPPH/primary');
        $this->spph('SPPH/secondary', ['Vendor lain']);
        $primary = $this->pr('PR/primary', 'SPPH/primary');
        $secondary = $this->pr('PR/secondary', 'SPPH/secondary');
        $sp = $this->sp('SP/grouped', $primary->ppbj_no);
        $sp->ppbjs()->attach($secondary->id, ['urutan' => 1]);
        foreach ([null, 'ppbjs:id,ppbj_no', 'ppbjs:id,ppbj_no,spph_rfq_1'] as $relationship) {
            $documents = $relationship ? Sp::with($relationship)->get() : Sp::all();
            [$result, $queries] = $this->audit($documents);
            $this->assertSame('match', $result[$sp->id]['status']);
            $this->assertSame('SPPH/primary', $result[$sp->id]['spph_nomor']);
            $this->assertCount(2, $queries);
            $this->assertSame(['PR/primary'], $queries[0]['bindings']);
        }
    }

    public function test_pr_and_spph_number_zero_are_not_dropped_as_empty_values(): void
    {
        $this->spph('0');
        $pr = $this->pr('0', '0');
        $sp = $this->sp('SP/zero', '0');
        $sp->ppbjs()->attach($pr->id, ['urutan' => 1]);
        foreach ([Sp::all(), Sp::with('ppbjs:id,ppbj_no,spph_rfq_1')->get()] as $documents) {
            [$result] = $this->audit($documents);
            $this->assertSame('match', $result[$sp->id]['status'] ?? null);
            $this->assertSame('0', $result[$sp->id]['spph_nomor']);
        }
    }

    public function test_index_loads_the_required_field_and_refreshes_after_database_changes_without_new_business_cache(): void
    {
        Http::preventStrayRequests();
        $actor = User::factory()->create(['department' => 'umum', 'role' => 'viewer']);
        $first = $this->spph('SPPH/first');
        $second = $this->spph('SPPH/second', ['Vendor lain']);
        $pr = $this->pr('PR/fresh', $first->nomor_spph);
        $sp = $this->sp('SP/fresh', $pr->ppbj_no);
        $sp->ppbjs()->attach($pr->id, ['urutan' => 1]);
        $response = $this->actingAs($actor)->get(route('sp.index'))->assertOk();
        $loaded = $response->viewData('sps')->first();
        $this->assertArrayHasKey('spph_rfq_1', $loaded->ppbjs->first()->getAttributes());
        $this->assertSame('match', $response->viewData('spVendorAuditMap')[$sp->id]['status']);
        DB::table('ppbj')->where('id', $pr->id)->update(['spph_rfq_1' => $second->nomor_spph]);
        $next = $this->get(route('sp.index'))->assertOk();
        $this->assertSame('mismatch', $next->viewData('spVendorAuditMap')[$sp->id]['status']);
        $second->delete();
        $next = $this->get(route('sp.index'))->assertOk();
        $this->assertSame('no_vendor', $next->viewData('spVendorAuditMap')[$sp->id]['status']);
        $second->restore();
        $next = $this->get(route('sp.index'))->assertOk();
        $this->assertSame('mismatch', $next->viewData('spVendorAuditMap')[$sp->id]['status']);
        $this->actingAs(User::factory()->create(['department' => 'operasional']))->get(route('sp.index'))->assertForbidden();
    }

    public function test_empty_and_loaded_prs_without_spph_do_not_issue_vendor_queries(): void
    {
        [$result, $queries] = $this->audit(new Collection);
        $this->assertSame([], $result);
        $this->assertSame([], $queries);
        $pr = $this->pr('PR/no-spph', null);
        $sp = $this->sp('SP/no-spph', $pr->ppbj_no);
        $sp->ppbjs()->attach($pr->id, ['urutan' => 1]);
        [$result, $queries] = $this->audit(Sp::with('ppbjs:id,ppbj_no,spph_rfq_1')->get());
        $this->assertSame('no_spph', $result[$sp->id]['status']);
        $this->assertSame([], $queries);
    }
}
