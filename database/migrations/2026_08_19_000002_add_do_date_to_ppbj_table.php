<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('ppbj', 'do_date')) {
            Schema::table('ppbj', function (Blueprint $table) {
                $table->date('do_date')
                    ->nullable()
                    ->after('do_no')
                    ->comment('Tanggal DO, Surat Jalan, atau BAST sebagai realisasi serah terima');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('ppbj', 'do_date')) {
            Schema::table('ppbj', function (Blueprint $table) {
                $table->dropColumn('do_date');
            });
        }
    }
};
