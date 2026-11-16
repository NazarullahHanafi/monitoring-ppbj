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
            $types = array_unique(array_filter([$option->type, $option->getRawOriginal('type')]));
            $option->getConnection()->afterCommit(function () use ($types) {
                foreach ($types as $type) {
                    Cache::forget("sp_master_options:{$type}:active_names");
                }
            });
        };

        static::created($forget);
        static::updated($forget);
        static::deleted($forget);
    }

    public function scopeActive($q)
    {
        return $q->where('is_active', true);
    }
}
