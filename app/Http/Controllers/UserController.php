<?php

namespace App\Http\Controllers;

use App\Models\MasterBuyer;
use App\Models\User;
use App\Support\UserDirectoryQuery;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    use AuthorizesRequests;

    /**
     * ✅ OPTIMIZED: Display all users with pagination
     * Support 10K+ users without lag
     */
    public function index(Request $request)
    {
        // ✅ Security check (only superadmin umum)
        $this->authorize('viewAny', User::class);
        $filters = UserDirectoryQuery::filters($request);

        // ✅ Query Builder untuk performa lebih baik
        $query = UserDirectoryQuery::apply($filters)
            ->select([
                'id',
                'name',
                'email',
                'role',
                'department',
                'gender',
                'buyer_name',
                'last_seen_at',
                'last_login_ip',
                'last_seen_ip',
                'created_at',
                'updated_at',
            ]);

        // ✅ SORTING
        $query->orderBy($filters['sort'] ?? 'department', $filters['direction'] ?? 'asc')->orderBy('id');

        // ✅ PAGINATION
        $perPage = $filters['per_page'] ?? 25;

        $users = $query->paginate($perPage)->withQueryString();

        // ✅ STATISTICS (cached)
        $stats = Cache::remember('user_stats', 300, function () {
            return DB::table('users')
                ->selectRaw("
                    COUNT(*) as total,
                    SUM(CASE WHEN department = 'umum' THEN 1 ELSE 0 END) as umum_count,
                    SUM(CASE WHEN department = 'operasional' THEN 1 ELSE 0 END) as operasional_count,
                    SUM(CASE WHEN role = 'superadmin' THEN 1 ELSE 0 END) as superadmin_count,
                    SUM(CASE WHEN role = 'viewer' THEN 1 ELSE 0 END) as viewer_count
                ")
                ->first();
        });

        $masterBuyers = Cache::remember(
            'master_buyers_for_user_mapping',
            300,
            fn () => MasterBuyer::orderBy('nama')->pluck('nama')->values()
        );

        return view('users.index', compact('users', 'stats', 'masterBuyers'));
    }

    public function store(Request $request)
    {
        $this->authorize('create', User::class);
        $data = $this->validatedAccount($request);
        try {
            $data['password'] = Hash::make($data['password']);
            $user = DB::transaction(fn () => User::create($data));
            Cache::forget('user_stats');
            Log::info('New user created', ['user_id' => $user->id, 'created_by' => auth()->id()]);

            return $this->success('User berhasil ditambahkan');
        } catch (UniqueConstraintViolationException) {
            throw ValidationException::withMessages(['email' => 'Email sudah digunakan pengguna lain. Muat ulang daftar untuk memeriksa.']);
        } catch (\Exception $error) {
            return $this->failure('Failed to create user', 'Gagal menambahkan user. Periksa daftar sebelum mencoba kembali.', $error);
        }
    }

    public function update(Request $request, string $id)
    {
        $user = $this->managedUser($id);
        $this->authorize('update', $user);
        if ($user->id === auth()->id()) {
            $errors = [];
            if ($request->input('role') !== 'superadmin') {
                $errors['role'] = 'Anda tidak dapat menurunkan role akun Anda sendiri.';
            }
            if ($request->input('department') !== 'umum') {
                $errors['department'] = 'Akun Anda harus tetap di departemen Umum agar akses pengelolaan tidak terputus.';
            }
            if ($errors) {
                throw ValidationException::withMessages($errors);
            }
        }
        $data = $this->validatedAccount($request, $user);
        try {
            DB::transaction(fn () => $user->update($data));
            Cache::forget('user_stats');
            Log::info('User updated', ['user_id' => $user->id, 'updated_by' => auth()->id()]);

            return $this->success('Data user berhasil diupdate');
        } catch (UniqueConstraintViolationException) {
            throw ValidationException::withMessages(['email' => 'Email sudah digunakan pengguna lain. Muat ulang daftar sebelum menyimpan.']);
        } catch (\Exception $error) {
            return $this->failure('Failed to update user', 'Gagal memperbarui user. Periksa daftar sebelum mencoba kembali.', $error);
        }
    }

    public function updatePassword(Request $request, string $id)
    {
        $user = $this->managedUser($id);
        $this->authorize('update', $user);
        $data = $request->validate(['password' => $this->passwordRules()], [
            'password.required' => 'Password wajib diisi', 'password.min' => 'Password minimal 8 karakter',
            'password.regex' => 'Password harus mengandung minimal 1 huruf besar, 1 huruf kecil, dan 1 angka',
        ]);
        try {
            $hash = Hash::make($data['password']);
            DB::transaction(fn () => $user->update(['password' => $hash]));
            Log::info('User password changed', ['user_id' => $user->id, 'changed_by' => auth()->id()]);

            return $this->success('Password berhasil diubah');
        } catch (\Exception $error) {
            return $this->failure('Failed to update password', 'Gagal mengubah password. Periksa hasil sebelum mencoba kembali.', $error);
        }
    }

    public function destroy(string $id)
    {
        $user = $this->managedUser($id);
        $this->authorize('delete', $user);
        try {
            DB::transaction(fn () => $user->delete());
            Cache::forget('user_stats');
            Log::warning('User deleted', ['user_id' => $user->id, 'deleted_by' => auth()->id()]);

            return $this->success('User berhasil dihapus');
        } catch (\Illuminate\Database\QueryException $error) {
            if (($error->errorInfo[0] ?? '') === '23000' && in_array((int) ($error->errorInfo[1] ?? 0), [1451, 19], true)) {
                return response()->json(['success' => false, 'message' => 'User tidak dapat dihapus karena masih memiliki data terkait.'], 422)
                    ->header('Cache-Control', 'private, no-store');
            }

            return $this->failure('Failed to delete user', 'Gagal menghapus user. Periksa daftar sebelum mencoba kembali.', $error);
        } catch (\Exception $error) {
            return $this->failure('Failed to delete user', 'Gagal menghapus user. Periksa daftar sebelum mencoba kembali.', $error);
        }
    }

    private function managedUser(string $id): User
    {
        abort_unless(filter_var($id, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]) !== false, 404);

        return User::findOrFail($id);
    }

    private function passwordRules(): array
    {
        return ['bail', 'required', 'string', 'min:8', 'max:255', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
            function (string $attribute, mixed $value, \Closure $fail): void {
                if (str_contains($value, "\0")) {
                    $fail('Password tidak boleh berisi karakter null.');
                }
                if (config('hashing.driver') === 'bcrypt' && strlen($value) > 72) {
                    $fail('Password maksimal 72 byte. Kurangi panjang password Anda.');
                }
            }];
    }

    private function validatedAccount(Request $request, ?User $user = null): array
    {
        if (is_string($request->input('email'))) {
            $request->merge(['email' => strtolower(trim($request->input('email')))]);
        }
        $rules = [
            'name' => ['required', 'string', 'max:255', 'min:3', 'regex:/^[\pL\s\-]+$/u'],
            'email' => ['required', 'email:rfc,dns', 'max:255', Rule::unique('users', 'email')->ignore($user?->id)],
            'role' => ['required', Rule::in(['user', 'superadmin', 'viewer'])],
            'department' => ['required', Rule::in(['umum', 'operasional'])],
            'buyer_name' => ['nullable', 'string', 'max:50', Rule::exists('master_buyer', 'nama')],
            'gender' => ['nullable', Rule::in(['male', 'female'])],
        ];
        if (! $user) {
            $rules['password'] = $this->passwordRules();
        }
        $data = $request->validate($rules, [
            'name.required' => 'Nama wajib diisi', 'name.min' => 'Nama minimal 3 karakter', 'name.regex' => 'Nama hanya boleh berisi huruf, spasi, dan tanda hubung',
            'email.required' => 'Email wajib diisi', 'email.email' => 'Format atau domain email tidak valid', 'email.unique' => 'Email sudah digunakan pengguna lain',
            'password.required' => 'Password wajib diisi', 'password.min' => 'Password minimal 8 karakter',
            'password.regex' => 'Password harus mengandung minimal 1 huruf besar, 1 huruf kecil, dan 1 angka',
        ]);
        $data['gender'] = $data['gender'] ?? null;
        $data['buyer_name'] = $data['buyer_name'] ?? null;

        return $data;
    }

    private function success(string $message)
    {
        return response()->json(['success' => true, 'message' => $message])->header('Cache-Control', 'private, no-store');
    }

    private function failure(string $action, string $message, \Exception $error)
    {
        Log::error($action, ['exception_type' => get_class($error), 'code' => (string) $error->getCode()]);

        return response()->json(['success' => false, 'message' => $message], 500)->header('Cache-Control', 'private, no-store');
    }

    /**
     * ✅ NEW: Toggle user status (activate/deactivate)
     */
    public function toggleStatus($id)
    {
        $user = User::findOrFail($id);
        $this->authorize('update', $user);

        // ✅ Prevent self-deactivation
        if ($user->id === auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak dapat menonaktifkan akun Anda sendiri',
            ], 422);
        }

        try {
            $newStatus = $user->is_active ? 0 : 1;

            $user->update(['is_active' => $newStatus]);

            Log::info('User status toggled', [
                'user_id' => $user->id,
                'new_status' => $newStatus ? 'active' : 'inactive',
                'changed_by' => auth()->user()->email,
            ]);

            return response()->json([
                'success' => true,
                'message' => $newStatus ? 'User berhasil diaktifkan' : 'User berhasil dinonaktifkan',
                'is_active' => $newStatus,
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to toggle user status: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal mengubah status user',
            ], 500);
        }
    }

    /**
     * ✅ NEW: Bulk delete users
     */
    public function bulkDelete(Request $request)
    {
        $this->authorize('delete', User::class);

        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:users,id',
        ]);

        // ✅ Prevent self-deletion
        if (in_array(auth()->id(), $validated['ids'])) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak dapat menghapus akun Anda sendiri',
            ], 422);
        }

        try {
            $deleted = DB::transaction(function () use ($validated) {
                return User::whereIn('id', $validated['ids'])->delete();
            });

            Cache::forget('user_stats');

            Log::warning('Bulk delete users', [
                'count' => $deleted,
                'deleted_by' => auth()->user()->email,
            ]);

            return response()->json([
                'success' => true,
                'message' => "{$deleted} user berhasil dihapus",
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to bulk delete users: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus user. Silakan coba lagi.',
            ], 500);
        }
    }

    public function export(Request $request)
    {
        // ✅ Security check
        $this->checkSuperadminUmum();

        $filters = UserDirectoryQuery::filters($request);
        $query = UserDirectoryQuery::apply($filters)
            ->select(['id', 'name', 'email', 'role', 'department', 'gender', 'buyer_name', 'last_seen_at', 'last_login_ip', 'last_seen_ip', 'created_at']);
        $maximumId = (clone $query)->max('id') ?? 0;
        $query->where('id', '<=', $maximumId);

        $filename = 'users_export_'.now()->format('Ymd_His').'.csv';

        return response()->streamDownload(function () use ($query) {
            $out = fopen('php://output', 'w');

            // UTF-8 BOM
            fprintf($out, chr(0xEF).chr(0xBB).chr(0xBF));

            // Header
            fputcsv($out, ['ID', 'Nama', 'Email', 'Role', 'Department', 'Gender', 'Buyer Terkait', 'Terakhir Online', 'IP Login Terakhir', 'IP Aktif Terakhir', 'Created At']);

            // Chunk for memory efficiency
            $query->chunkById(500, function ($users) use ($out) {
                foreach ($users as $user) {
                    fputcsv($out, \App\Support\Csv::row([
                        $user->id,
                        $user->name,
                        $user->email,
                        $user->role,
                        $user->department,
                        match ($user->gender) {
                            'male' => 'Laki-laki',
                            'female' => 'Perempuan',
                            default => 'Belum diisi',
                        },
                        $user->buyer_name,
                        $user->last_seen_at ? \Carbon\Carbon::parse($user->last_seen_at)->format('Y-m-d H:i:s') : 'Belum pernah',
                        $user->last_login_ip ?: '-',
                        $user->last_seen_ip ?: '-',
                        $user->created_at,
                    ]));
                }
            });

            fclose($out);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Cache-Control' => 'no-store, no-cache',
        ]);
    }

    private function checkSuperadminUmum()
    {
        if (! auth()->check()) {
            abort(401, 'Unauthorized');
        }

        $user = auth()->user();

        if ($user->role !== 'superadmin' || $user->department !== 'umum') {
            abort(403, 'Akses Ditolak. Hanya Superadmin Umum yang dapat mengakses halaman ini.');
        }
    }
}
