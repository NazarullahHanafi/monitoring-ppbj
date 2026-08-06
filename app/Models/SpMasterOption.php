<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

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

    protected static function booted(): void
    {
        $forget = function (SpMasterOption $option) {
            Cache::forget("sp_master_options:{$option->type}:active_names");
        };

        static::saved($forget);
        static::deleted($forget);
    }

    public function scopeActive($q)
    {
        return $q->where('is_active', true);
    }
}
