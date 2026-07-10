<?php

namespace App\Http\Controllers;

use App\Models\Torpr;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Throwable;

class OperasionalDashboardController extends Controller
{
    // Cache TTL constants
    private const CACHE_STATS = 300;        // 5 minutes
    private const CACHE_CHARTS = 600;       // 10 minutes
    private const CACHE_LATEST = 60;        // 1 minute
    private const CACHE_PORTOFOLIO = 300;    // 5 minutes
    
    /**
     * ✅ OPTIMIZED: Dashboard for handling millions of TORPR records
     * Uses Query Builder, caching, and single aggregation queries
     */
    public function index(Request $request)
    {
        try {
            // ✅ Get all statistics in ONE query using CASE statements
            $stats = $this->getStatistics();
            
            // ✅ Get KPI metrics (cached)
            $kpi = $this->getKpiMetrics();
            
            // ✅ Get monthly chart data (cached)
            $chartData = $this->getMonthlyChartData();
            
            // ✅ Get latest rows (cached, minimal data)
            $latestRows = $this->getLatestRows();

            // ✅ Get top portofolio dari tabel TORPR
            $topPortofolios = $this->getTopPortofoliosSafe();

            return view('operasional.dashboard', [
                'total' => $stats->total ?? 0,
                'pending' => $stats->pending ?? 0,
                'approved' => $stats->approved ?? 0,
                'rejected' => $stats->rejected ?? 0,
                'draft' => $stats->draft ?? 0,
                'avgPendingHours' => $kpi['avgPendingHours'] ?? 0,
                
                'monthlyLabels' => $chartData['labels'] ?? [],
                'monthlySeries' => $chartData['series'] ?? [],
                
                'latestRows' => $latestRows,
                'topPortofolios' => $topPortofolios,
            ]);
            
        } catch (\Exception $e) {
            Log::error('Operasional Dashboard Error: ' . $e->getMessage());
            
            // Return safe defaults on error
            return view('operasional.dashboard', [
                'total' => 0,
                'pending' => 0,
                'approved' => 0,
                'rejected' => 0,
                'draft' => 0,
                'avgPendingHours' => 0,
                'monthlyLabels' => [],
                'monthlySeries' => [],
                'latestRows' => collect([]),
                'topPortofolios' => collect([]),
            ]);
        }
    }

    /**
     * ✅ OPTIMIZED: Get all statistics in a SINGLE query
     * Handles millions of records efficiently
     */
    private function getStatistics()
    {
        $cacheKey = 'ops_dashboard_stats_v' . config('app.cache_version', '1');
        
        return Cache::remember($cacheKey, self::CACHE_STATS, function () {
            // Single query with subqueries and CASE statements
            return DB::table('torprs as t')
                ->selectRaw("
                    COUNT(*) as total,
                    
                    -- Pending: has PENDING approval
                    SUM(CASE 
                        WHEN EXISTS (
                            SELECT 1 FROM pr_receipt_approvals pra 
                            WHERE pra.torpr_id = t.id 
                            AND pra.status = 'PENDING'
                            LIMIT 1
                        ) THEN 1 
                        ELSE 0 
                    END) as pending,
                    
                    -- Rejected: has REJECTED approval
                    SUM(CASE 
                        WHEN EXISTS (
                            SELECT 1 FROM pr_receipt_approvals pra 
                            WHERE pra.torpr_id = t.id 
                            AND pra.status = 'REJECTED'
                            LIMIT 1
                        ) THEN 1 
                        ELSE 0 
                    END) as rejected,
                    
                    -- Approved: received_at is not null OR has APPROVED approval
                    SUM(CASE 
                        WHEN t.received_at IS NOT NULL THEN 1
                        WHEN EXISTS (
                            SELECT 1 FROM pr_receipt_approvals pra 
                            WHERE pra.torpr_id = t.id 
                            AND pra.status = 'APPROVED'
                            LIMIT 1
                        ) THEN 1
                        ELSE 0 
                    END) as approved,
                    
                    -- Draft: no approvals AND received_at is null
                    SUM(CASE 
                        WHEN t.received_at IS NULL 
                        AND NOT EXISTS (
                            SELECT 1 FROM pr_receipt_approvals pra 
                            WHERE pra.torpr_id = t.id
                            LIMIT 1
                        ) THEN 1 
                        ELSE 0 
                    END) as draft
                ")
                ->first();
        });
    }

    /**
     * ✅ OPTIMIZED: Get KPI metrics with efficient queries
     */
    private function getKpiMetrics()
    {
        $cacheKey = 'ops_dashboard_kpi_v' . config('app.cache_version', '1');
        
        return Cache::remember($cacheKey, self::CACHE_STATS, function () {
            // Average pending hours using efficient join
            $avgPendingHours = DB::table('torprs as t')
                ->join('pr_receipt_approvals as pra', function($join) {
                    $join->on('pra.torpr_id', '=', 't.id')
                         ->where('pra.status', '=', 'PENDING');
                })
                ->selectRaw('AVG(TIMESTAMPDIFF(HOUR, pra.requested_at, NOW())) as avg_hours')
                ->value('avg_hours');

            return [
                'avgPendingHours' => round((float) $avgPendingHours, 1),
            ];
        });
    }

    /**
     * ✅ OPTIMIZED: Get monthly chart data (last 6 months)
     * Uses Query Builder with DATE_FORMAT for efficiency
     */
    private function getMonthlyChartData()
    {
        $cacheKey = 'ops_dashboard_chart_v' . config('app.cache_version', '1');
        
        return Cache::remember($cacheKey, self::CACHE_CHARTS, function () {
            $start = Carbon::now()->startOfMonth()->subMonths(5);
            
            // Build expected months
            $months = [];
            for ($i = 0; $i < 6; $i++) {
                $months[] = $start->copy()->addMonths($i);
            }

            // Single query to get monthly counts
            $monthlyCountsRaw = DB::table('torprs')
                ->selectRaw("DATE_FORMAT(tanggal_pr, '%Y-%m') as ym, COUNT(*) as c")
                ->whereNotNull('tanggal_pr')
                ->where('tanggal_pr', '>=', $start->toDateTimeString())
                ->groupBy(DB::raw("DATE_FORMAT(tanggal_pr, '%Y-%m')"))
                ->pluck('c', 'ym')
                ->toArray();

            // Fill in missing months with 0
            $labels = [];
            $series = [];
            
            foreach ($months as $m) {
                $ym = $m->format('Y-m');
                $labels[] = $m->format('M Y');
                $series[] = (int) ($monthlyCountsRaw[$ym] ?? 0);
            }

            return [
                'labels' => $labels,
                'series' => $series,
            ];
        });
    }

    /**
     * ✅ OPTIMIZED: Get latest TORPR rows
     * Uses Query Builder with minimal columns and efficient join
     */
    private function getLatestRows()
    {
        $cacheKey = 'ops_dashboard_latest_v' . config('app.cache_version', '1');
        
        return Cache::remember($cacheKey, self::CACHE_LATEST, function () {
            // Get latest 8 torprs with their latest approval status
            $rows = DB::table('torprs as t')
                ->leftJoin('pr_receipt_approvals as pra', function($join) {
                    $join->on('pra.torpr_id', '=', 't.id')
                         ->whereRaw('pra.id = (
                             SELECT MAX(id) FROM pr_receipt_approvals 
                             WHERE torpr_id = t.id
                         )');
                })
                ->select([
                    't.id',
                    't.nomor_pr',
                    't.tujuan_pengadaan',
                    't.tanggal_pr',
                    't.received_at',
                    'pra.status as approval_status'
                ])
                ->orderBy('t.id', 'DESC')
                ->limit(3)
                ->get();

            // Map to required format
            return $rows->map(function($r) {
                // Determine status logic
                $status = 'DRAFT';
                
                if ($r->approval_status) {
                    $status = $r->approval_status;
                } elseif ($r->received_at) {
                    $status = 'APPROVED';
                }

                return [
                    'id' => $r->id,
                    'nomor_pr' => $r->nomor_pr,
                    'tujuan_pengadaan' => $r->tujuan_pengadaan,
                    'tanggal_pr' => $r->tanggal_pr ? Carbon::parse($r->tanggal_pr)->format('Y-m-d H:i') : null,
                    'status' => $status,
                ];
            });
        });
    }


    /**
     * ✅ SAFE WRAPPER: Top Portofolio tidak boleh membuat seluruh dashboard menjadi 0.
     */
    private function getTopPortofoliosSafe()
    {
        try {
            return $this->getTopPortofolios();
        } catch (Throwable $e) {
            Log::error('Top Portofolio TORPR Dashboard Error: ' . $e->getMessage());

            return collect([]);
        }
    }

    /**
     * ✅ TOP PORTOFOLIO TORPR ONLY
     *
     * Fokus data hanya dari tabel torprs:
     * - Portofolio: torprs.portofolio
     * - Jumlah PR: COUNT(torprs.id)
     * - Total Harga PR: SUM(torprs.jumlah_pr)
     * - Rata-rata Harga PR: AVG(torprs.jumlah_pr)
     *
     * Tidak mengambil portofolio dari tabel ppbj.
     */
    private function getTopPortofolios()
    {
        $cacheKey = 'ops_dashboard_top_portofolio_torprs_only_final_v1_' . config('app.cache_version', '1');

        return Cache::remember($cacheKey, self::CACHE_PORTOFOLIO, function () {
            if (
                !Schema::hasTable('torprs') ||
                !Schema::hasColumn('torprs', 'portofolio')
            ) {
                return collect([]);
            }

            $hargaExpr = Schema::hasColumn('torprs', 'jumlah_pr')
                ? "COALESCE(t.jumlah_pr, 0)"
                : "0";

            return DB::table('torprs as t')
                ->selectRaw("
                    TRIM(t.portofolio) as portofolio,
                    COUNT(t.id) as total_pr,
                    COUNT(t.id) as total_ppbj,
                    SUM({$hargaExpr}) as total_harga,
                    AVG({$hargaExpr}) as rata_harga
                ")
                ->whereNotNull('t.portofolio')
                ->whereRaw("NULLIF(TRIM(t.portofolio), '') IS NOT NULL")
                ->groupByRaw("TRIM(t.portofolio)")
                ->orderByDesc('total_pr')
                ->orderByDesc('total_harga')
                ->limit(6)
                ->get()
                ->map(function ($row) {
                    return (object) [
                        'portofolio' => $row->portofolio,
                        'total_pr' => (int) ($row->total_pr ?? 0),

                        // Tetap disediakan agar tidak merusak struktur lama/AJAX,
                        // tetapi nilainya mengikuti total_pr karena sumber data sekarang hanya TORPR.
                        'total_ppbj' => (int) ($row->total_pr ?? 0),

                        'total_harga' => (float) ($row->total_harga ?? 0),
                        'rata_harga' => (float) ($row->rata_harga ?? 0),
                    ];
                });
        });
    }

    /**
     * ✅ NEW: Refresh cache endpoint (optional)
     * Can be called via AJAX or scheduled task
     */
    public function refreshCache(Request $request)
    {
        $this->ensureSuperadminOperasional($request, 'refresh');

        try {
            $version = config('app.cache_version', '1');
            
            Cache::forget('ops_dashboard_stats_v' . $version);
            Cache::forget('ops_dashboard_kpi_v' . $version);
            Cache::forget('ops_dashboard_chart_v' . $version);
            Cache::forget('ops_dashboard_latest_v' . $version);
            Cache::forget('ops_dashboard_top_portofolio_v' . $version);
            Cache::forget('ops_dashboard_top_portofolio_v2_' . $version);
            Cache::forget('ops_dashboard_top_portofolio_final_v2_' . $version);
            Cache::forget('ops_dashboard_top_portofolio_torprs_working_v1_' . $version);
            Cache::forget('ops_dashboard_top_portofolio_torprs_only_final_v1_' . $version);
            
            // Pre-warm cache
            $this->getStatistics();
            $this->getKpiMetrics();
            $this->getMonthlyChartData();
            $this->getLatestRows();
            $this->getTopPortofoliosSafe();
            
            return response()->json([
                'success' => true,
                'message' => 'Cache refreshed successfully'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Cache refresh error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to refresh cache'
            ], 500);
        }
    }

    /**
     * ✅ NEW: Get data for AJAX refresh (optional)
     * Returns JSON data without full page reload
     */
    public function getData()
    {
        try {
            $stats = $this->getStatistics();
            $kpi = $this->getKpiMetrics();
            $chartData = $this->getMonthlyChartData();
            $latestRows = $this->getLatestRows();
            $topPortofolios = $this->getTopPortofoliosSafe();

            return response()->json([
                'success' => true,
                'data' => [
                    'stats' => [
                        'total' => (int) ($stats->total ?? 0),
                        'pending' => (int) ($stats->pending ?? 0),
                        'approved' => (int) ($stats->approved ?? 0),
                        'rejected' => (int) ($stats->rejected ?? 0),
                        'draft' => (int) ($stats->draft ?? 0),
                    ],
                    'kpi' => $kpi,
                    'chart' => $chartData,
                    'latest' => $latestRows,
                    'topPortofolios' => $topPortofolios,
                ]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Get data error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to get data'
            ], 500);
        }
    }

    /**
     * ✅ NEW: Clear all dashboard cache
     */
    public function clearCache(Request $request)
    {
        $this->ensureSuperadminOperasional($request, 'clear');

        try {
            $version = config('app.cache_version', '1');
            
            foreach (['stats', 'kpi', 'chart', 'latest'] as $segment) {
                Cache::forget("ops_dashboard_{$segment}_v{$version}");
            }
            
            return response()->json([
                'success' => true,
                'message' => 'Cache cleared successfully'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Clear cache error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to clear cache'
            ], 500);
        }
    }

    private function ensureSuperadminOperasional(Request $request, string $action): void
    {
        $user = $request->user();

        if ($user && $user->role === 'superadmin' && $user->department === 'operasional') {
            return;
        }

        Log::warning('Unauthorized operational dashboard cache attempt', [
            'user_id' => $user?->id,
            'email' => $user?->email,
            'role' => $user?->role,
            'department' => $user?->department,
            'action' => $action,
            'ip' => $request->ip(),
        ]);

        abort(403, 'Hanya Superadmin Operasional yang dapat mengelola cache dashboard operasional.');
    }
}
