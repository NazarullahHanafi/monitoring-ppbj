<?php

namespace Tests\Feature;

use App\Models\Torpr;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TrackingPrCreatorTest extends TestCase
{
    use RefreshDatabase;

    public function test_landing_tracking_shows_torpr_creator_name(): void
    {
        $creator = User::factory()->create([
            'name' => 'Eli',
            'department' => 'operasional',
        ]);

        Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/0401',
            'tanggal_pr' => '2026-07-06 09:00:00',
            'tujuan_pengadaan' => 'Pengadaan test tracking',
            'jumlah_pr' => 1000000,
            'created_by_user_id' => $creator->id,
        ]);

        $this->get(route('landing.track', ['q' => 'PKB/PR-26/CON/0401']))
            ->assertOk()
            ->assertSee('Eli')
            ->assertDontSee('Tidak Diketahui');
    }

    public function test_internal_tracking_shows_torpr_creator_name(): void
    {
        $viewer = User::factory()->create([
            'department' => 'operasional',
            'role' => 'superadmin',
        ]);

        $creator = User::factory()->create([
            'name' => 'Eli',
            'department' => 'operasional',
        ]);

        Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/0402',
            'tanggal_pr' => '2026-07-06 09:00:00',
            'tujuan_pengadaan' => 'Pengadaan test tracking internal',
            'jumlah_pr' => 1000000,
            'created_by_user_id' => $creator->id,
        ]);

        $this->actingAs($viewer)
            ->get(route('tracking.index', ['q' => 'PKB/PR-26/CON/0402']))
            ->assertOk()
            ->assertSee('Eli')
            ->assertDontSee('Tidak Diketahui');
    }
}
