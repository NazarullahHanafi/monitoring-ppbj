<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PR Notification</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4f8; }
        .wrapper { max-width: 620px; margin: 30px auto; }

        /* Header */
        .header {
            background: linear-gradient(135deg, #1e40af, #7c3aed, #db2777);
            padding: 40px 32px;
            border-radius: 16px 16px 0 0;
            text-align: center;
        }
        .header-logo {
            width: 60px; height: 60px;
            background: rgba(255,255,255,0.15);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            margin-bottom: 16px;
            border: 2px solid rgba(255,255,255,0.3);
        }
        .header h1 {
            color: white;
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
        .header p {
            color: rgba(255,255,255,0.85);
            font-size: 13px;
            margin-top: 6px;
        }

        /* Alert Badge */
        .alert-badge {
            background: #fef3c7;
            border: 1px solid #fbbf24;
            border-radius: 0;
            padding: 14px 32px;
            text-align: center;
            font-size: 13px;
            color: #92400e;
            font-weight: 600;
        }
        .alert-badge span { font-size: 16px; margin-right: 6px; }

        /* Body */
        .body {
            background: white;
            padding: 36px 32px;
        }

        .greeting {
            font-size: 16px;
            color: #1f2937;
            margin-bottom: 8px;
            font-weight: 600;
        }
        .intro {
            font-size: 14px;
            color: #4b5563;
            line-height: 1.7;
            margin-bottom: 28px;
            padding-bottom: 24px;
            border-bottom: 1px solid #f3f4f6;
        }

        /* PR Card */
        .pr-card {
            background: linear-gradient(135deg, #eff6ff, #faf5ff);
            border: 1px solid #c7d2fe;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            position: relative;
            overflow: hidden;
        }
        .pr-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 4px; height: 100%;
            background: linear-gradient(180deg, #3b82f6, #7c3aed);
            border-radius: 12px 0 0 12px;
        }
        .pr-card-title {
            font-size: 11px;
            font-weight: 700;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 16px;
            padding-left: 12px;
        }

        .pr-row {
            display: flex;
            padding: 10px 12px;
            border-radius: 8px;
            margin-bottom: 6px;
            font-size: 13px;
        }
        .pr-row:nth-child(even) { background: rgba(255,255,255,0.6); }
        .pr-label {
            color: #6b7280;
            font-weight: 600;
            min-width: 140px;
            flex-shrink: 0;
        }
        .pr-value {
            color: #111827;
            font-weight: 500;
        }
        .pr-value.highlight {
            color: #1d4ed8;
            font-weight: 700;
            font-size: 14px;
        }
        .pr-value.badge {
            background: #fef3c7;
            color: #92400e;
            padding: 2px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
        }

        /* Action Section */
        .action-section {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
        }
        .action-title {
            font-size: 14px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .action-step {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 12px;
        }
        .step-num {
            width: 24px; height: 24px;
            background: linear-gradient(135deg, #3b82f6, #7c3aed);
            border-radius: 50%;
            color: white;
            font-size: 11px;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .step-text {
            font-size: 13px;
            color: #374151;
            line-height: 1.5;
            padding-top: 3px;
        }

        /* CTA Button */
        .cta-container { text-align: center; margin: 28px 0; }
        .cta-btn {
            display: inline-block;
            background: linear-gradient(135deg, #2563eb, #7c3aed);
            color: white !important;
            text-decoration: none;
            padding: 14px 36px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.3px;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.35);
        }
        .cta-btn:hover { opacity: 0.9; }

        /* Sender Info */
        .sender-card {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 10px;
            padding: 16px 20px;
            margin-bottom: 24px;
            font-size: 13px;
            color: #166534;
        }
        .sender-card strong { color: #14532d; }

        /* Footer */
        .footer {
            background: #1f2937;
            padding: 24px 32px;
            border-radius: 0 0 16px 16px;
            text-align: center;
        }
        .footer p {
            color: #9ca3af;
            font-size: 11px;
            line-height: 1.8;
        }
        .footer .app-name {
            color: white;
            font-size: 13px;
            font-weight: 700;
            margin-bottom: 6px;
        }
        .footer .divider {
            border: none;
            border-top: 1px solid #374151;
            margin: 12px 0;
        }

        /* Urgent Banner */
        .urgent-banner {
            background: linear-gradient(135deg, #fef2f2, #fee2e2);
            border: 1px solid #fca5a5;
            border-radius: 10px;
            padding: 14px 18px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 13px;
            color: #991b1b;
            font-weight: 600;
        }
    </style>
</head>
<body>
<div class="wrapper">

    {{-- HEADER --}}
    <div class="header">
        <div class="header-logo">🔔</div>
        <h1>Notifikasi PR Pending</h1>
        <p>Sistem Monitoring PPBJ • Sucofindo Pekanbaru</p>
    </div>

    {{-- ALERT BADGE --}}
    <div class="alert-badge">
        <span>⚡</span> PR ini membutuhkan tindakan Anda segera
    </div>

    {{-- BODY --}}
    <div class="body">

        <p class="greeting">Yth. Bagian Umum,</p>
        <p class="intro">
            Sebuah <strong>Purchase Request (PR)</strong> baru telah diajukan oleh Departemen Operasional
            dan saat ini sedang <strong>menunggu persetujuan</strong> dari Bagian Umum.
            Berikut adalah detail lengkap PR tersebut:
        </p>

        {{-- PR DETAIL CARD --}}
        <div class="pr-card">
            <div class="pr-card-title">📋 Detail Purchase Request</div>

            <div class="pr-row">
                <span class="pr-label">🔖 Nomor PR</span>
                <span class="pr-value highlight">{{ $prData['pr_no'] }}</span>
            </div>
            <div class="pr-row">
                <span class="pr-label">📝 Uraian / Deskripsi</span>
                <span class="pr-value">{{ $prData['description'] ?? '-' }}</span>
            </div>
            <div class="pr-row">
                <span class="pr-label">👤 Diajukan Oleh</span>
                <span class="pr-value">{{ $prData['submitted_by'] ?? '-' }}</span>
            </div>
            <div class="pr-row">
                <span class="pr-label">🏢 Departemen</span>
                <span class="pr-value">{{ $prData['department'] ?? 'Operasional' }}</span>
            </div>
            <div class="pr-row">
                <span class="pr-label">📅 Tanggal Pengajuan</span>
                <span class="pr-value">{{ $prData['submitted_at'] ?? now()->format('d M Y H:i') }}</span>
            </div>
            <div class="pr-row">
                <span class="pr-label">📊 Status</span>
                <span class="pr-value"><span class="badge">⏳ MENUNGGU APPROVAL</span></span>
            </div>
            @if(!empty($prData['notes']))
            <div class="pr-row">
                <span class="pr-label">💬 Catatan</span>
                <span class="pr-value">{{ $prData['notes'] }}</span>
            </div>
            @endif
        </div>

        {{-- URGENT BANNER --}}
        <div class="urgent-banner">
            ⚠️ PR ini perlu segera ditinjau agar proses pengadaan tidak terhambat
        </div>

        {{-- ACTION STEPS --}}
        <div class="action-section">
            <div class="action-title">🎯 Langkah yang Perlu Dilakukan:</div>
            <div class="action-step">
                <div class="step-num">1</div>
                <div class="step-text">Login ke <strong>Sistem PPBJ</strong> menggunakan akun Bagian Umum</div>
            </div>
            <div class="action-step">
                <div class="step-num">2</div>
                <div class="step-text">Buka menu <strong>Approval PR</strong> di sidebar navigasi</div>
            </div>
            <div class="action-step">
                <div class="step-num">3</div>
                <div class="step-text">Cari PR dengan nomor <strong>{{ $prData['pr_no'] }}</strong> dan review detailnya</div>
            </div>
            <div class="action-step">
                <div class="step-num">4</div>
                <div class="step-text">Klik <strong>Approve</strong> jika disetujui, atau <strong>Reject</strong> dengan mencantumkan alasan yang jelas</div>
            </div>
        </div>

        {{-- CTA BUTTON --}}
        <div class="cta-container">
            <a href="{{ url('/approval/pr-receipts') }}" class="cta-btn">
                ✅ Buka Halaman Approval PR →
            </a>
        </div>

        {{-- SENDER INFO --}}
        <div class="sender-card">
            📨 <strong>Dikirim oleh:</strong> {{ $senderName }} melalui PPBJ Assistant Chatbot<br>
            🕐 <strong>Waktu kirim:</strong> {{ now()->format('l, d F Y • H:i') }} WIB
        </div>

        <p style="font-size: 12px; color: #9ca3af; line-height: 1.7;">
            Email ini dikirim secara otomatis oleh sistem PPBJ. Jika Anda menerima email ini secara tidak sengaja,
            harap abaikan dan hubungi administrator sistem.
        </p>

    </div>

    {{-- FOOTER --}}
    <div class="footer">
        <p class="app-name">🏢 Sistem Monitoring PPBJ</p>
        <p>PT Sucofindo • Cabang Pekanbaru</p>
        <hr class="divider">
        <p>
            Dikembangkan oleh <strong style="color: #e5e7eb;">Nazarullah Hanafi</strong> •
            Powered by Laravel & Groq AI<br>
            © {{ date('Y') }} PPBJ System. All rights reserved.
        </p>
    </div>

</div>
</body>
</html>
