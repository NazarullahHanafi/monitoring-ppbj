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
            '/.env.production.backup',
            '/nested/.git/config',
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
        $this->assertStringContainsString('RewriteCond %{HTTPS} !=on', $rules);
        $this->assertStringContainsString('Header unset X-Powered-By', $rules);
        $this->assertStringContainsString('Header always unset X-Powered-By', $rules);
    }

    public function test_apache_denies_sensitive_static_files_but_keeps_acme_and_assets_available(): void
    {
        $rules = file_get_contents(public_path('.htaccess'));
        preg_match_all('/^\s*RewriteRule\s+(\S+)\s+-\s+\[R=404,L(?:,NC)?\]/m', $rules, $matches);
        $blocked = function (string $path) use ($matches): bool {
            foreach ($matches[1] as $pattern) {
                // The bare ^ rule has an IP RewriteCond; it is not unconditional.
                if ($pattern === '^') {
                    continue;
                }
                if (preg_match('~'.$pattern.'~i', ltrim($path, '/')) === 1) {
                    return true;
                }
            }

            return false;
        };

        foreach (['/.env.production.backup', '/.git/config', '/.htaccess.backup', '/error_log', '/error_log.1',
            '/backup.sql', '/database.sqlite', '/debug.log', '/config.php.bak'] as $path) {
            $this->assertTrue($blocked($path), 'Sensitive static file must be blocked: '.$path);
        }
        foreach (['/.well-known/acme-challenge/test', '/assets/app-shell.js', '/images/logo4.png', '/build/manifest.json', '/index.php'] as $path) {
            $this->assertFalse($blocked($path), 'Public asset must remain available: '.$path);
        }
    }
}
