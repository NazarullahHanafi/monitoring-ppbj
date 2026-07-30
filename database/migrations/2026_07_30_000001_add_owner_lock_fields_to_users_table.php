<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('users')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('department')->index();
            }

            if (! Schema::hasColumn('users', 'locked_at')) {
                $table->timestamp('locked_at')->nullable()->after('is_active');
            }

            if (! Schema::hasColumn('users', 'locked_by')) {
                $table->string('locked_by')->nullable()->after('locked_at');
            }

            if (! Schema::hasColumn('users', 'locked_reason')) {
                $table->string('locked_reason')->nullable()->after('locked_by');
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('users')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            foreach (['locked_reason', 'locked_by', 'locked_at'] as $column) {
                if (Schema::hasColumn('users', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
