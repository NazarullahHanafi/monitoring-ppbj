<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\MasterPortofolio;
use App\Models\Ppbj;
use App\Models\SpMasterOption;
use App\Models\SpPortfolioFieldMap;
use App\Models\Torpr;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class SpPortfolioFieldMapController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->validate(['q' => ['nullable', 'string', 'max:150'], 'page' => ['nullable', 'integer', 'min:1', 'max:100000'], 'include_options' => ['nullable', 'boolean']]);
        $term = trim($data['q'] ?? '');
        $pattern = '%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $term).'%';
        $rows = SpPortfolioFieldMap::with('field:id,nama,type,is_active')
            ->when($term !== '', fn ($q) => $q->whereRaw("portfolio LIKE ? ESCAPE '!'", [$pattern]))
            ->orderBy('portfolio')->orderBy('id')->paginate(12, ['id', 'portfolio', 'portfolio_key', 'field_id', 'is_active', 'updated_at']);

        $payload = ['rows' => $rows->map(fn ($row) => $this->present($row)), 'page' => $rows->currentPage(), 'last_page' => $rows->lastPage(), 'total' => $rows->total()];
        if ($request->boolean('include_options')) {
            $payload += $this->portfolioOptions();
        }

        return response()->json($payload)
            ->header('Cache-Control', 'private, no-store');
    }

    private function portfolioOptions(): array
    {
        // Loaded once when this dialog opens, never while typing or on other menus.
        // Separate bounded queries also avoid incompatible collations on legacy DBs.
        $values = collect();
        $truncated = false;
        foreach ([[MasterPortofolio::class, 'nama'], [Ppbj::class, 'portofolio'], [Torpr::class, 'portofolio'], [SpPortfolioFieldMap::class, 'portfolio']] as [$model, $column]) {
            $names = $model::query()->whereNotNull($column)->where($column, '<>', '')
                ->distinct()->orderBy($column)->limit(251)->pluck($column);
            $truncated = $truncated || $names->count() > 250;
            $values = $values->concat($names->take(250));
        }
        $values = $values->map(fn ($name) => trim((string) $name))
            ->filter(fn ($name) => $name !== '' && mb_strlen($name) <= 150)
            ->unique(fn ($name) => SpPortfolioFieldMap::key($name))->sort()->values();

        return ['portfolio_options' => $values->take(500)->values()->all(), 'options_truncated' => $truncated || $values->count() > 500];
    }

    public function save(Request $request, ?string $id = null)
    {
        abort_if($request->user()->isReadOnly(), 403);
        if ($id !== null) {
            abort_if(filter_var($id, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]) === false, 404);
        }
        if (is_string($request->input('portfolio'))) {
            $request->merge(['portfolio' => trim($request->input('portfolio'))]);
        }
        $data = $request->validate(['portfolio' => ['bail', 'required', 'string', 'max:150'], 'field_id' => ['bail', 'required', 'integer', 'min:1'],
            'is_active' => ['required', 'boolean'], 'version' => [$id ? 'required' : 'nullable', 'string', 'size:64']]);
        try {
            return DB::transaction(function () use ($data, $id, $request) {
                $field = SpMasterOption::whereKey($data['field_id'])->lockForUpdate()->first(['id', 'nama', 'type', 'is_active']);
                if (! $field || $field->type !== 'bidang_pr' || ! $field->is_active) {
                    throw ValidationException::withMessages(['field_id' => 'Bidang PR sudah berubah atau tidak aktif. Pilih kembali bidang aktif.']);
                }
                $row = $id ? SpPortfolioFieldMap::whereKey($id)->lockForUpdate()->firstOrFail() : new SpPortfolioFieldMap;
                if ($id && ! hash_equals($row->version(), $data['version'])) {
                    return response()->json(['message' => 'Pemetaan berubah. Muat ulang daftar sebelum menyimpan.'], 409)->header('Cache-Control', 'private, no-store');
                }
                $key = SpPortfolioFieldMap::key($data['portfolio']);
                validator(['portfolio' => $key], ['portfolio' => ['required', 'max:150', Rule::unique('sp_portfolio_field_maps', 'portfolio_key')->ignore($id)]], [
                    'portfolio.unique' => 'Portofolio sudah dipetakan. Gunakan Edit pemetaan pada data tersebut.',
                    'portfolio.required' => 'Nama portofolio perlu diisi dengan teks yang bermakna.',
                ])->validate();
                $before = $row->exists ? $row->only(['portfolio', 'field_id', 'is_active']) : null;
                $row->fill(['portfolio' => $data['portfolio'], 'portfolio_key' => $key,
                    'field_id' => (int) $data['field_id'], 'is_active' => (bool) $data['is_active']]);
                $changed = ! $row->exists || $row->isDirty();
                if ($changed) {
                    $row->updated_by_user_id = $request->user()->id;
                    $row->save();
                    ActivityLog::create(['user_id' => $request->user()->id, 'model_type' => SpPortfolioFieldMap::class, 'model_id' => $row->id,
                        'action' => $id ? 'updated' : 'created', 'description' => 'Pemetaan portofolio ke bidang pemilik PR diperbarui',
                        'changes' => ['before' => $before, 'after' => $row->only(['portfolio', 'field_id', 'is_active'])]]);
                }

                return response()->json(['message' => $changed ? 'Pemetaan disimpan. Cetak berikutnya memakai pemetaan aktif ini.' : 'Tidak ada perubahan pada pemetaan.',
                    'changed' => $changed, 'row' => $this->present($row->setRelation('field', $field))], $id ? 200 : 201)->header('Cache-Control', 'private, no-store');
            });
        } catch (UniqueConstraintViolationException $exception) {
            return response()->json(['message' => 'Portofolio sudah dipetakan oleh pengguna lain. Muat ulang daftar.'], 409)->header('Cache-Control', 'private, no-store');
        }
    }

    private function present(SpPortfolioFieldMap $row): array
    {
        return ['id' => $row->id, 'portfolio' => $row->portfolio, 'field_id' => $row->field_id, 'field_name' => $row->field?->nama,
            'field_available' => $row->field?->type === 'bidang_pr' && (bool) $row->field?->is_active,
            'is_active' => $row->is_active, 'version' => $row->version()];
    }
}
