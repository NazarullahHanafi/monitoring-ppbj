<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        foreach ([['penandatangan_sci', 'Harits Jansen'], ['jabatan_sci', 'Kepala Bidang Dukungan Bisnis']] as [$type, $name]) {
            // Preserve existing inactive choices and user-maintained master data.
            DB::table('sp_master_options')->insertOrIgnore([
                'type' => $type, 'nama' => $name, 'is_active' => true, 'created_at' => now(), 'updated_at' => now(),
            ]);
            Cache::forget('sp_master_options:'.$type.':active_names');
        }
    }

    public function down(): void
    {
        // These are shared reference entries; never delete a user's master on rollback.
    }
};
