@extends('layouts.app')

@section('title', 'Management Akun')

@push('styles')
    <style>
        /* Password Strength Indicator */
        .password-strength-meter {
            height: 4px;
            background: #e5e7eb;
            border-radius: 2px;
            overflow: hidden;
            margin-top: 8px;
        }

        .password-strength-bar {
            height: 100%;
            transition: all 0.3s ease;
            border-radius: 2px;
        }

        .strength-weak {
            width: 33%;
            background: #ef4444;
        }

        .strength-medium {
            width: 66%;
            background: #f59e0b;
        }

        .strength-strong {
            width: 100%;
            background: #10b981;
        }

        .error-message {
            animation: shake 0.3s ease;
        }

        @keyframes shake {

            0%,
            100% {
                transform: translateX(0);
            }

            25% {
                transform: translateX(-5px);
            }

            75% {
                transform: translateX(5px);
            }
        }

        .fade-in {
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
@endpush

@section('content')
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {{-- Header --}}
        <div class="mb-6">
            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:text-white">
                👤 Management Akun
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Ubah password untuk akun <span
                    class="font-semibold text-gray-900 dark:text-white">{{ auth()->user()->email }}</span>
            </p>
        </div>

        {{-- Alert / Flash Message --}}
        @if(session('status'))
            <div
                class="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-800 dark:bg-emerald-900/30 fade-in">
                <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-emerald-800 dark:text-emerald-200 font-medium">{{ session('status') }}</span>
                </div>
            </div>
        @endif

        @if($errors->any())
            <div
                class="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800 dark:bg-red-900/30 error-message fade-in">
                <div class="flex items-start gap-2">
                    <svg class="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div class="flex-1">
                        <p class="text-red-800 dark:text-red-200 font-medium mb-1">Terjadi kesalahan:</p>
                        <ul class="list-disc list-inside text-sm text-red-700 dark:text-red-300 space-y-1">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        @endif

        {{-- User Info Card --}}
        <div
            class="mb-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800 p-4 fade-in">
            <div class="flex items-center gap-4">
                <div
                    class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center stroke-white dark:text-white text-2xl font-bold shadow-lg">
                    {{ strtoupper(substr(auth()->user()->name, 0, 1)) }}
                </div>
                <div class="flex-1">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ auth()->user()->name }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ auth()->user()->email }}</p>
                    <div class="flex gap-2 mt-1">
                        <span class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600
                                     {{ auth()->user()->role === 'superadmin'
        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-gray-700'
        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' }}">
                            @if(auth()->user()->role === 'superadmin')
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                </svg>
                            @endif
                            {{ strtoupper(auth()->user()->role) }}
                        </span>
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 dark:text-white  text-xs font-bold rounded-full 
                                     {{ auth()->user()->department === 'umum'
        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' }}">
                            {{ strtoupper(auth()->user()->department) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {{-- Form Card --}}
        <div
            class="rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl p-6 fade-in">
            <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    Ubah Password
                </h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Gunakan password yang kuat untuk keamanan akun Anda
                </p>
            </div>

            <form method="POST" action="{{ route('account.password') }}" id="changePasswordForm" class="space-y-5">
                @csrf

                {{-- Password Lama --}}
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Password Lama <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <input type="password" name="current_password" id="currentPassword" required class="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white 
                                   shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all pr-10
                                   @error('current_password') border-red-500 @enderror"
                            placeholder="Masukkan password lama">
                        <button type="button" onclick="togglePassword('currentPassword')"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>
                    @error('current_password')
                        <p class="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1 error-message">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {{ $message }}
                        </p>
                    @enderror
                </div>

                {{-- Password Baru --}}
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        Password Baru <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <input type="password" name="password" id="newPassword" required minlength="8"
                            oninput="checkPasswordStrength('newPassword', 'newPasswordStrength')" class="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white 
                                   shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all pr-10
                                   @error('password') border-red-500 @enderror" placeholder="Minimal 8 karakter">
                        <button type="button" onclick="togglePassword('newPassword')"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>

                    {{-- Password Strength Indicator --}}
                    <div class="password-strength-meter">
                        <div id="newPasswordStrength" class="password-strength-bar"></div>
                    </div>
                    <p class="text-xs mt-1" id="newPasswordText">
                        <span class="text-gray-500">Minimal 8 karakter dengan huruf besar, kecil, dan angka</span>
                    </p>

                    @error('password')
                        <p class="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1 error-message">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {{ $message }}
                        </p>
                    @enderror

                    {{-- Generate Password Button --}}
                    <button type="button" onclick="generatePassword('newPassword', 'newPasswordStrength')"
                        class="mt-2 text-gray-700 text-blue-600 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-300 font-medium flex items-center gap-1 transition">
                        <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <p class="dark:text-white">Generate Password Aman </p>
                    </button>
                </div>

                {{-- Konfirmasi Password --}}
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Konfirmasi Password Baru <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <input type="password" name="password_confirmation" id="confirmPassword" required minlength="8"
                            oninput="checkPasswordMatch()"
                            class="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white 
                                   shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all pr-10"
                            placeholder="Ulangi password baru">
                        <button type="button" onclick="togglePassword('confirmPassword')"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>
                    <p class="text-xs mt-1" id="passwordMatchText"></p>
                </div>

                {{-- Password Requirements Info --}}
                <div class="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-700 rounded-xl p-4">
                    <h4 class="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Persyaratan Password:
                    </h4>
                    <ul class="text-xs text-blue-800 dark:text-blue-300 space-y-1">
                        <li class="flex items-center gap-2">
                            <svg class="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Minimal 8 karakter
                        </li>
                        <li class="flex items-center gap-2">
                            <svg class="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Minimal 1 huruf besar (A-Z)
                        </li>
                        <li class="flex items-center gap-2">
                            <svg class="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Minimal 1 huruf kecil (a-z)
                        </li>
                        <li class="flex items-center gap-2">
                            <svg class="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Minimal 1 angka (0-9)
                        </li>
                    </ul>
                </div>

                {{-- Buttons --}}
                <div class="pt-4 flex items-center gap-3">
                    <button type="submit" id="submitBtn" class="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 dark:bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Simpan Perubahan
                    </button>

                    <a href="{{ url()->previous() }}" class="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-200 dark:bg-gray-700 
                               px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 
                               hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali
                    </a>
                </div>
            </form>
        </div>

        {{-- Security Tips --}}
        <div
            class="mt-6 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 fade-in">
            <h4 class="text-sm font-semibold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Tips Keamanan:
            </h4>
            <ul class="text-xs text-amber-800 dark:text-amber-300 space-y-1">
                <li>• Jangan gunakan password yang sama dengan akun lain</li>
                <li>• Hindari menggunakan informasi pribadi (tanggal lahir, nama, dll)</li>
                <li>• Ubah password secara berkala (minimal 3 bulan sekali)</li>
                <li>• Jangan bagikan password kepada siapapun</li>
            </ul>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        // ================= PASSWORD STRENGTH CHECKER =================
        function checkPasswordStrength(inputId, strengthId) {
            const password = document.getElementById(inputId).value;
            const strengthBar = document.getElementById(strengthId);
            const textElement = document.getElementById(inputId + 'Text');

            let strength = 0;
            let feedback = [];

            // Length check
            if (password.length >= 8) strength++;
            else feedback.push('minimal 8 karakter');

            // Uppercase check
            if (/[A-Z]/.test(password)) strength++;
            else feedback.push('huruf besar');

            // Lowercase check
            if (/[a-z]/.test(password)) strength++;
            else feedback.push('huruf kecil');

            // Number check
            if (/[0-9]/.test(password)) strength++;
            else feedback.push('angka');

            // Special character check (bonus)
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

            // Update UI
            strengthBar.className = 'password-strength-bar';

            if (strength === 0) {
                strengthBar.classList.add('strength-weak');
                strengthBar.style.width = '0%';
                if (textElement) {
                    textElement.innerHTML = '<span class="text-gray-500">Mulai ketik password...</span>';
                }
            } else if (strength <= 2) {
                strengthBar.classList.add('strength-weak');
                if (textElement) {
                    textElement.innerHTML = `<span class="text-red-500 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Lemah - Tambahkan: ${feedback.join(', ')}
                    </span>`;
                }
            } else if (strength <= 3) {
                strengthBar.classList.add('strength-medium');
                if (textElement) {
                    textElement.innerHTML = `<span class="text-orange-500 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Sedang - Tambahkan: ${feedback.join(', ')}
                    </span>`;
                }
            } else {
                strengthBar.classList.add('strength-strong');
                if (textElement) {
                    textElement.innerHTML = `<span class="text-green-500 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Kuat - Password aman!
                    </span>`;
                }
            }

            // Check password match if confirmation exists
            checkPasswordMatch();
        }

        // ================= CHECK PASSWORD MATCH =================
        function checkPasswordMatch() {
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const matchText = document.getElementById('passwordMatchText');

            if (confirmPassword === '') {
                matchText.innerHTML = '';
                return;
            }

            if (newPassword === confirmPassword) {
                matchText.innerHTML = `<span class="text-green-500 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Password cocok!
                </span>`;
            } else {
                matchText.innerHTML = `<span class="text-red-500 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Password tidak cocok
                </span>`;
            }
        }

        // ================= GENERATE SECURE PASSWORD =================
        function generatePassword(inputId, strengthId) {
            const length = 12;
            const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const lowercase = 'abcdefghijklmnopqrstuvwxyz';
            const numbers = '0123456789';
            const special = '!@#$%^&*';

            let password = '';

            // Ensure at least one of each type
            password += uppercase[Math.floor(Math.random() * uppercase.length)];
            password += lowercase[Math.floor(Math.random() * lowercase.length)];
            password += numbers[Math.floor(Math.random() * numbers.length)];
            password += special[Math.floor(Math.random() * special.length)];

            // Fill the rest randomly
            const allChars = uppercase + lowercase + numbers + special;
            for (let i = password.length; i < length; i++) {
                password += allChars[Math.floor(Math.random() * allChars.length)];
            }

            // Shuffle the password
            password = password.split('').sort(() => Math.random() - 0.5).join('');

            // Set to input and show
            const input = document.getElementById(inputId);
            input.type = 'text';
            input.value = password;

            // Set to confirmation too
            const confirmInput = document.getElementById('confirmPassword');
            if (confirmInput) {
                confirmInput.type = 'text';
                confirmInput.value = password;
            }

            // Check strength
            checkPasswordStrength(inputId, strengthId);

            // Copy to clipboard
            navigator.clipboard.writeText(password).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Password Generated!',
                    html: `<code class="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded text-lg font-mono">${password}</code>
                           <br><small class="text-gray-500 mt-2 block">✅ Sudah dicopy ke clipboard</small>
                           <br><small class="text-amber-600 mt-1 block">⚠️ Pastikan Anda menyimpan password ini!</small>`,
                    timer: 5000,
                    showConfirmButton: true,
                    confirmButtonText: 'OK, Saya Mengerti'
                });
            });
        }

        // ================= TOGGLE PASSWORD VISIBILITY =================
        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            input.type = input.type === 'password' ? 'text' : 'password';
        }

        // ================= FORM VALIDATION =================
        document.getElementById('changePasswordForm').addEventListener('submit', function (e) {
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (newPassword !== confirmPassword) {
                e.preventDefault();
                Swal.fire({
                    icon: 'error',
                    title: 'Password Tidak Cocok!',
                    text: 'Password baru dan konfirmasi password tidak sama',
                    confirmButtonColor: '#3B82F6'
                });
                return false;
            }

            // Check password strength
            if (newPassword.length < 8 ||
                !/[A-Z]/.test(newPassword) ||
                !/[a-z]/.test(newPassword) ||
                !/[0-9]/.test(newPassword)) {
                e.preventDefault();
                Swal.fire({
                    icon: 'error',
                    title: 'Password Tidak Memenuhi Syarat!',
                    html: 'Password harus:<br>• Minimal 8 karakter<br>• Mengandung huruf besar<br>• Mengandung huruf kecil<br>• Mengandung angka',
                    confirmButtonColor: '#3B82F6'
                });
                return false;
            }
        });

        // ================= AUTO-FOCUS ON ERROR =================
        @if($errors->has('current_password'))
            document.getElementById('currentPassword').focus();
        @elseif($errors->has('password'))
            document.getElementById('newPassword').focus();
        @endif
    </script>
@endpush