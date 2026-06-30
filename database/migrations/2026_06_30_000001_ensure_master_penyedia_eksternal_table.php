<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('master_penyedia_eksternal')) {
            Schema::create('master_penyedia_eksternal', function (Blueprint $table) {
                $table->id();
                $table->string('nama', 100);
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('master_penyedia_eksternal_table')) {
            return;
        }

        $hasCreatedAt = Schema::hasColumn('master_penyedia_eksternal', 'created_at');
        $hasUpdatedAt = Schema::hasColumn('master_penyedia_eksternal', 'updated_at');
        $now = now();

        DB::table('master_penyedia_eksternal_table')
            ->select('nama')
            ->whereNotNull('nama')
            ->orderBy('id')
            ->chunk(100, function ($rows) use ($hasCreatedAt, $hasUpdatedAt, $now) {
                foreach ($rows as $row) {
                    $nama = trim((string) $row->nama);

                    if ($nama === '' || DB::table('master_penyedia_eksternal')->where('nama', $nama)->exists()) {
                        continue;
                    }

                    $payload = ['nama' => $nama];
                    if ($hasCreatedAt) {
                        $payload['created_at'] = $now;
                    }
                    if ($hasUpdatedAt) {
                        $payload['updated_at'] = $now;
                    }

                    DB::table('master_penyedia_eksternal')->insert($payload);
                }
            });
    }

    public function down(): void
    {
        Schema::dropIfExists('master_penyedia_eksternal');
    }
};
