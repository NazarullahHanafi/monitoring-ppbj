<?php
// ============================================================
// FILE 2: NotificationService LENGKAP
// app/Services/NotificationService.php
// ============================================================

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use App\Models\PrReceiptApproval;
use App\Mail\PrNotificationMail;
use Carbon\Carbon;

class NotificationService
{
    // Default emails (bisa di-override lewat chatbot)
    const EMAIL_TO = 'nazarullahhanafi5@gmail.com';
    const EMAIL_CC_DEFAULT = ['nazarullah12104@gmail.com'];

    public function notifyNewPrSubmission($prData, $adminUsers = [])
    {
        $results = ['cache_stored' => false, 'admin_count' => count($adminUsers)];
        try {
            $this->storeChatbotNotification($prData);
            $results['cache_stored'] = true;
        } catch (\Exception $e) {
            Log::error('Failed to store notification', ['error' => $e->getMessage()]);
        }
        return $results;
    }



    protected function storeChatbotNotification($prData)
    {
        $key = 'pending_pr_notifications';
        $notifications = Cache::get($key, []);
        $notifications[] = [
            'id' => uniqid('pr_notif_'),
            'pr_no' => $prData['pr_no'],
            'description' => $prData['description'] ?? '-',
            'department' => $prData['department'] ?? 'Operasional',
            'submitted_by' => $prData['submitted_by'] ?? '-',
            'submitted_at' => now()->toIso8601String(),
            'status' => 'pending',
            'read' => false,
        ];
        if (count($notifications) > 50) {
            $notifications = array_slice($notifications, -50);
        }
        Cache::put($key, $notifications, 60 * 24 * 7);
    }

    /**
     * GET PR pending milik user operasional tertentu
     */
    public function getPendingNotificationsForUser($userId, $markAsRead = false)
    {
        try {
            $pendingPR = PrReceiptApproval::where('status', 'PENDING')
                ->where('requested_by_user_id', $userId)
                ->with('torpr')
                ->orderBy('created_at', 'desc')
                ->get();

            if ($pendingPR->isEmpty())
                return [];

            return $pendingPR->map(function ($pr) {
                return [
                    'id' => 'pr_' . $pr->id,
                    'pr_receipt_id' => $pr->id,
                    'pr_no' => $pr->torpr->nomor_pr ?? 'PR-' . $pr->id,
                    'description' => $pr->torpr->tujuan_pengadaan ?? '-',
                    'department' => 'Operasional',
                    'submitted_by' => $pr->requested_name ?? '-',
                    'submitted_at' => Carbon::parse($pr->requested_at)->format('d M Y H:i'),
                    'status' => 'pending',
                    'read' => false,
                ];
            })->toArray();

        } catch (\Exception $e) {
            Log::error('Failed to get user notifications', ['user_id' => $userId, 'error' => $e->getMessage()]);
            return [];
        }
    }

    /**
     * GET semua PR pending (untuk dept umum)
     */
    public function getPendingNotifications($markAsRead = false)
    {
        try {
            $pendingPR = PrReceiptApproval::where('status', 'PENDING')
                ->with('torpr')
                ->orderBy('created_at', 'desc')
                ->get();

            if ($pendingPR->isEmpty())
                return [];

            return $pendingPR->map(function ($pr) {
                return [
                    'id' => 'pr_' . $pr->id,
                    'pr_no' => $pr->torpr->nomor_pr ?? 'PR-' . $pr->id,
                    'description' => $pr->torpr->tujuan_pengadaan ?? '-',
                    'department' => 'Operasional',
                    'submitted_by' => $pr->requested_name ?? '-',
                    'submitted_at' => Carbon::parse($pr->requested_at)->format('d M Y H:i'),
                    'status' => 'pending',
                    'read' => false,
                ];
            })->toArray();

        } catch (\Exception $e) {
            Log::error('Failed to get notifications', ['error' => $e->getMessage()]);
            return [];
        }
    }

    /**
     * ✅ STATISTIK PERSONAL
     */
    public function getPersonalStats($userId, $period = 'month')
    {
        try {
            $now = Carbon::now();
            $query = PrReceiptApproval::where('requested_by_user_id', $userId);

            // Tentukan periode
            switch ($period) {
                case 'week':
                    $query->whereBetween('requested_at', [$now->copy()->startOfWeek(), $now->copy()->endOfWeek()]);
                    $periodLabel = 'Minggu Ini';
                    break;
                case 'year':
                    $query->whereYear('requested_at', $now->year);
                    $periodLabel = 'Tahun ' . $now->year;
                    break;
                case 'month':
                default:
                    $query->whereYear('requested_at', $now->year)
                        ->whereMonth('requested_at', $now->month);
                    $periodLabel = $now->translatedFormat('F Y');
                    break;
            }

            $all = $query->with('torpr')->get();

            // Hitung per status
            $total = $all->count();
            $pending = $all->where('status', 'PENDING')->count();
            $approved = $all->where('status', 'APPROVED')->count();
            $rejected = $all->where('status', 'REJECTED')->count();

            // PR paling lama pending
            $oldestPending = PrReceiptApproval::where('requested_by_user_id', $userId)
                ->where('status', 'PENDING')
                ->orderBy('requested_at', 'asc')
                ->with('torpr')
                ->first();

            $oldestDays = $oldestPending
                ? Carbon::parse($oldestPending->requested_at)->diffInDays(Carbon::now())
                : 0;

            // Rata-rata waktu approval
            $approvedPRs = $all->where('status', 'APPROVED')->whereNotNull('approved_at');
            $avgDays = 0;
            if ($approvedPRs->isNotEmpty()) {
                $totalDays = $approvedPRs->sum(function ($pr) {
                    return Carbon::parse($pr->requested_at)->diffInDays(Carbon::parse($pr->approved_at));
                });
                $avgDays = round($totalDays / $approvedPRs->count(), 1);
            }

            return [
                'period' => $periodLabel,
                'total' => $total,
                'pending' => $pending,
                'approved' => $approved,
                'rejected' => $rejected,
                'avg_approval_days' => $avgDays,
                'oldest_pending' => $oldestPending ? ($oldestPending->torpr->nomor_pr ?? 'PR-' . $oldestPending->id) : null,
                'oldest_days' => $oldestDays,
            ];

        } catch (\Exception $e) {
            Log::error('Failed to get personal stats', ['user_id' => $userId, 'error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * ✅ FORMAT STATISTIK PERSONAL (Method yang hilang!)
     */
    public function formatPersonalStats(array $stats): string
    {
        if (!$stats) {
            return "❌ Gagal mengambil statistik. Coba lagi.";
        }

        $total = $stats['total'];
        $pending = $stats['pending'];
        $approved = $stats['approved'];
        $rejected = $stats['rejected'];
        $period = $stats['period'];

        // Progress bar approved
        $approvedPct = $total > 0 ? round(($approved / $total) * 100) : 0;
        $bar = str_repeat('█', (int) ($approvedPct / 10)) . str_repeat('░', 10 - (int) ($approvedPct / 10));

        $message = "📊 **Statistik PR Anda — {$period}**\n\n";
        $message .= "━━━━━━━━━━━━━━━━━━━\n";
        $message .= "📋 **Total PR Diajukan:** {$total}\n\n";
        $message .= "✅ **Approved:** {$approved}\n";
        $message .= "⏳ **Pending:** {$pending}\n";
        $message .= "❌ **Rejected:** {$rejected}\n\n";

        if ($total > 0) {
            $message .= "📈 **Tingkat Approval:** {$approvedPct}%\n";
            $message .= "`{$bar}`\n\n";
        }

        if ($stats['avg_approval_days'] > 0) {
            $message .= "⏱️ **Rata-rata waktu approval:** {$stats['avg_approval_days']} hari\n\n";
        }

        if ($stats['oldest_pending'] && $stats['oldest_days'] > 0) {
            $urgency = $stats['oldest_days'] >= 3 ? '🚨' : '⚠️';
            $message .= "━━━━━━━━━━━━━━━━━━━\n";
            $message .= "{$urgency} **PR Paling Lama Pending:**\n";
            $message .= "• **{$stats['oldest_pending']}** — {$stats['oldest_days']} hari\n\n";
        }

        $message .= "💡 Ketik **\"statistik minggu ini\"** atau **\"statistik tahun ini\"** untuk periode lain.";

        return $message;
    }

    /**
     * ✅ SEND EMAIL - toEmail dan ccEmails bisa diisi dari chatbot
     */
    public function sendEmailNotification(
        array $prData,
        string $toEmail,
        array $ccEmails = [],
        string $senderName = 'PPBJ System'
    ): array {
        try {
            // Hapus duplikat & email kosong
            $ccEmails = array_values(array_unique(array_filter($ccEmails)));

            Mail::to($toEmail)
                ->cc($ccEmails)
                ->send(new PrNotificationMail($prData, $ccEmails, $senderName));

            Log::info('PR email sent', [
                'pr_no' => $prData['pr_no'],
                'to' => $toEmail,
                'cc' => $ccEmails,
                'sender' => $senderName,
            ]);

            return [
                'success' => true,
                'to' => $toEmail,
                'cc' => $ccEmails,
                'message' => 'Email berhasil dikirim!',
            ];

        } catch (\Exception $e) {
            Log::error('Failed to send email', [
                'pr_no' => $prData['pr_no'] ?? 'unknown',
                'to' => $toEmail,
                'error' => $e->getMessage(),
            ]);
            return [
                'success' => false,
                'message' => 'Gagal kirim email: ' . $e->getMessage(),
            ];
        }
    }

    public function getUnreadCount()
    {
        // Cache selama 60 detik. Key unik.
        // Jika ada approval/reject di controller lain, pastikan Cache::forget() dipanggil.
        return Cache::remember('pr_receipt_pending_count', 60, function () {
            try {
                return PrReceiptApproval::where('status', 'PENDING')->count();
            } catch (\Exception $e) {
                return 0;
            }
        });
    }

    public function getUnreadCountForUser($userId)
    {
        // Cache per user
        return Cache::remember("pr_receipt_pending_user_{$userId}", 60, function () use ($userId) {
            try {
                return PrReceiptApproval::where('status', 'PENDING')
                    ->where('requested_by_user_id', $userId)
                    ->count();
            } catch (\Exception $e) {
                return 0;
            }
        });
    }

    public function markNotificationAsProcessed($prNo)
    {
        Log::info('PR processed', ['pr_no' => $prNo]);
    }

    public function syncFromDatabase()
    {
        try {
            $count = PrReceiptApproval::where('status', 'PENDING')->count();
            return ['success' => true, 'message' => "Found {$count} pending PRs", 'count' => $count];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => $e->getMessage(), 'count' => 0];
        }
    }

    /**
     * Format untuk dept umum
     */
    public function formatNotificationsForChatbot($notifications)
    {
        if (empty($notifications)) {
            return "📭 *Tidak Ada PR Pending*\n\nSemua PR sudah diproses. Good job! ✨";
        }

        $count = count($notifications);
        $message = "🔔 *PR Menunggu Approval* ({$count})\n\n";

        foreach ($notifications as $i => $notif) {
            $num = $i + 1;
            $message .= "**{$num}. PR: {$notif['pr_no']}**\n";
            $message .= "📝 {$notif['description']}\n";
            $message .= "👤 Oleh: {$notif['submitted_by']}\n";
            $message .= "📅 {$notif['submitted_at']}\n\n";
        }

        $message .= "⚠️ *Action Required:*\n";
        $message .= "1. Buka menu **Approval PR**\n";
        $message .= "2. Review setiap PR\n";
        $message .= "3. **Approve** atau **Reject** dengan alasan\n\n";
        $message .= "💡 Buka menu Approval PR di dashboard!";

        return $message;
    }

    /**
     * Format untuk operasional + tawaran kirim email
     */
    public function formatNotificationsForOperasional($notifications)
    {
        if (empty($notifications)) {
            return "📭 *Tidak Ada PR Pending Anda*\n\nBelum ada PR yang Anda ajukan ke Bagian Umum, atau semua sudah diproses. ✨";
        }

        $count = count($notifications);
        $message = "📋 *PR Anda yang Sedang Pending* ({$count})\n\n";

        foreach ($notifications as $i => $notif) {
            $num = $i + 1;
            $message .= "**{$num}. {$notif['pr_no']}**\n";
            $message .= "📝 {$notif['description']}\n";
            $message .= "📅 Diajukan: {$notif['submitted_at']}\n";
            $message .= "⏳ Status: Menunggu Approval Umum\n\n";
        }

        $message .= "━━━━━━━━━━━━━━━━━━━\n";
        $message .= "📧 **Ingin kirim notifikasi email ke Bagian Umum?**\n\n";
        $message .= "Ketik **\"kirim email\"** untuk mulai.\n";
        $message .= "Anda bisa atur sendiri email tujuan & CC-nya! ✉️";

        return $message;
    }
}
