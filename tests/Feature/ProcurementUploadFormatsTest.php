<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Vendor;
use App\Models\VendorDocument;
use App\Services\ProcurementOfficeReader;
use App\Services\ProcurementUploadInspector;
use App\Services\VendorDocumentCloud;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Tests\Support\DocumentUploadFixture;
use Tests\TestCase;
use ZipArchive;

class ProcurementUploadFormatsTest extends TestCase
{
    use RefreshDatabase;

    private array $temporary = [];

    protected function tearDown(): void
    {
        foreach ($this->temporary as $path) {
            if (is_file($path)) {
                unlink($path);
            }
        }
        parent::tearDown();
    }

    private function fixture(string $extension): UploadedFile
    {
        $file = DocumentUploadFixture::make($extension);
        $this->temporary[] = $file->getRealPath();

        return $file;
    }

    public function test_real_documents_and_images_pass_content_validation_and_office_text_is_read(): void
    {
        foreach (['pdf', 'docx', 'xlsx', 'xls', 'pptx', 'odt', 'ods', 'odp', 'txt', 'csv', 'rtf', 'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'] as $extension) {
            $file = $this->fixture($extension);
            $format = app(ProcurementUploadInspector::class)->inspect($file);
            $this->assertSame($extension, $format['extension']);
            if (in_array($format['reader'], ['office', 'text'], true)) {
                $result = app(ProcurementOfficeReader::class)->read($file->getRealPath(), $extension);
                $this->assertStringContainsString('Plastik industri', $result['text']);
                $this->assertStringContainsString('73001234', $result['text']);
            }
        }
    }

    public function test_macros_path_traversal_wrong_packages_and_entity_declarations_are_rejected(): void
    {
        foreach (['word/vbaProject.bin', '../escape.txt', 'word/activeX/activeX1.xml', 'bad-entity', 'wrong-package', 'expansion-bomb'] as $attack) {
            $file = $this->fixture('docx');
            $zip = new ZipArchive;
            $zip->open($file->getRealPath());
            if ($attack === 'bad-entity') {
                $zip->addFromString('word/document.xml', '<!DOCTYPE x [<!ENTITY t SYSTEM "file:///not-readable">]><x>&t;</x>');
            } elseif ($attack === 'wrong-package') {
                $zip->deleteName('word/document.xml');
            } elseif ($attack === 'expansion-bomb') {
                $zip->addFromString('huge.txt', str_repeat('a', 21 * 1024 * 1024));
            } else {
                $zip->addFromString($attack, 'test');
            }
            $zip->close();
            try {
                app(ProcurementUploadInspector::class)->inspect($file);
                $this->fail('Unsafe package accepted: '.$attack);
            } catch (ValidationException $e) {
                $this->assertArrayHasKey('file', $e->errors());
            }
        }
        foreach (['script.php', 'script.pdf', 'script.txt', 'script.xlsx', 'script.svg'] as $name) {
            $file = UploadedFile::fake()->createWithContent($name, '<?php echo "blocked";');
            try {
                app(ProcurementUploadInspector::class)->inspect($file);
                $this->fail('Spoofed format accepted');
            } catch (ValidationException $e) {
                $this->assertArrayHasKey('file', $e->errors());
            }
        }
    }

    public function test_office_extract_is_private_bounded_and_never_uploads_to_cloud(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($user);
        $vendor = Vendor::create(['nama_vendor' => 'Vendor Pembaca']);
        $url = route('vendor.documents.extract', $vendor);
        $this->mock(VendorDocumentCloud::class, fn ($mock) => $mock->shouldNotReceive('call'));
        foreach (['docx', 'xlsx', 'pptx', 'odt', 'ods', 'odp', 'txt', 'csv'] as $extension) {
            $this->postJson($url, ['file' => $this->fixture($extension)])->assertOk()->assertSee('Plastik industri')->assertHeader('Cache-Control', 'no-store, private');
        }
        $this->assertDatabaseCount('vendor_documents', 0);
        $this->postJson($url, ['file' => $this->fixture('xlsx')])->assertStatus(429);
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'viewer']));
        $this->postJson($url, ['file' => $this->fixture('xlsx')])->assertForbidden();
        auth()->logout();
        $this->postJson($url, [])->assertUnauthorized();
    }

    public function test_search_diagnosis_snippets_and_attention_filters_stay_vendor_scoped(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($user);
        $vendor = Vendor::create(['nama_vendor' => 'Vendor A']);
        $other = Vendor::create(['nama_vendor' => 'Vendor B']);
        $make = function ($vendor, $text, $extra = []) use ($user) {
            $id = (string) Str::uuid();
            $doc = VendorDocument::create($extra + ['id' => $id, 'vendor_id' => $vendor->id, 'uploaded_by' => $user->id, 'type' => 'nib', 'title' => 'Izin', 'original_name' => 'file.pdf', 'mime' => 'application/pdf', 'size' => 10, 'checksum' => str_repeat('a', 64), 'cloud_path' => 'SIMONPR-Vendor/2026/11/'.$id.'.pdf', 'status' => 'ready', 'search_text' => $text]);
            $doc->reindex();

            return $doc;
        };
        $doc = $make($vendor, 'Plastik industri 73001234 '.str_repeat('isi ', 200), ['expires_at' => now()->addDays(10)->format('Y-m-d')]);
        $empty = $make($vendor, '');
        $make($other, 'RahasiaIndustri');
        $url = route('vendor.documents.index', $vendor);
        $r = $this->getJson($url.'?q=wefwef+plastik')->assertOk()->assertJsonPath('diagnosis.matched.0', 'plastik')->assertJsonPath('diagnosis.missing.0', 'wefwef');
        $this->getJson($url.'?q=RahasiaIndustri')->assertJsonPath('diagnosis.matched', []);
        $r = $this->getJson($url.'?q=plastik')->assertOk()->assertJsonPath('data.0.id', $doc->id);
        $this->assertLessThanOrEqual(240, mb_strlen($r->json('data.0.snippet')));
        $this->getJson($url.'?attention=metadata')->assertJsonCount(1, 'data')->assertJsonPath('data.0.id', $empty->id);
        $this->getJson($url.'?attention=expiring')->assertJsonCount(1, 'data')->assertJsonPath('data.0.id', $doc->id);
        $this->getJson($url.'?attention=metadata&q=wefwef+plastik')->assertJsonPath('diagnosis.matched', []);
        $this->getJson($url.'?attention=invalid')->assertUnprocessable();
    }

    public function test_malformed_excel_part_and_oversize_text_do_not_return_partial_results(): void
    {
        $file = $this->fixture('xlsx');
        $zip = new ZipArchive;
        $zip->open($file->getRealPath());
        $zip->addFromString('xl/worksheets/sheet1.xml', '<worksheet><row><c>');
        $zip->close();
        try {
            app(ProcurementOfficeReader::class)->read($file->getRealPath(), 'xlsx');
            $this->fail('Malformed XML returned partial text');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('file', $e->errors());
        }
        $text = UploadedFile::fake()->createWithContent('huge.txt', str_repeat('a', 200001));
        try {
            app(ProcurementOfficeReader::class)->read($text->getRealPath(), 'txt');
            $this->fail('Oversized text returned');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('file', $e->errors());
        }
    }

    public function test_vendor_uploads_accept_supported_formats_and_use_one_drive_paths_without_retaining_originals(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($user);
        $vendor = Vendor::create(['nama_vendor' => 'Vendor Semua Dokumen']);
        $work = storage_path('framework/testing/formats-'.Str::random(12));
        mkdir($work, 0700, true);
        $calls = 0;
        $mock = \Mockery::mock(VendorDocumentCloud::class);
        $mock->shouldReceive('workDirectory')->andReturn($work);
        $mock->shouldReceive('call')->andReturnUsing(function ($input) use (&$calls, $work) {
            $this->assertSame('upload', $input['action']);
            $this->assertFileExists($work.'/'.$input['local']);
            $calls++;

            return ['ok' => true, 'verified' => true, 'item_id' => 'cloud-'.$calls];
        });
        $this->app->instance(VendorDocumentCloud::class, $mock);
        try {
            foreach (['docx', 'xlsx', 'xls', 'pptx', 'ods', 'odt', 'odp', 'txt', 'csv', 'rtf', 'webp', 'gif', 'bmp'] as $index => $extension) {
                if ($index === 9) {
                    $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']));
                }
                $r = $this->postJson(route('vendor.documents.store', $vendor), ['type' => 'lainnya', 'title' => 'Dokumen '.$extension, 'file' => $this->fixture($extension)])->assertCreated()->assertJsonPath('document.version', 1);
                $doc = VendorDocument::findOrFail($r->json('document.id'));
                $this->assertStringEndsWith('.'.$extension, $doc->cloud_path);
                $this->assertSame([], glob($work.'/*'));
            }
            $this->assertSame(13, $calls);
        } finally {
            foreach (glob($work.'/*') as $file) {
                unlink($file);
            }rmdir($work);
        }
    }
}
