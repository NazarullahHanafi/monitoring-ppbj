<?php

namespace Tests\Feature;

use App\Http\Controllers\SpphController;
use App\Http\Controllers\SpPrintController;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use App\Services\SpPrintSelection;
use App\Support\PrintSelectionInput;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class PrintSelectionInputTest extends TestCase
{
    use RefreshDatabase;

    private User $actor;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actor = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($this->actor);
    }

    private function request(array $input, string $method = 'GET'): Request
    {
        $request = Request::create('/synthetic-print-check', $method, $input);
        $request->setUserResolver(fn () => $this->actor);
        $request->headers->set('Accept', 'application/json');
        $this->app->instance('request', $request);

        return $request;
    }

    private function rejectedWithoutSql(callable $callback): void
    {
        DB::enableQueryLog();
        DB::flushQueryLog();
        try {
            $callback();
            $this->fail('Malformed selection accepted');
        } catch (ValidationException) {
            $this->assertCount(0, DB::getQueryLog());
        }
    }

    public function test_malformed_sp_and_spph_context_parameters_fail_before_policy_reads(): void
    {
        $sp = new Sp;
        $sp->id = 2147483647;
        $spph = new Spph;
        $spph->id = 2147483647;
        foreach ([['signing_mode' => ['auto']], ['signing_mode' => 'invalid'], ['signer_id' => ['1']], ['title_id' => -1], ['print_basis' => ['bad']], ['print_basis' => str_repeat('x', 65)], ['manual_reason' => str_repeat('x', 501)], ['penandatangan' => ['bad']], ['jabatan' => str_repeat('x', 256)]] as $input) {
            $this->rejectedWithoutSql(fn () => app(SpPrintController::class)->context($this->request($input), $sp));
            $this->rejectedWithoutSql(fn () => app(SpphController::class)->printContext($this->request($input), $spph));
        }
    }

    public function test_sp_owner_parameter_shapes_are_checked_before_policy_reads(): void
    {
        $sp = new Sp;
        $sp->id = 2147483647;
        foreach ([['field_id' => ['1']], ['field_id' => 0], ['field_reason' => ['bad']], ['field_reason' => str_repeat('x', 501)], ['learn_portfolio' => ['1']], ['learn_portfolio' => 'yes']] as $input) {
            $this->rejectedWithoutSql(fn () => app(SpPrintController::class)->context($this->request($input), $sp));
        }
    }

    public function test_malformed_post_selection_fails_before_row_lock_and_mapping_work(): void
    {
        $sp = new Sp;
        $sp->id = 2147483647;
        foreach ([[], ['print_basis' => 'short'], ['print_basis' => str_repeat('a', 64), 'field_id' => ['1']], ['print_basis' => str_repeat('a', 64), 'signing_mode' => 'manual', 'signer_id' => 1]] as $input) {
            $this->rejectedWithoutSql(fn () => app(SpPrintSelection::class)->confirm($this->request($input, 'POST'), $sp));
        }
        $this->assertDatabaseCount('sp_portfolio_field_maps', 0);
        $this->assertDatabaseCount('activity_logs', 0);
    }

    public function test_malformed_sp_download_and_preview_stop_before_generation(): void
    {
        $sp = new Sp;
        $sp->id = 2147483647;
        foreach (['download', 'preview'] as $action) {
            $this->rejectedWithoutSql(fn () => app(SpPrintController::class)->$action($this->request(['jabatan' => ['bad']]), $sp));
        }
    }

    public function test_malformed_spph_generation_stops_before_policy_reads(): void
    {
        $spph = new Spph(['nama_vendor' => 'Synthetic vendor', 'vendor_names' => ['Synthetic vendor']]);
        $spph->id = 2147483647;
        foreach (['previewCetak', 'previewCetakSemuaVendor', 'cetakSpph', 'cetakSemuaVendor'] as $action) {
            $this->rejectedWithoutSql(fn () => app(SpphController::class)->$action($this->request(['signing_mode' => ['manual']]), $spph));
        }
    }

    public function test_legacy_automatic_links_and_optional_fingerprint_remain_structurally_valid(): void
    {
        foreach ([[], ['penandatangan' => 'bambang'], ['signing_mode' => 'auto', 'field_id' => '7', 'field_reason' => 'Koordinator sesuai konfirmasi'], ['signing_mode' => 'auto', 'print_basis' => str_repeat('a', 64), 'learn_portfolio' => '1']] as $input) {
            PrintSelectionInput::validate($input, true);
            $this->addToAssertionCount(1);
        }
    }

    public function test_manual_ids_reasons_and_optional_signer_names_preserve_original_values(): void
    {
        $input = ['signing_mode' => 'manual', 'signer_id' => '1', 'title_id' => 2, 'manual_reason' => '  Pejabat sesuai penugasan  ', 'penandatangan' => 'Pejabat <nama>', 'jabatan' => 'Kepala Cabang', 'print_basis' => str_repeat('a', 64), 'field_id' => 7];
        $original = $input;
        PrintSelectionInput::validate($input, true, true);
        $this->assertSame($original, $input);
        $this->rejectedWithoutSql(fn () => PrintSelectionInput::validate(['signing_mode' => 'manual']));
    }
}
