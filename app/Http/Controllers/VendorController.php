<?php

namespace App\Http\Controllers;

use App\Models\Sp;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class VendorController extends Controller
{
    private const CACHE_STATS = 300; // 5 menit

    private const VALIDATION_MESSAGES = ['required' => ':attribute perlu diisi.', 'unique' => 'Nama vendor ini sudah ada. Cari atau ubah vendor yang tersedia.', 'email' => 'Masukkan alamat email perusahaan yang lengkap.', 'max' => ':attribute melewati batas panjang yang diizinkan.'];

    public function index(Request $request)
    {
        $validated = $request->validate(['search' => 'nullable|string|max:160']);
        $search = trim($validated['search'] ?? '');
        $pattern = '%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $search).'%';

        $vendors = Vendor::select([
            'id',
            'nama_vendor',
            'alamat',
            'telepon',
            'fax',
            'email',
            'npwp',
            'direktur',
            'jabatan',
            'is_active',
        ])->when($search !== '', fn ($q) => $q->where(function ($sub) use ($search, $pattern) {
            foreach (['nama_vendor', 'alamat', 'telepon', 'fax', 'email', 'npwp', 'direktur', 'jabatan'] as $column) {
                $sub->orWhereRaw($column." LIKE ? ESCAPE '!'", [$pattern]);
            }
            $sub->orWhereHas('documents', fn ($docs) => $docs->where('status', 'ready')->search($search));
        }))
            ->withCount(['documents as documents_count' => fn ($docs) => $docs->where('status', 'ready')])
            ->orderBy('nama_vendor')->orderBy('id')
            ->paginate(10)
            ->withQueryString();

        $stats = Cache::remember('vendor:stats', self::CACHE_STATS, function () {
            $counts = Vendor::query()->selectRaw('COUNT(*) as total,
                COALESCE(SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END), 0) as active,
                COALESCE(SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END), 0) as inactive')->first();

            return [
                'total' => (int) $counts->total,
                'active' => (int) $counts->active,
                'inactive' => (int) $counts->inactive,
                'dengan_sp' => Sp::distinct()->count('nama_vendor'),
            ];
        });

        return view('vendor.index', compact('vendors', 'search', 'stats'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_vendor' => 'required|string|max:255|unique:vendors,nama_vendor',
            'alamat' => 'nullable|string|max:500',
            'telepon' => 'nullable|string|max:50',
            'fax' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'direktur' => 'nullable|string|max:255', // ← TAMBAH
            'npwp' => 'nullable|string|max:50',
            'jabatan' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ], self::VALIDATION_MESSAGES, ['nama_vendor' => 'Nama vendor', 'email' => 'Email perusahaan']);

        $vendor = DB::transaction(function () use ($request) {
            return Vendor::create([
                'nama_vendor' => trim($request->nama_vendor),
                'alamat' => $request->alamat ?: null,
                'telepon' => $request->telepon ?: null,
                'fax' => $request->fax ?: null,
                'email' => $request->email ?: null,
                'npwp' => $request->npwp ?: null,
                'direktur' => $request->direktur ?: null,
                'jabatan' => $request->jabatan ?: null,
                'is_active' => $request->boolean('is_active', true),
            ]);
        });

        Cache::forget('vendor:stats');

        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'id' => $vendor->id,
                'nama_vendor' => $vendor->nama_vendor,
                'alamat' => $vendor->alamat,
                'telepon' => $vendor->telepon,
                'fax' => $vendor->fax,
                'direktur' => $vendor->direktur, // ← TAMBAH
                'npwp' => $vendor->npwp,
                'jabatan' => $vendor->jabatan,
                'redirect_url' => route('vendor.index', ['search' => $vendor->nama_vendor]),
            ], 201);
        }

        return redirect()->route('vendor.index')->with('success', 'Vendor berhasil ditambahkan!');
    }

    public function update(Request $request, Vendor $vendor)
    {
        $request->validate([
            'nama_vendor' => 'required|string|max:255|unique:vendors,nama_vendor,'.$vendor->id,
            'alamat' => 'nullable|string|max:500',
            'telepon' => 'nullable|string|max:50',
            'fax' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'direktur' => 'nullable|string|max:255', // ← TAMBAH
            'npwp' => 'nullable|string|max:50',
            'jabatan' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ], self::VALIDATION_MESSAGES, ['nama_vendor' => 'Nama vendor', 'email' => 'Email perusahaan']);

        $vendor = DB::transaction(function () use ($request, $vendor) {
            $vendor = Vendor::whereKey($vendor->id)->lockForUpdate()->firstOrFail();
            $oldName = $vendor->nama_vendor;
            $vendor->update([
                'nama_vendor' => trim($request->nama_vendor),
                'alamat' => $request->alamat ?: null,
                'telepon' => $request->telepon ?: null,
                'fax' => $request->fax ?: null,
                'email' => $request->email ?: null,
                'npwp' => $request->npwp ?: null,
                'direktur' => $request->direktur ?: null,
                'jabatan' => $request->jabatan ?: null,
                'is_active' => $request->boolean('is_active', true),
            ]);
            if ($oldName !== $vendor->nama_vendor) {
                DB::table('sps')->where('nama_vendor', $oldName)
                    ->update(['nama_vendor' => $vendor->nama_vendor]);
            }

            return $vendor;
        });

        Cache::forget('vendor:stats');

        if ($request->expectsJson()) {
            return response()->json(['id' => $vendor->id, 'nama_vendor' => $vendor->nama_vendor, 'redirect_url' => route('vendor.index', ['search' => $vendor->nama_vendor])]);
        }

        return redirect()->route('vendor.index')->with('success', 'Vendor berhasil diperbarui!');
    }

    public function destroy(Vendor $vendor)
    {
        if ($vendor->documents()->exists()) {
            return back()->withErrors(['error' => 'Vendor masih memiliki lampiran OneDrive. Hapus lampirannya terlebih dahulu atau nonaktifkan vendor.']);
        }
        if ($vendor->sps()->exists()) {
            return back()->withErrors([
                'error' => "Vendor \"{$vendor->nama_vendor}\" tidak bisa dihapus karena masih memiliki data SP. Nonaktifkan saja.",
            ]);
        }

        DB::transaction(function () use ($vendor) {
            $vendor->delete();
        });

        Cache::forget('vendor:stats');

        return redirect()->route('vendor.index')->with('success', 'Vendor berhasil dihapus!');
    }

    public function toggleActive(Vendor $vendor)
    {
        $vendor->update([
            'is_active' => ! $vendor->is_active,
        ]);

        Cache::forget('vendor:stats');

        return back()->with(
            'success',
            $vendor->is_active
            ? "Vendor \"{$vendor->nama_vendor}\" diaktifkan."
            : "Vendor \"{$vendor->nama_vendor}\" dinonaktifkan."
        );
    }

    public function search(Request $request)
    {
        $validated = $request->validate(['q' => ['nullable', 'string', 'max:160']]);
        $q = trim($validated['q'] ?? '');
        $pattern = '%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $q).'%';

        $load = fn () => Vendor::select([
            'id',
            'nama_vendor',
            'alamat',
            'telepon',
            'fax',
            'email',
            'npwp',
            'direktur',
            'jabatan',
        ])
            ->where('is_active', true)
            ->when($q !== '', fn ($query) => $query->whereRaw("nama_vendor LIKE ? ESCAPE '!'", [$pattern]))
            ->orderBy('nama_vendor')->orderBy('id')
            ->limit(20)
            ->get();

        // Cache only the default dropdown, not an unbounded key for every term.
        $vendors = $q === '' ? Cache::remember('vendors:lookup:default:v1', 60, $load) : $load();

        return response()->json($vendors)->header('Cache-Control', 'private, no-store');
    }
}
