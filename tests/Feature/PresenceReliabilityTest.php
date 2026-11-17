<?php

namespace Tests\Feature;

use App\Http\Controllers\PresenceController;
use App\Models\User;
use Illuminate\Cache\Events\RetrievingManyKeys;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class PresenceReliabilityTest extends TestCase
{
    use RefreshDatabase;

    private User $actor;

    protected function setUp(): void
    {
        parent::setUp();
        Http::preventStrayRequests();
        $this->actor = User::factory()->create(['name' => 'Presence Tester', 'department' => 'umum', 'role' => 'user']);
        $this->actingAs($this->actor);
        Cache::put('presence:last_seen_update:'.$this->actor->id, true, 60);
    }

    private function request(array $input = []): Request
    {
        $request = Request::create('/presence/heartbeat', 'POST', $input);
        $request->setUserResolver(fn () => $this->actor);
        $request->headers->set('Accept', 'application/json');
        $this->app->instance('request', $request);

        return $request;
    }

    private function row(int $id, array $extra = []): array
    {
        return array_replace(['id' => $id, 'name' => 'Colleague', 'department' => 'operasional', 'initials' => 'CO', 'color' => '#123abc', 'mood' => 'Santuy', 'idle' => false], $extra);
    }

    public function test_warm_heartbeat_reuses_one_bulk_snapshot_without_sql_and_exposes_only_public_fields(): void
    {
        Cache::put('presence:registry', [90]);
        Cache::put('presence:user:90', $this->row(90, ['email' => 'private@example.test', 'token' => 'secret']));
        $batches = [];
        $this->app['events']->listen(RetrievingManyKeys::class, function ($event) use (&$batches) {
            $batches[] = $event->keys;
        });
        DB::enableQueryLog();
        DB::flushQueryLog();
        $response = app(PresenceController::class)->heartbeat($this->request(['idle' => true, 'menu' => null]));
        $data = $response->getData(true);
        $this->assertCount(0, DB::getQueryLog());
        $this->assertCount(1, $batches);
        $this->assertCount(2, $batches[0]);
        $this->assertSame(2, $data['count']);
        $this->assertSame($this->actor->id, $data['online'][0]['id']);
        $this->assertTrue($data['online'][0]['idle']);
        $this->assertTrue($data['online'][0]['is_me']);
        $this->assertSame(['id', 'name', 'department', 'initials', 'color', 'mood', 'idle', 'is_me'], array_keys($data['online'][1]));
        $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
    }

    public function test_mood_after_expiry_does_not_invent_presence_and_next_heartbeat_restores_complete_row(): void
    {
        $controller = app(PresenceController::class);
        $controller->updateMood($this->request(['mood' => 'Santuy']));
        $this->assertNull(Cache::get('presence:user:'.$this->actor->id));
        $this->assertSame('Santuy', Cache::get('presence:mood:'.$this->actor->id));
        $data = $controller->heartbeat($this->request())->getData(true);
        $this->assertSame(1, $data['count']);
        $this->assertSame($this->actor->name, $data['online'][0]['name']);
        $this->assertSame('Santuy', $data['online'][0]['mood']);
    }

    public function test_registry_prunes_expired_partial_mismatched_and_corrupt_entries(): void
    {
        Cache::put('presence:registry', [90, '90', 91, 92, 93, 94, 95, [], true, -1, 'bad']);
        Cache::put('presence:user:90', $this->row(90));
        Cache::put('presence:user:91', ['mood' => 'Santuy']);
        Cache::put('presence:user:92', $this->row(123));
        Cache::put('presence:user:93', $this->row(93, ['name' => "\xFF"]));
        Cache::put('presence:user:94', $this->row(94, ['department' => []]));
        $response = app(PresenceController::class)->heartbeat($this->request());
        $this->assertSame(2, $response->getData(true)['count']);
        $this->assertEqualsCanonicalizing([90, $this->actor->id], Cache::get('presence:registry'));
        Cache::put('presence:registry', 'broken');
        $this->assertSame(1, app(PresenceController::class)->heartbeat($this->request())->getData(true)['count']);
    }

    public function test_cached_optional_fields_are_normalized_and_old_unsafe_moods_are_not_broadcast(): void
    {
        Cache::put('presence:registry', [90]);
        Cache::put('presence:user:90', $this->row(90, ['initials' => "\xFF", 'color' => 'red" onclick="bad', 'mood' => '<svg/onload=1>', 'idle' => 'true']));
        Cache::put('presence:mood:'.$this->actor->id, '<svg/onload=1>');
        $controller = app(PresenceController::class);
        $this->assertNull($controller->getMood()->getData(true)['mood']);
        $response = $controller->heartbeat($this->request());
        $data = $response->getData(true);
        $this->assertNull($data['online'][0]['mood']);
        $this->assertNull($data['online'][1]['mood']);
        $this->assertSame('CO', $data['online'][1]['initials']);
        $this->assertMatchesRegularExpression('/^#[a-f0-9]{6}$/i', $data['online'][1]['color']);
        $this->assertFalse($data['online'][1]['idle']);
        $this->assertIsString($response->getContent());
    }

    public function test_invalid_mood_is_rejected_without_replacing_existing_value_and_plain_text_and_emoji_still_work(): void
    {
        $controller = app(PresenceController::class);
        Cache::put('presence:mood:'.$this->actor->id, 'Santuy');
        foreach (['<svg/onload=1>', "bad\ntext", "bad\x7F", "\xFF", ['bad'], str_repeat('a', 21)] as $mood) {
            try {
                $controller->updateMood($this->request(['mood' => $mood]));
                $this->fail('Invalid mood accepted');
            } catch (ValidationException $error) {
                $this->assertArrayHasKey('mood', $error->errors());
                $this->assertSame('Santuy', Cache::get('presence:mood:'.$this->actor->id));
            }
        }
        foreach (['Santuy', '😄', '👩‍💻'] as $mood) {
            $this->assertSame($mood, $controller->updateMood($this->request(['mood' => $mood]))->getData(true)['mood']);
        }
    }

    public function test_mood_discards_partial_presence_and_preserves_a_valid_existing_row(): void
    {
        $controller = app(PresenceController::class);
        Cache::put('presence:user:'.$this->actor->id, ['mood' => 'old']);
        $controller->updateMood($this->request(['mood' => 'Santuy']));
        $this->assertNull(Cache::get('presence:user:'.$this->actor->id));
        Cache::put('presence:user:'.$this->actor->id, $this->row($this->actor->id));
        $controller->updateMood($this->request(['mood' => '😄']));
        $this->assertSame('Colleague', Cache::get('presence:user:'.$this->actor->id)['name']);
        $this->assertSame('😄', Cache::get('presence:user:'.$this->actor->id)['mood']);
    }

    public function test_malformed_heartbeat_inputs_are_rejected_before_cache_or_database_work(): void
    {
        foreach ([['idle' => []], ['idle' => 'maybe'], ['menu' => []], ['menu' => 'invalid-menu']] as $input) {
            try {
                app(PresenceController::class)->heartbeat($this->request($input));
                $this->fail('Malformed heartbeat accepted');
            } catch (ValidationException) {
                $this->assertNull(Cache::get('presence:user:'.$this->actor->id));
                $this->assertNull(Cache::get('presence:registry'));
            }
        }
    }

    public function test_contended_lock_never_blocks_or_releases_someone_elses_lock_or_overwrites_registry(): void
    {
        Cache::put('presence:registry', [90]);
        Cache::put('presence:user:90', $this->row(90));
        $original = Cache::getFacadeRoot();
        $lock = new class
        {
            public int $gets = 0;

            public int $releases = 0;

            public function get(): bool
            {
                $this->gets++;

                return false;
            }

            public function block(): void
            {
                throw new \RuntimeException('Must not wait');
            }

            public function release(): void
            {
                $this->releases++;
            }
        };
        Cache::swap(new class($original, $lock)
        {
            public function __construct(private $original, private $fakeLock) {}

            public function lock(...$arguments)
            {
                return $this->fakeLock;
            }

            public function __call($method, $arguments)
            {
                return $this->original->$method(...$arguments);
            }
        });
        try {
            $data = app(PresenceController::class)->heartbeat($this->request())->getData(true);
            $this->assertSame(2, $data['count']);
            $this->assertSame([90], Cache::get('presence:registry'));
            $this->assertSame(1, $lock->gets);
            $this->assertSame(0, $lock->releases);
        } finally {
            Cache::swap($original);
        }
    }

    public function test_route_budgets_are_isolated_and_keep_authentication_guards(): void
    {
        $routes = $this->app['router']->getRoutes();
        foreach ([['/presence/heartbeat', 'POST', 'throttle:60,1,presence-heartbeat:'], ['/presence/mood', 'POST', 'throttle:20,1,presence-mood-write:'], ['/presence/mood', 'GET', 'throttle:60,1,presence-mood-read:']] as [$uri, $method, $budget]) {
            $middleware = $routes->match(Request::create($uri, $method))->gatherMiddleware();
            $this->assertContains('auth', $middleware);
            $this->assertContains('readonly.block', $middleware);
            $this->assertContains($budget, $middleware);
        }
        for ($i = 0; $i < 20; $i++) {
            $this->postJson('/presence/mood', ['mood' => 'Santuy'])->assertOk();
        }
        $this->postJson('/presence/mood', ['mood' => 'Santuy'])->assertStatus(429);
        $this->getJson('/presence/mood')->assertOk();
        $this->postJson('/presence/heartbeat')->assertOk();
    }
}
