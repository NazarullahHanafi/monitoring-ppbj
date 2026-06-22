<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterPenyediaEksternal extends Model
{
    protected $table = 'master_penyedia_eksternal';
    public $timestamps = false;

    protected $fillable = ['nama'];
}
