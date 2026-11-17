<?php

namespace App\Support;

use Illuminate\Validation\Rule;

class PrintSelectionInput
{
    public static function validate(array $input, bool $sp = false, bool $requireBasis = false): void
    {
        $manual = ($input['signing_mode'] ?? 'auto') === 'manual';
        $rules = [
            'signing_mode' => ['bail', 'sometimes', 'string', Rule::in(['auto', 'manual'])],
            'print_basis' => ['bail', $requireBasis ? 'required' : 'nullable', 'string', 'size:64'],
            'signer_id' => ['bail', Rule::requiredIf($manual), 'nullable', 'integer', 'min:1'],
            'title_id' => ['bail', Rule::requiredIf($manual), 'nullable', 'integer', 'min:1'],
            'manual_reason' => ['bail', Rule::requiredIf($manual), 'nullable', 'string', 'max:500'],
            'penandatangan' => ['bail', 'nullable', 'string', 'max:255'],
            'jabatan' => ['bail', 'nullable', 'string', 'max:255'],
        ];
        if ($sp) {
            $rules += [
                'field_id' => ['bail', 'nullable', 'integer', 'min:1'],
                'field_reason' => ['bail', 'nullable', 'string', 'max:500'],
                'learn_portfolio' => ['bail', 'nullable', 'boolean'],
            ];
        }
        // Structural checks only. Live amount, master activity, permissions,
        // fingerprint comparison and manual explanations remain in the policies.
        validator($input, $rules, [
            'string' => 'Format :attribute tidak valid. Buka ulang konfirmasi cetak.',
            'integer' => 'Pilih :attribute dari daftar yang tersedia.',
            'size' => 'Data konfirmasi cetak belum valid. Muat ulang konfirmasi.',
            'required' => 'Pilihan cetak belum lengkap. Buka ulang konfirmasi cetak.',
            'in' => 'Pilihan cetak tidak tersedia.',
        ])->validate();
    }
}
