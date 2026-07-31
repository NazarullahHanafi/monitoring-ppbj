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
                $this->recordSlowPage($request, $elapsedMs);
                $slowCount = $this->increment("perf:slow:{$minuteKey}", 120);
                $this->alertIfSlowSpike($request, $elapsedMs, $slowCount);
            }

            if ($statusCode >= 500) {
                $this->recordErrorPage($request, $statusCode, $elapsedMs);
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

    private function recordSlowPage(Request $request, int $elapsedMs): void
    {
        $this->recordPageMetric('slow_pages', $request, [
            'last_ms' => $elapsedMs,
            'max_ms' => $elapsedMs,
        ], function (array $current) use ($elapsedMs) {
            $current['count'] = (int) ($current['count'] ?? 0) + 1;
            $current['last_ms'] = $elapsedMs;
            $current['max_ms'] = max((int) ($current['max_ms'] ?? 0), $elapsedMs);

            return $current;
        });
    }

    private function recordErrorPage(Request $request, int $statusCode, int $elapsedMs): void
    {
        $this->recordPageMetric('error_pages', $request, [
            'last_status' => $statusCode,
            'last_ms' => $elapsedMs,
        ], function (array $current) use ($statusCode, $elapsedMs) {
            $current['count'] = (int) ($current['count'] ?? 0) + 1;
            $current['last_status'] = $statusCode;
            $current['last_ms'] = $elapsedMs;

            return $current;
        });
    }

    private function recordPageMetric(string $type, Request $request, array $defaults, callable $mutate): void
    {
        $date = now()->format('Ymd');
        $method = $request->method();
        $path = '/'.ltrim($request->path(), '/');
        $signature = $method.' '.$path;
        $hash = sha1($signature);
        $registryKey = "perf:{$type}:{$date}:registry";
        $itemKey = "perf:{$type}:{$date}:{$hash}";
        $ttl = now()->addDays(2);

        $registry = Cache::get($registryKey, []);
        $registry[] = $hash;
        $registry = array_slice(array_values(array_unique($registry)), -120);
        Cache::put($registryKey, $registry, $ttl);

        $current = Cache::get($itemKey, array_merge([
            'method' => $method,
            'path' => $path,
            'count' => 0,
            'first_seen' => now()->toIso8601String(),
            'last_seen' => null,
        ], $defaults));

        $current['method'] = $method;
        $current['path'] = $path;
        $current['last_seen'] = now()->toIso8601String();
        $current = $mutate($current);

        Cache::put($itemKey, $current, $ttl);
    }
}
