<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('virtual_office_weapons', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('weapon', 24);
            $table->timestamp('created_at');
            $table->primary(['user_id', 'weapon']);
        });
    }
    public function down(): void { Schema::dropIfExists('virtual_office_weapons'); }
};
