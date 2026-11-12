<?php

namespace App\Services;

use App\Support\ProcurementUploadFormats;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\ValidationException;
use ZipArchive;

class ProcurementUploadInspector
{
    public function inspect(UploadedFile $file, string $field = 'file'): array
    {
        $extension = strtolower($file->getClientOriginalExtension());
        $format = ProcurementUploadFormats::FORMATS[$extension] ?? null;
        if (! $format || $file->getSize() < 1 || $file->getSize() > 10485760) {
            $this->invalid($field, 'Pilih format dokumen yang didukung, dengan ukuran 1 byte hingga 10 MB.');
        }
        $path = $file->getRealPath();
        $mime = (new \finfo(FILEINFO_MIME_TYPE))->file($path);
        $handle = fopen($path, 'rb');
        try {
            $head = fread($handle, 1024);
        } finally {
            fclose($handle);
        }
        $valid = false;
        if ($extension === 'pdf') {
            $valid = $mime === 'application/pdf' && str_contains($head, '%PDF-');
        } elseif (in_array($extension, ['docx', 'xlsx', 'pptx', 'odt', 'ods', 'odp'], true)) {
            $this->inspectPackage($path, $extension, $field);
            $valid = true;
        } elseif (in_array($extension, ['doc', 'xls', 'ppt'], true)) {
            $bytes = file_get_contents($path);
            $marker = ['doc' => 'WordDocument', 'xls' => 'Workbook', 'ppt' => 'PowerPoint Document'][$extension];
            $valid = str_starts_with($head, hex2bin('d0cf11e0a1b11ae1')) && str_contains($bytes, mb_convert_encoding($marker, 'UTF-16LE', 'UTF-8'));
            foreach (['_VBA_PROJECT', 'VBA', 'Macros'] as $macro) {
                if (str_contains($bytes, mb_convert_encoding($macro."\0", 'UTF-16LE', 'UTF-8'))) {
                    $this->invalid($field, 'Dokumen mengandung makro. Simpan salinan tanpa makro sebelum mengunggah.');
                }
            }
        } elseif ($extension === 'rtf') {
            $valid = str_starts_with(ltrim($head), '{\\rtf');
            if (preg_match('/\\\\(?:object|objdata|objupdate)\b/i', file_get_contents($path))) {
                $this->invalid($field, 'RTF mengandung objek aktif. Simpan sebagai DOCX atau PDF sebelum mengunggah.');
            }
        } elseif (in_array($extension, ['txt', 'csv'], true)) {
            $bytes = file_get_contents($path);
            $valid = in_array($mime, ['text/plain', 'text/csv', 'text/x-csv', 'application/csv', 'application/octet-stream'], true)
                && ! preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', str_replace(["\xFF\xFE", "\xFE\xFF"], '', $bytes));
            if (str_starts_with($bytes, "\xFF\xFE") || str_starts_with($bytes, "\xFE\xFF")) {
                $valid = mb_check_encoding(substr($bytes, 2), str_starts_with($bytes, "\xFF\xFE") ? 'UTF-16LE' : 'UTF-16BE');
            }
        } elseif ($format['reader'] === 'image' || in_array($extension, ['tif', 'tiff'], true)) {
            $aliases = ['image/x-ms-bmp' => 'image/bmp', 'image/x-bmp' => 'image/bmp', 'image/x-tiff' => 'image/tiff'];
            $valid = ($aliases[$mime] ?? $mime) === $format['mime'];
        }
        if (! $valid) {
            $this->invalid($field, 'Isi berkas tidak cocok dengan formatnya. Gunakan berkas asli; mengganti nama ekstensi saja tidak cukup.');
        }

        return $format + ['extension' => $extension];
    }

    public function inspectPackage(string $path, string $extension, string $field): void
    {
        $zip = new ZipArchive;
        if ($zip->open($path) !== true) {
            $this->invalid($field, 'Dokumen Office tidak valid atau terkunci.');
        }
        try {
            $total = 0;
            if ($zip->numFiles > 2000) {
                $this->invalid($field, 'Dokumen memiliki terlalu banyak bagian. Pisahkan menjadi berkas lebih kecil.');
            }
            for ($i = 0; $i < $zip->numFiles; $i++) {
                $stat = $zip->statIndex($i);
                $name = $stat['name'];
                $total += $stat['size'];
                if ($total > 40 * 1024 * 1024 || $stat['size'] > 20 * 1024 * 1024 || $stat['size'] > max(1, $stat['comp_size']) * 1000
                    || ! empty($stat['encryption_method']) || str_contains($name, '\\') || preg_match('~(^/|(^|/)\.\.(/|$)|^[A-Za-z]:)~', $name)) {
                    $this->invalid($field, 'Struktur dokumen melewati batas aman. Gunakan salinan tanpa enkripsi atau pisahkan dokumen.');
                }
                if (preg_match('~(vbaProject|activeX|(^|/)(Basic|Scripts)/|embeddings/.*\.(exe|js|vbs|ps1))~i', $name)) {
                    $this->invalid($field, 'Dokumen mengandung makro atau objek aktif. Gunakan salinan tanpa makro.');
                }
            }
            if ($zip->locateName('[Content_Types].xml') !== false) {
                $typesStat = $zip->statName('[Content_Types].xml');
                if ($typesStat['size'] > 1048576 || preg_match('/vbaProject|macroEnabled|activeX|<!DOCTYPE|<!ENTITY/i', str_replace("\0", '', $zip->getFromName('[Content_Types].xml')))) {
                    $this->invalid($field, 'Dokumen mengandung tipe aktif atau struktur yang tidak didukung. Gunakan salinan tanpa makro.');
                }
            }
            $required = ['docx' => 'word/document.xml', 'xlsx' => 'xl/workbook.xml', 'pptx' => 'ppt/presentation.xml', 'odt' => 'content.xml', 'ods' => 'content.xml', 'odp' => 'content.xml'][$extension];
            if ($zip->locateName($required) === false) {
                $this->invalid($field, 'Struktur berkas tidak sesuai dengan jenis dokumen yang dipilih.');
            }
            $xml = $zip->getFromName($required);
            if (! is_string($xml) || preg_match('/<!DOCTYPE|<!ENTITY|<(?:[\w.-]+:)?(?:scripts|event-listeners|event-listener)\b/i', str_replace("\0", '', $xml))) {
                $this->invalid($field, 'Dokumen mengandung deklarasi XML yang tidak didukung. Gunakan salinan Office atau PDF yang valid.');
            }
            if (strlen($xml) <= 2 * 1024 * 1024) {
                $dom = new \DOMDocument;
                if (! @$dom->loadXML($xml, LIBXML_NONET)) {
                    $this->invalid($field, 'Struktur XML dokumen tidak valid. Simpan ulang berkas sebelum mengunggah.');
                }
            }
            if (in_array($extension, ['odt', 'ods', 'odp'], true) && trim((string) $zip->getFromName('mimetype')) !== ProcurementUploadFormats::FORMATS[$extension]['mime']) {
                $this->invalid($field, 'Jenis dokumen OpenDocument tidak sesuai.');
            }
        } finally {
            $zip->close();
        }
    }

    private function invalid(string $field, string $message): never
    {
        throw ValidationException::withMessages([$field => $message]);
    }
}
