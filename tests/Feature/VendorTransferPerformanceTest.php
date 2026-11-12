<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Vendor;
use App\Models\VendorDocument;
use App\Models\VendorDocumentBundle;
use App\Services\VendorDocumentCloud;
use App\Services\VendorDocumentDownloads;
use App\Services\VendorDocumentTransfers;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Mockery;
use Tests\TestCase;
use ZipArchive;

class VendorTransferPerformanceTest extends TestCase
{
    use RefreshDatabase;

    private string $work;

    private string $bytes = "%PDF-1.4\nSynthetic vendor archive\n%%EOF";

    private Vendor $vendor;

    private User $user;

    private array $calls = [];

    private bool $fail = false;

    protected function setUp(): void
    {
        parent::setUp();
        Cache::flush();
        $this->work = storage_path('framework/testing/vendor-fast-'.Str::random(12));
        mkdir($this->work, 0700, true);
        $this->user = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($this->user);
        $this->vendor = Vendor::create(['nama_vendor' => 'Vendor transfer uji']);
        $cloud = Mockery::mock(VendorDocumentCloud::class);
        $cloud->shouldReceive('workDirectory')->andReturn($this->work);
        $cloud->shouldReceive('call')->andReturnUsing(function ($input) {
            $this->calls[] = $input;
            if ($this->fail) {
                throw new \RuntimeException('private upstream detail');
            }
            if ($input['action'] === 'download') {
                file_put_contents($this->work.'/'.$input['local'], $this->bytes);
            }
            if ($input['action'] === 'link') {
                return ['ok' => true, 'url' => 'https://example.sharepoint.com/private?capability=temporary'];
            }

            return ['ok' => true, 'item_id' => 'private-id', 'etag' => '"verified-version"', 'verified' => true];
        });
        $this->app->instance(VendorDocumentCloud::class, $cloud);
    }

    protected function tearDown(): void
    {
        try {
            File::deleteDirectory($this->work);
        } finally {
            parent::tearDown();
        }
    }

    private function payload(array $extra = []): array
    {
        return $extra + ['background' => true, 'upload_id' => (string) Str::uuid(), 'file' => UploadedFile::fake()->createWithContent('izin.pdf', $this->bytes),
            'type' => 'nib', 'title' => 'Izin perusahaan', 'search_text' => 'Plastik industri', 'text_confirmed' => true];
    }

    private function url(string $suffix = ''): string
    {
        return '/vendors/'.$this->vendor->id.'/documents'.$suffix;
    }

    private function document(array $extra = []): VendorDocument
    {
        $id = (string) Str::uuid();

        return VendorDocument::create($extra + ['id' => $id, 'vendor_id' => $this->vendor->id, 'uploaded_by' => $this->user->id,
            'type' => 'nib', 'title' => 'Dokumen vendor', 'original_name' => 'izin.pdf', 'mime' => 'application/pdf', 'size' => strlen($this->bytes),
            'checksum' => hash('sha256', $this->bytes), 'cloud_path' => 'SIMONPR-Vendor/2026/11/'.$id.'.pdf', 'cloud_item_id' => 'private-id', 'status' => 'ready']);
    }

    public function test_background_upload_acknowledges_without_cloud_and_worker_verifies_before_search(): void
    {
        $payload = $this->payload();
        $response = $this->postJson($this->url(), $payload)->assertStatus(202)->assertJsonPath('queued', true)->assertJsonPath('document.status', 'queued');
        $this->assertSame([], $this->calls);
        $this->assertStringNotContainsString('staged_file', $response->getContent());
        $document = VendorDocument::findOrFail($payload['upload_id']);
        $staged = app(VendorDocumentTransfers::class)->directory().'/'.$document->staged_file;
        $this->assertFileExists($staged);
        $this->assertDatabaseCount('vendor_document_terms', 0);
        $this->postJson($this->url(), $payload)->assertStatus(202);
        $this->assertCount(1, glob(dirname($staged).'/*.bin'));
        $this->getJson($this->url('/transfers'))->assertJsonPath('active_count', 1)->assertJsonPath('ready_count', 0);
        $this->artisan('vendor:transfers', ['--limit' => 1])->assertSuccessful();
        $document->refresh();
        $this->assertSame('ready', $document->status);
        $this->assertSame('"verified-version"', $document->cloud_etag);
        $this->assertNull($document->staged_file);
        $this->assertFileDoesNotExist($staged);
        $this->assertCount(1, $this->calls);
        $this->getJson($this->url().'?q=plastik')->assertJsonPath('data.0.id', $document->id);
        $this->getJson($this->url('/transfers'))->assertJsonPath('active_count', 0)->assertJsonPath('ready_count', 1);
    }

    public function test_failed_transfers_retry_with_backoff_and_keep_one_staged_original_until_expiry(): void
    {
        $payload = $this->payload();
        $this->postJson($this->url(), $payload)->assertStatus(202);
        $document = VendorDocument::findOrFail($payload['upload_id']);
        $transfers = app(VendorDocumentTransfers::class);
        $this->fail = true;
        $transfers->process($document);
        $this->assertSame('queued', $document->fresh()->status);
        $this->assertTrue($document->fresh()->transfer_after->isFuture());
        $this->assertFalse($transfers->process($document));
        $this->travel(3)->minutes();
        $transfers->process($document);
        $this->travel(5)->minutes();
        $transfers->process($document);
        $this->assertSame('failed', $document->fresh()->status);
        $this->assertCount(3, $this->calls);
        $this->assertCount(1, array_unique(array_column($this->calls, 'cloud_path')));
        $this->assertDatabaseCount('vendor_document_terms', 0);
        $this->travel(25)->hours();
        $transfers->prune();
        $this->assertNull($document->fresh()->staged_file);
        $this->assertSame([], glob($transfers->directory().'/*.bin'));
    }

    public function test_direct_download_uses_private_short_lived_link_and_old_files_use_verified_cache(): void
    {
        $document = $this->document(['cloud_etag' => '"verified-version"']);
        for ($i = 0; $i < 2; $i++) {
            $this->get($this->url('/'.$document->id.'/download?direct=1'))->assertRedirect('https://example.sharepoint.com/private?capability=temporary')->assertHeader('Referrer-Policy', 'no-referrer');
        }
        $this->assertCount(1, $this->calls);
        $this->assertSame('link', $this->calls[0]['action']);
        $old = $this->document();
        $downloads = app(VendorDocumentDownloads::class);
        $path = $downloads->verified($old);
        $this->assertSame($this->bytes, file_get_contents($path));
        $downloads->verified($old);
        $this->assertCount(2, $this->calls);
        file_put_contents($path, 'corrupted');
        $downloads->verified($old);
        $this->assertCount(3, $this->calls);
        $this->assertSame($this->bytes, file_get_contents($path));
    }

    public function test_bundle_is_async_reused_complete_safe_and_scoped_to_vendor_and_owner(): void
    {
        $first = $this->document(['original_name' => '../<bad>/izin.pdf']);
        $second = $this->document(['original_name' => 'izin.pdf']);
        $this->document(['status' => 'queued']);
        $response = $this->postJson($this->url('/bundle'))->assertStatus(202)->assertJsonPath('total', 2);
        $bundle = VendorDocumentBundle::findOrFail($response['id']);
        $this->postJson($this->url('/bundle'))->assertStatus(202)->assertJsonPath('id', $bundle->id);
        $this->assertSame([], $this->calls);
        $this->getJson($this->url('/bundle/'.$bundle->id.'/download'))->assertConflict();
        $downloads = app(VendorDocumentDownloads::class);
        $downloads->process($bundle);
        $bundle->refresh();
        $this->assertSame('ready', $bundle->status);
        $this->assertTrue($bundle->expires_at->greaterThan(now()->addMinutes(55)), 'Progress updates must not replace the one-hour expiry.');
        $zip = new ZipArchive;
        $this->assertTrue($zip->open($downloads->bundlePath($bundle)));
        $this->assertSame(2, $zip->numFiles);
        for ($i = 0; $i < 2; $i++) {
            $this->assertStringNotContainsString('/', $zip->getNameIndex($i));
            $this->assertSame($this->bytes, $zip->getFromIndex($i));
        }
        $zip->close();
        $this->getJson($this->url('/bundle/'.$bundle->id))->assertJsonPath('completed', 2)->assertDontSee('checksum')->assertDontSee('private-id');
        $this->get($this->url('/bundle/'.$bundle->id.'/download'))->assertOk()->assertDownload('Lampiran - vendor-transfer-uji.zip');
        $other = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($other)->getJson($this->url('/bundle/'.$bundle->id))->assertNotFound();
        $this->getJson($this->url('/bundle/'.$bundle->id.'/download'))->assertNotFound();
        $this->actingAs($this->user);
        $first->update(['version' => 2]);
        $this->getJson($this->url('/bundle/'.$bundle->id.'/download'))->assertConflict();
        $this->assertCount(2, $this->calls);
    }

    public function test_bundle_never_delivers_partial_success_and_viewers_can_export_without_writing_documents(): void
    {
        $this->document();
        $viewer = User::factory()->create(['department' => 'umum', 'role' => 'viewer']);
        $this->actingAs($viewer);
        $response = $this->postJson($this->url('/bundle'))->assertStatus(202);
        $bundle = VendorDocumentBundle::findOrFail($response['id']);
        $this->fail = true;
        app(VendorDocumentDownloads::class)->process($bundle);
        $this->assertSame('failed', $bundle->fresh()->status);
        $this->getJson($this->url('/bundle/'.$bundle->id.'/download'))->assertConflict();
        $this->assertSame([], glob(app(VendorDocumentDownloads::class)->directory().'/*.zip'));
        $this->postJson($this->url(), $this->payload())->assertForbidden();
        $this->assertDatabaseCount('vendor_documents', 1);
    }

    public function test_unsafe_direct_urls_expired_bundles_and_changed_vendor_are_rejected(): void
    {
        $document = $this->document(['cloud_etag' => 'etag']);
        Cache::put('vendor-direct:'.$document->id, ['etag' => 'etag', 'url' => 'https://example.sharepoint.com.evil.test/file'], 30);
        $this->getJson($this->url('/'.$document->id.'/download?direct=1'))->assertStatus(503)->assertDontSee('evil.test');
        $other = Vendor::create(['nama_vendor' => 'Other']);
        $response = $this->postJson($this->url('/bundle'))->assertStatus(202);
        $bundle = VendorDocumentBundle::findOrFail($response['id']);
        $this->getJson('/vendors/'.$other->id.'/documents/bundle/'.$bundle->id)->assertNotFound();
        $this->travel(2)->hours();
        $this->getJson($this->url('/bundle/'.$bundle->id))->assertStatus(410);
        app(VendorDocumentDownloads::class)->pruneBundles();
        $this->assertDatabaseCount('vendor_document_bundles', 0);
        auth()->logout();
        $this->postJson($this->url('/bundle'))->assertUnauthorized();
    }
}
