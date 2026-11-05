<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\VirtualOfficeRecreation;
use App\Services\VirtualOfficeMeetings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class VirtualOfficeRecreationController extends Controller
{
    private function user(Request $request): User
    {
        abort_unless(VirtualOfficeRecreation::allowed($request->user()), 403);
        return $request->user();
    }
    private function json(array $data, int $status = 200)
    {
        return response()->json($data, $status)->header('Cache-Control', 'private, no-store');
    }
    public function account(Request $request, VirtualOfficeRecreation $service)
    {
        $user = $this->user($request); $service->daily($user);
        return $this->json($service->account($user) + ['catalog' => array_values($service::catalog()), 'destinations' => $service::DESTINATIONS]);
    }
    public function order(Request $request, VirtualOfficeRecreation $service)
    {
        $user = $this->user($request);
        $data = $request->validate(['request_id' => ['required', 'uuid'], 'item' => ['required', Rule::in(array_keys($service::catalog()))], 'quantity' => ['required', 'integer', 'between:1,10'], 'destination' => ['required', Rule::in(array_keys($service::DESTINATIONS))], 'user_id' => ['prohibited'], 'price' => ['prohibited'], 'balance' => ['prohibited']]);
        return $this->json($service->order($user, $data), 201);
    }
    public function consume(Request $request, VirtualOfficeRecreation $service)
    {
        $user = $this->user($request); $data = $request->validate(['id' => ['required', 'uuid'], 'request_id' => ['required', 'uuid'], 'destination' => ['required', Rule::in(array_keys($service::DESTINATIONS))]]);
        return $this->json($service->consume($user, $data['id'], $data['destination'], $data['request_id']));
    }
    public function checkout(Request $request, VirtualOfficeRecreation $service)
    {
        $user = $this->user($request);
        $data = $request->validate(['request_id' => ['required', 'uuid'], 'destination' => ['required', Rule::in(array_keys($service::DESTINATIONS))],
            'items' => ['required', 'array', 'min:1', 'max:20'], 'items.*' => ['required', 'array:item,quantity'],
            'items.*.item' => ['required', 'string', 'distinct:strict', Rule::in(array_keys($service::catalog()))], 'items.*.quantity' => ['required', 'integer', 'between:1,10'],
            'user_id' => ['prohibited'], 'price' => ['prohibited'], 'total' => ['prohibited'], 'balance' => ['prohibited']]);
        return $this->json($service->checkout($user, $data), 201);
    }
    public function move(Request $request, VirtualOfficeRecreation $service)
    {
        $user = $this->user($request); $data = $request->validate(['destination' => ['required', Rule::in(array_merge(array_keys($service::DESTINATIONS), ['office']))]]);
        $service->activity($user, ['destination' => $data['destination'], 'kind' => $data['destination'] === 'disco' ? 'dance' : 'relax']);
        return $this->json(['activity' => $data]);
    }
    public function messages(Request $request)
    {
        $user = $this->user($request); $data = $request->validate(['target_id' => ['nullable', 'integer', 'min:1']]);
        $query = DB::table('virtual_office_messages')->where('created_at', '>=', now()->subDays(7))->where(function ($q) use ($user) { $q->where('user_id', $user->id)->orWhere('target_id', $user->id); });
        if (! empty($data['target_id'])) $query->where(function ($q) use ($data) { $q->where('user_id', $data['target_id'])->orWhere('target_id', $data['target_id']); });
        $messages = $query->orderByDesc('id')->limit(40)->get(['id', 'user_id', 'target_id', 'message', 'created_at'])->reverse()->values();
        return $this->json(['messages' => $messages]);
    }
    public function send(Request $request, VirtualOfficeMeetings $presence)
    {
        $user = $this->user($request); abort_unless($user->shouldDisplayInPresence(), 403);
        $data = $request->validate(['target_id' => ['required', 'integer', 'min:1'], 'request_id' => ['required', 'uuid'], 'message' => ['required', 'string', 'max:350']]);
        $target = User::findOrFail($data['target_id']);
        abort_unless($target->shouldDisplayInPresence(), 404);
        abort_unless(VirtualOfficeRecreation::allowed($target) && $target->id !== $user->id, 403);
        abort_unless($presence->online($target->id), 409, 'Rekan sedang offline. Pesan langsung tersedia ketika ia online.');
        $message = trim($data['message']); abort_if($message === '', 422, 'Tulis pesan terlebih dahulu.');
        $previous = DB::table('virtual_office_messages')->where('request_id', $data['request_id'])->first();
        if ($previous) { abort_unless((int) $previous->user_id === (int) $user->id && (int) $previous->target_id === (int) $target->id && $previous->message === $message, 409); return $this->json(['id' => $previous->id], 201); }
        $id = DB::table('virtual_office_messages')->insertGetId(['user_id' => $user->id, 'target_id' => $target->id, 'request_id' => $data['request_id'], 'message' => $message, 'created_at' => now()]);
        return $this->json(['id' => $id], 201);
    }
}
