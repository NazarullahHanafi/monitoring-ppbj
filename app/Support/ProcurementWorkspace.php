<?php

namespace App\Support;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

final class ProcurementWorkspace
{
    public const COLUMNS = [
        'ppbj' => ['number' => 'PR / PPBJ', 'description' => 'Uraian', 'portfolio' => 'Portofolio', 'buyer' => 'Buyer', 'sla' => 'Sisa SLA', 'fulfillment' => 'Masa Pemenuhan', 'status' => 'Status', 'progress' => 'Progress', 'info' => 'Info', 'actions' => 'Action'],
        'sp' => ['row' => '#', 'number' => 'Nomor SP', 'date' => 'Tanggal SP', 'amount' => 'Nilai SP', 'pr' => 'Nomor PR', 'pr_amount' => 'Nilai PR', 'vendor' => 'Vendor', 'description' => 'Deskripsi', 'pic' => 'PIC', 'actions' => 'Aksi'],
        'spph' => ['row' => '#', 'number' => 'Nomor SPPH', 'date' => 'Tanggal', 'pr' => 'Nomor PR', 'vendor' => 'Vendor', 'description' => 'Deskripsi', 'pic' => 'PIC', 'actions' => 'Aksi'],
    ];

    public const FILTERS = [
        'ppbj' => ['search', 'uraian', 'amount', 'amount_fields', 'portofolio', 'buyer', 'penyedia_eksternal', 'general_registration', 'status_sla', 'progress', 'date_type', 'date_day', 'date_month', 'date_year', 'date_start', 'date_end', 'per_page'],
        'sp' => ['search', 'pic', 'dari', 'sampai', 'mode'],
        'spph' => ['search', 'pic', 'vendor', 'dari', 'sampai'],
    ];

    public static function defaults(string $page): array
    {
        return ['layout' => ['visible' => array_keys(self::COLUMNS[$page]), 'order' => array_keys(self::COLUMNS[$page]), 'density' => 'comfortable'], 'favorites' => []];
    }

    public static function cacheKey(int $userId, string $page): string
    {
        return "workspace:prefs:v1:{$userId}:{$page}";
    }

    public static function state(int $userId, string $page): array
    {
        return Cache::remember(self::cacheKey($userId, $page), 60, function () use ($userId, $page) {
            $row = DB::table('user_table_preferences')->where('user_id', $userId)->where('page', $page)->first(['settings', 'version']);

            return ['version' => (int) ($row->version ?? 0), 'settings' => $row ? json_decode($row->settings, true) : self::defaults($page)];
        });
    }
}
