<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('procurement_search_sources', fn (Blueprint $table) => $table->index(['reference', 'active'], 'proc_search_reference'));
    }

    public function down(): void
    {
        Schema::table('procurement_search_sources', fn (Blueprint $table) => $table->dropIndex('proc_search_reference'));
    }
};
