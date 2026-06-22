<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('torprs', function (Blueprint $table) {
            $table->id();

            $table->string('sign_token_kacab', 64)->nullable()->unique();
            $table->string('sign_token_kabid', 64)->nullable()->unique();

            $table->string('tujuan_pengadaan')->nullable();

            $table->string('nomor_pr')->nullable()->index();
            $table->date('tanggal_pr')->nullable();
            $table->decimal('jumlah_pr', 18, 2)->nullable();
            $table->date('tgl_ttd_kabid_pr')->nullable();
            $table->date('tgl_ttd_kacab_pr')->nullable();
            $table->string('signed_by_kabid_name', 100)->nullable();
            $table->string('signed_by_kacab_name', 100)->nullable();

            $table->unsignedBigInteger('received_by_umum_user_id')->nullable();
            $table->timestamp('received_at')->nullable();

            $table->timestamps();

            $table->foreign('received_by_umum_user_id')->references('id')->on('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('torprs');
    }
};
