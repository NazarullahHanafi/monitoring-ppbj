<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PrReceiptApproval extends Model
{
    /**
     * Guarded kosong agar fleksibel
     */
    protected $fillable = [
        'torpr_id',
        'requested_by_user_id',
        'requested_name',
        'requested_at',
        'status',
        'approved_by_user_id',
        'approved_at',
        'rejected_by_user_id',
        'rejected_at',
        'rejected_reason',
        'resubmit_notes',
        'previous_rejection_id',
    ];

    /**
     * Cast kolom waktu ke Carbon instance
     */
    protected $casts = [
        'requested_at' => 'datetime',
        'approved_at'  => 'datetime',
        'rejected_at'  => 'datetime', // ✅ Tambahkan ini
    ];

    /**
     * ======================
     * RELASI
     * ======================
     */

    /**
     * Relasi ke TORPR
     */
    public function torpr(): BelongsTo
    {
        return $this->belongsTo(Torpr::class, 'torpr_id');
    }

    /**
     * User operasional yang mengajukan request
     */
    public function requestedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requested_by_user_id');
    }

    /**
     * User umum yang approve
     */
    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by_user_id');
    }

    /**
     * User umum yang reject (PENTING!)
     */
    public function rejectedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'rejected_by_user_id');
    }
}
