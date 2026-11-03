<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ActivityBroadcastFeedTest extends TestCase
{
    use RefreshDatabase;

    public function test_feed_requires_authentication(): void
    {
        $this->getJson('/activity-broadcast/feed')->assertUnauthorized();
    }

    public function test_authenticated_app_layout_contains_async_broadcast_shell(): void
    {
        $umum = User::factory()->create(['department' => 'umum']);

        $this->actingAs($umum)
            ->get('/approval/pr-receipts')
            ->assertOk()
            ->assertSee('id="activityBroadcast"', false)
            ->assertSee('activity-broadcast.js', false);

        $script = file_get_contents(public_path('assets/app/activity-broadcast.js'));
        $style = file_get_contents(public_path('assets/app/activity-broadcast.css'));

        $this->assertIsString($script);
        $this->assertIsString($style);
        $this->assertStringContainsString("track.addEventListener('animationend'", $script);
        $this->assertStringContainsString('show(activeIndex + 1)', $script);
        $this->assertStringContainsString('window.sessionStorage.getItem(cacheKey)', $script);
        $this->assertStringContainsString('cacheTtl = 60000', $script);
        $this->assertMatchesRegularExpression('/loadTimer = window\.setTimeout\([\s\S]*?\}, 5000\)/', $script);
        $this->assertStringContainsString('--broadcast-start', $style);
        $this->assertStringContainsString('--broadcast-end', $style);
    }

    public function test_umum_receives_latest_procurement_updates_only(): void
    {
        $umum = User::factory()->create(['department' => 'umum']);
        $actor = User::factory()->create(['department' => 'operasional']);

        $this->insertJourney($actor, 1, 'SP pertama', []);
        DB::table('chat_messages')->insert($this->messagePayload($actor, 2, 'Pesan chat biasa', null, []));
        $this->insertJourney($actor, 3, 'SP terbaru', []);

        Cache::forget('activity_broadcast:umum:v2');
        DB::flushQueryLog();
        DB::enableQueryLog();
        $response = $this->actingAs($umum)->getJson('/activity-broadcast/feed');
        $feedQueries = collect(DB::getQueryLog())
            ->filter(fn (array $query) => str_contains(strtolower($query['query']), 'chat_messages'));

        $response->assertOk()
            ->assertJsonCount(2, 'items')
            ->assertJsonPath('items.0.title', 'SP terbaru')
            ->assertJsonPath('items.1.title', 'SP pertama');
        $this->assertCount(1, $feedQueries, 'Feed harus tetap satu query terindeks tanpa N+1.');
    }

    public function test_operational_user_only_receives_updates_that_mention_them(): void
    {
        Cache::flush();
        $owner = User::factory()->create(['department' => 'operasional']);
        $other = User::factory()->create(['department' => 'operasional']);

        $this->insertJourney($other, 10, 'Untuk orang lain', [['id' => $other->id, 'name' => $other->name]]);
        $this->insertJourney($other, 11, 'Untuk pemilik PR', [['id' => $owner->id, 'name' => $owner->name]]);

        $response = $this->actingAs($owner)->getJson('/activity-broadcast/feed');

        $response->assertOk()
            ->assertJsonCount(1, 'items')
            ->assertJsonPath('items.0.title', 'Untuk pemilik PR')
            ->assertJsonPath('items.0.number', 'PKB/PR-26/CON/0011');
    }

    public function test_warm_shared_feed_rebuilds_host_independent_links_for_each_department(): void
    {
        $general = User::factory()->create(['department' => 'umum']);
        $operationalAdmin = User::factory()->create(['department' => 'operasional', 'role' => 'superadmin']);
        $this->insertJourney($general, 100, 'Shared update', []);
        \Illuminate\Support\Facades\URL::forceRootUrl('https://audit.invalid');
        $this->actingAs($general)->getJson('/activity-broadcast/feed')->assertOk()
            ->assertJsonPath('items.0.url', '/sp?search=PKB%2FPR-26%2FCON%2F0100');

        // Older cache entries might still contain a URL from a CLI/request host.
        $cached = Cache::get('activity_broadcast:umum:v2');
        $cached[0]['url'] = 'http://localhost/sp?search=old';
        Cache::put('activity_broadcast:umum:v2', $cached, 20);
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            if (str_contains($query->sql, 'chat_messages')) {
                $queries[] = $query->sql;
            }
        });
        \Illuminate\Support\Facades\URL::forceRootUrl('https://production.example');
        $this->actingAs($operationalAdmin)->getJson('/activity-broadcast/feed')->assertOk()
            ->assertJsonPath('items.0.url', '/tracking-pr?q=PKB%2FPR-26%2FCON%2F0100');
        $this->actingAs($general)->getJson('/activity-broadcast/feed')->assertOk()
            ->assertJsonPath('items.0.url', '/sp?search=PKB%2FPR-26%2FCON%2F0100');
        $this->assertSame([], $queries, 'Rebuilding navigation must not repeat the feed query.');
    }

    private function insertJourney(User $actor, int $id, string $title, array $mentions): void
    {
        DB::table('chat_messages')->insert($this->messagePayload(
            $actor,
            $id,
            'Update Progress: '.$title,
            'procurement_journey',
            $mentions,
            [
                'status' => $title,
                'number' => sprintf('PKB/PR-26/CON/%04d', $id),
                'description' => 'Deskripsi pengadaan '.$id,
                'event_type' => 'sp_created',
            ]
        ));
    }

    private function messagePayload(
        User $actor,
        int $id,
        string $message,
        ?string $shareType,
        array $mentions,
        array $shareData = []
    ): array {
        return [
            'id' => $id,
            'user_id' => $actor->id,
            'user_name' => $actor->name,
            'user_initials' => 'OP',
            'user_color' => '#2563eb',
            'message' => $message,
            'reply_to' => null,
            'reply_preview' => null,
            'reply_user' => null,
            'mentions' => json_encode($mentions),
            'share_type' => $shareType,
            'share_id' => null,
            'share_data' => $shareData ? json_encode($shareData) : null,
            'created_at' => now()->addSeconds($id),
        ];
    }
}
