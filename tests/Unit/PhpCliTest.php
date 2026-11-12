<?php

namespace Tests\Unit;

use App\Support\PhpCli;
use Tests\TestCase;

class PhpCliTest extends TestCase
{
    public function test_web_runtime_never_selects_its_lsphp_binary_as_the_cli_candidate(): void
    {
        $choices = PhpCli::candidates('litespeed', '/usr/local/bin/lsphp', '/usr/local/bin', '83');
        $this->assertNotContains('/usr/local/bin/lsphp', $choices);
        $this->assertSame('/opt/alt/php83/usr/bin/php', $choices[0]);
        $this->assertContains('/opt/cpanel/ea-php83/root/usr/bin/php', $choices);
    }

    public function test_cli_runtime_and_explicit_configuration_are_respected(): void
    {
        $choices = PhpCli::candidates('cli', PHP_BINARY, PHP_BINDIR, '85');
        $this->assertSame(PHP_BINARY, $choices[0]);
        $this->assertSame(['/custom/php'], PhpCli::candidates('litespeed', '/usr/local/bin/lsphp', '/usr/local/bin', '83', '/custom/php'));
        config(['procurement_search.php_cli' => PHP_BINARY]);
        $this->assertSame(PHP_BINARY, app(PhpCli::class)->executable());
    }

    public function test_invalid_configuration_fails_without_falling_back_to_a_web_binary(): void
    {
        config(['procurement_search.php_cli' => base_path('missing-php-cli')]);
        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('PHP CLI');
        app(PhpCli::class)->executable();
    }
}
