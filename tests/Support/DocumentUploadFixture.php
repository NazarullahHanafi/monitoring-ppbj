<?php

namespace Tests\Support;

use Illuminate\Http\UploadedFile;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xls;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpWord\PhpWord;
use ZipArchive;

final class DocumentUploadFixture
{
    public static function make(string $extension): UploadedFile
    {
        $path = tempnam(sys_get_temp_dir(), 'simonpr-format-');
        if (in_array($extension, ['xlsx', 'xls'], true)) {
            $book = new Spreadsheet;
            $book->getActiveSheet()->setCellValue('A1', 'Nama barang')->setCellValue('A2', 'Plastik industri')->setCellValue('B2', '73001234');
            $book->createSheet()->setTitle('Legalitas')->setCellValue('A1', 'NIB perusahaan');
            $writer = $extension === 'xlsx' ? new Xlsx($book) : new Xls($book);
            $writer->setPreCalculateFormulas(false);
            $writer->save($path);
            $book->disconnectWorksheets();
        } elseif ($extension === 'docx') {
            $word = new PhpWord;
            $word->addSection()->addText('Plastik industri 73001234');
            \PhpOffice\PhpWord\IOFactory::createWriter($word, 'Word2007')->save($path);
        } elseif (in_array($extension, ['odt', 'ods', 'odp', 'pptx'], true)) {
            $zip = new ZipArchive;
            $zip->open($path, ZipArchive::CREATE | ZipArchive::OVERWRITE);
            if ($extension === 'pptx') {
                $zip->addFromString('ppt/presentation.xml', '<p:presentation xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"/>');
                $zip->addFromString('ppt/slides/slide1.xml', '<p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:t>Plastik industri 73001234</a:t></p:sld>');
            } else {
                $zip->addFromString('mimetype', \App\Support\ProcurementUploadFormats::FORMATS[$extension]['mime']);
                $zip->addFromString('content.xml', '<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"><office:body><text:p>Plastik industri 73001234</text:p></office:body></office:document-content>');
            }
            $zip->close();
        } elseif (in_array($extension, ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'], true)) {
            $image = imagecreatetruecolor(40, 40);
            match ($extension) {
                'png' => imagepng($image, $path), 'jpg', 'jpeg' => imagejpeg($image, $path), 'gif' => imagegif($image, $path), 'bmp' => imagebmp($image, $path), 'webp' => imagewebp($image, $path)
            };
            imagedestroy($image);
        } else {
            file_put_contents($path, match ($extension) {
                'pdf' => "%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\n%%EOF", 'txt' => "\xFF\xFE".mb_convert_encoding('Plastik industri 73001234', 'UTF-16LE', 'UTF-8'), 'csv' => "Nama barang,Nomor\nPlastik industri,73001234", 'rtf' => '{\\rtf1\\ansi Plastik industri 73001234}', default => ''
            });
        }

        return new UploadedFile($path, 'fixture.'.$extension, null, null, true);
    }
}
