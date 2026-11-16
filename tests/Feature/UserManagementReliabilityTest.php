<?php

namespace Tests\Feature;

use App\Models\User;
use Egulias\EmailValidator\EmailValidator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class UserManagementReliabilityTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $this->actingAs($this->admin);
        // Isolate external DNS; production retains email:rfc,dns validation.
        $this->mock(EmailValidator::class, fn ($mock) => $mock->shouldReceive('isValid')->andReturnUsing(fn ($value) => filter_var($value, FILTER_VALIDATE_EMAIL) !== false));
    }

    private function account(array $extra = []): array
    {
        return $extra + ['name' => 'Synthetic User', 'email' => 'synthetic@example.test', 'role' => 'user', 'department' => 'umum', 'password' => 'SyntheticPass123!'];
    }

    public function test_create_edit_password_and_delete_preserve_contracts_and_private_headers(): void
    {
        Cache::put('user_stats', ['old'], 300);
        $this->postJson('/users', $this->account(['email' => ' SYNTHETIC@example.test ']))->assertOk()->assertJsonPath('success', true)->assertHeader('Cache-Control', 'no-store, private');
        $user = User::where('email', 'synthetic@example.test')->firstOrFail();
        $this->assertTrue(Hash::check('SyntheticPass123!', $user->password));
        $this->assertFalse(Cache::has('user_stats'));
        $this->putJson('/users/'.$user->id, $this->account(['name' => 'Renamed User', 'email' => 'RENAMED@example.test', 'role' => 'viewer', 'department' => 'operasional']))
            ->assertOk()->assertJsonPath('success', true)->assertHeader('Cache-Control', 'no-store, private');
        $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'Renamed User', 'email' => 'renamed@example.test', 'role' => 'viewer', 'department' => 'operasional']);
        $this->putJson('/users/'.$user->id.'/password', ['password' => 'ChangedPass123!'])->assertOk()->assertHeader('Cache-Control', 'no-store, private');
        $this->assertTrue(Hash::check('ChangedPass123!', $user->fresh()->password));
        $this->deleteJson('/users/'.$user->id)->assertOk()->assertHeader('Cache-Control', 'no-store, private');
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_bcrypt_limits_count_bytes_and_invalid_values_never_change_credentials(): void
    {
        $user = User::factory()->create();
        $original = $user->password;
        foreach (['Aa1!'.str_repeat('a', 69), 'Aa1!'.str_repeat('é', 35), "Aa1!abcd\0tail", ['bad'], 'short', str_repeat('x', 256)] as $password) {
            $this->putJson('/users/'.$user->id.'/password', ['password' => $password])->assertUnprocessable()->assertJsonValidationErrors('password');
            $this->assertSame($original, $user->fresh()->password);
            $this->postJson('/users', $this->account(['password' => $password]))->assertUnprocessable()->assertJsonValidationErrors('password');
        }
        foreach (['Aa1!'.str_repeat('a', 68), 'Aa1!'.str_repeat('é', 34)] as $password) {
            $this->putJson('/users/'.$user->id.'/password', ['password' => $password])->assertOk();
            $this->assertTrue(Hash::check($password, $user->fresh()->password));
        }
    }

    public function test_admin_cannot_remove_own_management_access_or_delete_own_account(): void
    {
        foreach ([['role' => 'user'], ['role' => 'superadmin', 'department' => 'operasional'], ['role' => 'viewer', 'department' => 'operasional']] as $extra) {
            $this->putJson('/users/'.$this->admin->id, $this->account($extra))->assertUnprocessable();
        }
        $this->deleteJson('/users/'.$this->admin->id)->assertForbidden();
        $this->assertSame('superadmin', $this->admin->fresh()->role);
        $this->assertSame('umum', $this->admin->fresh()->department);
        $this->putJson('/users/'.$this->admin->id, $this->account(['email' => $this->admin->email, 'role' => 'superadmin', 'department' => 'umum']))->assertOk();
    }

    public function test_normalization_duplicates_and_races_are_validation_errors(): void
    {
        $existing = User::factory()->create(['email' => 'duplicate@example.test']);
        $this->postJson('/users', $this->account(['email' => ' DUPLICATE@example.test ']))->assertUnprocessable()->assertJsonValidationErrors('email');
        Event::listen('eloquent.creating: '.User::class, function (User $user) {
            if ($user->email === 'synthetic@example.test') {
                DB::table('users')->insert(['name' => 'Competing', 'email' => $user->email, 'password' => 'synthetic-hash']);
            }
        });
        $this->postJson('/users', $this->account())->assertUnprocessable()->assertJsonValidationErrors('email')->assertDontSee('SQLSTATE');
        Event::listen('eloquent.updating: '.User::class, function (User $user) {
            if ($user->email === 'raced@example.test') {
                DB::table('users')->insert(['name' => 'Competing', 'email' => $user->email, 'password' => 'synthetic-hash']);
            }
        });
        $this->putJson('/users/'.$existing->id, $this->account(['email' => 'raced@example.test']))->assertUnprocessable()->assertJsonValidationErrors('email');
        $this->assertSame('duplicate@example.test', $existing->fresh()->email);
    }

    public function test_log_failures_do_not_include_exception_messages_or_credentials(): void
    {
        Log::spy();
        Event::listen('eloquent.creating: '.User::class, function (User $user) {
            if ($user->email === 'synthetic@example.test') {
                throw new \RuntimeException('SECRET '.$user->password);
            }
        });
        $this->postJson('/users', $this->account())->assertStatus(500)->assertJsonPath('success', false)->assertDontSee('SECRET');
        Log::shouldHaveReceived('error')->once()->with('Failed to create user', ['exception_type' => \RuntimeException::class, 'code' => '0']);
    }

    public function test_roles_and_read_only_are_checked_before_target_lookup(): void
    {
        $target = User::factory()->create();
        foreach ([['umum', 'user'], ['umum', 'viewer'], ['operasional', 'superadmin']] as [$department, $role]) {
            $this->actingAs(User::factory()->create(compact('department', 'role')));
            $this->getJson('/users')->assertForbidden();
            $this->getJson('/users/export')->assertForbidden();
            $this->postJson('/users', $this->account())->assertForbidden();
            $this->putJson('/users/'.$target->id, $this->account())->assertForbidden();
            $this->putJson('/users/'.$target->id.'/password', ['password' => 'ChangedPass123!'])->assertForbidden();
            $this->deleteJson('/users/'.$target->id)->assertForbidden();
        }
        $this->actingAs($this->admin);
        Cache::put('simonpr:read_only_mode', true);
        $this->postJson('/users', $this->account())->assertForbidden();
        $this->putJson('/users/'.$target->id, $this->account())->assertForbidden();
        $this->putJson('/users/'.$target->id.'/password', ['password' => 'ChangedPass123!'])->assertForbidden();
        $this->deleteJson('/users/'.$target->id)->assertForbidden();
    }

    public function test_malformed_ids_and_action_limits_are_safe_and_independent(): void
    {
        foreach (['bad', '0', '99999999999999999999999999'] as $id) {
            $this->putJson('/users/'.$id, $this->account())->assertNotFound();
            $this->putJson('/users/'.$id.'/password', ['password' => 'ChangedPass123!'])->assertNotFound();
            $this->deleteJson('/users/'.$id)->assertNotFound();
        }
        $prefixes = [];
        foreach (['index' => 60, 'store' => 10, 'update' => 20, 'password' => 10, 'destroy' => 10, 'export' => 10] as $name => $limit) {
            $route = app('router')->getRoutes()->getByName('users.'.$name);
            $rule = collect($route->gatherMiddleware())->first(fn ($item) => str_starts_with($item, 'throttle:'));
            [$actual, $minutes, $prefix] = explode(',', substr($rule, 9));
            $this->assertSame((string) $limit, $actual);
            $this->assertSame('1', $minutes);
            $this->assertNotEmpty($prefix);
            $this->assertNotContains($prefix, $prefixes);
            $prefixes[] = $prefix;
        }
        for ($i = 0; $i < 10; $i++) {
            $this->postJson('/users', $this->account(['password' => 'bad']))->assertUnprocessable();
        }
        $this->postJson('/users', $this->account())->assertTooManyRequests();
        $user = User::factory()->create();
        $this->putJson('/users/'.$user->id.'/password', ['password' => 'ChangedPass123!'])->assertOk();
        $this->get('/users/export')->assertOk();
    }

    public function test_page_uses_versioned_asset_and_json_safe_action_labels(): void
    {
        User::factory()->create(['name' => "Quote ' & <script>unsafe=1</script>\nName"]);
        $this->get('/users')->assertOk()->assertSee('assets/app/user-management.js?v=', false)
            ->assertSee('data-user-directory', false)->assertSee('id="addUserForm" novalidate', false)
            ->assertSee('id="addUserForm" novalidate method="POST"', false)
            ->assertSee('id="passwordForm" novalidate method="POST"', false)
            ->assertDontSee('Math.random()', false)->assertDontSee('<script>unsafe=1</script>', false);
    }
}
