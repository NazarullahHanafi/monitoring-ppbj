<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\PrArchiveService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ArchiveGatewaySecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_operational_cannot_download_another_users_archive_even_with_known_file_id(): void
    {
        $creator = User::factory()->create(['department' => 'operasional']);
        $other = User::factory()->create(['department' => 'operasional']);
        DB::table('torprs')->insert(['nomor_pr' => 'PRIVATE/ARCHIVE', 'created_by_user_id' => $creator->id]);
        // Cached API metadata or knowing a file ID must not bypass local authorization.
        $this->mock(PrArchiveService::class)->shouldNotReceive('findByPrNumber');
        Http::preventStrayRequests();

        foreach (['download', 'preview', 'package'] as $action) {
            $this->actingAs($other)->getJson(route('archive.gateway', [
                'pr' => 'PRIVATE/ARCHIVE', 'file' => 'known-file', 'action' => $action,
            ]))->assertForbidden();
        }
    }

    public function test_unknown_department_is_rejected_before_archive_service_is_called(): void
    {
        $user = User::factory()->create(['department' => 'lainnya']);
        $this->mock(PrArchiveService::class)->shouldNotReceive('findByPrNumber');

        $this->actingAs($user)->getJson(route('archive.gateway', [
            'pr' => 'PRIVATE/ARCHIVE', 'file' => 'known-file', 'action' => 'download',
        ]))->assertForbidden();
    }

    public function test_creator_can_stream_their_archive_and_general_viewer_can_read_it(): void
    {
        config(['services.pr_archive.base_url' => 'https://arsip.example.test']);
        $creator = User::factory()->create(['department' => 'operasional']);
        $viewer = User::factory()->create(['department' => 'umum', 'role' => 'viewer']);
        DB::table('torprs')->insert(['nomor_pr' => 'OWN/ARCHIVE', 'created_by_user_id' => $creator->id]);
        $target = 'https://arsip.example.test/api/archive/attachments/71/download?signature=test';
        $this->mock(PrArchiveService::class)->shouldReceive('findByPrNumber')->with('OWN/ARCHIVE')->twice()
            ->andReturn(['documents' => [['id' => 71, 'name' => 'dokumen.pdf', 'download_url' => $target]]]);
        Http::fake(fn () => Http::response('%PDF-test', 200, ['Content-Type' => 'application/pdf']));

        foreach ([$creator, $viewer] as $user) {
            $response = $this->actingAs($user)->get(route('archive.gateway', [
                'pr' => 'OWN/ARCHIVE', 'file' => 71, 'action' => 'download',
            ]))->assertOk()->assertHeader('Cache-Control', 'max-age=0, no-store, private');
            $this->assertSame('%PDF-test', $response->streamedContent());
        }
    }
}
