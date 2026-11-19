<?php

namespace Tests\Feature;

use App\Http\Controllers\SpController;
use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\User;
use App\Services\SpValueApprovalService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SpReviewReadBudgetTest extends TestCase
{
    use RefreshDatabase;

    private User $actor;

    protected function setUp(): void
    {
        parent::setUp();
        Http::preventStrayRequests();
        $this->actor = User::factory()->create(['name' => 'Buyer penguji', 'department' => 'umum', 'role' => 'user']);
        $this->actingAs($this->actor);
    }

    private function payload(array $numbers = []): array
    {
        return ['nomor_sp' => '704/PKU-XI/SP/2026', 'tanggal_sp' => '2026-11-19', 'nomor_pr_type' => 'ppbj', 'nomor_prs' => $numbers,
            'nama_vendor' => 'Vendor penguji', 'pic' => $this->actor->name, 'deskripsi_pengadaan' => 'Paket peninjauan',
            'nilai_sp' => '1.000.000,01', 'nilai_pr' => '0'];
    }

    private function request(array $input): Request
    {
        $request = Request::create('/synthetic-review-budget', 'POST', $input);
        $request->headers->set('Accept', 'application/json');
        $this->app->instance('request', $request);
        $request->setUserResolver(fn () => $this->actor);

        return $request;
    }

    public function test_large_pr_bodies_are_not_hydrated_and_create_edit_snapshots_and_fingerprints_match_full_records(): void
    {
        foreach (range(1, 20) as $index) {
            Ppbj::create(['ppbj_no' => 'PR/REVIEW/'.$index, 'status' => 'ACTIVE', 'total_sebelum_ppn' => 100000 + $index,
                'uraian' => str_repeat('Rincian arsip panjang. ', 700), 'note' => str_repeat('Catatan lengkap. ', 700)]);
        }
        $full = Ppbj::orderByDesc('id')->get();
        $document = Sp::create(['nomor_sp' => '704/PKU-XI/SP/2026', 'sequence_number' => 704,
            'nama_vendor' => 'Vendor penguji', 'deskripsi_pengadaan' => 'Versi lama', 'pic' => $this->actor->name]);
        $fields = [];
        $capturing = false;
        Ppbj::retrieved(function ($record) use (&$fields, &$capturing) {
            if ($capturing) {
                $fields[] = array_keys($record->getAttributes());
            }
        });
        foreach ([null, $document] as $editing) {
            $fields = [];
            $request = $this->request($this->payload($full->pluck('ppbj_no')->all()));
            $controller = app(SpController::class);
            $capturing = true;
            DB::enableQueryLog();
            DB::flushQueryLog();
            try {
                $actual = $controller->reviewData($request, $editing);
                $queries = DB::getQueryLog();
            } finally {
                $capturing = false;
                DB::disableQueryLog();
            }
            $this->assertCount(1, $queries);
            $this->assertCount(20, $fields);
            foreach ($fields as $attributes) {
                $this->assertCount(5, $attributes, 'Review must not hydrate rich bodies, downstream documents or unrelated metadata.');
                $this->assertNotContains('uraian', $attributes);
                $this->assertNotContains('note', $attributes);
            }
            $plan = (new \ReflectionMethod($controller, 'resolveSpAllocations'))->invoke($controller, $request, $full, $request->nilai_sp);
            $service = app(SpValueApprovalService::class);
            $expected = $service->snapshot($request, $full, $request->nilai_sp, $plan, $editing);
            $this->assertSame($expected, $actual);
            $this->assertSame($service->fingerprint($expected), $service->fingerprint($actual));
            $this->assertSame($full->pluck('ppbj_no')->all(), array_column($actual['prs'], 'nomor'));
            $this->assertEqualsWithDelta(1000000.01, array_sum(array_column($actual['prs'], 'alokasi')), 0.001);
        }
        $this->assertDatabaseCount('sp_value_approvals', 0);
        $this->assertSame(20, Ppbj::whereNull('awarding_sp')->count());
    }

    public function test_empty_ppbj_selection_performs_no_database_query(): void
    {
        $request = $this->request($this->payload());
        DB::enableQueryLog();
        DB::flushQueryLog();
        try {
            $snapshot = app(SpController::class)->reviewData($request);
            $this->assertSame([], DB::getQueryLog());
        } finally {
            DB::disableQueryLog();
        }
        $this->assertSame([], $snapshot['prs']);
        $this->assertSame(0.0, $snapshot['nilai_pr']);
        $this->assertFalse($snapshot['requires_approval']);
    }

    public function test_manual_pr_keeps_its_existence_guard_without_an_empty_select(): void
    {
        $request = $this->request(array_replace($this->payload(), ['nomor_pr_type' => 'manual', 'nomor_pr' => "MANUAL/' OR 1=1 --", 'nilai_pr' => '900.000']));
        DB::enableQueryLog();
        DB::flushQueryLog();
        try {
            $snapshot = app(SpController::class)->reviewData($request);
            $queries = DB::getQueryLog();
        } finally {
            DB::disableQueryLog();
        }
        $this->assertCount(1, $queries);
        $this->assertStringContainsString('exists', $queries[0]['query']);
        $this->assertSame(["MANUAL/' OR 1=1 --"], $queries[0]['bindings']);
        $this->assertSame("MANUAL/' OR 1=1 --", $snapshot['nomor_pr_manual']);
        $this->assertTrue($snapshot['requires_approval']);
    }

    public function test_missing_cancelled_and_conflicting_prs_still_stop_the_read_only_preview(): void
    {
        foreach (['missing', 'cancelled', 'conflict'] as $case) {
            $number = 'PR/GUARD/'.$case;
            if ($case !== 'missing') {
                Ppbj::create(['ppbj_no' => $number, 'status' => $case === 'cancelled' ? 'CANCELLED' : 'ACTIVE',
                    'awarding_sp' => $case === 'conflict' ? 'ANOTHER/SP' : null, 'total_sebelum_ppn' => 100000]);
            }
            $this->postJson(route('procurement.review', ['kind' => 'sp']), $this->payload([$number]) + ['action' => 'save'])
                ->assertStatus($case === 'conflict' ? 409 : 422)->assertJsonValidationErrors('nomor_prs');
        }
        $this->assertDatabaseCount('sps', 0);
        $this->assertDatabaseCount('sp_value_approvals', 0);
    }
}
