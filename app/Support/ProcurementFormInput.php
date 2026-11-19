<?php

namespace App\Support;

use Illuminate\Http\Request;

final class ProcurementFormInput
{
    /** Check raw shapes before typed normalizers, SQL rules or wildcard expansion. */
    public static function validate(Request $request, bool $sp): void
    {
        $money = static function (string $attribute, mixed $value, \Closure $fail): void {
            if ((! is_string($value) && ! is_int($value) && ! is_float($value))
                || (is_float($value) && ! is_finite($value)) || (is_string($value) && mb_strlen($value) > 100)) {
                $fail('Nilai uang harus berupa angka atau teks nominal yang valid.');
            }
        };
        $rules = [
            $sp ? 'nomor_sp' : 'nomor_spph' => ['bail', 'required', 'string', 'max:60'],
            $sp ? 'tanggal_sp' : 'tanggal' => ['bail', 'nullable', 'string'],
            'nomor_pr' => ['bail', 'nullable', 'string', 'max:100'],
            'nomor_pr_type' => ['bail', 'nullable', 'string', 'in:ppbj,manual'],
            'nomor_prs' => ['bail', 'nullable', 'array', 'max:20'],
            'items' => ['bail', 'nullable', 'array', $sp ? 'max:50' : 'max:20'],
        ];
        if ($sp) {
            $rules += ['nilai_sp' => ['nullable', $money], 'nilai_pr' => ['nullable', $money],
                'allocations' => ['bail', 'nullable', 'array', 'max:20']];
        } else {
            $rules['vendor_names'] = ['bail', 'nullable', 'array', 'max:20'];
        }
        // Stop oversized containers before Laravel expands nested wildcard rules.
        $request->validate($rules);
        $nested = ['nomor_prs.*' => ['bail', 'nullable', 'string', 'max:100'], 'items.*' => ['array']];
        if ($sp) {
            $nested += ['allocations.*' => ['array'], 'allocations.*.ppbj_no' => ['bail', 'nullable', 'string', 'max:100'],
                'allocations.*.value' => ['nullable', $money]];
        }
        $request->validate($nested);
        // Nullable means an empty optional item list. Do not add an absent key:
        // existing approval fingerprints include the submitted detail fields.
        if ($request->exists('items') && $request->input('items') === null) {
            $request->merge(['items' => []]);
        }
    }
}
