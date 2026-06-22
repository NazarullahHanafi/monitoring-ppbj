<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sps', function (Blueprint $table) {
            $table->date('promised_date')->nullable()->after('tgl_sph');
        });
    }

    public function down(): void
    {
        Schema::table('sps', function (Blueprint $table) {
            $table->dropColumn('promised_date');
        });
    }
};