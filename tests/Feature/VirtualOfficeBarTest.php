<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Tests\TestCase;

class VirtualOfficeBarTest extends TestCase
{
    use RefreshDatabase;

    private function person(array $data = []): User
    {
        $user=User::factory()->create($data+['department'=>'umum','role'=>'user','is_active'=>true]);
        Cache::put('presence:user:'.$user->id,['id'=>$user->id],300);return $user;
    }
    private function checkout(array $data = []): array
    {
        return $data+['request_id'=>(string)Str::uuid(),'destination'=>'bar','items'=>[['item'=>'ayam-pop','quantity'=>2],['item'=>'espresso','quantity'=>1]]];
    }
    public function test_office_polling_and_game_hits_do_not_consume_restaurant_or_legacy_route_limits(): void
    {
        $user=$this->person();$npc=$this->person();Cache::forget('presence:user:'.$npc->id);
        // Reproduce an already exhausted numeric throttle from another app page.
        for($i=0;$i<80;$i++)RateLimiter::hit(sha1((string)$user->id),60);
        $this->actingAs($user)->getJson(route('virtual-office.recreation'))->assertOk();
        $game=$this->postJson(route('virtual-office.game.invite'),['target_id'=>$npc->id,'kind'=>'badminton'])->assertCreated()->json('game');
        for($i=0;$i<60;$i++){
            $this->getJson(route('virtual-office.game'))->assertOk();
            $this->getJson(route('virtual-office.messages'))->assertOk();
            $game=$this->postJson(route('virtual-office.game.hit'),['id'=>$game['id'],'request_id'=>(string)Str::uuid(),'revision'=>$game['revision'],'racket'=>$game['target'],'aim'=>.5,'power'=>.6])->assertOk()->json('game');
        }
        for($i=0;$i<25;$i++)$this->postJson(route('virtual-office.order'),['request_id'=>(string)Str::uuid(),'item'=>'mineral','quantity'=>1,'destination'=>'bar'])->assertCreated();
        $this->getJson(route('virtual-office.recreation'))->assertOk()->assertJsonPath('balance',750)->assertHeader('X-RateLimit-Remaining','598');
        $this->postJson(route('virtual-office.checkout'),$this->checkout())->assertCreated()->assertJsonPath('balance',608);
    }
    public function test_named_route_limits_are_independent_and_excess_gets_a_localized_retry_response(): void
    {
        $a=$this->person();$b=$this->person();$this->actingAs($a);
        for($i=0;$i<180;$i++)$this->postJson(route('virtual-office.move'),['destination'=>'bar'])->assertOk();
        $response=$this->postJson(route('virtual-office.move'),['destination'=>'bar'])->assertStatus(429)->assertHeader('Retry-After');
        $this->assertStringNotContainsString('Too Many Attempts',$response->getContent());
        $this->getJson(route('virtual-office.game'))->assertOk();$this->actingAs($b)->postJson(route('virtual-office.move'),['destination'=>'disco'])->assertOk();
        $this->assertSame('dance',Cache::get('office:recreation:'.$b->id)['kind']);
    }
    public function test_cart_checkout_is_atomic_server_priced_idempotent_and_has_a_private_receipt(): void
    {
        $a=$this->person();$b=$this->person();$this->actingAs($a)->getJson(route('virtual-office.recreation'))->assertOk();$body=$this->checkout();
        $this->postJson(route('virtual-office.checkout'),$body)->assertCreated()->assertJsonPath('balance',858)->assertJsonCount(2,'orders')->assertJsonCount(1,'receipts');
        $body['items']=array_reverse($body['items']);$this->postJson(route('virtual-office.checkout'),$body)->assertCreated()->assertJsonPath('balance',858);
        $this->assertDatabaseCount('virtual_office_tabs',1);$this->assertDatabaseCount('virtual_office_ledger',2);
        $this->postJson(route('virtual-office.checkout'),array_replace($body,['destination'=>'disco']))->assertStatus(409);
        $this->actingAs($b)->getJson(route('virtual-office.recreation'))->assertOk()->assertJsonCount(0,'receipts');
        $this->postJson(route('virtual-office.checkout'),$body)->assertNotFound();
        $this->assertDatabaseHas('virtual_office_wallets',['user_id'=>$b->id,'balance'=>1000]);
    }
    public function test_invalid_cart_forged_prices_duplicate_lines_or_insufficient_balance_leave_no_partial_purchase(): void
    {
        $user=$this->person();$this->actingAs($user)->getJson(route('virtual-office.recreation'));
        foreach([
            $this->checkout(['items'=>[['item'=>'mineral','quantity'=>1,'price'=>1]]]),
            $this->checkout(['items'=>[['item'=>'mineral','quantity'=>1],['item'=>'mineral','quantity'=>2]]]),
            $this->checkout(['items'=>[['item'=>'boeuf','quantity'=>10],['item'=>'mineral','quantity'=>1]]]),
            $this->checkout(['items'=>[['item'=>'unknown','quantity'=>1]]]),
        ]as$body)$this->postJson(route('virtual-office.checkout'),$body)->assertUnprocessable();
        $this->assertDatabaseCount('virtual_office_tabs',0);$this->assertDatabaseCount('virtual_office_orders',0);$this->assertDatabaseCount('virtual_office_ledger',1);
        $this->assertDatabaseHas('virtual_office_wallets',['user_id'=>$user->id,'balance'=>1000]);
        $this->actingAs($this->person(['role'=>'viewer']))->postJson(route('virtual-office.checkout'),$this->checkout())->assertForbidden();
    }
}
