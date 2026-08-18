<?php

namespace App\Http\Controllers;

use App\Models\Ppbj;
use App\Models\PpbjRealTracking;
use App\Models\Torpr;
use App\Models\PrReceiptApproval;  // ← TAMBAHAN: import model approval
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\MasterBuyer;
use App\Models\MasterPortofolio;
use App\Models\MasterMetodePengadaan;
use App\Models\MasterPenyediaEksternal;
use Illuminate\Validation\Rule;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\QueryException;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use App\Services\PrArchiveService;
use App\Services\ProcurementJourneyService;

class PpbjController extends Controller
{
    // =====================
    // INDEX (LIST + FILTER)
    // =====================
    public function index(Request $request)
    {
        $query = DB::table('ppbj')
            ->select([
                'id',
                'ppbj_no',
                'tgl_ppbj',
                'tgl_terima_pr',
                'tgl_diserahkan',
                'uraian',
                'note',
                'portofolio',
                'buyer',
                'general_registration_number',
                'general_registered_at',
                'general_registered_by_user_id',
                'penyedia_eksternal',
                'total_sebelum_ppn',
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
                'bpb_no',
                'tgl_bpb',
                'no_invoice',
                'tgl_invoice',
                'receiving_transaction',
                'cancel_reason',
                'cancelled_at',
                'cancelled_by_user_id',
                'cancel_verified_by_user_id',
                'progres',
                'status_sla',
                'sisa_target_sla',
                'target_sla_hari',
                'realisasi_sla',
                'status',
                'keterangan',
                'created_at',
                'updated_at',
            ]);

        $searchFieldMap = [
            'uraian' => 'Uraian',
            'ppbj_no' => 'No. PPBJ',
            'awarding_sp' => 'Awarding / SP / Kontrak',
            'sph' => 'SPH',
            'spph_rfq_1' => 'SPPH / RFQ 1',
            'do_no' => 'No. DO (Delivery Order)',
            'bpg_no' => 'No. BPG (Bukti Penerimaan Gudang)',
            'bpb_no' => 'No. BPB (Bukti Pengeluaran Barang)',
            'no_invoice' => 'No. Invoice',
            'general_registration_number' => 'No. Registrasi Umum',
        ];

        // Search tetap mencakup semua field bisnis, tanpa scan kedua untuk label hasil.
        $searchContext = null;

        if ($request->filled('search')) {
            $keyword = trim($request->search);
            $likeKeyword = '%' . $keyword . '%';

            $query->where(function ($q) use ($likeKeyword) {
                $q->where('uraian', 'like', $likeKeyword)
                    ->orWhere('ppbj_no', 'like', $likeKeyword)
                    ->orWhere('awarding_sp', 'like', $likeKeyword)
                    ->orWhere('sph', 'like', $likeKeyword)
                    ->orWhere('spph_rfq_1', 'like', $likeKeyword)
                    ->orWhere('do_no', 'like', $likeKeyword)  // No. DO / Delivery Order
                    ->orWhere('bpg_no', 'like', $likeKeyword)  // No. BPG (Bukti Penerimaan Gudang)
                    ->orWhere('bpb_no', 'like', $likeKeyword)  // No. BPB (Bukti Pengeluaran Barang)
                    ->orWhere('no_invoice', 'like', $likeKeyword) // No. Invoice
                    ->orWhere('general_registration_number', 'like', $likeKeyword); // No. Registrasi Umum
            });

            $searchContext = [
                'keyword' => $keyword,
                'matched_fields' => [],
                'all_fields' => array_values($searchFieldMap),
            ];
        }

        // ── Filter lain (tidak berubah) ────────────────────────────────────────
        if ($request->filled('portofolio')) {
            $query->where('portofolio', $request->portofolio);
        }
        if ($request->filled('buyer')) {
            $query->where('buyer', $request->buyer);
        }
        if ($request->filled('penyedia_eksternal')) {
            $query->where('penyedia_eksternal', $request->penyedia_eksternal);
        }

        if ($request->filled('general_registration')) {
            match ($request->general_registration) {
                'registered' => $query->whereNotNull('general_registration_number')
                    ->where('general_registration_number', '!=', ''),
                'unregistered' => $query->where(function ($q) {
                    $q->whereNull('general_registration_number')
                        ->orWhere('general_registration_number', '');
                }),
                default => null,
            };
        }

        if ($request->filled('status_sla')) {
            $statusSla = $request->status_sla;

            switch ($statusSla) {
                case 'CANCELLED':
                    $query->where('status', 'CANCELLED');
                    break;

                case 'LENGKAP':
                    $query->where('status', '!=', 'CANCELLED')
                        ->where('progres', 100)
                        ->whereNotNull('no_invoice');
                    break;

                case 'ON TRACK':
                    $query->where('status', '!=', 'CANCELLED')
                        ->where('progres', '<', 100)
                        ->where('sisa_target_sla', '>', 2);
                    break;

                case 'WARNING':
                    $query->where('status', '!=', 'CANCELLED')
                        ->where('progres', '<', 100)
                        ->whereBetween('sisa_target_sla', [1, 2]);
                    break;

                case 'OVERDUE':
                    $query->where('status', '!=', 'CANCELLED')
                        ->where('progres', '<', 100)
                        ->where('sisa_target_sla', '<=', 0);
                    break;
            }
        }

        if ($request->filled('progress')) {
            $progress = $request->progress;

            switch ($progress) {
                case '0':
                    $query->where('progres', 0);
                    break;

                case '1-20':
                    $query->whereBetween('progres', [1, 20]);
                    break;

                case '21-40':
                    $query->whereBetween('progres', [21, 40]);
                    break;

                case '41-60':
                    $query->whereBetween('progres', [41, 60]);
                    break;

                case '61-80':
                    $query->whereBetween('progres', [61, 80]);
                    break;

                case '81-99':
                    $query->whereBetween('progres', [81, 99]);
                    break;

                case '100':
                    $query->where('progres', 100);  // ✅ DIPERBAIKI: dari where('100') ke where('progres', 100)
                    break;
            }
        }

        if ($request->filled('date_type')) {
            $dateType = $request->date_type;
            if ($dateType === 'daily' && $request->filled('date_day')) {
                $query->where('tgl_ppbj', $request->date_day);
            } elseif ($dateType === 'monthly' && $request->filled('date_month')) {
                try {
                    $date = Carbon::parse($request->date_month);
                    $query->whereBetween('tgl_ppbj', [
                        $date->copy()->startOfMonth()->toDateString(),
                        $date->copy()->endOfMonth()->toDateString(),
                    ]);
                } catch (\Exception $e) {
                }
            } elseif ($dateType === 'yearly' && $request->filled('date_year')) {
                $year = (int) $request->date_year;
                if ($year >= 2000 && $year <= 2100) {
                    $query->whereBetween('tgl_ppbj', ["{$year}-01-01", "{$year}-12-31"]);
                }
            } elseif ($dateType === 'range' && $request->filled('date_start') && $request->filled('date_end')) {
                $query->whereBetween('tgl_ppbj', [$request->date_start, $request->date_end]);
            }
        }

        $perPage = (int) $request->get('per_page', 10);
        $perPage = in_array($perPage, [10, 25, 50, 100]) ? $perPage : 10;
        $query->orderBy('id', 'desc');
        $ppbj = $query->paginate($perPage)->withQueryString();

        // Ambil seluruh nama user yang diperlukan dalam satu query untuk halaman aktif.
        // Ini menggantikan lima correlated subquery yang sebelumnya dijalankan per baris.
        $userNameColumns = [
            'cancelled_by_user_id' => 'cancelled_by_name',
            'cancel_verified_by_user_id' => 'cancel_verified_by_name',
            'goods_arrived_by_user_id' => 'goods_arrived_by_name',
            'goods_confirmed_by_user_id' => 'goods_confirmed_by_name',
            'general_registered_by_user_id' => 'general_registered_by_name',
        ];

        $userIds = collect($ppbj->items())
            ->flatMap(fn ($row) => array_map(
                fn ($column) => $row->{$column} ?? null,
                array_keys($userNameColumns)
            ))
            ->filter()
            ->unique()
            ->values();

        $userNames = $userIds->isEmpty()
            ? collect()
            : User::query()->whereIn('id', $userIds)->pluck('name', 'id');

        foreach ($ppbj->items() as $row) {
            foreach ($userNameColumns as $idColumn => $nameColumn) {
                $row->{$nameColumn} = $userNames->get($row->{$idColumn} ?? null);
            }
        }

        // Informasi "ditemukan di kolom" dihitung dari data halaman yang sudah dimuat,
        // sehingga pencarian tidak lagi melakukan full-table scan tambahan.
        if ($searchContext !== null) {
            $needle = mb_strtolower($searchContext['keyword']);
            $matchedFields = [];

            foreach ($searchFieldMap as $column => $label) {
                $matched = collect($ppbj->items())->contains(function ($row) use ($column, $needle) {
                    return str_contains(mb_strtolower((string) ($row->{$column} ?? '')), $needle);
                });

                if ($matched) {
                    $matchedFields[] = $label;
                }
            }

            $searchContext['matched_fields'] = $matchedFields;
        }

        $portofolios = Cache::remember(
            'master_portofolios',
            3600,
            fn() =>
            MasterPortofolio::orderBy('nama')->pluck('nama', 'id')
        );
        $buyers = Cache::remember(
            'master_buyers',
            3600,
            fn() =>
            MasterBuyer::orderBy('nama')->pluck('nama', 'id')
        );
        $metodePengadaans = Cache::remember(
            'master_metode_pengadaan',
            3600,
            fn() =>
            MasterMetodePengadaan::orderBy('nama')->pluck('nama')
        );
        $penyediaEksternals = Cache::remember(
            'master_penyedia_eksternal',
            3600,
            fn() =>
            MasterPenyediaEksternal::orderBy('nama')->pluck('nama')
        );

        return view('ppbj.index', compact(
            'ppbj',
            'portofolios',
            'buyers',
            'metodePengadaans',
            'penyediaEksternals',
            'searchContext'   // ← TAMBAHAN
        ));
    }

    public function archiveStatus(Request $request, $id, PrArchiveService $archiveService)
    {
        $ppbj = Ppbj::select(['id', 'ppbj_no'])->findOrFail($id);
        $archive = $archiveService->findByPrNumber(
            $ppbj->ppbj_no,
            $request->boolean('refresh')
        );

        return response()->json(array_merge([
            'ppbj_id' => $ppbj->id,
            'ppbj_no' => $ppbj->ppbj_no,
            'nomor_pr' => $ppbj->ppbj_no,
        ], $archive), 200, [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    private function realTrackingTemplates(): array
    {
        return [
            'submit_kak' => [
                'title' => 'Submit KAK',
                'description' => 'KAK sudah disubmit pada tanggal yang dipilih.',
                'requires_date' => true,
                'emoji' => '📅',
            ],
            'sp_waiting_signature' => [
                'title' => 'SP/Kontrak menunggu TTD Kabid/Kacab',
                'description' => 'Dokumen SP/Kontrak sedang menunggu proses tanda tangan.',
                'requires_date' => false,
                'emoji' => '✍️',
            ],
            'sp_to_vendor' => [
                'title' => 'SP/Kontrak sudah ke Vendor',
                'description' => 'SP/Kontrak sudah dikirim atau diinformasikan kepada vendor.',
                'requires_date' => false,
                'emoji' => '📨',
            ],
            'bpg_bpb_finance' => [
                'title' => 'BPG/BPB sudah ke Keuangan',
                'description' => 'BPG/BPB sudah diteruskan ke Keuangan untuk proses lanjutan.',
                'requires_date' => false,
                'emoji' => '💳',
            ],
            'invoice_complete' => [
                'title' => 'Invoice lengkap',
                'description' => 'Invoice atau dokumen pembayaran sudah lengkap.',
                'requires_date' => false,
                'emoji' => '✅',
            ],
            'vendor_follow_up' => [
                'title' => 'Follow up Vendor',
                'description' => 'Vendor sudah difollow up untuk percepatan proses.',
                'requires_date' => false,
                'emoji' => '📞',
            ],
        ];
    }

    private function ensureGeneralDepartment(Request $request): void
    {
        abort_unless(
            strcasecmp((string) ($request->user()?->department ?? ''), 'umum') === 0,
            403,
            'Tracking real hanya bisa dikelola Department Umum.'
        );
    }

    public function realTracking(Request $request, $id)
    {
        $ppbj = Ppbj::select([
            'id',
            'ppbj_no',
            'uraian',
            'buyer',
            'portofolio',
            'penyedia_eksternal',
            'awarding_sp',
            'spph_rfq_1',
            'promised_date',
            'progres',
            'status_sla',
        ])->findOrFail($id);

        $items = PpbjRealTracking::with(['createdBy:id,name,email', 'updatedBy:id,name,email'])
            ->where('ppbj_id', $ppbj->id)
            ->orderByDesc(DB::raw('COALESCE(event_date, DATE(created_at))'))
            ->orderByDesc('id')
            ->limit(80)
            ->get()
            ->map(function (PpbjRealTracking $tracking) {
                return [
                    'id' => $tracking->id,
                    'status_key' => $tracking->status_key,
                    'title' => $tracking->title,
                    'description' => $tracking->description,
                    'event_date' => optional($tracking->event_date)->format('Y-m-d'),
                    'event_date_label' => optional($tracking->event_date)->translatedFormat('d F Y'),
                    'reminder_date' => optional($tracking->reminder_date)->format('Y-m-d'),
                    'reminder_date_label' => optional($tracking->reminder_date)->translatedFormat('d F Y'),
                    'created_by' => $tracking->createdBy?->name ?: $tracking->createdBy?->email ?: 'Umum',
                    'updated_by' => $tracking->updatedBy?->name ?: $tracking->updatedBy?->email,
                    'created_at' => optional($tracking->created_at)->timezone('Asia/Jakarta')->translatedFormat('l, d F Y H:i'),
                ];
            });

        return response()->json([
            'ppbj' => [
                'id' => $ppbj->id,
                'ppbj_no' => $ppbj->ppbj_no,
                'uraian' => $ppbj->uraian,
                'buyer' => $ppbj->buyer,
                'portofolio' => $ppbj->portofolio,
                'vendor' => $ppbj->penyedia_eksternal,
                'sp' => $ppbj->awarding_sp,
                'spph' => $ppbj->spph_rfq_1,
                'promised_date' => $ppbj->promised_date ? Carbon::parse($ppbj->promised_date)->format('Y-m-d') : null,
                'progress' => $ppbj->progres,
                'status_sla' => $ppbj->status_sla,
            ],
            'templates' => $this->realTrackingTemplates(),
            'items' => $items,
        ]);
    }

    public function storeRealTracking(Request $request, $id)
    {
        $this->ensureGeneralDepartment($request);

        $ppbj = Ppbj::findOrFail($id);
        if (($ppbj->status ?? 'ACTIVE') === 'CANCELLED') {
            return response()->json(['message' => 'Data CANCELLED tidak bisa ditambah tracking real.'], 422);
        }

        $validated = $request->validate([
            'status_key' => ['nullable', 'string', 'max:80'],
            'title' => ['nullable', 'string', 'max:180'],
            'description' => ['nullable', 'string', 'max:1000'],
            'event_date' => ['nullable', 'date'],
            'reminder_date' => ['nullable', 'date'],
        ]);

        $templates = $this->realTrackingTemplates();
        $key = $validated['status_key'] ?? null;
        $template = $key && isset($templates[$key]) ? $templates[$key] : null;

        if (($template['requires_date'] ?? false) && empty($validated['event_date'])) {
            return response()->json(['message' => 'Tanggal wajib dipilih untuk status ini.'], 422);
        }

        $customTitle = trim((string) ($validated['title'] ?? ''));
        $customDescription = trim((string) ($validated['description'] ?? ''));
        $eventDate = $validated['event_date'] ?? now()->toDateString();
        $reminderDate = $validated['reminder_date'] ?? null;

        if (! $template && $customTitle === '' && $customDescription === '' && empty($validated['event_date']) && empty($validated['reminder_date'])) {
            return response()->json([
                'message' => 'Isi minimal judul, tanggal, reminder, atau catatan untuk tracking custom.',
            ], 422);
        }

        $title = $customTitle !== '' ? $customTitle : ($template['title'] ?? 'Update proses');
        $description = $customDescription !== '' ? $customDescription : ($template['description'] ?? null);

        $duplicateQuery = PpbjRealTracking::query()
            ->where('ppbj_id', $ppbj->id)
            ->where('title', $title)
            ->whereDate('event_date', $eventDate);

        $key === null
            ? $duplicateQuery->whereNull('status_key')
            : $duplicateQuery->where('status_key', $key);

        $description === null
            ? $duplicateQuery->whereNull('description')
            : $duplicateQuery->where('description', $description);

        if ($duplicateQuery->exists()) {
            return response()->json([
                'message' => 'Tracking ini sudah tercatat. Gunakan edit jika ingin memperbarui riwayat yang sama.',
            ], 422);
        }

        $tracking = PpbjRealTracking::create([
            'ppbj_id' => $ppbj->id,
            'status_key' => $key,
            'title' => $title,
            'description' => $description,
            'event_date' => $eventDate,
            'reminder_date' => $reminderDate,
            'created_by_user_id' => $request->user()?->id,
            'updated_by_user_id' => $request->user()?->id,
        ]);

        DashboardController::clearCache();
        $this->clearProcurementTrackingCache($ppbj->ppbj_no);

        return response()->json([
            'message' => 'Tracking real berhasil ditambahkan.',
            'id' => $tracking->id,
        ]);
    }

    public function updateRealTracking(Request $request, PpbjRealTracking $tracking)
    {
        $this->ensureGeneralDepartment($request);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'description' => ['nullable', 'string', 'max:1000'],
            'event_date' => ['nullable', 'date'],
            'reminder_date' => ['nullable', 'date'],
        ]);

        $tracking->forceFill([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'event_date' => $validated['event_date'] ?? null,
            'reminder_date' => $validated['reminder_date'] ?? null,
            'updated_by_user_id' => $request->user()?->id,
        ])->save();

        DashboardController::clearCache();
        $this->clearProcurementTrackingCache($tracking->ppbj?->ppbj_no);

        return response()->json(['message' => 'Tracking real berhasil diperbarui.']);
    }

    public function destroyRealTracking(Request $request, PpbjRealTracking $tracking)
    {
        $this->ensureGeneralDepartment($request);
        $nomor = $tracking->ppbj?->ppbj_no;
        $tracking->delete();

        DashboardController::clearCache();
        $this->clearProcurementTrackingCache($nomor);

        return response()->json(['message' => 'Tracking real berhasil dihapus.']);
    }

    public function markGoodsArrived(Request $request, $id, ProcurementJourneyService $journey)
    {
        $validated = $request->validate([
            'note' => ['nullable', 'string', 'max:500'],
        ]);

        $ppbj = Ppbj::findOrFail($id);

        if (($ppbj->status ?? 'ACTIVE') === 'CANCELLED') {
            return response()->json(['message' => 'Data sudah CANCELLED, tidak bisa ditandai barang datang.'], 422);
        }

        $ppbj->forceFill([
            'goods_arrived_at' => now(),
            'goods_arrived_by_user_id' => $request->user()?->id,
            'goods_arrived_note' => $validated['note'] ?? null,
            'goods_confirmed_at' => null,
            'goods_confirmed_by_user_id' => null,
            'goods_confirmed_note' => null,
        ])->save();

        DashboardController::clearCache();
        $this->clearProcurementTrackingCache($ppbj->ppbj_no);

        $journey->notifyByPrNumber(
            $ppbj->ppbj_no,
            'goods_arrived',
            'Barang / pekerjaan sudah datang',
            'Bagian Umum menandai barang atau pekerjaan sudah datang. Operasional bisa cek fisik dan konfirmasi penerimaan.',
            [
                'progress' => 'Barang datang',
                'document_no' => $ppbj->awarding_sp ?: $ppbj->spph_rfq_1,
                'promised_date' => $ppbj->promised_date,
                'note' => $validated['note'] ?? null,
            ],
            $request->user()
        );

        return response()->json([
            'message' => 'Barang/pekerjaan berhasil ditandai sudah datang.',
            'goods_arrived_at' => optional($ppbj->goods_arrived_at)->toIso8601String(),
            'goods_arrived_by_name' => $request->user()?->name ?? $request->user()?->email,
        ]);
    }

    public function confirmGoodsArrival(Request $request, $id, ProcurementJourneyService $journey)
    {
        $validated = $request->validate([
            'note' => ['nullable', 'string', 'max:500'],
        ]);

        $ppbj = Ppbj::findOrFail($id);

        if (($ppbj->status ?? 'ACTIVE') === 'CANCELLED') {
            return response()->json(['message' => 'Data sudah CANCELLED, tidak bisa dikonfirmasi.'], 422);
        }

        if (blank($ppbj->goods_arrived_at)) {
            return response()->json(['message' => 'Barang/pekerjaan belum ditandai datang oleh Umum.'], 422);
        }

        $user = $request->user();
        $isOperationalSuperadmin = strcasecmp((string) ($user?->role ?? ''), 'superadmin') === 0
            && strcasecmp((string) ($user?->department ?? ''), 'operasional') === 0;
        $isPrCreator = Torpr::where('nomor_pr', $ppbj->ppbj_no)
            ->where('created_by_user_id', $user?->id)
            ->exists();

        if (! $isOperationalSuperadmin && ! $isPrCreator) {
            return response()->json([
                'message' => 'Konfirmasi penerimaan hanya untuk pembuat PR atau superadmin Operasional.',
            ], 403);
        }

        $ppbj->forceFill([
            'goods_confirmed_at' => now(),
            'goods_confirmed_by_user_id' => $user?->id,
            'goods_confirmed_note' => $validated['note'] ?? null,
        ])->save();

        DashboardController::clearCache();
        $this->clearProcurementTrackingCache($ppbj->ppbj_no);

        $journey->notifyByPrNumber(
            $ppbj->ppbj_no,
            'goods_confirmed',
            'Barang / pekerjaan dikonfirmasi Operasional',
            'Operasional sudah mengonfirmasi penerimaan barang atau pekerjaan untuk PR ini.',
            [
                'progress' => 'Diterima Operasional',
                'document_no' => $ppbj->awarding_sp ?: $ppbj->spph_rfq_1,
                'note' => $validated['note'] ?? null,
            ],
            $user
        );

        return response()->json([
            'message' => 'Penerimaan berhasil dikonfirmasi Operasional.',
            'goods_confirmed_at' => optional($ppbj->goods_confirmed_at)->toIso8601String(),
            'goods_confirmed_by_name' => $user?->name ?? $user?->email,
        ]);
    }

    private function clearProcurementTrackingCache(?string $nomor): void
    {
        $nomor = trim((string) $nomor);

        if ($nomor === '') {
            return;
        }

        foreach (range(1, 10) as $version) {
            Cache::forget('tracking_pr_' . md5(strtolower($nomor)) . '_v' . $version);
            Cache::forget('tracking_ppbj_' . md5(strtolower($nomor)) . '_v' . $version);
        }
    }

    // =====================
    // STORE (CREATE)
    // =====================
    public function store(Request $request)
    {
        $request->validate([
            'ppbj_no' => ['required', 'string', 'max:255', 'unique:ppbj,ppbj_no'],
        ], [
            'ppbj_no.unique' => 'No PPBJ tersebut sudah ada.',
            'ppbj_no.required' => 'No PPBJ wajib diisi.',
        ]);

        try {
            DB::transaction(function () use ($request) {
                $data = $request->only(Ppbj::manualFields());
                $data['created_by_user_id'] = auth()->id();
                $data = array_merge($data, $this->generalRegistrationPayload($request));

                Ppbj::create($data);
            }, 3);
        } catch (QueryException $e) {
            return response()->json([
                'message' => str_contains($e->getMessage(), 'general_registration_number')
                    ? 'Nomor registrasi umum bentrok karena ada input bersamaan. Silakan klik simpan ulang.'
                    : 'No PPBJ sudah dipakai oleh data lain. Silakan refresh halaman dan cek data terbaru.',
            ], 422);
        }

        DashboardController::clearCache();

        return response()->json(['message' => 'Data berhasil disimpan']);
    }

    private function generalRegistrationPayload(Request $request): array
    {
        if (! Schema::hasColumn('ppbj', 'general_registration_number')) {
            return [];
        }

        $now = now();
        $payload = [
            'general_registration_number' => $this->nextGeneralRegistrationNumber((int) $now->year),
            'general_registered_at' => $now,
            'general_registered_by_user_id' => $request->user()?->id ?? auth()->id(),
        ];

        return collect($payload)
            ->filter(fn ($value, $column) => Schema::hasColumn('ppbj', $column))
            ->all();
    }

    private function nextGeneralRegistrationNumber(int $year): string
    {
        $prefix = 'REG-UMUM/' . $year . '/';

        $registrationQuery = DB::table('ppbj')
            ->where('general_registration_number', 'like', $prefix . '%')
            ->lockForUpdate();

        // Produksi memakai MySQL/MariaDB: urutkan bagian sequence secara numerik
        // supaya tetap benar ketika nomor melewati 999. SQLite dipakai pada test.
        if (DB::connection()->getDriverName() === 'mysql') {
            $registrationQuery->orderByRaw(
                "CAST(SUBSTRING_INDEX(general_registration_number, '/', -1) AS UNSIGNED) DESC"
            );
        } else {
            $registrationQuery->orderByDesc('general_registration_number');
        }

        $lastNumber = $registrationQuery->value('general_registration_number');

        $next = 1;

        if ($lastNumber && preg_match('/(\d+)$/', (string) $lastNumber, $matches)) {
            $next = ((int) $matches[1]) + 1;
        }

        return $prefix . str_pad((string) $next, 3, '0', STR_PAD_LEFT);
    }

    // =====================
    // UPDATE (EDIT)
    // =====================
    public function update(Request $request, $id)
    {
        $ppbj = Ppbj::findOrFail($id);

        if (($ppbj->status ?? 'ACTIVE') === 'CANCELLED') {
            return response()->json(['message' => 'Data sudah CANCELLED, tidak bisa diubah'], 422);
        }

        $request->validate([
            'ppbj_no' => [
                'required',
                'string',
                'max:255',
                Rule::unique('ppbj', 'ppbj_no')->ignore($ppbj->id),
            ],
        ], [
            'ppbj_no.unique' => 'No PPBJ tersebut sudah ada.',
        ]);

        try {
            $data = $request->only(Ppbj::manualFields());
            $ppbj->update($data);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'No PPBJ sudah dipakai oleh data lain. Silakan refresh halaman dan cek data terbaru.',
            ], 422);
        }

        DashboardController::clearCache();

        return response()->json(['message' => 'Data berhasil diperbarui']);
    }

    // =====================
    // CHECK PPBJ NO — DIMODIFIKASI
    // Sekarang juga cek ke tabel pr_receipt_approvals via relasi torpr
    // =====================
    public function checkPpbjNo(Request $request)
    {
        $ppbjNo = trim((string) $request->query('ppbj_no', ''));
        $ignoreId = $request->query('ignore_id');

        if ($ppbjNo === '') {
            return response()->json(['exists' => false, 'exists_in_approval' => false]);
        }

        // ── Jika mode EDIT (ignore_id diisi), skip cek approval sama sekali ──
        // User hanya mengubah data, bukan membuat baru
        if (!$ignoreId) {
            // Mode TAMBAH: cek ke approval PR, tapi HANYA yang PENDING
            $approval = PrReceiptApproval::whereHas(
                'torpr',
                fn($q) => $q->where('nomor_pr', $ppbjNo)
            )
                ->where('status', 'PENDING')   // ← hanya blokir jika masih PENDING
                ->with(['requestedBy'])
                ->latest()
                ->first();

            if ($approval) {
                $requestedAt = $approval->created_at
                    ? $approval->created_at->translatedFormat('d F Y, H:i')
                    : null;

                return response()->json([
                    'exists' => true,
                    'exists_in_approval' => true,
                    'approval_detail' => [
                        'approval_status' => $approval->status,
                        'requested_by' => optional($approval->requestedBy)->name,
                        'requested_at' => $requestedAt,
                        'rejected_reason' => $approval->rejected_reason ?? null,
                    ],
                ]);
            }
        }

        // ── Cek duplikat di tabel ppbj ────────────────────────────────────────
        $query = DB::table('ppbj')->where('ppbj_no', $ppbjNo);
        if ($ignoreId) {
            $query->where('id', '!=', $ignoreId);
        }

        return response()->json([
            'exists' => $query->exists(),
            'exists_in_approval' => false,
        ]);
    }

    // =====================
    // CANCEL
    // =====================
    public function cancel(Request $request, $id)
    {
        $ppbj = Ppbj::findOrFail($id);

        if (($ppbj->status ?? 'ACTIVE') === 'CANCELLED') {
            return response()->json(['message' => 'Data sudah CANCELLED'], 422);
        }

        $request->validate([
            'reason' => ['required', 'string', 'min:3', 'max:500'],
            'creator_password' => ['required', 'string', 'min:1', 'max:255'],
        ], [
            'creator_password.required' => 'Password pembuat PPBJ wajib diisi untuk cancel data.',
        ]);

        $user = $request->user();
        $verifier = $this->resolvePpbjCancelVerifier($ppbj, $request);

        if (!$verifier) {
            return response()->json([
                'message' => 'User verifikasi tidak ditemukan, sehingga password cancel tidak bisa dicek.',
            ], 422);
        }

        $currentUserId = $user?->id ?: 'guest';
        $ipHash = sha1((string) $request->ip());
        $attemptKey = "ppbj_cancel_password_attempts:{$ppbj->id}:{$verifier->id}:{$currentUserId}:{$ipHash}";
        $lockKey = "ppbj_cancel_password_lock:{$ppbj->id}:{$verifier->id}:{$currentUserId}:{$ipHash}";

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

        if (!Hash::check((string) $request->creator_password, (string) $verifier->password)) {
            $attempts = ((int) Cache::get($attemptKey, 0)) + 1;
            $remainingAttempts = max(0, 3 - $attempts);
            Cache::put($attemptKey, $attempts, now()->addMinutes(15));

            if ($attempts >= 3) {
                $lockedUntil = now()->addMinutes(15);
                Cache::put($lockKey, $lockedUntil->toIso8601String(), $lockedUntil);
                Cache::forget($attemptKey);

                return response()->json([
                    'message' => 'Password salah 3 kali. Aksi cancel PPBJ dikunci selama 15 menit.',
                    'locked' => true,
                    'retry_after' => 15 * 60,
                    'locked_until' => $lockedUntil->toIso8601String(),
                ], 429);
            }

            return response()->json([
                'message' => 'Password pembuat PPBJ tidak sesuai. Sisa percobaan: ' . $remainingAttempts . '.',
                'attempts_remaining' => $remainingAttempts,
            ], 422);
        }

        Cache::forget($attemptKey);
        Cache::forget($lockKey);

        DB::transaction(function () use ($ppbj, $request, $user, $verifier) {
            $ppbj->update([
                'status' => 'CANCELLED',
                'status_sla' => 'CANCELLED',
                'cancel_reason' => $request->reason,
                'cancelled_at' => now(),
                'cancelled_by_user_id' => $user?->id,
                'cancel_verified_by_user_id' => $verifier->id,
            ]);

            if (blank($ppbj->created_by_user_id) && $verifier->id) {
                $ppbj->forceFill(['created_by_user_id' => $verifier->id])->saveQuietly();
            }

            if (class_exists(\App\Models\ActivityLog::class)) {
                \App\Models\ActivityLog::create([
                    'user_id' => $user?->id,
                    'model_type' => Ppbj::class,
                    'model_id' => $ppbj->id,
                    'action' => 'cancelled',
                    'description' => 'PPBJ di-cancel: ' . ($ppbj->ppbj_no ?: 'PPBJ-' . $ppbj->id),
                    'changes' => [
                        'ppbj_no' => $ppbj->ppbj_no,
                        'reason' => $request->reason,
                        'verified_by' => $verifier->email,
                        'cancelled_by' => $user?->email,
                    ],
                ]);
            }
        }, 3);

        DashboardController::clearCache();

        $ppbj->refresh();
        $cancelledAt = $ppbj->cancelled_at
            ? Carbon::parse($ppbj->cancelled_at)->toIso8601String()
            : now()->toIso8601String();

        return response()->json([
            'message' => 'Data berhasil di-cancel',
            'cancelled_at' => $cancelledAt,
            'cancelled_by_user_id' => $user?->id,
            'cancelled_by_name' => $user?->name ?? $user?->email ?? '—',
            'cancel_verified_by_user_id' => $verifier->id,
            'cancel_verified_by_name' => $verifier->name ?? $verifier->email ?? '—',
        ]);
    }

    private function resolvePpbjCancelVerifier(Ppbj $ppbj, Request $request): ?User
    {
        $ppbj->loadMissing('createdBy');

        if ($ppbj->createdBy) {
            return $ppbj->createdBy;
        }

        $buyer = trim((string) ($ppbj->buyer ?? ''));

        if ($buyer !== '') {
            $buyerKey = mb_strtolower($buyer);

            $matchedUser = User::query()
                ->where(function ($query) use ($buyerKey) {
                    $query->whereRaw('LOWER(name) = ?', [$buyerKey])
                        ->orWhereRaw('LOWER(buyer_name) = ?', [$buyerKey]);
                })
                ->orderBy('id')
                ->first();

            if ($matchedUser) {
                return $matchedUser;
            }
        }

        return $request->user();
    }

    // =====================
    // DESTROY (soft-cancel via delete button)
    // =====================
    public function destroy($id)
    {
        $ppbj = Ppbj::findOrFail($id);
        $ppbj->update(['status' => 'CANCELLED']);

        return response()->json(['message' => 'Data berhasil di-cancel']);
    }

    // =====================
    // EXPORT CSV
    // =====================
    public function export(Request $request)
    {
        $filename = 'PPBJ_Export_' . now()->format('Ymd_His') . '.csv';

        return response()->streamDownload(function () use ($request) {
            $out = fopen('php://output', 'w');
            fprintf($out, chr(0xEF) . chr(0xBB) . chr(0xBF));

            fputcsv($out, [
                'No PPBJ',
                'Tanggal PPBJ',
                'Tanggal Terima PR',
                'Uraian',
                'Note',
                'Portofolio',
                'Buyer',
                'Total Sebelum PPN',
                'Metode Pengadaan',
                'SPPH/RFQ 1',
                'RFQ 2',
                'RFQ 3',
                'Tanggal SPPH',
                'Closed Date',
                'QT Left (Hari)',
                'SPH',
                'Tanggal SPH',
                'Awarding SP',
                'Tanggal Awarding',
                'Penyedia Eksternal',
                'Tanggal SPK',
                'Nilai SP/SPK',
                'Persentase Realisasi (%)',
                'Promised Date',
                'Time Left (Hari)',
                'DO No',
                'BPG No',
                'Nilai BPG',
                'Tanggal BPG',
                'Receiving Transaction',
                'BPB No',
                'Tanggal BPB',
                'No Invoice',
                'Tanggal Invoice',
                'Progress (%)',
                'Status SLA',
                'Sisa SLA (Hari)',
                'Target SLA (Hari)',
                'Realisasi SLA (Hari)',
                'Tanggal Diserahkan',
                'Keterangan',
                'Status',
                'Cancel Reason',
                'Created At',
                'Updated At',
            ]);

            $query = Ppbj::query();

            if ($request->filled('uraian')) {
                $keyword = trim($request->uraian);
                $query->whereRaw('MATCH(ppbj_no, uraian) AGAINST(? IN BOOLEAN MODE)', ['*' . $keyword . '*']);
            }
            if ($request->filled('portofolio'))
                $query->where('portofolio', $request->portofolio);
            if ($request->filled('buyer'))
                $query->where('buyer', $request->buyer);
            if ($request->filled('penyedia_eksternal'))
                $query->where('penyedia_eksternal', $request->penyedia_eksternal);

            if ($request->filled('status_sla')) {
                switch ($request->status_sla) {
                    case 'CANCELLED':
                        $query->where('status', 'CANCELLED');
                        break;
                    case 'LENGKAP':
                        $query->where('status', '!=', 'CANCELLED')
                            ->where('progres', 100)
                            ->whereNotNull('no_invoice');
                        break;
                    case 'ON TRACK':
                        $query->where('status', '!=', 'CANCELLED')
                            ->where('progres', '<', 100)
                            ->where('sisa_target_sla', '>', 2);
                        break;
                    case 'WARNING':
                        $query->where('status', '!=', 'CANCELLED')
                            ->where('progres', '<', 100)
                            ->whereBetween('sisa_target_sla', [1, 2]);
                        break;
                    case 'OVERDUE':
                        $query->where('status', '!=', 'CANCELLED')
                            ->where('progres', '<', 100)
                            ->where('sisa_target_sla', '<=', 0);
                        break;
                }
            }

            if ($request->filled('progress')) {
                switch ($request->progress) {
                    case '0':
                        $query->where('progres', 0);
                        break;
                    case '1-20':
                        $query->whereBetween('progres', [1, 20]);
                        break;
                    case '21-40':
                        $query->whereBetween('progres', [21, 40]);
                        break;
                    case '41-60':
                        $query->whereBetween('progres', [41, 60]);
                        break;
                    case '61-80':
                        $query->whereBetween('progres', [61, 80]);
                        break;
                    case '81-99':
                        $query->whereBetween('progres', [81, 99]);
                        break;
                    case '100':
                        $query->where('progres', 100);  // ✅ DIPERBAIKI
                        break;
                }
            }

            if ($request->filled('date_type')) {
                $dateType = $request->date_type;
                if ($dateType === 'daily' && $request->filled('date_day')) {
                    $query->where('tgl_ppbj', $request->date_day);
                } elseif ($dateType === 'monthly' && $request->filled('date_month')) {
                    try {
                        $date = Carbon::parse($request->date_month);
                        $query->whereBetween('tgl_ppbj', [
                            $date->copy()->startOfMonth()->toDateString(),
                            $date->copy()->endOfMonth()->toDateString(),
                        ]);
                    } catch (\Exception $e) {
                    }
                } elseif ($dateType === 'yearly' && $request->filled('date_year')) {
                    $year = (int) $request->date_year;
                    if ($year >= 2000 && $year <= 2100) {
                        $query->whereBetween('tgl_ppbj', ["{$year}-01-01", "{$year}-12-31"]);
                    }
                } elseif ($dateType === 'range' && $request->filled('date_start') && $request->filled('date_end')) {
                    $query->whereBetween('tgl_ppbj', [$request->date_start, $request->date_end]);
                }
            }

            $query->orderByDesc('created_at')->chunk(500, function ($rows) use ($out) {
                foreach ($rows as $r) {
                    fputcsv($out, \App\Support\Csv::row([
                        $r->ppbj_no,
                        $r->tgl_ppbj ? Carbon::parse($r->tgl_ppbj)->format('Y-m-d') : '',
                        $r->tgl_terima_pr ? Carbon::parse($r->tgl_terima_pr)->format('Y-m-d') : '',
                        $r->uraian,
                        $r->note,
                        $r->portofolio,
                        $r->buyer,
                        $r->total_sebelum_ppn,
                        $r->metode_pengadaan,
                        $r->spph_rfq_1,
                        $r->rfq_2,
                        $r->rfq_3,
                        $r->tgl_spph ? Carbon::parse($r->tgl_spph)->format('Y-m-d') : '',
                        $r->closed_date ? Carbon::parse($r->closed_date)->format('Y-m-d') : '',
                        $r->qt_left,
                        $r->sph,
                        $r->tgl_sph ? Carbon::parse($r->tgl_sph)->format('Y-m-d') : '',
                        $r->awarding_sp,
                        $r->tgl_awarding_sp ? Carbon::parse($r->tgl_awarding_sp)->format('Y-m-d') : '',
                        $r->penyedia_eksternal,
                        $r->tgl_spk ? Carbon::parse($r->tgl_spk)->format('Y-m-d') : '',
                        $r->nilai_sp_spk,
                        $r->persentase_realisasi,
                        $r->promised_date ? Carbon::parse($r->promised_date)->format('Y-m-d') : '',
                        $r->time_left,
                        $r->do_no,
                        $r->bpg_no,
                        $r->nilai_bpg,
                        $r->tgl_bpg ? Carbon::parse($r->tgl_bpg)->format('Y-m-d') : '',
                        $r->receiving_transaction,
                        $r->bpb_no,
                        $r->tgl_bpb ? Carbon::parse($r->tgl_bpb)->format('Y-m-d') : '',
                        $r->no_invoice,
                        $r->tgl_invoice ? Carbon::parse($r->tgl_invoice)->format('Y-m-d') : '',
                        $r->progres,
                        $r->status_sla,
                        $r->sisa_target_sla,
                        $r->target_sla_hari,
                        $r->realisasi_sla,
                        $r->tgl_diserahkan ? Carbon::parse($r->tgl_diserahkan)->format('Y-m-d') : '',
                        $r->keterangan,
                        $r->status ?? 'ACTIVE',
                        $r->cancel_reason,
                        $r->created_at ? Carbon::parse($r->created_at)->format('Y-m-d H:i:s') : '',
                        $r->updated_at ? Carbon::parse($r->updated_at)->format('Y-m-d H:i:s') : '',
                    ]));
                }
            });

            fclose($out);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Cache-Control' => 'no-store, no-cache',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }

    // =====================
    // DOWNLOAD TEMPLATE
    // =====================
    public function downloadTemplate()
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $spreadsheet->getProperties()
            ->setCreator('PPBJ System')
            ->setTitle('Template Import PPBJ')
            ->setSubject('Template untuk import data PPBJ')
            ->setDescription('Template Excel untuk import data PPBJ secara massal');

        $headers = [
            'A1' => 'PPBJ No',
            'B1' => 'Tanggal PPBJ',
            'C1' => 'Tanggal Terima PR',
            'D1' => 'Uraian',
            'E1' => 'Note',
            'F1' => 'Portofolio',
            'G1' => 'Buyer',
            'H1' => 'Total Sebelum PPN',
            'I1' => 'Metode Pengadaan',
            'J1' => 'SPPH/RFQ 1',
            'K1' => 'RFQ 2',
            'L1' => 'RFQ 3',
            'M1' => 'Tanggal SPPH',
            'N1' => 'Closed Date',
            'O1' => 'SPH',
            'P1' => 'Tanggal SPH',
            'Q1' => 'Awarding SP',
            'R1' => 'Tanggal Awarding',
            'S1' => 'Penyedia Eksternal',
            'T1' => 'Tanggal SPK',
            'U1' => 'Nilai SP/SPK',
            'V1' => 'Promised Date',
            'W1' => 'DO No',
            'X1' => 'BPG No',
            'Y1' => 'Nilai BPG',
            'Z1' => 'Tanggal BPG',
            'AA1' => 'Receiving Transaction',
            'AB1' => 'BPB No',
            'AC1' => 'Tanggal BPB',
            'AD1' => 'No Invoice',
            'AE1' => 'Tanggal Invoice',
            'AF1' => 'Keterangan',
            'AG1' => 'Tanggal Diserahkan',
        ];

        foreach ($headers as $cell => $value) {
            $sheet->setCellValue($cell, $value);
        }

        $headerStyle = [
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF'], 'size' => 11],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '4472C4']],
            'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN, 'color' => ['rgb' => '000000']]],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER, 'vertical' => Alignment::VERTICAL_CENTER],
        ];
        $sheet->getStyle('A1:AG1')->applyFromArray($headerStyle);
        $sheet->getRowDimension(1)->setRowHeight(25);
        $sheet->freezePane('A2');
        $sheet->setAutoFilter('A1:AG1');

        $exampleData = [
            'PPBJ001/2026',
            '2026-01-15',
            '2026-01-10',
            'Pengadaan Komputer',
            'Catatan tambahan',
            'IT',
            'John Doe',
            '50000000',
            'Tender',
            'SPPH001',
            'RFQ002',
            'RFQ003',
            '2026-01-12',
            '2026-01-20',
            'SPH001',
            '2026-01-13',
            'AWD001',
            '2026-01-14',
            'PT ABC',
            '2026-01-16',
            '48000000',
            '2026-02-01',
            'DO001',
            'BPG001',
            '48000000',
            '2026-01-25',
            'RT001',
            'BPB001',
            '2026-01-26',
            'INV001',
            '2026-01-27',
            'Proses berjalan lancar',
            '2026-01-11',
        ];
        $sheet->fromArray($exampleData, null, 'A2');
        $sheet->getStyle('A2:AG2')->applyFromArray([
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => 'E7E6E6']],
            'font' => ['italic' => true, 'color' => ['rgb' => '666666']],
        ]);

        $columnWidths = [
            'A' => 15,
            'B' => 15,
            'C' => 18,
            'D' => 30,
            'E' => 25,
            'F' => 15,
            'G' => 15,
            'H' => 18,
            'I' => 18,
            'J' => 15,
            'K' => 12,
            'L' => 12,
            'M' => 15,
            'N' => 15,
            'O' => 12,
            'P' => 15,
            'Q' => 15,
            'R' => 18,
            'S' => 20,
            'T' => 15,
            'U' => 15,
            'V' => 15,
            'W' => 12,
            'X' => 12,
            'Y' => 15,
            'Z' => 15,
            'AA' => 20,
            'AB' => 12,
            'AC' => 15,
            'AD' => 15,
            'AE' => 15,
            'AF' => 30,
            'AG' => 18,
        ];
        foreach ($columnWidths as $col => $width) {
            $sheet->getColumnDimension($col)->setWidth($width);
        }

        $instructionSheet = $spreadsheet->createSheet();
        $instructionSheet->setTitle('Petunjuk');
        $instructions = [
            ['PETUNJUK PENGGUNAAN TEMPLATE IMPORT PPBJ'],
            [''],
            ['1. KOLOM WAJIB:'],
            ['   - PPBJ No: WAJIB diisi dan harus UNIK (tidak boleh duplikat)'],
            [''],
            ['2. FORMAT DATA:'],
            ['   - Tanggal: YYYY-MM-DD atau DD/MM/YYYY (contoh: 2026-01-15 atau 15/01/2026)'],
            ['   - Angka: 50000000, 50.000.000, atau Rp50.000.000'],
            ['   - Urutan kolom boleh diubah. Kolom tambahan yang tidak dikenal akan diabaikan'],
            [''],
            ['3. CARA MENGGUNAKAN:'],
            ['   a. Hapus baris contoh (baris 2) sebelum mengisi data Anda'],
            ['   b. Isi data mulai dari baris 3 ke bawah'],
            ['   c. Simpan file dengan format Excel (.xlsx)'],
            ['   d. Upload file ke sistem'],
            [''],
            ['4. CATATAN PENTING:'],
            ['   - Kolom yang kosong boleh dikosongkan (tidak wajib semua diisi)'],
            ['   - Hanya kolom PPBJ No/Nomor PR yang wajib tersedia'],
            ['   - Kolom otomatis seperti SLA, Progress akan dihitung sistem'],
            ['   - Maksimal ukuran file: 10MB'],
            ['   - Maksimal 2.000 baris per import'],
            ['   - Baris bermasalah akan dilewati; baris valid tetap dapat diimport'],
            [''],
            ['Jika masih ada masalah, hubungi administrator sistem.'],
        ];
        $instructionSheet->fromArray($instructions, null, 'A1');
        $instructionSheet->getColumnDimension('A')->setWidth(70);
        $instructionSheet->getStyle('A1')->applyFromArray([
            'font' => ['bold' => true, 'size' => 14, 'color' => ['rgb' => '4472C4']],
        ]);

        $spreadsheet->setActiveSheetIndex(0);

        $filename = 'Template_Import_PPBJ_' . now()->format('Ymd') . '.xlsx';
        $tempFile = tempnam(sys_get_temp_dir(), 'excel_');
        $writer = new Xlsx($spreadsheet);
        $writer->save($tempFile);

        return response()->download($tempFile, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ])->deleteFileAfterSend(true);
    }

    // =====================
    // PREVIEW IMPORT
    // =====================
    public function previewImport(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:xlsx,xls,csv,txt', 'max:10240'],
        ]);

        try {
            $file = $request->file('file');
            $extension = strtolower($file->getClientOriginalExtension());
            $warnings = [];

            if (in_array($extension, ['xlsx', 'xls'])) {
                $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($file->getRealPath());
                $worksheet = $spreadsheet->getActiveSheet();
                $rows = $worksheet->toArray(null, true, true, true);
                // Beberapa file memiliki judul/preamble sebelum header. Cari baris
                // yang benar-benar memuat kolom nomor PPBJ/PR, bukan sekadar baris pertama.
                $headerRowNumber = collect(array_keys($rows))->first(
                    fn ($rowNumber) => array_key_exists(
                        'ppbj_no',
                        $this->resolveImportColumnMap(array_values($rows[$rowNumber] ?? []))
                    )
                );

                if ($headerRowNumber === null) {
                    $headerRowNumber = collect(array_keys($rows))->first(function ($rowNumber) use ($rows) {
                        return collect($rows[$rowNumber] ?? [])->contains(
                            fn ($value) => $this->normalizeImportHeader($value) !== ''
                        );
                    });
                }

                if ($headerRowNumber === null) {
                    return response()->json([
                        'success' => false,
                        'message' => 'File kosong. Isi header dan minimal satu baris data.',
                    ], 422);
                }

                $header = array_values($rows[$headerRowNumber]);
                $rows = collect($rows)
                    ->filter(fn ($_row, $rowNumber) => (int) $rowNumber > (int) $headerRowNumber)
                    ->map(fn ($row) => array_values($row))
                    ->all();
            } else {
                [$header, $rows] = $this->readDelimitedImportFile($file->getRealPath());
            }

            $columnMap = $this->resolveImportColumnMap($header);
            if (! array_key_exists('ppbj_no', $columnMap)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kolom nomor PPBJ/PR tidak ditemukan.',
                    'details' => 'Gunakan header "PPBJ No", "Nomor PPBJ", atau "Nomor PR". Urutan kolom bebas dan kolom tambahan akan diabaikan.',
                ], 422);
            }

            $recognizedHeaders = count($columnMap);
            $recognizedIndexes = array_values($columnMap);
            $unknownHeaders = collect($header)
                ->map(fn ($value, $index) => ['index' => $index, 'value' => trim((string) $value)])
                ->filter(fn ($headerItem) => $headerItem['value'] !== '')
                ->reject(fn ($headerItem) => in_array($headerItem['index'], $recognizedIndexes, true))
                ->pluck('value')
                ->values()
                ->all();

            if ($unknownHeaders !== []) {
                $warnings[] = 'Kolom tambahan diabaikan: '.implode(', ', array_slice($unknownHeaders, 0, 8));
            }

            $fieldLabels = $this->importFieldLabels();
            $missingOptional = collect(array_keys($fieldLabels))
                ->reject(fn ($field) => $field === 'ppbj_no' || array_key_exists($field, $columnMap))
                ->map(fn ($field) => $fieldLabels[$field])
                ->values();
            if ($missingOptional->isNotEmpty()) {
                $warnings[] = $missingOptional->count().' kolom opsional tidak ada dan akan dikosongkan.';
            }

            if (count($rows) > 2000) {
                return response()->json([
                    'success' => false,
                    'message' => 'File berisi lebih dari 2.000 baris.',
                    'details' => 'Pisahkan file menjadi beberapa bagian agar import stabil dan mudah diperiksa.',
                ], 422);
            }

            $data = [];
            $seenNumbers = [];

            foreach ($rows as $rowIndex => $line) {
                $line = array_values((array) $line);
                if (collect($line)->every(fn ($value) => trim((string) ($value ?? '')) === '')) {
                    continue;
                }

                $rawItem = [];
                foreach ($fieldLabels as $field => $_label) {
                    $columnIndex = $columnMap[$field] ?? null;
                    $rawItem[$field] = $columnIndex === null ? null : ($line[$columnIndex] ?? null);
                }

                $sourceRowNumber = is_numeric($rowIndex) ? (int) $rowIndex : count($data) + 2;
                $number = trim((string) ($rawItem['ppbj_no'] ?? ''));

                if (mb_strtolower($number) === 'ppbj001/2026') {
                    $warnings[] = "Baris {$sourceRowNumber}: baris contoh dilewati";
                    continue;
                }

                [$isValid, $cleanItem, $validationErrors] = $this->validatePpbjImportItem($rawItem);
                $normalizedNumber = mb_strtolower(trim((string) ($cleanItem['ppbj_no'] ?? $number)));

                if ($normalizedNumber !== '') {
                    if (isset($seenNumbers[$normalizedNumber])) {
                        $validationErrors[] = 'PPBJ No duplikat dalam file';
                        $isValid = false;
                    } else {
                        $seenNumbers[$normalizedNumber] = count($data);
                    }
                }

                $data[] = array_merge($cleanItem, [
                    'row_number' => $sourceRowNumber,
                    'status' => $isValid ? 'valid' : 'error',
                    'errors' => array_values(array_unique($validationErrors)),
                ]);
            }

            if ($data === []) {
                return response()->json([
                    'success' => false,
                    'message' => 'File belum berisi data yang dapat diperiksa.',
                    'details' => 'Hapus baris contoh lalu isi data mulai dari baris berikutnya.',
                ], 422);
            }

            // Cek seluruh nomor dalam satu query. Ini menghindari N+1 saat file berisi banyak baris.
            $candidateNumbers = collect($data)
                ->where('status', 'valid')
                ->pluck('ppbj_no')
                ->map(fn ($number) => trim((string) $number))
                ->filter()
                ->unique()
                ->values();
            $existingNumbers = $candidateNumbers->isEmpty()
                ? collect()
                : Ppbj::query()
                    ->whereIn('ppbj_no', $candidateNumbers->all())
                    ->pluck('ppbj_no')
                    ->mapWithKeys(fn ($number) => [mb_strtolower(trim((string) $number)) => true]);

            foreach ($data as &$rowData) {
                $numberKey = mb_strtolower(trim((string) ($rowData['ppbj_no'] ?? '')));
                if ($numberKey !== '' && $existingNumbers->has($numberKey)) {
                    $rowData['status'] = 'error';
                    $rowData['errors'][] = 'PPBJ No sudah terdaftar di database';
                    $rowData['errors'] = array_values(array_unique($rowData['errors']));
                }
            }
            unset($rowData);

            $validCount = count(array_filter($data, fn ($row) => $row['status'] === 'valid'));
            $errorCount = count($data) - $validCount;

            return response()->json([
                'success' => true,
                'data' => $data,
                'summary' => ['total' => count($data), 'valid' => $validCount, 'error' => $errorCount],
                'warnings' => $warnings,
                'format' => [
                    'recognized_headers' => $recognizedHeaders,
                    'message' => 'Header dikenali otomatis; urutan kolom bebas.',
                ],
            ]);
        } catch (\PhpOffice\PhpSpreadsheet\Reader\Exception $e) {
            Log::warning('File import PPBJ tidak dapat dibaca', ['error' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'message' => 'File Excel tidak dapat dibaca atau rusak.',
                'details' => 'Simpan ulang sebagai .xlsx atau .csv, lalu coba kembali.',
            ], 422);
        } catch (\Throwable $e) {
            Log::error('Import preview error: '.$e->getMessage(), ['exception' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal memeriksa file import.',
                'details' => 'Pastikan file tidak diproteksi password dan mengikuti contoh pada template.',
            ], 422);
        }
    }

    // =====================
    // PROCESS IMPORT
    // =====================
    public function processImport(Request $request)
    {
        $request->validate([
            'data' => ['required', 'array', 'max:2000'],
            'data.*.ppbj_no' => ['required', 'string'],
        ]);

        $failed = 0;
        $errors = [];
        $preparedItems = [];
        $seenPpbjNumbers = [];

        foreach ($request->data as $item) {
            $rowNumber = $item['row_number'] ?? '-';

            if (isset($item['status']) && $item['status'] === 'error') {
                $failed++;
                continue;
            }

            [$isValid, $validatedItem, $validationErrors] = $this->validatePpbjImportItem($item);

            if (! $isValid) {
                $failed++;
                $errors[] = "Baris {$rowNumber}: " . implode(', ', $validationErrors);
                continue;
            }

            $normalizedNumber = mb_strtolower(trim((string) $validatedItem['ppbj_no']));
            if (isset($seenPpbjNumbers[$normalizedNumber])) {
                $failed++;
                $errors[] = "Baris {$rowNumber}: PPBJ No {$validatedItem['ppbj_no']} duplikat dalam data import";
                continue;
            }

            $seenPpbjNumbers[$normalizedNumber] = true;
            $preparedItems[] = [
                'row_number' => $rowNumber,
                'data' => $validatedItem,
            ];
        }

        // Satu query untuk seluruh nomor jauh lebih ringan daripada exists() per baris.
        $existingNumbers = empty($preparedItems)
            ? collect()
            : Ppbj::query()
                ->whereIn('ppbj_no', array_column(array_column($preparedItems, 'data'), 'ppbj_no'))
                ->pluck('ppbj_no')
                ->mapWithKeys(fn ($number) => [mb_strtolower(trim((string) $number)) => true]);

        $importableItems = [];
        foreach ($preparedItems as $preparedItem) {
            $number = (string) $preparedItem['data']['ppbj_no'];
            if ($existingNumbers->has(mb_strtolower(trim($number)))) {
                $failed++;
                $errors[] = "Baris {$preparedItem['row_number']}: PPBJ No {$number} sudah terdaftar";
                continue;
            }

            $importableItems[] = $preparedItem;
        }

        $imported = 0;
        if ($importableItems !== []) {
            try {
                $imported = DB::transaction(function () use ($request, $importableItems) {
                    $registeredAt = now();
                    $registrationColumns = collect([
                        'general_registration_number',
                        'general_registered_at',
                        'general_registered_by_user_id',
                    ])->filter(fn ($column) => Schema::hasColumn('ppbj', $column))->values()->all();
                    $registrationEnabled = in_array('general_registration_number', $registrationColumns, true);
                    $nextRegistrationSequence = null;

                    if ($registrationEnabled) {
                        $firstRegistration = $this->nextGeneralRegistrationNumber((int) $registeredAt->year);
                        preg_match('/(\d+)$/', $firstRegistration, $matches);
                        $nextRegistrationSequence = (int) ($matches[1] ?? 1);
                    }

                    foreach ($importableItems as $preparedItem) {
                        $importData = $preparedItem['data'];
                        // Kolom ini memiliki default 0 di database. Jangan mengirim NULL
                        // karena sebagian driver/database menolaknya meski default tersedia.
                        if (($importData['total_sebelum_ppn'] ?? null) === null) {
                            unset($importData['total_sebelum_ppn']);
                        }

                        $registrationPayload = [];
                        if ($registrationEnabled && $nextRegistrationSequence !== null) {
                            $registrationPayload = $this->generalRegistrationPayloadForSequence(
                                $request,
                                (int) $registeredAt->year,
                                $nextRegistrationSequence,
                                $registeredAt,
                                $registrationColumns
                            );
                            $nextRegistrationSequence++;
                        }

                        Ppbj::create(array_merge(
                            $importData,
                            ['created_by_user_id' => $request->user()?->id ?? auth()->id()],
                            $registrationPayload
                        ));
                    }

                    return count($importableItems);
                }, 3);
            } catch (QueryException $e) {
                Log::warning('Import PPBJ gagal karena data bentrok', [
                    'error' => $e->getMessage(),
                    'rows' => count($importableItems),
                ]);

                $failed += count($importableItems);
                $errors[] = 'Import dibatalkan karena ada nomor PPBJ atau Registrasi Umum yang dipakai bersamaan. Silakan refresh lalu ulangi import.';
            } catch (\Throwable $e) {
                Log::error('Import PPBJ gagal', [
                    'error' => $e->getMessage(),
                    'rows' => count($importableItems),
                ]);

                $failed += count($importableItems);
                $errors[] = 'Import dibatalkan agar data tetap konsisten. Silakan periksa file lalu coba kembali.';
            }
        }

        DashboardController::clearCache();

        return response()->json(['success' => true, 'imported' => $imported, 'failed' => $failed, 'errors' => $errors]);
    }

    private function generalRegistrationPayloadForSequence(
        Request $request,
        int $year,
        int $sequence,
        Carbon $registeredAt,
        array $availableColumns
    ): array {
        $payload = [
            'general_registration_number' => $this->formatGeneralRegistrationNumber($year, $sequence),
            'general_registered_at' => $registeredAt,
            'general_registered_by_user_id' => $request->user()?->id ?? auth()->id(),
        ];

        return array_intersect_key($payload, array_flip($availableColumns));
    }

    private function formatGeneralRegistrationNumber(int $year, int $sequence): string
    {
        return 'REG-UMUM/' . $year . '/' . str_pad((string) $sequence, 3, '0', STR_PAD_LEFT);
    }

    private function validatePpbjImportItem(array $item): array
    {
        $validator = validator($item, [
            'ppbj_no' => ['required', 'string', 'max:255'],
            'tgl_ppbj' => ['nullable', 'max:60'],
            'tgl_terima_pr' => ['nullable', 'max:60'],
            'uraian' => ['nullable', 'string', 'max:5000'],
            'note' => ['nullable', 'string', 'max:2000'],
            'portofolio' => ['nullable', 'string', 'max:255'],
            'buyer' => ['nullable', 'string', 'max:255'],
            'total_sebelum_ppn' => ['nullable', 'max:60'],
            'metode_pengadaan' => ['nullable', 'string', 'max:255'],
            'spph_rfq_1' => ['nullable', 'string', 'max:255'],
            'rfq_2' => ['nullable', 'string', 'max:255'],
            'rfq_3' => ['nullable', 'string', 'max:255'],
            'tgl_spph' => ['nullable', 'max:60'],
            'closed_date' => ['nullable', 'max:60'],
            'sph' => ['nullable', 'string', 'max:255'],
            'tgl_sph' => ['nullable', 'max:60'],
            'awarding_sp' => ['nullable', 'string', 'max:255'],
            'tgl_awarding_sp' => ['nullable', 'max:60'],
            'penyedia_eksternal' => ['nullable', 'string', 'max:255'],
            'tgl_spk' => ['nullable', 'max:60'],
            'nilai_sp_spk' => ['nullable', 'max:60'],
            'promised_date' => ['nullable', 'max:60'],
            'do_no' => ['nullable', 'string', 'max:255'],
            'bpg_no' => ['nullable', 'string', 'max:255'],
            'nilai_bpg' => ['nullable', 'max:60'],
            'tgl_bpg' => ['nullable', 'max:60'],
            'receiving_transaction' => ['nullable', 'string', 'max:255'],
            'bpb_no' => ['nullable', 'string', 'max:255'],
            'tgl_bpb' => ['nullable', 'max:60'],
            'no_invoice' => ['nullable', 'string', 'max:255'],
            'tgl_invoice' => ['nullable', 'max:60'],
            'keterangan' => ['nullable', 'string', 'max:5000'],
            'tgl_diserahkan' => ['nullable', 'max:60'],
        ]);

        if ($validator->fails()) {
            return [false, [], $validator->errors()->all()];
        }

        $clean = [];
        foreach ($validator->validated() as $key => $value) {
            $clean[$key] = is_string($value) ? trim($value) : $value;
        }

        $errors = [];
        foreach ([
            'tgl_ppbj', 'tgl_terima_pr', 'tgl_spph', 'closed_date', 'tgl_sph',
            'tgl_awarding_sp', 'tgl_spk', 'promised_date', 'tgl_bpg', 'tgl_bpb',
            'tgl_invoice', 'tgl_diserahkan',
        ] as $field) {
            $value = $clean[$field] ?? null;
            $clean[$field] = $value === null || $value === '' ? null : $this->parseDate($value);

            if (($value !== null && $value !== '') && ! $clean[$field]) {
                $errors[] = ucwords(str_replace('_', ' ', $field)) . ' format tidak valid';
            }
        }

        foreach (['total_sebelum_ppn', 'nilai_sp_spk', 'nilai_bpg'] as $field) {
            $clean[$field] = $this->parseImportNumber($clean[$field] ?? null, $field, $errors);
        }

        foreach ([
            'uraian', 'note', 'portofolio', 'buyer', 'metode_pengadaan', 'spph_rfq_1',
            'rfq_2', 'rfq_3', 'sph', 'awarding_sp', 'penyedia_eksternal', 'do_no',
            'bpg_no', 'receiving_transaction', 'bpb_no', 'no_invoice', 'keterangan',
        ] as $field) {
            $clean[$field] = ($clean[$field] ?? null) === '' ? null : ($clean[$field] ?? null);
        }

        return [$errors === [], $clean, $errors];
    }

    private function parseImportNumber(mixed $value, string $field, array &$errors): ?float
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_int($value) || is_float($value)) {
            return (float) $value;
        }

        $raw = trim((string) $value);
        $negative = str_starts_with($raw, '(') && str_ends_with($raw, ')');
        $cleaned = preg_replace('/[^0-9,\.\-]/u', '', $raw) ?? '';
        $cleaned = trim($cleaned);

        $commaCount = substr_count($cleaned, ',');
        $dotCount = substr_count($cleaned, '.');

        if ($commaCount > 0 && $dotCount > 0) {
            // Separator terakhir adalah desimal; separator lainnya adalah ribuan.
            $lastComma = strrpos($cleaned, ',');
            $lastDot = strrpos($cleaned, '.');
            $decimalSeparator = $lastComma > $lastDot ? ',' : '.';
            $thousandSeparator = $decimalSeparator === ',' ? '.' : ',';
            $cleaned = str_replace($thousandSeparator, '', $cleaned);
            $cleaned = str_replace($decimalSeparator, '.', $cleaned);
        } elseif ($commaCount > 0 || $dotCount > 0) {
            $separator = $commaCount > 0 ? ',' : '.';
            $count = $commaCount + $dotCount;
            $lastPartLength = strlen((string) substr(strrchr($cleaned, $separator), 1));

            if ($count > 1 || $lastPartLength === 3) {
                $cleaned = str_replace($separator, '', $cleaned);
            } else {
                $cleaned = str_replace($separator, '.', $cleaned);
            }
        }

        if ($negative && ! str_starts_with($cleaned, '-')) {
            $cleaned = '-'.$cleaned;
        }

        if (! is_numeric($cleaned)) {
            $errors[] = ucwords(str_replace('_', ' ', $field)).' harus berupa angka (contoh: 1500000 atau Rp1.500.000)';

            return null;
        }

        return (float) $cleaned;
    }

    /**
     * Nama field baku yang dipakai preview dan proses import.
     */
    private function importFieldLabels(): array
    {
        return [
            'ppbj_no' => 'PPBJ No',
            'tgl_ppbj' => 'Tanggal PPBJ',
            'tgl_terima_pr' => 'Tanggal Terima PR',
            'uraian' => 'Uraian',
            'note' => 'Note',
            'portofolio' => 'Portofolio',
            'buyer' => 'Buyer',
            'total_sebelum_ppn' => 'Total Sebelum PPN',
            'metode_pengadaan' => 'Metode Pengadaan',
            'spph_rfq_1' => 'SPPH/RFQ 1',
            'rfq_2' => 'RFQ 2',
            'rfq_3' => 'RFQ 3',
            'tgl_spph' => 'Tanggal SPPH',
            'closed_date' => 'Closed Date',
            'sph' => 'SPH',
            'tgl_sph' => 'Tanggal SPH',
            'awarding_sp' => 'Awarding SP',
            'tgl_awarding_sp' => 'Tanggal Awarding',
            'penyedia_eksternal' => 'Penyedia Eksternal',
            'tgl_spk' => 'Tanggal SPK',
            'nilai_sp_spk' => 'Nilai SP/SPK',
            'promised_date' => 'Promised Date',
            'do_no' => 'DO No',
            'bpg_no' => 'BPG No',
            'nilai_bpg' => 'Nilai BPG',
            'tgl_bpg' => 'Tanggal BPG',
            'receiving_transaction' => 'Receiving Transaction',
            'bpb_no' => 'BPB No',
            'tgl_bpb' => 'Tanggal BPB',
            'no_invoice' => 'No Invoice',
            'tgl_invoice' => 'Tanggal Invoice',
            'keterangan' => 'Keterangan',
            'tgl_diserahkan' => 'Tanggal Diserahkan',
        ];
    }

    private function importHeaderAliases(): array
    {
        return [
            'ppbj_no' => ['PPBJ No', 'No PPBJ', 'Nomor PPBJ', 'Nomor PR', 'No PR', 'PPBJ/PR', 'No PPBJ/PR'],
            'tgl_ppbj' => ['Tanggal PPBJ', 'Tgl PPBJ', 'Tanggal PR', 'Tgl PR'],
            'tgl_terima_pr' => ['Tanggal Terima PR', 'Tgl Terima PR', 'Tanggal Diterima'],
            'uraian' => ['Uraian', 'Deskripsi', 'Uraian Pengadaan', 'Deskripsi Pengadaan'],
            'note' => ['Note', 'Catatan'],
            'portofolio' => ['Portofolio', 'Portfolio'],
            'buyer' => ['Buyer', 'PIC', 'Nama Buyer'],
            'total_sebelum_ppn' => ['Total Sebelum PPN', 'Nilai PR', 'Harga PR', 'Total PR'],
            'metode_pengadaan' => ['Metode Pengadaan', 'Metode'],
            'spph_rfq_1' => ['SPPH/RFQ 1', 'SPPH', 'RFQ 1', 'No SPPH'],
            'rfq_2' => ['RFQ 2', 'SPPH/RFQ 2'],
            'rfq_3' => ['RFQ 3', 'SPPH/RFQ 3'],
            'tgl_spph' => ['Tanggal SPPH', 'Tgl SPPH'],
            'closed_date' => ['Closed Date', 'Tanggal Closed', 'Tanggal Tutup'],
            'sph' => ['SPH', 'No SPH'],
            'tgl_sph' => ['Tanggal SPH', 'Tgl SPH'],
            'awarding_sp' => ['Awarding SP', 'No SP', 'Nomor SP', 'SP/Kontrak'],
            'tgl_awarding_sp' => ['Tanggal Awarding', 'Tgl Awarding', 'Tanggal SP'],
            'penyedia_eksternal' => ['Penyedia Eksternal', 'Vendor', 'Nama Vendor', 'Penyedia'],
            'tgl_spk' => ['Tanggal SPK', 'Tgl SPK'],
            'nilai_sp_spk' => ['Nilai SP/SPK', 'Nilai SP', 'Harga SP', 'Nilai Kontrak'],
            'promised_date' => ['Promised Date', 'Tanggal Pemenuhan', 'Estimasi Datang'],
            'do_no' => ['DO No', 'No DO', 'Nomor DO'],
            'bpg_no' => ['BPG No', 'No BPG', 'Nomor BPG'],
            'nilai_bpg' => ['Nilai BPG'],
            'tgl_bpg' => ['Tanggal BPG', 'Tgl BPG'],
            'receiving_transaction' => ['Receiving Transaction', 'Receiving', 'Transaksi Penerimaan'],
            'bpb_no' => ['BPB No', 'No BPB', 'Nomor BPB'],
            'tgl_bpb' => ['Tanggal BPB', 'Tgl BPB'],
            'no_invoice' => ['No Invoice', 'Nomor Invoice', 'Invoice'],
            'tgl_invoice' => ['Tanggal Invoice', 'Tgl Invoice'],
            'keterangan' => ['Keterangan', 'Remarks'],
            'tgl_diserahkan' => ['Tanggal Diserahkan', 'Tgl Diserahkan', 'Tanggal Serah ke Umum'],
        ];
    }

    private function normalizeImportHeader(mixed $value): string
    {
        $value = preg_replace('/^\xEF\xBB\xBF/', '', trim((string) $value)) ?? '';
        $value = mb_strtolower($value);

        return preg_replace('/[^a-z0-9]+/u', '', $value) ?? '';
    }

    private function resolveImportColumnMap(array $headers): array
    {
        $aliasLookup = [];
        foreach ($this->importHeaderAliases() as $field => $aliases) {
            foreach ($aliases as $alias) {
                $aliasLookup[$this->normalizeImportHeader($alias)] = $field;
            }
        }

        $columnMap = [];
        foreach (array_values($headers) as $index => $header) {
            $normalized = $this->normalizeImportHeader($header);
            $field = $aliasLookup[$normalized] ?? null;
            if ($field !== null && ! array_key_exists($field, $columnMap)) {
                $columnMap[$field] = $index;
            }
        }

        return $columnMap;
    }

    private function readDelimitedImportFile(string $path): array
    {
        $sample = (string) file_get_contents($path, false, null, 0, 8192);
        $sample = preg_replace('/^\xEF\xBB\xBF/', '', $sample) ?? $sample;
        $sampleLines = collect(preg_split('/\r\n|\r|\n/', $sample) ?: [])
            ->map(fn ($line) => trim((string) $line))
            ->filter()
            ->take(20);
        $delimiters = [',', ';', "\t", '|'];
        $delimiter = collect($delimiters)
            ->sortByDesc(fn ($candidate) => $sampleLines->max(
                fn ($line) => count(str_getcsv($line, $candidate))
            ) ?? 1)
            ->first() ?? ',';

        $handle = fopen($path, 'rb');
        if ($handle === false) {
            throw new \RuntimeException('File tidak dapat dibuka.');
        }

        $rows = [];
        $lineNumber = 0;
        while (($line = fgetcsv($handle, 0, $delimiter)) !== false) {
            $lineNumber++;
            if ($lineNumber === 1 && isset($line[0])) {
                $line[0] = preg_replace('/^\xEF\xBB\xBF/', '', (string) $line[0]) ?? $line[0];
            }
            $rows[$lineNumber] = $line;
        }
        fclose($handle);

        $headerRowNumber = collect(array_keys($rows))->first(
            fn ($rowNumber) => array_key_exists('ppbj_no', $this->resolveImportColumnMap($rows[$rowNumber] ?? []))
        );
        if ($headerRowNumber === null) {
            $headerRowNumber = array_key_first($rows);
        }

        $header = $headerRowNumber === null ? [] : ($rows[$headerRowNumber] ?? []);
        $dataRows = collect($rows)
            ->filter(fn ($_row, $rowNumber) => $headerRowNumber !== null && $rowNumber > $headerRowNumber)
            ->all();

        return [$header, $dataRows];
    }

    // =====================
    // LAPORAN
    // =====================
    public function reportIndex()
    {
        $portofolios = Cache::remember('report_filter_portofolios', 300, function () {
            return collect(MasterPortofolio::orderBy('nama')->pluck('nama'))
                ->merge(
                    DB::table('ppbj')
                        ->whereNotNull('portofolio')
                        ->where('portofolio', '!=', '')
                        ->distinct()
                        ->orderBy('portofolio')
                        ->pluck('portofolio')
                )
                ->map(fn($value) => trim((string) $value))
                ->filter()
                ->unique(fn($value) => mb_strtolower($value))
                ->sort(SORT_NATURAL | SORT_FLAG_CASE)
                ->values();
        });

        $vendors = Cache::remember('report_filter_vendors', 300, function () {
            return collect(MasterPenyediaEksternal::orderBy('nama')->pluck('nama'))
                ->merge(
                    DB::table('ppbj')
                        ->whereNotNull('penyedia_eksternal')
                        ->where('penyedia_eksternal', '!=', '')
                        ->distinct()
                        ->orderBy('penyedia_eksternal')
                        ->pluck('penyedia_eksternal')
                )
                ->map(fn($value) => trim((string) $value))
                ->filter()
                ->unique(fn($value) => mb_strtolower($value))
                ->sort(SORT_NATURAL | SORT_FLAG_CASE)
                ->values();
        });

        return view('ppbj.report', compact('portofolios', 'vendors'));
    }

    public function reportData(Request $request)
    {
        $query = $this->applyReportFilters(Ppbj::query(), $request);

        $statsRow = (clone $query)
            ->selectRaw(<<<'SQL'
                COUNT(*) as total,
                SUM(CASE WHEN status_sla = 'ON TRACK' THEN 1 ELSE 0 END) as on_track,
                SUM(CASE WHEN status_sla = 'WARNING' THEN 1 ELSE 0 END) as warning,
                SUM(CASE WHEN status_sla = 'OVERDUE' THEN 1 ELSE 0 END) as overdue,
                SUM(CASE WHEN status_sla = 'CANCELLED' OR status = 'CANCELLED' THEN 1 ELSE 0 END) as cancelled,
                COALESCE(SUM(total_sebelum_ppn), 0) as total_value,
                COALESCE(SUM(nilai_sp_spk), 0) as total_sp_value,
                COALESCE(SUM(nilai_bpg), 0) as total_bpg_value,
                AVG(progres) as avg_progress,
                COUNT(DISTINCT NULLIF(portofolio, '')) as total_portofolio,
                COUNT(DISTINCT NULLIF(penyedia_eksternal, '')) as total_vendor
            SQL)
            ->first();

        $byPortofolio = (clone $query)
            ->selectRaw("COALESCE(NULLIF(portofolio, ''), 'Tanpa Portofolio') as label, COUNT(*) as total, COALESCE(SUM(total_sebelum_ppn), 0) as total_value, COALESCE(SUM(nilai_sp_spk), 0) as total_sp_value")
            ->groupBy('portofolio')
            ->orderByDesc('total_value')
            ->limit(20)
            ->get();

        $byVendor = (clone $query)
            ->selectRaw("COALESCE(NULLIF(penyedia_eksternal, ''), 'Tanpa Vendor') as label, COUNT(*) as total, COALESCE(SUM(total_sebelum_ppn), 0) as total_value, COALESCE(SUM(nilai_sp_spk), 0) as total_sp_value")
            ->groupBy('penyedia_eksternal')
            ->orderByDesc('total_value')
            ->limit(20)
            ->get();

        $data = (clone $query)
            ->select([
                'ppbj_no',
                'created_at',
                'uraian',
                'portofolio',
                'buyer',
                'penyedia_eksternal',
                'status_sla',
                'status',
                'progres',
                'total_sebelum_ppn',
                'nilai_sp_spk',
                'nilai_bpg',
            ])
            ->orderByDesc('created_at')
            ->limit(1000)
            ->get();

        return response()->json([
            'data' => $data,
            'stats' => [
                'total' => (int) ($statsRow->total ?? 0),
                'on_track' => (int) ($statsRow->on_track ?? 0),
                'warning' => (int) ($statsRow->warning ?? 0),
                'overdue' => (int) ($statsRow->overdue ?? 0),
                'cancelled' => (int) ($statsRow->cancelled ?? 0),
                'total_value' => (float) ($statsRow->total_value ?? 0),
                'total_sp_value' => (float) ($statsRow->total_sp_value ?? 0),
                'total_bpg_value' => (float) ($statsRow->total_bpg_value ?? 0),
                'avg_progress' => (float) ($statsRow->avg_progress ?? 0),
                'total_portofolio' => (int) ($statsRow->total_portofolio ?? 0),
                'total_vendor' => (int) ($statsRow->total_vendor ?? 0),
            ],
            'breakdown' => [
                'portofolio' => $byPortofolio,
                'vendor' => $byVendor,
            ],
        ]);
    }

    public function reportExport(Request $request)
    {
        $period = $request->get('period', 'monthly');
        $filename = 'Laporan_PPBJ_' . ucfirst($period) . '_' . now()->format('Ymd_His') . '.csv';

        return response()->streamDownload(function () use ($request) {
            $out = fopen('php://output', 'w');
            fprintf($out, chr(0xEF) . chr(0xBB) . chr(0xBF));
            fputcsv($out, ['No PPBJ', 'Tanggal Dibuat', 'Uraian', 'Portofolio', 'Buyer', 'Penyedia/Vendor', 'Total PR (Rp)', 'Nilai SP/SPK (Rp)', 'Nilai BPG (Rp)', 'Status SLA', 'Sisa SLA (Hari)', 'Progress (%)', 'Status']);

            $query = $this->applyReportFilters(Ppbj::query(), $request);

            $query->orderByDesc('created_at')->chunk(500, function ($rows) use ($out) {
                foreach ($rows as $r) {
                    fputcsv($out, \App\Support\Csv::row([
                        $r->ppbj_no,
                        $r->created_at ? Carbon::parse($r->created_at)->format('d/m/Y H:i') : '-',
                        $r->uraian,
                        $r->portofolio,
                        $r->buyer,
                        $r->penyedia_eksternal,
                        number_format($r->total_sebelum_ppn, 0, ',', '.'),
                        number_format($r->nilai_sp_spk ?? 0, 0, ',', '.'),
                        number_format($r->nilai_bpg ?? 0, 0, ',', '.'),
                        $r->status_sla,
                        $r->sisa_target_sla . ' hari',
                        $r->progres . '%',
                        $r->status ?? 'ACTIVE',
                    ]));
                }
            });
            fclose($out);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8', 'Cache-Control' => 'no-store, no-cache']);
    }

    private function applyReportFilters($query, Request $request)
    {
        $period = $request->get('period', 'monthly');
        $startDate = $request->get('start_date');
        $endDate = $request->get('end_date');

        if ($period === 'daily' && $startDate) {
            $d = Carbon::parse($startDate);
            $query->whereBetween('created_at', [
                $d->copy()->startOfDay(),
                $d->copy()->endOfDay(),
            ]);
        } elseif ($period === 'monthly' && $startDate) {
            $d = Carbon::parse($startDate);
            $query->whereBetween('created_at', [
                $d->copy()->startOfMonth(),
                $d->copy()->endOfMonth(),
            ]);
        } elseif ($period === 'yearly' && $startDate) {
            $d = Carbon::parse($startDate);
            $query->whereBetween('created_at', [
                $d->copy()->startOfYear(),
                $d->copy()->endOfYear(),
            ]);
        } elseif ($period === 'custom' && $startDate && $endDate) {
            $query->whereBetween('created_at', [
                Carbon::parse($startDate)->startOfDay(),
                Carbon::parse($endDate)->endOfDay(),
            ]);
        }

        $portofolios = $this->multiFilterValues($request, 'portofolio');
        if ($portofolios) {
            $query->whereIn('portofolio', $portofolios);
        }

        $vendors = $this->multiFilterValues($request, 'vendor');
        if ($vendors) {
            $query->whereIn('penyedia_eksternal', $vendors);
        }

        return $query;
    }

    private function multiFilterValues(Request $request, string $key): array
    {
        $value = $request->input($key, $request->input($key . 's', []));

        return collect(is_array($value) ? $value : [$value])
            ->flatMap(fn($item) => is_string($item) ? explode(',', $item) : [$item])
            ->map(fn($item) => trim((string) $item))
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    // =====================
    // HELPER: Parse Date
    // =====================
    private function parseDate($value)
    {
        if (empty($value))
            return null;
        $value = trim((string) $value);

        if (is_numeric($value) && $value > 25569) {
            try {
                return \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($value)->format('Y-m-d');
            } catch (\Exception $e) {
            }
        }

        foreach (['Y-m-d', 'd/m/Y', 'd-m-Y', 'd.m.Y', 'm/d/Y', 'Y/m/d'] as $format) {
            try {
                $date = \DateTime::createFromFormat($format, $value);
                if ($date && $date->format($format) === $value)
                    return $date->format('Y-m-d');
            } catch (\Exception $e) {
                continue;
            }
        }

        try {
            return Carbon::parse($value)->format('Y-m-d');
        } catch (\Exception $e) {
            return null;
        }
    }
}
