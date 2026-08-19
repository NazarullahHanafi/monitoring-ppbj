<?php

namespace App\Http\Controllers;

use App\Models\Satuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;

class SatuanController extends Controller
{
    public function index()
    {
        $satuans = Cache::remember(
            'satuans:index',
            3600,
            fn () => Satuan::orderBy('nama_satuan')->get()
        );

        return view('satuan.index', compact('satuans'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_satuan' => ['required', 'string', 'max:100', Rule::unique('satuans', 'nama_satuan')],
            'keterangan' => 'nullable|string|max:255',
        ]);

        $satuan = Satuan::create([
            'nama_satuan' => trim($request->nama_satuan),
            'keterangan' => $request->keterangan ? trim($request->keterangan) : null,
        ]);

        Cache::forget('satuans:all');
        Cache::forget('satuans:index');

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Satuan berhasil ditambahkan!',
                'satuan' => [
                    'id' => $satuan->id,
                    'nama_satuan' => $satuan->nama_satuan,
                    'keterangan' => $satuan->keterangan,
                ],
            ], 201);
        }

        return redirect()->route('satuan.index')->with('success', 'Satuan berhasil ditambahkan!');
    }

    public function update(Request $request, Satuan $satuan)
    {
        $request->validate([
            'nama_satuan' => ['required', 'string', 'max:100', Rule::unique('satuans', 'nama_satuan')->ignore($satuan->id)],
            'keterangan' => 'nullable|string|max:255',
        ]);

        $satuan->update([
            'nama_satuan' => trim($request->nama_satuan),
            'keterangan' => $request->keterangan ? trim($request->keterangan) : null,
        ]);

        Cache::forget('satuans:all');
        Cache::forget('satuans:index');

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Satuan berhasil diperbarui!',
                'satuan' => [
                    'id' => $satuan->id,
                    'nama_satuan' => $satuan->nama_satuan,
                    'keterangan' => $satuan->keterangan,
                ],
            ]);
        }

        return redirect()->route('satuan.index')->with('success', 'Satuan berhasil diperbarui!');
    }

    public function destroy(Satuan $satuan)
    {
        $satuan->delete();
        Cache::forget('satuans:all');
        Cache::forget('satuans:index');

        return redirect()->route('satuan.index')->with('success', 'Satuan berhasil dihapus!');
    }

    // API untuk dropdown di form SPPH
    public function list()
    {
        return response()->json(Satuan::orderBy('nama_satuan')->pluck('nama_satuan'));
    }
}
