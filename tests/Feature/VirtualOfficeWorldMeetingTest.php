<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\VirtualOfficeMeetings;
use App\Services\VirtualOfficeWorld;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class VirtualOfficeWorldMeetingTest extends TestCase
{
    use RefreshDatabase;

    private function person(array $attributes = []): User
    {
        $user = User::factory()->create($attributes + ['department' => 'umum', 'role' => 'user', 'is_active' => true]);
        Cache::put('presence:user:'.$user->id, ['id' => $user->id], 300);
        return $user;
    }

    private function invite(User $from, User $to): array
    {
        return $this->actingAs($from)->postJson(route('virtual-office.meetings.invite'), ['target_id' => $to->id])->assertCreated()->json('room');
    }

    public function test_only_general_department_superadmin_can_customize_shared_world_and_versions_are_checked(): void
    {
        $data = ['version' => 0, 'settings' => VirtualOfficeWorld::defaults()];
        foreach ([['umum', 'user'], ['umum', 'admin'], ['umum', 'viewer'], ['operasional', 'superadmin']] as [$department, $role]) {
            $this->actingAs($this->person(compact('department', 'role')))->postJson(route('virtual-office.world'), $data)->assertForbidden();
        }
        $admin = $this->person(['department' => 'umum', 'role' => 'superadmin']);
        $data['settings']['weather'] = 'snow';
        $this->actingAs($admin)->postJson(route('virtual-office.world'), $data)->assertOk()->assertJsonPath('settings.weather', 'snow')->assertJsonPath('version', 1);
        $this->postJson(route('virtual-office.world'), $data)->assertStatus(409);
        $data['version'] = 1; $data['settings']['landscape'] = 'https://attacker.test/map';
        $this->postJson(route('virtual-office.world'), $data)->assertUnprocessable();
        $this->getJson(route('virtual-office.presence'))->assertJsonPath('world.settings.weather', 'snow');
    }

    public function test_world_configuration_respects_global_read_only_and_is_hidden_from_other_roles(): void
    {
        $user = $this->person(); $admin = $this->person(['role' => 'superadmin']);
        $this->actingAs($user)->get(route('virtual-office.index'))->assertOk()->assertDontSee('id="voOpenWorld"', false);
        $this->actingAs($admin)->get(route('virtual-office.index'))->assertOk()->assertSee('id="voOpenWorld"', false);
        Cache::put('simonpr:read_only_mode', true, 60);
        $this->postJson(route('virtual-office.world'), ['version' => 0, 'settings' => VirtualOfficeWorld::defaults()])->assertForbidden();
        $this->assertDatabaseCount('virtual_office_world', 0);
    }

    public function test_meeting_requires_online_users_and_only_recipient_can_accept_or_decline(): void
    {
        $a = $this->person(); $b = $this->person(['department' => 'operasional']); $outsider = $this->person();
        Cache::forget('presence:user:'.$b->id);
        $this->actingAs($a)->postJson(route('virtual-office.meetings.invite'), ['target_id' => $b->id])->assertStatus(409);
        Cache::put('presence:user:'.$b->id, ['id' => $b->id], 300);
        $room = $this->invite($a, $b);
        $this->postJson(route('virtual-office.meetings.respond'), ['id' => $room['id'], 'action' => 'accept'])->assertForbidden();
        $this->actingAs($outsider)->postJson(route('virtual-office.meetings.respond'), ['id' => $room['id'], 'action' => 'accept'])->assertNotFound();
        $this->getJson(route('virtual-office.live'))->assertJsonPath('room', null)->assertJsonCount(0, 'messages');
        $this->actingAs($b)->postJson(route('virtual-office.meetings.respond'), ['id' => $room['id'], 'action' => 'accept'])->assertOk()->assertJsonPath('room.status', 'accepted');
        $this->actingAs($outsider)->postJson(route('virtual-office.meetings.invite'), ['target_id' => $b->id])->assertStatus(409);
    }

    public function test_meeting_chat_requires_face_to_face_acknowledgements_and_stays_private_to_office(): void
    {
        $a = $this->person(); $b = $this->person(); $room = $this->invite($a, $b);
        $this->actingAs($b)->postJson(route('virtual-office.meetings.respond'), ['id' => $room['id'], 'action' => 'accept'])->assertOk();
        $this->actingAs($a)->postJson(route('virtual-office.meetings.send'), ['id' => $room['id'], 'message' => 'Belum siap'])->assertStatus(409);
        $this->assertDatabaseCount('chat_messages', 0);
        $this->getJson(route('virtual-office.live'))->assertOk();
        $this->actingAs($b)->getJson(route('virtual-office.live').'?ready='.$room['id'])->assertOk()->assertJsonPath('ready', false);
        $this->actingAs($a)->getJson(route('virtual-office.live').'?ready='.$room['id'])->assertOk()->assertJsonPath('ready', true);
        $this->postJson(route('virtual-office.meetings.send'), ['id' => $room['id'], 'message' => '<script>alert(1)</script>'])->assertCreated();
        $this->assertDatabaseCount('chat_messages', 0);
        $this->assertDatabaseCount('virtual_office_messages', 1);
        $this->actingAs($b)->getJson(route('virtual-office.live').'?ready='.$room['id'])->assertOk()->assertJsonCount(1, 'messages');
        $row = DB::table('virtual_office_messages')->first();
        $this->assertSame($a->id, $row->user_id); $this->assertSame($b->id, $row->target_id); $this->assertSame('<script>alert(1)</script>', $row->message);
        $this->postJson(route('virtual-office.meetings.respond'), ['id' => $room['id'], 'action' => 'end'])->assertOk();
        $this->actingAs($a)->postJson(route('virtual-office.meetings.send'), ['id' => $room['id'], 'message' => 'Sudah selesai'])->assertNotFound();
    }

    public function test_hidden_owner_viewer_locked_user_and_inactive_leases_cannot_be_used_to_send(): void
    {
        $a = $this->person(); $viewer = $this->person(['role' => 'viewer']);
        $hidden = $this->person(['name' => 'Nazar', 'email' => 'superadmin@sucofindo.com', 'role' => 'superadmin']);
        $locked = $this->person(['is_active' => false]);
        $this->actingAs($a)->postJson(route('virtual-office.meetings.invite'), ['target_id' => $hidden->id])->assertNotFound();
        $this->postJson(route('virtual-office.meetings.invite'), ['target_id' => $viewer->id])->assertForbidden();
        $this->postJson(route('virtual-office.meetings.invite'), ['target_id' => $locked->id])->assertForbidden();
        $this->actingAs($viewer)->postJson(route('virtual-office.meetings.invite'), ['target_id' => $a->id])->assertForbidden();
        $b = $this->person(); $room = $this->invite($a, $b);
        $this->actingAs($b)->postJson(route('virtual-office.meetings.respond'), ['id' => $room['id'], 'action' => 'accept'])->assertOk();
        Cache::put('office:meeting:ready:'.$a->id, $room['id'], 12); Cache::put('office:meeting:ready:'.$b->id, $room['id'], 12);
        $this->actingAs($a)->postJson(route('virtual-office.meetings.send'), ['id' => $room['id'], 'message' => 'Lease belum aktif'])->assertStatus(409);
        $this->travel(4)->minutes(); $this->assertNull(app(VirtualOfficeMeetings::class)->current($viewer->id));
    }

    public function test_pending_meetings_expire_and_do_not_change_online_state_or_write_chat(): void
    {
        $a = $this->person(); $b = $this->person(); $this->invite($a, $b);
        $this->travel(4)->minutes();
        $this->actingAs($b)->getJson(route('virtual-office.live'))->assertOk()->assertJsonPath('room', null);
        $this->assertDatabaseCount('chat_messages', 0);
        $this->assertSame($a->id, Cache::get('presence:user:'.$a->id)['id']);
    }
}
