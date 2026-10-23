<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\User;
use App\Support\PpbjMoneySearch;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PpbjSmartFiltersTest extends TestCase
{
    use RefreshDatabase;

    public function test_multi_filters_use_or_within_group_and_and_between_groups_and_export_matches(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'superadmin']));
        foreach ([['Vendor A', 'LAB', 'Buyer A', 0], ['Vendor B; Vendor C', 'CON', 'Buyer B', 100], ['Vendor C', 'OTHER', 'Buyer A', 50], ['Vendor D', 'LAB', 'Buyer B', 20]] as $index => [$vendor, $portfolio, $buyer, $progress]) {
            $row = Ppbj::create(['ppbj_no' => 'SMART/'.($index + 1), 'penyedia_eksternal' => $vendor, 'portofolio' => $portfolio, 'buyer' => $buyer]);
            \Illuminate\Support\Facades\DB::table('ppbj')->where('id', $row->id)->update(['progres' => $progress]);
        }
        $filters = ['penyedia_eksternal' => ['Vendor A', 'Vendor C'], 'portofolio' => ['LAB', 'CON'], 'buyer' => ['Buyer A', 'Buyer B'], 'progress' => ['0', '100']];
        $response = $this->get(route('ppbj.index', $filters))->assertOk();
        $this->assertSame(['SMART/2', 'SMART/1'], $response->viewData('ppbj')->pluck('ppbj_no')->all());
        $response->assertSee('name="penyedia_eksternal[]"', false)->assertSee('name="status_sla[]"', false);
        $csv = $this->get(route('ppbj.export', $filters))->assertOk()->streamedContent();
        $this->assertStringContainsString('SMART/1', $csv);
        $this->assertStringContainsString('SMART/2', $csv);
        $this->assertStringNotContainsString('SMART/3', $csv);
        $this->assertStringNotContainsString('SMART/4', $csv);
    }

    public function test_money_formats_are_parsed_without_confusing_decimal_units(): void
    {
        foreach (['8 juta' => 8e6, '8,375 juta' => 8375000, '8.375 juta' => 8375000, '8 milyar' => 8e9, '8 miliar' => 8e9, '8,375 miliar' => 8375000000, '800 ribu' => 800000, '8.375.000' => 8375000, 'Rp 8.375.000,50' => 8375000.5] as $text => $value) {
            $this->assertSame((float) $value, PpbjMoneySearch::parse($text)['value'], $text);
        }
        $this->assertNull(PpbjMoneySearch::parse('8,2,4 juta'));
        $this->assertNull(PpbjMoneySearch::parse('-8 juta'));
    }

    public function test_money_search_uses_selected_columns_and_preserves_pr_number_search(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'superadmin']));
        Ppbj::create(['ppbj_no' => 'PKB/PR-26/CON/0825', 'total_sebelum_ppn' => 8375000]);
        Ppbj::create(['ppbj_no' => 'SP-VALUE', 'total_sebelum_ppn' => 20e6, 'nilai_sp_spk' => 8375000]);
        Ppbj::create(['ppbj_no' => 'BPG-VALUE', 'nilai_bpg' => 8375000]);
        $response = $this->get(route('ppbj.index', ['amount' => '8,375 juta', 'amount_fields' => ['sp', 'bpg']]))->assertOk();
        $this->assertSame(['BPG-VALUE', 'SP-VALUE'], $response->viewData('ppbj')->pluck('ppbj_no')->all());
        $this->assertSame(3, $this->get(route('ppbj.index', ['search' => '8,375 juta']))->assertOk()->viewData('ppbj')->total());
        $this->assertSame(3, $this->get(route('ppbj.index', ['search' => '8375000']))->assertOk()->viewData('ppbj')->total());
        $this->assertSame(1, $this->get(route('ppbj.index', ['search' => '0825']))->assertOk()->viewData('ppbj')->total());
        $this->assertSame(1, $this->get(route('ppbj.index', ['search' => 'nilai sp 8,375 juta']))->assertOk()->viewData('ppbj')->total());
        $csv = $this->get(route('ppbj.export', ['amount' => '8,375 juta', 'amount_fields' => ['sp']]))->assertOk()->streamedContent();
        $this->assertStringContainsString('SP-VALUE', $csv);
        $this->assertStringNotContainsString('BPG-VALUE', $csv);
    }

    public function test_money_ranges_thresholds_invalid_inputs_and_multiple_statuses(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'superadmin']));
        foreach ([7e6, 8e6, 9e6, 10e6, 8e9] as $index => $value) {
            Ppbj::create(['ppbj_no' => 'RANGE/'.$index, 'total_sebelum_ppn' => $value]);
        }
        foreach (['8–10 juta' => 3, 'minimal 8 juta' => 4, 'di atas 8 juta' => 3, 'maksimal 8 juta' => 2, 'sekitar 8 juta' => 1, '8 miliar' => 1] as $amount => $total) {
            $this->assertSame($total, $this->get(route('ppbj.index', ['amount' => $amount]))->assertOk()->viewData('ppbj')->total(), $amount);
        }
        $this->getJson(route('ppbj.index', ['amount' => '8 juta entahlah']))->assertUnprocessable()->assertJsonValidationErrors('amount');
        $this->getJson(route('ppbj.index', ['buyer' => array_fill(0, 51, 'Buyer')]))->assertUnprocessable();
        $this->get(route('ppbj.index', ['status_sla' => ['ON TRACK', 'OVERDUE'], 'general_registration' => ['registered', 'unregistered']]))->assertOk();
    }
}
