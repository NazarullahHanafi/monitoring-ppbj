<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\PrReceiptApproval;
use App\Models\Torpr;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class TorprQuickDetailTest extends TestCase
{
    use RefreshDatabase;

    private function ops(array $attributes = []): User
    {
        return User::factory()->create($attributes + ['department' => 'operasional', 'role' => 'user']);
    }

    private function tor(User $creator, array $attributes = []): Torpr
    {
        return Torpr::create($attributes + ['nomor_pr' => 'PR/OPS/QUICK', 'created_by_user_id' => $creator->id,
            'tujuan_pengadaan' => 'Kursi kerja', 'tanggal_pr' => '2026-10-30', 'portofolio' => 'LAB', 'jumlah_pr' => 8000000]);
    }

    private function url(Torpr $tor): string
    {
        return route('torpr.quick-detail', $tor->id);
    }

    public function test_operasional_can_read_a_colleagues_pr_progress_without_umum_admin_access_or_secret_fields(): void
    {
        Http::preventStrayRequests();
        $creator = $this->ops(['name' => 'Pembuat asli']);
        $viewer = $this->ops();
        $tor = $this->tor($creator, ['tgl_ttd_kabid_pr' => now(), 'tgl_ttd_kacab_pr' => now(),
            'signed_by_kabid_name' => 'Pejabat A', 'sign_token_kabid' => 'SECRET-SIGN-TOKEN', 'received_at' => now()]);
        $pr = Ppbj::create(['ppbj_no' => $tor->nomor_pr, 'tgl_ppbj' => '2026-10-30', 'tgl_terima_pr' => '2026-10-30',
            'buyer' => 'Umum PIC', 'penyedia_eksternal' => 'Vendor', 'spph_rfq_1' => 'SPPH/1',
            'awarding_sp' => 'SP/1', 'tgl_spk' => '2026-10-30', 'total_sebelum_ppn' => 8000000,
            'do_no' => 'DO/1', 'do_date' => '2026-10-30', 'bpg_no' => 'BPG/1', 'tgl_bpg' => '2026-10-30',
            'no_invoice' => 'INV/1', 'tgl_invoice' => '2026-10-30', 'note' => 'INTERNAL-NOTE-NOT-FOR-NEW-PANEL']);
        $response = $this->actingAs($viewer)->getJson($this->url($tor))->assertOk()
            ->assertJsonPath('kind', 'torpr')->assertJsonPath('provenance.0.creator', 'Pembuat asli · Operasional')
            ->assertJsonPath('summary_fields.0.value', 'Invoice tercatat')->assertJsonCount(13, 'stages')
            ->assertJsonFragment(['label' => 'Buyer / PIC Umum', 'value' => 'Umum PIC'])
            ->assertJsonFragment(['reference' => 'INV/1', 'done' => true, 'label' => 'Invoice', 'date_label' => '30 Oct 2026 00:00 WIB']);
        foreach (['SECRET-SIGN-TOKEN', 'sign_token', 'archive_url', 'download_gateway_url', 'INTERNAL-NOTE-NOT-FOR-NEW-PANEL', $creator->email] as $secret) {
            $this->assertStringNotContainsString($secret, $response->getContent());
        }
        $this->assertStringContainsString('bukan bukti pembayaran', $response->json('copy_summary'));
        $this->getJson(route('procurement.quick-detail', ['kind' => 'ppbj', 'id' => $pr->id]))->assertForbidden();
        $this->get(route('ppbj.index'))->assertForbidden();
        $this->assertDatabaseCount('ppbj', 1);
        $this->assertDatabaseCount('pr_receipt_approvals', 0);
        Http::assertNothingSent();
    }

    public function test_access_is_checked_before_cache_and_guest_umum_inactive_and_missing_records_are_denied(): void
    {
        $creator = $this->ops();
        $tor = $this->tor($creator);
        $this->getJson($this->url($tor))->assertUnauthorized();
        $this->actingAs($creator)->getJson($this->url($tor))->assertOk();
        $this->actingAs($this->ops(['department' => 'umum']))->getJson($this->url($tor))->assertForbidden();
        $this->actingAs($this->ops(['is_active' => false]))->getJson($this->url($tor))->assertStatus(423);
        $this->actingAs($creator)->getJson(route('torpr.quick-detail', 999999))->assertNotFound();
        $tor->delete();
        $this->getJson($this->url($tor))->assertNotFound();
    }

    public function test_no_ppbj_pending_rejection_and_missing_number_have_honest_next_actions(): void
    {
        $ops = $this->ops();
        $this->actingAs($ops);
        $tor = $this->tor($ops);
        $this->getJson($this->url($tor))->assertJsonPath('summary_fields.0.value', 'Menunggu tanda tangan Kabid')
            ->assertJsonFragment(['label' => 'Terhubung ke Management PPBJ', 'value' => 'Belum ditemukan untuk nomor PR ini']);
        $approval = PrReceiptApproval::create(['torpr_id' => $tor->id, 'status' => 'PENDING', 'requested_at' => now()]);
        $this->getJson($this->url($tor).'?fresh=1')->assertJsonPath('summary_fields.0.value', 'Menunggu pemeriksaan Umum');
        $approval->update(['status' => 'REJECTED', 'rejected_reason' => '<b>Perbaiki nilai</b>']);
        $this->getJson($this->url($tor).'?fresh=1')->assertJsonPath('summary_fields.0.value', 'Pengajuan terakhir ditolak')
            ->assertJsonFragment(['label' => 'Alasan penolakan', 'value' => 'Perbaiki nilai']);
        $approval->update(['status' => 'APPROVED', 'approved_at' => now()]);
        $this->getJson($this->url($tor).'?fresh=1')->assertJsonPath('summary_fields.0.value', 'Diterima Umum')
            ->assertJsonPath('summary_fields.2.value', 'Persetujuan tercatat, tetapi PPBJ belum ditemukan. Minta Umum memeriksa keterhubungan nomor PR.');
        $draft = $this->tor($ops, ['nomor_pr' => null]);
        $this->getJson($this->url($draft))->assertOk()->assertJsonPath('tracking_url', null)
            ->assertJsonPath('summary_fields.0.value', 'Data PR perlu dilengkapi');
    }

    public function test_partial_handover_is_not_marked_complete_and_cancelled_pr_does_not_appear_finished(): void
    {
        $ops = $this->ops();
        $tor = $this->tor($ops, ['received_at' => now()]);
        $pr = Ppbj::create(['ppbj_no' => $tor->nomor_pr, 'tgl_ppbj' => '2026-10-30', 'do_no' => 'DO-NO-DATE',
            'awarding_sp' => 'SP/123']);
        $response = $this->actingAs($ops)->getJson($this->url($tor))->assertOk()
            ->assertJsonPath('summary_fields.0.value', 'SP / Kontrak tercatat');
        $handover = collect($response->json('stages'))->firstWhere('label', 'DO / Surat Jalan / BAST');
        $this->assertFalse($handover['done']);
        $this->assertSame('DO-NO-DATE', $handover['reference']);
        $pr->update(['status' => 'CANCELLED', 'no_invoice' => 'OLD-INVOICE']);
        $this->getJson($this->url($tor).'?fresh=1')->assertJsonPath('summary_fields.0.value', 'Dibatalkan');
    }

    public function test_cold_queries_are_bounded_and_warm_cache_only_checks_record_existence_then_fresh_picks_up_ppbj_changes(): void
    {
        $ops = $this->ops();
        $tor = $this->tor($ops);
        $pr = Ppbj::create(['ppbj_no' => $tor->nomor_pr, 'tgl_ppbj' => '2026-10-30']);
        $this->actingAs($ops);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $this->getJson($this->url($tor))->assertOk();
        $queries = collect(DB::getQueryLog());
        // Middleware may perform its own checks. These are the only detail/business lookups.
        $this->assertCount(1, $queries->filter(fn ($q) => str_contains($q['query'], 'from "torprs"')));
        $this->assertCount(1, $queries->filter(fn ($q) => str_contains($q['query'], 'from "ppbj"')));
        $this->assertCount(1, $queries->filter(fn ($q) => str_contains($q['query'], 'from "pr_receipt_approvals"')));
        DB::flushQueryLog();
        $this->getJson($this->url($tor))->assertOk();
        $this->assertCount(0, collect(DB::getQueryLog())->filter(fn ($q) => str_contains($q['query'], 'from "ppbj"')));
        DB::disableQueryLog();
        $pr->update(['spph_rfq_1' => 'NEW-SPPH']);
        $this->getJson($this->url($tor))->assertJsonPath('summary_fields.0.value', 'Menunggu tanda tangan Kabid');
        $this->getJson($this->url($tor).'?fresh=1')->assertJsonPath('summary_fields.0.value', 'SPPH / RFQ tercatat');
        $pr->update(['awarding_sp' => 'NEW-SP']);
        $this->travel(21)->seconds();
        $this->getJson($this->url($tor))->assertJsonPath('summary_fields.0.value', 'SP / Kontrak tercatat');
    }

    public function test_torpr_table_has_compact_registration_and_shared_detail_panel_but_no_general_workspace_settings(): void
    {
        $ops = $this->ops();
        $tor = $this->tor($ops);
        Ppbj::create(['ppbj_no' => $tor->nomor_pr, 'tgl_ppbj' => '2026-10-30', 'general_registration_number' => 'REG-UMUM/2026/999']);
        $this->actingAs($ops)->get(route('torpr.index'))->assertOk()->assertSee('data-ws-kind="torpr"', false)
            ->assertSee('torpr-reg-badge', false)->assertSee('Salin registrasi Umum REG-UMUM/2026/999')
            ->assertSee('procurement-workspace.js')->assertSee('id="wsDialog"', false)->assertDontSee('Atur tampilan');
        $css = file_get_contents(public_path('assets/torpr/torpr.css'));
        $this->assertStringContainsString('.dark .torpr-page .torpr-reg-badge', $css);
        $this->assertStringContainsString('white-space:nowrap', $css);
    }
}
