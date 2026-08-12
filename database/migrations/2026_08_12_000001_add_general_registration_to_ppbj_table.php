<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ppbj', function (Blueprint $table) {
            if (! Schema::hasColumn('ppbj', 'general_registration_number')) {
                $table->string('general_registration_number', 60)
                    ->nullable()
                    ->unique()
                    ->after('created_by_user_id');
            }

            if (! Schema::hasColumn('ppbj', 'general_registered_at')) {
                $table->dateTime('general_registered_at')
                    ->nullable()
                    ->index()
                    ->after('general_registration_number');
            }

            if (! Schema::hasColumn('ppbj', 'general_registered_by_user_id')) {
                $table->unsignedBigInteger('general_registered_by_user_id')
                    ->nullable()
                    ->index()
                    ->after('general_registered_at');
            }
        });
    }

    public function down(): void
    {
        Schema::table('ppbj', function (Blueprint $table) {
            if (Schema::hasColumn('ppbj', 'general_registered_by_user_id')) {
                $table->dropColumn('general_registered_by_user_id');
            }

            if (Schema::hasColumn('ppbj', 'general_registered_at')) {
                $table->dropColumn('general_registered_at');
            }

            if (Schema::hasColumn('ppbj', 'general_registration_number')) {
                $table->dropColumn('general_registration_number');
            }
        });
    }
};
