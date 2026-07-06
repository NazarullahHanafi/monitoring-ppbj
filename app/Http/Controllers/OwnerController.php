<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\ContactMessage;
use App\Models\Ppbj;
use App\Models\PrReceiptApproval;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\Torpr;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class OwnerController extends Controller
{
    public function index(Request $request)
    {
        $ownerEmails = config('app.owner_emails', []);
        $user = auth()->user();
        $auditFilters = $this->auditFilters($request);

        $stats = [
            'users' => User::count(),
            'database' => DB::connection()->getDatabaseName(),
            'environment' => app()->environment(),
            'debug' => config('app.debug') ? 'ON' : 'OFF',
            'owner_email' => $user->email,
            'owner_emails' => $ownerEmails,
            'role' => $user->role,
            'department' => $user->department,
            'backup_email' => config('app.owner_backup_email'),
            'backup_schedule' => 'Setiap Jumat, pukul 02:00 WIB',
            'ppbj' => $this->safeCount(Ppbj::class, 'ppbj'),
            'torpr' => $this->safeCount(Torpr::class, 'torprs'),
            'spph' => $this->safeCount(Spph::class, 'spphs'),
            'sp' => $this->safeCount(Sp::class, 'sps'),
            'pending_approvals' => Schema::hasTable('pr_receipt_approvals')
                ? PrReceiptApproval::where('status', 'PENDING')->count()
                : 0,
            'unread_contact_messages' => Schema::hasTable('contact_messages')
                ? ContactMessage::whereNull('read_at')->count()
                : 0,
        ];

        $userBreakdown = [
            'superadmin' => User::where('role', 'superadmin')->count(),
            'user' => User::where('role', 'user')->count(),
            'viewer' => User::where('role', 'viewer')->count(),
            'umum' => User::where('department', 'umum')->count(),
            'operasional' => User::where('department', 'operasional')->count(),
        ];

        $healthChecks = $this->healthChecks();

        $securityChecks = [
            [
                'label' => 'Debug production',
                'value' => $stats['debug'] === 'OFF' ? 'Aman' : 'Perlu dicek',
                'status' => $stats['debug'] === 'OFF' ? 'safe' : 'warning',
                'description' => 'APP_DEBUG sebaiknya OFF di server production.',
            ],
            [
                'label' => 'Owner access',
                'value' => in_array(strtolower($user->email), $ownerEmails, true) ? 'Aktif' : 'Tidak cocok',
                'status' => in_array(strtolower($user->email), $ownerEmails, true) ? 'safe' : 'warning',
                'description' => 'Menu ini dikunci memakai middleware owner dan daftar email rahasia.',
            ],
            [
                'label' => 'Read-only viewer',
                'value' => 'Aktif',
                'status' => 'safe',
                'description' => 'Akun viewer dibatasi agar tidak bisa mengubah data.',
            ],
            [
                'label' => 'Security headers',
                'value' => 'Aktif',
                'status' => 'safe',
                'description' => 'Header keamanan dipasang melalui middleware global.',
            ],
        ];

        $auditLogs = Schema::hasTable('activity_logs')
            ? $this->filteredAuditQuery($auditFilters)
                ->with('user:id,name,email')
                ->latest()
                ->limit(50)
                ->get()
            : collect();

        $auditSummary = $this->auditSummary();
        $auditFilterCount = Schema::hasTable('activity_logs')
            ? $this->filteredAuditQuery($auditFilters)->count()
            : 0;
        $auditActions = $this->auditActions();
        $auditUsers = User::query()
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->get();
        $userActivityInsights = $this->userActivityInsights();
        $systemEvents = $this->latestSystemEvents();
        $backupFiles = $this->latestBackupFiles();

        $recommendations = [
            'Release Notes Internal' => 'Mencatat perubahan fitur setiap deploy agar mudah dipresentasikan saat audit/lomba.',
            'Owner Notes' => 'Catatan pribadi Nazar untuk ide fitur, bug, dan prioritas pengembangan.',
            'Export Audit Evidence' => 'Unduh bukti aktivitas sistem untuk kebutuhan pemeriksaan internal.',
            'Integrasi Alert WhatsApp/Email' => 'Notifikasi otomatis jika health check gagal atau approval menumpuk.',
            'Backup Restore Drill' => 'Simulasi restore berkala supaya backup bukan hanya tersimpan, tapi terbukti bisa dipakai.',
        ];

        return view('owner.index', compact(
            'stats',
            'userBreakdown',
            'healthChecks',
            'securityChecks',
            'auditLogs',
            'auditSummary',
            'auditFilterCount',
            'auditActions',
            'auditUsers',
            'auditFilters',
            'userActivityInsights',
            'systemEvents',
            'backupFiles',
            'recommendations'
        ));
    }

    public function exportAudit(Request $request)
    {
        $filters = $this->auditFilters($request);
        $fileName = 'owner-audit-log-'.now()->format('Ymd-His').'.csv';

        return response()->streamDownload(function () use ($filters) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, [
                'Waktu',
                'User',
                'Email',
                'Action',
                'Deskripsi',
                'Model',
                'Model ID',
            ]);

            if (Schema::hasTable('activity_logs')) {
                $this->filteredAuditQuery($filters)
                    ->with('user:id,name,email')
                    ->latest()
                    ->limit(5000)
                    ->cursor()
                    ->each(function (ActivityLog $log) use ($handle) {
                        fputcsv($handle, [
                            optional($log->created_at)->format('Y-m-d H:i:s'),
                            $log->user?->name ?? 'System',
                            $log->user?->email ?? '-',
                            $log->action,
                            $log->description,
                            class_basename($log->model_type),
                            $log->model_id,
                        ]);
                    });
            }

            fclose($handle);
        }, $fileName, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    private function healthChecks(): array
    {
        return [
            $this->checkDatabase(),
            $this->checkCache(),
            $this->checkStorage(),
            [
                'label' => 'Email backup',
                'value' => config('mail.default') === 'log' ? 'Log only' : 'Mailer aktif',
                'status' => config('mail.default') === 'log' ? 'warning' : 'safe',
                'description' => 'Backup otomatis dikirim ke '.config('app.owner_backup_email').'.',
            ],
            [
                'label' => 'Integrasi arsip',
                'value' => filled(config('services.pr_archive.base_url')) ? 'URL aktif' : 'Belum diset',
                'status' => filled(config('services.pr_archive.base_url')) ? 'safe' : 'warning',
                'description' => 'Digunakan untuk cek dokumen arsip berdasarkan nomor PR/PPBJ.',
            ],
            [
                'label' => 'Backup schedule',
                'value' => 'Jumat 02:00',
                'status' => 'safe',
                'description' => 'Laravel schedule sudah disiapkan. Pastikan cron cPanel menjalankan schedule:run tiap menit.',
            ],
        ];
    }

    private function checkDatabase(): array
    {
        try {
            DB::select('select 1');

            return [
                'label' => 'Database',
                'value' => 'Terhubung',
                'status' => 'safe',
                'description' => 'Koneksi database aplikasi berhasil diuji.',
            ];
        } catch (\Throwable $e) {
            return [
                'label' => 'Database',
                'value' => 'Gagal',
                'status' => 'danger',
                'description' => 'Database tidak dapat dihubungi: '.$e->getMessage(),
            ];
        }
    }

    private function checkCache(): array
    {
        try {
            $key = 'owner_health_check_'.auth()->id();
            Cache::put($key, 'ok', now()->addMinute());

            return [
                'label' => 'Cache',
                'value' => Cache::get($key) === 'ok' ? 'Aktif' : 'Tidak stabil',
                'status' => Cache::get($key) === 'ok' ? 'safe' : 'warning',
                'description' => 'Cache digunakan untuk mempercepat dashboard, badge, dan polling ringan.',
            ];
        } catch (\Throwable $e) {
            return [
                'label' => 'Cache',
                'value' => 'Gagal',
                'status' => 'danger',
                'description' => 'Cache gagal diuji: '.$e->getMessage(),
            ];
        }
    }

    private function checkStorage(): array
    {
        $path = storage_path('app');
        $freeBytes = @disk_free_space($path);
        $freeGb = $freeBytes ? round($freeBytes / 1024 / 1024 / 1024, 2).' GB' : 'Tidak terbaca';

        return [
            'label' => 'Storage',
            'value' => is_writable($path) ? 'Writable' : 'Tidak writable',
            'status' => is_writable($path) ? 'safe' : 'danger',
            'description' => 'Sisa ruang storage: '.$freeGb.'. Dipakai untuk cache file dan backup owner.',
        ];
    }

    private function safeCount(string $model, string $table): int
    {
        if (! Schema::hasTable($table)) {
            return 0;
        }

        return $model::query()->count();
    }

    private function auditSummary(): array
    {
        if (! Schema::hasTable('activity_logs')) {
            return [
                'total' => 0,
                'today' => 0,
                'this_week' => 0,
                'backup_sent' => 0,
                'last_activity' => 'Belum ada',
            ];
        }

        $lastActivity = ActivityLog::query()->latest()->first()?->created_at;

        return [
            'total' => ActivityLog::query()->count(),
            'today' => ActivityLog::query()->whereDate('created_at', today())->count(),
            'this_week' => ActivityLog::query()->where('created_at', '>=', now()->subDays(7))->count(),
            'backup_sent' => ActivityLog::query()->where('action', 'owner_backup_email_sent')->count(),
            'last_activity' => $lastActivity ? $lastActivity->format('d M Y H:i') : 'Belum ada',
        ];
    }

    private function auditFilters(Request $request): array
    {
        return [
            'q' => trim((string) $request->query('q', '')),
            'user_id' => $request->query('user_id'),
            'action' => trim((string) $request->query('action', '')),
            'date_from' => $request->query('date_from'),
            'date_to' => $request->query('date_to'),
        ];
    }

    private function filteredAuditQuery(array $filters)
    {
        $query = ActivityLog::query();

        if (filled($filters['user_id'] ?? null)) {
            $query->where('user_id', (int) $filters['user_id']);
        }

        if (filled($filters['action'] ?? null)) {
            $query->where('action', $filters['action']);
        }

        if (filled($filters['date_from'] ?? null)) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }

        if (filled($filters['date_to'] ?? null)) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
        }

        if (filled($filters['q'] ?? null)) {
            $keyword = $filters['q'];
            $query->where(function ($subQuery) use ($keyword) {
                $subQuery
                    ->where('action', 'like', "%{$keyword}%")
                    ->orWhere('description', 'like', "%{$keyword}%")
                    ->orWhere('model_type', 'like', "%{$keyword}%")
                    ->orWhereHas('user', function ($userQuery) use ($keyword) {
                        $userQuery
                            ->where('name', 'like', "%{$keyword}%")
                            ->orWhere('email', 'like', "%{$keyword}%");
                    });
            });
        }

        return $query;
    }

    private function auditActions()
    {
        if (! Schema::hasTable('activity_logs')) {
            return collect();
        }

        return ActivityLog::query()
            ->select('action')
            ->whereNotNull('action')
            ->distinct()
            ->orderBy('action')
            ->pluck('action');
    }

    private function userActivityInsights(): array
    {
        $hasLogs = Schema::hasTable('activity_logs');

        $topUsers = collect();
        $topActions = collect();
        $dailyTrend = collect(range(6, 0))
            ->map(function ($daysAgo) {
                $date = now()->subDays($daysAgo);

                return [
                    'label' => $date->format('d M'),
                    'count' => 0,
                ];
            });

        if ($hasLogs) {
            $topUserRows = ActivityLog::query()
                ->select('user_id', DB::raw('count(*) as total'), DB::raw('max(created_at) as last_seen'))
                ->where('created_at', '>=', now()->subDays(7))
                ->groupBy('user_id')
                ->orderByDesc('total')
                ->limit(5)
                ->get();

            $users = User::query()
                ->whereIn('id', $topUserRows->pluck('user_id')->filter())
                ->get()
                ->keyBy('id');

            $topUsers = $topUserRows->map(function ($row) use ($users) {
                $user = $row->user_id ? $users->get($row->user_id) : null;

                return [
                    'name' => $user?->name ?? 'System',
                    'email' => $user?->email ?? '-',
                    'total' => (int) $row->total,
                    'last_seen' => $row->last_seen ? date('d M H:i', strtotime($row->last_seen)) : '-',
                ];
            });

            $topActions = ActivityLog::query()
                ->select('action', DB::raw('count(*) as total'))
                ->where('created_at', '>=', now()->subDays(7))
                ->groupBy('action')
                ->orderByDesc('total')
                ->limit(5)
                ->get()
                ->map(fn ($row) => [
                    'action' => $row->action ?: '-',
                    'total' => (int) $row->total,
                ]);

            $dailyCounts = ActivityLog::query()
                ->select(DB::raw('DATE(created_at) as activity_date'), DB::raw('count(*) as total'))
                ->where('created_at', '>=', now()->subDays(6)->startOfDay())
                ->groupBy('activity_date')
                ->pluck('total', 'activity_date');

            $dailyTrend = collect(range(6, 0))
                ->map(function ($daysAgo) use ($dailyCounts) {
                    $date = now()->subDays($daysAgo);
                    $key = $date->toDateString();

                    return [
                        'label' => $date->format('d M'),
                        'count' => (int) ($dailyCounts[$key] ?? 0),
                    ];
                });
        }

        return [
            'active_today' => $hasLogs
                ? ActivityLog::query()->whereDate('created_at', today())->distinct('user_id')->count('user_id')
                : 0,
            'events_today' => $hasLogs
                ? ActivityLog::query()->whereDate('created_at', today())->count()
                : 0,
            'events_week' => $hasLogs
                ? ActivityLog::query()->where('created_at', '>=', now()->subDays(7))->count()
                : 0,
            'pending_approvals' => Schema::hasTable('pr_receipt_approvals')
                ? PrReceiptApproval::where('status', 'PENDING')->count()
                : 0,
            'module_totals' => [
                ['label' => 'PPBJ', 'total' => $this->safeCount(Ppbj::class, 'ppbj'), 'month' => $this->safePeriodCount('ppbj')],
                ['label' => 'TOR/PR', 'total' => $this->safeCount(Torpr::class, 'torprs'), 'month' => $this->safePeriodCount('torprs')],
                ['label' => 'SPPH', 'total' => $this->safeCount(Spph::class, 'spphs'), 'month' => $this->safePeriodCount('spphs')],
                ['label' => 'SP', 'total' => $this->safeCount(Sp::class, 'sps'), 'month' => $this->safePeriodCount('sps')],
            ],
            'top_users' => $topUsers,
            'top_actions' => $topActions,
            'daily_trend' => $dailyTrend,
            'max_daily' => max(1, (int) $dailyTrend->max('count')),
        ];
    }

    private function safePeriodCount(string $table): int
    {
        if (! Schema::hasTable($table) || ! Schema::hasColumn($table, 'created_at')) {
            return 0;
        }

        return DB::table($table)
            ->where('created_at', '>=', now()->startOfMonth())
            ->count();
    }

    private function latestSystemEvents(): array
    {
        $files = glob(storage_path('logs/*.log')) ?: [];

        usort($files, static fn ($a, $b) => filemtime($b) <=> filemtime($a));

        $events = [];

        foreach (array_slice($files, 0, 3) as $file) {
            foreach ($this->tailLines($file, 220) as $line) {
                if (! str_contains($line, '.ERROR:')
                    && ! str_contains($line, '.WARNING:')
                    && ! str_contains($line, '.CRITICAL:')
                    && ! str_contains($line, '.ALERT:')
                    && ! str_contains($line, '.EMERGENCY:')
                ) {
                    continue;
                }

                $events[] = $this->formatLogLine($line, basename($file));
            }
        }

        return array_slice(array_reverse(array_filter($events)), 0, 8);
    }

    private function tailLines(string $file, int $lineLimit): array
    {
        if (! is_readable($file)) {
            return [];
        }

        $size = filesize($file);
        $handle = fopen($file, 'rb');

        if (! $handle) {
            return [];
        }

        fseek($handle, max(0, $size - 200000));
        $content = stream_get_contents($handle) ?: '';
        fclose($handle);

        return array_slice(explode(PHP_EOL, $content), -$lineLimit);
    }

    private function formatLogLine(string $line, string $file): array
    {
        preg_match('/^\[(?<time>[^\]]+)\]\s+(?<env>[^.]+)\.(?<level>[^:]+):\s+(?<message>.*)$/', $line, $matches);

        return [
            'time' => $matches['time'] ?? '-',
            'level' => strtoupper($matches['level'] ?? 'LOG'),
            'message' => Str::limit($matches['message'] ?? $line, 160),
            'file' => $file,
        ];
    }

    private function latestBackupFiles(): array
    {
        $files = glob(storage_path('app/owner-backups/*.sql.gz')) ?: [];

        usort($files, static fn ($a, $b) => filemtime($b) <=> filemtime($a));

        return array_map(function ($file) {
            return [
                'name' => basename($file),
                'size' => $this->humanSize((int) filesize($file)),
                'created_at' => date('d M Y H:i', filemtime($file)),
            ];
        }, array_slice($files, 0, 5));
    }

    private function humanSize(int $bytes): string
    {
        if ($bytes >= 1024 * 1024) {
            return round($bytes / 1024 / 1024, 2).' MB';
        }

        return round($bytes / 1024, 2).' KB';
    }
}
