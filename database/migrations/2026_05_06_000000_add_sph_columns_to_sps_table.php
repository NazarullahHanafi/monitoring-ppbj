<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sps', function (Blueprint $table) {
            $table->string('sph', 255)->nullable()->after('nilai_pr');
            $table->date('tgl_sph')->nullable()->after('sph');
        });
    }

    public function down(): void
    {
        Schema::table('sps', function (Blueprint $table) {
            $table->dropColumn(['sph', 'tgl_sph']);
        });
    }
};