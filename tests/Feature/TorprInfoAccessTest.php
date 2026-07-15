<?php

namespace Tests\Feature;

use App\Models\Torpr;
use App\Models\User;
use App\Models\PrReceiptApproval;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TorprInfoAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_operasional_user_can_view_torpr_info_created_by_another_user(): void
    {
        $creator = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $viewer = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $torpr = Torpr::create([
            'created_by_user_id' => $creator->id,
            'nomor_pr' => 'PKB/PR-26/CON/0442',
            'tujuan_pengadaan' => 'Bunker test',
            'portofolio' => 'IT - FERS',
            'tanggal_pr' => now(),
            'jumlah_pr' => 1500000,
        ]);

        PrReceiptApproval::create([
            'torpr_id' => $torpr->id,
            'requested_by_user_id' => $creator->id,
            'requested_name' => 'Eli Operasional',
            'requested_at' => now(),
            'status' => 'PENDING',
        ]);

        $this->actingAs($viewer)
            ->getJson(route('torpr.json', $torpr->id))
            ->assertOk()
            ->assertJsonPath('nomor_pr', 'PKB/PR-26/CON/0442')
            ->assertJsonPath('portofolio', 'IT - FERS')
            ->assertJsonPath('latest_approval.status', 'PENDING')
            ->assertJsonPath('latest_approval.requested_name', 'Eli Operasional')
            ->assertJsonStructure([
                'id',
                'nomor_pr',
                'created_at',
                'updated_at',
                'received_at',
                'signed_by_kabid_name',
                'signed_by_kacab_name',
                'latest_approval' => [
                    'status',
                    'requested_at',
                    'requested_name',
                    'approved_at',
                    'approved_by_name',
                    'rejected_at',
                    'rejected_by_name',
                    'rejected_reason',
                    'updated_at',
                ],
            ]);
    }

    public function test_umum_user_cannot_view_operasional_torpr_info(): void
    {
        $creator = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $umum = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        $torpr = Torpr::create([
            'created_by_user_id' => $creator->id,
            'nomor_pr' => 'PKB/PR-26/CON/0443',
            'tujuan_pengadaan' => 'Bunker private',
            'portofolio' => 'IT - FERS',
            'tanggal_pr' => now(),
            'jumlah_pr' => 2500000,
        ]);

        $this->actingAs($umum)
            ->getJson(route('torpr.json', $torpr->id))
            ->assertForbidden();
    }
}
