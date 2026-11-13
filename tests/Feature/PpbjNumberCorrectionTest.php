<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\PrReceiptApproval;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\Torpr;
use App\Models\User;
use App\Services\PrNumberConflictService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class PpbjNumberCorrectionTest extends TestCase
{
    use RefreshDatabase;

    private const OLD = 'PKB/PR-26/CON/0799';

    private const CORRECT = 'PKB/PR-25/CON/0799';

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']));
    }

    private function sp(string $number, string $pr = self::OLD): Sp
    {
        return Sp::create(['nomor_sp' => $number, 'sequence_number' => 1,
            'nomor_pr' => $pr, 'nama_vendor' => 'Vendor', 'deskripsi_pengadaan' => 'Kasur lama', 'pic' => 'Yoga', 'nilai_sp' => 6000000]);
    }

    private function spph(string $number, string $pr = self::OLD): Spph
    {
        return Spph::create(['nomor_spph' => $number, 'sequence_number' => 1, 'tanggal' => '2026-01-10',
            'nomor_pr' => $pr, 'nama_vendor' => 'Vendor', 'deskripsi_pengadaan' => 'Kasur lama', 'pic' => 'Yoga']);
    }

    public function test_correcting_the_old_ppbj_also_corrects_its_sp_and_removes_the_false_new_pr_conflict(): void
    {
        $sp = $this->sp('122/PKU-III/SP/2026');
        $spph = $this->spph('031/PKU-I/SPPH/2026', self::CORRECT);
        $ppbj = Ppbj::create(['ppbj_no' => self::OLD, 'uraian' => 'Kasur lama', 'buyer' => 'Yoga',
            'total_sebelum_ppn' => 6000000, 'awarding_sp' => $sp->nomor_sp, 'spph_rfq_1' => $spph->nomor_spph]);
        $ppbj->sps()->attach($sp, ['urutan' => 1, 'nilai_alokasi' => 6000000, 'allocation_status' => 'verified']);
        $creator = User::factory()->create(['department' => 'operasional']);
        $torpr = Torpr::create(['nomor_pr' => self::OLD, 'tujuan_pengadaan' => 'Jasa fasilitator baru', 'jumlah_pr' => 166053500, 'created_by_user_id' => $creator->id]);
        $approval = PrReceiptApproval::create(['torpr_id' => $torpr->id, 'status' => 'PENDING', 'requested_at' => now(), 'requested_by_user_id' => $creator->id]);
        $service = app(PrNumberConflictService::class);
        $this->assertTrue($service->inspect(self::OLD, $torpr->id, $approval->id)['has_conflicts']);
        $before = $sp->fresh()->getAttributes();
        $links = DB::table('sp_ppbj')->get()->toArray();
        Cache::put('torpr_json_'.$torpr->id.'_v2', ['stale' => true], 300);
        foreach ([self::OLD, self::CORRECT] as $number) {
            Cache::put('tracking_pr_'.md5(strtolower($number)).'_v10', ['stale' => true], 300);
        }

        $this->putJson(route('ppbj.update', $ppbj), ['ppbj_no' => self::CORRECT, 'uraian' => 'Kasur lama'])->assertOk();

        $this->assertSame(self::CORRECT, $sp->fresh()->nomor_pr);
        $this->assertSame(self::CORRECT, $spph->fresh()->nomor_pr);
        foreach ($before as $field => $value) {
            if (! in_array($field, ['nomor_pr', 'updated_at'], true)) {
                $this->assertSame($value, $sp->fresh()->getRawOriginal($field), $field);
            }
        }
        $this->assertEquals($links, DB::table('sp_ppbj')->get()->toArray());
        $this->assertFalse($service->inspect(self::OLD, $torpr->id, $approval->id)['has_conflicts']);
        $this->assertSame(self::OLD, $torpr->fresh()->nomor_pr);
        $this->assertSame('PENDING', $approval->fresh()->status);
        $this->assertFalse(Cache::has('torpr_json_'.$torpr->id.'_v2'));
        foreach ([self::OLD, self::CORRECT] as $number) {
            $this->assertFalse(Cache::has('tracking_pr_'.md5(strtolower($number)).'_v10'));
        }
        $this->assertDatabaseHas('activity_logs', ['model_id' => $ppbj->id, 'action' => 'pr_number_corrected']);
    }

    public function test_explicit_legacy_document_references_are_updated(): void
    {
        $sp = $this->sp('LEGACY/SP');
        $spph = $this->spph('LEGACY/SPPH');
        $ppbj = Ppbj::create(['ppbj_no' => self::OLD, 'awarding_sp' => $sp->nomor_sp, 'spph_rfq_1' => $spph->nomor_spph]);
        $this->putJson(route('ppbj.update', $ppbj), ['ppbj_no' => self::CORRECT])->assertOk();
        $this->assertSame(self::CORRECT, $sp->fresh()->nomor_pr);
        $this->assertSame(self::CORRECT, $spph->fresh()->nomor_pr);
    }

    public function test_unrelated_equal_numbers_are_not_changed_without_an_explicit_document_link(): void
    {
        $ppbj = Ppbj::create(['ppbj_no' => self::OLD]);
        $unrelated = $this->sp('UNRELATED/SP');
        $unrelatedSpph = $this->spph('UNRELATED/SPPH');
        $this->putJson(route('ppbj.update', $ppbj), ['ppbj_no' => self::CORRECT])->assertOk();
        $this->assertSame(self::OLD, $unrelated->fresh()->nomor_pr);
        $this->assertSame(self::OLD, $unrelatedSpph->fresh()->nomor_pr);
    }

    public function test_multi_pr_documents_preserve_all_allocation_links_when_primary_number_changes(): void
    {
        $ppbj = Ppbj::create(['ppbj_no' => self::OLD]);
        $other = Ppbj::create(['ppbj_no' => 'OTHER/PR']);
        $first = $this->sp('PRIMARY/OLD');
        $first->ppbjs()->attach($ppbj, ['urutan' => 1, 'nilai_alokasi' => 2000000, 'allocation_status' => 'verified']);
        $first->ppbjs()->attach($other, ['urutan' => 2, 'nilai_alokasi' => 4000000, 'allocation_status' => 'verified']);
        $before = DB::table('sp_ppbj')->orderBy('id')->get()->toArray();
        $this->putJson(route('ppbj.update', $ppbj), ['ppbj_no' => self::CORRECT])->assertOk();
        $this->assertSame(self::CORRECT, $first->fresh()->nomor_pr);
        $this->assertEquals($before, DB::table('sp_ppbj')->orderBy('id')->get()->toArray());
    }

    public function test_correcting_a_secondary_pr_keeps_the_document_primary_number(): void
    {
        $ppbj = Ppbj::create(['ppbj_no' => self::OLD]);
        $other = Ppbj::create(['ppbj_no' => 'OTHER/PR']);
        $sp = $this->sp('PRIMARY/OTHER', 'OTHER/PR');
        $sp->ppbjs()->attach($other, ['urutan' => 1, 'nilai_alokasi' => 4000000, 'allocation_status' => 'verified']);
        $sp->ppbjs()->attach($ppbj, ['urutan' => 2, 'nilai_alokasi' => 2000000, 'allocation_status' => 'verified']);
        $before = DB::table('sp_ppbj')->orderBy('id')->get()->toArray();
        $this->putJson(route('ppbj.update', $ppbj), ['ppbj_no' => self::CORRECT])->assertOk();
        $this->assertSame('OTHER/PR', $sp->fresh()->nomor_pr);
        $this->assertEquals($before, DB::table('sp_ppbj')->orderBy('id')->get()->toArray());
    }

    public function test_a_linked_document_failure_rolls_back_the_ppbj_number_and_all_previous_updates(): void
    {
        $sp = $this->sp('ROLLBACK/SP');
        $spph = $this->spph('ROLLBACK/SPPH');
        $ppbj = Ppbj::create(['ppbj_no' => self::OLD, 'awarding_sp' => $sp->nomor_sp, 'spph_rfq_1' => $spph->nomor_spph]);
        DB::unprepared("CREATE TEMP TRIGGER refuse_spph_rename BEFORE UPDATE OF nomor_pr ON spphs BEGIN SELECT RAISE(ABORT, 'Simulated failure'); END");
        try {
            $this->putJson(route('ppbj.update', $ppbj), ['ppbj_no' => self::CORRECT])->assertUnprocessable();
            $this->assertSame(self::OLD, $ppbj->fresh()->ppbj_no);
            $this->assertSame(self::OLD, $sp->fresh()->nomor_pr);
            $this->assertSame(self::OLD, $spph->fresh()->nomor_pr);
            $this->assertDatabaseMissing('activity_logs', ['model_id' => $ppbj->id, 'action' => 'pr_number_corrected']);
        } finally {
            DB::unprepared('DROP TRIGGER refuse_spph_rename');
        }
    }

    public function test_unchanged_numbers_do_not_scan_documents_and_readonly_users_cannot_renumber(): void
    {
        $ppbj = Ppbj::create(['ppbj_no' => self::OLD]);
        DB::flushQueryLog();
        DB::enableQueryLog();
        $this->putJson(route('ppbj.update', $ppbj), ['ppbj_no' => self::OLD, 'uraian' => 'Updated description'])->assertOk();
        $queries = DB::getQueryLog();
        DB::disableQueryLog();
        foreach ($queries as $query) {
            $this->assertDoesNotMatchRegularExpression('/from "(?:sps|spphs|sp_ppbj|spph_ppbj)"/', $query['query']);
        }
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'viewer']));
        $this->putJson(route('ppbj.update', $ppbj), ['ppbj_no' => self::CORRECT])->assertForbidden();
        $this->assertSame(self::OLD, $ppbj->fresh()->ppbj_no);
    }
}
