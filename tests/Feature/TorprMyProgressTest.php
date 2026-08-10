<?php

namespace Tests\Feature;

use App\Models\Torpr;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class TorprMyProgressTest extends TestCase
{
    use RefreshDatabase;

    public function test_my_progress_only_returns_current_users_torpr(): void
    {
        $user = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $otherUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $mine = Torpr::create([
            'created_by_user_id' => $user->id,
            'nomor_pr' => 'PKB/PR-26/CON/0991',
            'tujuan_pengadaan' => 'PR milik saya',
            'portofolio' => 'IT - FERS',
            'tanggal_pr' => now(),
            'jumlah_pr' => 2500000,
        ]);

        Torpr::create([
            'created_by_user_id' => $otherUser->id,
            'nomor_pr' => 'PKB/PR-26/CON/0992',
            'tujuan_pengadaan' => 'PR milik orang lain',
            'portofolio' => 'PK - LAB',
            'tanggal_pr' => now(),
            'jumlah_pr' => 3500000,
        ]);

        DB::table('ppbj')->insert([
            'ppbj_no' => $mine->nomor_pr,
            'tgl_ppbj' => now()->toDateString(),
            'tgl_terima_pr' => now()->toDateString(),
            'tgl_diserahkan' => now()->toDateString(),
            'uraian' => 'PR milik saya',
            'portofolio' => 'IT - FERS',
            'buyer' => 'Nazar',
            'penyedia_eksternal' => 'Vendor Test',
            'spph_rfq_1' => '570/PKU-VIII/SPPH/2026',
            'progres' => 40,
            'status_sla' => 'ON TRACK',
            'sisa_target_sla' => 7,
            'status' => 'ACTIVE',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->actingAs($user)
            ->getJson(route('torpr.myProgress'))
            ->assertOk()
            ->assertJsonPath('summary.total', 1)
            ->assertJsonPath('items.0.nomor_pr', 'PKB/PR-26/CON/0991')
            ->assertJsonPath('items.0.spph', '570/PKU-VIII/SPPH/2026')
            ->assertJsonMissing(['nomor_pr' => 'PKB/PR-26/CON/0992']);
    }
}
