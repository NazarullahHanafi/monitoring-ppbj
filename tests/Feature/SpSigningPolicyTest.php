<?php

namespace Tests\Feature;

use App\Http\Controllers\SpPrintController;
use App\Models\ActivityLog;
use App\Models\MasterPortofolio;
use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\SpMasterOption;
use App\Models\SpPortfolioFieldMap;
use App\Models\Torpr;
use App\Models\User;
use App\Services\SpPrintPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;
use ZipArchive;

class SpSigningPolicyTest extends TestCase
{
    use RefreshDatabase;

    private function document($amount = 1000000, array $portfolios = ['PK - LAB']): Sp
    {
        $sp = Sp::create(['nomor_sp' => '901/PKU-XI/SP/2026', 'sequence_number' => 901,
            'tanggal_sp' => '2026-11-02', 'nilai_sp' => $amount, 'nilai_pr' => 999000000, 'nomor_pr' => 'PR/SP-POLICY/0',
            'nama_vendor' => 'Vendor uji', 'pic' => 'Penguji', 'deskripsi_pengadaan' => 'Kursi pengujian']);
        foreach ($portfolios as $i => $portfolio) {
            $pr = Ppbj::create(['ppbj_no' => 'PR/SP-POLICY/'.$i, 'tgl_ppbj' => '2026-11-02', 'portofolio' => $portfolio, 'total_sebelum_ppn' => 999000000]);
            $sp->ppbjs()->attach($pr->id, ['urutan' => $i + 1]);
        }

        return $sp;
    }

    private function umum(array $attributes = []): User
    {
        return User::factory()->create($attributes + ['department' => 'umum', 'role' => 'user']);
    }

    private function field(): SpMasterOption
    {
        return SpMasterOption::where('type', 'bidang_pr')->where('nama', 'PENGUJIAN DAN KONSULTANSI')->firstOrFail();
    }

    private function map(string $portfolio, ?int $id = null): SpPortfolioFieldMap
    {
        return SpPortfolioFieldMap::create(['portfolio' => $portfolio, 'portfolio_key' => SpPortfolioFieldMap::key($portfolio), 'field_id' => $id ?? $this->field()->id, 'is_active' => true]);
    }

    public static function boundaries(): array
    {
        return [['49999999.99', 'Harits Jansen'], ['50000000.00', 'Bambang Harwanta'], ['50000000.01', 'Bambang Harwanta']];
    }

    #[DataProvider('boundaries')]
    public function test_recommendation_follows_sp_value_not_combined_pr_or_vendor($amount, string $name): void
    {
        $sp = $this->document($amount, ['PK - LAB', 'PK - QAQC']);
        $context = app(SpPrintPolicy::class)->context($sp);
        $this->assertTrue($context['ready']);
        $this->assertSame($name, $context['name']);
        $this->assertSame(50000000, $context['threshold']);
        $this->assertEquals($amount, $context['amount']);
        $this->assertSame(2, $context['pr_count']);
    }

    public function test_owner_uses_only_confirmed_active_mapping_and_mixed_fields_need_confirmation(): void
    {
        $sp = $this->document(1000000, ['PK - LAB', 'PK - QAQC']);
        $policy = app(SpPrintPolicy::class);
        $this->assertNull($policy->context($sp)['owner_field_id']);
        $this->map('PK - LAB');
        $this->assertNull($policy->context($sp)['owner_field_id']);
        $map = $this->map('PK - QAQC');
        $this->assertSame($this->field()->id, $policy->context($sp)['owner_field_id']);
        $map->update(['field_id' => SpMasterOption::where('type', 'bidang_pr')->where('nama', 'DUKUNGAN BISNIS')->firstOrFail()->id]);
        $context = $policy->context($sp);
        $this->assertNull($context['owner_field_id']);
        $this->assertStringContainsString('bidang berbeda', implode(' ', $context['owner_diagnostics']));
        $map->update(['is_active' => false]);
        $this->assertNull($policy->context($sp)['owner_field_id']);
    }

    public function test_zero_sp_value_does_not_fall_back_to_pr_and_print_cannot_bypass_validation(): void
    {
        $sp = $this->document(0);
        $this->actingAs($this->umum());
        $this->getJson(route('sp.print-context', $sp))->assertOk()->assertJsonPath('amount_valid', false);
        foreach (['sp.cetak', 'sp.cetak.preview'] as $route) {
            $this->getJson(route($route, $sp))->assertUnprocessable();
        }
        $sp->update(['nilai_sp' => 1000000]);
        $this->getJson(route('sp.cetak', $sp))->assertUnprocessable(); // Owner must be selected.
        $this->getJson(route('sp.print-context', [$sp, 'signing_mode' => 'auto', 'field_id' => $this->field()->id]))->assertUnprocessable(); // Unmapped needs reason.
        $this->getJson(route('sp.print-context', [$sp, 'signing_mode' => 'auto', 'field_id' => $this->field()->id, 'field_reason' => 'Konfirmasi bidang oleh pemilik PR']))->assertOk();
    }

    public function test_active_owner_manual_pair_and_stale_data_are_validated_fresh(): void
    {
        $sp = $this->document();
        $this->map('PK - LAB');
        $this->actingAs($this->umum());
        $base = ['signing_mode' => 'manual', 'field_id' => $this->field()->id,
            'signer_id' => SpMasterOption::where('nama', 'Bambang Harwanta')->firstOrFail()->id,
            'title_id' => SpMasterOption::where('nama', 'Kepala Cabang')->firstOrFail()->id,
            'manual_reason' => 'Pejabat pengganti sesuai penugasan'];
        $url = route('sp.print-context', $sp);
        $this->getJson($url.'?'.http_build_query($base))->assertOk()->assertJsonPath('selection.penandatangan', 'Bambang Harwanta');
        foreach ([['manual_reason' => 'short'], ['field_id' => $base['signer_id']], ['print_basis' => 'old'], ['signer_id' => $base['title_id']]] as $bad) {
            $this->getJson($url.'?'.http_build_query(array_replace($base, $bad)))->assertUnprocessable();
        }
        $ctx = app(SpPrintPolicy::class)->context($sp);
        $sp->update(['nilai_sp' => 60000000]);
        $this->getJson($url.'?'.http_build_query($base + ['print_basis' => $ctx['fingerprint']]))->assertUnprocessable();
        $this->field()->update(['is_active' => false]);
        $this->getJson($url.'?'.http_build_query($base))->assertUnprocessable();
    }

    public function test_mapping_crud_is_versioned_audited_normalized_and_read_only_protected(): void
    {
        $user = $this->umum();
        $this->actingAs($user);
        $payload = ['portfolio' => ' pk - lab ', 'field_id' => $this->field()->id, 'is_active' => true];
        $created = $this->postJson(route('sp.portfolio-mappings.store'), $payload)->assertCreated()->json('row');
        $this->assertDatabaseHas('sp_portfolio_field_maps', ['portfolio_key' => 'PK - LAB', 'updated_by_user_id' => $user->id]);
        $this->assertDatabaseHas('activity_logs', ['model_type' => SpPortfolioFieldMap::class, 'model_id' => $created['id'], 'action' => 'created']);
        $this->postJson(route('sp.portfolio-mappings.store'), array_replace($payload, ['portfolio' => 'PK  - LAB']))->assertUnprocessable();
        $url = route('sp.portfolio-mappings.update', $created['id']);
        $this->putJson($url, $payload + ['version' => str_repeat('a', 64)])->assertConflict();
        $this->putJson($url, array_replace($payload, ['version' => $created['version'], 'is_active' => false]))->assertOk();
        $this->getJson(route('sp.portfolio-mappings', ['q' => 'lab']))->assertOk()->assertJsonCount(1, 'rows');
        $this->actingAs($this->umum(['role' => 'viewer']));
        $this->getJson(route('sp.portfolio-mappings'))->assertOk();
        $this->postJson(route('sp.portfolio-mappings.store'), $payload)->assertForbidden();
        $this->putJson($url, $payload)->assertForbidden();
        $this->actingAs(User::factory()->create(['department' => 'operasional', 'role' => 'user']));
        $this->getJson(route('sp.portfolio-mappings'))->assertForbidden();
        $this->getJson(route('sp.print-context', $this->document()))->assertForbidden();
    }

    public function test_portfolio_dropdown_merges_existing_sources_only_when_requested(): void
    {
        $this->actingAs($this->umum());
        MasterPortofolio::create(['nama' => 'Master portfolio']);
        Ppbj::create(['ppbj_no' => 'DROPDOWN-PR', 'portofolio' => 'Legacy PPBJ portfolio']);
        Ppbj::create(['ppbj_no' => 'DROPDOWN-PR-DUPLICATE', 'portofolio' => ' master   portfolio ']);
        Torpr::create(['nomor_pr' => 'DROPDOWN-TOR', 'portofolio' => 'TOR portfolio', 'tujuan_pengadaan' => 'Uji dropdown', 'created_by_user_id' => auth()->id()]);
        $this->map('Old mapping portfolio');
        $url = route('sp.portfolio-mappings');
        $this->getJson($url)->assertOk()->assertJsonMissingPath('portfolio_options');
        $response = $this->getJson($url.'?include_options=1')->assertOk()->assertJsonPath('options_truncated', false);
        $values = $response->json('portfolio_options');
        foreach (['Master portfolio', 'Legacy PPBJ portfolio', 'TOR portfolio', 'Old mapping portfolio'] as $value) {
            $this->assertContains($value, $values);
        }
        $this->assertCount(count($values), array_unique(array_map(fn ($value) => SpPortfolioFieldMap::key($value), $values)));
        MasterPortofolio::create(['nama' => 'New portfolio after opening']);
        $this->assertContains('New portfolio after opening', $this->getJson($url.'?include_options=1')->assertOk()->json('portfolio_options'));
        $this->actingAs(User::factory()->create(['department' => 'operasional']));
        $this->getJson($url.'?include_options=1')->assertForbidden();
    }

    public function test_portfolio_options_are_bounded_without_limiting_mapping_search(): void
    {
        $this->actingAs($this->umum());
        MasterPortofolio::insert(array_map(fn ($i) => ['nama' => 'Bounded '.str_pad((string) $i, 3, '0', STR_PAD_LEFT)], range(1, 270)));
        $this->map('Mapping outside dropdown budget');
        $response = $this->getJson(route('sp.portfolio-mappings', ['include_options' => 1, 'q' => 'outside']))->assertOk()
            ->assertJsonPath('options_truncated', true)->assertJsonCount(1, 'rows');
        $this->assertLessThanOrEqual(500, count($response->json('portfolio_options')));
        $this->getJson(route('sp.portfolio-mappings', ['include_options' => 'invalid']))->assertUnprocessable();
    }

    public function test_printed_word_uses_selected_owner_and_sci_and_logs_one_manual_action(): void
    {
        $sp = $this->document();
        $user = $this->umum();
        $this->actingAs($user);
        $request = Request::create('/sp-test', 'GET', ['field_id' => $this->field()->id, 'field_reason' => 'Bidang sesuai konfirmasi pemilik PR']);
        $request->setUserResolver(fn () => $user);
        $response = app(SpPrintController::class)->download($request, $sp);
        $path = $response->getFile()->getPathname();
        $zip = new ZipArchive;
        $this->assertTrue($zip->open($path));
        $xml = $zip->getFromName('word/document.xml');
        $zip->close();
        unlink($path);
        $this->assertStringContainsString('Harits Jansen', $xml);
        $this->assertStringContainsString('PENGUJIAN DAN KONSULTANSI', $xml);
        $this->assertSame(1, ActivityLog::where('action', 'manual_print_selection')->count());
    }

    public function test_context_queries_are_bounded_and_do_not_grow_per_pr(): void
    {
        $sp = $this->document(1000000, array_fill(0, 20, 'PK - LAB'));
        $this->map('PK - LAB');
        DB::enableQueryLog();
        $context = app(SpPrintPolicy::class)->context($sp);
        $count = count(DB::getQueryLog());
        DB::disableQueryLog();
        $this->assertSame(20, $context['pr_count']);
        $this->assertLessThanOrEqual(5, $count);
    }

    public function test_first_field_choice_is_remembered_on_post_and_next_print_is_automatic(): void
    {
        $sp = $this->document(1000000, ['PK - LAB', 'PK - LAB']);
        $user = $this->umum();
        $this->actingAs($user);
        $context = $this->getJson(route('sp.print-context', $sp))->assertOk()->assertJsonPath('owner_can_learn', true)->json();
        $payload = ['signing_mode' => 'auto', 'field_id' => $this->field()->id, 'learn_portfolio' => true, 'print_basis' => $context['fingerprint']];
        $confirmed = $this->postJson(route('sp.print-selection', $sp), $payload)->assertOk()->assertJsonPath('mapping_saved', true)
            ->assertJsonPath('owner_field_id', $this->field()->id)->assertJsonPath('owner_can_learn', false)->assertJsonPath('can_manage', true)->json();
        $this->assertNotSame($context['fingerprint'], $confirmed['fingerprint']);
        $this->assertSame($confirmed['fingerprint'], $confirmed['selection']['print_basis']);
        $this->assertArrayNotHasKey('learn_portfolio', $confirmed['selection']);
        $this->assertDatabaseHas('sp_portfolio_field_maps', ['portfolio_key' => 'PK - LAB', 'field_id' => $this->field()->id, 'updated_by_user_id' => $user->id, 'is_active' => true]);
        $this->assertSame(1, ActivityLog::where('model_type', SpPortfolioFieldMap::class)->count());
        $this->postJson(route('sp.print-selection', $sp), $confirmed['selection'])->assertOk()->assertJsonPath('mapping_saved', false);
        $this->assertSame(1, SpPortfolioFieldMap::count());
        $this->assertSame(1, ActivityLog::where('model_type', SpPortfolioFieldMap::class)->count());
        $this->getJson(route('sp.print-context', $sp))->assertOk()->assertJsonPath('owner_field_id', $this->field()->id);
    }

    public function test_learning_cannot_be_triggered_by_get_or_without_a_fresh_basis(): void
    {
        $sp = $this->document();
        $this->actingAs($this->umum());
        $payload = ['signing_mode' => 'auto', 'field_id' => $this->field()->id, 'learn_portfolio' => 1];
        $this->getJson(route('sp.print-context', [$sp, ...$payload]))->assertUnprocessable();
        $this->getJson(route('sp.cetak', [$sp, ...$payload]))->assertUnprocessable();
        $this->postJson(route('sp.print-selection', $sp), $payload)->assertUnprocessable()->assertJsonValidationErrors('print_basis');
        $context = app(SpPrintPolicy::class)->context($sp);
        $sp->update(['nilai_sp' => 60000000]);
        $this->postJson(route('sp.print-selection', $sp), $payload + ['print_basis' => $context['fingerprint']])->assertUnprocessable()->assertJsonValidationErrors('print_basis');
        $this->assertSame(0, SpPortfolioFieldMap::count());
    }

    public function test_existing_or_inactive_mapping_is_never_overwritten_by_learning(): void
    {
        $sp = $this->document();
        $this->actingAs($this->umum());
        $context = app(SpPrintPolicy::class)->context($sp);
        $map = $this->map('PK - LAB');
        $other = SpMasterOption::where('type', 'bidang_pr')->where('nama', 'DUKUNGAN BISNIS')->firstOrFail();
        $payload = ['signing_mode' => 'auto', 'field_id' => $other->id, 'learn_portfolio' => true, 'print_basis' => $context['fingerprint']];
        $this->postJson(route('sp.print-selection', $sp), $payload)->assertUnprocessable()->assertJsonValidationErrors('print_basis');
        $payload['print_basis'] = app(SpPrintPolicy::class)->context($sp->fresh())['fingerprint'];
        $this->postJson(route('sp.print-selection', $sp), $payload)->assertUnprocessable();
        $payload['learn_portfolio'] = false;
        $payload['field_reason'] = 'Bidang berbeda sesuai penugasan pemilik PR';
        $this->postJson(route('sp.print-selection', $sp), $payload)->assertOk()->assertJsonPath('mapping_saved', false)->assertJsonPath('selection.field_id', $other->id);
        $this->assertSame($this->field()->id, $map->fresh()->field_id);
        $map->update(['is_active' => false]);
        $context = app(SpPrintPolicy::class)->context($sp->fresh());
        $this->assertFalse($context['owner_can_learn']);
        $payload['print_basis'] = $context['fingerprint'];
        $payload['learn_portfolio'] = true;
        $this->postJson(route('sp.print-selection', $sp), $payload)->assertUnprocessable();
        $this->assertFalse($map->fresh()->is_active);
    }

    public function test_cross_portfolio_package_needs_manual_reason_and_does_not_create_mappings(): void
    {
        $sp = $this->document(1000000, ['PK - LAB', 'PK - QAQC']);
        $this->actingAs($this->umum());
        $context = app(SpPrintPolicy::class)->context($sp->fresh());
        $this->assertFalse($context['owner_can_learn']);
        $payload = ['signing_mode' => 'auto', 'field_id' => $this->field()->id, 'print_basis' => $context['fingerprint']];
        $this->postJson(route('sp.print-selection', $sp), $payload)->assertUnprocessable()->assertJsonValidationErrors('field_reason');
        $this->postJson(route('sp.print-selection', $sp), $payload + ['field_reason' => 'Bidang koordinator sesuai konfirmasi'])->assertOk()->assertJsonPath('mapping_saved', false);
        $this->assertSame(0, SpPortfolioFieldMap::count());
        $sp->ppbjs()->update(['portofolio' => null]);
        $this->assertFalse(app(SpPrintPolicy::class)->context($sp->fresh())['owner_can_learn']);
        $sp->ppbjs()->detach();
        $sp->update(['nomor_pr' => null]);
        $this->assertFalse(app(SpPrintPolicy::class)->context($sp->fresh())['owner_can_learn']);
    }

    public function test_learning_rejects_viewers_operasional_invalid_fields_and_zero_sp(): void
    {
        $sp = $this->document();
        $payload = ['signing_mode' => 'auto', 'field_id' => $this->field()->id, 'learn_portfolio' => 1, 'print_basis' => app(SpPrintPolicy::class)->context($sp->fresh())['fingerprint']];
        foreach ([$this->umum(['role' => 'viewer']), User::factory()->create(['department' => 'operasional'])] as $user) {
            $this->actingAs($user)->postJson(route('sp.print-selection', $sp), $payload)->assertForbidden();
        }
        $this->actingAs($this->umum());
        $this->postJson(route('sp.print-selection', $sp), array_replace($payload, ['field_id' => SpMasterOption::where('type', 'penandatangan_sci')->firstOrFail()->id]))->assertUnprocessable();
        $this->field()->update(['is_active' => false]);
        $this->postJson(route('sp.print-selection', $sp), $payload)->assertUnprocessable();
        $sp->update(['nilai_sp' => 0]);
        $payload['print_basis'] = app(SpPrintPolicy::class)->context($sp->fresh())['fingerprint'];
        $this->postJson(route('sp.print-selection', $sp), $payload)->assertUnprocessable();
        $this->assertSame(0, SpPortfolioFieldMap::count());
    }

    public function test_global_read_only_mode_blocks_mapping_confirmation(): void
    {
        $sp = $this->document();
        $this->actingAs($this->umum());
        Cache::put('simonpr:read_only_mode', true);
        try {
            $this->postJson(route('sp.print-selection', $sp), [
                'signing_mode' => 'auto', 'field_id' => $this->field()->id, 'learn_portfolio' => true,
                'print_basis' => app(SpPrintPolicy::class)->context($sp->fresh())['fingerprint'],
            ])->assertForbidden();
            $this->assertSame(0, SpPortfolioFieldMap::count());
        } finally {
            Cache::forget('simonpr:read_only_mode');
        }
    }
}
