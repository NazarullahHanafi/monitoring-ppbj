<?php

namespace Tests\Feature;

use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class PrArchiveIntegrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Cache::flush();
    }

    public function test_archive_status_is_safe_when_integration_is_not_configured(): void
    {
        config(['services.pr_archive.base_url' => null]);
        Http::preventStrayRequests();

        [$user, $ppbjId] = $this->generalUserAndPpbj('PR-ARSIP-001');

        $this->actingAs($user)
            ->getJson("/ppbj/{$ppbjId}/archive")
            ->assertOk()
            ->assertJson([
                'ppbj_no' => 'PR-ARSIP-001',
                'nomor_pr' => 'PR-ARSIP-001',
                'configured' => false,
                'state' => 'unconfigured',
                'has_archive' => false,
                'document_count' => 0,
            ]);
    }

    public function test_archive_documents_are_loaded_and_normalised_from_external_system(): void
    {
        config([
            'services.pr_archive.base_url' => 'https://arsip.example.test',
            'services.pr_archive.token' => 'secret-archive-token',
            'services.pr_archive.pr_path' => '/api/pr/documents',
        ]);

        Http::fake([
            'https://arsip.example.test/*' => Http::response([
                'has_archive' => true,
                'document_count' => 2,
                'documents' => [
                    [
                        'id' => 10,
                        'nama_dokumen' => 'Scan Purchase Request',
                        'type' => 'PDF',
                        'location' => [
                            'label' => 'Rak Arsip 01 > Tingkat 2 > Box 5',
                            'rak' => 'Rak Arsip 01',
                            'tingkat' => 2,
                            'box' => 5,
                            'box_code' => 'R01-T02-B005',
                        ],
                        'download_url' => '/documents/10/download',
                    ],
                    [
                        'id' => 11,
                        'title' => 'Laporan Pelaksanaan',
                        'file_url' => 'https://cdn.example.test/laporan.pdf',
                    ],
                ],
            ]),
        ]);

        [$user, $ppbjId] = $this->generalUserAndPpbj('PR/2026/001');

        $this->actingAs($user)
            ->getJson("/ppbj/{$ppbjId}/archive")
            ->assertOk()
            ->assertJson([
                'state' => 'available',
                'has_archive' => true,
                'document_count' => 2,
                'documents' => [
                    [
                        'name' => 'Scan Purchase Request',
                        'location' => [
                            'label' => 'Rak Arsip 01 > Tingkat 2 > Box 5',
                            'box_code' => 'R01-T02-B005',
                        ],
                        'download_url' => 'https://arsip.example.test/documents/10/download',
                        'preview_gateway_url' => '/archive-gateway?pr=PR%2F2026%2F001&file=10&action=preview',
                        'download_gateway_url' => '/archive-gateway?pr=PR%2F2026%2F001&file=10&action=download',
                    ],
                    [
                        'name' => 'Laporan Pelaksanaan',
                        'download_url' => 'https://cdn.example.test/laporan.pdf',
                    ],
                ],
            ]);

        Http::assertSent(function (Request $request) {
            return str_contains($request->url(), '/api/pr/documents?nomor_pr=PR%2F2026%2F001')
                && $request->hasHeader('Authorization', 'Bearer secret-archive-token');
        });
    }

    public function test_missing_archive_and_external_failure_do_not_break_simonpr(): void
    {
        config([
            'services.pr_archive.base_url' => 'https://arsip.example.test',
            'services.pr_archive.pr_path' => '/api/pr/documents',
        ]);

        [$user, $emptyPpbjId] = $this->generalUserAndPpbj('PR-EMPTY');
        $failedPpbjId = DB::table('ppbj')->insertGetId([
            'ppbj_no' => 'PR-FAILED',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Http::fake(function (Request $request) {
            return str_contains($request->url(), 'PR-EMPTY')
                ? Http::response([], 404)
                : Http::response(['message' => 'maintenance'], 503);
        });

        $this->actingAs($user)
            ->getJson("/ppbj/{$emptyPpbjId}/archive")
            ->assertOk()
            ->assertJson(['state' => 'empty', 'has_archive' => false]);

        $this->actingAs($user)
            ->getJson("/ppbj/{$failedPpbjId}/archive")
            ->assertOk()
            ->assertJson(['state' => 'unavailable', 'has_archive' => false]);
    }

    public function test_archive_gateway_resolves_a_short_lived_signed_url_before_redirecting(): void
    {
        config([
            'services.pr_archive.base_url' => 'https://arsip.example.test',
            'services.pr_archive.pr_path' => '/api/pr/documents',
        ]);

        $target = 'https://arsip.example.test/api/archive/attachments/71/download?expires=1791435600&signature=fresh';

        Http::fake([
            'https://arsip.example.test/*' => Http::response([
                'has_archive' => true,
                'document_count' => 1,
                'documents' => [[
                    'id' => 71,
                    'name' => 'Lampiran pengadaan.pdf',
                    'preview_url' => 'https://arsip.example.test/api/archive/attachments/71/preview?expires=1791435600&signature=fresh',
                    'download_url' => $target,
                ]],
            ]),
        ]);

        [$user] = $this->generalUserAndPpbj('PKB/PR-26/CON/0227');

        $response = $this->actingAs($user)->get(route('archive.gateway', [
            'pr' => 'PKB/PR-26/CON/0227',
            'file' => 71,
            'action' => 'download',
        ]));

        $response->assertRedirect($target)
            ->assertHeader('Cache-Control', 'max-age=0, no-store, private')
            ->assertHeader('X-Content-Type-Options', 'nosniff');

        Http::assertSentCount(1);
    }

    public function test_archive_gateway_rejects_an_external_redirect_target(): void
    {
        config([
            'services.pr_archive.base_url' => 'https://arsip.example.test',
            'services.pr_archive.pr_path' => '/api/pr/documents',
        ]);

        Http::fake([
            'https://arsip.example.test/*' => Http::response([
                'has_archive' => true,
                'document_count' => 1,
                'documents' => [[
                    'id' => 72,
                    'name' => 'Target tidak sah.pdf',
                    'download_url' => 'https://malicious.example.test/steal',
                ]],
            ]),
        ]);

        [$user] = $this->generalUserAndPpbj('PR-UNTRUSTED');

        $this->actingAs($user)
            ->get(route('archive.gateway', [
                'pr' => 'PR-UNTRUSTED',
                'file' => 72,
                'action' => 'download',
            ]))
            ->assertNotFound();
    }

    public function test_archive_gateway_requires_authentication(): void
    {
        $this->get(route('archive.gateway', [
            'pr' => 'PR-PRIVATE',
            'file' => 1,
            'action' => 'download',
        ]))->assertRedirect(route('login'));
    }

    public function test_archive_endpoint_is_only_available_to_umum_department(): void
    {
        config(['services.pr_archive.base_url' => null]);
        [, $ppbjId] = $this->generalUserAndPpbj('PR-UMUM-ONLY');
        $operationalUser = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $this->actingAs($operationalUser)
            ->getJson("/ppbj/{$ppbjId}/archive")
            ->assertForbidden();
    }

    public function test_pr_page_contains_archive_status_interface(): void
    {
        $ppbjView = file_get_contents(resource_path('views/ppbj/index.blade.php'));
        $ppbjScript = file_get_contents(public_path('assets/ppbj/ppbj.js'));
        $torprView = file_get_contents(resource_path('views/torpr/index.blade.php'));

        $this->assertStringContainsString('data-archive-status', $ppbjView);
        $this->assertStringContainsString('id="detailArchiveCard"', $ppbjView);
        $this->assertStringContainsString('assets/ppbj/ppbj.js', $ppbjView);
        $this->assertStringContainsString('/ppbj/${id}/archive', $ppbjScript);
        $this->assertStringContainsString('Preview', $ppbjScript);
        $this->assertStringContainsString('Lokasi fisik:', $ppbjScript);
        $this->assertStringNotContainsString('data-archive-status', $torprView);
        $this->assertStringNotContainsString('/torpr/${id}/archive', $torprView);
    }

    public function test_sp_and_spph_archive_endpoints_load_linked_pr_documents_on_demand(): void
    {
        config([
            'services.pr_archive.base_url' => 'https://arsip.example.test',
            'services.pr_archive.pr_path' => '/api/pr/documents',
        ]);

        Http::fake(function (Request $request) {
            $prNumber = str_contains($request->url(), 'PR-MULTI-002') ? 'PR-MULTI-002' : 'PR-MULTI-001';

            return Http::response([
                'has_archive' => true,
                'document_count' => 1,
                'documents' => [[
                    'id' => $prNumber === 'PR-MULTI-001' ? 101 : 102,
                    'name' => 'Lampiran '.$prNumber,
                    'preview_url' => '/api/archive/'.rawurlencode($prNumber).'/preview',
                ]],
            ]);
        });

        [$user, $firstPpbjId] = $this->generalUserAndPpbj('PR-MULTI-001');
        $secondPpbjId = DB::table('ppbj')->insertGetId([
            'ppbj_no' => 'PR-MULTI-002',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $sp = Sp::create([
            'nomor_sp' => '001/PKU-IX/SP/2026',
            'sequence_number' => 1,
            'tanggal_sp' => '2026-09-22',
            'nomor_pr' => 'PR-MULTI-001',
            'nama_vendor' => 'PT Arsip Cepat',
            'deskripsi_pengadaan' => 'Pengujian arsip SP',
            'pic' => 'Tester',
        ]);
        $sp->ppbjs()->attach([
            $firstPpbjId => ['urutan' => 1],
            $secondPpbjId => ['urutan' => 2],
        ]);

        $spph = Spph::create([
            'nomor_spph' => '001/PKU-IX/SPPH/2026',
            'sequence_number' => 1,
            'tanggal' => '2026-09-22',
            'nomor_pr' => 'PR-MULTI-001',
            'nama_vendor' => 'PT Arsip Cepat',
            'deskripsi_pengadaan' => 'Pengujian arsip SPPH',
            'pic' => 'Tester',
        ]);
        $spph->ppbjs()->attach($firstPpbjId, ['urutan' => 1]);

        $spResponse = $this->actingAs($user)
            ->getJson(route('sp.archive', $sp))
            ->assertOk()
            ->assertJsonPath('state', 'available')
            ->assertJsonPath('document_count', 2)
            ->assertJsonPath('documents.0.nomor_pr', 'PR-MULTI-001')
            ->assertJsonPath('documents.1.nomor_pr', 'PR-MULTI-002');
        $spResponse->assertJsonMissingPath('sources.0.documents');
        $spResponse->assertJsonMissingPath('sources.0.packages');

        $this->actingAs($user)
            ->getJson(route('spph.archive', $spph))
            ->assertOk()
            ->assertJsonPath('state', 'available')
            ->assertJsonPath('document_count', 1)
            ->assertJsonPath('documents.0.nomor_pr', 'PR-MULTI-001');

        Http::assertSentCount(2);
    }

    private function generalUserAndPpbj(string $prNumber): array
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        $ppbjId = DB::table('ppbj')->insertGetId([
            'ppbj_no' => $prNumber,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return [$user, $ppbjId];
    }
}
