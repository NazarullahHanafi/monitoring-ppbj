<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\VirtualOfficeGames;
use App\Services\VirtualOfficeMeetings;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class VirtualOfficeGameController extends Controller
{
    private function user(Request $request): User
    {
        abort_unless(VirtualOfficeMeetings::eligible($request->user()), 403);
        return $request->user();
    }
    private function json(?array $game, int $status = 200) { return response()->json(['game' => $game], $status)->header('Cache-Control', 'private, no-store'); }
    public function show(Request $request, VirtualOfficeGames $games) { return $this->json($games->current($this->user($request)->id)); }
    public function invite(Request $request, VirtualOfficeGames $games)
    {
        $user = $this->user($request); $data = $request->validate(['target_id' => ['required', 'integer', 'min:1'], 'kind' => ['required', Rule::in($games::NETWORK)]]);
        $target = User::findOrFail($data['target_id']); abort_unless($target->shouldDisplayInPresence(), 404);
        return $this->json($games->invite($user, $target, $data['kind']), 201);
    }
    public function respond(Request $request, VirtualOfficeGames $games)
    {
        $user = $this->user($request); $data = $request->validate(['id' => ['required', 'uuid'], 'action' => ['required', Rule::in(['accept', 'decline', 'end'])]]);
        return $this->json($games->respond($user, $data['id'], $data['action']));
    }
    public function hit(Request $request, VirtualOfficeGames $games)
    {
        $user = $this->user($request); $data = $request->validate(['id' => ['required', 'uuid'], 'request_id' => ['required', 'uuid'], 'revision' => ['required', 'integer', 'min:0'], 'racket' => ['required', 'numeric', 'between:0,1'], 'aim' => ['required', 'numeric', 'between:0,1'], 'power' => ['required', 'numeric', 'between:0,1']]);
        return $this->json($games->hit($user, $data));
    }
}
