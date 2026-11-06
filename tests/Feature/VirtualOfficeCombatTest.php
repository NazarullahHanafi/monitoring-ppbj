<?php
namespace Tests\Feature;

use App\Models\User;
use App\Services\VirtualOfficeCombat;
use App\Services\VirtualOfficeHomes;
use App\Services\VirtualOfficePilot;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Tests\TestCase;

class VirtualOfficeCombatTest extends TestCase
{
    use RefreshDatabase;
    use \Tests\Concerns\PlacesOfficeAvatar;
    private function person(array $attributes=[]): User {return User::factory()->create($attributes+['department'=>'umum','role'=>'user','is_active'=>true]);}
    private function place(User $user,float $x=0,float $z=20,array $extra=[]): array {
        $session=(string)Str::uuid();$state=array_merge(['x'=>$x,'y'=>-.12,'z'=>$z,'yaw'=>0,'action'=>'idle','seq'=>0,'credit'=>5,'hp'=>100,'combat_version'=>1,'session_id'=>$session,'updated_ms'=>now()->getTimestampMs()],$extra);
        Cache::put(VirtualOfficePilot::key($user->id),$state,900);Cache::put(VirtualOfficePilot::lease($user->id),$session,900);return $state;
    }
    private function own(User $user,string $weapon='pistol'): void {DB::table('virtual_office_weapons')->insert(['user_id'=>$user->id,'weapon'=>$weapon,'created_at'=>now()]);}
    private function shot(User $a,User $b,string $kind='pistol',?string $id=null){return $this->actingAs($a)->postJson(route('virtual-office.combat.attack'),['target_id'=>$b->id,'kind'=>$kind,'request_id'=>$id??(string)Str::uuid()]);}
    public function test_armory_requires_location_uses_server_prices_and_does_not_double_charge(): void {
        $u=$this->person();$this->actingAs($u)->getJson(route('virtual-office.combat'))->assertOk()->assertJsonPath('balance',1000);$request=['weapon'=>'pistol','request_id'=>(string)Str::uuid()];
        $this->postJson(route('virtual-office.combat.buy'),$request)->assertStatus(409);$this->placeAvatar($u,'armory');
        $this->postJson(route('virtual-office.combat.buy'),$request+['price'=>1])->assertUnprocessable();
        $this->postJson(route('virtual-office.combat.buy'),$request)->assertOk()->assertJsonPath('balance',750)->assertJsonPath('owned.0','pistol')->assertJsonPath('self.weapon','pistol');
        $this->postJson(route('virtual-office.combat.buy'),$request)->assertOk()->assertJsonPath('balance',750);
        $this->postJson(route('virtual-office.combat.buy'),['weapon'=>'sniper','request_id'=>(string)Str::uuid()])->assertUnprocessable();
        $this->postJson(route('virtual-office.combat.equip'),['weapon'=>'sniper'])->assertForbidden();$this->postJson(route('virtual-office.combat.equip'),['weapon'=>'pistol'])->assertOk()->assertJsonPath('self.weapon','pistol');
        $this->assertDatabaseCount('virtual_office_weapons',1);$this->assertDatabaseCount('virtual_office_orders',0);
    }
    public function test_server_hits_are_idempotent_enforce_cooldown_and_never_disclose_pilot_lease(): void {
        $a=$this->person();$b=$this->person();$this->own($a);$this->place($a,0,20,['weapon'=>'pistol']);$this->place($b,0,22);$id=(string)Str::uuid();
        $result=$this->shot($a,$b,'pistol',$id)->assertOk()->assertJsonPath('hp',75)->assertJsonPath('knockout',false)->json();$this->assertArrayNotHasKey('session_id',$result['self']);
        $this->shot($a,$b,'pistol',$id)->assertOk()->assertJsonPath('hp',75);$this->shot($a,$b)->assertUnprocessable();$this->assertEquals(75,VirtualOfficePilot::current($b->id)['hp']);
        $this->actingAs($a)->postJson(route('virtual-office.combat.attack'),['target_id'=>$b->id,'kind'=>'pistol','request_id'=>(string)Str::uuid(),'damage'=>999])->assertUnprocessable();
    }
    public function test_knockout_respawns_in_own_home_and_stale_movement_cannot_undo_it(): void {
        $a=$this->person();$b=$this->person();$this->own($a,'sniper');$this->place($a,0,20,['weapon'=>'sniper']);$before=$this->place($b,0,22);
        $this->shot($a,$b,'sniper')->assertOk()->assertJsonPath('knockout',true);$state=VirtualOfficePilot::current($b->id);$home=VirtualOfficeHomes::own($b);$this->assertTrue(VirtualOfficeHomes::inside($state,$home));$this->assertEquals(100,$state['hp']);$this->assertTrue(app(VirtualOfficePilot::class)->free($state['x'],$state['z'],null,.22));$this->assertGreaterThan(now()->getTimestampMs(),$state['shield_until']);
        $old=['session_id'=>$before['session_id'],'mode'=>'move','seq'=>1,'x'=>$before['x'],'y'=>-.12,'z'=>$before['z'],'yaw'=>0,'action'=>'walk'];
        $this->actingAs($b)->postJson(route('virtual-office.pilot'),$old)->assertOk()->assertJsonPath('self.respawn_id',$state['respawn_id'])->assertJsonPath('self.x',$state['x']);
        $ack=array_replace($old,['respawn_id'=>$state['respawn_id'],'x'=>$state['x'],'y'=>.22,'z'=>$state['z'],'action'=>'idle']);$this->postJson(route('virtual-office.pilot'),$ack)->assertOk()->assertJsonPath('self.seq',1);
        $this->assertDatabaseCount('virtual_office_orders',0);
    }
    public function test_walls_range_offline_users_and_private_owners_are_not_valid_targets(): void {
        $a=$this->person();$b=$this->person();$this->own($a,'sniper');$this->place($a,-32,10,['weapon'=>'sniper']);$this->place($b,-32,14);$this->shot($a,$b,'sniper')->assertUnprocessable();
        $this->place($a,0,20,['weapon'=>'sniper']);$this->place($b,80,20);$this->shot($a,$b,'sniper')->assertUnprocessable();Cache::forget(VirtualOfficePilot::lease($b->id));$this->shot($a,$b,'sniper')->assertStatus(409);
        config(['app.owner_emails'=>[$b->email]]);$b->forceFill(['name'=>'Nazar','role'=>'superadmin'])->save();$this->shot($a,$b,'sniper')->assertNotFound();$this->assertEquals(100,Cache::get(VirtualOfficePilot::key($b->id))['hp']);
    }
    public function test_specials_require_active_matching_mode_and_respect_document_and_respawn_shields(): void {
        $a=$this->person();$b=$this->person();$this->place($a);$this->place($b,0,23);$this->shot($a,$b,'indra_arrow')->assertUnprocessable();
        $this->place($a,0,20,['form'=>'susanoo','form_until'=>now()->getTimestampMs()+60000]);$this->shot($a,$b,'indra_arrow')->assertOk()->assertJsonPath('hp',25);
        $this->travel(7)->seconds();$this->place($a,0,20,['form'=>'kurama','form_until'=>now()->getTimestampMs()+60000]);$this->place($b,0,23,['workspace'=>true]);$this->shot($a,$b,'bijudama')->assertStatus(409);
        $this->place($b,0,23,['shield_until'=>now()->getTimestampMs()+8000]);$this->shot($a,$b,'bijudama')->assertStatus(409);
        $this->place($b,0,23);$this->shot($a,$b,'bijudama')->assertOk()->assertJsonPath('hp',10);$this->place($a,0,20,['form'=>'kurama','form_until'=>now()->getTimestampMs()-1]);$this->shot($a,$b,'bijudama')->assertUnprocessable();
    }
    public function test_viewers_locked_users_and_global_read_only_cannot_purchase_or_attack(): void {
        foreach([['role'=>'viewer'],['is_active'=>false],['department'=>'elsewhere']]as$attrs){$u=$this->person($attrs);$status=isset($attrs['is_active'])?423:403;$this->actingAs($u)->getJson(route('virtual-office.combat'))->assertStatus($status);$this->actingAs($u)->postJson(route('virtual-office.combat.buy'),['weapon'=>'pistol','request_id'=>(string)Str::uuid()])->assertStatus($status);}
        $u=$this->person();Cache::put('simonpr:read_only_mode',true);$this->actingAs($u)->getJson(route('virtual-office.combat'))->assertForbidden();$this->assertDatabaseCount('virtual_office_weapons',0);
    }
    public function test_a_browser_opened_before_the_release_cannot_be_respawned_without_acknowledgement_support(): void {
        $a=$this->person();$b=$this->person();$this->own($a,'sniper');$this->place($a,0,20,['weapon'=>'sniper']);$this->place($b,0,22,['combat_version'=>0]);$this->shot($a,$b,'sniper')->assertStatus(409);$this->assertEquals(100,VirtualOfficePilot::current($b->id)['hp']);
    }
    private function fire(User $user,string $kind,array $aim,?string $requestId=null){return $this->actingAs($user)->postJson(route('virtual-office.combat.fire'),['kind'=>$kind,'aim'=>$aim,'request_id'=>$requestId??(string)Str::uuid()]);}
    public function test_free_shots_and_mode_arrows_render_without_a_player_target_and_keep_server_origin(): void {
        $a=$this->person();$this->own($a);$this->place($a,0,20,['weapon'=>'pistol']);$id=(string)Str::uuid();$point=['x'=>8,'y'=>3,'z'=>20];
        $first=$this->fire($a,'pistol',$point,$id)->assertOk()->assertJsonPath('hit',false)->assertJsonPath('self.shot_kind','pistol')->assertJsonPath('self.weapon','pistol')->json();
        $this->assertEquals(1.08,$first['self']['shot_origin']['y']);$this->fire($a,'pistol',$point,$id)->assertOk()->assertJsonPath('self.combat_revision',$first['self']['combat_revision']);
        $this->fire($a,'pistol',$point)->assertUnprocessable();$this->travel(1)->seconds();
        $this->place($a,0,20,['form'=>'susanoo','form_until'=>now()->getTimestampMs()+60000]);$this->fire($a,'indra_arrow',['x'=>0,'y'=>2,'z'=>45])->assertOk()->assertJsonPath('self.shot_kind','indra_arrow')->assertJsonPath('hit',false);
        $this->place($a,0,20,['form'=>'kurama','form_until'=>now()->getTimestampMs()+60000]);$this->fire($a,'bijudama',['x'=>0,'y'=>3,'z'=>45])->assertOk()->assertJsonPath('self.shot_kind','bijudama');
    }
    public function test_crosshair_hits_only_the_nearest_active_avatar_and_a_net_stops_the_projectile(): void {
        $a=$this->person();$b=$this->person();$c=$this->person();$this->own($a);foreach([$a,$b,$c]as$person)Cache::put('presence:user:'.$person->id,['id'=>$person->id],300);
        $this->place($a,0,20,['weapon'=>'pistol']);$this->place($b,0,23);$this->place($c,0,25);
        $this->fire($a,'pistol',['x'=>0,'y'=>1.08,'z'=>30])->assertOk()->assertJsonPath('hit',true)->assertJsonPath('target_id',$b->id)->assertJsonPath('hp',75);
        $this->assertEquals(100,VirtualOfficePilot::current($c->id)['hp']);
        $this->place($a,-32,10,['weapon'=>'pistol']);$this->place($b,-32,14);
        $response=$this->fire($a,'pistol',['x'=>-32,'y'=>1.08,'z'=>16])->assertOk()->assertJsonPath('hit',false)->json();$this->assertLessThan(12,$response['self']['shot_end']['z']);$this->assertEquals(100,VirtualOfficePilot::current($b->id)['hp']);
    }
    public function test_aimed_knockout_respawns_and_protected_targets_still_allow_a_visible_shot_without_damage(): void {
        $a=$this->person();$b=$this->person();$this->own($a,'sniper');foreach([$a,$b]as$person)Cache::put('presence:user:'.$person->id,['id'=>$person->id],300);
        $this->place($a,0,20,['weapon'=>'sniper']);$this->place($b,0,23,['workspace'=>true]);$point=['x'=>0,'y'=>1.08,'z'=>30];
        $this->fire($a,'sniper',$point)->assertOk()->assertJsonPath('hit',false)->assertJsonPath('self.shot_kind','sniper');$this->assertEquals(100,VirtualOfficePilot::current($b->id)['hp']);
        $this->place($a,0,20,['weapon'=>'sniper']);$this->place($b,0,23);$this->fire($a,'sniper',$point)->assertOk()->assertJsonPath('knockout',true);$this->assertTrue(VirtualOfficeHomes::inside(VirtualOfficePilot::current($b->id),VirtualOfficeHomes::own($b)));
    }
    public function test_ray_endpoint_rejects_forged_damage_invalid_aim_and_unowned_weapons(): void {
        $a=$this->person();$this->place($a);$this->fire($a,'sniper',['x'=>0,'y'=>1,'z'=>30])->assertForbidden();$this->fire($a,'indra_arrow',['x'=>0,'y'=>1,'z'=>30])->assertUnprocessable();
        $this->fire($a,'pistol',['x'=>0,'y'=>100000,'z'=>30])->assertUnprocessable();$this->actingAs($a)->postJson(route('virtual-office.combat.fire'),['kind'=>'pistol','aim'=>['x'=>0,'y'=>1,'z'=>30],'damage'=>999,'request_id'=>(string)Str::uuid()])->assertUnprocessable();
    }
    public function test_owned_weapons_can_be_switched_away_from_shop_without_charging_again(): void {
        $u=$this->person();$this->own($u);$this->own($u,'sniper');$this->place($u,0,20,['weapon'=>'pistol']);
        $this->actingAs($u)->getJson(route('virtual-office.combat'))->assertOk()->assertJsonCount(2,'owned');
        foreach(['sniper','pistol',null,'sniper']as$weapon)$this->postJson(route('virtual-office.combat.equip'),['weapon'=>$weapon])->assertOk()->assertJsonPath('self.weapon',$weapon);
        $this->assertDatabaseCount('virtual_office_weapons',2);$this->assertDatabaseCount('virtual_office_ledger',1);$this->assertDatabaseHas('virtual_office_wallets',['user_id'=>$u->id,'balance'=>1000]);
    }
    public function test_a_gun_aims_from_the_active_giant_height_and_expired_forms_restore_normal_origin(): void {
        $u=$this->person();$this->own($u);$height=VirtualOfficePilot::abilities()['skills']['susanoo']['height']*.55;
        $this->place($u,0,20,['weapon'=>'pistol','form'=>'susanoo','form_until'=>now()->getTimestampMs()+60000]);
        $response=$this->fire($u,'pistol',['x'=>0,'y'=>$height-.12,'z'=>40])->assertOk()->json();$this->assertEqualsWithDelta($height-.12,$response['self']['shot_origin']['y'],.00001);
        $this->place($u,0,20,['weapon'=>'pistol','form'=>'susanoo','form_until'=>now()->getTimestampMs()-1]);
        $this->fire($u,'pistol',['x'=>0,'y'=>1.08,'z'=>40])->assertOk()->assertJsonPath('self.shot_origin.y',1.08);
    }
}
