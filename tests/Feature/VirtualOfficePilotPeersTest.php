<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\VirtualOfficePilot;
use App\Services\VirtualOfficePresence;
use App\Services\VirtualOfficeWorld;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class VirtualOfficePilotPeersTest extends TestCase
{
    use RefreshDatabase;

    public function test_movement_peers_match_presence_visibility_without_loading_world_or_running_warm_queries(): void
    {
        $users = collect(range(1, 5))->map(fn () => User::factory()->create(['department' => 'umum', 'role' => 'user', 'is_active' => true]));
        foreach ($users as $user) {
            Cache::put('presence:user:'.$user->id, ['id' => $user->id], 300);
            Cache::put(VirtualOfficePilot::key($user->id), ['session_id' => 'secret-'.$user->id, 'x' => 2, 'z' => 5, 'y' => -.12, 'seq' => 1, 'action' => 'idle', 'private_data' => 'secret'], 300);
            Cache::put(VirtualOfficePilot::lease($user->id), 'secret-'.$user->id, 300);
        }
        Cache::forget('presence:user:'.$users[1]->id);
        Cache::forget(VirtualOfficePilot::lease($users[2]->id));
        Cache::put('presence:user:'.$users[3]->id, ['id' => 99999], 300);
        $presence = app(VirtualOfficePresence::class);
        $expected = collect($presence->snapshot($users[0])['people'])->filter(fn ($person) => !empty($person['pilot']))->map(fn ($person) => ['id' => $person['id']] + $person['pilot'])->values()->all();
        $this->mock(VirtualOfficeWorld::class)->shouldNotReceive('snapshot');
        DB::enableQueryLog();DB::flushQueryLog();
        $peers = $presence->pilotPeers();
        $this->assertSame($expected, $peers);
        $this->assertCount(2, $peers);
        $this->assertCount(0, DB::getQueryLog());DB::disableQueryLog();
        foreach ($peers as $peer) {
            $this->assertArrayNotHasKey('session_id', $peer);
            $this->assertArrayNotHasKey('private_data', $peer);
            $this->assertArrayNotHasKey('current_menu', $peer);
        }
    }
}
