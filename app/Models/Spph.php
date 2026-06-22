<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Spph extends Model
{
    protected $fillable = [
        'nomor_spph', 'sequence_number', 'tanggal',
        'nomor_pr', 'nama_vendor', 'deskripsi_pengadaan', 'pic',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

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

    public static function previewNextNomor(): string
    {
        $year   = now()->year;
        $romans = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
        $roman  = $romans[now()->month - 1];
        $lastSeq = self::whereYear('created_at', $year)->max('sequence_number') ?? 0;
        $nextSeq = $lastSeq + 1;
        return sprintf('%03d/PKU-%s/SPPH/%d', $nextSeq, $roman, $year);
    }

    public function items()
    {
        return $this->hasMany(\App\Models\SpphItem::class, 'spph_id')->orderBy('urutan');
    }
}
