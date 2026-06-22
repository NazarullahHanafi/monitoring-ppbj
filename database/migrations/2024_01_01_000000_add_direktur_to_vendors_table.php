<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('vendors') || Schema::hasColumn('vendors', 'direktur')) {
            return;
        }

        Schema::table('vendors', function (Blueprint $table) {
            $table->string('direktur', 255)->nullable();
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('vendors') || ! Schema::hasColumn('vendors', 'direktur')) {
            return;
        }

        Schema::table('vendors', function (Blueprint $table) {
            $table->dropColumn('direktur');
        });
    }
};
