<?php

namespace Tests\Feature;

use App\Models\PrReceiptApproval;
use App\Models\Torpr;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class TrackingQueryBudgetTest extends TestCase
{
    use RefreshDatabase;

    public function test_invalid_tracking_keywords_are_rejected_before_business_queries(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'operasional']));
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            if (str_contains($query->sql, 'from "torprs"') || str_contains($query->sql, 'from "ppbj"')) {
                $queries[] = $query->sql;
            }
        });
        foreach (['landing.track', 'tracking.index', 'landing.track.suggest'] as $name) {
            foreach ([['unexpected-array'], str_repeat('a', 181)] as $keyword) {
                $this->getJson(route($name, ['q' => $keyword]))->assertUnprocessable()->assertJsonValidationErrors('q');
            }
        }
        $this->assertSame([], $queries);
        $this->getJson(route('landing.track.suggest'))->assertOk()->assertExactJson(['items' => []]);
        $this->assertSame([], $queries);
    }

    public function test_tracking_batches_all_actor_names_and_preserves_signature_fallbacks(): void
    {
        $actors = collect(['Creator', 'Receiver', 'Approver', 'Rejector', 'Requester'])
            ->map(fn ($name) => User::factory()->create(['name' => $name, 'department' => 'operasional']));
        $tor = Torpr::create([
            'nomor_pr' => 'AUDIT/TRACKING/ACTORS', 'tanggal_pr' => '2026-11-03',
            'tujuan_pengadaan' => 'Tracking actor query budget', 'jumlah_pr' => 1000000,
            'created_by_user_id' => $actors[0]->id, 'received_by_umum_user_id' => $actors[1]->id,
            'received_at' => now(), 'tgl_ttd_kabid_pr' => now(), 'tgl_ttd_kacab_pr' => now(),
        ]);
        PrReceiptApproval::create([
            'torpr_id' => $tor->id, 'status' => 'APPROVED', 'requested_name' => 'Unknown',
            'requested_by_user_id' => $actors[4]->id, 'requested_at' => now(),
            'approved_by_user_id' => $actors[2]->id, 'approved_at' => now(),
            'rejected_by_user_id' => $actors[3]->id,
        ]);
        $this->actingAs($actors[0]);
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            $queries[] = strtolower($query->sql);
        });
        $response = $this->get(route('tracking.index', ['q' => $tor->nomor_pr]))->assertOk();
        $row = $response->viewData('row');
        $this->assertSame('Creator', $row->createdBy->name);
        $this->assertSame('Receiver', $row->receivedByUmum->name);
        $this->assertSame('Approver', $row->latestReceiptApproval->approvedBy->name);
        $this->assertSame('Rejector', $row->latestReceiptApproval->rejectedBy->name);
        $this->assertSame('Requester', $row->latestReceiptApproval->requested_name);
        $this->assertSame('Creator', $row->signed_by_kabid_name);
        $this->assertSame('Creator', $row->signed_by_kacab_name);
        $userQueries = collect($queries)->filter(fn ($sql) => str_starts_with($sql, 'select') && str_contains($sql, 'from "users"'));
        $this->assertCount(1, $userQueries, 'Actor names must be read in one bounded query, not five separate lookups.');
        $this->assertSame(['id', 'name'], array_keys((array) $row->createdBy));

        $queries = [];
        $this->get(route('tracking.index', ['q' => $tor->nomor_pr]))->assertOk();
        $this->assertCount(0, collect($queries)->filter(fn ($sql) => str_contains($sql, 'from "users"')));
    }

    public function test_missing_receiver_keeps_null_and_explicit_signer_names_are_preserved(): void
    {
        $user = User::factory()->create(['department' => 'operasional']);
        $tor = Torpr::create([
            'nomor_pr' => 'AUDIT/TRACKING/NO-ACTORS', 'tanggal_pr' => '2026-11-03',
            'tujuan_pengadaan' => 'Legacy tracking', 'jumlah_pr' => 1000,
            'created_by_user_id' => $user->id,
            'tgl_ttd_kabid_pr' => now(), 'signed_by_kabid_name' => 'Historical signer',
        ]);
        $this->actingAs($user);
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            $queries[] = strtolower($query->sql);
        });
        $row = $this->get(route('tracking.index', ['q' => $tor->nomor_pr]))->assertOk()->viewData('row');
        $this->assertSame($user->name, $row->createdBy->name);
        $this->assertNull($row->receivedByUmum);
        $this->assertSame('Historical signer', $row->signed_by_kabid_name);
        $this->assertCount(1, collect($queries)->filter(fn ($sql) => str_contains($sql, 'from "users"')));
    }
}
