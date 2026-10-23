<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterPenyediaEksternal extends Model
{
    protected $table = 'master_penyedia_eksternal';
    public $timestamps = false;

    protected $fillable = ['nama'];

    protected static function booted(): void
    {
        static::saved(fn () => \App\Support\PpbjVendorFilter::forget());
        static::deleted(fn () => \App\Support\PpbjVendorFilter::forget());
    }
}
