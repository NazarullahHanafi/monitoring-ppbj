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
            'seq'=>['required','integer','min:0','max:2147483647'],'x'=>['required','numeric','between:-100,100'],'z'=>['required','numeric','between:-22,92'],
            'y'=>['required','numeric','between:-0.12,1.4'],'yaw'=>['required','numeric','between:-3.142,3.142'],
            'trail'=>['sometimes','array','max:32'],'trail.*'=>['array:x,z'],'trail.*.x'=>['required','numeric','between:-100,100'],'trail.*.z'=>['required','numeric','between:-22,92'],
            'venue'=>['nullable',Rule::in(array_keys(VirtualOfficePilot::layout()['venues']))],
            'action'=>['required',Rule::in(['idle','walk','run','jump','play','dance','drink','eat'])]]);
        $state=$pilot->pulse($request->user(),$data);
        $peers=collect($presence->snapshot($request->user())['people'])->filter(fn($p)=>!empty($p['pilot']))->map(fn($p)=>['id'=>$p['id']]+$p['pilot'])->values();
        return response()->json(['self'=>VirtualOfficePilot::publicState($state),'peers'=>$peers])->header('Cache-Control','private, no-store');
    }
    public function leave(Request $request,VirtualOfficePilot $pilot)
    {
        abort_unless(VirtualOfficePilot::allowed($request->user()),403);
        $data=$request->validate(['session_id'=>['required','uuid']]);$pilot->leave($request->user(),$data['session_id']);
        return response()->json(['left'=>true])->header('Cache-Control','private, no-store');
    }
}
