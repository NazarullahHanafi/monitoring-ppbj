<?php

namespace Tests\Feature;

use App\Http\Controllers\SpController;
use App\Models\Sp;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class SpBackgroundReliabilityTest extends TestCase
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
        $request = Request::create('/sp/poll', 'GET', $input);
        $request->headers->set('Accept', 'application/json');
        $request->setUserResolver(fn () => auth()->user());
        $this->app->instance('request', $request);

        return $request;
    }

    private function sp(int $number, string $mode = 'auto', array $extra = []): Sp
    {
        return Sp::create($extra + [
            'nomor_sp' => sprintf('%03d/PKU-XI/SP/2026', $number), 'numbering_mode' => $mode,
            'sequence_number' => $number, 'tanggal_sp' => '2026-11-18', 'nama_vendor' => 'Vendor uji',
            'deskripsi_pengadaan' => 'Data uji SP', 'pic' => 'Penguji', 'nilai_sp' => 1000000,
        ]);
    }

    public function test_invalid_poll_inputs_stop_before_any_sql(): void
    {
        foreach ([['last_id' => []], ['last_id' => -1], ['last_id' => '1.2'], ['last_id' => '99999999999999999999999'], ['summary' => []], ['summary' => 'yes'], ['mode' => []], ['mode' => 'wrong'], ['oracle' => []], ['oracle_mode' => []]] as $input) {
            $request = $this->request($input);
            DB::enableQueryLog();
            DB::flushQueryLog();
            try {
                app(SpController::class)->poll($request);
                $this->fail('Malformed poll accepted');
            } catch (ValidationException) {
                $this->assertCount(0, DB::getQueryLog());
            }
        }
    }

    public function test_summary_is_one_narrow_query_bounded_to_fifty_ids_and_can_continue(): void
    {
        foreach (range(1, 60) as $number) {
            $this->sp($number);
        }
        $request = $this->request(['summary' => '1', 'last_id' => '0']);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $response = app(SpController::class)->poll($request);
        $rows = $response->getData(true)['rows'];
        $queries = DB::getQueryLog();
        $this->assertCount(1, $queries);
        $this->assertStringStartsWith('select "id" from "sps"', $queries[0]['query']);
        $this->assertCount(50, $rows);
        $this->assertSame(['id' => 1], $rows[0]);
        $this->assertSame(['id' => 50], $rows[49]);
        $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
        $rows = app(SpController::class)->poll($this->request(['summary' => '1', 'last_id' => '50']))->getData(true)['rows'];
        $this->assertCount(10, $rows);
        $this->assertSame(['id' => 51], $rows[0]);
    }

    public function test_poll_modes_are_isolated_and_archived_records_are_excluded(): void
    {
        $normal = $this->sp(1);
        $secondNormal = $this->sp(2);
        $oracle = $this->sp(3, 'oracle');
        $archived = $this->sp(4);
        $archived->delete();
        $controller = app(SpController::class);
        $rows = $controller->poll($this->request(['summary' => '1']))->getData(true)['rows'];
        $this->assertSame([$normal->id, $secondNormal->id], array_column($rows, 'id'));
        foreach ([['mode' => 'oracle'], ['oracle' => '1'], ['oracle_mode' => '1']] as $mode) {
            $rows = $controller->poll($this->request($mode + ['summary' => '1']))->getData(true)['rows'];
            $this->assertSame([['id' => $oracle->id]], $rows);
        }
        $this->assertSame([], $controller->poll($this->request(['last_id' => PHP_INT_MAX]))->getData(true)['rows']);
    }

    public function test_legacy_poll_contract_and_access_guards_are_preserved(): void
    {
        $sp = $this->sp(1);
        $this->getJson(route('sp.poll'))->assertOk()->assertExactJson(['rows' => [[
            'id' => $sp->id, 'nomor_sp' => $sp->nomor_sp, 'tanggal_sp' => '18/11/2026',
            'nilai_sp' => 'Rp 1.000.000', 'nomor_pr' => '-', 'nilai_pr' => '-',
            'nama_vendor' => 'Vendor uji', 'deskripsi_pengadaan' => 'Data uji SP', 'pic' => 'Penguji',
        ]]]);
        $other = User::factory()->create(['department' => 'operasional', 'role' => 'user']);
        $this->actingAs($other)->getJson(route('sp.poll', ['summary' => 1]))->assertForbidden();
        auth()->logout();
        $this->getJson(route('sp.poll', ['summary' => 1]))->assertUnauthorized();
    }

    public function test_initial_cursor_includes_existing_ids_outside_first_page_without_extra_query(): void
    {
        foreach (range(1, 12) as $number) {
            $this->sp($number);
        }
        $backfill = $this->sp(99, 'auto', ['sequence_number' => 0]);
        $oracle = $this->sp(100, 'oracle');
        $deleted = $this->sp(101);
        $deleted->delete();
        Cache::put('sp:index-stats:version', 'background-test');
        $response = $this->get(route('sp.index'));
        $response->assertOk();
        $this->assertCount(10, $response->viewData('sps')->items());
        $this->assertNotContains($backfill->id, $response->viewData('sps')->pluck('id')->all());
        $this->assertSame($backfill->id, (int) $response->viewData('stats')->latest_id);
        $response->assertSee('"lastId":'.$backfill->id, false);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $response = $this->get(route('sp.index', ['mode' => 'oracle']));
        $response->assertOk();
        $this->assertSame($oracle->id, (int) $response->viewData('stats')->latest_id);
        $aggregates = collect(DB::getQueryLog())->filter(fn ($q) => str_contains($q['query'], 'MAX(id)'));
        $this->assertCount(1, $aggregates);
        $this->assertStringContainsString('COUNT(*)', $aggregates->first()['query']);
    }
}
