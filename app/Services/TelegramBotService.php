<?php

namespace App\Services;

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
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Throwable;

class TelegramBotService
{
    public function handleUpdate(array $update): void
    {
        $callbackQuery = $update['callback_query'] ?? null;

        if (is_array($callbackQuery)) {
            $this->handleCallbackQuery($callbackQuery);

            return;
        }

        $message = $update['message'] ?? $update['edited_message'] ?? null;

        if (! is_array($message)) {
            return;
        }

        $chatId = (string) data_get($message, 'chat.id', '');
        $text = trim((string) data_get($message, 'text', ''));

        if ($chatId === '' || $text === '') {
            return;
        }

        $command = Str::of($text)->before(' ')->before('@')->lower()->toString();

        Log::info('Telegram chat discovered', [
            'chat_id' => $chatId,
            'chat_type' => data_get($message, 'chat.type'),
            'chat_title' => data_get($message, 'chat.title'),
            'from_id' => data_get($message, 'from.id'),
            'from_username' => data_get($message, 'from.username'),
            'command' => $command,
        ]);

        if (! $this->isAllowedChat($chatId)) {
            $this->sendMessage($chatId, "⛔ Akses Telegram SIMONPR ditolak.\nChat ID: {$chatId}\n\nKirim Chat ID ini ke owner untuk didaftarkan.");
            return;
        }

        $fromId = (string) data_get($message, 'from.id', '');
        $ownerOnlyCommands = ['/force_logout_user', 'force_logout_user', '/lock_user', 'lock_user', '/unlock_user', 'unlock_user'];

        if (in_array($command, $ownerOnlyCommands, true) && ! $this->isOwnerActor($fromId)) {
            $this->sendMessage($chatId, "⛔ Command ini khusus owner SIMONPR.\nAktor Telegram: {$fromId}");

            return;
        }

        match ($command) {
            '/tele', 'tele', '/status', 'status' => $this->sendMessage($chatId, $this->statusText()),
            '/list', 'list' => $this->sendMessage($chatId, $this->activityListText()),
            '/online', 'online' => $this->sendMessage($chatId, $this->onlineUsersText()),
            '/users', 'users', '/lastlogin', 'lastlogin' => $this->sendMessage($chatId, $this->lastSeenUsersText()),
            '/ops', 'ops', '/control', 'control' => $this->sendOpsPanel($chatId),
            '/health', 'health' => $this->sendMessage($chatId, $this->healthText()),
            '/force_logout_user', 'force_logout_user' => $this->sendMessage($chatId, $this->forceLogoutUserByCommand($text, $fromId)),
            '/lock_user', 'lock_user' => $this->sendMessage($chatId, $this->lockUserByCommand($text, $fromId)),
            '/unlock_user', 'unlock_user' => $this->sendMessage($chatId, $this->unlockUserByCommand($text, $fromId)),
            '/help', 'help', '/start', 'start' => $this->sendMessage($chatId, $this->helpText()),
            default => $this->sendMessage($chatId, "Aku belum kenal command itu 😄\n\n".$this->helpText()),
        };
    }

    public function sendMessage(string|int $chatId, string $text, ?array $replyMarkup = null): bool
    {
        $token = $this->token();

        if (! $token || trim((string) $chatId) === '') {
            return false;
        }

        try {
            $payload = [
                'chat_id' => (string) $chatId,
                'text' => $text,
                'disable_web_page_preview' => true,
            ];

            if ($replyMarkup !== null) {
                $payload['reply_markup'] = json_encode($replyMarkup);
            }

            $response = Http::timeout($this->timeout())
                ->asForm()
                ->post("https://api.telegram.org/bot{$token}/sendMessage", $payload);

            return $response->successful();
        } catch (Throwable) {
            return false;
        }
    }

    public function notifyUserLogin(User $user, ?string $ip = null): void
    {
        $this->sendNotification(implode("\n", [
            '🟢 User login SIMONPR',
            'Nama: '.$this->userDisplayName($user),
            'Role: '.($user->role ?: '-'),
            'Department: '.($user->department ?: '-'),
            'IP: '.($ip ?: '-'),
            'Waktu: '.now()->translatedFormat('l, d F Y H:i:s').' WIB',
            '',
            'Sistem mencatat login otomatis, owner tidak perlu cek manual lagi.',
        ]));
    }

    public function notifyUserLogout(User $user, ?string $ip = null): void
    {
        $this->sendNotification(implode("\n", [
            '⚪ User logout SIMONPR',
            'Nama: '.$this->userDisplayName($user),
            'Role: '.($user->role ?: '-'),
            'Department: '.($user->department ?: '-'),
            'IP: '.($ip ?: '-'),
            'Waktu: '.now()->translatedFormat('l, d F Y H:i:s').' WIB',
            '',
            'Status keluar tercatat untuk jejak aktivitas login.',
        ]));
    }

    public function notifyLoginSecurityAlert(string $email, ?string $ip = null, int $attempts = 0, string $reason = 'Login gagal berulang'): void
    {
        $email = trim($email) ?: '-';
        $ip = trim((string) $ip) ?: '-';
        $cacheKey = 'telegram_login_security_alert:'.sha1($email.'|'.$ip.'|'.$reason);

        if (! Cache::add($cacheKey, true, now()->addMinutes(5))) {
            return;
        }

        $this->sendNotification(implode("\n", [
            '🚨 Alert keamanan login',
            'Kejadian: '.$reason,
            'Email dicoba: '.$email,
            'IP: '.$ip,
            'Percobaan: '.max(0, $attempts).'x',
            'Waktu: '.now()->translatedFormat('l, d F Y H:i:s').' WIB',
            '',
            'Catatan: alert dibatasi 1x per 5 menit agar Telegram tidak spam.',
        ]));
    }

    public function notifyApplicationError(Throwable $exception, array $context = []): void
    {
        if (! app()->environment('production')) {
            return;
        }

        $class = get_class($exception);
        $message = Str::limit($exception->getMessage() ?: 'Tanpa pesan error', 180);
        $file = Str::after($exception->getFile(), base_path().DIRECTORY_SEPARATOR);
        $cacheKey = 'telegram_app_error_alert:'.sha1($class.'|'.$message.'|'.$file.'|'.$exception->getLine());

        if (! Cache::add($cacheKey, true, now()->addMinutes(5))) {
            return;
        }

        $userText = $context['user'] ?? '-';
        $pathText = $context['path'] ?? '-';
        $ipText = $context['ip'] ?? '-';
        $methodText = $context['method'] ?? '-';

        $this->sendNotification(implode("\n", [
            '🚨 Error terdeteksi di SIMONPR',
            'Tipe: '.$class,
            'Pesan: '.$message,
            'Lokasi: '.$file.':'.$exception->getLine(),
            'URL: '.$methodText.' '.$pathText,
            'User: '.$userText,
            'IP: '.$ipText,
            'Waktu: '.now()->translatedFormat('l, d F Y H:i:s').' WIB',
            '',
            'Alert otomatis dibatasi 1x per 5 menit untuk error yang sama.',
        ]));
    }

    public function setWebhook(string $url): array
    {
        $token = $this->token();

        if (! $token) {
            return ['ok' => false, 'description' => 'TELEGRAM_BOT_TOKEN belum diatur.'];
        }

        try {
            $response = Http::timeout($this->timeout())
                ->asForm()
                ->post("https://api.telegram.org/bot{$token}/setWebhook", [
                    'url' => $url,
                    'drop_pending_updates' => true,
                    'allowed_updates' => json_encode(['message', 'edited_message', 'callback_query']),
                ]);

            return $response->json() ?: ['ok' => false, 'description' => $response->body()];
        } catch (Throwable) {
            return ['ok' => false, 'description' => 'Tidak dapat terhubung ke Telegram API dari server.'];
        }
    }

    public function setCommands(): array
    {
        $token = $this->token();

        if (! $token) {
            return ['ok' => false, 'description' => 'TELEGRAM_BOT_TOKEN belum diatur.'];
        }

        $commands = [
            ['command' => 'tele', 'description' => 'Status sistem dan ringkasan data'],
            ['command' => 'list', 'description' => 'Aktivitas terbaru website'],
            ['command' => 'online', 'description' => 'User yang sedang online'],
            ['command' => 'users', 'description' => 'Terakhir aktif/login user'],
            ['command' => 'ops', 'description' => 'Panel maintenance dan read-only'],
            ['command' => 'health', 'description' => 'Health check sistem cepat'],
            ['command' => 'force_logout_user', 'description' => 'Owner: paksa logout user by email'],
            ['command' => 'lock_user', 'description' => 'Owner: kunci akun user by email'],
            ['command' => 'unlock_user', 'description' => 'Owner: buka kunci akun user by email'],
            ['command' => 'help', 'description' => 'Daftar command SIMONPR'],
        ];

        try {
            $response = Http::timeout($this->timeout())
                ->asForm()
                ->post("https://api.telegram.org/bot{$token}/setMyCommands", [
                    'commands' => json_encode($commands),
                ]);

            return $response->json() ?: ['ok' => false, 'description' => $response->body()];
        } catch (Throwable) {
            return ['ok' => false, 'description' => 'Tidak dapat mendaftarkan command Telegram.'];
        }
    }

    public function sendOpsPanel(string|int $chatId): bool
    {
        return $this->sendMessage($chatId, $this->opsPanelText(), $this->opsKeyboard());
    }

    private function handleCallbackQuery(array $callbackQuery): void
    {
        $callbackId = (string) data_get($callbackQuery, 'id', '');
        $chatId = (string) data_get($callbackQuery, 'message.chat.id', '');
        $messageId = data_get($callbackQuery, 'message.message_id');
        $fromId = (string) data_get($callbackQuery, 'from.id', '');
        $data = (string) data_get($callbackQuery, 'data', '');

        if ($callbackId === '' || $chatId === '' || $data === '') {
            return;
        }

        if (! $this->isAllowedChat($chatId)) {
            $this->answerCallbackQuery($callbackId, 'Chat ini belum terdaftar di SIMONPR.', true);

            return;
        }

        if ($data === 'ops:refresh') {
            $this->answerCallbackQuery($callbackId, 'Status diperbarui.');
            $this->editMessageText($chatId, $messageId, $this->opsPanelText(), $this->opsKeyboard());

            return;
        }

        if ($data === 'ops:health') {
            $this->answerCallbackQuery($callbackId, 'Health check dikirim.');
            $this->sendMessage($chatId, $this->healthText());

            return;
        }

        if (! $this->isOwnerActor($fromId)) {
            $this->answerCallbackQuery($callbackId, 'Hanya owner Telegram yang boleh menekan tombol ini.', true);

            return;
        }

        $message = match ($data) {
            'ops:maintenance:on' => $this->setMaintenanceMode(true),
            'ops:maintenance:off' => $this->setMaintenanceMode(false),
            'ops:readonly:on' => $this->setReadOnlyMode(true),
            'ops:readonly:off' => $this->setReadOnlyMode(false),
            default => 'Command tombol tidak dikenal.',
        };

        $this->answerCallbackQuery($callbackId, $message);
        $this->editMessageText($chatId, $messageId, $this->opsPanelText()."\n\n".$message, $this->opsKeyboard());
    }

    private function opsPanelText(): string
    {
        return implode("\n", [
            '🕹️ SIMONPR Control Center',
            'Waktu: '.now()->translatedFormat('l, d F Y H:i:s').' WIB',
            '',
            'Website: '.$this->modeLabel('maintenance'),
            'Read-only: '.$this->modeLabel('readonly'),
            'Database: '.$this->databaseStatus(),
            'Cache: '.$this->cacheStatus(),
            '',
            'Catatan: tombol maintenance/read-only hanya dapat dijalankan oleh owner Telegram.',
        ]);
    }

    private function opsKeyboard(): array
    {
        $maintenanceOn = (bool) Cache::get('simonpr:maintenance_mode', false);
        $readOnlyOn = (bool) Cache::get('simonpr:read_only_mode', false);

        return [
            'inline_keyboard' => [
                [
                    [
                        'text' => $maintenanceOn ? '✅ Hidupkan Website' : '🛠️ Matikan Website 503',
                        'callback_data' => $maintenanceOn ? 'ops:maintenance:off' : 'ops:maintenance:on',
                    ],
                ],
                [
                    [
                        'text' => $readOnlyOn ? '🔓 Matikan Read-only' : '🔒 Aktifkan Read-only',
                        'callback_data' => $readOnlyOn ? 'ops:readonly:off' : 'ops:readonly:on',
                    ],
                ],
                [
                    ['text' => '🩺 Health Check', 'callback_data' => 'ops:health'],
                    ['text' => '🔄 Refresh', 'callback_data' => 'ops:refresh'],
                ],
            ],
        ];
    }

    public function healthText(): string
    {
        return implode("\n", [
            '🩺 SIMONPR Health Check',
            'Waktu: '.now()->translatedFormat('l, d F Y H:i:s').' WIB',
            '',
            'Website: '.$this->modeLabel('maintenance'),
            'Read-only: '.$this->modeLabel('readonly'),
            'Database: '.$this->databaseStatus(),
            'Cache: '.$this->cacheStatus(),
            'Debug: '.(config('app.debug') ? 'ON ⚠️' : 'OFF ✅'),
            '',
            'User online: '.$this->onlineUserCount().' user',
            'Approval pending: '.$this->pendingApprovalCount(),
            'Pesan contact belum dibaca: '.$this->unreadContactCount(),
            '',
            'Aman untuk dipanggil berkala karena query dibatasi dan ringan.',
        ]);
    }

    public function statusText(): string
    {
        $lines = [
            '📊 SIMONPR Monitor',
            'Waktu: '.now()->translatedFormat('l, d F Y H:i:s').' WIB',
            '',
            '🌐 App: '.config('app.name').' ('.app()->environment().')',
            '🔒 Debug: '.(config('app.debug') ? 'ON ⚠️' : 'OFF ✅'),
            '🗄️ Database: '.$this->databaseStatus(),
            '⚡ Cache: '.$this->cacheStatus(),
            '',
            '📌 Ringkasan Data',
            '• User: '.$this->safeCount(User::class, 'users'),
            '• TOR/PR: '.$this->safeCount(Torpr::class, 'torprs'),
            '• PPBJ: '.$this->safeCount(Ppbj::class, 'ppbj'),
            '• SPPH: '.$this->safeCount(Spph::class, 'spphs'),
            '• SP: '.$this->safeCount(Sp::class, 'sps'),
            '• Approval pending: '.$this->pendingApprovalCount(),
            '• Pesan contact belum dibaca: '.$this->unreadContactCount(),
        ];

        return implode("\n", $lines);
    }

    public function activityListText(int $limit = 10): string
    {
        if (! Schema::hasTable('activity_logs')) {
            return "📋 Aktivitas terbaru\n\nBelum ada tabel activity_logs.";
        }

        $logs = ActivityLog::query()
            ->with('user:id,name,email')
            ->latest()
            ->limit(max(1, min($limit, 15)))
            ->get();

        if ($logs->isEmpty()) {
            return "📋 Aktivitas terbaru\n\nBelum ada aktivitas tercatat.";
        }

        $lines = ['📋 Aktivitas terbaru SIMONPR', ''];

        foreach ($logs as $index => $log) {
            $actor = $log->user?->name ?: 'System';
            $time = optional($log->created_at)->format('d/m H:i') ?: '-';
            $description = Str::limit((string) ($log->description ?: $log->action), 95);
            $lines[] = ($index + 1).". {$time} — {$actor}";
            $lines[] = "   {$description}";
        }

        return implode("\n", $lines);
    }

    public function helpText(): string
    {
        return implode("\n", [
            '🤖 Command SIMONPR Telegram',
            '',
            '/tele — lihat status sistem dan ringkasan data',
            '/list — lihat aktivitas terbaru website',
            '/online — lihat user yang sedang online',
            '/users — lihat terakhir aktif/login user',
            '/help — daftar command',
        ]);
    }

    public function onlineUsersText(int $limit = 20): string
    {
        if (! Schema::hasTable('users') || ! Schema::hasColumn('users', 'last_seen_at')) {
            return "User online\n\nData last seen belum tersedia.";
        }

        return Cache::remember('telegram_online_users_text', 15, function () use ($limit) {
            $threshold = now()->subMinutes(5);
            $users = User::query()
                ->select(['id', 'name', 'email', 'role', 'department', 'last_seen_at'])
                ->whereNotNull('last_seen_at')
                ->where('last_seen_at', '>=', $threshold)
                ->orderByDesc('last_seen_at')
                ->limit(max(1, min($limit, 30)))
                ->get();

            $totalOnline = User::query()
                ->whereNotNull('last_seen_at')
                ->where('last_seen_at', '>=', $threshold)
                ->count();

            $lines = [
                'User sedang online',
                'Patokan: aktif dalam 5 menit terakhir',
                'Waktu cek: '.now()->translatedFormat('l, d F Y H:i:s').' WIB',
                '',
                "Total online: {$totalOnline} user",
            ];

            if ($users->isEmpty()) {
                $lines[] = '';
                $lines[] = 'Belum ada user yang terdeteksi online sekarang.';

                return implode("\n", $lines);
            }

            $lines[] = '';
            foreach ($users as $index => $user) {
                $lines[] = ($index + 1).'. '.$this->telegramUserLine($user, true);
            }

            if ($totalOnline > $users->count()) {
                $lines[] = '';
                $lines[] = '...dan '.($totalOnline - $users->count()).' user lainnya.';
            }

            return implode("\n", $lines);
        });
    }

    public function lastSeenUsersText(int $limit = 20): string
    {
        if (! Schema::hasTable('users') || ! Schema::hasColumn('users', 'last_seen_at')) {
            return "Terakhir aktif user\n\nData last seen belum tersedia.";
        }

        return Cache::remember('telegram_last_seen_users_text', 30, function () use ($limit) {
            $users = User::query()
                ->select(['id', 'name', 'email', 'role', 'department', 'last_seen_at'])
                ->orderByRaw('last_seen_at IS NULL ASC')
                ->orderByDesc('last_seen_at')
                ->orderBy('name')
                ->limit(max(1, min($limit, 30)))
                ->get();

            $totalUsers = User::query()->count();
            $onlineCount = User::query()
                ->whereNotNull('last_seen_at')
                ->where('last_seen_at', '>=', now()->subMinutes(5))
                ->count();

            $lines = [
                'Terakhir aktif / login user',
                'Data ringan dari tabel users, dibatasi agar bot tetap gesit.',
                'Waktu cek: '.now()->translatedFormat('l, d F Y H:i:s').' WIB',
                '',
                "Online sekarang: {$onlineCount} / {$totalUsers} user",
            ];

            if ($users->isEmpty()) {
                $lines[] = '';
                $lines[] = 'Belum ada user terdaftar.';

                return implode("\n", $lines);
            }

            $lines[] = '';
            foreach ($users as $index => $user) {
                $lines[] = ($index + 1).'. '.$this->telegramUserLine($user);
            }

            if ($totalUsers > $users->count()) {
                $lines[] = '';
                $lines[] = 'Gunakan menu Management User di website untuk daftar lengkap.';
            }

            return implode("\n", $lines);
        });
    }

    private function forceLogoutUserByCommand(string $text, string|int $ownerTelegramId): string
    {
        $email = $this->extractEmailArgument($text);

        if (! $email) {
            return "Format salah.\nContoh: /force_logout_user user@sucofindo.com";
        }

        $user = $this->findUserByEmail($email);

        if (! $user) {
            return "User dengan email {$email} tidak ditemukan.";
        }

        $deletedSessions = $this->deleteUserSessions($user);
        $this->writeOwnerAuditLog('telegram_force_logout_user', $user, [
            'owner_telegram_id' => (string) $ownerTelegramId,
            'deleted_sessions' => $deletedSessions,
        ]);

        return implode("\n", [
            "✅ Force logout berhasil",
            "User: ".$this->userDisplayName($user),
            "Session aktif diputus: {$deletedSessions}",
            "Waktu: ".now()->translatedFormat('l, d F Y H:i:s').' WIB',
        ]);
    }

    private function lockUserByCommand(string $text, string|int $ownerTelegramId): string
    {
        $email = $this->extractEmailArgument($text);

        if (! $email) {
            return "Format salah.\nContoh: /lock_user user@sucofindo.com";
        }

        $user = $this->findUserByEmail($email);

        if (! $user) {
            return "User dengan email {$email} tidak ditemukan.";
        }

        if ($user->isOwner()) {
            return "Akun owner tidak boleh dikunci dari Telegram demi mencegah lockout total.";
        }

        $updates = [];

        if (Schema::hasColumn('users', 'is_active')) {
            $updates['is_active'] = false;
        }

        if (Schema::hasColumn('users', 'locked_at')) {
            $updates['locked_at'] = now();
        }

        if (Schema::hasColumn('users', 'locked_by')) {
            $updates['locked_by'] = 'telegram:'.(string) $ownerTelegramId;
        }

        if (Schema::hasColumn('users', 'locked_reason')) {
            $updates['locked_reason'] = 'Dikunci owner melalui Telegram';
        }

        if ($updates === []) {
            return "Kolom lock user belum tersedia. Jalankan migration terlebih dahulu.";
        }

        $user->forceFill($updates)->save();
        $deletedSessions = $this->deleteUserSessions($user);
        $this->writeOwnerAuditLog('telegram_lock_user', $user, [
            'owner_telegram_id' => (string) $ownerTelegramId,
            'deleted_sessions' => $deletedSessions,
        ]);

        return implode("\n", [
            "🔒 User berhasil dikunci",
            "User: ".$this->userDisplayName($user),
            "Session diputus: {$deletedSessions}",
            "Efek: user tidak bisa login sampai di-unlock owner.",
            "Waktu: ".now()->translatedFormat('l, d F Y H:i:s').' WIB',
        ]);
    }

    private function unlockUserByCommand(string $text, string|int $ownerTelegramId): string
    {
        $email = $this->extractEmailArgument($text);

        if (! $email) {
            return "Format salah.\nContoh: /unlock_user user@sucofindo.com";
        }

        $user = $this->findUserByEmail($email);

        if (! $user) {
            return "User dengan email {$email} tidak ditemukan.";
        }

        $updates = [];

        if (Schema::hasColumn('users', 'is_active')) {
            $updates['is_active'] = true;
        }

        if (Schema::hasColumn('users', 'locked_at')) {
            $updates['locked_at'] = null;
        }

        if (Schema::hasColumn('users', 'locked_by')) {
            $updates['locked_by'] = null;
        }

        if (Schema::hasColumn('users', 'locked_reason')) {
            $updates['locked_reason'] = null;
        }

        if ($updates === []) {
            return "Kolom lock user belum tersedia. Jalankan migration terlebih dahulu.";
        }

        $user->forceFill($updates)->save();
        $this->writeOwnerAuditLog('telegram_unlock_user', $user, [
            'owner_telegram_id' => (string) $ownerTelegramId,
        ]);

        return implode("\n", [
            "🔓 User berhasil dibuka kuncinya",
            "User: ".$this->userDisplayName($user),
            "Efek: user bisa login kembali.",
            "Waktu: ".now()->translatedFormat('l, d F Y H:i:s').' WIB',
        ]);
    }

    private function extractEmailArgument(string $text): ?string
    {
        $argument = trim(Str::of($text)->after(' ')->before(' ')->lower()->toString());

        return filter_var($argument, FILTER_VALIDATE_EMAIL) ? $argument : null;
    }

    private function findUserByEmail(string $email): ?User
    {
        if (! Schema::hasTable('users')) {
            return null;
        }

        return User::query()
            ->whereRaw('LOWER(email) = ?', [mb_strtolower($email)])
            ->first();
    }

    private function deleteUserSessions(User $user): int
    {
        if (! Schema::hasTable('sessions') || ! Schema::hasColumn('sessions', 'user_id')) {
            return 0;
        }

        return (int) DB::table('sessions')
            ->where('user_id', $user->id)
            ->delete();
    }

    private function writeOwnerAuditLog(string $action, User $targetUser, array $changes = []): void
    {
        if (! Schema::hasTable('activity_logs')) {
            return;
        }

        ActivityLog::create([
            'user_id' => null,
            'model_type' => User::class,
            'model_id' => $targetUser->id,
            'action' => $action,
            'description' => "Owner Telegram menjalankan {$action} untuk {$targetUser->email}",
            'changes' => $changes,
        ]);
    }

    public function allowedChatIds(): array
    {
        $raw = (string) config('services.telegram.allowed_chat_ids', '');

        return collect(explode(',', $raw))
            ->map(fn ($id) => trim($id))
            ->filter()
            ->values()
            ->all();
    }

    public function notificationChatIds(): array
    {
        $raw = (string) config('services.telegram.notify_chat_ids', '');

        $ids = collect(explode(',', $raw))
            ->map(fn ($id) => trim($id))
            ->filter()
            ->values()
            ->all();

        return $ids !== [] ? $ids : $this->allowedChatIds();
    }

    private function sendNotification(string $text): void
    {
        foreach ($this->notificationChatIds() as $chatId) {
            $this->sendMessage($chatId, $text);
        }
    }

    private function userDisplayName(User $user): string
    {
        $name = trim((string) $user->name);
        $email = trim((string) $user->email);

        if ($name !== '' && $email !== '') {
            return "{$name} <{$email}>";
        }

        return $name !== '' ? $name : ($email !== '' ? $email : 'User');
    }

    public function isAllowedChat(string|int $chatId): bool
    {
        $allowed = $this->allowedChatIds();

        return $allowed !== [] && in_array((string) $chatId, $allowed, true);
    }

    private function telegramUserLine(User $user, bool $short = false): string
    {
        $name = trim((string) $user->name) ?: strtok((string) $user->email, '@') ?: 'User';
        $role = trim((string) $user->role) ?: '-';
        $department = trim((string) $user->department) ?: '-';
        $lastSeen = $user->last_seen_at;

        if (! $lastSeen) {
            $seenText = 'belum pernah tercatat';
        } else {
            $seenText = $short
                ? $lastSeen->diffForHumans()
                : $lastSeen->translatedFormat('l, d F Y H:i:s').' WIB ('.$lastSeen->diffForHumans().')';
        }

        return "{$name} ({$role}/{$department}) - {$seenText}";
    }

    private function setMaintenanceMode(bool $enabled): string
    {
        if ($enabled) {
            Cache::forever('simonpr:maintenance_mode', true);
            Cache::forever('simonpr:maintenance_changed_at', now()->toIso8601String());

            return '🛠️ Website dimatikan ke mode maintenance 503. Telegram tetap aktif untuk kontrol.';
        }

        Cache::forget('simonpr:maintenance_mode');
        Cache::forever('simonpr:maintenance_changed_at', now()->toIso8601String());

        return '✅ Website dihidupkan kembali. User sudah bisa akses normal.';
    }

    private function setReadOnlyMode(bool $enabled): string
    {
        if ($enabled) {
            Cache::forever('simonpr:read_only_mode', true);
            Cache::forever('simonpr:read_only_changed_at', now()->toIso8601String());

            return '🔒 Mode read-only aktif. User bisa melihat data, tetapi CRUD/approve dikunci.';
        }

        Cache::forget('simonpr:read_only_mode');
        Cache::forever('simonpr:read_only_changed_at', now()->toIso8601String());

        return '🔓 Mode read-only dimatikan. CRUD/approve kembali normal.';
    }

    private function modeLabel(string $mode): string
    {
        return match ($mode) {
            'maintenance' => Cache::get('simonpr:maintenance_mode', false) ? 'MAINTENANCE 503 🛠️' : 'LIVE ✅',
            'readonly' => Cache::get('simonpr:read_only_mode', false) ? 'AKTIF 🔒' : 'OFF ✅',
            default => '-',
        };
    }

    private function onlineUserCount(): int
    {
        if (! Schema::hasTable('users') || ! Schema::hasColumn('users', 'last_seen_at')) {
            return 0;
        }

        return (int) User::query()
            ->whereNotNull('last_seen_at')
            ->where('last_seen_at', '>=', now()->subMinutes(5))
            ->count();
    }

    private function ownerChatIds(): array
    {
        $raw = (string) config('services.telegram.owner_chat_ids', '');

        return collect(explode(',', $raw))
            ->map(fn ($id) => trim($id))
            ->filter()
            ->values()
            ->all();
    }

    private function isOwnerActor(string|int $fromId): bool
    {
        $owners = $this->ownerChatIds();

        return $owners !== [] && in_array((string) $fromId, $owners, true);
    }

    private function answerCallbackQuery(string $callbackId, string $text = '', bool $alert = false): bool
    {
        $token = $this->token();

        if (! $token || $callbackId === '') {
            return false;
        }

        try {
            return Http::timeout($this->timeout())
                ->asForm()
                ->post("https://api.telegram.org/bot{$token}/answerCallbackQuery", [
                    'callback_query_id' => $callbackId,
                    'text' => Str::limit($text, 180),
                    'show_alert' => $alert ? 'true' : 'false',
                ])
                ->successful();
        } catch (Throwable) {
            return false;
        }
    }

    private function editMessageText(string|int $chatId, mixed $messageId, string $text, ?array $replyMarkup = null): bool
    {
        $token = $this->token();

        if (! $token || trim((string) $chatId) === '' || ! $messageId) {
            return false;
        }

        try {
            $payload = [
                'chat_id' => (string) $chatId,
                'message_id' => (string) $messageId,
                'text' => $text,
                'disable_web_page_preview' => true,
            ];

            if ($replyMarkup !== null) {
                $payload['reply_markup'] = json_encode($replyMarkup);
            }

            return Http::timeout($this->timeout())
                ->asForm()
                ->post("https://api.telegram.org/bot{$token}/editMessageText", $payload)
                ->successful();
        } catch (Throwable) {
            return false;
        }
    }

    private function token(): ?string
    {
        $token = trim((string) config('services.telegram.bot_token', ''));

        return $token !== '' ? $token : null;
    }

    private function timeout(): int
    {
        return max(1, (int) config('services.telegram.timeout', 15));
    }

    private function safeCount(string $modelClass, string $table): int
    {
        if (! class_exists($modelClass) || ! Schema::hasTable($table)) {
            return 0;
        }

        return (int) $modelClass::query()->count();
    }

    private function pendingApprovalCount(): int
    {
        if (! Schema::hasTable('pr_receipt_approvals')) {
            return 0;
        }

        return (int) PrReceiptApproval::query()->where('status', 'PENDING')->count();
    }

    private function unreadContactCount(): int
    {
        if (! Schema::hasTable('contact_messages')) {
            return 0;
        }

        return (int) ContactMessage::query()->whereNull('read_at')->count();
    }

    private function databaseStatus(): string
    {
        try {
            DB::select('select 1');

            return 'OK ✅';
        } catch (\Throwable) {
            return 'GAGAL ❌';
        }
    }

    private function cacheStatus(): string
    {
        try {
            $key = 'telegram_bot_health_'.sha1((string) config('app.key'));
            Cache::put($key, 'ok', 10);

            return Cache::get($key) === 'ok' ? 'OK ✅' : 'Perlu cek ⚠️';
        } catch (\Throwable) {
            return 'GAGAL ❌';
        }
    }
}
