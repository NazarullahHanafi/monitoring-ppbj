<?php

namespace Tests\Feature;

use App\Http\Controllers\SpphController;
use App\Models\Spph;
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

        foreach ([$header1, $header2] as $headerXml) {
            $this->assertIsString($headerXml);
            $this->assertStringContainsString('margin-left:0', $headerXml);
            $this->assertStringContainsString('margin-top:0pt', $headerXml);
            $this->assertStringContainsString('width:595.3pt', $headerXml);
            $this->assertStringContainsString('height:841.9pt', $headerXml);
        }
    }
}
