{{-- resources/views/pr/quick-sign.blade.php - FIXED WITH LOGIN REDIRECT --}}

<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Quick Sign - {{ $torpr->nomor_pr }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 max-w-md w-full">

            {{-- Header --}}
            <div class="text-center mb-6">
                <div
                    class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Tanda Tangan Digital</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    TTD {{ $type === 'kacab' ? 'Kepala Cabang' : 'Kepala Bidang' }}
                </p>
            </div>

            @if($type === 'kacab')
                <div
                    class="mb-4 p-3 rounded-lg text-center text-sm 
                            {{ auth()->check() ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' }}">
                    @auth
                        <span class="font-semibold">🔓 Login Sebagai: {{ auth()->user()->name }}</span>
                    @else
                        <span class="font-semibold">🔒 Akses Khusus Superadmin Operasional</span>
                    @endauth
                </div>

                {{-- Jika belum login, tombol disable --}}
                @if(!auth()->check())
                    <div class="mb-5">
                        <a href="{{ route('login') }}"
                            class="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-3 rounded-xl transition mb-3">
                            🔑 Login Dulu
                        </a>
                        <p class="text-xs text-center text-gray-500">Anda harus login untuk menandatangani sebagai Kacab.</p>
                    </div>
                @endif
            @endif

            {{-- PR Info --}}
            <div
                class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-4 mb-5 border border-blue-200 dark:border-gray-600">
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-300">📋 PR:</span>
                        <span class="font-bold text-gray-900 dark:text-white">{{ $torpr->nomor_pr }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-300">📝 Tujuan:</span>
                        <span class="font-semibold text-gray-900 dark:text-white text-right text-xs">
                            {{ Str::limit($torpr->tujuan_pengadaan, 30) }}
                        </span>
                    </div>
                    @if($torpr->jumlah_pr)
                        <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-300">💰 Jumlah:</span>
                            <span class="font-bold text-indigo-600 dark:text-indigo-400">
                                Rp {{ number_format($torpr->jumlah_pr, 0, ',', '.') }}
                            </span>
                        </div>
                    @endif
                </div>
            </div>

            {{-- ✅ CHECK DATA COMPLETENESS --}}
            @php
                $requiredFields = [
                    'tujuan_pengadaan' => 'Tujuan Pengadaan',
                    'nomor_pr' => 'Nomor PR',
                    'tanggal_pr' => 'Tanggal PR',
                    'jumlah_pr' => 'Jumlah PR',
                    'tgl_ttd_kabid_pr' => 'TTD Kabid PR',
                    'tgl_ttd_kacab_pr' => 'TTD Kacab PR',
                ];

                $missingFields = [];
                foreach ($requiredFields as $field => $label) {
                    if (empty($torpr->{$field})) {
                        $missingFields[] = $label;
                    }
                }

                // Remove current user's TTD from missing
                if ($type === 'kacab' && in_array('TTD Kacab PR', $missingFields)) {
                    $missingFields = array_diff($missingFields, ['TTD Kacab PR']);
                }
                if ($type === 'kabid' && in_array('TTD Kabid PR', $missingFields)) {
                    $missingFields = array_diff($missingFields, ['TTD Kabid PR']);
                }

                $canAutoRequest = empty($missingFields);
            @endphp

            {{-- Nama Input --}}
            <div class="mb-5">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Nama Anda <span class="text-red-500">*</span>
                </label>
                <input type="text" id="signerName" placeholder="Nama lengkap" required class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            </div>

            {{-- ⚠️ Warning if data incomplete --}}
            @if(!$canAutoRequest)
                <div class="mb-5">
                    <div
                        class="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <div class="flex items-start gap-2">
                            <svg class="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div class="flex-1">
                                <p class="text-xs font-semibold text-amber-800 dark:text-amber-300">Data belum lengkap:</p>
                                <p class="text-xs text-amber-700 dark:text-amber-400 mt-1">
                                    {{ implode(', ', array_values($missingFields)) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            @endif

            {{-- Buttons --}}
            <div class="space-y-3">
                {{-- ✅ UBAH: Tombol TTD hanya aktif jika Kacab sudah login --}}
                @if($type === 'kacab' && !auth()->check())
                    <button disabled
                        class="w-full bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 font-bold py-3.5 rounded-xl cursor-not-allowed flex items-center justify-center gap-2 text-sm">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                            </path>
                        </svg>
                        Harus Login Dulu
                    </button>
                @else
                    <button onclick="processSign()" id="btnSign" class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700
                                       text-white font-bold py-3.5 rounded-xl transition-all transform active:scale-95
                                       shadow-lg flex items-center justify-center gap-2 text-sm">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span id="btnText">Tandatangani</span>
                    </button>
                @endif

                <a href="{{ route('torpr.index') }}"
                    class="block w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
                               text-gray-800 dark:text-gray-200 font-semibold py-3 rounded-xl text-center transition text-sm">
                    Batal
                </a>
            </div>

            {{-- Footer --}}
            <div class="mt-4 text-center">
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    🔒 {{ now()->format('d M Y') }}
                </p>
            </div>
        </div>
    </div>

    <script>
        const canAutoRequest = {{ $canAutoRequest ? 'true' : 'false' }};
        const prId = {{ $torpr->id }};
        const prNo = @json($torpr->nomor_pr);

        async function processSign() {
            const signerName = document.getElementById('signerName').value.trim();

            if (!signerName || signerName.length < 3) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Nama wajib diisi',
                    text: 'Minimal 3 karakter',
                    confirmButtonColor: '#6366f1'
                });
                return;
            }

            const btn = document.getElementById('btnSign');
            const btnText = document.getElementById('btnText');

            btn.disabled = true;
            btnText.textContent = 'Memproses...';

            try {

                const response = await fetch('{{ route("pr.process-quick-sign", ["token" => $token, "type" => $type]) }}', {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        signer_name: signerName
                    })
                });

                const data = await response.json();

                if (!data.ok) {
                    throw new Error(data.message || 'Gagal menyimpan tanda tangan');
                }

                btnText.textContent = '✅ Berhasil!';


                if (canAutoRequest) {
                    await showRequestPrompt(signerName);
                } else {
                    await Swal.fire({
                        icon: 'success',
                        title: 'TTD Berhasil!',
                        html: `
                            <p class="text-gray-700 mb-2">Tanda tangan tercatat:</p>
                            <p class="font-semibold">${data.timestamp}</p>
                            <div class="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-left">
                                <p class="font-semibold text-amber-800 mb-1">⚠️ Belum bisa request Umum</p>
                                <p class="text-amber-700">Data belum lengkap. Lengkapi dulu di website.</p>
                            </div>
                        `,
                        confirmButtonColor: '#10B981'
                    });

                    window.location.href = '{{ route("torpr.index") }}';
                }

            } catch (error) {
                btn.disabled = false;
                btnText.textContent = 'Tandatangani';

                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: error.message,
                    confirmButtonColor: '#EF4444'
                });
            }
        }

        // ✅ STEP 3: SHOW PROMPT TO REQUEST UMUM
        async function showRequestPrompt(signerName) {
            const result = await Swal.fire({
                title: '✅ TTD Berhasil!',
                html: `
                    <div class="text-left space-y-3">
                        <div class="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p class="text-sm text-green-800">
                                <strong>✓ Tanda tangan berhasil dicatat</strong><br>
                                <span class="text-xs">PR: ${prNo}</span>
                            </p>
                        </div>
                        
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p class="text-sm font-semibold text-blue-900 mb-2">
                                📨 Kirim PR ke Umum sekarang?
                            </p>
                            <p class="text-xs text-blue-700">
                                Sistem akan mengarahkan Anda untuk login jika belum terdeteksi.
                            </p>
                        </div>
                    </div>
                `,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3B82F6',
                cancelButtonColor: '#6B7280',
                confirmButtonText: '🚀 Lanjutkan',
                cancelButtonText: 'Nanti Saja',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                // ✅ FIX: Redirect langsung ke halaman tujuan.
                // Jika belum login, Laravel middleware 'auth' akan otomatis redirect ke login 
                // lalu kembali ke sini setelah login sukses.
                const targetUrl = window.location.origin + '/torpr?auto_request=' + prId;
                window.location.href = targetUrl;
            } else {
                await Swal.fire({
                    icon: 'info',
                    title: 'OK, Nanti Saja',
                    text: 'TTD sudah tersimpan. Bisa request ke Umum kapan saja dari dashboard.',
                    confirmButtonColor: '#10B981',
                    timer: 2500,
                    timerProgressBar: true
                });

                window.location.href = '{{ route("torpr.index") }}';
            }
        }

        document.getElementById('signerName').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') processSign();
        });
    </script>
</body>

</html>
