<?php

namespace App\Http\Controllers;

use App\Services\VirtualOfficeTutorial;
use Illuminate\Http\Request;

class VirtualOfficeTutorialController extends Controller
{
    public function show(Request $request, VirtualOfficeTutorial $tutorial)
    {
        $user = $request->user();
        abort_unless(VirtualOfficeTutorial::eligible($user), 403);
        $progress = $tutorial->progress($user);
        $replay = (bool) $progress?->completed_at;
        $steps = $tutorial->steps($user);
        $step = $replay ? max(0, min(count($steps) - 1, (int) $request->query('step', 0))) : (int) ($progress?->step ?? 0);
        return response()->view('virtual-office.tutorial', compact('user', 'steps', 'step', 'replay'))->header('Cache-Control', 'private, no-store');
    }

    public function advance(Request $request, VirtualOfficeTutorial $tutorial)
    {
        abort_unless(VirtualOfficeTutorial::eligible($request->user()), 403);
        $data = $request->validate(['user_id' => ['prohibited'], 'step' => ['required', 'integer', 'between:0,6']]);
        $tutorial->advance($request->user(), (int) $data['step']);
        return redirect()->route($tutorial->completed($request->user()) ? 'virtual-office.index' : 'virtual-office.tutorial.show');
    }
}
