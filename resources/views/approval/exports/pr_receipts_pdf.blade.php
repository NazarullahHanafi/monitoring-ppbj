<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Approval PR</title>
    <style>
        @page { margin: 24px 26px 34px; }
        * { box-sizing: border-box; }
        body { margin: 0; color: #172033; font-family: "DejaVu Sans", sans-serif; font-size: 8px; }
        .header { padding: 17px 20px; border-radius: 9px; color: #fff; background: #1d4ed8; }
        .brand { margin: 0 0 3px; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; color: #bfdbfe; }
        h1 { margin: 0; font-size: 21px; }
        .subtitle { margin: 5px 0 0; color: #dbeafe; font-size: 9px; }
        .meta { margin: 10px 0 12px; width: 100%; border-collapse: separate; border-spacing: 6px 0; }
        .meta td { width: 25%; padding: 9px 11px; border: 1px solid #dbeafe; border-radius: 7px; background: #eff6ff; vertical-align: top; }
        .meta-label { display: block; margin-bottom: 3px; color: #64748b; font-size: 6.5px; font-weight: bold; letter-spacing: .6px; text-transform: uppercase; }
        .meta-value { color: #0f172a; font-size: 9px; font-weight: bold; }
        .note { margin: 0 0 10px; padding: 8px 10px; border-left: 4px solid #f59e0b; background: #fffbeb; color: #78350f; }
        table.report { width: 100%; border-collapse: collapse; table-layout: fixed; }
        .report thead { display: table-header-group; }
        .report th { padding: 7px 5px; border: 1px solid #0f766e; color: #fff; background: #0f766e; font-size: 6.6px; line-height: 1.25; text-align: center; text-transform: uppercase; }
        .report td { padding: 6px 5px; border: 1px solid #cbd5e1; line-height: 1.35; vertical-align: top; word-wrap: break-word; }
        .report tr:nth-child(even) td { background: #f8fafc; }
        .number { text-align: right; white-space: nowrap; }
        .center { text-align: center; }
        .pr { color: #1d4ed8; font-weight: bold; }
        .status { display: inline-block; padding: 3px 5px; border-radius: 8px; font-size: 6px; font-weight: bold; }
        .status-pending { color: #92400e; background: #fef3c7; }
        .status-approved { color: #166534; background: #dcfce7; }
        .status-rejected { color: #991b1b; background: #fee2e2; }
        .muted { color: #64748b; font-size: 6.5px; }
        .empty { padding: 25px !important; color: #64748b; text-align: center; }
        .footer { position: fixed; right: 0; bottom: -20px; left: 0; color: #64748b; font-size: 7px; text-align: center; }
        .footer .page:after { content: counter(page); }
    </style>
</head>
<body>
    <div class="footer">Dokumen laporan SIMONPR &middot; Halaman <span class="page"></span></div>

    <div class="header">
        <p class="brand">SIMONPR</p>
        <h1>Laporan Monitoring Approval PR</h1>
        <p class="subtitle">Daftar Purchase Request sesuai filter aktif untuk kebutuhan monitoring dan tindak lanjut.</p>
    </div>

    <table class="meta">
        <tr>
            <td><span class="meta-label">Status Laporan</span><span class="meta-value">{{ $statusLabel }}</span></td>
            <td><span class="meta-label">Jumlah Data</span><span class="meta-value">{{ number_format($summary['total']) }} PR</span></td>
            <td><span class="meta-label">Total Nilai PR</span><span class="meta-value">Rp {{ number_format($summary['value'], 0, ',', '.') }}</span></td>
            <td><span class="meta-label">Dibuat</span><span class="meta-value">{{ $generatedAt->translatedFormat('d M Y, H:i') }} WIB</span></td>
        </tr>
    </table>

    <div class="note">
        <strong>Filter:</strong> Nomor PR {{ $search ?: 'semua' }} &middot; Status {{ $status }} &middot;
        Dibuat oleh {{ $generatedBy }}. Data berstatus PENDING merupakan PR yang masih menunggu tindakan Bagian Umum.
    </div>

    <table class="report">
        <thead>
            <tr>
                <th style="width: 3%">No.</th>
                <th style="width: 11%">Nomor / Tanggal PR</th>
                <th style="width: 19%">Tujuan Pengadaan</th>
                <th style="width: 8%">Portofolio</th>
                <th style="width: 10%">Nilai PR</th>
                <th style="width: 13%">Diajukan Oleh</th>
                <th style="width: 10%">Waktu Request</th>
                <th style="width: 8%">Durasi</th>
                <th style="width: 8%">Status</th>
                <th style="width: 10%">Tindak Lanjut</th>
            </tr>
        </thead>
        <tbody>
            @forelse($rows as $index => $row)
                @php
                    $processedAt = $row->processed_at ? \Carbon\Carbon::parse($row->processed_at)->translatedFormat('d M Y H:i') : null;
                    $requestAt = $row->requested_at ? \Carbon\Carbon::parse($row->requested_at) : null;
                    $endAt = $row->processed_at ? \Carbon\Carbon::parse($row->processed_at) : now();
                    $minutes = $requestAt ? max(0, (int) $requestAt->diffInMinutes($endAt)) : null;
                    $duration = is_null($minutes) ? '-' : (intdiv($minutes, 1440) > 0 ? intdiv($minutes, 1440).' hari '.intdiv($minutes % 1440, 60).' jam' : (intdiv($minutes, 60) > 0 ? intdiv($minutes, 60).' jam '.($minutes % 60).' menit' : ($minutes % 60).' menit'));
                    $statusClass = strtolower($row->status);
                @endphp
                <tr>
                    <td class="center">{{ $index + 1 }}</td>
                    <td><span class="pr">{{ $row->nomor_pr ?: '-' }}</span><br><span class="muted">{{ $row->tanggal_pr ? \Carbon\Carbon::parse($row->tanggal_pr)->translatedFormat('d M Y') : '-' }}</span></td>
                    <td>{{ $row->tujuan_pengadaan ?: '-' }}</td>
                    <td>{{ $row->portofolio ?: '-' }}</td>
                    <td class="number">Rp {{ number_format((float) ($row->jumlah_pr ?? 0), 0, ',', '.') }}</td>
                    <td>
                        <strong>{{ $row->requested_name ?: ($row->requester_name ?: '-') }}</strong><br>
                        <span class="muted">{{ $row->requester_email ?: '-' }}<br>{{ $row->requester_department ? ucfirst($row->requester_department) : '-' }}</span>
                    </td>
                    <td>{{ $requestAt?->translatedFormat('d M Y H:i') ?? '-' }}{{ $requestAt ? ' WIB' : '' }}</td>
                    <td>{{ $duration }}</td>
                    <td class="center"><span class="status status-{{ $statusClass }}">{{ $row->status }}</span></td>
                    <td>
                        <strong>{{ $row->processed_by ?: 'Belum diproses' }}</strong>
                        @if($processedAt)<br><span class="muted">{{ $processedAt }} WIB</span>@endif
                        @if($row->status === 'REJECTED' && $row->rejected_reason)<br>{{ $row->rejected_reason }}@elseif($row->status === 'PENDING')<br><span class="muted">Menunggu approval Umum</span>@endif
                    </td>
                </tr>
            @empty
                <tr><td colspan="10" class="empty">Tidak ada data yang sesuai dengan filter laporan.</td></tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
