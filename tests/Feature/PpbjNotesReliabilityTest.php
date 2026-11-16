<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class PpbjNotesReliabilityTest extends TestCase
{
    use RefreshDatabase;

    public function test_twenty_mentions_use_one_user_lookup_and_keep_existing_notification_behavior(): void
    {
        $author = User::factory()->create(['department' => 'umum']);
        $targets = User::factory()->count(20)->create(['is_active' => true]);
        $pr = Ppbj::create(['ppbj_no' => 'NOTES-BATCH']);
        $this->actingAs($author);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $this->postJson(route('ppbj-collaboration.store', $pr), ['body' => 'Periksa dokumen.', 'mentions' => $targets->modelKeys()])
            ->assertCreated()->assertJsonCount(20, 'note.mentions');
        $lookups = collect(DB::getQueryLog())->filter(fn ($q) => str_starts_with($q['query'], 'select') && str_contains($q['query'], 'from "users"'));
        DB::disableQueryLog();
        $this->assertCount(1, $lookups);
        $this->assertDatabaseCount('ppbj_note_mentions', 20);
        $this->assertDatabaseCount('chat_messages', 1);
    }

    public function test_invalid_inactive_duplicate_and_null_mentions_do_not_write_notes_or_messages(): void
    {
        $author = User::factory()->create(['department' => 'umum']);
        $inactive = User::factory()->create(['is_active' => false]);
        $pr = Ppbj::create(['ppbj_no' => 'NOTES-INVALID']);
        $this->actingAs($author);
        foreach ([[$inactive->id], [99999999], [$author->id, (string) $author->id], [null], ['invalid'], range(100, 120)] as $mentions) {
            $this->postJson(route('ppbj-collaboration.store', $pr), ['body' => 'Catatan valid.', 'mentions' => $mentions])->assertUnprocessable();
        }
        $this->assertDatabaseCount('ppbj_collaboration_notes', 0);
        $this->assertDatabaseCount('ppbj_note_mentions', 0);
        $this->assertDatabaseCount('chat_messages', 0);
    }

    public function test_self_mention_is_valid_but_does_not_create_a_notification(): void
    {
        $author = User::factory()->create(['department' => 'umum']);
        $pr = Ppbj::create(['ppbj_no' => 'NOTES-SELF']);
        $this->actingAs($author)->postJson(route('ppbj-collaboration.store', $pr), [
            'body' => 'Catatan sendiri.', 'mentions' => [(string) $author->id],
        ])->assertCreated()->assertJsonCount(0, 'note.mentions');
        $this->assertDatabaseCount('ppbj_collaboration_notes', 1);
        $this->assertDatabaseCount('ppbj_note_mentions', 0);
        $this->assertDatabaseCount('chat_messages', 0);
    }

    public function test_directory_is_cached_and_account_edits_and_deletions_invalidate_it(): void
    {
        $author = User::factory()->create(['department' => 'umum']);
        $target = User::factory()->create(['name' => 'Before', 'is_active' => true]);
        $pr = Ppbj::create(['ppbj_no' => 'NOTES-DIRECTORY']);
        $this->actingAs($author);
        $this->getJson(route('ppbj-collaboration.index', $pr))->assertOk()->assertJsonFragment(['name' => 'Before']);
        $this->assertTrue(Cache::has('ppbj_collaboration:mention_users:v1'));
        DB::enableQueryLog();
        DB::flushQueryLog();
        $this->getJson(route('ppbj-collaboration.index', $pr))->assertOk();
        $lookups = collect(DB::getQueryLog())->filter(fn ($q) => str_starts_with($q['query'], 'select') && str_contains($q['query'], 'from "users"'));
        DB::disableQueryLog();
        $this->assertCount(0, $lookups);
        $target->update(['name' => 'After']);
        $this->assertFalse(Cache::has('ppbj_collaboration:mention_users:v1'));
        $this->getJson(route('ppbj-collaboration.index', $pr))->assertOk()->assertJsonFragment(['name' => 'After'])->assertJsonMissing(['name' => 'Before']);
        $target->update(['is_active' => false]);
        $this->getJson(route('ppbj-collaboration.index', $pr))->assertOk()->assertJsonMissing(['name' => 'After']);
        $target->delete();
        $this->assertFalse(Cache::has('ppbj_collaboration:mention_users:v1'));
    }

    public function test_window_of_fifty_notes_keeps_the_true_total_and_private_headers(): void
    {
        $author = User::factory()->create(['department' => 'umum']);
        $pr = Ppbj::create(['ppbj_no' => 'NOTES-WINDOW']);
        for ($i = 0; $i < 53; $i++) {
            DB::table('ppbj_collaboration_notes')->insert(['ppbj_id' => $pr->id, 'user_id' => $author->id, 'author_name' => 'Author', 'body' => 'Catatan '.$i, 'created_at' => now(), 'updated_at' => now()]);
        }
        $response = $this->actingAs($author)->getJson(route('ppbj-collaboration.index', $pr));
        $response->assertOk()->assertJsonCount(50, 'notes')->assertJsonPath('total_notes', 53)->assertJsonPath('notes.0.body', 'Catatan 3');
        foreach ([$response, $this->getJson(route('ppbj-collaboration.mentions'))->assertOk()] as $result) {
            $this->assertStringContainsString('private', $result->headers->get('Cache-Control'));
            $this->assertStringContainsString('no-store', $result->headers->get('Cache-Control'));
        }
        $this->get(route('ppbj.index'))->assertOk()->assertSee('ppbj.js?v='.filemtime(public_path('assets/ppbj/ppbj.js')), false);
    }

    public function test_request_budgets_remain_limited_but_cannot_block_each_other(): void
    {
        $pr = Ppbj::create(['ppbj_no' => 'NOTES-THROTTLE']);
        $this->actingAs(User::factory()->create(['department' => 'umum']));
        $prefixes = [];
        foreach (['mentions' => 60, 'index' => 60, 'store' => 30, 'update' => 30, 'destroy' => 20] as $name => $limit) {
            $rule = collect(app('router')->getRoutes()->getByName('ppbj-collaboration.'.$name)->gatherMiddleware())->first(fn ($item) => str_starts_with($item, 'throttle:'));
            [$actual, $minutes, $prefix] = explode(',', substr($rule, 9));
            $this->assertSame((string) $limit, $actual);
            $this->assertSame('1', $minutes);
            $this->assertNotEmpty($prefix);
            $this->assertNotContains($prefix, $prefixes);
            $prefixes[] = $prefix;
        }
        for ($i = 0; $i < 30; $i++) {
            $this->postJson(route('ppbj-collaboration.store', $pr), [])->assertUnprocessable();
        }
        $this->postJson(route('ppbj-collaboration.store', $pr), [])->assertTooManyRequests();
        $this->getJson(route('ppbj-collaboration.index', $pr))->assertOk();
        $this->getJson(route('ppbj-collaboration.mentions'))->assertOk();
        $this->assertDatabaseCount('ppbj_collaboration_notes', 0);
    }
}
