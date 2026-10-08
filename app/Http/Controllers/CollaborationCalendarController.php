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
use Illuminate\Support\Facades\Cache;
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

        $portfolios = Cache::remember('collaboration_calendar_portfolios_v1', 1800, fn () => Ppbj::query()
            ->whereNotNull('portofolio')
            ->where('portofolio', '!=', '')
            ->distinct()
            ->orderBy('portofolio')
            ->limit(200)
            ->pluck('portofolio'));

        return view('collaboration-calendar.index', compact('users', 'portfolios'));
    }

    public function searchPpbj(Request $request): JsonResponse
    {
        $this->ensureDepartment($request->user());

        $validated = $request->validate([
            'q' => ['nullable', 'string', 'max:120'],
            'portfolio' => ['nullable', 'string', 'max:100'],
            'receiver_id' => ['nullable', 'integer', Rule::exists('users', 'id')->where('is_active', true)],
            'date_from' => ['nullable', 'date_format:Y-m-d'],
            'date_to' => ['nullable', 'date_format:Y-m-d', 'after_or_equal:date_from'],
        ]);

        $term = trim((string) ($validated['q'] ?? ''));
        abort_if($term !== '' && mb_strlen($term) < 2, 422, 'Ketik minimal 2 karakter untuk mencari PR.');

        $rows = Ppbj::query()
            ->select([
                'id', 'ppbj_no', 'uraian', 'portofolio', 'buyer', 'created_by_user_id',
                'general_registration_number', 'general_registered_at', 'general_registered_by_user_id',
                'tgl_ppbj', 'tgl_terima_pr', 'tgl_diserahkan', 'total_sebelum_ppn',
                'penyedia_eksternal', 'pemenang', 'status', 'status_sla',
            ])
            ->with([
                'createdBy:id,name,department',
                'generalRegisteredBy:id,name,department',
            ])
            ->when($term !== '', function (Builder $query) use ($term) {
                $like = '%'.addcslashes($term, '%_\\').'%';

                $query->where(function (Builder $search) use ($like) {
                    $search->where('ppbj_no', 'like', $like)
                        ->orWhere('uraian', 'like', $like)
                        ->orWhere('buyer', 'like', $like)
                        ->orWhere('penyedia_eksternal', 'like', $like)
                        ->orWhere('pemenang', 'like', $like)
                        ->orWhere('general_registration_number', 'like', $like)
                        ->orWhereHas('generalRegisteredBy', fn (Builder $receiver) => $receiver->where('name', 'like', $like));
                });
            })
            ->when(filled($validated['portfolio'] ?? null), fn (Builder $query) => $query->where('portofolio', $validated['portfolio']))
            ->when(filled($validated['receiver_id'] ?? null), fn (Builder $query) => $query->where('general_registered_by_user_id', $validated['receiver_id']))
            ->when(filled($validated['date_from'] ?? null), fn (Builder $query) => $query->whereDate('tgl_ppbj', '>=', $validated['date_from']))
            ->when(filled($validated['date_to'] ?? null), fn (Builder $query) => $query->whereDate('tgl_ppbj', '<=', $validated['date_to']))
            ->when(
                $term !== '',
                fn (Builder $query) => $query
                    ->orderByRaw('CASE WHEN ppbj_no = ? THEN 0 WHEN ppbj_no LIKE ? THEN 1 WHEN uraian LIKE ? THEN 2 ELSE 3 END', [
                        $term,
                        addcslashes($term, '%_\\').'%',
                        addcslashes($term, '%_\\').'%',
                    ])
                    ->latest('id'),
                fn (Builder $query) => $query->latest('tgl_ppbj')->latest('id')
            )
            ->limit(12)
            ->get();

        return response()->json([
            'results' => $rows->map(fn (Ppbj $ppbj) => [
                'id' => $ppbj->id,
                'ppbj_no' => $ppbj->ppbj_no,
                'description' => $ppbj->uraian,
                'portfolio' => $ppbj->portofolio,
                'buyer' => $ppbj->buyer,
                'creator' => $ppbj->createdBy?->only(['id', 'name', 'department']),
                'receiver' => $ppbj->generalRegisteredBy?->only(['id', 'name', 'department']),
                'registration_number' => $ppbj->general_registration_number,
                'pr_date' => $this->journeyDate($ppbj->tgl_ppbj),
                'pr_date_raw' => $ppbj->tgl_ppbj,
                'received_date' => $this->journeyDate($ppbj->general_registered_at ?: $ppbj->tgl_terima_pr ?: $ppbj->tgl_diserahkan, filled($ppbj->general_registered_at)),
                'value' => $this->journeyMoney($ppbj->total_sebelum_ppn),
                'value_raw' => (float) ($ppbj->total_sebelum_ppn ?? 0),
                'vendor' => $ppbj->penyedia_eksternal ?: $ppbj->pemenang,
                'status' => $ppbj->status,
                'sla_status' => $ppbj->status_sla,
            ])->values(),
            'meta' => [
                'shown' => $rows->count(),
                'limit' => 12,
                'has_filters' => $term !== '' || filled($validated['portfolio'] ?? null) || filled($validated['receiver_id'] ?? null)
                    || filled($validated['date_from'] ?? null) || filled($validated['date_to'] ?? null),
            ],
        ]);
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

    public function journey(Request $request, Ppbj $ppbj): JsonResponse
    {
        $this->ensureDepartment($request->user());

        $ppbj->load([
            'createdBy:id,name,department',
            'generalRegisteredBy:id,name,department',
            'goodsArrivedBy:id,name,department',
            'goodsConfirmedBy:id,name,department',
            'doUpdatedBy:id,name,department',
            'spphs' => fn ($query) => $query
                ->select(['spphs.id', 'nomor_spph', 'tanggal', 'nama_vendor', 'pic', 'created_by_user_id'])
                ->orderBy('tanggal'),
            'spphs.createdBy:id,name,department',
            'sps' => fn ($query) => $query
                ->select(['sps.id', 'nomor_sp', 'tanggal_sp', 'nilai_sp', 'nama_vendor', 'pic', 'promised_date', 'created_by_user_id'])
                ->orderBy('tanggal_sp'),
            'sps.createdBy:id,name,department',
            'realTrackings' => fn ($query) => $query
                ->with(['createdBy:id,name,department', 'updatedBy:id,name,department'])
                ->latest('event_date')
                ->latest('id')
                ->limit(30),
        ]);

        $audits = ActivityLog::query()
            ->with('user:id,name,department')
            ->where('model_type', Ppbj::class)
            ->where('model_id', $ppbj->id)
            ->latest('id')
            ->limit(30)
            ->get()
            ->map(fn (ActivityLog $log) => [
                'title' => $log->description ?: ucfirst(str_replace('_', ' ', $log->action)),
                'action' => $log->action,
                'actor' => $this->journeyActor($log->user, 'Sistem'),
                'date' => $this->journeyDate($log->created_at, true),
            ])
            ->values();

        $stages = $this->journeyStages($ppbj);
        $completed = collect($stages)->where('state', 'done')->count();

        return response()->json([
            'record' => [
                'ppbj_no' => $ppbj->ppbj_no,
                'description' => $ppbj->uraian,
                'portfolio' => $ppbj->portofolio,
                'buyer' => $ppbj->buyer,
                'vendor' => $ppbj->penyedia_eksternal ?: $ppbj->pemenang,
                'method' => $ppbj->metode_pengadaan,
                'status' => $ppbj->status,
                'sla_status' => $ppbj->status_sla,
                'progress' => (float) ($ppbj->progres ?? 0),
                'pr_value' => $this->journeyMoney($ppbj->total_sebelum_ppn),
                'sp_value' => $this->journeyMoney($ppbj->nilai_sp_spk),
                'registration_number' => $ppbj->general_registration_number,
                'completed_stages' => $completed,
                'total_stages' => count($stages),
            ],
            'stages' => $stages,
            'tracking' => $ppbj->realTrackings->map(fn ($tracking) => [
                'title' => $tracking->title,
                'description' => $tracking->description,
                'date' => $this->journeyDate($tracking->event_date ?: $tracking->created_at),
                'reminder' => $this->journeyDate($tracking->reminder_date),
                'actor' => $this->journeyActor($tracking->updatedBy ?: $tracking->createdBy, 'Sistem'),
            ])->values(),
            'audit' => $audits,
            'management_url' => $this->ppbjUrl($ppbj, $request->user()),
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

    private function journeyStages(Ppbj $ppbj): array
    {
        $spphDocuments = $ppbj->spphs->map(fn ($spph) => [
            'number' => $spph->nomor_spph,
            'date' => $this->journeyDate($spph->tanggal),
            'value' => $spph->nama_vendor,
            'actor' => $this->journeyActor($spph->createdBy, $spph->pic ?: 'Tim Umum', 'umum'),
        ])->values()->all();

        if ($spphDocuments === [] && filled($ppbj->spph_rfq_1)) {
            $spphDocuments[] = [
                'number' => $ppbj->spph_rfq_1,
                'date' => $this->journeyDate($ppbj->tgl_spph),
                'value' => $ppbj->penyedia_eksternal,
                'actor' => $this->journeyActor(null, 'Tim Umum', 'umum'),
            ];
        }

        $spDocuments = $ppbj->sps->map(fn ($sp) => [
            'number' => $sp->nomor_sp,
            'date' => $this->journeyDate($sp->tanggal_sp),
            'value' => $this->journeyMoney($sp->nilai_sp),
            'vendor' => $sp->nama_vendor,
            'promised_date' => $this->journeyDate($sp->promised_date),
            'actor' => $this->journeyActor($sp->createdBy, $sp->pic ?: 'Tim Umum', 'umum'),
        ])->values()->all();

        if ($spDocuments === [] && filled($ppbj->awarding_sp)) {
            $spDocuments[] = [
                'number' => $ppbj->awarding_sp,
                'date' => $this->journeyDate($ppbj->tgl_spk ?: $ppbj->tgl_awarding_sp),
                'value' => $this->journeyMoney($ppbj->nilai_sp_spk),
                'vendor' => $ppbj->penyedia_eksternal ?: $ppbj->pemenang,
                'promised_date' => $this->journeyDate($ppbj->promised_date),
                'actor' => $this->journeyActor(null, 'Tim Umum', 'umum'),
            ];
        }

        $stages = [
            [
                'key' => 'origin',
                'label' => 'PR Dibuat',
                'done' => filled($ppbj->ppbj_no),
                'date' => $this->journeyDate($ppbj->tgl_ppbj ?: $ppbj->created_at, ! filled($ppbj->tgl_ppbj)),
                'actor' => $this->journeyActor($ppbj->createdBy, $ppbj->buyer ?: 'Pembuat belum tercatat'),
                'summary' => 'Permintaan pengadaan dibuat dan masuk ke alur SIMONPR.',
                'details' => array_values(array_filter([
                    $ppbj->portofolio ? 'Portofolio: '.$ppbj->portofolio : null,
                    $ppbj->buyer ? 'Buyer/PIC: '.$ppbj->buyer : null,
                    $ppbj->total_sebelum_ppn !== null ? 'Nilai PR: '.$this->journeyMoney($ppbj->total_sebelum_ppn) : null,
                ])),
                'documents' => [],
            ],
            [
                'key' => 'receipt',
                'label' => 'Diterima & Diregistrasi Umum',
                'done' => filled($ppbj->general_registration_number) || filled($ppbj->tgl_terima_pr) || filled($ppbj->tgl_diserahkan),
                'date' => $this->journeyDate($ppbj->general_registered_at ?: $ppbj->tgl_terima_pr ?: $ppbj->tgl_diserahkan, filled($ppbj->general_registered_at)),
                'actor' => $this->journeyActor($ppbj->generalRegisteredBy, 'Tim Umum', 'umum'),
                'summary' => filled($ppbj->general_registration_number)
                    ? 'PR diterima Umum dengan registrasi '.$ppbj->general_registration_number.'.'
                    : 'PR telah diserahkan/diterima Umum; nomor registrasi belum tercatat.',
                'details' => array_values(array_filter([
                    $ppbj->general_registration_number ? 'Registrasi: '.$ppbj->general_registration_number : null,
                    $ppbj->tgl_diserahkan ? 'Diserahkan: '.$this->journeyDate($ppbj->tgl_diserahkan) : null,
                    $ppbj->tgl_terima_pr ? 'Diterima: '.$this->journeyDate($ppbj->tgl_terima_pr) : null,
                ])),
                'documents' => [],
            ],
            [
                'key' => 'spph',
                'label' => 'SPPH / RFQ',
                'done' => $spphDocuments !== [],
                'date' => $spphDocuments[0]['date'] ?? $this->journeyDate($ppbj->tgl_spph),
                'actor' => $spphDocuments[0]['actor'] ?? $this->journeyActor(null, 'Tim Umum', 'umum'),
                'summary' => $spphDocuments !== [] ? count($spphDocuments).' dokumen permintaan penawaran tercatat.' : 'SPPH/RFQ belum diterbitkan.',
                'details' => array_values(array_filter([
                    $ppbj->rfq_2 ? 'RFQ 2: '.$ppbj->rfq_2 : null,
                    $ppbj->rfq_3 ? 'RFQ 3: '.$ppbj->rfq_3 : null,
                ])),
                'documents' => $spphDocuments,
            ],
            [
                'key' => 'selection',
                'label' => 'Evaluasi & Penetapan Pemenang',
                'done' => filled($ppbj->sph) || filled($ppbj->pemenang) || filled($ppbj->penyedia_eksternal),
                'date' => $this->journeyDate($ppbj->tgl_pemenang ?: $ppbj->tgl_sph),
                'actor' => $this->journeyActor(null, 'Tim Umum', 'umum'),
                'summary' => filled($ppbj->pemenang ?: $ppbj->penyedia_eksternal)
                    ? 'Penyedia terpilih: '.($ppbj->pemenang ?: $ppbj->penyedia_eksternal).'.'
                    : 'Evaluasi penawaran atau penetapan pemenang belum lengkap.',
                'details' => array_values(array_filter([
                    $ppbj->sph ? 'SPH: '.$ppbj->sph : null,
                    $ppbj->pemenang ? 'Pemenang: '.$ppbj->pemenang : null,
                    $ppbj->penyedia_eksternal ? 'Penyedia: '.$ppbj->penyedia_eksternal : null,
                ])),
                'documents' => [],
            ],
            [
                'key' => 'contract',
                'label' => 'SP / Kontrak',
                'done' => $spDocuments !== [],
                'date' => $spDocuments[0]['date'] ?? $this->journeyDate($ppbj->tgl_spk ?: $ppbj->tgl_awarding_sp),
                'actor' => $spDocuments[0]['actor'] ?? $this->journeyActor(null, 'Tim Umum', 'umum'),
                'summary' => $spDocuments !== [] ? count($spDocuments).' SP/kontrak terhubung ke PR ini.' : 'SP/kontrak belum diterbitkan.',
                'details' => array_values(array_filter([
                    $ppbj->nilai_sp_spk !== null ? 'Nilai SP: '.$this->journeyMoney($ppbj->nilai_sp_spk) : null,
                    $ppbj->promised_date ? 'Target pemenuhan: '.$this->journeyDate($ppbj->promised_date) : null,
                    $ppbj->closed_date ? 'Closed date: '.$this->journeyDate($ppbj->closed_date) : null,
                ])),
                'documents' => $spDocuments,
            ],
            [
                'key' => 'handover',
                'label' => 'Pemenuhan & Serah Terima',
                'done' => filled($ppbj->do_no) && filled($ppbj->do_date),
                'date' => $this->journeyDate($ppbj->do_date ?: $ppbj->goods_confirmed_at ?: $ppbj->goods_arrived_at),
                'actor' => $this->journeyActor($ppbj->doUpdatedBy ?: $ppbj->goodsConfirmedBy ?: $ppbj->goodsArrivedBy, 'Belum tercatat'),
                'summary' => filled($ppbj->do_no)
                    ? 'Dokumen serah terima tercatat: '.$ppbj->do_no.'.'
                    : 'Nomor dan tanggal DO/Surat Jalan/BAST belum lengkap.',
                'details' => array_values(array_filter([
                    $ppbj->goods_arrived_at ? 'Barang datang: '.$this->journeyDate($ppbj->goods_arrived_at, true).' oleh '.$this->journeyActor($ppbj->goodsArrivedBy)['name'] : null,
                    $ppbj->goods_confirmed_at ? 'Dikonfirmasi: '.$this->journeyDate($ppbj->goods_confirmed_at, true).' oleh '.$this->journeyActor($ppbj->goodsConfirmedBy)['name'] : null,
                    $ppbj->do_no ? 'DO/Surat Jalan/BAST: '.$ppbj->do_no : null,
                    $ppbj->do_date ? 'Tanggal dokumen: '.$this->journeyDate($ppbj->do_date) : null,
                ])),
                'documents' => [],
            ],
            [
                'key' => 'finance',
                'label' => 'BPG / BPB',
                'done' => filled($ppbj->bpg_no) || filled($ppbj->bpb_no),
                'date' => $this->journeyDate($ppbj->tgl_bpg ?: $ppbj->tgl_bpb),
                'actor' => $this->journeyActor(null, 'Tim Keuangan / Umum'),
                'summary' => filled($ppbj->bpg_no ?: $ppbj->bpb_no) ? 'Dokumen proses keuangan telah tercatat.' : 'Dokumen BPG/BPB belum tercatat.',
                'details' => array_values(array_filter([
                    $ppbj->bpg_no ? 'BPG: '.$ppbj->bpg_no : null,
                    $ppbj->nilai_bpg !== null ? 'Nilai BPG: '.$this->journeyMoney($ppbj->nilai_bpg) : null,
                    $ppbj->bpb_no ? 'BPB: '.$ppbj->bpb_no : null,
                    $ppbj->receiving_transaction ? 'Receiving transaction: '.$ppbj->receiving_transaction : null,
                ])),
                'documents' => [],
            ],
            [
                'key' => 'invoice',
                'label' => 'Invoice Terbit',
                'done' => filled($ppbj->no_invoice) && filled($ppbj->tgl_invoice),
                'date' => $this->journeyDate($ppbj->tgl_invoice),
                'actor' => $this->journeyActor(null, 'Tim Keuangan / Umum'),
                'summary' => filled($ppbj->no_invoice)
                    ? 'Invoice tercatat dengan nomor '.$ppbj->no_invoice.'.'
                    : 'Invoice belum diterbitkan atau belum dicatat.',
                'details' => array_values(array_filter([
                    $ppbj->no_invoice ? 'Nomor invoice: '.$ppbj->no_invoice : null,
                    $ppbj->tgl_invoice ? 'Tanggal invoice: '.$this->journeyDate($ppbj->tgl_invoice) : null,
                    $ppbj->keterangan ? 'Keterangan: '.$ppbj->keterangan : null,
                ])),
                'documents' => [],
            ],
        ];

        $currentAssigned = false;

        return collect($stages)->map(function (array $stage) use (&$currentAssigned) {
            if ($stage['done']) {
                $stage['state'] = 'done';
            } elseif (! $currentAssigned) {
                $stage['state'] = 'current';
                $currentAssigned = true;
            } else {
                $stage['state'] = 'waiting';
            }

            unset($stage['done']);

            return $stage;
        })->values()->all();
    }

    private function journeyActor(?User $user, ?string $fallback = null, ?string $department = null): array
    {
        return [
            'name' => $user?->name ?: ($fallback ?: 'Belum tercatat'),
            'department' => strtolower((string) ($user?->department ?: $department ?: 'system')),
        ];
    }

    private function journeyDate(mixed $value, bool $withTime = false): ?string
    {
        if (blank($value)) {
            return null;
        }

        try {
            $date = Carbon::parse($value)->locale('id');

            return $withTime ? $date->translatedFormat('d M Y H:i') : $date->translatedFormat('d M Y');
        } catch (\Throwable) {
            return null;
        }
    }

    private function journeyMoney(mixed $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        return 'Rp '.number_format((float) $value, 0, ',', '.');
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
