<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class OperationalDashboardReliabilityTest extends TestCase
{
    use RefreshDatabase;

    private User $operator;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-11-13 10:00:00');
        $this->operator = User::factory()->create(['department' => 'operasional', 'role' => 'user']);
        $this->actingAs($this->operator);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    private function tor(string $number, array $attributes = []): int
    {
        return DB::table('torprs')->insertGetId($attributes + ['nomor_pr' => $number, 'created_by_user_id' => $this->operator->id,
            'portofolio' => 'Portfolio', 'tanggal_pr' => '2026-11-13', 'jumlah_pr' => 1000]);
    }

    private function approval(int $tor, string $status, string $when = '2026-11-13 08:00:00'): void
    {
        DB::table('pr_receipt_approvals')->insert(['torpr_id' => $tor, 'status' => $status, 'requested_by_user_id' => $this->operator->id, 'requested_name' => 'Operator', 'requested_at' => $when]);
    }

    public function test_each_pr_has_one_current_status_instead_of_counting_historical_approvals(): void
    {
        $this->tor('DRAFT');
        $this->tor('RECEIVED', ['received_at' => '2026-11-12 10:00:00']);
        $pending = $this->tor('PENDING');
        $this->approval($pending, 'REJECTED');
        $this->approval($pending, 'PENDING');
        $approved = $this->tor('APPROVED');
        $this->approval($approved, 'PENDING');
        $this->approval($approved, 'APPROVED');
        $rejected = $this->tor('REJECTED');
        $this->approval($rejected, 'PENDING');
        $this->approval($rejected, 'REJECTED');
        $latestWins = $this->tor('RESUBMITTED', ['received_at' => '2026-11-12 10:00:00']);
        $this->approval($latestWins, 'APPROVED');
        $this->approval($latestWins, 'PENDING');
        $response = $this->getJson(route('ops.dashboard.data'))->assertOk()->assertJsonPath('success', true)
            ->assertJsonPath('data.stats', ['total' => 6, 'pending' => 2, 'approved' => 2, 'rejected' => 1, 'draft' => 1]);
        $this->assertSame(['PENDING', 'REJECTED', 'APPROVED'], array_column($response->json('data.latest'), 'status'));
        $this->assertStringContainsString('private', $response->headers->get('Cache-Control'));
    }

    public function test_kpi_only_uses_latest_pending_requests_and_uses_application_clock(): void
    {
        $old = $this->tor('NO-LONGER-PENDING');
        $this->approval($old, 'PENDING', '2026-11-01 10:00:00');
        $this->approval($old, 'APPROVED');
        $pending = $this->tor('WAITING');
        $this->approval($pending, 'REJECTED', '2026-11-01 10:00:00');
        $this->approval($pending, 'PENDING', '2026-11-13 06:00:00');
        $future = $this->tor('FUTURE');
        $this->approval($future, 'PENDING', '2026-11-14 10:00:00');
        $this->getJson(route('ops.dashboard.data'))->assertOk()->assertJsonPath('data.kpi.avgPendingHours', 2);
    }

    public function test_snapshot_and_kpi_share_one_aggregate_and_warm_json_and_html_run_no_business_queries(): void
    {
        $this->tor('CACHE');
        $queries = [];
        DB::listen(function ($event) use (&$queries) {
            if (str_contains(strtolower($event->sql), 'torprs') || str_contains(strtolower($event->sql), 'pr_receipt_approvals')) {
                $queries[] = $event->sql;
            }
        });
        $cold = $this->getJson(route('ops.dashboard.data'))->assertOk();
        $this->assertCount(4, $queries);
        $this->assertCount(1, array_filter($queries, fn ($sql) => str_contains($sql, 'AS avg_hours')));
        $queries = [];
        $this->getJson(route('ops.dashboard.data'))->assertOk()->assertExactJson($cold->json());
        $this->get(route('ops.dashboard'))->assertOk()->assertViewHas('total', 1);
        $this->assertSame([], $queries);
    }

    public function test_month_chart_includes_first_day_and_leap_day_and_top_portfolios_use_only_torpr_values(): void
    {
        Carbon::setTestNow('2024-03-31 10:00:00');
        foreach (['2023-09-30', '2023-10-01', '2023-11-01', '2023-12-01', '2024-01-01', '2024-02-01', '2024-02-29', '2024-03-31', '2024-04-01'] as $index => $date) {
            $this->tor('MONTH/'.$index, ['tanggal_pr' => $date]);
        }
        DB::table('ppbj')->insert(['ppbj_no' => 'OTHER-TABLE', 'portofolio' => 'Must not leak into TORPR ranking', 'total_sebelum_ppn' => 999999]);
        $this->getJson(route('ops.dashboard.data'))->assertOk()->assertJsonPath('data.chart.series', [1, 1, 1, 1, 2, 1])
            ->assertJsonCount(6, 'data.chart.labels')->assertJsonPath('data.topPortofolios.0.total_pr', 9)
            ->assertJsonPath('data.topPortofolios.0.total_harga', 9000);
    }

    public function test_clear_and_refresh_invalidate_portfolios_as_well_and_cannot_touch_other_cache(): void
    {
        $admin = User::factory()->create(['department' => 'operasional', 'role' => 'superadmin']);
        $this->actingAs($admin);
        $id = $this->tor('REFRESH', ['portofolio' => 'Before']);
        $this->getJson(route('ops.dashboard.data'))->assertOk()->assertJsonPath('data.topPortofolios.0.portofolio', 'Before');
        Cache::put('unrelated:keep', 'protected', 300);
        DB::table('torprs')->where('id', $id)->update(['portofolio' => 'After']);
        $this->deleteJson(route('ops.dashboard.clear'))->assertOk();
        $this->getJson(route('ops.dashboard.data'))->assertOk()->assertJsonPath('data.topPortofolios.0.portofolio', 'After');
        DB::table('torprs')->where('id', $id)->update(['portofolio' => 'Latest']);
        $this->postJson(route('ops.dashboard.refresh'))->assertOk()->assertJsonPath('success', true);
        $this->getJson(route('ops.dashboard.data'))->assertOk()->assertJsonPath('data.topPortofolios.0.portofolio', 'Latest');
        $this->assertSame('protected', Cache::get('unrelated:keep'));
    }

    public function test_roles_and_read_only_mode_are_enforced_and_refresh_button_matches_permissions(): void
    {
        $this->get(route('ops.dashboard'))->assertOk()->assertDontSee('id="refreshBtn"', false);
        $this->postJson(route('ops.dashboard.refresh'))->assertForbidden();
        $this->deleteJson(route('ops.dashboard.clear'))->assertForbidden();
        $admin = User::factory()->create(['department' => 'operasional', 'role' => 'superadmin']);
        $this->actingAs($admin)->get(route('ops.dashboard'))->assertOk()->assertSee('id="refreshBtn"', false);
        Cache::put('simonpr:read_only_mode', true);
        $this->postJson(route('ops.dashboard.refresh'))->assertForbidden();
        $this->getJson(route('ops.dashboard.data'))->assertOk();
        Cache::forget('simonpr:read_only_mode');
        $general = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $this->actingAs($general)->getJson(route('ops.dashboard.data'))->assertForbidden();
        auth()->logout();
        $this->getJson(route('ops.dashboard.data'))->assertUnauthorized();
    }

    public function test_refresh_clear_and_read_budgets_do_not_block_each_other(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'operasional', 'role' => 'superadmin']));
        foreach (range(1, 5) as $_) {
            $this->postJson(route('ops.dashboard.refresh'))->assertOk();
        }
        $this->postJson(route('ops.dashboard.refresh'))->assertTooManyRequests();
        $this->getJson(route('ops.dashboard.data'))->assertOk();
        $this->deleteJson(route('ops.dashboard.clear'))->assertOk();
    }
}
