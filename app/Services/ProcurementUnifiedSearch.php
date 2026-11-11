<?php

namespace App\Services;

use App\Models\Ppbj;
use App\Support\ProcurementSearchText;
use Illuminate\Database\Eloquent\Builder;
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

    private function sourceQuery(array $words, string $scope, string $lexical = 'expanded')
    {
        usort($words, fn ($a, $b) => strlen($b) <=> strlen($a));
        $query = $this->scopedSources($scope);
        if (! $words || count($words) > 16) {
            return $query->whereRaw('1=0');
        }
        foreach ($words as $word) {
            // Prefix lookup uses the leading term index, never a full OCR-text LIKE scan.
            $query->whereIn('src.id', DB::table('procurement_search_terms')->select('source_id')->where(fn ($terms) => $this->termMatch($terms, [$word], $lexical)));
        }

        return $query;
    }

    private function termMatch($query, array $words, string $lexical): void
    {
        foreach ($words as $word) {
            foreach ($lexical === 'exact' ? [$word] : ProcurementSearchText::equivalents($word) as $equivalent) {
                $query->orWhere('term', $lexical === 'exact' ? '=' : 'like', $equivalent.($lexical === 'exact' ? '' : '%'));
            }
        }
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

    private function matchingSources(array $words, string $scope, string $match, string $lexical = 'expanded', string $reference = '')
    {
        if ($match === 'reference') {
            // Literal LIKE preserves case-insensitive reference matching and an index range.
            $literal = str_replace(['!', '%', '_'], ['!!', '!%', '!_'], trim($reference));

            return $this->scopedSources($scope)->whereRaw("src.reference LIKE ? ESCAPE '!'", [$literal]);
        }
        if ($match !== 'related' || count($words) < 2 || count($words) > 16) {
            return $this->sourceQuery($words, $scope, $lexical);
        }

        return $this->scopedSources($scope)->whereIn('src.id', DB::table('procurement_search_terms')->select('source_id')->where(fn ($terms) => $this->termMatch($terms, $words, $lexical)));
    }

    private function relatedPrIds(array $words, string $scope, string $lexical)
    {
        $union = null;
        foreach ($words as $word) {
            // Isolate each indexed word lookup instead of asking the optimizer to
            // flatten eight interacting semijoins. One row per PR per word.
            $part = $this->sourceQuery([$word], $scope, $lexical)->join('procurement_search_links as related_link', 'related_link.source_id', '=', 'src.id')
                ->select('related_link.ppbj_id')->distinct();
            $union = $union ? $union->unionAll($part) : $part;
        }

        return DB::query()->fromSub($union, 'word_prs')->select('ppbj_id')->groupBy('ppbj_id')->havingRaw('COUNT(*) = ?', [count($words)]);
    }

    private function scoreSql(bool $tokens = false): string
    {
        // Discrete evidence priorities, never a probability or OCR accuracy percentage.
        return 'CASE WHEN LOWER(src.reference) = ? THEN 100000 ELSE 0 END'
            .($tokens ? ' + COALESCE(token_score.exact_words, 0) * 1000 + COALESCE(token_score.direct_words, 0) * 50' : '')
            .' + CASE WHEN link.inferred = 0 THEN 8 ELSE 0 END'
            ." + CASE WHEN src.state = 'ready' THEN 4 WHEN src.state IN ('partial', 'pending') THEN 2 ELSE 0 END"
            ." + CASE WHEN src.kind IN ('ppbj', 'sp', 'spph') THEN 2 ELSE 0 END"
            .' + CASE WHEN src.reading_confidence >= 80 THEN 1 ELSE 0 END';
    }

    private function tokenScores(array $words)
    {
        $exact = implode(' + ', array_fill(0, count($words), 'MAX(CASE WHEN term = ? THEN 1 ELSE 0 END)'));
        $direct = implode(' + ', array_fill(0, count($words), 'MAX(CASE WHEN term LIKE ? THEN 1 ELSE 0 END)'));

        return DB::table('procurement_search_terms')->select('source_id')->selectRaw($exact.' AS exact_words', $words)
            ->selectRaw($direct.' AS direct_words', array_map(fn ($word) => $word.'%', $words))
            ->where(fn ($terms) => $this->termMatch($terms, $words, 'expanded'))->groupBy('source_id');
    }

    private function wordEvidence($visible, array $words, string $lexical)
    {
        $union = null;
        foreach ($words as $word) {
            // One strongest indexed token per query word/source. Page zero means
            // document metadata, not page one; NULL means the location is unknown.
            $part = DB::table('procurement_search_terms')->whereIn('source_id', $visible)
                ->where(fn ($terms) => $this->termMatch($terms, [$word], $lexical))->select('source_id', 'term', 'first_page')->selectRaw('? AS query_word', [$word])
                ->selectRaw('ROW_NUMBER() OVER (PARTITION BY source_id ORDER BY CASE WHEN term = ? THEN 2 WHEN term LIKE ? THEN 1 ELSE 0 END DESC, CASE WHEN first_page IS NULL THEN 1 ELSE 0 END, first_page, term) AS word_rank', [$word, $word.'%']);
            $union = $union ? $union->unionAll($part) : $part;
        }

        return $union && $visible->isNotEmpty() ? DB::query()->fromSub($union, 'word_positions')->where('word_rank', 1)->get()->groupBy('source_id') : collect();
    }

    public function vocabulary(string $scope, array $filters)
    {
        $prs = Ppbj::query()->select('ppbj.id');
        $this->applyFilters($prs, $scope, $filters);
        $sources = $this->scopedSources($scope)->select('src.id')->whereExists(fn ($links) => $links->selectRaw('1')->from('procurement_search_links as vocabulary_link')
            ->whereColumn('vocabulary_link.source_id', 'src.id')->whereIn('vocabulary_link.ppbj_id', $prs));

        return DB::table('procurement_search_terms')->whereIn('source_id', $sources)->select('term')->distinct();
    }

    private function excludedWords(array $filters): array
    {
        $value = trim((string) ($filters['exclude'] ?? ''));
        $words = ProcurementSearchText::words($value);
        if ($value !== '' && (! $words || count($words) > 4 || min(array_map('strlen', $words)) < 2)) {
            throw \Illuminate\Validation\ValidationException::withMessages(['exclude' => 'Gunakan maksimal 4 kata pengecualian, masing-masing minimal 2 karakter.']);
        }

        return $words;
    }

    private function applyFilters(Builder $query, string $scope, array $filters): void
    {
        app(ProcurementSearchContext::class)->apply($query, $filters);
        $excluded = $this->excludedWords($filters);
        if ($excluded) {
            // Whole tokens only. Exclude the PR if any fresh, active source in the
            // selected scope contains a forbidden token; no OCR body scans.
            $sources = $this->scopedSources($scope)->whereIn('src.id', DB::table('procurement_search_terms')->select('source_id')->whereIn('term', $excluded));
            $query->whereNotIn('ppbj.id', $sources->join('procurement_search_links as excluded_link', 'excluded_link.source_id', '=', 'src.id')->select('excluded_link.ppbj_id'));
        }
    }

    public function confirmedSuggestions(array $suggestions, string $scope, array $filters, string $match): array
    {
        $union = null;
        foreach (array_slice($suggestions, 0, 4) as $position => $suggestion) {
            $words = ProcurementSearchText::words($suggestion['query']);
            if (! $words || count($words) > 16 || ($match === 'related' && count($words) > 8)) {
                continue;
            }
            $prs = Ppbj::query()->selectRaw('1');
            $this->applyFilters($prs, $scope, $filters);
            $prs->whereIn('ppbj.id', $match === 'related' && count($words) > 1
                ? $this->relatedPrIds($words, $scope, 'expanded') : $this->linkedPrIds($words, $scope));
            $part = DB::query()->selectRaw('? AS candidate', [$position])->whereExists($prs->toBase());
            $union = $union ? $union->unionAll($part) : $part;
        }
        $positions = $union ? $union->pluck('candidate')->all() : [];

        return array_values(array_intersect_key($suggestions, array_flip($positions)));
    }

    public function resolve(string $term, string $scope = 'all', string $lexical = 'expanded'): array
    {
        $words = ProcurementSearchText::words($term);
        $plan = ['mode' => 'all', 'used' => $words, 'missing' => [], 'strict' => true];
        // Never relax PR numbers, quantities, dimensions, quoted expressions or operators.
        if ($lexical === 'exact' || count($words) < 2 || count($words) > 16 || preg_match('/[0-9=<>"\x27]|\b(?:pr|ppbj|sp|spph|rfq)[\/_.-]/i', $term)) {
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

    public function search(string $term, string $scope = 'all', int $page = 1, array $filters = [], string $match = 'source', string $sort = 'relevance', array $options = []): array
    {
        $started = hrtime(true);
        $this->validateQuery($term, $match);
        $excluded = $this->excludedWords($filters);
        $lexical = $match === 'reference' ? 'exact' : ($options['lexical'] ?? 'expanded');
        $evidencePr = isset($options['pr']) ? (int) $options['pr'] : null;
        $after = max(0, (int) ($options['after'] ?? 0));
        $sourceLimit = $evidencePr ? 8 : 4;
        $plan = $this->resolve($term, $scope, $lexical);
        $effective = implode(' ', $plan['used']);
        $rankTokens = ! $evidencePr && $match !== 'reference' && $lexical !== 'exact' && count($plan['used']) > 0;
        $rankPrTokens = $rankTokens && $sort !== 'newest';
        $scores = $this->matchingSources($plan['used'], $scope, $match, $lexical, $term)
            ->join('procurement_search_links as link', 'link.source_id', '=', 'src.id')
            ->select('link.ppbj_id')->selectRaw('MAX('.$this->scoreSql($rankPrTokens).') AS relevance_score', [mb_strtolower(trim($term))])->groupBy('link.ppbj_id');
        if ($rankPrTokens) {
            $scores->joinSub($this->tokenScores($plan['used']), 'token_score', fn ($join) => $join->on('token_score.source_id', '=', 'src.id'));
        }
        if ($evidencePr) {
            $scores->where('link.ppbj_id', $evidencePr);
        }
        $query = Ppbj::select(array_values(array_unique(array_merge(ProcurementProvenanceService::PPBJ_COLUMNS,
            ['penyedia_eksternal', 'tgl_ppbj', 'status', 'progres']))))->joinSub($scores, 'search_score', fn ($join) => $join->on('search_score.ppbj_id', '=', 'ppbj.id'));
        if ($match === 'related' && count($plan['used']) > 1) {
            $query->whereIn('ppbj.id', $this->relatedPrIds($plan['used'], $scope, $lexical));
        }
        $context = app(ProcurementSearchContext::class);
        $this->applyFilters($query, $scope, $filters);
        if ($sort !== 'newest') {
            $query->orderByRaw('CASE WHEN LOWER(ppbj.ppbj_no) = ? THEN 1 ELSE 0 END DESC', [mb_strtolower(trim($term))])->orderByDesc('search_score.relevance_score');
        }
        $prs = $query->orderByDesc('ppbj.id')->paginate($evidencePr ? 1 : 10, ['*'], 'page', $evidencePr ? 1 : $page);
        $contexts = $evidencePr ? [] : $context->forPrs($prs->getCollection());
        // Resolve token intersections once for all visible PRs, instead of repeating
        // every token subquery in ten UNION branches. The per-PR bound is preserved.
        $ranked = $this->matchingSources($plan['used'], $scope, $match, $lexical, $term)
            ->join('procurement_search_links as link', 'link.source_id', '=', 'src.id')->whereIn('link.ppbj_id', $prs->modelKeys())
            ->select('src.id', 'src.kind', 'src.label', 'src.reference', 'src.state', 'src.error', 'src.page', 'src.pages', 'src.reading_engine', 'src.reading_confidence',
                'src.queued_at', 'src.priority_until', 'src.priority_pages', 'src.attempts', 'src.reader_revision', 'src.retry_at', 'link.ppbj_id', 'link.inferred');
        if ($evidencePr) {
            $matches = $prs->isEmpty() ? collect() : $ranked->where('src.id', '>', $after)->orderBy('src.id')->limit(9)->get()->groupBy('ppbj_id');
        } else {
            if ($rankTokens) {
                $ranked->joinSub($this->tokenScores($plan['used']), 'token_score', fn ($join) => $join->on('token_score.source_id', '=', 'src.id'));
            }
            $ranked->selectRaw('ROW_NUMBER() OVER (PARTITION BY link.ppbj_id ORDER BY '.$this->scoreSql($rankTokens).' DESC, src.kind, src.id) as source_rank', [mb_strtolower(trim($term))]);
            $matches = $prs->isEmpty() ? collect() : DB::query()->fromSub($ranked, 'ranked_sources')->where('source_rank', '<=', 5)->orderBy('ppbj_id')->orderBy('source_rank')->get()->groupBy('ppbj_id');
        }
        // Read bounded snippets only for visible cards, not every matching document.
        $visible = $matches->flatMap(fn ($rows) => $rows->take($sourceLimit))->pluck('id')->unique();
        $wordEvidence = $match === 'reference' ? collect() : $this->wordEvidence($visible, $plan['used'], $lexical);
        $evidence = $wordEvidence->map(fn ($rows) => $rows->pluck('query_word')->all());
        $words = $plan['used'];
        usort($words, fn ($a, $b) => strlen($b) <=> strlen($a));
        $firstWord = $words[0] ?? '';
        $textQuery = DB::table('procurement_search_sources')->whereIn('id', $visible)
            ->select('id')->selectRaw("SUBSTR(COALESCE(metadata_text, ''), CASE WHEN INSTR(LOWER(metadata_text), ?) > 60 THEN INSTR(LOWER(metadata_text), ?) - 60 ELSE 1 END, 320) AS metadata_text", [$firstWord, $firstWord]);
        if ($match === 'reference') {
            $textQuery->selectRaw("'' AS content");
        } else {
            $textQuery->selectRaw("SUBSTR(COALESCE(content, ''), CASE WHEN INSTR(LOWER(content), ?) > 60 THEN INSTR(LOWER(content), ?) - 60 ELSE 1 END, 320) AS content", [$firstWord, $firstWord]);
        }
        $texts = $visible->isEmpty() ? collect() : $textQuery->get()->keyBy('id');
        $pageTexts = collect();
        $positions = null;
        foreach ($wordEvidence as $sourceId => $hits) {
            // Prefer the page supporting most of the selected word locations,
            // then the earlier page. These are first locations, not all occurrences.
            $page = $hits->filter(fn ($hit) => $hit->first_page > 0)->groupBy('first_page')
                ->sort(fn ($a, $b) => $b->count() <=> $a->count() ?: (int) $a->first()->first_page <=> (int) $b->first()->first_page)->first();
            if ($page) {
                $hit = $page->first();
                $part = DB::query()->selectRaw('? AS source_id, ? AS page, ? AS term', [$sourceId, $hit->first_page, $hit->term]);
                $positions = $positions ? $positions->unionAll($part) : $part;
            }
        }
        if ($positions) {
            $pageTexts = DB::table('procurement_search_passages as passage')->joinSub($positions, 'hit', fn ($join) => $join->on('hit.source_id', '=', 'passage.source_id')->on('hit.page', '=', 'passage.page'))
                ->select('passage.source_id', 'passage.page', 'passage.engine', 'passage.confidence')
                ->selectRaw('SUBSTR(passage.content, CASE WHEN INSTR(LOWER(passage.content), hit.term) > 60 THEN INSTR(LOWER(passage.content), hit.term) - 60 ELSE 1 END, 320) AS content')->get()->keyBy('source_id');
        }

        $suggestions = $evidencePr || $lexical === 'exact' ? [] : app(ProcurementSearchSuggestions::class)->forQuery($term, $scope, $filters, $plan, $prs->total(), $match);

        return ['rows' => $prs->map(function ($pr) use ($matches, $texts, $pageTexts, $effective, $contexts, $evidence, $wordEvidence, $plan, $term, $match, $sourceLimit, $after, $evidencePr) {
            $sources = $matches->get($pr->id, collect());

            return ['id' => $pr->id, 'number' => $pr->ppbj_no, 'description' => $pr->uraian, 'portfolio' => $pr->portofolio,
                'context' => $contexts[$pr->id] ?? null,
                'relevance' => ['reason' => mb_strtolower(trim($pr->ppbj_no)) === mb_strtolower(trim($term)) ? 'Nomor PR persis' : ($sources->first()?->inferred ? 'Relasi PR terbaca dari scan; periksa kecocokan' : 'Kecocokan dari sumber dengan relasi PR tercatat')],
                'links' => ['ppbj' => route('ppbj.index', ['search' => $pr->ppbj_no]), 'sp' => route('sp.index', ['search' => $pr->ppbj_no]), 'spph' => route('spph.index', ['search' => $pr->ppbj_no])],
                'matches' => $sources->take($sourceLimit)->map(function ($source) use ($texts, $pageTexts, $effective, $evidence, $wordEvidence, $plan, $match) {
                    $text = $texts->get($source->id);
                    $passage = $pageTexts->get($source->id);
                    $archive = str_starts_with($source->kind, 'archive_');

                    return ['id' => (int) $source->id, 'kind' => $source->kind, 'label' => $source->label, 'reference' => $source->reference,
                        'state' => $source->state, 'page' => $source->page, 'pages' => $source->pages, 'inferred' => (bool) $source->inferred,
                        'queue' => $archive ? ['queued_at' => $source->queued_at,
                            'priority' => $source->priority_until && now()->lt($source->priority_until) && (int) $source->page < (int) $source->priority_pages,
                            'can_request' => in_array($source->state, ['pending', 'partial', 'failed'], true) && ($source->attempts < 3 || $source->reader_revision < 2)
                                && (! $source->retry_at || now()->gte($source->retry_at))] : null,
                        'reading' => ['engine' => $passage ? $passage->engine : $source->reading_engine,
                            'confidence' => ($passage ? $passage->confidence : $source->reading_confidence) === null ? null : (int) ($passage ? $passage->confidence : $source->reading_confidence)],
                        'match_page' => $passage?->page,
                        'matched_words' => $evidence->get($source->id, $match === 'related' && count($plan['used']) > 1 ? [] : $plan['used']),
                        'word_evidence' => $wordEvidence->get($source->id, collect())->map(function ($hit) use ($source, $archive) {
                            $page = $hit->first_page === null ? null : (int) $hit->first_page;

                            return ['word' => $hit->query_word, 'matched' => $hit->term,
                                'type' => $hit->term === $hit->query_word ? 'exact' : (str_starts_with($hit->term, $hit->query_word) ? 'prefix' : 'equivalent'),
                                'location' => $page === null ? 'unknown' : ($page > 0 ? 'page' : 'document'), 'page' => $page > 0 ? $page : null,
                                'url' => $archive && $page > 0 ? route('procurement.search.file', ['source' => $source->id]).'#page='.$page : null];
                        })->values(),
                        'notice' => $archive ? $source->error : null,
                        'snippet' => ProcurementSearchText::snippet($passage->content ?? (($text->content ?? '') !== '' ? $text->content : ($text->metadata_text ?? '')), $effective, $archive),
                        'url' => $archive ? route('procurement.search.file', ['source' => $source->id]).($passage ? '#page='.$passage->page : '') : route($source->kind.'.index', ['search' => $source->reference] + ($source->kind === 'sp' && str_starts_with($source->label, 'SP Oracle ') ? ['mode' => 'oracle'] : []))];
                })->values(), 'more_sources' => max(0, $sources->count() - $sourceLimit),
                'evidence' => ['after' => $evidencePr ? (int) ($sources->take($sourceLimit)->last()?->id ?? $after) : 0, 'has_more' => $sources->count() > $sourceLimit]];
        })->values(), 'total' => $prs->total(), 'page' => $prs->currentPage(), 'last_page' => $prs->lastPage(),
            'query' => $plan,
            'match' => $match, 'sort' => $sort, 'lexical' => $lexical, 'excluded' => $excluded, 'suggestions' => $suggestions,
            'equivalents' => $lexical === 'exact' ? [] : collect($words)->mapWithKeys(fn ($word) => [$word => array_values(array_diff(ProcurementSearchText::equivalents($word), [$word]))])->filter(fn ($values) => count($values) > 0)->all(),
            'elapsed_ms' => max(1, (int) round((hrtime(true) - $started) / 1000000)),
            'index' => Cache::get('procurement-search:progress', ['state' => 'starting', 'ready' => 0, 'pending' => 0])];
    }
}
