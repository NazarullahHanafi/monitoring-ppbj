<?php

namespace App\Http\Controllers;

use App\Services\ProcurementUnifiedSearch;
use Illuminate\Http\Request;

class ProcurementUnifiedSearchController extends Controller
{
    public function __invoke(Request $request, ProcurementUnifiedSearch $search)
    {
        abort_unless(config('procurement_search.enabled'), 404);
        $values = $request->validate(['q' => 'required|string|min:1|max:255', 'scope' => 'nullable|in:all,ppbj,sp,spph,archive', 'page' => 'nullable|integer|min:1|max:10000']);
        $words = \App\Support\ProcurementSearchText::words($values['q']);
        if (! $words) {
            throw \Illuminate\Validation\ValidationException::withMessages(['q' => 'Masukkan nama barang atau nomor yang mengandung huruf/angka.']);
        }
        if (count($words) > 16) {
            throw \Illuminate\Validation\ValidationException::withMessages(['q' => 'Gunakan maksimal 16 kata agar pencarian tetap terarah.']);
        }

        return response()->json($search->search(trim($values['q']), $values['scope'] ?? 'all', (int) ($values['page'] ?? 1)))
            ->header('Cache-Control', 'private, no-store');
    }
}
