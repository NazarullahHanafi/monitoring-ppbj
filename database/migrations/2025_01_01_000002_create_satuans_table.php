<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('satuans', function (Blueprint $table) {
            $table->id();
            $table->string('nama_satuan', 100)->unique();
            $table->string('keterangan', 255)->nullable();
            $table->timestamps();
        });

        // Seed data awal
        \DB::table('satuans')->insert([
            ['nama_satuan' => 'Pcs',    'keterangan' => 'Pieces / buah',   'created_at' => now(), 'updated_at' => now()],
            ['nama_satuan' => 'Unit',   'keterangan' => 'Unit',             'created_at' => now(), 'updated_at' => now()],
            ['nama_satuan' => 'Set',    'keterangan' => 'Set',              'created_at' => now(), 'updated_at' => now()],
            ['nama_satuan' => 'Lusin',  'keterangan' => '12 buah',         'created_at' => now(), 'updated_at' => now()],
            ['nama_satuan' => 'Rim',    'keterangan' => '500 lembar',       'created_at' => now(), 'updated_at' => now()],
            ['nama_satuan' => 'Kg',     'keterangan' => 'Kilogram',         'created_at' => now(), 'updated_at' => now()],
            ['nama_satuan' => 'Liter',  'keterangan' => 'Liter',            'created_at' => now(), 'updated_at' => now()],
            ['nama_satuan' => 'Meter',  'keterangan' => 'Meter',            'created_at' => now(), 'updated_at' => now()],
            ['nama_satuan' => 'Box',    'keterangan' => 'Kotak / kardus',   'created_at' => now(), 'updated_at' => now()],
            ['nama_satuan' => 'Paket',  'keterangan' => 'Paket',            'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('satuans');
    }
};
