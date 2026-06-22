<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('ppbj', function (Blueprint $table) {
            if (!Schema::hasColumn('ppbj', 'status')) {
                $table->string('status', 20)->default('ACTIVE')->after('progres');
            }

            if (!Schema::hasColumn('ppbj', 'cancel_reason')) {
                $table->text('cancel_reason')->nullable()->after('status');
            }

            if (!Schema::hasColumn('ppbj', 'cancelled_at')) {
                $table->timestamp('cancelled_at')->nullable()->after('cancel_reason');
            }
        });
    }

    public function down(): void
    {
        Schema::table('ppbj', function (Blueprint $table) {
            if (Schema::hasColumn('ppbj', 'cancelled_at')) $table->dropColumn('cancelled_at');
            if (Schema::hasColumn('ppbj', 'cancel_reason')) $table->dropColumn('cancel_reason');
            // status jangan didrop kalau kamu sudah pakai di banyak tempat
        });
    }
};
