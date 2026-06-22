<?php

namespace App\Http\Controllers;

use App\Models\PrReceiptApproval;
use App\Models\Ppbj;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class PrReceiptApprovalController extends Controller
{
    private const STATUS_PENDING = 'PENDING';
    private const STATUS_APPROVED = 'APPROVED';
    private const STATUS_REJECTED = 'REJECTED';

    private const CACHE_KEY_PENDING_COUNT = 'pr_receipt_pending_count';
    private const CACHE_TTL_SECONDS = 300; // sesuaikan: 10 / 30 / 60 detik

    public function index(Request $request)
    {
        $q = PrReceiptApproval::query()
            ->with(['torpr', 'requestedBy', 'approvedBy', 'rejectedBy'])
            ->latest();

        if ($s = $request->get('q')) {
            $q->whereHas('torpr', fn($x) => $x->where('nomor_pr', 'like', "%{$s}%"));
        }

        if ($status = $request->get('status')) {
            $q->where('status', $status);
        } else {
            $q->where('status', self::STATUS_PENDING);
        }

        $rows = $q->paginate(10)->withQueryString();

        return view('approval.pr_receipts', compact('rows'));
    }

    public function pendingCount(Request $request)
    {
        if (!$request->ajax()) {
            abort(404);
        }

        $count = Cache::remember(self::CACHE_KEY_PENDING_COUNT, 10, function () {
            return PrReceiptApproval::where('status', self::STATUS_PENDING)->count();
        });

        return response()->json(['count' => (int) $count]);
    }


    public function approve(Request $request, $id)
    {
        try {
            $result = DB::transaction(function () use ($id) {

                $appr = PrReceiptApproval::with('torpr')
                    ->lockForUpdate()
                    ->findOrFail($id);

                if ($appr->status !== self::STATUS_PENDING) {
                    return ['type' => 'error', 'msg' => 'Approval sudah diproses.'];
                }

                $torpr = $appr->torpr;

                if (!$torpr || !$torpr->nomor_pr) {
                    return ['type' => 'error', 'msg' => 'Nomor PR kosong. Tidak bisa approve.'];
                }

                // 1) update approval
                $appr->update([
                    'status' => self::STATUS_APPROVED,
                    'approved_by_user_id' => auth()->id(),
                    'approved_at' => now(),
                    'rejected_reason' => null,
                ]);

                // 2) update torpr received
                $torpr->update([
                    'received_by_umum_user_id' => auth()->id(),
                    'received_at' => now(),
                ]);

                // 3) insert/update ke PPBJ (ppbj_no unik)
                //    - jika sudah ada, jangan buat baru (warning)
                try {
                    $ppbj = Ppbj::firstOrCreate(
                        ['ppbj_no' => $torpr->nomor_pr],
                        [
                            'tgl_terima_pr' => now()->toDateString(),
                            'uraian' => $torpr->tujuan_pengadaan,
                            'total_sebelum_ppn' => (float) ($torpr->jumlah_pr ?? 0),
                        ]
                    );

                    if (!$ppbj->wasRecentlyCreated) {
                        // reset cache count karena status berubah
                        Cache::forget(self::CACHE_KEY_PENDING_COUNT);

                        return [
                            'type' => 'warning',
                            'msg' => 'PR berhasil dikonfirmasi diterima Umum. Tetapi PPBJ tidak dibuat karena nomor sudah ada: ' . $torpr->nomor_pr
                        ];
                    }

                } catch (QueryException $e) {
                    // fallback kalau race-condition unique
                    Cache::forget(self::CACHE_KEY_PENDING_COUNT);

                    return [
                        'type' => 'warning',
                        'msg' => 'PR berhasil dikonfirmasi diterima Umum. Tetapi PPBJ gagal dibuat karena nomor sudah ada: ' . $torpr->nomor_pr
                    ];
                }

                // reset cache count karena status berubah
                Cache::forget(self::CACHE_KEY_PENDING_COUNT);

                return [
                    'type' => 'success',
                    'msg' => 'PR berhasil dikonfirmasi diterima Umum dan PPBJ berhasil dibuat.'
                ];
            });

            if ($result['type'] === 'success') {
                return back()->with('success', $result['msg']);
            }
            if ($result['type'] === 'warning') {
                return back()->with('warning', $result['msg']);
            }
            return back()->with('error', $result['msg']);

        } catch (\Throwable $e) {
            \Log::error('Approval penerimaan PR gagal', ['error' => $e->getMessage()]);
            return back()->with('error', 'Terjadi kesalahan server. Silakan coba lagi.');
        }
    }

    public function reject(Request $request, $id)
    {
        $appr = PrReceiptApproval::with('torpr')->findOrFail($id);

        if ($appr->status !== self::STATUS_PENDING) {
            return back()->with('error', 'Approval sudah diproses.');
        }

        $request->validate([
            'reason' => ['required', 'string', 'min:2', 'max:255'],
        ]);

        $appr->update([
            'status' => self::STATUS_REJECTED,
            'approved_by_user_id' => null,
            'rejected_by_user_id' => auth()->id(),
            'approved_at' => null,
            'rejected_at' => now(),                   
            'rejected_reason' => $request->reason,
        ]);

        // reset cache count karena status berubah
        Cache::forget(self::CACHE_KEY_PENDING_COUNT);

        return back()->with('success', 'Request ditolak.');
    }
}
