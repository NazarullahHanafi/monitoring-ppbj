<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Full seeder — import semua data dari Excel SPPH & SP 2026
 * Jalankan: php artisan db:seed --class=DatabaseSeederFull
 *
 * PENTING: Pastikan migration sudah dijalankan terlebih dahulu.
 *          Seeder ini menggunakan insertOrIgnore sehingga aman dijalankan ulang.
 */
class DatabaseSeederFull extends Seeder
{
    public function run(): void
    {
        $this->call(VendorFullSeeder::class);
        $this->call(SpphFullSeeder::class);
        $this->call(SpFullSeeder::class);
    }
}
