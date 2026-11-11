<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\ProcurementDetailAttachment;
use App\Models\Sp;
use App\Models\User;
use App\Services\ProcurementOcrQueue;
use App\Services\ProcurementOfficeImages;
use App\Services\ProcurementReadingReviews;
use App\Services\ProcurementSearchSync;
use App\Services\ProcurementSearchWriter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Tests\TestCase;

class ProcurementReadingRecoveryTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    private Ppbj $pr;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $this->actingAs($this->admin);
        $this->pr = Ppbj::create(['ppbj_no' => 'PR-RECOVERY-2026', 'uraian' => 'Arsip', 'tgl_ppbj' => '2026-11-11']);
        Http::preventStrayRequests();
    }

    private function source(array $pages, bool $linked = true): int
    {
        $writer = app(ProcurementSearchWriter::class);
        $id = $writer->source('archive_attachment', Str::random(8), 'Scan', 'SCAN-REF', 'metadata', '', $linked ? [$this->pr->id] : [], hash('sha256', Str::random()), true);
        $writer->append(DB::table('procurement_search_sources')->find($id), ['text' => implode(' ', array_column($pages, 'text')), 'passages' => $pages, 'page' => count($pages), 'pages' => count($pages), 'done' => true, 'engine' => 'pdfjs-6-text']);

        return $id;
    }

    private function review(int $id, int $page, string $text)
    {
        $url = route('procurement.search.review', ['source' => $id, 'page' => $page]);
        $version = $this->getJson($url)->assertOk()->json('version');

        return $this->postJson($url, ['text' => $text, 'reason' => 'Dicocokkan dengan file asli.', 'version' => $version]);
    }

    public function test_review_is_published_atomically_in_background_removes_old_tokens_and_protects_human_text(): void
    {
        $id = $this->source(array_map(fn ($n) => ['page' => $n, 'text' => $n === 1 ? 'salahocr' : 'baranglain'.$n], range(1, 6)));
        $this->review($id, 1, 'spektrometerbenar')->assertAccepted();
        $reviews = app(ProcurementReadingReviews::class);
        $this->assertNull(app(ProcurementOcrQueue::class)->next($id));
        $this->assertTrue($reviews->next());
        $this->assertDatabaseHas('procurement_search_terms', ['source_id' => $id, 'term' => 'salahocr']);
        $this->assertDatabaseMissing('procurement_search_terms', ['source_id' => $id, 'term' => 'spektrometerbenar']);
        $this->assertTrue($reviews->next());
        $this->assertDatabaseMissing('procurement_search_terms', ['source_id' => $id, 'term' => 'salahocr']);
        $this->assertDatabaseHas('procurement_search_terms', ['source_id' => $id, 'term' => 'baranglain6']);
        $this->getJson(route('procurement.search', ['q' => 'spektrometerbenar']))->assertOk()->assertJsonPath('total', 1);
        $history = $this->getJson(route('procurement.search.review', ['source' => $id, 'page' => 1]))->assertOk()->assertJsonPath('history.0.state', 'applied');
        $this->assertDatabaseHas('procurement_reading_reviews', ['source_id' => $id, 'previous_text' => 'salahocr', 'text' => 'spektrometerbenar', 'user_id' => $this->admin->id]);
        app(ProcurementSearchWriter::class)->passages($id, [['page' => 1, 'text' => 'otomatisburuk']]);
        $this->assertDatabaseHas('procurement_search_passages', ['source_id' => $id, 'page' => 1, 'content' => 'spektrometerbenar']);
        $this->assertSame('spektrometerbenar', $history->json('text'));
        $this->assertDatabaseCount('procurement_review_terms', 0);
    }

    public function test_review_rejects_stale_data_multiple_pending_and_preserves_conflicts_after_file_changes(): void
    {
        $id = $this->source([['page' => 1, 'text' => 'lama']]);
        $url = route('procurement.search.review', ['source' => $id, 'page' => 1]);
        $version = $this->getJson($url)->json('version');
        app(ProcurementSearchWriter::class)->passages($id, [['page' => 1, 'text' => 'baru']]);
        $this->postJson($url, ['text' => 'koreksi', 'reason' => 'Pemeriksaan asli.', 'version' => $version])->assertConflict();
        $this->review($id, 1, 'koreksi')->assertAccepted();
        $this->review($id, 1, 'kedua')->assertConflict();
        DB::table('procurement_search_sources')->where('id', $id)->update(['fingerprint' => hash('sha256', 'replacement')]);
        app(ProcurementReadingReviews::class)->next();
        $this->assertDatabaseHas('procurement_reading_reviews', ['source_id' => $id, 'state' => 'conflict', 'text' => 'koreksi']);
        $this->assertDatabaseHas('procurement_search_passages', ['source_id' => $id, 'content' => 'baru']);
    }

    public function test_blank_parts_require_explicit_human_confirmation_and_do_not_invent_searchable_text(): void
    {
        $id = $this->source([['page' => 1, 'text' => '', 'error' => 'page_unreadable', 'confidence' => 0]]);
        $url = route('procurement.search.review', ['source' => $id, 'page' => 1]);
        $version = $this->getJson($url)->json('version');
        $payload = ['text' => '', 'reason' => 'Gambar telah diperiksa dan tidak memiliki tulisan.', 'version' => $version];
        $this->postJson($url, $payload)->assertUnprocessable();
        $this->postJson($url, $payload + ['confirm_blank' => true])->assertAccepted();
        app(ProcurementReadingReviews::class)->next();
        $this->assertDatabaseHas('procurement_search_sources', ['id' => $id, 'coverage_state' => 'processed', 'problem_pages' => 0]);
        $this->assertDatabaseHas('procurement_search_passages', ['source_id' => $id, 'content' => '', 'engine' => 'human-review']);
    }

    public function test_review_and_global_catalog_require_superadmin_and_respect_read_only_and_freshness(): void
    {
        $id = $this->source([['page' => 1, 'text' => 'arsiptanpapr']], false);
        $this->getJson(route('procurement.search.catalog', ['q' => 'arsiptanpapr']))->assertOk()->assertJsonPath('rows.0.id', $id)->assertJsonCount(0, 'rows.0.prs');
        Cache::put('simonpr:read_only_mode', true);
        $this->review($id, 1, 'arsipbenar')->assertForbidden();
        Cache::forget('simonpr:read_only_mode');
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']));
        $this->getJson(route('procurement.search.catalog', ['q' => 'arsiptanpapr']))->assertForbidden();
        $this->getJson(route('procurement.search.review', ['source' => $id, 'page' => 1]))->assertForbidden();
        $this->actingAs($this->admin);
        DB::table('procurement_search_sources')->where('id', $id)->update(['verified_at' => now()->subHour()]);
        $this->getJson(route('procurement.search.catalog', ['q' => 'arsiptanpapr']))->assertOk()->assertJsonCount(0, 'rows');
        $this->getJson(route('procurement.search.review', ['source' => $id, 'page' => 1]))->assertNotFound();
    }

    public function test_local_attached_files_are_queued_before_manual_review_and_exclude_drafts_or_deleted_files(): void
    {
        Storage::fake('local');
        $sp = Sp::create(['nomor_sp' => 'SP-LOCAL-01', 'sequence_number' => 1, 'numbering_mode' => 'auto', 'tanggal_sp' => '2026-11-11', 'nomor_pr' => $this->pr->ppbj_no, 'nama_vendor' => 'Vendor', 'deskripsi_pengadaan' => 'Lampiran', 'pic' => 'Buyer', 'created_by_user_id' => $this->admin->id]);
        $sp->ppbjs()->attach($this->pr->id);
        $id = (string) Str::uuid();
        Storage::disk('local')->put('procurement-details/test.pdf', 'synthetic-pdf');
        ProcurementDetailAttachment::create(['id' => $id, 'kind' => 'sp', 'document_id' => $sp->id, 'uploaded_by' => $this->admin->id, 'original_name' => 'Local.pdf', 'path' => 'procurement-details/test.pdf', 'mime' => 'application/pdf', 'size' => 13, 'sha256' => hash('sha256', 'synthetic-pdf'), 'method' => 'manual']);
        app(ProcurementSearchSync::class)->localFiles(10);
        $source = DB::table('procurement_search_sources')->where('source_key', $id)->first();
        $this->assertNotNull($source);
        $this->assertSame('pending', $source->state);
        $this->assertNotNull(app(ProcurementOcrQueue::class)->next($source->id));
        app(ProcurementSearchWriter::class)->append($source, ['page' => 1, 'pages' => 1, 'text' => 'isifilelokal', 'done' => true]);
        $this->getJson(route('procurement.search', ['q' => 'isifilelokal', 'scope' => 'sp']))->assertOk()->assertJsonPath('total', 1);
        $this->get(route('procurement.search.file', ['source' => $source->id]))->assertOk();
        ProcurementDetailAttachment::whereKey($id)->delete();
        app(ProcurementSearchSync::class)->localFiles(10);
        $this->getJson(route('procurement.search', ['q' => 'isifilelokal']))->assertOk()->assertJsonPath('total', 0);
    }

    public function test_office_asset_extraction_uses_private_flat_paths_and_releases_temporary_files(): void
    {
        $root = storage_path('framework/testing');
        if (! is_dir($root)) {
            mkdir($root, 0700, true);
        }$path = tempnam($root, 'office-');
        $zip = new \ZipArchive;
        $zip->open($path, \ZipArchive::OVERWRITE);
        $png = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6nN0AAAAASUVORK5CYII=');
        $zip->addFromString('word/media/image1.png', $png);
        $zip->close();
        $asset = null;
        try {
            $result = app(ProcurementOfficeImages::class)->read($path, 'word/media/image1.png', function ($file, $extension) use (&$asset) {
                $asset = $file;
                $this->assertSame('png', $extension);
                $this->assertFileExists($file);

                return ['text' => 'gambarberhasil', 'confidence' => 92];
            });
            $this->assertSame('gambarberhasil', $result['text']);
            $this->assertNull($result['error']);
            $this->assertFileDoesNotExist($asset);
        } finally {
            unlink($path);
        }
    }
}
