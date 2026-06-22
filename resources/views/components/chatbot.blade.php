{{-- ================================================================
CHATBOT WIDGET PPBJ - MODERN VERSION WITH STARTER MESSAGES
- Modal konfirmasi modern (bukan alert)
- Starter conversation suggestions
- Auto-reply untuk pertanyaan umum
- ✅ NEWGreeting otomatis berdasarkan waktu (pagi/siang/sore/malam)
- ✅ NEW: Quick reply buttons kontekstual per dept
- ✅ NEW: Fitur feedback/keluhan/saran ke admin
================================================================ --}}

<div id="ppbj-chatbot-widget"
    style="position: fixed; bottom: 24px; right: 24px; z-index: 9999; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; touch-action: none;">

    {{-- ========== TOGGLE BUTTON ========== --}}
    <button id="chatbot-toggle-btn"
        style="width: 65px; height: 65px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #7c3aed, #db2777); border: none; cursor: grab; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3); transition: box-shadow 0.2s ease, transform 0.1s ease; position: relative; user-select: none;">

        <svg id="icon-chat" style="width: 32px; height: 32px; color: white;" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z">
            </path>
        </svg>

        <svg id="icon-close" style="width: 32px; height: 32px; color: white; display: none;" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>

        {{-- ✅ NEW: Badge notif --}}
        @auth
            <span id="chatbot-notif-badge"
                style="display:none; position:absolute; top:-4px; right:-4px; background:#ef4444; color:white; border-radius:50%; width:20px; height:20px; font-size:10px; font-weight:700; align-items:center; justify-content:center; border:2px solid white;">
                0
            </span>
        @endauth
    </button>

    {{-- ========== CHAT WINDOW ========== --}}
    <div id="chatbot-window-panel"
        style="display: none; position: absolute; bottom: 80px; right: 0; width: 380px; max-height: 70vh; height: 600px; background-color: #fff; border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); overflow: hidden; border: 1px solid #e5e7eb; flex-direction: column;">

        {{-- ✅ NEW: HEADER dengan warna dinamis per waktu --}}
        <div id="chatbot-header-bar"
            style="background: linear-gradient(90deg, #2563eb, #7c3aed, #db2777); padding: 16px; color: white; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; transition: background 0.5s;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div id="chatbot-avatar-wrap"
                    style="width: 42px; height: 42px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <span id="chatbot-avatar-emoji">🤖</span>
                </div>
                <div>
                    <h3 style="margin: 0; font-size: 15px; font-weight: 700;">PPBJ Assistant</h3>
                    <p id="chatbot-status-text" style="margin: 0; font-size: 11px; opacity: 0.9;">Online • Siap membantu
                    </p>
                </div>
            </div>
            <button onclick="toggleChatbot()"
                style="background: rgba(255,255,255,0.2); border: none; padding: 8px; border-radius: 8px; cursor: pointer; color: white;">
                <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
        </div>

        {{-- MESSAGES AREA --}}
        <div id="chatbot-msg-container"
            style="flex: 1; overflow-y: auto; padding: 20px; background-color: #f9fafb; display: flex; flex-direction: column; gap: 16px; min-height: 0;">

            {{-- Welcome Message - akan diganti oleh greeting otomatis --}}
            <div id="welcome-msg" style="display: flex; align-items: flex-start; gap: 8px; animation: fadeIn 0.5s;">
                <div
                    style="width: 34px; height: 34px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; flex-shrink: 0;">
                    🤖</div>
                <div
                    style="background: white; padding: 12px 16px; border-radius: 18px; border-top-left-radius: 4px; max-width: 85%; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
                    <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #374151;">
                        👋 <strong>Halo!</strong> Saya <strong>PPBJ Assistant</strong>, siap membantu Anda!
                    </p>
                    <span
                        style="font-size: 10px; color: #9ca3af; display: block; margin-top: 6px;">{{ now()->format('H:i') }}</span>
                </div>
            </div>

            {{-- STARTER SUGGESTIONS --}}
            <div id="starter-suggestions"
                style="display: flex; flex-direction: column; gap: 8px; animation: fadeIn 0.7s;">
                <div style="text-align: center; font-size: 11px; color: #6b7280; margin-top: 8px;">
                    💡 Pertanyaan yang sering ditanyakan:
                </div>
                @auth
                    @if(auth()->user()->dept === 'umum')
                        <button onclick="sendStarterMessage('cek PR')" class="starter-btn"
                            style="background: linear-gradient(90deg, #fef3c7, #fde68a); border-color: #fcd34d; color: #92400e;">
                            🔔 Cek PR Pending (Dept Umum)
                        </button>
                    @endif
                @endauth
                <button onclick="sendStarterMessage('Bagaimana cara tracking PR?')" class="starter-btn">
                    🔍 Cara tracking PR (tanpa login!)
                </button>
                <button onclick="sendStarterMessage('Siapa Nazarullah?')" class="starter-btn">
                    ⭐ Siapa Nazarullah?
                </button>
                <button onclick="sendStarterMessage('Bagaimana cara menggunakan sistem PPBJ?')" class="starter-btn">
                    🚀 Cara menggunakan sistem PPBJ
                </button>
                <button onclick="sendStarterMessage('Bagaimana cara import data Excel?')" class="starter-btn">
                    📤 Cara import data Excel
                </button>
                <button onclick="sendStarterMessage('Jelaskan tentang status SLA')" class="starter-btn">
                    📊 Penjelasan Status SLA
                </button>
            </div>
        </div>

        {{-- ✅ NEW: QUICK REPLY BUTTONS kontekstual per dept --}}
        <div id="chatbot-quick-replies"
            style="padding: 10px 16px; background: white; border-top: 1px solid #f3f4f6; display: flex; gap: 8px; overflow-x: auto; flex-shrink: 0; flex-wrap: wrap;">
            @auth
                @if(auth()->user()->dept === 'umum')
                    <button onclick="sendQuickReply('cek PR')"
                        style="padding: 7px 13px; background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;">
                        🔔 Cek PR
                    </button>
                    <button onclick="sendQuickReply('feedback')"
                        style="padding: 7px 13px; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;">
                        💬 Feedback
                    </button>
                @elseif(auth()->user()->dept === 'operasional')
                    <button onclick="sendQuickReply('cek PR')"
                        style="padding: 7px 13px; background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;">
                        📋 PR Saya
                    </button>
                    <button onclick="sendQuickReply('kirim email')"
                        style="padding: 7px 13px; background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;">
                        📧 Kirim Email
                    </button>
                    <button onclick="sendQuickReply('feedback')"
                        style="padding: 7px 13px; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;">
                        💬 Feedback
                    </button>
                @else
                    {{-- User login tapi dept lain --}}
                    <button onclick="sendQuickReply('Bagaimana cara menggunakan sistem PPBJ ini?')"
                        style="padding: 7px 13px; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;">
                        💡 Cara Pakai
                    </button>
                    <button onclick="sendQuickReply('feedback')"
                        style="padding: 7px 13px; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;">
                        💬 Feedback
                    </button>
                @endif
            @else
                {{-- Guest --}}
                <button onclick="sendQuickReply('Bagaimana cara tracking PR?')"
                    style="padding: 7px 13px; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;">
                    🔍 Tracking PR
                </button>
                <button onclick="sendQuickReply('Bagaimana cara menggunakan sistem PPBJ ini?')"
                    style="padding: 7px 13px; background: #f5f3ff; color: #7c3aed; border: 1px solid #ddd6fe; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;">
                    💡 Cara Pakai
                </button>
                <button onclick="sendQuickReply('Jelaskan tentang status SLA')"
                    style="padding: 7px 13px; background: #fdf2f8; color: #db2777; border: 1px solid #fbcfe8; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;">
                    📊 Status SLA
                </button>
            @endauth
        </div>

        {{-- INPUT AREA --}}
        <div style="padding: 16px; background: white; border-top: 1px solid #e5e7eb; flex-shrink: 0;">
            <form id="chatbot-form" onsubmit="sendMessage(event)" style="display: flex; gap: 10px;">
                <input id="chatbot-input" type="text" placeholder="Ketik pesan..." autocomplete="off" class="flex-1 px-4 py-3 border rounded-xl text-sm outline-none transition-all
                bg-gray-100 text-gray-900 placeholder-gray-500 
                dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400
                focus:ring-2 focus:ring-blue-500">
                <button type="submit" id="send-btn"
                    style="width: 48px; height: 48px; background: linear-gradient(90deg, #2563eb, #7c3aed); border: none; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: white;">
                    <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                </button>
            </form>
            <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 10px; color: #9ca3af;">Powered by Groq AI</span>
                <button onclick="showClearConfirmation()"
                    style="font-size: 10px; color: #ef4444; background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                    <svg style="width: 12px; height: 12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                        </path>
                    </svg>
                    Clear Chat
                </button>
            </div>
        </div>
    </div>

    {{-- ========== MODERN CLEAR CONFIRMATION MODAL ========== --}}
    <div id="clear-confirm-modal"
        style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); z-index: 9999; align-items: center; justify-content: center; animation: fadeIn 0.2s;">
        <div
            style="background: white; border-radius: 20px; padding: 28px; width: 90%; max-width: 400px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); animation: slideUp 0.3s;">
            <div
                style="width: 64px; height: 64px; background: linear-gradient(135deg, #fee2e2, #fecaca); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <svg style="width: 32px; height: 32px; color: #dc2626;" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                    </path>
                </svg>
            </div>
            <h3 style="margin: 0 0 12px; font-size: 20px; font-weight: 700; text-align: center; color: #111827;">
                Hapus Semua Percakapan?
            </h3>
            <p style="margin: 0 0 24px; font-size: 14px; color: #6b7280; text-align: center; line-height: 1.6;">
                Semua riwayat chat akan dihapus permanen dan tidak dapat dikembalikan.
            </p>
            <div style="display: flex; gap: 12px;">
                <button onclick="hideClearConfirmation()"
                    style="flex: 1; padding: 12px 24px; background: #f3f4f6; color: #374151; border: none; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer;">
                    Batal
                </button>
                <button onclick="confirmClearConversation()"
                    style="flex: 1; padding: 12px 24px; background: linear-gradient(90deg, #ef4444, #dc2626); color: white; border: none; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer;">
                    Ya, Hapus
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .dark #chatbot-input {
        background-color: #374151 !important;
        /* Set background jadi gelap (gray-700) */
        color: white !important;
        /* Paksa teks jadi putih */
        border-color: #4b5563 !important;
        /* Warna border */
    }

    /* Placeholder di Dark Mode */
    .dark #chatbot-input::placeholder {
        color: #9ca3af !important;
        /* Warna placeholder abu-abu */
        opacity: 1;
    }

    /* Mode Terang (opsional, untuk konsistensi) */
    #chatbot-input {
        background-color: #f3f4f6 !important;
        color: #1f2937 !important;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes bounce {

        0%,
        100% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-5px);
        }
    }

    @keyframes pulseBadge {

        0%,
        100% {
            transform: scale(1);
        }

        50% {
            transform: scale(1.2);
        }
    }

    #chatbot-toggle-btn.dragging {
        cursor: grabbing !important;
        transform: scale(1.1);
        box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.4);
        transition: none;
        /* Agar gerakan mengikuti mouse langsung */
    }

    #chatbot-msg-container::-webkit-scrollbar {
        width: 6px;
    }

    #chatbot-msg-container::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    #chatbot-msg-container::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 10px;
    }

    .starter-btn {
        padding: 12px 16px;
        background: linear-gradient(90deg, #f0f9ff, #e0f2fe);
        border: 1px solid #bae6fd;
        border-radius: 12px;
        color: #0369a1;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        text-align: left;
        transition: all 0.2s;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .starter-btn:hover {
        background: linear-gradient(90deg, #e0f2fe, #bae6fd);
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    /* ✅ NEW: Header themes per waktu */
    .header-morning {
        background: linear-gradient(90deg, #f59e0b, #fbbf24, #fcd34d) !important;
    }

    .header-noon {
        background: linear-gradient(90deg, #0ea5e9, #38bdf8, #7dd3fc) !important;
    }

    .header-afternoon {
        background: linear-gradient(90deg, #ea580c, #f97316, #fb923c) !important;
    }

    .header-evening {
        background: linear-gradient(90deg, #7c3aed, #8b5cf6, #a78bfa) !important;
    }

    .header-night {
        background: linear-gradient(90deg, #1e1b4b, #312e81, #4338ca) !important;
    }

    @media (max-width: 640px) {
        #ppbj-chatbot-widget {
            /* Ukuran harus pas dengan tombol agar tidak memakan tempat */
            width: 65px;
            height: 65px;
            /* Posisi awal standby di mobile */
            bottom: 20px;
            right: 20px;
            left: auto;
            /* Penting: reset left agar tidak konflik */
        }

        #chatbot-toggle-btn {
            position: absolute;
            right: 0;
            bottom: 0;
        }

        #chatbot-toggle-btn {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
        }

        /* Ganti bagian @media max-width: 640px yang lama dengan ini */
        @media (max-width: 640px) {
            #ppbj-chatbot-widget {
                /* Ukuran harus pas dengan tombol agar tidak memakan tempat */
                width: 65px;
                height: 65px;
                /* Posisi awal standby di mobile */
                bottom: 20px;
                right: 20px;
                left: auto;
                /* Penting: reset left agar tidak konflik */
            }

            /* Pastikan tombol mengisi penuh widget */
            #chatbot-toggle-btn {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
            }

            #chatbot-window-panel {
                position: fixed;
                bottom: 0;
                right: 0;
                left: 0;
                width: 100%;
                max-height: 80vh;
                border-radius: 20px 20px 0 0;
                transform: translateY(100%);
                /* Awal tersembunyi */
                transition: transform 0.3s ease-in-out;
            }

            #chatbot-window-panel.show {
                transform: translateY(0);
            }
        }
</style>

<script>
    let conversationHistory = [];
    let isLoading = false;
    let greetingLoaded = false;
    const isAuthenticated = {{ auth()->check() ? 'true' : 'false' }};
    const userDept = '{{ auth()->check() ? auth()->user()->dept : "" }}';
    const userName = '{{ auth()->check() ? explode(" ", auth()->user()->name)[0] : "Kawan" }}';

    const prKeywords = [
        'cek pr', 'pr pending', 'notifikasi pr', 'notif pr', 'approval pr',
        'pr menunggu', 'ada pr', 'list pr', 'daftar pr', 'lihat pr',
        'pr baru', 'pending pr'
    ];

    function isPrNotificationRequest(message) {
        return prKeywords.some(k => message.toLowerCase().includes(k));
    }

    // =====================================================
    // ✅ NEW: GREETING OTOMATIS BERDASARKAN WAKTU
    // =====================================================
    function applyTimeGreeting() {
        const hour = new Date().getHours();
        const header = document.getElementById('chatbot-header-bar');
        const avatar = document.getElementById('chatbot-avatar-emoji');
        const status = document.getElementById('chatbot-status-text');

        let greeting, emoji, theme, subtitle;

        if (hour >= 5 && hour < 11) {
            greeting = 'Selamat Pagi';
            emoji = '🌤️';
            theme = 'header-morning';
            subtitle = 'Semoga hari Anda produktif!';
        } else if (hour >= 11 && hour < 15) {
            greeting = 'Selamat Siang';
            emoji = '☀️';
            theme = 'header-noon';
            subtitle = 'Jangan lupa makan siang ya!';
        } else if (hour >= 15 && hour < 18) {
            greeting = 'Selamat Sore';
            emoji = '🌅';
            theme = 'header-afternoon';
            subtitle = 'Semangat, sebentar lagi pulang!';
        } else if (hour >= 18 && hour < 23) {
            greeting = 'Selamat Malam';
            emoji = '🌙';
            theme = 'header-evening';
            subtitle = 'Masih ada yang perlu dikerjakan?';
        } else {
            greeting = 'Halo';
            emoji = '⭐';
            theme = 'header-night';
            subtitle = 'Masih online di larut malam, semangat!';
        }

        // Update header style
        header.classList.remove('header-morning', 'header-noon', 'header-afternoon', 'header-evening', 'header-night');
        header.classList.add(theme);
        avatar.textContent = emoji;
        status.textContent = subtitle;

        // Update welcome message dengan greeting
        const welcomeMsg = document.getElementById('welcome-msg');
        if (welcomeMsg) {
            const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            welcomeMsg.querySelector('p').innerHTML = `
                ${emoji} <strong>${greeting}, ${userName}!</strong><br><br>
                ${subtitle} Saya <strong>PPBJ Assistant</strong>, siap membantu Anda. 😊
            `;
        }
    }

    // =====================================================
    // ✅ NEW: BADGE NOTIF REALTIME
    // =====================================================
    @auth
        function updateNotifBadge() {
            fetch('/chatbot/notifications/count')
                .then(r => r.json())
                .then(data => {
                    const badge = document.getElementById('chatbot-notif-badge');
                    if (badge) {
                        if (data.count > 0) {
                            badge.textContent = data.count;
                            badge.style.display = 'flex';
                            badge.style.animation = 'pulseBadge 2s infinite';
                        } else {
                            badge.style.display = 'none';
                        }
                    }
                }).catch(() => { });
        }
        updateNotifBadge();
        setInterval(updateNotifBadge, 30000);
    @endauth

    // =====================================================
    // STARTER RESPONSES (auto-reply tanpa API)
    // =====================================================
    const starterResponses = {
        'Siapa Nazarullah?': {
            response: `⭐ **Nazarullah - The Mastermind Behind PPBJ System**

Nazarullah (biasa dipanggil **Nazar**) adalah **Software Engineer** berbakat yang menciptakan sistem Monitoring PPBJ yang luar biasa ini! 🚀

**Sosok Luar Biasa:**
• 🧠 **Genius Developer** - Mampu merancang sistem kompleks dengan arsitektur yang sangat solid dan scalable
• 💎 **Visioner** - Memiliki visi jauh ke depan dalam mengembangkan solusi teknologi
• ⚡ **Problem Solver** - Setiap bug dipecahkan dengan elegan dan efisien
• 🎨 **Designer & Developer** - UI/UX modern dan user-friendly

**Keahlian Teknis:**
• Full-stack development (Laravel, PHP, JavaScript, MySQL)
• System Architecture & Database Design
• API Integration (termasuk AI seperti Groq!)
• Modern Frontend (Blade, Tailwind, animasi smooth)

**Fun Facts:**
• ☕ Powered by coffee and passion for technology
• 🌙 Night owl developer - ide brilian sering muncul tengah malam
• 📚 Continuous learner - always exploring new tech

**#CodingLegend #TechGenius #TheRealMVP**`,
            skipAPI: true
        },
        'Bagaimana cara tracking PR?': {
            response: `🔍 **Cara Tracking PR (Purchase Request)**

**Kabar Baik:** Anda BISA tracking PR **tanpa login!** 🎉

**Langkah-langkah:**
1. Klik menu **"Track PR"** di navbar
2. Masukkan Nomor PR (contoh: PR/2026/001)
3. Klik tombol **"Track"**

**📊 Progress PR:**
• **0%** - 📥 PR Diterima → Menunggu Proses Umum
• **20%** - 📋 Tender Dibuka → Menunggu Penawaran Vendor
• **40%** - 💰 SPH Diterima → Evaluasi Surat Penawaran
• **60%** - ✅ Awarding Selesai → Persiapan Kontrak
• **80%** - 📄 Kontrak Terbit → Menunggu Pengiriman
• **100%** - 🎉 Selesai! BPG Terbit

Ada pertanyaan lain? 😊`,
            skipAPI: true
        },
        'Bagaimana cara menggunakan sistem PPBJ?': {
            response: `🚀 **Panduan Menggunakan Sistem PPBJ**

**Menu Utama:**
• **Dashboard** - Ringkasan SLA & grafik status
• **Management PPBJ** - Input, edit, import/export Excel
• **Laporan** - Generate & export laporan
• **Approval PR** - Review PR (khusus Umum)

💡 **Tips:** Gunakan fitur filter dan pencarian untuk mempercepat akses data!`,
            skipAPI: true
        },
        'Bagaimana cara import data Excel?': {
            response: `📤 **Cara Import Data Excel**

1. Klik tombol **"Import Excel"**
2. Klik **"Download Template Excel"**
3. Isi data di template (format tanggal: YYYY-MM-DD)
4. Upload file kembali
5. Cek preview → klik **"Proses Import"**

⚠️ **Penting:**
- Nomor PPBJ harus unik
- Tidak boleh ada kolom kosong
- Format tanggal: YYYY-MM-DD`,
            skipAPI: true
        },
        'Jelaskan tentang status SLA': {
            response: `📊 **Status SLA (Service Level Agreement)**

• 🟢 **ON TRACK** - Sisa waktu > 2 hari, aman
• 🟡 **WARNING** - Sisa 1-2 hari, perlu percepatan
• 🔴 **OVERDUE** - Melewati deadline, URGENT!
• ⚫ **CANCELLED** - PPBJ dibatalkan

💡 Cek dashboard SLA setiap hari dan prioritaskan yang WARNING & OVERDUE!`,
            skipAPI: true
        },
    };

    // =====================================================
    // TOGGLE FUNCTION
    // =====================================================
    function toggleChatbot() {
        const panel = document.getElementById('chatbot-window-panel');
        const iconChat = document.getElementById('icon-chat');
        const iconClose = document.getElementById('icon-close');
        const isHidden = panel.style.display === 'none' || panel.style.display === '';

        if (isHidden) {
            // === LOGIKA SMART POSITIONING (DESKTOP SAJA) ===
            // Kita cek ukuran layar, jika mobile (<=640px) biarkan CSS full screen yang mengatur
            if (window.innerWidth > 640) {
                const btn = document.getElementById('chatbot-toggle-btn');
                const rect = btn.getBoundingClientRect();
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;

                // 1. Penyesuaian Horizontal (Kiri/Kanan)
                // Jika tombol di setengah kiri layar, buka panel ke kanan (align left)
                // Jika tombol di setengah kanan layar, buka panel ke kiri (align right - default)
                if (rect.left < (windowWidth / 2)) {
                    panel.style.left = '0';
                    panel.style.right = 'auto';
                } else {
                    panel.style.right = '0';
                    panel.style.left = 'auto';
                }

                // 2. Penyesuaian Vertikal (Atas/Bawah)
                // Jika tombol terlalu di atas (misal < 450px dari atas), buka panel ke bawah
                // Jika tidak, buka ke atas (default)
                if (rect.top < 450) {
                    // Buka ke bawah
                    panel.style.bottom = 'auto';
                    panel.style.top = (btn.offsetHeight + 10) + 'px'; // 10px jarak dari tombol
                } else {
                    // Buka ke atas (default)
                    panel.style.top = 'auto';
                    panel.style.bottom = '80px';
                }
            }

            // Tampilkan panel
            panel.style.display = 'flex';
            iconChat.style.display = 'none';
            iconClose.style.display = 'block';

            if (!greetingLoaded) {
                greetingLoaded = true;
                applyTimeGreeting();
            }
            setTimeout(() => document.getElementById('chatbot-input').focus(), 100);
        } else {
            panel.style.display = 'none';
            iconChat.style.display = 'block';
            iconClose.style.display = 'none';
        }
    }

    // Click outside to close
    document.addEventListener('click', function (e) {
        const widget = document.getElementById('ppbj-chatbot-widget');
        const panel = document.getElementById('chatbot-window-panel');
        const modal = document.getElementById('clear-confirm-modal');
        if (panel.style.display === 'flex' && !widget.contains(e.target) && modal.style.display === 'none') {
            toggleChatbot();
        }
    });

    // =====================================================
    // SEND STARTER MESSAGE
    // =====================================================
    function sendStarterMessage(text) {
        const suggestions = document.getElementById('starter-suggestions');
        if (suggestions) suggestions.style.display = 'none';

        appendMessage(text, 'user');

        if (starterResponses[text]?.skipAPI) {
            showTyping();
            setTimeout(() => {
                removeTyping();
                appendMessage(starterResponses[text].response, 'assistant');
                conversationHistory.push({ role: 'user', content: text });
                conversationHistory.push({ role: 'assistant', content: starterResponses[text].response });
            }, 800);
            return;
        }

        document.getElementById('chatbot-input').value = text;
        sendMessage(new Event('submit'));
    }

    // =====================================================
    // SEND QUICK REPLY
    // =====================================================
    function sendQuickReply(text) {
        document.getElementById('chatbot-input').value = text;
        sendMessage(new Event('submit'));
    }

    // =====================================================
    // CHECK IF ABOUT NAZAR
    // =====================================================
    function checkIfAboutNazar(message) {
        const keywords = ['nazarullah', 'nazar', 'pembuat sistem', 'developer sistem', 'yang buat sistem', 'creator', 'pembuat ppbj', 'developer ppbj'];
        return keywords.some(k => message.toLowerCase().includes(k));
    }

    // =====================================================
    // ✅ NEW: CHECK IF FEEDBACK REQUEST
    // =====================================================
    function checkIfFeedback(message) {
        const keywords = ['feedback', 'kirim pesan', 'kirim feedback', 'keluhan', 'saran', 'kritik', 'usul', 'lapor'];
        return keywords.some(k => message.toLowerCase().includes(k));
    }

    // =====================================================
    // SEND MESSAGE
    // =====================================================
    async function sendMessage(e) {
        e.preventDefault();
        if (isLoading) return;

        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        if (!message) return;

        const suggestions = document.getElementById('starter-suggestions');
        if (suggestions) suggestions.style.display = 'none';

        input.disabled = true;
        document.getElementById('send-btn').disabled = true;
        input.value = '';

        appendMessage(message, 'user');
        conversationHistory.push({ role: 'user', content: message });

        // Special: Nazar easter egg
        if (checkIfAboutNazar(message)) {
            isLoading = true;
            showTyping();
            setTimeout(() => {
                removeTyping();
                const resp = starterResponses['Siapa Nazarullah?'].response;
                appendMessage(resp, 'assistant');
                conversationHistory.push({ role: 'assistant', content: resp });
                isLoading = false;
                input.disabled = false;
                document.getElementById('send-btn').disabled = false;
                input.focus();
            }, 1000);
            return;
        }

        isLoading = true;
        showTyping();

        try {
            const token = document.querySelector('meta[name="csrf-token"]');
            const response = await fetch('/chatbot/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': token ? token.content : ''
                },
                body: JSON.stringify({ message, conversation: conversationHistory })
            });

            const data = await response.json();
            removeTyping();

            if (data.success && data.message) {
                appendMessage(data.message, 'assistant');
                conversationHistory.push({ role: 'assistant', content: data.message });
            } else {
                appendMessage(data.message || 'Maaf, terjadi kesalahan pada server.', 'assistant', true);
            }

        } catch (error) {
            removeTyping();
            appendMessage('Tidak dapat terhubung ke server. Cek koneksi internet Anda.', 'assistant', true);
        } finally {
            isLoading = false;
            input.disabled = false;
            document.getElementById('send-btn').disabled = false;
            input.focus();
        }
    }

    // =====================================================
    // APPEND MESSAGE
    // =====================================================
    function appendMessage(text, sender, isError = false) {
        const container = document.getElementById('chatbot-msg-container');
        const div = document.createElement('div');
        const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        // Escape first, then apply only the formatting rules we support.
        const formatted = escapeHtml(String(text))
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');

        if (sender === 'user') {
            div.style.cssText = "display:flex; justify-content:flex-end; animation:fadeIn 0.3s;";
            div.innerHTML = `
                <div style="background:linear-gradient(90deg,#2563eb,#7c3aed); color:white; padding:12px 16px; border-radius:18px; border-top-right-radius:4px; max-width:80%; font-size:14px;">
                    ${escapeHtml(text)}
                    <div style="font-size:10px; opacity:0.8; margin-top:4px; text-align:right;">${time}</div>
                </div>`;
        } else {
            const bg = isError ? '#fef2f2' : 'white';
            const tc = isError ? '#991b1b' : '#374151';
            const border = isError ? '#fecaca' : '#e5e7eb';
            div.style.cssText = "display:flex; align-items:flex-start; gap:8px; animation:fadeIn 0.3s;";
            div.innerHTML = `
                <div style="width:34px; height:34px; background:linear-gradient(135deg,#3b82f6,#8b5cf6); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:16px; flex-shrink:0;">🤖</div>
                <div style="background:${bg}; padding:12px 16px; border-radius:18px; border-top-left-radius:4px; max-width:85%; box-shadow:0 1px 2px rgba(0,0,0,0.05); border:1px solid ${border};">
                    <div style="font-size:14px; line-height:1.5; color:${tc};">${formatted}</div>
                    <div style="font-size:10px; color:#9ca3af; margin-top:6px;">${time}</div>
                </div>`;
        }

        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    // =====================================================
    // TYPING INDICATOR
    // =====================================================
    function showTyping() {
        const container = document.getElementById('chatbot-msg-container');
        const div = document.createElement('div');
        div.id = 'typing-indicator';
        div.style.cssText = "display:flex; align-items:flex-start; gap:8px;";
        div.innerHTML = `
            <div style="width:34px; height:34px; background:linear-gradient(135deg,#3b82f6,#8b5cf6); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:16px; flex-shrink:0;">🤖</div>
            <div style="background:white; padding:12px 16px; border-radius:18px; border-top-left-radius:4px; border:1px solid #e5e7eb;">
                <div style="display:flex; gap:4px;">
                    <span style="width:8px; height:8px; background:#9ca3af; border-radius:50%; animation:bounce 1s infinite;"></span>
                    <span style="width:8px; height:8px; background:#9ca3af; border-radius:50%; animation:bounce 1s infinite 0.2s;"></span>
                    <span style="width:8px; height:8px; background:#9ca3af; border-radius:50%; animation:bounce 1s infinite 0.4s;"></span>
                </div>
            </div>`;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    function removeTyping() {
        const el = document.getElementById('typing-indicator');
        if (el) el.remove();
    }

    // =====================================================
    // CLEAR CHAT
    // =====================================================
    function showClearConfirmation() {
        document.getElementById('clear-confirm-modal').style.display = 'flex';
    }
    function hideClearConfirmation() {
        document.getElementById('clear-confirm-modal').style.display = 'none';
    }

    function confirmClearConversation() {
        const container = document.getElementById('chatbot-msg-container');
        container.innerHTML = `
            <div style="display:flex; align-items:flex-start; gap:8px; animation:fadeIn 0.5s;">
                <div style="width:34px; height:34px; background:linear-gradient(135deg,#3b82f6,#8b5cf6); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:16px; flex-shrink:0;">🤖</div>
                <div style="background:white; padding:12px 16px; border-radius:18px; border-top-left-radius:4px; max-width:85%; box-shadow:0 1px 2px rgba(0,0,0,0.05); border:1px solid #e5e7eb;">
                    <p style="margin:0; font-size:14px; line-height:1.5; color:#374151;">
                        ✅ Percakapan telah dihapus. Ada yang bisa saya bantu lagi?
                    </p>
                </div>
            </div>
            <div id="starter-suggestions" style="display:flex; flex-direction:column; gap:8px; animation:fadeIn 0.7s; margin-top:16px;">
                <div style="text-align:center; font-size:11px; color:#6b7280;">💡 Pertanyaan yang sering ditanyakan:</div>
                <button onclick="sendStarterMessage('Bagaimana cara tracking PR?')" class="starter-btn">🔍 Cara tracking PR (tanpa login!)</button>
                <button onclick="sendStarterMessage('Siapa Nazarullah?')" class="starter-btn">⭐ Siapa Nazarullah?</button>
                <button onclick="sendStarterMessage('Bagaimana cara menggunakan sistem PPBJ?')" class="starter-btn">🚀 Cara menggunakan sistem PPBJ</button>
                <button onclick="sendStarterMessage('Bagaimana cara import data Excel?')" class="starter-btn">📤 Cara import data Excel</button>
                <button onclick="sendStarterMessage('Jelaskan tentang status SLA')" class="starter-btn">📊 Penjelasan Status SLA</button>
            </div>`;

        conversationHistory = [];
        hideClearConfirmation();
        greetingLoaded = false;
        applyTimeGreeting();

        fetch('/chatbot/clear', { method: 'DELETE' }).catch(() => { });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ==========================================
    // LOGIC DRAGGABLE (FIXED: ANTI HILANG MOBILE)
    // ==========================================
    (function () {
        const widget = document.getElementById('ppbj-chatbot-widget');
        const btn = document.getElementById('chatbot-toggle-btn');

        let isDragging = false;
        let hasMoved = false;
        let startX, startY, initialLeft, initialTop;

        // FUNGSI UTAMA: Pastikan tombol selalu kelihatan di layar
        const ensureInView = () => {
            const rect = widget.getBoundingClientRect();
            const btnW = btn.offsetWidth || 65;
            const btnH = btn.offsetHeight || 65;
            const margin = 15;

            // Cek X (Kiri/Kanan)
            let targetX = rect.left;
            if (targetX < 0) targetX = margin; // Jika terlalu kiri
            if (targetX > window.innerWidth - btnW) targetX = window.innerWidth - btnW - margin; // Jika terlalu kanan

            // Cek Y (Atas/Bawah)
            let targetY = rect.top;
            if (targetY < 0) targetY = margin; // Jika terlalu atas
            if (targetY > window.innerHeight - btnH) targetY = window.innerHeight - btnH - margin; // Jika terlalu bawah

            // Terapkan posisi yang aman
            widget.style.left = targetX + 'px';
            widget.style.top = targetY + 'px';
            widget.style.right = 'auto';
            widget.style.bottom = 'auto';

            // Simpan posisi aman ini
            localStorage.setItem('chatbot_pos', JSON.stringify({
                left: targetX,
                top: targetY
            }));
        };

        // 1. Load posisi & Langsung Perbaiki jika di luar layar
        const savedPos = localStorage.getItem('chatbot_pos');
        if (savedPos) {
            const pos = JSON.parse(savedPos);
            // Terapkan dulu posisi tersimpan
            widget.style.left = pos.left + 'px';
            widget.style.top = pos.top + 'px';
            widget.style.right = 'auto';
            widget.style.bottom = 'auto';
        }

        // Jalankan pengecekan agar tidak hilang (INITIAL CHECK)
        // Menggunakan setTimeout sedikit agar layout mobile stabil
        setTimeout(ensureInView, 100);

        const startDrag = (e) => {
            if (e.target.closest('#chatbot-notif-badge')) return;

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            startX = clientX;
            startY = clientY;

            const rect = widget.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;

            isDragging = false;
            hasMoved = false;

            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', onDrag, { passive: false });
            document.addEventListener('touchend', stopDrag);
        };

        const onDrag = (e) => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const dx = clientX - startX;
            const dy = clientY - startY;

            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                hasMoved = true;
                if (!isDragging) {
                    isDragging = true;
                    btn.classList.add('dragging');
                }
            }

            if (isDragging) {
                e.preventDefault();

                let newX = initialLeft + dx;
                let newY = initialTop + dy;

                // Batasi hanya saat drag, biar tidak aneh
                const maxX = window.innerWidth - btn.offsetWidth;
                const maxY = window.innerHeight - btn.offsetHeight;

                newX = Math.max(0, Math.min(newX, maxX));
                newY = Math.max(0, Math.min(newY, maxY));

                widget.style.left = newX + 'px';
                widget.style.top = newY + 'px';
                widget.style.right = 'auto';
                widget.style.bottom = 'auto';
            }
        };

        const stopDrag = () => {
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchmove', onDrag);
            document.removeEventListener('touchend', stopDrag);

            btn.classList.remove('dragging');

            if (isDragging) {
                // Snap to edge jika di mobile
                if (window.innerWidth <= 640) {
                    const currentLeft = parseInt(widget.style.left);
                    const halfScreen = window.innerWidth / 2;
                    widget.style.transition = 'left 0.2s ease';

                    if (currentLeft < halfScreen) {
                        widget.style.left = '15px';
                    } else {
                        widget.style.left = (window.innerWidth - btn.offsetWidth - 15) + 'px';
                    }

                    setTimeout(() => {
                        widget.style.transition = 'none';
                        ensureInView(); // Pastikan final aman
                    }, 200);
                } else {
                    ensureInView(); // Pastikan final aman di Desktop
                }
            } else {
                toggleChatbot();
            }
        };

        btn.addEventListener('mousedown', startDrag);
        btn.addEventListener('touchstart', startDrag, { passive: false });

        // Resize listener: Jika rotate layar, cek posisi lagi
        window.addEventListener('resize', ensureInView);

    })();
</script>
