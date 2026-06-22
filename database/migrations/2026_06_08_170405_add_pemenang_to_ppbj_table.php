<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ppbj', function (Blueprint $table) {
            $table->string('pemenang')->nullable()->after('tgl_awarding_sp');
            $table->date('tgl_pemenang')->nullable()->after('pemenang');
        });
    }

    public function down(): void
    {
        Schema::table('ppbj', function (Blueprint $table) {
            $table->dropColumn(['pemenang', 'tgl_pemenang']);
        });
    }
};
