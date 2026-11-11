<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\User;
use App\Services\ProcurementArchiveBridge;
use App\Services\ProcurementOcrProcessor;
use App\Services\ProcurementOcrQueue;
use App\Services\ProcurementReadingCoverage;
use App\Services\ProcurementSearchWriter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Tests\TestCase;

class ProcurementReadingCoverageTest extends TestCase
{
    use RefreshDatabase;

    private Ppbj $pr;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']));
        $this->pr = Ppbj::create(['ppbj_no' => 'PR-COVERAGE-01', 'uraian' => 'Lampiran', 'tgl_ppbj' => '2026-11-11']);
        Http::preventStrayRequests();
    }

    private function source(string $key = '44'): int
    {
        return app(ProcurementSearchWriter::class)->source('archive_attachment', $key, 'Scan', 'REF-'.$key, 'metadata', '', [$this->pr->id], hash('sha256', $key), true);
    }

    private function withReader(string $bytes, string $extension, callable $run): void
    {
        $id = $this->source();
        $entry = ['key' => '44', 'active' => true, 'label' => 'Scan', 'reference' => 'REF-44', 'pr' => $this->pr->ppbj_no, 'metadata' => 'metadata', 'version' => 'version', 'extension' => $extension];
        $metadata = implode(' ', [$entry['label'], $entry['reference'], $entry['pr'], $entry['metadata']]);
        DB::table('procurement_search_sources')->where('id', $id)->update(['fingerprint' => hash('sha256', $metadata.'|version')]);
        $storage = $this->app->storagePath();
        $temporary = $storage.'/framework/testing/coverage-'.Str::uuid();
        $this->app->useStoragePath($temporary);
        try {
            $bridge = \Mockery::mock(ProcurementArchiveBridge::class);
            $bridge->shouldReceive('call')->withArgs(fn ($input) => $input['action'] === 'manifest')->andReturn(['rows' => [$entry]]);
            $bridge->shouldReceive('call')->withArgs(fn ($input) => $input['action'] === 'file')->andReturnUsing(function ($input) use ($bytes) {
                file_put_contents($input['destination'], $bytes);

                return ['checksum' => hash_file('sha256', $input['destination'])];
            });
            $processor = new ProcurementOcrProcessor($bridge, app(ProcurementSearchWriter::class));
            $run($processor, $id);
        } finally {
            $this->app->useStoragePath($storage);
            $resolved = realpath($temporary);
            $allowed = realpath($storage.'/framework/testing');
            if ($resolved && $allowed && str_starts_with($resolved, $allowed.DIRECTORY_SEPARATOR)) {
                (new \Illuminate\Filesystem\Filesystem)->deleteDirectory($resolved);
            }
        }
    }

    public function test_a_missing_page_cannot_be_reported_ready_and_is_requeued_without_discarding_later_text(): void
    {
        $id = $this->source();
        $writer = app(ProcurementSearchWriter::class);
        $writer->append(DB::table('procurement_search_sources')->find($id), ['text' => 'plastik terakhir', 'page' => 2, 'pages' => 2, 'done' => true]);
        $row = DB::table('procurement_search_sources')->find($id);
        $this->assertSame('partial', $row->state);
        $this->assertSame(0, $row->page);
        $this->assertSame(1, $row->indexed_pages);
        $this->getJson(route('procurement.search', ['q' => 'plastik']))->assertOk()->assertJsonPath('total', 1);
        $writer->passages($id, [['page' => 1, 'text' => 'halaman awal']]);
        app(ProcurementReadingCoverage::class)->audit($id);
        $row = DB::table('procurement_search_sources')->find($id);
        $this->assertSame('ready', $row->state);
        $this->assertSame('processed', $row->coverage_state);
        $this->assertSame(2, $row->indexed_pages);
    }

    public function test_empty_failed_pages_are_recoverable_and_stale_quality_does_not_survive_a_successful_repair(): void
    {
        $id = $this->source();
        $writer = app(ProcurementSearchWriter::class);
        $writer->passages($id, [['page' => 1, 'text' => '', 'error' => 'memory', 'confidence' => 0], ['page' => 2, 'text' => 'sensor', 'confidence' => 92]]);
        DB::table('procurement_search_sources')->where('id', $id)->update(['page' => 2, 'pages' => 2, 'state' => 'uncertain', 'reading_confidence' => 0]);
        $coverage = app(ProcurementReadingCoverage::class);
        $coverage->audit($id);
        $row = DB::table('procurement_search_sources')->find($id);
        $this->assertSame(0, $row->page);
        $this->assertSame('partial', $row->state);
        $this->assertSame(1, $row->problem_pages);
        $writer->passages($id, [['page' => 1, 'text' => 'plastik pulih', 'confidence' => 95]]);
        $coverage->audit($id);
        $row = DB::table('procurement_search_sources')->find($id);
        $this->assertSame('ready', $row->state);
        $this->assertSame(92, $row->reading_confidence);
        $this->assertSame(0, $row->problem_pages);
        $this->getJson(route('procurement.search', ['q' => 'pulih']))->assertOk()->assertJsonPath('rows.0.matches.0.match_page', 1);
    }

    public function test_unresolved_or_low_quality_pages_stay_in_review_after_the_repair_budget_is_exhausted(): void
    {
        $id = $this->source();
        app(ProcurementSearchWriter::class)->passages($id, [['page' => 1, 'text' => '', 'error' => 'page_unreadable', 'confidence' => 0], ['page' => 2, 'text' => 'bacaan meragukan', 'confidence' => 40]]);
        DB::table('procurement_search_passages')->where('source_id', $id)->update(['repair_attempts' => 2]);
        DB::table('procurement_search_sources')->where('id', $id)->update(['page' => 2, 'pages' => 2, 'state' => 'partial']);
        app(ProcurementReadingCoverage::class)->audit($id);
        $row = DB::table('procurement_search_sources')->find($id);
        $this->assertSame('uncertain', $row->state);
        $this->assertSame('review', $row->coverage_state);
        $this->assertSame(2, $row->problem_pages);
        $this->assertNull(app(ProcurementOcrQueue::class)->next($id));
    }

    public function test_transient_failures_receive_bounded_recovery_rounds_and_permanent_failures_do_not(): void
    {
        $this->withReader('plastik dipulihkan', 'txt', function ($processor, $id) {
            DB::table('procurement_search_sources')->where('id', $id)->update(['state' => 'failed', 'attempts' => 3, 'failure_code' => 'reader_failed', 'retry_at' => now()->addDay()]);
            $this->assertFalse($processor->next($id));
            $this->travel(25)->hours();
            $this->assertTrue($processor->next($id));
            $row = DB::table('procurement_search_sources')->find($id);
            $this->assertSame(1, $row->recovery_round);
            $this->assertSame('ready', $row->state);
            DB::table('procurement_search_sources')->where('id', $id)->update(['state' => 'failed', 'attempts' => 3, 'recovery_round' => 3]);
            $this->assertFalse($processor->next($id));
            DB::table('procurement_search_sources')->where('id', $id)->update(['recovery_round' => 0, 'failure_code' => 'protected_pdf']);
            $this->assertFalse($processor->next($id));
        });
    }

    public function test_text_after_the_old_summary_limit_is_indexed_in_bounded_parts(): void
    {
        config(['procurement_search.max_page_text' => 100000]);
        $text = str_repeat('plastik ', 80000).'ujungarsiplengkap';
        $this->withReader($text, 'txt', function ($processor, $id) {
            for ($i = 0; $i < 7; $i++) {
                $this->assertTrue($processor->next($id));
            }
            $row = DB::table('procurement_search_sources')->find($id);
            $this->assertSame('ready', $row->state);
            $this->assertSame(7, $row->pages);
            $this->assertSame(7, $row->indexed_pages);
            $this->assertSame(400000, mb_strlen($row->content));
            $this->getJson(route('procurement.search', ['q' => 'ujungarsiplengkap']))->assertOk()->assertJsonPath('total', 1)->assertJsonPath('rows.0.matches.0.match_page', null);
        });
    }

    public function test_office_embedded_images_and_notes_are_not_silently_reported_as_fully_read(): void
    {
        $path = tempnam(sys_get_temp_dir(), 'coverage-');
        $zip = new \ZipArchive;
        $zip->open($path, \ZipArchive::OVERWRITE);
        $zip->addFromString('word/document.xml', '<w:t>sensor utama</w:t>');
        $zip->addFromString('word/footnotes.xml', '<w:t>catatanarsip</w:t>');
        $zip->addFromString('word/media/image1.png', 'synthetic');
        $zip->close();
        $bytes = file_get_contents($path);
        unlink($path);
        $this->withReader($bytes, 'docx', function ($processor, $id) {
            $processor->next($id);
            $row = DB::table('procurement_search_sources')->find($id);
            $this->assertSame('uncertain', $row->state);
            $this->assertSame('review', $row->coverage_state);
            $this->assertDatabaseHas('procurement_search_passages', ['source_id' => $id, 'error' => 'office_images']);
            $this->getJson(route('procurement.search', ['q' => 'catatanarsip']))->assertOk()->assertJsonPath('total', 1);
        });
    }

    public function test_virtual_text_parts_do_not_split_a_searchable_word_at_the_boundary(): void
    {
        config(['procurement_search.max_page_text' => 100]);
        $this->withReader(str_repeat('a ', 47).'spektrometer akhir', 'txt', function ($processor, $id) {
            $processor->next($id);
            $processor->next($id);
            $this->getJson(route('procurement.search', ['q' => 'spektrometer']))->assertOk()->assertJsonPath('total', 1);
        });
    }

    public function test_legacy_office_is_revalidated_once_even_when_its_old_summary_was_short(): void
    {
        $this->withReader('catatan lengkap terbaru', 'txt', function ($processor, $id) {
            $writer = app(ProcurementSearchWriter::class);
            $writer->passages($id, [['page' => 1, 'text' => 'catatan lama', 'engine' => 'office-text']]);
            DB::table('procurement_search_sources')->where('id', $id)->update(['page' => 1, 'pages' => 1, 'state' => 'ready', 'reading_engine' => 'office-text', 'reader_revision' => 2]);
            $coverage = app(ProcurementReadingCoverage::class);
            $coverage->audit($id);
            $this->assertDatabaseHas('procurement_search_sources', ['id' => $id, 'page' => 0, 'state' => 'partial']);
            $this->assertTrue($processor->next($id));
            $coverage->audit($id);
            $this->assertDatabaseHas('procurement_search_sources', ['id' => $id, 'page' => 1, 'state' => 'ready', 'reader_revision' => 3, 'coverage_state' => 'processed']);
            $this->assertFalse($processor->next($id));
            $this->getJson(route('procurement.search', ['q' => 'terbaru']))->assertOk()->assertJsonPath('total', 1);
        });
    }

    public function test_repairing_a_missing_middle_part_preserves_later_parts_and_reaches_completion(): void
    {
        config(['procurement_search.max_page_text' => 15]);
        $this->withReader('plastik awal sensor tengah kabel akhir', 'txt', function ($processor, $id) {
            $writer = app(ProcurementSearchWriter::class);
            $writer->passages($id, [['page' => 1, 'text' => 'plastik awal ', 'engine' => 'office-text'], ['page' => 3, 'text' => 'kabel akhir', 'engine' => 'office-text']]);
            DB::table('procurement_search_sources')->where('id', $id)->update(['page' => 3, 'pages' => 3, 'state' => 'ready', 'reader_revision' => 3, 'reading_engine' => 'office-text']);
            app(ProcurementReadingCoverage::class)->audit($id);
            $this->assertTrue($processor->next($id));
            $this->assertTrue($processor->next($id));
            $this->assertDatabaseHas('procurement_search_sources', ['id' => $id, 'state' => 'ready', 'indexed_pages' => 3, 'coverage_state' => 'processed']);
            $this->assertDatabaseHas('procurement_search_passages', ['source_id' => $id, 'page' => 3, 'content' => 'kabel akhir']);
            $this->getJson(route('procurement.search', ['q' => 'tengah']))->assertOk()->assertJsonPath('total', 1);
        });
    }

    public function test_oversized_text_is_reported_for_review_instead_of_silently_truncated(): void
    {
        $this->withReader(str_repeat('x', 8 * 1024 * 1024 + 1), 'txt', function ($processor, $id) {
            $this->assertTrue($processor->next($id));
            $this->assertDatabaseHas('procurement_search_sources', ['id' => $id, 'state' => 'unsupported', 'coverage_state' => 'review', 'failure_code' => 'office_limit']);
            $this->assertFalse($processor->next($id));
            $this->assertDatabaseMissing('procurement_search_passages', ['source_id' => $id]);
        });
    }

    public function test_coverage_api_lists_every_page_including_missing_pages_and_respects_live_archive_access(): void
    {
        $id = $this->source();
        DB::table('procurement_search_sources')->where('id', $id)->update(['pages' => 26]);
        $this->mock(ProcurementOcrProcessor::class, fn ($mock) => $mock->shouldNotReceive('next', 'read'));
        $this->getJson(route('procurement.search.coverage'))->assertOk()->assertJsonPath('rows.0.id', $id);
        $response = $this->getJson(route('procurement.search.coverage', ['source' => $id, 'page' => 2]))->assertOk()->assertJsonCount(1, 'rows')->assertJsonPath('rows.0.page', 26)->assertJsonPath('rows.0.state', 'Belum diproses');
        $this->assertStringContainsString('private', $response->headers->get('Cache-Control'));
        DB::table('procurement_search_sources')->where('id', $id)->update(['verified_at' => now()->subHour()]);
        $this->getJson(route('procurement.search.coverage', ['source' => $id]))->assertNotFound();
        $this->getJson(route('procurement.search.coverage'))->assertOk()->assertJsonPath('total',0);
        $this->getJson(route('procurement.search.coverage',['page' => 0]))->assertUnprocessable();
        $this->actingAs(User::factory()->create(['department' => 'operasional']));
        $this->getJson(route('procurement.search.coverage'))->assertForbidden();
    }
}
