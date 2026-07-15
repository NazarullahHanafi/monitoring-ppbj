<?php

namespace Tests\Feature;

use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DocumentNumberSuggestionTest extends TestCase
{
    use RefreshDatabase;

    public function test_spph_suggestion_uses_selected_document_month(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        Spph::create([
            'nomor_spph' => '010/PKU-I/SPPH/2026',
            'sequence_number' => 10,
            'tanggal' => '2026-01-10',
            'nama_vendor' => 'Vendor Test',
            'deskripsi_pengadaan' => 'Pengadaan test',
            'pic' => $user->name,
        ]);

        $this->actingAs($user)
            ->getJson(route('spph.suggest-nomor', ['tanggal' => '2026-06-15']))
            ->assertOk()
            ->assertJsonPath('suggestions.0', '011/PKU-VI/SPPH/2026');

        $this->actingAs($user)
            ->getJson(route('spph.suggest-nomor', ['tanggal' => '2026-07-01']))
            ->assertOk()
            ->assertJsonPath('suggestions.0', '011/PKU-VII/SPPH/2026');
    }

    public function test_sp_suggestion_uses_selected_document_month(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        Sp::create([
            'nomor_sp' => '020/PKU-I/SP/2026',
            'sequence_number' => 20,
            'tanggal_sp' => '2026-01-10',
            'nama_vendor' => 'Vendor Test',
            'deskripsi_pengadaan' => 'Pengadaan test',
            'pic' => $user->name,
        ]);

        $this->actingAs($user)
            ->getJson(route('sp.suggest-nomor', ['tanggal' => '2026-06-15']))
            ->assertOk()
            ->assertJsonPath('suggestions.0', '021/PKU-VI/SP/2026');

        $this->actingAs($user)
            ->getJson(route('sp.suggest-nomor', ['tanggal' => '2026-07-01']))
            ->assertOk()
            ->assertJsonPath('suggestions.0', '021/PKU-VII/SP/2026');
    }

    public function test_preview_helpers_can_use_selected_document_month(): void
    {
        $this->assertStringContainsString('/PKU-VI/SPPH/2026', Spph::previewNextNomor('2026-06-15'));
        $this->assertStringContainsString('/PKU-VII/SP/2026', Sp::previewNextNomor('2026-07-01'));
    }

    public function test_realtime_check_returns_normalized_number_for_selected_month(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        $this->actingAs($user)
            ->getJson(route('spph.check-nomor', [
                'nomor' => '011/PKU-VI/SPPH/2026',
                'tanggal' => '2026-07-10',
            ]))
            ->assertOk()
            ->assertJsonPath('normalized_nomor', '011/PKU-VII/SPPH/2026')
            ->assertJsonPath('warning', 'Nomor otomatis disesuaikan dengan tanggal dokumen menjadi 011/PKU-VII/SPPH/2026.');

        $this->actingAs($user)
            ->getJson(route('sp.check-nomor', [
                'nomor' => '021/PKU-VI/SP/2026',
                'tanggal' => '2026-07-10',
            ]))
            ->assertOk()
            ->assertJsonPath('normalized_nomor', '021/PKU-VII/SP/2026')
            ->assertJsonPath('warning', 'Nomor otomatis disesuaikan dengan tanggal dokumen menjadi 021/PKU-VII/SP/2026.');
    }

    public function test_store_normalizes_number_before_saving(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
            'name' => 'Nazar',
        ]);

        $this->actingAs($user)
            ->post(route('spph.store'), [
                'nomor_spph' => '011/PKU-VI/SPPH/2026',
                'tanggal' => '2026-07-10',
                'nama_vendor' => 'Vendor Test',
                'deskripsi_pengadaan' => 'Pengadaan test',
                'pic' => 'Nazar',
            ])
            ->assertRedirect(route('spph.index'));

        $this->assertDatabaseHas('spphs', [
            'nomor_spph' => '011/PKU-VII/SPPH/2026',
        ]);

        $this->actingAs($user)
            ->post(route('sp.store'), [
                'nomor_sp' => '021/PKU-VI/SP/2026',
                'tanggal_sp' => '2026-07-10',
                'nama_vendor' => 'Vendor Test',
                'deskripsi_pengadaan' => 'Pengadaan test',
                'pic' => 'Nazar',
            ])
            ->assertRedirect(route('sp.index'));

        $this->assertDatabaseHas('sps', [
            'nomor_sp' => '021/PKU-VII/SP/2026',
        ]);
    }

    public function test_oracle_sp_mode_keeps_manual_number_before_saving(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
            'name' => 'Nazar',
        ]);

        $this->actingAs($user)
            ->post(route('sp.store'), [
                'oracle_mode' => '1',
                'nomor_sp' => 'ORACLE/SP/ERP/2026/00077',
                'tanggal_sp' => '2026-07-10',
                'nilai_sp' => '60000000',
                'nama_vendor' => 'Vendor Oracle',
                'deskripsi_pengadaan' => 'Pengadaan di atas 50 juta',
                'pic' => 'Nazar',
            ])
            ->assertRedirect(route('sp.index', ['mode' => 'oracle']));

        $this->assertDatabaseHas('sps', [
            'nomor_sp' => 'ORACLE/SP/ERP/2026/00077',
            'nama_vendor' => 'Vendor Oracle',
            'numbering_mode' => 'oracle',
        ]);
    }

    public function test_oracle_sp_mode_rejects_value_under_or_equal_50_million(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
            'name' => 'Nazar',
        ]);

        $this->actingAs($user)
            ->from(route('sp.index', ['mode' => 'oracle']))
            ->post(route('sp.store'), [
                'oracle_mode' => '1',
                'nomor_sp' => 'ORACLE/SP/ERP/2026/00040',
                'tanggal_sp' => '2026-07-10',
                'nilai_sp' => '40000000',
                'nama_vendor' => 'Vendor Oracle',
                'deskripsi_pengadaan' => 'Pengadaan kurang dari batas Oracle',
                'pic' => 'Nazar',
            ])
            ->assertRedirect(route('sp.index', ['mode' => 'oracle']))
            ->assertSessionHasErrors('nilai_sp');

        $this->assertDatabaseMissing('sps', [
            'nomor_sp' => 'ORACLE/SP/ERP/2026/00040',
        ]);
    }

    public function test_auto_sp_mode_rejects_value_above_50_million(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
            'name' => 'Nazar',
        ]);

        $this->actingAs($user)
            ->from(route('sp.index'))
            ->post(route('sp.store'), [
                'nomor_sp' => '022/PKU-VII/SP/2026',
                'tanggal_sp' => '2026-07-10',
                'nilai_sp' => '60000000',
                'nama_vendor' => 'Vendor Auto',
                'deskripsi_pengadaan' => 'Pengadaan harus masuk Oracle',
                'pic' => 'Nazar',
            ])
            ->assertRedirect(route('sp.index'))
            ->assertSessionHasErrors('nilai_sp');

        $this->assertDatabaseMissing('sps', [
            'nomor_sp' => '022/PKU-VII/SP/2026',
        ]);
    }
}
