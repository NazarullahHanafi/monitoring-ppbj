<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\Sp;
use App\Models\SpValueApproval;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;

class SpValueApprovalService
{
    public function snapshot(Request $request, $records, mixed $value, array $plan, ?Sp $sp = null): array
    {
        $totalPr = $records->isNotEmpty()
            ? round((float) $records->sum('total_sebelum_ppn'), 2)
            : round((float) $request->input('nilai_pr', 0), 2);
        $details = $request->only([
            'tanggal_sp', 'deskripsi_pengadaan', 'pic', 'sph', 'tgl_sph', 'promised_date',
            'rfq', 'nomor_pemenang', 'tanggal_pemenang', 'awal_kontrak', 'akhir_kontrak',
            'bidang_ip_itu', 'penandatangan_sci', 'jabatan_sci', 'items',
        ]);

        // Preserve PR order: the final PR receives any rounding remainder.
        return [
            'sp_id' => $sp?->id,
            'sp_version' => $sp ? hash('sha256', json_encode($sp->getRawOriginal())) : null,
            'nomor_sp' => trim((string) $request->nomor_sp),
            'tanggal_sp' => $request->tanggal_sp,
            'nomor_pr_manual' => $records->isEmpty() ? trim((string) $request->nomor_pr) : null,
            'vendor' => trim((string) ($request->filled('vendor_baru') ? $request->vendor_baru : $request->nama_vendor)),
            'nilai_sp' => round((float) $value, 2),
            'nilai_pr' => $totalPr,
            'selisih' => round((float) $value - $totalPr, 2),
            'requires_approval' => ($records->isNotEmpty() || $totalPr > 0) && round((float) $value, 2) > $totalPr,
            'prs' => $records->map(fn ($row) => [
                'id' => $row->id, 'nomor' => $row->ppbj_no,
                'nilai_pr' => round((float) $row->total_sebelum_ppn, 2),
                'alokasi' => $plan['values'][$row->ppbj_no] ?? 0,
            ])->values()->all(),
            'description' => mb_substr(strip_tags((string) $request->deskripsi_pengadaan), 0, 500),
            'item_count' => count($request->input('items', [])),
            'details_hash' => hash('sha256', json_encode($details, JSON_THROW_ON_ERROR)),
        ];
    }

    public function fingerprint(array $snapshot): string
    {
        return hash('sha256', json_encode($snapshot, JSON_PRESERVE_ZERO_FRACTION | JSON_THROW_ON_ERROR));
    }

    /** Caller holds PR/SP locks and an enclosing transaction. No checkbox bypass. */
    public function consume(Request $request, array $snapshot): void
    {
        if (! $snapshot['requires_approval']) {
            return;
        }
        $approval = SpValueApproval::query()
            ->where('requester_id', $request->user()->id)
            ->where('fingerprint', $this->fingerprint($snapshot))
            ->lockForUpdate()->first();

        if (! $approval || $approval->status !== 'approved' || $approval->expires_at->isPast()
            || ! $approval->reviewer_id || $approval->reviewer_id === $approval->requester_id) {
            throw new HttpResponseException(response()->json([
                'message' => 'Nilai SP melebihi PR/gabungan PR. Ajukan persetujuan kepada akun Umum lain. Jika rincian berubah, ajukan ulang.',
                'approval_required' => true,
                'errors' => ['nilai_sp' => ['Persetujuan selisih nilai belum tersedia atau sudah tidak berlaku.']],
            ], 422));
        }
        $approval->update(['status' => 'consumed', 'consumed_at' => now()]);
        $this->audit($request, $approval, 'value_approval_consumed', 'Persetujuan selisih digunakan untuk menyimpan SP.');
    }

    public function audit(Request $request, SpValueApproval $approval, string $action, string $description): void
    {
        ActivityLog::create([
            'user_id' => $request->user()->id, 'model_type' => SpValueApproval::class,
            'model_id' => $approval->id, 'action' => $action, 'description' => $description,
            'changes' => ['status' => $approval->status, 'fingerprint' => $approval->fingerprint],
        ]);
    }
}
