<?php

namespace App\Http\Controllers;

use App\Models\Ppbj;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class PpbjCollaborationController extends Controller
{
    public function index(Request $request, Ppbj $ppbj): JsonResponse
    {
        $userId = (int) $request->user()->id;

        DB::table('ppbj_note_mentions')
            ->where('user_id', $userId)
            ->whereNull('read_at')
            ->whereIn('note_id', DB::table('ppbj_collaboration_notes')->select('id')->where('ppbj_id', $ppbj->id))
            ->update(['read_at' => now(), 'updated_at' => now()]);

        $notes = DB::table('ppbj_collaboration_notes as notes')
            ->where('notes.ppbj_id', $ppbj->id)
            ->orderByDesc('notes.id')
            ->limit(50)
            ->get([
                'notes.id', 'notes.user_id', 'notes.body', 'notes.mentions',
                'notes.edited_at', 'notes.created_at', 'notes.author_name as user_name',
                'notes.author_department as department', 'notes.author_role as role',
            ])
            ->reverse()
            ->values()
            ->map(fn ($note) => $this->presentNote($note, $userId, (string) $request->user()->role));

        $users = Cache::remember('ppbj_collaboration:mention_users:v1', 300, fn () =>
            DB::table('users')
                ->where('is_active', true)
                ->orderBy('department')
                ->orderBy('name')
                ->get(['id', 'name', 'department', 'role'])
                ->map(fn ($user) => [
                    'id' => (int) $user->id,
                    'name' => $user->name,
                    'department' => ucfirst((string) ($user->department ?: '-')),
                    'role' => ucfirst((string) ($user->role ?: '-')),
                ])
                ->all()
        );

        return response()->json([
            'ppbj' => ['id' => $ppbj->id, 'number' => $ppbj->ppbj_no, 'description' => $ppbj->uraian],
            'notes' => $notes,
            'users' => $users,
        ]);
    }

    public function store(Request $request, Ppbj $ppbj): JsonResponse
    {
        $validated = $request->validate([
            'body' => ['required', 'string', 'min:2', 'max:2000'],
            'mentions' => ['nullable', 'array', 'max:20'],
            'mentions.*' => ['integer', 'distinct', Rule::exists('users', 'id')->where(fn ($query) => $query->where('is_active', true))],
        ]);

        $actor = $request->user();
        $mentionIds = collect($validated['mentions'] ?? [])
            ->map(fn ($id) => (int) $id)
            ->reject(fn ($id) => $id === (int) $actor->id)
            ->unique()
            ->values();
        $mentionUsers = $mentionIds->isEmpty()
            ? collect()
            : DB::table('users')->whereIn('id', $mentionIds)->get(['id', 'name']);
        $mentions = $mentionUsers->map(fn ($user) => ['id' => (int) $user->id, 'name' => $user->name])->values()->all();

        $noteId = DB::transaction(function () use ($ppbj, $actor, $validated, $mentionIds, $mentions) {
            $now = now();
            $noteId = DB::table('ppbj_collaboration_notes')->insertGetId([
                'ppbj_id' => $ppbj->id,
                'user_id' => $actor->id,
                'author_name' => $actor->name,
                'author_department' => $actor->department,
                'author_role' => $actor->role,
                'body' => trim($validated['body']),
                'mentions' => $mentions === [] ? null : json_encode($mentions, JSON_UNESCAPED_UNICODE),
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            if ($mentionIds->isNotEmpty()) {
                DB::table('ppbj_note_mentions')->insert($mentionIds->map(fn ($userId) => [
                    'note_id' => $noteId,
                    'user_id' => $userId,
                    'created_at' => $now,
                    'updated_at' => $now,
                ])->all());

                $this->sendMentionToTeamChat($ppbj, $actor, trim($validated['body']), $mentions, $now);
            }

            return $noteId;
        }, 3);

        $note = DB::table('ppbj_collaboration_notes as notes')
            ->where('notes.id', $noteId)
            ->first([
                'notes.id', 'notes.user_id', 'notes.body', 'notes.mentions',
                'notes.edited_at', 'notes.created_at', 'notes.author_name as user_name',
                'notes.author_department as department', 'notes.author_role as role',
            ]);

        return response()->json(['message' => 'Catatan kolaborasi ditambahkan.', 'note' => $this->presentNote($note, (int) $actor->id, (string) $actor->role)], 201);
    }

    public function update(Request $request, int $note): JsonResponse
    {
        $row = DB::table('ppbj_collaboration_notes')->find($note);
        abort_unless($row, 404);
        $this->authorizeMutation($request, (int) $row->user_id);

        $validated = $request->validate(['body' => ['required', 'string', 'min:2', 'max:2000']]);
        DB::table('ppbj_collaboration_notes')->where('id', $note)->update([
            'body' => trim($validated['body']),
            'edited_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Catatan diperbarui.']);
    }

    public function destroy(Request $request, int $note): JsonResponse
    {
        $row = DB::table('ppbj_collaboration_notes')->find($note);
        abort_unless($row, 404);
        $this->authorizeMutation($request, (int) $row->user_id);
        DB::table('ppbj_collaboration_notes')->where('id', $note)->delete();

        return response()->json(['message' => 'Catatan dihapus.']);
    }

    public function mentions(Request $request): JsonResponse
    {
        $rows = DB::table('ppbj_note_mentions as mention')
            ->join('ppbj_collaboration_notes as note', 'note.id', '=', 'mention.note_id')
            ->join('ppbj', 'ppbj.id', '=', 'note.ppbj_id')
            ->where('mention.user_id', $request->user()->id)
            ->whereNull('mention.read_at')
            ->orderByDesc('mention.id')
            ->limit(30)
            ->get([
                'mention.id', 'note.ppbj_id', 'note.body', 'note.created_at',
                'ppbj.ppbj_no', 'ppbj.uraian', 'note.author_name as user_name',
            ]);

        return response()->json(['count' => $rows->count(), 'mentions' => $rows]);
    }

    private function authorizeMutation(Request $request, int $authorId): void
    {
        $user = $request->user();
        abort_unless((int) $user->id === $authorId || strtolower((string) $user->role) === 'superadmin', 403);
    }

    private function presentNote(object $note, int $viewerId, string $viewerRole = ''): array
    {
        $mentions = json_decode((string) ($note->mentions ?? ''), true);

        return [
            'id' => (int) $note->id,
            'user_id' => (int) $note->user_id,
            'user_name' => $note->user_name,
            'department' => ucfirst((string) ($note->department ?: '-')),
            'role' => ucfirst((string) ($note->role ?: '-')),
            'body' => $note->body,
            'mentions' => is_array($mentions) ? $mentions : [],
            'created_at' => $note->created_at,
            'edited_at' => $note->edited_at,
            'can_manage' => (int) $note->user_id === $viewerId || strtolower($viewerRole) === 'superadmin',
        ];
    }

    private function sendMentionToTeamChat(Ppbj $ppbj, object $actor, string $body, array $mentions, mixed $now): void
    {
        $columns = DB::getSchemaBuilder()->getColumnListing('chat_messages');
        $payload = [
            'user_id' => $actor->id,
            'user_name' => $actor->name,
            'user_initials' => collect(preg_split('/\s+/', trim((string) $actor->name)))->filter()->take(2)->map(fn ($part) => mb_strtoupper(mb_substr($part, 0, 1)))->implode(''),
            'user_color' => '#4f46e5',
            'message' => 'Catatan PPBJ '.$ppbj->ppbj_no.': '.mb_substr($body, 0, 360),
            'reply_to' => null,
            'reply_preview' => null,
            'reply_user' => null,
            'mentions' => json_encode($mentions, JSON_UNESCAPED_UNICODE),
            'created_at' => $now,
        ];
        if (in_array('share_type', $columns, true)) {
            $payload['share_type'] = 'ppbj';
            $payload['share_id'] = $ppbj->id;
            $payload['share_data'] = json_encode([
                'type' => 'ppbj', 'id' => $ppbj->id, 'number' => $ppbj->ppbj_no,
                'title' => $ppbj->uraian, 'url' => route('tracking.index', ['q' => $ppbj->ppbj_no]),
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }
        DB::table('chat_messages')->insert($payload);
    }
}
