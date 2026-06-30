<?php

namespace Tests\Feature;

use App\Models\PrReceiptApproval;
use App\Models\MasterBuyer;
use App\Models\Torpr;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
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

    public function test_approval_creates_ppbj_with_buyer_from_approver(): void
    {
        $umumUser = User::factory()->create([
            'name' => 'NAZAR',
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        MasterBuyer::create(['nama' => 'NAZAR']);

        $operasionalUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $torpr = Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/0402',
            'tujuan_pengadaan' => 'Pengadaan jasa inspeksi',
            'portofolio' => 'CON',
            'jumlah_pr' => 15000000,
            'created_by_user_id' => $operasionalUser->id,
        ]);

        $approval = PrReceiptApproval::create([
            'torpr_id' => $torpr->id,
            'requested_by_user_id' => $operasionalUser->id,
            'requested_name' => 'Operasional Test',
            'requested_at' => now(),
            'status' => 'PENDING',
        ]);

        $this->actingAs($umumUser)
            ->post(route('approval.pr.approve', $approval->id))
            ->assertRedirect();

        $this->assertDatabaseHas('ppbj', [
            'ppbj_no' => 'PKB/PR-26/CON/0402',
            'portofolio' => 'CON',
            'buyer' => 'NAZAR',
            'total_sebelum_ppn' => 15000000,
        ]);
    }

    public function test_approval_uses_mapped_buyer_name_instead_of_user_full_name(): void
    {
        $umumUser = User::factory()->create([
            'name' => 'Putri',
            'buyer_name' => 'Pb',
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        MasterBuyer::create(['nama' => 'Pb']);

        $operasionalUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $torpr = Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/0404',
            'tujuan_pengadaan' => 'Pengadaan jasa mapping buyer',
            'portofolio' => 'CON',
            'jumlah_pr' => 19000000,
            'created_by_user_id' => $operasionalUser->id,
        ]);

        $approval = PrReceiptApproval::create([
            'torpr_id' => $torpr->id,
            'requested_by_user_id' => $operasionalUser->id,
            'requested_name' => 'Operasional Test',
            'requested_at' => now(),
            'status' => 'PENDING',
        ]);

        $this->actingAs($umumUser)
            ->post(route('approval.pr.approve', $approval->id))
            ->assertRedirect();

        $this->assertDatabaseHas('ppbj', [
            'ppbj_no' => 'PKB/PR-26/CON/0404',
            'portofolio' => 'CON',
            'buyer' => 'Pb',
        ]);

        $this->assertDatabaseMissing('ppbj', [
            'ppbj_no' => 'PKB/PR-26/CON/0404',
            'buyer' => 'Putri',
        ]);
    }

    public function test_approval_fills_empty_buyer_on_existing_ppbj(): void
    {
        $umumUser = User::factory()->create([
            'name' => 'Buyer Baru',
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        $operasionalUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        DB::table('ppbj')->insert([
            'ppbj_no' => 'PKB/PR-26/CON/0403',
            'tgl_terima_pr' => now()->subDay()->toDateString(),
            'uraian' => 'Data PPBJ lama',
            'portofolio' => null,
            'buyer' => null,
            'total_sebelum_ppn' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $torpr = Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/0403',
            'tujuan_pengadaan' => 'Pengadaan jasa existing',
            'portofolio' => 'CON',
            'jumlah_pr' => 17000000,
            'created_by_user_id' => $operasionalUser->id,
        ]);

        $approval = PrReceiptApproval::create([
            'torpr_id' => $torpr->id,
            'requested_by_user_id' => $operasionalUser->id,
            'requested_name' => 'Operasional Test',
            'requested_at' => now(),
            'status' => 'PENDING',
        ]);

        $this->actingAs($umumUser)
            ->post(route('approval.pr.approve', $approval->id))
            ->assertRedirect();

        $this->assertDatabaseHas('ppbj', [
            'ppbj_no' => 'PKB/PR-26/CON/0403',
            'portofolio' => 'CON',
            'buyer' => 'Buyer Baru',
        ]);

        $this->assertDatabaseHas('master_buyer', [
            'nama' => 'Buyer Baru',
        ]);
    }
}
