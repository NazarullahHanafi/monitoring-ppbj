<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('spphs', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_spph')->unique();
            $table->unsignedInteger('sequence_number');
            $table->date('tanggal');
            $table->string('nomor_pr')->nullable()->unique();
            $table->string('nama_vendor');
            $table->text('deskripsi_pengadaan');
            $table->string('pic');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('spphs');
    }
};
