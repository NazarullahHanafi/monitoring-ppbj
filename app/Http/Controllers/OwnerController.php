<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\Ppbj;
use App\Models\PrReceiptApproval;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\Torpr;
use App\Models\User;
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

        $recommendations = [
            'Audit Log Owner' => 'Melihat riwayat aktivitas penting seperti login, import, delete, approve, dan export.',
            'Health Check Sistem' => 'Memantau cache, database, queue, storage, dan status integrasi arsip.',
            'Release Notes Internal' => 'Mencatat perubahan fitur setiap deploy agar mudah dipresentasikan saat audit/lomba.',
            'Backup Reminder' => 'Pengingat backup database dan file sebelum update besar.',
            'Owner Notes' => 'Catatan pribadi Nazar untuk ide fitur, bug, dan prioritas pengembangan.',
        ];

        return view('owner.index', compact('stats', 'userBreakdown', 'securityChecks', 'recommendations'));
    }

    private function safeCount(string $model, string $table): int
    {
        if (! Schema::hasTable($table)) {
            return 0;
        }

        return $model::query()->count();
    }
}
