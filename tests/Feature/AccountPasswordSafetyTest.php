<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AccountPasswordSafetyTest extends TestCase
{
    use RefreshDatabase;

    public function test_wrong_password_never_flashes_any_secret_or_updates_account(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        $original = $user->password;
        $this->actingAs($user)->from(route('account.edit'))->post(route('account.password'), [
            'current_password' => 'WrongSecret123', 'password' => 'NewSecret123', 'password_confirmation' => 'NewSecret123',
        ])->assertRedirect(route('account.edit'))->assertSessionHasErrors('current_password');
        foreach (['current_password', 'password', 'password_confirmation'] as $field) {
            $this->assertArrayNotHasKey($field, session('_old_input', []));
        }
        $this->assertSame($original, $user->fresh()->password);
    }

    public function test_arrays_oversized_and_multibyte_passwords_return_validation_errors_instead_of_server_errors(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        $this->actingAs($user);
        $original = $user->password;
        foreach ([['current_password' => ['password'], 'password' => 'NewSecret123'], ['current_password' => str_repeat('x', 1025), 'password' => 'NewSecret123'], ['current_password' => 'password', 'password' => ['NewSecret123']], ['current_password' => 'password', 'password' => 'Aa1'.str_repeat('é', 36)]] as $data) {
            $this->postJson(route('account.password'), [...$data, 'password_confirmation' => $data['password']])->assertUnprocessable();
        }
        $this->assertSame($original, $user->fresh()->password);
    }

    public function test_successful_change_only_updates_the_authenticated_account_and_does_not_flash_secrets(): void
    {
        $user = User::factory()->create(['department' => 'operasional']);
        $other = User::factory()->create(['department' => 'umum']);
        $originalOther = $other->password;
        $this->actingAs($user)->from(route('account.edit'))->post(route('account.password'), [
            'current_password' => 'password', 'password' => 'NewSecret123', 'password_confirmation' => 'NewSecret123', 'user_id' => $other->id,
        ])->assertRedirect(route('account.edit'))->assertSessionHasNoErrors()->assertSessionHas('status');
        $this->assertTrue(Hash::check('NewSecret123', $user->fresh()->password));
        $this->assertFalse(Hash::check('password', $user->fresh()->password));
        $this->assertSame($originalOther, $other->fresh()->password);
        $this->assertSame([], session('_old_input', []));
    }

    public function test_password_attempts_are_limited_per_account_without_blocking_other_features_or_accounts(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        $this->actingAs($user);
        $data = ['current_password' => 'WrongSecret123', 'password' => 'NewSecret123', 'password_confirmation' => 'NewSecret123'];
        foreach (range(1, 5) as $_) {
            $this->postJson(route('account.password'), $data)->assertUnprocessable();
        }
        $this->postJson(route('account.password'), $data)->assertTooManyRequests();
        $this->getJson(route('dashboard.data'))->assertOk();
        $other = User::factory()->create(['department' => 'umum']);
        $this->actingAs($other)->postJson(route('account.password'), $data)->assertUnprocessable();
        $this->assertTrue(Hash::check('password', $user->fresh()->password));
    }

    public function test_guests_and_viewers_cannot_change_password_through_this_endpoint(): void
    {
        $this->postJson(route('account.password'), [])->assertUnauthorized();
        $viewer = User::factory()->create(['department' => 'umum', 'role' => 'viewer']);
        $this->actingAs($viewer)->postJson(route('account.password'), [])->assertForbidden();
    }
}
