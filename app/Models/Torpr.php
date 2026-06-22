<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Torpr extends Model
{
    protected $fillable = [
        'tujuan_pengadaan',
        'portofolio',
        'nomor_pr',
        'tanggal_pr',
        'jumlah_pr',
        'tgl_ttd_kabid_pr',
        'tgl_ttd_kacab_pr',
        'sign_token_kabid',
        'sign_token_kacab',
        'sign_token_kabid_expires_at',
        'sign_token_kacab_expires_at',
        'signed_by_kabid_name',
        'signed_by_kacab_name',
        'received_by_umum_user_id',
        'received_at',
        'created_by_user_id',
    ];

    protected $casts = [
        // ❌ REMOVED: tanggal_tor, tgl_ttd_kabid_tor, tgl_ttd_kacab_tor, tgl_permintaan, tgl_dibutuhkan
        
        // ✅ KEEP THESE:
        'tanggal_pr' => 'datetime',
        'tgl_ttd_kabid_pr' => 'datetime',
        'tgl_ttd_kacab_pr' => 'datetime',
        'received_at' => 'datetime',
        'sign_token_kabid_expires_at' => 'datetime',
        'sign_token_kacab_expires_at' => 'datetime',
    ];

    public function receiptApprovals(): HasMany
    {
        return $this->hasMany(PrReceiptApproval::class, 'torpr_id');
    }

    public function latestReceiptApproval()
    {
        return $this->hasOne(PrReceiptApproval::class, 'torpr_id')->latestOfMany();
    }

    public function receivedByUmum(): BelongsTo
    {
        return $this->belongsTo(User::class, 'received_by_umum_user_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }
}
