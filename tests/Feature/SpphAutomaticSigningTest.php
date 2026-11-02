<?php

namespace Tests\Feature;

use App\Http\Controllers\SpphController;
use App\Models\Ppbj;
use App\Models\SpMasterOption;
use App\Models\Spph;
use App\Models\User;
use App\Services\SpphPrintPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;
use ZipArchive;

class SpphAutomaticSigningTest extends TestCase
{
    use RefreshDatabase;

    private function document(array $amounts = []): Spph
    {
        $spph = Spph::create(['nomor_spph' => '901/PKU-XI/SPPH/2026', 'sequence_number' => 901,
            'tanggal' => '2026-11-02', 'nama_vendor' => 'Vendor Penguji', 'pic' => 'Penguji', 'deskripsi_pengadaan' => 'Pengadaan pengujian']);
        foreach ($amounts as $index => $amount) {
            $pr = Ppbj::create(['ppbj_no' => 'PR/POLICY/'.$index, 'tgl_ppbj' => '2026-11-02', 'total_sebelum_ppn' => $amount]);
            $spph->ppbjs()->attach($pr->id, ['urutan' => $index + 1]);
        }

        return $spph;
    }

    private function umum(): User
    {
        return User::factory()->create(['department' => 'umum', 'role' => 'user']);
    }

    public static function thresholds(): array
    {
        return [
            'one rupiah' => [[1], 'Harits Jansen'],
            'just under' => [['49999999.99'], 'Harits Jansen'],
            'exact boundary' => [['50000000.00'], 'Bambang Harwanta'],
            'over boundary' => [['50000000.01'], 'Bambang Harwanta'],
            'group under' => [[20000000, 29999999.99], 'Harits Jansen'],
            'group exactly boundary' => [[20000000, 30000000], 'Bambang Harwanta'],
            'group over' => [[30000000, 30000000], 'Bambang Harwanta'],
        ];
    }

    #[DataProvider('thresholds')]
    public function test_signer_follows_current_ppbj_sum_not_vendor_count_or_client_values(array $amounts, string $expected): void
    {
        $spph = $this->document($amounts);
        $spph->update(['vendor_names' => ['Vendor Penguji', 'Vendor kedua', 'Vendor ketiga']]);
        $context = app(SpphPrintPolicy::class)->context($spph);
        $this->assertTrue($context['ready']);
        $this->assertSame($expected, $context['name']);
        $this->assertSame($expected === 'Harits Jansen' ? 'Kepala Bidang Dukungan Bisnis' : 'Kepala Cabang', $context['title']);
        $this->assertSame(count($amounts), $context['pr_count']);
        $this->assertEqualsWithDelta(array_sum($amounts), (float) $context['amount'], 0.001);
    }

    public function test_missing_or_invalid_values_do_not_silently_pick_a_signer_and_manual_legacy_pr_is_supported(): void
    {
        $spph = $this->document();
        $this->assertFalse(app(SpphPrintPolicy::class)->context($spph)['ready']);
        $pr = Ppbj::create(['ppbj_no' => 'LEGACY-POLICY', 'tgl_ppbj' => '2026-11-02', 'total_sebelum_ppn' => 1]);
        $spph->update(['nomor_pr' => $pr->ppbj_no]);
        foreach ([0, -1] as $amount) {
            DB::table('ppbj')->where('id', $pr->id)->update(['total_sebelum_ppn' => $amount]);
            $context = app(SpphPrintPolicy::class)->context($spph);
            $this->assertFalse($context['ready']);
            $this->assertFalse($context['amount_valid']);
        }
        $pr->update(['total_sebelum_ppn' => 1000000]);
        $this->assertSame('Harits Jansen', app(SpphPrintPolicy::class)->context($spph)['name']);
        $spph->ppbjs()->attach($pr->id, ['urutan' => 1]);
        $other = Ppbj::create(['ppbj_no' => 'INVALID-PR', 'tgl_ppbj' => '2026-11-02', 'total_sebelum_ppn' => 1]);
        DB::table('ppbj')->where('id', $other->id)->update(['total_sebelum_ppn' => 0]);
        $spph->ppbjs()->attach($other->id, ['urutan' => 2]);
        $this->assertFalse(app(SpphPrintPolicy::class)->context($spph)['ready']);
    }

    public function test_disabled_master_is_checked_live_even_when_old_names_are_cached(): void
    {
        $spph = $this->document([1000000]);
        $this->assertTrue(app(SpphPrintPolicy::class)->context($spph)['ready']);
        cache()->put('sp_master_options:penandatangan_sci:active_names', ['Harits Jansen'], 3600);
        DB::table('sp_master_options')->where('nama', 'Harits Jansen')->update(['is_active' => false]);
        $this->assertFalse(app(SpphPrintPolicy::class)->context($spph)['ready']);
        DB::table('sp_master_options')->where('nama', 'Harits Jansen')->update(['is_active' => true]);
        SpMasterOption::where('type', 'jabatan_sci')->where('nama', 'Kepala Bidang Dukungan Bisnis')->delete();
        $this->assertFalse(app(SpphPrintPolicy::class)->context($spph)['ready']);
    }

    public function test_all_print_endpoints_reject_url_signer_and_title_tampering_and_stale_basis(): void
    {
        $this->actingAs($this->umum());
        $spph = $this->document([1000000]);
        $basis = app(SpphPrintPolicy::class)->context($spph)['fingerprint'];
        foreach (['spph.cetak', 'spph.cetak.preview', 'spph.cetak-semua-vendor', 'spph.cetak-semua-vendor.preview'] as $route) {
            $url = route($route, $spph);
            $this->getJson($url.'?penandatangan=Bambang%20Harwanta')->assertUnprocessable()->assertJsonValidationErrors('penandatangan');
            $this->getJson($url.'?jabatan=Kepala%20Cabang')->assertUnprocessable()->assertJsonValidationErrors('jabatan');
            $this->getJson($url.'?print_basis=bad')->assertUnprocessable()->assertJsonValidationErrors('print_basis');
            $this->getJson($url.'?penandatangan[]=Harits')->assertUnprocessable();
        }
        DB::table('ppbj')->update(['total_sebelum_ppn' => 60000000]);
        $this->getJson(route('spph.cetak', $spph).'?print_basis='.$basis)->assertUnprocessable()->assertJsonValidationErrors('print_basis');
    }

    public function test_context_is_authenticated_read_only_bounded_and_never_fetches_attachments(): void
    {
        Http::preventStrayRequests();
        $spph = $this->document(array_fill(0, 22, 1000000));
        $url = route('spph.print-context', $spph);
        $this->getJson($url)->assertUnauthorized();
        $this->actingAs(User::factory()->create(['department' => 'operasional', 'role' => 'user']))->getJson($url)->assertForbidden();
        $this->actingAs($this->umum())->getJson($url)->assertOk()->assertJsonPath('pr_count', 22)
            ->assertJsonCount(20, 'prs')->assertJsonPath('truncated', true)->assertJsonPath('name', 'Harits Jansen');
        DB::enableQueryLog();
        DB::flushQueryLog();
        $context = app(SpphPrintPolicy::class)->context($spph);
        $this->assertCount(3, DB::getQueryLog());
        DB::disableQueryLog();
        $this->assertSame(22000000.0, (float) $context['amount']);
        $this->assertDatabaseCount('spphs', 1);
        $this->assertDatabaseCount('ppbj', 22);
        Http::assertNothingSent();
        $spph->delete();
        $this->getJson($url)->assertNotFound();
    }

    public function test_actual_word_and_multi_vendor_zip_use_automatic_pair_without_manual_params(): void
    {
        $spph = $this->document([20000000, 30000000]);
        $spph->update(['vendor_names' => ['Vendor Penguji', 'Vendor kedua']]);
        $response = app(SpphController::class)->cetakSemuaVendor(Request::create('/spph-test'), $spph);
        $path = $response->getFile()->getPathname();
        $zip = new ZipArchive;
        $this->assertTrue($zip->open($path));
        $this->assertSame(2, $zip->numFiles);
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $file = tempnam(sys_get_temp_dir(), 'spph-test-');
            file_put_contents($file, $zip->getFromIndex($i));
            $word = new ZipArchive;
            $this->assertTrue($word->open($file));
            $xml = $word->getFromName('word/document.xml');
            $word->close();
            unlink($file);
            $this->assertStringContainsString('Bambang Harwanta', $xml);
            $this->assertStringContainsString('Kepala Cabang', $xml);
            $this->assertStringNotContainsString('Harits Jansen', $xml);
        }
        $zip->close();
        unlink($path);
    }
}
