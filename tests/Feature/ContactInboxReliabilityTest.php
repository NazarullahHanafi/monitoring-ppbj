<?php

namespace Tests\Feature;

use App\Http\Controllers\ContactMessageController;
use App\Models\ContactMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class ContactInboxReliabilityTest extends TestCase
{
    use RefreshDatabase;

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    public function test_lists_reuse_summary_totals_and_have_stable_pagination_and_small_projection(): void
    {
        $this->actingAs($this->admin());
        for ($i = 0; $i < 30; $i++) {
            ContactMessage::factory()->create(['read_at' => $i < 10 ? now() : null, 'created_at' => '2026-11-16 10:00:00']);
        }
        foreach ([[], ['status' => 'read'], ['status' => 'unread'], ['search' => '   ']] as $filters) {
            DB::enableQueryLog();
            DB::flushQueryLog();
            $data = $this->indexData($filters);
            $queries = DB::getQueryLog();
            DB::disableQueryLog();
            $this->assertCount(2, $queries);
            $this->assertSame(['total' => 30, 'unread' => 20, 'read' => 10], $data['stats']);
            $this->assertSame(match ($filters['status'] ?? '') {
                'read' => 10, 'unread' => 20, default => 30
            }, $data['messages']->total());
            $this->assertArrayNotHasKey('user_agent', $data['messages']->first()->getAttributes());
        }
        $first = $this->indexData([])['messages']->pluck('id')->all();
        $second = $this->indexData(['page' => 2])['messages']->pluck('id')->all();
        $this->assertSame(range(30, 19), $first);
        $this->assertSame(range(18, 7), $second);
    }

    public static function literalTerms(): array
    {
        return [['50%'], ['AC_DC'], ['Bang!'], ['C:\\data'], ["O'Reilly"]];
    }

    #[DataProvider('literalTerms')]
    public function test_search_is_literal_and_combines_with_status(string $term): void
    {
        $this->actingAs($this->admin());
        $match = ContactMessage::factory()->create(['name' => 'Sender', 'subject' => 'Barang '.$term, 'read_at' => null]);
        ContactMessage::factory()->create(['name' => 'Sender', 'subject' => 'Barang '.$term, 'read_at' => now()]);
        ContactMessage::factory()->create(['name' => 'Sender', 'subject' => 'Barang 500 ACDDC Bang C:data OReilly']);
        $data = $this->indexData(['search' => $term, 'status' => 'unread']);
        $this->assertSame([$match->id], $data['messages']->pluck('id')->all());
        $this->assertSame(1, $data['messages']->total());
    }

    public function test_invalid_filters_are_rejected_before_contact_queries(): void
    {
        $this->actingAs($this->admin());
        DB::enableQueryLog();
        DB::flushQueryLog();
        foreach ([['search' => ['bad']], ['search' => str_repeat('x', 161)], ['status' => 'bad'], ['status' => ['read']], ['page' => 0], ['page' => 1000001]] as $filters) {
            $this->getJson(route('contact-messages.index', $filters))->assertUnprocessable();
        }
        $queries = collect(DB::getQueryLog())->filter(fn ($row) => str_contains($row['query'], 'contact_messages'));
        DB::disableQueryLog();
        $this->assertCount(0, $queries);
    }

    public function test_page_contains_explicit_intents_and_the_versioned_action_asset(): void
    {
        ContactMessage::factory()->create(['read_at' => null]);
        ContactMessage::factory()->create(['read_at' => now()]);
        $this->actingAs($this->admin())->get(route('contact-messages.index'))->assertOk()
            ->assertSee('name="read" value="1"', false)->assertSee('name="read" value="0"', false)
            ->assertSee('contact-messages.js?v='.filemtime(public_path('assets/app/contact-messages.js')), false)
            ->assertSee('maxlength="160"', false);
    }

    public function test_repeated_read_intent_preserves_the_first_reader_and_timestamp(): void
    {
        Carbon::setTestNow('2026-11-16 10:00:00');
        $first = $this->admin();
        $second = $this->admin();
        $message = ContactMessage::factory()->create();
        $this->actingAs($first)->put(route('contact-messages.read', $message), ['read' => '1'])->assertRedirect();
        $initial = $message->fresh()->getRawOriginal('read_at');
        Carbon::setTestNow('2026-11-16 10:05:00');
        Cache::put('contact_messages_unread_count', 99, 30);
        $this->actingAs($second)->put(route('contact-messages.read', $message), ['read' => '1'])->assertRedirect();
        $this->assertSame($initial, $message->fresh()->getRawOriginal('read_at'));
        $this->assertSame($first->id, $message->fresh()->read_by_user_id);
        $this->assertSame(99, Cache::get('contact_messages_unread_count'));
        $this->put(route('contact-messages.read', $message), ['read' => '0'])->assertRedirect();
        $this->assertNull($message->fresh()->read_at);
        $this->assertNull($message->fresh()->read_by_user_id);
        $this->assertFalse(Cache::has('contact_messages_unread_count'));
        $updatedAt = $message->fresh()->getRawOriginal('updated_at');
        Carbon::setTestNow('2026-11-16 10:10:00');
        $this->put(route('contact-messages.read', $message), ['read' => '0'])->assertRedirect();
        $this->assertSame($updatedAt, $message->fresh()->getRawOriginal('updated_at'));
    }

    public function test_legacy_form_gets_a_refresh_message_and_invalid_intent_cannot_mutate(): void
    {
        $message = ContactMessage::factory()->create();
        $this->actingAs($this->admin())->put(route('contact-messages.read', $message), [])->assertRedirect()->assertSessionHas('error');
        foreach ([null, 'invalid', ['1']] as $read) {
            $this->putJson(route('contact-messages.read', $message), ['read' => $read])->assertUnprocessable();
        }
        $this->assertNull($message->fresh()->read_at);
    }

    public function test_write_permissions_and_global_read_only_are_preserved(): void
    {
        $message = ContactMessage::factory()->create();
        foreach ([['umum', 'user'], ['operasional', 'superadmin'], ['umum', 'viewer']] as [$department, $role]) {
            $this->actingAs(User::factory()->create(compact('department', 'role')))
                ->putJson(route('contact-messages.read', $message), ['read' => 1])->assertForbidden();
            $this->deleteJson(route('contact-messages.destroy', $message))->assertForbidden();
        }
        $this->actingAs($this->admin());
        Cache::put('simonpr:read_only_mode', true);
        $this->putJson(route('contact-messages.read', $message), ['read' => 1])->assertForbidden();
        $this->deleteJson(route('contact-messages.destroy', $message))->assertForbidden();
        $this->get(route('contact-messages.index'))->assertOk();
        $this->assertDatabaseHas('contact_messages', ['id' => $message->id, 'read_at' => null]);
    }

    public function test_limiters_remain_active_without_sharing_a_key_between_actions(): void
    {
        $message = ContactMessage::factory()->create();
        $this->actingAs($this->admin());
        $prefixes = [];
        foreach (['landing.contact.store' => 5, 'contact-messages.index' => 60, 'contact-messages.read' => 30, 'contact-messages.destroy' => 20] as $name => $limit) {
            $rule = collect(app('router')->getRoutes()->getByName($name)->gatherMiddleware())->first(fn ($item) => str_starts_with($item, 'throttle:'));
            [$actual, $minutes, $prefix] = explode(',', substr($rule, 9));
            $this->assertSame((string) $limit, $actual);
            $this->assertSame('1', $minutes);
            $this->assertNotEmpty($prefix);
            $this->assertNotContains($prefix, $prefixes);
            $prefixes[] = $prefix;
        }
        for ($i = 0; $i < 30; $i++) {
            $this->putJson(route('contact-messages.read', $message), ['read' => 'invalid'])->assertUnprocessable();
        }
        $this->putJson(route('contact-messages.read', $message), ['read' => 'invalid'])->assertTooManyRequests();
        $this->get(route('contact-messages.index'))->assertOk();
        $this->delete(route('contact-messages.destroy', $message))->assertRedirect();
    }

    private function admin(): User
    {
        return User::factory()->create(['role' => 'superadmin', 'department' => 'umum']);
    }

    private function indexData(array $filters): array
    {
        $request = Request::create('/contact-messages', 'GET', $filters);
        $this->app->instance('request', $request);

        return app(ContactMessageController::class)->index($request)->getData();
    }
}
