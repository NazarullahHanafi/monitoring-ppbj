<?php

namespace Tests\Feature;

use App\Models\Torpr;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TorprQrButtonTest extends TestCase
{
    use RefreshDatabase;

    public function test_torpr_index_renders_qr_buttons_with_tokens(): void
    {
        $user = User::factory()->create([
            'department' => 'operasional',
            'role' => 'superadmin',
        ]);

        Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/0701',
            'tanggal_pr' => '2026-07-08 09:00:00',
            'tujuan_pengadaan' => 'Pengadaan QR test',
            'jumlah_pr' => 1000000,
            'sign_token_kabid' => 'token-kabid-test',
            'sign_token_kacab' => 'token-kacab-test',
            'sign_token_kabid_expires_at' => now()->addDays(7),
            'sign_token_kacab_expires_at' => now()->addDays(7),
            'created_by_user_id' => $user->id,
        ]);

        $this->actingAs($user)
            ->get(route('torpr.index'))
            ->assertOk()
            ->assertSee('data-qr-trigger', false)
            ->assertSee('data-qr-type="kabid"', false)
            ->assertSee('data-qr-token="token-kabid-test"', false)
            ->assertSee('data-qr-type="kacab"', false)
            ->assertSee('data-qr-token="token-kacab-test"', false)
            ->assertSee('QR Kabid')
            ->assertSee('QR Kacab');
    }

    public function test_quick_sign_qr_endpoint_returns_svg(): void
    {
        $user = User::factory()->create([
            'department' => 'operasional',
            'role' => 'superadmin',
        ]);

        Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/0702',
            'tanggal_pr' => '2026-07-08 09:00:00',
            'tujuan_pengadaan' => 'Pengadaan QR endpoint',
            'jumlah_pr' => 1000000,
            'sign_token_kabid' => 'token-kabid-endpoint',
            'sign_token_kabid_expires_at' => now()->addDays(7),
            'created_by_user_id' => $user->id,
        ]);

        $this->actingAs($user)
            ->get(route('pr.quick-sign-qr', ['token' => 'token-kabid-endpoint', 'type' => 'kabid']))
            ->assertOk()
            ->assertHeader('Content-Type', 'image/svg+xml')
            ->assertSee('<svg', false);
    }
}
