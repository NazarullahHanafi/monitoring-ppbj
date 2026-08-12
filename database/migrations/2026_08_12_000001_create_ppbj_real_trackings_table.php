<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('ppbj_real_trackings')) {
            return;
        }

        Schema::create('ppbj_real_trackings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ppbj_id');
            $table->string('status_key', 80)->nullable()->index();
            $table->string('title', 180);
            $table->text('description')->nullable();
            $table->date('event_date')->nullable()->index();
            $table->date('reminder_date')->nullable()->index();
            $table->unsignedBigInteger('created_by_user_id')->nullable();
            $table->unsignedBigInteger('updated_by_user_id')->nullable();
            $table->timestamps();

            $table->index('ppbj_id');
            $table->index(['ppbj_id', 'event_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ppbj_real_trackings');
    }
};
