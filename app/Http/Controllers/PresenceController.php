<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PresenceController extends Controller
{
    private const PRESENCE_TTL = 300;
    private const REGISTRY_TTL = 3600;
    private const CACHE_PREFIX = 'presence:user:';
    private const REGISTRY_KEY = 'presence:registry';
    private const MOOD_PREFIX = 'presence:mood:';

    public function heartbeat(Request $request)
    {
        $user = Auth::user();
        $this->markLastSeen($user);

        // Ambil mood hari ini (jika ada)
        $mood = Cache::get(self::MOOD_PREFIX . $user->id);

        Cache::put(
            self::CACHE_PREFIX . $user->id,
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

        $registry = Cache::get(self::REGISTRY_KEY, []);
        $registry[] = $user->id;
        $registry = array_values(array_unique($registry));
        Cache::put(self::REGISTRY_KEY, $registry, self::REGISTRY_TTL);

        $online = [];
        foreach ($registry as $uid) {
            $data = Cache::get(self::CACHE_PREFIX . $uid);
            if ($data) {
                $data['is_me'] = ($uid === $user->id);
                $online[] = $data;
            }
        }

        usort(
            $online,
            fn($a, $b) =>
            ($b['is_me'] ?? false) <=> ($a['is_me'] ?? false)
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
        $request->validate([
            'mood' => 'required|string|max:20', // ✅ emoji bisa multi-byte
        ]);

        $user = Auth::user();
        $midnight = now()->copy()->endOfDay();
        $ttl = now()->diffInSeconds($midnight);

        Cache::put(self::MOOD_PREFIX . $user->id, $request->mood, $ttl);

        $key = self::CACHE_PREFIX . $user->id;
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
        $mood = Cache::get(self::MOOD_PREFIX . Auth::id());
        return response()->json(['mood' => $mood]);
    }

    // ── Helpers ──

    private function initials(string $name): string
    {
        $parts = explode(' ', trim($name));
        if (count($parts) >= 2) {
            return strtoupper(mb_substr($parts[0], 0, 1) . mb_substr($parts[1], 0, 1));
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

    private function markLastSeen($user): void
    {
        if (! $user || ! isset($user->id)) {
            return;
        }

        $throttleKey = 'presence:last_seen_update:' . $user->id;

        if (! Cache::add($throttleKey, true, 60)) {
            return;
        }

        if (! Schema::hasTable('users')) {
            return;
        }

        $updates = [];

        if (Schema::hasColumn('users', 'last_seen_at')) {
            $updates['last_seen_at'] = now();
        }

        if (Schema::hasColumn('users', 'last_seen_ip')) {
            $updates['last_seen_ip'] = request()->ip();
        }

        if (empty($updates)) {
            return;
        }

        DB::table('users')
            ->where('id', $user->id)
            ->update($updates);
    }
}
