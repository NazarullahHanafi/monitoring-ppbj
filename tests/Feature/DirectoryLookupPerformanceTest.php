<?php

namespace Tests\Feature;

use App\Models\MasterBuyer;
use App\Models\MasterMetodePengadaan;
use App\Models\MasterPenyediaEksternal;
use App\Models\MasterPortofolio;
use App\Models\Satuan;
use App\Models\Sp;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class DirectoryLookupPerformanceTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        $admin = User::factory()->create(['department' => 'umum', 'role' => 'superadmin']);
        $this->actingAs($admin);

        return $admin;
    }

    public function test_user_filters_are_validated_before_query_or_csv_and_authorization_is_preserved(): void
    {
        $this->admin();
        foreach ([['search' => ['bad']], ['search' => str_repeat('a', 161)], ['direction' => 'sideways'],
            ['sort' => 'password'], ['role' => ['user']], ['department' => 'unknown'], ['per_page' => 100000], ['page' => -1]] as $input) {
            foreach (['users.index', 'users.export'] as $route) {
                $this->getJson(route($route, $input))->assertUnprocessable();
            }
        }
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']));
        $this->getJson(route('users.index'))->assertForbidden();
        $this->getJson(route('users.export'))->assertForbidden();
        $this->actingAs(User::factory()->create(['department' => 'operasional', 'role' => 'superadmin']));
        $this->getJson(route('users.index'))->assertForbidden();
        $this->getJson(route('users.export'))->assertForbidden();
    }

    public function test_user_export_matches_literal_search_and_reads_bounded_keyset_batches(): void
    {
        $this->admin();
        $rows = [];
        foreach (range(1, 503) as $number) {
            $rows[] = ['name' => '=Audit 100%_'.$number, 'email' => 'batch'.$number.'@example.test',
                'password' => 'unused', 'department' => 'operasional', 'role' => 'user', 'created_at' => now(), 'updated_at' => now()];
        }
        DB::table('users')->insert($rows);
        User::factory()->create(['name' => 'Audit 1000X', 'department' => 'operasional', 'role' => 'user']);
        User::factory()->create(['name' => 'Audit 100%_ wrong role', 'department' => 'operasional', 'role' => 'viewer']);
        $filter = ['search' => ' 100%_ ', 'department' => 'operasional', 'role' => 'user'];
        $list = $this->get(route('users.index', $filter))->assertOk()->viewData('users');
        $this->assertSame(503, $list->total());
        $response = $this->get(route('users.export', $filter))->assertOk();
        User::factory()->create(['name' => 'Late 100%_', 'department' => 'operasional', 'role' => 'user']);
        DB::flushQueryLog();
        DB::enableQueryLog();
        $csv = $response->streamedContent();
        $queries = collect(DB::getQueryLog())->filter(fn ($query) => str_contains($query['query'], 'from "users"'));
        DB::disableQueryLog();
        $this->assertCount(2, $queries);
        foreach ($queries as $query) {
            $this->assertStringNotContainsString('offset', strtolower($query['query']));
            $this->assertStringContainsString('limit 500', strtolower($query['query']));
        }
        $this->assertSame(503, substr_count($csv, "'=Audit 100%_"));
        $this->assertStringNotContainsString('Late 100%_', $csv);
        $this->assertStringNotContainsString('1000X', $csv);
        $this->assertStringNotContainsString('wrong role', $csv);
        $this->assertStringNotContainsString('unused', $csv);
    }

    public function test_user_pagination_preserves_only_valid_filters_and_drops_old_page_on_size_change(): void
    {
        $this->admin();
        User::factory()->count(27)->create(['department' => 'operasional', 'role' => 'user']);
        $response = $this->get(route('users.index', ['department' => 'operasional', 'per_page' => 10, 'page' => 2, 'unrelated' => ['nested']]))->assertOk();
        $users = $response->viewData('users');
        $this->assertSame(2, $users->currentPage());
        $this->assertCount(10, $users->items());
        $this->assertSame(range(12, 21), $users->pluck('id')->all());
        $html = $response->getContent();
        $this->assertStringContainsString('name="department" value="operasional"', $html);
        $this->assertStringNotContainsString('name="page"', $html);
        $this->assertStringNotContainsString('name="unrelated"', $html);
    }

    public function test_vendor_lookups_validate_zero_and_special_characters_and_evict_default_cache(): void
    {
        $this->admin();
        $target = Vendor::create(['nama_vendor' => 'A 100%_! 0', 'is_active' => true]);
        Vendor::create(['nama_vendor' => 'B ordinary', 'is_active' => true]);
        Vendor::create(['nama_vendor' => 'C 100%_! inactive', 'is_active' => false]);
        foreach (['0', '100%', '_', '!'] as $term) {
            $this->getJson(route('vendor.search', ['q' => ' '.$term.' ']))->assertOk()->assertJsonCount(1)->assertJsonPath('0.id', $target->id);
        }
        foreach ([['bad'], str_repeat('a', 161)] as $term) {
            $this->getJson(route('vendor.search', ['q' => $term]))->assertUnprocessable()->assertJsonValidationErrors('q');
        }
        $this->getJson(route('vendor.search'))->assertOk()->assertJsonCount(2)->assertHeader('Cache-Control', 'no-store, private');
        DB::flushQueryLog();
        DB::enableQueryLog();
        $this->getJson(route('vendor.search'))->assertOk();
        $this->assertFalse(collect(DB::getQueryLog())->contains(fn ($query) => str_contains($query['query'], 'from "vendors"')));
        DB::disableQueryLog();
        $target->update(['is_active' => false]);
        $this->getJson(route('vendor.search'))->assertOk()->assertJsonCount(1)->assertJsonMissing(['id' => $target->id]);
        $new = Vendor::create(['nama_vendor' => 'D new', 'is_active' => true]);
        $this->getJson(route('vendor.search'))->assertJsonFragment(['id' => $new->id]);
        $new->delete();
        $this->getJson(route('vendor.search'))->assertJsonMissing(['id' => $new->id]);
    }

    public function test_vendor_literal_list_search_and_one_stats_aggregate_remain_correct_on_changes(): void
    {
        $this->admin();
        $this->get(route('vendor.index'))->assertOk()->assertViewHas('stats', ['total' => 0, 'active' => 0, 'inactive' => 0, 'dengan_sp' => 0]);
        $vendor = Vendor::create(['nama_vendor' => 'Vendor %_!', 'is_active' => true]);
        Vendor::create(['nama_vendor' => 'Vendor Another', 'is_active' => false]);
        DB::flushQueryLog();
        DB::enableQueryLog();
        $page = $this->get(route('vendor.index', ['search' => '%_!']))->assertOk();
        $queries = collect(DB::getQueryLog())->filter(fn ($query) => str_contains($query['query'], 'as active'));
        DB::disableQueryLog();
        $this->assertCount(1, $queries);
        $this->assertSame([$vendor->id], $page->viewData('vendors')->modelKeys());
        $this->assertSame(['total' => 2, 'active' => 1, 'inactive' => 1, 'dengan_sp' => 0], $page->viewData('stats'));
        $sp = Sp::create(['nomor_sp' => 'AUDIT/STATS', 'sequence_number' => 1, 'nama_vendor' => $vendor->nama_vendor, 'deskripsi_pengadaan' => 'Audit', 'pic' => 'Audit']);
        $this->get(route('vendor.index'))->assertViewHas('stats', ['total' => 2, 'active' => 1, 'inactive' => 1, 'dengan_sp' => 1]);
        $sp->delete();
        $this->get(route('vendor.index'))->assertViewHas('stats', ['total' => 2, 'active' => 1, 'inactive' => 1, 'dengan_sp' => 0]);
        $sp->restore();
        $this->get(route('vendor.index'))->assertViewHas('stats', ['total' => 2, 'active' => 1, 'inactive' => 1, 'dengan_sp' => 1]);
    }

    public function test_vendor_rename_rolls_back_if_related_sp_update_fails(): void
    {
        $this->admin();
        $vendor = Vendor::create(['nama_vendor' => 'Original vendor', 'is_active' => true]);
        $sp = Sp::create(['nomor_sp' => 'AUDIT/ATOMIC', 'sequence_number' => 1, 'nama_vendor' => $vendor->nama_vendor, 'deskripsi_pengadaan' => 'Audit', 'pic' => 'Audit']);
        DB::unprepared("CREATE TEMP TRIGGER prevent_vendor_rename BEFORE UPDATE OF nama_vendor ON sps BEGIN SELECT RAISE(ABORT, 'Simulated update failure'); END");
        $this->withoutExceptionHandling();
        try {
            $this->putJson(route('vendor.update', $vendor), ['nama_vendor' => 'Changed vendor', 'is_active' => true]);
            $this->fail('The simulated related-row failure must abort the transaction.');
        } catch (QueryException) {
            $this->assertSame('Original vendor', $vendor->fresh()->nama_vendor);
            $this->assertSame('Original vendor', $sp->fresh()->nama_vendor);
        } finally {
            DB::unprepared('DROP TRIGGER prevent_vendor_rename');
        }
        $this->putJson(route('vendor.update', $vendor), ['nama_vendor' => 'Changed vendor', 'is_active' => true])->assertOk()->assertJsonPath('nama_vendor', 'Changed vendor');
        $this->assertSame('Changed vendor', $sp->fresh()->nama_vendor);
    }

    public function test_master_and_unit_dropdowns_use_cache_and_refresh_immediately_on_model_changes(): void
    {
        $this->admin();
        foreach (['buyer' => MasterBuyer::class, 'portofolio' => MasterPortofolio::class,
            'metode_pengadaan' => MasterMetodePengadaan::class, 'penyedia_eksternal' => MasterPenyediaEksternal::class] as $type => $model) {
            $item = $model::create(['nama' => 'Original']);
            $this->getJson('/master/'.$type)->assertOk()->assertJsonPath('0.nama', 'Original');
            DB::flushQueryLog();
            DB::enableQueryLog();
            $this->getJson('/master/'.$type)->assertOk();
            $this->assertFalse(collect(DB::getQueryLog())->contains(fn ($query) => str_contains($query['query'], 'from "'.(new $model)->getTable().'"')));
            DB::disableQueryLog();
            Cache::put('master_buyers_for_user_mapping', ['Original'], 300);
            $item->update(['nama' => 'Fresh']);
            if ($type === 'buyer') {
                $this->assertFalse(Cache::has('master_buyers_for_user_mapping'));
            }
            $this->getJson('/master/'.$type)->assertJsonPath('0.nama', 'Fresh');
            $item->delete();
            $this->getJson('/master/'.$type)->assertJsonCount(0);
        }
        Satuan::query()->delete();
        Cache::forget('satuans:all');
        $unit = Satuan::create(['nama_satuan' => 'Unit']);
        $this->getJson(route('satuan.list'))->assertOk()->assertExactJson(['Unit']);
        DB::flushQueryLog();
        DB::enableQueryLog();
        $this->getJson(route('satuan.list'))->assertOk();
        $this->assertFalse(collect(DB::getQueryLog())->contains(fn ($query) => str_contains($query['query'], 'from "satuans"')));
        DB::disableQueryLog();
        $unit->update(['nama_satuan' => 'Box']);
        $this->getJson(route('satuan.list'))->assertExactJson(['Box']);
        $unit->delete();
        $this->getJson(route('satuan.list'))->assertExactJson([]);
    }

    public function test_procurement_read_budgets_cannot_consume_export_or_action_budgets(): void
    {
        $admin = $this->admin();
        for ($count = 0; $count < 60; $count++) {
            RateLimiter::hit('vendor-lookup:'.sha1((string) $admin->id), 60);
        }
        $this->getJson(route('vendor.search'))->assertStatus(429)->assertHeader('Retry-After');
        $this->getJson(route('sp.export'))->assertOk();
        $this->getJson(route('spph.export'))->assertOk();
        $this->getJson(route('sp.suggest-nomor'))->assertOk();
        $prefixes = [];
        foreach (app('router')->getRoutes() as $route) {
            if (! str_starts_with($route->uri(), 'sp/') && ! str_starts_with($route->uri(), 'spph/')) {
                continue;
            }
            foreach ($route->gatherMiddleware() as $middleware) {
                if (! preg_match('/^throttle:\d+,1/', $middleware)) {
                    continue;
                }
                $prefix = explode(',', $middleware)[2] ?? '';
                $this->assertNotSame('', $prefix, $route->uri());
                $this->assertNotContains($prefix, $prefixes, $route->uri());
                $prefixes[] = $prefix;
            }
        }
        $this->assertCount(38, $prefixes);
    }
}
