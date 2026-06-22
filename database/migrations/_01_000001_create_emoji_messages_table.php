<?php
// database/migrations/2026_04_01_000001_create_emoji_messages_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('emoji_messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('user_name', 100);
            $table->string('user_initials', 4);
            $table->string('user_color', 10);
            $table->string('emoji', 10);               // emoji yang dikirim
            $table->unsignedBigInteger('reply_to')->nullable(); // id pesan yang dibalas
            $table->string('reply_emoji', 10)->nullable();      // emoji yang dibalas (denormalized)
            $table->string('reply_name', 100)->nullable();      // nama pengirim pesan yang dibalas
            $table->timestamp('created_at')->useCurrent();
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('emoji_messages');
    }
};