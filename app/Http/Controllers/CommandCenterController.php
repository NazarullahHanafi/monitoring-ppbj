<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Ppbj;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\View\View;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CommandCenterController extends Controller
{
    private const OVERVIEW_CACHE_KEY = 'command_center:overview:v1';

    private const OVERVIEW_TTL = 300;

    private const RECONCILIATION_CACHE_KEY = 'command_center:reconciliation:v1';

    private const RECONCILIATION_TTL = 180;

    private const RECONCILIATION_RESULT_LIMIT = 20;

    private const SEARCH_LIMIT = 24;

    /** Kolom bisnis PPBJ yang aman ditelusuri dari Command Center. */
    private const SEARCH_TEXT_FIELDS = [
        'ppbj_no' => 'No. PR/PPBJ',
        'general_registration_number' => 'No. Registrasi Umum',
        'uraian' => 'Uraian',
        'note' => 'Catatan',
        'portofolio' => 'Portofolio',
        'buyer' => 'Buyer',
        'penyedia_eksternal' => 'Penyedia/Vendor',
        'metode_pengadaan' => 'Metode Pengadaan',
        'spph_rfq_1' => 'SPPH/RFQ 1',
        'rfq_2' => 'RFQ 2',
        'rfq_3' => 'RFQ 3',
        'sph' => 'SPH',
        'awarding_sp' => 'Awarding/SP/Kontrak',
        'pemenang' => 'Pemenang',
        'do_no' => 'DO/Surat Jalan/BAST',
        'bpg_no' => 'No. BPG',
        'bpb_no' => 'No. BPB',
        'no_invoice' => 'No. Invoice',
        'receiving_transaction' => 'Receiving Transaction',
        'goods_arrived_note' => 'Catatan Barang Datang',
        'goods_confirmed_note' => 'Catatan Konfirmasi Barang',
        'cancel_reason' => 'Alasan Pembatalan',
        'keterangan' => 'Keterangan',
        'status' => 'Status',
        'status_sla' => 'Status SLA',
    ];

    private const SEARCH_DATE_FIELDS = [
        'tgl_ppbj' => 'Tanggal PPBJ',
        'tgl_terima_pr' => 'Tanggal Terima PR',
        'tgl_diserahkan' => 'Tanggal Diserahkan',
        'general_registered_at' => 'Tanggal Registrasi Umum',
        'tgl_spph' => 'Tanggal SPPH',
        'closed_date' => 'Closed Date',
        'tgl_sph' => 'Tanggal SPH',
        'tgl_awarding_sp' => 'Tanggal Awarding',
        'tgl_pemenang' => 'Tanggal Pemenang',
        'tgl_spk' => 'Tanggal SPK',
        'promised_date' => 'Tanggal Pemenuhan/Berakhir Kontrak',
        'goods_arrived_at' => 'Tanggal Barang Datang',
        'goods_confirmed_at' => 'Tanggal Konfirmasi Barang',
        'do_date' => 'Tanggal DO/Surat Jalan/BAST',
        'do_updated_at' => 'Tanggal Perubahan DO',
        'tgl_bpg' => 'Tanggal BPG',
        'tgl_bpb' => 'Tanggal BPB',
        'tgl_invoice' => 'Tanggal Invoice',
        'cancelled_at' => 'Tanggal Pembatalan',
        'created_at' => 'Tanggal Dibuat',
        'updated_at' => 'Tanggal Diperbarui',
    ];

    private const SEARCH_NUMBER_FIELDS = [
        'id' => 'ID Data',
        'total_sebelum_ppn' => 'Nilai PR',
        'nilai_sp_spk' => 'Nilai SP/Kontrak',
        'nilai_bpg' => 'Nilai BPG',
        'qt_left' => 'Sisa QT',
        'persentase_realisasi' => 'Persentase Realisasi',
        'time_left' => 'Sisa Waktu',
        'progres' => 'Progress',
        'sisa_target_sla' => 'Sisa SLA',
        'target_sla_hari' => 'Target SLA',
        'realisasi_sla' => 'Realisasi SLA',
    ];

    public function index(): View
    {
        return view('command-center.index');
    }

    public function overview(Request $request): JsonResponse
    {
        if ($request->boolean('refresh') && strtolower((string) $request->user()?->role) === 'superadmin') {
            self::clearCache();
        }

        return response()->json($this->overviewData());
    }

    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'q' => ['required', 'string', 'min:1', 'max:120'],
        ]);

        $query = trim($validated['q']);
        $moneyCriteria = $this->parseMoneyCriteria($query);
        $money = $moneyCriteria['value'] ?? null;
        $rows = $this->searchRows($query, $moneyCriteria);

        return response()->json([
            'query' => $query,
            'detected_value' => $money,
            'detected_value_label' => $money !== null ? $this->rupiah($money) : null,
            'money_query' => $moneyCriteria === null ? null : collect($moneyCriteria)
                ->only(['mode', 'field', 'field_label', 'min', 'max', 'value', 'label', 'sort', 'limit'])
                ->all(),
            'count' => $rows->count(),
            'results' => $rows,
        ]);
    }

    public function ask(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'question' => ['required', 'string', 'min:3', 'max:220'],
        ]);

        $question = trim($validated['question']);
        $lower = mb_strtolower($question);
        $moneyCriteria = $this->parseMoneyCriteria($question);
        $query = $this->commandCenterQuery();
        $filters = [];

        if (str_contains($lower, 'terlambat') || str_contains($lower, 'overdue')) {
            $query->where(function (Builder $builder) {
                $builder->where('status_sla', 'OVERDUE')
                    ->orWhere(function (Builder $deadline) {
                        $deadline->whereDate('promised_date', '<', today())
                            ->where(fn (Builder $q) => $q->whereNull('do_no')->orWhere('do_no', ''));
                    });
            });
            $filters[] = 'terlambat';
        }

        if (str_contains($lower, 'belum sp') || str_contains($lower, 'tanpa sp') || str_contains($lower, 'belum kontrak')) {
            $query->where(fn (Builder $q) => $q->whereNull('awarding_sp')->orWhere('awarding_sp', ''));
            $filters[] = 'belum memiliki SP/Kontrak';
        }

        if (str_contains($lower, 'belum spph') || str_contains($lower, 'tanpa spph')) {
            $query->where(fn (Builder $q) => $q->whereNull('spph_rfq_1')->orWhere('spph_rfq_1', ''));
            $filters[] = 'belum memiliki SPPH';
        }

        if (str_contains($lower, 'segera habis') || str_contains($lower, 'akan habis') || str_contains($lower, 'jatuh tempo kontrak')) {
            $query->whereBetween('promised_date', [today(), today()->addDays(30)]);
            $filters[] = 'kontrak berakhir dalam 30 hari';
        }

        if (str_contains($lower, 'selesai') || str_contains($lower, 'lengkap')) {
            $query->where(function (Builder $builder) {
                $builder->where('progres', '>=', 100)
                    ->orWhere(fn (Builder $q) => $q->whereNotNull('no_invoice')->where('no_invoice', '!=', ''));
            });
            $filters[] = 'selesai/lengkap';
        }

        if ($moneyCriteria !== null) {
            $this->applyMoneyCriteria($query, $moneyCriteria);
            $filters[] = $moneyCriteria['label'];
        }

        if ($filters === []) {
            $like = '%'.$this->escapeLike($question).'%';
            $query->where(function (Builder $builder) use ($like) {
                $builder->where('ppbj_no', 'like', $like)
                    ->orWhere('uraian', 'like', $like)
                    ->orWhere('penyedia_eksternal', 'like', $like)
                    ->orWhere('buyer', 'like', $like)
                    ->orWhere('awarding_sp', 'like', $like)
                    ->orWhere('general_registration_number', 'like', $like);
            });
            $filters[] = 'pencarian kata kunci';
        }

        if (($moneyCriteria['mode'] ?? null) === 'rank') {
            $query->orderBy($this->moneyFieldColumns($moneyCriteria['field'])[0], $moneyCriteria['sort']);
        } else {
            $query->orderByDesc('updated_at');
        }

        $rows = $query
            ->limit($moneyCriteria['limit'] ?? self::SEARCH_LIMIT)
            ->get()
            ->map(fn (Ppbj $row) => $this->presentResult($row, $moneyCriteria['value'] ?? null, $question, $moneyCriteria));

        return response()->json([
            'answer' => $rows->isEmpty()
                ? 'Tidak ada pengadaan yang cocok dengan '.implode(', ', $filters).'.'
                : 'Ditemukan '.$rows->count().' pengadaan untuk '.implode(', ', $filters).'. Prioritas tertinggi ditampilkan lebih dahulu.',
            'filters' => $filters,
            'count' => $rows->count(),
            'results' => $rows,
        ]);
    }

    public function reconciliation(Request $request): JsonResponse
    {
        if ($request->boolean('refresh') && strtolower((string) $request->user()?->role) === 'superadmin') {
            Cache::forget(self::RECONCILIATION_CACHE_KEY);
        }

        return response()->json(Cache::remember(
            self::RECONCILIATION_CACHE_KEY,
            self::RECONCILIATION_TTL,
            fn () => $this->buildReconciliation()
        ));
    }

    public function journey(Ppbj $ppbj): JsonResponse
    {
        $ppbj->load([
            'spphs:id,nomor_spph,tanggal,nama_vendor',
            'sps:id,nomor_sp,tanggal_sp,nilai_sp,nama_vendor,promised_date',
            'realTrackings' => fn ($q) => $q->latest('event_date')->latest('id')->limit(50),
        ]);

        $audits = ActivityLog::query()
            ->with('user:id,name')
            ->where('model_type', Ppbj::class)
            ->where('model_id', $ppbj->id)
            ->latest('id')
            ->limit(30)
            ->get()
            ->map(fn (ActivityLog $log) => [
                'title' => $log->description ?: ucfirst(str_replace('_', ' ', $log->action)),
                'actor' => $log->user?->name ?: 'Sistem',
                'date' => optional($log->created_at)->timezone('Asia/Jakarta')->format('d M Y H:i'),
            ]);

        return response()->json([
            'record' => $this->presentResult($ppbj),
            'stages' => $this->journeyStages($ppbj),
            'real_tracking' => $ppbj->realTrackings->map(fn ($item) => [
                'title' => $item->title,
                'description' => $item->description,
                'date' => optional($item->event_date ?: $item->created_at)->format('d M Y'),
                'reminder' => optional($item->reminder_date)->format('d M Y'),
            ]),
            'audit' => $audits,
            'archive_url' => route('ppbj.archive', $ppbj->id),
            'tracking_url' => route('landing.track.token', ['token' => $this->trackingToken($ppbj->ppbj_no)]),
            'qr_url' => route('command-center.passport.qr', $ppbj),
        ]);
    }

    public function passportQr(Ppbj $ppbj)
    {
        $url = route('landing.track.token', ['token' => $this->trackingToken($ppbj->ppbj_no)]);
        $svg = QrCode::format('svg')->size(360)->margin(2)->errorCorrection('M')->generate($url);

        return response($svg, 200, [
            'Content-Type' => 'image/svg+xml',
            'Cache-Control' => 'private, max-age=86400',
            'Content-Disposition' => 'inline; filename="passport-'.$ppbj->id.'.svg"',
        ]);
    }

    public function meetingPdf()
    {
        $data = $this->overviewData();
        $pdf = Pdf::loadView('command-center.meeting-pdf', [
            'data' => $data,
            'generatedAt' => now()->timezone('Asia/Jakarta'),
        ])->setPaper('a4', 'landscape');

        return $pdf->download('Command-Center-Pengadaan-'.now()->format('Ymd-His').'.pdf');
    }

    public function meetingExcel(): BinaryFileResponse
    {
        $data = $this->overviewData();
        $sheetBook = new Spreadsheet;
        $sheet = $sheetBook->getActiveSheet();
        $sheet->setTitle('Executive Brief');
        $sheet->mergeCells('A1:H1')->setCellValue('A1', 'SIMONPR — PROCUREMENT COMMAND CENTER 360°');
        $sheet->mergeCells('A2:H2')->setCellValue('A2', 'Dibuat '.now()->timezone('Asia/Jakarta')->format('d/m/Y H:i').' WIB');
        $sheet->fromArray([
            ['Total PPBJ', $data['stats']['total'], 'Aktif', $data['stats']['active'], 'Nilai PR', $data['stats']['total_pr_label'], 'Nilai SP', $data['stats']['total_sp_label']],
            ['Risiko Tinggi', $data['stats']['high_risk'], 'Kontrak Kritis', $data['stats']['critical_contracts'], 'Efisiensi', $data['stats']['efficiency_label'], 'Progress Rata-rata', $data['stats']['avg_progress'].'%'],
        ], null, 'A4');
        $sheet->fromArray(['No', 'Nomor PR/PPBJ', 'Uraian', 'Buyer', 'Vendor', 'Nilai PR', 'Nilai SP', 'Risiko'], null, 'A8');

        $row = 9;
        foreach ($data['risks'] as $index => $risk) {
            $sheet->fromArray([
                $index + 1,
                $risk['ppbj_no'],
                $risk['uraian'],
                $risk['buyer'],
                $risk['vendor'],
                $risk['nilai_pr'],
                $risk['nilai_sp'],
                $risk['score'].' — '.implode('; ', $risk['reasons']),
            ], null, 'A'.$row++);
        }

        $sheet->getStyle('A1:H1')->getFont()->setBold(true)->setSize(16)->getColor()->setARGB('FFFFFFFF');
        $sheet->getStyle('A1:H1')->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('FF172554');
        $sheet->getStyle('A8:H8')->getFont()->setBold(true)->getColor()->setARGB('FFFFFFFF');
        $sheet->getStyle('A8:H8')->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('FF4F46E5');
        $sheet->getStyle('A8:H'.max(8, $row - 1))->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN)->getColor()->setARGB('FFD7DEEA');
        $sheet->getStyle('A1:H'.$row)->getAlignment()->setVertical(Alignment::VERTICAL_CENTER)->setWrapText(true);
        foreach (range('A', 'H') as $column) {
            $sheet->getColumnDimension($column)->setAutoSize(true);
        }
        $sheet->getColumnDimension('C')->setWidth(44);
        $sheet->getColumnDimension('H')->setWidth(52);
        $sheet->freezePane('A9');

        $path = tempnam(sys_get_temp_dir(), 'simonpr-command-');
        (new Xlsx($sheetBook))->save($path);
        $sheetBook->disconnectWorksheets();

        return response()->download($path, 'Command-Center-Pengadaan-'.now()->format('Ymd-His').'.xlsx')->deleteFileAfterSend(true);
    }

    public static function clearCache(): void
    {
        Cache::forget(self::OVERVIEW_CACHE_KEY);
        Cache::forget(self::RECONCILIATION_CACHE_KEY);
    }

    private function overviewData(): array
    {
        return Cache::remember(
            self::OVERVIEW_CACHE_KEY,
            self::OVERVIEW_TTL,
            fn () => $this->buildOverview()
        );
    }

    private function buildReconciliation(): array
    {
        $critical = $this->reconciliationCriticalSql();
        $warning = $this->reconciliationWarningSql();
        $active = "(ppbj.status IS NULL OR ppbj.status != 'CANCELLED')";
        $groupTotals = $this->reconciliationGroupTotalsQuery();
        $effectivePr = $this->reconciliationEffectivePrSql();
        $primaryPackage = '(COALESCE(sp_groups.linked_count, 0) <= 1 OR ppbj.id = sp_groups.first_id)';

        $summary = DB::table('ppbj')
            ->leftJoinSub(clone $groupTotals, 'sp_groups', 'sp_groups.awarding_sp', '=', 'ppbj.awarding_sp')
            ->whereRaw($active)
            ->selectRaw('COUNT(*) AS total')
            ->selectRaw("SUM(CASE WHEN ({$critical}) THEN 1 ELSE 0 END) AS critical")
            ->selectRaw("SUM(CASE WHEN NOT ({$critical}) AND ({$warning}) THEN 1 ELSE 0 END) AS warning")
            ->selectRaw("SUM(CASE WHEN NOT ({$critical}) AND NOT ({$warning}) THEN 1 ELSE 0 END) AS ready")
            ->selectRaw("COALESCE(SUM(CASE WHEN {$effectivePr} > 0 AND COALESCE(ppbj.nilai_sp_spk, 0) > 0 AND {$primaryPackage} THEN ABS({$effectivePr} - ppbj.nilai_sp_spk) ELSE 0 END), 0) AS financial_gap")
            ->first();

        $issues = $this->reconciliationQuery(clone $groupTotals)
            ->whereRaw($active)
            ->whereRaw("({$critical}) OR ({$warning})")
            ->orderByRaw("CASE WHEN ({$critical}) THEN 0 ELSE 1 END")
            ->orderByDesc('updated_at')
            ->limit(self::RECONCILIATION_RESULT_LIMIT)
            ->get()
            ->map(function (Ppbj $row) {
                $record = $this->presentResult($row);
                unset($record['details']);

                return array_merge($record, [
                    'reconciliation' => $this->reconciliationFor($row),
                ]);
            })
            ->values();

        $financialGap = (float) ($summary->financial_gap ?? 0);

        return [
            'generated_at' => now()->timezone('Asia/Jakarta')->format('d M Y H:i:s'),
            'cache_seconds' => self::RECONCILIATION_TTL,
            'summary' => [
                'total' => (int) ($summary->total ?? 0),
                'critical' => (int) ($summary->critical ?? 0),
                'warning' => (int) ($summary->warning ?? 0),
                'ready' => (int) ($summary->ready ?? 0),
                'financial_gap' => $financialGap,
                'financial_gap_label' => $this->rupiah($financialGap),
                'shown' => $issues->count(),
                'limited' => ((int) ($summary->critical ?? 0) + (int) ($summary->warning ?? 0)) > $issues->count(),
            ],
            'results' => $issues,
        ];
    }

    private function reconciliationCriticalSql(): string
    {
        $effectivePr = $this->reconciliationEffectivePrSql();
        $primaryPackage = '(COALESCE(sp_groups.linked_count, 0) <= 1 OR ppbj.id = sp_groups.first_id)';

        return <<<'SQL'
            COALESCE(ppbj.total_sebelum_ppn, 0) <= 0
            OR (COALESCE(ppbj.nilai_bpg, 0) > 0 AND COALESCE(ppbj.nilai_sp_spk, 0) > 0 AND ppbj.nilai_bpg > ppbj.nilai_sp_spk)
            OR (TRIM(COALESCE(ppbj.no_invoice, '')) != '' AND TRIM(COALESCE(ppbj.bpg_no, '')) = '')
            OR (TRIM(COALESCE(ppbj.bpg_no, '')) != '' AND TRIM(COALESCE(ppbj.do_no, '')) = '')
            OR ((TRIM(COALESCE(ppbj.do_no, '')) = '') != (ppbj.do_date IS NULL))
            OR ((TRIM(COALESCE(ppbj.bpg_no, '')) = '') != (ppbj.tgl_bpg IS NULL))
            OR ((TRIM(COALESCE(ppbj.no_invoice, '')) = '') != (ppbj.tgl_invoice IS NULL))
        SQL
            .' OR (COALESCE(ppbj.nilai_sp_spk, 0) > 0 AND ppbj.nilai_sp_spk > '.$effectivePr.' AND '.$primaryPackage.')';
    }

    private function reconciliationWarningSql(): string
    {
        $effectivePr = $this->reconciliationEffectivePrSql();
        $primaryPackage = '(COALESCE(sp_groups.linked_count, 0) <= 1 OR ppbj.id = sp_groups.first_id)';

        return <<<'SQL'
            (TRIM(COALESCE(ppbj.awarding_sp, '')) = '' AND COALESCE(ppbj.nilai_sp_spk, 0) <= 0)
            OR (TRIM(COALESCE(ppbj.do_no, '')) != '' AND TRIM(COALESCE(ppbj.bpg_no, '')) = '')
            OR (TRIM(COALESCE(ppbj.bpg_no, '')) != '' AND TRIM(COALESCE(ppbj.no_invoice, '')) = '')
            OR (COALESCE(ppbj.nilai_bpg, 0) > 0 AND COALESCE(ppbj.nilai_sp_spk, 0) > 0 AND ABS(ppbj.nilai_bpg - ppbj.nilai_sp_spk) > 1000)
            OR (ppbj.do_date IS NOT NULL AND ppbj.promised_date IS NOT NULL AND ppbj.do_date > ppbj.promised_date)
        SQL
            .' OR ('.$effectivePr.' > 0 AND COALESCE(ppbj.nilai_sp_spk, 0) > 0 AND ABS('.$effectivePr.' - ppbj.nilai_sp_spk) / '.$effectivePr.' >= 0.20 AND '.$primaryPackage.')';
    }

    private function reconciliationGroupTotalsQuery()
    {
        return DB::table('ppbj as grouped')
            ->select('grouped.awarding_sp')
            ->selectRaw('SUM(COALESCE(grouped.total_sebelum_ppn, 0)) AS group_pr')
            ->selectRaw('COUNT(*) AS linked_count')
            ->selectRaw('MIN(grouped.id) AS first_id')
            ->whereNotNull('grouped.awarding_sp')
            ->where('grouped.awarding_sp', '!=', '')
            ->where(fn ($query) => $query->whereNull('grouped.status')->orWhere('grouped.status', '!=', 'CANCELLED'))
            ->groupBy('grouped.awarding_sp');
    }

    private function reconciliationEffectivePrSql(): string
    {
        return '(CASE WHEN COALESCE(sp_groups.linked_count, 0) > 1 THEN COALESCE(sp_groups.group_pr, 0) ELSE COALESCE(ppbj.total_sebelum_ppn, 0) END)';
    }

    private function reconciliationQuery($groupTotals): Builder
    {
        return Ppbj::query()
            ->leftJoinSub($groupTotals, 'sp_groups', 'sp_groups.awarding_sp', '=', 'ppbj.awarding_sp')
            ->select(array_map(fn (string $column) => 'ppbj.'.$column, $this->commandCenterSearchColumns()))
            ->addSelect([
                'sp_group_pr' => DB::raw('COALESCE(sp_groups.group_pr, ppbj.total_sebelum_ppn, 0)'),
                'sp_linked_count' => DB::raw('COALESCE(sp_groups.linked_count, 1)'),
                'sp_group_first_id' => DB::raw('COALESCE(sp_groups.first_id, ppbj.id)'),
            ]);
    }

    private function buildOverview(): array
    {
        $stats = DB::table('ppbj')->selectRaw(<<<'SQL'
            COUNT(*) as total,
            SUM(CASE WHEN status IS NULL OR status != 'CANCELLED' THEN 1 ELSE 0 END) as active,
            SUM(CASE WHEN status = 'CANCELLED' THEN 1 ELSE 0 END) as cancelled,
            SUM(CASE WHEN awarding_sp IS NOT NULL AND awarding_sp != '' THEN 1 ELSE 0 END) as has_sp,
            SUM(CASE WHEN spph_rfq_1 IS NOT NULL AND spph_rfq_1 != '' THEN 1 ELSE 0 END) as has_spph,
            SUM(CASE WHEN do_no IS NOT NULL AND do_no != '' THEN 1 ELSE 0 END) as delivered,
            SUM(CASE WHEN no_invoice IS NOT NULL AND no_invoice != '' THEN 1 ELSE 0 END) as invoiced,
            COALESCE(SUM(total_sebelum_ppn), 0) as total_pr,
            COALESCE(SUM(nilai_sp_spk), 0) as total_sp,
            COALESCE(AVG(progres), 0) as avg_progress
        SQL)->first();

        $candidates = $this->commandCenterQuery()
            ->where(fn (Builder $q) => $q->whereNull('status')->orWhere('status', '!=', 'CANCELLED'))
            ->orderByRaw('CASE WHEN promised_date IS NULL THEN 1 ELSE 0 END')
            ->orderBy('promised_date')
            ->orderByDesc('updated_at')
            ->limit(250)
            ->get();

        $risks = $candidates->map(fn (Ppbj $row) => $this->riskFor($row))
            ->filter(fn (array $risk) => $risk['score'] > 0)
            ->sortByDesc('score')
            ->values();

        $contracts = $candidates
            ->filter(fn (Ppbj $row) => $row->promised_date && blank($row->do_no))
            ->map(function (Ppbj $row) {
                $deadline = Carbon::parse($row->promised_date)->startOfDay();
                $days = today()->diffInDays($deadline, false);

                return [
                    'id' => $row->id,
                    'ppbj_no' => $row->ppbj_no,
                    'uraian' => $row->uraian ?: '-',
                    'vendor' => $row->penyedia_eksternal ?: '-',
                    'deadline' => $deadline->format('d M Y'),
                    'days' => $days,
                    'level' => $days < 0 ? 'overdue' : ($days <= 7 ? 'critical' : ($days <= 30 ? 'warning' : 'safe')),
                ];
            })
            ->filter(fn (array $row) => $row['days'] <= 30)
            ->sortBy('days')
            ->take(10)
            ->values();

        $isSqlite = DB::connection()->getDriverName() === 'sqlite';
        $yearExpression = $isSqlite ? "CAST(strftime('%Y', created_at) AS INTEGER)" : 'YEAR(created_at)';
        $monthExpression = $isSqlite ? "CAST(strftime('%m', created_at) AS INTEGER)" : 'MONTH(created_at)';

        $monthly = DB::table('ppbj')
            ->selectRaw("{$yearExpression} as year_no, {$monthExpression} as month_no, COUNT(*) as total")
            ->where('created_at', '>=', now()->subMonths(5)->startOfMonth())
            ->groupByRaw("{$yearExpression}, {$monthExpression}")
            ->orderByRaw("{$yearExpression}, {$monthExpression}")
            ->get();

        $totalPr = (float) ($stats->total_pr ?? 0);
        $totalSp = (float) ($stats->total_sp ?? 0);
        $efficiency = $totalPr - $totalSp;

        return [
            'generated_at' => now()->timezone('Asia/Jakarta')->format('d M Y H:i:s'),
            'stats' => [
                'total' => (int) ($stats->total ?? 0),
                'active' => (int) ($stats->active ?? 0),
                'cancelled' => (int) ($stats->cancelled ?? 0),
                'high_risk' => $risks->where('score', '>=', 70)->count(),
                'critical_contracts' => $contracts->whereIn('level', ['overdue', 'critical'])->count(),
                'avg_progress' => round((float) ($stats->avg_progress ?? 0), 1),
                'total_pr' => $totalPr,
                'total_sp' => $totalSp,
                'total_pr_label' => $this->rupiah($totalPr),
                'total_sp_label' => $this->rupiah($totalSp),
                'efficiency' => $efficiency,
                'efficiency_label' => $this->rupiah($efficiency),
            ],
            'flow' => [
                ['key' => 'registered', 'label' => 'PR Masuk', 'count' => (int) ($stats->total ?? 0)],
                ['key' => 'spph', 'label' => 'SPPH', 'count' => (int) ($stats->has_spph ?? 0)],
                ['key' => 'sp', 'label' => 'SP/Kontrak', 'count' => (int) ($stats->has_sp ?? 0)],
                ['key' => 'delivery', 'label' => 'DO/BAST', 'count' => (int) ($stats->delivered ?? 0)],
                ['key' => 'finance', 'label' => 'Invoice', 'count' => (int) ($stats->invoiced ?? 0)],
            ],
            'risks' => $risks->take(12)->values(),
            'contracts' => $contracts,
            'monthly' => $monthly,
        ];
    }

    private function commandCenterQuery(): Builder
    {
        return Ppbj::query()->select([
            'id', 'ppbj_no', 'uraian', 'portofolio', 'buyer', 'penyedia_eksternal',
            'general_registration_number', 'general_registered_at', 'total_sebelum_ppn', 'nilai_sp_spk',
            'spph_rfq_1', 'tgl_spph', 'awarding_sp', 'tgl_awarding_sp', 'tgl_spk',
            'promised_date', 'closed_date', 'do_no', 'do_date', 'bpg_no', 'nilai_bpg', 'tgl_bpg', 'bpb_no',
            'no_invoice', 'tgl_invoice', 'progres', 'status', 'status_sla', 'sisa_target_sla',
            'target_sla_hari', 'tgl_diserahkan', 'tgl_terima_pr', 'tgl_ppbj',
            'created_at', 'updated_at',
        ]);
    }

    private function searchRows(string $query, ?array $moneyCriteria)
    {
        $builder = $this->commandCenterSearchQuery();
        if ($moneyCriteria !== null) {
            $this->applyMoneyCriteria($builder, $moneyCriteria);
        } else {
            $this->applyUniversalSearchFilter($builder, $query);
        }
        $like = '%'.$this->escapeLike($query).'%';

        if (($moneyCriteria['mode'] ?? null) === 'rank') {
            $builder->orderBy($this->moneyFieldColumns($moneyCriteria['field'])[0], $moneyCriteria['sort']);
        } else {
            $builder->orderByRaw(
                'CASE WHEN ppbj_no = ? THEN 0 WHEN ppbj_no LIKE ? THEN 1 WHEN general_registration_number LIKE ? THEN 2 ELSE 3 END',
                [$query, $like, $like]
            )->orderByDesc('updated_at');
        }

        return $builder
            ->limit($moneyCriteria['limit'] ?? self::SEARCH_LIMIT)
            ->get()
            ->map(fn (Ppbj $row) => $this->presentResult($row, $moneyCriteria['value'] ?? null, $query, $moneyCriteria));
    }

    private function commandCenterSearchQuery(): Builder
    {
        return Ppbj::query()->select($this->commandCenterSearchColumns());
    }

    private function commandCenterSearchColumns(): array
    {
        return array_values(array_unique(array_merge(
            ['id'],
            array_keys(self::SEARCH_TEXT_FIELDS),
            array_keys(self::SEARCH_DATE_FIELDS),
            array_keys(self::SEARCH_NUMBER_FIELDS)
        )));
    }

    private function applyUniversalSearchFilter(Builder $builder, string $query): void
    {
        $like = '%'.$this->escapeLike($query).'%';
        $normalizedDate = $this->normalizeSearchDate($query);
        $plainNumber = $this->parsePlainNumber($query);

        $builder->where(function (Builder $match) use ($like, $normalizedDate, $plainNumber) {
            $first = true;
            foreach (array_keys(self::SEARCH_TEXT_FIELDS + self::SEARCH_DATE_FIELDS) as $column) {
                $method = $first ? 'where' : 'orWhere';
                $match->{$method}($column, 'like', $like);
                $first = false;
            }

            if ($normalizedDate !== null) {
                foreach (array_keys(self::SEARCH_DATE_FIELDS) as $column) {
                    $match->orWhere($column, 'like', $normalizedDate.'%');
                }
            }

            if ($plainNumber !== null) {
                foreach (array_keys(self::SEARCH_NUMBER_FIELDS) as $column) {
                    $match->orWhere($column, $plainNumber);
                }
            }

        });
    }

    private function applyMoneyCriteria(Builder $query, array $criteria): void
    {
        $columns = $this->moneyFieldColumns($criteria['field']);
        $context = $this->moneyMatchContext($criteria);

        $query->where(function (Builder $q) use ($columns, $criteria, $context) {
            foreach ($columns as $index => $column) {
                $method = $index === 0 ? 'where' : 'orWhere';
                $q->{$method}(fn ($part) => $this->applyMoneyCriterionToColumn($part, $column, $criteria));
            }
            if ($context['ppbj_ids'] !== []) {
                $q->orWhereIn('id', $context['ppbj_ids']);
            }
            if ($context['legacy_numbers'] !== []) {
                $q->orWhereIn('ppbj_no', $context['legacy_numbers']);
            }
        });
    }

    private function moneyMatchContext(array $criteria): array
    {
        $spPpbjIds = [];
        $legacyNumbers = [];

        if ($criteria['field'] !== 'bpg' && $criteria['mode'] !== 'rank' && Schema::hasTable('sps')) {
            $spColumns = $criteria['field'] === 'pr'
                ? ['nilai_pr']
                : ($criteria['field'] === 'sp' ? ['nilai_sp'] : ['nilai_sp', 'nilai_pr']);

            if (Schema::hasTable('sp_ppbj')) {
                $spPpbjIds = DB::table('sp_ppbj')
                    ->join('sps', 'sps.id', '=', 'sp_ppbj.sp_id')
                    ->where(function ($builder) use ($spColumns, $criteria) {
                        foreach ($spColumns as $index => $column) {
                            $method = $index === 0 ? 'where' : 'orWhere';
                            $builder->{$method}(fn ($part) => $this->applyMoneyCriterionToColumn($part, 'sps.'.$column, $criteria));
                        }
                    })
                    ->limit(100)
                    ->pluck('sp_ppbj.ppbj_id')
                    ->all();
            }

            $legacyNumbers = DB::table('sps')
                ->where(function ($builder) use ($spColumns, $criteria) {
                    foreach ($spColumns as $index => $column) {
                        $method = $index === 0 ? 'where' : 'orWhere';
                        $builder->{$method}(fn ($part) => $this->applyMoneyCriterionToColumn($part, $column, $criteria));
                    }
                })
                ->whereNotNull('nomor_pr')
                ->limit(100)
                ->pluck('nomor_pr')
                ->all();
        }

        return [
            'ppbj_ids' => $spPpbjIds,
            'legacy_numbers' => $legacyNumbers,
        ];
    }

    private function applyMoneyCriterionToColumn($query, string $column, array $criteria): void
    {
        if ($criteria['mode'] === 'rank') {
            $query->where($column, '>', 0);

            return;
        }
        if ($criteria['mode'] === 'min') {
            $query->where($column, '>', $criteria['min']);

            return;
        }
        if ($criteria['mode'] === 'max') {
            $query->where($column, '>', 0)->where($column, '<', $criteria['max']);

            return;
        }

        $query->whereBetween($column, [$criteria['min'], $criteria['max']]);
    }

    private function moneyFieldColumns(string $field): array
    {
        return match ($field) {
            'pr' => ['total_sebelum_ppn'],
            'sp' => ['nilai_sp_spk'],
            'bpg' => ['nilai_bpg'],
            default => ['total_sebelum_ppn', 'nilai_sp_spk', 'nilai_bpg'],
        };
    }

    private function presentResult(Ppbj $row, ?float $searchedValue = null, ?string $searchedText = null, ?array $moneyCriteria = null): array
    {
        $pr = (float) ($row->total_sebelum_ppn ?? 0);
        $sp = (float) ($row->nilai_sp_spk ?? 0);
        $matched = null;
        $matchedValue = null;
        if ($searchedText !== null) {
            [$matched, $matchedValue] = $this->findMatchedField($row, $searchedText);
        }
        if ($matched === null && $moneyCriteria !== null) {
            [$matched, $matchedValue] = $this->findMatchedMoneyField($row, $moneyCriteria);
        } elseif ($matched === null && $searchedValue !== null) {
            $matched = abs($pr - $searchedValue) <= max(0.5, $searchedValue * 0.000001)
                ? 'Nilai PR'
                : (abs($sp - $searchedValue) <= max(0.5, $searchedValue * 0.000001) ? 'Nilai SP/Kontrak' : 'Nilai SP terhubung');
            $matchedValue = $this->rupiah($searchedValue);
        }

        return [
            'id' => $row->id,
            'ppbj_no' => $row->ppbj_no,
            'registration' => $row->general_registration_number ?: '-',
            'uraian' => $row->uraian ?: '-',
            'portofolio' => $row->portofolio ?: '-',
            'buyer' => $row->buyer ?: '-',
            'vendor' => $row->penyedia_eksternal ?: '-',
            'spph' => $row->spph_rfq_1 ?: '-',
            'sp' => $row->awarding_sp ?: '-',
            'nilai_pr' => $pr,
            'nilai_sp' => $sp,
            'nilai_pr_label' => $this->rupiah($pr),
            'nilai_sp_label' => $this->rupiah($sp),
            'progress' => (float) ($row->progres ?? 0),
            'status' => $row->status ?: 'ACTIVE',
            'status_sla' => $row->status_sla ?: 'BELUM DIHITUNG',
            'promised_date' => $row->promised_date ? Carbon::parse($row->promised_date)->format('d M Y') : '-',
            'matched_on' => $matched,
            'matched_value' => $matchedValue,
            'action_urls' => [
                'ppbj' => route('ppbj.index', ['search' => $row->ppbj_no]),
                'spph' => route('spph.index', ['search' => $row->ppbj_no]),
                'sp' => route('sp.index', ['search' => $row->ppbj_no]),
            ],
            'details' => $this->resultDetails($row),
        ];
    }

    private function reconciliationFor(Ppbj $row): array
    {
        $critical = [];
        $warning = [];
        $pr = (float) ($row->total_sebelum_ppn ?? 0);
        $sp = (float) ($row->nilai_sp_spk ?? 0);
        $bpg = (float) ($row->nilai_bpg ?? 0);
        $linkedCount = max(1, (int) ($row->sp_linked_count ?? 1));
        $effectivePr = (float) ($row->sp_group_pr ?? $pr);
        $isPackagePrimary = $linkedCount <= 1 || (int) $row->id === (int) ($row->sp_group_first_id ?? $row->id);
        $prContext = $linkedCount > 1 ? 'total gabungan '.$linkedCount.' PR' : 'PR';

        if ($pr <= 0) {
            $critical[] = ['code' => 'missing_pr_value', 'message' => 'Nilai PR kosong atau nol.'];
        }
        if ($isPackagePrimary && $sp > 0 && $effectivePr > 0 && $sp > $effectivePr) {
            $critical[] = ['code' => 'sp_above_pr', 'message' => 'Nilai SP melebihi '.$prContext.' sebesar '.$this->rupiah($sp - $effectivePr).'.'];
        }
        if ($bpg > 0 && $sp > 0 && $bpg > $sp) {
            $critical[] = ['code' => 'bpg_above_sp', 'message' => 'Nilai BPG melebihi SP sebesar '.$this->rupiah($bpg - $sp).'.'];
        }
        if (filled($row->no_invoice) && blank($row->bpg_no)) {
            $critical[] = ['code' => 'invoice_without_bpg', 'message' => 'Invoice sudah tercatat tetapi nomor BPG belum ada.'];
        }
        if (filled($row->bpg_no) && blank($row->do_no)) {
            $critical[] = ['code' => 'bpg_without_delivery', 'message' => 'BPG sudah tercatat tetapi DO/Surat Jalan/BAST belum ada.'];
        }
        $this->appendIncompletePair($critical, $row->do_no, $row->do_date, 'delivery_pair', 'Nomor dan tanggal DO/Surat Jalan/BAST harus diisi berpasangan.');
        $this->appendIncompletePair($critical, $row->bpg_no, $row->tgl_bpg, 'bpg_pair', 'Nomor dan tanggal BPG harus diisi berpasangan.');
        $this->appendIncompletePair($critical, $row->no_invoice, $row->tgl_invoice, 'invoice_pair', 'Nomor dan tanggal invoice harus diisi berpasangan.');

        if (blank($row->awarding_sp) && $sp <= 0) {
            $warning[] = ['code' => 'missing_sp', 'message' => 'SP/Kontrak belum tercatat.'];
        }
        if ($isPackagePrimary && $effectivePr > 0 && $sp > 0 && abs($effectivePr - $sp) / $effectivePr >= 0.20) {
            $warning[] = ['code' => 'large_pr_sp_gap', 'message' => 'Selisih '.$prContext.' dan SP mencapai '.number_format(abs($effectivePr - $sp) / $effectivePr * 100, 1, ',', '.').'%.'];
        }
        if (filled($row->do_no) && blank($row->bpg_no)) {
            $warning[] = ['code' => 'waiting_bpg', 'message' => 'Dokumen serah terima tersedia; BPG belum tercatat.'];
        }
        if (filled($row->bpg_no) && blank($row->no_invoice)) {
            $warning[] = ['code' => 'waiting_invoice', 'message' => 'BPG tersedia; invoice belum tercatat.'];
        }
        if ($bpg > 0 && $sp > 0 && abs($bpg - $sp) > 1000) {
            $warning[] = ['code' => 'bpg_sp_gap', 'message' => 'Selisih nilai SP dan BPG '.$this->rupiah(abs($sp - $bpg)).'.'];
        }
        if ($row->do_date && $row->promised_date && Carbon::parse($row->do_date)->gt(Carbon::parse($row->promised_date))) {
            $days = Carbon::parse($row->promised_date)->diffInDays(Carbon::parse($row->do_date));
            $warning[] = ['code' => 'late_delivery', 'message' => 'Serah terima melewati tanggal pemenuhan '.$days.' hari.'];
        }

        $severity = $critical !== [] ? 'critical' : ($warning !== [] ? 'warning' : 'ready');
        $issues = collect($critical)->map(fn (array $item) => $item + ['level' => 'critical'])
            ->merge(collect($warning)->map(fn (array $item) => $item + ['level' => 'warning']))
            ->values()
            ->all();

        return [
            'severity' => $severity,
            'label' => ['critical' => 'Perlu koreksi', 'warning' => 'Perlu dilengkapi', 'ready' => 'Sesuai'][$severity],
            'score' => min(100, count($critical) * 30 + count($warning) * 10),
            'issues' => $issues,
            'next_action' => $issues[0]['message'] ?? 'Rangkaian PR sampai invoice konsisten.',
            'gaps' => [
                'pr_sp' => $isPackagePrimary && $effectivePr > 0 && $sp > 0 ? $this->rupiah($effectivePr - $sp) : '-',
                'sp_bpg' => $sp > 0 && $bpg > 0 ? $this->rupiah($sp - $bpg) : '-',
            ],
            'package' => [
                'is_grouped' => $linkedCount > 1,
                'linked_pr_count' => $linkedCount,
                'total_pr_label' => $this->rupiah($effectivePr),
            ],
            'stages' => [
                ['key' => 'pr', 'label' => 'PR', 'state' => $pr > 0 ? 'done' : 'problem'],
                ['key' => 'sp', 'label' => $linkedCount > 1 ? 'SP ('.$linkedCount.' PR)' : 'SP', 'state' => filled($row->awarding_sp) || $sp > 0 ? 'done' : 'empty'],
                ['key' => 'do', 'label' => 'DO/BAST', 'state' => filled($row->do_no) && filled($row->do_date) ? 'done' : (filled($row->do_no) || filled($row->do_date) ? 'problem' : 'empty')],
                ['key' => 'bpg', 'label' => 'BPG', 'state' => filled($row->bpg_no) && filled($row->tgl_bpg) ? 'done' : (filled($row->bpg_no) || filled($row->tgl_bpg) ? 'problem' : 'empty')],
                ['key' => 'invoice', 'label' => 'Invoice', 'state' => filled($row->no_invoice) && filled($row->tgl_invoice) ? 'done' : (filled($row->no_invoice) || filled($row->tgl_invoice) ? 'problem' : 'empty')],
            ],
        ];
    }

    private function appendIncompletePair(array &$issues, mixed $number, mixed $date, string $code, string $message): void
    {
        if (filled($number) !== filled($date)) {
            $issues[] = ['code' => $code, 'message' => $message];
        }
    }

    private function riskFor(Ppbj $row): array
    {
        $score = 0;
        $reasons = [];
        $start = $row->tgl_diserahkan ?: $row->tgl_terima_pr ?: $row->tgl_ppbj ?: $row->created_at;
        $age = $start ? max(0, Carbon::parse($start)->diffInDays(today())) : 0;
        $deadline = $row->promised_date ?: $row->closed_date;

        if (($row->status_sla ?? '') === 'OVERDUE' || (int) $row->sisa_target_sla < 0) {
            $score += 35;
            $reasons[] = 'SLA pengadaan melewati batas';
        }
        if ($deadline && blank($row->do_no)) {
            $days = today()->diffInDays(Carbon::parse($deadline)->startOfDay(), false);
            if ($days < 0) {
                $score += 35;
                $reasons[] = 'Pemenuhan terlambat '.abs($days).' hari';
            } elseif ($days <= 7) {
                $score += 20;
                $reasons[] = 'Batas pemenuhan '.$days.' hari lagi';
            }
        }
        if (blank($row->awarding_sp) && $age > 7) {
            $score += 20;
            $reasons[] = 'Belum ada SP/Kontrak setelah '.$age.' hari';
        }
        if ((float) $row->progres <= 20 && $age > 10) {
            $score += 15;
            $reasons[] = 'Progress masih awal';
        }
        if (blank($row->penyedia_eksternal) && filled($row->spph_rfq_1)) {
            $score += 10;
            $reasons[] = 'Vendor pemenang belum ditetapkan';
        }
        $pr = (float) $row->total_sebelum_ppn;
        $sp = (float) $row->nilai_sp_spk;
        if ($pr > 0 && $sp > 0 && abs($pr - $sp) / $pr >= 0.2) {
            $score += 10;
            $reasons[] = 'Selisih nilai PR dan SP ≥20%';
        }

        return array_merge($this->presentResult($row), [
            'score' => min(100, $score),
            'level' => $score >= 70 ? 'critical' : ($score >= 40 ? 'warning' : 'watch'),
            'reasons' => $reasons,
        ]);
    }

    private function journeyStages(Ppbj $row): array
    {
        $stages = [
            ['key' => 'pr', 'label' => 'PR diterima Umum', 'done' => filled($row->tgl_diserahkan ?: $row->tgl_terima_pr), 'date' => $row->tgl_diserahkan ?: $row->tgl_terima_pr],
            ['key' => 'registration', 'label' => 'Registrasi Umum', 'done' => filled($row->general_registration_number), 'date' => $row->general_registered_at ?? null],
            ['key' => 'spph', 'label' => 'SPPH / RFQ', 'done' => filled($row->spph_rfq_1) || $row->spphs->isNotEmpty(), 'date' => $row->tgl_spph],
            ['key' => 'sp', 'label' => 'SP / Kontrak', 'done' => filled($row->awarding_sp) || $row->sps->isNotEmpty(), 'date' => $row->tgl_spk ?: $row->tgl_awarding_sp],
            ['key' => 'delivery', 'label' => 'DO / Surat Jalan / BAST', 'done' => filled($row->do_no) && filled($row->do_date), 'date' => $row->do_date],
            ['key' => 'finance', 'label' => 'Keuangan', 'done' => filled($row->bpg_no) || filled($row->bpb_no), 'date' => null],
            ['key' => 'invoice', 'label' => 'Invoice & Arsip', 'done' => filled($row->no_invoice), 'date' => null],
        ];

        return collect($stages)->map(function (array $stage, int $index) use ($stages) {
            $stage['state'] = $stage['done'] ? 'done' : (collect($stages)->take($index)->every('done') ? 'current' : 'locked');
            $stage['date_label'] = $stage['date'] ? Carbon::parse($stage['date'])->format('d M Y') : null;

            return $stage;
        })->values()->all();
    }

    private function findMatchedField(Ppbj $row, string $query): array
    {
        $needle = mb_strtolower(trim($query));
        $normalizedDate = $this->normalizeSearchDate($query);

        foreach (self::SEARCH_TEXT_FIELDS as $column => $label) {
            $value = trim((string) ($row->getAttribute($column) ?? ''));
            if ($value !== '' && str_contains(mb_strtolower($value), $needle)) {
                return [$label, $value];
            }
        }

        foreach (self::SEARCH_DATE_FIELDS as $column => $label) {
            $value = trim((string) ($row->getAttribute($column) ?? ''));
            if ($value === '') {
                continue;
            }
            if (str_contains(mb_strtolower($value), $needle) || ($normalizedDate !== null && str_starts_with($value, $normalizedDate))) {
                return [$label, $this->formatSearchDate($value)];
            }
        }

        $plainNumber = $this->parsePlainNumber($query);
        if ($plainNumber !== null) {
            foreach (self::SEARCH_NUMBER_FIELDS as $column => $label) {
                $value = $row->getAttribute($column);
                if (is_numeric($value) && (float) $value === $plainNumber) {
                    return [$label, in_array($column, ['total_sebelum_ppn', 'nilai_sp_spk', 'nilai_bpg'], true)
                        ? $this->rupiah((float) $value)
                        : (string) $value];
                }
            }
        }

        return [null, null];
    }

    private function findMatchedMoneyField(Ppbj $row, array $criteria): array
    {
        $labels = [
            'total_sebelum_ppn' => 'Nilai PR',
            'nilai_sp_spk' => 'Nilai SP/Kontrak',
            'nilai_bpg' => 'Nilai BPG',
        ];

        foreach ($this->moneyFieldColumns($criteria['field']) as $column) {
            $value = (float) ($row->getAttribute($column) ?? 0);
            if ($this->moneyValueMatches($value, $criteria)) {
                return [$labels[$column], $this->rupiah($value)];
            }
        }

        return ['Nilai SP terhubung', $criteria['label']];
    }

    private function moneyValueMatches(float $value, array $criteria): bool
    {
        if ($value <= 0) {
            return false;
        }

        return match ($criteria['mode']) {
            'rank' => true,
            'min' => $value > $criteria['min'],
            'max' => $value < $criteria['max'],
            default => $value >= $criteria['min'] && $value <= $criteria['max'],
        };
    }

    private function resultDetails(Ppbj $row): array
    {
        $details = [
            'No. Registrasi Umum' => $row->general_registration_number,
            'Tanggal Registrasi Umum' => $this->formatSearchDate($row->general_registered_at),
            'Tanggal PPBJ' => $this->formatSearchDate($row->tgl_ppbj),
            'Tanggal Terima PR' => $this->formatSearchDate($row->tgl_terima_pr),
            'Tanggal Diserahkan' => $this->formatSearchDate($row->tgl_diserahkan),
            'Catatan' => $row->note,
            'Portofolio' => $row->portofolio,
            'Buyer' => $row->buyer,
            'Penyedia/Vendor' => $row->penyedia_eksternal,
            'Metode Pengadaan' => $row->metode_pengadaan,
            'Nilai PR' => $row->total_sebelum_ppn !== null ? $this->rupiah((float) $row->total_sebelum_ppn) : null,
            'SPPH/RFQ 1' => $row->spph_rfq_1,
            'RFQ 2' => $row->rfq_2,
            'RFQ 3' => $row->rfq_3,
            'Tanggal SPPH' => $this->formatSearchDate($row->tgl_spph),
            'Sisa QT' => $row->qt_left !== null ? $row->qt_left.' hari' : null,
            'SPH' => $row->sph,
            'Tanggal SPH' => $this->formatSearchDate($row->tgl_sph),
            'Awarding/SP/Kontrak' => $row->awarding_sp,
            'Tanggal Awarding' => $this->formatSearchDate($row->tgl_awarding_sp),
            'Pemenang' => $row->pemenang,
            'Tanggal Pemenang' => $this->formatSearchDate($row->tgl_pemenang),
            'Tanggal SPK' => $this->formatSearchDate($row->tgl_spk),
            'Nilai SP/Kontrak' => $row->nilai_sp_spk !== null ? $this->rupiah((float) $row->nilai_sp_spk) : null,
            'Persentase Realisasi' => $row->persentase_realisasi !== null ? ((float) $row->persentase_realisasi).'%' : null,
            'Tanggal Pemenuhan' => $this->formatSearchDate($row->promised_date),
            'Closed Date' => $this->formatSearchDate($row->closed_date),
            'Sisa Waktu' => $row->time_left !== null ? $row->time_left.' hari' : null,
            'Tanggal Barang Datang' => $this->formatSearchDate($row->goods_arrived_at),
            'Catatan Barang Datang' => $row->goods_arrived_note,
            'Tanggal Konfirmasi Barang' => $this->formatSearchDate($row->goods_confirmed_at),
            'Catatan Konfirmasi Barang' => $row->goods_confirmed_note,
            'DO/Surat Jalan/BAST' => $row->do_no,
            'Tanggal DO/BAST' => $this->formatSearchDate($row->do_date),
            'Tanggal Perubahan DO' => $this->formatSearchDate($row->do_updated_at),
            'No. BPG' => $row->bpg_no,
            'Nilai BPG' => $row->nilai_bpg !== null ? $this->rupiah((float) $row->nilai_bpg) : null,
            'Tanggal BPG' => $this->formatSearchDate($row->tgl_bpg),
            'No. BPB' => $row->bpb_no,
            'Tanggal BPB' => $this->formatSearchDate($row->tgl_bpb),
            'No. Invoice' => $row->no_invoice,
            'Tanggal Invoice' => $this->formatSearchDate($row->tgl_invoice),
            'Receiving Transaction' => $row->receiving_transaction,
            'Progress' => $row->progres !== null ? ((float) $row->progres).'%' : null,
            'Status SLA' => $row->status_sla,
            'Sisa SLA' => $row->sisa_target_sla !== null ? $row->sisa_target_sla.' hari' : null,
            'Target SLA' => $row->target_sla_hari !== null ? $row->target_sla_hari.' hari' : null,
            'Realisasi SLA' => $row->realisasi_sla !== null ? $row->realisasi_sla.' hari' : null,
            'Status' => $row->status,
            'Keterangan' => $row->keterangan,
            'Alasan Pembatalan' => $row->cancel_reason,
            'Tanggal Pembatalan' => $this->formatSearchDate($row->cancelled_at),
            'Dibuat' => $this->formatSearchDate($row->created_at, true),
            'Diperbarui' => $this->formatSearchDate($row->updated_at, true),
        ];

        return collect($details)
            ->reject(fn ($value) => $value === null || trim((string) $value) === '')
            ->map(fn ($value, $label) => ['label' => $label, 'value' => (string) $value])
            ->values()
            ->all();
    }

    private function normalizeSearchDate(string $value): ?string
    {
        $value = trim($value);
        foreach (['d/m/Y', 'd-m-Y', 'Y-m-d'] as $format) {
            try {
                $date = Carbon::createFromFormat('!'.$format, $value);
                if ($date !== false && $date->format($format) === $value) {
                    return $date->format('Y-m-d');
                }
            } catch (\Throwable) {
                // Bukan input tanggal lengkap; lanjut sebagai kata kunci biasa.
            }
        }

        return null;
    }

    private function formatSearchDate(mixed $value, bool $withTime = false): ?string
    {
        if (blank($value)) {
            return null;
        }

        try {
            return Carbon::parse($value)->format($withTime ? 'd M Y H:i' : 'd M Y');
        } catch (\Throwable) {
            return (string) $value;
        }
    }

    private function parsePlainNumber(string $value): ?float
    {
        $value = trim($value);
        if (preg_match('/^0\d+$/', $value) === 1 || preg_match('/^\d+(?:[.,]\d+)?$/', $value) !== 1) {
            return null;
        }

        return (float) str_replace(',', '.', $value);
    }

    private function parseMoneyExpression(string $value): ?float
    {
        $text = mb_strtolower(trim($value));
        $hasMoneyContext = preg_match('/\b(rp|nilai|harga|nominal|juta|jt|miliar|milyar|ribu|rb)\b/u', $text) === 1;
        $isOnlyNumber = preg_match('/^\s*(?:rp\s*)?[\d.,]+\s*(?:juta|jt|miliar|milyar|ribu|rb)?\s*$/u', $text) === 1;
        if (! $hasMoneyContext && ! $isOnlyNumber) {
            return null;
        }
        if (! preg_match('/([\d][\d.,]*)\s*(miliar|milyar|juta|jt|ribu|rb)?/u', $text, $matches)) {
            return null;
        }

        $raw = $matches[1];
        $unit = $matches[2] ?? '';
        if ($unit !== '') {
            $number = (float) str_replace(',', '.', str_replace('.', '', preg_replace('/(?<=\d)\.(?=\d{1,2}$)/', ',', $raw)));
            $multiplier = in_array($unit, ['miliar', 'milyar'], true) ? 1_000_000_000 : (in_array($unit, ['juta', 'jt'], true) ? 1_000_000 : 1_000);

            return $number * $multiplier;
        }

        $digits = preg_replace('/\D/', '', $raw);

        // Nomor urut PR seperti 0825 adalah identifier, bukan nominal Rp825.
        if (! $hasMoneyContext && preg_match('/^0\d+$/', $digits) === 1) {
            return null;
        }

        return $digits === '' ? null : (float) $digits;
    }

    private function parseMoneyCriteria(string $value): ?array
    {
        $text = mb_strtolower(trim($value));
        $field = $this->detectMoneyField($text);
        $fieldLabel = match ($field) {
            'pr' => 'Nilai PR',
            'sp' => 'Nilai SP/Kontrak',
            'bpg' => 'Nilai BPG',
            default => 'Semua nilai',
        };

        if (preg_match('/\b(terbesar|tertinggi|paling\s+besar|terkecil|terendah|paling\s+kecil)\b/u', $text, $rank)) {
            $descending = preg_match('/terbesar|tertinggi|paling\s+besar/u', $rank[1]) === 1;
            preg_match('/\b(\d{1,2})\s*(?:data|pengadaan|pr|sp|kontrak|bpg)?\b/u', $text, $limitMatch);
            $limit = isset($limitMatch[1]) ? max(1, min(50, (int) $limitMatch[1])) : 10;

            return [
                'mode' => 'rank', 'field' => $field, 'field_label' => $fieldLabel,
                'value' => null, 'min' => null, 'max' => null,
                'sort' => $descending ? 'desc' : 'asc', 'limit' => $limit,
                'label' => $limit.' '.$fieldLabel.' '.($descending ? 'terbesar' : 'terkecil'),
            ];
        }

        $amountPattern = '([\d][\d.,]*)\s*(miliar|milyar|juta|jt|ribu|rb)?';
        if (preg_match('/(?:\bantara\b|\bdari\b)?\s*'.$amountPattern.'\s*(?:sampai|hingga|s\/d|sd|–|-)\s*'.$amountPattern.'/u', $text, $range)) {
            $leftUnit = $range[2] ?: ($range[4] ?? '');
            $rightUnit = $range[4] ?: $leftUnit;
            $first = $this->parseMoneyAmount($range[1], $leftUnit);
            $second = $this->parseMoneyAmount($range[3], $rightUnit);
            if ($first !== null && $second !== null) {
                $min = min($first, $second);
                $max = max($first, $second);

                return [
                    'mode' => 'range', 'field' => $field, 'field_label' => $fieldLabel,
                    'value' => null, 'min' => $min, 'max' => $max, 'sort' => null,
                    'limit' => self::SEARCH_LIMIT,
                    'label' => $fieldLabel.' antara '.$this->rupiah($min).' dan '.$this->rupiah($max),
                ];
            }
        }

        $money = $this->parseMoneyExpression($value);
        if ($money === null) {
            return null;
        }

        if (preg_match('/(?:di\s+atas|lebih\s+dari|lebih\s+besar\s+dari|minimal|setidaknya|>=)/u', $text)) {
            return [
                'mode' => 'min', 'field' => $field, 'field_label' => $fieldLabel,
                'value' => $money, 'min' => $money, 'max' => null, 'sort' => null,
                'limit' => self::SEARCH_LIMIT, 'label' => $fieldLabel.' di atas '.$this->rupiah($money),
            ];
        }
        if (preg_match('/(?:di\s+bawah|kurang\s+dari|lebih\s+kecil\s+dari|maksimal|<=)/u', $text)) {
            return [
                'mode' => 'max', 'field' => $field, 'field_label' => $fieldLabel,
                'value' => $money, 'min' => 0.0, 'max' => $money, 'sort' => null,
                'limit' => self::SEARCH_LIMIT, 'label' => $fieldLabel.' di bawah '.$this->rupiah($money),
            ];
        }
        if (preg_match('/(?:sekitar|kisaran|kurang\s+lebih)/u', $text)) {
            $tolerance = max(1000.0, abs($money) * 0.05);

            return [
                'mode' => 'around', 'field' => $field, 'field_label' => $fieldLabel,
                'value' => $money, 'min' => max(0, $money - $tolerance), 'max' => $money + $tolerance,
                'sort' => null, 'limit' => self::SEARCH_LIMIT,
                'label' => $fieldLabel.' sekitar '.$this->rupiah($money).' (±5%)',
            ];
        }

        $tolerance = max(0.5, abs($money) * 0.000001);

        return [
            'mode' => 'exact', 'field' => $field, 'field_label' => $fieldLabel,
            'value' => $money, 'min' => $money - $tolerance, 'max' => $money + $tolerance,
            'sort' => null, 'limit' => self::SEARCH_LIMIT,
            'label' => $fieldLabel.' tepat '.$this->rupiah($money),
        ];
    }

    private function detectMoneyField(string $text): string
    {
        $fields = [];
        if (preg_match('/\bbpg\b/u', $text)) {
            $fields[] = 'bpg';
        }
        if (preg_match('/\b(?:sp|kontrak)\b/u', $text)) {
            $fields[] = 'sp';
        }
        if (preg_match('/\bpr\b/u', $text)) {
            $fields[] = 'pr';
        }

        return count(array_unique($fields)) === 1 ? $fields[0] : 'all';
    }

    private function parseMoneyAmount(string $raw, string $unit): ?float
    {
        $raw = trim($raw);
        if ($raw === '') {
            return null;
        }
        if ($unit === '') {
            $digits = preg_replace('/\D/', '', $raw);

            return $digits === '' ? null : (float) $digits;
        }

        if (str_contains($raw, ',')) {
            $number = (float) str_replace(',', '.', str_replace('.', '', $raw));
        } elseif (substr_count($raw, '.') === 1 && strlen((string) strrchr($raw, '.')) <= 3) {
            $number = (float) $raw;
        } else {
            $number = (float) str_replace('.', '', $raw);
        }
        $multiplier = in_array($unit, ['miliar', 'milyar'], true)
            ? 1_000_000_000
            : (in_array($unit, ['juta', 'jt'], true) ? 1_000_000 : 1_000);

        return $number * $multiplier;
    }

    private function trackingToken(string $number): string
    {
        $cipher = Crypt::encryptString(trim($number));

        return rtrim(strtr(base64_encode($cipher), '+/', '-_'), '=');
    }

    private function escapeLike(string $value): string
    {
        return addcslashes($value, '%_\\');
    }

    private function rupiah(float $value): string
    {
        return 'Rp '.number_format($value, 0, ',', '.');
    }
}
