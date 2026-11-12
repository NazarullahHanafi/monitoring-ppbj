<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // MariaDB with explicit_defaults_for_timestamp=OFF implicitly adds
        // ON UPDATE CURRENT_TIMESTAMP to a first non-null TIMESTAMP column.
        // Expiry must remain stable while status/progress change.
        Schema::table('vendor_document_bundles', function (Blueprint $table) {
            $table->dateTime('expires_at')->change();
        });
    }

    public function down(): void
    {
        // Keep the safe expiry representation on rollback too.
    }
};
