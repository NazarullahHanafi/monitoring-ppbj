<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('ppbj', 'created_by_user_id')) {
            Schema::table('ppbj', function (Blueprint $table) {
                $table->foreignId('created_by_user_id')
                    ->nullable()
                    ->after('buyer')
                    ->constrained('users')
                    ->nullOnDelete();
            });
        }

        if (!Schema::hasTable('users') || !Schema::hasColumn('ppbj', 'created_by_user_id')) {
            return;
        }

        $ownerByLabel = [];

        DB::table('users')
            ->select(['id', 'name', 'buyer_name', 'email'])
            ->orderBy('id')
            ->get()
            ->each(function ($user) use (&$ownerByLabel) {
                $labels = [
                    $user->buyer_name ?? null,
                    $user->name ?? null,
                    $user->email ? strtok((string) $user->email, '@') : null,
                ];

                foreach ($labels as $label) {
                    $key = trim(mb_strtolower((string) $label));
                    if ($key !== '' && !isset($ownerByLabel[$key])) {
                        $ownerByLabel[$key] = (int) $user->id;
                    }
                }
            });

        if (!$ownerByLabel) {
            return;
        }

        DB::table('ppbj')
            ->select(['id', 'buyer'])
            ->whereNull('created_by_user_id')
            ->whereNotNull('buyer')
            ->orderBy('id')
            ->chunkById(500, function ($rows) use ($ownerByLabel) {
                foreach ($rows as $row) {
                    $key = trim(mb_strtolower((string) $row->buyer));
                    $ownerId = $ownerByLabel[$key] ?? null;

                    if ($ownerId) {
                        DB::table('ppbj')
                            ->where('id', $row->id)
                            ->whereNull('created_by_user_id')
                            ->update(['created_by_user_id' => $ownerId]);
                    }
                }
            });
    }

    public function down(): void
    {
        if (Schema::hasColumn('ppbj', 'created_by_user_id')) {
            Schema::table('ppbj', function (Blueprint $table) {
                $table->dropConstrainedForeignId('created_by_user_id');
            });
        }
    }
};
