        const canAccessKacab = window.TORPR_PAGE_CONFIG.canAccessKacab;

        function escapeHtml(str) {
            return String(str ?? '').replace(/[&<>"']/g, (m) => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[m]));
        }

        async function copyTorprText(value, title = 'Berhasil disalin') {
            const text = String(value ?? '').trim();
            if (!text) return;

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                } else {
                    const temp = document.createElement('textarea');
                    temp.value = text;
                    temp.setAttribute('readonly', '');
                    temp.style.position = 'fixed';
                    temp.style.opacity = '0';
                    document.body.appendChild(temp);
                    temp.select();
                    document.execCommand('copy');
                    document.body.removeChild(temp);
                }

                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title,
                    text,
                    showConfirmButton: false,
                    timer: 1800,
                    timerProgressBar: true,
                });
            } catch (error) {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Gagal menyalin',
                    text: 'Silakan blok dan copy manual.',
                    showConfirmButton: false,
                    timer: 2200,
                });
            }
        }

        const torprMyProgressUrl = window.TORPR_PAGE_CONFIG.myProgressUrl;
        const torprMyProgressArchiveUrl = window.TORPR_PAGE_CONFIG.myProgressArchiveUrl;
        let torprMyProgressCache = null;

        function torprMyBadgeTone(tone) {
            return ['blue', 'emerald', 'amber', 'red', 'slate'].includes(tone) ? tone : 'slate';
        }

        function torprMySafeSelector(value) {
            return String(value ?? '').replace(/[^a-zA-Z0-9_-]/g, '_');
        }

        function torprMyNormalize(value) {
            return String(value ?? '')
                .toLowerCase()
                .normalize('NFKD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, ' ')
                .trim();
        }

        function torprMySearchText(item, extra = '') {
            return torprMyNormalize([
                item.nomor_pr,
                item.tujuan,
                item.portofolio,
                item.buyer,
                item.vendor,
                item.spph,
                item.sp,
                item.general_registration_number,
                item.status_label,
                item.sisa_sla,
                item.invoice,
                item.promised_date,
                item.goods_arrived_at,
                extra,
            ].filter(Boolean).join(' '));
        }

        function torprMyCompact(value) {
            return torprMyNormalize(value).replace(/\s+/g, '');
        }

        function torprMyHasFilled(value) {
            const text = String(value ?? '').trim();
            return Boolean(text && text !== '-' && text.toLowerCase() !== 'belum ada');
        }

        function renderTorprMyCenter(data, mode = 'data') {
            const summary = data.summary || {};
            const items = Array.isArray(data.items) ? data.items : [];
            const isTracking = mode === 'tracking';

            const stat = (label, value, icon) => `
                <div class="torpr-my-stat">
                    <span>${escapeHtml(label)}</span>
                    <strong>${escapeHtml(value ?? 0)}</strong>
                    <small class="text-[11px] font-black text-slate-400 dark:text-slate-500">${escapeHtml(icon)}</small>
                </div>
            `;

            const itemHtml = items.length ? items.map((item, index) => {
                const progress = Math.max(0, Math.min(100, Number(item.progress || 0)));
                const rowKey = torprMySafeSelector(`${index}_${item.id}`);
                const stages = (item.stages || []).map(stage => `
                    <div class="torpr-my-stage ${stage.done ? 'is-done' : ''}" title="${escapeHtml(stage.at || '-')}">
                        <div>${stage.done ? '✅' : '○'} ${escapeHtml(stage.label)}</div>
                        <div class="mt-1 text-[10px] opacity-75">${escapeHtml(stage.at || 'belum')}</div>
                    </div>
                `).join('');

                return `
                    <article class="torpr-my-card" data-my-pr-card data-search="${escapeHtml(`${item.nomor_pr} ${item.tujuan} ${item.portofolio} ${item.buyer} ${item.vendor}`.toLowerCase())}">
                        <div class="torpr-my-card-head">
                            <div class="min-w-0">
                                <div class="torpr-my-number">${escapeHtml(item.nomor_pr)}</div>
                                <div class="torpr-my-title">${escapeHtml(item.tujuan)}</div>
                                <div class="torpr-my-meta">
                                    <span>🧩 ${escapeHtml(item.portofolio || '-')}</span>
                                    <span>💰 ${escapeHtml(item.nilai_pr_label || 'Rp 0')}</span>
                                    <span>👤 Buyer: ${escapeHtml(item.buyer || '-')}</span>
                                    <span>🏢 Vendor: ${escapeHtml(item.vendor || '-')}</span>
                                    <span>🕒 Update: ${escapeHtml(item.updated_at || '-')}</span>
                                </div>
                            </div>
                            <span class="torpr-my-badge ${torprMyBadgeTone(item.status_tone)}">${escapeHtml(item.status_label)}</span>
                        </div>

                        <div class="torpr-my-progress" aria-label="Progress ${progress}%">
                            <span style="width:${progress}%"></span>
                        </div>
                        <div class="mt-2 text-xs font-black text-slate-500 dark:text-slate-300">${progress}% proses berjalan</div>

                        <div class="torpr-my-stage-grid">
                            ${stages}
                        </div>

                        <div class="torpr-my-actions">
                            ${item.tracking_url ? `
                                <a href="${escapeHtml(item.tracking_url)}" target="_blank" rel="noopener" class="torpr-my-action primary">
                                    🧭 Buka Tracking
                                </a>
                            ` : ''}
                            <button type="button" class="torpr-my-action chat" data-my-pr-follow-up="${Number(item.id)}">
                                💬 Follow Up Chat
                            </button>
                            ${item.nomor_pr && item.nomor_pr !== 'Nomor PR belum diisi' ? `
                                <button type="button" class="torpr-my-action archive" data-my-pr-archive="${escapeHtml(item.nomor_pr)}" data-my-pr-archive-target="myPrArchive${rowKey}">
                                    📎 Muat Lampiran
                                </button>
                            ` : ''}
                        </div>

                        <div id="myPrArchive${rowKey}" class="torpr-my-archive-box hidden"></div>
                    </article>
                `;
            }).join('') : `
                <div class="torpr-my-empty">
                    <div class="text-4xl mb-2">🧾</div>
                    Belum ada PR yang tercatat sebagai data kamu. Kalau baru input, coba refresh halaman atau cek filter pemilik data.
                </div>
            `;

            return `
                <div class="torpr-my-wrap">
                    <div class="torpr-my-hero">
                        <div class="text-xs font-black uppercase tracking-[.22em] opacity-80">Cockpit personal operasional</div>
                        <h2>${isTracking ? 'Tracking Data Saya' : 'PR Saya'}</h2>
                        <p>
                            Semua PR yang kamu buat diringkas di sini: status umum, progress pengadaan,
                            vendor, SPPH/SP, estimasi barang datang, invoice, sampai lampiran arsip per nomor PR.
                        </p>
                    </div>
                    <div class="torpr-my-content">
                        <div class="torpr-my-stats">
                            ${stat('Total PR Saya', summary.total, 'semua data')}
                            ${stat('Perlu Follow Up', summary.need_follow_up, 'prioritas')}
                            ${stat('Menunggu Umum', summary.waiting_umum, 'approval')}
                            ${stat('Sedang Jalan', summary.in_progress, 'progress')}
                            ${stat('Selesai', summary.done, 'done')}
                        </div>

                        <div class="torpr-my-toolbar">
                            <input id="torprMySearch" class="torpr-my-search" type="search"
                                placeholder="Cari PR saya: nomor, vendor, portofolio, buyer..."
                                autocomplete="off">
                            <div class="flex flex-wrap gap-2">
                                <button type="button" class="torpr-my-mini-btn" onclick="filterTorprToMine()">👤 Filter halaman ke data saya</button>
                                <button type="button" class="torpr-my-mini-btn" onclick="reloadMyPrCenter('${escapeHtml(mode)}')">🔄 Refresh ringkasan</button>
                            </div>
                        </div>

                        <div id="torprMyPrList" class="torpr-my-list">
                            ${itemHtml}
                        </div>

                        <div class="mt-4 text-center text-xs font-bold text-slate-500 dark:text-slate-400">
                            Data dibuat: ${escapeHtml(data.generated_at || '-')} • Maksimal ${escapeHtml(data.limit || 50)} PR terbaru agar performa tetap ringan.
                        </div>
                    </div>
                </div>
            `;
        }

        function renderTorprMyCenterV2(data, mode = 'data') {
            const summary = data.summary || {};
            const items = Array.isArray(data.items) ? data.items : [];
            const isTracking = mode === 'tracking';

            const stat = (label, value, icon) => `
                <div class="torpr-my-stat">
                    <span>${escapeHtml(label)}</span>
                    <strong>${escapeHtml(value ?? 0)}</strong>
                    <small class="text-[11px] font-black text-slate-400 dark:text-slate-500">${escapeHtml(icon)}</small>
                </div>
            `;

            const riskInfo = (item) => {
                const progress = Number(item.progress || 0);
                const sisa = String(item.sisa_sla || '').toLowerCase();

                if (String(item.status_label || '').toLowerCase().includes('lengkap') || progress >= 100) {
                    return { tone: 'emerald', label: 'Aman / selesai', text: 'PR sudah lengkap, tinggal dipakai sebagai bukti tracking dan audit.' };
                }

                if (item.needs_follow_up || sisa.includes('-') || String(item.status_tone || '') === 'red') {
                    return { tone: 'red', label: 'Risiko tinggi', text: 'Perlu follow up cepat. Sistem membaca PR ini berpotensi macet atau melewati SLA.' };
                }

                if (progress < 40 || String(item.status_tone || '') === 'amber') {
                    return { tone: 'amber', label: 'Perlu dipantau', text: 'Masih tahap awal. Cocok untuk ditanyakan progresnya sebelum mendekati batas SLA.' };
                }

                return { tone: 'blue', label: 'On track', text: 'Progress masih berjalan normal. Tetap pantau SPPH, SP, barang datang, dan invoice.' };
            };

            const actions = (item, rowKey) => `
                <div class="torpr-my-actions">
                    ${item.tracking_url ? `
                        <a href="${escapeHtml(item.tracking_url)}" target="_blank" rel="noopener" class="torpr-my-action primary">
                            🧭 Buka Tracking
                        </a>
                    ` : ''}
                    <button type="button" class="torpr-my-action chat" data-my-pr-follow-up="${Number(item.id)}">
                        💬 Follow Up Chat
                    </button>
                    ${item.nomor_pr && item.nomor_pr !== 'Nomor PR belum diisi' ? `
                        <button type="button" class="torpr-my-action archive" data-my-pr-archive="${escapeHtml(item.nomor_pr)}" data-my-pr-archive-target="myPrArchive${rowKey}">
                            📎 Muat Lampiran
                        </button>
                    ` : ''}
                </div>
                <div id="myPrArchive${rowKey}" class="torpr-my-archive-box hidden"></div>
            `;

            const emptyHtml = `
                <div class="torpr-my-empty">
                    <div class="text-4xl mb-2">🧾</div>
                    Belum ada PR yang tercatat sebagai data kamu. Kalau baru input, coba refresh halaman atau cek filter pemilik data.
                </div>
            `;

            const dataHtml = items.length ? items.map((item, index) => {
                const progress = Math.max(0, Math.min(100, Number(item.progress || 0)));
                const rowKey = torprMySafeSelector(`data_${index}_${item.id}`);
                const risk = riskInfo(item);

                return `
                    <article class="torpr-my-card torpr-my-data-card"
                        data-my-pr-card
                        data-search="${escapeHtml(torprMySearchText(item, `${risk.label} ${risk.text}`))}"
                        data-my-risk="${escapeHtml(risk.tone)}"
                        data-my-progress="${progress}"
                        data-my-status="${escapeHtml(torprMyNormalize(item.status_label))}"
                        data-my-has-spph="${torprMyHasFilled(item.spph) ? '1' : '0'}"
                        data-my-has-sp="${torprMyHasFilled(item.sp) ? '1' : '0'}">
                        <div class="min-w-0">
                            <div class="torpr-my-card-head">
                                <div class="min-w-0">
                                    <div class="torpr-my-number">${escapeHtml(item.nomor_pr)}</div>
                                    <div class="torpr-my-title">${escapeHtml(item.tujuan)}</div>
                                    <div class="torpr-my-meta">
                                        <span>🧩 ${escapeHtml(item.portofolio || '-')}</span>
                                        <span>💰 ${escapeHtml(item.nilai_pr_label || 'Rp 0')}</span>
                                        <span>🕒 Update: ${escapeHtml(item.updated_at || '-')}</span>
                                    </div>
                                </div>
                                <span class="torpr-my-badge ${torprMyBadgeTone(item.status_tone)}">${escapeHtml(item.status_label)}</span>
                            </div>

                            <div class="torpr-my-data-grid">
                                <div class="torpr-my-data-cell"><span>Buyer</span><strong>${escapeHtml(item.buyer || '-')}</strong></div>
                                <div class="torpr-my-data-cell"><span>Vendor</span><strong>${escapeHtml(item.vendor || '-')}</strong></div>
                                <div class="torpr-my-data-cell"><span>Reg Umum</span><strong>${escapeHtml(item.general_registration_number || '-')}</strong></div>
                                <div class="torpr-my-data-cell"><span>SPPH</span><strong>${escapeHtml(item.spph || '-')}</strong></div>
                                <div class="torpr-my-data-cell"><span>SP / Kontrak</span><strong>${escapeHtml(item.sp || '-')}</strong></div>
                                <div class="torpr-my-data-cell"><span>Estimasi Datang</span><strong>${escapeHtml(item.promised_date || '-')}</strong></div>
                                <div class="torpr-my-data-cell"><span>Invoice</span><strong>${escapeHtml(item.invoice || '-')}</strong></div>
                            </div>

                            ${actions(item, rowKey)}
                        </div>

                        <aside class="torpr-my-risk">
                            <span class="torpr-my-badge ${torprMyBadgeTone(risk.tone)}">${escapeHtml(risk.label)}</span>
                            <h4>Prediksi Risiko PR</h4>
                            <div class="torpr-my-progress" aria-label="Progress ${progress}%">
                                <span style="width:${progress}%"></span>
                            </div>
                            <p>${progress}% proses berjalan. ${escapeHtml(risk.text)}</p>
                        </aside>
                    </article>
                `;
            }).join('') : emptyHtml;

            const trackingHtml = items.length ? items.map((item, index) => {
                const progress = Math.max(0, Math.min(100, Number(item.progress || 0)));
                const rowKey = torprMySafeSelector(`tracking_${index}_${item.id}`);
                const risk = riskInfo(item);
                const stages = Array.isArray(item.stages) ? item.stages : [];
                const nextStage = stages.find(stage => !stage.done);
                const timeline = stages.map(stage => `
                    <div class="torpr-my-timeline-step ${stage.done ? 'is-done' : ''}">
                        <div>
                            <strong>${stage.done ? '✅' : '⏳'} ${escapeHtml(stage.label)}</strong>
                            <small>${escapeHtml(stage.at || (stage.done ? 'selesai' : 'menunggu'))}</small>
                        </div>
                        <span class="torpr-my-badge ${stage.done ? 'emerald' : 'slate'}">${stage.done ? 'Done' : 'Next'}</span>
                    </div>
                `).join('');

                return `
                    <article class="torpr-my-card torpr-my-timeline-card"
                        data-my-pr-card
                        data-search="${escapeHtml(torprMySearchText(item, `${risk.label} ${risk.text} ${stages.map(stage => stage.label).join(' ')}`))}"
                        data-my-risk="${escapeHtml(risk.tone)}"
                        data-my-progress="${progress}"
                        data-my-status="${escapeHtml(torprMyNormalize(item.status_label))}"
                        data-my-has-spph="${torprMyHasFilled(item.spph) ? '1' : '0'}"
                        data-my-has-sp="${torprMyHasFilled(item.sp) ? '1' : '0'}">
                        <div class="torpr-my-card-head">
                            <div class="min-w-0">
                                <div class="torpr-my-number">${escapeHtml(item.nomor_pr)}</div>
                                <div class="torpr-my-title">${escapeHtml(item.tujuan)}</div>
                                <div class="torpr-my-meta">
                                    <span>🧩 ${escapeHtml(item.portofolio || '-')}</span>
                                    <span>👤 Buyer: ${escapeHtml(item.buyer || '-')}</span>
                                    <span>🏢 Vendor: ${escapeHtml(item.vendor || '-')}</span>
                                    <span>📅 Barang: ${escapeHtml(item.goods_arrived_at || item.promised_date || '-')}</span>
                                </div>
                                <div class="torpr-my-current-stage">
                                    ${progress >= 100 ? '🏁 Selesai' : `📍 Tahap berikutnya: ${escapeHtml(nextStage?.label || 'monitoring progress')}`}
                                </div>
                            </div>
                            <div class="flex flex-col items-end gap-2">
                                <span class="torpr-my-badge ${torprMyBadgeTone(item.status_tone)}">${escapeHtml(item.status_label)}</span>
                                <span class="torpr-my-badge ${torprMyBadgeTone(risk.tone)}">🔮 ${escapeHtml(risk.label)}</span>
                            </div>
                        </div>

                        <div class="torpr-my-progress" aria-label="Progress ${progress}%">
                            <span style="width:${progress}%"></span>
                        </div>
                        <div class="mt-2 text-xs font-black text-slate-500 dark:text-slate-300">
                            ${progress}% • ${escapeHtml(item.sisa_sla || 'SLA belum dihitung')} • ${escapeHtml(risk.text)}
                        </div>

                        <div class="torpr-my-timeline">
                            ${timeline}
                        </div>

                        ${actions(item, rowKey)}
                    </article>
                `;
            }).join('') : emptyHtml;

            return `
                <div class="torpr-my-wrap">
                    <div class="torpr-my-hero">
                        <div class="text-xs font-black uppercase tracking-[.22em] opacity-80">
                            ${isTracking ? 'Timeline personal operasional' : 'Cockpit data pribadi'}
                        </div>
                        <h2>${isTracking ? 'Tracking Data Saya' : 'Lihat Data Saya'}</h2>
                        <p>
                            ${isTracking
                                ? 'Mode ini fokus ke perjalanan PR: tahap mana yang sudah selesai, apa tahap berikutnya, dan PR mana yang perlu segera difollow up.'
                                : 'Mode ini fokus ke daftar PR pribadi: nomor, nilai, buyer, vendor, SPPH/SP, estimasi barang, invoice, dan lampiran arsip.'}
                        </p>
                    </div>
                    <div class="torpr-my-content">
                        <div class="torpr-my-stats">
                            ${stat('Total PR Saya', summary.total, 'semua data')}
                            ${stat('Perlu Follow Up', summary.need_follow_up, 'prioritas')}
                            ${stat('Menunggu Umum', summary.waiting_umum, 'approval')}
                            ${stat('Sedang Jalan', summary.in_progress, 'progress')}
                            ${stat('Selesai', summary.done, 'done')}
                        </div>

                        <div class="torpr-my-toolbar">
                            <input id="torprMySearch" class="torpr-my-search" type="search"
                                placeholder="${isTracking ? 'Cari timeline: nomor PR, vendor, tahap, buyer...' : 'Cari data saya: nomor, vendor, portofolio, buyer...'}"
                                autocomplete="off">
                            <div class="flex flex-wrap gap-2">
                                <button type="button" class="torpr-my-mini-btn" onclick="filterTorprToMine()">👤 Filter halaman ke data saya</button>
                                <button type="button" class="torpr-my-mini-btn" onclick="reloadMyPrCenter('${escapeHtml(mode)}')">🔄 Refresh ringkasan</button>
                                <button type="button" class="torpr-my-mini-btn" onclick="openMyPrCenter('${isTracking ? 'data' : 'tracking'}')">
                                    ${isTracking ? '📋 Pindah ke Data Saya' : '🧭 Pindah ke Tracking'}
                                </button>
                            </div>
                        </div>

                        <div class="torpr-my-chipbar" aria-label="Filter cepat PR saya">
                            <button type="button" class="torpr-my-filter-chip is-active" data-my-filter="all">Semua</button>
                            <button type="button" class="torpr-my-filter-chip" data-my-filter="risk_high">Risiko Tinggi</button>
                            <button type="button" class="torpr-my-filter-chip" data-my-filter="watch">Perlu Dipantau</button>
                            <button type="button" class="torpr-my-filter-chip" data-my-filter="on_track">On Track</button>
                            <button type="button" class="torpr-my-filter-chip" data-my-filter="done">Selesai</button>
                            <button type="button" class="torpr-my-filter-chip" data-my-filter="has_spph">Ada SPPH</button>
                            <button type="button" class="torpr-my-filter-chip" data-my-filter="has_sp">Ada SP</button>
                        </div>

                        <div id="torprMyResultCount" class="torpr-my-result-count">
                            📌 Menampilkan ${items.length} data
                        </div>

                        <div id="torprMyPrList" class="torpr-my-list">
                            ${isTracking ? trackingHtml : dataHtml}
                        </div>

                        <div id="torprMyNoResult" class="torpr-my-empty torpr-my-no-result mt-3">
                            <div class="text-4xl mb-2">🔎</div>
                            Tidak ada PR yang cocok. Coba cari nomor belakang, vendor, buyer, portofolio, status, SPPH, atau SP.
                        </div>

                        <div class="mt-4 text-center text-xs font-bold text-slate-500 dark:text-slate-400">
                            Data dibuat: ${escapeHtml(data.generated_at || '-')} • Maksimal ${escapeHtml(data.limit || 50)} PR terbaru agar performa tetap ringan.
                        </div>
                    </div>
                </div>
            `;
        }

        window.openMyPrCenter = async function (mode = 'data', force = false) {
            try {
                if (!torprMyProgressCache || force) {
                    Swal.fire({
                        title: 'Memuat PR Saya...',
                        text: 'Sebentar ya, saya rangkum data pribadi kamu dulu.',
                        allowOutsideClick: false,
                        didOpen: () => Swal.showLoading(),
                    });

                    const response = await fetch(torprMyProgressUrl, {
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Gagal memuat PR Saya.');
                    }

                    torprMyProgressCache = await response.json();
                }

                Swal.fire({
                    html: renderTorprMyCenterV2(torprMyProgressCache, mode),
                    width: 'min(1180px, 96vw)',
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: {
                        popup: 'torpr-my-popup',
                        htmlContainer: 'torpr-my-html',
                    },
                    didOpen: () => {
                        const search = document.getElementById('torprMySearch');
                        let activeMyFilter = 'all';

                        const applyMyPrFilter = () => {
                            const rawKeyword = search?.value || '';
                            const keyword = torprMyNormalize(rawKeyword);
                            const compactKeyword = torprMyCompact(rawKeyword);
                            let visibleCount = 0;

                            document.querySelectorAll('[data-my-pr-card]').forEach(card => {
                                const text = card.getAttribute('data-search') || '';
                                const compactText = text.replace(/\s+/g, '');
                                const risk = card.getAttribute('data-my-risk') || '';
                                const progress = Number(card.getAttribute('data-my-progress') || 0);
                                const status = card.getAttribute('data-my-status') || '';
                                const hasSpph = card.getAttribute('data-my-has-spph') === '1';
                                const hasSp = card.getAttribute('data-my-has-sp') === '1';
                                const keywordMatch = !keyword
                                    || text.includes(keyword)
                                    || (compactKeyword && compactText.includes(compactKeyword));

                                let filterMatch = true;
                                if (activeMyFilter === 'risk_high') {
                                    filterMatch = risk === 'red';
                                } else if (activeMyFilter === 'watch') {
                                    filterMatch = risk === 'amber';
                                } else if (activeMyFilter === 'on_track') {
                                    filterMatch = risk === 'blue';
                                } else if (activeMyFilter === 'done') {
                                    filterMatch = progress >= 100 || status.includes('lengkap') || status.includes('selesai');
                                } else if (activeMyFilter === 'has_spph') {
                                    filterMatch = hasSpph;
                                } else if (activeMyFilter === 'has_sp') {
                                    filterMatch = hasSp;
                                }

                                const show = keywordMatch && filterMatch;

                                card.classList.toggle('hidden', !show);
                                if (show) {
                                    visibleCount += 1;
                                }
                            });

                            document.getElementById('torprMyNoResult')?.classList.toggle('is-visible', visibleCount === 0);
                            const resultCount = document.getElementById('torprMyResultCount');
                            if (resultCount) {
                                resultCount.textContent = `📌 Menampilkan ${visibleCount} data`;
                            }
                        };

                        search?.addEventListener('input', applyMyPrFilter);

                        document.querySelectorAll('[data-my-filter]').forEach(chip => {
                            chip.addEventListener('click', () => {
                                activeMyFilter = chip.getAttribute('data-my-filter') || '';
                                document.querySelectorAll('[data-my-filter]').forEach(item => {
                                    item.classList.toggle('is-active', item === chip);
                                });
                                applyMyPrFilter();
                            });
                        });

                        applyMyPrFilter();

                        document.querySelectorAll('[data-my-pr-follow-up]').forEach(btn => {
                            btn.addEventListener('click', () => {
                                const id = Number(btn.getAttribute('data-my-pr-follow-up'));
                                if (window.shareRecordToChat) {
                                    shareRecordToChat('pr', id);
                                }
                            });
                        });

                        document.querySelectorAll('[data-my-pr-archive]').forEach(btn => {
                            btn.addEventListener('click', () => loadMyPrArchive(btn));
                        });
                    },
                });
            } catch (error) {
                Swal.fire('Gagal', error.message || 'PR Saya belum bisa dimuat.', 'error');
            }
        }

        window.reloadMyPrCenter = function (mode = 'data') {
            torprMyProgressCache = null;
            openMyPrCenter(mode, true);
        }

        window.filterTorprToMine = function () {
            const url = new URL(window.location.href);
            url.searchParams.set('data_owner', 'me');
            url.searchParams.delete('page');
            window.location.href = url.toString();
        }

        async function loadMyPrArchive(button) {
            const nomorPr = button.getAttribute('data-my-pr-archive');
            const targetId = button.getAttribute('data-my-pr-archive-target');
            const target = document.getElementById(targetId);

            if (!target || !nomorPr) return;

            target.classList.remove('hidden');
            target.innerHTML = '⏳ Mengecek lampiran di Sistem Arsip...';
            button.disabled = true;

            try {
                const url = new URL(torprMyProgressArchiveUrl, window.location.origin);
                url.searchParams.set('nomor_pr', nomorPr);

                const response = await fetch(url.toString(), {
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                });

                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(data.message || 'Lampiran belum bisa dicek.');
                }

                const docs = Array.isArray(data.documents) ? data.documents : [];
                const packages = Array.isArray(data.packages) ? data.packages : [];

                if (data.status !== 'available' || (!docs.length && !packages.length)) {
                    target.innerHTML = `📭 ${escapeHtml(data.message || 'Belum ada lampiran arsip untuk PR ini.')}`;
                    return;
                }

                const docHtml = docs.map(doc => `
                    <div class="mt-2 flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                        <div class="font-black text-slate-900 dark:text-white">📄 ${escapeHtml(doc.name || 'Dokumen')}</div>
                        <div class="text-xs text-slate-500 dark:text-slate-400">
                            ${escapeHtml(doc.type || 'Dokumen')} • ${escapeHtml(doc.uploaded_at || doc.date || '-')}
                            ${doc.location ? ` • ${escapeHtml(doc.location)}` : ''}
                        </div>
                        <div class="flex flex-wrap gap-2">
                            ${doc.preview_url ? `<a class="torpr-my-mini-btn" target="_blank" rel="noopener" href="${escapeHtml(doc.preview_url)}">Lihat</a>` : ''}
                            ${doc.download_url ? `<a class="torpr-my-mini-btn" target="_blank" rel="noopener" href="${escapeHtml(doc.download_url)}">Unduh</a>` : ''}
                        </div>
                    </div>
                `).join('');

                const packageHtml = packages.map(pkg => `
                    <div class="mt-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-100">
                        📦 ${escapeHtml(pkg.name || 'Paket arsip')} • ${escapeHtml(pkg.file_count || 0)} file
                        ${pkg.package_download_url ? `<a class="ml-2 underline font-black" target="_blank" rel="noopener" href="${escapeHtml(pkg.package_download_url)}">Unduh Paket</a>` : ''}
                    </div>
                `).join('');

                target.innerHTML = `
                    <div class="font-black text-slate-900 dark:text-white">📎 ${escapeHtml(data.message || 'Lampiran ditemukan.')}</div>
                    ${docHtml}
                    ${packageHtml}
                `;
            } catch (error) {
                target.innerHTML = `⚠️ ${escapeHtml(error.message || 'Gagal memuat lampiran.')}`;
            } finally {
                button.disabled = false;
            }
        }

        function initTorprSelect2() {
            if (!window.jQuery || !$.fn.select2) return;

            $('.select2-torpr-filter-portofolio').select2({
                placeholder: 'Pilih satu / beberapa portofolio...',
                allowClear: true,
                width: '100%',
                closeOnSelect: false,
                minimumResultsForSearch: 0,
                language: {
                    noResults: function () { return 'Tidak ada portofolio'; },
                    searching: function () { return 'Mencari...'; }
                }
            });

            $('.select2-torpr-portofolio').select2({
                placeholder: 'Cari / pilih portofolio...',
                allowClear: false,
                width: '100%',
                dropdownParent: $('#formModal'),
                minimumResultsForSearch: 0
            });
        }

        $(document).ready(function () {
            initTorprSelect2();
        });

        (function () {
            // Check if redirected from QR sign with auto_request parameter
            const urlParams = new URLSearchParams(window.location.search);
            const autoRequestId = urlParams.get('auto_request');

            if (autoRequestId) {
                // Remove parameter from URL (clean up)
                window.history.replaceState({}, document.title, window.location.pathname);

                // Show request prompt
                setTimeout(() => {
                    showAutoRequestPrompt(autoRequestId);
                }, 500);
            }
        })();

        window.showLogModal = function (id) {
            const modal = document.getElementById('logModal');
            const content = document.getElementById('logContent');

            // 1. Pindahkan modal langsung ke <body> (keluar dari kontainer layout)
            // Ini menghilangkan masalah z-index terjebak di dalam div parent
            document.body.appendChild(modal);

            // 2. Tampilkan modal
            modal.classList.remove('hidden');
            modal.classList.add('flex');

            // 3. Kunci scroll background
            document.body.style.overflow = 'hidden';

            // Reset konten
            content.innerHTML = '<div class="text-center text-gray-400 py-8">Memuat data...</div>';

            // Fetch data log (kode fetch sama seperti sebelumnya)
            fetch(`/torpr/${id}/logs`)
                .then(r => r.json())
                .then(data => {
                    if (data.length === 0) {
                        content.innerHTML = '<div class="text-center text-gray-400 py-8">Tidak ada riwayat aktivitas.</div>';
                        return;
                    }

                    const columnLabels = {
                        'tujuan_pengadaan': 'Tujuan Pengadaan', 'portofolio': 'Portofolio', 'nomor_pr': 'Nomor PR',
                        'tanggal_pr': 'Tanggal PR', 'jumlah_pr': 'Jumlah PR',
                        'tgl_ttd_kabid_pr': 'Tgl TTD Kabid', 'tgl_ttd_kacab_pr': 'Tgl TTD Kacab',
                    };

                    let html = '<div class="relative">';
                    html += '<div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>';

                    data.forEach(log => {
                        // ... (Logika ikon & warna sama persis seperti kode sebelumnya) ...
                        let icon = '📝'; let color = 'bg-gray-400';
                        if (log.action.includes('created')) { icon = '➕'; color = 'bg-green-500'; }
                        if (log.action.includes('updated')) { icon = '✏️'; color = 'bg-blue-500'; }
                        if (log.action.includes('approved')) { icon = '✅'; color = 'bg-green-600'; }
                        if (log.action.includes('rejected')) { icon = '❌'; color = 'bg-red-500'; }
                        if (log.action.includes('requested')) { icon = '📨'; color = 'bg-yellow-500'; }
                        if (log.action.includes('signed')) { icon = '✍️'; color = 'bg-purple-500'; }

                        let changesHtml = '';
                        if (log.changes) {
                            changesHtml = '<div class="mt-2 space-y-1">';
                            for (const [key, val] of Object.entries(log.changes)) {
                                let colName = escapeHtml(columnLabels[key] || key);
                                let oldVal = val.old ?? '(kosong)';
                                let newVal = val.new ?? '(kosong)';

                                if (key === 'jumlah_pr') {
                                    if (val.old) oldVal = 'Rp ' + parseFloat(val.old).toLocaleString('id-ID');
                                    if (val.new) newVal = 'Rp ' + parseFloat(val.new).toLocaleString('id-ID');
                                }

                                oldVal = escapeHtml(oldVal);
                                newVal = escapeHtml(newVal);

                                changesHtml += `
                                            <div class="text-xs bg-gray-50 dark:bg-gray-900 p-2 rounded border dark:border-gray-700">
                                                <span class="font-semibold text-gray-700 dark:text-gray-300">${colName}</span>
                                                <div class="flex flex-col sm:flex-row sm:items-center gap-1 mt-1">


                                                    <span class="text-red-500 bg-red-50 dark:bg-red-900/20 px-1 rounded text-[11px]" 
                                                          style="text-decoration: line-through; text-decoration-color: #ef4444; text-decoration-thickness: 2px;">
                                                        ${oldVal}
                                                    </span>


                                                    <span class="hidden sm:block text-gray-400">→</span>


                                                    <span class="text-green-600 font-bold bg-green-50 dark:bg-green-900/20 px-1 rounded text-[11px]">
                                                        ${newVal}
                                                    </span>
                                                </div>
                                            </div>
                                        `;
                            }
                            changesHtml += '</div>';
                        }

                        html += `
                                                                    <div class="relative pl-10 pb-6">
                                                                        <div class="absolute left-2 w-5 h-5 rounded-full ${color} flex items-center justify-center text-xs text-white border-2 border-white dark:border-gray-800">${icon}</div>
                                                                        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
                                                                            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-1">
                                                                                <span class="font-semibold text-sm text-gray-900 dark:text-white">${escapeHtml(log.user?.name || 'System')}</span>
                                                                                <span class="text-[11px] text-gray-400 whitespace-nowrap">${new Date(log.created_at).toLocaleString('id-ID')}</span>
                                                                            </div>
                                                                            <p class="text-sm text-gray-700 dark:text-gray-300">${escapeHtml(log.description || '')}</p>
                                                                            ${changesHtml}
                                                                        </div>
                                                                    </div>`;
                    });

                    html += '</div>';
                    content.innerHTML = html;
                });
        }

        window.closeLogModal = function () {
            const modal = document.getElementById('logModal');

            // Sembunyikan
            modal.classList.add('hidden');
            modal.classList.remove('flex');

            // Buka kunci scroll
            document.body.style.overflow = '';
        }


        // ==========================================
        // MODAL INFO PR - DETAIL BARIS DENGAN ANIMASI
        // ==========================================
        function formatInfoRupiah(value) {
            if (value === null || value === undefined || value === '') return '—';

            const number = Number(String(value).replace(/[^0-9.-]/g, ''));
            if (!Number.isFinite(number)) return value || '—';

            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(number);
        }

        function formatInfoDate(value) {
            if (!value) return '—';

            const normalized = String(value).replace(' ', 'T');
            const date = new Date(normalized);

            if (Number.isNaN(date.getTime())) return value;

            return date.toLocaleString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        function setInfoText(id, value) {
            const el = document.getElementById(id);
            if (el) el.textContent = value || '—';
        }

        function setReceiptInfo(status, subText) {
            const badge = document.getElementById('infoReceiptBadge');
            if (!badge) return;

            const cleanStatus = (status || '—').trim();
            const statusClass = {
                'APPROVED': 'bg-green-600 text-white',
                'REJECTED': 'bg-red-600 text-white',
                'PENDING': 'bg-yellow-500 text-white',
                '—': 'bg-gray-400 text-white'
            }[cleanStatus] || 'bg-gray-400 text-white';

            badge.className = `inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold ${statusClass}`;
            badge.textContent = cleanStatus;
            setInfoText('infoReceiptSub', subText || '—');
        }

        function setSignInfo(prefix, signed, name, date) {
            const badge = document.getElementById(`info${prefix}Badge`);
            const meta = document.getElementById(`info${prefix}Meta`);
            if (!badge || !meta) return;

            if (signed) {
                badge.className = 'inline-flex w-fit items-center rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-300';
                badge.textContent = '✓ Sudah TTD';
                meta.textContent = `${name || 'Signed'}${date ? ' • ' + date : ''}`;
            } else {
                badge.className = 'inline-flex w-fit items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300';
                badge.textContent = 'Belum TTD';
                meta.textContent = 'Belum ada tanda tangan';
            }
        }

        function renderInfoTimeline(events = []) {
            const wrapper = document.getElementById('infoTimeline');
            const counter = document.getElementById('infoTimelineCount');
            if (!wrapper) return;

            if (!events.length) {
                wrapper.innerHTML = `
                    <div class="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                        Timeline akan muncul setelah data dimuat.
                    </div>
                `;
                if (counter) counter.textContent = '0 tahap';
                return;
            }

            const doneCount = events.filter((event) => event.done).length;
            if (counter) counter.textContent = `${doneCount}/${events.length} tahap`;

            wrapper.innerHTML = events.map((event) => {
                const tone = event.done
                    ? (event.type === 'danger'
                        ? 'bg-red-500 text-white ring-red-100 dark:ring-red-900/40'
                        : event.type === 'warning'
                            ? 'bg-amber-500 text-white ring-amber-100 dark:ring-amber-900/40'
                            : 'bg-emerald-500 text-white ring-emerald-100 dark:ring-emerald-900/40')
                    : 'bg-white text-slate-400 ring-slate-200 dark:bg-slate-900 dark:text-slate-500 dark:ring-slate-700';

                const titleColor = event.done
                    ? 'text-slate-950 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400';

                return `
                    <div class="torpr-info-step relative flex gap-3">
                        <div class="torpr-info-dot ${tone}">${event.icon || (event.done ? '✓' : '•')}</div>
                        <div class="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                            <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <p class="text-sm font-black ${titleColor}">${escapeHtml(event.title || '-')}</p>
                                <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400">${escapeHtml(event.time || 'Belum ada waktu')}</span>
                            </div>
                            <p class="mt-1 text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-300">${escapeHtml(event.description || '-')}</p>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function buildInfoTimeline(data, receiptStatus, receiptSub) {
            const approval = data?.latest_approval || {};
            const approvalStatus = String(approval.status || receiptStatus || '').toUpperCase();
            const isRejected = approvalStatus.includes('REJECTED');
            const isApproved = approvalStatus.includes('APPROVED') || !!data?.received_at;
            const isPending = approvalStatus.includes('PENDING');

            const kabidName = data?.signed_by_kabid_name || 'Kabid';
            const kacabName = data?.signed_by_kacab_name || 'Kacab';

            return [
                {
                    done: !!(data?.created_at || data?.tanggal_pr),
                    icon: '1',
                    title: 'PR dibuat / dicatat',
                    time: formatInfoDate(data?.created_at || data?.tanggal_pr),
                    description: data?.nomor_pr ? `Nomor PR: ${data.nomor_pr}` : 'Nomor PR belum tersedia.',
                },
                {
                    done: !!data?.tgl_ttd_kabid_pr,
                    icon: '2',
                    title: 'Tanda tangan Kepala Bidang',
                    time: formatInfoDate(data?.tgl_ttd_kabid_pr),
                    description: data?.tgl_ttd_kabid_pr
                        ? `Ditandatangani oleh ${kabidName}.`
                        : 'Masih menunggu tanda tangan Kepala Bidang.',
                },
                {
                    done: !!data?.tgl_ttd_kacab_pr,
                    icon: '3',
                    title: 'Tanda tangan Kepala Cabang',
                    time: formatInfoDate(data?.tgl_ttd_kacab_pr),
                    description: data?.tgl_ttd_kacab_pr
                        ? `Ditandatangani oleh ${kacabName}.`
                        : 'Masih menunggu tanda tangan Kepala Cabang.',
                },
                {
                    done: !!approval.requested_at,
                    icon: '4',
                    title: 'Request penerimaan ke Umum',
                    time: formatInfoDate(approval.requested_at),
                    description: approval.requested_name
                        ? `Diajukan oleh ${approval.requested_name}.`
                        : 'Belum ada request penerimaan ke Umum.',
                    type: isPending ? 'warning' : undefined,
                },
                {
                    done: isApproved || isRejected,
                    icon: isRejected ? '!' : '5',
                    title: isRejected ? 'Request ditolak Umum' : 'PR diterima Umum',
                    time: formatInfoDate(data?.received_at || approval.approved_at || approval.rejected_at),
                    description: isRejected
                        ? `Alasan: ${approval.rejected_reason || 'Tidak ada alasan yang dicatat.'}`
                        : (isApproved
                            ? `Status: ${receiptSub || 'PR sudah dikonfirmasi diterima Umum.'}`
                            : 'Menunggu review dan konfirmasi dari Umum.'),
                    type: isRejected ? 'danger' : (isPending ? 'warning' : undefined),
                },
            ];
        }

        window.openInfoPrModal = async function (id) {
            const modal = document.getElementById('infoPrModal');
            const card = document.getElementById('infoPrCard');
            const loading = document.getElementById('infoPrLoading');
            const content = document.getElementById('infoPrContent');
            const row = document.querySelector(`tr[data-row-id="${id}"]`);

            if (!modal) return;

            document.body.appendChild(modal);
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            card?.classList.remove('info-modal-out');
            document.body.style.overflow = 'hidden';

            loading?.classList.remove('hidden');
            content?.classList.add('opacity-40', 'pointer-events-none');

            setInfoText('infoPrTitle', 'Memuat...');
            setInfoText('infoPrSubtitle', 'Mengambil data dari baris yang dipilih');
            setInfoText('infoNoPr', '—');
            setInfoText('infoPortofolio', '—');
            setInfoText('infoTanggal', '—');
            setInfoText('infoJumlah', '—');
            setInfoText('infoTujuan', '—');
            setReceiptInfo('—', '—');
            setSignInfo('Kabid', false, '', '');
            setSignInfo('Kacab', false, '', '');
            renderInfoTimeline([]);

            const receiptStatus = row?.querySelector('[data-receipt-badge]')?.textContent?.trim() || '—';
            const receiptSub = row?.querySelector('[data-receipt-sub]')?.textContent?.trim() || '—';
            const signedKabid = row?.dataset?.signedKabid === '1';
            const signedKacab = row?.dataset?.signedKacab === '1';

            try {
                const response = await fetch(`/torpr/${id}/json`, {
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                if (!response.ok) {
                    let message = 'Gagal mengambil informasi PR.';
                    if (response.status === 403) message = 'Akses ditolak untuk membuka informasi PR ini.';
                    if (response.status === 404) message = 'Data PR tidak ditemukan atau sudah berubah.';
                    if (response.status >= 500) message = 'Server gagal mengambil informasi PR. Silakan refresh halaman.';
                    throw new Error(`${message} (HTTP ${response.status})`);
                }

                const data = await response.json();

                setInfoText('infoPrTitle', data.nomor_pr || 'Nomor PR belum diisi');
                setInfoText('infoPrSubtitle', 'Informasi lengkap dari PR yang dipilih');
                setInfoText('infoNoPr', data.nomor_pr || '—');
                setInfoText('infoPortofolio', data.portofolio || '—');
                setInfoText('infoTanggal', formatInfoDate(data.tanggal_pr));
                setInfoText('infoJumlah', formatInfoRupiah(data.jumlah_pr));
                setInfoText('infoTujuan', data.tujuan_pengadaan || '—');

                setReceiptInfo(receiptStatus, receiptSub);
                setSignInfo('Kabid', signedKabid || !!data.tgl_ttd_kabid_pr, row?.dataset?.nameKabid || '', row?.dataset?.dateKabid || formatInfoDate(data.tgl_ttd_kabid_pr));
                setSignInfo('Kacab', signedKacab || !!data.tgl_ttd_kacab_pr, row?.dataset?.nameKacab || '', row?.dataset?.dateKacab || formatInfoDate(data.tgl_ttd_kacab_pr));
                renderInfoTimeline(buildInfoTimeline(data, receiptStatus, receiptSub));
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Membuka Info',
                    text: error.message || 'Terjadi kesalahan saat mengambil informasi PR.',
                    confirmButtonColor: '#EF4444'
                });
                closeInfoPrModal();
            } finally {
                loading?.classList.add('hidden');
                content?.classList.remove('opacity-40', 'pointer-events-none');
            }
        };

        window.closeInfoPrModal = function () {
            const modal = document.getElementById('infoPrModal');
            const card = document.getElementById('infoPrCard');
            if (!modal) return;

            card?.classList.add('info-modal-out');

            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                card?.classList.remove('info-modal-out');
                document.body.style.overflow = '';
            }, 140);
        };

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                const modal = document.getElementById('infoPrModal');
                if (modal && !modal.classList.contains('hidden')) {
                    closeInfoPrModal();
                }
            }
        });

        // Event listener ESC keyboard
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                // Cari modal yang sedang terbuka
                const logModal = document.getElementById('logModal');
                if (logModal && !logModal.classList.contains('hidden')) {
                    closeLogModal();
                }
            }
        });

        // ==========================================
        // FUNGSI FORMAT RUPIAH UNTUK INPUT
        // ==========================================

        // 1. Format saat mengetik (Live Formatting)
        window.formatInputCurrency = function (input) {
            // Ambil hanya angka dan titik
            let value = input.value.replace(/[^0-9.]/g, '');

            // Cek jika ada titik desimal
            let parts = value.split('.');

            // Format bagian integer (sebelum titik) dengan koma pemisah ribuan
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            // Gabungkan kembali
            input.value = parts.length > 1 ? parts[0] + '.' + parts[1] : parts[0];
        };

        // 2. Format saat keluar dari input (Blur) - Paksa 2 desimal
        window.blurInputCurrency = function (input) {
            if (input.value === '') return;

            // Hapus koma untuk hitung
            let raw = input.value.replace(/,/g, '');
            let num = parseFloat(raw);

            if (!isNaN(num)) {
                // Format final: 2 digit desimal paksa (111,111.00)
                input.value = num.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
        };

        // 3. Helper untuk Format Tampilan (Bisa dipakai di tempat lain)
        window.formatRupiahGlobal = function (angka) {
            let number = parseFloat(angka);
            if (isNaN(number)) return "";
            return number.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        };

        async function showAutoRequestPrompt(prId) {
            // Fetch PR data
            let prNo = 'Nomor PR belum diisi';

            const result = await Swal.fire({
                title: '📨 Request PR ke Umum',
                html: `
                                                                                                                                                    <div class="text-left space-y-3">
                                                                                                                                                        <div class="bg-green-50 border border-green-200 rounded-lg p-3">
                                                                                                                                                            <p class="text-sm text-green-800">
                                                                                                                                                                <strong>✓ Anda sudah login sebagai Operasional</strong>
                                                                                                                                                            </p>
                                                                                                                                                        </div>

                                                                                                                                                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                                                                                                                            <p class="text-sm font-semibold text-blue-900 mb-2">
                                                                                                                                                                Kirim PR ke Umum untuk approval?
                                                                                                                                                            </p>
                                                                                                                                                            <p class="text-xs text-blue-700">
                                                                                                                                                                PR akan dikirim ke department Umum untuk di-review.
                                                                                                                                                            </p>
                                                                                                                                                        </div>

                                                                                                                                                        <div class="mt-3">
                                                                                                                                                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                                                                                                                                                Nama Pengaju:
                                                                                                                                                            </label>
                                                                                                                                                            <input 
                                                                                                                                                                type="text" 
                                                                                                                                                                id="requesterName" 
                                                                                                                                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                                                                                                                                placeholder="Nama Anda"
                                                                                                                                                                required>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                `,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3B82F6',
                cancelButtonColor: '#6B7280',
                confirmButtonText: '📤 Kirim Sekarang',
                cancelButtonText: 'Batal',
                reverseButtons: true,
                preConfirm: () => {
                    const name = document.getElementById('requesterName').value.trim();
                    if (!name || name.length < 2) {
                        Swal.showValidationMessage('Nama wajib diisi (min 2 karakter)');
                        return false;
                    }
                    return name;
                }
            });

            if (result.isConfirmed) {
                const requesterName = result.value;

                // Show loading
                Swal.fire({
                    title: 'Mengirim ke Umum...',
                    html: '<div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>',
                    showConfirmButton: false,
                    allowOutsideClick: false
                });

                try {
                    const response = await fetch(`/torpr/${prId}/request-receipt`, {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            requested_name: requesterName + ' (via QR)'
                        })
                    });

                    const data = await response.json();

                    if (!data.ok) {
                        throw new Error(data.message || 'Gagal mengirim request');
                    }

                    await Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Dikirim!',
                        html: `
                                                                                                                                                            <div class="space-y-2">
                                                                                                                                                                <p class="text-green-700">✅ PR dikirim ke Umum</p>
                                                                                                                                                                <p class="text-xs text-gray-600 mt-3">Menunggu approval dari department Umum</p>
                                                                                                                                                            </div>
                                                                                                                                                        `,
                        confirmButtonColor: '#10B981'
                    });

                    // Reload to show updated status
                    location.reload();

                } catch (error) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Gagal Kirim Request',
                        text: error.message,
                        confirmButtonColor: '#EF4444'
                    });
                }
            }
        }

        let currentQRData = {};

        const showQRWarning = (message) => {
            if (window.Swal) {
                Swal.fire({
                    icon: 'warning',
                    title: 'QR belum bisa dibuka',
                    text: message,
                    confirmButtonColor: '#2563EB'
                });
                return;
            }

            alert(message);
        };

        window.showQRModal = function (prId, type, token, nomorPr) {
            const safeType = ['kabid', 'kacab'].includes(type) ? type : '';
            const safeToken = String(token || '').trim();

            if (!safeType) {
                showQRWarning('Jenis tanda tangan tidak valid.');
                return;
            }

            if (!safeToken) {
                showQRWarning('Token QR belum tersedia. Silakan generate ulang token tanda tangan.');
                return;
            }

            currentQRData = { prId, type: safeType, token: safeToken, nomorPr };

            const modal = document.getElementById('qrModal');
            const title = document.getElementById('qrModalTitle');
            const subtitle = document.getElementById('qrModalSubtitle');
            const qrContainer = document.getElementById('qrCodeImage');

            if (!modal || !title || !subtitle || !qrContainer) {
                console.error('Elemen modal QR tidak ditemukan.');
                showQRWarning('Komponen modal QR tidak ditemukan. Silakan refresh halaman.');
                return;
            }

            const typeLabel = safeType === 'kabid' ? 'Kepala Bidang' : 'Kepala Cabang';
            title.textContent = `QR Code TTD ${typeLabel}`;
            subtitle.textContent = `PR: ${nomorPr || '-'}`;

            const qrApiBaseUrl = window.TORPR_PAGE_CONFIG.qrApiBaseUrl;
            const qrApiUrl = `${qrApiBaseUrl}/${encodeURIComponent(safeToken)}/${safeType}`;

            qrContainer.innerHTML = `
                <img
                    src="${qrApiUrl}"
                    alt="QR Code ${typeLabel}"
                    class="w-48 h-48"
                    onerror="this.outerHTML='<div class=&quot;w-48 h-48 flex items-center justify-center rounded-xl border border-red-200 bg-red-50 p-4 text-center text-xs font-semibold text-red-700&quot;>QR gagal dimuat. Token mungkin kedaluwarsa.</div>'"
                >
            `;

            modal.classList.remove('hidden');
            modal.classList.add('flex');
        };

        document.addEventListener('click', function (event) {
            const button = event.target.closest('[data-qr-trigger]');
            if (!button) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            window.showQRModal(
                button.dataset.prId,
                button.dataset.qrType,
                button.dataset.qrToken,
                button.dataset.nomorPr
            );
        });

        window.closeQRModal = function () {
            const modal = document.getElementById('qrModal');
            if (!modal) return;
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        };

        window.printQR = function () {
            const { prId, nomorPr } = currentQRData;
            const row = document.querySelector(`[data-row-id="${prId}"]`);

            if (!row) {
                alert('Data tidak ditemukan');
                return;
            }

            // ✅ HELPER: Generate konten berdasarkan status TTD
            const generateContent = (type) => {
                const label = type === 'kabid' ? 'Kepala Bidang' : 'Kepala Cabang';
                const isSigned = row.dataset['signed' + type.charAt(0).toUpperCase() + type.slice(1)] === '1';
                const signerName = row.dataset['name' + type.charAt(0).toUpperCase() + type.slice(1)];
                const signerDate = row.dataset['date' + type.charAt(0).toUpperCase() + type.slice(1)];
                const safeSignerName = escapeHtml(signerName || label);
                const safeSignerDate = escapeHtml(signerDate || '');

                if (isSigned) {
                    // ✅ JIKA SUDAH TTD: Tampilkan pesan sukses
                    return `
                                                                                                                                    <div style="
                                                                                                                                        width: 200px; 
                                                                                                                                        height: 200px; 
                                                                                                                                        border: 2px solid #10B981; 
                                                                                                                                        background: #ECFDF5; 
                                                                                                                                        border-radius: 12px;
                                                                                                                                        display: flex; 
                                                                                                                                        flex-direction: column; 
                                                                                                                                        justify-content: center; 
                                                                                                                                        align-items: center; 
                                                                                                                                        text-align: center;
                                                                                                                                        padding: 15px;
                                                                                                                                        margin: 10px auto;
                                                                                                                                    ">
                                                                                                                                        <div style="font-size: 40px; color: #10B981; margin-bottom: 10px;">✓</div>
                                                                                                                                        <div style="font-weight: bold; color: #047857; font-size: 14px;">SUDAH TTD</div>
                                                                                                                                        <div style="font-size: 12px; color: #065F46; margin-top: 5px; font-weight: 600;">
                                                                                                                                            ${safeSignerName}
                                                                                                                                        </div>
                                                                                                                                        <div style="font-size: 10px; color: #6B7280; margin-top: 3px;">
                                                                                                                                            ${safeSignerDate}
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                `;
                } else {
                    // ✅ JIKA BELUM TTD: Tampilkan QR Code
                    const qrUrl = generateQRUrl(prId, type);
                    if (!qrUrl) return '<p style="color:red; font-size:10px;">Error: Token tidak ditemukan</p>';

                    return `
                                                                                                                                    <img src="${qrUrl}" alt="QR ${label}" style="width: 200px; height: 200px; margin: 10px 0;">
                                                                                                                                    <div style="
                                                                                                                                        background: #f3f4f6; 
                                                                                                                                        padding: 8px; 
                                                                                                                                        margin-top: 5px; 
                                                                                                                                        border-radius: 6px;
                                                                                                                                        font-size: 11px;
                                                                                                                                        color: #374151;
                                                                                                                                        font-weight: 600;
                                                                                                                                    ">
                                                                                                                                        SCAN UNTUK TTD
                                                                                                                                    </div>
                                                                                                                                `;
                }
            };

            // Generate konten untuk masing-masing role
            const contentKabid = generateContent('kabid');
            const contentKacab = generateContent('kacab');

            // Buka window print
            const printWindow = window.open('', '_blank');
            const safeNomorPr = escapeHtml(nomorPr || '');
            printWindow.document.write(`
                                                                                                                            <!DOCTYPE html>
                                                                                                                            <html>
                                                                                                                            <head>
                                                                                                                                <title>QR Purchase Request - ${safeNomorPr}</title>
                                                                                                                                <style>
                                                                                                                                    * { margin: 0; padding: 0; box-sizing: border-box; }
                                                                                                                                    body {
                                                                                                                                        font-family: Arial, sans-serif;
                                                                                                                                        padding: 20px;
                                                                                                                                        background: white;
                                                                                                                                    }
                                                                                                                                    .container { max-width: 800px; margin: 0 auto; }
                                                                                                                                    .header {
                                                                                                                                        text-align: center;
                                                                                                                                        margin-bottom: 25px;
                                                                                                                                        padding-bottom: 15px;
                                                                                                                                        border-bottom: 2px solid #000;
                                                                                                                                    }
                                                                                                                                    h1 { font-size: 22px; margin-bottom: 5px; }
                                                                                                                                    h2 { font-size: 16px; color: #555; font-weight: normal; }
                                                                                                                                    .qr-grid {
                                                                                                                                        display: grid;
                                                                                                                                        grid-template-columns: 1fr 1fr;
                                                                                                                                        gap: 30px;
                                                                                                                                        margin: 20px 0;
                                                                                                                                    }
                                                                                                                                    .qr-box {
                                                                                                                                        border: 1px solid #E5E7EB;
                                                                                                                                        padding: 20px;
                                                                                                                                        text-align: center;
                                                                                                                                        background: #FAFAFA;
                                                                                                                                        border-radius: 10px;
                                                                                                                                    }
                                                                                                                                    .qr-box h3 {
                                                                                                                                        margin-bottom: 15px;
                                                                                                                                        font-size: 14px;
                                                                                                                                        color: #111;
                                                                                                                                    }
                                                                                                                                    .instructions {
                                                                                                                                        background: #F9FAFB;
                                                                                                                                        border: 1px solid #E5E7EB;
                                                                                                                                        padding: 15px;
                                                                                                                                        margin-top: 20px;
                                                                                                                                        font-size: 11px;
                                                                                                                                        border-radius: 8px;
                                                                                                                                    }
                                                                                                                                    .instructions strong { display: block; margin-bottom: 8px; }
                                                                                                                                    .instructions ol { margin-left: 20px; }
                                                                                                                                    .instructions li { margin: 4px 0; color: #4B5563; }
                                                                                                                                    @media print {
                                                                                                                                        body { padding: 0; }
                                                                                                                                        .no-print { display: none; }
                                                                                                                                    }
                                                                                                                                </style>
                                                                                                                            </head>
                                                                                                                            <body>
                                                                                                                                <div class="container">
                                                                                                                                    <div class="header">
                                                                                                                                        <h1>QR PURCHASE REQUEST</h1>
                                                                                                                                        <h2>Nomor: ${safeNomorPr}</h2>
                                                                                                                                    </div>

                                                                                                                                    <div class="qr-grid">
                                                                                                                                        <!-- Kolom Kabid -->
                                                                                                                                        <div class="qr-box">
                                                                                                                                            <h3>📝 KEPALA BIDANG</h3>
                                                                                                                                            ${contentKabid}
                                                                                                                                        </div>

                                                                                                                                        <!-- Kolom Kacab -->
                                                                                                                                        <div class="qr-box">
                                                                                                                                            <h3>👔 KEPALA CABANG</h3>
                                                                                                                                            ${contentKacab}
                                                                                                                                        </div>
                                                                                                                                    </div>

                                                                                                                                    <div class="instructions">
                                                                                                                                        <strong>📱 Petunjuk:</strong>
                                                                                                                                        <ol>
                                                                                                                                            <li>Scan QR Code yang tersedia menggunakan kamera HP.</li>
                                                                                                                                            <li>Jika sudah ada tanda "SUDAH TTD", berarti pihak tersebut sudah menyetujui.</li>
                                                                                                                                            <li>Pastikan semua pihak sudah TTD sebelum melanjutkan proses.</li>
                                                                                                                                        </ol>
                                                                                                                                        <p style="margin-top: 15px; color: #9CA3AF; text-align: right;">
                                                                                                                                            Dicetak: ${new Date().toLocaleString('id-ID')}
                                                                                                                                        </p>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </body>
                                                                                                                            </html>
                                                                                                                        `);

            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => printWindow.print(), 250);
        };

        function generateQRUrl(prId, type) {
            const row = document.querySelector(`[data-row-id="${prId}"]`);
            if (!row) return '';

            // Ambil token dari dataset (data-token-kabid -> dataset.tokenKabid)
            const token = row.dataset['token' + type.charAt(0).toUpperCase() + type.slice(1)];
            if (!token) return '';

            return `${window.location.origin}/pr/sign-qr/${encodeURIComponent(token)}/${type}`;
        }

        // Close on ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeQRModal();
            }
        });

        function toggleDateInputs(value) {
            const dateFromContainer = document.getElementById('dateFromContainer');
            const dateToContainer = document.getElementById('dateToContainer');

            if (value === 'custom') {
                dateFromContainer.classList.remove('hidden');
                dateToContainer.classList.remove('hidden');
            } else {
                dateFromContainer.classList.add('hidden');
                dateToContainer.classList.add('hidden');
                // Clear custom date values
                document.getElementById('dateFrom').value = '';
                document.getElementById('dateTo').value = '';
            }
        }

        document.addEventListener('DOMContentLoaded', function () {
            const dateFilter = document.getElementById('dateFilterType').value;
            toggleDateInputs(dateFilter);
        });

        function changePerPage(value) {
            const url = new URL(window.location.href);
            url.searchParams.set('per_page', value);
            url.searchParams.set('page', '1'); // Reset ke halaman 1
            window.location.href = url.toString();
        }

        window.openResubmitModal = function (torprId, rejectionReason) {
            document.getElementById('resubmitTorprId').value = torprId;
            document.getElementById('resubmitRejectionReason').textContent = rejectionReason || 'Tidak ada alasan yang diberikan';
            document.getElementById('resubmitForm').reset();
            document.getElementById('resubmitTorprId').value = torprId; // Set again after reset

            const modal = document.getElementById('resubmitModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        };

        window.closeResubmitModal = function () {
            const modal = document.getElementById('resubmitModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        };

        window.handleResubmit = async function (event) {
            event.preventDefault();

            const torprId = document.getElementById('resubmitTorprId').value;
            const name = document.getElementById('resubmitName').value.trim();
            const notes = document.getElementById('resubmitNotes').value.trim();

            // ✅ VALIDATION
            if (!name || name.length < 2) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Nama Wajib Diisi',
                    text: 'Silakan masukkan nama pengaju minimal 2 karakter',
                    confirmButtonColor: '#10B981'
                });
                return;
            }

            if (!notes || notes.length < 10) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Catatan Perbaikan Wajib',
                    text: 'Jelaskan perbaikan yang sudah dilakukan minimal 10 karakter',
                    confirmButtonColor: '#10B981'
                });
                return;
            }

            // ✅ CONFIRMATION DOUBLE CHECK
            const confirm1 = await Swal.fire({
                title: '⚠️ Konfirmasi Perbaikan',
                html: `
                                                                                                                                                                                            <div class="text-left space-y-3">
                                                                                                                                                                                                <p class="text-gray-700 dark:text-gray-300">Apakah Anda sudah <strong>memperbaiki semua</strong> sesuai alasan penolakan dari Umum?</p>
                                                                                                                                                                                                <div class="bg-red-50 dark:bg-red-900/20 p-3 rounded border-l-4 border-red-500">
                                                                                                                                                                                                    <p class="text-sm text-red-800 dark:text-red-300 font-semibold">Alasan Penolakan:</p>
                                                                                                                                                                                                    <p class="text-sm text-red-700 dark:text-red-400 mt-1">${document.getElementById('resubmitRejectionReason').textContent}</p>
                                                                                                                                                                                                </div>
                                                                                                                                                                                                <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded border-l-4 border-green-500">
                                                                                                                                                                                                    <p class="text-sm text-green-800 dark:text-green-300 font-semibold">Catatan Perbaikan Anda:</p>
                                                                                                                                                                                                    <p class="text-sm text-green-700 dark:text-green-400 mt-1">${notes}</p>
                                                                                                                                                                                                </div>
                                                                                                                                                                                            </div>
                                                                                                                                                                                        `,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: '✓ Ya, Sudah Diperbaiki',
                cancelButtonText: '✗ Belum, Batalkan',
                customClass: {
                    popup: 'text-left'
                }
            });

            if (!confirm1.isConfirmed) return;

            // ✅ SECOND CONFIRMATION
            const confirm2 = await Swal.fire({
                title: '📨 Kirim Pengajuan Ulang?',
                html: `
                                                                                                                                                                                            <p class="text-gray-700 dark:text-gray-300 mb-3">PR akan dikirim ke Umum untuk direview lagi.</p>
                                                                                                                                                                                            <p class="text-sm text-gray-600 dark:text-gray-400">Pastikan data sudah benar sebelum melanjutkan.</p>
                                                                                                                                                                                        `,
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: '📤 Ya, Kirim Sekarang',
                cancelButtonText: 'Batal'
            });

            if (!confirm2.isConfirmed) return;

            // ✅ SHOW LOADING
            const btnText = document.getElementById('btnResubmitText');
            const btnSpinner = document.getElementById('btnResubmitSpinner');
            btnText.textContent = 'Mengirim...';
            btnSpinner.classList.remove('hidden');

            try {
                const response = await fetch(`/torpr/${torprId}/resubmit`, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        requested_name: name,
                        resubmit_notes: notes
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Gagal mengajukan ulang PR');
                }

                await Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Diajukan Ulang!',
                    html: `
                                                                                                                                                                                                <p class="text-gray-700 dark:text-gray-300">PR telah dikirim ke Umum untuk direview lagi.</p>
                                                                                                                                                                                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Tunggu approval dari Umum.</p>                                                                                                                                          `,
                    confirmButtonColor: '#10B981'
                });

                closeResubmitModal();
                location.reload();

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: error.message || 'Terjadi kesalahan saat mengajukan ulang PR',
                    confirmButtonColor: '#EF4444'
                });
            } finally {
                btnText.textContent = 'Ajukan Ulang';
                btnSpinner.classList.add('hidden');
            }
        };

        // Close modal on ESC
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeResubmitModal();
            }
        });

        // ==========================================
        // EXPORT CONFIRMATION
        // ==========================================
        window.confirmExport = function () {
            Swal.fire({
                title: 'Export Data TORPR?',
                text: 'Anda akan mengexport semua data TORPR yang sesuai dengan filter aktif.',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Ya, Export',
                cancelButtonText: 'Batal',
                allowOutsideClick: true,
                allowEscapeKey: true
            }).then((result) => {
                if (result.isConfirmed) {
                    const params = new URLSearchParams(window.location.search);
                    window.location.href = `/torpr/export/full?${params.toString()}`;

                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Export dimulai!',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            });
        };

        // ==========================================
        // IMPORT FUNCTIONALITY
        // ==========================================
        let previewData = [];

        window.openImportModal = function () {
            const modal = document.getElementById('importModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            resetImport();
        };

        window.closeImportModal = function () {
            const modal = document.getElementById('importModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            resetImport();
        };

        window.resetImport = function () {
            document.getElementById('uploadStep').classList.remove('hidden');
            document.getElementById('previewStep').classList.add('hidden');
            document.getElementById('loadingStep').classList.add('hidden');
            document.getElementById('importFile').value = '';
            previewData = [];
        };

        window.handleFileSelect = async function (event) {
            const file = event.target.files[0];

            if (!file) {
                console.error('No file selected');
                return;
            }

            // Validasi ukuran file
            if (file.size > 10 * 1024 * 1024) {
                Swal.fire({
                    icon: 'error',
                    title: 'File Terlalu Besar',
                    text: 'Ukuran file maksimal 10MB',
                    confirmButtonColor: '#EF4444'
                });
                return;
            }

            // Validasi ekstensi
            const ext = file.name.split('.').pop().toLowerCase();
            if (!['xlsx', 'xls', 'csv'].includes(ext)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Format File Salah',
                    text: 'Format file harus Excel (.xlsx, .xls) atau CSV',
                    confirmButtonColor: '#EF4444'
                });
                return;
            }

            // Show loading
            document.getElementById('uploadStep').classList.add('hidden');
            document.getElementById('loadingStep').classList.remove('hidden');

            // Upload & preview
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(window.TORPR_PAGE_CONFIG.importPreviewUrl, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': window.TORPR_PAGE_CONFIG.csrfToken,
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: formData
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Gagal memproses file');
                }

                if (!result.success) {
                    throw new Error(result.message);
                }

                // Store data
                previewData = result.data;

                // Show preview
                showPreview(result);

            } catch (error) {
                console.error('Error during import:', error);
                document.getElementById('loadingStep').classList.add('hidden');
                document.getElementById('uploadStep').classList.remove('hidden');

                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Import',
                    text: error.message,
                    confirmButtonColor: '#EF4444'
                });
            }
        };

        // ===== REPLACE showPreview function di JavaScript =====

        function showPreview(result) {
            document.getElementById('loadingStep').classList.add('hidden');
            document.getElementById('previewStep').classList.remove('hidden');

            // Update Summary
            document.getElementById('totalRows').textContent = result.summary.total;
            document.getElementById('validRows').textContent = result.summary.valid;
            document.getElementById('errorRows').textContent = result.summary.error;

            // Show/Hide Alert
            const errorAlert = document.getElementById('errorAlert');
            const errorCount = document.getElementById('errorCount');

            if (result.summary.error > 0) {
                errorAlert.classList.remove('hidden');
                errorCount.textContent = result.summary.error;
            } else {
                errorAlert.classList.add('hidden');
            }

            // Pisahkan Error dan Valid
            const errorRows = result.data.filter(d => d.status === 'error');
            const validRows = result.data.filter(d => d.status === 'valid');
            const displayData = [...errorRows, ...validRows];

            // Render Table
            const tbody = document.getElementById('previewTableBody');
            tbody.innerHTML = '';

            const formatRupiah = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID');
            const escapeHtml = (str) => String(str ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));

            // ✅ FIX: Tampilkan success message HANYA jika semua valid
            if (errorRows.length === 0) {
                const successMsg = document.createElement('tr');
                successMsg.innerHTML = `
                                                                                                                                                                                                                                            <td colspan="7" class="px-4 py-6 text-center bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300 font-semibold animate-fade-in">
                                                                                                                                                                                                                                                ✅ Semua data valid! Tidak ditemukan error. Klik "Proses Import" untuk melanjutkan.
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                        `;
                tbody.appendChild(successMsg);
            }

            displayData.forEach((row, index) => {
                const isError = row.status === 'error';

                const statusBadge = isError
                    ? `<span class="inline-flex items-center gap-1 px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded shadow-md uppercase tracking-wide">
                                                                                                                                                                                                                                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                                                                                                                                                                                                                ERROR
                                                                                                                                                                                                                                               </span>`
                    : `<span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold rounded uppercase">
                                                                                                                                                                                                                                                ✓ VALID
                                                                                                                                                                                                                                               </span>`;

                // ✅ FIX: Render Detail Error dengan proper handling
                let errorHtml = '<span class="text-gray-400 italic text-xs">-</span>';
                if (row.errors && row.errors.length > 0) {
                    errorHtml = '<div class="space-y-1">';
                    row.errors.forEach(err => {
                        errorHtml += `<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 px-2 py-1.5 rounded text-xs font-medium leading-snug">
                                                                                                                                                                                                                                                    ⚠️ ${escapeHtml(err)}
                                                                                                                                                                                                                                                </div>`;
                    });
                    errorHtml += '</div>';
                }

                const tr = document.createElement('tr');

                if (isError) {
                    tr.className = 'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border-b border-red-200 dark:border-red-800 transition-all';
                } else {
                    tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 transition-all';
                }

                tr.innerHTML = `
                                                                                                                                                                                                                                            <td class="px-3 py-3 text-center border-r border-gray-200 dark:border-gray-700">
                                                                                                                                                                                                                                                <span class="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-mono font-bold ${isError ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}">
                                                                                                                                                                                                                                                    ${row.row_number}
                                                                                                                                                                                                                                                </span>
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                            <td class="px-3 py-3 border-r border-gray-200 dark:border-gray-700 text-center">
                                                                                                                                                                                                                                                ${statusBadge}
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                            <td class="px-3 py-3 font-mono text-xs border-r border-gray-200 dark:border-gray-700 ${isError ? 'text-red-900 dark:text-red-300 font-bold' : 'text-gray-700 dark:text-gray-300'}">
                                                                                                                                                                                                                                                ${escapeHtml(row.nomor_pr || '-')}
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                            <td class="px-3 py-3 text-xs border-r border-gray-200 dark:border-gray-700 ${isError ? 'text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-400'}" title="${escapeHtml(row.tujuan_pengadaan)}">
                                                                                                                                                                                                                                                ${escapeHtml(row.tujuan_pengadaan || '-')}
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                            <td class="px-3 py-3 text-xs border-r border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300" title="${escapeHtml(row.portofolio)}">
                                                                                                                                                                                                                                                ${escapeHtml(row.portofolio || '-')}
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                            <td class="px-3 py-3 text-xs border-r border-gray-200 dark:border-gray-700 text-right font-mono">
                                                                                                                                                                                                                                                ${row.jumlah_pr ? formatRupiah(row.jumlah_pr) : '-'}
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                            <td class="px-3 py-3 align-top">
                                                                                                                                                                                                                                                ${errorHtml}
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                        `;

                tbody.appendChild(tr);
            });

            // ✅ FIX: Button Logic yang Benar
            const hasErrors = result.summary.error > 0;
            const btnProcess = document.getElementById('btnProcess');

            if (hasErrors) {
                // --- STATE ERROR ---
                btnProcess.className = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-all bg-red-600 text-white border-red-300 cursor-not-allowed opacity-60";
                btnProcess.disabled = true;
                btnProcess.innerHTML = `
                                                                                                                                                                                                                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                                                                                                                                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                                                                                                                                                                                                                            </svg>
                                                                                                                                                                                                                                            <span>Perbaiki Error Dulu</span>
                                                                                                                                                                                                                                        `;
            } else {
                // --- STATE NORMAL ---
                btnProcess.className = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-all bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95";
                btnProcess.disabled = false;
                btnProcess.innerHTML = `
                                                                                                                                                                                                                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                                                                                                                                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                                                                                                                                                                                                            </svg>
                                                                                                                                                                                                                                            <span id="btnProcessText">Proses Import</span>
                                                                                                                                                                                                                                            <span id="btnProcessSpinner" class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                                                                                                                                                                                                                                        `;
            }
        }

        window.processImport = async function () {
            if (previewData.length === 0) {
                Swal.fire('Error', 'Tidak ada data untuk diimport', 'error');
                return;
            }

            const validData = previewData.filter(d => d.status === 'valid');

            if (validData.length === 0) {
                Swal.fire('Error', 'Tidak ada data valid untuk diimport', 'error');
                return;
            }

            const result = await Swal.fire({
                title: 'Konfirmasi Import',
                html: `Akan mengimport <strong>${validData.length}</strong> data TORPR.<br>Lanjutkan?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Ya, Import',
                cancelButtonText: 'Batal'
            });

            if (!result.isConfirmed) return;

            const btnProcess = document.getElementById('btnProcess');
            const btnProcessText = document.getElementById('btnProcessText');
            const btnProcessSpinner = document.getElementById('btnProcessSpinner');

            btnProcess.disabled = true;
            btnProcessText.textContent = 'Memproses...';
            btnProcessSpinner.classList.remove('hidden');

            try {
                const response = await fetch(window.TORPR_PAGE_CONFIG.importProcessUrl, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': window.TORPR_PAGE_CONFIG.csrfToken,
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify({ data: validData })
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Gagal import data');
                }

                let message = `Berhasil import ${result.imported} data`;
                if (result.failed > 0) {
                    message += `\nGagal: ${result.failed} data`;
                    if (result.errors && result.errors.length > 0) {
                        message += '\n\nError:\n' + result.errors.join('\n');
                    }
                }

                await Swal.fire({
                    title: 'Import Selesai',
                    text: message,
                    icon: result.failed > 0 ? 'warning' : 'success',
                    confirmButtonColor: '#10B981'
                });

                closeImportModal();
                setTimeout(() => location.reload(), 500);

            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            } finally {
                btnProcess.disabled = false;
                btnProcessText.textContent = '✓ Proses Import';
                btnProcessSpinner.classList.add('hidden');
            }
        };
        // ==========================================
        // FORM CRUD FUNCTIONALITY
        // ==========================================
        (function () {
            const formModal = document.getElementById('formModal');
            const torprForm = document.getElementById('torprForm');
            const formTitle = document.getElementById('formTitle');
            const torprId = document.getElementById('torpr_id');

            const btnSaveText = document.getElementById('btnSaveText');
            const btnSaveSpinner = document.getElementById('btnSaveSpinner');

            function setSaving(x) {
                if (x) {
                    btnSaveSpinner.classList.remove('hidden');
                    btnSaveText.textContent = 'Menyimpan...';
                } else {
                    btnSaveSpinner.classList.add('hidden');
                    btnSaveText.textContent = 'Simpan';
                }
            }

            function clearErrors() {
                torprForm.querySelectorAll('p[id^="err_"]').forEach(p => {
                    p.textContent = '';
                    p.classList.add('hidden');
                });
                torprForm.querySelectorAll('input, textarea, select').forEach(el => {
                    el.classList.remove('ring-2', 'ring-red-200', 'border-red-400');
                });
            }

            function showFieldError(field, message) {
                const p = document.getElementById('err_' + field);
                const input = torprForm.querySelector('[name="' + field + '"]');
                if (p) {
                    p.textContent = message;
                    p.classList.remove('hidden');
                }
                if (input) {
                    input.classList.add('border-red-400', 'ring-2', 'ring-red-200');
                }
            }

            function wireRealtimeClear() {
                torprForm.querySelectorAll('input, textarea, select').forEach(el => {
                    el.addEventListener('input', () => {
                        const p = document.getElementById('err_' + el.name);
                        if (p) {
                            p.textContent = '';
                            p.classList.add('hidden');
                        }
                        el.classList.remove('ring-2', 'ring-red-200', 'border-red-400');
                    });
                });
            }
            wireRealtimeClear();

            // ✅ Auto UPPERCASE untuk Nomor PR
            const nomorPrInput = document.getElementById('nomor_pr');
            if (nomorPrInput) {
                nomorPrInput.addEventListener('input', function () {
                    const start = this.selectionStart;
                    const end = this.selectionEnd;
                    this.value = this.value.toUpperCase();
                    this.setSelectionRange(start, end);
                });
            }

            function updateFormGuidance(mode = 'create') {
                const titleEl = document.getElementById('formGuidanceTitle');
                const subtitleEl = document.getElementById('formGuidanceSubtitle');
                const messageEl = document.getElementById('formGuidanceMessage');
                const badgeEl = document.getElementById('formGuidanceBadge');
                const listEl = document.getElementById('formGuidanceList');
                const boxEl = document.getElementById('formGuidanceBox');
                if (!titleEl || !subtitleEl || !messageEl || !badgeEl || !listEl || !boxEl) return;

                const isEdit = mode === 'edit';

                titleEl.textContent = isEdit
                    ? 'Informasi Edit PR Operasional'
                    : 'Informasi Pengisian PR Operasional';

                subtitleEl.textContent = isEdit
                    ? 'Pastikan perubahan data tetap lengkap sebelum PR diproses ke Umum.'
                    : 'Harap lengkapi seluruh data PR sebelum diajukan ke Umum.';

                if (canAccessKacab) {
                    badgeEl.textContent = 'Superadmin Operasional';
                    messageEl.innerHTML = 'Anda login sebagai <strong>Superadmin Operasional</strong>. Mohon pastikan data PR lengkap, akurat, dan siap diproses. Kolom <strong>Ttd Kacab PR</strong> tersedia untuk Anda, namun seluruh kolom utama tetap harus dilengkapi terlebih dahulu.';
                    listEl.innerHTML = "<li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300\">✓</span><span>Lengkapi <strong>Tujuan Pengadaan</strong>, <strong>Portofolio</strong>, <strong>Nomor PR</strong>, <strong>Tanggal PR</strong>, dan <strong>Harga / Jumlah PR</strong>.</span></li><li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300\">✓</span><span>Lengkapi <strong>Ttd Kabid PR</strong>. Bila diperlukan, Anda juga dapat melengkapi <strong>Ttd Kacab PR</strong>.</span></li><li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300\">!</span><span>Tombol <strong>Request Umum</strong> hanya tersedia untuk <strong>Superadmin Operasional</strong> saat semua data wajib sudah lengkap.</span></li><li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300\">✕</span><span>Jika masih ada kolom wajib kosong, PR tidak dapat diajukan ke Umum.</span></li>";
                } else {
                    badgeEl.textContent = 'User Operasional';
                    messageEl.innerHTML = 'Anda login sebagai <strong>User Operasional</strong>. Mohon isi semua data PR secara lengkap dan benar. Khusus kolom <strong>Ttd Kacab PR</strong>, kolom tersebut <strong>tidak perlu Anda isi</strong> karena hanya bisa dilengkapi oleh <strong>Superadmin Operasional</strong>.';
                    listEl.innerHTML = "<li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300\">✓</span><span>Lengkapi <strong>Tujuan Pengadaan</strong>, <strong>Portofolio</strong>, <strong>Nomor PR</strong>, <strong>Tanggal PR</strong>, dan <strong>Harga / Jumlah PR</strong>.</span></li><li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300\">✓</span><span>Lengkapi <strong>Ttd Kabid PR</strong> agar PR siap diproses pada tahap berikutnya.</span></li><li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300\">!</span><span>Kolom <strong>Ttd Kacab PR</strong> akan dikunci untuk Anda dan tidak perlu diisi.</span></li><li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300\">✕</span><span>Jika ada data wajib kosong, tombol <strong>Request Umum</strong> tidak akan muncul / tidak bisa diproses.</span></li>";
                }

                boxEl.classList.remove('animate-pulse');
                void boxEl.offsetWidth;
                boxEl.classList.add('animate-pulse');
                setTimeout(() => boxEl.classList.remove('animate-pulse'), 900);
            }

            function openModal(title) {
                formTitle.textContent = title;
                formModal.classList.remove('hidden');
                formModal.classList.add('flex');
            }

            window.openCreateForm = function () {
                torprForm.reset();
                torprId.value = '';
                if (window.jQuery) $('#portofolio').val('').trigger('change');
                clearErrors();
                openModal('Tambah TORPR');
                updateFormGuidance('create');

                // ✅ DISABLE FIELD KACAB JIKA TIDAK BERHAK
                const inputKacab = document.getElementById('tgl_ttd_kacab_pr');
                const warnKacab = document.getElementById('warn_ttd_kacab');

                if (!canAccessKacab) {
                    inputKacab.disabled = true;
                    inputKacab.classList.add('bg-gray-100', 'dark:bg-gray-800', 'cursor-not-allowed');
                    warnKacab.classList.remove('hidden'); // Tampilkan pesan
                } else {
                    inputKacab.disabled = false;
                    inputKacab.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'cursor-not-allowed');
                    warnKacab.classList.add('hidden'); // Sembunyikan pesan
                }
            }

            // ==========================================
            // OPEN EDIT FORM - OPTIMIZED DENGAN LOADING INDICATOR
            // ==========================================
            window.openEditForm = async function (id) {
                clearErrors();

                // ✅ TAMPILKAN LOADING DULU SEBELUM FETCH
                Swal.fire({
                    title: 'Memuat data...',
                    html: '<div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        // Start fetching data IMMEDIATELY setelah Swal muncul
                        fetchAndPopulateEditForm(id);
                    }
                });
            }

            // ✅ PISAHKAN LOGIC FETCH KE FUNCTION TERPISAH
            async function fetchAndPopulateEditForm(id) {
                try {
                    const r = await fetch(`/torpr/${id}/json`, {
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest' // ✅ Tambahkan header
                        }
                    });

                    if (!r.ok) throw new Error('Gagal mengambil data TORPR.');

                    const d = await r.json();

                    // ✅ TUTUP LOADING SWAL
                    Swal.close();

                    // ✅ POPULATE FORM
                    const torprForm = document.getElementById('torprForm');
                    const torprId = document.getElementById('torpr_id');

                    torprForm.reset();
                    torprId.value = d.id;

                    Object.keys(d).forEach(k => {
                        const el = torprForm.querySelector('[name="' + k + '"]');
                        if (!el) return;

                        // ✅ LOGIC BARU UNTUK FORMAT
                        if (k === 'jumlah_pr') {
                            // Jika kolom jumlah_pr, format sebagai Rupiah
                            el.value = d[k] ? formatRupiahGlobal(d[k]) : '';
                        }
                        else if (el.type === 'datetime-local' && d[k]) {
                            const datetime = d[k].replace(' ', 'T').substring(0, 16);
                            el.value = datetime;
                        } else {
                            el.value = (d[k] ?? '');
                        }
                    });

                    if (window.jQuery) $('#portofolio').val(d.portofolio || '').trigger('change');

                    const inputKacab = document.getElementById('tgl_ttd_kacab_pr');
                    const warnKacab = document.getElementById('warn_ttd_kacab');

                    if (!canAccessKacab) {
                        inputKacab.disabled = true;
                        inputKacab.classList.add('bg-gray-100', 'dark:bg-gray-800', 'cursor-not-allowed');
                        warnKacab.classList.remove('hidden');
                    } else {
                        inputKacab.disabled = false;
                        inputKacab.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'cursor-not-allowed');
                        warnKacab.classList.add('hidden');
                    }

                    // ✅ BUKA MODAL EDIT
                    const formModal = document.getElementById('formModal');
                    const formTitle = document.getElementById('formTitle');

                    formTitle.textContent = 'Edit TORPR';
                    updateFormGuidance('edit');
                    formModal.classList.remove('hidden');
                    formModal.classList.add('flex');

                } catch (e) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: e.message || 'Gagal membuka data',
                        confirmButtonColor: '#EF4444'
                    });
                }
            }

            window.closeForm = function () {
                formModal.classList.add('hidden');
                formModal.classList.remove('flex');
            }

            async function submitTorpr(url, method, payload) {
                clearErrors();

                // Validasi Tujuan Pengadaan
                if (!payload.tujuan_pengadaan || payload.tujuan_pengadaan.trim() === '') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Tujuan Pengadaan Wajib',
                        text: 'Kolom Tujuan Pengadaan harus diisi sebelum menyimpan.',
                        confirmButtonColor: '#F59E0B'
                    });
                    const inputTujuan = torprForm.querySelector('[name="tujuan_pengadaan"]');
                    if (inputTujuan) inputTujuan.classList.add('border-red-400', 'ring-2', 'ring-red-200');
                    return;
                }

                setSaving(true);

                try {
                    const r = await fetch(url, {
                        method,
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    const isJson = (r.headers.get('content-type') || '').includes('application/json');
                    const j = isJson ? await r.json().catch(() => ({})) : {};

                    if (r.status === 422) {
                        const errs = j.errors || {};
                        Object.keys(errs).forEach(field => {
                            showFieldError(field, errs[field]?.[0] || 'Input tidak valid');
                        });

                        if (errs.tujuan_pengadaan) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Validasi Gagal',
                                text: 'Tujuan Pengadaan wajib diisi.',
                                confirmButtonColor: '#EF4444'
                            });
                        } else if (errs.nomor_pr && errs.nomor_pr.length) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Nomor PR sudah ada',
                                text: errs.nomor_pr[0],
                                confirmButtonColor: '#F59E0B'
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Validasi gagal',
                                text: j.message || 'Periksa input yang berwarna merah.',
                                confirmButtonColor: '#EF4444'
                            });
                        }

                        setSaving(false);
                        return;
                    }

                    if (!r.ok) {
                        throw new Error(j?.message || 'Gagal menyimpan. Terjadi kesalahan server.');
                    }

                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: 'Data berhasil disimpan.',
                        timer: 1500,
                        showConfirmButton: false,
                        customClass: {
                            popup: 'animate-scale-in'
                        }
                    }).then(() => location.reload());
                } catch (err) {
                    setSaving(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: err.message || 'Gagal menyimpan',
                        confirmButtonColor: '#EF4444'
                    });
                }
            }

            torprForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const id = torprId.value;
                const payload = {};

                torprForm.querySelectorAll('[name]').forEach(el => {
                    if (el.name === 'id') return;

                    let val = el.value;

                    // ✅ FIX: Jika kolom jumlah_pr, hapus koma pemisah ribuan
                    if (el.name === 'jumlah_pr') {
                        val = val.replace(/,/g, ''); // "1,000.00" -> "1000.00"
                    }

                    payload[el.name] = (val === '' ? null : val);
                });

                submitTorpr(id ? `/torpr/${id}` : '/torpr', id ? 'PUT' : 'POST', payload);
            });

            function padTorprTime(value) {
                return String(Math.max(0, Math.floor(Number(value) || 0))).padStart(2, '0');
            }

            function formatTorprLockTime(seconds) {
                const safeSeconds = Math.max(0, Math.ceil(Number(seconds) || 0));
                const hours = Math.floor(safeSeconds / 3600);
                const minutes = Math.floor((safeSeconds % 3600) / 60);
                const remainSeconds = safeSeconds % 60;

                return `${padTorprTime(hours)}:${padTorprTime(minutes)}:${padTorprTime(remainSeconds)}`;
            }

            function formatTorprFullDateTime(date = new Date()) {
                return new Intl.DateTimeFormat('id-ID', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                    timeZone: 'Asia/Jakarta',
                }).format(date);
            }

            let torprIncomingEditRequests = [];
            let torprOutgoingEditRequests = [];
            let torprEditRequestCenterLoaded = false;
            let torprEditRequestCenterPromise = null;

            async function loadTorprEditRequestCenter() {
                if (torprEditRequestCenterLoaded) {
                    return;
                }

                if (!torprEditRequestCenterPromise) {
                    torprEditRequestCenterPromise = fetch(window.TORPR_PAGE_CONFIG.editRequestCenterUrl, {
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        credentials: 'same-origin',
                    }).then(async response => {
                        const data = await response.json().catch(() => ({}));
                        if (!response.ok) {
                            throw new Error(data.message || 'Data request edit gagal dimuat.');
                        }

                        torprIncomingEditRequests = Array.isArray(data.incoming) ? data.incoming : [];
                        torprOutgoingEditRequests = Array.isArray(data.outgoing) ? data.outgoing : [];
                        torprEditRequestCenterLoaded = true;
                    }).finally(() => {
                        torprEditRequestCenterPromise = null;
                    });
                }

                return torprEditRequestCenterPromise;
            }

            window.requestTorprEditAccess = async function (id, nomorPr, creatorName, creatorContact) {
                const safeNomor = nomorPr || 'Nomor PR belum diisi';
                const safeCreator = creatorName || 'Pembuat PR';
                const safeContact = creatorContact || 'kontak belum tercatat';

                const result = await Swal.fire({
                    icon: 'info',
                    title: 'Edit PR terkunci',
                    html: `
                        <div class="torpr-edit-request-card">
                            <div><strong>Data:</strong> ${escapeHtml(safeNomor)}</div>
                            <div><strong>Pembuat:</strong> ${escapeHtml(safeCreator)}</div>
                            <div><strong>Kontak:</strong> ${escapeHtml(safeContact)}</div>
                            <div class="mt-2">
                                Edit hanya bisa dilakukan oleh pembuat PR supaya riwayat data tetap jelas.
                                Jika user lain perlu mengubah data, gunakan request edit dulu ke pembuat PR.
                            </div>
                        </div>
                        <div class="torpr-edit-request-template">
                            <strong>Alasan request edit <span class="text-red-500">*</span></strong><br>
                            <p class="torpr-edit-request-help">
                                Wajib diisi minimal 10 karakter agar pembuat PR tahu bagian mana yang perlu dibuka untuk diedit.
                            </p>
                            <textarea id="torprEditRequestReason" class="torpr-edit-request-reason" minlength="10" maxlength="500" placeholder="Contoh: Mohon izin edit karena nilai PR perlu disesuaikan dengan dokumen terbaru."></textarea>
                        </div>
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Kirim Request',
                    cancelButtonText: 'Tutup',
                    confirmButtonColor: '#16a34a',
                    cancelButtonColor: '#64748b',
                    showLoaderOnConfirm: true,
                    allowOutsideClick: () => !Swal.isLoading(),
                    customClass: {
                        popup: 'torpr-delete-popup',
                        title: 'torpr-delete-title',
                        htmlContainer: 'torpr-delete-html',
                    },
                    preConfirm: async () => {
                        const reason = document.getElementById('torprEditRequestReason')?.value?.trim() || '';
                        if (reason.length < 10) {
                            Swal.showValidationMessage('Alasan request edit wajib diisi minimal 10 karakter.');
                            return false;
                        }

                        try {
                            const response = await fetch(`/torpr/${id}/request-edit`, {
                                method: 'POST',
                                headers: {
                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                },
                                body: JSON.stringify({ reason }),
                            });

                            const data = await response.json().catch(() => ({}));

                            if (!response.ok) {
                                const firstError = data.errors
                                    ? Object.values(data.errors).flat()[0]
                                    : null;
                                Swal.showValidationMessage(firstError || data.message || 'Request edit gagal dikirim.');
                                return false;
                            }

                            return data;
                        } catch (error) {
                            Swal.showValidationMessage(error.message || 'Koneksi gagal. Coba lagi.');
                            return false;
                        }
                    },
                });

                if (result.isConfirmed && result.value?.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Request terkirim',
                        text: result.value.message || 'Request edit sudah masuk ke menu Req Edit pembuat PR.',
                        timer: 1600,
                        showConfirmButton: false,
                        customClass: {
                            popup: 'torpr-delete-popup',
                            title: 'torpr-delete-title',
                            htmlContainer: 'torpr-delete-html',
                        },
                    }).then(() => location.reload());
                }
            }

            function statusBadgeClass(status) {
                if (status === 'approved') return 'is-approved';
                if (status === 'rejected') return 'is-rejected';
                return 'is-pending';
            }

            window.reviewTorprEditRequest = async function (id, decision) {
                const result = await Swal.fire({
                    icon: decision === 'approve' ? 'success' : 'warning',
                    title: decision === 'approve' ? 'Setujui request edit?' : 'Tolak request edit?',
                    input: 'textarea',
                    inputPlaceholder: decision === 'approve'
                        ? 'Catatan opsional untuk requester...'
                        : 'Wajib isi alasan penolakan minimal 10 karakter...',
                    inputLabel: decision === 'approve'
                        ? 'Catatan persetujuan (opsional)'
                        : 'Alasan penolakan (wajib)',
                    inputAttributes: decision === 'reject'
                        ? { minlength: 10, maxlength: 500 }
                        : { maxlength: 500 },
                    showCancelButton: true,
                    confirmButtonText: decision === 'approve' ? 'Setujui 24 Jam' : 'Tolak',
                    cancelButtonText: 'Batal',
                    confirmButtonColor: decision === 'approve' ? '#16a34a' : '#dc2626',
                    cancelButtonColor: '#64748b',
                    customClass: {
                        popup: 'torpr-delete-popup',
                        title: 'torpr-delete-title',
                        htmlContainer: 'torpr-delete-html',
                    },
                    preConfirm: async (review_note) => {
                        const cleanNote = (review_note || '').trim();
                        if (decision === 'reject' && cleanNote.length < 10) {
                            Swal.showValidationMessage('Alasan penolakan wajib diisi minimal 10 karakter.');
                            return false;
                        }

                        try {
                            const response = await fetch(`/torpr-edit-requests/${id}`, {
                                method: 'PATCH',
                                headers: {
                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                },
                                body: JSON.stringify({ decision, review_note: cleanNote }),
                            });

                            const data = await response.json().catch(() => ({}));

                            if (!response.ok) {
                                const firstError = data.errors
                                    ? Object.values(data.errors).flat()[0]
                                    : null;
                                Swal.showValidationMessage(firstError || data.message || 'Gagal memproses request.');
                                return false;
                            }

                            return data;
                        } catch (error) {
                            Swal.showValidationMessage(error.message || 'Koneksi gagal. Coba lagi.');
                            return false;
                        }
                    },
                });

                if (result.isConfirmed && result.value?.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: result.value.message,
                        timer: 1500,
                        showConfirmButton: false,
                    }).then(() => location.reload());
                }
            }

            window.openTorprEditRequestCenter = async function () {
                Swal.fire({
                    title: 'Memuat Req Edit...',
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading(),
                    customClass: {
                        popup: 'torpr-delete-popup',
                        title: 'torpr-delete-title',
                    },
                });

                try {
                    await loadTorprEditRequestCenter();
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Req Edit gagal dimuat',
                        text: error.message || 'Silakan coba lagi.',
                        confirmButtonColor: '#2563eb',
                        customClass: {
                            popup: 'torpr-delete-popup',
                            title: 'torpr-delete-title',
                        },
                    });
                    return;
                }

                const incomingHtml = torprIncomingEditRequests.length
                    ? torprIncomingEditRequests.map(req => `
                        <div class="torpr-request-center-row">
                            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <div class="torpr-request-center-pr">${escapeHtml(req.nomor_pr)}</div>
                                    <div class="torpr-request-center-sub">${escapeHtml(req.tujuan)}</div>
                                    <div class="torpr-request-center-meta">
                                        Requester: <strong>${escapeHtml(req.requester)}</strong> (${escapeHtml(req.email)})<br>
                                        Masuk: ${escapeHtml(req.created_at)}
                                    </div>
                                    <div class="torpr-request-center-reason">
                                        ${escapeHtml(req.reason)}
                                    </div>
                                </div>
                                <div class="torpr-request-center-actions">
                                    <button type="button" onclick="reviewTorprEditRequest(${req.id}, 'approve')" class="torpr-request-center-approve">Setujui</button>
                                    <button type="button" onclick="reviewTorprEditRequest(${req.id}, 'reject')" class="torpr-request-center-reject">Tolak</button>
                                </div>
                            </div>
                        </div>
                    `).join('')
                    : '<div class="torpr-request-center-empty">Belum ada request edit masuk.</div>';

                const outgoingHtml = torprOutgoingEditRequests.length
                    ? torprOutgoingEditRequests.map(req => `
                        <div class="torpr-request-center-row">
                            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <div class="torpr-request-center-pr">${escapeHtml(req.nomor_pr)}</div>
                                    <div class="torpr-request-center-sub">${escapeHtml(req.tujuan)}</div>
                                    <div class="torpr-request-center-meta">
                                        Pembuat: <strong>${escapeHtml(req.owner)}</strong><br>
                                        Request: ${escapeHtml(req.created_at)}
                                        ${req.reviewed_at ? `<br>Diproses: ${escapeHtml(req.reviewed_at)}` : ''}
                                        ${req.expires_at ? `<br>Izin aktif sampai: ${escapeHtml(req.expires_at)}` : ''}
                                    </div>
                                    <div class="torpr-request-center-reason">Alasan: ${escapeHtml(req.reason)}</div>
                                    ${req.review_note && req.review_note !== '-' ? `<div class="torpr-request-center-meta">Catatan: ${escapeHtml(req.review_note)}</div>` : ''}
                                </div>
                                <span class="torpr-request-status ${statusBadgeClass(req.status)}">${escapeHtml(req.status)}</span>
                            </div>
                        </div>
                    `).join('')
                    : '<div class="torpr-request-center-empty">Belum ada riwayat request edit keluar.</div>';

                Swal.fire({
                    title: '🔐 Pusat Req Edit TORPR',
                    html: `
                        <div class="space-y-5 text-left">
                            <div class="torpr-request-center-note">
                                Izin edit bersifat spesifik per PR dan aktif 24 jam setelah disetujui. Untuk PR lain, user harus request lagi.
                            </div>
                            <div>
                                <div class="torpr-request-center-title">Request Masuk untuk Data Saya</div>
                                <div class="space-y-3">${incomingHtml}</div>
                            </div>
                            <div>
                                <div class="torpr-request-center-title">Riwayat Request Saya</div>
                                <div class="space-y-3">${outgoingHtml}</div>
                            </div>
                        </div>
                    `,
                    width: 900,
                    confirmButtonText: 'Tutup',
                    confirmButtonColor: '#2563eb',
                    customClass: {
                        popup: 'torpr-delete-popup',
                        title: 'torpr-delete-title',
                        htmlContainer: 'torpr-delete-html',
                    },
                });
            }

            function showTorprDeleteLockCountdown(message, retryAfter, lockedUntil = null) {
                let remainingSeconds = Math.max(1, Math.ceil(Number(retryAfter) || (15 * 60)));
                let timer = null;
                const canRetryAt = lockedUntil ? new Date(lockedUntil) : new Date(Date.now() + (remainingSeconds * 1000));

                Swal.fire({
                    icon: 'error',
                    title: 'Aksi dikunci sementara',
                    html: `
                        <div class="torpr-lock-caption">
                            ${escapeHtml(message || 'Password salah 3 kali. Silakan coba lagi setelah waktu tunggu selesai.')}
                        </div>
                        <div id="torprLockCountdown" class="torpr-lock-countdown">${formatTorprLockTime(remainingSeconds)}</div>
                        <div class="torpr-lock-caption">
                            Waktu tersisa sebelum tombol hapus bisa dicoba lagi.
                        </div>
                        <div class="torpr-time-pill">
                            Bisa dicoba lagi: ${escapeHtml(formatTorprFullDateTime(canRetryAt))} WIB
                        </div>
                    `,
                    confirmButtonText: 'Saya mengerti',
                    confirmButtonColor: '#dc2626',
                    customClass: {
                        popup: 'torpr-delete-popup',
                        title: 'torpr-delete-title',
                        htmlContainer: 'torpr-delete-html',
                    },
                    didOpen: () => {
                        const countdownEl = document.getElementById('torprLockCountdown');
                        timer = setInterval(() => {
                            remainingSeconds = Math.max(0, remainingSeconds - 1);
                            if (countdownEl) {
                                countdownEl.textContent = formatTorprLockTime(remainingSeconds);
                            }

                            if (remainingSeconds <= 0) {
                                clearInterval(timer);
                                timer = null;
                                if (countdownEl) {
                                    countdownEl.textContent = '00:00';
                                }
                            }
                        }, 1000);
                    },
                    willClose: () => {
                        if (timer) {
                            clearInterval(timer);
                        }
                    }
                });
            }

            window.deleteTorprDraft = async function (id, nomorPr) {
                const result = await Swal.fire({
                    icon: 'warning',
                    title: 'Hapus draft PR?',
                    html: `
                        <div class="text-left space-y-3">
                            <div class="torpr-delete-danger">
                                <div class="torpr-delete-danger-title">Data: ${escapeHtml(nomorPr || 'Nomor PR belum diisi')}</div>
                                <div>
                                    Hapus hanya bisa untuk PR yang belum pernah diajukan ke Umum.
                                    Jika sudah pernah request, sistem akan menolak agar riwayat audit tetap aman.
                                </div>
                            </div>
                            <div class="torpr-delete-warning">
                                Masukkan <strong>password user pembuat PR</strong>. Jika user lain ingin menghapus,
                                user tersebut tetap harus mengetahui password pembuat PR.
                            </div>
                            <div class="torpr-lock-preview">
                                <div class="torpr-lock-preview-row">
                                    <span>⏱️</span>
                                    <span>Jika password salah 3 kali, tombol hapus dikunci selama <strong>${formatTorprLockTime(15 * 60)}</strong>.</span>
                                </div>
                                <div class="torpr-lock-preview-row">
                                    <span>🔓</span>
                                    <span>Jam akses ulang yang pasti akan muncul setelah tombol hapus benar-benar terkunci.</span>
                                </div>
                            </div>
                            <div class="torpr-password-wrap">
                                <label for="torprCreatorPassword" class="torpr-password-label">Password pembuat PR</label>
                                <div class="torpr-password-field">
                                    <input
                                        id="torprCreatorPassword"
                                        type="password"
                                        placeholder="Masukkan password pembuat PR"
                                        autocomplete="current-password"
                                        autocapitalize="off"
                                    >
                                    <button type="button" id="toggleTorprPassword" class="torpr-password-toggle">Lihat</button>
                                </div>
                                <div class="torpr-password-help">
                                    Jika salah 3 kali, aksi hapus akan dikunci 15 menit demi keamanan data.
                                </div>
                            </div>
                        </div>
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Ya, Hapus Draft',
                    cancelButtonText: 'Batal',
                    confirmButtonColor: '#dc2626',
                    cancelButtonColor: '#64748b',
                    showLoaderOnConfirm: true,
                    allowOutsideClick: () => !Swal.isLoading(),
                    customClass: {
                        popup: 'torpr-delete-popup',
                        title: 'torpr-delete-title',
                        htmlContainer: 'torpr-delete-html',
                    },
                    didOpen: () => {
                        const input = document.getElementById('torprCreatorPassword');
                        const toggle = document.getElementById('toggleTorprPassword');

                        input?.focus();
                        toggle?.addEventListener('click', () => {
                            const isPassword = input.type === 'password';
                            input.type = isPassword ? 'text' : 'password';
                            toggle.textContent = isPassword ? 'Sembunyi' : 'Lihat';
                        });
                    },
                    preConfirm: async () => {
                        const password = document.getElementById('torprCreatorPassword')?.value || '';

                        if (!password || !password.trim()) {
                            Swal.showValidationMessage('Password pembuat PR wajib diisi.');
                            return false;
                        }

                        try {
                            const response = await fetch(`/torpr/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                },
                                body: JSON.stringify({
                                    creator_password: password,
                                }),
                            });

                            const data = await response.json().catch(() => ({}));

                            if (response.status === 429 || data.locked) {
                                return {
                                    locked: true,
                                    message: data.message || 'Aksi hapus dikunci sementara karena terlalu banyak percobaan.',
                                    retry_after: data.retry_after || (15 * 60),
                                    locked_until: data.locked_until || null,
                                };
                            }

                            if (!response.ok) {
                                Swal.showValidationMessage(data.message || 'Gagal menghapus draft PR.');
                                return false;
                            }

                            return {
                                ok: true,
                                message: data.message || 'Draft PR berhasil dihapus.',
                            };
                        } catch (error) {
                            Swal.showValidationMessage(error.message || 'Koneksi gagal. Coba lagi.');
                            return false;
                        }
                    }
                });

                if (result.dismiss) return;

                if (result.value?.locked) {
                    showTorprDeleteLockCountdown(result.value.message, result.value.retry_after, result.value.locked_until);
                    return;
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Draft terhapus',
                    text: result.value?.message || 'Draft PR berhasil dihapus.',
                    timer: 1400,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'torpr-delete-popup',
                        title: 'torpr-delete-title',
                        htmlContainer: 'torpr-delete-html',
                    },
                }).then(() => location.reload());
            }

            window.requestReceipt = async function (id) {

                const res = await Swal.fire({
                    title: '📨 Request penerimaan Umum?',
                    text: 'Operasional hanya mengajukan. Umum yang akan approve.',
                    icon: 'info',
                    input: 'text',
                    inputLabel: 'Nama pengaju (Operasional)',
                    inputPlaceholder: 'Contoh: Andi',
                    showCancelButton: true,
                    confirmButtonText: '📤 Kirim Request',
                    cancelButtonText: '✖ Batal',
                    confirmButtonColor: '#3B82F6',
                    cancelButtonColor: '#6B7280',
                    showCloseButton: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                    preConfirm: (v) => {
                        const x = (v || '').trim();
                        if (!x) {
                            Swal.showValidationMessage('Nama wajib diisi');
                            return false;
                        }
                        return x;
                    }
                });

                // ❗ kalau user cancel / close / klik luar / ESC → stop total
                if (res.dismiss) return;

                try {
                    // loading modal
                    Swal.fire({
                        title: 'Mengirim Request...',
                        html: '<div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showCloseButton: false
                    });

                    const r = await fetch(`/torpr/${id}/request-receipt`, {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({ requested_name: res.value })
                    });

                    const isJson = (r.headers.get('content-type') || '').includes('application/json');
                    const j = isJson ? await r.json().catch(() => ({})) : {};

                    if (!r.ok) {
                        throw new Error(j?.message || 'Request gagal');
                    }

                    await Swal.fire({
                        icon: 'success',
                        title: 'Terkirim!',
                        text: 'Menunggu persetujuan Umum.',
                        confirmButtonColor: '#10B981'
                    });

                    location.reload();

                } catch (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: err.message || 'Request gagal',
                        confirmButtonColor: '#EF4444'
                    });
                }
            };


            // Tambahkan ini di bagian bawah script
            document.getElementById('importModal').addEventListener('click', function (e) {
                // Hanya tutup jika klik di background (bukan di konten modal)
                if (e.target === this) {
                    closeImportModal();
                }
            });

            // ==========================================
            // AUTO REFRESH RECEIPT STATUS
            // ==========================================
            async function refreshReceiptBadges() {
                const rows = document.querySelectorAll('[data-row-id]');
                if (!rows.length) return;

                const ids = [...rows].map(r => r.dataset.rowId);

                try {
                    const r = await fetch(`/torpr/receipt-status-bulk?ids=${ids.join(',')}`);
                    if (!r.ok) return;
                    const data = await r.json();

                    rows.forEach(tr => {
                        const j = data[tr.dataset.rowId];
                        if (!j) return;

                        const badge = tr.querySelector('[data-receipt-badge]');
                        const sub = tr.querySelector('[data-receipt-sub]');

                        const status = j.status ?? '—';
                        badge.textContent = status;
                        badge.className = "inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white " +
                            (status === "APPROVED" ? "bg-green-600" :
                                status === "REJECTED" ? "bg-red-600" :
                                    status === "PENDING" ? "bg-yellow-500" : "bg-gray-400");

                        if (status === "APPROVED")
                            sub.textContent = "diterima: " + (j.approved_by || "Umum");
                        else if (status === "REJECTED")
                            sub.textContent = "ditolak";
                        else if (status === "PENDING")
                            sub.textContent = "menunggu umum";
                        else
                            sub.textContent = "—";
                    });
                } catch (e) {
                    console.error('Refresh error:', e);
                }
            }

            const isHeavy = window.TORPR_PAGE_CONFIG.isHeavy;
            let receiptRefreshTimer = null;

            function startReceiptRefresh() {
                if (isHeavy || document.hidden || receiptRefreshTimer) return;
                receiptRefreshTimer = setInterval(refreshReceiptBadges, 60000);
            }

            function stopReceiptRefresh() {
                if (!receiptRefreshTimer) return;
                clearInterval(receiptRefreshTimer);
                receiptRefreshTimer = null;
            }

            startReceiptRefresh();
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) stopReceiptRefresh();
                else startReceiptRefresh();
            });
        })();