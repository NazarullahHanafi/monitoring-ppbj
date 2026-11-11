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

    public function next(?int $sourceId = null): bool
    {
        $source = app(ProcurementOcrQueue::class)->next($sourceId);
        if (! $source) {
            return false;
        }
        if ((int) $source->reader_revision < 2) {
            $source->attempts = 0;
        }
        if ($source->attempts >= 3) {
            DB::table('procurement_search_sources')->where('id', $source->id)->where('fingerprint', $source->fingerprint)
                ->update(['attempts' => 0, 'recovery_round' => $source->recovery_round + 1]);
            $source->attempts = 0;
            $source->recovery_round++;
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
            if (($entry['size'] ?? 0) > (int) config('procurement_search.max_bytes')) {
                throw new \RuntimeException('file_size_limit');
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
                ->where('state', 'ready')->where('passages_version', true)->where('id', '!=', $source->id)
                ->where('reader_revision', '>=', 2)
                ->where(fn ($query) => $query->whereNull('reading_engine')->orWhere('reading_engine', '!=', 'office-text')->orWhere('reader_revision', '>=', 3))
                ->first(['id', 'content', 'pages', 'reading_engine', 'reading_confidence', 'reader_revision']) : null;
            if ($duplicate && $this->writer->copy($source, $duplicate)) {
                @unlink($path);

                return true;
            }
            $extension = $entry['extension'];
            // Skip already retained pages while repairing a gap. Empty failed
            // pages get at most two additional attempts; existing text is kept.
            $coverage = app(ProcurementReadingCoverage::class);
            $legacyOffice = $source->reading_engine === 'office-text' && $source->reader_revision < 3;
            $stored = $source->passages_version && ! $legacyOffice ? $coverage->pages($source->id) : collect();
            $cursor = $legacyOffice ? 0 : (int) $source->page;
            foreach ($stored->where('page', '>', $cursor) as $page) {
                if ((int) $page->page !== $cursor + 1 || $coverage->repairable($page)) {
                    break;
                }
                $cursor++;
            }
            if ($cursor !== (int) $source->page) {
                DB::table('procurement_search_sources')->where('id', $source->id)->where('fingerprint', $source->fingerprint)->update(['page' => $cursor]);
                $source->page = $cursor;
            }
            if (! $legacyOffice && $source->pages !== null && $cursor >= (int) $source->pages) {
                $coverage->audit($source->id);

                return true;
            }
            $repair = $stored->firstWhere('page', $cursor + 1);
            if ($repair && $coverage->repairable($repair)) {
                DB::table('procurement_search_passages')->where('source_id', $source->id)->where('page', $repair->page)->increment('repair_attempts');
            }
            if (in_array($extension, ['jpg', 'jpeg', 'png'], true)) {
                $size = @getimagesize($path);
                if (! $size || $size[0] * $size[1] > 25000000) {
                    throw new \RuntimeException('image_dimensions');
                }
            }
            if (in_array($extension, ['pdf', 'jpg', 'jpeg', 'png'], true)) {
                // Difficult files retry one page at a time and reduce raster memory progressively.
                $count = $source->state === 'failed' || $source->attempts > 0 ? 1 : (int) config('procurement_search.pages_per_pass');
                $nextStored = $stored->first(fn ($page) => $page->page > $cursor + 1 && ! $coverage->repairable($page));
                if ($repair) {
                    $count = 1;
                }
                if ($nextStored) {
                    $count = min($count, (int) $nextStored->page - $cursor - 1);
                }
                if ($source->priority_until && now()->lt($source->priority_until) && (int) $source->page < (int) $source->priority_pages) {
                    $count = min($count, (int) $source->priority_pages - (int) $source->page);
                }
                $pixels = $source->attempts > 1 ? 2000000 : ($source->state === 'failed' ? 3000000 : (int) config('procurement_search.max_pixels'));
                $result = $this->read($path, $extension, (int) $source->page + 1, $count, $pixels);
            } elseif (in_array($extension, ['txt', 'csv', 'docx', 'xlsx', 'pptx'], true)) {
                $office = $this->officeText($path, $extension);
                $parts = $this->officeParts($office['text']);
                if (! $parts) {
                    $parts = [''];
                }
                $start = (int) $source->page + 1;
                $part = $parts[$start - 1] ?? '';
                $result = ['text' => $part, 'page' => $start, 'pages' => count($parts), 'done' => $start >= count($parts), 'engine' => 'office-text', 'unreadable' => $office['embedded_images'] ? 1 : 0,
                    'passages' => [['page' => $start, 'text' => $part, 'engine' => 'office-text', 'error' => $office['embedded_images'] ? 'office_images' : null]]];
            } else {
                DB::table('procurement_search_sources')->where('id', $source->id)->update(['state' => 'unsupported', 'error' => 'Format perlu dikonversi ke PDF/foto agar isinya bisa dibaca.', 'updated_at' => now()]);

                return true;
            }
            if ((($repair && (int) $repair->bytes > 0) || ($legacyOffice && trim($source->content ?? '') !== ''))
                && trim($result['text'] ?? '') === '') {
                // An empty reread cannot erase retained legacy text. Keep its
                // review marker and use the existing bounded failure handling.
                throw new \RuntimeException('legacy_empty_reread');
            }
            $this->writer->append($source, $result);
            if (! isset($result['confidence']) || $result['confidence'] >= 55) {
                $this->linkReferences($source, $result['text']);
            }
            if ($result['done'] ?? true) {
                @unlink($path);
            }
        } catch (\Throwable $error) {
            if ($error instanceof \App\Exceptions\ProcurementReadFailure && $error->pages !== null) {
                $source->pages = $error->pages;
            }
            $reason = $this->failureReason($error);
            Log::warning('Private procurement OCR pass deferred.', ['source_id' => $source->id, 'error_type' => get_class($error), 'reason' => $reason]);
            @unlink($path);
            if ($source->attempts >= 2 && $source->pages && (int) $source->page < (int) $source->pages
                && in_array($reason, ['memory', 'timeout', 'resource_limit'], true)) {
                $page = (int) $source->page + 1;
                $this->writer->append($source, ['text' => '', 'page' => $page, 'pages' => (int) $source->pages,
                    'done' => $page >= (int) $source->pages, 'unreadable' => 1, 'confidence' => 0,
                    'passages' => [['page' => $page, 'text' => '', 'confidence' => 0, 'engine' => 'pdfjs-6-tesseract-7', 'error' => $reason]]]);

                return true;
            }
            $permanent = in_array($reason, ['protected_pdf', 'invalid_pdf', 'page_text_limit', 'page_limit', 'file_size_limit', 'image_dimensions', 'unsupported_format', 'office_limit'], true);
            $message = match ($reason) {
                'protected_pdf' => 'PDF terkunci; unggah salinan yang dapat dibaca.',
                'invalid_pdf' => 'Struktur PDF rusak; periksa atau unggah ulang file asli.',
                'page_text_limit', 'page_limit', 'file_size_limit', 'image_dimensions' => 'Ukuran halaman/file melampaui batas aman; pecah atau optimalkan file agar seluruh isi dapat dibaca.',
                'memory', 'timeout', 'resource_limit' => 'Pembacaan berat; sistem mencoba ulang satu halaman dengan raster lebih ringan.',
                'office_limit' => 'Dokumen teks/Office melampaui batas ekstraksi aman. Isi belum dinyatakan lengkap; pecah atau konversi file untuk pemeriksaan.',
                default => 'Pembacaan belum selesai; sistem mencoba ulang terbatas.',
            };
            DB::table('procurement_search_sources')->where('id', $source->id)->where('fingerprint', $source->fingerprint)->update([
                'state' => $permanent ? 'unsupported' : 'failed', 'attempts' => $source->attempts + 1, 'reader_revision' => 2, 'pages' => $source->pages, 'error' => $message,
                'retry_at' => now()->addMinutes(5 * ($source->attempts + 1)), 'updated_at' => now(),
                'failure_code' => $reason, 'coverage_state' => 'review', 'coverage_checked_at' => null,
            ]);
            if (! $permanent && $source->attempts >= 2) {
                DB::table('procurement_search_sources')->where('id', $source->id)->where('fingerprint', $source->fingerprint)
                    ->update(['retry_at' => now()->addDay()]);
            }
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

    public function read(string $file, string $extension, int $start = 1, ?int $count = null, ?int $pixels = null): array
    {
        $environment = array_replace(\App\Support\IsolatedProcessEnvironment::make(), ['OMP_THREAD_LIMIT' => '1', 'RAYON_NUM_THREADS' => '1']);
        $process = new Process([config('procurement_search.node'), '--max-old-space-size=384', base_path('tools/procurement-ocr/read.cjs')], base_path(), $environment);
        $process->setInput(json_encode(['file' => $file, 'root' => dirname($file), 'extension' => $extension,
            'start' => $start, 'count' => $count ?? config('procurement_search.pages_per_pass'), 'max_pixels' => $pixels ?? config('procurement_search.max_pixels'), 'progress' => true, 'languages' => config('procurement_search.languages')], JSON_THROW_ON_ERROR));
        $process->setTimeout(config('procurement_search.process_timeout'));
        $process->start();
        $failure = null;
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
        } catch (\Throwable $error) {
            $failure = $error;
        } finally {
            // Timeouts and memory failures must never leave a CPU-consuming child alive.
            if ($process->isRunning()) {
                $process->stop(1);
            }
        }
        if (! $failure && ! $process->isSuccessful()) {
            $failure = new \Symfony\Component\Process\Exception\ProcessFailedException($process);
        }
        if ($failure) {
            $pages = preg_match('/^OCR_PAGES=(\d{1,4})$/m', $process->getErrorOutput(), $match) && (int) $match[1] >= 1 && (int) $match[1] <= 2000 ? (int) $match[1] : null;
            throw new \App\Exceptions\ProcurementReadFailure($failure, $pages);
        }
        $result = json_decode($process->getOutput(), true, flags: JSON_THROW_ON_ERROR);
        if (! is_array($result) || ! is_string($result['text'] ?? null) || ! isset($result['page'], $result['pages'], $result['done'])) {
            throw new \RuntimeException('invalid_ocr_result');
        }
        if (! is_int($result['page']) || ! is_int($result['pages']) || ! is_bool($result['done'])
            || $result['page'] < $start || $result['page'] > $result['pages'] || $result['pages'] > 2000
            || $result['done'] !== ($result['page'] >= $result['pages']) || ! is_array($result['passages'] ?? null)
            || count($result['passages']) !== $result['page'] - $start + 1) {
            throw new \RuntimeException('invalid_ocr_pages');
        }
        foreach ($result['passages'] as $index => $passage) {
            if (($passage['page'] ?? null) !== $start + $index || ! is_string($passage['text'] ?? null)
                || mb_strlen($passage['text']) > (int) config('procurement_search.max_page_text')) {
                throw new \RuntimeException('invalid_ocr_passage');
            }
        }

        return $result;
    }

    private function failureReason(\Throwable $error): string
    {
        if ($error instanceof \App\Exceptions\ProcurementReadFailure) {
            $error = $error->getPrevious();
        }
        if ($error instanceof \Symfony\Component\Process\Exception\ProcessTimedOutException) {
            return 'timeout';
        }
        if ($error instanceof \Symfony\Component\Process\Exception\ProcessSignaledException) {
            return 'resource_limit';
        }
        if ($error instanceof \Symfony\Component\Process\Exception\ProcessFailedException && $error->getProcess()->hasBeenSignaled()) {
            return 'resource_limit';
        }
        if ($error->getMessage() === 'ocr_memory_budget') {
            return 'memory';
        }
        if (in_array($error->getMessage(), ['image_dimensions', 'page_text_limit', 'file_size_limit', 'office_limit', 'source_changed', 'checksum'], true)) {
            return $error->getMessage();
        }
        if ($error instanceof \Symfony\Component\Process\Exception\ProcessFailedException
            && preg_match('/OCR_PROCESS_FAILED:(protected_pdf|invalid_pdf|page_text_limit|page_limit|image_dimensions|unsupported_format)/', $error->getProcess()->getErrorOutput(), $match)) {
            return $match[1];
        }

        return 'reader_failed';
    }

    private function officeParts(string $text): array
    {
        $limit = (int) config('procurement_search.max_page_text');
        $parts = [];
        $offset = 0;
        $length = mb_strlen($text);
        while ($offset < $length) {
            $part = mb_substr($text, $offset, $limit);
            if ($offset + mb_strlen($part) < $length) {
                $tail = mb_substr($part, -min(256, mb_strlen($part)));
                if (preg_match('/[\s,;\/]+(?=[^\s,;\/]*$)/u', $tail, $match, PREG_OFFSET_CAPTURE)) {
                    $cut = mb_strlen($part) - mb_strlen($tail) + mb_strlen(substr($tail, 0, $match[0][1] + strlen($match[0][0])));
                    if ($cut > 0) {
                        $part = mb_substr($part, 0, $cut);
                    }
                }
            }
            $parts[] = $part;
            $offset += mb_strlen($part);
        }

        return $parts;
    }

    private function officeText(string $path, string $extension): array
    {
        if (in_array($extension, ['txt', 'csv'], true)) {
            if (filesize($path) > 8 * 1024 * 1024) {
                throw new \RuntimeException('office_limit');
            }

            return ['text' => mb_convert_encoding(file_get_contents($path), 'UTF-8', 'UTF-8,ISO-8859-1'), 'embedded_images' => false];
        }
        $zip = new ZipArchive;
        if ($zip->open($path) !== true) {
            throw new \RuntimeException('invalid_office');
        }
        $text = '';
        $bytes = 0;
        $embedded = false;
        try {
            if ($zip->numFiles > 1000) {
                throw new \RuntimeException('office_limit');
            }
            for ($i = 0; $i < min($zip->numFiles, 1000); $i++) {
                $info = $zip->statIndex($i);
                if (preg_match('#^(word|xl|ppt)/media/#', $info['name'])) {
                    $embedded = true;
                }
                if (! preg_match('#^(word/(document|header\d+|footer\d+|footnotes|endnotes|comments)\.xml|xl/(sharedStrings|worksheets/sheet\d+)\.xml|ppt/(slides/slide\d+|notesSlides/notesSlide\d+)\.xml)$#', $info['name'])) {
                    continue;
                }
                $bytes += $info['size'];
                if ($bytes > 8 * 1024 * 1024) {
                    throw new \RuntimeException('office_limit');
                }
                $xml = $zip->getFromIndex($i);
                $text .= ' '.html_entity_decode(strip_tags(str_replace('><', '> <', $xml)), ENT_QUOTES | ENT_XML1, 'UTF-8');
            }
        } finally {
            $zip->close();
        }

        return ['text' => trim($text), 'embedded_images' => $embedded];
    }
}
