<?php

namespace Tests\Feature;

use App\Http\Controllers\SpphController;
use App\Models\ActivityLog;
use App\Models\Ppbj;
use App\Models\SpMasterOption;
use App\Models\Spph;
use App\Models\User;
use App\Services\SpphPrintPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;
use ZipArchive;

class SpphManualSigningTest extends TestCase
{
    use RefreshDatabase;

    private function umum(array $data = []): User
    {
        return User::factory()->create($data + ['department' => 'umum', 'role' => 'user']);
    }

    private function document(array $amounts = [1000000]): Spph
    {
        $spph = Spph::create(['nomor_spph' => 'MANUAL/SPPH/1', 'sequence_number' => 990, 'tanggal' => '2026-11-02',
            'nama_vendor' => 'Vendor uji', 'vendor_names' => ['Vendor uji', 'Vendor kedua'], 'pic' => 'Penguji', 'deskripsi_pengadaan' => 'Kursi kerja']);
        foreach ($amounts as $index => $amount) {
            $pr = Ppbj::create(['ppbj_no' => 'MANUAL/PR/'.($index + 1), 'tgl_ppbj' => '2026-11-02', 'total_sebelum_ppn' => 1]);
            DB::table('ppbj')->where('id', $pr->id)->update(['total_sebelum_ppn' => $amount]);
            $spph->ppbjs()->attach($pr->id, ['urutan' => $index + 1]);
        }

        return $spph;
    }

    private function choice(): array
    {
        return ['signing_mode' => 'manual',
            'signer_id' => SpMasterOption::where('nama', 'Bambang Harwanta')->firstOrFail()->id,
            'title_id' => SpMasterOption::where('nama', 'Kepala Cabang')->firstOrFail()->id,
            'manual_reason' => 'Penandatangan sesuai penugasan pengganti'];
    }

    public static function incompleteValues(): array
    {
        return ['unlinked PR' => [[]], 'zero PR' => [[0]], 'negative PR' => [[-1]],
            'partially valued group' => [[60000000, 0]]];
    }

    #[DataProvider('incompleteValues')]
    public function test_incomplete_pr_values_allow_validated_manual_selection_without_enabling_automatic_signing(array $amounts): void
    {
        $this->actingAs($this->umum());
        $spph = $this->document($amounts);
        if ($amounts === []) {
            $spph->update(['nomor_pr' => 'PR-NOT-IN-MANAGEMENT']);
        }
        $url = route('spph.print-context', $spph);
        $context = $this->getJson($url)->assertOk()->assertJsonPath('amount_valid', false)->assertJsonPath('ready', false)->json();
        $this->assertStringNotContainsString('Rp 0', $context['basis_summary']);
        $this->assertStringContainsString('manual', $context['basis_summary']);
        $this->getJson($url.'?signing_mode=auto')->assertUnprocessable();
        $choice = $this->choice() + ['print_basis' => $context['fingerprint']];
        $this->getJson($url.'?'.http_build_query($choice))->assertOk()
            ->assertJsonPath('selection.signing_mode', 'manual')->assertJsonPath('selection.penandatangan', 'Bambang Harwanta');
        foreach (['manual_reason' => 'short', 'signer_id' => $choice['title_id'], 'title_id' => $choice['signer_id'], 'print_basis' => str_repeat('a', 64)] as $key => $value) {
            $this->getJson($url.'?'.http_build_query(array_replace($choice, [$key => $value])))->assertUnprocessable();
        }
        $this->assertDatabaseCount('activity_logs', 0);
        SpMasterOption::whereKey($choice['signer_id'])->update(['is_active' => false]);
        $this->getJson($url.'?'.http_build_query($choice))->assertUnprocessable();
    }

    public function test_unlinked_spph_prints_single_vendor_and_all_vendor_files_through_both_preview_and_direct_routes(): void
    {
        $this->actingAs($this->umum());
        $spph = $this->document([]);
        $context = app(SpphPrintPolicy::class)->context($spph);
        $choice = $this->choice() + ['print_basis' => $context['fingerprint']];
        foreach (['spph.cetak', 'spph.cetak.preview', 'spph.cetak-semua-vendor', 'spph.cetak-semua-vendor.preview'] as $route) {
            $response = $this->get(route($route, ['spph' => $spph, ...$choice]))->assertOk();
            if (str_ends_with($route, '.preview')) {
                $response->assertViewHas('meta', fn ($meta) => $meta['Dasar penandatangan'] === $context['basis_summary']);
                $response = $this->get($response->viewData('downloadUrl'))->assertOk();
            }
            $path = $response->baseResponse->getFile()->getPathname();
            $archive = new ZipArchive;
            $this->assertTrue($archive->open($path));
            if ($archive->locateName('word/document.xml') !== false) {
                $this->assertStringContainsString('Bambang Harwanta', $archive->getFromName('word/document.xml'));
            } else {
                $this->assertSame(2, $archive->numFiles);
                for ($index = 0; $index < $archive->numFiles; $index++) {
                    $file = tempnam(sys_get_temp_dir(), 'manual-unlinked-');
                    file_put_contents($file, $archive->getFromIndex($index));
                    $word = new ZipArchive;
                    $this->assertTrue($word->open($file));
                    $this->assertStringContainsString('Bambang Harwanta', $word->getFromName('word/document.xml'));
                    $word->close();
                    unlink($file);
                }
            }
            $archive->close();
            unlink($path);
        }
        $this->assertDatabaseMissing('activity_logs', ['action' => 'manual_print_signer', 'changes->amount_valid' => true]);
        $this->assertFalse(ActivityLog::where('action', 'manual_print_signer')->firstOrFail()->changes['amount_valid']);
        $this->assertNull(ActivityLog::where('action', 'manual_print_signer')->firstOrFail()->changes['amount']);
        $this->assertDatabaseCount('ppbj', 0);
    }

    public function test_manual_active_selection_is_allowed_but_auto_recommendation_is_unchanged(): void
    {
        $this->actingAs($this->umum());
        $spph = $this->document();
        $url = route('spph.print-context', $spph);
        $this->getJson($url)->assertOk()->assertJsonPath('name', 'Harits Jansen')->assertJsonPath('can_manage', true);
        $this->getJson($url.'?'.http_build_query($this->choice()))->assertOk()->assertJsonPath('name', 'Harits Jansen')
            ->assertJsonPath('selection.penandatangan', 'Bambang Harwanta')->assertJsonPath('selection.signing_mode', 'manual');
        $this->assertDatabaseCount('activity_logs', 0); // Opening/validating is not a print action.
    }

    public function test_manual_requires_reason_correct_master_types_active_status_and_current_basis(): void
    {
        $this->actingAs($this->umum());
        $spph = $this->document();
        $url = route('spph.print-context', $spph);
        $choice = $this->choice();
        foreach ([['manual_reason' => 'short'], ['manual_reason' => str_repeat(' ', 20)], ['signer_id' => $choice['title_id']],
            ['title_id' => $choice['signer_id']], ['signer_id' => 999999], ['print_basis' => 'stale'], ['penandatangan' => 'Forged text']] as $invalid) {
            $this->getJson($url.'?'.http_build_query(array_replace($choice, $invalid)))->assertUnprocessable();
        }
        SpMasterOption::whereKey($choice['signer_id'])->update(['is_active' => false]);
        $this->getJson($url.'?'.http_build_query($choice))->assertUnprocessable();
        $this->getJson($url.'?signing_mode=arbitrary')->assertUnprocessable();
    }

    public function test_manual_zip_preserves_selected_pair_and_writes_one_audit_for_the_print_operation(): void
    {
        $user = $this->umum();
        $this->actingAs($user);
        $spph = $this->document();
        $request = Request::create('/print-test', 'GET', $this->choice());
        $request->setUserResolver(fn () => $user);
        $response = app(SpphController::class)->cetakSemuaVendor($request, $spph);
        $path = $response->getFile()->getPathname();
        $zip = new ZipArchive;
        $this->assertTrue($zip->open($path));
        $this->assertSame(2, $zip->numFiles);
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $file = tempnam(sys_get_temp_dir(), 'manual-spph-');
            file_put_contents($file, $zip->getFromIndex($i));
            $word = new ZipArchive;
            $this->assertTrue($word->open($file));
            $xml = $word->getFromName('word/document.xml');
            $word->close();
            unlink($file);
            $this->assertStringContainsString('Bambang Harwanta', $xml);
            $this->assertStringNotContainsString('Harits Jansen', $xml);
        }
        $zip->close();
        unlink($path);
        $this->assertSame(1, ActivityLog::where('action', 'manual_print_signer')->count());
        $log = ActivityLog::where('action', 'manual_print_signer')->first();
        $this->assertSame($user->id, $log->user_id);
        $this->assertSame('Bambang Harwanta', $log->changes['name']);
    }

    public function test_json_master_crud_preserves_data_uses_versions_and_has_audit(): void
    {
        $this->actingAs($this->umum());
        $create = $this->postJson(route('sp-master-options.store'), ['type' => 'penandatangan_sci', 'nama' => '  Pejabat Pengganti  ', 'is_active' => true])
            ->assertCreated()->assertJsonPath('option.nama', 'Pejabat Pengganti')->json('option');
        $this->postJson(route('sp-master-options.store'), ['type' => 'penandatangan_sci', 'nama' => ' Pejabat Pengganti ', 'is_active' => true])->assertUnprocessable();
        $url = route('sp-master-options.update', $create['id']);
        $update = $this->putJson($url, ['type' => 'penandatangan_sci', 'nama' => 'Pejabat Baru', 'is_active' => true, 'version' => $create['version']])
            ->assertOk()->assertJsonPath('option.nama', 'Pejabat Baru')->json('option');
        $this->putJson($url, ['type' => 'penandatangan_sci', 'nama' => 'Timpaan lama', 'is_active' => true, 'version' => $create['version']])->assertStatus(409);
        $this->putJson($url, ['type' => 'penandatangan_sci', 'nama' => 'Pejabat Baru', 'is_active' => false, 'version' => $update['version']])->assertOk()->assertJsonPath('option.is_active', false);
        $this->assertDatabaseHas('sp_master_options', ['id' => $create['id'], 'nama' => 'Pejabat Baru', 'is_active' => false]);
        $this->getJson(route('spph.print-masters', ['type' => 'penandatangan_sci', 'active_only' => 1]))->assertOk()->assertJsonMissing(['id' => $create['id']]);
        $this->assertSame(3, ActivityLog::where('model_type', SpMasterOption::class)->where('model_id', $create['id'])->count());
    }

    public function test_master_lists_are_bounded_searched_explicitly_and_writes_remain_blocked_for_viewers_and_other_departments(): void
    {
        $this->getJson(route('spph.print-masters', ['type' => 'penandatangan_sci']))->assertUnauthorized();
        $ops = $this->umum(['department' => 'operasional']);
        $this->actingAs($ops)->getJson(route('spph.print-masters', ['type' => 'penandatangan_sci']))->assertForbidden();
        $viewer = $this->umum(['role' => 'viewer']);
        $this->actingAs($viewer);
        $this->getJson(route('spph.print-masters', ['type' => 'penandatangan_sci']))->assertOk();
        $this->postJson(route('sp-master-options.store'), ['type' => 'penandatangan_sci', 'nama' => 'Should not save'])->assertForbidden();
        $this->getJson(route('spph.print-masters', ['type' => 'bidang_pr']))->assertOk();
        $this->getJson(route('spph.print-masters', ['type' => 'unknown']))->assertUnprocessable();
        $this->getJson(route('spph.print-masters', ['type' => 'penandatangan_sci', 'per_page' => 1000]))->assertUnprocessable();
        $this->getJson(route('spph.print-masters', ['type' => 'penandatangan_sci', 'q' => 'Harits']))->assertJsonCount(1, 'options');
        $this->assertDatabaseMissing('sp_master_options', ['nama' => 'Should not save']);
    }
}
