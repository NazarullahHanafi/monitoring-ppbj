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
        $cacheKey = 'tracking_pr_' . md5(strtolower($nomorPr)) . '_v10';
        $cached = Cache::get($cacheKey);
        if ($cached !== null) return $cached;

        try {
            $torpr = DB::table('torprs')
                ->select([
                    'id', 'nomor_pr', 'tujuan_pengadaan', 'portofolio', 'tanggal_pr',
                    'tgl_ttd_kabid_pr', 'tgl_ttd_kacab_pr', 'jumlah_pr',
                    'received_at', 'received_by_umum_user_id', 'created_by_user_id',
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
                        'id', 'status', 'requested_at', 'requested_name',
                        'requested_by_user_id as requested_by',
                        'approved_at', 'approved_by_user_id as approved_by',
                        'rejected_at', 'rejected_by_user_id as rejected_by',
                        'rejected_reason', 'resubmit_notes', 'updated_at'
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
                    if (empty($latestApproval->requested_name)) {
                        $latestApproval->requested_name = 'Unknown';
                    }
                    if ($latestApproval->requested_name === 'Unknown' && !empty($latestApproval->requested_by)) {
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

            $createdByUser = null;
            if (!empty($torpr->created_by_user_id)) {
                $createdByUser = DB::table('users')
                    ->select(['id', 'name'])
                    ->where('id', $torpr->created_by_user_id)
                    ->first();
            }

            $result = (object) [
                'id' => $torpr->id,
                'nomor_pr' => $torpr->nomor_pr,
                'tujuan_pengadaan' => $torpr->tujuan_pengadaan,
                'portofolio' => $torpr->portofolio ?? null,
                'tanggal_pr' => $this->parseDate($torpr->tanggal_pr),
                'tgl_ttd_kabid_pr' => $this->parseDate($torpr->tgl_ttd_kabid_pr),
                'tgl_ttd_kacab_pr' => $this->parseDate($torpr->tgl_ttd_kacab_pr),
                'jumlah_pr' => $torpr->jumlah_pr,
                'received_at' => $this->parseDate($torpr->received_at),
                'created_at' => $this->parseDate($torpr->created_at),
                'updated_at' => $this->parseDate($torpr->updated_at),
                'signed_by_kabid_name' => $torpr->signed_by_kabid_name ?: ($torpr->tgl_ttd_kabid_pr ? ($createdByUser?->name ?? null) : null),
                'signed_by_kacab_name' => $torpr->signed_by_kacab_name ?: ($torpr->tgl_ttd_kacab_pr ? ($createdByUser?->name ?? null) : null),
                'sign_token_kabid' => $torpr->sign_token_kabid,
                'sign_token_kacab' => $torpr->sign_token_kacab,
                'latestReceiptApproval' => $latestApproval,
                'receivedByUmum' => $receivedByUser,
                'createdBy' => $createdByUser,
            ];

            $linkedPpbj = $this->findLinkedPpbj($torpr->nomor_pr);
            $result->linked_ppbj = $linkedPpbj;
            $result->audit_details = $this->buildPrAuditDetails($result, $latestApproval, $linkedPpbj);
            $result->stuck_reminders = $this->buildPrStuckReminders($result, $latestApproval, $linkedPpbj);

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
        $cacheKey = 'tracking_ppbj_' . md5(strtolower($nomor)) . '_v7';
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

    private function findLinkedPpbj(string $nomorPr): ?object
    {
        try {
            $ppbj = DB::table('ppbj')
                ->select([
                    'id', 'ppbj_no', 'tgl_ppbj', 'tgl_terima_pr', 'tgl_diserahkan',
                    'uraian', 'buyer', 'portofolio', 'metode_pengadaan', 'penyedia_eksternal',
                    'spph_rfq_1', 'tgl_spph', 'sph', 'tgl_sph', 'awarding_sp', 'tgl_awarding_sp',
                    'tgl_spk', 'nilai_sp_spk', 'bpg_no', 'tgl_bpg', 'no_invoice', 'tgl_invoice',
                    'progres', 'status_sla', 'sisa_target_sla', 'status', 'cancel_reason',
                    'created_at', 'updated_at',
                ])
                ->where('ppbj_no', $nomorPr)
                ->first();

            if (!$ppbj) {
                return null;
            }

            foreach ([
                'tgl_ppbj', 'tgl_terima_pr', 'tgl_diserahkan', 'tgl_spph', 'tgl_sph',
                'tgl_awarding_sp', 'tgl_spk', 'tgl_bpg', 'tgl_invoice', 'created_at', 'updated_at',
            ] as $field) {
                $ppbj->{$field} = $this->parseDate($ppbj->{$field} ?? null);
            }

            $ppbj->progres = (int) ($ppbj->progres ?? 0);

            return $ppbj;
        } catch (\Exception $e) {
            Log::warning('findLinkedPpbj failed: ' . $e->getMessage());
            return null;
        }
    }

    private function buildPrAuditDetails(object $row, ?object $latestApproval, ?object $ppbj): array
    {
        $events = [];

        $add = function (?Carbon $time, string $title, string $desc, string $status = 'done') use (&$events) {
            $events[] = [
                'time' => $time?->format('d M Y H:i') ?? '-',
                'title' => $title,
                'desc' => $desc,
                'status' => $status,
            ];
        };

        $add($row->created_at ?: $row->tanggal_pr, 'Input PR Operasional', 'Dibuat oleh ' . ($row->createdBy?->name ?? 'Tidak Diketahui') . '.');

        if ($row->tanggal_pr) {
            $add($row->tanggal_pr, 'Tanggal PR tercatat', 'Nomor PR ' . $row->nomor_pr . ' mulai menjadi kunci tracking.');
        }

        if ($row->tgl_ttd_kabid_pr) {
            $method = is_null($row->sign_token_kabid) ? 'QR Token' : 'Manual';
            $add($row->tgl_ttd_kabid_pr, 'Persetujuan Kepala Bidang', 'Ditandatangani oleh ' . ($row->signed_by_kabid_name ?? 'Kepala Bidang') . ' melalui ' . $method . '.');
        }

        if ($row->tgl_ttd_kacab_pr) {
            $method = is_null($row->sign_token_kacab) ? 'QR Token' : 'Manual';
            $add($row->tgl_ttd_kacab_pr, 'Persetujuan Kepala Cabang', 'Ditandatangani oleh ' . ($row->signed_by_kacab_name ?? 'Kepala Cabang') . ' melalui ' . $method . '.');
        }

        if ($latestApproval) {
            $statusText = match ($latestApproval->status) {
                'APPROVED' => 'disetujui Bagian Umum',
                'REJECTED' => 'ditolak Bagian Umum',
                default => 'menunggu persetujuan Bagian Umum',
            };

            $add(
                $this->parseDate($latestApproval->requested_at ?? null),
                'Request ke Bagian Umum',
                'Dikirim oleh ' . ($latestApproval->requested_name ?? 'Unknown') . ' dan saat ini ' . $statusText . '.',
                $latestApproval->status === 'REJECTED' ? 'rejected' : ($latestApproval->status === 'PENDING' ? 'pending' : 'done')
            );

            if ($latestApproval->status === 'REJECTED') {
                $add(
                    $this->parseDate($latestApproval->rejected_at ?? $latestApproval->updated_at ?? null),
                    'Catatan Penolakan',
                    $latestApproval->rejected_reason ?? 'Tidak ada alasan penolakan yang dicatat.',
                    'rejected'
                );
            }
        }

        if ($row->received_at) {
            $add($row->received_at, 'PR diterima Bagian Umum', 'Diterima oleh ' . ($row->receivedByUmum?->name ?? $latestApproval?->approvedBy?->name ?? 'Bagian Umum') . '.');
        }

        if ($ppbj) {
            $add($ppbj->tgl_ppbj ?: $ppbj->created_at, 'Data PPBJ terbentuk', 'Buyer: ' . ($ppbj->buyer ?: 'Belum diisi') . ', portofolio: ' . ($ppbj->portofolio ?: 'Belum diisi') . '.');

            if ($ppbj->spph_rfq_1) {
                $add($ppbj->tgl_spph, 'SPPH/RFQ tercatat', 'Nomor: ' . $ppbj->spph_rfq_1 . '.');
            }
            if ($ppbj->awarding_sp) {
                $add($ppbj->tgl_awarding_sp, 'Surat Pesanan tercatat', 'Nomor: ' . $ppbj->awarding_sp . '.');
            }
            if ($ppbj->progres >= 100 || $ppbj->bpg_no || $ppbj->no_invoice) {
                $add($ppbj->updated_at, 'Proses PPBJ selesai/siap rekap', 'Progress ' . $ppbj->progres . '% dengan status SLA ' . ($ppbj->status_sla ?: '-') . '.');
            } else {
                $add($ppbj->updated_at, 'Progress PPBJ berjalan', 'Progress saat ini ' . $ppbj->progres . '% dengan status SLA ' . ($ppbj->status_sla ?: '-') . '.', 'pending');
            }
        }

        usort($events, function ($a, $b) {
            if ($a['time'] === '-') return 1;
            if ($b['time'] === '-') return -1;
            return strtotime($a['time']) <=> strtotime($b['time']);
        });

        return $events;
    }

    private function buildPrStuckReminders(object $row, ?object $latestApproval, ?object $ppbj): array
    {
        $reminders = [];
        $now = now();

        $push = function (string $level, string $title, string $message, ?Carbon $since = null) use (&$reminders, $now) {
            $days = $since ? $this->wholeDaysSince($since, $now) : null;
            $reminders[] = compact('level', 'title', 'message', 'days');
        };

        if (!$row->tgl_ttd_kabid_pr && $row->tanggal_pr && $this->wholeDaysSince($row->tanggal_pr, $now) >= 2) {
            $push('warning', 'PR menunggu TTD Kabid', 'Tanggal PR sudah tercatat, namun tanggal TTD Kepala Bidang belum ada.', $row->tanggal_pr);
        }

        if ($row->tgl_ttd_kabid_pr && !$row->tgl_ttd_kacab_pr && $this->wholeDaysSince($row->tgl_ttd_kabid_pr, $now) >= 2) {
            $push('warning', 'PR menunggu TTD Kacab', 'Kabid sudah tanda tangan, namun tanggal TTD Kepala Cabang belum ada.', $row->tgl_ttd_kabid_pr);
        }

        if ($row->tgl_ttd_kacab_pr && !$latestApproval && $this->wholeDaysSince($row->tgl_ttd_kacab_pr, $now) >= 1) {
            $push('info', 'Belum request ke Bagian Umum', 'PR sudah lengkap tanda tangan, namun belum ada request penerimaan ke Bagian Umum.', $row->tgl_ttd_kacab_pr);
        }

        if ($latestApproval && $latestApproval->status === 'PENDING') {
            $requestedAt = $this->parseDate($latestApproval->requested_at ?? null);
            if ($requestedAt && $this->wholeDaysSince($requestedAt, $now) >= 2) {
                $push('danger', 'Request PR macet di approval Umum', 'Request sudah pending lebih dari 2 hari. Perlu follow up ke Bagian Umum.', $requestedAt);
            }
        }

        if ($row->received_at && !$ppbj && $this->wholeDaysSince($row->received_at, $now) >= 2) {
            $push('warning', 'Belum masuk data PPBJ', 'PR sudah diterima Umum, namun belum ditemukan data PPBJ dengan nomor yang sama.', $row->received_at);
        }

        if ($ppbj && $ppbj->progres < 100) {
            $lastMove = $ppbj->updated_at ?: $ppbj->tgl_ppbj ?: $row->received_at;
            if ($lastMove && $this->wholeDaysSince($lastMove, $now) >= 3) {
                $push('danger', 'Progress PPBJ belum bergerak', 'Data PPBJ belum selesai dan tidak berubah minimal 3 hari.', $lastMove);
            }
        }

        if (empty($reminders)) {
            $reminders[] = [
                'level' => 'success',
                'title' => 'Tidak ada indikasi PR macet',
                'message' => 'Alur PR masih terbaca normal berdasarkan data tanggal dan status terakhir.',
                'days' => null,
            ];
        }

        return $reminders;
    }

    private function wholeDaysSince(Carbon $since, Carbon $now): int
    {
        return max(0, (int) floor($since->diffInDays($now)));
    }

    private function searchLike(string $keyword): ?array
    {
        $results = [];
        $allowContains = mb_strlen($keyword) >= 3;

        try {
            $prMatches = DB::table('torprs')
                ->select(['nomor_pr', 'tujuan_pengadaan', 'portofolio'])
                ->whereNotNull('nomor_pr')
                ->where('nomor_pr', '!=', '')
                ->where(function ($query) use ($keyword, $allowContains) {
                    $query->where('nomor_pr', 'like', $keyword . '%');

                    if ($allowContains) {
                        $query->orWhere('nomor_pr', 'like', '%' . $keyword . '%')
                            ->orWhere('tujuan_pengadaan', 'like', '%' . $keyword . '%')
                            ->orWhere('portofolio', 'like', '%' . $keyword . '%');
                    }
                })
                ->orderByRaw("CASE WHEN nomor_pr = ? THEN 0 WHEN nomor_pr LIKE ? THEN 1 WHEN nomor_pr LIKE ? THEN 2 ELSE 3 END", [$keyword, $keyword . '%', '%' . $keyword . '%'])
                ->orderBy('tanggal_pr', 'DESC')
                ->limit(8)
                ->get();

            foreach ($prMatches as $pr) {
                $results[] = [
                    'nomor' => $pr->nomor_pr,
                    'tujuan' => trim(($pr->tujuan_pengadaan ?? '-') . ($pr->portofolio ? ' • ' . $pr->portofolio : '')),
                    'type' => 'pr',
                    'type_label' => 'PR',
                ];
            }
        } catch (\Exception $e) {}

        try {
            $prNumbers = array_column($results, 'nomor');

            $ppbjMatches = DB::table('ppbj')
                ->select(['ppbj_no', 'uraian', 'buyer', 'portofolio', 'metode_pengadaan', 'penyedia_eksternal', 'spph_rfq_1', 'awarding_sp'])
                ->whereNotNull('ppbj_no')
                ->where('ppbj_no', '!=', '')
                ->when($prNumbers, fn($q, $nums) => $q->whereNotIn('ppbj_no', $nums))
                ->where(function ($query) use ($keyword, $allowContains) {
                    $query->where('ppbj_no', 'like', $keyword . '%');

                    if ($allowContains) {
                        $query->orWhere('ppbj_no', 'like', '%' . $keyword . '%')
                            ->orWhere('uraian', 'like', '%' . $keyword . '%')
                            ->orWhere('buyer', 'like', '%' . $keyword . '%')
                            ->orWhere('portofolio', 'like', '%' . $keyword . '%')
                            ->orWhere('metode_pengadaan', 'like', '%' . $keyword . '%')
                            ->orWhere('penyedia_eksternal', 'like', '%' . $keyword . '%')
                            ->orWhere('spph_rfq_1', 'like', '%' . $keyword . '%')
                            ->orWhere('awarding_sp', 'like', '%' . $keyword . '%');
                    }
                })
                ->orderByRaw("CASE WHEN ppbj_no = ? THEN 0 WHEN ppbj_no LIKE ? THEN 1 WHEN ppbj_no LIKE ? THEN 2 ELSE 3 END", [$keyword, $keyword . '%', '%' . $keyword . '%'])
                ->orderBy('tgl_ppbj', 'DESC')
                ->limit(8)
                ->get();

            foreach ($ppbjMatches as $p) {
                $meta = array_filter([$p->buyer ?? null, $p->portofolio ?? null, $p->penyedia_eksternal ?? null]);
                $results[] = [
                    'nomor' => $p->ppbj_no,
                    'tujuan' => trim(($p->uraian ?? '-') . (!empty($meta) ? ' • ' . implode(' • ', $meta) : '')),
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

            $cacheKey = 'tracking_suggest_' . md5(strtolower($q)) . '_v8';
            $cached = Cache::get($cacheKey);
            if ($cached !== null) return response()->json(['items' => $cached]);

            $items = [];
            $allowContains = mb_strlen($q) >= 3;

            try {
                $prResults = DB::table('torprs')
                    ->select(['nomor_pr', 'tujuan_pengadaan', 'portofolio', 'tanggal_pr'])
                    ->whereNotNull('nomor_pr')
                    ->where('nomor_pr', '!=', '')
                    ->where(function ($query) use ($q, $allowContains) {
                        $query->where('nomor_pr', 'like', $q . '%');

                        if ($allowContains) {
                            $query->orWhere('nomor_pr', 'like', '%' . $q . '%')
                                ->orWhere('tujuan_pengadaan', 'like', '%' . $q . '%')
                                ->orWhere('portofolio', 'like', '%' . $q . '%');
                        }
                    })
                    ->orderByRaw("CASE WHEN nomor_pr = ? THEN 0 WHEN nomor_pr LIKE ? THEN 1 WHEN nomor_pr LIKE ? THEN 2 ELSE 3 END", [$q, $q . '%', '%' . $q . '%'])
                    ->orderBy('tanggal_pr', 'DESC')
                    ->limit(8)
                    ->get()
                    ->map(fn ($r) => [
                        'nomor' => $r->nomor_pr,
                        'label' => $r->nomor_pr,
                        'tujuan' => $this->shortText(trim(($r->tujuan_pengadaan ?: '-') . ($r->portofolio ? ' • ' . $r->portofolio : '')), 70),
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
                    ->select(['ppbj_no', 'uraian', 'tgl_ppbj', 'buyer', 'portofolio', 'metode_pengadaan', 'penyedia_eksternal', 'spph_rfq_1', 'awarding_sp'])
                    ->whereNotNull('ppbj_no')
                    ->where('ppbj_no', '!=', '')
                    ->when($prNumbers, fn($query, $nums) => $query->whereNotIn('ppbj_no', $nums))
                    ->where(function ($query) use ($q, $allowContains) {
                        $query->where('ppbj_no', 'like', $q . '%');

                        if ($allowContains) {
                            $query->orWhere('ppbj_no', 'like', '%' . $q . '%')
                                ->orWhere('uraian', 'like', '%' . $q . '%')
                                ->orWhere('buyer', 'like', '%' . $q . '%')
                                ->orWhere('portofolio', 'like', '%' . $q . '%')
                                ->orWhere('metode_pengadaan', 'like', '%' . $q . '%')
                                ->orWhere('penyedia_eksternal', 'like', '%' . $q . '%')
                                ->orWhere('spph_rfq_1', 'like', '%' . $q . '%')
                                ->orWhere('awarding_sp', 'like', '%' . $q . '%');
                        }
                    })
                    ->orderByRaw("CASE WHEN ppbj_no = ? THEN 0 WHEN ppbj_no LIKE ? THEN 1 WHEN ppbj_no LIKE ? THEN 2 ELSE 3 END", [$q, $q . '%', '%' . $q . '%'])
                    ->orderBy('tgl_ppbj', 'DESC')
                    ->limit(6)
                    ->get()
                    ->map(function ($r) {
                        $meta = array_filter([$r->buyer ?? null, $r->portofolio ?? null, $r->penyedia_eksternal ?? null]);

                        return [
                            'nomor' => $r->ppbj_no,
                            'label' => $r->ppbj_no,
                            'tujuan' => $this->shortText(trim(($r->uraian ?: ($r->metode_pengadaan ?? 'PPBJ Manual')) . (!empty($meta) ? ' • ' . implode(' • ', $meta) : '')), 70),
                            'tanggal' => $this->parseDate($r->tgl_ppbj)?->format('Y-m-d'),
                            'source_type' => 'ppbj',
                            'source_label' => 'PPBJ',
                        ];
                    })
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

    private function shortText(?string $text, int $limit = 70): string
    {
        $text = trim((string) $text);
        if ($text === '') {
            return '-';
        }

        return mb_strlen($text) > $limit ? mb_substr($text, 0, $limit) . '...' : $text;
    }

    public function clearCache(Request $request)
    {
        $nomor = $request->get('nomor_pr');
        if (!$nomor) return response()->json(['success' => false], 400);

        $cleared = [];
        foreach (['_v1', '_v2', '_v3', '_v4', '_v5', '_v6', '_v7', '_v8', '_v9', '_v10'] as $v) {
            if (Cache::forget('tracking_pr_' . md5(strtolower($nomor)) . $v)) $cleared[] = 'PR';
            if (Cache::forget('tracking_ppbj_' . md5(strtolower($nomor)) . $v)) $cleared[] = 'PPBJ';
        }

        return response()->json(['success' => true, 'message' => implode(', ', array_unique($cleared))]);
    }
}
