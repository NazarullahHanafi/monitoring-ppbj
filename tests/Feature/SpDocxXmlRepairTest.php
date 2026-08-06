<?php

namespace Tests\Feature;

use App\Http\Controllers\SpController;
use DOMDocument;
use ReflectionMethod;
use Tests\TestCase;
use ZipArchive;

class SpDocxXmlRepairTest extends TestCase
{
    public function test_docx_xml_repair_escapes_raw_ampersands_for_microsoft_word(): void
    {
        $path = storage_path('app/test-invalid-word-' . uniqid() . '.docx');

        $zip = new ZipArchive();
        $this->assertTrue($zip->open($path, ZipArchive::CREATE | ZipArchive::OVERWRITE));
        $zip->addFromString(
            '[Content_Types].xml',
            '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"></Types>'
        );
        $zip->addFromString(
            'word/document.xml',
            '<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>Jasa K3 & Safety</w:t></w:r></w:p></w:body></w:document>'
        );
        $zip->close();

        $controller = app(SpController::class);
        $method = new ReflectionMethod($controller, 'repairDocxXmlForMicrosoftWord');
        $method->setAccessible(true);
        $method->invoke($controller, $path);

        $zip = new ZipArchive();
        $this->assertTrue($zip->open($path));
        $xml = $zip->getFromName('word/document.xml');
        $zip->close();

        $dom = new DOMDocument();
        $this->assertTrue(@$dom->loadXML($xml));
        $this->assertStringContainsString('K3 &amp; Safety', $xml);

        @unlink($path);
    }
}
