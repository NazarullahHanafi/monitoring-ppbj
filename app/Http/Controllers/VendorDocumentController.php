<?php

namespace App\Http\Controllers;

use App\Exceptions\VendorCloudException;
use App\Models\ActivityLog;
use App\Models\Vendor;
use App\Models\VendorDocument;
use App\Models\VendorDocumentBundle;
use App\Services\ProcurementOfficeReader;
use App\Services\ProcurementUploadInspector;
use App\Services\VendorDocumentCloud;
use App\Services\VendorDocumentDownloads;
use App\Services\VendorDocumentTransfers;
use App\Services\VendorTransferWorker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class VendorDocumentController extends Controller
{
    private const VALIDATION_MESSAGES = ['required' => ':attribute perlu diisi.', 'max' => ':attribute melewati batas yang diizinkan.', 'accepted' => 'Periksa teks lalu centang konfirmasi sebelum menyimpan.', 'date_format' => 'Tanggal belum lengkap atau tidak valid. Pilih tanggal yang benar.', 'in' => 'Pilihan :attribute tidak tersedia.', 'file' => 'Pilih berkas yang valid.', 'uploaded' => 'Unggahan melewati batas server atau belum selesai. Pilih berkas lebih kecil lalu coba kembali.'];

    public function index(Request $request, Vendor $vendor)
    {
        $data = $request->validate(['q' => 'nullable|string|max:160', 'type' => ['nullable', Rule::in(array_keys(VendorDocument::TYPES))], 'attention' => 'nullable|in:metadata,expiring,unfinished', 'page' => 'nullable|integer|min:1|max:10000']);
        $scope = $vendor->documents()->when(! empty($data['type']), fn ($q) => $q->where('type', $data['type']))
            ->when(($data['attention'] ?? '') === 'metadata', fn ($q) => $q->where('status', 'ready')->where(fn ($q) => $q->whereNull('search_text')->orWhere('search_text', '')))
            ->when(($data['attention'] ?? '') === 'expiring', fn ($q) => $q->where('status', 'ready')->whereNotNull('expires_at')->where('expires_at', '<=', now()->addDays(30)->toDateString()))
            ->when(($data['attention'] ?? '') === 'unfinished', fn ($q) => $q->where('status', '!=', 'ready'));
        $query = (clone $scope)->when(($data['q'] ?? '') !== '', fn ($q) => $q->search(trim($data['q'])))
            ->select(['id', 'vendor_id', 'type', 'title', 'document_number', 'expires_at', 'original_name', 'size', 'status', 'version', 'created_at'])
            ->selectRaw("CASE WHEN search_text IS NOT NULL AND search_text <> '' THEN 1 ELSE 0 END as has_text");
        $terms = VendorDocument::terms(trim($data['q'] ?? ''));
        if ($terms !== []) {
            $query->selectRaw("SUBSTR(COALESCE(search_text, ''), CASE WHEN INSTR(LOWER(search_text), ?) > 60 THEN INSTR(LOWER(search_text), ?) - 60 ELSE 1 END, 240) as snippet", [$terms[0], $terms[0]]);
        }
        $rows = $query->orderByDesc('created_at')->orderBy('id')->simplePaginate(20);
        $diagnosis = null;
        if ($rows->isEmpty() && $rows->currentPage() === 1 && $terms !== []) {
            $matched = [];
            $missing = [];
            foreach (array_slice($terms, 0, 8) as $term) {
                $exists = (clone $scope)->where('status', 'ready')->search($term)->exists();
                if ($exists) {
                    $matched[] = $term;
                } else {
                    $missing[] = $term;
                }
            }
            $diagnosis = ['matched' => $matched, 'missing' => $missing, 'suggestion' => implode(' ', $matched)];
        }

        return response()->json(['data' => $rows->map(fn ($doc) => $this->present($doc)), 'has_more' => $rows->hasMorePages(), 'diagnosis' => $diagnosis] + $this->transferCounts($vendor))->header('Cache-Control', 'private, no-store');
    }

    public function transfers(Vendor $vendor)
    {
        return response()->json($this->transferCounts($vendor))->header('Cache-Control', 'private, no-store');
    }

    private function transferCounts(Vendor $vendor): array
    {
        $counts = $vendor->documents()->selectRaw("SUM(CASE WHEN status = 'ready' THEN 1 ELSE 0 END) as ready, SUM(CASE WHEN status IN ('queued', 'transferring') THEN 1 ELSE 0 END) as active")->first();

        return ['ready_count' => (int) $counts->ready, 'active_count' => (int) $counts->active];
    }

    public function show(Vendor $vendor, VendorDocument $document)
    {
        $this->belongs($vendor, $document);

        return response()->json(['document' => $this->present($document), 'search_text' => $document->search_text ?? ''])->header('Cache-Control', 'private, no-store');
    }

    public function store(Request $request, Vendor $vendor, VendorDocumentCloud $cloud)
    {
        $data = $request->validate($this->rules() + [
            'upload_id' => 'nullable|uuid',
            'background' => 'nullable|boolean',
            'file' => ['required', 'file', 'max:10240'],
        ], self::VALIDATION_MESSAGES, ['file' => 'Berkas', 'title' => 'Judul dokumen', 'type' => 'Jenis dokumen']);
        $file = $request->file('file');
        abort_if($file->getSize() < 1, 422, 'Berkas kosong tidak dapat disimpan.');
        $format = app(ProcurementUploadInspector::class)->inspect($file);
        $mime = $format['mime'];
        $extension = $format['extension'];
        $id = strtolower($data['upload_id'] ?? (string) Str::uuid());
        $checksum = hash_file('sha256', $file->getRealPath());
        $lock = Cache::lock('vendor-document:'.$id, 900);
        abort_unless($lock->get(), 409, 'Berkas ini sedang diproses. Tunggu lalu muat ulang daftar.');
        $temporary = null;
        try {
            $document = VendorDocument::find($id);
            if ($document) {
                abort_unless($document->vendor_id === $vendor->id && $document->uploaded_by === $request->user()->id && hash_equals($document->checksum, $checksum), 409, 'ID unggahan sudah digunakan. Muat ulang daftar sebelum mengunggah berkas lain.');
                if ($document->status === 'ready') {
                    return response()->json(['document' => $this->present($document), 'reused' => true]);
                }
                if (in_array($document->status, ['queued', 'transferring'], true) && $document->staged_file) {
                    $document->forceFill($this->metadata($data))->save();

                    return response()->json(['document' => $this->present($document), 'queued' => true], 202);
                }
                abort_if($document->status === 'deleting', 409, 'Lampiran sedang dihapus.');
                $document->forceFill(['status' => 'pending'])->save();
            } else {
                // Reserve the deterministic cloud path before network I/O. A retry
                // uses the same path, including after an interrupted response.
                $document = VendorDocument::create($this->metadata($data) + [
                    'id' => $id, 'vendor_id' => $vendor->id, 'uploaded_by' => $request->user()->id,
                    'original_name' => mb_substr(preg_replace('/[\x00-\x1F\x7F]/u', '', basename(str_replace('\\', '/', $file->getClientOriginalName()))), 0, 255) ?: $id.'.'.$extension,
                    'mime' => $mime, 'size' => $file->getSize(), 'checksum' => $checksum,
                    'cloud_path' => 'SIMONPR-Vendor/'.now()->format('Y/m').'/'.$id.'.'.$extension,
                ]);
            }
            if ($request->boolean('background')) {
                $document->forceFill($this->metadata($data))->save();
                app(VendorDocumentTransfers::class)->stage($document, $file);
                DB::afterCommit(fn () => app(VendorTransferWorker::class)->kick());

                return response()->json(['document' => $this->present($document), 'queued' => true], 202);
            }
            $temporary = $this->temporary($cloud);
            if (! copy($file->getRealPath(), $temporary)) {
                throw new \RuntimeException('temporary upload');
            }
            chmod($temporary, 0600);
            $result = $cloud->call($this->cloudInput($document, 'upload') + ['local' => basename($temporary)]);
            if (($result['verified'] ?? false) !== true || empty($result['item_id'])) {
                throw new \RuntimeException('cloud verification');
            }
            DB::transaction(function () use ($document, $result, $data, $request) {
                $document->forceFill($this->metadata($data) + ['cloud_item_id' => $result['item_id'], 'cloud_etag' => $result['etag'] ?? null, 'status' => 'ready'])->save();
                $document->reindex();
                $this->audit($request, $document, 'vendor_document_uploaded');
            });

            return response()->json(['document' => $this->present($document)], 201);
        } catch (\Symfony\Component\HttpKernel\Exception\HttpExceptionInterface $e) {
            throw $e;
        } catch (\Throwable $e) {
            $this->recordFailure($e, 'upload', $id);
            if (isset($document) && $document?->exists && $document->status !== 'ready') {
                $document->forceFill(['status' => 'failed'])->save();
            }

            return response()->json(['message' => $e instanceof VendorCloudException ? $e->getMessage() : 'Unggahan belum terkonfirmasi. Pilih berkas yang sama dan coba lagi, atau muat ulang daftar. Tidak perlu membuat unggahan baru.', 'error_code' => $e instanceof VendorCloudException ? $e->reason : 'upload_failed', 'upload_id' => $id], 503);
        } finally {
            if ($temporary && is_file($temporary)) {
                unlink($temporary);
            }
            $lock->release();
        }
    }

    public function update(Request $request, Vendor $vendor, VendorDocument $document)
    {
        $this->belongs($vendor, $document);
        $data = $request->validate($this->rules() + ['version' => 'required|integer|min:1'], self::VALIDATION_MESSAGES, ['title' => 'Judul dokumen', 'type' => 'Jenis dokumen']);
        $lock = Cache::lock('vendor-document:'.$document->id, 900);
        abort_unless($lock->get(), 409, 'Lampiran sedang diproses. Coba lagi setelah proses selesai.');
        try {
            DB::transaction(function () use ($document, $data, $request) {
                $fresh = VendorDocument::whereKey($document->id)->lockForUpdate()->firstOrFail();
                abort_unless($fresh->status === 'ready' && $fresh->version === (int) $data['version'], 409, 'Lampiran berubah. Buka ulang pemeriksaan untuk memuat versi terbaru.');
                $fresh->forceFill($this->metadata($data) + ['version' => $fresh->version + 1])->save();
                $fresh->reindex();
                $this->audit($request, $fresh, 'vendor_document_reviewed');
            });
        } finally {
            $lock->release();
        }

        return response()->json(['document' => $this->present($document->fresh())]);
    }

    public function extract(Request $request, Vendor $vendor, ProcurementUploadInspector $inspector, ProcurementOfficeReader $reader)
    {
        $request->validate(['file' => 'required|file|max:10240'], self::VALIDATION_MESSAGES, ['file' => 'Berkas']);
        $file = $request->file('file');
        $format = $inspector->inspect($file);
        abort_unless(in_array($format['reader'], ['office', 'text'], true), 422, 'Gunakan pembaca PDF/foto di perangkat atau lengkapi teks secara manual.');

        return response()->json($reader->read($file->getRealPath(), $format['extension']))->header('Cache-Control', 'private, no-store');
    }

    public function download(Vendor $vendor, VendorDocument $document, VendorDocumentCloud $cloud)
    {
        $this->belongs($vendor, $document);
        abort_unless($document->status === 'ready', 409, 'Berkas belum siap diunduh.');
        $temporary = null;
        try {
            if (request()->boolean('direct')) {
                $downloads = app(VendorDocumentDownloads::class);
                if ($document->cloud_etag) {
                    return redirect()->away($downloads->direct($document), 302, ['Cache-Control' => 'private, no-store', 'Referrer-Policy' => 'no-referrer']);
                }
                $cached = $downloads->verified($document);
                $temporary = $this->temporary($cloud);
                if (! @link($cached, $temporary) && ! copy($cached, $temporary)) {
                    throw new \RuntimeException('download copy');
                }

                return response()->download($temporary, $document->original_name, ['Content-Type' => $document->mime, 'Cache-Control' => 'private, no-store', 'X-Content-Type-Options' => 'nosniff'])->deleteFileAfterSend(true);
            }
            $temporary = $this->temporary($cloud);
            $cloud->call($this->cloudInput($document, 'download') + ['local' => basename($temporary)]);
            if (! is_file($temporary) || filesize($temporary) !== $document->size || ! hash_equals($document->checksum, hash_file('sha256', $temporary))) {
                throw new \RuntimeException('download verification');
            }
        } catch (\Throwable $e) {
            $this->recordFailure($e, 'download', $document->id);
            if ($temporary && is_file($temporary)) {
                unlink($temporary);
            }

            return response()->json(['message' => $e instanceof VendorCloudException ? $e->getMessage() : 'Unduhan OneDrive belum berhasil. Silakan coba kembali.'], 503);
        }

        return response()->download($temporary, $document->original_name, ['Content-Type' => $document->mime, 'Cache-Control' => 'private, no-store', 'X-Content-Type-Options' => 'nosniff'])->deleteFileAfterSend(true);
    }

    public function destroy(Request $request, Vendor $vendor, VendorDocument $document, VendorDocumentCloud $cloud)
    {
        $this->belongs($vendor, $document);
        $data = $request->validate(['version' => 'required|integer|min:1']);
        $lock = Cache::lock('vendor-document:'.$document->id, 900);
        abort_unless($lock->get(), 409, 'Lampiran sedang diproses. Coba lagi setelah proses selesai.');
        try {
            $document->refresh();
            abort_unless($document->version === (int) $data['version'], 409, 'Lampiran berubah. Muat ulang daftar terlebih dahulu.');
            $document->forceFill(['status' => 'deleting'])->save();
            $cloud->call($this->cloudInput($document, 'delete'));
            app(VendorDocumentTransfers::class)->remove($document->staged_file);
            app(VendorDocumentDownloads::class)->forget($document);
            DB::transaction(function () use ($request, $document) {
                $this->audit($request, $document, 'vendor_document_removed');
                $document->delete();
            });

            return response()->json(['deleted' => true]);
        } catch (\Symfony\Component\HttpKernel\Exception\HttpExceptionInterface $e) {
            throw $e;
        } catch (\Throwable $e) {
            $this->recordFailure($e, 'delete', $document->id);

            return response()->json(['message' => $e instanceof VendorCloudException ? $e->getMessage() : 'Penghapusan OneDrive belum terkonfirmasi. Muat ulang daftar lalu coba hapus kembali.'], 503);
        } finally {
            $lock->release();
        }
    }

    public function bundle(Request $request, Vendor $vendor, VendorDocumentDownloads $downloads)
    {
        $bundle = $downloads->prepare($vendor, $request->user()->id);
        DB::afterCommit(fn () => app(VendorTransferWorker::class)->kick());

        return response()->json($this->bundleData($bundle), $bundle->status === 'ready' ? 200 : 202)->header('Cache-Control', 'private, no-store');
    }

    public function bundleStatus(Request $request, Vendor $vendor, VendorDocumentBundle $bundle)
    {
        abort_unless($bundle->vendor_id === $vendor->id && $bundle->user_id === $request->user()->id, 404);
        abort_if($bundle->expires_at->isPast(), 410, 'Paket kedaluwarsa. Siapkan ZIP kembali.');

        return response()->json($this->bundleData($bundle))->header('Cache-Control', 'private, no-store');
    }

    public function bundleDownload(Request $request, Vendor $vendor, VendorDocumentBundle $bundle, VendorDocumentDownloads $downloads)
    {
        abort_unless($bundle->vendor_id === $vendor->id && $bundle->user_id === $request->user()->id, 404);
        $path = $downloads->bundlePath($bundle);
        $name = 'Lampiran - '.Str::slug($vendor->nama_vendor).'.zip';

        return response()->download($path, $name, ['Content-Type' => 'application/zip', 'Cache-Control' => 'private, no-store', 'X-Content-Type-Options' => 'nosniff']);
    }

    private function bundleData(VendorDocumentBundle $bundle): array
    {
        return ['id' => $bundle->id, 'status' => $bundle->status, 'completed' => $bundle->completed, 'total' => count($bundle->documents),
            'download_url' => $bundle->status === 'ready' ? route('vendor.documents.bundle.download', [$bundle->vendor_id, $bundle->id]) : null];
    }

    private function rules(): array
    {
        return ['type' => ['required', Rule::in(array_keys(VendorDocument::TYPES))], 'title' => 'required|string|max:160', 'document_number' => 'nullable|string|max:160', 'expires_at' => 'nullable|date_format:Y-m-d', 'search_text' => 'nullable|string|max:200000', 'text_confirmed' => filled(request()->input('search_text')) ? 'required|accepted' : 'nullable'];
    }

    private function audit(Request $request, VendorDocument $document, string $action): void
    {
        ActivityLog::create(['user_id' => $request->user()->id, 'model_type' => Vendor::class, 'model_id' => $document->vendor_id,
            'action' => $action, 'description' => 'Lampiran vendor dikelola melalui penyimpanan OneDrive.',
            'changes' => ['document_id' => $document->id, 'type' => $document->type, 'version' => $document->version]]);
    }

    private function recordFailure(\Throwable $error, string $operation, string $id): void
    {
        Log::warning('Vendor document operation failed', ['operation' => $operation, 'document_id' => $id,
            'reason' => $error instanceof VendorCloudException ? $error->reason : 'local_operation', 'exception_class' => get_class($error)]);
    }

    private function temporary(VendorDocumentCloud $cloud): string
    {
        $path = $cloud->workDirectory().DIRECTORY_SEPARATOR.bin2hex(random_bytes(16)).'.bin';
        register_shutdown_function(static function () use ($path) {
            if (is_file($path)) {
                @unlink($path);
            }
        });

        return $path;
    }

    private function metadata(array $data): array
    {
        return ['type' => $data['type'], 'title' => trim($data['title']), 'document_number' => trim($data['document_number'] ?? '') ?: null, 'expires_at' => $data['expires_at'] ?? null, 'search_text' => trim($data['search_text'] ?? '') ?: null];
    }

    private function belongs(Vendor $vendor, VendorDocument $document): void
    {
        abort_unless($document->vendor_id === $vendor->id, 404);
    }

    private function cloudInput(VendorDocument $document, string $action): array
    {
        return ['action' => $action, 'cloud_path' => $document->cloud_path, 'item_id' => $document->cloud_item_id, 'checksum' => $document->checksum, 'size' => $document->size];
    }

    private function present(VendorDocument $document): array
    {
        return ['id' => $document->id, 'type' => $document->type, 'type_label' => VendorDocument::TYPES[$document->type], 'title' => $document->title, 'document_number' => $document->document_number, 'expires_at' => $document->expires_at?->format('Y-m-d'), 'original_name' => $document->original_name, 'size' => $document->size, 'status' => $document->status, 'version' => $document->version, 'has_text' => isset($document->has_text) ? (bool) $document->has_text : filled($document->search_text), 'snippet' => $document->snippet ?? '', 'download_url' => $document->status === 'ready' ? route('vendor.documents.download', [$document->vendor_id, $document->id]) : null];
    }
}
