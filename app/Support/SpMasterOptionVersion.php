<?php

namespace App\Support;

use App\Models\SpMasterOption;

final class SpMasterOptionVersion
{
    public static function of(SpMasterOption $option): string
    {
        return hash('sha256', json_encode([$option->nama, $option->type, $option->is_active, $option->getRawOriginal('updated_at')], JSON_THROW_ON_ERROR));
    }
}
