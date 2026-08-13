<?php

namespace Tests\Feature;

use App\Jobs\SendTelegramNotification;
use App\Models\User;
use App\Services\TelegramBotService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class TelegramNotificationQueueTest extends TestCase
{
    use RefreshDatabase;

    public function test_automatic_notification_is_queued_without_waiting_for_telegram_http(): void
    {
        config()->set('services.telegram.bot_token', 'TEST_TOKEN');
        config()->set('services.telegram.notify_chat_ids', '12345');
        config()->set('services.telegram.queue_connection', 'database');
        config()->set('services.telegram.queue', 'telegram');

        Queue::fake();
        Http::preventStrayRequests();

        $user = User::factory()->create();

        app(TelegramBotService::class)->notifyUserLogin($user, '198.51.100.25');

        Queue::assertPushedOn('telegram', SendTelegramNotification::class, function ($job) use ($user) {
            return str_contains($job->text, (string) $user->email)
                && $job->connection === 'database';
        });

        Http::assertNothingSent();
    }
}
