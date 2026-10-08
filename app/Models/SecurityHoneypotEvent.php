<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SecurityHoneypotEvent extends Model
{
    protected $fillable = [
        'event_date',
        'ip_address',
        'hit_count',
        'unique_paths_count',
        'sample_paths',
        'statuses',
        'methods',
        'user_agent',
        'first_seen_at',
        'last_seen_at',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date',
            'sample_paths' => 'array',
            'statuses' => 'array',
            'methods' => 'array',
            'first_seen_at' => 'datetime',
            'last_seen_at' => 'datetime',
        ];
    }
}
