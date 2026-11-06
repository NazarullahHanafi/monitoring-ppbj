<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\VirtualOfficeCombat;
use App\Services\VirtualOfficePilot;
use App\Services\VirtualOfficeRecreation;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class VirtualOfficeCombatController extends Controller
{
    private function user(Request $request): User { abort_unless(VirtualOfficeRecreation::allowed($request->user())&&!\Illuminate\Support\Facades\Cache::get('simonpr:read_only_mode',false),403);return $request->user(); }
    private function json(array $data){return response()->json($data)->header('Cache-Control','private, no-store');}
    public function show(Request $request,VirtualOfficeCombat $combat){$user=$this->user($request);app(VirtualOfficeRecreation::class)->daily($user);return $this->json($combat->account($user));}
    public function buy(Request $request,VirtualOfficeCombat $combat){$user=$this->user($request);$data=$request->validate(['weapon'=>['required',Rule::in(array_keys($combat::catalog()['weapons']))],'request_id'=>['required','uuid'],'price'=>['prohibited'],'balance'=>['prohibited'],'user_id'=>['prohibited']]);return $this->json($combat->buy($user,$data['weapon'],$data['request_id']));}
    public function equip(Request $request,VirtualOfficeCombat $combat){$user=$this->user($request);$data=$request->validate(['weapon'=>['nullable',Rule::in(array_keys($combat::catalog()['weapons']))],'user_id'=>['prohibited']]);return $this->json($combat->equip($user,$data['weapon']??null));}
    public function attack(Request $request,VirtualOfficeCombat $combat){$user=$this->user($request);$catalog=$combat::catalog();$data=$request->validate(['target_id'=>['required','integer','min:1'],'kind'=>['required',Rule::in(array_merge(array_keys($catalog['weapons']),array_keys($catalog['specials'])))],'request_id'=>['required','uuid'],'damage'=>['prohibited'],'hp'=>['prohibited'],'user_id'=>['prohibited']]);return $this->json($combat->attack($user,User::findOrFail($data['target_id']),$data['kind'],$data['request_id']));}
    public function fire(Request $request,\App\Services\VirtualOfficeShooting $shooting){$user=$this->user($request);$catalog=VirtualOfficeCombat::catalog();$data=$request->validate(['kind'=>['required',Rule::in(array_merge(array_keys($catalog['weapons']),array_keys($catalog['specials'])))],'request_id'=>['required','uuid'],'aim'=>['required','array:x,y,z'],'aim.x'=>['required','numeric','between:-300,300'],'aim.y'=>['required','numeric','between:-100,150'],'aim.z'=>['required','numeric','between:-400,300'],'damage'=>['prohibited'],'hp'=>['prohibited'],'user_id'=>['prohibited'],'target_id'=>['prohibited']]);return $this->json($shooting->fire($user,$data['kind'],$data['request_id'],$data['aim']));}
}
