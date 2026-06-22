<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('torprs')) {
            return;
        }

        $needsKabidExpiry = ! Schema::hasColumn('torprs', 'sign_token_kabid_expires_at');
        $needsKacabExpiry = ! Schema::hasColumn('torprs', 'sign_token_kacab_expires_at');

        if ($needsKabidExpiry || $needsKacabExpiry) {
            Schema::table('torprs', function (Blueprint $table) use ($needsKabidExpiry, $needsKacabExpiry) {
                if ($needsKabidExpiry) {
                    $table->timestamp('sign_token_kabid_expires_at')->nullable();
                }
                if ($needsKacabExpiry) {
                    $table->timestamp('sign_token_kacab_expires_at')->nullable();
                }
            });
        }

        $expiresAt = now()->addDays(7);
        DB::table('torprs')->whereNotNull('sign_token_kabid')
            ->update(['sign_token_kabid_expires_at' => $expiresAt]);
        DB::table('torprs')->whereNotNull('sign_token_kacab')
            ->update(['sign_token_kacab_expires_at' => $expiresAt]);
    }

    public function down(): void
    {
        if (! Schema::hasTable('torprs')) {
            return;
        }

        $columns = array_values(array_filter([
            Schema::hasColumn('torprs', 'sign_token_kabid_expires_at') ? 'sign_token_kabid_expires_at' : null,
            Schema::hasColumn('torprs', 'sign_token_kacab_expires_at') ? 'sign_token_kacab_expires_at' : null,
        ]));

        if ($columns !== []) {
            Schema::table('torprs', fn(Blueprint $table) => $table->dropColumn($columns));
        }
    }
};
