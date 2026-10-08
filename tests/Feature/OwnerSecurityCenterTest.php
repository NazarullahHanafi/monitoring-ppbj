<?php

namespace Tests\Feature;

use App\Http\Middleware\TrackAuthenticatedDevice;
use App\Models\SecurityHoneypotEvent;
use App\Models\SecurityDeviceSession;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Crypt;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class OwnerSecurityCenterTest extends TestCase
{
    use RefreshDatabase;

    private string $logPath;

    protected function setUp(): void
    {
        parent::setUp();

        $this->logPath = storage_path('framework/testing/honeypot-access.log');
        @mkdir(dirname($this->logPath), 0755, true);
        @unlink($this->logPath);
        @unlink(storage_path('app/security/honeypot-cursors.json'));
    }

    protected function tearDown(): void
    {
        @unlink($this->logPath);
        @unlink(storage_path('app/security/honeypot-cursors.json'));

        parent::tearDown();
    }

    public function test_only_owner_superadmin_umum_can_open_security_center(): void
    {
        $owner = $this->owner();

        $this->actingAs($owner)
            ->get(route('owner.security.index'))
            ->assertOk()
            ->assertSee('Security Command Center')
            ->assertSee('Silent Honeypot')
            ->assertSee('Pusat Sesi & Perangkat', false)
            ->assertSee('Security Score');

        $other = User::factory()->create(['role' => 'superadmin', 'department' => 'umum']);

        $this->actingAs($other)
            ->get(route('owner.security.index'))
            ->assertForbidden();
    }

    public function test_honeypot_scanner_aggregates_only_suspicious_access_log_lines(): void
    {
        config(['security.honeypot.access_logs' => [$this->logPath]]);

        file_put_contents($this->logPath, implode(PHP_EOL, [
            '40.74.77.37 - - [08/Oct/2026:04:23:00 +0700] "GET /wp-admin/maint/repair.php HTTP/1.1" 404 1251 "-" "-"',
            '40.74.77.37 - - [08/Oct/2026:04:23:01 +0700] "GET /random/dragonshell.php HTTP/1.1" 404 1251 "-" "-"',
            '127.0.0.1 - - [08/Oct/2026:04:23:02 +0700] "GET /dashboard HTTP/1.1" 200 5000 "-" "Mozilla/5.0"',
        ]).PHP_EOL);

        $this->assertSame(0, Artisan::call('security:scan-honeypot'));

        $event = SecurityHoneypotEvent::query()->sole();
        $this->assertSame('40.74.77.37', $event->ip_address);
        $this->assertSame(2, $event->hit_count);
        $this->assertSame(2, $event->unique_paths_count);
        $this->assertCount(2, $event->sample_paths);

        // Cursor memastikan baris lama tidak dihitung ulang.
        Artisan::call('security:scan-honeypot');
        $this->assertSame(2, $event->fresh()->hit_count);
    }

    public function test_owner_can_revoke_another_device_session_without_exposing_session_id(): void
    {
        $owner = $this->owner();
        $other = User::factory()->create();
        $token = hash_hmac('sha256', 'otherdevice123', (string) config('app.key'));
        SecurityDeviceSession::create([
            'session_hash' => $token,
            'session_id_encrypted' => Crypt::encryptString('otherdevice123'),
            'user_id' => $other->id,
            'ip_address' => '203.0.113.10',
            'user_agent' => 'Mozilla/5.0 (Windows NT 10.0) Chrome/120.0',
            'last_activity_at' => now(),
        ]);

        $this->actingAs($owner)
            ->get(route('owner.security.index'))
            ->assertOk()
            ->assertDontSee('otherdevice123')
            ->assertSee($token);

        $this->delete(route('owner.security.sessions.destroy', $token))
            ->assertRedirect();

        $this->assertDatabaseMissing('security_device_sessions', ['session_hash' => $token]);
        $this->assertDatabaseHas('activity_logs', ['action' => 'owner_session_revoked']);

    }

    public function test_authenticated_device_is_registered_with_encrypted_session_id(): void
    {
        $user = User::factory()->create();
        $session = app('session')->driver();
        $session->start();
        $request = Request::create('/dashboard', 'GET', [], [], [], [
            'REMOTE_ADDR' => '203.0.113.25',
            'HTTP_USER_AGENT' => 'Mozilla/5.0 (Android 14) Chrome/120.0 Mobile',
        ]);
        $request->setLaravelSession($session);
        $request->setUserResolver(fn () => $user);

        app(TrackAuthenticatedDevice::class)->terminate($request, new Response());

        $device = SecurityDeviceSession::query()->sole();
        $this->assertSame($user->id, $device->user_id);
        $this->assertSame('203.0.113.25', $device->ip_address);
        $this->assertNotSame($session->getId(), $device->session_id_encrypted);
        $this->assertSame($session->getId(), Crypt::decryptString($device->session_id_encrypted));
    }

    private function owner(): User
    {
        config(['app.owner_emails' => ['superadmin@sucofindo.com']]);

        return User::factory()->create([
            'name' => 'Nazar',
            'email' => 'superadmin@sucofindo.com',
            'role' => 'superadmin',
            'department' => 'umum',
        ]);
    }
}
