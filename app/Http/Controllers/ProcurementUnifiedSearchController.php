<?php

namespace App\Http\Controllers;

use App\Services\ProcurementUnifiedSearch;
use Illuminate\Http\Request;

class ProcurementUnifiedSearchController extends Controller
{
    public function __invoke(Request $request, ProcurementUnifiedSearch $search)
    {
        abort_unless(config('procurement_search.enabled'), 404);
        $values = $request->validate(['q' => 'required|string|min:1|max:255', 'scope' => 'nullable|in:all,ppbj,sp,spph,archive', 'page' => 'nullable|integer|min:1|max:10000',
            'buyer' => 'nullable|string|max:120', 'vendor' => 'nullable|string|max:120', 'creator' => 'nullable|string|max:120',
            'exclude' => 'nullable|string|max:120',
            'pr_id' => 'nullable|integer|min:1',
            'match' => 'nullable|in:source,related,reference', 'sort' => 'nullable|in:relevance,newest',
            'lexical' => 'nullable|in:expanded,exact', 'pr' => 'nullable|required_with:after|integer|min:1', 'after' => 'nullable|integer|min:0',
            'totals' => 'nullable|in:exact,deferred,only']);

        return response()->json($search->search(trim($values['q']), $values['scope'] ?? 'all', (int) ($values['page'] ?? 1), array_intersect_key($values, array_flip(['buyer', 'vendor', 'creator', 'exclude', 'pr_id'])), $values['match'] ?? 'source', $values['sort'] ?? 'relevance', array_intersect_key($values, array_flip(['lexical', 'pr', 'after', 'totals']))))
            ->header('Cache-Control', 'private, no-store');
    }
}
