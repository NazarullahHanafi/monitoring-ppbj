<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (Schema::hasTable('ppbj') && ! Schema::hasColumn('ppbj', 'qt_left')) {
            Schema::table('ppbj', function (Blueprint $table) {
                $table->integer('qt_left')->default(0)->after('closed_date');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('ppbj') && Schema::hasColumn('ppbj', 'qt_left')) {
            Schema::table('ppbj', function (Blueprint $table) {
                $table->dropColumn('qt_left');
            });
        }
    }
};
