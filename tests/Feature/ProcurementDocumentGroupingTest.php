<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProcurementDocumentGroupingTest extends TestCase
{
    use RefreshDatabase;

    public function test_one_spph_can_link_multiple_ppbj_without_duplicate_processing(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $first = $this->ppbj('PKB/PR-26/CON/0801');
        $second = $this->ppbj('PKB/PR-26/CON/0802');

        $this->actingAs($user)->post(route('spph.store'), [
            'nomor_spph' => '801/PKU-VIII/SPPH/2026',
            'tanggal' => '2026-08-14',
            'nomor_pr_type' => 'ppbj',
            'nomor_prs' => [$first->ppbj_no, $second->ppbj_no],
            'nomor_pr' => $first->ppbj_no,
            'nama_vendor' => 'PT Vendor Paket',
            'deskripsi_pengadaan' => 'Paket pengadaan gabungan',
            'pic' => $user->name,
        ])->assertRedirect(route('spph.index'));

        $spph = Spph::where('nomor_spph', '801/PKU-VIII/SPPH/2026')->firstOrFail();

        $this->assertSame($first->ppbj_no, $spph->nomor_pr);
        $this->assertSame([$first->ppbj_no, $second->ppbj_no], $spph->linkedPpbjNumbers());
        $this->assertDatabaseCount('spph_ppbj', 2);
        $this->assertDatabaseHas('ppbj', ['id' => $first->id, 'spph_rfq_1' => $spph->nomor_spph]);
        $this->assertDatabaseHas('ppbj', ['id' => $second->id, 'spph_rfq_1' => $spph->nomor_spph]);

        $this->actingAs($user)->post(route('spph.store'), [
            'nomor_spph' => '802/PKU-VIII/SPPH/2026',
            'tanggal' => '2026-08-14',
            'nomor_pr_type' => 'ppbj',
            'nomor_prs' => [$second->ppbj_no],
            'nomor_pr' => $second->ppbj_no,
            'nama_vendor' => 'PT Vendor Lain',
            'deskripsi_pengadaan' => 'Tidak boleh mengambil PPBJ yang sama',
            'pic' => $user->name,
        ])->assertSessionHasErrors('nomor_prs');

        $this->assertDatabaseCount('spphs', 1);
    }

    public function test_one_sp_can_link_multiple_ppbj_and_search_secondary_number(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $first = $this->ppbj('PKB/PR-26/CON/0811');
        $second = $this->ppbj('PKB/PR-26/CON/0812');

        $this->actingAs($user)->post(route('sp.store'), [
            'nomor_sp' => '811/PKU-VIII/SP/2026',
            'tanggal_sp' => '2026-08-14',
            'nilai_sp' => 10_000_000,
            'nomor_pr_type' => 'ppbj',
            'nomor_prs' => [$first->ppbj_no, $second->ppbj_no],
            'nomor_pr' => $first->ppbj_no,
            'nilai_pr' => 12_000_000,
            'nama_vendor' => 'PT Vendor Paket SP',
            'deskripsi_pengadaan' => 'Surat pesanan gabungan',
            'pic' => $user->name,
        ])->assertRedirect(route('sp.index'));

        $sp = Sp::where('nomor_sp', '811/PKU-VIII/SP/2026')->firstOrFail();

        $this->assertSame([$first->ppbj_no, $second->ppbj_no], $sp->linkedPpbjNumbers());
        $this->assertDatabaseCount('sp_ppbj', 2);
        $this->assertDatabaseHas('ppbj', ['id' => $first->id, 'awarding_sp' => $sp->nomor_sp]);
        $this->assertDatabaseHas('ppbj', ['id' => $second->id, 'awarding_sp' => $sp->nomor_sp]);

        $response = $this->actingAs($user)->get(route('sp.index', ['search' => '0812']));
        $response->assertOk()->assertSee($sp->nomor_sp);

        $this->actingAs($user)->put(route('sp.update', $sp), [
            'nomor_sp' => $sp->nomor_sp,
            'tanggal_sp' => '2026-08-14',
            'nilai_sp' => 10_000_000,
            'nomor_pr_type' => 'manual',
            'nomor_pr' => 'PR-MANUAL-PAKET',
            'nilai_pr' => 12_000_000,
            'nama_vendor' => 'PT Vendor Paket SP',
            'deskripsi_pengadaan' => 'Surat pesanan dialihkan ke PR manual',
            'pic' => $user->name,
        ])->assertRedirect(route('sp.index'));

        $this->assertDatabaseCount('sp_ppbj', 0);
        $this->assertDatabaseHas('ppbj', ['id' => $first->id, 'awarding_sp' => null]);
        $this->assertDatabaseHas('ppbj', ['id' => $second->id, 'awarding_sp' => null]);
    }

    private function ppbj(string $number): Ppbj
    {
        return Ppbj::create([
            'ppbj_no' => $number,
            'tgl_ppbj' => '2026-08-14',
            'tgl_terima_pr' => '2026-08-14',
            'uraian' => 'Pengadaan '.$number,
            'status' => 'ACTIVE',
            'total_sebelum_ppn' => 12_000_000,
        ]);
    }
}
