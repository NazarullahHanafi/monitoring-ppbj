<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpItem extends Model
{
    use HasFactory;

    protected $table = 'sp_items';

    protected $fillable = [
        'sp_id',
        'urutan',
        'nama_barang',
        'satuan',
        'jumlah',
        'harga_satuan',
        'subtotal',
        'tgl_pemenuhan',
    ];

    protected $casts = [
        'harga_satuan' => 'decimal:2',
        'subtotal' => 'decimal:2',
        'tgl_pemenuhan' => 'date',
    ];

    public function sp()
    {
        return $this->belongsTo(Sp::class);
    }
}