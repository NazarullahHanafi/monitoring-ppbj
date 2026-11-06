<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VirtualOfficeCombat
{
    public static function catalog(): array
    {
        static $catalog;
        return $catalog ??= json_decode(file_get_contents(resource_path('data/virtual-office-combat.json')), true, 512, JSON_THROW_ON_ERROR);
    }
    public function account(User $user): array
    {
        return self::catalog() + ['owned'=>DB::table('virtual_office_weapons')->where('user_id',$user->id)->pluck('weapon')->all(),
            'balance'=>(int)(DB::table('virtual_office_wallets')->where('user_id',$user->id)->value('balance')??0)];
    }
    public function buy(User $user,string $weapon,string $requestId): array
    {
        $shop=self::catalog()['shop'];$state=VirtualOfficePilot::current($user->id);
        abort_unless($state&&hypot($state['x']-$shop['x'],$state['z']-$shop['z'])<=$shop['radius']&&$state['y']<1.5,409,'Berjalan ke bot KAIA di ATLAS Armory dahulu.');
        DB::transaction(function()use($user,$weapon,$requestId){
            $wallet=DB::table('virtual_office_wallets')->where('user_id',$user->id)->lockForUpdate()->first();
            abort_unless($wallet,409,'Buka toko untuk memuat dompet dahulu.');
            $reference='armory:'.$requestId;$previous=DB::table('virtual_office_ledger')->where('user_id',$user->id)->where('reference',$reference)->first();
            if($previous){abort_unless((int)$previous->amount===-self::catalog()['weapons'][$weapon]['price']&&DB::table('virtual_office_weapons')->where('user_id',$user->id)->where('weapon',$weapon)->exists(),409,'Nomor pembelian sudah digunakan.');return;}
            abort_if(DB::table('virtual_office_weapons')->where('user_id',$user->id)->where('weapon',$weapon)->exists(),409,'Senjata ini sudah dimiliki.');
            $price=self::catalog()['weapons'][$weapon]['price'];abort_unless($wallet->balance>=$price,422,'Saldo virtual tidak cukup.');$balance=(int)$wallet->balance-$price;
            DB::table('virtual_office_weapons')->insert(['user_id'=>$user->id,'weapon'=>$weapon,'created_at'=>now()]);
            DB::table('virtual_office_wallets')->where('user_id',$user->id)->update(['balance'=>$balance,'updated_at'=>now()]);
            DB::table('virtual_office_ledger')->insert(['user_id'=>$user->id,'reference'=>$reference,'amount'=>-$price,'balance'=>$balance,'created_at'=>now()]);
        },3);
        return $this->account($user);
    }
    public function equip(User $user,?string $weapon): array
    {
        abort_if($weapon&&!DB::table('virtual_office_weapons')->where('user_id',$user->id)->where('weapon',$weapon)->exists(),403,'Senjata belum dimiliki.');
        return Cache::lock('office:pilot:mutex:'.$user->id,3)->block(1,function()use($user,$weapon){
            $state=VirtualOfficePilot::current($user->id);abort_unless($state,409,'Aktifkan kendali avatar dahulu.');
            $state['weapon']=$weapon;Cache::put(VirtualOfficePilot::key($user->id),$state,900);return ['self'=>VirtualOfficePilot::publicState($state)];
        });
    }
    public function attack(User $user,User $target,string $kind,string $requestId): array
    {
        abort_unless($target->id!==$user->id&&VirtualOfficeRecreation::allowed($target)&&$target->shouldDisplayInPresence(),404);
        // The same ordering is used for opposing simultaneous shots. These are
        // the pilot locks, so neither movement nor respawn can overwrite a hit.
        $ids=[$user->id,$target->id];sort($ids);
        return Cache::lock('office:pilot:mutex:'.$ids[0],3)->block(1,fn()=>Cache::lock('office:pilot:mutex:'.$ids[1],3)->block(1,function()use($user,$target,$kind,$requestId){
            $a=VirtualOfficePilot::current($user->id);$b=VirtualOfficePilot::current($target->id);$now=now()->getTimestampMs();
            abort_unless($a&&$b&&$now-$a['updated_ms']<5000&&$now-$b['updated_ms']<5000,409,'Kedua avatar harus aktif di ruang virtual.');
            abort_unless(($a['combat_version']??0)===1&&($b['combat_version']??0)===1,409,'Muat ulang ruang virtual pada kedua pemain untuk mengaktifkan pertarungan.');
            $receipt='office:combat:receipt:'.$user->id.':'.$requestId;
            if($previous=Cache::get($receipt)){abort_unless($previous['target']===$target->id&&$previous['kind']===$kind,409);return $previous['result'];}
            $catalog=self::catalog();$spec=$catalog['weapons'][$kind]??$catalog['specials'][$kind]??null;abort_unless($spec,422);
            if(isset($spec['form']))abort_unless(($a['form']??null)===$spec['form']&&($a['form_until']??0)>$now,422,'Aktifkan mode yang sesuai untuk jurus ini.');
            else abort_unless(($a['weapon']??null)===$kind&&DB::table('virtual_office_weapons')->where('user_id',$user->id)->where('weapon',$kind)->exists(),403,'Pasang senjata yang dimiliki dahulu.');
            abort_if(($a['attack_ready_at']??0)>$now,422,'Tunggu jeda serangan.');
            abort_if(($a['shield_until']??0)>$now||($b['shield_until']??0)>$now,409,'Perisai respawn masih aktif.');
            // Homes and the document workspace remain a place to respawn/work.
            foreach([$a,$b]as$p)abort_if(!empty($p['workspace'])||($p['y']<3.5&&$p['z']<-20),409,'Serangan tersedia di luar kawasan rumah dan dokumen.');
            $height=isset($spec['form'])?(VirtualOfficePilot::abilities()['skills'][$spec['form']]['height']??2.2)*.55:1.2;
            $origin=['x'=>$a['x'],'y'=>$a['y']+$height,'z'=>$a['z']];$end=['x'=>$b['x'],'y'=>$b['y']+1.2,'z'=>$b['z']];
            $distance=sqrt(($origin['x']-$end['x'])**2+($origin['y']-$end['y'])**2+($origin['z']-$end['z'])**2);
            abort_if($distance>$spec['range'],422,'Target terlalu jauh.');
            abort_unless(app(VirtualOfficePilot::class)->segment($origin,$end,null,.02,true),422,'Target terhalang tembok, net, atau perabot.');
            $hp=max(0,($b['hp']??100)-$spec['damage']);$knockout=$hp===0;
            $a['attack_ready_at']=$now+$spec['cooldown'];$a['shot_at']=$now;$a['shot_kind']=$kind;$a['shot_end']=$end;$b['hp']=$hp;
            if($knockout){$home=VirtualOfficeHomes::own($target);abort_unless($home,409,'Rumah target belum tersedia.');
                $b=array_merge($b,['x'=>$home['x']-1,'y'=>.22,'z'=>$home['z']+2.5,'yaw'=>0,'hp'=>100,'respawn_id'=>(string)Str::uuid(),'shield_until'=>$now+8000,'form'=>null,'flight'=>false,'air_access'=>false,'landing_until'=>null,'air_started_ms'=>null,'air_floor'=>.22,'door_open'=>false,'action'=>'idle','venue'=>null,'pose'=>null,'skill'=>null,'weapon'=>null,'credit'=>.7,'updated_ms'=>$now]);
            }
            Cache::put(VirtualOfficePilot::key($user->id),$a,900);Cache::put(VirtualOfficePilot::key($target->id),$b,900);
            $result=['self'=>VirtualOfficePilot::publicState($a),'target_id'=>$target->id,'hp'=>$b['hp'],'knockout'=>$knockout,'damage'=>$spec['damage']];
            Cache::put($receipt,['target'=>$target->id,'kind'=>$kind,'result'=>$result],120);return $result;
        }));
    }
}
