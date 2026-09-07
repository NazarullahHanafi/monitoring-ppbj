<?php

namespace Tests\Feature;

use App\Http\Controllers\SpController;
use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\SpMasterOption;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;
use ZipArchive;

class SpPrintBidangPrTest extends TestCase
{
    use RefreshDatabase;

    public function test_sp_page_renders_native_bidang_pr_print_dialog_and_handler(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        $response = $this->actingAs($user)->get(route('sp.index'));

        $response->assertOk();
        $response->assertSee('id="spBidangPrintModal"', false);
        $response->assertSee('class="sp-print-choice-overlay"', false);
        $response->assertSee('.sp-print-choice-card', false);
        $response->assertSee("modal.classList.add('is-open')", false);
        $response->assertSee('window.openSpPrintPreview = function', false);
        $response->assertSee('DUKUNGAN BISNIS');
        $response->assertSee('PENGUJIAN DAN KONSULTANSI');
    }

    public function test_selected_bidang_pr_is_written_to_sp_document_note(): void
    {
        Cache::flush();

        SpMasterOption::query()->updateOrCreate(
            ['type' => 'bidang_pr', 'nama' => 'INSPEKSI TEKNIK'],
            ['is_active' => true]
        );

        Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/TEST-BIDANG',
            'tgl_ppbj' => '2026-09-07',
            'uraian' => 'Pengujian pilihan bidang PR',
            'total_sebelum_ppn' => 10_000_000,
        ]);

        $sp = Sp::create([
            'nomor_sp' => '999/PKU-IX/SP/2026',
            'sequence_number' => 999,
            'tanggal_sp' => '2026-09-07',
            'nilai_sp' => 10_000_000,
            'nomor_pr' => 'PKB/PR-26/CON/TEST-BIDANG',
            'nilai_pr' => 10_000_000,
            'nama_vendor' => 'PT TEST VENDOR',
            'deskripsi_pengadaan' => 'Pengujian pilihan bidang PR',
            'pic' => 'Tester',
        ]);

        $response = (new SpController)->cetakSp($sp, 'INSPEKSI TEKNIK');
        $path = $response->getFile()->getPathname();

        $zip = new ZipArchive;
        $this->assertTrue($zip->open($path));
        $documentXml = $zip->getFromName('word/document.xml');
        $zip->close();

        @unlink($path);

        $this->assertIsString($documentXml);
        $this->assertStringContainsString('Memenuhi PR Bidang', $documentXml);
        $this->assertStringContainsString('INSPEKSI TEKNIK', $documentXml);
        $this->assertStringNotContainsString('(.....................)', $documentXml);
    }

    public function test_inactive_or_unknown_bidang_pr_is_rejected(): void
    {
        Cache::flush();

        SpMasterOption::create([
            'type' => 'bidang_pr',
            'nama' => 'BIDANG NONAKTIF',
            'is_active' => false,
        ]);

        $this->expectException(ValidationException::class);

        (new SpController)->cetakSp(new Sp, 'BIDANG NONAKTIF');
    }

    public function test_selected_bidang_pr_is_used_by_every_contract_value_tier(): void
    {
        Cache::flush();

        SpMasterOption::query()->updateOrCreate(
            ['type' => 'bidang_pr', 'nama' => 'PENGUJIAN DAN KONSULTANSI'],
            ['is_active' => true]
        );

        foreach ([60_000_000, 350_000_000, 550_000_000] as $index => $nilaiSp) {
            $sequence = 910 + $index;
            $nomorPr = "PKB/PR-26/CON/TEST-KONTRAK-{$sequence}";

            Ppbj::create([
                'ppbj_no' => $nomorPr,
                'tgl_ppbj' => '2026-09-07',
                'uraian' => 'Pengujian bidang kontrak',
                'total_sebelum_ppn' => $nilaiSp,
            ]);

            $sp = Sp::create([
                'nomor_sp' => "{$sequence}/PKU-IX/SP/2026",
                'sequence_number' => $sequence,
                'tanggal_sp' => '2026-09-07',
                'nilai_sp' => $nilaiSp,
                'nomor_pr' => $nomorPr,
                'nilai_pr' => $nilaiSp,
                'nama_vendor' => 'PT TEST VENDOR',
                'deskripsi_pengadaan' => 'Pengujian bidang kontrak',
                'pic' => 'Tester',
                'awal_kontrak' => '2026-09-07',
                'akhir_kontrak' => '2026-10-07',
            ]);

            $response = (new SpController)->cetakSp($sp, 'PENGUJIAN DAN KONSULTANSI');
            $path = $response->getFile()->getPathname();
            $zip = new ZipArchive;

            $this->assertTrue($zip->open($path), "DOCX tier {$nilaiSp} harus valid.");
            $documentXml = $zip->getFromName('word/document.xml');
            $zip->close();
            @unlink($path);

            $this->assertIsString($documentXml);
            $this->assertStringContainsString('PENGUJIAN DAN KONSULTANSI', $documentXml);
        }
    }
}
