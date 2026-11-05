<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;

class VirtualOfficeHomes
{
    public const KEY='virtual-office:home-slots:v1';
    public static function layout(): array { static $data;return $data??=json_decode(file_get_contents(resource_path('data/virtual-office-homes.json')),true,512,JSON_THROW_ON_ERROR); }
    public static function slots(): array
    {
        // Reserve addresses for inactive accounts too, so locking an account
        // cannot move everybody else's home. No profile or business writes.
        return Cache::remember(self::KEY,60,fn()=>User::orderBy('id')->limit(self::layout()['capacity'])->pluck('id')->flip()->all());
    }
    public static function location(?int $slot): ?array
    {
        $layout=self::layout();if($slot===null||$slot<0||$slot>=$layout['capacity'])return null;
        return ['slot'=>$slot,'x'=>$layout['startX']+($slot%$layout['columns'])*$layout['spacingX'],'z'=>$layout['startZ']-(int)floor($slot/$layout['columns'])*$layout['spacingZ']];
    }
    public static function own(User $user): ?array { return self::location(self::slots()[$user->id]??null); }
    public static function inside(array $point,?array $home): bool { return $home&&abs($point['x']-$home['x'])<4.4&&abs($point['z']-$home['z'])<3.7; }
    public static function boxes(array $a,?array $b=null,?int $openSlot=null,?int $plotCount=null,float $margin=.4): array
    {
        $b??=$a;$l=self::layout();$result=[];
        $minX=min($a['x'],$b['x'])-$margin;$maxX=max($a['x'],$b['x'])+$margin;$minZ=min($a['z'],$b['z'])-$margin;$maxZ=max($a['z'],$b['z'])+$margin;
        $firstCol=max(0,(int)ceil(($minX-5.1-$l['startX'])/$l['spacingX']));$lastCol=min($l['columns']-1,(int)floor(($maxX+5.1-$l['startX'])/$l['spacingX']));
        $firstRow=max(0,(int)ceil(($l['startZ']-$maxZ-5.3)/$l['spacingZ']));$lastRow=min((int)ceil($l['capacity']/$l['columns'])-1,(int)floor(($l['startZ']-$minZ+5.3)/$l['spacingZ']));
        if($firstRow>$lastRow||$firstCol>$lastCol)return [];
        $plots=$plotCount??count(self::slots());
        for($row=$firstRow;$row<=$lastRow;$row++)for($col=$firstCol;$col<=$lastCol;$col++){
            $slot=$row*$l['columns']+$col;if($slot>=$plots)continue;$p=self::location($slot);if(!$p)continue;
            foreach($l['boxes']as$box){if($box['tag']==='home-door'&&$slot===$openSlot)continue;$result[]=['left'=>$p['x']+$box['x']-$box['w']/2,'right'=>$p['x']+$box['x']+$box['w']/2,'back'=>$p['z']+$box['z']-$box['d']/2,'front'=>$p['z']+$box['z']+$box['d']/2,'top'=>$box['top'],'tag'=>$box['tag']];}
        }return $result;
    }
}
