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

    public static function words(string $text, bool $literal = false): array
    {
        $text = mb_strtolower(Str::ascii($literal ? $text : self::plain($text)));

        return array_values(array_unique(array_filter(preg_split('/[^a-z0-9]+/', $text) ?: [], fn ($word) => $word !== '' && strlen($word) <= 96)));
    }

    public static function snippet(string $text, string $term, bool $literal = false): string
    {
        $text = $literal ? trim(preg_replace('/\s+/u', ' ', $text) ?? '') : self::plain($text);
        $start = 0;
        foreach (self::words($term) as $word) {
            if (($position = mb_stripos($text, $word)) !== false) {
                $start = max(0, $position - 45);
                break;
            }
        }

        return ($start ? '…' : '').mb_substr($text, $start, 220).(mb_strlen($text) > $start + 220 ? '…' : '');
    }

    public static function equivalents(string $word): array
    {
        foreach (config('procurement_search.equivalents', []) as $group) {
            if (in_array($word, $group, true)) {
                // Configuration cannot introduce LIKE wildcards or unbounded query expansion.
                $candidates = array_values(array_unique(array_merge([$word], array_slice(array_filter($group, fn ($value) => is_string($value) && preg_match('/^[a-z]{2,32}$/D', $value)), 0, 3))));

                // Prefix matching already covers plural forms; avoid duplicate index ranges.
                return array_values(array_filter($candidates, function ($candidate) use ($candidates) {
                    foreach ($candidates as $other) {
                        if ($other !== $candidate && str_starts_with($candidate, $other)) {
                            return false;
                        }
                    }

                    return true;
                }));
            }
        }

        return [$word];
    }
}
