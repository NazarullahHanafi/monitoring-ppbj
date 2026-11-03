<?php

namespace Tests\Feature;

use App\Http\Middleware\TrackAuthenticatedDevice;
use App\Models\SecurityDeviceSession;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use RuntimeException;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class DeviceTelemetryPerformanceTest extends TestCase
{
    use RefreshDatabase;

    private function page(User $user, string $sessionId): Request
    {
        $session = app('session')->driver();
        $session->setId($sessionId);
        $session->start();
        $request = Request::create('/dashboard', 'GET', [], [], [], ['REMOTE_ADDR' => '203.0.113.25']);
        $request->setLaravelSession($session);
        $request->setUserResolver(fn () => $user);

        return $request;
    }

    public function test_device_touch_is_one_atomic_write_and_warm_requests_do_no_sql(): void
    {
        $user = User::factory()->create();
        $request = $this->page($user, str_repeat('a', 40));
        Cache::put('security:device-prune:v1', true, 3600);
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            $queries[] = strtolower($query->sql);
        });
        $middleware = app(TrackAuthenticatedDevice::class);
        $middleware->terminate($request, new Response);
        $this->assertCount(1, $queries, 'Device registration should use one upsert, without a preliminary SELECT.');
        $device = SecurityDeviceSession::sole();
        $this->assertSame($user->id, $device->user_id);
        $this->assertSame($request->session()->getId(), Crypt::decryptString($device->session_id_encrypted));
        $createdAt = $device->created_at->toDateTimeString();

        $queries = [];
        $middleware->terminate($request, new Response);
        $this->assertCount(0, $queries);
        $this->travel(301)->seconds();
        $queries = [];
        $middleware->terminate($request, new Response);
        $this->assertCount(1, $queries);
        $this->assertDatabaseCount('security_device_sessions', 1);
        $device->refresh();
        $this->assertSame($createdAt, $device->created_at->toDateTimeString());
        $this->assertSame(now()->toDateTimeString(), $device->last_activity_at->toDateTimeString());
    }

    public function test_pruning_is_global_hourly_and_deletes_at_most_500_expired_rows(): void
    {
        // Keep the exact seven-day boundary stable while building 505 rows.
        $this->travelTo(now()->startOfSecond());
        $user = User::factory()->create();
        $old = [];
        for ($i = 0; $i < 505; $i++) {
            $old[] = ['session_hash' => hash('sha256', (string) $i), 'session_id_encrypted' => 'unused',
                'user_id' => $user->id, 'last_activity_at' => now()->subDays(8)];
        }
        DB::table('security_device_sessions')->insert($old);
        SecurityDeviceSession::create(['session_hash' => 'at-retention-boundary', 'session_id_encrypted' => 'unused',
            'user_id' => $user->id, 'last_activity_at' => now()->subDays(7)]);
        $middleware = app(TrackAuthenticatedDevice::class);
        $middleware->terminate($this->page($user, str_repeat('a', 40)), new Response);
        $this->assertSame(5, SecurityDeviceSession::where('last_activity_at', '<', now()->subDays(7))->count());
        $this->assertDatabaseHas('security_device_sessions', ['session_hash' => 'at-retention-boundary']);

        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            $queries[] = strtolower($query->sql);
        });
        $middleware->terminate($this->page($user, str_repeat('b', 40)), new Response);
        $this->assertCount(1, $queries, 'A different device must not repeat the global cleanup.');
        $this->travel(3601)->seconds();
        $middleware->terminate($this->page($user, str_repeat('c', 40)), new Response);
        $this->assertSame(0, SecurityDeviceSession::where('last_activity_at', '<', now()->subDays(7))->count());
        $this->assertDatabaseCount('security_device_sessions', 3);
    }

    public function test_failed_touch_can_retry_instead_of_being_suppressed_for_five_minutes(): void
    {
        $request = $this->page(User::factory()->create(), str_repeat('d', 40));
        $failOnce = true;
        DB::connection()->beforeExecuting(function ($sql) use (&$failOnce) {
            if ($failOnce && str_contains($sql, 'security_device_sessions')) {
                $failOnce = false;
                throw new RuntimeException('Simulated transient telemetry failure');
            }
        });
        $middleware = app(TrackAuthenticatedDevice::class);
        $middleware->terminate($request, new Response);
        $this->assertDatabaseCount('security_device_sessions', 0);
        $middleware->terminate($request, new Response);
        $this->assertDatabaseCount('security_device_sessions', 1);
    }

    public function test_json_posts_and_guests_do_not_touch_device_database(): void
    {
        $request = $this->page(User::factory()->create(), str_repeat('e', 40));
        $json = clone $request;
        $json->headers->set('Accept', 'application/json');
        $post = clone $request;
        $post->setMethod('POST');
        $guest = clone $request;
        $guest->setUserResolver(fn () => null);
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            $queries[] = $query->sql;
        });
        foreach ([$json, $post, $guest] as $ignored) {
            app(TrackAuthenticatedDevice::class)->terminate($ignored, new Response);
        }
        $this->assertCount(0, $queries);
    }

    public function test_cleanup_failure_releases_the_global_gate_for_a_retry(): void
    {
        $request = $this->page(User::factory()->create(), str_repeat('f', 40));
        $failOnce = true;
        DB::connection()->beforeExecuting(function ($sql) use (&$failOnce) {
            if ($failOnce && str_starts_with($sql, 'select') && str_contains($sql, 'security_device_sessions')) {
                $failOnce = false;
                throw new RuntimeException('Simulated cleanup read failure');
            }
        });
        $middleware = app(TrackAuthenticatedDevice::class);
        $middleware->terminate($request, new Response);
        $this->assertFalse(Cache::has('security:device-prune:v1'));
        $middleware->terminate($request, new Response);
        $this->assertTrue(Cache::has('security:device-prune:v1'));
        $this->assertDatabaseCount('security_device_sessions', 1);
    }

    public function test_cleanup_rechecks_age_when_another_worker_refreshes_a_selected_device(): void
    {
        $user = User::factory()->create();
        $old = SecurityDeviceSession::create(['session_hash' => 'refreshed-by-other-worker',
            'session_id_encrypted' => 'unused', 'user_id' => $user->id, 'last_activity_at' => now()->subDays(8)]);
        $refreshed = false;
        DB::connection()->beforeExecuting(function ($sql) use ($old, &$refreshed) {
            if (! $refreshed && str_starts_with($sql, 'delete') && str_contains($sql, 'security_device_sessions')) {
                $refreshed = true;
                DB::table('security_device_sessions')->where('id', $old->id)->update(['last_activity_at' => now()]);
            }
        });
        app(TrackAuthenticatedDevice::class)->terminate($this->page($user, str_repeat('g', 40)), new Response);
        $this->assertTrue($refreshed);
        $this->assertDatabaseHas('security_device_sessions', ['id' => $old->id]);
        $this->assertDatabaseCount('security_device_sessions', 2);
    }
}
