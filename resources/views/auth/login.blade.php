<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            height: 100%;
            overflow: hidden;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f0f0f0;
        }

        .page-wrapper {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            position: relative;
            overflow: hidden;
        }

        .animated-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
            pointer-events: none;
        }

        .circle {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(2px);
            animation: float 20s infinite ease-in-out;
        }

        .circle:nth-child(1) { width: 150px; height: 150px; top: 10%; left: 15%; animation-delay: 0s; animation-duration: 25s; }
        .circle:nth-child(2) { width: 200px; height: 200px; top: 50%; left: 70%; animation-delay: 3s; animation-duration: 30s; }
        .circle:nth-child(3) { width: 100px; height: 100px; top: 70%; left: 20%; animation-delay: 6s; animation-duration: 28s; }
        .circle:nth-child(4) { width: 120px; height: 120px; top: 20%; left: 80%; animation-delay: 2s; animation-duration: 22s; }

        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.15; }
            50% { transform: translateY(-40px) translateX(30px); opacity: 0.25; }
        }

        .particle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: twinkle 3s infinite;
        }

        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }

        .login-container {
            position: relative;
            z-index: 10;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 28px 32px;
            width: 100%;
            max-width: 420px;
            animation: slideUp 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(60px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ===== TOMBOL BACK - CANGGIH ===== */
        .back-button {
            position: absolute;
            top: 16px;
            left: 16px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 18px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
            border: 2px solid rgba(102, 126, 234, 0.2);
            border-radius: 12px;
            color: #667eea;
            font-size: 13px;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15);
            overflow: hidden;
            z-index: 100;
        }

        .back-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
            transition: left 0.5s ease;
        }

        .back-button:hover::before {
            left: 100%;
        }

        .back-button:hover {
            transform: translateX(-5px) scale(1.05);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            border-color: rgba(102, 126, 234, 0.4);
        }

        .back-button:active {
            transform: translateX(-5px) scale(0.98);
        }

        .back-button .arrow {
            font-size: 16px;
            display: inline-block;
            transition: transform 0.3s ease;
        }

        .back-button:hover .arrow {
            transform: translateX(-4px);
            animation: arrowBounce 0.6s ease infinite;
        }

        @keyframes arrowBounce {
            0%, 100% { transform: translateX(-4px); }
            50% { transform: translateX(-8px); }
        }

        .back-button .text {
            position: relative;
            z-index: 1;
        }

        /* Responsive back button */
        @media (max-width: 768px) {
            .back-button {
                top: 12px;
                left: 12px;
                padding: 8px 14px;
                font-size: 12px;
            }
            
            .back-button .arrow {
                font-size: 14px;
            }
        }

        @media (max-width: 480px) {
            .back-button {
                padding: 7px 12px;
                gap: 6px;
            }
            
            .back-button .text {
                display: none; /* Hide text on very small screens */
            }
        }

        .logo-section {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin-bottom: 18px;
            animation: fadeIn 0.8s ease-out 0.2s both;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-15px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .logo-wrapper {
            position: relative;
            transition: transform 0.3s ease;
        }

        .logo-wrapper img {
            max-width: 65px;
            height: auto;
            filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
            transition: all 0.3s ease;
        }

        .logo-wrapper:hover {
            transform: translateY(-5px) scale(1.05);
        }

        .login-title {
            text-align: center;
            margin-bottom: 18px;
            animation: fadeIn 0.8s ease-out 0.3s both;
        }

        .login-title h2 {
            font-size: 23px;
            color: #5b6bc8;
            margin-bottom: 4px;
            font-weight: 600;
        }

        .login-title p {
            color: #6b7280;
            font-size: 13px;
        }

        .alert {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 8px 10px;
            border-radius: 8px;
            margin-bottom: 14px;
            animation: slideDown 0.4s ease-out;
            font-size: 12px;
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-15px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .login-form {
            animation: fadeIn 0.8s ease-out 0.4s both;
        }

        .form-group {
            margin-bottom: 14px;
            position: relative;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #374151;
            font-weight: 600;
            font-size: 13px;
        }

        .input-wrapper {
            position: relative;
        }

        .input-wrapper input {
            width: 100%;
            padding: 10px 36px 10px 12px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.3s ease;
            background: #fff;
            color: #1f2937;
        }

        .input-wrapper input::placeholder {
            color: #9ca3af;
        }

        .input-wrapper input:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .input-icon {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 15px;
            pointer-events: none;
        }

        .toggle-password {
            position: absolute;
            right: 4px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            font-size: 18px;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            color: #6b7280;
            z-index: 10;
        }

        .toggle-password:hover {
            color: #6366f1;
            transform: translateY(-50%) scale(1.1);
        }

        .toggle-password:active {
            transform: translateY(-50%) scale(0.95);
        }

        .error-message {
            color: #ef4444;
            font-size: 11px;
            margin-top: 3px;
        }

        .checkbox-group {
            display: flex;
            align-items: center;
            margin-bottom: 16px;
        }

        .checkbox-group input[type="checkbox"] {
            width: 15px;
            height: 15px;
            margin-right: 7px;
            cursor: pointer;
            accent-color: #6366f1;
        }

        .checkbox-group label {
            color: #6b7280;
            font-size: 13px;
            cursor: pointer;
            user-select: none;
            margin: 0;
        }

        .btn-submit {
            width: 100%;
            padding: 11px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
            position: relative;
        }

        .btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-submit:active {
            transform: translateY(0);
        }

        .btn-submit.loading {
            pointer-events: none;
            opacity: 0.8;
        }

        .btn-submit.loading::after {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            top: 50%;
            left: 50%;
            margin-left: -8px;
            margin-top: -8px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .login-footer {
            text-align: center;
            margin-top: 16px;
            color: #9ca3af;
            font-size: 11px;
            animation: fadeIn 0.8s ease-out 0.5s both;
        }

        @media (max-width: 768px) {
            .login-container { padding: 24px 28px; max-width: 380px; }
        }

        @media (max-width: 480px) {
            .page-wrapper { padding: 15px; }
            .login-container { padding: 20px 24px; }
            .logo-wrapper img { max-width: 55px; }
            .login-title h2 { font-size: 21px; }
        }
    </style>
</head>
<body>
    <div class="page-wrapper">
        {{-- ===== TOMBOL BACK ===== --}}
        <a href="{{ url('/') }}" class="back-button">
            <span class="arrow">←</span>
            <span class="text">Back to Home</span>
        </a>

        <div class="animated-bg">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>

        <div class="login-container">
            <div class="logo-section">
                <div class="logo-wrapper">
                    <img src="{{ asset('images/logo1.png') }}" alt="Logo Sucofindo">
                </div>
                <div class="logo-wrapper">
                    <img src="{{ asset('images/logo3.png') }}" alt="Logo BUMN">
                </div>
                <div class="logo-wrapper">
                    <img src="{{ asset('images/logo4.png') }}" alt="Logo Sucofindo">
                </div>
            </div>

            <div class="login-title">
                <h2>Welcome Back</h2>
                <p>Please login to your account</p>
            </div>

            @if (session('status'))
                <div class="alert">
                    {{ session('status') }}
                </div>
            @endif

            <form class="login-form" method="POST" action="{{ route('login') }}" id="loginForm">
                @csrf

                <div class="form-group">
                    <label for="email">{{ __('Email') }}</label>
                    <div class="input-wrapper">
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value="{{ old('email') }}"
                            required 
                            autofocus 
                            autocomplete="username"
                            placeholder="Enter your email"
                        >
                        <span class="input-icon">📧</span>
                    </div>
                    @if ($errors->has('email'))
                        <div class="error-message">{{ $errors->first('email') }}</div>
                    @endif
                </div>

                <div class="form-group">
                    <label for="password">{{ __('Password') }}</label>
                    <div class="input-wrapper">
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required 
                            autocomplete="current-password"
                            placeholder="Enter your password"
                        >
                        <button type="button" class="toggle-password" onclick="togglePassword()">
                            <span id="eye-icon">👁️</span>
                        </button>
                    </div>
                    @if ($errors->has('password'))
                        <div class="error-message">{{ $errors->first('password') }}</div>
                    @endif
                </div>

                <div class="checkbox-group">
                    <input type="checkbox" id="remember_me" name="remember">
                    <label for="remember_me">{{ __('Remember me') }}</label>
                </div>

                <button type="submit" class="btn-submit">
                    {{ __('Log in') }}
                </button>
            </form>

            <div class="login-footer">
                <p>&copy; {{ date('Y') }}All rights reserved.</p>
            </div>
        </div>
    </div>

    <script>
        // Toggle Password Visibility
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const eyeIcon = document.getElementById('eye-icon');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                eyeIcon.textContent = '👁️';
            }
        }

        // Form Submit Loading
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            const btn = this.querySelector('.btn-submit');
            btn.classList.add('loading');
            btn.textContent = '';
        });

        // Create Particles
        function createParticles() {
            const bg = document.querySelector('.animated-bg');
            
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 3 + 's';
                    bg.appendChild(particle);
                }, i * 100);
            }
        }

        createParticles();

        // Optional: Toggle with keyboard shortcut (Ctrl + Space)
        document.getElementById('password').addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === ' ') {
                e.preventDefault();
                togglePassword();
            }
        });

        // ===== BACK BUTTON RIPPLE EFFECT ===== 
        document.querySelector('.back-button').addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(102, 126, 234, 0.5)';
            ripple.style.width = ripple.style.height = '10px';
            ripple.style.left = (e.clientX - rect.left - 5) + 'px';
            ripple.style.top = (e.clientY - rect.top - 5) + 'px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(15);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    </script>
</body>
</html>
