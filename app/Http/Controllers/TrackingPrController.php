<?php

namespace App\Http\Controllers;

use App\Models\Ppbj;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class TrackingPrController extends Controller
{
    private const CACHE_TRACKING = 300;
    private const CACHE_SUGGEST = 600;

    public function index(Request $request)
    {
        return view('tracking.index', $this->resolveTrackingData($request));
    }

    public function landing(Request $request)
    {
        return view('landing.track', $this->resolveTrackingData($request));
    }

    private function resolveTrackingData(Request $request): array
    {
        $keyword = trim($request->get('q', ''));
        $row = null;
        $ppbj = null;
        $sourceType = null;
        $likeResults = null;

        if ($keyword && mb_strlen($keyword) >= 2) {
            try {
                $row = $this->trackByNomorPr($keyword);
                if ($row) {
                    $sourceType = 'pr';
                } else {
                    $ppbj = $this->trackByPpbj($keyword);
                    if ($ppbj) {
                        $sourceType = 'ppbj';
                    }
                }

                if (!$row && !$ppbj) {
                    $likeResults = $this->searchLike($keyword);
                    if ($likeResults && count($likeResults) === 1) {
                        $found = $likeResults[0];
                        if ($found['type'] === 'pr') {
                            $row = $this->trackByNomorPr($found['nomor']);
                            if ($row) $sourceType = 'pr';
                        } else {
                            $ppbj = $this->trackByPpbj($found['nomor']);
                            if ($ppbj) $sourceType = 'ppbj';
                        }
                        $likeResults = null;
                    }
                }
            } catch (\Exception $e) {
                Log::error('Tracking error: ' . $e->getMessage());
            }
        }

        return compact('row', 'ppbj', 'keyword', 'sourceType', 'likeResults');
    }

    private function parseDate($date): ?Carbon
    {
        if (empty($date)) return null;
        try {
            if ($date instanceof Carbon) return $date;
            return Carbon::parse($date);
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * ✅ FIXED: received_by → received_by_umum_user_id
     */
    private function trackByNomorPr(string $nomorPr)
    {
        $cacheKey = 'tracking_pr_' . md5(strtolower($nomorPr)) . '_v5';
        $cached = Cache::get($cacheKey);
        if ($cached !== null) return $cached;

        try {
            $torpr = DB::table('torprs')
                ->select([
                    'id', 'nomor_pr', 'tujuan_pengadaan', 'tanggal_pr',
                    'tgl_ttd_kabid_pr', 'tgl_ttd_kacab_pr', 'jumlah_pr',
                    'received_at', 'received_by_umum_user_id',
                    'created_at', 'updated_at',
                    'signed_by_kabid_name', 'signed_by_kacab_name',
                    'sign_token_kabid', 'sign_token_kacab',
                ])
                ->where('nomor_pr', $nomorPr)
                ->first();

            if (!$torpr) return null;

            // Approval
            $latestApproval = null;
            try {
                $latestApproval = DB::table('pr_receipt_approvals')
                    ->select([
                        'id', 'status', 'requested_at', 'requested_by',
                        'approved_at', 'approved_by', 'rejected_at', 'rejected_by',
                        'rejection_reason', 'notes'
                    ])
                    ->where('torpr_id', $torpr->id)
                    ->orderBy('id', 'DESC')
                    ->first();

                if ($latestApproval) {
                    if (!empty($latestApproval->approved_by)) {
                        $latestApproval->approvedBy = DB::table('users')->select(['id', 'name'])->where('id', $latestApproval->approved_by)->first();
                    }
                    if (!empty($latestApproval->rejected_by)) {
                        $latestApproval->rejectedBy = DB::table('users')->select(['id', 'name'])->where('id', $latestApproval->rejected_by)->first();
                    }
                    $latestApproval->requested_name = 'Unknown';
                    if (!empty($latestApproval->requested_by)) {
                        $reqUser = DB::table('users')->select(['name'])->where('id', $latestApproval->requested_by)->first();
                        if ($reqUser) $latestApproval->requested_name = $reqUser->name;
                    }
                }
            } catch (\Exception $e) {
                Log::warning('Approval query failed: ' . $e->getMessage());
                $latestApproval = null;
            }

            // ✅ FIX: received_by_umum_user_id
            $receivedByUser = null;
            if (!empty($torpr->received_by_umum_user_id)) {
                $receivedByUser = DB::table('users')->select(['id', 'name'])->where('id', $torpr->received_by_umum_user_id)->first();
            }

            $result = (object) [
                'id' => $torpr->id,
                'nomor_pr' => $torpr->nomor_pr,
                'tujuan_pengadaan' => $torpr->tujuan_pengadaan,
                'tanggal_pr' => $this->parseDate($torpr->tanggal_pr),
                'tgl_ttd_kabid_pr' => $this->parseDate($torpr->tgl_ttd_kabid_pr),
                'tgl_ttd_kacab_pr' => $this->parseDate($torpr->tgl_ttd_kacab_pr),
                'jumlah_pr' => $torpr->jumlah_pr,
                'received_at' => $this->parseDate($torpr->received_at),
                'created_at' => $this->parseDate($torpr->created_at),
                'updated_at' => $this->parseDate($torpr->updated_at),
                'signed_by_kabid_name' => $torpr->signed_by_kabid_name,
                'signed_by_kacab_name' => $torpr->signed_by_kacab_name,
                'sign_token_kabid' => $torpr->sign_token_kabid,
                'sign_token_kacab' => $torpr->sign_token_kacab,
                'latestReceiptApproval' => $latestApproval,
                'receivedByUmum' => $receivedByUser,
                'createdBy' => null,
            ];

            Cache::put($cacheKey, $result, self::CACHE_TRACKING);
            return $result;

        } catch (\Exception $e) {
            Log::warning('trackByNomorPr failed: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * ✅ FIXED: Gunakan buyer, fallback "UMUM"
     */
    private function trackByPpbj(string $nomor)
    {
        $cacheKey = 'tracking_ppbj_' . md5(strtolower($nomor)) . '_v5';
        $cached = Cache::get($cacheKey);
        if ($cached !== null) return $cached;

        try {
            $ppbj = DB::table('ppbj')
                ->where('ppbj_no', $nomor)
                ->first();

            if (!$ppbj) return null;

            // ✅ FIX: Pakai buyer, fallback "UMUM"
            $buyerName = !empty($ppbj->buyer) ? $ppbj->buyer : 'UMUM';

            // Linked PR
            $linkedPr = null;
            try {
                $linkedPr = DB::table('torprs')
                    ->select(['nomor_pr', 'tujuan_pengadaan'])
                    ->where('nomor_pr', $ppbj->ppbj_no)
                    ->first();
            } catch (\Exception $e) {}

            // Status SLA
            $statusSla = 'ON TRACK';
            try {
                $ppbjStatus = isset($ppbj->status) ? $ppbj->status : 'ACTIVE';
                if ($ppbjStatus === 'CANCELLED') {
                    $statusSla = 'CANCELLED';
                } else {
                    $statusSla = Ppbj::hitungStatusSla(
                        $ppbj->sisa_target_sla ?? 0,
                        $ppbj->progres ?? 0,
                        $ppbj->no_invoice ?? null
                    );
                }
            } catch (\Exception $e) {
                Log::warning('hitungStatusSla failed: ' . $e->getMessage());
            }

            $result = (object) [
                'id' => $ppbj->id,
                'ppbj_no' => $ppbj->ppbj_no,
                'tgl_ppbj' => $this->parseDate($ppbj->tgl_ppbj ?? null),
                'tgl_terima_pr' => $this->parseDate($ppbj->tgl_terima_pr ?? null),
                'tgl_diserahkan' => $this->parseDate($ppbj->tgl_diserahkan ?? null),
                'uraian' => $ppbj->uraian ?? null,
                'note' => $ppbj->note ?? null,
                'portofolio' => $ppbj->portofolio ?? null,
                'buyer' => $ppbj->buyer ?? null,
                'total_sebelum_ppn' => $ppbj->total_sebelum_ppn ?? null,
                'target_sla_hari' => $ppbj->target_sla_hari ?? null,
                'sisa_target_sla' => $ppbj->sisa_target_sla ?? null,
                'realisasi_sla' => $ppbj->realisasi_sla ?? null,
                'time_left' => $ppbj->time_left ?? null,
                'qt_left' => $ppbj->qt_left ?? null,
                'persentase_realisasi' => $ppbj->persentase_realisasi ?? null,
                'metode_pengadaan' => $ppbj->metode_pengadaan ?? null,
                'penyedia_eksternal' => $ppbj->penyedia_eksternal ?? null,
                'spph_rfq_1' => $ppbj->spph_rfq_1 ?? null,
                'rfq_2' => $ppbj->rfq_2 ?? null,
                'rfq_3' => $ppbj->rfq_3 ?? null,
                'tgl_spph' => $this->parseDate($ppbj->tgl_spph ?? null),
                'closed_date' => $this->parseDate($ppbj->closed_date ?? null),
                'sph' => $ppbj->sph ?? null,
                'tgl_sph' => $this->parseDate($ppbj->tgl_sph ?? null),
                'awarding_sp' => $ppbj->awarding_sp ?? null,
                'tgl_awarding_sp' => $this->parseDate($ppbj->tgl_awarding_sp ?? null),
                'tgl_spk' => $this->parseDate($ppbj->tgl_spk ?? null),
                'nilai_sp_spk' => $ppbj->nilai_sp_spk ?? null,
                'promised_date' => $this->parseDate($ppbj->promised_date ?? null),
                'bpg_no' => $ppbj->bpg_no ?? null,
                'nilai_bpg' => $ppbj->nilai_bpg ?? null,
                'tgl_bpg' => $this->parseDate($ppbj->tgl_bpg ?? null),
                'do_no' => $ppbj->do_no ?? null,
                'receiving_transaction' => $ppbj->receiving_transaction ?? null,
                'bpb_no' => $ppbj->bpb_no ?? null,
                'tgl_bpb' => $this->parseDate($ppbj->tgl_bpb ?? null),
                'no_invoice' => $ppbj->no_invoice ?? null,
                'tgl_invoice' => $this->parseDate($ppbj->tgl_invoice ?? null),
                'progres' => (int) ($ppbj->progres ?? 0),
                'keterangan' => $ppbj->keterangan ?? null,
                'status' => $ppbj->status ?? 'ACTIVE',
                'cancel_reason' => $ppbj->cancel_reason ?? null,
                'status_sla' => $statusSla,
                'created_at' => $this->parseDate($ppbj->created_at ?? null),
                'updated_at' => $this->parseDate($ppbj->updated_at ?? null),
                // ✅ FIX: createdBy pakai buyer, fallback UMUM
                'createdBy' => (object) ['name' => $buyerName],
                'updatedBy' => null,
                'linked_pr' => $linkedPr,
            ];

            Cache::put($cacheKey, $result, self::CACHE_TRACKING);
            return $result;

        } catch (\Exception $e) {
            Log::warning('trackByPpbj failed: ' . $e->getMessage());
            return null;
        }
    }

    private function searchLike(string $keyword): ?array
    {
        $results = [];

        try {
            $prMatches = DB::table('torprs')
                ->select(['nomor_pr', 'tujuan_pengadaan'])
                ->whereNotNull('nomor_pr')
                ->where('nomor_pr', '!=', '')
                ->where('nomor_pr', 'like', '%' . $keyword . '%')
                ->limit(5)
                ->get();

            foreach ($prMatches as $pr) {
                $results[] = [
                    'nomor' => $pr->nomor_pr,
                    'tujuan' => $pr->tujuan_pengadaan ?? '-',
                    'type' => 'pr',
                    'type_label' => 'PR',
                ];
            }
        } catch (\Exception $e) {}

        try {
            $prNumbers = array_column($results, 'nomor');

            $ppbjMatches = DB::table('ppbj')
                ->select(['ppbj_no', 'uraian'])
                ->whereNotNull('ppbj_no')
                ->where('ppbj_no', '!=', '')
                ->when($prNumbers, fn($q, $nums) => $q->whereNotIn('ppbj_no', $nums))
                ->where('ppbj_no', 'like', '%' . $keyword . '%')
                ->limit(5)
                ->get();

            foreach ($ppbjMatches as $p) {
                $results[] = [
                    'nomor' => $p->ppbj_no,
                    'tujuan' => $p->uraian ?? '-',
                    'type' => 'ppbj',
                    'type_label' => 'PPBJ',
                ];
            }
        } catch (\Exception $e) {}

        return count($results) > 0 ? $results : null;
    }

    public function suggest(Request $request)
    {
        try {
            $q = trim((string) $request->get('q', ''));
            if (mb_strlen($q) < 2) return response()->json(['items' => []]);

            $q = preg_replace('/[^A-Z0-9\-\/\s]/i', '', $q);
            if (empty($q)) return response()->json(['items' => []]);

            $cacheKey = 'tracking_suggest_' . md5(strtolower($q)) . '_v5';
            $cached = Cache::get($cacheKey);
            if ($cached !== null) return response()->json(['items' => $cached]);

            $items = [];

            try {
                $prResults = DB::table('torprs')
                    ->select(['nomor_pr', 'tujuan_pengadaan', 'tanggal_pr'])
                    ->whereNotNull('nomor_pr')
                    ->where('nomor_pr', '!=', '')
                    ->where(function ($query) use ($q) {
                        $query->where('nomor_pr', 'like', $q . '%')
                            ->orWhere('nomor_pr', 'like', '%' . $q . '%');
                    })
                    ->orderByRaw("CASE WHEN nomor_pr = ? THEN 0 WHEN nomor_pr LIKE ? THEN 1 ELSE 2 END", [$q, $q . '%'])
                    ->orderBy('tanggal_pr', 'DESC')
                    ->limit(8)
                    ->get()
                    ->map(fn ($r) => [
                        'nomor' => $r->nomor_pr,
                        'label' => $r->nomor_pr,
                        'tujuan' => $r->tujuan_pengadaan
                            ? (mb_strlen($r->tujuan_pengadaan) > 50 ? mb_substr($r->tujuan_pengadaan, 0, 50) . '...' : $r->tujuan_pengadaan)
                            : '-',
                        'tanggal' => $this->parseDate($r->tanggal_pr)?->format('Y-m-d'),
                        'source_type' => 'pr',
                        'source_label' => 'PR',
                    ])
                    ->toArray();

                $items = array_merge($items, $prResults);
            } catch (\Exception $e) {}

            try {
                $prNumbers = array_column($items, 'nomor');

                $ppbjResults = DB::table('ppbj')
                    ->select(['ppbj_no', 'uraian', 'tgl_ppbj', 'buyer', 'metode_pengadaan'])
                    ->whereNotNull('ppbj_no')
                    ->where('ppbj_no', '!=', '')
                    ->when($prNumbers, fn($query, $nums) => $query->whereNotIn('ppbj_no', $nums))
                    ->where(function ($query) use ($q) {
                        $query->where('ppbj_no', 'like', $q . '%')
                            ->orWhere('ppbj_no', 'like', '%' . $q . '%');
                    })
                    ->orderByRaw("CASE WHEN ppbj_no = ? THEN 0 WHEN ppbj_no LIKE ? THEN 1 ELSE 2 END", [$q, $q . '%'])
                    ->orderBy('tgl_ppbj', 'DESC')
                    ->limit(6)
                    ->get()
                    ->map(fn ($r) => [
                        'nomor' => $r->ppbj_no,
                        'label' => $r->ppbj_no,
                        'tujuan' => $r->uraian
                            ? (mb_strlen($r->uraian) > 50 ? mb_substr($r->uraian, 0, 50) . '...' : $r->uraian)
                            : ($r->metode_pengadaan ?? ($r->buyer ?? 'PPBJ Manual')),
                        'tanggal' => $this->parseDate($r->tgl_ppbj)?->format('Y-m-d'),
                        'source_type' => 'ppbj',
                        'source_label' => 'PPBJ',
                    ])
                    ->toArray();

                $items = array_merge($items, $ppbjResults);
            } catch (\Exception $e) {}

            if (!empty($items)) Cache::put($cacheKey, $items, self::CACHE_SUGGEST);

            return response()->json(['items' => $items]);
        } catch (\Exception $e) {
            Log::error('Suggest error: ' . $e->getMessage());
            return response()->json(['items' => []], 500);
        }
    }

    public function clearCache(Request $request)
    {
        $nomor = $request->get('nomor_pr');
        if (!$nomor) return response()->json(['success' => false], 400);

        $cleared = [];
        foreach (['_v1', '_v2', '_v3', '_v4', '_v5'] as $v) {
            if (Cache::forget('tracking_pr_' . md5(strtolower($nomor)) . $v)) $cleared[] = 'PR';
            if (Cache::forget('tracking_ppbj_' . md5(strtolower($nomor)) . $v)) $cleared[] = 'PPBJ';
        }

        return response()->json(['success' => true, 'message' => implode(', ', array_unique($cleared))]);
    }
}
