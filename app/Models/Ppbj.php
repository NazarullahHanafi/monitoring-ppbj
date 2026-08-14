<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Ppbj extends Model
{
    protected $table = 'ppbj';

    protected static function booted()
    {
        static::creating(function ($ppbj) {
            $ppbj->applySlaCalculation();
        });

        static::updating(function ($ppbj) {
            $ppbj->applySlaCalculation();
        });

        static::deleting(function (Ppbj $ppbj) {
            $ppbj->spphs()->detach();
            $ppbj->sps()->detach();
        });
    }

    protected $fillable = [
        'ppbj_no',
        'tgl_ppbj',
        'tgl_terima_pr',
        'uraian',
        'note',
        'portofolio',
        'buyer',
        'created_by_user_id',
        'general_registration_number',
        'general_registered_at',
        'general_registered_by_user_id',
        'total_sebelum_ppn',

        'target_sla_hari',
        'sisa_target_sla',
        'realisasi_sla',

        'metode_pengadaan',

        'spph_rfq_1',
        'rfq_2',
        'rfq_3',
        'tgl_spph',
        'closed_date',
        'qt_left',

        'sph',
        'tgl_sph',

        'awarding_sp',
        'tgl_awarding_sp',

        'pemenang',
        'tgl_pemenang',

        'penyedia_eksternal',

        'tgl_spk',
        'nilai_sp_spk',

        'persentase_realisasi',
        'promised_date',
        'goods_arrived_at',
        'goods_arrived_by_user_id',
        'goods_arrived_note',
        'goods_confirmed_at',
        'goods_confirmed_by_user_id',
        'goods_confirmed_note',
        'time_left',

        'do_no',
        'bpg_no',
        'nilai_bpg',
        'tgl_bpg',

        'receiving_transaction',

        'bpb_no',
        'tgl_bpb',

        'no_invoice',
        'tgl_invoice',

        'progres',
        'keterangan',
        'tgl_diserahkan',
        'status',
        'status_sla',
        'cancel_reason',
        'cancelled_at',
        'cancelled_by_user_id',
        'cancel_verified_by_user_id',
    ];

    protected $casts = [
        'general_registered_at' => 'datetime',
        'promised_date' => 'date',
        'goods_arrived_at' => 'datetime',
        'goods_confirmed_at' => 'datetime',
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function generalRegisteredBy()
    {
        return $this->belongsTo(User::class, 'general_registered_by_user_id');
    }

    public function cancelledBy()
    {
        return $this->belongsTo(User::class, 'cancelled_by_user_id');
    }

    public function cancelVerifiedBy()
    {
        return $this->belongsTo(User::class, 'cancel_verified_by_user_id');
    }

    public function goodsArrivedBy()
    {
        return $this->belongsTo(User::class, 'goods_arrived_by_user_id');
    }

    public function goodsConfirmedBy()
    {
        return $this->belongsTo(User::class, 'goods_confirmed_by_user_id');
    }

    public function realTrackings()
    {
        return $this->hasMany(PpbjRealTracking::class, 'ppbj_id');
    }

    public function spphs()
    {
        return $this->belongsToMany(Spph::class, 'spph_ppbj')
            ->withPivot('urutan')
            ->withTimestamps();
    }

    public function sps()
    {
        return $this->belongsToMany(Sp::class, 'sp_ppbj')
            ->withPivot('urutan')
            ->withTimestamps();
    }

    public function getIsCancelledAttribute(): bool
    {
        return ($this->status ?? 'ACTIVE') === 'CANCELLED';
    }

    public static function hitungStatusSla($sisaTarget, $progres = 0, $noInvoice = null)
    {
        if ((int) $progres === 100 && !empty($noInvoice)) {
            return 'LENGKAP';
        }

        if ($sisaTarget <= 0) {
            return 'OVERDUE';
        }

        if ($sisaTarget <= 2) {
            return 'WARNING';
        }

        return 'ON TRACK';
    }

    public function getStatusSlaAttribute()
    {
        if (($this->status ?? 'ACTIVE') === 'CANCELLED') {
            return 'CANCELLED';
        }

        if ((int) ($this->progres ?? 0) === 100 && !empty($this->no_invoice)) {
            return 'LENGKAP';
        }

        $remaining = $this->slaCurrentRemainingDays();

        if ($remaining !== null && $remaining <= 0) {
            return 'OVERDUE';
        }

        if ($remaining !== null && $remaining <= 2) {
            return 'WARNING';
        }

        return 'ON TRACK';
    }

    public function isSlaComplete(): bool
    {
        return ! $this->is_cancelled
            && (int) ($this->progres ?? 0) === 100
            && ! empty($this->no_invoice);
    }

    public function slaStartDate(): ?Carbon
    {
        $date = $this->tgl_diserahkan ?: $this->tgl_terima_pr ?: $this->tgl_ppbj;

        return $this->parseSlaDate($date);
    }

    public function slaStartSourceLabel(): string
    {
        if ($this->tgl_diserahkan) {
            return 'Tanggal diserahkan ke Umum';
        }

        if ($this->tgl_terima_pr) {
            return 'Tanggal terima PR';
        }

        if ($this->tgl_ppbj) {
            return 'Tanggal PPBJ / PR';
        }

        return 'Tanggal awal belum tersedia';
    }

    public function slaFinishDate(): ?Carbon
    {
        $date = $this->tgl_invoice
            ?: $this->tgl_bpb
            ?: $this->tgl_bpg
            ?: $this->updated_at
            ?: null;

        return $this->parseSlaDate($date);
    }

    public function slaFinishSourceLabel(): string
    {
        if ($this->tgl_invoice) {
            return 'Tanggal invoice';
        }

        if ($this->tgl_bpb) {
            return 'Tanggal BPB';
        }

        if ($this->tgl_bpg) {
            return 'Tanggal BPG';
        }

        if ($this->updated_at) {
            return 'Tanggal update terakhir';
        }

        return 'Tanggal selesai belum tersedia';
    }

    public function slaUsedDays(): ?int
    {
        $start = $this->slaStartDate();
        $finish = $this->slaFinishDate();

        if (! $start || ! $finish) {
            return null;
        }

        return max(0, (int) $start->diffInDays($finish));
    }

    public function slaFinalRemainingDays(): ?int
    {
        $usedDays = $this->slaUsedDays();

        if ($usedDays === null) {
            return null;
        }

        return (int) ($this->target_sla_hari ?? 0) - $usedDays;
    }

    public function slaCurrentRemainingDays(): ?int
    {
        if ($this->isSlaComplete()) {
            return $this->slaFinalRemainingDays();
        }

        $runningDays = $this->slaRunningDays();
        $target = (int) ($this->target_sla_hari ?? 0);

        if ($runningDays === null || $target <= 0) {
            return null;
        }

        return $target - $runningDays;
    }

    public function slaFinalLabel(): string
    {
        if ($this->is_cancelled) {
            return 'Dibatalkan';
        }

        if (! $this->isSlaComplete()) {
            $remaining = $this->slaCurrentRemainingDays();

            return ($remaining ?? (int) ($this->sisa_target_sla ?? 0)) . ' hari';
        }

        return 'Selesai';
    }

    public function slaRunningDays(): ?int
    {
        $start = $this->slaStartDate();

        if (! $start) {
            return null;
        }

        return max(0, (int) $start->copy()->startOfDay()->diffInDays(now()->startOfDay()));
    }

    public function slaTargetDate(): ?Carbon
    {
        $start = $this->slaStartDate();
        $target = (int) ($this->target_sla_hari ?? 0);

        if (! $start || $target <= 0) {
            return null;
        }

        return $start->copy()->addDays($target);
    }

    public function slaTargetDateLabel(): ?string
    {
        $targetDate = $this->slaTargetDate();

        return $targetDate ? $targetDate->translatedFormat('d F Y') : null;
    }

    public function slaOutcomeLabel(): ?string
    {
        if (! $this->isSlaComplete()) {
            return null;
        }

        $remaining = $this->slaFinalRemainingDays();

        if ($remaining === null) {
            return 'SLA berhenti';
        }

        if ($remaining < 0) {
            return 'Terlambat ' . abs($remaining) . ' hari';
        }

        if ($remaining > 0) {
            return 'Lebih cepat ' . $remaining . ' hari';
        }

        return 'Tepat SLA';
    }

    public function slaOutcomeColorClass(): string
    {
        $remaining = $this->slaFinalRemainingDays();

        if ($remaining === null) {
            return 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:ring-blue-500/30';
        }

        if ($remaining < 0) {
            return 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-200 dark:ring-rose-500/30';
        }

        return 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-500/30';
    }

    public function slaExplanation(): string
    {
        if ($this->is_cancelled) {
            return 'Data dibatalkan, SLA tidak lagi dihitung.';
        }

        $target = (int) ($this->target_sla_hari ?? 0);
        $start = $this->slaStartDate();
        $startLabel = $this->slaStartSourceLabel();
        $targetDate = $this->slaTargetDateLabel();

        if (! $start || $target <= 0) {
            return 'SLA belum bisa dijelaskan lengkap karena target SLA atau tanggal awal belum tersedia.';
        }

        if ($this->isSlaComplete()) {
            $finish = $this->slaFinishDate();
            $usedDays = $this->slaUsedDays();
            $remaining = $this->slaFinalRemainingDays();
            $finishLabel = $this->slaFinishSourceLabel();

            if (! $finish || $usedDays === null || $remaining === null) {
                return "Pekerjaan sudah lengkap. Target SLA {$target} hari dan perhitungan SLA berhenti karena status sudah selesai.";
            }

            $startDate = $start->translatedFormat('d F Y');
            $finishDate = $finish->translatedFormat('d F Y');
            $targetText = $targetDate ? " Target selesai maksimal {$targetDate}." : '';

            if ($remaining > 0) {
                $result = "selesai lebih awal {$remaining} hari dari target";
            } elseif ($remaining < 0) {
                $result = "selesai terlambat " . abs($remaining) . " hari dari target";
            } else {
                $result = 'selesai tepat sesuai target SLA';
            }

            return "SLA dihitung dari {$startLabel} ({$startDate}) sampai {$finishLabel} ({$finishDate}). Target {$target} hari.{$targetText} Realisasi {$usedDays} hari, sehingga {$result}.";
        }

        $runningDays = $this->slaRunningDays();
        $remaining = $this->slaCurrentRemainingDays();
        $startDate = $start->translatedFormat('d F Y');
        $targetText = $targetDate ? " Target selesai maksimal {$targetDate}." : '';

        if ($remaining === null) {
            return "SLA masih berjalan dari {$startLabel} ({$startDate}) sampai hari ini. Target {$target} hari.{$targetText} Hari berjalan belum bisa dihitung lengkap karena data tanggal belum lengkap.";
        }

        if ($remaining < 0) {
            return "SLA masih berjalan dari {$startLabel} ({$startDate}) sampai hari ini. Target {$target} hari.{$targetText} Sudah berjalan {$runningDays} hari, sehingga terlambat " . abs($remaining) . " hari.";
        }

        return "SLA masih berjalan dari {$startLabel} ({$startDate}) sampai hari ini. Target {$target} hari.{$targetText} Sudah berjalan {$runningDays} hari, sisa {$remaining} hari.";
    }

    protected function parseSlaDate($date): ?Carbon
    {
        if (! $date) {
            return null;
        }

        try {
            return Carbon::parse($date);
        } catch (\Throwable) {
            return null;
        }
    }

    public function recalculate()
    {
        $total = $this->total_sebelum_ppn ?? 0;
        $nilaiSpSpk = $this->nilai_sp_spk ?? 0;

        $targetSla = self::hitungTargetSla($total);
        $realisasiSla = self::hitungRealisasiSla($this->tgl_spph, $this->tgl_spk);
        $sisaTarget = self::hitungSisaTarget(
            $targetSla,
            $this->tgl_diserahkan ?: $this->tgl_terima_pr ?: $this->tgl_ppbj
        );
        $timeLeft = self::hitungTimeLeft($this->promised_date);
        $qtLeft = self::hitungQtLeft($this->tgl_spph);
        $progres = self::hitungProgresByTahapan($this);
        $persentaseRealisasi = self::hitungPersentaseRealisasi($nilaiSpSpk, $total);

        $statusSla = self::hitungStatusSla($sisaTarget, $progres, $this->no_invoice);

        $this->update([
            'target_sla_hari' => $targetSla,
            'realisasi_sla' => $realisasiSla,
            'sisa_target_sla' => $sisaTarget,
            'status_sla' => $statusSla,
            'time_left' => $timeLeft,
            'qt_left' => $qtLeft,
            'progres' => $progres,
            'persentase_realisasi' => $persentaseRealisasi,
        ]);
    }

    public function applySlaCalculation()
    {
        if (($this->status ?? 'ACTIVE') === 'CANCELLED') {
            $this->status_sla = 'CANCELLED';
            return;
        }

        $total = $this->total_sebelum_ppn ?? 0;
        $nilaiSpSpk = $this->nilai_sp_spk ?? 0;

        $this->target_sla_hari = self::hitungTargetSla($total);

        $this->realisasi_sla = self::hitungRealisasiSla(
            $this->tgl_spph,
            $this->tgl_spk
        );

        $this->sisa_target_sla = self::hitungSisaTarget(
            $this->target_sla_hari,
            $this->tgl_diserahkan ?: $this->tgl_terima_pr ?: $this->tgl_ppbj
        );

        $this->time_left = self::hitungTimeLeft(
            $this->promised_date
        );

        $this->qt_left = self::hitungQtLeft(
            $this->tgl_spph
        );

        $this->persentase_realisasi = self::hitungPersentaseRealisasi(
            $nilaiSpSpk,
            $total
        );

        // Hitung progres DULU sebelum status_sla
        $this->progres = self::hitungProgresByTahapan($this);

        // Status SLA — pakai parameter lengkap (sekali saja, tidak duplikat)
        $this->status_sla = self::hitungStatusSla(
            $this->sisa_target_sla,
            $this->progres,
            $this->no_invoice
        );
    }

    /**
     * ============================
     * RUMUS TARGET SLA
     * ============================
     */
    public static function hitungTargetSla($total)
    {
        if ($total > 20000000) {
            return 14;
        }

        if ($total >= 1 && $total <= 20000000) {
            return 10;
        }

        return 0;
    }

    /**
     * ============================
     * RUMUS REALISASI SLA
     * ============================
     */
    public static function hitungRealisasiSla($tglSpph, $tglSpk)
    {
        if (!$tglSpph || !$tglSpk) {
            return 0;
        }

        return Carbon::parse($tglSpph)->diffInDays(Carbon::parse($tglSpk), false);
    }

    /**
     * ============================
     * RUMUS SISA TARGET SLA
     * ============================
     */
    public static function hitungSisaTarget($targetSla, $tglDiserahkan)
    {
        if (!$tglDiserahkan) {
            return 0;
        }

        $dipakai = Carbon::parse($tglDiserahkan)->startOfDay()->diffInDays(now()->startOfDay());

        return $targetSla - $dipakai;
    }

    /**
     * ============================
     * RUMUS TIME LEFT
     * ============================
     */
    public static function hitungTimeLeft($promisedDate)
    {
        if (!$promisedDate) {
            return 0;
        }

        return now()->diffInDays(Carbon::parse($promisedDate), false);
    }

    /**
     * ============================
     * RUMUS PROGRES (%)
     * ============================
     */
    public static function hitungProgresByTahapan(self $ppbj): int
    {
        $score = 0;
        $bobot = 20;

        // 1. SPPH / RFQ 1 → 20%
        if (!empty($ppbj->spph_rfq_1)) {
            $score += $bobot;
        }

        // 2. SPH → 40%
        if (!empty($ppbj->sph)) {
            $score += $bobot;
        }

        // 3. Awarding SP → 60%
        if (!empty($ppbj->awarding_sp)) {
            $score += $bobot;
        }

        // 4. Tanggal SPK → 80%
        if (!empty($ppbj->tgl_spk)) {
            $score += $bobot;
        }

        // 5. BPG (Selesai) → 100%
        if (!empty($ppbj->bpg_no)) {
            $score += $bobot;
        }

        return $score;
    }

    /**
     * ============================
     * RUMUS PERSENTASE REALISASI
     * ✅ Di-cap 100% agar tidak meledak
     * ============================
     */
    public static function hitungPersentaseRealisasi($nilaiSpSpk, $total)
    {
        if ($nilaiSpSpk > 0 && $total > 0) {
            return min(round(($nilaiSpSpk / $total) * 100, 2), 100);
        }

        return 0;
    }

    /**
     * ============================
     * RUMUS QT LEFT (SISA HARI QT)
     * ============================
     */
    public static function hitungQtLeft($tglQt)
    {
        if (!$tglQt) {
            return 0;
        }

        return now()->diffInDays(Carbon::parse($tglQt), false);
    }

    public static function manualFields(): array
    {
        return [
            'ppbj_no',
            'tgl_ppbj',
            'tgl_terima_pr',
            'uraian',
            'note',
            'tgl_diserahkan',

            'portofolio',
            'buyer',
            'metode_pengadaan',
            'penyedia_eksternal',

            'total_sebelum_ppn',

            'spph_rfq_1',
            'rfq_2',
            'rfq_3',
            'tgl_spph',
            'closed_date',

            'sph',
            'tgl_sph',

            'awarding_sp',
            'tgl_awarding_sp',

            'pemenang',
            'tgl_pemenang',

            'tgl_spk',
            'nilai_sp_spk',

            'promised_date',
            'do_no',
            'bpg_no',
            'nilai_bpg',
            'tgl_bpg',

            'receiving_transaction',

            'bpb_no',
            'tgl_bpb',

            'no_invoice',
            'tgl_invoice',

            'keterangan',
        ];
    }

    protected function setTotalSebelumPpnAttribute($value)
    {
        $this->attributes['total_sebelum_ppn'] = $value ? str_replace(',', '', $value) : null;
    }

    protected function setNilaiSpSpkAttribute($value)
    {
        $this->attributes['nilai_sp_spk'] = $value ? str_replace(',', '', $value) : null;
    }

    protected function setNilaiBpgAttribute($value)
    {
        $this->attributes['nilai_bpg'] = $value ? str_replace(',', '', $value) : null;
    }
}
