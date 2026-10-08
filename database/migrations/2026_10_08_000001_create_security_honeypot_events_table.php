<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('security_honeypot_events', function (Blueprint $table) {
            $table->id();
            $table->date('event_date');
            $table->string('ip_address', 45);
            $table->unsignedInteger('hit_count')->default(0);
            $table->unsignedInteger('unique_paths_count')->default(0);
            $table->json('sample_paths')->nullable();
            $table->json('statuses')->nullable();
            $table->json('methods')->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('first_seen_at')->nullable();
            $table->timestamp('last_seen_at')->nullable()->index();
            $table->timestamps();

            $table->unique(['event_date', 'ip_address'], 'honeypot_event_date_ip_unique');
            $table->index(['event_date', 'hit_count'], 'honeypot_date_hits_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('security_honeypot_events');
    }
};
