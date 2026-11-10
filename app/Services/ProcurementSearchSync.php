<?php

namespace App\Services;

use App\Models\Ppbj;
use App\Models\ProcurementDetailAttachment;
use App\Models\Sp;
use App\Models\Spph;
use App\Support\ProcurementSearchText;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ProcurementSearchSync
{
    public function __construct(private ProcurementSearchWriter $writer, private ProcurementArchiveBridge $archive) {}

    public function local(int $batch = 80, array $only = []): int
    {
        $count = 0;
        foreach (['ppbj' => Ppbj::class, 'sp' => Sp::class, 'spph' => Spph::class] as $kind => $class) {
            if ($only && ! in_array($kind, $only, true)) {
                continue;
            }
            $cursor = (int) Cache::get('procurement-search:cursor:'.$kind, 0);
            $query = $class::query();
            if ($kind !== 'ppbj') {
                $query = $class::withTrashed()->with(['items', 'ppbjs:id,ppbj_no']);
            }
            $rows = $query->where('id', '>', $cursor)->orderBy('id')->limit($batch)->get();
            $details = $kind === 'ppbj' ? collect() : ProcurementDetailAttachment::where('kind', $kind)->whereIn('document_id', $rows->modelKeys())->whereNotNull('reviewed_at')->get()->groupBy('document_id');
            foreach ($rows as $row) {
                if ($kind === 'ppbj') {
                    $reference = $row->ppbj_no;
                    $metadata = implode(' ', array_filter([$row->ppbj_no, $row->uraian, $row->buyer, $row->portofolio, $row->penyedia_eksternal, $row->awarding_sp, $row->spph_rfq_1, $row->no_invoice]));
                    $text = '';
                    $ids = [$row->id];
                } else {
                    $reference = $kind === 'sp' ? $row->nomor_sp : $row->nomor_spph;
                    $metadata = implode(' ', array_filter([$reference, $row->nomor_pr, $row->deskripsi_pengadaan, $row->nama_vendor, $row->pic, $kind === 'spph' ? $row->vendor_summary : '']));
                    $text = $row->items->pluck('nama_barang')->implode(' ').' '.($details->get($row->id)?->pluck('reviewed_text')->implode(' ') ?? '');
                    $ids = $row->ppbjs->modelKeys();
                    if ($row->nomor_pr) {
                        $ids = array_merge($ids, Ppbj::where('ppbj_no', $row->nomor_pr)->pluck('id')->all());
                    }
                }
                $text = ProcurementSearchText::plain($text);
                $label = ($kind === 'sp' && $row->numbering_mode === 'oracle' ? 'SP Oracle' : strtoupper($kind)).' '.$reference;
                $fingerprint = hash('sha256', $label.'|'.$metadata.'|'.$text);
                $this->writer->source($kind, (string) $row->id, $label, (string) $reference, $metadata, $text, $ids, $fingerprint, false, ! $row->deleted_at);
                $count++;
            }
            Cache::forever('procurement-search:cursor:'.$kind, $rows->count() < $batch ? 0 : (int) $rows->last()->id);
            // Physical/soft deletion can invalidate old source rows without retaining old file text.
            DB::table('procurement_search_sources')->where('kind', $kind)->where('active', true)
                ->whereNotIn('source_key', $class::query()->select('id'))->update(['active' => false, 'content' => null, 'updated_at' => now()]);
        }

        return $count;
    }

    public function archives(int $batch = 80, array $only = []): int
    {
        $count = 0;
        foreach (['archive_document', 'archive_attachment'] as $kind) {
            if ($only && ! in_array($kind, $only, true)) {
                continue;
            }
            $key = 'procurement-search:cursor:'.$kind;
            $page = $this->archive->call(['action' => 'manifest', 'kind' => $kind, 'after' => (int) Cache::get($key, 0), 'limit' => $batch]);
            foreach ($page['rows'] as $row) {
                $ids = Ppbj::whereIn('ppbj_no', array_unique($row['pr_numbers']))->pluck('id')->all();
                // A grouped SP/SPPH may link one archived document to multiple PRs.
                $module = strtolower($row['module']);
                if (in_array($module, ['sp', 'spph'], true)) {
                    $class = $module === 'sp' ? Sp::class : Spph::class;
                    $document = $class::with('ppbjs:id,ppbj_no')->where($module === 'sp' ? 'nomor_sp' : 'nomor_spph', $row['reference'])->first();
                    if ($document) {
                        $ids = array_merge($ids, $document->ppbjs->modelKeys());
                    }
                }
                $active = $row['active'];
                $metadata = implode(' ', [$row['label'], $row['reference'], $row['pr'], $row['metadata']]);
                $fingerprint = hash('sha256', $metadata.'|'.$row['version']);
                $id = $this->writer->source($kind, $row['key'], $row['label'], $row['reference'], $metadata, '', $ids, $fingerprint, true, $active, $row['pr']);
                if ($active && ! empty($row['download_target'])) {
                    Cache::put('procurement-search:download:'.$id, ['url' => $row['download_target'], 'fingerprint' => $fingerprint], now()->addMinutes(14));
                } else {
                    Cache::forget('procurement-search:download:'.$id);
                }
                $count++;
            }
            Cache::forever($key, count($page['rows']) < $batch ? 0 : (int) $page['last']);
        }

        return $count;
    }

    public function progress(): array
    {
        $counts = DB::table('procurement_search_sources')->where('active', true)->select('state')->selectRaw('COUNT(*) as total')->groupBy('state')->pluck('total', 'state');
        $progress = ['state' => 'running', 'ready' => (int) ($counts['ready'] ?? 0), 'pending' => (int) ($counts['pending'] ?? 0),
            'partial' => (int) ($counts['partial'] ?? 0), 'failed' => (int) ($counts['failed'] ?? 0),
            'needs_review' => (int) ($counts['empty'] ?? 0) + (int) ($counts['unsupported'] ?? 0) + (int) ($counts['limited'] ?? 0) + (int) ($counts['uncertain'] ?? 0),
            'archive_state' => Cache::get('procurement-search:archive-state', 'starting'), 'checked_at' => now()->toIso8601String()];
        Cache::forever('procurement-search:progress', $progress);

        return $progress;
    }
}
