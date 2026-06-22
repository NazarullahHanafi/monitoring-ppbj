<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('chat_messages')) {
            return;
        }

        $needsEditedAt = ! Schema::hasColumn('chat_messages', 'edited_at');
        $needsShareType = ! Schema::hasColumn('chat_messages', 'share_type');
        $needsShareId = ! Schema::hasColumn('chat_messages', 'share_id');
        $needsShareData = ! Schema::hasColumn('chat_messages', 'share_data');

        if (! $needsEditedAt && ! $needsShareType && ! $needsShareId && ! $needsShareData) {
            return;
        }

        Schema::table('chat_messages', function (Blueprint $table) use ($needsEditedAt, $needsShareType, $needsShareId, $needsShareData) {
            if ($needsEditedAt) {
                $table->timestamp('edited_at')->nullable()->after('mentions');
            }
            if ($needsShareType) {
                $table->string('share_type', 20)->nullable()->after('edited_at');
            }
            if ($needsShareId) {
                $table->unsignedBigInteger('share_id')->nullable()->after('share_type');
            }
            if ($needsShareData) {
                $table->json('share_data')->nullable()->after('share_id');
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('chat_messages')) {
            return;
        }

        $columns = collect(['edited_at', 'share_type', 'share_id', 'share_data'])
            ->filter(fn (string $column) => Schema::hasColumn('chat_messages', $column))
            ->all();

        if ($columns !== []) {
            Schema::table('chat_messages', fn (Blueprint $table) => $table->dropColumn($columns));
        }
    }
};
