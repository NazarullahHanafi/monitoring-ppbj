
        /* ═══ SIDEBAR ═══ */
        (function () {
            document.querySelectorAll('.nav-item').forEach(function (el) { el.addEventListener('click', function (e) { var r = this.getBoundingClientRect(), s = document.createElement('span'); s.style.cssText = 'width:20px;height:20px;left:' + (e.clientX - r.left - 10) + 'px;top:' + (e.clientY - r.top - 10) + 'px'; s.classList.add('ripple'); this.appendChild(s); setTimeout(function () { s.remove() }, 600) }) });
            if (localStorage.getItem('sidebar_collapsed') === '1') applyDC(true);
            function applyDC(c) { var el = document.getElementById('sidebarDesktop'); if (!el) return; el.classList.toggle('w-20', c); el.classList.toggle('w-64', !c); document.querySelectorAll('#sidebarDesktop .nav-text').forEach(function (t) { if (c) { t.style.opacity = '0'; t.style.transform = 'translateX(-10px)'; setTimeout(function () { t.classList.add('hidden') }, 300) } else { t.classList.remove('hidden'); setTimeout(function () { t.style.opacity = '1'; t.style.transform = 'translateX(0)' }, 50) } }); var ti = document.querySelector('#sidebarDesktop .sidebar-text'); if (ti) { if (c) { ti.style.opacity = '0'; setTimeout(function () { ti.classList.add('hidden') }, 300) } else { ti.classList.remove('hidden'); setTimeout(function () { ti.style.opacity = '1' }, 50) } } }
            function tSD() { var c = document.getElementById('sidebarDesktop') && document.getElementById('sidebarDesktop').classList.contains('w-20'); applyDC(!c); localStorage.setItem('sidebar_collapsed', !c ? '1' : '0') }
            function oSM() { var w = document.getElementById('sidebarMobileWrapper'); if (!w) return; w.classList.remove('hidden'); void w.offsetWidth; requestAnimationFrame(function () { document.getElementById('sidebarMobile') && document.getElementById('sidebarMobile').classList.remove('-translate-x-full') }) }
            function cSM() { document.getElementById('sidebarMobile') && document.getElementById('sidebarMobile').classList.add('-translate-x-full'); setTimeout(function () { document.getElementById('sidebarMobileWrapper') && document.getElementById('sidebarMobileWrapper').classList.add('hidden') }, 300) }
            var b = document.getElementById('btnToggleSidebar'); if (b) b.addEventListener('click', tSD);
            var b2 = document.getElementById('btnOpenMobile'); if (b2) b2.addEventListener('click', oSM);
            var b3 = document.getElementById('btnCloseMobile'); if (b3) b3.addEventListener('click', cSM);
            var b4 = document.getElementById('overlayCloseMobile'); if (b4) b4.addEventListener('click', cSM);
            document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { cSM(); cPP(); if (window._chatOpen) { if (window._chatHandleEscape) window._chatHandleEscape(); else window._chatToggle() } hideCtx() } });
        })();

        /* ═══ THEME ═══ */
        (function () {
            var root = document.documentElement;
            var button = document.getElementById('themeToggle');
            if (!button) return;

            var indicator = button.querySelector('div');

            function syncThemeButton() {
                if (!indicator) return;
                indicator.style.transform = root.classList.contains('dark') ? 'rotate(180deg)' : 'rotate(0deg)';
            }

            syncThemeButton();
            document.addEventListener('app:theme-changed', syncThemeButton);

            button.addEventListener('click', function () {
                if (window.toggleThemeMode) {
                    window.toggleThemeMode();
                } else {
                    root.classList.toggle('dark');
                    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
                }

                syncThemeButton();
                button.classList.add('animate-pulse');
                setTimeout(function () {
                    button.classList.remove('animate-pulse');
                }, 300);
            });
        })();

        /* ═══ PRESENCE + MOOD ═══ */
        var cPP;
        (function () {
            var APP_SHELL = window.APP_SHELL_CONFIG || {};
            var UH = APP_SHELL.presenceHeartbeatUrl || '/presence/heartbeat', UG = APP_SHELL.presenceMoodGetUrl || '/presence/mood', US = APP_SHELL.presenceMoodUrl || '/presence/mood',
                CSRF = (document.querySelector('meta[name="csrf-token"]') || {}).content || '', IV = 120000, MA = 4,
                CL = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6', '#f97316', '#84cc16', '#06b6d4', '#a855f7'],
                MO = [{ e: '\u{1F604}', l: 'Senang', d: 'Hari menyenangkan!' }, { e: '\u{1F60A}', l: 'Baik', d: 'Berjalan lancar' }, { e: '\u{1F60E}', l: 'Keren', d: 'On top of the world' }, { e: '\u{1F525}', l: 'Semangat', d: "Full energy!" }, { e: '\u{1F389}', l: 'Eksis', d: 'Ada spesial' }, { e: '\u{1F62E}', l: 'Wow', d: 'Banyak kejutan' }, { e: '\u{1F610}', l: 'Biasa', d: 'Gitu aja' }, { e: '\u{1F62B}', l: 'Lelah', d: 'Butuh kopi' }, { e: '\u{1F971}', l: 'Ngantuk', d: 'Mata 5 watt, jiwa tetap online ☕' }, { e: '\u{1F60C}', l: 'Santuy', d: 'Pelan-pelan asal kelar, bestie' }, { e: '\u{1F92F}', l: 'Overthinking', d: 'Mikirnya kejauhan, kerjaan tetap jalan' }, { e: '\u{1FAE0}', l: 'Meleleh', d: 'Capek tipis, tetap elegan awkwk' }, { e: '\u{1F4BC}', l: 'Sibuk', d: 'Mode fokus, balasnya kalau semesta mengizinkan' }, { e: '\u{1F6B6}', l: 'Away', d: 'Lagi geser dari radar, nanti muncul lagi' }, { e: '\u{26D4}', l: 'Jangan Ganggu', d: 'Sedang bertapa digital, urgent boleh colek' }, { e: '\u{1F621}', l: 'Badmood', d: 'Butuh ruang dulu, jangan disenggol 😅' }, { e: '\u{1F622}', l: 'Sedih', d: 'Besok lebih baik' }, { e: '\u{1F912}', l: 'Sakit', d: 'Tidak enak badan' }];
            var MY_GENDER = APP_SHELL.userGender || null, MY_NAME = APP_SHELL.userName || 'User';
            var tm = null, pO = false, myM = null, mC = false, mS = false;
            window._presenceUsers = [];
            function eH(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') }
            function moodText(mood) { for (var mi = 0; mi < MO.length; mi++) { if (MO[mi].e === mood) return MO[mi].l + ' — ' + MO[mi].d } return mood || '' }
            function ensurePresenceScrollTools() {
                var list = document.getElementById('ppList'), panel = document.getElementById('presencePanel');
                if (!list || !panel) return;

                var tools = document.getElementById('ppScrollTools');
                if (!tools) {
                    tools = document.createElement('div');
                    tools.id = 'ppScrollTools';
                    tools.className = 'pp-scroll-tools';
                    tools.innerHTML = '<button type="button" class="pp-scroll-btn" id="ppScrollTop">Atas</button><button type="button" class="pp-scroll-btn" id="ppScrollBottom">Bawah</button>';

                    var footer = panel.querySelector('.pp-footer');
                    panel.insertBefore(tools, footer || null);

                    var topBtn = document.getElementById('ppScrollTop'), bottomBtn = document.getElementById('ppScrollBottom');
                    if (topBtn) topBtn.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); list.scrollTo({ top: 0, behavior: 'smooth' }); });
                    if (bottomBtn) bottomBtn.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' }); });
                    tools.addEventListener('click', function (e) { e.stopPropagation(); });
                }

                setTimeout(function () {
                    tools.classList.toggle('show', list.scrollHeight > list.clientHeight + 8);
                }, 40);
            }
            function render(u) {
                window._presenceUsers = u; var st = document.getElementById('avatarStack'), pl = document.getElementById('ppList'), c = u.length,
                    oc = document.getElementById('onlineCountLabel'), pc = document.getElementById('ppCount'), cp = document.getElementById('cpOnlineCount');
                if (oc) oc.textContent = c; if (pc) pc.textContent = c; if (cp) cp.textContent = c + ' orang online';
                var me = null; for (var i = 0; i < u.length; i++) { if (u[i].is_me) { me = u[i]; break } }
                if (me) myM = me.mood || null; window._myMood = myM || null; if (window.updateQuickMoodButton) window.updateQuickMoodButton(); var mf = document.getElementById('myMoodFloat'); if (mf) { if (myM) { mf.textContent = myM; mf.classList.remove('hidden') } else { mf.classList.add('hidden') } }
                if (st) { var v = u.slice(0, MA), ov = c - MA, h = ''; for (var j = 0; j < v.length; j++) { var x = v[j], xt = x.name + (x.mood ? ' • ' + x.mood + ' ' + moodText(x.mood) : ''); h += '<div class="av" style="background:' + x.color + '" title="' + eH(xt) + '">' + x.initials + (x.mood ? '<span class="mood-tag mood-tag-sm">' + x.mood + '</span>' : '') + '</div>' } if (ov > 0) h += '<div class="av av-overflow" title="' + ov + ' lainnya">+' + ov + '</div>'; st.innerHTML = h }
                if (pl) {
                    if (!c) { pl.innerHTML = '<div class="pp-empty">Tidak ada yang online</div>'; return }
                    var ph = '';
                    for (var k = 0; k < u.length; k++) {
                        var w = u[k], wt = w.name + (w.mood ? ' • ' + w.mood + ' ' + moodText(w.mood) : '');
                        var action = w.is_me
                            ? '<span class="pp-me-tag">Kamu</span>'
                            : '<button type="button" class="pp-chat-btn" data-uid="' + eH(w.id) + '" data-uname="' + eH(w.name) + '" data-mood="' + eH(w.mood || '') + '" title="Tanya mood ' + eH(w.name) + '">Chat mood</button>';
                        ph += '<div class="pp-row' + (w.is_me ? ' me' : '') + '" title="' + eH(wt) + '"><div class="pp-av" style="background:' + w.color + '">' + w.initials + (w.mood ? '<span class="mood-tag">' + w.mood + '</span>' : '') + '</div><div class="pp-info"><div class="pp-name">' + eH(w.name) + '</div><div class="pp-dept">' + eH(w.department) + (w.mood ? ' • ' + eH(moodText(w.mood)) : '') + '</div></div>' + action + '</div>';
                    }
                    pl.innerHTML = ph;
                }
            }
            function hb() { fetch(UH, { method: 'POST', headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json' } }).then(function (r) { if (!r.ok) throw 0; return r.json() }).then(function (d) { if (Array.isArray(d.online)) { render(d.online); ensurePresenceScrollTools(); } }).catch(function () { }) }
            function cmM() { if (mC) return; mC = true; fetch(UG, { headers: { 'Accept': 'application/json' } }).then(function (r) { if (!r.ok) throw 0; return r.json() }).then(function (d) { if (d.mood) { myM = d.mood; window._myMood = myM || null; if (window.updateQuickMoodButton) window.updateQuickMoodButton(); var mf = document.getElementById('myMoodFloat'); if (mf) { mf.textContent = myM; mf.classList.remove('hidden') } } else { setTimeout(sMP, 1500) } }).catch(function () { }) }
            function sMP() { if (typeof Swal !== 'undefined' && Swal.isVisible()) return; var de = document.createElement('div'); de.className = 'mood-desc'; de.textContent = 'Pilih salah satu'; var ge = document.createElement('div'); ge.className = 'mood-grid'; MO.forEach(function (m) { var b = document.createElement('button'); b.type = 'button'; b.className = 'mood-btn'; b.innerHTML = '<span class="m-emoji">' + m.e + '</span><span class="m-label">' + m.l + '</span>'; b.addEventListener('mouseenter', function () { de.textContent = m.d; de.style.color = '#6366f1' }); b.addEventListener('mouseleave', function () { de.textContent = 'Pilih salah satu'; de.style.color = '' }); b.addEventListener('click', function () { if (mS) return; mS = true; Swal.close(); fetch(US, { method: 'POST', headers: { 'X-CSRF-TOKEN': CSRF, 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ mood: m.e }) }).then(function (r) { if (!r.ok) throw 0; return r.json() }).then(function (d) { myM = d.mood; var mf = document.getElementById('myMoodFloat'); if (mf) { mf.textContent = myM; mf.classList.remove('hidden') } hb() }).catch(function () { myM = m.e; var mf = document.getElementById('myMoodFloat'); if (mf) { mf.textContent = myM; mf.classList.remove('hidden') } }).finally(function () { mS = false }); setTimeout(function () { Swal.fire({ html: '<div style="text-align:center;padding:12px 0"><div style="font-size:3.5rem;line-height:1">' + m.e + '</div><div style="font-size:.9rem;color:#111827;font-weight:700;margin-top:10px">' + m.l + '!</div><div style="font-size:.78rem;color:#9ca3af;margin-top:4px">' + m.d + '</div></div>', timer: 1600, timerProgressBar: true, showConfirmButton: false, background: 'rgba(255,255,255,.95)', backdrop: 'rgba(0,0,0,.08)', customClass: { popup: 'rounded-2xl shadow-2xl' } }) }, 200) }); ge.appendChild(b) }); var sb = document.createElement('button'); sb.type = 'button'; sb.className = 'mood-skip'; sb.textContent = 'Lewati dulu'; sb.addEventListener('click', function () { Swal.close() }); var ct = document.createElement('div'); ct.appendChild(ge); ct.appendChild(de); ct.appendChild(sb); Swal.fire({ title: 'Bagaimana harimu?', html: ct, showConfirmButton: false, showCloseButton: true, allowOutsideClick: false, background: 'rgba(255,255,255,.97)', backdrop: 'rgba(0,0,0,.15)', width: 'auto', padding: '0 0 4px 0', customClass: { popup: 'rounded-2xl shadow-2xl', closeButton: 'hover:rotate-90 transition-transform duration-300' }, didOpen: function () { ge.querySelectorAll('.mood-btn').forEach(function (b, i) { b.style.opacity = '0'; b.style.transform = 'translateY(15px) scale(.8)'; setTimeout(function () { b.style.transition = 'all .35s cubic-bezier(.68,-.55,.265,1.55)'; b.style.opacity = '1'; b.style.transform = 'translateY(0) scale(1)' }, 50 * i) }) } }) }
            function moodGreeting() {
                var h = new Date().getHours();
                var slot = h < 11 ? 'pagi' : (h < 15 ? 'siang' : (h < 18 ? 'sore' : 'malam'));
                var greet = slot === 'pagi' ? 'Selamat pagi' : (slot === 'siang' ? 'Selamat siang' : (slot === 'sore' ? 'Selamat sore' : 'Selamat malam'));
                var first = String(MY_NAME || 'User').trim().split(/\s+/)[0] || 'User';
                var isFemale = String(MY_GENDER || '').toLowerCase() === 'female';
                var nameLabel = first + (isFemale ? ' Cantik' : '');
                var jokes = {
                    pagi: isFemale ? 'Kamu terlihat indah hari ini. Mood dulu ya, biar kerjaan ikut happy awkwk.' : 'Kamu kelihatan siap menaklukkan hari ini. Mood dulu ya, biar dashboard ikut semangat.',
                    siang: isFemale ? 'Tetap glowing walau PR banyak. Setor mood dulu, habis itu kita gas pelan-pelan.' : 'Siang-siang tetap keren. Setor mood dulu, PR boleh banyak tapi tetap santuy.',
                    sore: isFemale ? 'Sore ini vibes kamu tetap manis. Pilih mood dulu, sistem siap nemenin.' : 'Sore-sore tetap solid. Pilih mood dulu, sistem siap nemenin sampai beres.',
                    malam: isFemale ? 'Malam ini kamu tetap cantik dan kuat. Mood dulu, biar lembur terasa agak manusiawi awkwk.' : 'Selamat malam, pejuang sistem. Mood dulu biar lembur terasa agak manusiawi awkwk.'
                };
                return { title: greet + ' ' + nameLabel + '!', text: jokes[slot] || jokes.pagi };
            }

            function sMPRequired() {
                if (typeof Swal === 'undefined') return;
                if (Swal.isVisible()) { setTimeout(sMPRequired, 900); return; }

                var dark = document.documentElement.classList.contains('dark'), grt = moodGreeting();
                var gr = document.createElement('div');
                gr.className = 'mood-greeting';
                gr.innerHTML = '<div class="mood-greeting-title">' + eH(grt.title) + '</div><div class="mood-greeting-text">' + eH(grt.text) + '</div>';

                var de = document.createElement('div');
                de.className = 'mood-desc';
                de.textContent = 'Pilih mood dulu ya — wajib, tapi santuy awkwk';

                var ge = document.createElement('div');
                ge.className = 'mood-grid';

                MO.forEach(function (m) {
                    var b = document.createElement('button');
                    b.type = 'button';
                    b.className = 'mood-btn';
                    b.innerHTML = '<span class="m-emoji">' + m.e + '</span><span class="m-label">' + m.l + '</span>';
                    b.addEventListener('mouseenter', function () { de.textContent = m.d; de.style.color = '#6366f1'; });
                    b.addEventListener('mouseleave', function () { de.textContent = 'Pilih mood dulu ya — wajib, tapi santuy awkwk'; de.style.color = ''; });
                    b.addEventListener('click', function () {
                        if (mS) return;
                        mS = true;
                        Swal.close();
                        fetch(US, {
                            method: 'POST',
                            headers: { 'X-CSRF-TOKEN': CSRF, 'Content-Type': 'application/json', 'Accept': 'application/json' },
                            body: JSON.stringify({ mood: m.e })
                        }).then(function (r) {
                            if (!r.ok) throw 0;
                            return r.json();
                        }).then(function (d) {
                            myM = d.mood || m.e;
                            window._myMood = myM || null;
                            if (window.updateQuickMoodButton) window.updateQuickMoodButton();
                            var mf = document.getElementById('myMoodFloat');
                            if (mf) { mf.textContent = myM; mf.classList.remove('hidden'); }
                            hb();
                        }).catch(function () {
                            myM = m.e;
                            window._myMood = myM || null;
                            var mf = document.getElementById('myMoodFloat');
                            if (mf) { mf.textContent = myM; mf.classList.remove('hidden'); }
                        }).finally(function () {
                            mS = false;
                        });

                        setTimeout(function () {
                            Swal.fire({
                                html: '<div style="text-align:center;padding:12px 0"><div style="font-size:3.5rem;line-height:1">' + m.e + '</div><div style="font-size:.95rem;color:' + (dark ? '#f8fafc' : '#111827') + ';font-weight:900;margin-top:10px">' + eH(m.l) + '!</div><div style="font-size:.78rem;color:' + (dark ? '#cbd5e1' : '#64748b') + ';font-weight:700;margin-top:4px">' + eH(m.d) + '</div></div>',
                                timer: 1500,
                                timerProgressBar: true,
                                showConfirmButton: false,
                                background: dark ? 'rgba(15,23,42,.98)' : 'rgba(255,255,255,.98)',
                                backdrop: 'rgba(0,0,0,.08)',
                                customClass: { popup: 'rounded-2xl shadow-2xl' }
                            });
                        }, 180);
                    });
                    ge.appendChild(b);
                });

                var note = document.createElement('div');
                note.className = 'mood-required-note';
                note.textContent = 'Mood wajib dipilih dulu sebelum lanjut buka aplikasi ✨';

                var ct = document.createElement('div');
                ct.appendChild(gr);
                ct.appendChild(ge);
                ct.appendChild(de);
                ct.appendChild(note);

                Swal.fire({
                    title: 'Mood check dulu 😄',
                    html: ct,
                    showConfirmButton: false,
                    showCloseButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    background: dark ? 'rgba(15,23,42,.98)' : 'rgba(255,255,255,.98)',
                    backdrop: 'rgba(0,0,0,.18)',
                    width: 'auto',
                    padding: '0 0 8px 0',
                    customClass: { popup: 'rounded-2xl shadow-2xl' },
                    didOpen: function () {
                        ge.querySelectorAll('.mood-btn').forEach(function (b, i) {
                            b.style.opacity = '0';
                            b.style.transform = 'translateY(15px) scale(.8)';
                            setTimeout(function () {
                                b.style.transition = 'all .35s cubic-bezier(.68,-.55,.265,1.55)';
                                b.style.opacity = '1';
                                b.style.transform = 'translateY(0) scale(1)';
                            }, 45 * i);
                        });
                    }
                });
            }

            sMP = sMPRequired;
            window.showMoodPicker = sMP;
            function tPP() { pO = !pO; var p = document.getElementById('presencePanel'); if (p) p.classList.toggle('open', pO); if (pO) setTimeout(ensurePresenceScrollTools, 80) }
            cPP = function () { pO = false; var p = document.getElementById('presencePanel'); if (p) p.classList.remove('open') };
            window.closePresencePanel = cPP;
            window.addEventListener('resize', ensurePresenceScrollTools);
            document.addEventListener('click', function (e) {
                var moodBtn = e.target.closest('.pp-chat-btn');
                if (!moodBtn) return;
                e.preventDefault();
                e.stopPropagation();
                var payload = {
                    id: moodBtn.getAttribute('data-uid') || '',
                    name: moodBtn.getAttribute('data-uname') || 'teman',
                    mood: moodBtn.getAttribute('data-mood') || ''
                };
                if (typeof window.quickMoodChat === 'function') {
                    window.quickMoodChat(payload);
                }
            });
            var pt = document.getElementById('presenceTrigger'); if (pt) pt.addEventListener('click', function (e) { e.stopPropagation(); tPP() });
            var mb = document.getElementById('btnChangeMood'); if (mb) mb.addEventListener('click', sMP);
            document.addEventListener('click', function (e) { var w = document.getElementById('presenceWrap'); if (pO && w && !w.contains(e.target)) cPP() });
            function start() { if (tm) return; hb(); cmM(); tm = setInterval(hb, IV) } function stop() { clearInterval(tm); tm = null }
            document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start() }); if (!document.hidden) start();
        })();

        /* ═══════════════════════════════════════
   LIVE CHAT — @ Badge, persisten via database
═══════════════════════════════════════ */
        (function () {
            var URL_MSGS = '/chat/messages', URL_MENTION_COUNT = '/chat/mentions/unread', URL_SEND = '/chat/send', URL_DEL = '/chat/',
                URL_READ = '/chat/read', URL_READS = '/chat/', URL_USERS = '/chat/users', URL_SEARCH = '/chat/search',
                URL_REACTIONS = '/chat/reactions', URL_REACT = '/chat/', URL_SHARE = '/chat/share',
                URL_FOLLOWUPS = '/chat/followups', URL_FOLLOWUP = '/chat/followup', URL_QUICK_MOOD = '/chat/quick-mood',
                CSRF = (document.querySelector('meta[name="csrf-token"]') || {}).content || '',
                MY_ID = Number(APP_SHELL.userId || 0), MAX_LEN = 500,
                EMOJIS = ['\u{1F604}', '\u{1F60A}', '\u{1F44D}', '\u{1F525}', '\u2764\uFE0F', '\u{1F389}', '\u{1F602}', '\u{1F914}', '\u{1F60E}', '\u{1F4AF}', '\u{1F64F}', '\u2705'],
                REACTION_EMOJIS = ['\u{1F44D}', '\u2764\uFE0F', '\u{1F602}', '\u{1F62E}', '\u{1F622}', '\u{1F64F}'],
                UCLS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6', '#f97316', '#84cc16', '#06b6d4', '#a855f7'];

            var chatOpen = false, chatFullscreen = false, chatMinimized = false, chatMaxId = 0, chatTimer = null, reactionTimer = null, mentionTimer = null, mentionRequestPending = false, replyToId = null, replyUser = null, unread = 0, sending = false;
            var mentionUnread = 0;
            var draftMentions = [];
            var mentionState = { active: false, start: 0, query: '' };
            var followupState = { active: false, start: 0, query: '', items: [], selected: 0, timer: null, loading: false };
            var activeReadPopup = null, activeReadAnchor = null, activeReadRequestToken = 0, quickMoodBtn = null;
            var ctxMsgData = null;
            var allUsersLoaded = null;
            var swalActive = false;
            var searchTimer = null, searchSequence = 0;
            var historyHasMore = false, historyLoading = false;
            var notifyEnabled = localStorage.getItem('chat_notify_' + MY_ID) === '1';
            var soundEnabled = localStorage.getItem('chat_sound_' + MY_ID) === '1';
            var summaryInitialized = false, lastSummaryMessageId = 0, audioContext = null, notificationWorkerPromise = null;

            /* ✅ Set pesan mention yang sudah dilihat (dari database i_read) */
            var seenMentionIds = {};

            function markMentionSeen(msgId) {
                seenMentionIds[String(msgId)] = true;
            }

            function isMentionSeen(msgId) {
                return !!seenMentionIds[String(msgId)];
            }

            var panel = document.getElementById('chatPanel'), trigger = document.getElementById('chatTrigger'), badge = document.getElementById('chatBadge'),
                mentionBadgeEl = document.getElementById('chatMentionBadge'),
                cpHeadMention = document.getElementById('cpHeadMention'),
                messagesEl = document.getElementById('cpMessages'), emptyEl = document.getElementById('cpEmpty'), inp = document.getElementById('cpInput'),
                sendBtn = document.getElementById('cpSendBtn'), charEl = document.getElementById('cpChar'), emojiRow = document.getElementById('cpEmojiRow'),
                mentionDd = document.getElementById('mentionDd'), mentionDdList = document.getElementById('mentionDdList'),
                followupDd = document.getElementById('followupDd'), followupDdList = document.getElementById('followupDdList'),
                ctxMenu = document.getElementById('ctxMenu'), ctxReactions = document.getElementById('ctxReactions'),
                searchBtn = document.getElementById('cpSearchBtn'), searchPanel = document.getElementById('cpSearchPanel'),
                searchInput = document.getElementById('cpSearchInput'), searchClose = document.getElementById('cpSearchClose'),
                searchStatus = document.getElementById('cpSearchStatus'), searchResults = document.getElementById('cpSearchResults'),
                notifyBtn = document.getElementById('cpNotifyBtn'), fullscreenBtn = document.getElementById('cpFullscreenBtn'),
                minimizeBtn = document.getElementById('cpMinimizeBtn'), chatHead = panel ? panel.querySelector('.cp-head') : null;

            function eH(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') }
            function isChatReadable() { return chatOpen && !chatMinimized && !document.hidden }
            function isNB() { if (!messagesEl) return true; return messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight < 80 }
            function sBB() { if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight }
            function sE(show) {
                if (!messagesEl) return;
                var current = messagesEl.querySelector('.cp-empty');
                if (!show) { if (current) current.remove(); return }
                if (!current) {
                    current = document.createElement('div'); current.className = 'cp-empty'; current.id = 'cpEmpty';
                    current.innerHTML = '<div class="cp-empty-icon">\u{1F4AC}</div><div class="cp-empty-text">Belum ada pesan.<br>Mulai percakapan sekarang!</div>';
                    messagesEl.appendChild(current);
                }
            }
            function renderHistoryControl() {
                if (!messagesEl) return;
                var old = messagesEl.querySelector('.cp-history-control'); if (old) old.remove();
                if (!historyHasMore) return;
                var holder = document.createElement('div'); holder.className = 'cp-history-control';
                var button = document.createElement('button'); button.type = 'button'; button.className = 'cp-load-older';
                button.disabled = historyLoading; button.textContent = historyLoading ? 'Memuat riwayat...' : 'Muat pesan lebih lama';
                holder.appendChild(button); messagesEl.insertBefore(holder, messagesEl.firstChild);
            }
            function rSB() { if (!sendBtn || !inp) return; sendBtn.disabled = sending || !inp.value.trim() || inp.value.length > MAX_LEN }
            function uB() { if (!badge) return; badge.textContent = unread > 9 ? '9+' : unread; if (unread > 0) badge.classList.add('visible'); else badge.classList.remove('visible') }

            function updateMentionBadges() {
                var c = mentionUnread;
                if (mentionBadgeEl) {
                    if (c > 0) { mentionBadgeEl.textContent = '@' + c; mentionBadgeEl.style.display = 'flex'; mentionBadgeEl.classList.add('has-count') }
                    else { mentionBadgeEl.textContent = '@'; mentionBadgeEl.style.display = 'none'; mentionBadgeEl.classList.remove('has-count') }
                }
                if (cpHeadMention) {
                    if (c > 0) { cpHeadMention.textContent = '@' + c; cpHeadMention.style.display = 'inline' }
                    else { cpHeadMention.style.display = 'none' }
                }
            }

            function refreshMentionSummary() {
                if (isChatReadable() || mentionRequestPending) return;
                mentionRequestPending = true;
                fetch(URL_MENTION_COUNT, { headers: { 'Accept': 'application/json' } })
                    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json() })
                    .then(function (data) {
                        mentionUnread = Math.max(0, parseInt(data.count, 10) || 0);
                        unread = Math.max(0, parseInt(data.unread_count, 10) || 0);
                        uB();
                        updateMentionBadges();
                        handleSummaryNotification(data.latest_message || null);
                    })
                    .catch(function () { })
                    .finally(function () { mentionRequestPending = false });
            }

            function scrollToNextMention() {
                if (!messagesEl) return;
                var unseen = messagesEl.querySelectorAll('.msg-wrap.mentioned-me:not(.mention-seen)');
                if (!unseen.length) {
                    mentionUnread = 0; updateMentionBadges(); return;
                }
                unseen[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                unseen[0].classList.add('mention-seen');
                var bb = unseen[0].querySelector('.msg-bubble');
                if (bb) { bb.style.animation = 'mentionFlash .6s ease' }
                /* ✅ Simpan ke memori (sudah di database via markRead) */
                markMentionSeen(unseen[0].getAttribute('data-msg-id'));
                mentionUnread = Math.max(0, mentionUnread - 1);
                updateMentionBadges();
            }

            function toast(msg, type) { var dk = document.documentElement.classList.contains('dark'); var tp = type || 'info'; var tm = (tp === 'error' || tp === 'warning') ? 5000 : (tp === 'success' ? 3000 : 3500); if (typeof Swal !== 'undefined') Swal.fire({ toast: true, position: 'top-end', icon: tp, title: msg, showConfirmButton: false, timer: tm, timerProgressBar: true, background: dk ? '#1f2937' : '#fff', color: dk ? '#f3f4f6' : '#111827' }); else alert(msg) }
            function setSL(on) { if (!sendBtn) return; requestAnimationFrame(function () { if (on) { var sv = sendBtn.querySelector('svg'); if (sv) { var sp = document.createElement('span'); sp.className = 'send-spinner'; sv.replaceWith(sp) } } else { var sp2 = sendBtn.querySelector('.send-spinner'); if (sp2) { var ns = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); ns.setAttribute('fill', 'none'); ns.setAttribute('stroke', 'currentColor'); ns.setAttribute('viewBox', '0 0 24 24'); ns.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>'; sp2.replaceWith(ns) } } }) }

            function updateNotifyButton() {
                if (!notifyBtn) return;
                var active = notifyEnabled || soundEnabled;
                notifyBtn.classList.toggle('notify-active', active);
                notifyBtn.classList.toggle('active', active);
                notifyBtn.title = notifyEnabled ? 'Tes notifikasi dan suara' : 'Aktifkan notifikasi dan suara';
            }

            function saveNotificationPreferences() {
                localStorage.setItem('chat_notify_' + MY_ID, notifyEnabled ? '1' : '0');
                localStorage.setItem('chat_sound_' + MY_ID, soundEnabled ? '1' : '0');
                updateNotifyButton();
            }

            function registerNotificationWorker() {
                if (!window.isSecureContext || !('serviceWorker' in navigator)) return;
                notificationWorkerPromise = navigator.serviceWorker.register('/chat-notifications-sw.js')
                    .then(function (registration) { return registration })
                    .catch(function () { return null });
            }

            function playChatSound(force) {
                if (!force && !soundEnabled) return;
                try {
                    var AudioCtx = window.AudioContext || window.webkitAudioContext;
                    if (!AudioCtx) return;
                    if (!audioContext) audioContext = new AudioCtx();
                    if (audioContext.state === 'suspended') audioContext.resume();
                    var oscillator = audioContext.createOscillator(), gain = audioContext.createGain(), now = audioContext.currentTime;
                    oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(720, now); oscillator.frequency.exponentialRampToValueAtTime(920, now + .12);
                    gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(.12, now + .015); gain.gain.exponentialRampToValueAtTime(.0001, now + .18);
                    oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.start(now); oscillator.stop(now + .2);
                } catch (e) { }
            }

            function unlockChatAudio() {
                if (!soundEnabled) return;
                try {
                    var AudioCtx = window.AudioContext || window.webkitAudioContext;
                    if (!AudioCtx) return;
                    if (!audioContext) audioContext = new AudioCtx();
                    if (audioContext.state === 'suspended') audioContext.resume();
                } catch (e) { }
            }

            function showBrowserNotification(message) {
                if (!notifyEnabled || !('Notification' in window) || Notification.permission !== 'granted') return;
                var title = message.user_name || 'Chat Tim';
                var options = { body: (message.message || 'Pesan baru').substring(0, 140), tag: 'team-chat-' + message.id, icon: '/images/logo4.png', badge: '/images/logo4.png', data: { url: window.location.href } };
                var fallback = function () {
                    try {
                        var notification = new Notification(title, options);
                        notification.onclick = function () { window.focus(); notification.close(); if (!chatOpen) doToggle(); else if (chatMinimized) restoreChat() };
                        setTimeout(function () { notification.close() }, 7000);
                    } catch (e) { }
                };
                if (notificationWorkerPromise) {
                    notificationWorkerPromise.then(function (registration) {
                        if (registration && registration.showNotification) registration.showNotification(title, options).catch(fallback);
                        else fallback();
                    });
                } else fallback();
            }

            function showNotificationTest() {
                playChatSound(true);
                showBrowserNotification({ id: 'test-' + Date.now(), user_name: 'Chat Tim', message: 'Notifikasi dan suara berhasil diaktifkan.' });
            }

            function handleSummaryNotification(message) {
                if (!message || !message.id) return;
                var messageId = parseInt(message.id, 10) || 0;
                if (!summaryInitialized) { summaryInitialized = true; lastSummaryMessageId = messageId; return }
                if (messageId <= lastSummaryMessageId) return;
                lastSummaryMessageId = messageId;
                if (String(message.user_id) === String(MY_ID) || isChatReadable()) return;
                playChatSound(false);
                showBrowserNotification(message);
            }

            function toggleNotifications() {
                if (notifyEnabled) { showNotificationTest(); toast('Notifikasi tes dikirim', 'success'); return }
                soundEnabled = true; playChatSound(true);
                if (!('Notification' in window)) {
                    notifyEnabled = false; saveNotificationPreferences();
                    toast('Suara aktif. Browser ini tidak mendukung notifikasi.', 'info'); return;
                }
                if (Notification.permission === 'granted') {
                    notifyEnabled = true; saveNotificationPreferences(); showNotificationTest(); toast('Notifikasi tes dikirim', 'success'); return;
                }
                if (Notification.permission === 'denied') {
                    notifyEnabled = false; saveNotificationPreferences();
                    toast('Izin browser diblokir; suara tetap aktif.', 'warning'); return;
                }
                Notification.requestPermission().then(function (permission) {
                    notifyEnabled = permission === 'granted'; saveNotificationPreferences();
                    if (notifyEnabled) showNotificationTest();
                    toast(notifyEnabled ? 'Notifikasi tes dikirim' : 'Izin ditolak; suara tetap aktif.', notifyEnabled ? 'success' : 'warning');
                });
            }

            function toggleSearch(show) {
                if (!searchPanel) return;
                searchPanel.classList.toggle('open', show);
                if (searchBtn) searchBtn.classList.toggle('active', show);
                if (show) { setTimeout(function () { if (searchInput) searchInput.focus() }, 50) }
                else { clearTimeout(searchTimer); searchSequence++; if (searchInput) searchInput.value = ''; if (searchResults) searchResults.innerHTML = ''; if (searchStatus) searchStatus.textContent = 'Ketik minimal 2 karakter.' }
            }

            function renderSearchResults(messages, query) {
                if (!searchResults || !searchStatus) return;
                searchResults.innerHTML = '';
                if (!messages.length) { searchStatus.textContent = 'Tidak ada pesan yang cocok.'; return }
                searchStatus.textContent = messages.length + ' hasil untuk “' + query + '”';
                for (var i = 0; i < messages.length; i++) {
                    var message = messages[i], item = document.createElement('button'), time = '';
                    try { time = new Date(message.created_at).toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) } catch (e) { }
                    item.type = 'button'; item.className = 'cp-search-result'; item.setAttribute('data-search-id', message.id);
                    item.innerHTML = '<span class="cp-search-result-head"><span class="cp-search-result-name">' + eH(message.user_name || 'Pengguna') + '</span><span>' + eH(time) + '</span></span><span class="cp-search-result-text">' + eH(message.message || '') + '</span>';
                    searchResults.appendChild(item);
                }
            }

            function runSearch(query) {
                query = (query || '').trim();
                if (!searchStatus || !searchResults) return;
                if (query.length < 2) { searchStatus.textContent = 'Ketik minimal 2 karakter.'; searchResults.innerHTML = ''; return }
                var sequence = ++searchSequence; searchStatus.textContent = 'Mencari...'; searchResults.innerHTML = '';
                fetch(URL_SEARCH + '?q=' + encodeURIComponent(query), { headers: { 'Accept': 'application/json' } })
                    .then(function (response) { if (!response.ok) throw new Error(response.status); return response.json() })
                    .then(function (data) { if (sequence !== searchSequence) return; renderSearchResults(data.messages || [], query) })
                    .catch(function () { if (sequence === searchSequence) searchStatus.textContent = 'Pencarian gagal. Coba lagi.' });
            }

            updateNotifyButton();
            registerNotificationWorker();
            document.addEventListener('pointerdown', unlockChatAudio, { once: true });
            if ('serviceWorker' in navigator) navigator.serviceWorker.addEventListener('message', function (event) { if (event.data && event.data.type === 'OPEN_TEAM_CHAT') { if (!chatOpen) doToggle(); else if (chatMinimized) restoreChat() } });

            function getAllUsers() {
                if (allUsersLoaded) return Promise.resolve(allUsersLoaded);
                return fetch(URL_USERS, { headers: { 'Accept': 'application/json' } }).then(function (r) { if (!r.ok) throw 0; return r.json() }).then(function (data) { allUsersLoaded = data.map(function (u) { var p = (u.name || '').split(' '); return { id: u.id, name: u.name, department: u.department || '', initials: p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : (u.name || '??').substring(0, 2).toUpperCase(), color: UCLS[u.id % UCLS.length] } }); return allUsersLoaded }).catch(function () { return [] });
            }

            function getQuickMoodReply() {
                var mood = window._myMood || '';
                var map = {
                    '🥱': 'Mode ngantuk dulu ya, kalau slow response bukan ghosting—lagi buffering sambil cari kopi ☕',
                    '😌': 'Lagi mode santuy produktif. Pelan-pelan asal kelar, bestie 😌',
                    '🤯': 'Lagi overthinking tipis, tapi tenang kerjaan tetap jalan. Otak cuma buka banyak tab 🤯',
                    '🫠': 'Mode meleleh aktif. Capek tipis, tetap elegan awkwk 🫠',
                    '😡': 'Lagi badmood dulu ya. Mohon jangan disenggol kecuali urgent banget 😅',
                    '💼': 'Lagi mode sibuk/fokus. Kalau belum balas, bukan sombong—lagi ngejar task 💼',
                    '🚶': 'Lagi away sebentar. Nanti muncul lagi seperti notifikasi PR pending 🚶',
                    '⛔': 'Mode jangan ganggu aktif. Kalau urgent boleh colek, kalau tidak urgent nanti aku balas ya ⛔',
                    '🔥': 'Mode semangat menyala. Gaskeun sampai beres 🔥',
                    '😎': 'Mode keren aktif. Semua under control, semoga server juga setuju 😎'
                };
                return map[mood] ? { mood: mood, text: map[mood] } : null;
            }

            function updateQuickMoodButton() {
                if (!quickMoodBtn) return;
                var quick = getQuickMoodReply();
                if (!quick) { quickMoodBtn.style.display = 'none'; quickMoodBtn.textContent = ''; return }
                quickMoodBtn.style.display = 'inline-flex';
                quickMoodBtn.textContent = quick.mood + ' Mood reply';
                quickMoodBtn.title = quick.text;
            }
            window.updateQuickMoodButton = updateQuickMoodButton;

            function insertQuickMoodReply() {
                if (!inp) return;
                var quick = getQuickMoodReply();
                if (!quick) { toast('Pilih mood dulu biar reply-nya ada rasa awkwk', 'info'); return }
                var current = inp.value.trim();
                inp.value = current ? current + '\n' + quick.text : quick.text;
                inp.dispatchEvent(new Event('input'));
                inp.focus();
                toast('Mood reply siap dikirim. Tinggal Enter 🚀', 'success');
            }

            if (emojiRow) {
                for (var ei = 0; ei < EMOJIS.length; ei++) { (function (em) { var sp = document.createElement('span'); sp.className = 'cp-eq'; sp.textContent = em; sp.addEventListener('click', function (e) { e.stopPropagation(); if (!inp) return; var s = inp.selectionStart, en = inp.selectionEnd; inp.value = inp.value.substring(0, s) + em + inp.value.substring(en); inp.selectionStart = inp.selectionEnd = s + em.length; inp.dispatchEvent(new Event('input')); inp.focus() }); emojiRow.appendChild(sp) })(EMOJIS[ei]) }
                var followupBtn = document.createElement('span'); followupBtn.className = 'followup-btn'; followupBtn.textContent = '/@ PR'; followupBtn.title = 'Follow up cepat PR/PPBJ';
                emojiRow.appendChild(followupBtn);
                followupBtn.addEventListener('click', function (e) { e.stopPropagation(); startFollowupCommand(); });
                quickMoodBtn = document.createElement('span'); quickMoodBtn.className = 'quick-mood-btn'; quickMoodBtn.textContent = '';
                emojiRow.appendChild(quickMoodBtn);
                quickMoodBtn.addEventListener('click', function (e) { e.stopPropagation(); insertQuickMoodReply(); });
                updateQuickMoodButton();
                var atBtn = document.createElement('span'); atBtn.className = 'at-btn'; atBtn.textContent = '@';
                var atBadge = document.createElement('span'); atBadge.className = 'at-btn-badge'; atBadge.id = 'atBtnBadge'; atBadge.textContent = '0';
                atBtn.appendChild(atBadge); emojiRow.appendChild(atBtn);
                atBtn.addEventListener('click', function (e) { e.stopPropagation(); if (mentionDd.classList.contains('open')) closeMentionDd(); else { getAllUsers().then(function () { openMentionDd('') }); if (inp) inp.focus() } });
            }

            function openMentionDd(query) { mentionState.active = true; mentionState.query = (query || '').toLowerCase(); renderMentionDd(); mentionDd.classList.add('open') }
            function closeMentionDd() { mentionState.active = false; mentionState.query = ''; mentionDd.classList.remove('open') }
            function renderMentionDd() {
                var users = allUsersLoaded || [], q = mentionState.query, html = '';
                var filtered = users.filter(function (u) { return q === '' || u.name.toLowerCase().indexOf(q) !== -1 });
                for (var i = 0; i < filtered.length; i++) { var u = filtered[i]; html += '<div class="mention-dd-item" data-uid="' + u.id + '" data-uname="' + eH(u.name) + '"><div class="mention-dd-av" style="background:' + u.color + '">' + u.initials + '</div><div><div class="mention-dd-name">' + eH(u.name) + '</div><div class="mention-dd-dept">' + eH(u.department) + '</div></div></div>' }
                var allMatch = q === '' || 'semua'.indexOf(q) !== -1;
                if (allMatch) { html += '<div class="mention-dd-item mention-dd-all" data-uid="all" data-uname="Semua"><span class="mention-dd-all-icon">\u{1F465}</span><div><div class="mention-dd-all-label">@Semua</div><div class="mention-dd-all-desc">Tag semua user</div></div></div>' }
                if (!html) html = '<div style="padding:16px;text-align:center;font-size:.78rem;color:#9ca3af">Tidak ditemukan</div>';
                mentionDdList.innerHTML = html;
            }

            function insertMention(uid, uname) {
                if (!inp) return; var val = inp.value, pos = inp.selectionStart, txt = '@' + uname + ' ';
                if (mentionState.active && mentionState.start !== undefined) { val = val.substring(0, mentionState.start) + txt + val.substring(pos); inp.value = val; inp.selectionStart = inp.selectionEnd = mentionState.start + txt.length }
                else { val = val.substring(0, pos) + txt + val.substring(pos); inp.value = val; inp.selectionStart = inp.selectionEnd = pos + txt.length }
                if (uid === 'all') { draftMentions = [{ id: 'all', name: 'Semua' }] }
                else { var ex = false; for (var i = 0; i < draftMentions.length; i++) { if (String(draftMentions[i].id) === String(uid)) { ex = true; break } } if (!ex) draftMentions.push({ id: uid, name: uname }) }
                updateAtBadge(); closeMentionDd(); inp.dispatchEvent(new Event('input')); inp.focus();
            }

            window.quickMoodChat = function (user) {
                if (!inp || !user || !user.id) return;
                if (!chatOpen) doToggle();
                else if (chatMinimized) restoreChat();
                if (typeof cPP === 'function') cPP();

                fetch(URL_QUICK_MOOD, {
                    method: 'POST',
                    headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify({ target_user_id: user.id, mood: user.mood || '' })
                })
                    .then(function (response) {
                        return response.json().catch(function () { return {} }).then(function (body) {
                            if (!response.ok) throw new Error(body.error || 'Quick chat gagal dikirim');
                            return body;
                        });
                    })
                    .then(function (body) {
                        if (body.message && !messagesEl.querySelector('.msg-wrap[data-msg-id="' + body.message.id + '"]')) {
                            appendMsg(body.message);
                            chatMaxId = Math.max(chatMaxId, body.message.id);
                            sBB();
                        }
                        toast('Quick chat mood terkirim. Sekali sehari biar nggak spam awkwk', 'success');
                    })
                    .catch(function (error) {
                        toast(error.message || 'Quick chat mood gagal', 'warning');
                    });
            };

            function findFollowupToken(value, pos) {
                var before = value.substring(0, pos), idx = before.lastIndexOf('/@');
                if (idx === -1) return null;
                var prevOk = idx === 0 || /\s/.test(before.charAt(idx - 1));
                var query = before.substring(idx + 2);
                if (!prevOk || /\s/.test(query)) return null;
                return { start: idx, query: query };
            }

            function startFollowupCommand() {
                if (!inp) return;
                var pos = inp.selectionStart || inp.value.length, val = inp.value;
                var prefix = pos === 0 || /\s/.test(val.charAt(pos - 1)) ? '' : ' ';
                var insert = prefix + '/@';
                inp.value = val.substring(0, pos) + insert + val.substring(pos);
                inp.selectionStart = inp.selectionEnd = pos + insert.length;
                inp.dispatchEvent(new Event('input'));
                inp.focus();
            }

            function closeFollowupDd() {
                followupState.active = false;
                followupState.query = '';
                followupState.items = [];
                followupState.selected = 0;
                if (followupDd) followupDd.classList.remove('open');
            }

            function renderFollowupDd() {
                if (!followupDdList) return;
                if (followupState.loading) {
                    followupDdList.innerHTML = '<div class="followup-empty">Mencari PR/PPBJ...</div>';
                    return;
                }
                var items = followupState.items || [], html = '';
                for (var i = 0; i < items.length; i++) {
                    var item = items[i], active = i === followupState.selected ? ' active' : '';
                    html += '<div class="followup-dd-item' + active + '" data-index="' + i + '">' +
                        '<div class="followup-badge">' + eH(item.badge || item.type || 'PR') + '</div>' +
                        '<div class="followup-main">' +
                            '<div class="followup-number">' + eH(item.number || '-') + '</div>' +
                            '<div class="followup-title">' + eH(item.title || 'Data pengadaan') + '</div>' +
                            '<div class="followup-meta"><span class="followup-status">' + eH(item.status || '-') + '</span><span>' + eH(item.meta || '') + '</span></div>' +
                        '</div>' +
                    '</div>';
                }
                if (!html) html = '<div class="followup-empty">Data tidak ditemukan. Coba nomor lain, contoh: /@0401 atau /@CON.</div>';
                followupDdList.innerHTML = html;
            }

            function fetchFollowups(query) {
                if (!followupDdList) return;
                clearTimeout(followupState.timer);
                followupState.loading = true;
                renderFollowupDd();
                followupState.timer = setTimeout(function () {
                    fetch(URL_FOLLOWUPS + '?q=' + encodeURIComponent(query || ''), { headers: { 'Accept': 'application/json' } })
                        .then(function (response) { if (!response.ok) throw new Error(response.status); return response.json() })
                        .then(function (data) {
                            followupState.loading = false;
                            followupState.items = data.items || [];
                            followupState.selected = 0;
                            renderFollowupDd();
                        })
                        .catch(function () {
                            followupState.loading = false;
                            followupState.items = [];
                            if (followupDdList) followupDdList.innerHTML = '<div class="followup-empty">Gagal memuat PR/PPBJ. Coba lagi.</div>';
                        });
                }, 220);
            }

            function openFollowupDd(query) {
                if (!followupDd) return;
                followupState.active = true;
                followupState.query = query || '';
                followupDd.classList.add('open');
                fetchFollowups(followupState.query);
            }

            function removeFollowupToken() {
                if (!inp) return;
                var pos = inp.selectionStart || inp.value.length, token = findFollowupToken(inp.value, pos);
                if (!token && followupState.start !== undefined) token = { start: followupState.start, query: followupState.query || '' };
                if (!token) return;
                var end = token.start + 2 + (token.query || '').length;
                inp.value = (inp.value.substring(0, token.start) + inp.value.substring(end)).trim();
                inp.selectionStart = inp.selectionEnd = inp.value.length;
                inp.dispatchEvent(new Event('input'));
            }

            function sendFollowupItem(item) {
                if (!item || sending) return;
                sending = true; rSB(); setSL(true);
                fetch(URL_FOLLOWUP, { method: 'POST', headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ type: item.type, id: item.id }) })
                    .then(function (response) { return response.json().then(function (body) { if (!response.ok) throw new Error(body.error || 'Gagal follow up'); return body }) })
                    .then(function (body) {
                        if (!body.message) throw new Error('Respons tidak valid');
                        sE(false); if (!messagesEl.querySelector('.msg-wrap[data-msg-id="' + body.message.id + '"]')) appendMsg(body.message);
                        chatMaxId = Math.max(chatMaxId, body.message.id); closeFollowupDd(); removeFollowupToken(); sBB();
                        toast('Follow up dikirim ke Chat Tim', 'success');
                    })
                    .catch(function (error) { toast(error.message || 'Gagal mengirim follow up', 'error') })
                    .finally(function () { sending = false; setSL(false); rSB() });
            }

            function updateAtBadge() {
                var b = document.getElementById('atBtnBadge');
                if (!b) return; var c = draftMentions.length; b.textContent = c;
                if (c > 0) { b.classList.add('visible'); b.style.display = 'flex' }
                else { b.classList.remove('visible'); b.style.display = 'none' }
            }

            function cleanDraftMentions() {
                var text = inp ? inp.value : ''; var cleaned = [];
                for (var i = 0; i < draftMentions.length; i++) {
                    var m = draftMentions[i];
                    if (m.id === 'all') { if (text.indexOf('@Semua') !== -1 || text.indexOf('@semua') !== -1) cleaned.push(m) }
                    else { if (text.indexOf('@' + m.name) !== -1) cleaned.push(m) }
                }
                if (cleaned.length !== draftMentions.length) draftMentions = cleaned;
                updateAtBadge();
            }

            mentionDdList.addEventListener('click', function (e) { var item = e.target.closest('.mention-dd-item'); if (!item) return; e.stopPropagation(); insertMention(item.getAttribute('data-uid'), item.getAttribute('data-uname')) });
            if (followupDdList) followupDdList.addEventListener('click', function (e) {
                var itemEl = e.target.closest('.followup-dd-item'); if (!itemEl) return; e.stopPropagation();
                var idx = parseInt(itemEl.getAttribute('data-index'), 10), item = followupState.items[idx];
                sendFollowupItem(item);
            });

            if (inp) {
                inp.addEventListener('input', function () {
                    var len = this.value.length; if (charEl) { charEl.textContent = len + '/' + MAX_LEN; charEl.className = 'cp-char' + (len > 450 ? ' danger' : len > 380 ? ' warn' : '') } rSB(); this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight, 100) + 'px';
                    var pos = this.selectionStart, text = this.value, followToken = findFollowupToken(text, pos);
                    if (followToken) {
                        followupState.start = followToken.start;
                        closeMentionDd();
                        if (!followupState.active || followupState.query !== followToken.query) openFollowupDd(followToken.query);
                        else renderFollowupDd();
                    } else {
                        if (followupState.active) closeFollowupDd();
                        var before = text.substring(0, pos), atIdx = before.lastIndexOf('@');
                        if (atIdx !== -1) { var afterAt = before.substring(atIdx + 1); if ((atIdx === 0 || text.charAt(atIdx - 1) === ' ') && afterAt.indexOf(' ') === -1) { mentionState.start = atIdx; mentionState.query = afterAt; if (!mentionState.active) { getAllUsers().then(function () { openMentionDd(afterAt) }) } else renderMentionDd() } else { if (mentionState.active) closeMentionDd() } } else { if (mentionState.active) closeMentionDd() }
                    }
                    cleanDraftMentions();
                });
                inp.addEventListener('keydown', function (e) {
                    if (followupState.active) {
                        if (e.key === 'ArrowDown') { e.preventDefault(); var fdLen = (followupState.items || []).length; followupState.selected = fdLen ? Math.min(fdLen - 1, followupState.selected + 1) : 0; renderFollowupDd(); return }
                        if (e.key === 'ArrowUp') { e.preventDefault(); followupState.selected = Math.max(0, followupState.selected - 1); renderFollowupDd(); return }
                        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.stopPropagation(); sendFollowupItem((followupState.items || [])[followupState.selected]); return }
                        if (e.key === 'Escape') { e.preventDefault(); closeFollowupDd(); return }
                    }
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.stopPropagation(); doSend() }
                    if (e.key === 'Escape' && mentionState.active) { e.preventDefault(); closeMentionDd() }
                });
            }

            function renderReactionsForMessage(messageId, reactions) {
                if (!messagesEl) return;
                var wrap = messagesEl.querySelector('.msg-wrap[data-msg-id="' + messageId + '"]'); if (!wrap) return;
                var container = wrap.querySelector('.msg-reactions'); if (!container) return;
                container.innerHTML = '';
                for (var i = 0; i < (reactions || []).length; i++) {
                    var reaction = reactions[i], button = document.createElement('button');
                    button.type = 'button'; button.className = 'msg-reaction' + (reaction.mine ? ' mine' : '');
                    button.setAttribute('data-reaction-id', messageId); button.setAttribute('data-reaction-emoji', reaction.emoji || '');
                    button.title = (reaction.users || []).join(', '); button.textContent = (reaction.emoji || '') + ' ' + (parseInt(reaction.count, 10) || 0);
                    container.appendChild(button);
                }
            }

            function doReact(messageId, emoji) {
                if (!messageId || !emoji) return;
                fetch(URL_REACT + messageId + '/reaction', { method: 'POST', headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ emoji: emoji }) })
                    .then(function (response) { if (!response.ok) throw new Error(response.status); return response.json() })
                    .then(function (data) { renderReactionsForMessage(messageId, data.reactions || []) })
                    .catch(function () { toast('Gagal memberi reaksi', 'error') });
            }

            function refreshVisibleReactions() {
                if (!chatOpen || !messagesEl) return;
                var nodes = messagesEl.querySelectorAll('.msg-wrap[data-msg-id]'), ids = [];
                for (var i = 0; i < nodes.length && i < 40; i++) ids.push(nodes[i].getAttribute('data-msg-id'));
                if (!ids.length) return;
                fetch(URL_REACTIONS + '?message_ids=' + encodeURIComponent(ids.join(',')), { headers: { 'Accept': 'application/json' } })
                    .then(function (response) { if (!response.ok) throw new Error(response.status); return response.json() })
                    .then(function (data) {
                        var map = data.reactions || {}; for (var j = 0; j < ids.length; j++) renderReactionsForMessage(ids[j], map[ids[j]] || []);
                        var updates = data.message_updates || []; for (var k = 0; k < updates.length; k++) applyMessageUpdate(updates[k]);
                    })
                    .catch(function () { });
            }

            function messageDataFromWrap(wrap) {
                if (!wrap) return null;
                var avatar = wrap.querySelector('.msg-av'), bubble = wrap.querySelector('.msg-bubble'), share = wrap.querySelector('.msg-share-card');
                var fullMessage = bubble ? (bubble.getAttribute('data-full-message') || bubble.textContent) : '';
                var shareText = share ? share.textContent.trim().replace(/\s+/g, ' ') : '';
                return { id: parseInt(wrap.getAttribute('data-msg-id')), isMe: wrap.classList.contains('mine'), canEdit: wrap.getAttribute('data-can-edit') === '1', canDelete: wrap.getAttribute('data-can-delete') === '1', preview: bubble ? bubble.textContent.substring(0, 60) : '', fullMessage: fullMessage, copyText: (shareText ? shareText + '\n' : '') + fullMessage, name: avatar ? avatar.title : '', uid: wrap.getAttribute('data-uid') || '' };
            }

            var ctxCopyBtn = document.createElement('div');
            ctxCopyBtn.className = 'ctx-item';
            ctxCopyBtn.id = 'ctxCopy';
            ctxCopyBtn.innerHTML = '<span class="ctx-icon">Salin Pesan</span>';
            if (ctxMenu) ctxMenu.insertBefore(ctxCopyBtn, document.getElementById('ctxReply'));

            if (ctxReactions) {
                for (var ri = 0; ri < REACTION_EMOJIS.length; ri++) {
                    (function (emoji) { var button = document.createElement('button'); button.type = 'button'; button.className = 'ctx-reaction-btn'; button.textContent = emoji; button.title = 'Beri reaksi ' + emoji; button.addEventListener('click', function (e) { e.stopPropagation(); if (!ctxMsgData) return; var id = ctxMsgData.id; hideCtx(); doReact(id, emoji) }); ctxReactions.appendChild(button) })(REACTION_EMOJIS[ri]);
                }
            }

            function showCtx(x, y, data) { ctxMsgData = data; ctxMenu.style.display = 'block'; var r = ctxMenu.getBoundingClientRect(); if (x + r.width > window.innerWidth - 8) x = window.innerWidth - r.width - 8; if (y + r.height > window.innerHeight - 8) y -= r.height + 8; if (x < 8) x = 8; if (y < 8) y = 8; ctxMenu.style.left = x + 'px'; ctxMenu.style.top = y + 'px'; var cm = document.getElementById('ctxMention'); if (cm) cm.style.display = data.isMe ? 'none' : 'flex'; var ce = document.getElementById('ctxEdit'); if (ce) ce.style.display = data.isMe && data.canEdit ? 'flex' : 'none'; var cd = document.getElementById('ctxDelete'); if (cd) cd.style.display = data.isMe && data.canDelete ? 'flex' : 'none' }
            function hideCtx() { ctxMenu.style.display = 'none'; ctxMsgData = null }
            function copyChatText(text) {
                text = (text || '').trim();
                if (!text) { toast('Tidak ada teks untuk disalin', 'warning'); return }
                var done = function () { toast('Pesan disalin', 'success') };
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done) });
                } else fallbackCopy(text, done);
            }
            function fallbackCopy(text, done) {
                var area = document.createElement('textarea'); area.value = text; area.style.position = 'fixed'; area.style.left = '-9999px'; document.body.appendChild(area); area.focus(); area.select();
                try { document.execCommand('copy'); done() } catch (e) { toast('Browser tidak mengizinkan salin otomatis', 'error') }
                document.body.removeChild(area);
            }
            document.addEventListener('click', function (e) { if (ctxMenu.style.display === 'block' && !ctxMenu.contains(e.target)) hideCtx() });
            ctxCopyBtn.addEventListener('click', function (e) { e.stopPropagation(); if (!ctxMsgData) return; var text = ctxMsgData.copyText || ctxMsgData.fullMessage || ctxMsgData.preview; hideCtx(); copyChatText(text) });
            document.getElementById('ctxReply').addEventListener('click', function (e) { e.stopPropagation(); if (!ctxMsgData) return; doStartReply(ctxMsgData.id, ctxMsgData.preview, ctxMsgData.name); hideCtx() });
            document.getElementById('ctxEdit').addEventListener('click', function (e) { e.stopPropagation(); if (!ctxMsgData) return; var data = ctxMsgData; hideCtx(); doEdit(data) });
            document.getElementById('ctxMention').addEventListener('click', function (e) { e.stopPropagation(); if (!ctxMsgData) return; getAllUsers().then(function () { insertMention(ctxMsgData.uid, ctxMsgData.name) }); hideCtx() });
            document.getElementById('ctxDelete').addEventListener('click', function (e) { e.stopPropagation(); if (!ctxMsgData) return; var id = ctxMsgData.id; hideCtx(); doDelete(id) });

            var lpTimer = null;
            if (messagesEl) {
                messagesEl.addEventListener('contextmenu', function (e) { var b = e.target.closest('.msg-wrap'); if (!b) return; e.preventDefault(); showCtx(e.clientX, e.clientY, messageDataFromWrap(b)) });
                messagesEl.addEventListener('touchstart', function (e) { var b = e.target.closest('.msg-wrap'); if (!b) return; var t = e.touches[0], tx = t.clientX, ty = t.clientY; lpTimer = setTimeout(function () { showCtx(tx, ty, messageDataFromWrap(b)); if (navigator.vibrate) navigator.vibrate(30) }, 500) }, { passive: true });
                messagesEl.addEventListener('touchend', function () { clearTimeout(lpTimer) }, { passive: true });
                messagesEl.addEventListener('touchmove', function () { clearTimeout(lpTimer) }, { passive: true });
                messagesEl.addEventListener('click', function (e) {
                    var older = e.target.closest('.cp-load-older'); if (older) { e.stopPropagation(); loadOlderMessages(); return }
                    var db = e.target.closest('.msg-del'); if (db) { e.stopPropagation(); doDelete(parseInt(db.getAttribute('data-del-id'))); return }
                    var ck = e.target.closest('.msg-checks'); if (ck) { e.stopPropagation(); var readId = parseInt(ck.getAttribute('data-check-id'), 10); if (Number.isFinite(readId) && readId > 0) toggleReadPopup(ck, readId); return }
                    var reaction = e.target.closest('.msg-reaction'); if (reaction) { e.stopPropagation(); doReact(parseInt(reaction.getAttribute('data-reaction-id')), reaction.getAttribute('data-reaction-emoji')); return }
                    var addReaction = e.target.closest('.msg-react-add'); if (addReaction) { e.stopPropagation(); var aw = addReaction.closest('.msg-wrap'), ar = addReaction.getBoundingClientRect(); showCtx(ar.left, ar.bottom + 6, messageDataFromWrap(aw)); return }
                    var bu = e.target.closest('.msg-bubble'); if (bu) { var wr = bu.closest('.msg-wrap'); if (wr && !wr.classList.contains('mine')) { doStartReply(parseInt(bu.getAttribute('data-msg-id')), bu.getAttribute('data-preview') || '', bu.getAttribute('data-name') || '') } }
                });
            }

            function readerInitials(name) {
                var parts = String(name || '').trim().split(/\s+/);
                if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
                return String(name || '??').substring(0, 2).toUpperCase();
            }

            function formatReadDate(value) {
                try {
                    var d = new Date(value);
                    if (isNaN(d.getTime())) return '-';
                    return d.toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }) + ' • ' + d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                } catch (e) { return '-' }
            }

            function positionReadPopup(popup, anchor) {
                if (!popup || !anchor) return;
                var ar = anchor.getBoundingClientRect(), width = Math.min(340, window.innerWidth - 24);
                popup.style.width = width + 'px';
                var pr = popup.getBoundingClientRect();
                var left = Math.min(window.innerWidth - width - 12, Math.max(12, ar.right - width));
                var top = ar.bottom + 10;
                if (top + pr.height > window.innerHeight - 12) top = Math.max(12, ar.top - pr.height - 10);
                popup.style.left = left + 'px';
                popup.style.top = top + 'px';
            }

            function closeReadPopup() {
                if (!activeReadPopup) return;
                var popup = activeReadPopup;
                popup.classList.remove('open');
                activeReadPopup = null; activeReadAnchor = null; activeReadRequestToken++;
                setTimeout(function () { if (popup && popup.parentNode) popup.parentNode.removeChild(popup) }, 180);
            }

            function ensureReadPopupStillValid() {
                if (!activeReadPopup) return;
                if (!activeReadAnchor || !document.body.contains(activeReadAnchor) || !isChatReadable()) {
                    closeReadPopup();
                }
            }

            function handleReadPopupPageScroll(e) {
                if (activeReadPopup && e && e.target && e.target.closest && e.target.closest('.read-popup')) return;
                closeReadPopup();
            }

            function attachReadPopupSearch(popup) {
                var input = popup ? popup.querySelector('.read-popup-search-input') : null;
                if (!input) return;
                ['click', 'pointerdown', 'mousedown', 'touchstart'].forEach(function (evt) {
                    popup.addEventListener(evt, function (e) { e.stopPropagation() }, { passive: evt === 'touchstart' });
                });
                var items = popup.querySelectorAll('.read-popup-name');
                var empty = popup.querySelector('.read-popup-empty.search-empty');
                input.addEventListener('input', function () {
                    var q = String(input.value || '').toLowerCase().trim(), visible = 0;
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        var ok = !q || String(item.getAttribute('data-reader-search') || '').indexOf(q) !== -1;
                        item.style.display = ok ? 'flex' : 'none';
                        if (ok) visible++;
                    }
                    if (empty) empty.style.display = visible ? 'none' : 'block';
                });
            }

            function toggleReadPopup(checkEl, msgId) {
                msgId = parseInt(msgId, 10);
                if (!Number.isFinite(msgId) || msgId <= 0) {
                    if (checkEl) checkEl.style.opacity = '';
                    return;
                }
                if (activeReadPopup) {
                    var sameAnchor = activeReadAnchor === checkEl;
                    closeReadPopup();
                    if (sameAnchor) return;
                }
                var requestToken = ++activeReadRequestToken;
                activeReadAnchor = checkEl;
                checkEl.style.opacity = '.5';
                fetch(URL_READS + msgId + '/reads', { headers: { 'Accept': 'application/json' } })
                    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json() })
                    .then(function (d) {
                        if (requestToken !== activeReadRequestToken || !document.body.contains(checkEl) || !isChatReadable()) return;
                        checkEl.style.opacity = '';
                        var pp = document.createElement('div'); pp.className = 'read-popup';
                        var readers = d.readers || [];
                        if (!readers.length) {
                            pp.innerHTML = '<div class="read-popup-title"><span>\u{1F441} Dilihat</span><span class="read-popup-count">0</span></div><div class="read-popup-empty">Belum ada yang melihat pesan ini.</div>';
                        } else {
                            var names = ''; for (var i = 0; i < readers.length; i++) {
                                var rd = readers[i], rdName = rd.user_name || ('User #' + rd.user_id), c = UCLS[(rd.user_id || 0) % UCLS.length] || '#6366f1';
                                var rdTime = formatReadDate(rd.read_at), rdSearch = (rdName + ' ' + rdTime).toLowerCase();
                                names += '<div class="read-popup-name" data-reader-search="' + eH(rdSearch) + '"><span class="read-popup-dot" style="background:' + c + '">' + eH(readerInitials(rdName)) + '</span><div class="read-popup-reader"><div class="read-popup-reader-name">' + eH(rdName) + '</div><div class="read-popup-reader-time">' + eH(rdTime) + '</div></div></div>';
                            }
                            pp.innerHTML = '<div class="read-popup-title"><span>\u{1F441} Dilihat oleh</span><span class="read-popup-count">' + readers.length + ' orang</span></div><div class="read-popup-search"><input type="search" class="read-popup-search-input" placeholder="Cari nama pembaca..." autocomplete="off"></div><div class="read-popup-names">' + names + '<div class="read-popup-empty search-empty">Nama pembaca tidak ditemukan.</div></div>';
                        }
                        document.body.appendChild(pp);
                        attachReadPopupSearch(pp);
                        requestAnimationFrame(function () { positionReadPopup(pp, checkEl); pp.classList.add('open') });
                        activeReadPopup = pp; activeReadAnchor = checkEl;
                    }).catch(function () { checkEl.style.opacity = '' });
            }
            document.addEventListener('click', function (e) { if (activeReadPopup && !e.target.closest('.read-popup') && !e.target.closest('.msg-checks')) closeReadPopup() });
            window.addEventListener('resize', closeReadPopup);
            window.addEventListener('scroll', handleReadPopupPageScroll, true);
            document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && activeReadPopup) closeReadPopup() });
            if (messagesEl) messagesEl.addEventListener('scroll', closeReadPopup, { passive: true });

            function renderMentionText(text, mp) { var html = eH(text); if (!mp || !mp.length) return html; var hasAll = false; for (var i = 0; i < mp.length; i++) { if (mp[i].id === 'all') { hasAll = true; continue } var name = mp[i].name || ''; if (name) { var esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); html = html.replace(new RegExp('@' + esc, 'g'), '<span class="mention-hl">@' + eH(name) + '</span>') } } if (hasAll) html = html.replace(/@(Semua|semua)/gi, '<span class="mention-all-hl">@$1</span>'); return html }
            function amMentioned(mp) { if (!mp || !mp.length) return false; for (var i = 0; i < mp.length; i++) { if (mp[i].id === 'all') return true; if (String(mp[i].id) === String(MY_ID)) return true } return false }

            function createShareCard(data) {
                if (!data || !data.label) return null;
                var card = document.createElement('div'); card.className = 'msg-share-card';
                var head = document.createElement('div'); head.className = 'msg-share-head';
                var label = document.createElement('span'); label.className = 'msg-share-label'; label.textContent = data.label;
                var number = document.createElement('span'); number.className = 'msg-share-number'; number.textContent = data.number || '-'; number.title = data.number || '-';
                head.appendChild(label); head.appendChild(number); card.appendChild(head);
                var title = document.createElement('div'); title.className = 'msg-share-title'; title.textContent = data.title || 'Data pengadaan'; card.appendChild(title);
                var fields = document.createElement('div'); fields.className = 'msg-share-fields';
                for (var i = 0; i < (data.fields || []).length; i++) {
                    var field = data.fields[i], item = document.createElement('div');
                    var fieldLabel = document.createElement('span'); fieldLabel.className = 'msg-share-field-label'; fieldLabel.textContent = field.label || '';
                    var fieldValue = document.createElement('span'); fieldValue.className = 'msg-share-field-value'; fieldValue.textContent = field.value || '-'; fieldValue.title = field.value || '-';
                    item.appendChild(fieldLabel); item.appendChild(fieldValue); fields.appendChild(item);
                }
                card.appendChild(fields); return card;
            }

            function applyMessageUpdate(message) {
                if (!messagesEl || !message) return;
                var wrap = messagesEl.querySelector('.msg-wrap[data-msg-id="' + message.id + '"]'); if (!wrap) return;
                var bubble = wrap.querySelector('.msg-bubble'); if (bubble) {
                    bubble.innerHTML = renderMentionText(message.message || '', message.mentions_parsed || []);
                    bubble.setAttribute('data-preview', (message.message || '').substring(0, 60));
                    bubble.setAttribute('data-full-message', message.message || '');
                }
                var meta = wrap.querySelector('.msg-meta'), edited = wrap.querySelector('.msg-edited');
                if (message.edited_at && meta && !edited) { edited = document.createElement('span'); edited.className = 'msg-edited'; edited.textContent = 'diedit'; meta.insertBefore(edited, meta.firstChild ? meta.firstChild.nextSibling : null) }
                if (Object.prototype.hasOwnProperty.call(message, 'can_edit')) wrap.setAttribute('data-can-edit', message.can_edit ? '1' : '0');
                if (Object.prototype.hasOwnProperty.call(message, 'can_delete')) wrap.setAttribute('data-can-delete', message.can_delete ? '1' : '0');
            }

            function scheduleDeleteExpiry(wrap, expiresAt) {
                if (!wrap || !expiresAt) return;
                var exp = new Date(expiresAt).getTime();
                if (isNaN(exp)) return;
                var delay = exp - Date.now();
                if (delay <= 0) {
                    wrap.setAttribute('data-can-delete', '0');
                    var btn = wrap.querySelector('.msg-del'); if (btn) btn.remove();
                    return;
                }
                setTimeout(function () {
                    wrap.setAttribute('data-can-delete', '0');
                    var btn = wrap.querySelector('.msg-del'); if (btn) btn.remove();
                }, Math.min(delay, 2147483647));
            }

            function appendMsg(m, prepend) {
                if (!messagesEl) return; var isMe = String(m.user_id) === String(MY_ID), time = ''; try { time = new Date(m.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) } catch (e) { }
                var wr = document.createElement('div'); wr.className = 'msg-wrap' + (isMe ? ' mine' : '');
                if (amMentioned(m.mentions_parsed) && !isMe) wr.classList.add('mentioned-me');
                wr.setAttribute('data-msg-id', m.id); wr.setAttribute('data-uid', m.user_id || ''); wr.setAttribute('data-can-edit', m.can_edit ? '1' : '0'); wr.setAttribute('data-can-delete', m.can_delete ? '1' : '0');
                var av = document.createElement('div'); av.className = 'msg-av'; av.style.background = m.user_color || '#6366f1'; av.title = m.user_name || ''; av.textContent = m.user_initials || '??';
                var bd = document.createElement('div'); bd.className = 'msg-body';
                if (!isMe) { var sn = document.createElement('div'); sn.className = 'msg-sender'; sn.textContent = m.user_name || ''; bd.appendChild(sn) }
                if (m.reply_to) { var rp = document.createElement('div'); rp.className = 'msg-reply'; rp.innerHTML = '<span class="msg-reply-author">' + eH(m.reply_user || 'Seseorang') + '</span><br>' + eH(m.reply_preview || ''); bd.appendChild(rp) }
                var shareCard = createShareCard(m.share_data_parsed); if (shareCard) bd.appendChild(shareCard);
                var bb = document.createElement('div'); bb.className = 'msg-bubble'; bb.innerHTML = renderMentionText(m.message, m.mentions_parsed); bb.setAttribute('data-msg-id', m.id); bb.setAttribute('data-preview', (m.message || '').substring(0, 60)); bb.setAttribute('data-full-message', m.message || ''); bb.setAttribute('data-name', m.user_name || ''); bd.appendChild(bb);
                var mt = document.createElement('div'); mt.className = 'msg-meta'; var ts = document.createElement('span'); ts.className = 'msg-time'; ts.textContent = time; mt.appendChild(ts);
                if (m.edited_at) { var edited = document.createElement('span'); edited.className = 'msg-edited'; edited.textContent = 'diedit'; mt.appendChild(edited) }
                var reactAdd = document.createElement('button'); reactAdd.type = 'button'; reactAdd.className = 'msg-react-add'; reactAdd.title = 'Beri reaksi'; reactAdd.textContent = '\u263A'; mt.appendChild(reactAdd);
                if (isMe) {
                    var rc = parseInt(m.read_count) || 0;
                    if (rc > 0) { var ck = document.createElement('span'); ck.className = 'msg-checks msg-checks-read'; ck.textContent = '\u2713\u2713'; ck.title = 'Lihat siapa yang membaca'; ck.setAttribute('aria-label', 'Lihat siapa yang membaca'); ck.setAttribute('data-check-id', m.id); mt.appendChild(ck) }
                    else { var ck2 = document.createElement('span'); ck2.className = 'msg-checks'; ck2.textContent = '\u2713'; ck2.title = 'Terkirim. Belum ada yang membaca'; mt.appendChild(ck2) }
                    if (m.can_delete) { var dl = document.createElement('button'); dl.type = 'button'; dl.className = 'msg-del'; dl.title = isMe ? 'Hapus pesan untuk semua maksimal 6 jam' : 'Hapus pesan dari tampilan saya'; dl.textContent = '\u2715'; dl.setAttribute('data-del-id', m.id); mt.appendChild(dl); scheduleDeleteExpiry(wr, m.delete_expires_at) }
                }
                bd.appendChild(mt); var reactions = document.createElement('div'); reactions.className = 'msg-reactions'; bd.appendChild(reactions); wr.appendChild(av); wr.appendChild(bd);
                if (prepend) { var firstMessage = messagesEl.querySelector('.msg-wrap'); messagesEl.insertBefore(wr, firstMessage || null) } else messagesEl.appendChild(wr);
                renderReactionsForMessage(m.id, m.reactions || []);
            }

            function doStartReply(id, preview, userName) { replyToId = id; replyUser = userName; var bar = document.getElementById('cpReplyBar'), txt = document.getElementById('cpReplyText'); if (txt) txt.innerHTML = 'Balas <strong>' + eH(userName.split(' ')[0]) + '</strong>: ' + eH(preview) + (preview.length >= 60 ? '\u2026' : ''); if (bar) bar.classList.add('visible'); if (inp) inp.focus() }
            function doCancelReply() { replyToId = null; replyUser = null; var bar = document.getElementById('cpReplyBar'); if (bar) bar.classList.remove('visible'); if (inp) inp.focus() }
            var crb = document.getElementById('btnCancelReply'); if (crb) crb.addEventListener('click', function (e) { e.stopPropagation(); doCancelReply() });

            /* ── Load messages ── */
            function loadMessages(initial) {
                ensureReadPopupStillValid();
                if (initial) closeReadPopup();
                var since = initial ? 0 : chatMaxId;
                fetch(URL_MSGS + '?since=' + since, { headers: { 'Accept': 'application/json' } })
                    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json() })
                    .then(function (data) {
                        var msgs = data.messages;
                        if (initial) { historyHasMore = !!data.has_more; historyLoading = false }
                        if (!msgs || !msgs.length) { if (initial) { messagesEl.innerHTML = ''; sE(true); renderHistoryControl() } return }
                        sE(false); var wasB = isNB();
                        if (initial) {
                            messagesEl.innerHTML = '';
                            renderHistoryControl();
                            for (var i = 0; i < msgs.length; i++) appendMsg(msgs[i]);

                            /* ✅ FIX: Gunakan i_read dari database, bukan localStorage */
                            mentionUnread = 0;
                            for (var m = 0; m < msgs.length; m++) {
                                if (String(msgs[m].user_id) !== String(MY_ID) && amMentioned(msgs[m].mentions_parsed)) {
                                    if (msgs[m].i_read) {
                                        /* Database bilang sudah baca → tandai seen di DOM + memori */
                                        markMentionSeen(msgs[m].id);
                                        var seenEl = messagesEl.querySelector('[data-msg-id="' + msgs[m].id + '"]');
                                        if (seenEl) seenEl.classList.add('mention-seen');
                                    } else {
                                        /* Belum baca → masukkan counter */
                                        mentionUnread++;
                                    }
                                }
                            }
                            updateMentionBadges();
                        } else {
                            var nc = 0; for (var j = 0; j < msgs.length; j++) {
                                if (!messagesEl.querySelector('[data-msg-id="' + msgs[j].id + '"]')) {
                                    appendMsg(msgs[j]); nc++;
                                    if (!isChatReadable()) {
                                        unread++;
                                        /* ✅ Mention baru saat chat tertutup — cek i_read dari database */
                                        if (String(msgs[j].user_id) !== String(MY_ID) && amMentioned(msgs[j].mentions_parsed) && !msgs[j].i_read) {
                                            mentionUnread++;
                                        }
                                    }
                                }
                            }
                            if (nc > 0 && !isChatReadable()) { uB(); updateMentionBadges() }
                        }
                        chatMaxId = data.max_id || chatMaxId; if (wasB || initial) sBB();
                        var idsToRead = []; for (var k = 0; k < msgs.length; k++) { if (String(msgs[k].user_id) !== String(MY_ID)) idsToRead.push(msgs[k].id) }
                        if (idsToRead.length && isChatReadable()) markRead(idsToRead);
                    })
                    .catch(function () { });
            }

            function loadOlderMessages() {
                if (!messagesEl || historyLoading || !historyHasMore) return;
                var first = messagesEl.querySelector('.msg-wrap[data-msg-id]'); if (!first) return;
                historyLoading = true; renderHistoryControl();
                var before = first.getAttribute('data-msg-id'), previousHeight = messagesEl.scrollHeight, previousTop = messagesEl.scrollTop;
                fetch(URL_MSGS + '?before=' + encodeURIComponent(before), { headers: { 'Accept': 'application/json' } })
                    .then(function (response) { if (!response.ok) throw new Error(response.status); return response.json() })
                    .then(function (data) {
                        var older = data.messages || [];
                        for (var i = older.length - 1; i >= 0; i--) {
                            if (!messagesEl.querySelector('.msg-wrap[data-msg-id="' + older[i].id + '"]')) appendMsg(older[i], true);
                        }
                        historyHasMore = !!data.has_more;
                        requestAnimationFrame(function () { messagesEl.scrollTop = previousTop + (messagesEl.scrollHeight - previousHeight) });
                        var ids = []; for (var j = 0; j < older.length; j++) if (String(older[j].user_id) !== String(MY_ID)) ids.push(older[j].id);
                        if (ids.length) markRead(ids);
                    })
                    .catch(function () { toast('Riwayat pesan gagal dimuat', 'error') })
                    .finally(function () { historyLoading = false; renderHistoryControl() });
            }

            function markRead(ids) { fetch(URL_READ, { method: 'POST', headers: { 'X-CSRF-TOKEN': CSRF, 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ message_ids: ids }) }).catch(function () { }) }

            function doSend() {
                if (!inp) return; var txt = inp.value.trim(); if (!txt || txt.length > MAX_LEN || sending) return;
                sending = true; rSB(); setSL(true);
                var body = { message: txt }; if (replyToId) body.reply_to = replyToId; if (draftMentions.length) body.mentions = draftMentions;
                fetch(URL_SEND, { method: 'POST', headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
                    .then(function (r) { if (r.status === 429) { toast('Terlalu cepat! Tunggu.', 'warning'); throw new Error('429') } if (!r.ok) throw new Error('HTTP ' + r.status); return r.json() })
                    .then(function (data) { if (!data.message) { toast('Respons tidak valid', 'error'); throw new Error('No message') } sE(false); appendMsg(data.message); chatMaxId = Math.max(chatMaxId, data.message.id); inp.value = ''; inp.style.height = 'auto'; if (charEl) { charEl.textContent = '0/' + MAX_LEN; charEl.className = 'cp-char' } doCancelReply(); draftMentions = []; updateAtBadge(); sBB(); sendBtn.classList.add('send-flash'); setTimeout(function () { sendBtn.classList.remove('send-flash') }, 500) })
                    .catch(function (err) { if (err.message === '429') return; toast('Gagal mengirim', 'error') })
                    .finally(function () { sending = false; setSL(false); rSB() });
            }

            function doEdit(data) {
                if (!data || !data.canEdit) { toast('Batas edit pesan sudah berakhir', 'warning'); return }
                swalActive = true;
                Swal.fire({ title: 'Edit pesan', input: 'textarea', inputValue: data.fullMessage || '', inputAttributes: { maxlength: '500', 'aria-label': 'Isi pesan' }, showCancelButton: true, confirmButtonText: 'Simpan', cancelButtonText: 'Batal', confirmButtonColor: '#6366f1', inputValidator: function (value) { value = (value || '').trim(); if (!value) return 'Pesan tidak boleh kosong'; if (value.length > MAX_LEN) return 'Maksimal 500 karakter' }, background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' })
                    .then(function (result) {
                        setTimeout(function () { swalActive = false }, 100); if (!result.isConfirmed) return;
                        fetch(URL_DEL + data.id, { method: 'PATCH', headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ message: (result.value || '').trim() }) })
                            .then(function (response) { return response.json().then(function (body) { if (!response.ok) throw new Error(body.error || 'Gagal mengedit pesan'); return body }) })
                            .then(function (body) { applyMessageUpdate(body.message); toast('Pesan diperbarui', 'success') })
                            .catch(function (error) { toast(error.message || 'Gagal mengedit pesan', 'error') });
                    });
            }

            window.shareRecordToChat = function (type, id) {
                var labels = { pr: 'PR', spph: 'SPPH', sp: 'SP' }, label = labels[type] || 'data';
                swalActive = true;
                Swal.fire({ title: 'Bagikan ' + label + ' ke Chat Tim?', text: 'Data akan dikirim sebagai kartu ringkas agar mudah dibaca.', icon: 'question', showCancelButton: true, confirmButtonText: 'Bagikan', cancelButtonText: 'Batal', confirmButtonColor: '#6366f1', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' })
                    .then(function (result) {
                        setTimeout(function () { swalActive = false }, 100); if (!result.isConfirmed) return;
                        fetch(URL_SHARE, { method: 'POST', headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ type: type, id: id }) })
                            .then(function (response) { return response.json().then(function (body) { if (!response.ok) throw new Error(body.error || 'Gagal membagikan data'); return body }) })
                            .then(function (body) {
                                if (chatOpen) {
                                    if (chatMinimized) restoreChat();
                                    sE(false); if (!messagesEl.querySelector('.msg-wrap[data-msg-id="' + body.message.id + '"]')) appendMsg(body.message);
                                    chatMaxId = Math.max(chatMaxId, body.message.id); sBB();
                                } else doToggle();
                                toast(label + ' dibagikan ke Chat Tim', 'success');
                            })
                            .catch(function (error) { toast(error.message || 'Gagal membagikan data', 'error') });
                    });
            };

            function doDelete(id) {
                closeReadPopup();
                swalActive = true;
                Swal.fire({ title: 'Hapus pesan?', text: 'Pesan sendiri akan dihapus untuk semua. Pesan masuk dari user lain hanya hilang dari tampilan Anda.', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#6b7280', confirmButtonText: 'Ya, hapus', cancelButtonText: 'Batal', allowOutsideClick: true, allowEscapeKey: true, background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' })
                    .then(function (r) { setTimeout(function () { swalActive = false }, 100); if (!r.isConfirmed) return; fetch(URL_DEL + id, { method: 'DELETE', headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json' } }).then(function (response) { return response.json().catch(function () { return {} }).then(function (body) { if (!response.ok) throw new Error(body.error || 'Gagal menghapus'); return body }) }).then(function () { var el = messagesEl.querySelector('[data-msg-id="' + id + '"]'); if (el) { el.style.animation = 'msgRemove .3s ease forwards'; setTimeout(function () { el.remove(); if (!messagesEl.querySelector('[data-msg-id]')) sE(true) }, 300) } }).catch(function (error) { var el = messagesEl.querySelector('[data-msg-id="' + id + '"]'); if (el) { el.setAttribute('data-can-delete', '0'); var btn = el.querySelector('.msg-del'); if (btn) btn.remove() } toast(error.message || 'Gagal menghapus', 'error') }) });
            }

            function renderPanelModeButtons() {
                if (fullscreenBtn) {
                    fullscreenBtn.classList.toggle('active', chatFullscreen);
                    fullscreenBtn.title = chatFullscreen ? 'Keluar dari layar penuh' : 'Layar penuh';
                    fullscreenBtn.setAttribute('aria-label', fullscreenBtn.title);
                    fullscreenBtn.innerHTML = chatFullscreen
                        ? '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 4v5H4m16 0h-5V4M4 15h5v5m6 0v-5h5"/></svg>'
                        : '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 3H3v5m13-5h5v5M8 21H3v-5m18 0v5h-5"/></svg>';
                }
                if (minimizeBtn) {
                    minimizeBtn.title = chatMinimized ? 'Buka kembali chat' : 'Minimize';
                    minimizeBtn.setAttribute('aria-label', minimizeBtn.title);
                    minimizeBtn.innerHTML = chatMinimized
                        ? '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 18h14V6H5v12Z"/></svg>'
                        : '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>';
                }
            }

            function setChatFullscreen(enabled) {
                chatFullscreen = !!enabled; chatMinimized = false;
                closeReadPopup();
                if (panel) { panel.classList.toggle('fullscreen', chatFullscreen); panel.classList.remove('minimized') }
                document.body.classList.toggle('chat-fullscreen-open', chatFullscreen);
                renderPanelModeButtons();
                setTimeout(function () { if (messagesEl) sBB(); if (inp) inp.focus() }, 80);
            }

            function toggleChatFullscreen() {
                if (!chatOpen) { doToggle(); setTimeout(function () { setChatFullscreen(true) }, 30); return }
                if (chatMinimized) restoreChat();
                setChatFullscreen(!chatFullscreen);
            }

            function minimizeChat() {
                if (!chatOpen || chatMinimized) return;
                chatMinimized = true; chatFullscreen = false;
                closeReadPopup();
                if (panel) { panel.classList.add('minimized'); panel.classList.remove('fullscreen') }
                document.body.classList.remove('chat-fullscreen-open'); toggleSearch(false);
                if (inp) inp.blur(); renderPanelModeButtons(); refreshMentionSummary();
            }

            function restoreChat() {
                if (!chatOpen) { doToggle(); return }
                var hadMention = mentionUnread > 0;
                chatMinimized = false;
                closeReadPopup();
                if (panel) panel.classList.remove('minimized');
                unread = 0; uB(); renderPanelModeButtons(); loadMessages(true); startPoll(); startReactionPoll();
                if (hadMention) setTimeout(scrollToNextMention, 400);
                setTimeout(function () { if (inp) inp.focus() }, 180);
            }

            function closeChat() {
                if (!chatOpen) return;
                chatOpen = false; chatFullscreen = false; chatMinimized = false;
                if (panel) panel.classList.remove('open', 'fullscreen', 'minimized');
                if (trigger) trigger.classList.remove('active');
                document.body.classList.remove('chat-fullscreen-open');
                closeMentionDd(); closeFollowupDd();
                stopPoll(); stopReactionPoll(); toggleSearch(false); refreshMentionSummary();
                if (typeof cPP === 'function') cPP();
                closeReadPopup();
                renderPanelModeButtons(); window._chatOpen = false;
            }

            function doToggle() {
                if (chatOpen) { closeChat(); return }
                var hadMention = mentionUnread > 0;
                chatOpen = true; chatFullscreen = false; chatMinimized = false;
                if (panel) { panel.classList.add('open'); panel.classList.remove('fullscreen', 'minimized') }
                if (trigger) trigger.classList.add('active');
                unread = 0; uB(); renderPanelModeButtons(); loadMessages(true); startPoll(); startReactionPoll();
                if (hadMention) setTimeout(scrollToNextMention, 400);
                setTimeout(function () { if (inp) inp.focus() }, 280);
                window._chatOpen = true;
            }
            window._chatOpen = false; window._chatToggle = doToggle;
            window._chatHandleEscape = function () { if (chatFullscreen) setChatFullscreen(false); else closeChat() };

            function startPoll() { if (chatTimer) return; chatTimer = setInterval(function () { loadMessages(false) }, 8000) }
            function stopPoll() { if (chatTimer) { clearInterval(chatTimer); chatTimer = null } }
            function startReactionPoll() { if (reactionTimer) return; refreshVisibleReactions(); reactionTimer = setInterval(refreshVisibleReactions, 30000) }
            function stopReactionPoll() { if (reactionTimer) { clearInterval(reactionTimer); reactionTimer = null } }
            function startMentionPoll() { if (mentionTimer) return; refreshMentionSummary(); mentionTimer = setInterval(refreshMentionSummary, 30000) }
            function stopMentionPoll() { if (mentionTimer) { clearInterval(mentionTimer); mentionTimer = null } }
            document.addEventListener('visibilitychange', function () {
                if (document.hidden) { stopPoll(); stopReactionPoll(); if (!notifyEnabled && !soundEnabled) stopMentionPoll() }
                else { startMentionPoll(); if (chatOpen) { startPoll(); startReactionPoll() } }
            });
            if (!document.hidden) startMentionPoll();

            if (trigger) trigger.addEventListener('click', function (e) {
                e.stopPropagation();
                if (chatMinimized) { restoreChat(); return }
                if (mentionUnread > 0) {
                    if (!chatOpen) { doToggle() }
                    else { scrollToNextMention() }
                } else {
                    doToggle();
                }
            });

            if (cpHeadMention) {
                cpHeadMention.addEventListener('click', function (e) {
                    e.stopPropagation();
                    scrollToNextMention();
                });
            }

            if (searchBtn) searchBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleSearch(!searchPanel.classList.contains('open')) });
            if (searchClose) searchClose.addEventListener('click', function (e) { e.stopPropagation(); toggleSearch(false) });
            if (searchInput) searchInput.addEventListener('input', function () { var query = this.value; clearTimeout(searchTimer); searchTimer = setTimeout(function () { runSearch(query) }, 320) });
            if (searchResults) searchResults.addEventListener('click', function (e) {
                var item = e.target.closest('.cp-search-result'); if (!item) return; e.stopPropagation();
                var id = item.getAttribute('data-search-id'), wrap = messagesEl ? messagesEl.querySelector('.msg-wrap[data-msg-id="' + id + '"]') : null;
                if (!wrap) { toast('Pesan lama ditampilkan di hasil pencarian.', 'info'); return }
                toggleSearch(false); wrap.scrollIntoView({ behavior: 'smooth', block: 'center' }); var bubble = wrap.querySelector('.msg-bubble'); if (bubble) bubble.style.animation = 'mentionFlash .6s ease';
            });
            if (notifyBtn) notifyBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleNotifications() });
            if (fullscreenBtn) fullscreenBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleChatFullscreen() });
            if (minimizeBtn) minimizeBtn.addEventListener('click', function (e) { e.stopPropagation(); if (chatMinimized) restoreChat(); else minimizeChat() });
            if (chatHead) chatHead.addEventListener('click', function (e) { if (chatMinimized && !e.target.closest('button')) { e.stopPropagation(); restoreChat() } });

            var ccb = document.getElementById('btnCloseChat'); if (ccb) ccb.addEventListener('click', function (e) { e.stopPropagation(); closeChat() });
            if (sendBtn) sendBtn.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); doSend() });

            document.addEventListener('click', function (e) {
                if (swalActive) return;
                if (followupState.active && panel && !e.target.closest('#cpInputWrap')) closeFollowupDd();
                if (mentionState.active && panel && !e.target.closest('#cpInputWrap')) closeMentionDd();
                if (chatOpen && !chatMinimized && panel && !panel.contains(e.target) && trigger && !trigger.contains(e.target) && !ctxMenu.contains(e.target) && !e.target.closest('.read-popup')) { closeChat() }
            });
        })();

        /* ═══ APPROVAL PR POLLING ═══ */

