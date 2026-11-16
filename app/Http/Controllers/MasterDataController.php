<?php

namespace App\Http\Controllers;

use App\Models\MasterBuyer;
use App\Models\MasterMetodePengadaan;
use App\Models\MasterPenyediaEksternal;
use App\Models\MasterPortofolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class MasterDataController extends Controller
{
    public const NAME_LIMITS = ['buyer' => 50, 'portofolio' => 100, 'metode_pengadaan' => 50, 'penyedia_eksternal' => 100];

    private function modelByType(string $type)
    {
        return match ($type) {
            'buyer' => MasterBuyer::class,
            'portofolio' => MasterPortofolio::class,
            'metode_pengadaan' => MasterMetodePengadaan::class,
            'penyedia_eksternal' => MasterPenyediaEksternal::class,
            default => abort(404, 'Master type tidak valid'),
        };
    }

    public function index(string $type)
    {
        $model = $this->modelByType($type);
        $items = Cache::remember('master:dropdown:v1:'.$type, 300,
            fn () => $model::orderBy('nama')->orderBy('id')->get(['id', 'nama']));

        return response()->json($items)->header('Cache-Control', 'private, no-store');
    }

    // Fungsi untuk menambah data master
    public function addMaster(Request $request, string $type)
    {
        $this->ensureCanMutateMaster($request, 'create', $type);
        $model = $this->modelByType($type);
        $validated = $this->validateName($request, $type);

        try {
            $item = $model::create($validated);

            return response()->json(['message' => 'Berhasil ditambahkan', 'item' => $item])->header('Cache-Control', 'private, no-store');
        } catch (\Exception $e) {
            Log::error('Gagal menambahkan master data', ['type' => $type, 'error' => $e->getMessage()]);

            return response()->json(['message' => 'Gagal menambahkan data'], 500);
        }
    }

    // Fungsi untuk update data master
    public function update(Request $request, string $type, string $id)
    {
        $this->ensureCanMutateMaster($request, 'update', $type);

        $model = $this->modelByType($type);
        $validated = $this->validateName($request, $type);
        $item = $model::findOrFail($this->recordId($id));
        $item->update($validated);

        return response()->json(['message' => 'Berhasil diupdate', 'item' => $item])->header('Cache-Control', 'private, no-store');
    }

    // Fungsi untuk menghapus data master
    public function destroy(string $type, string $id)
    {
        $this->ensureCanMutateMaster(request(), 'delete', $type);

        $model = $this->modelByType($type);
        $model::findOrFail($this->recordId($id))->delete();

        return response()->json(['message' => 'Berhasil dihapus'])->header('Cache-Control', 'private, no-store');
    }

    private function recordId(string $id): int
    {
        $value = filter_var($id, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
        abort_if($value === false, 404);

        return $value;
    }

    private function validateName(Request $request, string $type): array
    {
        if (is_string($request->input('nama'))) {
            $request->merge(['nama' => trim($request->input('nama'))]);
        }

        return $request->validate(['nama' => ['required', 'string', 'max:'.self::NAME_LIMITS[$type]]], [
            'nama.required' => 'Nama master perlu diisi.',
            'nama.string' => 'Nama master harus berupa teks.',
            'nama.max' => 'Nama master maksimal '.self::NAME_LIMITS[$type].' karakter.',
        ]);
    }

    private function ensureCanMutateMaster(Request $request, string $action, string $type): void
    {
        $user = $request->user();

        if ($user && $user->role === 'superadmin' && $user->department === 'umum') {
            return;
        }

        if (
            $type === 'penyedia_eksternal'
            && $user
            && $user->department === 'umum'
            && $user->role !== 'viewer'
        ) {
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

        abort(403, $type === 'penyedia_eksternal'
            ? 'Hanya user Umum yang dapat mengubah penyedia eksternal.'
            : 'Hanya Superadmin Umum yang dapat mengubah master data.'
        );
    }
}
