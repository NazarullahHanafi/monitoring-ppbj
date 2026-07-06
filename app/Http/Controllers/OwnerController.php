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
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class OwnerController extends Controller
{
    public function index()
    {
        $ownerEmails = config('app.owner_emails', []);
        $user = auth()->user();

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
            ? ActivityLog::query()
                ->with('user:id,name,email')
                ->latest()
                ->limit(20)
                ->get()
            : collect();

        $auditSummary = $this->auditSummary();
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
            'systemEvents',
            'backupFiles',
            'recommendations'
        ));
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
