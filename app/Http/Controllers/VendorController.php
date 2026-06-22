<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use App\Models\Sp;

class VendorController extends Controller
{
    private const CACHE_STATS = 300; // 5 menit

    public function index(Request $request)
    {
        $search = $request->get('search', '');

        $vendors = Vendor::when($search, fn($q) => $q->where(function ($sub) use ($search) {
            $sub->where('nama_vendor', 'like', "%{$search}%")
                ->orWhere('alamat', 'like', "%{$search}%")
                ->orWhere('telepon', 'like', "%{$search}%")
                ->orWhere('fax', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('npwp', 'like', "%{$search}%")
                ->orWhere('direktur', 'like', "%{$search}%")
                ->orWhere('jabatan', 'like', "%{$search}%");
        }))
            ->orderBy('nama_vendor')
            ->paginate(25)
            ->withQueryString();

        $stats = Cache::remember('vendor:stats', 300, function () {
            return [
                'total' => Vendor::count(),
                'active' => Vendor::where('is_active', true)->count(),
                'inactive' => Vendor::where('is_active', false)->count(),
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
        ]);

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
            ], 201);
        }

        return redirect()->route('vendor.index')->with('success', 'Vendor berhasil ditambahkan!');
    }

    public function update(Request $request, Vendor $vendor)
    {
        $request->validate([
            'nama_vendor' => 'required|string|max:255|unique:vendors,nama_vendor,' . $vendor->id,
            'alamat' => 'nullable|string|max:500',
            'telepon' => 'nullable|string|max:50',
            'fax' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'direktur' => 'nullable|string|max:255', // ← TAMBAH
            'npwp' => 'nullable|string|max:50',
            'jabatan' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $oldName = $vendor->nama_vendor;

        DB::transaction(function () use ($request, $vendor) {
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
        });

        if ($oldName !== $vendor->nama_vendor) {
            DB::table('sps')
                ->where('nama_vendor', $oldName)
                ->update(['nama_vendor' => $vendor->nama_vendor]);
        }

        Cache::forget('vendor:stats');

        return redirect()->route('vendor.index')->with('success', 'Vendor berhasil diperbarui!');
    }

    public function destroy(Vendor $vendor)
    {
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
            'is_active' => !$vendor->is_active,
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
        $q = $request->get('q', '');

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
        ])
            ->where('is_active', true)
            ->when($q, fn($query) => $query->where('nama_vendor', 'like', "%{$q}%"))
            ->orderBy('nama_vendor')
            ->limit(20)
            ->get();

        return response()->json($vendors);
    }
}