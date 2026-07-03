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
                ->limit(8)
                ->get()
            : collect();

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
}
