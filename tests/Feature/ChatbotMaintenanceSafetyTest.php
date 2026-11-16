<?php

namespace Tests\Feature;

use App\Http\Controllers\ArtisanCommandController;
use App\Models\User;
use App\Services\MaintenanceCommandGate;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\Console\Output\NullOutput;
use Tests\TestCase;

class ChatbotMaintenanceSafetyTest extends TestCase
{
    use RefreshDatabase;

    private string $guardPath;

    protected function setUp(): void
    {
        parent::setUp();
        $this->guardPath = tempnam(sys_get_temp_dir(), 'maintenance-test-');
        $this->app->instance(MaintenanceCommandGate::class, new MaintenanceCommandGate($this->guardPath));
    }

    protected function tearDown(): void
    {
        @unlink($this->guardPath);
        parent::tearDown();
    }

    private function admin(): User
    {
        return User::factory()->create(['role' => 'superadmin', 'department' => 'umum']);
    }

    public function test_parser_accepts_only_complete_whitelisted_commands(): void
    {
        $commands = ['cache:clear', 'config:clear', 'view:clear', 'route:clear', 'optimize:clear', 'config:cache', 'route:cache', 'view:cache', 'optimize'];
        foreach ($commands as $command) {
            foreach (['', 'php artisan ', 'artisan ', 'run ', 'jalankan ', 'execute '] as $prefix) {
                $this->assertSame($command, ArtisanCommandController::parseCommand(strtoupper($prefix.$command)));
            }
        }
        foreach (['jangan jalankan cache:clear', 'apa itu cache:clear?', 'tolong php artisan optimize', 'cache:clear --store=redis', 'cache:clear; optimize', "view:clear\noptimize", "view:clear\0", '`view:clear`', 'migrate:fresh', 'artisan migrate:fresh', 'optimize:clearer', 'prefixcache:clear'] as $message) {
            $this->assertNull(ArtisanCommandController::parseCommand($message), $message);
        }
    }

    public function test_malformed_or_ambiguous_input_never_executes_and_returns_private_validation_errors(): void
    {
        $this->actingAs($this->admin());
        Artisan::shouldReceive('call')->never();
        foreach ([null, [], ['view:clear'], 1, str_repeat('x', 201), 'apa itu view:clear?', 'jangan jalankan optimize', 'artisan migrate:fresh', 'view:clear --quiet', "view:clear\noptimize"] as $message) {
            $response = app(ArtisanCommandController::class)->executeCommand(Request::create('/', 'POST', compact('message')));
            $this->assertSame(422, $response->getStatusCode());
            $this->assertFalse($response->getData(true)['success']);
            $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
        }
        $this->assertSame('', file_get_contents($this->guardPath));
    }

    public function test_both_entry_points_enforce_roles_and_read_only_mode(): void
    {
        Artisan::shouldReceive('call')->never();
        foreach ([['user', 'umum'], ['superadmin', 'operasional'], ['viewer', 'umum']] as [$role, $department]) {
            $this->actingAs(User::factory()->create(compact('role', 'department')));
            foreach (['/chatbot/chat', '/chatbot/artisan/execute'] as $path) {
                $this->postJson($path, ['message' => 'view:clear'])->assertForbidden();
            }
            $this->getJson('/chatbot/artisan/list')->assertForbidden();
        }
        $this->actingAs($this->admin());
        Cache::put('simonpr:read_only_mode', true);
        foreach (['/chatbot/chat', '/chatbot/artisan/execute'] as $path) {
            $this->postJson($path, ['message' => 'view:clear'])->assertForbidden();
        }
        $this->getJson('/chatbot/artisan/list')->assertOk()->assertHeader('Cache-Control', 'no-store, private');
    }

    public function test_guest_cannot_invoke_commands_through_chat_or_direct_route(): void
    {
        Artisan::shouldReceive('call')->never();
        $this->postJson('/chatbot/chat', ['message' => 'artisan view:clear'])->assertUnauthorized();
        $this->postJson('/chatbot/artisan/execute', ['message' => 'artisan view:clear'])->assertUnauthorized();
        $this->getJson('/chatbot/artisan/list')->assertUnauthorized();
    }

    public function test_chat_supports_all_nine_commands_and_rejects_questions_without_running_them(): void
    {
        $this->withoutMiddleware(ThrottleRequests::class)->actingAs($this->admin());
        foreach (['cache:clear', 'config:clear', 'view:clear', 'route:clear', 'optimize:clear', 'config:cache', 'route:cache', 'view:cache', 'optimize'] as $command) {
            Artisan::shouldReceive('call')->once()->with($command, [], \Mockery::type(NullOutput::class))->andReturn(0);
            $this->postJson('/chatbot/chat', ['message' => $command])->assertOk()
                ->assertJsonPath('success', true)->assertJsonPath('command_executed', $command)
                ->assertHeader('Cache-Control', 'no-store, private');
            $this->travel(61)->seconds();
        }
        $this->postJson('/chatbot/chat', ['message' => 'jangan jalankan cache:clear'])->assertUnprocessable();
        $this->postJson('/chatbot/chat', ['message' => 'apa itu config:cache?'])->assertUnprocessable();
    }

    public function test_nonzero_exit_and_throwable_never_report_success_or_leak_output_and_unlock(): void
    {
        $this->actingAs($this->admin());
        Artisan::shouldReceive('call')->once()->andReturn(1);
        Artisan::shouldReceive('call')->once()->andThrow(new \Error('/home/private/secret-token'));
        Artisan::shouldReceive('call')->once()->andReturn(0);
        foreach (range(1, 2) as $unused) {
            $this->postJson('/chatbot/artisan/execute', ['message' => 'view:clear'])->assertStatus(500)
                ->assertJsonPath('success', false)->assertDontSee('secret-token')->assertDontSee('/home/private');
        }
        $this->postJson('/chatbot/artisan/execute', ['message' => 'view:clear'])->assertOk()->assertJsonPath('success', true);
    }

    public function test_busy_guard_is_shared_across_routes_and_never_waits_or_executes(): void
    {
        $this->actingAs($this->admin());
        Artisan::shouldReceive('call')->never();
        $held = fopen($this->guardPath, 'c+');
        $this->assertTrue(flock($held, LOCK_EX | LOCK_NB));
        try {
            foreach (['/chatbot/chat', '/chatbot/artisan/execute'] as $path) {
                $this->postJson($path, ['message' => 'view:clear'])->assertConflict()->assertJsonPath('success', false);
            }
        } finally {
            fclose($held);
        }
    }

    public function test_global_budget_survives_cache_flush_and_is_shared_between_admins_and_routes(): void
    {
        $this->freezeTime();
        $this->withoutMiddleware(ThrottleRequests::class);
        Artisan::shouldReceive('call')->times(6)->andReturnUsing(function () {
            Cache::flush(); // Simulate the effect of cache:clear on an isolated testing store.

            return 0;
        });
        $admins = [$this->admin(), $this->admin()];
        foreach (range(0, 4) as $i) {
            $this->actingAs($admins[$i % 2])->postJson($i % 2 ? '/chatbot/chat' : '/chatbot/artisan/execute', ['message' => 'cache:clear'])->assertOk();
        }
        foreach (['/chatbot/chat', '/chatbot/artisan/execute'] as $path) {
            $this->postJson($path, ['message' => 'cache:clear'])->assertTooManyRequests()->assertHeader('Retry-After', '60');
        }
        $this->travel(61)->seconds();
        $this->postJson('/chatbot/chat', ['message' => 'cache:clear'])->assertOk();
    }

    public function test_corrupt_or_unavailable_guard_fails_closed_without_running_commands(): void
    {
        $this->withoutMiddleware(ThrottleRequests::class)->actingAs($this->admin());
        Artisan::shouldReceive('call')->never();
        foreach (['bad json', '{}', '["invalid"]', '['.str_repeat('1,', 5).'1]', str_repeat('x', 1025)] as $contents) {
            file_put_contents($this->guardPath, $contents);
            $this->postJson('/chatbot/artisan/execute', ['message' => 'view:clear'])->assertStatus(500)->assertJsonPath('success', false);
            $this->assertSame($contents, file_get_contents($this->guardPath), 'Corrupt guard must never admit or record an execution');
        }
        $this->app->instance(MaintenanceCommandGate::class, new MaintenanceCommandGate($this->guardPath.'/missing'));
        $this->postJson('/chatbot/artisan/execute', ['message' => 'view:clear'])->assertStatus(500);
    }

    public function test_nested_worker_cannot_enter_even_when_application_cache_is_flushed(): void
    {
        $gate = app(MaintenanceCommandGate::class);
        $result = $gate->run(function () use ($gate) {
            Cache::flush();
            $this->assertSame(['state' => 'busy'], $gate->run(fn () => $this->fail('Concurrent worker entered')));

            return 0;
        });
        $this->assertSame(['state' => 'completed', 'exit_code' => 0], $result);
        $this->assertSame(['state' => 'completed', 'exit_code' => 0], $gate->run(fn () => 0));
    }
}
