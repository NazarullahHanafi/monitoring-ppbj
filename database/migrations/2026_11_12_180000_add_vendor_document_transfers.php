<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('vendor_documents', function (Blueprint $table) {
            $table->string('cloud_etag', 255)->nullable();
            $table->string('staged_file', 40)->nullable();
            $table->unsignedTinyInteger('transfer_attempts')->default(0);
            $table->timestamp('transfer_after')->nullable();
            $table->timestamp('transfer_expires_at')->nullable();
            $table->index(['status', 'transfer_after'], 'vendor_transfer_due');
        });
        Schema::create('vendor_document_bundles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('vendor_id')->constrained('vendors')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('status', 16)->default('queued');
            $table->string('fingerprint', 64);
            $table->json('documents');
            $table->unsignedInteger('completed')->default(0);
            $table->string('file', 40)->nullable();
            $table->unsignedBigInteger('size')->default(0);
            $table->dateTime('expires_at');
            $table->timestamps();
            $table->index(['user_id', 'vendor_id', 'fingerprint'], 'vendor_bundle_reuse');
            $table->index(['status', 'created_at'], 'vendor_bundle_queue');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vendor_document_bundles');
        Schema::table('vendor_documents', function (Blueprint $table) {
            $table->dropIndex('vendor_transfer_due');
            $table->dropColumn(['cloud_etag', 'staged_file', 'transfer_attempts', 'transfer_after', 'transfer_expires_at']);
        });
    }
};
