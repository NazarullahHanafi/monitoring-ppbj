<?php

namespace App\Support;

final class PpbjMoneySearch
{
    public const FIELDS = ['pr' => 'total_sebelum_ppn', 'sp' => 'nilai_sp_spk', 'bpg' => 'nilai_bpg'];

    public static function parse(string $input): ?array
    {
        $text = mb_strtolower(trim($input));
        $field = preg_match('/\b(pr|sp|kontrak|bpg)\b/u', $text, $match) ? ($match[1] === 'kontrak' ? 'sp' : $match[1]) : null;
        $text = preg_replace('/\b(nilai|nominal|harga|pr|sp|kontrak|bpg|rupiah|rp)\b\.?/u', '', $text);
        $text = trim(preg_replace('/\s+/u', ' ', $text));
        $amount = '(\d[\d.,]*)\s*(miliar|milyar|milyard|juta|ribu|triliun|jt|rb|k)?';
        if (preg_match('/^(?:antara\s+|dari\s+)?'.$amount.'\s*(?:sampai|hingga|s\/d|sd|–|-)\s*'.$amount.'$/u', $text, $m)) {
            $left = self::amount($m[1], $m[2] ?: ($m[4] ?? ''));
            $right = self::amount($m[3], ($m[4] ?? '') ?: $m[2]);
            if ($left === null || $right === null) {
                return null;
            }

            return ['mode' => 'range', 'min' => min($left, $right), 'max' => max($left, $right), 'field' => $field,
                'label' => 'Rp '.number_format(min($left, $right), 2, ',', '.').' – Rp '.number_format(max($left, $right), 2, ',', '.')];
        }
        if (! preg_match('/^(?:(minimal|setidaknya|maksimal|di atas|di bawah|lebih dari|kurang dari|sekitar|kurang lebih|>=|<=|>|<|=)\s*)?'.$amount.'$/u', $text, $m)) {
            return null;
        }
        $value = self::amount($m[2], $m[3] ?? '');
        if ($value === null) {
            return null;
        }
        $operator = $m[1] ?? '';
        $mode = match ($operator) {
            'minimal', 'setidaknya', '>=' => 'gte', 'maksimal', '<=' => 'lte',
            'di atas', 'lebih dari', '>' => 'gt', 'di bawah', 'kurang dari', '<' => 'lt',
            'sekitar', 'kurang lebih' => 'around', default => 'exact',
        };
        $tolerance = $mode === 'around' ? $value * .05 : .005;
        $label = match ($mode) {
            'gte' => 'Minimal ', 'lte' => 'Maksimal ', 'gt' => 'Di atas ', 'lt' => 'Di bawah ', 'around' => 'Sekitar (±5%) ', default => 'Tepat '
        };

        return ['mode' => $mode, 'value' => $value, 'min' => max(0, $value - $tolerance), 'max' => $value + $tolerance,
            'field' => $field, 'label' => $label.'Rp '.number_format($value, 2, ',', '.')];
    }

    private static function amount(string $raw, string $unit): ?float
    {
        if ($unit !== '' && preg_match('/^\d+(?:[.,]\d+)?$/', $raw)) {
            $number = (float) str_replace(',', '.', $raw);
        } elseif (preg_match('/^\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?$/', $raw) || preg_match('/^\d+(?:,\d{1,2})?$/', $raw)) {
            $number = (float) str_replace(',', '.', str_replace('.', '', $raw));
        } elseif (preg_match('/^\d{1,3}(?:,\d{3})+(?:\.\d{1,2})?$/', $raw)) {
            $number = (float) str_replace(',', '', $raw);
        } elseif (preg_match('/^\d+\.\d{1,2}$/', $raw)) {
            $number = (float) $raw;
        } else {
            return null;
        }
        $multiplier = match ($unit) {
            'triliun' => 1e12, 'miliar', 'milyar', 'milyard' => 1e9, 'juta', 'jt' => 1e6, 'ribu', 'rb', 'k' => 1e3, default => 1
        };
        $value = round($number * $multiplier, 2);

        return is_finite($value) && $value < 1e16 ? $value : null;
    }

    public static function apply($query, array $criteria, array $fields): void
    {
        $query->where(function ($q) use ($criteria, $fields) {
            foreach ($fields as $field) {
                $q->orWhere(function ($part) use ($criteria, $field) {
                    $column = self::FIELDS[$field];
                    $operator = match ($criteria['mode']) {
                        'gte' => '>=', 'lte' => '<=', 'gt' => '>', 'lt' => '<', default => null
                    };
                    if ($operator) {
                        $part->where($column, $operator, $criteria['value']);
                    } else {
                        $part->whereBetween($column, [$criteria['min'], $criteria['max']]);
                    }
                });
            }
        });
    }
}
