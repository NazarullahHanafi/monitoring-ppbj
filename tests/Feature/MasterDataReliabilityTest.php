<?php

namespace Tests\Feature;

use App\Http\Controllers\MasterDataController;
use App\Models\MasterBuyer;
use App\Models\MasterMetodePengadaan;
use App\Models\MasterPenyediaEksternal;
use App\Models\MasterPortofolio;
use App\Models\User;
use Illuminate\Cache\Events\KeyForgotten;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Event;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class MasterDataReliabilityTest extends TestCase
{
    use RefreshDatabase;

    public static function types(): array
    {
        return [['buyer', MasterBuyer::class, 50, 'master_buyers'], ['metode_pengadaan', MasterMetodePengadaan::class, 50, 'master_metode_pengadaan'],
            ['portofolio', MasterPortofolio::class, 100, 'master_portofolios'], ['penyedia_eksternal', MasterPenyediaEksternal::class, 100, 'master_penyedia_eksternal']];
    }

    #[DataProvider('types')]
    public function test_limits_match_the_schema_contract_and_cache_is_invalidated_once(string $type, string $model, int $limit, string $key): void
    {
        $this->actingAs(User::factory()->create(['role' => 'superadmin', 'department' => 'umum']));
        $this->assertSame($limit, MasterDataController::NAME_LIMITS[$type]);
        foreach ([['nama' => str_repeat('x', $limit + 1)], ['nama' => ['invalid']], ['nama' => '   ']] as $payload) {
            $this->postJson('/master/'.$type, $payload)->assertUnprocessable()->assertJsonValidationErrors('nama');
        }
        $forgotten = [];
        Event::listen(KeyForgotten::class, function ($event) use (&$forgotten, $key) {
            if ($event->key === $key) {
                $forgotten[] = $event->key;
            }
        });
        Cache::put($key, ['old'], 300);
        $response = $this->postJson('/master/'.$type, ['nama' => ' '.str_repeat('a', $limit).' ']);
        $response->assertOk()->assertJsonPath('item.nama', str_repeat('a', $limit))->assertHeader('Cache-Control', 'no-store, private');
        $this->assertCount(1, $forgotten);
        $this->assertFalse(Cache::has($key));
        $id = $response->json('item.id');
        $this->getJson('/master/'.$type)->assertJsonFragment(['id' => $id, 'nama' => str_repeat('a', $limit)]);
        $this->putJson('/master/'.$type.'/'.$id, ['nama' => str_repeat('b', $limit + 1)])->assertUnprocessable();
        $this->assertSame(str_repeat('a', $limit), $model::findOrFail($id)->nama);
        $forgotten = [];
        Cache::put($key, ['old'], 300);
        $this->putJson('/master/'.$type.'/'.$id, ['nama' => 'A & B "Quote"'])->assertOk()->assertJsonPath('item.nama', 'A & B "Quote"');
        $this->assertCount(1, $forgotten);
        $forgotten = [];
        Cache::put($key, ['old'], 300);
        $this->deleteJson('/master/'.$type.'/'.$id)->assertOk();
        $this->assertCount(1, $forgotten);
        $this->getJson('/master/'.$type)->assertExactJson([]);
    }

    public function test_permissions_and_read_only_stay_enforced(): void
    {
        $row = MasterBuyer::create(['nama' => 'Original']);
        foreach ([['umum', 'user'], ['umum', 'viewer'], ['operasional', 'superadmin']] as [$department, $role]) {
            $this->actingAs(User::factory()->create(compact('department', 'role')));
            $this->postJson('/master/buyer', ['nama' => 'Other'])->assertForbidden();
            $this->putJson('/master/buyer/'.$row->id, ['nama' => 'Other'])->assertForbidden();
            $this->deleteJson('/master/buyer/'.$row->id)->assertForbidden();
        }
        $this->actingAs(User::factory()->create(['role' => 'superadmin', 'department' => 'umum']));
        Cache::put('simonpr:read_only_mode', true);
        $this->postJson('/master/buyer', ['nama' => 'Other'])->assertForbidden();
        $this->putJson('/master/buyer/'.$row->id, ['nama' => 'Other'])->assertForbidden();
        $this->deleteJson('/master/buyer/'.$row->id)->assertForbidden();
        $this->getJson('/master/buyer')->assertOk();
        $this->assertSame('Original', $row->fresh()->nama);
    }

    public function test_limits_do_not_share_budgets_and_malformed_routes_are_safe(): void
    {
        $this->actingAs(User::factory()->create(['role' => 'superadmin', 'department' => 'umum']));
        $row = MasterBuyer::create(['nama' => 'Original']);
        $prefixes = [];
        foreach (['master-data.index' => 60, 'master-data.store' => 20, 'master-data.update' => 20, 'master-data.destroy' => 10] as $name => $limit) {
            $rule = collect(app('router')->getRoutes()->getByName($name)->gatherMiddleware())->first(fn ($item) => str_starts_with($item, 'throttle:'));
            [$actual, $minutes, $prefix] = explode(',', substr($rule, 9));
            $this->assertSame((string) $limit, $actual);
            $this->assertSame('1', $minutes);
            $this->assertNotEmpty($prefix);
            $this->assertNotContains($prefix, $prefixes);
            $prefixes[] = $prefix;
        }
        for ($i = 0; $i < 20; $i++) {
            $this->postJson('/master/buyer', ['nama' => ''])->assertUnprocessable();
        }
        $this->postJson('/master/buyer', ['nama' => ''])->assertTooManyRequests();
        $this->getJson('/master/buyer')->assertOk();
        $this->putJson('/master/buyer/'.$row->id, ['nama' => 'New'])->assertOk();
        $this->deleteJson('/master/buyer/'.$row->id)->assertOk();
        $this->putJson('/master/buyer/not-a-number', ['nama' => 'Other'])->assertNotFound();
        $this->deleteJson('/master/buyer/not-a-number')->assertNotFound();
        $this->putJson('/master/buyer/999999999999999999999999', ['nama' => 'Other'])->assertNotFound();
        $this->deleteJson('/master/buyer/999999999999999999999999')->assertNotFound();
        $this->getJson('/master/not-a-type')->assertNotFound();
    }

    public function test_page_exposes_one_master_controller_and_versioned_asset(): void
    {
        $this->actingAs(User::factory()->create(['role' => 'superadmin', 'department' => 'umum']))
            ->get(route('ppbj.index'))->assertOk()
            ->assertSee('master-data.js?v='.filemtime(public_path('assets/ppbj/master-data.js')), false)
            ->assertSee('"masterNameLimits":{"buyer":50', false);
        $this->assertStringNotContainsString('window.openMaster =', file_get_contents(public_path('assets/ppbj/ppbj.js')));
    }
}
