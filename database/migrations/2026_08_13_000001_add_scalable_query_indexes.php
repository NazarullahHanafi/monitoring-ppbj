<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Composite indexes matched to the application's frequent filters and sorting.
     * Each index is added defensively so the migration remains safe across environments.
     */
    private const INDEXES = [
        'ppbj' => [
            'idx_ppbj_buyer_id' => ['buyer', 'id'],
            'idx_ppbj_portofolio_id' => ['portofolio', 'id'],
            'idx_ppbj_penyedia_id' => ['penyedia_eksternal', 'id'],
        ],
        'sps' => [
            'idx_sps_mode_pic_sequence' => ['numbering_mode', 'pic', 'sequence_number'],
            'idx_sps_mode_date_sequence' => ['numbering_mode', 'tanggal_sp', 'sequence_number'],
        ],
        'spphs' => [
            'idx_spphs_pic_id' => ['pic', 'id'],
        ],
        'activity_logs' => [
            'idx_activity_action_created' => ['action', 'created_at'],
            'idx_activity_user_created' => ['user_id', 'created_at'],
            'idx_activity_model_action_id' => ['model_type', 'model_id', 'action', 'id'],
        ],
        'torprs' => [
            'idx_torprs_portofolio_id' => ['portofolio', 'id'],
        ],
        'users' => [
            'idx_users_department_name' => ['department', 'name'],
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
        foreach (array_reverse(self::INDEXES, true) as $table => $indexes) {
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
