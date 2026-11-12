<?php

namespace App\Services;

use App\Support\PhpCli;
use Symfony\Component\Process\Process;

class VendorTransferWorker
{
    public function kick(): void
    {
        // The database is the durable queue. A detached, bounded CLI worker is
        // only a latency optimization; the scheduler recovers missed launches.
        if (app()->runningUnitTests() || PHP_OS_FAMILY === 'Windows') {
            return;
        }
        try {
            $command = 'nohup '.escapeshellarg(app(PhpCli::class)->executable()).' '.escapeshellarg(base_path('artisan'))
                .' vendor:transfers --seconds=240 --limit=12 > /dev/null 2>&1 < /dev/null &';
            $process = new Process(['/bin/sh', '-c', $command], base_path());
            $process->setTimeout(3);
            $process->run();
        } catch (\Throwable) {
            // No secrets or shell output in logs; scheduled recovery remains.
            \Illuminate\Support\Facades\Log::notice('Vendor transfer worker deferred to scheduler.');
        }
    }
}
