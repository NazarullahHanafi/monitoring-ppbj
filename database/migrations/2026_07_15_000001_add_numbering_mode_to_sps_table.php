<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('sps', function (Blueprint $table) {
            $table->string('numbering_mode', 20)->default('auto')->after('sequence_number')->index();
        });
    }

    public function down(): void
    {
        Schema::table('sps', function (Blueprint $table) {
            $table->dropIndex(['numbering_mode']);
            $table->dropColumn('numbering_mode');
        });
    }
};
