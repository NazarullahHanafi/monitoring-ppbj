<?php

namespace App\Http\Controllers;

use App\Models\Ppbj;
use App\Models\PrReceiptApproval;  // ← TAMBAHAN: import model approval
use Illuminate\Http\Request;
use App\Models\MasterBuyer;
use App\Models\MasterPortofolio;
use App\Models\MasterMetodePengadaan;
use App\Models\MasterPenyediaEksternal;
use Illuminate\Validation\Rule;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use App\Services\PrArchiveService;

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
                'progres',
                'status_sla',
                'sisa_target_sla',
                'status',
                'keterangan',
                'created_at',
            ]);

        // ── Search + deteksi field yang cocok ──────────────────────────────────
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
                    ->orWhere('no_invoice', 'like', $likeKeyword); // No. Invoice
            });

            $fieldMap = [
                'uraian' => 'Uraian',
                'ppbj_no' => 'No. PPBJ',
                'awarding_sp' => 'Awarding / SP / Kontrak',
                'sph' => 'SPH',
                'spph_rfq_1' => 'SPPH / RFQ 1',
                'do_no' => 'No. DO (Delivery Order)',
                'bpg_no' => 'No. BPG (Bukti Penerimaan Gudang)',
                'bpb_no' => 'No. BPB (Bukti Pengeluaran Barang)',
                'no_invoice' => 'No. Invoice',
            ];

            $matchSelects = [];
            $matchBindings = [];
            foreach (array_keys($fieldMap) as $col) {
                $matchSelects[] = "MAX(CASE WHEN {$col} LIKE ? THEN 1 ELSE 0 END) as match_{$col}";
                $matchBindings[] = $likeKeyword;
            }

            $matchRow = DB::table('ppbj')
                ->selectRaw(implode(', ', $matchSelects), $matchBindings)
                ->first();

            $matchedFields = [];
            foreach ($fieldMap as $col => $label) {
                if ((int) ($matchRow?->{"match_{$col}"} ?? 0) === 1) {
                    $matchedFields[] = $label;
                }
            }

            $searchContext = [
                'keyword' => $keyword,
                'matched_fields' => $matchedFields,
                'all_fields' => array_values($fieldMap),
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

        if ($request->filled('status_sla')) {
            $statusSla = $request->status_sla;
            Log::info('Filter status_sla applying: ' . $statusSla);

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

            Log::info('Filter status_sla applied: ' . $statusSla);
        }

        if ($request->filled('progress')) {
            $progress = $request->progress;
            Log::info('Filter progress applying: ' . $progress);

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

            Log::info('Filter progress applied: ' . $progress);
        }

        if ($request->filled('date_type')) {
            $dateType = $request->date_type;
            if ($dateType === 'daily' && $request->filled('date_day')) {
                $query->whereDate('tgl_ppbj', $request->date_day);
            } elseif ($dateType === 'monthly' && $request->filled('date_month')) {
                try {
                    $date = Carbon::parse($request->date_month);
                    $query->whereYear('tgl_ppbj', $date->year)->whereMonth('tgl_ppbj', $date->month);
                } catch (\Exception $e) {
                }
            } elseif ($dateType === 'yearly' && $request->filled('date_year')) {
                $query->whereYear('tgl_ppbj', $request->date_year);
            } elseif ($dateType === 'range' && $request->filled('date_start') && $request->filled('date_end')) {
                $query->whereBetween('tgl_ppbj', [$request->date_start, $request->date_end]);
            }
        }

        $perPage = (int) $request->get('per_page', 10);
        $perPage = in_array($perPage, [10, 25, 50, 100]) ? $perPage : 10;
        $query->orderBy('id', 'desc');
        $ppbj = $query->paginate($perPage)->withQueryString();

        $portofolios = Cache::remember(
            'master_portofolios',
            60,
            fn() =>
            MasterPortofolio::orderBy('nama')->pluck('nama', 'id')
        );
        $buyers = Cache::remember(
            'master_buyers',
            60,
            fn() =>
            MasterBuyer::orderBy('nama')->pluck('nama', 'id')
        );
        $metodePengadaans = Cache::remember(
            'master_metode_pengadaan',
            60,
            fn() =>
            MasterMetodePengadaan::orderBy('nama')->pluck('nama')
        );
        $penyediaEksternals = Cache::remember(
            'master_penyedia_eksternal',
            60,
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
            $data = $request->only(Ppbj::manualFields());
            Ppbj::create($data);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'No PPBJ sudah dipakai oleh data lain. Silakan refresh halaman dan cek data terbaru.',
            ], 422);
        }

        DashboardController::clearCache();

        return response()->json(['message' => 'Data berhasil disimpan']);
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
        ]);

        $ppbj->update([
            'status' => 'CANCELLED',
            'status_sla' => 'CANCELLED',
            'cancel_reason' => $request->reason,
            'cancelled_at' => now(),
        ]);

        DashboardController::clearCache();

        return response()->json(['message' => 'Data berhasil di-cancel']);
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
                    $query->whereDate('tgl_ppbj', $request->date_day);
                } elseif ($dateType === 'monthly' && $request->filled('date_month')) {
                    try {
                        $date = Carbon::parse($request->date_month);
                        $query->whereYear('tgl_ppbj', $date->year)->whereMonth('tgl_ppbj', $date->month);
                    } catch (\Exception $e) {
                    }
                } elseif ($dateType === 'yearly' && $request->filled('date_year')) {
                    $query->whereYear('tgl_ppbj', $request->date_year);
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
            ['   - Format Tanggal: YYYY-MM-DD (contoh: 2026-01-15)'],
            ['   - Format Angka: Tanpa titik/koma (contoh: 50000000)'],
            ['   - Jangan mengubah nama kolom/header!'],
            [''],
            ['3. CARA MENGGUNAKAN:'],
            ['   a. Hapus baris contoh (baris 2) sebelum mengisi data Anda'],
            ['   b. Isi data mulai dari baris 3 ke bawah'],
            ['   c. Simpan file dengan format Excel (.xlsx)'],
            ['   d. Upload file ke sistem'],
            [''],
            ['4. CATATAN PENTING:'],
            ['   - Kolom yang kosong boleh dikosongkan (tidak wajib semua diisi)'],
            ['   - Kolom otomatis seperti SLA, Progress akan dihitung sistem'],
            ['   - Maksimal ukuran file: 10MB'],
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
        Log::info('Preview import started');

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
                if ($bom !== chr(0xEF) . chr(0xBB) . chr(0xBF))
                    rewind($handle);
                $header = array_map('trim', fgetcsv($handle));
                $rows = [];
                $rowNum = 1;
                while (($line = fgetcsv($handle)) !== false) {
                    $rows[++$rowNum] = $line;
                }
                fclose($handle);
            }

            $expectedHeaders = [
                'PPBJ No',
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
                'SPH',
                'Tanggal SPH',
                'Awarding SP',
                'Tanggal Awarding',
                'Penyedia Eksternal',
                'Tanggal SPK',
                'Nilai SP/SPK',
                'Promised Date',
                'DO No',
                'BPG No',
                'Nilai BPG',
                'Tanggal BPG',
                'Receiving Transaction',
                'BPB No',
                'Tanggal BPB',
                'No Invoice',
                'Tanggal Invoice',
                'Keterangan',
                'Tanggal Diserahkan',
            ];

            $headerMismatch = count($header) !== count($expectedHeaders);
            if (!$headerMismatch) {
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
                    'message' => 'Format template tidak sesuai. Silakan download template yang benar.',
                ], 422);
            }

            $ppbjNosInFile = [];

            foreach ($rows as $rowIndex => $line) {
                if ($rowIndex == 1)
                    continue;
                if (!isset($line[0]))
                    $line = array_values($line);
                $line = array_map(fn($v) => is_string($v) ? trim($v) : $v, $line);
                if (empty(array_filter($line, fn($v) => !empty($v))))
                    continue;
                if (isset($line[0]) && $line[0] === 'PPBJ001/2026') {
                    $warnings[] = "Baris $rowIndex: Baris contoh dilewati";
                    continue;
                }

                $rowData = [
                    'row_number' => $rowIndex,
                    'ppbj_no' => $line[0] ?? '',
                    'tgl_ppbj' => $line[1] ?? '',
                    'tgl_terima_pr' => $line[2] ?? '',
                    'uraian' => $line[3] ?? '',
                    'note' => $line[4] ?? '',
                    'portofolio' => $line[5] ?? '',
                    'buyer' => $line[6] ?? '',
                    'total_sebelum_ppn' => $line[7] ?? '',
                    'metode_pengadaan' => $line[8] ?? '',
                    'spph_rfq_1' => $line[9] ?? '',
                    'rfq_2' => $line[10] ?? '',
                    'rfq_3' => $line[11] ?? '',
                    'tgl_spph' => $line[12] ?? '',
                    'closed_date' => $line[13] ?? '',
                    'sph' => $line[14] ?? '',
                    'tgl_sph' => $line[15] ?? '',
                    'awarding_sp' => $line[16] ?? '',
                    'tgl_awarding_sp' => $line[17] ?? '',
                    'penyedia_eksternal' => $line[18] ?? '',
                    'tgl_spk' => $line[19] ?? '',
                    'nilai_sp_spk' => $line[20] ?? '',
                    'promised_date' => $line[21] ?? '',
                    'do_no' => $line[22] ?? '',
                    'bpg_no' => $line[23] ?? '',
                    'nilai_bpg' => $line[24] ?? '',
                    'tgl_bpg' => $line[25] ?? '',
                    'receiving_transaction' => $line[26] ?? '',
                    'bpb_no' => $line[27] ?? '',
                    'tgl_bpb' => $line[28] ?? '',
                    'no_invoice' => $line[29] ?? '',
                    'tgl_invoice' => $line[30] ?? '',
                    'keterangan' => $line[31] ?? '',
                    'tgl_diserahkan' => $line[32] ?? '',
                    'status' => 'valid',
                    'errors' => [],
                ];

                // Validasi PPBJ No
                if (empty($rowData['ppbj_no'])) {
                    $rowData['status'] = 'error';
                    $rowData['errors'][] = 'PPBJ No wajib diisi';
                } else {
                    if (in_array($rowData['ppbj_no'], $ppbjNosInFile)) {
                        $rowData['status'] = 'error';
                        $rowData['errors'][] = 'PPBJ No duplikat dalam file';
                    } else {
                        $ppbjNosInFile[] = $rowData['ppbj_no'];
                        if (Ppbj::where('ppbj_no', $rowData['ppbj_no'])->exists()) {
                            $rowData['status'] = 'error';
                            $rowData['errors'][] = 'PPBJ No sudah terdaftar di database';
                        }
                    }
                }

                $dateFields = [
                    'tgl_ppbj',
                    'tgl_terima_pr',
                    'tgl_spph',
                    'closed_date',
                    'tgl_sph',
                    'tgl_awarding_sp',
                    'tgl_spk',
                    'promised_date',
                    'tgl_bpg',
                    'tgl_bpb',
                    'tgl_invoice',
                    'tgl_diserahkan',
                ];
                foreach ($dateFields as $field) {
                    if (!empty($rowData[$field]) && !$this->parseDate($rowData[$field])) {
                        $rowData['status'] = 'error';
                        $rowData['errors'][] = ucwords(str_replace('_', ' ', $field)) . ' format tidak valid';
                    }
                }

                foreach (['total_sebelum_ppn', 'nilai_sp_spk', 'nilai_bpg'] as $field) {
                    if (!empty($rowData[$field])) {
                        $cleaned = str_replace([',', '.', ' ', 'Rp'], '', $rowData[$field]);
                        if (!is_numeric($cleaned)) {
                            $rowData['status'] = 'error';
                            $rowData['errors'][] = ucwords(str_replace('_', ' ', $field)) . ' harus berupa angka';
                        }
                    }
                }

                $data[] = $rowData;
            }

            if (empty($data)) {
                return response()->json(['success' => false, 'message' => 'File tidak mengandung data valid'], 422);
            }

            $validCount = count(array_filter($data, fn($d) => $d['status'] === 'valid'));
            $errorCount = count(array_filter($data, fn($d) => $d['status'] === 'error'));

            return response()->json([
                'success' => true,
                'data' => $data,
                'summary' => ['total' => count($data), 'valid' => $validCount, 'error' => $errorCount],
                'warnings' => $warnings,
            ]);

        } catch (\Exception $e) {
            Log::error('Import preview error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal memproses file. Pastikan format file sesuai template.'], 500);
        }
    }

    // =====================
    // PROCESS IMPORT
    // =====================
    public function processImport(Request $request)
    {
        $request->validate([
            'data' => ['required', 'array'],
            'data.*.ppbj_no' => ['required', 'string'],
        ]);

        $imported = 0;
        $failed = 0;
        $errors = [];

        foreach ($request->data as $item) {
            try {
                if (isset($item['status']) && $item['status'] === 'error') {
                    $failed++;
                    continue;
                }

                if (Ppbj::where('ppbj_no', $item['ppbj_no'])->exists()) {
                    $failed++;
                    $errors[] = "Baris {$item['row_number']}: PPBJ No {$item['ppbj_no']} sudah terdaftar";
                    continue;
                }

                Ppbj::create([
                    'ppbj_no' => $item['ppbj_no'],
                    'tgl_ppbj' => $this->parseDate($item['tgl_ppbj'] ?? null),
                    'tgl_terima_pr' => $this->parseDate($item['tgl_terima_pr'] ?? null),
                    'uraian' => $item['uraian'] ?? null,
                    'note' => $item['note'] ?? null,
                    'portofolio' => $item['portofolio'] ?? null,
                    'buyer' => $item['buyer'] ?? null,
                    'total_sebelum_ppn' => !empty($item['total_sebelum_ppn']) ? (float) str_replace(',', '', $item['total_sebelum_ppn']) : null,
                    'metode_pengadaan' => $item['metode_pengadaan'] ?? null,
                    'spph_rfq_1' => $item['spph_rfq_1'] ?? null,
                    'rfq_2' => $item['rfq_2'] ?? null,
                    'rfq_3' => $item['rfq_3'] ?? null,
                    'tgl_spph' => $this->parseDate($item['tgl_spph'] ?? null),
                    'closed_date' => $this->parseDate($item['closed_date'] ?? null),
                    'sph' => $item['sph'] ?? null,
                    'tgl_sph' => $this->parseDate($item['tgl_sph'] ?? null),
                    'awarding_sp' => $item['awarding_sp'] ?? null,
                    'tgl_awarding_sp' => $this->parseDate($item['tgl_awarding_sp'] ?? null),
                    'penyedia_eksternal' => $item['penyedia_eksternal'] ?? null,
                    'tgl_spk' => $this->parseDate($item['tgl_spk'] ?? null),
                    'nilai_sp_spk' => !empty($item['nilai_sp_spk']) ? (float) str_replace(',', '', $item['nilai_sp_spk']) : null,
                    'promised_date' => $this->parseDate($item['promised_date'] ?? null),
                    'do_no' => $item['do_no'] ?? null,
                    'bpg_no' => $item['bpg_no'] ?? null,
                    'nilai_bpg' => !empty($item['nilai_bpg']) ? (float) str_replace(',', '', $item['nilai_bpg']) : null,
                    'tgl_bpg' => $this->parseDate($item['tgl_bpg'] ?? null),
                    'receiving_transaction' => $item['receiving_transaction'] ?? null,
                    'bpb_no' => $item['bpb_no'] ?? null,
                    'tgl_bpb' => $this->parseDate($item['tgl_bpb'] ?? null),
                    'no_invoice' => $item['no_invoice'] ?? null,
                    'tgl_invoice' => $this->parseDate($item['tgl_invoice'] ?? null),
                    'keterangan' => $item['keterangan'] ?? null,
                    'tgl_diserahkan' => $this->parseDate($item['tgl_diserahkan'] ?? null),
                ]);

                $imported++;

            } catch (\Exception $e) {
                $failed++;
                $errors[] = "Baris {$item['row_number']}: " . $e->getMessage();
                Log::error("Import error on row {$item['row_number']}: " . $e->getMessage());
            }
        }

        DashboardController::clearCache();

        return response()->json(['success' => true, 'imported' => $imported, 'failed' => $failed, 'errors' => $errors]);
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
            ->groupByRaw("COALESCE(NULLIF(portofolio, ''), 'Tanpa Portofolio')")
            ->orderByDesc('total_value')
            ->limit(20)
            ->get();

        $byVendor = (clone $query)
            ->selectRaw("COALESCE(NULLIF(penyedia_eksternal, ''), 'Tanpa Vendor') as label, COUNT(*) as total, COALESCE(SUM(total_sebelum_ppn), 0) as total_value, COALESCE(SUM(nilai_sp_spk), 0) as total_sp_value")
            ->groupByRaw("COALESCE(NULLIF(penyedia_eksternal, ''), 'Tanpa Vendor')")
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
            $query->whereDate('created_at', $startDate);
        } elseif ($period === 'monthly' && $startDate) {
            $d = Carbon::parse($startDate);
            $query->whereYear('created_at', $d->year)->whereMonth('created_at', $d->month);
        } elseif ($period === 'yearly' && $startDate) {
            $query->whereYear('created_at', Carbon::parse($startDate)->year);
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
        $value = trim($value);

        if (is_numeric($value) && $value > 25569) {
            try {
                return \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($value)->format('Y-m-d');
            } catch (\Exception $e) {
            }
        }

        foreach (['Y-m-d', 'd/m/Y', 'd-m-Y', 'm/d/Y', 'Y/m/d'] as $format) {
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
