<?php

namespace Tests\Feature;

use App\Models\Sp;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class PollingPerformanceTest extends TestCase
{
    use RefreshDatabase;

    public function test_sp_polling_is_limited_to_prevent_large_payloads(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        foreach (range(1, 60) as $number) {
            Sp::create([
                'nomor_sp' => sprintf('%03d/PKU-I/SP/2026', $number),
                'sequence_number' => $number,
                'tanggal_sp' => now()->toDateString(),
                'nomor_pr' => sprintf('PKB/PR-26/CON/%04d', $number),
                'nama_vendor' => 'Vendor '.$number,
                'deskripsi_pengadaan' => 'Pengadaan test '.$number,
                'pic' => 'PIC Test',
            ]);
        }

        $this->actingAs($user)
            ->getJson(route('sp.poll', ['last_id' => 0]))
            ->assertOk()
            ->assertJsonCount(50, 'rows')
            ->assertJsonPath('rows.0.id', 1)
            ->assertJsonPath('rows.49.id', 50);
    }

    public function test_ppbj_search_context_uses_single_safe_aggregate_query(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        DB::table('ppbj')->insert([
            'ppbj_no' => 'PKB/PR-26/CON/0401',
            'tgl_ppbj' => now()->toDateString(),
            'uraian' => 'Pengadaan layanan keamanan',
            'buyer' => 'Umum',
            'portofolio' => 'Support',
            'total_sebelum_ppn' => 1000000,
            'status' => 'ACTIVE',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->actingAs($user)
            ->get(route('ppbj.index', ['search' => '0401']))
            ->assertOk()
            ->assertSee('Management PPBJ');
    }
}
