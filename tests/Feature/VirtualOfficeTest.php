<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\VirtualOfficePresence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class VirtualOfficeTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_and_unknown_departments_cannot_access_office_or_presence(): void
    {
        $this->get(route('virtual-office.index'))->assertRedirect(route('login'));
        $this->getJson(route('virtual-office.presence'))->assertUnauthorized();
        $other = User::factory()->create(['department' => 'lainnya']);
        $this->actingAs($other)->get(route('virtual-office.index'))->assertForbidden();
        $this->getJson(route('virtual-office.presence'))->assertForbidden();
    }

    public function test_both_departments_and_read_only_viewer_can_open_the_office(): void
    {
        foreach ([['umum', 'user'], ['operasional', 'user'], ['umum', 'viewer']] as [$department, $role]) {
            $user = User::factory()->create(['department' => $department, 'role' => $role]);
            $this->actingAs($user)->get(route('virtual-office.index'))->assertOk()
                ->assertSee('Kantor Virtual')->assertSee('voScene', false)->assertSee('voViewList', false)
                ->assertSee('bukan aktivitas nyata')->assertHeader('Cache-Control', 'no-store, private');
            $this->getJson(route('virtual-office.presence'))->assertOk()->assertJsonPath('refresh_seconds', 45);
        }
    }

    public function test_hidden_owner_inactive_users_and_other_departments_are_not_exposed(): void
    {
        $viewer = User::factory()->create(['department' => 'umum']);
        $owner = User::factory()->create(['name' => 'Nazar', 'email' => 'superadmin@sucofindo.com', 'role' => 'superadmin', 'department' => 'umum']);
        User::factory()->create(['name' => 'Locked person', 'department' => 'umum', 'is_active' => false]);
        User::factory()->create(['name' => 'Other department', 'department' => 'lainnya']);
        Cache::put('presence:user:'.$owner->id, ['id' => $owner->id], 300);
        $response = $this->actingAs($viewer)->getJson(route('virtual-office.presence'))->assertOk()->assertJsonCount(1, 'people');
        $response->assertJsonMissing(['name' => 'Nazar'])->assertJsonMissing(['name' => 'Locked person'])->assertJsonMissing(['name' => 'Other department']);
        $this->assertArrayNotHasKey('email', $response->json('people.0'));
        $this->assertArrayNotHasKey('role', $response->json('people.0'));
        $this->assertArrayNotHasKey('last_seen_ip', $response->json('people.0'));
    }
    public function test_game_panels_have_individual_close_controls_and_information_shares_one_hidden_sheet(): void
    {
        $u=User::factory()->create(['department'=>'umum','role'=>'user','is_active'=>true]);$html=$this->actingAs($u)->get(route('virtual-office.index'))->assertOk()->getContent();
        $dom=new \DOMDocument();$previous=libxml_use_internal_errors(true);try{$dom->loadHTML($html);}finally{libxml_clear_errors();libxml_use_internal_errors($previous);}$xpath=new \DOMXPath($dom);
        foreach(['voTeam','voHudPanels','voInfoPanel']as$id)$this->assertSame(1,$xpath->query('//*[@id="'.$id.'" and @hidden]')->length);
        foreach(['voWeatherStatus','voCameraMode','voQuality','voWallet','voOpenAvatar']as$id)$this->assertSame(1,$xpath->query('//*[@id="'.$id.'"]/ancestor::*[@id="voInfoPanel"]')->length,$id.' belongs to the same dismissible sheet.');
        foreach(['voCloseTeam'=>'voTeam','voCloseInfo'=>'voInfoPanel','voCloseHud'=>'voHudPanels']as$button=>$panel){$this->assertSame(1,$xpath->query('//*[@id="'.$button.'"]')->length);$this->assertSame(1,$xpath->query('//*[@id="'.$button.'"]/ancestor::*[@id="'.$panel.'"]')->length);}
        $this->assertSame(1,$xpath->query('//*[@id="voGameTeam"]/ancestor::nav[contains(@class,"vo-game-tools")]')->length);$this->assertSame(1,$xpath->query('//*[@id="voWeaponSelect"]')->length);
    }

    public function test_presence_and_mood_are_fresh_even_when_directory_is_warm_and_me_is_not_shared(): void
    {
        $first = User::factory()->create(['department' => 'umum']);
        $second = User::factory()->create(['department' => 'operasional']);
        $this->actingAs($first)->getJson(route('virtual-office.presence'))->assertJsonPath('counts.offline', 2);
        Cache::put('presence:user:'.$first->id, ['id' => $first->id, 'idle' => true, 'mood' => '☕'], 300);
        Cache::put('presence:user:'.$second->id, ['id' => $second->id, 'idle' => false], 300);
        Cache::put('presence:mood:'.$first->id, '😄', 300);
        $response = $this->actingAs($second)->getJson(route('virtual-office.presence'))->assertOk()
            ->assertJsonPath('counts.idle', 1)->assertJsonPath('counts.online', 1)->assertJsonPath('counts.offline', 0);
        $people = collect($response->json('people'))->keyBy('id');
        $this->assertFalse($people[$first->id]['is_me']);
        $this->assertTrue($people[$second->id]['is_me']);
        $this->assertSame('😄', $people[$first->id]['mood']);
        Cache::forget('presence:user:'.$first->id);
        $this->getJson(route('virtual-office.presence'))->assertJsonPath('counts.offline', 1);
    }

    public function test_mood_only_cache_entry_does_not_invent_online_presence(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        Cache::put('presence:user:'.$user->id, ['mood' => '😄'], 300);
        $this->actingAs($user)->getJson(route('virtual-office.presence'))->assertOk()->assertJsonPath('people.0.state', 'offline');
    }

    public function test_feed_uses_bounded_directory_and_world_queries_then_zero_sql_without_writing_activity(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        User::factory()->count(30)->create(['department' => 'operasional']);
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            $queries[] = strtolower($query->sql);
        });
        $this->actingAs($user)->getJson(route('virtual-office.presence'))->assertOk()->assertJsonCount(31, 'people');
        $this->assertCount(3, $queries);
        $this->assertTrue(collect($queries)->contains(fn($sql)=>str_contains($sql,'limit 122')));
        $queries = [];
        $this->getJson(route('virtual-office.presence'))->assertOk();
        $this->assertSame([], $queries);
        $this->assertNull($user->fresh()->last_seen_at);
    }

    public function test_locking_or_renaming_a_user_invalidates_the_directory_immediately(): void
    {
        $viewer = User::factory()->create(['department' => 'umum']);
        $target = User::factory()->create(['department' => 'operasional']);
        $this->actingAs($viewer)->getJson(route('virtual-office.presence'))->assertJsonCount(2, 'people');
        $target->update(['name' => 'Updated safely']);
        $this->getJson(route('virtual-office.presence'))->assertJsonFragment(['name' => 'Updated safely']);
        $target->update(['is_active' => false]);
        $this->assertFalse(Cache::has(VirtualOfficePresence::DIRECTORY_KEY));
        $this->getJson(route('virtual-office.presence'))->assertJsonCount(1, 'people');
    }

    public function test_directory_is_bounded_when_many_users_exist(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        User::factory()->count(125)->create(['department' => 'operasional']);
        $this->actingAs($user)->getJson(route('virtual-office.presence'))->assertOk()
            ->assertJsonCount(120, 'people')->assertJsonPath('limited', true);
    }

    public function test_heartbeat_accepts_only_a_boolean_idle_signal_without_logging_input_contents(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'viewer']);
        $this->actingAs($user)->postJson(route('presence.heartbeat'), ['idle' => true])->assertOk();
        $this->assertTrue(Cache::get('presence:user:'.$user->id)['idle']);
        $this->postJson(route('presence.heartbeat'), ['idle' => ['not-a-boolean']])->assertUnprocessable();
        $this->postJson(route('presence.heartbeat'), ['idle' => false])->assertOk();
        $this->assertFalse(Cache::get('presence:user:'.$user->id)['idle']);
    }

    public function test_3d_module_is_not_loaded_on_other_pages(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        $this->actingAs($user)->get(route('account.edit'))->assertOk()->assertDontSee('virtual-office-', false);
        $this->get(route('virtual-office.index'))->assertOk()->assertSee('virtual-office-', false);
    }

    public function test_person_names_cannot_break_out_of_the_initial_json_script(): void
    {
        $viewer = User::factory()->create(['department' => 'umum']);
        $name = '</script><img src=x onerror=alert(1)>';
        User::factory()->create(['department' => 'operasional', 'name' => $name]);
        $this->actingAs($viewer)->get(route('virtual-office.index'))->assertOk()->assertDontSee($name, false);
        $this->getJson(route('virtual-office.presence'))->assertOk()->assertJsonFragment(['name' => $name]);
    }
}
