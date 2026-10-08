<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class CollaborationEvent extends Model
{
    protected $fillable = [
        'title',
        'description',
        'starts_at',
        'ends_at',
        'all_day',
        'priority',
        'status',
        'audience',
        'creator_id',
        'assignee_id',
        'ppbj_id',
        'version',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'all_day' => 'boolean',
        'version' => 'integer',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $event) {
            $event->public_id ??= (string) Str::uuid();
        });
    }

    public function getRouteKeyName(): string
    {
        return 'public_id';
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }

    public function ppbj(): BelongsTo
    {
        return $this->belongsTo(Ppbj::class, 'ppbj_id');
    }

    public function scopeVisibleTo(Builder $query, User $user): Builder
    {
        $department = strtolower(trim((string) $user->department));

        return $query->where(function (Builder $visibility) use ($user, $department) {
            $visibility->where('audience', 'all')
                ->orWhere('audience', $department)
                ->orWhere('creator_id', $user->id)
                ->orWhere('assignee_id', $user->id);
        });
    }
}
