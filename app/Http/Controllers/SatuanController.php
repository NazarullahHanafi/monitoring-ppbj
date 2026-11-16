<?php

namespace App\Http\Controllers;

use App\Models\Satuan;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class SatuanController extends Controller
{
    public function index()
    {
        $satuans = Cache::remember(
            'satuans:index',
            3600,
            fn () => Satuan::orderBy('nama_satuan')->orderBy('id')->get(['id', 'nama_satuan', 'keterangan'])
        );

        return view('satuan.index', compact('satuans'));
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);
        try {
            $satuan = Satuan::create($data);
        } catch (UniqueConstraintViolationException) {
            throw ValidationException::withMessages(['nama_satuan' => 'Satuan ini sudah ada. Pilih nama lain atau gunakan satuan yang tersedia.']);
        }

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Satuan berhasil ditambahkan!',
                'satuan' => [
                    'id' => $satuan->id,
                    'nama_satuan' => $satuan->nama_satuan,
                    'keterangan' => $satuan->keterangan,
                ],
            ], 201)->header('Cache-Control', 'private, no-store');
        }

        return redirect()->route('satuan.index')->with('success', 'Satuan berhasil ditambahkan!');
    }

    public function update(Request $request, Satuan $satuan)
    {
        $data = $this->validatedData($request, $satuan);
        try {
            $satuan->update($data);
        } catch (UniqueConstraintViolationException) {
            throw ValidationException::withMessages(['nama_satuan' => 'Satuan ini sudah ada. Pilih nama lain atau gunakan satuan yang tersedia.']);
        }

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Satuan berhasil diperbarui!',
                'satuan' => [
                    'id' => $satuan->id,
                    'nama_satuan' => $satuan->nama_satuan,
                    'keterangan' => $satuan->keterangan,
                ],
            ])->header('Cache-Control', 'private, no-store');
        }

        return redirect()->route('satuan.index')->with('success', 'Satuan berhasil diperbarui!');
    }

    public function destroy(Request $request, Satuan $satuan)
    {
        $satuan->delete();

        if ($request->expectsJson()) {
            return response()->json(['success' => true, 'message' => 'Satuan berhasil dihapus!'])
                ->header('Cache-Control', 'private, no-store');
        }

        return redirect()->route('satuan.index')->with('success', 'Satuan berhasil dihapus!');
    }

    private function validatedData(Request $request, ?Satuan $satuan = null): array
    {
        foreach (['nama_satuan', 'keterangan'] as $field) {
            if (is_string($request->input($field))) {
                $request->merge([$field => trim($request->input($field))]);
            }
        }

        $data = $request->validate([
            'nama_satuan' => ['required', 'string', 'max:100', Rule::unique('satuans', 'nama_satuan')->ignore($satuan?->id)],
            'keterangan' => ['nullable', 'string', 'max:255'],
        ]);
        $data['keterangan'] = ($data['keterangan'] ?? '') === '' ? null : $data['keterangan'];

        return $data;
    }

    // API untuk dropdown di form SPPH
    public function list()
    {
        return response()->json(Cache::remember('satuans:all', 3600,
            fn () => Satuan::orderBy('nama_satuan')->pluck('nama_satuan')->toArray()))
            ->header('Cache-Control', 'private, no-store');
    }
}
