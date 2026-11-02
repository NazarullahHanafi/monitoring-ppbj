<?php

namespace Tests\Feature;

use App\Http\Controllers\SpphController;
use App\Models\ActivityLog;
use App\Models\Ppbj;
use App\Models\SpMasterOption;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;
use ZipArchive;

class SpphManualSigningTest extends TestCase
{
    use RefreshDatabase;

    private function umum(array $data = []): User
    {
        return User::factory()->create($data + ['department' => 'umum', 'role' => 'user']);
    }

    private function document(): Spph
    {
        $spph = Spph::create(['nomor_spph' => 'MANUAL/SPPH/1', 'sequence_number' => 990, 'tanggal' => '2026-11-02',
            'nama_vendor' => 'Vendor uji', 'vendor_names' => ['Vendor uji', 'Vendor kedua'], 'pic' => 'Penguji', 'deskripsi_pengadaan' => 'Kursi kerja']);
        $pr = Ppbj::create(['ppbj_no' => 'MANUAL/PR/1', 'tgl_ppbj' => '2026-11-02', 'total_sebelum_ppn' => 1000000]);
        $spph->ppbjs()->attach($pr->id, ['urutan' => 1]);

        return $spph;
    }

    private function choice(): array
    {
        return ['signing_mode' => 'manual',
            'signer_id' => SpMasterOption::where('nama', 'Bambang Harwanta')->firstOrFail()->id,
            'title_id' => SpMasterOption::where('nama', 'Kepala Cabang')->firstOrFail()->id,
            'manual_reason' => 'Penandatangan sesuai penugasan pengganti'];
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
        $this->getJson(route('spph.print-masters', ['type' => 'bidang_pr']))->assertUnprocessable();
        $this->getJson(route('spph.print-masters', ['type' => 'penandatangan_sci', 'per_page' => 1000]))->assertUnprocessable();
        $this->getJson(route('spph.print-masters', ['type' => 'penandatangan_sci', 'q' => 'Harits']))->assertJsonCount(1, 'options');
        $this->assertDatabaseMissing('sp_master_options', ['nama' => 'Should not save']);
    }
}
