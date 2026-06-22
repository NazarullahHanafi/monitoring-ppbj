<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpMasterOption extends Model
{
    protected $fillable = [
        'type',
        'nama',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeActive($q)
    {
        return $q->where('is_active', true);
    }
}