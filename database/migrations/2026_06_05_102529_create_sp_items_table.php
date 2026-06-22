<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sp_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sp_id')->constrained('sps')->cascadeOnDelete();
            $table->integer('urutan')->default(1);
            $table->text('nama_barang')->nullable();
            $table->string('satuan', 50)->nullable();
            $table->string('jumlah', 50)->nullable();
            $table->decimal('harga_satuan', 18, 2)->nullable();
            $table->decimal('subtotal', 18, 2)->nullable();
            $table->date('tgl_pemenuhan')->nullable();
            $table->timestamps();
            
            $table->index('sp_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sp_items');
    }
};