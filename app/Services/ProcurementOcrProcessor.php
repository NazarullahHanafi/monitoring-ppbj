<?php

namespace App\Services;

use App\Models\Ppbj;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Process;
use ZipArchive;

class ProcurementOcrProcessor
{
    public function __construct(private ProcurementArchiveBridge $archive, private ProcurementSearchWriter $writer) {}

    public function next(): bool
    {
        $source = DB::table('procurement_search_sources')->where('active', true)
            ->whereIn('kind', ['archive_document', 'archive_attachment'])->whereIn('state', ['pending', 'partial', 'failed'])
            ->where('attempts', '<', 3)->where(fn ($q) => $q->whereNull('retry_at')->orWhere('retry_at', '<=', now()))
            ->orderBy('updated_at')->orderBy('id')->first();
        if (! $source) {
            return false;
        }
        $work = storage_path('app/private/procurement-search/work');
        if (! is_dir($work)) {
            mkdir($work, 0700, true);
        }
        $path = $work.'/'.md5($source->id.'|'.$source->fingerprint).'.bin';
        try {
            $input = ['action' => 'file', 'kind' => $source->kind, 'id' => $source->source_key,
                'destination' => $path, 'max_bytes' => config('procurement_search.max_bytes')];
            // Always revalidate archive access/version, even when a partial PDF is cached.
            $manifest = $this->archive->call(['action' => 'manifest', 'kind' => $source->kind, 'after' => (int) $source->source_key - 1, 'limit' => 1]);
            $entry = $manifest['rows'][0] ?? null;
            if (! $entry || $entry['key'] !== $source->source_key || ! $entry['active']) {
                DB::table('procurement_search_sources')->where('id', $source->id)->where('fingerprint', $source->fingerprint)->update(['active' => false, 'content' => null]);

                return true;
            }
            $metadata = implode(' ', [$entry['label'], $entry['reference'], $entry['pr'], $entry['metadata']]);
            if (! hash_equals($source->fingerprint, hash('sha256', $metadata.'|'.$entry['version']))) {
                throw new \RuntimeException('source_changed');
            }
            if (! is_file($path)) {
                $file = $this->archive->call($input);
                DB::table('procurement_search_sources')->where('id', $source->id)->update(['checksum' => $file['checksum']]);
            } elseif ($source->checksum && ! hash_equals($source->checksum, hash_file('sha256', $path))) {
                unlink($path);
                throw new \RuntimeException('checksum');
            }
            // Identical bytes are OCR'd once, even if referenced by several archive packages.
            $checksum = hash_file('sha256', $path);
            $duplicate = (int) $source->page === 0 ? DB::table('procurement_search_sources')->where('checksum', $checksum)->where('active', true)
                ->where('state', 'ready')->where('id', '!=', $source->id)->first(['content', 'pages', 'reading_engine', 'reading_confidence']) : null;
            if ($duplicate) {
                $result = ['text' => $duplicate->content ?? '', 'page' => $duplicate->pages ?: 1, 'pages' => $duplicate->pages ?: 1, 'done' => true,
                    'engine' => $duplicate->reading_engine, 'confidence' => $duplicate->reading_confidence];
                $this->writer->append($source, $result);
                $this->linkReferences($source, $result['text']);
                @unlink($path);

                return true;
            }
            $extension = $entry['extension'];
            if (in_array($extension, ['jpg', 'jpeg', 'png'], true)) {
                $size = @getimagesize($path);
                if (! $size || $size[0] * $size[1] > 25000000) {
                    throw new \RuntimeException('image_dimensions');
                }
            }
            if (in_array($extension, ['pdf', 'jpg', 'jpeg', 'png'], true)) {
                $result = $this->read($path, $extension, (int) $source->page + 1);
            } elseif (in_array($extension, ['txt', 'csv', 'docx', 'xlsx', 'pptx'], true)) {
                $result = ['text' => $this->officeText($path, $extension), 'page' => 1, 'pages' => 1, 'done' => true, 'engine' => 'office-text'];
            } else {
                DB::table('procurement_search_sources')->where('id', $source->id)->update(['state' => 'unsupported', 'error' => 'Format perlu dikonversi ke PDF/foto agar isinya bisa dibaca.', 'updated_at' => now()]);

                return true;
            }
            $this->writer->append($source, $result);
            if (! isset($result['confidence']) || $result['confidence'] >= 55) {
                $this->linkReferences($source, $result['text']);
            }
            if ($result['done'] ?? true) {
                @unlink($path);
            }
        } catch (\Throwable $error) {
            Log::warning('Private procurement OCR pass deferred.', ['source_id' => $source->id, 'error_type' => get_class($error)]);
            @unlink($path);
            DB::table('procurement_search_sources')->where('id', $source->id)->where('fingerprint', $source->fingerprint)->update([
                'state' => 'failed', 'attempts' => $source->attempts + 1, 'error' => 'Pembacaan belum selesai; sistem mencoba ulang terbatas.',
                'retry_at' => now()->addMinutes(5 * ($source->attempts + 1)), 'updated_at' => now(),
            ]);
        } finally {
            // Bounded private cache: older partial PDFs can be downloaded again safely.
            $files = glob($work.'/*.bin') ?: [];
            usort($files, fn ($a, $b) => filemtime($b) <=> filemtime($a));
            $bytes = 0;
            foreach ($files as $index => $file) {
                $bytes += filesize($file);
                if ($index >= 8 || $bytes > 100 * 1024 * 1024) {
                    @unlink($file);
                }
            }
        }

        return true;
    }

    public function linkReferences(object $source, string $text): void
    {
        // Explicit, existing PR numbers only. Never create a PR or guess fuzzy OCR references.
        $numbers = Cache::remember('procurement-search:known-prs', 300, fn () => Ppbj::pluck('ppbj_no', 'id')->all());
        $text = mb_strtoupper(mb_substr($text, 0, config('procurement_search.max_text')));
        $links = [];
        foreach ($numbers as $id => $number) {
            $normal = preg_replace('/[^A-Z0-9]/', '', strtoupper($number));
            if (strlen($normal) < 8 || ! preg_match('/[A-Z]/', $normal)) {
                continue;
            }
            // Separators may vary in a scan, but letters/numbers must have real boundaries.
            $parts = preg_split('/[^A-Z0-9]+/', strtoupper($number), -1, PREG_SPLIT_NO_EMPTY);
            $pattern = '/(?<![A-Z0-9])'.implode('[\s\/._-]*', array_map(fn ($part) => preg_quote($part, '/'), $parts)).'(?![A-Z0-9])/';
            if (! preg_match($pattern, $text)) {
                continue;
            }
            $links[] = ['source_id' => $source->id, 'ppbj_id' => (int) $id, 'inferred' => true];
        }
        if (! $links) {
            return;
        }
        DB::transaction(function () use ($source, $links) {
            $current = DB::table('procurement_search_sources')->where('id', $source->id)->lockForUpdate()->first();
            if ($current && $current->active && $current->fingerprint === $source->fingerprint) {
                DB::table('procurement_search_links')->insertOrIgnore($links);
            }
        });
    }

    public function read(string $file, string $extension, int $start = 1): array
    {
        $environment = array_replace(\App\Support\IsolatedProcessEnvironment::make(), ['OMP_THREAD_LIMIT' => '1', 'RAYON_NUM_THREADS' => '1']);
        $process = new Process([config('procurement_search.node'), '--max-old-space-size=384', base_path('tools/procurement-ocr/read.cjs')], base_path(), $environment);
        $process->setInput(json_encode(['file' => $file, 'root' => dirname($file), 'extension' => $extension,
            'start' => $start, 'count' => config('procurement_search.pages_per_pass'), 'languages' => config('procurement_search.languages')], JSON_THROW_ON_ERROR));
        $process->setTimeout(config('procurement_search.process_timeout'));
        $process->start();
        try {
            while ($process->isRunning()) {
                $process->checkTimeout();
                if (PHP_OS_FAMILY === 'Linux') {
                    $status = @file_get_contents('/proc/'.$process->getPid().'/status');
                    if ($status && preg_match('/^VmRSS:\s+(\d+)\s+kB/m', $status, $match) && (int) $match[1] > (int) config('procurement_search.max_rss_mb') * 1024) {
                        throw new \RuntimeException('ocr_memory_budget');
                    }
                }
                usleep(200000);
            }
        } finally {
            // Timeouts and memory failures must never leave a CPU-consuming child alive.
            if ($process->isRunning()) {
                $process->stop(1);
            }
        }
        if (! $process->isSuccessful()) {
            throw new \Symfony\Component\Process\Exception\ProcessFailedException($process);
        }
        $result = json_decode($process->getOutput(), true, flags: JSON_THROW_ON_ERROR);
        if (! is_array($result) || ! is_string($result['text'] ?? null) || ! isset($result['page'], $result['pages'], $result['done'])) {
            throw new \RuntimeException('invalid_ocr_result');
        }

        return $result;
    }

    private function officeText(string $path, string $extension): string
    {
        if (in_array($extension, ['txt', 'csv'], true)) {
            return mb_convert_encoding(file_get_contents($path, false, null, 0, 400000), 'UTF-8', 'UTF-8,ISO-8859-1');
        }
        $zip = new ZipArchive;
        if ($zip->open($path) !== true) {
            throw new \RuntimeException('invalid_office');
        }
        $text = '';
        $bytes = 0;
        try {
            for ($i = 0; $i < min($zip->numFiles, 1000); $i++) {
                $info = $zip->statIndex($i);
                if (! preg_match('#^(word/(document|header\d+|footer\d+)\.xml|xl/(sharedStrings|worksheets/sheet\d+)\.xml|ppt/slides/slide\d+\.xml)$#', $info['name'])) {
                    continue;
                }
                $bytes += $info['size'];
                if ($bytes > 8 * 1024 * 1024) {
                    throw new \RuntimeException('office_limit');
                }
                $xml = $zip->getFromIndex($i);
                $text .= ' '.html_entity_decode(strip_tags(str_replace('><', '> <', $xml)), ENT_QUOTES | ENT_XML1, 'UTF-8');
                if (mb_strlen($text) > config('procurement_search.max_text')) {
                    break;
                }
            }
        } finally {
            $zip->close();
        }

        return mb_substr($text, 0, config('procurement_search.max_text'));
    }
}
