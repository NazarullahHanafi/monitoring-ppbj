<?php

namespace App\Http\Middleware;

use App\Services\TelegramBotService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class MonitorPerformance
{
    public function handle(Request $request, Closure $next): Response
    {
        $startedAt = microtime(true);
        $response = null;

        try {
            $response = $next($request);

            return $response;
        } finally {
            $this->record($request, $response, $startedAt);
        }
    }

    private function record(Request $request, ?Response $response, float $startedAt): void
    {
        if (! $this->shouldMonitor($request)) {
            return;
        }

        try {
            $elapsedMs = (int) round((microtime(true) - $startedAt) * 1000);
            $minuteKey = now()->format('YmdHi');
            $statusCode = $response?->getStatusCode() ?? 500;

            $trafficCount = $this->increment("perf:traffic:{$minuteKey}", 120);

            if ($elapsedMs >= $this->slowRequestMs()) {
                $slowCount = $this->increment("perf:slow:{$minuteKey}", 120);
                $this->alertIfSlowSpike($request, $elapsedMs, $slowCount);
            }

            if ($statusCode >= 500) {
                $errorCount = $this->increment('perf:error_spike:'.now()->format('YmdHi'), 600);
                $this->alertIfErrorSpike($request, $statusCode, $errorCount);
            }

            $this->alertIfTrafficSpike($request, $trafficCount);
        } catch (Throwable) {
            // Monitoring tidak boleh membuat request utama gagal.
        }
    }

    private function shouldMonitor(Request $request): bool
    {
        if (! (bool) config('app.performance_monitor.enabled', true)) {
            return false;
        }

        if (! app()->environment('production')) {
            return false;
        }

        if ($request->isMethod('OPTIONS')) {
            return false;
        }

        return ! $request->is(
            'up',
            'favicon.ico',
            'robots.txt',
            'sitemap.xml',
            'build/*',
            'images/*',
            'storage/*',
            'telegram/webhook/*'
        );
    }

    private function increment(string $key, int $seconds): int
    {
        Cache::add($key, 0, now()->addSeconds($seconds));

        return (int) Cache::increment($key);
    }

    private function alertIfTrafficSpike(Request $request, int $trafficCount): void
    {
        $threshold = max(1, (int) config('app.performance_monitor.traffic_per_minute_threshold', 120));

        if ($trafficCount < $threshold) {
            return;
        }

        if (! $this->cooldown('traffic')) {
            return;
        }

        app(TelegramBotService::class)->notifyPerformanceAlert('Traffic tinggi', [
            'request_per_minute' => $trafficCount,
            'threshold' => $threshold,
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'ip' => $request->ip(),
        ]);
    }

    private function alertIfSlowSpike(Request $request, int $elapsedMs, int $slowCount): void
    {
        $threshold = max(1, (int) config('app.performance_monitor.slow_requests_per_minute_threshold', 8));

        if ($slowCount < $threshold && $elapsedMs < ($this->slowRequestMs() * 2)) {
            return;
        }

        if (! $this->cooldown('slow')) {
            return;
        }

        app(TelegramBotService::class)->notifyPerformanceAlert('Website mulai lambat', [
            'duration_ms' => $elapsedMs,
            'slow_request_per_minute' => $slowCount,
            'slow_threshold_ms' => $this->slowRequestMs(),
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'ip' => $request->ip(),
        ]);
    }

    private function alertIfErrorSpike(Request $request, int $statusCode, int $errorCount): void
    {
        $threshold = max(1, (int) config('app.performance_monitor.error_spike_threshold', 5));

        if ($errorCount < $threshold) {
            return;
        }

        if (! $this->cooldown('error_spike')) {
            return;
        }

        app(TelegramBotService::class)->notifyPerformanceAlert('Error spike terdeteksi', [
            'status_code' => $statusCode,
            'error_per_minute' => $errorCount,
            'threshold' => $threshold,
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'ip' => $request->ip(),
        ]);
    }

    private function cooldown(string $type): bool
    {
        $minutes = max(1, (int) config('app.performance_monitor.alert_cooldown_minutes', 5));

        return Cache::add("perf:alert_cooldown:{$type}", true, now()->addMinutes($minutes));
    }

    private function slowRequestMs(): int
    {
        return max(250, (int) config('app.performance_monitor.slow_request_ms', 3000));
    }
}
