<?php

namespace App\Services;

use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\SpMasterOption;
use App\Models\SpPortfolioFieldMap;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SpPrintPolicy
{
    public function context(Sp $sp): array
    {
        // Bound legacy oversized packages as well as the normal 20-PR UI limit.
        $prs = $sp->ppbjs()->orderBy('ppbj.id')->limit(101)->get(['ppbj.id', 'ppbj.ppbj_no', 'ppbj.portofolio', 'ppbj.total_sebelum_ppn', 'ppbj.updated_at']);
        if ($prs->isEmpty() && filled($sp->nomor_pr)) {
            $prs = Ppbj::where('ppbj_no', $sp->nomor_pr)->get(['id', 'ppbj_no', 'portofolio', 'total_sebelum_ppn', 'updated_at']);
        }
        $portfolios = $prs->pluck('portofolio')->map(fn ($value) => SpPortfolioFieldMap::key((string) $value))->unique();
        $maps = SpPortfolioFieldMap::with('field:id,nama,type,is_active')->whereIn('portfolio_key', $portfolios)->where('is_active', true)->get()->keyBy('portfolio_key');
        $fields = [];
        $diagnostics = [];
        foreach ($portfolios as $portfolio) {
            $map = $maps->get($portfolio);
            if ($map?->field?->is_active && $map->field->type === 'bidang_pr') {
                $fields[$map->field_id] = $map->field->nama;
            } else {
                $diagnostics[] = $portfolio === '' ? 'Ada PR tanpa portofolio.' : 'Belum ada pemetaan aktif: '.$portfolio;
            }
        }
        if ($prs->isEmpty()) {
            $diagnostics[] = 'PR/PPBJ belum terhubung; pilih bidang secara manual.';
        }
        if ($prs->count() > 100) {
            $diagnostics[] = 'Paket lama melebihi 100 PR. Konfirmasi bidang manual; rincian dibatasi agar tetap ringan.';
        }
        if (count($fields) > 1) {
            $diagnostics[] = 'PR gabungan berasal dari bidang berbeda. Tentukan bidang penanggung jawab secara manual.';
        }
        $fieldId = count($fields) === 1 && ! $diagnostics ? (int) array_key_first($fields) : null;
        $amount = (string) $sp->nilai_sp;
        $threshold = (int) config('spph.signing.threshold');
        $pair = config('spph.signing.'.((float) $amount >= $threshold ? 'at_or_above' : 'below'));
        $masters = SpMasterOption::active()->whereIn('type', ['penandatangan_sci', 'jabatan_sci'])->whereIn('nama', [$pair['name'], $pair['title']])->get(['id', 'type', 'nama']);
        $name = $masters->first(fn ($row) => $row->type === 'penandatangan_sci' && strcasecmp($row->nama, $pair['name']) === 0);
        $title = $masters->first(fn ($row) => $row->type === 'jabatan_sci' && strcasecmp($row->nama, $pair['title']) === 0);
        $errors = [];
        if ((float) $amount <= 0) {
            $errors[] = 'Nilai SP belum valid. Isi nilai SP terlebih dahulu; sistem tidak memakai nilai PR sebagai pengganti.';
        }
        if (! $name || ! $title) {
            $errors[] = 'Master rekomendasi SCI belum aktif/lengkap. Periksa master atau gunakan mode manual dengan pilihan aktif.';
        }

        return ['module' => 'sp', 'number' => $sp->nomor_sp, 'amount' => $amount, 'amount_valid' => (float) $amount > 0,
            'pr_count' => $prs->count(), 'prs' => $prs->take(20)->map(fn ($pr) => ['number' => $pr->ppbj_no, 'amount' => $pr->total_sebelum_ppn, 'portfolio' => $pr->portofolio])->all(), 'truncated' => $prs->count() > 20,
            'name' => $name?->nama ?: $pair['name'], 'title' => $title?->nama ?: $pair['title'], 'name_id' => $name?->id, 'title_id' => $title?->id,
            'threshold' => $threshold, 'basis' => 'Dasar penandatangan: nilai SP tersimpan, bukan total PR atau nilai tambah PPN.',
            'rule' => ((float) $amount >= $threshold ? 'Mulai dari Rp' : 'Di bawah Rp').number_format($threshold, 0, ',', '.'),
            'rules' => [['label' => 'Di bawah', ...config('spph.signing.below')], ['label' => 'Mulai dari', ...config('spph.signing.at_or_above')]],
            'ready' => ! $errors, 'errors' => $errors, 'owner_field_id' => $fieldId, 'owner_field_name' => $fieldId ? $fields[$fieldId] : null,
            'owner_diagnostics' => $diagnostics, 'portfolios' => $portfolios->filter()->values()->all(), 'vendor' => $sp->nama_vendor,
            'checked_at' => now()->format('d M Y H:i:s').' WIB', 'ppbj_url' => route('ppbj.index', ['search' => $prs->first()?->ppbj_no]),
            'fingerprint' => hash('sha256', json_encode([$sp->getAttributes(), $prs->toArray(), $maps->map(fn ($map) => [$map->version(), $map->field?->nama, $map->field?->is_active])->all(), $name?->id, $title?->id, config('spph.signing')]))];
    }

    public function validate(Request $request, array $context): array
    {
        $selected = app(SpphPrintPolicy::class)->validate($request, $context);
        $data = validator($request->query(), ['field_id' => ['required', 'integer', 'min:1'], 'field_reason' => ['nullable', 'string', 'max:500']])->validate();
        $field = SpMasterOption::active()->where('type', 'bidang_pr')->find($data['field_id']);
        if (! $field) {
            throw ValidationException::withMessages(['field_id' => 'Pilih bidang pemilik PR dari master aktif.']);
        }
        $manual = $context['owner_field_id'] !== $field->id;
        if ($manual && mb_strlen(trim($data['field_reason'] ?? '')) < 10) {
            throw ValidationException::withMessages(['field_reason' => 'Jelaskan pilihan bidang manual minimal 10 karakter.']);
        }
        $selected['field_name'] = $field->nama;
        $selected['field_manual'] = $manual;
        $selected['field_reason'] = trim($data['field_reason'] ?? '');
        $selected['query'] += ['field_id' => $field->id, 'field_reason' => $selected['field_reason']];

        return $selected;
    }
}
