<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('spph_ppbj', function (Blueprint $table) {
            $table->id();
            $table->foreignId('spph_id')->constrained('spphs')->cascadeOnDelete();
            $table->foreignId('ppbj_id')->constrained('ppbj')->cascadeOnDelete();
            $table->unsignedSmallInteger('urutan')->default(1);
            $table->timestamps();

            $table->unique(['spph_id', 'ppbj_id']);
            $table->unique('ppbj_id');
            $table->index(['spph_id', 'urutan']);
        });

        Schema::create('sp_ppbj', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sp_id')->constrained('sps')->cascadeOnDelete();
            $table->foreignId('ppbj_id')->constrained('ppbj')->cascadeOnDelete();
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
