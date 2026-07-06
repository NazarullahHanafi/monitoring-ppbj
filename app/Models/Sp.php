<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sp extends Model
{
    protected $fillable = [
        'nomor_sp',
        'sequence_number',
        'tanggal_sp',
        'nilai_sp',
        'nomor_pr',
        'nilai_pr',
        'nama_vendor',
        'deskripsi_pengadaan',
        'pic',
        'sph',
        'tgl_sph',
        'promised_date',

        'rfq',
        'nomor_pemenang',
        'tanggal_pemenang',
        'awal_kontrak',
        'akhir_kontrak',
        'bidang_ip_itu',
        'penandatangan_sci',
        'jabatan_sci',
        'jampel_5',
    ];

    protected $casts = [
        'tanggal_sp' => 'date',
        'tgl_sph' => 'date',
        'promised_date' => 'date',
        'tanggal_pemenang' => 'date',
        'awal_kontrak' => 'date',
        'akhir_kontrak' => 'date',

        'nilai_sp' => 'decimal:2',
        'nilai_pr' => 'decimal:2',
        'jampel_5' => 'decimal:2',
    ];

    protected static function booted(): void
    {
        static::saving(function (Sp $sp) {
            $nilaiSp = (float) ($sp->nilai_sp ?? 0);

            if ($nilaiSp > 0) {
                $totalDenganPpn = $nilaiSp + ($nilaiSp * 0.11);
                $sp->jampel_5 = round($totalDenganPpn * 0.05, 2);
            } else {
                $sp->jampel_5 = null;
            }
        });
    }

    public static function generateNomor(int $year, string $roman): array
    {
        $lastSeq = self::whereYear('created_at', $year)
            ->lockForUpdate()
            ->max('sequence_number') ?? 0;

        $nextSeq = $lastSeq + 1;
        $nomor = sprintf('%03d/PKU-%s/SP/%d', $nextSeq, $roman, $year);

        return ['sequence' => $nextSeq, 'nomor' => $nomor];
    }

    public static function previewNextNomor(?string $tanggal = null): string
    {
        [$year, $roman] = self::periodFromDate($tanggal);
        $lastSeq = self::whereYear('created_at', $year)->max('sequence_number') ?? 0;
        $nextSeq = $lastSeq + 1;

        return sprintf('%03d/PKU-%s/SP/%d', $nextSeq, $roman, $year);
    }

    private static function periodFromDate(?string $tanggal): array
    {
        try {
            $date = $tanggal ? \Carbon\Carbon::parse($tanggal) : now();
        } catch (\Throwable) {
            $date = now();
        }

        $romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

        return [(int) $date->year, $romans[((int) $date->month) - 1]];
    }

    public function items()
    {
        return $this->hasMany(SpItem::class)->orderBy('urutan');
    }
}
