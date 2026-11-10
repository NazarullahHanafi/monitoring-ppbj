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
        $query = DB::table('procurement_search_sources as src')->where('src.active', true);
        if (! $words || count($words) > 16) {
            return $query->whereRaw('1=0');
        }
        foreach ($words as $word) {
            // Prefix lookup uses the leading term index, never a full OCR-text LIKE scan.
            $query->whereIn('src.id', DB::table('procurement_search_terms')->select('source_id')->where('term', 'like', $word.'%'));
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
        $prs = Ppbj::select('id', 'ppbj_no', 'uraian', 'portofolio', 'buyer')->whereIn('id', $this->prIds($term, $scope))
            ->orderByDesc('id')->paginate(10, ['*'], 'page', $page);
        $bounded = null;
        foreach ($prs as $pr) {
            // Five sources per PR in one portable UNION query. A PR with hundreds
            // of files cannot consume another PR's snippet budget.
            $part = $this->sources($term, $scope)
                ->join('procurement_search_links as link', 'link.source_id', '=', 'src.id')->where('link.ppbj_id', $pr->id)
                ->select('src.id', 'src.kind', 'src.source_key', 'src.label', 'src.reference', 'src.archive_pr', 'src.state', 'src.page', 'src.pages', 'link.ppbj_id', 'link.inferred')
                ->orderBy('src.kind')->orderBy('src.id')->limit(5);
            $part = DB::query()->fromSub($part, 'bounded_sources');
            if ($bounded === null) {
                $bounded = $part;
            } else {
                $bounded->unionAll($part);
            }
        }
        $matches = $bounded ? $bounded->get()->groupBy('ppbj_id') : collect();
        // Read bounded snippets only for visible cards, not every matching document.
        $visible = $matches->flatMap(fn ($rows) => $rows->take(4))->pluck('id')->unique();
        $firstWord = ProcurementSearchText::words($term)[0] ?? '';
        $texts = $visible->isEmpty() ? collect() : DB::table('procurement_search_sources')->whereIn('id', $visible)
            ->select('id', 'metadata_text')->selectRaw("SUBSTR(COALESCE(content, ''), CASE WHEN INSTR(LOWER(content), ?) > 60 THEN INSTR(LOWER(content), ?) - 60 ELSE 1 END, 320) AS content", [$firstWord, $firstWord])->get()->keyBy('id');

        return ['rows' => $prs->map(function ($pr) use ($matches, $texts, $term) {
            $sources = $matches->get($pr->id, collect());

            return ['id' => $pr->id, 'number' => $pr->ppbj_no, 'description' => $pr->uraian, 'portfolio' => $pr->portofolio,
                'links' => ['ppbj' => route('ppbj.index', ['search' => $pr->ppbj_no]), 'sp' => route('sp.index', ['search' => $pr->ppbj_no]), 'spph' => route('spph.index', ['search' => $pr->ppbj_no])],
                'matches' => $sources->take(4)->map(function ($source) use ($texts, $term) {
                    $text = $texts->get($source->id);
                    $archive = str_starts_with($source->kind, 'archive_');

                    return ['kind' => $source->kind, 'label' => $source->label, 'reference' => $source->reference,
                        'state' => $source->state, 'page' => $source->page, 'pages' => $source->pages, 'inferred' => (bool) $source->inferred,
                        'snippet' => ProcurementSearchText::snippet(($text->content ?? '') !== '' ? $text->content : ($text->metadata_text ?? ''), $term),
                        'url' => $archive ? route('procurement.search.file', ['source' => $source->id]) : route($source->kind.'.index', ['search' => $source->reference] + ($source->kind === 'sp' && str_starts_with($source->label, 'SP Oracle ') ? ['mode' => 'oracle'] : []))];
                })->values(), 'more_sources' => max(0, $sources->count() - 4)];
        })->values(), 'total' => $prs->total(), 'page' => $prs->currentPage(), 'last_page' => $prs->lastPage(),
            'index' => Cache::get('procurement-search:progress', ['state' => 'starting', 'ready' => 0, 'pending' => 0])];
    }
}
