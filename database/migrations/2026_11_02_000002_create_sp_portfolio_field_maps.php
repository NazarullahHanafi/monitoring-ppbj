<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sp_portfolio_field_maps', function (Blueprint $table) {
            $table->id();
            $table->string('portfolio', 150);
            $table->string('portfolio_key', 150)->unique();
            $table->unsignedBigInteger('field_id')->index();
            $table->boolean('is_active')->default(true);
            $table->unsignedBigInteger('updated_by_user_id')->nullable();
            $table->timestamps();
        });
        // Historical print choices were not stored. Mappings are deliberately
        // confirmed by users, never inferred from the different bidang_ip_itu field.
    }

    public function down(): void
    {
        Schema::dropIfExists('sp_portfolio_field_maps');
    }
};
