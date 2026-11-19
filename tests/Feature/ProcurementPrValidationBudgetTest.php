<?php

namespace Tests\Feature;

use App\Http\Controllers\SpController;
use App\Http\Controllers\SpphController;
use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class ProcurementPrValidationBudgetTest extends TestCase
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

    private function payload(string $kind, array $numbers): array
    {
        return [$kind === 'sp' ? 'nomor_sp' : 'nomor_spph' => '702/PKU-XI/'.strtoupper($kind).'/2026',
            $kind === 'sp' ? 'tanggal_sp' : 'tanggal' => '2026-11-19', 'nomor_pr_type' => 'ppbj', 'nomor_prs' => $numbers,
            'nama_vendor' => 'Vendor penguji', 'pic' => $this->actor->name, 'deskripsi_pengadaan' => 'Paket pengadaan', 'nilai_sp' => '10.000'];
    }

    private function numbers(int $count = 20): array
    {
        $numbers = [];
        foreach (range(1, $count) as $index) {
            $number = 'PR/BUDGET/'.str_pad((string) $index, 4, '0', STR_PAD_LEFT);
            Ppbj::create(['ppbj_no' => $number, 'uraian' => 'Kebutuhan kantor', 'total_sebelum_ppn' => 100000]);
            $numbers[] = $number;
        }

        return $numbers;
    }

    /** Missing PIC deliberately stops the controller before any save transaction. */
    private function validationRead(string $kind, string $action, array $numbers): array
    {
        $payload = $this->payload($kind, $numbers);
        unset($payload['pic']);
        $request = Request::create('/synthetic-validation-budget', 'POST', $payload);
        $request->headers->set('Accept', 'application/json');
        $this->app->instance('request', $request);
        $request->setUserResolver(fn () => $this->actor);
        $document = ($kind === 'sp' ? new Sp : new Spph)->forceFill([
            'id' => -1, 'created_by_user_id' => $this->actor->id, 'pic' => $this->actor->name,
        ]);
        DB::enableQueryLog();
        DB::flushQueryLog();
        try {
            app($kind === 'sp' ? SpController::class : SpphController::class)->$action($request, ...($action === 'store' ? [] : [$document]));
            $this->fail('A request without PIC reached the save path.');
        } catch (ValidationException $error) {
            return [$error->errors(), DB::getQueryLog()];
        } finally {
            DB::disableQueryLog();
        }
    }

    private function existenceQueries(array $queries): array
    {
        return array_values(array_filter($queries, fn ($row) => str_contains($row['query'], 'from "ppbj"') && str_contains($row['query'], 'count(')));
    }

    public function test_twenty_prs_use_one_existence_query_in_both_create_and_edit_paths(): void
    {
        $numbers = array_reverse($this->numbers());
        foreach (['sp', 'spph'] as $kind) {
            foreach (['store', 'update'] as $action) {
                [$errors, $queries] = $this->validationRead($kind, $action, $numbers);
                $this->assertSame(['pic'], array_keys($errors));
                $exists = $this->existenceQueries($queries);
                $this->assertCount(1, $exists, $kind.' '.$action.' must check the package in one SQL read.');
                $this->assertSame($numbers, $exists[0]['bindings']);
                $this->assertSame([], array_values(array_filter($queries, fn ($row) => preg_match('/^\s*(insert|update|delete|replace)\b/i', $row['query']))));
            }
        }
    }

    public function test_missing_and_wildcard_like_pr_numbers_are_rejected_without_any_partial_save(): void
    {
        $numbers = $this->numbers(2);
        foreach (['sp', 'spph'] as $kind) {
            foreach (['store', 'update'] as $action) {
                foreach (['PR/BUDGET/%', 'PR/BUDGET/000_', "' OR 1=1 --"] as $unknown) {
                    [$errors, $queries] = $this->validationRead($kind, $action, [$numbers[0], $unknown]);
                    $this->assertArrayHasKey('nomor_prs', $errors);
                    $this->assertCount(1, $this->existenceQueries($queries));
                }
            }
        }
        $this->assertDatabaseCount('sps', 0);
        $this->assertDatabaseCount('spphs', 0);
    }

    public function test_empty_pr_packages_do_not_issue_an_existence_query(): void
    {
        foreach (['sp', 'spph'] as $kind) {
            foreach (['store', 'update'] as $action) {
                [$errors, $queries] = $this->validationRead($kind, $action, []);
                $this->assertSame(['pic'], array_keys($errors));
                $this->assertSame([], $this->existenceQueries($queries));
            }
        }
    }

    public function test_twenty_pr_packages_keep_order_and_sync_all_links_after_create_and_edit(): void
    {
        $numbers = array_reverse($this->numbers());
        foreach (['spph' => Spph::class, 'sp' => Sp::class] as $kind => $class) {
            $payload = $this->payload($kind, $numbers);
            $this->postJson(route($kind.'.store'), $payload)->assertOk();
            $document = $class::firstOrFail();
            $this->assertSame($numbers, $document->ppbjs()->get()->pluck('ppbj_no')->all());
            $this->assertSame($numbers[0], $document->nomor_pr);
            $payload['nomor_prs'] = array_reverse($numbers);
            $this->putJson(route($kind.'.update', $document), $payload)->assertOk();
            $this->assertSame(array_reverse($numbers), $document->ppbjs()->get()->pluck('ppbj_no')->all());
            $this->assertSame($payload['nomor_prs'][0], $document->fresh()->nomor_pr);
            $column = $kind === 'sp' ? 'awarding_sp' : 'spph_rfq_1';
            $this->assertSame(20, Ppbj::where($column, $payload[$kind === 'sp' ? 'nomor_sp' : 'nomor_spph'])->count());
        }
    }
}
