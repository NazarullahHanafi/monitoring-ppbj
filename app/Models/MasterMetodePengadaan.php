<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterMetodePengadaan extends Model
{
    protected $table = 'master_metode_pengadaan';
    public $timestamps = false;

    protected $fillable = ['nama'];
}
