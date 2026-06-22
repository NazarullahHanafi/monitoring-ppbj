<?php

namespace App\Support;

final class Csv
{
    public static function row(array $values): array
    {
        return array_map([self::class, 'safeValue'], $values);
    }

    private static function safeValue(mixed $value): mixed
    {
        if (!is_string($value)) {
            return $value;
        }

        // Spreadsheet applications may evaluate these prefixes as formulas.
        if (preg_match('/^\s*[=+\-@]/u', $value) === 1) {
            return "'" . $value;
        }

        return $value;
    }
}
