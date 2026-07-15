<?php

namespace Tests\Feature;

use App\Models\SpMasterOption;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class SpMasterOptionDeleteProtectionTest extends TestCase
{
    use RefreshDatabase;

    public function test_master_option_can_be_deleted_with_superadmin_umum_password(): void
    {
        Cache::flush();

        $superadmin = User::factory()->create([
            'email' => 'superadmin@sucofindo.com',
            'role' => 'superadmin',
            'department' => 'umum',
            'password' => Hash::make('AdminPass!234'),
        ]);

        $actor = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $option = SpMasterOption::create([
            'type' => 'jabatan_sci',
            'nama' => 'Test Jabatan SCI',
            'is_active' => true,
        ]);

        $this->actingAs($actor)
            ->deleteJson(route('sp-master-options.destroy', $option), [
                'admin_password' => 'AdminPass!234',
            ])
            ->assertOk()
            ->assertJsonPath('ok', true);

        $this->assertDatabaseMissing('sp_master_options', ['id' => $option->id]);
        $this->assertDatabaseHas('activity_logs', [
            'user_id' => $actor->id,
            'model_type' => SpMasterOption::class,
            'model_id' => $option->id,
            'action' => 'deleted',
        ]);
    }

    public function test_master_option_delete_rejects_wrong_password(): void
    {
        Cache::flush();

        User::factory()->create([
            'email' => 'superadmin@sucofindo.com',
            'role' => 'superadmin',
            'department' => 'umum',
            'password' => Hash::make('AdminPass!234'),
        ]);

        $actor = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $option = SpMasterOption::create([
            'type' => 'jabatan_sci',
            'nama' => 'Test Password Salah',
            'is_active' => true,
        ]);

        $this->actingAs($actor)
            ->deleteJson(route('sp-master-options.destroy', $option), [
                'admin_password' => 'WrongPassword',
            ])
            ->assertStatus(422)
            ->assertJsonPath('attempts_remaining', 2);

        $this->assertDatabaseHas('sp_master_options', ['id' => $option->id]);
    }

    public function test_master_option_delete_locks_after_three_wrong_passwords(): void
    {
        Cache::flush();

        User::factory()->create([
            'email' => 'superadmin@sucofindo.com',
            'role' => 'superadmin',
            'department' => 'umum',
            'password' => Hash::make('AdminPass!234'),
        ]);

        $actor = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $option = SpMasterOption::create([
            'type' => 'jabatan_sci',
            'nama' => 'Test Lock Master',
            'is_active' => true,
        ]);

        $this->actingAs($actor)
            ->deleteJson(route('sp-master-options.destroy', $option), ['admin_password' => 'salah-1'])
            ->assertStatus(422)
            ->assertJsonPath('attempts_remaining', 2);

        $this->actingAs($actor)
            ->deleteJson(route('sp-master-options.destroy', $option), ['admin_password' => 'salah-2'])
            ->assertStatus(422)
            ->assertJsonPath('attempts_remaining', 1);

        $this->actingAs($actor)
            ->deleteJson(route('sp-master-options.destroy', $option), ['admin_password' => 'salah-3'])
            ->assertStatus(429)
            ->assertJsonPath('locked', true)
            ->assertJsonStructure(['locked_until', 'retry_after']);

        $this->actingAs($actor)
            ->deleteJson(route('sp-master-options.destroy', $option), ['admin_password' => 'AdminPass!234'])
            ->assertStatus(429)
            ->assertJsonPath('locked', true);

        $this->assertDatabaseHas('sp_master_options', ['id' => $option->id]);
    }
}
