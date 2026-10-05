<?php

namespace Tests\Feature;

use App\Http\Controllers\CommandCenterController;
use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class CommandCenterTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);
    }

    public function test_command_center_page_and_overview_are_available_for_umum(): void
    {
        $this->makePpbj('PKB/PR-26/CON/0901', 50_000_000, 47_500_000);

        $this->actingAs($this->user)
            ->get(route('command-center.index'))
            ->assertOk()
            ->assertSee('Command Center')
            ->assertSee('Tanya SIMONPR');

        $this->actingAs($this->user)
            ->getJson(route('command-center.overview'))
            ->assertOk()
            ->assertJsonPath('stats.total', 1)
            ->assertJsonPath('stats.total_pr', 50_000_000)
            ->assertJsonCount(5, 'flow');
    }

    public function test_command_center_frontend_has_no_background_polling_or_heavy_blur(): void
    {
        $script = file_get_contents(public_path('assets/command-center/command-center.js'));
        $styles = file_get_contents(public_path('assets/command-center/command-center.css'));

        $this->assertStringNotContainsString('setInterval(', $script);
        $this->assertStringContainsString('sessionStorage', $script);
        $this->assertStringContainsString('notation: \'compact\'', $script);
        $this->assertStringNotContainsString('backdrop-filter', $styles);
    }

    public function test_search_finds_pr_by_pr_contract_and_linked_sp_values(): void
    {
        $pr = $this->makePpbj('PKB/PR-26/CON/0902', 50_000_000, 47_500_000);
        $contract = $this->makePpbj('PKB/PR-26/CON/0903', 12_000_000, 84_000_000);
        $linked = $this->makePpbj('PKB/PR-26/CON/0904', 15_000_000, 0);
        $sp = Sp::query()->create([
            'nomor_sp' => '900/PKU-X/SP/2026',
            'sequence_number' => 900,
            'tanggal_sp' => today(),
            'nilai_sp' => 93_000_000,
            'nomor_pr' => $linked->ppbj_no,
            'nilai_pr' => 95_000_000,
            'nama_vendor' => 'PT Pengujian Nusantara',
            'deskripsi_pengadaan' => 'Kalibrasi alat',
            'pic' => 'Nazar',
        ]);
        $sp->ppbjs()->attach($linked->id, ['urutan' => 1]);

        $this->actingAs($this->user)
            ->getJson(route('command-center.search', ['q' => 'nilai PR 50 juta']))
            ->assertOk()
            ->assertJsonPath('results.0.id', $pr->id)
            ->assertJsonPath('results.0.matched_on', 'Nilai PR');

        $this->actingAs($this->user)
            ->getJson(route('command-center.search', ['q' => 'kontrak Rp 84.000.000']))
            ->assertOk()
            ->assertJsonPath('results.0.id', $contract->id)
            ->assertJsonPath('results.0.matched_on', 'Nilai SP/Kontrak');

        $this->actingAs($this->user)
            ->getJson(route('command-center.search', ['q' => 'nilai SP 93 juta']))
            ->assertOk()
            ->assertJsonFragment(['id' => $linked->id, 'matched_on' => 'Nilai SP terhubung']);

        $this->actingAs($this->user)
            ->getJson(route('command-center.search', ['q' => 'nilai PR SP 95 juta']))
            ->assertOk()
            ->assertJsonFragment(['id' => $linked->id]);
    }

    public function test_ask_journey_and_passport_qr_return_safe_structured_data(): void
    {
        $row = $this->makePpbj('PKB/PR-26/CON/0905', 25_000_000, 0, [
            'tgl_diserahkan' => today()->subDays(12),
            'progres' => 20,
        ]);

        $this->actingAs($this->user)
            ->postJson(route('command-center.ask'), ['question' => 'Tampilkan PR belum SP'])
            ->assertOk()
            ->assertJsonPath('count', 1)
            ->assertJsonPath('results.0.id', $row->id);

        $this->actingAs($this->user)
            ->getJson(route('command-center.journey', $row))
            ->assertOk()
            ->assertJsonPath('record.id', $row->id)
            ->assertJsonCount(7, 'stages')
            ->assertJsonStructure(['tracking_url', 'qr_url', 'real_tracking', 'audit']);

        $this->actingAs($this->user)
            ->get(route('command-center.passport.qr', $row))
            ->assertOk()
            ->assertHeader('content-type', 'image/svg+xml');
    }

    public function test_overview_is_cached_and_stays_within_a_small_query_budget(): void
    {
        foreach (range(1, 40) as $number) {
            $this->makePpbj('PKB/PR-26/CON/'.str_pad((string) $number, 4, '0', STR_PAD_LEFT), $number * 1_000_000, 0);
        }

        CommandCenterController::clearCache();
        DB::flushQueryLog();
        DB::enableQueryLog();

        $this->actingAs($this->user)->getJson(route('command-center.overview'))->assertOk();
        $firstRequestQueries = count(DB::getQueryLog());

        DB::flushQueryLog();
        $this->actingAs($this->user)->getJson(route('command-center.overview'))->assertOk();
        $cachedRequestQueries = count(DB::getQueryLog());

        $this->assertLessThanOrEqual(4, $firstRequestQueries, 'Ringkasan tidak boleh membuat query berat/N+1.');
        $this->assertSame(0, $cachedRequestQueries, 'Ringkasan kedua harus dilayani dari cache.');
        Cache::forget('command_center:overview:v1');
    }

    public function test_meeting_brief_can_be_downloaded_as_pdf_and_excel(): void
    {
        $this->makePpbj('PKB/PR-26/CON/0906', 75_000_000, 70_000_000, [
            'promised_date' => today()->addDays(5),
        ]);

        $this->actingAs($this->user)
            ->get(route('command-center.meeting.pdf'))
            ->assertOk()
            ->assertHeader('content-type', 'application/pdf');

        $this->actingAs($this->user)
            ->get(route('command-center.meeting.excel'))
            ->assertOk()
            ->assertHeader('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    private function makePpbj(string $number, float $prValue, float $spValue, array $extra = []): Ppbj
    {
        return Ppbj::query()->create(array_merge([
            'ppbj_no' => $number,
            'tgl_ppbj' => today(),
            'tgl_terima_pr' => today(),
            'uraian' => 'Pengadaan '.$number,
            'portofolio' => 'IT - FERS',
            'buyer' => 'Nazar',
            'penyedia_eksternal' => 'PT Vendor Indonesia',
            'total_sebelum_ppn' => $prValue,
            'nilai_sp_spk' => $spValue,
            'progres' => 20,
            'status' => 'ACTIVE',
        ], $extra));
    }
}
