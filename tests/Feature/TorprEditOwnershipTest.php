<?php

namespace Tests\Feature;

use App\Models\Torpr;
use App\Models\TorprEditRequest;
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

    public function test_approved_edit_request_allows_requester_to_edit_only_that_pr(): void
    {
        $creator = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $requester = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $torpr = Torpr::create([
            'created_by_user_id' => $creator->id,
            'nomor_pr' => 'PKB/PR-26/CON/0989',
            'tujuan_pengadaan' => 'Draft dengan izin edit',
            'portofolio' => 'IT - FERS',
            'tanggal_pr' => now(),
            'jumlah_pr' => 1500000,
        ]);

        TorprEditRequest::create([
            'torpr_id' => $torpr->id,
            'requester_user_id' => $requester->id,
            'owner_user_id' => $creator->id,
            'status' => 'approved',
            'reason' => 'Perlu koreksi nilai',
            'reviewed_by_user_id' => $creator->id,
            'reviewed_at' => now(),
            'expires_at' => now()->addHours(24),
        ]);

        $this->actingAs($requester)
            ->putJson(route('torpr.update', $torpr->id), [
                'tujuan_pengadaan' => 'Sudah diedit dengan izin',
            ])
            ->assertOk()
            ->assertJsonPath('ok', true);

        $this->assertDatabaseHas('torprs', [
            'id' => $torpr->id,
            'tujuan_pengadaan' => 'Sudah diedit dengan izin',
        ]);
    }

    public function test_operasional_superadmin_can_edit_without_requesting_creator_permission(): void
    {
        $creator = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $superadmin = User::factory()->create([
            'department' => 'operasional',
            'role' => 'superadmin',
        ]);

        $torpr = Torpr::create([
            'created_by_user_id' => $creator->id,
            'nomor_pr' => 'PKB/PR-26/CON/0990',
            'tujuan_pengadaan' => 'Draft milik user biasa',
            'portofolio' => 'IT - FERS',
            'tanggal_pr' => now(),
            'jumlah_pr' => 1500000,
        ]);

        $this->actingAs($superadmin)
            ->putJson(route('torpr.update', $torpr->id), [
                'tujuan_pengadaan' => 'Diedit langsung oleh superadmin',
            ])
            ->assertOk()
            ->assertJsonPath('ok', true);

        $this->assertDatabaseHas('torprs', [
            'id' => $torpr->id,
            'tujuan_pengadaan' => 'Diedit langsung oleh superadmin',
        ]);
    }

    public function test_edit_request_requires_reason(): void
    {
        $creator = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $requester = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $torpr = Torpr::create([
            'created_by_user_id' => $creator->id,
            'nomor_pr' => 'PKB/PR-26/CON/0991',
            'tujuan_pengadaan' => 'Draft yang perlu alasan request',
            'portofolio' => 'IT - FERS',
            'tanggal_pr' => now(),
            'jumlah_pr' => 1500000,
        ]);

        $this->actingAs($requester)
            ->postJson(route('torpr.requestEdit', $torpr->id), [
                'reason' => '',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('reason');

        $this->assertDatabaseMissing('torpr_edit_requests', [
            'torpr_id' => $torpr->id,
            'requester_user_id' => $requester->id,
        ]);
    }

    public function test_rejecting_edit_request_requires_rejection_reason(): void
    {
        $creator = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $requester = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $torpr = Torpr::create([
            'created_by_user_id' => $creator->id,
            'nomor_pr' => 'PKB/PR-26/CON/0992',
            'tujuan_pengadaan' => 'Draft request edit yang ditolak',
            'portofolio' => 'IT - FERS',
            'tanggal_pr' => now(),
            'jumlah_pr' => 1500000,
        ]);

        $editRequest = TorprEditRequest::create([
            'torpr_id' => $torpr->id,
            'requester_user_id' => $requester->id,
            'owner_user_id' => $creator->id,
            'status' => 'pending',
            'reason' => 'Mohon izin edit nilai PR.',
        ]);

        $this->actingAs($creator)
            ->patchJson(route('torpr.editRequests.review', $editRequest->id), [
                'decision' => 'reject',
                'review_note' => '',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('review_note');

        $this->assertDatabaseHas('torpr_edit_requests', [
            'id' => $editRequest->id,
            'status' => 'pending',
        ]);
    }

    public function test_expired_edit_permission_no_longer_allows_update(): void
    {
        $creator = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $requester = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $torpr = Torpr::create([
            'created_by_user_id' => $creator->id,
            'nomor_pr' => 'PKB/PR-26/CON/0993',
            'tujuan_pengadaan' => 'Draft izin edit kedaluwarsa',
            'portofolio' => 'IT - FERS',
            'tanggal_pr' => now(),
            'jumlah_pr' => 1500000,
        ]);

        TorprEditRequest::create([
            'torpr_id' => $torpr->id,
            'requester_user_id' => $requester->id,
            'owner_user_id' => $creator->id,
            'status' => 'approved',
            'reason' => 'Mohon izin edit nilai PR.',
            'reviewed_by_user_id' => $creator->id,
            'reviewed_at' => now()->subDays(2),
            'expires_at' => now()->subMinute(),
        ]);

        $this->actingAs($requester)
            ->putJson(route('torpr.update', $torpr->id), [
                'tujuan_pengadaan' => 'Dicoba setelah izin expired',
            ])
            ->assertForbidden();

        $this->assertDatabaseHas('torprs', [
            'id' => $torpr->id,
            'tujuan_pengadaan' => 'Draft izin edit kedaluwarsa',
        ]);
    }

    public function test_only_pr_creator_can_review_edit_request(): void
    {
        $creator = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $requester = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $otherUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $torpr = Torpr::create([
            'created_by_user_id' => $creator->id,
            'nomor_pr' => 'PKB/PR-26/CON/0994',
            'tujuan_pengadaan' => 'Draft request bukan milik reviewer',
            'portofolio' => 'IT - FERS',
            'tanggal_pr' => now(),
            'jumlah_pr' => 1500000,
        ]);

        $editRequest = TorprEditRequest::create([
            'torpr_id' => $torpr->id,
            'requester_user_id' => $requester->id,
            'owner_user_id' => $creator->id,
            'status' => 'pending',
            'reason' => 'Mohon izin edit nilai PR.',
        ]);

        $this->actingAs($otherUser)
            ->patchJson(route('torpr.editRequests.review', $editRequest->id), [
                'decision' => 'approve',
                'review_note' => 'Saya setujui.',
            ])
            ->assertForbidden();

        $this->assertDatabaseHas('torpr_edit_requests', [
            'id' => $editRequest->id,
            'status' => 'pending',
        ]);
    }
}
