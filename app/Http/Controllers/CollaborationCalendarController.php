<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\CollaborationEvent;
use App\Models\Ppbj;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class CollaborationCalendarController extends Controller
{
    use AuthorizesRequests;

    private const DEPARTMENTS = ['umum', 'operasional'];

    private const PRIORITIES = ['low', 'normal', 'high', 'critical'];

    private const STATUSES = ['planned', 'in_progress', 'done', 'cancelled'];

    public function index(Request $request): View
    {
        $this->ensureDepartment($request->user());

        $users = User::query()
            ->where('is_active', true)
            ->whereIn('department', self::DEPARTMENTS)
            ->orderBy('department')
            ->orderBy('name')
            ->limit(500)
            ->get(['id', 'name', 'department', 'role']);

        return view('collaboration-calendar.index', compact('users'));
    }

    public function events(Request $request): JsonResponse
    {
        $user = $request->user();
        $this->ensureDepartment($user);

        $validated = $request->validate([
            'start' => ['required', 'date_format:Y-m-d'],
            'end' => ['required', 'date_format:Y-m-d', 'after_or_equal:start'],
            'audience' => ['nullable', Rule::in(['all', ...self::DEPARTMENTS])],
            'source' => ['nullable', Rule::in(['all', 'collaboration', 'sla', 'contract', 'milestone'])],
        ]);

        $start = Carbon::createFromFormat('Y-m-d', $validated['start'])->startOfDay();
        $end = Carbon::createFromFormat('Y-m-d', $validated['end'])->endOfDay();

        abort_if($start->diffInDays($end) > 62, 422, 'Rentang kalender maksimal 62 hari.');

        $source = $validated['source'] ?? 'all';
        $events = collect();

        if (in_array($source, ['all', 'collaboration'], true)) {
            $custom = CollaborationEvent::query()
                ->visibleTo($user)
                ->with([
                    'creator:id,name,department',
                    'assignee:id,name,department',
                    'ppbj:id,ppbj_no,uraian',
                ])
                ->where('starts_at', '<=', $end)
                ->where(fn (Builder $query) => $query
                    ->whereNull('ends_at')
                    ->orWhere('ends_at', '>=', $start))
                ->when(
                    filled($validated['audience'] ?? null) && $validated['audience'] !== 'all',
                    fn (Builder $query) => $query->where('audience', $validated['audience'])
                )
                ->orderBy('starts_at')
                ->limit(600)
                ->get()
                ->map(fn (CollaborationEvent $event) => $this->serializeCustomEvent($event, $user));

            $events = $events->concat($custom);
        }

        if ($source !== 'collaboration') {
            $events = $events->concat($this->systemEvents($start, $end, $source, $user));
        }

        $events = $events->sortBy('start')->values();

        return response()->json([
            'events' => $events,
            'meta' => [
                'total' => $events->count(),
                'collaboration' => $events->where('source', 'collaboration')->count(),
                'deadlines' => $events->whereIn('source', ['sla', 'contract'])->count(),
                'milestones' => $events->where('source', 'milestone')->count(),
                'critical' => $events->where('priority', 'critical')->count(),
                'generated_at' => now()->toIso8601String(),
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
        $this->ensureDepartment($user);
        $data = $this->validatedEvent($request);
        $this->validateAssigneeAudience($data);

        $event = DB::transaction(function () use ($data, $user) {
            $event = CollaborationEvent::create([
                ...$data,
                'creator_id' => $user->id,
                'version' => 1,
            ]);

            $this->audit($user, $event, 'calendar_event_created', 'Agenda kolaborasi dibuat.', null, $event->only([
                'title', 'starts_at', 'ends_at', 'priority', 'status', 'audience', 'assignee_id', 'ppbj_id',
            ]));

            return $event;
        });

        $event->load(['creator:id,name,department', 'assignee:id,name,department', 'ppbj:id,ppbj_no,uraian']);

        return response()->json([
            'message' => 'Agenda kolaborasi berhasil dibuat.',
            'event' => $this->serializeCustomEvent($event, $user),
        ], 201);
    }

    public function update(Request $request, CollaborationEvent $event): JsonResponse
    {
        $this->authorize('update', $event);
        $data = $this->validatedEvent($request, true);
        $this->validateAssigneeAudience($data);
        $expectedVersion = (int) $data['version'];
        unset($data['version']);
        $before = $event->only(array_keys($data));

        $updated = DB::transaction(function () use ($event, $data, $expectedVersion, $before, $request) {
            $affected = CollaborationEvent::query()
                ->whereKey($event->id)
                ->where('version', $expectedVersion)
                ->update([...$data, 'version' => $expectedVersion + 1, 'updated_at' => now()]);

            abort_if($affected !== 1, 409, 'Agenda telah diperbarui user lain. Muat ulang kalender sebelum menyimpan kembali.');

            $fresh = $event->fresh();
            $this->audit($request->user(), $fresh, 'calendar_event_updated', 'Agenda kolaborasi diperbarui.', $before, $data);

            return $fresh;
        });

        $updated->load(['creator:id,name,department', 'assignee:id,name,department', 'ppbj:id,ppbj_no,uraian']);

        return response()->json([
            'message' => 'Agenda berhasil diperbarui.',
            'event' => $this->serializeCustomEvent($updated, $request->user()),
        ]);
    }

    public function updateStatus(Request $request, CollaborationEvent $event): JsonResponse
    {
        Gate::authorize('updateStatus', $event);
        $validated = $request->validate([
            'status' => ['required', Rule::in(self::STATUSES)],
            'version' => ['required', 'integer', 'min:1'],
        ]);

        $affected = CollaborationEvent::query()
            ->whereKey($event->id)
            ->where('version', $validated['version'])
            ->update([
                'status' => $validated['status'],
                'version' => $validated['version'] + 1,
                'updated_at' => now(),
            ]);

        abort_if($affected !== 1, 409, 'Status telah diperbarui user lain. Muat ulang kalender.');

        $updated = $event->fresh();
        $this->audit(
            $request->user(),
            $updated,
            'calendar_event_status_updated',
            'Status agenda kolaborasi diperbarui.',
            ['status' => $event->status],
            ['status' => $updated->status]
        );
        $updated->load(['creator:id,name,department', 'assignee:id,name,department', 'ppbj:id,ppbj_no,uraian']);

        return response()->json([
            'message' => 'Status agenda berhasil diperbarui.',
            'event' => $this->serializeCustomEvent($updated, $request->user()),
        ]);
    }

    public function destroy(Request $request, CollaborationEvent $event): JsonResponse
    {
        $this->authorize('delete', $event);
        $validated = $request->validate(['version' => ['required', 'integer', 'min:1']]);
        $snapshot = $event->only(['title', 'starts_at', 'ends_at', 'priority', 'status', 'audience']);

        DB::transaction(function () use ($event, $validated, $snapshot, $request) {
            $affected = CollaborationEvent::query()
                ->whereKey($event->id)
                ->where('version', $validated['version'])
                ->delete();

            abort_if($affected !== 1, 409, 'Agenda telah diperbarui user lain. Muat ulang kalender.');
            $this->audit($request->user(), $event, 'calendar_event_deleted', 'Agenda kolaborasi dihapus.', $snapshot, null);
        });

        return response()->json(['message' => 'Agenda berhasil dihapus.']);
    }

    private function validatedEvent(Request $request, bool $updating = false): array
    {
        $rules = [
            'title' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string', 'max:2000'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'all_day' => ['required', 'boolean'],
            'priority' => ['required', Rule::in(self::PRIORITIES)],
            'status' => ['required', Rule::in(self::STATUSES)],
            'audience' => ['required', Rule::in(['all', ...self::DEPARTMENTS])],
            'assignee_id' => ['nullable', 'integer', Rule::exists('users', 'id')->where('is_active', true)],
            'ppbj_no' => ['nullable', 'string', 'max:50', Rule::exists('ppbj', 'ppbj_no')],
        ];

        if ($updating) {
            $rules['version'] = ['required', 'integer', 'min:1'];
        }

        $data = $request->validate($rules);
        $ppbjNo = trim((string) ($data['ppbj_no'] ?? ''));
        unset($data['ppbj_no']);
        $data['ppbj_id'] = $ppbjNo !== ''
            ? Ppbj::query()->where('ppbj_no', $ppbjNo)->value('id')
            : null;
        $data['title'] = trim($data['title']);
        $data['description'] = filled($data['description'] ?? null) ? trim($data['description']) : null;
        $data['starts_at'] = Carbon::parse($data['starts_at']);
        $data['ends_at'] = filled($data['ends_at'] ?? null) ? Carbon::parse($data['ends_at']) : null;

        if ($data['all_day']) {
            $data['starts_at'] = $data['starts_at']->startOfDay();
            $data['ends_at'] = $data['ends_at']?->endOfDay();
        }

        return $data;
    }

    private function validateAssigneeAudience(array $data): void
    {
        if (empty($data['assignee_id']) || $data['audience'] === 'all') {
            return;
        }

        $matches = User::query()
            ->whereKey($data['assignee_id'])
            ->where('department', $data['audience'])
            ->where('is_active', true)
            ->exists();

        abort_unless($matches, 422, 'Penanggung jawab harus sesuai dengan audiens departemen.');
    }

    private function serializeCustomEvent(CollaborationEvent $event, User $user): array
    {
        return [
            'id' => $event->public_id,
            'source' => 'collaboration',
            'title' => $event->title,
            'description' => $event->description,
            'start' => $event->starts_at->toIso8601String(),
            'end' => $event->ends_at?->toIso8601String(),
            'all_day' => $event->all_day,
            'priority' => $event->priority,
            'status' => $event->status,
            'audience' => $event->audience,
            'creator' => $event->creator?->only(['name', 'department']),
            'assignee' => $event->assignee?->only(['id', 'name', 'department']),
            'ppbj' => $event->ppbj?->only(['id', 'ppbj_no', 'uraian']),
            'version' => $event->version,
            'can_edit' => Gate::forUser($user)->allows('update', $event),
            'can_status' => Gate::forUser($user)->allows('updateStatus', $event),
            'can_delete' => Gate::forUser($user)->allows('delete', $event),
            'url' => $event->ppbj ? $this->ppbjUrl($event->ppbj, $user) : null,
        ];
    }

    private function systemEvents(Carbon $start, Carbon $end, string $source, User $user)
    {
        $slaStart = $start->copy()->subDays(14);
        $rows = Ppbj::query()
            ->select([
                'id', 'ppbj_no', 'uraian', 'buyer', 'penyedia_eksternal', 'status', 'status_sla',
                'tgl_ppbj', 'tgl_terima_pr', 'tgl_diserahkan', 'target_sla_hari', 'total_sebelum_ppn',
                'tgl_spk', 'promised_date', 'closed_date', 'do_no', 'do_date', 'progres',
            ])
            ->where('status', '!=', 'CANCELLED')
            ->where(function (Builder $query) use ($start, $end, $slaStart) {
                $query->whereBetween('promised_date', [$start, $end])
                    ->orWhereBetween('closed_date', [$start, $end])
                    ->orWhereBetween('tgl_spk', [$start, $end])
                    ->orWhereBetween('do_date', [$start, $end])
                    ->orWhereBetween('tgl_diserahkan', [$slaStart, $end])
                    ->orWhereBetween('tgl_terima_pr', [$slaStart, $end])
                    ->orWhereBetween('tgl_ppbj', [$slaStart, $end]);
            })
            ->orderBy('id')
            ->limit(1500)
            ->get();

        return $rows->flatMap(function (Ppbj $ppbj) use ($start, $end, $source, $user) {
            $events = [];
            $url = $this->ppbjUrl($ppbj, $user);

            if (in_array($source, ['all', 'sla'], true)) {
                $slaDate = $ppbj->slaTargetDate();
                if ($slaDate && $slaDate->betweenIncluded($start, $end)) {
                    $events[] = $this->systemEvent($ppbj, 'sla', 'Target SLA', $slaDate, $url, [
                        'priority' => $slaDate->isPast() && ! $ppbj->isSlaComplete() ? 'critical' : 'high',
                        'description' => $ppbj->slaExplanation(),
                    ]);
                }
            }

            if (in_array($source, ['all', 'contract'], true)) {
                $deadline = $ppbj->contractEndDate();
                if ($deadline && $deadline->betweenIncluded($start, $end)) {
                    $remaining = now()->startOfDay()->diffInDays($deadline->copy()->startOfDay(), false);
                    $events[] = $this->systemEvent($ppbj, 'contract', 'Batas Pemenuhan', $deadline, $url, [
                        'priority' => $remaining <= 7 ? 'critical' : ($remaining <= 14 ? 'high' : 'normal'),
                        'description' => $ppbj->contractExplanation(),
                    ]);
                }
            }

            if (in_array($source, ['all', 'milestone'], true)) {
                $spk = $ppbj->contractStartDate();
                if ($spk && $spk->betweenIncluded($start, $end)) {
                    $events[] = $this->systemEvent($ppbj, 'milestone', 'SP/Kontrak Dibuat', $spk, $url);
                }

                $handover = $ppbj->handoverDate();
                if ($handover && $handover->betweenIncluded($start, $end)) {
                    $events[] = $this->systemEvent($ppbj, 'milestone', 'DO/BAST', $handover, $url, [
                        'description' => $ppbj->contractExplanation(),
                        'status' => $ppbj->isHandoverComplete() ? 'done' : 'in_progress',
                    ]);
                }
            }

            return $events;
        });
    }

    private function systemEvent(Ppbj $ppbj, string $source, string $label, Carbon $date, string $url, array $extra = []): array
    {
        return [
            'id' => "system:{$source}:{$ppbj->id}:{$date->toDateString()}",
            'source' => $source,
            'title' => "{$label} • {$ppbj->ppbj_no}",
            'description' => $extra['description'] ?? $ppbj->uraian,
            'start' => $date->copy()->startOfDay()->toIso8601String(),
            'end' => null,
            'all_day' => true,
            'priority' => $extra['priority'] ?? 'normal',
            'status' => $extra['status'] ?? 'planned',
            'audience' => 'all',
            'creator' => ['name' => 'SIMONPR', 'department' => 'system'],
            'assignee' => null,
            'ppbj' => $ppbj->only(['id', 'ppbj_no', 'uraian']),
            'version' => null,
            'can_edit' => false,
            'can_status' => false,
            'can_delete' => false,
            'url' => $url,
        ];
    }

    private function ppbjUrl(Ppbj $ppbj, User $user): string
    {
        return strtolower((string) $user->department) === 'umum'
            ? route('ppbj.index', ['search' => $ppbj->ppbj_no])
            : route('tracking.index', ['q' => $ppbj->ppbj_no]);
    }

    private function audit(User $user, CollaborationEvent $event, string $action, string $description, ?array $before, ?array $after): void
    {
        ActivityLog::create([
            'user_id' => $user->id,
            'model_type' => CollaborationEvent::class,
            'model_id' => $event->id,
            'action' => $action,
            'description' => $description,
            'changes' => [
                'public_id' => $event->public_id,
                'before' => $before,
                'after' => $after,
                'actor_department' => $user->department,
            ],
        ]);
    }

    private function ensureDepartment(?User $user): void
    {
        abort_unless($user && in_array(strtolower((string) $user->department), self::DEPARTMENTS, true), 403);
    }
}
