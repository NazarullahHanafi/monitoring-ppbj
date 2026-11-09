<?php

namespace Tests\Feature;

use App\Models\MasterPortofolio;
use App\Models\PrReceiptApproval;
use App\Models\Torpr;
use App\Models\User;
use App\Support\ApprovalPrFilters;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Tests\TestCase;

class ApprovalPrFiltersTest extends TestCase
{
    use RefreshDatabase;

    private User $reviewer;

    private User $requester;

    private int $sequence = 0;

    protected function setUp(): void
    {
        parent::setUp();
        $this->reviewer = User::factory()->create(['name' => 'Dewi Reviewer', 'department' => 'umum', 'role' => 'user']);
        $this->requester = User::factory()->create(['name' => 'Atika Pelayanan', 'email' => 'atika@example.test', 'department' => 'operasional', 'role' => 'user']);
        $this->actingAs($this->reviewer);
    }

    private function approval(string $purpose = 'Pengadaan kursi rapat', array $attributes = [], array $prAttributes = []): PrReceiptApproval
    {
        $pr = Torpr::create($prAttributes + [
            'nomor_pr' => 'PKB/PR-26/CON/'.(++$this->sequence), 'tujuan_pengadaan' => $purpose,
            'portofolio' => 'CON', 'jumlah_pr' => 1250000, 'created_by_user_id' => $this->requester->id,
        ]);

        return PrReceiptApproval::create($attributes + [
            'torpr_id' => $pr->id, 'requested_by_user_id' => $this->requester->id,
            'requested_name' => 'Atika Pengaju', 'requested_at' => '2026-11-09 12:00:00', 'status' => 'PENDING',
        ]);
    }

    private function ids(array $filters = []): array
    {
        return $this->get(route('approval.pr.index', $filters))->assertOk()->viewData('rows')->modelKeys();
    }

    public function test_keywords_find_procurement_requester_portfolio_notes_and_actual_processor(): void
    {
        $match = $this->approval(attributes: ['resubmit_notes' => 'Lampiran diperbaiki']);
        foreach (['kursi', 'RAPAT kursi', 'CON', 'Atika Pengaju', 'Pelayanan', 'atika@example.test', 'operasional', 'diperbaiki', '  kursi   Atika  '] as $term) {
            $this->assertSame([$match->id], $this->ids(['q' => $term]), $term);
        }
        $approved = $this->approval('Jasa inspeksi', ['status' => 'APPROVED', 'approved_by_user_id' => $this->reviewer->id]);
        $rejected = $this->approval('Jasa perawatan', ['status' => 'REJECTED', 'rejected_by_user_id' => $this->reviewer->id, 'rejected_reason' => 'Anggaran belum lengkap']);
        $this->assertEqualsCanonicalizing([$approved->id, $rejected->id], $this->ids(['status' => 'ALL', 'q' => 'Dewi']));
        $this->assertSame([$rejected->id], $this->ids(['status' => 'REJECTED', 'q' => 'Anggaran']));
        $this->assertSame([], $this->ids(['q' => 'Dewi']));
        $this->assertSame([], $this->ids(['q' => 'kursi tidakcocok']));
    }

    public function test_status_portfolio_request_date_and_resubmission_combine_without_or_leakage(): void
    {
        $previous = $this->approval('Dokumen lama', ['status' => 'REJECTED']);
        $match = $this->approval(attributes: ['previous_rejection_id' => $previous->id, 'requested_at' => '2026-11-09 23:59:59']);
        $first = $this->approval();
        $tomorrow = $this->approval(attributes: ['previous_rejection_id' => $previous->id, 'requested_at' => '2026-11-10 00:00:00']);
        $otherPortfolio = $this->approval(attributes: ['previous_rejection_id' => $previous->id], prAttributes: ['portofolio' => 'LAB']);
        $approved = $this->approval(attributes: ['status' => 'APPROVED']);
        $filters = ['q' => 'Atika', 'portofolio' => 'CON', 'dari' => '2026-11-09', 'sampai' => '2026-11-09', 'submission' => 'resubmit'];
        $this->assertSame([$match->id], $this->ids($filters));
        $this->assertSame([$first->id], $this->ids(['portofolio' => 'CON', 'submission' => 'first']));
        $this->assertEqualsCanonicalizing([$match->id, $first->id, $tomorrow->id, $otherPortfolio->id], $this->ids());
        $this->assertCount(6, $this->ids(['status' => 'all']));
        $this->assertSame([$approved->id], $this->ids(['status' => 'APPROVED', 'q' => 'kursi']));
    }

    public function test_search_treats_wildcards_as_literal_and_zero_as_a_real_keyword(): void
    {
        $literal = $this->approval('Garansi 100% kode A_B tanda !');
        $zero = $this->approval('Nominal 0', prAttributes: ['nomor_pr' => 'PR-ZERO']);
        $this->approval('Garansi 1000 kode ACB', prAttributes: ['nomor_pr' => 'PR-OTHER']);
        $this->assertSame([$literal->id], $this->ids(['q' => '100% A_B !']));
        $this->assertSame([$zero->id], $this->ids(['q' => 'Nominal 0']));
        $this->assertSame([], $this->ids(['q' => "' OR 1=1 --"]));
    }

    public function test_value_bounds_are_inclusive_and_combine_with_other_filters(): void
    {
        $zero = $this->approval(prAttributes: ['jumlah_pr' => 0]);
        $lower = $this->approval(prAttributes: ['jumlah_pr' => '1000000.25']);
        $upper = $this->approval(prAttributes: ['jumlah_pr' => '2000000.50']);
        $this->approval(prAttributes: ['jumlah_pr' => null]);
        $this->approval(prAttributes: ['jumlah_pr' => '2000000.51']);
        $this->approval(attributes: ['status' => 'APPROVED'], prAttributes: ['jumlah_pr' => '1500000']);
        $otherPortfolio = $this->approval(prAttributes: ['jumlah_pr' => '1500000', 'portofolio' => 'LAB']);

        $this->assertSame([$zero->id], $this->ids(['nilai_max' => '0']));
        $this->assertSame([$lower->id], $this->ids(['nilai_min' => '1000000.25', 'nilai_max' => '1000000.25']));
        $this->assertSame([$upper->id, $lower->id], $this->ids(['q' => 'kursi Atika', 'portofolio' => 'CON', 'nilai_min' => '1000000.25', 'nilai_max' => '2000000.50']));
        $this->assertSame([$otherPortfolio->id], $this->ids(['nilai_min' => '1500000', 'portofolio' => 'LAB']));
        $this->assertCount(5, $this->ids(['nilai_min' => '0']));
        $this->assertCount(6, $this->ids());
    }

    public function test_invalid_inputs_are_rejected_on_list_and_both_exports(): void
    {
        // Exercise validation independently of the deliberately lower export rate limit.
        $this->withoutMiddleware(\Illuminate\Routing\Middleware\ThrottleRequests::class);
        foreach (['approval.pr.index', 'approval.pr.export.excel', 'approval.pr.export.pdf'] as $name) {
            foreach ([['q' => ['bad']], ['q' => str_repeat('a', 161)], ['status' => ['ALL']], ['portofolio' => ['CON']], ['dari' => 'invalid'], ['dari' => '2026-11-10', 'sampai' => '2026-11-09'], ['submission' => 'unknown'], ['nilai_min' => -1], ['nilai_max' => 'abc'], ['nilai_min' => ['100']], ['nilai_min' => '1.001'], ['nilai_max' => '10000000000000000'], ['nilai_min' => '200', 'nilai_max' => '100']] as $query) {
                $this->getJson(route($name, $query))->assertUnprocessable();
            }
        }
    }

    public function test_excel_and_pdf_use_the_same_advanced_filters_and_export_all_matching_pages(): void
    {
        foreach (range(1, 12) as $i) {
            $this->approval('Pengadaan kursi audit');
        }
        $this->approval('Pengadaan meja lain', prAttributes: ['portofolio' => 'LAB']);
        $this->approval('Pengadaan kursi audit', prAttributes: ['jumlah_pr' => 999999]);
        $this->approval('Pengadaan kursi audit', prAttributes: ['jumlah_pr' => 2000001]);
        $filters = ['q' => 'audit Atika', 'status' => 'ALL', 'portofolio' => 'CON', 'dari' => '2026-11-09', 'sampai' => '2026-11-09', 'submission' => 'first', 'nilai_min' => '1000000', 'nilai_max' => '2000000'];
        $response = $this->get(route('approval.pr.index', $filters))->assertOk();
        $this->assertCount(10, $response->viewData('rows')->items());
        $this->assertSame(12, $response->viewData('rows')->total());
        $this->assertStringContainsString('submission=first', $response->viewData('rows')->url(2));
        $this->assertStringContainsString('nilai_min=1000000', $response->viewData('rows')->url(2));

        $content = $this->get(route('approval.pr.export.excel', $filters))->assertOk()->streamedContent();
        $temp = tempnam(sys_get_temp_dir(), 'approval-filter-');
        try {
            file_put_contents($temp, $content);
            $book = IOFactory::load($temp);
            $sheet = $book->getActiveSheet();
            $this->assertSame(18, $sheet->getHighestDataRow());
            $this->assertStringContainsString('Portofolio: CON', $sheet->getCell('A3')->getValue());
            $this->assertStringContainsString('Waktu pengajuan:', $sheet->getCell('A3')->getValue());
            $this->assertStringContainsString('Nilai PR minimum: Rp 1.000.000,00', $sheet->getCell('A3')->getValue());
            $this->assertStringContainsString('Nilai PR maksimum: Rp 2.000.000,00', $sheet->getCell('A3')->getValue());
            foreach (range(7, 18) as $row) {
                $this->assertSame('Pengadaan kursi audit', $sheet->getCell('D'.$row)->getValue());
            }
            $book->disconnectWorksheets();
        } finally {
            @unlink($temp);
        }

        // Existing tests verify real PDF rendering. Here inspect the complete filtered data sent to it.
        $pdf = \Mockery::mock(\Barryvdh\DomPDF\PDF::class);
        Pdf::shouldReceive('loadView')->once()->with('approval.exports.pr_receipts_pdf', \Mockery::on(function ($data) {
            return $data['rows']->count() === 12
                && $data['rows']->every(fn ($row) => $row->tujuan_pengadaan === 'Pengadaan kursi audit')
                && str_contains($data['filterSummary'], 'Portofolio: CON')
                && str_contains($data['filterSummary'], 'Nilai PR maksimum: Rp 2.000.000,00');
        }))->andReturn($pdf);
        $pdf->shouldReceive('setPaper')->with('a4', 'landscape')->andReturnSelf();
        $pdf->shouldReceive('setOptions')->once()->andReturnSelf();
        $pdf->shouldReceive('download')->once()->andReturn(response('%PDF-filtered', 200, ['Content-Type' => 'application/pdf']));
        $this->get(route('approval.pr.export.pdf', $filters))->assertOk();
    }

    public function test_filter_controls_links_and_hologram_preserve_context_without_automatic_search(): void
    {
        MasterPortofolio::create(['nama' => 'CON']);
        $this->approval();
        $query = ['q' => 'kursi', 'status' => 'ALL', 'portofolio' => 'CON', 'dari' => '2026-11-09', 'submission' => 'first', 'nilai_min' => '0', 'nilai_max' => '2000000'];
        foreach ([false, true] as $hologram) {
            $url = $hologram ? route('virtual-office.hologram', $query + ['tool' => 'approval', 'office_frame' => 31]) : route('approval.pr.index', $query);
            $html = $this->get($url)->assertOk()->assertSee('Terapkan Filter')->assertSee('Filter lanjutan')->getContent();
            $dom = new \DOMDocument;
            @$dom->loadHTML('<?xml encoding="utf-8" ?>'.$html);
            $xpath = new \DOMXPath($dom);
            $form = $xpath->query('//form[@id="approvalFilters"]')->item(0);
            $this->assertSame('GET', $form->getAttribute('method'));
            $this->assertSame($hologram ? route('virtual-office.hologram', ['tool' => 'approval']) : route('approval.pr.index'), $form->getAttribute('action'));
            $this->assertSame(0, $xpath->query('//form[@id="approvalFilters"]//*[@oninput or @onchange]')->length);
            $this->assertSame($hologram ? 1 : 0, $xpath->query('//form[@id="approvalFilters"]//input[@name="office_frame" and @value="31"]')->length);
            $this->assertSame(1, $xpath->query('//form[@id="approvalFilters"]//input[@name="nilai_min" and @value="0"]')->length);
            $this->assertSame(1, $xpath->query('//form[@id="approvalFilters"]//input[@name="nilai_max" and @value="2000000"]')->length);
            $clearValue = $xpath->query('//a[@aria-label="Hapus filter Nilai PR minimum"]')->item(0)->getAttribute('href');
            parse_str(parse_url($clearValue, PHP_URL_QUERY), $valueParams);
            $this->assertArrayNotHasKey('nilai_min', $valueParams);
            $this->assertSame('2000000', $valueParams['nilai_max']);
            foreach ($xpath->query('//a[contains(@href,"/export/")]') as $link) {
                parse_str(parse_url($link->getAttribute('href'), PHP_URL_QUERY), $params);
                foreach ($query as $key => $value) {
                    $this->assertSame($value, $params[$key]);
                }
                $this->assertArrayNotHasKey('office_frame', $params);
            }
            $clear = $xpath->query('//a[@aria-label="Hapus filter Pencarian"]')->item(0)->getAttribute('href');
            parse_str(parse_url($clear, PHP_URL_QUERY), $params);
            $this->assertArrayNotHasKey('q', $params);
            $this->assertSame('CON', $params['portofolio']);
            if ($hologram) {
                $this->assertSame('31', $params['office_frame']);
            }
        }
    }

    public function test_filters_keep_permissions_and_do_not_write_approval_data(): void
    {
        $this->approval();
        DB::enableQueryLog();
        $this->ids(['q' => 'kursi Atika', 'status' => 'ALL']);
        $queries = collect(DB::getQueryLog())->pluck('query');
        DB::disableQueryLog();
        $this->assertCount(0, $queries->filter(fn ($sql) => preg_match('/^\s*(insert|update|delete)\b/i', $sql) && str_contains($sql, 'pr_receipt_approvals')));
        $this->assertCount(1, $queries->filter(fn ($sql) => preg_match('/^select[^()]* from "users" /i', $sql)));
        $sql = ApprovalPrFilters::apply(PrReceiptApproval::query(), ApprovalPrFilters::fromRequest(Request::create('/', 'GET', ['dari' => '2026-11-09', 'sampai' => '2026-11-09'])))->toSql();
        $this->assertStringNotContainsString('date(', $sql);
        $this->actingAs($this->requester);
        foreach (['approval.pr.index', 'approval.pr.export.excel', 'approval.pr.export.pdf'] as $route) {
            $this->get(route($route, ['status' => 'ALL', 'q' => 'kursi']))->assertForbidden();
        }
        $this->get(route('virtual-office.hologram', ['tool' => 'approval', 'status' => 'ALL']))->assertForbidden();
    }
}
