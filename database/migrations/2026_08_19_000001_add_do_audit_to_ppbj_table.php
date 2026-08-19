<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('ppbj')) {
            return;
        }

        $needsUpdatedAt = ! Schema::hasColumn('ppbj', 'do_updated_at');
        $needsUpdatedBy = ! Schema::hasColumn('ppbj', 'do_updated_by_user_id');

        if (! $needsUpdatedAt && ! $needsUpdatedBy) {
            return;
        }

        Schema::table('ppbj', function (Blueprint $table) use ($needsUpdatedAt, $needsUpdatedBy) {
            if ($needsUpdatedAt) {
                $table->timestamp('do_updated_at')->nullable()->after('do_no');
            }

            if ($needsUpdatedBy) {
                $table->foreignId('do_updated_by_user_id')
                    ->nullable()
                    ->after('do_updated_at')
                    ->constrained('users')
                    ->nullOnDelete();
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('ppbj')) {
            return;
        }

        if (Schema::hasColumn('ppbj', 'do_updated_by_user_id')) {
            Schema::table('ppbj', function (Blueprint $table) {
                $table->dropConstrainedForeignId('do_updated_by_user_id');
            });
        }

        if (Schema::hasColumn('ppbj', 'do_updated_at')) {
            Schema::table('ppbj', function (Blueprint $table) {
                $table->dropColumn('do_updated_at');
            });
        }
    }
};
