<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class PpbjImportPreviewTest extends TestCase
{
    use RefreshDatabase;

    public function test_preview_accepts_semicolon_csv_alias_headers_and_indonesian_formats(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        $file = UploadedFile::fake()->createWithContent(
            'import-ppbj.csv',
            implode("\n", [
                'Laporan Import PPBJ',
                'Nomor PR;Deskripsi Pengadaan;Tanggal PR;Nilai PR;Nama Buyer;Kolom Tambahan',
                'PKB/PR-26/CON/9001;Pengadaan perangkat;18/08/2026;Rp50.000.000;Nazar;diabaikan',
            ])
        );

        $response = $this->actingAs($user)->post(route('ppbj.import.preview'), [
            'file' => $file,
        ]);

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('summary.total', 1)
            ->assertJsonPath('summary.valid', 1)
            ->assertJsonPath('summary.error', 0)
            ->assertJsonPath('data.0.ppbj_no', 'PKB/PR-26/CON/9001')
            ->assertJsonPath('data.0.uraian', 'Pengadaan perangkat')
            ->assertJsonPath('data.0.tgl_ppbj', '2026-08-18')
            ->assertJsonPath('data.0.total_sebelum_ppn', 50000000);

        $this->assertStringContainsString(
            'Kolom tambahan diabaikan',
            implode(' ', $response->json('warnings'))
        );
    }

    public function test_preview_marks_bad_rows_but_keeps_valid_rows_importable_with_constant_query_count(): void
    {
        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'user',
        ]);

        Ppbj::create(['ppbj_no' => 'PKB/PR-26/CON/9100']);

        $lines = ['PPBJ No,Uraian,Total Sebelum PPN'];
        foreach (range(1, 100) as $number) {
            $lines[] = sprintf(
                'PKB/PR-26/CON/%04d,Import baris %d,Rp1.500.000',
                9100 + $number,
                $number
            );
        }
        $lines[] = 'PKB/PR-26/CON/9100,Nomor sudah ada,1000000';
        $lines[] = ',Nomor kosong,angka-salah';

        $ppbjQueries = 0;
        DB::listen(function ($query) use (&$ppbjQueries) {
            if (str_contains(strtolower($query->sql), 'from "ppbj"')) {
                $ppbjQueries++;
            }
        });

        $response = $this->actingAs($user)->post(route('ppbj.import.preview'), [
            'file' => UploadedFile::fake()->createWithContent('massal.csv', implode("\n", $lines)),
        ]);

        $response->assertOk()
            ->assertJsonPath('summary.total', 102)
            ->assertJsonPath('summary.valid', 100)
            ->assertJsonPath('summary.error', 2);

        $this->assertLessThanOrEqual(
            1,
            $ppbjQueries,
            'Preview import harus memeriksa seluruh duplikat database dalam satu query.'
        );
    }
}
