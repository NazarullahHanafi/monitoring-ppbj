<?php

namespace App\Support;

/**
 * Ukuran baku dokumen Word yang memakai kop surat perusahaan.
 *
 * Nilai menggunakan twip (1/20 point) agar Microsoft Word, WPS,
 * preview, dan jalur fallback berangkat dari konfigurasi yang sama.
 */
final class LetterheadLayout
{
    public const BODY_TOP_TWIPS = 2250;

    public const SP_HEADER_DISTANCE_TWIPS = 737;

    public const SPPH_HEADER_DISTANCE_TWIPS = 1700;

    public const SP_FIRST_PAGE_SHAPE_TOP_PT = '-110pt';

    private function __construct()
    {
    }
}
