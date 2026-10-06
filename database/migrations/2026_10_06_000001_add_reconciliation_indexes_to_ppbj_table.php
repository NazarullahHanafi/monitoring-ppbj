<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const INDEXES = [
        'idx_ppbj_value_bpg' => ['nilai_bpg'],
        'idx_ppbj_status_updated' => ['status', 'updated_at'],
    ];

    public function up(): void
    {
        if (! Schema::hasTable('ppbj')) {
            return;
        }

        $existing = collect(Schema::getIndexes('ppbj'))->pluck('name')->all();
        foreach (self::INDEXES as $name => $columns) {
            if (! in_array($name, $existing, true) && collect($columns)->every(fn ($column) => Schema::hasColumn('ppbj', $column))) {
                Schema::table('ppbj', fn (Blueprint $table) => $table->index($columns, $name));
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
                Schema::table('ppbj', fn (Blueprint $table) => $table->dropIndex($name));
            }
        }
    }
};
