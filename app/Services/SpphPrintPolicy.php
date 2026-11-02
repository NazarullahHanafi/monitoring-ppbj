<?php

namespace App\Services;

use App\Models\Ppbj;
use App\Models\SpMasterOption;
use App\Models\Spph;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SpphPrintPolicy
{
    public function context(Spph $spph): array
    {
        // Aggregate in SQL DECIMAL, not rounded per-row display values. The detail
        // list is bounded independently, so a large package does not inflate HTML.
        $query = $spph->ppbjs()->getQuery()->toBase()->reorder();
        $aggregate = fn ($q) => (clone $q)->selectRaw('COUNT(*) AS pr_count, COALESCE(SUM(ppbj.total_sebelum_ppn), 0) AS amount, SUM(CASE WHEN ppbj.total_sebelum_ppn IS NULL OR ppbj.total_sebelum_ppn <= 0 THEN 1 ELSE 0 END) AS invalid_count')->first();
        $totals = $aggregate($query);
        if ((int) $totals->pr_count === 0 && filled($spph->nomor_pr)) {
            $query = Ppbj::where('ppbj_no', $spph->nomor_pr)->toBase();
            $totals = $aggregate($query);
        }
        $rows = (clone $query)->select(['ppbj.id', 'ppbj.ppbj_no', 'ppbj.total_sebelum_ppn', 'ppbj.updated_at'])
            ->orderBy('ppbj.id')->limit(21)->get();
        $amount = (string) $totals->amount;
        $count = (int) $totals->pr_count;
        $threshold = (int) config('spph.signing.threshold');
        $bucket = (float) $amount >= $threshold ? 'at_or_above' : 'below';
        $pair = config('spph.signing.'.$bucket);
        // Read the four small master entries fresh when printing, so a disabled
        // official cannot remain printable because of a cached dropdown list.
        $masters = SpMasterOption::active()->whereIn('type', ['penandatangan_sci', 'jabatan_sci'])
            ->whereIn('nama', [$pair['name'], $pair['title']])->get(['id', 'type', 'nama']);
        $find = fn ($type, $name) => $masters->first(fn ($row) => $row->type === $type && strcasecmp(trim($row->nama), $name) === 0)?->nama;
        $name = $find('penandatangan_sci', $pair['name']);
        $title = $find('jabatan_sci', $pair['title']);
        $errors = [];
        if ($count === 0) {
            $errors[] = 'Belum ada PR/PPBJ terhubung yang dapat diperiksa. Hubungkan nomor PR ke data Management PPBJ terlebih dahulu.';
        } elseif ((int) $totals->invalid_count > 0) {
            $errors[] = 'Ada nilai PR kosong, nol, atau negatif. Lengkapi nilai seluruh PR/PPBJ sebelum mencetak.';
        }
        if (! $name || ! $title) {
            $errors[] = 'Master aktif belum lengkap untuk '.$pair['name'].' — '.$pair['title'].'. Minta petugas berwenang memeriksa Master Kontrak SP.';
        }
        $fingerprint = hash('sha256', json_encode([
            config('spph.signing'), $spph->id, $spph->getRawOriginal('updated_at'),
            $amount, $count, (int) $totals->invalid_count, $rows->toArray(), $name, $title,
        ]));

        return [
            'number' => $spph->nomor_spph, 'amount' => $amount, 'pr_count' => $count, 'threshold' => $threshold,
            'amount_valid' => $count > 0 && (int) $totals->invalid_count === 0,
            'basis' => 'Total nilai PR/PPBJ sebelum PPN; bukan nilai penawaran vendor atau nilai SP.',
            'rule' => $bucket === 'below' ? 'Di bawah Rp'.number_format($threshold, 0, ',', '.') : 'Rp'.number_format($threshold, 0, ',', '.').' ke atas (termasuk nilai tepat batas)',
            'name' => $name ?: $pair['name'], 'title' => $title ?: $pair['title'],
            'name_id' => $masters->first(fn ($row) => $row->type === 'penandatangan_sci' && $row->nama === $name)?->id,
            'title_id' => $masters->first(fn ($row) => $row->type === 'jabatan_sci' && $row->nama === $title)?->id,
            'rules' => [
                ['label' => 'Di bawah', 'name' => config('spph.signing.below.name'), 'title' => config('spph.signing.below.title')],
                ['label' => 'Mulai dari', 'name' => config('spph.signing.at_or_above.name'), 'title' => config('spph.signing.at_or_above.title')],
            ],
            'ready' => $errors === [], 'errors' => $errors, 'fingerprint' => $fingerprint,
            'prs' => $rows->take(20)->map(fn ($row) => ['number' => $row->ppbj_no, 'amount' => $row->total_sebelum_ppn])->values()->all(),
            'truncated' => $count > 20, 'checked_at' => now()->format('d M Y H:i:s').' WIB',
            'ppbj_url' => route('ppbj.index', ['search' => $rows->first()?->ppbj_no ?: $spph->nomor_pr]),
            'master_url' => route('sp-master-options.index', ['type' => 'penandatangan_sci']),
        ];
    }

    public function validate(Request $request, array $context): array
    {
        $mode = $request->query('signing_mode', 'auto');
        if (! in_array($mode, ['auto', 'manual'], true)) {
            throw ValidationException::withMessages(['signing_mode' => 'Mode penandatangan tidak dikenali.']);
        }
        if (($mode === 'auto' && ! $context['ready']) || ! $context['amount_valid']) {
            throw ValidationException::withMessages(['penandatangan' => implode(' ', $context['errors'])]);
        }
        $fingerprint = $request->query('print_basis');
        if ($fingerprint !== null && (! is_string($fingerprint) || ! hash_equals($context['fingerprint'], $fingerprint))) {
            throw ValidationException::withMessages(['print_basis' => 'Data nilai/master berubah. Buka kembali konfirmasi cetak agar rekomendasi diperbarui.']);
        }
        if ($mode === 'manual') {
            abort_unless($request->user()?->department === 'umum', 403);
            $data = validator(array_replace($request->query(), ['manual_reason' => is_string($request->query('manual_reason')) ? trim($request->query('manual_reason')) : $request->query('manual_reason')]), [
                'signer_id' => ['required', 'integer', 'min:1'],
                'title_id' => ['required', 'integer', 'min:1'],
                'manual_reason' => ['required', 'string', 'min:10', 'max:500'],
            ])->validate();
            $chosen = SpMasterOption::active()->whereIn('id', [$data['signer_id'], $data['title_id']])->get(['id', 'type', 'nama']);
            $signer = $chosen->first(fn ($row) => $row->id == $data['signer_id'] && $row->type === 'penandatangan_sci');
            $title = $chosen->first(fn ($row) => $row->id == $data['title_id'] && $row->type === 'jabatan_sci');
            if (! $signer || ! $title) {
                throw ValidationException::withMessages(['penandatangan' => 'Nama atau jabatan sudah tidak aktif. Pilih ulang dari master aktif.']);
            }
            foreach (['penandatangan' => $signer->nama, 'jabatan' => $title->nama] as $key => $value) {
                if ($request->query($key) !== null && $request->query($key) !== $value) {
                    throw ValidationException::withMessages([$key => 'Master pilihan berubah. Muat ulang pilihan nama/jabatan sebelum melanjutkan.']);
                }
            }

            return array_replace($context, [
                'name' => $signer->nama, 'title' => $title->nama, 'signing_mode' => 'manual',
                'manual_reason' => trim($data['manual_reason']),
                'query' => ['signing_mode' => 'manual', 'signer_id' => $signer->id, 'title_id' => $title->id,
                    'manual_reason' => trim($data['manual_reason']), 'penandatangan' => $signer->nama, 'jabatan' => $title->nama,
                    'print_basis' => $context['fingerprint']],
            ]);
        }
        foreach (['penandatangan' => 'name', 'jabatan' => 'title'] as $parameter => $key) {
            $value = $request->query($parameter);
            if ($parameter === 'penandatangan' && $value === 'bambang') {
                $value = 'Bambang Harwanta'; // Compatible old link; still subject to amount rule.
            }
            if ($value !== null && $value !== '' && (! is_string($value) || strcasecmp(trim($value), $context[$key]) !== 0)) {
                throw ValidationException::withMessages([$parameter => 'Penandatangan dan jabatan harus sesuai aturan nilai PR/PPBJ. Buka ulang konfirmasi cetak.']);
            }
        }

        return $context + ['signing_mode' => 'auto', 'query' => ['signing_mode' => 'auto',
            'penandatangan' => $context['name'], 'jabatan' => $context['title'], 'print_basis' => $context['fingerprint']]];
    }
}
