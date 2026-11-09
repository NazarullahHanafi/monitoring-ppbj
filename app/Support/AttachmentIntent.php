<?php

namespace App\Support;

final class AttachmentIntent
{
    public static function detect(string $text): bool
    {
        $text = html_entity_decode(strip_tags(preg_replace('/<\/?(?:p|div|li|br)\b[^>]*>/iu', ' ', $text) ?? ''), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = mb_strtolower(preg_replace('/\s+/u', ' ', $text) ?? '');
        // An explicit negation must not create a reminder by itself.
        $text = preg_replace('/\b(?:tanpa|bukan|tidak\s+(?:ada|perlu)|tak\s+perlu)\s+(?:berkas\s+)?(?:lampiran|dilampirkan)\b|\blampiran\s+tidak\s+diperlukan\b/u', '', $text) ?? '';

        return (bool) preg_match('/\b(?:ter\s*lampir|di\s*lampirkan|lampirkan|lampiran|(?:lihat|sesuai|mengacu\s+(?:pada|ke))\s+(?:di\s+)?lampiran|(?:rincian|rincian\s+barang|detail|daftar\s+barang|spesifikasi|dokumen)\s+(?:akan\s+)?(?:menyusul|terpisah|dilampirkan)|attached|see\s+attachment|as\s+attached|attachment\s+to\s+follow)\b/u', $text)
            || trim($text, " \t\n\r\0\x0B.,:;()") === 'lampiran';
    }
}
