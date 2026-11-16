<?php

namespace Tests\Feature;

use App\Http\Controllers\CommandCenterController;
use App\Models\ActivityLog;
use App\Models\Ppbj;
use App\Models\PpbjRealTracking;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Tests\TestCase;

class CommandCenterReliabilityTest extends TestCase
{
    use RefreshDatabase;

    public function test_missing_spph_does_not_also_require_missing_sp_and_compound_question_keeps_both_filters(): void
    {
        $this->actingAs($this->user());
        $onlySpphMissing = $this->ppbj('ONLY-SPPH-MISSING', ['awarding_sp' => 'SP-EXISTS']);
        $onlySpMissing = $this->ppbj('ONLY-SP-MISSING', ['spph_rfq_1' => 'SPPH-EXISTS']);
        $bothMissing = $this->ppbj('BOTH-MISSING');
        foreach (['Tampilkan PR belum SPPH', 'Tampilkan PR tanpa SPPH'] as $question) {
            $result = $this->postJson(route('command-center.ask'), compact('question'))->assertOk()->assertJsonPath('filters', ['belum memiliki SPPH']);
            $this->assertEqualsCanonicalizing([$onlySpphMissing->id, $bothMissing->id], array_column($result->json('results'), 'id'));
        }
        $result = $this->postJson(route('command-center.ask'), ['question' => 'Tampilkan PR belum SP'])->assertOk();
        $this->assertEqualsCanonicalizing([$onlySpMissing->id, $bothMissing->id], array_column($result->json('results'), 'id'));
        $this->postJson(route('command-center.ask'), ['question' => 'PR belum SP dan belum SPPH'])->assertOk()->assertJsonCount(1, 'results')->assertJsonPath('results.0.id', $bothMissing->id);
    }

    public function test_literal_search_and_ask_do_not_expand_wildcards_and_ties_use_id(): void
    {
        $this->actingAs($this->user());
        $match = $this->ppbj('SYMBOLS', ['uraian' => 'Bukti %_!\\ lengkap']);
        $other = $this->ppbj('UNRELATED', ['uraian' => 'Bukti abc lengkap']);
        foreach (['%', '_', '!', '\\', '%_!\\'] as $term) {
            $this->getJson(route('command-center.search', ['q' => $term]))->assertOk()->assertJsonCount(1, 'results')->assertJsonPath('results.0.id', $match->id);
        }
        $this->postJson(route('command-center.ask'), ['question' => '%_!\\'])->assertOk()->assertJsonCount(1, 'results')->assertJsonPath('results.0.id', $match->id);
        DB::table('ppbj')->update(['uraian' => 'Tie search', 'updated_at' => now()->startOfSecond()]);
        $result = $this->getJson(route('command-center.search', ['q' => 'Tie search']))->assertOk();
        $this->assertSame([$other->id, $match->id], array_column($result->json('results'), 'id'));
    }

    public function test_private_json_keeps_existing_cache_query_budget_and_scopes_browser_cache(): void
    {
        $this->actingAs($this->user());
        $row = $this->ppbj('PRIVATE');
        CommandCenterController::clearCache();
        DB::enableQueryLog();
        DB::flushQueryLog();
        $this->getJson(route('command-center.overview'))->assertOk()->assertHeader('Cache-Control', 'no-store, private');
        $this->assertLessThanOrEqual(4, count(DB::getQueryLog()));
        DB::flushQueryLog();
        $this->getJson(route('command-center.overview'))->assertOk();
        $this->assertCount(0, DB::getQueryLog());
        DB::disableQueryLog();
        foreach (['search' => ['q' => 'PRIVATE'], 'reconciliation' => [], 'journey' => [$row]] as $name => $parameters) {
            $this->getJson(route('command-center.'.$name, $parameters))->assertOk()->assertHeader('Cache-Control', 'no-store, private');
        }
        $this->postJson(route('command-center.ask'), ['question' => 'PRIVATE'])->assertOk()->assertHeader('Cache-Control', 'no-store, private');
        $this->get(route('command-center.index'))->assertOk()->assertSee('data-cache-scope=', false)->assertSee('maxlength="120"', false)->assertSee('maxlength="220"', false);
    }

    public function test_journey_bounds_history_without_loading_large_audit_payload_or_unused_tracking_columns(): void
    {
        $actor = $this->user();
        $this->actingAs($actor);
        $row = $this->ppbj('BOUNDED');
        foreach (range(1, 55) as $index) {
            PpbjRealTracking::create(['ppbj_id' => $row->id, 'title' => 'Event '.$index, 'event_date' => today(), 'created_by_user_id' => $actor->id]);
            ActivityLog::create(['model_type' => Ppbj::class, 'model_id' => $row->id, 'action' => 'updated', 'description' => 'Event '.$index, 'changes' => ['large' => str_repeat('x', 1000)], 'user_id' => $actor->id]);
        }
        DB::enableQueryLog();
        DB::flushQueryLog();
        $this->getJson(route('command-center.journey', $row))->assertOk()->assertJsonCount(50, 'real_tracking')->assertJsonCount(30, 'audit')->assertJsonPath('audit.0.title', 'Event 55');
        $queries = collect(DB::getQueryLog())->pluck('query');
        DB::disableQueryLog();
        $this->assertLessThanOrEqual(5, $queries->count());
        $audit = $queries->first(fn ($sql) => str_contains($sql, 'from "activity_logs"'));
        $tracking = $queries->first(fn ($sql) => str_contains($sql, 'from "ppbj_real_trackings"'));
        $this->assertNotNull($audit);
        $this->assertNotNull($tracking);
        $this->assertStringNotContainsString('"changes"', $audit);
        $this->assertStringNotContainsString('select *', $audit);
        $this->assertStringNotContainsString('created_by_user_id', $tracking);
        $this->assertStringContainsString('select "id", "ppbj_id", "title", "description", "event_date", "reminder_date", "created_at"', $tracking);
    }

    public function test_excel_exports_untrusted_business_text_as_text_and_financial_values_as_numbers(): void
    {
        $this->actingAs($this->user());
        $this->ppbj('=1+1', ['uraian' => '=HYPERLINK("https://example.test","Open")', 'buyer' => '+SUM(1,2)', 'penyedia_eksternal' => '@SUM(3,4)', 'promised_date' => today()->subDays(3)]);
        CommandCenterController::clearCache();
        $response = $this->get(route('command-center.meeting.excel'))->assertOk();
        $path = $response->baseResponse->getFile()->getPathname();
        try {
            $book = IOFactory::load($path);
            $sheet = $book->getActiveSheet();
            foreach (['B9' => '=1+1', 'C9' => '=HYPERLINK("https://example.test","Open")', 'D9' => '+SUM(1,2)', 'E9' => '@SUM(3,4)'] as $cell => $value) {
                $this->assertSame(DataType::TYPE_STRING, $sheet->getCell($cell)->getDataType());
                $this->assertSame($value, $sheet->getCell($cell)->getValue());
            }
            $this->assertSame(DataType::TYPE_NUMERIC, $sheet->getCell('F9')->getDataType());
            $this->assertSame(1000000.0, (float) $sheet->getCell('F9')->getValue());
            $book->disconnectWorksheets();
        } finally {
            if (is_file($path)) {
                unlink($path);
            }
        }
    }

    public function test_budgets_are_isolated_and_access_validation_and_numeric_bindings_remain_enforced(): void
    {
        $this->getJson(route('command-center.overview'))->assertUnauthorized();
        $this->actingAs($this->user('operasional'))->getJson(route('command-center.overview'))->assertForbidden();
        $this->actingAs($this->user('umum', 'viewer'))->postJson(route('command-center.ask'), ['question' => 'Tampilkan PR'])->assertForbidden();
        $this->actingAs($this->user());
        $prefixes = [];
        foreach (['index' => 60, 'overview' => 60, 'search' => 60, 'ask' => 30, 'reconciliation' => 30, 'journey' => 60, 'passport.qr' => 60, 'meeting.pdf' => 10, 'meeting.excel' => 10] as $name => $limit) {
            $route = app('router')->getRoutes()->getByName('command-center.'.$name);
            foreach (['auth', 'dept:umum', 'readonly.block'] as $required) {
                $this->assertContains($required, $route->gatherMiddleware());
            }
            $rule = collect($route->gatherMiddleware())->first(fn ($item) => str_starts_with($item, 'throttle:'));
            [$actual, $minutes, $prefix] = explode(',', substr($rule, 9));
            $this->assertSame((string) $limit, $actual);
            $this->assertSame('1', $minutes);
            $this->assertNotEmpty($prefix);
            $this->assertNotContains($prefix, $prefixes);
            $prefixes[] = $prefix;
        }
        foreach ([['bad'], str_repeat('x', 121)] as $q) {
            $this->getJson(route('command-center.search', compact('q')))->assertUnprocessable();
        }
        $this->getJson('/command-center/journey/invalid')->assertNotFound();
        $this->getJson('/command-center/passport/invalid/qr')->assertNotFound();
        for ($i = 0; $i < 30; $i++) {
            $this->postJson(route('command-center.ask'), ['question' => ''])->assertUnprocessable();
        }
        $this->postJson(route('command-center.ask'), ['question' => ''])->assertTooManyRequests();
        $this->getJson(route('command-center.reconciliation'))->assertOk();
    }

    private function user(string $department = 'umum', string $role = 'superadmin'): User
    {
        return User::factory()->create(compact('department', 'role'));
    }

    private function ppbj(string $number, array $extra = []): Ppbj
    {
        return Ppbj::create(array_merge(['ppbj_no' => $number, 'tgl_ppbj' => today(), 'tgl_terima_pr' => today(),
            'uraian' => 'Dokumen uji', 'buyer' => 'Buyer', 'penyedia_eksternal' => 'Vendor', 'total_sebelum_ppn' => 1000000, 'status' => 'ACTIVE'], $extra));
    }
}
