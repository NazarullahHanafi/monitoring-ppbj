<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const INDEXES = [
        'idx_ppbj_status' => ['status'],
        'idx_ppbj_status_sla' => ['status_sla'],
        'idx_ppbj_buyer' => ['buyer'],
        'idx_ppbj_portofolio' => ['portofolio'],
        'idx_ppbj_penyedia' => ['penyedia_eksternal'],
        'idx_ppbj_updated_at' => ['updated_at'],
        'idx_ppbj_created_at' => ['created_at'],
        'idx_ppbj_status_sla_combo' => ['status', 'status_sla'],
        'idx_ppbj_status_updated' => ['status', 'updated_at'],
    ];

    public function up(): void
    {
        if (! Schema::hasTable('ppbj')) {
            return;
        }

        $existing = collect(Schema::getIndexes('ppbj'))->pluck('name')->all();
        foreach (self::INDEXES as $name => $columns) {
            $columnsExist = collect($columns)->every(fn(string $column) => Schema::hasColumn('ppbj', $column));
            if ($columnsExist && ! in_array($name, $existing, true)) {
                Schema::table('ppbj', fn(Blueprint $table) => $table->index($columns, $name));
            }
        }
    }

    public function down(): void
    {
        if (! Schema::hasTable('ppbj')) {
            return;
        }

        $existing = collect(Schema::getIndexes('ppbj'))->pluck('name')->all();
        foreach (array_keys(self::INDEXES) as $name) {
            if (in_array($name, $existing, true)) {
                Schema::table('ppbj', fn(Blueprint $table) => $table->dropIndex($name));
            }
        }
    }
};
