<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('torprs', function (Blueprint $table) {
            $table->string('nomor_pr')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('torprs', function (Blueprint $table) {
            $table->string('nomor_pr')->nullable(false)->change();
        });
    }
};
