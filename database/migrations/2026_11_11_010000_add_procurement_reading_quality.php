<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('procurement_search_sources', function (Blueprint $table) {
            $table->string('reading_engine', 64)->nullable();
            $table->unsignedTinyInteger('reading_confidence')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('procurement_search_sources', fn (Blueprint $table) => $table->dropColumn(['reading_engine', 'reading_confidence']));
    }
};
