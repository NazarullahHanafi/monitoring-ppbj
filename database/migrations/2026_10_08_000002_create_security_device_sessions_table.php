<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('security_device_sessions', function (Blueprint $table) {
            $table->id();
            $table->char('session_hash', 64)->unique();
            $table->text('session_id_encrypted');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('last_activity_at')->index();
            $table->timestamps();

            $table->index(['user_id', 'last_activity_at'], 'device_session_user_activity_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('security_device_sessions');
    }
};
