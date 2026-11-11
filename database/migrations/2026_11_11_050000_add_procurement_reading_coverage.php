<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('procurement_search_sources', function (Blueprint $table) {
            $table->string('failure_code', 32)->nullable();
            $table->unsignedTinyInteger('recovery_round')->default(0);
            $table->string('coverage_state', 20)->default('unchecked');
            $table->unsignedInteger('indexed_pages')->nullable();
            $table->unsignedInteger('problem_pages')->nullable();
            $table->timestamp('coverage_checked_at')->nullable();
            $table->index(['active', 'coverage_state', 'id'], 'proc_search_coverage');
        });
        Schema::table('procurement_search_passages', fn (Blueprint $table) => $table->unsignedTinyInteger('repair_attempts')->default(0));
    }

    public function down(): void
    {
        Schema::table('procurement_search_passages', fn (Blueprint $table) => $table->dropColumn('repair_attempts'));
        Schema::table('procurement_search_sources', function (Blueprint $table) {
            $table->dropIndex('proc_search_coverage');
            $table->dropColumn(['failure_code', 'recovery_round', 'coverage_state', 'indexed_pages', 'problem_pages', 'coverage_checked_at']);
        });
    }
};
