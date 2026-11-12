<?php

namespace App\Services;

use App\Support\ProcurementSearchText;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ProcurementPageEvidence
{
    private function normalized(string $text): string
    {
        $text = strtolower(Str::ascii($text));
        // Numeric compounds remain atomic: 10.5 and 1/2 must not become 10 + 5 or 1 + 2.
        $text = preg_replace('/(?<![0-9])[.,\/-]|[.,\/-](?![0-9])/', ' ', $text) ?? '';

        return trim(preg_replace('/[^a-z0-9.,\/-]+/', ' ', $text) ?? '');
    }

    private function snippet(string $text, array $words, string $query): string
    {
        foreach ($words as $word) {
            $pattern = '/(?<![\p{L}\p{N}])(?<![0-9][.,\/-])'.preg_quote($word, '/').'(?![\p{L}\p{N}]|[.,\/-][0-9])/iu';
            if (preg_match($pattern, $text, $hit, PREG_OFFSET_CAPTURE) === 1) {
                $start = max(0, mb_strlen(substr($text, 0, $hit[0][1])) - 45);

                return ($start ? '…' : '').mb_substr($text, $start, 220).(mb_strlen($text) > $start + 220 ? '…' : '');
            }
        }

        return ProcurementSearchText::snippet($text, $query, true);
    }

    public function search(object $source, string $query, string $mode, int $after = 0, ?string $version = null): array
    {
        $needle = $this->normalized($query);
        $words = $needle === '' ? [] : explode(' ', $needle);
        if (! $words || count($words) > 16 || max(array_map('strlen', $words)) > 96) {
            throw ValidationException::withMessages(['q' => 'Gunakan 1–16 kata atau angka yang jelas untuk menelusuri halaman.']);
        }
        $pages = DB::table('procurement_search_passages')->where('source_id', $source->id);
        $stats = (clone $pages)->selectRaw('COUNT(*) AS stored, MAX(page) AS last_page, MAX(human_review_id) AS review_id')->first();
        $currentVersion = hash('sha256', implode('|', [$source->fingerprint, $source->updated_at, $source->page, $source->state, $stats->stored, $stats->last_page, $stats->review_id, $needle, $mode]));
        abort_if($version !== null && ! hash_equals($currentVersion, $version), 409, 'Bacaan diperbarui. Klik Telusuri untuk memulai lagi dari awal.');

        // Only one authorized file, at most 20 stored pages and approximately 2 MiB.
        // The composite primary key (source_id, page) serves both cursor lookups.
        $candidates = (clone $pages)->where('page', '>', $after)->orderBy('page')->limit(21)->select('page')->selectRaw('LENGTH(content) AS bytes')->get();
        $selected = [];
        $oversized = [];
        $bytes = 0;
        foreach ($candidates->take(20) as $candidate) {
            if ($selected && $bytes + $candidate->bytes > 2 * 1024 * 1024) {
                break;
            }
            $selected[] = (int) $candidate->page;
            if ($candidate->bytes > 4 * (int) config('procurement_search.max_page_text', 1000000)) {
                $oversized[] = (int) $candidate->page;
            }
            $bytes += (int) $candidate->bytes;
        }
        $rows = [];
        $issues = [];
        foreach ($oversized as $page) {
            $issues[] = ['page' => $page, 'reason' => 'Teks halaman melebihi batas pemuatan aman. Buka file asli; bagian ini belum ditelusuri.'];
        }
        $unit = $source->reading_engine === 'office-text' ? 'Bagian' : 'Halaman';
        $readable = array_values(array_diff($selected, $oversized));
        $contents = $readable ? (clone $pages)->whereIn('page', $readable)->orderBy('page')->get(['page', 'content', 'engine', 'confidence', 'error', 'human_review_id']) : collect();
        foreach ($contents as $page) {
            $haystack = ' '.$this->normalized($page->content).' ';
            $matches = $mode === 'phrase' ? str_contains($haystack, ' '.$needle.' ')
                : collect(array_unique($words))->every(fn ($word) => str_contains($haystack, ' '.$word.' '));
            if ((trim($page->content) === '' && $page->human_review_id === null) || $page->error || ($page->confidence !== null && $page->confidence < 55)) {
                $issues[] = ['page' => (int) $page->page, 'reason' => trim($page->content) === '' ? 'Teks belum tersedia atau bagian tanpa teks; periksa file asli.' : 'Bacaan kurang jelas atau ditandai bermasalah; periksa file asli.'];
            }
            if ($matches) {
                $rows[] = ['page' => (int) $page->page, 'snippet' => $this->snippet($page->content, $words, $query),
                    'reading' => ['engine' => $page->engine, 'confidence' => $page->confidence === null ? null : (int) $page->confidence, 'reviewed' => $page->human_review_id !== null],
                    'url' => route('procurement.search.file', ['source' => $source->id]).($unit === 'Halaman' ? '#page='.$page->page : '')];
            }
        }

        return ['source' => (int) $source->id, 'label' => $source->label, 'unit' => $unit, 'mode' => $mode, 'query' => $query,
            'rows' => $rows, 'issues' => $issues, 'scanned' => $contents->count(), 'after' => $selected ? end($selected) : $after,
            'has_more' => $candidates->count() > count($selected), 'version' => $currentVersion,
            'stored' => (int) $stats->stored, 'pages' => $source->pages === null ? null : (int) $source->pages,
            'index_complete' => $source->pages > 0 && (int) $stats->stored === (int) $source->pages && (int) $stats->last_page === (int) $source->pages];
    }
}
