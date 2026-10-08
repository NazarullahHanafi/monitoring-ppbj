<?php

$host = parse_url((string) env('APP_URL', ''), PHP_URL_HOST) ?: 'sucofindoumumpku.com';
$defaultLogRoot = dirname(base_path()).DIRECTORY_SEPARATOR.'access-logs'.DIRECTORY_SEPARATOR;
$defaultLogs = $defaultLogRoot.$host.','.$defaultLogRoot.$host.'-ssl_log';

return [
    'honeypot' => [
        'enabled' => (bool) env('SECURITY_HONEYPOT_ENABLED', true),
        'access_logs' => array_values(array_filter(array_map(
            static fn (string $path) => trim($path),
            explode(',', (string) env('SECURITY_HONEYPOT_LOGS', $defaultLogs))
        ))),
        'initial_read_bytes' => (int) env('SECURITY_HONEYPOT_INITIAL_READ_BYTES', 1048576),
        'retention_days' => (int) env('SECURITY_HONEYPOT_RETENTION_DAYS', 90),
    ],
];
