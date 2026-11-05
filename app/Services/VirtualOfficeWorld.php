<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class VirtualOfficeWorld
{
    public const KEY = 'office:world:v1';

    public static function canConfigure(User $user): bool
    {
        return $user->role === 'superadmin' && $user->department === 'umum';
    }

    public static function defaults(): array
    {
        return ['landscape' => 'alps', 'weather' => 'auto', 'cycle_hours' => 3, 'particles' => 'low', 'mountains' => true, 'clouds' => true];
    }

    public function snapshot(): array
    {
        $data = Cache::remember(self::KEY, 300, function () {
            $row = DB::table('virtual_office_world')->where('id', 1)->first();
            return ['settings' => $row ? (json_decode($row->settings, true) ?: self::defaults()) : self::defaults(), 'version' => $row?->version ?? 0];
        });
        return $data + ['server_ms' => now()->getTimestampMs()];
    }
}
