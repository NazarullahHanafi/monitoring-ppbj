<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('ppbj', function (Blueprint $table) {
            // pastikan kolomnya sudah ada
            $table->string('ppbj_no')->unique()->change();
        });
    }

    public function down(): void
    {
        Schema::table('ppbj', function (Blueprint $table) {
            $table->dropUnique(['ppbj_no']);
        });
    }
};
