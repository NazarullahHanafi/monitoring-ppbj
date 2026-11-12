<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\Vendor;
use App\Models\VendorDocument;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class VendorDocumentTransfers
{
    public function __construct(private VendorDocumentCloud $cloud) {}

    public function directory(): string
    {
        $path = $this->cloud->workDirectory().'/staging';
        if (! is_dir($path) && ! mkdir($path, 0700, true) && ! is_dir($path)) {
            throw new \RuntimeException('staging unavailable');
        }

        return $path;
    }

    public function stage(VendorDocument $document, UploadedFile $file): void
    {
        $budget = Cache::lock('vendor-staging-budget', 15);
        abort_unless($budget->get(), 503, 'Penerimaan berkas sedang sibuk. Coba lagi sebentar.');
        $path = null;
        try {
            $used = 0;
            foreach (new \DirectoryIterator($this->directory()) as $entry) {
                if ($entry->isFile()) {
                    $used += $entry->getSize();
                }
            }
            abort_if($used + $document->size > 128 * 1024 * 1024 || disk_free_space($this->directory()) < $document->size + 100 * 1024 * 1024,
                503, 'Ruang transfer sementara sedang penuh. Tunggu transfer sebelumnya selesai.');
            $name = bin2hex(random_bytes(16)).'.bin';
            $path = $this->directory().'/'.$name;
            if (! copy($file->getRealPath(), $path)) {
                throw new \RuntimeException('staging failed');
            }
            chmod($path, 0600);
            $old = $document->staged_file;
            $document->forceFill(['status' => 'queued', 'staged_file' => $name, 'transfer_attempts' => 0, 'transfer_after' => now(), 'transfer_expires_at' => now()->addDay()])->save();
            $path = null;
            if ($old) {
                $this->remove($old);
            }
        } finally {
            if ($path && is_file($path)) {
                unlink($path);
            }
            $budget->release();
        }
    }

    public function remove(?string $name): void
    {
        if ($name && preg_match('/^[a-f0-9]{32}\.bin$/D', $name)) {
            $path = $this->directory().'/'.$name;
            if (is_file($path) && ! is_link($path)) {
                unlink($path);
            }
        }
    }

    public function process(VendorDocument $document): bool
    {
        $lock = Cache::lock('vendor-document:'.$document->id, 900);
        if (! $lock->get()) {
            return false;
        }
        $temporary = null;
        try {
            $document->refresh();
            if (! in_array($document->status, ['queued', 'transferring'], true) || ! $document->staged_file
                || $document->transfer_after?->isFuture()) {
                return false;
            }
            if ($document->transfer_expires_at?->isPast()) {
                $this->remove($document->staged_file);
                $document->forceFill(['status' => 'failed', 'staged_file' => null, 'transfer_after' => null])->save();

                return true;
            }
            $source = $this->directory().'/'.$document->staged_file;
            if (! is_file($source) || is_link($source) || ! hash_equals($document->checksum, hash_file('sha256', $source))) {
                throw new \RuntimeException('staged integrity');
            }
            $document->forceFill(['status' => 'transferring', 'transfer_attempts' => $document->transfer_attempts + 1])->save();
            $temporary = $this->cloud->workDirectory().'/'.bin2hex(random_bytes(16)).'.bin';
            if (! copy($source, $temporary)) {
                throw new \RuntimeException('transfer copy');
            }
            chmod($temporary, 0600);
            $result = $this->cloud->call(['action' => 'upload', 'cloud_path' => $document->cloud_path, 'item_id' => $document->cloud_item_id,
                'checksum' => $document->checksum, 'size' => $document->size, 'local' => basename($temporary)]);
            if (($result['verified'] ?? false) !== true || empty($result['item_id'])) {
                throw new \RuntimeException('unverified transfer');
            }
            DB::transaction(function () use ($document, $result) {
                $document->forceFill(['status' => 'ready', 'cloud_item_id' => $result['item_id'], 'cloud_etag' => $result['etag'] ?? null,
                    'staged_file' => null, 'transfer_after' => null, 'transfer_expires_at' => null])->save();
                $document->reindex();
                ActivityLog::create(['user_id' => $document->uploaded_by, 'model_type' => Vendor::class, 'model_id' => $document->vendor_id,
                    'action' => 'vendor_document_uploaded', 'description' => 'Lampiran vendor selesai diverifikasi di OneDrive.',
                    'changes' => ['document_id' => $document->id, 'type' => $document->type, 'version' => $document->version]]);
            });
            $this->remove(basename($source));

            return true;
        } catch (\Throwable $error) {
            if ($document->status === 'ready') {
                return true;
            }
            $attempts = max(1, $document->transfer_attempts);
            $document->forceFill(['status' => $attempts >= 3 ? 'failed' : 'queued', 'transfer_attempts' => $attempts,
                'transfer_after' => $attempts >= 3 ? null : now()->addMinutes($attempts * 2)])->save();
            \Illuminate\Support\Facades\Log::warning('Vendor background transfer deferred.', ['document_id' => $document->id, 'exception_class' => get_class($error)]);

            return true;
        } finally {
            if ($temporary && is_file($temporary)) {
                unlink($temporary);
            }
            $lock->release();
        }
    }

    public function prune(): int
    {
        $count = 0;
        VendorDocument::whereNotNull('staged_file')->where('transfer_expires_at', '<', now())->chunkById(50, function ($documents) use (&$count) {
            foreach ($documents as $document) {
                $lock = Cache::lock('vendor-document:'.$document->id, 900);
                if (! $lock->get()) {
                    continue;
                }
                try {
                    $document->refresh();
                    if (! $document->transfer_expires_at?->isPast()) {
                        continue;
                    }
                    $this->remove($document->staged_file);
                    $document->forceFill(['status' => 'failed', 'staged_file' => null, 'transfer_after' => null])->save();
                    $count++;
                } finally {
                    $lock->release();
                }
            }
        });
        // Interrupted writes which never committed a database reservation.
        foreach (new \DirectoryIterator($this->directory()) as $entry) {
            if ($entry->isFile() && ! $entry->isLink() && $entry->getMTime() < time() - 90000) {
                $this->remove($entry->getFilename());
            }
        }

        return $count;
    }
}
