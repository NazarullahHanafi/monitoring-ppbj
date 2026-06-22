<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Request Approval PR</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .header p {
            margin: 5px 0 0;
            opacity: 0.9;
            font-size: 14px;
        }
        .content {
            padding: 30px;
        }
        .alert {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        .alert strong {
            color: #856404;
        }
        .info-box {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: 600;
            color: #6c757d;
        }
        .info-value {
            color: #212529;
            font-weight: 500;
        }
        .btn {
            display: inline-block;
            padding: 14px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            text-align: center;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            transition: all 0.3s;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6c757d;
            border-top: 1px solid #dee2e6;
        }
        .badge {
            display: inline-block;
            padding: 4px 10px;
            background: #28a745;
            color: white;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
        }
        .highlight {
            background: #e7f3ff;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 600;
            color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        {{-- Header --}}
        <div class="header">
            <h1>🔔 Request Approval PR</h1>
            <p>Sistem Monitoring PPBJ</p>
        </div>

        {{-- Content --}}
        <div class="content">
            <div class="alert">
                <strong>⚠️ Perhatian:</strong> Terdapat request approval PR baru yang memerlukan persetujuan Anda.
            </div>

            <p>Yth. Bagian Umum,</p>
            
            <p>
                Dengan hormat, kami dari bagian <strong>Operasional</strong> mengajukan permohonan approval untuk Purchase Request (PR) dengan detail sebagai berikut:
            </p>

            {{-- Info Box --}}
            <div class="info-box">
                <div class="info-row">
                    <span class="info-label">📄 Nomor PR</span>
                    <span class="info-value highlight">{{ $torpr->nomor_pr }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">📋 Tujuan Pengadaan</span>
                    <span class="info-value">{{ $torpr->tujuan_pengadaan ?? '-' }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">💰 Jumlah PR</span>
                    <span class="info-value">Rp {{ number_format($torpr->jumlah_pr ?? 0, 0, ',', '.') }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">📅 Tanggal PR</span>
                    <span class="info-value">{{ $torpr->tanggal_pr?->format('d M Y') ?? '-' }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">📅 Tanggal Dibutuhkan</span>
                    <span class="info-value">{{ $torpr->tgl_dibutuhkan?->format('d M Y') ?? '-' }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">👤 Diminta oleh</span>
                    <span class="info-value">{{ $requestedByName }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">⏰ Waktu Request</span>
                    <span class="info-value">{{ $approval->created_at->format('d M Y H:i') }} WIB</span>
                </div>
                <div class="info-row">
                    <span class="info-label">📊 Status</span>
                    <span class="info-value"><span class="badge">{{ $approval->status }}</span></span>
                </div>
            </div>

            <p>
                Mohon untuk dapat segera melakukan <strong>review dan approval</strong> terhadap PR ini agar proses pengadaan dapat berjalan sesuai timeline yang direncanakan.
            </p>

            {{-- CTA Button --}}
            <div style="text-align: center;">
                <a href="{{ $approvalUrl }}" class="btn">
                    ✅ Buka Halaman Approval
                </a>
            </div>

            <p style="margin-top: 30px; color: #6c757d; font-size: 14px;">
                <strong>Catatan:</strong>
            </p>
            <ul style="color: #6c757d; font-size: 14px; line-height: 1.8;">
                <li>Silakan login ke sistem untuk melakukan approval atau reject</li>
                <li>Jika ada pertanyaan, hubungi bagian operasional</li>
                <li>Email ini dikirim otomatis oleh sistem, mohon tidak membalas email ini</li>
            </ul>
        </div>

        {{-- Footer --}}
        <div class="footer">
            <p><strong>Sistem Monitoring PPBJ</strong></p>
            <p>© {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
            <p style="margin-top: 10px;">
                Email ini dikirim secara otomatis. Jika Anda merasa tidak seharusnya menerima email ini, 
                silakan hubungi administrator sistem.
            </p>
        </div>
    </div>
</body>
</html>