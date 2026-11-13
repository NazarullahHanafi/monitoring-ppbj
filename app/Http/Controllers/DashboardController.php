<?php

namespace App\Http\Controllers;

use App\Support\DashboardWorkloadFilters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class DashboardController extends Controller
{
    private const CACHE_STATS = 300;   // 5 menit

    private const CACHE_CHARTS = 600;   // 10 menit

    private const CACHE_TOP_DATA = 1800;  // 30 menit

    private const CACHE_ACTIVITIES = 60;    // 1 menit

    private const CACHE_WORKLOAD = 60;    // 1 menit — pendek karena filter ad-hoc

    public function index(Request $request)
    {
        $filters = DashboardWorkloadFilters::fromRequest($request);
        $cacheVersion = config('app.cache_version', 'v1');
        $generation = Cache::get('dashboard_buyer_workload_generation', 'initial');
        $identity = hash('sha256', json_encode([$cacheVersion, $generation, $filters]));

        return view('dashboard.indexumum', [
            'stats' => $this->cachedSegment('stats'),
            'slaDistribution' => $this->cachedSegment('sla'),
            'topBuyers' => $this->cachedSegment('buyers'),
            'topPortofolios' => $this->cachedSegment('portfolios'),
            'topPenyedias' => $this->cachedSegment('penyedias'),
            'recentActivities' => $this->cachedSegment('activities'),
            'monthlyDistribution' => $this->cachedSegment('monthly'),
            'buyerWorkload' => Cache::remember("dashboard_buyer_workload_v2_{$identity}", self::CACHE_WORKLOAD,
                fn () => $this->getBuyerWorkload($filters)),
        ]);
    }

    private function getStats(): array
    {
        try {
            $stats = DB::table('ppbj')
                ->selectRaw("
                    COUNT(*) as total,

                    -- ACTIVE = semua yang bukan CANCELLED
                    SUM(CASE WHEN status != 'CANCELLED' OR status IS NULL THEN 1 ELSE 0 END) as active,

                    -- CANCELLED
                    SUM(CASE WHEN status = 'CANCELLED' THEN 1 ELSE 0 END) as cancelled,

                    -- LENGKAP = progres 100% + no_invoice diisi + bukan CANCELLED
                    SUM(CASE
                        WHEN (status != 'CANCELLED' OR status IS NULL)
                             AND progres = 100
                             AND no_invoice IS NOT NULL
                             AND no_invoice != ''
                        THEN 1 ELSE 0
                    END) as lengkap,

                    -- ON TRACK
                    SUM(CASE
                        WHEN (status != 'CANCELLED' OR status IS NULL)
                             AND NOT (progres = 100 AND no_invoice IS NOT NULL AND no_invoice != '')
                             AND sisa_target_sla > 2
                        THEN 1 ELSE 0
                    END) as on_track,

                    -- WARNING
                    SUM(CASE
                        WHEN (status != 'CANCELLED' OR status IS NULL)
                             AND NOT (progres = 100 AND no_invoice IS NOT NULL AND no_invoice != '')
                             AND sisa_target_sla BETWEEN 1 AND 2
                        THEN 1 ELSE 0
                    END) as warning,

                    -- OVERDUE
                    SUM(CASE
                        WHEN (status != 'CANCELLED' OR status IS NULL)
                             AND NOT (progres = 100 AND no_invoice IS NOT NULL AND no_invoice != '')
                             AND sisa_target_sla <= 0
                        THEN 1 ELSE 0
                    END) as overdue,

                    ROUND(AVG(CASE WHEN status != 'CANCELLED' OR status IS NULL THEN progres END), 1) as avg_progress,
                    SUM(total_sebelum_ppn) as total_value
                ")
                ->first();

            return [
                'total' => (int) ($stats->total ?? 0),
                'active' => (int) ($stats->active ?? 0),
                'cancelled' => (int) ($stats->cancelled ?? 0),
                'lengkap' => (int) ($stats->lengkap ?? 0),
                'on_track' => (int) ($stats->on_track ?? 0),
                'warning' => (int) ($stats->warning ?? 0),
                'overdue' => (int) ($stats->overdue ?? 0),
                'avg_progress' => (float) ($stats->avg_progress ?? 0),
                'total_value' => (float) ($stats->total_value ?? 0),
            ];

        } catch (\Exception $e) {
            Log::error('Dashboard getStats error: '.$e->getMessage());

            return $this->getEmptyStats();
        }
    }

    // ===================================================
    // BUYER WORKLOAD — dengan filter periode
    // ===================================================
    private function getBuyerWorkload(array $filters): array
    {
        try {
            $filterMode = $filters['mode'];
            $query = DB::table('ppbj')
                ->selectRaw("
                    buyer,

                    SUM(CASE WHEN status != 'CANCELLED' OR status IS NULL THEN 1 ELSE 0 END)
                        as total_aktif,

                    SUM(CASE
                        WHEN (status != 'CANCELLED' OR status IS NULL)
                             AND progres = 100
                             AND no_invoice IS NOT NULL AND no_invoice != ''
                        THEN 1 ELSE 0
                    END) as lengkap,

                    SUM(CASE
                        WHEN (status != 'CANCELLED' OR status IS NULL)
                             AND NOT (progres = 100 AND no_invoice IS NOT NULL AND no_invoice != '')
                             AND sisa_target_sla > 2
                        THEN 1 ELSE 0
                    END) as on_track,

                    SUM(CASE
                        WHEN (status != 'CANCELLED' OR status IS NULL)
                             AND NOT (progres = 100 AND no_invoice IS NOT NULL AND no_invoice != '')
                             AND sisa_target_sla BETWEEN 1 AND 2
                        THEN 1 ELSE 0
                    END) as warning,

                    SUM(CASE
                        WHEN (status != 'CANCELLED' OR status IS NULL)
                             AND NOT (progres = 100 AND no_invoice IS NOT NULL AND no_invoice != '')
                             AND sisa_target_sla <= 0
                        THEN 1 ELSE 0
                    END) as overdue,

                    ROUND(AVG(CASE
                        WHEN status != 'CANCELLED' OR status IS NULL
                        THEN progres
                    END), 1) as avg_progress,

                    SUM(CASE
                        WHEN status != 'CANCELLED' OR status IS NULL
                        THEN COALESCE(total_sebelum_ppn, 0)
                        ELSE 0
                    END) as total_nilai,

                    SUM(CASE
                        WHEN status != 'CANCELLED' OR status IS NULL
                        THEN COALESCE(nilai_sp_spk, 0)
                        ELSE 0
                    END) as total_realisasi
                ")
                ->whereNotNull('buyer')
                ->where('buyer', '!=', '');

            // ── Terapkan filter tanggal pada tgl_ppbj ───────────────
            if ($filters['from'] !== null) {
                $query->where('tgl_ppbj', '>=', $filters['from']);
            }
            if ($filters['until'] !== null) {
                $query->where('tgl_ppbj', '<', $filters['until']);
            }

            $rows = $query
                ->groupBy('buyer')
                ->orderByRaw('overdue DESC, warning DESC, total_aktif DESC')
                ->get();

            $maxAktif = $rows->max('total_aktif') ?: 1;

            return [
                'buyers' => $rows->map(function ($row) use ($maxAktif) {
                    $totalAktif = (int) $row->total_aktif;
                    $totalNilai = (float) ($row->total_nilai ?? 0);
                    $totalRealisasi = (float) ($row->total_realisasi ?? 0);
                    $efisiensi = $totalNilai > 0 ? $totalNilai - $totalRealisasi : 0;
                    $efisiensiPct = $totalNilai > 0 ? round(($efisiensi / $totalNilai) * 100, 1) : 0;

                    $riskLevel = match (true) {
                        (int) $row->overdue > 0 => 'high',
                        (int) $row->warning > 0 => 'medium',
                        default => 'low',
                    };

                    return [
                        'buyer' => $row->buyer,
                        'total_aktif' => $totalAktif,
                        'on_track' => (int) $row->on_track,
                        'warning' => (int) $row->warning,
                        'overdue' => (int) $row->overdue,
                        'lengkap' => (int) $row->lengkap,
                        'avg_progress' => (float) ($row->avg_progress ?? 0),
                        'total_nilai' => $totalNilai,
                        'total_realisasi' => $totalRealisasi,
                        'efisiensi' => $efisiensi,
                        'efisiensi_pct' => $efisiensiPct,
                        'bar_pct' => $maxAktif > 0 ? round(($totalAktif / $maxAktif) * 100) : 0,
                        'risk_level' => $riskLevel,
                    ];
                })->values()->toArray(),
                'max_aktif' => (int) $maxAktif,
                'total_buyers' => $rows->count(),
                'filter_mode' => $filterMode,
            ];

        } catch (\Exception $e) {
            Log::error('Dashboard getBuyerWorkload error: '.$e->getMessage());

            return ['buyers' => [], 'max_aktif' => 0, 'total_buyers' => 0, 'filter_mode' => 'all'];
        }
    }

    // ===================================================
    // SLA DISTRIBUTION — untuk pie chart
    // ===================================================
    private function getSlaDistribution(): array
    {
        try {
            $stats = DB::table('ppbj')
                ->selectRaw("
                    SUM(CASE
                        WHEN (status != 'CANCELLED' OR status IS NULL)
                             AND NOT (progres = 100 AND no_invoice IS NOT NULL AND no_invoice != '')
                             AND sisa_target_sla > 2
                        THEN 1 ELSE 0
                    END) as on_track,

                    SUM(CASE
                        WHEN (status != 'CANCELLED' OR status IS NULL)
                             AND NOT (progres = 100 AND no_invoice IS NOT NULL AND no_invoice != '')
                             AND sisa_target_sla BETWEEN 1 AND 2
                        THEN 1 ELSE 0
                    END) as warning,

                    SUM(CASE
                        WHEN (status != 'CANCELLED' OR status IS NULL)
                             AND NOT (progres = 100 AND no_invoice IS NOT NULL AND no_invoice != '')
                             AND sisa_target_sla <= 0
                        THEN 1 ELSE 0
                    END) as overdue,

                    SUM(CASE
                        WHEN (status != 'CANCELLED' OR status IS NULL)
                             AND progres = 100
                             AND no_invoice IS NOT NULL
                             AND no_invoice != ''
                        THEN 1 ELSE 0
                    END) as lengkap,

                    SUM(CASE WHEN status = 'CANCELLED' THEN 1 ELSE 0 END) as cancelled
                ")
                ->first();

            return [
                'labels' => ['ON TRACK', 'WARNING', 'OVERDUE', 'LENGKAP', 'CANCELLED'],
                'values' => [
                    (int) ($stats->on_track ?? 0),
                    (int) ($stats->warning ?? 0),
                    (int) ($stats->overdue ?? 0),
                    (int) ($stats->lengkap ?? 0),
                    (int) ($stats->cancelled ?? 0),
                ],
                'colors' => [
                    '#10B981', // green  — ON TRACK
                    '#F59E0B', // amber  — WARNING
                    '#EF4444', // red    — OVERDUE
                    '#3B82F6', // blue   — LENGKAP
                    '#6B7280', // gray   — CANCELLED
                ],
            ];

        } catch (\Exception $e) {
            Log::error('Dashboard getSlaDistribution error: '.$e->getMessage());

            return ['labels' => [], 'values' => [], 'colors' => []];
        }
    }

    // ===================================================
    // TOP 5 BUYERS
    // ===================================================
    private function getTopBuyers()
    {
        try {
            return DB::table('ppbj')
                ->select('buyer', DB::raw('COUNT(*) as total'))
                ->whereNotNull('buyer')
                ->where('buyer', '!=', '')
                ->where(fn ($q) => $q->where('status', '!=', 'CANCELLED')->orWhereNull('status'))
                ->groupBy('buyer')
                ->orderByDesc('total')
                ->limit(5)
                ->get()
                ->map(fn ($i) => (object) ['buyer' => $i->buyer, 'total' => (int) $i->total]);

        } catch (\Exception $e) {
            Log::error('Dashboard getTopBuyers error: '.$e->getMessage());

            return collect();
        }
    }

    // ===================================================
    // TOP 5 PORTOFOLIO
    // ===================================================
    private function getTopPortofolios()
    {
        try {
            return DB::table('ppbj')
                ->select('portofolio', DB::raw('COUNT(*) as total'))
                ->whereNotNull('portofolio')
                ->where('portofolio', '!=', '')
                ->where(fn ($q) => $q->where('status', '!=', 'CANCELLED')->orWhereNull('status'))
                ->groupBy('portofolio')
                ->orderByDesc('total')
                ->limit(5)
                ->get()
                ->map(fn ($i) => (object) ['portofolio' => $i->portofolio, 'total' => (int) $i->total]);

        } catch (\Exception $e) {
            Log::error('Dashboard getTopPortofolios error: '.$e->getMessage());

            return collect();
        }
    }

    // ===================================================
    // TOP 5 PENYEDIA EKSTERNAL
    // ===================================================
    private function getTopPenyedia()
    {
        try {
            return DB::table('ppbj')
                ->select('penyedia_eksternal', DB::raw('COUNT(*) as total'))
                ->whereNotNull('penyedia_eksternal')
                ->where('penyedia_eksternal', '!=', '')
                ->where(fn ($q) => $q->where('status', '!=', 'CANCELLED')->orWhereNull('status'))
                ->groupBy('penyedia_eksternal')
                ->orderByDesc('total')
                ->limit(5)
                ->get()
                ->map(fn ($i) => (object) ['penyedia_eksternal' => $i->penyedia_eksternal, 'total' => (int) $i->total]);

        } catch (\Exception $e) {
            Log::error('Dashboard getTopPenyedia error: '.$e->getMessage());

            return collect();
        }
    }

    // ===================================================
    // RECENT ACTIVITIES — 5 terakhir diupdate
    // ===================================================
    private function getRecentActivities()
    {
        try {
            return DB::table('ppbj')
                ->select([
                    'id', 'ppbj_no', 'uraian', 'status_sla',
                    'status', 'progres', 'no_invoice',
                    'buyer', 'portofolio', 'updated_at',
                ])
                ->orderByDesc('updated_at')
                ->limit(5)
                ->get()
                ->map(function ($item) {
                    $isCancelled = strtoupper($item->status ?? 'ACTIVE') === 'CANCELLED';
                    $isLengkap = ! $isCancelled
                        && (int) $item->progres === 100
                        && ! empty($item->no_invoice);

                    $displayStatus = $isCancelled ? 'CANCELLED'
                        : ($isLengkap ? 'LENGKAP'
                            : ($item->status_sla ?? 'ON TRACK'));

                    return (object) [
                        'id' => $item->id,
                        'ppbj_no' => $item->ppbj_no,
                        'uraian' => $item->uraian,
                        'status_sla' => $displayStatus,
                        'status' => $item->status ?? 'ACTIVE',
                        'progres' => (int) $item->progres,
                        'no_invoice' => $item->no_invoice,
                        'buyer' => $item->buyer,
                        'portofolio' => $item->portofolio,
                        'updated_at' => $item->updated_at,
                    ];
                });

        } catch (\Exception $e) {
            Log::error('Dashboard getRecentActivities error: '.$e->getMessage());

            return collect();
        }
    }

    // ===================================================
    // MONTHLY DISTRIBUTION — 6 bulan terakhir
    // ===================================================
    private function getMonthlyDistribution(): array
    {
        try {
            // Anchor at day one before subtracting months (e.g. March 31 -> February).
            $currentMonth = now()->startOfMonth();
            $sixMonthsAgo = $currentMonth->copy()->subMonths(5);
            $monthExpression = DB::connection()->getDriverName() === 'sqlite'
                ? "strftime('%Y-%m', created_at)"
                : "DATE_FORMAT(created_at, '%Y-%m')";

            $data = DB::table('ppbj')
                ->selectRaw($monthExpression.' as month, COUNT(*) as count')
                ->where('created_at', '>=', $sixMonthsAgo->toDateString())
                ->where('created_at', '<', $currentMonth->copy()->addMonth()->toDateString())
                ->where(fn ($q) => $q->where('status', '!=', 'CANCELLED')->orWhereNull('status'))
                ->groupBy('month')
                ->orderBy('month')
                ->get()
                ->keyBy('month');

            $months = [];
            $counts = [];

            for ($i = 5; $i >= 0; $i--) {
                $date = $currentMonth->copy()->subMonths($i);
                $monthKey = $date->format('Y-m');
                $months[] = $date->locale('id')->translatedFormat('M Y');
                $counts[] = (int) ($data->get($monthKey)->count ?? 0);
            }

            return ['labels' => $months, 'values' => $counts];

        } catch (\Exception $e) {
            Log::error('Dashboard getMonthlyDistribution error: '.$e->getMessage());

            return ['labels' => [], 'values' => []];
        }
    }

    // ===================================================
    // CLEAR CACHE — dipanggil setelah store/update/cancel
    // ===================================================
    public static function clearCache(): void
    {
        CommandCenterController::clearCache();

        $cacheVersion = config('app.cache_version', 'v1');

        // ── Static keys ────────────────────────────────────────
        $keys = [
            "dashboard_stats_{$cacheVersion}",
            "dashboard_sla_{$cacheVersion}",
            "dashboard_top_buyers_{$cacheVersion}",
            "dashboard_top_portfolios_{$cacheVersion}",
            "dashboard_top_penyedias_{$cacheVersion}",
            "dashboard_recent_activities_{$cacheVersion}",
            "dashboard_monthly_{$cacheVersion}",

            // Master data
            'master_portofolios',
            'master_buyers',
            'master_metode_pengadaan',
            'master_penyedia_eksternal',

            // Legacy
            'dashboard_data_global',
            'dashboard_data_umum',
        ];

        foreach ($keys as $key) {
            Cache::forget($key);
        }

        // One write invalidates all filters; old entries expire in 60 seconds.
        Cache::forever('dashboard_buyer_workload_generation', (string) Str::uuid());

        Log::info('Dashboard & master cache cleared');
    }

    // ===================================================
    // REFRESH CACHE — via tombol di UI
    // ===================================================
    public function refreshCache(Request $request)
    {
        $this->ensureSuperadminUmum($request);

        self::clearCache();

        return response()->json(['message' => 'Cache berhasil di-refresh']);
    }

    private function ensureSuperadminUmum(Request $request): void
    {
        $user = $request->user();

        if ($user && $user->role === 'superadmin' && $user->department === 'umum') {
            return;
        }

        Log::warning('Unauthorized dashboard cache refresh attempt', [
            'user_id' => $user?->id,
            'email' => $user?->email,
            'role' => $user?->role,
            'department' => $user?->department,
            'ip' => $request->ip(),
        ]);

        abort(403, 'Hanya Superadmin Umum yang dapat refresh cache dashboard.');
    }

    // ===================================================
    // GET DATA — AJAX endpoint per tipe
    // ===================================================
    public function getData(Request $request)
    {
        $validated = $request->validate([
            'type' => ['sometimes', 'required', 'string', Rule::in(['stats', 'sla', 'buyers', 'portfolios', 'penyedias', 'activities', 'monthly'])],
        ]);

        return response()->json($this->cachedSegment($validated['type'] ?? 'stats'))
            ->header('Cache-Control', 'private, no-store');
    }

    private function cachedSegment(string $type): mixed
    {
        [$segment, $ttl, $loader] = match ($type) {
            'stats' => ['stats', self::CACHE_STATS, fn () => $this->getStats()],
            'sla' => ['sla', self::CACHE_CHARTS, fn () => $this->getSlaDistribution()],
            'buyers' => ['top_buyers', self::CACHE_TOP_DATA, fn () => $this->getTopBuyers()],
            'portfolios' => ['top_portfolios', self::CACHE_TOP_DATA, fn () => $this->getTopPortofolios()],
            'penyedias' => ['top_penyedias', self::CACHE_TOP_DATA, fn () => $this->getTopPenyedia()],
            'activities' => ['recent_activities', self::CACHE_ACTIVITIES, fn () => $this->getRecentActivities()],
            'monthly' => ['monthly', self::CACHE_CHARTS, fn () => $this->getMonthlyDistribution()],
        };
        $version = config('app.cache_version', 'v1');

        return Cache::remember("dashboard_{$segment}_{$version}", $ttl, $loader);
    }

    private function getEmptyStats(): array
    {
        return [
            'total' => 0,
            'active' => 0,
            'cancelled' => 0,
            'lengkap' => 0,
            'on_track' => 0,
            'warning' => 0,
            'overdue' => 0,
            'avg_progress' => 0,
            'total_value' => 0,
        ];
    }
}
