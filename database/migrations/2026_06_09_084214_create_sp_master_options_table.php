<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sp_master_options', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('nama');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['type', 'nama']);
        });

        DB::table('sp_master_options')->insert([
            ['type' => 'bidang_ip_itu', 'nama' => 'KEPALA BIDANG INSPEKSI UMUM', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'bidang_ip_itu', 'nama' => 'KEPALA BIDANG INSPEKSI TEKNIK', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'bidang_ip_itu', 'nama' => 'KEPALA BIDANG PENGUJIAN DAN KONSULTANSI', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'bidang_ip_itu', 'nama' => 'PJ. KEPALA BIDANG DUKUNGAN BISNIS', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'bidang_ip_itu', 'nama' => 'KEPALA BIDANG DUKUNGAN BISNIS', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],

            ['type' => 'penandatangan_sci', 'nama' => 'Jumelda', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'penandatangan_sci', 'nama' => 'Bambang Harwanta', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],

            ['type' => 'jabatan_sci', 'nama' => 'Pj. Kepala Bidang Dukungan Bisnis', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'jabatan_sci', 'nama' => 'Kepala Cabang', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('sp_master_options');
    }
};