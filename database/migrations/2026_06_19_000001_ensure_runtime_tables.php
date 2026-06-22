<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('spph_items') && Schema::hasTable('spphs')) {
            Schema::create('spph_items', function (Blueprint $table) {
                $table->id();
                $table->foreignId('spph_id')->constrained('spphs')->cascadeOnDelete();
                $table->integer('urutan')->default(1);
                $table->text('nama_barang');
                $table->string('satuan', 100)->nullable();
                $table->string('jumlah', 100)->nullable();
                $table->date('tgl_pemenuhan')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('chat_reads')) {
            Schema::create('chat_reads', function (Blueprint $table) {
                $table->id();
                $table->foreignId('message_id')->constrained('chat_messages')->cascadeOnDelete();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->timestamp('read_at')->useCurrent();
                $table->unique(['message_id', 'user_id']);
            });
        }

        if (Schema::hasTable('ppbj')) {
            $existingIndexes = collect(Schema::getIndexes('ppbj'))->pluck('name')->all();
            $indexes = [
                'idx_ppbj_status' => ['status'],
                'idx_ppbj_status_sla' => ['status_sla'],
                'idx_ppbj_buyer' => ['buyer'],
                'idx_ppbj_portofolio' => ['portofolio'],
                'idx_ppbj_penyedia' => ['penyedia_eksternal'],
                'idx_ppbj_updated_at' => ['updated_at'],
                'idx_ppbj_created_at' => ['created_at'],
                'idx_ppbj_status_sla_combo' => ['status', 'status_sla'],
                'idx_ppbj_status_updated' => ['status', 'updated_at'],
            ];

            foreach ($indexes as $name => $columns) {
                if (! in_array($name, $existingIndexes, true)) {
                    Schema::table('ppbj', fn(Blueprint $table) => $table->index($columns, $name));
                }
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('chat_reads');
    }
};
