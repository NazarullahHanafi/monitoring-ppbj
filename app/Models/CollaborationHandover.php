<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;

class CollaborationHandover extends Model
{
    public const ACTIVE_STATUSES = ['sent', 'acknowledged', 'in_progress', 'returned'];

    protected $fillable = [
        'title', 'description', 'from_department', 'to_department', 'priority', 'status',
        'due_at', 'checklist', 'last_note', 'metadata', 'version', 'created_by_user_id',
        'assigned_to_user_id', 'acknowledged_by_user_id', 'completed_by_user_id',
        'ppbj_id', 'torpr_id', 'acknowledged_at', 'started_at', 'completed_at', 'returned_at',
    ];

    protected $casts = [
        'due_at' => 'datetime',
        'checklist' => 'array',
        'metadata' => 'array',
        'version' => 'integer',
        'acknowledged_at' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'returned_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $handover) {
            $handover->public_id ??= (string) Str::uuid();
        });
    }

    public function getRouteKeyName(): string
    {
        return 'public_id';
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to_user_id');
    }

    public function acknowledgedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'acknowledged_by_user_id');
    }

    public function completedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'completed_by_user_id');
    }

    public function ppbj(): BelongsTo
    {
        return $this->belongsTo(Ppbj::class, 'ppbj_id');
    }

    public function torpr(): BelongsTo
    {
        return $this->belongsTo(Torpr::class, 'torpr_id');
    }

    public function activities(): MorphMany
    {
        return $this->morphMany(ActivityLog::class, 'model');
    }

    public function scopeVisibleTo(Builder $query, User $user): Builder
    {
        $department = strtolower(trim((string) $user->department));

        return $query->where(function (Builder $visible) use ($user, $department) {
            $visible->where('from_department', $department)
                ->orWhere('to_department', $department)
                ->orWhere('created_by_user_id', $user->id)
                ->orWhere('assigned_to_user_id', $user->id);
        });
    }

    public function isOverdue(): bool
    {
        return in_array($this->status, self::ACTIVE_STATUSES, true)
            && $this->due_at?->isPast();
    }

    public function checklistProgress(): array
    {
        $items = collect($this->checklist ?? []);
        $checked = $items->where('checked', true)->count();
        $total = $items->count();

        return [
            'checked' => $checked,
            'total' => $total,
            'percent' => $total > 0 ? (int) round(($checked / $total) * 100) : 100,
        ];
    }
}
