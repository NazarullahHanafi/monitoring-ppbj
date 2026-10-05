<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const INDEXES = [
        'ppbj' => [
            'idx_ppbj_value_pr' => ['total_sebelum_ppn'],
            'idx_ppbj_value_sp' => ['nilai_sp_spk'],
            'idx_ppbj_deadline_status' => ['promised_date', 'status'],
            'idx_ppbj_progress_updated' => ['progres', 'updated_at'],
        ],
        'sps' => [
            'idx_sps_value_sp' => ['nilai_sp'],
            'idx_sps_value_pr' => ['nilai_pr'],
        ],
    ];

    public function up(): void
    {
        foreach (self::INDEXES as $table => $indexes) {
            if (! Schema::hasTable($table)) {
                continue;
            }
            $existing = collect(Schema::getIndexes($table))->pluck('name')->all();
            foreach ($indexes as $name => $columns) {
                if (! in_array($name, $existing, true) && collect($columns)->every(fn ($column) => Schema::hasColumn($table, $column))) {
                    Schema::table($table, fn (Blueprint $blueprint) => $blueprint->index($columns, $name));
                }
            }
        }
    }

    public function down(): void
    {
        foreach (self::INDEXES as $table => $indexes) {
            if (! Schema::hasTable($table)) {
                continue;
            }
            $existing = collect(Schema::getIndexes($table))->pluck('name')->all();
            foreach (array_keys($indexes) as $name) {
                if (in_array($name, $existing, true)) {
                    Schema::table($table, fn (Blueprint $blueprint) => $blueprint->dropIndex($name));
                }
            }
        }
    }
};
