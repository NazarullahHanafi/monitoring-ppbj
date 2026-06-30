<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PpbjReportFilterTest extends TestCase
{
    use RefreshDatabase;

    public function test_report_data_can_be_filtered_by_multiple_portofolio_and_vendor(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/0401',
            'tgl_ppbj' => now()->toDateString(),
            'tgl_terima_pr' => now()->toDateString(),
            'uraian' => 'Pengadaan inspeksi CON vendor A',
            'portofolio' => 'CON',
            'buyer' => 'NAZAR',
            'penyedia_eksternal' => 'Vendor A',
            'total_sebelum_ppn' => 1000000,
            'nilai_sp_spk' => 800000,
            'nilai_bpg' => 700000,
            'created_at' => now(),
        ]);

        Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/LAB/0402',
            'tgl_ppbj' => now()->toDateString(),
            'tgl_terima_pr' => now()->toDateString(),
            'uraian' => 'Pengadaan LAB vendor B',
            'portofolio' => 'LAB',
            'buyer' => 'PUTRI',
            'penyedia_eksternal' => 'Vendor B',
            'total_sebelum_ppn' => 2000000,
            'nilai_sp_spk' => 1500000,
            'nilai_bpg' => 1200000,
            'created_at' => now(),
        ]);

        Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/0403',
            'tgl_ppbj' => now()->toDateString(),
            'tgl_terima_pr' => now()->toDateString(),
            'uraian' => 'Pengadaan CON vendor B',
            'portofolio' => 'CON',
            'buyer' => 'NAZAR',
            'penyedia_eksternal' => 'Vendor B',
            'total_sebelum_ppn' => 3000000,
            'nilai_sp_spk' => 2500000,
            'nilai_bpg' => 2300000,
            'created_at' => now(),
        ]);

        $response = $this->actingAs($user)->getJson(route('ppbj.report.data', [
            'period' => 'monthly',
            'start_date' => now()->format('Y-m'),
            'portofolio' => ['CON'],
            'vendor' => ['Vendor B'],
        ]));

        $response->assertOk()
            ->assertJsonPath('stats.total', 1)
            ->assertJsonPath('stats.total_value', 3000000)
            ->assertJsonPath('stats.total_sp_value', 2500000)
            ->assertJsonPath('stats.total_bpg_value', 2300000)
            ->assertJsonPath('stats.total_portofolio', 1)
            ->assertJsonPath('stats.total_vendor', 1)
            ->assertJsonPath('data.0.ppbj_no', 'PKB/PR-26/CON/0403')
            ->assertJsonPath('breakdown.portofolio.0.label', 'CON')
            ->assertJsonPath('breakdown.vendor.0.label', 'Vendor B');
    }

    public function test_report_export_respects_portofolio_and_vendor_filters(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/0501',
            'tgl_ppbj' => now()->toDateString(),
            'tgl_terima_pr' => now()->toDateString(),
            'uraian' => 'Data masuk export',
            'portofolio' => 'CON',
            'penyedia_eksternal' => 'Vendor Audit',
            'total_sebelum_ppn' => 4000000,
            'nilai_sp_spk' => 3500000,
            'nilai_bpg' => 3400000,
            'created_at' => now(),
        ]);

        Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/LAB/0502',
            'tgl_ppbj' => now()->toDateString(),
            'tgl_terima_pr' => now()->toDateString(),
            'uraian' => 'Data tidak ikut export',
            'portofolio' => 'LAB',
            'penyedia_eksternal' => 'Vendor Lain',
            'total_sebelum_ppn' => 5000000,
            'created_at' => now(),
        ]);

        $response = $this->actingAs($user)->get(route('ppbj.report.export', [
            'period' => 'monthly',
            'start_date' => now()->format('Y-m'),
            'portofolio' => ['CON'],
            'vendor' => ['Vendor Audit'],
        ]));

        $response->assertOk();
        $content = $response->streamedContent();

        $this->assertStringContainsString('PKB/PR-26/CON/0501', $content);
        $this->assertStringContainsString('Vendor Audit', $content);
        $this->assertStringNotContainsString('PKB/PR-26/LAB/0502', $content);
        $this->assertStringContainsString('Nilai SP/SPK', $content);
    }
}
