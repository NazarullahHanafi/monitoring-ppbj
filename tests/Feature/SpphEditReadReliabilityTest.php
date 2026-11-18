<?php

namespace Tests\Feature;

use App\Http\Controllers\SpphController;
use App\Models\Ppbj;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class SpphEditReadReliabilityTest extends TestCase
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
        $request = Request::create('/spph/check-ppbj', 'GET', $input);
        $request->headers->set('Accept', 'application/json');
        $request->setUserResolver(fn () => auth()->user());
        $this->app->instance('request', $request);

        return $request;
    }

    private function ppbj(string $number, array $extra = []): void
    {
        Ppbj::create($extra + ['ppbj_no' => $number, 'uraian' => 'Pengadaan '.$number, 'tgl_ppbj' => '2026-11-18', 'total_sebelum_ppn' => 1000000, 'status' => 'ACTIVE']);
    }

    public function test_invalid_pr_batches_are_rejected_before_sql_instead_of_being_truncated_or_cast(): void
    {
        foreach ([['ppbj_no' => []], ['ppbj_no' => str_repeat('x', 256)], ['ppbj_nos' => 'PR/A'], ['ppbj_nos' => [['PR/A']]], ['ppbj_nos' => array_fill(0, 21, 'PR/A')], ['ppbj_nos' => [str_repeat('x', 256)]]] as $input) {
            $request = $this->request($input);
            DB::enableQueryLog();
            DB::flushQueryLog();
            try {
                app(SpphController::class)->checkPpbjStatus($request);
                $this->fail('Malformed PR batch accepted');
            } catch (ValidationException) {
                $this->assertCount(0, DB::getQueryLog());
            }
        }
    }

    public function test_pr_batches_use_one_query_preserve_order_and_search_literal_numbers(): void
    {
        foreach (['0', 'PR/%', 'PR/_', 'PR/A'] as $number) {
            $this->ppbj($number);
        }
        $request = $this->request(['ppbj_nos' => ['PR/_', '0', 'PR/%', 'PR/_']]);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $response = app(SpphController::class)->checkPpbjStatus($request);
        $this->assertCount(1, DB::getQueryLog());
        $this->assertSame(['PR/_', '0', 'PR/%'], array_column($response->getData(true)['package_items'], 'ppbj_no'));
        $this->assertSame(3, $response->getData(true)['package_count']);
        $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
    }

    public function test_empty_missing_linked_and_cancelled_pr_contracts_remain_private(): void
    {
        $this->ppbj('PR/linked', ['spph_rfq_1' => 'SPPH/EXISTING']);
        $this->ppbj('PR/cancelled', ['status' => 'CANCELLED']);
        foreach ([[[], 'empty'], [['ppbj_no' => 'NOT/FOUND'], 'manual'], [['ppbj_no' => 'PR/linked'], 'already_linked'], [['ppbj_no' => 'PR/cancelled'], 'cancelled']] as [$input, $status]) {
            $response = app(SpphController::class)->checkPpbjStatus($this->request($input));
            $this->assertSame($status, $response->getData(true)['status']);
            $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
        }
    }

    public function test_edit_items_keep_one_query_ordered_fields_and_rich_text_sanitization(): void
    {
        $spph = Spph::create(['nomor_spph' => '001/PKU-XI/SPPH/2026', 'sequence_number' => 1, 'tanggal' => '2026-11-18', 'nama_vendor' => 'Vendor uji', 'deskripsi_pengadaan' => 'Uji edit', 'pic' => 'Penguji']);
        $spph->items()->create(['urutan' => 2, 'nama_barang' => '<b>Barang kedua</b><script>bad()</script>', 'jumlah' => '2', 'satuan' => 'unit', 'tgl_pemenuhan' => '2026-12-01']);
        $spph->items()->create(['urutan' => 1, 'nama_barang' => 'Barang pertama', 'jumlah' => '1']);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $response = app(SpphController::class)->getItems($spph);
        $this->assertCount(1, DB::getQueryLog());
        $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
        $rows = $response->getData(true);
        $this->assertSame([1, 2], array_column($rows, 'urutan'));
        $this->assertSame('2026-12-01', $rows[1]['tgl_pemenuhan']);
        $this->assertStringNotContainsString('<script', $rows[1]['nama_barang']);
        $this->assertSame(['id', 'urutan', 'nama_barang', 'satuan', 'jumlah', 'tgl_pemenuhan'], array_keys($rows[0]));
    }

    public function test_edit_read_routes_keep_authentication_department_and_readonly_guards(): void
    {
        foreach (['spph.items', 'spph.check-ppbj'] as $name) {
            foreach (['auth', 'readonly.block', 'dept:umum'] as $guard) {
                $this->assertContains($guard, app('router')->getRoutes()->getByName($name)->gatherMiddleware());
            }
        }
        $other = User::factory()->create(['department' => 'operasional', 'role' => 'user']);
        $this->actingAs($other)->getJson(route('spph.check-ppbj'))->assertForbidden();
        auth()->logout();
        $this->getJson(route('spph.check-ppbj'))->assertUnauthorized();
    }
}
