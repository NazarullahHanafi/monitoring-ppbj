<?php

namespace App\Services;

use DOMDocument;
use DOMXPath;
use Illuminate\Validation\ValidationException;
use ZipArchive;

class DetailDocxReader
{
    public function read(string $path): string
    {
        $zip = new ZipArchive;
        if ($zip->open($path) !== true) {
            $this->invalid();
        }
        try {
            $stat = $zip->statName('word/document.xml');
            if (! $stat || $stat['size'] > 16 * 1024 * 1024) {
                $this->invalid();
            }
            $xml = $zip->getFromName('word/document.xml');
            if (! is_string($xml) || stripos($xml, '<!DOCTYPE') !== false || stripos($xml, '<!ENTITY') !== false) {
                $this->invalid();
            }
            $dom = new DOMDocument;
            if (! @$dom->loadXML($xml, LIBXML_NONET)) {
                $this->invalid();
            }
            $xpath = new DOMXPath($dom);
            $xpath->registerNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main');
            $body = $xpath->query('//w:body')->item(0);
            if (! $body) {
                $this->invalid();
            }
            $lines = [];
            foreach ($body->childNodes as $node) {
                if ($node->localName === 'tbl') {
                    foreach ($xpath->query('./w:tr', $node) as $row) {
                        $cells = [];
                        foreach ($xpath->query('./w:tc', $row) as $cell) {
                            $cells[] = $this->text($xpath, $cell);
                        }
                        $lines[] = implode("\t", $cells);
                    }
                } else {
                    $lines[] = $this->text($xpath, $node);
                }
            }
            $text = trim(implode("\n", $lines));
            if (mb_strlen($text) > 200000) {
                throw ValidationException::withMessages(['document_file' => 'Isi dokumen terlalu panjang. Pisahkan lampiran menjadi berkas yang lebih kecil.']);
            }

            return $text;
        } finally {
            $zip->close();
        }
    }

    private function text(DOMXPath $xpath, \DOMNode $node): string
    {
        $paragraphs = [];
        foreach ($xpath->query('.//w:p', $node) as $paragraph) {
            $text = '';
            foreach ($xpath->query('.//w:t|.//w:tab|.//w:br', $paragraph) as $part) {
                $text .= $part->localName === 't' ? $part->textContent : ' ';
            }
            $paragraphs[] = trim($text);
        }
        // A top-level paragraph isn't a descendant of itself.
        if ($node->localName === 'p') {
            $text = '';
            foreach ($xpath->query('.//w:t|.//w:tab|.//w:br', $node) as $part) {
                $text .= $part->localName === 't' ? $part->textContent : ' ';
            }

            return trim($text);
        }

        return implode(' / ', array_filter($paragraphs));
    }

    private function invalid(): never
    {
        throw ValidationException::withMessages(['document_file' => 'Word tidak dapat dibaca. Gunakan berkas .docx yang valid, bukan .doc atau berkas yang dikunci.']);
    }
}
