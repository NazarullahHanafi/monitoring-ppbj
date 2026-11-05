<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;

class VirtualOfficePresence
{
    public const DIRECTORY_KEY = 'virtual-office:directory:v3';

    public function snapshot(User $viewer): array
    {
        $directory = Cache::remember(self::DIRECTORY_KEY, 60, function (): array {
            return User::query()->leftJoin('virtual_office_profiles as profile', 'users.id', '=', 'profile.user_id')
                ->where('users.is_active', true)->whereIn('department', ['umum', 'operasional'])
                ->orderBy('users.id')->limit(122)->get(['users.id', 'name', 'email', 'role', 'department', 'gender', 'profile.avatar', 'profile.share_activity'])
                ->filter(fn (User $user) => $user->shouldDisplayInPresence())
                ->map(fn (User $user) => ['id' => $user->id, 'name' => $user->name, 'department' => $user->department,
                    'avatar' => VirtualOfficeAvatar::sanitize($user->avatar, $user->gender, $user->id), 'can_talk' => ! $user->isReadOnly(), 'share_activity' => $user->share_activity === null || (bool) $user->share_activity])
                ->values()->all();
        });
        $limited = count($directory) > 120;
        $directory = array_slice($directory, 0, 120);
        $keys = [];
        foreach ($directory as $person) {
            $keys[] = 'presence:user:'.$person['id'];
            $keys[] = 'presence:mood:'.$person['id'];
            $keys[] = 'office:menu:'.$person['id'];
            $keys[] = VirtualOfficeMeetings::key($person['id']);
            $keys[] = VirtualOfficeMeetings::lease($person['id']);
            $keys[] = 'office:recreation:'.$person['id'];
            $keys[] = VirtualOfficePilot::key($person['id']);$keys[] = VirtualOfficePilot::lease($person['id']);
        }
        $presence = $keys === [] ? [] : Cache::many($keys);
        $counts = ['online' => 0, 'idle' => 0, 'offline' => 0];
        $people = [];
        foreach ($directory as $person) {
            $entry = $presence['presence:user:'.$person['id']] ?? null;
            $online = is_array($entry) && (int) ($entry['id'] ?? 0) === (int) $person['id'];
            $state = $online ? (! empty($entry['idle']) ? 'idle' : 'online') : 'offline';
            $counts[$state]++;
            $pilot=$presence[VirtualOfficePilot::key($person['id'])]??null;
            $inOffice=$online&&is_array($pilot)&&($presence[VirtualOfficePilot::lease($person['id'])]??null)===($pilot['session_id']??'');
            $room = $presence[VirtualOfficeMeetings::key($person['id'])] ?? null;
            $partner = is_array($room) ? (($room['from'] ?? null) === (int) $person['id'] ? ($room['to'] ?? 0) : ($room['from'] ?? 0)) : 0;
            $paired = $online && is_array($room) && ($room['status'] ?? '') === 'accepted' && ($room['expires'] ?? 0) > now()->timestamp
                && ! empty($presence[VirtualOfficeMeetings::lease($person['id'])]) && ! empty($presence[VirtualOfficeMeetings::lease($partner)])
                && is_array($presence['presence:user:'.$partner] ?? null);
            $people[] = $person + [
                'state' => $state,
                'mood' => mb_substr((string) ($presence['presence:mood:'.$person['id']] ?? $entry['mood'] ?? ''), 0, 20),
                'is_me' => (int) $person['id'] === (int) $viewer->id,
                'in_office'=>$inOffice,'pilot'=>$inOffice?VirtualOfficePilot::publicState($pilot):null,
                'recreation' => $online && is_array($presence['office:recreation:'.$person['id']] ?? null)
                    ? array_intersect_key($presence['office:recreation:'.$person['id']], array_flip(['destination', 'kind', 'until'])) : null,
                'meeting_with' => $paired ? $partner : null, 'meeting_spot' => $paired ? (int) $room['spot'] : null,
                'current_menu' => $online && ($person['share_activity'] || (int) $person['id'] === (int) $viewer->id)
                    ? (VirtualOfficeActivity::MENUS[$presence['office:menu:'.$person['id']] ?? ''] ?? null) : null,
            ];
        }

        return ['people' => $people, 'counts' => $counts, 'limited' => $limited,
            'updated_at' => now()->toIso8601String(), 'refresh_seconds' => 45, 'timezone' => 'Asia/Jakarta',
            'world' => app(VirtualOfficeWorld::class)->snapshot()];
    }
}
