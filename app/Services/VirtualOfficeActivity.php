<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class VirtualOfficeActivity
{
    // Only coarse, public menu names. Never store URLs, query strings, record
    // identifiers, form contents, owner tools, or authentication pages here.
    public const MENUS = [
        'virtual-office' => 'Kantor Virtual', 'ppbj' => 'PPBJ', 'sp' => 'Surat Pesanan',
        'spph' => 'SPPH', 'tracking-pr' => 'Tracking PR', 'dashboard' => 'Dashboard',
        'collaboration-calendar' => 'Kalender Bersama', 'collaboration-inbox' => 'Action Inbox',
        'procurement-documents' => 'Dokumen Pengadaan',
    ];

    public static function menuForRoute(?string $route): ?string
    {
        if (str_starts_with((string) $route, 'ops.dashboard')) return 'dashboard';
        $prefix = explode('.', (string) $route)[0];
        if ($prefix === 'tracking') return 'tracking-pr';
        return isset(self::MENUS[$prefix]) ? $prefix : null;
    }

    public function record(User $user, string $menu): void
    {
        if (! isset(self::MENUS[$menu]) || ! $user->is_active || ! $user->shouldDisplayInPresence()
            || ! in_array($user->department, ['umum', 'operasional'], true)) {
            return;
        }
        Cache::put('office:menu:'.$user->id, $menu, 300);
        $key = 'office:visit:'.$user->id;
        if (Cache::get($key) === $menu) {
            return;
        }
        DB::table('virtual_office_visits')->insert(['user_id' => $user->id, 'menu' => $menu, 'visited_at' => now()]);
        Cache::put($key, $menu, 300);
    }
}
