<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('procurement_search_sources', function (Blueprint $table) {
            $table->timestamp('queued_at')->nullable();
            $table->timestamp('priority_until')->nullable();
            $table->unsignedInteger('priority_pages')->default(0);
            $table->index(['active', 'state', 'priority_until'], 'proc_search_priority');
        });
    }

    public function down(): void
    {
        Schema::table('procurement_search_sources', function (Blueprint $table) {
            $table->dropIndex('proc_search_priority');
            $table->dropColumn(['queued_at', 'priority_until', 'priority_pages']);
        });
    }
};
