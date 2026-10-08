<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SecurityDeviceSession extends Model
{
    protected $fillable = [
        'session_hash',
        'session_id_encrypted',
        'user_id',
        'ip_address',
        'user_agent',
        'last_activity_at',
    ];

    protected $hidden = [
        'session_id_encrypted',
    ];

    protected function casts(): array
    {
        return [
            'last_activity_at' => 'datetime',
        ];
    }
}
