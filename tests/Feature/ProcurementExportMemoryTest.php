<?php

namespace Tests\Feature;

use App\Models\Sp;
use App\Models\SpItem;
use App\Models\Spph;
use App\Models\User;
use App\Support\ProcurementExportRows;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use WeakReference;

class ProcurementExportMemoryTest extends TestCase
{
    use RefreshDatabase;

    private function seedRows(string $kind, int $count): void
    {
        $rows = [];
        for ($id = 1; $id <= $count; $id++) {
            $rows[] = ['id' => $id, 'sequence_number' => $id % 13, $kind === 'sp' ? 'nomor_sp' : 'nomor_spph' => 'MEMORY/'.$kind.'/'.$id,
                $kind === 'sp' ? 'tanggal_sp' : 'tanggal' => '2026-11-19', 'nama_vendor' => 'Vendor uji', 'pic' => 'Penguji', 'deskripsi_pengadaan' => str_repeat('Uji ekspor ', 400)];
        }
        DB::table($kind === 'sp' ? 'sps' : 'spphs')->insert($rows);
        if ($kind === 'sp') {
            $items = [];
            foreach (range(1, $count) as $id) {
                $items[] = ['sp_id' => $id, 'urutan' => 1, 'nama_barang' => str_repeat('Rincian ', 2000), 'jumlah' => 1, 'harga_satuan' => 1, 'subtotal' => 1];
            }
            DB::table('sp_items')->insert($items);
        }
    }

    public function test_completed_batches_are_released_before_the_next_database_read_without_changing_query_budgets(): void
    {
        foreach (['sp' => Sp::class, 'spph' => Spph::class] as $kind => $model) {
            $this->seedRows($kind, 425);
            $order = $kind === 'sp' ? 'sequence_number' : 'id';
            $expected = DB::table($kind === 'sp' ? 'sps' : 'spphs')->orderByDesc($order);
            if ($order !== 'id') {
                $expected->orderByDesc('id');
            }
            $ids = $expected->pluck('id')->all();
            $seen = [];
            $boundaries = [];
            $retrieved = 0;
            $model::retrieved(function ($row) use (&$seen, &$boundaries, &$retrieved) {
                if ($retrieved > 0 && $retrieved % 200 === 0) {
                    $boundaries[] = count(array_filter($seen, fn ($reference) => $reference->get() !== null));
                    $seen = [];
                }
                $seen[] = WeakReference::create($row);
                $retrieved++;
            });
            $query = $model::query();
            if ($kind === 'sp') {
                $query->with('items');
            }
            DB::enableQueryLog();
            DB::flushQueryLog();
            $actual = [];
            foreach (ProcurementExportRows::rows($query, $order) as $row) {
                $actual[] = $row->id;
                if ($kind === 'sp') {
                    $this->assertCount(1, $row->items);
                }
            }
            $queries = DB::getQueryLog();
            DB::disableQueryLog();
            $this->assertSame($ids, $actual);
            $this->assertSame(425, $retrieved);
            $this->assertCount(2, $boundaries);
            foreach ($boundaries as $alive) {
                $this->assertLessThanOrEqual(1, $alive, 'A completed batch must not remain alive while the next batch loads.');
            }
            $this->assertLessThanOrEqual(1, count(array_filter($seen, fn ($reference) => $reference->get() !== null)));
            $this->assertCount($kind === 'sp' ? 6 : 3, $queries);
            foreach ($queries as $queryLog) {
                $this->assertStringNotContainsString('offset', strtolower($queryLog['query']));
            }
            unset($row);
        }
    }

    public function test_actual_sp_csv_loads_only_needed_item_fields_and_preserves_detail_order_and_csv_safety(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'user']));
        $this->seedRows('sp', 1);
        SpItem::query()->delete();
        DB::table('sp_items')->insert([
            ['sp_id' => 1, 'urutan' => 2, 'nama_barang' => '<b>Barang kedua</b>', 'satuan' => 'unit', 'jumlah' => 2, 'harga_satuan' => 3, 'subtotal' => 6, 'tgl_pemenuhan' => '2027-01-01'],
            ['sp_id' => 1, 'urutan' => 1, 'nama_barang' => '=HYPERLINK("uji")', 'satuan' => 'pcs', 'jumlah' => 1, 'harga_satuan' => 5, 'subtotal' => 5, 'tgl_pemenuhan' => '2027-02-01'],
        ]);
        $columns = [];
        SpItem::retrieved(function ($item) use (&$columns) {
            $columns[] = array_keys($item->getAttributes());
        });
        $response = $this->get(route('sp.export'))->assertOk();
        $csv = $response->streamedContent();
        $this->assertCount(2, $columns);
        foreach ($columns as $fields) {
            $this->assertSame(['id', 'sp_id', 'urutan', 'nama_barang', 'satuan', 'jumlah', 'harga_satuan', 'subtotal'], $fields);
        }
        $this->assertStringContainsString("'=HYPERLINK", $csv);
        $this->assertStringContainsString('Barang kedua', $csv);
        $this->assertStringNotContainsString('<b>', $csv);
        $this->assertStringNotContainsString('2027-', $csv);
        $this->assertLessThan(strpos($csv, 'Barang kedua'), strpos($csv, "'=HYPERLINK"));
        $this->assertSame(1, substr_count($csv, 'MEMORY/sp/1'));
        $this->assertStringContainsString('Subtotal', $csv);
    }

    public function test_early_stop_never_prefetches_the_next_batch_and_releases_rows_when_the_generator_is_closed(): void
    {
        $this->seedRows('spph', 425);
        $references = [];
        Spph::retrieved(function ($row) use (&$references) {
            $references[] = WeakReference::create($row);
        });
        $generator = ProcurementExportRows::rows(Spph::query());
        DB::enableQueryLog();
        DB::flushQueryLog();
        foreach ($generator as $row) {
            break;
        }
        $this->assertCount(1, DB::getQueryLog());
        DB::disableQueryLog();
        $this->assertCount(200, $references);
        unset($generator, $row);
        $this->assertSame(0, count(array_filter($references, fn ($reference) => $reference->get() !== null)));
    }

    public function test_exact_batch_boundaries_keep_all_documents_and_refuse_unsupported_ordering(): void
    {
        $this->seedRows('spph', 400);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $ids = [];
        foreach (ProcurementExportRows::rows(Spph::query()) as $row) {
            $ids[] = $row->id;
        }
        $this->assertSame(range(400, 1), $ids);
        $this->assertCount(3, DB::getQueryLog());
        DB::disableQueryLog();
        $this->expectException(\InvalidArgumentException::class);
        iterator_to_array(ProcurementExportRows::rows(Spph::query(), 'pic'));
    }
}
