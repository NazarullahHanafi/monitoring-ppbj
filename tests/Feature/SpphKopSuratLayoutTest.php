<?php

namespace Tests\Feature;

use App\Http\Controllers\SpphController;
use App\Models\Spph;
use App\Models\SpMasterOption;
use App\Models\Vendor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;
use ZipArchive;

class SpphKopSuratLayoutTest extends TestCase
{
    use RefreshDatabase;

    public function test_spph_letterhead_reserves_footer_space(): void
    {
        Vendor::create([
            'nama_vendor' => 'Vendor SPPH Layout',
            'alamat' => 'Jl. Contoh No. 1',
            'telepon' => '0761-000000',
            'fax' => '0761-111111',
            'email' => 'vendor@example.test',
        ]);

        $spph = Spph::create([
            'nomor_spph' => '777/PKU-VII/SPPH/2026',
            'sequence_number' => 777,
            'tanggal' => '2026-07-02',
            'nama_vendor' => 'Vendor SPPH Layout',
            'deskripsi_pengadaan' => 'Pengadaan layout kop surat SPPH',
            'pic' => 'Tester',
        ]);

        $response = (new SpphController())->cetakSpph(Request::create('/spph-preview'), $spph);
        $docxPath = $response->getFile()->getPathname();

        $zip = new ZipArchive();
        $this->assertTrue($zip->open($docxPath));

        $documentXml = $zip->getFromName('word/document.xml');
        $header1 = $zip->getFromName('word/header1.xml');
        $header2 = $zip->getFromName('word/header2.xml');
        $zip->close();

        @unlink($docxPath);

        $this->assertIsString($documentXml);
        $this->assertStringContainsString('w:bottom="2400"', $documentXml);
        $this->assertStringNotContainsString('w:bottom="1100"', $documentXml);
        $this->assertStringContainsString('w:line="276"', $documentXml);
        $this->assertStringContainsString('w:after="40" w:line="283.2"', $documentXml);

        foreach ([$header1, $header2] as $headerXml) {
            $this->assertIsString($headerXml);
            $this->assertStringContainsString('margin-left:0', $headerXml);
            $this->assertStringContainsString('margin-top:0pt', $headerXml);
            $this->assertStringContainsString('width:595.3pt', $headerXml);
            $this->assertStringContainsString('height:841.9pt', $headerXml);
        }
    }

    public function test_spph_print_can_use_branch_head_signer(): void
    {
        Vendor::create([
            'nama_vendor' => 'Vendor SPPH Signer',
            'alamat' => 'Jl. Penanda Tangan No. 1',
        ]);

        $spph = Spph::create([
            'nomor_spph' => '778/PKU-VII/SPPH/2026',
            'sequence_number' => 778,
            'tanggal' => '2026-07-02',
            'nama_vendor' => 'Vendor SPPH Signer',
            'deskripsi_pengadaan' => 'Pengadaan pilihan penandatangan SPPH',
            'pic' => 'Tester',
        ]);

        $request = Request::create('/spph-preview', 'GET', ['penandatangan' => 'bambang']);
        $response = (new SpphController())->cetakSpph($request, $spph);
        $docxPath = $response->getFile()->getPathname();

        $zip = new ZipArchive();
        $this->assertTrue($zip->open($docxPath));
        $documentXml = $zip->getFromName('word/document.xml');
        $zip->close();

        @unlink($docxPath);

        $this->assertIsString($documentXml);
        $this->assertStringContainsString('Bambang Harwanta', $documentXml);
        $this->assertStringContainsString('Kepala Cabang', $documentXml);
        $this->assertStringNotContainsString('Jumelda', $documentXml);
        $this->assertStringNotContainsString('Pj. Kepala Bidang Dukungan Bisnis', $documentXml);
    }

    public function test_spph_print_uses_active_signer_and_title_from_master_data(): void
    {
        SpMasterOption::updateOrCreate(
            ['type' => 'penandatangan_sci', 'nama' => 'Siti Penguji'],
            ['is_active' => true]
        );
        SpMasterOption::updateOrCreate(
            ['type' => 'jabatan_sci', 'nama' => 'Manajer Pengadaan'],
            ['is_active' => true]
        );
        Vendor::create([
            'nama_vendor' => 'Vendor Master Signer',
            'alamat' => 'Jl. Master Data No. 1',
        ]);
        $spph = Spph::create([
            'nomor_spph' => '779/PKU-VII/SPPH/2026',
            'sequence_number' => 779,
            'tanggal' => '2026-07-02',
            'nama_vendor' => 'Vendor Master Signer',
            'deskripsi_pengadaan' => 'Pengadaan penandatangan dari master',
            'pic' => 'Tester',
        ]);

        $request = Request::create('/spph-preview', 'GET', [
            'penandatangan' => 'Siti Penguji',
            'jabatan' => 'Manajer Pengadaan',
        ]);
        $response = (new SpphController())->cetakSpph($request, $spph);
        $docxPath = $response->getFile()->getPathname();

        $zip = new ZipArchive();
        $this->assertTrue($zip->open($docxPath));
        $documentXml = $zip->getFromName('word/document.xml');
        $zip->close();
        @unlink($docxPath);

        $this->assertIsString($documentXml);
        $this->assertStringContainsString('Siti Penguji', $documentXml);
        $this->assertStringContainsString('Manajer Pengadaan', $documentXml);
    }
}
