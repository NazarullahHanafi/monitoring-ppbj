<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\Torpr;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class PpbjGoodsArrivalTest extends TestCase
{
    use RefreshDatabase;

    public function test_umum_can_mark_goods_arrived_and_creator_can_confirm_it(): void
    {
        $umum = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
        ]);
        $creator = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/0999',
            'tujuan_pengadaan' => 'Pengadaan monitor audit',
            'created_by_user_id' => $creator->id,
        ]);

        $ppbj = Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/0999',
            'tgl_ppbj' => now()->toDateString(),
            'uraian' => 'Pengadaan monitor audit',
            'status' => 'ACTIVE',
            'target_sla_hari' => 10,
            'progres' => 80,
        ]);

        $this->actingAs($umum)
            ->patchJson(route('ppbj.goodsArrived', $ppbj), [
                'note' => 'Barang sudah sampai gudang.',
            ])
            ->assertOk()
            ->assertJsonPath('message', 'Barang/pekerjaan berhasil ditandai sudah datang.');

        $this->assertDatabaseHas('ppbj', [
            'id' => $ppbj->id,
            'goods_arrived_by_user_id' => $umum->id,
            'goods_arrived_note' => 'Barang sudah sampai gudang.',
            'goods_confirmed_at' => null,
        ]);

        $this->actingAs($creator)
            ->patchJson(route('ppbj.goodsConfirmed', $ppbj), [
                'note' => 'Sudah dicek operasional.',
            ])
            ->assertOk()
            ->assertJsonPath('message', 'Penerimaan berhasil dikonfirmasi Operasional.');

        $this->assertDatabaseHas('ppbj', [
            'id' => $ppbj->id,
            'goods_confirmed_by_user_id' => $creator->id,
            'goods_confirmed_note' => 'Sudah dicek operasional.',
        ]);

        $this->assertGreaterThanOrEqual(1, DB::table('chat_messages')->count());
    }
}
