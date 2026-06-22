<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpphItem extends Model
{
    protected $table = 'spph_items';

    protected $fillable = [
        'spph_id',
        'urutan',
        'nama_barang',
        'satuan',
        'jumlah',
        'tgl_pemenuhan',
    ];

    protected $casts = [
        'tgl_pemenuhan' => 'date',
    ];

    public function spph()
    {
        return $this->belongsTo(Spph::class);
    }
}   