<?php

namespace Tests\Feature;

use App\Http\Controllers\SpPortfolioFieldMapController;
use App\Models\ActivityLog;
use App\Models\SpMasterOption;
use App\Models\SpPortfolioFieldMap;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class SpPortfolioMapReliabilityTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create(['role' => 'user', 'department' => 'umum']));
    }

    private function field(): SpMasterOption
    {
        return SpMasterOption::where('type', 'bidang_pr')->where('is_active', true)->firstOrFail();
    }

    private function mapping(string $portfolio = 'Audit Portfolio'): SpPortfolioFieldMap
    {
        return SpPortfolioFieldMap::create(['portfolio' => $portfolio, 'portfolio_key' => SpPortfolioFieldMap::key($portfolio), 'field_id' => $this->field()->id, 'is_active' => true, 'updated_by_user_id' => auth()->id()]);
    }

    private function payload(SpPortfolioFieldMap $row, array $extra = []): array
    {
        return $extra + ['portfolio' => $row->portfolio, 'field_id' => (string) $row->field_id, 'is_active' => $row->is_active ? '1' : '0', 'version' => $row->version()];
    }

    public function test_populated_lists_have_three_minimal_queries_and_optional_options_add_only_four(): void
    {
        foreach (range(1, 29) as $i) {
            $this->mapping(sprintf('Audit %03d', $i));
        }
        $queries = [];
        DB::listen(function ($event) use (&$queries) {
            if (str_starts_with(strtolower($event->sql), 'select')) {
                $queries[] = $event->sql;
            }
        });
        $this->getJson(route('sp.portfolio-mappings', ['page' => 2]))->assertOk()->assertJsonCount(12, 'rows')
            ->assertJsonPath('total', 29)->assertJsonPath('rows.0.portfolio', 'Audit 013')
            ->assertJsonPath('rows.0.field_available', true)->assertHeader('Cache-Control', 'no-store, private');
        $this->assertCount(3, $queries);
        foreach ($queries as $query) {
            $this->assertDoesNotMatchRegularExpression('/select\s+\*/i', $query);
        }
        $this->assertStringNotContainsString('updated_by_user_id', implode(' ', $queries));
        $queries = [];
        $this->getJson(route('sp.portfolio-mappings', ['include_options' => 1]))->assertOk()->assertJsonCount(12, 'rows');
        $this->assertCount(7, $queries);
        $this->assertSame(4, count(array_filter($queries, fn ($sql) => str_contains($sql, 'limit 251'))));
    }

    public function test_literal_search_includes_zero_and_does_not_expand_wildcards(): void
    {
        foreach (['%', '_', '!', '\\', '0'] as $term) {
            $this->mapping($term.' literal audit');
        }
        $this->mapping('ordinary audit');
        foreach (['%', '_', '!', '\\', '0'] as $term) {
            $this->getJson(route('sp.portfolio-mappings', ['q' => $term]))->assertOk()->assertJsonPath('total', 1)->assertJsonCount(1, 'rows');
        }
    }

    public function test_malformed_filters_and_fields_never_reach_business_sql(): void
    {
        $controller = app(SpPortfolioFieldMapController::class);
        $queries = [];
        DB::listen(function ($event) use (&$queries) {
            $queries[] = $event->sql;
        });
        foreach ([['q' => ['bad']], ['q' => str_repeat('x', 151)], ['page' => 0], ['page' => 100001], ['include_options' => ['bad']]] as $input) {
            $queries = [];
            try {
                $controller->index(Request::create('/', 'GET', $input));
                $this->fail('Invalid filter accepted');
            } catch (ValidationException) {
            }
            $this->assertSame([], $queries);
        }
        foreach ([['portfolio' => ['bad'], 'field_id' => 1, 'is_active' => true], ['portfolio' => 'Audit', 'field_id' => ['bad'], 'is_active' => true], ['portfolio' => 'Audit', 'field_id' => 1, 'is_active' => ['bad']]] as $input) {
            $request = Request::create('/', 'POST', $input);
            $request->setUserResolver(fn () => auth()->user());
            $queries = [];
            try {
                $controller->save($request);
                $this->fail('Invalid write accepted');
            } catch (ValidationException) {
            }
            $this->assertSame([], $queries);
        }
        foreach (['0', '99999999999999999999999999999', 'not-an-id'] as $id) {
            $this->putJson('/sp/portfolio-mappings/'.$id, [])->assertNotFound();
        }
    }

    public function test_noop_preserves_last_editor_timestamp_version_and_audit_without_writes(): void
    {
        $row = $this->mapping();
        $payload = $this->payload($row);
        $original = $row->getRawOriginal();
        $this->actingAs(User::factory()->create(['role' => 'user', 'department' => 'umum']));
        $writes = [];
        DB::listen(function ($event) use (&$writes) {
            if (preg_match('/^(insert|update|delete)\b/i', $event->sql)) {
                $writes[] = $event->sql;
            }
        });
        $this->travel(2)->seconds();
        foreach (range(1, 3) as $unused) {
            $this->putJson(route('sp.portfolio-mappings.update', $row->id), $payload)->assertOk()->assertJsonPath('changed', false)->assertJsonPath('row.version', $payload['version'])->assertHeader('Cache-Control', 'no-store, private');
        }
        $this->assertSame([], $writes);
        $fresh = $row->fresh();
        $this->assertSame($original['updated_by_user_id'], $fresh->updated_by_user_id);
        $this->assertSame($original['updated_at'], $fresh->getRawOriginal('updated_at'));
        $this->assertSame(0, ActivityLog::where('model_type', SpPortfolioFieldMap::class)->count());
    }

    public function test_valid_writes_read_eligible_field_once_without_loading_unused_master_columns(): void
    {
        $field = $this->field();
        $queries = [];
        DB::listen(function ($event) use (&$queries) {
            if (str_contains($event->sql, 'sp_master_options')) {
                $queries[] = $event->sql;
            }
        });
        $create = $this->postJson(route('sp.portfolio-mappings.store'), ['portfolio' => 'Fresh field audit', 'field_id' => $field->id, 'is_active' => true])->assertCreated()->assertJsonPath('changed', true)->assertJsonPath('row.field_available', true)->json('row');
        $this->assertCount(1, $queries);
        $this->assertStringNotContainsString('updated_at', $queries[0]);
        $this->assertDoesNotMatchRegularExpression('/select\s+\*/i', $queries[0]);
        $this->putJson(route('sp.portfolio-mappings.update', $create['id']), ['portfolio' => 'Renamed audit', 'field_id' => $field->id, 'is_active' => false, 'version' => str_repeat('0', 64)])->assertConflict()->assertHeader('Cache-Control', 'no-store, private');
    }

    public function test_inactive_wrong_type_or_missing_fields_and_blank_normalized_portfolios_are_rejected(): void
    {
        $field = $this->field();
        $field->update(['is_active' => false]);
        foreach ([$field->id, SpMasterOption::where('type', 'jabatan_sci')->firstOrFail()->id, 2147483647] as $id) {
            $this->postJson(route('sp.portfolio-mappings.store'), ['portfolio' => 'Invalid field audit', 'field_id' => $id, 'is_active' => true])->assertUnprocessable()->assertJsonValidationErrors('field_id');
        }
        $field->update(['is_active' => true]);
        $this->postJson(route('sp.portfolio-mappings.store'), ['portfolio' => "\u{00A0}\u{00A0}", 'field_id' => $field->id, 'is_active' => true])->assertUnprocessable()->assertJsonValidationErrors('portfolio');
        $this->assertSame(0, SpPortfolioFieldMap::count());
    }

    public function test_audit_failure_rolls_back_both_create_and_update(): void
    {
        $row = $this->mapping();
        $version = $row->version();
        Event::listen('eloquent.creating: '.ActivityLog::class, function ($log) {
            if ($log->model_type === SpPortfolioFieldMap::class) {
                throw new \RuntimeException('Synthetic audit failure');
            }
        });
        $this->postJson(route('sp.portfolio-mappings.store'), ['portfolio' => 'Audit failed create', 'field_id' => $row->field_id, 'is_active' => true])->assertStatus(500);
        $this->putJson(route('sp.portfolio-mappings.update', $row->id), $this->payload($row, ['portfolio' => 'Audit failed update']))->assertStatus(500);
        $this->assertSame($version, $row->fresh()->version());
        $this->assertDatabaseMissing('sp_portfolio_field_maps', ['portfolio' => 'Audit failed create']);
    }

    public function test_canonical_and_racing_duplicate_portfolios_remain_explicit_errors(): void
    {
        $row = $this->mapping('PK - LAB');
        $this->postJson(route('sp.portfolio-mappings.store'), ['portfolio' => ' pk  - lab ', 'field_id' => $row->field_id, 'is_active' => true])->assertUnprocessable()->assertJsonValidationErrors('portfolio');
        Event::listen('eloquent.creating: '.SpPortfolioFieldMap::class, function ($map) {
            if ($map->portfolio === 'Race audit') {
                DB::table('sp_portfolio_field_maps')->insert(['portfolio' => $map->portfolio, 'portfolio_key' => $map->portfolio_key, 'field_id' => $map->field_id, 'is_active' => true]);
            }
        });
        $this->postJson(route('sp.portfolio-mappings.store'), ['portfolio' => 'Race audit', 'field_id' => $row->field_id, 'is_active' => true])->assertConflict()->assertHeader('Cache-Control', 'no-store, private');
        $this->assertDatabaseMissing('sp_portfolio_field_maps', ['portfolio' => 'Race audit']);
    }

    public function test_viewer_other_department_and_global_readonly_guards_remain(): void
    {
        $row = $this->mapping();
        foreach ([['viewer', 'umum'], ['user', 'operasional']] as [$role, $department]) {
            $this->actingAs(User::factory()->create(compact('role', 'department')));
            $this->postJson(route('sp.portfolio-mappings.store'), $this->payload($row))->assertForbidden();
            $this->putJson(route('sp.portfolio-mappings.update', $row->id), $this->payload($row))->assertForbidden();
        }
        $this->actingAs(User::factory()->create(['role' => 'superadmin', 'department' => 'umum']));
        Cache::put('simonpr:read_only_mode', true);
        $this->putJson(route('sp.portfolio-mappings.update', $row->id), $this->payload($row))->assertForbidden();
        $this->getJson(route('sp.portfolio-mappings'))->assertOk();
    }
}
