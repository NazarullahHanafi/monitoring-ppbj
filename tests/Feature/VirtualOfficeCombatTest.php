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
        $this->postJson(route('virtual-office.combat.buy'),$request)->assertOk()->assertJsonPath('balance',750)->assertJsonPath('owned.0','pistol');
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
}
