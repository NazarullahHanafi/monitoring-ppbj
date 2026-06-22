<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('torprs', function (Blueprint $table) {
            $table->timestamp('sign_token_kabid_expires_at')->nullable();
            $table->timestamp('sign_token_kacab_expires_at')->nullable();
        });

        $expiresAt = now()->addDays(7);
        DB::table('torprs')->whereNotNull('sign_token_kabid')
            ->update(['sign_token_kabid_expires_at' => $expiresAt]);
        DB::table('torprs')->whereNotNull('sign_token_kacab')
            ->update(['sign_token_kacab_expires_at' => $expiresAt]);
    }

    public function down(): void
    {
        Schema::table('torprs', function (Blueprint $table) {
            $table->dropColumn([
                'sign_token_kabid_expires_at',
                'sign_token_kacab_expires_at',
            ]);
        });
    }
};
