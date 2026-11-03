<?php

namespace Tests\Feature;

use App\Models\MasterPenyediaEksternal;
use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use App\Models\Vendor;
use App\Support\PpbjVendorFilter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class PpbjVendorFilterTest extends TestCase
{
    use RefreshDatabase;

    public function test_filter_options_include_all_sources_and_refresh_after_vendor_changes(): void
    {
        MasterPenyediaEksternal::create(['nama' => 'Master Supplier']);
        Vendor::create(['nama_vendor' => 'Catalog Supplier']);
        Ppbj::create(['ppbj_no' => 'FILTER/1', 'penyedia_eksternal' => 'Historical Supplier']);
        Sp::create(['nomor_sp' => '001/PKU-X/SP/2026', 'sequence_number' => 1,
            'nama_vendor' => 'SP Supplier', 'deskripsi_pengadaan' => 'Test', 'pic' => 'Test']);
        $spph = Spph::create(['nomor_spph' => '001/PKU-X/SPPH/2026', 'sequence_number' => 1,
            'tanggal' => '2026-10-23', 'nama_vendor' => 'Candidate A',
            'vendor_names' => ['Candidate A', 'Candidate B'], 'deskripsi_pengadaan' => 'Test', 'pic' => 'Test']);

        $user = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $response = $this->actingAs($user)->get(route('ppbj.index'))->assertOk();
        $options = $response->viewData('filterPenyediaEksternals');
        foreach (['Master Supplier', 'Catalog Supplier', 'Historical Supplier', 'SP Supplier', 'Candidate A', 'Candidate B'] as $name) {
            $this->assertContains($name, $options);
        }
        $spph->update(['vendor_names' => ['Candidate A', 'Candidate C']]);
        $this->assertContains('Candidate C', PpbjVendorFilter::options());
        $this->assertNotContains('Candidate B', PpbjVendorFilter::options());
        $this->assertSame(1, PpbjVendorFilter::options()->filter(fn ($name) => $name === 'Candidate A')->count());
    }

    public function test_vendor_filter_matches_whole_candidates_and_respects_final_sp_vendor(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        foreach (['Vendor A; Vendor B; Vendor C', 'Vendor B', 'Vendor BB', 'Vendor A'] as $index => $name) {
            Ppbj::create(['ppbj_no' => 'FILTER/'.($index + 1), 'penyedia_eksternal' => $name]);
        }
        $response = $this->actingAs($user)->get(route('ppbj.index', ['penyedia_eksternal' => 'Vendor B']))->assertOk();
        $this->assertSame(['FILTER/2', 'FILTER/1'], $response->viewData('ppbj')->pluck('ppbj_no')->all());
        $export = $this->get(route('ppbj.export', ['penyedia_eksternal' => 'Vendor B']))->assertOk()->streamedContent();
        $this->assertStringContainsString('FILTER/1', $export);
        $this->assertStringContainsString('FILTER/2', $export);
        $this->assertStringNotContainsString('FILTER/3', $export);
        $this->assertStringNotContainsString('FILTER/4', $export);
        Ppbj::where('ppbj_no', 'FILTER/1')->firstOrFail()->update(['penyedia_eksternal' => 'Vendor A']);
        $response = $this->get(route('ppbj.index', ['penyedia_eksternal' => 'Vendor B']))->assertOk();
        $this->assertSame(['FILTER/2'], $response->viewData('ppbj')->pluck('ppbj_no')->all());
    }

    public function test_vendor_filter_escapes_like_wildcards(): void
    {
        Ppbj::create(['ppbj_no' => 'LITERAL', 'penyedia_eksternal' => 'Other; PT 100%_!; Last']);
        Ppbj::create(['ppbj_no' => 'OTHER', 'penyedia_eksternal' => 'Other; PT 100XX!; Last']);
        $query = Ppbj::query();
        PpbjVendorFilter::apply($query, 'PT 100%_!');
        $this->assertSame(['LITERAL'], $query->pluck('ppbj_no')->all());
    }

    public function test_unrelated_document_updates_keep_vendor_options_warm_but_vendor_changes_refresh(): void
    {
        foreach ([Sp::class, Spph::class] as $model) {
            $attributes = ['nama_vendor' => 'Original Supplier', 'sequence_number' => 1, 'deskripsi_pengadaan' => 'Original', 'pic' => 'Test'];
            $attributes[$model === Sp::class ? 'nomor_sp' : 'nomor_spph'] = 'CACHE/'.$model;
            $attributes[$model === Sp::class ? 'tanggal_sp' : 'tanggal'] = now()->toDateString();
            $document = $model::create($attributes)->fresh();
            $this->assertContains('Original Supplier', PpbjVendorFilter::options());
            $document->update(['deskripsi_pengadaan' => 'Only description changed']);
            DB::enableQueryLog();
            PpbjVendorFilter::options();
            $this->assertCount(0, DB::getQueryLog(), 'Description edits must not rebuild the multi-source vendor list.');
            DB::disableQueryLog();
            DB::flushQueryLog();
            $document->update(['nama_vendor' => 'Updated Supplier']);
            $this->assertContains('Updated Supplier', PpbjVendorFilter::options());
            $document->delete();
            $this->assertNotContains('Updated Supplier', PpbjVendorFilter::options());
            $document->restore();
            $this->assertContains('Updated Supplier', PpbjVendorFilter::options());
            $document->forceDelete();
        }
    }
}
