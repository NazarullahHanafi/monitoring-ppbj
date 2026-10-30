<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\SpValueApproval;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ProcurementReviewTest extends TestCase
{
    use RefreshDatabase;

    private function user(array $attributes = []): User
    {
        return User::factory()->create(array_merge(['department' => 'umum', 'role' => 'user'], $attributes));
    }

    private function pr(string $suffix = '9201', float $value = 10_000_000): Ppbj
    {
        return Ppbj::create(['ppbj_no' => 'PKB/PR-26/CON/'.$suffix, 'tgl_ppbj' => '2026-10-20',
            'tgl_terima_pr' => '2026-10-20', 'uraian' => 'Pengadaan uji', 'status' => 'ACTIVE', 'total_sebelum_ppn' => $value]);
    }

    private function payload(User $user, Ppbj $pr): array
    {
        return ['nomor_sp' => '901/PKU-X/SP/2026', 'tanggal_sp' => '2026-10-20',
            'nilai_sp' => 12_000_000, 'nilai_pr' => 999_000_000, 'nomor_pr_type' => 'ppbj',
            'nomor_prs' => [$pr->ppbj_no], 'nama_vendor' => 'PT Vendor Aman',
            'deskripsi_pengadaan' => 'Pengadaan dengan peninjauan nilai', 'pic' => $user->name];
    }

    private function requestApproval(User $user, array $payload, ?Sp $sp = null): SpValueApproval
    {
        $this->actingAs($user)->postJson(route('sp.value-approvals.request', $sp ? ['id' => $sp->id] : []),
            $payload + ['reason' => 'Perubahan spesifikasi telah diperiksa dan disepakati.'])->assertOk();

        return SpValueApproval::latest('id')->firstOrFail();
    }

    private function approve(User $reviewer, SpValueApproval $approval): void
    {
        $this->actingAs($reviewer)->post(route('sp.value-approvals.decide', $approval),
            ['decision' => 'approved', 'decision_note' => 'Dasar selisih dan alokasi telah diverifikasi.'])->assertRedirect();
    }

    public function test_umum_non_admin_can_review_but_no_self_approval_and_approval_is_consumed_once(): void
    {
        $requester = $this->user();
        $reviewer = $this->user();
        $pr = $this->pr();
        $payload = $this->payload($requester, $pr);
        $approval = $this->requestApproval($requester, $payload);
        $this->assertSame(10_000_000.0, $approval->snapshot['nilai_pr'] + 0.0);
        $this->assertDatabaseHas('activity_logs', ['action' => 'value_approval_requested', 'model_id' => $approval->id]);
        $this->actingAs($requester)->postJson(route('sp.value-approvals.decide', $approval),
            ['decision' => 'approved', 'decision_note' => 'Saya setuju sendiri'])->assertForbidden();
        $this->approve($reviewer, $approval);
        $this->actingAs($requester)->postJson(route('procurement.review', ['kind' => 'sp']),
            $payload + ['action' => 'save'])->assertOk()->assertJsonPath('approved', true);
        $this->actingAs($requester)->postJson(route('sp.store'), $payload)->assertOk();
        $this->assertSame('consumed', $approval->fresh()->status);
        $this->assertDatabaseHas('ppbj', ['id' => $pr->id, 'nilai_sp_spk' => 12_000_000, 'penyedia_eksternal' => 'PT Vendor Aman']);
        $this->assertDatabaseHas('activity_logs', ['action' => 'value_approval_consumed', 'model_id' => $approval->id]);
        $sp = Sp::firstOrFail();
        $this->actingAs($requester)->putJson(route('sp.update', $sp), $payload)
            ->assertStatus(422)->assertJsonPath('approval_required', true);
        $this->actingAs($reviewer)->postJson(route('sp.value-approvals.decide', $approval),
            ['decision' => 'approved', 'decision_note' => 'Ulangi keputusan'])->assertStatus(409);
    }

    public function test_package_value_is_summed_and_preview_is_read_only(): void
    {
        $user = $this->user();
        $first = $this->pr();
        $second = $this->pr('9202', 20_000_000);
        $payload = $this->payload($user, $first);
        $payload['nomor_prs'][] = $second->ppbj_no;
        $payload['nilai_sp'] = 27_000_000;
        DB::enableQueryLog();
        $response = $this->actingAs($user)->postJson(route('procurement.review', ['kind' => 'sp']), $payload + ['action' => 'save']);
        $queries = DB::getQueryLog();
        DB::disableQueryLog();
        $response->assertOk()->assertJsonPath('nilai_pr', 30_000_000)->assertJsonPath('requires_approval', false)
            ->assertJsonPath('prs.0.alokasi', 9_000_000)->assertJsonPath('prs.1.alokasi', 18_000_000);
        $this->assertLessThanOrEqual(2, collect($queries)->filter(fn ($q) => str_contains($q['query'], 'from "ppbj"'))->count());
        $this->assertDatabaseCount('sps', 0);
        $this->assertDatabaseCount('sp_value_approvals', 0);
        $this->assertNull($first->fresh()->awarding_sp);
    }

    public function test_approval_rejects_changed_vendor_value_items_allocation_and_database_pr_value(): void
    {
        $user = $this->user();
        $reviewer = $this->user();
        $pr = $this->pr();
        $payload = $this->payload($user, $pr);
        $approval = $this->requestApproval($user, $payload);
        $this->approve($reviewer, $approval);
        foreach ([['nama_vendor' => 'Vendor diganti'], ['nilai_sp' => 13_000_000],
            ['items' => [['nama_barang' => 'Item diganti', 'jumlah' => '1', 'harga_satuan' => '12000000']]],
            ['deskripsi_pengadaan' => 'Spesifikasi diganti']] as $change) {
            $this->actingAs($user)->postJson(route('sp.store'), array_replace($payload, $change))
                ->assertStatus(422)->assertJsonPath('approval_required', true);
        }
        $pr->update(['total_sebelum_ppn' => 9_000_000]);
        $this->actingAs($user)->postJson(route('sp.store'), $payload)->assertStatus(422)->assertJsonPath('approval_required', true);
        $this->assertSame('approved', $approval->fresh()->status);
        $this->assertDatabaseCount('sps', 0);
    }

    public function test_pending_rejected_expired_and_other_requester_approval_cannot_save_sp(): void
    {
        $user = $this->user();
        $reviewer = $this->user();
        $pr = $this->pr();
        $payload = $this->payload($user, $pr);
        $approval = $this->requestApproval($user, $payload);
        $this->actingAs($user)->postJson(route('sp.store'), $payload + ['allocation_override_confirmed' => true])->assertStatus(422);
        $this->actingAs($reviewer)->post(route('sp.value-approvals.decide', $approval),
            ['decision' => 'rejected', 'decision_note' => 'Perlu rincian tambahan'])->assertRedirect();
        $this->actingAs($user)->postJson(route('sp.store'), $payload)->assertStatus(422);
        $approval = $this->requestApproval($user, $payload);
        $this->approve($reviewer, $approval);
        $this->actingAs($reviewer)->postJson(route('sp.store'), $payload)->assertStatus(422);
        $approval->update(['expires_at' => now()->subMinute()]);
        $this->actingAs($user)->postJson(route('sp.store'), $payload)->assertStatus(422);
        $this->assertDatabaseCount('sps', 0);
    }

    public function test_operasional_and_viewer_cannot_request_or_decide_and_regular_umum_can_view_list(): void
    {
        $user = $this->user();
        $pr = $this->pr();
        $payload = $this->payload($user, $pr);
        $approval = $this->requestApproval($user, $payload);
        foreach ([$this->user(['department' => 'operasional']), $this->user(['role' => 'viewer'])] as $blocked) {
            $this->actingAs($blocked)->postJson(route('sp.value-approvals.request'), $payload + ['reason' => 'Alasan pengajuan cukup panjang'])->assertForbidden();
            $this->actingAs($blocked)->postJson(route('sp.value-approvals.decide', $approval),
                ['decision' => 'approved', 'decision_note' => 'Mencoba setuju'])->assertForbidden();
        }
        $this->actingAs($user)->get(route('sp.value-approvals'))->assertOk()->assertSee('PT Vendor Aman');
    }

    public function test_approval_required_for_zero_pr_budget_and_cannot_switch_known_pr_to_manual(): void
    {
        $user = $this->user();
        $pr = $this->pr();
        DB::table('ppbj')->where('id', $pr->id)->update(['total_sebelum_ppn' => 0]);
        $payload = $this->payload($user, $pr);
        $this->actingAs($user)->postJson(route('sp.store'), $payload)->assertStatus(422)->assertJsonPath('approval_required', true);
        $payload['nomor_pr_type'] = 'manual';
        $payload['nomor_pr'] = $pr->ppbj_no;
        $this->actingAs($user)->postJson(route('sp.store'), $payload)->assertStatus(422)->assertJsonValidationErrors('nomor_pr');
    }

    public function test_new_vendor_is_not_created_when_approval_is_missing(): void
    {
        $user = $this->user();
        $pr = $this->pr();
        $payload = $this->payload($user, $pr);
        $payload['vendor_baru'] = 'PT Tidak Boleh Tercipta';
        $this->actingAs($user)->postJson(route('sp.store'), $payload)->assertStatus(422);
        $this->assertDatabaseMissing('vendors', ['nama_vendor' => $payload['vendor_baru']]);
    }

    public function test_edit_requires_new_snapshot_and_can_use_approved_edit(): void
    {
        $user = $this->user();
        $reviewer = $this->user();
        $pr = $this->pr();
        $payload = $this->payload($user, $pr);
        $payload['nilai_sp'] = 9_000_000;
        $this->actingAs($user)->postJson(route('sp.store'), $payload)->assertOk();
        $sp = Sp::firstOrFail();
        $payload['nilai_sp'] = 12_000_000;
        $approval = $this->requestApproval($user, $payload, $sp);
        $this->approve($reviewer, $approval);
        $this->actingAs($user)->putJson(route('sp.update', $sp), $payload)->assertOk();
        $this->assertSame('consumed', $approval->fresh()->status);
        $this->assertSame('12000000.00', $sp->fresh()->nilai_sp);
    }

    public function test_spph_preview_explains_candidate_vendors_and_preserves_final_sp_without_writes(): void
    {
        $user = $this->user();
        $pr = $this->pr();
        $pr->update(['awarding_sp' => '901/PKU-X/SP/2026', 'penyedia_eksternal' => 'PT Final SP']);
        $this->actingAs($user)->postJson(route('procurement.review', ['kind' => 'spph']), [
            'action' => 'save', 'nomor_spph' => '901/PKU-X/SPPH/2026', 'nomor_prs' => [$pr->ppbj_no],
            'vendor_names' => ['PT Kandidat A', 'PT Kandidat B'],
        ])->assertOk()->assertJsonPath('vendor', 'PT Kandidat A · PT Kandidat B')->assertJsonPath('prs.0.vendor_final', 'PT Final SP');
        $this->assertDatabaseCount('spphs', 0);
        $this->assertSame('PT Final SP', $pr->fresh()->penyedia_eksternal);
    }

    public function test_delete_preview_keeps_data_and_does_not_replace_password_gate(): void
    {
        $user = $this->user();
        $pr = $this->pr();
        $payload = $this->payload($user, $pr);
        $payload['nilai_sp'] = 9_000_000;
        $this->actingAs($user)->postJson(route('sp.store'), $payload)->assertOk();
        $sp = Sp::firstOrFail();
        $this->actingAs($user)->postJson(route('procurement.review', ['kind' => 'sp', 'id' => $sp->id]), ['action' => 'delete'])
            ->assertOk()->assertJsonPath('prs.0.nomor', $pr->ppbj_no);
        $this->assertNotSoftDeleted('sps', ['id' => $sp->id]);
        $this->actingAs($user)->deleteJson(route('sp.destroy', $sp))->assertStatus(422)->assertJsonValidationErrors('creator_password');
    }

    public function test_grouped_manual_allocation_changes_invalidate_approval(): void
    {
        $user = $this->user();
        $reviewer = $this->user();
        $first = $this->pr('9201', 5_000_000);
        $second = $this->pr('9202', 5_000_000);
        $payload = $this->payload($user, $first);
        $payload['nomor_prs'][] = $second->ppbj_no;
        $payload['allocation_mode'] = 'manual';
        $payload['allocations'] = [
            ['ppbj_no' => $first->ppbj_no, 'value' => 6_000_000],
            ['ppbj_no' => $second->ppbj_no, 'value' => 6_000_000],
        ];
        $approval = $this->requestApproval($user, $payload);
        $this->approve($reviewer, $approval);
        $changed = $payload;
        $changed['allocations'][0]['value'] = 7_000_000;
        $changed['allocations'][1]['value'] = 5_000_000;
        $this->actingAs($user)->postJson(route('sp.store'), $changed)->assertStatus(422)->assertJsonPath('approval_required', true);
        $this->actingAs($user)->postJson(route('sp.store'), $payload)->assertOk();
        $this->assertDatabaseHas('ppbj', ['id' => $second->id, 'nilai_sp_spk' => 6_000_000]);
    }

    public function test_failed_sp_insert_rolls_back_approval_consumption_and_audit(): void
    {
        $user = $this->user();
        $reviewer = $this->user();
        $pr = $this->pr();
        $payload = $this->payload($user, $pr);
        $approval = $this->requestApproval($user, $payload);
        $this->approve($reviewer, $approval);
        DB::unprepared("CREATE TRIGGER reject_sp BEFORE INSERT ON sps BEGIN SELECT RAISE(ABORT, 'test insert failure'); END");
        $this->actingAs($user)->postJson(route('sp.store'), $payload)->assertStatus(409);
        $this->assertSame('approved', $approval->fresh()->status);
        $this->assertDatabaseMissing('activity_logs', ['action' => 'value_approval_consumed', 'model_id' => $approval->id]);
        $this->assertNull($pr->fresh()->awarding_sp);
    }

    public function test_preview_is_bounded_and_other_users_cannot_preview_an_edit(): void
    {
        $user = $this->user();
        $pr = $this->pr();
        $payload = $this->payload($user, $pr);
        $bad = $payload;
        $bad['nomor_prs'] = array_fill(0, 21, $pr->ppbj_no);
        $this->actingAs($user)->postJson(route('procurement.review', ['kind' => 'sp']), $bad + ['action' => 'save'])
            ->assertStatus(422)->assertJsonValidationErrors('nomor_prs');
        $payload['nilai_sp'] = 9_000_000;
        $this->actingAs($user)->postJson(route('sp.store'), $payload)->assertOk();
        $sp = Sp::firstOrFail();
        $this->actingAs($this->user())->postJson(route('procurement.review', ['kind' => 'sp', 'id' => $sp->id]),
            $payload + ['action' => 'save'])->assertForbidden();
    }
}
