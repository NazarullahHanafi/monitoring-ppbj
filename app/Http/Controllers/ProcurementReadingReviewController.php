<?php

namespace App\Http\Controllers;

use App\Services\ProcurementFileSources;
use App\Services\ProcurementReadingReviews;
use App\Services\ProcurementUnifiedSearch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProcurementReadingReviewController extends Controller
{
    private function authorizeAdmin(Request $request): void
    {
        abort_unless(config('procurement_search.enabled'), 404);
        abort_unless($request->user()?->department === 'umum' && $request->user()?->role === 'superadmin', 403);
    }

    private function source(int $id): object
    {
        $query = DB::table('procurement_search_sources')->where('id', $id)->where('active', true)->whereIn('kind', ProcurementFileSources::KINDS);
        ProcurementFileSources::liveLocal($query, 'procurement_search_sources');
        $source = $query
            ->where('verified_at', '>=', now()->subMinutes(config('procurement_search.archive_fresh_minutes')))->first();
        abort_unless($source, 404);

        return $source;
    }

    public function show(Request $request, int $source, int $page, ProcurementReadingReviews $reviews)
    {
        $this->authorizeAdmin($request);
        $row = $this->source($source);
        abort_unless($page >= 1 && $row->pages && $page <= $row->pages, 404);
        $passage = DB::table('procurement_search_passages')->where('source_id', $source)->where('page', $page)->first();
        $history = DB::table('procurement_reading_reviews as r')->leftJoin('users as u', 'u.id', '=', 'r.user_id')->where('r.source_id', $source)->where('r.fingerprint', $row->fingerprint)->where('r.page', $page)->orderByDesc('r.id')->limit(10)->get(['r.id', 'r.reason', 'r.state', 'r.created_at', 'r.applied_at', 'u.name']);

        return response()->json(['source' => $source, 'page' => $page, 'label' => $row->label, 'text' => $passage?->content ?? '', 'version' => $reviews->version($row, $page, $passage), 'history' => $history,
            'pending' => DB::table('procurement_reading_reviews')->where('source_id', $source)->where('state', 'pending')->exists(),
            'url' => route('procurement.search.file', ['source' => $source]).($row->reading_engine === 'office-text' ? '' : '#page='.$page)])->header('Cache-Control', 'private, no-store');
    }

    public function store(Request $request, int $source, int $page, ProcurementReadingReviews $reviews)
    {
        $this->authorizeAdmin($request);
        abort_unless($page >= 1, 404);
        $data = $request->validate(['text' => 'present|nullable|string|max:1000000', 'confirm_blank' => 'nullable|boolean', 'reason' => 'required|string|min:8|max:1000', 'version' => 'required|string|size:64|regex:/^[a-f0-9]+$/']);
        $data['text'] = (string) ($data['text'] ?? '');
        if (trim($data['text']) === '' && ! ($data['confirm_blank'] ?? false)) {
            throw \Illuminate\Validation\ValidationException::withMessages(['text' => 'Konfirmasi bahwa bagian ini tidak memiliki teks setelah memeriksa file asli.']);
        }
        $id = $reviews->submit($this->source($source), $page, $data['version'], trim($data['text']), trim($data['reason']), $request->user()->id);

        return response()->json(['id' => $id, 'message' => 'Pemeriksaan disimpan. Indeks diperbarui bertahap di latar belakang; riwayat dan file asli tetap tersimpan.'], 202)->header('Cache-Control', 'private, no-store');
    }

    public function catalog(Request $request, ProcurementUnifiedSearch $search)
    {
        $this->authorizeAdmin($request);
        $data = $request->validate(['q' => 'required|string|min:2|max:255', 'after' => 'nullable|integer|min:0']);
        $query = $search->sources($data['q'], 'files');
        if ($data['after'] ?? 0) {
            $query->where('src.id', '<', $data['after']);
        }
        $rows = $query->orderByDesc('src.id')->limit(16)->get(['src.id', 'src.label', 'src.reference', 'src.archive_pr', 'src.state', 'src.page', 'src.pages']);
        $more = $rows->count() > 15;
        $rows = $rows->take(15);
        $links = DB::table('procurement_search_links')->join('ppbj', 'ppbj.id', '=', 'ppbj_id')->whereIn('source_id', $rows->pluck('id'))->get(['source_id', 'ppbj.id', 'ppbj.ppbj_no'])->groupBy('source_id');

        return response()->json(['rows' => $rows->map(fn ($row) => ['id' => $row->id, 'label' => $row->label, 'reference' => $row->reference, 'state' => $row->state, 'page' => $row->page, 'pages' => $row->pages,
            'prs' => ($links->get($row->id) ?? collect())->take(10)->map(fn ($pr) => ['number' => $pr->ppbj_no, 'url' => route('ppbj.index', ['search' => $pr->ppbj_no])])->all(),
            'url' => route('procurement.search.file', ['source' => $row->id])]), 'has_more' => $more, 'after' => $rows->last()?->id ?? 0])->header('Cache-Control', 'private, no-store');
    }
}
