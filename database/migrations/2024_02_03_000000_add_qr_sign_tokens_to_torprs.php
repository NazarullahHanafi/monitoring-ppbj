<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const COLUMNS = [
        'sign_token_kacab',
        'sign_token_kabid',
        'signed_by_kacab_name',
        'signed_by_kabid_name',
    ];

    public function up(): void
    {
        if (! Schema::hasTable('torprs')) {
            return;
        }

        if (! Schema::hasColumn('torprs', 'sign_token_kacab')) {
            Schema::table('torprs', fn(Blueprint $table) => $table->string('sign_token_kacab', 64)->nullable()->unique());
        }
        if (! Schema::hasColumn('torprs', 'sign_token_kabid')) {
            Schema::table('torprs', fn(Blueprint $table) => $table->string('sign_token_kabid', 64)->nullable()->unique());
        }
        if (! Schema::hasColumn('torprs', 'signed_by_kacab_name')) {
            Schema::table('torprs', fn(Blueprint $table) => $table->string('signed_by_kacab_name', 100)->nullable());
        }
        if (! Schema::hasColumn('torprs', 'signed_by_kabid_name')) {
            Schema::table('torprs', fn(Blueprint $table) => $table->string('signed_by_kabid_name', 100)->nullable());
        }
    }

    public function down(): void
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
};
