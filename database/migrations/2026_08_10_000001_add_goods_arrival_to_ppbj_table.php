<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('ppbj')) {
            return;
        }

        Schema::table('ppbj', function (Blueprint $table) {
            if (! Schema::hasColumn('ppbj', 'goods_arrived_at')) {
                $table->timestamp('goods_arrived_at')->nullable()->after('promised_date');
            }

            if (! Schema::hasColumn('ppbj', 'goods_arrived_by_user_id')) {
                $table->unsignedBigInteger('goods_arrived_by_user_id')->nullable()->after('goods_arrived_at');
            }

            if (! Schema::hasColumn('ppbj', 'goods_arrived_note')) {
                $table->text('goods_arrived_note')->nullable()->after('goods_arrived_by_user_id');
            }

            if (! Schema::hasColumn('ppbj', 'goods_confirmed_at')) {
                $table->timestamp('goods_confirmed_at')->nullable()->after('goods_arrived_note');
            }

            if (! Schema::hasColumn('ppbj', 'goods_confirmed_by_user_id')) {
                $table->unsignedBigInteger('goods_confirmed_by_user_id')->nullable()->after('goods_confirmed_at');
            }

            if (! Schema::hasColumn('ppbj', 'goods_confirmed_note')) {
                $table->text('goods_confirmed_note')->nullable()->after('goods_confirmed_by_user_id');
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('ppbj')) {
            return;
        }

        $columns = [
            'goods_confirmed_note',
            'goods_confirmed_by_user_id',
            'goods_confirmed_at',
            'goods_arrived_note',
            'goods_arrived_by_user_id',
            'goods_arrived_at',
        ];

        $existing = array_values(array_filter(
            $columns,
            fn (string $column) => Schema::hasColumn('ppbj', $column)
        ));

        if (! empty($existing)) {
            Schema::table('ppbj', fn (Blueprint $table) => $table->dropColumn($existing));
        }
    }
};
