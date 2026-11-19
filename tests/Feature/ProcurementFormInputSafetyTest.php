<?php

namespace Tests\Feature;

use App\Http\Controllers\SpController;
use App\Http\Controllers\SpphController;
use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use App\Support\ProcurementFormInput;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class ProcurementFormInputSafetyTest extends TestCase
{
    use RefreshDatabase;

    private User $actor;

    protected function setUp(): void
    {
        parent::setUp();
        Http::preventStrayRequests();
        $this->actor = User::factory()->create(['name' => 'Penguji form', 'department' => 'umum', 'role' => 'user']);
        $this->actingAs($this->actor);
    }

    private function payload(string $kind): array
    {
        return [$kind === 'sp' ? 'nomor_sp' : 'nomor_spph' => '701/PKU-XI/'.strtoupper($kind).'/2026',
            $kind === 'sp' ? 'tanggal_sp' : 'tanggal' => '2026-11-19', 'nomor_pr_type' => 'ppbj', 'nomor_prs' => [],
            'nama_vendor' => 'Vendor penguji', 'pic' => $this->actor->name, 'deskripsi_pengadaan' => 'Kebutuhan kantor',
            'nilai_sp' => '100.000', 'nilai_pr' => '200.000'];
    }

    private function document(string $kind): Sp|Spph
    {
        $class = $kind === 'sp' ? Sp::class : Spph::class;

        return $class::create(['created_by_user_id' => $this->actor->id, 'sequence_number' => 701] + $this->payload($kind));
    }

    private function request(array $input): Request
    {
        $request = Request::create('/synthetic-form-check', 'POST', $input);
        $request->headers->set('Accept', 'application/json');
        $this->app->instance('request', $request);
        $request->setUserResolver(fn () => $this->actor);

        return $request;
    }

    public function test_malformed_sp_create_edit_and_review_inputs_stop_before_any_sql_or_normalization(): void
    {
        $sp = $this->document('sp');
        $cases = [
            ['nomor_sp', ['bad']], ['tanggal_sp', ['bad']], ['nomor_pr', ['bad']], ['nomor_prs', 'PR/scalar'],
            ['nomor_prs', [['nested']]], ['nomor_prs', array_fill(0, 21, 'PR/duplicate')],
            ['items', array_fill(0, 51, [])], ['items', ['scalar row']],
            ['allocations', 'scalar'], ['allocations', ['scalar row']], ['allocations', [['ppbj_no' => ['bad'], 'value' => 100]]],
            ['allocations', [['ppbj_no' => 'PR/1', 'value' => ['bad']]]], ['nilai_sp', ['bad']], ['nilai_pr', true],
        ];
        foreach (['store', 'update', 'reviewData'] as $action) {
            foreach ($cases as [$field, $value]) {
                $request = $this->request(array_replace($this->payload('sp'), [$field => $value]));
                DB::enableQueryLog();
                DB::flushQueryLog();
                try {
                    app(SpController::class)->$action($request, ...($action === 'store' ? [] : [$sp]));
                    $this->fail('Malformed SP '.$field.' was accepted by '.$action);
                } catch (ValidationException $error) {
                    $this->assertTrue(collect(array_keys($error->errors()))->contains(fn ($key) => $key === $field || str_starts_with($key, $field.'.')));
                    $this->assertSame([], DB::getQueryLog(), 'Invalid structure must stop before existence, uniqueness or business reads.');
                } finally {
                    DB::disableQueryLog();
                }
            }
        }
    }

    public function test_malformed_spph_create_and_edit_inputs_stop_before_sql(): void
    {
        $spph = $this->document('spph');
        foreach (['store', 'update'] as $action) {
            foreach ([['nomor_spph', []], ['tanggal', []], ['nomor_prs', 'PR/scalar'], ['nomor_prs', [['bad']]],
                ['nomor_prs', array_fill(0, 21, 'PR/duplicate')], ['items', ['scalar row']], ['items', array_fill(0, 21, [])],
                ['vendor_names', array_fill(0, 21, 'Vendor')]] as [$field, $value]) {
                $request = $this->request(array_replace($this->payload('spph'), [$field => $value]));
                DB::enableQueryLog();
                DB::flushQueryLog();
                try {
                    app(SpphController::class)->$action($request, ...($action === 'store' ? [] : [$spph]));
                    $this->fail('Malformed SPPH '.$field.' was accepted');
                } catch (ValidationException $error) {
                    $this->assertTrue(collect(array_keys($error->errors()))->contains(fn ($key) => $key === $field || str_starts_with($key, $field.'.')));
                    $this->assertSame([], DB::getQueryLog());
                } finally {
                    DB::disableQueryLog();
                }
            }
        }
    }

    public function test_unauthorized_edit_is_denied_before_processing_malformed_or_known_pr_input(): void
    {
        Ppbj::create(['ppbj_no' => 'PR/KNOWN']);
        foreach (['sp' => SpController::class, 'spph' => SpphController::class] as $kind => $class) {
            $document = $this->document($kind);
            $document->created_by_user_id = $this->actor->id + 100;
            $document->pic = 'Different owner';
            $request = $this->request(['nomor_pr_type' => 'manual', 'nomor_pr' => 'PR/KNOWN', 'nomor_prs' => [['bad']], 'nomor_sp' => ['bad']]);
            DB::enableQueryLog();
            DB::flushQueryLog();
            try {
                $response = app($class)->update($request, $document);
                $this->assertSame(403, $response->getStatusCode());
                $this->assertSame([], DB::getQueryLog());
            } finally {
                DB::disableQueryLog();
            }
        }
    }

    public function test_explicitly_null_items_can_be_saved_and_edited_as_an_empty_item_list(): void
    {
        foreach (['sp' => Sp::class, 'spph' => Spph::class] as $kind => $class) {
            $payload = $this->payload($kind) + ['items' => null];
            $this->postJson(route($kind.'.store'), $payload)->assertOk();
            $document = $class::where($kind === 'sp' ? 'nomor_sp' : 'nomor_spph', $payload[$kind === 'sp' ? 'nomor_sp' : 'nomor_spph'])->firstOrFail();
            $document->items()->create(['urutan' => 1, 'nama_barang' => 'Existing row', 'jumlah' => '1']);
            $payload['deskripsi_pengadaan'] = 'Kebutuhan diperbarui';
            $this->putJson(route($kind.'.update', $document), $payload)->assertOk();
            $this->assertSame(0, $document->items()->count());
            $this->assertSame('Kebutuhan diperbarui', $document->fresh()->deskripsi_pengadaan);
        }
    }

    public function test_guard_preserves_locale_money_zero_dates_and_absent_items_for_approval_fingerprints(): void
    {
        foreach ([0, 100000, 100000.5, '0', '1.234.567,89', 'Rp 1.234.567', null, ''] as $money) {
            $input = ['nomor_sp' => '001/PKU-II/SP/2025', 'tanggal_sp' => '2025-02-01', 'nilai_sp' => $money, 'nomor_prs' => [' 0 ', ' 0 ', ''],
                'allocations' => [['ppbj_no' => '0', 'value' => $money]]];
            $request = $this->request($input);
            ProcurementFormInput::validate($request, true);
            $this->assertSame($input, $request->all(), 'The guard must not reformat inputs or add an items key to approval snapshots.');
        }
    }

    public function test_http_errors_are_json_validation_errors_and_do_not_create_documents(): void
    {
        foreach (['sp', 'spph'] as $kind) {
            $field = $kind === 'sp' ? 'nomor_sp' : 'nomor_spph';
            $this->postJson(route($kind.'.store'), array_replace($this->payload($kind), [$field => ['bad']]))
                ->assertUnprocessable()->assertJsonValidationErrors($field);
        }
        $this->assertDatabaseCount('sps', 0);
        $this->assertDatabaseCount('spphs', 0);
    }
}
