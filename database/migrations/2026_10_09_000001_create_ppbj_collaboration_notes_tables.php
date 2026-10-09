<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ppbj_collaboration_notes', function (Blueprint $table) {
            $table->id();
            // Database lama memakai tipe ID PPBJ yang berbeda antar instalasi.
            // Gunakan referensi terindeks tanpa FK agar migrasi aman pada legacy MySQL.
            $table->unsignedBigInteger('ppbj_id');
            $table->unsignedBigInteger('user_id');
            $table->string('author_name', 120);
            $table->string('author_department', 50)->nullable();
            $table->string('author_role', 50)->nullable();
            $table->text('body');
            $table->json('mentions')->nullable();
            $table->timestamp('edited_at')->nullable();
            $table->timestamps();

            $table->index(['ppbj_id', 'id'], 'ppbj_notes_ppbj_id_index');
            $table->index(['user_id', 'created_at'], 'ppbj_notes_user_created_index');
        });

        Schema::create('ppbj_note_mentions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('note_id')->constrained('ppbj_collaboration_notes')->cascadeOnDelete();
            $table->unsignedBigInteger('user_id');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();

            $table->unique(['note_id', 'user_id'], 'ppbj_note_mentions_unique');
            $table->index(['user_id', 'read_at', 'id'], 'ppbj_note_mentions_unread_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ppbj_note_mentions');
        Schema::dropIfExists('ppbj_collaboration_notes');
    }
};
