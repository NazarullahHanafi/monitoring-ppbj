<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProcurementDetailAttachment extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $guarded = [];

    protected $hidden = ['path', 'sha256'];

    protected $casts = ['reviewed_at' => 'datetime', 'version' => 'integer'];
}
