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

@php
    $chatbotConfig = [
        'authenticated' => auth()->check(),
        'department' => auth()->user()?->dept ?? '',
        'firstName' => explode(' ', auth()->user()?->name ?? 'Kawan')[0],
    ];
@endphp
<script>
    window.CHATBOT_CONFIG = @json($chatbotConfig);
</script>
<script src="{{ asset('assets/app/chatbot-loader.js') }}?v={{ filemtime(public_path('assets/app/chatbot-loader.js')) }}"
    data-runtime-url="{{ asset('assets/app/chatbot.js') }}?v={{ filemtime(public_path('assets/app/chatbot.js')) }}" defer></script>
