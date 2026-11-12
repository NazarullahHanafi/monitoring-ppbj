<?php

namespace App\Support;

use Symfony\Component\Process\PhpExecutableFinder;
use Symfony\Component\Process\Process;

final class PhpCli
{
    public static function candidates(string $sapi, string $binary, string $bindir, string $version, string $configured = ''): array
    {
        if ($configured !== '') {
            return [$configured];
        }

        return array_values(array_unique(array_filter([
            $sapi === 'cli' ? $binary : null,
            '/opt/alt/php'.$version.'/usr/bin/php',
            '/opt/cpanel/ea-php'.$version.'/root/usr/bin/php',
            rtrim($bindir, '/\\').DIRECTORY_SEPARATOR.'php'.(PHP_OS_FAMILY === 'Windows' ? '.exe' : ''),
            (new PhpExecutableFinder)->find(false),
        ])));
    }

    public function executable(): string
    {
        $candidates = self::candidates(PHP_SAPI, PHP_BINARY, PHP_BINDIR, PHP_MAJOR_VERSION.PHP_MINOR_VERSION, (string) config('procurement_search.php_cli'));
        foreach ($candidates as $candidate) {
            if (! is_file($candidate) || ! is_executable($candidate)) {
                continue;
            }
            if (PHP_SAPI === 'cli' && $candidate === PHP_BINARY) {
                return $candidate;
            }
            // PHP_BINARY is lsphp/php-fpm in web requests. Verify the SAPI of
            // the child itself; a runnable PHP executable need not be CLI.
            try {
                $probe = new Process([$candidate, '-r', 'echo PHP_SAPI === "cli" && PHP_VERSION_ID >= 80200 ? "SIMONPR_CLI_OK" : "";'], null, IsolatedProcessEnvironment::make());
                $probe->setTimeout(5);
                $probe->run();
                if ($probe->isSuccessful() && trim($probe->getOutput()) === 'SIMONPR_CLI_OK') {
                    return $candidate;
                }
            } catch (\Throwable) {
                // Try only the remaining known PHP candidates. Never use a shell.
            }
        }

        throw new \RuntimeException('PHP CLI untuk penyimpanan dokumen belum tersedia di server.');
    }
}
