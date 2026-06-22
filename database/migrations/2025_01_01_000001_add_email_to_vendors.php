<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('vendors') || Schema::hasColumn('vendors', 'email')) {
            return;
        }

        Schema::table('vendors', function (Blueprint $table) {
            $table->string('email')->nullable();
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('vendors') || ! Schema::hasColumn('vendors', 'email')) {
            return;
        }

        Schema::table('vendors', function (Blueprint $table) {
            $table->dropColumn('email');
        });
    }
};
