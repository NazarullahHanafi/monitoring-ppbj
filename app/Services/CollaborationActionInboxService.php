<?php

namespace App\Services;

use App\Models\Ppbj;
use App\Models\PrReceiptApproval;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class CollaborationActionInboxService
{
    private const CACHE_SECONDS = 45;

    public function smartActions(User $user): Collection
    {
        $department = strtolower(trim((string) $user->department));

        return collect(Cache::remember(
            "collaboration_action_radar:{$department}:v1",
            now()->addSeconds(self::CACHE_SECONDS),
            fn () => $department === 'operasional'
                ? $this->operationalActions()
                : $this->generalActions()
        ));
    }

    private function generalActions(): array
    {
        return Ppbj::query()
            ->where(fn ($query) => $query->whereNull('status')->orWhere('status', '!=', 'CANCELLED'))
            ->where(function ($query) {
                $query->whereNull('spph_rfq_1')->orWhere('spph_rfq_1', '')
                    ->orWhereNull('tgl_spk')
                    ->orWhere(function ($handover) {
                        $handover->whereNotNull('promised_date')
                            ->whereDate('promised_date', '<=', now()->addDays(7)->toDateString())
                            ->where(fn ($document) => $document->whereNull('do_no')->orWhereNull('do_date'));
                    })
                    ->orWhere(function ($invoice) {
                        $invoice->whereNotNull('do_no')->whereNotNull('do_date')
                            ->where(fn ($missing) => $missing->whereNull('no_invoice')->orWhere('no_invoice', ''));
                    });
            })
            ->latest('id')
            ->limit(24)
            ->get([
                'id', 'ppbj_no', 'uraian', 'buyer', 'portofolio', 'status_sla', 'sisa_target_sla',
                'spph_rfq_1', 'tgl_spk', 'promised_date', 'do_no', 'do_date', 'no_invoice',
            ])
            ->map(function (Ppbj $ppbj) {
                $remaining = $ppbj->slaCurrentRemainingDays();

                if (blank($ppbj->spph_rfq_1)) {
                    return $this->action($ppbj, 'Lengkapi SPPH / RFQ', 'Dokumen permintaan penawaran belum tercatat.', $remaining !== null && $remaining <= 2 ? 'critical' : 'high', 'spph');
                }

                if (blank($ppbj->tgl_spk)) {
                    return $this->action($ppbj, 'Terbitkan SP / kontrak', 'SPPH tersedia, tetapi tanggal SP/kontrak belum lengkap.', $remaining !== null && $remaining < 0 ? 'critical' : 'high', 'sp');
                }

                if (filled($ppbj->promised_date) && blank($ppbj->do_no)) {
                    return $this->action($ppbj, 'Pantau serah terima', 'Batas pemenuhan sudah dekat atau terlewati; dokumen DO/BAST belum lengkap.', 'critical', 'ppbj');
                }

                return $this->action($ppbj, 'Lengkapi invoice', 'Dokumen serah terima tersedia, tetapi invoice belum tercatat.', 'normal', 'ppbj');
            })
            ->sortByDesc(fn (array $item) => ['normal' => 1, 'high' => 2, 'critical' => 3][$item['priority']] ?? 0)
            ->take(12)
            ->values()
            ->all();
    }

    private function operationalActions(): array
    {
        $goods = Ppbj::query()
            ->whereNotNull('goods_arrived_at')
            ->whereNull('goods_confirmed_at')
            ->where(fn ($query) => $query->whereNull('status')->orWhere('status', '!=', 'CANCELLED'))
            ->latest('goods_arrived_at')
            ->limit(8)
            ->get(['id', 'ppbj_no', 'uraian', 'buyer', 'portofolio', 'status_sla', 'goods_arrived_at'])
            ->map(fn (Ppbj $ppbj) => $this->action(
                $ppbj,
                'Konfirmasi barang / pekerjaan',
                'Umum telah menandai barang atau pekerjaan datang. Operasional perlu mengonfirmasi penerimaan.',
                $ppbj->goods_arrived_at?->lt(now()->subDay()) ? 'critical' : 'high',
                'tracking'
            ));

        $approvals = PrReceiptApproval::query()
            ->whereRaw('UPPER(status) = ?', ['PENDING'])
            ->with('torpr:id,nomor_pr,tujuan_pengadaan,portofolio,jumlah_pr')
            ->latest('requested_at')
            ->limit(6)
            ->get()
            ->map(fn (PrReceiptApproval $approval) => [
                'key' => 'approval-'.$approval->id,
                'ppbj_id' => null,
                'number' => $approval->torpr?->nomor_pr ?: 'PR menunggu nomor',
                'title' => 'Menunggu penerimaan Umum',
                'description' => $approval->torpr?->tujuan_pengadaan ?: 'Permintaan penerimaan PR sedang menunggu keputusan Umum.',
                'priority' => $approval->requested_at?->lt(now()->subDays(2)) ? 'critical' : 'normal',
                'owner' => $approval->requested_name ?: 'Operasional',
                'portfolio' => $approval->torpr?->portofolio,
                'url' => route('torpr.index', ['search' => $approval->torpr?->nomor_pr]),
            ]);

        return $goods->concat($approvals)
            ->sortByDesc(fn (array $item) => ['normal' => 1, 'high' => 2, 'critical' => 3][$item['priority']] ?? 0)
            ->take(12)
            ->values()
            ->all();
    }

    private function action(Ppbj $ppbj, string $title, string $description, string $priority, string $target): array
    {
        $url = match ($target) {
            'spph' => route('spph.index', ['search' => $ppbj->ppbj_no]),
            'sp' => route('sp.index', ['search' => $ppbj->ppbj_no]),
            'tracking' => route('tracking.index', ['q' => $ppbj->ppbj_no]),
            default => route('ppbj.index', ['search' => $ppbj->ppbj_no]),
        };

        return [
            'key' => 'ppbj-'.$ppbj->id.'-'.$target,
            'ppbj_id' => $ppbj->id,
            'number' => $ppbj->ppbj_no,
            'title' => $title,
            'description' => $description,
            'priority' => $priority,
            'owner' => $ppbj->buyer,
            'portfolio' => $ppbj->portofolio,
            'url' => $url,
        ];
    }
}
