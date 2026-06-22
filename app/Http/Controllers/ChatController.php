<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ChatController extends Controller
{
    private const MAX_MESSAGES = 200;

    private const MAX_MSG_LENGTH = 500;

    private const RATE_LIMIT_MIN = 20;

    private const SEARCH_LIMIT = 30;

    private const REACTION_EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

    private function colors(): array
    {
        return ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6', '#f97316', '#84cc16', '#06b6d4', '#a855f7'];
    }

    private function initials(string $name): string
    {
        $parts = explode(' ', trim($name));

        return count($parts) >= 2
            ? strtoupper(mb_substr($parts[0], 0, 1).mb_substr($parts[1], 0, 1))
            : strtoupper(mb_substr($name, 0, 2));
    }

    /**
     * Ambil 40 pesan terakhir atau pesan baru setelah ID tertentu.
     */
    public function messages(Request $request)
    {
        $since = (int) $request->get('since', 0);
        $myId = Auth::id();

        $rows = DB::table('chat_messages')
            ->when($since, fn ($query) => $query->where('id', '>', $since))
            ->orderByDesc('id')
            ->limit(40)
            ->get()
            ->reverse()
            ->values();

        if ($rows->isEmpty()) {
            return response()->json(['messages' => [], 'max_id' => $since]);
        }

        $this->enrichMessages($rows, $myId);

        return response()->json([
            'messages' => $rows,
            'max_id' => $rows->max('id') ?? $since,
        ]);
    }

    /**
     * Ambil semua user untuk dropdown mention.
     */
    public function getUsers()
    {
        $users = DB::table('users')
            ->select('id', 'name', 'department')
            ->where('id', '!=', Auth::id())
            ->orderBy('name')
            ->get()
            ->map(function ($user) {
                $colors = $this->colors();

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'department' => $user->department ?? '',
                    'initials' => $this->initials($user->name),
                    'color' => $colors[$user->id % count($colors)],
                ];
            });

        return response()->json($users);
    }

    /**
     * Ringkasan pesan belum dibaca untuk badge dan notifikasi.
     */
    public function unreadMentions()
    {
        $userId = Auth::id();

        $messages = DB::table('chat_messages')
            ->where('user_id', '!=', $userId)
            ->whereNotExists(function ($query) use ($userId) {
                $query->selectRaw('1')
                    ->from('chat_reads')
                    ->whereColumn('chat_reads.message_id', 'chat_messages.id')
                    ->where('chat_reads.user_id', $userId);
            })
            ->orderByDesc('id')
            ->limit(self::MAX_MESSAGES)
            ->get(['id', 'user_id', 'user_name', 'message', 'mentions', 'created_at']);

        $mentionCount = $messages->filter(function ($message) use ($userId) {
            foreach ($this->parseMentions($message->mentions) as $mention) {
                $mentionedId = $mention['id'] ?? null;

                if ($mentionedId === 'all' || (string) $mentionedId === (string) $userId) {
                    return true;
                }
            }

            return false;
        })->count();

        $latestMessage = $messages->first();

        if ($latestMessage) {
            $latestMessage->mentions_parsed = $this->parseMentions($latestMessage->mentions);
            unset($latestMessage->mentions);
        }

        return response()->json([
            'count' => $mentionCount,
            'unread_count' => $messages->count(),
            'latest_message' => $latestMessage,
        ]);
    }

    /**
     * Cari pesan berdasarkan isi atau nama pengirim.
     */
    public function search(Request $request)
    {
        $validated = $request->validate([
            'q' => 'required|string|min:2|max:100',
        ]);

        $term = trim($validated['q']);
        $like = '%'.$term.'%';

        $rows = DB::table('chat_messages')
            ->where(function ($query) use ($like) {
                $query->where('message', 'like', $like)
                    ->orWhere('user_name', 'like', $like);
            })
            ->orderByDesc('id')
            ->limit(self::SEARCH_LIMIT)
            ->get();

        $this->enrichMessages($rows, Auth::id());

        return response()->json([
            'messages' => $rows,
            'count' => $rows->count(),
        ]);
    }

    /**
     * Ringkasan reaksi untuk pesan-pesan yang sedang terlihat.
     */
    public function reactions(Request $request)
    {
        $ids = collect(explode(',', (string) $request->query('message_ids', '')))
            ->map(fn ($id) => (int) trim($id))
            ->filter(fn ($id) => $id > 0)
            ->unique()
            ->take(40)
            ->values()
            ->all();

        return response()->json([
            'reactions' => $this->reactionMap($ids, Auth::id()),
        ]);
    }

    /**
     * Tambah, ganti, atau hapus reaksi milik pengguna.
     */
    public function react(Request $request, int $id)
    {
        $validated = $request->validate([
            'emoji' => ['required', 'string', Rule::in(self::REACTION_EMOJIS)],
        ]);

        if (! DB::table('chat_messages')->where('id', $id)->exists()) {
            return response()->json(['error' => 'Pesan tidak ditemukan'], 404);
        }

        $userId = Auth::id();
        $existing = DB::table('chat_reactions')
            ->where('message_id', $id)
            ->where('user_id', $userId)
            ->first();

        if ($existing && $existing->emoji === $validated['emoji']) {
            DB::table('chat_reactions')->where('id', $existing->id)->delete();
            $status = 'removed';
        } else {
            DB::table('chat_reactions')->updateOrInsert(
                ['message_id' => $id, 'user_id' => $userId],
                [
                    'emoji' => $validated['emoji'],
                    'created_at' => $existing?->created_at ?? now(),
                    'updated_at' => now(),
                ]
            );
            $status = $existing ? 'changed' : 'added';
        }

        return response()->json([
            'message_id' => $id,
            'status' => $status,
            'reactions' => $this->reactionMap([$id], $userId)[$id] ?? [],
        ]);
    }

    /**
     * Kirim pesan.
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

            foreach ($mentionsRaw as $mention) {
                $unique[$mention['id']] = ['id' => $mention['id'], 'name' => $mention['name']];
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
            $oldestIds = DB::table('chat_messages')
                ->orderBy('id')
                ->limit($total - self::MAX_MESSAGES)
                ->pluck('id');
            DB::table('chat_reactions')->whereIn('message_id', $oldestIds)->delete();
            DB::table('chat_reads')->whereIn('message_id', $oldestIds)->delete();
            DB::table('chat_messages')->whereIn('id', $oldestIds)->delete();
        }

        $messages = collect([DB::table('chat_messages')->find($id)]);
        $this->enrichMessages($messages, $user->id);

        return response()->json(['message' => $messages->first()], 201);
    }

    /**
     * Hapus pesan sendiri.
     */
    public function destroy(int $id)
    {
        $message = DB::table('chat_messages')->find($id);

        if (! $message || $message->user_id !== Auth::id()) {
            return response()->json(['error' => 'Tidak bisa menghapus'], 403);
        }

        DB::table('chat_reactions')->where('message_id', $id)->delete();
        DB::table('chat_reads')->where('message_id', $id)->delete();
        DB::table('chat_messages')->delete($id);

        return response()->json(['deleted' => $id]);
    }

    /**
     * Tandai pesan sebagai sudah dibaca secara bulk.
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
     * Daftar pengguna yang membaca pesan tertentu, selain pengirim.
     */
    public function getReads(int $id)
    {
        $message = DB::table('chat_messages')->find($id);

        if (! $message) {
            return response()->json(['error' => 'Pesan tidak ditemukan'], 404);
        }

        $reads = DB::table('chat_reads')
            ->leftJoin('users', 'chat_reads.user_id', '=', 'users.id')
            ->where('chat_reads.message_id', $id)
            ->where('chat_reads.user_id', '!=', $message->user_id)
            ->select('chat_reads.user_id', 'chat_reads.read_at', 'users.name as user_name')
            ->orderBy('chat_reads.read_at')
            ->get();

        return response()->json([
            'message_id' => $id,
            'readers' => $reads,
        ]);
    }

    private function enrichMessages(Collection $rows, int $myId): void
    {
        if ($rows->isEmpty()) {
            return;
        }

        $messageIds = $rows->pluck('id')->map(fn ($id) => (int) $id)->all();
        $readCounts = DB::table('chat_reads')
            ->whereIn('message_id', $messageIds)
            ->where('user_id', '!=', $myId)
            ->select('message_id', DB::raw('COUNT(*) as cnt'))
            ->groupBy('message_id')
            ->pluck('cnt', 'message_id')
            ->toArray();
        $myReads = DB::table('chat_reads')
            ->whereIn('message_id', $messageIds)
            ->where('user_id', $myId)
            ->pluck('message_id')
            ->flip()
            ->toArray();
        $reactions = $this->reactionMap($messageIds, $myId);

        foreach ($rows as $row) {
            $row->read_count = $readCounts[$row->id] ?? 0;
            $row->i_read = isset($myReads[$row->id]);
            $row->mentions_parsed = $this->parseMentions($row->mentions ?? null);
            $row->reactions = $reactions[$row->id] ?? [];
        }
    }

    private function parseMentions(?string $mentions): array
    {
        if (! $mentions) {
            return [];
        }

        $decoded = json_decode($mentions, true);

        return is_array($decoded) ? $decoded : [];
    }

    private function reactionMap(array $messageIds, int $myId): array
    {
        if ($messageIds === []) {
            return [];
        }

        $rows = DB::table('chat_reactions')
            ->leftJoin('users', 'chat_reactions.user_id', '=', 'users.id')
            ->whereIn('chat_reactions.message_id', $messageIds)
            ->orderBy('chat_reactions.id')
            ->get([
                'chat_reactions.message_id',
                'chat_reactions.user_id',
                'chat_reactions.emoji',
                'users.name as user_name',
            ]);

        $map = [];

        foreach ($rows as $row) {
            $messageId = (int) $row->message_id;
            $emoji = $row->emoji;

            if (! isset($map[$messageId][$emoji])) {
                $map[$messageId][$emoji] = [
                    'emoji' => $emoji,
                    'count' => 0,
                    'mine' => false,
                    'users' => [],
                ];
            }

            $map[$messageId][$emoji]['count']++;
            $map[$messageId][$emoji]['mine'] = $map[$messageId][$emoji]['mine'] || (int) $row->user_id === $myId;
            $map[$messageId][$emoji]['users'][] = $row->user_name ?: 'Pengguna';
        }

        return collect($map)->map(fn (array $groups) => array_values($groups))->all();
    }
}
