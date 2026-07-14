<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class UserLastSeenTest extends TestCase
{
    use RefreshDatabase;

    public function test_presence_heartbeat_updates_user_last_seen_at(): void
    {
        Carbon::setTestNow('2026-07-10 09:30:00');
        Cache::flush();

        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
            'last_seen_at' => null,
        ]);

        $this->actingAs($user)
            ->withServerVariables(['REMOTE_ADDR' => '198.51.100.10'])
            ->postJson(route('presence.heartbeat'))
            ->assertOk()
            ->assertJsonPath('count', 1);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'last_seen_at' => '2026-07-10 09:30:00',
            'last_seen_ip' => '198.51.100.10',
        ]);

        Carbon::setTestNow();
    }

    public function test_user_management_shows_last_online_status(): void
    {
        Carbon::setTestNow('2026-07-10 10:00:00');

        $admin = User::factory()->create([
            'name' => 'Admin Umum',
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        User::factory()->create([
            'name' => 'User Online',
            'email' => 'online@example.test',
            'department' => 'operasional',
            'last_seen_at' => now()->subMinutes(2),
        ]);

        User::factory()->create([
            'name' => 'User Belum Login',
            'email' => 'never@example.test',
            'department' => 'umum',
            'last_seen_at' => null,
        ]);

        $this->actingAs($admin)
            ->get(route('users.index'))
            ->assertOk()
            ->assertSee('Terakhir Online')
            ->assertSee('IP Login')
            ->assertSee('Online sekarang')
            ->assertSee('Belum pernah online')
            ->assertSee('Menunggu login pertama');

        Carbon::setTestNow();
    }

    public function test_successful_login_records_login_ip(): void
    {
        Carbon::setTestNow('2026-07-10 11:00:00');

        $user = User::factory()->create([
            'email' => 'login-ip@example.test',
            'department' => 'umum',
            'role' => 'user',
            'last_seen_at' => null,
            'last_login_ip' => null,
            'last_seen_ip' => null,
        ]);

        $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.25'])
            ->post('/login', [
                'email' => $user->email,
                'password' => 'password',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'last_seen_at' => '2026-07-10 11:00:00',
            'last_login_ip' => '198.51.100.25',
            'last_seen_ip' => '198.51.100.25',
        ]);

        Carbon::setTestNow();
    }
}
