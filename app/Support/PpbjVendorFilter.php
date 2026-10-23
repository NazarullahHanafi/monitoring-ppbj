<?php

namespace App\Support;

use App\Models\Spph;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

final class PpbjVendorFilter
{
    private const CACHE_KEY = 'ppbj:vendor-filter:v1';

    public static function forget(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    public static function options(): Collection
    {
        return Cache::remember(self::CACHE_KEY, 300, function () {
            // Tabel lama memakai collation berbeda. Samakan hanya hasil UNION,
            // tanpa mengubah kolom maupun indeks yang sudah ada.
            $source = static function (string $table, string $column) {
                $selection = DB::getDriverName() === 'mysql'
                    ? "CONVERT({$column} USING utf8mb4) COLLATE utf8mb4_unicode_ci as name"
                    : "{$column} as name";

                return DB::table($table)->selectRaw($selection);
            };
            $sources = $source('master_penyedia_eksternal', 'nama')
                ->union($source('vendors', 'nama_vendor'))
                ->union($source('sps', 'nama_vendor')->whereNull('deleted_at'))
                ->union($source('spphs', 'nama_vendor')->whereNull('deleted_at'))
                ->union($source('ppbj', 'penyedia_eksternal'));

            $names = DB::query()->fromSub($sources, 'provider_sources')->pluck('name')
                ->flatMap(fn ($name) => explode('; ', (string) $name));

            // Gunakan JSON asli untuk mengambil seluruh calon vendor SPPH.
            $candidates = Spph::query()->whereNotNull('vendor_names')
                ->distinct()->pluck('vendor_names')->flatten();

            return $names->merge($candidates)
                ->map(fn ($name) => trim((string) $name))->filter()
                ->unique(fn ($name) => mb_strtolower($name))
                ->sort(SORT_NATURAL | SORT_FLAG_CASE)->values();
        });
    }

    public static function apply($query, string $vendor): void
    {
        $vendor = trim($vendor);
        // Escape karakter LIKE agar %, _ dan ! dalam nama vendor tetap literal.
        $literal = str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $vendor);
        $query->where(function ($query) use ($vendor, $literal) {
            $query->where('penyedia_eksternal', $vendor)
                ->orWhereRaw("penyedia_eksternal LIKE ? ESCAPE '!'", [$literal.'; %'])
                ->orWhereRaw("penyedia_eksternal LIKE ? ESCAPE '!'", ['%; '.$literal])
                ->orWhereRaw("penyedia_eksternal LIKE ? ESCAPE '!'", ['%; '.$literal.'; %']);
        });
    }
}
