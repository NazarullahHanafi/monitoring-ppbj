<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\PrReceiptApproval;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\Torpr;
use App\Models\User;
use App\Services\ProcurementProvenanceService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ProcurementProvenanceTest extends TestCase
{
    use RefreshDatabase;

    private function user(string $name, string $department = 'umum'): User
    {
        return User::factory()->create(['name' => $name, 'department' => $department, 'role' => 'user']);
    }

    private function tor(string $number, User $creator, array $data = []): Torpr
    {
        return Torpr::create($data + ['nomor_pr' => $number, 'created_by_user_id' => $creator->id,
            'tanggal_pr' => '2026-10-29', 'tujuan_pengadaan' => 'Kursi kerja', 'jumlah_pr' => 8000000]);
    }

    private function pr(string $number, User $recorder): Ppbj
    {
        return Ppbj::create(['ppbj_no' => $number, 'tgl_ppbj' => '2026-10-29', 'buyer' => 'Buyer berbeda',
            'created_by_user_id' => $recorder->id, 'general_registered_by_user_id' => $recorder->id,
            'general_registered_at' => '2026-10-30 08:00:00', 'general_registration_number' => 'REG-'.sha1($number)]);
    }

    public function test_quick_detail_distinguishes_actual_creator_signers_requester_receiver_and_ppbj_recorder(): void
    {
        Http::preventStrayRequests();
        $owner = $this->user('Pembuat asli', 'operasional');
        $requester = $this->user('Pengaju berbeda', 'operasional');
        $receiver = $this->user('Penerima Umum');
        $recorder = $this->user('Pencatat PPBJ');
        $tor = $this->tor('PR/PROVENANCE/1', $owner, [
            'signed_by_kabid_name' => 'Pejabat Kabid', 'tgl_ttd_kabid_pr' => '2026-10-29 10:00:00',
            'tgl_ttd_kacab_pr' => '2026-10-29 11:00:00',
            'received_by_umum_user_id' => $receiver->id, 'received_at' => '2026-10-30 08:00:00',
            'sign_token_kabid' => 'NEVER-LEAK-TOKEN',
        ]);
        PrReceiptApproval::create(['torpr_id' => $tor->id, 'requested_by_user_id' => $requester->id,
            'requested_at' => '2026-10-29 12:00:00', 'status' => 'APPROVED',
            'approved_by_user_id' => $receiver->id, 'approved_at' => '2026-10-30 08:00:00']);
        $pr = $this->pr($tor->nomor_pr, $recorder);
        $response = $this->actingAs($receiver)->getJson(route('procurement.quick-detail', ['kind' => 'ppbj', 'id' => $pr->id]))
            ->assertOk()->assertJsonPath('provenance.0.creator', 'Pembuat asli · Operasional')
            ->assertJsonPath('provenance.0.signatures.0.name', 'Pejabat Kabid')
            ->assertJsonPath('provenance.0.signatures.1.name', 'Nama penandatangan belum tercatat')
            ->assertJsonFragment(['label' => 'Pengaju permintaan terakhir', 'value' => 'Pengaju berbeda · Operasional'])
            ->assertJsonFragment(['label' => 'Disetujui oleh', 'value' => 'Penerima Umum · Umum'])
            ->assertJsonFragment(['label' => 'Penerima TOR/PR di Umum', 'value' => 'Penerima Umum · Umum'])
            ->assertJsonFragment(['label' => 'Pencatat PPBJ', 'value' => 'Pencatat PPBJ · Umum']);
        foreach (['NEVER-LEAK-TOKEN', 'sign_token', 'password', $owner->email] as $secret) {
            $this->assertStringNotContainsString($secret, $response->getContent());
        }
        Http::assertNothingSent();
    }

    public function test_latest_approval_not_old_approver_and_missing_signature_dates_are_honest(): void
    {
        $creator = $this->user('Pembuat', 'operasional');
        $umum = $this->user('Pemeriksa');
        $tor = $this->tor('PR/REJECTED', $creator);
        PrReceiptApproval::create(['torpr_id' => $tor->id, 'status' => 'APPROVED', 'approved_by_user_id' => $umum->id]);
        $latest = PrReceiptApproval::create(['torpr_id' => $tor->id, 'status' => 'REJECTED',
            'requested_name' => 'Pengaju lama tanpa akun', 'rejected_by_user_id' => $umum->id,
            'rejected_at' => now(), 'rejected_reason' => '<p>Nilai <b>belum sesuai</b></p>',
            'resubmit_notes' => str_repeat('a', 2500)]);
        $pr = $this->pr($tor->nomor_pr, $umum);
        $result = app(ProcurementProvenanceService::class)->forPrs(collect([$pr]))[0];
        $fields = collect($result['receipt_fields'])->pluck('value', 'label');
        $this->assertSame('Ditolak', $fields['Status permintaan terakhir']);
        $this->assertSame('Nilai belum sesuai', $fields['Alasan penolakan']);
        $this->assertSame('Pengaju lama tanpa akun', $fields['Pengaju permintaan terakhir']);
        $this->assertSame(2000, mb_strlen($fields['Catatan pengajuan ulang terakhir']));
        $this->assertArrayNotHasKey('Disetujui oleh', $fields->all());
        $this->assertSame('Belum tercatat', $fields['Penerima TOR/PR di Umum']);
        $this->assertSame('Tanggal tanda tangan belum tercatat', $result['signatures'][0]['status']);
        $latest->update(['status' => 'PENDING']);
        $fields = collect(app(ProcurementProvenanceService::class)->forPrs(collect([$pr]))[0]['receipt_fields'])->pluck('value', 'label');
        $this->assertSame('Menunggu persetujuan', $fields['Status permintaan terakhir']);
        $this->assertArrayNotHasKey('Ditolak oleh', $fields->all());
    }

    public function test_grouped_documents_batch_provenance_queries_and_show_every_selected_pr_creator(): void
    {
        $umum = $this->user('Pemeriksa');
        $prs = collect();
        for ($i = 1; $i <= 21; $i++) {
            $creator = $this->user('Pembuat '.$i, 'operasional');
            $tor = $this->tor('PR/BATCH/'.$i, $creator);
            PrReceiptApproval::create(['torpr_id' => $tor->id, 'requested_by_user_id' => $creator->id, 'status' => 'PENDING']);
            $prs->push($this->pr($tor->nomor_pr, $umum));
        }
        DB::enableQueryLog();
        DB::flushQueryLog();
        $result = app(ProcurementProvenanceService::class)->forPrs($prs);
        $queries = DB::getQueryLog();
        DB::disableQueryLog();
        $this->assertCount(3, $queries); // TOR batch, latest approval batch, users batch; not per PR.
        $this->assertCount(20, $result);
        $this->assertSame('Pembuat 20 · Operasional', $result[19]['creator']);
        foreach (['sp' => Sp::class, 'spph' => Spph::class] as $kind => $class) {
            $document = $class::create(['sequence_number' => 900, $kind === 'sp' ? 'nomor_sp' : 'nomor_spph' => 'QUICK/'.$kind,
                $kind === 'sp' ? 'tanggal_sp' : 'tanggal' => '2026-10-30', 'nama_vendor' => 'Vendor',
                'deskripsi_pengadaan' => 'Kursi', 'pic' => 'Pemeriksa']);
            $document->ppbjs()->sync($prs->mapWithKeys(fn ($pr, $index) => [$pr->id => ['urutan' => $index + 1]])->all());
            $this->actingAs($umum)->getJson(route('procurement.quick-detail', ['kind' => $kind, 'id' => $document->id]))
                ->assertOk()->assertJsonCount(20, 'provenance')->assertJsonPath('prs_truncated', true)
                ->assertJsonPath('provenance.0.creator', 'Pembuat 1 · Operasional');
        }
    }

    public function test_manual_pr_without_ppbj_and_missing_tor_have_clear_empty_states(): void
    {
        $umum = $this->user('Pemeriksa');
        $creator = $this->user('Pembuat manual', 'operasional');
        $this->tor('MANUAL-ORIGIN', $creator);
        $result = app(ProcurementProvenanceService::class)->forPrs(collect(), 'MANUAL-ORIGIN')[0];
        $this->assertTrue($result['found']);
        $this->assertSame('Pembuat manual · Operasional', $result['creator']);
        $this->assertSame([], $result['management_fields']);
        $pr = $this->pr('DIRECT-PPBJ', $umum);
        $result = app(ProcurementProvenanceService::class)->forPrs(collect([$pr]))[0];
        $this->assertFalse($result['found']);
        $this->assertSame([], $result['signatures']);
        $this->assertStringContainsString('Data TOR/PR asal belum ditemukan', $result['notice']);
        $this->assertSame([], app(ProcurementProvenanceService::class)->forPrs(collect()));
    }

    public function test_provenance_cache_fresh_and_ttl_pick_up_related_changes_without_background_requests(): void
    {
        $umum = $this->user('Pemeriksa');
        $tor = $this->tor('PR/CACHED-ORIGIN', $umum);
        $pr = $this->pr($tor->nomor_pr, $umum);
        $url = route('procurement.quick-detail', ['kind' => 'ppbj', 'id' => $pr->id]);
        $this->actingAs($umum)->getJson($url)->assertOk();
        DB::enableQueryLog();
        DB::flushQueryLog();
        $this->getJson($url)->assertOk();
        $queries = DB::getQueryLog();
        DB::disableQueryLog();
        $this->assertCount(0, collect($queries)->filter(fn ($query) => str_contains($query['query'], 'from "torprs"')));
        $tor->update(['signed_by_kabid_name' => 'Nama terbaru', 'tgl_ttd_kabid_pr' => now()]);
        $this->getJson($url)->assertJsonPath('provenance.0.signatures.0.name', 'Nama penandatangan belum tercatat');
        $this->getJson($url.'?fresh=1')->assertJsonPath('provenance.0.signatures.0.name', 'Nama terbaru');
        $tor->update(['signed_by_kabid_name' => 'Setelah TTL']);
        $this->travel(21)->seconds();
        $this->getJson($url)->assertJsonPath('provenance.0.signatures.0.name', 'Setelah TTL');
        $this->actingAs($this->user('Operasional', 'operasional'))->getJson($url)->assertForbidden();
    }
}
