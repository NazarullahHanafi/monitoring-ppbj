<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>Executive Brief Pengadaan</title>
    <style>
        @page { margin: 22px 26px; }
        * { box-sizing: border-box; }
        body { margin: 0; color: #172033; font-family: DejaVu Sans, sans-serif; font-size: 9px; }
        .hero { padding: 20px 22px; color: #fff; border-radius: 12px; background: #172554; }
        .hero h1 { margin: 0 0 4px; font-size: 23px; letter-spacing: -.5px; }
        .hero p { margin: 0; color: #c7d2fe; }
        .meta { float: right; margin-top: -34px; text-align: right; color: #e0e7ff; }
        .stats { width: 100%; margin: 14px 0; border-spacing: 7px; }
        .stats td { width: 16.66%; padding: 11px; border: 1px solid #dbe4f3; border-radius: 8px; background: #f8fafc; }
        .stats span { display: block; color: #64748b; font-size: 7px; text-transform: uppercase; }
        .stats strong { display: block; margin-top: 4px; font-size: 13px; color: #1e3a8a; }
        h2 { margin: 13px 0 7px; font-size: 12px; color: #172554; }
        table.data { width: 100%; border-collapse: collapse; }
        table.data th { padding: 7px; color: #fff; text-align: left; background: #4338ca; }
        table.data td { padding: 7px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
        table.data tr:nth-child(even) td { background: #f8fafc; }
        .score { padding: 3px 6px; color: #991b1b; font-weight: bold; border-radius: 10px; background: #fee2e2; }
        .muted { color: #64748b; }
        .flow { width: 100%; margin: 4px 0 10px; border-spacing: 6px; }
        .flow td { padding: 8px; text-align: center; border: 1px solid #c7d2fe; background: #eef2ff; }
        .flow strong { display: block; margin-bottom: 3px; color: #312e81; font-size: 14px; }
        .contract { color: #92400e; font-weight: bold; }
        .footer { margin-top: 10px; color: #94a3b8; text-align: center; font-size: 7px; }
    </style>
</head>
<body>
    <div class="hero">
        <h1>Procurement Command Center 360</h1>
        <p>Executive brief pengadaan SIMONPR</p>
        <div class="meta">{{ $generatedAt->format('d/m/Y H:i') }} WIB<br>Data sistem saat laporan dibuat</div>
    </div>

    <table class="stats">
        <tr>
            <td><span>Total PPBJ</span><strong>{{ number_format($data['stats']['total']) }}</strong></td>
            <td><span>Aktif</span><strong>{{ number_format($data['stats']['active']) }}</strong></td>
            <td><span>Risiko Tinggi</span><strong>{{ number_format($data['stats']['high_risk']) }}</strong></td>
            <td><span>Kontrak Kritis</span><strong>{{ number_format($data['stats']['critical_contracts']) }}</strong></td>
            <td><span>Nilai PR</span><strong>{{ $data['stats']['total_pr_label'] }}</strong></td>
            <td><span>Efisiensi</span><strong>{{ $data['stats']['efficiency_label'] }}</strong></td>
        </tr>
    </table>

    <h2>Aliran Pengadaan End-to-End</h2>
    <table class="flow"><tr>
        @foreach($data['flow'] as $stage)
            <td><strong>{{ number_format($stage['count']) }}</strong>{{ $stage['label'] }}</td>
        @endforeach
    </tr></table>

    <h2>Prioritas Risiko</h2>
    <table class="data">
        <thead><tr><th style="width:4%">No.</th><th style="width:17%">Nomor PR/PPBJ</th><th style="width:25%">Uraian</th><th style="width:14%">Vendor</th><th style="width:10%">Nilai PR</th><th style="width:7%">Skor</th><th>Penjelasan</th></tr></thead>
        <tbody>
        @forelse($data['risks'] as $index => $risk)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td><strong>{{ $risk['ppbj_no'] }}</strong><br><span class="muted">{{ $risk['buyer'] }}</span></td>
                <td>{{ $risk['uraian'] }}</td>
                <td>{{ $risk['vendor'] }}</td>
                <td>{{ $risk['nilai_pr_label'] }}</td>
                <td><span class="score">{{ $risk['score'] }}</span></td>
                <td>{{ implode('; ', $risk['reasons']) }}</td>
            </tr>
        @empty
            <tr><td colspan="7" class="muted">Tidak ada risiko aktif yang terdeteksi.</td></tr>
        @endforelse
        </tbody>
    </table>

    <h2>Kontrak / Masa Pemenuhan Mendekati Batas</h2>
    <table class="data">
        <thead><tr><th style="width:5%">No.</th><th style="width:20%">Nomor PR/PPBJ</th><th>Uraian</th><th style="width:18%">Vendor</th><th style="width:12%">Batas</th><th style="width:12%">Kondisi</th></tr></thead>
        <tbody>
        @forelse($data['contracts'] as $index => $contract)
            <tr>
                <td>{{ $index + 1 }}</td><td><strong>{{ $contract['ppbj_no'] }}</strong></td><td>{{ $contract['uraian'] }}</td>
                <td>{{ $contract['vendor'] }}</td><td>{{ $contract['deadline'] }}</td>
                <td class="contract">{{ $contract['days'] < 0 ? abs($contract['days']).' hari terlambat' : $contract['days'].' hari lagi' }}</td>
            </tr>
        @empty
            <tr><td colspan="6" class="muted">Tidak ada kontrak yang jatuh tempo dalam 30 hari.</td></tr>
        @endforelse
        </tbody>
    </table>

    <div class="footer">Dokumen ini dihasilkan otomatis oleh SIMONPR. Validasi akhir tetap mengikuti dokumen sumber dan kewenangan pejabat terkait.</div>
</body>
</html>
