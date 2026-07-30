<?php

namespace Tests\Feature;

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class TelegramWebhookTest extends TestCase
{
    use RefreshDatabase;

    public function test_telegram_webhook_rejects_wrong_secret(): void
    {
        config()->set('services.telegram.webhook_secret', 'secret-ok');

        $this->postJson('/telegram/webhook/wrong-secret', [])
            ->assertNotFound();
    }

    public function test_telegram_webhook_rejects_unknown_chat_id(): void
    {
        config()->set('services.telegram.bot_token', 'TEST_TOKEN');
        config()->set('services.telegram.webhook_secret', 'secret-ok');
        config()->set('services.telegram.allowed_chat_ids', '12345');

        Http::fake([
            'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
        ]);

        $this->postJson('/telegram/webhook/secret-ok', [
            'message' => [
                'chat' => ['id' => 99999],
                'text' => '/tele',
            ],
        ])->assertOk();

        Http::assertSent(function ($request) {
            return str_contains((string) $request->url(), '/sendMessage')
                && str_contains((string) $request->body(), 'Akses+Telegram+SIMONPR+ditolak');
        });
    }

    public function test_telegram_webhook_can_return_status_and_activity_list(): void
    {
        config()->set('services.telegram.bot_token', 'TEST_TOKEN');
        config()->set('services.telegram.webhook_secret', 'secret-ok');
        config()->set('services.telegram.allowed_chat_ids', '12345');

        $user = User::factory()->create(['name' => 'Nazar']);
        ActivityLog::create([
            'user_id' => $user->id,
            'model_type' => User::class,
            'model_id' => $user->id,
            'action' => 'testing',
            'description' => 'Aktivitas test Telegram',
        ]);

        Http::fake([
            'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
        ]);

        $this->postJson('/telegram/webhook/secret-ok', [
            'message' => [
                'chat' => ['id' => 12345],
                'text' => '/tele',
            ],
        ])->assertOk();

        $this->postJson('/telegram/webhook/secret-ok', [
            'message' => [
                'chat' => ['id' => 12345],
                'text' => '/list',
            ],
        ])->assertOk();

        Http::assertSent(function ($request) {
            return str_contains((string) $request->body(), 'SIMONPR+Monitor');
        });

        Http::assertSent(function ($request) {
            return str_contains((string) $request->body(), 'Aktivitas+test+Telegram');
        });
    }
}
