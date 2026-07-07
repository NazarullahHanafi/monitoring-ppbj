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

    public function test_manual_signature_dates_store_signer_name_on_create(): void
    {
        $user = User::factory()->create([
            'name' => 'Admin Ops',
            'department' => 'operasional',
            'role' => 'superadmin',
        ]);

        $this->actingAs($user)
            ->post(route('torpr.store'), [
                'nomor_pr' => 'PKB/PR-26/CON/0501',
                'tanggal_pr' => '2026-07-06T09:00',
                'tujuan_pengadaan' => 'Pengadaan dengan TTD manual',
                'jumlah_pr' => 1000000,
                'tgl_ttd_kabid_pr' => '2026-07-06T10:00',
                'tgl_ttd_kacab_pr' => '2026-07-06T11:00',
            ])
            ->assertOk();

        $this->assertDatabaseHas('torprs', [
            'nomor_pr' => 'PKB/PR-26/CON/0501',
            'signed_by_kabid_name' => 'Admin Ops',
            'signed_by_kacab_name' => 'Admin Ops',
        ]);
    }

    public function test_manual_signature_name_is_repaired_when_date_exists_without_name(): void
    {
        $user = User::factory()->create([
            'name' => 'Admin Ops',
            'department' => 'operasional',
            'role' => 'superadmin',
        ]);

        $torpr = Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/0502',
            'tanggal_pr' => '2026-07-06 09:00:00',
            'tujuan_pengadaan' => 'Pengadaan repair signer',
            'jumlah_pr' => 1000000,
            'tgl_ttd_kabid_pr' => '2026-07-06 10:00:00',
            'tgl_ttd_kacab_pr' => '2026-07-06 11:00:00',
            'created_by_user_id' => $user->id,
        ]);

        $this->actingAs($user)
            ->put(route('torpr.update', $torpr->id), [
                'nomor_pr' => 'PKB/PR-26/CON/0502',
                'tanggal_pr' => '2026-07-06T09:00',
                'tujuan_pengadaan' => 'Pengadaan repair signer',
                'jumlah_pr' => 1000000,
                'tgl_ttd_kabid_pr' => '2026-07-06T10:00',
                'tgl_ttd_kacab_pr' => '2026-07-06T11:00',
            ])
            ->assertOk();

        $this->assertDatabaseHas('torprs', [
            'nomor_pr' => 'PKB/PR-26/CON/0502',
            'signed_by_kabid_name' => 'Admin Ops',
            'signed_by_kacab_name' => 'Admin Ops',
        ]);
    }

    public function test_tracking_uses_creator_name_when_old_manual_signature_has_no_signer_name(): void
    {
        $creator = User::factory()->create([
            'name' => 'Eli',
            'department' => 'operasional',
        ]);

        Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/0503',
            'tanggal_pr' => '2026-07-06 09:00:00',
            'tujuan_pengadaan' => 'Pengadaan tracking signer lama',
            'jumlah_pr' => 1000000,
            'tgl_ttd_kabid_pr' => '2026-07-06 10:00:00',
            'tgl_ttd_kacab_pr' => '2026-07-06 11:00:00',
            'created_by_user_id' => $creator->id,
        ]);

        $this->get(route('landing.track', ['q' => 'PKB/PR-26/CON/0503']))
            ->assertOk()
            ->assertSee('Eli')
            ->assertDontSee('Kepala Bidang (Manual)')
            ->assertDontSee('Kepala Cabang (Manual)');
    }
}
