<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Spph extends Model
{
    protected $fillable = [
        'nomor_spph', 'sequence_number', 'tanggal',
        'nomor_pr', 'nama_vendor', 'vendor_names', 'deskripsi_pengadaan', 'pic',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'vendor_names' => 'array',
    ];

    public function getPrintVendorNamesAttribute(): array
    {
        return collect(array_merge([$this->nama_vendor], $this->vendor_names ?? []))
            ->map(fn ($vendor) => trim((string) $vendor))
            ->filter()
            ->unique(fn ($vendor) => mb_strtolower($vendor))
            ->values()
            ->all();
    }

    /**
     * Generate next SPPH number atomically inside a transaction.
     * Format: NNN/PKU-{ROMAN}/{YEAR}
     */
    public static function generateNomor(int $year, string $roman): array
    {
        // Must be called inside a DB::transaction with lockForUpdate
        $lastSeq = self::whereYear('created_at', $year)
            ->lockForUpdate()
            ->max('sequence_number') ?? 0;
        $nextSeq = $lastSeq + 1;
        $nomor   = sprintf('%03d/PKU-%s/SPPH/%d', $nextSeq, $roman, $year);
        return ['sequence' => $nextSeq, 'nomor' => $nomor];
    }

    public static function previewNextNomor(?string $tanggal = null): string
    {
        [$year, $roman] = self::periodFromDate($tanggal);
        $lastSeq = self::whereYear('created_at', $year)->max('sequence_number') ?? 0;
        $nextSeq = $lastSeq + 1;
        return sprintf('%03d/PKU-%s/SPPH/%d', $nextSeq, $roman, $year);
    }

    private static function periodFromDate(?string $tanggal): array
    {
        try {
            $date = $tanggal ? \Carbon\Carbon::parse($tanggal) : now();
        } catch (\Throwable) {
            $date = now();
        }

        $romans = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];

        return [(int) $date->year, $romans[((int) $date->month) - 1]];
    }

    public function items()
    {
        return $this->hasMany(\App\Models\SpphItem::class, 'spph_id')->orderBy('urutan');
    }
}
