<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class Ppbj extends Model
{
    protected $table = 'ppbj';

    /** @var array<string, mixed>|null */
    protected ?array $pendingDoAudit = null;

    protected static function booted()
    {
        static::creating(function ($ppbj) {
            $ppbj->applySlaCalculation();
            $ppbj->prepareDoAudit(null, null);
        });

        static::updating(function ($ppbj) {
            $ppbj->applySlaCalculation();

            if ($ppbj->isDirty('do_no') || $ppbj->isDirty('do_date')) {
                $ppbj->prepareDoAudit(
                    $ppbj->getOriginal('do_no'),
                    $ppbj->getOriginal('do_date')
                );
            }
        });

        static::created(function (Ppbj $ppbj) {
            $ppbj->writePendingDoAudit();
        });

        static::updated(function (Ppbj $ppbj) {
            $ppbj->writePendingDoAudit();
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
        'do_date',
        'do_updated_at',
        'do_updated_by_user_id',
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
        // Input HTML `type=date` hanya menerima YYYY-MM-DD. Format cast eksplisit
        // mencegah toArray()/JSON mengubah nilainya menjadi timestamp UTC sehingga
        // tanggal pemenuhan tetap tampil pada modal info dan edit Management PPBJ.
        'promised_date' => 'date:Y-m-d',
        'do_date' => 'date:Y-m-d',
        'goods_arrived_at' => 'datetime',
        'goods_confirmed_at' => 'datetime',
        'do_updated_at' => 'datetime',
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

    public function doUpdatedBy()
    {
        return $this->belongsTo(User::class, 'do_updated_by_user_id');
    }

    private function prepareDoAudit($oldNumberValue, $oldDateValue): void
    {
        $oldNumber = trim((string) ($oldNumberValue ?? ''));
        $newNumber = trim((string) ($this->do_no ?? ''));
        $oldDate = $this->normalizeDoDateForAudit($oldDateValue);
        $newDate = $this->normalizeDoDateForAudit($this->do_date);

        if ($oldNumber === $newNumber && $oldDate === $newDate) {
            return;
        }

        $changedAt = now();
        $userId = auth()->id();

        $this->do_updated_at = $changedAt;
        $this->do_updated_by_user_id = $userId;
        $this->pendingDoAudit = [
            'old_number' => $oldNumber !== '' ? $oldNumber : null,
            'new_number' => $newNumber !== '' ? $newNumber : null,
            'old_date' => $oldDate,
            'new_date' => $newDate,
            'changed_at' => $changedAt->toIso8601String(),
            'changed_by_user_id' => $userId,
        ];
    }

    private function normalizeDoDateForAudit($value): ?string
    {
        return $this->parseSlaDate($value)?->toDateString();
    }

    private function writePendingDoAudit(): void
    {
        $audit = $this->pendingDoAudit;
        $this->pendingDoAudit = null;

        if ($audit === null) {
            return;
        }

        $action = $audit['new_number'] === null && $audit['new_date'] === null
            ? 'do_cleared'
            : ($audit['old_number'] === null && $audit['old_date'] === null ? 'do_recorded' : 'do_updated');

        try {
            ActivityLog::create([
                'user_id' => $audit['changed_by_user_id'],
                'model_type' => self::class,
                'model_id' => $this->getKey(),
                'action' => $action,
                'description' => match ($action) {
                    'do_recorded' => 'Dokumen DO / Surat Jalan / BAST dicatat.',
                    'do_updated' => 'Dokumen DO / Surat Jalan / BAST diperbarui.',
                    default => 'Dokumen DO / Surat Jalan / BAST dikosongkan.',
                },
                'changes' => [
                    'do_no' => [
                        'old' => $audit['old_number'],
                        'new' => $audit['new_number'],
                    ],
                    'do_date' => [
                        'old' => $audit['old_date'],
                        'new' => $audit['new_date'],
                    ],
                    'changed_at' => $audit['changed_at'],
                ],
            ]);
        } catch (\Throwable $e) {
            // Audit tidak boleh menggagalkan transaksi utama PPBJ.
            Log::warning('Gagal mencatat audit perubahan DO PPBJ.', [
                'ppbj_id' => $this->getKey(),
                'error' => $e->getMessage(),
            ]);
        }
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

    public static function hitungStatusSla($sisaTarget, bool $isComplete = false, int $targetSla = 0, bool $hasStartDate = true)
    {
        if ($isComplete) {
            return 'LENGKAP';
        }

        if ($targetSla <= 0 || ! $hasStartDate) {
            return 'BELUM DIHITUNG';
        }

        if ($sisaTarget < 0) {
            return 'OVERDUE';
        }

        if ($sisaTarget === 0) {
            return 'JATUH TEMPO';
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

        if ($this->isSlaComplete()) {
            return 'LENGKAP';
        }

        $remaining = $this->slaCurrentRemainingDays();

        if ($remaining === null) {
            return 'BELUM DIHITUNG';
        }

        if ($remaining < 0) {
            return 'OVERDUE';
        }

        if ($remaining === 0) {
            return 'JATUH TEMPO';
        }

        if ($remaining !== null && $remaining <= 2) {
            return 'WARNING';
        }

        return 'ON TRACK';
    }

    public function isSlaComplete(): bool
    {
        return ! $this->is_cancelled
            && ! empty($this->awarding_sp)
            && ! empty($this->tgl_awarding_sp)
            && ! empty($this->tgl_spk);
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
        return $this->parseSlaDate($this->tgl_spk);
    }

    public function slaFinishSourceLabel(): string
    {
        return $this->tgl_spk ? 'Tanggal SPK / kontrak' : 'Tanggal SPK / kontrak belum tersedia';
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

    public function slaTargetDays(): int
    {
        return self::hitungTargetSla($this->total_sebelum_ppn ?? 0);
    }

    public function slaFinalRemainingDays(): ?int
    {
        $usedDays = $this->slaUsedDays();

        if ($usedDays === null) {
            return null;
        }

        return $this->slaTargetDays() - $usedDays;
    }

    public function slaCurrentRemainingDays(): ?int
    {
        if ($this->isSlaComplete()) {
            return $this->slaFinalRemainingDays();
        }

        $runningDays = $this->slaRunningDays();
        $target = $this->slaTargetDays();

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

            return $remaining === null ? 'Belum dihitung' : $remaining . ' hari';
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
        $target = $this->slaTargetDays();

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

        $target = $this->slaTargetDays();
        $start = $this->slaStartDate();
        $startLabel = $this->slaStartSourceLabel();
        $targetDate = $this->slaTargetDateLabel();

        if ($target <= 0) {
            return 'SLA belum dihitung karena nilai PR masih kosong atau Rp0. Isi nilai PR agar target SLA otomatis ditentukan.';
        }

        if (! $start) {
            return 'Target SLA sudah ditentukan, tetapi tanggal awal belum tersedia. Isi tanggal diserahkan ke Umum, tanggal terima PR, atau tanggal PR.';
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

            return "SLA dihitung dari {$startLabel} ({$startDate}) sampai {$finishLabel} ({$finishDate}). Target {$target} hari berdasarkan nilai PR.{$targetText} Realisasi {$usedDays} hari, sehingga {$result}.";
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

    public function contractStartDate(): ?Carbon
    {
        return $this->parseSlaDate($this->tgl_spk);
    }

    public function contractEndDate(): ?Carbon
    {
        return $this->parseSlaDate($this->promised_date ?: $this->closed_date);
    }

    public function contractEndDateSourceLabel(): ?string
    {
        if ($this->parseSlaDate($this->promised_date)) {
            return 'Promised Date';
        }

        if ($this->parseSlaDate($this->closed_date)) {
            return 'Closed Date (fallback)';
        }

        return null;
    }

    public function contractDurationDays(): ?int
    {
        $start = $this->contractStartDate();
        $end = $this->contractEndDate();

        if (! $start || ! $end) {
            return null;
        }

        return (int) $start->copy()->startOfDay()->diffInDays($end->copy()->startOfDay(), false);
    }

    public function contractRemainingDays(): ?int
    {
        if ($this->isHandoverComplete()) {
            return null;
        }

        $end = $this->contractEndDate();

        return $end ? (int) now()->startOfDay()->diffInDays($end->copy()->startOfDay(), false) : null;
    }

    public function handoverDate(): ?Carbon
    {
        return $this->parseSlaDate($this->do_date);
    }

    public function isHandoverComplete(): bool
    {
        return trim((string) ($this->do_no ?? '')) !== '' && $this->handoverDate() !== null;
    }

    /**
     * Selisih positif berarti terlambat, negatif berarti lebih cepat.
     * Perhitungan murni dari data baris aktif sehingga tidak menambah query.
     */
    public function handoverDeviationDays(): ?int
    {
        $target = $this->contractEndDate();
        $actual = $this->handoverDate();

        if (! $target || ! $actual || ! $this->isHandoverComplete()) {
            return null;
        }

        return (int) $target->copy()->startOfDay()->diffInDays($actual->copy()->startOfDay(), false);
    }

    public function handoverPerformanceLabel(): string
    {
        if (! $this->isHandoverComplete()) {
            if (trim((string) ($this->do_no ?? '')) !== '' || $this->handoverDate()) {
                return 'DATA SERAH TERIMA BELUM LENGKAP';
            }

            return 'BELUM SERAH TERIMA';
        }

        $deviation = $this->handoverDeviationDays();

        if ($deviation === null) {
            return 'SELESAI - TARGET BELUM ADA';
        }

        if ($deviation > 0) {
            return 'TERLAMBAT ' . $deviation . ' HARI';
        }

        if ($deviation < 0) {
            return 'LEBIH CEPAT ' . abs($deviation) . ' HARI';
        }

        return 'TEPAT WAKTU';
    }

    public function contractStatusLabel(): string
    {
        if ($this->isHandoverComplete()) {
            return $this->handoverDeviationDays() > 0
                ? 'SERAH TERIMA TERLAMBAT'
                : 'SERAH TERIMA SELESAI';
        }

        if (trim((string) ($this->do_no ?? '')) !== '' || $this->handoverDate()) {
            return 'DOKUMEN SERAH TERIMA BELUM LENGKAP';
        }

        if (! $this->contractStartDate()) {
            return 'BELUM AKTIF';
        }

        if (! $this->contractEndDate()) {
            return 'BATAS BELUM DIATUR';
        }

        if (($this->contractDurationDays() ?? 0) < 0) {
            return 'TANGGAL TIDAK VALID';
        }

        $remaining = $this->contractRemainingDays();

        return match (true) {
            $remaining === null => 'BATAS BELUM DIATUR',
            $remaining < 0 => 'MELEWATI BATAS',
            $remaining === 0 => 'BERAKHIR HARI INI',
            $remaining <= 7 => 'SANGAT KRITIS',
            $remaining <= 14 => 'KRITIS',
            $remaining <= 30 => 'SEGERA BERAKHIR',
            default => 'AKTIF',
        };
    }

    public function contractStatusColorClass(): string
    {
        return match ($this->contractStatusLabel()) {
            'SERAH TERIMA SELESAI' => 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-500/30',
            'SERAH TERIMA TERLAMBAT' => 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-200 dark:ring-rose-500/30',
            'DOKUMEN SERAH TERIMA BELUM LENGKAP' => 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-500/30',
            'AKTIF' => 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:ring-blue-500/30',
            'SEGERA BERAKHIR' => 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-500/30',
            'KRITIS', 'SANGAT KRITIS', 'BERAKHIR HARI INI' => 'bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-500/15 dark:text-orange-200 dark:ring-orange-500/30',
            'MELEWATI BATAS', 'TANGGAL TIDAK VALID' => 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-200 dark:ring-rose-500/30',
            default => 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:ring-slate-600',
        };
    }

    public function contractExplanation(): string
    {
        $start = $this->contractStartDate();
        $end = $this->contractEndDate();

        if ($this->isHandoverComplete()) {
            $actual = $this->handoverDate();
            $actualLabel = $actual?->translatedFormat('d F Y');
            $documentNumber = trim((string) $this->do_no);
            $deviation = $this->handoverDeviationDays();

            if (! $end || $deviation === null) {
                return "Serah terima selesai berdasarkan dokumen {$documentNumber} tanggal {$actualLabel}. Promised Date dan Closed Date kosong, sehingga ketepatan waktu belum dapat dibandingkan.";
            }

            $targetLabel = $end->translatedFormat('d F Y');
            $source = $this->contractEndDateSourceLabel() ?: 'tanggal target';
            $result = $deviation > 0
                ? 'terlambat ' . $deviation . ' hari'
                : ($deviation < 0 ? 'lebih cepat ' . abs($deviation) . ' hari' : 'tepat waktu');

            return "Serah terima selesai berdasarkan dokumen {$documentNumber} tanggal {$actualLabel}. Dibandingkan {$source} ({$targetLabel}), realisasi {$result}.";
        }

        if (trim((string) ($this->do_no ?? '')) !== '' || $this->handoverDate()) {
            return 'Dokumen serah terima belum lengkap. Nomor dan tanggal DO / Surat Jalan / BAST harus diisi agar pekerjaan dinyatakan selesai dan kinerja waktunya dapat dihitung.';
        }

        if ($this->goods_confirmed_at) {
            return 'Barang/pekerjaan sudah dikonfirmasi diterima oleh Operasional, tetapi pekerjaan belum dinyatakan selesai sampai nomor dan tanggal DO / Surat Jalan / BAST dicatat.';
        }

        if (! $start) {
            return 'Masa pemenuhan belum aktif karena tanggal SPK/kontrak belum diisi.';
        }

        if (! $end) {
            return 'Kontrak sudah dibuat, tetapi tanggal pemenuhan/berakhir kontrak belum diatur.';
        }

        $duration = $this->contractDurationDays();
        $remaining = $this->contractRemainingDays();
        $startLabel = $start->translatedFormat('d F Y');
        $endLabel = $end->translatedFormat('d F Y');
        $endSource = $this->contractEndDateSourceLabel() ?: 'tanggal batas';

        if ($duration !== null && $duration < 0) {
            return "Batas dari {$endSource} ({$endLabel}) lebih awal dari tanggal SPK/kontrak ({$startLabel}). Periksa kembali kedua tanggal tersebut.";
        }

        if ($remaining !== null && $remaining < 0) {
            return "Masa pemenuhan dimulai {$startLabel}, memakai {$endSource} sebagai batas ({$endLabel}), dan telah melewati batas " . abs($remaining) . ' hari.';
        }

        if ($remaining === 0) {
            return "Masa pemenuhan dimulai {$startLabel} dan batas dari {$endSource} berakhir hari ini ({$endLabel}).";
        }

        return "Masa pemenuhan dimulai {$startLabel}, memakai {$endSource} sebagai batas ({$endLabel}), berdurasi {$duration} hari, dan tersisa {$remaining} hari.";
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
        $realisasiSla = $this->isSlaComplete() ? (int) ($this->slaUsedDays() ?? 0) : 0;
        $sisaTarget = self::hitungSisaTarget(
            $targetSla,
            $this->tgl_diserahkan ?: $this->tgl_terima_pr ?: $this->tgl_ppbj
        );
        $timeLeft = self::hitungTimeLeft($this->promised_date ?: $this->closed_date);
        $qtLeft = self::hitungQtLeft($this->tgl_spph);
        $progres = self::hitungProgresByTahapan($this);
        $persentaseRealisasi = self::hitungPersentaseRealisasi($nilaiSpSpk, $total);

        $statusSla = self::hitungStatusSla($sisaTarget, $this->isSlaComplete(), $targetSla, (bool) $this->slaStartDate());

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

        $this->realisasi_sla = $this->isSlaComplete() ? (int) ($this->slaUsedDays() ?? 0) : 0;

        $this->sisa_target_sla = self::hitungSisaTarget(
            $this->target_sla_hari,
            $this->tgl_diserahkan ?: $this->tgl_terima_pr ?: $this->tgl_ppbj
        );

        $this->time_left = self::hitungTimeLeft(
            $this->promised_date ?: $this->closed_date
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
            $this->isSlaComplete(),
            (int) $this->target_sla_hari,
            (bool) $this->slaStartDate()
        );
    }

    /**
     * ============================
     * RUMUS TARGET SLA
     * ============================
     */
    public static function hitungTargetSla($total)
    {
        if ($total > 50000000) {
            return 14;
        }

        if ($total >= 1 && $total <= 50000000) {
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
        if ((int) $targetSla <= 0 || !$tglDiserahkan) {
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
            'do_date',
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
