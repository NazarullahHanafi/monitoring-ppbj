<?php

namespace App\Services;

use App\Models\Vendor;
use App\Models\VendorDocument;
use App\Models\VendorDocumentBundle;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use ZipArchive;

class VendorDocumentDownloads
{
    public function __construct(private VendorDocumentCloud $cloud) {}

    public function directory(): string
    {
        $path = $this->cloud->workDirectory().'/downloads';
        if (! is_dir($path) && ! mkdir($path, 0700, true) && ! is_dir($path)) {
            throw new \RuntimeException('download directory');
        }

        return $path;
    }

    private function key(VendorDocument $document): string
    {
        return hash('sha256', $document->id.':'.$document->checksum);
    }

    public function verified(VendorDocument $document): string
    {
        $key = $this->key($document);
        $destination = $this->directory().'/'.$key.'.bin';
        $lock = Cache::lock('vendor-download:'.$key, 360);
        abort_unless($lock->get(), 409, 'Berkas yang sama sedang disiapkan. Coba lagi sebentar.');
        $temporary = null;
        try {
            if (is_file($destination) && ! is_link($destination) && filemtime($destination) > time() - 900
                && filesize($destination) === $document->size && hash_equals($document->checksum, hash_file('sha256', $destination))) {
                return $destination;
            }
            if (is_file($destination)) {
                unlink($destination);
            }
            $temporary = $this->cloud->workDirectory().'/'.bin2hex(random_bytes(16)).'.bin';
            $result = $this->cloud->call(['action' => 'download', 'cloud_path' => $document->cloud_path, 'item_id' => $document->cloud_item_id,
                'checksum' => $document->checksum, 'size' => $document->size, 'local' => basename($temporary)]);
            if (! is_file($temporary) || filesize($temporary) !== $document->size || ! hash_equals($document->checksum, hash_file('sha256', $temporary))) {
                throw new \RuntimeException('download integrity');
            }
            $budget = Cache::lock('vendor-download-budget', 15);
            abort_unless($budget->get(), 503, 'Ruang unduhan sedang disiapkan. Coba lagi sebentar.');
            try {
                $this->pruneCache(max(0, 64 * 1024 * 1024 - $document->size));
                if (! rename($temporary, $destination)) {
                    throw new \RuntimeException('cache publish');
                }
                chmod($destination, 0600);
                $temporary = null;
            } finally {
                $budget->release();
            }
            if (! $document->cloud_etag && ! empty($result['etag'])) {
                VendorDocument::whereKey($document->id)->where('status', 'ready')->whereNull('cloud_etag')->update(['cloud_etag' => $result['etag']]);
            }

            return $destination;
        } finally {
            if ($temporary && is_file($temporary)) {
                unlink($temporary);
            }
            $lock->release();
        }
    }

    public function forget(VendorDocument $document): void
    {
        $path = $this->cloud->workDirectory().'/downloads/'.$this->key($document).'.bin';
        if (is_file($path)) {
            unlink($path);
        }
        Cache::forget('vendor-direct:'.$document->id);
    }

    public function direct(VendorDocument $document): string
    {
        $cached = Cache::get('vendor-direct:'.$document->id);
        if (is_array($cached) && ($cached['etag'] ?? null) === $document->cloud_etag) {
            return $this->safeUrl($cached['url']);
        }
        $result = $this->cloud->call(['action' => 'link', 'cloud_path' => $document->cloud_path, 'item_id' => $document->cloud_item_id,
            'etag' => $document->cloud_etag, 'checksum' => $document->checksum, 'size' => $document->size]);
        $url = $this->safeUrl($result['url'] ?? '');
        Cache::put('vendor-direct:'.$document->id, ['etag' => $document->cloud_etag, 'url' => $url], 30);

        return $url;
    }

    private function safeUrl(string $url): string
    {
        $host = strtolower(parse_url($url, PHP_URL_HOST) ?: '');
        $suffixes = ['.sharepoint.com', '.1drv.com', '.1drv.ms', '.onedrive.com', '.live.com', '.microsoft.com'];
        $allowed = false;
        foreach ($suffixes as $suffix) {
            if (str_ends_with($host, $suffix) || $host === substr($suffix, 1)) {
                $allowed = true;
            }
        }
        if (parse_url($url, PHP_URL_SCHEME) !== 'https' || parse_url($url, PHP_URL_USER) || parse_url($url, PHP_URL_PASS)
            || (parse_url($url, PHP_URL_PORT) && parse_url($url, PHP_URL_PORT) !== 443) || ! $allowed || preg_match('/[\x00-\x20\x7f]/', $url)) {
            throw new \RuntimeException('unsafe download URL');
        }

        return $url;
    }

    public function snapshot(Vendor $vendor): array
    {
        return $vendor->documents()->where('status', 'ready')->orderBy('id')
            ->get(['id', 'version', 'checksum', 'original_name', 'size'])->map(fn ($doc) => ['id' => $doc->id, 'version' => $doc->version, 'checksum' => $doc->checksum, 'original_name' => $doc->original_name, 'size' => $doc->size])->all();
    }

    public function fingerprint(array $documents): string
    {
        return hash('sha256', json_encode($documents, JSON_THROW_ON_ERROR));
    }

    public function prepare(Vendor $vendor, int $userId): VendorDocumentBundle
    {
        $lock = Cache::lock('vendor-bundle-create:'.$userId.':'.$vendor->id, 15);
        abort_unless($lock->get(), 409, 'Paket vendor sedang disiapkan. Coba lagi sebentar.');
        try {
            $documents = $this->snapshot($vendor);
            abort_if($documents === [], 422, 'Belum ada lampiran siap yang dapat dimasukkan ke ZIP.');
            abort_if(count($documents) > 200 || array_sum(array_column($documents, 'size')) > 100 * 1024 * 1024, 422, 'Paket melebihi 200 berkas atau 100 MB. Unduh berkas satu per satu untuk vendor ini.');
            $fingerprint = $this->fingerprint($documents);
            $existing = VendorDocumentBundle::where('vendor_id', $vendor->id)->where('user_id', $userId)->where('fingerprint', $fingerprint)
                ->whereIn('status', ['queued', 'processing', 'ready'])->where('expires_at', '>', now())->latest()->first();
            if ($existing) {
                return $existing;
            }
            abort_if(VendorDocumentBundle::whereIn('status', ['queued', 'processing'])->where('expires_at', '>', now())->count() >= 8, 503, 'Antrean paket sedang penuh. Coba lagi setelah paket sebelumnya selesai.');

            return VendorDocumentBundle::create(['id' => (string) Str::uuid(), 'vendor_id' => $vendor->id, 'user_id' => $userId,
                'status' => 'queued', 'fingerprint' => $fingerprint, 'documents' => $documents, 'expires_at' => now()->addHour()]);
        } finally {
            $lock->release();
        }
    }

    public function unchanged(VendorDocumentBundle $bundle): bool
    {
        $vendor = Vendor::find($bundle->vendor_id);

        return $vendor && hash_equals($bundle->fingerprint, $this->fingerprint($this->snapshot($vendor)));
    }

    public function process(VendorDocumentBundle $bundle): bool
    {
        $lock = Cache::lock('vendor-bundle:'.$bundle->id, 900);
        if (! $lock->get()) {
            return false;
        }
        $zip = null;
        $zipPath = null;
        $copies = [];
        $started = microtime(true);
        try {
            $bundle->refresh();
            if (! in_array($bundle->status, ['queued', 'processing'], true) || $bundle->expires_at->isPast()) {
                return false;
            }
            if (! $this->unchanged($bundle)) {
                throw new \RuntimeException('bundle changed');
            }
            $this->pruneBundles();
            $bytes = array_sum(array_column($bundle->documents, 'size'));
            // Limit ready ZIPs plus this build, and leave reserve for the app.
            $used = 0;
            foreach (new \DirectoryIterator($this->directory()) as $entry) {
                if ($entry->isFile() && in_array($entry->getExtension(), ['zip', 'part'], true)) {
                    $used += $entry->getSize();
                }
            }
            if ($used + $bytes > 200 * 1024 * 1024 || disk_free_space($this->directory()) < $bytes * 2 + 100 * 1024 * 1024) {
                throw new \RuntimeException('bundle capacity');
            }
            $name = bin2hex(random_bytes(16)).'.zip';
            $zipPath = $this->directory().'/'.$name;
            $zip = new ZipArchive;
            if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::EXCL) !== true) {
                throw new \RuntimeException('zip open');
            }
            $bundle->forceFill(['status' => 'processing', 'completed' => 0])->save();
            foreach ($bundle->documents as $index => $entry) {
                if (microtime(true) - $started > 240) {
                    throw new \RuntimeException('bundle time limit');
                }
                $document = VendorDocument::whereKey($entry['id'])->where('vendor_id', $bundle->vendor_id)->where('status', 'ready')->firstOrFail();
                if (! hash_equals($entry['checksum'], $document->checksum) || $entry['version'] !== $document->version) {
                    throw new \RuntimeException('bundle entry changed');
                }
                $cached = $this->verified($document);
                $copy = $this->directory().'/'.bin2hex(random_bytes(16)).'.part';
                // A hard link keeps an immutable inode available even if the
                // bounded read cache evicts it before ZipArchive::close().
                if (! @link($cached, $copy) && ! copy($cached, $copy)) {
                    throw new \RuntimeException('zip source');
                }
                $copies[] = $copy;
                $safeName = preg_replace('/[\x00-\x1f\x7f\\\\\/:*?"<>|]/u', '_', $document->original_name);
                $safeName = str_replace(['..'], '_', $safeName);
                $zipName = sprintf('%03d - ', $index + 1).(trim($safeName, '. ') ?: 'dokumen');
                if (! $zip->addFile($copy, $zipName) || ! $zip->setCompressionName($zipName, ZipArchive::CM_STORE)) {
                    throw new \RuntimeException('zip entry');
                }
                $bundle->forceFill(['completed' => $index + 1])->save();
            }
            if (! $zip->close()) {
                throw new \RuntimeException('zip close');
            }
            $zip = null;
            chmod($zipPath, 0600);
            if (! $this->unchanged($bundle)) {
                throw new \RuntimeException('bundle changed');
            }
            $bundle->forceFill(['status' => 'ready', 'file' => $name, 'size' => filesize($zipPath)])->save();
            $zipPath = null;

            return true;
        } catch (\Throwable $error) {
            $bundle->forceFill(['status' => 'failed', 'file' => null])->save();
            $code = in_array($error->getMessage(), ['bundle changed', 'bundle capacity', 'zip open', 'zip source', 'zip entry', 'zip close', 'bundle entry changed', 'bundle time limit', 'download integrity'], true) ? $error->getMessage() : 'unexpected';
            \Illuminate\Support\Facades\Log::warning('Vendor bundle preparation failed.', ['bundle_id' => $bundle->id, 'exception_class' => get_class($error),
                'failure_code' => $code, 'location' => basename($error->getFile()).':'.$error->getLine()]);

            return true;
        } finally {
            if ($zip) {
                try {
                    $zip->close();
                } catch (\Throwable) {
                }
            }
            foreach ($copies as $copy) {
                if (is_file($copy)) {
                    unlink($copy);
                }
            }
            if ($zipPath && is_file($zipPath)) {
                unlink($zipPath);
            }
            $lock->release();
        }
    }

    public function bundlePath(VendorDocumentBundle $bundle): string
    {
        abort_unless($bundle->status === 'ready' && $bundle->expires_at->isFuture() && $this->unchanged($bundle), 409, 'Paket kedaluwarsa atau lampiran berubah. Siapkan ZIP terbaru.');
        abort_unless(preg_match('/^[a-f0-9]{32}\.zip$/D', $bundle->file ?? ''), 404);
        $path = $this->directory().'/'.$bundle->file;
        abort_unless(is_file($path) && ! is_link($path) && filesize($path) === $bundle->size, 410, 'Paket sudah dibersihkan. Siapkan ZIP kembali.');

        return $path;
    }

    public function pruneCache(int $budget = 64 * 1024 * 1024): void
    {
        $files = [];
        foreach (new \DirectoryIterator($this->directory()) as $entry) {
            if ($entry->isFile() && ! $entry->isLink() && preg_match('/^[a-f0-9]{64}\.bin$/D', $entry->getFilename())) {
                $files[] = ['path' => $entry->getPathname(), 'time' => $entry->getMTime(), 'size' => $entry->getSize()];
            }
        }
        usort($files, fn ($a, $b) => $a['time'] <=> $b['time']);
        $size = array_sum(array_column($files, 'size'));
        foreach ($files as $file) {
            if ($size <= $budget && $file['time'] >= time() - 900) {
                continue;
            }
            if (is_file($file['path']) && unlink($file['path'])) {
                $size -= $file['size'];
            }
        }
    }

    public function pruneBundles(): void
    {
        VendorDocumentBundle::where('expires_at', '<', now())->chunkById(50, function ($bundles) {
            foreach ($bundles as $bundle) {
                $lock = Cache::lock('vendor-bundle:'.$bundle->id, 900);
                if (! $lock->get()) {
                    continue;
                }
                try {
                    if (preg_match('/^[a-f0-9]{32}\.zip$/D', $bundle->file ?? '')) {
                        $path = $this->directory().'/'.$bundle->file;
                        if (is_file($path)) {
                            unlink($path);
                        }
                    }
                    $bundle->delete();
                } finally {
                    $lock->release();
                }
            }
        });
        foreach (new \DirectoryIterator($this->directory()) as $entry) {
            if ($entry->isFile() && ! $entry->isLink() && preg_match('/^[a-f0-9]{32}\.(part|zip)$/D', $entry->getFilename()) && $entry->getMTime() < time() - 7200) {
                unlink($entry->getPathname());
            }
        }
    }
}
