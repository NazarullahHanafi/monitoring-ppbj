<?php

namespace Tests\Feature;

use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class SpSpphDeleteProtectionTest extends TestCase
{
    use RefreshDatabase;

    public function test_sp_can_be_deleted_with_creator_password(): void
    {
        Cache::flush();

        $creator = User::factory()->create([
            'password' => Hash::make('CreatorPass!234'),
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $deleter = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $sp = Sp::create([
            'nomor_sp' => '999/PKU-VII/SP/2026',
            'sequence_number' => 999,
            'created_by_user_id' => $creator->id,
            'tanggal_sp' => now()->toDateString(),
            'nilai_sp' => 75000000,
            'nama_vendor' => 'Vendor Test',
            'deskripsi_pengadaan' => 'Pengadaan test',
            'pic' => 'Nazar',
        ]);

        $this->actingAs($deleter)
            ->deleteJson(route('sp.destroy', $sp), [
                'creator_password' => 'CreatorPass!234',
            ])
            ->assertOk()
            ->assertJsonPath('ok', true);

        $this->assertDatabaseMissing('sps', ['id' => $sp->id]);
        $this->assertDatabaseHas('activity_logs', [
            'model_type' => Sp::class,
            'model_id' => $sp->id,
            'action' => 'deleted',
        ]);
    }

    public function test_sp_delete_locks_after_three_wrong_passwords(): void
    {
        Cache::flush();

        $creator = User::factory()->create([
            'password' => Hash::make('CreatorPass!234'),
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $deleter = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $sp = Sp::create([
            'nomor_sp' => '998/PKU-VII/SP/2026',
            'sequence_number' => 998,
            'created_by_user_id' => $creator->id,
            'tanggal_sp' => now()->toDateString(),
            'nilai_sp' => 75000000,
            'nama_vendor' => 'Vendor Test',
            'deskripsi_pengadaan' => 'Pengadaan test',
            'pic' => 'Nazar',
        ]);

        $this->actingAs($deleter)
            ->deleteJson(route('sp.destroy', $sp), ['creator_password' => 'salah-1'])
            ->assertStatus(422)
            ->assertJsonPath('attempts_remaining', 2);

        $this->actingAs($deleter)
            ->deleteJson(route('sp.destroy', $sp), ['creator_password' => 'salah-2'])
            ->assertStatus(422)
            ->assertJsonPath('attempts_remaining', 1);

        $this->actingAs($deleter)
            ->deleteJson(route('sp.destroy', $sp), ['creator_password' => 'salah-3'])
            ->assertStatus(429)
            ->assertJsonPath('locked', true)
            ->assertJsonStructure(['locked_until', 'retry_after']);

        $this->actingAs($deleter)
            ->deleteJson(route('sp.destroy', $sp), ['creator_password' => 'CreatorPass!234'])
            ->assertStatus(429)
            ->assertJsonPath('locked', true);

        $this->assertDatabaseHas('sps', ['id' => $sp->id]);
    }

    public function test_spph_can_be_deleted_with_creator_password(): void
    {
        Cache::flush();

        $creator = User::factory()->create([
            'password' => Hash::make('CreatorPass!234'),
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $deleter = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $spph = Spph::create([
            'nomor_spph' => '999/PKU-VII/SPPH/2026',
            'sequence_number' => 999,
            'created_by_user_id' => $creator->id,
            'tanggal' => now()->toDateString(),
            'nama_vendor' => 'Vendor Test',
            'deskripsi_pengadaan' => 'Pengadaan test',
            'pic' => 'Nazar',
        ]);

        $this->actingAs($deleter)
            ->deleteJson(route('spph.destroy', $spph), [
                'creator_password' => 'CreatorPass!234',
            ])
            ->assertOk()
            ->assertJsonPath('ok', true);

        $this->assertDatabaseMissing('spphs', ['id' => $spph->id]);
        $this->assertDatabaseHas('activity_logs', [
            'model_type' => Spph::class,
            'model_id' => $spph->id,
            'action' => 'deleted',
        ]);
    }

    public function test_spph_delete_locks_after_three_wrong_passwords(): void
    {
        Cache::flush();

        $creator = User::factory()->create([
            'password' => Hash::make('CreatorPass!234'),
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $deleter = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $spph = Spph::create([
            'nomor_spph' => '998/PKU-VII/SPPH/2026',
            'sequence_number' => 998,
            'created_by_user_id' => $creator->id,
            'tanggal' => now()->toDateString(),
            'nama_vendor' => 'Vendor Test',
            'deskripsi_pengadaan' => 'Pengadaan test',
            'pic' => 'Nazar',
        ]);

        $this->actingAs($deleter)
            ->deleteJson(route('spph.destroy', $spph), ['creator_password' => 'salah-1'])
            ->assertStatus(422)
            ->assertJsonPath('attempts_remaining', 2);

        $this->actingAs($deleter)
            ->deleteJson(route('spph.destroy', $spph), ['creator_password' => 'salah-2'])
            ->assertStatus(422)
            ->assertJsonPath('attempts_remaining', 1);

        $this->actingAs($deleter)
            ->deleteJson(route('spph.destroy', $spph), ['creator_password' => 'salah-3'])
            ->assertStatus(429)
            ->assertJsonPath('locked', true)
            ->assertJsonStructure(['locked_until', 'retry_after']);

        $this->actingAs($deleter)
            ->deleteJson(route('spph.destroy', $spph), ['creator_password' => 'CreatorPass!234'])
            ->assertStatus(429)
            ->assertJsonPath('locked', true);

        $this->assertDatabaseHas('spphs', ['id' => $spph->id]);
    }
}
