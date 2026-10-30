<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const INDEXES = [
        'ppbj_real_trackings' => ['real_tracking_ppbj_id_index', ['ppbj_id', 'id']],
        'activity_logs' => ['activity_created_id_index', ['created_at', 'id']],
    ];

    public function up(): void
    {
        foreach (self::INDEXES as $name => [$indexName, $columns]) {
            if (! Schema::hasTable($name)) {
                continue;
            }
            // Existing left-prefix indexes already cover these lookups.
            $covered = collect(Schema::getIndexes($name))
                ->contains(fn ($index) => ($index['columns'][0] ?? null) === $columns[0]);
            if (! $covered) {
                Schema::table($name, fn (Blueprint $table) => $table->index($columns, $indexName));
            }
        }
    }

    public function down(): void
    {
        foreach (self::INDEXES as $name => [$indexName]) {
            if (Schema::hasTable($name) && Schema::hasIndex($name, $indexName)) {
                Schema::table($name, fn (Blueprint $table) => $table->dropIndex($indexName));
            }
        }
    }
};
