<?php

namespace Tests\Feature;

use App\Http\Controllers\SpController;
use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class SpLookupReliabilityTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Http::preventStrayRequests();
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'superadmin']));
    }

    private function request(array $input = []): Request
    {
        $request = Request::create('/sp/synthetic-lookup', 'GET', $input);
        $request->setUserResolver(fn () => auth()->user());
        $request->headers->set('Accept', 'application/json');
        $this->app->instance('request', $request);

        return $request;
    }

    private function ppbj(string $number, array $extra = []): Ppbj
    {
        return Ppbj::create($extra + ['ppbj_no' => $number, 'uraian' => 'Pengadaan '.$number, 'status' => 'ACTIVE', 'tgl_ppbj' => '2026-11-18', 'total_sebelum_ppn' => 1000000]);
    }

    public function test_invalid_lookup_inputs_stop_before_sql(): void
    {
        $cases = [
            'getPpbjOptions' => [['q' => []], ['q' => str_repeat('a', 161)]],
            'checkPpbjStatus' => [['ppbj_nos' => 'PR/1'], ['ppbj_nos' => [['PR/1']]], ['ppbj_nos' => array_fill(0, 21, 'PR/1')], ['ppbj_no' => []], ['ppbj_nos' => [str_repeat('x', 256)]]],
            'checkNomor' => [['nomor' => []], ['nomor' => str_repeat('a', 256)], ['tanggal' => []], ['tanggal' => '2026-02-30'], ['exclude_id' => []], ['exclude_id' => -1], ['oracle_mode' => []], ['oracle' => []], ['mode' => []], ['mode' => 'invalid']],
            'suggestNomor' => [['tanggal' => []], ['tanggal' => 'not-a-date'], ['oracle_mode' => []], ['mode' => []]],
        ];
        foreach ($cases as $method => $inputs) {
            foreach ($inputs as $input) {
                $request = $this->request($input);
                DB::enableQueryLog();
                DB::flushQueryLog();
                try {
                    app(SpController::class)->$method($request);
                    $this->fail('Malformed lookup accepted: '.$method);
                } catch (ValidationException) {
                    $this->assertCount(0, DB::getQueryLog());
                }
            }
        }
    }

    public function test_options_search_zero_and_wildcard_characters_literally_without_expanding_results(): void
    {
        foreach (['0', '%', '_', '!', '\\'] as $term) {
            $this->ppbj('PR/'.$term.'/literal');
        }
        $this->ppbj('PR/ordinary');
        $controller = app(SpController::class);
        foreach (['0', '%', '_', '!', '\\'] as $term) {
            $response = $controller->getPpbjOptions($this->request(['q' => ' '.$term.' ']));
            $data = $response->getData(true);
            $this->assertCount(1, $data['results']);
            $this->assertSame('PR/'.$term.'/literal', $data['results'][0]['id']);
            $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
        }
    }

    public function test_options_remain_bounded_and_batch_spph_metadata_in_two_queries(): void
    {
        Spph::create(['nomor_spph' => 'LOOKUP/SPPH', 'sequence_number' => 1, 'tanggal' => '2026-11-18', 'nama_vendor' => 'Vendor uji', 'vendor_names' => ['Vendor uji'], 'pic' => 'Penguji', 'deskripsi_pengadaan' => 'Uji lookup']);
        foreach (range(1, 55) as $i) {
            $this->ppbj(sprintf('PR/%03d', $i), ['spph_rfq_1' => 'LOOKUP/SPPH']);
        }
        $this->ppbj('PR/cancelled', ['status' => 'CANCELLED']);
        $this->ppbj('PR/awarded', ['awarding_sp' => 'SP/existing']);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $data = app(SpController::class)->getPpbjOptions($this->request())->getData(true);
        $this->assertCount(2, DB::getQueryLog());
        $this->assertCount(50, $data['results']);
        $this->assertSame(['Vendor uji'], $data['results'][0]['spph_vendors']);
        $this->assertNotContains('PR/cancelled', array_column($data['results'], 'id'));
        $this->assertNotContains('PR/awarded', array_column($data['results'], 'id'));
    }

    public function test_package_checks_keep_order_zero_and_totals_and_do_not_silently_drop_selection(): void
    {
        $this->ppbj('0');
        $this->ppbj('PR/2', ['total_sebelum_ppn' => 2000000]);
        $data = app(SpController::class)->checkPpbjStatus($this->request(['ppbj_nos' => [' PR/2 ', '0', 'PR/2', '']]))->getData(true);
        $this->assertSame('PR/2', $data['primary_ppbj_no']);
        $this->assertSame(['PR/2', '0'], array_column($data['package_items'], 'ppbj_no'));
        $this->assertSame(3000000, $data['total_sebelum_ppn']);
        $this->assertSame(2, $data['package_count']);
        $this->assertSame('available', $data['status']);
    }

    public function test_spph_item_autofill_preserves_prices_with_one_cold_schema_read(): void
    {
        Schema::table('spph_items', function ($table) {
            $table->decimal('unit_price', 15, 2)->nullable();
        });
        Cache::forget('spph_items:auto_fill_columns:v1');
        $spph = Spph::create(['nomor_spph' => 'LOOKUP/ITEM', 'sequence_number' => 1, 'tanggal' => '2026-11-18', 'nama_vendor' => 'Vendor uji', 'pic' => 'Penguji', 'deskripsi_pengadaan' => 'Uji item']);
        DB::table('spph_items')->insert(['spph_id' => $spph->id, 'urutan' => 1, 'nama_barang' => 'Kursi', 'satuan' => 'unit', 'jumlah' => 2, 'unit_price' => 150000, 'tgl_pemenuhan' => '2026-12-01']);
        $this->ppbj('PR/item', ['spph_rfq_1' => $spph->nomor_spph]);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $data = app(SpController::class)->checkPpbjStatus($this->request(['ppbj_no' => 'PR/item']))->getData(true);
        // SQLite uses two metadata statements for one column-list read; the
        // remaining three reads fetch PPBJ, SPPH and items respectively.
        $this->assertCount(5, DB::getQueryLog());
        $this->assertSame('Kursi', $data['spph_items'][0]['nama_barang']);
        $this->assertSame('150.000', $data['spph_items'][0]['harga_satuan']);
        $this->assertSame('300.000', $data['spph_items'][0]['subtotal']);
        $this->assertSame('2026-12-01', $data['spph_items'][0]['tgl_pemenuhan']);
        DB::flushQueryLog();
        app(SpController::class)->checkPpbjStatus($this->request(['ppbj_no' => 'PR/item']));
        $this->assertCount(3, DB::getQueryLog());
    }

    public function test_empty_single_missing_cancelled_and_linked_statuses_stay_private(): void
    {
        $this->ppbj('PR/cancelled', ['status' => 'CANCELLED']);
        $this->ppbj('PR/linked', ['awarding_sp' => '<svg>existing number']);
        $controller = app(SpController::class);
        foreach ([[[], 'empty'], [['ppbj_no' => 'PR/missing'], 'manual'], [['ppbj_no' => 'PR/cancelled'], 'cancelled'], [['ppbj_no' => 'PR/linked'], 'already_linked']] as [$input, $expected]) {
            $response = $controller->checkPpbjStatus($this->request($input));
            $this->assertSame($expected, $response->getData(true)['status']);
            $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
        }
    }

    public function test_number_cache_is_reused_but_a_successful_save_invalidates_old_available_hints(): void
    {
        $controller = app(SpController::class);
        $input = ['nomor' => '901/PKU-XI/SP/2026', 'tanggal' => '2026-11-18'];
        $this->assertSame('ok', $controller->checkNomor($this->request($input))->getData(true)['status']);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $this->assertSame('ok', $controller->checkNomor($this->request($input))->getData(true)['status']);
        $this->assertCount(0, DB::getQueryLog());
        $this->postJson(route('sp.store'), ['nomor_sp' => $input['nomor'], 'tanggal_sp' => $input['tanggal'], 'nama_vendor' => 'Vendor uji', 'deskripsi_pengadaan' => 'Uji invalidasi cache nomor', 'pic' => auth()->user()->name, 'nomor_pr_type' => 'manual', 'nomor_pr' => 'MANUAL/TEST'])->assertOk();
        $this->assertSame('duplicate', $controller->checkNomor($this->request($input))->getData(true)['status']);
        $this->assertDatabaseCount('sps', 1);
    }

    public function test_oracle_dates_and_old_but_valid_document_years_keep_existing_semantics(): void
    {
        $controller = app(SpController::class);
        $oracle = $controller->suggestNomor($this->request(['oracle_mode' => '1']))->getData(true);
        $this->assertTrue($oracle['manual']);
        $this->assertSame([], $oracle['suggestions']);
        $auto = $controller->suggestNomor($this->request(['tanggal' => '2025-02-01']));
        $this->assertStringEndsWith('/PKU-II/SP/2025', $auto->getData(true)['suggestions'][0]);
        $this->assertSame('no-store, private', $auto->headers->get('Cache-Control'));
        $this->assertSame('empty', $controller->checkNomor($this->request(['nomor' => null]))->getData(true)['status']);
    }

    public function test_lookup_routes_retain_auth_and_department_guards_and_allow_viewer_reads(): void
    {
        foreach (['sp.check-nomor', 'sp.suggest-nomor', 'sp.ppbj-options', 'sp.check-ppbj'] as $name) {
            $middleware = $this->app['router']->getRoutes()->getByName($name)->gatherMiddleware();
            $this->assertContains('auth', $middleware);
            $this->assertContains('dept:umum', $middleware);
            $this->assertContains('readonly.block', $middleware);
        }
        $this->actingAs(User::factory()->create(['role' => 'viewer', 'department' => 'umum']));
        $this->getJson(route('sp.ppbj-options'))->assertOk();
        $this->getJson(route('sp.suggest-nomor'))->assertOk();
        $this->actingAs(User::factory()->create(['role' => 'user', 'department' => 'operasional']));
        $this->getJson(route('sp.ppbj-options'))->assertForbidden();
    }

    public function test_edit_item_read_is_private_ordered_and_uses_one_narrow_query(): void
    {
        $sp = Sp::create(['nomor_sp' => '902/PKU-XI/SP/2026', 'sequence_number' => 902, 'tanggal_sp' => '2026-11-18', 'nama_vendor' => 'Vendor uji', 'deskripsi_pengadaan' => 'Uji item edit', 'pic' => auth()->user()->name]);
        $sp->items()->create(['urutan' => 2, 'nama_barang' => 'Barang kedua', 'satuan' => 'unit', 'jumlah' => '2', 'harga_satuan' => 25000, 'subtotal' => 50000, 'tgl_pemenuhan' => '2026-12-01']);
        $sp->items()->create(['urutan' => 1, 'nama_barang' => '<b>Barang pertama</b>', 'satuan' => 'unit', 'jumlah' => '1']);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $response = app(SpController::class)->getItems($sp);
        $this->assertCount(1, DB::getQueryLog());
        $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
        $data = $response->getData(true);
        $this->assertSame([1, 2], array_column($data, 'urutan'));
        $this->assertSame('<b>Barang pertama</b>', $data[0]['nama_barang']);
        $this->assertSame('25.000', $data[1]['harga_satuan']);
        $this->assertSame('50.000', $data[1]['subtotal']);
        $this->assertSame('2026-12-01', $data[1]['tgl_pemenuhan']);
        $this->assertSame(['id', 'urutan', 'nama_barang', 'satuan', 'jumlah', 'harga_satuan', 'subtotal', 'tgl_pemenuhan'], array_keys($data[0]));
        $sp->items()->delete();
        $this->assertSame([], app(SpController::class)->getItems($sp)->getData(true));
    }

    public function test_edit_item_endpoint_retains_read_access_guards(): void
    {
        $middleware = $this->app['router']->getRoutes()->getByName('sp.items')->gatherMiddleware();
        foreach (['auth', 'readonly.block', 'dept:umum'] as $guard) {
            $this->assertContains($guard, $middleware);
        }
        $sp = Sp::create(['nomor_sp' => '903/PKU-XI/SP/2026', 'sequence_number' => 903, 'tanggal_sp' => '2026-11-18', 'nama_vendor' => 'Vendor uji', 'deskripsi_pengadaan' => 'Uji akses', 'pic' => auth()->user()->name]);
        $this->actingAs(User::factory()->create(['role' => 'viewer', 'department' => 'umum']));
        $this->getJson(route('sp.items', $sp))->assertOk()->assertHeader('Cache-Control', 'no-store, private')->assertExactJson([]);
        $this->actingAs(User::factory()->create(['role' => 'user', 'department' => 'operasional']));
        $this->getJson(route('sp.items', $sp))->assertForbidden();
    }
}
