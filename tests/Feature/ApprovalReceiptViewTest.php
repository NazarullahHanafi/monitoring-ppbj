<?php

namespace Tests\Feature;

use App\Models\MasterBuyer;
use App\Models\PrReceiptApproval;
use App\Models\Torpr;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;
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

    public function test_approval_exports_excel_for_pending_rows_with_complete_requester_details(): void
    {
        $umumUser = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);
        $operasionalUser = User::factory()->create([
            'name' => 'Atika Operasional',
            'email' => 'atika@example.test',
            'department' => 'operasional',
            'role' => 'user',
        ]);
        $torpr = Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/0991',
            'tanggal_pr' => '2026-09-01',
            'tujuan_pengadaan' => 'Pengadaan perlengkapan laporan',
            'portofolio' => 'CON',
            'jumlah_pr' => 27500000,
            'created_by_user_id' => $operasionalUser->id,
        ]);
        PrReceiptApproval::create([
            'torpr_id' => $torpr->id,
            'requested_by_user_id' => $operasionalUser->id,
            'requested_name' => 'Atika',
            'requested_at' => now()->subHours(5),
            'status' => 'PENDING',
        ]);

        $response = $this->actingAs($umumUser)
            ->get(route('approval.pr.export.excel', ['status' => 'PENDING', 'q' => '0991']))
            ->assertOk()
            ->assertHeader('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        $content = $response->streamedContent();
        $this->assertStringStartsWith('PK', $content);

        $tempFile = tempnam(sys_get_temp_dir(), 'approval-report-');
        file_put_contents($tempFile, $content);
        $spreadsheet = IOFactory::load($tempFile);
        $sheet = $spreadsheet->getActiveSheet();

        $this->assertSame('LAPORAN MONITORING APPROVAL PR', $sheet->getCell('A1')->getValue());
        $this->assertSame('PKB/PR-26/CON/0991', $sheet->getCell('B7')->getValue());
        $this->assertSame('Atika', $sheet->getCell('G7')->getValue());
        $this->assertSame('atika@example.test', $sheet->getCell('I7')->getValue());
        $this->assertSame('PENDING', $sheet->getCell('M7')->getValue());

        $spreadsheet->disconnectWorksheets();
        @unlink($tempFile);
    }

    public function test_approval_exports_a_real_pdf_for_pending_report(): void
    {
        $umumUser = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);
        $operasionalUser = User::factory()->create([
            'name' => 'Riko Operasional',
            'department' => 'operasional',
            'role' => 'user',
        ]);
        $torpr = Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/0992',
            'tujuan_pengadaan' => 'Pengadaan untuk laporan PDF',
            'jumlah_pr' => 5100000,
            'created_by_user_id' => $operasionalUser->id,
        ]);
        PrReceiptApproval::create([
            'torpr_id' => $torpr->id,
            'requested_by_user_id' => $operasionalUser->id,
            'requested_name' => 'Riko',
            'requested_at' => now()->subDay(),
            'status' => 'PENDING',
        ]);

        $response = $this->actingAs($umumUser)
            ->get(route('approval.pr.export.pdf', ['status' => 'PENDING']))
            ->assertOk()
            ->assertHeader('content-type', 'application/pdf');

        $this->assertStringStartsWith('%PDF-', $response->getContent());
    }

    public function test_approval_export_routes_are_not_accessible_by_operasional_users(): void
    {
        $operasionalUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $this->actingAs($operasionalUser)
            ->get(route('approval.pr.export.excel'))
            ->assertForbidden();

        $this->actingAs($operasionalUser)
            ->get(route('approval.pr.export.pdf'))
            ->assertForbidden();
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
            'tanggal_pr' => '2026-06-12 09:15:00',
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
            'tgl_ppbj' => '2026-06-12',
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
            'tgl_ppbj' => null,
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
            'tanggal_pr' => '2026-06-13 10:30:00',
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
            'tgl_ppbj' => '2026-06-13',
            'portofolio' => 'CON',
            'buyer' => 'Buyer Baru',
        ]);

        $this->assertDatabaseHas('master_buyer', [
            'nama' => 'Buyer Baru',
        ]);
    }
}
