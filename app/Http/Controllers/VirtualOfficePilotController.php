<?php
namespace App\Http\Controllers;

use App\Services\VirtualOfficePilot;
use App\Services\VirtualOfficePresence;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class VirtualOfficePilotController extends Controller
{
    public function pulse(Request $request,VirtualOfficePilot $pilot,VirtualOfficePresence $presence)
    {
        $data=$request->validate(['user_id'=>['prohibited'],'session_id'=>['required','uuid'],'mode'=>['required',Rule::in(['claim','move'])],
            'seq'=>['required','integer','min:0','max:2147483647'],'x'=>['required','numeric','between:-100,100'],'z'=>['required','numeric','between:-216,92'],
            'y'=>['required','numeric','between:-0.12,18'],'yaw'=>['required','numeric','between:-3.142,3.142'],
            'trail'=>['sometimes','array','max:64'],'trail.*'=>['array:x,y,z'],'trail.*.x'=>['required','numeric','between:-100,100'],'trail.*.y'=>['sometimes','numeric','between:-0.12,18'],'trail.*.z'=>['required','numeric','between:-216,92'],
            'flight'=>['sometimes','boolean'],'end_form'=>['sometimes','boolean'],'respawn_id'=>['nullable','uuid'],'workspace'=>['sometimes','boolean'],'combat_version'=>['sometimes','integer','in:1'],
            'venue'=>['nullable',Rule::in(array_merge(['home','campus'],array_keys(VirtualOfficePilot::layout()['venues'])))],
            'pose'=>['nullable',Rule::in(['sit','recline','nap','meditate'])],
            'skill'=>['nullable',Rule::in(array_keys(VirtualOfficePilot::abilities()['skills']))],'skill_id'=>['nullable','required_with:skill','uuid'],
            'action'=>['required',Rule::in(['idle','walk','run','jump','fly','land','play','dance','drink','eat','rest'])]]);
        try{$state=$pilot->pulse($request->user(),$data);}
        catch(\Symfony\Component\HttpKernel\Exception\HttpException $error){
            if($error->getStatusCode()!==422)throw $error;
            return response()->json(['message'=>$error->getMessage(),'self'=>VirtualOfficePilot::publicState(VirtualOfficePilot::current($request->user()->id))],422)->header('Cache-Control','private, no-store');
        }
        $peers=collect($presence->snapshot($request->user())['people'])->filter(fn($p)=>!empty($p['pilot']))->map(fn($p)=>['id'=>$p['id']]+$p['pilot'])->values();
        return response()->json(['self'=>VirtualOfficePilot::publicState($state),'peers'=>$peers])->header('Cache-Control','private, no-store');
    }
    public function leave(Request $request,VirtualOfficePilot $pilot)
    {
        abort_unless(VirtualOfficePilot::allowed($request->user()),403);
        $data=$request->validate(['session_id'=>['required','uuid']]);$pilot->leave($request->user(),$data['session_id']);
        return response()->json(['left'=>true])->header('Cache-Control','private, no-store');
    }
    public function door(Request $request,VirtualOfficePilot $pilot)
    {
        $data=$request->validate(['session_id'=>['required','uuid'],'open'=>['required','boolean'],'user_id'=>['prohibited'],'home_id'=>['prohibited']]);
        return response()->json(['self'=>VirtualOfficePilot::publicState($pilot->door($request->user(),$data['session_id'],$data['open']))])->header('Cache-Control','private, no-store');
    }
}
