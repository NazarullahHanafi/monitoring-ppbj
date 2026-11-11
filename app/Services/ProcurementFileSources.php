<?php

namespace App\Services;

class ProcurementFileSources
{
    public const KINDS = ['archive_document', 'archive_attachment', 'local_sp_attachment', 'local_spph_attachment'];

    public static function file(string $kind): bool
    {
        return in_array($kind, self::KINDS, true);
    }

    public static function liveLocal($query, string $alias)
    {
        return $query->where(function ($access) use ($alias) {
            $access->whereNotIn($alias.'.kind', ['local_sp_attachment', 'local_spph_attachment']);
            foreach (['sp' => 'sps', 'spph' => 'spphs'] as $kind => $table) {
                $access->orWhere(function ($local) use ($alias, $kind, $table) {
                    $local->where($alias.'.kind', 'local_'.$kind.'_attachment')->whereExists(fn ($file) => $file->selectRaw('1')->from('procurement_detail_attachments as live_file')->join($table.' as live_document', 'live_document.id', '=', 'live_file.document_id')->whereColumn('live_file.id', $alias.'.source_key')->where('live_file.kind', $kind)->whereNull('live_document.deleted_at'));
                });
            }
        });
    }
}
