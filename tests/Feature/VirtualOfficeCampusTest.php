<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\VirtualOfficeActivity;
use App\Services\VirtualOfficeAvatar;
use App\Services\VirtualOfficePresence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class VirtualOfficeCampusTest extends TestCase
{
    use RefreshDatabase;

    private function person(array $attributes = []): User
    {
        return User::factory()->create($attributes + ['department' => 'umum', 'role' => 'user', 'is_active' => true]);
    }

    private function preference(array $overrides = []): array
    {
        return $overrides + ['avatar' => VirtualOfficeAvatar::defaults('female'), 'version' => 0, 'share_activity' => true];
    }

    public function test_viewer_can_personalize_only_their_own_avatar_and_feed_updates_immediately(): void
    {
        $user = $this->person(['role' => 'viewer']);
        $other = $this->person();
        app(VirtualOfficePresence::class)->snapshot($user);
        $data = $this->preference(); $data['avatar']['hair'] = 'hijab'; $data['avatar']['accessory'] = 'glasses';
        $this->actingAs($user)->postJson(route('virtual-office.avatar'), $data)->assertOk()->assertJsonPath('version', 1)
            ->assertJsonPath('avatar.hair', 'hijab')->assertHeader('Cache-Control', 'no-store, private');
        $this->assertDatabaseHas('virtual_office_profiles', ['user_id' => $user->id, 'version' => 1]);
        $this->assertDatabaseMissing('virtual_office_profiles', ['user_id' => $other->id]);
        $person = collect($this->getJson(route('virtual-office.presence'))->assertOk()->json('people'))->firstWhere('id', $user->id);
        $this->assertSame('hijab', $person['avatar']['hair']);
        $this->postJson(route('virtual-office.avatar'), $this->preference(['user_id' => $other->id]))->assertUnprocessable();
        $this->assertDatabaseMissing('virtual_office_profiles', ['user_id' => $other->id]);
    }

    public function test_avatar_rejects_asset_urls_unknown_fields_and_stale_versions(): void
    {
        $user = $this->person(); $this->actingAs($user);
        $data = $this->preference(); $data['avatar']['hair'] = 'https://attacker.test/pixel';
        $this->postJson(route('virtual-office.avatar'), $data)->assertUnprocessable();
        $data = $this->preference(); $data['avatar']['url'] = 'javascript:alert(1)';
        $this->postJson(route('virtual-office.avatar'), $data)->assertUnprocessable();
        $this->postJson(route('virtual-office.avatar'), $this->preference())->assertOk();
        $this->postJson(route('virtual-office.avatar'), $this->preference())->assertStatus(409);
        $this->postJson(route('virtual-office.avatar'), $this->preference(['version' => 1]))->assertOk()->assertJsonPath('version', 2);
    }

    public function test_personal_activity_privacy_is_enforced_for_history_and_current_menu(): void
    {
        $person = $this->person(); $viewer = $this->person(['department' => 'operasional']);
        $this->actingAs($person)->postJson(route('virtual-office.avatar'), $this->preference(['share_activity' => false]))->assertOk();
        app(VirtualOfficeActivity::class)->record($person, 'ppbj');
        Cache::put('presence:user:'.$person->id, ['id' => $person->id], 300);
        $this->actingAs($viewer)->getJson(route('virtual-office.activity', $person))->assertForbidden();
        $roster = $this->getJson(route('virtual-office.presence'))->assertOk()->json('people');
        $this->assertNull(collect($roster)->firstWhere('id', $person->id)['current_menu']);
        $this->actingAs($person)->getJson(route('virtual-office.activity', $person))->assertOk()->assertJsonPath('visits.0.menu', 'PPBJ');
        $roster = $this->getJson(route('virtual-office.presence'))->json('people');
        $this->assertSame('PPBJ', collect($roster)->firstWhere('id', $person->id)['current_menu']);
    }

    public function test_journal_returns_only_safe_menu_names_for_the_requested_day_with_a_hard_limit(): void
    {
        $this->travelTo(now('Asia/Jakarta')->setTime(12, 0));
        $person = $this->person(); $viewer = $this->person();
        DB::table('virtual_office_visits')->insert(array_fill(0, 105, ['user_id' => $person->id, 'menu' => 'ppbj', 'visited_at' => now()]));
        DB::table('virtual_office_visits')->insert(['user_id' => $person->id, 'menu' => 'sp', 'visited_at' => now()->subDay()]);
        $json = $this->actingAs($viewer)->getJson(route('virtual-office.activity', $person))->assertOk()
            ->assertJsonCount(100, 'visits')->assertJsonPath('limited', true)->json();
        $this->assertSame(['menu', 'at'], array_keys($json['visits'][0]));
        $this->getJson(route('virtual-office.activity', $person).'?date='.now()->subDay()->toDateString())->assertOk()->assertJsonCount(1, 'visits')->assertJsonPath('visits.0.menu', 'Surat Pesanan');
        $this->getJson(route('virtual-office.activity', $person).'?date='.now()->addDay()->toDateString())->assertUnprocessable();
        $this->getJson(route('virtual-office.activity', $person).'?date='.now()->subDays(30)->toDateString())->assertUnprocessable();
    }

    public function test_hidden_or_inactive_people_and_other_departments_cannot_be_probed(): void
    {
        $owner = $this->person(['name' => 'Nazar', 'email' => 'superadmin@sucofindo.com', 'role' => 'superadmin']);
        $inactive = $this->person(['is_active' => false]); $other = $this->person(['department' => 'lainnya']);
        $viewer = $this->person();
        $this->getJson(route('virtual-office.activity', $viewer))->assertUnauthorized();
        $this->postJson(route('virtual-office.avatar'), $this->preference())->assertUnauthorized();
        $this->actingAs($viewer);
        foreach ([$owner, $inactive, $other] as $person) $this->getJson(route('virtual-office.activity', $person))->assertNotFound();
        $this->actingAs($other)->postJson(route('virtual-office.avatar'), $this->preference())->assertForbidden();
    }

    public function test_visit_recording_is_coarse_deduplicated_and_does_not_log_hidden_people(): void
    {
        $person = $this->person(); $service = app(VirtualOfficeActivity::class);
        $service->record($person, 'ppbj'); $service->record($person, 'ppbj'); $service->record($person, 'owner-center');
        $this->assertDatabaseCount('virtual_office_visits', 1);
        $service->record($person, 'sp'); $service->record($person, 'ppbj');
        $this->assertDatabaseCount('virtual_office_visits', 3);
        $person->update(['name' => 'Nazar', 'email' => 'superadmin@sucofindo.com', 'role' => 'superadmin']);
        $service->record($person, 'virtual-office'); $this->assertDatabaseCount('virtual_office_visits', 3);
        $this->assertNull(VirtualOfficeActivity::menuForRoute('owner.index'));
        $this->assertSame('dashboard', VirtualOfficeActivity::menuForRoute('ops.dashboard'));
        $this->assertSame('tracking-pr', VirtualOfficeActivity::menuForRoute('tracking.index'));
        $this->assertSame('torpr', VirtualOfficeActivity::menuForRoute('torpr.index'));
        $this->assertSame('command-center', VirtualOfficeActivity::menuForRoute('command-center.index'));
    }

    public function test_retention_prunes_only_old_office_visits(): void
    {
        $person = $this->person();
        foreach ([now()->subDays(31), now()] as $at) DB::table('virtual_office_visits')->insert(['user_id' => $person->id, 'menu' => 'ppbj', 'visited_at' => $at]);
        $this->artisan('office:prune-visits')->assertSuccessful();
        $this->assertDatabaseCount('virtual_office_visits', 1);
        $this->assertDatabaseHas('users', ['id' => $person->id]);
    }

    public function test_successful_html_menu_visits_are_recorded_but_polling_and_private_routes_are_not(): void
    {
        $person = $this->person();
        $this->actingAs($person)->get(route('virtual-office.index').'?search=private-content')->assertOk();
        $this->assertDatabaseHas('virtual_office_visits', ['user_id' => $person->id, 'menu' => 'virtual-office']);
        $before = DB::table('virtual_office_visits')->count();
        $this->getJson(route('virtual-office.presence'))->assertOk();
        $this->getJson(route('virtual-office.activity', $person))->assertOk();
        $this->assertDatabaseCount('virtual_office_visits', $before);
        $this->postJson(route('presence.heartbeat'), ['menu' => 'https://attacker.test/private', 'idle' => false])->assertUnprocessable();
        $this->postJson(route('presence.heartbeat'), ['menu' => 'ppbj', 'idle' => false])->assertOk();
        $this->assertSame('ppbj', Cache::get('office:menu:'.$person->id));
        $this->postJson(route('presence.heartbeat'), ['menu' => null, 'idle' => false])->assertOk();
        $this->assertNull(Cache::get('office:menu:'.$person->id));
        $this->assertDatabaseCount('virtual_office_visits', $before);
    }
}
