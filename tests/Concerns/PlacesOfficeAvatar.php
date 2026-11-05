<?php
namespace Tests\Concerns;

use App\Models\User;
use App\Services\VirtualOfficePilot;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

trait PlacesOfficeAvatar
{
    protected function placeAvatar(User $user,string $venue='bar'): void
    {
        $point=VirtualOfficePilot::layout()['venues'][$venue];$pilot=app(VirtualOfficePilot::class);$found=null;
        for($r=0;$r<=$point['radius'];$r+=.5){for($a=0;$a<8;$a++){$x=$point['x']+cos($a*pi()/4)*$r;$z=$point['z']+sin($a*pi()/4)*$r;if($pilot->free($x,$z)){$found=compact('x','z');break 2;}}}
        if(!$found)throw new \RuntimeException('No standing spot at '.$venue);
        $session=(string)Str::uuid();Cache::put(VirtualOfficePilot::key($user->id),$found+['y'=>-.12,'yaw'=>0,'action'=>'idle','seq'=>0,'session_id'=>$session,'updated_ms'=>now()->getTimestampMs(),'credit'=>5],3600);Cache::put(VirtualOfficePilot::lease($user->id),$session,3600);
    }
}
