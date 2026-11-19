<?php

namespace Tests\Feature;

use App\Http\Controllers\SpController;
use App\Http\Controllers\SpphController;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class ProcurementListFilterReliabilityTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Http::preventStrayRequests();
        $this->actingAs(User::factory()->create(['name' => 'Penguji', 'department' => 'umum', 'role' => 'user']));
    }

    private function document(string $kind, int $number, array $attributes = []): Sp|Spph
    {
        $model = $kind === 'sp' ? Sp::class : Spph::class;

        $document = $model::create($attributes + ['sequence_number' => $number, $kind === 'sp' ? 'nomor_sp' : 'nomor_spph' => 'FILTER/'.$kind.'/'.$number,
            $kind === 'sp' ? 'tanggal_sp' : 'tanggal' => '2026-11-19', 'nama_vendor' => 'Vendor uji', 'pic' => 'Penguji', 'deskripsi_pengadaan' => 'Barang uji']);
        // SQLite does not enforce DATE storage as the production database does.
        $date = $kind === 'sp' ? 'tanggal_sp' : 'tanggal';
        DB::table($document->getTable())->where('id', $document->id)->update([$date => $document->$date->format('Y-m-d')]);

        return $document;
    }

    private function request(string $kind, array $input): Request
    {
        $request = Request::create('https://filters.test/'.$kind, 'GET', $input);
        $request->headers->set('Accept', 'application/json');
        $request->setUserResolver(fn () => auth()->user());
        $this->app->instance('request', $request);

        return $request;
    }

    public function test_malformed_list_and_export_filters_stop_before_any_sql(): void
    {
        foreach (['sp' => SpController::class, 'spph' => SpphController::class] as $kind => $class) {
            $cases = [['pic' => ['bad']], ['pic' => str_repeat('x', 256)], ['dari' => ['2026-11-01']], ['sampai' => ['bad']],
                ['dari' => '2026-02-30'], ['sampai' => 'not-a-date'], ['search' => ['bad']]];
            if ($kind === 'spph') {
                $cases = array_merge($cases, [['vendor' => ['bad']], ['vendor' => str_repeat('x', 256)]]);
            }
            foreach (['index', 'export'] as $action) {
                foreach ($cases as $input) {
                    $request = $this->request($kind, $input);
                    DB::enableQueryLog();
                    DB::flushQueryLog();
                    try {
                        app($class)->$action($request);
                        $this->fail('Malformed '.$kind.' '.$action.' filter accepted: '.array_key_first($input));
                    } catch (ValidationException) {
                        $this->assertCount(0, DB::getQueryLog());
                    } finally {
                        DB::disableQueryLog();
                    }
                }
            }
        }
    }

    public function test_reversed_date_ranges_fail_before_any_sql_in_both_actions(): void
    {
        foreach (['sp' => SpController::class, 'spph' => SpphController::class] as $kind => $class) {
            foreach (['index', 'export'] as $action) {
                $request = $this->request($kind, ['dari' => '2026-11-20', 'sampai' => '2026-11-19']);
                DB::enableQueryLog();
                DB::flushQueryLog();
                try {
                    app($class)->$action($request);
                    $this->fail('Reversed date range accepted');
                } catch (ValidationException $error) {
                    $this->assertArrayHasKey('sampai', $error->errors());
                    $this->assertCount(0, DB::getQueryLog());
                } finally {
                    DB::disableQueryLog();
                }
            }
        }
    }

    public function test_zero_pic_is_applied_in_list_export_summary_and_visible_filter_state(): void
    {
        User::factory()->create(['name' => '0', 'department' => 'umum', 'role' => 'user']);
        foreach (['sp' => 'sps', 'spph' => 'spphs'] as $kind => $viewKey) {
            $keep = $this->document($kind, 1, ['pic' => '0', 'nilai_sp' => 120]);
            $other = $this->document($kind, 2, ['nilai_sp' => 500]);
            if ($kind === 'sp') {
                $oldStatsKey = 'sp:index-stats:goods-v2:'.sha1(json_encode(['version' => Cache::get('sp:index-stats:version', '1'),
                    'mode' => 'auto', 'search' => '', 'pic' => '0', 'dari' => '', 'sampai' => ''], JSON_UNESCAPED_UNICODE));
                Cache::put($oldStatsKey, (object) ['total_count' => 9999, 'total_nilai_sp' => 9999, 'total_nilai_pr' => 9999, 'latest_id' => 9999], 90);
            }
            $response = $this->get(route($kind.'.index', ['pic' => '0']))->assertOk();
            $this->assertSame([$keep->id], $response->viewData($viewKey)->modelKeys());
            $response->assertSee('aria-label="Hapus filter PIC"', false)->assertSee('"hasFilter":true', false);
            if ($kind === 'sp') {
                $this->assertSame(1, $response->viewData('stats')->total_count);
                $this->assertEquals(120, $response->viewData('stats')->total_nilai_sp);
                $this->assertSame(9999, Cache::get($oldStatsKey)->total_count, 'Do not globally flush cached summaries.');
            }
            $content = $this->get(route($kind.'.export', ['pic' => '0']))->assertOk()->streamedContent();
            $this->assertStringContainsString($keep->getAttribute($kind === 'sp' ? 'nomor_sp' : 'nomor_spph'), $content);
            $this->assertStringNotContainsString($other->getAttribute($kind === 'sp' ? 'nomor_sp' : 'nomor_spph'), $content);
            $keep->update(['deskripsi_pengadaan' => 'Kode 0']);
            $this->get(route($kind.'.index', ['search' => '0']))->assertOk()->assertSee('aria-label="Hapus filter pencarian"', false);
        }
    }

    public function test_zero_vendor_filters_primary_and_secondary_names_and_has_a_removable_chip(): void
    {
        Vendor::create(['nama_vendor' => '0', 'is_active' => true]);
        $primary = $this->document('spph', 1, ['nama_vendor' => '0']);
        $secondary = $this->document('spph', 2, ['vendor_names' => ['0']]);
        $other = $this->document('spph', 3);
        $response = $this->get(route('spph.index', ['vendor' => '0']))->assertOk();
        $this->assertEqualsCanonicalizing([$primary->id, $secondary->id], $response->viewData('spphs')->modelKeys());
        $response->assertSee('aria-label="Hapus filter vendor"', false)->assertSee('"hasFilter":true', false);
        $content = $this->get(route('spph.export', ['vendor' => '0']))->assertOk()->streamedContent();
        $this->assertStringContainsString($primary->nomor_spph, $content);
        $this->assertStringContainsString($secondary->nomor_spph, $content);
        $this->assertStringNotContainsString($other->nomor_spph, $content);
    }

    public function test_inclusive_and_open_ended_dates_keep_valid_old_years_and_list_export_parity(): void
    {
        foreach (['sp' => 'sps', 'spph' => 'spphs'] as $kind => $viewKey) {
            $date = $kind === 'sp' ? 'tanggal_sp' : 'tanggal';
            $keep = $this->document($kind, 1, [$date => '2025-02-28']);
            $other = $this->document($kind, 2, [$date => '2026-11-19']);
            foreach ([['dari' => '2025-02-28', 'sampai' => '2025-02-28'], ['sampai' => '2025-02-28'], ['dari' => '2025-02-28', 'sampai' => null]] as $filter) {
                $expected = empty($filter['sampai']) ? [$other->id, $keep->id] : [$keep->id];
                $this->assertSame($expected, $this->get(route($kind.'.index', $filter))->assertOk()->viewData($viewKey)->modelKeys());
                $content = $this->get(route($kind.'.export', $filter))->assertOk()->streamedContent();
                $this->assertStringContainsString($keep->getAttribute($kind === 'sp' ? 'nomor_sp' : 'nomor_spph'), $content);
                if (! empty($filter['sampai'])) {
                    $this->assertStringNotContainsString($other->getAttribute($kind === 'sp' ? 'nomor_sp' : 'nomor_spph'), $content);
                }
            }
        }
    }

    public function test_filtering_preserves_oracle_mode_archived_scope_and_read_access(): void
    {
        $auto = $this->document('sp', 1, ['numbering_mode' => 'auto']);
        $oracle = $this->document('sp', 2, ['numbering_mode' => 'oracle']);
        $archived = $this->document('sp', 3, ['numbering_mode' => 'oracle']);
        $archived->delete();
        $filter = ['mode' => 'oracle', 'pic' => 'Penguji', 'dari' => '2026-11-19'];
        $this->assertSame([$oracle->id], $this->get(route('sp.index', $filter))->assertOk()->viewData('sps')->modelKeys());
        $csv = $this->get(route('sp.export', $filter))->assertOk()->streamedContent();
        $this->assertStringContainsString($oracle->nomor_sp, $csv);
        $this->assertStringNotContainsString($auto->nomor_sp, $csv);
        $this->assertStringNotContainsString($archived->nomor_sp, $csv);
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'viewer']));
        foreach (['sp', 'spph'] as $kind) {
            $this->get(route($kind.'.index'))->assertOk();
            $this->get(route($kind.'.export'))->assertOk();
        }
        $this->actingAs(User::factory()->create(['department' => 'operasional', 'role' => 'user']));
        foreach (['sp', 'spph'] as $kind) {
            $this->getJson(route($kind.'.index'))->assertForbidden();
            $this->getJson(route($kind.'.export'))->assertForbidden();
        }
    }
}
