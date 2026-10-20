<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('sps', function (Blueprint $table) {
            $table->softDeletes()->index();
            $table->unsignedBigInteger('archived_by_user_id')->nullable()->index();
            $table->string('archive_reason', 500)->nullable();
        });

        Schema::table('spphs', function (Blueprint $table) {
            $table->softDeletes()->index();
            $table->unsignedBigInteger('archived_by_user_id')->nullable()->index();
            $table->string('archive_reason', 500)->nullable();
        });

        Schema::table('sp_ppbj', function (Blueprint $table) {
            $table->decimal('nilai_alokasi', 18, 2)->nullable()->after('urutan');
            $table->string('allocation_status', 24)->default('automatic')->after('nilai_alokasi');
            $table->index(['sp_id', 'allocation_status'], 'idx_sp_ppbj_allocation_status');
        });

        $this->backfillAllocations();
    }

    public function down(): void
    {
        Schema::table('sp_ppbj', function (Blueprint $table) {
            $table->dropIndex('idx_sp_ppbj_allocation_status');
            $table->dropColumn(['nilai_alokasi', 'allocation_status']);
        });

        Schema::table('spphs', function (Blueprint $table) {
            $table->dropColumn(['deleted_at', 'archived_by_user_id', 'archive_reason']);
        });

        Schema::table('sps', function (Blueprint $table) {
            $table->dropColumn(['deleted_at', 'archived_by_user_id', 'archive_reason']);
        });
    }

    /**
     * Data satu PR pasti mendapat seluruh nilai SP. Paket lama dengan beberapa PR
     * dibagi proporsional dan ditandai untuk ditinjau agar tidak ada penggandaan nilai.
     */
    private function backfillAllocations(): void
    {
        DB::table('sps')
            ->select(['id', 'nomor_sp', 'nilai_sp'])
            ->orderBy('id')
            ->chunkById(100, function ($documents): void {
                foreach ($documents as $sp) {
                    $links = DB::table('sp_ppbj')
                        ->join('ppbj', 'ppbj.id', '=', 'sp_ppbj.ppbj_id')
                        ->where('sp_ppbj.sp_id', $sp->id)
                        ->orderBy('sp_ppbj.urutan')
                        ->select(['sp_ppbj.id as pivot_id', 'ppbj.id as ppbj_id', 'ppbj.total_sebelum_ppn'])
                        ->get();

                    if ($links->isEmpty()) {
                        continue;
                    }

                    $totalSp = round((float) ($sp->nilai_sp ?? 0), 2);
                    $totalPr = (float) $links->sum(fn ($link) => max(0, (float) ($link->total_sebelum_ppn ?? 0)));
                    $allocated = 0.0;
                    $status = $links->count() > 1 ? 'legacy_review' : 'verified';

                    foreach ($links->values() as $index => $link) {
                        $isLast = $index === $links->count() - 1;
                        $weight = $totalPr > 0
                            ? max(0, (float) ($link->total_sebelum_ppn ?? 0)) / $totalPr
                            : 1 / $links->count();
                        $value = $isLast ? round($totalSp - $allocated, 2) : round($totalSp * $weight, 2);
                        $allocated += $value;

                        DB::table('sp_ppbj')->where('id', $link->pivot_id)->update([
                            'nilai_alokasi' => $value,
                            'allocation_status' => $status,
                        ]);

                        DB::table('ppbj')
                            ->where('id', $link->ppbj_id)
                            ->where('awarding_sp', $sp->nomor_sp)
                            ->update(['nilai_sp_spk' => $value]);
                    }
                }
            });
    }
};
