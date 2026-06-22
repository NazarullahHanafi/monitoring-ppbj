<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Token Tidak Valid</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            
            {{-- Error Icon --}}
            <div class="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </div>

            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                QR Code Tidak Valid
            </h1>
            
            <p class="text-gray-600 dark:text-gray-400 mb-6">
                Token yang Anda gunakan tidak ditemukan atau sudah tidak berlaku
            </p>

            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <p class="text-sm text-red-800 dark:text-red-300 text-left">
                    <strong>Kemungkinan penyebab:</strong>
                </p>
                <ul class="text-sm text-red-700 dark:text-red-400 text-left mt-2 space-y-1 ml-4 list-disc">
                    <li>QR Code sudah pernah digunakan</li>
                    <li>Token sudah kadaluarsa</li>
                    <li>QR Code rusak atau tidak terbaca dengan baik</li>
                    <li>Link tidak lengkap</li>
                </ul>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <p class="text-sm text-blue-800 dark:text-blue-300">
                    💡 Hubungi tim Operasional untuk mendapatkan QR Code baru atau cek kembali dokumen PR Anda.
                </p>
            </div>

            <a href="{{ route('torpr.index') }}"
                class="block w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-all">
                Kembali ke Dashboard
            </a>
        </div>
    </div>
</body>
</html>