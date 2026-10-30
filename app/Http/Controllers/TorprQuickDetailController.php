<?php

namespace App\Http\Controllers;

use App\Models\Ppbj;
use App\Models\Torpr;
use App\Services\ProcurementProvenanceService;
use App\Support\PpbjListPresentation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;

/** An explicit Operational read model; never expose the Umum/admin detail payload. */
class TorprQuickDetailController extends Controller
{
    public function show(Request $request, int $id)
    {
        abort_unless($request->user()->department === 'operasional', 403);
        // Reading TOR/PR is department-wide, like the existing TOR/PR list and tracking.
        // Existence and department are checked even when a cached result exists.
        $tor = Torpr::query()->findOrFail($id, [
            'id', 'nomor_pr', 'tujuan_pengadaan', 'portofolio', 'jumlah_pr', 'tanggal_pr',
            'tgl_ttd_kabid_pr', 'tgl_ttd_kacab_pr', 'signed_by_kabid_name', 'signed_by_kacab_name',
            'created_by_user_id', 'received_by_umum_user_id', 'received_at', 'created_at', 'updated_at',
        ]);
        $key = 'torpr:quick:v1:'.$request->user()->id.':'.$id.':'.sha1((string) $tor->getRawOriginal('updated_at'));
        $build = fn () => $this->present($tor);
        if ($request->boolean('fresh')) {
            $data = $build();
            Cache::put($key, $data, 20);
        } else {
            $data = Cache::remember($key, 20, $build);
        }

        return response()->json($data)->header('Cache-Control', 'private, no-store');
    }

    private function present(Torpr $tor): array
    {
        // Exact indexed lookup, not a scan of SP/SPPH or a request to cloud storage.
        $pr = filled($tor->nomor_pr) ? Ppbj::where('ppbj_no', $tor->nomor_pr)->first() : null;
        $provenance = app(ProcurementProvenanceService::class)->forTor($tor, $pr);
        $approval = $tor->latestReceiptApproval;
        $stages = [];
        $stage = function ($label, $date, $reference = null, $done = null) use (&$stages) {
            $stages[] = ['label' => $label, 'done' => $done ?? (filled($date) || filled($reference)),
                'date_label' => $this->date($date), 'reference' => $this->plain($reference)];
        };
        $stage('TOR/PR dibuat', $tor->created_at, $tor->nomor_pr, true);
        $stage('Tanda tangan Kabid', $tor->tgl_ttd_kabid_pr, null, filled($tor->tgl_ttd_kabid_pr));
        $stage('Tanda tangan Kacab', $tor->tgl_ttd_kacab_pr, null, filled($tor->tgl_ttd_kacab_pr));
        $stage('Pengajuan terakhir ke Umum', $approval?->requested_at, $approval?->status, (bool) $approval);
        $stage('Diterima Umum', $tor->received_at ?: ($approval?->status === 'APPROVED' ? $approval->approved_at : null),
            null, filled($tor->received_at) || $approval?->status === 'APPROVED');
        $stage('Registrasi Umum', $pr?->general_registered_at, $pr?->general_registration_number);
        $stage('SPPH / RFQ', $pr?->tgl_spph, $pr?->spph_rfq_1);
        $stage('SP / Kontrak', $pr?->tgl_spk ?: $pr?->tgl_awarding_sp, $pr?->awarding_sp);
        $stage('Barang / pekerjaan datang', $pr?->goods_arrived_at);
        $stage('Penerimaan dikonfirmasi', $pr?->goods_confirmed_at);
        $stage('DO / Surat Jalan / BAST', $pr?->do_date, $pr?->do_no,
            filled($pr?->do_date) && filled($pr?->do_no));
        $stage('BPG / BPB', $pr?->tgl_bpg ?: $pr?->tgl_bpb, $pr?->bpg_no ?: $pr?->bpb_no);
        $stage('Invoice', $pr?->tgl_invoice, $pr?->no_invoice);

        $fields = [
            ['label' => 'Tanggal PR', 'value' => $this->date($tor->tanggal_pr)],
            ['label' => 'Portofolio', 'value' => $this->plain($tor->portofolio ?: 'Belum tercatat')],
            ['label' => 'Nilai PR asal', 'value' => $tor->jumlah_pr ?? 'Belum tercatat', 'type' => $tor->jumlah_pr !== null ? 'money' : 'text'],
            ['label' => 'Terhubung ke Management PPBJ', 'value' => $pr ? 'Sudah terhubung' : 'Belum ditemukan untuk nomor PR ini'],
        ];
        if ($pr) {
            $labels = PpbjListPresentation::make($pr);
            foreach (['Buyer / PIC Umum' => $pr->buyer, 'Penyedia eksternal' => $pr->penyedia_eksternal,
                'Registrasi Umum' => $pr->general_registration_number,
                'Batas pemenuhan' => $labels['contract_end_date_label'],
                'Status pemenuhan' => $labels['contract_status_label'],
                'Penjelasan SLA' => $labels['sla_explanation'],
                'Penjelasan pemenuhan' => $labels['contract_explanation']] as $label => $value) {
                $fields[] = ['label' => $label, 'value' => $this->plain($value ?: 'Belum tercatat')];
            }
            if ($pr->nilai_sp_spk !== null) {
                $fields[] = ['label' => 'Nilai SP pada PR ini', 'value' => $pr->nilai_sp_spk, 'type' => 'money'];
            }
        }
        [$current, $next] = $this->nextStep($tor, $pr, $approval?->status);
        $lastRecorded = collect($stages)->filter(fn ($item) => $item['done'])->last();
        $summaryFields = [
            ['label' => 'Status proses', 'value' => $current],
            ['label' => 'Tahap paling lanjut tercatat', 'value' => $lastRecorded['label']],
            ['label' => 'Tindak lanjut yang disarankan', 'value' => $next],
            ['label' => 'Data proses diperbarui', 'value' => $this->date($pr?->updated_at ?: $tor->updated_at)],
        ];

        return [
            'kind' => 'torpr', 'id' => $tor->id, 'number' => $this->plain($tor->nomor_pr ?: 'Nomor PR belum diisi'),
            'title' => $this->plain($tor->tujuan_pengadaan), 'fields' => $fields,
            'summary_fields' => $summaryFields, 'provenance' => $provenance, 'stages' => $stages,
            'tracking_url' => filled($tor->nomor_pr) ? route('tracking.index', ['q' => $tor->nomor_pr]) : null,
            'copy_summary' => implode("\n", [$this->plain($tor->nomor_pr ?: 'Nomor PR belum diisi'),
                $this->plain($tor->tujuan_pengadaan), 'Status: '.$current, 'Tindak lanjut: '.$next,
                'Diperbarui: '.$this->date($pr?->updated_at ?: $tor->updated_at)]),
            'cache_seconds' => 20, 'loaded_at' => now()->toIso8601String(),
        ];
    }

    private function nextStep(Torpr $tor, ?Ppbj $pr, ?string $approval): array
    {
        return match (true) {
            $pr?->status === 'CANCELLED' => ['Dibatalkan', 'Koordinasikan alasan dan kelanjutan PR dengan Umum.'],
            $approval === 'REJECTED' => ['Pengajuan terakhir ditolak', 'Periksa alasan penolakan, perbaiki data, lalu ajukan ulang sesuai kewenangan.'],
            filled($pr?->no_invoice) => ['Invoice tercatat', 'Periksa kelengkapan dokumen serah terima dan konfirmasi penutupan ke Umum. Invoice tercatat bukan bukti pembayaran.'],
            filled($pr?->bpg_no) || filled($pr?->bpb_no) => ['BPG / BPB tercatat', 'Koordinasikan kelengkapan nomor dan tanggal invoice dengan Umum.'],
            filled($pr?->do_no) && filled($pr?->do_date) => ['Dokumen serah terima tercatat', 'Pantau pencatatan BPG / BPB dan invoice bersama Umum.'],
            filled($pr?->goods_arrived_at) => ['Barang / pekerjaan dilaporkan datang', 'Konfirmasi penerimaan dan lengkapi nomor serta tanggal DO / BAST sesuai kondisi nyata.'],
            filled($pr?->awarding_sp) || filled($pr?->tgl_spk) => ['SP / Kontrak tercatat', 'Pantau batas pemenuhan dan koordinasikan penerimaan barang/pekerjaan.'],
            filled($pr?->spph_rfq_1) => ['SPPH / RFQ tercatat', 'Pantau penawaran dan tindak lanjut pemilihan penyedia bersama Umum.'],
            filled($tor->received_at) || $approval === 'APPROVED' => ['Diterima Umum', $pr ? 'Koordinasikan penerbitan SPPH / RFQ dengan PIC Umum.' : 'Persetujuan tercatat, tetapi PPBJ belum ditemukan. Minta Umum memeriksa keterhubungan nomor PR.'],
            $approval === 'PENDING' => ['Menunggu pemeriksaan Umum', 'Pantau hasil pemeriksaan Umum; jangan membuat pengajuan duplikat.'],
            blank($tor->nomor_pr) || blank($tor->tujuan_pengadaan) || blank($tor->portofolio) || ! $tor->tanggal_pr || (float) $tor->jumlah_pr <= 0 => ['Data PR perlu dilengkapi', 'Lengkapi nomor PR, tujuan, portofolio, tanggal dan nilai PR sebelum diajukan.'],
            ! $tor->tgl_ttd_kabid_pr => ['Menunggu tanda tangan Kabid', 'Koordinasikan tanda tangan Kabid sesuai kewenangan.'],
            ! $tor->tgl_ttd_kacab_pr => ['Menunggu tanda tangan Kacab', 'Koordinasikan tanda tangan Kacab sesuai kewenangan.'],
            default => ['Siap ditinjau untuk pengajuan', 'Minta petugas yang berwenang mengajukan permintaan penerimaan ke Umum.'],
        };
    }

    private function plain(mixed $value): string
    {
        return mb_substr(trim(html_entity_decode(strip_tags((string) $value), ENT_QUOTES | ENT_HTML5, 'UTF-8')), 0, 2000);
    }

    private function date(mixed $date): ?string
    {
        return $date ? Carbon::parse($date)->timezone('Asia/Jakarta')->format('d M Y H:i \W\I\B') : null;
    }
}
