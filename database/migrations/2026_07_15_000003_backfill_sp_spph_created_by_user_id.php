<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('sps', 'created_by_user_id') || !Schema::hasColumn('spphs', 'created_by_user_id')) {
            return;
        }

        $userMap = $this->buildUserMap();

        $this->backfillTableOwner('sps', $userMap);
        $this->backfillTableOwner('spphs', $userMap);
    }

    public function down(): void
    {
        // Tidak di-rollback karena ini hanya pengisian owner historis berdasarkan PIC.
    }

    private function buildUserMap(): array
    {
        $map = [];

        DB::table('users')
            ->select(['id', 'name', 'buyer_name', 'email'])
            ->orderBy('id')
            ->get()
            ->each(function ($user) use (&$map) {
                foreach ([$user->name, $user->buyer_name, strtok((string) $user->email, '@')] as $candidate) {
                    $key = $this->normalizeOwnerKey($candidate);

                    if ($key !== '' && !isset($map[$key])) {
                        $map[$key] = (int) $user->id;
                    }
                }
            });

        return $map;
    }

    private function backfillTableOwner(string $table, array $userMap): void
    {
        DB::table($table)
            ->select(['id', 'pic'])
            ->whereNull('created_by_user_id')
            ->orderBy('id')
            ->chunkById(200, function ($records) use ($table, $userMap) {
                foreach ($records as $record) {
                    $ownerId = $userMap[$this->normalizeOwnerKey($record->pic)] ?? null;

                    if ($ownerId) {
                        DB::table($table)
                            ->where('id', $record->id)
                            ->update(['created_by_user_id' => $ownerId]);
                    }
                }
            });
    }

    private function normalizeOwnerKey(mixed $value): string
    {
        $value = trim(mb_strtolower((string) $value));

        if ($value === '') {
            return '';
        }

        return preg_replace('/[^a-z0-9]+/u', '', $value) ?: '';
    }
};
