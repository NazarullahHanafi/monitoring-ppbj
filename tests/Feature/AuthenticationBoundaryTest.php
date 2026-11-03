<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Session\ArraySessionHandler;
use Illuminate\Session\Store;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class AuthenticationBoundaryTest extends TestCase
{
    use RefreshDatabase;

    private function browserSession(User $user): void
    {
        // A new PHP request starts with an empty Store. Do not use actingAs or
        // withSession: those pre-hydrate authentication and hide ordering bugs.
        $handler = new ArraySessionHandler(120);
        $name = config('session.cookie');
        $stored = new Store($name, $handler);
        $stored->start();
        $stored->put(Auth::guard('web')->getName(), $user->id);
        $stored->save();
        config(['session.driver' => 'boundary']);
        app('session')->extend('boundary', fn () => $handler);
        app()->instance('session.store', app('session')->driver());
        Auth::forgetGuards();
        $this->withCookie($name, $stored->getId())->withCredentials();
    }

    public function test_locked_account_is_rejected_after_loading_a_real_session_cookie(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'is_active' => false]);
        $this->browserSession($user);
        $this->getJson(route('presence.mood.get'))->assertStatus(423);
        $this->assertGuest();
    }

    public function test_active_account_can_use_cookie_authentication_without_extra_user_queries(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'is_active' => true]);
        $this->browserSession($user);
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            $queries[] = $query->sql;
        });
        $this->getJson(route('presence.mood.get'))->assertOk();
        $this->assertAuthenticatedAs($user);
        $this->assertCount(1, array_filter($queries, fn ($sql) => str_contains($sql, 'from "users"')));
    }

    public function test_locked_browser_session_cannot_reach_a_document_or_html_account_page(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'is_active' => false]);
        $this->browserSession($user);
        $this->get(route('account.edit'))->assertRedirect(route('login'))->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_cookie_authenticated_operasional_is_still_denied_umum_data(): void
    {
        $user = User::factory()->create(['department' => 'operasional', 'is_active' => true]);
        $this->browserSession($user);
        $this->getJson(route('ppbj.index'))->assertForbidden();
    }

    public function test_locked_account_is_also_rejected_when_restored_by_remember_me_cookie(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'is_active' => false]);
        $recaller = Auth::guard('web')->getRecallerName();
        config(['session.driver' => 'boundary']);
        app('session')->extend('boundary', fn () => new ArraySessionHandler(120));
        app()->instance('session.store', app('session')->driver());
        Auth::forgetGuards();
        $this->withCookie($recaller, $user->id.'|'.$user->remember_token.'|'.$user->password)->withCredentials()
            ->getJson(route('presence.mood.get'))->assertStatus(423);
        $this->assertGuest();
    }

    public function test_viewer_cookie_can_read_but_cannot_create_a_document(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'viewer', 'is_active' => true]);
        $this->browserSession($user);
        $this->postJson(route('sp.store'), [])->assertForbidden();
        $this->assertDatabaseCount('sps', 0);
    }

    public function test_guest_is_rejected_before_any_private_record_query(): void
    {
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            $queries[] = $query->sql;
        });
        $this->getJson(route('procurement.quick-detail', ['kind' => 'ppbj', 'id' => 123]))->assertUnauthorized();
        $this->assertSame([], array_values(array_filter($queries, fn ($sql) => str_contains($sql, 'from "ppbj"'))));
    }
}
