<?php

namespace App\Http\Controllers;

use App\Services\ProcurementFileSources;
use App\Services\ProcurementPageEvidence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProcurementPageEvidenceController extends Controller
{
    public function __invoke(Request $request, int $source, ProcurementPageEvidence $evidence)
    {
        abort_unless(config('procurement_search.enabled'), 404);
        abort_unless($request->user()?->department === 'umum', 403);
        $data = $request->validate(['q' => 'required|string|max:255', 'mode' => 'nullable|in:words,phrase',
            'after' => 'nullable|integer|min:0|max:1000000', 'version' => 'nullable|string|size:64|regex:/^[a-f0-9]+$/']);
        if (($data['after'] ?? 0) > 0 && empty($data['version'])) {
            throw \Illuminate\Validation\ValidationException::withMessages(['version' => 'Mulai dari awal atau gunakan versi bacaan dari kelompok sebelumnya.']);
        }
        $query = DB::table('procurement_search_sources')->where('id', $source)->where('active', true)->whereIn('kind', ProcurementFileSources::KINDS)
            ->where('verified_at', '>=', now()->subMinutes(config('procurement_search.archive_fresh_minutes')));
        ProcurementFileSources::liveLocal($query, 'procurement_search_sources');
        if ($request->user()->role !== 'superadmin') {
            $query->whereExists(fn ($links) => $links->selectRaw('1')->from('procurement_search_links')->join('ppbj', 'ppbj.id', '=', 'procurement_search_links.ppbj_id')
                ->whereColumn('source_id', 'procurement_search_sources.id'));
        }
        $row = $query->first(['id', 'label', 'fingerprint', 'updated_at', 'page', 'pages', 'state', 'reading_engine']);
        abort_unless($row, 404);

        return response()->json($evidence->search($row, trim($data['q']), $data['mode'] ?? 'words', (int) ($data['after'] ?? 0), $data['version'] ?? null))
            ->header('Cache-Control', 'private, no-store');
    }
}
