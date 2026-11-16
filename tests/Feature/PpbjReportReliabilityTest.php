<?php

namespace Tests\Feature;

use App\Http\Controllers\PpbjController;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class PpbjReportReliabilityTest extends TestCase
{
    use RefreshDatabase;

    private User $actor;

    protected function setUp(): void
    {
        parent::setUp();
        $this->travelTo(now()->startOfSecond());
        $this->actor = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $this->actingAs($this->actor);
    }

    private function row(string $number, array $attributes = []): array
    {
        return array_merge(['ppbj_no' => $number, 'created_at' => now()->toDateTimeString(), 'updated_at' => now()->toDateTimeString(),
            'portofolio' => 'CON', 'buyer' => 'Buyer', 'penyedia_eksternal' => 'Vendor', 'uraian' => 'Audit report',
            'total_sebelum_ppn' => 1000, 'nilai_sp_spk' => 500, 'nilai_bpg' => 100, 'status_sla' => 'ON TRACK', 'sisa_target_sla' => 8, 'progres' => 25], $attributes);
    }

    private function rows(string $content): array
    {
        $stream = fopen('php://temp', 'w+');
        fwrite($stream, substr($content, 3));
        rewind($stream);
        $rows = [];
        while (($row = fgetcsv($stream, null, ',', '"', '')) !== false) {
            $rows[] = $row;
        }
        fclose($stream);

        return $rows;
    }

    public function test_paginated_results_use_four_queries_and_global_totals_without_duplicate_ties(): void
    {
        DB::table('ppbj')->insert(array_map(fn ($i) => $this->row('PAGE/'.$i), range(1, 125)));
        DB::enableQueryLog();
        $response = $this->getJson(route('ppbj.report.data'))->assertOk()->assertHeader('Cache-Control', 'no-store, private')
            ->assertJsonCount(50, 'data')->assertJsonPath('stats.total', 125)->assertJsonPath('stats.total_value', 125000)
            ->assertJsonPath('pagination', ['page' => 1, 'per_page' => 50, 'total' => 125, 'last_page' => 3, 'from' => 1, 'to' => 50])
            ->assertJsonPath('data.0.ppbj_no', 'PAGE/125');
        $queries = collect(DB::getQueryLog())->pluck('query');
        DB::disableQueryLog();
        $this->assertCount(4, $queries->filter(fn ($sql) => str_contains($sql, 'from "ppbj"')));
        $second = $this->getJson(route('ppbj.report.data', ['page' => 2]))->assertOk()->assertJsonCount(50, 'data')->assertJsonPath('data.0.ppbj_no', 'PAGE/75');
        $this->assertEmpty(array_intersect(array_column($response->json('data'), 'ppbj_no'), array_column($second->json('data'), 'ppbj_no')));
        $this->getJson(route('ppbj.report.data', ['page' => 100]))->assertOk()->assertJsonCount(25, 'data')->assertJsonPath('pagination.page', 3);
        foreach ([25, 100] as $perPage) {
            $this->getJson(route('ppbj.report.data', ['per_page' => $perPage]))->assertOk()->assertJsonCount($perPage, 'data')->assertJsonPath('stats.total', 125);
        }
    }

    public function test_malformed_filter_inputs_fail_before_any_report_query_or_csv_stream(): void
    {
        $this->withoutMiddleware(ThrottleRequests::class);
        $invalid = [
            ['period' => ['monthly']], ['period' => 'random'], ['period' => 'daily', 'start_date' => '2026-02-30'],
            ['period' => 'monthly', 'start_date' => '2026-13'], ['period' => 'yearly', 'start_date' => '2026garbage'],
            ['period' => 'daily', 'start_date' => ['bad']], ['period' => 'yearly', 'start_date' => '0001'],
            ['period' => 'custom', 'start_date' => '2026-11-02'], ['period' => 'custom', 'end_date' => '2026-11-02'],
            ['period' => 'custom', 'start_date' => '2026-11-03', 'end_date' => '2026-11-02'],
            ['portofolio' => [['bad']]], ['vendor' => ['bad' => ['nested']]], ['vendor' => array_fill(0, 101, 'Vendor')],
            ['vendor' => [str_repeat('x', 256)]], ['page' => -1], ['page' => 1000001], ['per_page' => 1000],
        ];
        foreach ($invalid as $params) {
            foreach (['ppbj.report.data', 'ppbj.report.export'] as $name) {
                DB::flushQueryLog();
                DB::enableQueryLog();
                $this->getJson(route($name, $params))->assertUnprocessable();
                $queries = collect(DB::getQueryLog())->pluck('query');
                DB::disableQueryLog();
                $this->assertFalse($queries->contains(fn ($sql) => str_contains($sql, 'from "ppbj"')), $name.' must reject before SQL.');
            }
        }
    }

    public function test_comma_names_zero_names_and_legacy_scalar_aliases_are_searchable_literally(): void
    {
        DB::table('ppbj')->insert([$this->row('COMMA', ['portofolio' => '0', 'penyedia_eksternal' => 'PT Audit, Indonesia']),
            $this->row('PLAIN', ['penyedia_eksternal' => 'Other'])]);
        $params = ['portofolio' => ['0'], 'vendor' => ['PT Audit, Indonesia']];
        $this->getJson(route('ppbj.report.data', $params))->assertOk()->assertJsonPath('stats.total', 1)->assertJsonPath('data.0.ppbj_no', 'COMMA');
        $csv = $this->get(route('ppbj.report.export', $params))->assertOk()->streamedContent();
        $this->assertSame('COMMA', $this->rows($csv)[1][0]);
        $this->getJson(route('ppbj.report.data', ['portofolios' => ' CON, 0 ', 'vendors' => 'Other']))->assertOk()->assertJsonPath('data.0.ppbj_no', 'PLAIN');
    }

    public function test_period_boundaries_and_legacy_full_date_formats_remain_consistent(): void
    {
        DB::table('ppbj')->insert([
            $this->row('BEFORE', ['created_at' => '2024-02-28 23:59:59']),
            $this->row('START', ['created_at' => '2024-02-29 00:00:00']),
            $this->row('END', ['created_at' => '2024-02-29 23:59:59']),
            $this->row('AFTER', ['created_at' => '2024-03-01 00:00:00']),
        ]);
        foreach ([['period' => 'daily', 'start_date' => '2024-02-29'],
            ['period' => 'custom', 'start_date' => '2024-02-29', 'end_date' => '2024-02-29']] as $params) {
            $this->getJson(route('ppbj.report.data', $params))->assertOk()->assertJsonPath('stats.total', 2);
            $this->assertCount(3, $this->rows($this->get(route('ppbj.report.export', $params))->assertOk()->streamedContent()));
        }
        foreach (['2024-02', '2024-02-20'] as $start) {
            $this->getJson(route('ppbj.report.data', ['period' => 'monthly', 'start_date' => $start, 'end_date' => '2024-01-01']))->assertOk()->assertJsonPath('stats.total', 3);
        }
        foreach (['2024', '2024-01-01'] as $start) {
            $this->getJson(route('ppbj.report.data', ['period' => 'yearly', 'start_date' => $start]))->assertOk()->assertJsonPath('stats.total', 4);
        }
    }

    public function test_export_uses_bounded_keyset_batches_including_null_dates_and_excludes_later_inserts(): void
    {
        $rows = [];
        for ($i = 1; $i <= 1003; $i++) {
            $rows[] = $this->row('EXPORT/'.$i, ['created_at' => $i <= 501 ? null : now()->toDateTimeString()]);
        }
        foreach (array_chunk($rows, 200) as $batch) {
            DB::table('ppbj')->insert($batch);
        }
        $response = $this->get(route('ppbj.report.export'))->assertOk()->assertHeader('Cache-Control', 'no-store, private');
        DB::table('ppbj')->insert($this->row('LATER'));
        DB::enableQueryLog();
        $content = $response->streamedContent();
        $queries = collect(DB::getQueryLog())->pluck('query')->filter(fn ($sql) => str_contains($sql, 'from "ppbj"'));
        DB::disableQueryLog();
        $csv = $this->rows($content);
        $numbers = array_column(array_slice($csv, 1), 0);
        $this->assertCount(1003, $numbers);
        $this->assertCount(1003, array_unique($numbers));
        $this->assertSame('EXPORT/1003', $numbers[0]);
        $this->assertSame('EXPORT/1', $numbers[1002]);
        $this->assertNotContains('LATER', $numbers);
        $this->assertCount(3, $queries);
        foreach ($queries as $sql) {
            $this->assertStringNotContainsString('select *', $sql);
            $this->assertStringNotContainsString('offset', $sql);
            $this->assertStringContainsString('limit 500', $sql);
            $this->assertStringNotContainsString('cancel_reason', $sql);
        }
    }

    public function test_csv_neutralizes_formulas_round_trips_quotes_and_exports_the_same_stored_sla(): void
    {
        DB::table('ppbj')->insert($this->row('=FORMULA', ['uraian' => "@Audit, \"quoted\"\nback\\slash", 'buyer' => '+Buyer', 'portofolio' => '-CON', 'penyedia_eksternal' => '=Vendor',
            'status_sla' => 'WARNING', 'sisa_target_sla' => 2, 'created_at' => '2020-01-01 00:00:00']));
        $data = $this->getJson(route('ppbj.report.data'))->assertOk()->json('data.0');
        $csv = $this->rows($this->get(route('ppbj.report.export'))->assertOk()->streamedContent())[1];
        $this->assertSame("'=FORMULA", $csv[0]);
        $this->assertSame("'@Audit, \"quoted\"\nback\\slash", $csv[2]);
        $this->assertSame("'-CON", $csv[3]);
        $this->assertSame("'+Buyer", $csv[4]);
        $this->assertSame("'=Vendor", $csv[5]);
        $this->assertSame($data['status_sla'], $csv[9]);
        $this->assertSame('2 hari', $csv[10]);
    }

    public function test_department_guards_and_isolated_read_export_budgets_are_preserved(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'operasional', 'role' => 'superadmin']));
        foreach (['ppbj.report', 'ppbj.report.data', 'ppbj.report.export'] as $name) {
            $this->getJson(route($name))->assertForbidden();
        }
        $this->actingAs($this->actor);
        for ($i = 0; $i < 60; $i++) {
            RateLimiter::hit('ppbj-report-data:'.sha1((string) $this->actor->id), 60);
        }
        $this->getJson(route('ppbj.report.data'))->assertTooManyRequests()->assertHeader('Retry-After');
        $this->get(route('ppbj.report.export'))->assertOk();
        $this->get(route('ppbj.report'))->assertOk()->assertSee('ppbj-report.js')->assertSee('data-report-next', false);
        $prefixes = [];
        foreach (['ppbj.report' => 60, 'ppbj.report.data' => 60, 'ppbj.report.export' => 10] as $name => $limit) {
            $route = app('router')->getRoutes()->getByName($name);
            $middleware = $route->gatherMiddleware();
            foreach (['auth', 'dept:umum', 'readonly.block'] as $required) {
                $this->assertContains($required, $middleware);
            }
            $rule = collect($middleware)->first(fn ($item) => str_starts_with($item, 'throttle:'));
            [$actual, $minutes, $prefix] = explode(',', substr($rule, 9));
            $this->assertSame((string) $limit, $actual);
            $this->assertSame('1', $minutes);
            $this->assertNotContains($prefix, $prefixes);
            $prefixes[] = $prefix;
        }
    }

    public function test_legacy_controller_methods_delegate_to_the_same_validated_report(): void
    {
        DB::table('ppbj')->insert($this->row('LEGACY'));
        $controller = app(PpbjController::class);
        $request = \Illuminate\Http\Request::create('/ppbj/report/data');
        $response = $controller->reportData($request);
        $this->assertSame('LEGACY', $response->getData(true)['data'][0]['ppbj_no']);
        $this->assertSame(50, $response->getData(true)['pagination']['per_page']);
        $this->assertSame('no-store, private', $controller->reportExport($request)->headers->get('Cache-Control'));
        $this->assertStringContainsString('ppbj-report.js', $controller->reportIndex()->getContent());
    }
}
