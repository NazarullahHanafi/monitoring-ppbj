<?php

namespace App\Services;

use App\Support\ProcurementSearchText;
use Illuminate\Support\Facades\DB;

class ProcurementSearchWriter
{
    public function source(string $kind, string $key, string $label, string $reference, string $metadata, string $content, array $prIds, string $fingerprint, bool $file = false, bool $active = true, string $archivePr = ''): int
    {
        return DB::transaction(function () use ($kind, $key, $label, $reference, $metadata, $content, $prIds, $fingerprint, $file, $active, $archivePr) {
            $old = DB::table('procurement_search_sources')->where('kind', $kind)->where('source_key', $key)->lockForUpdate()->first();
            if ($old && $old->fingerprint === $fingerprint && (bool) $old->active === $active) {
                DB::table('procurement_search_sources')->where('id', $old->id)->update(['verified_at' => now()]);
                $id = $old->id;
            } else {
                $values = ['kind' => $kind, 'source_key' => $key, 'label' => mb_substr($label, 0, 255), 'reference' => mb_substr($reference, 0, 255), 'archive_pr' => mb_substr($archivePr, 0, 255),
                    'metadata_text' => mb_substr($metadata, 0, 8000), 'content' => $active ? mb_substr($content, 0, config('procurement_search.max_text')) : '',
                    'fingerprint' => $fingerprint, 'active' => $active, 'state' => $file ? 'pending' : 'ready',
                    'page' => 0, 'pages' => null, 'attempts' => 0, 'error' => null, 'retry_at' => null, 'checksum' => null,
                    'reading_engine' => null, 'reading_confidence' => null,
                    'passages_version' => true, 'reader_revision' => 2,
                    'queued_at' => $file && $active ? now() : null,
                    'priority_until' => $file && $active ? now()->addMinutes(15) : null,
                    'priority_pages' => $file && $active ? 4 : 0,
                    'failure_code' => null, 'recovery_round' => 0, 'coverage_state' => 'unchecked',
                    'indexed_pages' => null, 'problem_pages' => null, 'coverage_checked_at' => null,
                    'verified_at' => now(), 'updated_at' => now()];
                if ($old) {
                    $id = $old->id;
                    DB::table('procurement_search_sources')->where('id', $id)->update($values);
                    DB::table('procurement_search_terms')->where('source_id', $id)->delete();
                    DB::table('procurement_search_passages')->where('source_id', $id)->delete();
                    DB::table('procurement_search_links')->where('source_id', $id)->delete();
                } else {
                    $id = DB::table('procurement_search_sources')->insertGetId($values + ['created_at' => now()]);
                }
                if ($active) {
                    $this->terms($id, $values['metadata_text'].' '.$values['content']);
                }
            }
            $prIds = $active ? array_values(array_unique(array_map('intval', $prIds))) : [];
            $links = DB::table('procurement_search_links')->where('source_id', $id)->pluck('inferred', 'ppbj_id');
            $remove = $links->filter(fn ($inferred, $pr) => ! $active || (! $inferred && ! in_array((int) $pr, $prIds, true)))->keys()->all();
            if ($remove) {
                DB::table('procurement_search_links')->where('source_id', $id)->whereIn('ppbj_id', $remove)->delete();
            }
            $add = array_filter($prIds, fn ($pr) => ! $links->has($pr) || $links->get($pr));
            if ($add) {
                DB::table('procurement_search_links')->upsert(array_map(fn ($pr) => ['source_id' => $id, 'ppbj_id' => $pr, 'inferred' => false], array_values($add)), ['source_id', 'ppbj_id'], ['inferred']);
            }

            return (int) $id;
        });
    }

    public function terms(int $sourceId, string $text, int $page = 0): void
    {
        foreach (array_chunk(ProcurementSearchText::words($text, $page > 0), 250) as $words) {
            DB::table('procurement_search_terms')->insertOrIgnore(array_map(fn ($word) => ['term' => $word, 'source_id' => $sourceId, 'first_page' => $page], $words));
            // Backfill unknown legacy positions; metadata (page zero) stays preferred.
            DB::table('procurement_search_terms')->where('source_id', $sourceId)->whereIn('term', $words)
                ->where(fn ($q) => $q->whereNull('first_page')->orWhere('first_page', '>', $page))->update(['first_page' => $page]);
        }
    }

    public function passages(int $sourceId, array $passages): void
    {
        foreach ($passages as $passage) {
            $page = (int) $passage['page'];
            if ($page < 1 || mb_strlen($passage['text']) > (int) config('procurement_search.max_page_text')) {
                throw new \RuntimeException('page_text_limit');
            }
            DB::table('procurement_search_passages')->upsert([
                ['source_id' => $sourceId, 'page' => $page, 'content' => $passage['text'],
                    'engine' => $passage['engine'] ?? null, 'confidence' => $passage['confidence'] ?? null, 'error' => $passage['error'] ?? null],
            ], ['source_id', 'page'], ['content', 'engine', 'confidence', 'error']);
            $this->terms($sourceId, $passage['text'], $page);
        }
        DB::table('procurement_search_sources')->where('id', $sourceId)->update(['coverage_checked_at' => null]);
    }

    public function append(object $source, array $result): void
    {
        DB::transaction(function () use ($source, $result) {
            $row = DB::table('procurement_search_sources')->where('id', $source->id)->lockForUpdate()->first();
            // A replaced or deleted file can never receive the old worker's text.
            if (! $row || ! $row->active || $row->fingerprint !== $source->fingerprint || (int) $row->page !== (int) $source->page) {
                return;
            }
            $text = trim(($row->content ?? '')."\n".($result['text'] ?? ''));
            $limit = (int) config('procurement_search.max_text');
            $capped = mb_strlen($text) > $limit;
            $text = mb_substr($text, 0, $limit);
            $done = (bool) ($result['done'] ?? true);
            $unreadable = ($result['unreadable'] ?? 0) > 0 || $row->error === 'Sebagian halaman belum terbaca; periksa dokumen asli.';
            $confidence = isset($result['confidence']) && is_numeric($result['confidence']) ? max(0, min(100, (int) $result['confidence'])) : null;
            $confidence = $confidence === null ? $row->reading_confidence : ($row->reading_confidence === null ? $confidence : min($row->reading_confidence, $confidence));
            $unreadable = $unreadable || ($confidence !== null && $confidence < 55);
            $engine = $result['engine'] ?? $row->reading_engine;
            if (! in_array($engine, ['tesseract-7-ind-eng', 'pdfjs-6-text', 'pdfjs-6-tesseract-7', 'office-text'], true)) {
                $engine = $row->reading_engine;
            }
            if ($row->reading_engine === 'pdfjs-6-tesseract-7') {
                $engine = $row->reading_engine;
            }
            $archive = str_starts_with($row->kind, 'archive_');
            if ($archive) {
                $passages = $result['passages'] ?? [['page' => (int) ($result['page'] ?? 1), 'text' => $result['text'] ?? '', 'engine' => $engine, 'confidence' => $confidence]];
                $this->passages($row->id, $passages);
            }
            DB::table('procurement_search_sources')->where('id', $row->id)->update([
                'content' => $text, 'page' => $result['page'] ?? 1, 'pages' => $result['pages'] ?? 1,
                'state' => $capped && ! $archive ? 'limited' : ($done ? ($text !== '' ? ($unreadable ? 'uncertain' : 'ready') : 'empty') : 'partial'),
                'attempts' => 0, 'error' => $capped && ! $archive ? 'Batas teks tercapai; sebagian isi tersedia.' : ($unreadable ? 'Sebagian halaman belum terbaca; periksa dokumen asli.' : null), 'retry_at' => null, 'updated_at' => now(),
                'reading_engine' => $engine, 'reading_confidence' => $confidence,
                'reader_revision' => $engine === 'office-text' ? 3 : 2,
                'failure_code' => null,
            ]);
            // Only retained text may enter the index, including the final capped pass.
            if (! $archive) {
                $remaining = max(0, $limit - mb_strlen(trim($row->content ?? '')) - (($row->content ?? '') !== '' ? 1 : 0));
                $this->terms($row->id, mb_substr($result['text'] ?? '', 0, $remaining));
            }
            if ($archive && $done) {
                app(ProcurementReadingCoverage::class)->audit($row->id);
            }
        });
    }

    public function copy(object $source, object $duplicate): bool
    {
        return DB::transaction(function () use ($source, $duplicate) {
            $current = DB::table('procurement_search_sources')->where('id', $source->id)->lockForUpdate()->first();
            if (! $current || ! $current->active || $current->fingerprint !== $source->fingerprint || (int) $current->page !== 0) {
                return false;
            }
            $count = DB::table('procurement_search_passages')->where('source_id', $duplicate->id)->count();
            if ($count !== (int) $duplicate->pages) {
                return false;
            }
            DB::table('procurement_search_passages')->where('source_id', $duplicate->id)->orderBy('page')->chunk(4, function ($pages) use ($source) {
                $this->passages($source->id, $pages->map(fn ($page) => ['page' => $page->page, 'text' => $page->content, 'engine' => $page->engine, 'confidence' => $page->confidence, 'error' => $page->error])->all());
            });
            DB::table('procurement_search_sources')->where('id', $source->id)->update([
                'content' => $duplicate->content, 'page' => $duplicate->pages, 'pages' => $duplicate->pages,
                'reading_engine' => $duplicate->reading_engine, 'reading_confidence' => $duplicate->reading_confidence,
                'state' => 'ready', 'passages_version' => true, 'reader_revision' => $duplicate->reader_revision ?? 2, 'attempts' => 0, 'retry_at' => null, 'error' => null, 'failure_code' => null, 'updated_at' => now(),
            ]);
            $links = DB::table('procurement_search_links')->where('source_id', $duplicate->id)->where('inferred', true)
                ->whereIn('ppbj_id', \App\Models\Ppbj::select('id'))->pluck('ppbj_id');
            if ($links->isNotEmpty()) {
                DB::table('procurement_search_links')->insertOrIgnore($links->map(fn ($id) => ['source_id' => $source->id, 'ppbj_id' => $id, 'inferred' => true])->all());
            }
            app(ProcurementReadingCoverage::class)->audit($source->id);

            return true;
        });
    }
}
