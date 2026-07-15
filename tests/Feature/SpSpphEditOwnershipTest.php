<?php

namespace Tests\Feature;

use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SpSpphEditOwnershipTest extends TestCase
{
    use RefreshDatabase;

    public function test_sp_cannot_be_edited_by_non_creator(): void
    {
        $creator = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $otherUser = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $sp = Sp::create([
            'nomor_sp' => '901/PKU-VII/SP/2026',
            'sequence_number' => 901,
            'created_by_user_id' => $creator->id,
            'tanggal_sp' => '2026-07-15',
            'nilai_sp' => 10000000,
            'nama_vendor' => 'Vendor Asli',
            'deskripsi_pengadaan' => 'Pengadaan asli',
            'pic' => 'Nazar',
        ]);

        $this->actingAs($otherUser)
            ->putJson(route('sp.update', $sp), [
                'nomor_sp' => '901/PKU-VII/SP/2026',
                'tanggal_sp' => '2026-07-15',
                'nilai_sp' => 11000000,
                'nama_vendor' => 'Vendor Diubah',
                'deskripsi_pengadaan' => 'Pengadaan diubah',
                'pic' => 'Nazar',
            ])
            ->assertForbidden()
            ->assertJsonPath('message', 'Data SP hanya bisa diedit oleh user pembuatnya.');

        $this->assertDatabaseHas('sps', [
            'id' => $sp->id,
            'nama_vendor' => 'Vendor Asli',
        ]);
    }

    public function test_spph_cannot_be_edited_by_non_creator(): void
    {
        $creator = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $otherUser = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $spph = Spph::create([
            'nomor_spph' => '901/PKU-VII/SPPH/2026',
            'sequence_number' => 901,
            'created_by_user_id' => $creator->id,
            'tanggal' => '2026-07-15',
            'nama_vendor' => 'Vendor Asli',
            'vendor_names' => ['Vendor Asli'],
            'deskripsi_pengadaan' => 'Pengadaan asli',
            'pic' => 'Nazar',
        ]);

        $this->actingAs($otherUser)
            ->putJson(route('spph.update', $spph), [
                'nomor_spph' => '901/PKU-VII/SPPH/2026',
                'tanggal' => '2026-07-15',
                'nama_vendor' => 'Vendor Diubah',
                'vendor_names' => ['Vendor Diubah'],
                'deskripsi_pengadaan' => 'Pengadaan diubah',
                'pic' => 'Nazar',
            ])
            ->assertForbidden()
            ->assertJsonPath('message', 'Data SPPH hanya bisa diedit oleh user pembuatnya.');

        $this->assertDatabaseHas('spphs', [
            'id' => $spph->id,
            'nama_vendor' => 'Vendor Asli',
        ]);
    }
}
