<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('virtual_office_tabs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('fingerprint', 64); $table->json('items');
            $table->string('destination', 30); $table->unsignedInteger('total');
            $table->timestamp('created_at'); $table->index(['user_id', 'created_at']);
        });
    }
    public function down(): void { Schema::dropIfExists('virtual_office_tabs'); }
};
