<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // A failed DDL statement on MySQL can leave the new table behind even
        // though Laravel has not recorded this migration. Removing only these
        // brand-new pivot tables makes a retry deterministic and safe.
        Schema::dropIfExists('sp_ppbj');
        Schema::dropIfExists('spph_ppbj');

        Schema::create('spph_ppbj', function (Blueprint $table) {
            $table->id();
            // Production still contains legacy INT primary keys while newer
            // installations use BIGINT. BIGINT pivot values work for both;
            // cleanup is handled by model events instead of incompatible FKs.
            $table->unsignedBigInteger('spph_id');
            $table->unsignedBigInteger('ppbj_id');
            $table->unsignedSmallInteger('urutan')->default(1);
            $table->timestamps();

            $table->unique(['spph_id', 'ppbj_id']);
            $table->unique('ppbj_id');
            $table->index(['spph_id', 'urutan']);
        });

        Schema::create('sp_ppbj', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sp_id');
            $table->unsignedBigInteger('ppbj_id');
            $table->unsignedSmallInteger('urutan')->default(1);
            $table->timestamps();

            $table->unique(['sp_id', 'ppbj_id']);
            $table->unique('ppbj_id');
            $table->index(['sp_id', 'urutan']);
        });

        $now = now();

        DB::table('spphs')
            ->join('ppbj', 'ppbj.ppbj_no', '=', 'spphs.nomor_pr')
            ->select(['spphs.id as document_id', 'ppbj.id as ppbj_id'])
            ->orderBy('spphs.id')
            ->chunkById(250, function ($rows) use ($now) {
                DB::table('spph_ppbj')->insertOrIgnore($rows->map(fn ($row) => [
                    'spph_id' => $row->document_id,
                    'ppbj_id' => $row->ppbj_id,
                    'urutan' => 1,
                    'created_at' => $now,
                    'updated_at' => $now,
                ])->all());
            }, 'spphs.id', 'document_id');

        DB::table('sps')
            ->join('ppbj', 'ppbj.ppbj_no', '=', 'sps.nomor_pr')
            ->select(['sps.id as document_id', 'ppbj.id as ppbj_id'])
            ->orderBy('sps.id')
            ->chunkById(250, function ($rows) use ($now) {
                DB::table('sp_ppbj')->insertOrIgnore($rows->map(fn ($row) => [
                    'sp_id' => $row->document_id,
                    'ppbj_id' => $row->ppbj_id,
                    'urutan' => 1,
                    'created_at' => $now,
                    'updated_at' => $now,
                ])->all());
            }, 'sps.id', 'document_id');
    }

    public function down(): void
    {
        Schema::dropIfExists('sp_ppbj');
        Schema::dropIfExists('spph_ppbj');
    }
};
