<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Vendor;
use App\Models\VendorDocument;
use App\Services\VendorDocumentCloud;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Mockery;
use Tests\TestCase;

class VendorDocumentsTest extends TestCase
{
    use RefreshDatabase;

    private Vendor $vendor;

    private User $user;

    private string $work;

    private string $bytes = "%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\n%%EOF";

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->vendor = Vendor::create(['nama_vendor' => 'CV Vendor Lampiran', 'is_active' => true]);
        $this->actingAs($this->user);
        $this->work = storage_path('framework/testing/vendor-documents-'.Str::random(10));
        mkdir($this->work, 0700, true);
    }

    protected function tearDown(): void
    {
        foreach (glob($this->work.'/*') as $file) {
            unlink($file);
        }
        rmdir($this->work);
        parent::tearDown();
    }

    private function url(?VendorDocument $document = null, string $action = ''): string
    {
        return '/vendors/'.$this->vendor->id.'/documents'.($document ? '/'.$document->id : '').$action;
    }

    private function payload(array $extra = []): array
    {
        return $extra + ['type' => 'npwp', 'title' => 'NPWP Usaha', 'document_number' => '123.456.789', 'file' => UploadedFile::fake()->createWithContent('npwp.pdf', $this->bytes), 'upload_id' => (string) Str::uuid()];
    }

    private function cloud(callable $call): void
    {
        $mock = Mockery::mock(VendorDocumentCloud::class);
        $mock->shouldReceive('workDirectory')->andReturn($this->work);
        $mock->shouldReceive('call')->andReturnUsing($call);
        $this->app->instance(VendorDocumentCloud::class, $mock);
    }

    private function document(array $extra = []): VendorDocument
    {
        $id = (string) Str::uuid();
        $doc = VendorDocument::create($extra + ['id' => $id, 'vendor_id' => $this->vendor->id, 'uploaded_by' => $this->user->id, 'type' => 'nib', 'title' => 'Izin Usaha', 'original_name' => 'nib.pdf', 'mime' => 'application/pdf', 'size' => strlen($this->bytes), 'checksum' => hash('sha256', $this->bytes), 'cloud_path' => 'SIMONPR-Vendor/2026/11/'.$id.'.pdf', 'cloud_item_id' => 'private-cloud-id', 'status' => 'ready']);
        $doc->reindex();

        return $doc;
    }

    public function test_upload_verifies_cloud_and_cleans_temp_without_requiring_a_version(): void
    {
        $calls = 0;
        $this->cloud(function ($input) use (&$calls) {
            $calls++;
            $this->assertSame('upload', $input['action']);
            $this->assertSame($this->bytes, file_get_contents($this->work.'/'.$input['local']));

            return ['ok' => true, 'item_id' => 'cloud-private-id', 'verified' => true];
        });
        $payload = $this->payload(['search_text' => 'Industri plastik dan kimia', 'text_confirmed' => true]);
        $response = $this->postJson($this->url(), $payload)->assertCreated()->assertJsonPath('document.version', 1)->assertJsonPath('document.status', 'ready');
        $this->assertStringNotContainsString('cloud-private-id', $response->getContent());
        $this->assertSame([], glob($this->work.'/*'));
        $doc = VendorDocument::findOrFail($payload['upload_id']);
        $this->assertSame('cloud-private-id', $doc->cloud_item_id);
        $this->assertDatabaseHas('vendor_document_terms', ['document_id' => $doc->id, 'term' => 'plastik']);
        $this->postJson($this->url(), $this->payload(['upload_id' => $doc->id]))->assertOk()->assertJsonPath('reused', true);
        $this->assertSame(1, $calls);
    }

    public function test_failed_upload_can_retry_the_same_cloud_path_and_cannot_reuse_id_for_other_bytes(): void
    {
        $paths = [];
        $fail = true;
        $this->cloud(function ($input) use (&$paths, &$fail) {
            $paths[] = $input['cloud_path'];
            if ($fail) {
                throw new \RuntimeException('SECRET graph-token');
            }

            return ['ok' => true, 'item_id' => 'remote-id', 'verified' => true];
        });
        $id = (string) Str::uuid();
        $this->postJson($this->url(), $this->payload(['upload_id' => $id]))->assertStatus(503)->assertDontSee('SECRET');
        $this->assertDatabaseHas('vendor_documents', ['id' => $id, 'status' => 'failed']);
        $this->assertSame([], glob($this->work.'/*'));
        $fail = false;
        $this->postJson($this->url(), $this->payload(['upload_id' => $id]))->assertCreated();
        $this->assertSame($paths[0], $paths[1]);
        $this->postJson($this->url(), $this->payload(['upload_id' => $id, 'file' => UploadedFile::fake()->createWithContent('other.pdf', $this->bytes.'changed')]))->assertConflict();
        $this->assertDatabaseCount('vendor_documents', 1);
    }

    public function test_unverified_cloud_response_never_marks_ready(): void
    {
        $this->cloud(fn () => ['ok' => true, 'item_id' => 'id', 'verified' => false]);
        $this->postJson($this->url(), $this->payload())->assertStatus(503);
        $this->assertDatabaseHas('vendor_documents', ['status' => 'failed']);
        $this->assertDatabaseCount('vendor_document_terms', 0);
    }

    public function test_metadata_and_confirmed_content_are_searchable_in_vendor_and_document_filters_without_cloud(): void
    {
        $doc = $this->document(['document_number' => '7300-ABC', 'search_text' => 'Pengolahan plastik industri']);
        $other = Vendor::create(['nama_vendor' => 'Tidak Cocok']);
        foreach (['plastik', 'pengolahan indus', '7300', 'nib', 'izin'] as $term) {
            $response = $this->get(route('vendor.index', ['search' => $term]))->assertOk();
            $this->assertSame([$this->vendor->id], $response->viewData('vendors')->modelKeys());
            $this->getJson($this->url().'?q='.urlencode($term))->assertOk()->assertJsonPath('data.0.id', $doc->id);
        }
        $this->getJson($this->url().'?q=plastik+tidakada')->assertOk()->assertJsonCount(0, 'data');
        $this->getJson($this->url().'?type=npwp')->assertJsonCount(0, 'data');
        $response = $this->getJson($this->url())->assertOk()->assertHeader('Cache-Control', 'no-store, private');
        $response->assertDontSee('private-cloud-id')->assertDontSee('Pengolahan plastik');
    }

    public function test_edit_replaces_index_and_protects_stale_version_and_unconfirmed_text(): void
    {
        $doc = $this->document(['search_text' => 'KataLama']);
        $data = ['type' => 'akta', 'title' => 'Akta Baru', 'search_text' => 'KataBaru', 'version' => 1, 'text_confirmed' => true];
        $this->putJson($this->url($doc), $data)->assertOk()->assertJsonPath('document.version', 2);
        $this->assertDatabaseMissing('vendor_document_terms', ['document_id' => $doc->id, 'term' => 'katalama']);
        $this->assertDatabaseHas('vendor_document_terms', ['document_id' => $doc->id, 'term' => 'katabaru']);
        $this->putJson($this->url($doc), $data)->assertConflict();
        $this->putJson($this->url($doc), ['text_confirmed' => false, 'version' => 2] + $data)->assertUnprocessable()->assertJsonValidationErrors('text_confirmed');
        $this->putJson($this->url($doc), ['type' => 'nib', 'title' => 'Nomor saja', 'version' => 2])->assertOk();
        $this->assertDatabaseMissing('vendor_document_terms', ['document_id' => $doc->id, 'term' => 'katabaru']);
    }

    public function test_cross_vendor_ids_are_denied_for_every_document_action(): void
    {
        $other = Vendor::create(['nama_vendor' => 'Vendor B']);
        $doc = $this->document(['vendor_id' => $other->id]);
        $this->getJson($this->url($doc))->assertNotFound();
        $this->getJson($this->url($doc, '/download'))->assertNotFound();
        $this->putJson($this->url($doc), [])->assertNotFound();
        $this->deleteJson($this->url($doc), ['version' => 1])->assertNotFound();
    }

    public function test_guest_other_department_and_read_only_permissions(): void
    {
        $doc = $this->document();
        auth()->logout();
        $this->getJson($this->url())->assertUnauthorized();
        $this->getJson($this->url($doc, '/download'))->assertUnauthorized();
        $this->actingAs(User::factory()->create(['department' => 'operasional', 'role' => 'user']));
        $this->getJson($this->url())->assertForbidden();
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'viewer']));
        $this->getJson($this->url())->assertOk();
        foreach (['postJson', 'putJson', 'deleteJson'] as $method) {
            $this->$method($this->url($method === 'postJson' ? null : $doc), [])->assertForbidden();
        }
        $this->actingAs($this->user);
        Cache::put('simonpr:read_only_mode', true);
        $this->postJson($this->url(), [])->assertForbidden();
    }

    public function test_file_validation_blocks_scripts_spoofed_extensions_oversize_and_bad_fields_before_cloud(): void
    {
        foreach ([UploadedFile::fake()->createWithContent('test.php', '<?php echo 1;'), UploadedFile::fake()->createWithContent('test.pdf', '<html>hello</html>'), UploadedFile::fake()->create('test.pdf', 10241, 'application/pdf')] as $file) {
            $this->postJson($this->url(), $this->payload(['file' => $file]))->assertUnprocessable()->assertJsonValidationErrors('file');
        }
        $this->postJson($this->url(), $this->payload(['type' => 'unknown', 'search_text' => 'teks']))->assertUnprocessable()->assertJsonValidationErrors(['type', 'text_confirmed']);
        $this->postJson($this->url(), $this->payload(['expires_at' => '2026-99-99']))->assertUnprocessable()->assertJsonValidationErrors('expires_at');
        $this->assertDatabaseCount('vendor_documents', 0);
    }

    public function test_download_verifies_bytes_and_never_returns_a_public_cloud_link(): void
    {
        $doc = $this->document();
        $this->cloud(function ($input) {
            $this->assertSame('download', $input['action']);
            file_put_contents($this->work.'/'.$input['local'], $this->bytes);

            return ['ok' => true];
        });
        $response = $this->get($this->url($doc, '/download'))->assertOk()->assertHeader('X-Content-Type-Options', 'nosniff');
        $response->assertDownload('nib.pdf');
        $this->assertSame($this->bytes, file_get_contents($response->baseResponse->getFile()->getPathname()));
        $this->assertFalse($response->headers->has('Location'));
    }

    public function test_corrupt_download_is_rejected_and_temporary_file_removed(): void
    {
        $doc = $this->document();
        $this->cloud(function ($input) {
            file_put_contents($this->work.'/'.$input['local'], 'bad');

            return ['ok' => true];
        });
        $this->getJson($this->url($doc, '/download'))->assertStatus(503);
        $this->assertSame([], glob($this->work.'/*'));
    }

    public function test_delete_only_removes_database_after_cloud_confirmation_and_blocks_vendor_deletion(): void
    {
        $doc = $this->document(['search_text' => 'tersimpan']);
        $fail = true;
        $this->cloud(function ($input) use (&$fail) {
            $this->assertSame('delete', $input['action']);
            if ($fail) {
                throw new \RuntimeException('failed');
            }

            return ['ok' => true];
        });
        $this->delete(route('vendor.destroy', $this->vendor))->assertSessionHasErrors('error');
        $this->deleteJson($this->url($doc), ['version' => 99])->assertConflict();
        $this->deleteJson($this->url($doc), ['version' => 1])->assertStatus(503);
        $this->assertDatabaseHas('vendor_documents', ['id' => $doc->id, 'status' => 'deleting']);
        $fail = false;
        $this->deleteJson($this->url($doc), ['version' => 1])->assertOk()->assertJsonPath('deleted', true);
        $this->assertDatabaseCount('vendor_documents', 0);
        $this->assertDatabaseCount('vendor_document_terms', 0);
    }

    public function test_pagination_validation_and_read_write_budget_isolation(): void
    {
        foreach (range(1, 21) as $i) {
            $this->document(['title' => 'Dokumen '.$i]);
        }
        $this->getJson($this->url())->assertOk()->assertJsonCount(20, 'data')->assertJsonPath('has_more', true);
        $this->getJson($this->url().'?page=2')->assertJsonCount(1, 'data')->assertJsonPath('has_more', false);
        $this->getJson($this->url().'?q[]=bad')->assertUnprocessable();
        $this->getJson($this->url().'?type=bad')->assertUnprocessable();
        foreach (range(1, 10) as $i) {
            $this->postJson($this->url(), [])->assertUnprocessable();
        }
        $this->getJson($this->url())->assertOk();
        $this->postJson($this->url(), [])->assertStatus(429);
    }

    public function test_concurrent_operations_use_same_lock_and_block_changes(): void
    {
        $doc = $this->document();
        $lock = Cache::lock('vendor-document:'.$doc->id, 900);
        $lock->get();
        try {
            $this->putJson($this->url($doc), ['type' => 'nib', 'title' => 'Baru', 'version' => 1])->assertConflict();
            $this->deleteJson($this->url($doc), ['version' => 1])->assertConflict();
        } finally {
            $lock->release();
        }
        $this->assertSame('Izin Usaha', $doc->fresh()->title);
    }

    public function test_server_generates_upload_id_and_supports_real_photo_files(): void
    {
        $this->cloud(fn () => ['ok' => true, 'item_id' => 'verified-id', 'verified' => true]);
        foreach (['png', 'jpg'] as $extension) {
            $data = $this->payload(['file' => UploadedFile::fake()->image('npwp.'.$extension, 40, 40)]);
            unset($data['upload_id']);
            $response = $this->postJson($this->url(), $data)->assertCreated()->assertJsonPath('document.version', 1);
            $this->assertTrue(Str::isUuid($response->json('document.id')));
        }
        $this->assertDatabaseCount('vendor_documents', 2);
        $this->assertSame([], glob($this->work.'/*'));
    }

    public function test_unicode_tokens_and_every_query_word_are_retained(): void
    {
        $words = 'satu dua tiga empat lima enam tujuh delapan sembilan sepuluh alfa beta gamma delta epsilon zeta eta theta iota kappa lambda';
        $doc = $this->document(['search_text' => $words.' resume résumé ＮＩＢ']);
        $this->assertDatabaseHas('vendor_document_terms', ['document_id' => $doc->id, 'term' => 'resume']);
        $this->assertDatabaseHas('vendor_document_terms', ['document_id' => $doc->id, 'term' => 'résumé']);
        $this->getJson($this->url().'?q='.urlencode($words.' tidakada'))->assertOk()->assertJsonCount(0, 'data');
        $this->getJson($this->url().'?q='.urlencode('résumé'))->assertOk()->assertJsonPath('data.0.id', $doc->id);
    }

    public function test_global_transfer_slots_fail_fast_and_are_not_taken_by_listing(): void
    {
        config(['procurement_search.archive_root' => base_path()]);
        $first = Cache::lock('vendor-cloud:slot:0', 360);
        $second = Cache::lock('vendor-cloud:slot:1', 360);
        $first->get();
        $second->get();
        try {
            $this->getJson($this->url())->assertOk();
            try {
                app(VendorDocumentCloud::class)->call(['action' => 'status']);
                $this->fail('Full transfer slots must fail before starting a child process');
            } catch (\RuntimeException $e) {
                $this->assertStringContainsString('sedang penuh', $e->getMessage());
            }
        } finally {
            $first->release();
            $second->release();
        }
    }

    public function test_runtime_failure_has_specific_safe_message_and_preserves_retry_record(): void
    {
        $this->cloud(fn () => throw new \App\Exceptions\VendorCloudException('runtime'));
        $id = (string) Str::uuid();
        $this->postJson($this->url(), $this->payload(['upload_id' => $id]))->assertStatus(503)
            ->assertJsonPath('error_code', 'runtime')->assertSee('PHP CLI')->assertDontSee('access_token');
        $this->assertDatabaseHas('vendor_documents', ['id' => $id, 'status' => 'failed']);
        $this->assertSame([], glob($this->work.'/*'));
    }

    public function test_unavailable_cli_releases_global_slot_and_reports_configuration_problem(): void
    {
        config(['procurement_search.archive_root' => base_path(), 'procurement_search.php_cli' => base_path('missing-cli')]);
        try {
            app(VendorDocumentCloud::class)->call(['action' => 'status']);
            $this->fail('Invalid CLI must fail before starting a cloud process');
        } catch (\App\Exceptions\VendorCloudException $e) {
            $this->assertSame('runtime', $e->reason);
        }
        $slot = Cache::lock('vendor-cloud:slot:0', 360);
        $this->assertTrue($slot->get());
        $slot->release();
    }
}
