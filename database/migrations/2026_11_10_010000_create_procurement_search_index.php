<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('procurement_search_sources', function (Blueprint $table) {
            $table->id();
            $table->string('kind', 24);
            $table->string('source_key', 80);
            $table->string('label');
            $table->string('reference')->nullable();
            $table->string('archive_pr')->nullable();
            $table->text('metadata_text')->nullable();
            $table->mediumText('content')->nullable();
            $table->char('fingerprint', 64);
            $table->char('checksum', 64)->nullable()->index();
            $table->boolean('active')->default(true);
            $table->string('state', 20)->default('ready');
            $table->unsignedInteger('page')->default(0);
            $table->unsignedInteger('pages')->nullable();
            $table->unsignedTinyInteger('attempts')->default(0);
            $table->string('error', 160)->nullable();
            $table->timestamp('retry_at')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
            $table->unique(['kind', 'source_key'], 'proc_search_origin');
            $table->index(['active', 'state', 'retry_at'], 'proc_search_work');
        });
        Schema::create('procurement_search_terms', function (Blueprint $table) {
            $table->string('term', 96);
            $table->foreignId('source_id')->constrained('procurement_search_sources')->cascadeOnDelete();
            $table->primary(['term', 'source_id']);
            $table->index('source_id');
        });
        Schema::create('procurement_search_links', function (Blueprint $table) {
            $table->foreignId('source_id')->constrained('procurement_search_sources')->cascadeOnDelete();
            $table->unsignedBigInteger('ppbj_id');
            $table->boolean('inferred')->default(false);
            $table->primary(['source_id', 'ppbj_id']);
            $table->index(['ppbj_id', 'source_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('procurement_search_links');
        Schema::dropIfExists('procurement_search_terms');
        Schema::dropIfExists('procurement_search_sources');
    }
};
