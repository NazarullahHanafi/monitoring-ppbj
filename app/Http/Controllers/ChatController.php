<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    private const MAX_MESSAGES = 200;

    private const MAX_MSG_LENGTH = 500;

    private const RATE_LIMIT_MIN = 20;

    private function colors(): array
    {
        return ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6', '#f97316', '#84cc16', '#06b6d4', '#a855f7'];
    }

    private function initials(string $name): string
    {
        $p = explode(' ', trim($name));

        return count($p) >= 2
            ? strtoupper(mb_substr($p[0], 0, 1).mb_substr($p[1], 0, 1))
            : strtoupper(mb_substr($name, 0, 2));
    }

    /**
     * GET pesan — dioptimasi, tidak join chat_reads
     */
    public function messages(Request $request)
    {
        $since = (int) $request->get('since', 0);
        $myId = Auth::id();

        $rows = DB::table('chat_messages')
            ->when($since, fn ($q) => $q->where('id', '>', $since))
            ->orderBy('id', 'desc')
            ->limit(40)
            ->get()
            ->reverse()
            ->values();

        if ($rows->isEmpty()) {
            return response()->json(['messages' => [], 'max_id' => $since]);
        }

        $msgIds = $rows->pluck('id')->toArray();

        // Batch read count — user LAIN
        $readCounts = DB::table('chat_reads')
            ->whereIn('message_id', $msgIds)
            ->where('user_id', '!=', $myId)
            ->select('message_id', DB::raw('COUNT(*) as cnt'))
            ->groupBy('message_id')
            ->pluck('cnt', 'message_id')
            ->toArray();

        // ✅ TAMBAH INI: Cek pesan mana yang sudah saya baca
        $myReads = DB::table('chat_reads')
            ->whereIn('message_id', $msgIds)
            ->where('user_id', $myId)
            ->pluck('message_id')
            ->flip() // key = message_id, value = true
            ->toArray();

        foreach ($rows as $row) {
            $row->read_count = $readCounts[$row->id] ?? 0;
            $row->i_read = isset($myReads[$row->id]); // ✅ TAMBAH INI
            $row->mentions_parsed = [];
            if ($row->mentions) {
                $decoded = json_decode($row->mentions, true);
                if (is_array($decoded)) {
                    $row->mentions_parsed = $decoded;
                }
            }
        }

        return response()->json([
            'messages' => $rows,
            'max_id' => $rows->max('id') ?? $since,
        ]);
    }

    /**
     * Ambil semua user (untuk dropdown @ mention)
     */
    public function getUsers()
    {
        $users = DB::table('users')
            ->select('id', 'name', 'department')
            ->where('id', '!=', Auth::id())
            ->orderBy('name')
            ->get()
            ->map(function ($u) {
                $colors = $this->colors();
                $p = explode(' ', trim($u->name));

                return [
                    'id' => $u->id,
                    'name' => $u->name,
                    'department' => $u->department ?? '',
                    'initials' => count($p) >= 2
                        ? strtoupper(mb_substr($p[0], 0, 1).mb_substr($p[1], 0, 1))
                        : strtoupper(mb_substr($u->name, 0, 2)),
                    'color' => $colors[$u->id % count($colors)],
                ];
            });

        return response()->json($users);
    }

    /**
     * Jumlah mention yang belum dibaca untuk badge ikon chat.
     */
    public function unreadMentions()
    {
        $userId = Auth::id();

        $messages = DB::table('chat_messages')
            ->where('user_id', '!=', $userId)
            ->whereNotNull('mentions')
            ->whereNotExists(function ($query) use ($userId) {
                $query->selectRaw('1')
                    ->from('chat_reads')
                    ->whereColumn('chat_reads.message_id', 'chat_messages.id')
                    ->where('chat_reads.user_id', $userId);
            })
            ->orderByDesc('id')
            ->limit(self::MAX_MESSAGES)
            ->get(['id', 'mentions']);

        $count = $messages->filter(function ($message) use ($userId) {
            $mentions = json_decode($message->mentions, true);

            if (! is_array($mentions)) {
                return false;
            }

            foreach ($mentions as $mention) {
                $mentionedId = $mention['id'] ?? null;

                if ($mentionedId === 'all' || (string) $mentionedId === (string) $userId) {
                    return true;
                }
            }

            return false;
        })->count();

        return response()->json(['count' => $count]);
    }

    /**
     * KIRIM pesan
     */
    public function send(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:'.self::MAX_MSG_LENGTH,
            'reply_to' => 'nullable|integer',
            'mentions' => 'nullable|array',
            'mentions.*.id' => 'required',
            'mentions.*.name' => 'required|string',
        ]);

        $user = Auth::user();

        $key = 'chat_rate:'.$user->id.':'.date('YmdHi');
        $count = (int) Cache::get($key, 0);
        if ($count >= self::RATE_LIMIT_MIN) {
            return response()->json(['error' => 'Terlalu banyak pesan.'], 429);
        }
        Cache::put($key, $count + 1, 60);

        $colors = $this->colors();
        $color = $colors[$user->id % count($colors)];

        $replyTo = $replyPreview = $replyUser = null;
        if ($request->filled('reply_to')) {
            $parent = DB::table('chat_messages')->find((int) $request->reply_to);
            if ($parent) {
                $replyTo = $parent->id;
                $replyPreview = mb_substr($parent->message, 0, 80);
                $replyUser = $parent->user_name;
            }
        }

        $mentionsRaw = $request->input('mentions', []);
        $mentionsJson = null;
        if (is_array($mentionsRaw) && count($mentionsRaw)) {
            $unique = [];
            foreach ($mentionsRaw as $m) {
                $unique[$m['id']] = ['id' => $m['id'], 'name' => $m['name']];
            }
            $mentionsJson = json_encode(array_values($unique));
        }

        $id = DB::table('chat_messages')->insertGetId([
            'user_id' => $user->id,
            'user_name' => $user->name,
            'user_initials' => $this->initials($user->name),
            'user_color' => $color,
            'message' => trim($request->message),
            'reply_to' => $replyTo,
            'reply_preview' => $replyPreview,
            'reply_user' => $replyUser,
            'mentions' => $mentionsJson,
            'created_at' => now(),
        ]);

        $total = DB::table('chat_messages')->count();
        if ($total > self::MAX_MESSAGES) {
            $del = DB::table('chat_messages')->orderBy('id')->limit($total - self::MAX_MESSAGES)->pluck('id');
            DB::table('chat_messages')->whereIn('id', $del)->delete();
            DB::table('chat_reads')->whereIn('message_id', $del)->delete();
        }

        return response()->json(['message' => DB::table('chat_messages')->find($id)], 201);
    }

    /**
     * Hapus pesan sendiri
     */
    public function destroy(int $id)
    {
        $msg = DB::table('chat_messages')->find($id);
        if (! $msg || $msg->user_id !== Auth::id()) {
            return response()->json(['error' => 'Tidak bisa menghapus'], 403);
        }
        DB::table('chat_messages')->delete($id);
        DB::table('chat_reads')->where('message_id', $id)->delete();

        return response()->json(['deleted' => $id]);
    }

    /**
     * Tandai pesan sebagai sudah dibaca — bulk
     */
    public function markRead(Request $request)
    {
        $request->validate([
            'message_ids' => 'required|array',
            'message_ids.*' => 'required|integer',
        ]);

        $userId = Auth::id();
        $ids = array_map('intval', $request->input('message_ids', []));
        $marked = 0;

        foreach ($ids as $msgId) {
            $exists = DB::table('chat_reads')
                ->where('message_id', $msgId)
                ->where('user_id', $userId)
                ->exists();

            if (! $exists) {
                DB::table('chat_reads')->insert([
                    'message_id' => $msgId,
                    'user_id' => $userId,
                    'read_at' => now(),
                ]);
                $marked++;
            }
        }

        return response()->json(['marked' => $marked]);
    }

    /**
     * Siapa saja yang baca pesan tertentu — exclude sender
     */
    public function getReads(int $id)
    {
        $msg = DB::table('chat_messages')->find($id);
        if (! $msg) {
            return response()->json(['error' => 'Pesan tidak ditemukan'], 404);
        }

        $reads = DB::table('chat_reads')
            ->leftJoin('users', 'chat_reads.user_id', '=', 'users.id')
            ->where('chat_reads.message_id', $id)
            ->where('chat_reads.user_id', '!=', $msg->user_id)
            ->select('chat_reads.user_id', 'chat_reads.read_at', 'users.name as user_name')
            ->orderBy('chat_reads.read_at', 'asc')
            ->get();

        return response()->json([
            'message_id' => $id,
            'readers' => $reads,
        ]);
    }
}
