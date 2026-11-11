<?php

namespace App\Services;

use App\Models\Ppbj;
use App\Support\ProcurementSearchText;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ProcurementUnifiedSearch
{
    public function sources(string $term, string $scope = 'all')
    {
        $words = ProcurementSearchText::words($term);
        usort($words, fn ($a, $b) => strlen($b) <=> strlen($a));
        $query = DB::table('procurement_search_sources as src')->where('src.active', true);
        if (! $words || count($words) > 16) {
            return $query->whereRaw('1=0');
        }
        foreach ($words as $word) {
            // Prefix lookup uses the leading term index, never a full OCR-text LIKE scan.
            $query->whereIn('src.id', DB::table('procurement_search_terms')->select('source_id')->where(function ($terms) use ($word) {
                foreach (ProcurementSearchText::equivalents($word) as $equivalent) {
                    $terms->orWhere('term', 'like', $equivalent.'%');
                }
            }));
        }
        if ($scope === 'archive') {
            $query->whereIn('src.kind', ['archive_document', 'archive_attachment']);
        } elseif ($scope !== 'all') {
            $query->where('src.kind', $scope);
        }
        // Removed archive files disappear even if the external system is temporarily unavailable.
        $query->where(fn ($q) => $q->whereNotIn('src.kind', ['archive_document', 'archive_attachment'])
            ->orWhere('src.verified_at', '>=', now()->subMinutes(config('procurement_search.archive_fresh_minutes'))));

        return $query;
    }

    public function prIds(string $term, string $scope = 'all')
    {
        return DB::table('procurement_search_links')->select('ppbj_id')->whereIn('source_id', $this->sources($term, $scope)->select('src.id'));
    }

    public function search(string $term, string $scope = 'all', int $page = 1): array
    {
        $started = hrtime(true);
        $prs = Ppbj::select('id', 'ppbj_no', 'uraian', 'portofolio', 'buyer')->whereIn('id', $this->prIds($term, $scope))
            ->orderByDesc('id')->paginate(10, ['*'], 'page', $page);
        // Resolve token intersections once for all visible PRs, instead of repeating
        // every token subquery in ten UNION branches. The per-PR bound is preserved.
        $ranked = $this->sources($term, $scope)
            ->join('procurement_search_links as link', 'link.source_id', '=', 'src.id')->whereIn('link.ppbj_id', $prs->modelKeys())
            ->select('src.id', 'src.kind', 'src.label', 'src.reference', 'src.state', 'src.page', 'src.pages', 'src.reading_engine', 'src.reading_confidence', 'link.ppbj_id', 'link.inferred')
            ->selectRaw('ROW_NUMBER() OVER (PARTITION BY link.ppbj_id ORDER BY src.kind, src.id) as source_rank');
        $matches = $prs->isEmpty() ? collect() : DB::query()->fromSub($ranked, 'ranked_sources')->where('source_rank', '<=', 5)->orderBy('ppbj_id')->orderBy('source_rank')->get()->groupBy('ppbj_id');
        // Read bounded snippets only for visible cards, not every matching document.
        $visible = $matches->flatMap(fn ($rows) => $rows->take(4))->pluck('id')->unique();
        $words = ProcurementSearchText::words($term);
        usort($words, fn ($a, $b) => strlen($b) <=> strlen($a));
        $firstWord = $words[0] ?? '';
        $texts = $visible->isEmpty() ? collect() : DB::table('procurement_search_sources')->whereIn('id', $visible)
            ->select('id')->selectRaw("SUBSTR(COALESCE(metadata_text, ''), CASE WHEN INSTR(LOWER(metadata_text), ?) > 60 THEN INSTR(LOWER(metadata_text), ?) - 60 ELSE 1 END, 320) AS metadata_text", [$firstWord, $firstWord])
            ->selectRaw("SUBSTR(COALESCE(content, ''), CASE WHEN INSTR(LOWER(content), ?) > 60 THEN INSTR(LOWER(content), ?) - 60 ELSE 1 END, 320) AS content", [$firstWord, $firstWord])->get()->keyBy('id');

        return ['rows' => $prs->map(function ($pr) use ($matches, $texts, $term) {
            $sources = $matches->get($pr->id, collect());

            return ['id' => $pr->id, 'number' => $pr->ppbj_no, 'description' => $pr->uraian, 'portfolio' => $pr->portofolio,
                'links' => ['ppbj' => route('ppbj.index', ['search' => $pr->ppbj_no]), 'sp' => route('sp.index', ['search' => $pr->ppbj_no]), 'spph' => route('spph.index', ['search' => $pr->ppbj_no])],
                'matches' => $sources->take(4)->map(function ($source) use ($texts, $term) {
                    $text = $texts->get($source->id);
                    $archive = str_starts_with($source->kind, 'archive_');

                    return ['kind' => $source->kind, 'label' => $source->label, 'reference' => $source->reference,
                        'state' => $source->state, 'page' => $source->page, 'pages' => $source->pages, 'inferred' => (bool) $source->inferred,
                        'reading' => ['engine' => $source->reading_engine, 'confidence' => $source->reading_confidence === null ? null : (int) $source->reading_confidence],
                        'snippet' => ProcurementSearchText::snippet(($text->content ?? '') !== '' ? $text->content : ($text->metadata_text ?? ''), $term),
                        'url' => $archive ? route('procurement.search.file', ['source' => $source->id]) : route($source->kind.'.index', ['search' => $source->reference] + ($source->kind === 'sp' && str_starts_with($source->label, 'SP Oracle ') ? ['mode' => 'oracle'] : []))];
                })->values(), 'more_sources' => max(0, $sources->count() - 4)];
        })->values(), 'total' => $prs->total(), 'page' => $prs->currentPage(), 'last_page' => $prs->lastPage(),
            'equivalents' => collect($words)->mapWithKeys(fn ($word) => [$word => array_values(array_diff(ProcurementSearchText::equivalents($word), [$word]))])->filter(fn ($values) => count($values) > 0)->all(),
            'elapsed_ms' => max(1, (int) round((hrtime(true) - $started) / 1000000)),
            'index' => Cache::get('procurement-search:progress', ['state' => 'starting', 'ready' => 0, 'pending' => 0])];
    }
}
