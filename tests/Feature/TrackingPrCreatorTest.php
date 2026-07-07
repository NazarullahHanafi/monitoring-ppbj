<?php

namespace Tests\Feature;

use App\Models\Torpr;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
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

    public function test_landing_tracking_shows_stuck_reminder_and_audit_detail(): void
    {
        $creator = User::factory()->create([
            'name' => 'Eli',
            'department' => 'operasional',
        ]);

        Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/0601',
            'tanggal_pr' => now()->subDays(4)->format('Y-m-d H:i:s'),
            'tujuan_pengadaan' => 'Pengadaan reminder tracking',
            'jumlah_pr' => 1000000,
            'created_by_user_id' => $creator->id,
        ]);

        $this->get(route('landing.track', ['q' => 'PKB/PR-26/CON/0601']))
            ->assertOk()
            ->assertSee('Reminder Otomatis PR')
            ->assertSee('PR menunggu TTD Kabid')
            ->assertSee('Sudah 4 hari')
            ->assertSee('Timeline Audit Detail')
            ->assertSee('Input PR Operasional');
    }

    public function test_smart_search_suggests_by_vendor_buyer_and_portofolio(): void
    {
        DB::table('ppbj')->insert([
            'ppbj_no' => 'PKB/PR-26/CON/0602',
            'tgl_ppbj' => now()->format('Y-m-d'),
            'uraian' => 'Pengadaan jasa audit vendor',
            'buyer' => 'Nazar',
            'portofolio' => 'INS',
            'penyedia_eksternal' => 'PT Vendor Pintar',
            'metode_pengadaan' => 'Penunjukan langsung',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->getJson(route('landing.track.suggest', ['q' => 'Vendor Pintar']))
            ->assertOk()
            ->assertJsonPath('items.0.nomor', 'PKB/PR-26/CON/0602')
            ->assertJsonPath('items.0.source_label', 'PPBJ');
    }
}
