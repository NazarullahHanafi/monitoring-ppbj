<?php

namespace App\Http\Controllers;

use App\Models\Ppbj;
use App\Services\ProcurementOcrQueue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ProcurementSearchQueueController extends Controller
{
    public function coverage(Request $request)
    {
        abort_unless(config('procurement_search.enabled'), 404);
        $values = $request->validate(['page' => 'nullable|integer|min:1|max:10000', 'source' => 'nullable|integer|min:1']);
        $query = DB::table('procurement_search_sources as s')->where('s.active', true)->whereIn('s.kind', ['archive_document', 'archive_attachment'])
            ->where('s.verified_at', '>=', now()->subMinutes(config('procurement_search.archive_fresh_minutes')))
            ->whereExists(fn ($links) => $links->selectRaw('1')->from('procurement_search_links as l')->join('ppbj', 'ppbj.id', '=', 'l.ppbj_id')->whereColumn('l.source_id', 's.id'));
        if (isset($values['source'])) {
            $source = (clone $query)->where('s.id', $values['source'])->first(['s.id', 's.label', 's.pages', 's.reading_engine']);
            abort_unless($source, 404);
            $page = (int) ($values['page'] ?? 1);
            $total = (int) ($source->pages ?? 0);
            $start = ($page - 1) * 25 + 1;
            $end = min($total, $start + 24);
            $stored = DB::table('procurement_search_passages')->where('source_id', $source->id)->whereBetween('page', [$start, $end])
                ->select('page', 'confidence', 'error', 'repair_attempts')->selectRaw("LENGTH(COALESCE(content, '')) AS bytes")->get()->keyBy('page');
            $rows = [];
            if ($start <= $end) {
                foreach (range($start, $end) as $number) {
                    $entry = $stored->get($number);
                    $rows[] = ['page' => $number, 'state' => ! $entry ? 'Belum diproses' : ($entry->error !== null || (int) $entry->bytes === 0 || ($entry->confidence !== null && $entry->confidence < 55) ? 'Perlu diperiksa' : 'Diproses otomatis'),
                        'reason' => $entry?->error ? (['office_images' => 'Gambar di dalam Office belum dibaca. Konversi ke PDF atau periksa teksnya.', 'page_text_limit' => 'Teks melampaui batas aman satu halaman; perlu penanganan khusus.', 'memory' => 'Pembacaan melampaui batas memori.', 'page_unreadable' => 'Halaman belum berhasil dibaca.', 'timeout' => 'Pembacaan halaman kehabisan waktu.', 'resource_limit' => 'Pembacaan dihentikan batas sumber daya.'][$entry->error] ?? 'Halaman belum berhasil dibaca seluruhnya.') : null,
                        'confidence' => $entry?->confidence, 'repair_attempts' => $entry?->repair_attempts ?? 0,
                        'url' => $source->reading_engine === 'office-text' ? null : route('procurement.search.file', ['source' => $source->id]).'#page='.$number];
                }
            }

            return response()->json(['source' => (int) $source->id, 'label' => $source->label, 'unit' => $source->reading_engine === 'office-text' ? 'Bagian teks' : 'Halaman',
                'rows' => $rows, 'page' => $page, 'last_page' => max(1, (int) ceil($total / 25)), 'total' => $total])->header('Cache-Control', 'private, no-store');
        }
        $rows = $query->select('s.id', 's.label', 's.reference', 's.state', 's.coverage_state', 's.pages', 's.indexed_pages', 's.problem_pages', 's.coverage_checked_at', 's.error', 's.failure_code', 's.recovery_round')
            ->orderByRaw("CASE WHEN s.coverage_state = 'review' OR s.state IN ('failed', 'unsupported', 'uncertain', 'empty') THEN 0 WHEN s.coverage_state <> 'processed' THEN 1 ELSE 2 END")->orderBy('s.id')
            ->paginate(25, ['*'], 'page', (int) ($values['page'] ?? 1));

        return response()->json(['rows' => $rows->items(), 'page' => $rows->currentPage(), 'last_page' => $rows->lastPage(), 'total' => $rows->total()])->header('Cache-Control', 'private, no-store');
    }

    public function status()
    {
        abort_unless(config('procurement_search.enabled'), 404);

        return response()->json(['index' => Cache::get('procurement-search:progress', ['state' => 'starting'])])
            ->header('Cache-Control', 'private, no-store');
    }

    public function priority(Ppbj $ppbj, ProcurementOcrQueue $queue)
    {
        abort_unless(config('procurement_search.enabled'), 404);

        return response()->json($queue->requestPriority($ppbj))->header('Cache-Control', 'private, no-store');
    }
}
