<?php

namespace Tests\Feature;

use App\Models\User;
use App\Support\PrintPreviewFile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tests\TestCase;

class PrintPreviewReliabilityTest extends TestCase
{
    use RefreshDatabase;

    private string $previewStorage;

    private string $originalStorage;

    protected function setUp(): void
    {
        parent::setUp();
        $this->originalStorage = storage_path();
        $this->previewStorage = base_path('tmp/preview-tests-'.Str::uuid());
        mkdir($this->previewStorage, 0700, true);
        $this->app->useStoragePath($this->previewStorage);
    }

    protected function tearDown(): void
    {
        $this->travelBack();
        $this->app->useStoragePath($this->originalStorage);
        if (str_starts_with($this->previewStorage, base_path('tmp/preview-tests-'))) {
            File::deleteDirectory($this->previewStorage);
        }
        parent::tearDown();
    }

    private function source(): string
    {
        $path = $this->previewStorage.'/source-'.Str::uuid().'.pdf';
        file_put_contents($path, "%PDF-1.4\nSynthetic test preview\n");

        return $path;
    }

    public function test_owner_can_revalidate_and_download_but_other_accounts_cannot_get_a_cached_304(): void
    {
        $owner = User::factory()->create(['department' => 'umum']);
        $other = User::factory()->create(['department' => 'umum']);
        $this->actingAs($owner);
        $source = $this->source();
        $hash = hash_file('sha256', $source);
        $preview = PrintPreviewFile::store(response()->download($source, 'Dokumen é 中文.pdf'));
        $this->assertFileDoesNotExist($source);
        $stored = PrintPreviewFile::resolve($preview['token']);
        $this->assertSame($hash, hash_file('sha256', $stored['absolute_path']));
        $first = $this->get($preview['fileUrl'])->assertOk();
        $this->assertSame('"'.$hash.'"', $first->headers->get('ETag'));
        foreach (['private', 'no-cache', 'must-revalidate', 'max-age=0'] as $flag) {
            $this->assertStringContainsString($flag, $first->headers->get('Cache-Control'));
        }
        $this->withHeader('If-None-Match', '"'.$hash.'"')->get($preview['fileUrl'])->assertStatus(304);
        $this->actingAs($other)->getJson($preview['fileUrl'])->assertForbidden();
        $download = $this->actingAs($owner)->withHeader('If-None-Match', 'unmatched')->get($preview['downloadUrl'])
            ->assertOk()->assertDownload();
        $this->assertSame('Dokumen é 中文.pdf', $preview['filename']);
        $this->assertStringContainsString(rawurlencode('Dokumen é 中文.pdf'), $download->headers->get('Content-Disposition'));
        $this->assertFileExists($stored['absolute_path']);
    }

    public function test_expired_tokens_invalid_signatures_and_paths_outside_the_owner_directory_are_rejected(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'umum']));
        $preview = PrintPreviewFile::store(response()->download($this->source(), 'test.pdf'));
        $this->getJson($preview['fileUrl'].'&altered=1')->assertForbidden();
        $metadata = Cache::get(PrintPreviewFile::CACHE_PREFIX.$preview['token']);
        $outside = $this->source();
        $metadata['path'] = '../'.basename($outside);
        Cache::put(PrintPreviewFile::CACHE_PREFIX.$preview['token'], $metadata, 5400);
        $this->withHeader('If-None-Match', '"'.$metadata['sha256'].'"')->getJson($preview['fileUrl'])->assertNotFound();
        $this->assertFileExists($outside);
        $this->assertFalse(Cache::has(PrintPreviewFile::CACHE_PREFIX.$preview['token']));

        $next = PrintPreviewFile::store(response()->download($this->source(), 'next.pdf'));
        $this->travel(91)->minutes();
        $freshSignature = URL::temporarySignedRoute('document-previews.file', now()->addMinutes(5), ['token' => $next['token']]);
        $this->getJson($freshSignature)->assertNotFound();
    }

    public function test_failed_cache_publication_keeps_source_and_removes_the_unpublished_copy(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        $this->actingAs($user);
        $source = $this->source();
        Cache::shouldReceive('add')->once()->andReturn(false);
        Cache::shouldReceive('put')->once()->andReturn(false);
        try {
            PrintPreviewFile::store(response()->download($source, 'test.pdf'));
            $this->fail('A failed publication must not report a usable preview.');
        } catch (\RuntimeException $error) {
            $this->assertStringContainsString('didaftarkan', $error->getMessage());
            $this->assertFileExists($source);
            $directory = $this->previewStorage.'/app/print-previews/'.$user->id;
            $this->assertSame([], array_values(array_diff(scandir($directory), ['.', '..'])));
        }
    }

    public function test_unwritable_destination_and_missing_auth_never_remove_the_source(): void
    {
        $source = $this->source();
        try {
            PrintPreviewFile::store(response()->download($source, 'test.pdf'));
            $this->fail('Guests cannot create a preview.');
        } catch (HttpException $error) {
            $this->assertSame(401, $error->getStatusCode());
            $this->assertFileExists($source);
        }
        $user = User::factory()->create(['department' => 'umum']);
        $this->actingAs($user);
        mkdir($this->previewStorage.'/app/print-previews', 0700, true);
        file_put_contents($this->previewStorage.'/app/print-previews/'.$user->id, 'Directory blocked by a file');
        try {
            PrintPreviewFile::store(response()->download($source, 'test.pdf'));
            $this->fail('An unavailable directory must fail safely.');
        } catch (\RuntimeException $error) {
            $this->assertStringContainsString('Direktori', $error->getMessage());
            $this->assertFileExists($source);
        }
    }

    public function test_legacy_metadata_still_works_and_cleanup_is_gated_without_deleting_active_previews(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        $this->actingAs($user);
        $directory = $this->previewStorage.'/app/print-previews/'.$user->id;
        mkdir($directory, 0700, true);
        file_put_contents($directory.'/expired.pdf', 'expired');
        touch($directory.'/expired.pdf', time() - 4 * 3600);
        file_put_contents($directory.'/active.pdf', 'active');
        $preview = PrintPreviewFile::store(response()->download($this->source(), 'test.pdf'));
        $this->assertFileDoesNotExist($directory.'/expired.pdf');
        $this->assertFileExists($directory.'/active.pdf');
        $metadata = Cache::get(PrintPreviewFile::CACHE_PREFIX.$preview['token']);
        unset($metadata['sha256']);
        Cache::put(PrintPreviewFile::CACHE_PREFIX.$preview['token'], $metadata, 5400);
        $this->get($preview['fileUrl'])->assertOk()->assertHeader('ETag');
        file_put_contents($directory.'/later.pdf', 'expired');
        touch($directory.'/later.pdf', time() - 4 * 3600);
        PrintPreviewFile::store(response()->download($this->source(), 'second.pdf'));
        $this->assertFileExists($directory.'/later.pdf');
        $this->travel(11)->minutes();
        PrintPreviewFile::store(response()->download($this->source(), 'third.pdf'));
        $this->assertFileDoesNotExist($directory.'/later.pdf');
        $this->assertFileExists($directory.'/active.pdf');
    }
}
