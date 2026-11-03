<?php

namespace App\Http\Middleware;

use App\Models\SecurityDeviceSession;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Crypt;
use Symfony\Component\HttpFoundation\Response;

class TrackAuthenticatedDevice
{
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }

    /**
     * Registry diperbarui setelah response selesai agar tidak menambah waktu
     * tunggu pengguna. Satu perangkat hanya menulis ke database tiap 5 menit.
     */
    public function terminate(Request $request, Response $response): void
    {
        $touchKey = null;
        try {
            $user = $request->user();
            $sessionId = (string) $request->session()->getId();

            if (! $user || $sessionId === '') {
                return;
            }

            // Navigasi halaman sudah cukup untuk menyegarkan registry perangkat.
            // Endpoint JSON/AJAX dan aksi tulis tidak perlu query telemetri tambahan.
            if (! $request->isMethod('GET') || $request->expectsJson() || $request->ajax()) {
                return;
            }

            $hash = hash_hmac('sha256', $sessionId, (string) config('app.key'));
            $key = 'security:device-touch:'.$hash;
            if (! Cache::add($key, true, now()->addMinutes(5))) {
                return;
            }
            $touchKey = $key;

            // The unique session_hash index makes this one atomic write, even
            // when two workers see the same device around cache expiry.
            SecurityDeviceSession::query()->upsert(
                [[
                    'session_hash' => $hash,
                    'session_id_encrypted' => Crypt::encryptString($sessionId),
                    'user_id' => $user->id,
                    'ip_address' => $request->ip(),
                    'user_agent' => mb_substr((string) $request->userAgent(), 0, 1000),
                    'last_activity_at' => now(),
                ]],
                ['session_hash'],
                ['session_id_encrypted', 'user_id', 'ip_address', 'user_agent', 'last_activity_at']
            );

            $this->pruneExpiredSessions();
        } catch (\Throwable) {
            // A transient DB failure must not hide the device for five minutes.
            if ($touchKey !== null) {
                try {
                    Cache::forget($touchKey);
                } catch (\Throwable) {
                    // Cache may itself be unavailable; leave the response intact.
                }
            }
            // Telemetri perangkat tidak boleh mengganggu request utama.
        }
    }

    private function pruneExpiredSessions(): void
    {
        $key = 'security:device-prune:v1';
        if (! Cache::add($key, true, now()->addHour())) {
            return;
        }

        try {
            // Cleanup is global, not once per device. Keep each sweep small and
            // use the activity index; never delete or revoke active sessions.
            $cutoff = now()->subDays(7);
            $ids = SecurityDeviceSession::query()->where('last_activity_at', '<', $cutoff)
                ->orderBy('last_activity_at')->limit(500)->pluck('id');
            if ($ids->isNotEmpty()) {
                SecurityDeviceSession::query()->whereIn('id', $ids)
                    ->where('last_activity_at', '<', $cutoff)->delete();
            }
        } catch (\Throwable $exception) {
            Cache::forget($key);
            throw $exception;
        }
    }
}
