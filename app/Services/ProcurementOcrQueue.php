<?php

namespace App\Services;

use App\Models\Ppbj;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

/** One shared worker: two priority turns, then one oldest-work turn. */
class ProcurementOcrQueue
{
    public function eligible()
    {
        return DB::table('procurement_search_sources')->where('active', true)
            ->whereIn('kind', ['archive_document', 'archive_attachment'])->whereIn('state', ['pending', 'partial', 'failed'])
            ->where(fn ($q) => $q->where('attempts', '<', 3)->orWhere('reader_revision', '<', 2)
                ->orWhere(fn ($recovery) => $recovery->where('recovery_round', '<', 3)->where(fn ($reason) => $reason->whereNull('failure_code')->orWhereIn('failure_code', ['memory', 'timeout', 'resource_limit', 'reader_failed', 'source_changed', 'checksum']))))
            ->where(fn ($q) => $q->whereNull('retry_at')->orWhere('retry_at', '<=', now()));
    }

    public function priority($query)
    {
        return $query->where('priority_until', '>', now())->whereColumn('page', '<', 'priority_pages');
    }

    public function next(?int $sourceId = null): ?object
    {
        if ($sourceId !== null) {
            return $this->eligible()->where('id', $sourceId)->first();
        }
        // Called under procurement-search:worker; the turn survives CLI restarts.
        $turn = (int) Cache::get('procurement-search:queue-turn', 0);
        $source = $turn % 3 !== 2 ? $this->priority($this->eligible())->orderBy('page')->orderBy('queued_at')->orderBy('id')->first() : null;
        $source ??= $this->eligible()->orderBy('updated_at')->orderBy('id')->first();
        if ($source) {
            Cache::put('procurement-search:queue-turn', ($turn + 1) % 3, now()->addDay());
        }

        return $source;
    }

    public function requestPriority(Ppbj $pr): array
    {
        $key = 'procurement-search:priority-pr:'.$pr->id;
        if (! Cache::add($key, true, now()->addMinutes(5))) {
            return ['queued' => 0, 'cooldown' => true, 'message' => 'Prioritas PR ini sudah diminta. Tunggu 5 menit sebelum meminta lagi.'];
        }
        try {
            $count = DB::transaction(function () use ($pr) {
                $rows = $this->eligible()->where('verified_at', '>=', now()->subMinutes(config('procurement_search.archive_fresh_minutes')))
                    ->whereIn('id', DB::table('procurement_search_links')->select('source_id')->where('ppbj_id', $pr->id))
                    ->orderBy('page')->orderBy('updated_at')->orderBy('id')->limit(3)->lockForUpdate()->get();
                foreach ($rows as $row) {
                    DB::table('procurement_search_sources')->where('id', $row->id)->update([
                        'priority_until' => now()->addMinutes(15), 'priority_pages' => min(2000, (int) $row->page + 4),
                    ]);
                }

                return $rows->count();
            });
            if (! $count) {
                Cache::forget($key);
            }

            return ['queued' => $count, 'cooldown' => false, 'message' => $count
                ? $count.' lampiran mendapat giliran prioritas selama 15 menit, hingga 4 halaman berikutnya per lampiran. Tidak menambah pekerja OCR; waktu selesai mengikuti antrean dan kondisi file.'
                : 'Belum ada lampiran yang bisa diprioritaskan. File mungkin belum tersinkron, sudah selesai, menunggu percobaan ulang, atau perlu diperiksa.'];
        } catch (\Throwable $error) {
            Cache::forget($key);
            throw $error;
        }
    }
}
