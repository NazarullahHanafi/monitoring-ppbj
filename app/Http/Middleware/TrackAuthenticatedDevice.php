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

            if (! Cache::add('security:device-touch:'.$hash, true, now()->addMinutes(5))) {
                return;
            }

            SecurityDeviceSession::query()->updateOrCreate(
                ['session_hash' => $hash],
                [
                    'session_id_encrypted' => Crypt::encryptString($sessionId),
                    'user_id' => $user->id,
                    'ip_address' => $request->ip(),
                    'user_agent' => mb_substr((string) $request->userAgent(), 0, 1000),
                    'last_activity_at' => now(),
                ]
            );

            SecurityDeviceSession::query()
                ->where('last_activity_at', '<', now()->subDays(7))
                ->delete();
        } catch (\Throwable) {
            // Telemetri perangkat tidak boleh mengganggu request utama.
        }
    }
}
