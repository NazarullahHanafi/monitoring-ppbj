<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\ChatbotService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class ChatbotInteractionReliabilityTest extends TestCase
{
    use RefreshDatabase;

    public function test_clear_removes_only_current_account_history_and_email_draft(): void
    {
        $user = User::factory()->create();
        Cache::put('chatbot_history_user_'.$user->id, ['old'], 3600);
        Cache::put('chatbot_email_session_'.$user->id, ['draft'], 3600);
        Cache::put('chatbot_history_user_99999', ['other account'], 3600);
        $this->actingAs($user)->deleteJson('/chatbot/clear')->assertOk()->assertJsonPath('success', true);
        $this->assertFalse(Cache::has('chatbot_history_user_'.$user->id));
        $this->assertFalse(Cache::has('chatbot_email_session_'.$user->id));
        $this->assertSame(['other account'], Cache::get('chatbot_history_user_99999'));
    }

    public function test_clear_failure_reports_a_failed_http_status_and_existing_access_rules_remain(): void
    {
        $user = User::factory()->create();
        $this->mock(ChatbotService::class, function ($mock) {
            $mock->shouldReceive('clearChatHistory')->once()->andThrow(new \RuntimeException('Simulated cache failure'));
        });
        $this->actingAs($user)->deleteJson('/chatbot/clear')->assertStatus(500)->assertJsonPath('success', false);
        $this->actingAs(User::factory()->create(['role' => 'viewer']))->deleteJson('/chatbot/clear')->assertForbidden();
    }

    public function test_chat_budget_does_not_block_history_clear_or_other_tools(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($user);
        foreach (range(1, 5) as $unused) {
            RateLimiter::hit('chatbot-conversation:'.sha1((string) $user->id), 60);
        }
        $this->postJson('/chatbot/chat', ['message' => 'Test'])->assertStatus(429);
        $this->deleteJson('/chatbot/clear')->assertOk();
        $this->getJson('/chatbot/quick-replies')->assertOk();
        $this->getJson('/chatbot/artisan/list')->assertForbidden();
        $prefixes = [];
        foreach (app('router')->getRoutes() as $route) {
            if (! str_starts_with($route->uri(), 'chatbot/')) {
                continue;
            }
            $middleware = collect($route->gatherMiddleware())->first(fn ($item) => str_starts_with($item, 'throttle:'));
            $prefix = explode(',', $middleware ?? '')[2] ?? '';
            $this->assertNotSame('', $prefix);
            $this->assertNotContains($prefix, $prefixes);
            $prefixes[] = $prefix;
        }
        $this->assertCount(9, $prefixes);
    }

    public function test_cached_history_keeps_each_exchange_once_instead_of_repeated_full_context(): void
    {
        config(['services.groq.api_key' => 'synthetic-test-key']);
        Http::fake(['api.groq.com/*' => Http::response(['choices' => [['message' => ['content' => 'Synthetic answer']]]])]);
        $service = app(ChatbotService::class);
        $messages = [['role' => 'user', 'content' => 'Older question'], ['role' => 'assistant', 'content' => 'Older answer'], ['role' => 'user', 'content' => 'Latest question']];
        $result = $service->chat($messages, 'synthetic-history');
        $this->assertTrue($result['success']);
        $saved = $service->getChatHistory('synthetic-history');
        $this->assertSame([end($messages)], $saved[0]['messages']);
        $this->assertSame('Synthetic answer', $saved[0]['response']);
        Http::assertSent(fn ($request) => count($request['messages']) === 4 && $request['messages'][3]['content'] === 'Latest question');
    }

    public function test_widget_receives_the_actual_department_and_input_limits(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'operasional']));
        $html = view('components.chatbot')->render();
        $this->assertStringContainsString('"department":"operasional"', $html);
        $this->assertStringContainsString('maxlength="2000"', $html);
        $this->assertStringContainsString('PR Saya', $html);
    }

    public function test_quick_replies_are_scoped_to_department_without_fetching_business_records(): void
    {
        foreach (['umum' => 2, 'operasional' => 3] as $department => $count) {
            $this->actingAs(User::factory()->create(['department' => $department]));
            $this->getJson('/chatbot/quick-replies')->assertOk()->assertJsonCount($count, 'replies');
        }
    }
}
