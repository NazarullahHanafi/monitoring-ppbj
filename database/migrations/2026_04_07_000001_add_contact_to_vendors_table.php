<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('vendors', function (Blueprint $table) {
            $table->string('alamat', 500)->nullable()->after('nama_vendor');
            $table->string('telepon', 50)->nullable()->after('alamat');
            $table->string('fax', 50)->nullable()->after('telepon');
        });
    }

    public function down(): void
    {
        Schema::table('vendors', function (Blueprint $table) {
            $table->dropColumn(['alamat', 'telepon', 'fax']);
        });
    }
};
