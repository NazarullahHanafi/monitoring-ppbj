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
        $money = $this->parseMoneyExpression($query);
        $rows = $this->searchRows($query, $money);

        return response()->json([
            'query' => $query,
            'detected_value' => $money,
            'detected_value_label' => $money !== null ? $this->rupiah($money) : null,
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
        $money = $this->parseMoneyExpression($question);
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

        if ($money !== null) {
            $this->applyMoneyFilter($query, $money);
            $filters[] = 'nilai '.$this->rupiah($money);
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

        $rows = $query->orderByDesc('updated_at')->limit(self::SEARCH_LIMIT)->get()->map(fn (Ppbj $row) => $this->presentResult($row));

        return response()->json([
            'answer' => $rows->isEmpty()
                ? 'Tidak ada pengadaan yang cocok dengan '.implode(', ', $filters).'.'
                : 'Ditemukan '.$rows->count().' pengadaan untuk '.implode(', ', $filters).'. Prioritas tertinggi ditampilkan lebih dahulu.',
            'filters' => $filters,
            'count' => $rows->count(),
            'results' => $rows,
        ]);
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
    }

    private function overviewData(): array
    {
        return Cache::remember(
            self::OVERVIEW_CACHE_KEY,
            self::OVERVIEW_TTL,
            fn () => $this->buildOverview()
        );
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
            'promised_date', 'closed_date', 'do_no', 'do_date', 'bpg_no', 'bpb_no',
            'no_invoice', 'progres', 'status', 'status_sla', 'sisa_target_sla',
            'target_sla_hari', 'tgl_diserahkan', 'tgl_terima_pr', 'tgl_ppbj',
            'created_at', 'updated_at',
        ]);
    }

    private function searchRows(string $query, ?float $money)
    {
        $builder = $this->commandCenterSearchQuery();
        $this->applyUniversalSearchFilter($builder, $query, $money);

        return $builder->orderByDesc('updated_at')->limit(self::SEARCH_LIMIT)->get()
            ->map(fn (Ppbj $row) => $this->presentResult($row, $money, $query));
    }

    private function commandCenterSearchQuery(): Builder
    {
        $columns = array_values(array_unique(array_merge(
            ['id'],
            array_keys(self::SEARCH_TEXT_FIELDS),
            array_keys(self::SEARCH_DATE_FIELDS),
            array_keys(self::SEARCH_NUMBER_FIELDS)
        )));

        return Ppbj::query()->select($columns);
    }

    private function applyUniversalSearchFilter(Builder $builder, string $query, ?float $money): void
    {
        $like = '%'.$this->escapeLike($query).'%';
        $normalizedDate = $this->normalizeSearchDate($query);
        $plainNumber = $this->parsePlainNumber($query);
        $moneyContext = $money !== null ? $this->moneyMatchContext($money) : null;

        $builder->where(function (Builder $match) use ($like, $normalizedDate, $plainNumber, $moneyContext) {
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

            if ($moneyContext !== null) {
                $match->orWhereBetween('total_sebelum_ppn', [$moneyContext['min'], $moneyContext['max']])
                    ->orWhereBetween('nilai_sp_spk', [$moneyContext['min'], $moneyContext['max']])
                    ->orWhereBetween('nilai_bpg', [$moneyContext['min'], $moneyContext['max']]);
                if ($moneyContext['ppbj_ids'] !== []) {
                    $match->orWhereIn('id', $moneyContext['ppbj_ids']);
                }
                if ($moneyContext['legacy_numbers'] !== []) {
                    $match->orWhereIn('ppbj_no', $moneyContext['legacy_numbers']);
                }
            }
        });
    }

    private function applyMoneyFilter(Builder $query, float $money): void
    {
        $context = $this->moneyMatchContext($money);

        $query->where(function (Builder $q) use ($context) {
            $q->whereBetween('total_sebelum_ppn', [$context['min'], $context['max']])
                ->orWhereBetween('nilai_sp_spk', [$context['min'], $context['max']])
                ->orWhereBetween('nilai_bpg', [$context['min'], $context['max']]);
            if ($context['ppbj_ids'] !== []) {
                $q->orWhereIn('id', $context['ppbj_ids']);
            }
            if ($context['legacy_numbers'] !== []) {
                $q->orWhereIn('ppbj_no', $context['legacy_numbers']);
            }
        });
    }

    private function moneyMatchContext(float $money): array
    {
        $tolerance = max(0.5, abs($money) * 0.000001);
        $min = $money - $tolerance;
        $max = $money + $tolerance;
        $spPpbjIds = [];
        $legacyNumbers = [];

        if (Schema::hasTable('sps')) {
            if (Schema::hasTable('sp_ppbj')) {
                $spPpbjIds = DB::table('sp_ppbj')
                    ->join('sps', 'sps.id', '=', 'sp_ppbj.sp_id')
                    ->where(fn ($builder) => $builder
                        ->whereBetween('sps.nilai_sp', [$min, $max])
                        ->orWhereBetween('sps.nilai_pr', [$min, $max]))
                    ->limit(100)
                    ->pluck('sp_ppbj.ppbj_id')
                    ->all();
            }

            $legacyNumbers = DB::table('sps')
                ->where(fn ($builder) => $builder
                    ->whereBetween('nilai_sp', [$min, $max])
                    ->orWhereBetween('nilai_pr', [$min, $max]))
                ->whereNotNull('nomor_pr')
                ->limit(100)
                ->pluck('nomor_pr')
                ->all();
        }

        return [
            'min' => $min,
            'max' => $max,
            'ppbj_ids' => $spPpbjIds,
            'legacy_numbers' => $legacyNumbers,
        ];
    }

    private function presentResult(Ppbj $row, ?float $searchedValue = null, ?string $searchedText = null): array
    {
        $pr = (float) ($row->total_sebelum_ppn ?? 0);
        $sp = (float) ($row->nilai_sp_spk ?? 0);
        $matched = null;
        $matchedValue = null;
        if ($searchedText !== null) {
            [$matched, $matchedValue] = $this->findMatchedField($row, $searchedText);
        }
        if ($matched === null && $searchedValue !== null) {
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
            'details' => $this->resultDetails($row),
        ];
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

    private function resultDetails(Ppbj $row): array
    {
        $details = [
            'No. Registrasi Umum' => $row->general_registration_number,
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
            'SPH' => $row->sph,
            'Tanggal SPH' => $this->formatSearchDate($row->tgl_sph),
            'Awarding/SP/Kontrak' => $row->awarding_sp,
            'Tanggal Awarding' => $this->formatSearchDate($row->tgl_awarding_sp),
            'Pemenang' => $row->pemenang,
            'Tanggal Pemenang' => $this->formatSearchDate($row->tgl_pemenang),
            'Tanggal SPK' => $this->formatSearchDate($row->tgl_spk),
            'Nilai SP/Kontrak' => $row->nilai_sp_spk !== null ? $this->rupiah((float) $row->nilai_sp_spk) : null,
            'Tanggal Pemenuhan' => $this->formatSearchDate($row->promised_date),
            'Closed Date' => $this->formatSearchDate($row->closed_date),
            'DO/Surat Jalan/BAST' => $row->do_no,
            'Tanggal DO/BAST' => $this->formatSearchDate($row->do_date),
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

    private function formatSearchDate(mixed $value): ?string
    {
        if (blank($value)) {
            return null;
        }

        try {
            return Carbon::parse($value)->format('d M Y H:i');
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
