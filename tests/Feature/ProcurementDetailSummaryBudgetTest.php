<?php

namespace Tests\Feature;

use App\Models\ProcurementDetailAttachment;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use App\Services\ProcurementDetailService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Tests\TestCase;

class ProcurementDetailSummaryBudgetTest extends TestCase
{
    use RefreshDatabase;

    private function document(string $kind, string $description = 'Kebutuhan kantor'): Sp|Spph
    {
        $model = $kind === 'sp' ? Sp::class : Spph::class;
        $number = $model::withTrashed()->count() + 1;

        return $model::create(['sequence_number' => $number, $kind === 'sp' ? 'tanggal_sp' : 'tanggal' => '2026-11-19', $kind === 'sp' ? 'nomor_sp' : 'nomor_spph' => 'SUMMARY/'.$number,
            'nama_vendor' => 'Vendor uji', 'pic' => 'Penguji', 'deskripsi_pengadaan' => $description]);
    }

    private function requirement(Sp|Spph $document, string $state): void
    {
        DB::table('procurement_detail_requirements')->insert(['kind' => ProcurementDetailService::kind($document), 'document_id' => $document->id, 'state' => $state]);
    }

    private function attachment(Sp|Spph $document, bool $reviewed): ProcurementDetailAttachment
    {
        return ProcurementDetailAttachment::create(['id' => (string) Str::uuid(), 'kind' => ProcurementDetailService::kind($document), 'document_id' => $document->id,
            'uploaded_by' => User::factory()->create()->id, 'original_name' => 'rincian.pdf', 'path' => 'synthetic/not-read.pdf',
            'mime' => 'application/pdf', 'size' => 12, 'sha256' => str_repeat('a', 64), 'method' => 'synthetic',
            'reviewed_at' => $reviewed ? now() : null, 'reviewed_text' => $reviewed ? 'Teks besar yang tidak perlu dimuat untuk status' : null]);
    }

    private function summarize(Collection $documents, string $kind): array
    {
        DB::enableQueryLog();
        DB::flushQueryLog();
        $result = app(ProcurementDetailService::class)->summaries($documents, $kind);
        $queries = DB::getQueryLog();
        DB::disableQueryLog();

        return [$result, $queries];
    }

    public function test_known_requirements_and_attachment_counts_need_only_two_reads_without_loading_items(): void
    {
        foreach (['sp', 'spph'] as $kind) {
            $requested = $this->document($kind);
            $deferred = $this->document($kind);
            $ready = $this->document($kind);
            $review = $this->document($kind);
            $this->requirement($requested, 'requested');
            $this->requirement($deferred, 'deferred');
            $this->requirement($ready, 'deferred');
            $this->attachment($ready, true);
            $this->attachment($review, true);
            $this->attachment($review, false);
            foreach ([$requested, $deferred, $ready, $review] as $document) {
                $document->items()->create(['urutan' => 1, 'nama_barang' => str_repeat('Lampiran ', 5000)]);
            }
            [$result, $queries] = $this->summarize(new Collection([$requested, $deferred, $ready, $review]), $kind);
            $this->assertSame(['missing', 'deferred', 'ready', 'review'], array_column($result, 'state'));
            $this->assertCount(2, $queries);
            $this->assertFalse(collect($queries)->contains(fn ($query) => str_contains($query['query'], $kind.'_items')));
            foreach ($queries as $query) {
                $this->assertStringNotContainsString('reviewed_text', $query['query']);
                $this->assertStringNotContainsString('extracted_text', $query['query']);
            }
        }
    }

    public function test_mixed_pages_only_read_items_for_documents_without_counts_or_explicit_requirements(): void
    {
        foreach (['sp', 'spph'] as $kind) {
            $known = $this->document($kind);
            $withFile = $this->document($kind);
            $legacy = $this->document($kind);
            $optional = $this->document($kind);
            $outsidePage = $this->document($kind, 'Lihat lampiran');
            $this->requirement($known, 'deferred');
            $this->attachment($withFile, false);
            $legacy->items()->create(['urutan' => 1, 'nama_barang' => '<p>Rincian barang</p><p>menyusul</p>']);
            $optional->items()->create(['urutan' => 1, 'nama_barang' => 'Kertas A4']);
            [$result, $queries] = $this->summarize(new Collection([$known, $withFile, $legacy, $optional]), $kind);
            $this->assertSame(['deferred', 'review', 'missing', 'optional'], array_column($result, 'state'));
            $this->assertArrayNotHasKey($outsidePage->id, $result);
            $this->assertCount(3, $queries);
            $itemQuery = collect($queries)->first(fn ($query) => str_contains($query['query'], $kind.'_items'));
            $this->assertSame([$legacy->id, $optional->id], array_slice($itemQuery['bindings'], 0, 2));
            $this->assertStringContainsString('in (?, ?)', $itemQuery['query']);
        }
    }

    public function test_legacy_combined_text_and_negations_keep_their_existing_meaning(): void
    {
        foreach (['sp', 'spph'] as $kind) {
            $cases = [['tanpa', 'lampiran', 'optional'], ['lampiran', 'tidak diperlukan terpisah', 'optional'],
                ['<p>Rincian barang</p>', 'akan menyusul', 'missing'], ['Pengadaan', 'as attached', 'missing'],
                ['Tidak perlu lampiran', 'Kertas A4', 'optional']];
            $documents = new Collection;
            foreach ($cases as [$description, $item]) {
                $document = $this->document($kind, $description);
                $document->items()->create(['urutan' => 1, 'nama_barang' => $item]);
                $documents->push($document);
            }
            [$result, $queries] = $this->summarize($documents, $kind);
            $this->assertSame(array_column($cases, 2), array_column($result, 'state'));
            $this->assertCount(3, $queries);
        }
    }

    public function test_summaries_refresh_after_review_delete_and_defer_without_caching_business_state(): void
    {
        foreach (['sp', 'spph'] as $kind) {
            $document = $this->document($kind);
            $documents = new Collection([$document]);
            $attachment = $this->attachment($document, false);
            $this->assertSame('review', $this->summarize($documents, $kind)[0][$document->id]['state']);
            $attachment->update(['reviewed_at' => now()]);
            $this->assertSame('ready', $this->summarize($documents, $kind)[0][$document->id]['state']);
            $attachment->delete();
            [$result, $queries] = $this->summarize($documents, $kind);
            $this->assertSame('optional', $result[$document->id]['state']);
            $this->assertCount(3, $queries);
            $this->requirement($document, 'deferred');
            [$result, $queries] = $this->summarize($documents, $kind);
            $this->assertSame('deferred', $result[$document->id]['state']);
            $this->assertCount(2, $queries);
        }
    }

    public function test_empty_pages_do_no_work_and_status_is_scoped_to_the_document_kind(): void
    {
        [$result, $queries] = $this->summarize(new Collection, 'sp');
        $this->assertSame([], $result);
        $this->assertSame([], $queries);
        $sp = $this->document('sp');
        $spph = $this->document('spph');
        $this->assertSame($sp->id, $spph->id);
        $this->requirement($sp, 'deferred');
        $this->attachment($spph, true);
        $this->assertSame('deferred', $this->summarize(new Collection([$sp]), 'sp')[0][$sp->id]['state']);
        $this->assertSame('ready', $this->summarize(new Collection([$spph]), 'spph')[0][$spph->id]['state']);
    }
}
