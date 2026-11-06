<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;

class VirtualOfficePilot
{
    private ?int $homePlotCount=null;
    private function neighbourhood(array $a,?array $b,?int $openSlot,float $radius=.3,bool $airspace=false): array
    {
        if(min($a['z'],$b['z']??$a['z'])>-20)return [];
        return VirtualOfficeHomes::boxes($a,$b,$openSlot,$this->homePlotCount??=count(VirtualOfficeHomes::slots()),max(.4,$radius),$airspace);
    }
    public static function key(int $id): string { return 'office:pilot:v1:'.$id; }
    public static function lease(int $id): string { return 'office:pilot:lease:'.$id; }
    public static function layout(): array { static $data; return $data ??= json_decode(file_get_contents(resource_path('data/virtual-office-layout.json')), true, 512, JSON_THROW_ON_ERROR); }
    public static function motion(): array { static $data;return $data??=json_decode(file_get_contents(resource_path('data/virtual-office-motion.json')),true,512,JSON_THROW_ON_ERROR); }
    public static function abilities(): array { static $data;return $data??=json_decode(file_get_contents(resource_path('data/virtual-office-abilities.json')),true,512,JSON_THROW_ON_ERROR); }
    public static function allowed(User $user): bool { return $user->is_active && in_array($user->department, ['umum','operasional'], true); }
    public static function current(int $id): ?array
    {
        $state=Cache::get(self::key($id));return is_array($state)&&Cache::get(self::lease($id))===($state['session_id']??null)?$state:null;
    }
    public static function publicState(?array $state): ?array { return $state ? array_intersect_key($state,array_flip(['x','y','z','yaw','action','venue','pose','door_open','seq','updated_ms','skill','skill_at','form','form_at','form_until','form_ready_at','flight','air_access','hp','weapon','respawn_id','shield_until','shot_at','shot_kind','shot_end','shot_origin','attack_ready_at','combat_revision'])) : null; }
    private static function vaultable(array $box): bool { return $box['top']<=self::motion()['vault_height']&&in_array($box['tag'],self::motion()['vault_tags'],true); }
    public function free(float $x,float $z,?int $openSlot=null,float $y=-.12,float $radius=.3,bool $airspace=false): bool
    {
        $bounds=self::layout()['bounds'];$r=$radius;
        if($x<$bounds['minX']+$r||$x>$bounds['maxX']-$r||$z<$bounds['minZ']+$r||$z>$bounds['maxZ']-$r)return false;
        foreach(array_merge($this->obstacles(),$this->neighbourhood(['x'=>$x,'z'=>$z],null,$openSlot,$radius,$airspace))as$b)if(!((self::vaultable($b)||$airspace)&&$y>=$b['top']+.075||isset($b['bottom'])&&$y+1.8<=$b['bottom']-.075)&&$x>$b['left']-$r&&$x<$b['right']+$r&&$z>$b['back']-$r&&$z<$b['front']+$r)return false;
        return true;
    }
    public function obstacles(): array
    {
        static $data;return $data ??= json_decode(file_get_contents(resource_path('data/virtual-office-collisions.json')),true,512,JSON_THROW_ON_ERROR);
    }
    // Thin weapon rays use the actual vertical box interval, without the
    // avatar's head clearance used by movement sweeps.
    public function rayLimit(array $from,array $to): float
    {
        $limit=1.0;
        foreach(array_merge($this->obstacles(),$this->neighbourhood($from,$to,null,.02,true))as$box){
            $low=0.0;$high=1.0;
            foreach([['x',$box['left']-.02,$box['right']+.02],['z',$box['back']-.02,$box['front']+.02],['y',$box['bottom']??-.3,$box['top']+.02]]as[$axis,$start,$end]){
                $delta=$to[$axis]-$from[$axis];if(abs($delta)<1e-8){if($from[$axis]<$start||$from[$axis]>$end){$low=2;break;}}
                else{$a=($start-$from[$axis])/$delta;$b=($end-$from[$axis])/$delta;$low=max($low,min($a,$b));$high=min($high,max($a,$b));}
            }
            if($low<=$high&&$low>=0&&$low<$limit)$limit=max(0,$low-.001);
        }
        if($to['y']<-.12&&$from['y']>-.12)$limit=min($limit,(-.12-$from['y'])/($to['y']-$from['y']));
        return $limit;
    }
    private function ground(array $point,?array $home,?int $openSlot,bool $airspace=false,float $radius=.3): float
    {
        $floorPoint=array_replace($point,['y'=>-.12]);$ground=-.12;
        $layout=VirtualOfficeHomes::layout();$column=(int)round(($point['x']-$layout['startX'])/$layout['spacingX']);$row=(int)round(($layout['startZ']-$point['z'])/$layout['spacingZ']);$slot=$row*$layout['columns']+$column;
        if($column>=0&&$column<$layout['columns']&&$row>=0&&$slot<($this->homePlotCount??=count(VirtualOfficeHomes::slots()))&&VirtualOfficeHomes::inside($floorPoint,VirtualOfficeHomes::location($slot)))$ground=.22;
        foreach(array_merge($this->obstacles(),$this->neighbourhood($point,null,$openSlot,$radius,$airspace))as$box)if((self::vaultable($box)||$airspace)&&$point['x']>$box['left']-$radius&&$point['x']<$box['right']+$radius&&$point['z']>$box['back']-$radius&&$point['z']<$box['front']+$radius&&($point['y']??-.12)>=$box['top']+.07)$ground=max($ground,$box['top']+.08);
        return $ground;
    }
    public function segment(array $a,array $b,?int $openSlot=null,float $radius=.3,bool $airspace=false): bool
    {
        if(!$this->free($b['x'],$b['z'],$openSlot,$b['y']??-.12,$radius,$airspace))return false;
        foreach(array_merge($this->obstacles(),$this->neighbourhood($a,$b,$openSlot,$radius,$airspace))as$box){$low=0;$high=1;
            foreach([['x',$box['left']-$radius,$box['right']+$radius],['z',$box['back']-$radius,$box['front']+$radius]]as[$axis,$start,$end]){
                $delta=$b[$axis]-$a[$axis];
                if(abs($delta)<1e-8){if($a[$axis]<=$start||$a[$axis]>=$end){$low=2;break;}}
                else{$t1=($start-$a[$axis])/$delta;$t2=($end-$a[$axis])/$delta;$low=max($low,min($t1,$t2));$high=min($high,max($t1,$t2));}
            }
            if($low<=$high&&$high>0&&$low<1){$ay=$a['y']??-.12;$by=$b['y']??-.12;
                $startY=$ay+($by-$ay)*max(0,$low);$endY=$ay+($by-$ay)*min(1,$high);
                if((self::vaultable($box)||$airspace)&&min($startY,$endY)>=$box['top']+.075||isset($box['bottom'])&&max($startY,$endY)+1.8<=$box['bottom']-.075)continue;
                return false;
            }
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
                $state=['x'=>$point['x'],'y'=>$this->ground(array_replace($point,['y'=>-.12]),VirtualOfficeHomes::own($user),null),'z'=>$point['z'],'yaw'=>$point['yaw']??0,'session_id'=>$data['session_id'],'seq'=>0,'action'=>'idle','updated_ms'=>$now,'credit'=>.7,'door_open'=>false,'form'=>null,'flight'=>false,'form_ready_at'=>$state['form_ready_at']??0,'skill_at'=>$state['skill_at']??null,'skill'=>$state['skill']??null,'combat_revision'=>$state['combat_revision']??0,'hp'=>$state['hp']??100,'weapon'=>$state['weapon']??null,'respawn_id'=>$state['respawn_id']??null,'shield_until'=>$state['shield_until']??0,'attack_ready_at'=>$state['attack_ready_at']??0];
            }else{
                if(!empty($state['respawn_id'])&&($data['respawn_id']??null)!==$state['respawn_id']){Cache::put(self::lease($user->id),$data['session_id'],20);return $state;}
                if($data['seq']<=$state['seq'])return $state;
                $catalog=self::abilities();$form=$catalog['skills'][$state['form']??'']??null;$wasFlying=!empty($state['flight']);
                if($form&&$now>=($state['form_until']??0)){$state['form']=null;$state['flight']=false;$state['landing_until']=($state['form_until']??$now)+6000;$form=null;}
                $graceFlight=$wasFlying&&!$form&&$now<=($state['form_until']??0)+1000;
                $flying=!empty($data['flight'])&&!empty($form['fly']);if(!empty($state['flight'])&&!$flying)$state['landing_until']=$now+6000;
                $home=VirtualOfficeHomes::own($user);$openSlot=!empty($state['door_open'])?($home['slot']??null):null;
                $airspace=$flying||$wasFlying||$graceFlight||!empty($state['air_access']);
                $bodyRadius=$form['radius']??.3;$stateGround=$this->ground($state,$home,$openSlot,$airspace,$bodyRadius);
                $landing=!empty($state['landing_until'])&&$state['y']>$stateGround+.12;
                if($landing&&$now>$state['landing_until']){$state['y']=$stateGround;$state['action']='idle';$state['air_started_ms']=null;$state['landing_until']=null;Cache::put(self::key($user->id),$state,900);$landing=false;}
                abort_if(!empty($data['flight'])&&empty($form['fly'])&&!$graceFlight,422,'Mode ini tidak dapat terbang.');
                $airFloor=$state['air_floor']??$stateGround;
                $maximumY=$flying||$landing||$graceFlight?self::motion()['flight_maximum_y']:($airspace?min(self::motion()['flight_maximum_y'],max(self::motion()['maximum_y'],max($stateGround,$airFloor)+self::motion()['maximum_y']+.12)):self::motion()['maximum_y']);
                abort_if($data['y']>$maximumY||collect($data['trail']??[])->contains(fn($p)=>($p['y']??-.12)>$maximumY),422,'Ketinggian tidak sesuai mode aktif.');
                abort_if($landing&&!$flying&&!$graceFlight&&$data['y']>$state['y']+.05,422,'Mode berakhir. Avatar harus mendarat.');
                $elapsed=max(0,($now-$state['updated_ms'])/1000);$motion=self::motion();$credit=min($motion['distance_credit'],($state['credit']??.7)+$elapsed*$motion['maximum_speed']);
                $distance=0;$previous=$state;$trail=$data['trail']??[];
                if(!$trail||hypot($trail[count($trail)-1]['x']-$data['x'],$trail[count($trail)-1]['z']-$data['z'])>.001||abs(($trail[count($trail)-1]['y']??-.12)-$data['y'])>.001)$trail[]=$data;
                $air=$state['air_started_ms']??null;$previousGround=$stateGround;
                $vertical=0;foreach($trail as$point){$point['y']=$point['y']??($previous['y']??-.12);$vertical+=abs($point['y']-($previous['y']??-.12));$distance+=hypot($point['x']-$previous['x'],$point['z']-$previous['z']);abort_unless($this->segment($previous,$point,$openSlot,$form['radius']??.3,$airspace),422,'Gerakan dikoreksi: batas kawasan atau penghalang.');
                    $support=$this->ground($point,$home,$openSlot,$airspace,$bodyRadius);
                    // A landing may occur between two snapshots. Inspect the
                    // verified trail instead of extending one endless jump.
                    if($point['y']<=$support+.12){$air=null;$airFloor=$support;}
                    elseif($air===null){$air=$now;$airFloor=max($previousGround,$support);}
                    $previousGround=$support;$previous=$point;}
                abort_if($vertical>($elapsed*15+.5),422,'Lompatan terlalu cepat.');
                $ground=$this->ground($data,$home,$openSlot,$airspace,$bodyRadius);
                $airLimit=self::motion()['maximum_air_ms']+($airspace?sqrt(2*max(0,$airFloor-$ground)/self::motion()['gravity'])*1000:0);
                abort_if(!$flying&&!$landing&&$air!==null&&$now-$air>$airLimit,422,'Lompatan berakhir. Kembali ke tanah.');
                // Reject teleports and continuous sweeps through even thin nets.
                abort_if($distance>$credit+.08,422,'Gerakan terlalu jauh. Posisi disinkronkan kembali.');
                if(in_array($data['action'],['play','drink','eat','dance','rest'],true)){
                    $venue=self::layout()['venues'][$data['venue']??'']??null;$atHome=($data['venue']??null)==='home'&&VirtualOfficeHomes::inside($data,$home);
                    $outdoors=$data['action']==='rest'&&($data['venue']??null)==='campus'&&$this->free($data['x'],$data['z'],$openSlot);
                    abort_unless($outdoors||$atHome||$venue&&hypot($data['x']-$venue['x'],$data['z']-$venue['z'])<=$venue['radius'],422,'Datangi lokasi sebelum beraktivitas.');
                }
                $state=array_merge($state,array_intersect_key($data,array_flip(['x','y','z','yaw','seq','action','venue','pose'])),['credit'=>max(0,$credit-$distance),'updated_ms'=>$now,'air_started_ms'=>$air,'air_floor'=>$airFloor,'flight'=>$flying,'air_access'=>$airspace&&$data['y']>$this->ground($data,$home,$openSlot,false)+.12]);
                if(!$flying&&$data['y']<=$ground+.12)$state['landing_until']=null;
            }
            if(!empty($data['skill'])&&($state['skill_id']??null)!==($data['skill_id']??null)){
                $profile=\Illuminate\Support\Facades\DB::table('virtual_office_profiles')->where('user_id',$user->id)->value('avatar');
                $costume=VirtualOfficeAvatar::sanitize($profile,$user->gender,$user->id)['costume'];$catalog=self::abilities();
                abort_unless(in_array($data['skill'],$catalog['characters'][$costume]??$catalog['characters']['none'],true),422,'Jurus tidak sesuai kostum tersimpan.');
                $spec=$catalog['skills'][$data['skill']];$previousSpec=$catalog['skills'][$state['skill']??'']??[];
                if(($spec['type']??null)==='transform'){
                    abort_if(($state['form_ready_at']??0)>$now||!empty($state['form']),422,'Transformasi masih aktif atau sedang memulihkan energi.');
                    abort_if(VirtualOfficeHomes::inside($state,VirtualOfficeHomes::own($user))||!$this->free($state['x'],$state['z'],null,$state['y'],$spec['radius']),422,'Cari area lapang di luar rumah untuk berubah.');
                    $state['form']=$data['skill'];$state['form_at']=$now;$state['form_until']=$now+$spec['duration']*1000;$state['form_ready_at']=$now+$spec['cooldown']*1000;$state['form_costume']=$costume;
                }
                $cooldown=($previousSpec['type']??null)==='transform'?0:($previousSpec['cooldown']??6);
                abort_if(isset($state['skill_at'])&&$now-$state['skill_at']<$cooldown*1000,422,'Jurus sedang memulihkan energi.');
                $state['skill']=$data['skill'];$state['skill_id']=$data['skill_id'];$state['skill_at']=$now;
            }
            if(!empty($data['end_form'])&&!empty($state['form'])){$state['form']=null;$state['flight']=false;if($state['y']>.15)$state['landing_until']=$now+6000;}
            $state['workspace']=!empty($data['workspace']);
            $state['combat_version']=(int)($data['combat_version']??0);
            abort_if(Cache::has($left),409,'Kendali sudah dihentikan.');
            Cache::put(self::key($user->id),$state,900);Cache::put(self::lease($user->id),$data['session_id'],20);
            return $state;
        });
    }
    public function leave(User $user,string $session): void
    {
        Cache::put('office:pilot:left:'.$user->id.':'.$session,true,30);
        if(Cache::get(self::lease($user->id))===$session)Cache::forget(self::lease($user->id));
    }
    public function door(User $user,string $session,bool $open): array
    {
        abort_unless(self::allowed($user),403);
        return Cache::lock('office:pilot:mutex:'.$user->id,3)->block(1,function()use($user,$session,$open){
            $state=self::current($user->id);$home=VirtualOfficeHomes::own($user);
            abort_unless($state&&$state['session_id']===$session,409,'Aktifkan kendali avatar terlebih dahulu.');
            abort_unless($home,409,'Alamat rumah belum tersedia.');
            abort_unless(VirtualOfficeHomes::inside($state,$home)||hypot($state['x']-$home['x'],$state['z']-($home['z']+3.9))<=2.8,409,'Berjalan ke pintu rumah sendiri dahulu.');
            abort_if(!$open&&abs($state['x']-$home['x'])<1&&abs($state['z']-($home['z']+3.9))<.65,409,'Menjauh sedikit dari ambang sebelum menutup pintu.');
            $state['door_open']=$open;Cache::put(self::key($user->id),$state,900);return $state;
        });
    }
    public function requireVenue(User $user,string $id): void
    {
        $state=self::current($user->id);$venue=self::layout()['venues'][$id]??null;
        abort_unless($state&&$venue&&hypot($state['x']-$venue['x'],$state['z']-$venue['z'])<=$venue['radius'],409,'Jalan ke lokasi '.$id.' terlebih dahulu, lalu klik tempatnya.');
    }
}
