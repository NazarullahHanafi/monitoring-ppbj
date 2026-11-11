<?php

namespace App\Console\Commands;

use App\Services\ProcurementArchiveBridge;
use App\Services\ProcurementReadingReviews;
use App\Services\ProcurementSearchSync;
use App\Services\ProcurementSearchWriter;
use App\Services\ProcurementStdioOcrProcessor;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class OffloadProcurementSearch extends Command
{
    protected $signature = 'procurement:search-offload';

    protected $description = 'Process one private OCR pass through an authenticated SSH stdio worker';

    public function handle(): int
    {
        if (! config('procurement_search.enabled')) {
            return self::SUCCESS;
        }
        $lock = Cache::lock('procurement-search:worker', 300);
        if (! $lock->get()) {
            $this->line('{"type":"busy"}');

            return self::SUCCESS;
        }
        try {
            $queue = app(\App\Services\ProcurementOcrQueue::class);
            $queue->deep = true;
            app()->instance(\App\Services\ProcurementOcrQueue::class, $queue);
            app(ProcurementReadingReviews::class)->next();
            $processor = new ProcurementStdioOcrProcessor(app(ProcurementArchiveBridge::class), app(ProcurementSearchWriter::class));
            $worked = $processor->next();
            $progress = app(ProcurementSearchSync::class)->progress();
            $this->line(json_encode(['type' => 'done', 'worked' => $worked, 'waiting' => $progress['waiting'], 'stored_pages' => $progress['coverage']['stored_pages'], 'checked_at' => $progress['checked_at']]));

            return self::SUCCESS;
        } finally {
            app(\App\Services\ProcurementOcrQueue::class)->deep = false;
            $lock->release();
        }
    }
}
