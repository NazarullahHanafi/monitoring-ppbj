<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ChatbotService;
use App\Services\NotificationService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class WebChatbotController extends Controller
{
    
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Handle chat message from frontend
     */
    public function chat(Request $request, ChatbotService $chatbotService, ArtisanCommandController $artisanController)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:2000',
            'conversation' => 'nullable|array|max:20',
            'conversation.*.role' => 'required|in:user,assistant',
            'conversation.*.content' => 'required|string|max:2000',
        ]);

        $message = trim($validated['message']);
        $isGuest = !Auth::check();

        // GUEST RESTRICTIONS
        if ($isGuest) {
            if ($this->isPrNotificationRequest($message) || $this->isEmailRequest($message)) {
                return response()->json([
                    'success' => false,
                    'message' => '🔒 **Login Diperlukan**\n\nSilakan login untuk menggunakan fitur ini.'
                ]);
            }
        }

        $user = Auth::user();
        $dept = $user?->department ?? '';

        // =====================================================
        // CEK APAKAH USER SEDANG DALAM SESSION INPUT EMAIL
        // =====================================================
        $sessionKey = $user ? 'chatbot_email_session_' . $user->id : null;
        $emailSession = $sessionKey ? Cache::get($sessionKey) : null;

        if ($emailSession) {
            return $this->handleEmailSession($user, $message, $emailSession, $sessionKey);
        }

        // =====================================================
        // DEPT UMUM: Lihat semua PR pending
        // =====================================================
        if ($dept === 'umum' && $this->isPrNotificationRequest($message)) {
            return $this->showPrNotificationsForUmum();
        }

        // =====================================================
        // DEPT OPERASIONAL: Lihat PR milik sendiri
        // =====================================================
        if ($dept === 'operasional' && $this->isPrNotificationRequest($message)) {
            return $this->showPrNotificationsForOperasional($user);
        }

        // =====================================================
        // DEPT OPERASIONAL: User minta kirim email
        // =====================================================
        if ($dept === 'operasional' && $this->isEmailRequest($message)) {
            return $this->startEmailFlow($user, $message, $sessionKey);
        }

        // =====================================================
        // FEEDBACK: Semua user yang login bisa kirim feedback
        // =====================================================
        if (!is_null($user) && $this->isFeedbackRequest($message)) {
            return $this->handleFeedback($user, $message);
        }

        // =====================================================
        // DEPT OPERASIONAL: Statistik personal
        // =====================================================
        if ($dept === 'operasional' && $this->isStatsRequest($message)) {
            return $this->showPersonalStats($user, $message);
        }

        // ARTISAN (Menggunakan $artisanController dari argument method)
        if ($this->isListCommandsRequest($message)) {
            return $artisanController->listCommands($request);
        }
        if ($this->isArtisanCommand($message)) {
            return $artisanController->executeCommand($request);
        }

        // NORMAL CHAT
        $messages = [];
        if (!empty($validated['conversation'])) {
            foreach ($validated['conversation'] as $msg) {
                $messages[] = ['role' => $msg['role'], 'content' => $msg['content']];
            }
        }
        $messages[] = ['role' => 'user', 'content' => $message];
        $userId = $isGuest ? 'guest_' . $request->ip() : 'user_' . auth()->id();

        try {
            // Gunakan $chatbotService dari argument method
            $result = $chatbotService->chat($messages, $userId, $isGuest);
            return response()->json([
                'success' => $result['success'],
                'message' => $result['message']
            ], $result['success'] ? 200 : 500);
        } catch (\Exception $e) {
            Log::error('WebChatbotController Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => '⚠️ Server Error.'], 500);
        }
    }

    /**
     * ✅ DEPT UMUM: Tampilkan semua PR pending
     */
    protected function showPrNotificationsForUmum()
    {
        try {
            $notifications = $this->notificationService->getPendingNotifications(false);
            $message = $this->notificationService->formatNotificationsForChatbot($notifications);

            // ✅ FIX: Hapus notification_count dari response (tidak perlu)
            return response()->json([
                'success' => true,
                'message' => $message
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching PR for umum', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false, 
                'message' => '⚠️ Gagal mengambil notifikasi.'
            ], 500);
        }
    }

    /**
     * ✅ DEPT OPERASIONAL: Tampilkan PR milik sendiri
     */
    protected function showPrNotificationsForOperasional($user)
    {
        try {
            $notifications = $this->notificationService->getPendingNotificationsForUser($user->id, false);
            $message = $this->notificationService->formatNotificationsForOperasional($notifications);

            // ✅ FIX: Hapus notification_count dan show_email_confirm (tidak dipakai)
            return response()->json([
                'success' => true,
                'message' => $message
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching PR for operasional', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => '⚠️ Gagal mengambil data PR Anda.'
            ], 500);
        }
    }

    /**
     * ✅ MULAI EMAIL FLOW
     * Step 1: Tanya email tujuan
     */
    protected function startEmailFlow($user, string $message, string $sessionKey)
    {
        $notifications = $this->notificationService->getPendingNotificationsForUser($user->id, false);

        if (empty($notifications)) {
            return response()->json([
                'success' => true,
                'message' => "📭 **Tidak Ada PR Pending**\n\nAnda tidak memiliki PR yang sedang pending."
            ]);
        }

        // Simpan session tanpa log (log hanya jika error)
        Cache::put($sessionKey, [
            'step' => 'waiting_to_email',
            'notifications' => $notifications,
            'to_email' => null,
            'cc_emails' => [],
        ], now()->addMinutes(10));

        $prList = '';
        foreach ($notifications as $i => $notif) {
            $prList .= "**" . ($i + 1) . ".** {$notif['pr_no']} - {$notif['description']}\n";
        }

        $response = "📧 **Kirim Notifikasi Email ke Bagian Umum**\n\n";
        $response .= "PR yang akan dilaporkan:\n{$prList}\n";
        $response .= "━━━━━━━━━━━━━━━━━━━\n";
        $response .= "**Step 1/3:** Ketik **email tujuan (To):**\n\n";
        $response .= "Contoh: `nazarullahhanafi5@gmail.com`\n\n";
        $response .= "Atau ketik **\"default\"** untuk pakai email bawaan:\n";
        $response .= "➡️ `nazarullahhanafi5@gmail.com`\n\n";
        $response .= "Ketik **\"batal\"** untuk membatalkan.";

        return response()->json(['success' => true, 'message' => $response]);
    }

    /**
     * ✅ HANDLE EMAIL SESSION
     * Multi-step: TO → CC → Konfirmasi → Kirim
     */
    protected function handleEmailSession($user, string $message, array $session, string $sessionKey)
    {
        // User mau batal
        if ($this->isCancelMessage($message)) {
            Cache::forget($sessionKey);
            return response()->json([
                'success' => true,
                'message' => "❌ **Email Dibatalkan**\n\nOke, email tidak jadi dikirim. Ada yang bisa saya bantu lagi? 😊"
            ]);
        }

        $step = $session['step'];

        // =====================
        // STEP 1: Input email TO
        // =====================
        if ($step === 'waiting_to_email') {

            // Pakai default
            if (strtolower(trim($message)) === 'default') {
                $toEmail = NotificationService::EMAIL_TO;
            } else {
                // Validasi email
                $toEmail = trim($message);
                if (!filter_var($toEmail, FILTER_VALIDATE_EMAIL)) {
                    return response()->json([
                        'success' => true,
                        'message' => "❌ **Format email tidak valid!**\n\nContoh yang benar: `nazarullahhanafi5@gmail.com`\n\nSilakan ketik ulang email tujuan, atau ketik **\"default\"** untuk pakai email bawaan."
                    ]);
                }
            }

            // Update session ke step 2
            $session['to_email'] = $toEmail;
            $session['step'] = 'waiting_cc_email';
            Cache::put($sessionKey, $session, now()->addMinutes(10));

            $response = "✅ **Email tujuan:** `{$toEmail}`\n\n";
            $response .= "━━━━━━━━━━━━━━━━━━━\n";
            $response .= "**Step 2/3:** Ketik **email CC** (opsional):\n\n";
            $response .= "Contoh satu: `m.idris@sucofindo.co.id`\n";
            $response .= "Contoh banyak: `m.idris@sucofindo.co.id, bos@mail.com`\n\n";
            $response .= "Atau ketik **\"default\"** untuk CC bawaan:\n";
            $response .= "➡️ `m.idris@sucofindo.co.id`\n\n";
            $response .= "Ketik **\"skip\"** jika tidak ingin ada CC.\n";
            $response .= "Ketik **\"batal\"** untuk membatalkan.";

            return response()->json(['success' => true, 'message' => $response]);
        }

        // =====================
        // STEP 2: Input email CC
        // =====================
        if ($step === 'waiting_cc_email') {

            $ccEmails = [];

            if (strtolower(trim($message)) === 'default') {
                $ccEmails = NotificationService::EMAIL_CC_DEFAULT;
            } elseif (strtolower(trim($message)) === 'skip') {
                $ccEmails = [];
            } else {
                // Parse multiple emails
                foreach (explode(',', $message) as $email) {
                    $email = trim($email);
                    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                        $ccEmails[] = $email;
                    }
                }

                // Kalau ada input tapi semua invalid
                if (!empty(trim($message)) && empty($ccEmails)) {
                    return response()->json([
                        'success' => true,
                        'message' => "❌ **Format email CC tidak valid!**\n\nContoh: `m.idris@sucofindo.co.id`\n\nSilakan ketik ulang, **\"skip\"** jika tidak ada CC, atau **\"default\"** untuk CC bawaan."
                    ]);
                }
            }

            // Update session ke step 3 (konfirmasi)
            $session['cc_emails'] = $ccEmails;
            $session['step'] = 'waiting_confirm';
            Cache::put($sessionKey, $session, now()->addMinutes(10));

            // Build preview konfirmasi
            $toEmail = $session['to_email'];
            $ccString = !empty($ccEmails) ? implode(', ', $ccEmails) : '_(tidak ada CC)_';

            $prList = '';
            foreach ($session['notifications'] as $i => $notif) {
                $prList .= "• **{$notif['pr_no']}** - {$notif['description']}\n";
            }

            $response = "📋 **Step 3/3: Konfirmasi Pengiriman**\n\n";
            $response .= "Detail email yang akan dikirim:\n\n";
            $response .= "📬 **To:** `{$toEmail}`\n";
            $response .= "📋 **CC:** {$ccString}\n";
            $response .= "📝 **PR yang dilaporkan:**\n{$prList}\n";
            $response .= "━━━━━━━━━━━━━━━━━━━\n";
            $response .= "Ketik **\"ya, kirim\"** untuk mengirim email\n";
            $response .= "Ketik **\"batal\"** untuk membatalkan";

            return response()->json(['success' => true, 'message' => $response]);
        }

        // =====================
        // STEP 3: Konfirmasi kirim
        // =====================
        if ($step === 'waiting_confirm') {

            if (!$this->isConfirmMessage($message)) {
                return response()->json([
                    'success' => true,
                    'message' => "❓ Ketik **\"ya, kirim\"** untuk mengirim, atau **\"batal\"** untuk membatalkan."
                ]);
            }

            // Hapus session dulu
            Cache::forget($sessionKey);

            // Kirim email
            return $this->sendEmails($user, $session);
        }

        // Fallback
        Cache::forget($sessionKey);
        return response()->json([
            'success' => true,
            'message' => "❓ Terjadi kesalahan session. Silakan ketik **\"kirim email\"** untuk memulai ulang."
        ]);
    }

    /**
     * ✅ KIRIM EMAIL
     */
    protected function sendEmails($user, array $session)
    {
        $toEmail = $session['to_email'];
        $ccEmails = $session['cc_emails'];
        $notifications = $session['notifications'];

        $sentCount = 0;
        $failedCount = 0;

        foreach ($notifications as $notif) {
            $prData = [
                'pr_no' => $notif['pr_no'],
                'description' => $notif['description'],
                'submitted_by' => $user->name,
                'department' => 'Operasional',
                'submitted_at' => $notif['submitted_at'],
                'notes' => 'PR ini menunggu approval dari Bagian Umum.',
            ];

            $result = $this->notificationService->sendEmailNotification(
                $prData,
                $toEmail,
                $ccEmails,
                $user->name
            );

            $result['success'] ? $sentCount++ : $failedCount++;
        }

        // ✅ Log hanya jika ada yang gagal
        if ($failedCount > 0) {
            Log::warning('Some emails failed', [
                'sent' => $sentCount,
                'failed' => $failedCount,
                'user_id' => $user->id
            ]);
        }

        if ($sentCount > 0) {
            $ccString = !empty($ccEmails) ? implode(', ', $ccEmails) : '_(tidak ada)_';
            $response = "✅ **Email Berhasil Dikirim!**\n\n";
            $response .= "📊 **Ringkasan:**\n";
            $response .= "• Terkirim: **{$sentCount}** email\n";
            if ($failedCount > 0) {
                $response .= "• Gagal: **{$failedCount}** email\n";
            }
            $response .= "\n📬 **Detail Pengiriman:**\n";
            $response .= "• **To:** `{$toEmail}`\n";
            $response .= "• **CC:** {$ccString}\n\n";
            $response .= "💡 Bagian Umum akan segera mereview PR Anda.";
        } else {
            $response = "❌ **Semua Email Gagal Terkirim**\n\nSilakan coba lagi atau hubungi administrator.";
        }

        return response()->json([
            'success' => true,
            'message' => $response
        ]);
    }

    /**
     * ✅ STATISTIK PERSONAL untuk operasional
     */
    protected function showPersonalStats($user, string $message)
    {
        $msg = strtolower($message);
        if (str_contains($msg, 'minggu')) {
            $period = 'week';
        } elseif (str_contains($msg, 'tahun')) {
            $period = 'year';
        } else {
            $period = 'month';
        }

        try {
            $stats = $this->notificationService->getPersonalStats($user->id, $period);
            $message = $this->notificationService->formatPersonalStats($stats);

            return response()->json([
                'success' => true,
                'message' => $message
            ]);

        } catch (\Exception $e) {
            Log::error('Error getting stats', [
                'error' => $e->getMessage(),
                'user_id' => $user->id
            ]);
            return response()->json([
                'success' => false,
                'message' => '⚠️ Gagal mengambil statistik.'
            ], 500);
        }
    }

    /**
     * ✅ HANDLE FEEDBACK dari user
     */
    protected function handleFeedback($user, string $message)
    {
        $msg = strtolower($message);
        $category = 'lainnya';
        
        if (str_contains($msg, 'keluhan') || str_contains($msg, 'complain') || str_contains($msg, 'masalah')) {
            $category = 'keluhan';
        } elseif (str_contains($msg, 'saran') || str_contains($msg, 'usul') || str_contains($msg, 'ide')) {
            $category = 'saran';
        } elseif (str_contains($msg, 'tanya') || str_contains($msg, 'pertanyaan') || str_contains($msg, 'help')) {
            $category = 'pertanyaan';
        }

        $cleanMessage = trim(preg_replace(
            '/^(feedback|kirim pesan|kirim feedback|keluhan|saran|pertanyaan)\s*[:|-]?\s*/i',
            '',
            $message
        ));

        if (empty($cleanMessage) || strlen($cleanMessage) < 5) {
            return response()->json([
                'success' => true,
                'message' => "📝 **Kirim Feedback ke Admin**\n\nSilakan ketik pesan Anda setelah kata 'feedback':\n\nContoh:\n• `feedback: sistem loading lama`\n• `saran: tambah fitur export PDF`\n• `keluhan: email tidak terkirim`"
            ]);
        }

        try {
            $request = new \Illuminate\Http\Request();
            $request->merge(['message' => $cleanMessage, 'category' => $category]);
            $request->setUserResolver(fn() => $user);

            $feedbackController = app(\App\Http\Controllers\FeedbackController::class);
            return $feedbackController->store($request);

        } catch (\Exception $e) {
            Log::error('Feedback error', [
                'error' => $e->getMessage(),
                'user_id' => $user->id
            ]);
            return response()->json([
                'success' => false,
                'message' => '⚠️ Gagal mengirim feedback.'
            ], 500);
        }
    }

    /**
     * ✅ GET GREETING berdasarkan waktu
     */
    public function getGreeting(Request $request)
    {
        $hour = (int) now()->timezone('Asia/Jakarta')->format('H');
        $user = Auth::user();
        $name = $user ? explode(' ', $user->name)[0] : 'Kawan';
        $dept = $user?->department ?? $user?->dept ?? '';

        // ✅ Cache greeting config (tidak perlu query tiap kali)
        $greetingConfig = [
            [5, 11, 'Selamat Pagi', '🌤️', 'Semoga hari Anda produktif!', 'morning'],
            [11, 15, 'Selamat Siang', '☀️', 'Jangan lupa makan siang ya!', 'noon'],
            [15, 18, 'Selamat Sore', '🌅', 'Semangat, sebentar lagi pulang!', 'afternoon'],
            [18, 21, 'Selamat Malam', '🌙', 'Masih ada yang perlu dikerjakan?', 'evening'],
        ];

        $greeting = 'Halo';
        $emoji = '⭐';
        $subtext = 'Masih online di larut malam, semangat!';
        $bg = 'night';

        foreach ($greetingConfig as [$start, $end, $g, $e, $s, $b]) {
            if ($hour >= $start && $hour < $end) {
                [$greeting, $emoji, $subtext, $bg] = [$g, $e, $s, $b];
                break;
            }
        }

        // ✅ PR info hanya jika user login dan ada dept
        $prInfo = '';
        if ($user && $dept) {
            if ($dept === 'umum') {
                $pending = $this->notificationService->getUnreadCount();
                if ($pending > 0) {
                    $prInfo = "\n\n🔔 Ada **{$pending} PR** yang menunggu approval Anda hari ini.";
                }
            } elseif ($dept === 'operasional') {
                $pending = $this->notificationService->getUnreadCountForUser($user->id);
                if ($pending > 0) {
                    $prInfo = "\n\n📋 Anda memiliki **{$pending} PR** yang sedang pending.";
                }
            }
        }

        $message = "{$emoji} **{$greeting}, {$name}!**\n\n{$subtext}{$prInfo}\n\n💡 Ketik **\"bantuan\"** untuk melihat semua yang bisa saya bantu!";

        return response()->json([
            'success' => true,
            'message' => $message,
            'bg' => $bg
        ]);
    }

    /**
     * Get unread notification count (badge)
     */
    public function getNotificationCount(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['count' => 0]);
        }

        $user = Auth::user();
        $dept = $user->department ?? $user->dept ?? '';

        try {
            $count = 0;
            
            if ($dept === 'umum') {
                $count = $this->notificationService->getUnreadCount();
            } elseif ($dept === 'operasional') {
                $count = $this->notificationService->getUnreadCountForUser($user->id);
            }

            return response()->json(['count' => $count]);

        } catch (\Exception $e) {
            return response()->json(['count' => 0]);
        }
    }

    /**
     * Sync notifications
     */
    public function syncNotifications(Request $request)
    {
        try {
            $result = $this->notificationService->syncFromDatabase();
            return response()->json(['success' => $result['success'], 'message' => $result['message'], 'count' => $result['count']]);
        } catch (\Exception $e) {
            Log::error('Notification sync failed', ['error' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Gagal menyinkronkan notifikasi.'], 500);
        }
    }

    /**
     * Clear chat history
     */
    public function clearHistory(Request $request, ChatbotService $chatbotService)
    {
        $userId = auth()->check() ? 'user_' . auth()->id() : 'guest_' . $request->ip();
        
        try {
            // Gunakan $chatbotService dari argument
            $chatbotService->clearChatHistory($userId);

            if (auth()->check()) {
                Cache::forget('chatbot_email_session_' . auth()->id());
            }

            return response()->json([
                'success' => true,
                'message' => 'Riwayat chat dihapus.'
            ]);

        } catch (\Exception $e) {
            Log::error('Clear history failed', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus riwayat.'
            ]);
        }
    }

    // ============================================================
    // KEYWORD DETECTION HELPERS
    // ============================================================

    protected function isPrNotificationRequest(string $message): bool
    {
        $msg = strtolower(trim($message));
        $keywords = [
            'pr pending',
            'pr menunggu',
            'notifikasi pr',
            'notif pr',
            'approval pr',
            'pr baru',
            'ada pr',
            'cek pr',
            'list pr',
            'daftar pr',
            'lihat pr',
            'show pr',
            'pending pr',
            'status pr',
        ];
        foreach ($keywords as $kw) {
            if (str_contains($msg, $kw))
                return true;
        }
        return false;
    }

    protected function isEmailRequest(string $message): bool
    {
        $msg = strtolower(trim($message));
        return str_contains($msg, 'kirim email') || str_contains($msg, 'send email');
    }

    protected function isConfirmMessage(string $message): bool
    {
        $msg = strtolower(trim($message));
        $confirms = ['ya, kirim', 'ya kirim', 'oke kirim', 'ok kirim', 'yes', 'ya', 'setuju', 'kirim sekarang'];
        foreach ($confirms as $c) {
            if (str_contains($msg, $c))
                return true;
        }
        return false;
    }

    protected function isCancelMessage(string $message): bool
    {
        $msg = strtolower(trim($message));
        $cancels = ['batal', 'tidak', 'cancel', 'jangan', 'no', 'gak jadi'];
        foreach ($cancels as $c) {
            if (str_contains($msg, $c))
                return true;
        }
        return false;
    }

    protected function isArtisanCommand(string $message): bool
    {
        $msg = strtolower(trim($message));
        $patterns = [
            '/php\s+artisan/',
            '/artisan\s+[a-z:]+/',
            '/cache:clear/',
            '/config:clear/',
            '/view:clear/',
            '/route:clear/',
            '/optimize/',
        ];
        foreach ($patterns as $p) {
            if (preg_match($p, $msg))
                return true;
        }
        return false;
    }

    protected function isListCommandsRequest(string $message): bool
    {
        $msg = strtolower(trim($message));
        $keywords = [
            'list commands',
            'daftar command',
            'command apa saja',
            'available commands',
            'list artisan',
            'tampilkan command',
        ];
        foreach ($keywords as $kw) {
            if (str_contains($msg, $kw))
                return true;
        }
        return false;
    }

    protected function isStatsRequest(string $message): bool
    {
        $msg = strtolower(trim($message));
        $keywords = [
            'statistik',
            'statistic',
            'stats',
            'statistik saya',
            'berapa pr',
            'history pr',
            'riwayat pr',
            'rekap pr',
            'laporan saya',
            'summary pr',
        ];
        foreach ($keywords as $kw) {
            if (str_contains($msg, $kw))
                return true;
        }
        return false;
    }

    protected function isFeedbackRequest(string $message): bool
    {
        $msg = strtolower(trim($message));
        $keywords = [
            'feedback',
            'kirim pesan',
            'kirim feedback',
            'keluhan',
            'saran',
            'kritik',
            'usul',
            'lapor',
            'report masalah',
        ];
        foreach ($keywords as $kw) {
            if (str_contains($msg, $kw))
                return true;
        }
        return false;
    }
}
