<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $ppbjIdIsUnsigned = true;

        // Database production lama memakai BIGINT signed untuk ppbj.id,
        // sementara instalasi baru Laravel memakai BIGINT unsigned. Foreign
        // key MySQL wajib memiliki signedness yang sama persis.
        if (DB::getDriverName() === 'mysql') {
            $column = DB::selectOne(
                "SELECT COLUMN_TYPE FROM information_schema.COLUMNS
                 WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'ppbj' AND COLUMN_NAME = 'id'"
            );
            $ppbjIdIsUnsigned = str_contains(strtolower((string) ($column->COLUMN_TYPE ?? '')), 'unsigned');
        }

        Schema::create('collaboration_handovers', function (Blueprint $table) use ($ppbjIdIsUnsigned) {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->string('title', 140);
            $table->text('description')->nullable();
            $table->string('from_department', 24);
            $table->string('to_department', 24);
            $table->string('priority', 16)->default('normal');
            $table->string('status', 24)->default('sent');
            $table->dateTime('due_at')->nullable();
            $table->json('checklist')->nullable();
            $table->text('last_note')->nullable();
            $table->json('metadata')->nullable();
            $table->unsignedInteger('version')->default(1);

            $table->foreignId('created_by_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('assigned_to_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('acknowledged_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('completed_by_user_id')->nullable()->constrained('users')->nullOnDelete();

            $ppbjIdIsUnsigned
                ? $table->unsignedBigInteger('ppbj_id')->nullable()
                : $table->bigInteger('ppbj_id')->nullable();
            $table->foreign('ppbj_id')->references('id')->on('ppbj')->nullOnDelete();
            $table->unsignedBigInteger('torpr_id')->nullable();
            $table->foreign('torpr_id')->references('id')->on('torprs')->nullOnDelete();

            $table->dateTime('acknowledged_at')->nullable();
            $table->dateTime('started_at')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->dateTime('returned_at')->nullable();
            $table->timestamps();

            $table->index(['to_department', 'status', 'due_at'], 'handover_inbox_status_due_idx');
            $table->index(['from_department', 'status', 'created_at'], 'handover_sent_status_created_idx');
            $table->index(['assigned_to_user_id', 'status', 'due_at'], 'handover_assignee_status_due_idx');
            $table->index(['ppbj_id', 'status'], 'handover_ppbj_status_idx');
            $table->index(['created_by_user_id', 'created_at'], 'handover_creator_created_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('collaboration_handovers');
    }
};
