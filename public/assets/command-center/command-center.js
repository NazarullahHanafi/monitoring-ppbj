(function () {
    'use strict';

    var root = document.getElementById('commandCenter');
    if (!root) return;

    var csrf = (document.querySelector('meta[name="csrf-token"]') || {}).content || '';
    var urls = {
        overview: root.dataset.overviewUrl,
        search: root.dataset.searchUrl,
        ask: root.dataset.askUrl,
        journey: root.dataset.journeyUrl
    };
    var overviewCacheKey = 'simonpr.command-center.overview.v2';
    var overviewCacheLifetime = 120000;
    var archiveCache = Object.create(null);
    var compactMoney = new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', notation: 'compact', maximumFractionDigits: 1
    });

    function esc(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
        });
    }

    function fetchJson(url, options) {
        var controller = new AbortController();
        var timer = setTimeout(function () { controller.abort(); }, 12000);
        var request = Object.assign({}, options || {});
        request.signal = controller.signal;
        request.headers = Object.assign({
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrf
        }, request.headers || {});

        return fetch(url, request)
            .then(function (response) {
                return response.json().catch(function () { return {}; }).then(function (data) {
                    if (!response.ok) throw new Error(data.message || 'Permintaan gagal');
                    return data;
                });
            })
            .catch(function (error) {
                if (error.name === 'AbortError') throw new Error('Respons terlalu lama. Silakan coba kembali.');
                throw error;
            })
            .finally(function () { clearTimeout(timer); });
    }

    function setLoading(button, active) {
        if (!button) return;
        button.disabled = active;
        button.dataset.label = button.dataset.label || button.textContent;
        button.textContent = active ? 'Memproses…' : button.dataset.label;
    }

    function showError(message) {
        if (window.Swal) {
            window.Swal.fire({ icon: 'error', title: 'Belum berhasil', text: message, timer: 4500 });
        } else {
            window.alert(message);
        }
    }

    function openModal(id) {
        var modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModals() {
        document.querySelectorAll('.cc-modal.open').forEach(function (modal) {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
        });
        document.body.style.overflow = '';
    }

    function renderStats(stats) {
        var items = [
            { label: 'Total Pengadaan', value: stats.total, note: 'Seluruh PR/PPBJ', style: '' },
            { label: 'Sedang Aktif', value: stats.active, note: 'Proses yang berjalan', style: '' },
            { label: 'Risiko Tinggi', value: stats.high_risk, note: 'Butuh keputusan cepat', style: 'cc-stat-danger' },
            { label: 'Kontrak Kritis', value: stats.critical_contracts, note: '≤ 7 hari atau terlambat', style: 'cc-stat-amber' },
            { label: 'Nilai PR', value: compactMoney.format(stats.total_pr || 0), note: stats.total_pr_label, style: '' },
            { label: 'Efisiensi', value: compactMoney.format(stats.efficiency || 0), note: stats.efficiency_label, style: stats.efficiency >= 0 ? 'cc-stat-green' : 'cc-stat-danger' }
        ];

        document.getElementById('ccStats').innerHTML = items.map(function (item) {
            return '<article class="cc-stat ' + item.style + '" title="' + esc(item.note) + '">' +
                '<span>' + esc(item.label) + '</span><strong>' + esc(item.value) + '</strong><small>' + esc(item.note) + '</small></article>';
        }).join('');
    }

    function renderFlow(rows) {
        document.getElementById('ccFlow').innerHTML = (rows || []).map(function (row) {
            return '<div class="cc-flow-step"><strong>' + esc(row.count) + '</strong><span>' + esc(row.label) + '</span></div>';
        }).join('');
    }

    function riskHtml(row) {
        return '<article class="cc-risk-item"><div class="cc-risk-score ' + esc(row.level) + '">' + esc(row.score) + '</div>' +
            '<div><div class="cc-item-title">' + esc(row.ppbj_no) + ' · ' + esc(row.uraian) + '</div>' +
            '<div class="cc-item-sub">' + esc(row.buyer) + ' · ' + esc(row.vendor) + ' · ' + esc(row.nilai_sp_label) + '</div>' +
            '<div class="cc-reasons">' + esc((row.reasons || []).join(' • ')) + '</div></div>' +
            '<button class="cc-open" data-journey="' + esc(row.id) + '">Lihat Detail</button></article>';
    }

    function renderRisks(rows) {
        rows = rows || [];
        document.getElementById('ccRiskCount').textContent = rows.length + ' prioritas';
        document.getElementById('ccRisks').innerHTML = rows.length
            ? rows.map(riskHtml).join('')
            : '<div class="cc-empty">Tidak ada risiko penting yang terdeteksi.</div>';
    }

    function renderContracts(rows) {
        rows = rows || [];
        document.getElementById('ccContracts').innerHTML = rows.length ? rows.map(function (row) {
            var condition = row.days < 0 ? Math.abs(row.days) + ' hari terlambat' : row.days + ' hari lagi';
            return '<article class="cc-contract-item"><div><div class="cc-item-title">' + esc(row.ppbj_no) + '</div>' +
                '<div class="cc-item-sub">' + esc(row.uraian) + ' · ' + esc(row.vendor) + '</div></div>' +
                '<div class="cc-deadline ' + esc(row.level) + '">' + esc(condition) + '<br>' + esc(row.deadline) + '</div></article>';
        }).join('') : '<div class="cc-empty">Tidak ada kontrak kritis dalam 30 hari.</div>';
    }

    function renderTrend(rows) {
        rows = rows || [];
        var maximum = Math.max.apply(null, rows.map(function (row) { return Number(row.total) || 0; }).concat([1]));
        document.getElementById('ccTrend').innerHTML = rows.map(function (row) {
            var height = Math.max(6, Math.round((Number(row.total) || 0) / maximum * 112));
            return '<div class="cc-bar-wrap"><span class="cc-bar-value">' + esc(row.total) + '</span>' +
                '<div class="cc-bar" style="height:' + height + 'px"></div>' +
                '<span class="cc-bar-label">' + esc(String(row.month_no).padStart(2, '0') + '/' + row.year_no) + '</span></div>';
        }).join('');
    }

    function renderOverview(data) {
        document.getElementById('ccUpdated').textContent = data.generated_at + ' WIB';
        renderStats(data.stats);
        renderFlow(data.flow);
        renderRisks(data.risks);
        renderContracts(data.contracts);
        renderTrend(data.monthly);
    }

    function readOverviewCache() {
        try {
            var cached = JSON.parse(sessionStorage.getItem(overviewCacheKey) || 'null');
            return cached && Date.now() - cached.savedAt < overviewCacheLifetime ? cached.data : null;
        } catch (error) {
            return null;
        }
    }

    function writeOverviewCache(data) {
        try {
            sessionStorage.setItem(overviewCacheKey, JSON.stringify({ savedAt: Date.now(), data: data }));
        } catch (error) {
            // Cache browser bersifat opsional dan tidak boleh mengganggu halaman.
        }
    }

    function loadOverview(force) {
        var refreshButton = document.getElementById('ccRefresh');
        if (!force) {
            var cached = readOverviewCache();
            if (cached) {
                renderOverview(cached);
                return Promise.resolve(cached);
            }
        }

        setLoading(refreshButton, true);
        return fetchJson(urls.overview + (force ? '?refresh=1' : ''))
            .then(function (data) {
                renderOverview(data);
                writeOverviewCache(data);
                return data;
            })
            .catch(function (error) { showError(error.message); })
            .finally(function () { setLoading(refreshButton, false); });
    }

    function resultDetailsHtml(details) {
        if (!details || !details.length) return '';
        return '<details class="cc-result-details"><summary>Lihat data PPBJ lengkap (' + esc(details.length) + ' field)</summary>' +
            '<dl>' + details.map(function (detail) {
                return '<div><dt>' + esc(detail.label) + '</dt><dd>' + esc(detail.value) + '</dd></div>';
            }).join('') + '</dl></details>';
    }

    function resultHtml(row) {
        return '<article class="cc-result-item"><div><div class="cc-item-title">' + esc(row.ppbj_no) + ' · ' + esc(row.uraian) + '</div>' +
            '<div class="cc-item-sub">' + esc(row.portofolio) + ' · ' + esc(row.buyer) + ' · ' + esc(row.vendor) + '</div>' +
            '<div class="cc-result-values"><span class="cc-pill">PR ' + esc(row.nilai_pr_label) + '</span>' +
            '<span class="cc-pill">SP ' + esc(row.nilai_sp_label) + '</span><span class="cc-pill">Progress ' + esc(row.progress) + '%</span>' +
            (row.matched_on ? '<span class="cc-pill cc-pill-match">Cocok di ' + esc(row.matched_on) + (row.matched_value ? ': ' + esc(row.matched_value) : '') + '</span>' : '') + '</div>' +
            resultDetailsHtml(row.details) + '</div>' +
            '<button class="cc-open" data-journey="' + esc(row.id) + '">Digital Passport</button></article>';
    }

    function showResults(title, summary, rows) {
        document.getElementById('ccResultsTitle').textContent = title;
        document.getElementById('ccResultsSummary').textContent = summary || '';
        document.getElementById('ccResults').innerHTML = rows && rows.length
            ? rows.map(resultHtml).join('')
            : '<div class="cc-empty">Tidak ada data yang cocok.</div>';
        openModal('ccResultsModal');
    }

    function doSearch() {
        var input = document.getElementById('ccSearchInput');
        var query = input.value.trim();
        var button = document.getElementById('ccSearchButton');
        if (!query) return input.focus();
        setLoading(button, true);
        fetchJson(urls.search + '?q=' + encodeURIComponent(query))
            .then(function (data) {
                var summary = data.detected_value_label
                    ? 'Nilai terdeteksi: ' + data.detected_value_label + ' · ' + data.count + ' data ditemukan'
                    : data.count + ' data ditemukan';
                showResults('Hasil untuk “' + query + '”', summary, data.results);
            })
            .catch(function (error) { showError(error.message); })
            .finally(function () { setLoading(button, false); });
    }

    function doAsk(question) {
        var input = document.getElementById('ccAskInput');
        var query = (question || input.value).trim();
        var button = document.getElementById('ccAskButton');
        if (!query) return input.focus();
        input.value = query;
        setLoading(button, true);
        fetchJson(urls.ask, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: query })
        }).then(function (data) {
            showResults('Jawaban SIMONPR', data.answer, data.results);
        }).catch(function (error) {
            showError(error.message);
        }).finally(function () {
            setLoading(button, false);
        });
    }

    function stageHtml(stage) {
        return '<div class="cc-stage ' + esc(stage.state) + '">' + (stage.done ? '✓ ' : '') + esc(stage.label) +
            (stage.date_label ? '<span class="cc-stage-date">' + esc(stage.date_label) + '</span>' : '') + '</div>';
    }

    function timelineHtml(rows, emptyMessage) {
        return rows && rows.length ? rows.map(function (row) {
            return '<div class="cc-timeline-item"><strong>' + esc(row.title) + '</strong><span>' +
                esc(row.description || row.actor || '') + (row.date ? ' · ' + esc(row.date) : '') +
                (row.reminder ? ' · Reminder ' + esc(row.reminder) : '') + '</span></div>';
        }).join('') : '<div class="cc-empty">' + esc(emptyMessage) + '</div>';
    }

    function safeUrl(value) {
        if (!value) return '';

        try {
            var url = new URL(String(value), window.location.origin);
            return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
        } catch (error) {
            return '';
        }
    }

    function archiveDocumentHtml(document, index) {
        var previewUrl = safeUrl(document.preview_url || document.download_url);
        var downloadUrl = safeUrl(document.download_url);
        var location = document.location && document.location.label ? document.location.label : '';
        var metadata = [document.type, document.date || document.uploaded_at, location].filter(Boolean);
        var actions = '';

        if (previewUrl) {
            actions += '<a class="cc-archive-action" href="' + esc(previewUrl) + '" target="_blank" rel="noopener noreferrer">Buka</a>';
        }
        if (downloadUrl && downloadUrl !== previewUrl) {
            actions += '<a class="cc-archive-action cc-archive-action-secondary" href="' + esc(downloadUrl) + '" target="_blank" rel="noopener noreferrer">Unduh</a>';
        }

        return '<article class="cc-archive-item"><div class="cc-archive-icon" aria-hidden="true">' + (index + 1) + '</div>' +
            '<div class="cc-archive-copy"><strong>' + esc(document.name || ('Dokumen ' + (index + 1))) + '</strong>' +
            (metadata.length ? '<span>' + esc(metadata.join(' · ')) + '</span>' : '<span>Lampiran digital</span>') + '</div>' +
            '<div class="cc-archive-actions">' + (actions || '<span class="cc-archive-no-link">Tautan belum tersedia</span>') + '</div></article>';
    }

    function renderArchivePanel(panel, archive, record) {
        var documents = Array.isArray(archive.documents) ? archive.documents : [];
        var state = archive.state || (documents.length ? 'available' : 'empty');
        var count = Number(archive.document_count);
        if (!Number.isFinite(count)) count = documents.length;
        count = Math.max(count, documents.length);

        var title = count > 0 ? count + ' dokumen arsip ditemukan' : 'Belum ada arsip atau lampiran';
        var message = archive.message || (count > 0
            ? 'Dokumen untuk ' + record.ppbj_no + ' siap dibuka.'
            : 'Belum ada dokumen yang terhubung dengan ' + record.ppbj_no + '.');
        var body = '';

        if (state === 'available' && documents.length) {
            body = '<div class="cc-archive-list">' + documents.map(archiveDocumentHtml).join('') + '</div>';
        } else if (state === 'unavailable' || state === 'failed' || state === 'unconfigured') {
            title = state === 'unconfigured' ? 'Koneksi arsip belum dikonfigurasi' : 'Sistem arsip belum dapat dihubungi';
            body = '<div class="cc-archive-notice is-warning"><div><strong>Data pengadaan tetap aman.</strong>' +
                '<span>Silakan coba kembali. Pemeriksaan arsip dijalankan terpisah agar Command Center tetap cepat.</span></div></div>';
        } else {
            body = '<div class="cc-archive-notice"><div><strong>Belum ada arsip atau lampiran untuk PR ini.</strong>' +
                '<span>Lampiran dapat ditambahkan dari Management PPBJ, Penomoran SP, atau Penomoran SPPH.</span></div></div>';
        }

        panel.hidden = false;
        panel.dataset.state = state;
        panel.innerHTML = '<div class="cc-archive-head"><div><span class="cc-eyebrow">ARSIP &amp; LAMPIRAN</span>' +
            '<h3>' + esc(title) + '</h3><p>' + esc(message) + '</p></div>' +
            '<span class="cc-archive-count">' + esc(count) + ' dokumen</span></div>' + body;
    }

    function renderArchiveLoading(panel) {
        panel.hidden = false;
        panel.dataset.state = 'loading';
        panel.innerHTML = '<div class="cc-archive-loading"><span class="cc-archive-spinner" aria-hidden="true"></span>' +
            '<div><strong>Memeriksa Sistem Arsip…</strong><span>Hanya data lampiran PR ini yang dimuat.</span></div></div>';
    }

    function openJourney(id) {
        closeModals();
        openModal('ccJourneyModal');
        var host = document.getElementById('ccJourney');
        host.innerHTML = '<div class="cc-empty">Menyiapkan digital passport…</div>';

        fetchJson(urls.journey + '/' + encodeURIComponent(id)).then(function (data) {
            var record = data.record;
            host.innerHTML = '<div class="cc-journey-head"><div><span class="cc-eyebrow">DIGITAL PASSPORT PENGADAAN</span>' +
                '<h2>' + esc(record.ppbj_no) + '</h2><p>' + esc(record.uraian) + '</p><div class="cc-result-values">' +
                '<span class="cc-pill">' + esc(record.registration) + '</span><span class="cc-pill">' + esc(record.vendor) + '</span>' +
                '<span class="cc-pill">' + esc(record.nilai_sp_label) + '</span></div><div style="margin-top:10px;display:flex;gap:7px;flex-wrap:wrap">' +
                '<a class="cc-button cc-button-light" href="' + esc(data.tracking_url) + '" target="_blank">Tracking Publik</a>' +
                '<button class="cc-button cc-button-ghost" id="ccArchiveButton" aria-controls="ccArchivePanel">Cek Arsip</button></div></div>' +
                '<img class="cc-qr" src="' + esc(data.qr_url) + '" alt="QR Digital Passport"></div>' +
                '<div class="cc-stage-track">' + (data.stages || []).map(stageHtml).join('') + '</div>' +
                '<section class="cc-archive-panel" id="ccArchivePanel" aria-live="polite" hidden></section>' +
                '<div class="cc-journey-grid"><section><span class="cc-eyebrow">TRACKING REAL</span><div class="cc-timeline">' +
                timelineHtml(data.real_tracking, 'Belum ada tracking real.') + '</div></section><section><span class="cc-eyebrow">AUDIT REPLAY</span>' +
                '<div class="cc-timeline">' + timelineHtml(data.audit, 'Belum ada catatan audit.') + '</div></section></div>';

            var archiveButton = document.getElementById('ccArchiveButton');
            if (archiveButton) archiveButton.addEventListener('click', function () {
                var archivePanel = document.getElementById('ccArchivePanel');
                if (!archivePanel) return;

                if (archiveCache[data.archive_url]) {
                    renderArchivePanel(archivePanel, archiveCache[data.archive_url], record);
                    return;
                }

                renderArchiveLoading(archivePanel);
                setLoading(archiveButton, true);
                fetchJson(data.archive_url).then(function (archive) {
                    if (archive.state === 'available' || archive.state === 'empty' || archive.state === 'unconfigured') {
                        archiveCache[data.archive_url] = archive;
                    }
                    renderArchivePanel(archivePanel, archive, record);
                    var count = Number(archive.document_count) || (archive.documents || []).length;
                    archiveButton.dataset.label = count > 0 ? 'Arsip (' + count + ')' : 'Cek Arsip';
                }).catch(function (error) {
                    renderArchivePanel(archivePanel, {
                        state: 'unavailable',
                        document_count: 0,
                        message: error.message
                    }, record);
                }).finally(function () {
                    setLoading(archiveButton, false);
                });
            });
        }).catch(function (error) {
            host.innerHTML = '<div class="cc-empty">' + esc(error.message) + '</div>';
        });
    }

    document.querySelectorAll('[data-close-modal]').forEach(function (element) { element.addEventListener('click', closeModals); });
    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        closeModals();
        if (!document.fullscreenElement && document.body.classList.contains('cc-fullscreen')) {
            syncFullscreenUi(false);
        }
    });
    document.addEventListener('click', function (event) {
        var journeyButton = event.target.closest('[data-journey]');
        if (journeyButton) openJourney(journeyButton.getAttribute('data-journey'));
    });
    document.getElementById('ccSearchButton').addEventListener('click', doSearch);
    document.getElementById('ccSearchInput').addEventListener('keydown', function (event) { if (event.key === 'Enter') doSearch(); });
    document.getElementById('ccAskButton').addEventListener('click', function () { doAsk(); });
    document.getElementById('ccAskInput').addEventListener('keydown', function (event) { if (event.key === 'Enter') doAsk(); });
    document.querySelectorAll('[data-question]').forEach(function (button) {
        button.addEventListener('click', function () { doAsk(button.dataset.question); });
    });
    document.getElementById('ccRefresh').addEventListener('click', function () {
        try { sessionStorage.removeItem(overviewCacheKey); } catch (error) { /* opsional */ }
        loadOverview(true);
    });
    var fullscreenButton = document.getElementById('ccFullscreen');

    function syncFullscreenUi(active) {
        document.body.classList.toggle('cc-fullscreen', active);
        fullscreenButton.setAttribute('aria-pressed', active ? 'true' : 'false');
        fullscreenButton.textContent = active ? '↙ Keluar Layar Penuh' : '⛶ Layar Penuh';
    }

    fullscreenButton.addEventListener('click', function () {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(function () { syncFullscreenUi(false); });
            return;
        }

        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(function () { syncFullscreenUi(false); });
            return;
        }

        syncFullscreenUi(!document.body.classList.contains('cc-fullscreen'));
    });

    document.addEventListener('fullscreenchange', function () {
        syncFullscreenUi(Boolean(document.fullscreenElement));
    });
    window.addEventListener('pageshow', function () {
        syncFullscreenUi(Boolean(document.fullscreenElement));
    });
    syncFullscreenUi(Boolean(document.fullscreenElement));

    // Tidak ada polling otomatis. Data dimuat sekali dan dapat diperbarui manual.
    loadOverview(false);
}());
