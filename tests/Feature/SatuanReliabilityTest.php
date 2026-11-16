<?php

namespace Tests\Feature;

use App\Http\Controllers\SatuanController;
use App\Models\Satuan;
use App\Models\User;
use Illuminate\Cache\Events\KeyForgotten;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class SatuanReliabilityTest extends TestCase
{
    use RefreshDatabase;

    private function loginUmum(): void
    {
        $this->actingAs(User::factory()->create(['role' => 'user', 'department' => 'umum']));
    }

    public function test_zero_note_and_trimmed_values_survive_create_and_update_with_one_cache_invalidation(): void
    {
        $this->loginUmum();
        $forgotten = [];
        Event::listen(KeyForgotten::class, function ($event) use (&$forgotten) {
            if (in_array($event->key, ['satuans:all', 'satuans:index'], true)) {
                $forgotten[] = $event->key;
            }
        });
        Cache::put('satuans:all', ['old'], 300);
        Cache::put('satuans:index', ['old'], 300);
        $response = $this->postJson('/satuan', ['nama_satuan' => ' Roll ', 'keterangan' => ' 0 ']);
        $response->assertCreated()->assertJsonPath('satuan.nama_satuan', 'Roll')->assertJsonPath('satuan.keterangan', '0')
            ->assertHeader('Cache-Control', 'no-store, private');
        $this->assertSame(['satuans:all', 'satuans:index'], $forgotten);
        $id = $response->json('satuan.id');
        $forgotten = [];
        Cache::put('satuans:all', ['old'], 300);
        Cache::put('satuans:index', ['old'], 300);
        $this->putJson('/satuan/'.$id, ['nama_satuan' => ' Roll & "Quote" ', 'keterangan' => '0'])
            ->assertOk()->assertJsonPath('satuan.keterangan', '0')->assertHeader('Cache-Control', 'no-store, private');
        $this->assertSame(['satuans:all', 'satuans:index'], $forgotten);
        $this->assertDatabaseHas('satuans', ['id' => $id, 'nama_satuan' => 'Roll & "Quote"', 'keterangan' => '0']);
        $forgotten = [];
        Cache::put('satuans:all', ['old'], 300);
        Cache::put('satuans:index', ['old'], 300);
        $this->deleteJson('/satuan/'.$id)->assertOk()->assertJsonPath('success', true)->assertHeader('Cache-Control', 'no-store, private');
        $this->assertSame(['satuans:all', 'satuans:index'], $forgotten);
        $this->assertDatabaseMissing('satuans', ['id' => $id]);
    }

    public function test_database_race_on_create_is_a_field_error_instead_of_server_error(): void
    {
        $this->loginUmum();
        Event::listen('eloquent.creating: '.Satuan::class, function (Satuan $row) {
            if ($row->nama_satuan === 'Concurrent Roll') {
                DB::table('satuans')->insert(['nama_satuan' => $row->nama_satuan, 'keterangan' => 'Competing writer']);
            }
        });
        $this->postJson('/satuan', ['nama_satuan' => 'Concurrent Roll'])->assertUnprocessable()->assertJsonValidationErrors('nama_satuan');
        $this->assertSame(1, Satuan::where('nama_satuan', 'Concurrent Roll')->count());
        $this->assertSame('Competing writer', Satuan::where('nama_satuan', 'Concurrent Roll')->value('keterangan'));
    }

    public function test_database_race_on_update_preserves_the_original_row(): void
    {
        $this->loginUmum();
        $original = Satuan::create(['nama_satuan' => 'Original Roll', 'keterangan' => 'Original note']);
        Event::listen('eloquent.updating: '.Satuan::class, function (Satuan $row) {
            if ($row->nama_satuan === 'Concurrent Update') {
                DB::table('satuans')->insert(['nama_satuan' => $row->nama_satuan]);
            }
        });
        $this->putJson('/satuan/'.$original->id, ['nama_satuan' => 'Concurrent Update', 'keterangan' => 'Other'])
            ->assertUnprocessable()->assertJsonValidationErrors('nama_satuan');
        $this->assertDatabaseHas('satuans', ['id' => $original->id, 'nama_satuan' => 'Original Roll', 'keterangan' => 'Original note']);
    }

    public function test_invalid_values_do_not_change_saved_units_and_native_posts_still_redirect(): void
    {
        $this->loginUmum();
        $row = Satuan::create(['nama_satuan' => 'Original']);
        foreach ([['nama_satuan' => '   '], ['nama_satuan' => ['bad']], ['nama_satuan' => str_repeat('x', 101)],
            ['nama_satuan' => 'Unit'], ['nama_satuan' => 'New', 'keterangan' => str_repeat('x', 256)]] as $payload) {
            $this->putJson('/satuan/'.$row->id, $payload)->assertUnprocessable();
        }
        $this->assertSame('Original', $row->fresh()->nama_satuan);
        $this->post('/satuan', ['nama_satuan' => str_repeat('a', 100), 'keterangan' => str_repeat('b', 255)])
            ->assertRedirect(route('satuan.index'))->assertSessionHas('success');
        $this->putJson('/satuan/'.$row->id, ['nama_satuan' => 'New', 'keterangan' => '   '])->assertOk()->assertJsonPath('satuan.keterangan', null);
    }

    public function test_directory_projects_only_needed_fields_and_warm_requests_use_no_database_queries(): void
    {
        $controller = app(SatuanController::class);
        $sql = [];
        DB::listen(function ($event) use (&$sql) {
            $sql[] = $event->sql;
        });
        foreach (['index', 'list'] as $method) {
            $sql = [];
            $cold = $controller->$method();
            $this->assertCount(1, $sql);
            if ($method === 'index') {
                $this->assertSame(['id', 'nama_satuan', 'keterangan'], array_keys($cold->getData()['satuans']->first()->getAttributes()));
            } else {
                $this->assertSame('no-store, private', $cold->headers->get('Cache-Control'));
            }
            $sql = [];
            $controller->$method();
            $this->assertSame([], $sql);
        }
    }

    public function test_edit_text_is_stored_as_escaped_data_and_back_link_stays_internal(): void
    {
        $this->loginUmum();
        Satuan::create(['nama_satuan' => 'A & "Quote"', 'keterangan' => "First\nSecond <script>alert(1)</script>"]);
        $page = $this->withHeader('Referer', 'https://untrusted.example/login')->get('/satuan');
        $page->assertOk()->assertSee('data-satuan-edit', false)->assertSee('data-name="A &amp; &quot;Quote&quot;"', false)
            ->assertSee('Second &lt;script&gt;alert(1)&lt;/script&gt;', false)->assertDontSee('openEditModal(', false)
            ->assertDontSee('href="https://untrusted.example/login"', false)->assertSee('maxlength="100"', false);
    }

    public function test_roles_and_read_only_remain_enforced_for_all_writes(): void
    {
        $row = Satuan::create(['nama_satuan' => 'Original']);
        foreach ([['operasional', 'user'], ['umum', 'viewer']] as [$department, $role]) {
            $this->actingAs(User::factory()->create(compact('department', 'role')));
            $this->postJson('/satuan', ['nama_satuan' => 'Other'])->assertForbidden();
            $this->putJson('/satuan/'.$row->id, ['nama_satuan' => 'Other'])->assertForbidden();
            $this->deleteJson('/satuan/'.$row->id)->assertForbidden();
        }
        $this->loginUmum();
        Cache::put('simonpr:read_only_mode', true);
        $this->postJson('/satuan', ['nama_satuan' => 'Other'])->assertForbidden();
        $this->putJson('/satuan/'.$row->id, ['nama_satuan' => 'Other'])->assertForbidden();
        $this->deleteJson('/satuan/'.$row->id)->assertForbidden();
        $this->getJson('/satuan/list')->assertOk();
        $this->assertSame('Original', $row->fresh()->nama_satuan);
    }

    public function test_action_budgets_are_independent_and_invalid_ids_do_not_reach_binding(): void
    {
        $this->loginUmum();
        $row = Satuan::create(['nama_satuan' => 'Original']);
        $prefixes = [];
        foreach (['index' => 60, 'store' => 30, 'update' => 30, 'destroy' => 20, 'list' => 90] as $name => $limit) {
            $route = app('router')->getRoutes()->getByName('satuan.'.$name);
            $rule = collect($route->gatherMiddleware())->first(fn ($item) => str_starts_with($item, 'throttle:'));
            [$actual, $minutes, $prefix] = explode(',', substr($rule, 9));
            $this->assertSame((string) $limit, $actual);
            $this->assertSame('1', $minutes);
            $this->assertNotEmpty($prefix);
            $this->assertNotContains($prefix, $prefixes);
            $prefixes[] = $prefix;
        }
        for ($i = 0; $i < 30; $i++) {
            $this->postJson('/satuan', ['nama_satuan' => ''])->assertUnprocessable();
        }
        $this->postJson('/satuan', ['nama_satuan' => ''])->assertTooManyRequests();
        $this->getJson('/satuan/list')->assertOk();
        $this->putJson('/satuan/'.$row->id, ['nama_satuan' => 'Renamed'])->assertOk();
        $this->deleteJson('/satuan/'.$row->id)->assertOk();
        $this->putJson('/satuan/not-a-number', ['nama_satuan' => 'Other'])->assertNotFound();
    }
}
