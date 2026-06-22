<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterPortofolio extends Model
{
    protected $table = 'master_portofolio';
    public $timestamps = false;

    protected $fillable = ['nama'];
}
