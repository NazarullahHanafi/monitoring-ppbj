<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const PPBJ_DATE_INDEXES = [
        'idx_ppbj_calendar_received' => ['tgl_terima_pr'],
        'idx_ppbj_calendar_handed' => ['tgl_diserahkan'],
        'idx_ppbj_calendar_ppbj' => ['tgl_ppbj'],
        'idx_ppbj_calendar_spk' => ['tgl_spk'],
        'idx_ppbj_calendar_closed' => ['closed_date'],
        'idx_ppbj_calendar_do' => ['do_date'],
    ];

    public function up(): void
    {
        Schema::create('collaboration_events', function (Blueprint $table) {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->string('title', 120);
            $table->text('description')->nullable();
            $table->dateTime('starts_at');
            $table->dateTime('ends_at')->nullable();
            $table->boolean('all_day')->default(false);
            $table->string('priority', 16)->default('normal');
            $table->string('status', 20)->default('planned');
            $table->string('audience', 20)->default('all');
            $table->foreignId('creator_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('assignee_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('ppbj_id')->nullable()->constrained('ppbj')->nullOnDelete();
            $table->unsignedInteger('version')->default(1);
            $table->timestamps();

            $table->index(['starts_at', 'ends_at'], 'collab_event_range_index');
            $table->index(['audience', 'starts_at'], 'collab_event_audience_start_index');
            $table->index(['assignee_id', 'starts_at'], 'collab_event_assignee_start_index');
            $table->index(['creator_id', 'starts_at'], 'collab_event_creator_start_index');
            $table->index(['status', 'starts_at'], 'collab_event_status_start_index');
        });

        if (! Schema::hasTable('ppbj')) {
            return;
        }

        $existing = collect(Schema::getIndexes('ppbj'))->pluck('name')->all();

        foreach (self::PPBJ_DATE_INDEXES as $name => $columns) {
            if (! in_array($name, $existing, true) && collect($columns)->every(fn ($column) => Schema::hasColumn('ppbj', $column))) {
                Schema::table('ppbj', fn (Blueprint $table) => $table->index($columns, $name));
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('collaboration_events');

        if (! Schema::hasTable('ppbj')) {
            return;
        }

        $existing = collect(Schema::getIndexes('ppbj'))->pluck('name')->all();

        foreach (array_keys(self::PPBJ_DATE_INDEXES) as $name) {
            if (in_array($name, $existing, true)) {
                Schema::table('ppbj', fn (Blueprint $table) => $table->dropIndex($name));
            }
        }
    }
};
