<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class VirtualOfficeGames
{
    public const NETWORK = ['badminton', 'tennis', 'pingpong', 'foosball'];
    public static function key(int $id): string { return 'office:game:user:'.$id; }

    public function current(int $id): ?array
    {
        $key = Cache::get(self::key($id)); $game = $key ? Cache::get('office:game:'.$key) : null;
        return is_array($game) && in_array($id, [$game['from'], $game['to']], true) && $game['expires'] > now()->timestamp ? $game : null;
    }
    private function store(array $game): array
    {
        $ttl = max(1, $game['expires'] - now()->timestamp);
        Cache::put('office:game:'.$game['id'], $game, $ttl);
        Cache::put(self::key($game['from']), $game['id'], $ttl);
        // Offline avatars are NPC opponents, never a fake invitation for that user.
        if (! $game['bot']) Cache::put(self::key($game['to']), $game['id'], $ttl);
        foreach ($game['bot'] ? [$game['from']] : [$game['from'], $game['to']] as $id) {
            if ($game['status'] === 'playing') Cache::put('office:recreation:'.$id, ['destination' => $game['kind'], 'kind' => 'game', 'game_id' => $game['id'], 'until' => $game['expires']], $ttl);
            elseif ($game['status'] === 'finished' && (Cache::get('office:recreation:'.$id)['game_id'] ?? null) === $game['id']) Cache::forget('office:recreation:'.$id);
        }
        return $game;
    }
    public function invite(User $user, User $target, string $kind): array
    {
        abort_unless(VirtualOfficeMeetings::eligible($user) && VirtualOfficeMeetings::eligible($target), 403);
        abort_if($user->id === $target->id, 422);
        return Cache::lock('office:game:mutex', 5)->block(2, function () use ($user, $target, $kind) {
            $online = app(VirtualOfficeMeetings::class)->online($target->id);
            abort_if($this->current($user->id) || $online && $this->current($target->id), 409, 'Salah satu peserta masih memiliki permainan atau undangan.');
            $game = ['id' => (string) Str::uuid(), 'kind' => $kind, 'from' => (int) $user->id, 'to' => (int) $target->id, 'from_name' => $user->name, 'to_name' => $target->name,
                'bot' => ! $online, 'status' => $online ? 'pending' : 'playing', 'score' => [0, 0], 'turn' => (int) $user->id, 'target' => .5, 'rally' => 0, 'revision' => 0,
                'expires' => now()->addMinutes($online ? 3 : 30)->timestamp, 'last_action' => null];
            return $this->store($game);
        });
    }
    public function respond(User $user, string $id, string $action): ?array
    {
        return Cache::lock('office:game:mutex', 5)->block(2, function () use ($user, $id, $action) {
            $game = $this->current($user->id); abort_unless($game && hash_equals($game['id'], $id), 404);
            if ($action !== 'accept') {
                if ($action === 'decline') abort_unless($game['to'] === (int) $user->id && $game['status'] === 'pending', 403);
                Cache::forget(self::key($game['from']));
                if (! $game['bot']) Cache::forget(self::key($game['to']));
                Cache::forget('office:game:'.$id);
                foreach ($game['bot'] ? [$game['from']] : [$game['from'], $game['to']] as $participant) {
                    if ((Cache::get('office:recreation:'.$participant)['game_id'] ?? null) === $id) Cache::forget('office:recreation:'.$participant);
                }
                return null;
            }
            abort_unless($game['to'] === (int) $user->id && $game['status'] === 'pending', 403);
            app(VirtualOfficePilot::class)->requireVenue($user,$game['kind']);
            $other = User::findOrFail($game['from']);
            abort_unless(VirtualOfficeMeetings::eligible($other) && app(VirtualOfficeMeetings::class)->online($other->id), 409, 'Pengundang sudah tidak tersedia.');
            $game['status'] = 'playing'; $game['expires'] = now()->addMinutes(30)->timestamp; $game['revision']++;
            return $this->store($game);
        });
    }
    public function hit(User $user, array $data): array
    {
        return Cache::lock('office:game:mutex', 5)->block(2, function () use ($user, $data) {
            $game = $this->current($user->id); abort_unless($game && hash_equals($game['id'], $data['id']), 404);
            if (($game['last_action'] ?? null) === $data['request_id']) return $game;
            abort_unless($game['status'] === 'playing' && $game['turn'] === (int) $user->id, 409, 'Tunggu giliran Anda.');
            abort_unless($game['revision'] === (int) $data['revision'], 409, 'Pukulan berubah di tab lain. Tunggu sinkronisasi.');
            $other = User::findOrFail($game['from'] === (int) $user->id ? $game['to'] : $game['from']);
            abort_unless(VirtualOfficeMeetings::eligible($other), 409, 'Lawan sudah tidak tersedia.');
            if (! $game['bot']) abort_unless(app(VirtualOfficeMeetings::class)->online($other->id), 409, 'Lawan terputus. Akhiri atau tunggu ia kembali.');
            $side = $game['from'] === (int) $user->id ? 0 : 1;
            // A return must meet the incoming shuttle at the racket, with a legal
            // strength. The landing point becomes the next player's required aim.
            $miss = abs($data['racket'] - $game['target']) > .14 || $data['power'] < .18 || $data['power'] > .94;
            $landing = round(max(0, min(1, $data['aim'] + ($data['power'] - .6) * .14)), 3);
            $game['shot'] = ['by' => (int) $user->id, 'from' => $game['target'], 'to' => $landing, 'power' => $data['power'], 'miss' => $miss, 'at' => now()->getTimestampMs()];
            if ($miss) { $game['score'][1 - $side]++; $game['rally'] = 0; $game['target'] = .5; }
            else { $game['target'] = $landing; $game['rally']++; }
            $game['turn'] = (int) $other->id;
            if ($game['bot']) {
                // Computer returns are explicit. User's account/presence is untouched.
                $botMiss = ! $miss && (abs($landing - .5) > .38 && $data['power'] > .72 || $game['rally'] > 14);
                if ($botMiss) { $game['score'][$side]++; $game['rally'] = 0; $game['target'] = .5; }
                elseif (! $miss) $game['target'] = round(.14 + (hexdec(substr(hash('sha256', $game['id'].':'.$game['revision']), 0, 4)) % 720) / 1000, 3);
                $game['turn'] = (int) $user->id;
            }
            $goal = $game['kind'] === 'badminton' ? 21 : ($game['kind'] === 'foosball' ? 7 : 11);
            $scores = $game['score'];
            if (max($scores) >= $goal && abs($scores[0] - $scores[1]) >= 2 || max($scores) >= $goal + 9) $game['status'] = 'finished';
            $game['revision']++; $game['last_action'] = $data['request_id'];
            return $this->store($game);
        });
    }
}
