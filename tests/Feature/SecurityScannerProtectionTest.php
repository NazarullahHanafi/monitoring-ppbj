<?php

namespace Tests\Feature;

use App\Http\Middleware\MonitorPerformance;
use Illuminate\Http\Request;
use ReflectionMethod;
use Tests\TestCase;

class SecurityScannerProtectionTest extends TestCase
{
    public function test_common_scanner_paths_are_excluded_from_user_traffic_metrics(): void
    {
        $method = new ReflectionMethod(MonitorPerformance::class, 'isScannerProbe');
        $middleware = app(MonitorPerformance::class);

        foreach ([
            '/wp-admin/maint/repair.php',
            '/wp-content/plugins/hellopress/wp_filemanager.php',
            '/wp-login.php',
            '/.env',
            '/random/dragonshell.php',
        ] as $path) {
            $this->assertTrue(
                $method->invoke($middleware, Request::create($path)),
                "Scanner path was not detected: {$path}"
            );
        }

        $this->assertFalse($method->invoke($middleware, Request::create('/command-center')));
        $this->assertFalse($method->invoke($middleware, Request::create('/index.php')));
    }

    public function test_apache_blocks_scanners_before_the_laravel_front_controller(): void
    {
        $rules = file_get_contents(public_path('.htaccess'));

        $this->assertIsString($rules);
        $this->assertStringContainsString('wp-admin|wp-content|wp-includes', $rules);
        $this->assertStringContainsString('(?!index\\.php$).*\\.php', $rules);
        $this->assertStringContainsString('40\\.74\\.77\\.37', $rules);
        $this->assertStringContainsString('Header unset X-Powered-By', $rules);
        $this->assertStringContainsString('Header always unset X-Powered-By', $rules);
    }
}
