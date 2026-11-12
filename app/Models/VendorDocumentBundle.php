<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VendorDocumentBundle extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $guarded = [];

    protected $hidden = ['documents', 'fingerprint', 'file'];

    protected function casts(): array
    {
        return ['vendor_id' => 'integer', 'user_id' => 'integer', 'documents' => 'array', 'completed' => 'integer', 'size' => 'integer', 'expires_at' => 'datetime'];
    }
}
