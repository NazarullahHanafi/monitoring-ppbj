<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('procurement_search_sources', function (Blueprint $table) {
            $table->boolean('passages_version')->default(false);
            $table->unsignedTinyInteger('reader_revision')->default(0);
        });
        Schema::table('procurement_search_terms', fn (Blueprint $table) => $table->unsignedInteger('first_page')->nullable());
        Schema::create('procurement_search_passages', function (Blueprint $table) {
            $table->foreignId('source_id')->constrained('procurement_search_sources')->cascadeOnDelete();
            $table->unsignedInteger('page');
            $table->mediumText('content');
            $table->string('engine', 64)->nullable();
            $table->unsignedTinyInteger('confidence')->nullable();
            $table->string('error', 32)->nullable();
            $table->primary(['source_id', 'page']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('procurement_search_passages');
        Schema::table('procurement_search_terms', fn (Blueprint $table) => $table->dropColumn('first_page'));
        Schema::table('procurement_search_sources', fn (Blueprint $table) => $table->dropColumn(['passages_version', 'reader_revision']));
    }
};
