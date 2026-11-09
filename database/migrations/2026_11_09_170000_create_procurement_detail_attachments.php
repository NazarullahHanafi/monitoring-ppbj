<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('procurement_detail_attachments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kind', 4);
            $table->unsignedBigInteger('document_id')->nullable();
            $table->foreignId('uploaded_by')->constrained('users')->restrictOnDelete();
            $table->string('original_name');
            $table->string('path');
            $table->string('mime', 100);
            $table->unsignedInteger('size');
            $table->char('sha256', 64);
            $table->string('method', 40);
            $table->mediumText('extracted_text')->nullable();
            $table->mediumText('reviewed_text')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->unsignedInteger('version')->default(1);
            $table->timestamps();
            $table->index(['kind', 'document_id'], 'detail_attachment_document');
            $table->index(['document_id', 'created_at'], 'detail_attachment_drafts');
        });
        Schema::create('procurement_detail_requirements', function (Blueprint $table) {
            $table->id();
            $table->string('kind', 4);
            $table->unsignedBigInteger('document_id');
            $table->string('state', 20)->default('requested');
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->unique(['kind', 'document_id'], 'detail_requirement_document');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('procurement_detail_requirements');
        Schema::dropIfExists('procurement_detail_attachments');
    }
};
