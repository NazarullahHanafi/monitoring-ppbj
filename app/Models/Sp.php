<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Sp extends Model
{
    protected $fillable = [
        'nomor_sp',
        'sequence_number',
        'numbering_mode',
        'created_by_user_id',
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
        $nextSeq = self::nextAvailableSequence($year, true);
        $nomor = sprintf('%03d/PKU-%s/SP/%d', $nextSeq, $roman, $year);

        return ['sequence' => $nextSeq, 'nomor' => $nomor];
    }

    public static function previewNextNomor(?string $tanggal = null): string
    {
        [$year, $roman] = self::periodFromDate($tanggal);
        $nextSeq = self::nextAvailableSequence($year);

        return sprintf('%03d/PKU-%s/SP/%d', $nextSeq, $roman, $year);
    }

    private static function nextAvailableSequence(int $year, bool $lock = false): int
    {
        $query = self::where('nomor_sp', 'like', "%/SP/{$year}")
            ->where(function ($query) {
                $query->whereNull('numbering_mode')
                    ->orWhere('numbering_mode', 'auto');
            })
            ->orderBy('sequence_number');

        if ($lock) {
            $query->lockForUpdate();
        }

        $usedSequences = $query->pluck('sequence_number')
            ->map(fn($seq) => (int) $seq)
            ->filter(fn($seq) => $seq > 0)
            ->unique()
            ->values();

        return self::nextSequenceFromActiveRun($usedSequences);
    }

    private static function nextSequenceFromActiveRun($usedSequences): int
    {
        $usedSequences = collect($usedSequences)->sort()->unique()->values();

        if ($usedSequences->isEmpty()) {
            return 1;
        }

        $runs = [];
        $start = (int) $usedSequences->first();
        $end = $start;

        foreach ($usedSequences->slice(1) as $seq) {
            $seq = (int) $seq;

            if ($seq === $end + 1) {
                $end = $seq;
                continue;
            }

            $runs[] = ['start' => $start, 'end' => $end, 'length' => $end - $start + 1];
            $start = $end = $seq;
        }

        $runs[] = ['start' => $start, 'end' => $end, 'length' => $end - $start + 1];

        $activeIndex = count($runs) - 1;
        $lastRun = $runs[$activeIndex];

        if ($activeIndex > 0 && $lastRun['length'] <= 25) {
            for ($i = $activeIndex - 1; $i >= 0; $i--) {
                if ($runs[$i]['length'] >= 2 || $i === 0) {
                    $activeIndex = $i;
                    break;
                }
            }
        }

        return $runs[$activeIndex]['end'] + 1;
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

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function ppbjs()
    {
        return $this->belongsToMany(Ppbj::class, 'sp_ppbj')
            ->withPivot('urutan')
            ->withTimestamps()
            ->orderByPivot('urutan');
    }

    public function linkedPpbjNumbers(): array
    {
        $numbers = $this->relationLoaded('ppbjs')
            ? $this->ppbjs->pluck('ppbj_no')
            : $this->ppbjs()->pluck('ppbj.ppbj_no');

        if ($numbers->isEmpty() && filled($this->nomor_pr)) {
            $numbers->push($this->nomor_pr);
        }

        return $numbers->filter()->unique()->values()->all();
    }

    public function linkedPpbjLabel(string $separator = ', '): string
    {
        return implode($separator, $this->linkedPpbjNumbers()) ?: '-';
    }
}
