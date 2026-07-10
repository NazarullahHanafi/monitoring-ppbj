<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\MasterBuyer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

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

        // ✅ Query Builder untuk performa lebih baik
        $query = DB::table('users')
            ->select([
                'id',
                'name',
                'email',
                'role',
                'department',
                'buyer_name',
                'last_seen_at',
                'created_at',
                'updated_at'
            ]);

        // ✅ SEARCH filter
        if ($request->filled('search')) {
            $search = trim($request->search);
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        // ✅ DEPARTMENT filter
        if ($request->filled('department')) {
            $query->where('department', $request->department);
        }

        // ✅ ROLE filter
        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        // ✅ SORTING
        $sortBy = $request->get('sort', 'department');
        $sortDir = $request->get('direction', 'asc');

        $allowedSorts = ['name', 'email', 'department', 'role', 'created_at'];
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortDir);
        } else {
            $query->orderBy('department')->orderBy('name');
        }

        // ✅ PAGINATION
        $perPage = (int) $request->get('per_page', 25);
        $perPage = in_array($perPage, [10, 25, 50, 100]) ? $perPage : 25;

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
            fn() => MasterBuyer::orderBy('nama')->pluck('nama')->values()
        );

        return view('users.index', compact('users', 'stats', 'masterBuyers'));
    }

    /**
     * ✅ OPTIMIZED: Store new user with proper validation
     */
    public function store(Request $request)
    {
        // ✅ Security check
        $this->authorize('create', User::class);

        // ✅ VALIDATION dengan custom messages
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'min:3',
                'regex:/^[\pL\s\-]+$/u' // Only letters, spaces, hyphens
            ],
            'email' => [
                'required',
                'email:rfc,dns',
                'max:255',
                'unique:users,email'
            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/' // Min 1 uppercase, 1 lowercase, 1 number
            ],
            'role' => [
                'required',
                Rule::in(['user', 'superadmin', 'viewer'])
            ],
            'department' => [
                'required',
                Rule::in(['umum', 'operasional'])
            ],
            'buyer_name' => [
                'nullable',
                'string',
                'max:50',
                Rule::exists('master_buyer', 'nama')
            ],
        ], [
            'name.required' => 'Nama wajib diisi',
            'name.min' => 'Nama minimal 3 karakter',
            'name.regex' => 'Nama hanya boleh berisi huruf, spasi, dan tanda hubung',
            'email.required' => 'Email wajib diisi',
            'email.email' => 'Format email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            'password.required' => 'Password wajib diisi',
            'password.min' => 'Password minimal 8 karakter',
            'password.regex' => 'Password harus mengandung minimal 1 huruf besar, 1 huruf kecil, dan 1 angka',
        ]);

        try {
            // ✅ TRANSACTION untuk data integrity
            DB::transaction(function () use ($validated) {
                User::create([
                    'name' => $validated['name'],
                    'email' => strtolower($validated['email']), // ✅ Normalize email
                    'password' => Hash::make($validated['password']),
                    'role' => $validated['role'],
                    'department' => $validated['department'],
                    'buyer_name' => $validated['buyer_name'] ?? null,
                ]);
            });

            // ✅ Clear cache
            Cache::forget('user_stats');

            // ✅ Log activity
            Log::info('New user created', [
                'email' => $validated['email'],
                'created_by' => auth()->user()->email,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'User berhasil ditambahkan'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to create user: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan user. Silakan coba lagi.'
            ], 500);
        }
    }

    /**
     * ✅ OPTIMIZED: Update user data with proper validation
     */
    public function update(Request $request, $id)
    {
        // ✅ Find user
        $user = User::findOrFail($id);

        // ✅ Security check
        $this->authorize('update', $user);

        // ✅ Prevent self-demotion (superadmin tidak bisa demote diri sendiri)
        if ($user->id === auth()->id() && $request->role !== 'superadmin') {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak dapat mengubah role Anda sendiri'
            ], 422);
        }

        // ✅ VALIDATION
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'min:3',
                'regex:/^[\pL\s\-]+$/u'
            ],
            'email' => [
                'required',
                'email:rfc,dns',
                'max:255',
                Rule::unique('users')->ignore($user->id)
            ],
            'role' => [
                'required',
                Rule::in(['user', 'superadmin', 'viewer'])
            ],
            'department' => [
                'required',
                Rule::in(['umum', 'operasional'])
            ],
            'buyer_name' => [
                'nullable',
                'string',
                'max:50',
                Rule::exists('master_buyer', 'nama')
            ],
        ], [
            'name.required' => 'Nama wajib diisi',
            'name.min' => 'Nama minimal 3 karakter',
            'email.required' => 'Email wajib diisi',
            'email.unique' => 'Email sudah digunakan user lain',
        ]);

        try {
            DB::transaction(function () use ($user, $validated) {
                $user->update([
                    'name' => $validated['name'],
                    'email' => strtolower($validated['email']),
                    'role' => $validated['role'],
                    'department' => $validated['department'],
                    'buyer_name' => $validated['buyer_name'] ?? null,
                ]);
            });

            // ✅ Clear cache
            Cache::forget('user_stats');

            // ✅ Log activity
            Log::info('User updated', [
                'user_id' => $user->id,
                'updated_by' => auth()->user()->email,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data user berhasil diupdate'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to update user: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui user. Silakan coba lagi.'
            ], 500);
        }
    }

    /**
     * ✅ OPTIMIZED: Update password with security checks
     */
    public function updatePassword(Request $request, $id)
    {
        // ✅ Find user
        $user = User::findOrFail($id);

        // ✅ Security check
        $this->authorize('update', $user);

        // ✅ VALIDATION (tanpa 'confirmed')
        $validated = $request->validate([
            'password' => [
                'required',
                'string',
                'min:8',
                // ❌ REMOVE: 'confirmed'  <-- Ini yang bikin error!
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/'
            ],
        ], [
            'password.required' => 'Password wajib diisi',
            'password.min' => 'Password minimal 8 karakter',
            'password.regex' => 'Password harus mengandung minimal 1 huruf besar, 1 huruf kecil, dan 1 angka',
        ]);

        try {
            DB::transaction(function () use ($user, $validated) {
                $user->update([
                    'password' => Hash::make($validated['password']),
                ]);
            });

            // ✅ Log activity (JANGAN log password!)
            Log::info('User password changed', [
                'user_id' => $user->id,
                'changed_by' => auth()->user()->email,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Password berhasil diubah'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to update password: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal mengubah password. Silakan coba lagi.'
            ], 500);
        }
    }

    /**
     * ✅ NEW: Delete user (soft delete recommended)
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $this->authorize('delete', $user);

        // Cegah hapus diri sendiri
        if ($user->id === auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak dapat menghapus akun Anda sendiri'
            ], 422);
        }

        try {
            // ✅ LANGSUNG HAPUS DI DALAM TRANSACTION
            DB::transaction(function () use ($user) {
                $user->delete();
            });

            Cache::forget('user_stats');
            Log::warning('User deleted', [
                'user_id' => $user->id,
                'deleted_by' => auth()->user()->email,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'User berhasil dihapus'
            ]);

        } catch (\Illuminate\Database\QueryException $e) {
            // ✅ TANGKAP ERROR SPESIFIK DATABASE (SQLSTATE 23000 / Kode 1451)
            // Kode 1451 = Tidak bisa hapus karena jadi Parent di tabel lain (Foreign Key)
            if ($e->errorInfo[0] == '23000' && $e->errorInfo[1] == 1451) {
                return response()->json([
                    'success' => false,
                    'message' => 'User tidak dapat dihapus karena masih memiliki data terkait di sistem lain (misal: TOR/PRS atau PPBJ).'
                ], 422);
            }

            // Kalau error lain, log dan tampilkan pesan umum
            Log::error('Failed to delete user: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan teknis saat menghapus data.'
            ], 500);
        }
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
                'message' => 'Anda tidak dapat menonaktifkan akun Anda sendiri'
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
                'is_active' => $newStatus
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to toggle user status: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal mengubah status user'
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
                'message' => 'Anda tidak dapat menghapus akun Anda sendiri'
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
                'message' => "{$deleted} user berhasil dihapus"
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to bulk delete users: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus user. Silakan coba lagi.'
            ], 500);
        }
    }
    public function export(Request $request)
    {
        // ✅ Security check
        $this->checkSuperadminUmum();

        $filename = 'users_export_' . now()->format('Ymd_His') . '.csv';

        return response()->streamDownload(function () use ($request) {
            $out = fopen('php://output', 'w');

            // UTF-8 BOM
            fprintf($out, chr(0xEF) . chr(0xBB) . chr(0xBF));

            // Header
            fputcsv($out, ['ID', 'Nama', 'Email', 'Role', 'Department', 'Buyer Terkait', 'Terakhir Online', 'Created At']);

            // Query
            $query = DB::table('users')
                ->select(['id', 'name', 'email', 'role', 'department', 'buyer_name', 'last_seen_at', 'created_at']);

            // Apply filters
            if ($request->filled('department')) {
                $query->where('department', $request->department);
            }

            if ($request->filled('role')) {
                $query->where('role', $request->role);
            }

            // Chunk for memory efficiency
            $query->orderBy('id')->chunk(500, function ($users) use ($out) {
                foreach ($users as $user) {
                    fputcsv($out, \App\Support\Csv::row([
                        $user->id,
                        $user->name,
                        $user->email,
                        $user->role,
                        $user->department,
                        $user->buyer_name,
                        $user->last_seen_at ? \Carbon\Carbon::parse($user->last_seen_at)->format('Y-m-d H:i:s') : 'Belum pernah',
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
        if (!auth()->check()) {
            abort(401, 'Unauthorized');
        }

        $user = auth()->user();

        if ($user->role !== 'superadmin' || $user->department !== 'umum') {
            abort(403, 'Akses Ditolak. Hanya Superadmin Umum yang dapat mengakses halaman ini.');
        }
    }
}
