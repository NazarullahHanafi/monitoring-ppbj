<?php

namespace Tests\Feature;

use App\Http\Controllers\VendorDocumentController;
use App\Models\ActivityLog;
use App\Models\User;
use App\Models\Vendor;
use App\Models\VendorDocument;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class VendorDocumentReadReliabilityTest extends TestCase
{
    use RefreshDatabase;

    private Vendor $vendor;

    private User $actor;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actor = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($this->actor);
        $this->vendor = Vendor::create(['nama_vendor' => 'Vendor Reliability']);
    }

    private function document(array $extra = []): VendorDocument
    {
        $id = (string) Str::uuid();
        $doc = VendorDocument::create($extra + ['id' => $id, 'vendor_id' => $this->vendor->id, 'uploaded_by' => $this->actor->id,
            'type' => 'nib', 'title' => 'Izin Usaha', 'original_name' => 'izin.pdf', 'mime' => 'application/pdf', 'size' => 32,
            'checksum' => str_repeat('a', 64), 'cloud_path' => 'private/'.$id.'.pdf', 'cloud_item_id' => 'private-cloud-id', 'status' => 'ready', 'search_text' => 'plastik industri']);
        $doc->reindex();

        return $doc;
    }

    private function request(array $input = [], string $method = 'GET'): Request
    {
        $request = Request::create('/vendors/'.$this->vendor->id.'/documents', $method, $input);
        $request->headers->set('Accept', 'application/json');
        $request->setUserResolver(fn () => $this->actor);
        $this->app->instance('request', $request);

        return $request;
    }

    private function payload(VendorDocument $doc, array $extra = []): array
    {
        return $extra + ['type' => $doc->type, 'title' => $doc->title, 'document_number' => $doc->document_number,
            'expires_at' => $doc->expires_at?->format('Y-m-d'), 'search_text' => $doc->search_text, 'text_confirmed' => true, 'version' => $doc->version];
    }

    private function controller(): VendorDocumentController
    {
        return app(VendorDocumentController::class);
    }

    private function writes(): array
    {
        return array_values(array_filter(DB::getQueryLog(), fn ($q) => preg_match('/^\s*(insert|update|delete|replace)\b/i', $q['query'])));
    }

    public function test_eight_term_diagnosis_uses_three_queries_and_preserves_matched_missing_order(): void
    {
        $this->document();
        DB::enableQueryLog();
        DB::flushQueryLog();
        $response = $this->controller()->index($this->request(['q' => 'plastik hilang industri alpha beta gamma delta epsilon']), $this->vendor);
        $queries = DB::getQueryLog();
        $this->assertCount(3, $queries);
        $this->assertSame(['plastik', 'industri'], $response->getData(true)['diagnosis']['matched']);
        $this->assertSame(['hilang', 'alpha', 'beta', 'gamma', 'delta', 'epsilon'], $response->getData(true)['diagnosis']['missing']);
        $this->assertSame('plastik industri', $response->getData(true)['diagnosis']['suggestion']);
        $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
        $this->assertSame([], $this->writes());
    }

    public function test_diagnosis_respects_vendor_type_attention_and_ready_status(): void
    {
        $this->document(['type' => 'npwp', 'search_text' => 'privatnpwp']);
        $this->document(['status' => 'queued', 'search_text' => 'belumsiap']);
        $other = Vendor::create(['nama_vendor' => 'Other vendor']);
        $this->document(['vendor_id' => $other->id, 'search_text' => 'rahasialain']);
        $this->document(['expires_at' => now()->addYear(), 'search_text' => 'masihlama']);
        foreach ([['type' => 'nib', 'q' => 'privatnpwp hilang'], ['q' => 'belumsiap hilang'], ['q' => 'rahasialain hilang'], ['attention' => 'expiring', 'q' => 'masihlama hilang']] as $input) {
            $data = $this->controller()->index($this->request($input), $this->vendor)->getData(true);
            $this->assertSame([], $data['data']);
            $this->assertSame([], $data['diagnosis']['matched']);
            $this->assertSame('', $data['diagnosis']['suggestion']);
        }
    }

    public function test_normal_reads_are_projected_bounded_and_do_not_return_complete_scan_text(): void
    {
        $text = str_repeat('plastik panjang ', 1000);
        for ($i = 0; $i < 21; $i++) {
            $this->document(['search_text' => $text]);
        }
        DB::enableQueryLog();
        DB::flushQueryLog();
        $response = $this->controller()->index($this->request(['q' => 'plastik']), $this->vendor);
        $data = $response->getData(true);
        $this->assertCount(2, DB::getQueryLog());
        $this->assertCount(20, $data['data']);
        $this->assertTrue($data['has_more']);
        $this->assertNull($data['diagnosis']);
        $this->assertStringNotContainsString($text, $response->getContent());
        $this->assertStringNotContainsString('private-cloud-id', $response->getContent());
        $this->assertStringNotContainsString('select *', strtolower(DB::getQueryLog()[0]['query']));
        $later = $this->controller()->index($this->request(['q' => 'hilang', 'page' => 2]), $this->vendor)->getData(true);
        $this->assertNull($later['diagnosis']);
    }

    public function test_malformed_filters_fail_before_document_queries(): void
    {
        foreach ([['q' => ['plastik']], ['type' => ['nib']], ['attention' => ['metadata']], ['page' => 0], ['page' => 10001]] as $input) {
            DB::enableQueryLog();
            DB::flushQueryLog();
            try {
                $this->controller()->index($this->request($input), $this->vendor);
                $this->fail('Malformed filter accepted');
            } catch (ValidationException) {
                $this->assertCount(0, DB::getQueryLog());
            }
        }
    }

    public function test_unchanged_review_preserves_version_timestamp_index_and_audit_without_writes_or_reload(): void
    {
        $doc = $this->document(['document_number' => '7300', 'expires_at' => '2027-11-17']);
        $timestamp = $doc->getRawOriginal('updated_at');
        $terms = DB::table('vendor_document_terms')->where('document_id', $doc->id)->orderBy('term')->pluck('term')->all();
        $this->travel(2)->minutes();
        DB::enableQueryLog();
        DB::flushQueryLog();
        $response = $this->controller()->update($this->request($this->payload($doc), 'PUT'), $this->vendor, $doc);
        $this->assertFalse($response->getData(true)['changed']);
        $this->assertSame(1, $response->getData(true)['document']['version']);
        $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
        $this->assertSame([], $this->writes());
        $this->assertCount(1, DB::getQueryLog());
        $this->assertSame($timestamp, $doc->fresh()->getRawOriginal('updated_at'));
        $this->assertSame($terms, DB::table('vendor_document_terms')->where('document_id', $doc->id)->orderBy('term')->pluck('term')->all());
        $this->assertDatabaseCount('activity_logs', 0);
    }

    public function test_changed_review_updates_index_and_audit_once_and_rejects_stale_version_even_for_same_content(): void
    {
        $doc = $this->document();
        $data = $this->payload($doc, ['search_text' => 'logam baru']);
        $response = $this->controller()->update($this->request($data, 'PUT'), $this->vendor, $doc)->getData(true);
        $this->assertTrue($response['changed']);
        $this->assertSame(2, $response['document']['version']);
        $this->assertDatabaseHas('vendor_document_terms', ['document_id' => $doc->id, 'term' => 'logam']);
        $this->assertDatabaseMissing('vendor_document_terms', ['document_id' => $doc->id, 'term' => 'plastik']);
        $this->assertDatabaseCount('activity_logs', 1);
        $this->putJson('/vendors/'.$this->vendor->id.'/documents/'.$doc->id, $data)->assertConflict();
        $this->assertDatabaseCount('activity_logs', 1);
    }

    public function test_zero_is_preserved_in_document_number_and_confirmed_text_and_can_be_searched(): void
    {
        $doc = $this->document();
        $data = $this->payload($doc, ['document_number' => '0', 'search_text' => '0']);
        $result = $this->controller()->update($this->request($data, 'PUT'), $this->vendor, $doc)->getData(true);
        $this->assertSame('0', $result['document']['document_number']);
        $this->assertTrue($result['document']['has_text']);
        $this->assertSame('0', $doc->fresh()->search_text);
        $this->assertDatabaseHas('vendor_document_terms', ['document_id' => $doc->id, 'term' => '0']);
        $response = $this->controller()->index($this->request(['q' => '0']), $this->vendor)->getData(true);
        $this->assertSame($doc->id, $response['data'][0]['id']);
    }

    public function test_audit_failure_rolls_back_content_version_and_index(): void
    {
        $doc = $this->document();
        Event::listen('eloquent.creating: '.ActivityLog::class, fn () => throw new \RuntimeException('synthetic audit failure'));
        try {
            $this->controller()->update($this->request($this->payload($doc, ['search_text' => 'logam baru']), 'PUT'), $this->vendor, $doc);
            $this->fail('Audit failure ignored');
        } catch (\RuntimeException $error) {
            $this->assertSame('synthetic audit failure', $error->getMessage());
        }
        $this->assertSame(1, $doc->fresh()->version);
        $this->assertSame('plastik industri', $doc->fresh()->search_text);
        $this->assertDatabaseHas('vendor_document_terms', ['document_id' => $doc->id, 'term' => 'plastik']);
        $this->assertDatabaseMissing('vendor_document_terms', ['document_id' => $doc->id, 'term' => 'logam']);
    }

    public function test_array_type_is_rejected_for_review_and_upload_before_cloud_or_mutation(): void
    {
        $doc = $this->document();
        $this->putJson('/vendors/'.$this->vendor->id.'/documents/'.$doc->id, $this->payload($doc, ['type' => ['nib']]))->assertUnprocessable()->assertJsonValidationErrors('type');
        $this->postJson('/vendors/'.$this->vendor->id.'/documents', ['type' => ['nib']])->assertUnprocessable()->assertJsonValidationErrors('type');
        $this->assertSame(1, $doc->fresh()->version);
        $this->assertDatabaseCount('activity_logs', 0);
    }
}
