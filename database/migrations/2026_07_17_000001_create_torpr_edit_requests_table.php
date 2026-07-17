<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('torpr_edit_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('torpr_id')->constrained('torprs')->cascadeOnDelete();
            $table->foreignId('requester_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('owner_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('reviewed_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status', 20)->default('pending')->index();
            $table->text('reason')->nullable();
            $table->text('review_note')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();

            $table->index(['owner_user_id', 'status']);
            $table->index(['requester_user_id', 'status']);
            $table->index(['torpr_id', 'requester_user_id', 'status'], 'torpr_edit_req_lookup_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('torpr_edit_requests');
    }
};
