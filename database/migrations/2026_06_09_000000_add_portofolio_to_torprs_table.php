<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('torprs', function (Blueprint $table) {
            if (!Schema::hasColumn('torprs', 'portofolio')) {
                $table->string('portofolio')->nullable()->after('tujuan_pengadaan');
            }
        });
    }

    public function down(): void
    {
        Schema::table('torprs', function (Blueprint $table) {
            if (Schema::hasColumn('torprs', 'portofolio')) {
                $table->dropColumn('portofolio');
            }
        });
    }
};
