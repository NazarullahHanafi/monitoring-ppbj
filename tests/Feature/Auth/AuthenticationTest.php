<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(\App\Providers\AppServiceProvider::homeFor($user));
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }

    public function test_successful_login_and_logout_send_telegram_notifications(): void
    {
        config()->set('services.telegram.bot_token', 'TEST_TOKEN');
        config()->set('services.telegram.notify_chat_ids', '12345');

        Http::fake([
            'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
        ]);

        $user = User::factory()->create([
            'name' => 'Nazar',
            'email' => 'nazar@example.test',
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ])->assertRedirect(\App\Providers\AppServiceProvider::homeFor($user));

        Http::assertSent(function ($request) {
            $body = urldecode((string) $request->body());

            return str_contains($body, 'User login SIMONPR')
                && str_contains($body, 'Nazar <nazar@example.test>');
        });

        $this->post('/logout')->assertRedirect('/');

        Http::assertSent(function ($request) {
            $body = urldecode((string) $request->body());

            return str_contains($body, 'User logout SIMONPR')
                && str_contains($body, 'Nazar <nazar@example.test>');
        });
    }

    public function test_repeated_failed_login_sends_telegram_security_alert(): void
    {
        config()->set('services.telegram.bot_token', 'TEST_TOKEN');
        config()->set('services.telegram.notify_chat_ids', '12345');

        Http::fake([
            'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
        ]);

        $user = User::factory()->create([
            'email' => 'target@example.test',
        ]);

        for ($i = 0; $i < 3; $i++) {
            $this->post('/login', [
                'email' => $user->email,
                'password' => 'salah-total',
            ]);
        }

        Http::assertSent(function ($request) {
            $body = urldecode((string) $request->body());

            return str_contains($body, 'Alert keamanan login')
                && str_contains($body, 'target@example.test')
                && str_contains($body, 'Percobaan: 3x');
        });
    }

    public function test_locked_user_can_not_login_even_with_correct_password(): void
    {
        config()->set('services.telegram.bot_token', 'TEST_TOKEN');
        config()->set('services.telegram.notify_chat_ids', '12345');

        Http::fake([
            'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
        ]);

        $user = User::factory()->create([
            'email' => 'locked@example.test',
            'is_active' => false,
        ]);

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ])->assertSessionHasErrors('email');

        $this->assertGuest();
    }
}
