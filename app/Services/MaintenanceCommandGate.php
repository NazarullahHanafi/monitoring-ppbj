<?php

namespace App\Services;

use Closure;
use RuntimeException;

class MaintenanceCommandGate
{
    public function __construct(private ?string $path = null) {}

    /**
     * The lock and budget deliberately live outside application cache. Commands
     * such as cache:clear/optimize:clear must not remove their own protection.
     * flock lasts until release/process exit, without an expiring lease.
     */
    public function run(Closure $operation): array
    {
        $file = @fopen($this->path ?? storage_path('framework/chatbot-maintenance.lock'), 'c+');
        if ($file === false) {
            throw new RuntimeException('Maintenance guard unavailable');
        }

        try {
            $wouldBlock = 0;
            if (! flock($file, LOCK_EX | LOCK_NB, $wouldBlock)) {
                if ($wouldBlock) {
                    return ['state' => 'busy'];
                }
                throw new RuntimeException('Maintenance lock unavailable');
            }

            $contents = stream_get_contents($file, 1025);
            $attempts = $contents === '' ? [] : json_decode($contents, false, 8, JSON_THROW_ON_ERROR);
            if (! is_array($attempts) || ! array_is_list($attempts) || count($attempts) > 5 || strlen($contents) > 1024) {
                throw new RuntimeException('Invalid maintenance budget');
            }
            $now = now()->timestamp;
            foreach ($attempts as $timestamp) {
                if (! is_int($timestamp) || $timestamp > $now + 60) {
                    throw new RuntimeException('Invalid maintenance timestamp');
                }
            }
            $attempts = array_values(array_filter($attempts, fn ($timestamp) => $timestamp > $now - 60));
            if (count($attempts) >= 5) {
                return ['state' => 'limited', 'retry_after' => max(1, min($attempts) + 60 - $now)];
            }
            $attempts[] = $now;
            $encoded = json_encode($attempts, JSON_THROW_ON_ERROR);
            if (! rewind($file) || ! ftruncate($file, 0) || fwrite($file, $encoded) !== strlen($encoded) || ! fflush($file)) {
                throw new RuntimeException('Maintenance budget write failed');
            }

            return ['state' => 'completed', 'exit_code' => $operation()];
        } finally {
            // Closing a contended handle cannot unlock the other worker's lock.
            fclose($file);
        }
    }
}
