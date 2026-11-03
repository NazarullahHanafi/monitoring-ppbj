<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\PrReceiptApproval;
use App\Models\Torpr;
use App\Models\User;
use App\Services\CollaborationActionInboxService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class InboxRadarConsistencyTest extends TestCase
{
    use RefreshDatabase;

    public function test_general_radar_uses_live_sla_inputs_in_one_query_and_reuses_cache(): void
    {
        $this->travelTo(now()->startOfDay());
        $user = User::factory()->create(['department' => 'umum']);
        foreach (['NEEDS-SPPH' => null, 'NEEDS-SP' => 'RFQ-EXISTS'] as $number => $spph) {
            Ppbj::create(['ppbj_no' => $number, 'uraian' => 'Overdue procurement', 'status' => 'ACTIVE',
                'total_sebelum_ppn' => 1000000, 'tgl_terima_pr' => now()->subDays(30), 'spph_rfq_1' => $spph]);
        }
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            $queries[] = $query->sql;
        });
        $service = app(CollaborationActionInboxService::class);
        $actions = $service->smartActions($user)->keyBy('number');
        $this->assertSame('critical', $actions['NEEDS-SPPH']['priority']);
        $this->assertSame('critical', $actions['NEEDS-SP']['priority']);
        $this->assertCount(1, $queries);
        $queries = [];
        $this->assertSame($actions->all(), $service->smartActions($user)->keyBy('number')->all());
        $this->assertSame([], $queries);
    }

    public function test_incomplete_delivery_date_requests_handover_not_invoice(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        Ppbj::create(['ppbj_no' => 'MISSING-DO-DATE', 'status' => 'ACTIVE',
            'spph_rfq_1' => 'RFQ', 'awarding_sp' => 'SP', 'tgl_spk' => now()->subDays(10),
            'promised_date' => now(), 'do_no' => 'DO-123', 'do_date' => null]);
        $action = app(CollaborationActionInboxService::class)->smartActions($user)->first();
        $this->assertSame('Pantau serah terima', $action['title']);
        $this->assertSame('critical', $action['priority']);
    }

    public function test_operational_action_opens_torpr_filtered_to_the_selected_pr(): void
    {
        $user = User::factory()->create(['department' => 'operasional']);
        $target = null;
        foreach (['RADAR-TARGET', 'RADAR-OTHER'] as $number) {
            $tor = Torpr::create(['nomor_pr' => $number, 'tujuan_pengadaan' => 'Radar test',
                'tanggal_pr' => now(), 'jumlah_pr' => 1000, 'created_by_user_id' => $user->id]);
            $target ??= $tor;
        }
        PrReceiptApproval::create(['torpr_id' => $target->id, 'status' => 'PENDING',
            'requested_by_user_id' => $user->id, 'requested_name' => $user->name, 'requested_at' => now()]);
        $action = app(CollaborationActionInboxService::class)->smartActions($user)->first();
        $response = $this->actingAs($user)->get($action['url'])->assertOk();
        $rows = $response->viewData('rows');
        $this->assertSame(1, $rows->total());
        $this->assertSame('RADAR-TARGET', $rows->first()->nomor_pr);
    }

    public function test_seven_day_delivery_boundary_uses_the_date_column_without_wrapping_it(): void
    {
        $this->travelTo(now()->startOfDay());
        $user = User::factory()->create(['department' => 'umum']);
        foreach ([7, 8] as $days) {
            Ppbj::create(['ppbj_no' => 'DELIVERY-'.$days, 'status' => 'ACTIVE', 'spph_rfq_1' => 'RFQ',
                'tgl_spk' => now(), 'awarding_sp' => 'SP', 'promised_date' => now()->addDays($days)]);
        }
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            $queries[] = strtolower($query->sql);
        });
        $actions = app(CollaborationActionInboxService::class)->smartActions($user);
        $this->assertSame(['DELIVERY-7'], $actions->pluck('number')->all());
        $this->assertCount(1, $queries);
        $this->assertStringNotContainsString('date("promised_date")', $queries[0]);
        $this->assertStringNotContainsString('strftime', $queries[0]);
    }

    public function test_cached_actions_do_not_capture_the_host_that_populated_the_cache(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        Ppbj::create(['ppbj_no' => 'HOST-INDEPENDENT', 'status' => 'ACTIVE']);
        URL::forceRootUrl('https://audit.invalid');
        $service = app(CollaborationActionInboxService::class);
        $url = $service->smartActions($user)->first()['url'];
        $this->assertStringStartsWith('/spph?', $url);
        $this->assertStringNotContainsString('audit.invalid', $url);
        URL::forceRootUrl('https://production.example');
        $this->assertSame($url, $service->smartActions($user)->first()['url']);
    }
}
