<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use App\Support\ProcurementDocumentSearch;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ProcurementDocumentSearchTest extends TestCase
{
    use RefreshDatabase;

    private function document(string $kind, int $sequence, string $description = 'Perlengkapan kantor'): Sp|Spph
    {
        $attributes = ['sequence_number' => $sequence, 'nama_vendor' => 'Vendor Perlengkapan',
            'deskripsi_pengadaan' => $description, 'pic' => 'Nazar'];
        if ($kind === 'sp') {
            return Sp::create($attributes + ['nomor_sp' => sprintf('%03d/PKU-X/SP/2026', $sequence),
                'tanggal_sp' => '2026-10-20', 'nilai_sp' => 1_000_000, 'numbering_mode' => 'auto']);
        }

        return Spph::create($attributes + ['nomor_spph' => sprintf('%03d/PKU-X/SPPH/2026', $sequence), 'tanggal' => '2026-10-20']);
    }

    private function item(Sp|Spph $document, string $name): void
    {
        $document->items()->create(['urutan' => $document->items()->count() + 1, 'nama_barang' => $name,
            'satuan' => 'Unit', 'jumlah' => '1', 'harga_satuan' => 1_000_000, 'subtotal' => 1_000_000]);
    }

    private function pr(string $number, string $description): Ppbj
    {
        return Ppbj::create(['ppbj_no' => $number, 'uraian' => $description,
            'tgl_ppbj' => '2026-10-20', 'total_sebelum_ppn' => 2_000_000]);
    }

    private function login(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']));
    }

    public function test_both_lists_find_item_names_with_word_order_independence_and_show_safe_hint(): void
    {
        $this->login();
        foreach (['sp' => 'sps', 'spph' => 'spphs'] as $kind => $viewKey) {
            $match = $this->document($kind, 801);
            $this->item($match, '<p>Kursi <strong>rapat</strong> ergonomis</p>');
            $other = $this->document($kind, 802);
            $this->item($other, 'Meja kantor');
            $response = $this->get(route($kind.'.index', ['search' => '  RAPAT   kursi  ']))->assertOk();
            $this->assertSame([$match->id], $response->viewData($viewKey)->modelKeys());
            $response->assertSee('Barang/jasa cocok:')->assertSee('Kursi rapat ergonomis')->assertDontSee('<strong>rapat</strong>', false);
        }
    }

    public function test_all_grouped_prs_and_legacy_pr_description_are_searchable(): void
    {
        $this->login();
        $first = $this->pr('PKB/PR-26/CON/8801', 'Meja kantor');
        $second = $this->pr('PKB/PR-26/CON/8802', 'Pengadaan kursi pelayanan');
        $legacy = $this->pr('PKB/PR-26/CON/8803', 'Kursi tamu');
        foreach (['sp' => 'sps', 'spph' => 'spphs'] as $kind => $viewKey) {
            $grouped = $this->document($kind, 810);
            $grouped->update(['nomor_pr' => $first->ppbj_no]);
            $grouped->ppbjs()->sync([$first->id => ['urutan' => 1], $second->id => ['urutan' => 2]]);
            $old = $this->document($kind, 811);
            $old->update(['nomor_pr' => $legacy->ppbj_no]);
            $response = $this->get(route($kind.'.index', ['search' => 'kursi']))->assertOk();
            $this->assertEqualsCanonicalizing([$grouped->id, $old->id], $response->viewData($viewKey)->modelKeys());
            $this->assertSame([$grouped->id], $this->get(route($kind.'.index', ['search' => '8802']))->assertOk()->viewData($viewKey)->modelKeys());
        }
    }

    public function test_existing_filters_mode_and_soft_delete_scopes_are_preserved(): void
    {
        $this->login();
        foreach (['sp' => 'sps', 'spph' => 'spphs'] as $kind => $viewKey) {
            $keep = $this->document($kind, 820);
            $this->item($keep, 'Kursi kantor');
            $wrongPic = $this->document($kind, 821);
            $wrongPic->update(['pic' => 'Yoga']);
            $this->item($wrongPic, 'Kursi kantor');
            $deleted = $this->document($kind, 822);
            $this->item($deleted, 'Kursi kantor');
            $deleted->delete();
            $query = ['search' => 'kursi', 'pic' => 'Nazar', 'dari' => '2026-10-01', 'sampai' => '2026-10-30'];
            if ($kind === 'spph') {
                $query['vendor'] = 'Vendor Perlengkapan';
            }
            $this->assertSame([$keep->id], $this->get(route($kind.'.index', $query))->assertOk()->viewData($viewKey)->modelKeys());
        }
        $oracle = $this->document('sp', 823);
        $oracle->update(['numbering_mode' => 'oracle']);
        $this->item($oracle, 'Kursi direksi');
        $this->assertSame([$oracle->id], $this->get(route('sp.index', ['search' => 'kursi', 'mode' => 'oracle']))->assertOk()->viewData('sps')->modelKeys());
    }

    public function test_export_uses_the_same_item_and_linked_pr_search_as_list(): void
    {
        $this->login();
        foreach (['sp', 'spph'] as $kind) {
            $match = $this->document($kind, 830);
            $this->item($match, 'Kursi rapat');
            $other = $this->document($kind, 831);
            $this->item($other, 'Meja kerja');
            $response = $this->get(route($kind.'.export', ['search' => 'kursi']))->assertOk();
            $content = $response->streamedContent();
            $this->assertStringContainsString($match->getAttribute($kind === 'sp' ? 'nomor_sp' : 'nomor_spph'), $content);
            $this->assertStringNotContainsString($other->getAttribute($kind === 'sp' ? 'nomor_sp' : 'nomor_spph'), $content);
        }
    }

    public function test_wildcards_are_literal_and_untrusted_input_cannot_change_sql(): void
    {
        foreach ([Sp::class, Spph::class] as $class) {
            $kind = $class === Sp::class ? 'sp' : 'spph';
            $match = $this->document($kind, 840, 'Garansi 100% kode A_B');
            $this->document($kind, 841, 'Garansi 1000 kode ACB');
            $this->assertSame([$match->id], ProcurementDocumentSearch::apply($class::query(), '100% A_B')->pluck('id')->all());
            $this->assertSame([], ProcurementDocumentSearch::apply($class::query(), "' OR 1=1 --")->pluck('id')->all());
        }
    }

    public function test_item_hints_are_one_query_only_for_the_displayed_page_and_not_loaded_without_search(): void
    {
        $first = $this->document('sp', 850);
        $this->item($first, 'Kursi rapat');
        $offPage = $this->document('sp', 851);
        $this->item($offPage, 'Kursi lain');
        $page = Sp::whereKey($first->id)->get();
        DB::enableQueryLog();
        $this->assertSame([], ProcurementDocumentSearch::itemHints($page, '', true));
        $this->assertCount(0, DB::getQueryLog());
        $hints = ProcurementDocumentSearch::itemHints($page, 'kursi', true);
        $this->assertSame([$first->id => 'Kursi rapat'], $hints);
        $this->assertCount(1, DB::getQueryLog());
        DB::disableQueryLog();
    }

    public function test_search_zero_is_not_ignored_and_oversized_or_array_input_is_rejected(): void
    {
        $this->login();
        $match = $this->document('sp', 861, 'Kode uji 0');
        $this->document('sp', 862, 'Lainnya');
        // Both numbers have zeroes in their year/month; assert literal filtering via item hints too.
        $this->item($match, 'Kursi tipe 0');
        $response = $this->get(route('sp.index', ['search' => '0']))->assertOk();
        $this->assertArrayHasKey($match->id, $response->viewData('itemSearchHints'));
        $this->assertMatchesRegularExpression('/"hasFilter":\s*true/', $response->getContent());
        $spph = $this->get(route('spph.index', ['search' => '0']))->assertOk();
        $this->assertMatchesRegularExpression('/"hasFilter":\s*true/', $spph->getContent());
        $this->getJson(route('sp.index', ['search' => str_repeat('x', 161)]))->assertStatus(422)->assertJsonValidationErrors('search');
        $this->getJson(route('spph.index', ['search' => ['kursi']]))->assertStatus(422)->assertJsonValidationErrors('search');
    }

    public function test_rich_text_snippet_preserves_line_breaks_and_stays_bounded(): void
    {
        $document = $this->document('sp', 870);
        $this->item($document, '<p>Kursi kantor</p><div>Merk: Homedoki<br>Warna: putih</div>');
        $hints = ProcurementDocumentSearch::itemHints(Sp::whereKey($document->id)->get(), 'kursi', true);
        $this->assertSame('Kursi kantor Merk: Homedoki Warna: putih', $hints[$document->id]);
        $long = $this->document('sp', 871);
        $this->item($long, str_repeat('penjelasan ', 100).'kursi '.str_repeat('rincian ', 100));
        $hint = ProcurementDocumentSearch::itemHints(Sp::whereKey($long->id)->get(), 'kursi', true)[$long->id];
        $this->assertStringContainsString('kursi', $hint);
        $this->assertLessThanOrEqual(182, mb_strlen($hint));
        $this->assertStringStartsWith('…penjelasan ', $hint);
    }
}
