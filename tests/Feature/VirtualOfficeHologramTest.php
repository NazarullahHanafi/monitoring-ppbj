<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class VirtualOfficeHologramTest extends TestCase
{
    use RefreshDatabase;

    private function config(User $user): array
    {
        $html=$this->actingAs($user)->get(route('virtual-office.index'))->assertOk()->getContent();
        preg_match('/<script type="application\/json" id="voConfig">(.*?)<\/script>/s', $html, $match);
        return json_decode($match[1], true, 512, JSON_THROW_ON_ERROR);
    }

    public function test_tools_follow_department_viewer_and_global_read_only_permissions(): void
    {
        $ops=User::factory()->create(['department'=>'operasional','role'=>'user']);
        $this->assertSame(['create','torpr','tracking'], array_column($this->config($ops)['hologramTools'], 'id'));
        $umum=User::factory()->create(['department'=>'umum','role'=>'superadmin']);
        $this->assertSame(['ppbj-create','ppbj','approval','spph','sp','tracking'], array_column($this->config($umum)['hologramTools'], 'id'));
        $viewer=User::factory()->create(['department'=>'operasional','role'=>'viewer']);
        $this->assertSame(['torpr','tracking'], array_column($this->config($viewer)['hologramTools'], 'id'));
        Cache::put('simonpr:read_only_mode', true, 60);
        $this->assertSame(['torpr','tracking'], array_column($this->config($ops)['hologramTools'], 'id'));
        $this->get(route('virtual-office.hologram', 'create'))->assertForbidden();
    }

    public function test_hologram_reuses_real_tor_form_without_loading_another_app_shell(): void
    {
        $user=User::factory()->create(['department'=>'operasional','role'=>'user']);
        $this->actingAs($user)->get(route('virtual-office.hologram', 'create'))->assertOk()
            ->assertSee('id="torprForm"', false)->assertSee('data-create="1"', false)
            ->assertSee('assets/torpr/torpr.js', false)->assertDontSee('id="sidebarDesktop"', false)
            ->assertDontSee('assets/app/app-shell.js', false)->assertHeader('Cache-Control', 'no-store, private');
        $this->get(route('torpr.index'))->assertOk()->assertSee('id="sidebarDesktop"', false);
        $this->postJson(route('torpr.store'), [])->assertUnprocessable();
        $this->assertDatabaseCount('torprs', 0);
    }

    public function test_guest_other_departments_and_read_only_writes_cannot_bypass_existing_guards(): void
    {
        $this->get(route('virtual-office.hologram', 'create'))->assertRedirect(route('login'));
        $umum=User::factory()->create(['department'=>'umum','role'=>'superadmin']);
        $this->actingAs($umum)->get(route('virtual-office.hologram', ['tool'=>'create','user_id'=>999]))->assertForbidden();
        $this->get(route('virtual-office.hologram', 'torpr'))->assertForbidden();
        $other=User::factory()->create(['department'=>'other']);
        $this->actingAs($other)->get(route('virtual-office.hologram', 'tracking'))->assertForbidden();
        $viewer=User::factory()->create(['department'=>'operasional','role'=>'viewer']);
        $this->actingAs($viewer)->get(route('virtual-office.hologram', 'create'))->assertForbidden();
        $this->get(route('virtual-office.hologram', 'torpr'))->assertOk()->assertSee('data-readonly="1"', false);
        $this->postJson(route('torpr.store'), ['tujuan_pengadaan'=>'Forbidden draft'])->assertForbidden();
        $this->assertDatabaseCount('torprs', 0);
        $this->get('/virtual-office/hologram/profile')->assertNotFound();
    }

    public function test_tracking_scope_matches_each_departments_existing_access_and_validates_queries(): void
    {
        $ops=User::factory()->create(['department'=>'operasional','role'=>'user']);
        $this->actingAs($ops)->get(route('virtual-office.hologram', 'tracking'))->assertOk()->assertSee('Experience V3');
        $umum=User::factory()->create(['department'=>'umum','role'=>'user']);
        $this->actingAs($umum)->get(route('virtual-office.hologram', 'tracking'))->assertOk()
            ->assertSee('office-hologram-frame', false)->assertDontSee('Experience V3')->assertDontSee('name="_token"', false);
        $this->getJson(route('virtual-office.hologram', ['tool'=>'tracking','q'=>str_repeat('x',181)]))->assertUnprocessable();
        $this->getJson(route('virtual-office.hologram', ['tool'=>'tracking','tracking_token'=>'invalid']))->assertUnprocessable();
    }

    public function test_opening_a_hologram_does_not_release_manual_control_or_create_a_document(): void
    {
        $user=User::factory()->create(['department'=>'operasional','role'=>'user','is_active'=>true]);
        Cache::put('presence:user:'.$user->id, ['id'=>$user->id], 300);
        $body=['session_id'=>(string)\Illuminate\Support\Str::uuid(),'mode'=>'claim','seq'=>0,'x'=>0,'y'=>-.12,'z'=>20,'yaw'=>0,'action'=>'idle'];
        $this->actingAs($user)->postJson(route('virtual-office.pilot'), $body)->assertOk();
        $response=$this->get(route('virtual-office.hologram', 'create'))->assertOk();
        app(\App\Http\Middleware\RecordVirtualOfficeVisit::class)->terminate($this->app['request'], $response->baseResponse);
        $state=\App\Services\VirtualOfficePilot::current($user->id);
        $this->assertNotNull($state);
        $this->assertSame($body['session_id'], $state['session_id']);
        $this->assertDatabaseCount('torprs', 0);
        $this->assertSame('virtual-office', Cache::get('office:menu:'.$user->id));
    }
    public function test_umum_tools_render_real_documents_without_a_second_application_shell(): void
    {
        $user=User::factory()->create(['department'=>'umum','role'=>'user','is_active'=>true]);
        foreach(['ppbj-create'=>'ppbjForm','ppbj'=>'ppbjForm','approval'=>'Approval PR','sp'=>'addFormSp','spph'=>'addForm']as$tool=>$marker){
            $this->actingAs($user)->get(route('virtual-office.hologram',['tool'=>$tool,'office_frame'=>'17']))->assertOk()->assertSee($marker,false)->assertSee('data-tool="'.$tool.'"',false)->assertDontSee('id="sidebarDesktop"',false)->assertDontSee('assets/app/app-shell.js',false)->assertHeader('Cache-Control','no-store, private');
        }
        $this->get(route('virtual-office.hologram','ppbj-create'))->assertSee('data-create="1"',false)->assertSee('assets/ppbj/ppbj.js',false);
        $this->postJson(route('ppbj.store'),[])->assertUnprocessable();$this->assertDatabaseCount('ppbj',0);
        $this->get(route('ppbj.index'))->assertOk()->assertSee('id="sidebarDesktop"',false);
    }
    public function test_umum_viewers_can_read_but_cannot_create_and_operasional_cannot_load_umum_tools(): void
    {
        $viewer=User::factory()->create(['department'=>'umum','role'=>'viewer','is_active'=>true]);
        $this->assertSame(['ppbj','approval','spph','sp','tracking'],array_column($this->config($viewer)['hologramTools'],'id'));
        $this->get(route('virtual-office.hologram','ppbj-create'))->assertForbidden();$this->get(route('virtual-office.hologram','ppbj'))->assertOk()->assertSee('data-readonly="1"',false);
        foreach(['ppbj.store','sp.store','spph.store']as$route)$this->postJson(route($route),[])->assertForbidden();
        $ops=User::factory()->create(['department'=>'operasional','role'=>'user','is_active'=>true]);
        foreach(['ppbj-create','ppbj','approval','sp','spph']as$tool)$this->actingAs($ops)->get(route('virtual-office.hologram',$tool))->assertForbidden();
        $umum=User::factory()->create(['department'=>'umum','role'=>'user','is_active'=>true]);Cache::put('simonpr:read_only_mode',true);
        $this->assertSame(['ppbj','approval','spph','sp','tracking'],array_column($this->config($umum)['hologramTools'],'id'));$this->get(route('virtual-office.hologram','ppbj-create'))->assertForbidden();$this->postJson(route('ppbj.store'),[])->assertForbidden();
    }
    public function test_hologram_tracking_removes_public_marketing_hero_and_keeps_search_and_results(): void
    {
        $u=User::factory()->create(['department'=>'umum','role'=>'user','is_active'=>true]);
        $this->actingAs($u)->get(route('virtual-office.hologram','tracking'))->assertOk()->assertSee('Lacak perjalanan pengadaan.')->assertSee('id="qInput"',false)->assertDontSee('class="page-hero"',false)->assertDontSee('Cara Tracking PR')->assertDontSee('Semua proses, dalam jangkauan.')->assertDontSee('name="_token"',false);
        $this->get(route('virtual-office.hologram',['tool'=>'tracking','q'=>'DOES-NOT-EXIST']))->assertOk()->assertSee('DOES-NOT-EXIST')->assertDontSee('Cara Tracking PR');
        $this->get(route('landing.track'))->assertOk()->assertSee('class="page-hero"',false)->assertSee('Cara Tracking PR');
    }
    public function test_document_save_returns_to_its_hologram_in_native_and_json_responses(): void
    {
        $middleware=new \App\Http\Middleware\PreserveOfficeHologramContext();
        $request=\Illuminate\Http\Request::create('https://office.test/sp','POST',['office_frame'=>'17']);
        foreach(['sp','spph']as$tool){
            $response=$middleware->handle($request,fn()=>redirect('https://office.test/'.$tool.'?mode=oracle'));
            $this->assertSame(route('virtual-office.hologram',['tool'=>$tool,'mode'=>'oracle','office_frame'=>'17']),$response->getTargetUrl());
            $response=$middleware->handle($request,fn()=>response()->json(['message'=>'Tersimpan','redirect'=>'https://office.test/'.$tool]));
            $this->assertSame(route('virtual-office.hologram',['tool'=>$tool,'office_frame'=>'17']),$response->getData(true)['redirect']);
        }
        foreach([null,'bad',str_repeat('1',11)]as$value){$request=\Illuminate\Http\Request::create('https://office.test/sp','POST',['office_frame'=>$value]);$response=$middleware->handle($request,fn()=>redirect('https://office.test/sp'));$this->assertSame('https://office.test/sp',$response->getTargetUrl());}
        $request=\Illuminate\Http\Request::create('https://office.test/sp','POST',['office_frame'=>'17']);$response=$middleware->handle($request,fn()=>redirect('https://other.test/sp'));$this->assertSame('https://other.test/sp',$response->getTargetUrl());
    }
    public function test_umum_saves_ppbj_from_hologram_through_original_validated_route(): void
    {
        $u=User::factory()->create(['department'=>'umum','role'=>'user','is_active'=>true]);
        $this->actingAs($u)->withHeader('Referer',route('virtual-office.hologram','ppbj-create'))->postJson(route('ppbj.store'),['ppbj_no'=>'HOLOGRAM-PPBJ-TEST','uraian'=>'Pengadaan uji hologram','office_frame'=>'17'])->assertOk();
        $this->assertDatabaseHas('ppbj',['ppbj_no'=>'HOLOGRAM-PPBJ-TEST','created_by_user_id'=>$u->id]);
        $this->postJson(route('ppbj.store'),['ppbj_no'=>'HOLOGRAM-PPBJ-TEST','office_frame'=>'17'])->assertUnprocessable();$this->assertDatabaseCount('ppbj',1);
    }
}
