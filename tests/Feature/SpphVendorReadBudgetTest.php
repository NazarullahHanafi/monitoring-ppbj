<?php

namespace Tests\Feature;

use App\Http\Controllers\SpphController;
use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SpphVendorReadBudgetTest extends TestCase
{
    use RefreshDatabase;

    private User $actor;

    protected function setUp(): void
    {
        parent::setUp();
        Http::preventStrayRequests();
        $this->actor = User::factory()->create(['name' => 'Buyer penguji', 'department' => 'umum', 'role' => 'user']);
        $this->actingAs($this->actor);
    }

    private function sp(string $number, ?string $vendor): Sp
    {
        return Sp::create(['nomor_sp' => $number, 'sequence_number' => 1, 'nama_vendor' => $vendor, 'deskripsi_pengadaan' => 'Vendor final', 'pic' => $this->actor->name]);
    }

    private function pr(int $index, ?string $sp): Ppbj
    {
        return Ppbj::create(['ppbj_no' => 'PR/VENDOR/'.str_pad((string) $index, 4, '0', STR_PAD_LEFT),
            'uraian' => 'Kebutuhan kantor', 'awarding_sp' => $sp, 'penyedia_eksternal' => 'Vendor lama', 'total_sebelum_ppn' => 100000]);
    }

    private function payload(array $numbers): array
    {
        return ['nomor_spph' => '703/PKU-XI/SPPH/2026', 'tanggal' => '2026-11-19', 'nomor_pr_type' => 'ppbj', 'nomor_prs' => $numbers,
            'vendor_names' => ['Vendor kandidat A', 'Vendor kandidat B'], 'deskripsi_pengadaan' => 'Paket gabungan', 'pic' => $this->actor->name];
    }

    private function capture(callable $operation): array
    {
        DB::enableQueryLog();
        DB::flushQueryLog();
        try {
            $operation();

            return array_values(array_filter(DB::getQueryLog(), fn ($row) => str_starts_with($row['query'], 'select') && str_contains($row['query'], 'from "sps"')));
        } finally {
            DB::disableQueryLog();
        }
    }

    public function test_create_and_edit_read_twenty_distinct_final_vendors_in_one_query_and_keep_all_links(): void
    {
        $expected = [];
        foreach (range(1, 20) as $index) {
            $sp = $this->sp('SP/VENDOR/'.$index, 'Vendor final '.$index);
            $pr = $this->pr($index, $sp->nomor_sp);
            $expected[$pr->id] = $sp->nama_vendor;
        }
        $numbers = Ppbj::orderByDesc('id')->pluck('ppbj_no')->all();
        $payload = $this->payload($numbers);
        $queries = $this->capture(fn () => $this->postJson(route('spph.store'), $payload)->assertOk());
        $this->assertCount(1, $queries);
        $this->assertStringContainsString('"nomor_sp", "nama_vendor"', $queries[0]['query']);
        $document = Spph::firstOrFail();
        $this->assertSame($numbers, $document->ppbjs()->get()->pluck('ppbj_no')->all());
        $this->assertSame($expected, Ppbj::orderBy('id')->pluck('penyedia_eksternal', 'id')->all());
        foreach (Sp::all() as $sp) {
            $sp->update(['nama_vendor' => $sp->nama_vendor.' diperbarui']);
        }
        $payload['nomor_prs'] = array_reverse($numbers);
        $queries = $this->capture(fn () => $this->putJson(route('spph.update', $document), $payload)->assertOk());
        $this->assertCount(1, $queries);
        $this->assertSame(array_reverse($numbers), $document->ppbjs()->get()->pluck('ppbj_no')->all());
        $this->assertSame(array_map(fn ($vendor) => $vendor.' diperbarui', $expected), Ppbj::orderBy('id')->pluck('penyedia_eksternal', 'id')->all());
    }

    public function test_missing_and_archived_sp_references_fall_back_to_candidates_in_one_read(): void
    {
        foreach (range(1, 20) as $index) {
            $number = 'SP/MISSING/'.$index;
            if ($index <= 10) {
                $this->sp($number, 'Vendor terarsip')->delete();
            }
            $this->pr($index, $number);
        }
        $queries = $this->capture(fn () => $this->postJson(route('spph.store'), $this->payload(Ppbj::pluck('ppbj_no')->all()))->assertOk());
        $this->assertCount(1, $queries);
        $this->assertSame(20, Ppbj::where('penyedia_eksternal', 'Vendor kandidat A; Vendor kandidat B')->count());
    }

    public function test_blank_references_need_no_vendor_query_and_zero_and_trimmed_numbers_remain_valid(): void
    {
        $this->pr(1, null);
        $this->pr(2, '');
        $this->pr(3, " \t ");
        $queries = $this->capture(fn () => $this->postJson(route('spph.store'), $this->payload(Ppbj::pluck('ppbj_no')->all()))->assertOk());
        $this->assertSame([], $queries);
        $this->assertSame(3, Ppbj::where('penyedia_eksternal', 'Vendor kandidat A; Vendor kandidat B')->count());
        $this->sp('0', 'Vendor nol');
        $this->sp('SP/TRIM', 'Vendor spasi');
        $fourth = $this->pr(4, '0');
        $fifth = $this->pr(5, "\t SP/TRIM \n");
        $payload = $this->payload([$fourth->ppbj_no, $fifth->ppbj_no]);
        $queries = $this->capture(fn () => $this->putJson(route('spph.update', Spph::firstOrFail()), $payload)->assertOk());
        $this->assertCount(1, $queries);
        $this->assertSame('Vendor nol', $fourth->fresh()->penyedia_eksternal);
        $this->assertSame('Vendor spasi', $fifth->fresh()->penyedia_eksternal);
    }

    public function test_prefetch_does_not_replace_database_collation_semantics_or_first_reference_cache_behavior(): void
    {
        $this->sp('SP/CASE', 'Vendor huruf besar');
        $this->pr(1, 'sp/case');
        $this->pr(2, 'SP/CASE');
        $controller = app(SpphController::class);
        $records = Ppbj::orderBy('id')->get();
        $read = new \ReflectionMethod($controller, 'activeSpVendorForPpbj');
        $expected = $records->map(fn ($record) => $read->invoke($controller, $record) ?: 'Vendor kandidat A; Vendor kandidat B')->all();
        $this->postJson(route('spph.store'), $this->payload($records->pluck('ppbj_no')->all()))->assertOk();
        $this->assertSame($expected, Ppbj::orderBy('id')->pluck('penyedia_eksternal')->all());
    }

    public function test_accent_insensitive_database_matches_keep_the_existing_scalar_fallback(): void
    {
        $original = DB::getDefaultConnection();
        config(['database.connections.vendor_collation' => ['driver' => 'sqlite', 'database' => ':memory:', 'prefix' => '']]);
        $connection = DB::connection('vendor_collation');
        $connection->getPdo()->sqliteCreateCollation('vendor_compare', fn ($left, $right) => strcasecmp(
            \Illuminate\Support\Str::ascii($left), \Illuminate\Support\Str::ascii($right)
        ));
        $connection->statement('CREATE TABLE sps (nomor_sp TEXT COLLATE vendor_compare, nama_vendor TEXT, deleted_at TEXT)');
        $connection->table('sps')->insert(['nomor_sp' => 'SP/CAFÉ', 'nama_vendor' => 'Vendor aksen']);
        DB::setDefaultConnection('vendor_collation');
        try {
            $records = collect([(new Ppbj)->forceFill(['awarding_sp' => 'SP/CAFE'])]);
            $controller = app(SpphController::class);
            $read = new \ReflectionMethod($controller, 'activeSpVendorForPpbj');
            $prime = new \ReflectionMethod($controller, 'primeActiveSpVendors');
            $queries = $this->capture(function () use ($controller, $read, $prime, $records) {
                $prime->invoke($controller, $records);
                $this->assertSame('Vendor aksen', $read->invoke($controller, $records->first()));
                $this->assertSame('Vendor aksen', $read->invoke($controller, $records->first()));
            });
            $this->assertCount(2, $queries, 'A different database spelling needs one scalar fallback, then the request cache is reused.');
        } finally {
            DB::setDefaultConnection($original);
            DB::purge('vendor_collation');
        }
    }

    public function test_each_save_transaction_discards_vendor_cache_from_a_previous_attempt(): void
    {
        $sp = $this->sp('SP/RETRY', 'Vendor awal');
        $pr = $this->pr(1, $sp->nomor_sp);
        $controller = app(SpphController::class);
        $read = new \ReflectionMethod($controller, 'activeSpVendorForPpbj');
        $this->assertSame('Vendor awal', $read->invoke($controller, $pr));
        $sp->update(['nama_vendor' => 'Vendor sebelum simpan']);
        $this->app->instance(SpphController::class, $controller);
        $payload = $this->payload([$pr->ppbj_no]);
        $this->postJson(route('spph.store'), $payload)->assertOk();
        $this->assertSame('Vendor sebelum simpan', $pr->fresh()->penyedia_eksternal);
        $sp->update(['nama_vendor' => 'Vendor sebelum edit']);
        $this->putJson(route('spph.update', Spph::firstOrFail()), $payload)->assertOk();
        $this->assertSame('Vendor sebelum edit', $pr->fresh()->penyedia_eksternal);
    }
}
