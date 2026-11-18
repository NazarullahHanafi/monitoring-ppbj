<?php

namespace Tests\Feature;

use App\Http\Controllers\SpController;
use App\Http\Controllers\SpPrintController;
use App\Models\ActivityLog;
use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\SpMasterOption;
use App\Models\SpPortfolioFieldMap;
use App\Models\User;
use App\Services\SpPrintPolicy;
use App\Services\SpPrintSelection;
use App\Support\PrintPreviewFile;
use App\Support\SpPaymentTerms;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;
use ZipArchive;

class SpPaymentTermsTest extends TestCase
{
    use RefreshDatabase;

    private User $actor;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actor = User::factory()->create(['role' => 'user', 'department' => 'umum']);
        $this->actingAs($this->actor);
    }

    private function document(int $amount = 1000000): Sp
    {
        $sp = Sp::create(['nomor_sp' => '999/PKU-XI/SP/2026', 'sequence_number' => 999,
            'tanggal_sp' => '2026-11-17', 'nilai_sp' => $amount, 'nilai_pr' => $amount, 'nomor_pr' => 'PR/PAYMENT/TEST',
            'nama_vendor' => 'Vendor uji pembayaran', 'pic' => 'Penguji', 'deskripsi_pengadaan' => 'Pengadaan uji pembayaran',
            'awal_kontrak' => '2026-11-17', 'akhir_kontrak' => '2026-12-17']);
        $pr = Ppbj::create(['ppbj_no' => $sp->nomor_pr, 'tgl_ppbj' => '2026-11-17', 'portofolio' => 'PAYMENT TEST', 'total_sebelum_ppn' => $amount]);
        $sp->ppbjs()->attach($pr->id, ['urutan' => 1]);
        SpPortfolioFieldMap::create(['portfolio' => 'PAYMENT TEST', 'portfolio_key' => 'PAYMENT TEST', 'field_id' => $this->fieldId(), 'is_active' => true]);

        return $sp->fresh();
    }

    private function fieldId(): int
    {
        return SpMasterOption::where('type', 'bidang_pr')->where('is_active', true)->firstOrFail()->id;
    }

    private function request(array $input = [], string $method = 'GET'): Request
    {
        $request = Request::create('/sp/synthetic/cetak', $method, $input);
        $request->setUserResolver(fn () => $this->actor);
        $request->headers->set('Accept', 'application/json');
        $this->app->instance('request', $request);

        return $request;
    }

    public static function documentModes(): array
    {
        $cases = [];
        foreach ([1000000, 60000000, 350000000, 550000000] as $amount) {
            foreach (SpPaymentTerms::MODES as $mode) {
                $cases["{$amount}-{$mode}"] = [$amount, $mode];
            }
        }

        return $cases;
    }

    #[DataProvider('documentModes')]
    public function test_selected_payment_reaches_the_actual_docx_in_every_value_tier(int $amount, string $mode): void
    {
        $sp = $this->document($amount);
        $context = app(SpPrintPolicy::class)->context($sp);
        $response = app(SpPrintController::class)->download($this->request(['signing_mode' => 'auto', 'field_id' => $this->fieldId(), 'payment_mode' => $mode, 'print_basis' => $context['fingerprint']]), $sp);
        $path = $response->getFile()->getPathname();
        try {
            $zip = new ZipArchive;
            $this->assertTrue($zip->open($path));
            $xml = $zip->getFromName('word/document.xml');
            $zip->close();
            $this->assertIsString($xml);
            $dom = new \DOMDocument;
            $this->assertTrue($dom->loadXML($xml));
            $text = $dom->textContent;
            $expected = $mode === 'realization' ? 'secara bertahap sesuai dengan realisasi pekerjaan dan dibayarkan setelah barang/jasa diterima' : 'secara sekaligus 100% (Seratus Persen)';
            $this->assertStringContainsString(mb_strtolower($expected), mb_strtolower($text));
            if ($mode === 'realization') {
                $this->assertStringNotContainsString('dibayarkan secara sekaligus', $text);
                $this->assertStringNotContainsString('Secara sekaligus 100%', $text);
                $this->assertStringNotContainsString('Pembayaran dilakukan dengan cara sekaligus keseluruhan', $text);
                $this->assertStringNotContainsString('Pembayaran dilakukan secara bertahap setiap bulannya', $text);
            } else {
                $this->assertStringNotContainsString('Pembayaran dilakukan secara bertahap', $text);
                $this->assertStringNotContainsString('realisasi pemakaian setiap bulannya', $text);
            }
            $this->assertStringContainsString('60', $text);
            $this->assertStringContainsString('Keuangan', $text);
            if ($mode === 'realization') {
                $log = ActivityLog::where('model_type', Sp::class)->where('model_id', $sp->id)->where('action', 'manual_print_selection')->firstOrFail();
                $this->assertSame('realization', $log->changes['payment_mode']);
            }
        } finally {
            @unlink($path);
        }
    }

    public function test_confirmation_round_trips_both_options_without_changing_sp_or_mapping(): void
    {
        $sp = $this->document();
        $before = $sp->getRawOriginal();
        foreach (SpPaymentTerms::MODES as $mode) {
            $context = app(SpPrintPolicy::class)->context($sp);
            $data = app(SpPrintSelection::class)->confirm($this->request(['signing_mode' => 'auto', 'field_id' => $this->fieldId(), 'payment_mode' => $mode, 'print_basis' => $context['fingerprint']], 'POST'), $sp);
            $this->assertSame($mode, $data['selection']['payment_mode']);
            $this->assertFalse($data['mapping_saved']);
            $this->assertSame($before, $sp->fresh()->getRawOriginal());
            $this->assertDatabaseCount('sp_portfolio_field_maps', 1);
        }
    }

    public function test_legacy_requests_default_to_full_without_expanding_old_selection_dto(): void
    {
        $sp = $this->document();
        $selected = app(SpPrintPolicy::class)->validate($this->request(['field_id' => $this->fieldId()]), app(SpPrintPolicy::class)->context($sp));
        $this->assertSame('full', $selected['payment_mode']);
        $this->assertArrayNotHasKey('payment_mode', $selected['query']);
        $this->assertSame('Secara sekaligus 100% (Seratus Persen) dibayarkan setelah barang diterima, dibayarkan paling lambat selama 60 (Enam Puluh) hari kalender setelah dokumen tagihan lengkap diterima oleh Keuangan dan Akuntansi dengan melampirkan:', SpPaymentTerms::spClause('full'));
    }

    public function test_invalid_payment_fails_before_context_sql_generation_or_confirmation_locks(): void
    {
        $sp = new Sp;
        $sp->id = 2147483647;
        foreach ([['realization'], 'unknown', '<script>', 1, ''] as $mode) {
            foreach (['context', 'download', 'preview', 'confirm', 'renderer'] as $action) {
                $request = $this->request(['payment_mode' => $mode, 'print_basis' => str_repeat('a', 64)], $action === 'confirm' ? 'POST' : 'GET');
                DB::enableQueryLog();
                DB::flushQueryLog();
                try {
                    if ($action === 'renderer') {
                        app(SpController::class)->cetakSp($sp);
                    } elseif ($action === 'confirm') {
                        app(SpPrintSelection::class)->confirm($request, $sp);
                    } else {
                        app(SpPrintController::class)->$action($request, $sp);
                    }
                    $this->fail('Invalid payment accepted');
                } catch (ValidationException $error) {
                    $this->assertArrayHasKey('payment_mode', $error->errors());
                    $this->assertCount(0, DB::getQueryLog());
                }
            }
        }
    }

    public function test_read_only_context_allows_payment_choice_without_learning_or_mutation(): void
    {
        $sp = $this->document();
        $this->actor->role = 'viewer';
        $before = ActivityLog::count();
        $response = app(SpPrintController::class)->context($this->request(['signing_mode' => 'auto', 'field_id' => $this->fieldId(), 'payment_mode' => 'realization']), $sp);
        $this->assertSame('realization', $response->getData(true)['selection']['payment_mode']);
        $this->assertFalse($response->getData(true)['can_manage']);
        $this->assertSame($before, ActivityLog::count());
    }

    public function test_preview_identifies_the_payment_and_keeps_the_same_prepared_file_for_download(): void
    {
        $sp = $this->document();
        $view = app(SpPrintController::class)->preview($this->request(['field_id' => $this->fieldId(), 'payment_mode' => 'realization']), $sp);
        $data = $view->getData();
        $this->assertSame('Bertahap sesuai realisasi pekerjaan', $data['meta']['Pembayaran']);
        $this->assertMatchesRegularExpression('~/document-previews/([a-f0-9-]+)/file~', $data['downloadUrl']);
        preg_match('~/document-previews/([a-f0-9-]+)/file~', $data['downloadUrl'], $match);
        $cached = Cache::get(PrintPreviewFile::CACHE_PREFIX.$match[1]);
        $path = storage_path('app/'.$cached['path']);
        try {
            $zip = new ZipArchive;
            $this->assertTrue($zip->open($path));
            $xml = $zip->getFromName('word/document.xml');
            $zip->close();
            $this->assertStringContainsString(SpPaymentTerms::opening('realization'), $xml);
            $this->assertStringContainsString('download=1', $data['downloadUrl']);
        } finally {
            @unlink($path);
            Cache::forget(PrintPreviewFile::CACHE_PREFIX.$match[1]);
        }
    }
}
