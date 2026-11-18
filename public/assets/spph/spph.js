// ════════════════════════════════════════════════════════════
        // CONFIG
        // ════════════════════════════════════════════════════════════
        const SPPH_PAGE_CONFIG = window.SPPH_PAGE_CONFIG || {};
        const ONBOARDING_SEEN = Boolean(SPPH_PAGE_CONFIG.onboardingSeen);
        const CHECK_URL = SPPH_PAGE_CONFIG.checkUrl;
        const SUGGEST_URL = SPPH_PAGE_CONFIG.suggestUrl;
        const POLL_URL = SPPH_PAGE_CONFIG.pollUrl;
        const PRESENCE_URL = SPPH_PAGE_CONFIG.presenceUrl;
        const PRES_START = SPPH_PAGE_CONFIG.presenceStartUrl;
        const PRES_STOP = SPPH_PAGE_CONFIG.presenceStopUrl;
        const ITEMS_BASE = '/spph/';
        const PPBJ_OPTIONS_URL = SPPH_PAGE_CONFIG.ppbjOptionsUrl;
        const PPBJ_CHECK_URL = SPPH_PAGE_CONFIG.ppbjCheckUrl;
        const SPPH_INDEX_URL = SPPH_PAGE_CONFIG.indexUrl || '/spph';
        const SATUANS = SPPH_PAGE_CONFIG.satuans || [];
        const SATUAN_STORE_URL = SPPH_PAGE_CONFIG.satuanStoreUrl;
        const ADD_SATUAN_VALUE = '__add_satuan__';
        const VENDOR_USAGE_STATS_URL = SPPH_PAGE_CONFIG.vendorUsageStatsUrl;


        let lastId = Number(SPPH_PAGE_CONFIG.lastId || 0);
        let searchTimer = null;
        let secureDeleteSearchSnapshot = null;
        let modalOpen = false, addIdx = 0, editIdx = 5000;
        let currentPrMode = 'ppbj', currentEditPrMode = 'ppbj';
        let editModalLoadSerial = 0;
        const IS_FIRST = Boolean(SPPH_PAGE_CONFIG.firstPage);
        const HAS_FILTER = Boolean(SPPH_PAGE_CONFIG.hasFilter);

        // ════════════════════════════════════════════════════════════
        /* BEGIN SPPH LOOKUP READS */
        const spphLookupRequests = new Map(), spphLookupCleanups = new Map();
        let spphSuggestionSerial = 0;
        function cancelSpphLookup(key) { spphLookupRequests.get(key)?.cancel(); }
        function cancelSpphFormLookups() {
            spphLookupCleanups.forEach(cancel => cancel());
            Array.from(spphLookupRequests.values()).forEach(request => request.cancel());
        }
        function appendSpphLookupRetry(container, retry) {
            if (!container) return;
            const button = document.createElement('button');
            button.type = 'button'; button.className = 'ml-2 text-xs font-semibold underline text-blue-600 dark:text-blue-300';
            button.textContent = 'Cek ulang'; button.addEventListener('click', retry); container.appendChild(button);
        }
        async function readSpphLookup(key, rawUrl) {
            const url = new URL(rawUrl, window.location.origin);
            if (url.origin !== window.location.origin) throw new Error('Alamat pemeriksaan tidak valid. Muat ulang halaman.');
            cancelSpphLookup(key);
            const controller = new AbortController();
            let rejectCancel, timer;
            const cancelled = new Promise((resolve, reject) => { rejectCancel = reject; });
            const request = { timedOut: false, cancel() {
                clearTimeout(timer); controller.abort();
                if (spphLookupRequests.get(key) === request) spphLookupRequests.delete(key);
                rejectCancel(new DOMException('Pemeriksaan dibatalkan.', 'AbortError'));
            }};
            spphLookupRequests.set(key, request);
            timer = setTimeout(() => { request.timedOut = true; request.cancel(); }, 20000);
            try {
                return await Promise.race([cancelled, (async () => {
                    const response = await fetch(url.href, { signal: controller.signal, cache: 'no-store', credentials: 'same-origin',
                        headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });
                    if (controller.signal.aborted) throw new DOMException('Pemeriksaan dibatalkan.', 'AbortError');
                    if ([401, 419].includes(response.status) || response.redirected) throw Object.assign(new Error('Sesi perlu diperbarui. Muat ulang halaman sebelum memeriksa kembali.'), { status: response.redirected ? 401 : response.status });
                    if (response.status === 429) throw Object.assign(new Error('Terlalu banyak pemeriksaan. Tunggu sebentar, lalu coba lagi.'), { status: 429 });
                    if (!response.ok || !response.headers.get('Content-Type')?.toLowerCase().includes('application/json')) throw Object.assign(new Error('Pemeriksaan belum berhasil. Periksa nomor dan tanggal, lalu coba lagi.'), { status: response.status });
                    const data = await response.json();
                    if (controller.signal.aborted || spphLookupRequests.get(key) !== request) throw new DOMException('Pemeriksaan dibatalkan.', 'AbortError');
                    return data;
                })()]);
            } catch (error) {
                if (request.timedOut) throw new Error('Pemeriksaan terlalu lama. Silakan coba lagi.');
                if (['TypeError', 'SyntaxError'].includes(error.name)) throw new Error('Respons pemeriksaan belum lengkap. Coba lagi setelah koneksi stabil.');
                throw error;
            } finally {
                clearTimeout(timer);
                if (spphLookupRequests.get(key) === request) spphLookupRequests.delete(key);
            }
        }
        window.addEventListener('pagehide', cancelSpphFormLookups);
        document.addEventListener('visibilitychange', () => { if (document.hidden) cancelSpphFormLookups(); });
        /* END SPPH LOOKUP READS */

        // HELPERS
        // ════════════════════════════════════════════════════════════
        function escapedHtml(str) {
            return String(str || '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        function formatPackageMoney(value) {
            return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(Number(value || 0));
        }

        function renderPpbjPackageSummary(data) {
            const items = Array.isArray(data.package_items) ? data.package_items : [];
            if (!items.length) {
                return `<div><strong>Uraian:</strong> ${escapedHtml(data.uraian || '-')}</div>` +
                    `${data.portofolio ? `<div><strong>Portofolio:</strong> ${escapedHtml(data.portofolio)}</div>` : ''}` +
                    `${data.buyer ? `<div><strong>Buyer:</strong> ${escapedHtml(data.buyer)}</div>` : ''}`;
            }

            let html = `<div class="rounded-xl border border-violet-200 bg-violet-50/80 p-3 dark:border-violet-800 dark:bg-violet-950/30">` +
                `<div class="mb-2 flex flex-wrap items-center justify-between gap-2">` +
                `<strong>Paket ${items.length} PPBJ</strong>` +
                `<span class="rounded-full bg-violet-600 px-2.5 py-1 text-xs font-bold text-white">Total estimasi Rp ${formatPackageMoney(data.total_sebelum_ppn)}</span>` +
                `</div><div class="space-y-2">`;

            items.forEach((item, index) => {
                html += `<div class="rounded-lg border border-violet-100 bg-white/90 p-2 dark:border-slate-700 dark:bg-slate-900/70">` +
                    `<div class="font-mono text-xs font-bold text-violet-700 dark:text-violet-300">${index + 1}. ${escapedHtml(item.ppbj_no)}</div>` +
                    `<div class="text-xs text-slate-700 dark:text-slate-200">${escapedHtml(item.uraian || 'Tanpa uraian')}</div>` +
                    `<div class="mt-1 text-[11px] text-slate-500 dark:text-slate-400">${escapedHtml(item.portofolio || 'Tanpa portofolio')} · ${escapedHtml(item.buyer || 'Buyer belum ditentukan')} · Rp ${formatPackageMoney(item.nilai)}</div>` +
                    `</div>`;
            });

            return html + `</div><div class="mt-2 text-[11px] font-semibold text-violet-700 dark:text-violet-300">PPBJ pertama menjadi referensi utama dokumen.</div></div>`;
        }

        function applyPpbjDescription($field, $badge, data) {
            if (!$field || !$field.length) return;
            const candidate = String(data.merged_description || data.uraian || '').trim();
            if (!candidate) return;

            const current = String($field.val() || '').trim();
            const previousAutoValue = String($field.data('ppbjAutoValue') || '').trim();
            if (!current || current === previousAutoValue) {
                $field.val(candidate).data('ppbjAutoValue', candidate);
                showDeskripsiBadge($badge, candidate);
            } else {
                showDeskripsiBadge($badge, candidate, true);
            }
        }

        function showDeskripsiBadge($badge, uraian, isExisting = false) {
            if (!$badge || !$badge.length) return;
            const truncated = uraian.length > 50 ? uraian.substring(0, 50) + '...' : uraian;
            const label = isExisting ? 'ℹ️ Deskripsi sudah ada' : '✨ Auto-filled dari PPBJ';
            $badge.html(
                `<span class="deskripsi-autofill-badge">` +
                `<span>${label}: "${escapedHtml(truncated)}"</span>` +
                `<button type="button" onclick="clearDeskripsiAutoFill('${$badge.attr('id')}')" title="Hapus badge">✕</button>` +
                `</span>`
            ).removeClass('hidden');
        }

        function clearDeskripsiAutoFill(badgeId) {
            const $badge = $('#' + badgeId);
            if ($badge && $badge.length) $badge.addClass('hidden').html('');
        }

        // ════════════════════════════════════════════════════════════
        // UPDATE PR FINAL VALUE
        // ════════════════════════════════════════════════════════════
        function updatePrFinalValue() {
            const selected = $('#ppbjSelect').val() || [];
            const val = currentPrMode === 'ppbj'
                ? (Array.isArray(selected) ? (selected[0] || '') : selected)
                : ($('#nomorPrManual').val() || '').trim();
            $('#nomorPrFinal').val(val);
        }

        function updateEditPrFinalValue() {
            const selected = $('#editPpbjSelect').val() || [];
            const val = currentEditPrMode === 'ppbj'
                ? (Array.isArray(selected) ? (selected[0] || '') : selected)
                : ($('#editNomorPrManual').val() || '').trim();
            $('#editNomorPrFinal').val(val);
        }

        // ════════════════════════════════════════════════════════════
        // PR MODE TOGGLE
        // ════════════════════════════════════════════════════════════
        function setPrMode(mode, reset = false) {
            const previousMode = currentPrMode;
            currentPrMode = mode;
            const $ppbjBox = $('#ppbjModeBox');
            const $manualBox = $('#manualModeBox');
            const $btnPpbj = $('#btnPpbjMode');
            const $btnManual = $('#btnManualMode');
            const $info = $('#ppbjInfo');
            const $status = $('#ppbjStatus');
            const $badge = $('#addDeskripsiBadge');
            const $deskripsi = $('#addDeskripsi');

            if (mode === 'ppbj') {
                $ppbjBox.removeClass('hidden');
                $manualBox.addClass('hidden');
                $btnPpbj.addClass('active-mode');
                $btnManual.removeClass('active-mode');
                $('#nomorPrType').val('ppbj');
                $('#ppbjSelect').prop('disabled', false).trigger('change.select2');
                if (reset) {
                    $('#nomorPrManual').val('');
                    $('#ppbjSelect').val(null).trigger('change');
                    $deskripsi.val('').removeData('ppbjAutoValue');
                    $badge.addClass('hidden').html('');
                    $info.addClass('hidden');
                    $status.html('');
                } else if (previousMode !== 'ppbj' && $('#ppbjSelect').val()?.length) {
                    $('#ppbjSelect').trigger('change');
                }
                updatePrFinalValue();
            } else {
                $ppbjBox.addClass('hidden');
                $manualBox.removeClass('hidden');
                $btnPpbj.removeClass('active-mode');
                $btnManual.addClass('active-mode');
                $info.addClass('hidden');
                $status.html('');
                $('#nomorPrType').val('manual');

                $('#ppbjSelect').prop('disabled', true).trigger('change.select2');
                if (reset) $('#nomorPrManual').val('');
                updatePrFinalValue();
            }
        }

        function setEditPrMode(mode, reset = false) {
            if (mode !== currentEditPrMode || reset) {
                cancelSpphLookup('edit-ppbj'); cancelSpphLookup('ppbj-select:editPpbjInfo');
                document.getElementById('editForm').dataset.spphPpbjState = 'ready';
                $('#editPpbjStatus').text('');
            }
            const previousMode = currentEditPrMode;
            currentEditPrMode = mode;
            const $ppbjBox = $('#editPpbjModeBox');
            const $manualBox = $('#editManualModeBox');
            const $btnPpbj = $('#editBtnPpbjMode');
            const $btnManual = $('#editBtnManualMode');
            const $info = $('#editPpbjInfo');
            const $status = $('#editPpbjStatus');
            const $badge = $('#editDeskripsiBadge');
            const $deskripsi = $('#editDeskripsi');

            if (mode === 'ppbj') {
                $ppbjBox.removeClass('hidden');
                $manualBox.addClass('hidden');
                $btnPpbj.addClass('active-mode');
                $btnManual.removeClass('active-mode');
                $('#editNomorPrType').val('ppbj');
                $('#editPpbjSelect').prop('disabled', false).trigger('change.select2');
                if (reset) {
                    $('#editNomorPrManual').val('');
                    $('#editPpbjSelect').val(null).trigger('change');
                    $deskripsi.val('').removeData('ppbjAutoValue');
                    $badge.addClass('hidden').html('');
                    $info.addClass('hidden');
                    $status.html('');
                } else if (previousMode !== 'ppbj' && $('#editPpbjSelect').val()?.length) {
                    $('#editPpbjSelect').trigger('change');
                }
                updateEditPrFinalValue();
            } else {
                $ppbjBox.addClass('hidden');
                $manualBox.removeClass('hidden');
                $btnPpbj.removeClass('active-mode');
                $btnManual.addClass('active-mode');
                $('#editNomorPrType').val('manual');

                $('#editPpbjSelect').prop('disabled', true).trigger('change.select2');
                if (reset) $('#editNomorPrManual').val('');
                updateEditPrFinalValue();
            }
        }

        // ════════════════════════════════════════════════════════════
        // PPBJ SELECT2 (✅ SCOPE SUDAH DIPERBAIKI)
        // ════════════════════════════════════════════════════════════
        function initPpbjSelect2(selector, infoBoxId, statusId, contentId, onChangeCb, deskripsiFieldId, badgeContainerId) {
            const $select = $(selector);
            const modePrefix = selector.includes('edit') ? 'edit' : 'add';
            let requestSerial = 0;

            $select.select2({
                placeholder: $select.data('placeholder') || 'Pilih No. PPBJ...',
                allowClear: true,
                width: '100%',
                closeOnSelect: false,
                maximumSelectionLength: 20,
                minimumInputLength: 0,
                ajax: {
                    url: PPBJ_OPTIONS_URL,
                    dataType: 'json',
                    delay: 300,
                    data: p => ({ q: p.term || '' }),
                    processResults: d => ({ results: d.results }),
                    cache: true
                },
                templateResult: item => {
                    if (item.loading) return 'Mencari...';
                    const $c = $('<div>').append($('<strong class="font-mono">').text(item.id));
                    if (item.uraian) $c.append($('<br>')).append($('<small>').text(item.uraian).css({ color: '#6b7280' }));
                    return $c;
                },
                templateSelection: item => {
                    if (!item.id) return item.text || 'Pilih No. PPBJ...';
                    return $('<span class="font-mono font-semibold">').text(item.id);
                }
            });

            const requestKey = 'ppbj-select:' + infoBoxId;
            const checkSelection = async () => {
                const requestId = ++requestSerial, generation = editModalLoadSerial;
                cancelSpphLookup(requestKey);
                const selected = $select.val(), selectedValues = Array.isArray(selected) ? selected.filter(Boolean) : (selected ? [selected] : []);
                const selectionKey = JSON.stringify(selectedValues);
                const $info = $('#' + infoBoxId), $status = $('#' + statusId), $content = $('#' + contentId);
                const $deskripsi = deskripsiFieldId ? $('#' + deskripsiFieldId) : null, $badge = badgeContainerId ? $('#' + badgeContainerId) : null;
                const form = document.getElementById('editForm');
                const current = () => requestId === requestSerial && JSON.stringify($select.val() || []) === selectionKey
                    && (modePrefix === 'edit' ? currentEditPrMode === 'ppbj' && generation === editModalLoadSerial : currentPrMode === 'ppbj')
                    && !document.getElementById(modePrefix === 'edit' ? 'editModal' : 'addModal').classList.contains('hidden');
                if (onChangeCb) onChangeCb(selectedValues);
                if (modePrefix === 'edit') { cancelSpphLookup('edit-ppbj'); form.dataset.spphPpbjState = selectedValues.length ? 'loading' : 'ready'; }
                if (!selectedValues.length) {
                    $info.addClass('hidden'); $status.text(''); if ($badge) $badge.addClass('hidden').html('');
                    return;
                }
                $status.text('Memeriksa referensi PR…'); $info.addClass('hidden');
                try {
                    const url = new URL(PPBJ_CHECK_URL, window.location.origin);
                    selectedValues.forEach(number => url.searchParams.append('ppbj_nos[]', number));
                    const data = await readSpphLookup(requestKey, url.href);
                    if (!current()) return;
                    if (!validSpphPpbjResponse(data)) throw new Error('Referensi PR belum lengkap. Silakan coba lagi.');
                    if (['available', 'already_linked'].includes(data.status)) {
                        $status.text((data.status === 'available' ? '✅ ' : '⚠️ ') + (data.message || 'Referensi PPBJ berhasil diperiksa.'));
                        $info.removeClass('hidden'); $content.html(renderPpbjPackageSummary(data));
                        applyPpbjDescription($deskripsi, $badge, data);
                        if (modePrefix === 'edit') form.dataset.spphPpbjState = 'ready';
                    } else {
                        $status.text('❌ ' + (data.message || 'Pilih referensi PPBJ yang tersedia.'));
                        if ($badge) $badge.addClass('hidden').html('');
                        if (modePrefix === 'edit') form.dataset.spphPpbjState = 'error';
                    }
                } catch (error) {
                    if (!current()) return;
                    if (modePrefix === 'edit') form.dataset.spphPpbjState = 'error';
                    $status.text('❌ ' + (error.name === 'AbortError' ? 'Pemeriksaan PR tertunda. Silakan cek ulang.' : error.message));
                    $info.addClass('hidden'); appendSpphLookupRetry(document.getElementById(statusId), checkSelection);
                }
            };
            $select.off('change.ppbjAutoFill').on('change.ppbjAutoFill', checkSelection);
        }

        // ════════════════════════════════════════════════════════════
        // FILTER HELPERS
        // ════════════════════════════════════════════════════════════
        function getQS() {
            const p = new URLSearchParams();
            const q = document.getElementById('searchInput').value.trim();
            const pic = document.getElementById('filterPic').value;
            const vendor = document.getElementById('filterVendor').value;
            const d = document.getElementById('dariInput').value;
            const s = document.getElementById('sampaiInput').value;
            if (q) p.set('search', q); if (pic) p.set('pic', pic); if (vendor) p.set('vendor', vendor); if (d) p.set('dari', d); if (s) p.set('sampai', s);
            return p.toString();
        }
        function doSearch() { window.ProcurementFilters.navigate('/spph', getQS()); }
        function doExport() { window.ProcurementFilters.navigate('/spph/export', getQS()); }
        function clearSearch() { window.ProcurementFilters.clear('searchInput'); }
        function clearPic() { window.ProcurementFilters.clear('filterPic'); }
        function clearVendor() { window.ProcurementFilters.clear('filterVendor'); }
        function clearDate() { window.ProcurementFilters.clear(['dariInput', 'sampaiInput']); }
        function setQuickDate(t) {
            const d = document.getElementById('dariInput'), s = document.getElementById('sampaiInput'), n = new Date(), y = n.getFullYear(), m = String(n.getMonth() + 1).padStart(2, '0'), dd = String(n.getDate()).padStart(2, '0');
            if (t === 'today') { d.value = `${y}-${m}-${dd}`; s.value = `${y}-${m}-${dd}`; }
            else if (t === 'month') { d.value = `${y}-${m}-01`; s.value = `${y}-${m}-${new Date(y, n.getMonth() + 1, 0).getDate()}`; }
            else if (t === 'year') { d.value = `${y}-01-01`; s.value = `${y}-12-31`; }
            window.ProcurementFilters.markDirty();
        }
        function resetFilters() { window.ProcurementFilters.reset(); }

        // ════════════════════════════════════════════════════════════
        // MODAL
        // ════════════════════════════════════════════════════════════
        function openModal(id) { document.getElementById(id).classList.remove('hidden'); document.getElementById(id).classList.add('flex'); document.body.style.overflow = 'hidden'; modalOpen = true; startHb(); }
        function closeModal(id) { if (id === 'addModal' && spphInlineVendorOperation) return; cancelSpphFormLookups(); document.getElementById(id).classList.add('hidden'); document.getElementById(id).classList.remove('flex'); document.body.style.overflow = ''; modalOpen = false; stopHb(); }

        function openAddModal() {
            if (spphInlineVendorOperation) return;
            cancelSpphFormLookups();
            addIdx = 0;
            document.getElementById('addRows').innerHTML = '';
            addRow('add');
            document.getElementById('addForm').reset();
            document.getElementById('nomorStatus').innerHTML = '';
            $('#vendorSelect').val(null).trigger('change');
            renderVendorUsagePanel('vendorSelect', 'vendorUsagePanel');
            ensureVendorUsageStats();
            document.getElementById('newVendorBoxSpph')?.classList.add('hidden');
            resetNewVendorSpphForm();

            $('#addDeskripsi').val('');
            $('#addDeskripsiBadge').addClass('hidden').html('');

            setPrMode('ppbj', true);
            $('#ppbjInfo').addClass('hidden');
            $('#ppbjStatus').html('');
            $('#nomorPrFinal').val('');
            $('#nomorPrType').val('ppbj');

            for (let k in rtSavedSel) { if (k.startsWith('rt-a-')) delete rtSavedSel[k]; }
            for (let k in sizeDebounce) { if (k.startsWith('rt-a-')) { clearTimeout(sizeDebounce[k]); delete sizeDebounce[k]; } }

            loadSuggestions();
            openModal('addModal');
        }

        async function openEditModal(id, nomor, tgl, nomorPr, vendorNames, deskripsi, pic, linkedPpbjNumbers = []) {
            if (spphInlineVendorOperation) return;
            if (!Number.isSafeInteger(Number(id)) || Number(id) <= 0) return;
            cancelSpphFormLookups();
            const editLoadId = ++editModalLoadSerial;
            const form = document.getElementById('editForm');
            form.action = '/spph/' + id;
            window.ProcurementDetails?.reset(form);
            form.dataset.spphPpbjState = 'ready'; setSpphItemsState('loading');
            document.getElementById('editId').value = id;
            document.getElementById('editNomor').value = nomor;
            document.getElementById('editTanggal').value = tgl || '';
            $('#editDeskripsi').val(deskripsi || '').removeData('ppbjAutoValue');
            $('#editDeskripsiBadge').addClass('hidden').html('');
            $('#editPpbjInfo').addClass('hidden'); $('#editPpbjStatus').text('');
            $('#editNomorPrManual').val('');
            // Seed the stored selection without issuing autofill or clearing the stored description.
            currentEditPrMode = 'ppbj'; setEditPrMode('ppbj');
            const numbers = [...new Set(Array.isArray(linkedPpbjNumbers) && linkedPpbjNumbers.length
                ? linkedPpbjNumbers.filter(Boolean).map(String)
                : (nomorPr && nomorPr !== 'null' && String(nomorPr).trim() ? [String(nomorPr)] : []))];
            const select = document.getElementById('editPpbjSelect');
            numbers.forEach(number => {
                if (!Array.from(select.options).some(option => option.value === number)) select.append(new Option(number, number, true, true));
            });
            $('#editPpbjSelect').val(numbers).trigger('change.select2'); updateEditPrFinalValue();
            const vendors = (Array.isArray(vendorNames) ? vendorNames : [vendorNames]).filter(Boolean);
            const vendorSelect = document.getElementById('editVendor');
            vendors.forEach(vendor => {
                if (!Array.from(vendorSelect.options).some(option => option.value === vendor)) vendorSelect.append(new Option(vendor, vendor, true, true));
            });
            $('#editVendor').val(vendors).trigger('change'); $('#editPic').val(pic).trigger('change');
            document.getElementById('editNomor').dispatchEvent(new Event('input'));
            editIdx = 5000;
            for (const key in rtSavedSel) if (key.startsWith('rt-e-')) delete rtSavedSel[key];
            for (const key in sizeDebounce) if (key.startsWith('rt-e-')) { clearTimeout(sizeDebounce[key]); delete sizeDebounce[key]; }
            openModal('editModal');
            ensureVendorUsageStats();
            await Promise.all([loadEditItems(id, editLoadId), numbers.length ? loadEditPpbj(id, numbers, editLoadId, Boolean(linkedPpbjNumbers?.length)) : Promise.resolve()]);
        }

        /* BEGIN SPPH EDIT READS */
        function setSpphItemsState(state) {
            document.getElementById('editForm').dataset.spphItemsState = state;
            const button = document.querySelector('#editModal .btn-add-row');
            if (button) button.disabled = state !== 'ready';
        }
        function ensureSpphEditDataReady(form) {
            if (![form.dataset.spphItemsState, form.dataset.spphPpbjState].some(state => ['loading', 'error'].includes(state))) return true;
            Swal.fire({ title: 'Data edit belum lengkap', text: 'Tunggu hingga rincian barang dan referensi PR selesai dimuat. Jika gagal, klik Cek ulang sebelum menyimpan.', icon: 'info' });
            return false;
        }
        function validSpphPpbjResponse(data) {
            return data && ['available', 'already_linked', 'manual', 'cancelled'].includes(data.status)
                && (data.message == null || typeof data.message === 'string')
                && (data.uraian == null || typeof data.uraian === 'string')
                && (data.package_items == null || Array.isArray(data.package_items));
        }
        async function loadEditPpbj(id, numbers, loadId, knownLinked = false) {
            const form = document.getElementById('editForm'), status = document.getElementById('editPpbjStatus');
            const selection = JSON.stringify(numbers);
            const current = () => loadId === editModalLoadSerial && String(document.getElementById('editId').value) === String(id)
                && !document.getElementById('editModal').classList.contains('hidden') && currentEditPrMode === 'ppbj'
                && JSON.stringify($('#editPpbjSelect').val() || []) === selection;
            if (!current()) return;
            form.dataset.spphPpbjState = 'loading'; status.textContent = 'Memeriksa referensi PR tersimpan…';
            try {
                const url = new URL(PPBJ_CHECK_URL, window.location.origin);
                numbers.forEach(number => url.searchParams.append('ppbj_nos[]', number));
                const data = await readSpphLookup('edit-ppbj', url.href);
                if (!current()) return;
                if (!validSpphPpbjResponse(data)) throw new Error('Referensi PR belum lengkap. Silakan coba lagi.');
                if (data.status === 'cancelled' || (knownLinked && data.status === 'manual')) throw new Error('Referensi PPBJ tersimpan perlu diperiksa. Pilih referensi yang sesuai atau cek ulang.');
                if (data.status === 'manual') {
                    setEditPrMode('manual'); $('#editNomorPrManual').val(numbers[0]); updateEditPrFinalValue();
                    status.textContent = 'Nomor PR tersimpan menggunakan mode manual.';
                } else {
                    status.textContent = 'Referensi PPBJ tersimpan berhasil dimuat.';
                }
                form.dataset.spphPpbjState = 'ready';
            } catch (error) {
                if (!current()) return;
                form.dataset.spphPpbjState = 'error';
                status.textContent = error.name === 'AbortError' ? 'Pemeriksaan PR tertunda. Silakan cek ulang.' : error.message;
                appendSpphLookupRetry(status, () => loadEditPpbj(id, numbers, loadId, knownLinked));
            }
        }
        async function loadEditItems(spphId, loadId = editModalLoadSerial) {
            const rows = document.getElementById('editRows');
            const current = () => loadId === editModalLoadSerial && String(document.getElementById('editId').value) === String(spphId)
                && !document.getElementById('editModal').classList.contains('hidden');
            if (!current()) return;
            setSpphItemsState('loading'); rows.textContent = 'Memuat rincian barang…';
            try {
                const data = await readSpphLookup('edit-items', `/spph/${encodeURIComponent(spphId)}/items`);
                if (!current()) return;
                if (!Array.isArray(data) || !data.every(item => item && typeof item === 'object' && !Array.isArray(item)
                    && typeof item.nama_barang === 'string'
                    && ['satuan', 'jumlah', 'tgl_pemenuhan'].every(field => item[field] == null || ['string', 'number'].includes(typeof item[field])))) throw new Error('Rincian barang belum lengkap. Silakan coba lagi.');
                rows.replaceChildren(); setSpphItemsState('ready');
                (data.length ? data : [null]).forEach(item => addRow('edit', item));
            } catch (error) {
                if (!current()) return;
                setSpphItemsState('error');
                rows.textContent = error.name === 'AbortError' ? 'Pemuatan rincian tertunda. Silakan cek ulang.' : error.message;
                appendSpphLookupRetry(rows, () => loadEditItems(spphId, loadId));
            }
        }
        /* END SPPH EDIT READS */

        function secureDeletePad(value) {
            return String(Math.max(0, Math.floor(Number(value) || 0))).padStart(2, '0');
        }

        function secureDeleteFormatDuration(seconds) {
            const safe = Math.max(0, Math.ceil(Number(seconds) || 0));
            return `${secureDeletePad(safe / 3600)}:${secureDeletePad((safe % 3600) / 60)}:${secureDeletePad(safe % 60)}`;
        }

        function secureDeleteFormatDateTime(date) {
            return new Intl.DateTimeFormat('id-ID', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'Asia/Jakarta'
            }).format(date).replace(/\./g, ':');
        }

        function secureDeleteEscapeHtml(value) {
            return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
        }

        function showSecureDeleteLockCountdown(message, retryAfter, lockedUntil = null) {
            const targetTime = lockedUntil ? new Date(lockedUntil).getTime() : Date.now() + (Number(retryAfter || 900) * 1000);

            Swal.fire({
                icon: 'error',
                title: 'Aksi dikunci sementara',
                html: `
                    <p class="text-sm leading-relaxed mb-4">${secureDeleteEscapeHtml(message || 'Terlalu banyak percobaan password salah.')}</p>
                    <div id="secureDeleteCountdown" class="secure-delete-countdown">00:15:00</div>
                    <p class="mt-3 text-xs font-semibold opacity-90">Waktu tersisa sebelum tombol hapus bisa dicoba lagi.</p>
                    <div id="secureDeleteUnlockAt" class="secure-delete-time-pill mt-3"></div>
                `,
                confirmButtonText: 'Saya mengerti',
                confirmButtonColor: '#ef4444',
                customClass: { popup: 'secure-delete-popup' },
                didOpen: () => {
                    const countdown = document.getElementById('secureDeleteCountdown');
                    const unlockAt = document.getElementById('secureDeleteUnlockAt');
                    const render = () => {
                        const remaining = Math.max(0, Math.ceil((targetTime - Date.now()) / 1000));
                        if (countdown) countdown.textContent = secureDeleteFormatDuration(remaining);
                        if (unlockAt) unlockAt.textContent = `Bisa dicoba lagi: ${secureDeleteFormatDateTime(new Date(targetTime))} WIB`;
                    };
                    render();
                    const timer = setInterval(render, 1000);
                    Swal.getPopup().dataset.secureDeleteTimer = timer;
                },
                willClose: () => {
                    const timer = Swal.getPopup()?.dataset?.secureDeleteTimer;
                    if (timer) clearInterval(Number(timer));
                }
            });
        }

        async function showLockedEditInfo(label, nomor, pic) {
            const safeNomor = nomor || '-';
            const safePic = pic || '-';
            const followUpText = `Mohon bantuan update ${label} ${safeNomor}. Data ini terkunci karena hanya pembuat/PIC (${safePic}) yang bisa melakukan edit demi menjaga audit trail.`;

            const result = await Swal.fire({
                icon: 'info',
                title: `Edit ${label} terkunci`,
                html: `
                    <div class="text-left space-y-3">
                        <div class="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-blue-900">
                            <div class="text-xs font-bold uppercase tracking-wide text-blue-600">Data</div>
                            <div class="mt-1 font-semibold">${secureDeleteEscapeHtml(safeNomor)}</div>
                        </div>
                        <div class="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                            <div class="text-xs font-bold uppercase tracking-wide text-amber-600">PIC / Pemilik data</div>
                            <div class="mt-1 font-semibold">${secureDeleteEscapeHtml(safePic)}</div>
                        </div>
                        <p class="text-sm leading-relaxed text-slate-600">
                            Untuk menjaga audit trail, edit hanya bisa dilakukan oleh pembuat data
                            atau user yang identitasnya cocok dengan PIC. Jika perlu perubahan,
                            follow up ke PIC/pembuat data agar riwayat tetap aman.
                        </p>
                    </div>
                `,
                confirmButtonText: 'Mengerti',
                showDenyButton: true,
                denyButtonText: 'Copy info follow up',
                confirmButtonColor: '#2563eb',
                denyButtonColor: '#0f172a',
                customClass: {
                    popup: 'rounded-3xl',
                    confirmButton: 'rounded-xl px-5 py-2.5 font-bold',
                    denyButton: 'rounded-xl px-5 py-2.5 font-bold'
                }
            });

            if (result.isDenied) {
                await navigator.clipboard.writeText(followUpText);
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Info follow up disalin',
                    showConfirmButton: false,
                    timer: 1800
                });
            }
        }

        async function secureDeleteRecord(label, nomor, url) {
            const operation = window.ProcurementArchive?.begin('spph', url);
            if (!operation) {
                if (!window.ProcurementArchive) await Swal.fire({icon: 'warning', title: 'Formulir perlu diperbarui', text: 'Muat ulang halaman sebelum memindahkan dokumen.'});
                return;
            }
            try {
                if (!await window.ProcurementReview.confirmDelete('spph', url) || !operation.current) return;
                const csrf = document.querySelector('meta[name="csrf-token"]')?.content || SPPH_PAGE_CONFIG.csrfToken || '';
                const searchInput = document.getElementById('searchInput'), savedSearch = searchInput?.value || '';
                secureDeleteSearchSnapshot = savedSearch;
                clearTimeout(searchTimer); document.getElementById('searchSpinner')?.classList.add('hidden');
                operation.onRelease(() => {
                    clearTimeout(searchTimer);
                    if (searchInput) searchInput.value = savedSearch;
                    document.getElementById('searchSpinner')?.classList.add('hidden'); secureDeleteSearchSnapshot = null;
                });
                let closed = false;
                const result = await Swal.fire({
                    icon: 'warning', titleText: 'Pindahkan ' + label + ' ke Sampah?',
                html: `
                    <div class="secure-delete-stack">
                    <div class="secure-delete-danger">
                        <div class="secure-delete-danger-title">⚠️ Data: ${secureDeleteEscapeHtml(nomor)}</div>
                        <p>Dokumen disembunyikan dari daftar aktif, tetapi SP lanjutan, relasi PR, dan riwayat tetap aman serta dapat dipulihkan.</p>
                    </div>
                    <div class="secure-delete-warning">
                        <div class="secure-delete-warning-title">🔐 Verifikasi password</div>
                        <p>Masukkan <strong>password pembuat ${label}</strong>. Untuk data lama tanpa catatan pembuat, gunakan password user yang sedang login.</p>
                    </div>
                    <div class="secure-delete-input-wrap">
                    <label class="secure-delete-password-label" for="secureDeletePassword">Password pembuat ${label}</label>
                    <div class="secure-delete-password-field">
                        <input id="secureDeletePassword" name="secure_delete_verification_password" type="password"
                            autocomplete="new-password" data-lpignore="true" data-1p-ignore="true" data-bwignore="true"
                            class="swal2-input" placeholder="Masukkan password pembuat ${label}">
                        <button type="button" id="secureDeleteToggle" class="secure-delete-toggle">Lihat</button>
                    </div>
                    <div class="secure-delete-input-wrap">
                        <label class="secure-delete-password-label" for="secureDeleteReason">Alasan (opsional)</label>
                        <input id="secureDeleteReason" name="secure_delete_reason" type="text" autocomplete="off"
                            data-lpignore="true" data-1p-ignore="true" data-bwignore="true"
                            class="swal2-input" maxlength="500" placeholder="Contoh: salah nomor atau dokumen dibatalkan">
                    </div>
                    </div>
                    <div class="secure-delete-lock-preview"><p>Jika salah 3 kali, aksi hapus dikunci 15 menit untuk menjaga keamanan data.</p></div>
                    </div>
                `,
                    showCancelButton: true, confirmButtonText: 'Pindahkan ke Sampah', cancelButtonText: 'Batal',
                    confirmButtonColor: '#ef4444', cancelButtonColor: '#64748b', focusConfirm: false,
                    customClass: {popup: 'secure-delete-popup'}, showLoaderOnConfirm: true,
                didOpen: () => {
                    const input = document.getElementById('secureDeletePassword');
                    const toggle = document.getElementById('secureDeleteToggle');
                    input?.focus();
                    toggle?.addEventListener('click', () => {
                        input.type = input.type === 'password' ? 'text' : 'password';
                        toggle.textContent = input.type === 'password' ? 'Lihat' : 'Sembunyikan';
                    });
                },
                    willClose: () => { closed = true; operation.cancelRequest(); },
                    allowOutsideClick: () => !operation.busy, allowEscapeKey: () => !operation.busy,
                    preConfirm: async () => {
                        if (!operation.current || operation.busy || operation.uncertain || closed) return false;
                        const password = document.getElementById('secureDeletePassword')?.value || '';
                        const reason = document.getElementById('secureDeleteReason')?.value || '';
                        if (!password.trim() || Array.from(password).length > 255 || Array.from(reason).length > 500) {
                            Swal.showValidationMessage(!password.trim() ? 'Password wajib diisi.' : 'Password maksimal 255 karakter dan alasan maksimal 500 karakter.'); return false;
                        }
                        try {
                            const result = await operation.request({creator_password: password, archive_reason: reason}, csrf);
                            return operation.current && !closed ? result : false;
                        } catch (error) {
                            if (operation.current && !closed) window.ProcurementArchive.feedback(error, 'spph');
                            return false;
                        }
                    }
                });
                if (!operation.current || !result?.isConfirmed || !result.value) return;
                if (result.value.locked) { showSecureDeleteLockCountdown(result.value.data.message, result.value.data.retry_after, result.value.data.locked_until); return; }
                if (result.value.ok !== true) return;
                await Swal.fire({icon: 'success', titleText: label + ' dipindahkan', text: result.value.data.message || 'Dokumen berhasil dipindahkan ke Tempat Sampah.', timer: 1400, showConfirmButton: false, customClass: {popup: 'secure-delete-popup'}});
                if (!operation.current) return;
                window.location.assign(SPPH_INDEX_URL);
            } finally { operation.release(); }
        }

        // ════════════════════════════════════════════════════════════
        // RICH TEXT EDITOR
        // ════════════════════════════════════════════════════════════
        const RT_FONTS = ['Arial', 'Times New Roman', 'Calibri', 'Courier New', 'Verdana', 'Tahoma', 'Georgia', 'Cambria', 'Segoe UI', 'Consolas', 'Trebuchet MS'];
        const RT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 36, 40, 48, 56, 64, 72, 96];
        const rtSavedSel = {}; let sizeDebounce = {};

        function rtSaveSel(edId) { try { const sel = window.getSelection(); if (sel.rangeCount > 0) { const ed = document.getElementById(edId); if (ed && ed.contains(sel.anchorNode)) rtSavedSel[edId] = sel.getRangeAt(0).cloneRange(); } } catch (e) { } }
        function rtRestoreSel(edId) { try { const ed = document.getElementById(edId); if (!ed || !rtSavedSel[edId]) return false; const range = rtSavedSel[edId]; if (!ed.contains(range.startContainer) || !ed.contains(range.endContainer)) { delete rtSavedSel[edId]; return false; } ed.focus(); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range); return true; } catch (e) { return false; } }

        function buildRtToolbar(edId) {
            const fontOpts = RT_FONTS.map(f => `<option value="${f}">${f}</option>`).join('');
            return `<div class="rt-toolbar" data-rt="${edId}"><div class="rt-group"><select class="rt-font-select" title="Font" onchange="rtApplyFont(this,'${edId}')"><option value="">Font...</option>${fontOpts}</select></div><div class="rt-sep"></div><div class="rt-group"><div class="rt-size-wrap" title="Ukuran Font"><input type="text" class="rt-size-input" value="9" id="sz-${edId}" onkeydown="rtSizeKey(event,'${edId}')" oninput="rtSizeInput('${edId}')" onfocus="rtSaveSel('${edId}')"><div class="rt-size-arrows"><div class="arr-up" onmousedown="event.preventDefault();rtSizeStep('${edId}',1)">▲</div><div class="arr-dn" onmousedown="event.preventDefault();rtSizeStep('${edId}',-1)">▼</div></div></div></div><div class="rt-sep"></div><div class="rt-group"><button type="button" class="rt-btn" data-cmd="bold" title="Tebal"><b>B</b></button><button type="button" class="rt-btn" data-cmd="italic" title="Miring"><i>I</i></button><button type="button" class="rt-btn" data-cmd="underline" title="Garis Bawah"><u>U</u></button><button type="button" class="rt-btn" data-cmd="strikeThrough" title="Coret"><s>S</s></button></div><div class="rt-sep"></div><div class="rt-group"><div class="rt-color-wrap" title="Warna Teks" onclick="document.getElementById('tc-${edId}').click()"><span class="rt-color-icon">A</span><span class="rt-color-bar" id="tcBar-${edId}" style="background:#000000"></span><input type="color" id="tc-${edId}" value="#000000" oninput="rtApplyColor(this,'${edId}','fore')"></div><div class="rt-hl-wrap" title="Highlight" onclick="document.getElementById('hl-${edId}').click()"><span style="font-size:11px;font-weight:700;pointer-events:none">ab</span><input type="color" id="hl-${edId}" value="#FFFF00" oninput="rtApplyColor(this,'${edId}','bg')"></div></div><div class="rt-sep"></div><div class="rt-group"><button type="button" class="rt-btn" data-cmd="justifyLeft" title="Rata Kiri"><svg viewBox="0 0 14 10" fill="currentColor"><rect x="0" y="0" width="14" height="1.5" rx=".5"/><rect x="0" y="4" width="9" height="1.5" rx=".5"/><rect x="0" y="8" width="11" height="1.5" rx=".5"/></svg></button><button type="button" class="rt-btn" data-cmd="justifyCenter" title="Rata Tengah"><svg viewBox="0 0 14 10" fill="currentColor"><rect x="0" y="0" width="14" height="1.5" rx=".5"/><rect x="2.5" y="4" width="9" height="1.5" rx=".5"/><rect x="1.5" y="8" width="11" height="1.5" rx=".5"/></svg></button><button type="button" class="rt-btn" data-cmd="justifyRight" title="Rata Kanan"><svg viewBox="0 0 14 10" fill="currentColor"><rect x="0" y="0" width="14" height="1.5" rx=".5"/><rect x="5" y="4" width="9" height="1.5" rx=".5"/><rect x="3" y="8" width="11" height="1.5" rx=".5"/></svg></button><button type="button" class="rt-btn" data-cmd="justifyFull" title="Rata Kiri-Kanan"><svg viewBox="0 0 14 10" fill="currentColor"><rect x="0" y="0" width="14" height="1.5" rx=".5"/><rect x="0" y="4" width="14" height="1.5" rx=".5"/><rect x="0" y="8" width="14" height="1.5" rx=".5"/></svg></button></div><div class="rt-sep"></div><div class="rt-group"><button type="button" class="rt-btn" data-cmd="insertUnorderedList" title="Bullet" style="font-size:12px">•≡</button><button type="button" class="rt-btn" data-cmd="insertOrderedList" title="Number" style="font-size:10px">1.</button></div><div class="rt-sep"></div><div class="rt-group"><button type="button" class="rt-btn" data-cmd="undo" title="Undo"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8a5.5 5.5 0 106-5.5H5"/><polyline points="2,4.5 5,7.5 5,4.5"/></svg></button><button type="button" class="rt-btn" data-cmd="redo" title="Redo"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8a5.5 5.5 0 11-6-5.5H11"/><polyline points="14,4.5 11,7.5 11,4.5"/></svg></button></div><div class="rt-sep"></div><div class="rt-group"><button type="button" class="rt-btn" data-cmd="removeFormat" title="Hapus Format" style="font-size:9px">✕fmt</button></div></div>`;
        }

        function rtApplyFont(sel, edId) { if (!sel.value) return; if (!rtRestoreSel(edId)) { sel.value = ''; return; } document.execCommand('fontName', false, sel.value); sel.value = ''; rtSaveSel(edId); syncHidden(edId); }
        function rtSizeInput(edId) { clearTimeout(sizeDebounce[edId]); sizeDebounce[edId] = setTimeout(() => { const inp = document.getElementById('sz-' + edId); if (!inp) return; let v = parseInt(inp.value, 10); if (!isNaN(v) && v > 0 && v <= 500) rtApplySizeToSaved(edId, v); }, 250); }
        function rtSizeKey(e, edId) { if (e.key === 'Enter') { e.preventDefault(); clearTimeout(sizeDebounce[edId]); const inp = document.getElementById('sz-' + edId); if (!inp) return; let v = parseInt(inp.value, 10); if (isNaN(v) || v < 1) v = 9; if (v > 500) v = 500; inp.value = v; rtRestoreSel(edId); } if (e.key === 'ArrowUp') { e.preventDefault(); rtSizeStep(edId, 1); } if (e.key === 'ArrowDown') { e.preventDefault(); rtSizeStep(edId, -1); } if (e.key === 'Escape') { e.preventDefault(); rtRestoreSel(edId); } }
        function rtSizeStep(edId, dir) { const inp = document.getElementById('sz-' + edId); if (!inp) return; let c = parseInt(inp.value, 10) || 9; c = Math.max(1, Math.min(500, c + dir)); inp.value = c; rtApplySizeToSaved(edId, c); }
        function rtApplySizeToSaved(edId, pt) { if (!rtSavedSel[edId]) return; const ed = document.getElementById(edId); if (!ed) return; try { const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(rtSavedSel[edId]); if (sel.isCollapsed) sel.selectAllChildren(ed); const range = sel.getRangeAt(0), frag = range.extractContents(), w = document.createElement('span'); w.style.fontSize = pt + 'pt'; w.appendChild(frag); w.querySelectorAll('span').forEach(i => { i.style.removeProperty('font-size'); if (!i.style.cssText && !i.className && !i.id) { const p = i.parentNode; while (i.firstChild) p.insertBefore(i.firstChild, i); i.remove(); } }); w.querySelectorAll('font[size]').forEach(f => { const p = f.parentNode; while (f.firstChild) p.insertBefore(f.firstChild, f); f.remove(); }); range.insertNode(w); const nr = document.createRange(); nr.selectNodeContents(w); sel.removeAllRanges(); sel.addRange(nr); rtSavedSel[edId] = nr.cloneRange(); syncHidden(edId); } catch (e) { } }
        function rtApplyColor(input, edId, type) { if (!rtRestoreSel(edId)) return; if (type === 'fore') { const b = document.getElementById('tcBar-' + edId); if (b) b.style.background = input.value; document.execCommand('foreColor', false, input.value); } else { try { document.execCommand('hiliteColor', false, input.value); } catch (e) { document.execCommand('backColor', false, input.value); } } rtSaveSel(edId); syncHidden(edId); }

        function updateTbState(tb, edId) { const cmds = ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'insertUnorderedList', 'insertOrderedList']; const ed = edId ? document.getElementById(edId) : null; const sel = window.getSelection(); const node = sel && sel.rangeCount > 0 ? sel.getRangeAt(0).startContainer : null; const el = node ? (node.nodeType === 3 ? node.parentElement : node) : null; tb.querySelectorAll('[data-cmd]').forEach(btn => { const cmd = btn.dataset.cmd; if (!cmds.includes(cmd)) return; let st = false; try { st = document.queryCommandState(cmd); } catch (e) { } if (!st && ed && el && ed.contains(el)) { if (cmd === 'subscript') st = !!el.closest('sub'); if (cmd === 'superscript') st = !!el.closest('sup'); } btn.classList.toggle('rt-active', st); }); if (edId) { try { const inp = document.getElementById('sz-' + edId); if (inp && document.activeElement !== inp && el && ed && ed.contains(el)) { const fs = window.getComputedStyle(el).fontSize; if (fs) { const px = parseFloat(fs), pt = Math.round(px * 0.75); if (!isNaN(pt) && pt > 0) inp.value = RT_SIZES.reduce((p, c) => Math.abs(c - pt) < Math.abs(p - pt) ? c : p); } } } catch (e) { } } }

        function initRt(editorId) {
            const ed = document.getElementById(editorId), tb = document.querySelector(`[data-rt="${editorId}"]`); if (!ed || !tb) return;
            ed.addEventListener('mouseup', () => rtSaveSel(editorId)); ed.addEventListener('keyup', () => rtSaveSel(editorId));
            tb.querySelectorAll('[data-cmd]').forEach(btn => { btn.addEventListener('mousedown', e => { e.preventDefault(); if (document.activeElement && document.activeElement.id === 'sz-' + editorId) { clearTimeout(sizeDebounce[editorId]); rtRestoreSel(editorId); } try { document.execCommand(btn.dataset.cmd, false, null); } catch (e2) { } syncHidden(editorId); requestAnimationFrame(() => updateTbState(tb, editorId)); rtSaveSel(editorId); }); });
            ['keyup', 'mouseup', 'click', 'input'].forEach(ev => ed.addEventListener(ev, () => { syncHidden(editorId); updateTbState(tb, editorId); }));
            ed.addEventListener('paste', e => { e.preventDefault(); const html = (e.clipboardData || window.clipboardData).getData('text/html'); if (html) { document.execCommand('insertHTML', false, html.replace(/<\/?(meta|link|style|script)[^>]*>/gi, '')); } else { document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text/plain')); } syncHidden(editorId); });
            const inp = document.getElementById('sz-' + editorId); if (inp) inp.value = '9';
        }

        function syncHidden(editorId) { const ed = document.getElementById(editorId), hd = document.getElementById('hid-' + editorId); if (ed && hd) hd.value = ed.innerHTML; }
        function syncAll(formEl) { formEl.querySelectorAll('.rt-editor').forEach(ed => syncHidden(ed.id)); }
        function setRt(editorId, html) { const ed = document.getElementById(editorId); if (ed) { ed.innerHTML = html || ''; syncHidden(editorId); } }

        function removeRow(btn) {
            const row = btn.closest('.item-row'), wrapper = row.closest('#addRows, #editRows');
            if (wrapper.querySelectorAll('.item-row').length <= 1) { Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: 'Minimal 1 baris!', showConfirmButton: false, timer: 2000 }); return; }
            const editor = row.querySelector('.rt-editor'); if (editor) { const edId = editor.id; delete rtSavedSel[edId]; if (sizeDebounce[edId]) { clearTimeout(sizeDebounce[edId]); delete sizeDebounce[edId]; } }
            row.remove(); renumber(wrapper);
        }

        function buildSatOpts(s) {
            const options = SATUANS.map(v => `<option value="${escapedHtml(v)}"${v === s ? ' selected' : ''}>${escapedHtml(v)}</option>`).join('');
            const legacy = s && !SATUANS.includes(s) && s !== ADD_SATUAN_VALUE ? `<option value="${escapedHtml(s)}" selected>${escapedHtml(s)}</option>` : '';
            return `${options}${legacy}<option value="${ADD_SATUAN_VALUE}">+ Tambah satuan baru...</option>`;
        }

        const quickAddSatuan = window.SatuanUI.createQuick({names: SATUANS, url: SATUAN_STORE_URL, csrfToken: SPPH_PAGE_CONFIG.csrfToken, sentinel: ADD_SATUAN_VALUE});

        function getDefaultFulfillmentDate(mode) {
            const first = document.querySelector(`#${mode === 'add' ? 'addRows' : 'editRows'} input[name$="[tgl_pemenuhan]"]`);
            return first?.value || '';
        }

        function syncFulfillmentFromFirst(inputEl) {
            const wrapper = inputEl.closest('#addRows, #editRows');
            if (!wrapper) return;
            const inputs = Array.from(wrapper.querySelectorAll('input[name$="[tgl_pemenuhan]"]'));
            if (inputs[0] !== inputEl) {
                inputEl.dataset.followFirstDate = '0';
                return;
            }
            inputs.slice(1).forEach(input => {
                if (input.dataset.followFirstDate !== '0') {
                    input.value = inputEl.value;
                    input.dataset.followFirstDate = '1';
                }
            });
        }

        function addRow(mode, item = null) {
            if (mode === 'edit' && ['loading', 'error'].includes(document.getElementById('editForm').dataset.spphItemsState)) { ensureSpphEditDataReady(document.getElementById('editForm')); return; }
            const wrapper = document.getElementById(mode === 'add' ? 'addRows' : 'editRows'), idx = mode === 'add' ? addIdx++ : editIdx++;
            const ns = mode === 'add' ? 'a' : 'e', rowNum = wrapper.querySelectorAll('.item-row').length + 1, edId = `rt-${ns}-${idx}`;
            const pemenuhanValue = item?.tgl_pemenuhan ? item.tgl_pemenuhan.substring(0, 10) : (rowNum > 1 ? getDefaultFulfillmentDate(mode) : '');
            const followFirstDate = item?.tgl_pemenuhan ? '0' : (rowNum > 1 && pemenuhanValue ? '1' : '');
            wrapper.insertAdjacentHTML('beforeend', `<div class="item-row" data-idx="${idx}"><span class="row-badge">${rowNum}</span><button type="button" class="btn-rm" onclick="removeRow(this)">×</button><div class="mt-1.5"><span class="item-label">Nama Barang / Jasa</span>${buildRtToolbar(edId)}<div class="rt-editor" contenteditable="true" id="${edId}" data-ph="Ketik nama barang / jasa..."></div><input type="hidden" name="items[${idx}][nama_barang]" id="hid-${edId}"></div><div class="item-grid mt-1.5"><div><span class="item-label">Satuan</span><select name="items[${idx}][satuan]" class="m-select" style="width:100%"><option value="">-- Pilih --</option>${buildSatOpts(item?.satuan || '')}</select></div><div><span class="item-label">Jumlah</span><input type="text" name="items[${idx}][jumlah]" value="${escapedHtml(item?.jumlah || '')}" placeholder="cth: 10" class="m-input"></div><div><span class="item-label">Tgl. Pemenuhan</span><input type="date" name="items[${idx}][tgl_pemenuhan]" value="${escapedHtml(pemenuhanValue)}" data-follow-first-date="${followFirstDate}" class="m-input"></div></div></div>`);
            renumber(wrapper); initRt(edId); if (item?.nama_barang) setRt(edId, item.nama_barang);
        }
        function renumber(w) { w.querySelectorAll('.item-row .row-badge').forEach((b, i) => b.textContent = i + 1); }

        // ════════════════════════════════════════════════════════════
        // NOMOR CHECK
        // ════════════════════════════════════════════════════════════
        function setStatus(inp, stEl, state, msg) { inp.classList.remove('nomor-input-ok', 'nomor-input-error', 'nomor-input-warn'); stEl.innerHTML = ''; if (!msg) return; const ic = { ok: '✅', duplicate: '❌', warn: '⚠️', checking: '🔄' }, cl = { ok: 'nomor-status-ok', duplicate: 'nomor-status-error', warn: 'nomor-status-warn', checking: 'text-gray-400' }, bd = { ok: 'nomor-input-ok', duplicate: 'nomor-input-error', warn: 'nomor-input-warn' }; if (bd[state]) inp.classList.add(bd[state]); stEl.innerHTML = `<span class="${cl[state] || ''}">${ic[state] || ''} ${escapedHtml(msg)}</span>`; }
        /* BEGIN SPPH NUMBER LOOKUPS */
        function getSuggestionUrl(isEdit = false) {
            const url = new URL(SUGGEST_URL, window.location.origin);
            const tanggal = document.getElementById(isEdit ? 'editTanggal' : 'tanggalSpphInput')?.value;
            if (tanggal) url.searchParams.set('tanggal', tanggal);
            return url.toString();
        }

        async function applyLatestNumberSpph(isEdit = false) {
            const input = document.getElementById(isEdit ? 'editNomor' : 'nomorSpphInput');
            const status = document.getElementById(isEdit ? 'editNomorStatus' : 'nomorStatus');
            const form = document.getElementById(isEdit ? 'editForm' : 'addForm');
            const modal = document.getElementById(isEdit ? 'editModal' : 'addModal');
            if (!input || !form || !modal || modal.classList.contains('hidden')) return null;
            const number = input.value, action = form.action, url = getSuggestionUrl(isEdit);
            const record = isEdit ? document.getElementById('editId')?.value : '';
            const generation = isEdit ? editModalLoadSerial : 0;
            const current = () => input.value === number && form.action === action && url === getSuggestionUrl(isEdit)
                && !modal.classList.contains('hidden') && (!isEdit || (generation === editModalLoadSerial && document.getElementById('editId')?.value === record));
            try {
                const data = await readSpphLookup(`latest-number:${isEdit ? 'edit' : 'add'}`, url);
                if (!current() || data?.manual === true || !Array.isArray(data?.suggestions) || data.suggestions.length > 5) return null;
                const latest = data.suggestions[0];
                if (typeof latest !== 'string' || !latest.trim() || latest.length > 60) return null;
                input.value = latest;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                if (status) status.textContent = 'Nomor terbaru dipilih. Periksa kembali sebelum menyimpan.';
                return latest;
            } catch {
                return null;
            }
        }

        async function loadSuggestions() {
            const box = document.getElementById('suggBox');
            if (!box) return;
            const requestId = ++spphSuggestionSerial, url = getSuggestionUrl();
            box.textContent = 'Memuat saran nomor…';
            try {
                const data = await readSpphLookup('suggestions', url);
                if (requestId !== spphSuggestionSerial || url !== getSuggestionUrl()) return;
                if (!data || !Array.isArray(data.suggestions) || data.suggestions.length > 5
                    || !data.suggestions.every(value => typeof value === 'string' && value.length > 0 && value.length <= 255)
                    || (data.last != null && (typeof data.last !== 'string' || data.last.length > 255))) throw new Error('Saran nomor belum lengkap. Silakan coba lagi.');
                box.replaceChildren();
                const label = document.createElement('span');
                label.className = 'text-xs text-gray-400 dark:text-gray-500 mr-1';
                label.textContent = data.last ? `Terakhir: ${data.last} →` : 'Saran:';
                box.appendChild(label);
                data.suggestions.forEach(value => {
                    const button = document.createElement('button');
                    button.type = 'button'; button.className = 'suggest-pill'; button.textContent = `✨ ${value}`;
                    button.addEventListener('click', () => {
                        if (requestId !== spphSuggestionSerial || url !== getSuggestionUrl()) return;
                        const input = document.getElementById('nomorSpphInput');
                        input.value = value; input.dispatchEvent(new Event('input'));
                    });
                    box.appendChild(button);
                });
            } catch (error) {
                if (requestId === spphSuggestionSerial && url === getSuggestionUrl()) {
                    box.textContent = error.name === 'AbortError' ? 'Saran nomor belum dimuat.' : error.message;
                    appendSpphLookupRetry(box, loadSuggestions);
                }
            }
        }

        function attachCheck(inputId, statusId, getExcludeId, dateInputId = null) {
            const input = document.getElementById(inputId), status = document.getElementById(statusId);
            if (!input || !status || spphLookupCleanups.has(inputId)) return;
            const key = `number:${inputId}`;
            let timer = null, requestSerial = 0;
            const dateValue = () => dateInputId ? document.getElementById(dateInputId)?.value || '' : '';
            const cancel = () => { requestSerial++; clearTimeout(timer); timer = null; cancelSpphLookup(key); setStatus(input, status, null, ''); };
            spphLookupCleanups.set(inputId, cancel);
            const runCheck = () => {
                cancel();
                const number = input.value.trim(), date = dateValue(), exclude = String(getExcludeId() ?? 0), requestId = requestSerial;
                if (!number) { setStatus(input, status, null, ''); return; }
                const current = () => requestId === requestSerial && input.value.trim() === number && dateValue() === date && String(getExcludeId() ?? 0) === exclude;
                setStatus(input, status, 'checking', 'Memeriksa...');
                timer = setTimeout(async () => {
                    timer = null;
                    if (!current()) return;
                    try {
                        const url = new URL(CHECK_URL, window.location.origin);
                        url.searchParams.set('nomor', number); url.searchParams.set('exclude_id', exclude);
                                    if (date) url.searchParams.set('tanggal', date);
                        const data = await readSpphLookup(key, url.toString());
                        if (!current()) return;
                        if (!data || !['ok', 'duplicate', 'empty'].includes(data.status)
                            || (data.normalized_nomor != null && (typeof data.normalized_nomor !== 'string' || data.normalized_nomor.length > 255))
                            || ['warning', 'message'].some(field => data[field] != null && (typeof data[field] !== 'string' || data[field].length > 2048))) throw new Error('Hasil pemeriksaan belum lengkap. Silakan coba lagi.');
                        if (data.normalized_nomor) input.value = data.normalized_nomor;
                        if (data.status === 'empty') setStatus(input, status, null, '');
                        else if (data.status === 'duplicate') setStatus(input, status, 'duplicate', data.message || 'Nomor SPPH sudah digunakan.');
                        else if (data.warning) setStatus(input, status, 'warn', data.warning);
                        else setStatus(input, status, 'ok', 'Tersedia ✓');
                    } catch (error) {
                        if (error.name !== 'AbortError' && current()) {
                            setStatus(input, status, 'warn', error.message);
                            appendSpphLookupRetry(status, runCheck);
                        }
                    }
                }, 400);
            };
            input.addEventListener('input', runCheck);
            if (dateInputId) document.getElementById(dateInputId)?.addEventListener('change', runCheck);
        }

        // ═══════════════════════════════════════
        // OPEN EDIT MODAL
        // ═══════════════════════════════════════
        /* END SPPH NUMBER LOOKUPS */


        // ════════════════════════════════════════════════════════════
        // PRESENCE & HEARTBEAT
        // ════════════════════════════════════════════════════════════
        /* BEGIN SPPH BACKGROUND */
        let spphUpdateCount = 0, spphInitialFilters = null;
        function hideSpphPresence() { document.getElementById('presenceBar')?.classList.add('hidden'); }
        const spphBackground = window.ProcurementBackground.create({
            channels: {
                data: {
                    interval: 45000, enabled: () => IS_FIRST && !HAS_FILTER,
                    url: () => {
                        const url = new URL(POLL_URL, window.location.origin);
                        url.searchParams.set('last_id', String(lastId)); url.searchParams.set('summary', '1');
                        return url.href;
                    },
                    apply: data => {
                        if (!Array.isArray(data?.rows) || data.rows.length > 50 || data.rows.some(row => !Number.isSafeInteger(row?.id) || row.id <= 0)) throw new Error('Invalid SPPH update');
                        const ids = [...new Set(data.rows.map(row => row.id))].filter(id => id > lastId);
                        if (!ids.length) return;
                        lastId = Math.max(lastId, ...ids); spphUpdateCount = Math.min(1000, spphUpdateCount + ids.length);
                        document.getElementById('spphUpdatesText').textContent = (spphUpdateCount >= 1000 ? '1000+' : spphUpdateCount) + ' SPPH baru tersedia. Muat ulang untuk melihat data dan seluruh tombol aksinya.';
                        document.getElementById('spphUpdates').classList.remove('hidden');
                    }
                },
                presence: {
                    interval: 60000, initialDelay: 12000, url: PRESENCE_URL,
                    onPause: hideSpphPresence, onError: hideSpphPresence,
                    apply: data => {
                        if (!Array.isArray(data?.users) || data.users.some(user => typeof user?.name !== 'string')) throw new Error('Invalid presence');
                        document.getElementById('presenceText').textContent = data.users.length ? data.users.slice(0, 20).map(user => user.name).join(', ') + ' sedang menambahkan SPPH...' : '';
                        document.getElementById('presenceBar').classList.toggle('hidden', data.users.length === 0);
                    }
                }
            },
            presence: { startUrl: PRES_START, stopUrl: PRES_STOP, csrf: () => document.querySelector('meta[name="csrf-token"]').content },
            isEditing: () => modalOpen
        });
        function startHb() { spphBackground.heartbeat(true); }
        function stopHb() { spphBackground.heartbeat(false); }
        function refreshSpphList() {
            const hint = document.getElementById('spphUpdatesHint');
            if (modalOpen || secureDeleteSearchSnapshot !== null || document.querySelector('[data-procurement-saving="true"]') || window.Swal?.isVisible()) {
                hint.textContent = 'Selesaikan atau tutup formulir dan dialog yang sedang terbuka sebelum memuat ulang.';
                return;
            }
            if (spphInitialFilters !== null && getQS() !== spphInitialFilters) {
                hint.textContent = 'Filter telah diubah. Klik Terapkan Filter agar pilihan Anda ikut digunakan.';
                return;
            }
            window.location.assign(window.location.href);
        }
        function initializeSpphBackground() { spphInitialFilters = getQS(); spphBackground.start(); }
        /* END SPPH BACKGROUND */

        // ════════════════════════════════════════════════════════════
        // ONBOARDING TUTORIAL
        // ════════════════════════════════════════════════════════════
        let obCurrentStep = 1;
        let isFirstOpen = true;
        let obFinished = false;

        function getCsrfToken() {
            const meta = document.querySelector('meta[name="csrf-token"]');
            return meta ? meta.content : '';
        }

        function showOnboarding() {
            try {
                if (obFinished) return;
                const popup = document.getElementById('onboardingPopup');
                if (!popup) return;
                obCurrentStep = 1;
                updateObSteps();
                popup.style.display = 'flex';
                popup.classList.remove('closing');
                document.body.style.overflow = 'hidden';

                if (!isFirstOpen) {
                    fetch('/spph/onboarding-view?t=' + Date.now(), {
                        method: 'POST',
                        headers: { 'X-CSRF-TOKEN': getCsrfToken(), 'Content-Type': 'application/json' }
                    }).then(r => r.json()).then(data => {
                        if (data.status === 'finished') { obFinished = true; }
                    }).catch(() => { });
                }
                isFirstOpen = false;
            } catch (e) { console.error('[OB] Error showOnboarding:', e); }
        }

        function closeOnboarding() {
            try {
                const popup = document.getElementById('onboardingPopup');
                if (!popup) return;
                popup.classList.add('closing');
                setTimeout(() => {
                    popup.style.display = 'none';
                    popup.classList.remove('closing');
                    document.body.style.overflow = '';
                    if (obFinished) { hideFloatBtn(); } else { showFloatBtn(); }
                }, 400);
                fetch('/spph/onboarding-seen?t=' + Date.now(), {
                    method: 'POST',
                    headers: { 'X-CSRF-TOKEN': getCsrfToken(), 'Content-Type': 'application/json' }
                }).catch(() => { });
            } catch (e) { console.error('[OB] Error closeOnboarding:', e); }
        }

        function finishOnboarding() {
            try {
                const card = document.querySelector('.onboarding-card');
                if (card) {
                    const confetti = document.createElement('div');
                    confetti.className = 'ob-confetti';
                    const colors = ['#6366f1', '#a855f7', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6'];
                    for (let i = 0; i < 30; i++) {
                        const piece = document.createElement('div');
                        piece.className = 'ob-confetti-piece';
                        piece.style.left = Math.random() * 100 + '%';
                        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
                        piece.style.animationDelay = Math.random() * 0.5 + 's';
                        piece.style.animationDuration = (2 + Math.random() * 2) + 's';
                        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                        confetti.appendChild(piece);
                    }
                    card.appendChild(confetti);
                }
                setTimeout(() => closeOnboarding(), 600);
            } catch (e) { closeOnboarding(); }
        }

        function nextObStep(step) { obCurrentStep = step; updateObSteps(); }
        function prevObStep(step) { obCurrentStep = step; updateObSteps(); }

        function updateObSteps() {
            document.querySelectorAll('.ob-step').forEach(el => {
                el.classList.remove('active');
                if (parseInt(el.dataset.step) === obCurrentStep) el.classList.add('active');
            });
            document.querySelectorAll('.ob-progress-dot').forEach(dot => {
                const dotNum = parseInt(dot.dataset.dot);
                dot.classList.remove('active', 'done');
                if (dotNum < obCurrentStep) dot.classList.add('done');
                if (dotNum === obCurrentStep) dot.classList.add('active');
            });
        }

        function showFloatBtn() {
            const btn = document.getElementById('onboardingFloatBtn');
            if (btn && !obFinished) { btn.style.display = 'flex'; btn.style.visibility = 'visible'; }
        }

        function hideFloatBtn() {
            const btn = document.getElementById('onboardingFloatBtn');
            if (btn) { btn.style.display = 'none'; btn.style.visibility = 'hidden'; }
        }

        async function checkOnboardingStatus() {
            try {
                const response = await fetch('/spph/onboarding-status?t=' + Date.now(), { headers: { 'X-CSRF-TOKEN': getCsrfToken() } });
                if (!response.ok) return;
                const data = await response.json();
                if (data.finished) { hideFloatBtn(); return; }
                if (!data.seen) { setTimeout(() => showOnboarding(), 1000); return; }
                if (data.seen && data.left > 0) { showFloatBtn(); return; }
                hideFloatBtn();
            } catch (e) { console.error('[OB] Error:', e); }
        }

        // ════════════════════════════════════════════════════════════
        // INIT
        // ════════════════════════════════════════════════════════════

        const SPPH_VENDOR_STORE_URL = SPPH_PAGE_CONFIG.vendorStoreUrl;
        const SPPH_VENDOR_CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]')?.content || SPPH_PAGE_CONFIG.csrfToken || '';

        function resetNewVendorSpphForm() {
            if (spphInlineVendorOperation) return;
            ['newSpphVendorNama', 'newSpphVendorAlamat', 'newSpphVendorTelp', 'newSpphVendorFax', 'newSpphVendorEmail', 'newSpphVendorNpwp', 'newSpphVendorDirektur', 'newSpphVendorJabatan'].forEach(id => {
                const el = document.getElementById(id);
                if (el) { el.value = ''; el.removeAttribute('aria-invalid'); }
            });
            setNewVendorSpphStatus('', '');
            updateVendorProfileChecklistSpph();
        }

        function setNewVendorSpphStatus(message, type) {
            const el = document.getElementById('newSpphVendorStatus');
            if (!el) return;

            if (!message) {
                el.classList.add('hidden');
                el.textContent = '';
                return;
            }

            el.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700', 'dark:bg-red-900/30', 'dark:text-red-300', 'dark:bg-green-900/30', 'dark:text-green-300');
            if (type === 'error') {
                el.classList.add('bg-red-100', 'dark:bg-red-900/30', 'text-red-700', 'dark:text-red-300');
            } else {
                el.classList.add('bg-green-100', 'dark:bg-green-900/30', 'text-green-700', 'dark:text-green-300');
            }
            el.textContent = message;
        }

        function updateVendorProfileChecklistSpph() {
            const box = document.getElementById('newSpphVendorChecklist');
            const target = box?.querySelector('[data-vendor-checklist-items]');
            if (!target) return;

            const filled = id => (document.getElementById(id)?.value || '').trim().length > 0;
            const checks = [
                ['Nama wajib', filled('newSpphVendorNama')],
                ['Kontak', filled('newSpphVendorTelp') || filled('newSpphVendorEmail')],
                ['NPWP', filled('newSpphVendorNpwp')],
                ['Penanggung jawab', filled('newSpphVendorDirektur') && filled('newSpphVendorJabatan')],
            ];

            target.innerHTML = checks.map(([label, ok]) =>
                `<span class="${ok ? 'text-emerald-700 dark:text-emerald-300 font-black' : 'text-slate-500 dark:text-slate-300'}">${ok ? '✓' : '○'} ${escapedHtml(label)}</span>`
            ).join('');
        }

        function vendorUsageKey(name) {
            return String(name || '').trim().toLowerCase().replace(/\s+/g, ' ');
        }

        /* BEGIN SPPH VENDOR USAGE READ */
        let VENDOR_USAGE_STATS = Object.create(null), vendorUsageState = 'idle', vendorUsageLoadedAt = 0;
        let vendorUsageOperation = null, vendorUsageMessage = '';
        function parseVendorUsageStats(data) {
            const raw = data?.stats;
            if (!raw || typeof raw !== 'object' || (Array.isArray(raw) && raw.length)) throw new Error('Invalid vendor statistics');
            const parsed = Object.create(null);
            for (const [key, row] of Object.entries(raw)) {
                if (!row || typeof row !== 'object' || Array.isArray(row) || typeof row.name !== 'string' || !row.name.trim() || Array.from(row.name).length > 255
                    || !['spph_count', 'sp_count', 'total_count'].every(field => Number.isSafeInteger(row[field]) && row[field] >= 0)
                    || row.total_count !== row.spph_count + row.sp_count || !['baru', 'normal', 'cukup-sering', 'sering'].includes(row.status)
                    || typeof row.hint !== 'string' || row.hint.length > 1000 || typeof row.last_used_label !== 'string' || row.last_used_label.length > 100
                    || (row.last_document !== null && (typeof row.last_document !== 'string' || Array.from(row.last_document).length > 255))
                    || (row.last_used_at !== null && (typeof row.last_used_at !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(row.last_used_at)))) throw new Error('Invalid vendor statistics');
                parsed[key] = {name: row.name, spph_count: row.spph_count, sp_count: row.sp_count, total_count: row.total_count,
                    last_used_at: row.last_used_at, last_used_label: row.last_used_label, last_document: row.last_document, status: row.status, hint: row.hint};
            }
            return parsed;
        }
        function refreshVendorUsageUi() {
            if (document.hidden) return;
            for (const [modal, select, panel] of [['addModal', 'vendorSelect', 'vendorUsagePanel'], ['editModal', 'editVendor', 'editVendorUsagePanel']]) {
                if (document.getElementById(modal)?.classList.contains('hidden')) continue;
                $('#' + select).trigger('change.select2'); renderVendorUsagePanel(select, panel);
            }
        }
        function cancelVendorUsageRead() {
            if (!vendorUsageOperation) return;
            vendorUsageOperation = null; cancelSpphLookup('vendor-usage');
            vendorUsageState = 'paused'; vendorUsageMessage = 'Riwayat belum selesai dimuat. Cek ulang saat Anda siap.';
            refreshVendorUsageUi();
        }
        spphLookupCleanups.set('vendor-usage', cancelVendorUsageRead);
        document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshVendorUsageUi(); });
        function ensureVendorUsageStats() {
            if (vendorUsageState === 'ready' && Date.now() - vendorUsageLoadedAt < 60000) return Promise.resolve(VENDOR_USAGE_STATS);
            if (vendorUsageOperation) return vendorUsageOperation.promise;
            if (document.hidden) return Promise.resolve(null);
            const operation = {}; vendorUsageOperation = operation;
            vendorUsageState = 'loading'; vendorUsageMessage = 'Memuat riwayat pemakaian vendor…'; refreshVendorUsageUi();
            operation.promise = (async () => {
                try {
                    const data = await readSpphLookup('vendor-usage', VENDOR_USAGE_STATS_URL);
                    if (vendorUsageOperation !== operation) return null;
                    const parsed = parseVendorUsageStats(data);
                    VENDOR_USAGE_STATS = parsed; vendorUsageLoadedAt = Date.now(); vendorUsageState = 'ready'; vendorUsageMessage = '';
                    return parsed;
                } catch (error) {
                    if (vendorUsageOperation !== operation) return null;
                    vendorUsageState = error.name === 'AbortError' ? 'paused' : 'error';
                    vendorUsageMessage = [401, 419].includes(error.status) ? 'Sesi perlu diperbarui. Muat ulang halaman untuk melihat riwayat.'
                        : error.status === 403 ? 'Akses riwayat vendor tidak tersedia untuk akun ini.'
                        : error.status === 429 ? 'Pemeriksaan terlalu sering. Tunggu sebentar, lalu cek ulang.'
                        : 'Riwayat belum tersedia. Jumlah pemakaian belum dapat dipastikan. Silakan cek ulang.';
                    return null;
                } finally {
                    if (vendorUsageOperation === operation) { vendorUsageOperation = null; refreshVendorUsageUi(); }
                }
            })();
            return operation.promise;
        }
        /* END SPPH VENDOR USAGE READ */

        function vendorUsageFor(name) {
            const key = vendorUsageKey(name);
            if (vendorUsageState !== 'ready') return null;
            return (Object.hasOwn(VENDOR_USAGE_STATS, key) ? VENDOR_USAGE_STATS[key] : null) || {
                name,
                spph_count: 0,
                sp_count: 0,
                total_count: 0,
                last_used_label: '-',
                last_document: null,
                status: 'baru',
                hint: 'Vendor belum tercatat di SPPH/SP. Cocok untuk opsi baru, tetap cek profil vendor sebelum dipakai.'
            };
        }

        function vendorUsageBadgeText(name) {
            if (!name || name === '__tambah__') return '';
            const usage = vendorUsageFor(name);
            return usage ? `${usage.total_count}x` : 'riwayat belum tersedia';
        }

        function vendorUsageOptionTemplate(item) {
            if (!item.id) return item.text || '';
            if (item.id === '__tambah__') return $('<span class="font-semibold text-emerald-600 dark:text-emerald-300">').text(item.text || 'Tambah Vendor Baru...');

            const usage = vendorUsageFor(item.id);
            if (!usage) return $('<div>').append($('<div class="font-bold">').text(item.text || item.id))
                .append($('<div class="text-[11px] text-slate-500 dark:text-slate-300">').text(vendorUsageState === 'loading' ? 'Riwayat sedang dimuat…' : 'Riwayat belum tersedia'));
            const $wrap = $('<div class="flex items-start justify-between gap-3">');
            const $left = $('<div class="min-w-0">')
                .append($('<div class="font-bold text-slate-800 dark:text-slate-100 truncate">').text(item.text || item.id))
                .append($('<div class="text-[11px] text-slate-500 dark:text-slate-300 mt-0.5">').text(`SPPH ${usage.spph_count || 0}x | SP ${usage.sp_count || 0}x${usage.last_document ? ' | terakhir ' + usage.last_document : ''}`));
            const $badge = $('<span class="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-black bg-blue-600 text-white">').text(`${usage.total_count || 0}x`);

            return $wrap.append($left).append($badge);
        }

        function vendorUsageSelectionTemplate(item) {
            if (!item.id) return $('<span>').text(item.text || '');
            if (item.id === '__tambah__') return $('<span>').text(item.text || 'Tambah Vendor Baru...');
            return $('<span>').text(`${item.text || item.id} | ${vendorUsageBadgeText(item.id)}`);
        }

        function renderVendorUsagePanel(selectId, panelId) {
            const selected = $(`#${selectId}`).val() || [];
            const panel = document.getElementById(panelId);
            if (!panel) return;

            const vendors = selected.filter(vendor => vendor && vendor !== '__tambah__');
            if (!vendors.length) {
                panel.classList.add('hidden');
                panel.innerHTML = '';
                return;
            }

            panel.classList.remove('hidden');
            if (vendorUsageState !== 'ready') {
                panel.textContent = '';
                const status = document.createElement('div'); status.className = 'vendor-usage-card'; status.setAttribute('role', 'status');
                status.textContent = vendorUsageMessage || 'Riwayat pemakaian belum dimuat.'; panel.appendChild(status);
                if (vendorUsageState !== 'loading') appendSpphLookupRetry(status, () => ensureVendorUsageStats());
                return;
            }
            panel.innerHTML = vendors.map(vendor => {
                const usage = vendorUsageFor(vendor);
                const statusClass = `status-${usage.status || 'normal'}`;
                const filterUrl = `/spph?vendor=${encodeURIComponent(vendor)}`;
                return `
                    <div class="vendor-usage-card ${statusClass}">
                        <div class="flex items-start justify-between gap-3">
                            <div class="min-w-0">
                                <div class="vendor-usage-name">${escapedHtml(vendor)}</div>
                                <div class="vendor-usage-meta">
                                    <span class="vendor-usage-pill">SPPH: ${Number(usage.spph_count || 0)}x</span>
                                    <span class="vendor-usage-pill">SP: ${Number(usage.sp_count || 0)}x</span>
                                    <span class="vendor-usage-pill">Terakhir: ${escapedHtml(usage.last_used_label || '-')}</span>
                                    ${usage.last_document ? `<span class="vendor-usage-pill">Dok: ${escapedHtml(usage.last_document)}</span>` : ''}
                                </div>
                            </div>
                            <span class="vendor-usage-count">${Number(usage.total_count || 0)}x total</span>
                        </div>
                        <div class="vendor-usage-hint">${escapedHtml(usage.hint || 'Riwayat vendor siap dipakai untuk audit.')}</div>
                        <a href="${filterUrl}" target="_blank" rel="noopener" class="inline-flex mt-2 text-[11px] font-black text-blue-700 dark:text-blue-300 hover:underline">
                            Lihat riwayat vendor →
                        </a>
                    </div>
                `;
            }).join('');
        }

        function cancelNewVendorSpph() {
            if (spphInlineVendorOperation) return;
            document.getElementById('newVendorBoxSpph')?.classList.add('hidden');
            resetNewVendorSpphForm();
        }

        /* BEGIN SPPH INLINE VENDOR SAVE */
        let spphInlineVendorOperation = null, spphInlineVendorEpoch = 0;
        const spphInlineVendorFields = {
            nama_vendor: ['newSpphVendorNama', 255], alamat: ['newSpphVendorAlamat', 500],
            telepon: ['newSpphVendorTelp', 50], fax: ['newSpphVendorFax', 50], email: ['newSpphVendorEmail', 255],
            npwp: ['newSpphVendorNpwp', 50], direktur: ['newSpphVendorDirektur', 255], jabatan: ['newSpphVendorJabatan', 255]
        };
        function inlineVendorValuesSpph() {
            return Object.fromEntries(Object.entries(spphInlineVendorFields).map(([name, [id]]) => [name, document.getElementById(id).value.trim()]));
        }
        function showInlineVendorListSpph(name) {
            const url = new URL('/vendors', window.location.origin);
            url.searchParams.set('search', name);
            const link = document.createElement('a');
            link.href = url.href; link.target = '_blank'; link.rel = 'noopener';
            link.textContent = 'Periksa daftar vendor di tab baru'; link.className = 'block mt-2 font-semibold underline';
            document.getElementById('newSpphVendorStatus').appendChild(link);
        }
        function releaseInlineVendorSpph(operation) {
            if (spphInlineVendorOperation !== operation) return;
            operation.controls.forEach(([node, disabled]) => { node.disabled = disabled; });
            delete operation.form.dataset.inlineVendorSaving;
            if (operation.busy === null) operation.box.removeAttribute('aria-busy'); else operation.box.setAttribute('aria-busy', operation.busy);
            document.getElementById('newSpphVendorBtnText').textContent = operation.buttonText;
            document.getElementById('newSpphVendorSpinner').classList.toggle('hidden', operation.spinnerHidden);
            spphInlineVendorOperation = null;
        }
        async function inlineVendorRequestSpph(url, body, controller) {
            let timer, onAbort;
            try {
                const cancelled = new Promise((resolve, reject) => {
                    onAbort = () => reject(new DOMException('Penyimpanan belum terkonfirmasi.', 'AbortError'));
                    controller.signal.addEventListener('abort', onAbort, { once: true });
                    if (controller.signal.aborted) onAbort();
                });
                timer = setTimeout(() => controller.abort(), 30000);
                return await Promise.race([cancelled, (async () => {
                    const response = await fetch(url, { method: 'POST', body, signal: controller.signal, cache: 'no-store', credentials: 'same-origin',
                        headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'X-CSRF-TOKEN': SPPH_VENDOR_CSRF_TOKEN } });
                    if (controller.signal.aborted) throw new DOMException('Dibatalkan', 'AbortError');
                    if (response.redirected || !response.headers.get('content-type')?.toLowerCase().includes('application/json')) throw new Error('Unconfirmed vendor response');
                    const data = await response.json();
                    if (controller.signal.aborted) throw new DOMException('Dibatalkan', 'AbortError');
                    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Incomplete vendor response');
                    if (!response.ok) throw Object.assign(new Error('Vendor request rejected'), { status: response.status, fields: response.status === 422 ? data.errors : null });
                    return data;
                })()]);
            } finally {
                clearTimeout(timer);
                if (onAbort) controller.signal.removeEventListener('abort', onAbort);
            }
        }
        async function saveNewVendorSpph() {
            const form = document.getElementById('addForm'), box = document.getElementById('newVendorBoxSpph');
            if (spphInlineVendorOperation || form.dataset.procurementSaving === 'true' || box.classList.contains('hidden')) return;
            Object.values(spphInlineVendorFields).forEach(([id]) => document.getElementById(id).removeAttribute('aria-invalid'));
            const values = inlineVendorValuesSpph();
            let invalid;
            if (!values.nama_vendor) invalid = ['nama_vendor', 'Nama vendor wajib diisi.'];
            for (const [name, [, max]] of Object.entries(spphInlineVendorFields)) {
                if (!invalid && Array.from(values[name]).length > max) invalid = [name, `Maksimal ${max} karakter untuk kolom ini.`];
            }
            if (!invalid && values.email) {
                const emailCheck = document.createElement('input'); emailCheck.type = 'email'; emailCheck.value = values.email;
                if (emailCheck.validity.typeMismatch) invalid = ['email', 'Masukkan alamat email lengkap, misalnya nama@perusahaan.co.id.'];
            }
            if (invalid) {
                const input = document.getElementById(spphInlineVendorFields[invalid[0]][0]);
                input.setAttribute('aria-invalid', 'true'); input.focus(); setNewVendorSpphStatus(invalid[1], 'error'); return;
            }
            let url;
            try { url = new URL(SPPH_VENDOR_STORE_URL, window.location.origin); if (url.origin !== window.location.origin) throw new Error(); }
            catch { setNewVendorSpphStatus('Alamat penyimpanan tidak valid. Muat ulang halaman sebelum mencoba lagi.', 'error'); return; }
            if (!SPPH_VENDOR_CSRF_TOKEN) { setNewVendorSpphStatus('Sesi formulir belum tersedia. Muat ulang halaman sebelum mencoba lagi.', 'error'); return; }
            const body = new FormData();
            body.append('_token', SPPH_VENDOR_CSRF_TOKEN); body.append('is_active', '1');
            Object.entries(values).forEach(([name, value]) => { if (value) body.append(name, value); });
            const operation = { form, box, epoch: spphInlineVendorEpoch, action: form.action, controller: new AbortController(),
                controls: [...new Set([...box.querySelectorAll('input,textarea,button'), ...form.querySelectorAll('button[type="submit"],#vendorSelect,#toggleNewVendorSpph'), ...document.getElementById('addModal').querySelectorAll('button[onclick*="closeModal"]')])].map(node => [node, node.disabled]),
                busy: box.getAttribute('aria-busy'), buttonText: document.getElementById('newSpphVendorBtnText').textContent,
                spinnerHidden: document.getElementById('newSpphVendorSpinner').classList.contains('hidden'), selection: [...($('#vendorSelect').val() || [])] };
            spphInlineVendorOperation = operation; form.dataset.inlineVendorSaving = 'true'; box.setAttribute('aria-busy', 'true');
            operation.controls.forEach(([node]) => { node.disabled = true; });
            document.getElementById('newSpphVendorBtnText').textContent = 'Menyimpan vendor…';
            document.getElementById('newSpphVendorSpinner').classList.remove('hidden');
            setNewVendorSpphStatus('Menunggu konfirmasi penyimpanan vendor…', '');
            let confirmed = false;
            try {
                const data = await inlineVendorRequestSpph(url.href, body, operation.controller);
                if (spphInlineVendorOperation !== operation || operation.epoch !== spphInlineVendorEpoch) return;
                if (!Number.isSafeInteger(data.id) || data.id < 1 || typeof data.nama_vendor !== 'string' || data.nama_vendor !== values.nama_vendor) throw new Error('Mismatched vendor response');
                confirmed = true;
                if (form.action !== operation.action || document.getElementById('addModal').classList.contains('hidden')
                    || JSON.stringify(inlineVendorValuesSpph()) !== JSON.stringify(values) || JSON.stringify($('#vendorSelect').val() || []) !== JSON.stringify(operation.selection)) {
                    setNewVendorSpphStatus('Vendor sudah disimpan. Isian terbaru tetap dipertahankan; pilih vendor melalui daftar.', '');
                    showInlineVendorListSpph(values.nama_vendor); return;
                }
                const select = document.getElementById('vendorSelect');
                if (!Array.from(select.options).some(option => option.value === data.nama_vendor)) select.append(new Option(data.nama_vendor, data.nama_vendor, false, false));
                $('#vendorSelect').val([...new Set([...operation.selection.filter(name => name && name !== '__tambah__'), data.nama_vendor])]).trigger('change');
                releaseInlineVendorSpph(operation);
                box.classList.add('hidden'); resetNewVendorSpphForm();
                Swal.fire({ toast: true, position: 'top-end', icon: 'success', titleText: 'Vendor berhasil ditambahkan', text: data.nama_vendor,
                    showConfirmButton: false, timer: 3000, timerProgressBar: true,
                    background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
            } catch (error) {
                if (spphInlineVendorOperation !== operation || operation.epoch !== spphInlineVendorEpoch) return;
                releaseInlineVendorSpph(operation);
                const messages = { 401: 'Sesi berakhir. Masuk kembali sebelum menyimpan vendor.', 419: 'Sesi formulir berakhir. Periksa daftar vendor lalu muat ulang halaman.',
                    403: 'Anda tidak memiliki akses untuk menambah vendor.', 429: 'Terlalu banyak permintaan. Tunggu sebentar sebelum mencoba lagi.' };
                if (error.status === 422) {
                    let first;
                    for (const [name, [id]] of Object.entries(spphInlineVendorFields)) {
                        const raw = error.fields?.[name], message = Array.isArray(raw) ? raw.find(value => typeof value === 'string' && value.length <= 1000) : null;
                        if (!message) continue;
                        const input = document.getElementById(id); input.setAttribute('aria-invalid', 'true');
                        first ||= { input, message };
                    }
                    setNewVendorSpphStatus(first?.message || 'Periksa isian vendor sebelum mencoba lagi.', 'error'); first?.input.focus();
                } else if (messages[error.status]) setNewVendorSpphStatus(messages[error.status], 'error');
                else {
                    setNewVendorSpphStatus(confirmed ? 'Vendor sudah disimpan. Pilih vendor dari daftar untuk melanjutkan.' : 'Status penyimpanan belum dapat dipastikan. Isian tetap ada. Periksa daftar vendor sebelum menyimpan ulang.', 'error');
                    showInlineVendorListSpph(values.nama_vendor);
                }
            } finally { releaseInlineVendorSpph(operation); }
        }
        window.addEventListener('pagehide', () => {
            spphInlineVendorEpoch++;
            const operation = spphInlineVendorOperation;
            if (!operation) return;
            operation.controller.abort(); releaseInlineVendorSpph(operation);
            setNewVendorSpphStatus('Status penyimpanan belum terkonfirmasi. Periksa daftar vendor sebelum menyimpan ulang.', 'error');
            showInlineVendorListSpph(document.getElementById('newSpphVendorNama').value.trim());
        });
        /* END SPPH INLINE VENDOR SAVE */

        $(document).ready(function () {
            initPpbjSelect2('.ppbj-select', 'ppbjInfo', 'ppbjStatus', 'ppbjInfoContent', () => updatePrFinalValue(), 'addDeskripsi', 'addDeskripsiBadge');
            initPpbjSelect2('.edit-ppbj-select', 'editPpbjInfo', 'editPpbjStatus', 'editPpbjInfoContent', () => updateEditPrFinalValue(), 'editDeskripsi', 'editDeskripsiBadge');

            $('#vendorSelect option[value=""], #vendorSelect option[value="__tambah__"], #editVendor option[value=""]').remove();
            $('#newVendorBox').remove();
            $('#toggleNewVendorSpph').on('click', function () {
                if (spphInlineVendorOperation) return;
                const box = document.getElementById('newVendorBoxSpph');
                if (!box) return;
                box.classList.toggle('hidden');
                if (!box.classList.contains('hidden')) {
                    updateVendorProfileChecklistSpph();
                    setTimeout(() => document.getElementById('newSpphVendorNama')?.focus(), 50);
                }
            });
            $('#newVendorBoxSpph').on('input', 'input, textarea', updateVendorProfileChecklistSpph);

            const cfg = (ph, parent) => {
                const option = {
                    placeholder: ph,
                    allowClear: true,
                    width: '100%',
                    minimumResultsForSearch: 8
                };

                if (parent && parent.length) option.dropdownParent = parent;
                return option;
            };

            const vendorCfg = (ph, parent) => {
                const option = {
                    placeholder: ph,
                    allowClear: true,
                    width: '100%',
                    tags: true,
                    tokenSeparators: ['|'],
                    minimumResultsForSearch: 0,
                    closeOnSelect: false,
                    templateResult: vendorUsageOptionTemplate,
                    templateSelection: vendorUsageSelectionTemplate,
                    escapeMarkup: markup => markup
                };

                if (parent && parent.length) option.dropdownParent = parent;
                return option;
            };

            function initSelect2Safe($el, option) {
                if (!$el || !$el.length) return;

                $el.each(function () {
                    const $item = $(this);

                    if ($item.hasClass('select2-hidden-accessible')) {
                        $item.select2('destroy');
                    }

                    $item.select2(option);
                });
            }

            const $addModal = $('#addModal');
            const $editModal = $('#editModal');

            initSelect2Safe($('.vendor-select'), vendorCfg('-- Pilih satu atau banyak vendor --', $addModal));
            initSelect2Safe($('.pic-select'), cfg('-- Pilih PIC --', $addModal));
            initSelect2Safe($('.edit-vendor-select'), vendorCfg('-- Pilih satu atau banyak vendor --', $editModal));
            initSelect2Safe($('.edit-pic-select'), cfg('-- Pilih PIC --', $editModal));

            $('#vendorSelect').on('change', () => renderVendorUsagePanel('vendorSelect', 'vendorUsagePanel'));
            $('#editVendor').on('change', () => renderVendorUsagePanel('editVendor', 'editVendorUsagePanel'));

            $(document).on('focus', 'select[name$="[satuan]"]', function () {
                this.dataset.previousValue = this.value || '';
            });

            $(document).on('change', 'select[name$="[satuan]"]', function () {
                if (this.value === ADD_SATUAN_VALUE) {
                    quickAddSatuan(this);
                } else {
                    this.dataset.previousValue = this.value || '';
                }
            });

            $(document).on('change', '#addRows input[name$="[tgl_pemenuhan]"], #editRows input[name$="[tgl_pemenuhan]"]', function () {
                syncFulfillmentFromFirst(this);
            });

            // MANUAL INPUT CHECK (ADD)
            $('#nomorPrManual').on('input', function () {
                updatePrFinalValue();
                const val = $(this).val().trim();
                const $s = $('#ppbjStatus');
                const $badge = $('#addDeskripsiBadge');
                const $input = $(this);

                if (!val) { $s.html(''); $badge.addClass('hidden').html(''); $input.css({ 'border-color': '', 'background-color': '' }); return; }

                clearTimeout(window._prManualCheck);
                window._prManualCheck = setTimeout(() => {
                    $.get(PPBJ_CHECK_URL, { ppbj_no: val }, function (d) {
                        if (d.status === 'available') {
                            $s.html(`<div class="p-2 bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-700 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg><div class="text-red-700 dark:text-red-300"><strong class="block text-sm">⚠️ Nomor ini ada di database PPBJ!</strong><p class="text-xs mt-1 text-red-600 dark:text-red-400">Jangan tambahkan manual. Klik tombol <strong class="text-red-800 dark:text-red-200">"📋 Pilih PPBJ"</strong> di atas.</p></div></div></div>`);
                            $input.css({ 'border-color': '#ef4444' }); $badge.addClass('hidden').html('');
                        } else if (d.status === 'already_linked') {
                            $s.html(`<div class="p-2 bg-amber-50 dark:bg-amber-800 border border-amber-200 dark:border-amber-700 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div class="text-amber-700 dark:text-amber-300"><strong class="block text-sm">⚠️ ${d.message}</strong><p class="text-xs mt-1 text-amber-600 dark:text-amber-400">PPBJ ini sudah terhubung dengan SPPH lain.</p></div></div></div>`);
                            $input.css({ 'border-color': '#f59e0b' }); $badge.addClass('hidden').html('');
                        } else if (d.status === 'cancelled') {
                            $s.html(`<div class="p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg><div class="text-red-700 dark:text-red-300"><strong class="block text-sm">❌ ${d.message}</strong></div></div></div>`);
                            $input.css({ 'border-color': '#ef4444' }); $badge.addClass('hidden').html('');
                        } else {
                            $s.html(`<div class="p-2 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg"><div class="flex items-center gap-2"><svg class="w-4 h-4 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span class="text-sm font-semibold text-green-700 dark:text-green-300">📝 Nomor PR manual — aman</span></div></div>`);
                            $input.css({ 'border-color': '#22c55e' }); $badge.addClass('hidden').html('');
                        }
                    }).fail(() => { $s.html(`<div class="p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg"><span class="text-sm text-gray-500 dark:text-gray-400">📝 Tidak bisa memeriksa status</span></div>`); $input.css({ 'border-color': '', 'background-color': '' }); });
                }, 500);
            });

            $('#nomorPrManual').on('blur', function () {
                if (!$(this).val().trim()) { $(this).css({ 'border-color': '', 'background-color': '' }); $('#ppbjStatus').html(''); }
            });

            // MANUAL INPUT CHECK (EDIT)
            $('#editNomorPrManual').on('input', function () {
                updateEditPrFinalValue();
                const val = $(this).val().trim();
                const $s = $('#editPpbjStatus');
                const $badge = $('#editDeskripsiBadge');
                const $input = $(this);

                if (!val) { $s.html(''); $badge.addClass('hidden').html(''); $input.css({ 'border-color': '', 'background-color': '' }); return; }

                clearTimeout(window._editPrManualCheck);
                window._editPrManualCheck = setTimeout(() => {
                    $.get(PPBJ_CHECK_URL, { ppbj_no: val }, function (d) {
                        if (d.status === 'available') {
                            $s.html(`<div class="p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg><div class="text-red-700 dark:text-red-300"><strong class="block text-sm">⚠️ Nomor ini ada di database PPBJ!</strong><p class="text-xs mt-1">Gunakan mode <strong>"Pilih PPBJ"</strong>.</p></div></div></div>`);
                            $input.css({ 'border-color': '#ef4444' }); $badge.addClass('hidden').html('');
                        } else if (d.status === 'already_linked') {
                            $s.html(`<div class="p-2 bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div class="text-amber-700 dark:text-amber-300"><strong class="block text-sm">⚠️ ${d.message}</strong></div></div></div>`);
                            $input.css({ 'border-color': '#f59e0b' }); $badge.addClass('hidden').html('');
                        } else if (d.status === 'cancelled') {
                            $s.html(`<div class="p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg><div class="text-red-700 dark:text-red-300"><strong class="block text-sm">❌ ${d.message}</strong></div></div></div>`);
                            $input.css({ 'border-color': '#ef4444' }); $badge.addClass('hidden').html('');
                        } else {
                            $s.html(`<div class="p-2 bg-green-50 dark:bg-green-950/60 border border-green-200 dark:border-green-800 rounded-lg"><div class="flex items-center gap-2"><svg class="w-4 h-4 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span class="text-sm font-semibold text-green-700 dark:text-green-300">📝 Nomor PR manual — aman</span></div></div>`);
                            $input.css({ 'border-color': '#22c55e' }); $badge.addClass('hidden').html('');
                        }
                    }).fail(() => { $s.html(`<div class="p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg"><span class="text-sm text-gray-500 dark:text-gray-400">📝 Tidak bisa memeriksa</span></div>`); $input.css({ 'border-color': '', 'background-color': '' }); });
                }, 500);
            });

            $('#editNomorPrManual').on('blur', function () {
                if (!$(this).val().trim()) { $(this).css({ 'border-color': '', 'background-color': '' }); $('#editPpbjStatus').html(''); }
            });

            attachCheck('nomorSpphInput', 'nomorStatus', () => 0, 'tanggalSpphInput');
            attachCheck('editNomor', 'editNomorStatus', () => document.getElementById('editId').value || 0, 'editTanggal');
            document.getElementById('tanggalSpphInput')?.addEventListener('change', loadSuggestions);

            function swalThemeSpph() {
                const dark = document.documentElement.classList.contains('dark');
                return {
                    background: dark ? '#0f172a' : '#ffffff',
                    color: dark ? '#f8fafc' : '#111827',
                    confirmButtonColor: '#2563eb'
                };
            }

            function ajaxErrorMessageSpph(data) {
                if (data?.errors) {
                    const first = Object.values(data.errors).flat().find(Boolean);
                    if (first) return first;
                }
                return data?.message || 'Data belum bisa disimpan. Silakan cek kembali isian form.';
            }

            async function submitFormAjaxSpph(form, isEdit = false) {
                if (form.dataset.inlineVendorSaving === 'true') return;
                if (isEdit && (form.dataset.spphItemsState || form.dataset.spphPpbjState) && !ensureSpphEditDataReady(form)) return;
                if (form.dataset.procurementSaving === 'true') return;
                form.dataset.procurementSaving = 'true';
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalHtml = submitBtn ? submitBtn.innerHTML : '';
                const previousInert = form.inert;
                let saved = false, writeStarted = false, saveTimer;
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = 'Menyiapkan simulasi...';
                }

                try {
                    if (window.ProcurementDetails && !await window.ProcurementDetails.beforeSave(form)) return;
                    if (!await window.ProcurementReview.confirm(form, 'spph', isEdit)) return;
                    if (submitBtn) submitBtn.innerHTML = 'Menyimpan...';
                    form.inert = true;
                    const body = new FormData(form);
                    const controller = new AbortController();
                    saveTimer = setTimeout(() => controller.abort(), 90000);
                    writeStarted = true;
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body,
                        signal: controller.signal,
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    });

                    const contentType = response.headers.get('content-type') || '';
                    if (!contentType.includes('application/json') || response.redirected) throw new Error('Unconfirmed save response');
                    const data = await response.json();
                    clearTimeout(saveTimer);
                    saveTimer = undefined;

                    if (response.ok) {
                        if (typeof data?.message !== 'string' || typeof data?.redirect !== 'string') throw new Error('Incomplete save response');
                        saved = true;
                        if (submitBtn) submitBtn.innerHTML = 'Tersimpan';
                        await Swal.fire({
                            title: 'Berhasil disimpan',
                            text: data?.message || 'Data SPPH berhasil disimpan.',
                            icon: 'success',
                            timer: 900,
                            showConfirmButton: false,
                            ...swalThemeSpph()
                        }).then(() => {
                            window.location.href = data?.redirect || window.location.href;
                        });
                        return;
                    }

                    const message = ajaxErrorMessageSpph(data);
                    if (data?.conflict || response.status === 409) {
                        const result = await Swal.fire({
                            title: 'Nomor bentrok / data berubah',
                            html: `<div class="text-left leading-relaxed">${escapedHtml(message)}<br><br><strong>Solusi cepat:</strong> ambil nomor terbaru tanpa menutup form.</div>`,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Ambil Nomor Terbaru',
                            cancelButtonText: 'Tetap di Form',
                            ...swalThemeSpph()
                        });

                        if (result.isConfirmed) {
                            const latest = await applyLatestNumberSpph(isEdit);
                            Swal.fire({
                                title: latest ? 'Nomor terbaru siap dipakai' : 'Saran nomor belum bisa dimuat',
                                text: latest ? `Nomor diganti ke ${latest}. Silakan cek lalu simpan ulang.` : 'Silakan klik saran nomor atau refresh data jika perlu.',
                                icon: latest ? 'success' : 'info',
                                ...swalThemeSpph()
                            });
                        }
                        return;
                    }

                    Swal.fire({
                        title: 'Simpan gagal',
                        text: message,
                        icon: 'error',
                        ...swalThemeSpph()
                    });
                } catch (error) {
                    await Swal.fire({
                        title: saved ? 'Data sudah disimpan' : writeStarted ? 'Periksa status penyimpanan' : 'Persiapan simpan belum selesai',
                        text: saved ? 'Data sudah tersimpan. Buka daftar SPPH untuk melihat hasilnya.' : writeStarted ? 'Status penyimpanan belum dapat dipastikan. Isian tetap ada. Periksa daftar SPPH di tab lain sebelum menyimpan ulang agar tidak membuat data ganda.' : 'Isian form tetap ada. Periksa kembali sebelum mencoba menyimpan.',
                        footer: '<a href="/spph" target="_blank" rel="noopener">Periksa daftar SPPH di tab baru ↗</a>',
                        icon: 'error',
                        ...swalThemeSpph()
                    });
                } finally {
                    if (saveTimer !== undefined) clearTimeout(saveTimer);
                    if (!saved) {
                        form.inert = previousInert;
                        delete form.dataset.procurementSaving;
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalHtml;
                        }
                    }
                }
            }

            document.getElementById('addForm').addEventListener('submit', function (e) {
                if (this.dataset.inlineVendorSaving === 'true') { e.preventDefault(); return; }
                syncAll(this);
                updatePrFinalValue();
                if (document.getElementById('nomorStatus').innerHTML.includes('❌')) {
                    e.preventDefault();
                    Swal.fire({ title: 'Nomor SPPH Duplikat!', icon: 'error', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                    return;
                }
                if (currentPrMode === 'manual') {
                    const manualVal = $('#nomorPrManual').val().trim();
                    const $status = $('#ppbjStatus');
                    if (manualVal && ($status.html().includes('ada di database PPBJ') || $status.html().includes('⚠️') || $status.html().includes('sudah terhubung'))) {
                        e.preventDefault();
                        Swal.fire({ title: '⚠️ Nomor PR Tidak Valid untuk Manual!', html: `Nomor <strong class="font-mono">${escapedHtml(manualVal)}</strong> ada di database PPBJ.<br><br>Gunakan mode <strong>"📋 Pilih PPBJ"</strong>.`, icon: 'warning', confirmButtonColor: '#6366f1', confirmButtonText: 'Mengerti', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                        return;
                    }
                }
                if (document.getElementById('ppbjStatus').innerHTML.includes('❌')) {
                    e.preventDefault();
                    Swal.fire({ title: 'PPBJ Tidak Valid!', icon: 'warning', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                    return;
                }
                e.preventDefault();
                submitFormAjaxSpph(this, false);
            });

            document.getElementById('editForm').addEventListener('submit', function (e) {
                syncAll(this);
                updateEditPrFinalValue();
                e.preventDefault();
                submitFormAjaxSpph(this, true);
            });

            document.getElementById('spphBody').addEventListener('click', function (e) {
                const b = e.target.closest('.badge-nomor');
                if (b) {
                    navigator.clipboard.writeText(b.textContent.trim());
                    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Nomor disalin!', showConfirmButton: false, timer: 1500, background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                }
            });

            window.ProcurementFilters.bind({ apply: doSearch, lockedSearch: () => secureDeleteSearchSnapshot });

            initializeSpphBackground();

            if ('requestIdleCallback' in window) {
                requestIdleCallback(checkOnboardingStatus, { timeout: 6000 });
            } else {
                setTimeout(checkOnboardingStatus, 5000);
            }
        });
