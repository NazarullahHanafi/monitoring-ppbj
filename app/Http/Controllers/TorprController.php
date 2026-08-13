<?php

namespace App\Http\Controllers;

use App\Models\Torpr;
use App\Models\TorprEditRequest;
use App\Models\PrReceiptApproval;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\QueryException;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use App\Services\NotificationService;
use App\Services\PrArchiveService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\MasterPortofolio;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class TorprController extends Controller
{

    public function index(Request $request)
    {
        $query = DB::table('torprs')
            ->select([
                'torprs.id',
                'torprs.created_by_user_id',
                'torprs.nomor_pr',
                'torprs.tujuan_pengadaan',
                'torprs.portofolio',
                'torprs.jumlah_pr',
                'torprs.tanggal_pr',
                'torprs.received_at',
                'torprs.received_by_umum_user_id',
                'torprs.sign_token_kabid',
                'torprs.sign_token_kacab',
                'torprs.tgl_ttd_kabid_pr',
                'torprs.tgl_ttd_kacab_pr',
                'torprs.signed_by_kabid_name',
                'torprs.signed_by_kacab_name',
                'pra.id as approval_id',
                'pra.status as approval_status',
                'pra.requested_at as approval_requested_at',
                'pra.approved_at as approval_approved_at',
                'pra.rejected_at as approval_rejected_at',
                'pra.rejected_reason',
                'pra.approved_by_user_id',
                'u1.name as approved_by_name',
                'u2.name as received_by_name',
                'u3.name as creator_name',
                'u3.email as creator_email',
                'p.general_registration_number',
                'p.general_registered_at',
                'gu.name as general_registered_by_name',
            ])
            ->leftJoin(DB::raw('(
            SELECT pra1.* 
            FROM pr_receipt_approvals pra1
            INNER JOIN (
                SELECT torpr_id, MAX(id) as max_id
                FROM pr_receipt_approvals
                GROUP BY torpr_id
            ) pra2 ON pra1.torpr_id = pra2.torpr_id AND pra1.id = pra2.max_id
        ) as pra'), 'pra.torpr_id', '=', 'torprs.id')
            ->leftJoin('users as u1', 'pra.approved_by_user_id', '=', 'u1.id')
            ->leftJoin('users as u2', 'torprs.received_by_umum_user_id', '=', 'u2.id')
            ->leftJoin('users as u3', 'torprs.created_by_user_id', '=', 'u3.id')
            ->leftJoin('ppbj as p', 'p.ppbj_no', '=', 'torprs.nomor_pr')
            ->leftJoin('users as gu', 'p.general_registered_by_user_id', '=', 'gu.id');

        // ✅ SEARCH
        if ($search = trim((string) $request->get('q', ''))) {
            $query->where(function ($q) use ($search) {
                // UBAH 'like', $search . '%' MENJADI 'like', '%' . $search . '%'
                // Agar bisa mencari angka di tengah atau belakang (contoh: mencari '001' di 'PR/2026/001')
                $q->where('torprs.nomor_pr', 'like', '%' . $search . '%')
                    ->orWhere('torprs.tujuan_pengadaan', 'like', '%' . $search . '%')
                    ->orWhere('torprs.portofolio', 'like', '%' . $search . '%')
                    ->orWhere('p.general_registration_number', 'like', '%' . $search . '%');
            });
        }

        // ✅ STATUS FILTER
        if ($status = $request->get('receipt_status')) {
            $query->where('pra.status', $status);
        }

        // ✅ FILTER PORTOFOLIO MULTIPLE
        // Bisa pilih 1, 2, 3, atau banyak portofolio sekaligus dari Select2 multiple.
        $selectedPortofolios = array_values(array_filter(array_map(
            fn($value) => trim((string) $value),
            (array) $request->input('portofolio', [])
        )));

        if (!empty($selectedPortofolios)) {
            $query->whereIn('torprs.portofolio', $selectedPortofolios);
        }

        if ($request->get('data_owner') === 'me') {
            $query->where('torprs.created_by_user_id', auth()->id());
        }

        if ($signStatus = $request->get('sign_status')) {
            if ($signStatus === 'unsigned_kabid') {
                $query->whereNull('torprs.tgl_ttd_kabid_pr');
            } elseif ($signStatus === 'unsigned_kacab') {
                $query->whereNull('torprs.tgl_ttd_kacab_pr');
            } elseif ($signStatus === 'signed_all') {
                $query->whereNotNull('torprs.tgl_ttd_kabid_pr')
                    ->whereNotNull('torprs.tgl_ttd_kacab_pr');
            }
        }

        if ($request->filled('incomplete_data')) {
            $query->where(function ($q) {
                $q->whereNull('torprs.tujuan_pengadaan')
                    ->orWhereRaw("TRIM(COALESCE(torprs.tujuan_pengadaan, '')) = ''")
                    ->orWhereNull('torprs.portofolio')
                    ->orWhereRaw("TRIM(COALESCE(torprs.portofolio, '')) = ''")
                    ->orWhereNull('torprs.nomor_pr')
                    ->orWhereRaw("TRIM(COALESCE(torprs.nomor_pr, '')) = ''")
                    ->orWhereNull('torprs.tanggal_pr')
                    ->orWhereNull('torprs.jumlah_pr')
                    ->orWhere('torprs.jumlah_pr', '<=', 0)
                    ->orWhereNull('torprs.tgl_ttd_kabid_pr')
                    ->orWhereNull('torprs.tgl_ttd_kacab_pr');
            });
        }

        // ✅ ADVANCED DATE FILTER
        $dateFilter = $request->get('date_filter');

        if ($dateFilter) {
            switch ($dateFilter) {
                case 'today':
                    $query->whereDate('torprs.tanggal_pr', Carbon::today());
                    break;

                case 'yesterday':
                    $query->whereDate('torprs.tanggal_pr', Carbon::yesterday());
                    break;

                case 'last7days':
                    $query->whereBetween('torprs.tanggal_pr', [
                        Carbon::now()->subDays(7)->startOfDay(),
                        Carbon::now()->endOfDay()
                    ]);
                    break;

                case 'last30days':
                    $query->whereBetween('torprs.tanggal_pr', [
                        Carbon::now()->subDays(30)->startOfDay(),
                        Carbon::now()->endOfDay()
                    ]);
                    break;

                case 'this_month':
                    $query->whereYear('torprs.tanggal_pr', Carbon::now()->year)
                        ->whereMonth('torprs.tanggal_pr', Carbon::now()->month);
                    break;

                case 'last_month':
                    $lastMonth = Carbon::now()->subMonth();
                    $query->whereYear('torprs.tanggal_pr', $lastMonth->year)
                        ->whereMonth('torprs.tanggal_pr', $lastMonth->month);
                    break;

                case 'this_year':
                    $query->whereYear('torprs.tanggal_pr', Carbon::now()->year);
                    break;

                case 'custom':
                    $dateFrom = $request->get('date_from');
                    $dateTo = $request->get('date_to');

                    if ($dateFrom && $dateTo) {
                        $query->whereBetween('torprs.tanggal_pr', [
                            Carbon::parse($dateFrom)->startOfDay(),
                            Carbon::parse($dateTo)->endOfDay()
                        ]);
                    } elseif ($dateFrom) {
                        $query->whereDate('torprs.tanggal_pr', '>=', Carbon::parse($dateFrom));
                    } elseif ($dateTo) {
                        $query->whereDate('torprs.tanggal_pr', '<=', Carbon::parse($dateTo));
                    }
                    break;
            }
        }

        $perPage = (int) $request->get('per_page', 10);
        $perPage = in_array($perPage, [10, 25, 50, 100]) ? $perPage : 25;

        $query->orderBy('torprs.id', 'desc');

        $rows = $query->paginate($perPage)->withQueryString();
        $isHeavy = $rows->count() > 40;
        $rowIds = collect($rows->items())->pluck('id')->filter()->values();

        $editAccessRequests = TorprEditRequest::with(['requester:id,name,email', 'owner:id,name,email'])
            ->where('requester_user_id', auth()->id())
            ->whereIn('torpr_id', $rowIds)
            ->whereIn('status', ['pending', 'approved'])
            ->where(function ($q) {
                $q->where('status', 'pending')
                    ->orWhere(function ($q) {
                        $q->where('status', 'approved')
                            ->where('expires_at', '>', now());
                    });
            })
            ->latest('id')
            ->get()
            ->unique('torpr_id')
            ->keyBy('torpr_id');

        $incomingEditRequests = TorprEditRequest::with(['torpr:id,nomor_pr,tujuan_pengadaan', 'requester:id,name,email'])
            ->where('owner_user_id', auth()->id())
            ->where('status', 'pending')
            ->latest('id')
            ->limit(25)
            ->get();

        $outgoingEditRequests = TorprEditRequest::with(['torpr:id,nomor_pr,tujuan_pengadaan', 'owner:id,name,email'])
            ->where('requester_user_id', auth()->id())
            ->latest('id')
            ->limit(15)
            ->get();

        $editPermissionLogs = \App\Models\ActivityLog::with('user:id,name')
            ->where('model_type', Torpr::class)
            ->whereIn('model_id', $rowIds)
            ->where('action', 'updated_with_edit_permission')
            ->latest('id')
            ->get()
            ->unique('model_id')
            ->keyBy('model_id');

        // ✅ Ambil master portofolio yang sama dengan PPBJ
        $portofolios = Cache::remember('master_portofolios', 3600, function () {
            return MasterPortofolio::orderBy('nama')->pluck('nama')->toArray();
        });

        return view('torpr.index', compact(
            'rows',
            'isHeavy',
            'portofolios',
            'editAccessRequests',
            'incomingEditRequests',
            'outgoingEditRequests',
            'editPermissionLogs'
        ));
    }

    public function myProgress(Request $request)
    {
        $user = $request->user();
        abort_unless($user, 403);

        $limit = min(max((int) $request->integer('limit', 50), 10), 80);

        $torprs = DB::table('torprs as t')
            ->select([
                't.id',
                't.nomor_pr',
                't.tujuan_pengadaan',
                't.portofolio',
                't.jumlah_pr',
                't.tanggal_pr',
                't.tgl_ttd_kabid_pr',
                't.tgl_ttd_kacab_pr',
                't.received_at',
                't.created_at',
                't.updated_at',
            ])
            ->where('t.created_by_user_id', $user->id)
            ->orderByDesc('t.id')
            ->limit($limit)
            ->get();

        $nomorPrs = $torprs
            ->pluck('nomor_pr')
            ->filter(fn ($value) => filled($value))
            ->map(fn ($value) => trim((string) $value))
            ->unique()
            ->values();

        $ppbjByNumber = $nomorPrs->isEmpty()
            ? collect()
            : DB::table('ppbj')
                ->select([
                    'id',
                    'ppbj_no',
                    'uraian',
                    'buyer',
                    'portofolio',
                    'penyedia_eksternal',
                    'spph_rfq_1',
                    'tgl_spph',
                    'awarding_sp',
                    'tgl_awarding_sp',
                    'nilai_sp_spk',
                    'promised_date',
                    'goods_arrived_at',
                    'goods_confirmed_at',
                    'bpg_no',
                    'no_invoice',
                    'progres',
                    'status_sla',
                    'sisa_target_sla',
                    'status',
                    'cancel_reason',
                    'general_registration_number',
                    'general_registered_at',
                    'updated_at',
                ])
                ->whereIn('ppbj_no', $nomorPrs)
                ->get()
                ->keyBy(fn ($row) => trim((string) $row->ppbj_no));

        $approvalByTorpr = $torprs->isEmpty()
            ? collect()
            : DB::table('pr_receipt_approvals as pra')
                ->select([
                    'pra.torpr_id',
                    'pra.status',
                    'pra.requested_at',
                    'pra.approved_at',
                    'pra.rejected_at',
                    'pra.rejected_reason',
                ])
                ->join(DB::raw('(
                    SELECT torpr_id, MAX(id) as max_id
                    FROM pr_receipt_approvals
                    GROUP BY torpr_id
                ) latest_pra'), function ($join) {
                    $join->on('pra.torpr_id', '=', 'latest_pra.torpr_id')
                        ->on('pra.id', '=', 'latest_pra.max_id');
                })
                ->whereIn('pra.torpr_id', $torprs->pluck('id')->all())
                ->get()
                ->keyBy('torpr_id');

        $formatDate = fn ($value) => filled($value)
            ? Carbon::parse($value)->timezone(config('app.timezone'))->format('d M Y H:i')
            : null;

        $items = $torprs->map(function ($torpr) use ($ppbjByNumber, $approvalByTorpr, $formatDate) {
            $nomorPr = trim((string) ($torpr->nomor_pr ?? ''));
            $ppbj = $nomorPr !== '' ? $ppbjByNumber->get($nomorPr) : null;
            $approval = $approvalByTorpr->get($torpr->id);
            $progress = (int) round((float) ($ppbj->progres ?? 0));

            if ($progress <= 0) {
                $progress = filled($torpr->received_at) || ($approval?->status === 'APPROVED')
                    ? 20
                    : (filled($torpr->tgl_ttd_kabid_pr) && filled($torpr->tgl_ttd_kacab_pr) ? 15 : 5);
            }

            $statusLabel = 'Draft Operasional';
            $statusTone = 'slate';
            $needsFollowUp = false;

            if (($ppbj->status ?? null) === 'CANCELLED') {
                $statusLabel = 'Dibatalkan';
                $statusTone = 'red';
            } elseif ($ppbj && ((int) $progress >= 100 || ($ppbj->status_sla ?? '') === 'LENGKAP')) {
                $statusLabel = 'Selesai';
                $statusTone = 'emerald';
            } elseif ($ppbj) {
                $statusLabel = $ppbj->status_sla ?: 'Diproses Umum';
                $statusTone = in_array($statusLabel, ['OVERDUE', 'WARNING'], true) ? 'amber' : 'blue';
                $needsFollowUp = in_array($statusLabel, ['OVERDUE', 'WARNING'], true);
            } elseif ($approval?->status === 'PENDING') {
                $statusLabel = 'Menunggu Umum';
                $statusTone = 'amber';
                $needsFollowUp = true;
            } elseif ($approval?->status === 'REJECTED') {
                $statusLabel = 'Ditolak Umum';
                $statusTone = 'red';
                $needsFollowUp = true;
            } elseif ($approval?->status === 'APPROVED' || filled($torpr->received_at)) {
                $statusLabel = 'Diterima Umum';
                $statusTone = 'blue';
            } elseif (blank($torpr->nomor_pr) || blank($torpr->tujuan_pengadaan) || blank($torpr->portofolio)) {
                $statusLabel = 'Perlu Lengkapi Data';
                $statusTone = 'amber';
                $needsFollowUp = true;
            }

            $stages = [
                ['label' => 'Input PR', 'done' => true, 'at' => $formatDate($torpr->tanggal_pr ?? $torpr->created_at)],
                ['label' => 'TTD Kabid', 'done' => filled($torpr->tgl_ttd_kabid_pr), 'at' => $formatDate($torpr->tgl_ttd_kabid_pr)],
                ['label' => 'TTD Kacab', 'done' => filled($torpr->tgl_ttd_kacab_pr), 'at' => $formatDate($torpr->tgl_ttd_kacab_pr)],
                ['label' => 'Umum Terima', 'done' => filled($torpr->received_at) || ($approval?->status === 'APPROVED'), 'at' => $formatDate($torpr->received_at ?? $approval?->approved_at)],
                ['label' => 'SPPH', 'done' => filled($ppbj->spph_rfq_1 ?? null), 'at' => $formatDate($ppbj->tgl_spph ?? null)],
                ['label' => 'SP/Kontrak', 'done' => filled($ppbj->awarding_sp ?? null), 'at' => $formatDate($ppbj->tgl_awarding_sp ?? null)],
                ['label' => 'Barang Datang', 'done' => filled($ppbj->goods_arrived_at ?? null), 'at' => $formatDate($ppbj->goods_arrived_at ?? null)],
                ['label' => 'Invoice', 'done' => filled($ppbj->no_invoice ?? null), 'at' => null],
            ];

            return [
                'id' => (int) $torpr->id,
                'nomor_pr' => $nomorPr !== '' ? $nomorPr : 'Nomor PR belum diisi',
                'tujuan' => $torpr->tujuan_pengadaan ?: '-',
                'portofolio' => $ppbj->portofolio ?? $torpr->portofolio ?? '-',
                'nilai_pr' => (float) ($torpr->jumlah_pr ?? 0),
                'nilai_pr_label' => 'Rp ' . number_format((float) ($torpr->jumlah_pr ?? 0), 0, ',', '.'),
                'tanggal_pr' => $formatDate($torpr->tanggal_pr),
                'status_label' => $statusLabel,
                'status_tone' => $statusTone,
                'progress' => min(100, max(0, $progress)),
                'sisa_sla' => $ppbj?->sisa_target_sla,
                'buyer' => $ppbj->buyer ?? '-',
                'vendor' => $ppbj->penyedia_eksternal ?? '-',
                'spph' => $ppbj->spph_rfq_1 ?? null,
                'sp' => $ppbj->awarding_sp ?? null,
                'general_registration_number' => $ppbj->general_registration_number ?? null,
                'general_registered_at' => $formatDate($ppbj->general_registered_at ?? null),
                'promised_date' => $formatDate($ppbj->promised_date ?? null),
                'goods_arrived_at' => $formatDate($ppbj->goods_arrived_at ?? null),
                'invoice' => $ppbj->no_invoice ?? null,
                'ppbj_id' => $ppbj?->id,
                'linked_ppbj' => (bool) $ppbj,
                'needs_follow_up' => $needsFollowUp,
                'tracking_url' => $nomorPr !== '' ? route('tracking.index', ['q' => $nomorPr]) : null,
                'stages' => $stages,
                'updated_at' => $formatDate($ppbj->updated_at ?? $torpr->updated_at),
            ];
        })->values();

        $summary = [
            'total' => $items->count(),
            'need_follow_up' => $items->where('needs_follow_up', true)->count(),
            'waiting_umum' => $items->where('status_label', 'Menunggu Umum')->count(),
            'in_progress' => $items->filter(fn ($item) => $item['linked_ppbj'] && $item['progress'] < 100)->count(),
            'done' => $items->where('status_label', 'Selesai')->count(),
        ];

        return response()->json([
            'summary' => $summary,
            'items' => $items,
            'limit' => $limit,
            'generated_at' => now()->timezone(config('app.timezone'))->format('d M Y H:i:s'),
        ], 200, [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    public function myProgressArchive(Request $request, PrArchiveService $archiveService)
    {
        $validated = $request->validate([
            'nomor_pr' => ['required', 'string', 'max:100'],
        ]);

        $nomorPr = trim($validated['nomor_pr']);
        abort_if($nomorPr === '' || $nomorPr === 'Nomor PR belum diisi', 422, 'Nomor PR belum tersedia.');

        $exists = Torpr::query()
            ->where('created_by_user_id', $request->user()->id)
            ->where('nomor_pr', $nomorPr)
            ->exists();

        abort_unless($exists, 403);

        $archive = $archiveService->findByPrNumber($nomorPr, $request->boolean('refresh'));

        return response()->json(array_merge([
            'nomor_pr' => $nomorPr,
        ], $archive), 200, [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    public function requestEditAccess(Request $request, $id)
    {
        $request->validate([
            'reason' => ['required', 'string', 'min:10', 'max:500'],
        ], [
            'reason.required' => 'Alasan request edit wajib diisi.',
            'reason.min' => 'Alasan request edit minimal 10 karakter.',
            'reason.max' => 'Alasan request edit maksimal 500 karakter.',
        ]);

        $user = $request->user();
        abort_unless($user && $user->department === 'operasional', 403);

        $torpr = Torpr::with(['latestReceiptApproval', 'createdBy'])->findOrFail($id);

        if ((int) $torpr->created_by_user_id === (int) $user->id) {
            return response()->json([
                'message' => 'Anda adalah pembuat PR ini, jadi tidak perlu request edit.',
            ], 422);
        }

        if ($torpr->latestReceiptApproval || $torpr->received_at) {
            return response()->json([
                'message' => 'PR sudah pernah diajukan ke Umum, sehingga edit request tidak bisa dibuat.',
            ], 422);
        }

        if (!$torpr->createdBy) {
            return response()->json([
                'message' => 'Pembuat PR tidak ditemukan, request edit tidak bisa dikirim.',
            ], 422);
        }

        $activeRequest = TorprEditRequest::where('torpr_id', $torpr->id)
            ->where('requester_user_id', $user->id)
            ->whereIn('status', ['pending', 'approved'])
            ->where(function ($q) {
                $q->where('status', 'pending')
                    ->orWhere(function ($q) {
                        $q->where('status', 'approved')
                            ->where('expires_at', '>', now());
                    });
            })
            ->latest('id')
            ->first();

        if ($activeRequest) {
            return response()->json([
                'message' => $activeRequest->status === 'pending'
                    ? 'Request edit untuk PR ini masih menunggu persetujuan pembuat.'
                    : 'Izin edit untuk PR ini masih aktif.',
                'status' => $activeRequest->status,
                'expires_at' => $activeRequest->expires_at?->toIso8601String(),
            ], 422);
        }

        $editRequest = TorprEditRequest::create([
            'torpr_id' => $torpr->id,
            'requester_user_id' => $user->id,
            'owner_user_id' => $torpr->created_by_user_id,
            'status' => 'pending',
            'reason' => $request->input('reason'),
        ]);

        $this->logActivity($torpr, 'edit_requested', "Request edit dikirim oleh {$user->name}", [
            'request_id' => $editRequest->id,
            'requester' => $user->name,
            'owner' => $torpr->createdBy?->name,
            'reason' => $editRequest->reason,
        ]);

        $this->notifyTorprEditRequestToChat($torpr, $editRequest, $user);

        return response()->json([
            'ok' => true,
            'message' => 'Request edit berhasil dikirim ke pembuat PR.',
        ]);
    }

    public function reviewEditAccess(Request $request, $id)
    {
        $data = $request->validate([
            'decision' => ['required', Rule::in(['approve', 'reject'])],
            'review_note' => ['nullable', 'string', 'max:500'],
        ]);

        if (($data['decision'] ?? null) === 'reject' && mb_strlen(trim((string) ($data['review_note'] ?? ''))) < 10) {
            return response()->json([
                'message' => 'Alasan penolakan wajib diisi minimal 10 karakter.',
                'errors' => [
                    'review_note' => ['Alasan penolakan wajib diisi minimal 10 karakter.'],
                ],
            ], 422);
        }

        $user = $request->user();
        abort_unless($user && $user->department === 'operasional', 403);

        $editRequest = TorprEditRequest::with(['torpr', 'requester'])->findOrFail($id);

        abort_unless(
            (int) $editRequest->owner_user_id === (int) $user->id,
            403,
            'Hanya pembuat PR yang dapat memproses request edit ini.'
        );

        if ($editRequest->status !== 'pending') {
            return response()->json([
                'message' => 'Request edit ini sudah diproses sebelumnya.',
            ], 422);
        }

        $isApproved = $data['decision'] === 'approve';

        $editRequest->update([
            'status' => $isApproved ? 'approved' : 'rejected',
            'reviewed_by_user_id' => $user->id,
            'review_note' => $data['review_note'] ?? null,
            'reviewed_at' => now(),
            'expires_at' => $isApproved ? now()->addHours(24) : null,
        ]);

        $this->logActivity($editRequest->torpr, $isApproved ? 'edit_approved' : 'edit_rejected', $isApproved
            ? "Request edit disetujui untuk {$editRequest->requester?->name}"
            : "Request edit ditolak untuk {$editRequest->requester?->name}", [
                'request_id' => $editRequest->id,
                'requester' => $editRequest->requester?->name,
                'reviewer' => $user->name,
                'expires_at' => $editRequest->expires_at?->toDateTimeString(),
                'review_note' => $editRequest->review_note,
            ]);

        return response()->json([
            'ok' => true,
            'message' => $isApproved
                ? 'Request edit disetujui. Izin edit aktif 24 jam untuk data PR ini saja.'
                : 'Request edit ditolak.',
        ]);
    }

    public function resubmitRejectedPr(Request $request, $id)
    {
        $request->validate([
            'requested_name' => ['required', 'string', 'min:2', 'max:120'],
            'resubmit_notes' => ['required', 'string', 'min:10', 'max:500'], // Catatan perbaikan
        ]);

        // ✅ Get TORPR dengan latest approval
        $torpr = Torpr::with('latestReceiptApproval')->findOrFail($id);

        $latest = $torpr->latestReceiptApproval;

        // ✅ VALIDASI: Hanya bisa resubmit jika status REJECTED
        if (!$latest || $latest->status !== 'REJECTED') {
            return response()->json([
                'message' => 'PR ini tidak dalam status REJECTED. Hanya PR yang ditolak yang bisa diajukan ulang.'
            ], 422);
        }

        if (!$this->canRequestUmum()) {
            return response()->json([
                'message' => 'Akses ditolak. Hanya Superadmin Operasional yang dapat mengajukan PR ke Umum.'
            ], 403);
        }

        // ✅ VALIDASI: Semua data wajib lengkap sebelum bisa diajukan ulang ke Umum
        $missing = $this->missingReceiptFields($torpr);

        if (!empty($missing)) {
            return response()->json([
                'message' => 'Data belum lengkap: ' . implode(', ', $missing),
            ], 422);
        }

        try {
            // ✅ CREATE approval baru dengan status PENDING
            $newApproval = PrReceiptApproval::create([
                'torpr_id' => $torpr->id,
                'requested_by_user_id' => auth()->id(),
                'requested_name' => $request->requested_name,
                'requested_at' => now(),
                'status' => 'PENDING',
                'resubmit_notes' => $request->resubmit_notes, // Catatan perbaikan
                'previous_rejection_id' => $latest->id, // Link ke rejection sebelumnya
            ]);

            $this->logActivity($torpr, 'resubmitted', "PR Diajukan ulang dengan catatan: {$request->resubmit_notes}");

            // ✅ INVALIDATE CACHE
            $this->forgetTorprJsonCache((int) $id);

            return response()->json([
                'ok' => true,
                'message' => 'PR berhasil diajukan ulang untuk review. Super Admin telah mendapat notifikasi.',
                'approval_id' => $newApproval->id,
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to resubmit PR', [
                'pr_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => 'Gagal mengajukan ulang PR. Silakan coba lagi.'
            ], 500);
        }
    }

    public function receiptStatusBulk(Request $request)
    {
        $ids = explode(',', $request->get('ids', ''));
        $ids = array_filter(array_map('intval', $ids));

        if (empty($ids) || count($ids) > 100) {
            return response()->json([]);
        }

        $data = DB::table('torprs as t')
            ->select([
                't.id',
                't.nomor_pr',
                't.received_at',
                'pra.status',
                'pra.rejected_reason',
                'u1.name as approved_by',
                'u2.name as rejected_by',
            ])
            ->leftJoin('pr_receipt_approvals as pra', function ($join) {
                $join->on('pra.torpr_id', '=', 't.id')
                    ->whereRaw('pra.id = (SELECT id FROM pr_receipt_approvals WHERE torpr_id = t.id ORDER BY id DESC LIMIT 1)');
            })
            ->leftJoin('users as u1', 'pra.approved_by_user_id', '=', 'u1.id')
            ->leftJoin('users as u2', 'pra.rejected_by_user_id', '=', 'u2.id')
            ->whereIn('t.id', $ids)
            ->get()
            ->keyBy('id');

        return response()->json($data);
    }

    public function store(Request $request)
    {
        $data = $this->validateTorpr($request, null);
        $data = $this->normalizeDateTimes($data);
        $data = $this->applyManualSignerNames($data, null);

        // ✅ FIX: Set created_by_user_id dari user yang login
        $data['created_by_user_id'] = auth()->id(); // <-- INI YANG KURANG!

        // Generate QR tokens
        $data['sign_token_kacab'] = \Illuminate\Support\Str::random(32);
        $data['sign_token_kabid'] = \Illuminate\Support\Str::random(32);
        $data['sign_token_kacab_expires_at'] = now()->addDays(7);
        $data['sign_token_kabid_expires_at'] = now()->addDays(7);

        try {
            $torpr = Torpr::create($data);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Nomor PR sudah dipakai oleh data lain. Silakan refresh halaman dan cek data terbaru.',
            ], 422);
        }

        $this->forgetTrackingCache($torpr);

        $this->logActivity($torpr, 'created', "PR Baru Dibuat: {$torpr->nomor_pr}");

        return response()->json(['ok' => true, 'id' => $torpr->id]);
    }

    public function showQuickSign($token, $type)
    {
        // Validate type
        if (!in_array($type, ['kacab', 'kabid'])) {
            abort(404, 'Invalid signature type');
        }

        if ($type === 'kacab') {
            // 1. Cek apakah sudah login
            if (!auth()->check()) {
                // Simpan intended URL agar bisa kembali setelah login
                return redirect()->guest(route('login'))->with('error', 'Silakan login sebagai Superadmin Operasional untuk menandatangani sebagai Kacab.');
            }

            // 2. Cek apakah role dan department sesuai
            $user = auth()->user();
            if (!($user->role === 'superadmin' && $user->department === 'operasional')) {
                abort(403, 'Akses Ditolak. Hanya Superadmin Operasional yang dapat menandatangani sebagai Kacab.');
            }
        }

        // Find PR by token
        $column = 'sign_token_' . $type;
        $torpr = Torpr::where($column, $token)->first();

        if (!$torpr) {
            return view('pr.invalid-token', ['type' => $type]);
        }

        if ($this->signTokenExpired($torpr, $type)) {
            return view('pr.invalid-token', ['type' => $type]);
        }

        // Check if already signed
        $ttdColumn = 'tgl_ttd_' . $type . '_pr';
        if ($torpr->{$ttdColumn}) {
            return view('pr.already-signed', [
                'torpr' => $torpr,
                'type' => $type,
                'signedAt' => $torpr->{$ttdColumn},
                'signedBy' => $torpr->{'signed_by_' . $type . '_name'}
            ]);
        }

        // Show confirmation page
        return view('pr.quick-sign', [
            'torpr' => $torpr,
            'type' => $type,
            'token' => $token
        ]);
    }

    public function processQuickSign(Request $request, $token, $type)
    {
        if ($type === 'kacab') {
            if (!auth()->check()) {
                return response()->json(['ok' => false, 'message' => 'Sesi habis. Silakan login kembali.'], 401);
            }

            $user = auth()->user();
            if (!($user->role === 'superadmin' && $user->department === 'operasional')) {
                return response()->json(['ok' => false, 'message' => 'Akses ditolak. Hanya Superadmin Operasional yang boleh TTD Kacab.'], 403);
            }
        }

        $request->validate([
            'signer_name' => ['required', 'string', 'min:3', 'max:100']
        ]);

        if (!in_array($type, ['kacab', 'kabid'])) {
            return response()->json(['ok' => false, 'message' => 'Invalid type'], 400);
        }

        $column = 'sign_token_' . $type;
        $torpr = Torpr::where($column, $token)->first();

        if (!$torpr) {
            return response()->json(['ok' => false, 'message' => 'Token tidak valid'], 404);
        }

        if ($this->signTokenExpired($torpr, $type)) {
            return response()->json(['ok' => false, 'message' => 'Token sudah kedaluwarsa. Silakan buat QR baru.'], 410);
        }

        $ttdColumn = 'tgl_ttd_' . $type . '_pr';
        $nameColumn = 'signed_by_' . $type . '_name';

        if ($torpr->{$ttdColumn}) {
            return response()->json([
                'ok' => false,
                'message' => 'PR sudah ditandatangani sebelumnya oleh ' . $torpr->{$nameColumn}
            ], 422);
        }

        // ✅ ALWAYS SAVE TTD (ini yang penting!)
        $torpr->update([
            $ttdColumn => now(),
            $nameColumn => $request->signer_name,
            $column => null,
            $column . '_expires_at' => null,
        ]);

        $this->forgetTorprJsonCache((int) $torpr->id);
        $this->forgetTrackingCache($torpr);

        \App\Models\ActivityLog::create([
            'user_id' => auth()->id(),
            'model_type' => Torpr::class,
            'model_id' => $torpr->id,
            'action' => "signed_{$type}",
            'description' => "Ditandatangani via QR oleh {$request->signer_name}",
        ]);

        \Log::info('QR Sign completed', [
            'pr_id' => $torpr->id,
            'pr_no' => $torpr->nomor_pr,
            'type' => $type,
            'signer' => $request->signer_name
        ]);

        return response()->json([
            'ok' => true,
            'message' => 'Tanda tangan berhasil dicatat!',
            'timestamp' => now()->format('d M Y H:i:s'),
            'signer' => $request->signer_name
        ]);
    }

    public function regenerateSignToken($id, $type)
    {
        $user = auth()->user();
        if (!$user || $user->role !== 'superadmin' || $user->department !== 'operasional') {
            return response()->json(['ok' => false, 'message' => 'Akses ditolak.'], 403);
        }

        if (!in_array($type, ['kacab', 'kabid'])) {
            return response()->json(['ok' => false, 'message' => 'Invalid type'], 400);
        }

        $torpr = Torpr::findOrFail($id);

        // Check permission (only if not signed yet)
        $ttdColumn = 'tgl_ttd_' . $type . '_pr';
        if ($torpr->{$ttdColumn}) {
            return response()->json([
                'ok' => false,
                'message' => 'Tidak bisa regenerate token untuk PR yang sudah ditandatangani'
            ], 422);
        }

        $column = 'sign_token_' . $type;
        $newToken = \Illuminate\Support\Str::random(32);

        $torpr->update([
            $column => $newToken,
            $column . '_expires_at' => now()->addDays(7),
        ]);

        return response()->json([
            'ok' => true,
            'message' => 'Token berhasil di-generate ulang',
            'new_token' => $newToken
        ]);
    }

    public function quickSignQr(string $token, string $type)
    {
        abort_unless(in_array($type, ['kacab', 'kabid'], true), 404);

        $column = 'sign_token_' . $type;
        $torpr = Torpr::where($column, $token)->firstOrFail();
        abort_if($this->signTokenExpired($torpr, $type), 410, 'Token tanda tangan sudah kedaluwarsa.');

        $svg = \SimpleSoftwareIO\QrCode\Facades\QrCode::format('svg')
            ->size(200)
            ->margin(1)
            ->generate(route('pr.quick-sign', ['token' => $token, 'type' => $type]));

        return response($svg, 200, [
            'Content-Type' => 'image/svg+xml',
            'Cache-Control' => 'private, no-store, max-age=0',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    private function signTokenExpired(Torpr $torpr, string $type): bool
    {
        $expiresAt = $torpr->{'sign_token_' . $type . '_expires_at'};

        return !$expiresAt || $expiresAt->isPast();
    }

    public function update(Request $request, $id)
    {
        $torpr = Torpr::with('latestReceiptApproval')->findOrFail($id);
        $this->ensureCanManageTorpr($torpr);
        $latest = $torpr->latestReceiptApproval;

        // 1. Cek Lock Status
        $lockedStatuses = ['PENDING', 'APPROVED', 'REJECTED'];
        $currentStatus = $latest?->status;
        if (in_array($currentStatus, $lockedStatuses, true)) {
            return response()->json([
                'message' => 'Data sudah terkunci karena status receipt: ' . $currentStatus
            ], 422);
        }

        // 2. Validasi & Normalisasi Data
        $data = $this->validateTorpr($request, $torpr->id);
        $data = $this->normalizeDateTimes($data);

        // Cek Hak Akses Kacab
        $user = auth()->user();
        $isSuperadminOps = ($user->role === 'superadmin' && $user->department === 'operasional');
        $isCreator = (int) $torpr->created_by_user_id === (int) $user->id;
        $activeEditPermission = (! $isSuperadminOps && ! $isCreator)
            ? $this->activeTorprEditPermission($torpr, $user)
            : null;
        $data = $this->applyManualSignerNames($data, $torpr);

        // ==========================================
        // LOGIKA TTD KABID (Berlaku untuk semua user)
        // ==========================================
        if (!empty($data['tgl_ttd_kabid_pr'])) {
            $oldKabid = $torpr->tgl_ttd_kabid_pr
                ? Carbon::parse($torpr->tgl_ttd_kabid_pr)->format('Y-m-d H:i:s')
                : null;
            $newKabid = $data['tgl_ttd_kabid_pr'];

            if ($oldKabid !== $newKabid) {
                // Tanggal berubah → catat nama user yang mengubah
                $data['signed_by_kabid_name'] = auth()->user()->name;
            } else {
                // Tidak berubah → pertahankan nama lama
                $data['signed_by_kabid_name'] = $torpr->signed_by_kabid_name ?: auth()->user()->name;
            }
        } else {
            // Tanggal dikosongkan → hapus nama juga
            $data['signed_by_kabid_name'] = null;
        }

        // ==========================================
        // LOGIKA TTD KACAB (Hanya Superadmin Ops)
        // ==========================================

        // Proteksi: Jika BUKAN Superadmin Ops, paksa pakai data lama
        if (!$isSuperadminOps) {
            $data['tgl_ttd_kacab_pr'] = $torpr->tgl_ttd_kacab_pr;
            $data['signed_by_kacab_name'] = $torpr->signed_by_kacab_name;
        } else {
            if (!empty($data['tgl_ttd_kacab_pr'])) {
                $oldKacab = $torpr->tgl_ttd_kacab_pr
                    ? Carbon::parse($torpr->tgl_ttd_kacab_pr)->format('Y-m-d H:i:s')
                    : null;
                $newKacab = $data['tgl_ttd_kacab_pr'];

                if ($oldKacab !== $newKacab) {
                    // Tanggal berubah → catat nama user yang mengubah
                    $data['signed_by_kacab_name'] = auth()->user()->name;
                } else {
                    // Tidak berubah → pertahankan nama lama
                    $data['signed_by_kacab_name'] = $torpr->signed_by_kacab_name ?: auth()->user()->name;
                }
            } else {
                // Tanggal dikosongkan → hapus nama juga
                $data['signed_by_kacab_name'] = null;
            }
        }

        // ==========================================
        // LOGGING PERUBAHAN
        // ==========================================
        $changes = [];
        $original = $torpr->getOriginal();
        $oldNomorPr = $torpr->nomor_pr;

        foreach ($data as $key => $value) {
            if (array_key_exists($key, $original)) {
                $oldVal = $original[$key];
                $newVal = $value;

                if ($oldVal != $newVal) {
                    $changes[$key] = [
                        'old' => $oldVal,
                        'new' => $newVal
                    ];
                }
            }
        }

        // Eksekusi Update
        try {
            $torpr->update($data);
            $torpr->refresh();
            $this->forgetTrackingCache($torpr, $oldNomorPr);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Nomor PR sudah dipakai oleh data lain. Silakan refresh halaman dan cek data terbaru.',
            ], 422);
        }

        // Simpan Log
        if (!empty($changes)) {
            $logChanges = $changes;
            $action = 'updated';
            $description = 'Data PR diperbarui';

            if ($activeEditPermission) {
                $action = 'updated_with_edit_permission';
                $description = 'Data PR diperbarui memakai izin Req Edit';
                $logChanges['_edit_permission'] = [
                    'request_id' => $activeEditPermission->id,
                    'requester_user_id' => $activeEditPermission->requester_user_id,
                    'owner_user_id' => $activeEditPermission->owner_user_id,
                    'reason' => $activeEditPermission->reason,
                    'expires_at' => $activeEditPermission->expires_at?->toDateTimeString(),
                ];
            }

            $this->logActivity($torpr, $action, $description, $logChanges);
        }

        $this->forgetTorprJsonCache((int) $id);

        return response()->json(['ok' => true, 'message' => 'Data berhasil diupdate']);
    }

    public function destroy(Request $request, $id)
    {
        $request->validate([
            'creator_password' => ['required', 'string', 'min:1', 'max:255'],
        ], [
            'creator_password.required' => 'Password pembuat PR wajib diisi untuk menghapus data.',
        ]);

        $torpr = Torpr::with(['createdBy', 'latestReceiptApproval'])->findOrFail($id);

        $user = $request->user();
        abort_unless(
            $user && $user->department === 'operasional',
            403,
            'Hanya user operasional yang dapat menghapus draft PR.'
        );

        if ($torpr->latestReceiptApproval || $torpr->received_at) {
            return response()->json([
                'message' => 'PR tidak bisa dihapus karena sudah pernah diajukan ke Umum. Gunakan alur pembatalan/status agar riwayat audit tetap aman.',
            ], 422);
        }

        $creator = $torpr->createdBy;

        if (!$creator) {
            return response()->json([
                'message' => 'Pembuat PR tidak ditemukan, sehingga password pembuat tidak bisa diverifikasi.',
            ], 422);
        }

        $attemptKey = "torpr_delete_password_attempts:{$torpr->id}:{$creator->id}:{$user->id}:" . sha1((string) $request->ip());
        $lockKey = "torpr_delete_password_lock:{$torpr->id}:{$creator->id}:{$user->id}:" . sha1((string) $request->ip());

        if ($lockedUntil = Cache::get($lockKey)) {
            $lockedUntilAt = Carbon::parse($lockedUntil);
            $retryAfter = (int) ceil(max(1, now()->diffInSeconds($lockedUntilAt, false)));

            return response()->json([
                'message' => 'Terlalu banyak percobaan password salah. Silakan coba lagi sekitar ' . ceil($retryAfter / 60) . ' menit lagi.',
                'locked' => true,
                'retry_after' => $retryAfter,
                'locked_until' => $lockedUntilAt->toIso8601String(),
            ], 429);
        }

        if (!Hash::check((string) $request->creator_password, (string) $creator->password)) {
            $attempts = ((int) Cache::get($attemptKey, 0)) + 1;
            $remainingAttempts = max(0, 3 - $attempts);

            Cache::put($attemptKey, $attempts, now()->addMinutes(15));

            Log::warning('TORPR delete rejected due invalid creator password', [
                'torpr_id' => $torpr->id,
                'nomor_pr' => $torpr->nomor_pr,
                'attempted_by_user_id' => $user->id,
                'creator_user_id' => $creator->id,
                'attempts' => $attempts,
                'ip' => $request->ip(),
            ]);

            if ($attempts >= 3) {
                $lockedUntil = now()->addMinutes(15);
                Cache::put($lockKey, $lockedUntil->toIso8601String(), $lockedUntil);
                Cache::forget($attemptKey);

                return response()->json([
                    'message' => 'Password salah 3 kali. Aksi hapus dikunci selama 15 menit.',
                    'locked' => true,
                    'retry_after' => 15 * 60,
                    'locked_until' => $lockedUntil->toIso8601String(),
                ], 429);
            }

            return response()->json([
                'message' => 'Password pembuat PR tidak sesuai. Sisa percobaan: ' . $remainingAttempts . '.',
                'attempts_remaining' => $remainingAttempts,
            ], 422);
        }

        Cache::forget($attemptKey);
        Cache::forget($lockKey);

        $oldNomorPr = $torpr->nomor_pr;
        $description = "Draft PR dihapus: " . $this->safeTorprNumber($torpr);

        DB::transaction(function () use ($torpr, $user, $creator, $description, $request) {
            \App\Models\ActivityLog::create([
                'user_id' => $user->id,
                'model_type' => Torpr::class,
                'model_id' => $torpr->id,
                'action' => 'deleted',
                'description' => $description,
                'changes' => [
                    'nomor_pr' => $torpr->nomor_pr,
                    'tujuan_pengadaan' => $torpr->tujuan_pengadaan,
                    'deleted_by' => $user->email,
                    'creator_email' => $creator->email,
                    'ip' => $request->ip(),
                ],
            ]);

            $torpr->delete();
        });

        $this->forgetTorprJsonCache((int) $id);
        if ($oldNomorPr) {
            foreach (['_v8', '_v9', '_v10'] as $version) {
                Cache::forget('tracking_pr_' . md5(strtolower($oldNomorPr)) . $version);
            }
        }

        return response()->json([
            'ok' => true,
            'message' => 'Draft PR berhasil dihapus.',
        ]);
    }

    public function showJson($id)
    {
        $torpr = Torpr::select(['id', 'created_by_user_id'])->findOrFail($id);
        $this->ensureCanViewTorpr($torpr);

        $cacheKey = "torpr_json_{$id}_v2";

        $data = Cache::remember($cacheKey, 300, function () use ($id) {
            $torpr = Torpr::select([
                'id',
                'tujuan_pengadaan',
                'portofolio',
                'nomor_pr',
                'tanggal_pr',
                'jumlah_pr',
                'tgl_ttd_kabid_pr',
                'tgl_ttd_kacab_pr',
                'received_at',
                'signed_by_kabid_name',
                'signed_by_kacab_name',
                'created_at',
                'updated_at',
            ])->findOrFail($id);

            $latestApproval = DB::table('pr_receipt_approvals as pra')
                ->leftJoin('users as approved_user', 'pra.approved_by_user_id', '=', 'approved_user.id')
                ->leftJoin('users as rejected_user', 'pra.rejected_by_user_id', '=', 'rejected_user.id')
                ->select([
                    'pra.status',
                    'pra.requested_at',
                    'pra.requested_name',
                    'pra.approved_at',
                    'approved_user.name as approved_by_name',
                    'pra.rejected_at',
                    'rejected_user.name as rejected_by_name',
                    'pra.rejected_reason',
                    'pra.updated_at',
                ])
                ->where('pra.torpr_id', $torpr->id)
                ->orderByDesc('pra.id')
                ->first();

            return [
                'id' => $torpr->id,
                'tujuan_pengadaan' => $torpr->tujuan_pengadaan,
                'portofolio' => $torpr->portofolio,
                'nomor_pr' => $torpr->nomor_pr,
                'tanggal_pr' => $this->fmtDateTimeLocal($torpr->tanggal_pr),
                'jumlah_pr' => $torpr->jumlah_pr,
                'tgl_ttd_kabid_pr' => $this->fmtDateTimeLocal($torpr->tgl_ttd_kabid_pr),
                'tgl_ttd_kacab_pr' => $this->fmtDateTimeLocal($torpr->tgl_ttd_kacab_pr),
                'received_at' => $this->fmtDateTimeLocal($torpr->received_at),
                'created_at' => $this->fmtDateTimeLocal($torpr->created_at),
                'updated_at' => $this->fmtDateTimeLocal($torpr->updated_at),
                'signed_by_kabid_name' => $torpr->signed_by_kabid_name,
                'signed_by_kacab_name' => $torpr->signed_by_kacab_name,
                'latest_approval' => $latestApproval ? [
                    'status' => $latestApproval->status,
                    'requested_at' => $this->fmtDateTimeLocal($latestApproval->requested_at),
                    'requested_name' => $latestApproval->requested_name,
                    'approved_at' => $this->fmtDateTimeLocal($latestApproval->approved_at),
                    'approved_by_name' => $latestApproval->approved_by_name,
                    'rejected_at' => $this->fmtDateTimeLocal($latestApproval->rejected_at),
                    'rejected_by_name' => $latestApproval->rejected_by_name,
                    'rejected_reason' => $latestApproval->rejected_reason,
                    'updated_at' => $this->fmtDateTimeLocal($latestApproval->updated_at),
                ] : null,
            ];
        });

        return response()->json($data, 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function requestReceipt(Request $request, $id, NotificationService $notificationService)
    {
        $request->validate([
            'requested_name' => ['required', 'string', 'min:2', 'max:120'],
        ]);

        if (!$this->canRequestUmum()) {
            return response()->json([
                'message' => 'Akses ditolak. Hanya Superadmin Operasional yang dapat request PR ke Umum.'
            ], 403);
        }

        $torpr = Torpr::select([
            'id',
            'tujuan_pengadaan',
            'portofolio',
            'nomor_pr',
            'tanggal_pr',
            'jumlah_pr',
            'tgl_ttd_kabid_pr',
            'tgl_ttd_kacab_pr'
        ])->findOrFail($id);

        $hasPending = PrReceiptApproval::where('torpr_id', $torpr->id)
            ->where('status', 'PENDING')
            ->exists();

        if ($hasPending) {
            return response()->json(['message' => 'Sudah ada request PENDING untuk PR ini.'], 422);
        }

        // ✅ VALIDASI: Semua data wajib lengkap sebelum bisa request ke Umum
        $missing = $this->missingReceiptFields($torpr);

        if (!empty($missing)) {
            return response()->json([
                'message' => 'Data belum lengkap: ' . implode(', ', $missing),
            ], 422);
        }

        PrReceiptApproval::create([
            'torpr_id' => $torpr->id,
            'requested_by_user_id' => auth()->id(),
            'requested_name' => $request->requested_name,
            'requested_at' => now(),
            'status' => 'PENDING',
        ]);

        $this->logActivity($torpr, 'requested', "Request Receipt diajukan oleh {$request->requested_name}");

        try {
            $prData = [
                'pr_no' => $this->safeTorprNumber($torpr),
                'description' => $torpr->tujuan_pengadaan ?? 'Purchase Request',
                'department' => 'Operasional',
                'submitted_by' => $request->requested_name,
                'submitted_at' => now()->format('d M Y H:i'),
            ];

            $adminUsers = User::where('department', 'umum')
                ->select(['id', 'name', 'email'])
                ->get()
                ->toArray();

            // Gunakan $notificationService dari argument method
            $notificationResults = $notificationService->notifyNewPrSubmission(
                $prData,
                $adminUsers
            );

            // ✅ REDUCE LOG: Hanya log jika penting (info berubah jadi debug)
            Log::debug('PR approval requested', [
                'pr_id' => $id,
                'pr_no' => $prData['pr_no']
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to send PR notifications', [
                'pr_id' => $id,
                'error' => $e->getMessage()
            ]);
        }

        $this->forgetTorprJsonCache((int) $id);

        return response()->json([
            'ok' => true,
            'message' => 'PR berhasil diajukan untuk approval. Super Admin telah mendapat notifikasi.',
            'notification_sent' => [
                'telegram' => $notificationResults['telegram_sent'] ?? 0,
                'chatbot' => $notificationResults['cache_stored'] ?? false
            ]
        ]);
    }

    public function receiptStatus($id)
    {
        $torpr = Torpr::with(['latestReceiptApproval.approvedBy', 'latestReceiptApproval.rejectedBy', 'receivedByUmum'])->findOrFail($id);
        $latest = $torpr->latestReceiptApproval;

        return response()->json([
            'torpr_id' => $torpr->id,
            'nomor_pr' => $torpr->nomor_pr,
            'status' => $latest?->status ?? null,
            'requested_name' => $latest?->requested_name,
            'approved_by' => $torpr->receivedByUmum?->name,
            'received_at' => $torpr->received_at ? Carbon::parse($torpr->received_at)->toDateTimeString() : null,
            'rejected_reason' => $latest?->rejected_reason,
            'rejected_by' => $latest?->rejectedBy?->name,
        ]);
    }


    private function canRequestUmum(): bool
    {
        $user = auth()->user();

        return $user
            && $user->role === 'superadmin'
            && $user->department === 'operasional';
    }

    private function ensureCanManageTorpr(Torpr $torpr): void
    {
        $user = auth()->user();
        $isSuperadminOps = $user
            && $user->department === 'operasional'
            && $user->role === 'superadmin';

        $isCreator = $user
            && $user->department === 'operasional'
            && (int) $torpr->created_by_user_id === (int) $user->id;

        $hasApprovedEditRequest = $user
            && $this->activeTorprEditPermission($torpr, $user) !== null;

        abort_unless(
            $isSuperadminOps || $isCreator || $hasApprovedEditRequest,
            403,
            'Edit PR terkunci. Silakan request izin edit ke pembuat PR terlebih dahulu.'
        );
    }

    private function activeTorprEditPermission(Torpr $torpr, User $user): ?TorprEditRequest
    {
        if ($user->department !== 'operasional') {
            return null;
        }

        return TorprEditRequest::where('torpr_id', $torpr->id)
            ->where('requester_user_id', $user->id)
            ->where('owner_user_id', $torpr->created_by_user_id)
            ->where('status', 'approved')
            ->where('expires_at', '>', now())
            ->latest('id')
            ->first();
    }

    private function notifyTorprEditRequestToChat(Torpr $torpr, TorprEditRequest $editRequest, User $requester): void
    {
        $owner = $torpr->createdBy;

        if (! $owner) {
            return;
        }

        $colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6', '#f97316', '#84cc16', '#06b6d4', '#a855f7'];
        $number = $this->safeTorprNumber($torpr);
        $purpose = trim((string) ($torpr->tujuan_pengadaan ?? ''));
        $purpose = $purpose !== '' ? mb_substr($purpose, 0, 90) : 'Tanpa tujuan';

        DB::table('chat_messages')->insert([
            'user_id' => $requester->id,
            'user_name' => $requester->name,
            'user_initials' => $this->chatInitials($requester->name),
            'user_color' => $colors[$requester->id % count($colors)],
            'message' => "Req Edit TORPR untuk @{$owner->name}: {$number} - {$purpose}. Alasan: {$editRequest->reason}",
            'reply_to' => null,
            'reply_preview' => null,
            'reply_user' => null,
            'mentions' => json_encode([
                ['id' => $owner->id, 'name' => $owner->name],
            ], JSON_UNESCAPED_UNICODE),
            'share_type' => 'torpr_edit_request',
            'share_id' => $editRequest->id,
            'share_data' => json_encode([
                'label' => 'Req Edit TORPR',
                'number' => $number,
                'title' => $purpose,
                'status' => 'Menunggu persetujuan pembuat PR',
                'meta' => 'Requester: ' . $requester->name,
                'reason' => $editRequest->reason,
                'torpr_id' => $torpr->id,
                'request_id' => $editRequest->id,
            ], JSON_UNESCAPED_UNICODE),
            'created_at' => now(),
        ]);
    }

    private function chatInitials(string $name): string
    {
        $parts = preg_split('/\s+/u', trim($name)) ?: [];

        return count($parts) >= 2
            ? strtoupper(mb_substr($parts[0], 0, 1) . mb_substr($parts[1], 0, 1))
            : strtoupper(mb_substr($name, 0, 2));
    }

    private function safeTorprNumber(Torpr $torpr): string
    {
        $number = trim((string) ($torpr->nomor_pr ?? ''));

        return $number !== '' ? $number : 'Nomor PR belum diisi';
    }

    private function forgetTorprJsonCache(int $id): void
    {
        Cache::forget("torpr_json_{$id}");
        Cache::forget("torpr_json_{$id}_v2");
    }

    private function ensureCanViewTorpr(Torpr $torpr): void
    {
        $user = auth()->user();

        abort_unless(
            $user && $user->department === 'operasional',
            403,
            'Anda tidak memiliki akses untuk melihat informasi PR ini.'
        );
    }

    private function requiredReceiptFields(): array
    {
        return [
            'tujuan_pengadaan' => 'Tujuan Pengadaan',
            'portofolio' => 'Portofolio',
            'nomor_pr' => 'Nomor PR',
            'tanggal_pr' => 'Tanggal PR',
            'jumlah_pr' => 'Harga PR',
            'tgl_ttd_kabid_pr' => 'Tanggal Ttd Kabid PR',
            'tgl_ttd_kacab_pr' => 'Tanggal Ttd Kacab PR',
        ];
    }

    private function missingReceiptFields($torpr): array
    {
        $missing = [];

        foreach ($this->requiredReceiptFields() as $field => $label) {
            $value = $torpr->{$field} ?? null;

            if ($field === 'jumlah_pr') {
                if ($value === null || $value === '' || (float) $value <= 0) {
                    $missing[] = $label;
                }

                continue;
            }

            if ($value === null || (is_string($value) && trim($value) === '')) {
                $missing[] = $label;
            }
        }

        return $missing;
    }

    private function validateTorpr(Request $request, $ignoreId = null): array
    {
        return $request->validate([
            'tujuan_pengadaan' => ['required', 'string', 'max:255'],
            'portofolio' => ['nullable', 'string', 'max:255'],
            'nomor_pr' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('torprs', 'nomor_pr')->ignore($ignoreId),
            ],
            'tanggal_pr' => ['nullable', 'date_format:Y-m-d\TH:i'],
            'jumlah_pr' => ['nullable', 'numeric'],
            'tgl_ttd_kabid_pr' => ['nullable', 'date_format:Y-m-d\TH:i'],
            'tgl_ttd_kacab_pr' => ['nullable', 'date_format:Y-m-d\TH:i'],
        ], [
            'tujuan_pengadaan.required' => 'Tujuan Pengadaan wajib diisi.',
            'nomor_pr.unique' => 'Nomor PR sudah terdaftar.',
            'date_format' => 'Format tanggal tidak valid.',
        ]);
    }

    private function applyManualSignerNames(array $data, ?Torpr $torpr = null): array
    {
        foreach (['kabid', 'kacab'] as $type) {
            $dateColumn = "tgl_ttd_{$type}_pr";
            $nameColumn = "signed_by_{$type}_name";

            if (empty($data[$dateColumn])) {
                $data[$nameColumn] = null;
                continue;
            }

            $oldDate = $torpr?->{$dateColumn}
                ? Carbon::parse($torpr->{$dateColumn})->format('Y-m-d H:i:s')
                : null;

            $oldName = trim((string) ($torpr?->{$nameColumn} ?? ''));

            $data[$nameColumn] = ($oldDate === $data[$dateColumn] && $oldName !== '')
                ? $oldName
                : auth()->user()->name;
        }

        return $data;
    }

    private function forgetTrackingCache(Torpr $torpr, ?string $oldNomorPr = null): void
    {
        foreach (array_filter([$oldNomorPr, $torpr->nomor_pr]) as $nomorPr) {
            foreach (['_v8', '_v9', '_v10'] as $version) {
                Cache::forget('tracking_pr_' . md5(strtolower($nomorPr)) . $version);
            }
        }
    }

    private function normalizeDateTimes(array $data): array
    {
        $fields = ['tanggal_pr', 'tgl_ttd_kabid_pr', 'tgl_ttd_kacab_pr'];

        foreach ($fields as $f) {
            if (!array_key_exists($f, $data))
                continue;

            $v = $data[$f];

            if ($v === null || (is_string($v) && trim($v) === '')) {
                $data[$f] = null;
                continue;
            }

            $dt = Carbon::createFromFormat('Y-m-d\TH:i', $v);
            $data[$f] = $dt->format('Y-m-d H:i:s');
        }

        return $data;
    }

    private function fmtDateTimeLocal($v): ?string
    {
        if (!$v)
            return null;
        return Carbon::parse($v)->format('Y-m-d\TH:i');
    }

    // ✅ FIXED: Template dengan column yang benar
    public function downloadTemplate()
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $spreadsheet->getProperties()
            ->setCreator('TORPR System')
            ->setTitle('Template Import TORPR')
            ->setDescription('Template Excel untuk import data TORPR secara massal');

        // ✅ HEADER YANG BENAR (7 kolom)
        $headers = [
            'A1' => 'Tujuan Pengadaan',
            'B1' => 'Portofolio',
            'C1' => 'Nomor PR',
            'D1' => 'Tanggal PR',
            'E1' => 'Jumlah PR',
            'F1' => 'Ttd Kabid PR',
            'G1' => 'Ttd Kacab PR',
        ];

        foreach ($headers as $cell => $value) {
            $sheet->setCellValue($cell, $value);
        }

        // Header Styling
        $headerStyle = [
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
                'size' => 11,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '10B981'],
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
        ];

        // ✅ FIX: Apply style ke A1:G1 (bukan A1:K1)
        $sheet->getStyle('A1:G1')->applyFromArray($headerStyle);
        $sheet->getRowDimension(1)->setRowHeight(25);

        // ✅ CONTOH DATA (7 kolom)
        $exampleData = [
            'Pengadaan Alat Tulis Kantor',
            'Administrasi dan Umum',
            'PR-OPS-001/2026',
            '2026-02-02 10:00:00',
            '5000000',
            '2026-02-02 13:00:00',
            '2026-02-02 15:00:00',
        ];

        $sheet->fromArray($exampleData, null, 'A2');

        $exampleStyle = [
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'E7E6E6'],
            ],
            'font' => [
                'italic' => true,
                'color' => ['rgb' => '666666'],
            ],
        ];

        // ✅ FIX: Apply style ke A2:G2 (bukan A2:K2)
        $sheet->getStyle('A2:G2')->applyFromArray($exampleStyle);

        // ✅ COLUMN WIDTHS (7 kolom)
        $columnWidths = [
            'A' => 35,
            'B' => 28,
            'C' => 20,
            'D' => 20,
            'E' => 15,
            'F' => 20,
            'G' => 20,
        ];

        foreach ($columnWidths as $col => $width) {
            $sheet->getColumnDimension($col)->setWidth($width);
        }

        // INSTRUCTIONS SHEET
        $instructionSheet = $spreadsheet->createSheet();
        $instructionSheet->setTitle('Petunjuk');

        $instructions = [
            ['PETUNJUK PENGGUNAAN TEMPLATE IMPORT TORPR'],
            [''],
            ['1. KOLOM WAJIB:'],
            ['   - Tujuan Pengadaan: WAJIB diisi'],
            ['   - Nomor PR: WAJIB diisi dan harus UNIK'],
            [''],
            ['2. FORMAT DATA:'],
            ['   - Format Tanggal/Waktu: YYYY-MM-DD HH:MM:SS atau YYYY-MM-DD'],
            ['   - Portofolio: isi sesuai Master Portofolio PPBJ'],
            ['   - Format Angka: Tanpa titik/koma (contoh: 5000000)'],
            ['   - Jangan mengubah nama kolom/header!'],
            [''],
            ['3. CARA MENGGUNAKAN:'],
            ['   a. Hapus baris contoh (baris 2) sebelum mengisi data Anda'],
            ['   b. Isi data mulai dari baris 3 ke bawah'],
            ['   c. Simpan file dengan format Excel (.xlsx)'],
            ['   d. Upload file ke sistem'],
            [''],
            ['4. CATATAN PENTING:'],
            ['   - Kolom yang kosong boleh dikosongkan (kecuali yang wajib)'],
            ['   - Maksimal ukuran file: 10MB'],
            ['   - Pastikan tidak ada data duplikat Nomor PR'],
            [''],
            ['Jika masih ada masalah, hubungi administrator sistem.'],
        ];

        $instructionSheet->fromArray($instructions, null, 'A1');
        $instructionSheet->getColumnDimension('A')->setWidth(70);

        $instructionSheet->getStyle('A1')->applyFromArray([
            'font' => ['bold' => true, 'size' => 14, 'color' => ['rgb' => '10B981']],
        ]);

        $spreadsheet->setActiveSheetIndex(0);

        $filename = 'Template_Import_TORPR_' . now()->format('Ymd') . '.xlsx';
        $tempFile = tempnam(sys_get_temp_dir(), 'excel_');
        $writer = new Xlsx($spreadsheet);
        $writer->save($tempFile);

        return response()->download($tempFile, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ])->deleteFileAfterSend(true);
    }

    // ✅ FIXED: Preview import dengan validasi yang benar
    public function previewImport(Request $request)
    {
        \Log::info('TORPR Preview import started');

        $request->validate([
            'file' => ['required', 'file', 'mimes:xlsx,xls,csv,txt', 'max:10240'],
        ]);

        try {
            $file = $request->file('file');
            $extension = strtolower($file->getClientOriginalExtension());

            $data = [];
            $warnings = [];

            if (in_array($extension, ['xlsx', 'xls'])) {
                $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($file->getRealPath());
                $worksheet = $spreadsheet->getActiveSheet();
                $rows = $worksheet->toArray(null, true, true, true);

                $header = array_map('trim', array_values($rows[1]));
                unset($rows[1]);

            } else {
                $handle = fopen($file->getRealPath(), 'r');
                $bom = fread($handle, 3);
                if ($bom !== chr(0xEF) . chr(0xBB) . chr(0xBF)) {
                    rewind($handle);
                }

                $header = fgetcsv($handle);
                $header = array_map('trim', $header);

                $rows = [];
                $rowNum = 1;
                while (($line = fgetcsv($handle)) !== false) {
                    $rowNum++;
                    $rows[$rowNum] = $line;
                }
                fclose($handle);
            }

            // ✅ FIX: Expected headers yang benar (7 kolom)
            $expectedHeaders = [
                'Tujuan Pengadaan',
                'Portofolio',
                'Nomor PR',
                'Tanggal PR',
                'Jumlah PR',
                'Ttd Kabid PR',
                'Ttd Kacab PR',
            ];

            $headerMismatch = false;
            if (count($header) !== count($expectedHeaders)) {
                $headerMismatch = true;
            } else {
                foreach ($header as $index => $col) {
                    if (strtolower(trim($col)) !== strtolower($expectedHeaders[$index])) {
                        $headerMismatch = true;
                        break;
                    }
                }
            }

            if ($headerMismatch) {
                return response()->json([
                    'success' => false,
                    'message' => 'Format template tidak sesuai. Silakan download template yang benar.'
                ], 422);
            }

            $nomorPrInFile = [];

            foreach ($rows as $rowIndex => $line) {
                if ($rowIndex == 1)
                    continue;

                if (!isset($line[0])) {
                    $line = array_values($line);
                }

                $line = array_map(function ($v) {
                    return is_string($v) ? trim($v) : $v;
                }, $line);

                if (empty(array_filter($line, fn($v) => !empty($v)))) {
                    continue;
                }

                // Skip example row
                if (isset($line[0]) && $line[0] === 'Pengadaan Alat Tulis Kantor') {
                    $warnings[] = "Baris $rowIndex: Baris contoh dilewati";
                    continue;
                }

                // ✅ FIX: Map ke 7 kolom yang benar
                $rowData = [
                    'row_number' => $rowIndex,
                    'tujuan_pengadaan' => $line[0] ?? '',
                    'portofolio' => $line[1] ?? '',
                    'nomor_pr' => $line[2] ?? '',
                    'tanggal_pr' => $line[3] ?? '',
                    'jumlah_pr' => $line[4] ?? '',
                    'tgl_ttd_kabid_pr' => $line[5] ?? '',
                    'tgl_ttd_kacab_pr' => $line[6] ?? '',
                    'status' => 'valid',
                    'errors' => [],
                ];

                // Validasi Tujuan Pengadaan (WAJIB)
                if (empty($rowData['tujuan_pengadaan'])) {
                    $rowData['status'] = 'error';
                    $rowData['errors'][] = 'Tujuan Pengadaan wajib diisi';
                }

                // Validasi Nomor PR (WAJIB & UNIK)
                if (empty($rowData['nomor_pr'])) {
                    $rowData['status'] = 'error';
                    $rowData['errors'][] = 'Nomor PR wajib diisi';
                } else {
                    if (in_array($rowData['nomor_pr'], $nomorPrInFile)) {
                        $rowData['status'] = 'error';
                        $rowData['errors'][] = 'Nomor PR duplikat dalam file';
                    } else {
                        $nomorPrInFile[] = $rowData['nomor_pr'];

                        if (Torpr::where('nomor_pr', $rowData['nomor_pr'])->exists()) {
                            $rowData['status'] = 'error';
                            $rowData['errors'][] = 'Nomor PR sudah terdaftar di database';
                        }
                    }
                }

                // ✅ FIX: Validasi date fields yang benar (3 field)
                $dateFields = [
                    'tanggal_pr',
                    'tgl_ttd_kabid_pr',
                    'tgl_ttd_kacab_pr'
                ];

                foreach ($dateFields as $field) {
                    if (!empty($rowData[$field])) {
                        $date = $this->parseDateTime($rowData[$field]);
                        if (!$date) {
                            $rowData['status'] = 'error';
                            $fieldLabel = ucwords(str_replace('_', ' ', $field));
                            $rowData['errors'][] = "$fieldLabel format tidak valid";
                        }
                    }
                }

                // Validasi numeric
                if (!empty($rowData['jumlah_pr'])) {
                    $cleaned = str_replace([',', '.', ' ', 'Rp'], '', $rowData['jumlah_pr']);
                    if (!is_numeric($cleaned)) {
                        $rowData['status'] = 'error';
                        $rowData['errors'][] = "Jumlah PR harus berupa angka";
                    }
                }

                if (!empty($rowData['tgl_ttd_kacab_pr'])) {
                    $isSuperadminOps = (auth()->user()->role === 'superadmin' && auth()->user()->department === 'operasional');

                    if (!$isSuperadminOps) {
                        $rowData['errors'][] = "⚠️ TTD Kacab: Hanya Superadmin Operasional yang boleh mengisi kolom ini via Import. Data akan diabaikan.";
                        // Kita tidak set status 'error' agar proses tetap jalan, tapi data akan di-ignore nanti.
                        // Atau jika ingin memblok total, uncomment baris bawah:
                        // $rowData['status'] = 'error'; 
                    }
                }

                $data[] = $rowData;
            }

            if (empty($data)) {
                return response()->json([
                    'success' => false,
                    'message' => 'File tidak mengandung data valid'
                ], 422);
            }

            $validCount = count(array_filter($data, fn($d) => $d['status'] === 'valid'));
            $errorCount = count(array_filter($data, fn($d) => $d['status'] === 'error'));

            return response()->json([
                'success' => true,
                'data' => $data,
                'summary' => [
                    'total' => count($data),
                    'valid' => $validCount,
                    'error' => $errorCount,
                ],
                'warnings' => $warnings,
            ]);

        } catch (\Exception $e) {
            \Log::error('TORPR Import error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal memproses file. Pastikan format file sesuai template.'
            ], 500);
        }
    }

    public function processImport(Request $request)
    {
        $request->validate([
            'data' => ['required', 'array'],
        ]);

        $imported = 0;
        $failed = 0;
        $errors = [];

        // ✅ 1. Cek otorisasi Kacab sekali di luar loop
        $isSuperadminOps = (auth()->user()->role === 'superadmin' && auth()->user()->department === 'operasional');

        foreach ($request->data as $item) {
            try {
                $rowNumber = $item['row_number'] ?? '-';
                if (isset($item['status']) && $item['status'] === 'error') {
                    $failed++;
                    continue;
                }

                [$isValid, $validatedItem, $validationErrors] = $this->validateTorprImportItem($item);

                if (! $isValid) {
                    $failed++;
                    $errors[] = "Baris {$rowNumber}: " . implode(', ', $validationErrors);
                    continue;
                }

                if (Torpr::where('nomor_pr', $validatedItem['nomor_pr'])->exists()) {
                    $failed++;
                    $errors[] = "Baris {$rowNumber}: Nomor PR {$validatedItem['nomor_pr']} sudah terdaftar";
                    continue;
                }

                // ✅ 2. FILTER KEAMANAN TTD KACAB
                $tglTtdKacab = $validatedItem['tgl_ttd_kacab_pr'];
                $signedByKacab = null;

                // Jika ada tanggal TTD Kacab, cek apakah boleh
                if ($tglTtdKacab) {
                    if ($isSuperadminOps) {
                        // Jika Superadmin Ops, boleh isi dan otomatis isi nama dia
                        $signedByKacab = auth()->user()->name;
                    } else {
                        // Jika bukan, abaikan (reset jadi null) dan catat warning
                        $tglTtdKacab = null;
                        $errors[] = "Baris {$rowNumber}: TTD Kacab diabaikan (Hanya Superadmin Operasional yang berhak).";
                    }
                }

                // ✅ 3. SIAPKAN DATA TERMASUK QR TOKEN
                $data = [
                    'tujuan_pengadaan' => $validatedItem['tujuan_pengadaan'],
                    'portofolio' => $validatedItem['portofolio'],
                    'nomor_pr' => $validatedItem['nomor_pr'],
                    'tanggal_pr' => $validatedItem['tanggal_pr'],
                    'jumlah_pr' => $validatedItem['jumlah_pr'],
                    'tgl_ttd_kabid_pr' => $validatedItem['tgl_ttd_kabid_pr'],

                    // Data yang sudah di-filter
                    'tgl_ttd_kacab_pr' => $tglTtdKacab,
                    'signed_by_kacab_name' => $signedByKacab,

                    'created_by_user_id' => auth()->id(),

                    // ✅ FIX: GENERATE QR TOKEN (Supaya tombol QR muncul)
                    'sign_token_kabid' => \Illuminate\Support\Str::random(32),
                    'sign_token_kacab' => \Illuminate\Support\Str::random(32),
                    'sign_token_kabid_expires_at' => now()->addDays(7),
                    'sign_token_kacab_expires_at' => now()->addDays(7),
                ];

                Torpr::create($data);
                $imported++;

            } catch (\Exception $e) {
                $failed++;
                $rowNumber = $item['row_number'] ?? '-';
                $errors[] = "Baris {$rowNumber}: " . $e->getMessage();
                \Log::error("TORPR Import error on row {$rowNumber}: " . $e->getMessage());
            }
        }

        return response()->json([
            'success' => true,
            'imported' => $imported,
            'failed' => $failed,
            'errors' => $errors,
        ]);
    }

    private function validateTorprImportItem(array $item): array
    {
        $validator = validator($item, [
            'tujuan_pengadaan' => ['required', 'string', 'max:255'],
            'portofolio' => ['nullable', 'string', 'max:255'],
            'nomor_pr' => ['required', 'string', 'max:255'],
            'tanggal_pr' => ['nullable', 'max:60'],
            'jumlah_pr' => ['nullable', 'max:60'],
            'tgl_ttd_kabid_pr' => ['nullable', 'max:60'],
            'tgl_ttd_kacab_pr' => ['nullable', 'max:60'],
        ]);

        if ($validator->fails()) {
            return [false, [], $validator->errors()->all()];
        }

        $clean = [];
        foreach ($validator->validated() as $key => $value) {
            $clean[$key] = is_string($value) ? trim($value) : $value;
        }

        $errors = [];
        foreach (['tanggal_pr', 'tgl_ttd_kabid_pr', 'tgl_ttd_kacab_pr'] as $field) {
            $value = $clean[$field] ?? null;
            $clean[$field] = $value === null || $value === '' ? null : $this->parseDateTime($value);

            if (($value !== null && $value !== '') && ! $clean[$field]) {
                $errors[] = ucwords(str_replace('_', ' ', $field)) . ' format tidak valid';
            }
        }

        $clean['jumlah_pr'] = $this->parseImportNumber($clean['jumlah_pr'] ?? null, 'jumlah_pr', $errors);
        $clean['portofolio'] = ($clean['portofolio'] ?? null) === '' ? null : ($clean['portofolio'] ?? null);

        return [$errors === [], $clean, $errors];
    }

    private function parseImportNumber(mixed $value, string $field, array &$errors): ?float
    {
        if ($value === null || $value === '') {
            return null;
        }

        $cleaned = str_replace(['Rp', 'rp', ' ', '.'], '', (string) $value);
        $cleaned = str_replace(',', '.', $cleaned);

        if (! is_numeric($cleaned)) {
            $errors[] = ucwords(str_replace('_', ' ', $field)) . ' harus berupa angka';

            return null;
        }

        return (float) $cleaned;
    }

    private function parseDateTime($value)
    {
        if (empty($value)) {
            return null;
        }

        $value = trim($value);

        // Handle Excel date serial number
        if (is_numeric($value) && $value > 25569) {
            try {
                $date = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($value);
                return $date->format('Y-m-d H:i:s');
            } catch (\Exception $e) {
                // Continue
            }
        }

        $formats = [
            'Y-m-d H:i:s',
            'Y-m-d H:i',
            'Y-m-d',
            'd/m/Y H:i:s',
            'd/m/Y H:i',
            'd/m/Y',
            'd-m-Y H:i:s',
            'd-m-Y',
        ];

        foreach ($formats as $format) {
            try {
                $date = \DateTime::createFromFormat($format, $value);
                if ($date && $date->format($format) === $value) {
                    return $date->format('Y-m-d H:i:s');
                }
            } catch (\Exception $e) {
                continue;
            }
        }

        try {
            $carbonDate = Carbon::parse($value);
            return $carbonDate->format('Y-m-d H:i:s');
        } catch (\Exception $e) {
            return null;
        }
    }

    public function exportFull(Request $request)
    {
        $filename = 'TORPR_Export_Full_' . now()->format('Ymd_His') . '.csv';

        return response()->streamDownload(function () use ($request) {
            $out = fopen('php://output', 'w');

            // Tambahkan BOM (Byte Order Mark) agar Excel bisa baca UTF-8 dengan benar
            fprintf($out, chr(0xEF) . chr(0xBB) . chr(0xBF));

            // ✅ FIXED: Header tanpa kolom 'ID'
            fputcsv($out, [
                'Tujuan Pengadaan',
                'Portofolio',
                'Nomor PR',
                'Tanggal PR',
                'Jumlah PR',
                'Ttd Kabid PR',
                'Ttd Kacab PR',
                'Receipt Status',
                'Dibuat Oleh',
                'Created At',
            ]);

            $query = Torpr::with(['createdBy', 'latestReceiptApproval']);

            if ($request->filled('q')) {
                $keyword = trim($request->q);
                $query->where(function ($q) use ($keyword) {
                    // ✅ PERBAIKAN SEBELUMNYA: Pencarian menggunakan '%' . $keyword . '%' (contains)
                    $q->where('tujuan_pengadaan', 'like', "%{$keyword}%")
                        ->orWhere('portofolio', 'like', "%{$keyword}%")
                        ->orWhere('nomor_pr', 'like', "%{$keyword}%");
                });
            }

            // ✅ FILTER PORTOFOLIO MULTIPLE SAAT EXPORT
            // Menyesuaikan export dengan filter aktif di halaman TORPR.
            $selectedPortofolios = array_values(array_filter(array_map(
                fn($value) => trim((string) $value),
                (array) $request->input('portofolio', [])
            )));

            if (!empty($selectedPortofolios)) {
                $query->whereIn('portofolio', $selectedPortofolios);
            }

            $query->orderByDesc('created_at')->chunk(500, function ($rows) use ($out) {
                foreach ($rows as $r) {
                    $receiptStatus = $r->latestReceiptApproval?->status ?? ($r->received_at ? 'APPROVED' : '-');

                    // ✅ FIXED: Data tanpa $r->id
                    fputcsv($out, \App\Support\Csv::row([
                        $r->tujuan_pengadaan,
                        $r->portofolio,
                        $r->nomor_pr,
                        $r->tanggal_pr ? Carbon::parse($r->tanggal_pr)->format('Y-m-d H:i:s') : '',
                        $r->jumlah_pr,
                        $r->tgl_ttd_kabid_pr ? Carbon::parse($r->tgl_ttd_kabid_pr)->format('Y-m-d H:i:s') : '',
                        $r->tgl_ttd_kacab_pr ? Carbon::parse($r->tgl_ttd_kacab_pr)->format('Y-m-d H:i:s') : '',
                        $receiptStatus,
                        $r->createdBy?->name ?? '-',
                        $r->created_at ? Carbon::parse($r->created_at)->format('Y-m-d H:i:s') : '',
                    ]));
                }
            });

            fclose($out);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Cache-Control' => 'no-store, no-cache',
        ]);
    }

    private function logActivity($model, $action, $description, $changes = null)
    {
        \App\Models\ActivityLog::create([
            'user_id' => auth()->id(),
            'model_type' => get_class($model),
            'model_id' => $model->id,
            'action' => $action,
            'description' => $description,
            'changes' => $changes,
        ]);
    }

    public function getLogs($id)
    {
        $logs = \App\Models\ActivityLog::with('user:id,name')
            ->where('model_type', Torpr::class)
            ->where('model_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($logs);
    }
}
