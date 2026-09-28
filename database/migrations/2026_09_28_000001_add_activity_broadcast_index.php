<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const INDEX_NAME = 'idx_chat_messages_share_type_id';

    public function up(): void
    {
        if (! Schema::hasTable('chat_messages')
            || ! Schema::hasColumn('chat_messages', 'share_type')
            || $this->indexExists()) {
            return;
        }

        Schema::table('chat_messages', function (Blueprint $table) {
            $table->index(['share_type', 'id'], self::INDEX_NAME);
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('chat_messages') || ! $this->indexExists()) {
            return;
        }

        Schema::table('chat_messages', function (Blueprint $table) {
            $table->dropIndex(self::INDEX_NAME);
        });
    }

    private function indexExists(): bool
    {
        return collect(Schema::getIndexes('chat_messages'))
            ->pluck('name')
            ->contains(self::INDEX_NAME);
    }
};
