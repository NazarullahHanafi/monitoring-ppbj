<?php

namespace Tests\Feature;

use App\Models\PrReceiptApproval;
use App\Models\Torpr;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApprovalReceiptViewTest extends TestCase
{
    use RefreshDatabase;

    public function test_approval_page_shows_pr_value(): void
    {
        $umumUser = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        $operasionalUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $torpr = Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/0401',
            'tujuan_pengadaan' => 'Pengadaan material uji',
            'portofolio' => 'CON',
            'jumlah_pr' => 12500000,
            'created_by_user_id' => $operasionalUser->id,
        ]);

        PrReceiptApproval::create([
            'torpr_id' => $torpr->id,
            'requested_by_user_id' => $operasionalUser->id,
            'requested_name' => 'Operasional Test',
            'requested_at' => now(),
            'status' => 'PENDING',
        ]);

        $this->actingAs($umumUser)
            ->get(route('approval.pr.index'))
            ->assertOk()
            ->assertSee('Nilai PR')
            ->assertSee('Rp 12.500.000');
    }
}
