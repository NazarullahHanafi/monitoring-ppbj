<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\TelegramBotService;
use App\Support\CacheBatch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PresenceController extends Controller
{
    private const PRESENCE_TTL = 300;

    private const REGISTRY_TTL = 3600;

    private const ONLINE_RETURN_AFTER_SECONDS = 600;

    private const APP_ENTRY_NOTIFY_COOLDOWN_MINUTES = 15;

    private const CACHE_PREFIX = 'presence:user:';

    private const REGISTRY_KEY = 'presence:registry';

    private const MOOD_PREFIX = 'presence:mood:';

    public function heartbeat(Request $request)
    {
        $request->validate(['idle' => ['bail', 'sometimes', 'boolean'], 'menu' => ['bail', 'sometimes', 'nullable', 'string', \Illuminate\Validation\Rule::in(array_keys(\App\Services\VirtualOfficeActivity::MENUS))]]);
        $user = $request->user();
        abort_unless($user, 401);
        if ($request->filled('menu') && $user->shouldDisplayInPresence() && in_array($user->department, ['umum', 'operasional'], true)) {
            // Presence only; the daily journal records successful page responses.
            Cache::put('office:menu:'.$user->id, $request->input('menu'), self::PRESENCE_TTL);
        } elseif ($request->exists('menu')) {
            Cache::forget('office:menu:'.$user->id);
        }
        $this->markLastSeen($user);

        // Akun khusus yang mood-nya dinonaktifkan tidak boleh meninggalkan
        // emoji lama di daftar presence pengguna lain.
        $moodKey = self::MOOD_PREFIX.$user->id;
        if ($user->shouldDisplayMoodFeature()) {
            $mood = $this->safeMood(Cache::get($moodKey));
        } else {
            Cache::forget($moodKey);
            $mood = null;
        }

        $displayInPresence = $user->shouldDisplayInPresence();
        if ($displayInPresence) {
            Cache::put(
                self::CACHE_PREFIX.$user->id,
                [
                    'id' => $user->id,
                    'name' => $user->name,
                    'department' => $user->department ?? '',
                    'initials' => $this->initials($user->name),
                    'color' => $this->colorFor($user->id),
                    'mood' => $mood,
                    'idle' => $request->boolean('idle'),
                ],
                self::PRESENCE_TTL
            );
        } else {
            Cache::forget(self::CACHE_PREFIX.$user->id);
        }

        $online = [];
        // Reuse the snapshot already read while pruning the registry.
        foreach ($this->registerOnlineUser((int) $user->id, $displayInPresence) as $uid => $data) {
            $data['is_me'] = ($uid === (int) $user->id);
            $online[] = $data;
        }

        usort(
            $online,
            fn ($a, $b) => ($b['is_me'] ?? false) <=> ($a['is_me'] ?? false)
            ?: strcmp($a['name'], $b['name'])
        );

        return response()->json([
            'online' => $online,
            'count' => count($online),
        ])->header('Cache-Control', 'private, no-store');
    }

    /**
     * Simpan mood user (valid sampai tengah malam)
     */
    public function updateMood(Request $request)
    {
        $user = Auth::user();

        if (! $user->shouldDisplayMoodFeature()) {
            $this->clearMoodFor($user);

            return response()->json([
                'success' => true,
                'mood' => null,
                'disabled' => true,
            ])->header('Cache-Control', 'private, no-store');
        }

        $request->validate([
            'mood' => ['bail', 'required', 'string', 'max:20', 'regex:/\A[^<>\x00-\x1F\x7F]*\z/u'],
        ]);

        $midnight = now()->copy()->endOfDay();
        $ttl = now()->diffInSeconds($midnight);

        Cache::put(self::MOOD_PREFIX.$user->id, $request->mood, $ttl);

        $key = self::CACHE_PREFIX.$user->id;
        $data = Cache::get($key);
        // Changing mood alone must not invent an online user after expiry.
        if ($this->validPresence($data, (int) $user->id)) {
            $data['mood'] = $request->mood;
            Cache::put($key, $data, self::PRESENCE_TTL);
        } elseif ($data !== null) {
            Cache::forget($key);
        }

        return response()->json([
            'success' => true,
            'mood' => $request->mood,
        ])->header('Cache-Control', 'private, no-store');
    }

    /**
     * Cek mood user hari ini
     */
    public function getMood()
    {
        $user = Auth::user();

        if (! $user->shouldDisplayMoodFeature()) {
            $this->clearMoodFor($user);

            // 204 juga menghentikan app-shell versi lama agar tidak membuka
            // popup wajib mood dari respons kosong.
            return response()->noContent()->header('Cache-Control', 'private, no-store');
        }

        $mood = $this->safeMood(Cache::get(self::MOOD_PREFIX.$user->id));

        return response()->json(['mood' => $mood])->header('Cache-Control', 'private, no-store');
    }

    // ── Helpers ──

    private function initials(string $name): string
    {
        $parts = explode(' ', trim($name));
        if (count($parts) >= 2) {
            return strtoupper(mb_substr($parts[0], 0, 1).mb_substr($parts[1], 0, 1));
        }

        return strtoupper(mb_substr($name, 0, 2));
    }

    private function colorFor(int $id): string
    {
        $colors = [
            '#6366f1',
            '#8b5cf6',
            '#ec4899',
            '#f59e0b',
            '#10b981',
            '#3b82f6',
            '#ef4444',
            '#14b8a6',
            '#f97316',
            '#84cc16',
            '#06b6d4',
            '#a855f7',
        ];

        return $colors[$id % count($colors)];
    }

    private function clearMoodFor(User $user): void
    {
        Cache::forget(self::MOOD_PREFIX.$user->id);

        $presenceKey = self::CACHE_PREFIX.$user->id;
        $presence = Cache::get($presenceKey);
        if (is_array($presence)) {
            $presence['mood'] = null;
            Cache::put($presenceKey, $presence, self::PRESENCE_TTL);
        }
    }

    /**
     * Perbarui registry secara atomik agar heartbeat serentak tidak saling
     * menimpa daftar user online. ID kedaluwarsa ikut dibersihkan supaya
     * ukuran registry tetap kecil meskipun aplikasi dipakai banyak user.
     *
     * @return array<int, array>
     */
    private function registerOnlineUser(int $userId, bool $shouldRegister = true): array
    {
        $lock = null;
        $acquired = false;
        try {
            $lock = Cache::lock(self::REGISTRY_KEY.':lock', 5);
            $acquired = $lock->get();
            $snapshot = $this->onlineSnapshot($userId, $shouldRegister);
            if ($acquired) {
                Cache::put(self::REGISTRY_KEY, array_keys($snapshot), self::REGISTRY_TTL);
            }

            return $snapshot;
        } catch (\Throwable) {
            return $this->onlineSnapshot($userId, $shouldRegister);
        } finally {
            if ($acquired) {
                try {
                    $lock->release();
                } catch (\Throwable) {
                    // The short lease expires even if releasing it fails.
                }
            }
        }
    }

    /**
     * Bersihkan registry dengan satu operasi cache massal. Cara ini menjaga
     * heartbeat tetap ringan ketika banyak pengguna aktif bersamaan.
     *
     * A busy registry lock never delays the heartbeat. Its local snapshot can
     * include this user without overwriting another worker's registry update.
     *
     * @return array<int, array>
     */
    private function onlineSnapshot(int $userId, bool $shouldRegister): array
    {
        $registry = Cache::get(self::REGISTRY_KEY, []);
        $ids = [];
        foreach (is_array($registry) ? $registry : [] as $value) {
            if ((! is_int($value) && ! is_string($value)) || filter_var($value, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]) === false) {
                continue;
            }
            $id = (int) $value;
            if ($id !== $userId) {
                $ids[$id] = $id;
            }
        }
        if ($shouldRegister) {
            $ids[$userId] = $userId;
        }
        if ($ids === []) {
            return [];
        }

        $keys = array_map(fn (int $id) => self::CACHE_PREFIX.$id, array_values($ids));
        $presence = Cache::many($keys);
        $snapshot = [];
        foreach ($ids as $id) {
            $row = $presence[self::CACHE_PREFIX.$id] ?? null;
            if (! $this->validPresence($row, $id)) {
                continue;
            }
            $snapshot[$id] = [
                'id' => $id, 'name' => $row['name'], 'department' => $row['department'],
                'initials' => is_string($row['initials'] ?? null) && mb_check_encoding($row['initials'], 'UTF-8') && mb_strlen($row['initials']) <= 8 ? $row['initials'] : $this->initials($row['name']),
                'color' => is_string($row['color'] ?? null) && preg_match('/^#[a-f0-9]{6}$/i', $row['color']) ? $row['color'] : $this->colorFor($id),
                'mood' => $this->safeMood($row['mood'] ?? null), 'idle' => ($row['idle'] ?? false) === true,
            ];
        }

        return $snapshot;
    }

    private function validPresence(mixed $row, int $id): bool
    {
        return is_array($row) && ($row['id'] ?? null) === $id
            && is_string($row['name'] ?? null) && mb_check_encoding($row['name'], 'UTF-8') && trim($row['name']) !== '' && mb_strlen($row['name']) <= 255
            && is_string($row['department'] ?? null) && mb_check_encoding($row['department'], 'UTF-8') && mb_strlen($row['department']) <= 80;
    }

    private function safeMood(mixed $mood): ?string
    {
        return is_string($mood) && mb_check_encoding($mood, 'UTF-8') && $mood !== '' && mb_strlen($mood) <= 20 && ! preg_match('/[<>\x00-\x1F\x7F]/u', $mood) ? $mood : null;
    }

    private function markLastSeen($user): void
    {
        if (! $user || ! isset($user->id)) {
            return;
        }

        $throttleKey = 'presence:last_seen_update:'.$user->id;

        if (! Cache::add($throttleKey, true, 60)) {
            return;
        }

        $schema = CacheBatch::remember([
            'schema:users:table' => fn () => Schema::hasTable('users'),
            'schema:users:last_seen_at' => fn () => Schema::hasTable('users') && Schema::hasColumn('users', 'last_seen_at'),
            'schema:users:last_seen_ip' => fn () => Schema::hasTable('users') && Schema::hasColumn('users', 'last_seen_ip'),
        ], 3600);

        if (! $schema['schema:users:table']) {
            return;
        }

        $previousLastSeen = null;
        $shouldNotifyOnlineReturn = false;
        $shouldNotifyAppEntry = false;

        if ($schema['schema:users:last_seen_at']) {
            $previousLastSeen = DB::table('users')
                ->where('id', $user->id)
                ->value('last_seen_at');

            $shouldNotifyOnlineReturn = $this->shouldNotifyOnlineReturn($user, $previousLastSeen);
        }

        if (! $shouldNotifyOnlineReturn) {
            $shouldNotifyAppEntry = $this->shouldNotifyAppEntry($user);
        }

        $updates = [];

        if ($schema['schema:users:last_seen_at']) {
            $updates['last_seen_at'] = now();
        }

        if ($schema['schema:users:last_seen_ip']) {
            $updates['last_seen_ip'] = request()->ip();
        }

        if (empty($updates)) {
            return;
        }

        DB::table('users')
            ->where('id', $user->id)
            ->update($updates);

        if ($shouldNotifyOnlineReturn) {
            $this->notifyTelegramOnlineReturn($user, request()->ip(), $previousLastSeen);
        }

        if ($shouldNotifyAppEntry) {
            $this->notifyTelegramAppEntry($user, request()->ip());
        }
    }

    private function shouldNotifyAppEntry($user): bool
    {
        if (! $user || ! isset($user->id)) {
            return false;
        }

        if (Cache::has('telegram:recent_login:'.$user->id)) {
            return false;
        }

        return Cache::add(
            'telegram:app_entry:'.$user->id,
            true,
            now()->addMinutes(self::APP_ENTRY_NOTIFY_COOLDOWN_MINUTES)
        );
    }

    private function shouldNotifyOnlineReturn($user, mixed $previousLastSeen): bool
    {
        if (! $user || ! isset($user->id)) {
            return false;
        }

        $cacheKey = 'telegram:online_return:'.$user->id;

        if (Cache::has($cacheKey)) {
            return false;
        }

        if (! $previousLastSeen) {
            return Cache::add($cacheKey, true, now()->addMinutes(30));
        }

        try {
            $lastSeen = \Illuminate\Support\Carbon::parse($previousLastSeen);
        } catch (\Throwable) {
            return Cache::add($cacheKey, true, now()->addMinutes(30));
        }

        if ($lastSeen->diffInSeconds(now()) < self::ONLINE_RETURN_AFTER_SECONDS) {
            return false;
        }

        return Cache::add($cacheKey, true, now()->addMinutes(30));
    }

    private function notifyTelegramOnlineReturn($user, ?string $ip, mixed $previousLastSeen): void
    {
        if (! $user) {
            return;
        }

        $freshUser = $user instanceof User
            ? $user
            : User::query()->find($user->id);

        if (! $freshUser) {
            return;
        }

        app()->terminating(function () use ($freshUser, $ip, $previousLastSeen) {
            app(TelegramBotService::class)->notifyUserOnlineReturn($freshUser, $ip, $previousLastSeen);
        });
    }

    private function notifyTelegramAppEntry($user, ?string $ip): void
    {
        if (! $user) {
            return;
        }

        $freshUser = $user instanceof User
            ? $user
            : User::query()->find($user->id);

        if (! $freshUser) {
            return;
        }

        app()->terminating(function () use ($freshUser, $ip) {
            app(TelegramBotService::class)->notifyUserAppEntry($freshUser, $ip);
        });
    }
}
