<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Maksimal 20 vendor x 255 karakter. Prefix index menjaga ukuran indeks
        // tetap kecil walaupun ringkasan memuat seluruh calon penyedia.
        if (DB::getDriverName() === 'mysql') {
            $indexes = collect(Schema::getIndexes('ppbj'))->pluck('name');
            $clauses = [];
            foreach (['idx_ppbj_penyedia', 'idx_ppbj_penyedia_id'] as $name) {
                if ($indexes->contains($name)) {
                    $clauses[] = "DROP INDEX `{$name}`";
                }
            }
            $clauses[] = 'MODIFY `penyedia_eksternal` TEXT NULL';
            $clauses[] = 'ADD INDEX `idx_ppbj_penyedia` (`penyedia_eksternal`(100))';
            $clauses[] = 'ADD INDEX `idx_ppbj_penyedia_id` (`penyedia_eksternal`(100), `id`)';
            DB::statement('ALTER TABLE `ppbj` '.implode(', ', $clauses));
        } else {
            Schema::table('ppbj', fn (Blueprint $table) => $table->text('penyedia_eksternal')->nullable()->change());
        }
    }

    public function down(): void
    {
        // Tetap gunakan TEXT agar rollback tidak memotong daftar vendor tersimpan.
    }
};
