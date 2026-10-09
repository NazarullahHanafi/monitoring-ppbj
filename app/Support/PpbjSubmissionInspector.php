<?php

namespace App\Support;

use Carbon\Carbon;

class PpbjSubmissionInspector
{
    /**
     * Pemeriksaan ringan tanpa query. Duplikasi nomor tetap ditangani oleh validator
     * database/unique sehingga hasil ini aman dipakai untuk preview maupun submit.
     *
     * @return array{score:int,status:string,summary:string,issues:array<int,array<string,string>>,counts:array<string,int>}
     */
    public function inspect(array $data): array
    {
        $issues = [];

        $add = static function (string $severity, string $field, string $title, string $detail, string $suggestion = '') use (&$issues): void {
            $issues[] = compact('severity', 'field', 'title', 'detail', 'suggestion');
        };

        if (trim((string) ($data['ppbj_no'] ?? '')) === '') {
            $add('error', 'ppbj_no', 'Nomor PR/PPBJ wajib diisi', 'Nomor menjadi identitas utama untuk SP, SPPH, arsip, dan pelacakan.', 'Isi nomor PR/PPBJ sebelum menyimpan.');
        }

        if (trim((string) ($data['uraian'] ?? '')) === '') {
            $add('warning', 'uraian', 'Uraian pengadaan masih kosong', 'User lain akan kesulitan mengenali kebutuhan pengadaan.', 'Tambahkan uraian yang singkat dan spesifik.');
        }

        foreach ([
            'portofolio' => 'Portofolio',
            'buyer' => 'Buyer/PIC',
            'metode_pengadaan' => 'Metode pengadaan',
        ] as $field => $label) {
            if (trim((string) ($data[$field] ?? '')) === '') {
                $add('warning', $field, "{$label} belum dipilih", "{$label} diperlukan untuk filter, laporan, dan pembagian tanggung jawab.", "Pilih {$label} yang sesuai.");
            }
        }

        $money = [];
        foreach (['total_sebelum_ppn', 'nilai_sp_spk', 'nilai_bpg'] as $field) {
            $raw = str_replace([',', ' '], '', (string) ($data[$field] ?? ''));
            $money[$field] = $raw === '' ? null : (float) $raw;
            if ($money[$field] !== null && $money[$field] < 0) {
                $add('error', $field, 'Nilai tidak boleh negatif', 'Nilai keuangan harus nol atau lebih besar.', 'Perbaiki nominal sebelum menyimpan.');
            }
        }

        if (($money['total_sebelum_ppn'] ?? 0) <= 0) {
            $add('warning', 'total_sebelum_ppn', 'Nilai PR belum tersedia', 'Target SLA dan rekonsiliasi nominal tidak dapat dihitung akurat.', 'Isi nilai PR sebelum proses dilanjutkan.');
        }

        if (($money['nilai_sp_spk'] ?? 0) > 0 && ($money['total_sebelum_ppn'] ?? 0) > 0 && $money['nilai_sp_spk'] > $money['total_sebelum_ppn']) {
            $gap = $money['nilai_sp_spk'] - $money['total_sebelum_ppn'];
            $add('warning', 'nilai_sp_spk', 'Nilai SP/SPK melebihi nilai PR', 'Selisih terdeteksi sebesar Rp '.number_format($gap, 0, ',', '.').'.', 'Periksa gabungan PR, addendum, atau nominal SP sebelum melanjutkan.');
        }

        if (($money['nilai_bpg'] ?? 0) > 0 && ($money['nilai_sp_spk'] ?? 0) > 0 && $money['nilai_bpg'] > $money['nilai_sp_spk']) {
            $add('warning', 'nilai_bpg', 'Nilai BPG melebihi nilai SP/SPK', 'Realisasi penerimaan lebih tinggi dari nilai kontrak yang tercatat.', 'Periksa nilai BPG atau perubahan kontrak.');
        }

        foreach ([
            ['spph_rfq_1', 'tgl_spph', 'SPPH/RFQ'],
            ['sph', 'tgl_sph', 'SPH'],
            ['awarding_sp', 'tgl_awarding_sp', 'Awarding/SP/Kontrak'],
            ['pemenang', 'tgl_pemenang', 'Pengumuman pemenang'],
            ['do_no', 'do_date', 'DO/Surat Jalan/BAST'],
            ['bpg_no', 'tgl_bpg', 'BPG'],
            ['bpb_no', 'tgl_bpb', 'BPB'],
            ['no_invoice', 'tgl_invoice', 'Invoice'],
        ] as [$numberField, $dateField, $label]) {
            $hasNumber = trim((string) ($data[$numberField] ?? '')) !== '';
            $hasDate = trim((string) ($data[$dateField] ?? '')) !== '';
            if ($hasNumber xor $hasDate) {
                $missing = $hasNumber ? 'tanggal' : 'nomor';
                $add('warning', $hasNumber ? $dateField : $numberField, "Data {$label} belum berpasangan", "{$label} sudah memiliki ".($hasNumber ? 'nomor' : 'tanggal')." tetapi {$missing} belum diisi.", "Lengkapi {$missing} {$label} agar perjalanan PR konsisten.");
            }
        }

        $dates = [];
        foreach (['tgl_ppbj', 'tgl_terima_pr', 'tgl_diserahkan', 'tgl_spph', 'tgl_sph', 'tgl_awarding_sp', 'tgl_spk', 'promised_date', 'do_date', 'tgl_bpg', 'tgl_bpb', 'tgl_invoice'] as $field) {
            $dates[$field] = $this->date($data[$field] ?? null);
        }

        foreach ([
            ['tgl_ppbj', 'tgl_terima_pr', 'Tanggal terima PR lebih awal dari tanggal PR'],
            ['tgl_terima_pr', 'tgl_diserahkan', 'Tanggal diserahkan lebih awal dari tanggal terima PR'],
            ['tgl_spph', 'tgl_sph', 'Tanggal SPH lebih awal dari tanggal SPPH'],
            ['tgl_sph', 'tgl_awarding_sp', 'Tanggal awarding lebih awal dari tanggal SPH'],
        ] as [$before, $after, $title]) {
            if ($dates[$before] && $dates[$after] && $dates[$after]->lt($dates[$before])) {
                $add('warning', $after, $title, 'Urutan tanggal tidak mengikuti perjalanan pengadaan normal.', 'Konfirmasi kembali dokumen sumber atau perbaiki tanggal.');
            }
        }

        if ($dates['tgl_spk'] && $dates['promised_date'] && $dates['promised_date']->lt($dates['tgl_spk'])) {
            $add('error', 'promised_date', 'Tanggal pemenuhan tidak valid', 'Tanggal pemenuhan/berakhir kontrak lebih awal dari tanggal SPK.', 'Gunakan tanggal yang sama atau setelah tanggal SPK.');
        }

        $weights = [
            'ppbj_no' => 12, 'uraian' => 10, 'total_sebelum_ppn' => 10,
            'tgl_ppbj' => 7, 'tgl_terima_pr' => 7, 'portofolio' => 6,
            'buyer' => 6, 'metode_pengadaan' => 6, 'spph_rfq_1' => 8,
            'sph' => 8, 'awarding_sp' => 10, 'tgl_spk' => 10,
        ];
        $score = 0;
        foreach ($weights as $field => $weight) {
            $value = $field === 'total_sebelum_ppn' ? ($money[$field] ?? null) : ($data[$field] ?? null);
            if ($value !== null && trim((string) $value) !== '' && ($field !== 'total_sebelum_ppn' || (float) $value > 0)) {
                $score += $weight;
            }
        }
        $score = min(100, $score);
        $counts = [
            'error' => count(array_filter($issues, fn ($issue) => $issue['severity'] === 'error')),
            'warning' => count(array_filter($issues, fn ($issue) => $issue['severity'] === 'warning')),
            'info' => count(array_filter($issues, fn ($issue) => $issue['severity'] === 'info')),
        ];
        $status = $counts['error'] > 0 ? 'blocked' : ($counts['warning'] > 0 ? 'review' : 'ready');
        $summary = match ($status) {
            'blocked' => 'Ada data yang wajib diperbaiki sebelum disimpan.',
            'review' => 'Dapat disimpan, tetapi beberapa data sebaiknya diperiksa.',
            default => 'Data konsisten dan siap disimpan.',
        };

        return compact('score', 'status', 'summary', 'issues', 'counts');
    }

    private function date(mixed $value): ?Carbon
    {
        if (! $value) {
            return null;
        }

        try {
            return Carbon::parse($value)->startOfDay();
        } catch (\Throwable) {
            return null;
        }
    }
}
