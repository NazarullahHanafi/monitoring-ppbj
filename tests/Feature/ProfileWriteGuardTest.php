<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class ProfileWriteGuardTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_cannot_bypass_viewer_or_global_read_only_guards(): void
    {
        foreach ([true, false] as $viewer) {
            $user = User::factory()->create(['role' => $viewer ? 'viewer' : 'user', 'department' => 'umum']);
            $this->actingAs($user);
            Cache::put('simonpr:read_only_mode', ! $viewer);
            $this->patchJson(route('profile.update'), ['name' => 'Changed', 'email' => 'changed@example.com'])->assertForbidden();
            $this->deleteJson(route('profile.destroy'), ['password' => 'password'])->assertForbidden();
            $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => $user->name, 'email' => $user->email]);
            $this->assertAuthenticatedAs($user);
        }
    }

    public function test_malformed_delete_passwords_are_validation_errors_and_never_delete_or_logout(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        foreach ([['array'], str_repeat('a', 1025), "invalid\0password", 'wrong-password'] as $password) {
            $this->deleteJson(route('profile.destroy'), compact('password'))->assertUnprocessable()->assertJsonValidationErrors('password');
            $this->assertDatabaseHas('users', ['id' => $user->id]);
            $this->assertAuthenticatedAs($user);
            $this->assertSame([], session('_old_input', []));
        }
    }

    public function test_profile_update_budget_does_not_consume_deletion_budget(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        for ($i = 0; $i < 20; $i++) {
            RateLimiter::hit('profile-update:'.sha1((string) $user->id), 60);
        }
        $this->patchJson(route('profile.update'), ['name' => 'Changed', 'email' => 'changed@example.com'])->assertTooManyRequests();
        $this->deleteJson(route('profile.destroy'), ['password' => 'wrong'])->assertUnprocessable();
        for ($i = 0; $i < 5; $i++) {
            RateLimiter::hit('profile-delete:'.sha1((string) $user->id), 60);
        }
        $this->deleteJson(route('profile.destroy'), ['password' => 'password'])->assertTooManyRequests();
        $this->assertDatabaseHas('users', ['id' => $user->id]);
        foreach (['profile.update', 'profile.destroy'] as $name) {
            $this->assertContains('readonly.block', app('router')->getRoutes()->getByName($name)->gatherMiddleware());
        }
    }
}
