<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class EnsureNotSoftMaintenance
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! Cache::get('simonpr:maintenance_mode', false)) {
            return $next($request);
        }

        if ($request->is('telegram/webhook/*') || $request->routeIs('telegram.webhook') || $request->is('up')) {
            return $next($request);
        }

        $message = 'SIMONPR sedang maintenance. Mohon coba lagi beberapa saat.';

        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'success' => false,
                'message' => $message,
                'error' => $message,
            ], 503);
        }

        return response(
            '<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>SIMONPR Maintenance</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:Montserrat,Arial,sans-serif;background:linear-gradient(135deg,#eef4ff,#f7f2ff);color:#0f172a}.card{max-width:560px;margin:24px;padding:36px;border-radius:28px;background:#fff;box-shadow:0 24px 80px rgba(15,23,42,.14);text-align:center}.icon{font-size:56px}.badge{display:inline-flex;margin-bottom:14px;padding:8px 14px;border-radius:999px;background:#fff7ed;color:#c2410c;font-weight:800}h1{margin:8px 0 12px;font-size:32px}p{margin:0;color:#475569;line-height:1.7}</style></head><body><main class="card"><div class="icon">🛠️</div><div class="badge">Maintenance Mode</div><h1>SIMONPR sedang dirapikan sebentar</h1><p>Website sementara tidak dapat diakses agar proses perawatan berjalan aman. Silakan coba lagi beberapa saat lagi.</p></main></body></html>',
            503,
            ['Content-Type' => 'text/html; charset=UTF-8']
        );
    }
}
