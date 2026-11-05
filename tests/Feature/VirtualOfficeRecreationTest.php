<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\VirtualOfficeRecreation;
use Illuminate\Auth\Events\Login;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Tests\TestCase;

class VirtualOfficeRecreationTest extends TestCase
{
    use RefreshDatabase;
    use \Tests\Concerns\PlacesOfficeAvatar;

    private function person(array $attributes = []): User
    {
        $user = User::factory()->create($attributes + ['department' => 'umum', 'role' => 'user', 'is_active' => true]);
        Cache::put('presence:user:'.$user->id, ['id' => $user->id], 300);$this->placeAvatar($user); return $user;
    }
    private function order(array $data = []): array
    {
        return $data + ['request_id' => (string) Str::uuid(), 'item' => 'ayam-pop', 'quantity' => 2, 'destination' => 'beach'];
    }
    public function test_daily_login_grant_is_once_per_wib_date_even_with_repeated_logins_and_refreshes(): void
    {
        $this->travelTo(now()->setTimezone('Asia/Jakarta')->setTime(23, 59)); $user = $this->person();
        event(new Login('web', $user, false)); event(new Login('web', $user, true));
        $this->actingAs($user)->getJson(route('virtual-office.recreation'))->assertOk()->assertJsonPath('balance', 1000)->assertJsonCount(44, 'catalog');
        $this->getJson(route('virtual-office.recreation'))->assertJsonPath('balance', 1000);
        $this->assertDatabaseCount('virtual_office_ledger', 1);
        $this->travel(2)->minutes(); $this->getJson(route('virtual-office.recreation'))->assertJsonPath('balance', 2000);
        $this->assertDatabaseCount('virtual_office_ledger', 2);
    }
    public function test_prices_are_server_owned_orders_are_idempotent_and_overspending_rolls_back(): void
    {
        $user=$this->person(); $this->actingAs($user)->getJson(route('virtual-office.recreation'))->assertOk(); $data=$this->order();
        $this->postJson(route('virtual-office.order'),$data+['price'=>1])->assertUnprocessable();
        $this->postJson(route('virtual-office.order'),$data)->assertCreated()->assertJsonPath('balance',876);
        $this->postJson(route('virtual-office.order'),$data)->assertCreated()->assertJsonPath('balance',876);
        $this->postJson(route('virtual-office.order'),array_replace($data,['quantity'=>3]))->assertStatus(409);
        $this->postJson(route('virtual-office.order'),$this->order(['item'=>'boeuf','quantity'=>10]))->assertUnprocessable();
        $this->assertDatabaseCount('virtual_office_orders',1);$this->assertDatabaseCount('virtual_office_ledger',2);
        $this->assertDatabaseHas('virtual_office_wallets',['user_id'=>$user->id,'balance'=>876]);
    }
    public function test_orders_and_servings_are_owned_and_retried_servings_do_not_disappear_twice(): void
    {
        $a=$this->person();$b=$this->person();$this->actingAs($a)->getJson(route('virtual-office.recreation'));$data=$this->order();
        $this->postJson(route('virtual-office.order'),$data)->assertCreated();$serving=['id'=>$data['request_id'],'request_id'=>(string)Str::uuid(),'destination'=>'beach'];
        $this->actingAs($b)->postJson(route('virtual-office.consume'),$serving)->assertNotFound();
        $this->placeAvatar($a,'beach');
        $this->actingAs($a)->postJson(route('virtual-office.consume'),$serving)->assertOk()->assertJsonPath('orders.0.remaining',1);
        $this->postJson(route('virtual-office.consume'),$serving)->assertOk()->assertJsonPath('orders.0.remaining',1);
        $this->postJson(route('virtual-office.consume'),array_replace($serving,['request_id'=>(string)Str::uuid()]))->assertOk()->assertJsonCount(0,'orders');
        $this->postJson(route('virtual-office.consume'),$serving)->assertOk()->assertJsonCount(0,'orders');
        $this->assertDatabaseCount('virtual_office_servings',2);$this->assertDatabaseCount('virtual_office_ledger',2);
        $this->assertSame('beach',Cache::get('office:recreation:'.$a->id)['destination']);
    }
    public function test_viewers_inactive_accounts_unknown_departments_and_read_only_mode_cannot_spend(): void
    {
        foreach ([['role'=>'viewer'], ['is_active'=>false], ['department'=>'elsewhere']] as $attrs) {
            $user=$this->person($attrs); $status=isset($attrs['is_active']) ? 423 : 403;
            $this->actingAs($user)->getJson(route('virtual-office.recreation'))->assertStatus($status);
            $this->actingAs($user)->postJson(route('virtual-office.order'),$this->order())->assertStatus($status);
        }
        $user=$this->person();Cache::put('simonpr:read_only_mode',true,60);$this->actingAs($user)->postJson(route('virtual-office.order'),$this->order())->assertForbidden();
        $this->assertDatabaseCount('virtual_office_orders',0);
        $this->getJson(route('virtual-office.recreation'))->assertOk()->assertJsonPath('balance',0);
        $this->assertDatabaseCount('virtual_office_ledger',0);
    }
    public function test_native_messages_never_write_team_chat_and_only_participants_can_read(): void
    {
        $a=$this->person();$b=$this->person();$c=$this->person();$body=['target_id'=>$b->id,'request_id'=>(string)Str::uuid(),'message'=>'<img src=x onerror=alert(1)>'];
        $this->actingAs($a)->postJson(route('virtual-office.messages.send'),$body)->assertCreated();
        $this->postJson(route('virtual-office.messages.send'),$body)->assertCreated();
        $this->actingAs($b)->getJson(route('virtual-office.messages'))->assertOk()->assertJsonCount(1,'messages')->assertJsonPath('messages.0.message',$body['message']);
        $this->actingAs($c)->getJson(route('virtual-office.messages').'?target_id='.$a->id)->assertOk()->assertJsonCount(0,'messages');
        $this->assertDatabaseCount('chat_messages',0);$this->assertDatabaseCount('virtual_office_messages',1);
        Cache::forget('presence:user:'.$b->id);$this->actingAs($a)->postJson(route('virtual-office.messages.send'),array_replace($body,['request_id'=>(string)Str::uuid()]))->assertStatus(409);
    }
    public function test_private_messages_expire_and_hidden_owner_cannot_be_disclosed_or_impersonated(): void
    {
        $a=$this->person();$hidden=$this->person(['role'=>'superadmin','email'=>'superadmin@sucofindo.com','name'=>'Nazar']);
        $this->actingAs($a)->postJson(route('virtual-office.messages.send'),['target_id'=>$hidden->id,'request_id'=>(string)Str::uuid(),'message'=>'hello'])->assertNotFound();
        DB::table('virtual_office_messages')->insert(['user_id'=>$a->id,'target_id'=>$hidden->id,'request_id'=>(string)Str::uuid(),'message'=>'old','created_at'=>now()->subDays(8)]);
        $this->getJson(route('virtual-office.messages'))->assertJsonCount(0,'messages');$this->artisan('office:prune-messages')->assertSuccessful();$this->assertDatabaseCount('virtual_office_messages',0);
    }
    public function test_online_game_invitation_requires_recipient_consent_and_turn_revision_checks(): void
    {
        $a=$this->person();$b=$this->person();$c=$this->person();
        $this->placeAvatar($a,'badminton');$this->placeAvatar($b,'badminton');
        $game=$this->actingAs($a)->postJson(route('virtual-office.game.invite'),['target_id'=>$b->id,'kind'=>'badminton'])->assertCreated()->assertJsonPath('game.status','pending')->assertJsonPath('game.bot',false)->json('game');
        $this->postJson(route('virtual-office.game.respond'),['id'=>$game['id'],'action'=>'accept'])->assertForbidden();
        $this->actingAs($c)->postJson(route('virtual-office.game.respond'),['id'=>$game['id'],'action'=>'accept'])->assertNotFound();
        $this->actingAs($b)->postJson(route('virtual-office.game.respond'),['id'=>$game['id'],'action'=>'accept'])->assertOk()->assertJsonPath('game.status','playing');
        $body=['id'=>$game['id'],'request_id'=>(string)Str::uuid(),'revision'=>1,'racket'=>.5,'aim'=>.2,'power'=>.6];
        $this->postJson(route('virtual-office.game.hit'),$body)->assertStatus(409);
        $this->actingAs($a)->postJson(route('virtual-office.game.hit'),$body)->assertOk()->assertJsonPath('game.turn',$b->id)->assertJsonPath('game.revision',2);
        $this->postJson(route('virtual-office.game.hit'),$body)->assertOk()->assertJsonPath('game.revision',2);
        $this->postJson(route('virtual-office.game.hit'),array_replace($body,['request_id'=>(string)Str::uuid()]))->assertStatus(409);
        $this->actingAs($b)->postJson(route('virtual-office.game.respond'),['id'=>$game['id'],'action'=>'end'])->assertOk()->assertJsonPath('game',null);
        $this->assertNull(Cache::get('office:recreation:'.$a->id));
    }
    public function test_offline_avatar_accepts_only_as_computer_without_changing_the_humans_presence_or_invites(): void
    {
        $a=$this->person();$b=$this->person();Cache::forget('presence:user:'.$b->id);
        $this->placeAvatar($a,'badminton');
        $game=$this->actingAs($a)->postJson(route('virtual-office.game.invite'),['target_id'=>$b->id,'kind'=>'badminton'])->assertCreated()->assertJsonPath('game.bot',true)->assertJsonPath('game.status','playing')->json('game');
        $this->assertNull(Cache::get('presence:user:'.$b->id));$this->assertNull(Cache::get('office:game:user:'.$b->id));
        $this->postJson(route('virtual-office.game.hit'),['id'=>$game['id'],'revision'=>0,'request_id'=>(string)Str::uuid(),'racket'=>0,'aim'=>.5,'power'=>.6])->assertOk()->assertJsonPath('game.score.1',1)->assertJsonPath('game.turn',$a->id);
        $this->assertDatabaseCount('virtual_office_ledger',0);
    }
}
