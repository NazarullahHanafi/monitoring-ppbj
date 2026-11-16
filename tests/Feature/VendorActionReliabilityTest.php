<?php

namespace Tests\Feature;

use App\Models\Sp;
use App\Models\User;
use App\Models\Vendor;
use App\Models\VendorDocument;
use Illuminate\Cache\Events\KeyForgotten;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Str;
use Tests\TestCase;

class VendorActionReliabilityTest extends TestCase
{
    use RefreshDatabase;

    private const KEYS = ['ppbj:vendor-filter:v1', 'vendors:active', 'vendor:stats', 'vendors:lookup:default:v1'];

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']));
    }

    private function seedCache(): void
    {
        foreach (self::KEYS as $key) {
            Cache::put($key, ['old'], 300);
        }
    }

    public function test_repeated_explicit_status_requests_do_not_flip_state_write_again_or_flush_cache(): void
    {
        $vendor = Vendor::create(['nama_vendor' => 'Status audit', 'is_active' => true]);
        $writes = 0;
        DB::listen(function ($event) use (&$writes) {
            if (preg_match('/^update ["`]vendors["`]/i', $event->sql)) {
                $writes++;
            }
        });
        foreach ([false, true] as $active) {
            $this->postJson(route('vendor.toggle', $vendor), ['is_active' => $active])->assertOk()
                ->assertJsonPath('is_active', $active)->assertJsonPath('changed', true)->assertHeader('Cache-Control', 'no-store, private');
            $timestamp = $vendor->fresh()->getRawOriginal('updated_at');
            $this->seedCache();
            $before = $writes;
            $this->travel(2)->seconds();
            for ($i = 0; $i < 3; $i++) {
                $this->postJson(route('vendor.toggle', $vendor), ['is_active' => $active])->assertOk()->assertJsonPath('changed', false);
            }
            $this->assertSame($before, $writes);
            $this->assertSame($timestamp, $vendor->fresh()->getRawOriginal('updated_at'));
            foreach (self::KEYS as $key) {
                $this->assertSame(['old'], Cache::get($key));
            }
        }
        $this->assertSame(2, $writes);
    }

    public function test_old_forms_and_malformed_status_cannot_accidentally_toggle_a_vendor(): void
    {
        $vendor = Vendor::create(['nama_vendor' => 'Original', 'is_active' => true]);
        foreach ([[], ['is_active' => null], ['is_active' => 'yes'], ['is_active' => ['0']]] as $payload) {
            $this->postJson(route('vendor.toggle', $vendor), $payload)->assertUnprocessable()->assertJsonValidationErrors('is_active');
        }
        $this->from('/vendors')->post(route('vendor.toggle', $vendor))->assertRedirect('/vendors')->assertSessionHasErrors('is_active');
        $this->assertTrue($vendor->fresh()->is_active);
        foreach (['not-an-id', '0', '999999999999999999999999'] as $id) {
            $this->postJson('/vendors/'.$id.'/toggle', ['is_active' => false])->assertNotFound();
        }
    }

    public function test_cache_invalidation_happens_once_after_commit_and_never_on_rollback(): void
    {
        $vendor = Vendor::create(['nama_vendor' => 'Original']);
        $this->seedCache();
        $forgotten = [];
        Event::listen(KeyForgotten::class, function ($event) use (&$forgotten) {
            if (in_array($event->key, self::KEYS, true)) {
                $forgotten[] = $event->key;
            }
        });
        DB::transaction(function () use ($vendor) {
            $vendor->update(['alamat' => 'Committed address']);
            foreach (self::KEYS as $key) {
                $this->assertSame(['old'], Cache::get($key));
            }
        });
        $this->assertSame(self::KEYS, $forgotten);
        $this->seedCache();
        $forgotten = [];
        try {
            DB::transaction(function () use ($vendor) {
                $vendor->update(['alamat' => 'Rolled back']);
                throw new \RuntimeException('Synthetic rollback');
            });
        } catch (\RuntimeException $error) {
            $this->assertSame('Synthetic rollback', $error->getMessage());
        }
        $this->assertSame([], $forgotten);
        $this->assertSame('Committed address', $vendor->fresh()->alamat);
        foreach (self::KEYS as $key) {
            $this->assertSame(['old'], Cache::get($key));
        }
        $vendor->refresh()->save();
        $this->assertSame([], $forgotten);
    }

    public function test_zero_fields_and_schema_limits_survive_create_and_update(): void
    {
        $fields = array_fill_keys(['alamat', 'telepon', 'fax', 'npwp', 'direktur', 'jabatan'], '0');
        $response = $this->postJson('/vendors', ['nama_vendor' => ' Zero vendor ', 'is_active' => false] + $fields)
            ->assertCreated()->assertHeader('Cache-Control', 'no-store, private');
        $id = $response->json('id');
        $this->assertDatabaseHas('vendors', ['id' => $id, 'nama_vendor' => 'Zero vendor'] + $fields);
        $this->patchJson('/vendors/'.$id, ['nama_vendor' => 'Zero vendor renamed', 'is_active' => false] + $fields)
            ->assertOk()->assertHeader('Cache-Control', 'no-store, private');
        $this->assertDatabaseHas('vendors', ['id' => $id] + $fields);
        $this->putJson('/vendors/'.$id, ['nama_vendor' => str_repeat('x', 256)])->assertUnprocessable();
        $this->putJson('/vendors/'.$id, ['nama_vendor' => 'Other', 'alamat' => str_repeat('x', 501)])->assertUnprocessable();
        $this->assertSame('Zero vendor renamed', Vendor::findOrFail($id)->nama_vendor);
    }

    public function test_unique_conflicts_after_validation_are_field_errors_and_updates_roll_back(): void
    {
        Event::listen('eloquent.creating: '.Vendor::class, function (Vendor $row) {
            if ($row->nama_vendor === 'Concurrent create') {
                DB::table('vendors')->insert(['nama_vendor' => $row->nama_vendor]);
            }
        });
        $this->postJson('/vendors', ['nama_vendor' => 'Concurrent create'])->assertUnprocessable()->assertJsonValidationErrors('nama_vendor')->assertDontSee('SQLSTATE');
        $vendor = Vendor::create(['nama_vendor' => 'Original', 'alamat' => 'Original address']);
        Event::listen('eloquent.updating: '.Vendor::class, function (Vendor $row) {
            if ($row->nama_vendor === 'Concurrent update') {
                DB::table('vendors')->insert(['nama_vendor' => $row->nama_vendor]);
            }
        });
        $this->putJson('/vendors/'.$vendor->id, ['nama_vendor' => 'Concurrent update', 'alamat' => 'Other'])
            ->assertUnprocessable()->assertJsonValidationErrors('nama_vendor')->assertDontSee('SQLSTATE');
        $this->assertDatabaseHas('vendors', ['id' => $vendor->id, 'nama_vendor' => 'Original', 'alamat' => 'Original address']);
    }

    public function test_delete_preserves_vendors_with_sp_or_pending_cloud_documents(): void
    {
        $spVendor = Vendor::create(['nama_vendor' => 'SP vendor']);
        Sp::create(['nomor_sp' => 'AUDIT/VENDOR', 'sequence_number' => 1, 'nama_vendor' => $spVendor->nama_vendor, 'deskripsi_pengadaan' => 'Audit', 'pic' => 'Audit']);
        $this->deleteJson(route('vendor.destroy', $spVendor))->assertUnprocessable()->assertJsonValidationErrors('error');
        $cloudVendor = Vendor::create(['nama_vendor' => 'Cloud vendor']);
        $uuid = (string) Str::uuid();
        VendorDocument::create(['id' => $uuid, 'vendor_id' => $cloudVendor->id, 'type' => 'npwp', 'title' => 'Synthetic',
            'original_name' => 'synthetic.pdf', 'mime' => 'application/pdf', 'size' => 1, 'checksum' => str_repeat('a', 64), 'cloud_path' => 'synthetic/'.$uuid]);
        $this->deleteJson(route('vendor.destroy', $cloudVendor))->assertUnprocessable()->assertJsonValidationErrors('error');
        $this->assertDatabaseHas('vendors', ['id' => $spVendor->id]);
        $this->assertDatabaseHas('vendors', ['id' => $cloudVendor->id]);
        $empty = Vendor::create(['nama_vendor' => 'Empty vendor']);
        $this->deleteJson(route('vendor.destroy', $empty))->assertOk()->assertJsonPath('success', true)->assertHeader('Cache-Control', 'no-store, private');
        $this->assertDatabaseMissing('vendors', ['id' => $empty->id]);
    }

    public function test_roles_read_only_filters_and_isolated_action_budgets(): void
    {
        $vendor = Vendor::create(['nama_vendor' => 'Original']);
        foreach ([['operasional', 'user'], ['umum', 'viewer']] as [$department, $role]) {
            $this->actingAs(User::factory()->create(compact('department', 'role')));
            $this->postJson('/vendors', ['nama_vendor' => 'Other'])->assertForbidden();
            $this->putJson('/vendors/'.$vendor->id, ['nama_vendor' => 'Other'])->assertForbidden();
            $this->deleteJson('/vendors/'.$vendor->id)->assertForbidden();
            $this->postJson(route('vendor.toggle', $vendor), ['is_active' => false])->assertForbidden();
        }
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']));
        Cache::put('simonpr:read_only_mode', true);
        $this->postJson(route('vendor.toggle', $vendor), ['is_active' => false])->assertForbidden();
        $this->assertTrue($vendor->fresh()->is_active);
        Cache::forget('simonpr:read_only_mode');
        foreach ([['bad'], 0, 1000001] as $page) {
            $this->getJson(route('vendor.index', ['page' => $page]))->assertUnprocessable()->assertJsonValidationErrors('page');
        }
        $prefixes = [];
        foreach (['index' => 60, 'store' => 20, 'update' => 30, 'destroy' => 10, 'toggle' => 30, 'search' => 60] as $name => $limit) {
            $route = app('router')->getRoutes()->getByName('vendor.'.$name);
            $rule = collect($route->gatherMiddleware())->first(fn ($item) => str_starts_with($item, 'throttle:'));
            [$actual, $minutes, $prefix] = explode(',', substr($rule, 9));
            $this->assertSame((string) $limit, $actual);
            $this->assertSame('1', $minutes);
            $this->assertNotEmpty($prefix);
            $this->assertNotContains($prefix, $prefixes);
            $prefixes[] = $prefix;
        }
        for ($i = 0; $i < 20; $i++) {
            $this->postJson('/vendors', ['nama_vendor' => ''])->assertUnprocessable();
        }
        $this->postJson('/vendors', ['nama_vendor' => ''])->assertTooManyRequests();
        $this->getJson(route('vendor.search'))->assertOk();
        $this->postJson(route('vendor.toggle', $vendor), ['is_active' => false])->assertOk();
    }
}
