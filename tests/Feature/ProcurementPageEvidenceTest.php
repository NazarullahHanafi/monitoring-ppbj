<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\User;
use App\Services\ProcurementSearchWriter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Tests\TestCase;

class ProcurementPageEvidenceTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($this->user);
    }

    private function source(array $texts, bool $linked = true): int
    {
        $pr = Ppbj::create(['ppbj_no' => 'PR-'.Str::random(12), 'uraian' => 'Lampiran', 'tgl_ppbj' => now()]);
        $writer = app(ProcurementSearchWriter::class);
        $id = $writer->source('archive_attachment', Str::random(), 'Scan penawaran', 'SCAN-REF', 'metadata', '', $linked ? [$pr->id] : [], hash('sha256', Str::random()), true);
        $writer->passages($id, array_map(fn ($text, $key) => ['page' => $key + 1, 'text' => $text, 'engine' => 'pdfjs-6-text', 'confidence' => 90], $texts, array_keys($texts)));
        DB::table('procurement_search_sources')->where('id', $id)->update(['pages' => count($texts), 'page' => count($texts), 'state' => 'ready', 'reading_engine' => 'pdfjs-6-text']);

        return $id;
    }

    private function search(int $source, array $params = [])
    {
        return $this->getJson(route('procurement.search.evidence', ['source' => $source] + $params + ['q' => 'kursi plastik']));
    }

    public function test_all_occurrences_are_found_beyond_the_first_indexed_location(): void
    {
        $id = $this->source(['Kursi plastik untuk kantor', 'Tidak ada kecocokan', 'Kursi plastik model baru']);
        $response = $this->search($id)->assertOk()->assertJsonPath('scanned', 3)->assertJsonPath('index_complete', true)->assertJsonPath('has_more', false);
        $this->assertSame([1, 3], array_column($response->json('rows'), 'page'));
        $this->assertStringEndsWith('#page=3', $response->json('rows.1.url'));
        $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
    }

    public function test_words_cannot_match_across_pages_and_phrase_requires_order_and_repetition(): void
    {
        $id = $this->source(['Kursi', 'plastik', 'Plastik dan kursi', "kursi,\n plastik", 'kursi kursi plastik']);
        $this->assertSame([3, 4, 5], array_column($this->search($id)->assertOk()->json('rows'), 'page'));
        $this->assertSame([4, 5], array_column($this->search($id, ['mode' => 'phrase'])->assertOk()->json('rows'), 'page'));
        $this->assertSame([5], array_column($this->search($id, ['q' => 'kursi kursi plastik', 'mode' => 'phrase'])->assertOk()->json('rows'), 'page'));
    }

    public function test_whole_tokens_do_not_expand_prefixes_synonyms_or_numbers(): void
    {
        $id = $this->source(['plastiknya chair 2025', 'kursi plastik 25', 'kursi plastik 250']);
        $this->assertSame([2], array_column($this->search($id, ['q' => 'plastik 25'])->assertOk()->json('rows'), 'page'));
        $this->search($id, ['q' => 'meja'])->assertOk()->assertJsonCount(0, 'rows');
    }

    public function test_phrase_folds_accents_case_and_punctuation_without_changing_evidence(): void
    {
        $id = $this->source(['CAFÉ — spécial pour procurement']);
        $this->search($id, ['q' => 'cafe special', 'mode' => 'phrase'])->assertOk()->assertJsonCount(1, 'rows')
            ->assertJsonPath('rows.0.snippet', 'CAFÉ — spécial pour procurement');
    }

    public function test_decimal_fraction_and_code_numbers_are_not_silently_split_or_approximated(): void
    {
        $id = $this->source(['plastik 10.5 ukuran 1/2', 'plastik 10 5 ukuran 1 2', 'PR-26/CON/0454']);
        $this->assertSame([1], array_column($this->search($id, ['q' => '10.5 1/2'])->assertOk()->json('rows'), 'page'));
        $this->search($id, ['q' => '1'])->assertOk()->assertJsonCount(1, 'rows')->assertJsonPath('rows.0.page', 2);
        $this->search($id, ['q' => '0454'])->assertOk()->assertJsonCount(1, 'rows')->assertJsonPath('rows.0.page', 3);
        $this->search($id, ['q' => '454'])->assertOk()->assertJsonCount(0, 'rows');
    }

    public function test_human_confirmed_blank_part_is_not_marked_as_an_unreadable_failure(): void
    {
        $id = $this->source(['']);
        DB::table('procurement_search_passages')->where('source_id', $id)->update(['human_review_id' => 5, 'confidence' => null]);
        $this->search($id)->assertOk()->assertJsonCount(0, 'issues')->assertJsonCount(0, 'rows');
    }

    public function test_excerpt_prefers_an_actual_whole_number_instead_of_a_decimal_prefix(): void
    {
        $id = $this->source(['Nilai 5.1 '.str_repeat('jeda ', 80).'Nilai 5 diperlukan']);
        $excerpt = $this->search($id, ['q' => '5'])->assertOk()->json('rows.0.snippet');
        $this->assertStringContainsString('Nilai 5 diperlukan', $excerpt);
        $this->assertStringNotContainsString('5.1', $excerpt);
    }

    public function test_cursor_is_bounded_and_refuses_a_changed_file_or_human_correction(): void
    {
        $id = $this->source(array_fill(0, 25, 'Kursi plastik'));
        $first = $this->search($id)->assertOk()->assertJsonPath('scanned', 20)->assertJsonPath('after', 20)->assertJsonPath('has_more', true);
        $version = $first->json('version');
        $this->search($id, ['after' => 20])->assertUnprocessable();
        $this->search($id, ['q' => 'kursi', 'after' => 20, 'version' => $version])->assertStatus(409);
        $this->search($id, ['mode' => 'phrase', 'after' => 20, 'version' => $version])->assertStatus(409);
        $second = $this->search($id, ['after' => 20, 'version' => $version])->assertOk()->assertJsonPath('scanned', 5)->assertJsonPath('has_more', false);
        $this->assertSame([21, 22, 23, 24, 25], array_column($second->json('rows'), 'page'));
        DB::table('procurement_search_passages')->where('source_id', $id)->where('page', 1)->update(['human_review_id' => 123]);
        $this->search($id, ['after' => 20, 'version' => $version])->assertStatus(409);
        $version = $this->search($id)->assertOk()->json('version');
        DB::table('procurement_search_sources')->where('id', $id)->update(['fingerprint' => hash('sha256', 'replacement')]);
        $this->search($id, ['after' => 20, 'version' => $version])->assertStatus(409);
    }

    public function test_large_pages_use_a_byte_budget_and_oversized_legacy_text_is_explicitly_flagged(): void
    {
        $id = $this->source([str_repeat('a', 900000).' kursi plastik', str_repeat('b', 900000), str_repeat('c', 900000)]);
        $this->search($id)->assertOk()->assertJsonPath('scanned', 2)->assertJsonPath('after', 2)->assertJsonPath('has_more', true)->assertJsonCount(1, 'rows');
        DB::table('procurement_search_passages')->where('source_id', $id)->where('page', 1)->update(['content' => str_repeat('x', 4100000)]);
        $this->search($id)->assertOk()->assertJsonPath('scanned', 0)->assertJsonPath('after', 1)->assertJsonPath('issues.0.page', 1);
    }

    public function test_incomplete_blank_and_low_confidence_pages_are_never_reported_as_fully_read(): void
    {
        $id = $this->source(['kursi plastik', '']);
        DB::table('procurement_search_sources')->where('id', $id)->update(['pages' => 4, 'state' => 'partial']);
        DB::table('procurement_search_passages')->where('source_id', $id)->where('page', 1)->update(['confidence' => 30]);
        $this->search($id)->assertOk()->assertJsonPath('index_complete', false)->assertJsonPath('stored', 2)->assertJsonPath('pages', 4)->assertJsonCount(2, 'issues');
    }

    public function test_office_parts_do_not_claim_to_be_printed_pdf_pages(): void
    {
        $id = $this->source(['kursi plastik']);
        DB::table('procurement_search_sources')->where('id', $id)->update(['reading_engine' => 'office-text']);
        $response = $this->search($id)->assertOk()->assertJsonPath('unit', 'Bagian');
        $this->assertStringNotContainsString('#page=', $response->json('rows.0.url'));
    }

    public function test_unlinked_files_require_superadmin_and_stale_inactive_nonfile_sources_are_hidden(): void
    {
        $id = $this->source(['kursi plastik'], false);
        $this->search($id)->assertNotFound();
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'superadmin']));
        $this->search($id)->assertOk();
        DB::table('procurement_search_sources')->where('id', $id)->update(['verified_at' => now()->subHour()]);
        $this->search($id)->assertNotFound();
        DB::table('procurement_search_sources')->where('id', $id)->update(['verified_at' => now(), 'active' => false]);
        $this->search($id)->assertNotFound();
        DB::table('procurement_search_sources')->where('id', $id)->update(['active' => true, 'kind' => 'ppbj']);
        $this->search($id)->assertNotFound();
    }

    public function test_validation_authorization_and_read_only_mode_do_not_trigger_mutations(): void
    {
        $id = $this->source(['kursi plastik']);
        $writes = [];
        DB::listen(function ($query) use (&$writes) {
            if (preg_match('/^\s*(insert|update|delete|replace|alter|drop)\b/i', $query->sql)) {
                $writes[] = $query->sql;
            }
        });
        $this->search($id, ['q' => '!!!'])->assertUnprocessable();
        $this->search($id, ['q' => implode(' ', array_fill(0, 17, 'kursi'))])->assertUnprocessable();
        $this->search($id, ['version' => 'invalid'])->assertUnprocessable();
        $this->search($id, ['mode' => 'fuzzy'])->assertUnprocessable();
        $this->search($id)->assertOk();
        Cache::put('simonpr:read_only_mode', true);
        $this->search($id)->assertOk();
        Cache::forget('simonpr:read_only_mode');
        $this->assertSame([], $writes);
        $this->actingAs(User::factory()->create(['department' => 'operasional', 'role' => 'user']));
        $this->search($id)->assertForbidden();
        auth()->logout();
        $this->search($id)->assertUnauthorized();
    }

    public function test_deleted_local_documents_are_not_exposed_and_viewers_can_read_current_evidence(): void
    {
        $id = $this->source(['kursi plastik']);
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'viewer']));
        $this->search($id)->assertOk();
        DB::table('procurement_search_sources')->where('id', $id)->update(['kind' => 'local_sp_attachment', 'source_key' => '999999']);
        $this->search($id)->assertNotFound();
    }

    public function test_database_reads_use_the_file_page_index_and_do_not_scan_the_global_ocr_body(): void
    {
        $id = $this->source(array_fill(0, 21, 'kursi plastik'));
        $version = $this->search($id)->assertOk()->json('version');
        DB::enableQueryLog();
        $this->search($id, ['after' => 5, 'version' => $version])->assertOk();
        $queries = collect(DB::getQueryLog())->pluck('query')->filter(fn ($sql) => str_contains($sql, 'procurement_search_passages'));
        DB::disableQueryLog();
        $this->assertCount(3, $queries);
        foreach ($queries as $sql) {
            $this->assertStringContainsString('"source_id" = ?', $sql);
            $this->assertStringNotContainsString('like', strtolower($sql));
        }
        $this->assertTrue($queries->contains(fn ($sql) => str_contains($sql, 'limit 21') && str_contains($sql, '"page" > ?')));
    }
}
