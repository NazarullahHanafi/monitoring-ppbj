<?php

namespace Tests\Feature;

use App\Http\Controllers\SpphController;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SpphNumberCacheCoherenceTest extends TestCase
{
    use RefreshDatabase;

    private User $actor;

    protected function setUp(): void
    {
        parent::setUp();
        Http::preventStrayRequests();
        $this->actor = User::factory()->create(['name' => 'Nazar', 'email' => 'number-owner@example.test',
            'department' => 'umum', 'role' => 'superadmin', 'password' => 'SafePass!123']);
        config(['app.owner_emails' => [$this->actor->email]]);
        $this->actingAs($this->actor);
    }

    private function payload(int $number): array
    {
        return ['nomor_spph' => sprintf('%03d/PKU-XI/SPPH/2026', $number), 'tanggal' => '2026-11-19',
            'nama_vendor' => 'Vendor penguji', 'deskripsi_pengadaan' => 'Pengadaan kantor', 'pic' => $this->actor->name];
    }

    private function check(int $number, ?int $exclude = null): \Illuminate\Testing\TestResponse
    {
        return $this->getJson(route('spph.check-nomor', ['nomor' => $this->payload($number)['nomor_spph'],
            'tanggal' => '2026-11-19', 'exclude_id' => $exclude ?? 0]))->assertOk()->assertHeader('Cache-Control', 'no-store, private');
    }

    public function test_a_cached_available_number_becomes_duplicate_immediately_after_create(): void
    {
        $this->check(705)->assertJsonPath('status', 'ok');
        $this->postJson(route('spph.store'), $this->payload(705))->assertOk();
        $this->check(705)->assertJsonPath('status', 'duplicate');
        $this->postJson(route('spph.store'), $this->payload(705))->assertUnprocessable()->assertJsonValidationErrors('nomor_spph');
        $this->assertDatabaseCount('spphs', 1);
    }

    public function test_renumbering_refreshes_old_new_and_excluded_edit_hints_without_waiting_for_ttl(): void
    {
        $this->postJson(route('spph.store'), $this->payload(705))->assertOk();
        $document = Spph::firstOrFail();
        $this->check(705)->assertJsonPath('status', 'duplicate');
        $this->check(706)->assertJsonPath('status', 'ok');
        $this->check(705, $document->id)->assertJsonPath('status', 'ok');
        $this->putJson(route('spph.update', $document), $this->payload(706))->assertOk();
        $this->check(705)->assertJsonPath('status', 'ok');
        $this->check(706)->assertJsonPath('status', 'duplicate');
        $this->check(706, $document->id)->assertJsonPath('status', 'ok');
    }

    public function test_archive_and_restore_keep_numbers_reserved_and_permanent_delete_releases_the_hint(): void
    {
        $this->postJson(route('spph.store'), $this->payload(705))->assertOk();
        $document = Spph::firstOrFail();
        $this->check(705)->assertJsonPath('status', 'duplicate');
        $this->deleteJson(route('spph.destroy', $document), ['creator_password' => 'SafePass!123'])->assertOk();
        $this->check(705)->assertJsonPath('status', 'duplicate');
        $this->postJson(route('spph.restore', $document->id))->assertOk();
        $this->check(705)->assertJsonPath('status', 'duplicate');
        $this->deleteJson(route('spph.destroy', $document), ['creator_password' => 'SafePass!123'])->assertOk();
        $this->deleteJson(route('spph.force-destroy', $document->id), ['password' => 'SafePass!123', 'confirmation' => $document->nomor_spph])->assertOk();
        $this->check(705)->assertJsonPath('status', 'ok');
        $this->assertDatabaseCount('spphs', 0);
    }

    public function test_cache_invalidation_waits_for_commit_and_is_discarded_on_rollback(): void
    {
        $versionKey = 'spph:number-check:version';
        Cache::forever($versionKey, 'before');
        Cache::put('unrelated:keep', 'preserved', 300);
        $invalidate = new \ReflectionMethod(SpphController::class, 'invalidateSpphIndexCaches');
        foreach ([false, true] as $commit) {
            Cache::put('spph:last_nomor', 'last', 300);
            Cache::put('spph:suggest', 'suggest', 300);
            Cache::put('vendor:usage-stats:spph-sp:v2', ['vendor' => 1], 300);
            DB::beginTransaction();
            try {
                $invalidate->invoke(app(SpphController::class));
                $this->assertSame('before', Cache::get($versionKey));
                $this->assertSame('last', Cache::get('spph:last_nomor'));
            } catch (\Throwable $error) {
                DB::rollBack();
                throw $error;
            }
            $commit ? DB::commit() : DB::rollBack();
            if ($commit) {
                $this->assertNotSame('before', Cache::get($versionKey));
                foreach (['spph:last_nomor', 'spph:suggest', 'vendor:usage-stats:spph-sp:v2'] as $key) {
                    $this->assertFalse(Cache::has($key));
                }
            } else {
                $this->assertSame('before', Cache::get($versionKey));
                $this->assertSame('last', Cache::get('spph:last_nomor'));
            }
        }
        $this->assertSame('preserved', Cache::get('unrelated:keep'));
    }

    public function test_repeated_checks_reuse_cached_reads_and_failed_saves_keep_the_same_generation(): void
    {
        $this->postJson(route('spph.store'), $this->payload(705))->assertOk();
        $this->check(705)->assertJsonPath('status', 'duplicate');
        DB::enableQueryLog();
        DB::flushQueryLog();
        try {
            $this->check(705)->assertJsonPath('status', 'duplicate');
            $this->assertFalse(collect(DB::getQueryLog())->contains(fn ($row) => str_contains($row['query'], 'from "spphs"')));
        } finally {
            DB::disableQueryLog();
        }
        $version = Cache::get('spph:number-check:version');
        $this->postJson(route('spph.store'), array_replace($this->payload(706), ['nama_vendor' => []]))->assertUnprocessable();
        $this->assertSame($version, Cache::get('spph:number-check:version'));
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'viewer']))
            ->postJson(route('spph.store'), $this->payload(706))->assertForbidden();
        $this->assertSame($version, Cache::get('spph:number-check:version'));
    }
}
