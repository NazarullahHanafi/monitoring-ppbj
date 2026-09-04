<?php

namespace App\Http\Controllers;

use App\Models\MasterBuyer;
use App\Models\Ppbj;
use App\Models\PrReceiptApproval;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Shared\Date as ExcelDate;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

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
            ->select([
                'id', 'torpr_id', 'requested_by_user_id', 'requested_name', 'requested_at',
                'status', 'approved_by_user_id', 'approved_at', 'rejected_by_user_id',
                'rejected_at', 'rejected_reason', 'resubmit_notes', 'previous_rejection_id',
                'created_at',
            ])
            ->with([
                'torpr:id,nomor_pr,tanggal_pr,tujuan_pengadaan,portofolio,jumlah_pr',
                'requestedBy:id,name,email,department',
                'approvedBy:id,name',
                'rejectedBy:id,name',
                'previousRejection:id,rejected_by_user_id,rejected_at,rejected_reason',
                'previousRejection.rejectedBy:id,name',
            ])
            ->latest('id');

        $this->applyFilters($q, $request);

        $rows = $q->paginate(10)->withQueryString();

        return view('approval.pr_receipts', compact('rows'));
    }

    /**
     * Unduh laporan Approval PR sesuai pencarian dan status yang sedang aktif.
     * Pembuatan XLSX hanya berjalan saat tombol ekspor diklik sehingga halaman daftar tetap ringan.
     */
    public function exportExcel(Request $request)
    {
        $rows = $this->reportRows($request);
        $status = $this->filterStatus($request);
        $generatedAt = now();

        $spreadsheet = new Spreadsheet;
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Laporan Approval PR');
        $sheet->setShowGridlines(false);

        $spreadsheet->getProperties()
            ->setCreator('SIMONPR')
            ->setTitle('Laporan Approval PR - '.$status)
            ->setSubject('Laporan monitoring approval Purchase Request')
            ->setDescription('Daftar lengkap approval PR sesuai filter aktif.');

        $lastColumn = 'P';
        $sheet->mergeCells("A1:{$lastColumn}1");
        $sheet->setCellValue('A1', 'LAPORAN MONITORING APPROVAL PR');
        $sheet->mergeCells("A2:{$lastColumn}2");
        $sheet->setCellValue('A2', 'SIMONPR - Monitoring Proses Pengadaan');
        $sheet->mergeCells("A3:{$lastColumn}3");
        $sheet->setCellValue('A3', 'Status: '.$this->statusLabel($status).'. Pencarian: '.($this->filterSearch($request) ?: 'Semua').'. Total: '.$rows->count().' data.');
        $sheet->mergeCells("A4:{$lastColumn}4");
        $sheet->setCellValue('A4', 'Dibuat pada '.$generatedAt->translatedFormat('d F Y, H:i').' WIB oleh '.(auth()->user()?->name ?? 'SIMONPR'));

        $sheet->getStyle("A1:{$lastColumn}1")->applyFromArray([
            'font' => ['bold' => true, 'size' => 17, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '1D4ED8']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER, 'vertical' => Alignment::VERTICAL_CENTER],
        ]);
        $sheet->getStyle("A2:{$lastColumn}2")->applyFromArray([
            'font' => ['bold' => true, 'size' => 11, 'color' => ['rgb' => 'DBEAFE']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '1D4ED8']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
        ]);
        $sheet->getStyle("A3:{$lastColumn}4")->applyFromArray([
            'font' => ['size' => 10, 'color' => ['rgb' => '334155']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => 'EFF6FF']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_LEFT, 'vertical' => Alignment::VERTICAL_CENTER],
        ]);
        $sheet->getRowDimension(1)->setRowHeight(30);
        $sheet->getRowDimension(2)->setRowHeight(22);

        $headers = [
            'No.', 'Nomor PR', 'Tanggal PR', 'Tujuan Pengadaan', 'Portofolio', 'Nilai PR',
            'Nama Pengaju', 'Akun Pengaju', 'Email', 'Department', 'Waktu Request',
            'Durasi Menunggu/Proses', 'Status', 'Diproses Oleh', 'Waktu Proses', 'Catatan',
        ];
        $headerRow = 6;
        $sheet->fromArray($headers, null, 'A'.$headerRow);
        $sheet->getStyle("A{$headerRow}:{$lastColumn}{$headerRow}")->applyFromArray([
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF'], 'size' => 10],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '0F766E']],
            'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN, 'color' => ['rgb' => 'CBD5E1']]],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER, 'vertical' => Alignment::VERTICAL_CENTER, 'wrapText' => true],
        ]);
        $sheet->getRowDimension($headerRow)->setRowHeight(30);

        foreach ($rows as $index => $row) {
            $excelRow = $headerRow + $index + 1;
            $sheet->fromArray([
                $index + 1,
                $row->nomor_pr ?: '-',
                $this->excelDate($row->tanggal_pr),
                $row->tujuan_pengadaan ?: '-',
                $row->portofolio ?: '-',
                (float) ($row->jumlah_pr ?? 0),
                $row->requested_name ?: ($row->requester_name ?: '-'),
                $row->requester_name ?: '-',
                $row->requester_email ?: '-',
                $row->requester_department ? ucfirst($row->requester_department) : '-',
                $this->excelDate($row->requested_at),
                $this->durationLabel($row),
                $row->status,
                $row->processed_by ?: 'Belum diproses',
                $this->excelDate($row->processed_at),
                $this->reportNote($row),
            ], null, 'A'.$excelRow, true);

            $fillColor = $index % 2 === 0 ? 'FFFFFF' : 'F8FAFC';
            $sheet->getStyle("A{$excelRow}:{$lastColumn}{$excelRow}")->applyFromArray([
                'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => $fillColor]],
                'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_HAIR, 'color' => ['rgb' => 'CBD5E1']]],
                'alignment' => ['vertical' => Alignment::VERTICAL_TOP, 'wrapText' => true],
            ]);
            $sheet->getStyle("C{$excelRow}")->getNumberFormat()->setFormatCode('dd mmm yyyy');
            $sheet->getStyle("F{$excelRow}")->getNumberFormat()->setFormatCode('"Rp" #,##0');
            $sheet->getStyle("K{$excelRow}")->getNumberFormat()->setFormatCode('dd mmm yyyy hh:mm');
            $sheet->getStyle("O{$excelRow}")->getNumberFormat()->setFormatCode('dd mmm yyyy hh:mm');
            $sheet->getStyle("A{$excelRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

            $statusColor = match ($row->status) {
                self::STATUS_APPROVED => 'DCFCE7',
                self::STATUS_REJECTED => 'FEE2E2',
                default => 'FEF3C7',
            };
            $sheet->getStyle("M{$excelRow}")->applyFromArray([
                'font' => ['bold' => true],
                'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => $statusColor]],
                'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
            ]);
            $sheet->getRowDimension($excelRow)->setRowHeight(34);
        }

        $lastDataRow = max($headerRow, $headerRow + $rows->count());
        $sheet->freezePane('A7');
        $sheet->setAutoFilter("A{$headerRow}:{$lastColumn}{$lastDataRow}");
        $sheet->getPageSetup()->setOrientation('landscape')->setFitToWidth(1)->setFitToHeight(0);
        $sheet->getPageMargins()->setTop(0.35)->setRight(0.25)->setBottom(0.35)->setLeft(0.25);
        $sheet->getHeaderFooter()->setOddFooter('&LSIMONPR&CPage &P dari &N&R'.$generatedAt->format('d/m/Y H:i'));

        $widths = [8, 24, 14, 40, 18, 18, 22, 22, 30, 16, 20, 22, 14, 22, 20, 42];
        foreach ($widths as $index => $width) {
            $sheet->getColumnDimension(Coordinate::stringFromColumnIndex($index + 1))->setWidth($width);
        }

        $filename = 'Laporan_Approval_PR_'.$status.'_'.$generatedAt->format('Ymd_His').'.xlsx';

        return response()->streamDownload(function () use ($spreadsheet): void {
            $writer = new Xlsx($spreadsheet);
            $writer->save('php://output');
            $spreadsheet->disconnectWorksheets();
        }, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Cache-Control' => 'private, no-store, max-age=0',
        ]);
    }

    public function exportPdf(Request $request)
    {
        $rows = $this->reportRows($request);
        $status = $this->filterStatus($request);
        $generatedAt = now();
        $summary = [
            'total' => $rows->count(),
            'value' => (float) $rows->sum(fn ($row) => (float) ($row->jumlah_pr ?? 0)),
        ];

        $pdf = Pdf::loadView('approval.exports.pr_receipts_pdf', [
            'rows' => $rows,
            'status' => $status,
            'statusLabel' => $this->statusLabel($status),
            'search' => $this->filterSearch($request),
            'generatedAt' => $generatedAt,
            'summary' => $summary,
            'generatedBy' => auth()->user()?->name ?? 'SIMONPR',
        ])->setPaper('a4', 'landscape');

        $pdf->setOptions([
            'defaultFont' => 'DejaVu Sans',
            'isRemoteEnabled' => false,
            'isPhpEnabled' => true,
            'dpi' => 96,
        ]);

        return $pdf->download('Laporan_Approval_PR_'.$status.'_'.$generatedAt->format('Ymd_His').'.pdf');
    }

    private function applyFilters(EloquentBuilder $query, Request $request): void
    {
        $search = $this->filterSearch($request);

        if ($search !== '') {
            $query->whereHas('torpr', function (EloquentBuilder $torprQuery) use ($search): void {
                $torprQuery->where('nomor_pr', 'like', '%'.$search.'%');
            });
        }

        $query->where('status', $this->filterStatus($request));
    }

    private function reportRows(Request $request)
    {
        $query = DB::table('pr_receipt_approvals as approval')
            ->leftJoin('torprs as torpr', 'torpr.id', '=', 'approval.torpr_id')
            ->leftJoin('users as requester', 'requester.id', '=', 'approval.requested_by_user_id')
            ->leftJoin('users as approver', 'approver.id', '=', 'approval.approved_by_user_id')
            ->leftJoin('users as rejecter', 'rejecter.id', '=', 'approval.rejected_by_user_id')
            ->select([
                'approval.id', 'approval.status', 'approval.requested_name', 'approval.requested_at',
                'approval.approved_at', 'approval.rejected_at', 'approval.rejected_reason',
                'approval.resubmit_notes', 'approval.previous_rejection_id',
                'torpr.nomor_pr', 'torpr.tanggal_pr', 'torpr.tujuan_pengadaan',
                'torpr.portofolio', 'torpr.jumlah_pr',
                'requester.name as requester_name', 'requester.email as requester_email',
                'requester.department as requester_department',
                DB::raw("CASE WHEN approval.status = 'APPROVED' THEN approver.name WHEN approval.status = 'REJECTED' THEN rejecter.name ELSE NULL END as processed_by"),
                DB::raw("CASE WHEN approval.status = 'APPROVED' THEN approval.approved_at WHEN approval.status = 'REJECTED' THEN approval.rejected_at ELSE NULL END as processed_at"),
            ])
            ->where('approval.status', $this->filterStatus($request));

        $search = $this->filterSearch($request);
        if ($search !== '') {
            $query->where('torpr.nomor_pr', 'like', '%'.$search.'%');
        }

        return $query->orderByDesc('approval.id')->get();
    }

    private function filterStatus(Request $request): string
    {
        $status = strtoupper(trim((string) $request->query('status', self::STATUS_PENDING)));

        return in_array($status, [self::STATUS_PENDING, self::STATUS_APPROVED, self::STATUS_REJECTED], true)
            ? $status
            : self::STATUS_PENDING;
    }

    private function filterSearch(Request $request): string
    {
        return mb_substr(trim((string) $request->query('q', '')), 0, 100);
    }

    private function statusLabel(string $status): string
    {
        return match ($status) {
            self::STATUS_APPROVED => 'Sudah Disetujui',
            self::STATUS_REJECTED => 'Ditolak',
            default => 'Belum Approval / Menunggu',
        };
    }

    private function excelDate(mixed $value): float|string
    {
        return blank($value) ? '-' : ExcelDate::PHPToExcel(Carbon::parse($value));
    }

    private function durationLabel(object $row): string
    {
        if (blank($row->requested_at)) {
            return '-';
        }

        $start = Carbon::parse($row->requested_at);
        $end = filled($row->processed_at) ? Carbon::parse($row->processed_at) : now();
        $minutes = max(0, (int) $start->diffInMinutes($end));
        $days = intdiv($minutes, 1440);
        $hours = intdiv($minutes % 1440, 60);
        $remainingMinutes = $minutes % 60;

        if ($days > 0) {
            return $days.' hari '.$hours.' jam';
        }

        if ($hours > 0) {
            return $hours.' jam '.$remainingMinutes.' menit';
        }

        return $remainingMinutes.' menit';
    }

    private function reportNote(object $row): string
    {
        if ($row->status === self::STATUS_PENDING) {
            return filled($row->previous_rejection_id)
                ? 'Pengajuan ulang; menunggu tindakan Bagian Umum. '.trim((string) $row->resubmit_notes)
                : 'Menunggu tindakan approval Bagian Umum.';
        }

        if ($row->status === self::STATUS_REJECTED) {
            return filled($row->rejected_reason) ? (string) $row->rejected_reason : 'Tidak ada alasan penolakan.';
        }

        return 'PR telah disetujui dan diterima Bagian Umum.';
    }

    public function pendingCount(Request $request)
    {
        if (! $request->ajax()) {
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

                if (! $torpr || ! $torpr->nomor_pr) {
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
                            'msg' => 'PR berhasil dikonfirmasi diterima Umum. Tetapi PPBJ tidak dibuat karena nomor sudah ada: '.$torpr->nomor_pr,
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
                        'msg' => 'PR berhasil dikonfirmasi diterima Umum. Tetapi PPBJ gagal dibuat karena nomor sudah ada: '.$torpr->nomor_pr,
                    ];
                }

                // reset cache count karena status berubah
                Cache::forget(self::CACHE_KEY_PENDING_COUNT);
                $this->forgetTorprInfoCache((int) $torpr->id);

                return [
                    'type' => 'success',
                    'msg' => 'PR berhasil dikonfirmasi diterima Umum dan PPBJ berhasil dibuat.',
                ];
            }, 3);

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
            'status_sla' => Ppbj::hitungStatusSla(
                $sisaTargetSla,
                false,
                $targetSla,
                true
            ),
            'status' => 'ACTIVE',
            'created_at' => now(),
            'updated_at' => now(),
        ];

        return collect($payload)
            ->filter(fn ($value, $column) => Schema::hasColumn('ppbj', $column))
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
            ->filter(fn ($value, $column) => Schema::hasColumn('ppbj', $column))
            ->all();
    }

    private function nextGeneralRegistrationNumber(int $year): string
    {
        $prefix = 'REG-UMUM/'.$year.'/';

        $lastNumber = DB::table('ppbj')
            ->where('general_registration_number', 'like', $prefix.'%')
            ->lockForUpdate()
            // Nomor selalu zero-padded, sehingga urutan string sama dengan urutan angka.
            // Cara ini portable untuk MySQL/SQLite dan dapat memakai unique index yang ada.
            ->orderByDesc('general_registration_number')
            ->value('general_registration_number');

        $next = 1;

        if ($lastNumber && preg_match('/(\d+)$/', (string) $lastNumber, $matches)) {
            $next = ((int) $matches[1]) + 1;
        }

        return $prefix.str_pad((string) $next, 3, '0', STR_PAD_LEFT);
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
