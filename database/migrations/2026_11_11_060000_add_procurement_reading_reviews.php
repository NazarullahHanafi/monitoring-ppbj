<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('procurement_search_passages', function (Blueprint $table) {
            $table->unsignedTinyInteger('enhancement_attempts')->default(0);
            $table->unsignedBigInteger('human_review_id')->nullable();
        });
        Schema::create('procurement_reading_reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('source_id');
            $table->char('fingerprint', 64);
            $table->unsignedInteger('page');
            $table->char('before_hash', 64);
            $table->longText('text');
            $table->longText('previous_text')->nullable();
            $table->text('reason');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('state', 20)->default('pending');
            $table->unsignedInteger('cursor')->default(0);
            $table->longText('summary')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('applied_at')->nullable();
            $table->index(['state', 'id']);
            $table->index(['source_id', 'state', 'id']);
            $table->foreign('source_id')->references('id')->on('procurement_search_sources')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->nullOnDelete();
        });
        Schema::create('procurement_review_terms', function (Blueprint $table) {
            $table->unsignedBigInteger('review_id');
            $table->string('term', 100);
            $table->unsignedInteger('first_page');
            $table->primary(['review_id', 'term']);
            $table->foreign('review_id')->references('id')->on('procurement_reading_reviews')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('procurement_review_terms');
        Schema::dropIfExists('procurement_reading_reviews');
        Schema::table('procurement_search_passages', fn (Blueprint $table) => $table->dropColumn(['enhancement_attempts', 'human_review_id']));
    }
};
