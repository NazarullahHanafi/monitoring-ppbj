<?php

namespace App\Services;

use App\Models\Ppbj;
use App\Support\ProcurementSearchText;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ProcurementUnifiedSearch
{
    private function validateQuery(string $term, string $match): void
    {
        $words = ProcurementSearchText::words($term);
        $message = ! $words ? 'Masukkan nama barang atau nomor yang mengandung huruf/angka.' :
            (count($words) > 16 ? 'Gunakan maksimal 16 kata agar pencarian tetap terarah.' : null);
        if (! $message && preg_match('/^[\p{L}\s]+$/uD', trim($term)) && count($words) > 4 && max(array_map('strlen', $words)) < 3) {
            $message = 'Gunakan nama barang atau kata yang lebih lengkap; terlalu banyak potongan huruf pendek.';
        }
        if (! $message && $match === 'related' && count($words) > 1 && (count($words) > 8 || min(array_map('strlen', $words)) < 2)) {
            $message = 'Mode lintas dokumen memakai maksimal 8 kata, masing-masing minimal 2 karakter. Untuk kode singkat, pilih satu dokumen.';
        }
        if ($message) {
            throw \Illuminate\Validation\ValidationException::withMessages(['q' => $message]);
        }
    }

    public function sources(string $term, string $scope = 'all')
    {
        return $this->sourceQuery($this->resolve($term, $scope)['used'], $scope);
    }

    private function sourceQuery(array $words, string $scope)
    {
        usort($words, fn ($a, $b) => strlen($b) <=> strlen($a));
        $query = $this->scopedSources($scope);
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

        return $query;
    }

    private function scopedSources(string $scope)
    {
        $query = DB::table('procurement_search_sources as src')->where('src.active', true);
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

    private function matchingSources(array $words, string $scope, string $match)
    {
        if ($match !== 'related' || count($words) < 2 || count($words) > 16) {
            return $this->sourceQuery($words, $scope);
        }

        return $this->scopedSources($scope)->whereIn('src.id', DB::table('procurement_search_terms')->select('source_id')->where(function ($terms) use ($words) {
            foreach ($words as $word) {
                foreach (ProcurementSearchText::equivalents($word) as $equivalent) {
                    $terms->orWhere('term', 'like', $equivalent.'%');
                }
            }
        }));
    }

    private function relatedPrIds(array $words, string $scope)
    {
        $union = null;
        foreach ($words as $word) {
            // Isolate each indexed word lookup instead of asking the optimizer to
            // flatten eight interacting semijoins. One row per PR per word.
            $part = $this->sourceQuery([$word], $scope)->join('procurement_search_links as related_link', 'related_link.source_id', '=', 'src.id')
                ->select('related_link.ppbj_id')->distinct();
            $union = $union ? $union->unionAll($part) : $part;
        }

        return DB::query()->fromSub($union, 'word_prs')->select('ppbj_id')->groupBy('ppbj_id')->havingRaw('COUNT(*) = ?', [count($words)]);
    }

    private function scoreSql(): string
    {
        // Discrete evidence priorities, never a probability or OCR accuracy percentage.
        return 'CASE WHEN LOWER(src.reference) = ? THEN 32 ELSE 0 END'
            .' + CASE WHEN link.inferred = 0 THEN 8 ELSE 0 END'
            ." + CASE WHEN src.state = 'ready' THEN 4 WHEN src.state IN ('partial', 'pending') THEN 2 ELSE 0 END"
            ." + CASE WHEN src.kind IN ('ppbj', 'sp', 'spph') THEN 2 ELSE 0 END"
            .' + CASE WHEN src.reading_confidence >= 80 THEN 1 ELSE 0 END';
    }

    public function vocabulary(string $scope, array $filters)
    {
        $prs = Ppbj::query()->select('ppbj.id');
        app(ProcurementSearchContext::class)->apply($prs, $filters);
        $sources = $this->scopedSources($scope)->select('src.id')->whereExists(fn ($links) => $links->selectRaw('1')->from('procurement_search_links as vocabulary_link')
            ->whereColumn('vocabulary_link.source_id', 'src.id')->whereIn('vocabulary_link.ppbj_id', $prs));

        return DB::table('procurement_search_terms')->whereIn('source_id', $sources)->select('term')->distinct();
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

    public function search(string $term, string $scope = 'all', int $page = 1, array $filters = [], string $match = 'source', string $sort = 'relevance'): array
    {
        $started = hrtime(true);
        $this->validateQuery($term, $match);
        $plan = $this->resolve($term, $scope);
        $effective = implode(' ', $plan['used']);
        $scores = $this->matchingSources($plan['used'], $scope, $match)
            ->join('procurement_search_links as link', 'link.source_id', '=', 'src.id')
            ->select('link.ppbj_id')->selectRaw('MAX('.$this->scoreSql().') AS relevance_score', [mb_strtolower(trim($term))])->groupBy('link.ppbj_id');
        $query = Ppbj::select(array_values(array_unique(array_merge(ProcurementProvenanceService::PPBJ_COLUMNS,
            ['penyedia_eksternal', 'tgl_ppbj', 'status', 'progres']))))->joinSub($scores, 'search_score', fn ($join) => $join->on('search_score.ppbj_id', '=', 'ppbj.id'));
        if ($match === 'related' && count($plan['used']) > 1) {
            $query->whereIn('ppbj.id', $this->relatedPrIds($plan['used'], $scope));
        }
        $context = app(ProcurementSearchContext::class);
        $context->apply($query, $filters);
        if ($sort !== 'newest') {
            $query->orderByRaw('CASE WHEN LOWER(ppbj.ppbj_no) = ? THEN 1 ELSE 0 END DESC', [mb_strtolower(trim($term))])->orderByDesc('search_score.relevance_score');
        }
        $prs = $query->orderByDesc('ppbj.id')->paginate(10, ['*'], 'page', $page);
        $contexts = $context->forPrs($prs->getCollection());
        // Resolve token intersections once for all visible PRs, instead of repeating
        // every token subquery in ten UNION branches. The per-PR bound is preserved.
        $ranked = $this->matchingSources($plan['used'], $scope, $match)
            ->join('procurement_search_links as link', 'link.source_id', '=', 'src.id')->whereIn('link.ppbj_id', $prs->modelKeys())
            ->select('src.id', 'src.kind', 'src.label', 'src.reference', 'src.state', 'src.error', 'src.page', 'src.pages', 'src.reading_engine', 'src.reading_confidence', 'link.ppbj_id', 'link.inferred')
            ->selectRaw('ROW_NUMBER() OVER (PARTITION BY link.ppbj_id ORDER BY '.$this->scoreSql().' DESC, src.kind, src.id) as source_rank', [mb_strtolower(trim($term))]);
        $matches = $prs->isEmpty() ? collect() : DB::query()->fromSub($ranked, 'ranked_sources')->where('source_rank', '<=', 5)->orderBy('ppbj_id')->orderBy('source_rank')->get()->groupBy('ppbj_id');
        // Read bounded snippets only for visible cards, not every matching document.
        $visible = $matches->flatMap(fn ($rows) => $rows->take(4))->pluck('id')->unique();
        $evidence = collect();
        if ($match === 'related' && count($plan['used']) > 1 && $visible->isNotEmpty()) {
            $union = null;
            foreach ($plan['used'] as $word) {
                $part = $this->sourceQuery([$word], $scope)->whereIn('src.id', $visible)->select('src.id')->selectRaw('? as word', [$word]);
                $union = $union ? $union->unionAll($part) : $part;
            }
            $evidence = $union->get()->groupBy('id')->map(fn ($rows) => $rows->pluck('word')->all());
        }
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

        $suggestions = app(ProcurementSearchSuggestions::class)->forQuery($term, $scope, $filters, $plan, $prs->total());

        return ['rows' => $prs->map(function ($pr) use ($matches, $texts, $pageTexts, $effective, $contexts, $evidence, $plan, $term, $match) {
            $sources = $matches->get($pr->id, collect());

            return ['id' => $pr->id, 'number' => $pr->ppbj_no, 'description' => $pr->uraian, 'portfolio' => $pr->portofolio,
                'context' => $contexts[$pr->id] ?? null,
                'relevance' => ['reason' => mb_strtolower(trim($pr->ppbj_no)) === mb_strtolower(trim($term)) ? 'Nomor PR persis' : ($sources->first()?->inferred ? 'Relasi PR terbaca dari scan; periksa kecocokan' : 'Kecocokan dari sumber dengan relasi PR tercatat')],
                'links' => ['ppbj' => route('ppbj.index', ['search' => $pr->ppbj_no]), 'sp' => route('sp.index', ['search' => $pr->ppbj_no]), 'spph' => route('spph.index', ['search' => $pr->ppbj_no])],
                'matches' => $sources->take(4)->map(function ($source) use ($texts, $pageTexts, $effective, $evidence, $plan, $match) {
                    $text = $texts->get($source->id);
                    $passage = $pageTexts->get($source->id);
                    $archive = str_starts_with($source->kind, 'archive_');

                    return ['kind' => $source->kind, 'label' => $source->label, 'reference' => $source->reference,
                        'state' => $source->state, 'page' => $source->page, 'pages' => $source->pages, 'inferred' => (bool) $source->inferred,
                        'reading' => ['engine' => $passage ? $passage->engine : $source->reading_engine,
                            'confidence' => ($passage ? $passage->confidence : $source->reading_confidence) === null ? null : (int) ($passage ? $passage->confidence : $source->reading_confidence)],
                        'match_page' => $passage?->page,
                        'matched_words' => $evidence->get($source->id, $match === 'related' && count($plan['used']) > 1 ? [] : $plan['used']),
                        'notice' => $archive ? $source->error : null,
                        'snippet' => ProcurementSearchText::snippet($passage->content ?? (($text->content ?? '') !== '' ? $text->content : ($text->metadata_text ?? '')), $effective, $archive),
                        'url' => $archive ? route('procurement.search.file', ['source' => $source->id]).($passage ? '#page='.$passage->page : '') : route($source->kind.'.index', ['search' => $source->reference] + ($source->kind === 'sp' && str_starts_with($source->label, 'SP Oracle ') ? ['mode' => 'oracle'] : []))];
                })->values(), 'more_sources' => max(0, $sources->count() - 4)];
        })->values(), 'total' => $prs->total(), 'page' => $prs->currentPage(), 'last_page' => $prs->lastPage(),
            'query' => $plan,
            'match' => $match, 'sort' => $sort, 'suggestions' => $suggestions,
            'equivalents' => collect($words)->mapWithKeys(fn ($word) => [$word => array_values(array_diff(ProcurementSearchText::equivalents($word), [$word]))])->filter(fn ($values) => count($values) > 0)->all(),
            'elapsed_ms' => max(1, (int) round((hrtime(true) - $started) / 1000000)),
            'index' => Cache::get('procurement-search:progress', ['state' => 'starting', 'ready' => 0, 'pending' => 0])];
    }
}
