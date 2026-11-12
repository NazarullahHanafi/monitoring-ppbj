<?php

namespace App\Services;

use App\Exceptions\VendorCloudException;
use App\Support\IsolatedProcessEnvironment;
use App\Support\PhpCli;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\Process\Process;

class VendorDocumentCloud
{
    public function workDirectory(): string
    {
        $work = storage_path('app/private/vendor-documents');
        if (! is_dir($work) && ! mkdir($work, 0700, true) && ! is_dir($work)) {
            throw new \RuntimeException('Tidak dapat menyiapkan unggahan sementara.');
        }

        return $work;
    }

    public function call(array $input): array
    {
        $root = (string) config('procurement_search.archive_root');
        if ($root === '' || ! is_dir($root)) {
            throw new VendorCloudException('configuration');
        }
        $slot = null;
        foreach ([0, 1] as $number) {
            $candidate = Cache::lock('vendor-cloud:slot:'.$number, 360);
            if ($candidate->get()) {
                $slot = $candidate;
                break;
            }
        }
        if (! $slot) {
            throw new VendorCloudException('busy');
        }
        try {
            try {
                $binary = app(PhpCli::class)->executable();
            } catch (\Throwable) {
                throw new VendorCloudException('runtime');
            }
            $process = new Process([$binary, base_path('bin/vendor-cloud-bridge.php'), $root, $this->workDirectory()], null, IsolatedProcessEnvironment::make());
            $process->setInput(json_encode($input, JSON_THROW_ON_ERROR));
            $process->setTimeout(300);
            try {
                $process->run();
            } catch (\Symfony\Component\Process\Exception\ProcessTimedOutException) {
                throw new VendorCloudException('timeout');
            }
            $result = json_decode($process->getOutput(), true);
            if (! $process->isSuccessful() || ! is_array($result) || ($result['ok'] ?? false) !== true) {
                // Only accept allowlisted codes; never expose stdout/stderr,
                // Graph responses, credentials, filenames or pre-authenticated URLs.
                $reason = $result['error'] ?? '';
                throw new VendorCloudException(in_array($reason, ['configuration', 'authentication', 'integrity', 'busy'], true) ? $reason : 'cloud');
            }

            return $result;
        } finally {
            $slot->release();
        }
    }
}
