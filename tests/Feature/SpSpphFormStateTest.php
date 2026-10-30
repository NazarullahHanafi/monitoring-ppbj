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

    public function test_secure_delete_prevents_password_manager_from_triggering_search(): void
    {
        foreach (['sp/sp.js', 'spph/spph.js'] as $asset) {
            $script = file_get_contents(public_path('assets/'.$asset));

            $this->assertIsString($script);
            $this->assertStringContainsString('secureDeleteSearchSnapshot', $script);
            $this->assertStringContainsString('autocomplete="new-password"', $script);
            $this->assertStringContainsString('lockedSearch: () => secureDeleteSearchSnapshot', $script);
            $filters = file_get_contents(public_path('assets/app/procurement-filters.js'));
            $this->assertStringContainsString('if (options.lockedSearch() !== null) return;', $filters);
        }
    }

    public function test_permanent_delete_dialog_ignores_password_manager_autofill(): void
    {
        $template = file_get_contents(resource_path('views/procurement-document-trash.blade.php'));

        $this->assertIsString($template);
        $this->assertStringContainsString('name="permanent_delete_document_number" autocomplete="off"', $template);
        $this->assertStringContainsString('name="permanent_delete_owner_password" type="password" autocomplete="new-password"', $template);
        $this->assertStringNotContainsString('placeholder="${number}"', $template);
    }

    public function test_document_lifecycle_mutations_are_rate_limited(): void
    {
        foreach (['sp.destroy', 'spph.destroy'] as $routeName) {
            $middleware = app('router')->getRoutes()->getByName($routeName)?->gatherMiddleware() ?? [];
            $this->assertContains('throttle:10,1', $middleware, $routeName);
        }

        foreach (['sp.restore', 'spph.restore'] as $routeName) {
            $middleware = app('router')->getRoutes()->getByName($routeName)?->gatherMiddleware() ?? [];
            $this->assertContains('throttle:20,1', $middleware, $routeName);
        }

        foreach (['sp.force-destroy', 'spph.force-destroy'] as $routeName) {
            $middleware = app('router')->getRoutes()->getByName($routeName)?->gatherMiddleware() ?? [];
            $this->assertContains('throttle:5,1', $middleware, $routeName);
        }
    }
}
