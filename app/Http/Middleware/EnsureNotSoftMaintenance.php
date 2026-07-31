<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class EnsureNotSoftMaintenance
{
    public function handle(Request $request, Closure $next): Response
    {
        $this->expireMaintenanceIfNeeded();

        if (! Cache::get('simonpr:maintenance_mode', false)) {
            return $next($request);
        }

        if ($request->is('telegram/webhook/*') || $request->routeIs('telegram.webhook') || $request->is('up')) {
            return $next($request);
        }

        $message = trim((string) Cache::get('simonpr:maintenance_message', ''))
            ?: 'SIMONPR sedang maintenance. Mohon coba lagi beberapa saat.';
        $until = $this->maintenanceUntil();
        $remainingSeconds = $until ? max(0, now()->diffInSeconds($until, false)) : null;

        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'success' => false,
                'message' => $message,
                'error' => $message,
                'maintenance_until' => $until?->toIso8601String(),
                'remaining_seconds' => $remainingSeconds,
            ], 503);
        }

        return response($this->html($message, $until, $remainingSeconds), 503, [
            'Content-Type' => 'text/html; charset=UTF-8',
        ]);
    }

    private function expireMaintenanceIfNeeded(): void
    {
        $until = $this->maintenanceUntil();

        if ($until && $until->isPast()) {
            Cache::forget('simonpr:maintenance_mode');
            Cache::forget('simonpr:maintenance_until');
            Cache::forever('simonpr:maintenance_changed_at', now()->toIso8601String());
        }
    }

    private function maintenanceUntil(): ?Carbon
    {
        $raw = Cache::get('simonpr:maintenance_until');

        if (! $raw) {
            return null;
        }

        try {
            return Carbon::parse($raw);
        } catch (Throwable) {
            return null;
        }
    }

    private function html(string $message, ?Carbon $until, ?int $remainingSeconds): string
    {
        $safeMessage = e($message);
        $untilText = $until ? e($until->translatedFormat('l, d F Y H:i:s').' WIB') : 'Belum ditentukan';
        $remaining = $remainingSeconds ?? 0;

        return <<<HTML
<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SIMONPR Maintenance</title>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;800;900&display=swap");
        :root { color-scheme: light dark; }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            font-family: Montserrat, Arial, sans-serif;
            background: radial-gradient(circle at top left, #dbeafe, transparent 34%), linear-gradient(135deg, #eef4ff, #f7f2ff);
            color: #0f172a;
        }
        .card {
            width: min(660px, calc(100% - 32px));
            padding: 38px;
            border-radius: 32px;
            background: rgba(255, 255, 255, .94);
            box-shadow: 0 24px 90px rgba(15, 23, 42, .18);
            text-align: center;
            border: 1px solid rgba(148, 163, 184, .26);
            backdrop-filter: blur(18px);
        }
        .icon { font-size: 58px; }
        .badge {
            display: inline-flex;
            margin: 12px 0 14px;
            padding: 9px 15px;
            border-radius: 999px;
            background: #fff7ed;
            color: #c2410c;
            font-weight: 900;
            letter-spacing: .03em;
        }
        h1 { margin: 8px 0 12px; font-size: clamp(28px, 5vw, 42px); line-height: 1.1; }
        p { margin: 0 auto; color: #475569; line-height: 1.75; max-width: 540px; }
        .count {
            margin: 22px auto 14px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            max-width: 430px;
        }
        .box { border-radius: 18px; background: #0f172a; color: #fff; padding: 16px 8px; }
        .num { font-size: 30px; font-weight: 900; }
        .lbl { font-size: 11px; opacity: .74; text-transform: uppercase; letter-spacing: .08em; }
        .reason {
            margin-top: 18px;
            padding: 16px 18px;
            border-radius: 20px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            color: #334155;
            text-align: left;
            line-height: 1.7;
        }
        .until { margin-top: 14px; font-size: 13px; color: #64748b; }
        @media (prefers-color-scheme: dark) {
            body { background: radial-gradient(circle at top left, #1d4ed8, transparent 32%), linear-gradient(135deg, #020617, #111827); color: #f8fafc; }
            .card { background: rgba(15, 23, 42, .92); border-color: rgba(148, 163, 184, .28); }
            p { color: #cbd5e1; }
            .reason { background: #111827; border-color: #334155; color: #e2e8f0; }
            .box { background: #2563eb; }
            .until { color: #94a3b8; }
        }
    </style>
</head>
<body>
    <main class="card">
        <div class="icon">🛠️</div>
        <div class="badge">Maintenance Mode</div>
        <h1>SIMONPR sedang dirapikan sebentar</h1>
        <p>Website sementara tidak dapat diakses agar proses perawatan berjalan aman.</p>
        <div class="count" id="countdown" data-remaining="{$remaining}">
            <div class="box"><div class="num" id="hh">--</div><div class="lbl">Jam</div></div>
            <div class="box"><div class="num" id="mm">--</div><div class="lbl">Menit</div></div>
            <div class="box"><div class="num" id="ss">--</div><div class="lbl">Detik</div></div>
        </div>
        <div class="reason"><strong>Alasan maintenance:</strong><br>{$safeMessage}</div>
        <div class="until">Perkiraan selesai: {$untilText}</div>
    </main>
    <script>
        let left = parseInt(document.getElementById('countdown').dataset.remaining || '0', 10);
        const initial = left;
        const pad = n => String(Math.max(0, n)).padStart(2, '0');
        function tick() {
            const h = Math.floor(left / 3600);
            const m = Math.floor((left % 3600) / 60);
            const s = left % 60;
            document.getElementById('hh').textContent = pad(h);
            document.getElementById('mm').textContent = pad(m);
            document.getElementById('ss').textContent = pad(s);
            if (left > 0) {
                left--;
                setTimeout(tick, 1000);
            } else if (initial > 0) {
                location.reload();
            }
        }
        tick();
    </script>
</body>
</html>
HTML;
    }
}
