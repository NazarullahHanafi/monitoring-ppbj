<?php

namespace App\Support;

use Illuminate\Support\Str;

final class ProcurementSearchText
{
    public static function plain(string $text): string
    {
        $text = preg_replace('/<\/?(?:p|div|li|br|tr|td)\b[^>]*>/iu', ' ', $text) ?? '';

        return trim(preg_replace('/\s+/u', ' ', html_entity_decode(strip_tags($text), ENT_QUOTES | ENT_HTML5, 'UTF-8')) ?? '');
    }

    public static function words(string $text): array
    {
        $text = mb_strtolower(Str::ascii(self::plain($text)));

        return array_values(array_unique(array_filter(preg_split('/[^a-z0-9]+/', $text) ?: [], fn ($word) => $word !== '' && strlen($word) <= 96)));
    }

    public static function snippet(string $text, string $term): string
    {
        $text = self::plain($text);
        $start = 0;
        foreach (self::words($term) as $word) {
            if (($position = mb_stripos($text, $word)) !== false) {
                $start = max(0, $position - 45);
                break;
            }
        }

        return ($start ? '…' : '').mb_substr($text, $start, 220).(mb_strlen($text) > $start + 220 ? '…' : '');
    }
}
