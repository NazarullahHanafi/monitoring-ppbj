<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\CollaborationHandover;
use App\Models\Ppbj;
use App\Models\Torpr;
use App\Models\User;
use App\Services\CollaborationActionInboxService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;

class CollaborationActionInboxController extends Controller
{
    private const DEPARTMENTS = ['umum', 'operasional'];

    private const PRIORITIES = ['normal', 'high', 'critical'];

    private const STATUSES = ['sent', 'acknowledged', 'in_progress', 'completed', 'returned', 'cancelled'];

    public function index(Request $request, CollaborationActionInboxService $radar): View
    {
        $user = $this->authorizedUser($request);
        $filters = $request->validate([
            'q' => ['nullable', 'string', 'max:120'],
            'direction' => ['nullable', Rule::in(['inbox', 'outbox', 'mine', 'all'])],
            'status' => ['nullable', Rule::in(array_merge(['open'], self::STATUSES))],
            'priority' => ['nullable', Rule::in(self::PRIORITIES)],
        ]);

        $department = strtolower((string) $user->department);
        $query = CollaborationHandover::query()
            ->visibleTo($user)
            ->with([
                'creator:id,name,department', 'assignee:id,name,department',
                'acknowledgedBy:id,name', 'completedBy:id,name',
                'ppbj:id,ppbj_no,uraian,portofolio,buyer,total_sebelum_ppn,status_sla',
            ]);

        $this->applyFilters($query, $filters, $user);

        $handovers = $query
            ->orderByRaw("CASE WHEN due_at IS NOT NULL AND due_at < ? AND status IN ('sent','acknowledged','in_progress','returned') THEN 0 ELSE 1 END", [now()])
            ->orderByRaw("CASE priority WHEN 'critical' THEN 0 WHEN 'high' THEN 1 ELSE 2 END")
            ->latest('updated_at')
            ->paginate(12)
            ->withQueryString();

        $visible = CollaborationHandover::query()->visibleTo($user);
        $stats = $visible->selectRaw(
            "SUM(CASE WHEN to_department = ? AND status IN ('sent','acknowledged','in_progress','returned') THEN 1 ELSE 0 END) AS inbox_open,
             SUM(CASE WHEN assigned_to_user_id = ? AND status IN ('sent','acknowledged','in_progress','returned') THEN 1 ELSE 0 END) AS assigned_to_me,
             SUM(CASE WHEN due_at IS NOT NULL AND due_at < ? AND status IN ('sent','acknowledged','in_progress','returned') THEN 1 ELSE 0 END) AS overdue,
             SUM(CASE WHEN status = 'completed' AND completed_at >= ? THEN 1 ELSE 0 END) AS completed_recent",
            [$department, $user->id, now(), now()->subDays(30)]
        )->first();

        $users = User::query()
            ->where('is_active', true)
            ->whereIn('department', self::DEPARTMENTS)
            ->orderBy('department')
            ->orderBy('name')
            ->get(['id', 'name', 'department', 'role']);

        $workload = DB::table('collaboration_handovers as handovers')
            ->join('users', 'users.id', '=', 'handovers.assigned_to_user_id')
            ->where('handovers.to_department', $department)
            ->whereIn('handovers.status', CollaborationHandover::ACTIVE_STATUSES)
            ->groupBy('users.id', 'users.name')
            ->orderByDesc('total')
            ->limit(8)
            ->get(['users.id', 'users.name', DB::raw('COUNT(*) as total')]);

        return view('collaboration-inbox.index', [
            'handovers' => $handovers,
            'stats' => $stats,
            'users' => $users,
            'workload' => $workload,
            'smartActions' => $radar->smartActions($user),
            'targetDepartment' => $department === 'umum' ? 'operasional' : 'umum',
            'filters' => $filters,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $this->authorizedUser($request);
        $from = strtolower((string) $user->department);
        $to = $from === 'umum' ? 'operasional' : 'umum';
        $validated = $request->validate([
            'ppbj_id' => ['required', 'integer', Rule::exists('ppbj', 'id')],
            'title' => ['required', 'string', 'max:140'],
            'description' => ['required', 'string', 'max:2000'],
            'priority' => ['required', Rule::in(self::PRIORITIES)],
            'due_at' => ['nullable', 'date', 'after:now'],
            'assigned_to_user_id' => [
                'nullable', 'integer',
                Rule::exists('users', 'id')->where(fn ($query) => $query->where('department', $to)->where('is_active', true)),
            ],
            'checklist_items' => ['nullable', 'array', 'max:8'],
            'checklist_items.*' => ['string', 'max:120'],
        ]);

        $checklist = collect($validated['checklist_items'] ?? [])
            ->map(fn ($label) => trim((string) $label))
            ->filter()
            ->unique()
            ->values()
            ->map(fn ($label, $index) => ['key' => $index + 1, 'label' => $label, 'checked' => false])
            ->all();

        $handover = DB::transaction(function () use ($validated, $user, $from, $to, $checklist, $request) {
            // Mengunci baris PR membuat pemeriksaan duplikat tetap aman saat dua
            // user mengirim serah terima yang sama hampir bersamaan.
            $ppbj = Ppbj::query()->lockForUpdate()->findOrFail($validated['ppbj_id']);
            $duplicate = CollaborationHandover::query()
                ->where('ppbj_id', $ppbj->id)
                ->where('to_department', $to)
                ->whereIn('status', CollaborationHandover::ACTIVE_STATUSES)
                ->exists();

            if ($duplicate) {
                throw ValidationException::withMessages([
                    'ppbj_id' => 'PR ini masih memiliki serah terima aktif ke departemen tujuan. Lanjutkan tugas yang sudah ada agar tidak terjadi duplikasi.',
                ]);
            }

            $torprId = Torpr::query()->where('nomor_pr', $ppbj->ppbj_no)->value('id');
            $handover = CollaborationHandover::create([
                'ppbj_id' => $ppbj->id,
                'torpr_id' => $torprId,
                'title' => trim($validated['title']),
                'description' => trim($validated['description']),
                'from_department' => $from,
                'to_department' => $to,
                'priority' => $validated['priority'],
                'status' => 'sent',
                'due_at' => $validated['due_at'] ?? null,
                'assigned_to_user_id' => $validated['assigned_to_user_id'] ?? null,
                'created_by_user_id' => $user->id,
                'checklist' => $checklist,
                'metadata' => ['source' => 'collaboration_inbox', 'created_ip' => $request->ip()],
            ]);

            $this->audit($handover, $user, 'handover_created', 'Serah terima lintas-role dibuat.', [
                'from' => $from, 'to' => $to, 'priority' => $validated['priority'],
            ]);

            return $handover;
        });

        return redirect()->route('collaboration-inbox.index', ['direction' => 'outbox'])
            ->with('success', "Serah terima {$handover->title} berhasil dikirim ke ".ucfirst($to).'.');
    }

    public function updateStatus(Request $request, CollaborationHandover $handover): RedirectResponse
    {
        $user = $this->authorizedUser($request);
        $validated = $request->validate([
            'action' => ['required', Rule::in(['acknowledge', 'start', 'complete', 'return', 'resend', 'cancel'])],
            'version' => ['required', 'integer', 'min:1'],
            'note' => ['nullable', 'string', 'max:1200'],
        ]);

        $action = $validated['action'];
        $note = trim((string) ($validated['note'] ?? ''));

        DB::transaction(function () use ($handover, $user, $validated, $action, $note) {
            $current = CollaborationHandover::query()->lockForUpdate()->findOrFail($handover->id);

            abort_unless((int) $current->version === (int) $validated['version'], 409, 'Data sudah diperbarui user lain. Muat ulang halaman sebelum melanjutkan.');
            $this->guardTransition($current, $user, $action);

            if ($action === 'complete' && collect($current->checklist ?? [])->contains(fn ($item) => ! ($item['checked'] ?? false))) {
                throw ValidationException::withMessages(['action' => 'Checklist serah terima harus lengkap sebelum tugas diselesaikan.']);
            }

            $now = now();
            match ($action) {
                'acknowledge' => $current->fill([
                    'status' => 'acknowledged', 'acknowledged_at' => $now,
                    'acknowledged_by_user_id' => $user->id,
                    'assigned_to_user_id' => $current->assigned_to_user_id ?: $user->id,
                ]),
                'start' => $current->fill([
                    'status' => 'in_progress', 'started_at' => $current->started_at ?: $now,
                    'assigned_to_user_id' => $current->assigned_to_user_id ?: $user->id,
                ]),
                'complete' => $current->fill([
                    'status' => 'completed', 'completed_at' => $now, 'completed_by_user_id' => $user->id,
                ]),
                'return' => $current->fill(['status' => 'returned', 'returned_at' => $now]),
                'resend' => $current->fill(['status' => 'sent', 'returned_at' => null]),
                'cancel' => $current->fill(['status' => 'cancelled']),
            };

            $current->last_note = $note !== '' ? $note : $current->last_note;
            $current->version++;
            $current->save();
            $this->audit($current, $user, 'handover_'.$action, $this->actionDescription($action), ['note' => $note]);
        });

        return back()->with('success', $this->actionDescription($action));
    }

    public function updateChecklist(Request $request, CollaborationHandover $handover): RedirectResponse
    {
        $user = $this->authorizedUser($request);
        $validated = $request->validate([
            'version' => ['required', 'integer', 'min:1'],
            'checked' => ['nullable', 'array'],
            'checked.*' => ['integer', 'min:1'],
        ]);

        DB::transaction(function () use ($handover, $user, $validated) {
            $current = CollaborationHandover::query()->lockForUpdate()->findOrFail($handover->id);
            abort_unless((int) $current->version === (int) $validated['version'], 409, 'Checklist sudah diperbarui user lain. Muat ulang halaman.');
            abort_unless($this->isReceiver($current, $user), 403);
            abort_if(in_array($current->status, ['completed', 'cancelled'], true), 422, 'Checklist tugas yang sudah ditutup tidak dapat diubah.');

            $checked = collect($validated['checked'] ?? [])->map(fn ($value) => (int) $value)->all();
            $current->checklist = collect($current->checklist ?? [])->map(function ($item) use ($checked) {
                $item['checked'] = in_array((int) ($item['key'] ?? 0), $checked, true);

                return $item;
            })->all();
            $current->version++;
            $current->save();
            $this->audit($current, $user, 'handover_checklist_updated', 'Checklist serah terima diperbarui.', [
                'progress' => $current->checklistProgress(),
            ]);
        });

        return back()->with('success', 'Checklist serah terima berhasil diperbarui.');
    }

    private function applyFilters(Builder $query, array $filters, User $user): void
    {
        $department = strtolower((string) $user->department);
        $direction = $filters['direction'] ?? 'inbox';
        $status = $filters['status'] ?? 'open';
        $term = trim((string) ($filters['q'] ?? ''));

        match ($direction) {
            'outbox' => $query->where('from_department', $department),
            'mine' => $query->where('assigned_to_user_id', $user->id),
            'all' => null,
            default => $query->where('to_department', $department),
        };

        $status === 'open'
            ? $query->whereIn('status', CollaborationHandover::ACTIVE_STATUSES)
            : $query->where('status', $status);

        if (filled($filters['priority'] ?? null)) {
            $query->where('priority', $filters['priority']);
        }

        if ($term !== '') {
            $like = '%'.addcslashes($term, '%_\\').'%';
            $query->where(function (Builder $search) use ($like) {
                $search->where('title', 'like', $like)
                    ->orWhere('description', 'like', $like)
                    ->orWhereHas('ppbj', fn (Builder $ppbj) => $ppbj->where('ppbj_no', 'like', $like)->orWhere('uraian', 'like', $like));
            });
        }
    }

    private function guardTransition(CollaborationHandover $handover, User $user, string $action): void
    {
        $creatorActions = ['resend', 'cancel'];
        $receiverActions = ['acknowledge', 'start', 'complete', 'return'];
        $transitions = [
            'acknowledge' => ['sent'],
            'start' => ['acknowledged'],
            'complete' => ['acknowledged', 'in_progress'],
            'return' => ['sent', 'acknowledged', 'in_progress'],
            'resend' => ['returned'],
            'cancel' => ['sent', 'returned'],
        ];

        abort_unless(in_array($handover->status, $transitions[$action] ?? [], true), 422, 'Transisi status tidak valid.');

        if (in_array($action, $creatorActions, true)) {
            $isCreator = (int) $handover->created_by_user_id === (int) $user->id;
            $isSourceSuperadmin = $handover->from_department === strtolower((string) $user->department)
                && strtolower((string) $user->role) === 'superadmin';

            abort_unless($isCreator || $isSourceSuperadmin, 403);
        }

        if (in_array($action, $receiverActions, true)) {
            abort_unless($this->isReceiver($handover, $user), 403);
        }

        abort_if($handover->assigned_to_user_id && $handover->assigned_to_user_id !== $user->id && strtolower((string) $user->role) !== 'superadmin' && in_array($action, $receiverActions, true), 403, 'Tugas ini sudah ditugaskan kepada user lain.');
    }

    private function isReceiver(CollaborationHandover $handover, User $user): bool
    {
        return $handover->to_department === strtolower((string) $user->department);
    }

    private function authorizedUser(Request $request): User
    {
        /** @var User|null $user */
        $user = $request->user();
        abort_unless($user && in_array(strtolower((string) $user->department), self::DEPARTMENTS, true), 403);

        return $user;
    }

    private function audit(CollaborationHandover $handover, User $user, string $action, string $description, array $changes = []): void
    {
        ActivityLog::create([
            'user_id' => $user->id,
            'model_type' => CollaborationHandover::class,
            'model_id' => $handover->id,
            'action' => $action,
            'description' => $description,
            'changes' => array_merge($changes, ['status' => $handover->status, 'version' => $handover->version]),
        ]);
    }

    private function actionDescription(string $action): string
    {
        return match ($action) {
            'acknowledge' => 'Serah terima sudah diterima.',
            'start' => 'Tugas mulai dikerjakan.',
            'complete' => 'Tugas serah terima selesai.',
            'return' => 'Serah terima dikembalikan untuk diperbaiki.',
            'resend' => 'Serah terima dikirim ulang.',
            'cancel' => 'Serah terima dibatalkan.',
            default => 'Status serah terima diperbarui.',
        };
    }
}
