<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('activity_logs')) {
            return;
        }

        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('model_type'); // Nama model, misal: 'Torpr'
            $table->unsignedBigInteger('model_id'); // ID data
            $table->string('action'); // created, updated, approved, rejected, signed_kabid, dll
            $table->string('description')->nullable(); // Keterangan dalam bahasa indonesia
            $table->json('changes')->nullable(); // Simpan perubahan data (JSON)
            $table->timestamps();

            $table->index(['model_type', 'model_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
