<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pr_receipt_approvals', function (Blueprint $table) {
            // Tambahkan kolom rejected_by_user_id setelah rejected_reason
            if (!Schema::hasColumn('pr_receipt_approvals', 'rejected_by_user_id')) {
                $table->foreignId('rejected_by_user_id')
                    ->nullable()
                    ->after('rejected_reason')
                    ->constrained('users')
                    ->nullOnDelete()
                    ->comment('User yang reject approval');
            }

            // Tambahkan kolom rejected_at jika belum ada
            if (!Schema::hasColumn('pr_receipt_approvals', 'rejected_at')) {
                $table->timestamp('rejected_at')
                    ->nullable()
                    ->after('rejected_by_user_id')
                    ->comment('Waktu reject');
            }
        });
    }

    public function down(): void
    {
        Schema::table('pr_receipt_approvals', function (Blueprint $table) {
            $table->dropForeign(['rejected_by_user_id']);
            $table->dropColumn(['rejected_by_user_id', 'rejected_at']);
        });
    }
};