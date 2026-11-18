<?php

namespace Tests\Feature;

use App\Http\Controllers\SpphController;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class SpphLookupReliabilityTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Http::preventStrayRequests();
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'superadmin']));
    }

    private function request(array $input): Request
    {
        $request = Request::create('/spph/synthetic-lookup', 'GET', $input);
        $request->headers->set('Accept', 'application/json');
        $request->setUserResolver(fn () => auth()->user());
        $this->app->instance('request', $request);

        return $request;
    }

    public function test_malformed_number_date_and_record_inputs_stop_before_sql(): void
    {
        foreach (['checkNomor', 'suggestNomor'] as $method) {
            foreach ([['nomor' => []], ['nomor' => str_repeat('x', 256)], ['tanggal' => []], ['tanggal' => '2026-02-30'], ['tanggal' => 'nonsense'], ['exclude_id' => []], ['exclude_id' => -1], ['exclude_id' => '9999999999999999999999999']] as $input) {
                $request = $this->request($input);
                DB::enableQueryLog();
                DB::flushQueryLog();
                try {
                    app(SpphController::class)->$method($request);
                    $this->fail('Malformed lookup accepted');
                } catch (ValidationException) {
                    $this->assertCount(0, DB::getQueryLog());
                }
            }
        }
    }

    public function test_number_checks_keep_cache_and_do_not_query_for_empty_input(): void
    {
        $controller = app(SpphController::class);
        $request = $this->request(['nomor' => null]);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $empty = $controller->checkNomor($request);
        $this->assertSame(['status' => 'empty'], $empty->getData(true));
        $this->assertCount(0, DB::getQueryLog());
        $this->assertSame('no-store, private', $empty->headers->get('Cache-Control'));
        $request = $this->request(['nomor' => 'SYNTHETIC-NON-SEQUENTIAL-LOOKUP']);
        $cold = $controller->checkNomor($request);
        $this->assertSame('ok', $cold->getData(true)['status']);
        $this->assertCount(1, DB::getQueryLog());
        DB::flushQueryLog();
        $warm = $controller->checkNomor($request);
        $this->assertSame($cold->getData(true), $warm->getData(true));
        $this->assertCount(0, DB::getQueryLog());
        $this->assertSame('no-store, private', $warm->headers->get('Cache-Control'));
    }

    public function test_selected_old_date_is_preserved_in_suggestions_and_normalization(): void
    {
        $response = app(SpphController::class)->suggestNomor($this->request(['tanggal' => '2025-03-01']));
        $this->assertSame(['suggestions' => ['001/PKU-III/SPPH/2025'], 'last' => null], $response->getData(true));
        $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
        $result = app(SpphController::class)->checkNomor($this->request(['nomor' => '007/PKU-XI/SPPH/2026', 'tanggal' => '2025-03-01']))->getData(true);
        $this->assertSame('007/PKU-III/SPPH/2025', $result['normalized_nomor']);
        $this->assertSame('ok', $result['status']);
    }

    public function test_archived_numbers_remain_reserved_and_edit_exclusion_works(): void
    {
        $spph = Spph::create(['nomor_spph' => '001/PKU-III/SPPH/2025', 'sequence_number' => 1, 'tanggal' => '2025-03-01', 'nama_vendor' => 'Vendor uji', 'deskripsi_pengadaan' => 'Uji nomor', 'pic' => 'Penguji']);
        $spph->delete();
        $controller = app(SpphController::class);
        $duplicate = $controller->checkNomor($this->request(['nomor' => $spph->nomor_spph, 'tanggal' => '2025-03-01']));
        $this->assertSame('duplicate', $duplicate->getData(true)['status']);
        $excluded = $controller->checkNomor($this->request(['nomor' => $spph->nomor_spph, 'tanggal' => '2025-03-01', 'exclude_id' => $spph->id]));
        $this->assertSame('ok', $excluded->getData(true)['status']);
        $this->assertSame('002/PKU-III/SPPH/2025', $controller->suggestNomor($this->request(['tanggal' => '2025-03-01']))->getData(true)['suggestions'][0]);
    }

    public function test_suggestions_are_two_queries_and_routes_keep_access_guards(): void
    {
        $request = $this->request(['tanggal' => '2026-11-18']);
        DB::enableQueryLog();
        DB::flushQueryLog();
        app(SpphController::class)->suggestNomor($request);
        $this->assertCount(2, DB::getQueryLog());
        foreach (['spph.check-nomor', 'spph.suggest-nomor'] as $name) {
            foreach (['auth', 'readonly.block', 'dept:umum'] as $guard) {
                $this->assertContains($guard, app('router')->getRoutes()->getByName($name)->gatherMiddleware());
            }
        }
        $other = User::factory()->create(['department' => 'operasional', 'role' => 'user']);
        $this->actingAs($other)->getJson(route('spph.check-nomor'))->assertForbidden();
        auth()->logout();
        $this->getJson(route('spph.suggest-nomor'))->assertUnauthorized();
    }
}
