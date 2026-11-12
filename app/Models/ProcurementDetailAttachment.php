<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProcurementDetailAttachment extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $guarded = [];

    // Keep the new in-memory model in sync with the database default so upload
    // responses and their audit records can be used for immediate confirmation.
    protected $attributes = ['version' => 1];

    protected $hidden = ['path', 'sha256'];

    protected $casts = ['reviewed_at' => 'datetime', 'version' => 'integer'];
}
