<?php

namespace App\Support;

use DateInterval;
use DateTimeInterface;
use Illuminate\Support\Facades\Cache;

final class CacheBatch
{
    /**
     * Read several independent values in one cache round-trip and populate
     * only the missing values. Existing cache keys remain unchanged so their
     * current invalidation rules continue to work.
     *
     * @param  array<string, callable(): mixed>  $loaders
     * @return array<string, mixed>
     */
    public static function remember(
        array $loaders,
        DateTimeInterface|DateInterval|int|null $ttl
    ): array {
        if ($loaders === []) {
            return [];
        }

        $values = Cache::many(array_keys($loaders));
        $missing = [];

        foreach ($loaders as $key => $loader) {
            if (($values[$key] ?? null) !== null) {
                continue;
            }

            $values[$key] = $loader();
            $missing[$key] = $values[$key];
        }

        if ($missing !== []) {
            Cache::putMany($missing, $ttl);
        }

        return $values;
    }
}
