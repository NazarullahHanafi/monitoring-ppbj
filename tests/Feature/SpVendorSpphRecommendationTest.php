<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SpVendorSpphRecommendationTest extends TestCase
{
    use RefreshDatabase;

    public function test_sp_store_rejects_different_vendor_from_spph_without_confirmation(): void
    {
        $user = User::factory()->create([
            'name' => 'Nazar',
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/2001',
            'tgl_ppbj' => '2026-07-20',
            'tgl_terima_pr' => '2026-07-20',
            'uraian' => 'Pengadaan vendor rekomendasi',
            'status' => 'ACTIVE',
            'spph_rfq_1' => '777/PKU-VII/SPPH/2026',
        ]);

        Spph::create([
            'nomor_spph' => '777/PKU-VII/SPPH/2026',
            'sequence_number' => 777,
            'tanggal' => '2026-07-20',
            'nomor_pr' => 'PKB/PR-26/CON/2001',
            'nama_vendor' => 'Vendor Sesuai SPPH',
            'vendor_names' => ['Vendor Sesuai SPPH', 'Vendor Cadangan'],
            'deskripsi_pengadaan' => 'Pengadaan vendor rekomendasi',
            'pic' => 'Nazar',
        ]);

        $this->actingAs($user)
            ->from(route('sp.index'))
            ->post(route('sp.store'), [
                'nomor_sp' => '777/PKU-VII/SP/2026',
                'tanggal_sp' => '2026-07-20',
                'nilai_sp' => 1000000,
                'nomor_pr' => 'PKB/PR-26/CON/2001',
                'nama_vendor' => 'Vendor Berbeda',
                'deskripsi_pengadaan' => 'Pengadaan vendor rekomendasi',
                'pic' => 'Nazar',
            ])
            ->assertRedirect(route('sp.index'))
            ->assertSessionHasErrors('nama_vendor');

        $this->assertDatabaseMissing('sps', [
            'nomor_sp' => '777/PKU-VII/SP/2026',
        ]);
    }

    public function test_sp_store_allows_different_vendor_from_spph_when_confirmed(): void
    {
        $user = User::factory()->create([
            'name' => 'Nazar',
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/2002',
            'tgl_ppbj' => '2026-07-20',
            'tgl_terima_pr' => '2026-07-20',
            'uraian' => 'Pengadaan vendor beda dikonfirmasi',
            'status' => 'ACTIVE',
            'spph_rfq_1' => '778/PKU-VII/SPPH/2026',
        ]);

        Spph::create([
            'nomor_spph' => '778/PKU-VII/SPPH/2026',
            'sequence_number' => 778,
            'tanggal' => '2026-07-20',
            'nomor_pr' => 'PKB/PR-26/CON/2002',
            'nama_vendor' => 'Vendor SPPH Utama',
            'vendor_names' => ['Vendor SPPH Utama'],
            'deskripsi_pengadaan' => 'Pengadaan vendor beda dikonfirmasi',
            'pic' => 'Nazar',
        ]);

        $this->actingAs($user)
            ->post(route('sp.store'), [
                'nomor_sp' => '778/PKU-VII/SP/2026',
                'tanggal_sp' => '2026-07-20',
                'nilai_sp' => 1000000,
                'nomor_pr' => 'PKB/PR-26/CON/2002',
                'nama_vendor' => 'Vendor Berbeda Tapi Disetujui',
                'vendor_mismatch_confirmed' => '1',
                'deskripsi_pengadaan' => 'Pengadaan vendor beda dikonfirmasi',
                'pic' => 'Nazar',
            ])
            ->assertRedirect(route('sp.index'));

        $this->assertDatabaseHas('sps', [
            'nomor_sp' => '778/PKU-VII/SP/2026',
            'nama_vendor' => 'Vendor Berbeda Tapi Disetujui',
        ]);
    }
}
