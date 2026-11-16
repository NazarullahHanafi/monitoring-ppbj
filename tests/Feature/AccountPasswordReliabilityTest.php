<?php

namespace Tests\Feature;

use App\Models\User;
use App\Rules\PasswordStorageLimits;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

class AccountPasswordReliabilityTest extends TestCase
{
    use RefreshDatabase;

    public function test_json_change_rotates_remember_token_updates_only_credentials_and_never_returns_secrets(): void
    {
        $actor = $this->user();
        $other = $this->user();
        $token = $actor->remember_token;
        $otherHash = $other->password;
        DB::table('users')->where('id', $actor->id)->update(['name' => 'Concurrent name', 'buyer_name' => 'Concurrent buyer']);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $response = $this->actingAs($actor)->postJson(route('account.password'), $this->payload() + ['user_id' => $other->id])
            ->assertOk()->assertJsonPath('success', true)->assertHeader('Cache-Control', 'no-store, private')->assertDontSee('NewSecret123!')->assertDontSee($token);
        $queries = collect(DB::getQueryLog())->pluck('query');
        DB::disableQueryLog();
        $this->assertLessThanOrEqual(2, $queries->count());
        $this->assertTrue(Hash::check('NewSecret123!', $actor->fresh()->password));
        $this->assertTrue(Hash::check('NewSecret123!', $actor->password));
        $this->assertNotSame($token, $actor->fresh()->remember_token);
        $this->assertSame(60, strlen($actor->fresh()->remember_token));
        $this->assertSame($otherHash, $other->fresh()->password);
        $this->assertDatabaseHas('users', ['id' => $actor->id, 'name' => 'Concurrent name', 'buyer_name' => 'Concurrent buyer']);
        $this->assertSame([], session('_old_input', []));
        $this->assertCount(2, $response->json());
    }

    public function test_all_password_writers_reject_null_arrays_and_excess_bytes_without_changing_credentials(): void
    {
        $this->withoutMiddleware(ThrottleRequests::class);
        $actor = $this->user();
        $this->actingAs($actor);
        $hash = $actor->password;
        $invalid = ["Aa1!abcd\0tail", ['array'], 'Aa1!'.str_repeat('a', 69), 'Aa1!'.str_repeat('é', 35), str_repeat('x', 256)];
        foreach ($invalid as $password) {
            $payload = ['current_password' => 'password', 'password' => $password, 'password_confirmation' => $password];
            $this->postJson(route('account.password'), $payload)->assertUnprocessable()->assertJsonValidationErrors('password');
            $this->putJson(route('password.update'), $payload)->assertUnprocessable()->assertJsonValidationErrors('password');
        }
        foreach ([['array'], str_repeat('a', 1025), "old\0password"] as $current) {
            $payload = $this->payload();
            $payload['current_password'] = $current;
            $this->postJson(route('account.password'), $payload)->assertUnprocessable();
            $this->putJson(route('password.update'), $payload)->assertUnprocessable();
            $this->postJson('/confirm-password', ['password' => $current])->assertUnprocessable();
        }
        Auth::logout();
        foreach ($invalid as $password) {
            $this->postJson(route('password.store'), ['token' => 'synthetic', 'email' => $actor->email, 'password' => $password, 'password_confirmation' => $password])->assertUnprocessable()->assertJsonValidationErrors('password');
        }
        $this->postJson(route('password.store'), ['token' => ['invalid'], 'email' => ['invalid'], 'password' => 'NewSecret123!', 'password_confirmation' => 'NewSecret123!'])->assertUnprocessable()->assertJsonValidationErrors(['token', 'email']);
        $this->assertSame($hash, $actor->fresh()->password);
        $this->assertSame([], session('_old_input', []));
    }

    public function test_stale_authenticated_password_cannot_overwrite_a_newer_password_on_either_route(): void
    {
        foreach (['account.password', 'password.update'] as $route) {
            $actor = $this->user();
            $this->actingAs($actor);
            $newerHash = Hash::make('ConcurrentReset123!');
            DB::table('users')->where('id', $actor->id)->update(['password' => $newerHash, 'remember_token' => 'newer-token']);
            $response = $route === 'account.password' ? $this->postJson(route($route), $this->payload()) : $this->putJson(route($route), $this->payload());
            $response->assertConflict()->assertJsonValidationErrors('current_password')->assertDontSee('NewSecret123!')->assertDontSee('ConcurrentReset123!');
            $this->assertSame($newerHash, $actor->fresh()->password);
            $this->assertSame('newer-token', $actor->fresh()->remember_token);
        }
    }

    public function test_fresh_role_and_active_state_are_checked_again_before_saving(): void
    {
        foreach ([['role' => 'viewer'], ['is_active' => false]] as $changes) {
            $actor = $this->user();
            $this->actingAs($actor);
            $hash = $actor->password;
            DB::table('users')->where('id', $actor->id)->update($changes);
            $this->postJson(route('account.password'), $this->payload())->assertForbidden();
            $this->assertSame($hash, $actor->fresh()->password);
        }
    }

    public function test_reset_with_valid_token_preserves_boundary_password_and_html_contract_and_never_flashes_secrets(): void
    {
        $actor = $this->user();
        $token = Password::broker()->createToken($actor);
        $oldRemember = $actor->remember_token;
        $password = 'Aa1!'.str_repeat('é', 34);
        $this->post(route('password.store'), ['email' => $actor->email, 'token' => $token, 'password' => $password, 'password_confirmation' => $password])
            ->assertRedirect(route('login'))->assertSessionHasNoErrors();
        $this->assertTrue(Hash::check($password, $actor->fresh()->password));
        $this->assertNotSame($oldRemember, $actor->fresh()->remember_token);
        $this->from('/reset-password/synthetic')->post(route('password.store'), ['email' => $actor->email, 'token' => $token, 'password' => 'AnotherSecret123!', 'password_confirmation' => 'AnotherSecret123!'])
            ->assertRedirect('/reset-password/synthetic')->assertSessionHasErrors('email');
        foreach (['password', 'password_confirmation', 'token'] as $field) {
            $this->assertArrayNotHasKey($field, session('_old_input', []));
        }
        $this->assertTrue(Hash::check($password, $actor->fresh()->password));
    }

    public function test_change_routes_share_attempt_budget_and_read_only_guard_while_confirmation_has_its_own_budget(): void
    {
        $this->actingAs($this->user('viewer'))->putJson(route('password.update'), $this->payload())->assertForbidden();
        $actor = $this->user();
        $this->actingAs($actor);
        Cache::put('simonpr:read_only_mode', true);
        $this->putJson(route('password.update'), $this->payload())->assertForbidden();
        Cache::forget('simonpr:read_only_mode');
        $this->actingAs($this->user());
        $bad = $this->payload();
        $bad['current_password'] = 'WrongSecret123!';
        for ($i = 0; $i < 3; $i++) {
            $this->postJson(route('account.password'), $bad)->assertUnprocessable();
        }
        for ($i = 0; $i < 2; $i++) {
            $this->putJson(route('password.update'), $bad)->assertUnprocessable();
        }
        $this->postJson(route('account.password'), $bad)->assertTooManyRequests();
        $this->putJson(route('password.update'), $bad)->assertTooManyRequests();
        $this->post('/confirm-password', ['password' => 'password'])->assertRedirect();
        $this->get(route('account.edit'))->assertOk()->assertSee('account-password.js')->assertSee('novalidate', false)->assertDontSee('Math.random', false);
        Auth::logout();
        for ($i = 0; $i < 5; $i++) {
            $this->postJson(route('password.store'), [])->assertUnprocessable();
        }
        $this->postJson(route('password.store'), [])->assertTooManyRequests();
    }

    public function test_storage_rule_honors_configured_hasher_without_forcing_bcrypt_limit_on_argon(): void
    {
        $rules = ['bail', 'required', 'string', 'max:255', new PasswordStorageLimits];
        config(['hashing.driver' => 'argon2id']);
        $this->assertTrue(validator(['password' => str_repeat('é', 100)], ['password' => $rules])->passes());
        $this->assertFalse(validator(['password' => "Aa1!abc\0tail"], ['password' => $rules])->passes());
        config(['hashing.driver' => 'bcrypt']);
        $this->assertFalse(validator(['password' => str_repeat('é', 100)], ['password' => $rules])->passes());
        $this->assertTrue(validator(['password' => 'Aa1!'.str_repeat('é', 34)], ['password' => $rules])->passes());
    }

    private function user(string $role = 'user'): User
    {
        return User::factory()->create(['department' => 'umum', 'role' => $role, 'is_active' => true]);
    }

    private function payload(): array
    {
        return ['current_password' => 'password', 'password' => 'NewSecret123!', 'password_confirmation' => 'NewSecret123!'];
    }
}
