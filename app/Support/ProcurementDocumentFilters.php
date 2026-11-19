<?php

namespace App\Support;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

final class ProcurementDocumentFilters
{
    /** Shared list/export rules; null means no filter, while "0" is a value. */
    public static function read(Request $request, bool $withVendor = false): array
    {
        $rules = [
            'pic' => ['bail', 'nullable', 'string', 'max:255'],
            'dari' => ['bail', 'nullable', 'string', 'date_format:Y-m-d'],
            'sampai' => ['bail', 'nullable', 'string', 'date_format:Y-m-d'],
        ];
        if ($withVendor) {
            $rules['vendor'] = ['bail', 'nullable', 'string', 'max:255'];
        }
        $data = $request->validate($rules);
        $filters = [];
        foreach (array_keys($rules) as $key) {
            $filters[$key] = (string) ($data[$key] ?? '');
        }
        if ($filters['dari'] !== '' && $filters['sampai'] !== '' && $filters['dari'] > $filters['sampai']) {
            throw ValidationException::withMessages(['sampai' => 'Tanggal akhir tidak boleh sebelum tanggal mulai. Periksa kembali rentang tanggal.']);
        }

        return $filters;
    }
}
