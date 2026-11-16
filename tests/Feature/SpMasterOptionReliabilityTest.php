<?php

namespace Tests\Feature;

use App\Http\Controllers\SpMasterOptionController;
use App\Models\ActivityLog;
use App\Models\SpMasterOption;
use App\Models\User;
use App\Support\SpMasterOptionVersion;
use Illuminate\Cache\Events\KeyForgotten;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class SpMasterOptionReliabilityTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create(['role' => 'user', 'department' => 'umum']));
    }

    private function option(array $attributes = []): SpMasterOption
    {
        return SpMasterOption::create($attributes + ['type' => 'jabatan_sci', 'nama' => 'Master audit', 'is_active' => true]);
    }

    private function payload(SpMasterOption $option, array $attributes = []): array
    {
        return $attributes + ['type' => $option->type, 'nama' => $option->nama, 'is_active' => $option->is_active, 'version' => SpMasterOptionVersion::of($option)];
    }

    public function test_malformed_filters_and_write_fields_are_rejected_before_master_sql(): void
    {
        $queries = [];
        DB::listen(function ($event) use (&$queries) {
            $queries[] = $event->sql;
        });
        foreach ([['type' => ['jabatan_sci']], ['type' => 'unknown'], ['search' => ['array']], ['search' => str_repeat('x', 151)], ['page' => 0], ['page' => 100001]] as $input) {
            $queries = [];
            try {
                app(SpMasterOptionController::class)->index(Request::create('/', 'GET', $input));
                $this->fail('Invalid filter accepted');
            } catch (ValidationException) {
            }
            $this->assertSame([], $queries);
        }
        foreach ([['type' => ['jabatan_sci'], 'nama' => 'Name'], ['type' => 'jabatan_sci', 'nama' => ['array']], ['type' => 'unknown', 'nama' => 'Name']] as $input) {
            $queries = [];
            try {
                app(SpMasterOptionController::class)->store(Request::create('/', 'POST', $input));
                $this->fail('Invalid write accepted');
            } catch (ValidationException) {
            }
            $this->assertSame([], $queries);
        }
        foreach ([['type' => ['bad']], ['type' => 'jabatan_sci', 'page' => 100001], ['type' => 'jabatan_sci', 'per_page' => 51]] as $input) {
            $queries = [];
            try {
                app(SpMasterOptionController::class)->printOptions(Request::create('/', 'GET', $input));
                $this->fail('Invalid print filter accepted');
            } catch (ValidationException) {
            }
            $this->assertSame([], $queries);
        }
    }

    public function test_list_is_private_has_three_bounded_queries_and_preserves_filter_pagination(): void
    {
        foreach (range(1, 45) as $i) {
            $this->option(['nama' => sprintf('Bounded audit %03d', $i)]);
        }
        $queries = [];
        DB::listen(function ($event) use (&$queries) {
            if (str_contains($event->sql, 'sp_master_options')) {
                $queries[] = $event->sql;
            }
        });
        $response = $this->get(route('sp-master-options.index', ['search' => 'Bounded audit', 'page' => 2, 'type' => 'jabatan_sci']));
        $response->assertOk()->assertHeader('Cache-Control', 'no-store, private')
            ->assertViewHas('options', fn ($rows) => $rows->count() === 20 && $rows->total() === 45 && $rows->first()->nama === 'Bounded audit 021')
            ->assertSee('name="is_active" value="0"', false)->assertSee('name="version"', false)->assertSee('sp-master-options.js', false);
        $this->assertCount(3, $queries);
        foreach ($queries as $sql) {
            $this->assertDoesNotMatchRegularExpression('/select\s+\*/i', $sql);
        }
        $this->assertStringContainsString('limit 20', implode(' ', $queries));
        $response->assertSee('search=Bounded%20audit', false);
    }

    public function test_search_treats_percent_underscore_escape_backslash_and_zero_as_literal_text(): void
    {
        foreach (['% literal audit', '_ literal audit', '! literal audit', '\\ literal audit', '0 literal audit', 'plain literal audit'] as $name) {
            $this->option(['nama' => $name]);
        }
        foreach (['%', '_', '!', '\\', '0'] as $term) {
            $this->get(route('sp-master-options.index', ['type' => 'jabatan_sci', 'search' => $term]))->assertOk()
                ->assertViewHas('options', fn ($rows) => $rows->total() === 1 && str_starts_with($rows->first()->nama, $term));
            $this->getJson(route('spph.print-masters', ['type' => 'jabatan_sci', 'q' => $term]))->assertOk()->assertJsonPath('total', 1)->assertJsonCount(1, 'options');
        }
    }

    public function test_print_choices_are_bounded_and_selected_active_record_is_first(): void
    {
        foreach (range(1, 60) as $i) {
            $this->option(['nama' => 'Choice audit '.$i]);
        }
        $selected = $this->option(['nama' => 'ZZ selected audit']);
        $queries = [];
        DB::listen(function ($event) use (&$queries) {
            if (str_contains($event->sql, 'sp_master_options')) {
                $queries[] = $event->sql;
            }
        });
        $this->getJson(route('spph.print-masters', ['type' => 'jabatan_sci', 'active_only' => 1, 'include_id' => $selected->id, 'per_page' => 50]))
            ->assertOk()->assertJsonCount(50, 'options')->assertJsonPath('options.0.id', $selected->id)->assertHeader('Cache-Control', 'no-store, private');
        $this->assertCount(2, $queries);
        foreach ($queries as $sql) {
            $this->assertDoesNotMatchRegularExpression('/select\s+\*/i', $sql);
        }
    }

    public function test_explicit_false_create_and_native_form_updates_are_audited_and_versioned(): void
    {
        $this->post(route('sp-master-options.store'), ['type' => 'jabatan_sci', 'nama' => '  Native audit  ', 'is_active' => '0'])->assertRedirect();
        $option = SpMasterOption::where('nama', 'Native audit')->firstOrFail();
        $this->assertFalse($option->is_active);
        $old = SpMasterOptionVersion::of($option);
        $this->put(route('sp-master-options.update', $option), $this->payload($option, ['nama' => 'Native renamed']))->assertRedirect();
        $this->putJson(route('sp-master-options.update', $option), $this->payload($option, ['nama' => 'Stale overwrite', 'version' => $old]))->assertConflict();
        $this->put(route('sp-master-options.update', $option), ['type' => 'jabatan_sci', 'nama' => 'Missing version'])->assertSessionHasErrors('version');
        $this->assertSame('Native renamed', $option->fresh()->nama);
        $this->assertSame(2, ActivityLog::where('model_type', SpMasterOption::class)->where('model_id', $option->id)->count());
    }

    public function test_unchanged_update_has_no_sql_write_audit_timestamp_or_cache_invalidation(): void
    {
        $option = $this->option();
        $payload = $this->payload($option);
        $key = 'sp_master_options:jabatan_sci:active_names';
        Cache::put($key, ['warm'], 300);
        $timestamp = $option->getRawOriginal('updated_at');
        $writes = [];
        DB::listen(function ($event) use (&$writes) {
            if (preg_match('/^(update|insert|delete)\s/i', $event->sql) && preg_match('/sp_master_options|activity_logs/', $event->sql)) {
                $writes[] = $event->sql;
            }
        });
        $this->travel(2)->seconds();
        foreach (range(1, 3) as $unused) {
            $this->putJson(route('sp-master-options.update', $option), $payload)->assertOk()->assertJsonPath('changed', false)->assertJsonPath('option.version', $payload['version']);
        }
        $this->assertSame([], $writes);
        $this->assertSame($timestamp, $option->fresh()->getRawOriginal('updated_at'));
        $this->assertSame(['warm'], Cache::get($key));
    }

    public function test_cache_for_both_old_and_new_types_is_invalidated_only_after_commit(): void
    {
        $option = $this->option();
        $old = 'sp_master_options:jabatan_sci:active_names';
        $new = 'sp_master_options:bidang_pr:active_names';
        Cache::put($old, ['warm']);
        Cache::put($new, ['warm']);
        $forgotten = [];
        Event::listen(KeyForgotten::class, function ($event) use (&$forgotten, $old, $new) {
            if (in_array($event->key, [$old, $new], true)) {
                $forgotten[] = $event->key;
            }
        });
        DB::transaction(function () use ($option, $old, $new) {
            $option->update(['type' => 'bidang_pr']);
            $this->assertSame(['warm'], Cache::get($old));
            $this->assertSame(['warm'], Cache::get($new));
        });
        $this->assertFalse(Cache::has($old));
        $this->assertFalse(Cache::has($new));
        $this->assertEqualsCanonicalizing([$old, $new], $forgotten);
        Cache::put($old, ['warm']);
        Cache::put($new, ['warm']);
        try {
            DB::transaction(function () use ($option) {
                $option->fresh()->update(['type' => 'jabatan_sci']);
                throw new \RuntimeException('rollback');
            });
        } catch (\RuntimeException) {
        }
        $this->assertSame(['warm'], Cache::get($old));
        $this->assertSame(['warm'], Cache::get($new));
    }

    public function test_concurrent_unique_conflicts_become_field_errors_instead_of_server_errors(): void
    {
        Event::listen('eloquent.creating: '.SpMasterOption::class, function ($option) {
            if ($option->nama === 'Unique race audit') {
                DB::table('sp_master_options')->insert(['type' => $option->type, 'nama' => $option->nama, 'is_active' => true]);
            }
        });
        $this->postJson(route('sp-master-options.store'), ['type' => 'jabatan_sci', 'nama' => 'Unique race audit'])->assertUnprocessable()->assertJsonValidationErrors('nama');
        $this->assertDatabaseMissing('sp_master_options', ['nama' => 'Unique race audit']);
    }

    public function test_audit_failure_rolls_back_creates_updates_and_deletion_without_flushing_cache(): void
    {
        $admin = User::factory()->create(['role' => 'superadmin', 'department' => 'umum', 'password' => Hash::make('DeletePass!234')]);
        $option = $this->option();
        $key = 'sp_master_options:jabatan_sci:active_names';
        Cache::put($key, ['warm']);
        Event::listen('eloquent.creating: '.ActivityLog::class, function ($log) {
            if ($log->model_type === SpMasterOption::class) {
                throw new \RuntimeException('Synthetic audit failure');
            }
        });
        $this->postJson(route('sp-master-options.store'), ['type' => 'jabatan_sci', 'nama' => 'Audit failed create'])->assertStatus(500);
        $this->putJson(route('sp-master-options.update', $option), $this->payload($option, ['nama' => 'Audit failed update']))->assertStatus(500);
        $this->deleteJson(route('sp-master-options.destroy', $option), ['admin_password' => 'DeletePass!234', 'version' => SpMasterOptionVersion::of($option)])->assertStatus(500);
        $this->assertDatabaseMissing('sp_master_options', ['nama' => 'Audit failed create']);
        $this->assertDatabaseHas('sp_master_options', ['id' => $option->id, 'nama' => $option->nama]);
        $this->assertSame(['warm'], Cache::get($key));
    }

    public function test_disabled_or_locked_superadmin_credentials_cannot_authorize_deletion(): void
    {
        $option = $this->option();
        $admin = User::factory()->create(['email' => 'superadmin@sucofindo.com', 'role' => 'superadmin', 'department' => 'umum', 'is_active' => false, 'password' => Hash::make('DeletePass!234')]);
        $this->deleteJson(route('sp-master-options.destroy', $option), ['admin_password' => 'DeletePass!234'])->assertUnprocessable();
        $admin->update(['is_active' => true, 'locked_at' => now()]);
        $this->deleteJson(route('sp-master-options.destroy', $option), ['admin_password' => 'DeletePass!234'])->assertUnprocessable();
        $this->assertModelExists($option);
    }

    public function test_legacy_superadmin_email_cannot_bypass_current_role_or_department(): void
    {
        $option = $this->option();
        $admin = User::factory()->create(['email' => 'superadmin@sucofindo.com', 'role' => 'viewer', 'department' => 'umum', 'password' => Hash::make('DeletePass!234')]);
        $this->deleteJson(route('sp-master-options.destroy', $option), ['admin_password' => 'DeletePass!234'])->assertUnprocessable();
        $admin->update(['role' => 'superadmin', 'department' => 'operasional']);
        $this->deleteJson(route('sp-master-options.destroy', $option), ['admin_password' => 'DeletePass!234'])->assertUnprocessable();
        $this->assertModelExists($option);
    }

    public function test_delete_checks_fresh_admin_password_and_optional_row_version(): void
    {
        $option = $this->option();
        $admin = User::factory()->create(['role' => 'superadmin', 'department' => 'umum', 'password' => Hash::make('DeletePass!234')]);
        $this->deleteJson(route('sp-master-options.destroy', $option), ['admin_password' => 'DeletePass!234', 'version' => str_repeat('0', 64)])->assertConflict();
        $newHash = Hash::make('ChangedPass!234');
        $oldHash = $admin->password;
        Hash::partialMock()->shouldReceive('check')->andReturnUsing(function ($plain, $hash) use ($oldHash, $newHash, $admin) {
            if ($hash !== $oldHash) {
                return false;
            }
            DB::table('users')->where('id', $admin->id)->update(['password' => $newHash]);

            return true;
        });
        $this->deleteJson(route('sp-master-options.destroy', $option), ['admin_password' => 'DeletePass!234'])->assertUnprocessable()->assertJsonValidationErrors('admin_password');
        $this->assertModelExists($option);
    }

    public function test_delete_rejects_malformed_password_without_hash_checks(): void
    {
        $option = $this->option();
        Hash::partialMock()->shouldReceive('check')->never();
        foreach ([['array'], "invalid\0password", str_repeat('x', 73)] as $password) {
            $this->deleteJson(route('sp-master-options.destroy', $option), ['admin_password' => $password])->assertUnprocessable()->assertJsonValidationErrors('admin_password');
        }
        $this->assertModelExists($option);
    }

    public function test_budgets_are_isolated_and_viewers_and_other_departments_cannot_write(): void
    {
        $option = $this->option();
        $user = auth()->user();
        for ($i = 0; $i < 60; $i++) {
            RateLimiter::hit('sp-master-index:'.sha1((string) $user->id), 60);
        }
        $this->getJson(route('sp-master-options.index'))->assertTooManyRequests();
        $this->postJson(route('sp-master-options.store'), ['type' => 'jabatan_sci', 'nama' => 'Independent budget'])->assertCreated();
        $prefixes = [];
        foreach (['index', 'store', 'update', 'destroy'] as $action) {
            $route = app('router')->getRoutes()->getByName('sp-master-options.'.$action);
            $this->assertContains('readonly.block', $route->gatherMiddleware());
            $rule = collect($route->gatherMiddleware())->first(fn ($value) => str_starts_with($value, 'throttle:'));
            $prefixes[] = explode(',', $rule)[2];
        }
        $this->assertCount(4, array_unique($prefixes));
        foreach ([['viewer', 'umum'], ['superadmin', 'operasional']] as [$role, $department]) {
            $this->actingAs(User::factory()->create(compact('role', 'department')));
            $this->postJson(route('sp-master-options.store'), ['type' => 'jabatan_sci', 'nama' => 'Forbidden'])->assertForbidden();
            $this->putJson(route('sp-master-options.update', $option), $this->payload($option))->assertForbidden();
            $this->deleteJson(route('sp-master-options.destroy', $option), ['admin_password' => 'password'])->assertForbidden();
        }
    }
}
