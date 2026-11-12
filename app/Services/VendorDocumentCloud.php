<?php

namespace App\Services;

use App\Support\IsolatedProcessEnvironment;
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
            throw new \RuntimeException('Koneksi OneDrive belum tersedia.');
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
            throw new \RuntimeException('Transfer OneDrive sedang penuh. Coba lagi setelah beberapa saat.');
        }
        try {
            $process = new Process([PHP_BINARY, base_path('bin/vendor-cloud-bridge.php'), $root, $this->workDirectory()], null, IsolatedProcessEnvironment::make());
            $process->setInput(json_encode($input, JSON_THROW_ON_ERROR));
            $process->setTimeout(300);
            $process->run();
            if (! $process->isSuccessful()) {
                // Never include process stderr: Graph errors may contain pre-authenticated URLs.
                throw new \RuntimeException('OneDrive belum berhasil memproses berkas. Coba lagi dengan berkas yang sama.');
            }
            $result = json_decode($process->getOutput(), true, flags: JSON_THROW_ON_ERROR);
            if (! is_array($result) || ($result['ok'] ?? false) !== true) {
                throw new \RuntimeException('OneDrive belum berhasil memproses berkas. Coba lagi dengan berkas yang sama.');
            }

            return $result;
        } finally {
            $slot->release();
        }
    }
}
