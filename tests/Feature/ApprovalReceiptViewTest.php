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
            ->post(route('approval.pr.approve', $approval->id), ['confirm_duplicate' => '1'])
            ->assertRedirect();

        $this->assertDatabaseHas('ppbj', [
            'ppbj_no' => 'PKB/PR-26/CON/0403',
            'tgl_ppbj' => '2026-06-13',
            'uraian' => 'Pengadaan jasa existing',
            'portofolio' => 'CON',
            'buyer' => 'Buyer Baru',
            'total_sebelum_ppn' => 17000000,
        ]);

        $this->assertDatabaseHas('master_buyer', [
            'nama' => 'Buyer Baru',
        ]);
    }

    public function test_duplicate_pr_must_be_explicitly_confirmed_before_approval(): void
    {
        $umumUser = User::factory()->create([
            'name' => 'Approver Umum',
            'department' => 'umum',
            'role' => 'superadmin',
        ]);
        $operasionalUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);
        $nomorPr = 'PKB/PR-26/CON/0410';

        DB::table('ppbj')->insert([
            'ppbj_no' => $nomorPr,
            'uraian' => 'Data lama yang belum boleh berubah',
            'total_sebelum_ppn' => 5000000,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $torpr = Torpr::create([
            'nomor_pr' => $nomorPr,
            'tujuan_pengadaan' => 'Data PR terbaru',
            'jumlah_pr' => 9000000,
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
            ->assertRedirect()
            ->assertSessionHas('warning');

        $this->assertDatabaseHas('pr_receipt_approvals', [
            'id' => $approval->id,
            'status' => 'PENDING',
        ]);
        $this->assertDatabaseHas('ppbj', [
            'ppbj_no' => $nomorPr,
            'uraian' => 'Data lama yang belum boleh berubah',
            'total_sebelum_ppn' => 5000000,
        ]);
    }

    public function test_duplicate_check_reports_ppbj_spph_and_sp_sources(): void
    {
        $umumUser = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
        ]);
        $operasionalUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);
        $nomorPr = 'PKB/PR-26/CON/0411';

        DB::table('ppbj')->insert([
            'ppbj_no' => $nomorPr,
            'uraian' => 'PPBJ lama',
            'total_sebelum_ppn' => 1000000,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('spphs')->insert([
            'nomor_spph' => '801/PKU-X/SPPH/2026',
            'sequence_number' => 801,
            'tanggal' => '2026-10-15',
            'nomor_pr' => $nomorPr,
            'nama_vendor' => 'Vendor SPPH',
            'deskripsi_pengadaan' => 'SPPH lama',
            'pic' => 'Nazar',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('sps')->insert([
            'nomor_sp' => '801/PKU-II/SP/2026',
            'sequence_number' => 801,
            'tanggal_sp' => '2026-10-15',
            'nomor_pr' => $nomorPr,
            'nama_vendor' => 'Vendor SP',
            'deskripsi_pengadaan' => 'SP lama',
            'pic' => 'Nazar',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $torpr = Torpr::create([
            'nomor_pr' => $nomorPr,
            'tujuan_pengadaan' => 'PR terbaru',
            'jumlah_pr' => 12000000,
            'created_by_user_id' => $operasionalUser->id,
        ]);
        $approval = PrReceiptApproval::create([
            'torpr_id' => $torpr->id,
            'requested_by_user_id' => $operasionalUser->id,
            'requested_name' => 'Operasional Test',
            'requested_at' => now(),
            'status' => 'PENDING',
        ]);

        $response = $this->actingAs($umumUser)
            ->getJson(route('approval.pr.duplicate-check', $approval->id))
            ->assertOk()
            ->assertJsonPath('has_conflicts', true)
            ->assertJsonPath('source_count', 3)
            ->assertJsonPath('record_count', 3);

        $this->assertSame(
            ['ppbj', 'spph', 'sp'],
            collect($response->json('sources'))->pluck('key')->all()
        );
    }

    public function test_confirmed_duplicate_updates_pr_fields_without_erasing_process_documents(): void
    {
        $umumUser = User::factory()->create([
            'name' => 'Buyer Konfirmasi',
            'department' => 'umum',
            'role' => 'superadmin',
        ]);
        $operasionalUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);
        $nomorPr = 'PKB/PR-26/CON/0412';

        DB::table('ppbj')->insert([
            'ppbj_no' => $nomorPr,
            'uraian' => 'Uraian lama',
            'portofolio' => 'LAMA',
            'buyer' => 'Buyer Lama',
            'total_sebelum_ppn' => 3000000,
            'spph_rfq_1' => '700/PKU-X/SPPH/2026',
            'awarding_sp' => '700/PKU-II/SP/2026',
            'do_no' => 'DO-700',
            'no_invoice' => 'INV-700',
            'progres' => 80,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $torpr = Torpr::create([
            'nomor_pr' => $nomorPr,
            'tanggal_pr' => '2026-10-14',
            'tujuan_pengadaan' => 'Uraian terbaru',
            'portofolio' => 'CON',
            'jumlah_pr' => 25000000,
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
            ->post(route('approval.pr.approve', $approval->id), ['confirm_duplicate' => '1'])
            ->assertRedirect()
            ->assertSessionHas('warning');

        $this->assertDatabaseHas('pr_receipt_approvals', [
            'id' => $approval->id,
            'status' => 'APPROVED',
        ]);
        $this->assertDatabaseHas('ppbj', [
            'ppbj_no' => $nomorPr,
            'uraian' => 'Uraian terbaru',
            'portofolio' => 'CON',
            'buyer' => 'Buyer Konfirmasi',
            'total_sebelum_ppn' => 25000000,
            'spph_rfq_1' => '700/PKU-X/SPPH/2026',
            'awarding_sp' => '700/PKU-II/SP/2026',
            'do_no' => 'DO-700',
            'no_invoice' => 'INV-700',
            'progres' => 80,
        ]);
    }
}
