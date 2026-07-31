<?php

namespace Tests\Feature;

use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ArchiveAttachmentUploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_sp_attachment_is_uploaded_to_archive_api_with_audit_metadata(): void
    {
        config([
            'services.pr_archive.base_url' => 'https://arsip.example.test',
            'services.pr_archive.token' => 'secret-token',
            'services.pr_archive.upload_path' => '/api/documents',
        ]);

        Http::fake([
            'https://arsip.example.test/*' => Http::response([
                'document' => [
                    'id' => 123,
                    'nama_dokumen' => 'Dokumen SP',
                    'download_url' => '/documents/123/preview',
                ],
            ], 201),
        ]);

        $user = User::factory()->create([
            'name' => 'Nazar',
            'email' => 'nazar@example.test',
            'department' => 'umum',
        ]);

        $sp = Sp::create([
            'nomor_sp' => '325/PKU-VII/SP/2026',
            'sequence_number' => 325,
            'tanggal_sp' => '2026-07-20',
            'nilai_sp' => 12000000,
            'nomor_pr' => 'PKB/PR-26/CON/0401',
            'nama_vendor' => 'Vendor Arsip',
            'deskripsi_pengadaan' => 'Pengadaan dokumen pendukung',
            'pic' => 'Nazar',
        ]);

        $this->actingAs($user)
            ->postJson(route('sp.archive-attachment', $sp), [
                'document_type' => 'Dokumen SP',
                'notes' => 'Lampiran untuk audit',
                'document_file' => UploadedFile::fake()->create('sp.docx', 120, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
            ])
            ->assertCreated()
            ->assertJson([
                'state' => 'uploaded',
                'message' => 'Dokumen berhasil dikirim ke Sistem Arsip.',
            ]);

        Http::assertSent(function (Request $request) {
            $body = $request->body();

            return $request->method() === 'POST'
                && $request->url() === 'https://arsip.example.test/api/documents'
                && $request->hasHeader('Authorization', 'Bearer secret-token')
                && $request->hasFile('file', null, 'sp.docx')
                && str_contains($body, 'name="source_module"')
                && str_contains($body, 'SP')
                && str_contains($body, 'name="nomor_pr"')
                && str_contains($body, 'PKB/PR-26/CON/0401')
                && str_contains($body, 'name="nomor_sp"')
                && str_contains($body, '325/PKU-VII/SP/2026')
                && str_contains($body, 'name="jenis_dokumen"')
                && str_contains($body, 'Dokumen SP');
        });
    }

    public function test_spph_attachment_is_uploaded_to_archive_api_with_multiple_vendor_context(): void
    {
        config([
            'services.pr_archive.base_url' => 'https://arsip.example.test',
            'services.pr_archive.upload_path' => '/api/documents',
        ]);

        Http::fake([
            'https://arsip.example.test/*' => Http::response([
                'data' => [
                    'id' => 124,
                    'nama_dokumen' => 'Penawaran Vendor',
                    'download_url' => '/documents/124/preview',
                ],
            ], 201),
        ]);

        $user = User::factory()->create([
            'name' => 'Nazar',
            'department' => 'umum',
        ]);

        $spph = Spph::create([
            'nomor_spph' => '570/PKU-VII/SPPH/2026',
            'sequence_number' => 570,
            'tanggal' => '2026-07-20',
            'nomor_pr' => 'PKB/PR-26/CON/0402',
            'nama_vendor' => 'Vendor Utama',
            'vendor_names' => ['Vendor Utama', 'Vendor Pembanding'],
            'deskripsi_pengadaan' => 'Pengadaan pembanding vendor',
            'pic' => 'Nazar',
        ]);

        $this->actingAs($user)
            ->postJson(route('spph.archive-attachment', $spph), [
                'document_type' => 'Penawaran Vendor',
                'document_file' => UploadedFile::fake()->create('penawaran.xlsx', 100, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
            ])
            ->assertCreated()
            ->assertJson(['state' => 'uploaded']);

        Http::assertSent(function (Request $request) {
            $body = $request->body();

            return $request->method() === 'POST'
                && $request->hasFile('file', null, 'penawaran.xlsx')
                && str_contains($body, 'name="source_module"')
                && str_contains($body, 'SPPH')
                && str_contains($body, 'name="nomor_spph"')
                && str_contains($body, '570/PKU-VII/SPPH/2026')
                && str_contains($body, 'Vendor Pembanding');
        });
    }

    public function test_attachment_upload_is_safe_when_archive_api_is_not_configured(): void
    {
        config(['services.pr_archive.base_url' => null]);
        Http::preventStrayRequests();

        $user = User::factory()->create(['department' => 'umum']);
        $sp = Sp::create([
            'nomor_sp' => '326/PKU-VII/SP/2026',
            'sequence_number' => 326,
            'tanggal_sp' => '2026-07-20',
            'nomor_pr' => 'PKB/PR-26/CON/0403',
            'nama_vendor' => 'Vendor Aman',
            'deskripsi_pengadaan' => 'Pengadaan aman',
            'pic' => $user->name,
        ]);

        $this->actingAs($user)
            ->postJson(route('sp.archive-attachment', $sp), [
                'document_type' => 'Dokumen SP',
                'document_file' => UploadedFile::fake()->create('sp.pdf', 80, 'application/pdf'),
            ])
            ->assertStatus(503)
            ->assertJson([
                'configured' => false,
                'state' => 'unconfigured',
            ]);
    }

    public function test_sp_and_spph_pages_contain_archive_upload_button(): void
    {
        $spView = file_get_contents(resource_path('views/sp/index.blade.php'));
        $spphView = file_get_contents(resource_path('views/spph/index.blade.php'));

        $this->assertStringContainsString('openArchiveAttachmentUpload', $spView);
        $this->assertStringContainsString('route(\'sp.archive-attachment\'', $spView);
        $this->assertStringContainsString('openArchiveAttachmentUpload', $spphView);
        $this->assertStringContainsString('route(\'spph.archive-attachment\'', $spphView);
    }
}
