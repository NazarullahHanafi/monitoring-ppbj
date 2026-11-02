<?php

namespace Tests\Feature;

use App\Http\Controllers\SpPrintController;
use App\Models\ActivityLog;
use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\SpMasterOption;
use App\Models\SpPortfolioFieldMap;
use App\Models\User;
use App\Services\SpPrintPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
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
}
