<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ppbj', function (Blueprint $table) {
            // hanya tambah kalau belum ada
            if (!Schema::hasColumn('ppbj', 'status_sla')) {
                $table->string('status_sla', 255)->nullable()->after('sisa_target_sla');
            }
        });
    }

    public function down(): void
    {
        Schema::table('ppbj', function (Blueprint $table) {
            if (Schema::hasColumn('ppbj', 'status_sla')) {
                $table->dropColumn('status_sla');
            }
        });
    }
};
