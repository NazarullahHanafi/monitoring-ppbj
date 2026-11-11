<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

/** Coverage is processing evidence, never proof of character-perfect OCR. */
class ProcurementReadingCoverage
{
    public function pages(int $id)
    {
        return DB::table('procurement_search_passages')->where('source_id', $id)->orderBy('page')
            ->select('page', 'engine', 'confidence', 'error', 'repair_attempts')->selectRaw("LENGTH(COALESCE(content, '')) AS bytes")->get();
    }

    public function repairable(object $page): bool
    {
        return (int) $page->bytes === 0 && (int) $page->repair_attempts < 2 && ! in_array($page->error, ['page_text_limit', 'office_images', 'office_limit'], true);
    }

    public function audit(int $id): void
    {
        DB::transaction(function () use ($id) {
            $source = DB::table('procurement_search_sources')->where('id', $id)->select('id', 'active', 'kind', 'pages', 'page', 'passages_version', 'state', 'attempts', 'recovery_round', 'reading_engine', 'reader_revision', 'coverage_state')
                ->lockForUpdate()->first();
            if (! $source || ! $source->active || ! str_starts_with($source->kind, 'archive_')) {
                return;
            }
            $pages = $this->pages($id);
            $known = $source->pages === null ? null : (int) $source->pages;
            $indexed = $pages->filter(fn ($page) => $known === null || $page->page <= $known);
            $problems = $indexed->filter(fn ($page) => $page->error !== null || ($page->confidence !== null && $page->confidence < 55) || (int) $page->bytes === 0);
            $missing = $known === null ? [] : array_values(array_diff(range(1, max(1, $known)), $indexed->pluck('page')->all()));
            $retryPages = $indexed->filter(fn ($page) => $this->repairable($page))->pluck('page')->all();
            $values = ['indexed_pages' => $indexed->count(), 'problem_pages' => $problems->count(), 'coverage_checked_at' => now()];
            if (! $source->passages_version) {
                DB::table('procurement_search_sources')->where('id', $id)->update($values + ['coverage_state' => 'unchecked']);

                return;
            }
            // Older Office readers did not check embedded images, notes, or
            // text beyond the summary limit. Revalidate each legacy file once.
            if ($source->reading_engine === 'office-text' && $source->reader_revision < 3) {
                DB::table('procurement_search_sources')->where('id', $id)->update($values + ['coverage_state' => 'in_progress', 'state' => 'partial', 'page' => 0, 'failure_code' => 'legacy_text_limit']);

                return;
            }
            $terminal = in_array($source->state, ['unsupported', 'limited'], true);
            $complete = $known !== null && ! $missing && $source->passages_version;
            $values['coverage_state'] = $terminal || $problems->isNotEmpty() || ($source->state === 'failed' && $source->attempts >= 3 && $source->recovery_round >= 3)
                ? 'review' : ($complete ? 'processed' : 'in_progress');
            if (! $terminal && $complete && ! $retryPages) {
                $values['state'] = $problems->isEmpty() ? 'ready' : 'uncertain';
                $values['page'] = $known;
                $values['error'] = $problems->isEmpty() ? null : 'Sebagian halaman perlu diperiksa; lihat audit kelengkapan.';
                $values['reading_confidence'] = $indexed->whereNotNull('confidence')->min('confidence');
            } elseif (! $terminal) {
                $gaps = array_merge($missing, $retryPages);
                $gap = $gaps ? min($gaps) : null;
                if ($gap !== null && $gap <= (int) $source->page) {
                    $values['page'] = max(0, $gap - 1);
                    if ($source->state !== 'failed') {
                        $values['state'] = 'partial';
                    }
                } elseif (in_array($source->state, ['ready', 'uncertain'], true) && ! $complete) {
                    $values['state'] = 'partial';
                }
            }
            DB::table('procurement_search_sources')->where('id', $id)->update($values);
        });
    }

    public function batch(int $limit = 10): int
    {
        $cursor = (int) Cache::get('procurement-search:coverage-cursor', 0);
        $ids = DB::table('procurement_search_sources')->where('active', true)->whereIn('kind', ['archive_document', 'archive_attachment'])
            ->where('id', '>', $cursor)->orderBy('id')->limit(min(50, max(1, $limit)))->pluck('id');
        foreach ($ids as $id) {
            $this->audit((int) $id);
        }
        Cache::forever('procurement-search:coverage-cursor', $ids->count() < $limit ? 0 : (int) $ids->last());

        return $ids->count();
    }
}
