let conversationHistory = [];
    let isLoading = false;
    let greetingLoaded = false;
    const isAuthenticated = Boolean(window.CHATBOT_CONFIG?.authenticated);
    const userDept = window.CHATBOT_CONFIG?.department || '';
    const userName = window.CHATBOT_CONFIG?.firstName || 'Kawan';

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
                ${emoji} <strong>${greeting}, ${escapeHtml(userName)}!</strong><br><br>
                ${subtitle} Saya <strong>PPBJ Assistant</strong>, siap membantu Anda. 😊
            `;
        }
    }

    // =====================================================
    // ✅ NEW: BADGE NOTIF REALTIME
    // =====================================================
if (isAuthenticated) {
        let badgeRequestPending = false;
        let badgeTimer = null;
        function updateNotifBadge() {
            if (document.hidden || badgeRequestPending) return;
            badgeRequestPending = true;
            fetch('/chatbot/notifications/count', { headers: { Accept: 'application/json' } })
                .then(r => { if (!r.ok) throw new Error('Notifikasi belum tersedia'); return r.json(); })
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
                }).catch(() => { }).finally(() => { badgeRequestPending = false; });
        }
        function startBadgePolling() {
            if (document.hidden || badgeTimer) return;
            updateNotifBadge();
            badgeTimer = setInterval(updateNotifBadge, 120000);
        }
        function stopBadgePolling() { clearInterval(badgeTimer); badgeTimer = null; }
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopBadgePolling();
            else startBadgePolling();
        });
        window.addEventListener('pagehide', stopBadgePolling);
        window.addEventListener('pageshow', startBadgePolling);
        startBadgePolling();
    }

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
