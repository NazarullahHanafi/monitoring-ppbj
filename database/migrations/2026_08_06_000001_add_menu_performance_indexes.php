<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const INDEXES = [
        'ppbj' => [
            'idx_ppbj_status_progress_sla' => ['status', 'progres', 'sisa_target_sla'],
            'idx_ppbj_tgl_ppbj_id' => ['tgl_ppbj', 'id'],
            'idx_ppbj_awarding_sp' => ['awarding_sp'],
            'idx_ppbj_spph_rfq_1' => ['spph_rfq_1'],
        ],
        'sps' => [
            'idx_sps_mode_sequence' => ['numbering_mode', 'sequence_number'],
            'idx_sps_pic_tanggal' => ['pic', 'tanggal_sp'],
            'idx_sps_tanggal_id' => ['tanggal_sp', 'id'],
            'idx_sps_vendor' => ['nama_vendor'],
        ],
        'spphs' => [
            'idx_spphs_pic_tanggal' => ['pic', 'tanggal'],
            'idx_spphs_tanggal_id' => ['tanggal', 'id'],
            'idx_spphs_vendor' => ['nama_vendor'],
        ],
    ];

    public function up(): void
    {
        foreach (self::INDEXES as $table => $indexes) {
            foreach ($indexes as $name => $columns) {
                $this->addIndexIfPossible($table, $columns, $name);
            }
        }
    }

    public function down(): void
    {
        foreach (array_reverse(self::INDEXES) as $table => $indexes) {
            foreach (array_reverse(array_keys($indexes)) as $name) {
                $this->dropIndexIfExists($table, $name);
            }
        }
    }

    private function addIndexIfPossible(string $table, array $columns, string $name): void
    {
        if (! Schema::hasTable($table) || $this->indexExists($table, $name)) {
            return;
        }

        foreach ($columns as $column) {
            if (! Schema::hasColumn($table, $column)) {
                return;
            }
        }

        Schema::table($table, fn (Blueprint $blueprint) => $blueprint->index($columns, $name));
    }

    private function dropIndexIfExists(string $table, string $name): void
    {
        if (! Schema::hasTable($table) || ! $this->indexExists($table, $name)) {
            return;
        }

        Schema::table($table, fn (Blueprint $blueprint) => $blueprint->dropIndex($name));
    }

    private function indexExists(string $table, string $name): bool
    {
        return collect(Schema::getIndexes($table))
            ->pluck('name')
            ->contains($name);
    }
};
