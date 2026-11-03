<?php

// Run only against the local synthetic server, never the production archive.
if (PHP_SAPI !== 'cli' || ! isset($argv[1]) || ! ctype_digit($argv[1]) || (int) $argv[1] < 1 || (int) $argv[1] > 65535) {
    exit(1);
}
chdir(dirname(__DIR__, 2));
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
config(['cache.default' => 'array', 'services.pr_archive.base_url' => 'http://127.0.0.1:'.$argv[1],
    'services.pr_archive.token' => '', 'services.pr_archive.pr_path' => '/lookup', 'services.pr_archive.lookup_concurrency' => 3]);
$service = app(App\Services\PrArchiveService::class);
$numbers = array_map(fn ($n) => 'SYNTHETIC-'.$n, range(1, 12));
$start = hrtime(true);
foreach ($numbers as $number) {
    $service->findByPrNumber($number, true);
}
$serialMs = (hrtime(true) - $start) / 1e6;
$start = hrtime(true);
$batch = $service->findByPrNumbers($numbers, true);
echo json_encode(['serial_ms' => round($serialMs, 2), 'batch_ms' => round((hrtime(true) - $start) / 1e6, 2), 'sources' => count($batch)]), PHP_EOL;
