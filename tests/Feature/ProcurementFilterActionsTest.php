<?php

namespace Tests\Feature;

use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProcurementFilterActionsTest extends TestCase
{
    use RefreshDatabase;

    public function test_both_pages_render_working_filter_actions_and_hologram_keeps_the_same_controls(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']));
        foreach (['sp', 'spph'] as $kind) {
            foreach ([route($kind.'.index', ['search' => 'Kursi', 'dari' => '2026-11-01', 'sampai' => '2026-11-30']), route('virtual-office.hologram', ['tool' => $kind, 'office_frame' => 3, 'search' => 'Kursi'])] as $url) {
                $response = $this->get($url)->assertOk()->assertSee('Reset Filter')->assertDontSee('onclick="resetDate()"', false);
                $html = $response->getContent();
                foreach (['resetFilters()', "setQuickDate('today')", "setQuickDate('month')", "setQuickDate('year')", 'doExport()', 'clearSearch()'] as $handler) {
                    $this->assertMatchesRegularExpression('/<button\b[^>]*type="button"[^>]*onclick="'.preg_quote($handler, '/').'"/s', $html);
                }
                $this->assertStringContainsString('aria-label="Hapus filter pencarian"', $html);
                $this->assertLessThan(strpos($html, 'assets/'.$kind.'/'.$kind.'.js'), strpos($html, 'assets/app/procurement-filters.js'));
            }
        }
    }

    public function test_sp_filter_reset_and_export_keep_auto_and_oracle_records_separate(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);$this->actingAs($user);
        foreach ([['SP-FILTER-A', 'Kursi audit filter', '2026-11-09', 'auto'], ['SP-FILTER-B', 'Meja audit filter', '2026-10-10', 'auto'], ['ORACLE-FILTER-C', 'Kursi Oracle', '2026-11-09', 'oracle']] as $i => [$number, $description, $date, $mode]) {
            Sp::create(['nomor_sp' => $number, 'sequence_number' => $i + 1, 'tanggal_sp' => $date, 'numbering_mode' => $mode, 'deskripsi_pengadaan' => $description, 'nama_vendor' => 'Vendor Audit', 'pic' => 'PIC Audit', 'created_by_user_id' => $user->id]);
        }
        $filters = ['search' => 'Kursi', 'pic' => 'PIC Audit', 'dari' => '2026-11-01', 'sampai' => '2026-11-30'];
        $this->assertSame(['SP-FILTER-A'], $this->get(route('sp.index', $filters))->assertOk()->viewData('sps')->pluck('nomor_sp')->all());
        $this->assertCount(2, $this->get(route('sp.index'))->assertOk()->viewData('sps'));
        $this->assertSame(['ORACLE-FILTER-C'], $this->get(route('sp.index', ['mode' => 'oracle']))->assertOk()->viewData('sps')->pluck('nomor_sp')->all());
        $csv = $this->get(route('sp.export', $filters))->assertOk()->streamedContent();
        $this->assertStringContainsString('SP-FILTER-A', $csv);$this->assertStringNotContainsString('SP-FILTER-B', $csv);$this->assertStringNotContainsString('ORACLE-FILTER-C', $csv);
        $csv = $this->get(route('sp.export', ['mode' => 'oracle']))->assertOk()->streamedContent();
        $this->assertStringContainsString('ORACLE-FILTER-C', $csv);$this->assertStringNotContainsString('SP-FILTER-A', $csv);
    }

    public function test_spph_vendor_search_and_date_filters_match_export_and_unfiltered_list(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'user']);$this->actingAs($user);
        foreach ([['SPPH-FILTER-A', 'Kursi audit filter', 'Vendor A', '2026-11-09'], ['SPPH-FILTER-B', 'Meja audit filter', 'Vendor B', '2026-10-10']] as $i => [$number, $description, $vendor, $date]) {
            Spph::create(['nomor_spph' => $number, 'sequence_number' => $i + 1, 'tanggal' => $date, 'deskripsi_pengadaan' => $description, 'nama_vendor' => $vendor, 'pic' => 'PIC Audit', 'created_by_user_id' => $user->id]);
        }
        $filters = ['search' => 'Kursi', 'pic' => 'PIC Audit', 'vendor' => 'Vendor A', 'dari' => '2026-11-01', 'sampai' => '2026-11-30'];
        $this->assertSame(['SPPH-FILTER-A'], $this->get(route('spph.index', $filters))->assertOk()->viewData('spphs')->pluck('nomor_spph')->all());
        $this->assertCount(2, $this->get(route('spph.index'))->assertOk()->viewData('spphs'));
        $csv = $this->get(route('spph.export', $filters))->assertOk()->streamedContent();
        $this->assertStringContainsString('SPPH-FILTER-A', $csv);$this->assertStringNotContainsString('SPPH-FILTER-B', $csv);
    }
}
