<?php

namespace App\Http\Controllers;

use App\Models\Sp;
use App\Models\SpItem;
use App\Models\Ppbj;
use App\Models\Vendor;
use App\Models\User;
use App\Models\Satuan;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Support\Str;
use App\Traits\HasPresence;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\IOFactory;
use App\Models\SpMasterOption;
use PhpOffice\PhpWord\Shared\Html as PhpWordHtml;
use ZipArchive;

class SpController extends Controller
{
    use HasPresence;

    protected function presenceKey(): string
    {
        return 'sp:presence';
    }

    // =========================================================
    // INDEX
    // =========================================================
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $pic = $request->get('pic', '');
        $dari = $request->get('dari', '');
        $sampai = $request->get('sampai', '');
        $oracleMode = $this->isOracleMode($request);

        $vendors = Cache::remember('vendors:active', 3600, fn() => Vendor::active()->orderBy('nama_vendor')->get());
        $pics = Cache::remember('pics:umum', 3600, fn() => User::where('department', 'umum')->orderBy('name')->pluck('name'));
        $satuans = Cache::remember('satuans:all', 3600, fn() => Satuan::orderBy('nama_satuan')->pluck('nama_satuan')->toArray());
        $lastNomor = Cache::remember('sp:last_nomor:' . ($oracleMode ? 'oracle' : 'auto'), 300, fn() => $this->spModeQuery($oracleMode)->orderBy('sequence_number', 'desc')->value('nomor_sp'));
        $bidangIpItus = SpMasterOption::active()
            ->where('type', 'bidang_ip_itu')
            ->orderBy('nama')
            ->pluck('nama');

        $penandatanganScis = SpMasterOption::active()
            ->where('type', 'penandatangan_sci')
            ->orderBy('nama')
            ->pluck('nama');

        $jabatanScis = SpMasterOption::active()
            ->where('type', 'jabatan_sci')
            ->orderBy('nama')
            ->pluck('nama');

        $baseQuery = $this->spModeQuery($oracleMode)->when($search, fn($q) => $q->where(function ($q2) use ($search) {
            $q2->where('nomor_sp', 'like', "%{$search}%")
                ->orWhere('nomor_pr', 'like', "%{$search}%")
                ->orWhere('nama_vendor', 'like', "%{$search}%")
                ->orWhere('deskripsi_pengadaan', 'like', "%{$search}%");
        }))
            ->when($pic, fn($q) => $q->where('pic', $pic))
            ->when($dari, fn($q) => $q->where('tanggal_sp', '>=', $dari))
            ->when($sampai, fn($q) => $q->where('tanggal_sp', '<=', $sampai));

        $stats = (clone $baseQuery)->selectRaw('
            COUNT(*) as total_count,
            COALESCE(SUM(nilai_sp), 0) as total_nilai_sp,
            COALESCE(SUM(nilai_pr), 0) as total_nilai_pr
        ')->first();

        $sps = (clone $baseQuery)->orderBy('sequence_number', 'desc')
            ->paginate(25)
            ->withQueryString();

        return view('sp.index', compact('vendors', 'pics', 'satuans', 'sps', 'lastNomor', 'search', 'pic', 'dari', 'sampai', 'stats', 'bidangIpItus', 'penandatanganScis', 'jabatanScis', 'oracleMode'));
    }

    // =========================================================
    // GET PPBJ OPTIONS
    // =========================================================
    public function getPpbjOptions(Request $request)
    {
        $search = $request->get('q', '');

        $query = DB::table('ppbj')
            ->select(['ppbj_no', 'uraian', 'portofolio', 'buyer', 'spph_rfq_1', 'total_sebelum_ppn'])
            ->where('status', '!=', 'CANCELLED')
            ->where(function ($q) {
                $q->whereNull('awarding_sp')
                    ->orWhere('awarding_sp', '');
            });

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('ppbj_no', 'LIKE', "%{$search}%")
                    ->orWhere('uraian', 'LIKE', "%{$search}%");
            });
        }

        $results = $query->orderBy('ppbj_no', 'desc')->limit(50)->get()
            ->map(fn($r) => [
                'id' => $r->ppbj_no,
                'text' => $r->ppbj_no . ($r->uraian ? ' — ' . Str::limit($r->uraian, 40) : ''),
                'uraian' => $r->uraian,
                'portofolio' => $r->portofolio,
                'buyer' => $r->buyer,
                'has_spph' => !empty($r->spph_rfq_1),
                'total_sebelum_ppn' => $r->total_sebelum_ppn,
            ]);

        return response()->json(['results' => $results]);
    }

    // =========================================================
    // CHECK PPBJ STATUS
    // =========================================================
    public function checkPpbjStatus(Request $request)
    {
        $ppbjNo = trim($request->get('ppbj_no', ''));
        if (!$ppbjNo)
            return response()->json(['status' => 'empty']);

        $ppbj = DB::table('ppbj')
            ->select(['ppbj_no', 'status', 'awarding_sp', 'spph_rfq_1', 'uraian', 'portofolio', 'buyer', 'total_sebelum_ppn'])
            ->where('ppbj_no', $ppbjNo)
            ->first();

        if (!$ppbj)
            return response()->json(['status' => 'manual', 'message' => 'Nomor PR manual']);

        if ($ppbj->status === 'CANCELLED')
            return response()->json(['status' => 'cancelled', 'message' => 'PPBJ sudah di-CANCELLED!']);

        if (!empty($ppbj->awarding_sp))
            return response()->json([
                'status' => 'already_linked',
                'message' => "PPBJ sudah terhubung dengan SP: {$ppbj->awarding_sp}",
                'linked_sp' => $ppbj->awarding_sp,
                'uraian' => $ppbj->uraian,
                'total_sebelum_ppn' => $ppbj->total_sebelum_ppn,
            ]);

        $warnings = [];
        if (empty($ppbj->spph_rfq_1)) {
            $warnings[] = 'PPBJ belum memiliki SPPH';
        }

        return response()->json([
            'status' => 'available',
            'message' => 'PPBJ tersedia untuk SP',
            'uraian' => $ppbj->uraian,
            'portofolio' => $ppbj->portofolio,
            'buyer' => $ppbj->buyer,
            'has_spph' => !empty($ppbj->spph_rfq_1),
            'warnings' => $warnings,
            'total_sebelum_ppn' => $ppbj->total_sebelum_ppn,
        ]);
    }

    // =========================================================
    // EXPORT CSV (dengan detail items jika ada)
    // =========================================================
    public function export(Request $request)
    {
        $search = $request->get('search', '');
        $pic = $request->get('pic', '');
        $dari = $request->get('dari', '');
        $sampai = $request->get('sampai', '');
        $oracleMode = $this->isOracleMode($request);

        $data = $this->spModeQuery($oracleMode)->when($search, fn($q) => $q->where(function ($q2) use ($search) {
            $q2->where('nomor_sp', 'like', "%{$search}%")
                ->orWhere('nomor_pr', 'like', "%{$search}%")
                ->orWhere('nama_vendor', 'like', "%{$search}%")
                ->orWhere('deskripsi_pengadaan', 'like', "%{$search}%");
        }))
            ->when($pic, fn($q) => $q->where('pic', $pic))
            ->when($dari, fn($q) => $q->where('tanggal_sp', '>=', $dari))
            ->when($sampai, fn($q) => $q->where('tanggal_sp', '<=', $sampai))
            ->orderBy('sequence_number', 'desc')
            ->get();

        $filename = 'SP_' . now()->format('Ymd_His') . '.csv';

        $callback = function () use ($data) {
            $file = fopen('php://output', 'w');
            fprintf($file, chr(0xEF) . chr(0xBB) . chr(0xBF));

            // Cek apakah ada data dengan items
            $hasItems = $data->contains(fn($row) => $row->items && $row->items->isNotEmpty());

            if ($hasItems) {
                // Header dengan detail items
                fputcsv($file, [
                    'No',
                    'Nomor SP',
                    'Tgl SP',
                    'Nilai SP',
                    'Nomor PR',
                    'Nilai PR',
                    'SPH',
                    'Tgl SPH',
                    'Vendor',
                    'Deskripsi',
                    'PIC',
                    'No Item',
                    'Nama Barang',
                    'Satuan',
                    'Jumlah',
                    'Harga Satuan',
                    'Subtotal'
                ]);

                $rowNo = 0;
                foreach ($data as $row) {
                    $items = $row->items;
                    if ($items->isEmpty()) {
                        $rowNo++;
                        fputcsv($file, \App\Support\Csv::row([
                            $rowNo,
                            $row->nomor_sp,
                            $row->tanggal_sp?->format('d/m/Y'),
                            $row->nilai_sp,
                            $row->nomor_pr,
                            $row->nilai_pr,
                            $row->sph,
                            $row->tgl_sph?->format('d/m/Y'),
                            $row->nama_vendor,
                            $row->deskripsi_pengadaan,
                            $row->pic,
                            '',
                            '',
                            '',
                            '',
                            '',
                            ''
                        ]));
                    } else {
                        foreach ($items as $idx => $item) {
                            $rowNo++;
                            fputcsv($file, \App\Support\Csv::row([
                                $idx === 0 ? $rowNo : '',
                                $idx === 0 ? $row->nomor_sp : '',
                                $idx === 0 ? ($row->tanggal_sp ? $row->tanggal_sp->format('d/m/Y') : '') : '',  // ✅ Diperbaiki
                                $idx === 0 ? $row->nilai_sp : '',
                                $idx === 0 ? ($row->nomor_pr ?? '') : '',
                                $idx === 0 ? $row->nilai_pr : '',
                                $idx === 0 ? ($row->sph ?? '') : '',
                                $idx === 0 ? ($row->tgl_sph ? $row->tgl_sph->format('d/m/Y') : '') : '',       // ✅ Diperbaiki
                                $idx === 0 ? $row->nama_vendor : '',
                                $idx === 0 ? $row->deskripsi_pengadaan : '',
                                $idx === 0 ? $row->pic : '',
                                $item->urutan,
                                strip_tags($item->nama_barang),
                                $item->satuan,
                                $item->jumlah,
                                $item->harga_satuan,
                                $item->subtotal,
                            ]));
                        }
                    }
                }
            } else {
                // Header tanpa items (original)
                fputcsv($file, [
                    'No',
                    'Nomor SP',
                    'Tgl SP',
                    'Nilai SP',
                    'Nomor PR',
                    'Nilai PR',
                    'SPH',
                    'Tgl SPH',
                    'Vendor',
                    'Deskripsi',
                    'PIC'
                ]);

                foreach ($data as $i => $row) {
                    fputcsv($file, \App\Support\Csv::row([
                        $i + 1,
                        $row->nomor_sp,
                        $row->tanggal_sp?->format('d/m/Y'),
                        $row->nilai_sp,
                        $row->nomor_pr,
                        $row->nilai_pr,
                        $row->sph,
                        $row->tgl_sph?->format('d/m/Y'),
                        $row->nama_vendor,
                        $row->deskripsi_pengadaan,
                        $row->pic,
                    ]));
                }
            }

            fclose($file);
        };

        return response()->stream($callback, 200, [
            'Content-Type' => 'text/csv; charset=utf-8',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }

    // =========================================================
    // CHECK NOMOR
    // =========================================================
    public function checkNomor(Request $request)
    {
        $originalNomor = trim($request->get('nomor', ''));
        $oracleMode = $this->isOracleMode($request);
        $nomor = $oracleMode
            ? $originalNomor
            : $this->normalizeNumberPeriod($originalNomor, $request->get('tanggal'), 'SP');
        $excludeId = (int) $request->get('exclude_id', 0);
        $tanggal = $request->get('tanggal');

        if (!$nomor)
            return response()->json(['status' => 'empty']);

        $cacheKey = 'sp:check:' . md5($originalNomor . ':' . $nomor . ':' . $excludeId . ':' . $tanggal . ':' . (int) $oracleMode);
        return Cache::remember($cacheKey, 30, function () use ($nomor, $originalNomor, $excludeId, $oracleMode, $tanggal) {
            $exists = Sp::where('nomor_sp', $nomor)
                ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
                ->exists();

            if ($exists)
                return [
                    'status' => 'duplicate',
                    'message' => "Nomor \"{$nomor}\" sudah digunakan!",
                    'normalized_nomor' => $nomor !== $originalNomor ? $nomor : null,
                ];

            $seqInput = $oracleMode ? null : $this->extractSeq($nomor);
            $warning = null;

            if ($seqInput !== null) {
                $lastNomor = $this->spModeQuery(false)
                    ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
                    ->orderBy('sequence_number', 'desc')->value('nomor_sp');

                if ($lastNomor) {
                    $lastSeq = $this->extractSeq($lastNomor);
                    if ($lastSeq !== null) {
                        [$year] = $this->periodFromDate($tanggal);
                        $expectedSeq = $this->nextAvailableAutoSequence($excludeId, $year);
                        if ($seqInput < $expectedSeq)
                            $warning = "Nomor ini ({$seqInput}) lebih kecil dari urutan berikutnya ({$expectedSeq}).";
                        elseif ($seqInput > $expectedSeq)
                            $warning = "Nomor boleh lompat, tetapi sistem otomatis berikutnya tetap akan menyarankan " . $this->replaceSequenceInNumber($nomor, $expectedSeq) . " agar celah nomor tidak hilang.";
                    }
                }
            }

            if (!$oracleMode && $nomor !== $originalNomor) {
                $warning = "Nomor otomatis disesuaikan dengan tanggal dokumen menjadi {$nomor}.";
            } elseif ($oracleMode) {
                $warning = 'Mode Oracle ERP: nomor SP diketik manual dan hanya dicek duplikasi.';
            }

            return [
                'status' => 'ok',
                'warning' => $warning,
                'normalized_nomor' => $nomor !== $originalNomor ? $nomor : null,
            ];
        });
    }

    // =========================================================
    // SUGGEST NOMOR
    // =========================================================
    public function suggestNomor(Request $request)
    {
        if ($this->isOracleMode($request)) {
            return [
                'suggestions' => [],
                'last' => null,
                'manual' => true,
                'message' => 'Mode Oracle ERP: nomor SP diketik manual dari sistem Oracle.',
            ];
        }

        [$year, $roman] = $this->periodFromDate($request->query('tanggal'));

        $nextSeq = $this->nextAvailableAutoSequence(null, $year);
        $lastNomor = $this->spModeQuery(false)
            ->where('nomor_sp', 'like', "%/SP/{$year}")
            ->orderBy('sequence_number', 'desc')
            ->value('nomor_sp');

        return [
            'suggestions' => [sprintf('%03d/PKU-%s/SP/%d', $nextSeq, $roman, $year)],
            'last' => $lastNomor,
        ];
    }

    // =========================================================
    // POLL
    // =========================================================
    public function poll(Request $request)
    {
        $lastId = (int) $request->get('last_id', 0);
        $rows = Sp::select([
                'id',
                'nomor_sp',
                'tanggal_sp',
                'nilai_sp',
                'nomor_pr',
                'nilai_pr',
                'nama_vendor',
                'deskripsi_pengadaan',
                'pic',
            ])
            ->where(function ($query) {
                $query->whereNull('numbering_mode')
                    ->orWhere('numbering_mode', 'auto');
            })
            ->where('id', '>', $lastId)
            ->orderBy('id')
            ->limit(50)
            ->get()
            ->map(fn($r) => [
                'id' => $r->id,
                'nomor_sp' => $r->nomor_sp,
                'tanggal_sp' => $r->tanggal_sp?->format('d/m/Y') ?? '-',
                'nilai_sp' => $r->nilai_sp ? 'Rp ' . number_format($r->nilai_sp, 0, ',', '.') : '-',
                'nomor_pr' => $r->nomor_pr ?? '-',
                'nilai_pr' => $r->nilai_pr ? 'Rp ' . number_format($r->nilai_pr, 0, ',', '.') : '-',
                'nama_vendor' => $r->nama_vendor,
                'deskripsi_pengadaan' => $r->deskripsi_pengadaan,
                'pic' => $r->pic,
            ]);
        return response()->json(['rows' => $rows]);
    }

    // =========================================================
    // GET ITEMS (API for edit modal)
    // =========================================================
    public function getItems(Sp $sp)
    {
        return response()->json(
            $sp->items()
                ->select(['id', 'urutan', 'nama_barang', 'satuan', 'jumlah', 'harga_satuan', 'subtotal', 'tgl_pemenuhan'])
                ->orderBy('urutan')
                ->get()
                ->map(fn(SpItem $item) => [
                    'id' => $item->id,
                    'urutan' => $item->urutan,
                    'nama_barang' => $item->nama_barang,
                    'satuan' => $item->satuan,
                    'jumlah' => $item->jumlah,
                    'harga_satuan' => $item->harga_satuan ? $this->formatMoney($item->harga_satuan) : '',
                    'subtotal' => $item->subtotal ? $this->formatMoney($item->subtotal) : '',
                    'tgl_pemenuhan' => $item->tgl_pemenuhan
                        ? \Carbon\Carbon::parse($item->tgl_pemenuhan)->format('Y-m-d')
                        : null,
                ])
        );
    }

    // =========================================================
    // STORE
    // =========================================================
    public function store(Request $request)
    {
        $oracleMode = $this->isOracleMode($request);

        $request->merge([
            'nomor_sp' => $oracleMode
                ? trim($request->input('nomor_sp', ''))
                : $this->normalizeNumberPeriod($request->input('nomor_sp', ''), $request->input('tanggal_sp'), 'SP'),
            'nilai_sp' => $this->moneyToNullableFloat($request->input('nilai_sp')),
            'nilai_pr' => $this->moneyToNullableFloat($request->input('nilai_pr')),
        ]);

        $request->validate([
            'nomor_sp' => ['required', 'string', 'max:60', Rule::unique('sps', 'nomor_sp')],
            'tanggal_sp' => 'nullable|date',
            'nilai_sp' => 'nullable|numeric|min:0',
            'nomor_pr' => ['nullable', 'string', 'max:100', Rule::unique('sps', 'nomor_pr')],
            'nilai_pr' => 'nullable|numeric|min:0',
            'nama_vendor' => 'required|string|max:255',
            'deskripsi_pengadaan' => 'required|string',
            'pic' => 'required|string|max:100',
            'vendor_baru' => 'nullable|string|max:255',
            'sph' => 'nullable|string|max:255',
            'tgl_sph' => 'nullable|date',
            'promised_date' => 'nullable|date',
            'rfq' => 'nullable|string|max:255',
            'nomor_pemenang' => 'nullable|string|max:255',
            'tanggal_pemenang' => 'nullable|date',
            'awal_kontrak' => 'nullable|date',
            'akhir_kontrak' => 'nullable|date',
            'bidang_ip_itu' => 'nullable|string|max:255',
            'penandatangan_sci' => 'nullable|string|max:255',
            'jabatan_sci' => 'nullable|string|max:255',
            'items' => 'nullable|array|max:50',
            'items.*.nama_barang' => 'nullable|string|max:60000',
            'items.*.satuan' => 'nullable|string|max:50',
            'items.*.jumlah' => 'nullable|string|max:50',
            'items.*.harga_satuan' => 'nullable|string|max:50',
            'items.*.tgl_pemenuhan' => 'nullable|date',
        ]);

        $this->validateSpModeValue($request, $oracleMode);

        if (!$oracleMode) {
            $this->validateNumberPeriod($request->nomor_sp, $request->tanggal_sp, 'SP', 'nomor_sp');
        }

        $nomorPr = $request->nomor_pr ?: null;

        if ($nomorPr) {
            $ppbjCheck = DB::table('ppbj')->where('ppbj_no', $nomorPr)->first();
            if ($ppbjCheck) {
                if ($ppbjCheck->status === 'CANCELLED') {
                    return back()->withErrors(['nomor_pr' => "PPBJ \"{$nomorPr}\" sudah di-CANCELLED!"])->withInput();
                }
                if (!empty($ppbjCheck->awarding_sp)) {
                    return back()->withErrors(['nomor_pr' => "PPBJ sudah terhubung dengan SP: {$ppbjCheck->awarding_sp}!"])->withInput();
                }
            }
        }

        try {
            return DB::transaction(function () use ($request, $nomorPr, $oracleMode) {
            $ppbjRecord = null;

            if ($nomorPr) {
                $ppbjRecord = Ppbj::where('ppbj_no', $nomorPr)->lockForUpdate()->first();

                if ($ppbjRecord) {
                    if ($ppbjRecord->status === 'CANCELLED') {
                        return back()->withErrors(['nomor_pr' => "PPBJ \"{$nomorPr}\" sudah di-CANCELLED!"])->withInput();
                    }

                    if (!empty($ppbjRecord->awarding_sp)) {
                        return back()->withErrors(['nomor_pr' => "PPBJ sudah terhubung dengan SP: {$ppbjRecord->awarding_sp}!"])->withInput();
                    }
                }
            }

            $vendorName = $request->nama_vendor;
            if ($request->filled('vendor_baru')) {
                $v = Vendor::firstOrCreate(['nama_vendor' => trim($request->vendor_baru)]);
                $vendorName = $v->nama_vendor;
                Cache::forget('vendors:active');
            }

            $seq = $oracleMode
                ? ((int) $this->spModeQuery(true)->lockForUpdate()->max('sequence_number') + 1)
                : ($this->extractSeq($request->nomor_sp) ?? $this->nextAvailableAutoSequence(null, (int) ($this->numberPeriodFromNomor($request->nomor_sp, 'SP')['year'] ?? now()->year)));

            // Hitung total dari items jika ada
            $items = $request->input('items', []);
            $calculatedTotal = $this->calculateItemsTotal($items);
            $nilaiSp = $request->nilai_sp ?: ($calculatedTotal > 0 ? $calculatedTotal : null);

            $ppbjAuto = $ppbjRecord;

            $nomorPemenang = $request->nomor_pemenang ?: ($ppbjAuto?->pemenang ?? null);
            $tanggalPemenang = $request->tanggal_pemenang ?: ($ppbjAuto?->tgl_pemenang ?? null);

            $sp = Sp::create([
                'nomor_sp' => $request->nomor_sp,
                'sequence_number' => $seq,
                'numbering_mode' => $oracleMode ? 'oracle' : 'auto',
                'created_by_user_id' => auth()->id(),
                'tanggal_sp' => $request->tanggal_sp ?: null,
                'nilai_sp' => $nilaiSp,
                'nomor_pr' => $nomorPr,
                'nilai_pr' => $request->nilai_pr ?: null,
                'nama_vendor' => $vendorName,
                'deskripsi_pengadaan' => $request->deskripsi_pengadaan,
                'pic' => $request->pic,
                'sph' => $request->sph ?: null,
                'tgl_sph' => $request->tgl_sph ?: null,
                'promised_date' => $request->promised_date ?: null,
                'rfq' => $request->rfq ?: null,
                'nomor_pemenang' => $nomorPemenang,
                'tanggal_pemenang' => $tanggalPemenang,
                'awal_kontrak' => $request->awal_kontrak ?: null,
                'akhir_kontrak' => $request->akhir_kontrak ?: null,
                'bidang_ip_itu' => $request->bidang_ip_itu ?: null,
                'penandatangan_sci' => $request->penandatangan_sci ?: null,
                'jabatan_sci' => $request->jabatan_sci ?: null,
            ]);

            $this->syncItems($sp, $items);

            // Link ke PPBJ
            if ($nomorPr) {
                if ($ppbjRecord && $ppbjRecord->status !== 'CANCELLED' && empty($ppbjRecord->awarding_sp)) {
                    $ppbjRecord->awarding_sp = $sp->nomor_sp;
                    $ppbjRecord->tgl_awarding_sp = $sp->tanggal_sp;
                    $ppbjRecord->tgl_spk = $sp->tanggal_sp;
                    $ppbjRecord->nilai_sp_spk = $sp->nilai_sp;
                    $ppbjRecord->sph = $sp->sph;
                    $ppbjRecord->tgl_sph = $sp->tgl_sph;
                    $ppbjRecord->promised_date = $request->promised_date ?: null;
                    $ppbjRecord->save();
                }
            }

            Cache::forget('sp:last_nomor');
            Cache::forget('sp:last_nomor:auto');
            Cache::forget('sp:last_nomor:oracle');
            Cache::forget('sp:suggest');

            return redirect()
                ->route('sp.index', $oracleMode ? ['mode' => 'oracle'] : [])
                ->with('success', $oracleMode ? 'Data SP Oracle berhasil disimpan!' : 'Data SP berhasil disimpan!');
            });
        } catch (QueryException $e) {
            return back()
                ->withErrors(['nomor_pr' => 'Nomor SP atau nomor PR sudah dipakai oleh data lain. Silakan refresh halaman dan cek data terbaru.'])
                ->withInput();
        }
    }

    // =========================================================
    // UPDATE
    // =========================================================
    public function update(Request $request, Sp $sp)
    {
        $oracleMode = $this->isOracleMode($request);
        $currentUser = $request->user();
        $currentUserId = $currentUser?->id;

        if ((int) $sp->created_by_user_id !== (int) $currentUserId && !$currentUser?->matchesOwnerLabel($sp->pic)) {
            $message = 'Data SP hanya bisa diedit oleh user pembuatnya.';

            if ($request->expectsJson()) {
                return response()->json(['message' => $message], 403);
            }

            return back()->withErrors(['edit' => $message])->withInput();
        }

        $request->merge([
            'nomor_sp' => $oracleMode
                ? trim($request->input('nomor_sp', ''))
                : $this->normalizeNumberPeriod($request->input('nomor_sp', ''), $request->input('tanggal_sp'), 'SP'),
            'nilai_sp' => $this->moneyToNullableFloat($request->input('nilai_sp')),
            'nilai_pr' => $this->moneyToNullableFloat($request->input('nilai_pr')),
        ]);

        $request->validate([
            'nomor_sp' => ['required', 'string', 'max:60', Rule::unique('sps', 'nomor_sp')->ignore($sp->id)],
            'tanggal_sp' => 'nullable|date',
            'nilai_sp' => 'nullable|numeric|min:0',
            'nomor_pr' => ['nullable', 'string', 'max:100', Rule::unique('sps', 'nomor_pr')->ignore($sp->id)],
            'nilai_pr' => 'nullable|numeric|min:0',
            'nama_vendor' => 'required|string|max:255',
            'deskripsi_pengadaan' => 'required|string',
            'pic' => 'required|string|max:100',
            'sph' => 'nullable|string|max:255',
            'tgl_sph' => 'nullable|date',
            'promised_date' => 'nullable|date',
            'rfq' => 'nullable|string|max:255',
            'nomor_pemenang' => 'nullable|string|max:255',
            'tanggal_pemenang' => 'nullable|date',
            'awal_kontrak' => 'nullable|date',
            'akhir_kontrak' => 'nullable|date',
            'bidang_ip_itu' => 'nullable|string|max:255',
            'penandatangan_sci' => 'nullable|string|max:255',
            'jabatan_sci' => 'nullable|string|max:255',
            'items' => 'nullable|array|max:50',
            'items.*.nama_barang' => 'nullable|string|max:60000',
            'items.*.satuan' => 'nullable|string|max:50',
            'items.*.jumlah' => 'nullable|string|max:50',
            'items.*.harga_satuan' => 'nullable|string|max:50',
            'items.*.tgl_pemenuhan' => 'nullable|date',
        ]);

        $this->validateSpModeValue($request, $oracleMode);

        if (!$oracleMode) {
            $this->validateNumberPeriod($request->nomor_sp, $request->tanggal_sp, 'SP', 'nomor_sp');
        }

        $nomorPr = $request->nomor_pr ?: null;
        $oldNomorPr = $sp->nomor_pr;

        if ($nomorPr) {
            $ppbjCheck = DB::table('ppbj')->where('ppbj_no', $nomorPr)->first();
            if ($ppbjCheck) {
                if ($ppbjCheck->status === 'CANCELLED') {
                    return back()->withErrors(['nomor_pr' => "PPBJ \"{$nomorPr}\" sudah di-CANCELLED!"])->withInput();
                }
                if (!empty($ppbjCheck->awarding_sp) && $ppbjCheck->awarding_sp !== $sp->nomor_sp) {
                    return back()->withErrors(['nomor_pr' => "PPBJ sudah terhubung dengan SP: {$ppbjCheck->awarding_sp}!"])->withInput();
                }
            }
        }

        try {
            return DB::transaction(function () use ($request, $sp, $nomorPr, $oldNomorPr, $oracleMode) {
            $newPpbj = null;

            if ($nomorPr) {
                $newPpbj = Ppbj::where('ppbj_no', $nomorPr)->lockForUpdate()->first();

                if ($newPpbj) {
                    if ($newPpbj->status === 'CANCELLED') {
                        return back()->withErrors(['nomor_pr' => "PPBJ \"{$nomorPr}\" sudah di-CANCELLED!"])->withInput();
                    }

                    if (!empty($newPpbj->awarding_sp) && $newPpbj->awarding_sp !== $sp->nomor_sp) {
                        return back()->withErrors(['nomor_pr' => "PPBJ sudah terhubung dengan SP: {$newPpbj->awarding_sp}!"])->withInput();
                    }
                }
            }

            $seq = $oracleMode
                ? $sp->sequence_number
                : ($this->extractSeq($request->nomor_sp) ?? $sp->sequence_number);

            // Hitung total dari items jika ada
            $items = $request->input('items', []);
            $calculatedTotal = $this->calculateItemsTotal($items);
            $nilaiSp = $request->nilai_sp ?: ($calculatedTotal > 0 ? $calculatedTotal : null);

            $ppbjAuto = $newPpbj;

            $nomorPemenang = $request->nomor_pemenang ?: ($ppbjAuto?->pemenang ?? null);
            $tanggalPemenang = $request->tanggal_pemenang ?: ($ppbjAuto?->tgl_pemenang ?? null);

            $sp->update([
                'nomor_sp' => $request->nomor_sp,
                'sequence_number' => $seq,
                'numbering_mode' => $oracleMode ? 'oracle' : 'auto',
                'tanggal_sp' => $request->tanggal_sp ?: null,
                'nilai_sp' => $nilaiSp,
                'nomor_pr' => $nomorPr,
                'nilai_pr' => $request->nilai_pr ?: null,
                'nama_vendor' => $request->nama_vendor,
                'deskripsi_pengadaan' => $request->deskripsi_pengadaan,
                'pic' => $request->pic,
                'sph' => $request->sph ?: null,
                'tgl_sph' => $request->tgl_sph ?: null,
                'promised_date' => $request->promised_date ?: null,
                'rfq' => $request->rfq ?: null,
                'nomor_pemenang' => $nomorPemenang,
                'tanggal_pemenang' => $tanggalPemenang,
                'awal_kontrak' => $request->awal_kontrak ?: null,
                'akhir_kontrak' => $request->akhir_kontrak ?: null,
                'bidang_ip_itu' => $request->bidang_ip_itu ?: null,
                'penandatangan_sci' => $request->penandatangan_sci ?: null,
                'jabatan_sci' => $request->jabatan_sci ?: null,
            ]);

            $this->syncItems($sp, $items);

            // Hapus link lama dari PPBJ
            if ($oldNomorPr && ($oldNomorPr !== $nomorPr)) {
                $oldPpbj = Ppbj::where('ppbj_no', $oldNomorPr)
                    ->where('awarding_sp', $sp->nomor_sp)
                    ->first();

                if ($oldPpbj) {
                    $oldPpbj->awarding_sp = null;
                    $oldPpbj->tgl_awarding_sp = null;
                    $oldPpbj->tgl_spk = null;
                    $oldPpbj->nilai_sp_spk = null;
                    $oldPpbj->sph = null;
                    $oldPpbj->tgl_sph = null;
                    $oldPpbj->promised_date = null;
                    $oldPpbj->save();
                }
            }

            // Set link baru ke PPBJ
            if ($nomorPr) {
                if ($newPpbj && $newPpbj->status !== 'CANCELLED') {
                    $newPpbj->awarding_sp = $sp->nomor_sp;
                    $newPpbj->tgl_awarding_sp = $sp->tanggal_sp;
                    $newPpbj->tgl_spk = $sp->tanggal_sp;
                    $newPpbj->nilai_sp_spk = $sp->nilai_sp;
                    $newPpbj->sph = $sp->sph;
                    $newPpbj->tgl_sph = $sp->tgl_sph;
                    $newPpbj->promised_date = $request->promised_date ?: null;
                    $newPpbj->save();
                }
            }

            Cache::forget('sp:last_nomor');
            Cache::forget('sp:last_nomor:auto');
            Cache::forget('sp:last_nomor:oracle');
            Cache::forget('sp:suggest');

            return redirect()
                ->route('sp.index', $oracleMode ? ['mode' => 'oracle'] : [])
                ->with('success', $oracleMode ? 'Data SP Oracle berhasil diperbarui!' : 'Data SP berhasil diperbarui!');
            });
        } catch (QueryException $e) {
            return back()
                ->withErrors(['nomor_pr' => 'Nomor SP atau nomor PR sudah dipakai oleh data lain. Silakan refresh halaman dan cek data terbaru.'])
                ->withInput();
        }
    }

    // =========================================================
    // DESTROY
    // =========================================================
    public function destroy(Request $request, Sp $sp)
    {
        $request->validate([
            'creator_password' => ['required', 'string', 'min:1', 'max:255'],
        ], [
            'creator_password.required' => 'Password pembuat SP wajib diisi untuk menghapus data.',
        ]);

        $user = $request->user();
        $sp->loadMissing('createdBy');
        $verifier = $sp->createdBy ?: $user;

        if (!$verifier) {
            return response()->json([
                'message' => 'User verifikasi tidak ditemukan, sehingga password tidak bisa dicek.',
            ], 422);
        }

        $currentUserId = $user?->id ?: 'guest';
        $ipHash = sha1((string) $request->ip());
        $attemptKey = "sp_delete_password_attempts:{$sp->id}:{$verifier->id}:{$currentUserId}:{$ipHash}";
        $lockKey = "sp_delete_password_lock:{$sp->id}:{$verifier->id}:{$currentUserId}:{$ipHash}";

        if ($lockedUntil = Cache::get($lockKey)) {
            $lockedUntilAt = Carbon::parse($lockedUntil);
            $retryAfter = (int) ceil(max(1, now()->diffInSeconds($lockedUntilAt, false)));

            return response()->json([
                'message' => 'Terlalu banyak percobaan password salah. Silakan coba lagi sekitar ' . ceil($retryAfter / 60) . ' menit lagi.',
                'locked' => true,
                'retry_after' => $retryAfter,
                'locked_until' => $lockedUntilAt->toIso8601String(),
            ], 429);
        }

        if (!Hash::check((string) $request->creator_password, (string) $verifier->password)) {
            $attempts = ((int) Cache::get($attemptKey, 0)) + 1;
            $remainingAttempts = max(0, 3 - $attempts);
            Cache::put($attemptKey, $attempts, now()->addMinutes(15));

            if ($attempts >= 3) {
                $lockedUntil = now()->addMinutes(15);
                Cache::put($lockKey, $lockedUntil->toIso8601String(), $lockedUntil);
                Cache::forget($attemptKey);

                return response()->json([
                    'message' => 'Password salah 3 kali. Aksi hapus SP dikunci selama 15 menit.',
                    'locked' => true,
                    'retry_after' => 15 * 60,
                    'locked_until' => $lockedUntil->toIso8601String(),
                ], 429);
            }

            return response()->json([
                'message' => 'Password pembuat SP tidak sesuai. Sisa percobaan: ' . $remainingAttempts . '.',
                'attempts_remaining' => $remainingAttempts,
            ], 422);
        }

        Cache::forget($attemptKey);
        Cache::forget($lockKey);

        DB::transaction(function () use ($sp, $user, $verifier, $request) {
            \App\Models\ActivityLog::create([
                'user_id' => $user?->id,
                'model_type' => Sp::class,
                'model_id' => $sp->id,
                'action' => 'deleted',
                'description' => 'SP dihapus: ' . ($sp->nomor_sp ?: 'SP-' . $sp->id),
                'changes' => [
                    'nomor_sp' => $sp->nomor_sp,
                    'nomor_pr' => $sp->nomor_pr,
                    'nilai_sp' => $sp->nilai_sp,
                    'deleted_by' => $user?->email,
                    'verifier_email' => $verifier->email,
                    'ip' => $request->ip(),
                ],
            ]);

            if ($sp->nomor_pr) {
                $ppbj = Ppbj::where('ppbj_no', $sp->nomor_pr)
                    ->where('awarding_sp', $sp->nomor_sp)
                    ->first();

                if ($ppbj) {
                    $ppbj->awarding_sp = null;
                    $ppbj->tgl_awarding_sp = null;
                    $ppbj->tgl_spk = null;
                    $ppbj->nilai_sp_spk = null;
                    $ppbj->sph = null;
                    $ppbj->tgl_sph = null;
                    $ppbj->promised_date = null;
                    $ppbj->save();
                }
            }

            $sp->delete();
            Cache::forget('sp:last_nomor');
            Cache::forget('sp:last_nomor:auto');
            Cache::forget('sp:last_nomor:oracle');
            Cache::forget('sp:suggest');
        });

        return response()->json([
            'ok' => true,
            'message' => 'Data SP berhasil dihapus.',
        ]);
    }

    // =========================================================
    // CETAK SP → WORD (dengan tabel items dinamis)
    // =========================================================
    public function cetakSp(Sp $sp)
    {
        $sp->load('items');
        $nilaiAcuan = $this->hitungNilaiAcuan($sp);

        // 500 juta ke atas memakai template Kontrak Ringkas Jasa Subkon > 500 jt.
        // Jangan arahkan ke kontrak lama, karena formatnya berbeda dari template yang diupload.
        if ($nilaiAcuan >= 500_000_000) {
            return $this->cetakKontrakRingkas500($sp, $nilaiAcuan);
        }

        // 300 juta s.d. sebelum 500 juta memakai template Kontrak Ringkas Jasa Subkon > 300 jt.
        if ($nilaiAcuan >= 300_000_000 && $nilaiAcuan < 500_000_000) {
            return $this->cetakKontrakRingkas300($sp, $nilaiAcuan);
        }

        // 50 juta s.d. sebelum 300 juta tetap memakai template kontrak lama.
        if ($nilaiAcuan >= 50_000_000) {
            return $this->cetakKontrak($sp, $nilaiAcuan);
        }

        $phpWord = new PhpWord();
        $phpWord->setDefaultFontName('Calibri');
        $phpWord->setDefaultFontSize(11);
        $phpWord->setDefaultParagraphStyle(['spaceAfter' => 0, 'spaceBefore' => 0]);

        $p0 = ['spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pC = ['spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0, 'alignment' => 'center'];
        $pR = ['spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0, 'alignment' => 'right'];
        $fs = ['size' => 11, 'name' => 'Calibri'];
        $fb = ['bold' => true, 'size' => 11, 'name' => 'Calibri'];

        $section = $phpWord->addSection([
            'pageSizeW' => 11906,
            'pageSizeH' => 16838,
            'marginTop' => 2500,
            'marginBottom' => 1800,
            'marginLeft' => 1418,
            'marginRight' => 1134,
            'headerHeight' => 720,
        ]);

        // === JUDUL ===
        $section->addText(
            'Surat Pesanan',
            ['bold' => true, 'size' => 16, 'name' => 'Calibri'],
            ['alignment' => 'center', 'spaceAfter' => 0]
        );
        $section->addTextBreak(1, $p0);

        // === NOMOR & TANGGAL ===
        $tgl = $sp->tanggal_sp
            ? \Carbon\Carbon::parse($sp->tanggal_sp)->locale('id')->translatedFormat('d F Y')
            : now()->locale('id')->translatedFormat('d F Y');

        $noBdr = [
            'top' => ['borderSize' => 0, 'borderColor' => 'FFFFFF', 'space' => 0],
            'bottom' => ['borderSize' => 0, 'borderColor' => 'FFFFFF', 'space' => 0],
            'left' => ['borderSize' => 0, 'borderColor' => 'FFFFFF', 'space' => 0],
            'right' => ['borderSize' => 0, 'borderColor' => 'FFFFFF', 'space' => 0],
        ];

        $nt = $section->addTable(['borderSize' => 0, 'borderColor' => 'FFFFFF', 'cellMargin' => [0, 60, 0, 60]]);
        $nt->addRow();
        $nt->addCell(1500, ['borders' => $noBdr])->addText('Nomor', $fb, $p0);
        $nt->addCell(150, ['borders' => $noBdr])->addText(':', $fs, $p0);
        $nt->addCell(5600, ['borders' => $noBdr])->addText($sp->nomor_sp, $fs, $p0);
        $nt->addRow();
        $nt->addCell(1500, ['borders' => $noBdr])->addText('Tanggal', $fb, $p0);
        $nt->addCell(150, ['borders' => $noBdr])->addText(':', $fs, $p0);
        $nt->addCell(5600, ['borders' => $noBdr])->addText($tgl, $fs, $p0);

        $section->addTextBreak(1, $p0);

        // === KEPADA YTH ===
        $section->addText('Kepada Yth,', $fs, $p0);
        $section->addText($sp->nama_vendor, $fb, $p0);

        $vendor = Vendor::where('nama_vendor', $sp->nama_vendor)->first();
        $alamat = ($vendor && $vendor->alamat) ? $vendor->alamat : '-';
        $telp = ($vendor && $vendor->telepon) ? $vendor->telepon : '-';
        $fax = ($vendor && $vendor->fax) ? $vendor->fax : '-';

        foreach (explode("\n", $alamat) as $baris) {
            if (trim($baris))
                $section->addText(trim($baris), $fs, $p0);
        }
        $section->addTextBreak(1, $p0);

        // === TABEL TELP & FAX ===
        $tf = $section->addTable(['borderSize' => 0, 'borderColor' => 'FFFFFF', 'cellMargin' => [0, 60, 0, 60]]);
        $tf->addRow();
        $tf->addCell(700, ['borders' => $noBdr])->addText('Telp', $fb, $p0);
        $tf->addCell(100, ['borders' => $noBdr])->addText(':', $fs, $p0);
        $tf->addCell(6450, ['borders' => $noBdr])->addText($telp, $fs, $p0);
        $tf->addRow();
        $tf->addCell(700, ['borders' => $noBdr])->addText('Fax', $fb, $p0);
        $tf->addCell(100, ['borders' => $noBdr])->addText(':', $fs, $p0);
        $tf->addCell(6450, ['borders' => $noBdr])->addText($fax, $fs, $p0);

        $section->addTextBreak(1, $p0);
        $section->addText('Dengan hormat,', $fs, $p0);
        $section->addTextBreak(1, $p0);

        // === PERIHAL ===
        $prRun = $section->addTextRun($p0);
        $prRun->addText('Perihal', $fs);
        $prRun->addText("\t: " . strtoupper($sp->deskripsi_pengadaan), $fb);

        $section->addTextBreak(1, $p0);

        // === BODY ===
        $sphInfo = '';
        if ($sp->sph) {
            $sphInfo = ' Nomor ' . $sp->sph;
            if ($sp->tgl_sph) {
                $sphInfo .= ' Tanggal ' . \Carbon\Carbon::parse($sp->tgl_sph)->locale('id')->translatedFormat('d F Y');
            }
        } else {
            $sphInfo = ' Nomor (............................) Tanggal (............................)';
        }

        $bodyText = 'Menunjuk surat penawaran harga ' . $sp->nama_vendor . $sphInfo . ' serta hasil negosiasi, bersama ini kami memesan barang dengan perincian sebagai berikut:';
        $bodyRun = $section->addTextRun($p0);
        $bodyParts = preg_split('/(\(\.+\))/', $bodyText, -1, PREG_SPLIT_DELIM_CAPTURE);
        foreach ($bodyParts as $bodyPart) {
            if (preg_match('/^\(\.+\)$/', $bodyPart)) {
                $bodyRun->addText($bodyPart, $fb);
            } else {
                $bodyRun->addText($bodyPart, $fs);
            }
        }
        $section->addTextBreak(1, $p0);

        // ==============================================
// TABEL PENGADAAN (FORMAT SUB-ITEM)
// ==============================================
        $sp->load('items');
        $items = $sp->items;

        $tbl = $section->addTable([
            'borderSize' => 6,
            'borderColor' => '000000',
            'cellMargin' => 60,
        ]);

        $h = ['bold' => true, 'size' => 11, 'name' => 'Calibri'];
        $c = ['size' => 11, 'name' => 'Calibri'];
        $cb = ['bold' => true, 'size' => 11, 'name' => 'Calibri'];
        $ph = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0];
        $pr = ['alignment' => 'right', 'spaceAfter' => 0, 'spaceBefore' => 0];
        $pl = ['alignment' => 'left', 'spaceAfter' => 0, 'spaceBefore' => 0];
        $vC = ['valign' => 'center'];
        $vT = ['valign' => 'top'];

        // Fungsi format angka
        $fmtNum = function ($num) {
            if (!$num && $num !== 0)
                return '-';
            return $this->formatMoney($num);
        };

        // Header Row
        $tbl->addRow();
        $tbl->addCell(600, $vC)->addText('No', $h, $ph);
        $tbl->addCell(4800, $vC)->addText('Nama Barang / Jasa', $h, $ph);
        $tbl->addCell(1200, $vC)->addText('Satuan', $h, $ph);
        $tbl->addCell(1200, $vC)->addText('Jumlah', $h, $ph);
        $tbl->addCell(1600, $vC)->addText('Harga Satuan', $h, $ph);
        $tbl->addCell(1600, $vC)->addText('Total', $h, $ph);

        // Parse items dengan struktur parent-child berdasarkan indentasi HTML
        $parsedItems = [];
        $parentIdx = 0;

        foreach ($items as $item) {
            $namaHtml = $item->nama_barang ?? '';

            // Deteksi apakah ini sub-item (memiliki indent atau bullet/number di awal)
            $isSubItem = false;
            $subPrefix = '';

            // Cek apakah diawali dengan angka+titik (1. , 2. , dll) atau bullet (- , • , dll)
            if (preg_match('/^(\d+)[\.\)]\s*/', $namaHtml, $m)) {
                $isSubItem = true;
                $subPrefix = $m[1] . '. ';
            } elseif (preg_match('/^[\-\•]\s*/', $namaHtml, $m)) {
                $isSubItem = true;
                $subPrefix = '• ';
            }

            // Cek indentasi dari style
            if (preg_match('/margin-left\s*:\s*(\d+)px/i', $namaHtml, $m) && (int) $m[1] > 20) {
                $isSubItem = true;
            }

            // Clean HTML untuk tampilan
            $cleanNama = strip_tags(str_replace(['<br>', '<br/>', '<br />'], "\n", $namaHtml));
            $cleanNama = preg_replace('/^\s*[\d\.\-\•]+\s*/', '', $cleanNama);
            $cleanNama = trim($cleanNama);

            if (!$isSubItem) {
                $parentIdx++;
                $parsedItems[] = [
                    'type' => 'parent',
                    'no' => $parentIdx,
                    'nama' => $cleanNama,
                    'nama_raw' => $namaHtml, // Untuk render HTML jika perlu
                    'satuan' => $item->satuan ?? '-',
                    'jumlah' => $item->jumlah ?? '-',
                    'harga_satuan' => $item->harga_satuan,
                    'subtotal' => $item->subtotal,
                ];
            } else {
                // Sub-item, attach ke parent terakhir
                if (empty($parsedItems)) {
                    // Jika tidak ada parent, buat parent dummy
                    $parsedItems[] = [
                        'type' => 'parent',
                        'no' => 1,
                        'nama' => $sp->deskripsi_pengadaan,
                        'nama_raw' => $sp->deskripsi_pengadaan,
                        'satuan' => '-',
                        'jumlah' => '-',
                        'harga_satuan' => null,
                        'subtotal' => null,
                    ];
                }

                $lastParentIdx = count($parsedItems) - 1;
                if (!isset($parsedItems[$lastParentIdx]['children'])) {
                    $parsedItems[$lastParentIdx]['children'] = [];
                }
                $parsedItems[$lastParentIdx]['children'][] = [
                    'prefix' => $subPrefix,
                    'nama' => $cleanNama,
                    'nama_raw' => $namaHtml,
                ];
            }
        }

        // Jika tidak ada items, gunakan deskripsi pengadaan sebagai fallback
        if (empty($parsedItems)) {
            $parsedItems[] = [
                'type' => 'parent',
                'no' => 1,
                'nama' => $sp->deskripsi_pengadaan,
                'nama_raw' => $sp->deskripsi_pengadaan,
                'satuan' => 'Cabang Pekanbaru',
                'jumlah' => '1',
                'harga_satuan' => $sp->nilai_sp,
                'subtotal' => $sp->nilai_sp,
                'children' => [],
            ];
        }

        // Render tabel
        $grandTotal = 0;
        foreach ($parsedItems as $item) {
            $hargaSatuan = $this->moneyToFloat($item['harga_satuan'] ?? 0);
            $subtotal = $this->moneyToFloat($item['subtotal'] ?? 0);
            $grandTotal += $subtotal;

            // Row Parent
            $tbl->addRow();
            $tbl->addCell(600, $vC)->addText((string) $item['no'], $c, $ph);

            // Nama Barang - render HTML jika ada
            $namaCell = $tbl->addCell(4800, $vT);
            $this->renderHtmlToCell($namaCell, $item['nama_raw'], $pl);

            $tbl->addCell(1400, $vC)->addText($item['satuan'], $c, $ph);
            $tbl->addCell(700, $vC)->addText($item['jumlah'] ?? '-', $c, $ph);
            $tbl->addCell(1600, $vC)->addText($fmtNum($hargaSatuan), $c, $pr);
            $tbl->addCell(1600, $vC)->addText($fmtNum($subtotal), $c, $pr);

            // Rows Children (sub-items) - dengan vMerge untuk kolom lain
            if (!empty($item['children'])) {
                $childCount = count($item['children']);

                foreach ($item['children'] as $childIdx => $child) {
                    $tbl->addRow();

                    // Kolom No - merge dari row parent
                    $tbl->addCell(600, $vC);

                    // Kolom Nama Barang - dengan indentasi
                    $childCell = $tbl->addCell(4800, $vT);
                    $childRun = $childCell->addTextRun($pl);
                    $childRun->addText('     ' . $child['prefix'], $c);
                    $this->renderHtmlInline($childRun, $child['nama_raw']);

                    // Kolom lainnya - merge dari row parent
                    $tbl->addCell(1400, $vC);
                    $tbl->addCell(700, $vC);
                    $tbl->addCell(1600, $vC);
                    $tbl->addCell(1600, $vC);
                }
            }
        }

        if ($grandTotal <= 0 && $sp->nilai_sp) {
            $grandTotal = $this->moneyToFloat($sp->nilai_sp);
        }

        // Hitung PPN dan Total
        $ppnAmount = round($grandTotal * 0.11);
        $totalWithPpn = $grandTotal + $ppnAmount;
        $grandTotalFmt = $fmtNum($grandTotal);
        $ppnFmt = $fmtNum($ppnAmount);
        $totalFmt = $fmtNum($totalWithPpn);

        // Teks PPBJ untuk catatan
        $catPpbj = '';

        if ($sp->nomor_pr) {
            $ppbjCatatan = Ppbj::where('ppbj_no', $sp->nomor_pr)->first();

            $tglPpbjCatatan = $ppbjCatatan && !empty($ppbjCatatan->tgl_ppbj)
                ? \Carbon\Carbon::parse($ppbjCatatan->tgl_ppbj)->locale('id')->translatedFormat('d F Y')
                : null;

            $catPpbj = 'Memenuhi PPBJ Cabang Pekanbaru Nomor PR ' . $sp->nomor_pr;

            if ($tglPpbjCatatan) {
                $catPpbj .= ' tanggal ' . $tglPpbjCatatan;
            }
        }

        $pSumL = ['alignment' => 'left', 'spaceAfter' => 0, 'spaceBefore' => 0];
        $pSumR = ['alignment' => 'right', 'spaceAfter' => 0, 'spaceBefore' => 0];

        // === ROW 1: "Catatan :" | Jumlah | nilai ===
        $tbl->addRow();
        $tbl->addCell(7500, ['gridSpan' => 4, 'valign' => 'top'])
            ->addText('Catatan :', $c, $pl);
        $tbl->addCell(1600, $vC)->addText('Jumlah', $cb, $pSumL);
        $tbl->addCell(1600, $vC)->addText($grandTotalFmt, $c, $pSumR);

        // === ROW 2: teks PPBJ (vMerge restart) | PPN 11% | nilai ===
        $tbl->addRow();
        $tbl->addCell(7500, ['gridSpan' => 4, 'vMerge' => 'restart', 'valign' => 'top'])
            ->addText($catPpbj, $c, $pl);
        $tbl->addCell(1600, $vC)->addText('PPN 11%', $cb, $pSumL);
        $tbl->addCell(1600, $vC)->addText($ppnFmt, $c, $pSumR);

        // === ROW 3: (teks PPBJ continue) | Total | nilai ===
        $tbl->addRow();
        $tbl->addCell(7500, ['gridSpan' => 4, 'vMerge' => 'continue']);
        $tbl->addCell(1600, $vC)->addText('Total', $cb, $pSumL);
        $tbl->addCell(1600, $vC)->addText($totalFmt, $cb, $pSumR);

        // === ROW Terbilang (gridSpan 6 penuh) ===
        $tbl->addRow();
        $terbCell = $tbl->addCell(9300, ['gridSpan' => 6]);
        if ($totalWithPpn > 0) {
            $terbRun = $terbCell->addTextRun($pl);
            $terbRun->addText('Terbilang', $cb);
            $terbRun->addText(' : ', $c);
            $terbRun->addText(
                '"' . ucfirst($this->terbilang($totalWithPpn)) . ' Rupiah"',
                $cb
            );
        }

        $section->addTextBreak(1, $p0);

        // ==============================================
        // KLAUSA
        // ==============================================
        $noBdrTbl = ['borderSize' => 0, 'borderColor' => 'FFFFFF', 'cellMargin' => [0, 60, 0, 60]];

        $penyerahanText = $sp->promised_date
            ? 'Selambat-lambatnya ' . \Carbon\Carbon::parse($sp->promised_date)->locale('id')->translatedFormat('d F Y') . ' sesuai dengan perjanjian'
            : 'Selambat-lambatnya (......................) sesuai dengan perjanjian';

        foreach ([
            'Penyerahan barang' => $penyerahanText,
            'Denda' => '1% (Satu permil) perihal keterlambatan dari jumlah harga sebelum pajak',
            'Tempat Penyerahan Barang' => 'PT. SUCOFINDO (PERSERO) Jl. Jend. A. Yani No.79',
        ] as $key => $val) {
            $ct = $section->addTable($noBdrTbl);
            $ct->addRow();
            $ct->addCell(2600, ['borders' => $noBdr])->addText($key, $fs, $p0);
            $ct->addCell(100, ['borders' => $noBdr])->addText(':', $fs, $p0);
            $valCell = $ct->addCell(6544, ['borders' => $noBdr]);
            $parts = preg_split('/(\([^)]*\))/', $val, -1, PREG_SPLIT_DELIM_CAPTURE);
            if (count($parts) > 1) {
                $run = $valCell->addTextRun($p0);
                foreach ($parts as $part) {
                    if (preg_match('/^\(\.+\)$/', $part)) {
                        $run->addText($part, $fb);
                    } else {
                        $run->addText($part, $fs);
                    }
                }
            } else {
                $valCell->addText($val, $fs, $p0);
            }
        }

        $payTbl = $section->addTable($noBdrTbl);
        $payTbl->addRow();
        $payTbl->addCell(2600, ['borders' => $noBdr])->addText('Pembayaran', $fs, $p0);
        $payTbl->addCell(100, ['borders' => $noBdr])->addText(':', $fs, $p0);
        $payVal = $payTbl->addCell(6544, ['borders' => $noBdr]);
        $payVal->addText(
            'Secara sekaligus 100% (Seratus Persen) dibayarkan setelah barang diterima, dibayarkan paling lambat selama 45 (Empat Puluh Lima) hari kalender setelah dokumen tagihan lengkap diterima oleh Keuangan dan Akuntansi dengan melampirkan:',
            $fs,
            $p0
        );

        $docs = [
            'Asli surat pemesanan yang telah ditandatangani, copy surat ijin penomoran faktur Pajak dari KPP setempat',
            'Copy Specimen tanda tangan Faktur Pajak yang dilaporkan ke KPP setempat',
            'Copy Surat Pengukuhan sebagai Pengusaha Kena Pajak',
            'Kwitansi rangkap 2 (dua)',
            '1 (satu) Asli Lembar kesatu Faktur Pajak dan 2 (dua) copy',
            'Copy/Salinan Faktur Pajak yang sudah diisi dengan benar',
            'Surat Setoran Pajak (SSP) rangkap 5 (lima) diisi sesuai ketentuan yang berlaku',
            'Faktur Penjualan atau Invoice rangkap 2 (dua)',
            'Asli Bukti Penerimaan Gudang (BPG)',
            'Asli Surat Jalan',
            'Nomor Rekening Bank Perusahaan Saudara',
            'Asli Surat Pemesanan yang telah ditandatangani oleh kedua belah pihak dan bermatrai cukup',
        ];

        $docTbl = $payVal->addTable($noBdrTbl);
        foreach ($docs as $doc) {
            $docTbl->addRow();
            $docTbl->addCell(300, ['borders' => $noBdr])->addText('•', $fs, $p0);
            $docTbl->addCell(6244, ['borders' => $noBdr])->addText($doc, $fs, $p0);
        }

        $section->addTextBreak(2, $p0);

        // ==============================================
        // TABEL TANDA TANGAN
        // ==============================================
        $sigTbl = $section->addTable([
            'borderSize' => 6,
            'borderColor' => '000000',
            'cellMargin' => 80,
        ]);

        $sigHdr = ['bold' => true, 'size' => 11, 'name' => 'Calibri'];
        $sigNrm = ['size' => 11, 'name' => 'Calibri'];
        $sigUnd = ['bold' => true, 'underline' => 'single', 'size' => 11, 'name' => 'Calibri'];
        $sigPC = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0];
        $sigP0 = ['spaceAfter' => 0, 'spaceBefore' => 0];
        $blueFill = ['fill' => 'DEEAF6', 'type' => \PhpOffice\PhpWord\Style\Shading::PATTERN_CLEAR];

        // Row 1: Header biru
        $sigTbl->addRow();
        $lc1 = $sigTbl->addCell(4500, ['shading' => $blueFill]);
        $lc1->addText('PT. SUCOFINDO (PERSERO)', $sigHdr, $sigPC);
        $lc1->addText('Cabang Pekanbaru', $sigHdr, $sigPC);
        $rc1 = $sigTbl->addCell(4500, ['shading' => $blueFill]);
        $rc1->addText($sp->nama_vendor, $sigHdr, $sigPC);

        // Row 2: Ruang TTD
        $sigTbl->addRow(1600);
        $sigTbl->addCell(4500)->addText('', $sigNrm, $sigP0);
        $sigTbl->addCell(4500)->addText('', $sigNrm, $sigP0);

        $direkturVendor = ($vendor && trim((string) $vendor->direktur) !== '')
            ? trim($vendor->direktur)
            : '(..................................)';

        // Row 3: Nama
        $sigTbl->addRow();
        $sigTbl->addCell(4500)->addText('Jumelda', $sigUnd, $sigPC);
        $sigTbl->addCell(4500)->addText($direkturVendor, $sigUnd, $sigPC);

        // Row 4: Jabatan
        $sigTbl->addRow();
        $sigTbl->addCell(4500)->addText('Pj. Kepala Bidang Dukungan Bisnis', $sigNrm, $sigPC);
        $sigTbl->addCell(4500)->addText('Ketua', $sigNrm, $sigPC);

        // === GENERATE FILE ===
        $cleanDesc = preg_replace('/[\r\n]+/', ' ', $sp->deskripsi_pengadaan);
        $cleanDesc = preg_replace('/[^A-Za-z0-9\s\-]/', '', $cleanDesc);
        $cleanDesc = trim(preg_replace('/\s+/', ' ', $cleanDesc));
        $shortDesc = strlen($cleanDesc) > 40 ? substr($cleanDesc, 0, 40) : $cleanDesc;

        $filename = 'Surat Pesanan ' . $shortDesc . '.docx';
        $tempPath = storage_path('app/sp_' . $sp->id . '_' . Str::random(8) . '.docx');

        IOFactory::createWriter($phpWord, 'Word2007')->save($tempPath);

        // === INJECT KOP SURAT ===
        $imagePath = public_path('images/kop-surat-sp.jpg');
        $imagePath2 = public_path('images/kop-surat-sp2.jpg');
        if (file_exists($imagePath)) {
            $this->injectHeaderWatermark($tempPath, $imagePath, file_exists($imagePath2) ? $imagePath2 : null);
        }

        if (!file_exists($tempPath) || filesize($tempPath) === 0) {
            $fallbackPath = storage_path('app/fallback_' . $filename);
            IOFactory::createWriter($phpWord, 'Word2007')->save($fallbackPath);
            return response()->download($fallbackPath, $filename)->deleteFileAfterSend(true);
        }

        return response()->download($tempPath, $filename)->deleteFileAfterSend(true);
    }


    public function cetakKontrakRingkas300(Sp $sp, ?float $nilaiAcuan = null)
    {
        $sp->load('items');

        $phpWord = new PhpWord();
        \PhpOffice\PhpWord\Settings::setOutputEscapingEnabled(true);
        $phpWord->setDefaultFontName('Arial');
        $phpWord->setDefaultFontSize(11);
        $phpWord->setDefaultParagraphStyle(['spaceAfter' => 90, 'spaceBefore' => 0, 'lineHeight' => 1.05]);

        $fs = ['size' => 11, 'name' => 'Arial'];
        $fb = ['bold' => true, 'size' => 11, 'name' => 'Arial'];
        $fi = ['italic' => true, 'size' => 11, 'name' => 'Arial'];
        $fbi = ['bold' => true, 'italic' => true, 'size' => 11, 'name' => 'Arial'];
        $fu = ['underline' => 'single', 'size' => 11, 'name' => 'Arial'];
        $fbu = ['bold' => true, 'underline' => 'single', 'size' => 11, 'name' => 'Arial'];

        $p0 = ['spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pJ = ['alignment' => 'both', 'spaceAfter' => 90, 'spaceBefore' => 0, 'lineHeight' => 1.05];
        $pC = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pR = ['alignment' => 'right', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pL = ['alignment' => 'left', 'spaceAfter' => 90, 'spaceBefore' => 0, 'lineHeight' => 1.05];

        $section = $phpWord->addSection([
            'pageSizeW' => 11906,
            'pageSizeH' => 16838,
            'marginTop' => 1750,
            'marginBottom' => 1304,
            'marginLeft' => 1418,
            'marginRight' => 1418,
            'headerHeight' => 737,
            'footerHeight' => 709,
        ]);

        $footer = $section->addFooter();
        $footer->addPreserveText('Hal {PAGE} dari {SECTIONPAGES}', ['size' => 11, 'name' => 'Arial'], [
            'alignment' => 'right',
            'spaceAfter' => 0,
            'spaceBefore' => 0,
        ]);

        $vendor = Vendor::where('nama_vendor', $sp->nama_vendor)->first();
        $ppbj = $sp->nomor_pr ? Ppbj::where('ppbj_no', $sp->nomor_pr)->first() : null;

        $vendorUp = strtoupper(trim((string) $sp->nama_vendor));
        $alamatV = ($vendor && trim((string) ($vendor->alamat ?? '')) !== '') ? trim((string) $vendor->alamat) : '(.....................................)';
        $npwpV = ($vendor && trim((string) ($vendor->npwp ?? '')) !== '') ? trim((string) $vendor->npwp) : '(.............................)';
        $direktur = ($vendor && trim((string) ($vendor->direktur ?? '')) !== '') ? trim((string) $vendor->direktur) : '(..............................)';
        $jabatanVendor = ($vendor && trim((string) ($vendor->jabatan ?? '')) !== '') ? trim((string) $vendor->jabatan) : '..............................';

        $bidangIpItu = trim((string) ($sp->bidang_ip_itu ?? ''));
        $bidangIpItu = $bidangIpItu !== '' ? $bidangIpItu : 'KEPALA BIDANG DUKUNGAN BISNIS';

        $penandatanganSci = trim((string) ($sp->penandatangan_sci ?? ''));
        $penandatanganSci = $penandatanganSci !== '' ? $penandatanganSci : 'Bambang Harwanta';

        $jabatanSci = trim((string) ($sp->jabatan_sci ?? ''));
        $jabatanSci = $jabatanSci !== '' ? $jabatanSci : 'Pj. Kepala Cabang';

        $rfqText = trim((string) ($sp->rfq ?? ''));
        $rfqText = $rfqText !== '' ? $rfqText : '.......';

        $tgl = $sp->tanggal_sp
            ? \Carbon\Carbon::parse($sp->tanggal_sp)->locale('id')->translatedFormat('d F Y')
            : now()->locale('id')->translatedFormat('d F Y');
        $tglPakta = now()->locale('id')->translatedFormat('d F Y');

        $tglPph = (!empty($ppbj?->tgl_spph))
            ? \Carbon\Carbon::parse($ppbj->tgl_spph)->locale('id')->translatedFormat('d F Y')
            : '(.................)';
        $noPph = !empty($ppbj?->spph_rfq_1) ? $ppbj->spph_rfq_1 : '(.................)';

        $noPemenang = !empty($sp->nomor_pemenang)
            ? $sp->nomor_pemenang
            : (!empty($ppbj?->pemenang) ? $ppbj->pemenang : '(.................)');
        $tglPemenangRaw = !empty($sp->tanggal_pemenang)
            ? $sp->tanggal_pemenang
            : ($ppbj?->tgl_pemenang ?? null);
        $tglPemenang = !empty($tglPemenangRaw)
            ? \Carbon\Carbon::parse($tglPemenangRaw)->locale('id')->translatedFormat('d F Y')
            : '(.................)';

        $tglPr = (!empty($ppbj?->tgl_ppbj))
            ? \Carbon\Carbon::parse($ppbj->tgl_ppbj)->locale('id')->translatedFormat('d F Y')
            : ((!empty($ppbj?->tgl_terima_pr)) ? \Carbon\Carbon::parse($ppbj->tgl_terima_pr)->locale('id')->translatedFormat('d F Y') : '(....................)');

        $tglAwalKontrak = !empty($sp->awal_kontrak)
            ? \Carbon\Carbon::parse($sp->awal_kontrak)->locale('id')->translatedFormat('d F Y')
            : '(....................)';
        $tglAkhirKontrak = !empty($sp->akhir_kontrak)
            ? \Carbon\Carbon::parse($sp->akhir_kontrak)->locale('id')->translatedFormat('d F Y')
            : '(....................)';

        $deskripsi = mb_strtoupper(trim((string) $sp->deskripsi_pengadaan), 'UTF-8');

        $items = $sp->items;
        $subtotal = 0.0;
        foreach ($items as $it) {
            $subtotal += $this->moneyToFloat($it->subtotal ?? 0);
        }
        if ($subtotal <= 0 && $sp->nilai_sp) {
            $subtotal = $this->moneyToFloat($sp->nilai_sp);
        }
        $ppn = round($subtotal * 0.11);
        $total = $subtotal + $ppn;
        $jampel5 = round($total * 0.05, 2);

        $fmt = fn($n) => $this->formatMoney($n);
        $terbilangSubtotal = ucwords($this->terbilang($subtotal));
        $terbilangTotal = ucwords($this->terbilang($total));
        $terbilangJampel = ucwords($this->terbilang(round($jampel5)));

        $cleanText = function (?string $text): string {
            $text = (string) $text;
            $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
            $text = str_replace(['<br>', '<br/>', '<br />'], "\n", $text);
            $text = trim(strip_tags($text));
            return preg_replace('/[ \t]+/', ' ', $text) ?: '-';
        };

        $addPara = function (string $text, array $pStyle = null, array $extraBold = []) use ($section, $fs, $fb, $pJ) {
            $this->kontrakParagraf($section, $text, $pStyle ?? $pJ, $fs, $fb, $extraBold);
        };

        $addNo = function (string $no, string $text, int $depth = 0, array $extraBold = []) use ($addPara, $pJ) {
            $left = $depth === 0 ? 480 : 840;
            $hanging = $depth === 0 ? 480 : 360;
            $style = array_merge($pJ, ['indentation' => ['left' => $left, 'hanging' => $hanging]]);
            $addPara($no . "\t" . $text, $style, $extraBold);
        };

        $pPasal = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 180, 'lineHeight' => 1.0];
        $pPasalLine = ['alignment' => 'center', 'spaceAfter' => 120, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $addPasal = function (string $no, array $judulLines) use ($section, $fb, $pPasal, $pPasalLine) {
            $section->addText('PASAL ' . $no, $fb, $pPasal);
            foreach ($judulLines as $idx => $line) {
                $section->addText($line, $fb, $idx === count($judulLines) - 1 ? $pPasalLine : ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0]);
            }
        };

        // ===================== HALAMAN 1: JUDUL DAN PEMBUKA =====================
        $titleStyle = ['bold' => true, 'size' => 11, 'name' => 'Arial'];
        $pTitleLine = [
            'alignment' => 'center',
            'spaceAfter' => 0,
            'spaceBefore' => 0,
            'borderBottomSize' => 12,
            'borderBottomColor' => '000000',
        ];

        $section->addText('KONTRAK PENGADAAN', $titleStyle, $pC);
        $section->addText($deskripsi, $titleStyle, $pC);
        $section->addText('UNTUK', $fb, $pC);
        $section->addText('PT SUPERINTENDING COMPANY OF INDONESIA (PERSERO)', $fb, $pC);
        $section->addText('CABANG PEKANBARU', $fb, $pC);
        $section->addText('ANTARA', $fb, $pC);
        $section->addText('PT SUPERINTENDING COMPANY OF INDONESIA (PERSERO)', $fb, $pC);
        $section->addText('DAN', $fb, $pC);
        $section->addText($vendorUp, $fb, $pTitleLine);
        $section->addTextBreak(1, $p0);
        $section->addText('Nomor : ' . $sp->nomor_sp, $fs, $pC);
        $section->addText('Tanggal : ' . $tgl, $fs, $pC);
        $section->addTextBreak(1, $p0);

        $addNo('I.', 'PERUSAHAAN PERSEROAN PT SUPERINTENDING COMPANY OF INDONESIA disingkat PT SUCOFINDO (PERSERO) NPWP: 01.300.992.3-093.000, yang didirikan dengan Akta Notaris Johan Arifin Lumban Tobing Sutan Arifin di Jakarta No. 42 tanggal 22 Oktober 1956, sebagaimana telah diubah terakhir dengan Akta Pernyataan Keputusan Rapat PT SUPERINTENDING COMPANY OF INDONESIA (Persero) dari Notaris Jose Dimas Satria, SH., M.KN di Jakarta Selatan tanggal 23 Juni 2025 Nomor 130 Tentang Perubahan Anggaran Dasar PT SUPERINTENDING COMPANY OF INDONESIA (Persero) dan telah mendapatkan pengesahan dalam Keputusan Menteri Hukum dan HAM Republik Indonesia tanggal 23 Juni 2025 Nomor : AHU-0139502 Tahun 2025, beralamat di “GRAHA SUPERINTENDING COMPANY OF INDONESIA” Jl. KH. Guru Amin No.Kav 34, RT.4/RW.1, Kelurahan Pancoran, Kecamatan Pancoran, Jakarta Selatan DKI Jakarta 12780, berdasarkan Ketentuan Umum Pengadaan Barang dan Jasa PT SUPERINTENDING COMPANY OF INDONESIA (Persero) dalam perbuatan hukum ini diwakili secara sah oleh ' . $penandatanganSci . ' Jabatan ' . $jabatanSci . ' selanjutnya dalam Kontrak ini disebut sebagai PIHAK KESATU.', 0, [$penandatanganSci, $jabatanSci]);
        $addNo('II.', $vendorUp . ' NPWP ' . $npwpV . ', yang beralamat di ' . $alamatV . ' dalam perbuatan hukum ini diwakili secara sah oleh ' . $direktur . ' jabatan ' . $jabatanVendor . ', selanjutnya dalam Kontrak ini disebut sebagai PIHAK KEDUA.', 0, [$vendorUp, $direktur, $jabatanVendor]);

        $addPara('Berdasarkan pertimbangan-pertimbangan sebagai berikut:');
        $addNo('1.', 'Bahwa PIHAK KESATU telah menyampaikan surat kepada PIHAK KEDUA RFQ ' . $rfqText . ' No. ' . $noPph . ' tanggal ' . $tglPph . ' perihal Surat Permintaan Penawaran Harga (SPPH) dan Negosiasi Harga;');
        $addNo('2.', 'Bahwa PIHAK KEDUA telah menyampaikan surat kepada PIHAK KESATU No. ' . ($sp->sph ?: '(.................)') . ' tanggal ' . ($sp->tgl_sph ? \Carbon\Carbon::parse($sp->tgl_sph)->locale('id')->translatedFormat('d F Y') : '(.................)') . ' perihal Penawaran dan Negosiasi Harga;');
        $addNo('3.', 'Bahwa PIHAK KESATU telah menyampaikan surat kepada PIHAK KEDUA No. ' . $noPemenang . ' tanggal ' . $tglPemenang . ' perihal Pengumuman Penetapan Pemasok Pelaksana Pengadaan ' . $deskripsi . ' untuk PT SUPERINTENDING COMPANY OF INDONESIA (Persero) Cabang Pekanbaru;');
        $deskripsiBold = mb_strtoupper(trim((string) $deskripsi), 'UTF-8');

        $paraRun = $section->addTextRun($pJ);
        $paraRun->addText(
            'Para Pihak setelah menimbang hal-hal tersebut diatas sepakat dan setuju untuk mengikatkan diri dalam suatu Kontrak Pengadaan “',
            $fs
        );
        $paraRun->addText($deskripsiBold, $fb);
        $paraRun->addText(
            '” dengan ketentuan dan syarat-syarat sebagai berikut :',
            $fs
        );
        $section->addTextBreak(1, $p0);

        // ===================== PASAL 1 =====================
        $addPasal('1', ['LINGKUP PEKERJAAN DAN HARGA BORONGAN']);
        $addPara('PIHAK KESATU menyerahkan pekerjaan kepada PIHAK KEDUA, sebagaimana PIHAK KEDUA menerima penyerahan pekerjaan tersebut dari PIHAK KESATU dan berjanji untuk melaksanakan pekerjaan dengan spesifikasi dan harga sebagai berikut:');

        $fmtTable = fn($n) => $this->formatMoney($n);
        $tbl = $section->addTable([
            'borderSize' => 4,
            'borderColor' => '000001',
            'cellMargin' => 55,
            'alignment' => 'center',
            'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
            'width' => 10440,
            'unit' => 'dxa',
        ]);

        $h = ['bold' => true, 'size' => 10, 'name' => 'Arial'];
        $c = ['size' => 10, 'name' => 'Arial'];
        $cb = ['bold' => true, 'size' => 10, 'name' => 'Arial'];
        $ci = ['italic' => true, 'size' => 10, 'name' => 'Arial'];
        $ph = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pl = ['alignment' => 'left', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pr = ['alignment' => 'right', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $vC = ['valign' => 'center'];
        $vT = ['valign' => 'top'];
        $headCell = ['valign' => 'center', 'bgColor' => 'C0C0C0'];

        $tbl->addRow(500, ['exactHeight' => false]);
        $tbl->addCell(500, $headCell)->addText('No', $h, $ph);
        $tbl->addCell(4540, $headCell)->addText('Nama Barang/Peralatan/Jasa', $h, $ph);
        $tbl->addCell(900, $headCell)->addText('Satuan', $h, $ph);
        $tbl->addCell(850, $headCell)->addText('Jumlah', $h, $ph);
        $tbl->addCell(1700, $headCell)->addText('Harga Satuan', $h, $ph);
        $tbl->addCell(1950, $headCell)->addText('Total Harga (Rp.)', $h, $ph);

        if ($items->isEmpty()) {
            $tbl->addRow(700, ['exactHeight' => false]);
            $tbl->addCell(500, $vT)->addText('1', $c, $ph);
            $tbl->addCell(4540, $vT)->addText($cleanText($sp->deskripsi_pengadaan), $ci, $pl);
            $tbl->addCell(900, $vC)->addText('-', $c, $ph);
            $tbl->addCell(850, $vC)->addText('1', $c, $ph);
            $tbl->addCell(1700, $vC)->addText('Rp ' . $fmtTable($subtotal) . ',-', $c, $pr);
            $tbl->addCell(1950, $vC)->addText('Rp ' . $fmtTable($subtotal) . ',-', $c, $pr);
        } else {
            $no = 1;
            foreach ($items as $it) {
                $tbl->addRow(560, ['exactHeight' => false]);
                $tbl->addCell(500, $vT)->addText((string) $no++, $c, $ph);
                $tbl->addCell(4540, $vT)->addText($cleanText($it->nama_barang ?? ''), $ci, $pl);
                $tbl->addCell(900, $vC)->addText($it->satuan ?: '-', $c, $ph);
                $tbl->addCell(850, $vC)->addText($it->jumlah ?: '-', $c, $ph);
                $tbl->addCell(1700, $vC)->addText('Rp ' . $fmtTable($it->harga_satuan ?? 0) . ',-', $c, $pr);
                $tbl->addCell(1950, $vC)->addText('Rp ' . $fmtTable($it->subtotal ?? 0) . ',-', $c, $pr);
            }
        }

        $catatanPr = $sp->nomor_pr
            ? 'Memenuhi Permintaan Bidang Dukungan Bisnis sesuai PR No. ' . $sp->nomor_pr . ' tanggal ' . $tglPr . '.'
            : 'Memenuhi Permintaan Bidang Dukungan Bisnis sesuai PR No. (....................) tanggal (....................).';

        // Summary: kolom Catatan dibuat vertical merge 3 baris supaya tidak muncul garis
        // tepat di bawah tanggal catatan saat baris kanan berisi Harga / PPN / Total.
        $catatanStartCell = ['gridSpan' => 4, 'vMerge' => 'restart', 'valign' => 'top'];
        $catatanContinueCell = ['gridSpan' => 4, 'vMerge' => 'continue', 'valign' => 'top'];

        $tbl->addRow();
        $catCell = $tbl->addCell(6790, $catatanStartCell);
        $catCell->addText('Catatan :', $c, $pl);
        $catCell->addText($catatanPr, $c, $pl);
        $tbl->addCell(1700, $vC)->addText('Harga', $c, $pl);
        $tbl->addCell(1950, $vC)->addText('Rp ' . $fmtTable($subtotal) . ',-', $c, $pr);

        $tbl->addRow();
        $tbl->addCell(6790, $catatanContinueCell);
        $tbl->addCell(1700, $vC)->addText('PPN 11%', $c, $pl);
        $tbl->addCell(1950, $vC)->addText('Rp ' . $fmtTable($ppn) . ',-', $c, $pr);

        $tbl->addRow();
        $tbl->addCell(6790, $catatanContinueCell);
        $tbl->addCell(1700, $vC)->addText('Total', $cb, $pl);
        $tbl->addCell(1950, $vC)->addText('Rp ' . $fmtTable($total), $cb, $pr);

        $tbl->addRow();
        $terCell = $tbl->addCell(10440, ['gridSpan' => 6, 'valign' => 'center']);
        $terRun = $terCell->addTextRun($pl);
        $terRun->addText('Terbilang : ', $cb);
        $terRun->addText($terbilangTotal . ' Rupiah', $cb);
        $section->addTextBreak(1, $p0);

        // ===================== PASAL 2 =====================
        $addPasal('2', ['JANGKA WAKTU PELAKSANAAN PEKERJAAN']);
        $addNo('(1)', 'Jangka waktu pelaksanaan jasa pekerjaan terhitung sejak tanggal ' . $tglAwalKontrak . ' sampai dengan selambat-lambatnya tanggal ' . $tglAkhirKontrak . '.', 0, [$tglAwalKontrak, $tglAkhirKontrak]);
        $addNo('(2)', 'Untuk keperluan penyerahan jasa sebagaimana dimaksud pada ayat (1), PIHAK KESATU menyediakan tempat yang berlokasi di PT SUCOFINDO Cabang Pekanbaru, Kota Pekanbaru, Riau.');

        // ===================== PASAL 3 =====================
        $addPasal('3', ['PELAKSANAAN PEMBAYARAN']);
        $nominalPembayaran = 'Rp. ' . $fmt($subtotal) . ',-';
        $pasal3 = [
            'PIHAK KESATU sebagai Perusahaan yang tergabung dalam Holding Jasa Survey memungut langsung (WAPU) sebesar PPN 11% (Sebelas Persen) kepada PIHAK KEDUA sesuai Peraturan Undang Undang No. 7 Tahun 2021 Tentang Harmonisasi Peraturan Perpajakan.',
            'PIHAK KESATU sebagai Perusahaan yang tergabung dalam Holding Jasa Survey memungut langsung (WAPU) PPh Pasal 23 kepada PIHAK KEDUA jika ada terkait dengan penyerahan jasa sebesar 2 % (dua persen) dari harga pembelian. Apabila PIHAK KEDUA tidak memiliki NPWP maka tarif lebih tinggi 100% (sebesar 4% dari harga pembelian) sesuai Peraturan Menteri Keuangan RI No. 141/2015 Pasal 1 ayat (1).',
            'PIHAK KEDUA merupakan perusahaan kena pajak apabila faktur pajak yang dikeluarkan oleh PIHAK KEDUA tidak diakui atau tidak benar menurut kantor pajak sehingga menyebabkan kerugian PIHAK KESATU maka akan dilakukan pemotongan beban PPN 11% (sebelas persen) dari total nilai kontrak untuk mengganti kerugian tersebut.',
            'Pembayaran ini akan dilakukan pemotongan atau pemungutan sesuai dengan peraturan pajak-pajak yang berlaku.',
            'Apabila ada perbedaan tanggal faktur pajak dengan tanggal penyampaian faktur pajak yang menyebabkan Badan Usaha Milik Negara (BUMN) dikenakan sanksi administrasi perpajakan maka sanksi tersebut akan ditanggung oleh PIHAK KEDUA.',
            'Pembayaran sebesar ' . $nominalPembayaran . ' (' . $terbilangSubtotal . ' Rupiah) belum termasuk PPN 11% (sebelas persen) akan dibayarkan secara sekaligus setelah pelaksanaan pekerjaan dilaksanakan dan dinyatakan selesai, diverifikasi, dan disetujui oleh PIHAK KESATU melalui transfer ke Rekening Bank PIHAK KEDUA, setelah persyaratan tagihan pembayaran sebagaimana dimaksud pada ayat (8) diterima lengkap.',
            'Biaya transfer menjadi beban PIHAK KEDUA',
            'Pembayaran atas harga sebagaimana dimaksud pada ayat (6) pasal ini akan diatur dan dilaksanakan kepada PIHAK KEDUA setelah ditandatangani Kontrak ini oleh Para Pihak dan PIHAK KEDUA telah menyerahkan syarat-syarat sebagai berikut:',
        ];
        foreach ($pasal3 as $i => $text) {
            $extra = [];
            if ($i === 3)
                $extra[] = $text;
            if ($i === 5)
                $extra[] = $nominalPembayaran;
            $addNo('(' . ($i + 1) . ')', $text, 0, $extra);
        }

        foreach ([
            'Copy Spesimen tanda tangan Faktur Pajak yang dilaporkan ke KPP setempat;',
            'Copy Surat Pengukuhan sebagai Pengusaha Kena Pajak (PKP);',
            'Surat Pemberitahuan Nomor Serie E-Faktur Pajak dari KPP setempat;',
            'Surat Keterangan terdaftar dari KPP setempat;',
            'Lampiran Pembayaran SPT PPN di bulan sebelumnya;',
            'Kuitansi rangkap 2 (dua), 1 (satu) Lembar Kesatu bermeterai cukup;',
            'Faktur Penjualan atau Invoice rangkap 2 (dua);',
            '1 (satu) Asli Lembar Kesatu dan 2 (dua) copy/salinan E-Faktur Pajak yang sudah ada barcode;',
            'Copy Jaminan Pelaksanaan (Performance Bond);',
            'Asli Kontrak yang telah ditandatangani oleh Para Pihak dan dibubuhi meterai cukup;',
            'Asli Berita Acara Serah Terima Hasil Pekerjaan Jasa yang ditandatangani oleh PIHAK KESATU dan PIHAK KEDUA;',
            'Copy Dokumen Persetujuan Teknis dan Lampiran tambahan sesuai kebutuhan pekerjaan;',
            'Surat Perintah Pembayaran (SPP) yang diterbitkan oleh PIHAK KESATU dari aplikasi ERP (c/q. Fungsi Keuangan dan Akuntansi Cabang Pekanbaru);',
            'Receipt yang diterbitkan PIHAK KESATU (c/q Fungsi Umum Cabang Pekanbaru) dari aplikasi ERP;',
            'Nomor Rekening Bank PIHAK KEDUA.',
        ] as $idx => $doc) {
            $addNo(chr(97 + $idx) . '.', $doc, 1);
        }

        $pasal3lanjutan = [
            'Pembayaran dilakukan dengan cara sekaligus keseluruhan setelah seluruh pekerjaan selesai dan diterima oleh PIHAK KESATU dan Pemberi Kerja dengan benar dan dapat dipergunakan serta dipenuhinya ayat (8).',
            'PIHAK KESATU (c/q. Divisi Keuangan dan Akuntansi (KAK)) menerima dokumen tagihan dari PIHAK KEDUA setiap hari Senin dan Rabu dengan batas akhir pada tanggal 20 (dua puluh) setiap bulannya, apabila pada tanggal 20 (dua puluh) bukan jatuh pada hari Senin dan Rabu, maka tagihan tersebut dimasukan ke awal bulan berikutnya.',
            'PARA PIHAK sepakat bahwa pembayaran kepada PIHAK KEDUA akan dilakukan setelah PIHAK KESATU menerima pembayaran dari Pemberi Kerja.',
            'Dengan tetap tunduk kepada ketentuan ayat (11) Pasal ini, PIHAK KESATU akan melakukan pembayaran sebagaimana dimaksud pada ayat (6) melalui transfer ke Rekening Bank PIHAK KEDUA selambat-lambatnya 45 (empat puluh lima) hari kalender sejak dokumen tagihan lengkap diterima oleh PIHAK KESATU.',
        ];
        foreach ($pasal3lanjutan as $i => $text) {
            $addNo('(' . ($i + 9) . ')', $text);
        }

        // ===================== PASAL 4 =====================
        $addPasal('4', ['JAMINAN PELAKSANAAN']);
        $addNo('(1)', 'PIHAK KEDUA harus menyerahkan kepada PIHAK KESATU Asli Jaminan Pelaksanaan (Performance Bond) sebesar 5% dari total harga keseluruhan setelah PPN 11% senilai Rp. ' . $fmt($jampel5) . ',- (' . $terbilangJampel . ' Rupiah) yang diterbitkan oleh Bank yang mempunyai program Surety Bond.', 0, ['Rp. ' . $fmt($jampel5) . ',-']);
        $addNo('(2)', 'Jaminan Pelaksanaan (Performance Bond) ayat (1) disetor/diserahkan oleh PIHAK KEDUA kepada PIHAK KESATU (c/q Fungsi Keuangan & Akuntansi), sedangkan copynya kepada Fungsi Umum PIHAK KESATU untuk kelengkapan dokumen Kontrak ini.', 0);
        $addNo('(3)', 'Jaminan Pelaksanaan (Performance Bond) yang berupa Jaminan Bank sebagaimana dimaksud pada ayat (1) mempunyai masa berlaku sejak tanggal ' . $tglAwalKontrak . ' sampai dengan tanggal ' . $tglAkhirKontrak . ', Apabila Jaminan Pelaksanaan (Performance Bond) tersebut habis masa berlakunya sebelum seluruh pekerjaan selesai, maka PIHAK KEDUA berkewajiban untuk memperpanjang masa berlaku Jaminan Pelaksanaan (Performance Bond) dimaksud dan menyerahkannya kepada PIHAK KESATU selambat-lambatnya 7 (tujuh) hari kalender sebelum habisnya masa berlaku Jaminan Pelaksanaan (Performance Bond) tersebut.', 0);
        $addNo('(4)', 'Apabila PIHAK KEDUA lalai ataupun sengaja tidak menyerahkan Jaminan Pelaksanaan (Performance Bond) yang telah diperpanjang dalam jangka waktu sebagaimana dimaksud pada ayat (3), maka PIHAK KESATU berhak secara sepihak tanpa perlu adanya pemberitahuan terlebih dahulu kepada PIHAK KEDUA untuk menguang-tunaikan Jaminan Pelaksanaan (Performance Bond) dimaksud, dalam waktu 6 (enam) hari kalender sebelum masa berlakunya berakhir dan berhak untuk tidak membayarkan atau berhak menahan angsuran selanjutnya.', 0);
        $addNo('(5)', 'Jaminan Pelaksanaan (Performance Bond) sebagaimana dimaksud pada ayat (1) dikembalikan oleh PIHAK KESATU kepada PIHAK KEDUA secara sekaligus setelah Pemenuhan seluruh pekerjaan sesuai dengan kontrak yang diterbitkan.', 0);
        $addNo('(6)', 'Apabila PIHAK KEDUA tidak dapat menyelesaikan pelaksanaan pekerjaan baik sebagian maupun seluruhnya sesuai dengan ketentuan-ketentuan dalam Kontrak ini, maka Jaminan Pelaksanaan (Performance Bond) menjadi milik PIHAK KESATU.', 0);

        // ===================== PASAL 5 - 13 =====================
        $pasalStatis = [
            [
                '5',
                ['KEWAJIBAN DAN JAMINAN MUTU'],
                [
                    'PIHAK KEDUA wajib memberikan jaminan bahwa pegawai yang dipekerjakan dalam keadaan sehat jasmani maupun rohani serta mampu bekerja secara professional.',
                    'PIHAK KEDUA menjamin bahwa penyediaan jasa memenuhi persyaratan dan ketentuan-ketentuan telah disepakati oleh PIHAK KESATU dan PIHAK KEDUA.',
                    'PIHAK KEDUA menjamin jasa yang dipasok diperoleh dengan cara legal serta tidak melanggar hukum dan ketentuan/peraturan perundang-undangan yang berlaku.',
                    'PIHAK KEDUA melaksanakan tugas secara tertib, disertai rasa tanggung jawab untuk mencapai sasaran, kelancaran, dan ketepatan tujuan Pengadaan Barang dan Jasa.',
                    'Para Pihak bekerja secara profesional, mandiri, dan menjaga kerahasiaan informasi yang menurut sifatnya harus dirahasiakan untuk mencegah penyimpangan Pengadaan Barang dan Jasa.',
                    'Para Pihak tidak saling mempengaruhi baik langsung maupun tidak langsung yang berakibat persaingan usaha tidak sehat.',
                    'PIHAK KEDUA menerima dan bertanggung jawab atas segala keputusan yang ditetapkan oleh PIHAK KESATU sesuai dengan kesepakatan tertulis yang di buat oleh Para Pihak.',
                    'Para Pihak menghindari dan mencegah terjadinya pertentangan kepentingan baik secara langsung maupun tidak langsung, yang berakibat persaingan usaha tidak sehat dalam Pengadaan Barang dan Jasa.',
                    'PIHAK KESATU menghindari dan mencegah pemborosan dan kebocoran keuangan negara/perusahaan.',
                    'Para Pihak menghindari dan mencegah penyalahgunaan wewenang dan/atau kolusi.',
                    'Para Pihak Tidak menerima, tidak menawarkan, atau tidak menjanjikan untuk memberi atau menerima hadiah, imbalan, komisi, rabat, dan apa saja dari atau kepada siapapun yang diketahui atau patut diduga berkaitan dengan Pengadaan Barang dan Jasa.',
                    'PIHAK KEDUA wajib menerapkan Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3) sesuai Peraturan Pemerintah No. 50 tahun 2012.',
                    'PIHAK KEDUA wajib untuk terus bertanggung jawab atas gugatan atau tuntutan atau klaim dari Pemberi Kerja dan/atau pihak lainnya terhadap pelaksanaan pekerjaan yang dilaksanakan oleh PIHAK KEDUA.',
                ]
            ],
            ['6', ['LAPORAN HASIL PELAKSANAAN PEKERJAAN'], []],
            ['7', ['KERAHASIAAN'], []],
            [
                '8',
                ['DENDA'],
                [
                    'Jika jangka waktu pelaksanaan pekerjaan sebagaimana dimaksud dalam Pasal 2 ayat (1) Kontrak ini dilampaui, maka kepada PIHAK KEDUA akan dikenakan denda sebesar 1‰ (satu permil) per hari kalender keterlambatan dari total nilai kontrak dan/atau dari sisa nilai kontrak pekerjaan dengan maksimal denda sebesar 5% (lima persen) sebelum Pajak sebagaimana dimaksud dalam Pasal 1 Kontrak ini.',
                    'Dalam hal ini PIHAK KEDUA dikenakan denda sesuai dengan ayat (1) maka PIHAK KESATU berhak untuk langsung memotong jumlah pembayaran tagihan PIHAK KEDUA sesuai dengan jumlah perhitungan denda yang dikenakan kepada PIHAK KEDUA.',
                ]
            ],
            [
                '9',
                ['FORCE MAJEURE'],
                [
                    'Force Majeure adalah sebagai berikut :',
                    'Dalam hal terjadi Force Majeure sebagaimana dimaksud pada ayat (1), maka Pihak yang mengalami Force Majeure wajib memberitahukan secara tertulis kepada Pihak lainnya dalam waktu 7 (tujuh) hari kalender sejak saat terjadinya Force Majeure, begitu juga saat berakhirnya dan dijelaskan secara resmi oleh Pejabat yang berwenang melalui media massa.',
                    'Kelalaian atau kelambatan dalam memenuhi kewajiban memberitahukan sebagaimana dimaksud dalam ayat (2) mengakibatkan tidak diakuinya oleh Pihak lain peristiwa sebagaimaan dimaksud pada ayat (1) sebagai Force Majeure.',
                    'Kejadian-kejadian sebagaimana dimaksud pada ayat (1) atas permintaan tertulis dari Pihak yang mengalami Force Majeure, dapat diperhitungkan sebagai perpanjangan jangka waktu pelaksanaan, kewajiban pihak–pihak menurut Kontrak ini, apabila ketentuan sebagaimana dimaksud pada ayat (2) tersebut dipenuhi.',
                    'Semua kerugian dan biaya yang diderita oleh salah satu Pihak sebagai akibat terjadinya Force Majeure bukan merupakan tanggung jawab Pihak lainnya.',
                ]
            ],
            [
                '10',
                ['PEMUTUSAN KONTRAK'],
                [
                    'PIHAK KESATU berhak secara sepihak, tanpa adanya suatu tuntutan apapun dari PIHAK KEDUA untuk memutuskan dan/atau mengakhiri sebagian atau seluruh pekerjaan menurut Kontrak ini, apabila salah satu di antara sebab-sebab pemutusan tersebut di bawah ini terjadi :',
                    'Untuk hal ikhwal pemutusan Kontrak ini sebagaimana dimaksud pada ayat (1) pasal ini, Para Pihak dengan ini menyatakan sepakat mengesampingkan berlakunya ketentuan sebagaimana dimaksud dalam Pasal 1266 Kitab Undang-Undang Hukum Perdata terhadap Kontrak ini dapat dilakukan secara sah cukup dengan surat pemberitahuan secara tertulis dari PIHAK KESATU kepada PIHAK KEDUA, tanpa perlu menunggu adanya keputusan dari Pengadilan serta dengan ini PIHAK KEDUA dapat menyatakan hak-hak yang timbul dari padanya apabila ada untuk dimintakan penggantian kepada PIHAK KESATU dan disepakati oleh Para Pihak.',
                    'Dalam hal terjadinya pemutusan dari Kontrak ini, ketentuan-ketentuan dalam Kontrak ini berlaku terus sampai diselesaikannya kelebihan atau kekurangan pembayaran sebagaimana dimaksud dalam Pasal 3, yang telah dilakukan oleh PIHAK KESATU kepada PIHAK KEDUA.',
                    'PIHAK KEDUA dengan ini menyatakan membebaskan PIHAK KESATU dari segala tuntutan hukum termasuk dari Pihak Ketiga karena pemutusan Kontrak ini, apabila terbukti merupakan kesalahan PIHAK KEDUA maka sepenuhnya menjadi tanggungjawab PIHAK KEDUA.',
                    'PIHAK KESATU akan menunda dan/atau membatalkan transaksi kepada PIHAK KEDUA apabila dalam proses pengadaan ini terindikasi adanya penyimpangan, penyuapan dan/atau kecurangan sebagaimana dimaksud pada Peraturan Menteri Negara Badan Usaha Milik Negara Nomor Per-19/MBU/2012 tanggal 27 Desember 2012 perihal Pedoman Penundaan Transaksi Bisnis Yang Terindikasi Penyimpangan penyuapan Dan/Atau Kecurangan PER-08/MBU/12/2019 tanggal 12 Desember 2019 perihal Pedoman Umum Pelaksanaan Pengadaan Barang dan Jasa Badan Usaha Milik Negara.',
                ]
            ],
            [
                '11',
                ['PENYELESAIAN PERSELISIHAN'],
                [
                    'Apabila dikemudian hari terjadi perselisihan dalam penafsiran atau pelaksanaan ketentuan Kontrak ini, PIHAK KESATU dan PIHAK KEDUA sepakat untuk terlebih dahulu menyelesaikan secara musyawarah.',
                    'Bilamana musyawarah sebagaimana dimaksud pada ayat (2) tidak menghasilkan kata sepakat tentang cara penyelesaian perselisihan, maka Para Pihak sepakat untuk menyerahkan semua sengketa yang timbul dari Kontrak ini kepada Badan Arbitrase Nasional Indonesia (BANI) untuk diselesaikan pada tingkat pertama dan terakhir menurut peraturan prosedur BANI oleh arbiter yang ditunjuk menurut peraturan tersebut.',
                ]
            ],
            [
                '12',
                ['PEJABAT YANG DITUNJUK UNTUK TANDATANGAN'],
                [
                    'Untuk kelancaran pelaksanaan Kontrak ini, PIHAK KESATU dan PIHAK KEDUA sepakat bahwa Pejabat yang ditunjuk mewakili dalam pembuatan Berita Acara Serah Terima Hasil Pekerjaan Jasa dan sebagainya yang berkaitan erat dengan Kontrak ini:',
                    'Penggantian Pejabat yang ditunjuk oleh PIHAK KESATU dan PIHAK KEDUA sebagaimana dimaksud pada ayat (1) hanya dapat dilaksanakan atas kesepakatan PIHAK KESATU dan PIHAK KEDUA dan dituangkan secara tertulis.',
                ]
            ],
            [
                '13',
                ['LAIN-LAIN'],
                [
                    'Apabila dalam pelaksanaan Kontrak ini terjadi tindakan penyimpangan dan/atau kecurangan, maka PIHAK KESATU dapat melakukan penundaan dan/atau pembatalan Perjanjian ini. Hak dan tanggung jawab sebelum penundaan dan/atau pembatalan tetap menjadi tanggung jawab masing-masing PIHAK.',
                    'Para Pihak sepakat Menerapkan Sistem Manajemn Anti Penyuapan (SMAP).',
                    'PIHAK KEDUA wajib mengijinkan PIHAK KESATU, atau perwakilan mereka yang ditunjuk untuk mengakses, memeriksa dan membuat salinan - salinan dari buku-buku, catatan-catatan dan rekening- rekening dan rekening-rekening yang dimiliki ditempat PIHAK KEDUA dalam rangka audit kepatuhan PIHAK KEDUA terhadap hukum Anti-Korupsi dan/atau Kewajiban Anti Korupsi, Sebagai tambahan, PIHAK KEDUA harus bekerjasama dan menyediakan semua bantuan yang wajar, termasuk membuat pembukuan-pembukuan, catatan-catatan, rekening-rekening dan personil yang ada, untuk memungkinkan PIHAK KESATU melakukan investigasi setiap potensi ataupun pelanggaran nyata, atau melaksanakan aktivitas yang dipersyaratkan oleh pemerintah atau institusi yang relevan sehubungan dengan memastikan atau memverifikasi kepatuhan PIHAK KESATU terhadap Hukum Anti-Korupsi dan/atau Kewajiban Anti-Korupsi.',
                    'PIHAK KESATU akan memeriksa terlebih dahulu sebelum jasa diserahkan dan apabila tidak memenuhi syarat sesuai Pasal 1 Kontrak ini, PIHAK KESATU akan mengembalikan kepada PIHAK KEDUA dengan beban dan biaya menjadi tanggung jawab PIHAK KEDUA.',
                    'Apabila PIHAK KEDUA mengirim jasa kepada PIHAK KESATU, PIHAK KEDUA wajib menyampaikan Copy Kontrak Ringkas kepada petugas penerima jasa PIHAK KESATU.',
                    'PIHAK KESATU dibebaskan dari semua bentuk beban serta tuntutan apapun dari Pihak Ketiga yang berkaitan dengan Kontrak ini.',
                    'Setiap perubahan mengenai isi, baik persyaratan, lingkup pekerjaan, harga-harganya maupun perpanjangan waktu harus disetujui secara terpisah oleh PIHAK KESATU dan PIHAK KEDUA dengan membuat Amandemen terhadap Kontrak ini.',
                    'Kontrak ini dibuat rangkap 2 (dua) asli masing-masing sama bunyinya, mempunyai kekuatan hukum yang sama setelah ditandatangani oleh PIHAK KESATU dan ditandatangani oleh PIHAK KEDUA serta dibubuhi Cap Perusahaan dan diberi materai cukup.',
                    'Asli Kontrak agar diserahkan kepada PIHAK KESATU paling lambat 2 (dua) hari kerja, sejak diterimanya asli/copy Kontrak ini sebagai pemberitahuan, baik yang disampaikan melalui faksimili/e-mail maupun kurir.',
                ]
            ],
        ];

        foreach ($pasalStatis as [$noPasal, $judul, $ayatList]) {
            $addPasal($noPasal, $judul);

            if ($noPasal === '6') {
                $addPara('PIHAK KEDUA wajib menyerahkan laporan hasil pelaksanaan pekerjaan ' . $deskripsi . ' kepada PIHAK KESATU dalam jangka waktu sesuai masa kontrak.');
                continue;
            }

            if ($noPasal === '7') {
                $addPara('Para Pihak dalam waktu yang tidak terbatas harus memberlakukan sebagai rahasia dan menjamin agar pegawai-pegawainya, pekerja-pekerjanya maupun orang-orang yang bekerja untuknya akan memberlakukan rahasia setiap keterangan yang diterima dan/atau yang diperolehnya dengan cara apapun juga serta wajib menjamin semua dokumen yang berhubungan dengan pelaksanaan pekerjaan Jasa menurut Kontrak ini hanya untuk dipergunakan untuk pelaksanaan yang berkaitan dengan pekerjaan Jasa sebagaimana dimaksud dalam isi Kontrak ini');
                continue;
            }

            foreach ($ayatList as $idx => $text) {
                $addNo('(' . ($idx + 1) . ')', $text);

                if ($noPasal === '9' && $idx === 0) {
                    $addNo('a.', 'Gempa bumi besar, angin topan, banjir besar, kebakaran besar, tanah longsor dan wabah penyakit.', 1);
                    $addNo('b.', 'Pemberontakan, pemogokan umum, huru-hara, sabotase, perang dan kebijakan Pemerintah yang berakibat langsung terhadap Kontrak ini.', 1);
                }

                if ($noPasal === '10' && $idx === 0) {
                    foreach ([
                        'Apabila dalam waktu 7 (tujuh) hari kalender terhitung sejak ditandatanganinya Kontrak ini, PIHAK KEDUA ternyata tidak atau belum memulai pelaksanaan pekerjaan menurut Kontrak ini.',
                        'Pelaksanaan Kontrak ini tertunda karena terjadinya kejadian-kejadian Force Majeure sebagaimana dimaksud dalam Pasal 9 ayat (1) yang berlangsung lebih dari 1 (satu) bulan.',
                        'Pelaksanaan Kontrak ini tertunda oleh PIHAK KEDUA lebih dari 14 (empat belas) hari, dimana tertundanya pekerjaan tersebut tidak disebabkan oleh kejadian-kejadian sebagaimana dimaksud dalam Pasal 9 ayat (1), tidak juga oleh karena kesalahan PIHAK KESATU apapun, akan tetapi disebabkan oleh hal-hal untuk mana PIHAK KEDUA tidak memungkinkan melanjutkan pekerjaannya, namun tidak hanya terbatas pada surat izin usaha dicabut atau dinyatakan tidak berlaku lagi atau PIHAK KEDUA dinyatakan pailit oleh Pengadilan Niaga.',
                        'Apabila PIHAK KEDUA terbukti tidak dapat melaksanakan Kontrak ini sebagaimana dimaksud dalam Pasal 1.',
                        'Apabila PIHAK KEDUA ternyata menyerahkan pelaksanaan pekerjaan baik sebagian atau seluruhnya kepada Pihak Ketiga tanpa persetujuan secara tertulis dari PIHAK KESATU.',
                    ] as $sidx => $sub) {
                        $addNo(chr(97 + $sidx) . '.', $sub, 1);
                    }
                }

                if ($noPasal === '12' && $idx === 0) {
                    $pPejabat = ['spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
                    $noBorderPejabat = [
                        'borderTopSize' => 0,
                        'borderTopColor' => 'FFFFFF',
                        'borderBottomSize' => 0,
                        'borderBottomColor' => 'FFFFFF',
                        'borderLeftSize' => 0,
                        'borderLeftColor' => 'FFFFFF',
                        'borderRightSize' => 0,
                        'borderRightColor' => 'FFFFFF',
                        'valign' => 'top',
                    ];

                    $tblPejabat = $section->addTable([
                        'borderSize' => 0,
                        'borderColor' => 'FFFFFF',
                        'cellMargin' => 0,
                        'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
                        'width' => 9000,
                        'unit' => 'dxa',
                    ]);

                    $tblPejabat->addRow();
                    $tblPejabat->addCell(480, $noBorderPejabat)->addText('', $fs, $pPejabat);
                    $tblPejabat->addCell(240, $noBorderPejabat)->addText('a.', $fs, $pPejabat);
                    $tblPejabat->addCell(1800, $noBorderPejabat)->addText('PIHAK KESATU', $fb, $pPejabat);
                    $tblPejabat->addCell(250, $noBorderPejabat)->addText(':', $fs, $pPejabat);
                    $tblPejabat->addCell(6230, $noBorderPejabat)->addText($bidangIpItu . ' / PEJABAT YANG DITUNJUK', $fs, $pPejabat);

                    $tblPejabat->addRow();
                    $tblPejabat->addCell(480, $noBorderPejabat)->addText('', $fs, $pPejabat);
                    $tblPejabat->addCell(240, $noBorderPejabat)->addText('b.', $fs, $pPejabat);
                    $tblPejabat->addCell(1800, $noBorderPejabat)->addText('PIHAK KEDUA', $fb, $pPejabat);
                    $tblPejabat->addCell(250, $noBorderPejabat)->addText(':', $fs, $pPejabat);
                    $tblPejabat->addCell(6230, $noBorderPejabat)->addText($jabatanVendor, $fs, $pPejabat);

                    $section->addTextBreak(1, $p0);
                }
            }
        }

        // ===================== TANDA TANGAN =====================
        $section->addTextBreak(1, $p0);
        $addPara('Demikian Kontrak ini dibuat dengan itikad baik untuk dipatuhi serta dilaksanakan oleh PIHAK KESATU dan PIHAK KEDUA.');
        $section->addTextBreak(1, $p0);

        $sigPC = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $noBorderCell = [
            'borderTopSize' => 0,
            'borderTopColor' => 'FFFFFF',
            'borderBottomSize' => 0,
            'borderBottomColor' => 'FFFFFF',
            'borderLeftSize' => 0,
            'borderLeftColor' => 'FFFFFF',
            'borderRightSize' => 0,
            'borderRightColor' => 'FFFFFF',
            'valign' => 'top',
        ];
        $sigTbl = $section->addTable([
            'borderSize' => 0,
            'borderColor' => 'FFFFFF',
            'cellMargin' => 0,
            'alignment' => 'center',
            'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
            'width' => 9000,
            'unit' => 'dxa',
        ]);
        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText('PIHAK KESATU', $fb, $sigPC);
        $sigTbl->addCell(4500, $noBorderCell)->addText('PIHAK KEDUA', $fb, $sigPC);

        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText('PT SUCOFINDO (PERSERO) CABANG PEKANBARU', $fb, $sigPC);
        $sigTbl->addCell(4500, $noBorderCell)->addText($vendorUp, $fb, $sigPC);

        $sigTbl->addRow(1900, ['exactHeight' => false]);
        $sigTbl->addCell(4500, $noBorderCell)->addText('', $fs, $p0);
        $sigTbl->addCell(4500, $noBorderCell)->addText('', $fs, $p0);

        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText($penandatanganSci, $fbu, $sigPC);
        $sigTbl->addCell(4500, $noBorderCell)->addText($direktur, $fbu, $sigPC);

        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText($jabatanSci, $fb, $sigPC);
        $sigTbl->addCell(4500, $noBorderCell)->addText($jabatanVendor, $fb, $sigPC);

        $section->addTextBreak(1, $p0);
        $noteRun = $section->addTextRun(['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0]);
        $noteRun->addText('Catatan: ', ['italic' => true, 'size' => 8, 'name' => 'Arial']);
        $noteRun->addText('Dalam menjaga Integritas dan Kredibilitas Insan PT SUCOFINDO (Persero) kami sangat menghargai apabila Perusahaan/Organisasi Saudara tidak memberikan bingkisan/tanda terima kasih kepada Insan PT SUCOFINDO (Persero).', ['italic' => true, 'size' => 8, 'name' => 'Arial']);

        // ===================== PAKTA INTEGRITAS =====================
        // Pakta dibuat sebagai section baru agar tidak ikut header "Lanjutan Kontrak" dan nomor halaman kontrak.
        $paktaSection = $phpWord->addSection([
            'pageSizeW' => 11906,
            'pageSizeH' => 16838,
            'marginTop' => 1750,
            'marginBottom' => 1304,
            'marginLeft' => 1418,
            'marginRight' => 1418,
            'headerHeight' => 737,
            'footerHeight' => 709,
        ]);

        $addParaPakta = function (string $text, array $pStyle = null, array $extraBold = []) use ($paktaSection, $fs, $fb, $pJ) {
            $this->kontrakParagraf($paktaSection, $text, $pStyle ?? $pJ, $fs, $fb, $extraBold);
        };

        $addNoPakta = function (string $no, string $text, int $depth = 0, array $extraBold = []) use ($addParaPakta, $pJ) {
            $left = $depth === 0 ? 360 : 720;
            $style = array_merge($pJ, ['indentation' => ['left' => $left, 'hanging' => 360]]);
            $addParaPakta($no . "\t" . $text, $style, $extraBold);
        };

        $paktaTitle = ['bold' => true, 'size' => 14, 'name' => 'Arial'];

        $paktaSection->addText('PAKTA INTEGRITAS', $paktaTitle, $pC);
        $paktaSection->addTextBreak(1, $p0);
        $addParaPakta('Kami yang bertanda tangan dibawah ini, sehubungan dengan pelaksanaan Pengadaan ' . $deskripsi . ' untuk PT SUCOFINDO, dengan ini menyatakan bahwa :');

        foreach ([
            'Kami berjanji tidak akan melakukan praktek Korupsi, Kolusi & Nepotisme (KKN);',
            'Kami tidak menerima, tidak menawarkan, atau tidak menjanjikan untuk memberi atau menerima hadiah, imbalan, komisi, rabat, dan apa saja dari atau kepada siapapun yang diketahui atau patut diduga berkaitan dengan pengadaan ini.',
            'Kami tidak memiliki kepentingan pribadi atau tujuan melakukan sesuatu untuk manfaat diri sendiri, maupun menguntungkan pihak-pihak terkait dengan diri kami, atau pihak yang berafiliasi dengan kami dan dengan demikian tidak memiliki posisi yang mengundang potensi benturan kepentingan (Conflict of interest), termasuk dengan seluruh pihak yang terlibat dengan tindakan dimaksud.',
            'Kami akan melaporkan kepada pihak yang berwajib/berwenang apabila mengetahui ada indikasi KKN dan Penyuapan di dalam proses pengadaan ini.',
            'Kami memahami dan mentaati serta tunduk terhadap ketentuan-ketentuan/persyaratan pengadaan ini.',
            'Kami berjanji akan melaksanakan pengadaan tersebut di atas secara bersih, transparan dan profesional dengan mengerahkan segala kemampuan dan sumber daya secara optimal untuk memberikan hasil kerja terbaik.',
            'Kami akan menunda dan/atau membatalkan transaksi apabila dalam proses pengadaan ini terindikasi adanya Kecurangan atau Penyuapan atau Penyimpangan.',
        ] as $i => $text) {
            $addNoPakta(($i + 1) . '.', $text);
        }

        $addParaPakta('Apabila kami melanggar hal-hal yang telah kami nyatakan dalam Pakta Integritas ini, kami bersedia dikenakan sanksi moral, sanksi administrasi serta dituntut ganti rugi dan pidana sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.');
        $paktaSection->addTextBreak(1, $p0);

        // ===================== TANDA TANGAN PAKTA INTEGRITAS =====================
        $pPaktaSig = [
            'alignment' => 'left',
            'spaceAfter' => 0,
            'spaceBefore' => 0,
            'lineHeight' => 1.0,
        ];

        // Style tanda tangan Pakta dibuat sama dengan tanda tangan kontrak/Pasal 11
        $paktaName = [
            'bold' => true,
            'underline' => 'single',
            'size' => 11,
            'name' => 'Arial',
        ];

        $paktaJabatan = [
            'bold' => true,
            'size' => 11,
            'name' => 'Arial',
        ];

        $pkNoBorderCell = [
            'borderTopSize' => 0,
            'borderTopColor' => 'FFFFFF',
            'borderBottomSize' => 0,
            'borderBottomColor' => 'FFFFFF',
            'borderLeftSize' => 0,
            'borderLeftColor' => 'FFFFFF',
            'borderRightSize' => 0,
            'borderRightColor' => 'FFFFFF',
            'valign' => 'top',
        ];

        $pkTbl = $paktaSection->addTable([
            'borderSize' => 0,
            'borderColor' => 'FFFFFF',
            'cellMargin' => 0,
            'alignment' => 'center',
            'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
            'width' => 9000,
            'unit' => 'dxa',
        ]);

        // Row 1: Tanggal dan Penyedia Eksternal
        $pkTbl->addRow();
        $lc = $pkTbl->addCell(4500, $pkNoBorderCell);
        $lc->addText('Pekanbaru, ' . $tglPakta, $fs, $pPaktaSig);

        $rc = $pkTbl->addCell(4500, $pkNoBorderCell);
        $rc->addText('Penyedia Eksternal', $fs, $pPaktaSig);

        // Row 2: Nama perusahaan
        $pkTbl->addRow();
        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText('PT SUCOFINDO CABANG PEKANBARU', $fs, $pPaktaSig);

        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($vendorUp, $fs, $pPaktaSig);

        // Row 3: Ruang tanda tangan
        $pkTbl->addRow(2100, ['exactHeight' => false]);
        $pkTbl->addCell(4500, $pkNoBorderCell)->addText('', $fs, $p0);
        $pkTbl->addCell(4500, $pkNoBorderCell)->addText('', $fs, $p0);

        // Row 4: Nama — mengikuti Penandatangan SCI yang dipakai di kontrak/Pasal 11
        $pkTbl->addRow();
        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($penandatanganSci, $paktaName, $pPaktaSig);

        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($direktur, $paktaName, $pPaktaSig);

        // Row 5: Jabatan — mengikuti Jabatan SCI yang dipakai di kontrak/Pasal 11
        $pkTbl->addRow();
        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($jabatanSci, $paktaJabatan, $pPaktaSig);

        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($jabatanVendor, $paktaJabatan, $pPaktaSig);


        // ===================== FORM UJI KELAYAKAN PENYEDIA EKSTERNAL =====================
        // Dibuat setelah Pakta Integritas, mengikuti format halaman tambahan tanpa lanjutan kontrak.
        $this->addFormUjiKelayakanPenyediaEksternal(
            $phpWord,
            $deskripsi,
            $sp->nomor_pr,
            $tglPr,
            $vendorUp,
            $tglPakta,
            $penandatanganSci,
            $jabatanSci
        );

        // ===================== GENERATE FILE =====================
        $cleanDesc = preg_replace('/[\r\n]+/', ' ', $sp->deskripsi_pengadaan);
        $cleanDesc = preg_replace('/[^A-Za-z0-9\s\-]/', '', $cleanDesc);
        $cleanDesc = trim(preg_replace('/\s+/', ' ', $cleanDesc));
        $shortDesc = strlen($cleanDesc) > 40 ? substr($cleanDesc, 0, 40) : $cleanDesc;

        $filename = 'Kontrak Ringkas Pengadaan ' . $shortDesc . '.docx';
        $tempPath = storage_path('app/kontrak_ringkas_300_' . $sp->id . '_' . Str::random(8) . '.docx');
        IOFactory::createWriter($phpWord, 'Word2007')->save($tempPath);

        $imagePath = $this->resolveKopSuratPath(false);
        $imagePath2 = $this->resolveKopSuratPath(true);
        if ($imagePath) {
            $this->injectHeaderWatermark($tempPath, $imagePath, $imagePath2, $sp->nomor_sp);
        }

        if (!file_exists($tempPath) || filesize($tempPath) === 0) {
            $fallbackPath = storage_path('app/fallback_' . $filename);
            IOFactory::createWriter($phpWord, 'Word2007')->save($fallbackPath);
            return response()->download($fallbackPath, $filename)->deleteFileAfterSend(true);
        }

        return response()->download($tempPath, $filename)->deleteFileAfterSend(true);
    }

    public function cetakKontrakRingkas500(Sp $sp, ?float $nilaiAcuan = null)
    {
        // Template Kontrak Ringkas Jasa Subkon Diatas 500 jt.
        // Isi mengikuti dokumen template >500: Pasal 1 s.d. Pasal 13, Jaminan Pelaksanaan,
        // tanda tangan, Pakta Integritas, dan Formulir Uji Kelayakan Penyedia Eksternal.
        $sp->load('items');

        $phpWord = new PhpWord();
        \PhpOffice\PhpWord\Settings::setOutputEscapingEnabled(true);
        $phpWord->setDefaultFontName('Arial');
        $phpWord->setDefaultFontSize(11);
        $phpWord->setDefaultParagraphStyle(['spaceAfter' => 90, 'spaceBefore' => 0, 'lineHeight' => 1.05]);

        $fs = ['size' => 11, 'name' => 'Arial'];
        $fb = ['bold' => true, 'size' => 11, 'name' => 'Arial'];
        $fi = ['italic' => true, 'size' => 11, 'name' => 'Arial'];
        $fbi = ['bold' => true, 'italic' => true, 'size' => 11, 'name' => 'Arial'];
        $fu = ['underline' => 'single', 'size' => 11, 'name' => 'Arial'];
        $fbu = ['bold' => true, 'underline' => 'single', 'size' => 11, 'name' => 'Arial'];

        $p0 = ['spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pJ = ['alignment' => 'both', 'spaceAfter' => 90, 'spaceBefore' => 0, 'lineHeight' => 1.05];
        $pC = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pR = ['alignment' => 'right', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pL = ['alignment' => 'left', 'spaceAfter' => 90, 'spaceBefore' => 0, 'lineHeight' => 1.05];

        $section = $phpWord->addSection([
            'pageSizeW' => 11906,
            'pageSizeH' => 16838,
            'marginTop' => 1750,
            'marginBottom' => 1304,
            'marginLeft' => 1418,
            'marginRight' => 1418,
            'headerHeight' => 737,
            'footerHeight' => 709,
        ]);

        $footer = $section->addFooter();
        $footer->addPreserveText('Hal {PAGE} dari {SECTIONPAGES}', ['size' => 11, 'name' => 'Arial'], [
            'alignment' => 'right',
            'spaceAfter' => 0,
            'spaceBefore' => 0,
        ]);

        $vendor = Vendor::where('nama_vendor', $sp->nama_vendor)->first();
        $ppbj = $sp->nomor_pr ? Ppbj::where('ppbj_no', $sp->nomor_pr)->first() : null;

        $vendorUp = strtoupper(trim((string) $sp->nama_vendor));
        $alamatV = ($vendor && trim((string) ($vendor->alamat ?? '')) !== '') ? trim((string) $vendor->alamat) : '(.....................................)';
        $npwpV = ($vendor && trim((string) ($vendor->npwp ?? '')) !== '') ? trim((string) $vendor->npwp) : '(.............................)';
        $direktur = ($vendor && trim((string) ($vendor->direktur ?? '')) !== '') ? trim((string) $vendor->direktur) : '(..............................)';
        $jabatanVendor = ($vendor && trim((string) ($vendor->jabatan ?? '')) !== '') ? trim((string) $vendor->jabatan) : '..............................';

        $bidangIpItu = trim((string) ($sp->bidang_ip_itu ?? ''));
        $bidangIpItu = $bidangIpItu !== '' ? $bidangIpItu : 'KEPALA BIDANG DUKUNGAN BISNIS';

        $penandatanganSci = trim((string) ($sp->penandatangan_sci ?? ''));
        $penandatanganSci = $penandatanganSci !== '' ? $penandatanganSci : 'Bambang Harwanta';

        $jabatanSci = trim((string) ($sp->jabatan_sci ?? ''));
        $jabatanSci = $jabatanSci !== '' ? $jabatanSci : 'Pj. Kepala Cabang';

        $rfqText = trim((string) ($sp->rfq ?? ''));
        $rfqText = $rfqText !== '' ? $rfqText : '.......';

        $tgl = $sp->tanggal_sp
            ? \Carbon\Carbon::parse($sp->tanggal_sp)->locale('id')->translatedFormat('d F Y')
            : now()->locale('id')->translatedFormat('d F Y');
        $tglPakta = now()->locale('id')->translatedFormat('d F Y');

        $tglPph = (!empty($ppbj?->tgl_spph))
            ? \Carbon\Carbon::parse($ppbj->tgl_spph)->locale('id')->translatedFormat('d F Y')
            : '(.................)';
        $noPph = !empty($ppbj?->spph_rfq_1) ? $ppbj->spph_rfq_1 : '(.................)';

        $noPemenang = !empty($sp->nomor_pemenang)
            ? $sp->nomor_pemenang
            : (!empty($ppbj?->pemenang) ? $ppbj->pemenang : '(.................)');
        $tglPemenangRaw = !empty($sp->tanggal_pemenang)
            ? $sp->tanggal_pemenang
            : ($ppbj?->tgl_pemenang ?? null);
        $tglPemenang = !empty($tglPemenangRaw)
            ? \Carbon\Carbon::parse($tglPemenangRaw)->locale('id')->translatedFormat('d F Y')
            : '(.................)';

        $tglPr = (!empty($ppbj?->tgl_ppbj))
            ? \Carbon\Carbon::parse($ppbj->tgl_ppbj)->locale('id')->translatedFormat('d F Y')
            : ((!empty($ppbj?->tgl_terima_pr)) ? \Carbon\Carbon::parse($ppbj->tgl_terima_pr)->locale('id')->translatedFormat('d F Y') : '(....................)');

        $tglAwalKontrak = !empty($sp->awal_kontrak)
            ? \Carbon\Carbon::parse($sp->awal_kontrak)->locale('id')->translatedFormat('d F Y')
            : '(....................)';
        $tglAkhirKontrak = !empty($sp->akhir_kontrak)
            ? \Carbon\Carbon::parse($sp->akhir_kontrak)->locale('id')->translatedFormat('d F Y')
            : '(....................)';

        $deskripsi = mb_strtoupper(trim((string) $sp->deskripsi_pengadaan), 'UTF-8');

        $items = $sp->items;
        $subtotal = 0.0;
        foreach ($items as $it) {
            $subtotal += $this->moneyToFloat($it->subtotal ?? 0);
        }
        if ($subtotal <= 0 && $sp->nilai_sp) {
            $subtotal = $this->moneyToFloat($sp->nilai_sp);
        }
        $ppn = round($subtotal * 0.11);
        $total = $subtotal + $ppn;
        $jampel5 = round($total * 0.05, 2);

        $fmt = fn($n) => $this->formatMoney($n);
        $terbilangSubtotal = ucwords($this->terbilang($subtotal));
        $terbilangTotal = ucwords($this->terbilang($total));
        $terbilangJampel = ucwords($this->terbilang(round($jampel5)));

        $cleanText = function (?string $text): string {
            $text = (string) $text;
            $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
            $text = str_replace(['<br>', '<br/>', '<br />'], "\n", $text);
            $text = trim(strip_tags($text));
            return preg_replace('/[ \t]+/', ' ', $text) ?: '-';
        };

        $addPara = function (string $text, array $pStyle = null, array $extraBold = []) use ($section, $fs, $fb, $pJ) {
            $this->kontrakParagraf($section, $text, $pStyle ?? $pJ, $fs, $fb, $extraBold);
        };

        $addNo = function (string $no, string $text, int $depth = 0, array $extraBold = []) use ($addPara, $pJ) {
            $left = $depth === 0 ? 480 : 840;
            $hanging = $depth === 0 ? 480 : 360;
            $style = array_merge($pJ, ['indentation' => ['left' => $left, 'hanging' => $hanging]]);
            $addPara($no . "\t" . $text, $style, $extraBold);
        };

        $pPasal = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 180, 'lineHeight' => 1.0];
        $pPasalLine = ['alignment' => 'center', 'spaceAfter' => 120, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $addPasal = function (string $no, array $judulLines) use ($section, $fb, $pPasal, $pPasalLine) {
            $section->addText('PASAL ' . $no, $fb, $pPasal);
            foreach ($judulLines as $idx => $line) {
                $section->addText($line, $fb, $idx === count($judulLines) - 1 ? $pPasalLine : ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0]);
            }
        };

        // ===================== HALAMAN 1: JUDUL DAN PEMBUKA (TEMPLATE >500 JT) =====================
        $titleStyle = ['bold' => true, 'size' => 11, 'name' => 'Arial'];
        $pTitleLine = [
            'alignment' => 'center',
            'spaceAfter' => 0,
            'spaceBefore' => 0,
            'borderBottomSize' => 12,
            'borderBottomColor' => '000000',
        ];

        $section->addText('KONTRAK PENGADAAN', $titleStyle, $pC);
        $section->addText($deskripsi, $titleStyle, $pC);
        $section->addText('UNTUK', $fb, $pC);
        $section->addText('PT SUPERINTENDING COMPANY OF INDONESIA (PERSERO)', $fb, $pC);
        $section->addText('CABANG PEKANBARU', $fb, $pC);
        $section->addText('ANTARA', $fb, $pC);
        $section->addText('PT SUPERINTENDING COMPANY OF INDONESIA (PERSERO)', $fb, $pC);
        $section->addText('DAN', $fb, $pC);
        $section->addText($vendorUp, $fb, $pTitleLine);
        $section->addTextBreak(1, $p0);
        $section->addText('Nomor : ' . $sp->nomor_sp, $fs, $pC);
        $section->addText('Tanggal : ' . $tgl, $fs, $pC);
        $section->addTextBreak(1, $p0);

        $addNo('I.', 'PERUSAHAAN PERSEROAN PT SUPERINTENDING COMPANY OF INDONESIA disingkat PT SUCOFINDO (PERSERO) NPWP: 01.300.992.3-093.000, yang didirikan dengan Akta Notaris Johan Arifin Lumban Tobing Sutan Arifin di Jakarta No. 42 tanggal 22 Oktober 1956, sebagaimana telah diubah terakhir dengan Akta Pernyataan Keputusan Rapat PT SUPERINTENDING COMPANY OF INDONESIA (Persero) dari Notaris Jose Dimas Satria, SH., M.KN di Jakarta Selatan tanggal 23 Juni 2025 Nomor 130 Tentang Perubahan Anggaran Dasar PT SUPERINTENDING COMPANY OF INDONESIA (Persero) dan telah mendapatkan pengesahan dalam Keputusan Menteri Hukum dan HAM Republik Indonesia tanggal 23 Juni 2025 Nomor : AHU-0139502 Tahun 2025, beralamat di “GRAHA SUPERINTENDING COMPANY OF INDONESIA” Jl. KH. Guru Amin No.Kav 34, RT.4/RW.1, Kelurahan Pancoran, Kecamatan Pancoran, Jakarta Selatan DKI Jakarta 12780, berdasarkan Ketentuan Umum Pengadaan Barang dan Jasa PT SUPERINTENDING COMPANY OF INDONESIA (Persero) dalam perbuatan hukum ini diwakili secara sah oleh ' . $penandatanganSci . ' Jabatan ' . $jabatanSci . ' selanjutnya dalam Kontrak ini disebut sebagai PIHAK KESATU.', 0, [$penandatanganSci, $jabatanSci]);
        $addNo('II.', $vendorUp . ' NPWP ' . $npwpV . ', yang beralamat di ' . $alamatV . ' dalam perbuatan hukum ini diwakili secara sah oleh ' . $direktur . ' jabatan ' . $jabatanVendor . ', selanjutnya dalam Kontrak ini disebut sebagai PIHAK KEDUA.', 0, [$vendorUp, $direktur, $jabatanVendor]);

        $addPara('Berdasarkan pertimbangan-pertimbangan sebagai berikut:');
        $addNo('1.', 'Bahwa PIHAK KESATU telah menyampaikan surat kepada PIHAK KEDUA RFQ ' . $rfqText . ' No. ' . $noPph . ' tanggal ' . $tglPph . ' perihal Surat Permintaan Penawaran Harga (SPPH) dan Negosiasi Harga;');
        $addNo('2.', 'Bahwa PIHAK KEDUA telah menyampaikan surat kepada PIHAK KESATU No. ' . ($sp->sph ?: '(.................)') . ' tanggal ' . ($sp->tgl_sph ? \Carbon\Carbon::parse($sp->tgl_sph)->locale('id')->translatedFormat('d F Y') : '(.................)') . ' perihal Penawaran dan Negosiasi Harga;');
        $addNo('3.', 'Bahwa PIHAK KESATU telah menyampaikan surat kepada PIHAK KEDUA No. ' . $noPemenang . ' tanggal ' . $tglPemenang . ' perihal Pengumuman Penetapan Pemasok Pelaksana Pengadaan ' . $deskripsi . ' untuk PT SUPERINTENDING COMPANY OF INDONESIA (Persero) Cabang Pekanbaru;');
        $deskripsiBold = mb_strtoupper(trim((string) $deskripsi), 'UTF-8');

        $paraRun = $section->addTextRun($pJ);
        $paraRun->addText(
            'Para Pihak setelah menimbang hal-hal tersebut diatas sepakat dan setuju untuk mengikatkan diri dalam suatu Kontrak Pengadaan “',
            $fs
        );
        $paraRun->addText($deskripsiBold, $fb);
        $paraRun->addText(
            '” dengan ketentuan dan syarat-syarat sebagai berikut :',
            $fs
        );
        $section->addTextBreak(1, $p0);

        // ===================== PASAL 1 =====================
        $addPasal('1', ['LINGKUP PEKERJAAN DAN HARGA BORONGAN']);
        $addPara('PIHAK KESATU menyerahkan pekerjaan kepada PIHAK KEDUA, sebagaimana PIHAK KEDUA menerima penyerahan pekerjaan tersebut dari PIHAK KESATU dan berjanji untuk melaksanakan pekerjaan dengan spesifikasi dan harga sebagai berikut:');

        $fmtTable = fn($n) => $this->formatMoney($n);
        $tbl = $section->addTable([
            'borderSize' => 4,
            'borderColor' => '000001',
            'cellMargin' => 55,
            'alignment' => 'center',
            'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
            'width' => 10440,
            'unit' => 'dxa',
        ]);

        $h = ['bold' => true, 'size' => 10, 'name' => 'Arial'];
        $c = ['size' => 10, 'name' => 'Arial'];
        $cb = ['bold' => true, 'size' => 10, 'name' => 'Arial'];
        $ci = ['italic' => true, 'size' => 10, 'name' => 'Arial'];
        $ph = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pl = ['alignment' => 'left', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pr = ['alignment' => 'right', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $vC = ['valign' => 'center'];
        $vT = ['valign' => 'top'];
        $headCell = ['valign' => 'center', 'bgColor' => 'C0C0C0'];

        $tbl->addRow(500, ['exactHeight' => false]);
        $tbl->addCell(500, $headCell)->addText('No', $h, $ph);
        $tbl->addCell(4540, $headCell)->addText('Nama Barang/Peralatan/Jasa', $h, $ph);
        $tbl->addCell(900, $headCell)->addText('Satuan', $h, $ph);
        $tbl->addCell(850, $headCell)->addText('Jumlah', $h, $ph);
        $tbl->addCell(1700, $headCell)->addText('Harga Satuan', $h, $ph);
        $tbl->addCell(1950, $headCell)->addText('Total Harga (Rp.)', $h, $ph);

        if ($items->isEmpty()) {
            $tbl->addRow(700, ['exactHeight' => false]);
            $tbl->addCell(500, $vT)->addText('1', $c, $ph);
            $tbl->addCell(4540, $vT)->addText($cleanText($sp->deskripsi_pengadaan), $ci, $pl);
            $tbl->addCell(900, $vC)->addText('-', $c, $ph);
            $tbl->addCell(850, $vC)->addText('1', $c, $ph);
            $tbl->addCell(1700, $vC)->addText('Rp ' . $fmtTable($subtotal) . ',-', $c, $pr);
            $tbl->addCell(1950, $vC)->addText('Rp ' . $fmtTable($subtotal) . ',-', $c, $pr);
        } else {
            $no = 1;
            foreach ($items as $it) {
                $tbl->addRow(560, ['exactHeight' => false]);
                $tbl->addCell(500, $vT)->addText((string) $no++, $c, $ph);
                $tbl->addCell(4540, $vT)->addText($cleanText($it->nama_barang ?? ''), $ci, $pl);
                $tbl->addCell(900, $vC)->addText($it->satuan ?: '-', $c, $ph);
                $tbl->addCell(850, $vC)->addText($it->jumlah ?: '-', $c, $ph);
                $tbl->addCell(1700, $vC)->addText('Rp ' . $fmtTable($it->harga_satuan ?? 0) . ',-', $c, $pr);
                $tbl->addCell(1950, $vC)->addText('Rp ' . $fmtTable($it->subtotal ?? 0) . ',-', $c, $pr);
            }
        }

        $catatanPr = $sp->nomor_pr
            ? 'Memenuhi Permintaan Bidang Dukungan Bisnis sesuai PR No. ' . $sp->nomor_pr . ' tanggal ' . $tglPr . '.'
            : 'Memenuhi Permintaan Bidang Dukungan Bisnis sesuai PR No. (....................) tanggal (....................).';

        // Summary: kolom Catatan dibuat vertical merge 3 baris supaya tidak muncul garis
        // tepat di bawah tanggal catatan saat baris kanan berisi Harga / PPN / Total.
        $catatanStartCell = ['gridSpan' => 4, 'vMerge' => 'restart', 'valign' => 'top'];
        $catatanContinueCell = ['gridSpan' => 4, 'vMerge' => 'continue', 'valign' => 'top'];

        $tbl->addRow();
        $catCell = $tbl->addCell(6790, $catatanStartCell);
        $catCell->addText('Catatan :', $c, $pl);
        $catCell->addText($catatanPr, $c, $pl);
        $tbl->addCell(1700, $vC)->addText('Harga', $c, $pl);
        $tbl->addCell(1950, $vC)->addText('Rp ' . $fmtTable($subtotal) . ',-', $c, $pr);

        $tbl->addRow();
        $tbl->addCell(6790, $catatanContinueCell);
        $tbl->addCell(1700, $vC)->addText('PPN 11%', $c, $pl);
        $tbl->addCell(1950, $vC)->addText('Rp ' . $fmtTable($ppn) . ',-', $c, $pr);

        $tbl->addRow();
        $tbl->addCell(6790, $catatanContinueCell);
        $tbl->addCell(1700, $vC)->addText('Total', $cb, $pl);
        $tbl->addCell(1950, $vC)->addText('Rp ' . $fmtTable($total), $cb, $pr);

        $tbl->addRow();
        $terCell = $tbl->addCell(10440, ['gridSpan' => 6, 'valign' => 'center']);
        $terRun = $terCell->addTextRun($pl);
        $terRun->addText('Terbilang : ', $cb);
        $terRun->addText($terbilangTotal . ' Rupiah', $cb);
        $section->addTextBreak(1, $p0);

        // ===================== PASAL 2 =====================
        $addPasal('2', ['JANGKA WAKTU PELAKSANAAN PEKERJAAN']);
        $addNo('(1)', 'Jangka waktu pelaksanaan jasa pekerjaan terhitung sejak tanggal ' . $tglAwalKontrak . ' sampai dengan selambat-lambatnya tanggal ' . $tglAkhirKontrak . '.', 0, [$tglAwalKontrak, $tglAkhirKontrak]);
        $addNo('(2)', 'Untuk keperluan penyerahan jasa sebagaimana dimaksud pada ayat (1), PIHAK KESATU menyediakan tempat yang berlokasi di PT SUCOFINDO Cabang Pekanbaru, Kota Pekanbaru, Riau.');

        // ===================== PASAL 3 =====================
        $addPasal('3', ['PELAKSANAAN PEMBAYARAN']);
        $nominalPembayaran = 'Rp. ' . $fmt($subtotal) . ',-';
        $pasal3 = [
            'PIHAK KESATU sebagai Perusahaan yang tergabung dalam Holding Jasa Survey memungut langsung (WAPU) sebesar PPN 11% (Sebelas Persen) kepada PIHAK KEDUA sesuai Peraturan Undang Undang No. 7 Tahun 2021 Tentang Harmonisasi Peraturan Perpajakan.',
            'PIHAK KESATU sebagai Perusahaan yang tergabung dalam Holding Jasa Survey memungut langsung (WAPU) PPh Pasal 23 kepada PIHAK KEDUA jika ada terkait dengan penyerahan jasa sebesar 2 % (dua persen) dari harga pembelian. Apabila PIHAK KEDUA tidak memiliki NPWP maka tarif lebih tinggi 100% (sebesar 4% dari harga pembelian) sesuai Peraturan Menteri Keuangan RI No. 141/2015 Pasal 1 ayat (1).',
            'PIHAK KEDUA merupakan perusahaan kena pajak apabila faktur pajak yang dikeluarkan oleh PIHAK KEDUA tidak diakui atau tidak benar menurut kantor pajak sehingga menyebabkan kerugian PIHAK KESATU maka akan dilakukan pemotongan beban PPN 11% (sebelas persen) dari total nilai kontrak untuk mengganti kerugian tersebut.',
            'Pembayaran ini akan dilakukan pemotongan atau pemungutan sesuai dengan peraturan pajak-pajak yang berlaku.',
            'Apabila ada perbedaan tanggal faktur pajak dengan tanggal penyampaian faktur pajak yang menyebabkan Badan Usaha Milik Negara (BUMN) dikenakan sanksi administrasi perpajakan maka sanksi tersebut akan ditanggung oleh PIHAK KEDUA.',
            'Pembayaran sebesar ' . $nominalPembayaran . ' (' . $terbilangSubtotal . ' Rupiah) belum termasuk PPN 11% (sebelas persen) akan dibayarkan secara sekaligus setelah pelaksanaan pekerjaan dilaksanakan dan dinyatakan selesai, diverifikasi, dan disetujui oleh PIHAK KESATU melalui transfer ke Rekening Bank PIHAK KEDUA, setelah persyaratan tagihan pembayaran sebagaimana dimaksud pada ayat (8) diterima lengkap.',
            'Biaya transfer menjadi beban PIHAK KEDUA',
            'Pembayaran atas harga sebagaimana dimaksud pada ayat (6) pasal ini akan diatur dan dilaksanakan kepada PIHAK KEDUA setelah ditandatangani Kontrak ini oleh Para Pihak dan PIHAK KEDUA telah menyerahkan syarat-syarat sebagai berikut:',
        ];
        foreach ($pasal3 as $i => $text) {
            $extra = [];
            if ($i === 3)
                $extra[] = $text;
            if ($i === 5)
                $extra[] = $nominalPembayaran;
            $addNo('(' . ($i + 1) . ')', $text, 0, $extra);
        }

        foreach ([
            'Copy Spesimen tanda tangan Faktur Pajak yang dilaporkan ke KPP setempat;',
            'Copy Surat Pengukuhan sebagai Pengusaha Kena Pajak (PKP);',
            'Surat Pemberitahuan Nomor Serie E-Faktur Pajak dari KPP setempat;',
            'Surat Keterangan terdaftar dari KPP setempat;',
            'Lampiran Pembayaran SPT PPN di bulan sebelumnya;',
            'Kuitansi rangkap 2 (dua), 1 (satu) Lembar Kesatu bermeterai cukup;',
            'Faktur Penjualan atau Invoice rangkap 2 (dua);',
            '1 (satu) Asli Lembar Kesatu dan 2 (dua) copy/salinan E-Faktur Pajak yang sudah ada barcode;',
            'Copy Jaminan Pelaksanaan (Performance Bond);',
            'Asli Kontrak yang telah ditandatangani oleh Para Pihak dan dibubuhi meterai cukup;',
            'Asli Berita Acara Serah Terima Hasil Pekerjaan Jasa yang ditandatangani oleh PIHAK KESATU dan PIHAK KEDUA;',
            'Copy Dokumen Persetujuan Teknis dan Lampiran tambahan sesuai kebutuhan pekerjaan;',
            'Surat Perintah Pembayaran (SPP) yang diterbitkan oleh PIHAK KESATU dari aplikasi ERP (c/q. Fungsi Keuangan dan Akuntansi Cabang Pekanbaru);',
            'Receipt yang diterbitkan PIHAK KESATU (c/q Fungsi Umum Cabang Pekanbaru) dari aplikasi ERP;',
            'Nomor Rekening Bank PIHAK KEDUA.',
        ] as $idx => $doc) {
            $addNo(chr(97 + $idx) . '.', $doc, 1);
        }

        $pasal3lanjutan = [
            'Pembayaran dilakukan dengan cara sekaligus keseluruhan setelah seluruh pekerjaan selesai dan diterima oleh PIHAK KESATU dan Pemberi Kerja dengan benar dan dapat dipergunakan serta dipenuhinya ayat (8).',
            'PIHAK KESATU (c/q. Divisi Keuangan dan Akuntansi (KAK)) menerima dokumen tagihan dari PIHAK KEDUA setiap hari Senin dan Rabu dengan batas akhir pada tanggal 20 (dua puluh) setiap bulannya, apabila pada tanggal 20 (dua puluh) bukan jatuh pada hari Senin dan Rabu, maka tagihan tersebut dimasukan ke awal bulan berikutnya.',
            'PARA PIHAK sepakat bahwa pembayaran kepada PIHAK KEDUA akan dilakukan setelah PIHAK KESATU menerima pembayaran dari Pemberi Kerja.',
            'Dengan tetap tunduk kepada ketentuan ayat (11) Pasal ini, PIHAK KESATU akan melakukan pembayaran sebagaimana dimaksud pada ayat (6) melalui transfer ke Rekening Bank PIHAK KEDUA selambat-lambatnya 45 (empat puluh lima) hari kalender sejak dokumen tagihan lengkap diterima oleh PIHAK KESATU.',
        ];
        foreach ($pasal3lanjutan as $i => $text) {
            $addNo('(' . ($i + 9) . ')', $text);
        }

        // ===================== PASAL 4 =====================
        $addPasal('4', ['JAMINAN PELAKSANAAN']);
        $addNo('(1)', 'PIHAK KEDUA harus menyerahkan kepada PIHAK KESATU Asli Jaminan Pelaksanaan (Performance Bond) sebesar 5% dari total harga keseluruhan setelah PPN 11% senilai Rp. ' . $fmt($jampel5) . ',- (' . $terbilangJampel . ' Rupiah) yang diterbitkan oleh Bank yang mempunyai program Surety Bond.', 0, ['Rp. ' . $fmt($jampel5) . ',-']);
        $addNo('(2)', 'Jaminan Pelaksanaan (Performance Bond) ayat (1) disetor/diserahkan oleh PIHAK KEDUA kepada PIHAK KESATU (c/q Fungsi Keuangan & Akuntansi), sedangkan copynya kepada Fungsi Umum PIHAK KESATU untuk kelengkapan dokumen Kontrak ini.', 0);
        $addNo('(3)', 'Jaminan Pelaksanaan (Performance Bond) yang berupa Jaminan Bank sebagaimana dimaksud pada ayat (1) mempunyai masa berlaku sejak tanggal ' . $tglAwalKontrak . ' sampai dengan tanggal ' . $tglAkhirKontrak . ', Apabila Jaminan Pelaksanaan (Performance Bond) tersebut habis masa berlakunya sebelum seluruh pekerjaan selesai, maka PIHAK KEDUA berkewajiban untuk memperpanjang masa berlaku Jaminan Pelaksanaan (Performance Bond) dimaksud dan menyerahkannya kepada PIHAK KESATU selambat-lambatnya 7 (tujuh) hari kalender sebelum habisnya masa berlaku Jaminan Pelaksanaan (Performance Bond) tersebut.', 0);
        $addNo('(4)', 'Apabila PIHAK KEDUA lalai ataupun sengaja tidak menyerahkan Jaminan Pelaksanaan (Performance Bond) yang telah diperpanjang dalam jangka waktu sebagaimana dimaksud pada ayat (3), maka PIHAK KESATU berhak secara sepihak tanpa perlu adanya pemberitahuan terlebih dahulu kepada PIHAK KEDUA untuk menguang-tunaikan Jaminan Pelaksanaan (Performance Bond) dimaksud, dalam waktu 6 (enam) hari kalender sebelum masa berlakunya berakhir dan berhak untuk tidak membayarkan atau berhak menahan angsuran selanjutnya.', 0);
        $addNo('(5)', 'Jaminan Pelaksanaan (Performance Bond) sebagaimana dimaksud pada ayat (1) dikembalikan oleh PIHAK KESATU kepada PIHAK KEDUA secara sekaligus setelah Pemenuhan seluruh pekerjaan sesuai dengan kontrak yang diterbitkan.', 0);
        $addNo('(6)', 'Apabila PIHAK KEDUA tidak dapat menyelesaikan pelaksanaan pekerjaan baik sebagian maupun seluruhnya sesuai dengan ketentuan-ketentuan dalam Kontrak ini, maka Jaminan Pelaksanaan (Performance Bond) menjadi milik PIHAK KESATU.', 0);

        // ===================== PASAL 5 - 13 =====================
        $pasalStatis = [
            [
                '5',
                ['KEWAJIBAN DAN JAMINAN MUTU'],
                [
                    'PIHAK KEDUA wajib memberikan jaminan bahwa pegawai yang dipekerjakan dalam keadaan sehat jasmani maupun rohani serta mampu bekerja secara professional.',
                    'PIHAK KEDUA menjamin bahwa penyediaan jasa memenuhi persyaratan dan ketentuan-ketentuan telah disepakati oleh PIHAK KESATU dan PIHAK KEDUA.',
                    'PIHAK KEDUA menjamin jasa yang dipasok diperoleh dengan cara legal serta tidak melanggar hukum dan ketentuan/peraturan perundang-undangan yang berlaku.',
                    'PIHAK KEDUA melaksanakan tugas secara tertib, disertai rasa tanggung jawab untuk mencapai sasaran, kelancaran, dan ketepatan tujuan Pengadaan Barang dan Jasa.',
                    'Para Pihak bekerja secara profesional, mandiri, dan menjaga kerahasiaan informasi yang menurut sifatnya harus dirahasiakan untuk mencegah penyimpangan Pengadaan Barang dan Jasa.',
                    'Para Pihak tidak saling mempengaruhi baik langsung maupun tidak langsung yang berakibat persaingan usaha tidak sehat.',
                    'PIHAK KEDUA menerima dan bertanggung jawab atas segala keputusan yang ditetapkan oleh PIHAK KESATU sesuai dengan kesepakatan tertulis yang di buat oleh Para Pihak.',
                    'Para Pihak menghindari dan mencegah terjadinya pertentangan kepentingan baik secara langsung maupun tidak langsung, yang berakibat persaingan usaha tidak sehat dalam Pengadaan Barang dan Jasa.',
                    'PIHAK KESATU menghindari dan mencegah pemborosan dan kebocoran keuangan negara/perusahaan.',
                    'Para Pihak menghindari dan mencegah penyalahgunaan wewenang dan/atau kolusi.',
                    'Para Pihak Tidak menerima, tidak menawarkan, atau tidak menjanjikan untuk memberi atau menerima hadiah, imbalan, komisi, rabat, dan apa saja dari atau kepada siapapun yang diketahui atau patut diduga berkaitan dengan Pengadaan Barang dan Jasa.',
                    'PIHAK KEDUA wajib menerapkan Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3) sesuai Peraturan Pemerintah No. 50 tahun 2012.',
                    'PIHAK KEDUA wajib untuk terus bertanggung jawab atas gugatan atau tuntutan atau klaim dari Pemberi Kerja dan/atau pihak lainnya terhadap pelaksanaan pekerjaan yang dilaksanakan oleh PIHAK KEDUA.',
                ]
            ],
            ['6', ['LAPORAN HASIL PELAKSANAAN PEKERJAAN'], []],
            ['7', ['KERAHASIAAN'], []],
            [
                '8',
                ['DENDA'],
                [
                    'Jika jangka waktu pelaksanaan pekerjaan sebagaimana dimaksud dalam Pasal 2 ayat (1) Kontrak ini dilampaui, maka kepada PIHAK KEDUA akan dikenakan denda sebesar 1‰ (satu permil) per hari kalender keterlambatan dari total nilai kontrak dan/atau dari sisa nilai kontrak pekerjaan dengan maksimal denda sebesar 5% (lima persen) sebelum Pajak sebagaimana dimaksud dalam Pasal 1 Kontrak ini.',
                    'Dalam hal ini PIHAK KEDUA dikenakan denda sesuai dengan ayat (1) maka PIHAK KESATU berhak untuk langsung memotong jumlah pembayaran tagihan PIHAK KEDUA sesuai dengan jumlah perhitungan denda yang dikenakan kepada PIHAK KEDUA.',
                ]
            ],
            [
                '9',
                ['FORCE MAJEURE'],
                [
                    'Force Majeure adalah sebagai berikut :',
                    'Dalam hal terjadi Force Majeure sebagaimana dimaksud pada ayat (1), maka Pihak yang mengalami Force Majeure wajib memberitahukan secara tertulis kepada Pihak lainnya dalam waktu 7 (tujuh) hari kalender sejak saat terjadinya Force Majeure, begitu juga saat berakhirnya dan dijelaskan secara resmi oleh Pejabat yang berwenang melalui media massa.',
                    'Kelalaian atau kelambatan dalam memenuhi kewajiban memberitahukan sebagaimana dimaksud dalam ayat (2) mengakibatkan tidak diakuinya oleh Pihak lain peristiwa sebagaimaan dimaksud pada ayat (1) sebagai Force Majeure.',
                    'Kejadian-kejadian sebagaimana dimaksud pada ayat (1) atas permintaan tertulis dari Pihak yang mengalami Force Majeure, dapat diperhitungkan sebagai perpanjangan jangka waktu pelaksanaan, kewajiban pihak–pihak menurut Kontrak ini, apabila ketentuan sebagaimana dimaksud pada ayat (2) tersebut dipenuhi.',
                    'Semua kerugian dan biaya yang diderita oleh salah satu Pihak sebagai akibat terjadinya Force Majeure bukan merupakan tanggung jawab Pihak lainnya.',
                ]
            ],
            [
                '10',
                ['PEMUTUSAN KONTRAK'],
                [
                    'PIHAK KESATU berhak secara sepihak, tanpa adanya suatu tuntutan apapun dari PIHAK KEDUA untuk memutuskan dan/atau mengakhiri sebagian atau seluruh pekerjaan menurut Kontrak ini, apabila salah satu di antara sebab-sebab pemutusan tersebut di bawah ini terjadi :',
                    'Untuk hal ikhwal pemutusan Kontrak ini sebagaimana dimaksud pada ayat (1) pasal ini, Para Pihak dengan ini menyatakan sepakat mengesampingkan berlakunya ketentuan sebagaimana dimaksud dalam Pasal 1266 Kitab Undang-Undang Hukum Perdata terhadap Kontrak ini dapat dilakukan secara sah cukup dengan surat pemberitahuan secara tertulis dari PIHAK KESATU kepada PIHAK KEDUA, tanpa perlu menunggu adanya keputusan dari Pengadilan serta dengan ini PIHAK KEDUA dapat menyatakan hak-hak yang timbul dari padanya apabila ada untuk dimintakan penggantian kepada PIHAK KESATU dan disepakati oleh Para Pihak.',
                    'Dalam hal terjadinya pemutusan dari Kontrak ini, ketentuan-ketentuan dalam Kontrak ini berlaku terus sampai diselesaikannya kelebihan atau kekurangan pembayaran sebagaimana dimaksud dalam Pasal 3, yang telah dilakukan oleh PIHAK KESATU kepada PIHAK KEDUA.',
                    'PIHAK KEDUA dengan ini menyatakan membebaskan PIHAK KESATU dari segala tuntutan hukum termasuk dari Pihak Ketiga karena pemutusan Kontrak ini, apabila terbukti merupakan kesalahan PIHAK KEDUA maka sepenuhnya menjadi tanggungjawab PIHAK KEDUA.',
                    'PIHAK KESATU akan menunda dan/atau membatalkan transaksi kepada PIHAK KEDUA apabila dalam proses pengadaan ini terindikasi adanya penyimpangan, penyuapan dan/atau kecurangan sebagaimana dimaksud pada Peraturan Menteri Negara Badan Usaha Milik Negara Nomor Per-19/MBU/2012 tanggal 27 Desember 2012 perihal Pedoman Penundaan Transaksi Bisnis Yang Terindikasi Penyimpangan penyuapan Dan/Atau Kecurangan PER-08/MBU/12/2019 tanggal 12 Desember 2019 perihal Pedoman Umum Pelaksanaan Pengadaan Barang dan Jasa Badan Usaha Milik Negara.',
                ]
            ],
            [
                '11',
                ['PENYELESAIAN PERSELISIHAN'],
                [
                    'Apabila dikemudian hari terjadi perselisihan dalam penafsiran atau pelaksanaan ketentuan Kontrak ini, PIHAK KESATU dan PIHAK KEDUA sepakat untuk terlebih dahulu menyelesaikan secara musyawarah.',
                    'Bilamana musyawarah sebagaimana dimaksud pada ayat (2) tidak menghasilkan kata sepakat tentang cara penyelesaian perselisihan, maka Para Pihak sepakat untuk menyerahkan semua sengketa yang timbul dari Kontrak ini kepada Badan Arbitrase Nasional Indonesia (BANI) untuk diselesaikan pada tingkat pertama dan terakhir menurut peraturan prosedur BANI oleh arbiter yang ditunjuk menurut peraturan tersebut.',
                ]
            ],
            [
                '12',
                ['PEJABAT YANG DITUNJUK UNTUK TANDATANGAN'],
                [
                    'Untuk kelancaran pelaksanaan Kontrak ini, PIHAK KESATU dan PIHAK KEDUA sepakat bahwa Pejabat yang ditunjuk mewakili dalam pembuatan Berita Acara Serah Terima Hasil Pekerjaan Jasa dan sebagainya yang berkaitan erat dengan Kontrak ini:',
                    'Penggantian Pejabat yang ditunjuk oleh PIHAK KESATU dan PIHAK KEDUA sebagaimana dimaksud pada ayat (1) hanya dapat dilaksanakan atas kesepakatan PIHAK KESATU dan PIHAK KEDUA dan dituangkan secara tertulis.',
                ]
            ],
            [
                '13',
                ['LAIN-LAIN'],
                [
                    'Apabila dalam pelaksanaan Kontrak ini terjadi tindakan penyimpangan dan/atau kecurangan, maka PIHAK KESATU dapat melakukan penundaan dan/atau pembatalan Perjanjian ini. Hak dan tanggung jawab sebelum penundaan dan/atau pembatalan tetap menjadi tanggung jawab masing-masing PIHAK.',
                    'Para Pihak sepakat Menerapkan Sistem Manajemn Anti Penyuapan (SMAP).',
                    'PIHAK KEDUA wajib mengijinkan PIHAK KESATU, atau perwakilan mereka yang ditunjuk untuk mengakses, memeriksa dan membuat salinan - salinan dari buku-buku, catatan-catatan dan rekening- rekening dan rekening-rekening yang dimiliki ditempat PIHAK KEDUA dalam rangka audit kepatuhan PIHAK KEDUA terhadap hukum Anti-Korupsi dan/atau Kewajiban Anti Korupsi, Sebagai tambahan, PIHAK KEDUA harus bekerjasama dan menyediakan semua bantuan yang wajar, termasuk membuat pembukuan-pembukuan, catatan-catatan, rekening-rekening dan personil yang ada, untuk memungkinkan PIHAK KESATU melakukan investigasi setiap potensi ataupun pelanggaran nyata, atau melaksanakan aktivitas yang dipersyaratkan oleh pemerintah atau institusi yang relevan sehubungan dengan memastikan atau memverifikasi kepatuhan PIHAK KESATU terhadap Hukum Anti-Korupsi dan/atau Kewajiban Anti-Korupsi.',
                    'PIHAK KESATU akan memeriksa terlebih dahulu sebelum jasa diserahkan dan apabila tidak memenuhi syarat sesuai Pasal 1 Kontrak ini, PIHAK KESATU akan mengembalikan kepada PIHAK KEDUA dengan beban dan biaya menjadi tanggung jawab PIHAK KEDUA.',
                    'Apabila PIHAK KEDUA mengirim jasa kepada PIHAK KESATU, PIHAK KEDUA wajib menyampaikan Copy Kontrak Ringkas kepada petugas penerima jasa PIHAK KESATU.',
                    'PIHAK KESATU dibebaskan dari semua bentuk beban serta tuntutan apapun dari Pihak Ketiga yang berkaitan dengan Kontrak ini.',
                    'Setiap perubahan mengenai isi, baik persyaratan, lingkup pekerjaan, harga-harganya maupun perpanjangan waktu harus disetujui secara terpisah oleh PIHAK KESATU dan PIHAK KEDUA dengan membuat Amandemen terhadap Kontrak ini.',
                    'Kontrak ini dibuat rangkap 2 (dua) asli masing-masing sama bunyinya, mempunyai kekuatan hukum yang sama setelah ditandatangani oleh PIHAK KESATU dan ditandatangani oleh PIHAK KEDUA serta dibubuhi Cap Perusahaan dan diberi materai cukup.',
                    'Asli Kontrak agar diserahkan kepada PIHAK KESATU paling lambat 2 (dua) hari kerja, sejak diterimanya asli/copy Kontrak ini sebagai pemberitahuan, baik yang disampaikan melalui faksimili/e-mail maupun kurir.',
                ]
            ],
        ];

        foreach ($pasalStatis as [$noPasal, $judul, $ayatList]) {
            $addPasal($noPasal, $judul);

            if ($noPasal === '6') {
                $addPara('PIHAK KEDUA wajib menyerahkan laporan hasil pelaksanaan pekerjaan ' . $deskripsi . ' kepada PIHAK KESATU dalam jangka waktu sesuai masa kontrak.');
                continue;
            }

            if ($noPasal === '7') {
                $addPara('Para Pihak dalam waktu yang tidak terbatas harus memberlakukan sebagai rahasia dan menjamin agar pegawai-pegawainya, pekerja-pekerjanya maupun orang-orang yang bekerja untuknya akan memberlakukan rahasia setiap keterangan yang diterima dan/atau yang diperolehnya dengan cara apapun juga serta wajib menjamin semua dokumen yang berhubungan dengan pelaksanaan pekerjaan Jasa menurut Kontrak ini hanya untuk dipergunakan untuk pelaksanaan yang berkaitan dengan pekerjaan Jasa sebagaimana dimaksud dalam isi Kontrak ini');
                continue;
            }

            foreach ($ayatList as $idx => $text) {
                $addNo('(' . ($idx + 1) . ')', $text);

                if ($noPasal === '9' && $idx === 0) {
                    $addNo('a.', 'Gempa bumi besar, angin topan, banjir besar, kebakaran besar, tanah longsor dan wabah penyakit.', 1);
                    $addNo('b.', 'Pemberontakan, pemogokan umum, huru-hara, sabotase, perang dan kebijakan Pemerintah yang berakibat langsung terhadap Kontrak ini.', 1);
                }

                if ($noPasal === '10' && $idx === 0) {
                    foreach ([
                        'Apabila dalam waktu 7 (tujuh) hari kalender terhitung sejak ditandatanganinya Kontrak ini, PIHAK KEDUA ternyata tidak atau belum memulai pelaksanaan pekerjaan menurut Kontrak ini.',
                        'Pelaksanaan Kontrak ini tertunda karena terjadinya kejadian-kejadian Force Majeure sebagaimana dimaksud dalam Pasal 9 ayat (1) yang berlangsung lebih dari 1 (satu) bulan.',
                        'Pelaksanaan Kontrak ini tertunda oleh PIHAK KEDUA lebih dari 14 (empat belas) hari, dimana tertundanya pekerjaan tersebut tidak disebabkan oleh kejadian-kejadian sebagaimana dimaksud dalam Pasal 9 ayat (1), tidak juga oleh karena kesalahan PIHAK KESATU apapun, akan tetapi disebabkan oleh hal-hal untuk mana PIHAK KEDUA tidak memungkinkan melanjutkan pekerjaannya, namun tidak hanya terbatas pada surat izin usaha dicabut atau dinyatakan tidak berlaku lagi atau PIHAK KEDUA dinyatakan pailit oleh Pengadilan Niaga.',
                        'Apabila PIHAK KEDUA terbukti tidak dapat melaksanakan Kontrak ini sebagaimana dimaksud dalam Pasal 1.',
                        'Apabila PIHAK KEDUA ternyata menyerahkan pelaksanaan pekerjaan baik sebagian atau seluruhnya kepada Pihak Ketiga tanpa persetujuan secara tertulis dari PIHAK KESATU.',
                    ] as $sidx => $sub) {
                        $addNo(chr(97 + $sidx) . '.', $sub, 1);
                    }
                }

                if ($noPasal === '12' && $idx === 0) {
                    $pPejabat = ['spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
                    $noBorderPejabat = [
                        'borderTopSize' => 0,
                        'borderTopColor' => 'FFFFFF',
                        'borderBottomSize' => 0,
                        'borderBottomColor' => 'FFFFFF',
                        'borderLeftSize' => 0,
                        'borderLeftColor' => 'FFFFFF',
                        'borderRightSize' => 0,
                        'borderRightColor' => 'FFFFFF',
                        'valign' => 'top',
                    ];

                    $tblPejabat = $section->addTable([
                        'borderSize' => 0,
                        'borderColor' => 'FFFFFF',
                        'cellMargin' => 0,
                        'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
                        'width' => 9000,
                        'unit' => 'dxa',
                    ]);

                    $tblPejabat->addRow();
                    $tblPejabat->addCell(480, $noBorderPejabat)->addText('', $fs, $pPejabat);
                    $tblPejabat->addCell(240, $noBorderPejabat)->addText('a.', $fs, $pPejabat);
                    $tblPejabat->addCell(1800, $noBorderPejabat)->addText('PIHAK KESATU', $fb, $pPejabat);
                    $tblPejabat->addCell(250, $noBorderPejabat)->addText(':', $fs, $pPejabat);
                    $tblPejabat->addCell(6230, $noBorderPejabat)->addText($bidangIpItu . ' / PEJABAT YANG DITUNJUK', $fs, $pPejabat);

                    $tblPejabat->addRow();
                    $tblPejabat->addCell(480, $noBorderPejabat)->addText('', $fs, $pPejabat);
                    $tblPejabat->addCell(240, $noBorderPejabat)->addText('b.', $fs, $pPejabat);
                    $tblPejabat->addCell(1800, $noBorderPejabat)->addText('PIHAK KEDUA', $fb, $pPejabat);
                    $tblPejabat->addCell(250, $noBorderPejabat)->addText(':', $fs, $pPejabat);
                    $tblPejabat->addCell(6230, $noBorderPejabat)->addText($jabatanVendor, $fs, $pPejabat);

                    $section->addTextBreak(1, $p0);
                }
            }
        }

        // ===================== TANDA TANGAN =====================
        $section->addTextBreak(1, $p0);
        $addPara('Demikian Kontrak ini dibuat dengan itikad baik untuk dipatuhi serta dilaksanakan oleh PIHAK KESATU dan PIHAK KEDUA.');
        $section->addTextBreak(1, $p0);

        $sigPC = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $noBorderCell = [
            'borderTopSize' => 0,
            'borderTopColor' => 'FFFFFF',
            'borderBottomSize' => 0,
            'borderBottomColor' => 'FFFFFF',
            'borderLeftSize' => 0,
            'borderLeftColor' => 'FFFFFF',
            'borderRightSize' => 0,
            'borderRightColor' => 'FFFFFF',
            'valign' => 'top',
        ];
        $sigTbl = $section->addTable([
            'borderSize' => 0,
            'borderColor' => 'FFFFFF',
            'cellMargin' => 0,
            'alignment' => 'center',
            'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
            'width' => 9000,
            'unit' => 'dxa',
        ]);
        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText('PIHAK KESATU', $fb, $sigPC);
        $sigTbl->addCell(4500, $noBorderCell)->addText('PIHAK KEDUA', $fb, $sigPC);

        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText('PT SUCOFINDO (PERSERO) CABANG PEKANBARU', $fb, $sigPC);
        $sigTbl->addCell(4500, $noBorderCell)->addText($vendorUp, $fb, $sigPC);

        $sigTbl->addRow(1900, ['exactHeight' => false]);
        $sigTbl->addCell(4500, $noBorderCell)->addText('', $fs, $p0);
        $sigTbl->addCell(4500, $noBorderCell)->addText('', $fs, $p0);

        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText($penandatanganSci, $fbu, $sigPC);
        $sigTbl->addCell(4500, $noBorderCell)->addText($direktur, $fbu, $sigPC);

        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText($jabatanSci, $fb, $sigPC);
        $sigTbl->addCell(4500, $noBorderCell)->addText($jabatanVendor, $fb, $sigPC);

        $section->addTextBreak(1, $p0);
        $noteRun = $section->addTextRun(['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0]);
        $noteRun->addText('Catatan: ', ['italic' => true, 'size' => 8, 'name' => 'Arial']);
        $noteRun->addText('Dalam menjaga Integritas dan Kredibilitas Insan PT SUCOFINDO (Persero) kami sangat menghargai apabila Perusahaan/Organisasi Saudara tidak memberikan bingkisan/tanda terima kasih kepada Insan PT SUCOFINDO (Persero).', ['italic' => true, 'size' => 8, 'name' => 'Arial']);

        // ===================== PAKTA INTEGRITAS =====================
        // Pakta dibuat sebagai section baru agar tidak ikut header "Lanjutan Kontrak" dan nomor halaman kontrak.
        $paktaSection = $phpWord->addSection([
            'pageSizeW' => 11906,
            'pageSizeH' => 16838,
            'marginTop' => 1750,
            'marginBottom' => 1304,
            'marginLeft' => 1418,
            'marginRight' => 1418,
            'headerHeight' => 737,
            'footerHeight' => 709,
        ]);

        $addParaPakta = function (string $text, array $pStyle = null, array $extraBold = []) use ($paktaSection, $fs, $fb, $pJ) {
            $this->kontrakParagraf($paktaSection, $text, $pStyle ?? $pJ, $fs, $fb, $extraBold);
        };

        $addNoPakta = function (string $no, string $text, int $depth = 0, array $extraBold = []) use ($addParaPakta, $pJ) {
            $left = $depth === 0 ? 360 : 720;
            $style = array_merge($pJ, ['indentation' => ['left' => $left, 'hanging' => 360]]);
            $addParaPakta($no . "\t" . $text, $style, $extraBold);
        };

        $paktaTitle = ['bold' => true, 'size' => 14, 'name' => 'Arial'];

        $paktaSection->addText('PAKTA INTEGRITAS', $paktaTitle, $pC);
        $paktaSection->addTextBreak(1, $p0);
        $addParaPakta('Kami yang bertanda tangan dibawah ini, sehubungan dengan pelaksanaan Pengadaan ' . $deskripsi . ' untuk PT SUCOFINDO, dengan ini menyatakan bahwa :');

        foreach ([
            'Kami berjanji tidak akan melakukan praktek Korupsi, Kolusi & Nepotisme (KKN);',
            'Kami tidak menerima, tidak menawarkan, atau tidak menjanjikan untuk memberi atau menerima hadiah, imbalan, komisi, rabat, dan apa saja dari atau kepada siapapun yang diketahui atau patut diduga berkaitan dengan pengadaan ini.',
            'Kami tidak memiliki kepentingan pribadi atau tujuan melakukan sesuatu untuk manfaat diri sendiri, maupun menguntungkan pihak-pihak terkait dengan diri kami, atau pihak yang berafiliasi dengan kami dan dengan demikian tidak memiliki posisi yang mengundang potensi benturan kepentingan (Conflict of interest), termasuk dengan seluruh pihak yang terlibat dengan tindakan dimaksud.',
            'Kami akan melaporkan kepada pihak yang berwajib/berwenang apabila mengetahui ada indikasi KKN dan Penyuapan di dalam proses pengadaan ini.',
            'Kami memahami dan mentaati serta tunduk terhadap ketentuan-ketentuan/persyaratan pengadaan ini.',
            'Kami berjanji akan melaksanakan pengadaan tersebut di atas secara bersih, transparan dan profesional dengan mengerahkan segala kemampuan dan sumber daya secara optimal untuk memberikan hasil kerja terbaik.',
            'Kami akan menunda dan/atau membatalkan transaksi apabila dalam proses pengadaan ini terindikasi adanya Kecurangan atau Penyuapan atau Penyimpangan.',
        ] as $i => $text) {
            $addNoPakta(($i + 1) . '.', $text);
        }

        $addParaPakta('Apabila kami melanggar hal-hal yang telah kami nyatakan dalam Pakta Integritas ini, kami bersedia dikenakan sanksi moral, sanksi administrasi serta dituntut ganti rugi dan pidana sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.');
        $paktaSection->addTextBreak(1, $p0);

        // ===================== TANDA TANGAN PAKTA INTEGRITAS =====================
        $pPaktaSig = [
            'alignment' => 'left',
            'spaceAfter' => 0,
            'spaceBefore' => 0,
            'lineHeight' => 1.0,
        ];

        // Style tanda tangan Pakta dibuat sama dengan tanda tangan kontrak/Pasal 11
        $paktaName = [
            'bold' => true,
            'underline' => 'single',
            'size' => 11,
            'name' => 'Arial',
        ];

        $paktaJabatan = [
            'bold' => true,
            'size' => 11,
            'name' => 'Arial',
        ];

        $pkNoBorderCell = [
            'borderTopSize' => 0,
            'borderTopColor' => 'FFFFFF',
            'borderBottomSize' => 0,
            'borderBottomColor' => 'FFFFFF',
            'borderLeftSize' => 0,
            'borderLeftColor' => 'FFFFFF',
            'borderRightSize' => 0,
            'borderRightColor' => 'FFFFFF',
            'valign' => 'top',
        ];

        $pkTbl = $paktaSection->addTable([
            'borderSize' => 0,
            'borderColor' => 'FFFFFF',
            'cellMargin' => 0,
            'alignment' => 'center',
            'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
            'width' => 9000,
            'unit' => 'dxa',
        ]);

        // Row 1: Tanggal dan Penyedia Eksternal
        $pkTbl->addRow();
        $lc = $pkTbl->addCell(4500, $pkNoBorderCell);
        $lc->addText('Pekanbaru, ' . $tglPakta, $fs, $pPaktaSig);

        $rc = $pkTbl->addCell(4500, $pkNoBorderCell);
        $rc->addText('Penyedia Eksternal', $fs, $pPaktaSig);

        // Row 2: Nama perusahaan
        $pkTbl->addRow();
        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText('PT SUCOFINDO CABANG PEKANBARU', $fs, $pPaktaSig);

        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($vendorUp, $fs, $pPaktaSig);

        // Row 3: Ruang tanda tangan
        $pkTbl->addRow(2100, ['exactHeight' => false]);
        $pkTbl->addCell(4500, $pkNoBorderCell)->addText('', $fs, $p0);
        $pkTbl->addCell(4500, $pkNoBorderCell)->addText('', $fs, $p0);

        // Row 4: Nama — mengikuti Penandatangan SCI yang dipakai di kontrak/Pasal 11
        $pkTbl->addRow();
        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($penandatanganSci, $paktaName, $pPaktaSig);

        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($direktur, $paktaName, $pPaktaSig);

        // Row 5: Jabatan — mengikuti Jabatan SCI yang dipakai di kontrak/Pasal 11
        $pkTbl->addRow();
        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($jabatanSci, $paktaJabatan, $pPaktaSig);

        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($jabatanVendor, $paktaJabatan, $pPaktaSig);


        // ===================== FORM UJI KELAYAKAN PENYEDIA EKSTERNAL =====================
        // Dibuat setelah Pakta Integritas, mengikuti format halaman tambahan tanpa lanjutan kontrak.
        $this->addFormUjiKelayakanPenyediaEksternal(
            $phpWord,
            $deskripsi,
            $sp->nomor_pr,
            $tglPr,
            $vendorUp,
            $tglPakta,
            $penandatanganSci,
            $jabatanSci
        );

        // ===================== GENERATE FILE =====================
        $cleanDesc = preg_replace('/[\r\n]+/', ' ', $sp->deskripsi_pengadaan);
        $cleanDesc = preg_replace('/[^A-Za-z0-9\s\-]/', '', $cleanDesc);
        $cleanDesc = trim(preg_replace('/\s+/', ' ', $cleanDesc));
        $shortDesc = strlen($cleanDesc) > 40 ? substr($cleanDesc, 0, 40) : $cleanDesc;

        $filename = 'Kontrak Ringkas Pengadaan ' . $shortDesc . '.docx';
        $tempPath = storage_path('app/kontrak_ringkas_500_' . $sp->id . '_' . Str::random(8) . '.docx');
        IOFactory::createWriter($phpWord, 'Word2007')->save($tempPath);

        $imagePath = $this->resolveKopSuratPath(false);
        $imagePath2 = $this->resolveKopSuratPath(true);
        if ($imagePath) {
            $this->injectHeaderWatermark($tempPath, $imagePath, $imagePath2, $sp->nomor_sp);
        }

        if (!file_exists($tempPath) || filesize($tempPath) === 0) {
            $fallbackPath = storage_path('app/fallback_' . $filename);
            IOFactory::createWriter($phpWord, 'Word2007')->save($fallbackPath);
            return response()->download($fallbackPath, $filename)->deleteFileAfterSend(true);
        }

        return response()->download($tempPath, $filename)->deleteFileAfterSend(true);
    }

    public function cetakKontrak(Sp $sp, ?float $nilaiAcuan = null)
    {
        $sp->load('items');

        $phpWord = new PhpWord();
        \PhpOffice\PhpWord\Settings::setOutputEscapingEnabled(true);
        $phpWord->setDefaultFontName('Arial');
        $phpWord->setDefaultFontSize(11);
        $phpWord->setDefaultParagraphStyle(['spaceAfter' => 120, 'spaceBefore' => 0, 'lineHeight' => 1.08]);

        $fs = ['size' => 11, 'name' => 'Arial'];
        $fb = ['bold' => true, 'size' => 11, 'name' => 'Arial'];
        $fi = ['italic' => true, 'size' => 11, 'name' => 'Arial'];
        $p0 = ['spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pJ = ['alignment' => 'both', 'spaceAfter' => 120, 'spaceBefore' => 0, 'lineHeight' => 1.08];
        $pC = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pR = ['alignment' => 'right', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pL = ['alignment' => 'left', 'spaceAfter' => 120, 'spaceBefore' => 0, 'lineHeight' => 1.08];

        $section = $phpWord->addSection([
            'pageSizeW' => 11906,
            'pageSizeH' => 16838,
            'marginTop' => 1750,
            'marginBottom' => 1304,
            'marginLeft' => 1418,
            'marginRight' => 1418,
            'headerHeight' => 737,
            'footerHeight' => 709,
        ]);

        $footer = $section->addFooter();
        $footer->addPreserveText('hal {PAGE} dari {SECTIONPAGES}', ['size' => 11, 'name' => 'Arial'], [
            'alignment' => 'right',
            'spaceAfter' => 0,
            'spaceBefore' => 0,
        ]);

        $vendor = Vendor::where('nama_vendor', $sp->nama_vendor)->first();
        $ppbj = $sp->nomor_pr ? Ppbj::where('ppbj_no', $sp->nomor_pr)->first() : null;
        $rfqText = trim((string) ($sp->rfq ?? ''));
        $rfqText = $rfqText !== '' ? $rfqText : '.......';

        $noPemenang = !empty($sp->nomor_pemenang)
            ? $sp->nomor_pemenang
            : (!empty($ppbj?->pemenang) ? $ppbj->pemenang : '(.................)');

        $tglPemenangRaw = !empty($sp->tanggal_pemenang)
            ? $sp->tanggal_pemenang
            : ($ppbj?->tgl_pemenang ?? null);

        $tglPemenang = !empty($tglPemenangRaw)
            ? \Carbon\Carbon::parse($tglPemenangRaw)->locale('id')->translatedFormat('d F Y')
            : '(.................)';

        $tglAwalKontrak = !empty($sp->awal_kontrak)
            ? \Carbon\Carbon::parse($sp->awal_kontrak)->locale('id')->translatedFormat('d F Y')
            : '(....................)';

        $tglAkhirKontrak = !empty($sp->akhir_kontrak)
            ? \Carbon\Carbon::parse($sp->akhir_kontrak)->locale('id')->translatedFormat('d F Y')
            : '(....................)';

        $bidangIpItu = trim((string) ($sp->bidang_ip_itu ?? ''));
        $bidangIpItu = $bidangIpItu !== '' ? $bidangIpItu : 'Pj. Kepala Bidang Dukungan Bisnis';

        $penandatanganSci = trim((string) ($sp->penandatangan_sci ?? ''));
        $penandatanganSci = $penandatanganSci !== '' ? $penandatanganSci : 'Jumelda';

        $jabatanSci = trim((string) ($sp->jabatan_sci ?? ''));
        $jabatanSci = $jabatanSci !== '' ? $jabatanSci : 'Pj. Kepala Bidang Dukungan Bisnis';

        $vendorUp = strtoupper(trim((string) $sp->nama_vendor));
        $alamatV = ($vendor && trim((string) ($vendor->alamat ?? '')) !== '') ? trim((string) $vendor->alamat) : '(.....................................)';
        $npwpV = ($vendor && trim((string) ($vendor->npwp ?? '')) !== '') ? trim((string) $vendor->npwp) : '(.............................)';
        $direktur = ($vendor && trim((string) ($vendor->direktur ?? '')) !== '') ? trim((string) $vendor->direktur) : '(..............................)';
        $jabatanVendor = ($vendor && trim((string) ($vendor->jabatan ?? '')) !== '') ? trim((string) $vendor->jabatan) : '..............................';

        $tgl = $sp->tanggal_sp
            ? \Carbon\Carbon::parse($sp->tanggal_sp)->locale('id')->translatedFormat('d F Y')
            : now()->locale('id')->translatedFormat('d F Y');
        $tglPakta = now()->locale('id')->translatedFormat('d F Y');

        $tglSelesai = $sp->promised_date
            ? \Carbon\Carbon::parse($sp->promised_date)->locale('id')->translatedFormat('d F Y')
            : '(.........................)';

        $deskripsi = mb_strtoupper(trim((string) $sp->deskripsi_pengadaan), 'UTF-8');

        $tglPph = (!empty($ppbj?->tgl_spph))
            ? \Carbon\Carbon::parse($ppbj->tgl_spph)->locale('id')->translatedFormat('d F Y')
            : '(.................)';
        $noPph = !empty($ppbj?->spph_rfq_1) ? $ppbj->spph_rfq_1 : '(.................)';
        $noPemenang = !empty($ppbj?->pemenang)
            ? $ppbj->pemenang
            : '(.................)';

        $tglPemenang = !empty($ppbj?->tgl_pemenang)
            ? \Carbon\Carbon::parse($ppbj->tgl_pemenang)->locale('id')->translatedFormat('d F Y')
            : '(.................)';
        $tglPr = (!empty($ppbj?->tgl_ppbj))
            ? \Carbon\Carbon::parse($ppbj->tgl_ppbj)->locale('id')->translatedFormat('d F Y')
            : ((!empty($ppbj?->tgl_terima_pr)) ? \Carbon\Carbon::parse($ppbj->tgl_terima_pr)->locale('id')->translatedFormat('d F Y') : null);

        $items = $sp->items;
        $subtotal = 0.0;
        foreach ($items as $it) {
            $subtotal += $this->moneyToFloat($it->subtotal ?? 0);
        }
        if ($subtotal <= 0 && $sp->nilai_sp) {
            $subtotal = $this->moneyToFloat($sp->nilai_sp);
        }
        $ppn = round($subtotal * 0.11);
        $total = $subtotal + $ppn;
        $fmt = fn($n) => $this->formatMoney($n);
        $terbilangSubtotal = ucwords($this->terbilang($subtotal));
        $terbilangTotal = ucwords($this->terbilang($total));

        $cleanText = function (?string $text): string {
            $text = (string) $text;
            $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
            $text = str_replace(['<br>', '<br/>', '<br />'], "\n", $text);
            $text = trim(strip_tags($text));
            return preg_replace('/[ \t]+/', ' ', $text) ?: '-';
        };

        $addPara = function (string $text, array $pStyle = null, array $extraBold = []) use ($section, $fs, $fb, $pJ) {
            $this->kontrakParagraf($section, $text, $pStyle ?? $pJ, $fs, $fb, $extraBold);
        };

        $addNo = function (string $no, string $text, int $depth = 0, array $extraBold = []) use ($addPara, $pJ) {
            $left = $depth === 0 ? 480 : 840;
            $hanging = $depth === 0 ? 480 : 360;
            $style = array_merge($pJ, ['indentation' => ['left' => $left, 'hanging' => $hanging]]);
            $addPara($no . "\t" . $text, $style, $extraBold);
        };

        $pPasal = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 180, 'lineHeight' => 1.0];
        $pPasalLine = ['alignment' => 'center', 'spaceAfter' => 120, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $addPasal = function (string $no, array $judulLines) use ($section, $fb, $pPasal, $pPasalLine) {
            $section->addText('PASAL ' . $no, $fb, $pPasal);
            foreach ($judulLines as $idx => $line) {
                $section->addText($line, $fb, $idx === count($judulLines) - 1 ? $pPasalLine : ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0]);
            }
        };

        // ===================== HALAMAN 1: JUDUL DAN PEMBUKA =====================
        $titleStyle = ['bold' => true, 'size' => 11, 'name' => 'Arial'];
        $pTitleLine = [
            'alignment' => 'center',
            'spaceAfter' => 0,
            'spaceBefore' => 0,
            'borderBottomSize' => 12,
            'borderBottomColor' => '000000',
        ];

        $section->addText('KONTRAK PENGADAAN', $titleStyle, $pC);
        $section->addText($deskripsi, $titleStyle, $pC);
        $section->addText('UNTUK', $fb, $pC);
        $section->addText('PT SUPERINTENDING COMPANY OF INDONESIA CABANG PEKANBARU', $fb, $pC);
        $section->addText('ANTARA', $fb, $pC);
        $section->addText('PT SUPERINTENDING COMPANY OF INDONESIA', $fb, $pC);
        $section->addText('DAN', $fb, $pC);
        $section->addText($vendorUp, $fb, $pTitleLine);
        $section->addTextBreak(1, $p0);
        $section->addText('Nomor : ' . $sp->nomor_sp, $fs, $pC);
        $section->addText('Tanggal : ' . $tgl, $fs, $pC);
        $section->addTextBreak(1, $p0);

        $addNo(
            'I.',
            'PT SUPERINTENDING COMPANY OF INDONESIA disingkat PT SUCOFINDO, suatu perusahaan yang dibentuk dan didirikan berdasarkan Hukum Indonesia dengan Akta Notaris Johan Arifin Lumban Tobing Sutan Arifin di Jakarta tanggal 22 Oktober 1956 Nomor 42 sebagaimana telah diubah dengan Akta Pernyataan Keputusan Rapat PT SUCOFINDO (Persero) dari Notaris Indah Prastiti Extensia, SH. di Jakarta tanggal 8 Agustus 2008 Nomor 10 tentang Perubahan Anggaran Dasar PT SUCOFINDO (Persero) dan telah diubah terakhir dengan Akta Pernyataan Keputusan Para Pemegang Saham PT SUCOFINDO (Persero) dari Notaris Ruli Iskandar, SH di Jakarta tanggal 31 Desember 2021 Nomor 116 tentang Perubahan Anggaran Dasar PT Superintending Company of Indonesia yang telah disahkan Kementerian Hukum dan HAM No. AHU-0006596.AH.01.02 Tahun 2022 tanggal 26 Januari 2022, berkedudukan dan berkantor pusat di Jakarta, Graha Sucofindo, Jalan Raya Pasar Minggu Kavling 34 RT.04/RW.01, Kelurahan Pancoran, Kecamatan Pancoran, Jakarta Selatan, DKI Jakarta 12780, dalam kesepahaman ini diwakili oleh ' . $penandatanganSci . ' Jabatan ' . $jabatanSci . ' selanjutnya dalam Kontrak ini disebut sebagai PIHAK KESATU.',
            0,
            [$penandatanganSci, $jabatanSci]
        );
        $addNo('II.', $vendorUp . ' NPWP ' . $npwpV . ' yang beralamat di ' . $alamatV . ', dalam perbuatan hukum ini diwakili secara sah oleh ' . $direktur . ' jabatan ' . $jabatanVendor . ', selanjutnya dalam Kontrak ini disebut sebagai PIHAK KEDUA.', 0, [$vendorUp, $direktur, $jabatanVendor]);

        $addPara('Berdasarkan pertimbangan-pertimbangan sebagai berikut :');
        $addNo(
            '1.',
            'Bahwa PIHAK KESATU telah menyampaikan surat kepada PIHAK KEDUA RFQ ' . $rfqText . ' No. ' . $noPph . ' tanggal ' . $tglPph . ' perihal Surat Permintaan Penawaran Harga (SPPH) dan Negosiasi Harga;'
        );
        $addNo('2.', 'Bahwa PIHAK KEDUA telah menyampaikan surat kepada PIHAK KESATU No. ' . ($sp->sph ?: '(.................)') . ' tanggal ' . ($sp->tgl_sph ? \Carbon\Carbon::parse($sp->tgl_sph)->locale('id')->translatedFormat('d F Y') : '(.................)') . ' perihal Penawaran dan Negosiasi Harga;');
        $addNo(
            '3.',
            'Bahwa PIHAK KESATU telah menyampaikan surat kepada PIHAK KEDUA No. ' . $noPemenang . ' tanggal ' . $tglPemenang . ' perihal Pengumuman Penetapan Pemasok Pelaksana Pengadaan ' . $deskripsi . ' untuk PT SUCOFINDO (Persero) Cabang Pekanbaru;'
        );
        $deskripsiBold = mb_strtoupper(trim((string) $deskripsi), 'UTF-8');

        $paraRun = $section->addTextRun($pJ);
        $paraRun->addText(
            'Para Pihak setelah menimbang hal-hal tersebut diatas sepakat dan setuju untuk mengikatkan diri dalam suatu Kontrak Pengadaan “',
            $fs
        );
        $paraRun->addText($deskripsiBold, $fb);
        $paraRun->addText(
            '” dengan ketentuan dan syarat-syarat sebagai berikut :',
            $fs
        );
        $section->addTextBreak(1, $p0);

        // ===================== PASAL 1 =====================
        $addPasal('1', ['LINGKUP PEKERJAAN DAN HARGA']);
        $addNo('1.', 'PIHAK KESATU menyerahkan pekerjaan kepada PIHAK KEDUA, sebagaimana PIHAK KEDUA menerima penyerahan pekerjaan tersebut dari PIHAK KESATU dan berjanji untuk melaksanakan pekerjaan dengan spesifikasi dan harga sebagai berikut:');

        // ===================== TABEL PASAL 1 - WORD SAFE, TANPA XML PATCH =====================
        // Struktur dibuat 7 kolom seperti template:
        // No | Nama | Satuan | Qty | Harga Satuan | Rp | Nilai Total
        // Bagian Jumlah/PPN/Total dibuat nested table di kanan agar tidak geser di Microsoft Word.
        $fmtTable = fn($n) => $this->formatMoney($n);

        $tbl = $section->addTable([
            'borderSize' => 4,
            'borderColor' => '000001',
            'cellMargin' => 0,
            'alignment' => 'center',
            'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
            'width' => 10440,
            'unit' => 'dxa',
        ]);

        $h = ['bold' => true, 'size' => 11, 'name' => 'Arial'];
        $c = ['size' => 11, 'name' => 'Arial'];
        $ci = ['italic' => true, 'size' => 11, 'name' => 'Arial'];
        $cb = ['bold' => true, 'size' => 11, 'name' => 'Arial'];
        $cbi = ['bold' => true, 'italic' => true, 'size' => 11, 'name' => 'Arial'];

        $ph = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pl = ['alignment' => 'left', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pr = ['alignment' => 'right', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];

        $vC = ['valign' => 'center'];
        $vT = ['valign' => 'top'];
        $headCell = ['valign' => 'center', 'bgColor' => 'C0C0C0'];

        // Header
        $tbl->addRow(696, ['exactHeight' => false]);
        $tbl->addCell(550, $headCell)->addText('No', $h, $ph);
        $tbl->addCell(4191, $headCell)->addText('Nama Barang / Peralatan / Jasa', $h, $ph);
        $tbl->addCell(851, $headCell)->addText('Satuan', $h, $ph);
        $tbl->addCell(733, $headCell)->addText('Qty', $h, $ph);
        $tbl->addCell(1395, $headCell)->addText("Harga\nSatuan (Rp.)", $h, $ph);
        $tbl->addCell(2720, ['gridSpan' => 2, 'valign' => 'center', 'bgColor' => 'C0C0C0'])->addText('Total Harga (Rp.)', $h, $ph);

        // Detail barang
        if ($items->isEmpty()) {
            $tbl->addRow(901, ['exactHeight' => false]);
            $tbl->addCell(550, $vC)->addText('1', $c, $ph);
            $tbl->addCell(4191, $vC)->addText($cleanText($sp->deskripsi_pengadaan), $ci, $pl);
            $tbl->addCell(851, $vC)->addText('-', $c, $ph);
            $tbl->addCell(733, $vC)->addText('1', $c, $ph);
            $tbl->addCell(1395, $vC)->addText($fmtTable($subtotal), $c, $pr);
            $tbl->addCell(2720, ['gridSpan' => 2, 'valign' => 'center'])->addText($fmtTable($subtotal), $c, $pr);
        } else {
            $no = 1;
            foreach ($items as $it) {
                $tbl->addRow(560, ['exactHeight' => false]);
                $tbl->addCell(550, $vC)->addText((string) $no++, $c, $ph);
                $tbl->addCell(4191, $vC)->addText($cleanText($it->nama_barang ?? ''), $ci, $pl);
                $tbl->addCell(851, $vC)->addText($it->satuan ?: '-', $c, $ph);
                $tbl->addCell(733, $vC)->addText($it->jumlah ?: '-', $c, $ph);
                $tbl->addCell(1395, $vC)->addText($fmtTable($it->harga_satuan ?? 0), $c, $pr);
                $tbl->addCell(2720, ['gridSpan' => 2, 'valign' => 'center'])->addText($fmtTable($it->subtotal ?? 0), $c, $pr);
            }
        }

        // Catatan kiri + Summary kanan dalam satu baris supaya tidak pakai vMerge.
        $tglPrText = $tglPr ?: '(....................)';
        $catatanPr = $sp->nomor_pr
            ? 'Memenuhi PR Bidang Dukungan Bisnis PT Sucofindo Cabang Pekanbaru sesuai PR No. ' . $sp->nomor_pr . ' tanggal ' . $tglPrText
            : 'Memenuhi PR Bidang Dukungan Bisnis PT Sucofindo Cabang Pekanbaru sesuai PR No. (....................) tanggal (....................)';

        $tbl->addRow();
        $catCell = $tbl->addCell(6325, [
            'gridSpan' => 4,
            'valign' => 'top',
            'cellMarginTop' => 0,
            'cellMarginBottom' => 0,
            'cellMarginLeft' => 0,
            'cellMarginRight' => 0,
        ]);
        $catRun = $catCell->addTextRun($pl);
        $catRun->addText('Catatan : ', $c);
        $catCell->addText($catatanPr, $c, $pl);

        // Cell kanan menampung nested table: Jumlah | Rp | Nilai
        $sumOuter = $tbl->addCell(4115, [
            'gridSpan' => 3,
            'valign' => 'top',
            'cellMarginTop' => 0,
            'cellMarginBottom' => 0,
            'cellMarginLeft' => 0,
            'cellMarginRight' => 0,
        ]);
        $sum = $sumOuter->addTable([
            'borderSize' => 4,
            'borderColor' => '000001',
            'cellMargin' => 0,
            'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
            'width' => 4115,
            'unit' => 'dxa',
        ]);

        // Baris Jumlah
        $sum->addRow(260, ['exactHeight' => false]);
        $sum->addCell(1395, $vC)->addText('Jumlah', $c, $pl);
        $sum->addCell(567, $vC)->addText('Rp', $c, $ph);
        $sum->addCell(2153, $vC)->addText($fmtTable($subtotal), $c, $pr);

        // Baris PPN
        $sum->addRow(260, ['exactHeight' => false]);
        $sum->addCell(1395, $vC)->addText('PPN (11%)', $c, $pl);
        $sum->addCell(567, $vC)->addText('Rp', $c, $ph);
        $sum->addCell(2153, $vC)->addText($fmtTable($ppn), $c, $pr);

        // Baris Total dibuat lebih tinggi agar menutup ruang kosong bawah
        $sum->addRow(560, ['exactHeight' => true]);
        $sum->addCell(1395, $vC)->addText('Total', $c, $pl);
        $sum->addCell(567, $vC)->addText('Rp', $c, $ph);
        $sum->addCell(2153, $vC)->addText($fmtTable($total), $c, $pr);

        // Terbilang full width
        $tbl->addRow(662, ['exactHeight' => false]);
        $terCell = $tbl->addCell(10440, ['gridSpan' => 7, 'valign' => 'center']);
        $terRun = $terCell->addTextRun($pl);
        $terRun->addText('Terbilang', $c);
        $terRun->addText('    :  ', $c);
        $terRun->addText('(' . $terbilangTotal . ' Rupiah)', $cbi);
        // Jarak bawah tabel dibuat lebih lega seperti template sebelum masuk PASAL 2.
        $section->addTextBreak(1, $p0);

        // ===================== PASAL 2 =====================
        $addPasal('2', ['JANGKA WAKTU PELAKSANAAN PEKERJAAN', 'DAN TEMPAT PENYERAHAN BARANG']);
        $addNo(
            '(1)',
            'PIHAK KEDUA sanggup dan berjanji untuk menyelesaikan pekerjaan sebagaimana dimaksud dalam Pasal 1 Kontrak ini serta menyerahkan kepada PIHAK KESATU untuk pemenuhan pengadaan terhitung sejak tanggal ' . $tglAwalKontrak . ' sampai dengan ' . $tglAkhirKontrak . '.'
        );
        $addNo('(2)', 'Untuk keperluan penyerahan barang sebagaimana dimaksud dalam ayat (1) berlokasi di PT SUCOFINDO Cabang Pekanbaru, Jl. A. Yani No. 79, Pekanbaru, Riau.');

        // ===================== PASAL 3 =====================
        $addPasal('3', ['PELAKSANAAN PEMBAYARAN']);

        $nominalPembayaran = 'Rp.' . $fmt($subtotal);

        $pasal3 = [
            'PIHAK KESATU sebagai Perusahaan yang tergabung dalam Holding Jasa Survey memungut langsung (WAPU) sebesar PPN 11% (Sebelas Persen) kepada PIHAK KEDUA sesuai Peraturan Undang Undang No. 7 Tahun 2021 Tentang Harmonisasi Perpajakan.',
            'PIHAK KESATU sebagai Perusahaan yang tergabung dalam Holding Jasa Survey memungut langsung (WAPU) PPh Pasal 22 kepada PIHAK KEDUA jika ada terkait dengan pembelian Barang dan/ atau bahan-bahan sebesar 1,5 % (satu koma lima persen) dari harga pembelian. Apabila PIHAK KEDUA tidak memiliki NPWP maka tarif lebih tinggi 100% (sebesar 3% dari harga pembelian) sesuai Peraturan Menteri Keuangan RI No. 107/2015 Pasal 2 ayat (1) huruf b.',
            'PIHAK KEDUA merupakan perusahaan kena pajak apabila faktur pajak yang dikeluarkan oleh PIHAK KEDUA tidak diakui atau tidak benar menurut kantor pajak sehingga menyebabkan kerugian PIHAK KESATU maka akan dilakukan pemotongan beban PPN 11% (sebelas persen) dari total nilai kontrak untuk mengganti kerugian tersebut.',
            'Pembayaran ini akan dilakukan pemotongan atau pemungutan sesuai dengan peraturan pajak – pajak yang berlaku.',
            'Apabila ada perbedaan tanggal faktur pajak dengan tanggal penyampaian faktur pajak yang menyebabkan Badan Usaha Milik Negara (BUMN) dikenakan sanksi administrasi perpajakan maka sanksi tersebut akan ditanggung oleh PIHAK KEDUA.',
            'Pembayaran sebesar ' . $nominalPembayaran . ',- (' . $terbilangSubtotal . ' Rupiah) belum termasuk PPN 11% (sebelas persen) adalah nilai maksimal yang bisa dilakukan penagihan dan akan dilakukan melalui transfer ke Rekening Bank PIHAK KEDUA.',
            'Biaya transfer menjadi beban PIHAK KEDUA.',
            'Pembayaran atas harga sebagaimana dimaksud pada ayat (6) pasal ini akan diatur dan dilaksanakan kepada PIHAK KEDUA setelah ditandatangani Kontrak ini oleh Para Pihak dan PIHAK KEDUA telah menyerahkan syarat-syarat sebagai berikut :',
        ];

        foreach ($pasal3 as $i => $text) {
            $extraBold = [];

            if ($i === 3) {
                $extraBold[] = $text;
            }

            if ($i === 5) {
                $extraBold[] = $nominalPembayaran;
            }

            $addNo('(' . ($i + 1) . ')', $text, 0, $extraBold);
        }
        foreach ([
            'a.' => 'Surat Keterangan terdaftar dari KPP setempat;',
            'b.' => 'Copy Speciment tanda tangan Faktur Pajak yang dilaporkan ke KPP setempat;',
            'c.' => 'Copy Surat Pengukuhan sebagai Pengusaha Kena Pajak (PKP);',
            'd.' => 'Kuitansi rangkap 2 (dua), 1 (satu) Lembar Kesatu bermeterai cukup;',
            'e.' => 'Surat Pemberitahuan Nomor Serie E-Faktur Pajak dari KPP setempat;',
            'f.' => 'Lampiran Pembayaran SPT PPN di bulan sebelumnya;',
            'g.' => 'Faktur Penjualan atau Invoice rangkap 2 (dua);',
            'h.' => '1 (satu) Asli Lembar Kesatu dan 2 (dua) copy/salinan E-Faktur Pajak yang sudah ada barcode;',
            'i.' => 'Copy Kontrak yang telah ditandatangani oleh Para Pihak dan dibubuhi meterai cukup untuk setiap kali mengajukan tagihan sesuai dengan realisasi pemakaian setiap bulannya, sedangkan untuk tagihan terakhir menggunakan Kontrak Asli;',
            'j.' => 'Asli Surat Jalan atau Berita Acara Serah Terima Barang atau Delivery Order yang telah ditandatangani oleh PIHAK KESATU dan PIHAK KEDUA;',
            'k.' => 'Surat Perintah Pembayaran (SPP) yang diterbitkan oleh PIHAK KESATU dari aplikasi ERP (c/q. Fungsi Keuangan);',
            'l.' => 'Receipt atau Bukti Penerimaan Gudang (BPG) yang diterbitkan PIHAK KESATU (c/q Fungsi Umum) dari aplikasi ERP;',
            'm.' => 'Nomor Rekening Bank PIHAK KEDUA.',
        ] as $no => $text) {
            $addNo($no, $text, 1);
        }
        foreach ([
            9 => 'Pembayaran dilakukan secara bertahap setiap bulannya berdasarkan realisasi pemakaian yang ditandatangani KEDUA PIHAK melalui transfer ke Rekening Bank Perusahaan Saudara serta dipenuhinya persyaratan tagihan sebagaimana dimaksud pada ayat (8).',
            10 => 'Pajak-pajak lain, bea-bea, termasuk bea meterai yang menjadi kewajiban PIHAK KEDUA dan jika ada pungutan-pungutan lain yang timbul karena pembuatan dan/atau pelaksanaan perjanjian ini menjadi tanggung jawab PIHAK KEDUA untuk melunasinya.',
            11 => 'Pajak Pertambahan Nilai (PPN) dan Pajak Penghasilan (PPh) yang timbul atas transaksi mengikuti ketentuan Perundang-undangan Perpajakan yang berlaku di Negara Republik Indonesia.',
            12 => 'PIHAK KEDUA wajib memberikan bukti penyetoran (jika ada) dan Bukti Pelaporan Surat Pemberitahuan (SPT) beserta lampiran A2 masa PPN sesuai transaksi yang ditagihkan kepada PIHAK KESATU selambat-lambatnya 60 (enam puluh) hari kalender sejak tanggal terbitnya faktur pajak.',
            13 => 'PIHAK KESATU (c/q. Divisi Keuangan & Akuntansi (KAK)) menerima dokumen tagihan dari PIHAK KEDUA setiap hari Senin dan Rabu dengan batas akhir pada tanggal 20 (dua puluh) setiap bulannya, apabila pada tanggal 20 (dua puluh) bukan jatuh pada hari Senin dan Rabu, maka tagihan tersebut dimasukan ke awal bulan berikutnya.',
            14 => 'PIHAK KESATU akan melakukan pembayaran sebagaimana dimaksud pada ayat (6) melalui transfer ke Rekening Bank PIHAK KEDUA selambat-lambatnya 45 (empat puluh lima) hari kalender sejak dokumen tagihan lengkap diterima oleh PIHAK KESATU.',
        ] as $no => $text) {
            $addNo('(' . $no . ')', $text);
        }

        // ===================== PASAL 4 - 11 =====================
        $pasalStatis = [
            [
                '4',
                ['JAMINAN MUTU ATAS BARANG'],
                [
                    'PIHAK KEDUA menjamin barang yang diserahkan kepada PIHAK KESATU adalah 100% (seratus persen) baru dan siap pakai serta sesuai dengan ketentuan-ketentuan dan syarat-syarat yang ditetapkan dalam Kontrak ini. Oleh karena itu, PIHAK KEDUA bertanggung jawab atas segala kerugian dan atau kerusakan yang disebabkan adanya cacat tersembunyi (defect) ataupun kekurang sempurnaan dalam proses pembuatannya atau kerusakan property milik PIHAK KESATU dalam penempatan barang/peralatan yang dijual.',
                    'PIHAK KEDUA menjamin bahwa penyediaan barang memenuhi persyaratan dan ketentuan-ketentuan yang telah disepakati oleh PIHAK KESATU dan PIHAK KEDUA.',
                    'PIHAK KEDUA menjamin bahwa barang yang dipasok diperoleh dengan cara legal serta tidak melanggar hukum dan ketentuan/peraturan perundang-undangan yang berlaku.',
                    'PIHAK KEDUA melaksanakan tugas secara tertib, disertai rasa tanggung jawab untuk mencapai sasaran, kelancaran dan ketetapan tujuan Pengadaan Barang.',
                    'Para Pihak bekerja secara profesional, mandiri, dan menjaga kerahasiaan informasi yang menurut sifatnya harus dirahasiakan untuk mencegah penyimpangan Pengadaan Barang.',
                    'Para Pihak tidak saling mempengaruhi baik langsung maupun tidak langsung yang berakibat persaingan usaha tidak sehat.',
                    'PIHAK KEDUA menerima dan bertanggung jawab atas segala keputusan yang ditetapkan oleh PIHAK KESATU sesuai dengan kesepakatan tertulis yang di buat oleh Para Pihak.',
                    'Para Pihak menghindari dan mencegah terjadinya pertentangan kepentingan baik secara langsung maupun tidak langsung, yang berakibat persaingan usaha tidak sehat dalam Pengadaan Barang.',
                    'Para Pihak menghindari dan mencegah pemborosan dan kebocoran keuangan negara/perusahaan.',
                    'Para Pihak menghindari dan mencegah penyalahgunaan wewenang dan/atau kolusi.',
                    'Para Pihak tidak menerima, tidak menawarkan, atau tidak menjanjikan untuk memberi atau menerima hadiah, imbalan, komisi, rabat, dan apa saja dari atau kepada siapapun yang diketahui atau patut diduga berkaitan dengan Pengadaan Barang dan Jasa.',
                    'PIHAK KEDUA menjamin bahwa barang yang dikirim kepada PIHAK KESATU sudah memenuhi Keselamatan dan Kesehatan Kerja (SMK3) sesuai dengan Peraturan Pemerintah No. 50 tahun 2012 tentang Penerapan Sistem Manajemen Keselamatan dan Kesehatan Kerja.',
                    'Dalam kondisi khusus apabila barang dimaksud berhubungan dengan bahan kimia atau bahan berbahaya, maka PIHAK KEDUA menjamin bahwa barang yang dikirim kepada PIHAK KESATU sudah memenuhi Material Safety Data Sheets (MSDS).',
                ]
            ],
            [
                '5',
                ['KERAHASIAAN'],
                [
                    'PIHAK KEDUA untuk waktu yang tidak terbatas harus memberlakukan sebagai rahasia dan harus menjamin agar pegawai-pegawainya, pekerja-pekerjanya, maupun orang-orang yang bekerja untuknya akan memberlakukan sebagai rahasia setiap keterangan yang diterima atau diperolehnya dengan cara apapun juga dari PIHAK KESATU dan pihak lainnya yang terkait.',
                ]
            ],
            [
                '6',
                ['DENDA'],
                [
                    'Jika jangka waktu pelaksanaan pekerjaan sebagaimana dimaksud dalam Pasal 2 ayat (1) Kontrak ini dilampaui, maka kepada PIHAK KEDUA akan dikenakan denda sebesar 1‰ (satu permil) per hari kalender keterlambatan dari total nilai kontrak dan/atau dari sisa nilai kontrak pekerjaan dengan maksimal denda sebesar 5% (lima persen) sebelum Pajak sebagaimana dimaksud dalam Pasal 1 Kontrak ini.',
                    'Dalam hal PIHAK KEDUA dikenakan denda sesuai dengan ayat (1) maka PIHAK KESATU berhak untuk langsung memotong jumlah pembayaran tagihan PIHAK KEDUA sesuai dengan jumlah perhitungan denda yang dikenakan kepada PIHAK KEDUA.',
                ]
            ],
            [
                '7',
                ['FORCE MAJEURE'],
                [
                    'Yang dimaksud dengan Force Majeure adalah sebagai berikut :',
                    'Dalam hal terjadi Force Majeure sebagaimana dimaksud pada ayat (1), maka Pihak yang mengalami Force Majeure wajib memberitahukan secara tertulis kepada Pihak lainnya dalam waktu 7 (tujuh) hari kalender sejak saat terjadinya Force Majeure, begitu juga saat berakhirnya dan dijelaskan secara resmi oleh Pejabat yang berwenang melalui media massa.',
                    'Kelalaian atau kelambatan dalam memenuhi kewajiban memberitahukan sebagaimana dimaksud dalam ayat (2) mengakibatkan tidak diakuinya oleh Pihak lain peristiwa sebagaimaan dimaksud pada ayat (1) sebagai Force Majeure.',
                    'Kejadian-kejadian sebagaimana dimaksud pada ayat (1) atas permintaan tertulis dari Pihak yang mengalami Force Majeure, dapat diperhitungkan sebagai perpanjangan jangka waktu pelaksanaan, kewajiban pihak–pihak menurut Kontrak ini, apabila ketentuan sebagaimana dimaksud pada ayat (2) tersebut dipenuhi.',
                    'Semua kerugian dan biaya yang diderita oleh salah satu Pihak sebagai akibat terjadinya Force Majeure bukan merupakan tanggung jawab Pihak lainnya.',
                ]
            ],
            [
                '8',
                ['PEMUTUSAN KONTRAK / PERJANJIAN'],
                [
                    'PIHAK KESATU berhak secara sepihak, tanpa adanya suatu tuntutan apapun dari PIHAK KEDUA untuk memutuskan dan / atau mengakhiri sebagian atau seluruh pekerjaan menurut Kontrak ini, apabila salah satu di antara sebab-sebab pemutusan tersebut dibawah ini terjadi :',
                    'Untuk hal ikhwal pemutusan Kontrak ini sebagaimana dimaksud pada ayat (1) pasal ini, Para Pihak dengan ini menyatakan sepakat mengesampingkan berlakunya ketentuan sebagaimana dimaksud dalam Pasal 1266 dan Pasal 1267 Kitab Undang-Undang Hukum Perdata terhadap Kontrak ini dapat dilakukan secara sah cukup dengan surat pemberitahuan secara tertulis dari PIHAK KESATU kepada PIHAK KEDUA, tanpa perlu menunggu adanya keputusan dari Pengadilan serta dengan ini PIHAK KEDUA dapat menyatakan hak-hak yang timbul dari padanya apabila ada untuk dimintakan penggantian kepada PIHAK KESATU dan disepakati oleh Para Pihak.',
                    'Dalam hal terjadinya pemutusan dari Kontrak ini, ketentuan-ketentuan dalam Kontrak ini berlaku terus sampai diselesaikannya kelebihan atau kekurangan pembayaran sebagaimana dimaksud dalam Pasal 3, yang telah dilakukan oleh PIHAK KESATU kepada PIHAK KEDUA.',
                    'PIHAK KEDUA dengan ini menyatakan membebaskan PIHAK KESATU dari segala tuntutan hukum termasuk dari Pihak Ketiga karena pemutusan Kontrak ini, apabila terbukti merupakan kesalahan PIHAK KEDUA maka sepenuhnya menjadi tanggungjawab PIHAK KEDUA.',
                    'PIHAK KESATU akan menunda dan/atau membatalkan transaksi kepada PIHAK KEDUA apabila dalam proses pengadaan ini terindikasi adanya penyimpangan, penyuapan dan / atau kecurangan sebagaimana dimaksud pada Peraturan Menteri Negara Badan Usaha Milik Negara Nomor : Per-19/MBU/2012 tanggal 27 Desember 2012 perihal Pedoman Penundaan Transaksi Bisnis Yang Terindikasi Penyimpangan Dan/Atau Kecurangan dan Nomor : PER-08/MBU/12/2019 tanggal 12 Desember 2019 perihal Pedoman Umum Pelaksanaan Pengaaan Barang dan Jasa Badan Usaha Milik Negara.',
                ]
            ],
            [
                '9',
                ['PENYELESAIAN PERSELISIHAN'],
                [
                    'Apabila dikemudian hari terjadi perselisihan dalam penafsiran atau pelaksanaan ketentuan Kontrak ini, PIHAK KESATU dan PIHAK KEDUA sepakat untuk terlebih dahulu menyelesaikan secara musyawarah.',
                    'Bilamana musyawarah sebagaimana dimaksud pada ayat (1) tidak menghasilkan kata sepakat untuk menyelesaikan perselisihan, maka PIHAK KESATU dan PIHAK KEDUA sepakat untuk menyerahkan semua sengketa yang timbul dari Kontrak ini diserahkan kepada Pengadilan Negeri (PN) sesuai domisili.',
                ]
            ],
            [
                '10',
                ['PEJABAT YANG DITUNJUK UNTUK TANDATANGAN'],
                [
                    'Untuk kelancaran pelaksanaan Kontrak ini, PIHAK KESATU dan PIHAK KEDUA sepakat bahwa Pejabat yang ditunjuk mewakili dalam pembuatan Berita Acara Serah Terima Barang/Pekerjaan dan sebagainya yang berkaitan erat dengan Kontrak ini adalah :',
                    'Penggantian Pejabat yang ditunjuk oleh PIHAK KESATU dan PIHAK KEDUA sebagaimana dimaksud pada ayat (1) hanya dapat dilaksanakan atas kesepakatan PIHAK KESATU dan PIHAK KEDUA dan dituangkan secara tertulis.',
                ]
            ],
            [
                '11',
                ['LAIN-LAIN'],
                [
                    'PIHAK KEDUA wajib mengijinkan PIHAK KESATU, atau perwakilan mereka yang ditunjuk untuk mengakses, memeriksa dan membuat salinan - salinan dari buku-buku, catatan-catatan dan rekening-rekening dan rekening-rekening yang dimiliki ditempat PIHAK KEDUA dalam rangka audit kepatuhan PIHAK KEDUA terhadap hukum Anti- Korupsi dan/atau Kewajiban Anti Korupsi, Sebagai tambahan, PIHAK KEDUA harus bekerjasama dan menyediakan semua bantuan yang wajar, termasuk membuat pembukuan-pembukuan, catatan-catatan, rekening-rekening dan personil yang ada, untuk memungkinkan PIHAK KESATU melakukan investigasi setiap potensi ataupun pelanggaran nyata, atau melaksanakan aktivitas yang dipersyaratkan oleh pemerintah atau institusi yang relevan sehubungan dengan memastikan atau memverifikasi kepatuhan PIHAK KESATU terhadap Hukum Anti-Korupsi dan/atau Kewajiban Anti- Korupsi.',
                    'PIHAK KESATU akan memeriksa terlebih dahulu sebelum barang diserahkan dan apabila tidak memenuhi syarat sesuai Pasal 1 Kontrak ini, PIHAK KESATU akan mengembalikan kepada PIHAK KEDUA dengan beban dan biaya menjadi tanggung jawab PIHAK KEDUA.',
                    'Apabila PIHAK KEDUA mengirim barang kepada PIHAK KESATU, PIHAK KEDUA wajib menyampaikan Copy Kontrak Ringkas kepada petugas penerima jasa PIHAK KESATU.',
                    'PIHAK KESATU dibebaskan dari semua bentuk beban serta tuntutan apapun dari Pihak Ketiga yang berkaitan dengan Kontrak ini.',
                    'Setiap perubahan mengenai isi, baik persyaratan, lingkup pekerjaan maupun harga-harganya harus disetujui oleh PIHAK KESATU dan PIHAK KEDUA dengan membuat Amandemen terhadap Kontrak ini.',
                    'Kontrak ini dibuat rangkap 2 (dua) asli masing-masing sama bunyinya, mempunyai kekuatan hukum yang sama setelah ditandatangani oleh PIHAK KESATU dan ditandatangani oleh PIHAK KEDUA serta dibubuhi Cap Perusahaan dan diberi materai cukup.',
                    'Asli Kontrak agar diserahkan kepada PIHAK KESATU paling lambat 2 (dua) hari kerja, sejak diterimanya asli/copy Kontrak ini sebagai pemberitahuan, baik yang disampaikan melalui faksimili/e-mail maupun kurir.',
                ]
            ],
        ];

        foreach ($pasalStatis as [$noPasal, $judul, $ayatList]) {
            $addPasal($noPasal, $judul);
            if ($noPasal === '5') {
                foreach ($ayatList as $text) {
                    $addPara($text, $pJ, ['PIHAK KEDUA', 'PIHAK KESATU']);
                }

                continue;
            }
            foreach ($ayatList as $idx => $text) {
                $addNo('(' . ($idx + 1) . ')', $text);
                if ($noPasal === '7' && $idx === 0) {
                    $addNo('a.', 'Gempa bumi besar, angin topan, banjir besar, kebakaran besar, tanah longsor dan wabah penyakit.', 1);
                    $addNo('b.', 'Pemberontakan, pemogokan umum, huru-hara, sabotase, perang dan kebijakan Pemerintah yang berakibat langsung terhadap Kontrak ini.', 1);
                }
                if ($noPasal === '8' && $idx === 0) {
                    $addNo('a.', 'Apabila dalam waktu 7 (tujuh) hari kalender terhitung sejak ditandatanganinya Kontrak ini, PIHAK KEDUA ternyata tidak atau belum memulai pelaksanaan pekerjaan menurut Kontrak ini.', 1);
                    $addNo('b.', 'Pelaksanaan Kontrak ini tertunda karena terjadinya kejadian-kejadian Force Majeure sebagaimana dimaksud dalam Pasal 7 ayat (1) yang berlangsung lebih dari 1 (satu) bulan.', 1);
                    $addNo('c.', 'Pelaksanaan Kontrak ini tertunda oleh PIHAK KEDUA lebih dari 14 (empat belas) hari, dimana tertundanya pekerjaan tersebut tidak disebabkan oleh kejadian-kejadian sebagaimana dimaksud dalam Pasal 7 ayat (1), tidak juga oleh karena kesalahan PIHAK KESATU apapun, akan tetapi disebabkan oleh hal-hal untuk mana PIHAK KEDUA tidak memungkinkan melanjutkan pekerjaannya, namun tidak hanya terbatas pada surat izin usaha dicabut atau dinyatakan tidak berlaku lagi atau PIHAK KEDUA dinyatakan pailit oleh Pengadilan Niaga.', 1);
                    $addNo('d.', 'Apabila PIHAK KEDUA terbukti tidak dapat melaksanakan Kontrak ini sebagaimana dimaksud dalam Pasal 1 dan Pasal 2.', 1);
                    $addNo('e.', 'Apabila PIHAK KEDUA ternyata menyerahkan pelaksanaan pekerjaan baik sebagian atau seluruhnya kepada Pihak Ketiga tanpa persetujuan secara tertulis dari PIHAK KESATU.', 1);
                }
                if ($noPasal === '10' && $idx === 0) {
                    $pPejabat = [
                        'spaceAfter' => 0,
                        'spaceBefore' => 0,
                        'lineHeight' => 1.0,
                    ];

                    $noBorderPejabat = [
                        'borderTopSize' => 0,
                        'borderTopColor' => 'FFFFFF',
                        'borderBottomSize' => 0,
                        'borderBottomColor' => 'FFFFFF',
                        'borderLeftSize' => 0,
                        'borderLeftColor' => 'FFFFFF',
                        'borderRightSize' => 0,
                        'borderRightColor' => 'FFFFFF',
                        'valign' => 'top',
                    ];

                    $tblPejabat = $section->addTable([
                        'borderSize' => 0,
                        'borderColor' => 'FFFFFF',
                        'cellMargin' => 0,
                        'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
                        'width' => 9000,
                        'unit' => 'dxa',
                    ]);

                    // spacer kiri agar sejajar dengan teks ayat (2) di bawah
                    // total tetap 9000
                    // 350 + 480 + 2200 + 250 + 5720 = 9000

                    // Baris a
                    $tblPejabat->addRow();
                    $tblPejabat->addCell(480, $noBorderPejabat)->addText('', $fs, $pPejabat);
                    $tblPejabat->addCell(240, $noBorderPejabat)->addText('a.', $fs, $pPejabat);
                    $tblPejabat->addCell(1800, $noBorderPejabat)->addText('PIHAK KESATU', $fb, $pPejabat);
                    $tblPejabat->addCell(250, $noBorderPejabat)->addText(':', $fs, $pPejabat);
                    $tblPejabat->addCell(6230, $noBorderPejabat)->addText($bidangIpItu . ' / pegawai yang ditunjuk.', $fs, $pPejabat);

                    // Baris b
                    $tblPejabat->addRow();
                    $tblPejabat->addCell(480, $noBorderPejabat)->addText('', $fs, $pPejabat);
                    $tblPejabat->addCell(240, $noBorderPejabat)->addText('b.', $fs, $pPejabat);
                    $tblPejabat->addCell(1800, $noBorderPejabat)->addText('PIHAK KEDUA', $fb, $pPejabat);
                    $tblPejabat->addCell(250, $noBorderPejabat)->addText(':', $fs, $pPejabat);
                    $tblPejabat->addCell(6230, $noBorderPejabat)->addText($jabatanVendor, $fs, $pPejabat);

                    // enter 1 baris sebelum ayat (2)
                    $section->addTextBreak(1, $p0);
                }
            }
        }

        $addPara('Demikian Kontrak ini dibuat dengan itikad baik untuk dipatuhi serta dilaksanakan oleh PIHAK KESATU dan PIHAK KEDUA.');
        $section->addTextBreak(1, $p0);

        // ===================== TANDA TANGAN KONTRAK TANPA BORDER =====================
        $section->addTextBreak(1, $p0);

        $sigTbl = $section->addTable([
            'borderSize' => 0,
            'borderColor' => 'FFFFFF',
            'cellMargin' => 0,
            'alignment' => 'center',
            'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
            'width' => 9000,
            'unit' => 'dxa',
        ]);

        $noBorderCell = [
            'borderTopSize' => 0,
            'borderTopColor' => 'FFFFFF',
            'borderBottomSize' => 0,
            'borderBottomColor' => 'FFFFFF',
            'borderLeftSize' => 0,
            'borderLeftColor' => 'FFFFFF',
            'borderRightSize' => 0,
            'borderRightColor' => 'FFFFFF',
            'valign' => 'center',
        ];

        $sigHead = ['bold' => true, 'size' => 11, 'name' => 'Arial'];
        $sigName = ['bold' => true, 'underline' => 'single', 'size' => 11, 'name' => 'Arial'];
        $sigJabatan = ['bold' => true, 'size' => 11, 'name' => 'Arial'];
        $sigPC = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];

        // Row 1: PIHAK KESATU / PIHAK KEDUA
        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText('PIHAK KESATU', $sigHead, $sigPC);
        $sigTbl->addCell(4500, $noBorderCell)->addText('PIHAK KEDUA', $sigHead, $sigPC);

        // Row 2: Nama perusahaan
        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText('PT SUCOFINDO CABANG PEKANBARU', $sigHead, $sigPC);
        $sigTbl->addCell(4500, $noBorderCell)->addText($vendorUp, $sigHead, $sigPC);

        // Row 3: Ruang tanda tangan
        $sigTbl->addRow(1700, ['exactHeight' => false]);
        $sigTbl->addCell(4500, $noBorderCell)->addText('', $fs, $p0);
        $sigTbl->addCell(4500, $noBorderCell)->addText('', $fs, $p0);

        // Row 4: Nama
        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText($penandatanganSci, $sigName, $sigPC);
        $sigTbl->addCell(4500, $noBorderCell)->addText($direktur, $sigName, $sigPC);

        // Row 5: Jabatan
        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText($jabatanSci, $sigJabatan, $sigPC);
        $sigTbl->addCell(4500, $noBorderCell)->addText($jabatanVendor, $sigJabatan, $sigPC);

        // ===================== NB FONT SIZE 8 =====================
        $section->addTextBreak(1, $p0);

        $fNb = ['italic' => true, 'size' => 8, 'name' => 'Arial'];
        $pNb = [
            'alignment' => 'center',
            'spaceAfter' => 0,
            'spaceBefore' => 0,
            'lineHeight' => 1.0,
        ];

        $section->addText(
            'NB : Dalam menjaga Integritas dan Kredibilitas Insan PT SUCOFINDO, kami sangat menghargai apabila Perusahaan / Organisasi saudara tidak memberikan bingkisan / tanda terima kasih kepada Insan PT SUCOFINDO.',
            $fNb,
            $pNb
        );

        // ===================== PAKTA INTEGRITAS =====================
        // Pakta dibuat sebagai section baru agar tidak ikut header "Lanjutan Kontrak" dan nomor halaman kontrak.
        $paktaSection = $phpWord->addSection([
            'pageSizeW' => 11906,
            'pageSizeH' => 16838,
            'marginTop' => 1750,
            'marginBottom' => 1304,
            'marginLeft' => 1418,
            'marginRight' => 1418,
            'headerHeight' => 737,
            'footerHeight' => 709,
        ]);

        $addParaPakta = function (string $text, array $pStyle = null, array $extraBold = []) use ($paktaSection, $fs, $fb, $pJ) {
            $this->kontrakParagraf($paktaSection, $text, $pStyle ?? $pJ, $fs, $fb, $extraBold);
        };

        $addNoPakta = function (string $no, string $text, int $depth = 0, array $extraBold = []) use ($addParaPakta, $pJ) {
            $left = $depth === 0 ? 360 : 720;
            $style = array_merge($pJ, ['indentation' => ['left' => $left, 'hanging' => 360]]);
            $addParaPakta($no . "\t" . $text, $style, $extraBold);
        };

        $paktaTitle = ['bold' => true, 'size' => 14, 'name' => 'Arial'];

        $paktaSection->addText('PAKTA INTEGRITAS', $paktaTitle, $pC);
        $paktaSection->addTextBreak(1, $p0);
        $addParaPakta('Kami yang bertanda tangan dibawah ini, sehubungan dengan pelaksanaan Pengadaan ' . $deskripsi . ' untuk PT SUCOFINDO, dengan ini menyatakan bahwa :');

        foreach ([
            'Kami berjanji tidak akan melakukan praktek Korupsi, Kolusi & Nepotisme (KKN);',
            'Kami tidak menerima, tidak menawarkan, atau tidak menjanjikan untuk memberi atau menerima hadiah, imbalan, komisi, rabat, dan apa saja dari atau kepada siapapun yang diketahui atau patut diduga berkaitan dengan pengadaan ini.',
            'Kami tidak memiliki kepentingan pribadi atau tujuan melakukan sesuatu untuk manfaat diri sendiri, maupun menguntungkan pihak-pihak terkait dengan diri kami, atau pihak yang berafiliasi dengan kami dan dengan demikian tidak memiliki posisi yang mengundang potensi benturan kepentingan (Conflict of interest), termasuk dengan seluruh pihak yang terlibat dengan tindakan dimaksud.',
            'Kami akan melaporkan kepada pihak yang berwajib/berwenang apabila mengetahui ada indikasi KKN dan Penyuapan di dalam proses pengadaan ini.',
            'Kami memahami dan mentaati serta tunduk terhadap ketentuan-ketentuan/persyaratan pengadaan ini.',
            'Kami berjanji akan melaksanakan pengadaan tersebut di atas secara bersih, transparan dan profesional dengan mengerahkan segala kemampuan dan sumber daya secara optimal untuk memberikan hasil kerja terbaik.',
            'Kami akan menunda dan/atau membatalkan transaksi apabila dalam proses pengadaan ini terindikasi adanya Kecurangan atau Penyuapan atau Penyimpangan.',
        ] as $i => $text) {
            $addNoPakta(($i + 1) . '.', $text);
        }

        $addParaPakta('Apabila kami melanggar hal-hal yang telah kami nyatakan dalam Pakta Integritas ini, kami bersedia dikenakan sanksi moral, sanksi administrasi serta dituntut ganti rugi dan pidana sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.');
        $paktaSection->addTextBreak(1, $p0);

        // ===================== TANDA TANGAN PAKTA INTEGRITAS =====================
        $pPaktaSig = [
            'alignment' => 'left',
            'spaceAfter' => 0,
            'spaceBefore' => 0,
            'lineHeight' => 1.0,
        ];

        // Style tanda tangan Pakta dibuat sama dengan tanda tangan kontrak/Pasal 11
        $paktaName = [
            'bold' => true,
            'underline' => 'single',
            'size' => 11,
            'name' => 'Arial',
        ];

        $paktaJabatan = [
            'bold' => true,
            'size' => 11,
            'name' => 'Arial',
        ];

        $pkNoBorderCell = [
            'borderTopSize' => 0,
            'borderTopColor' => 'FFFFFF',
            'borderBottomSize' => 0,
            'borderBottomColor' => 'FFFFFF',
            'borderLeftSize' => 0,
            'borderLeftColor' => 'FFFFFF',
            'borderRightSize' => 0,
            'borderRightColor' => 'FFFFFF',
            'valign' => 'top',
        ];

        $pkTbl = $paktaSection->addTable([
            'borderSize' => 0,
            'borderColor' => 'FFFFFF',
            'cellMargin' => 0,
            'alignment' => 'center',
            'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
            'width' => 9000,
            'unit' => 'dxa',
        ]);

        // Row 1: Tanggal dan Penyedia Eksternal
        $pkTbl->addRow();
        $lc = $pkTbl->addCell(4500, $pkNoBorderCell);
        $lc->addText('Pekanbaru, ' . $tglPakta, $fs, $pPaktaSig);

        $rc = $pkTbl->addCell(4500, $pkNoBorderCell);
        $rc->addText('Penyedia Eksternal', $fs, $pPaktaSig);

        // Row 2: Nama perusahaan
        $pkTbl->addRow();
        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText('PT SUCOFINDO CABANG PEKANBARU', $fs, $pPaktaSig);

        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($vendorUp, $fs, $pPaktaSig);

        // Row 3: Ruang tanda tangan
        $pkTbl->addRow(2100, ['exactHeight' => false]);
        $pkTbl->addCell(4500, $pkNoBorderCell)->addText('', $fs, $p0);
        $pkTbl->addCell(4500, $pkNoBorderCell)->addText('', $fs, $p0);

        // Row 4: Nama — mengikuti Penandatangan SCI yang dipakai di kontrak/Pasal 11
        $pkTbl->addRow();
        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($penandatanganSci, $paktaName, $pPaktaSig);

        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($direktur, $paktaName, $pPaktaSig);

        // Row 5: Jabatan — mengikuti Jabatan SCI yang dipakai di kontrak/Pasal 11
        $pkTbl->addRow();
        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($jabatanSci, $paktaJabatan, $pPaktaSig);

        $pkTbl->addCell(4500, $pkNoBorderCell)
            ->addText($jabatanVendor, $paktaJabatan, $pPaktaSig);


        // ===================== FORM UJI KELAYAKAN PENYEDIA EKSTERNAL =====================
        // Dibuat setelah Pakta Integritas, mengikuti format halaman tambahan tanpa lanjutan kontrak.
        $this->addFormUjiKelayakanPenyediaEksternal(
            $phpWord,
            $deskripsi,
            $sp->nomor_pr,
            $tglPr,
            $vendorUp,
            $tglPakta,
            $penandatanganSci,
            $jabatanSci
        );

        // ===================== GENERATE FILE =====================
        $cleanDesc = preg_replace('/[\r\n]+/', ' ', $sp->deskripsi_pengadaan);
        $cleanDesc = preg_replace('/[^A-Za-z0-9\s\-]/', '', $cleanDesc);
        $cleanDesc = trim(preg_replace('/\s+/', ' ', $cleanDesc));
        $shortDesc = strlen($cleanDesc) > 40 ? substr($cleanDesc, 0, 40) : $cleanDesc;

        $filename = 'Kontrak Pengadaan ' . $shortDesc . '.docx';
        $tempPath = storage_path('app/kontrak_' . $sp->id . '_' . Str::random(8) . '.docx');
        IOFactory::createWriter($phpWord, 'Word2007')->save($tempPath);

        // Ambil kop surat dari public/images. Nama pertama tetap prioritas.
        $imagePath = $this->resolveKopSuratPath(false);
        $imagePath2 = $this->resolveKopSuratPath(true);
        if ($imagePath) {
            $this->injectHeaderWatermark($tempPath, $imagePath, $imagePath2, $sp->nomor_sp);
        }

        if (!file_exists($tempPath) || filesize($tempPath) === 0) {
            $fallbackPath = storage_path('app/fallback_' . $filename);
            IOFactory::createWriter($phpWord, 'Word2007')->save($fallbackPath);
            return response()->download($fallbackPath, $filename)->deleteFileAfterSend(true);
        }

        return response()->download($tempPath, $filename)->deleteFileAfterSend(true);
    }

    // =========================================================
    // PRIVATE: Render HTML ke sel tabel Word
    // =========================================================
    private function renderHtmlToCell($cell, string $html, array $paraStyle): void
    {
        $html = trim($html);
        if ($html === '' || trim(strip_tags($html)) === '')
            return;

        // Plain text
        if (!$this->isHtmlContent($html)) {
            $this->renderPlainTextToCell($cell, $html, $paraStyle);
            return;
        }

        // HTML → manual renderer
        try {
            $this->renderHtmlManual($cell, $this->prepareHtmlForWord($html), $paraStyle);
            return;
        } catch (\Throwable $e) {
            \Log::warning('renderHtmlToCell: ' . $e->getMessage());
        }

        // Fallback
        $plain = $this->sanitizeXml(
            trim(strip_tags(html_entity_decode($html, ENT_QUOTES | ENT_HTML5, 'UTF-8')))
        );
        if ($plain !== '')
            $this->renderPlainTextToCell($cell, $plain, $paraStyle);
    }

    private function renderPlainTextToCell($cell, string $text, array $paraStyle): void
    {
        $lines = explode("\n", str_replace(["\r\n", "\r"], "\n", $text));
        foreach ($lines as $line) {
            $line = $this->sanitizeXml(trim($line));
            $cell->addText($line !== '' ? $line : '', ['size' => 11, 'name' => 'Calibri'], $paraStyle);
        }
    }

    private function isHtmlContent(string $text): bool
    {
        return (bool) preg_match('/<(b|strong|i|em|u|s|strike|del|sub|sup|span|font|div|p|br|ol|ul|li|h[1-6])\b[^>]*>/i', $text);
    }

    private function prepareHtmlForWord(string $html): string
    {
        if ($html === '')
            return '';
        $html = str_replace(["\r\n", "\r"], "\n", $html);
        $html = str_replace(['&nbsp;', "\xc2\xa0"], ' ', $html);
        $html = preg_replace('/[\x{00AD}\x{200B}-\x{200D}\x{FEFF}]/u', '', $html) ?? $html;
        $html = preg_replace_callback('/\sstyle="([^"]*)"/i', function ($m) {
            $kept = [];
            foreach (explode(';', $m[1]) as $prop) {
                $prop = trim($prop);
                if ($prop === '')
                    continue;
                if (preg_match('/^(font-weight|font-style|text-decoration|color|font-size|font-family|text-align)\s*:/i', $prop)) {
                    $kept[] = $prop;
                }
            }
            return $kept ? ' style="' . implode('; ', $kept) . '"' : '';
        }, $html) ?? $html;
        $html = preg_replace('/\s(class|id|data-[a-z\-]+|on[a-z]+)="[^"]*"/i', '', $html) ?? $html;
        $html = $this->sanitizeXml($html);
        return $html;
    }

    private function renderHtmlManual($cell, string $html, array $paraStyle): void
    {
        $dom = new \DOMDocument('1.0', 'UTF-8');
        libxml_use_internal_errors(true);
        $dom->loadHTML('<?xml encoding="UTF-8"><html><body><div id="__root__">' . $html . '</div></body></html>');
        libxml_clear_errors();

        $root = null;
        $body = $dom->getElementsByTagName('body')->item(0);
        if ($body) {
            foreach ($body->childNodes as $c) {
                if ($c instanceof \DOMElement && $c->getAttribute('id') === '__root__') {
                    $root = $c;
                    break;
                }
            }
        }
        if (!$root)
            return;

        $baseFn = ['size' => 11, 'name' => 'Calibri'];
        $lines = $this->htmlToLines($root, $baseFn, null);

        foreach ($lines as $line) {
            $ps = $paraStyle;
            if (!empty($line['align']))
                $ps = array_merge($ps, ['alignment' => $line['align']]);

            $parts = $line['parts'];
            $prefix = $line['prefix'] ?? '';
            $listType = $line['list'] ?? null;

            if (empty($parts) && $prefix === '' && $listType === null)
                continue;

            if ($listType !== null) {
                $marker = ($prefix !== '') ? $prefix : '•';
                $lps = array_merge($ps, ['indentation' => ['left' => 320, 'hanging' => 220]]);
                $run = $cell->addTextRun($lps);
                $run->addText($marker . ' ', $baseFn);
                foreach ($parts as $p) {
                    if ($p['text'] !== '')
                        $run->addText($p['text'], $p['fs']);
                }
                continue;
            }

            if (empty($parts)) {
                $cell->addText($prefix, $baseFn, $ps);
            } elseif (count($parts) === 1 && $prefix === '') {
                $cell->addText($parts[0]['text'], $parts[0]['fs'], $ps);
            } else {
                $run = $cell->addTextRun($ps);
                if ($prefix !== '')
                    $run->addText($prefix, $baseFn);
                foreach ($parts as $p) {
                    if ($p['text'] !== '')
                        $run->addText($p['text'], $p['fs']);
                }
            }
        }
    }

    private function htmlToLines(\DOMNode $node, array $fs, ?string $align): array
    {
        $blockTags = ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote'];
        $lines = [];
        $cur = ['prefix' => '', 'parts' => [], 'align' => $align, 'list' => null];

        $flush = function () use (&$lines, &$cur, $align) {
            if (!empty($cur['parts']) || $cur['prefix'] !== '' || $cur['list'] !== null)
                $lines[] = $cur;
            $cur = ['prefix' => '', 'parts' => [], 'align' => $align, 'list' => null];
        };

        foreach ($node->childNodes as $child) {
            if ($child->nodeType === XML_TEXT_NODE) {
                $t = $this->sanitizeXml($child->textContent);
                if ($t !== '')
                    $cur['parts'][] = ['text' => $t, 'fs' => $fs];
                continue;
            }
            if (!($child instanceof \DOMElement))
                continue;

            $tag = strtolower($child->nodeName);

            if ($tag === 'br') {
                $flush();
                continue;
            }

            if ($tag === 'ul' || $tag === 'ol') {
                $flush();
                $listType = ($tag === 'ol') ? 'ol' : 'ul';
                $counter = 1;
                foreach ($child->childNodes as $li) {
                    if (!($li instanceof \DOMElement) || strtolower($li->nodeName) !== 'li')
                        continue;
                    $la = $this->rtAlign($li);
                    $liAlign = $la ? $this->normalizeAlign($la) : $align;
                    $marker = ($listType === 'ol') ? ($counter++ . '.') : '•';
                    $liLines = $this->htmlToLines($li, $fs, $liAlign);
                    if (empty($liLines)) {
                        $lines[] = ['prefix' => $marker, 'parts' => [], 'align' => $liAlign, 'list' => $listType];
                    } else {
                        $liLines[0]['list'] = $listType;
                        $liLines[0]['prefix'] = $marker;
                        foreach ($liLines as $ll)
                            $lines[] = $ll;
                    }
                }
                continue;
            }

            if (in_array($tag, $blockTags)) {
                $flush();
                $ba = $this->rtAlign($child);
                $blkAlign = $ba ? $this->normalizeAlign($ba) : $align;
                foreach ($this->htmlToLines($child, $fs, $blkAlign) as $cl)
                    $lines[] = $cl;
                continue;
            }

            $cf = $this->rtFont($fs, $child);
            $inlineLines = $this->htmlToLines($child, $cf, $cur['align']);
            if (count($inlineLines) <= 1) {
                if (!empty($inlineLines))
                    foreach ($inlineLines[0]['parts'] as $p)
                        $cur['parts'][] = $p;
            } else {
                foreach ($inlineLines[0]['parts'] as $p)
                    $cur['parts'][] = $p;
                $flush();
                for ($i = 1; $i < count($inlineLines); $i++)
                    $lines[] = $inlineLines[$i];
            }
        }

        $flush();
        return $lines;
    }

    private function rtFont(array $base, \DOMElement $node): array
    {
        $s = $base;
        $tag = strtolower($node->nodeName);

        if (in_array($tag, ['b', 'strong']))
            $s['bold'] = true;
        if (in_array($tag, ['i', 'em']))
            $s['italic'] = true;
        if ($tag === 'u')
            $s['underline'] = 'single';
        if (in_array($tag, ['s', 'strike', 'del']))
            $s['strikethrough'] = true;
        if ($tag === 'sub')
            $s['subscript'] = true;
        if ($tag === 'sup')
            $s['superscript'] = true;

        if ($tag === 'font') {
            $f = $node->getAttribute('face');
            if ($f)
                $s['name'] = $f;
            $c = $node->getAttribute('color');
            if ($c)
                $s['color'] = $this->expandHexColor(ltrim($c, '#'));
            $z = $node->getAttribute('size');
            if ($z) {
                $map = [1 => 8, 2 => 10, 3 => 12, 4 => 14, 5 => 18, 6 => 24, 7 => 36];
                $s['size'] = $map[(int) $z] ?? 12;
            }
        }

        $css = $node->getAttribute('style');
        if ($css !== '') {
            if (preg_match('/font-family\s*:\s*([^;]+)/i', $css, $m))
                $s['name'] = trim(str_replace(["'", '"'], '', $m[1]));
            if (preg_match('/font-size\s*:\s*(\d+(?:\.\d+)?)\s*(px|pt|em|rem)?/i', $css, $m)) {
                $v = (float) $m[1];
                $u = strtolower($m[2] ?? 'px');
                $s['size'] = match ($u) {
                    'pt' => (int) round($v),
                    'em', 'rem' => (int) round($v * 12),
                    default => (int) round($v * 0.75),
                };
            }
            if (preg_match('/(?:^|;)\s*color\s*:\s*(#[0-9a-fA-F]{3,6})/i', $css, $m))
                $s['color'] = $this->expandHexColor(ltrim($m[1], '#'));
            if (preg_match('/font-weight\s*:\s*(bold|[6-9]\d{2})/i', $css))
                $s['bold'] = true;
            if (preg_match('/font-style\s*:\s*italic/i', $css))
                $s['italic'] = true;
            if (preg_match('/text-decoration\s*:\s*([^;]+)/i', $css, $m)) {
                $d = strtolower($m[1]);
                if (str_contains($d, 'underline'))
                    $s['underline'] = 'single';
                if (str_contains($d, 'line-through'))
                    $s['strikethrough'] = true;
            }
        }

        return $s;
    }

    private function rtAlign(\DOMElement $node): ?string
    {
        $css = $node->getAttribute('style');
        if ($css && preg_match('/text-align\s*:\s*(left|center|right|justify)/i', $css, $m))
            return strtolower($m[1]);
        $a = $node->getAttribute('align');
        if ($a && in_array(strtolower($a), ['left', 'center', 'right', 'justify']))
            return strtolower($a);
        return null;
    }

    private function normalizeAlign(string $align): string
    {
        return match (strtolower($align)) {
            'center' => 'center',
            'right' => 'right',
            'justify' => 'both',
            default => 'left',
        };
    }

    private function expandHexColor(string $hex): string
    {
        $hex = strtoupper(ltrim($hex, '#'));
        if (strlen($hex) === 3)
            $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
        return $hex;
    }

    private function sanitizeXml(string $text): string
    {
        $text = mb_convert_encoding($text, 'UTF-8', 'UTF-8');
        $clean = preg_replace('/[^\x09\x0A\x0D\x20-\x{D7FF}\x{E000}-\x{FFFD}]/u', '', $text);
        return ($clean !== null) ? $clean : $text;
    }

    private function resolveKopSuratPath(bool $halamanLanjutan = false): ?string
    {
        $candidates = $halamanLanjutan ? [
            public_path('images/kop-surat-sp2.jpg'),
            public_path('images/kop-surat-sp2.jpeg'),
            public_path('images/kop-surat-sp2.png'),
            public_path('images/kop_surat_sp2.jpg'),
            public_path('images/kop_surat_sp2.jpeg'),
            public_path('images/kop_surat_sp2.png'),
            public_path('images/Letterhead_IDSurvey-SCI-REV-Halaman-2-Polos.jpg'),
            public_path('images/Letterhead_IDSurvey-SCI-REV-Halaman-2-Polos.jpeg'),
            public_path('images/Letterhead_IDSurvey-SCI-REV-Halaman-2-Polos.png'),
        ] : [
            public_path('images/kop-surat-sp.jpg'),
            public_path('images/kop-surat-sp.jpeg'),
            public_path('images/kop-surat-sp.png'),
            public_path('images/kop_surat_sp.jpg'),
            public_path('images/kop_surat_sp.jpeg'),
            public_path('images/kop_surat_sp.png'),
            public_path('images/Letterhead_IDSurvey-SCI-REV-Halaman-1-Polos.jpg'),
            public_path('images/Letterhead_IDSurvey-SCI-REV-Halaman-1-Polos.jpeg'),
            public_path('images/Letterhead_IDSurvey-SCI-REV-Halaman-1-Polos.png'),
        ];

        foreach ($candidates as $path) {
            if ($path && file_exists($path) && filesize($path) > 0) {
                return $path;
            }
        }

        return null;
    }

    private function fixKontrakTablePasal1WordSafe(string $docxPath): void
    {
        if (!file_exists($docxPath)) {
            return;
        }

        $zip = new \ZipArchive();
        if ($zip->open($docxPath) !== true) {
            return;
        }

        $xml = $zip->getFromName('word/document.xml');
        if (!is_string($xml) || trim($xml) === '') {
            $zip->close();
            return;
        }

        $dom = new \DOMDocument('1.0', 'UTF-8');
        $dom->preserveWhiteSpace = false;
        $dom->formatOutput = false;
        if (!@$dom->loadXML($xml)) {
            $zip->close();
            return;
        }

        $xp = new \DOMXPath($dom);
        $wNs = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
        $xp->registerNamespace('w', $wNs);

        $tbl = $xp->query('//w:tbl')->item(0);
        if (!$tbl instanceof \DOMElement) {
            $zip->close();
            return;
        }

        $makeEl = function (string $tag, array $attrs = []) use ($dom, $wNs) {
            $el = $dom->createElementNS($wNs, 'w:' . $tag);
            foreach ($attrs as $k => $v) {
                $el->setAttributeNS($wNs, 'w:' . $k, (string) $v);
            }
            return $el;
        };

        $gridWidths = [1197, 3544, 851, 733, 1395, 567, 2153];

        $tblPr = $xp->query('./w:tblPr', $tbl)->item(0);
        if (!$tblPr instanceof \DOMElement) {
            $tblPr = $makeEl('tblPr');
            $tbl->insertBefore($tblPr, $tbl->firstChild);
        }
        while ($tblPr->firstChild) {
            $tblPr->removeChild($tblPr->firstChild);
        }
        $tblPr->appendChild($makeEl('tblW', ['w' => '10440', 'type' => 'dxa']));
        $tblBorders = $makeEl('tblBorders');
        foreach (['top', 'left', 'bottom', 'insideH'] as $border) {
            $tblBorders->appendChild($makeEl($border, ['val' => 'single', 'sz' => '4', 'space' => '0', 'color' => '000001']));
        }
        $tblPr->appendChild($tblBorders);
        $tblPr->appendChild($makeEl('tblLayout', ['type' => 'fixed']));
        $tblCellMar = $makeEl('tblCellMar');
        $tblCellMar->appendChild($makeEl('left', ['w' => '0', 'type' => 'dxa']));
        $tblCellMar->appendChild($makeEl('right', ['w' => '0', 'type' => 'dxa']));
        $tblPr->appendChild($tblCellMar);
        $tblPr->appendChild($makeEl('tblLook', ['val' => '04A0', 'firstRow' => '1', 'lastRow' => '0', 'firstColumn' => '1', 'lastColumn' => '0', 'noHBand' => '0', 'noVBand' => '1']));

        $tblGrid = $xp->query('./w:tblGrid', $tbl)->item(0);
        $newGrid = $makeEl('tblGrid');
        foreach ($gridWidths as $w) {
            $newGrid->appendChild($makeEl('gridCol', ['w' => (string) $w]));
        }
        if ($tblGrid instanceof \DOMElement) {
            $tbl->replaceChild($newGrid, $tblGrid);
        } else {
            $tbl->insertBefore($newGrid, $tblPr->nextSibling);
        }

        $rows = $xp->query('./w:tr', $tbl);
        foreach ($rows as $tr) {
            if (!$tr instanceof \DOMElement) {
                continue;
            }
            $cells = $xp->query('./w:tc', $tr);
            $lastIndex = $cells->length - 1;
            $colCursor = 0;
            foreach ($cells as $cIndex => $tc) {
                if (!$tc instanceof \DOMElement) {
                    continue;
                }
                $tcPr = $xp->query('./w:tcPr', $tc)->item(0);
                if (!$tcPr instanceof \DOMElement) {
                    $tcPr = $makeEl('tcPr');
                    $tc->insertBefore($tcPr, $tc->firstChild);
                }
                $spanNode = $xp->query('./w:gridSpan', $tcPr)->item(0);
                $span = 1;
                if ($spanNode instanceof \DOMElement) {
                    $span = max(1, (int) ($spanNode->getAttributeNS($wNs, 'val') ?: $spanNode->getAttribute('w:val')));
                }
                $width = 0;
                for ($i = 0; $i < $span; $i++) {
                    $width += $gridWidths[$colCursor + $i] ?? 0;
                }
                $colCursor += $span;
                $tcW = $xp->query('./w:tcW', $tcPr)->item(0);
                if (!$tcW instanceof \DOMElement) {
                    $tcW = $makeEl('tcW');
                    $tcPr->insertBefore($tcW, $tcPr->firstChild);
                }
                $tcW->setAttributeNS($wNs, 'w:w', (string) $width);
                $tcW->setAttributeNS($wNs, 'w:type', 'dxa');
                $oldBorders = $xp->query('./w:tcBorders', $tcPr)->item(0);
                if ($oldBorders instanceof \DOMElement) {
                    $tcPr->removeChild($oldBorders);
                }
                $borders = $makeEl('tcBorders');
                foreach (['top', 'left', 'bottom'] as $side) {
                    $borders->appendChild($makeEl($side, ['val' => 'single', 'sz' => '4', 'space' => '0', 'color' => '000001']));
                }
                if ($cIndex === $lastIndex) {
                    $borders->appendChild($makeEl('right', ['val' => 'single', 'sz' => '4', 'space' => '0', 'color' => '000001']));
                }
                $tcPr->appendChild($borders);
            }
        }

        $newXml = $dom->saveXML();
        if (is_string($newXml) && trim($newXml) !== '') {
            if ($zip->locateName('word/document.xml') !== false) {
                $zip->deleteName('word/document.xml');
            }
            $zip->addFromString('word/document.xml', $newXml);
        }

        $zip->close();
    }




    // =========================================================
    // INJECT KOP SURAT - WORD SAFE
    // =========================================================
    private function injectHeaderWatermark(string $docxPath, string $imagePath, ?string $imagePath2 = null, ?string $nomorKontrak = null): void
    {
        if (!file_exists($docxPath) || filesize($docxPath) === 0 || !file_exists($imagePath)) {
            return;
        }

        $tempPath = $docxPath . '.tmp_' . uniqid('', true) . '.docx';
        if (!copy($docxPath, $tempPath)) {
            return;
        }

        $zip = new ZipArchive();
        if ($zip->open($tempPath) !== true) {
            @unlink($tempPath);
            return;
        }

        $putString = function (string $name, string $content) use ($zip): void {
            if ($zip->locateName($name) !== false) {
                $zip->deleteName($name);
            }
            $zip->addFromString($name, $content);
        };

        $putFile = function (string $source, string $name) use ($zip): void {
            if ($zip->locateName($name) !== false) {
                $zip->deleteName($name);
            }
            $zip->addFile($source, $name);
        };

        $ext = strtolower(pathinfo($imagePath, PATHINFO_EXTENSION)) ?: 'jpg';
        if ($ext === 'jpeg') {
            $ext = 'jpg';
        }

        $hasPage2 = $imagePath2 && file_exists($imagePath2) && filesize($imagePath2) > 0;
        $ext2 = $hasPage2 ? (strtolower(pathinfo($imagePath2, PATHINFO_EXTENSION)) ?: $ext) : $ext;
        if ($ext2 === 'jpeg') {
            $ext2 = 'jpg';
        }

        $mediaName1 = 'kop_surat_halaman_1.' . $ext;
        $mediaName2 = 'kop_surat_lanjutan.' . $ext2;
        $mediaDefault = $hasPage2 ? $mediaName2 : $mediaName1;

        $makeHeaderXml = function (string $rid, string $title, string $shapeId, string $lanjutanText = '', string $shapeTop = '-113.5pt', bool $fullPageA4 = false): string {
            $safeTitle = htmlspecialchars($title, ENT_XML1 | ENT_COMPAT, 'UTF-8');
            $safeLanjutan = htmlspecialchars($lanjutanText, ENT_XML1 | ENT_COMPAT, 'UTF-8');

            $lanjutanXml = '';
            if ($safeLanjutan !== '') {
                $lanjutanXml = '';
                if ($safeLanjutan !== '') {
                    $lanjutanXml =
                        '<w:p><w:pPr><w:pStyle w:val="Header"/></w:pPr></w:p>' .
                        '<w:p>' .
                        '<w:pPr>' .
                        '<w:pStyle w:val="Header"/>' .
                        '<w:spacing w:before="280" w:after="0"/>' .
                        '<w:jc w:val="right"/>' .
                        '<w:rPr>' .
                        '<w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>' .
                        '<w:i/><w:iCs/>' .
                        '<w:sz w:val="22"/><w:szCs w:val="22"/>' .
                        '</w:rPr>' .
                        '</w:pPr>' .
                        '<w:r>' .
                        '<w:rPr>' .
                        '<w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>' .
                        '<w:i/><w:iCs/>' .
                        '<w:sz w:val="22"/><w:szCs w:val="22"/>' .
                        '<w:position w:val="48"/>' .
                        '</w:rPr>' .
                        '<w:t>' . $safeLanjutan . '</w:t>' .
                        '</w:r>' .
                        '</w:p>';
                }
            }

            if ($fullPageA4) {
                $shapeStyle = 'position:absolute;margin-left:0pt;margin-top:0pt;width:595.3pt;height:842.1pt;z-index:-251656192;mso-position-horizontal-relative:page;mso-position-vertical-relative:page';
                $wrapAnchor = 'page';
            } else {
                $shapeStyle = 'position:absolute;margin-left:-79pt;margin-top:' . $shapeTop . ';width:611.5pt;height:885.6pt;z-index:-251656192;mso-position-horizontal-relative:margin;mso-position-vertical-relative:margin';
                $wrapAnchor = 'margin';
            }

            return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' .
                '<w:hdr xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:cx="http://schemas.microsoft.com/office/drawing/2014/chartex" xmlns:cx1="http://schemas.microsoft.com/office/drawing/2015/9/8/chartex" xmlns:cx2="http://schemas.microsoft.com/office/drawing/2015/10/21/chartex" xmlns:cx3="http://schemas.microsoft.com/office/drawing/2016/5/9/chartex" xmlns:cx4="http://schemas.microsoft.com/office/drawing/2016/5/10/chartex" xmlns:cx5="http://schemas.microsoft.com/office/drawing/2016/5/11/chartex" xmlns:cx6="http://schemas.microsoft.com/office/drawing/2016/5/12/chartex" xmlns:cx7="http://schemas.microsoft.com/office/drawing/2016/5/13/chartex" xmlns:cx8="http://schemas.microsoft.com/office/drawing/2016/5/14/chartex" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:aink="http://schemas.microsoft.com/office/drawing/2016/ink" xmlns:am3d="http://schemas.microsoft.com/office/drawing/2017/model3d" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:w16cex="http://schemas.microsoft.com/office/word/2018/wordml/cex" xmlns:w16cid="http://schemas.microsoft.com/office/word/2016/wordml/cid" xmlns:w16="http://schemas.microsoft.com/office/word/2018/wordml" xmlns:w16sdtdh="http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash" xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 w15 w16se w16cid w16 w16cex w16sdtdh wp14">' .
                '<w:p><w:pPr><w:pStyle w:val="Header"/></w:pPr><w:r><w:rPr><w:noProof/></w:rPr><w:pict>' .
                '<v:shapetype id="_x0000_t75" coordsize="21600,21600" o:spt="75" o:preferrelative="t" path="m@4@5l@4@11@9@11@9@5xe" filled="f" stroked="f"><v:stroke joinstyle="miter"/><v:formulas><v:f eqn="if lineDrawn pixelLineWidth 0"/><v:f eqn="sum @0 1 0"/><v:f eqn="sum 0 0 @1"/><v:f eqn="prod @2 1 2"/><v:f eqn="prod @3 21600 pixelWidth"/><v:f eqn="prod @3 21600 pixelHeight"/><v:f eqn="sum @0 0 1"/><v:f eqn="prod @6 1 2"/><v:f eqn="prod @7 21600 pixelWidth"/><v:f eqn="sum @8 21600 0"/><v:f eqn="prod @7 21600 pixelHeight"/><v:f eqn="sum @10 21600 0"/></v:formulas><v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect"/><o:lock v:ext="edit" aspectratio="t"/></v:shapetype>' .
                '<v:shape id="' . $shapeId . '" o:spid="_x0000_s2051" type="#_x0000_t75" stroked="f" filled="t" style="' . $shapeStyle . '" o:allowincell="f"><v:stroke on="f" opacity="0"/><v:imagedata r:id="' . $rid . '" o:title="' . $safeTitle . '"/><w10:wrap anchorx="' . $wrapAnchor . '" anchory="' . $wrapAnchor . '"/></v:shape>' .
                '</w:pict></w:r></w:p>' . $lanjutanXml . '</w:hdr>';
        };

        try {
            $putFile($imagePath, 'word/media/' . $mediaName1);
            if ($hasPage2) {
                $putFile($imagePath2, 'word/media/' . $mediaName2);
            }

            $isSuratPesananBiasa = trim((string) $nomorKontrak) === '';
            $lanjutan = ! $isSuratPesananBiasa ? ('Lanjutan Kontrak No. ' . trim((string) $nomorKontrak)) : '';

            $firstPageShapeTop = $isSuratPesananBiasa ? '-110pt' : '-91.5pt';

            $putString('word/header1.xml', $makeHeaderXml('rId1', 'kop_surat_halaman_1', 'WordPictureWatermark27082704', '', $firstPageShapeTop, false));
            $putString('word/header2.xml', $makeHeaderXml('rId1', 'kop_surat_lanjutan', 'WordPictureWatermark27082705', $lanjutan, '-113.5pt', true));
            $putString('word/header3.xml', $makeHeaderXml('rId1', 'kop_surat_lanjutan_even', 'WordPictureWatermark27082706', $lanjutan, '-113.5pt', true));

            $makeRels = function (string $mediaTarget): string {
                return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' .
                    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' .
                    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/' . htmlspecialchars($mediaTarget, ENT_XML1 | ENT_COMPAT, 'UTF-8') . '"/>' .
                    '</Relationships>';
            };

            $putString('word/_rels/header1.xml.rels', $makeRels($mediaName1));
            $putString('word/_rels/header2.xml.rels', $makeRels($mediaDefault));
            $putString('word/_rels/header3.xml.rels', $makeRels($mediaDefault));

            // Header khusus Pakta Integritas: tetap pakai kop surat, tetapi tanpa teks lanjutan kontrak.
            $putString('word/header4.xml', $makeHeaderXml('rId1', 'kop_surat_pakta_integritas', 'WordPictureWatermark27082707', '', '-113.5pt'));
            $putString('word/_rels/header4.xml.rels', $makeRels($mediaName1));

            // Footer khusus Pakta Integritas dikosongkan agar nomor halaman tidak muncul.
            $blankFooterXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' .
                '<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:pStyle w:val="Footer"/></w:pPr></w:p></w:ftr>';
            $putString('word/footer4.xml', $blankFooterXml);

            $docRelsPath = 'word/_rels/document.xml.rels';
            $docRels = $zip->getFromName($docRelsPath);
            if ($docRels !== false) {
                // Jangan hapus semua relationship header, karena section Pakta perlu header/footer kosong.
                // Yang dibersihkan hanya header hasil inject lama: header1.xml, header2.xml, header3.xml, header4.xml dan footer4.xml.
                $docRels = preg_replace_callback('/<Relationship\b[^>]*\/>/', function ($m) {
                    $tag = $m[0];
                    $isGeneratedHeader = strpos($tag, 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/header') !== false
                        && preg_match('/Target="header[1234]\.xml"/', $tag);
                    $isGeneratedFooter = strpos($tag, 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer') !== false
                        && preg_match('/Target="footer4\.xml"/', $tag);
                    return ($isGeneratedHeader || $isGeneratedFooter) ? '' : $tag;
                }, $docRels);

                preg_match_all('/Id="rId(\d+)"/', $docRels, $ids);
                $maxRid = 0;
                foreach ($ids[1] as $num) {
                    $maxRid = max($maxRid, (int) $num);
                }

                $rIdFirst = 'rId' . (++$maxRid);
                $rIdDefault = 'rId' . (++$maxRid);
                $rIdEven = 'rId' . (++$maxRid);
                $rIdPaktaHeader = 'rId' . (++$maxRid);
                $rIdPaktaFooter = 'rId' . (++$maxRid);

                $relsAdd =
                    '<Relationship Id="' . $rIdFirst . '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/>' .
                    '<Relationship Id="' . $rIdDefault . '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header2.xml"/>' .
                    '<Relationship Id="' . $rIdEven . '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header3.xml"/>' .
                    '<Relationship Id="' . $rIdPaktaHeader . '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header4.xml"/>' .
                    '<Relationship Id="' . $rIdPaktaFooter . '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer4.xml"/>';
                $docRels = str_replace('</Relationships>', $relsAdd . '</Relationships>', $docRels);
                $putString($docRelsPath, $docRels);

                $docXml = $zip->getFromName('word/document.xml');
                if ($docXml !== false) {
                    $sectIndex = 0;
                    $docXml = preg_replace_callback('/<w:sectPr\b[^>]*>.*?<\/w:sectPr>/s', function ($m) use ($rIdEven, $rIdDefault, $rIdFirst, $rIdPaktaHeader, $rIdPaktaFooter, $isSuratPesananBiasa, &$sectIndex) {
                        $sectIndex++;
                        $sect = $m[0];
                        $sect = preg_replace('/<w:headerReference\b[^>]*\/>/', '', $sect);

                        if ($sectIndex === 1) {
                            // Section kontrak: pakai kop dan teks lanjutan kontrak.
                            $headerRefs =
                                '<w:headerReference w:type="even" r:id="' . $rIdEven . '"/>' .
                                '<w:headerReference w:type="default" r:id="' . $rIdDefault . '"/>' .
                                '<w:headerReference w:type="first" r:id="' . $rIdFirst . '"/>';
                            $sect = preg_replace('/(<w:sectPr\b[^>]*>)/', '$1' . $headerRefs, $sect, 1);
                            if (strpos($sect, '<w:titlePg') === false) {
                                $sect = str_replace('</w:sectPr>', '<w:titlePg/></w:sectPr>', $sect);
                            }
                        } else {
                            // Section Pakta Integritas: header dan footer kosong, jadi tidak ada lanjutan kontrak dan nomor halaman.
                            $sect = preg_replace('/<w:footerReference\b[^>]*\/>/', '', $sect);
                            $blankRefs =
                                '<w:headerReference w:type="even" r:id="' . $rIdPaktaHeader . '"/>' .
                                '<w:headerReference w:type="default" r:id="' . $rIdPaktaHeader . '"/>' .
                                '<w:headerReference w:type="first" r:id="' . $rIdPaktaHeader . '"/>' .
                                '<w:footerReference w:type="even" r:id="' . $rIdPaktaFooter . '"/>' .
                                '<w:footerReference w:type="default" r:id="' . $rIdPaktaFooter . '"/>' .
                                '<w:footerReference w:type="first" r:id="' . $rIdPaktaFooter . '"/>';
                            $sect = preg_replace('/(<w:sectPr\b[^>]*>)/', '$1' . $blankRefs, $sect, 1);
                            if (strpos($sect, '<w:titlePg') === false) {
                                $sect = str_replace('</w:sectPr>', '<w:titlePg/></w:sectPr>', $sect);
                            }
                        }

                        $bottomMargin = $isSuratPesananBiasa ? '2400' : '1304';
                        $sect = preg_replace('/<w:pgMar\b[^>]*\/>/', '<w:pgMar w:top="1750" w:right="1418" w:bottom="' . $bottomMargin . '" w:left="1418" w:header="737" w:footer="709" w:gutter="0"/>', $sect, 1);
                        return $sect;
                    }, $docXml);
                    $putString('word/document.xml', $docXml);
                }
            }

            $ct = $zip->getFromName('[Content_Types].xml');
            if ($ct !== false) {
                foreach (['header1.xml', 'header2.xml', 'header3.xml', 'header4.xml', 'footer4.xml'] as $hf) {
                    $ct = preg_replace('/<Override\b[^>]*PartName="\/word\/' . preg_quote($hf, '/') . '"[^>]*\/>/', '', $ct);
                }
                foreach (array_unique([$ext, $ext2]) as $e) {
                    if (strpos($ct, 'Extension="' . $e . '"') === false) {
                        $mime = ($e === 'png') ? 'image/png' : 'image/jpeg';
                        $ct = str_replace('</Types>', '<Default Extension="' . $e . '" ContentType="' . $mime . '"/></Types>', $ct);
                    }
                }
                $headerOverrides =
                    '<Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>' .
                    '<Override PartName="/word/header2.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>' .
                    '<Override PartName="/word/header3.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>' .
                    '<Override PartName="/word/header4.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>' .
                    '<Override PartName="/word/footer4.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>';
                $ct = str_replace('</Types>', $headerOverrides . '</Types>', $ct);
                $putString('[Content_Types].xml', $ct);
            }
        } catch (\Throwable $e) {
            $zip->close();
            @unlink($tempPath);
            return;
        }

        if (!$zip->close()) {
            @unlink($tempPath);
            return;
        }

        if (file_exists($tempPath) && filesize($tempPath) > 500) {
            if (!@rename($tempPath, $docxPath)) {
                @copy($tempPath, $docxPath);
                @unlink($tempPath);
            }
        } else {
            @unlink($tempPath);
        }
    }



    private function isDocxXmlValid(string $path): bool
    {
        $zip = new ZipArchive();
        if ($zip->open($path) !== true)
            return false;

        $ok = true;
        $prev = libxml_use_internal_errors(true);
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $name = $zip->getNameIndex($i);
            if (substr($name, -4) === '.xml' || substr($name, -5) === '.rels') {
                $xml = $zip->getFromName($name);
                $dom = new \DOMDocument();
                if ($xml === false || !$dom->loadXML($xml)) {
                    $ok = false;
                    break;
                }
            }
        }
        libxml_clear_errors();
        libxml_use_internal_errors($prev);
        $zip->close();
        return $ok;
    }

    // =========================================================
    // PRIVATE: Sync items
    // =========================================================
    private function syncItems(Sp $sp, array $items): void
    {
        $sp->items()->delete();
        $urutan = 1;

        foreach ($items as $item) {
            $raw = $item['nama_barang'] ?? '';
            $nama = strip_tags($raw, '<b><strong><i><em><u><s><strike><del><sub><sup><span><font><div><p><br><ol><ul><li>');

            if (!trim(strip_tags($nama)))
                continue;

            // Parse harga satuan dengan aman, termasuk format rupiah 1.234.567.890
            $hargaSatuan = $this->moneyToFloat($item['harga_satuan'] ?? '');
            $hargaSatuan = $hargaSatuan > 0
                ? $hargaSatuan
                : null;

            // Parse jumlah
            $jumlahRaw = $item['jumlah'] ?? '';
            $jumlah = is_numeric($jumlahRaw) ? (float) $jumlahRaw : null;

            // Hitung subtotal
            $subtotal = null;
            if ($hargaSatuan !== null && $jumlah !== null && $jumlah > 0) {
                $subtotal = $hargaSatuan * $jumlah;
            }

            SpItem::create([
                'sp_id' => $sp->id,
                'urutan' => $urutan++,
                'nama_barang' => $nama,
                'satuan' => $item['satuan'] ?? null,
                'jumlah' => $item['jumlah'] ?? null,
                'harga_satuan' => $hargaSatuan,
                'subtotal' => $subtotal,
                'tgl_pemenuhan' => !empty($item['tgl_pemenuhan']) ? $item['tgl_pemenuhan'] : null,
            ]);
        }
    }

    // =========================================================
    // PRIVATE: Calculate total from items
    // =========================================================
    private function calculateItemsTotal(array $items): float
    {
        $total = 0;
        foreach ($items as $item) {
            $jumlahRaw = $item['jumlah'] ?? '';

            $harga = $this->moneyToFloat($item['harga_satuan'] ?? '');
            $jumlah = is_numeric($jumlahRaw) ? (float) $jumlahRaw : 0;

            if ($harga > 0 && $jumlah > 0) {
                $total += $harga * $jumlah;
            }
        }
        return $total;
    }

    private function hitungNilaiAcuan(Sp $sp): float
    {
        $nilaiSp = $this->moneyToFloat($sp->nilai_sp);
        if ($nilaiSp > 0) {
            return $nilaiSp;
        }
        $subtotal = 0.0;
        foreach ($sp->items as $it) {
            $subtotal += $this->moneyToFloat($it->subtotal ?? 0);
        }
        return $subtotal > 0 ? $subtotal + round($subtotal * 0.11) : 0.0;
    }

    private function kontrakParagraf($section, string $text, array $pStyle, array $fs, array $fb, array $extraBold = []): void
    {
        // Kata/kalimat yang tetap bold
        $boldTerms = array_merge([
            'PIHAK KESATU',
            'PIHAK KEDUA',
            'PT SUCOFINDO',
            'PT SUPERINTENDING COMPANY OF INDONESIA',
            'PARA PIHAK',
            'Pasal 1266',
            'Pakta Integritas',
        ], $extraBold);

        // Kata yang dibuat italic, bukan bold
        $italicTerms = [
            'Force Majeure',
            'Performance Bond',
            'Surety Bond',
        ];

        $allTerms = array_unique(array_merge($boldTerms, $italicTerms));

        // Urutkan dari yang paling panjang agar match lebih aman
        usort($allTerms, fn($a, $b) => mb_strlen($b) - mb_strlen($a));

        $pattern = '/(' . implode('|', array_map('preg_quote', $allTerms)) . ')/u';

        $run = $section->addTextRun($pStyle);
        $parts = preg_split($pattern, $text, -1, PREG_SPLIT_DELIM_CAPTURE);

        foreach ($parts as $part) {
            if ($part === '') {
                continue;
            }

            $isBold = in_array($part, $boldTerms, true);
            $isItalic = in_array($part, $italicTerms, true);

            if ($isBold) {
                $run->addText($part, $fb);
            } elseif ($isItalic) {
                $run->addText($part, array_merge($fs, ['italic' => true]));
            } else {
                $run->addText($part, $fs);
            }
        }
    }

    private function kontrakAyat($section, string $text, array $fs, array $fb, array $extraBold = [], int $depth = 0): void
    {
        $pStyle = [
            'alignment' => 'both',
            'spaceAfter' => 120,
            'spaceBefore' => 0,
            'numbering' => ['num' => 'kontrakNum', 'level' => $depth],
        ];
        $this->kontrakParagraf($section, $text, $pStyle, $fs, $fb, $extraBold);
    }


    // =========================================================
    // PRIVATE: Form Uji Kelayakan Penyedia Eksternal
    // =========================================================
    private function addFormUjiKelayakanPenyediaEksternal(
        PhpWord $phpWord,
        string $deskripsi,
        ?string $nomorPr,
        ?string $tglPr,
        string $vendorUp,
        string $tglCetak,
        string $penandatanganSci,
        string $jabatanSci
    ): void {
        $section = $phpWord->addSection([
            'pageSizeW' => 11906,
            'pageSizeH' => 16838,
            'marginTop' => 1750,
            'marginBottom' => 1304,
            'marginLeft' => 1418,
            'marginRight' => 1418,
            'headerHeight' => 737,
            'footerHeight' => 709,
        ]);

        $fs = ['size' => 11, 'name' => 'Arial'];
        $fb = ['bold' => true, 'size' => 11, 'name' => 'Arial'];
        $fs10 = ['size' => 10, 'name' => 'Arial'];
        $fb10 = ['bold' => true, 'size' => 10, 'name' => 'Arial'];
        $fs9 = ['size' => 9, 'name' => 'Arial'];
        $fb9 = ['bold' => true, 'size' => 9, 'name' => 'Arial'];
        $title = ['bold' => true, 'size' => 14, 'name' => 'Arial'];
        $p0 = ['spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pC = ['alignment' => 'center', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pL = ['alignment' => 'left', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pJ = ['alignment' => 'both', 'spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];

        $nomorPrText = trim((string) $nomorPr) !== '' ? trim((string) $nomorPr) : '(............................)';
        $tglPrText = trim((string) $tglPr) !== '' ? trim((string) $tglPr) : '(............................)';
        $pengadaanText = mb_strtoupper(trim($deskripsi), 'UTF-8');
        $vendorText = mb_strtoupper(trim($vendorUp), 'UTF-8');

        $borderCell = [
            'borderTopSize' => 6,
            'borderTopColor' => '000000',
            'borderBottomSize' => 6,
            'borderBottomColor' => '000000',
            'borderLeftSize' => 6,
            'borderLeftColor' => '000000',
            'borderRightSize' => 6,
            'borderRightColor' => '000000',
            'valign' => 'top',
        ];
        $borderCenter = array_merge($borderCell, ['valign' => 'center']);
        $noBorderCell = [
            'borderTopSize' => 0,
            'borderTopColor' => 'FFFFFF',
            'borderBottomSize' => 0,
            'borderBottomColor' => 'FFFFFF',
            'borderLeftSize' => 0,
            'borderLeftColor' => 'FFFFFF',
            'borderRightSize' => 0,
            'borderRightColor' => 'FFFFFF',
            'valign' => 'top',
        ];

        $section->addText('FORMULIR UJI KELAYAKAN PENYEDIA EKSTERNAL', $title, $pL);

        $line = $section->addTable([
            'borderSize' => 0,
            'borderColor' => 'FFFFFF',
            'cellMargin' => 0,
            'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
            'width' => 9000,
            'unit' => 'dxa',
        ]);
        $line->addRow(80);
        $line->addCell(9000, ['borderBottomSize' => 8, 'borderBottomColor' => '7F7F7F'])->addText('', $fs, $p0);

        $section->addTextBreak(1, $p0);
        $section->addText('PENGADAAN ' . $pengadaanText, $fb, $pC);
        $section->addText('PR NO. ' . $nomorPrText . ' TANGGAL ' . $tglPrText, $fb, $pC);
        $section->addTextBreak(1, $p0);

        $penyediaRun = $section->addTextRun($pL);
        $penyediaRun->addText('Nama Penyedia Eksternal', $fs);
        $penyediaRun->addText(' : ', $fs);
        $penyediaRun->addText($vendorText, $fb);

        $section->addText('Hasil Uji Kelayakan Penyedia Eksternal tersebut di atas sebagai berikut :', $fs, ['spaceAfter' => 80, 'spaceBefore' => 80, 'lineHeight' => 1.0]);

        $tbl = $section->addTable([
            'borderSize' => 6,
            'borderColor' => '000000',
            'cellMargin' => 70,
            'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
            'width' => 9000,
            'unit' => 'dxa',
        ]);

        $tbl->addRow();
        $tbl->addCell(550, $borderCenter)->addText('No.', $fb10, $pC);
        $tbl->addCell(4300, $borderCenter)->addText('Dokumen', $fb10, $pC);
        $tbl->addCell(4150, $borderCenter)->addText('Keterangan', $fb10, $pC);

        $rows = [
            [
                'no' => '1',
                'dokumen' => 'Sistem Manajemen Anti Penyuapan yang diterapkan penyedia eksternal *)',
                'memenuhi' => 'Memenuhi, berupa : Sertifikat SMAP / Prosedur SMAP / Kebijakan SMAP (coret yang tidak perlu)',
                'tidak' => 'Tidak memenuhi',
            ],
            [
                'no' => '2',
                'dokumen' => 'Reputasi (kasus penyuapan) yang pernah dilakukan penyedia eksternal',
                'memenuhi' => 'Memenuhi, tidak ada kasus',
                'tidak' => 'Tidak memenuhi, kasus : ...',
            ],
            [
                'no' => '3',
                'dokumen' => 'Reputasi (kasus penyuapan) yang pernah dilakukan pemilik atau pimpinan penyedia eksternal',
                'memenuhi' => 'Memenuhi, tidak ada kasus',
                'tidak' => 'Tidak memenuhi, kasus : ...',
            ],
            [
                'no' => '4',
                'dokumen' => 'Mekanisme transaksi dan pembayaran yang dimiliki penyedia eksternal',
                'memenuhi' => 'Memenuhi, pembayaran Non tunai',
                'tidak' => 'Tidak memenuhi, pembayaran tunai',
            ],
            [
                'no' => '5',
                'dokumen' => 'Reputasi / track record pengadaan di perusahaan, jika ada',
                'memenuhi' => 'Memenuhi, penilaian > buruk atau belum ada penilaian (penyedia eksternal baru)',
                'tidak' => 'Tidak memenuhi, penilaian buruk',
            ],
        ];

        // Checkbox dibuat menggunakan simbol Unicode supaya kotaknya tidak putus-putus
        // dan tidak muncul background hitam. Ukuran checkbox checked/unchecked sama.
        $boxHolderStyle = array_merge($noBorderCell, [
            'cellMarginTop' => 0,
            'cellMarginBottom' => 0,
            'cellMarginLeft' => 0,
            'cellMarginRight' => 0,
            'valign' => 'top',
        ]);

        $pCheck = [
            'alignment' => 'center',
            'spaceAfter' => 0,
            'spaceBefore' => 0,
            'lineHeight' => 1.0,
        ];

        // Pakai Segoe UI Symbol agar kotak ceklis tidak hitam dan bentuknya stabil di Word.
        $checkFont = ['size' => 10, 'name' => 'Segoe UI Symbol'];

        $addCheckOption = function ($cell, bool $checked, callable $textBuilder) use ($boxHolderStyle, $checkFont, $fs10, $pCheck, $pL) {
            $optionTbl = $cell->addTable([
                'borderSize' => 0,
                'borderColor' => 'FFFFFF',
                'cellMargin' => 0,
                'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
                'width' => 3900,
                'unit' => 'dxa',
            ]);

            $optionTbl->addRow();

            // Kolom checkbox dibuat tetap, sehingga teks opsi checked dan unchecked sejajar.
            $optionTbl->addCell(420, $boxHolderStyle)
                ->addText($checked ? '☑' : '☐', $checkFont, $pCheck);

            $textCell = $optionTbl->addCell(3480, $boxHolderStyle);
            $textBuilder($textCell);
        };

        foreach ($rows as $row) {
            $tbl->addRow();
            $tbl->addCell(550, $borderCell)->addText($row['no'], $fs10, $pL);
            $tbl->addCell(4300, $borderCell)->addText($row['dokumen'], $fs10, $pJ);
            $ketCell = $tbl->addCell(4150, $borderCell);

            if ($row['no'] === '1') {
                $addCheckOption($ketCell, true, function ($textCell) use ($fs10, $pL) {
                    $textCell->addText('Memenuhi, berupa :', $fs10, $pL);
                    $textCell->addText('Sertifikat SMAP / Prosedur SMAP /', $fs10, $pL);
                    $run = $textCell->addTextRun($pL);
                    $run->addText('Kebijakan SMAP ', $fs10);
                    $run->addText('(coret yang tidak perlu)', array_merge($fs10, ['italic' => true]));
                });
            } else {
                $addCheckOption($ketCell, true, function ($textCell) use ($row, $fs10, $pL) {
                    $textCell->addText($row['memenuhi'], $fs10, $pL);
                });
            }

            // Beri jarak 1 enter setelah opsi Memenuhi supaya baris Tidak memenuhi turun rapi.
            $ketCell->addTextBreak(1, $p0);

            $addCheckOption($ketCell, false, function ($textCell) use ($row, $fs10, $pL) {
                $textCell->addText($row['tidak'], $fs10, $pL);
            });
        }

        $tbl->addRow();
        $kesimpulanCell = $tbl->addCell(9000, array_merge($borderCell, ['gridSpan' => 3]));
        $kesimpulanRun = $kesimpulanCell->addTextRun($pL);
        $kesimpulanRun->addText('Kesimpulan Uji Kelayakan Penyedia Eksternal **) : ', $fs10);
        $kesimpulanRun->addText('Layak', $fb10);
        $kesimpulanRun->addText(' / ', $fs10);
        $kesimpulanRun->addText('Tidak Layak', array_merge($fs10, ['strikethrough' => true]));

        $section->addTextBreak(1, $p0);
        $ketTbl = $section->addTable([
            'borderSize' => 0,
            'borderColor' => 'FFFFFF',
            'cellMargin' => 0,
            'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
            'width' => 9000,
            'unit' => 'dxa',
        ]);
        $ketTbl->addRow();
        $ketTbl->addCell(1450, $noBorderCell)->addText('Keterangan :', $fs10, $pL);
        $ketTbl->addCell(7550, $noBorderCell)->addText('*)  - BUMN yang mempunyai sertifikat SMAP', $fs10, $pL);
        $ketTbl->addRow();
        $ketTbl->addCell(1450, $noBorderCell)->addText('', $fs10, $pL);
        $ketTbl->addCell(7550, $noBorderCell)->addText('    - Selain BUMN yang mempunyai Kebijakan/Prosedur SMAP', $fs10, $pL);
        $ketTbl->addRow();
        $ketTbl->addCell(1450, $noBorderCell)->addText('', $fs10, $pL);
        $ketTbl->addCell(7550, $noBorderCell)->addText('**) Layak, jika seluruh keterangan memenuhi', $fb10, $pL);

        $section->addTextBreak(1, $p0);
        $section->addText('Pekanbaru, ' . $tglCetak, $fs, $pL);

        $sigTbl = $section->addTable([
            'borderSize' => 0,
            'borderColor' => 'FFFFFF',
            'cellMargin' => 0,
            'alignment' => 'center',
            'layout' => \PhpOffice\PhpWord\Style\Table::LAYOUT_FIXED,
            'width' => 9000,
            'unit' => 'dxa',
        ]);

        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText('Verifikator', $fs, $pL);
        $sigTbl->addCell(4500, $noBorderCell)->addText('Persetujuan', $fs, $pL);

        $sigTbl->addRow(1500, ['exactHeight' => false]);
        $sigTbl->addCell(4500, $noBorderCell)->addText('', $fs, $p0);
        $sigTbl->addCell(4500, $noBorderCell)->addText('', $fs, $p0);

        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText('Nama     : ..............................', $fs, $pL);
        $sigTbl->addCell(4500, $noBorderCell)->addText('Nama     : ' . $penandatanganSci, $fs, $pL);

        $sigTbl->addRow();
        $sigTbl->addCell(4500, $noBorderCell)->addText('Jabatan  : ..............................', $fs, $pL);
        $sigTbl->addCell(4500, $noBorderCell)->addText('Jabatan  : ' . $jabatanSci, $fs, $pL);
    }


    // =========================================================
    // PRIVATE: Extract sequence number
    // =========================================================
    private function isOracleMode(Request $request): bool
    {
        return $request->boolean('oracle_mode')
            || $request->boolean('oracle')
            || $request->query('mode') === 'oracle';
    }

    private function spModeQuery(bool $oracleMode)
    {
        $query = Sp::query();

        if ($oracleMode) {
            return $query->where('numbering_mode', 'oracle');
        }

        return $query->where(function ($query) {
            $query->whereNull('numbering_mode')
                ->orWhere('numbering_mode', 'auto');
        });
    }

    private function validateSpModeValue(Request $request, bool $oracleMode): void
    {
        $inputValue = (float) ($request->input('nilai_sp') ?: 0);
        $itemsTotal = $this->calculateItemsTotal($request->input('items', []));
        $finalValue = $inputValue > 0 ? $inputValue : $itemsTotal;

        if ($oracleMode && $finalValue <= 50000000) {
            throw ValidationException::withMessages([
                'nilai_sp' => 'Nilai SP harus di atas Rp50.000.000 karena Anda berada di mode Oracle ERP.',
            ]);
        }

        if (!$oracleMode && $finalValue > 50000000) {
            throw ValidationException::withMessages([
                'nilai_sp' => 'Nilai SP di atas Rp50.000.000 harus dibuat melalui mode Oracle ERP agar tidak tercampur dengan penomoran SP otomatis.',
            ]);
        }
    }

    private function nextAvailableAutoSequence(?int $excludeId = null, ?int $year = null): int
    {
        $year ??= now()->year;

        $usedSequences = $this->spModeQuery(false)
            ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
            ->where('nomor_sp', 'like', "%/SP/{$year}")
            ->orderBy('sequence_number')
            ->pluck('sequence_number')
            ->map(fn($seq) => (int) $seq)
            ->filter(fn($seq) => $seq > 0)
            ->unique()
            ->values();

        return $this->nextSequenceFromActiveRun($usedSequences);
    }

    private function nextSequenceFromActiveRun($usedSequences): int
    {
        $usedSequences = collect($usedSequences)->sort()->unique()->values();

        if ($usedSequences->isEmpty()) {
            return 1;
        }

        $runs = [];
        $start = (int) $usedSequences->first();
        $end = $start;

        foreach ($usedSequences->slice(1) as $seq) {
            $seq = (int) $seq;

            if ($seq === $end + 1) {
                $end = $seq;
                continue;
            }

            $runs[] = ['start' => $start, 'end' => $end, 'length' => $end - $start + 1];
            $start = $end = $seq;
        }

        $runs[] = ['start' => $start, 'end' => $end, 'length' => $end - $start + 1];

        $activeIndex = count($runs) - 1;
        $lastRun = $runs[$activeIndex];

        if ($activeIndex > 0 && $lastRun['length'] <= 25) {
            for ($i = $activeIndex - 1; $i >= 0; $i--) {
                if ($runs[$i]['length'] >= 2 || $i === 0) {
                    $activeIndex = $i;
                    break;
                }
            }
        }

        return $runs[$activeIndex]['end'] + 1;
    }

    private function replaceSequenceInNumber(string $nomor, int $seq): string
    {
        $formattedSeq = str_pad((string) $seq, 3, '0', STR_PAD_LEFT);

        return preg_replace('/^\d+/', $formattedSeq, trim($nomor)) ?: trim($nomor);
    }

    private function extractSeq(string $nomor): ?int
    {
        if (preg_match('/^(\d+)\/PKU-/', $nomor, $m))
            return (int) $m[1];
        if (preg_match('/\/(\d+)$/', $nomor, $m))
            return (int) $m[1];
        return null;
    }

    // =========================================================
    // PRIVATE: Build suggestions
    // =========================================================
    private function periodFromDate(?string $date): array
    {
        try {
            $carbon = $date ? \Carbon\Carbon::parse($date) : now();
        } catch (\Throwable) {
            $carbon = now();
        }

        $romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

        return [(int) $carbon->year, $romans[((int) $carbon->month) - 1]];
    }

    private function numberPeriodFromNomor(string $nomor, string $documentType): ?array
    {
        $documentType = preg_quote($documentType, '/');

        if (! preg_match('/^\d+\/PKU-([IVXLCDM]+)\/' . $documentType . '\/(\d{4})$/i', trim($nomor), $matches)) {
            return null;
        }

        return [
            'roman' => strtoupper($matches[1]),
            'year' => (int) $matches[2],
        ];
    }

    private function numberPeriodWarning(string $nomor, ?string $date, string $documentType): ?string
    {
        $numberPeriod = $this->numberPeriodFromNomor($nomor, $documentType);

        if (! $numberPeriod || ! $date) {
            return null;
        }

        [$year, $roman] = $this->periodFromDate($date);

        if ($numberPeriod['roman'] !== $roman || $numberPeriod['year'] !== $year) {
            return "Bulan/tahun nomor harus mengikuti tanggal dokumen: PKU-{$roman}/{$documentType}/{$year}.";
        }

        return null;
    }

    private function normalizeNumberPeriod(string $nomor, ?string $date, string $documentType): string
    {
        $numberPeriod = $this->numberPeriodFromNomor($nomor, $documentType);

        if (! $numberPeriod || ! $date) {
            return trim($nomor);
        }

        [$year, $roman] = $this->periodFromDate($date);

        return preg_replace(
            '/^(\d+\/PKU-)([IVXLCDM]+)(\/' . preg_quote($documentType, '/') . '\/)(\d{4})$/i',
            '${1}' . $roman . '${3}' . $year,
            trim($nomor)
        );
    }

    private function validateNumberPeriod(string $nomor, ?string $date, string $documentType, string $field): void
    {
        $warning = $this->numberPeriodWarning($nomor, $date, $documentType);

        if ($warning) {
            throw ValidationException::withMessages([$field => $warning]);
        }
    }

    // =========================================================
    // PRIVATE: Build suggestions
    // =========================================================
    private function buildSuggestions(string $last, int $year, string $roman): array
    {
        if (preg_match('/^(\d+)\/PKU-([A-Z]+)\/SP\/(\d+)$/', $last, $m)) {
            return [sprintf('%03d/PKU-%s/SP/%d', (int) $m[1] + 1, $roman, $year)];
        }
        return [sprintf('%03d/PKU-%s/SP/%d', 1, $roman, $year)];
    }

    // =========================================================
// PRIVATE: Render HTML inline ke TextRun (untuk sub-items)
// =========================================================
    private function renderHtmlInline($run, string $html): void
    {
        $html = trim($html);
        if ($html === '') {
            $run->addText('', []);
            return;
        }

        // Jika bukan HTML, langsung tambahkan sebagai teks biasa
        if (!$this->isHtmlContent($html)) {
            $run->addText($this->sanitizeXml($html), []);
            return;
        }

        // Parse HTML sederhana untuk inline styling
        $dom = new \DOMDocument('1.0', 'UTF-8');
        libxml_use_internal_errors(true);
        $dom->loadHTML('<?xml encoding="UTF-8"><div>' . $html . '</div>');
        libxml_clear_errors();

        $baseFs = ['size' => 11, 'name' => 'Calibri'];
        $this->renderNodeToRun($run, $dom->documentElement, $baseFs);
    }

    private function renderNodeToRun($run, \DOMNode $node, array $fs): void
    {
        foreach ($node->childNodes as $child) {
            if ($child->nodeType === XML_TEXT_NODE) {
                $text = $this->sanitizeXml(trim($child->textContent));
                if ($text !== '') {
                    $run->addText($text, $fs);
                }
                continue;
            }

            if (!($child instanceof \DOMElement))
                continue;

            $tag = strtolower($child->nodeName);

            // Skip tag yang tidak perlu di-render
            if (in_array($tag, ['div', 'p', 'span', 'body'])) {
                $this->renderNodeToRun($run, $child, $fs);
                continue;
            }

            // Inline formatting
            $childFs = $this->rtFont($fs, $child);

            if (in_array($tag, ['br'])) {
                $run->addTextBreak();
                continue;
            }

            if (in_array($tag, ['b', 'strong', 'i', 'em', 'u', 's', 'strike', 'del', 'sub', 'sup', 'font'])) {
                $this->renderNodeToRun($run, $child, $childFs);
                continue;
            }

            // Fallback: render teks biasa
            $text = $this->sanitizeXml(trim($child->textContent));
            if ($text !== '') {
                $run->addText($text, $childFs);
            }
        }
    }

    // =========================================================
    // PRIVATE: Money helpers
    // =========================================================
    private function moneyToNullableFloat($value): ?float
    {
        if ($value === null) {
            return null;
        }

        if (is_string($value) && trim($value) === '') {
            return null;
        }

        return $this->moneyToFloat($value);
    }

    private function moneyToFloat($value): float
    {
        if ($value === null || $value === '') {
            return 0.0;
        }

        if (is_int($value) || is_float($value)) {
            return (float) $value;
        }

        $value = trim((string) $value);
        if ($value === '') {
            return 0.0;
        }

        $value = preg_replace('/[^\d,\.\-]/', '', $value) ?? '';
        if ($value === '' || $value === '-') {
            return 0.0;
        }

        $dotCount = substr_count($value, '.');
        $commaCount = substr_count($value, ',');

        if ($dotCount > 0 && $commaCount > 0) {
            // Format Indonesia: 1.234.567,89
            $value = str_replace('.', '', $value);
            $value = str_replace(',', '.', $value);
        } elseif ($dotCount > 1) {
            // Format ribuan: 1.234.567.890
            $value = str_replace('.', '', $value);
        } elseif ($commaCount > 1) {
            // Format internasional ribuan: 1,234,567,890
            $value = str_replace(',', '', $value);
        } elseif ($commaCount === 1) {
            $parts = explode(',', $value);
            $decimalLength = strlen($parts[1] ?? '');
            $value = ($decimalLength === 3 && strlen(ltrim($parts[0], '-')) <= 3)
                ? str_replace(',', '', $value)
                : str_replace(',', '.', $value);
        } elseif ($dotCount === 1) {
            $parts = explode('.', $value);
            $decimalLength = strlen($parts[1] ?? '');
            if ($decimalLength === 3 && strlen(ltrim($parts[0], '-')) <= 3) {
                $value = str_replace('.', '', $value);
            }
        }

        return is_numeric($value) ? (float) $value : 0.0;
    }

    private function moneyToInt($value): int
    {
        return (int) round($this->moneyToFloat($value));
    }

    private function formatMoney($value): string
    {
        return number_format($this->moneyToFloat($value), 0, ',', '.');
    }

    // =========================================================
    // PRIVATE: Terbilang
    // =========================================================
    private function terbilang($angka): string
    {
        $angka = abs($this->moneyToInt($angka));
        $baca = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'];
        if ($angka === 0)
            return 'Nol';
        if ($angka < 12)
            return $baca[$angka];
        if ($angka < 20)
            return $this->terbilang($angka - 10) . ' Belas';
        if ($angka < 100)
            return $this->terbilang(intdiv($angka, 10)) . ' Puluh' . ($angka % 10 ? ' ' . $this->terbilang($angka % 10) : '');
        if ($angka < 200)
            return 'Seratus' . ($angka - 100 ? ' ' . $this->terbilang($angka - 100) : '');
        if ($angka < 1000)
            return $this->terbilang(intdiv($angka, 100)) . ' Ratus' . ($angka % 100 ? ' ' . $this->terbilang($angka % 100) : '');
        if ($angka < 2000)
            return 'Seribu' . ($angka - 1000 ? ' ' . $this->terbilang($angka - 1000) : '');
        if ($angka < 1000000)
            return $this->terbilang(intdiv($angka, 1000)) . ' Ribu' . ($angka % 1000 ? ' ' . $this->terbilang($angka % 1000) : '');
        if ($angka < 1000000000)
            return $this->terbilang(intdiv($angka, 1000000)) . ' Juta' . ($angka % 1000000 ? ' ' . $this->terbilang($angka % 1000000) : '');
        if ($angka < 1000000000000)
            return $this->terbilang(intdiv($angka, 1000000000)) . ' Miliar' . ($angka % 1000000000 ? ' ' . $this->terbilang($angka % 1000000000) : '');
        if ($angka < 1000000000000000)
            return $this->terbilang(intdiv($angka, 1000000000000)) . ' Triliun' . ($angka % 1000000000000 ? ' ' . $this->terbilang($angka % 1000000000000) : '');
        return (string) $angka;
    }
}
