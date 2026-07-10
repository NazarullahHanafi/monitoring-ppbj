<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MasterBuyer;
use App\Models\MasterPortofolio;
use App\Models\MasterMetodePengadaan;
use App\Models\MasterPenyediaEksternal;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class MasterDataController extends Controller
{
    private function modelByType(string $type)
    {
        return match ($type) {
            'buyer'              => MasterBuyer::class,
            'portofolio'         => MasterPortofolio::class,
            'metode_pengadaan'   => MasterMetodePengadaan::class,
            'penyedia_eksternal' => MasterPenyediaEksternal::class,
            default              => abort(404, 'Master type tidak valid'),
        };
    }

    /**
     * Mapping tipe ke nama cache key
     * (harus sama persis dengan yang dipakai di PpbjController)
     */
    private function getCacheKey(string $type): string
    {
        return match ($type) {
            'buyer'              => 'master_buyers',
            'portofolio'         => 'master_portofolios',
            'metode_pengadaan'   => 'master_metode_pengadaan',
            'penyedia_eksternal' => 'master_penyedia_eksternal',
            default              => 'master_' . $type,
        };
    }

    public function index(string $type)
    {
        $model = $this->modelByType($type);
        $items = $model::orderBy('nama')->get(['id', 'nama']);
        return response()->json($items);
    }

    // Fungsi untuk menambah data master
    public function addMaster(Request $request, string $type)
    {
        $this->ensureSuperadminUmum($request, 'create', $type);

        $request->validate([
            'nama' => 'required|string|max:100',
        ]);

        $model = $this->modelByType($type);

        try {
            $item = $model::create(['nama' => $request->nama]);

            // ✅ Hapus cache agar dropdown langsung fresh
            Cache::forget($this->getCacheKey($type));

            return response()->json(['message' => 'Berhasil ditambahkan', 'item' => $item]);
        } catch (\Exception $e) {
            Log::error('Gagal menambahkan master data', ['type' => $type, 'error' => $e->getMessage()]);
            return response()->json(['message' => 'Gagal menambahkan data'], 500);
        }
    }

    // Fungsi untuk update data master
    public function update(Request $request, string $type, int $id)
    {
        $this->ensureSuperadminUmum($request, 'update', $type);

        $request->validate(['nama' => 'required|string|max:100']);

        $model = $this->modelByType($type);
        $item  = $model::findOrFail($id);
        $item->update(['nama' => $request->nama]);

        // ✅ Hapus cache agar dropdown langsung fresh
        Cache::forget($this->getCacheKey($type));

        return response()->json(['message' => 'Berhasil diupdate', 'item' => $item]);
    }

    // Fungsi untuk menghapus data master
    public function destroy(string $type, int $id)
    {
        $this->ensureSuperadminUmum(request(), 'delete', $type);

        $model = $this->modelByType($type);
        $model::findOrFail($id)->delete();

        // ✅ Hapus cache agar dropdown langsung fresh
        Cache::forget($this->getCacheKey($type));

        return response()->json(['message' => 'Berhasil dihapus']);
    }

    private function ensureSuperadminUmum(Request $request, string $action, string $type): void
    {
        $user = $request->user();

        if ($user && $user->role === 'superadmin' && $user->department === 'umum') {
            return;
        }

        Log::warning('Unauthorized master data mutation attempt', [
            'user_id' => $user?->id,
            'email' => $user?->email,
            'role' => $user?->role,
            'department' => $user?->department,
            'action' => $action,
            'type' => $type,
            'ip' => $request->ip(),
        ]);

        abort(403, 'Hanya Superadmin Umum yang dapat mengubah master data.');
    }
}
