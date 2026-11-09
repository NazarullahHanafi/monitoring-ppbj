<?php

namespace App\Services;

use App\Models\ProcurementDetailAttachment;
use App\Models\Sp;
use App\Models\Spph;
use App\Support\AttachmentIntent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ProcurementDetailService
{
    public static function kind(Sp|Spph $document): string
    {
        return $document instanceof Sp ? 'sp' : 'spph';
    }

    public function sync(Sp|Spph $document, Request $request): void
    {
        $input = $request->validate([
            'detail_attachment_token' => 'nullable|uuid',
            'detail_upload_choice' => 'nullable|in:now,later',
        ]);
        $kind = self::kind($document);
        if ($token = $input['detail_attachment_token'] ?? null) {
            $document->newQuery()->whereKey($document->id)->lockForUpdate()->firstOrFail();
            $attachment = ProcurementDetailAttachment::whereKey($token)->lockForUpdate()->first();
            if (! $attachment || $attachment->kind !== $kind || (int) $attachment->uploaded_by !== (int) $request->user()->id
                || $attachment->created_at->lt(now()->subDays(2))
                || ($attachment->document_id !== null && (int) $attachment->document_id !== (int) $document->id)) {
                throw ValidationException::withMessages(['detail_attachment_token' => 'Lampiran sementara tidak tersedia. Silakan unggah ulang.']);
            }
            if ($attachment->document_id === null && ProcurementDetailAttachment::where('kind', $kind)->where('document_id', $document->id)->count() >= 5) {
                throw ValidationException::withMessages(['detail_attachment_token' => 'Dokumen sudah memiliki 5 lampiran rincian.']);
            }
            $attachment->update(['document_id' => $document->id]);
        }
        $text = $document->deskripsi_pengadaan.' '.collect($request->input('items', []))->pluck('nama_barang')->implode(' ');
        if ($token || AttachmentIntent::detect($text) || ($input['detail_upload_choice'] ?? null) === 'later') {
            $previous = DB::table('procurement_detail_requirements')->where('kind', $kind)->where('document_id', $document->id)->value('state');
            $state = match ($input['detail_upload_choice'] ?? '') {
                'later' => 'deferred', 'now' => 'requested', default => $previous ?? 'requested'
            };
            DB::table('procurement_detail_requirements')->upsert([
                ['kind' => $kind, 'document_id' => $document->id, 'state' => $state,
                    'updated_by' => $request->user()->id, 'created_at' => now(), 'updated_at' => now()],
            ], ['kind', 'document_id'], ['state', 'updated_by', 'updated_at']);
        }
    }

    public function summaries($documents, string $kind): array
    {
        $ids = $documents->modelKeys();
        if (! $ids) {
            return [];
        }
        $requirements = DB::table('procurement_detail_requirements')->where('kind', $kind)->whereIn('document_id', $ids)->pluck('state', 'document_id');
        $counts = DB::table('procurement_detail_attachments')->where('kind', $kind)->whereIn('document_id', $ids)
            ->select('document_id')->selectRaw('COUNT(*) AS total, SUM(CASE WHEN reviewed_at IS NOT NULL THEN 1 ELSE 0 END) AS ready')->groupBy('document_id')->get()->keyBy('document_id');
        $key = $kind.'_id';
        $items = DB::table($kind.'_items')->whereIn($key, $ids)->where(function ($query) {
            foreach (['lampir', 'menyusul', 'terpisah', 'attach'] as $word) {
                $query->orWhereRaw('LOWER(nama_barang) LIKE ?', ['%'.$word.'%']);
            }
        })->select($key, 'nama_barang')->get()->groupBy($key);
        $result = [];
        foreach ($documents as $document) {
            $count = $counts->get($document->id);
            $required = $requirements->has($document->id) || AttachmentIntent::detect($document->deskripsi_pengadaan.' '.($items->get($document->id)?->pluck('nama_barang')->implode(' ') ?? ''));
            $state = $count ? ((int) $count->ready === (int) $count->total ? 'ready' : 'review') : ($required ? ($requirements->get($document->id) === 'deferred' ? 'deferred' : 'missing') : 'optional');
            $result[$document->id] = ['state' => $state, 'label' => match ($state) {
                'ready' => 'Rincian bisa dicari', 'review' => 'Periksa isi lampiran', 'deferred' => 'Lampiran menyusul', 'missing' => 'Rincian belum diunggah', default => 'Lampiran rincian',
            }];
        }

        return $result;
    }

    public function invalidate(): void
    {
        Cache::forever('sp:index-stats:version', (string) \Illuminate\Support\Str::uuid());
    }
}
