<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sps', function (Blueprint $table) {
            if (!Schema::hasColumn('sps', 'created_by_user_id')) {
                $table->foreignId('created_by_user_id')
                    ->nullable()
                    ->after('numbering_mode')
                    ->constrained('users')
                    ->nullOnDelete();
            }
        });

        Schema::table('spphs', function (Blueprint $table) {
            if (!Schema::hasColumn('spphs', 'created_by_user_id')) {
                $table->foreignId('created_by_user_id')
                    ->nullable()
                    ->after('sequence_number')
                    ->constrained('users')
                    ->nullOnDelete();
            }
        });
    }

    public function down(): void
    {
        Schema::table('spphs', function (Blueprint $table) {
            if (Schema::hasColumn('spphs', 'created_by_user_id')) {
                $table->dropConstrainedForeignId('created_by_user_id');
            }
        });

        Schema::table('sps', function (Blueprint $table) {
            if (Schema::hasColumn('sps', 'created_by_user_id')) {
                $table->dropConstrainedForeignId('created_by_user_id');
            }
        });
    }
};
