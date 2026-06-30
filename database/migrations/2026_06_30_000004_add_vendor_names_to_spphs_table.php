<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('spphs') || Schema::hasColumn('spphs', 'vendor_names')) {
            return;
        }

        Schema::table('spphs', function (Blueprint $table) {
            $table->json('vendor_names')->nullable()->after('nama_vendor');
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('spphs') || ! Schema::hasColumn('spphs', 'vendor_names')) {
            return;
        }

        Schema::table('spphs', function (Blueprint $table) {
            $table->dropColumn('vendor_names');
        });
    }
};
