<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Keep both PR-number columns on the same collation so MySQL can use the
     * existing unique indexes for the TORPR-to-PPBJ join.
     */
    public function up(): void
    {
        if (DB::getDriverName() !== 'mysql') {
            return;
        }

        DB::statement(<<<'SQL'
            ALTER TABLE torprs
            MODIFY nomor_pr VARCHAR(255)
            CHARACTER SET utf8mb4
            COLLATE utf8mb4_general_ci
            NULL
        SQL);
    }

    public function down(): void
    {
        if (DB::getDriverName() !== 'mysql') {
            return;
        }

        DB::statement(<<<'SQL'
            ALTER TABLE torprs
            MODIFY nomor_pr VARCHAR(255)
            CHARACTER SET utf8mb4
            COLLATE utf8mb4_unicode_ci
            NULL
        SQL);
    }
};
