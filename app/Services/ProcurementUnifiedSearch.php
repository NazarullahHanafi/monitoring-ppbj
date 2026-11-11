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
        return $this->sourceQuery($this->resolve($term, $scope)['used'], $scope);
    }

    private function sourceQuery(array $words, string $scope)
    {
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
        return $this->linkedPrIds($this->resolve($term, $scope)['used'], $scope);
    }

    private function linkedPrIds(array $words, string $scope)
    {
        return DB::table('procurement_search_links')->select('ppbj_id')->whereIn('source_id', $this->sourceQuery($words, $scope)->select('src.id'));
    }

    public function resolve(string $term, string $scope = 'all'): array
    {
        $words = ProcurementSearchText::words($term);
        $plan = ['mode' => 'all', 'used' => $words, 'missing' => [], 'strict' => true];
        // Never relax PR numbers, quantities, dimensions, quoted expressions or operators.
        if (count($words) < 2 || count($words) > 16 || preg_match('/[0-9=<>"\x27]|\b(?:pr|ppbj|sp|spph|rfq)[\/_.-]/i', $term)) {
            return $plan;
        }
        $plan['strict'] = false;
        $presence = null;
        foreach ($words as $word) {
            $visible = $this->sourceQuery([$word], $scope)->selectRaw('1')
                ->whereExists(fn ($links) => $links->selectRaw('1')->from('procurement_search_links as known_link')
                    ->join('ppbj as known_pr', 'known_pr.id', '=', 'known_link.ppbj_id')->whereColumn('known_link.source_id', 'src.id'));
            $part = DB::query()->selectRaw('? as word', [$word])->whereExists($visible);
            $presence = $presence ? $presence->unionAll($part) : $part;
        }
        // One bounded indexed presence query, scoped to live, permitted PR-linked sources.
        $found = $presence->pluck('word')->all();
        $plan['used'] = array_values(array_intersect($words, $found));
        $plan['missing'] = array_values(array_diff($words, $found));
        $plan['mode'] = $plan['missing'] && $plan['used'] ? 'partial' : 'all';

        return $plan;
    }

    public function search(string $term, string $scope = 'all', int $page = 1, array $filters = []): array
    {
        $started = hrtime(true);
        $plan = $this->resolve($term, $scope);
        $effective = implode(' ', $plan['used']);
        $query = Ppbj::select(array_values(array_unique(array_merge(ProcurementProvenanceService::PPBJ_COLUMNS,
            ['penyedia_eksternal', 'tgl_ppbj', 'status', 'progres']))))->whereIn('id', $this->linkedPrIds($plan['used'], $scope));
        $context = app(ProcurementSearchContext::class);
        $context->apply($query, $filters);
        $prs = $query->orderByDesc('id')->paginate(10, ['*'], 'page', $page);
        $contexts = $context->forPrs($prs->getCollection());
        // Resolve token intersections once for all visible PRs, instead of repeating
        // every token subquery in ten UNION branches. The per-PR bound is preserved.
        $ranked = $this->sourceQuery($plan['used'], $scope)
            ->join('procurement_search_links as link', 'link.source_id', '=', 'src.id')->whereIn('link.ppbj_id', $prs->modelKeys())
            ->select('src.id', 'src.kind', 'src.label', 'src.reference', 'src.state', 'src.error', 'src.page', 'src.pages', 'src.reading_engine', 'src.reading_confidence', 'link.ppbj_id', 'link.inferred')
            ->selectRaw('ROW_NUMBER() OVER (PARTITION BY link.ppbj_id ORDER BY src.kind, src.id) as source_rank');
        $matches = $prs->isEmpty() ? collect() : DB::query()->fromSub($ranked, 'ranked_sources')->where('source_rank', '<=', 5)->orderBy('ppbj_id')->orderBy('source_rank')->get()->groupBy('ppbj_id');
        // Read bounded snippets only for visible cards, not every matching document.
        $visible = $matches->flatMap(fn ($rows) => $rows->take(4))->pluck('id')->unique();
        $words = $plan['used'];
        usort($words, fn ($a, $b) => strlen($b) <=> strlen($a));
        $firstWord = $words[0] ?? '';
        $texts = $visible->isEmpty() ? collect() : DB::table('procurement_search_sources')->whereIn('id', $visible)
            ->select('id')->selectRaw("SUBSTR(COALESCE(metadata_text, ''), CASE WHEN INSTR(LOWER(metadata_text), ?) > 60 THEN INSTR(LOWER(metadata_text), ?) - 60 ELSE 1 END, 320) AS metadata_text", [$firstWord, $firstWord])
            ->selectRaw("SUBSTR(COALESCE(content, ''), CASE WHEN INSTR(LOWER(content), ?) > 60 THEN INSTR(LOWER(content), ?) - 60 ELSE 1 END, 320) AS content", [$firstWord, $firstWord])->get()->keyBy('id');
        $pageTexts = collect();
        if ($visible->isNotEmpty() && $words) {
            $positions = DB::table('procurement_search_terms')->whereIn('source_id', $visible)->where('first_page', '>', 0)
                ->where(function ($terms) use ($words) {
                    foreach ($words as $word) {
                        foreach (ProcurementSearchText::equivalents($word) as $equivalent) {
                            $terms->orWhere('term', 'like', $equivalent.'%');
                        }
                    }
                })->select('source_id', 'first_page', 'term')->selectRaw('ROW_NUMBER() OVER (PARTITION BY source_id ORDER BY first_page, term) AS position_rank');
            $firstPosition = DB::query()->fromSub($positions, 'positions')->where('position_rank', 1);
            $pageTexts = DB::table('procurement_search_passages as passage')->joinSub($firstPosition, 'hit', fn ($join) => $join->on('hit.source_id', '=', 'passage.source_id')->on('hit.first_page', '=', 'passage.page'))
                ->select('passage.source_id', 'passage.page', 'passage.engine', 'passage.confidence')
                ->selectRaw('SUBSTR(passage.content, CASE WHEN INSTR(LOWER(passage.content), hit.term) > 60 THEN INSTR(LOWER(passage.content), hit.term) - 60 ELSE 1 END, 320) AS content')->get()->keyBy('source_id');
        }

        return ['rows' => $prs->map(function ($pr) use ($matches, $texts, $pageTexts, $effective, $contexts) {
            $sources = $matches->get($pr->id, collect());

            return ['id' => $pr->id, 'number' => $pr->ppbj_no, 'description' => $pr->uraian, 'portfolio' => $pr->portofolio,
                'context' => $contexts[$pr->id] ?? null,
                'links' => ['ppbj' => route('ppbj.index', ['search' => $pr->ppbj_no]), 'sp' => route('sp.index', ['search' => $pr->ppbj_no]), 'spph' => route('spph.index', ['search' => $pr->ppbj_no])],
                'matches' => $sources->take(4)->map(function ($source) use ($texts, $pageTexts, $effective) {
                    $text = $texts->get($source->id);
                    $passage = $pageTexts->get($source->id);
                    $archive = str_starts_with($source->kind, 'archive_');

                    return ['kind' => $source->kind, 'label' => $source->label, 'reference' => $source->reference,
                        'state' => $source->state, 'page' => $source->page, 'pages' => $source->pages, 'inferred' => (bool) $source->inferred,
                        'reading' => ['engine' => $passage ? $passage->engine : $source->reading_engine,
                            'confidence' => ($passage ? $passage->confidence : $source->reading_confidence) === null ? null : (int) ($passage ? $passage->confidence : $source->reading_confidence)],
                        'match_page' => $passage?->page,
                        'notice' => $archive ? $source->error : null,
                        'snippet' => ProcurementSearchText::snippet($passage->content ?? (($text->content ?? '') !== '' ? $text->content : ($text->metadata_text ?? '')), $effective, $archive),
                        'url' => $archive ? route('procurement.search.file', ['source' => $source->id]).($passage ? '#page='.$passage->page : '') : route($source->kind.'.index', ['search' => $source->reference] + ($source->kind === 'sp' && str_starts_with($source->label, 'SP Oracle ') ? ['mode' => 'oracle'] : []))];
                })->values(), 'more_sources' => max(0, $sources->count() - 4)];
        })->values(), 'total' => $prs->total(), 'page' => $prs->currentPage(), 'last_page' => $prs->lastPage(),
            'query' => $plan,
            'equivalents' => collect($words)->mapWithKeys(fn ($word) => [$word => array_values(array_diff(ProcurementSearchText::equivalents($word), [$word]))])->filter(fn ($values) => count($values) > 0)->all(),
            'elapsed_ms' => max(1, (int) round((hrtime(true) - $started) / 1000000)),
            'index' => Cache::get('procurement-search:progress', ['state' => 'starting', 'ready' => 0, 'pending' => 0])];
    }
}
