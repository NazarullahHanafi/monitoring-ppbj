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
                    'verified_at' => now(), 'updated_at' => now()];
                if ($old) {
                    $id = $old->id;
                    DB::table('procurement_search_sources')->where('id', $id)->update($values);
                    DB::table('procurement_search_terms')->where('source_id', $id)->delete();
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

    public function terms(int $sourceId, string $text): void
    {
        foreach (array_chunk(array_slice(ProcurementSearchText::words($text), 0, 12000), 250) as $words) {
            DB::table('procurement_search_terms')->insertOrIgnore(array_map(fn ($word) => ['term' => $word, 'source_id' => $sourceId], $words));
        }
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
            DB::table('procurement_search_sources')->where('id', $row->id)->update([
                'content' => $text, 'page' => $result['page'] ?? 1, 'pages' => $result['pages'] ?? 1,
                'state' => $capped ? 'limited' : ($done ? ($text !== '' ? ($unreadable ? 'uncertain' : 'ready') : 'empty') : 'partial'),
                'attempts' => 0, 'error' => $capped ? 'Batas teks tercapai; sebagian isi tersedia.' : ($unreadable ? 'Sebagian halaman belum terbaca; periksa dokumen asli.' : null), 'retry_at' => null, 'updated_at' => now(),
                'reading_engine' => $engine, 'reading_confidence' => $confidence,
            ]);
            // Only retained text may enter the index, including the final capped pass.
            $remaining = max(0, $limit - mb_strlen(trim($row->content ?? '')) - (($row->content ?? '') !== '' ? 1 : 0));
            $this->terms($row->id, mb_substr($result['text'] ?? '', 0, $remaining));
        });
    }
}
