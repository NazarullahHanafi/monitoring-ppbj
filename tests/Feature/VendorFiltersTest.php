<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Vendor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VendorFiltersTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']));
    }

    public function test_vendor_page_uses_manual_filters_with_reset_available_before_and_after_search(): void
    {
        foreach (['', 'Vendor Audit'] as $search) {
            $response = $this->get(route('vendor.index', ['search' => $search]))->assertOk();
            $response->assertSee('id="procurementFilters"', false)
                ->assertSee('id="applyProcurementFilters"', false)
                ->assertSee('onclick="resetFilters()"', false)
                ->assertSee('Pencarian tidak otomatis.')
                ->assertSee('maxlength="160"', false);
            $html = $response->getContent();
            $this->assertLessThan(strpos($html, 'assets/vendor/vendor.js'), strpos($html, 'assets/app/procurement-filters.js'));
            $this->assertMatchesRegularExpression('/vendor\.js\?v=\d+/', $html);
            if ($search !== '') {
                $response->assertSee('aria-label="Hapus filter pencarian"', false);
            }
        }
    }

    public function test_all_existing_vendor_search_fields_still_filter_and_whitespace_is_trimmed(): void
    {
        $match = Vendor::create([
            'nama_vendor' => 'Vendor Target', 'alamat' => 'Jalan Audit', 'telepon' => 'TeleponAudit',
            'fax' => 'FaxAudit', 'email' => 'audit@example.test', 'npwp' => 'NpwpAudit',
            'direktur' => 'PenandatanganAudit', 'jabatan' => 'JabatanAudit', 'is_active' => true,
        ]);
        Vendor::create(['nama_vendor' => 'Lainnya', 'is_active' => false]);
        foreach (['Target', 'Jalan Audit', 'TeleponAudit', 'FaxAudit', 'audit@example.test', 'NpwpAudit', 'PenandatanganAudit', 'JabatanAudit'] as $search) {
            $response = $this->get(route('vendor.index', ['search' => '  '.$search.'  ']))->assertOk();
            $this->assertSame([$match->id], $response->viewData('vendors')->modelKeys());
            $this->assertSame($search, $response->viewData('search'));
        }
        $this->assertSame(2, $this->get(route('vendor.index'))->assertOk()->viewData('vendors')->total());
    }

    public function test_zero_is_a_real_search_and_invalid_input_is_rejected(): void
    {
        $match = Vendor::create(['nama_vendor' => 'Vendor 0', 'is_active' => true]);
        Vendor::create(['nama_vendor' => 'Vendor Lain', 'is_active' => true]);
        $this->assertSame([$match->id], $this->get(route('vendor.index', ['search' => '0']))->assertOk()->viewData('vendors')->modelKeys());
        foreach ([['bad'], str_repeat('a', 161)] as $input) {
            $this->getJson(route('vendor.index', ['search' => $input]))->assertUnprocessable()->assertJsonValidationErrors('search');
        }
    }

    public function test_pagination_preserves_applied_search_and_reset_returns_the_complete_list(): void
    {
        foreach (range(1, 12) as $number) {
            Vendor::create(['nama_vendor' => sprintf('Vendor Audit %02d', $number), 'is_active' => true]);
        }
        Vendor::create(['nama_vendor' => 'Vendor Lain', 'is_active' => false]);
        $page = $this->get(route('vendor.index', ['search' => 'Audit', 'page' => 2]))->assertOk()->viewData('vendors');
        $this->assertCount(2, $page->items());
        $this->assertSame(12, $page->total());
        $this->assertStringContainsString('search=Audit', $page->url(1));
        $reset = $this->get(route('vendor.index'))->assertOk()->viewData('vendors');
        $this->assertSame(1, $reset->currentPage());
        $this->assertSame(13, $reset->total());
    }
}
