<?php

namespace App\Http\Controllers;

use App\Models\MasterPenyediaEksternal;
use App\Models\MasterPortofolio;
use App\Support\Csv;
use App\Support\PpbjReportFilters;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PpbjReportController extends Controller
{
    public function index(): Response
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
                ->map(fn ($value) => trim((string) $value))
                ->filter(fn ($value) => $value !== '')
                ->unique(fn ($value) => mb_strtolower($value))
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
                ->map(fn ($value) => trim((string) $value))
                ->filter(fn ($value) => $value !== '')
                ->unique(fn ($value) => mb_strtolower($value))
                ->sort(SORT_NATURAL | SORT_FLAG_CASE)
                ->values();
        });

        return response()->view('ppbj.report', compact('portofolios', 'vendors'))->header('Cache-Control', 'private, no-store');
    }

    public function data(Request $request): JsonResponse
    {
        // Table, aggregate cards and CSV share the stored SLA snapshot instead
        // of recalculating a live model accessor for every serialized row.
        $filters = PpbjReportFilters::fromRequest($request);
        $query = $filters->apply(DB::table('ppbj'));

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
            ->orderByDesc('total_value')->orderBy('label')
            ->limit(20)
            ->get();

        $byVendor = (clone $query)
            ->selectRaw("COALESCE(NULLIF(penyedia_eksternal, ''), 'Tanpa Vendor') as label, COUNT(*) as total, COALESCE(SUM(total_sebelum_ppn), 0) as total_value, COALESCE(SUM(nilai_sp_spk), 0) as total_sp_value")
            ->groupBy('penyedia_eksternal')
            ->orderByDesc('total_value')->orderBy('label')
            ->limit(20)
            ->get();

        $total = (int) ($statsRow->total ?? 0);
        $lastPage = max(1, (int) ceil($total / $filters->perPage));
        $page = min($filters->page, $lastPage);
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
            ->orderByDesc('created_at')->orderByDesc('id')
            ->forPage($page, $filters->perPage)
            ->get();

        return response()->json([
            'data' => $data,
            'pagination' => [
                'page' => $page, 'per_page' => $filters->perPage, 'total' => $total, 'last_page' => $lastPage,
                'from' => $data->isEmpty() ? null : ($page - 1) * $filters->perPage + 1,
                'to' => $data->isEmpty() ? null : ($page - 1) * $filters->perPage + $data->count(),
            ],
            'stats' => [
                'total' => $total,
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
        ])->header('Cache-Control', 'private, no-store');
    }

    public function export(Request $request): StreamedResponse
    {
        // Validate before starting a download; never return half a CSV for an
        // invalid period. The upper ID excludes uploads inserted mid-export.
        $filters = PpbjReportFilters::fromRequest($request);
        $query = $filters->apply(DB::table('ppbj'));
        $upperId = (clone $query)->max('id');
        $filename = 'Laporan_PPBJ_'.ucfirst($filters->period).'_'.now()->format('Ymd_His').'.csv';

        return response()->streamDownload(function () use ($query, $upperId) {
            $out = fopen('php://output', 'w');
            try {
                fwrite($out, "\xEF\xBB\xBF");
                fputcsv($out, ['No PPBJ', 'Tanggal Dibuat', 'Uraian', 'Portofolio', 'Buyer', 'Penyedia/Vendor', 'Total PR (Rp)', 'Nilai SP/SPK (Rp)', 'Nilai BPG (Rp)', 'Status SLA', 'Sisa SLA (Hari)', 'Progress (%)', 'Status'], ',', '"', '');
                if ($upperId === null) {
                    return;
                }
                $last = null;
                do {
                    $page = (clone $query)->where('id', '<=', $upperId);
                    if ($last) {
                        $page->where(function ($next) use ($last) {
                            if ($last->created_at === null) {
                                $next->whereNull('created_at')->where('id', '<', $last->id);
                            } else {
                                $next->where('created_at', '<', $last->created_at)
                                    ->orWhere(fn ($tie) => $tie->where('created_at', $last->created_at)->where('id', '<', $last->id))
                                    ->orWhereNull('created_at');
                            }
                        });
                    }
                    $rows = $page->orderByDesc('created_at')->orderByDesc('id')->limit(500)
                        ->get(['id', 'ppbj_no', 'created_at', 'uraian', 'portofolio', 'buyer', 'penyedia_eksternal',
                            'total_sebelum_ppn', 'nilai_sp_spk', 'nilai_bpg', 'status_sla', 'sisa_target_sla', 'progres', 'status']);
                    foreach ($rows as $row) {
                        fputcsv($out, Csv::row([
                            $row->ppbj_no,
                            $row->created_at ? Carbon::parse($row->created_at)->format('d/m/Y H:i') : '-',
                            $row->uraian, $row->portofolio, $row->buyer, $row->penyedia_eksternal,
                            number_format($row->total_sebelum_ppn ?? 0, 0, ',', '.'),
                            number_format($row->nilai_sp_spk ?? 0, 0, ',', '.'),
                            number_format($row->nilai_bpg ?? 0, 0, ',', '.'),
                            $row->status_sla, $row->sisa_target_sla === null ? '-' : $row->sisa_target_sla.' hari',
                            ($row->progres ?? 0).'%', $row->status ?? 'ACTIVE',
                        ]), ',', '"', '');
                    }
                    $last = $rows->last();
                } while ($rows->count() === 500);
            } finally {
                fclose($out);
            }
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8', 'Cache-Control' => 'private, no-store', 'X-Accel-Buffering' => 'no']);
    }
}
