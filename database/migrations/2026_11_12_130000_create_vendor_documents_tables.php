<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vendor_documents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('vendor_id')->constrained('vendors')->restrictOnDelete();
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('type', 30);
            $table->string('title', 160);
            $table->string('document_number', 160)->nullable();
            $table->date('expires_at')->nullable();
            $table->string('original_name', 255);
            $table->string('mime', 100);
            $table->unsignedBigInteger('size');
            $table->string('checksum', 64);
            $table->string('cloud_path', 255)->unique();
            $table->string('cloud_item_id', 255)->nullable();
            $table->string('status', 16)->default('pending');
            $table->unsignedInteger('version')->default(1);
            $table->mediumText('search_text')->nullable();
            $table->timestamps();
            $table->index(['vendor_id', 'status', 'created_at']);
        });
        Schema::create('vendor_document_terms', function (Blueprint $table) {
            $table->uuid('document_id');
            $column = $table->string('term', 100);
            if (Schema::getConnection()->getDriverName() === 'mysql') {
                // Keep distinct Unicode tokens from colliding under the database's
                // usual accent-insensitive collation (e.g. resume / résumé).
                $column->collation('utf8mb4_bin');
            }
            $table->primary(['term', 'document_id']);
            $table->foreign('document_id')->references('id')->on('vendor_documents')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vendor_document_terms');
        Schema::dropIfExists('vendor_documents');
    }
};
