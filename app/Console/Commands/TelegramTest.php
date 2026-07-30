<?php

namespace App\Console\Commands;

use App\Services\TelegramBotService;
use Illuminate\Console\Command;

class TelegramTest extends Command
{
    protected $signature = 'telegram:test {message=✅ SIMONPR Telegram aktif. Command /tele dan /list sudah siap.}';

    protected $description = 'Send a test Telegram message to the first allowed chat ID.';

    public function handle(TelegramBotService $telegram): int
    {
        $chatId = $telegram->allowedChatIds()[0] ?? null;

        if (! $chatId) {
            $this->error('TELEGRAM_ALLOWED_CHAT_IDS belum diatur.');

            return self::FAILURE;
        }

        if (! $telegram->sendMessage($chatId, (string) $this->argument('message'))) {
            $this->error('Pesan test Telegram gagal dikirim. Cek token/chat ID/koneksi server.');

            return self::FAILURE;
        }

        $this->info('Pesan test Telegram terkirim ke chat ID '.$chatId);

        return self::SUCCESS;
    }
}
