<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterBuyer extends Model
{
    protected $table = 'master_buyer';
    public $timestamps = false;

    protected $fillable = ['nama'];
}
