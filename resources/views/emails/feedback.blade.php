<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback PPBJ</title>
</head>

<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f0f4f8;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4f8; padding: 30px 0;">
        <tr>
            <td style="text-align:center;">
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

                    <!-- HEADER -->
                    <tr>
                        <td
                            style="background: linear-gradient(135deg, #0f172a, #1e3a5f, #0ea5e9); padding: 40px 32px; text-align: center;">
                            <div style="font-size: 44px; margin-bottom: 12px;">💬</div>
                            <h1 style="margin: 0; color: white; font-size: 22px; font-weight: 800;">Feedback dari
                                Pengguna</h1>
                            <p style="margin: 6px 0 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">Sistem
                                Monitoring PPBJ • Sucofindo Pekanbaru</p>
                        </td>
                    </tr>

                    <!-- CATEGORY STRIP -->
                    <tr>
                        <td style="padding: 12px 24px; font-size: 13px; font-weight: 700; text-align: center; letter-spacing: 1px; text-transform: uppercase; 
                            @if(strtolower($category) == 'keluhan')
                                background-color: #fef2f2; color: #dc2626; border-left: 4px solid #dc2626;
                            @elseif(strtolower($category) == 'saran')
                                background-color: #f0fdf4; color: #16a34a; border-left: 4px solid #16a34a;
                            @elseif(strtolower($category) == 'pertanyaan')
                                background-color: #eff6ff; color: #2563eb; border-left: 4px solid #2563eb;
                            @else
                                background-color: #faf5ff; color: #7c3aed; border-left: 4px solid #7c3aed;
                            @endif
                        ">
                            Kategori: {{ $category }}
                        </td>
                    </tr>

                    <!-- BODY -->
                    <tr>
                        <td style="padding: 36px 32px;">

                            <!-- USER INFO CARD -->
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 18px 20px;">
                                        <div
                                            style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                                            👤 Informasi Pengirim
                                        </div>

                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td
                                                    style="padding: 4px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 90px;">
                                                    Nama</td>
                                                <td
                                                    style="padding: 4px 0; font-size: 13px; color: #0f172a; font-weight: 500;">
                                                    {{ $userName }}</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="padding: 4px 0; font-size: 13px; color: #64748b; font-weight: 600;">
                                                    Email</td>
                                                <td
                                                    style="padding: 4px 0; font-size: 13px; color: #0f172a; font-weight: 500;">
                                                    {{ $userEmail }}</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="padding: 4px 0; font-size: 13px; color: #64748b; font-weight: 600;">
                                                    Departemen</td>
                                                <td
                                                    style="padding: 4px 0; font-size: 13px; color: #0f172a; font-weight: 500;">
                                                    {{ ucfirst($userDept) }}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- MESSAGE BOX -->
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="background: linear-gradient(135deg, #eff6ff, #f0fdf4); border: 1px solid #bfdbfe; border-radius: 12px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 24px; position: relative;">
                                        <div
                                            style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                                            📝 Pesan
                                        </div>
                                        <p
                                            style="margin: 0; font-size: 15px; color: #1e293b; line-height: 1.8; font-style: italic;">
                                            {{ $userMessage }}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- META INFO -->
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
                                <tr>
                                    <td style="font-size: 12px; color: #94a3b8;">📅 Dikirim: {{ $sentAt }}</td>
                                    <td style="text-align:right; font-size: 12px; color: #94a3b8;">
                                        🤖 via PPBJ Chatbot</td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td
                            style="background-color: #0f172a; padding: 24px 32px; text-align: center; border-radius: 0 0 16px 16px;">
                            <p style="margin: 0 0 6px 0; color: white; font-size: 13px; font-weight: 700;">🏢 Sistem
                                Monitoring PPBJ</p>
                            <p style="margin: 0; color: #64748b; font-size: 11px; line-height: 1.8;">PT Sucofindo •
                                Cabang Pekanbaru</p>
                            <hr style="border: none; border-top: 1px solid #1e293b; margin: 12px 0;">
                            <p style="margin: 0; color: #64748b; font-size: 11px; line-height: 1.8;">
                                Dikembangkan oleh <strong style="color: #e2e8f0;">Nazarullah Hanafi</strong><br>
                                © {{ date('Y') }} PPBJ System. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>

</html>