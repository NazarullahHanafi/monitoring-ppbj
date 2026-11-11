<?php

namespace App\Services;

use App\Models\Ppbj;
use App\Models\ProcurementDetailAttachment;
use App\Models\Sp;
use App\Models\Spph;
use App\Support\ProcurementSearchText;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ProcurementSearchSync
{
    public function __construct(private ProcurementSearchWriter $writer, private ProcurementArchiveBridge $archive) {}

    public function local(int $batch = 80, array $only = []): int
    {
        $count = 0;
        foreach (['ppbj' => Ppbj::class, 'sp' => Sp::class, 'spph' => Spph::class] as $kind => $class) {
            if ($only && ! in_array($kind, $only, true)) {
                continue;
            }
            $cursor = (int) Cache::get('procurement-search:cursor:'.$kind, 0);
            $query = $class::query();
            if ($kind !== 'ppbj') {
                $query = $class::withTrashed()->with(['items', 'ppbjs:id,ppbj_no']);
            }
            $rows = $query->where('id', '>', $cursor)->orderBy('id')->limit($batch)->get();
            $tors = $kind === 'ppbj' && $rows->isNotEmpty() ? app(ProcurementSearchContext::class)->torMetadata($rows) : collect();
            $legacyNumbers = $kind === 'ppbj' ? collect() : Ppbj::whereIn('ppbj_no', $rows->pluck('nomor_pr')->filter()->unique())->pluck('id', 'ppbj_no');
            $details = $kind === 'ppbj' ? collect() : ProcurementDetailAttachment::where('kind', $kind)->whereIn('document_id', $rows->modelKeys())->whereNotNull('reviewed_at')->get()->groupBy('document_id');
            foreach ($rows as $row) {
                if ($kind === 'ppbj') {
                    $reference = $row->ppbj_no;
                    $torText = $tors->get(mb_strtolower(trim($row->ppbj_no)), '');
                    $metadata = implode(' ', array_filter([$row->ppbj_no, $row->buyer, $row->portofolio, mb_substr($torText, 0, 2000),
                        $row->penyedia_eksternal, $row->awarding_sp, $row->spph_rfq_1, $row->no_invoice, mb_substr(ProcurementSearchText::plain($row->uraian), 0, 2000)]));
                    $text = $row->uraian.' '.$torText;
                    $ids = [$row->id];
                } else {
                    $reference = $kind === 'sp' ? $row->nomor_sp : $row->nomor_spph;
                    $metadata = implode(' ', array_filter([$reference, $row->nomor_pr, $row->deskripsi_pengadaan, $row->nama_vendor, $row->pic, $kind === 'spph' ? $row->vendor_summary : '']));
                    $text = $row->items->pluck('nama_barang')->implode(' ').' '.($details->get($row->id)?->pluck('reviewed_text')->implode(' ') ?? '');
                    $ids = $row->ppbjs->modelKeys();
                    if ($row->nomor_pr) {
                        if ($legacyNumbers->has($row->nomor_pr)) {
                            $ids[] = $legacyNumbers->get($row->nomor_pr);
                        }
                    }
                }
                $text = ProcurementSearchText::plain($text);
                $label = ($kind === 'sp' && $row->numbering_mode === 'oracle' ? 'SP Oracle' : strtoupper($kind)).' '.$reference;
                $fingerprint = hash('sha256', $label.'|'.$metadata.'|'.$text);
                $this->writer->source($kind, (string) $row->id, $label, (string) $reference, $metadata, $text, $ids, $fingerprint, false, ! $row->deleted_at);
                $count++;
            }
            Cache::forever('procurement-search:cursor:'.$kind, $rows->count() < $batch ? 0 : (int) $rows->last()->id);
            // Physical/soft deletion can invalidate old source rows without retaining old file text.
            DB::table('procurement_search_sources')->where('kind', $kind)->where('active', true)
                ->whereNotIn('source_key', $class::query()->select('id'))->update(['active' => false, 'content' => null, 'updated_at' => now()]);
        }

        return $count;
    }

    public function archives(int $batch = 80, array $only = []): int
    {
        $count = 0;
        foreach (['archive_document', 'archive_attachment'] as $kind) {
            if ($only && ! in_array($kind, $only, true)) {
                continue;
            }
            $key = 'procurement-search:cursor:'.$kind;
            $page = $this->archive->call(['action' => 'manifest', 'kind' => $kind, 'after' => (int) Cache::get($key, 0), 'limit' => $batch, 'recent_limit' => 20]);
            $numbers = collect($page['rows'])->flatMap(fn ($row) => $row['pr_numbers'])->unique()->all();
            $prMap = Ppbj::whereIn('ppbj_no', $numbers)->pluck('id', 'ppbj_no');
            $groups = [];
            foreach (['sp' => Sp::class, 'spph' => Spph::class] as $module => $class) {
                $references = collect($page['rows'])->filter(fn ($row) => strtolower($row['module']) === $module)->pluck('reference')->unique();
                $groups[$module] = $references->isEmpty() ? collect() : $class::with('ppbjs:id,ppbj_no')->whereIn($module === 'sp' ? 'nomor_sp' : 'nomor_spph', $references)->get()->keyBy($module === 'sp' ? 'nomor_sp' : 'nomor_spph');
            }
            foreach ($page['rows'] as $row) {
                $ids = $prMap->only($row['pr_numbers'])->values()->all();
                // A grouped SP/SPPH may link one archived document to multiple PRs.
                $module = strtolower($row['module']);
                if (in_array($module, ['sp', 'spph'], true)) {
                    $document = $groups[$module]->get($row['reference']);
                    if ($document) {
                        $ids = array_merge($ids, $document->ppbjs->modelKeys());
                    }
                }
                $active = $row['active'];
                $metadata = implode(' ', [$row['label'], $row['reference'], $row['pr'], $row['metadata']]);
                $fingerprint = hash('sha256', $metadata.'|'.$row['version']);
                $id = $this->writer->source($kind, $row['key'], $row['label'], $row['reference'], $metadata, '', $ids, $fingerprint, true, $active, $row['pr']);
                if ($active && ! empty($row['download_target'])) {
                    Cache::put('procurement-search:download:'.$id, ['url' => $row['download_target'], 'fingerprint' => $fingerprint], now()->addMinutes(14));
                } else {
                    Cache::forget('procurement-search:download:'.$id);
                }
                $count++;
            }
            Cache::forever($key, ($page['has_more'] ?? count($page['rows']) >= $batch) ? (int) $page['last'] : 0);
        }

        return $count;
    }

    public function progress(): array
    {
        $counts = DB::table('procurement_search_sources')->where('active', true)->select('state')->selectRaw('COUNT(*) as total')->groupBy('state')->pluck('total', 'state');
        $pages = DB::table('procurement_search_sources')->where('active', true)->whereIn('kind', ['archive_document', 'archive_attachment'])
            ->selectRaw('SUM(page) as processed, SUM(pages) as known, SUM(CASE WHEN pages IS NULL THEN 1 ELSE 0 END) as unknown')->first();
        $progress = ['state' => 'running', 'ready' => (int) ($counts['ready'] ?? 0), 'pending' => (int) ($counts['pending'] ?? 0),
            'partial' => (int) ($counts['partial'] ?? 0), 'failed' => (int) ($counts['failed'] ?? 0),
            'needs_review' => (int) ($counts['empty'] ?? 0) + (int) ($counts['unsupported'] ?? 0) + (int) ($counts['limited'] ?? 0) + (int) ($counts['uncertain'] ?? 0),
            'archive_state' => Cache::get('procurement-search:archive-state', 'starting'), 'checked_at' => now()->toIso8601String()];
        $progress['pages_processed'] = (int) ($pages->processed ?? 0);
        $progress['pages_known'] = (int) ($pages->known ?? 0);
        $progress['files_unmapped'] = (int) ($pages->unknown ?? 0);
        $progress['unreadable_pages'] = DB::table('procurement_search_passages as page')->join('procurement_search_sources as source', 'source.id', '=', 'page.source_id')
            ->where('source.active', true)->where(fn ($q) => $q->whereNotNull('page.error')->orWhere('page.confidence', '<', 55))->count();
        $progress['unlinked_files'] = DB::table('procurement_search_sources as source')->where('source.active', true)->whereIn('source.kind', ['archive_document', 'archive_attachment'])
            ->whereNotExists(fn ($q) => $q->selectRaw('1')->from('procurement_search_links as link')->join('ppbj as pr', 'pr.id', '=', 'link.ppbj_id')->whereColumn('link.source_id', 'source.id'))->count();
        $queue = app(ProcurementOcrQueue::class);
        $progress['waiting'] = $queue->eligible()->count();
        $progress['priority_waiting'] = $queue->priority($queue->eligible())->count();
        $coverage = DB::table('procurement_search_sources')->where('active', true)->whereIn('kind', ['archive_document', 'archive_attachment'])
            ->selectRaw("SUM(CASE WHEN coverage_state = 'processed' THEN 1 ELSE 0 END) AS processed, SUM(CASE WHEN coverage_state = 'review' THEN 1 ELSE 0 END) AS review, SUM(CASE WHEN coverage_state = 'unchecked' THEN 1 ELSE 0 END) AS unchecked, SUM(indexed_pages) AS stored, SUM(problem_pages) AS problems")->first();
        $progress['coverage'] = ['processed_files' => (int) $coverage->processed, 'review_files' => (int) $coverage->review,
            'unchecked_files' => (int) $coverage->unchecked, 'stored_pages' => (int) $coverage->stored, 'problem_pages' => (int) $coverage->problems];
        Cache::forever('procurement-search:progress', $progress);

        return $progress;
    }

    public function passages(int $limit = 8): int
    {
        // Migrate retained legacy text without opening/downloading/OCR'ing the file again.
        return DB::transaction(function () use ($limit) {
            $source = DB::table('procurement_search_sources')->where('active', true)->where('passages_version', false)
                ->whereIn('kind', ['archive_document', 'archive_attachment'])->whereNotNull('content')->where('content', '!=', '')
                ->orderBy('id')->lockForUpdate()->first();
            if (! $source) {
                return 0;
            }
            $parts = preg_split('/(?:^|\n)\[Halaman (\d+)\]\s*\n/u', $source->content, -1, PREG_SPLIT_DELIM_CAPTURE);
            $passages = [];
            if (count($parts) > 1) {
                for ($i = 1; $i + 1 < count($parts); $i += 2) {
                    $passages[(int) $parts[$i]] = ['page' => (int) $parts[$i], 'text' => trim($parts[$i + 1]), 'engine' => $source->reading_engine, 'confidence' => $source->reading_confidence];
                }
            } else {
                $passages[1] = ['page' => 1, 'text' => $source->content, 'engine' => $source->reading_engine, 'confidence' => $source->reading_confidence];
            }
            $existing = DB::table('procurement_search_passages')->where('source_id', $source->id)->pluck('page')->all();
            $missing = array_diff_key($passages, array_flip($existing));
            $this->writer->terms($source->id, $source->metadata_text ?? '');
            $this->writer->passages($source->id, array_slice($missing, 0, $limit, true));
            if (count($missing) <= $limit) {
                $values = ['passages_version' => true];
                if ($source->state === 'limited') {
                    // Re-read the final capped pass; its original text may extend beyond the old summary.
                    $rewind = max(0, (int) $source->page - 2);
                    $values += ['page' => $rewind, 'state' => 'partial', 'attempts' => 0, 'retry_at' => null, 'error' => null];
                }
                DB::table('procurement_search_sources')->where('id', $source->id)->update($values);
            }

            return min(count($missing), $limit);
        });
    }
}
