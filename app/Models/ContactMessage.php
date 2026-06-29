<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'ip_address',
        'user_agent',
        'read_at',
        'read_by_user_id',
    ];

    protected function casts(): array
    {
        return [
            'read_at' => 'datetime',
        ];
    }

    public function readBy()
    {
        return $this->belongsTo(User::class, 'read_by_user_id');
    }

    public function getIsUnreadAttribute(): bool
    {
        return $this->read_at === null;
    }
}
