<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SpphPpbjSyncTest extends TestCase
{
    use RefreshDatabase;

    public function test_creating_spph_syncs_vendor_to_ppbj_penyedia_eksternal(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/0501',
            'tgl_terima_pr' => now()->toDateString(),
            'uraian' => 'Pengadaan jasa SPPH',
            'status' => 'ACTIVE',
        ]);

        $this->actingAs($user)
            ->post(route('spph.store'), [
                'nomor_spph' => '001/PKU-VI/SPPH/2026',
                'tanggal' => '2026-06-30',
                'nomor_pr_type' => 'ppbj',
                'nomor_pr' => 'PKB/PR-26/CON/0501',
                'nama_vendor' => 'PT Vendor Maju',
                'deskripsi_pengadaan' => 'Permintaan penawaran harga',
                'pic' => 'NAZAR',
            ])
            ->assertRedirect(route('spph.index'));

        $this->assertDatabaseHas('ppbj', [
            'ppbj_no' => 'PKB/PR-26/CON/0501',
            'spph_rfq_1' => '001/PKU-VI/SPPH/2026',
            'penyedia_eksternal' => 'PT Vendor Maju',
        ]);
    }

    public function test_creating_spph_can_store_multiple_print_vendors(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/0901',
            'tgl_ppbj' => now()->toDateString(),
            'tgl_terima_pr' => now()->toDateString(),
            'uraian' => 'Pengadaan multi vendor SPPH',
            'portofolio' => 'CON',
            'buyer' => 'NAZAR',
            'total_sebelum_ppn' => 2000000,
        ]);

        $this->actingAs($user)
            ->post(route('spph.store'), [
                'nomor_spph' => '090/PKU-VI/SPPH/2026',
                'tanggal' => now()->toDateString(),
                'nomor_pr' => 'PKB/PR-26/CON/0901',
                'nomor_pr_type' => 'ppbj',
                'vendor_names' => ['Vendor Audit A', 'Vendor Audit B'],
                'deskripsi_pengadaan' => 'Pengadaan multi vendor SPPH',
                'pic' => $user->name,
            ])
            ->assertRedirect(route('spph.index'));

        $spph = Spph::where('nomor_spph', '090/PKU-VI/SPPH/2026')->firstOrFail();

        $this->assertSame('Vendor Audit A', $spph->nama_vendor);
        $this->assertSame(['Vendor Audit A', 'Vendor Audit B'], $spph->print_vendor_names);
        $this->assertDatabaseHas('vendors', ['nama_vendor' => 'Vendor Audit A']);
        $this->assertDatabaseHas('vendors', ['nama_vendor' => 'Vendor Audit B']);
        $this->assertDatabaseHas('ppbj', [
            'ppbj_no' => 'PKB/PR-26/CON/0901',
            'spph_rfq_1' => '090/PKU-VI/SPPH/2026',
            'penyedia_eksternal' => 'Vendor Audit A',
        ]);
    }

    public function test_updating_spph_syncs_vendor_to_linked_ppbj(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/0502',
            'tgl_terima_pr' => now()->toDateString(),
            'uraian' => 'Pengadaan jasa edit SPPH',
            'status' => 'ACTIVE',
            'spph_rfq_1' => '002/PKU-VI/SPPH/2026',
            'penyedia_eksternal' => 'PT Vendor Lama',
        ]);

        $spph = Spph::create([
            'nomor_spph' => '002/PKU-VI/SPPH/2026',
            'sequence_number' => 2,
            'tanggal' => '2026-06-30',
            'nomor_pr' => 'PKB/PR-26/CON/0502',
            'nama_vendor' => 'PT Vendor Lama',
            'deskripsi_pengadaan' => 'Permintaan lama',
            'pic' => 'NAZAR',
        ]);

        $this->actingAs($user)
            ->put(route('spph.update', $spph), [
                'nomor_spph' => '002/PKU-VI/SPPH/2026',
                'tanggal' => '2026-06-30',
                'nomor_pr_type' => 'ppbj',
                'nomor_pr' => 'PKB/PR-26/CON/0502',
                'nama_vendor' => 'PT Vendor Baru',
                'deskripsi_pengadaan' => 'Permintaan diperbarui',
                'pic' => 'NAZAR',
            ])
            ->assertRedirect(route('spph.index'));

        $this->assertDatabaseHas('ppbj', [
            'ppbj_no' => 'PKB/PR-26/CON/0502',
            'spph_rfq_1' => '002/PKU-VI/SPPH/2026',
            'penyedia_eksternal' => 'PT Vendor Baru',
        ]);
    }

    public function test_deleting_spph_clears_matching_ppbj_penyedia_eksternal(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/0503',
            'tgl_terima_pr' => now()->toDateString(),
            'uraian' => 'Pengadaan jasa hapus SPPH',
            'status' => 'ACTIVE',
            'spph_rfq_1' => '003/PKU-VI/SPPH/2026',
            'penyedia_eksternal' => 'PT Vendor Hapus',
        ]);

        $spph = Spph::create([
            'nomor_spph' => '003/PKU-VI/SPPH/2026',
            'sequence_number' => 3,
            'tanggal' => '2026-06-30',
            'nomor_pr' => 'PKB/PR-26/CON/0503',
            'nama_vendor' => 'PT Vendor Hapus',
            'deskripsi_pengadaan' => 'Permintaan hapus',
            'pic' => 'NAZAR',
        ]);

        $this->actingAs($user)
            ->delete(route('spph.destroy', $spph))
            ->assertRedirect(route('spph.index'));

        $this->assertDatabaseHas('ppbj', [
            'ppbj_no' => 'PKB/PR-26/CON/0503',
            'spph_rfq_1' => null,
            'penyedia_eksternal' => null,
        ]);
    }
}
