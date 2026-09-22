<?php

namespace App\Http\Controllers;

use App\Models\Sp;
use App\Models\Spph;
use App\Services\PrArchiveService;
use App\Services\ProcurementJourneyService;
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

    public function showSp(Request $request, Sp $sp, PrArchiveService $archiveService): JsonResponse
    {
        $sp->loadMissing('ppbjs:id,ppbj_no');

        return $this->showLinkedArchives(
            $request,
            $archiveService,
            'SP',
            $sp->id,
            (string) ($sp->nomor_sp ?: 'SP-'.$sp->id),
            $sp->linkedPpbjNumbers()
        );
    }

    public function showSpph(Request $request, Spph $spph, PrArchiveService $archiveService): JsonResponse
    {
        $spph->loadMissing('ppbjs:id,ppbj_no');

        return $this->showLinkedArchives(
            $request,
            $archiveService,
            'SPPH',
            $spph->id,
            (string) ($spph->nomor_spph ?: 'SPPH-'.$spph->id),
            $spph->linkedPpbjNumbers()
        );
    }

    /**
     * Ambil arsip hanya saat user menekan tombol Cek Arsip. Dengan begitu,
     * halaman daftar tetap bebas dari request API arsip per baris (N+1 HTTP).
     */
    private function showLinkedArchives(
        Request $request,
        PrArchiveService $archiveService,
        string $module,
        int $recordId,
        string $documentNumber,
        array $prNumbers
    ): JsonResponse {
        $numbers = collect($prNumbers)
            ->map(fn ($number) => trim((string) $number))
            ->filter()
            ->unique()
            ->take(20)
            ->values();

        if ($numbers->isEmpty()) {
            return response()->json([
                'module' => $module,
                'record_id' => $recordId,
                'document_number' => $documentNumber,
                'state' => 'empty',
                'has_archive' => false,
                'document_count' => 0,
                'documents' => [],
                'packages' => [],
                'sources' => [],
                'message' => 'Nomor PR/PPBJ belum tersedia pada dokumen ini.',
                'checked_at' => now()->toIso8601String(),
            ]);
        }

        $sources = $numbers->map(function (string $number) use ($archiveService, $request) {
            $archive = $archiveService->findByPrNumber($number, $request->boolean('refresh'));

            $archive['nomor_pr'] = $number;
            $archive['documents'] = collect($archive['documents'] ?? [])
                ->map(fn (array $document) => array_merge($document, ['nomor_pr' => $number]))
                ->values()
                ->all();
            $archive['packages'] = collect($archive['packages'] ?? [])
                ->map(fn (array $package) => array_merge($package, ['nomor_pr' => $number]))
                ->values()
                ->all();

            return $archive;
        });

        $documents = $sources->flatMap(fn (array $source) => $source['documents'] ?? [])->values();
        $packages = $sources->flatMap(fn (array $source) => $source['packages'] ?? [])->values();
        $hasArchive = $sources->contains(fn (array $source) => (bool) ($source['has_archive'] ?? false));
        $hasUnavailable = $sources->contains(fn (array $source) => in_array($source['state'] ?? '', ['unavailable', 'failed'], true));
        $allUnconfigured = $sources->every(fn (array $source) => ($source['state'] ?? '') === 'unconfigured');
        $state = $hasArchive ? 'available' : ($allUnconfigured ? 'unconfigured' : ($hasUnavailable ? 'unavailable' : 'empty'));
        $documentCount = max(
            $documents->count(),
            (int) $sources->sum(fn (array $source) => (int) ($source['document_count'] ?? 0))
        );

        $message = match ($state) {
            'available' => $documentCount.' dokumen arsip ditemukan untuk '.$numbers->count().' nomor PR/PPBJ.',
            'unconfigured' => 'Koneksi ke Sistem Arsip belum dikonfigurasi.',
            'unavailable' => 'Sebagian atau seluruh data arsip sedang tidak dapat dihubungi.',
            default => 'Belum ada arsip atau laporan untuk nomor PR/PPBJ terkait.',
        };

        return response()->json([
            'module' => $module,
            'record_id' => $recordId,
            'document_number' => $documentNumber,
            'state' => $state,
            'has_archive' => $hasArchive,
            'document_count' => $documentCount,
            'documents' => $documents->all(),
            'packages' => $packages->all(),
            'sources' => $sources->map(fn (array $source) => [
                'nomor_pr' => $source['nomor_pr'] ?? null,
                'state' => $source['state'] ?? 'empty',
                'has_archive' => (bool) ($source['has_archive'] ?? false),
                'document_count' => (int) ($source['document_count'] ?? 0),
                'message' => $source['message'] ?? null,
            ])->values()->all(),
            'message' => $message,
            'checked_at' => now()->toIso8601String(),
        ], 200, [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
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
                'mimes:'.implode(',', self::ALLOWED_EXTENSIONS),
                'max:'.$maxKb,
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
