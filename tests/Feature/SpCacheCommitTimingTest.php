<?php

namespace Tests\Feature;

use App\Http\Controllers\SpController;
use App\Models\Sp;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SpCacheCommitTimingTest extends TestCase
{
    use RefreshDatabase;

    private User $actor;

    private const REFERENCES = ['sp:last_nomor', 'sp:last_nomor:auto', 'sp:last_nomor:oracle', 'sp:suggest', 'vendor:usage-stats:spph-sp:v2'];

    protected function setUp(): void
    {
        parent::setUp();
        Http::preventStrayRequests();
        $this->actor = User::factory()->create(['name' => 'Nazar', 'email' => 'sp-cache-owner@example.test',
            'department' => 'umum', 'role' => 'superadmin', 'password' => 'SafePass!123']);
        config(['app.owner_emails' => [$this->actor->email]]);
        $this->actingAs($this->actor);
    }

    private function payload(int $number, bool $oracle = false): array
    {
        return ['nomor_sp' => $oracle ? 'ORACLE/CACHE/2026/'.$number : sprintf('%03d/PKU-XI/SP/2026', $number),
            'tanggal_sp' => '2026-11-19', 'oracle_mode' => $oracle ? '1' : '0', 'nomor_pr_type' => 'manual',
            'nilai_sp' => $oracle ? '60000000' : '1000000', 'nama_vendor' => 'Vendor penguji',
            'deskripsi_pengadaan' => 'Pengadaan kantor', 'pic' => $this->actor->name];
    }

    private function check(int $number, bool $oracle = false, ?int $exclude = null): \Illuminate\Testing\TestResponse
    {
        return $this->getJson(route('sp.check-nomor', ['nomor' => $this->payload($number, $oracle)['nomor_sp'],
            'tanggal' => '2026-11-19', 'oracle_mode' => $oracle ? '1' : '0', 'exclude_id' => $exclude ?? 0]))
            ->assertOk()->assertHeader('Cache-Control', 'no-store, private');
    }

    public function test_generation_and_reference_caches_change_only_after_commit_and_survive_rollback(): void
    {
        Cache::forever('sp:index-stats:version', 'before');
        Cache::put('unrelated:keep', 'preserved', 300);
        $invalidate = new \ReflectionMethod(SpController::class, 'invalidateSpIndexCaches');
        foreach ([false, true] as $commit) {
            foreach (self::REFERENCES as $key) {
                Cache::put($key, 'marker', 300);
            }
            DB::beginTransaction();
            try {
                $invalidate->invoke(app(SpController::class));
                $this->assertSame('before', Cache::get('sp:index-stats:version'));
                foreach (self::REFERENCES as $key) {
                    $this->assertSame('marker', Cache::get($key));
                }
            } catch (\Throwable $error) {
                DB::rollBack();
                throw $error;
            }
            $commit ? DB::commit() : DB::rollBack();
            if ($commit) {
                $this->assertNotSame('before', Cache::get('sp:index-stats:version'));
                foreach (self::REFERENCES as $key) {
                    $this->assertFalse(Cache::has($key));
                }
            } else {
                $this->assertSame('before', Cache::get('sp:index-stats:version'));
                foreach (self::REFERENCES as $key) {
                    $this->assertSame('marker', Cache::get($key));
                }
            }
        }
        $this->assertSame('preserved', Cache::get('unrelated:keep'));
    }

    public function test_a_hint_filled_while_a_transaction_is_open_is_unreachable_after_commit(): void
    {
        $this->postJson(route('sp.store'), $this->payload(707))->assertOk();
        $version = Cache::get('sp:index-stats:version');
        $number = $this->payload(707)['nomor_sp'];
        DB::beginTransaction();
        try {
            (new \ReflectionMethod(SpController::class, 'invalidateSpIndexCaches'))->invoke(app(SpController::class));
            $visibleDuringTransaction = Cache::get('sp:index-stats:version');
            // Model a concurrent reader returning the last committed state.
            $key = 'sp:check:'.md5($visibleDuringTransaction.':'.$number.':'.$number.':0:2026-11-19:0');
            Cache::put($key, ['status' => 'ok', 'warning' => null, 'normalized_nomor' => null], 30);
            $this->check(707)->assertJsonPath('status', 'ok');
            DB::commit();
        } catch (\Throwable $error) {
            DB::rollBack();
            throw $error;
        }
        $this->assertNotSame($visibleDuringTransaction, Cache::get('sp:index-stats:version'));
        $this->assertNotSame($version, Cache::get('sp:index-stats:version'));
        $this->check(707)->assertJsonPath('status', 'duplicate');
    }

    public function test_create_edit_archive_restore_and_delete_refresh_hints_in_auto_and_oracle_modes(): void
    {
        foreach ([false, true] as $oracle) {
            $this->check(707, $oracle)->assertJsonPath('status', 'ok');
            $this->postJson(route('sp.store'), $this->payload(707, $oracle))->assertOk();
            $document = Sp::where('nomor_sp', $this->payload(707, $oracle)['nomor_sp'])->firstOrFail();
            $this->check(707, $oracle)->assertJsonPath('status', 'duplicate');
            $this->check(708, $oracle)->assertJsonPath('status', 'ok');
            $this->putJson(route('sp.update', $document), $this->payload(708, $oracle))->assertOk();
            $document->refresh();
            $this->check(707, $oracle)->assertJsonPath('status', 'ok');
            $this->check(708, $oracle)->assertJsonPath('status', 'duplicate');
            $this->check(708, $oracle, $document->id)->assertJsonPath('status', 'ok');
            $this->deleteJson(route('sp.destroy', $document), ['creator_password' => 'SafePass!123'])->assertOk();
            $this->check(708, $oracle)->assertJsonPath('status', 'duplicate');
            $this->postJson(route('sp.restore', $document->id))->assertOk();
            $this->check(708, $oracle)->assertJsonPath('status', 'duplicate');
            $this->deleteJson(route('sp.destroy', $document), ['creator_password' => 'SafePass!123'])->assertOk();
            $this->deleteJson(route('sp.force-destroy', $document->id), ['password' => 'SafePass!123', 'confirmation' => $document->nomor_sp])->assertOk();
            $this->check(708, $oracle)->assertJsonPath('status', 'ok');
        }
        $this->assertDatabaseCount('sps', 0);
    }

    public function test_cached_summary_refreshes_after_committed_create_edit_and_archive(): void
    {
        $this->get(route('sp.index'))->assertOk()->assertViewHas('stats', fn ($stats) => (int) $stats->total_count === 0);
        $this->postJson(route('sp.store'), $this->payload(707))->assertOk();
        $this->get(route('sp.index'))->assertOk()->assertViewHas('stats', fn ($stats) => (int) $stats->total_count === 1 && (float) $stats->total_nilai_sp === 1000000.0);
        $document = Sp::firstOrFail();
        $this->putJson(route('sp.update', $document), array_replace($this->payload(707), ['nilai_sp' => '1500000']))->assertOk();
        $this->get(route('sp.index'))->assertOk()->assertViewHas('stats', fn ($stats) => (float) $stats->total_nilai_sp === 1500000.0);
        $this->deleteJson(route('sp.destroy', $document), ['creator_password' => 'SafePass!123'])->assertOk();
        $this->get(route('sp.index'))->assertOk()->assertViewHas('stats', fn ($stats) => (int) $stats->total_count === 0);
    }

    public function test_warm_number_checks_need_no_sql_and_failed_saves_do_not_invalidate_caches(): void
    {
        $this->postJson(route('sp.store'), $this->payload(707))->assertOk();
        $this->check(707)->assertJsonPath('status', 'duplicate');
        DB::enableQueryLog();
        DB::flushQueryLog();
        try {
            $this->check(707)->assertJsonPath('status', 'duplicate');
            $this->assertFalse(collect(DB::getQueryLog())->contains(fn ($row) => str_contains($row['query'], 'from "sps"')));
        } finally {
            DB::disableQueryLog();
        }
        $version = Cache::get('sp:index-stats:version');
        $this->postJson(route('sp.store'), array_replace($this->payload(708), ['nama_vendor' => []]))->assertUnprocessable();
        $this->assertSame($version, Cache::get('sp:index-stats:version'));
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'viewer']))->postJson(route('sp.store'), $this->payload(708))->assertForbidden();
        $this->assertSame($version, Cache::get('sp:index-stats:version'));
    }
}
