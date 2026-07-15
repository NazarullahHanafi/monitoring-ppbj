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

    public function test_sp_without_creator_is_locked_from_editing(): void
    {
        $user = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $sp = Sp::create([
            'nomor_sp' => '902/PKU-VII/SP/2026',
            'sequence_number' => 902,
            'tanggal_sp' => '2026-07-15',
            'nilai_sp' => 10000000,
            'nama_vendor' => 'Vendor Legacy',
            'deskripsi_pengadaan' => 'Pengadaan legacy',
            'pic' => 'Legacy',
        ]);

        $this->actingAs($user)
            ->putJson(route('sp.update', $sp), [
                'nomor_sp' => '902/PKU-VII/SP/2026',
                'tanggal_sp' => '2026-07-15',
                'nilai_sp' => 12000000,
                'nama_vendor' => 'Vendor Legacy Diubah',
                'deskripsi_pengadaan' => 'Pengadaan legacy diubah',
                'pic' => 'Legacy',
            ])
            ->assertForbidden();

        $this->assertDatabaseHas('sps', [
            'id' => $sp->id,
            'nama_vendor' => 'Vendor Legacy',
        ]);
    }

    public function test_sp_can_be_edited_when_pic_matches_logged_in_user(): void
    {
        $user = User::factory()->create([
            'name' => 'Nazar',
            'email' => 'nazar.test@example.com',
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $sp = Sp::create([
            'nomor_sp' => '903/PKU-VII/SP/2026',
            'sequence_number' => 903,
            'tanggal_sp' => '2026-07-15',
            'nilai_sp' => 10000000,
            'nama_vendor' => 'Vendor Lama',
            'deskripsi_pengadaan' => 'Pengadaan lama',
            'pic' => 'Nazar',
        ]);

        $this->actingAs($user)
            ->put(route('sp.update', $sp), [
                'nomor_sp' => '903/PKU-VII/SP/2026',
                'tanggal_sp' => '2026-07-15',
                'nilai_sp' => 12000000,
                'nama_vendor' => 'Vendor PIC Match',
                'deskripsi_pengadaan' => 'Pengadaan PIC match',
                'pic' => 'Nazar',
            ])
            ->assertRedirect(route('sp.index'));

        $this->assertDatabaseHas('sps', [
            'id' => $sp->id,
            'nama_vendor' => 'Vendor PIC Match',
        ]);
    }

    public function test_spph_without_creator_is_locked_from_editing(): void
    {
        $user = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $spph = Spph::create([
            'nomor_spph' => '902/PKU-VII/SPPH/2026',
            'sequence_number' => 902,
            'tanggal' => '2026-07-15',
            'nama_vendor' => 'Vendor Legacy',
            'vendor_names' => ['Vendor Legacy'],
            'deskripsi_pengadaan' => 'Pengadaan legacy',
            'pic' => 'Legacy',
        ]);

        $this->actingAs($user)
            ->putJson(route('spph.update', $spph), [
                'nomor_spph' => '902/PKU-VII/SPPH/2026',
                'tanggal' => '2026-07-15',
                'nama_vendor' => 'Vendor Legacy Diubah',
                'vendor_names' => ['Vendor Legacy Diubah'],
                'deskripsi_pengadaan' => 'Pengadaan legacy diubah',
                'pic' => 'Legacy',
            ])
            ->assertForbidden();

        $this->assertDatabaseHas('spphs', [
            'id' => $spph->id,
            'nama_vendor' => 'Vendor Legacy',
        ]);
    }

    public function test_spph_can_be_edited_when_pic_matches_logged_in_user(): void
    {
        $user = User::factory()->create([
            'name' => 'Putri',
            'buyer_name' => 'Pb',
            'email' => 'putri.test@example.com',
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $spph = Spph::create([
            'nomor_spph' => '903/PKU-VII/SPPH/2026',
            'sequence_number' => 903,
            'tanggal' => '2026-07-15',
            'nama_vendor' => 'Vendor Lama',
            'vendor_names' => ['Vendor Lama'],
            'deskripsi_pengadaan' => 'Pengadaan lama',
            'pic' => 'Pb',
        ]);

        $this->actingAs($user)
            ->put(route('spph.update', $spph), [
                'nomor_spph' => '903/PKU-VII/SPPH/2026',
                'tanggal' => '2026-07-15',
                'nama_vendor' => 'Vendor PIC Match',
                'vendor_names' => ['Vendor PIC Match'],
                'deskripsi_pengadaan' => 'Pengadaan PIC match',
                'pic' => 'Pb',
            ])
            ->assertRedirect(route('spph.index'));

        $this->assertDatabaseHas('spphs', [
            'id' => $spph->id,
            'nama_vendor' => 'Vendor PIC Match',
        ]);
    }
}
