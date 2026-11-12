<?php

namespace Tests\Feature;

use App\Models\ProcurementDetailAttachment;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use App\Support\AttachmentIntent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\PhpWord;
use Tests\TestCase;

class ProcurementDetailAttachmentTest extends TestCase
{
    use RefreshDatabase;

    private User $owner;

    private array $temporary = [];

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
        $this->owner = User::factory()->create(['name' => 'Pengelola Rincian', 'department' => 'umum', 'role' => 'user']);
        $this->actingAs($this->owner);
    }

    protected function tearDown(): void
    {
        foreach ($this->temporary as $path) {
            @unlink($path);
        }
        parent::tearDown();
    }

    private function docx(): UploadedFile
    {
        $word = new PhpWord;
        $section = $word->addSection();
        $section->addText('Rincian kebutuhan ATK');
        $table = $section->addTable();
        foreach ([['Nama barang', 'Jumlah', 'Satuan'], ['Kertas A4 80 gram', '20', 'Rim'], ['Ballpoint biru', '12', 'Buah']] as $row) {
            $table->addRow();
            foreach ($row as $cell) {
                $table->addCell(2000)->addText($cell);
            }
        }
        $path = tempnam(sys_get_temp_dir(), 'detail-docx-');
        $this->temporary[] = $path;
        IOFactory::createWriter($word, 'Word2007')->save($path);

        return new UploadedFile($path, 'rincian-atk.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', null, true);
    }

    private function document(string $kind): Sp|Spph
    {
        $attributes = ['created_by_user_id' => $this->owner->id, 'pic' => $this->owner->name,
            'sequence_number' => 901, 'nama_vendor' => 'Vendor Kantor', 'deskripsi_pengadaan' => 'ATK sesuai lampiran'];

        return $kind === 'sp' ? Sp::create($attributes + ['nomor_sp' => '901/PKU-XI/SP/2026', 'tanggal_sp' => '2026-11-09', 'numbering_mode' => 'auto'])
            : Spph::create($attributes + ['nomor_spph' => '901/PKU-XI/SPPH/2026', 'tanggal' => '2026-11-09']);
    }

    public function test_excel_csv_and_images_can_be_uploaded_reviewed_and_found_in_both_modules(): void
    {
        foreach (['sp', 'spph'] as $kind) {
            $document = $this->document($kind);
            foreach (['xlsx', 'csv', 'png'] as $extension) {
                $file = \Tests\Support\DocumentUploadFixture::make($extension);
                $this->temporary[] = $file->getRealPath();
                $r = $this->postJson(route('procurement.details.upload', $kind), ['document_id' => $document->id, 'document_file' => $file, 'extracted_text' => 'Plastik industri 73001234', 'method' => 'image-ocr'])->assertCreated();
                $item = $r->json('attachment');
                $this->assertStringContainsString('Plastik industri', $item['text']);
                $this->putJson($item['review_url'], ['text' => $item['text'], 'version' => $item['version']])->assertOk();
            }
            $rows = $this->get(route($kind.'.index', ['search' => '73001234']))->assertOk()->viewData($kind === 'sp' ? 'sps' : 'spphs');
            $this->assertContains($document->id, $rows->modelKeys());
        }
    }

    private function upload(string $kind, ?int $id = null): ProcurementDetailAttachment
    {
        $response = $this->postJson(route('procurement.details.upload', $kind), ['document_file' => $this->docx()] + ($id ? ['document_id' => $id] : []))->assertCreated();

        return ProcurementDetailAttachment::findOrFail($response->json('attachment.id'));
    }

    public function test_new_upload_returns_the_persisted_version_for_immediate_confirmation_and_audit(): void
    {
        foreach (['sp', 'spph'] as $kind) {
            $document = $this->document($kind);
            foreach ([null, $document->id] as $documentId) {
                foreach (['docx', 'pdf'] as $format) {
                    $file = $format === 'docx' ? $this->docx() : UploadedFile::fake()->createWithContent('rincian.pdf', "%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF");
                    $response = $this->postJson(route('procurement.details.upload', $kind), [
                        'document_file' => $file, 'document_id' => $documentId,
                        'extracted_text' => 'Kertas A4 20 rim', 'method' => 'pdf-text',
                    ])->assertCreated()->assertJsonPath('attachment.version', 1);
                    $item = $response->json('attachment');
                    $this->assertSame(1, ProcurementDetailAttachment::findOrFail($item['id'])->version);
                    $log = \App\Models\ActivityLog::where('action', 'detail_uploaded')->latest('id')->firstOrFail();
                    $this->assertSame(1, $log->changes['version']);
                    $this->putJson($item['review_url'], ['text' => $item['text'], 'version' => $item['version']])
                        ->assertOk()->assertJsonPath('attachment.reviewed', true)->assertJsonPath('attachment.version', 2);
                    $this->putJson($item['review_url'], ['text' => 'Perubahan usang', 'version' => $item['version']])->assertConflict();
                }
            }
        }
    }

    public function test_search_upload_confirmation_delete_and_defer_have_independent_request_budgets(): void
    {
        for ($i = 0; $i < 10; $i++) {
            $this->getJson(route('procurement.search', ['q' => 'alat']))->assertOk();
        }
        $sp = $this->document('sp');
        $attachment = $this->upload('sp', $sp->id);
        for ($version = 1; $version <= 10; $version++) {
            $this->putJson(route('procurement.details.review', $attachment), ['text' => 'Koreksi '.$version, 'version' => $version])->assertOk();
        }
        $this->deleteJson(route('procurement.details.delete', $attachment))->assertOk();
        $this->postJson(route('procurement.details.defer', ['sp', $sp->id]))->assertOk();
        $this->getJson(route('procurement.search', ['q' => 'alat']))->assertOk();
    }

    public function test_upload_limit_still_applies_per_user_without_blocking_confirmation_or_another_user(): void
    {
        $attachment = $this->upload('sp');
        for ($i = 0; $i < 9; $i++) {
            $this->postJson(route('procurement.details.upload', 'spph'), [])->assertUnprocessable();
        }
        $this->postJson(route('procurement.details.upload', 'sp'), [])->assertTooManyRequests();
        $this->putJson(route('procurement.details.review', $attachment), ['text' => 'Kertas tetap bisa dikonfirmasi', 'version' => 1])->assertOk();
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']));
        $this->upload('spph');
    }

    public function test_intent_detects_indonesian_english_rich_text_and_explicit_negations(): void
    {
        foreach (['ATK terlampir', '<p>Rincian</p><p>menyusul</p>', 'lihat lampiran', 'sesuai lampiran', 'dilampirkan', 'ter lampir', 'lampiran', 'attachment to follow', 'as attached', 'detail akan menyusul'] as $value) {
            $this->assertTrue(AttachmentIntent::detect($value), $value);
        }
        foreach (['Kertas A4', 'tanpa lampiran', 'tidak perlu lampiran', 'tidak ada lampiran', 'Pengadaan alat tulis kantor'] as $value) {
            $this->assertFalse(AttachmentIntent::detect($value), $value);
        }
    }

    public function test_word_structure_is_read_and_confirmed_draft_can_be_claimed_by_new_spph(): void
    {
        $attachment = $this->upload('spph');
        $this->assertSame('docx-structure', $attachment->method);
        $this->assertStringContainsString("Kertas A4 80 gram\t20\tRim", $attachment->extracted_text);
        Storage::disk('local')->assertExists($attachment->path);
        $this->assertNull($attachment->document_id);
        $this->assertNull($attachment->reviewed_at);
        $this->putJson(route('procurement.details.review', $attachment), ['text' => $attachment->extracted_text, 'version' => 1])->assertOk()->assertJsonPath('attachment.reviewed', true);
        $this->postJson(route('spph.store'), [
            'nomor_spph' => '902/PKU-XI/SPPH/2026', 'tanggal' => '2026-11-09', 'nama_vendor' => 'Vendor Kantor',
            'deskripsi_pengadaan' => 'ATK terlampir', 'pic' => $this->owner->name,
            'detail_attachment_token' => $attachment->id, 'detail_upload_choice' => 'now',
        ])->assertOk();
        $document = Spph::firstOrFail();
        $this->assertSame($document->id, (int) $attachment->fresh()->document_id);
        $response = $this->get(route('spph.index', ['search' => 'Kertas A4']))->assertOk()->assertSee('Ditemukan di rincian-atk.docx');
        $this->assertSame([$document->id], $response->viewData('spphs')->modelKeys());
        $this->assertSame('ready', $response->viewData('detailSummaries')[$document->id]['state']);
        $this->get(route('procurement.details.download', $attachment))->assertDownload('rincian-atk.docx');
    }

    public function test_both_modules_search_only_reviewed_contents_and_keep_exports_in_sync(): void
    {
        foreach (['sp' => 'sps', 'spph' => 'spphs'] as $kind => $key) {
            $document = $this->document($kind);
            $attachment = $this->upload($kind, $document->id);
            $this->assertSame([], $this->get(route($kind.'.index', ['search' => 'Kertas A4']))->assertOk()->viewData($key)->modelKeys());
            $this->putJson(route('procurement.details.review', $attachment), ['text' => "Kertas A4 80 gram\t20\tRim\n<script>alert(1)</script>", 'version' => 1])->assertOk();
            $this->assertSame([$document->id], $this->get(route($kind.'.index', ['search' => 'A4 Kertas']))->assertOk()->viewData($key)->modelKeys());
            $content = $this->get(route($kind.'.export', ['search' => 'Kertas A4']))->assertOk()->streamedContent();
            $this->assertStringContainsString($document->nomor_sp ?? $document->nomor_spph, $content);
            $this->get(route($kind.'.index', ['search' => 'alert']))->assertOk()->assertDontSee('<script>alert(1)</script>', false)->assertSee('&lt;script&gt;alert(1)&lt;/script&gt;', false);
            $this->getJson(route('procurement.details.show', [$kind, $document->id]))->assertOk()->assertJsonPath('summary.state', 'ready');
        }
    }

    public function test_defer_does_not_block_save_and_survives_edit_without_a_new_upload_choice(): void
    {
        $payload = ['nomor_spph' => '903/PKU-XI/SPPH/2026', 'tanggal' => '2026-11-09', 'nama_vendor' => 'Vendor Kantor',
            'deskripsi_pengadaan' => 'ATK', 'pic' => $this->owner->name, 'items' => [['nama_barang' => '<p>Terlampir</p>']], 'detail_upload_choice' => 'later'];
        $this->postJson(route('spph.store'), $payload)->assertOk();
        $document = Spph::firstOrFail();
        $this->getJson(route('procurement.details.show', ['spph', $document->id]))->assertOk()->assertJsonPath('summary.state', 'deferred');
        unset($payload['detail_upload_choice']);
        $this->putJson(route('spph.update', $document), $payload)->assertOk();
        $this->assertDatabaseHas('procurement_detail_requirements', ['kind' => 'spph', 'document_id' => $document->id, 'state' => 'deferred']);
        $sp = $this->document('sp');
        $this->postJson(route('procurement.details.defer', ['sp', $sp->id]))->assertOk();
        $this->get(route('sp.index'))->assertOk()->assertSee('Lampiran menyusul');
    }

    public function test_foreign_or_wrong_module_or_expired_drafts_cannot_be_claimed(): void
    {
        $attachment = $this->upload('sp');
        $payload = ['nomor_spph' => '904/PKU-XI/SPPH/2026', 'tanggal' => '2026-11-09', 'nama_vendor' => 'Vendor Kantor',
            'deskripsi_pengadaan' => 'ATK terlampir', 'pic' => $this->owner->name, 'detail_attachment_token' => $attachment->id];
        $this->postJson(route('spph.store'), $payload)->assertUnprocessable()->assertJsonValidationErrors('detail_attachment_token');
        $this->assertDatabaseCount('spphs', 0);
        $attachment->update(['kind' => 'spph', 'created_at' => now()->subDays(3)]);
        $this->postJson(route('spph.store'), $payload)->assertUnprocessable();
        $attachment->update(['created_at' => now()]);
        $other = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($other)->postJson(route('spph.store'), $payload)->assertUnprocessable();
        $this->assertDatabaseCount('spphs', 0);
        $this->assertNull($attachment->fresh()->document_id);
    }

    public function test_ownership_read_only_department_and_deleted_document_are_enforced(): void
    {
        $sp = $this->document('sp');
        $attachment = $this->upload('sp', $sp->id);
        $other = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($other)->getJson(route('procurement.details.show', ['sp', $sp->id]))->assertOk()->assertJsonPath('can_manage', false);
        $this->putJson(route('procurement.details.review', $attachment), ['text' => 'X', 'version' => 1])->assertForbidden();
        $this->deleteJson(route('procurement.details.delete', $attachment))->assertForbidden();
        $this->postJson(route('procurement.details.upload', 'sp'), ['document_id' => $sp->id, 'document_file' => $this->docx()])->assertForbidden();
        $this->postJson(route('procurement.details.defer', ['sp', $sp->id]))->assertForbidden();
        $operational = User::factory()->create(['department' => 'operasional', 'role' => 'user']);
        $this->actingAs($operational)->getJson(route('procurement.details.download', $attachment))->assertForbidden();
        $this->actingAs($this->owner);
        Cache::put('simonpr:read_only_mode', true);
        $this->postJson(route('procurement.details.defer', ['sp', $sp->id]))->assertForbidden();
        Cache::forget('simonpr:read_only_mode');
        $sp->delete();
        $this->getJson(route('procurement.details.download', $attachment))->assertNotFound();
        $this->putJson(route('procurement.details.review', $attachment), ['text' => 'X', 'version' => 1])->assertNotFound();
    }

    public function test_stale_review_is_rejected_and_deleting_removes_search_text_and_private_file(): void
    {
        $sp = $this->document('sp');
        $attachment = $this->upload('sp', $sp->id);
        $this->putJson(route('procurement.details.review', $attachment), ['text' => 'Pensil 2B', 'version' => '1'])->assertOk()->assertJsonPath('attachment.version', 2);
        $this->putJson(route('procurement.details.review', $attachment), ['text' => 'Salah', 'version' => 1])->assertConflict();
        $this->assertSame('Pensil 2B', $attachment->fresh()->reviewed_text);
        $this->deleteJson(route('procurement.details.delete', $attachment))->assertOk();
        Storage::disk('local')->assertMissing($attachment->path);
        $this->assertSame([], $this->get(route('sp.index', ['search' => 'Pensil']))->assertOk()->viewData('sps')->modelKeys());
        $this->assertDatabaseHas('activity_logs', ['action' => 'detail_removed']);
    }

    public function test_invalid_files_and_too_many_attachments_do_not_leave_private_orphans(): void
    {
        $this->withoutMiddleware(\Illuminate\Routing\Middleware\ThrottleRequests::class);
        $this->postJson(route('procurement.details.upload', 'sp'), ['document_file' => UploadedFile::fake()->create('evil.exe', 5)])->assertUnprocessable();
        $this->postJson(route('procurement.details.upload', 'sp'), ['document_file' => UploadedFile::fake()->create('huge.pdf', 10241, 'application/pdf')])->assertUnprocessable();
        $this->postJson(route('procurement.details.upload', 'sp'), ['document_file' => UploadedFile::fake()->createWithContent('bad.docx', 'not a document')])->assertUnprocessable();
        $sp = $this->document('sp');
        foreach (range(1, 5) as $_) {
            $this->upload('sp', $sp->id);
        }
        $this->postJson(route('procurement.details.upload', 'sp'), ['document_file' => $this->docx(), 'document_id' => $sp->id])->assertUnprocessable();
        $this->assertDatabaseCount('procurement_detail_attachments', 5);
        $this->assertCount(5, Storage::disk('local')->allFiles('procurement-details'));
    }

    public function test_prune_removes_only_expired_unclaimed_files(): void
    {
        $old = $this->upload('sp');
        $old->update(['created_at' => now()->subDays(3)]);
        $fresh = $this->upload('sp');
        $linked = $this->upload('sp', $this->document('sp')->id);
        $linked->update(['created_at' => now()->subDays(3)]);
        $this->artisan('procurement:prune-detail-drafts')->assertSuccessful();
        $this->assertModelMissing($old);
        Storage::disk('local')->assertMissing($old->path);
        $this->assertModelExists($fresh);
        $this->assertModelExists($linked);
        Storage::disk('local')->assertExists($linked->path);
    }
}
