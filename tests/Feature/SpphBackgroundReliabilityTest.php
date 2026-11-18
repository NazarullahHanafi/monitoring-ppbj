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

class SpphBackgroundReliabilityTest extends TestCase
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
        $request = Request::create('/spph/poll', 'GET', $input);
        $request->headers->set('Accept', 'application/json');
        $request->setUserResolver(fn () => auth()->user());
        $this->app->instance('request', $request);

        return $request;
    }

    private function spph(int $number, array $extra = []): Spph
    {
        return Spph::create($extra + [
            'nomor_spph' => sprintf('%03d/PKU-XI/SPPH/2026', $number), 'sequence_number' => $number,
            'tanggal' => '2026-11-18', 'nama_vendor' => 'Vendor A', 'vendor_names' => ['Vendor A', 'Vendor B'],
            'deskripsi_pengadaan' => 'Pengadaan uji', 'pic' => 'Penguji',
        ]);
    }

    public function test_invalid_cursor_and_summary_are_rejected_before_sql(): void
    {
        foreach ([['last_id' => []], ['last_id' => -1], ['last_id' => '1.2'], ['last_id' => '999999999999999999999999'], ['summary' => []], ['summary' => 'yes']] as $input) {
            $request = $this->request($input);
            DB::enableQueryLog();
            DB::flushQueryLog();
            try {
                app(SpphController::class)->poll($request);
                $this->fail('Malformed poll accepted');
            } catch (ValidationException) {
                $this->assertCount(0, DB::getQueryLog());
            }
        }
    }

    public function test_summary_selects_only_ids_in_one_query_and_continues_after_fifty_rows(): void
    {
        foreach (range(1, 60) as $number) {
            $this->spph($number);
        }
        $request = $this->request(['summary' => '1', 'last_id' => '0']);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $response = app(SpphController::class)->poll($request);
        $rows = $response->getData(true)['rows'];
        $this->assertCount(1, DB::getQueryLog());
        $this->assertStringStartsWith('select "id" from "spphs"', DB::getQueryLog()[0]['query']);
        $this->assertCount(50, $rows);
        $this->assertSame(['id' => 1], $rows[0]);
        $this->assertSame(['id' => 50], $rows[49]);
        $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
        $rows = app(SpphController::class)->poll($this->request(['summary' => '1', 'last_id' => '50']))->getData(true)['rows'];
        $this->assertCount(10, $rows);
        $this->assertSame(['id' => 51], $rows[0]);
        $this->assertSame([], app(SpphController::class)->poll($this->request(['last_id' => PHP_INT_MAX]))->getData(true)['rows']);
    }

    public function test_legacy_multi_vendor_fields_are_preserved_without_added_queries(): void
    {
        $sp = $this->spph(1);
        $request = $this->request();
        DB::enableQueryLog();
        DB::flushQueryLog();
        $response = app(SpphController::class)->poll($request);
        $this->assertCount(1, DB::getQueryLog());
        $this->assertSame(['rows' => [[
            'id' => $sp->id, 'nomor_spph' => $sp->nomor_spph, 'tanggal' => '18/11/2026', 'nomor_pr' => '-',
            'nama_vendor' => 'Vendor A', 'vendor_names' => ['Vendor A', 'Vendor B'], 'vendor_label' => 'Vendor A, Vendor B',
            'vendor_count' => 2, 'deskripsi_pengadaan' => 'Pengadaan uji', 'pic' => 'Penguji',
        ]]], $response->getData(true));
    }

    public function test_archived_rows_stay_hidden_and_initial_cursor_matches_id_order_without_extra_max_query(): void
    {
        foreach (range(1, 12) as $number) {
            $this->spph($number);
        }
        $backfill = $this->spph(99, ['sequence_number' => 0]);
        $deleted = $this->spph(100);
        $deleted->delete();
        DB::enableQueryLog();
        DB::flushQueryLog();
        $response = $this->get(route('spph.index'));
        $response->assertOk();
        $this->assertCount(10, $response->viewData('spphs')->items());
        $this->assertSame($backfill->id, $response->viewData('spphs')->first()->id);
        $response->assertSee('"lastId":'.$backfill->id, false);
        $this->assertFalse(collect(DB::getQueryLog())->contains(fn ($q) => str_contains(strtolower($q['query']), 'max(')));
        $this->getJson(route('spph.poll', ['summary' => 1, 'last_id' => $backfill->id]))->assertOk()->assertExactJson(['rows' => []]);
    }

    public function test_poll_retains_authentication_department_and_readonly_boundaries(): void
    {
        $routes = app('router')->getRoutes();
        foreach (['spph.poll', 'spph.presence', 'spph.presence.start', 'spph.presence.stop'] as $name) {
            foreach (['auth', 'dept:umum', 'readonly.block'] as $guard) {
                $this->assertContains($guard, $routes->getByName($name)->gatherMiddleware());
            }
        }
        $other = User::factory()->create(['department' => 'operasional', 'role' => 'user']);
        $this->actingAs($other)->getJson(route('spph.poll', ['summary' => 1]))->assertForbidden();
        auth()->logout();
        $this->getJson(route('spph.poll', ['summary' => 1]))->assertUnauthorized();
    }
}
