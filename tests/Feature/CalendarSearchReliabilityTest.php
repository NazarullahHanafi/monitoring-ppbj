<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class CalendarSearchReliabilityTest extends TestCase
{
    use RefreshDatabase;

    public function test_end_date_can_be_used_alone_and_includes_the_boundary(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'umum']));
        $match = $this->record('2026-11-16', 'Batas tanggal');
        $this->record('2026-11-17', 'Besok');
        $response = $this->getJson(route('collaboration-calendar.ppbj-search', ['date_to' => '2026-11-16']));
        $response->assertOk()->assertJsonCount(1, 'results')->assertJsonPath('results.0.id', $match->id);
        $this->assertStringContainsString('private', $response->headers->get('Cache-Control'));
        $this->assertStringContainsString('no-store', $response->headers->get('Cache-Control'));
    }

    public static function literalTerms(): array
    {
        return [['50%'], ['AC_DC'], ['Bang!'], ['C:\\data'], ["O'Reilly"]];
    }

    #[DataProvider('literalTerms')]
    public function test_search_treats_user_text_as_literals(string $term): void
    {
        $this->actingAs(User::factory()->create(['department' => 'operasional']));
        $match = $this->record('2026-11-16', 'Barang '.$term);
        $this->record('2026-11-16', 'Barang 500 ACDDC Bang C:data OReilly');
        $this->getJson(route('collaboration-calendar.ppbj-search', ['q' => $term]))
            ->assertOk()->assertJsonCount(1, 'results')->assertJsonPath('results.0.id', $match->id);
    }

    public function test_invalid_filters_are_rejected_before_search_queries(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        $this->actingAs($user);
        DB::enableQueryLog();
        DB::flushQueryLog();
        foreach ([['q' => ['bad']], ['q' => str_repeat('x', 121)], ['date_to' => '2026-99-99'],
            ['date_from' => '2026-11-17', 'date_to' => '2026-11-16']] as $filters) {
            $this->getJson(route('collaboration-calendar.ppbj-search', $filters))->assertUnprocessable();
        }
        $searches = collect(DB::getQueryLog())->filter(fn ($query) => str_contains(strtolower($query['query']), 'from "ppbj"'));
        DB::disableQueryLog();
        $this->assertCount(0, $searches);
    }

    public function test_search_stays_bounded_and_preserves_receiver_name_matching(): void
    {
        $receiver = User::factory()->create(['department' => 'umum', 'name' => 'Penerima 50%']);
        $this->actingAs($receiver);
        for ($i = 0; $i < 15; $i++) {
            $record = $this->record('2026-11-16', 'Barang '.$i);
            $record->update(['general_registered_by_user_id' => $receiver->id]);
        }
        DB::flushQueryLog();
        DB::enableQueryLog();
        $this->getJson(route('collaboration-calendar.ppbj-search', ['q' => 'Penerima 50%']))
            ->assertOk()->assertJsonCount(12, 'results')->assertJsonPath('meta.limit', 12);
        $queries = DB::getQueryLog();
        DB::disableQueryLog();
        $this->assertLessThanOrEqual(4, count($queries));
    }

    private function record(string $date, string $description): Ppbj
    {
        return Ppbj::create(['ppbj_no' => 'CAL/'.fake()->unique()->numerify('######'), 'tgl_ppbj' => $date, 'uraian' => $description]);
    }

    public function test_calendar_actions_have_separate_request_budgets_without_removing_limits(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'umum']));
        $prefixes = [];
        foreach (['events' => 90, 'ppbj-search' => 60, 'journey' => 60, 'store' => 20, 'update' => 30, 'status' => 40, 'destroy' => 20] as $name => $limit) {
            $route = app('router')->getRoutes()->getByName('collaboration-calendar.'.$name);
            $rule = collect($route->gatherMiddleware())->first(fn ($item) => str_starts_with($item, 'throttle:'));
            [$actual, $minutes, $prefix] = explode(',', substr($rule, strlen('throttle:')));
            $this->assertSame((string) $limit, $actual);
            $this->assertSame('1', $minutes);
            $this->assertNotEmpty($prefix);
            $this->assertNotContains($prefix, $prefixes);
            $prefixes[] = $prefix;
        }
        for ($i = 0; $i < 20; $i++) {
            $this->postJson(route('collaboration-calendar.store'), [])->assertUnprocessable();
        }
        $this->postJson(route('collaboration-calendar.store'), [])->assertTooManyRequests();
        $this->getJson(route('collaboration-calendar.ppbj-search', ['q' => 'barang']))->assertOk();
        $this->getJson(route('collaboration-calendar.events', [
            'start' => '2026-11-01', 'end' => '2026-11-30', 'source' => 'collaboration',
        ]))->assertOk();
    }
}
