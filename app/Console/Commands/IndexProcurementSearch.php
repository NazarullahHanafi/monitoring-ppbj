<?php

namespace App\Console\Commands;

use App\Services\ProcurementOcrProcessor;
use App\Services\ProcurementSearchSync;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class IndexProcurementSearch extends Command
{
    protected $signature = 'procurement:search-index {--sync-only} {--ocr-only} {--budget=45} {--limit=80}';

    protected $description = 'Incrementally index procurement documents and private archived scans';

    public function handle(ProcurementSearchSync $sync, ProcurementOcrProcessor $ocr): int
    {
        if (! config('procurement_search.enabled')) {
            return self::SUCCESS;
        }
        $lock = Cache::lock('procurement-search:worker', 300);
        if (! $lock->get()) {
            $this->info('Indexer already active.');

            return self::SUCCESS;
        }
        $started = microtime(true);
        $pages = 0;
        $sources = 0;
        try {
            if (! $this->option('ocr-only')) {
                $limit = min(200, max(1, (int) $this->option('limit')));
                $sources = $sync->local($limit);
                try {
                    $sources += $sync->archives($limit);
                    Cache::forever('procurement-search:archive-sync', now()->toIso8601String());
                    Cache::forever('procurement-search:archive-state', 'connected');
                } catch (\Throwable) {
                    Cache::forever('procurement-search:archive-state', 'deferred');
                    $this->warn('Archive sync deferred; local search remains available.');
                }
            }
            if (! $this->option('sync-only')) {
                $budget = min(90, max(1, (int) $this->option('budget')));
                while (microtime(true) - $started < $budget && $ocr->next()) {
                    $pages++;
                }
            }
            $progress = $sync->progress();
            $this->info(json_encode(['sources' => $sources, 'passes' => $pages, 'ready' => $progress['ready'], 'pending' => $progress['pending'], 'partial' => $progress['partial'], 'failed' => $progress['failed']]));

            return self::SUCCESS;
        } finally {
            $lock->release();
        }
    }
}
