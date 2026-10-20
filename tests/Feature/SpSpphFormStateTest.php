<?php

namespace Tests\Feature;

use Tests\TestCase;

class SpSpphFormStateTest extends TestCase
{
    public function test_sp_form_preserves_pr_selection_and_rejects_stale_autofill_responses(): void
    {
        $script = file_get_contents(public_path('assets/sp/sp.js'));

        $this->assertIsString($script);
        $this->assertStringContainsString('function setPrMode(mode, reset = false)', $script);
        $this->assertStringContainsString("$('#ppbjSelect').prop('disabled', true).trigger('change.select2')", $script);
        $this->assertStringContainsString('if (activeRequest && activeRequest.readyState !== 4) activeRequest.abort();', $script);
        $this->assertStringContainsString('JSON.stringify(latestValues) !== selectionKey', $script);
        $this->assertStringContainsString('function syncSpAllocationItemsAfterAutofill', $script);
        $this->assertStringContainsString('JSON.stringify(currentSelection) === selectionKey', $script);
        $this->assertStringContainsString("setPrMode('ppbj', true)", $script);
    }

    public function test_spph_form_preserves_pr_selection_and_rejects_stale_autofill_responses(): void
    {
        $script = file_get_contents(public_path('assets/spph/spph.js'));

        $this->assertIsString($script);
        $this->assertStringContainsString('function setEditPrMode(mode, reset = false)', $script);
        $this->assertStringContainsString("$('#editPpbjSelect').prop('disabled', true).trigger('change.select2')", $script);
        $this->assertStringContainsString('if (activeRequest && activeRequest.readyState !== 4) activeRequest.abort();', $script);
        $this->assertStringContainsString('requestId !== requestSerial', $script);
        $this->assertStringContainsString("setPrMode('ppbj', true)", $script);
    }

    public function test_sp_vendor_cancel_restores_the_previous_selection(): void
    {
        $script = file_get_contents(public_path('assets/sp/sp.js'));

        $this->assertIsString($script);
        $this->assertStringContainsString('$select.data(\'vendorBeforeAdd\')', $script);
        $this->assertStringContainsString('$select.val(previousVendor || null).trigger(\'change\')', $script);
    }

    public function test_successful_archive_returns_to_a_clean_list_instead_of_reloading_search_filters(): void
    {
        $spScript = file_get_contents(public_path('assets/sp/sp.js'));
        $spphScript = file_get_contents(public_path('assets/spph/spph.js'));

        $this->assertIsString($spScript);
        $this->assertIsString($spphScript);
        $this->assertStringContainsString("window.location.assign(destination || '/sp')", $spScript);
        $this->assertStringContainsString('window.location.assign(SPPH_INDEX_URL)', $spphScript);
        $this->assertStringNotContainsString('window.location.reload();', $spScript);
        $this->assertStringNotContainsString('window.location.reload();', $spphScript);
    }
}
