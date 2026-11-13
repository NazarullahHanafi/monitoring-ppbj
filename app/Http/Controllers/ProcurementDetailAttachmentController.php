<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\ProcurementDetailAttachment;
use App\Models\Sp;
use App\Models\Spph;
use App\Services\ProcurementDetailService;
use App\Services\ProcurementLocalFiles;
use App\Services\ProcurementOfficeReader;
use App\Services\ProcurementUploadInspector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ProcurementDetailAttachmentController extends Controller
{
    private function document(string $kind, int $id): Sp|Spph
    {
        return match ($kind) {
            'sp' => Sp::findOrFail($id), 'spph' => Spph::findOrFail($id), default => abort(404),
        };
    }

    private function canManage(Request $request, Sp|Spph $document): bool
    {
        return ! $request->user()->isReadOnly()
            && ((int) $document->created_by_user_id === (int) $request->user()->id || $request->user()->matchesOwnerLabel($document->pic));
    }

    private function authorizeAttachment(Request $request, ProcurementDetailAttachment $attachment, bool $write): void
    {
        if ($attachment->document_id !== null) {
            $document = $this->document($attachment->kind, $attachment->document_id);
            abort_if($write && ! $this->canManage($request, $document), 403);
        } else {
            abort_unless((int) $attachment->uploaded_by === (int) $request->user()->id && $attachment->created_at->gte(now()->subDays(2)), 404);
        }
    }

    private function present(ProcurementDetailAttachment $attachment): array
    {
        return [
            'id' => $attachment->id, 'name' => $attachment->original_name, 'size' => $attachment->size,
            'method' => $attachment->method, 'text' => $attachment->reviewed_text ?? $attachment->extracted_text ?? '',
            'reviewed' => $attachment->reviewed_at !== null, 'version' => $attachment->version,
            'download_url' => route('procurement.details.download', $attachment),
            'review_url' => route('procurement.details.review', $attachment),
            'delete_url' => route('procurement.details.delete', $attachment),
        ];
    }

    public function show(Request $request, string $kind, int $id, ProcurementDetailService $details)
    {
        $document = $this->document($kind, $id);
        $attachments = ProcurementDetailAttachment::where('kind', $kind)->where('document_id', $id)->orderBy('created_at')->get();

        return response()->json([
            'number' => $document->nomor_sp ?? $document->nomor_spph,
            'can_manage' => $this->canManage($request, $document),
            'summary' => $details->summaries($document->newCollection([$document]), $kind)[$id],
            'attachments' => $attachments->map(fn ($attachment) => $this->present($attachment)),
        ])->header('Cache-Control', 'private, no-store');
    }

    public function upload(Request $request, string $kind, ProcurementDetailService $details)
    {
        abort_unless(in_array($kind, ['sp', 'spph'], true), 404);
        $input = $request->validate([
            'document_file' => 'required|file|max:10240',
            'document_id' => 'nullable|integer|min:1',
            'extracted_text' => 'nullable|string|max:200000',
            'method' => 'nullable|in:pdf-text,pdf-ocr,pdf-mixed,image-ocr,manual',
        ]);
        $document = isset($input['document_id']) ? $this->document($kind, $input['document_id']) : null;
        abort_if($document && ! $this->canManage($request, $document), 403);
        $file = $request->file('document_file');
        $format = app(ProcurementUploadInspector::class)->inspect($file, 'document_file');
        $extension = $format['extension'];
        $read = null;
        if (in_array($format['reader'], ['office', 'text'], true)) {
            try {
                $read = app(ProcurementOfficeReader::class)->read($file->getRealPath(), $extension);
            } catch (ValidationException) {
                $read = ['text' => '', 'method' => 'manual'];
            }
        }
        $text = $read['text'] ?? ($input['extracted_text'] ?? '');
        $method = $read['method'] ?? ($input['method'] ?? 'manual');
        $id = (string) Str::uuid();
        $path = $file->storeAs('procurement-details/'.now()->format('Y/m'), $id.'.'.$extension, 'local');
        abort_unless($path, 503, 'Berkas belum dapat disimpan. Silakan coba lagi.');
        try {
            $attachment = DB::transaction(function () use ($request, $kind, $document, $file, $id, $path, $text, $method, $format) {
                if ($document) {
                    $document->newQuery()->whereKey($document->id)->lockForUpdate()->firstOrFail();
                    if (ProcurementDetailAttachment::where('kind', $kind)->where('document_id', $document->id)->count() >= 5) {
                        throw ValidationException::withMessages(['document_file' => 'Maksimal 5 lampiran rincian per dokumen. Hapus lampiran yang sudah tidak digunakan terlebih dahulu.']);
                    }
                }
                $attachment = ProcurementDetailAttachment::create([
                    'id' => $id, 'kind' => $kind, 'document_id' => $document?->id, 'uploaded_by' => $request->user()->id,
                    'original_name' => Str::limit(preg_replace('/[\x00-\x1F\x7F]/u', '_', basename(str_replace('\\', '/', $file->getClientOriginalName()))) ?? 'rincian', 240, ''),
                    'path' => $path, 'mime' => $format['mime'], 'size' => $file->getSize(),
                    'sha256' => hash_file('sha256', $file->getRealPath()), 'method' => $method, 'extracted_text' => $text,
                ]);
                $this->audit($request, $attachment, 'detail_uploaded', 'Lampiran rincian diunggah; menunggu pemeriksaan isi.');

                return $attachment;
            });
        } catch (\Throwable $error) {
            Storage::disk('local')->delete($path);
            throw $error;
        }
        $details->invalidate();

        return response()->json(['attachment' => $this->present($attachment)], 201);
    }

    public function review(Request $request, ProcurementDetailAttachment $attachment, ProcurementDetailService $details)
    {
        $this->authorizeAttachment($request, $attachment, true);
        $input = $request->validate(['text' => 'required|string|max:200000', 'version' => 'required|integer|min:1']);
        DB::transaction(function () use ($request, $attachment, $input) {
            $locked = ProcurementDetailAttachment::whereKey($attachment->id)->lockForUpdate()->firstOrFail();
            abort_if($locked->version !== (int) $input['version'], 409, 'Isi lampiran sudah berubah. Muat ulang sebelum memeriksa kembali.');
            $locked->update(['reviewed_text' => trim($input['text']), 'reviewed_by' => $request->user()->id, 'reviewed_at' => now(), 'version' => $locked->version + 1]);
            $this->audit($request, $locked, 'detail_reviewed', 'Isi lampiran rincian diperiksa dan diaktifkan untuk pencarian.');
        });
        $details->invalidate();

        return response()->json(['attachment' => $this->present($attachment->refresh())]);
    }

    public function defer(Request $request, string $kind, int $id)
    {
        $document = $this->document($kind, $id);
        abort_unless($this->canManage($request, $document), 403);
        DB::table('procurement_detail_requirements')->updateOrInsert(['kind' => $kind, 'document_id' => $id], [
            'state' => 'deferred', 'updated_by' => $request->user()->id, 'created_at' => now(), 'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Lampiran ditandai menyusul. Anda dapat mengunggahnya kapan saja dari baris dokumen.']);
    }

    public function download(Request $request, ProcurementDetailAttachment $attachment)
    {
        $this->authorizeAttachment($request, $attachment, false);
        $path = app(ProcurementLocalFiles::class)->path($attachment);
        abort_unless($path, 404);

        return response()->download($path, $attachment->original_name, ['X-Content-Type-Options' => 'nosniff', 'Cache-Control' => 'private, no-store'])->setPrivate();
    }

    public function destroy(Request $request, ProcurementDetailAttachment $attachment, ProcurementDetailService $details)
    {
        $this->authorizeAttachment($request, $attachment, true);
        $path = $attachment->path;
        DB::transaction(function () use ($request, $attachment) {
            $this->audit($request, $attachment, 'detail_removed', 'Lampiran rincian dihapus oleh pengelola dokumen.');
            $attachment->delete();
        });
        Storage::disk('local')->delete($path);
        $details->invalidate();

        return response()->json(['message' => 'Lampiran rincian dihapus.']);
    }

    private function audit(Request $request, ProcurementDetailAttachment $attachment, string $action, string $description): void
    {
        ActivityLog::create(['user_id' => $request->user()->id, 'model_type' => ProcurementDetailAttachment::class,
            'model_id' => $attachment->document_id ?? 0, 'action' => $action, 'description' => $description,
            'changes' => ['attachment_id' => $attachment->id, 'kind' => $attachment->kind, 'name' => $attachment->original_name, 'version' => $attachment->version]]);
    }
}
