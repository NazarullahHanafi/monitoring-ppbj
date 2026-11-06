<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VirtualOfficeShooting
{
    private function ray(array $state,array $aim,array $spec): array
    {
        $form=($state['form_until']??0)>now()->getTimestampMs()?(VirtualOfficePilot::abilities()['skills'][$state['form']??'']??null):null;
        $height=$form?($form['height']??2.2)*.55:(isset($spec['form'])?(VirtualOfficePilot::abilities()['skills'][$spec['form']]['height']??2.2)*.55:1.2);
        $origin=['x'=>$state['x'],'y'=>$state['y']+$height,'z'=>$state['z']];$length=0;
        foreach(['x','y','z']as$axis)$length+=($aim[$axis]-$origin[$axis])**2;$length=sqrt($length);
        abort_if($length<.1,422,'Arahkan bidikan sedikit lebih jauh dari avatar.');$end=[];
        foreach(['x','y','z']as$axis)$end[$axis]=$origin[$axis]+($aim[$axis]-$origin[$axis])/max(1,$length/$spec['range']);
        $fraction=app(VirtualOfficePilot::class)->rayLimit($origin,$end);
        foreach(['x','y','z']as$axis)$end[$axis]=$origin[$axis]+($end[$axis]-$origin[$axis])*$fraction;
        return [$origin,$end];
    }
    private function intersection(array $origin,array $end,array $target): ?float
    {
        $form=($target['form_until']??0)>now()->getTimestampMs()?(VirtualOfficePilot::abilities()['skills'][$target['form']??'']??null):null;
        $radius=$form['radius']??.4;$height=$form['height']??1.8;$low=0;$high=1;
        foreach([['x',$target['x']-$radius,$target['x']+$radius],['z',$target['z']-$radius,$target['z']+$radius],['y',$target['y']+.1,$target['y']+$height]]as[$axis,$start,$stop]){
            $delta=$end[$axis]-$origin[$axis];if(abs($delta)<1e-8){if($origin[$axis]<$start||$origin[$axis]>$stop)return null;}
            else{$a=($start-$origin[$axis])/$delta;$b=($stop-$origin[$axis])/$delta;$low=max($low,min($a,$b));$high=min($high,max($a,$b));}
        }
        return $low<=$high&&$low>=0&&$low<=1?(float)$low:null;
    }
    private function protected(array $state,int $now): bool {return !empty($state['workspace'])||($state['shield_until']??0)>$now||($state['y']<3.5&&$state['z']<-20);}
    private function locked(array $ids,callable $work): array
    {
        if(!$ids)return $work();$id=array_shift($ids);
        return Cache::lock('office:pilot:mutex:'.$id,3)->block(1,fn()=>$this->locked($ids,$work));
    }
    public function fire(User $user,string $kind,string $requestId,array $aim): array
    {
        $catalog=VirtualOfficeCombat::catalog();$spec=$catalog['weapons'][$kind]??$catalog['specials'][$kind];
        $state=VirtualOfficePilot::current($user->id);abort_unless($state,409,'Aktifkan kendali avatar dahulu.');
        [$origin,$end]=$this->ray($state,$aim,$spec);$candidate=null;$nearest=2;
        foreach(app(VirtualOfficePresence::class)->snapshot($user)['people']as$person){
            if($person['id']===$user->id||empty($person['pilot']))continue;$t=$this->intersection($origin,$end,$person['pilot']);
            if($t!==null&&$t<$nearest){$candidate=$person['id'];$nearest=$t;}
        }
        $ids=array_values(array_unique(array_filter([$user->id,$candidate])));sort($ids);
        return $this->locked($ids,function()use($user,$candidate,$aim,$spec,$kind,$requestId){
            $a=VirtualOfficePilot::current($user->id);$now=now()->getTimestampMs();abort_unless($a&&$now-$a['updated_ms']<5000,409,'Aktifkan kendali avatar di ruang virtual.');
            $key='office:combat:ray:'.$user->id.':'.$requestId;$fingerprint=hash('sha256',json_encode([$kind,$aim]));
            if($receipt=Cache::get($key)){abort_unless(hash_equals($receipt['fingerprint'],$fingerprint),409,'Nomor tembakan sudah digunakan.');return $receipt['result'];}
            if(isset($spec['form']))abort_unless(($a['form']??null)===$spec['form']&&($a['form_until']??0)>$now,422,'Aktifkan mode yang sesuai untuk jurus ini.');
            else abort_unless(($a['weapon']??null)===$kind&&DB::table('virtual_office_weapons')->where('user_id',$user->id)->where('weapon',$kind)->exists(),403,'Pegang senjata yang dimiliki dahulu.');
            abort_if($this->protected($a,$now),409,'Keluar dari kawasan rumah/dokumen atau tunggu perisai respawn selesai.');
            abort_if(($a['attack_ready_at']??0)>$now,422,'Tunggu jeda serangan.');
            [$origin,$end]=$this->ray($a,$aim,$spec);$hit=false;$knockout=false;$hp=null;$reason=null;$targetId=null;
            $target=$candidate?User::find($candidate):null;$b=$target?VirtualOfficePilot::current($target->id):null;
            if($target&&$b&&VirtualOfficeRecreation::allowed($target)&&$target->shouldDisplayInPresence()&&$now-$b['updated_ms']<5000&&$this->intersection($origin,$end,$b)!==null){
                $fraction=$this->intersection($origin,$end,$b);foreach(['x','y','z']as$axis)$end[$axis]=$origin[$axis]+($end[$axis]-$origin[$axis])*$fraction;
                if(($b['combat_version']??0)!==1)$reason='Target perlu memuat ulang kantor virtual.';
                elseif($this->protected($b,$now))$reason='Target berada dalam perlindungan.';
                else{$hit=true;$targetId=$target->id;$hp=max(0,($b['hp']??100)-$spec['damage']);$b['hp']=$hp;$knockout=$hp===0;
                    if($knockout){$home=VirtualOfficeHomes::own($target);abort_unless($home,409,'Rumah target belum tersedia.');
                        $b=array_merge($b,['x'=>$home['x']-1,'y'=>.22,'z'=>$home['z']+2.5,'yaw'=>0,'hp'=>100,'respawn_id'=>(string)Str::uuid(),'shield_until'=>$now+8000,'form'=>null,'flight'=>false,'air_access'=>false,'landing_until'=>null,'air_started_ms'=>null,'air_floor'=>.22,'door_open'=>false,'action'=>'idle','venue'=>null,'pose'=>null,'skill'=>null,'weapon'=>null,'credit'=>.7,'updated_ms'=>$now]);}
                    $b['combat_revision']=($b['combat_revision']??0)+1;Cache::put(VirtualOfficePilot::key($target->id),$b,900);
                }
            }
            $a['attack_ready_at']=$now+$spec['cooldown'];$a['shot_at']=$now;$a['shot_kind']=$kind;$a['shot_origin']=$origin;$a['shot_end']=$end;$a['combat_revision']=($a['combat_revision']??0)+1;
            Cache::put(VirtualOfficePilot::key($user->id),$a,900);
            $result=['self'=>VirtualOfficePilot::publicState($a),'hit'=>$hit,'target_id'=>$targetId,'hp'=>$hp,'knockout'=>$knockout,'damage'=>$hit?$spec['damage']:0,'note'=>$reason];
            Cache::put($key,['fingerprint'=>$fingerprint,'result'=>$result],120);return $result;
        });
    }
}
