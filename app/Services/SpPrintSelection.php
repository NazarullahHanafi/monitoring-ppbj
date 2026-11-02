<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\Sp;
use App\Models\SpPortfolioFieldMap;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class SpPrintSelection
{
    public function confirm(Request $request, Sp $sp): array
    {
        abort_unless($request->user()?->department === 'umum' && ! $request->user()->isReadOnly(), 403);
        $request->validate(['print_basis' => ['required', 'string', 'size:64']]);

        return DB::transaction(function () use ($request, $sp) {
            $locked = Sp::whereKey($sp->id)->lockForUpdate()->firstOrFail();
            $policy = app(SpPrintPolicy::class);
            $context = $policy->context($locked);
            // Existing renderers validate query parameters; adapt the POST body
            // internally without ever permitting a GET to write shared mappings.
            $selection = $request->duplicate($request->all());
            $selection->setUserResolver($request->getUserResolver());
            $selected = $policy->validate($selection, $context, true);
            $learned = false;
            if ($selected['learn_portfolio']) {
                $portfolio = $context['portfolios'][0];
                $learned = DB::table('sp_portfolio_field_maps')->insertOrIgnore([
                    'portfolio' => $portfolio, 'portfolio_key' => SpPortfolioFieldMap::key($portfolio),
                    'field_id' => $request->input('field_id'), 'is_active' => true,
                    'updated_by_user_id' => $request->user()->id, 'created_at' => now(), 'updated_at' => now(),
                ]) === 1;
                $map = SpPortfolioFieldMap::where('portfolio_key', SpPortfolioFieldMap::key($portfolio))->lockForUpdate()->firstOrFail();
                if (! $map->is_active || (int) $map->field_id !== (int) $request->input('field_id')) {
                    throw ValidationException::withMessages(['print_basis' => 'Portofolio ini baru dipetakan oleh pengguna lain. Periksa bidang terbaru sebelum melanjutkan.']);
                }
                if ($learned) {
                    ActivityLog::create(['user_id' => $request->user()->id, 'model_type' => SpPortfolioFieldMap::class, 'model_id' => $map->id,
                        'action' => 'created', 'description' => 'Pilihan bidang diingat dari konfirmasi cetak SP',
                        'changes' => ['portfolio' => $portfolio, 'field_id' => $map->field_id, 'sp_id' => $sp->id]]);
                }
                $context = $policy->context($locked);
                $selection->query->remove('learn_portfolio');
                $selection->query->set('print_basis', $context['fingerprint']);
                $selected = $policy->validate($selection, $context);
            }

            return $context + ['selection' => $selected['query'], 'mapping_saved' => $learned, 'can_manage' => true];
        }, 3);
    }
}
