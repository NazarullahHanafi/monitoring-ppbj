<?php

namespace Tests\Feature;

use App\Models\ProcurementDetailAttachment;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use App\Support\ProcurementDocumentSearch;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\Processors\Processor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Tests\TestCase;

class AttachmentHintReadBudgetTest extends TestCase
{
    use RefreshDatabase;

    private User $actor;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actor = User::factory()->create(['department' => 'umum', 'role' => 'viewer']);
    }

    private function document(string $kind, int $sequence): Sp|Spph
    {
        $class = $kind === 'sp' ? Sp::class : Spph::class;

        return $class::create([$kind === 'sp' ? 'nomor_sp' : 'nomor_spph' => 'HINT/'.$sequence, 'sequence_number' => $sequence,
            $kind === 'sp' ? 'tanggal_sp' : 'tanggal' => '2026-11-19', 'pic' => 'Penguji', 'nama_vendor' => 'Vendor', 'deskripsi_pengadaan' => 'Pengadaan']);
    }

    private function attachment(string $kind, ?int $document, string $name, string $text, array $extra = []): ProcurementDetailAttachment
    {
        return ProcurementDetailAttachment::create($extra + ['id' => (string) Str::uuid(), 'kind' => $kind, 'document_id' => $document,
            'uploaded_by' => $this->actor->id, 'original_name' => $name, 'reviewed_text' => $text, 'reviewed_at' => now(),
            'path' => 'synthetic/not-opened.pdf', 'mime' => 'application/pdf', 'size' => 100, 'sha256' => str_repeat('a', 64), 'method' => 'pdf-text']);
    }

    private function hints(Collection $documents, string $term, bool $sp): array
    {
        $connection = DB::connection();
        $original = $connection->getPostProcessor();
        $probe = new class extends Processor
        {
            public array $transfers = [];

            public function processSelect(Builder $query, $results)
            {
                if ($query->from === 'procurement_detail_attachments') {
                    $this->transfers[] = ['rows' => count($results), 'bytes' => array_sum(array_map(fn ($row) => strlen($row->reviewed_text ?? ''), $results))];
                }

                return parent::processSelect($query, $results);
            }
        };
        $connection->setPostProcessor($probe);
        DB::enableQueryLog();
        DB::flushQueryLog();
        try {
            $result = ProcurementDocumentSearch::attachmentHints($documents, $term, $sp);

            return [$result, DB::getQueryLog(), $probe->transfers];
        } finally {
            DB::disableQueryLog();
            $connection->setPostProcessor($original);
        }
    }

    public function test_ten_documents_with_fifty_matching_files_transfer_only_ten_texts_in_one_query(): void
    {
        foreach (['sp', 'spph'] as $kind) {
            $documents = new Collection;
            $text = str_repeat('rincian ', 1000).'sensor suhu';
            foreach (range(1, 10) as $number) {
                $document = $this->document($kind, $number);
                $documents->push($document);
                foreach (range(1, 5) as $file) {
                    $this->attachment($kind, $document->id, 'file-'.$file.'.pdf', $text, ['created_at' => '2026-11-19 08:00:0'.$file]);
                }
            }
            [$hints, $queries, $transfers] = $this->hints($documents, 'sensor', $kind === 'sp');
            $this->assertCount(10, $hints);
            $this->assertSame(['file-1.pdf'], array_values(array_unique(array_column($hints, 'name'))));
            $this->assertCount(1, $queries);
            $this->assertSame([['rows' => 10, 'bytes' => 10 * strlen($text)]], $transfers);
        }
    }

    public function test_earliest_matching_reviewed_file_is_selected_without_crossing_kind_or_page_boundaries(): void
    {
        foreach (['sp', 'spph'] as $kind) {
            ProcurementDetailAttachment::query()->delete();
            $document = $this->document($kind, 11);
            $offPage = $this->document($kind, 12);
            $this->attachment($kind, $document->id, 'old-unrelated.pdf', 'Kursi', ['created_at' => '2026-11-01']);
            $this->attachment($kind, $document->id, 'unreviewed.pdf', 'sensor secret', ['reviewed_at' => null, 'created_at' => '2026-11-02']);
            $this->attachment($kind, $document->id, 'selected.pdf', "Sensor\n\t suhu terkalibrasi", ['created_at' => '2026-11-03']);
            $this->attachment($kind, $document->id, 'later.pdf', 'Sensor cadangan', ['created_at' => '2026-11-04']);
            $this->attachment($kind === 'sp' ? 'spph' : 'sp', $document->id, 'wrong-kind.pdf', 'Sensor', ['created_at' => '2026-10-01']);
            $this->attachment($kind, $offPage->id, 'off-page.pdf', 'Sensor', ['created_at' => '2026-10-01']);
            $this->attachment($kind, null, 'draft.pdf', 'Sensor', ['created_at' => '2026-10-01']);
            [$hints, $queries, $transfers] = $this->hints(new Collection([$document]), 'sensor', $kind === 'sp');
            $this->assertSame([$document->id => ['name' => 'selected.pdf', 'text' => 'Sensor suhu terkalibrasi']], $hints);
            $this->assertCount(1, $queries);
            $this->assertSame(1, $transfers[0]['rows']);
        }
    }

    public function test_equal_creation_times_use_a_stable_id_tiebreaker(): void
    {
        $document = $this->document('sp', 20);
        $this->attachment('sp', $document->id, 'z-last.pdf', 'Sensor kedua', ['id' => 'ffffffff-ffff-4fff-8fff-ffffffffffff', 'created_at' => '2026-11-19 08:00:00']);
        $this->attachment('sp', $document->id, 'a-first.pdf', 'Sensor pertama', ['id' => '00000000-0000-4000-8000-000000000001', 'created_at' => '2026-11-19 08:00:00']);
        [$hints] = $this->hints(new Collection([$document]), 'sensor', true);
        $this->assertSame('a-first.pdf', $hints[$document->id]['name']);
    }

    public function test_deep_unicode_and_literal_tokens_remain_searchable_and_snippets_are_bounded(): void
    {
        $document = $this->document('sp', 30);
        $this->attachment('sp', $document->id, 'unicode.pdf', str_repeat("café 雪\n", 12000).'plastik 100% A_B ! 0 '.str_repeat('akhir ', 30));
        foreach (['plastik', '100%', 'A_B', '!', '0', 'absent plastik'] as $term) {
            [$hints, $queries, $transfers] = $this->hints(new Collection([$document]), $term, true);
            $this->assertStringContainsString($term === 'absent plastik' ? 'plastik' : $term, $hints[$document->id]['text']);
            $this->assertLessThanOrEqual(182, mb_strlen($hints[$document->id]['text']));
            $this->assertTrue(mb_check_encoding($hints[$document->id]['text'], 'UTF-8'));
            $this->assertCount(1, $queries);
            $this->assertSame(1, $transfers[0]['rows']);
        }
        [$hints] = $this->hints(new Collection([$document]), "' OR 1=1 --", true);
        $this->assertSame([], $hints);
        [$hints] = $this->hints(new Collection([$document]), 'not_present', true);
        $this->assertSame([], $hints);
    }

    public function test_review_and_delete_changes_are_visible_without_a_business_cache_and_empty_inputs_do_no_sql(): void
    {
        $document = $this->document('sp', 40);
        $file = $this->attachment('sp', $document->id, 'first.pdf', 'sensor lama', ['created_at' => '2026-11-01']);
        $this->attachment('sp', $document->id, 'second.pdf', 'sensor baru', ['created_at' => '2026-11-02']);
        $page = new Collection([$document]);
        [$hints] = $this->hints($page, 'sensor', true);
        $this->assertSame('first.pdf', $hints[$document->id]['name']);
        $file->update(['reviewed_text' => 'barang lain']);
        [$hints] = $this->hints($page, 'sensor', true);
        $this->assertSame('second.pdf', $hints[$document->id]['name']);
        $file->update(['reviewed_text' => 'sensor kembali']);
        $file->delete();
        [$hints] = $this->hints($page, 'sensor', true);
        $this->assertSame('second.pdf', $hints[$document->id]['name']);
        foreach ([[$page, ''], [new Collection, 'sensor']] as [$documents, $term]) {
            [$hints, $queries] = $this->hints($documents, $term, true);
            $this->assertSame([], $hints);
            $this->assertSame([], $queries);
        }
    }
}
