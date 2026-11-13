<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Cache\Events\KeyWritten;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class DashboardRequestReliabilityTest extends TestCase
{
    use RefreshDatabase;

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    public function test_all_ajax_segments_reuse_the_html_dashboard_cache_and_stay_private(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        $this->actingAs($user)->get(route('dashboard.indexumum'))->assertOk();
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            if (str_contains(strtolower($query->sql), 'from "ppbj"')) {
                $queries[] = $query->sql;
            }
        });
        foreach (['stats', 'sla', 'buyers', 'portfolios', 'penyedias', 'activities', 'monthly'] as $type) {
            $first = $this->getJson(route('dashboard.data', ['type' => $type]))->assertOk();
            $second = $this->getJson(route('dashboard.data', ['type' => $type]))->assertOk();
            $this->assertSame($first->json(), $second->json());
            $this->assertStringContainsString('private', $second->headers->get('Cache-Control'));
        }
        $this->assertSame([], $queries, 'Warm dashboard API requests must not repeat PPBJ aggregates.');
    }

    public function test_equivalent_filters_share_one_entry_without_growing_a_registry_and_day_changes_refresh_it(): void
    {
        Carbon::setTestNow('2026-11-13 09:00:00');
        $this->actingAs(User::factory()->create(['department' => 'umum']));
        $keys = [];
        Event::listen(KeyWritten::class, function ($event) use (&$keys) {
            if (str_starts_with($event->key, 'dashboard_buyer_workload')) {
                $keys[] = $event->key;
            }
        });
        foreach ([[], ['bw_filter' => 'all'], ['bw_filter' => 'all', 'bw_tahun' => 2025, 'bw_bulan' => 3]] as $filters) {
            $this->get(route('dashboard.indexumum', $filters))->assertOk();
        }
        $this->assertCount(1, $keys);
        $this->assertFalse(Cache::has('dashboard_buyer_workload_keys'));
        $this->get(route('dashboard.indexumum', ['bw_filter' => 'today']))->assertOk();
        Carbon::setTestNow('2026-11-14 09:00:00');
        $this->get(route('dashboard.indexumum', ['bw_filter' => 'today']))->assertOk();
        $this->assertCount(3, array_unique($keys));
    }

    public function test_custom_dates_include_the_first_day_and_final_day_without_sql_date_functions(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'umum']));
        foreach (['2026-11-12', '2026-11-13', '2026-11-13 23:59:59', '2026-11-14', '2026-11-15'] as $index => $date) {
            DB::table('ppbj')->insert(['ppbj_no' => 'DASHBOARD/'.$index, 'buyer' => 'Buyer '.$index, 'tgl_ppbj' => $date, 'progres' => 0, 'status' => 'ACTIVE']);
        }
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            if (str_contains($query->sql, 'as total_aktif')) {
                $queries[] = $query->sql;
            }
        });
        $result = $this->get(route('dashboard.indexumum', ['bw_filter' => 'custom', 'bw_tgl_dari' => '2026-11-13', 'bw_tgl_sampai' => '2026-11-14']))->assertOk();
        $this->assertEqualsCanonicalizing(['Buyer 1', 'Buyer 2', 'Buyer 3'], array_column($result->viewData('buyerWorkload')['buyers'], 'buyer'));
        $this->assertCount(1, $queries);
        $this->assertStringContainsString('"tgl_ppbj" >= ?', $queries[0]);
        $this->assertStringContainsString('"tgl_ppbj" < ?', $queries[0]);
        $this->assertStringNotContainsString('date(', strtolower($queries[0]));
    }

    public function test_leap_month_year_week_today_and_open_ranges_include_the_expected_dates(): void
    {
        Carbon::setTestNow('2024-02-29 10:00:00');
        $this->actingAs(User::factory()->create(['department' => 'umum']));
        foreach (['2024-01-31', '2024-02-01', '2024-02-28', '2024-02-29', '2024-03-01'] as $index => $date) {
            DB::table('ppbj')->insert(['ppbj_no' => 'LEAP/'.$index, 'buyer' => 'Buyer '.$index, 'tgl_ppbj' => $date]);
        }
        foreach ([
            [['bw_filter' => 'month'], ['Buyer 1', 'Buyer 2', 'Buyer 3']],
            [['bw_filter' => 'year'], ['Buyer 0', 'Buyer 1', 'Buyer 2', 'Buyer 3', 'Buyer 4']],
            [['bw_filter' => 'week'], ['Buyer 2', 'Buyer 3', 'Buyer 4']],
            [['bw_filter' => 'today'], ['Buyer 3']],
            [['bw_filter' => 'custom', 'bw_tgl_dari' => '2024-02-29'], ['Buyer 3', 'Buyer 4']],
            [['bw_filter' => 'custom', 'bw_tgl_sampai' => '2024-02-28'], ['Buyer 0', 'Buyer 1', 'Buyer 2']],
        ] as [$filters, $expected]) {
            $response = $this->get(route('dashboard.indexumum', $filters))->assertOk();
            $this->assertEqualsCanonicalizing($expected, array_column($response->viewData('buyerWorkload')['buyers'], 'buyer'));
        }
    }

    public function test_invalid_filter_shapes_dates_and_types_are_rejected_before_business_queries(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'umum']));
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            if (str_contains(strtolower($query->sql), 'from "ppbj"')) {
                $queries[] = $query->sql;
            }
        });
        foreach ([['bw_filter' => "all';alert(1)//"], ['bw_filter' => ['month']], ['bw_bulan' => 13], ['bw_tahun' => [2026]], ['bw_tgl_dari' => '2026-02-30'], ['bw_tgl_dari' => '2026-11-14', 'bw_tgl_sampai' => '2026-11-13']] as $filters) {
            $this->getJson(route('dashboard.indexumum', $filters))->assertUnprocessable();
        }
        foreach (['unknown', ['stats'], ''] as $type) {
            $this->getJson(route('dashboard.data', ['type' => $type]))->assertUnprocessable();
        }
        $this->assertSame([], $queries);
    }

    public function test_refresh_invalidates_every_workload_variant_without_reading_legacy_registry(): void
    {
        $admin = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $this->actingAs($admin);
        DB::table('ppbj')->insert(['ppbj_no' => 'DASHBOARD/REFRESH', 'buyer' => 'Before', 'tgl_ppbj' => now()->toDateString()]);
        foreach (['all', 'today'] as $filter) {
            $this->get(route('dashboard.indexumum', ['bw_filter' => $filter]))->assertOk()->assertViewHas('buyerWorkload', fn ($data) => $data['buyers'][0]['buyer'] === 'Before');
        }
        Cache::put('dashboard_buyer_workload_keys', ['unrelated:keep'], 60);
        Cache::put('unrelated:keep', 'keep me', 60);
        DB::table('ppbj')->update(['buyer' => 'After']);
        $this->postJson(route('dashboard.refresh'))->assertOk();
        $this->assertSame('keep me', Cache::get('unrelated:keep'));
        foreach (['all', 'today'] as $filter) {
            $this->get(route('dashboard.indexumum', ['bw_filter' => $filter]))->assertOk()->assertViewHas('buyerWorkload', fn ($data) => $data['buyers'][0]['buyer'] === 'After');
        }
        $generation = Cache::get('dashboard_buyer_workload_generation');
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']))->postJson(route('dashboard.refresh'))->assertForbidden();
        $this->assertSame($generation, Cache::get('dashboard_buyer_workload_generation'));
    }

    public function test_monthly_chart_has_six_distinct_months_even_on_march_31_and_counts_each_row_once(): void
    {
        Carbon::setTestNow('2026-03-31 10:00:00');
        $this->actingAs(User::factory()->create(['department' => 'umum']));
        foreach (['2025-09-30', '2025-10-01', '2025-11-01', '2025-12-01', '2026-01-01', '2026-02-01', '2026-03-31'] as $index => $date) {
            DB::table('ppbj')->insert(['ppbj_no' => 'CHART/'.$index, 'created_at' => $date, 'status' => 'ACTIVE']);
        }
        DB::table('ppbj')->insert(['ppbj_no' => 'CHART/CANCELLED', 'created_at' => '2026-02-15', 'status' => 'CANCELLED']);
        $data = $this->getJson(route('dashboard.data', ['type' => 'monthly']))->assertOk()->json();
        $this->assertCount(6, array_unique($data['labels']));
        $this->assertSame([1, 1, 1, 1, 1, 1], $data['values']);
    }

    public function test_refresh_visibility_and_request_budgets_match_permissions(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($user)->get(route('dashboard.indexumum'))->assertOk()->assertDontSee('id="dashboardRefreshButton"', false);
        $admin = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $this->actingAs($admin)->get(route('dashboard.indexumum'))->assertOk()->assertSee('id="dashboardRefreshButton"', false);
        foreach (range(1, 5) as $_) {
            $this->postJson(route('dashboard.refresh'))->assertOk();
        }
        $this->postJson(route('dashboard.refresh'))->assertTooManyRequests();
        $this->getJson(route('dashboard.data'))->assertOk();
        $ops = User::factory()->create(['department' => 'operasional']);
        $this->actingAs($ops)->getJson(route('dashboard.data'))->assertForbidden();
        $this->getJson(route('dashboard.refresh'))->assertMethodNotAllowed();
        $this->getJson(route('dashboard.indexumum'))->assertForbidden();
    }
}
