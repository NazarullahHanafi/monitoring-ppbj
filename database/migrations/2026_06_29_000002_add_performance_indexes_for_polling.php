<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->addIndexIfPossible('chat_reads', ['user_id', 'message_id'], 'idx_chat_reads_user_message');
        $this->addIndexIfPossible('chat_messages', ['user_id', 'id'], 'idx_chat_messages_user_id');
        $this->addIndexIfPossible('chat_messages', ['reply_to'], 'idx_chat_messages_reply_to');
        $this->addIndexIfPossible('chat_messages', ['share_type', 'share_id'], 'idx_chat_messages_share');
        $this->addIndexIfPossible('pr_receipt_approvals', ['torpr_id', 'id'], 'idx_pr_approval_torpr_id');
        $this->addIndexIfPossible('pr_receipt_approvals', ['status', 'requested_at'], 'idx_pr_approval_status_requested');
        $this->addIndexIfPossible('pr_receipt_approvals', ['requested_by_user_id', 'status'], 'idx_pr_approval_requester_status');
        $this->addIndexIfPossible('torprs', ['created_by_user_id', 'id'], 'idx_torprs_creator_id');
        $this->addIndexIfPossible('torprs', ['tanggal_pr', 'id'], 'idx_torprs_tanggal_id');
        $this->addIndexIfPossible('sps', ['nomor_pr'], 'idx_sps_nomor_pr');
        $this->addIndexIfPossible('sps', ['sequence_number'], 'idx_sps_sequence_number');
        $this->addIndexIfPossible('spphs', ['nomor_pr'], 'idx_spphs_nomor_pr');
        $this->addIndexIfPossible('spphs', ['sequence_number'], 'idx_spphs_sequence_number');
    }

    public function down(): void
    {
        $this->dropIndexIfExists('spphs', 'idx_spphs_sequence_number');
        $this->dropIndexIfExists('spphs', 'idx_spphs_nomor_pr');
        $this->dropIndexIfExists('sps', 'idx_sps_sequence_number');
        $this->dropIndexIfExists('sps', 'idx_sps_nomor_pr');
        $this->dropIndexIfExists('torprs', 'idx_torprs_tanggal_id');
        $this->dropIndexIfExists('torprs', 'idx_torprs_creator_id');
        $this->dropIndexIfExists('pr_receipt_approvals', 'idx_pr_approval_requester_status');
        $this->dropIndexIfExists('pr_receipt_approvals', 'idx_pr_approval_status_requested');
        $this->dropIndexIfExists('pr_receipt_approvals', 'idx_pr_approval_torpr_id');
        $this->dropIndexIfExists('chat_messages', 'idx_chat_messages_share');
        $this->dropIndexIfExists('chat_messages', 'idx_chat_messages_reply_to');
        $this->dropIndexIfExists('chat_messages', 'idx_chat_messages_user_id');
        $this->dropIndexIfExists('chat_reads', 'idx_chat_reads_user_message');
    }

    private function addIndexIfPossible(string $table, array $columns, string $name): void
    {
        if (! Schema::hasTable($table) || $this->indexExists($table, $name)) {
            return;
        }

        foreach ($columns as $column) {
            if (! Schema::hasColumn($table, $column)) {
                return;
            }
        }

        Schema::table($table, fn (Blueprint $blueprint) => $blueprint->index($columns, $name));
    }

    private function dropIndexIfExists(string $table, string $name): void
    {
        if (! Schema::hasTable($table) || ! $this->indexExists($table, $name)) {
            return;
        }

        Schema::table($table, fn (Blueprint $blueprint) => $blueprint->dropIndex($name));
    }

    private function indexExists(string $table, string $name): bool
    {
        return collect(Schema::getIndexes($table))
            ->pluck('name')
            ->contains($name);
    }
};
