<?php

namespace Tests\Feature;

use App\Models\Torpr;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TorprEditOwnershipTest extends TestCase
{
    use RefreshDatabase;

    public function test_operasional_user_must_request_creator_before_editing_someone_elses_pr(): void
    {
        $creator = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $otherUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $torpr = Torpr::create([
            'created_by_user_id' => $creator->id,
            'nomor_pr' => 'PKB/PR-26/CON/0988',
            'tujuan_pengadaan' => 'Draft milik creator',
            'portofolio' => 'IT - FERS',
            'tanggal_pr' => now(),
            'jumlah_pr' => 1500000,
        ]);

        $this->actingAs($otherUser)
            ->putJson(route('torpr.update', $torpr->id), [
                'tujuan_pengadaan' => 'Dicoba diubah user lain',
            ])
            ->assertForbidden()
            ->assertJsonFragment([
                'message' => 'Edit PR terkunci. Silakan request izin edit ke pembuat PR terlebih dahulu.',
            ]);

        $this->assertDatabaseHas('torprs', [
            'id' => $torpr->id,
            'tujuan_pengadaan' => 'Draft milik creator',
        ]);
    }
}
