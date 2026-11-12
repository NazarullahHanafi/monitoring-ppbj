<?php

namespace App\Services;

use Symfony\Component\Process\Process;

class ProcurementArchiveBridge
{
    public function call(array $input): array
    {
        if (in_array($input['kind'] ?? '', ['local_sp_attachment', 'local_spph_attachment'], true)) {
            return app(ProcurementLocalFiles::class)->call($input);
        }
        $root = (string) config('procurement_search.archive_root');
        if ($root === '' || ! is_dir($root)) {
            throw new \RuntimeException('Sumber arsip belum terhubung.');
        }
        $work = storage_path('app/private/procurement-search/work');
        if (! is_dir($work)) {
            mkdir($work, 0700, true);
        }
        $process = new Process([app(\App\Support\PhpCli::class)->executable(), base_path('bin/procurement-archive-bridge.php'), $root, $work, (string) config('services.pr_archive.base_url')], null, \App\Support\IsolatedProcessEnvironment::make());
        $process->setInput(json_encode($input, JSON_THROW_ON_ERROR));
        $process->setTimeout(50);
        $process->mustRun();

        return json_decode($process->getOutput(), true, flags: JSON_THROW_ON_ERROR);
    }
}
