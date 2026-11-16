<?php

namespace Tests\Feature;

use App\Http\Controllers\OwnerSecurityController;
use App\Models\ActivityLog;
use App\Models\SecurityDeviceSession;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Session\ArraySessionHandler;
use Illuminate\Session\NullSessionHandler;
use Illuminate\Session\Store;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use RuntimeException;
use Tests\TestCase;

class OwnerSecurityReliabilityTest extends TestCase
{
    use RefreshDatabase;

    private User $owner;

    protected function setUp(): void
    {
        parent::setUp();
        $this->travelTo(now()->startOfSecond());
        $this->owner = User::factory()->create(['role' => 'superadmin', 'department' => 'umum']);
        config(['app.owner_emails' => [$this->owner->email]]);
    }

    private function device(string $id, array $attributes = []): SecurityDeviceSession
    {
        return SecurityDeviceSession::create(array_merge([
            'session_hash' => hash_hmac('sha256', $id, (string) config('app.key')),
            'session_id_encrypted' => Crypt::encryptString($id),
            'user_id' => $this->owner->id,
            'ip_address' => '203.0.113.25',
            'user_agent' => 'Chrome/120.0 Windows',
            'last_activity_at' => now(),
        ], $attributes));
    }

    private function request(\SessionHandlerInterface $handler): Request
    {
        $session = new Store('fixture', $handler);
        $session->setId(str_repeat('c', 40));
        $session->start();
        $request = Request::create('/owner/security/sessions', 'DELETE');
        $request->setLaravelSession($session);
        $request->setUserResolver(fn () => $this->owner);

        return $request;
    }

    public function test_totals_cover_all_sessions_with_bounded_pages_and_current_device_first(): void
    {
        $session = app('session')->driver();
        $session->setId(str_repeat('c', 40));
        $session->start();
        $current = $this->device($session->getId(), ['last_activity_at' => now()->subMinutes(20)]);
        Cache::put('security:device-touch:'.$current->session_hash, true, 300);
        Cache::put('security:device-prune:v1', true, 3600);
        $other = User::factory()->create();
        for ($i = 0; $i < 124; $i++) {
            $this->device('other-'.$i, ['user_id' => $other->id, 'ip_address' => $i % 2 ? '203.0.113.26' : '203.0.113.27']);
        }
        $this->device('expired', ['last_activity_at' => now()->subMinutes((int) config('session.lifetime') + 1)]);
        DB::enableQueryLog();
        $response = $this->actingAs($this->owner)->withCookie(config('session.cookie'), $session->getId())
            ->get(route('owner.security.index'))->assertOk();
        $queries = collect(DB::getQueryLog())->pluck('query');
        DB::disableQueryLog();
        $this->assertSame(['active' => 125, 'users' => 2, 'ips' => 3, 'others' => 124], $response->viewData('sessionStats'));
        $page = $response->viewData('sessions');
        $this->assertSame(125, $page->total());
        $this->assertCount(50, $page);
        $this->assertTrue($page->first()->is_current);
        $this->assertSame($current->session_hash, $page->first()->session_token);
        $this->assertFalse(property_exists($page->first(), 'session_id_encrypted'));
        $response->assertDontSee($current->session_id_encrypted)->assertSee('data-session-revoke', false)
            ->assertSee('owner-security.js')->assertDontSee('onsubmit="return confirm', false);
        $this->assertStringContainsString('no-store', $response->headers->get('Cache-Control'));
        $this->assertCount(2, $queries->filter(fn ($sql) => str_contains($sql, 'from "security_device_sessions"')));
        $this->assertCount(2, $queries->filter(fn ($sql) => str_contains($sql, 'from "security_honeypot_events"')));
        $second = $this->get(route('owner.security.index', ['page' => 2]))->assertOk()->viewData('sessions');
        $this->assertCount(50, $second);
        $this->assertEmpty(array_intersect($page->pluck('session_token')->all(), $second->pluck('session_token')->all()));
        $this->assertCount(25, $this->get(route('owner.security.index', ['page' => 3]))->assertOk()->viewData('sessions'));
    }

    public function test_honeypot_totals_preserve_date_and_distinct_source_semantics(): void
    {
        foreach ([[0, '203.0.113.1', 3], [0, '203.0.113.2', 4], [30, '203.0.113.1', 5], [30, '203.0.113.3', 6], [31, '203.0.113.4', 99]] as [$days, $ip, $hits]) {
            DB::table('security_honeypot_events')->insert(['event_date' => today()->subDays($days)->toDateString(), 'ip_address' => $ip, 'hit_count' => $hits, 'last_seen_at' => now()->subDays($days)]);
        }
        $response = $this->actingAs($this->owner)->get(route('owner.security.index'))->assertOk();
        $this->assertSame(7, $response->viewData('honeypotStats')['today']);
        $this->assertSame(3, $response->viewData('honeypotStats')['sources_30d']);
        $this->assertNull($response->viewData('honeypotEvents')->first()->getAttribute('user_agent'));
    }

    public function test_invalid_pages_fail_before_security_queries(): void
    {
        $this->actingAs($this->owner);
        foreach ([0, 'bad', ['bad'], 1000001] as $page) {
            DB::flushQueryLog();
            DB::enableQueryLog();
            $this->getJson(route('owner.security.index', compact('page')))->assertUnprocessable()->assertJsonValidationErrors('page');
            $sql = collect(DB::getQueryLog())->pluck('query');
            DB::disableQueryLog();
            $this->assertFalse($sql->contains(fn ($query) => str_contains($query, 'security_device_sessions') || str_contains($query, 'security_honeypot_events')));
        }
    }

    public function test_single_revoke_verifies_storage_and_cleans_already_expired_keys(): void
    {
        foreach (['valid', 'already-expired'] as $id) {
            $device = $this->device($id);
            $handler = new SecuritySessionFixtureHandler;
            if ($id === 'valid') {
                $handler->values[$id] = 'private payload';
            }
            $response = app(OwnerSecurityController::class)->destroySession($this->request($handler), $device->session_hash);
            $this->assertSame(302, $response->getStatusCode());
            $this->assertNotNull(session('success'));
            $this->assertDatabaseMissing('security_device_sessions', ['id' => $device->id]);
            $this->assertSame('', $handler->read($id));
        }
        $this->assertSame(2, ActivityLog::where('action', 'owner_session_revoked')->count());
    }

    public function test_false_true_and_exception_storage_failures_never_claim_success_or_remove_registry(): void
    {
        foreach (['false', 'true', 'throw'] as $mode) {
            $device = $this->device('failure-'.$mode);
            $handler = new SecuritySessionFixtureHandler;
            $handler->failures['failure-'.$mode] = $mode;
            $handler->values['failure-'.$mode] = 'private payload';
            session()->forget(['success', 'error']);
            app(OwnerSecurityController::class)->destroySession($this->request($handler), $device->session_hash);
            $this->assertNotNull(session('error'));
            $this->assertNull(session('success'));
            $this->assertDatabaseHas('security_device_sessions', ['id' => $device->id]);
        }
        $this->assertDatabaseMissing('activity_logs', ['action' => 'owner_session_revoked']);
    }

    public function test_corrupt_or_mismatched_registry_never_targets_a_different_session(): void
    {
        foreach (['not encrypted', Crypt::encryptString(str_repeat('c', 40))] as $encrypted) {
            $device = $this->device('damaged-'.hash('sha256', $encrypted), ['session_id_encrypted' => $encrypted]);
            $handler = new SecuritySessionFixtureHandler;
            app(OwnerSecurityController::class)->destroySession($this->request($handler), $device->session_hash);
            $this->assertSame([], $handler->destroyed);
            $this->assertDatabaseHas('security_device_sessions', ['id' => $device->id]);
        }
    }

    public function test_current_session_and_non_remote_driver_are_protected(): void
    {
        $current = $this->device(str_repeat('c', 40));
        $handler = new SecuritySessionFixtureHandler;
        app(OwnerSecurityController::class)->destroySession($this->request($handler), $current->session_hash);
        $this->assertSame([], $handler->destroyed);
        $other = $this->device('other');
        foreach ([new NullSessionHandler, new ArraySessionHandler(120)] as $unsupported) {
            app(OwnerSecurityController::class)->destroySession($this->request($unsupported), $other->session_hash);
        }
        $this->assertDatabaseCount('security_device_sessions', 2);
        $this->assertDatabaseMissing('activity_logs', ['action' => 'owner_session_revoked']);
    }

    public function test_bulk_revoke_is_bounded_reports_partial_results_and_uses_one_registry_delete(): void
    {
        $handler = new SecuritySessionFixtureHandler;
        $current = $this->device(str_repeat('c', 40));
        $expired = $this->device('old', ['last_activity_at' => now()->subDays(1)]);
        $failedIds = [];
        for ($i = 0; $i < 103; $i++) {
            $device = $this->device('bulk-'.$i);
            $handler->values['bulk-'.$i] = 'private payload';
            if ($i < 3) {
                $handler->failures['bulk-'.$i] = 'false';
                $failedIds[] = $device->id;
            }
        }
        DB::enableQueryLog();
        app(OwnerSecurityController::class)->destroyOtherSessions($this->request($handler));
        $sql = collect(DB::getQueryLog())->pluck('query');
        DB::disableQueryLog();
        $this->assertCount(100, $handler->destroyed);
        $this->assertDatabaseCount('security_device_sessions', 8);
        foreach (array_merge([$current->id, $expired->id], $failedIds) as $id) {
            $this->assertDatabaseHas('security_device_sessions', compact('id'));
        }
        $this->assertNotNull(session('warning'));
        $audit = ActivityLog::where('action', 'owner_other_sessions_revoked')->sole();
        $this->assertSame(97, $audit->changes['revoked_count']);
        $this->assertSame(3, $audit->changes['failed_count']);
        $this->assertTrue($audit->changes['has_more']);
        $this->assertCount(1, $sql->filter(fn ($query) => str_starts_with($query, 'delete from "security_device_sessions"')));
        $this->assertStringNotContainsString('private payload', $audit->toJson());
    }

    public function test_single_and_bulk_audit_failure_roll_back_registry_cleanup(): void
    {
        $handler = new SecuritySessionFixtureHandler;
        $device = $this->device('audit-failure');
        DB::connection()->beforeExecuting(function ($sql) {
            if (str_starts_with(strtolower($sql), 'insert into "activity_logs"')) {
                throw new RuntimeException('Simulated audit storage outage');
            }
        });
        $controller = app(OwnerSecurityController::class);
        foreach (['single', 'bulk'] as $action) {
            session()->forget(['success', 'error']);
            if ($action === 'single') {
                $controller->destroySession($this->request($handler), $device->session_hash);
            } else {
                $controller->destroyOtherSessions($this->request($handler));
            }
            $this->assertNotNull(session('error'));
            $this->assertNull(session('success'));
            $this->assertDatabaseHas('security_device_sessions', ['id' => $device->id]);
        }
    }

    public function test_owner_permissions_read_only_and_separate_action_budgets(): void
    {
        $token = str_repeat('a', 64);
        $this->getJson(route('owner.security.index'))->assertUnauthorized();
        $this->deleteJson(route('owner.security.sessions.destroy', $token))->assertUnauthorized();
        $this->actingAs(User::factory()->create(['role' => 'superadmin', 'department' => 'umum']));
        $this->deleteJson(route('owner.security.sessions.destroy', $token))->assertForbidden();
        $this->deleteJson(route('owner.security.sessions.destroy-others'))->assertForbidden();
        $this->actingAs($this->owner);
        Cache::put('simonpr:read_only_mode', true);
        $this->deleteJson(route('owner.security.sessions.destroy', $token))->assertForbidden();
        $this->deleteJson(route('owner.security.sessions.destroy-others'))->assertForbidden();
        Cache::forget('simonpr:read_only_mode');
        for ($i = 0; $i < 60; $i++) {
            RateLimiter::hit('owner-security-read:'.sha1((string) $this->owner->id), 60);
        }
        $this->getJson(route('owner.security.index'))->assertTooManyRequests()->assertHeader('Retry-After');
        $this->delete(route('owner.security.sessions.destroy', $token))->assertRedirect();
        $this->delete(route('owner.security.sessions.destroy-others'))->assertRedirect();
        $prefixes = [];
        foreach (['index' => 60, 'sessions.destroy' => 20, 'sessions.destroy-others' => 5] as $name => $limit) {
            $route = app('router')->getRoutes()->getByName('owner.security.'.$name);
            $middleware = $route->gatherMiddleware();
            foreach (['auth', 'owner', 'readonly.block'] as $required) {
                $this->assertContains($required, $middleware);
            }
            $rule = collect($middleware)->first(fn ($item) => str_starts_with($item, 'throttle:'));
            [$actual, $minutes, $prefix] = explode(',', substr($rule, 9));
            $this->assertSame((string) $limit, $actual);
            $this->assertSame('1', $minutes);
            $this->assertNotContains($prefix, $prefixes);
            $prefixes[] = $prefix;
        }
    }
}

class SecuritySessionFixtureHandler implements \SessionHandlerInterface
{
    public array $values = [];

    public array $failures = [];

    public array $destroyed = [];

    public function open($savePath, $sessionName): bool
    {
        return true;
    }

    public function close(): bool
    {
        return true;
    }

    public function write($sessionId, $data): bool
    {
        $this->values[$sessionId] = $data;

        return true;
    }

    public function gc($lifetime): int
    {
        return 0;
    }

    public function read($sessionId): string
    {
        return $this->values[$sessionId] ?? '';
    }

    public function destroy($sessionId): bool
    {
        $this->destroyed[] = $sessionId;
        if (($this->failures[$sessionId] ?? null) === 'throw') {
            throw new RuntimeException('Simulated remote session storage outage');
        }
        if (isset($this->failures[$sessionId])) {
            return $this->failures[$sessionId] === 'true';
        }
        $existed = isset($this->values[$sessionId]);
        unset($this->values[$sessionId]);

        return $existed;
    }
}
