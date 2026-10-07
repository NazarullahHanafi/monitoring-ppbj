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
        $user = Auth::user();
        $this->markLastSeen($user);

        // Akun khusus yang mood-nya dinonaktifkan tidak boleh meninggalkan
        // emoji lama di daftar presence pengguna lain.
        $moodKey = self::MOOD_PREFIX.$user->id;
        if ($user->shouldDisplayMoodFeature()) {
            $mood = Cache::get($moodKey);
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
                ],
                self::PRESENCE_TTL
            );
        } else {
            Cache::forget(self::CACHE_PREFIX.$user->id);
        }

        $registry = $this->registerOnlineUser((int) $user->id, $displayInPresence);

        $presenceKeys = array_map(
            fn (int $uid) => self::CACHE_PREFIX.$uid,
            $registry
        );
        $presenceByKey = $presenceKeys === [] ? [] : Cache::many($presenceKeys);

        $online = [];
        foreach ($registry as $uid) {
            $data = $presenceByKey[self::CACHE_PREFIX.$uid] ?? null;
            if ($data) {
                $data['is_me'] = ($uid === $user->id);
                $online[] = $data;
            }
        }

        usort(
            $online,
            fn ($a, $b) => ($b['is_me'] ?? false) <=> ($a['is_me'] ?? false)
            ?: strcmp($a['name'], $b['name'])
        );

        return response()->json([
            'online' => $online,
            'count' => count($online),
        ]);
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
            ]);
        }

        $request->validate([
            'mood' => 'required|string|max:20', // ✅ emoji bisa multi-byte
        ]);

        $midnight = now()->copy()->endOfDay();
        $ttl = now()->diffInSeconds($midnight);

        Cache::put(self::MOOD_PREFIX.$user->id, $request->mood, $ttl);

        $key = self::CACHE_PREFIX.$user->id;
        $data = Cache::get($key, []);
        $data['mood'] = $request->mood;
        Cache::put($key, $data, self::PRESENCE_TTL);

        return response()->json([
            'success' => true,
            'mood' => $request->mood,
        ]);
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
            return response()->noContent();
        }

        $mood = Cache::get(self::MOOD_PREFIX.$user->id);

        return response()->json(['mood' => $mood]);
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
     * @return array<int, int>
     */
    private function registerOnlineUser(int $userId, bool $shouldRegister = true): array
    {
        try {
            return Cache::lock(self::REGISTRY_KEY.':lock', 5)->block(2, function () use ($userId, $shouldRegister) {
                $registry = array_map('intval', (array) Cache::get(self::REGISTRY_KEY, []));
                if ($shouldRegister) {
                    $registry[] = $userId;
                } else {
                    $registry = array_filter($registry, fn (int $id) => $id !== $userId);
                }

                $registry = $this->onlyActivePresenceIds(array_values(array_unique($registry)));

                Cache::put(self::REGISTRY_KEY, $registry, self::REGISTRY_TTL);

                return $registry;
            });
        } catch (\Throwable) {
            // Heartbeat tidak boleh gagal hanya karena lock registry sedang sibuk.
            $registry = array_map('intval', (array) Cache::get(self::REGISTRY_KEY, []));
            if ($shouldRegister) {
                $registry[] = $userId;
            } else {
                $registry = array_filter($registry, fn (int $id) => $id !== $userId);
            }

            return $this->onlyActivePresenceIds(array_values(array_unique($registry)));
        }
    }

    /**
     * Bersihkan registry dengan satu operasi cache massal. Cara ini menjaga
     * heartbeat tetap ringan ketika banyak pengguna aktif bersamaan.
     *
     * @param  array<int, int>  $registry
     * @return array<int, int>
     */
    private function onlyActivePresenceIds(array $registry): array
    {
        if ($registry === []) {
            return [];
        }

        $keys = array_map(fn (int $id) => self::CACHE_PREFIX.$id, $registry);
        $presence = Cache::many($keys);

        return array_values(array_filter(
            $registry,
            fn (int $id) => ! empty($presence[self::CACHE_PREFIX.$id])
        ));
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
