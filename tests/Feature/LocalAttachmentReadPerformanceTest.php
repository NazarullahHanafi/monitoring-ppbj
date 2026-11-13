<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\ProcurementDetailAttachment;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use App\Services\ProcurementLocalFiles;
use App\Services\ProcurementSearchWriter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Tests\TestCase;

class LocalAttachmentReadPerformanceTest extends TestCase
{
    use RefreshDatabase;

    private string $fixtureRoot;

    private string $originalStorage;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->fixtureRoot = base_path('tmp/local-attachment-tests-'.Str::uuid());
        $this->originalStorage = storage_path();
        File::makeDirectory($this->fixtureRoot.'/private', 0700, true);
        File::makeDirectory($this->fixtureRoot.'/storage/app/private/procurement-search/work', 0700, true);
        $this->app->useStoragePath($this->fixtureRoot.'/storage');
        config(['filesystems.disks.local.root' => $this->fixtureRoot.'/private']);
        Storage::forgetDisk('local');
        $this->user = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($this->user);
    }

    protected function tearDown(): void
    {
        $this->app->useStoragePath($this->originalStorage);
        Storage::forgetDisk('local');
        if (str_starts_with($this->fixtureRoot, base_path('tmp/local-attachment-tests-'))) {
            File::deleteDirectory($this->fixtureRoot);
        }
        parent::tearDown();
    }

    private function document(string $kind, int $number = 1): Sp|Spph
    {
        $class = $kind === 'sp' ? Sp::class : Spph::class;

        return $class::create([$kind === 'sp' ? 'nomor_sp' : 'nomor_spph' => 'LOCAL/'.$kind.'/'.$number,
            'sequence_number' => $number, $kind === 'sp' ? 'tanggal_sp' : 'tanggal' => '2026-11-13',
            'created_by_user_id' => $this->user->id, 'pic' => $this->user->name, 'nama_vendor' => 'Vendor', 'deskripsi_pengadaan' => 'Rincian']);
    }

    private function attachment(string $kind, ?int $documentId, ?int $number = null): ProcurementDetailAttachment
    {
        $id = $number === null ? (string) Str::uuid() : sprintf('00000000-0000-4000-8000-%012d', $number);
        $body = '%PDF-1.4 synthetic local attachment';
        $path = 'procurement-details/'.$id.'.pdf';
        Storage::disk('local')->put($path, $body);

        return ProcurementDetailAttachment::create(['id' => $id, 'kind' => $kind, 'document_id' => $documentId,
            'uploaded_by' => $this->user->id, 'original_name' => 'Rincian café.pdf', 'path' => $path,
            'mime' => 'application/pdf', 'size' => strlen($body), 'sha256' => hash('sha256', $body),
            'method' => 'pdf-text', 'extracted_text' => str_repeat('Detailed text ', 1000), 'reviewed_text' => 'Confirmed text']);
    }

    private function manifest(string $kind, array $input = []): array
    {
        return app(ProcurementLocalFiles::class)->call($input + ['action' => 'manifest', 'kind' => 'local_'.$kind.'_attachment']);
    }

    public function test_manifest_has_a_constant_query_budget_for_eighty_distinct_documents_in_both_modules(): void
    {
        $sql = [];
        DB::listen(function ($query) use (&$sql) {
            if (str_starts_with(strtolower($query->sql), 'select')) {
                $sql[] = $query->sql;
            }
        });
        $hydratedText = false;
        ProcurementDetailAttachment::retrieved(function ($file) use (&$hydratedText) {
            $hydratedText = $hydratedText || array_key_exists('extracted_text', $file->getAttributes()) || array_key_exists('reviewed_text', $file->getAttributes());
        });
        foreach (['sp', 'spph'] as $kind) {
            for ($number = 1; $number <= 80; $number++) {
                $doc = $this->document($kind, $number);
                $pr = Ppbj::create(['ppbj_no' => 'PR/'.$kind.'/'.$number]);
                $doc->ppbjs()->attach($pr->id, ['urutan' => 1]);
                $this->attachment($kind, $doc->id);
            }
            $sql = [];
            $one = $this->manifest($kind, ['limit' => 1]);
            $singleQueries = count($sql);
            $sql = [];
            $batch = $this->manifest($kind, ['limit' => 80]);
            $this->assertCount(80, $batch['rows']);
            $this->assertSame(4, $singleQueries);
            $this->assertCount(4, $sql, 'Query count must not grow with files/documents.');
            $this->assertFalse($hydratedText, 'Manifest must not hydrate large extracted/reviewed text columns.');
            $this->assertFalse($batch['has_more']);
            $this->assertTrue($one['has_more']);
            foreach ($batch['rows'] as $row) {
                $this->assertTrue($row['active']);
                $this->assertCount(1, $row['pr_ids']);
                $this->assertStringStartsWith('PR/'.$kind.'/', $row['pr']);
                $this->assertArrayNotHasKey('path', $row);
            }
        }
    }

    public function test_clamped_and_default_batches_traverse_every_file_once_without_false_end_of_scan(): void
    {
        $doc = $this->document('sp');
        for ($number = 1; $number <= 135; $number++) {
            $this->attachment('sp', $doc->id, $number);
        }
        $first = $this->manifest('sp', ['limit' => 0]);
        $this->assertCount(1, $first['rows']);
        $this->assertTrue($first['has_more']);
        foreach ([999, 80] as $limit) {
            $seen = [];
            $after = '';
            $pages = 0;
            do {
                $batch = $this->manifest('sp', ['limit' => $limit, 'after' => $after]);
                $this->assertLessThanOrEqual(min(100, $limit), count($batch['rows']));
                $seen = [...$seen, ...array_column($batch['rows'], 'key')];
                $this->assertNotSame($after, $batch['last']);
                $after = $batch['last'];
                $pages++;
            } while ($batch['has_more'] && $pages < 5);
            $this->assertSame(2, $pages);
            $this->assertCount(135, array_unique($seen));
            $this->assertCount(135, $seen);
            $this->assertSame([], $this->manifest('sp', ['after' => $after])['rows']);
        }
    }

    public function test_manual_and_pivot_pr_links_keep_all_ids_and_database_equality_semantics(): void
    {
        $doc = $this->document('spph');
        $linked = Ppbj::create(['ppbj_no' => 'PR/LINKED']);
        $manual = Ppbj::create(['ppbj_no' => 'PR/MANUAL']);
        $doc->ppbjs()->attach($linked->id, ['urutan' => 1]);
        $doc->update(['nomor_pr' => $manual->ppbj_no]);
        $file = $this->attachment('spph', $doc->id);
        $first = $this->manifest('spph', ['key' => $file->id])['rows'][0];
        $this->assertSame([$linked->id, $manual->id], $first['pr_ids']);
        $this->assertSame('PR/LINKED PR/MANUAL', $first['pr']);
        $this->assertSame(hash('sha256', $file->sha256.'|'.$file->path.'|'.$file->document_id), $first['version']);
        DB::table('spphs')->where('id', $doc->id)->update(['nomor_pr' => $linked->ppbj_no, 'nama_vendor' => 'Vendor changed']);
        $fresh = $this->manifest('spph', ['key' => $file->id])['rows'][0];
        $this->assertSame([$linked->id], $fresh['pr_ids']);
        $this->assertStringContainsString('Vendor changed', $fresh['metadata']);
        $this->assertSame([], $this->manifest('sp', ['key' => $file->id])['rows']);
    }

    public function test_deleted_documents_and_missing_files_remain_tombstones_while_drafts_are_not_scanned(): void
    {
        $doc = $this->document('sp');
        $deleted = $this->attachment('sp', $doc->id);
        $doc->delete();
        $missing = $this->attachment('sp', $this->document('sp', 2)->id);
        Storage::disk('local')->delete($missing->path);
        $this->attachment('sp', null);
        $rows = $this->manifest('sp')['rows'];
        $this->assertCount(2, $rows);
        foreach ($rows as $row) {
            $this->assertFalse($row['active']);
        }
        $this->assertSame([], collect($rows)->firstWhere('key', $deleted->id)['pr_ids']);
    }

    public function test_copy_checks_size_checksum_and_private_destination_and_preserves_source(): void
    {
        $file = $this->attachment('sp', $this->document('sp')->id);
        $destination = storage_path('app/private/procurement-search/work/'.str_repeat('a', 32).'.bin');
        $input = ['action' => 'file', 'kind' => 'local_sp_attachment', 'id' => $file->id, 'destination' => $destination, 'max_bytes' => 1024];
        $result = app(ProcurementLocalFiles::class)->call($input);
        $this->assertSame($file->sha256, $result['checksum']);
        $this->assertSame($file->sha256, hash_file('sha256', $destination));
        Storage::disk('local')->assertExists($file->path);
        unlink($destination);
        foreach ([['max_bytes' => 1], ['destination' => $this->fixtureRoot.'/outside.bin']] as $override) {
            try {
                app(ProcurementLocalFiles::class)->call(array_replace($input, $override));
                $this->fail('Unsafe copy accepted');
            } catch (\RuntimeException $expected) {
                $this->assertContains($expected->getMessage(), ['destination', 'file_size_limit']);
            }
            $this->assertFileDoesNotExist($destination);
        }
        Storage::disk('local')->put($file->path, 'tampered');
        $this->expectExceptionMessage('checksum');
        app(ProcurementLocalFiles::class)->call($input);
    }

    public function test_direct_download_is_private_supports_ranges_and_head_and_rejects_escape_paths(): void
    {
        $file = $this->attachment('sp', $this->document('sp')->id);
        $url = route('procurement.details.download', $file);
        $response = $this->get($url)->assertOk()->assertDownload()->assertHeader('X-Content-Type-Options', 'nosniff');
        $this->assertStringContainsString('private', $response->headers->get('Cache-Control'));
        $this->assertStringNotContainsString('public', $response->headers->get('Cache-Control'));
        $this->head($url)->assertOk()->assertHeader('Content-Length', (string) $file->size);
        $this->get($url, ['Range' => 'bytes=2-6'])->assertStatus(206)->assertHeader('Content-Range', 'bytes 2-6/'.$file->size)->assertHeader('Content-Length', '5');
        file_put_contents($this->fixtureRoot.'/outside.pdf', 'outside private disk');
        $file->update(['path' => '../outside.pdf']);
        $this->getJson($url)->assertNotFound();
        $this->assertNull(app(ProcurementLocalFiles::class)->path($file));
    }

    public function test_indexed_local_preview_is_private_and_removed_documents_are_not_exposed(): void
    {
        $doc = $this->document('spph');
        $file = $this->attachment('spph', $doc->id);
        $pr = Ppbj::create(['ppbj_no' => 'PR/PREVIEW']);
        $id = app(ProcurementSearchWriter::class)->source('local_spph_attachment', $file->id, 'Synthetic', 'REF', 'metadata', '', [$pr->id], hash('sha256', 'test'), true);
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'viewer']));
        $url = route('procurement.search.file', $id);
        $response = $this->get($url)->assertOk()->assertHeader('Content-Security-Policy', "sandbox; default-src 'none'");
        $this->assertStringContainsString('private', $response->headers->get('Cache-Control'));
        $this->assertStringNotContainsString('public', $response->headers->get('Cache-Control'));
        $doc->delete();
        $this->getJson($url)->assertNotFound();
    }

    public function test_draft_download_requires_owner_and_live_claim_window_and_business_roles_remain_enforced(): void
    {
        $file = $this->attachment('sp', null);
        $url = route('procurement.details.download', $file);
        $this->get($url)->assertOk();
        $other = User::factory()->create(['department' => 'umum']);
        $this->actingAs($other)->getJson($url)->assertNotFound();
        $this->actingAs($this->user);
        $file->update(['created_at' => now()->subDays(3)]);
        $this->getJson($url)->assertNotFound();
        $ops = User::factory()->create(['department' => 'operasional']);
        $this->actingAs($ops)->getJson($url)->assertForbidden();
        auth()->logout();
        $this->getJson($url)->assertUnauthorized();
    }

    public function test_unknown_source_or_action_cannot_silently_scan_the_other_module(): void
    {
        foreach ([['kind' => 'unknown', 'action' => 'manifest'], ['kind' => 'local_sp_attachment', 'action' => 'unknown']] as $input) {
            try {
                app(ProcurementLocalFiles::class)->call($input);
                $this->fail('Unknown source/action accepted');
            } catch (\InvalidArgumentException $expected) {
                $this->assertContains($expected->getMessage(), ['local_kind', 'local_action']);
            }
        }
        $this->assertSame(['rows' => [], 'last' => '', 'has_more' => false], $this->manifest('sp'));
    }
}
