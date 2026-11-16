<?php

namespace App\Http\Controllers;

use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OperasionalDashboardController extends Controller
{
    private const CACHE_TTLS = ['snapshot' => 300, 'chart' => 600, 'latest' => 60, 'portfolios' => 300];

    private const STATUS_SQL = "CASE WHEN pra.status IN ('PENDING', 'APPROVED', 'REJECTED') THEN pra.status WHEN t.received_at IS NOT NULL THEN 'APPROVED' ELSE 'DRAFT' END";

    public function index(Request $request)
    {
        try {
            $data = $this->data();
        } catch (\Throwable $error) {
            report($error);
            $data = ['stats' => array_fill_keys(['total', 'pending', 'approved', 'rejected', 'draft'], 0),
                'kpi' => ['avgPendingHours' => 0], 'chart' => ['labels' => [], 'series' => []], 'latest' => collect(), 'topPortofolios' => collect()];
        }

        return view('operasional.dashboard', $data['stats'] + [
            'avgPendingHours' => $data['kpi']['avgPendingHours'], 'monthlyLabels' => $data['chart']['labels'],
            'monthlySeries' => $data['chart']['series'], 'latestRows' => $data['latest'], 'topPortofolios' => $data['topPortofolios'],
        ]);
    }

    public function getData()
    {
        try {
            return response()->json(['success' => true, 'data' => $this->data()])->header('Cache-Control', 'private, no-store');
        } catch (\Throwable $error) {
            report($error);

            return response()->json(['success' => false, 'message' => 'Data dashboard belum dapat dimuat. Coba kembali sebentar lagi.'], 500)->header('Cache-Control', 'private, no-store');
        }
    }

    private function key(string $segment): string
    {
        return 'ops-dashboard:v2:'.config('app.cache_version', '1').':'.$segment;
    }

    private function data(): array
    {
        $snapshot = Cache::remember($this->key('snapshot'), self::CACHE_TTLS['snapshot'], fn () => $this->snapshot());
        $stats = [];
        foreach (['total', 'pending', 'approved', 'rejected', 'draft'] as $field) {
            $stats[$field] = (int) ($snapshot->$field ?? 0);
        }

        return ['stats' => $stats, 'kpi' => ['avgPendingHours' => round((float) ($snapshot->avg_hours ?? 0), 1)],
            'chart' => Cache::remember($this->key('chart'), self::CACHE_TTLS['chart'], fn () => $this->chart()),
            'latest' => Cache::remember($this->key('latest'), self::CACHE_TTLS['latest'], fn () => $this->latest()),
            'topPortofolios' => Cache::remember($this->key('portfolios'), self::CACHE_TTLS['portfolios'], fn () => $this->portfolios())];
    }

    private function receipts(): Builder
    {
        return DB::table('torprs as t')->leftJoin('pr_receipt_approvals as pra', function ($join) {
            $join->on('pra.torpr_id', '=', 't.id')->whereRaw('pra.id = (SELECT MAX(latest.id) FROM pr_receipt_approvals latest WHERE latest.torpr_id = t.id)');
        });
    }

    private function snapshot(): object
    {
        $status = self::STATUS_SQL;
        $hours = DB::connection()->getDriverName() === 'sqlite'
            ? 'CAST(ROUND((julianday(?) - julianday(pra.requested_at)) * 24, 6) AS INTEGER)'
            : 'TIMESTAMPDIFF(HOUR, pra.requested_at, ?)';
        $now = now()->toDateTimeString();

        return $this->receipts()->selectRaw("COUNT(*) AS total,
            COALESCE(SUM(CASE WHEN ($status) = 'PENDING' THEN 1 ELSE 0 END), 0) AS pending,
            COALESCE(SUM(CASE WHEN ($status) = 'APPROVED' THEN 1 ELSE 0 END), 0) AS approved,
            COALESCE(SUM(CASE WHEN ($status) = 'REJECTED' THEN 1 ELSE 0 END), 0) AS rejected,
            COALESCE(SUM(CASE WHEN ($status) = 'DRAFT' THEN 1 ELSE 0 END), 0) AS draft,
            COALESCE(AVG(CASE WHEN ($status) = 'PENDING' AND pra.requested_at IS NOT NULL
                THEN CASE WHEN pra.requested_at > ? THEN 0 ELSE $hours END END), 0) AS avg_hours", [$now, $now])->first();
    }

    private function chart(): array
    {
        $month = now()->startOfMonth();
        $start = $month->copy()->subMonths(5);
        $expression = DB::connection()->getDriverName() === 'sqlite' ? "strftime('%Y-%m', tanggal_pr)" : "DATE_FORMAT(tanggal_pr, '%Y-%m')";
        $counts = DB::table('torprs')->selectRaw($expression.' as ym, COUNT(*) as total')
            ->where('tanggal_pr', '>=', $start->toDateString())->where('tanggal_pr', '<', $month->copy()->addMonth()->toDateString())
            ->groupBy('ym')->pluck('total', 'ym');
        $labels = $series = [];
        for ($offset = 0; $offset < 6; $offset++) {
            $date = $start->copy()->addMonths($offset);
            $labels[] = $date->format('M Y');
            $series[] = (int) ($counts[$date->format('Y-m')] ?? 0);
        }

        return compact('labels', 'series');
    }

    private function latest()
    {
        return $this->receipts()->select(['t.id', 't.nomor_pr', 't.tujuan_pengadaan', 't.tanggal_pr'])
            ->selectRaw(self::STATUS_SQL.' AS current_status')->latest('t.id')->limit(3)->get()->map(fn ($row) => [
                'id' => (int) $row->id, 'nomor_pr' => $row->nomor_pr, 'tujuan_pengadaan' => $row->tujuan_pengadaan,
                'tanggal_pr' => $row->tanggal_pr ? Carbon::parse($row->tanggal_pr)->format('Y-m-d H:i') : null, 'status' => $row->current_status,
            ]);
    }

    private function portfolios()
    {
        return DB::table('torprs as t')->selectRaw('TRIM(t.portofolio) AS portofolio, COUNT(*) AS total_pr,
            SUM(COALESCE(t.jumlah_pr, 0)) AS total_harga, AVG(COALESCE(t.jumlah_pr, 0)) AS rata_harga')
            ->whereNotNull('t.portofolio')->whereRaw("TRIM(t.portofolio) <> ''")->groupByRaw('TRIM(t.portofolio)')
            ->orderByDesc('total_pr')->orderByDesc('total_harga')->orderBy('portofolio')->limit(6)->get()->map(fn ($row) => (object) [
                'portofolio' => $row->portofolio, 'total_pr' => (int) $row->total_pr, 'total_ppbj' => (int) $row->total_pr,
                'total_harga' => (float) $row->total_harga, 'rata_harga' => (float) $row->rata_harga,
            ]);
    }

    private function forgetDashboard(): void
    {
        foreach (array_keys(self::CACHE_TTLS) as $segment) {
            Cache::forget($this->key($segment));
        }
    }

    public function refreshCache(Request $request)
    {
        $this->ensureSuperadminOperasional($request, 'refresh');
        $this->forgetDashboard();
        $response = $this->getData();
        if ($response->getStatusCode() !== 200) {
            return $response;
        }

        return response()->json(['success' => true, 'message' => 'Cache dashboard berhasil diperbarui.'])->header('Cache-Control', 'private, no-store');
    }

    public function clearCache(Request $request)
    {
        $this->ensureSuperadminOperasional($request, 'clear');
        $this->forgetDashboard();

        return response()->json(['success' => true, 'message' => 'Cache dashboard berhasil dibersihkan.'])->header('Cache-Control', 'private, no-store');
    }

    private function ensureSuperadminOperasional(Request $request, string $action): void
    {
        $user = $request->user();
        if ($user && $user->role === 'superadmin' && $user->department === 'operasional') {
            return;
        }
        Log::warning('Unauthorized operational dashboard cache attempt', ['user_id' => $user?->id, 'action' => $action]);
        abort(403, 'Hanya Superadmin Operasional yang dapat mengelola cache dashboard operasional.');
    }
}
