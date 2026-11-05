<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;

class VirtualOfficePilot
{
    public static function key(int $id): string { return 'office:pilot:v1:'.$id; }
    public static function lease(int $id): string { return 'office:pilot:lease:'.$id; }
    public static function layout(): array { static $data; return $data ??= json_decode(file_get_contents(resource_path('data/virtual-office-layout.json')), true, 512, JSON_THROW_ON_ERROR); }
    public static function allowed(User $user): bool { return $user->is_active && in_array($user->department, ['umum','operasional'], true); }
    public static function current(int $id): ?array
    {
        $state=Cache::get(self::key($id));return is_array($state)&&Cache::get(self::lease($id))===($state['session_id']??null)?$state:null;
    }
    public static function publicState(?array $state): ?array { return $state ? array_intersect_key($state,array_flip(['x','y','z','yaw','action','venue','seq','updated_ms'])) : null; }
    public function free(float $x,float $z): bool
    {
        $bounds=self::layout()['bounds'];$r=.3;
        if($x<$bounds['minX']+$r||$x>$bounds['maxX']-$r||$z<$bounds['minZ']+$r||$z>$bounds['maxZ']-$r)return false;
        foreach($this->obstacles()as$b)if($x>$b['left']-$r&&$x<$b['right']+$r&&$z>$b['back']-$r&&$z<$b['front']+$r)return false;
        return true;
    }
    public function obstacles(): array
    {
        static $data;return $data ??= json_decode(file_get_contents(resource_path('data/virtual-office-collisions.json')),true,512,JSON_THROW_ON_ERROR);
    }
    public function segment(array $a,array $b): bool
    {
        if(!$this->free($b['x'],$b['z']))return false;
        foreach($this->obstacles()as$box){$low=0;$high=1;
            foreach([['x',$box['left']-.3,$box['right']+.3],['z',$box['back']-.3,$box['front']+.3]]as[$axis,$start,$end]){
                $delta=$b[$axis]-$a[$axis];
                if(abs($delta)<1e-8){if($a[$axis]<=$start||$a[$axis]>=$end){$low=2;break;}}
                else{$t1=($start-$a[$axis])/$delta;$t2=($end-$a[$axis])/$delta;$low=max($low,min($t1,$t2));$high=min($high,max($t1,$t2));}
            }
            if($low<=$high&&$high>0&&$low<1)return false;
        }return true;
    }
    public function pulse(User $user,array $data): array
    {
        abort_unless(self::allowed($user),403);
        return Cache::lock('office:pilot:mutex:'.$user->id,3)->block(1,function()use($user,$data){
            $left='office:pilot:left:'.$user->id.':'.$data['session_id'];
            abort_if(Cache::has($left),409,'Kendali sudah dihentikan. Aktifkan kembali dari ruang virtual.');
            $state=Cache::get(self::key($user->id));$active=self::current($user->id);$now=now()->getTimestampMs();
            abort_if($active&&$active['session_id']!==$data['session_id'],409,'Avatar sedang dikendalikan dari tab lain. Tutup kendali tab tersebut terlebih dahulu.');
            if(!$active||$data['mode']==='claim'){
                $point=$state&&$this->free($state['x'],$state['z'])?$state:['x'=>-6+($user->id%16)*.8,'y'=>-.12,'z'=>20.5+((int)floor($user->id/16)%3)*.8];
                $state=['x'=>$point['x'],'y'=>-.12,'z'=>$point['z'],'yaw'=>$point['yaw']??0,'session_id'=>$data['session_id'],'seq'=>0,'action'=>'idle','updated_ms'=>$now,'credit'=>.7];
            }else{
                if($data['seq']<=$state['seq'])return $state;
                $elapsed=max(0,($now-$state['updated_ms'])/1000);$credit=min(5,($state['credit']??.7)+$elapsed*9.2);
                $distance=0;$previous=$state;$trail=$data['trail']??[];
                if(!$trail||hypot($trail[count($trail)-1]['x']-$data['x'],$trail[count($trail)-1]['z']-$data['z'])>.001)$trail[]=$data;
                foreach($trail as$point){$distance+=hypot($point['x']-$previous['x'],$point['z']-$previous['z']);abort_unless($this->segment($previous,$point),422,'Gerakan dikoreksi: batas kawasan atau penghalang.');$previous=$point;}
                // Reject teleports and continuous sweeps through even thin nets.
                abort_if($distance>$credit+.08,422,'Gerakan terlalu jauh. Posisi disinkronkan kembali.');
                if(in_array($data['action'],['play','drink','eat','dance'],true)){
                    $venue=self::layout()['venues'][$data['venue']??'']??null;abort_unless($venue&&hypot($data['x']-$venue['x'],$data['z']-$venue['z'])<=$venue['radius'],422,'Datangi lokasi sebelum beraktivitas.');
                }
                $state=array_merge($state,array_intersect_key($data,array_flip(['x','y','z','yaw','seq','action','venue'])),['credit'=>max(0,$credit-$distance),'updated_ms'=>$now]);
            }
            abort_if(Cache::has($left),409,'Kendali sudah dihentikan.');
            Cache::put(self::key($user->id),$state,900);Cache::put(self::lease($user->id),$data['session_id'],8);
            return $state;
        });
    }
    public function leave(User $user,string $session): void
    {
        Cache::put('office:pilot:left:'.$user->id.':'.$session,true,30);
        if(Cache::get(self::lease($user->id))===$session)Cache::forget(self::lease($user->id));
    }
    public function requireVenue(User $user,string $id): void
    {
        $state=self::current($user->id);$venue=self::layout()['venues'][$id]??null;
        abort_unless($state&&$venue&&hypot($state['x']-$venue['x'],$state['z']-$venue['z'])<=$venue['radius'],409,'Jalan ke lokasi '.$id.' terlebih dahulu, lalu klik tempatnya.');
    }
}
