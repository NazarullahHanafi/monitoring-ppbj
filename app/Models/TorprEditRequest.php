<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TorprEditRequest extends Model
{
    protected $fillable = [
        'torpr_id',
        'requester_user_id',
        'owner_user_id',
        'reviewed_by_user_id',
        'status',
        'reason',
        'review_note',
        'reviewed_at',
        'expires_at',
    ];

    protected $casts = [
        'reviewed_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    public function torpr(): BelongsTo
    {
        return $this->belongsTo(Torpr::class);
    }

    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requester_user_id');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_user_id');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by_user_id');
    }
}
