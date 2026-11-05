<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VirtualOfficeMeetings
{
    public static function key(int $id): string { return 'office:meeting:'.$id; }
    public static function lease(int $id): string { return 'office:meeting:lease:'.$id; }

    public static function eligible(User $user): bool
    {
        return $user->is_active && ! $user->isReadOnly() && $user->shouldDisplayInPresence()
            && in_array($user->department, ['umum', 'operasional'], true);
    }

    public function online(int $id): bool
    {
        $entry = Cache::get('presence:user:'.$id);
        return is_array($entry) && (int) ($entry['id'] ?? 0) === $id;
    }

    public function current(int $id): ?array
    {
        $room = Cache::get(self::key($id));
        if (! is_array($room) || ! in_array($id, [$room['from'] ?? 0, $room['to'] ?? 0], true) || ($room['expires'] ?? 0) <= now()->timestamp) return null;
        $other = Cache::get(self::key($room['from'] === $id ? $room['to'] : $room['from']));
        return is_array($other) && ($other['id'] ?? null) === $room['id'] ? $room : null;
    }

    private function store(array $room): void
    {
        $ttl = max(1, $room['expires'] - now()->timestamp);
        Cache::put(self::key($room['from']), $room, $ttl);
        Cache::put(self::key($room['to']), $room, $ttl);
    }

    public function invite(User $user, User $target): array
    {
        abort_unless(self::eligible($user) && self::eligible($target), 403, 'Akun ini tidak tersedia untuk pertemuan.');
        abort_if($user->id === $target->id, 422, 'Pilih rekan lain.');
        abort_unless($this->online($user->id) && $this->online($target->id), 409, 'Kedua peserta harus online. Tunggu pembaruan kehadiran.');
        return Cache::lock('office:meeting:mutex', 5)->block(2, function () use ($user, $target) {
            abort_if($this->current($user->id) || $this->current($target->id), 409, 'Salah satu peserta sedang memiliki undangan atau pertemuan.');
            $room = ['id' => (string) Str::uuid(), 'from' => (int) $user->id, 'to' => (int) $target->id,
                'from_name' => $user->name, 'to_name' => $target->name, 'status' => 'pending', 'expires' => now()->addMinutes(3)->timestamp];
            $this->store($room);
            return $room;
        });
    }

    public function respond(User $user, string $id, string $action): ?array
    {
        abort_unless(self::eligible($user), 403);
        return Cache::lock('office:meeting:mutex', 5)->block(2, function () use ($user, $id, $action) {
            $room = $this->current($user->id);
            abort_unless($room && hash_equals($room['id'], $id), 404);
            if ($action === 'end' || $action === 'decline') {
                if ($action === 'decline') abort_unless($room['to'] === (int) $user->id && $room['status'] === 'pending', 403);
                Cache::forget(self::key($room['from'])); Cache::forget(self::key($room['to']));
                if (isset($room['spot'])) Cache::forget('office:meeting:spot:'.$room['spot']);
                return null;
            }
            abort_unless($room['to'] === (int) $user->id && $room['status'] === 'pending', 403);
            $other = User::findOrFail($room['from']);
            abort_unless(self::eligible($other) && $this->online($other->id) && $this->online($user->id), 409, 'Peserta sudah tidak tersedia.');
            $spot = null;
            foreach (range(0, 11) as $candidate) if (! Cache::has('office:meeting:spot:'.$candidate)) { $spot = $candidate; break; }
            abort_if($spot === null, 409, 'Area percakapan penuh. Coba lagi nanti.');
            $room = $room + ['spot' => $spot, 'started_at' => now()->toDateTimeString()];
            $room['status'] = 'accepted'; $room['expires'] = now()->addMinutes(30)->timestamp;
            Cache::put('office:meeting:spot:'.$spot, $room['id'], 1800);
            $this->store($room);
            return $room;
        });
    }

    public function connected(array $room): bool
    {
        return $room['status'] === 'accepted' && $this->online($room['from']) && $this->online($room['to'])
            && Cache::has(self::lease($room['from'])) && Cache::has(self::lease($room['to']));
    }

    public function messages(array $room, User $viewer): array
    {
        $other = $room['from'] === (int) $viewer->id ? $room['to'] : $room['from'];
        // These are public Chat Tim mentions, not a new private message store.
        return DB::table('chat_messages')->whereIn('user_id', [$viewer->id, $other])->where('created_at', '>=', $room['started_at'])
            ->whereNull('share_type')->whereNotExists(function ($q) use ($viewer) {
                $q->selectRaw('1')->from('chat_message_deletions')->whereColumn('chat_message_deletions.message_id', 'chat_messages.id')->where('chat_message_deletions.user_id', $viewer->id);
            })->orderByDesc('id')->limit(60)->get(['id', 'user_id', 'message', 'mentions', 'created_at'])
            ->filter(function ($message) use ($viewer, $other) {
                $target = (int) $message->user_id === (int) $viewer->id ? $other : (int) $viewer->id;
                return collect(json_decode($message->mentions ?: '[]', true))->contains(fn ($mention) => (int) ($mention['id'] ?? 0) === $target);
            })->take(30)->reverse()->values()->map(fn ($message) => ['id' => (int) $message->id, 'user_id' => (int) $message->user_id,
                'message' => $message->message, 'at' => $message->created_at])->all();
    }
}
