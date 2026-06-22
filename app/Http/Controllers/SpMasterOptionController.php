<?php

namespace App\Http\Controllers;

use App\Models\SpMasterOption;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SpMasterOptionController extends Controller
{
    private const TYPES = [
        'bidang_ip_itu' => 'Bidang IP / ITU',
        'penandatangan_sci' => 'Penandatangan SCI',
        'jabatan_sci' => 'Jabatan SCI',
    ];

    public function index(Request $request)
    {
        $type = $request->get('type', '');
        $search = trim((string) $request->get('search', ''));

        $options = SpMasterOption::query()
            ->when($type && array_key_exists($type, self::TYPES), fn ($q) => $q->where('type', $type))
            ->when($search !== '', fn ($q) => $q->where('nama', 'like', "%{$search}%"))
            ->orderBy('type')
            ->orderBy('nama')
            ->paginate(20)
            ->withQueryString();

        $types = self::TYPES;

        $stats = [
            'total' => SpMasterOption::count(),
            'bidang_ip_itu' => SpMasterOption::where('type', 'bidang_ip_itu')->count(),
            'penandatangan_sci' => SpMasterOption::where('type', 'penandatangan_sci')->count(),
            'jabatan_sci' => SpMasterOption::where('type', 'jabatan_sci')->count(),
        ];

        return view('sp_master_options.index', compact('options', 'types', 'type', 'search', 'stats'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => ['required', Rule::in(array_keys(self::TYPES))],
            'nama' => [
                'required',
                'string',
                'max:255',
                Rule::unique('sp_master_options', 'nama')
                    ->where(fn ($q) => $q->where('type', $request->type)),
            ],
            'is_active' => ['nullable', 'boolean'],
        ], [
            'type.required' => 'Jenis master wajib dipilih.',
            'nama.required' => 'Nama master wajib diisi.',
            'nama.unique' => 'Data master tersebut sudah ada pada jenis yang sama.',
        ]);

        SpMasterOption::create([
            'type' => $validated['type'],
            'nama' => trim($validated['nama']),
            'is_active' => $request->boolean('is_active', true),
        ]);

        return redirect()
            ->route('sp-master-options.index', ['type' => $validated['type']])
            ->with('success', 'Master kontrak berhasil ditambahkan.');
    }

    public function update(Request $request, SpMasterOption $spMasterOption)
    {
        $validated = $request->validate([
            'type' => ['required', Rule::in(array_keys(self::TYPES))],
            'nama' => [
                'required',
                'string',
                'max:255',
                Rule::unique('sp_master_options', 'nama')
                    ->where(fn ($q) => $q->where('type', $request->type))
                    ->ignore($spMasterOption->id),
            ],
            'is_active' => ['nullable', 'boolean'],
        ], [
            'type.required' => 'Jenis master wajib dipilih.',
            'nama.required' => 'Nama master wajib diisi.',
            'nama.unique' => 'Data master tersebut sudah ada pada jenis yang sama.',
        ]);

        $spMasterOption->update([
            'type' => $validated['type'],
            'nama' => trim($validated['nama']),
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()
            ->route('sp-master-options.index', ['type' => $validated['type']])
            ->with('success', 'Master kontrak berhasil diperbarui.');
    }

    public function destroy(SpMasterOption $spMasterOption)
    {
        $type = $spMasterOption->type;
        $spMasterOption->delete();

        return redirect()
            ->route('sp-master-options.index', ['type' => $type])
            ->with('success', 'Master kontrak berhasil dihapus.');
    }
}
