<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class Spph extends Model
{
    protected $fillable = [
        'nomor_spph', 'sequence_number', 'created_by_user_id', 'tanggal',
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
        $nextSeq = self::nextAvailableSequence($year, true);
        $nomor   = sprintf('%03d/PKU-%s/SPPH/%d', $nextSeq, $roman, $year);
        return ['sequence' => $nextSeq, 'nomor' => $nomor];
    }

    public static function previewNextNomor(?string $tanggal = null): string
    {
        [$year, $roman] = self::periodFromDate($tanggal);
        $nextSeq = self::nextAvailableSequence($year);
        return sprintf('%03d/PKU-%s/SPPH/%d', $nextSeq, $roman, $year);
    }

    private static function nextAvailableSequence(int $year, bool $lock = false): int
    {
        $query = self::where('nomor_spph', 'like', "%/SPPH/{$year}")
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

        $romans = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];

        return [(int) $date->year, $romans[((int) $date->month) - 1]];
    }

    public function items()
    {
        return $this->hasMany(\App\Models\SpphItem::class, 'spph_id')->orderBy('urutan');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function ppbjs()
    {
        return $this->belongsToMany(Ppbj::class, 'spph_ppbj')
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
