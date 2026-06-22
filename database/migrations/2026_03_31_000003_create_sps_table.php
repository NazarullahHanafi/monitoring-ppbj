<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sps', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_sp')->unique();
            $table->unsignedInteger('sequence_number');
            $table->date('tanggal_sp')->nullable();
            $table->decimal('nilai_sp', 20, 2)->nullable();
            $table->string('nomor_pr')->nullable()->unique();
            $table->decimal('nilai_pr', 20, 2)->nullable();
            $table->string('nama_vendor');
            $table->text('deskripsi_pengadaan');
            $table->string('pic');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sps');
    }
};
