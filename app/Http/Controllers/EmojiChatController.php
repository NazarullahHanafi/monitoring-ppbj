<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;

class EmojiChatController extends Controller
{
    // Batas mutlak pesan tersimpan di DB
    private const MAX_MESSAGES    = 150;
    // Batas kirim per user per jam
    private const RATE_LIMIT_HOUR = 30;
    // Emoji yang boleh dikirim (whitelist)
    private const ALLOWED_EMOJI   = [
        '😀','😂','🥰','😎','🤔','😴','😤','🥳','😭','🔥',
        '👍','👎','❤️','💪','🎉','🚀','💯','🙏','👀','✅',
        '😊','🤣','😍','🙄','😅','🤩','😬','🥺','😏','🌟',
    ];

    // ── Ambil pesan terbaru ─────────────────────────────────────────────────
    public function messages(Request $request)
    {
        $since = (int) $request->get('since', 0);

        $rows = DB::table('emoji_messages')
            ->when($since, fn($q) => $q->where('id', '>', $since))
            ->orderBy('id', 'desc')
            ->limit(50)
            ->get()
            ->reverse()
            ->values();

        return response()->json([
            'messages' => $rows,
            'max_id'   => $rows->max('id') ?? $since,
        ]);
    }

    // ── Kirim pesan ─────────────────────────────────────────────────────────
    public function send(Request $request)
    {
        $user = Auth::user();

        // Validasi emoji
        $emoji = $request->input('emoji', '');
        if (!in_array($emoji, self::ALLOWED_EMOJI, true)) {
            return response()->json(['error' => 'Emoji tidak valid'], 422);
        }

        // Rate limit per user per jam
        $rateKey = 'emoji_rate:' . $user->id . ':' . date('YmdH');
        $count   = (int) Cache::get($rateKey, 0);
        if ($count >= self::RATE_LIMIT_HOUR) {
            return response()->json(['error' => 'Terlalu banyak pesan, coba lagi nanti'], 429);
        }
        Cache::put($rateKey, $count + 1, 3600);

        // Resolve reply
        $replyTo    = null;
        $replyEmoji = null;
        $replyName  = null;
        if ($request->filled('reply_to')) {
            $parent = DB::table('emoji_messages')->find((int) $request->input('reply_to'));
            if ($parent) {
                $replyTo    = $parent->id;
                $replyEmoji = $parent->emoji;
                $replyName  = $parent->user_name;
            }
        }

        $colors   = ['#6366f1','#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444','#14b8a6','#f97316','#84cc16','#06b6d4','#a855f7'];
        $color    = $colors[$user->id % count($colors)];
        $initials = $this->initials($user->name);

        $id = DB::table('emoji_messages')->insertGetId([
            'user_id'     => $user->id,
            'user_name'   => $user->name,
            'user_initials'=> $initials,
            'user_color'  => $color,
            'emoji'       => $emoji,
            'reply_to'    => $replyTo,
            'reply_emoji' => $replyEmoji,
            'reply_name'  => $replyName,
            'created_at'  => now(),
        ]);

        // Bersihkan pesan lama — pertahankan hanya MAX_MESSAGES terakhir
        $this->pruneOldMessages();

        $msg = DB::table('emoji_messages')->find($id);
        return response()->json(['message' => $msg], 201);
    }

    // ── Set / hapus mood ─────────────────────────────────────────────────────
    public function setMood(Request $request)
    {
        $mood = $request->input('mood', '');
        if ($mood !== '' && !in_array($mood, self::ALLOWED_EMOJI, true)) {
            return response()->json(['error' => 'Mood tidak valid'], 422);
        }

        $key = 'presence:mood:' . Auth::id();
        if ($mood === '') {
            Cache::forget($key);
        } else {
            Cache::put($key, $mood, 300); // TTL sama dengan presence (5 menit)
        }

        return response()->json(['mood' => $mood ?: null]);
    }

    // ── Ambil mood semua user yang online ────────────────────────────────────
    public function moods()
    {
        $registry = Cache::get('presence:registry', []);
        $moods    = [];
        foreach ($registry as $uid) {
            $mood = Cache::get('presence:mood:' . $uid);
            if ($mood) $moods[$uid] = $mood;
        }
        return response()->json(['moods' => $moods]);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────
    private function pruneOldMessages(): void
    {
        $total = DB::table('emoji_messages')->count();
        if ($total > self::MAX_MESSAGES) {
            $deleteCount = $total - self::MAX_MESSAGES;
            $oldestIds   = DB::table('emoji_messages')
                ->orderBy('id')
                ->limit($deleteCount)
                ->pluck('id');
            DB::table('emoji_messages')->whereIn('id', $oldestIds)->delete();
        }
    }

    private function initials(string $name): string
    {
        $parts = explode(' ', trim($name));
        return count($parts) >= 2
            ? strtoupper(mb_substr($parts[0], 0, 1) . mb_substr($parts[1], 0, 1))
            : strtoupper(mb_substr($name, 0, 2));
    }
}