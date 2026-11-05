<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('virtual_office_wallets', function (Blueprint $t) {
            $t->foreignId('user_id')->primary()->constrained()->cascadeOnDelete();
            $t->unsignedBigInteger('balance')->default(0);
            $t->date('awarded_on')->nullable();
            $t->timestamps();
        });
        Schema::create('virtual_office_ledger', function (Blueprint $t) {
            $t->id(); $t->foreignId('user_id')->constrained()->cascadeOnDelete();
            $t->string('reference', 90); $t->integer('amount'); $t->unsignedBigInteger('balance'); $t->timestamp('created_at');
            $t->unique(['user_id', 'reference']); $t->index(['user_id', 'id']);
        });
        Schema::create('virtual_office_orders', function (Blueprint $t) {
            $t->uuid('id')->primary(); $t->foreignId('user_id')->constrained()->cascadeOnDelete();
            $t->string('item', 40); $t->unsignedSmallInteger('price'); $t->unsignedTinyInteger('quantity');
            $t->unsignedTinyInteger('remaining'); $t->string('destination', 30); $t->timestamps();
            $t->index(['user_id', 'created_at']);
        });
        Schema::create('virtual_office_messages', function (Blueprint $t) {
            $t->id(); $t->foreignId('user_id')->constrained()->cascadeOnDelete();
            $t->foreignId('target_id')->constrained('users')->cascadeOnDelete();
            $t->uuid('request_id')->unique(); $t->string('message', 350); $t->timestamp('created_at');
            $t->index(['target_id', 'id']); $t->index(['user_id', 'target_id', 'id']); $t->index('created_at');
        });
        Schema::create('virtual_office_servings', function (Blueprint $t) {
            $t->uuid('id')->primary(); $t->foreignId('user_id')->constrained()->cascadeOnDelete();
            $t->foreignUuid('order_id')->constrained('virtual_office_orders')->cascadeOnDelete();
            $t->string('destination', 30); $t->timestamp('created_at');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('virtual_office_servings'); Schema::dropIfExists('virtual_office_messages'); Schema::dropIfExists('virtual_office_orders');
        Schema::dropIfExists('virtual_office_ledger'); Schema::dropIfExists('virtual_office_wallets');
    }
};
