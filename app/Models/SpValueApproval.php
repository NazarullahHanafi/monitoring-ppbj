<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpValueApproval extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'snapshot' => 'array',
        'expires_at' => 'datetime',
        'decided_at' => 'datetime',
        'consumed_at' => 'datetime',
    ];

    public function requester()
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }
}
