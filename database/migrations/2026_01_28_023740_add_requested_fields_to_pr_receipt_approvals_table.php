<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('pr_receipt_approvals', function (Blueprint $table) {
            if (!Schema::hasColumn('pr_receipt_approvals', 'requested_by_user_id')) {
                $table->unsignedBigInteger('requested_by_user_id')->nullable()->after('torpr_id');
            }
            if (!Schema::hasColumn('pr_receipt_approvals', 'requested_name')) {
                $table->string('requested_name', 120)->nullable()->after('requested_by_user_id');
            }
            if (!Schema::hasColumn('pr_receipt_approvals', 'requested_at')) {
                $table->dateTime('requested_at')->nullable()->after('requested_name');
            }

            // Optional: kalau kamu simpan alasan reject
            if (!Schema::hasColumn('pr_receipt_approvals', 'rejected_reason')) {
                $table->text('rejected_reason')->nullable()->after('status');
            }
        });
    }

    public function down(): void
    {
        Schema::table('pr_receipt_approvals', function (Blueprint $table) {
            if (Schema::hasColumn('pr_receipt_approvals', 'rejected_reason')) {
                $table->dropColumn('rejected_reason');
            }
            if (Schema::hasColumn('pr_receipt_approvals', 'requested_at')) {
                $table->dropColumn('requested_at');
            }
            if (Schema::hasColumn('pr_receipt_approvals', 'requested_name')) {
                $table->dropColumn('requested_name');
            }
            if (Schema::hasColumn('pr_receipt_approvals', 'requested_by_user_id')) {
                $table->dropColumn('requested_by_user_id');
            }
        });
    }
};

