<?php

namespace App\Http\Controllers;

use App\Models\Sp;
use App\Models\Vendor;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class VendorController extends Controller
{
    private const CACHE_STATS = 300; // 5 menit

    private const VALIDATION_MESSAGES = ['required' => ':attribute perlu diisi.', 'unique' => 'Nama vendor ini sudah ada. Cari atau ubah vendor yang tersedia.', 'email' => 'Masukkan alamat email perusahaan yang lengkap.', 'max' => ':attribute melewati batas panjang yang diizinkan.'];

    public function index(Request $request)
    {
        $validated = $request->validate(['search' => 'nullable|string|max:160', 'page' => 'nullable|integer|min:1|max:1000000']);
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
        $data = $this->validatedData($request);
        try {
            $vendor = DB::transaction(fn () => Vendor::create($data));
        } catch (UniqueConstraintViolationException) {
            throw ValidationException::withMessages(['nama_vendor' => 'Nama vendor ini sudah ada. Cari atau ubah vendor yang tersedia.']);
        }

        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'id' => $vendor->id,
                'nama_vendor' => $vendor->nama_vendor,
                'alamat' => $vendor->alamat,
                'telepon' => $vendor->telepon,
                'fax' => $vendor->fax,
                'direktur' => $vendor->direktur,
                'npwp' => $vendor->npwp,
                'jabatan' => $vendor->jabatan,
                'redirect_url' => route('vendor.index', ['search' => $vendor->nama_vendor]),
            ], 201)->header('Cache-Control', 'private, no-store');
        }

        return redirect()->route('vendor.index')->with('success', 'Vendor berhasil ditambahkan!');
    }

    public function update(Request $request, Vendor $vendor)
    {
        $data = $this->validatedData($request, $vendor);
        try {
            $vendor = DB::transaction(function () use ($vendor, $data) {
                $row = Vendor::whereKey($vendor->id)->lockForUpdate()->firstOrFail();
                $oldName = $row->nama_vendor;
                $row->update($data);
                if ($oldName !== $row->nama_vendor) {
                    DB::table('sps')->where('nama_vendor', $oldName)->update(['nama_vendor' => $row->nama_vendor]);
                }

                return $row;
            });
        } catch (UniqueConstraintViolationException) {
            throw ValidationException::withMessages(['nama_vendor' => 'Nama vendor ini sudah ada. Cari atau ubah vendor yang tersedia.']);
        }

        if ($request->expectsJson()) {
            return response()->json(['id' => $vendor->id, 'nama_vendor' => $vendor->nama_vendor, 'redirect_url' => route('vendor.index', ['search' => $vendor->nama_vendor])])
                ->header('Cache-Control', 'private, no-store');
        }

        return redirect()->route('vendor.index')->with('success', 'Vendor berhasil diperbarui!');
    }

    private function validatedData(Request $request, ?Vendor $vendor = null): array
    {
        if (is_string($request->input('nama_vendor'))) {
            $request->merge(['nama_vendor' => trim($request->input('nama_vendor'))]);
        }
        $data = $request->validate([
            'nama_vendor' => ['required', 'string', 'max:255', Rule::unique('vendors', 'nama_vendor')->ignore($vendor?->id)],
            'alamat' => ['nullable', 'string', 'max:500'],
            'telepon' => ['nullable', 'string', 'max:50'],
            'fax' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],
            'direktur' => ['nullable', 'string', 'max:255'],
            'npwp' => ['nullable', 'string', 'max:50'],
            'jabatan' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ], self::VALIDATION_MESSAGES, ['nama_vendor' => 'Nama vendor', 'email' => 'Email perusahaan']);
        foreach (['alamat', 'telepon', 'fax', 'email', 'direktur', 'npwp', 'jabatan'] as $field) {
            $data[$field] = ($data[$field] ?? '') === '' ? null : $data[$field];
        }
        $data['is_active'] = $request->boolean('is_active', true);

        return $data;
    }

    public function destroy(Request $request, Vendor $vendor)
    {
        if ($vendor->documents()->exists()) {
            if ($request->expectsJson()) {
                throw ValidationException::withMessages(['error' => 'Vendor masih memiliki lampiran OneDrive. Hapus lampirannya terlebih dahulu atau nonaktifkan vendor.']);
            }

            return back()->withErrors(['error' => 'Vendor masih memiliki lampiran OneDrive. Hapus lampirannya terlebih dahulu atau nonaktifkan vendor.']);
        }
        if ($vendor->sps()->exists()) {
            if ($request->expectsJson()) {
                throw ValidationException::withMessages(['error' => 'Vendor masih memiliki data SP. Nonaktifkan vendor sebagai gantinya.']);
            }

            return back()->withErrors([
                'error' => "Vendor \"{$vendor->nama_vendor}\" tidak bisa dihapus karena masih memiliki data SP. Nonaktifkan saja.",
            ]);
        }

        DB::transaction(function () use ($vendor) {
            $vendor->delete();
        });

        if ($request->expectsJson()) {
            return response()->json(['success' => true, 'message' => 'Vendor berhasil dihapus!', 'redirect_url' => route('vendor.index')])
                ->header('Cache-Control', 'private, no-store');
        }

        return redirect()->route('vendor.index')->with('success', 'Vendor berhasil dihapus!');
    }

    public function toggleActive(Request $request, string $vendor)
    {
        abort_unless(filter_var($vendor, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]) !== false, 404);
        $request->validate(['is_active' => ['required', 'boolean']], ['is_active.required' => 'Muat ulang daftar vendor sebelum mengubah status.']);
        $active = $request->boolean('is_active');
        [$row, $changed] = DB::transaction(function () use ($vendor, $active) {
            $row = Vendor::whereKey($vendor)->lockForUpdate()->firstOrFail(['id', 'is_active']);
            $changed = $row->is_active !== $active;
            if ($changed) {
                $row->update(['is_active' => $active]);
            }

            return [$row, $changed];
        });
        $message = $active ? 'Vendor berhasil diaktifkan.' : 'Vendor berhasil dinonaktifkan.';
        if ($request->expectsJson()) {
            return response()->json(['success' => true, 'is_active' => $row->is_active, 'changed' => $changed, 'message' => $message])
                ->header('Cache-Control', 'private, no-store');
        }

        return back()->with(
            'success',
            $message
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
