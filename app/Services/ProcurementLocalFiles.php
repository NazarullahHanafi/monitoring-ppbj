<?php

namespace App\Services;

use App\Models\Ppbj;
use App\Models\ProcurementDetailAttachment;
use App\Models\Sp;
use App\Models\Spph;
use Illuminate\Support\Facades\Storage;

class ProcurementLocalFiles
{
    public function path(ProcurementDetailAttachment $file): ?string
    {
        $root = realpath(Storage::disk('local')->path(''));
        $path = realpath(Storage::disk('local')->path($file->path));

        return $root && $path && is_file($path) && str_starts_with($path, $root.DIRECTORY_SEPARATOR) ? $path : null;
    }

    public function call(array $input): array
    {
        $kind = $input['kind'] === 'local_sp_attachment' ? 'sp' : 'spph';
        $query = ProcurementDetailAttachment::where('kind', $kind)->whereNotNull('document_id');
        if (($input['action'] ?? '') === 'manifest') {
            $query = isset($input['key']) ? $query->where('id', $input['key']) : $query->where('id', '>', (string) ($input['after'] ?? ''));
            $files = $query->orderBy('id')->limit(min(100, max(1, (int) ($input['limit'] ?? 80))))->get();

            return ['rows' => $files->map(fn ($file) => $this->describe($file))->all(), 'last' => $files->last()?->id ?? '', 'has_more' => $files->count() === (int) ($input['limit'] ?? 80)];
        }
        $file = $query->findOrFail($input['id']);
        $entry = $this->describe($file);
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

    private function describe(ProcurementDetailAttachment $file): array
    {
        $document = ($file->kind === 'sp' ? Sp::class : Spph::class)::with('ppbjs:id,ppbj_no')->find($file->document_id);
        $path = $this->path($file);
        $number = $document?->nomor_sp ?? $document?->nomor_spph ?? '';
        $numbers = $document?->ppbjs->pluck('ppbj_no')->all() ?? [];
        if ($document?->nomor_pr) {
            $numbers[] = $document->nomor_pr;
        }

        return ['kind' => 'local_'.$file->kind.'_attachment', 'key' => $file->id, 'active' => (bool) ($path && $document), 'extension' => strtolower(pathinfo($file->path, PATHINFO_EXTENSION)),
            'size' => $path ? filesize($path) : $file->size, 'label' => $file->original_name, 'reference' => $number, 'pr' => implode(' ', $numbers),
            'pr_ids' => Ppbj::whereIn('ppbj_no', $numbers)->pluck('id')->all(), 'metadata' => trim($number.' '.$document?->deskripsi_pengadaan.' '.$document?->nama_vendor),
            'version' => hash('sha256', $file->sha256.'|'.$file->path.'|'.$file->document_id)];
    }
}
