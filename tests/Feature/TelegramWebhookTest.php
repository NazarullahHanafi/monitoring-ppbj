<?php

namespace Tests\Feature;

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
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

    public function test_telegram_webhook_can_return_online_and_last_seen_users(): void
    {
        config()->set('services.telegram.bot_token', 'TEST_TOKEN');
        config()->set('services.telegram.webhook_secret', 'secret-ok');
        config()->set('services.telegram.allowed_chat_ids', '12345');

        User::factory()->create([
            'name' => 'Nazar',
            'role' => 'Superadmin',
            'department' => 'Umum',
            'last_seen_at' => now(),
        ]);

        User::factory()->create([
            'name' => 'Riko',
            'role' => 'User',
            'department' => 'Operasional',
            'last_seen_at' => now()->subHours(2),
        ]);

        Http::fake([
            'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
        ]);

        $this->postJson('/telegram/webhook/secret-ok', [
            'message' => [
                'chat' => ['id' => 12345],
                'text' => '/online',
            ],
        ])->assertOk();

        $this->postJson('/telegram/webhook/secret-ok', [
            'message' => [
                'chat' => ['id' => 12345],
                'text' => '/users',
            ],
        ])->assertOk();

        Http::assertSent(function ($request) {
            return str_contains((string) $request->body(), 'User+sedang+online')
                && str_contains((string) $request->body(), 'Nazar');
        });

        Http::assertSent(function ($request) {
            return str_contains((string) $request->body(), 'Terakhir+aktif')
                && str_contains((string) $request->body(), 'Riko');
        });
    }

    public function test_telegram_ops_callback_requires_owner_actor(): void
    {
        config()->set('services.telegram.bot_token', 'TEST_TOKEN');
        config()->set('services.telegram.webhook_secret', 'secret-ok');
        config()->set('services.telegram.allowed_chat_ids', '12345');
        config()->set('services.telegram.owner_chat_ids', '1191851650');

        Cache::forget('simonpr:read_only_mode');

        Http::fake([
            'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
        ]);

        $this->postJson('/telegram/webhook/secret-ok', [
            'callback_query' => [
                'id' => 'callback-1',
                'from' => ['id' => 99999],
                'message' => [
                    'chat' => ['id' => 12345],
                    'message_id' => 77,
                ],
                'data' => 'ops:readonly:on',
            ],
        ])->assertOk();

        $this->assertFalse((bool) Cache::get('simonpr:read_only_mode', false));
    }

    public function test_telegram_owner_can_toggle_read_only_mode(): void
    {
        config()->set('services.telegram.bot_token', 'TEST_TOKEN');
        config()->set('services.telegram.webhook_secret', 'secret-ok');
        config()->set('services.telegram.allowed_chat_ids', '12345');
        config()->set('services.telegram.owner_chat_ids', '1191851650');

        Cache::forget('simonpr:read_only_mode');

        Http::fake([
            'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
        ]);

        $this->postJson('/telegram/webhook/secret-ok', [
            'callback_query' => [
                'id' => 'callback-2',
                'from' => ['id' => 1191851650],
                'message' => [
                    'chat' => ['id' => 12345],
                    'message_id' => 78,
                ],
                'data' => 'ops:readonly:on',
            ],
        ])->assertOk();

        $this->assertTrue((bool) Cache::get('simonpr:read_only_mode', false));
    }

    public function test_telegram_owner_only_user_commands_work(): void
    {
        config()->set('services.telegram.bot_token', 'TEST_TOKEN');
        config()->set('services.telegram.webhook_secret', 'secret-ok');
        config()->set('services.telegram.allowed_chat_ids', '12345');
        config()->set('services.telegram.owner_chat_ids', '1191851650');

        $user = User::factory()->create([
            'name' => 'Target User',
            'email' => 'target@example.test',
            'is_active' => true,
        ]);

        \DB::table('sessions')->insert([
            'id' => 'session-target-1',
            'user_id' => $user->id,
            'ip_address' => '127.0.0.1',
            'user_agent' => 'phpunit',
            'payload' => 'payload',
            'last_activity' => time(),
        ]);

        Http::fake([
            'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
        ]);

        $this->postJson('/telegram/webhook/secret-ok', [
            'message' => [
                'chat' => ['id' => 12345],
                'from' => ['id' => 99999],
                'text' => '/lock_user target@example.test',
            ],
        ])->assertOk();

        $this->assertTrue((bool) $user->fresh()->is_active);

        $this->postJson('/telegram/webhook/secret-ok', [
            'message' => [
                'chat' => ['id' => 12345],
                'from' => ['id' => 1191851650],
                'text' => '/force_logout_user target@example.test',
            ],
        ])->assertOk();

        $this->assertDatabaseMissing('sessions', ['id' => 'session-target-1']);

        $this->postJson('/telegram/webhook/secret-ok', [
            'message' => [
                'chat' => ['id' => 12345],
                'from' => ['id' => 1191851650],
                'text' => '/lock_user target@example.test',
            ],
        ])->assertOk();

        $this->assertFalse((bool) $user->fresh()->is_active);

        $this->postJson('/telegram/webhook/secret-ok', [
            'message' => [
                'chat' => ['id' => 12345],
                'from' => ['id' => 1191851650],
                'text' => '/unlock_user target@example.test',
            ],
        ])->assertOk();

        $this->assertTrue((bool) $user->fresh()->is_active);
    }

    public function test_soft_maintenance_blocks_website_but_keeps_telegram_webhook_open(): void
    {
        config()->set('services.telegram.webhook_secret', 'secret-ok');

        Cache::forever('simonpr:maintenance_mode', true);

        $this->get('/')->assertStatus(503);

        $this->postJson('/telegram/webhook/wrong-secret', [])
            ->assertNotFound();

        Cache::forget('simonpr:maintenance_mode');
    }
}
