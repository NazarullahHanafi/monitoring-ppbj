<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\MasterPortofolio;
use App\Models\Ppbj;
use App\Models\SpPortfolioFieldMap;
use App\Models\Torpr;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class SpPortfolioFieldMapController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->validate(['q' => ['nullable', 'string', 'max:150'], 'page' => ['nullable', 'integer', 'min:1'], 'include_options' => ['nullable', 'boolean']]);
        $rows = SpPortfolioFieldMap::with('field:id,nama,type,is_active')
            ->when(filled($data['q'] ?? ''), fn ($q) => $q->where('portfolio', 'like', '%'.addcslashes($data['q'], '%_\\').'%'))
            ->orderBy('portfolio')->paginate(12);

        $payload = ['rows' => $rows->map(fn ($row) => $this->present($row)), 'page' => $rows->currentPage(), 'last_page' => $rows->lastPage()];
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

    public function save(Request $request, ?int $id = null)
    {
        abort_if($request->user()->isReadOnly(), 403);
        if (is_string($request->input('portfolio'))) {
            $request->merge(['portfolio' => trim($request->input('portfolio'))]);
        }
        $data = $request->validate(['portfolio' => ['required', 'string', 'max:150'], 'field_id' => ['required', 'integer',
            Rule::exists('sp_master_options', 'id')->where(fn ($q) => $q->where('type', 'bidang_pr')->where('is_active', true))],
            'is_active' => ['required', 'boolean'], 'version' => [$id ? 'required' : 'nullable', 'string', 'size:64']]);
        try {
            return DB::transaction(function () use ($data, $id, $request) {
                $row = $id ? SpPortfolioFieldMap::whereKey($id)->lockForUpdate()->firstOrFail() : new SpPortfolioFieldMap;
                if ($id && ! hash_equals($row->version(), $data['version'])) {
                    return response()->json(['message' => 'Pemetaan berubah. Muat ulang daftar sebelum menyimpan.'], 409);
                }
                validator(['key' => SpPortfolioFieldMap::key($data['portfolio'])], ['key' => ['max:150', Rule::unique('sp_portfolio_field_maps', 'portfolio_key')->ignore($id)]])->validate();
                $before = $row->exists ? $row->only(['portfolio', 'field_id', 'is_active']) : null;
                $row->fill(['portfolio' => $data['portfolio'], 'portfolio_key' => SpPortfolioFieldMap::key($data['portfolio']),
                    'field_id' => $data['field_id'], 'is_active' => $data['is_active'], 'updated_by_user_id' => $request->user()->id])->save();
                ActivityLog::create(['user_id' => $request->user()->id, 'model_type' => SpPortfolioFieldMap::class, 'model_id' => $row->id,
                    'action' => $id ? 'updated' : 'created', 'description' => 'Pemetaan portofolio ke bidang pemilik PR diperbarui',
                    'changes' => ['before' => $before, 'after' => $row->only(['portfolio', 'field_id', 'is_active'])]]);

                return response()->json(['message' => 'Pemetaan disimpan. Cetak berikutnya memakai pemetaan aktif ini.', 'row' => $this->present($row->load('field'))], $id ? 200 : 201);
            });
        } catch (UniqueConstraintViolationException $exception) {
            return response()->json(['message' => 'Portofolio sudah dipetakan oleh pengguna lain. Muat ulang daftar.'], 409);
        }
    }

    private function present(SpPortfolioFieldMap $row): array
    {
        return ['id' => $row->id, 'portfolio' => $row->portfolio, 'field_id' => $row->field_id, 'field_name' => $row->field?->nama,
            'is_active' => $row->is_active, 'version' => $row->version()];
    }
}
