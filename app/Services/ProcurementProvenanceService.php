<?php

namespace App\Services;

use App\Models\Torpr;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

/** Read-only, bounded provenance lookup. Never load signature tokens or attachments. */
class ProcurementProvenanceService
{
    public const PPBJ_COLUMNS = [
        'id', 'ppbj_no', 'uraian', 'total_sebelum_ppn', 'portofolio', 'buyer',
        'created_by_user_id', 'created_at', 'tgl_terima_pr', 'general_registration_number',
        'general_registered_by_user_id', 'general_registered_at',
        'goods_arrived_by_user_id', 'goods_arrived_at', 'goods_confirmed_by_user_id',
        'goods_confirmed_at', 'do_updated_by_user_id', 'do_updated_at',
    ];

    private const PPBJ_ACTORS = [
        'created_by_user_id' => ['Pencatat PPBJ', 'created_at'],
        'general_registered_by_user_id' => ['Pencatat registrasi Umum', 'general_registered_at'],
        'goods_arrived_by_user_id' => ['Pelapor barang/pekerjaan datang', 'goods_arrived_at'],
        'goods_confirmed_by_user_id' => ['Pengonfirmasi penerimaan', 'goods_confirmed_at'],
        'do_updated_by_user_id' => ['Pembaruan DO/BAST terakhir oleh', 'do_updated_at'],
    ];

    public function forPrs(Collection $prs, ?string $manualNumber = null): array
    {
        $prs = $prs->take(20)->keyBy(fn ($pr) => $this->key($pr->ppbj_no));
        $numbers = $prs->pluck('ppbj_no');
        if ($numbers->isEmpty() && filled($manualNumber)) {
            $numbers = collect([$manualNumber]);
        }
        if ($numbers->isEmpty()) {
            return [];
        }

        // Exact indexed lookup; all PRs in a package share these batch queries.
        $tors = Torpr::query()->whereIn('nomor_pr', $numbers)->select([
            'id', 'nomor_pr', 'tujuan_pengadaan', 'portofolio', 'tanggal_pr', 'jumlah_pr',
            'created_by_user_id', 'created_at', 'tgl_ttd_kabid_pr', 'tgl_ttd_kacab_pr',
            'signed_by_kabid_name', 'signed_by_kacab_name', 'received_by_umum_user_id', 'received_at',
        ])->with(['latestReceiptApproval' => fn ($query) => $query->select(array_map(fn ($column) => 'pr_receipt_approvals.'.$column, [
            'id', 'torpr_id', 'requested_by_user_id', 'requested_name', 'requested_at', 'status',
            'approved_by_user_id', 'approved_at', 'rejected_by_user_id', 'rejected_at',
            'rejected_reason', 'resubmit_notes',
        ]))])->get()->keyBy(fn ($tor) => $this->key($tor->nomor_pr));

        $userIds = [];
        foreach ($tors as $tor) {
            $userIds[] = $tor->created_by_user_id;
            $userIds[] = $tor->received_by_umum_user_id;
            foreach (['requested_by_user_id', 'approved_by_user_id', 'rejected_by_user_id'] as $column) {
                $userIds[] = $tor->latestReceiptApproval?->$column;
            }
        }
        foreach ($prs as $pr) {
            foreach (array_keys(self::PPBJ_ACTORS) as $column) {
                $userIds[] = $pr->$column;
            }
        }
        $ids = array_values(array_unique(array_filter($userIds)));
        $users = $ids ? User::query()->whereIn('id', $ids)->get(['id', 'name', 'department'])->keyBy('id') : collect();
        $actor = function ($id, $fallback = null) use ($users): string {
            $user = $users->get($id);
            if ($user) {
                return $this->plain($user->name).(filled($user->department) ? ' · '.ucfirst($this->plain($user->department)) : '');
            }

            return $this->plain($fallback ?: ($id ? 'Akun #'.$id.' tidak tersedia' : 'Belum tercatat'));
        };

        return $numbers->map(function ($number) use ($tors, $prs, $actor) {
            $tor = $tors->get($this->key($number));
            $pr = $prs->get($this->key($number));
            $source = $receipt = $signatures = $management = [];
            $field = fn ($label, $value) => ['label' => $label, 'value' => $this->plain($value)];
            if ($tor) {
                $source = [
                    $field('Pembuat TOR/PR', $actor($tor->created_by_user_id)),
                    $field('Dibuat pada', $this->date($tor->created_at)),
                    $field('Tanggal PR', $this->date($tor->tanggal_pr, false)),
                    $field('Portofolio TOR/PR', $tor->portofolio ?: 'Belum tercatat'),
                    $field('Tujuan pengadaan TOR/PR', $tor->tujuan_pengadaan ?: 'Belum tercatat'),
                    ['label' => 'Nilai PR asal', 'value' => $tor->jumlah_pr ?? 'Belum tercatat', 'type' => $tor->jumlah_pr !== null ? 'money' : 'text'],
                ];
                foreach (['kabid' => 'Kepala Bidang', 'kacab' => 'Kepala Cabang'] as $key => $label) {
                    $date = $tor->getAttribute('tgl_ttd_'.$key.'_pr');
                    $signatures[] = [
                        'role' => $label,
                        'status' => $date ? 'Tanggal tanda tangan tercatat' : 'Tanggal tanda tangan belum tercatat',
                        // A creator or buyer is NOT a fallback for a missing signer.
                        'name' => $this->plain($tor->getAttribute('signed_by_'.$key.'_name') ?: 'Nama penandatangan belum tercatat'),
                        'date' => $this->date($date),
                    ];
                }
                $approval = $tor->latestReceiptApproval;
                $receipt[] = $field('Status permintaan terakhir', match ($approval?->status) {
                    'APPROVED' => 'Disetujui', 'REJECTED' => 'Ditolak', 'PENDING' => 'Menunggu persetujuan',
                    default => $approval ? 'Status belum dikenali' : 'Belum ada permintaan tercatat',
                });
                if ($approval) {
                    $receipt[] = $field('Pengaju permintaan terakhir', $actor($approval->requested_by_user_id, $approval->requested_name));
                    $receipt[] = $field('Diajukan pada', $this->date($approval->requested_at));
                    if ($approval->status === 'APPROVED') {
                        $receipt[] = $field('Disetujui oleh', $actor($approval->approved_by_user_id));
                        $receipt[] = $field('Disetujui pada', $this->date($approval->approved_at));
                    } elseif ($approval->status === 'REJECTED') {
                        $receipt[] = $field('Ditolak oleh', $actor($approval->rejected_by_user_id));
                        $receipt[] = $field('Ditolak pada', $this->date($approval->rejected_at));
                        $receipt[] = $field('Alasan penolakan', $approval->rejected_reason ?: 'Belum tercatat');
                    }
                    if (filled($approval->resubmit_notes)) {
                        $receipt[] = $field('Catatan pengajuan ulang terakhir', $approval->resubmit_notes);
                    }
                }
                $receipt[] = $field('Penerima TOR/PR di Umum', $actor($tor->received_by_umum_user_id));
                $receipt[] = $field('Diterima di Umum pada', $this->date($tor->received_at));
            }
            if ($pr) {
                $management[] = $field('Buyer / PIC PPBJ', $pr->buyer ?: 'Belum tercatat');
                $management[] = $field('Nomor registrasi Umum', $pr->general_registration_number ?: 'Belum tercatat');
                $management[] = $field('Tanggal terima PR pada PPBJ', $this->date($pr->tgl_terima_pr, false));
                foreach (self::PPBJ_ACTORS as $column => [$label, $dateColumn]) {
                    if ($column === 'created_by_user_id' || $pr->$column || $pr->$dateColumn) {
                        $management[] = $field($label, $actor($pr->$column));
                        $management[] = $field($label.' · waktu', $this->date($pr->$dateColumn));
                    }
                }
            }

            return [
                'number' => $this->plain($number), 'found' => (bool) $tor,
                'creator' => $tor ? $actor($tor->created_by_user_id) : 'Pembuat TOR/PR belum dapat ditelusuri',
                'source_fields' => $source, 'signatures' => $signatures,
                'receipt_fields' => $receipt, 'management_fields' => $management,
                'notice' => $tor
                    ? 'Nama dan tanggal tanda tangan mengikuti catatan sistem, bukan verifikasi sertifikat digital. Persetujuan menampilkan permintaan terakhir.'
                    : 'Data TOR/PR asal belum ditemukan untuk nomor ini. Pembuat TOR/PR dan penandatangan tidak disimpulkan dari buyer atau pencatat PPBJ.',
            ];
        })->values()->all();
    }

    private function key(string $number): string
    {
        return mb_strtolower(trim($number));
    }

    private function date(mixed $value, bool $time = true): string
    {
        return $value ? Carbon::parse($value)->timezone('Asia/Jakarta')->format($time ? 'd M Y H:i \W\I\B' : 'd M Y') : 'Belum tercatat';
    }

    private function plain(mixed $value): string
    {
        $text = preg_replace('/<\/?(?:p|div|li|br)\b[^>]*>/iu', ' ', (string) $value) ?? '';

        return mb_substr(trim(preg_replace('/\s+/u', ' ', html_entity_decode(strip_tags($text), ENT_QUOTES | ENT_HTML5, 'UTF-8')) ?? ''), 0, 2000);
    }
}
