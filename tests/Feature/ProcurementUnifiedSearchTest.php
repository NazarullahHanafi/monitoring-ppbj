<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\ProcurementDetailAttachment;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use App\Services\ProcurementArchiveBridge;
use App\Services\ProcurementOcrProcessor;
use App\Services\ProcurementSearchSync;
use App\Services\ProcurementSearchWriter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Tests\TestCase;

class ProcurementUnifiedSearchTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($this->user);
        Http::preventStrayRequests();
    }

    private function pr(string $number = 'PKB/PR-26/CON/1201'): Ppbj
    {
        return Ppbj::create(['ppbj_no' => $number, 'uraian' => 'Rincian sesuai lampiran', 'tgl_ppbj' => '2026-11-10', 'portofolio' => 'CON', 'buyer' => 'Nazar']);
    }

    private function documents(Ppbj $pr): array
    {
        $sp = Sp::create(['nomor_sp' => 'SP-SEARCH-01', 'sequence_number' => 1, 'numbering_mode' => 'auto', 'nomor_pr' => $pr->ppbj_no, 'tanggal_sp' => '2026-11-10', 'nama_vendor' => 'Vendor A', 'deskripsi_pengadaan' => 'Rincian terlampir', 'pic' => 'Nazar', 'created_by_user_id' => $this->user->id]);
        $sp->ppbjs()->attach($pr->id);
        $sp->items()->create(['urutan' => 1, 'nama_barang' => '<p>Kursi <b>ergonomis</b> kantor</p>', 'satuan' => 'Unit', 'jumlah' => '2']);
        $spph = Spph::create(['nomor_spph' => 'SPPH-SEARCH-01', 'sequence_number' => 1, 'nomor_pr' => $pr->ppbj_no, 'tanggal' => '2026-11-10', 'nama_vendor' => 'Vendor A', 'deskripsi_pengadaan' => 'Permintaan penawaran', 'pic' => 'Nazar', 'created_by_user_id' => $this->user->id]);
        $spph->ppbjs()->attach($pr->id);

        return [$sp, $spph];
    }

    private function archive(Ppbj $pr, array $ids = []): object
    {
        $id = app(ProcurementSearchWriter::class)->source('archive_attachment', '44', 'Scan penawaran.pdf', 'PENAWARAN-44', 'Scan penawaran', '', $ids ?: [$pr->id], hash('sha256', 'archive-v1'), true, true, $pr->ppbj_no);

        return DB::table('procurement_search_sources')->find($id);
    }

    private function search(string $q, array $params = [])
    {
        return $this->getJson(route('procurement.search', ['q' => $q] + $params))->assertOk();
    }

    public function test_deferred_results_preserve_ranking_and_page_boundaries_without_a_count_query(): void
    {
        $writer = app(ProcurementSearchWriter::class);
        for ($i = 1; $i <= 11; $i++) {
            $pr = $this->pr('PR-FAST-'.$i);
            $writer->source('ppbj', 'fast-'.$i, 'Kursi', 'DOC-'.$i, 'kursi plastik', '', [$pr->id], hash('sha256', 'fast-'.$i));
        }
        $expected = $this->search('kursi')->assertJsonPath('total', 11)->json('rows');
        DB::enableQueryLog();
        $first = $this->search('kursi', ['totals' => 'deferred'])->assertJsonPath('total', null)
            ->assertJsonPath('last_page', null)->assertJsonPath('has_more', true)->assertJsonCount(10, 'rows');
        $queries = collect(DB::getQueryLog())->pluck('query')->implode("\n");
        DB::disableQueryLog();
        $this->assertDoesNotMatchRegularExpression('/count\(\*\) as aggregate/i', $queries);
        $this->assertSame(array_column($expected, 'id'), array_column($first->json('rows'), 'id'));
        $second = $this->search('kursi', ['totals' => 'deferred', 'page' => 2])->assertJsonPath('has_more', false)->assertJsonCount(1, 'rows');
        $this->assertNotContains($second->json('rows.0.id'), array_column($first->json('rows'), 'id'));
        $this->search('kursi', ['totals' => 'deferred', 'page' => 3])->assertJsonPath('has_more', false)->assertJsonCount(0, 'rows');
        $this->search('zzzzzzzz', ['totals' => 'deferred'])->assertJsonPath('total', null)->assertJsonPath('has_more', false)->assertJsonCount(0, 'rows');
        Http::assertNothingSent();
    }

    public function test_total_only_counts_unique_live_prs_with_identical_scopes_filters_and_word_modes(): void
    {
        $pr = $this->pr();
        $other = $this->pr('PR-OTHER');
        $other->update(['buyer' => 'Buyer lain']);
        $this->documents($pr);
        app(ProcurementSearchSync::class)->local();
        $writer = app(ProcurementSearchWriter::class);
        $writer->source('archive_attachment', 'fast-shared', 'Scan', 'SCAN-FAST', 'kursi plastik', '', [$pr->id, $other->id], hash('sha256', 'fast-shared'), true);
        $writer->source('archive_attachment', 'fast-second', 'Scan', 'SCAN-TWO', 'kursi ergonomis', '', [$pr->id], hash('sha256', 'fast-second'), true);
        foreach ([['kursi', []], ['kursi', ['scope' => 'archive']], ['kursi plastik', ['match' => 'related']],
            ['kursi plastik', ['match' => 'source']], ['chair', ['lexical' => 'expanded']], ['chair', ['lexical' => 'exact']],
            ['SCAN-FAST', ['match' => 'reference']], ['kursi', ['scope' => 'sp']], ['kursi', ['scope' => 'spph']],
            ['kursi', ['buyer' => 'Nazar']], ['kursi', ['vendor' => 'Vendor A']], ['kursi', ['creator' => 'Unknown']],
            ['kursi', ['exclude' => 'plastik']]] as [$term, $filters]) {
            $full = $this->search($term, $filters)->json('total');
            $this->search($term, $filters + ['totals' => 'only'])->assertJsonPath('total', $full)->assertJsonPath('totals', 'only')->assertJsonMissingPath('rows');
        }
        $this->search('kursi', ['scope' => 'archive', 'totals' => 'only'])->assertJsonPath('total', 2);
        $other->delete();
        DB::table('procurement_search_sources')->where('source_key', 'fast-second')->update(['active' => false]);
        $this->search('kursi', ['scope' => 'archive', 'totals' => 'only'])->assertJsonPath('total', 1);
        DB::table('procurement_search_sources')->where('source_key', 'fast-shared')->update(['verified_at' => now()->subHour()]);
        $this->search('kursi', ['scope' => 'archive', 'totals' => 'only'])->assertJsonPath('total', 0);
    }

    public function test_count_path_never_loads_scores_context_snippets_or_ocr_bodies_and_retains_access_controls(): void
    {
        $pr = $this->pr();
        app(ProcurementSearchWriter::class)->source('ppbj', 'count-light', 'Kursi', 'DOC-LIGHT', 'kursi', '', [$pr->id], hash('sha256', 'light'));
        DB::enableQueryLog();
        $this->search('kursi', ['totals' => 'only'])->assertJsonPath('total', 1)->assertHeader('Cache-Control', 'no-store, private');
        $queries = collect(DB::getQueryLog())->pluck('query')->implode("\n");
        DB::disableQueryLog();
        $this->assertDoesNotMatchRegularExpression('/row_number|relevance_score|token_score|substr\(|procurement_search_passages|metadata_text/i', $queries);
        $this->assertSame(1, preg_match_all('/count\(\*\) as aggregate/i', $queries));
        $this->getJson(route('procurement.search', ['q' => 'kursi', 'totals' => 'unlimited']))->assertUnprocessable();
        $this->actingAs(User::factory()->create(['department' => 'operasional']))->getJson(route('procurement.search', ['q' => 'kursi', 'totals' => 'only']))->assertForbidden();
        auth()->forgetGuards();
        $this->getJson(route('procurement.search', ['q' => 'kursi', 'totals' => 'only']))->assertUnauthorized();
        Http::assertNothingSent();
    }

    public function test_progressive_ocr_hits_keep_search_pagination_separate_from_document_page_locations(): void
    {
        $pr = $this->pr();
        $source = $this->archive($pr);
        $writer = app(ProcurementSearchWriter::class);
        $writer->passages($source->id, [['page' => 8, 'text' => 'kursi plastik', 'engine' => 'native-pdf', 'confidence' => 95]]);
        $this->search('kursi plastik', ['totals' => 'deferred'])->assertJsonPath('page', 1)
            ->assertJsonPath('rows.0.matches.0.match_page', 8)->assertJsonPath('has_more', false)->assertJsonPath('total', null);
    }

    public function test_literal_tokens_rank_before_prefixes_and_equivalents_without_changing_newest_order(): void
    {
        $literal = $this->pr('PR-LITERAL');
        $prefix = $this->pr('PR-PREFIX');
        $synonym = $this->pr('PR-SYNONYM');
        $writer = app(ProcurementSearchWriter::class);
        $writer->source('archive_attachment', 'literal-rank', 'Scan', 'SCAN-L', 'kursi', '', [$literal->id], hash('sha256', 'literal-rank'), true);
        $writer->source('ppbj', 'prefix-rank', 'Prefix', 'DOC-P', 'kursinya', '', [$prefix->id], hash('sha256', 'prefix-rank'));
        $writer->source('ppbj', 'synonym-rank', 'Padanan', 'DOC-S', 'chair', '', [$synonym->id], hash('sha256', 'synonym-rank'));
        $response = $this->search('kursi')->assertJsonPath('total', 3);
        $this->assertSame([$literal->id, $prefix->id, $synonym->id], array_column($response->json('rows'), 'id'));
        $this->assertSame([$synonym->id, $prefix->id, $literal->id], array_column($this->search('kursi', ['sort' => 'newest'])->json('rows'), 'id'));
        $synonym->update(['ppbj_no' => 'KURSI']);
        $this->search('kursi')->assertJsonPath('rows.0.id', $synonym->id)->assertJsonPath('rows.0.relevance.reason', 'Nomor PR persis');
        $this->search('kursi', ['lexical' => 'exact'])->assertJsonPath('total', 1)->assertJsonPath('rows.0.id', $literal->id);
        Http::assertNothingSent();
    }

    public function test_multiple_exact_words_and_the_strongest_source_are_not_hidden_by_many_prefix_matches(): void
    {
        $pr = $this->pr();
        $other = $this->pr('PR-WORD-STRENGTH');
        $writer = app(ProcurementSearchWriter::class);
        for ($i = 0; $i < 8; $i++) {
            $writer->source('ppbj', 'rank-prefix-'.$i, 'Prefix', 'P-'.$i, 'sensornya tekanannya', '', [$pr->id], hash('sha256', 'rank-prefix-'.$i));
        }
        $exact = $writer->source('archive_attachment', 'rank-exact', 'Scan', 'EXACT-SCAN', 'sensor tekanan', '', [$pr->id], hash('sha256', 'rank-exact'), true);
        $writer->source('ppbj', 'rank-partial', 'Partial', 'PARTIAL', 'sensor tekanannya', '', [$other->id], hash('sha256', 'rank-partial'));
        $response = $this->search('sensor tekanan')->assertJsonPath('rows.0.id', $pr->id)->assertJsonPath('rows.0.matches.0.id', $exact);
        $this->assertCount(4, $response->json('rows.0.matches'));
        $this->assertSame($response->json('rows.0.matches.0.id'), $this->search('sensor sensor tekanan')->json('rows.0.matches.0.id'));
    }

    public function test_word_evidence_identifies_real_tokens_and_distinct_pages_and_selects_a_supported_preview(): void
    {
        $pr = $this->pr();
        $writer = app(ProcurementSearchWriter::class);
        $id = $writer->source('archive_attachment', 'word-map', 'Scan', 'SCAN-MAP', '', '', [$pr->id], hash('sha256', 'word-map'), true);
        $writer->passages($id, [['page' => 1, 'text' => 'chair'], ['page' => 5, 'text' => 'sensor baja']]);
        $response = $this->search('kursi sens baja')->assertJsonPath('total', 1)->assertJsonPath('rows.0.matches.0.match_page', 5);
        $hits = collect($response->json('rows.0.matches.0.word_evidence'))->keyBy('word');
        $this->assertSame(['kursi', 'sens', 'baja'], $response->json('rows.0.matches.0.matched_words'));
        $this->assertSame('chair', $hits['kursi']['matched']);
        $this->assertSame('equivalent', $hits['kursi']['type']);
        $this->assertSame(1, $hits['kursi']['page']);
        $this->assertSame('page', $hits['kursi']['location']);
        $this->assertStringEndsWith('#page=1', $hits['kursi']['url']);
        $this->assertSame('prefix', $hits['sens']['type']);
        $this->assertSame('sensor', $hits['sens']['matched']);
        $this->assertSame('exact', $hits['baja']['type']);
        $this->assertSame(5, $hits['baja']['page']);
        $this->assertStringEndsWith('#page=5', $response->json('rows.0.matches.0.url'));
        $this->assertStringContainsString('sensor baja', $response->json('rows.0.matches.0.snippet'));
        $batch = $this->search('kursi sens baja', ['pr' => $pr->id, 'after' => 0]);
        $this->assertSame($response->json('rows.0.matches.0.word_evidence'), $batch->json('rows.0.matches.0.word_evidence'));
        Http::assertNothingSent();
    }

    public function test_exact_token_evidence_takes_precedence_over_an_earlier_equivalent_and_never_fabricates_locations(): void
    {
        $pr = $this->pr();
        $writer = app(ProcurementSearchWriter::class);
        $id = $writer->source('archive_attachment', 'stronger-page', 'Scan', 'SCAN-PAGE', 'kabel', '', [$pr->id], hash('sha256', 'stronger-page'), true);
        $writer->passages($id, [['page' => 1, 'text' => 'chair'], ['page' => 8, 'text' => 'kursi sensor']]);
        $response = $this->search('kursi')->assertJsonPath('rows.0.matches.0.match_page', 8)->assertJsonPath('rows.0.matches.0.word_evidence.0.type', 'exact')->assertJsonPath('rows.0.matches.0.word_evidence.0.page', 8);
        $this->search('kabel')->assertJsonPath('rows.0.matches.0.word_evidence.0.location', 'document')->assertJsonPath('rows.0.matches.0.word_evidence.0.page', null)->assertJsonPath('rows.0.matches.0.word_evidence.0.url', null);
        DB::table('procurement_search_terms')->where('source_id', $id)->where('term', 'sensor')->update(['first_page' => null]);
        $this->search('sensor')->assertJsonPath('rows.0.matches.0.word_evidence.0.location', 'unknown')->assertJsonPath('rows.0.matches.0.word_evidence.0.page', null)->assertJsonPath('rows.0.matches.0.match_page', null);
        $this->search('SCAN-PAGE', ['match' => 'reference'])->assertJsonPath('rows.0.matches.0.word_evidence', [])->assertJsonPath('rows.0.matches.0.match_page', null);
    }

    public function test_initial_letter_typos_outside_synonym_groups_have_opt_in_suggestions(): void
    {
        $pr = $this->pr();
        $source = $this->archive($pr);
        app(ProcurementSearchWriter::class)->append($source, ['text' => 'spektrometer optik', 'page' => 1, 'pages' => 1, 'done' => true]);
        foreach (['xpektrometer', 'pektrometer', 'spketrometer'] as $typo) {
            $response = $this->search($typo, ['scope' => 'archive'])->assertJsonPath('total', 0)->assertJsonPath('query.used', [$typo]);
            $this->assertContains('spektrometer', array_column($response->json('suggestions'), 'replacement'));
        }
        $this->search('xpektrometer 100')->assertJsonPath('suggestions', []);
        $this->search('xpektrometer', ['lexical' => 'exact'])->assertJsonPath('suggestions', []);
        Http::assertNothingSent();
    }

    public function test_suggestions_require_the_corrected_words_to_match_together_in_the_selected_mode(): void
    {
        $pr = $this->pr();
        $other = $this->pr('PR-OTHER-CONTEXT');
        $writer = app(ProcurementSearchWriter::class);
        $writer->source('archive_attachment', 'context-plastic', 'Scan', 'SCAN-P', 'plastik', '', [$pr->id], hash('sha256', 'context-plastic'), true);
        $writer->source('sp', 'context-optic', 'SP', 'SP-O', 'optik', '', [$other->id], hash('sha256', 'context-optic'));
        $this->search('plastikk optik')->assertJsonPath('suggestions', []);
        $this->search('plastikk optik', ['match' => 'related'])->assertJsonPath('suggestions', []);
        $writer->source('sp', 'context-optic', 'SP', 'SP-O', 'optik', '', [$pr->id], hash('sha256', 'context-optic'));
        $this->search('plastikk optik')->assertJsonPath('suggestions', []);
        $response = $this->search('plastikk optik', ['match' => 'related']);
        $this->assertContains('plastik optik', array_column($response->json('suggestions'), 'query'));
        $this->search('plastikk optik', ['match' => 'related', 'scope' => 'archive'])->assertJsonPath('suggestions', []);
        $this->search('plastikk optik', ['match' => 'related', 'buyer' => 'Tidak cocok'])->assertJsonPath('suggestions', []);
    }

    public function test_exclusions_apply_to_whole_prs_with_whole_tokens_and_selected_source_scope(): void
    {
        $pr = $this->pr();
        $safe = $this->pr('PR-SAFE');
        $writer = app(ProcurementSearchWriter::class);
        $writer->source('archive_attachment', 'excluded-chair', 'Kursi', 'SCAN-K', 'kursi', '', [$pr->id], hash('sha256', 'excluded-chair'), true);
        $writer->source('sp', 'excluded-condition', 'Kondisi', 'SP-K', 'bekas', '', [$pr->id], hash('sha256', 'excluded-condition'));
        $writer->source('ppbj', 'excluded-safe', 'Baru', 'PPBJ-SAFE', 'kursi bekasnya', '', [$safe->id], hash('sha256', 'excluded-safe'));
        $this->search('kursi', ['exclude' => 'bekas'])->assertJsonPath('total', 1)->assertJsonPath('rows.0.id', $safe->id)->assertJsonPath('excluded', ['bekas']);
        $this->search('kursi', ['exclude' => 'used'])->assertJsonPath('total', 2); // No synonym expansion for excluded words.
        $this->search('kursi', ['exclude' => 'bekas', 'scope' => 'archive'])->assertJsonPath('total', 1)->assertJsonPath('rows.0.id', $pr->id);
        $this->search('SCAN-K', ['match' => 'reference', 'exclude' => 'bekas'])->assertJsonPath('total', 0);
        $this->search('kursi', ['pr' => $pr->id, 'after' => 0, 'exclude' => 'bekas'])->assertJsonPath('rows', []);
        Http::assertNothingSent();
    }

    public function test_inactive_expired_or_unlinked_sources_do_not_exclude_valid_prs(): void
    {
        $pr = $this->pr();
        $writer = app(ProcurementSearchWriter::class);
        $writer->source('ppbj', 'good-pump', 'Pompa', 'PPBJ-P', 'pompa', '', [$pr->id], hash('sha256', 'good-pump'));
        foreach (['inactive', 'expired', 'unlinked'] as $kind) {
            $id = $writer->source('archive_attachment', 'excluded-'.$kind, 'Scan', 'SCAN-'.$kind, 'bekas', '', [$pr->id], hash('sha256', $kind), true);
            if ($kind === 'inactive') {
                DB::table('procurement_search_sources')->where('id', $id)->update(['active' => false]);
            }
            if ($kind === 'expired') {
                DB::table('procurement_search_sources')->where('id', $id)->update(['verified_at' => now()->subHour()]);
            }
            if ($kind === 'unlinked') {
                DB::table('procurement_search_links')->where('source_id', $id)->delete();
            }
        }
        $this->search('pompa', ['exclude' => 'bekas'])->assertJsonPath('total', 1);
    }

    public function test_suggestions_respect_exclusions_and_invalid_exclusions_fail_before_index_queries(): void
    {
        $pr = $this->pr();
        $writer = app(ProcurementSearchWriter::class);
        $writer->source('ppbj', 'excluded-spelling', 'Pompa', 'PPBJ-S', 'spektrometer bekas', '', [$pr->id], hash('sha256', 'excluded-spelling'));
        $this->search('xpektrometer', ['exclude' => 'bekas'])->assertJsonPath('suggestions', []);
        foreach (['a', '!!!', 'satu dua tiga empat lima'] as $invalid) {
            DB::flushQueryLog();
            DB::enableQueryLog();
            $this->getJson(route('procurement.search', ['q' => 'sensor', 'exclude' => $invalid]))->assertUnprocessable()->assertJsonValidationErrors('exclude');
            $queries = collect(DB::getQueryLog())->pluck('query');
            DB::disableQueryLog();
            $this->assertFalse($queries->contains(fn ($sql) => str_contains($sql, 'procurement_search_')));
        }
        $this->getJson(route('procurement.search', ['q' => 'sensor', 'exclude' => ['bad']]))->assertUnprocessable();
        $this->getJson(route('procurement.search', ['q' => 'sensor', 'exclude' => str_repeat('a', 121)]))->assertUnprocessable();
    }

    public function test_whole_tokens_do_not_expand_prefixes_synonyms_or_drop_unknown_words(): void
    {
        $pr = $this->pr();
        $writer = app(ProcurementSearchWriter::class);
        $writer->source('ppbj', 'precision', 'Komponen', 'DOC-01', 'plastik sensor', '', [$pr->id], hash('sha256', 'precision'));
        $this->search('plast')->assertJsonPath('total', 1);
        $this->search('plast', ['lexical' => 'exact'])->assertJsonPath('total', 0)->assertJsonPath('suggestions', []);
        $this->search('plastik wefwef')->assertJsonPath('total', 1);
        $this->search('plastik wefwef', ['lexical' => 'exact'])->assertJsonPath('total', 0)->assertJsonPath('query.strict', true);
        $this->search('sensor plastik', ['lexical' => 'exact'])->assertJsonPath('total', 1)->assertJsonPath('lexical', 'exact')->assertJsonPath('equivalents', []);
        $writer->source('sp', 'synonym', 'Kursi', 'DOC-02', 'kursi', '', [$pr->id], hash('sha256', 'synonym'));
        $this->search('chair')->assertJsonPath('total', 1);
        $this->search('chair', ['lexical' => 'exact'])->assertJsonPath('total', 0);
        Http::assertNothingSent();
    }

    public function test_whole_tokens_apply_to_cross_document_evidence_and_page_positions(): void
    {
        $pr = $this->pr();
        $writer = app(ProcurementSearchWriter::class);
        $first = $writer->source('archive_attachment', 'exact-pages', 'Scan', 'SCAN-1', '', '', [$pr->id], hash('sha256', 'exact-pages'), true);
        $writer->passages($first, [['page' => 1, 'text' => 'sensorium'], ['page' => 2, 'text' => 'sensor']]);
        $second = $writer->source('sp', 'exact-related', 'Dokumen', 'SP-01', 'kalibrasi', '', [$pr->id], hash('sha256', 'exact-related'));
        $this->search('sensor', ['lexical' => 'exact', 'scope' => 'archive'])->assertJsonPath('rows.0.matches.0.match_page', 2);
        $response = $this->search('sensor kalibrasi', ['match' => 'related', 'lexical' => 'exact'])->assertJsonPath('total', 1);
        $matches = collect($response->json('rows.0.matches'))->keyBy('id');
        $this->assertSame(['sensor'], $matches[$first]['matched_words']);
        $this->assertSame(['kalibrasi'], $matches[$second]['matched_words']);
        $this->search('sens kalibrasi', ['match' => 'related', 'lexical' => 'exact'])->assertJsonPath('total', 0);
    }

    public function test_reference_lookup_is_whole_literal_scoped_and_never_invents_a_page_hit(): void
    {
        $pr = $this->pr();
        $writer = app(ProcurementSearchWriter::class);
        $reference = 'RFQ/26_%!\\015';
        $id = $writer->source('archive_attachment', 'literal-ref', 'Scan', $reference, 'Dokumen penawaran', '', [$pr->id], hash('sha256', 'literal-ref'), true);
        $writer->passages($id, [['page' => 7, 'text' => 'RFQ 26 isi tidak membuktikan nomor di halaman ini']]);
        $writer->source('ppbj', 'other-ref', 'Nomor lain', 'RFQ/26XA!\\015', $reference, '', [$pr->id], hash('sha256', 'other-ref'));
        $this->search(strtolower($reference), ['match' => 'reference'])->assertJsonPath('total', 1)->assertJsonCount(1, 'rows.0.matches')
            ->assertJsonPath('rows.0.matches.0.id', $id)->assertJsonPath('rows.0.matches.0.match_page', null)->assertJsonPath('lexical', 'exact')->assertJsonPath('suggestions', []);
        $response = $this->search($reference, ['match' => 'reference', 'scope' => 'archive']);
        $this->assertStringNotContainsString('#page=', $response->json('rows.0.matches.0.url'));
        $this->search('RFQ/26', ['match' => 'reference'])->assertJsonPath('total', 0);
        $this->search($reference, ['match' => 'reference', 'scope' => 'sp'])->assertJsonPath('total', 0);
        DB::table('procurement_search_sources')->where('id', $id)->update(['verified_at' => now()->subHour()]);
        $this->search($reference, ['match' => 'reference'])->assertJsonPath('total', 0);
        Http::assertNothingSent();
    }

    public function test_evidence_cursor_reaches_all_sources_with_bounded_payloads_and_live_filters(): void
    {
        $pr = $this->pr();
        $other = $this->pr('OTHER-PR');
        $writer = app(ProcurementSearchWriter::class);
        $ids = [];
        for ($i = 0; $i < 21; $i++) {
            $ids[] = $writer->source('archive_attachment', 'evidence-'.$i, 'Scan '.$i, 'SCAN-'.$i, 'plastik', '', [$pr->id], hash('sha256', 'evidence-'.$i), true);
        }
        $writer->source('archive_attachment', 'evidence-other', 'Other', 'OTHER', 'plastik', '', [$other->id], hash('sha256', 'evidence-other'), true);
        $this->search('plastik', ['pr' => $pr->id, 'after' => 0, 'buyer' => 'Tidak cocok'])->assertJsonPath('total', 0);
        $main = $this->search('plastik', ['buyer' => 'Nazar'])->json('rows');
        $main = collect($main)->firstWhere('id', $pr->id);
        $this->assertCount(4, $main['matches']);
        $this->assertTrue($main['evidence']['has_more']);
        $cursor = 0;
        $found = [];
        do {
            $response = $this->search('plastik', ['pr' => $pr->id, 'after' => $cursor, 'buyer' => 'Nazar'])->assertJsonCount(1, 'rows')->assertJsonPath('rows.0.context', null)->assertJsonPath('suggestions', []);
            $row = $response->json('rows.0');
            $this->assertLessThanOrEqual(8, count($row['matches']));
            foreach ($row['matches'] as $source) {
                $this->assertGreaterThan($cursor, $source['id']);
                $found[] = $source['id'];
            }
            $this->assertGreaterThan($cursor, $row['evidence']['after']);
            $cursor = $row['evidence']['after'];
        } while ($row['evidence']['has_more']);
        $this->assertSame($ids, $found);
        $this->search('plastik', ['pr' => $pr->id, 'after' => $cursor])->assertJsonPath('rows.0.matches', [])->assertJsonPath('rows.0.evidence.after', $cursor)->assertJsonPath('rows.0.evidence.has_more', false);
        $pr->delete();
        $this->search('plastik', ['pr' => $pr->id, 'after' => 0])->assertJsonPath('rows', []);
        Http::assertNothingSent();
    }

    public function test_evidence_cursor_does_not_skip_sources_after_earlier_rows_are_removed(): void
    {
        $pr = $this->pr();
        $writer = app(ProcurementSearchWriter::class);
        $ids = [];
        for ($i = 0; $i < 12; $i++) {
            $ids[] = $writer->source('archive_document', 'cursor-'.$i, 'Scan', 'CURSOR-'.$i, 'sensor', '', [$pr->id], hash('sha256', 'cursor-'.$i), true);
        }
        $first = $this->search('sensor', ['pr' => $pr->id, 'after' => 0])->json('rows.0');
        DB::table('procurement_search_sources')->whereIn('id', array_slice($ids, 0, 3))->delete();
        DB::table('procurement_search_sources')->where('id', $ids[9])->update(['verified_at' => now()->subHour()]);
        DB::table('procurement_search_sources')->where('id', $ids[10])->update(['active' => false]);
        DB::table('procurement_search_links')->where('source_id', $ids[11])->delete();
        $next = $this->search('sensor', ['pr' => $pr->id, 'after' => $first['evidence']['after']])->assertJsonPath('rows.0.evidence.has_more', false);
        $this->assertSame([$ids[8]], array_column($next->json('rows.0.matches'), 'id'));
    }

    public function test_precision_and_evidence_options_reject_invalid_requests(): void
    {
        foreach ([['lexical' => 'ai'], ['pr' => 0], ['pr' => 'x'], ['after' => 0], ['pr' => 1, 'after' => -1], ['pr' => 1, 'after' => 'x']] as $params) {
            $this->getJson(route('procurement.search', ['q' => 'sensor'] + $params))->assertUnprocessable();
        }
    }

    public function test_one_pr_search_connects_all_three_lists_and_preserves_native_exports(): void
    {
        $pr = $this->pr();
        [$sp, $spph] = $this->documents($pr);
        app(ProcurementSearchSync::class)->local();
        $this->search('ergonomis kursi')->assertJsonPath('total', 1)->assertJsonPath('rows.0.number', $pr->ppbj_no)->assertJsonPath('rows.0.matches.0.kind', 'sp');
        $this->search('ergonom', ['scope' => 'sp'])->assertJsonPath('total', 1);
        $this->search('ergonomis', ['scope' => 'archive'])->assertJsonPath('total', 0);
        foreach (['ppbj' => ['ppbj', $pr->id], 'sp' => ['sps', $sp->id], 'spph' => ['spphs', $spph->id]] as $kind => [$viewKey, $id]) {
            $response = $this->get(route($kind.'.index', ['search' => 'ergonomis']))->assertOk();
            $this->assertSame([$id], $response->viewData($viewKey)->pluck('id')->all());
            $response->assertSee('procurementUnifiedSearch');
            $html = new \DOMDocument;
            @$html->loadHTML($response->getContent());
            $query = (new \DOMXPath($html))->query('//input[@data-pus-query]');
            $this->assertSame(1, $query->length);
            $this->assertSame('', $query->item(0)->getAttribute('value'), 'Filter tabel tidak boleh mengisi pencarian terpadu.');
        }
        foreach (['sp', 'spph'] as $kind) {
            $csv = $this->get(route($kind.'.export', ['search' => 'ergonomis']))->assertOk()->streamedContent();
            $this->assertStringContainsString($kind === 'sp' ? $sp->nomor_sp : $spph->nomor_spph, $csv);
        }
        Http::assertNothingSent();
    }

    public function test_relevance_prioritizes_exact_pr_numbers_and_recorded_links_with_newest_still_available(): void
    {
        $old = $this->pr('PR-RELEVANCE-1');
        $inferred = $this->pr('PR-RELEVANCE-2');
        $new = $this->pr('PR-RELEVANCE-3');
        $writer = app(ProcurementSearchWriter::class);
        $writer->source('ppbj', 'rank-old', 'Sensor', $old->ppbj_no, 'sensor', '', [$old->id], hash('sha256', 'rank-old'));
        foreach ([$inferred, $new] as $pr) {
            $id = $writer->source('archive_attachment', 'rank-'.$pr->id, 'Sensor.pdf', 'SCAN-'.$pr->id, 'sensor', '', [$pr->id], hash('sha256', 'rank-'.$pr->id), true);
            DB::table('procurement_search_sources')->where('id', $id)->update(['state' => 'ready', 'reading_confidence' => 94]);
            if ($pr->id === $inferred->id) {
                DB::table('procurement_search_links')->where('source_id', $id)->update(['inferred' => true]);
            }
        }
        $this->search('sensor')->assertJsonPath('rows.0.id', $old->id)->assertJsonPath('rows.1.id', $new->id)->assertJsonPath('rows.2.id', $inferred->id);
        $this->search('sensor', ['sort' => 'newest'])->assertJsonPath('rows.0.id', $new->id)->assertJsonPath('sort', 'newest');
        $inferred->update(['ppbj_no' => 'SENSOR']);
        $this->search('sensor')->assertJsonPath('rows.0.id', $inferred->id)->assertJsonPath('rows.0.relevance.reason', 'Nomor PR persis');
    }

    public function test_pathological_short_letter_queries_are_rejected_before_any_search_table_query(): void
    {
        DB::enableQueryLog();
        foreach ([['q' => 'a b c d e f g h'], ['q' => 'sensor x', 'match' => 'related'], ['q' => 'sensor pompa pipa baja plastik meja kursi kantor kertas', 'match' => 'related']] as $input) {
            $this->getJson(route('procurement.search', $input))->assertUnprocessable()->assertJsonValidationErrors('q');
        }
        $queries = collect(DB::getQueryLog())->pluck('query');
        DB::disableQueryLog();
        $this->assertCount(0, $queries->filter(fn ($sql) => str_contains($sql, 'procurement_search')));
        $this->search('sensor 2')->assertJsonPath('total', 0);
    }

    public function test_related_mode_combines_evidence_only_within_the_same_live_pr_and_keeps_word_provenance(): void
    {
        $first = $this->pr('PR-CROSS-1');
        $second = $this->pr('PR-CROSS-2');
        $third = $this->pr('PR-CROSS-3');
        $writer = app(ProcurementSearchWriter::class);
        $source = $this->archive($first);
        $writer->append($source, ['text' => 'sensor', 'page' => 1, 'pages' => 1, 'done' => true]);
        $writer->source('sp', 'cross-cal', 'Kalibrasi', 'SP-CROSS', 'kalibrasi', '', [$first->id], hash('sha256', 'cross-cal'));
        $writer->source('ppbj', 'cross-other-sensor', 'Sensor', $second->ppbj_no, 'sensor', '', [$second->id], hash('sha256', 'cross-other-sensor'));
        $writer->source('archive_document', 'cross-other-cal', 'Kalibrasi', $third->ppbj_no, 'kalibrasi', '', [$third->id], hash('sha256', 'cross-other-cal'), true);
        $this->search('sensor kalibrasi')->assertJsonPath('total', 0)->assertJsonPath('suggestions', []);
        DB::enableQueryLog();
        $response = $this->search('sensor kalibrasi', ['match' => 'related'])->assertJsonPath('total', 1)->assertJsonPath('rows.0.id', $first->id)->assertJsonPath('match', 'related');
        $queries = collect(DB::getQueryLog())->pluck('query');
        DB::disableQueryLog();
        $this->assertCount(0, $queries->filter(fn ($sql) => preg_match('/^\s*(insert|update|delete)\b/i', $sql)));
        $this->assertCount(2, $response->json('rows.0.matches'));
        $evidence = collect($response->json('rows.0.matches'))->keyBy('kind');
        $this->assertSame(['sensor'], $evidence['archive_attachment']['matched_words']);
        $this->assertSame(['kalibrasi'], $evidence['sp']['matched_words']);
        $this->search('sensor kalibrasi', ['match' => 'related', 'scope' => 'archive'])->assertJsonPath('total', 0);
        $this->search('sensor kalibrasi', ['match' => 'related', 'buyer' => 'Other buyer'])->assertJsonPath('total', 0);
        DB::table('procurement_search_sources')->where('id', $source->id)->update(['verified_at' => now()->subMinutes(20)]);
        $this->search('sensor kalibrasi', ['match' => 'related'])->assertJsonPath('total', 0);
        foreach ([['match' => 'anything'], ['sort' => ['bad']], ['sort' => 'random']] as $bad) {
            $this->getJson(route('procurement.search', $bad + ['q' => 'sensor']))->assertUnprocessable();
        }
    }

    public function test_typo_suggestions_are_explicit_scoped_and_never_replace_business_references_or_dimensions(): void
    {
        $pr = $this->pr();
        $source = $this->archive($pr);
        app(ProcurementSearchWriter::class)->append($source, ['text' => 'plastik kursi kantor spektrometer', 'page' => 1, 'pages' => 1, 'done' => true]);
        foreach (['plastikk', 'palstik', 'klastik'] as $typo) {
            $response = $this->search($typo, ['scope' => 'archive'])->assertJsonPath('total', 0)->assertJsonPath('query.used.0', $typo);
            $this->assertContains('plastik', array_column($response->json('suggestions'), 'replacement'));
        }
        $response = $this->search('kursii kantor', ['scope' => 'archive'])->assertJsonPath('total', 1)->assertJsonPath('query.missing.0', 'kursii');
        $this->assertContains('kursi kantor', array_column($response->json('suggestions'), 'query'));
        foreach (['plastikk 10', 'PR-plastikk', '"plastikk"', 'plastikk/baru'] as $strict) {
            $this->search($strict)->assertJsonPath('suggestions', []);
        }
        $this->search('plastikk', ['scope' => 'sp'])->assertJsonPath('suggestions', []);
        $this->search('plastikk', ['buyer' => 'Someone else'])->assertJsonPath('suggestions', []);
        DB::table('procurement_search_sources')->where('id', $source->id)->update(['verified_at' => now()->subMinutes(20)]);
        $this->search('plastikk')->assertJsonPath('suggestions', []);
        DB::table('procurement_search_sources')->where('id', $source->id)->update(['verified_at' => now()]);
        $pr->delete();
        $this->search('plastikk')->assertJsonPath('suggestions', []);
        Http::assertNothingSent();
    }

    public function test_scan_results_include_live_buyers_vendor_roles_and_real_tor_provenance(): void
    {
        $pr = $this->pr();
        $pr->update(['penyedia_eksternal' => 'Vendor PPBJ', 'created_by_user_id' => $this->user->id]);
        [$sp, $spph] = $this->documents($pr);
        $sp->update(['nama_vendor' => 'Vendor kontrak']);
        $spph->update(['vendor_names' => ['Vendor kandidat', 'Vendor A']]);
        $creator = User::factory()->create(['name' => 'Ayu Pembuat TOR', 'department' => 'operasional']);
        \App\Models\Torpr::create(['nomor_pr' => $pr->ppbj_no, 'tujuan_pengadaan' => 'Alat ukur', 'tanggal_pr' => '2026-11-01', 'portofolio' => 'CON',
            'created_by_user_id' => $creator->id, 'sign_token_kabid' => 'PRIVATE-SIGN-TOKEN', 'signed_by_kabid_name' => 'Penandatangan Asli']);
        $source = $this->archive($pr);
        app(ProcurementSearchWriter::class)->append($source, ['text' => 'Spektrometer optik laboratorium', 'page' => 1, 'pages' => 1, 'done' => true]);
        $response = $this->search('spektrometer', ['scope' => 'archive', 'buyer' => 'Nazar', 'vendor' => 'kandidat', 'creator' => 'Ayu'])
            ->assertJsonPath('total', 1)->assertJsonPath('rows.0.context.buyer', 'Nazar')->assertJsonPath('rows.0.context.vendor', 'Vendor PPBJ')
            ->assertJsonPath('rows.0.context.creator', 'Ayu Pembuat TOR · Operasional')
            ->assertJsonPath('rows.0.context.provenance.signatures.0.name', 'Penandatangan Asli')
            ->assertJsonPath('rows.0.context.documents.0.kind', 'sp')->assertJsonPath('rows.0.context.documents.0.vendors.0', 'Vendor kontrak')
            ->assertDontSee('PRIVATE-SIGN-TOKEN');
        $this->assertContains('Vendor kandidat', $response->json('rows.0.context.documents.1.vendors'));
        $this->search('spektrometer', ['creator' => $this->user->name])->assertJsonPath('total', 0);
        $this->search('spektrometer', ['buyer' => 'Ayu'])->assertJsonPath('total', 0);
        $this->search('spektrometer', ['vendor' => 'kontrak'])->assertJsonPath('total', 1);
        $sp->delete();
        $this->search('spektrometer', ['vendor' => 'kontrak'])->assertJsonPath('total', 0);
        $pr->update(['buyer' => 'Buyer Baru']);
        $this->search('spektrometer')->assertJsonPath('rows.0.context.buyer', 'Buyer Baru');
        foreach (['ppbj' => 'ppbj', 'sp' => 'sps', 'spph' => 'spphs'] as $kind => $key) {
            if ($kind === 'sp') {
                $sp->restore();
            }
            $this->assertCount(1, $this->get(route($kind.'.index', ['search' => 'spektrometer']))->assertOk()->viewData($key));
        }
        Http::assertNothingSent();
    }

    public function test_context_filters_handle_legacy_grouped_documents_literals_and_avoid_duplicate_context_rows(): void
    {
        $pr = $this->pr();
        $pr->update(['buyer' => 'Buyer 100%_A']);
        [$sp, $spph] = $this->documents($pr);
        $second = $this->pr('PR-CONTEXT-GROUP');
        $sp->ppbjs()->attach($second->id);
        $sp->ppbjs()->detach($pr->id); // The original PR is now legacy-only.
        $sp->update(['nama_vendor' => 'PT 100%_A']);
        app(ProcurementSearchSync::class)->local();
        $this->search('kursi', ['vendor' => '100%_A'])->assertJsonPath('total', 2);
        $this->search('kursi', ['vendor' => '%_Z'])->assertJsonPath('total', 0);
        $this->search('kursi', ['buyer' => '100%_A'])->assertJsonPath('total', 1)->assertJsonPath('rows.0.id', $pr->id);
        $spph->update(['vendor_names' => ['PT Étoile "Unggul"', 'PT A\\B', 'PT 50%_C']]);
        foreach (['Étoile "Unggul"', 'A\\B', '50%_C'] as $name) {
            $this->search('kursi', ['vendor' => $name])->assertJsonPath('total', 1)->assertJsonPath('rows.0.id', $pr->id);
        }
        $sp->ppbjs()->attach($pr->id); // Legacy plus pivot must not duplicate the document.
        $this->assertCount(2, $this->search('kursi')->json('rows.1.context.documents'));
        $response = $this->search('kursi')->assertJsonPath('rows.1.context.documents_truncated', false);
        $this->assertCount(2, $response->json('rows.1.context.documents'));
        $this->assertStringContainsString('belum dapat ditelusuri', $response->json('rows.1.context.creator'));
        foreach (['buyer', 'vendor', 'creator'] as $field) {
            $this->getJson(route('procurement.search', ['q' => 'kursi', $field => ['bad']]))->assertUnprocessable();
            $this->getJson(route('procurement.search', ['q' => 'kursi', $field => str_repeat('x', 121)]))->assertUnprocessable();
        }
    }

    public function test_tor_creator_and_purpose_enter_the_shared_index_for_all_three_native_filters(): void
    {
        $pr = $this->pr();
        $this->documents($pr);
        $creator = User::factory()->create(['name' => 'Melati Pembuat', 'department' => 'operasional']);
        $tor = \App\Models\Torpr::create(['nomor_pr' => $pr->ppbj_no, 'tujuan_pengadaan' => 'Pengujian reologi', 'tanggal_pr' => '2026-11-01', 'portofolio' => 'CON', 'created_by_user_id' => $creator->id]);
        $sync = app(ProcurementSearchSync::class);
        $sync->local();
        $this->search('Melati')->assertJsonPath('total', 1);
        $pr->update(['uraian' => str_repeat('Uraian panjang pengadaan. ', 200).' zetaterakhir']);
        $sync->local();
        $this->search('zetaterakhir')->assertJsonPath('total', 1);
        foreach (['ppbj' => 'ppbj', 'sp' => 'sps', 'spph' => 'spphs'] as $kind => $key) {
            $this->assertCount(1, $this->get(route($kind.'.index', ['search' => 'reologi']))->assertOk()->viewData($key));
        }
        $creator->update(['name' => 'Kenanga Baru']);
        $sync->local();
        $this->search('Melati')->assertJsonPath('total', 0);
        $this->search('Kenanga')->assertJsonPath('total', 1);
        $tor->delete();
        $sync->local();
        $this->search('Kenanga')->assertJsonPath('total', 0);
    }

    public function test_grouped_and_legacy_documents_return_all_linked_prs_without_inventing_item_allocations(): void
    {
        $first = $this->pr();
        $second = $this->pr('PKB/PR-26/CON/1202');
        $legacy = $this->pr('PKB/PR-26/CON/1203');
        [$sp] = $this->documents($first);
        $sp->ppbjs()->attach($second->id);
        $sp->update(['nomor_pr' => $legacy->ppbj_no]);
        app(ProcurementSearchSync::class)->local();
        $response = $this->search('kursi')->assertJsonPath('total', 3);
        $this->assertEqualsCanonicalizing([$first->id, $second->id, $legacy->id], array_column($response->json('rows'), 'id'));
        foreach ($response->json('rows') as $row) {
            $this->assertSame($sp->nomor_sp, $row['matches'][0]['reference']);
        }
    }

    public function test_ocr_pages_are_immediately_searchable_and_stale_workers_cannot_restore_replaced_or_deleted_text(): void
    {
        $pr = $this->pr();
        $source = $this->archive($pr);
        $writer = app(ProcurementSearchWriter::class);
        $this->search('spektrometer')->assertJsonPath('total', 0);
        $writer->append($source, ['text' => 'Pengadaan spektrometer digital', 'page' => 1, 'pages' => 3, 'done' => false]);
        $this->search('spektrometer')->assertJsonPath('total', 1)->assertJsonPath('rows.0.matches.0.state', 'partial');
        $writer->append($source, ['text' => 'STALE UNEXPECTED', 'page' => 1, 'pages' => 3, 'done' => false]);
        $this->search('UNEXPECTED')->assertJsonPath('total', 0);
        $writer->source('archive_attachment', '44', 'Revisi.pdf', 'PENAWARAN-44', 'Revisi', '', [$pr->id], hash('sha256', 'archive-v2'), true, true, $pr->ppbj_no);
        $writer->append($source, ['text' => 'spektrometer', 'page' => 3, 'pages' => 3, 'done' => true]);
        $this->search('spektrometer')->assertJsonPath('total', 0);
        $current = DB::table('procurement_search_sources')->find($source->id);
        $writer->source('archive_attachment', '44', 'Revisi.pdf', 'PENAWARAN-44', 'Revisi', '', [], hash('sha256', 'archive-v2'), true, false);
        $writer->append($current, ['text' => 'spektrometer', 'page' => 3, 'pages' => 3, 'done' => true]);
        $this->search('spektrometer')->assertJsonPath('total', 0);
        $this->assertDatabaseCount('procurement_search_links', 0);
    }

    public function test_expired_archive_metadata_is_not_shown_and_refresh_does_not_repeat_ocr(): void
    {
        $pr = $this->pr();
        $source = $this->archive($pr);
        $writer = app(ProcurementSearchWriter::class);
        $writer->passages($source->id, [['page' => 1, 'text' => 'Pengadaan awal']]);
        $writer->append($source, ['text' => 'Peralatan kalibrasi', 'page' => 2, 'pages' => 2, 'done' => true]);
        DB::table('procurement_search_sources')->where('id', $source->id)->update(['verified_at' => now()->subMinutes(20)]);
        $this->search('kalibrasi')->assertJsonPath('total', 0);
        $this->archive($pr);
        $response = $this->search('kalibrasi')->assertJsonPath('total', 1)->assertJsonPath('rows.0.matches.0.state', 'ready');
        $url = $response->json('rows.0.matches.0.url');
        $this->assertStringContainsString('/procurement/search/files/'.$source->id, $url);
        $this->assertStringNotContainsString('token=', $url);
        $this->assertSame(2, DB::table('procurement_search_sources')->find($source->id)->page);
    }

    public function test_missing_pr_metadata_can_be_linked_from_exact_existing_pr_reference_in_ocr(): void
    {
        $pr = $this->pr('PR-2026-0012');
        $other = $this->pr('PR-2026-001');
        $writer = app(ProcurementSearchWriter::class);
        $id = $writer->source('archive_document', '9', 'Foto nota', 'NOTA-9', 'Nota', '', [], hash('sha256', 'unlinked'), true, true, 'NOTA-9');
        $source = DB::table('procurement_search_sources')->find($id);
        $result = ['text' => 'Referensi PR / 2026 / 0012 pembelian sensor suhu', 'page' => 1, 'pages' => 1, 'done' => true];
        $writer->append($source, $result);
        app(ProcurementOcrProcessor::class)->linkReferences($source, $result['text']);
        $this->search('sensor')->assertJsonPath('total', 1)->assertJsonPath('rows.0.id', $pr->id)->assertJsonPath('rows.0.matches.0.inferred', true);
        $this->assertDatabaseMissing('procurement_search_links', ['source_id' => $id, 'ppbj_id' => $other->id]);
        $writer->source('archive_document', '9', 'Foto nota', 'NOTA-9', 'Nota', '', [], hash('sha256', 'unlinked'), true, true, 'NOTA-9');
        $this->search('sensor')->assertJsonPath('total', 1);
    }

    public function test_only_reviewed_local_attachments_enter_the_shared_index_and_removed_documents_disappear(): void
    {
        $pr = $this->pr();
        [$sp] = $this->documents($pr);
        $attachment = ProcurementDetailAttachment::create(['id' => (string) Str::uuid(), 'kind' => 'sp', 'document_id' => $sp->id, 'uploaded_by' => $this->user->id,
            'original_name' => 'Rincian.pdf', 'path' => 'private/fake.pdf', 'mime' => 'application/pdf', 'size' => 100,
            'sha256' => str_repeat('a', 64), 'method' => 'pdf-ocr', 'extracted_text' => 'Mikroskop rahasia', 'version' => 1]);
        $sync = app(ProcurementSearchSync::class);
        $sync->local();
        $this->search('Mikroskop')->assertJsonPath('total', 0);
        $attachment->update(['reviewed_text' => 'Mikroskop digital', 'reviewed_at' => now(), 'reviewed_by' => $this->user->id]);
        $sync->local();
        $this->search('Mikroskop')->assertJsonPath('total', 1);
        $sp->delete();
        $sync->local();
        $this->search('Mikroskop')->assertJsonPath('total', 0);
    }

    public function test_queries_are_bounded_pagination_and_permissions_remain_private(): void
    {
        foreach (range(1, 12) as $i) {
            $pr = $this->pr('PR-TEST-'.$i);
            app(ProcurementSearchWriter::class)->source('ppbj', (string) $pr->id, 'Barang uji', $pr->ppbj_no, 'Pengadaan printer', '', [$pr->id], hash('sha256', (string) $i));
        }
        DB::enableQueryLog();
        $response = $this->search('printer')->assertJsonPath('total', 12);
        $this->assertCount(10, $response->json('rows'));
        $queries = collect(DB::getQueryLog())->pluck('query');
        DB::disableQueryLog();
        $this->assertCount(0, $queries->filter(fn ($sql) => preg_match('/^\s*(insert|update|delete)\b/i', $sql) && str_contains($sql, 'procurement_search')));
        $this->assertLessThanOrEqual(5, $queries->filter(fn ($sql) => str_starts_with($sql, 'select') && str_contains($sql, 'procurement_search'))->count());
        $this->assertCount(2, $this->search('printer', ['page' => 2])->json('rows'));
        foreach ([['q' => ['bad']], ['q' => str_repeat('x', 256)], ['scope' => 'unknown'], ['page' => 0]] as $bad) {
            $this->getJson(route('procurement.search', $bad + ['q' => 'printer']))->assertUnprocessable();
        }
        $this->search("' OR 1=1")->assertJsonPath('total', 0);
        $this->actingAs(User::factory()->create(['department' => 'operasional', 'role' => 'user']))->getJson(route('procurement.search', ['q' => 'printer']))->assertForbidden();
        $this->actingAs(User::factory()->create(['department' => 'umum', 'is_active' => false]))->getJson(route('procurement.search', ['q' => 'printer']))->assertStatus(423);
        auth()->logout();
        $this->getJson(route('procurement.search', ['q' => 'printer']))->assertUnauthorized();
    }

    public function test_background_command_is_bounded_and_does_not_run_ocr_when_sync_only(): void
    {
        $this->pr();
        $this->mock(ProcurementArchiveBridge::class, fn ($mock) => $mock->shouldReceive('call')->twice()->andReturn(['rows' => [], 'last' => 0]));
        $this->mock(ProcurementOcrProcessor::class, fn ($mock) => $mock->shouldNotReceive('next'));
        $this->artisan('procurement:search-index', ['--sync-only' => true, '--limit' => 2])->assertSuccessful();
        $this->assertSame(1, Cache::get('procurement-search:progress')['ready']);
        $lock = Cache::lock('procurement-search:worker', 60);
        $lock->get();
        try {
            $this->artisan('procurement:search-index', ['--sync-only' => true])->expectsOutput('Indexer already active.')->assertSuccessful();
        } finally {
            $lock->release();
        }
    }

    public function test_search_file_gateway_streams_for_general_viewers_without_exposing_signed_urls_or_running_ocr(): void
    {
        config(['services.pr_archive.base_url' => 'https://arsip.example.test']);
        $pr = $this->pr();
        $source = $this->archive($pr);
        $target = 'https://arsip.example.test/api/archive/attachments/44/download?signature=private';
        Cache::put('procurement-search:download:'.$source->id, ['url' => $target, 'fingerprint' => $source->fingerprint], 600);
        Http::fake([$target => Http::response('%PDF-indexed-fixture', 200, ['Content-Type' => 'application/pdf'])]);
        $this->mock(ProcurementOcrProcessor::class, function ($mock) {
            $mock->shouldNotReceive('next');
            $mock->shouldNotReceive('read');
        });
        $this->mock(ProcurementArchiveBridge::class, fn ($mock) => $mock->shouldNotReceive('call'));
        $viewer = User::factory()->create(['department' => 'umum', 'role' => 'viewer']);
        $response = $this->actingAs($viewer)->get(route('procurement.search.file', $source->id))->assertOk()->assertHeader('content-type', 'application/pdf');
        $this->assertSame('%PDF-indexed-fixture', $response->streamedContent());
        $this->assertStringContainsString('private', $response->headers->get('Cache-Control'));
        $this->search('penawaran')->assertDontSee('signature=private')->assertDontSee('arsip.example.test');
    }

    public function test_indexed_file_gateway_rejects_stale_unlinked_deleted_and_untrusted_targets_before_network_io(): void
    {
        config(['services.pr_archive.base_url' => 'https://arsip.example.test']);
        $pr = $this->pr();
        $source = $this->archive($pr);
        $url = route('procurement.search.file', $source->id);
        foreach ([['url' => 'https://evil.test/api/archive/x', 'fingerprint' => $source->fingerprint],
            ['url' => 'http://169.254.169.254/latest/meta-data', 'fingerprint' => $source->fingerprint],
            ['url' => 'https://arsip.example.test/api/archive/attachments/44/download', 'fingerprint' => 'old']] as $target) {
            Cache::put('procurement-search:download:'.$source->id, $target, 600);
            $this->getJson($url)->assertNotFound();
        }
        Cache::put('procurement-search:download:'.$source->id, ['url' => 'https://arsip.example.test/api/archive/attachments/44/download', 'fingerprint' => $source->fingerprint], 600);
        DB::table('procurement_search_sources')->where('id', $source->id)->update(['verified_at' => now()->subMinutes(20)]);
        $this->getJson($url)->assertNotFound();
        DB::table('procurement_search_sources')->where('id', $source->id)->update(['verified_at' => now(), 'active' => false]);
        $this->getJson($url)->assertNotFound();
        DB::table('procurement_search_sources')->where('id', $source->id)->update(['active' => true]);
        DB::table('procurement_search_links')->where('source_id', $source->id)->delete();
        $this->getJson($url)->assertNotFound();
        $this->actingAs(User::factory()->create(['department' => 'operasional']))->getJson($url)->assertForbidden();
        Http::assertNothingSent();
    }

    public function test_indexed_file_gateway_forces_potentially_active_content_to_download(): void
    {
        config(['services.pr_archive.base_url' => 'https://arsip.example.test']);
        $pr = $this->pr();
        $source = $this->archive($pr);
        $target = 'https://arsip.example.test/api/archive/attachments/44/download?signature=private';
        Cache::put('procurement-search:download:'.$source->id, ['url' => $target, 'fingerprint' => $source->fingerprint], 600);
        Http::fake([$target => Http::response('<script>window.evil=true</script>', 200, ['Content-Type' => 'text/html'])]);
        $response = $this->get(route('procurement.search.file', $source->id))->assertOk();
        $this->assertStringStartsWith('attachment;', $response->headers->get('Content-Disposition'));
        $this->assertSame("sandbox; default-src 'none'", $response->headers->get('Content-Security-Policy'));
    }

    public function test_reading_quality_accumulates_across_passes_and_resets_only_for_a_new_file(): void
    {
        $pr = $this->pr();
        $source = $this->archive($pr);
        $writer = app(ProcurementSearchWriter::class);
        $writer->append($source, ['text' => 'Sensor tekanan', 'page' => 1, 'pages' => 2, 'done' => false, 'confidence' => 42, 'engine' => 'pdfjs-6-tesseract-7']);
        $source = DB::table('procurement_search_sources')->find($source->id);
        $writer->append($source, ['text' => 'Kalibrasi digital', 'page' => 2, 'pages' => 2, 'done' => true, 'engine' => 'pdfjs-6-text']);
        $this->search('sensor')->assertJsonPath('rows.0.matches.0.state', 'enhance')
            ->assertJsonPath('rows.0.matches.0.reading.confidence', 42)->assertJsonPath('rows.0.matches.0.reading.engine', 'pdfjs-6-tesseract-7');
        $this->archive($pr);
        $this->assertSame(42, DB::table('procurement_search_sources')->find($source->id)->reading_confidence);
        $writer->source('archive_attachment', '44', 'Revisi', 'REV', '', '', [$pr->id], hash('sha256', 'new-file'), true);
        $this->assertNull(DB::table('procurement_search_sources')->find($source->id)->reading_confidence);
        $this->search('sensor')->assertJsonPath('total', 0);
    }

    public function test_business_text_limit_stays_bounded_but_scan_pages_remain_fully_searchable(): void
    {
        config(['procurement_search.max_text' => 14]);
        $pr = $this->pr();
        $writer = app(ProcurementSearchWriter::class);
        $writer->source('ppbj', 'limited', 'Uji', 'UJI', '', 'kursi kantor   TERSEMBUNYI', [$pr->id], hash('sha256', 'local-limit'));
        $this->search('TERSEMBUNYI')->assertJsonPath('total', 0);
        $source = $this->archive($pr);
        $writer->append($source, ['text' => 'sensor suhu   RAHASIABATAS', 'page' => 1, 'pages' => 1, 'done' => true]);
        $this->search('sensor')->assertJsonPath('total', 1)->assertJsonPath('rows.0.matches.0.state', 'ready');
        $this->search('RAHASIABATAS')->assertJsonPath('total', 1)->assertJsonPath('rows.0.matches.0.match_page', 1);
    }

    public function test_unchanged_sync_does_not_rewrite_terms_or_business_links_and_pr_lookups_are_batched(): void
    {
        $pr = $this->pr();
        [$sp] = $this->documents($pr);
        foreach (range(1, 8) as $i) {
            $copy = $sp->replicate();
            $copy->nomor_sp = 'SP-BATCH-'.$i;
            $copy->nomor_pr = $this->pr('PR-BATCH-'.$i)->ppbj_no;
            $copy->sequence_number = $i + 1;
            $copy->save();
        }
        $sync = app(ProcurementSearchSync::class);
        $sync->local();
        DB::enableQueryLog();
        $sync->local();
        $queries = collect(DB::getQueryLog())->pluck('query');
        DB::disableQueryLog();
        $this->assertCount(0, $queries->filter(fn ($sql) => preg_match('/^\s*(insert|update|delete)\b/i', $sql) && preg_match('/procurement_search_(terms|links)/', $sql)));
        $this->assertCount(0, $queries->filter(fn ($sql) => preg_match('/from "ppbj" where "ppbj_no" =/', $sql)));
        $this->search($pr->ppbj_no)->assertJsonPath('total', 1);
    }

    public function test_many_sources_on_one_pr_cannot_starve_another_pr_or_expand_token_queries(): void
    {
        $first = $this->pr();
        $second = $this->pr('PR-OTHER-2026');
        $writer = app(ProcurementSearchWriter::class);
        foreach (range(1, 30) as $i) {
            $writer->source('ppbj', 'many-'.$i, 'Sensor', 'MANY-'.$i, 'sensor tekanan', '', [$first->id], hash('sha256', 'many-'.$i));
        }
        $writer->source('ppbj', 'other', 'Sensor', 'OTHER', 'sensor tekanan', '', [$second->id], hash('sha256', 'other'));
        DB::enableQueryLog();
        $response = $this->search('sensor tekanan')->assertJsonPath('total', 2);
        $queries = collect(DB::getQueryLog())->pluck('query');
        DB::disableQueryLog();
        $this->assertCount(1, $response->json('rows.0.matches'));
        $this->assertCount(4, $response->json('rows.1.matches'));
        $this->assertSame(1, $response->json('rows.1.more_sources'));
        $ranked = $queries->first(fn ($sql) => str_contains($sql, 'ROW_NUMBER()') && str_contains($sql, 'ranked_sources'));
        $this->assertStringNotContainsString('union', strtolower($ranked));
        // Two token intersections plus one shared two-word ranking aggregate;
        // the number of lookups does not grow with the 30 documents on one PR.
        $this->assertSame(4, substr_count($ranked, '"term" like'));
    }

    public function test_pr_inference_requires_boundaries_and_does_not_concatenate_unrelated_words(): void
    {
        $pr = $this->pr('PR-2026-0012');
        $source = $this->archive($pr);
        DB::table('procurement_search_links')->where('source_id', $source->id)->delete();
        $ocr = app(ProcurementOcrProcessor::class);
        $ocr->linkReferences($source, 'XPR / 2026 / 0012, PR-2026-00123, PR-2026-0012A');
        $this->assertDatabaseCount('procurement_search_links', 0);
        $ocr->linkReferences($source, 'Referensi: PR / 2026 / 0012.');
        $this->assertDatabaseHas('procurement_search_links', ['source_id' => $source->id, 'ppbj_id' => $pr->id, 'inferred' => true]);
        $this->getJson(route('procurement.search', ['q' => '%%%']))->assertUnprocessable();
    }

    public function test_curated_equivalents_search_existing_tokens_in_both_languages_without_guessing_prs(): void
    {
        $pr = $this->pr();
        [$sp] = $this->documents($pr);
        app(ProcurementSearchSync::class)->local();
        $this->search('office chair')->assertJsonPath('total', 1)->assertJsonPath('rows.0.number', $pr->ppbj_no)->assertJsonPath('equivalents.chair.0', 'kursi');
        foreach (['ppbj', 'sp', 'spph'] as $kind) {
            $this->get(route($kind.'.index', ['search' => 'office chair']))->assertOk()->assertSee($kind === 'sp' ? $sp->nomor_sp : $pr->ppbj_no);
        }
        $this->assertSame(['0012'], \App\Support\ProcurementSearchText::equivalents('0012'));
        $this->search('PKB/PR-26/CON/1202')->assertJsonPath('total', 0);
    }

    public function test_unmatched_words_are_explained_and_remaining_words_work_across_lists_and_exports(): void
    {
        $pr = $this->pr();
        [$sp, $spph] = $this->documents($pr);
        $sp->items()->update(['nama_barang' => 'Wadah plastik tebal']);
        app(ProcurementSearchSync::class)->local();
        $term = 'wefwefwefwe plastik';
        $this->search($term)->assertJsonPath('total', 1)->assertJsonPath('query.mode', 'partial')
            ->assertJsonPath('query.used', ['plastik'])->assertJsonPath('query.missing', ['wefwefwefwe']);
        foreach (['ppbj' => ['ppbj', $pr->id], 'sp' => ['sps', $sp->id], 'spph' => ['spphs', $spph->id]] as $kind => [$view, $id]) {
            $response = $this->get(route($kind.'.index', ['search' => $term]))->assertOk();
            $this->assertSame([$id], $response->viewData($view)->pluck('id')->all());
        }
        foreach (['sp' => $sp->nomor_sp, 'spph' => $spph->nomor_spph] as $kind => $number) {
            $this->assertStringContainsString($number, $this->get(route($kind.'.export', ['search' => $term]))->assertOk()->streamedContent());
        }
        $this->search($term, ['scope' => 'archive'])->assertJsonPath('total', 0)->assertJsonPath('query.used', [])
            ->assertJsonPath('query.missing', ['wefwefwefwe', 'plastik']);
        $this->search('wefwefwefwe plastik 99mm')->assertJsonPath('total', 0)->assertJsonPath('query.mode', 'all');
        $this->search('wefwefwefwe 1202')->assertJsonPath('total', 0)->assertJsonPath('query.missing', []);
        $sp->items()->update(['nama_barang' => 'Industrial plastic container']);
        app(ProcurementSearchSync::class)->local();
        $this->search($term)->assertJsonPath('total', 1)->assertJsonPath('query.used', ['plastik'])->assertJsonPath('equivalents.plastik.0', 'plastic');
    }

    public function test_missing_word_diagnostics_ignore_deleted_expired_and_unlinked_sources(): void
    {
        $pr = $this->pr();
        $writer = app(ProcurementSearchWriter::class);
        $writer->source('ppbj', 'plastic', 'Wadah', 'WADAH', 'plastik', '', [$pr->id], hash('sha256', 'plastic'));
        $writer->source('archive_document', 'unlinked', 'Rahasia', 'R', 'orphanword', '', [], hash('sha256', 'orphan'), true);
        $expired = $writer->source('archive_document', 'expired', 'Lama', 'L', 'expiredword', '', [$pr->id], hash('sha256', 'expired'), true);
        DB::table('procurement_search_sources')->where('id', $expired)->update(['verified_at' => now()->subHour()]);
        $writer->source('archive_document', 'deleted', 'Hapus', 'D', 'deletedword', '', [$pr->id], hash('sha256', 'deleted'), true, false);
        foreach (['orphanword', 'expiredword', 'deletedword'] as $word) {
            $this->search($word.' plastik')->assertJsonPath('total', 1)->assertJsonPath('query.missing', [$word]);
        }
        // Words that exist separately are not silently presented as a joint match.
        $writer->source('ppbj', 'separate', 'Terpisah', 'S', 'kaca', '', [$pr->id], hash('sha256', 'separate'));
        $this->search('plastik kaca')->assertJsonPath('total', 0)->assertJsonPath('query.missing', []);
    }

    public function test_every_retained_scan_page_and_tokens_beyond_the_previous_word_cap_are_searchable(): void
    {
        config(['procurement_search.max_text' => 40]);
        $pr = $this->pr();
        $source = $this->archive($pr);
        $writer = app(ProcurementSearchWriter::class);
        $writer->append($source, ['text' => 'Halaman awal pengadaan', 'page' => 1, 'pages' => 2, 'done' => false,
            'passages' => [['page' => 1, 'text' => 'Halaman awal pengadaan']]]);
        $source = DB::table('procurement_search_sources')->find($source->id);
        $long = implode(' ', array_map(fn ($i) => 'barang'.str_pad((string) $i, 5, '0', STR_PAD_LEFT), range(1, 13000))).' plastikpelengkap <SPESIALTEKNIS> 0.25mm';
        $writer->append($source, ['text' => $long, 'page' => 2, 'pages' => 2, 'done' => true,
            'passages' => [['page' => 2, 'text' => $long, 'engine' => 'pdfjs-6-tesseract-7', 'confidence' => 92]]]);
        $this->assertLessThanOrEqual(40, mb_strlen(DB::table('procurement_search_sources')->find($source->id)->content));
        $this->assertGreaterThan(13000, DB::table('procurement_search_terms')->where('source_id', $source->id)->count());
        foreach (['barang13000', 'plastikpelengkap', 'SPESIALTEKNIS'] as $term) {
            $response = $this->search($term)->assertJsonPath('total', 1)->assertJsonPath('rows.0.matches.0.state', 'ready')->assertJsonPath('rows.0.matches.0.match_page', 2);
            $this->assertStringContainsString(strtolower($term), strtolower($response->json('rows.0.matches.0.snippet')));
            $this->assertStringEndsWith('#page=2', $response->json('rows.0.matches.0.url'));
        }
        $this->assertSame($long, DB::table('procurement_search_passages')->where('source_id', $source->id)->where('page', 2)->value('content'));
        $writer->source('archive_attachment', '44', 'Revisi', 'REV', '', '', [$pr->id], hash('sha256', 'new-long-file'), true);
        $this->assertDatabaseCount('procurement_search_passages', 0);
        $this->search('plastikpelengkap')->assertJsonPath('total', 0);
    }

    public function test_legacy_page_text_is_backfilled_in_small_steps_without_ocr_and_capped_files_resume(): void
    {
        $pr = $this->pr();
        $source = $this->archive($pr);
        DB::table('procurement_search_sources')->where('id', $source->id)->update([
            'content' => "[Halaman 1]\nWadah plastik\n\n[Halaman 2]\nSensor akhir", 'page' => 2, 'pages' => 5,
            'state' => 'limited', 'passages_version' => false,
        ]);
        $this->mock(ProcurementArchiveBridge::class, fn ($mock) => $mock->shouldNotReceive('call'));
        $sync = app(ProcurementSearchSync::class);
        $this->assertSame(1, $sync->passages(1));
        $this->assertFalse((bool) DB::table('procurement_search_sources')->find($source->id)->passages_version);
        $this->assertSame(1, $sync->passages(1));
        $row = DB::table('procurement_search_sources')->find($source->id);
        $this->assertTrue((bool) $row->passages_version);
        $this->assertSame('partial', $row->state);
        $this->assertSame(0, $row->page);
        $this->assertDatabaseHas('procurement_search_passages', ['source_id' => $source->id, 'page' => 2, 'error' => 'legacy_truncated']);
        $this->search('sensor')->assertJsonPath('rows.0.matches.0.match_page', 2);
    }

    public function test_duplicate_reuse_copies_all_pages_rather_than_only_the_short_summary(): void
    {
        config(['procurement_search.max_text' => 12]);
        $pr = $this->pr();
        $source = $this->archive($pr);
        $writer = app(ProcurementSearchWriter::class);
        $writer->append($source, ['text' => 'Ringkasan awal dan komponen terakhirlengkap', 'page' => 2, 'pages' => 2, 'done' => true,
            'passages' => [['page' => 1, 'text' => 'Ringkasan awal'], ['page' => 2, 'text' => 'Komponen terakhirlengkap']]]);
        $duplicate = DB::table('procurement_search_sources')->find($source->id);
        $id = $writer->source('archive_attachment', '45', 'Salinan', 'COPY', '', '', [$pr->id], hash('sha256', 'copy'), true);
        $target = DB::table('procurement_search_sources')->find($id);
        $this->assertTrue($writer->copy($target, $duplicate));
        $this->assertSame(2, DB::table('procurement_search_passages')->where('source_id', $id)->count());
        $response = $this->search('terakhirlengkap')->assertJsonPath('total', 1);
        $this->assertCount(2, $response->json('rows.0.matches'));
        $this->assertSame('Komponen terakhirlengkap', DB::table('procurement_search_passages')->where('source_id', $id)->where('page', 2)->value('content'));
        // A stale copy operation cannot write over a source already advanced by a worker.
        $this->assertFalse($writer->copy($target, $duplicate));
    }

    public function test_new_reader_resumes_a_previously_exhausted_scan_one_page_at_a_time(): void
    {
        $pr = $this->pr();
        $source = $this->archive($pr);
        $entry = ['key' => '44', 'active' => true, 'label' => 'Scan', 'reference' => 'SCAN', 'pr' => $pr->ppbj_no, 'metadata' => 'Rincian', 'version' => 'fixture-version', 'extension' => 'pdf'];
        $metadata = implode(' ', [$entry['label'], $entry['reference'], $entry['pr'], $entry['metadata']]);
        DB::table('procurement_search_sources')->where('id', $source->id)->update([
            'fingerprint' => hash('sha256', $metadata.'|'.$entry['version']), 'state' => 'failed', 'attempts' => 3, 'reader_revision' => 0,
            'page' => 2, 'pages' => 4, 'retry_at' => now()->subMinute(),
        ]);
        $originalStorage = $this->app->storagePath();
        $temporary = $originalStorage.'/framework/testing/search-resume-'.Str::uuid();
        $this->app->useStoragePath($temporary);
        try {
            $bridge = \Mockery::mock(ProcurementArchiveBridge::class);
            $bridge->shouldReceive('call')->withArgs(fn ($input) => $input['action'] === 'manifest')->once()->andReturn(['rows' => [$entry]]);
            $bridge->shouldReceive('call')->withArgs(fn ($input) => $input['action'] === 'file')->once()->andReturnUsing(function ($input) {
                file_put_contents($input['destination'], 'synthetic-scan-bytes');

                return ['checksum' => hash_file('sha256', $input['destination'])];
            });
            $processor = \Mockery::mock(ProcurementOcrProcessor::class, [$bridge, app(ProcurementSearchWriter::class)])->makePartial();
            $processor->shouldReceive('read')->once()->withArgs(fn ($file, $extension, $start, $count, $pixels) => is_file($file) && $extension === 'pdf' && $start === 3 && $count === 1 && $pixels === 3000000)
                ->andReturn(['text' => 'Plastik lanjutan', 'page' => 3, 'pages' => 4, 'done' => false, 'confidence' => 90,
                    'passages' => [['page' => 3, 'text' => 'Plastik lanjutan', 'confidence' => 90, 'engine' => 'pdfjs-6-tesseract-7']]]);
            $this->assertFalse($processor->next(0));
            $this->assertTrue($processor->next($source->id));
            $current = DB::table('procurement_search_sources')->find($source->id);
            $this->assertSame(3, $current->page);
            $this->assertSame('partial', $current->state);
            $this->assertSame(0, $current->attempts);
            $this->assertSame(2, $current->reader_revision);
        } finally {
            $this->app->useStoragePath($originalStorage);
            $resolved = realpath($temporary);
            $allowed = realpath($originalStorage.'/framework/testing');
            if ($resolved && $allowed && str_starts_with($resolved, $allowed.DIRECTORY_SEPARATOR)) {
                (new \Illuminate\Filesystem\Filesystem)->deleteDirectory($resolved);
            }
        }
    }

    public function test_an_exhausted_heavy_page_is_marked_and_later_pages_are_still_searchable(): void
    {
        $pr = $this->pr();
        $source = $this->archive($pr);
        $entry = ['key' => '44', 'active' => true, 'label' => 'Scan', 'reference' => 'SCAN', 'pr' => $pr->ppbj_no, 'metadata' => 'Rincian', 'version' => 'heavy-fixture', 'extension' => 'pdf'];
        $metadata = implode(' ', [$entry['label'], $entry['reference'], $entry['pr'], $entry['metadata']]);
        DB::table('procurement_search_sources')->where('id', $source->id)->update([
            'fingerprint' => hash('sha256', $metadata.'|'.$entry['version']), 'state' => 'failed', 'attempts' => 2, 'reader_revision' => 2, 'pages' => null,
        ]);
        $originalStorage = $this->app->storagePath();
        $temporary = $originalStorage.'/framework/testing/search-heavy-'.Str::uuid();
        $this->app->useStoragePath($temporary);
        try {
            $bridge = \Mockery::mock(ProcurementArchiveBridge::class);
            $bridge->shouldReceive('call')->withArgs(fn ($input) => $input['action'] === 'manifest')->twice()->andReturn(['rows' => [$entry]]);
            $bridge->shouldReceive('call')->withArgs(fn ($input) => $input['action'] === 'file')->twice()->andReturnUsing(function ($input) {
                file_put_contents($input['destination'], 'synthetic-heavy-scan');

                return ['checksum' => hash_file('sha256', $input['destination'])];
            });
            $processor = \Mockery::mock(ProcurementOcrProcessor::class, [$bridge, app(ProcurementSearchWriter::class)])->makePartial();
            $processor->shouldReceive('read')->once()->withArgs(fn ($file, $extension, $start, $count, $pixels) => $start === 1 && $count === 1 && $pixels === 2000000)
                ->andThrow(new \App\Exceptions\ProcurementReadFailure(new \RuntimeException('ocr_memory_budget'), 3));
            $processor->shouldReceive('read')->once()->withArgs(fn ($file, $extension, $start, $count) => $start === 2 && $count === 2)
                ->andReturn(['text' => 'Komponen plastik lanjutan', 'page' => 3, 'pages' => 3, 'done' => true, 'confidence' => 92,
                    'passages' => [['page' => 2, 'text' => 'Komponen'], ['page' => 3, 'text' => 'Plastik lanjutan', 'confidence' => 92]]]);
            $this->assertTrue($processor->next());
            $current = DB::table('procurement_search_sources')->find($source->id);
            $this->assertSame(1, $current->page);
            $this->assertSame(3, $current->pages);
            $this->assertDatabaseHas('procurement_search_passages', ['source_id' => $source->id, 'page' => 1, 'error' => 'memory']);
            $this->assertTrue($processor->next());
            $this->app->useStoragePath($originalStorage);
            $this->search('plastik')->assertJsonPath('total', 1)->assertJsonPath('rows.0.matches.0.match_page', 3)->assertJsonPath('rows.0.matches.0.state', 'partial');
        } finally {
            $this->app->useStoragePath($originalStorage);
            $resolved = realpath($temporary);
            $allowed = realpath($originalStorage.'/framework/testing');
            if ($resolved && $allowed && str_starts_with($resolved, $allowed.DIRECTORY_SEPARATOR)) {
                (new \Illuminate\Filesystem\Filesystem)->deleteDirectory($resolved);
            }
        }
    }
}
