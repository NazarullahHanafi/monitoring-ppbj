<?php

namespace Tests\Feature;

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

        [$user, $prId] = $this->operationalUserAndPr('PR-ARSIP-001');

        $this->actingAs($user)
            ->getJson("/torpr/{$prId}/archive")
            ->assertOk()
            ->assertJson([
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
            'services.pr_archive.pr_path' => '/api/pr/{nomor_pr}/documents',
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

        [$user, $prId] = $this->operationalUserAndPr('PR/2026/001');

        $this->actingAs($user)
            ->getJson("/torpr/{$prId}/archive")
            ->assertOk()
            ->assertJson([
                'state' => 'available',
                'has_archive' => true,
                'document_count' => 2,
                'documents' => [
                    [
                        'name' => 'Scan Purchase Request',
                        'download_url' => 'https://arsip.example.test/documents/10/download',
                    ],
                    [
                        'name' => 'Laporan Pelaksanaan',
                        'download_url' => 'https://cdn.example.test/laporan.pdf',
                    ],
                ],
            ]);

        Http::assertSent(function (Request $request) {
            return str_contains($request->url(), 'PR%2F2026%2F001')
                && $request->hasHeader('Authorization', 'Bearer secret-archive-token');
        });
    }

    public function test_missing_archive_and_external_failure_do_not_break_simonpr(): void
    {
        config([
            'services.pr_archive.base_url' => 'https://arsip.example.test',
            'services.pr_archive.pr_path' => '/api/pr/{nomor_pr}/documents',
        ]);

        [$user, $emptyPrId] = $this->operationalUserAndPr('PR-EMPTY');
        $failedPrId = DB::table('torprs')->insertGetId([
            'nomor_pr' => 'PR-FAILED',
            'created_by_user_id' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Http::fake(function (Request $request) {
            return str_contains($request->url(), 'PR-EMPTY')
                ? Http::response([], 404)
                : Http::response(['message' => 'maintenance'], 503);
        });

        $this->actingAs($user)
            ->getJson("/torpr/{$emptyPrId}/archive")
            ->assertOk()
            ->assertJson(['state' => 'empty', 'has_archive' => false]);

        $this->actingAs($user)
            ->getJson("/torpr/{$failedPrId}/archive")
            ->assertOk()
            ->assertJson(['state' => 'unavailable', 'has_archive' => false]);
    }

    public function test_pr_page_contains_archive_status_interface(): void
    {
        $view = file_get_contents(resource_path('views/torpr/index.blade.php'));

        $this->assertStringContainsString('data-archive-status', $view);
        $this->assertStringContainsString('id="infoArchiveCard"', $view);
        $this->assertStringContainsString('/torpr/${id}/archive', $view);
        $this->assertStringContainsString('Buka PDF', $view);
    }

    private function operationalUserAndPr(string $prNumber): array
    {
        $user = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $prId = DB::table('torprs')->insertGetId([
            'nomor_pr' => $prNumber,
            'created_by_user_id' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return [$user, $prId];
    }
}
