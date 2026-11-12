<?php

namespace Tests\Feature;

use App\Models\Sp;
use App\Models\SpItem;
use App\Models\Spph;
use App\Models\User;
use App\Support\ProcurementExportRows;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class SiteInteractionPerformanceTest extends TestCase
{
    use RefreshDatabase;

    public function test_exports_read_bounded_batches_keep_all_rows_and_do_not_include_later_inserts(): void
    {
        $user = User::factory()->create(['department' => 'umum', 'role' => 'user']);
        $this->actingAs($user);
        foreach (['sp', 'spph'] as $kind) {
            $records = [];
            for ($number = 1; $number <= 425; $number++) {
                $records[] = ['id' => $number, 'sequence_number' => $number % 11, $kind === 'sp' ? 'nomor_sp' : 'nomor_spph' => 'AUDIT/'.$kind.'/'.$number,
                    $kind === 'sp' ? 'tanggal_sp' : 'tanggal' => '2026-11-12', 'nama_vendor' => 'Vendor audit', 'deskripsi_pengadaan' => 'Audit export', 'pic' => 'PIC audit', 'created_at' => now(), 'updated_at' => now()];
            }
            $table = ($kind === 'sp' ? new Sp : new Spph)->getTable();
            DB::table($table)->insert($records);
            if ($kind === 'sp') {
                SpItem::create(['sp_id' => 211, 'urutan' => 1, 'nama_barang' => '=HYPERLINK("unsafe")', 'satuan' => 'pcs', 'jumlah' => 1, 'harga_satuan' => 10, 'subtotal' => 10]);
            }
            $hydrated = 0;
            ($kind === 'sp' ? Sp::class : Spph::class)::retrieved(function () use (&$hydrated) {
                $hydrated++;
            });
            $response = $this->get(route($kind.'.export'))->assertOk();
            $this->assertSame(0, $hydrated, 'The response must not hydrate the full export before streaming.');
            DB::table($table)->insert([$kind === 'sp' ? 'nomor_sp' : 'nomor_spph' => 'LATE/INSERT', 'sequence_number' => 9999, $kind === 'sp' ? 'tanggal_sp' : 'tanggal' => '2026-11-12', 'nama_vendor' => 'Vendor late', 'deskripsi_pengadaan' => 'Late', 'pic' => 'PIC late']);
            DB::flushQueryLog();
            DB::enableQueryLog();
            $content = $response->streamedContent();
            $queries = DB::getQueryLog();
            DB::disableQueryLog();
            $this->assertSame(425, $hydrated);
            $this->assertSame(425, substr_count($content, 'AUDIT/'.$kind.'/'));
            $this->assertStringNotContainsString('LATE/INSERT', $content);
            $main = collect($queries)->filter(fn ($q) => preg_match('/from ["`]'.$table.'["`]/', $q['query']))->values();
            $this->assertCount(3, $main);
            foreach ($main as $query) {
                $this->assertStringContainsString('limit 200', strtolower($query['query']));
                $this->assertStringNotContainsString('offset', strtolower($query['query']));
            }
            if ($kind === 'sp') {
                $this->assertStringContainsString("'=HYPERLINK", $content);
                $this->assertStringContainsString('Nama Barang', $content);
                $expected = Sp::where('id', '<=', 425)->orderByDesc('sequence_number')->orderByDesc('id')->pluck('nomor_sp')->all();
                // Verify actual generator traversal with tied sequence numbers.
                $actual = array_map(fn ($row) => $row->nomor_sp, iterator_to_array(ProcurementExportRows::rows(Sp::where('id', '<=', 425), 'sequence_number')));
                $this->assertSame($expected, $actual);
            }
        }
    }

    public function test_export_validates_malformed_filters_before_streaming_and_keeps_department_guards(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        $this->actingAs($user);
        foreach (['sp', 'spph'] as $kind) {
            $this->getJson(route($kind.'.export', ['dari' => '2026-99-99']))->assertUnprocessable()->assertJsonValidationErrors('dari');
            $this->getJson(route($kind.'.export', ['pic' => ['invalid']]))->assertUnprocessable()->assertJsonValidationErrors('pic');
        }
        $this->actingAs(User::factory()->create(['department' => 'operasional']));
        foreach (['sp', 'spph'] as $kind) {
            $this->getJson(route($kind.'.export'))->assertForbidden();
        }
    }

    private function message(User $sender, string $text, array $extra = []): int
    {
        return DB::table('chat_messages')->insertGetId($extra + ['user_id' => $sender->id, 'user_name' => $sender->name,
            'user_initials' => 'AU', 'user_color' => '#123456', 'message' => $text, 'created_at' => now()]);
    }

    public function test_incremental_chat_never_skips_a_burst_and_read_receipts_use_one_aggregate(): void
    {
        $sender = User::factory()->create();
        $reader = User::factory()->create();
        $anchor = $this->message($sender, 'Anchor');
        $ids = [];
        for ($i = 0; $i < 93; $i++) {
            $ids[] = $this->message($sender, 'Burst '.$i);
        }
        DB::table('chat_reads')->insert(['message_id' => $ids[0], 'user_id' => $reader->id, 'read_at' => now()]);
        $this->actingAs($reader);
        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            $queries[] = $query->sql;
        });
        $first = $this->getJson('/chat/messages?since='.$anchor)->assertOk()->assertJsonCount(40, 'messages')->assertJsonPath('messages.0.i_read', true)->assertJsonPath('has_more', true);
        $reads = collect($queries)->filter(fn ($q) => str_contains($q, 'from "chat_reads"') && str_contains($q, 'group by'));
        DB::disableQueryLog();
        $this->assertCount(1, $reads);
        $second = $this->getJson('/chat/messages?since='.$first['max_id'])->assertOk()->assertJsonCount(40, 'messages');
        $third = $this->getJson('/chat/messages?since='.$second['max_id'])->assertOk()->assertJsonCount(13, 'messages')->assertJsonPath('has_more', false);
        $received = array_merge(array_column($first['messages'], 'id'), array_column($second['messages'], 'id'), array_column($third['messages'], 'id'));
        $this->assertSame($ids, $received);
        foreach (['since[]=1', 'since=-1', 'since=1&before=2', 'since=999999999999999999999999'] as $invalid) {
            $this->getJson('/chat/messages?'.$invalid)->assertUnprocessable();
        }
    }

    public function test_chat_receipts_exclude_deleted_system_own_and_unknown_messages_and_bound_payload(): void
    {
        $sender = User::factory()->create();
        $reader = User::factory()->create();
        $visible = $this->message($sender, 'Visible');
        $hidden = $this->message($sender, 'Hidden');
        $system = $this->message($sender, 'System', ['share_type' => 'procurement_journey']);
        $own = $this->message($reader, 'Own');
        DB::table('chat_message_deletions')->insert(['message_id' => $hidden, 'user_id' => $reader->id, 'deleted_at' => now()]);
        $this->actingAs($reader)->postJson('/chat/read', ['message_ids' => [$visible, $hidden, $system, $own, 999999]])->assertOk()->assertJsonPath('marked', 1);
        $this->assertDatabaseCount('chat_reads', 1);
        $this->postJson('/chat/read', ['message_ids' => array_fill(0, 41, $visible)])->assertUnprocessable();
        $this->postJson('/chat/read', ['message_ids' => [0]])->assertUnprocessable();
    }

    public function test_chat_search_treats_wildcards_literally_and_locked_users_leave_mentions_immediately(): void
    {
        Cache::forget('chat:mention_users:v2');
        $reader = User::factory()->create();
        $sender = User::factory()->create(['name' => 'Audit sender']);
        $wanted = $this->message($sender, 'Garansi 100% A_B');
        $this->message($sender, 'Garansi 1000 ACB');
        $this->actingAs($reader)->getJson('/chat/search?q=100%25')->assertJsonPath('messages.0.id', $wanted)->assertJsonCount(1, 'messages');
        $this->getJson('/chat/search?q=A_B')->assertJsonCount(1, 'messages');
        $this->getJson('/chat/search?q=%20%20')->assertUnprocessable();
        $this->getJson('/chat/users')->assertJsonFragment(['id' => $sender->id]);
        $sender->update(['is_active' => false]);
        $this->assertFalse($sender->fresh()->is_active);
        $this->assertFalse(Cache::has('chat:mention_users:v2'), 'User saves must evict the mention directory.');
        $this->getJson('/chat/users')->assertJsonMissing(['id' => $sender->id]);
    }

    public function test_empty_cache_invalidation_cannot_stop_later_user_listeners(): void
    {
        Cache::forget(\App\Services\VirtualOfficePresence::DIRECTORY_KEY);
        Cache::forget(\App\Services\VirtualOfficeHomes::KEY);
        Cache::forget('chat:mention_users:v2');
        $saved = 0;
        $created = 0;
        $deleted = 0;
        User::saved(function () use (&$saved) {
            $saved++;
        });
        User::created(function () use (&$created) {
            $created++;
        });
        User::deleted(function () use (&$deleted) {
            $deleted++;
        });
        $user = User::factory()->create();
        $user->update(['name' => 'Changed immediately']);
        $user->delete();
        $this->assertSame([2, 1, 1], [$saved, $created, $deleted]);
    }

    public function test_chat_request_budgets_are_independent_and_polling_cannot_block_actions(): void
    {
        Cache::flush();
        $user = User::factory()->create();
        $this->actingAs($user);
        for ($i = 0; $i < 120; $i++) {
            \Illuminate\Support\Facades\RateLimiter::hit('chat-messages:'.sha1((string) $user->id), 60);
        }
        $this->getJson('/chat/messages')->assertStatus(429)->assertHeader('Retry-After');
        $this->getJson('/chat/users')->assertOk();
        $this->getJson('/chat/search?q=valid')->assertOk();
        $this->postJson('/chat/send', ['message' => 'Independent action'])->assertCreated();
        $prefixes = [];
        foreach (app('router')->getRoutes() as $route) {
            if (! str_starts_with($route->getName() ?? '', 'chat.')) {
                continue;
            }
            $throttle = collect($route->gatherMiddleware())->first(fn ($item) => str_starts_with($item, 'throttle:'));
            $this->assertNotNull($throttle, $route->getName().' must have a bounded request budget.');
            $prefix = explode(',', $throttle)[2] ?? '';
            $this->assertStringStartsWith('chat-', $prefix);
            $this->assertNotContains($prefix, $prefixes);
            $prefixes[] = $prefix;
        }
    }
}
