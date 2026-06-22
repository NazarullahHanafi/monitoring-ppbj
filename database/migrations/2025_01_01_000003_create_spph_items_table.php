<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('spphs') || Schema::hasTable('spph_items')) {
            return;
        }

        Schema::create('spph_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('spph_id')->constrained('spphs')->onDelete('cascade');
            $table->integer('urutan')->default(1);         // nomor urut baris
            $table->text('nama_barang');                   // HTML dari rich-text editor (bold/italic/underline)
            $table->string('satuan', 100)->nullable();     // dari master satuan atau input bebas
            $table->string('jumlah', 100)->nullable();     // angka/teks bebas
            $table->date('tgl_pemenuhan')->nullable();     // tanggal pemenuhan
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('spph_items');
    }
};
