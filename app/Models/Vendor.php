<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;

class Vendor extends Model
{
    use HasFactory;

    protected $table = 'vendors';

    protected $fillable = [
        'nama_vendor',
        'alamat',
        'telepon',
        'fax',
        'email',
        'npwp',
        'direktur',
        'jabatan',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // ===== CACHE INVALIDATION =====
    protected static function booted(): void
    {
        $forget = function () {
            Cache::forget('vendors:active');
            Cache::forget('vendor:stats');
        };

        static::saved($forget);
        static::deleted($forget);
    }

    // ===== RELASI =====

    public function sps()
    {
        return $this->hasMany(Sp::class, 'nama_vendor', 'nama_vendor');
    }

    // ===== SCOPE =====

    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true);
    }
}