<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ppbj', function (Blueprint $table) {
            if (!Schema::hasColumn('ppbj', 'cancelled_by_user_id')) {
                $table->foreignId('cancelled_by_user_id')
                    ->nullable()
                    ->after('cancelled_at')
                    ->constrained('users')
                    ->nullOnDelete();
            }

            if (!Schema::hasColumn('ppbj', 'cancel_verified_by_user_id')) {
                $table->foreignId('cancel_verified_by_user_id')
                    ->nullable()
                    ->after('cancelled_by_user_id')
                    ->constrained('users')
                    ->nullOnDelete();
            }
        });
    }

    public function down(): void
    {
        Schema::table('ppbj', function (Blueprint $table) {
            if (Schema::hasColumn('ppbj', 'cancel_verified_by_user_id')) {
                $table->dropConstrainedForeignId('cancel_verified_by_user_id');
            }

            if (Schema::hasColumn('ppbj', 'cancelled_by_user_id')) {
                $table->dropConstrainedForeignId('cancelled_by_user_id');
            }
        });
    }
};
