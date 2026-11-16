<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\SpMasterOption;
use App\Models\User;
use App\Rules\PasswordStorageLimits;
use App\Support\SpMasterOptionVersion;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class SpMasterOptionController extends Controller
{
    public function printOptions(Request $request)
    {
        $data = $request->validate(['type' => ['bail', 'required', 'string', Rule::in(['penandatangan_sci', 'jabatan_sci', 'bidang_pr'])],
            'q' => ['nullable', 'string', 'max:100'], 'active_only' => ['nullable', 'boolean'],
            'include_id' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:50'], 'page' => ['nullable', 'integer', 'min:1', 'max:100000']]);
        $q = trim($data['q'] ?? '');
        $options = SpMasterOption::where('type', $data['type'])
            ->when($request->boolean('active_only'), fn ($query) => $query->active())
            ->when($q !== '', fn ($query) => $query->whereRaw("nama LIKE ? ESCAPE '!'", [$this->searchPattern($q)]))
            ->when(! empty($data['include_id']), fn ($query) => $query->orderByRaw('CASE WHEN id = ? THEN 0 ELSE 1 END', [$data['include_id']]))
            ->orderBy('nama')->orderBy('id')->paginate($data['per_page'] ?? 12, ['id', 'type', 'nama', 'is_active', 'updated_at']);

        return response()->json(['options' => $options->getCollection()->map(fn ($row) => $this->printOption($row)),
            'page' => $options->currentPage(), 'last_page' => $options->lastPage(), 'total' => $options->total()])
            ->header('Cache-Control', 'private, no-store');
    }

    private function printOption(SpMasterOption $option): array
    {
        return ['id' => $option->id, 'type' => $option->type, 'nama' => $option->nama, 'is_active' => $option->is_active,
            'version' => SpMasterOptionVersion::of($option)];
    }

    private const TYPES = [
        'bidang_ip_itu' => 'Bidang IP / ITU',
        'bidang_pr' => 'Bidang PR',
        'penandatangan_sci' => 'Penandatangan SCI',
        'jabatan_sci' => 'Jabatan SCI',
    ];

    public function index(Request $request)
    {
        $data = $request->validate([
            'type' => ['bail', 'nullable', 'string', Rule::in(array_keys(self::TYPES))],
            'search' => ['nullable', 'string', 'max:150'],
            'page' => ['nullable', 'integer', 'min:1', 'max:100000'],
        ]);
        $type = $data['type'] ?? '';
        $search = trim($data['search'] ?? '');

        $options = SpMasterOption::query()
            ->when($type !== '', fn ($q) => $q->where('type', $type))
            ->when($search !== '', fn ($q) => $q->whereRaw("nama LIKE ? ESCAPE '!'", [$this->searchPattern($search)]))
            ->orderBy('type')
            ->orderBy('nama')
            ->orderBy('id')
            ->paginate(20, ['id', 'type', 'nama', 'is_active', 'updated_at'])
            ->appends($data);

        $types = self::TYPES;

        $counts = SpMasterOption::query()
            ->selectRaw('type, COUNT(*) as total')
            ->groupBy('type')
            ->pluck('total', 'type');

        $stats = collect(self::TYPES)
            ->mapWithKeys(fn ($label, $key) => [$key => (int) ($counts[$key] ?? 0)])
            ->prepend((int) $counts->sum(), 'total')
            ->all();

        return response()->view('sp_master_options.index', compact('options', 'types', 'type', 'search', 'stats'))
            ->header('Cache-Control', 'private, no-store');
    }

    public function store(Request $request)
    {
        return $this->saveOption($request);
    }

    public function update(Request $request, SpMasterOption $spMasterOption)
    {
        return $this->saveOption($request, $spMasterOption);
    }

    private function saveOption(Request $request, ?SpMasterOption $existing = null)
    {
        if (is_string($request->input('nama'))) {
            $request->merge(['nama' => trim($request->input('nama'))]);
        }
        $data = $request->validate([
            'type' => ['bail', 'required', 'string', Rule::in(array_keys(self::TYPES))],
            'nama' => ['bail', 'required', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
            'version' => $existing ? ['required', 'string', 'size:64'] : ['nullable', 'string', 'size:64'],
        ], [
            'type.required' => 'Jenis master wajib dipilih.',
            'nama.required' => 'Nama master wajib diisi.',
            'nama.unique' => 'Data master tersebut sudah ada pada jenis yang sama.',
            'version.required' => 'Daftar master perlu dimuat ulang sebelum mengedit. Salin isian Anda terlebih dahulu.',
        ]);
        // Only validated scalar values reach the uniqueness query.
        validator($data, ['nama' => [Rule::unique('sp_master_options', 'nama')
            ->where(fn ($query) => $query->where('type', $data['type']))->ignore($existing?->id)]], [
                'nama.unique' => 'Data master tersebut sudah ada pada jenis yang sama.',
            ])->validate();
        $attributes = ['type' => $data['type'], 'nama' => trim($data['nama']),
            'is_active' => $request->boolean('is_active', $existing === null)];

        try {
            [$option, $changed] = DB::transaction(function () use ($existing, $attributes, $data, $request) {
                $option = $existing ? SpMasterOption::whereKey($existing->id)->lockForUpdate()->firstOrFail() : new SpMasterOption;
                if ($existing && ! hash_equals(SpMasterOptionVersion::of($option), $data['version'])) {
                    abort(409, 'Master sudah diubah pengguna lain. Muat ulang daftar; salin isian Anda terlebih dahulu.');
                }
                $option->fill($attributes);
                $changed = ! $option->exists || $option->isDirty();
                if ($changed) {
                    $option->save();
                    ActivityLog::create(['user_id' => $request->user()->id, 'model_type' => SpMasterOption::class,
                        'model_id' => $option->id, 'action' => $existing ? 'updated' : 'created',
                        'description' => $existing ? 'Master kontrak SP diperbarui' : 'Master kontrak SP ditambahkan',
                        'changes' => $this->printOption($option)]);
                }

                return [$option, $changed];
            });
        } catch (UniqueConstraintViolationException) {
            throw ValidationException::withMessages(['nama' => 'Data master tersebut sudah ada pada jenis yang sama.']);
        }
        $message = $changed ? 'Master kontrak berhasil disimpan.' : 'Tidak ada perubahan pada master kontrak.';

        if ($request->expectsJson()) {
            return response()->json(['message' => $message, 'changed' => $changed, 'option' => $this->printOption($option)], $existing ? 200 : 201)
                ->header('Cache-Control', 'private, no-store');
        }

        return redirect()->route('sp-master-options.index', ['type' => $option->type])->with('success', $message);
    }

    private function searchPattern(string $value): string
    {
        return '%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $value).'%';
    }

    public function destroy(Request $request, SpMasterOption $spMasterOption)
    {
        $request->validate([
            'admin_password' => ['bail', 'required', 'string', 'max:1024', new PasswordStorageLimits],
            'version' => ['nullable', 'string', 'size:64'],
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
            ->where('is_active', true)
            ->whereNull('locked_at')
            ->whereRaw('LOWER(role) = ?', ['superadmin'])
            ->whereRaw('LOWER(department) = ?', ['umum'])
            ->get(['id', 'password']);

        if ($authorizedAdmins->isEmpty()) {
            return response()->json([
                'message' => 'Akun superadmin umum tidak ditemukan, sehingga master tidak bisa dihapus.',
            ], 422);
        }

        $matchedAdmin = $authorizedAdmins->first(
            fn (User $admin) => Hash::check((string) $request->admin_password, (string) $admin->password)
        );

        if (! $matchedAdmin) {
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

        $type = DB::transaction(function () use ($request, $spMasterOption, $matchedAdmin, $user) {
            // Hash work happens before the transaction; recheck the matched
            // credential and eligibility under a short lock before deletion.
            $admin = User::whereKey($matchedAdmin->id)->lockForUpdate()
                ->first(['id', 'password', 'email', 'role', 'department', 'is_active', 'locked_at']);
            if (! $admin || ! $admin->is_active || $admin->locked_at
                || ! hash_equals((string) $matchedAdmin->password, (string) $admin->password)
                || strtolower($admin->role) !== 'superadmin' || strtolower($admin->department) !== 'umum') {
                throw ValidationException::withMessages(['admin_password' => 'Verifikasi superadmin berubah. Periksa kembali sebelum menghapus.']);
            }
            $option = SpMasterOption::whereKey($spMasterOption->id)->lockForUpdate()->firstOrFail();
            if ($request->filled('version') && ! hash_equals(SpMasterOptionVersion::of($option), $request->input('version'))) {
                abort(409, 'Master sudah berubah. Muat ulang daftar sebelum menghapus.');
            }
            $deletedData = ['type' => $option->type, 'nama' => $option->nama,
                'is_active' => $option->is_active, 'deleted_by' => $user?->email, 'ip' => $request->ip()];
            $option->delete();
            ActivityLog::create(['user_id' => $user?->id, 'model_type' => SpMasterOption::class,
                'model_id' => $option->id, 'action' => 'deleted',
                'description' => 'Master kontrak SP dihapus: '.$option->nama, 'changes' => $deletedData]);

            return $option->type;
        });

        return response()->json([
            'ok' => true,
            'message' => 'Master kontrak berhasil dihapus.',
            'redirect' => route('sp-master-options.index', ['type' => $type]),
        ])->header('Cache-Control', 'private, no-store');
    }
}
