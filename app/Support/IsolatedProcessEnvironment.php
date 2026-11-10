<?php

namespace App\Support;

final class IsolatedProcessEnvironment
{
    /** A child archive app must load its own DB/key, never inherit SIMONPR credentials. */
    public static function make(): array
    {
        $system = ['PATH', 'HOME', 'USER', 'LOGNAME', 'TMPDIR', 'TMP', 'TEMP', 'LANG', 'TZ', 'SSL_CERT_FILE', 'SSL_CERT_DIR',
            'PHPRC', 'PHP_INI_SCAN_DIR', 'LD_LIBRARY_PATH', 'SystemRoot', 'SYSTEMROOT', 'COMSPEC', 'PATHEXT', 'WINDIR'];
        $environment = [];
        foreach (array_unique(array_merge(array_keys((array) getenv()), array_keys($_ENV), array_keys($_SERVER))) as $key) {
            if (! in_array($key, $system, true)) {
                $environment[$key] = false;
            }
        }

        return $environment;
    }
}
