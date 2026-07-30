<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class PerformanceMonitorTest extends TestCase
{
    use RefreshDatabase;

    public function test_performance_monitor_sends_traffic_alert_in_production(): void
    {
        $this->app->detectEnvironment(fn () => 'production');

        config()->set('app.performance_monitor.enabled', true);
        config()->set('app.performance_monitor.traffic_per_minute_threshold', 1);
        config()->set('app.performance_monitor.alert_cooldown_minutes', 5);
        config()->set('services.telegram.bot_token', 'TEST_TOKEN');
        config()->set('services.telegram.notify_chat_ids', '12345');
        config()->set('services.telegram.allowed_chat_ids', '12345');

        Cache::flush();

        Route::get('/perf-monitor-test', fn () => response('ok'));

        Http::fake([
            'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
        ]);

        $this->get('/perf-monitor-test')->assertOk();

        Http::assertSent(function ($request) {
            return str_contains((string) $request->url(), '/sendMessage')
                && str_contains((string) $request->body(), 'Alert+performa+SIMONPR')
                && str_contains((string) $request->body(), 'Traffic+tinggi');
        });
    }
}
