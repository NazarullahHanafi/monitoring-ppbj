<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\VirtualOfficeMeetings;
use App\Services\VirtualOfficeWorld;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;

class VirtualOfficeMeetingController extends Controller
{
    private function department(Request $request): void
    {
        abort_unless(in_array($request->user()->department, ['umum', 'operasional'], true), 403);
    }

    public function live(Request $request, VirtualOfficeMeetings $meetings, VirtualOfficeWorld $world)
    {
        $this->department($request);
        $request->validate(['ready' => ['nullable', 'uuid']]);
        $user = $request->user(); $room = null; $messages = []; $connected = $ready = false;
        if (VirtualOfficeMeetings::eligible($user)) {
            Cache::put(VirtualOfficeMeetings::lease($user->id), true, 20);
            $room = $meetings->current($user->id);
            if ($room) {
                $connected = $meetings->connected($room);
                if ($connected) {
                    $other = User::find($room['from'] === (int) $user->id ? $room['to'] : $room['from']);
                    $connected = $other && VirtualOfficeMeetings::eligible($other);
                }
                $key = 'office:meeting:ready:'.$user->id;
                if ($connected && $request->input('ready') === $room['id']) Cache::put($key, $room['id'], 12);
                else Cache::forget($key);
                $ready = $connected && Cache::get('office:meeting:ready:'.$room['from']) === $room['id'] && Cache::get('office:meeting:ready:'.$room['to']) === $room['id'];
                if ($connected) $messages = $meetings->messages($room, $user);
            }
        }
        return response()->json(['world' => $world->snapshot(), 'room' => $room, 'connected' => $connected,
            'ready' => $ready, 'messages' => $messages, 'poll_seconds' => $room ? 3 : 8])->header('Cache-Control', 'private, no-store');
    }

    public function invite(Request $request, VirtualOfficeMeetings $meetings)
    {
        $this->department($request);
        $data = $request->validate(['target_id' => ['required', 'integer', 'min:1']]);
        $target = User::findOrFail($data['target_id']);
        abort_unless($target->shouldDisplayInPresence(), 404);
        return response()->json(['room' => $meetings->invite($request->user(), $target)], 201)->header('Cache-Control', 'private, no-store');
    }

    public function respond(Request $request, VirtualOfficeMeetings $meetings)
    {
        $this->department($request);
        $data = $request->validate(['id' => ['required', 'uuid'], 'action' => ['required', Rule::in(['accept', 'decline', 'end'])]]);
        return response()->json(['room' => $meetings->respond($request->user(), $data['id'], $data['action'])])->header('Cache-Control', 'private, no-store');
    }

    public function send(Request $request, VirtualOfficeMeetings $meetings)
    {
        $this->department($request);
        abort_unless(VirtualOfficeMeetings::eligible($request->user()), 403);
        $data = $request->validate(['id' => ['required', 'uuid'], 'message' => ['required', 'string', 'max:350']]);
        return Cache::lock('office:meeting:mutex', 5)->block(2, function () use ($request, $meetings, $data) {
            $room = $meetings->current($request->user()->id);
            abort_unless($room && hash_equals($room['id'], $data['id']), 404);
            abort_unless($meetings->connected($room)
                && Cache::get('office:meeting:ready:'.$room['from']) === $room['id']
                && Cache::get('office:meeting:ready:'.$room['to']) === $room['id'], 409, 'Kedua avatar harus online dan sudah bertatap muka.');
            $other = User::findOrFail($room['from'] === (int) $request->user()->id ? $room['to'] : $room['from']);
            abort_unless(VirtualOfficeMeetings::eligible($other), 409, 'Rekan sudah tidak tersedia.');
            $text = trim($data['message']); abort_if($text === '', 422, 'Isi pesan terlebih dahulu.');
            $id = \Illuminate\Support\Facades\DB::table('virtual_office_messages')->insertGetId(['user_id' => $request->user()->id,
                'target_id' => $other->id, 'message' => $text, 'request_id' => (string) \Illuminate\Support\Str::uuid(), 'created_at' => now()]);
            return response()->json(['id' => $id], 201)->header('Cache-Control', 'private, no-store');
        });
    }
}
