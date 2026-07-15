<?php

namespace App\Http\Controllers;

use App\Models\SpMasterOption;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
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

    public function destroy(Request $request, SpMasterOption $spMasterOption)
    {
        $request->validate([
            'admin_password' => ['required', 'string', 'min:1', 'max:255'],
        ], [
            'admin_password.required' => 'Password superadmin umum wajib diisi untuk menghapus master kontrak.',
        ]);

        $user = $request->user();
        $currentUserId = $user?->id ?: 'guest';
        $ipHash = sha1((string) $request->ip());
        $attemptKey = "sp_master_option_delete_attempts:{$spMasterOption->id}:{$currentUserId}:{$ipHash}";
        $lockKey = "sp_master_option_delete_lock:{$spMasterOption->id}:{$currentUserId}:{$ipHash}";

        if ($lockedUntil = Cache::get($lockKey)) {
            $lockedUntilAt = Carbon::parse($lockedUntil);
            $retryAfter = (int) ceil(max(1, now()->diffInSeconds($lockedUntilAt, false)));

            return response()->json([
                'message' => 'Terlalu banyak percobaan password salah. Silakan coba lagi sekitar ' . ceil($retryAfter / 60) . ' menit lagi.',
                'locked' => true,
                'retry_after' => $retryAfter,
                'locked_until' => $lockedUntilAt->toIso8601String(),
            ], 429);
        }

        $authorizedAdmins = User::query()
            ->where(function ($query) {
                $query->whereRaw('LOWER(email) = ?', ['superadmin@sucofindo.com'])
                    ->orWhere(function ($subQuery) {
                        $subQuery->whereRaw('LOWER(role) = ?', ['superadmin'])
                            ->whereRaw('LOWER(department) = ?', ['umum']);
                    });
            })
            ->get();

        if ($authorizedAdmins->isEmpty()) {
            return response()->json([
                'message' => 'Akun superadmin umum tidak ditemukan, sehingga master tidak bisa dihapus.',
            ], 422);
        }

        $passwordMatches = $authorizedAdmins->contains(
            fn (User $admin) => Hash::check((string) $request->admin_password, (string) $admin->password)
        );

        if (!$passwordMatches) {
            $attempts = ((int) Cache::get($attemptKey, 0)) + 1;
            $remainingAttempts = max(0, 3 - $attempts);
            Cache::put($attemptKey, $attempts, now()->addMinutes(15));

            if ($attempts >= 3) {
                $lockedUntil = now()->addMinutes(15);
                Cache::put($lockKey, $lockedUntil->toIso8601String(), $lockedUntil);
                Cache::forget($attemptKey);

                return response()->json([
                    'message' => 'Password salah 3 kali. Aksi hapus master kontrak dikunci selama 15 menit.',
                    'locked' => true,
                    'retry_after' => 15 * 60,
                    'locked_until' => $lockedUntil->toIso8601String(),
                ], 429);
            }

            return response()->json([
                'message' => 'Password superadmin umum tidak sesuai. Sisa percobaan: ' . $remainingAttempts . '.',
                'attempts_remaining' => $remainingAttempts,
            ], 422);
        }

        Cache::forget($attemptKey);
        Cache::forget($lockKey);

        $type = $spMasterOption->type;
        $deletedData = [
            'type' => $spMasterOption->type,
            'nama' => $spMasterOption->nama,
            'is_active' => $spMasterOption->is_active,
            'deleted_by' => $user?->email,
            'ip' => $request->ip(),
        ];

        $spMasterOption->delete();

        \App\Models\ActivityLog::create([
            'user_id' => $user?->id,
            'model_type' => SpMasterOption::class,
            'model_id' => $spMasterOption->id,
            'action' => 'deleted',
            'description' => 'Master kontrak SP dihapus: ' . ($deletedData['nama'] ?? '-'),
            'changes' => $deletedData,
        ]);

        return response()->json([
            'ok' => true,
            'message' => 'Master kontrak berhasil dihapus.',
            'redirect' => route('sp-master-options.index', ['type' => $type]),
        ]);
    }
}
