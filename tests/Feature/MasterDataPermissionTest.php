<?php

namespace Tests\Feature;

use App\Models\MasterPenyediaEksternal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MasterDataPermissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_umum_regular_user_can_add_penyedia_eksternal_master(): void
    {
        $user = User::factory()->create([
            'role' => 'user',
            'department' => 'umum',
        ]);

        $this->actingAs($user)
            ->postJson('/master/penyedia_eksternal', [
                'nama' => 'PT Vendor Baru Audit',
            ])
            ->assertOk()
            ->assertJsonPath('message', 'Berhasil ditambahkan');

        $this->assertDatabaseHas('master_penyedia_eksternal', [
            'nama' => 'PT Vendor Baru Audit',
        ]);
    }

    public function test_umum_regular_user_can_update_and_delete_penyedia_eksternal_master(): void
    {
        $user = User::factory()->create([
            'role' => 'user',
            'department' => 'umum',
        ]);

        $vendor = MasterPenyediaEksternal::create([
            'nama' => 'PT Vendor Terkunci',
        ]);

        $this->actingAs($user)
            ->putJson("/master/penyedia_eksternal/{$vendor->id}", [
                'nama' => 'PT Vendor Diubah',
            ])
            ->assertOk()
            ->assertJsonPath('message', 'Berhasil diupdate');

        $vendor->refresh();

        $this->actingAs($user)
            ->deleteJson("/master/penyedia_eksternal/{$vendor->id}")
            ->assertOk()
            ->assertJsonPath('message', 'Berhasil dihapus');

        $this->assertDatabaseMissing('master_penyedia_eksternal', [
            'id' => $vendor->id,
        ]);
    }

    public function test_regular_user_cannot_add_other_master_data(): void
    {
        $user = User::factory()->create([
            'role' => 'user',
            'department' => 'umum',
        ]);

        $this->actingAs($user)
            ->postJson('/master/buyer', [
                'nama' => 'Buyer Biasa',
            ])
            ->assertForbidden();
    }
}
