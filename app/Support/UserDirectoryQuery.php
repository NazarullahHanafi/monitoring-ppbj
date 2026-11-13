<?php

namespace App\Support;

use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

final class UserDirectoryQuery
{
    public static function filters(Request $request): array
    {
        return $request->validate([
            'search' => ['nullable', 'string', 'max:160'],
            'department' => ['nullable', Rule::in(['umum', 'operasional'])],
            'role' => ['nullable', Rule::in(['superadmin', 'user', 'viewer'])],
            'sort' => ['nullable', Rule::in(['name', 'email', 'department', 'role', 'created_at'])],
            'direction' => ['nullable', Rule::in(['asc', 'desc'])],
            'per_page' => ['nullable', 'integer', Rule::in([10, 25, 50, 100])],
            'page' => ['nullable', 'integer', 'min:1', 'max:1000000'],
        ]);
    }

    public static function apply(array $filters): Builder
    {
        $query = DB::table('users');
        $search = trim($filters['search'] ?? '');
        if ($search !== '') {
            $pattern = '%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $search).'%';
            $query->where(fn ($match) => $match
                ->whereRaw("name LIKE ? ESCAPE '!'", [$pattern])
                ->orWhereRaw("email LIKE ? ESCAPE '!'", [$pattern]));
        }
        foreach (['department', 'role'] as $field) {
            if (($filters[$field] ?? '') !== '' && ($filters[$field] ?? null) !== null) {
                $query->where($field, $filters[$field]);
            }
        }

        return $query;
    }
}
