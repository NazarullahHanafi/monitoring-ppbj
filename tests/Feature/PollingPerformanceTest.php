<?php

namespace Tests\Feature;

use App\Models\PrReceiptApproval;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\Torpr;
use App\Models\TorprEditRequest;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class PollingPerformanceTest extends TestCase
{
    use RefreshDatabase;

    public function test_shared_assets_are_loaded_once_and_layout_css_is_browser_cacheable(): void
    {
        $layout = file_get_contents(resource_path('views/layouts/app.blade.php'));
        $torpr = file_get_contents(resource_path('views/torpr/index.blade.php'));
        $appCss = file_get_contents(resource_path('css/app.css'));

        $this->assertSame(1, substr_count($layout, 'sweetalert2@11'));
        $this->assertSame(1, substr_count($layout, 'select2.min.js'));
        $this->assertStringNotContainsString('xlsx.full.min.js', $layout);
        $this->assertStringNotContainsString('sweetalert2@11', $torpr);
        $this->assertStringNotContainsString('select2.min.js', $torpr);
        $this->assertStringContainsString('Layout application styles (browser-cacheable)', $appCss);
    }

    public function test_sp_polling_is_limited_to_prevent_large_payloads(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        foreach (range(1, 60) as $number) {
            Sp::create([
                'nomor_sp' => sprintf('%03d/PKU-I/SP/2026', $number),
                'sequence_number' => $number,
                'tanggal_sp' => now()->toDateString(),
                'nomor_pr' => sprintf('PKB/PR-26/CON/%04d', $number),
                'nama_vendor' => 'Vendor '.$number,
                'deskripsi_pengadaan' => 'Pengadaan test '.$number,
                'pic' => 'PIC Test',
            ]);
        }

        $this->actingAs($user)
            ->getJson(route('sp.poll', ['last_id' => 0]))
            ->assertOk()
            ->assertJsonCount(50, 'rows')
            ->assertJsonPath('rows.0.id', 1)
            ->assertJsonPath('rows.49.id', 50);
    }

    public function test_sp_and_spph_indexes_only_render_ten_rows_by_default(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        foreach (range(1, 15) as $number) {
            Sp::create([
                'nomor_sp' => sprintf('%03d/PKU-VIII/SP/2026', $number),
                'sequence_number' => $number,
                'tanggal_sp' => '2026-08-13',
                'nama_vendor' => 'Vendor '.$number,
                'deskripsi_pengadaan' => 'Pengadaan SP '.$number,
                'pic' => $user->name,
            ]);

            Spph::create([
                'nomor_spph' => sprintf('%03d/PKU-VIII/SPPH/2026', $number),
                'sequence_number' => $number,
                'tanggal' => '2026-08-13',
                'nama_vendor' => 'Vendor '.$number,
                'deskripsi_pengadaan' => 'Pengadaan SPPH '.$number,
                'pic' => $user->name,
            ]);
        }

        $spResponse = $this->actingAs($user)->get(route('sp.index'));
        $spphResponse = $this->actingAs($user)->get(route('spph.index'));

        $spResponse->assertOk();
        $spphResponse->assertOk();
        $this->assertCount(10, $spResponse->viewData('sps')->items());
        $this->assertCount(10, $spphResponse->viewData('spphs')->items());
        $this->assertSame(15, $spResponse->viewData('sps')->total());
        $this->assertSame(15, $spphResponse->viewData('spphs')->total());
    }

    public function test_vendor_index_only_renders_ten_rows_by_default(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        foreach (range(1, 15) as $number) {
            Vendor::create([
                'nama_vendor' => sprintf('Vendor Pagination %02d', $number),
                'is_active' => true,
            ]);
        }

        $response = $this->actingAs($user)->get(route('vendor.index'));

        $response->assertOk();
        $this->assertCount(10, $response->viewData('vendors')->items());
        $this->assertSame(15, $response->viewData('vendors')->total());
    }

    public function test_ppbj_search_does_not_run_a_second_full_table_scan(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        DB::table('ppbj')->insert([
            'ppbj_no' => 'PKB/PR-26/CON/0401',
            'tgl_ppbj' => now()->toDateString(),
            'uraian' => 'Pengadaan layanan keamanan',
            'buyer' => 'Umum',
            'portofolio' => 'Support',
            'total_sebelum_ppn' => 1000000,
            'status' => 'ACTIVE',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $ppbjSelects = [];
        DB::listen(function ($query) use (&$ppbjSelects) {
            if (str_contains(strtolower($query->sql), 'from "ppbj"')) {
                $ppbjSelects[] = strtolower($query->sql);
            }
        });

        $this->actingAs($user)
            ->get(route('ppbj.index', ['search' => '0401']))
            ->assertOk()
            ->assertSee('Management PPBJ');

        $this->assertCount(2, $ppbjSelects, 'Pencarian cukup memakai query count dan data pagination.');
        $this->assertFalse(
            collect($ppbjSelects)->contains(fn ($sql) => str_contains($sql, 'max(case when')),
            'Pencarian tidak boleh menjalankan aggregate full-table scan tambahan.'
        );
    }

    public function test_ppbj_month_filter_keeps_date_index_usable(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        foreach (['2026-07-31', '2026-08-01', '2026-08-31', '2026-09-01'] as $index => $date) {
            DB::table('ppbj')->insert([
                'ppbj_no' => sprintf('PKB/PR-26/CON/%04d', 5000 + $index),
                'tgl_ppbj' => $date,
                'uraian' => 'Uji filter tanggal '.$date,
                'total_sebelum_ppn' => 1000000,
                'status' => 'ACTIVE',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            if (str_contains(strtolower($query->sql), 'from "ppbj"')) {
                $queries[] = strtolower($query->sql);
            }
        });

        $response = $this->actingAs($user)->get(route('ppbj.index', [
            'date_type' => 'monthly',
            'date_month' => '2026-08',
        ]));

        $response->assertOk()
            ->assertSee('PKB/PR-26/CON/5001')
            ->assertSee('PKB/PR-26/CON/5002')
            ->assertDontSee('PKB/PR-26/CON/5000')
            ->assertDontSee('PKB/PR-26/CON/5003');

        $this->assertFalse(
            collect($queries)->contains(fn ($sql) => str_contains($sql, 'strftime') || str_contains($sql, 'extract(')),
            'Filter bulan harus memakai date range agar indeks tanggal tetap dapat digunakan.'
        );
    }

    public function test_torpr_month_filter_keeps_date_index_usable(): void
    {
        $user = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $outsideCurrentMonth = now()->subMonthNoOverflow()->startOfMonth()->toDateString();
        $insideCurrentMonth = now()->startOfMonth()->addDays(9)->toDateString();

        foreach ([$outsideCurrentMonth, $insideCurrentMonth] as $index => $date) {
            DB::table('torprs')->insert([
                'nomor_pr' => sprintf('PKB/PR-26/CON/%04d', 6000 + $index),
                'tujuan_pengadaan' => 'Uji TORPR '.$date,
                'tanggal_pr' => $date,
                'jumlah_pr' => 1000000,
                'created_by_user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $queries = [];
        DB::listen(function ($query) use (&$queries) {
            if (str_contains(strtolower($query->sql), 'from "torprs"')) {
                $queries[] = strtolower($query->sql);
            }
        });

        $response = $this->actingAs($user)->get(route('torpr.index', [
            'date_filter' => 'this_month',
        ]));

        $response->assertOk()
            ->assertSee('PKB/PR-26/CON/6001')
            ->assertDontSee('PKB/PR-26/CON/6000');

        $this->assertFalse(
            collect($queries)->contains(fn ($sql) => str_contains($sql, 'strftime') || str_contains($sql, 'extract(')),
            'Filter bulan TORPR harus memakai date range agar indeks tanggal tetap dapat digunakan.'
        );
    }

    public function test_ppbj_index_query_count_stays_constant_with_thousands_of_rows(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        foreach (array_chunk(range(1, 2000), 400) as $numbers) {
            DB::table('ppbj')->insert(array_map(fn (int $number) => [
                'ppbj_no' => sprintf('LOAD/PR-26/CON/%05d', $number),
                'tgl_ppbj' => '2026-08-01',
                'uraian' => 'Pengujian pagination PPBJ '.$number,
                'total_sebelum_ppn' => 1000000,
                'status' => 'ACTIVE',
                'created_at' => now(),
                'updated_at' => now(),
            ], $numbers));
        }

        $ppbjSelects = [];
        DB::listen(function ($query) use (&$ppbjSelects) {
            if (str_contains(strtolower($query->sql), 'from "ppbj"')) {
                $ppbjSelects[] = strtolower($query->sql);
            }
        });

        $response = $this->actingAs($user)->get(route('ppbj.index', ['per_page' => 25]));

        $response->assertOk();
        $this->assertCount(25, $response->viewData('ppbj')->items());
        $this->assertCount(
            2,
            $ppbjSelects,
            'Dua ribu data tetap cukup memakai query count dan satu query halaman.'
        );
    }

    public function test_torpr_index_only_hydrates_current_page_with_thousands_of_rows(): void
    {
        $user = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        foreach (array_chunk(range(1, 1500), 300) as $numbers) {
            DB::table('torprs')->insert(array_map(fn (int $number) => [
                'nomor_pr' => sprintf('LOAD/PR-26/CON/%05d', $number),
                'tujuan_pengadaan' => 'Pengujian pagination TORPR '.$number,
                'tanggal_pr' => '2026-08-01',
                'jumlah_pr' => 1000000,
                'created_by_user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ], $numbers));
        }

        $torprSelects = [];
        DB::listen(function ($query) use (&$torprSelects) {
            if (str_contains(strtolower($query->sql), 'from "torprs"')) {
                $torprSelects[] = strtolower($query->sql);
            }
        });

        $response = $this->actingAs($user)->get(route('torpr.index', ['per_page' => 25]));

        $response->assertOk();
        $this->assertCount(25, $response->viewData('rows')->items());
        $this->assertLessThanOrEqual(
            4,
            count($torprSelects),
            'Daftar TORPR tidak boleh memuat seluruh record ketika tabel membesar.'
        );
    }

    public function test_torpr_index_hydrates_only_the_latest_receipt_approval(): void
    {
        $user = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);

        $torpr = Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/9901',
            'tujuan_pengadaan' => 'Uji approval terakhir',
            'tanggal_pr' => '2026-08-13',
            'jumlah_pr' => 1000000,
            'created_by_user_id' => $user->id,
        ]);

        PrReceiptApproval::create([
            'torpr_id' => $torpr->id,
            'requested_by_user_id' => $user->id,
            'requested_name' => $user->name,
            'requested_at' => now()->subHour(),
            'status' => 'APPROVED',
        ]);

        $latest = PrReceiptApproval::create([
            'torpr_id' => $torpr->id,
            'requested_by_user_id' => $user->id,
            'requested_name' => $user->name,
            'requested_at' => now(),
            'status' => 'PENDING',
        ]);

        $response = $this->actingAs($user)->get(route('torpr.index', [
            'receipt_status' => 'PENDING',
        ]));

        $response->assertOk();
        $row = collect($response->viewData('rows')->items())->firstWhere('id', $torpr->id);
        $this->assertNotNull($row);
        $this->assertSame($latest->id, $row->approval_id);
        $this->assertSame('PENDING', $row->approval_status);

        $this->actingAs($user)
            ->get(route('torpr.index', ['receipt_status' => 'APPROVED']))
            ->assertOk()
            ->assertDontSee('PKB/PR-26/CON/9901');
    }

    public function test_torpr_edit_request_center_is_loaded_on_demand_for_current_user(): void
    {
        $owner = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);
        $requester = User::factory()->create([
            'department' => 'operasional',
            'role' => 'user',
        ]);
        $torpr = Torpr::create([
            'nomor_pr' => 'PKB/PR-26/CON/9902',
            'tujuan_pengadaan' => 'Uji pusat request edit',
            'tanggal_pr' => '2026-08-13',
            'jumlah_pr' => 1000000,
            'created_by_user_id' => $owner->id,
        ]);

        TorprEditRequest::create([
            'torpr_id' => $torpr->id,
            'requester_user_id' => $requester->id,
            'owner_user_id' => $owner->id,
            'status' => 'pending',
            'reason' => 'Perlu koreksi data pengadaan',
        ]);

        $this->actingAs($owner)
            ->getJson(route('torpr.editRequests.center'))
            ->assertOk()
            ->assertJsonCount(1, 'incoming')
            ->assertJsonCount(0, 'outgoing')
            ->assertJsonPath('incoming.0.nomor_pr', 'PKB/PR-26/CON/9902')
            ->assertJsonPath('incoming.0.reason', 'Perlu koreksi data pengadaan');

        $this->actingAs($requester)
            ->getJson(route('torpr.editRequests.center'))
            ->assertOk()
            ->assertJsonCount(0, 'incoming')
            ->assertJsonCount(1, 'outgoing');
    }

    public function test_spph_vendor_usage_statistics_are_loaded_on_demand(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        Spph::create([
            'nomor_spph' => '990/PKU-VIII/SPPH/2026',
            'sequence_number' => 990,
            'tanggal' => '2026-08-13',
            'nama_vendor' => 'Vendor Statistik',
            'deskripsi_pengadaan' => 'Uji statistik vendor',
            'pic' => $user->name,
        ]);
        Sp::create([
            'nomor_sp' => '990/PKU-VIII/SP/2026',
            'sequence_number' => 990,
            'tanggal_sp' => '2026-08-13',
            'nama_vendor' => 'Vendor Statistik',
            'deskripsi_pengadaan' => 'Uji statistik vendor',
            'pic' => $user->name,
        ]);

        $this->actingAs($user)
            ->getJson(route('spph.vendor-usage-stats'))
            ->assertOk()
            ->assertJsonPath('stats.vendor statistik.spph_count', 1)
            ->assertJsonPath('stats.vendor statistik.sp_count', 1)
            ->assertJsonPath('stats.vendor statistik.total_count', 2);
    }
}
