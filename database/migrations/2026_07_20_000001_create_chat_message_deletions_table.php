<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('chat_message_deletions')) {
            return;
        }

        Schema::create('chat_message_deletions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('message_id')->constrained('chat_messages')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamp('deleted_at')->useCurrent();

            $table->unique(['message_id', 'user_id'], 'chat_msg_deletions_message_user_unique');
            $table->index(['user_id', 'message_id'], 'chat_msg_deletions_user_message_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chat_message_deletions');
    }
};
