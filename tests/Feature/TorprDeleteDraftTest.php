<?php

namespace Tests\Feature;

use App\Models\PrReceiptApproval;
use App\Models\Torpr;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class TorprDeleteDraftTest extends TestCase
{
    use RefreshDatabase;

    public function test_operasional_user_can_delete_draft_with_creator_password(): void
    {
        $creator = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
            'password' => Hash::make('CreatorPass!234'),
        ]);

        $otherUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $torpr = Torpr::create([
            'created_by_user_id' => $creator->id,
            'nomor_pr' => 'PKB/PR-26/CON/0991',
            'tujuan_pengadaan' => 'Draft hapus test',
            'portofolio' => 'IT - FERS',
            'tanggal_pr' => now(),
            'jumlah_pr' => 1500000,
        ]);

        $this->actingAs($otherUser)
            ->deleteJson(route('torpr.destroy', $torpr->id), [
                'creator_password' => 'CreatorPass!234',
            ])
            ->assertOk()
            ->assertJsonPath('ok', true);

        $this->assertDatabaseMissing('torprs', [
            'id' => $torpr->id,
        ]);

        $this->assertDatabaseHas('activity_logs', [
            'model_type' => Torpr::class,
            'model_id' => $torpr->id,
            'action' => 'deleted',
        ]);
    }

    public function test_delete_draft_rejects_invalid_creator_password(): void
    {
        $creator = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
            'password' => Hash::make('CreatorPass!234'),
        ]);

        $otherUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $torpr = Torpr::create([
            'created_by_user_id' => $creator->id,
            'nomor_pr' => 'PKB/PR-26/CON/0992',
            'tujuan_pengadaan' => 'Draft password salah',
            'portofolio' => 'IT - FERS',
            'tanggal_pr' => now(),
            'jumlah_pr' => 1500000,
        ]);

        $this->actingAs($otherUser)
            ->deleteJson(route('torpr.destroy', $torpr->id), [
                'creator_password' => 'WrongPassword',
            ])
            ->assertStatus(422)
            ->assertJsonPath('attempts_remaining', 2);

        $this->assertDatabaseHas('torprs', [
            'id' => $torpr->id,
        ]);
    }

    public function test_delete_draft_locks_for_15_minutes_after_three_wrong_passwords(): void
    {
        Cache::flush();

        $creator = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
            'password' => Hash::make('CreatorPass!234'),
        ]);

        $otherUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $torpr = Torpr::create([
            'created_by_user_id' => $creator->id,
            'nomor_pr' => 'PKB/PR-26/CON/0994',
            'tujuan_pengadaan' => 'Draft lock password',
            'portofolio' => 'IT - FERS',
            'tanggal_pr' => now(),
            'jumlah_pr' => 1500000,
        ]);

        $this->actingAs($otherUser)
            ->deleteJson(route('torpr.destroy', $torpr->id), ['creator_password' => 'WrongPassword'])
            ->assertStatus(422)
            ->assertJsonPath('attempts_remaining', 2);

        $this->actingAs($otherUser)
            ->deleteJson(route('torpr.destroy', $torpr->id), ['creator_password' => 'StillWrong'])
            ->assertStatus(422)
            ->assertJsonPath('attempts_remaining', 1);

        $this->actingAs($otherUser)
            ->deleteJson(route('torpr.destroy', $torpr->id), ['creator_password' => 'WrongAgain'])
            ->assertStatus(429)
            ->assertJsonPath('locked', true)
            ->assertJsonStructure(['locked_until', 'retry_after']);

        $this->actingAs($otherUser)
            ->deleteJson(route('torpr.destroy', $torpr->id), ['creator_password' => 'CreatorPass!234'])
            ->assertStatus(429)
            ->assertJsonPath('locked', true)
            ->assertJsonStructure(['locked_until', 'retry_after']);

        $this->assertDatabaseHas('torprs', [
            'id' => $torpr->id,
        ]);
    }

    public function test_delete_rejects_pr_that_has_been_requested_to_umum(): void
    {
        $creator = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
            'password' => Hash::make('CreatorPass!234'),
        ]);

        $torpr = Torpr::create([
            'created_by_user_id' => $creator->id,
            'nomor_pr' => 'PKB/PR-26/CON/0993',
            'tujuan_pengadaan' => 'PR sudah request',
            'portofolio' => 'IT - FERS',
            'tanggal_pr' => now(),
            'jumlah_pr' => 1500000,
        ]);

        PrReceiptApproval::create([
            'torpr_id' => $torpr->id,
            'requested_by_user_id' => $creator->id,
            'requested_name' => $creator->name,
            'requested_at' => now(),
            'status' => 'PENDING',
        ]);

        $this->actingAs($creator)
            ->deleteJson(route('torpr.destroy', $torpr->id), [
                'creator_password' => 'CreatorPass!234',
            ])
            ->assertStatus(422)
            ->assertJsonFragment([
                'message' => 'PR tidak bisa dihapus karena sudah pernah diajukan ke Umum. Gunakan alur pembatalan/status agar riwayat audit tetap aman.',
            ]);

        $this->assertDatabaseHas('torprs', [
            'id' => $torpr->id,
        ]);
    }
}
