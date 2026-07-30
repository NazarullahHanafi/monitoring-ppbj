<?php

namespace App\Console\Commands;

use App\Services\TelegramBotService;
use Illuminate\Console\Command;

class TelegramSetWebhook extends Command
{
    protected $signature = 'telegram:set-webhook {--url= : URL webhook lengkap}';

    protected $description = 'Register SIMONPR Telegram bot webhook URL.';

    public function handle(TelegramBotService $telegram): int
    {
        $secret = (string) config('services.telegram.webhook_secret');

        if ($secret === '') {
            $this->error('TELEGRAM_WEBHOOK_SECRET belum diatur.');

            return self::FAILURE;
        }

        $url = (string) ($this->option('url') ?: rtrim((string) config('app.url'), '/').'/telegram/webhook/'.$secret);

        if (! filter_var($url, FILTER_VALIDATE_URL)) {
            $this->error('URL webhook tidak valid.');

            return self::FAILURE;
        }

        $result = $telegram->setWebhook($url);

        if (($result['ok'] ?? false) !== true) {
            $this->error('Set webhook gagal: '.($result['description'] ?? 'unknown error'));

            return self::FAILURE;
        }

        $this->info('Webhook Telegram aktif: '.$url);

        $commandsResult = $telegram->setCommands();

        if (($commandsResult['ok'] ?? false) !== true) {
            $this->warn('Webhook aktif, tapi command menu gagal didaftarkan: '.($commandsResult['description'] ?? 'unknown error'));

            return self::SUCCESS;
        }

        $this->info('Command menu Telegram aktif. Klik / di Telegram untuk melihat daftar command.');

        return self::SUCCESS;
    }
}
