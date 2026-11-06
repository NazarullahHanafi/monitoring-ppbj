<?php
namespace Tests\Feature;

use App\Models\User;
use App\Services\VirtualOfficeActivity;
use App\Services\VirtualOfficePilot;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Tests\TestCase;

class VirtualOfficePilotTest extends TestCase
{
    use RefreshDatabase;
    use \Tests\Concerns\PlacesOfficeAvatar;
    private function person(array $data=[]): User
    {
        $user=User::factory()->create($data+['department'=>'umum','role'=>'user','is_active'=>true]);Cache::put('presence:user:'.$user->id,['id'=>$user->id],300);return $user;
    }
    private function packet(array $data=[]): array
    {
        return $data+['session_id'=>(string)Str::uuid(),'mode'=>'claim','seq'=>0,'x'=>0,'y'=>-.12,'z'=>20,'yaw'=>0,'action'=>'idle'];
    }
    private function transformed(string $costume='sasuke',string $skill='susanoo'): array
    {
        $user=$this->person();$avatar=\App\Services\VirtualOfficeAvatar::defaults();$avatar['costume']=$costume;$this->actingAs($user)->postJson(route('virtual-office.avatar'),['avatar'=>$avatar,'share_activity'=>true,'version'=>0])->assertOk();
        $body=$this->packet();$self=$this->postJson(route('virtual-office.pilot'),$body)->assertOk()->json('self');$body=array_replace($body,['mode'=>'move','seq'=>1,'x'=>$self['x'],'z'=>$self['z']]);
        $self=$this->postJson(route('virtual-office.pilot'),array_replace($body,['skill'=>$skill,'skill_id'=>(string)Str::uuid()]))->assertOk()->json('self');return[$user,$body,$self];
    }
    public function test_own_manual_control_is_ephemeral_and_other_tabs_cannot_overwrite_an_active_session(): void
    {
        $user=$this->person();$body=$this->packet();$self=$this->actingAs($user)->postJson(route('virtual-office.pilot'),$body)->assertOk()->assertJsonCount(1,'peers')->json('self');
        $this->assertArrayNotHasKey('session_id',$self);$this->assertNotNull(VirtualOfficePilot::current($user->id));
        $this->postJson(route('virtual-office.pilot'),$this->packet())->assertStatus(409);
        $this->postJson(route('virtual-office.pilot'),$body+['user_id'=>$user->id+1])->assertUnprocessable();
        $this->travel(1)->seconds();$move=array_replace($body,['mode'=>'move','seq'=>1,'x'=>$self['x']+.4,'z'=>$self['z']]);
        $this->postJson(route('virtual-office.pilot'),$move)->assertOk()->assertJsonPath('self.seq',1);
        $this->postJson(route('virtual-office.pilot'),$move)->assertOk()->assertJsonPath('self.seq',1);
        $this->postJson(route('virtual-office.pilot.leave'),['session_id'=>$body['session_id']])->assertOk();
        $this->assertNull(VirtualOfficePilot::current($user->id));
        $this->postJson(route('virtual-office.pilot'),array_replace($move,['seq'=>2]))->assertStatus(409);
        $this->postJson(route('virtual-office.pilot'),$body)->assertStatus(409);
        $this->assertDatabaseCount('virtual_office_visits',0);
    }
    public function test_positions_cannot_teleport_out_of_bounds_or_sweep_through_a_thin_net(): void
    {
        $user=$this->person();$this->placeAvatar($user,'badminton');$cached=Cache::get(VirtualOfficePilot::key($user->id));$body=$this->packet(['session_id'=>$cached['session_id'],'mode'=>'move','seq'=>1,'x'=>32,'z'=>45]);
        $this->actingAs($user)->postJson(route('virtual-office.pilot'),$body)->assertUnprocessable();
        $this->postJson(route('virtual-office.pilot'),array_replace($body,['x'=>101]))->assertUnprocessable();
        $pilot=app(VirtualOfficePilot::class);$this->assertFalse($pilot->segment(['x'=>-32,'z'=>10],['x'=>-32,'z'=>14]));
        $this->assertTrue($pilot->free(90,75));$this->assertFalse($pilot->free(0,85));
        $this->assertFalse($pilot->free(100,10));
    }
    public function test_switching_to_a_business_menu_returns_avatar_to_computer_and_stale_packets_cannot_reactivate_it(): void
    {
        $user=$this->person();$body=$this->packet();$this->actingAs($user)->postJson(route('virtual-office.pilot'),$body)->assertOk();
        app(VirtualOfficeActivity::class)->record($user,'tracking-pr');
        $this->assertNull(VirtualOfficePilot::current($user->id));
        $this->getJson(route('virtual-office.presence'))->assertJsonPath('people.0.in_office',false)->assertJsonPath('people.0.pilot',null)->assertJsonPath('people.0.current_menu','Tracking PR');
        $this->postJson(route('virtual-office.pilot'),array_replace($body,['mode'=>'move','seq'=>1]))->assertStatus(409);
    }
    public function test_hidden_owner_can_control_private_self_without_being_disclosed_to_other_people(): void
    {
        $hidden=$this->person(['email'=>'superadmin@sucofindo.com','name'=>'Nazar','role'=>'superadmin']);$viewer=$this->person(['role'=>'viewer']);
        $this->actingAs($hidden)->postJson(route('virtual-office.pilot'),$this->packet())->assertOk()->assertJsonCount(0,'peers');
        $this->actingAs($viewer)->postJson(route('virtual-office.pilot'),$this->packet())->assertOk()->assertJsonCount(1,'peers')->assertJsonMissing(['id'=>$hidden->id]);
        $this->getJson(route('virtual-office.presence'))->assertJsonMissing(['id'=>$hidden->id]);
        $this->actingAs($hidden)->get(route('virtual-office.index'))->assertOk()->assertSee('privateSelf',false);
    }
    public function test_games_and_dining_require_walking_to_the_right_place_first(): void
    {
        $user=$this->person();$other=$this->person();Cache::forget('presence:user:'.$other->id);$this->actingAs($user);
        $this->postJson(route('virtual-office.game.invite'),['kind'=>'badminton','target_id'=>$other->id])->assertStatus(409);
        $this->getJson(route('virtual-office.recreation'))->assertOk();
        $this->postJson(route('virtual-office.checkout'),['request_id'=>(string)Str::uuid(),'destination'=>'bar','items'=>[['item'=>'espresso','quantity'=>1]]])->assertStatus(409);
        $this->placeAvatar($user,'badminton');$this->postJson(route('virtual-office.game.invite'),['kind'=>'badminton','target_id'=>$other->id])->assertCreated();
        $this->assertDatabaseCount('virtual_office_orders',0);
    }
    public function test_costumes_are_whitelisted_own_only_and_cover_five_series_with_thirty_characters(): void
    {
        $user=$this->person();$catalog=\App\Services\VirtualOfficeAvatar::costumes();$this->assertCount(30,$catalog);$this->assertCount(5,array_unique(array_column($catalog,'anime')));
        $this->actingAs($user);$data=['version'=>0,'share_activity'=>true,'avatar'=>\App\Services\VirtualOfficeAvatar::defaults()];$data['avatar']['costume']='sakura';
        $this->postJson(route('virtual-office.avatar'),$data)->assertOk()->assertJsonPath('avatar.costume','sakura');
        $data['version']=1;$data['avatar']['costume']='https://untrusted.example/model.glb';$this->postJson(route('virtual-office.avatar'),$data)->assertUnprocessable();
    }
    public function test_corrections_return_only_safe_canonical_position_and_keep_the_active_session(): void
    {
        $user=$this->person();$body=$this->packet();$self=$this->actingAs($user)->postJson(route('virtual-office.pilot'),$body)->assertOk()->json('self');
        $response=$this->postJson(route('virtual-office.pilot'),array_replace($body,['mode'=>'move','seq'=>1,'x'=>90,'z'=>75]))->assertUnprocessable()->assertJsonPath('self.x',$self['x']);
        $this->assertArrayNotHasKey('session_id',$response->json('self'));$this->assertNotNull(VirtualOfficePilot::current($user->id));
        $this->travel(12)->seconds();$this->assertNotNull(VirtualOfficePilot::current($user->id));
    }
    public function test_home_door_is_owned_requires_proximity_and_blocks_walking_when_closed(): void
    {
        $user=$this->person();$other=$this->person();$body=$this->packet();$this->actingAs($user)->postJson(route('virtual-office.pilot'),$body)->assertOk();
        $door=['session_id'=>$body['session_id'],'open'=>true];$this->postJson(route('virtual-office.home.door'),$door)->assertStatus(409);
        $home=\App\Services\VirtualOfficeHomes::own($user);$state=VirtualOfficePilot::current($user->id);$state['x']=$home['x'];$state['z']=$home['z']+5;Cache::put(VirtualOfficePilot::key($user->id),$state,900);
        $this->travel(1)->seconds();$move=array_replace($body,['mode'=>'move','seq'=>1,'x'=>$home['x'],'z'=>$home['z']+2.8]);
        $this->postJson(route('virtual-office.pilot'),$move)->assertUnprocessable();
        $this->postJson(route('virtual-office.home.door'),$door+['home_id'=>$other->id])->assertUnprocessable();
        $this->postJson(route('virtual-office.home.door'),$door)->assertOk()->assertJsonPath('self.door_open',true);
        $this->postJson(route('virtual-office.pilot'),$move)->assertOk();
        $this->postJson(route('virtual-office.home.door'),array_replace($door,['open'=>false]))->assertOk()->assertJsonPath('self.door_open',false);
        $this->travel(1)->seconds();$this->postJson(route('virtual-office.pilot'),array_replace($move,['seq'=>2,'z'=>$home['z']+5]))->assertUnprocessable();
        $next=\App\Services\VirtualOfficeHomes::own($other);$this->assertFalse(app(VirtualOfficePilot::class)->segment(['x'=>$next['x'],'z'=>$next['z']+5],['x'=>$next['x'],'z'=>$next['z']+2.8],$home['slot']));
        $this->assertDatabaseCount('virtual_office_visits',0);
    }
    public function test_rest_poses_are_synced_at_beach_and_invalid_poses_are_rejected(): void
    {
        $user=$this->person();$this->placeAvatar($user,'beach');$state=VirtualOfficePilot::current($user->id);$body=$this->packet(['session_id'=>$state['session_id'],'mode'=>'move','x'=>$state['x'],'z'=>$state['z'],'venue'=>'beach','action'=>'rest']);
        $this->actingAs($user);foreach(['sit','recline','nap','meditate']as$i=>$pose)$this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>$i+1,'pose'=>$pose]))->assertOk()->assertJsonPath('self.pose',$pose)->assertJsonPath('self.action','rest');
        $this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>5,'pose'=>'javascript:alert(1)']))->assertUnprocessable();
    }
    public function test_running_packets_can_cover_normal_network_latency_without_allowing_large_teleports(): void
    {
        $user=$this->person();$body=$this->packet();$self=$this->actingAs($user)->postJson(route('virtual-office.pilot'),$body)->assertOk()->json('self');
        for($i=1;$i<=5;$i++){$this->travel(800)->milliseconds();$x=$self['x']+$i*7.2;$this->postJson(route('virtual-office.pilot'),array_replace($body,['mode'=>'move','seq'=>$i,'x'=>$x,'z'=>$self['z'],'action'=>'run']))->assertOk();}
        $this->postJson(route('virtual-office.pilot'),array_replace($body,['mode'=>'move','seq'=>6,'x'=>99,'z'=>$self['z'],'action'=>'run']))->assertUnprocessable()->assertJsonPath('self.seq',5);
    }
    public function test_rest_at_the_regular_spawn_is_supported_and_keeps_the_selected_pose(): void
    {
        $user=$this->person();$body=$this->packet();$self=$this->actingAs($user)->postJson(route('virtual-office.pilot'),$body)->assertOk()->json('self');
        foreach(['sit','recline','nap','meditate']as$i=>$pose)$this->postJson(route('virtual-office.pilot'),array_replace($body,['mode'=>'move','seq'=>$i+1,'x'=>$self['x'],'z'=>$self['z'],'action'=>'rest','venue'=>'campus','pose'=>$pose]))->assertOk()->assertJsonPath('self.pose',$pose);
    }
    public function test_real_client_double_jump_trace_crosses_low_fence_and_preserves_server_position(): void
    {
        $trace=json_decode(file_get_contents(base_path('tests/Fixtures/virtual-office-double-jump.json')),true,512,JSON_THROW_ON_ERROR);$user=$this->person();$body=$this->packet();$this->actingAs($user)->postJson(route('virtual-office.pilot'),$body)->assertOk();
        $state=array_merge(VirtualOfficePilot::current($user->id),$trace['initial']);Cache::put(VirtualOfficePilot::key($user->id),$state,900);$start=now();
        foreach($trace['packets']as$i=>$packet){$this->travelTo($start->copy()->addMilliseconds($packet['ms']));unset($packet['ms']);$this->postJson(route('virtual-office.pilot'),array_replace($body,$packet,['mode'=>'move','seq'=>$i+1]))->assertOk()->assertJsonPath('self.seq',$i+1);}
        $this->assertGreaterThan(-41,VirtualOfficePilot::current($user->id)['x']);$this->assertEquals(-.12,VirtualOfficePilot::current($user->id)['y']);
        $pilot=app(VirtualOfficePilot::class);$this->assertFalse($pilot->segment(['x'=>-32,'y'=>2,'z'=>10],['x'=>-32,'y'=>2,'z'=>14]),'A high jump must not bypass the badminton net.');
    }
    public function test_jump_height_vertical_speed_and_airtime_are_bounded(): void
    {
        $user=$this->person();$body=$this->packet();$self=$this->actingAs($user)->postJson(route('virtual-office.pilot'),$body)->assertOk()->json('self');$move=array_replace($body,$self,['mode'=>'move','seq'=>1,'action'=>'jump','y'=>1]);
        $this->postJson(route('virtual-office.pilot'),$move)->assertUnprocessable();$this->travel(200)->milliseconds();$this->postJson(route('virtual-office.pilot'),$move)->assertOk();
        $this->travel(1800)->milliseconds();$this->postJson(route('virtual-office.pilot'),array_replace($move,['seq'=>2]))->assertUnprocessable()->assertJsonPath('self.seq',1);
        $this->postJson(route('virtual-office.pilot'),array_replace($move,['seq'=>2,'y'=>3.3]))->assertUnprocessable();
    }

    public function test_repeated_real_double_jumps_reset_airtime_when_landing_occurs_between_snapshots(): void
    {
        $trace=json_decode(file_get_contents(base_path('tests/Fixtures/virtual-office-repeated-jumps.json')),true,512,JSON_THROW_ON_ERROR);$user=$this->person();$body=$this->packet();$this->actingAs($user)->postJson(route('virtual-office.pilot'),$body)->assertOk();
        Cache::put(VirtualOfficePilot::key($user->id),array_merge(VirtualOfficePilot::current($user->id),$trace['initial']),900);$start=now();
        foreach($trace['packets']as$i=>$packet){$this->travelTo($start->copy()->addMilliseconds($packet['ms']));unset($packet['ms']);$this->postJson(route('virtual-office.pilot'),array_replace($body,$packet,['mode'=>'move','seq'=>$i+1]))->assertOk()->assertJsonPath('self.seq',$i+1);}
        $this->assertSame(60,VirtualOfficePilot::current($user->id)['seq']);
    }
    public function test_skill_casts_use_saved_costume_are_idempotent_and_have_server_cooldown(): void
    {
        $user=$this->person();$this->actingAs($user);$avatar=\App\Services\VirtualOfficeAvatar::defaults();$avatar['costume']='naruto';$this->postJson(route('virtual-office.avatar'),['avatar'=>$avatar,'share_activity'=>true,'version'=>0])->assertOk();
        $body=$this->packet();$self=$this->postJson(route('virtual-office.pilot'),$body)->assertOk()->json('self');$cast=array_replace($body,$self,['mode'=>'move','seq'=>1,'skill'=>'rasengan','skill_id'=>(string)Str::uuid()]);
        $first=$this->postJson(route('virtual-office.pilot'),$cast)->assertOk()->assertJsonPath('self.skill','rasengan')->json('self');$this->assertArrayNotHasKey('skill_id',$first);
        $this->postJson(route('virtual-office.pilot'),array_replace($cast,['seq'=>2]))->assertOk()->assertJsonPath('self.skill_at',$first['skill_at']);
        $this->postJson(route('virtual-office.pilot'),array_replace($cast,['seq'=>3,'skill_id'=>(string)Str::uuid()]))->assertUnprocessable();
        $this->travel(7)->seconds();$this->postJson(route('virtual-office.pilot'),array_replace($cast,['seq'=>3,'skill'=>'kamehameha','skill_id'=>(string)Str::uuid()]))->assertUnprocessable();
        $this->postJson(route('virtual-office.pilot'),array_replace($cast,['seq'=>3,'skill'=>'clones','skill_id'=>(string)Str::uuid()]))->assertOk()->assertJsonPath('self.skill','clones');
        $this->assertDatabaseCount('virtual_office_orders',0);
    }
    public function test_transformation_lasts_sixty_seconds_and_authorized_flight_lands_after_expiry(): void
    {
        [$user,$body,$form]=$this->transformed();$started=now();$this->assertEquals(60000,$form['form_until']-$form['form_at']);$seq=1;$y=-.12;
        $this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>++$seq,'skill'=>'susanoo','skill_id'=>VirtualOfficePilot::current($user->id)['skill_id']]))->assertOk()->assertJsonPath('self.form_until',$form['form_until']);
        $this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>++$seq,'skill'=>'chidori','skill_id'=>(string)Str::uuid()]))->assertOk()->assertJsonPath('self.form','susanoo')->assertJsonPath('self.form_until',$form['form_until']);
        for($i=0;$i<8;$i++){$this->travel(150)->milliseconds();$y+=.6;$this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>++$seq,'y'=>$y,'action'=>'fly','flight'=>true]))->assertOk()->assertJsonPath('self.form','susanoo');}
        foreach([10,20,30,40,50,59]as$second){$this->travelTo($started->copy()->addSeconds($second));$this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>++$seq,'y'=>$y,'action'=>'fly','flight'=>true]))->assertOk()->assertJsonPath('self.form_until',$form['form_until']);}
        $this->travelTo($started->copy()->addMilliseconds(60200));$this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>++$seq,'y'=>$y,'action'=>'fly','flight'=>true]))->assertOk()->assertJsonPath('self.form',null)->assertJsonPath('self.flight',false);
        for($i=0;$i<9;$i++){$this->travel(150)->milliseconds();$y=max(-.12,$y-.6);$this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>++$seq,'y'=>$y,'action'=>'land','flight'=>false]))->assertOk();}
        $this->assertEquals(-.12,VirtualOfficePilot::current($user->id)['y']);$this->assertDatabaseCount('virtual_office_orders',0);
    }
    public function test_forms_require_saved_costume_and_non_flying_kurama_cannot_forge_flight(): void
    {
        [$user,$body,$form]=$this->transformed('naruto','kurama');$this->assertSame('kurama',$form['form']);$this->travel(200)->milliseconds();
        $this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>2,'flight'=>true,'action'=>'fly','y'=>.4]))->assertUnprocessable();
        $this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>2,'flight'=>false,'y'=>5]))->assertUnprocessable();
        $this->travel(7)->seconds();$this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>2,'skill'=>'susanoo','skill_id'=>(string)Str::uuid()]))->assertUnprocessable();
    }

    public function test_real_susanoo_flight_crosses_a_house_lands_on_its_roof_and_returns_to_ground(): void
    {
        [$user,$body]=$this->transformed();$trace=json_decode(file_get_contents(base_path('tests/Fixtures/virtual-office-flight-roof.json')),true,512,JSON_THROW_ON_ERROR);
        Cache::put(VirtualOfficePilot::key($user->id),array_merge(VirtualOfficePilot::current($user->id),$trace['initial']),900);$start=now();
        foreach($trace['packets']as$i=>$packet){$this->travelTo($start->copy()->addMilliseconds($packet['ms']));unset($packet['ms']);$this->postJson(route('virtual-office.pilot'),array_replace($body,$packet,['mode'=>'move','seq'=>$i+2]))->assertOk()->assertJsonPath('self.seq',$i+2);}
        $state=VirtualOfficePilot::current($user->id);$this->assertEquals(-.12,$state['y']);$this->assertFalse($state['air_access']);$this->assertFalse(\App\Services\VirtualOfficeHomes::inside(['x'=>-36.75,'y'=>8,'z'=>-28],\App\Services\VirtualOfficeHomes::own($user)));
    }
    public function test_cancel_reclaim_and_repeated_cancel_cannot_refresh_mode_or_landing_deadlines(): void
    {
        [$user,$body,$form]=$this->transformed();$seq=1;for($i=0;$i<10;$i++){$this->travel(150)->milliseconds();$this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>++$seq,'y'=>($i+1)*.4-.12,'flight'=>true,'action'=>'fly']))->assertOk();}
        $this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>++$seq,'y'=>3.88,'flight'=>false,'action'=>'land','end_form'=>true]))->assertOk()->assertJsonPath('self.form',null);$deadline=VirtualOfficePilot::current($user->id)['landing_until'];
        $this->travel(5)->seconds();$this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>++$seq,'y'=>3.88,'action'=>'land','end_form'=>true]))->assertOk();$this->assertEquals($deadline,VirtualOfficePilot::current($user->id)['landing_until']);
        $this->travel(2)->seconds();$this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>++$seq,'y'=>3.88,'action'=>'land','end_form'=>true]))->assertUnprocessable()->assertJsonPath('self.y',-.12);
        $this->postJson(route('virtual-office.pilot'),array_replace($body,['mode'=>'claim','seq'=>0]))->assertOk()->assertJsonPath('self.form_ready_at',$form['form_ready_at']);
        $this->postJson(route('virtual-office.pilot'),array_replace($body,['seq'=>1,'skill'=>'susanoo','skill_id'=>(string)Str::uuid()]))->assertUnprocessable();
    }
}
