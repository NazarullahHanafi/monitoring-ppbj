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
        }
        foreach (['sp', 'spph'] as $kind) {
            $csv = $this->get(route($kind.'.export', ['search' => 'ergonomis']))->assertOk()->streamedContent();
            $this->assertStringContainsString($kind === 'sp' ? $sp->nomor_sp : $spph->nomor_spph, $csv);
        }
        Http::assertNothingSent();
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
        $this->search('penawaran')->assertDontSee('signature')->assertDontSee('arsip.example.test');
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
        $this->search('sensor')->assertJsonPath('rows.0.matches.0.state', 'uncertain')
            ->assertJsonPath('rows.0.matches.0.reading.confidence', 42)->assertJsonPath('rows.0.matches.0.reading.engine', 'pdfjs-6-tesseract-7');
        $this->archive($pr);
        $this->assertSame(42, DB::table('procurement_search_sources')->find($source->id)->reading_confidence);
        $writer->source('archive_attachment', '44', 'Revisi', 'REV', '', '', [$pr->id], hash('sha256', 'new-file'), true);
        $this->assertNull(DB::table('procurement_search_sources')->find($source->id)->reading_confidence);
        $this->search('sensor')->assertJsonPath('total', 0);
    }

    public function test_text_outside_retention_limit_never_enters_the_search_index(): void
    {
        config(['procurement_search.max_text' => 14]);
        $pr = $this->pr();
        $writer = app(ProcurementSearchWriter::class);
        $writer->source('ppbj', 'limited', 'Uji', 'UJI', '', 'kursi kantor   TERSEMBUNYI', [$pr->id], hash('sha256', 'local-limit'));
        $this->search('TERSEMBUNYI')->assertJsonPath('total', 0);
        $source = $this->archive($pr);
        $writer->append($source, ['text' => 'sensor suhu   RAHASIABATAS', 'page' => 1, 'pages' => 1, 'done' => true]);
        $this->search('sensor')->assertJsonPath('total', 1)->assertJsonPath('rows.0.matches.0.state', 'limited');
        $this->search('RAHASIABATAS')->assertJsonPath('total', 0);
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
        $ranked = $queries->first(fn ($sql) => str_contains($sql, 'ROW_NUMBER()'));
        $this->assertStringNotContainsString('union', strtolower($ranked));
        $this->assertSame(2, substr_count($ranked, '"term" like'));
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
}
