<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PR Sudah Ditandatangani</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            
            {{-- Warning Icon --}}
            <div class="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-12 h-12 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
            </div>

            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                PR Sudah Ditandatangani
            </h1>
            
            <p class="text-gray-600 dark:text-gray-400 mb-6">
                QR Code ini sudah pernah digunakan sebelumnya
            </p>

            {{-- Info Card --}}
            <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 mb-6 text-left">
                <div class="space-y-3 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Nomor PR:</span>
                        <span class="font-semibold text-gray-900 dark:text-white">{{ $torpr->nomor_pr }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Posisi TTD:</span>
                        <span class="font-semibold text-gray-900 dark:text-white">{{ $type === 'kacab' ? 'Kepala Cabang' : 'Kepala Bidang' }}</span>
                    </div>
                    <div class="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Ditandatangani oleh:</span>
                            <span class="font-bold text-green-600 dark:text-green-400">{{ $signedBy }}</span>
                        </div>
                        <div class="flex justify-between mt-2">
                            <span class="text-gray-600 dark:text-gray-400">Waktu:</span>
                            <span class="font-semibold text-gray-900 dark:text-white">
                                {{ \Carbon\Carbon::parse($signedAt)->format('d M Y H:i') }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <p class="text-sm text-blue-800 dark:text-blue-300">
                    💡 Setiap QR Code hanya dapat digunakan sekali untuk keamanan. Jika ada kesalahan, hubungi tim Operasional untuk regenerasi token.
                </p>
            </div>

            <a href="{{ route('torpr.index') }}"
                class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">
                Kembali ke Dashboard
            </a>
        </div>
    </div>
</body>
</html>