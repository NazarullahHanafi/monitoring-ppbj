<?php

namespace App\Http\Controllers;

use App\Models\Sp;
use App\Models\Spph;
use App\Services\ProcurementJourneyService;
use App\Services\PrArchiveService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class ArchiveAttachmentController extends Controller
{
    private const ALLOWED_EXTENSIONS = [
        'pdf',
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx',
        'csv',
        'txt',
        'jpg',
        'jpeg',
        'png',
    ];

    public function storeSp(Request $request, Sp $sp, PrArchiveService $archiveService): JsonResponse
    {
        $validated = $this->validateUpload($request);

        $result = $archiveService->uploadDocument([
            'source' => 'SIMONPR',
            'source_module' => 'SP',
            'nomor_pr' => $sp->nomor_pr,
            'nomor_ppbj' => $sp->nomor_pr,
            'nomor_sp' => $sp->nomor_sp,
            'nomor_dokumen' => $sp->nomor_sp,
            'jenis_dokumen' => $validated['document_type'],
            'nama_vendor' => $sp->nama_vendor,
            'deskripsi' => $sp->deskripsi_pengadaan,
            'pic' => $sp->pic,
            'nilai' => $sp->nilai_sp,
            'tanggal_dokumen' => $sp->tanggal_sp?->toDateString(),
            'uploaded_by' => auth()->user()?->name,
            'uploaded_by_email' => auth()->user()?->email,
            'notes' => $validated['notes'] ?? null,
            'replace_existing' => (bool) ($validated['replace_existing'] ?? false),
            'audit_package_key' => $this->auditPackageKey($sp->nomor_pr, $sp->nomor_sp),
        ], $request->file('document_file'));

        $this->logUploadResult('SP', $sp->id, $result);

        if (($result['state'] ?? null) === 'uploaded') {
            app(ProcurementJourneyService::class)->notifyByPrNumber(
                $sp->nomor_pr,
                'sp_attachment_uploaded',
                'Lampiran SP masuk Arsip',
                "Lampiran {$validated['document_type']} untuk SP {$sp->nomor_sp} berhasil masuk sistem arsip.",
                [
                    'progress' => 'Lampiran arsip',
                    'document_no' => $sp->nomor_sp,
                    'vendors' => [$sp->nama_vendor],
                    'note' => $validated['notes'] ?? null,
                ],
                $request->user()
            );
        }

        return response()->json($result, $this->statusCode($result));
    }

    public function storeSpph(Request $request, Spph $spph, PrArchiveService $archiveService): JsonResponse
    {
        $validated = $this->validateUpload($request);

        $result = $archiveService->uploadDocument([
            'source' => 'SIMONPR',
            'source_module' => 'SPPH',
            'nomor_pr' => $spph->nomor_pr,
            'nomor_ppbj' => $spph->nomor_pr,
            'nomor_spph' => $spph->nomor_spph,
            'nomor_dokumen' => $spph->nomor_spph,
            'jenis_dokumen' => $validated['document_type'],
            'nama_vendor' => implode(', ', $spph->print_vendor_names),
            'deskripsi' => $spph->deskripsi_pengadaan,
            'pic' => $spph->pic,
            'tanggal_dokumen' => $spph->tanggal?->toDateString(),
            'uploaded_by' => auth()->user()?->name,
            'uploaded_by_email' => auth()->user()?->email,
            'notes' => $validated['notes'] ?? null,
            'replace_existing' => (bool) ($validated['replace_existing'] ?? false),
            'audit_package_key' => $this->auditPackageKey($spph->nomor_pr, $spph->nomor_spph),
        ], $request->file('document_file'));

        $this->logUploadResult('SPPH', $spph->id, $result);

        if (($result['state'] ?? null) === 'uploaded') {
            app(ProcurementJourneyService::class)->notifyByPrNumber(
                $spph->nomor_pr,
                'spph_attachment_uploaded',
                'Lampiran SPPH masuk Arsip',
                "Lampiran {$validated['document_type']} untuk SPPH {$spph->nomor_spph} berhasil masuk sistem arsip.",
                [
                    'progress' => 'Lampiran arsip',
                    'document_no' => $spph->nomor_spph,
                    'vendors' => $spph->print_vendor_names,
                    'note' => $validated['notes'] ?? null,
                ],
                $request->user()
            );
        }

        return response()->json($result, $this->statusCode($result));
    }

    private function validateUpload(Request $request): array
    {
        $maxKb = max(512, (int) config('services.pr_archive.upload_max_kb', 10240));

        return $request->validate([
            'document_type' => [
                'required',
                'string',
                'max:80',
                Rule::in([
                    'Dokumen SP',
                    'Dokumen SPPH',
                    'Penawaran Vendor',
                    'Kontrak',
                    'BA / Pendukung',
                    'Lainnya',
                ]),
            ],
            'document_file' => [
                'required',
                'file',
                'mimes:' . implode(',', self::ALLOWED_EXTENSIONS),
                'max:' . $maxKb,
            ],
            'notes' => ['nullable', 'string', 'max:500'],
            'replace_existing' => ['nullable', 'boolean'],
        ]);
    }

    private function auditPackageKey(?string $nomorPr, ?string $nomorDokumen): string
    {
        return hash('sha256', implode('|', [
            'SIMONPR',
            trim((string) $nomorPr),
            trim((string) $nomorDokumen),
        ]));
    }

    private function statusCode(array $result): int
    {
        return match ($result['state'] ?? null) {
            'uploaded' => 201,
            'duplicate' => 409,
            'unconfigured' => 503,
            'failed', 'unavailable' => 502,
            default => 422,
        };
    }

    private function logUploadResult(string $module, int $id, array $result): void
    {
        Log::info('Upload lampiran arsip dari SIMONPR.', [
            'module' => $module,
            'record_id' => $id,
            'state' => $result['state'] ?? null,
            'user_id' => auth()->id(),
        ]);
    }
}
