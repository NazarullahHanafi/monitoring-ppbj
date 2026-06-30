<?php

namespace App\Http\Controllers;

use App\Models\Spph;
use App\Models\SpphItem;
use App\Models\Satuan;
use App\Models\Vendor;
use App\Models\User;
use App\Models\Ppbj;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\QueryException;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use App\Traits\HasPresence;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\Shared\Html as PhpWordHtml;
use Illuminate\Support\Str;
use PhpOffice\PhpWord\IOFactory;
use ZipArchive;

class SpphController extends Controller
{
    use HasPresence;

    protected function presenceKey(): string
    {
        return 'spph:presence';
    }

    // =========================================================
    // INDEX
    // =========================================================
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $pic = $request->get('pic', '');
        $vendorFilter = $request->get('vendor', '');
        $dari = $request->get('dari', '');
        $sampai = $request->get('sampai', '');

        $vendors = Cache::remember(
            'vendors:active',
            3600,
            fn() => Vendor::active()->orderBy('nama_vendor')->get()
        );

        $pics = Cache::remember(
            'pics:umum',
            3600,
            fn() => User::where('department', 'umum')->orderBy('name')->pluck('name')->toArray()
        );

        $satuans = Cache::remember(
            'satuans:all',
            3600,
            fn() => \App\Models\Satuan::orderBy('nama_satuan')->pluck('nama_satuan')->toArray()
        );

        $lastSpph = Cache::remember(
            'spph:last_nomor',
            300,
            fn() => Spph::select('nomor_spph', 'sequence_number')
                ->orderBy('sequence_number', 'desc')->first()
        );
        $lastNomor = $lastSpph?->nomor_spph;

        $spphs = Spph::select([
            'id',
            'nomor_spph',
            'tanggal',
            'nomor_pr',
            'nama_vendor',
            'vendor_names',
            'deskripsi_pengadaan',
            'pic',
            'sequence_number',
        ])
            ->when($search, fn($q) => $q->where(function ($q2) use ($search) {
                $q2->where('nomor_spph', 'LIKE', "%{$search}%")
                    ->orWhere('nomor_pr', 'LIKE', "%{$search}%")
                    ->orWhere('nama_vendor', 'LIKE', "%{$search}%")
                    ->orWhere('vendor_names', 'LIKE', "%{$search}%")
                    ->orWhere('deskripsi_pengadaan', 'LIKE', "%{$search}%");
            }))
            ->when($pic, fn($q) => $q->where('pic', $pic))
            ->when($vendorFilter, fn($q) => $q->where(function ($q2) use ($vendorFilter) {
                $q2->where('nama_vendor', $vendorFilter)
                    ->orWhere('vendor_names', 'LIKE', '%"'.str_replace(['\\', '"'], ['\\\\', '\"'], $vendorFilter).'"%');
            }))
            ->when($dari, fn($q) => $q->where('tanggal', '>=', $dari))
            ->when($sampai, fn($q) => $q->where('tanggal', '<=', $sampai))
            ->orderBy('sequence_number', 'desc')
            ->paginate(25)
            ->withQueryString();

        $onboardingSeen = Cache::has('spph_onboarding_' . auth()->id());

        return view('spph.index', compact(
            'vendors',
            'pics',
            'satuans',
            'spphs',
            'lastNomor',
            'search',
            'pic',
            'vendorFilter',
            'dari',
            'sampai',
            'onboardingSeen'
        ));
    }

    // =========================================================
    // PPBJ OPTIONS (Select2 AJAX)
    // =========================================================
    public function getPpbjOptions(Request $request)
    {
        $search = $request->get('q', '');

        $query = DB::table('ppbj')
            ->select(['ppbj_no', 'uraian', 'portofolio', 'buyer'])
            ->where('status', '!=', 'CANCELLED')
            ->where(function ($q) {
                $q->whereNull('spph_rfq_1')->orWhere('spph_rfq_1', '');
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
            ->select(['ppbj_no', 'status', 'spph_rfq_1', 'uraian', 'portofolio', 'buyer'])
            ->where('ppbj_no', $ppbjNo)
            ->first();

        if (!$ppbj)
            return response()->json(['status' => 'manual', 'message' => 'Nomor PR manual']);

        if ($ppbj->status === 'CANCELLED')
            return response()->json(['status' => 'cancelled', 'message' => 'PPBJ sudah di-CANCELLED!']);

        if (!empty($ppbj->spph_rfq_1))
            return response()->json([
                'status' => 'already_linked',
                'message' => "PPBJ sudah terhubung dengan SPPH: {$ppbj->spph_rfq_1}",
                'linked_spph' => $ppbj->spph_rfq_1,
            ]);

        return response()->json([
            'status' => 'available',
            'message' => 'PPBJ tersedia',
            'uraian' => $ppbj->uraian,
            'portofolio' => $ppbj->portofolio,
            'buyer' => $ppbj->buyer,
        ]);
    }

    // =========================================================
    // EXPORT CSV
    // =========================================================
    public function export(Request $request)
    {
        $search = $request->get('search', '');
        $pic = $request->get('pic', '');
        $vendorFilter = $request->get('vendor', '');
        $dari = $request->get('dari', '');
        $sampai = $request->get('sampai', '');

        $data = Spph::when($search, fn($q) => $q->where(function ($q2) use ($search) {
            $q2->where('nomor_spph', 'like', "%{$search}%")
                ->orWhere('nomor_pr', 'like', "%{$search}%")
                ->orWhere('nama_vendor', 'like', "%{$search}%")
                ->orWhere('vendor_names', 'like', "%{$search}%")
                ->orWhere('deskripsi_pengadaan', 'like', "%{$search}%");
        }))
            ->when($pic, fn($q) => $q->where('pic', $pic))
            ->when($vendorFilter, fn($q) => $q->where(function ($q2) use ($vendorFilter) {
                $q2->where('nama_vendor', $vendorFilter)
                    ->orWhere('vendor_names', 'LIKE', '%"'.str_replace(['\\', '"'], ['\\\\', '\"'], $vendorFilter).'"%');
            }))
            ->when($dari, fn($q) => $q->where('tanggal', '>=', $dari))
            ->when($sampai, fn($q) => $q->where('tanggal', '<=', $sampai))
            ->orderBy('sequence_number', 'desc')
            ->get();

        $filename = 'SPPH_' . now()->format('Ymd_His') . '.csv';
        $headers = ['No', 'Nomor SPPH', 'Tanggal', 'Nomor PR', 'Nama Vendor', 'Deskripsi Pengadaan', 'PIC'];

        $callback = function () use ($data, $headers) {
            $file = fopen('php://output', 'w');
            fprintf($file, chr(0xEF) . chr(0xBB) . chr(0xBF));
            fputcsv($file, $headers);
            foreach ($data as $i => $row) {
                fputcsv($file, \App\Support\Csv::row([
                    $i + 1,
                    $row->nomor_spph,
                    $row->tanggal?->format('d/m/Y'),
                    $row->nomor_pr,
                    implode(', ', $row->print_vendor_names),
                    $row->deskripsi_pengadaan,
                    $row->pic,
                ]));
            }
            fclose($file);
        };

        return response()->stream($callback, 200, [
            'Content-Type' => 'text/csv; charset=utf-8',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }

    // =========================================================
    // CHECK NOMOR (real-time)
    // =========================================================
    public function checkNomor(Request $request)
    {
        $nomor = trim($request->get('nomor', ''));
        $excludeId = (int) $request->get('exclude_id', 0);

        if (!$nomor)
            return response()->json(['status' => 'empty']);

        $cacheKey = 'spph:check:' . md5($nomor . ':' . $excludeId);
        return Cache::remember($cacheKey, 30, function () use ($nomor, $excludeId) {
            $exists = Spph::where('nomor_spph', $nomor)
                ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
                ->exists();

            if ($exists)
                return ['status' => 'duplicate', 'message' => "Nomor \"{$nomor}\" sudah digunakan!"];

            $seqInput = $this->extractSeq($nomor);
            $warning = null;

            if ($seqInput !== null) {
                $lastNomor = Spph::when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
                    ->orderBy('sequence_number', 'desc')->value('nomor_spph');

                if ($lastNomor) {
                    $lastSeq = $this->extractSeq($lastNomor);
                    if ($lastSeq !== null) {
                        if ($seqInput < $lastSeq + 1)
                            $warning = "Nomor ini ({$seqInput}) lebih kecil dari urutan terakhir ({$lastSeq}).";
                        elseif ($seqInput > $lastSeq + 1)
                            $warning = "Ada lompatan nomor!";
                    }
                }
            }

            return ['status' => 'ok', 'warning' => $warning];
        });
    }

    // =========================================================
    // SUGGEST NOMOR
    // =========================================================
    public function suggestNomor()
    {
        return Cache::remember('spph:suggest', 60, function () {
            $lastNomor = Spph::orderBy('sequence_number', 'desc')->value('nomor_spph');
            if (!$lastNomor)
                return ['suggestions' => ['001/PKU-' . now()->format('n') . '/SPPH/' . now()->year], 'last' => null];
            return ['suggestions' => $this->buildSuggestions($lastNomor), 'last' => $lastNomor];
        });
    }

    // =========================================================
    // POLL (real-time)
    // =========================================================
    public function poll(Request $request)
    {
        $lastId = (int) $request->get('last_id', 0);

        $rows = Spph::select(['id', 'nomor_spph', 'tanggal', 'nomor_pr', 'nama_vendor', 'vendor_names', 'deskripsi_pengadaan', 'pic'])
            ->where('id', '>', $lastId)
            ->orderBy('id')
            ->limit(50)
            ->get()
            ->map(fn($r) => [
                'id' => $r->id,
                'nomor_spph' => $r->nomor_spph,
                'tanggal' => $r->tanggal?->format('d/m/Y'),
                'nomor_pr' => $r->nomor_pr ?? '-',
                'nama_vendor' => $r->nama_vendor,
                'vendor_names' => $r->print_vendor_names,
                'vendor_label' => implode(', ', $r->print_vendor_names),
                'vendor_count' => count($r->print_vendor_names),
                'deskripsi_pengadaan' => Str::limit($r->deskripsi_pengadaan, 100),
                'pic' => $r->pic,
            ]);

        return response()->json(['rows' => $rows]);
    }

    // =========================================================
    // STORE
    // =========================================================
    public function store(Request $request)
    {
        $request->validate([
            'nomor_spph' => ['required', 'string', 'max:60', Rule::unique('spphs', 'nomor_spph')],
            'tanggal' => 'required|date',
            'nomor_pr' => ['nullable', 'string', 'max:100', Rule::unique('spphs', 'nomor_pr')],
            'nomor_pr_type' => 'nullable|in:ppbj,manual',
            'nama_vendor' => 'nullable|string|max:255',
            'vendor_names' => 'required_without:nama_vendor|array|max:20',
            'vendor_names.*' => 'nullable|string|max:255',
            'deskripsi_pengadaan' => 'required|string',
            'pic' => 'required|string|max:100',
            'vendor_baru' => 'nullable|string|max:255',
            'items' => 'nullable|array|max:20',
            'items.*.nama_barang' => 'nullable|string|max:60000',
            'items.*.satuan' => 'nullable|string|max:50',
            'items.*.jumlah' => 'nullable|string|max:50',
            'items.*.tgl_pemenuhan' => 'nullable|date',
        ]);

        $nomorPr = $request->nomor_pr ?: null;
        $nomorPrType = $request->nomor_pr_type;

        if ($nomorPr && $nomorPrType === 'ppbj') {
            $ppbj = Ppbj::where('ppbj_no', $nomorPr)->first();
            if (!$ppbj)
                return back()->withErrors(['nomor_pr' => "PPBJ \"{$nomorPr}\" tidak ditemukan!"])->withInput();
            if ($ppbj->status === 'CANCELLED')
                return back()->withErrors(['nomor_pr' => "PPBJ ini sudah di-CANCELLED!"])->withInput();
            if (!empty($ppbj->spph_rfq_1))
                return back()->withErrors(['nomor_pr' => "PPBJ sudah terhubung dengan SPPH: {$ppbj->spph_rfq_1}!"])->withInput();
        }

        try {
            return DB::transaction(function () use ($request, $nomorPr, $nomorPrType) {
            $ppbjRecord = null;

            if ($nomorPr && $nomorPrType === 'ppbj') {
                $ppbjRecord = Ppbj::where('ppbj_no', $nomorPr)->lockForUpdate()->first();

                if (!$ppbjRecord) {
                    return back()->withErrors(['nomor_pr' => "PPBJ \"{$nomorPr}\" tidak ditemukan!"])->withInput();
                }

                if ($ppbjRecord->status === 'CANCELLED') {
                    return back()->withErrors(['nomor_pr' => "PPBJ ini sudah di-CANCELLED!"])->withInput();
                }

                if (!empty($ppbjRecord->spph_rfq_1)) {
                    return back()->withErrors(['nomor_pr' => "PPBJ sudah terhubung dengan SPPH: {$ppbjRecord->spph_rfq_1}!"])->withInput();
                }
            }

            $vendorNames = $this->resolveVendorNames($request);
            $vendorName = $vendorNames[0];

            $seq = $this->extractSeq($request->nomor_spph) ?? ((int) Spph::lockForUpdate()->max('sequence_number') + 1);
            $spph = Spph::create([
                'nomor_spph' => $request->nomor_spph,
                'sequence_number' => $seq,
                'tanggal' => $request->tanggal,
                'nomor_pr' => $nomorPr,
                'nama_vendor' => $vendorName,
                'vendor_names' => $vendorNames,
                'deskripsi_pengadaan' => $request->deskripsi_pengadaan,
                'pic' => $request->pic,
            ]);

            $this->syncItems($spph, $request->input('items', []));

            if ($nomorPr && $nomorPrType === 'ppbj') {
                if ($ppbjRecord && $ppbjRecord->status !== 'CANCELLED' && empty($ppbjRecord->spph_rfq_1)) {
                    $ppbjRecord->spph_rfq_1 = $spph->nomor_spph;
                    $ppbjRecord->tgl_spph = $spph->tanggal;
                    $ppbjRecord->penyedia_eksternal = $vendorName;
                    $ppbjRecord->save();
                }
            }

            Cache::forget('spph:last_nomor');
            Cache::forget('spph:suggest');

            return redirect()->route('spph.index')->with('success', 'Data SPPH berhasil disimpan!');
            });
        } catch (QueryException $e) {
            return back()
                ->withErrors(['nomor_pr' => 'Nomor SPPH atau nomor PR sudah dipakai oleh data lain. Silakan refresh halaman dan cek data terbaru.'])
                ->withInput();
        }
    }

    // =========================================================
    // UPDATE
    // =========================================================
    public function update(Request $request, Spph $spph)
    {
        $request->validate([
            'nomor_spph' => ['required', 'string', 'max:60', Rule::unique('spphs', 'nomor_spph')->ignore($spph->id)],
            'tanggal' => 'required|date',
            'nomor_pr' => ['nullable', 'string', 'max:100', Rule::unique('spphs', 'nomor_pr')->ignore($spph->id)],
            'nomor_pr_type' => 'nullable|in:ppbj,manual',
            'nama_vendor' => 'nullable|string|max:255',
            'vendor_names' => 'required_without:nama_vendor|array|max:20',
            'vendor_names.*' => 'nullable|string|max:255',
            'deskripsi_pengadaan' => 'required|string',
            'pic' => 'required|string|max:100',
            'items' => 'nullable|array|max:20',
            'items.*.nama_barang' => 'nullable|string|max:60000',
            'items.*.satuan' => 'nullable|string|max:50',
            'items.*.jumlah' => 'nullable|string|max:50',
            'items.*.tgl_pemenuhan' => 'nullable|date',
        ]);

        $nomorPr = $request->nomor_pr ?: null;
        $nomorPrType = $request->nomor_pr_type;
        $oldNomorPr = $spph->nomor_pr;
        $oldVendorName = $spph->nama_vendor;

        if ($nomorPr && $nomorPrType === 'ppbj') {
            $ppbj = Ppbj::where('ppbj_no', $nomorPr)->first();
            if (!$ppbj)
                return back()->withErrors(['nomor_pr' => "PPBJ \"{$nomorPr}\" tidak ditemukan!"])->withInput();
            if ($ppbj->status === 'CANCELLED')
                return back()->withErrors(['nomor_pr' => "PPBJ sudah di-CANCELLED!"])->withInput();
            if (!empty($ppbj->spph_rfq_1) && $ppbj->spph_rfq_1 !== $spph->nomor_spph)
                return back()->withErrors(['nomor_pr' => "PPBJ sudah terhubung dengan SPPH: {$ppbj->spph_rfq_1}!"])->withInput();
        }

        try {
            return DB::transaction(function () use ($request, $spph, $nomorPr, $nomorPrType, $oldNomorPr, $oldVendorName) {
            $newPpbj = null;

            if ($nomorPr && $nomorPrType === 'ppbj') {
                $newPpbj = Ppbj::where('ppbj_no', $nomorPr)->lockForUpdate()->first();

                if (!$newPpbj) {
                    return back()->withErrors(['nomor_pr' => "PPBJ \"{$nomorPr}\" tidak ditemukan!"])->withInput();
                }

                if ($newPpbj->status === 'CANCELLED') {
                    return back()->withErrors(['nomor_pr' => "PPBJ sudah di-CANCELLED!"])->withInput();
                }

                if (!empty($newPpbj->spph_rfq_1) && $newPpbj->spph_rfq_1 !== $spph->nomor_spph) {
                    return back()->withErrors(['nomor_pr' => "PPBJ sudah terhubung dengan SPPH: {$newPpbj->spph_rfq_1}!"])->withInput();
                }
            }

            $vendorNames = $this->resolveVendorNames($request);
            $vendorName = $vendorNames[0];
            $seq = $this->extractSeq($request->nomor_spph) ?? $spph->sequence_number;

            $spph->update([
                'nomor_spph' => $request->nomor_spph,
                'sequence_number' => $seq,
                'tanggal' => $request->tanggal,
                'nomor_pr' => $nomorPr,
                'nama_vendor' => $vendorName,
                'vendor_names' => $vendorNames,
                'deskripsi_pengadaan' => $request->deskripsi_pengadaan,
                'pic' => $request->pic,
            ]);

            $this->syncItems($spph, $request->input('items', []));

            if ($oldNomorPr && ($oldNomorPr !== $nomorPr || $nomorPrType !== 'ppbj')) {
                $oldPpbj = Ppbj::where('ppbj_no', $oldNomorPr)
                    ->where('spph_rfq_1', $spph->nomor_spph)->first();
                if ($oldPpbj) {
                    $oldPpbj->spph_rfq_1 = null;
                    $oldPpbj->tgl_spph = null;
                    if (trim((string) $oldPpbj->penyedia_eksternal) === trim((string) $oldVendorName)) {
                        $oldPpbj->penyedia_eksternal = null;
                    }
                    $oldPpbj->save();
                }
            }

            if ($nomorPr && $nomorPrType === 'ppbj') {
                if ($newPpbj && $newPpbj->status !== 'CANCELLED') {
                    $newPpbj->spph_rfq_1 = $spph->nomor_spph;
                    $newPpbj->tgl_spph = $spph->tanggal;
                    $newPpbj->penyedia_eksternal = $vendorName;
                    $newPpbj->save();
                }
            }

            Cache::forget('spph:last_nomor');
            Cache::forget('spph:suggest');

            return redirect()->route('spph.index')->with('success', 'Data SPPH berhasil diperbarui!');
            });
        } catch (QueryException $e) {
            return back()
                ->withErrors(['nomor_pr' => 'Nomor SPPH atau nomor PR sudah dipakai oleh data lain. Silakan refresh halaman dan cek data terbaru.'])
                ->withInput();
        }
    }

    // =========================================================
    // DESTROY
    // =========================================================
    public function destroy(Spph $spph)
    {
        DB::transaction(function () use ($spph) {
            if ($spph->nomor_pr) {
                $ppbj = Ppbj::where('ppbj_no', $spph->nomor_pr)
                    ->where('spph_rfq_1', $spph->nomor_spph)->first();
                if ($ppbj) {
                    $ppbj->spph_rfq_1 = null;
                    $ppbj->tgl_spph = null;
                    if (trim((string) $ppbj->penyedia_eksternal) === trim((string) $spph->nama_vendor)) {
                        $ppbj->penyedia_eksternal = null;
                    }
                    $ppbj->save();
                }
            }
            $spph->delete();
            Cache::forget('spph:last_nomor');
            Cache::forget('spph:suggest');
        });

        return redirect()->route('spph.index')->with('success', 'Data SPPH berhasil dihapus!');
    }

    // =========================================================
    // GET ITEMS (API for edit modal)
    // =========================================================
    public function getItems(Spph $spph)
    {
        return response()->json(
            $spph->items()
                ->select(['id', 'urutan', 'nama_barang', 'satuan', 'jumlah', 'tgl_pemenuhan'])
                ->orderBy('urutan')
                ->get()
                ->map(fn(SpphItem $item) => [
                    'id' => $item->id,
                    'urutan' => $item->urutan,
                    'nama_barang' => $this->sanitizeRichText($item->nama_barang),
                    'satuan' => $item->satuan,
                    'jumlah' => $item->jumlah,
                    'tgl_pemenuhan' => $item->tgl_pemenuhan
                        ? \Carbon\Carbon::parse($item->tgl_pemenuhan)->format('Y-m-d')
                        : null,
                ])
        );
    }

    // =========================================================
    // ADD VENDOR (legacy)
    // =========================================================
    public function addVendor(Request $request)
    {
        $request->validate(['nama_vendor' => 'required|string|max:255|unique:vendors,nama_vendor']);
        $vendor = Vendor::create(['nama_vendor' => trim($request->nama_vendor)]);
        return response()->json(['success' => true, 'vendor' => $vendor]);
    }

    // =========================================================
    // CETAK SPPH → WORD
    // =========================================================
    public function cetakSpph(Request $request, Spph $spph)
    {
        Settings::setOutputEscapingEnabled(true);
        $spph->load('items');
        $printVendorName = $this->resolvePrintVendorName($spph, $request->query('vendor'));

        $phpWord = new PhpWord();
        $phpWord->setDefaultFontName('Arial');
        $phpWord->setDefaultFontSize(9);
        $phpWord->setDefaultParagraphStyle(['spaceAfter' => 0, 'spaceBefore' => 0]);

        $pBoth = ['spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0, 'alignment' => 'both'];
        $p0 = ['spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0];
        $pC = ['spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.0, 'alignment' => 'center'];

        $fn = ['size' => 9, 'name' => 'Arial'];
        $fb = ['size' => 9, 'name' => 'Arial', 'bold' => true];
        $fbu = ['size' => 9, 'name' => 'Arial', 'bold' => true, 'underline' => 'single'];
        $fsm = ['size' => 8, 'name' => 'Arial'];

        $noBdr = [
            'top' => ['borderSize' => 0, 'borderColor' => 'FFFFFF', 'space' => 0],
            'bottom' => ['borderSize' => 0, 'borderColor' => 'FFFFFF', 'space' => 0],
            'left' => ['borderSize' => 0, 'borderColor' => 'FFFFFF', 'space' => 0],
            'right' => ['borderSize' => 0, 'borderColor' => 'FFFFFF', 'space' => 0],
        ];
        $noBdrTbl = ['borderSize' => 0, 'borderColor' => 'FFFFFF', 'cellMargin' => [0, 60, 0, 60]];

        $section = $phpWord->addSection([
            'pageSizeW' => 11906,
            'pageSizeH' => 16838,
            'marginTop' => 1900,
            'marginBottom' => 1100,
            'marginLeft' => 1320,
            'marginRight' => 1320,
            'headerHeight' => 1440,
            'footerHeight' => 0,
        ]);

        try {
            $tgl = $spph->tanggal
                ? \Carbon\Carbon::parse($spph->tanggal)->locale('id')->translatedFormat('d F Y')
                : now()->locale('id')->translatedFormat('d F Y');
        } catch (\Throwable $e) {
            $tgl = now()->locale('id')->translatedFormat('d F Y');
        }

        // ── Nomor & Tanggal ──
        $t1 = $section->addTable($noBdrTbl);
        $t1->addRow();
        $t1->addCell(1458, ['borders' => $noBdr])->addText('Nomor SPPH', $fn, $p0);
        $t1->addCell(360, ['borders' => $noBdr])->addText(':', $fn, $p0);
        $t1->addCell(7758, ['borders' => $noBdr])->addText($spph->nomor_spph, $fn, $p0);
        $t1->addRow();
        $t1->addCell(1458, ['borders' => $noBdr])->addText('Tanggal', $fn, $p0);
        $t1->addCell(360, ['borders' => $noBdr])->addText(':', $fn, $p0);
        $t1->addCell(7758, ['borders' => $noBdr])->addText($tgl, $fn, $p0);

        $section->addTextBreak(1, $p0);

        $vendor = Vendor::where('nama_vendor', $printVendorName)->first();
        $alamat = ($vendor && $vendor->alamat) ? $vendor->alamat : '-';
        $telp = ($vendor && $vendor->telepon) ? $vendor->telepon : '-';
        $fax = ($vendor && $vendor->fax) ? $vendor->fax : '-';
        $email = ($vendor && $vendor->email) ? $vendor->email : '-';

        $section->addText('Kepada Yth,', $fn, $pBoth);
        $section->addText($printVendorName, $fb, $pBoth);
        foreach (explode("\n", $alamat) as $baris) {
            if (trim($baris))
                $section->addText(trim($baris), $fn, $pBoth);
        }
        $section->addTextBreak(1, $p0);

        $t2 = $section->addTable($noBdrTbl);
        foreach ([['Telp', $telp], ['Fax.', $fax], ['Email', $email]] as [$label, $val]) {
            $t2->addRow();
            $t2->addCell(1098, ['borders' => $noBdr])->addText($label, $fn, $p0);
            $t2->addCell(360, ['borders' => $noBdr])->addText(':', $fn, $pC);
            $t2->addCell(8118, ['borders' => $noBdr])->addText($val, $fn, $pBoth);
            $t2->addCell(8118, ['borders' => $noBdr])->addText('', $fn, $p0);
        }

        $section->addTextBreak(1, $p0);
        $section->addText('Dengan Hormat,', $fn, $pBoth);
        $section->addTextBreak(1, $p0);

        $prRun = $section->addTextRun($pBoth);
        $prRun->addText('Perihal  : ', $fn);
        $prRun->addText('Surat Permintaan Penawaran Harga (SPPH) ' . $spph->deskripsi_pengadaan, $fbu);

        $section->addTextBreak(1, $p0);
        $section->addText(
            'Bersama ini kami sampaikan Permintaan Penawaran Harga dari Perusahaan Saudara atas barang/pekerjaan yang akan kami adakan sebagaimana terinci dalam uraian barang/pekerjaan berikut:',
            $fn,
            $pBoth
        );
        $section->addTextBreak(1, $p0);

        $items = $spph->items;

        $tblStyle = ['borderSize' => 4, 'borderColor' => '000000', 'cellMargin' => [40, 60, 40, 60]];
        $vMid = ['valign' => 'center'];
        $pTblC = ['spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.15, 'alignment' => 'center'];
        $pTblL = ['spaceAfter' => 0, 'spaceBefore' => 0, 'lineHeight' => 1.15, 'alignment' => 'left'];
        $hdrTbl = ['size' => 9, 'name' => 'Arial', 'bold' => true];
        $celTbl = ['size' => 9, 'name' => 'Arial'];
        $numTbl = ['size' => 9, 'name' => 'Arial', 'bold' => true];

        $tbl = $section->addTable($tblStyle);

        // Header Row
        $tbl->addRow();
        $tbl->addCell(558, $vMid)->addText('No.', $hdrTbl, $pTblC);
        $tbl->addCell(5374, $vMid)->addText('Nama Barang / Jasa', $hdrTbl, $pTblC);
        $tbl->addCell(992, $vMid)->addText('Satuan', $hdrTbl, $pTblC);
        $tbl->addCell(880, $vMid)->addText('Jumlah', $hdrTbl, $pTblC);
        $tbl->addCell(1772, $vMid)->addText('Tgl. Pemenuhan', $hdrTbl, $pTblC);

        // Data Rows
        if ($items->isEmpty()) {
            $tbl->addRow();
            $tbl->addCell(558, $vMid)->addText('1', $numTbl, $pTblC);
            $this->renderHtmlToCell($tbl->addCell(5374, $vMid), $spph->deskripsi_pengadaan, $pTblL);
            $tbl->addCell(992, $vMid)->addText('-', $celTbl, $pTblC);
            $tbl->addCell(880, $vMid)->addText('-', $celTbl, $pTblC);
            $tbl->addCell(1772, $vMid)->addText('-', $celTbl, $pTblC);
        } else {
            $no = 1;
            foreach ($items as $item) {
                $tbl->addRow();
                $tbl->addCell(558, $vMid)->addText((string) $no++, $numTbl, $pTblC);
                $this->renderHtmlToCell($tbl->addCell(5374, $vMid), $item->nama_barang, $pTblL);
                $tbl->addCell(992, $vMid)->addText($item->satuan ?? '-', $celTbl, $pTblC);
                $tbl->addCell(880, $vMid)->addText($item->jumlah ?? '-', $celTbl, $pTblC);
                try {
                    $tglPem = $item->tgl_pemenuhan
                        ? \Carbon\Carbon::parse($item->tgl_pemenuhan)->locale('id')->translatedFormat('d F Y')
                        : '-';
                } catch (\Throwable $e) {
                    $tglPem = '-';
                }
                $tbl->addCell(1772, $vMid)->addText($tglPem, $celTbl, $pTblC);
            }
        }

        $section->addTextBreak(1, $p0);
        $section->addText(
            'Untuk Kelancaran Proses Pengadaan, Kami harapkan Penawaran Harga Saudara dapat dibawa langsung dalam amplop tertutup sesuai dengan Penawaraan Harga yang terdapat dalam lampiran, oleh pejabat yang berwenang, untuk dilakukan Klarifikasi Teknis dan Negosiasi Harga di alamat :',
            $fn,
            $pBoth
        );
        $section->addTextBreak(1, $p0);
        $section->addTextRun($pBoth)->addText('PT. SUPERINTENDING COMPANY OF INDONESIA - Fungsi UMUM', $fb);
        $section->addTextRun($pBoth)->addText('JL. Jend. A. Yani No. 79 Pekanbaru', $fb);
        $section->addTextRun($pBoth)->addText('Telp: 0761-36042, 37759, 35681', $fb);
        $section->addTextBreak(1, $p0);

        $section->addText('Dengan Menyebutkan :', $fn, $pBoth);
        foreach ([
            '1. Masa berlaku dan Surat Penawaran Harga ditandatangani oleh pejabat yang berwenang',
            '2. Jangka Waktu Pemenuhan (sebutkan.......hari kerja/....... Minggu/dll)',
            '3. Penawaran Harga dalam Mata Uang Rupiah',
            '4. Pembayaran (..............hari kalender)',
            '5. Jangka Waktu Penawaran Harga (minimal 7 hari kerja)',
            '6. Wajib melampirkan COPY TDEP dari PT SUCOFINDO (Persero) yang terbaru',
        ] as $klausul) {
            $section->addText($klausul, $fn, $pBoth);
        }

        $section->addTextBreak(1, $p0);
        $section->addText(
            'Apabila Saudara tidak sanggup/tidak menyampaikan penawaran harga tanpa memberikan konfirmasi tertulis sebanyak 3 (tiga) kali, maka Perusahaan Saudara tidak akan diikutsertakan pada pengadaan berikutnya.',
            $fn,
            $pBoth
        );

        $ttd = $section->addTable($noBdrTbl);
        $ttd->addRow();
        $ttd->addCell(4788, ['borders' => $noBdr])->addText('PT SUPERINTENDING COMPANY OF INDONESIA', $fb, $p0);
        for ($i = 0; $i < 6; $i++) {
            $ttd->addRow();
            $ttd->addCell(4788, ['borders' => $noBdr])->addText('', $fn, $p0);
        }
        $ttd->addRow();
        $ttd->addCell(4788, ['borders' => $noBdr])
            ->addText('Jumelda', ['size' => 9, 'name' => 'Arial', 'bold' => true, 'underline' => 'single'], $p0);
        $ttd->addRow();
        $ttd->addCell(4788, ['borders' => $noBdr])->addText('Pj. Kepala Bidang Dukungan Bisnis', $fb, $p0);

        $section->addTextBreak(1, $p0);
        $section->addText('Catatan : *) Pilih yang digunakan', $fsm, $pBoth);

        // Nama file
        $cleanDesc = preg_replace('/[\r\n]+/', ' ', $spph->deskripsi_pengadaan);
        $cleanDesc = preg_replace('/[^A-Za-z0-9\s\-]/', '', $cleanDesc);
        $cleanDesc = trim(preg_replace('/\s+/', ' ', $cleanDesc));
        $shortDesc = strlen($cleanDesc) > 40 ? substr($cleanDesc, 0, 40) : $cleanDesc;
        $cleanVendor = preg_replace('/[^A-Za-z0-9\s\-]/', '', $printVendorName);
        $cleanVendor = trim(preg_replace('/\s+/', ' ', $cleanVendor));
        $shortVendor = $cleanVendor ? ' - ' . (strlen($cleanVendor) > 30 ? substr($cleanVendor, 0, 30) : $cleanVendor) : '';
        $filename = 'Surat Permintaan Penawaran Harga ' . $shortDesc . $shortVendor . '.docx';
        $tempPath = storage_path('app/spph_' . $spph->id . '_' . Str::random(8) . '.docx');

        IOFactory::createWriter($phpWord, 'Word2007')->save($tempPath);

        $imagePath = public_path('images/kop-surat-sp.jpg');
        $imagePath2 = public_path('images/kop-surat-sp2.jpg');
        if (file_exists($imagePath)) {
            $this->injectHeaderWatermark(
                $tempPath,
                $imagePath,
                file_exists($imagePath2) ? $imagePath2 : null,
                1700,
                0,
                595.3,
                841.9
            );
        }

        return response()->download($tempPath, $filename)->deleteFileAfterSend(true);
    }

    public function cetakSemuaVendor(Request $request, Spph $spph)
    {
        $spph->load('items');
        $vendors = $spph->print_vendor_names;

        if (count($vendors) <= 1) {
            return $this->cetakSpph($request, $spph);
        }

        $zipName = $this->safeDownloadName('SPPH ' . $spph->nomor_spph . ' - Semua Vendor.zip');
        $zipPath = storage_path('app/spph_all_' . $spph->id . '_' . Str::random(8) . '.zip');

        if (! class_exists(ZipArchive::class)) {
            abort(500, 'Ekstensi ZIP belum aktif di server.');
        }

        $zip = new ZipArchive();

        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            abort(500, 'Gagal membuat file ZIP SPPH.');
        }

        $tempFiles = [];
        foreach ($vendors as $vendorName) {
            $vendorRequest = Request::create($request->path(), 'GET', ['vendor' => $vendorName]);
            $response = $this->cetakSpph($vendorRequest, $spph);
            $filePath = $response->getFile()->getPathname();
            $entryName = $this->safeDownloadName('SPPH ' . $spph->nomor_spph . ' - ' . $vendorName . '.docx');

            if (is_file($filePath)) {
                $zip->addFile($filePath, $entryName);
                $tempFiles[] = $filePath;
            }
        }

        $zip->close();

        foreach ($tempFiles as $filePath) {
            @unlink($filePath);
        }

        return response()->download($zipPath, $zipName)->deleteFileAfterSend(true);
    }

    // =========================================================
    // PRIVATE: Sanitize untuk XML 1.0 — buang karakter ilegal
    // =========================================================
    private function sanitizeXml(string $text): string
    {
        // Pastikan UTF-8 valid dulu
        $text = mb_convert_encoding($text, 'UTF-8', 'UTF-8');
        $clean = preg_replace('/[^\x09\x0A\x0D\x20-\x{D7FF}\x{E000}-\x{FFFD}]/u', '', $text);
        return ($clean !== null) ? $clean : $text;
    }

    // =========================================================
    // PRIVATE: Bersihkan HTML sebelum masuk parser Word
    // Hapus CSS yang tidak dikenal agar parser tidak tersedak
    // =========================================================
    private function prepareHtmlForWord(string $html): string
    {
        if ($html === '')
            return '';

        // 1. Normalize line endings
        $html = str_replace(["\r\n", "\r"], "\n", $html);

        // 2. Ganti &nbsp; dengan spasi biasa — PhpWord sering gagal parse entity ini
        $html = str_replace(['&nbsp;', "\xc2\xa0"], ' ', $html);

        // 3. Hapus zero-width dan karakter invisible lain
        $html = preg_replace('/[\x{00AD}\x{200B}-\x{200D}\x{FEFF}]/u', '', $html) ?? $html;

        // 4. Pada atribut style: simpan hanya properti yang aman untuk Word
        $html = preg_replace_callback('/\sstyle="([^"]*)"/i', function ($m) {
            $kept = [];
            foreach (explode(';', $m[1]) as $prop) {
                $prop = trim($prop);
                if ($prop === '')
                    continue;
                // Hanya properti tipografi dasar
                if (preg_match('/^(font-weight|font-style|text-decoration|color|font-size|font-family|text-align)\s*:/i', $prop)) {
                    $kept[] = $prop;
                }
            }
            return $kept ? ' style="' . implode('; ', $kept) . '"' : '';
        }, $html) ?? $html;

        // 5. Hapus atribut class, id, data-*, onclick, dll — tidak relevan untuk Word
        $html = preg_replace('/\s(class|id|data-[a-z\-]+|on[a-z]+)="[^"]*"/i', '', $html) ?? $html;

        // 6. Pastikan semua karakter valid untuk XML
        $html = $this->sanitizeXml($html);

        return $html;
    }

    private function isHtmlContent(string $text): bool
    {
        // Jika mengandung tag HTML yang umum, anggap HTML
        return (bool) preg_match('/<(b|strong|i|em|u|s|strike|del|sub|sup|span|font|div|p|br|ol|ul|li|h[1-6])\b[^>]*>/i', $text);
    }

    // =========================================================
    // PRIVATE: Render HTML ke sel tabel Word
    // Gunakan PhpWord\Shared\Html (built-in, battle-tested)
    // dengan fallback ke plain text apabila gagal
    // =========================================================

    private function renderPlainTextToCell($cell, string $text, array $paraStyle): void
    {
        $lines = explode("\n", str_replace(["\r\n", "\r"], "\n", $text));
        foreach ($lines as $line) {
            $line = $this->sanitizeXml(trim($line));
            // Baris kosong tetap ditulis sebagai paragraf kosong (jaga spasi antar baris)
            $cell->addText($line !== '' ? $line : '', ['size' => 9, 'name' => 'Arial'], $paraStyle);
        }
    }

    private function renderHtmlToCell($cell, string $html, array $paraStyle): void
    {
        $html = trim($html);
        if ($html === '' || trim(strip_tags($html)) === '')
            return;

        // Plain text (tanpa tag HTML) → render per baris (paling aman & cepat)
        if (!$this->isHtmlContent($html)) {
            $this->renderPlainTextToCell($cell, $html, $paraStyle);
            return;
        }

        // HTML → renderer manual (DOM). loadHTML tidak melempar dan
        // penulisan hanya via addText, sehingga aman dari kegagalan parsial.
        try {
            $this->renderHtmlManual($cell, $this->prepareHtmlForWord($html), $paraStyle);
            return;
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning('renderHtmlToCell: ' . $e->getMessage());
        }

        // Safety net (sangat jarang tercapai): jatuhkan ke plain text
        $plain = $this->sanitizeXml(
            trim(strip_tags(html_entity_decode($html, ENT_QUOTES | ENT_HTML5, 'UTF-8')))
        );
        if ($plain !== '')
            $this->renderPlainTextToCell($cell, $plain, $paraStyle);
    }


    // =========================================================
    // PRIVATE: Manual HTML → Word (fallback sederhana)
    // Support: b/strong, i/em, u, s, br, p, div, ul/ol/li
    // List ul/ol dirender sebagai LIST ASLI Word (bisa diedit di Word)
    // =========================================================
    private function renderHtmlManual($cell, string $html, array $paraStyle): void
    {
        $dom = new \DOMDocument('1.0', 'UTF-8');
        libxml_use_internal_errors(true);
        $dom->loadHTML('<?xml encoding="UTF-8"><html><body><div id="__root__">'
            . $html . '</div></body></html>');
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

        $baseFn = ['size' => 9, 'name' => 'Arial'];
        $lines = $this->htmlToLines($root, $baseFn, null);

        foreach ($lines as $line) {
            $ps = $paraStyle;
            if (!empty($line['align']))
                $ps = array_merge($ps, ['alignment' => $line['align']]);

            $parts = $line['parts'];
            $prefix = $line['prefix'] ?? '';
            $listType = $line['list'] ?? null; // 'ul' | 'ol' | null

            if (empty($parts) && $prefix === '' && $listType === null)
                continue;

            // ── List item: paragraf dengan hanging indent + marker manual ──
            // (meniru tampilan editor: bullet/nomor menjorok, baris ke-2+ sejajar teks)
            if ($listType !== null) {
                $marker = ($prefix !== '') ? $prefix : '•';
                // left 320 twip (~0.22"), hanging 220 → marker di kiri, teks rata.
                // Tanpa tab (tab tidak andal utk teks tanpa spasi); pakai spasi tetap.
                $lps = array_merge($ps, [
                    'indentation' => ['left' => 320, 'hanging' => 220],
                ]);
                $run = $cell->addTextRun($lps);
                // marker + 1 spasi non-breaking agar marker & teks selalu menempel rapi
                $run->addText($marker . ' ', $baseFn);
                foreach ($parts as $p) {
                    if ($p['text'] !== '')
                        $run->addText($p['text'], $p['fs']);
                }
                continue;
            }

            // ── Paragraf biasa ──
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
            // Text node
            if ($child->nodeType === XML_TEXT_NODE) {
                $t = $this->sanitizeXml($child->textContent);
                if ($t !== '')
                    $cur['parts'][] = ['text' => $t, 'fs' => $fs];
                continue;
            }
            if (!($child instanceof \DOMElement))
                continue;

            $tag = strtolower($child->nodeName);

            // <br> → pindah baris
            if ($tag === 'br') {
                $flush();
                continue;
            }

            // <ul>/<ol> → tiap <li> jadi list item (paragraf indent + marker)
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
                        // baris pertama jadi list item; sisanya paragraf lanjutan
                        $liLines[0]['list'] = $listType;
                        $liLines[0]['prefix'] = $marker;
                        foreach ($liLines as $ll)
                            $lines[] = $ll;
                    }
                }
                continue;
            }

            // Block lain (div, p, h*, li, blockquote) → rekursi jadi baris-baris sendiri
            if (in_array($tag, $blockTags)) {
                $flush();
                $ba = $this->rtAlign($child);
                $blkAlign = $ba ? $this->normalizeAlign($ba) : $align;
                foreach ($this->htmlToLines($child, $fs, $blkAlign) as $cl)
                    $lines[] = $cl;
                continue;
            }

            // Inline (b, i, u, s, span, font, a, sub, sup, ...) → gabung ke baris berjalan
            $cf = $this->rtFont($fs, $child);
            $inlineLines = $this->htmlToLines($child, $cf, $cur['align']);
            if (count($inlineLines) <= 1) {
                if (!empty($inlineLines))
                    foreach ($inlineLines[0]['parts'] as $p)
                        $cur['parts'][] = $p;
            } else {
                // jarang: inline berisi block — baris pertama gabung, sisanya baris baru
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

    // =========================================================
    // PRIVATE: Merge font style dari tag HTML
    // =========================================================
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

            if (preg_match('/color\s*:\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i', $css, $m))
                $s['color'] = sprintf('%02X%02X%02X', $m[1], $m[2], $m[3]);

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

    // =========================================================
    // PRIVATE: Parse alignment dari DOMElement
    // =========================================================
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

    // =========================================================
    // PRIVATE: Inject kop surat sebagai header Word
    // =========================================================
    private function injectHeaderWatermark(
        string $docxPath,
        string $imagePath,
        ?string $imagePath2 = null,
        int $headerHeightTwips = 1440,
        float $logoShiftPt = -8,
        float $shapeWidthPt = 595.2,
        float $shapeHeightPt = 841.9
    ): void {
        if (!file_exists($docxPath) || filesize($docxPath) === 0)
            return;
        if (!file_exists($imagePath))
            return;
        if (filesize($imagePath) > 2 * 1024 * 1024)
            return;

        // ── Kerja di file temp, bukan file asli langsung ──
        $tempPath = $docxPath . '.tmp_' . uniqid();
        if (!copy($docxPath, $tempPath))
            return;

        $zip = new ZipArchive();
        if ($zip->open($tempPath, ZipArchive::CREATE) !== true) {
            @unlink($tempPath);
            return;
        }

        $ext = strtolower(pathinfo($imagePath, PATHINFO_EXTENSION)) ?: 'jpg';
        $mediaName = 'kop_surat.' . $ext;

        // ── Builder XML header dengan namespace LENGKAP ──
        $makeHeader = function (string $rId, string $shapeId) use ($logoShiftPt, $shapeWidthPt, $shapeHeightPt): string {
            $style = implode(';', [
                'position:absolute',
                'margin-left:0',
                'margin-top:' . $logoShiftPt . 'pt',
                'width:' . $shapeWidthPt . 'pt',
                'height:' . $shapeHeightPt . 'pt',
                'z-index:-251657216',
                'mso-position-horizontal:left',
                'mso-position-horizontal-relative:page',
                'mso-position-vertical:top',
                'mso-position-vertical-relative:page',
            ]);

            return <<<XML
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:hdr xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
       xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
       xmlns:o="urn:schemas-microsoft-com:office:office"
       xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
       xmlns:v="urn:schemas-microsoft-com:vml"
       xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
       xmlns:w10="urn:schemas-microsoft-com:office:word"
       xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
       xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
       mc:Ignorable="w14">
  <w:p>
    <w:pPr>
      <w:pStyle w:val="Header"/>
      <w:spacing w:before="0" w:after="0"/>
    </w:pPr>
    <w:r>
      <w:rPr><w:noProof/></w:rPr>
      <w:pict>
        <v:shapetype id="_x0000_t75" coordsize="21600,21600" o:spt="75"
            o:preferrelative="f" path="m@4@5l@4@11@9@11@9@5xe" filled="f" stroked="f">
          <v:stroke joinstyle="miter"/>
          <v:formulas>
            <v:f eqn="if lineDrawn pixelLineWidth 0"/>
            <v:f eqn="sum @0 1 0"/>
            <v:f eqn="sum 0 0 @1"/>
            <v:f eqn="prod @2 1 2"/>
            <v:f eqn="prod @3 21600 pixelWidth"/>
            <v:f eqn="prod @3 21600 pixelHeight"/>
            <v:f eqn="sum @0 0 1"/>
            <v:f eqn="prod @6 1 2"/>
            <v:f eqn="prod @7 21600 pixelWidth"/>
            <v:f eqn="sum @8 21600 0"/>
            <v:f eqn="prod @7 21600 pixelHeight"/>
            <v:f eqn="sum @10 21600 0"/>
          </v:formulas>
          <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect"/>
          <o:lock v:ext="edit" aspectratio="f"/>
        </v:shapetype>
        <v:shape id="{$shapeId}" type="#_x0000_t75" style="{$style}" o:allowincell="f">
          <v:stroke on="f"/>
          <v:fill on="f"/>
          <v:imagedata r:id="{$rId}" o:title="kop"/>
        </v:shape>
      </w:pict>
    </w:r>
  </w:p>
</w:hdr>
XML;
        };

        $makeRels = fn(string $target) =>
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' . "\n"
            . '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            . '<Relationship Id="rId1"'
            . ' Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image"'
            . ' Target="media/' . $target . '"/>'
            . '</Relationships>';

        $success = false;

        try {
            // ── 1. Tambah gambar ──
            $imgData = file_get_contents($imagePath);
            if ($imgData === false)
                throw new \RuntimeException('Cannot read image');

            // Hapus dulu kalau sudah ada (cegah duplikat entry di ZIP)
            $zip->deleteName('word/media/' . $mediaName);
            $zip->addFromString('word/media/' . $mediaName, $imgData);

            // ── 2. Setup gambar halaman 2 ──
            $hasPage2 = $imagePath2 && file_exists($imagePath2)
                && filesize($imagePath2) > 0
                && filesize($imagePath2) <= 2 * 1024 * 1024;
            $ext2 = $hasPage2 ? (strtolower(pathinfo($imagePath2, PATHINFO_EXTENSION)) ?: 'jpg') : $ext;
            $mediaName2 = $hasPage2 ? ('kop_surat2.' . $ext2) : $mediaName;

            if ($hasPage2) {
                $img2 = file_get_contents($imagePath2);
                if ($img2 !== false) {
                    $zip->deleteName('word/media/' . $mediaName2);
                    $zip->addFromString('word/media/' . $mediaName2, $img2);
                } else {
                    $hasPage2 = false;
                    $mediaName2 = $mediaName;
                    $ext2 = $ext;
                }
            }

            // ── 3. Tambah header XML ──
            $zip->deleteName('word/header1.xml');
            $zip->deleteName('word/header2.xml');
            $zip->deleteName('word/_rels/header1.xml.rels');
            $zip->deleteName('word/_rels/header2.xml.rels');

            $zip->addFromString('word/header1.xml', $makeHeader('rId1', 'KopH1'));
            $zip->addFromString('word/header2.xml', $makeHeader('rId1', 'KopH2'));
            $zip->addFromString('word/_rels/header1.xml.rels', $makeRels($mediaName));
            $zip->addFromString('word/_rels/header2.xml.rels', $makeRels($mediaName2));

            // ── 4. Patch document.xml.rels ──
            $docRelsPath = 'word/_rels/document.xml.rels';
            $docRels = $zip->getFromName($docRelsPath);
            if ($docRels === false)
                throw new \RuntimeException('Cannot read document.xml.rels');

            preg_match_all('/Id="rId(\d+)"/', $docRels, $m);
            $maxNum = empty($m[1]) ? 0 : (int) max($m[1]);

            // Ambil rId existing kalau header sudah pernah di-inject
            if (preg_match('/Id="(rId\d+)"[^>]+Target="header1\.xml"/', $docRels, $mx)) {
                $rIdFirst = $mx[1];
            } else {
                $rIdFirst = 'rId' . ($maxNum + 1);
                $maxNum++;
            }

            if (preg_match('/Id="(rId\d+)"[^>]+Target="header2\.xml"/', $docRels, $mx)) {
                $rIdDefault = $mx[1];
            } else {
                $rIdDefault = 'rId' . ($maxNum + 1);
            }

            // Hapus entry header lama kalau ada, tambah ulang
            $docRels = preg_replace('/<Relationship[^>]+Target="header[12]\.xml"[^>]*\/>\s*/i', '', $docRels);
            $newRelEntries =
                '<Relationship Id="' . $rIdFirst . '"'
                . ' Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header"'
                . ' Target="header1.xml"/>'
                . '<Relationship Id="' . $rIdDefault . '"'
                . ' Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header"'
                . ' Target="header2.xml"/>';
            $docRels = str_replace('</Relationships>', $newRelEntries . '</Relationships>', $docRels);
            $zip->addFromString($docRelsPath, $docRels);

            // ── 5. Patch document.xml ──
            $docXml = $zip->getFromName('word/document.xml');
            if ($docXml === false || $docXml === '')
                throw new \RuntimeException('Cannot read document.xml');

            // Pastikan namespace r ada di root
            if (strpos($docXml, 'xmlns:r=') === false) {
                $docXml = preg_replace(
                    '/(<w:document\b[^>]*)(>)/s',
                    '$1 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"$2',
                    $docXml,
                    1
                );
            }

            // ── Patch sectPr terakhir saja ──
            // Strategi: ambil posisi </w:sectPr> terakhir, lalu ambil konten sectPr-nya,
            // hapus headerReference & titlePg lama kalau ada, sisipkan yang baru
            $lastEnd = strrpos($docXml, '</w:sectPr>');
            if ($lastEnd === false)
                throw new \RuntimeException('No </w:sectPr> found');

            // Cari <w:sectPr yang matching (cari dari awal hingga $lastEnd)
            $sectPrStart = strrpos(substr($docXml, 0, $lastEnd), '<w:sectPr');
            if ($sectPrStart === false)
                throw new \RuntimeException('No <w:sectPr found');

            $beforeSectPr = substr($docXml, 0, $sectPrStart);
            $sectPrFull = substr($docXml, $sectPrStart, ($lastEnd + strlen('</w:sectPr>')) - $sectPrStart);
            $afterSectPr = substr($docXml, $lastEnd + strlen('</w:sectPr>'));

            // Hapus headerReference & titlePg lama dari sectPr ini
            $sectPrFull = preg_replace('/<w:headerReference\b[^>]*\/>\s*/i', '', $sectPrFull);
            $sectPrFull = preg_replace('/<w:footerReference\b[^>]*\/>\s*/i', '', $sectPrFull); // jangan hapus footer ref
            $sectPrFull = preg_replace('/<w:titlePg\/>\s*/i', '', $sectPrFull);
            $sectPrFull = preg_replace('/<w:headerHeight\b[^>]*\/>\s*/i', '', $sectPrFull);

            // Sisipkan elemen baru di awal isi sectPr (setelah tag pembuka)
            // Urutan OOXML: headerReference → pgSz → pgMar → headerHeight → ...
            $headerRefs =
                '<w:headerReference w:type="first"   r:id="' . $rIdFirst . '"/>'
                . '<w:headerReference w:type="default" r:id="' . $rIdDefault . '"/>'
                . '<w:headerReference w:type="even"    r:id="' . $rIdDefault . '"/>'
                . '<w:titlePg/>'
                . '<w:headerHeight w:w="' . $headerHeightTwips . '" w:type="dxa"/>';

            // Insert setelah opening tag <w:sectPr ...>
            $sectPrFull = preg_replace(
                '/(<w:sectPr\b[^>]*>)/s',
                '$1' . $headerRefs,
                $sectPrFull,
                1
            );

            $docXml = $beforeSectPr . $sectPrFull . $afterSectPr;
            $zip->addFromString('word/document.xml', $docXml);

            // ── 6. Patch [Content_Types].xml ──
            $ct = $zip->getFromName('[Content_Types].xml');
            if ($ct !== false) {
                $ctNew = $ct;

                // Hapus override header lama, tambah ulang
                $ctNew = preg_replace('/<Override[^>]+PartName="\/word\/header[12]\.xml"[^>]*\/>\s*/i', '', $ctNew);

                foreach (array_unique([$ext, $ext2]) as $e) {
                    if (strpos($ctNew, 'Extension="' . $e . '"') === false) {
                        $mime = ($e === 'png') ? 'image/png' : 'image/jpeg';
                        $ctNew = str_replace(
                            '</Types>',
                            '<Default Extension="' . $e . '" ContentType="' . $mime . '"/></Types>',
                            $ctNew
                        );
                    }
                }

                $hdrCT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml';
                $ctNew = str_replace(
                    '</Types>',
                    '<Override PartName="/word/header1.xml" ContentType="' . $hdrCT . '"/>'
                    . '<Override PartName="/word/header2.xml" ContentType="' . $hdrCT . '"/>'
                    . '</Types>',
                    $ctNew
                );

                $zip->addFromString('[Content_Types].xml', $ctNew);
            }

            $success = true;

        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning('injectHeaderWatermark: ' . $e->getMessage());
        }

        // ── Tutup ZIP ──
        $closed = $zip->close();

        if (
            $success && $closed && file_exists($tempPath) && filesize($tempPath) > 500
            && $this->isDocxXmlValid($tempPath)
        ) {
            // Ganti file asli hanya kalau temp valid
            if (!rename($tempPath, $docxPath)) {
                copy($tempPath, $docxPath);
                @unlink($tempPath);
            }
        } else {
            // Inject gagal — hapus temp, file asli (tanpa kop) tetap terpakai
            @unlink($tempPath);
        }
    }

    // =========================================================
    // PRIVATE: Pastikan semua bagian XML dalam .docx well-formed
    // =========================================================
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
    // PRIVATE: Sync items (delete + re-insert)
    // =========================================================
    private function syncItems(Spph $spph, array $items): void
    {
        $spph->items()->delete();
        $urutan = 1;
        foreach ($items as $item) {
            $raw = $item['nama_barang'] ?? '';
            $nama = $this->sanitizeRichText($raw);
            if (!trim(strip_tags($nama)))
                continue;
            SpphItem::create([
                'spph_id' => $spph->id,
                'urutan' => $urutan++,
                'nama_barang' => $nama,
                'satuan' => $item['satuan'] ?? null,
                'jumlah' => $item['jumlah'] ?? null,
                'tgl_pemenuhan' => !empty($item['tgl_pemenuhan']) ? $item['tgl_pemenuhan'] : null,
            ]);
        }
    }

    private function sanitizeRichText(string $html): string
    {
        $allowed = '<b><strong><i><em><u><s><strike><del><sub><sup><span><font><div><p><br><ol><ul><li>';
        $clean = strip_tags($html, $allowed);

        // Formatting tags stay available, but attributes/event handlers do not.
        return (string) preg_replace('/<([a-z][a-z0-9]*)\b[^>]*>/i', '<$1>', $clean);
    }

    private function resolveVendorNames(Request $request): array
    {
        $names = collect($request->input('vendor_names', []))
            ->merge([$request->input('nama_vendor')])
            ->when($request->filled('vendor_baru'), fn ($collection) => $collection->push($request->input('vendor_baru')))
            ->flatMap(fn ($vendor) => is_string($vendor) ? explode('|', $vendor) : [$vendor])
            ->map(fn ($vendor) => trim((string) $vendor))
            ->reject(fn ($vendor) => $vendor === '' || $vendor === '__tambah__')
            ->unique(fn ($vendor) => mb_strtolower($vendor))
            ->values();

        if ($names->isEmpty()) {
            throw ValidationException::withMessages([
                'nama_vendor' => 'Minimal pilih satu vendor.',
            ]);
        }

        $names->each(function (string $vendorName) {
            try {
                Vendor::firstOrCreate(['nama_vendor' => $vendorName]);
            } catch (QueryException $e) {
                if (! Vendor::where('nama_vendor', $vendorName)->exists()) {
                    throw $e;
                }
            }
        });

        Cache::forget('vendors:active');

        return $names->all();
    }

    private function resolvePrintVendorName(Spph $spph, ?string $requestedVendor): string
    {
        $vendors = $spph->print_vendor_names;
        if ($requestedVendor) {
            $match = collect($vendors)->first(fn ($vendor) => mb_strtolower($vendor) === mb_strtolower(trim($requestedVendor)));
            if ($match) {
                return $match;
            }
        }

        return $vendors[0] ?? $spph->nama_vendor;
    }

    private function safeDownloadName(string $name): string
    {
        $name = preg_replace('/[^\pL\pN\s\.\-_]+/u', ' ', $name);
        $name = trim(preg_replace('/\s+/', ' ', (string) $name));

        return $name !== '' ? $name : 'download';
    }

    // =========================================================
    // PRIVATE: Extract sequence number
    // =========================================================
    private function extractSeq(string $nomor): ?int
    {
        if (preg_match('/^(\d+)\/PKU-/', $nomor, $m))
            return (int) $m[1];
        if (preg_match('/\/(\d+)$/', $nomor, $m))
            return (int) $m[1];
        return null;
    }

    // =========================================================
    // PRIVATE: Build suggestions nomor berikutnya
    // =========================================================
    private function buildSuggestions(string $last): array
    {
        $year = now()->year;
        $romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
        $roman = $romans[now()->month - 1];
        $sugg = [];

        if (preg_match('/^(\d+)\/PKU-([A-Z]+)\/SPPH\/(\d+)$/', $last, $m)) {
            $next = (int) $m[1] + 1;
            $sugg[] = sprintf('%03d/PKU-%s/SPPH/%d', $next, $roman, $year);
            $sugg[] = sprintf('PBR/SPPH/%s/%04d', substr($year, -2), $next);
        } elseif (preg_match('/^PBR\/SPPH\/\d+\/(\d+)$/', $last, $m)) {
            $next = (int) $m[1] + 1;
            $sugg[] = sprintf('PBR/SPPH/%s/%04d', substr($year, -2), $next);
            $sugg[] = sprintf('%03d/PKU-%s/SPPH/%d', $next, $roman, $year);
        } else {
            $sugg[] = sprintf('%03d/PKU-%s/SPPH/%d', 1, $roman, $year);
        }

        return $sugg;
    }
}
