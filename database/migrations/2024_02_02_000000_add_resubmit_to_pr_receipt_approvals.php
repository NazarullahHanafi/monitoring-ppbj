<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('pr_receipt_approvals')) {
            return;
        }

        if (! Schema::hasColumn('pr_receipt_approvals', 'resubmit_notes')) {
            Schema::table('pr_receipt_approvals', fn(Blueprint $table) => $table->text('resubmit_notes')->nullable());
        }

        if (! Schema::hasColumn('pr_receipt_approvals', 'previous_rejection_id')) {
            Schema::table('pr_receipt_approvals', function (Blueprint $table) {
                $table->foreignId('previous_rejection_id')
                    ->nullable()
                    ->constrained('pr_receipt_approvals')
                    ->nullOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (! Schema::hasTable('pr_receipt_approvals')) {
            return;
        }

        if (Schema::hasColumn('pr_receipt_approvals', 'previous_rejection_id')) {
            Schema::table('pr_receipt_approvals', function (Blueprint $table) {
                $table->dropConstrainedForeignId('previous_rejection_id');
            });
        }

        if (Schema::hasColumn('pr_receipt_approvals', 'resubmit_notes')) {
            Schema::table('pr_receipt_approvals', fn(Blueprint $table) => $table->dropColumn('resubmit_notes'));
        }
    }
};
