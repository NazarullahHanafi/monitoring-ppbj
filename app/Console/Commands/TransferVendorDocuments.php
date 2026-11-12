<?php

namespace App\Console\Commands;

use App\Models\VendorDocument;
use App\Models\VendorDocumentBundle;
use App\Services\VendorDocumentDownloads;
use App\Services\VendorDocumentTransfers;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class TransferVendorDocuments extends Command
{
    protected $signature = 'vendor:transfers {--seconds=240} {--limit=12}';

    protected $description = 'Process bounded private vendor transfers and ZIPs, with scheduled crash recovery';

    public function handle(VendorDocumentTransfers $transfers, VendorDocumentDownloads $downloads): int
    {
        $lock = Cache::lock('vendor-transfer-worker', 900);
        if (! $lock->get()) {
            return self::SUCCESS;
        }
        $deadline = microtime(true) + max(1, min(240, (int) $this->option('seconds')));
        $limit = max(1, min(20, (int) $this->option('limit')));
        $count = 0;
        try {
            Cache::put('vendor-transfer-last-run', microtime(true), 3600);
            $transfers->prune();
            $downloads->pruneBundles();
            $downloads->pruneCache();
            while ($count < $limit && microtime(true) < $deadline) {
                $document = VendorDocument::whereIn('status', ['queued', 'transferring'])->whereNotNull('staged_file')
                    ->where('transfer_after', '<=', now())->orderBy('transfer_after')->first();
                if ($document && $transfers->process($document)) {
                    $count++;

                    continue;
                }
                $bundle = VendorDocumentBundle::whereIn('status', ['queued', 'processing'])->where('expires_at', '>', now())->oldest()->first();
                if ($bundle && $downloads->process($bundle)) {
                    $count++;

                    continue;
                }
                break;
            }
            $this->info('Vendor transfers processed: '.$count);

            return self::SUCCESS;
        } finally {
            $lock->release();
        }
    }
}
