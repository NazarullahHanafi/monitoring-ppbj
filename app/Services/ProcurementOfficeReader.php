<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;
use XMLReader;
use ZipArchive;

class ProcurementOfficeReader
{
    public function read(string $path, string $extension): array
    {
        $slot = null;
        foreach ([0, 1] as $number) {
            $candidate = Cache::lock('procurement-office-reader:'.$number, 90);
            if ($candidate->get()) {
                $slot = $candidate;
                break;
            }
        }
        if (! $slot) {
            $this->invalid('Pembaca dokumen sedang digunakan. Tunggu sebentar lalu coba lagi; berkas tetap dapat disimpan tanpa teks.');
        }
        try {
            return $this->readContents($path, $extension);
        } finally {
            $slot->release();
        }
    }

    private function readContents(string $path, string $extension): array
    {
        if (in_array($extension, ['txt', 'csv'], true)) {
            $text = file_get_contents($path);
            if (str_starts_with($text, "\xFF\xFE") || str_starts_with($text, "\xFE\xFF")) {
                $text = mb_convert_encoding(substr($text, 2), 'UTF-8', str_starts_with($text, "\xFF\xFE") ? 'UTF-16LE' : 'UTF-16BE');
            } elseif (! mb_check_encoding($text, 'UTF-8')) {
                $text = mb_convert_encoding($text, 'UTF-8', 'Windows-1252');
            }
            $this->limit($text);

            return ['text' => trim(str_starts_with($text, "\xEF\xBB\xBF") ? substr($text, 3) : $text), 'method' => 'text-structure'];
        }
        if (! in_array($extension, ['docx', 'xlsx', 'pptx', 'odt', 'ods', 'odp'], true)) {
            return ['text' => '', 'method' => 'manual'];
        }
        $zip = new ZipArchive;
        if ($zip->open($path) !== true) {
            $this->invalid();
        }
        $priorXmlErrors = libxml_use_internal_errors(true);
        libxml_clear_errors();
        try {
            $parts = [];
            if ($extension === 'docx') {
                $stat = $zip->statName('word/document.xml');
                if (! $stat || $stat['size'] > 2 * 1024 * 1024) {
                    $this->invalid('Struktur Word terlalu besar untuk pembacaan langsung. Pisahkan dokumen atau lengkapi teks secara manual.');
                }

                $parts = [app(DetailDocxReader::class)->read($path)];
                foreach ($this->names($zip, '~^word/(header[0-9]+|footer[0-9]+|footnotes|endnotes)\.xml$~') as $name) {
                    $reader = $this->xml($zip, $name);
                    $lines = [];
                    try {
                        while ($reader->read()) {
                            if ($reader->nodeType === XMLReader::ELEMENT && $reader->localName === 't') {
                                $lines[] = $reader->readString();
                            }
                        }
                    } finally {
                        $reader->close();
                    }
                    $parts[] = implode(' ', $lines);
                    $this->limit(implode("\n", $parts));
                }

                return ['text' => trim(implode("\n", $parts)), 'method' => 'docx-structure'];
            }
            if ($extension === 'xlsx') {
                $shared = [];
                if ($zip->locateName('xl/sharedStrings.xml') !== false) {
                    $reader = $this->xml($zip, 'xl/sharedStrings.xml');
                    $length = 0;
                    try {
                        while ($reader->read()) {
                            if ($reader->nodeType === XMLReader::ELEMENT && $reader->localName === 'si') {
                                $value = $reader->readString();
                                $shared[] = $value;
                                $length += mb_strlen($value);
                                if ($length > 200000 || count($shared) > 50000) {
                                    $this->invalid('Daftar teks Excel terlalu besar untuk pembacaan langsung. Pisahkan dokumen atau lengkapi teks secara manual.');
                                }
                            }
                        }
                    } finally {
                        $reader->close();
                    }
                }
                $sheets = $this->names($zip, '~^xl/worksheets/sheet[0-9]+\.xml$~');
                $labels = [];
                if ($zip->locateName('xl/_rels/workbook.xml.rels') !== false) {
                    $links = [];
                    $reader = $this->xml($zip, 'xl/_rels/workbook.xml.rels');
                    try {
                        while ($reader->read()) {
                            if ($reader->nodeType === XMLReader::ELEMENT && $reader->localName === 'Relationship' && $reader->getAttribute('TargetMode') !== 'External') {
                                $target = $reader->getAttribute('Target') ?? '';
                                $target = str_starts_with($target, '/') ? ltrim($target, '/') : 'xl/'.$target;
                                if (preg_match('~^xl/worksheets/sheet[0-9]+\.xml$~D', $target)) {
                                    $links[$reader->getAttribute('Id')] = $target;
                                }
                            }
                        }
                    } finally {
                        $reader->close();
                    }
                    $reader = $this->xml($zip, 'xl/workbook.xml');
                    try {
                        while ($reader->read()) {
                            if ($reader->nodeType === XMLReader::ELEMENT && $reader->localName === 'sheet') {
                                $id = $reader->getAttributeNs('id', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships');
                                if (isset($links[$id])) {
                                    $labels[$links[$id]] = $reader->getAttribute('name') ?? '';
                                }
                            }
                        }
                    } finally {
                        $reader->close();
                    }
                }
                $cells = 0;
                foreach ($sheets as $index => $name) {
                    $lines = ['[Lembar '.($labels[$name] ?? ($index + 1)).']'];
                    $reader = $this->xml($zip, $name);
                    $values = [];
                    $value = '';
                    $type = '';
                    $inCell = false;
                    $length = 0;
                    try {
                        while ($reader->read()) {
                            if ($reader->nodeType === XMLReader::ELEMENT && $reader->localName === 'c') {
                                if (++$cells > 50000) {
                                    $this->invalid('Terlalu banyak sel untuk satu pembacaan. Pisahkan Excel atau lengkapi teks secara manual.');
                                }
                                $type = $reader->getAttribute('t');
                                $value = '';
                                $inCell = ! $reader->isEmptyElement;
                                if (! $inCell) {
                                    $values[] = '';
                                }
                            } elseif ($reader->nodeType === XMLReader::ELEMENT && $inCell && ($reader->localName === 'v' || ($type === 'inlineStr' && $reader->localName === 't'))) {
                                $value .= $reader->readString();
                            } elseif ($reader->nodeType === XMLReader::END_ELEMENT && $reader->localName === 'c') {
                                // Read cached formula values; never calculate formulas or follow links.
                                $values[] = $type === 's' ? (ctype_digit($value) ? ($shared[(int) $value] ?? '') : '') : $value;
                                $inCell = false;
                            } elseif ($reader->nodeType === XMLReader::END_ELEMENT && $reader->localName === 'row') {
                                $line = implode("\t", $values);
                                $lines[] = $line;
                                $values = [];
                                $length += mb_strlen($line) + 1;
                                if ($length > 200000) {
                                    $this->invalid('Teks Excel terlalu panjang. Pisahkan dokumen atau lengkapi teks secara manual.');
                                }
                            }
                        }
                    } finally {
                        $reader->close();
                    }
                    $parts[] = implode("\n", $lines);
                    $this->limit(implode("\n", $parts));
                }
            } elseif ($extension === 'pptx') {
                foreach ($this->names($zip, '~^ppt/slides/slide[0-9]+\.xml$~') as $index => $name) {
                    $lines = ['[Slide '.($index + 1).']'];
                    $reader = $this->xml($zip, $name);
                    try {
                        while ($reader->read()) {
                            if ($reader->nodeType === XMLReader::ELEMENT && $reader->localName === 't') {
                                $lines[] = $reader->readString();
                            }
                        }
                    } finally {
                        $reader->close();
                    }
                    $parts[] = implode("\n", $lines);
                    $this->limit(implode("\n", $parts));
                }
            } else {
                $reader = $this->xml($zip, 'content.xml');
                $length = 0;
                try {
                    while ($reader->read()) {
                        if ($reader->nodeType === XMLReader::ELEMENT && in_array($reader->localName, ['p', 'h'], true)) {
                            $value = $reader->readString();
                            $parts[] = $value;
                            $length += mb_strlen($value) + 1;
                            if ($length > 200000) {
                                $this->invalid('Teks terlalu panjang. Pisahkan dokumen atau lengkapi teks secara manual.');
                            }
                        }
                    }
                } finally {
                    $reader->close();
                }
            }
            $text = trim(implode("\n", $parts));
            $this->limit($text);

            return ['text' => $text, 'method' => 'office-structure'];
        } finally {
            $zip->close();
            $xmlErrors = libxml_get_errors();
            libxml_clear_errors();
            libxml_use_internal_errors($priorXmlErrors);
            if ($xmlErrors !== []) {
                $this->invalid();
            }
        }
    }

    private function xml(ZipArchive $zip, string $name): XMLReader
    {
        $stat = $zip->statName($name);
        if (! $stat || $stat['size'] > 8 * 1024 * 1024) {
            $this->invalid('Bagian dokumen terlalu besar untuk pembacaan langsung. Pisahkan berkas atau lengkapi teks secara manual.');
        }
        $xml = $zip->getFromName($name);
        if (! is_string($xml) || preg_match('/<!DOCTYPE|<!ENTITY/i', str_replace("\0", '', $xml))) {
            $this->invalid();
        }
        $reader = new XMLReader;
        if (! @$reader->XML($xml, null, LIBXML_NONET)) {
            $this->invalid();
        }
        $reader->setParserProperty(XMLReader::LOADDTD, false);
        $reader->setParserProperty(XMLReader::SUBST_ENTITIES, false);
        $reader->setParserProperty(XMLReader::VALIDATE, false);

        return $reader;
    }

    private function names(ZipArchive $zip, string $pattern): array
    {
        $names = [];
        for ($i = 0; $i < $zip->numFiles; $i++) {
            if (preg_match($pattern, $zip->getNameIndex($i))) {
                $names[] = $zip->getNameIndex($i);
            }
        }
        natsort($names);
        if (count($names) > 100) {
            $this->invalid('Maksimal 100 lembar atau slide per pembacaan. Pisahkan dokumen menjadi beberapa lampiran.');
        }

        return array_values($names);
    }

    private function limit(string $text): void
    {
        if (mb_strlen($text) > 200000) {
            $this->invalid('Teks melebihi 200.000 karakter. Pisahkan berkas atau pilih teks penting secara manual.');
        }
    }

    private function invalid(string $message = 'Isi dokumen belum dapat dibaca. Gunakan salinan tanpa enkripsi atau lengkapi teks pencarian secara manual.'): never
    {
        throw ValidationException::withMessages(['file' => $message]);
    }
}
