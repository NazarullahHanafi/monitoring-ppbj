<?php

namespace App\Http\Controllers;

use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProcurementQuickDetailController extends Controller
{
    public function show(Request $request, string $kind, int $id)
    {
        abort_unless($request->user()->department === 'umum', 403);
        $class = match ($kind) {
            'ppbj' => Ppbj::class, 'sp' => Sp::class, 'spph' => Spph::class, default => abort(404)
        };
        // Always check existence/soft-delete and authorization BEFORE reading cache.
        $record = $class::findOrFail($id);
        $key = 'workspace:detail:v1:'.$request->user()->id.':'.$kind.':'.$id.':'.sha1((string) $record->getRawOriginal('updated_at'));
        $build = fn () => $this->present($record, $kind);
        if ($request->boolean('fresh')) {
            $data = $build();
            Cache::put($key, $data, 20);
        } else {
            $data = Cache::remember($key, 20, $build);
        }

        return response()->json($data)->header('Cache-Control', 'private, no-store');
    }

    private function plain(mixed $value, int $max = 2000): string
    {
        $text = preg_replace('/<\/?(?:p|div|li|br)\b[^>]*>/iu', ' ', (string) $value) ?? '';

        return mb_substr(trim(preg_replace('/\s+/u', ' ', html_entity_decode(strip_tags($text), ENT_QUOTES | ENT_HTML5, 'UTF-8')) ?? ''), 0, $max);
    }

    private function present(Ppbj|Sp|Spph $record, string $kind): array
    {
        if ($record instanceof Ppbj) {
            // Reuse the established journey logic instead of another calculation engine.
            $journey = app(CommandCenterController::class)->journey($record)->getData(true);
            $documents = [];
            foreach (['sps' => 'sp', 'spphs' => 'spph'] as $relation => $documentKind) {
                foreach ($record->$relation->take(10) as $document) {
                    $documents[] = ['kind' => $documentKind, 'id' => $document->id, 'number' => $document->getAttribute($documentKind === 'sp' ? 'nomor_sp' : 'nomor_spph')];
                }
            }

            return ['kind' => $kind, 'id' => $record->id, 'number' => $record->ppbj_no, 'title' => $this->plain($record->uraian),
                'fields' => $journey['record']['details'], 'items' => [], 'prs' => [], 'documents' => $documents,
                'stages' => $journey['stages'], 'audit' => $journey['audit'], 'tracking' => $journey['real_tracking'],
                'archive_url' => route('ppbj.archive', $record->id), 'loaded_at' => now()->toIso8601String(), 'cache_seconds' => 20];
        }
        $sp = $record instanceof Sp;
        $columns = $sp
            ? ['tanggal_sp' => 'Tanggal SP', 'nilai_sp' => 'Nilai SP', 'nilai_pr' => 'Nilai PR/gabungan', 'nama_vendor' => 'Vendor final', 'pic' => 'PIC', 'sph' => 'SPH', 'tgl_sph' => 'Tanggal SPH', 'rfq' => 'RFQ', 'nomor_pemenang' => 'Nomor pemenang', 'tanggal_pemenang' => 'Tanggal pemenang', 'promised_date' => 'Batas pemenuhan', 'awal_kontrak' => 'Awal kontrak', 'akhir_kontrak' => 'Akhir kontrak', 'penandatangan_sci' => 'Penandatangan SCI', 'jabatan_sci' => 'Jabatan SCI']
            : ['tanggal' => 'Tanggal SPPH', 'nama_vendor' => 'Vendor utama', 'pic' => 'PIC'];
        $fields = [];
        foreach ($columns as $key => $label) {
            $value = $record->getRawOriginal($key);
            if ($value !== null && $value !== '') {
                $fields[] = ['label' => $label, 'value' => $this->plain($value), 'type' => str_starts_with($key, 'nilai_') ? 'money' : 'text'];
            }
        }
        if (! $sp) {
            $fields[] = ['label' => 'Semua kandidat vendor', 'value' => implode(' · ', $record->print_vendor_names)];
        }
        $itemColumns = ['id', 'urutan', 'nama_barang', 'satuan', 'jumlah', 'tgl_pemenuhan'];
        if ($sp) {
            $itemColumns = [...$itemColumns, 'harga_satuan', 'subtotal'];
        }
        $items = $record->items()->select($itemColumns)->limit(51)->get();
        $prs = $record->ppbjs()->select(['ppbj.id', 'ppbj.ppbj_no', 'ppbj.uraian', 'ppbj.total_sebelum_ppn', 'ppbj.portofolio', 'ppbj.buyer'])->limit(21)->get();
        if ($prs->isEmpty() && $record->nomor_pr) {
            $prs = Ppbj::where('ppbj_no', $record->nomor_pr)->get(['id', 'ppbj_no', 'uraian', 'total_sebelum_ppn', 'portofolio', 'buyer']);
        }

        return ['kind' => $kind, 'id' => $record->id, 'number' => $sp ? $record->nomor_sp : $record->nomor_spph,
            'title' => $this->plain($record->deskripsi_pengadaan), 'fields' => $fields,
            'items' => $items->take(50)->map(fn ($item) => ['number' => $item->urutan, 'name' => $this->plain($item->nama_barang), 'unit' => $item->satuan,
                'quantity' => $item->jumlah, 'price' => $sp ? $item->harga_satuan : null, 'subtotal' => $sp ? $item->subtotal : null, 'due' => $item->getRawOriginal('tgl_pemenuhan')])->values()->all(),
            'items_truncated' => $items->count() > 50,
            'prs' => $prs->take(20)->map(fn ($pr) => ['id' => $pr->id, 'number' => $pr->ppbj_no, 'title' => $this->plain($pr->uraian, 300),
                'amount' => $pr->total_sebelum_ppn, 'portfolio' => $pr->portofolio, 'buyer' => $pr->buyer])->values()->all(),
            'prs_truncated' => $prs->count() > 20, 'manual_pr' => $prs->isEmpty() ? $record->nomor_pr : null,
            'documents' => [], 'loaded_at' => now()->toIso8601String(), 'cache_seconds' => 20];
    }
}
