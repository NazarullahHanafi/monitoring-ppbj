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

        $backfill = function (string $sourceTable, string $pivotTable, string $foreignKey) use ($now): void {
            DB::table($sourceTable)
                ->select(['id', 'nomor_pr'])
                ->whereNotNull('nomor_pr')
                ->where('nomor_pr', '!=', '')
                ->orderBy('id')
                ->chunkById(250, function ($documents) use ($pivotTable, $foreignKey, $now) {
                    // Production has legacy columns with different collations.
                    // Comparing each column with bound values (instead of a
                    // cross-table JOIN) remains indexed and avoids collation errors.
                    $ppbjIds = DB::table('ppbj')
                        ->whereIn('ppbj_no', $documents->pluck('nomor_pr')->unique()->all())
                        ->pluck('id', 'ppbj_no');

                    $rows = $documents->map(function ($document) use ($ppbjIds, $foreignKey, $now) {
                        $ppbjId = $ppbjIds->get($document->nomor_pr);

                        return $ppbjId ? [
                            $foreignKey => $document->id,
                            'ppbj_id' => $ppbjId,
                            'urutan' => 1,
                            'created_at' => $now,
                            'updated_at' => $now,
                        ] : null;
                    })->filter()->values()->all();

                    if ($rows !== []) {
                        DB::table($pivotTable)->insertOrIgnore($rows);
                    }
                });
        };

        $backfill('spphs', 'spph_ppbj', 'spph_id');
        $backfill('sps', 'sp_ppbj', 'sp_id');
    }

    public function down(): void
    {
        Schema::dropIfExists('sp_ppbj');
        Schema::dropIfExists('spph_ppbj');
    }
};
