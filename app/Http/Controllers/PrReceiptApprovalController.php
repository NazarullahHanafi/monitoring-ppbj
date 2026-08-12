<?php

namespace App\Http\Controllers;

use App\Models\PrReceiptApproval;
use App\Models\Ppbj;
use App\Models\MasterBuyer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
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

                $buyerName = $this->buyerNameFromApprover(auth()->user());

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
                //    - buyer diisi dari user Umum yang approve
                try {
                    $existingPpbj = DB::table('ppbj')
                        ->where('ppbj_no', $torpr->nomor_pr)
                        ->lockForUpdate()
                        ->first();

                    if ($existingPpbj) {
                        $existingUpdates = [];

                        if ($buyerName && blank($existingPpbj->buyer ?? null)) {
                            $existingUpdates['buyer'] = $buyerName;
                        }

                        if (blank($existingPpbj->created_by_user_id ?? null) && Schema::hasColumn('ppbj', 'created_by_user_id')) {
                            $existingUpdates['created_by_user_id'] = auth()->id();
                        }

                        if (filled($torpr->portofolio) && blank($existingPpbj->portofolio ?? null)) {
                            $existingUpdates['portofolio'] = $torpr->portofolio;
                        }

                        $tanggalPpbj = $this->tanggalPpbjFromTorpr($torpr);
                        if ($tanggalPpbj && blank($existingPpbj->tgl_ppbj ?? null)) {
                            $existingUpdates['tgl_ppbj'] = $tanggalPpbj;
                        }

                        if (blank($existingPpbj->general_registration_number ?? null)) {
                            $existingUpdates = array_merge($existingUpdates, $this->generalRegistrationPayload());
                        }

                        if ($existingUpdates) {
                            $existingUpdates['updated_at'] = now();

                            DB::table('ppbj')
                                ->where('id', $existingPpbj->id)
                                ->update($existingUpdates);
                        }

                        // reset cache count karena status berubah
                        Cache::forget(self::CACHE_KEY_PENDING_COUNT);
                        $this->forgetTorprInfoCache((int) $torpr->id);

                        return [
                            'type' => 'warning',
                            'msg' => 'PR berhasil dikonfirmasi diterima Umum. Tetapi PPBJ tidak dibuat karena nomor sudah ada: ' . $torpr->nomor_pr
                        ];
                    }

                    DB::table('ppbj')->insert(array_merge(
                        $this->ppbjPayloadFromTorpr($torpr, $buyerName),
                        $this->generalRegistrationPayload()
                    ));

                } catch (QueryException $e) {
                    // fallback kalau race-condition unique
                    Cache::forget(self::CACHE_KEY_PENDING_COUNT);
                    $this->forgetTorprInfoCache((int) $torpr->id);

                    return [
                        'type' => 'warning',
                        'msg' => 'PR berhasil dikonfirmasi diterima Umum. Tetapi PPBJ gagal dibuat karena nomor sudah ada: ' . $torpr->nomor_pr
                    ];
                }

                // reset cache count karena status berubah
                Cache::forget(self::CACHE_KEY_PENDING_COUNT);
                $this->forgetTorprInfoCache((int) $torpr->id);

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

    private function buyerNameFromApprover($user): ?string
    {
        $name = trim((string) ($user?->buyer_name ?? ''));

        if ($name === '') {
            $name = trim((string) ($user?->name ?? ''));
        }

        if ($name === '') {
            return null;
        }

        $name = substr($name, 0, 50);

        $existingBuyerName = MasterBuyer::query()
            ->whereRaw('LOWER(nama) = ?', [strtolower($name)])
            ->value('nama');

        if ($existingBuyerName) {
            return $existingBuyerName;
        }

        MasterBuyer::create(['nama' => $name]);
        Cache::forget('master_buyers');

        return $name;
    }

    private function ppbjPayloadFromTorpr($torpr, ?string $buyerName): array
    {
        $total = (float) ($torpr->jumlah_pr ?? 0);
        $targetSla = Ppbj::hitungTargetSla($total);
        $sisaTargetSla = Ppbj::hitungSisaTarget($targetSla, now()->toDateString());
        $payload = [
            'ppbj_no' => $torpr->nomor_pr,
            'tgl_ppbj' => $this->tanggalPpbjFromTorpr($torpr),
            'tgl_terima_pr' => now()->toDateString(),
            'uraian' => $torpr->tujuan_pengadaan,
            'portofolio' => $torpr->portofolio,
            'buyer' => $buyerName,
            'created_by_user_id' => auth()->id(),
            'total_sebelum_ppn' => $total,
            'target_sla_hari' => $targetSla,
            'sisa_target_sla' => $sisaTargetSla,
            'realisasi_sla' => 0,
            'persentase_realisasi' => 0,
            'progres' => 0,
            'status_sla' => Ppbj::hitungStatusSla($sisaTargetSla, 0, null),
            'status' => 'ACTIVE',
            'created_at' => now(),
            'updated_at' => now(),
        ];

        return collect($payload)
            ->filter(fn($value, $column) => Schema::hasColumn('ppbj', $column))
            ->all();
    }

    private function generalRegistrationPayload(): array
    {
        if (! Schema::hasColumn('ppbj', 'general_registration_number')) {
            return [];
        }

        $now = now();
        $payload = [
            'general_registration_number' => $this->nextGeneralRegistrationNumber((int) $now->year),
            'general_registered_at' => $now,
            'general_registered_by_user_id' => auth()->id(),
        ];

        return collect($payload)
            ->filter(fn($value, $column) => Schema::hasColumn('ppbj', $column))
            ->all();
    }

    private function nextGeneralRegistrationNumber(int $year): string
    {
        $prefix = 'REG-UMUM/' . $year . '/';

        $lastNumber = DB::table('ppbj')
            ->where('general_registration_number', 'like', $prefix . '%')
            ->lockForUpdate()
            ->orderByRaw("CAST(SUBSTRING_INDEX(general_registration_number, '/', -1) AS UNSIGNED) DESC")
            ->value('general_registration_number');

        $next = 1;

        if ($lastNumber && preg_match('/(\d+)$/', (string) $lastNumber, $matches)) {
            $next = ((int) $matches[1]) + 1;
        }

        return $prefix . str_pad((string) $next, 3, '0', STR_PAD_LEFT);
    }

    private function tanggalPpbjFromTorpr($torpr): ?string
    {
        if (blank($torpr?->tanggal_pr ?? null)) {
            return null;
        }

        try {
            return Carbon::parse($torpr->tanggal_pr)->toDateString();
        } catch (\Throwable) {
            return null;
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
        $this->forgetTorprInfoCache((int) $appr->torpr_id);

        return back()->with('success', 'Request ditolak.');
    }

    private function forgetTorprInfoCache(int $torprId): void
    {
        Cache::forget("torpr_json_{$torprId}");
        Cache::forget("torpr_json_{$torprId}_v2");
    }
}
