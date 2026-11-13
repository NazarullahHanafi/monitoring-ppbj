<?php

namespace App\Services;

use App\Models\ProcurementDetailAttachment;
use App\Models\Sp;
use App\Models\Spph;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProcurementLocalFiles
{
    private const MANIFEST_COLUMNS = ['id', 'kind', 'document_id', 'path', 'size', 'original_name', 'sha256'];

    public function path(ProcurementDetailAttachment $file): ?string
    {
        $root = realpath(Storage::disk('local')->path(''));
        $path = realpath(Storage::disk('local')->path($file->path));

        return $root && $path && is_file($path) && str_starts_with($path, $root.DIRECTORY_SEPARATOR) ? $path : null;
    }

    public function call(array $input): array
    {
        $kind = match ($input['kind'] ?? null) {
            'local_sp_attachment' => 'sp',
            'local_spph_attachment' => 'spph',
            default => throw new \InvalidArgumentException('local_kind'),
        };
        $query = ProcurementDetailAttachment::where('kind', $kind)->whereNotNull('document_id');
        if (($input['action'] ?? '') === 'manifest') {
            $query = isset($input['key']) ? $query->where('id', $input['key']) : $query->where('id', '>', (string) ($input['after'] ?? ''));
            $limit = min(100, max(1, (int) ($input['limit'] ?? 80)));
            $batch = $query->orderBy('id')->limit($limit + 1)->get(self::MANIFEST_COLUMNS);
            $files = $batch->take($limit);

            return ['rows' => $this->describeBatch($files, $kind), 'last' => $files->last()?->id ?? '', 'has_more' => $batch->count() > $limit];
        }
        if (($input['action'] ?? '') !== 'file') {
            throw new \InvalidArgumentException('local_action');
        }
        $file = $query->findOrFail($input['id'], self::MANIFEST_COLUMNS);
        $entry = $this->describeBatch(collect([$file]), $kind)[0];
        if (! $entry['active']) {
            throw new \RuntimeException('inactive');
        }
        $path = $this->path($file);
        $destination = $input['destination'];
        $allowed = realpath(storage_path('app/private/procurement-search/work'));
        if (! $allowed || realpath(dirname($destination)) !== $allowed || ! preg_match('/^[a-f0-9]{32}\.bin$/D', basename($destination))) {
            throw new \RuntimeException('destination');
        }
        if ($entry['size'] > (int) $input['max_bytes']) {
            throw new \RuntimeException('file_size_limit');
        }
        if (! hash_equals($file->sha256, hash_file('sha256', $path))) {
            throw new \RuntimeException('checksum');
        }
        $in = fopen($path, 'rb');
        $out = fopen($destination, 'xb');
        if (! $in || ! $out) {
            if (is_resource($in)) {
                fclose($in);
            } if (is_resource($out)) {
                fclose($out);
            } throw new \RuntimeException('local_file');
        }
        chmod($destination, 0600);
        try {
            stream_copy_to_stream($in, $out, (int) $input['max_bytes'] + 1);
        } finally {
            fclose($in);
            fclose($out);
        }
        if (! hash_equals($file->sha256, hash_file('sha256', $destination))) {
            unlink($destination);
            throw new \RuntimeException('checksum');
        }

        return $entry + ['checksum' => $file->sha256];
    }

    private function describeBatch(Collection $files, string $kind): array
    {
        if ($files->isEmpty()) {
            return [];
        }
        // Never load extracted/reviewed text, items, or entire document rows here.
        $class = $kind === 'sp' ? Sp::class : Spph::class;
        $numberColumn = $kind === 'sp' ? 'nomor_sp' : 'nomor_spph';
        $documents = $class::query()->with('ppbjs:id,ppbj_no')
            ->whereKey($files->pluck('document_id')->unique()->all())
            ->get(['id', $numberColumn, 'nomor_pr', 'deskripsi_pengadaan', 'nama_vendor'])->keyBy('id');
        $numbersByDocument = $documents->map(function ($document) {
            $numbers = $document->ppbjs->pluck('ppbj_no')->all();
            if ($document->nomor_pr) {
                $numbers[] = $document->nomor_pr;
            }

            return $numbers;
        });
        $prIdsByDocument = $this->prIdsForDocuments($documents, $kind);

        return $files->map(function (ProcurementDetailAttachment $file) use ($documents, $numbersByDocument, $prIdsByDocument, $numberColumn) {
            $document = $documents->get($file->document_id);
            $path = $this->path($file);
            $number = $document?->getAttribute($numberColumn) ?? '';
            $numbers = $numbersByDocument->get($file->document_id, []);
            $prIds = $prIdsByDocument->get($file->document_id, []);

            return ['kind' => 'local_'.$file->kind.'_attachment', 'key' => $file->id, 'active' => (bool) ($path && $document), 'extension' => strtolower(pathinfo($file->path, PATHINFO_EXTENSION)),
                'size' => $path ? filesize($path) : $file->size, 'label' => $file->original_name, 'reference' => $number, 'pr' => implode(' ', $numbers),
                'pr_ids' => $prIds, 'metadata' => trim($number.' '.$document?->deskripsi_pengadaan.' '.$document?->nama_vendor),
                'version' => hash('sha256', $file->sha256.'|'.$file->path.'|'.$file->document_id)];
        })->values()->all();
    }

    private function prIdsForDocuments(Collection $documents, string $kind): Collection
    {
        if ($documents->isEmpty()) {
            return collect();
        }
        $foreignKey = $kind.'_id';
        $linked = DB::table($kind.'_ppbj as links')->join('ppbj as linked_pr', 'linked_pr.id', '=', 'links.ppbj_id')
            ->whereIn('links.'.$foreignKey, $documents->keys()->all())
            ->select(['links.'.$foreignKey.' as document_id', 'linked_pr.ppbj_no as pr_number']);
        $manual = DB::table($kind === 'sp' ? 'sps' : 'spphs')
            ->whereIn('id', $documents->filter(fn ($document) => (bool) $document->nomor_pr)->keys()->all())
            ->select(['id as document_id', 'nomor_pr as pr_number']);

        // Keep equality in SQL so MySQL collation and duplicate legacy PR
        // numbers behave exactly like the former per-file WHERE IN lookup.
        return DB::query()->fromSub($linked->unionAll($manual), 'document_numbers')
            ->join('ppbj', 'ppbj.ppbj_no', '=', 'document_numbers.pr_number')
            ->distinct()->get(['document_numbers.document_id', 'ppbj.id'])
            ->groupBy('document_id')->map(fn ($rows) => $rows->pluck('id')->map(fn ($id) => (int) $id)->sort()->values()->all());
    }
}
