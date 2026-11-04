<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;

class VirtualOfficePresence
{
    public const DIRECTORY_KEY = 'virtual-office:directory:v1';

    public function snapshot(User $viewer): array
    {
        $directory = Cache::remember(self::DIRECTORY_KEY, 60, function (): array {
            return User::query()->where('is_active', true)->whereIn('department', ['umum', 'operasional'])
                ->orderBy('id')->limit(122)->get(['id', 'name', 'email', 'role', 'department'])
                ->filter(fn (User $user) => $user->shouldDisplayInPresence())
                ->map(fn (User $user) => ['id' => $user->id, 'name' => $user->name, 'department' => $user->department])
                ->values()->all();
        });
        $limited = count($directory) > 120;
        $directory = array_slice($directory, 0, 120);
        $keys = [];
        foreach ($directory as $person) {
            $keys[] = 'presence:user:'.$person['id'];
            $keys[] = 'presence:mood:'.$person['id'];
        }
        $presence = $keys === [] ? [] : Cache::many($keys);
        $counts = ['online' => 0, 'idle' => 0, 'offline' => 0];
        $people = [];
        foreach ($directory as $person) {
            $entry = $presence['presence:user:'.$person['id']] ?? null;
            $online = is_array($entry) && (int) ($entry['id'] ?? 0) === (int) $person['id'];
            $state = $online ? (! empty($entry['idle']) ? 'idle' : 'online') : 'offline';
            $counts[$state]++;
            $people[] = $person + [
                'state' => $state,
                'mood' => mb_substr((string) ($presence['presence:mood:'.$person['id']] ?? $entry['mood'] ?? ''), 0, 20),
                'is_me' => (int) $person['id'] === (int) $viewer->id,
            ];
        }

        return ['people' => $people, 'counts' => $counts, 'limited' => $limited,
            'updated_at' => now()->toIso8601String(), 'refresh_seconds' => 45];
    }
}
