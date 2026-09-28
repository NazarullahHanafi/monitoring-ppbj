<?php

namespace Tests\Feature;

use App\Http\Controllers\SpController;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\PhpWord;
use ReflectionClass;
use Tests\TestCase;
use ZipArchive;

class SpKopSuratPrintSafeTest extends TestCase
{
    public function test_sp_kop_surat_uses_print_safe_watermark_dimensions(): void
    {
        $docxPath = storage_path('framework/testing/sp-kop-print-safe.docx');

        if (! is_dir(dirname($docxPath))) {
            mkdir(dirname($docxPath), 0777, true);
        }

        $phpWord = new PhpWord();
        $section = $phpWord->addSection([
            'pageSizeW' => 11906,
            'pageSizeH' => 16838,
            'marginTop' => 2500,
            'marginBottom' => 1800,
            'marginLeft' => 1418,
            'marginRight' => 1134,
            'headerHeight' => 720,
        ]);
        $section->addText('Probe Surat Pesanan');
        IOFactory::createWriter($phpWord, 'Word2007')->save($docxPath);

        $controller = new SpController();
        $method = (new ReflectionClass($controller))->getMethod('injectHeaderWatermark');
        $method->setAccessible(true);
        $method->invoke(
            $controller,
            $docxPath,
            public_path('images/kop-surat-sp.jpg'),
            public_path('images/kop-surat-sp2.jpg'),
            null
        );

        $zip = new ZipArchive();
        $this->assertTrue($zip->open($docxPath));

        $documentXml = $zip->getFromName('word/document.xml');
        $header1 = $zip->getFromName('word/header1.xml');
        $header2 = $zip->getFromName('word/header2.xml');
        $zip->close();

        @unlink($docxPath);

        $this->assertIsString($header1);
        $this->assertIsString($documentXml);
        $this->assertStringContainsString('w:bottom="2400"', $documentXml);
        $this->assertStringContainsString('margin-left:-79pt', $header1);
        $this->assertStringContainsString('margin-top:-110pt', $header1);
        $this->assertStringContainsString('width:611.5pt', $header1);
        $this->assertStringContainsString('height:885.6pt', $header1);

        $this->assertIsString($header2);
        $this->assertStringContainsString('margin-left:0pt', $header2);
        $this->assertStringContainsString('margin-top:0pt', $header2);
        $this->assertStringContainsString('width:595.3pt', $header2);
        $this->assertStringContainsString('height:842.1pt', $header2);

        foreach ([$header1, $header2] as $headerXml) {
            $this->assertStringNotContainsString('width:567.3pt', $headerXml);
            $this->assertStringNotContainsString('height:802.2pt', $headerXml);
        }
    }

    public function test_contract_kop_surat_uses_same_first_page_position_as_regular_sp(): void
    {
        $docxPath = storage_path('framework/testing/sp-contract-kop-position.docx');

        if (! is_dir(dirname($docxPath))) {
            mkdir(dirname($docxPath), 0777, true);
        }

        $phpWord = new PhpWord();
        $section = $phpWord->addSection([
            'pageSizeW' => 11906,
            'pageSizeH' => 16838,
            'marginTop' => 1750,
            'marginBottom' => 1304,
            'marginLeft' => 1418,
            'marginRight' => 1418,
            'headerHeight' => 737,
            'footerHeight' => 709,
        ]);
        $section->addText('Probe Kontrak SP di atas Rp50 juta');
        IOFactory::createWriter($phpWord, 'Word2007')->save($docxPath);

        $controller = new SpController();
        $method = (new ReflectionClass($controller))->getMethod('injectHeaderWatermark');
        $method->setAccessible(true);
        $method->invoke(
            $controller,
            $docxPath,
            public_path('images/kop-surat-sp.jpg'),
            public_path('images/kop-surat-sp2.jpg'),
            '001/PKU-VII/SP/2026'
        );

        $zip = new ZipArchive();
        $this->assertTrue($zip->open($docxPath));

        $header1 = $zip->getFromName('word/header1.xml');
        $zip->close();

        @unlink($docxPath);

        $this->assertIsString($header1);
        $this->assertStringContainsString('margin-left:-79pt', $header1);
        $this->assertStringContainsString('margin-top:-110pt', $header1);
        $this->assertStringContainsString('width:611.5pt', $header1);
        $this->assertStringContainsString('height:885.6pt', $header1);
        $this->assertStringNotContainsString('margin-top:-91.5pt', $header1);
    }
}
