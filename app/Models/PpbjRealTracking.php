<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PpbjRealTracking extends Model
{
    protected $fillable = [
        'ppbj_id',
        'status_key',
        'title',
        'description',
        'event_date',
        'reminder_date',
        'created_by_user_id',
        'updated_by_user_id',
    ];

    protected $casts = [
        'event_date' => 'date',
        'reminder_date' => 'date',
    ];

    public function ppbj()
    {
        return $this->belongsTo(Ppbj::class, 'ppbj_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by_user_id');
    }
}
