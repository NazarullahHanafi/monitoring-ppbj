<?php

namespace App\Services;

use App\Support\ProcurementSearchText;
use Illuminate\Support\Facades\DB;

/** Human corrections publish atomically after a bounded, background index rebuild. */
class ProcurementReadingReviews
{
    public function version(object $source, int $page, ?object $passage): string
    {
        return hash('sha256', $source->fingerprint.'|'.$page.'|'.hash('sha256', $passage?->content ?? ''));
    }

    public function submit(object $source, int $page, string $version, string $text, string $reason, int $user): int
    {
        return DB::transaction(function () use ($source, $page, $version, $text, $reason, $user) {
            $current = DB::table('procurement_search_sources')->where('id', $source->id)->lockForUpdate()->first();
            abort_unless($current && $current->active && $current->fingerprint === $source->fingerprint, 409, 'File sudah berubah. Muat ulang.');
            abort_unless($current->pages && $page <= $current->pages, 422, 'Jumlah halaman harus diketahui sebelum pemeriksaan.');
            $passage = DB::table('procurement_search_passages')->where('source_id', $current->id)->where('page', $page)->first();
            abort_unless(hash_equals($this->version($current, $page, $passage), $version), 409, 'Bacaan sudah berubah. Muat ulang sebelum menyimpan.');
            abort_if(DB::table('procurement_reading_reviews')->where('source_id', $current->id)->where('state', 'pending')->exists(), 409, 'Pemeriksaan sebelumnya sedang disiapkan. Tunggu hingga selesai.');

            return DB::table('procurement_reading_reviews')->insertGetId(['source_id' => $current->id, 'fingerprint' => $current->fingerprint, 'page' => $page, 'before_hash' => hash('sha256', $passage?->content ?? ''), 'previous_text' => $passage?->content,
                'text' => $text, 'summary' => mb_substr($text, 0, config('procurement_search.max_text')), 'reason' => $reason, 'user_id' => $user, 'created_at' => now()]);
        });
    }

    private function terms(int $review, string $text, int $page): void
    {
        foreach (array_chunk(ProcurementSearchText::words($text, $page > 0), 250) as $words) {
            DB::table('procurement_review_terms')->insertOrIgnore(array_map(fn ($term) => ['review_id' => $review, 'term' => $term, 'first_page' => $page], $words));
            DB::table('procurement_review_terms')->where('review_id', $review)->whereIn('term', $words)->where('first_page', '>', $page)->update(['first_page' => $page]);
        }
    }

    public function next(): bool
    {
        return DB::transaction(function () {
            $review = DB::table('procurement_reading_reviews')->where('state', 'pending')->orderBy('id')->lockForUpdate()->first();
            if (! $review) {
                return false;
            }
            $source = DB::table('procurement_search_sources')->where('id', $review->source_id)->lockForUpdate()->first();
            $old = DB::table('procurement_search_passages')->where('source_id', $review->source_id)->where('page', $review->page)->first();
            if (! $source || ! $source->active || $source->fingerprint !== $review->fingerprint || ! hash_equals($review->before_hash, hash('sha256', $old?->content ?? ''))) {
                DB::table('procurement_reading_reviews')->where('id', $review->id)->update(['state' => 'conflict']);
                DB::table('procurement_review_terms')->where('review_id', $review->id)->delete();

                return true;
            }
            if ($review->cursor === 0) {
                $this->terms($review->id, $source->metadata_text ?? '', 0);
                $this->terms($review->id, $review->text, $review->page);
            }
            $pages = DB::table('procurement_search_passages')->where('source_id', $source->id)->where('page', '>', $review->cursor)->orderBy('page')->limit(4)->get(['page', 'content']);
            $summary = $review->summary ?? '';
            foreach ($pages as $page) {
                if ($page->page !== $review->page) {
                    $this->terms($review->id, $page->content, $page->page);
                    $summary = mb_substr($summary."\n".$page->content, 0, config('procurement_search.max_text'));
                }
            }
            if ($pages->count() === 4) {
                DB::table('procurement_reading_reviews')->where('id', $review->id)->update(['cursor' => $pages->last()->page, 'summary' => $summary]);

                return true;
            }
            DB::table('procurement_search_terms')->where('source_id', $source->id)->delete();
            DB::table('procurement_search_terms')->insertUsing(['term', 'source_id', 'first_page'], DB::table('procurement_review_terms')->where('review_id', $review->id)->select('term')->selectRaw('? AS source_id', [$source->id])->addSelect('first_page'));
            DB::table('procurement_search_passages')->upsert([['source_id' => $source->id, 'page' => $review->page, 'content' => $review->text, 'engine' => 'human-review', 'confidence' => null, 'error' => null, 'human_review_id' => $review->id]], ['source_id', 'page'], ['content', 'engine', 'confidence', 'error', 'human_review_id']);
            DB::table('procurement_search_sources')->where('id', $source->id)->update(['content' => $summary, 'coverage_checked_at' => null, 'updated_at' => now()]);
            DB::table('procurement_reading_reviews')->where('id', $review->id)->update(['state' => 'applied', 'applied_at' => now(), 'summary' => null]);
            DB::table('procurement_review_terms')->where('review_id', $review->id)->delete();
            app(ProcurementReadingCoverage::class)->audit($source->id);

            return true;
        });
    }
}
