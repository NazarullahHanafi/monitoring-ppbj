<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const COLUMNS = [
        'tanggal_tor',
        'tgl_ttd_kabid_tor',
        'tgl_ttd_kacab_tor',
        'tgl_permintaan',
        'tgl_dibutuhkan',
    ];

    public function up(): void
    {
        if (! Schema::hasTable('torprs')) {
            return;
        }

        $existing = collect(self::COLUMNS)
            ->filter(fn(string $column) => Schema::hasColumn('torprs', $column))
            ->all();

        if ($existing) {
            Schema::table('torprs', fn(Blueprint $table) => $table->dropColumn($existing));
        }
    }

    public function down(): void
    {
        if (! Schema::hasTable('torprs')) {
            return;
        }

        Schema::table('torprs', function (Blueprint $table) {
            foreach (self::COLUMNS as $column) {
                if (! Schema::hasColumn('torprs', $column)) {
                    $table->dateTime($column)->nullable();
                }
            }
        });
    }
};
