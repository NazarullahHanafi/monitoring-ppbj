<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PpbjCancelProtectionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Cache::flush();
    }

    public function test_ppbj_cancel_requires_creator_password(): void
    {
        $creator = User::factory()->create([
            'name' => 'Putri',
            'buyer_name' => 'PB',
            'email' => 'putri@example.com',
            'password' => Hash::make('CreatorPass!234'),
            'department' => 'umum',
            'role' => 'User',
        ]);

        $actor = User::factory()->create([
            'password' => Hash::make('ActorPass!234'),
            'department' => 'umum',
            'role' => 'Superadmin',
        ]);

        $ppbj = Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/9991',
            'buyer' => 'PB',
            'uraian' => 'Pengadaan tes',
            'created_by_user_id' => $creator->id,
            'status' => 'ACTIVE',
        ]);

        $this->actingAs($actor)
            ->putJson(route('ppbj.cancel', $ppbj), [
                'reason' => 'Batal karena revisi kebutuhan',
                'creator_password' => 'WrongPassword',
            ])
            ->assertStatus(422)
            ->assertJsonFragment(['attempts_remaining' => 2]);

        $this->assertSame('ACTIVE', $ppbj->fresh()->status);

        $this->actingAs($actor)
            ->putJson(route('ppbj.cancel', $ppbj), [
                'reason' => 'Batal karena revisi kebutuhan',
                'creator_password' => 'CreatorPass!234',
            ])
            ->assertOk()
            ->assertJsonFragment(['message' => 'Data berhasil di-cancel']);

        $ppbj->refresh();
        $this->assertSame('CANCELLED', $ppbj->status);
        $this->assertSame('CANCELLED', $ppbj->status_sla);
        $this->assertNotNull($ppbj->cancelled_at);
        $this->assertSame($actor->id, $ppbj->cancelled_by_user_id);
        $this->assertSame($creator->id, $ppbj->cancel_verified_by_user_id);
    }

    public function test_old_ppbj_without_creator_can_use_matching_buyer_password(): void
    {
        $buyerUser = User::factory()->create([
            'name' => 'Putri',
            'buyer_name' => 'PB',
            'email' => 'putri@example.com',
            'password' => Hash::make('BuyerPass!234'),
            'department' => 'umum',
            'role' => 'User',
        ]);

        $actor = User::factory()->create([
            'password' => Hash::make('ActorPass!234'),
            'department' => 'umum',
            'role' => 'Superadmin',
        ]);

        $ppbj = Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/9992',
            'buyer' => 'PB',
            'uraian' => 'Data lama',
            'status' => 'ACTIVE',
        ]);

        $this->actingAs($actor)
            ->putJson(route('ppbj.cancel', $ppbj), [
                'reason' => 'Data lama dibatalkan',
                'creator_password' => 'BuyerPass!234',
            ])
            ->assertOk();

        $ppbj->refresh();
        $this->assertSame($buyerUser->id, $ppbj->created_by_user_id);
        $this->assertSame($actor->id, $ppbj->cancelled_by_user_id);
        $this->assertSame($buyerUser->id, $ppbj->cancel_verified_by_user_id);
    }

    public function test_old_ppbj_without_creator_or_buyer_falls_back_to_logged_in_user_password(): void
    {
        $actor = User::factory()->create([
            'password' => Hash::make('ActorPass!234'),
            'department' => 'umum',
            'role' => 'Superadmin',
        ]);

        $ppbj = Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/9993',
            'buyer' => null,
            'uraian' => 'Data tanpa buyer',
            'status' => 'ACTIVE',
        ]);

        $this->actingAs($actor)
            ->putJson(route('ppbj.cancel', $ppbj), [
                'reason' => 'Data tanpa buyer dibatalkan',
                'creator_password' => 'ActorPass!234',
            ])
            ->assertOk();

        $ppbj->refresh();
        $this->assertSame($actor->id, $ppbj->created_by_user_id);
        $this->assertSame($actor->id, $ppbj->cancelled_by_user_id);
        $this->assertSame($actor->id, $ppbj->cancel_verified_by_user_id);
    }
}
