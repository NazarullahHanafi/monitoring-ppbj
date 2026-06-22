<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pr_receipt_approvals', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('torpr_id');
            $table->unsignedBigInteger('requested_by_user_id')->nullable();
            $table->string('requested_name')->nullable();

            $table->enum('status', ['PENDING','APPROVED','REJECTED'])->default('PENDING')->index();

            $table->unsignedBigInteger('approved_by_user_id')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->string('rejected_reason')->nullable();
            $table->text('resubmit_notes')->nullable();
            $table->unsignedBigInteger('previous_rejection_id')->nullable();

            $table->timestamps();

            $table->foreign('torpr_id')->references('id')->on('torprs')->cascadeOnDelete();
            $table->foreign('requested_by_user_id')->references('id')->on('users')->nullOnDelete();
            $table->foreign('approved_by_user_id')->references('id')->on('users')->nullOnDelete();
            $table->foreign('previous_rejection_id')->references('id')->on('pr_receipt_approvals')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pr_receipt_approvals');
    }
};
