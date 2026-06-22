<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sps', function (Blueprint $table) {
            $table->string('rfq')->nullable()->after('promised_date');

            $table->string('nomor_pemenang')->nullable()->after('rfq');
            $table->date('tanggal_pemenang')->nullable()->after('nomor_pemenang');

            $table->date('awal_kontrak')->nullable()->after('tanggal_pemenang');
            $table->date('akhir_kontrak')->nullable()->after('awal_kontrak');

            $table->string('bidang_ip_itu')->nullable()->after('akhir_kontrak');
            $table->string('penandatangan_sci')->nullable()->after('bidang_ip_itu');
            $table->string('jabatan_sci')->nullable()->after('penandatangan_sci');

            $table->decimal('jampel_5', 18, 2)->nullable()->after('jabatan_sci');
        });
    }

    public function down(): void
    {
        Schema::table('sps', function (Blueprint $table) {
            $table->dropColumn([
                'rfq',
                'nomor_pemenang',
                'tanggal_pemenang',
                'awal_kontrak',
                'akhir_kontrak',
                'bidang_ip_itu',
                'penandatangan_sci',
                'jabatan_sci',
                'jampel_5',
            ]);
        });
    }
};
