<?php
// database/migrations/2026_04_02_000001_create_chat_messages_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (Schema::hasTable('chat_messages')) {
            if (! Schema::hasColumn('chat_messages', 'mentions')) {
                Schema::table('chat_messages', function (Blueprint $table) {
                    $table->json('mentions')->nullable()->after('reply_user');
                });
            }

            return;
        }

        Schema::create('chat_messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('user_name', 100);
            $table->string('user_initials', 4);
            $table->string('user_color', 10);
            $table->text('message');                           // max 500 char (enforced app-level)
            $table->unsignedBigInteger('reply_to')->nullable();
            $table->string('reply_preview', 120)->nullable();  // snippet pesan yang dibalas
            $table->string('reply_user', 100)->nullable();
            $table->json('mentions')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chat_messages');
    }
};
