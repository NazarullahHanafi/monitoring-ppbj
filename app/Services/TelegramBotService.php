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

        match ($command) {
            '/tele', 'tele', '/status', 'status' => $this->sendMessage($chatId, $this->statusText()),
            '/list', 'list' => $this->sendMessage($chatId, $this->activityListText()),
            '/help', 'help', '/start', 'start' => $this->sendMessage($chatId, $this->helpText()),
            default => $this->sendMessage($chatId, "Aku belum kenal command itu 😄\n\n".$this->helpText()),
        };
    }

    public function sendMessage(string|int $chatId, string $text): bool
    {
        $token = $this->token();

        if (! $token || trim((string) $chatId) === '') {
            return false;
        }

        try {
            $response = Http::timeout($this->timeout())
                ->asForm()
                ->post("https://api.telegram.org/bot{$token}/sendMessage", [
                    'chat_id' => (string) $chatId,
                    'text' => $text,
                    'disable_web_page_preview' => true,
                ]);

            return $response->successful();
        } catch (Throwable) {
            return false;
        }
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
                    'allowed_updates' => json_encode(['message', 'edited_message']),
                ]);

            return $response->json() ?: ['ok' => false, 'description' => $response->body()];
        } catch (Throwable) {
            return ['ok' => false, 'description' => 'Tidak dapat terhubung ke Telegram API dari server.'];
        }
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
            '/help — daftar command',
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

    public function isAllowedChat(string|int $chatId): bool
    {
        $allowed = $this->allowedChatIds();

        return $allowed !== [] && in_array((string) $chatId, $allowed, true);
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
