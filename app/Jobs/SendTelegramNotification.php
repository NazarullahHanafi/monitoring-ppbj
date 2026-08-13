<?php

namespace App\Jobs;

use App\Services\TelegramBotService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendTelegramNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public int $timeout = 30;

    /** @var array<int, int> */
    public array $backoff = [10, 30, 60];

    public function __construct(public readonly string $text)
    {
        $this->onConnection((string) config('services.telegram.queue_connection', config('queue.default')));
        $this->onQueue((string) config('services.telegram.queue', 'telegram'));
    }

    public function handle(TelegramBotService $telegram): void
    {
        $telegram->sendAutomaticNotificationNow($this->text);
    }
}
