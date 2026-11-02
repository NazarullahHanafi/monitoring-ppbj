<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\SpMasterOption;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class SpMasterOptionController extends Controller
{
    public function printOptions(Request $request)
    {
        $data = $request->validate(['type' => ['required', Rule::in(['penandatangan_sci', 'jabatan_sci'])],
            'q' => ['nullable', 'string', 'max:100'], 'active_only' => ['nullable', 'boolean'],
            'include_id' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:50'], 'page' => ['nullable', 'integer', 'min:1']]);
        $q = trim($data['q'] ?? '');
        $options = SpMasterOption::where('type', $data['type'])
            ->when($request->boolean('active_only'), fn ($query) => $query->active())
            ->when($q !== '', fn ($query) => $query->where('nama', 'like', '%'.addcslashes($q, '%_\\').'%'))
            ->when(! empty($data['include_id']), fn ($query) => $query->orderByRaw('CASE WHEN id = ? THEN 0 ELSE 1 END', [$data['include_id']]))
            ->orderBy('nama')->paginate($data['per_page'] ?? 12, ['id', 'type', 'nama', 'is_active', 'updated_at']);

        return response()->json(['options' => $options->getCollection()->map(fn ($row) => $this->printOption($row)),
            'page' => $options->currentPage(), 'last_page' => $options->lastPage(), 'total' => $options->total()])
            ->header('Cache-Control', 'private, no-store');
    }

    private function printOption(SpMasterOption $option): array
    {
        return ['id' => $option->id, 'type' => $option->type, 'nama' => $option->nama, 'is_active' => $option->is_active,
            'version' => hash('sha256', json_encode([$option->nama, $option->type, $option->is_active, $option->getRawOriginal('updated_at')]))];
    }

    private const TYPES = [
        'bidang_ip_itu' => 'Bidang IP / ITU',
        'bidang_pr' => 'Bidang PR',
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

        $counts = SpMasterOption::query()
            ->selectRaw('type, COUNT(*) as total')
            ->groupBy('type')
            ->pluck('total', 'type');

        $stats = collect(self::TYPES)
            ->mapWithKeys(fn ($label, $key) => [$key => (int) ($counts[$key] ?? 0)])
            ->prepend((int) $counts->sum(), 'total')
            ->all();

        return view('sp_master_options.index', compact('options', 'types', 'type', 'search', 'stats'));
    }

    public function store(Request $request)
    {
        return DB::transaction(fn () => $this->storeOption($request));
    }

    private function storeOption(Request $request)
    {
        if (is_string($request->input('nama'))) {
            $request->merge(['nama' => trim($request->input('nama'))]);
        }
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

        $option = SpMasterOption::create([
            'type' => $validated['type'],
            'nama' => trim($validated['nama']),
            'is_active' => $request->boolean('is_active', true),
        ]);

        if ($request->expectsJson()) {
            ActivityLog::create(['user_id' => $request->user()->id, 'model_type' => SpMasterOption::class,
                'model_id' => $option->id, 'action' => 'created', 'description' => 'Master penandatangan/jabatan ditambahkan dari popup cetak',
                'changes' => $this->printOption($option)]);

            return response()->json(['message' => 'Master berhasil ditambahkan.', 'option' => $this->printOption($option)], 201);
        }

        return redirect()
            ->route('sp-master-options.index', ['type' => $validated['type']])
            ->with('success', 'Master kontrak berhasil ditambahkan.');
    }

    public function update(Request $request, SpMasterOption $spMasterOption)
    {
        return DB::transaction(fn () => $this->updateOption($request, $spMasterOption));
    }

    private function updateOption(Request $request, SpMasterOption $spMasterOption)
    {
        if (is_string($request->input('nama'))) {
            $request->merge(['nama' => trim($request->input('nama'))]);
        }
        if ($request->expectsJson()) {
            $spMasterOption = SpMasterOption::whereKey($spMasterOption->id)->lockForUpdate()->firstOrFail();
            $request->validate(['version' => ['required', 'string', 'size:64']]);
            if (! hash_equals($this->printOption($spMasterOption)['version'], $request->input('version'))) {
                return response()->json(['message' => 'Master sudah diubah pengguna lain. Muat ulang daftar sebelum mengedit.'], 409);
            }
        }
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

        if ($request->expectsJson()) {
            ActivityLog::create(['user_id' => $request->user()->id, 'model_type' => SpMasterOption::class,
                'model_id' => $spMasterOption->id, 'action' => 'updated', 'description' => 'Master penandatangan/jabatan diperbarui dari popup cetak',
                'changes' => $this->printOption($spMasterOption)]);

            return response()->json(['message' => 'Master berhasil diperbarui.', 'option' => $this->printOption($spMasterOption)]);
        }

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
                'message' => 'Terlalu banyak percobaan password salah. Silakan coba lagi sekitar '.ceil($retryAfter / 60).' menit lagi.',
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

        if (! $passwordMatches) {
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
                'message' => 'Password superadmin umum tidak sesuai. Sisa percobaan: '.$remainingAttempts.'.',
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
            'description' => 'Master kontrak SP dihapus: '.($deletedData['nama'] ?? '-'),
            'changes' => $deletedData,
        ]);

        return response()->json([
            'ok' => true,
            'message' => 'Master kontrak berhasil dihapus.',
            'redirect' => route('sp-master-options.index', ['type' => $type]),
        ]);
    }
}
