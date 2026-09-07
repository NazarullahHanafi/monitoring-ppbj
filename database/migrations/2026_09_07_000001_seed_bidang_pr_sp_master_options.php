<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private const OPTIONS = [
        'DUKUNGAN BISNIS',
        'INSPEKSI TEKNIK',
        'INSPEKSI UMUM',
        'PENGUJIAN DAN KONSULTANSI',
    ];

    public function up(): void
    {
        $now = now();

        DB::table('sp_master_options')->insertOrIgnore(
            array_map(fn (string $nama) => [
                'type' => 'bidang_pr',
                'nama' => $nama,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ], self::OPTIONS)
        );
    }

    public function down(): void
    {
        DB::table('sp_master_options')
            ->where('type', 'bidang_pr')
            ->whereIn('nama', self::OPTIONS)
            ->delete();
    }
};
