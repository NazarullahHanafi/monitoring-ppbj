<?php

namespace App\Http\Controllers;

use App\Support\ProcurementWorkspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ProcurementWorkspaceController extends Controller
{
    public function save(Request $request, string $page)
    {
        abort_unless(isset(ProcurementWorkspace::COLUMNS[$page]) && $request->user()->department === 'umum', 403);
        $request->validate([
            'user_id' => 'prohibited', 'version' => 'required|integer|min:0',
            'action' => ['required', Rule::in(['layout', 'favorite_save', 'favorite_delete'])],
            'name' => 'required_if:action,favorite_save|string|max:50',
            'favorite_id' => 'required_if:action,favorite_delete|uuid',
            'filters' => 'present_if:action,favorite_save|array|max:20',
            'layout' => 'required_if:action,layout|array:visible,order,density',
            'layout.visible' => 'required_if:action,layout|array|min:2|max:10',
            'layout.visible.*' => ['string', 'distinct', Rule::in(array_keys(ProcurementWorkspace::COLUMNS[$page]))],
            'layout.order' => 'required_if:action,layout|array|size:'.count(ProcurementWorkspace::COLUMNS[$page]),
            'layout.order.*' => ['string', 'distinct', Rule::in(array_keys(ProcurementWorkspace::COLUMNS[$page]))],
            'layout.density' => ['required_if:action,layout', Rule::in(['comfortable', 'compact'])],
        ]);
        if ($request->action === 'layout' && array_diff(['number', 'actions'], $request->input('layout.visible', []))) {
            throw ValidationException::withMessages(['layout' => 'Nomor dokumen dan aksi harus tetap terlihat.']);
        }
        $filters = [];
        if ($request->action === 'favorite_save') {
            foreach ($request->input('filters', []) as $key => $value) {
                if (! in_array($key, ProcurementWorkspace::FILTERS[$page], true)) {
                    throw ValidationException::withMessages(['filters' => 'Filter tidak didukung. Terapkan filter dari halaman ini dahulu.']);
                }
                $values = is_array($value) ? $value : [$value];
                $arrayKeys = ['amount_fields', 'portofolio', 'buyer', 'penyedia_eksternal', 'general_registration', 'status_sla', 'progress'];
                if ((is_array($value) && ($page !== 'ppbj' || ! in_array($key, $arrayKeys, true)))
                    || count($values) > 50 || collect($values)->contains(fn ($part) => ! is_string($part) || mb_strlen($part) > 5200)) {
                    throw ValidationException::withMessages(['filters' => 'Pilihan filter tidak valid.']);
                }
                $filters[$key] = is_array($value) ? array_values(array_unique($values)) : $value;
            }
            $check = Request::create('/'.$page, 'GET', $filters);
            if ($page === 'ppbj') {
                $check->validate(['search' => 'nullable|string|max:255', 'amount' => 'nullable|string|max:150', 'date_type' => 'nullable|in:daily,monthly,yearly,range',
                    'date_day' => 'nullable|date_format:Y-m-d', 'date_month' => 'nullable|date_format:Y-m', 'date_year' => 'nullable|integer|between:1900,2200',
                    'date_start' => 'nullable|date_format:Y-m-d', 'date_end' => 'nullable|date_format:Y-m-d', 'per_page' => 'nullable|integer|in:10,25,50,100']);
                \App\Support\PpbjListFilters::money($check);
            } else {
                $check->validate(['search' => 'nullable|string|max:160', 'pic' => 'nullable|string|max:100', 'vendor' => 'nullable|string|max:255',
                    'dari' => 'nullable|date_format:Y-m-d', 'sampai' => 'nullable|date_format:Y-m-d', 'mode' => 'nullable|in:oracle,auto']);
            }
            if (strlen(json_encode($filters)) > 8192 || trim($request->name) === '') {
                throw ValidationException::withMessages(['filters' => 'Isi nama dan gunakan kombinasi filter yang lebih ringkas (maksimal 8 KB).']);
            }
        }
        $result = DB::transaction(function () use ($request, $page, $filters) {
            DB::table('user_table_preferences')->insertOrIgnore([
                'user_id' => $request->user()->id, 'page' => $page, 'settings' => json_encode(ProcurementWorkspace::defaults($page)),
                'version' => 0, 'created_at' => now(), 'updated_at' => now(),
            ]);
            $row = DB::table('user_table_preferences')->where('user_id', $request->user()->id)->where('page', $page)->lockForUpdate()->first();
            $settings = json_decode($row->settings, true);
            if ((int) $row->version !== (int) $request->version) {
                return ['conflict' => true, 'version' => (int) $row->version, 'settings' => $settings];
            }
            if ($request->action === 'layout') {
                $settings['layout'] = $request->input('layout');
            } elseif ($request->action === 'favorite_save') {
                $favorites = collect($settings['favorites']);
                $name = trim($request->name);
                $existing = $favorites->first(fn ($favorite) => mb_strtolower($favorite['name']) === mb_strtolower($name));
                if (! $existing && $favorites->count() >= 10) {
                    throw ValidationException::withMessages(['name' => 'Maksimal 10 filter favorit per halaman. Hapus satu dahulu.']);
                }
                $settings['favorites'] = $favorites->reject(fn ($favorite) => $existing && $favorite['id'] === $existing['id'])
                    ->push(['id' => $existing['id'] ?? (string) Str::uuid(), 'name' => $name, 'filters' => $filters])->values()->all();
            } else {
                $settings['favorites'] = collect($settings['favorites'])->reject(fn ($favorite) => $favorite['id'] === $request->favorite_id)->values()->all();
            }
            DB::table('user_table_preferences')->where('id', $row->id)->update([
                'settings' => json_encode($settings), 'version' => $row->version + 1, 'updated_at' => now(),
            ]);

            return ['conflict' => false, 'version' => $row->version + 1, 'settings' => $settings];
        }, 3);
        Cache::forget(ProcurementWorkspace::cacheKey($request->user()->id, $page));

        return response()->json($result + ['message' => $result['conflict'] ? 'Preferensi berubah dari tab/perangkat lain. Pilihan terbaru dimuat; silakan ulangi tindakan.' : 'Preferensi pribadi disimpan.'], $result['conflict'] ? 409 : 200)
            ->header('Cache-Control', 'private, no-store');
    }
}
