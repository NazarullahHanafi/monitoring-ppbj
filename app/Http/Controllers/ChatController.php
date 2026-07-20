<?php

namespace App\Http\Controllers;

use App\Models\Sp;
use App\Models\Spph;
use App\Models\Torpr;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ChatController extends Controller
{
    private const PAGE_SIZE = 40;

    private const UNREAD_SCAN_LIMIT = 500;

    private const MAX_MSG_LENGTH = 500;

    private const RATE_LIMIT_MIN = 20;

    private const SEARCH_LIMIT = 30;

    private const EDIT_WINDOW_MINUTES = 15;

    private const DELETE_WINDOW_HOURS = 6;

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
        $before = (int) $request->get('before', 0);
        $myId = Auth::id();

        $rows = DB::table('chat_messages')
            ->whereNotExists(function ($query) use ($myId) {
                $query->selectRaw('1')
                    ->from('chat_message_deletions')
                    ->whereColumn('chat_message_deletions.message_id', 'chat_messages.id')
                    ->where('chat_message_deletions.user_id', $myId);
            })
            ->when($before > 0, fn ($query) => $query->where('id', '<', $before))
            ->when($before === 0 && $since > 0, fn ($query) => $query->where('id', '>', $since))
            ->orderByDesc('id')
            ->limit(self::PAGE_SIZE + 1)
            ->get();

        $hasMore = $rows->count() > self::PAGE_SIZE;
        $rows = $rows
            ->take(self::PAGE_SIZE)
            ->reverse()
            ->values();

        if ($rows->isEmpty()) {
            return response()->json([
                'messages' => [],
                'max_id' => $since,
                'oldest_id' => $before,
                'has_more' => false,
            ]);
        }

        $this->enrichMessages($rows, $myId);

        return response()->json([
            'messages' => $rows,
            'max_id' => $rows->max('id') ?? $since,
            'oldest_id' => $rows->min('id'),
            'has_more' => $hasMore,
        ]);
    }

    /**
     * Ambil semua user untuk dropdown mention.
     */
    public function getUsers()
    {
        $authId = Auth::id();

        $users = Cache::remember('chat:mention_users:v1', 60, function () {
            return DB::table('users')
                ->select('id', 'name', 'department')
                ->orderBy('name')
                ->get();
        })
            ->where('id', '!=', $authId)
            ->values()
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
            ->whereNotExists(function ($query) use ($userId) {
                $query->selectRaw('1')
                    ->from('chat_message_deletions')
                    ->whereColumn('chat_message_deletions.message_id', 'chat_messages.id')
                    ->where('chat_message_deletions.user_id', $userId);
            })
            ->orderByDesc('id')
            ->limit(self::UNREAD_SCAN_LIMIT)
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
            ->whereNotExists(function ($query) {
                $query->selectRaw('1')
                    ->from('chat_message_deletions')
                    ->whereColumn('chat_message_deletions.message_id', 'chat_messages.id')
                    ->where('chat_message_deletions.user_id', Auth::id());
            })
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

        $messageUpdates = DB::table('chat_messages')
            ->whereIn('id', $ids)
            ->whereNotNull('edited_at')
            ->get(['id', 'message', 'mentions', 'edited_at'])
            ->map(function ($message) {
                $message->mentions_parsed = $this->parseMentions($message->mentions);
                unset($message->mentions);

                return $message;
            });

        return response()->json([
            'reactions' => $this->reactionMap($ids, Auth::id()),
            'message_updates' => $messageUpdates,
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
     * Edit pesan sendiri maksimal 15 menit setelah dikirim.
     */
    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:'.self::MAX_MSG_LENGTH,
        ]);

        $message = DB::table('chat_messages')->find($id);

        if (! $message) {
            return response()->json(['error' => 'Pesan tidak ditemukan'], 404);
        }

        if ((int) $message->user_id !== (int) Auth::id()) {
            return response()->json(['error' => 'Pesan hanya dapat diedit oleh pengirim'], 403);
        }

        if (Carbon::parse($message->created_at)->addMinutes(self::EDIT_WINDOW_MINUTES)->isPast()) {
            return response()->json(['error' => 'Batas waktu edit 15 menit sudah berakhir'], 403);
        }

        $text = trim($validated['message']);
        $mentions = collect($this->parseMentions($message->mentions))
            ->filter(function (array $mention) use ($text) {
                $name = (string) ($mention['name'] ?? '');

                return $name !== '' && mb_stripos($text, '@'.$name) !== false;
            })
            ->values()
            ->all();

        DB::table('chat_messages')->where('id', $id)->update([
            'message' => $text,
            'mentions' => $mentions === [] ? null : json_encode($mentions),
            'edited_at' => now(),
        ]);

        $messages = collect([DB::table('chat_messages')->find($id)]);
        $this->enrichMessages($messages, Auth::id());

        return response()->json(['message' => $messages->first()]);
    }

    /**
     * Bagikan snapshot data PR, SPPH, atau SP ke Chat Tim.
     */
    public function share(Request $request)
    {
        $validated = $request->validate([
            'type' => ['required', 'string', Rule::in(['pr', 'spph', 'sp'])],
            'id' => 'required|integer|min:1',
        ]);

        $user = Auth::user();
        $allowedDepartment = $validated['type'] === 'pr' ? 'operasional' : 'umum';

        if ($user->department !== $allowedDepartment) {
            return response()->json(['error' => 'Anda tidak memiliki akses ke data ini'], 403);
        }

        $rateKey = 'chat_share_rate:'.$user->id.':'.date('YmdHi');
        $rateCount = (int) Cache::get($rateKey, 0);

        if ($rateCount >= 10) {
            return response()->json(['error' => 'Terlalu banyak membagikan data.'], 429);
        }

        Cache::put($rateKey, $rateCount + 1, 60);

        $snapshot = $this->sharedRecordSnapshot($validated['type'], (int) $validated['id']);

        if (! $snapshot) {
            return response()->json(['error' => 'Data tidak ditemukan'], 404);
        }

        $colors = $this->colors();
        $id = DB::table('chat_messages')->insertGetId([
            'user_id' => $user->id,
            'user_name' => $user->name,
            'user_initials' => $this->initials($user->name),
            'user_color' => $colors[$user->id % count($colors)],
            'message' => 'Membagikan '.$snapshot['label'].' '.$snapshot['number'],
            'reply_to' => null,
            'reply_preview' => null,
            'reply_user' => null,
            'mentions' => null,
            'share_type' => $validated['type'],
            'share_id' => $validated['id'],
            'share_data' => json_encode($snapshot, JSON_UNESCAPED_UNICODE),
            'created_at' => now(),
        ]);

        $messages = collect([DB::table('chat_messages')->find($id)]);
        $this->enrichMessages($messages, $user->id);

        return response()->json(['message' => $messages->first()], 201);
    }

    /**
     * Daftar PR/PPBJ untuk tombol follow up cepat di Chat Tim.
     */
    public function followups(Request $request)
    {
        $query = trim((string) $request->query('q', ''));
        $query = trim(preg_replace('/^\/@/u', '', $query) ?? '');
        $cacheKey = 'chat_followups:v2:'.md5(mb_strtolower($query));

        $items = Cache::remember($cacheKey, 45, function () use ($query) {
            $items = collect();

            $prRows = DB::table('torprs')
                ->select([
                    'id',
                    'nomor_pr',
                    'tujuan_pengadaan',
                    'portofolio',
                    'jumlah_pr',
                    'tanggal_pr',
                    'tgl_ttd_kabid_pr',
                    'tgl_ttd_kacab_pr',
                    'received_at',
                    'updated_at',
                    'created_at',
                ])
                ->when($query !== '', function ($builder) use ($query) {
                    $like = '%'.$query.'%';

                    $builder->where(function ($sub) use ($like) {
                        $sub->where('nomor_pr', 'like', $like)
                            ->orWhere('tujuan_pengadaan', 'like', $like)
                            ->orWhere('portofolio', 'like', $like);
                    });
                })
                ->orderByDesc('updated_at')
                ->orderByDesc('id')
                ->limit(10)
                ->get();

            $approvalMap = $this->latestApprovalMap($prRows->pluck('id')->map(fn ($id) => (int) $id)->all());

            foreach ($prRows as $row) {
                $status = $this->prFollowupStatus($row, $approvalMap[(int) $row->id] ?? null);

                $items->push([
                    'type' => 'pr',
                    'id' => (int) $row->id,
                    'number' => $row->nomor_pr ?: 'PR tanpa nomor',
                    'title' => $row->tujuan_pengadaan ?: 'Pengadaan',
                    'status' => $status,
                    'badge' => 'PR',
                    'meta' => trim(($row->portofolio ?: 'Tanpa portofolio').' • '.$this->formatCurrency($row->jumlah_pr)),
                    'fields' => [
                        ['label' => 'Tanggal PR', 'value' => $this->formatDate($row->tanggal_pr)],
                        ['label' => 'TTD Kabid', 'value' => $this->formatDate($row->tgl_ttd_kabid_pr)],
                        ['label' => 'TTD Kacab', 'value' => $this->formatDate($row->tgl_ttd_kacab_pr)],
                        ['label' => 'Diterima Umum', 'value' => $this->formatDate($row->received_at, true)],
                    ],
                ]);
            }

            $ppbjRows = DB::table('ppbj')
                ->select([
                    'id',
                    'ppbj_no',
                    'tgl_ppbj',
                    'uraian',
                    'portofolio',
                    'buyer',
                    'penyedia_eksternal',
                    'metode_pengadaan',
                    'total_sebelum_ppn',
                    'nilai_sp_spk',
                    'progres',
                    'status',
                    'status_sla',
                    'updated_at',
                    'created_at',
                ])
                ->when($query !== '', function ($builder) use ($query) {
                    $like = '%'.$query.'%';

                    $builder->where(function ($sub) use ($like) {
                        $sub->where('ppbj_no', 'like', $like)
                            ->orWhere('uraian', 'like', $like)
                            ->orWhere('portofolio', 'like', $like)
                            ->orWhere('buyer', 'like', $like)
                            ->orWhere('penyedia_eksternal', 'like', $like)
                            ->orWhere('metode_pengadaan', 'like', $like);
                    });
                })
                ->orderByDesc('updated_at')
                ->orderByDesc('id')
                ->limit(10)
                ->get();

            foreach ($ppbjRows as $row) {
                $progress = (float) ($row->progres ?? 0);
                $statusParts = [];
                if ($row->status) {
                    $statusParts[] = $row->status;
                }
                if ($row->status_sla) {
                    $statusParts[] = $row->status_sla;
                }
                $statusParts[] = 'Progress '.number_format($progress, 0, ',', '.').'%';

                $items->push([
                    'type' => 'ppbj',
                    'id' => (int) $row->id,
                    'number' => $row->ppbj_no ?: 'PPBJ tanpa nomor',
                    'title' => $row->uraian ?: 'Monitoring PPBJ',
                    'status' => implode(' • ', array_filter($statusParts)),
                    'badge' => 'PPBJ',
                    'meta' => trim(($row->buyer ?: 'Buyer -').' • '.($row->penyedia_eksternal ?: 'Vendor -')),
                    'fields' => [
                        ['label' => 'Tanggal PPBJ', 'value' => $this->formatDate($row->tgl_ppbj)],
                        ['label' => 'Portofolio', 'value' => $row->portofolio ?: '-'],
                        ['label' => 'Metode', 'value' => $row->metode_pengadaan ?: '-'],
                        ['label' => 'Nilai', 'value' => $this->formatCurrency($row->nilai_sp_spk ?: $row->total_sebelum_ppn)],
                    ],
                ]);
            }

            return $items
                ->sortByDesc(fn ($item) => $item['type'] === 'pr' ? 2 : 1)
                ->values()
                ->take(16)
                ->all();
        });

        return response()->json(['items' => $items]);
    }

    /**
     * Kirim kartu follow up PR/PPBJ ke Chat Tim.
     */
    public function followup(Request $request)
    {
        $validated = $request->validate([
            'type' => ['required', 'string', Rule::in(['pr', 'ppbj'])],
            'id' => 'required|integer|min:1',
        ]);

        $user = Auth::user();
        $rateKey = 'chat_followup_rate:'.$user->id.':'.date('YmdHi');
        $rateCount = (int) Cache::get($rateKey, 0);

        if ($rateCount >= 12) {
            return response()->json(['error' => 'Terlalu banyak follow up. Coba lagi sebentar.'], 429);
        }

        Cache::put($rateKey, $rateCount + 1, 60);

        $snapshot = $this->followupRecordSnapshot($validated['type'], (int) $validated['id']);

        if (! $snapshot) {
            return response()->json(['error' => 'Data follow up tidak ditemukan'], 404);
        }

        $colors = $this->colors();
        $id = DB::table('chat_messages')->insertGetId([
            'user_id' => $user->id,
            'user_name' => $user->name,
            'user_initials' => $this->initials($user->name),
            'user_color' => $colors[$user->id % count($colors)],
            'message' => 'Follow up '.$snapshot['label'].' '.$snapshot['number'],
            'reply_to' => null,
            'reply_preview' => null,
            'reply_user' => null,
            'mentions' => null,
            'share_type' => 'followup_'.$validated['type'],
            'share_id' => $validated['id'],
            'share_data' => json_encode($snapshot, JSON_UNESCAPED_UNICODE),
            'created_at' => now(),
        ]);

        $messages = collect([DB::table('chat_messages')->find($id)]);
        $this->enrichMessages($messages, $user->id);

        return response()->json(['message' => $messages->first()], 201);
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

        $messages = collect([DB::table('chat_messages')->find($id)]);
        $this->enrichMessages($messages, $user->id);

        return response()->json(['message' => $messages->first()], 201);
    }

    /**
     * Hapus pesan.
     *
     * Pesan sendiri masih mengikuti batas "hapus untuk semua" selama 6 jam.
     * Pesan masuk dari user lain hanya disembunyikan untuk user yang sedang login.
     */
    public function destroy(int $id)
    {
        $message = DB::table('chat_messages')->find($id);
        $userId = Auth::id();

        if (! $message) {
            return response()->json(['error' => 'Pesan tidak ditemukan'], 404);
        }

        if ((int) $message->user_id !== (int) $userId) {
            DB::table('chat_message_deletions')->insertOrIgnore([
                'message_id' => $id,
                'user_id' => $userId,
                'deleted_at' => now(),
            ]);

            return response()->json([
                'deleted' => $id,
                'mode' => 'for_me',
            ]);
        }

        if (Carbon::parse($message->created_at)->addHours(self::DELETE_WINDOW_HOURS)->isPast()) {
            return response()->json(['error' => 'Batas waktu hapus pesan 6 jam sudah berakhir'], 403);
        }

        DB::table('chat_reactions')->where('message_id', $id)->delete();
        DB::table('chat_reads')->where('message_id', $id)->delete();
        DB::table('chat_messages')->delete($id);

        return response()->json([
            'deleted' => $id,
            'mode' => 'for_everyone',
        ]);
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
        $now = now();
        $rows = collect($request->input('message_ids', []))
            ->map(fn ($id) => (int) $id)
            ->filter(fn ($id) => $id > 0)
            ->unique()
            ->take(self::PAGE_SIZE)
            ->map(fn ($id) => [
                'message_id' => $id,
                'user_id' => $userId,
                'read_at' => $now,
            ])
            ->values()
            ->all();

        if ($rows === []) {
            return response()->json(['marked' => 0]);
        }

        $marked = DB::table('chat_reads')->insertOrIgnore($rows);

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
            $row->share_data_parsed = $this->parseShareData($row->share_data ?? null);
            $createdAt = Carbon::parse($row->created_at);
            $row->can_edit = (int) $row->user_id === $myId
                && $createdAt->copy()->addMinutes(self::EDIT_WINDOW_MINUTES)->isFuture();
            $row->can_delete = (int) $row->user_id !== $myId
                || $createdAt->copy()->addHours(self::DELETE_WINDOW_HOURS)->isFuture();
            $row->delete_expires_at = (int) $row->user_id === $myId
                ? $createdAt->copy()->addHours(self::DELETE_WINDOW_HOURS)->toIso8601String()
                : null;
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

    private function parseShareData(?string $shareData): ?array
    {
        if (! $shareData) {
            return null;
        }

        $decoded = json_decode($shareData, true);

        return is_array($decoded) ? $decoded : null;
    }

    private function sharedRecordSnapshot(string $type, int $id): ?array
    {
        if ($type === 'pr') {
            $record = Torpr::find($id);
            $approval = $record
                ? DB::table('pr_receipt_approvals')
                    ->where('torpr_id', $record->id)
                    ->orderByDesc('id')
                    ->first()
                : null;

            return $record ? [
                'label' => 'PR',
                'number' => $record->nomor_pr ?: 'Tanpa nomor',
                'title' => $record->tujuan_pengadaan ?: 'Pengadaan',
                'fields' => [
                    ['label' => 'Status', 'value' => $this->prFollowupStatus((object) $record->getAttributes(), $approval)],
                    ['label' => 'Portofolio', 'value' => $record->portofolio ?: '-'],
                    ['label' => 'Nilai', 'value' => $this->formatCurrency($record->jumlah_pr)],
                    ['label' => 'Tanggal', 'value' => $record->tanggal_pr?->format('d/m/Y') ?: '-'],
                ],
            ] : null;
        }

        if ($type === 'ppbj') {
            return $this->followupRecordSnapshot('ppbj', $id);
        }

        if ($type === 'spph') {
            $record = Spph::find($id);

            return $record ? [
                'label' => 'SPPH',
                'number' => $record->nomor_spph,
                'title' => $record->deskripsi_pengadaan,
                'fields' => [
                    ['label' => 'Nomor PR', 'value' => $record->nomor_pr ?: '-'],
                    ['label' => 'Vendor', 'value' => $record->nama_vendor],
                    ['label' => 'PIC', 'value' => $record->pic],
                ],
            ] : null;
        }

        $record = Sp::find($id);

        return $record ? [
            'label' => 'SP',
            'number' => $record->nomor_sp,
            'title' => $record->deskripsi_pengadaan,
            'fields' => [
                ['label' => 'Nomor PR', 'value' => $record->nomor_pr ?: '-'],
                ['label' => 'Vendor', 'value' => $record->nama_vendor],
                ['label' => 'Nilai', 'value' => $this->formatCurrency($record->nilai_sp)],
                ['label' => 'PIC', 'value' => $record->pic],
            ],
        ] : null;
    }

    private function followupRecordSnapshot(string $type, int $id): ?array
    {
        if ($type === 'pr') {
            $record = DB::table('torprs')->find($id);

            if (! $record) {
                return null;
            }

            $approval = DB::table('pr_receipt_approvals')
                ->where('torpr_id', $record->id)
                ->orderByDesc('id')
                ->first();

            $linkedPpbj = $record->nomor_pr
                ? DB::table('ppbj')
                    ->where('ppbj_no', $record->nomor_pr)
                    ->orWhere('ppbj_no', 'like', '%'.$record->nomor_pr.'%')
                    ->orderByDesc('updated_at')
                    ->first()
                : null;

            return [
                'label' => 'FOLLOW UP PR',
                'number' => $record->nomor_pr ?: 'Tanpa nomor',
                'title' => $record->tujuan_pengadaan ?: 'Pengadaan',
                'fields' => [
                    ['label' => 'Status', 'value' => $this->prFollowupStatus($record, $approval)],
                    ['label' => 'Portofolio', 'value' => $record->portofolio ?: '-'],
                    ['label' => 'Nilai PR', 'value' => $this->formatCurrency($record->jumlah_pr)],
                    ['label' => 'Tanggal PR', 'value' => $this->formatDate($record->tanggal_pr)],
                    ['label' => 'TTD Kabid', 'value' => $this->formatDate($record->tgl_ttd_kabid_pr)],
                    ['label' => 'TTD Kacab', 'value' => $this->formatDate($record->tgl_ttd_kacab_pr)],
                    ['label' => 'Diterima Umum', 'value' => $this->formatDate($record->received_at, true)],
                    ['label' => 'Data PPBJ', 'value' => $linkedPpbj ? (($linkedPpbj->progres ?? 0).'% • '.($linkedPpbj->buyer ?: 'Buyer -')) : 'Belum ada'],
                ],
            ];
        }

        $record = DB::table('ppbj')->find($id);

        if (! $record) {
            return null;
        }

        return [
            'label' => 'FOLLOW UP PPBJ',
            'number' => $record->ppbj_no ?: 'Tanpa nomor',
            'title' => $record->uraian ?: 'Monitoring PPBJ',
            'fields' => [
                ['label' => 'Progress', 'value' => number_format((float) ($record->progres ?? 0), 0, ',', '.').'%'],
                ['label' => 'Status SLA', 'value' => $record->status_sla ?: '-'],
                ['label' => 'Buyer', 'value' => $record->buyer ?: '-'],
                ['label' => 'Vendor', 'value' => $record->penyedia_eksternal ?: '-'],
                ['label' => 'Portofolio', 'value' => $record->portofolio ?: '-'],
                ['label' => 'Metode', 'value' => $record->metode_pengadaan ?: '-'],
                ['label' => 'Tanggal PPBJ', 'value' => $this->formatDate($record->tgl_ppbj)],
                ['label' => 'Nilai', 'value' => $this->formatCurrency($record->nilai_sp_spk ?: $record->total_sebelum_ppn)],
            ],
        ];
    }

    private function latestApprovalMap(array $torprIds): array
    {
        if ($torprIds === []) {
            return [];
        }

        return DB::table('pr_receipt_approvals')
            ->whereIn('torpr_id', $torprIds)
            ->orderByDesc('id')
            ->get()
            ->unique('torpr_id')
            ->keyBy(fn ($row) => (int) $row->torpr_id)
            ->all();
    }

    private function prFollowupStatus(object $record, ?object $approval): string
    {
        $approvalStatus = strtoupper((string) ($approval->status ?? ''));

        if ($approvalStatus === 'REJECTED') {
            return 'Ditolak Umum';
        }

        if (! empty($record->received_at)) {
            return 'Sudah diterima Umum';
        }

        if ($approvalStatus === 'APPROVED') {
            return 'Disetujui Umum';
        }

        if ($approvalStatus === 'PENDING') {
            return 'Menunggu approval Umum';
        }

        if (! empty($record->tgl_ttd_kacab_pr)) {
            return 'Siap request ke Umum';
        }

        if (! empty($record->tgl_ttd_kabid_pr)) {
            return 'Menunggu TTD Kacab';
        }

        return 'Menunggu TTD Kabid';
    }

    private function formatCurrency($value): string
    {
        if ($value === null || $value === '' || (float) $value === 0.0) {
            return '-';
        }

        return 'Rp '.number_format((float) $value, 0, ',', '.');
    }

    private function formatDate($value, bool $withTime = false): string
    {
        if (! $value) {
            return '-';
        }

        try {
            return Carbon::parse($value)->format($withTime ? 'd/m/Y H:i' : 'd/m/Y');
        } catch (\Throwable) {
            return '-';
        }
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
