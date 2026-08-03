<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class QuickSatuanStoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_umum_user_can_create_satuan_from_modal_ajax(): void
    {
        Cache::put('satuans:all', ['Unit'], 3600);

        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        $response = $this->actingAs($user)
            ->postJson(route('satuan.store'), [
                'nama_satuan' => 'Roll',
            ]);

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('satuan.nama_satuan', 'Roll');

        $this->assertDatabaseHas('satuans', [
            'nama_satuan' => 'Roll',
        ]);

        $this->assertFalse(Cache::has('satuans:all'));
    }

    public function test_quick_satuan_rejects_duplicate_name(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        $this->actingAs($user)
            ->postJson(route('satuan.store'), [
                'nama_satuan' => 'Unit',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('nama_satuan');
    }
}
