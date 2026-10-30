<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class SpLifecycleAndAllocationTest extends TestCase
{
    use RefreshDatabase;

    public function test_grouped_sp_allocates_value_and_syncs_final_vendor_to_each_ppbj(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $first = $this->ppbj('PKB/PR-26/CON/9101', 60_000_000);
        $second = $this->ppbj('PKB/PR-26/CON/9102', 40_000_000);

        $this->actingAs($user)->post(route('sp.store'), [
            'nomor_sp' => '101/PKU-X/SP/2026',
            'tanggal_sp' => '2026-10-20',
            'nilai_sp' => 45_000_000,
            'nomor_pr_type' => 'ppbj',
            'nomor_prs' => [$first->ppbj_no, $second->ppbj_no],
            'nama_vendor' => 'PT Vendor Final',
            'deskripsi_pengadaan' => 'Paket gabungan aman',
            'pic' => $user->name,
        ])->assertRedirect(route('sp.index'));

        $sp = Sp::where('nomor_sp', '101/PKU-X/SP/2026')->firstOrFail();

        $this->assertDatabaseHas('sp_ppbj', [
            'sp_id' => $sp->id,
            'ppbj_id' => $first->id,
            'nilai_alokasi' => 27_000_000,
            'allocation_status' => 'automatic',
        ]);
        $this->assertDatabaseHas('sp_ppbj', [
            'sp_id' => $sp->id,
            'ppbj_id' => $second->id,
            'nilai_alokasi' => 18_000_000,
        ]);
        $this->assertDatabaseHas('ppbj', [
            'id' => $first->id,
            'nilai_sp_spk' => 27_000_000,
            'penyedia_eksternal' => 'PT Vendor Final',
        ]);
        $this->assertDatabaseHas('ppbj', [
            'id' => $second->id,
            'nilai_sp_spk' => 18_000_000,
            'penyedia_eksternal' => 'PT Vendor Final',
        ]);
    }

    public function test_manual_allocation_must_equal_sp_total(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $first = $this->ppbj('PKB/PR-26/CON/9111', 30_000_000);
        $second = $this->ppbj('PKB/PR-26/CON/9112', 20_000_000);

        $payload = [
            'nomor_sp' => '102/PKU-X/SP/2026',
            'tanggal_sp' => '2026-10-20',
            'nilai_sp' => 40_000_000,
            'nomor_pr_type' => 'ppbj',
            'nomor_prs' => [$first->ppbj_no, $second->ppbj_no],
            'nama_vendor' => 'PT Vendor Alokasi',
            'deskripsi_pengadaan' => 'Paket alokasi manual',
            'pic' => $user->name,
            'allocation_mode' => 'manual',
            'allocations' => [
                ['ppbj_no' => $first->ppbj_no, 'value' => 25_000_000],
                ['ppbj_no' => $second->ppbj_no, 'value' => 10_000_000],
            ],
        ];

        $this->actingAs($user)->postJson(route('sp.store'), $payload)
            ->assertStatus(422)
            ->assertJsonValidationErrors('allocations');

        $payload['allocations'][1]['value'] = 15_000_000;
        $this->actingAs($user)->post(route('sp.store'), $payload)->assertRedirect(route('sp.index'));

        $sp = Sp::where('nomor_sp', $payload['nomor_sp'])->firstOrFail();
        $this->assertDatabaseHas('sp_ppbj', [
            'sp_id' => $sp->id,
            'ppbj_id' => $first->id,
            'nilai_alokasi' => 25_000_000,
            'allocation_status' => 'manual',
        ]);
    }

    public function test_archived_document_numbers_remain_reserved(): void
    {
        $sp = Sp::create([
            'nomor_sp' => '001/PKU-X/SP/2026',
            'sequence_number' => 1,
            'numbering_mode' => 'auto',
            'tanggal_sp' => '2026-10-20',
            'nama_vendor' => 'PT Nomor Aman',
            'deskripsi_pengadaan' => 'Nomor SP terarsip',
            'pic' => 'Tester',
        ]);
        $spph = Spph::create([
            'nomor_spph' => '001/PKU-X/SPPH/2026',
            'sequence_number' => 1,
            'tanggal' => '2026-10-20',
            'nama_vendor' => 'PT Nomor Aman',
            'deskripsi_pengadaan' => 'Nomor SPPH terarsip',
            'pic' => 'Tester',
        ]);

        $sp->delete();
        $spph->delete();

        $this->assertSame('002/PKU-X/SP/2026', Sp::previewNextNomor('2026-10-20'));
        $this->assertSame('002/PKU-X/SPPH/2026', Spph::previewNextNomor('2026-10-20'));
    }

    public function test_sp_above_combined_pr_value_cannot_bypass_approval_with_legacy_checkbox(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $ppbj = $this->ppbj('PKB/PR-26/CON/9119', 10_000_000);
        $payload = [
            'nomor_sp' => '109/PKU-X/SP/2026',
            'tanggal_sp' => '2026-10-20',
            'nilai_sp' => 12_000_000,
            'nomor_pr_type' => 'ppbj',
            'nomor_prs' => [$ppbj->ppbj_no],
            'nama_vendor' => 'PT Vendor Konfirmasi',
            'deskripsi_pengadaan' => 'Uji batas nilai',
            'pic' => $user->name,
        ];

        $this->actingAs($user)->postJson(route('sp.store'), $payload)
            ->assertStatus(422)
            ->assertJsonValidationErrors('nilai_sp');

        $payload['allocation_override_confirmed'] = true;
        $this->actingAs($user)->postJson(route('sp.store'), $payload)
            ->assertStatus(422)->assertJsonPath('approval_required', true);
    }

    public function test_archiving_and_restoring_sp_keeps_ppbj_chain_intact(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
            'password' => Hash::make('SafePass!123'),
        ]);
        $ppbj = $this->ppbj('PKB/PR-26/CON/9121', 10_000_000);
        $sp = Sp::create([
            'nomor_sp' => '103/PKU-X/SP/2026',
            'sequence_number' => 103,
            'created_by_user_id' => $user->id,
            'tanggal_sp' => '2026-10-20',
            'nilai_sp' => 9_000_000,
            'nomor_pr' => $ppbj->ppbj_no,
            'nama_vendor' => 'PT Aman',
            'deskripsi_pengadaan' => 'Uji arsip aman',
            'pic' => $user->name,
        ]);
        $sp->ppbjs()->sync([$ppbj->id => ['urutan' => 1, 'nilai_alokasi' => 9_000_000, 'allocation_status' => 'verified']]);
        $ppbj->update(['awarding_sp' => $sp->nomor_sp, 'nilai_sp_spk' => 9_000_000, 'penyedia_eksternal' => $sp->nama_vendor]);

        $this->actingAs($user)->deleteJson(route('sp.destroy', $sp), [
            'creator_password' => 'SafePass!123',
            'archive_reason' => 'Salah penomoran',
        ])->assertOk()->assertJsonPath('archived', true);

        $this->assertSoftDeleted('sps', ['id' => $sp->id]);
        $this->assertDatabaseHas('sp_ppbj', ['sp_id' => $sp->id, 'ppbj_id' => $ppbj->id]);
        $this->assertDatabaseHas('ppbj', ['id' => $ppbj->id, 'awarding_sp' => $sp->nomor_sp, 'nilai_sp_spk' => 9_000_000]);

        $this->actingAs($user)->postJson(route('sp.restore', $sp->id))->assertOk();
        $this->assertNotSoftDeleted('sps', ['id' => $sp->id]);
        $this->assertDatabaseHas('sp_ppbj', ['sp_id' => $sp->id, 'ppbj_id' => $ppbj->id]);
    }

    public function test_force_deleting_archived_spph_keeps_active_sp_and_final_vendor(): void
    {
        $owner = User::factory()->create([
            'name' => 'Nazar',
            'email' => 'owner-lifecycle@example.com',
            'department' => 'umum',
            'role' => 'superadmin',
            'password' => Hash::make('OwnerPass!123'),
        ]);
        config(['app.owner_emails' => [$owner->email]]);

        $ppbj = $this->ppbj('PKB/PR-26/CON/9131', 10_000_000);
        $spph = Spph::create([
            'nomor_spph' => '201/PKU-X/SPPH/2026',
            'sequence_number' => 201,
            'created_by_user_id' => $owner->id,
            'tanggal' => '2026-10-20',
            'nomor_pr' => $ppbj->ppbj_no,
            'nama_vendor' => 'Vendor SPPH',
            'deskripsi_pengadaan' => 'Uji rantai dokumen',
            'pic' => $owner->name,
        ]);
        $sp = Sp::create([
            'nomor_sp' => '104/PKU-X/SP/2026',
            'sequence_number' => 104,
            'created_by_user_id' => $owner->id,
            'tanggal_sp' => '2026-10-20',
            'nilai_sp' => 9_000_000,
            'nomor_pr' => $ppbj->ppbj_no,
            'nama_vendor' => 'Vendor Final SP',
            'deskripsi_pengadaan' => 'SP tetap aktif',
            'pic' => $owner->name,
        ]);
        $spph->ppbjs()->sync([$ppbj->id => ['urutan' => 1]]);
        $sp->ppbjs()->sync([$ppbj->id => ['urutan' => 1, 'nilai_alokasi' => 9_000_000, 'allocation_status' => 'verified']]);
        $ppbj->update([
            'spph_rfq_1' => $spph->nomor_spph,
            'awarding_sp' => $sp->nomor_sp,
            'penyedia_eksternal' => $sp->nama_vendor,
        ]);

        $this->actingAs($owner)->deleteJson(route('spph.destroy', $spph), [
            'creator_password' => 'OwnerPass!123',
        ])->assertOk();

        $this->actingAs($owner)->deleteJson(route('spph.force-destroy', $spph->id), [
            'password' => 'OwnerPass!123',
            'confirmation' => $spph->nomor_spph,
            'acknowledge_downstream' => true,
        ])->assertOk();

        $this->assertDatabaseMissing('spphs', ['id' => $spph->id]);
        $this->assertDatabaseHas('sps', ['id' => $sp->id, 'deleted_at' => null]);
        $this->assertDatabaseHas('ppbj', [
            'id' => $ppbj->id,
            'spph_rfq_1' => null,
            'awarding_sp' => $sp->nomor_sp,
            'penyedia_eksternal' => 'Vendor Final SP',
        ]);
    }

    public function test_multi_vendor_spph_becomes_final_sp_vendor_and_survives_later_edits(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $first = $this->ppbj('PKB/PR-26/CON/9141', 10_000_000);
        $second = $this->ppbj('PKB/PR-26/CON/9142', 10_000_000);
        $numbers = [$first->ppbj_no, $second->ppbj_no];
        // Daftar panjang harus disimpan utuh, tidak dipotong batas VARCHAR lama.
        $vendors = ['PT '.str_repeat('A', 100), 'PT '.str_repeat('B', 100), 'Vendor Final'];
        $spphPayload = [
            'nomor_spph' => '301/PKU-X/SPPH/2026', 'tanggal' => '2026-10-20',
            'nomor_pr_type' => 'ppbj', 'nomor_prs' => $numbers,
            'vendor_names' => $vendors, 'deskripsi_pengadaan' => 'Calon vendor gabungan', 'pic' => $user->name,
        ];
        $this->actingAs($user)->post(route('spph.store'), $spphPayload)->assertRedirect(route('spph.index'));
        foreach ([$first, $second] as $ppbj) {
            $this->assertSame(implode('; ', $vendors), $ppbj->fresh()->penyedia_eksternal);
        }
        $spPayload = [
            'nomor_sp' => '301/PKU-X/SP/2026', 'tanggal_sp' => '2026-10-20', 'nilai_sp' => 18_000_000,
            'nomor_pr_type' => 'ppbj', 'nomor_prs' => $numbers, 'nama_vendor' => 'Vendor Final',
            'deskripsi_pengadaan' => 'Pemenang dipilih', 'pic' => $user->name,
        ];
        $this->actingAs($user)->post(route('sp.store'), $spPayload)->assertRedirect(route('sp.index'));
        foreach ([$first, $second] as $ppbj) {
            $this->assertSame('Vendor Final', $ppbj->fresh()->penyedia_eksternal);
        }
        $spph = Spph::where('nomor_spph', $spphPayload['nomor_spph'])->firstOrFail();
        $spphPayload['vendor_names'][] = 'Vendor Tambahan';
        $this->actingAs($user)->put(route('spph.update', $spph), $spphPayload)->assertRedirect(route('spph.index'));
        foreach ([$first, $second] as $ppbj) {
            $this->assertSame('Vendor Final', $ppbj->fresh()->penyedia_eksternal);
        }
        // Form PPBJ yang dibuka sebelum SP tersimpan dapat mengirim vendor kosong.
        $this->actingAs($user)->putJson(route('ppbj.update', $first->id), [
            'ppbj_no' => $first->ppbj_no, 'uraian' => $first->uraian, 'penyedia_eksternal' => null,
        ])->assertOk();
        $this->assertSame('Vendor Final', $first->fresh()->penyedia_eksternal);
        $sp = Sp::where('nomor_sp', $spPayload['nomor_sp'])->firstOrFail();
        $spPayload['nama_vendor'] = 'Vendor Tambahan';
        $this->actingAs($user)->put(route('sp.update', $sp), $spPayload)->assertRedirect(route('sp.index'));
        foreach ([$first, $second] as $ppbj) {
            $this->assertSame('Vendor Tambahan', $ppbj->fresh()->penyedia_eksternal);
        }
    }

    private function ppbj(string $number, float $value): Ppbj
    {
        return Ppbj::create([
            'ppbj_no' => $number,
            'tgl_ppbj' => '2026-10-20',
            'tgl_terima_pr' => '2026-10-20',
            'uraian' => 'Pengadaan '.$number,
            'status' => 'ACTIVE',
            'total_sebelum_ppn' => $value,
        ]);
    }
}
