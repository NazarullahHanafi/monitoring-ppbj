<?php

namespace Tests\Feature;

use App\Http\Controllers\SpController;
use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\SpMasterOption;
use App\Models\Vendor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;
use ZipArchive;

class SpPrintQueryBudgetTest extends TestCase
{
    use RefreshDatabase;

    public static function valueTiers(): array
    {
        return ['sp' => [1000000], 'contract' => [60000000], 'contract300' => [350000000], 'contract500' => [550000000]];
    }

    public function test_empty_print_references_do_not_query_the_database(): void
    {
        $controller = new SpController;
        DB::enableQueryLog();
        DB::flushQueryLog();
        try {
            foreach (['findVendorByName', 'findPrintPpbj'] as $method) {
                $reader = new \ReflectionMethod($controller, $method);
                foreach ([null, '', " \t\n "] as $value) {
                    $this->assertNull($reader->invoke($controller, $value));
                }
            }
            $this->assertCount(0, DB::getQueryLog());
        } finally {
            DB::disableQueryLog();
        }
    }

    public function test_print_lookups_keep_legacy_vendor_matching_and_refresh_pr_metadata_without_unneeded_fields(): void
    {
        $controller = new SpController;
        $vendor = Vendor::create(['nama_vendor' => 'PT Vendor Exact', 'email' => 'private@example.test', 'alamat' => 'Alamat historis', 'is_active' => false]);
        Vendor::create(['nama_vendor' => ' PT Vendor Exact ', 'alamat' => 'Alamat fallback', 'is_active' => true]);
        $findVendor = new \ReflectionMethod($controller, 'findVendorByName');
        $findPr = new \ReflectionMethod($controller, 'findPrintPpbj');
        $pr = Ppbj::create(['ppbj_no' => 'PR/LOOKUP/TEST', 'uraian' => 'Uraian besar yang tidak diperlukan untuk cetak', 'general_registration_number' => 'REG-AWAL']);
        DB::enableQueryLog();
        DB::flushQueryLog();
        try {
            $exact = $findVendor->invoke($controller, 'PT Vendor Exact');
            $this->assertSame($vendor->id, $exact->id);
            $this->assertSame('Alamat historis', $exact->alamat);
            $this->assertArrayNotHasKey('email', $exact->getAttributes());
            $this->assertArrayNotHasKey('is_active', $exact->getAttributes());
            $this->assertCount(1, DB::getQueryLog());
            DB::flushQueryLog();
            $fallback = $findVendor->invoke($controller, '  pt vendor exact  ');
            $this->assertSame($vendor->id, $fallback->id);
            $this->assertCount(2, DB::getQueryLog());
            $first = $findPr->invoke($controller, '  PR/LOOKUP/TEST  ');
            $this->assertSame('REG-AWAL', $first->general_registration_number);
            $this->assertArrayNotHasKey('uraian', $first->getAttributes());
            $pr->update(['general_registration_number' => 'REG-TERBARU']);
            $this->assertSame('REG-TERBARU', $findPr->invoke($controller, $pr->ppbj_no)->general_registration_number);
            $this->assertNull($findPr->invoke($controller, 'PR/NOT-FOUND'));
        } finally {
            DB::disableQueryLog();
        }
    }

    #[DataProvider('valueTiers')]
    public function test_each_value_tier_reads_items_and_primary_pr_once_and_preserves_document_contents(int $amount): void
    {
        $masters = [];
        foreach (['bidang_pr', 'penandatangan_sci', 'jabatan_sci'] as $type) {
            $masters[$type] = SpMasterOption::active()->where('type', $type)->firstOrFail()->nama;
            Cache::put('sp_master_options:'.$type.':active_names', [$masters[$type]], 3600);
        }
        Vendor::create(['nama_vendor' => 'PT VENDOR QUERY', 'alamat' => 'Jalan Uji Query 12', 'telepon' => '0761-12345',
            'fax' => '0761-67890', 'npwp' => 'NPWP-QUERY-123', 'direktur' => 'Direktur Query', 'jabatan' => 'Direktur Utama', 'is_active' => true]);
        $pr = Ppbj::create(['ppbj_no' => 'PR/QUERY/TEST', 'tgl_ppbj' => '2026-11-18', 'uraian' => 'Rincian uji cetak',
            'total_sebelum_ppn' => $amount, 'general_registration_number' => 'REG-QUERY-2026', 'general_registered_at' => '2026-11-17']);
        $sp = Sp::create(['nomor_sp' => '998/PKU-XI/SP/2026', 'sequence_number' => 998, 'tanggal_sp' => '2026-11-18',
            'nilai_sp' => $amount, 'nilai_pr' => $amount, 'nomor_pr' => $pr->ppbj_no, 'nama_vendor' => 'PT VENDOR QUERY',
            'pic' => 'Penguji', 'deskripsi_pengadaan' => 'Barang uji cetak', 'awal_kontrak' => '2026-11-18', 'akhir_kontrak' => '2026-12-18']);
        $sp->ppbjs()->attach($pr->id, ['urutan' => 1]);
        $item = $sp->items()->create(['urutan' => 1, 'nama_barang' => 'Barang lama', 'satuan' => 'Unit', 'jumlah' => 2, 'harga_satuan' => $amount / 2, 'subtotal' => $amount]);
        // The public renderer must refresh even if a caller hands it a stale relation.
        $sp->load('items');
        $item->update(['nama_barang' => 'Barang terbaru query']);

        DB::enableQueryLog();
        DB::flushQueryLog();
        $response = app(SpController::class)->cetakSp($sp, $masters['bidang_pr'], $masters['penandatangan_sci'], $masters['jabatan_sci'], 'realization');
        $queries = DB::getQueryLog();
        DB::disableQueryLog();
        $path = $response->getFile()->getPathname();
        try {
            $itemReads = array_filter($queries, fn ($query) => preg_match('/from ["`]sp_items["`]/i', $query['query']));
            $primaryReads = array_filter($queries, fn ($query) => preg_match('/from ["`]ppbj["`] where/i', $query['query']));
            $vendorReads = array_filter($queries, fn ($query) => preg_match('/from ["`]vendors["`]/i', $query['query']));
            $this->assertCount(1, $itemReads, 'Item rows must not be read twice while dispatching to a document template.');
            $this->assertCount(1, $primaryReads, 'Registration details must reuse the primary PR read.');
            $this->assertCount(1, $vendorReads);
            foreach (array_merge($primaryReads, $vendorReads) as $query) {
                $this->assertDoesNotMatchRegularExpression('/select\s+\*/i', $query['query']);
            }
            $zip = new ZipArchive;
            $this->assertTrue($zip->open($path));
            $xml = $zip->getFromName('word/document.xml');
            $zip->close();
            $dom = new \DOMDocument;
            $this->assertTrue($dom->loadXML($xml));
            $text = $dom->textContent;
            foreach (['Barang terbaru query', 'REG-QUERY-2026', 'Direktur Query', 'Jalan Uji Query 12', $masters['bidang_pr'], 'PR/QUERY/TEST'] as $expected) {
                $this->assertStringContainsString($expected, $text);
            }
            $this->assertStringNotContainsString('Barang lama', $text);
            $this->assertStringContainsString('realisasi pekerjaan', mb_strtolower($text));
        } finally {
            @unlink($path);
        }
    }
}
