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
        const SATUANS = SPPH_PAGE_CONFIG.satuans || [];
        const SATUAN_STORE_URL = SPPH_PAGE_CONFIG.satuanStoreUrl;
        const ADD_SATUAN_VALUE = '__add_satuan__';
        const VENDOR_USAGE_STATS_URL = SPPH_PAGE_CONFIG.vendorUsageStatsUrl;
        let VENDOR_USAGE_STATS = {};
        let vendorUsageStatsLoaded = false;
        let vendorUsageStatsPromise = null;

        let lastId = Number(SPPH_PAGE_CONFIG.lastId || 0);
        let pollTimer = null, checkTimer = null, searchTimer = null, presTimer = null, hbTimer = null;
        let modalOpen = false, addIdx = 0, editIdx = 5000;
        let currentPrMode = 'ppbj', currentEditPrMode = 'ppbj';
        const IS_FIRST = Boolean(SPPH_PAGE_CONFIG.firstPage);
        const HAS_FILTER = Boolean(SPPH_PAGE_CONFIG.hasFilter);

        // ════════════════════════════════════════════════════════════
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
            const val = currentPrMode === 'ppbj'
                ? ($('#ppbjSelect').val() || '')
                : ($('#nomorPrManual').val() || '').trim();
            $('#nomorPrFinal').val(val);
        }

        function updateEditPrFinalValue() {
            const val = currentEditPrMode === 'ppbj'
                ? ($('#editPpbjSelect').val() || '')
                : ($('#editNomorPrManual').val() || '').trim();
            $('#editNomorPrFinal').val(val);
        }

        // ════════════════════════════════════════════════════════════
        // PR MODE TOGGLE
        // ════════════════════════════════════════════════════════════
        function setPrMode(mode) {
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
                $('#nomorPrManual').val('');
                $('#ppbjSelect').val(null).trigger('change.select2');

                const manualVal = $('#nomorPrManual').val().trim();
                if (manualVal) {
                    $('#nomorPrManual').val('');
                    $('#ppbjSelect').append(new Option(manualVal, manualVal, true, true)).trigger('change');
                } else {
                    $deskripsi.val('');
                    $badge.addClass('hidden').html('');
                    updatePrFinalValue();
                }
            } else {
                $ppbjBox.addClass('hidden');
                $manualBox.removeClass('hidden');
                $btnPpbj.removeClass('active-mode');
                $btnManual.addClass('active-mode');
                $info.addClass('hidden');
                $status.html('');
                $('#nomorPrType').val('manual');

                $('#ppbjSelect').val(null).trigger('change.select2');
                $('#nomorPrManual').val('');
                $('#nomorPrFinal').val('');

                const selectVal = $('#ppbjSelect').val();
                if (selectVal) {
                    const ppbjNo = selectVal;
                    $('#ppbjSelect').val(null).trigger('change');
                    $('#nomorPrManual').val('');
                    $('#nomorPrFinal').val('');

                    $status.html(
                        `<span class="text-red-600 dark:text-red-400 flex items-center gap-1">` +
                        `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">` +
                        `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>` +
                        `</svg>` +
                        `<strong>Peringatan:</strong> Nomor <span class="font-mono">${escapedHtml(ppbjNo)}</span> ada di database PPBJ! ` +
                        `Gunakan mode <strong>"Pilih PPBJ"</strong> agar otomatis terhubung.</span>`
                    );

                    $info.addClass('hidden');
                    $badge.addClass('hidden').html('');

                    const $manualInput = $('#nomorPrManual');
                    $manualInput.css({ 'border-color': '#ef4444', 'background-color': '#fef2f2' });
                    setTimeout(() => { $manualInput.css({ 'border-color': '', 'background-color': '' }); }, 3000);
                } else {
                    $status.html('');
                }
                updatePrFinalValue();
            }
        }

        function setEditPrMode(mode) {
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
                $('#editNomorPrManual').val('');
                $('#editPpbjSelect').val(null).trigger('change.select2');

                const manualVal = $('#editNomorPrManual').val().trim();
                if (manualVal) {
                    $.get(PPBJ_CHECK_URL, { ppbj_no: manualVal }, function (data) {
                        if (data.status === 'available' || data.status === 'already_linked') {
                            $('#editNomorPrManual').val('');
                            const o = new Option(manualVal, manualVal, true, true);
                            o.uraian = data.uraian;
                            o.text = manualVal + (data.uraian ? ' — ' + data.uraian.substring(0, 40) : '');
                            $('#editPpbjSelect').append(o).trigger('change');

                            if ($deskripsi && data.uraian) {
                                $deskripsi.val(data.uraian);
                                showDeskripsiBadge($badge, data.uraian, data.status === 'already_linked');
                            }
                        } else {
                            $('#editNomorPrManual').val('');
                            $('#editPpbjSelect').val(null).trigger('change.select2');
                            $deskripsi.val('');
                            $badge.addClass('hidden').html('');
                            updateEditPrFinalValue();
                        }
                    }).fail(() => {
                        $('#editNomorPrManual').val('');
                        $('#editPpbjSelect').val(null).trigger('change.select2');
                        updateEditPrFinalValue();
                    });
                } else {
                    updateEditPrFinalValue();
                }
            } else {
                $ppbjBox.addClass('hidden');
                $manualBox.removeClass('hidden');
                $btnPpbj.removeClass('active-mode');
                $btnManual.addClass('active-mode');
                $('#editNomorPrType').val('manual');

                $('#editPpbjSelect').val(null).trigger('change.select2');
                $('#editNomorPrManual').val('');
                $('#editNomorPrFinal').val('');

                const selectVal = $('#editPpbjSelect').val();
                if (selectVal) {
                    const ppbjNo = selectVal;
                    $('#editPpbjSelect').val(null).trigger('change.select2');
                    $('#editNomorPrManual').val('');
                    $('#editNomorPrFinal').val('');

                    $status.html(
                        `<span class="text-red-600 dark:text-red-400 flex items-center gap-1">` +
                        `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">` +
                        `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>` +
                        `</svg>` +
                        `<strong>Peringatan:</strong> Nomor <span class="font-mono">${escapedHtml(ppbjNo)}</span> ada di database PPBJ! ` +
                        `Gunakan mode <strong>"Pilih PPBJ"</strong> agar otomatis terhubung.</span>`
                    );

                    $info.addClass('hidden');
                    $badge.addClass('hidden').html('');

                    const $manualInput = $('#editNomorPrManual');
                    $manualInput.css({ 'border-color': '#ef4444', 'background-color': '#fef2f2' });
                    setTimeout(() => { $manualInput.css({ 'border-color': '', 'background-color': '' }); }, 3000);
                } else {
                    $status.html('');
                }
                updateEditPrFinalValue();
            }
        }

        // ════════════════════════════════════════════════════════════
        // PPBJ SELECT2 (✅ SCOPE SUDAH DIPERBAIKI)
        // ════════════════════════════════════════════════════════════
        function initPpbjSelect2(selector, infoBoxId, statusId, contentId, onChangeCb, deskripsiFieldId, badgeContainerId) {
            const $select = $(selector);

            // ✅ FIX: Tambahkan flag untuk mencegah auto-clear saat loading
            let isLoadingEdit = false;

            // Expose method untuk set flag
            if (selector.includes('edit')) {
                window['_editPpbjLoading'] = false;
            }

            $select.select2({
                placeholder: $select.data('placeholder') || 'Pilih No. PPBJ...',
                allowClear: true,
                width: '100%',
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

            $select.on('change', function () {
                const val = $(this).val();
                const $info = $('#' + infoBoxId);
                const $status = $('#' + statusId);
                const $content = $('#' + contentId);
                const $deskripsi = deskripsiFieldId ? $('#' + deskripsiFieldId) : null;
                const $badge = badgeContainerId ? $('#' + badgeContainerId) : null;

                if (onChangeCb) onChangeCb(val);

                if (!val) {
                    $info.addClass('hidden');
                    $status.html('');
                    // ✅ FIX: JANGAN kosongkan deskripsi jika tidak ada nilai yang dipilih
                    // Hanya kosongkan badge, biarkan deskripsi tetap
                    if ($badge) $badge.addClass('hidden').html('');
                    return;
                }

                $status.html('<span class="text-gray-400">🔄 Memeriksa...</span>');

                $.get(PPBJ_CHECK_URL, { ppbj_no: val }, function (data) {
                    $status.html('');
                    if (data.status === 'available') {
                        $status.html('<span class="text-green-600 dark:text-green-400">✅ PPBJ tersedia — akan otomatis terhubung</span>');
                        $info.removeClass('hidden');
                        $content.html(
                            `<div><strong>Uraian:</strong> ${data.uraian || '-'}</div>` +
                            `${data.portofolio ? `<div><strong>Portofolio:</strong> ${data.portofolio}</div>` : ''}` +
                            `${data.buyer ? `<div><strong>Buyer:</strong> ${data.buyer}</div>` : ''}`
                        );
                        // ✅ FIX: Hanya auto-fill deskripsi jika deskripsi KOSONG
                        // Jangan timpa jika sudah ada isi (misal saat edit)
                        if ($deskripsi && data.uraian && !$deskripsi.val().trim()) {
                            $deskripsi.val(data.uraian);
                            showDeskripsiBadge($badge, data.uraian);
                        } else if ($deskripsi && data.uraian && $deskripsi.val().trim()) {
                            // Deskripsi sudah ada isi, tampilkan badge info saja
                            showDeskripsiBadge($badge, data.uraian, true);
                        }
                    } else if (data.status === 'already_linked') {
                        $status.html(`<span class="text-amber-600 dark:text-amber-400">⚠️ ${data.message}</span>`);
                        $info.addClass('hidden');
                        // ✅ FIX: Sama, jangan timpa jika sudah ada isi
                        if ($deskripsi && data.uraian && !$deskripsi.val().trim()) {
                            $deskripsi.val(data.uraian);
                            showDeskripsiBadge($badge, data.uraian, true);
                        }
                    } else if (data.status === 'cancelled') {
                        $status.html(`<span class="text-red-600 dark:text-red-400">❌ ${data.message}</span>`);
                        $info.addClass('hidden');
                    } else {
                        $status.html('<span class="text-blue-600 dark:text-blue-400">📝 Nomor PR manual</span>');
                        $info.addClass('hidden');
                        if ($badge) $badge.addClass('hidden').html('');
                    }
                }).fail(() => {
                    $status.html('<span class="text-red-600">❌ Gagal memeriksa</span>');
                    $info.addClass('hidden');
                });
            });
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
        function doSearch() { const qs = getQS(); window.location.href = qs ? `/spph?${qs}` : '/spph'; }
        function doExport() { const qs = getQS(); window.location.href = qs ? `/spph/export?${qs}` : '/spph/export'; }
        function clearSearch() { document.getElementById('searchInput').value = ''; doSearch(); }
        function clearPic() { document.getElementById('filterPic').value = ''; doSearch(); }
        function clearVendor() { document.getElementById('filterVendor').value = ''; doSearch(); }
        function clearDate() { document.getElementById('dariInput').value = ''; document.getElementById('sampaiInput').value = ''; doSearch(); }
        function setQuickDate(t) {
            const d = document.getElementById('dariInput'), s = document.getElementById('sampaiInput'), n = new Date(), y = n.getFullYear(), m = String(n.getMonth() + 1).padStart(2, '0'), dd = String(n.getDate()).padStart(2, '0');
            if (t === 'today') { d.value = `${y}-${m}-${dd}`; s.value = `${y}-${m}-${dd}`; }
            else if (t === 'month') { d.value = `${y}-${m}-01`; s.value = `${y}-${m}-${new Date(y, n.getMonth() + 1, 0).getDate()}`; }
            else if (t === 'year') { d.value = `${y}-01-01`; s.value = `${y}-12-31`; }
            doSearch();
        }
        function resetDate() { clearDate(); }

        // ════════════════════════════════════════════════════════════
        // MODAL
        // ════════════════════════════════════════════════════════════
        function openModal(id) { document.getElementById(id).classList.remove('hidden'); document.getElementById(id).classList.add('flex'); document.body.style.overflow = 'hidden'; modalOpen = true; startHb(); }
        function closeModal(id) { document.getElementById(id).classList.add('hidden'); document.getElementById(id).classList.remove('flex'); document.body.style.overflow = ''; modalOpen = false; stopHb(); }

        function openAddModal() {
            addIdx = 0;
            document.getElementById('addRows').innerHTML = '';
            addRow('add');
            document.getElementById('addForm').reset();
            document.getElementById('nomorStatus').innerHTML = '';
            $('#vendorSelect').val(null).trigger('change');
            renderVendorUsagePanel('vendorSelect', 'vendorUsagePanel');
            ensureVendorUsageStats().then(() => {
                $('#vendorSelect').trigger('change.select2');
                renderVendorUsagePanel('vendorSelect', 'vendorUsagePanel');
            });
            document.getElementById('newVendorBoxSpph')?.classList.add('hidden');
            resetNewVendorSpphForm();

            $('#addDeskripsi').val('');
            $('#addDeskripsiBadge').addClass('hidden').html('');

            setPrMode('ppbj');
            $('#ppbjSelect').val(null).trigger('change');
            $('#nomorPrManual').val('');
            $('#ppbjInfo').addClass('hidden');
            $('#ppbjStatus').html('');
            $('#nomorPrFinal').val('');
            $('#nomorPrType').val('ppbj');

            for (let k in rtSavedSel) { if (k.startsWith('rt-a-')) delete rtSavedSel[k]; }
            for (let k in sizeDebounce) { if (k.startsWith('rt-a-')) { clearTimeout(sizeDebounce[k]); delete sizeDebounce[k]; } }

            loadSuggestions();
            openModal('addModal');
        }

        async function openEditModal(id, nomor, tgl, nomorPr, vendorNames, deskripsi, pic) {
            ensureVendorUsageStats().then(() => {
                $('#editVendor').trigger('change.select2');
                renderVendorUsagePanel('editVendor', 'editVendorUsagePanel');
            });
            document.getElementById('editForm').action = `/spph/${id}`;
            document.getElementById('editId').value = id;
            document.getElementById('editNomor').value = nomor;
            document.getElementById('editTanggal').value = tgl || '';

            // ✅ FIX: Simpan deskripsi asli dari database
            const originalDeskripsi = deskripsi || '';
            document.getElementById('editDeskripsi').value = originalDeskripsi;

            $('#editDeskripsiBadge').addClass('hidden').html('');

            $('#editPpbjSelect').val(null).trigger('change.select2');
            $('#editNomorPrManual').val('');
            $('#editPpbjInfo').addClass('hidden');
            $('#editPpbjStatus').html('');
            $('#editNomorPrFinal').val('');

            if (nomorPr && nomorPr !== 'null' && nomorPr.trim()) {
                $.get(PPBJ_CHECK_URL, { ppbj_no: nomorPr }, function (data) {
                    if (data.status === 'available' || data.status === 'already_linked') {
                        setEditPrMode('ppbj');

                        const o = new Option(nomorPr, nomorPr, true, true);
                        o.is_ppbj = true;
                        o.text = nomorPr + (data.uraian ? ' — ' + data.uraian.substring(0, 40) : '');
                        o.uraian = data.uraian;
                        $('#editPpbjSelect').append(o).trigger('change');

                        // ✅ FIX: Gunakan uraian PPBJ jika ada, JIKA TIDAK gunakan deskripsi asli dari DB
                        if (data.uraian) {
                            $('#editDeskripsi').val(data.uraian);
                            showDeskripsiBadge($('#editDeskripsiBadge'), data.uraian, data.status === 'already_linked');
                        } else {
                            // ✅ Jika PPBJ tidak punya uraian, PERTAHANKAN deskripsi dari database!
                            $('#editDeskripsi').val(originalDeskripsi);
                        }
                    } else {
                        setEditPrMode('manual');
                        $('#editNomorPrManual').val(nomorPr);
                        updateEditPrFinalValue();

                        // ✅ Pastikan deskripsi tetap dari database
                        $('#editDeskripsi').val(originalDeskripsi);
                    }
                }).fail(() => {
                    setEditPrMode('manual');
                    $('#editNomorPrManual').val(nomorPr);
                    updateEditPrFinalValue();

                    // ✅ Pastikan deskripsi tetap dari database saat gagal
                    $('#editDeskripsi').val(originalDeskripsi);
                });
            } else {
                setEditPrMode('ppbj');
            }

            const $ev = $('#editVendor'), $pc = $('#editPic');
            const vendorsForEdit = Array.isArray(vendorNames) ? vendorNames : [vendorNames].filter(Boolean);
            vendorsForEdit.forEach(vendor => {
                if (vendor && $ev.find(`option[value="${vendor}"]`).length === 0) {
                    $ev.append(new Option(vendor, vendor, true, true));
                }
            });
            $ev.val(vendorsForEdit).trigger('change');
            $pc.val(pic).trigger('change');
            document.getElementById('editNomor').dispatchEvent(new Event('input'));
            editIdx = 5000;
            document.getElementById('editRows').innerHTML = '...';

            for (let k in rtSavedSel) { if (k.startsWith('rt-e-')) delete rtSavedSel[k]; }
            for (let k in sizeDebounce) { if (k.startsWith('rt-e-')) { clearTimeout(sizeDebounce[k]); delete sizeDebounce[k]; } }

            openModal('editModal');
            await loadEditItems(id);
        }

        async function loadEditItems(spphId) {
            try {
                const r = await fetch(`${ITEMS_BASE}${spphId}/items`); const data = await r.json();
                document.getElementById('editRows').innerHTML = '';
                (data.length ? data : [null]).forEach(item => addRow('edit', item));
            } catch { document.getElementById('editRows').innerHTML = '<p class="text-red-500 text-xs p-2">Gagal memuat data barang.</p>'; }
        }

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
            const csrf = document.querySelector('meta[name="csrf-token"]')?.content || SPPH_PAGE_CONFIG.csrfToken || '';

            const result = await Swal.fire({
                icon: 'warning',
                title: `Hapus ${label}?`,
                html: `
                    <div class="secure-delete-stack">
                    <div class="secure-delete-danger">
                        <div class="secure-delete-danger-title">⚠️ Data: ${secureDeleteEscapeHtml(nomor)}</div>
                        <p>Data ${label} akan dihapus permanen. Relasi ke PPBJ akan disesuaikan bila data ini terhubung.</p>
                    </div>
                    <div class="secure-delete-warning">
                        <div class="secure-delete-warning-title">🔐 Verifikasi password</div>
                        <p>Masukkan <strong>password pembuat ${label}</strong>. Untuk data lama tanpa catatan pembuat, gunakan password user yang sedang login.</p>
                    </div>
                    <div class="secure-delete-input-wrap">
                    <label class="secure-delete-password-label" for="secureDeletePassword">Password pembuat ${label}</label>
                    <div class="secure-delete-password-field">
                        <input id="secureDeletePassword" type="password" class="swal2-input" placeholder="Masukkan password pembuat ${label}">
                        <button type="button" id="secureDeleteToggle" class="secure-delete-toggle">Lihat</button>
                    </div>
                    </div>
                    <div class="secure-delete-lock-preview"><p>Jika salah 3 kali, aksi hapus dikunci 15 menit untuk menjaga keamanan data.</p></div>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: `Ya, Hapus ${label}`,
                cancelButtonText: 'Batal',
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#64748b',
                focusConfirm: false,
                customClass: { popup: 'secure-delete-popup' },
                didOpen: () => {
                    const input = document.getElementById('secureDeletePassword');
                    const toggle = document.getElementById('secureDeleteToggle');
                    input?.focus();
                    toggle?.addEventListener('click', () => {
                        input.type = input.type === 'password' ? 'text' : 'password';
                        toggle.textContent = input.type === 'password' ? 'Lihat' : 'Sembunyikan';
                    });
                },
                preConfirm: async () => {
                    const password = document.getElementById('secureDeletePassword')?.value || '';
                    if (!password.trim()) {
                        Swal.showValidationMessage('Password wajib diisi.');
                        return false;
                    }

                    try {
                        const response = await fetch(url, {
                            method: 'DELETE',
                            headers: {
                                'X-CSRF-TOKEN': csrf,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ creator_password: password })
                        });
                        const data = await response.json().catch(() => ({}));

                        if (response.status === 429 && data.locked) {
                            return { locked: true, data };
                        }

                        if (!response.ok) {
                            Swal.showValidationMessage(data.message || `Gagal menghapus ${label}.`);
                            return false;
                        }

                        return { ok: true, data };
                    } catch (error) {
                        Swal.showValidationMessage(`Gagal menghapus ${label}. Periksa koneksi lalu coba lagi.`);
                        return false;
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
            });

            if (!result.isConfirmed || !result.value) return;

            if (result.value.locked) {
                showSecureDeleteLockCountdown(result.value.data.message, result.value.data.retry_after, result.value.data.locked_until);
                return;
            }

            await Swal.fire({
                icon: 'success',
                title: `${label} dihapus`,
                text: result.value.data?.message || `Data ${label} berhasil dihapus.`,
                timer: 1400,
                showConfirmButton: false,
                customClass: { popup: 'secure-delete-popup' }
            });
            window.location.reload();
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
            return `${options}<option value="${ADD_SATUAN_VALUE}">+ Tambah satuan baru...</option>`;
        }

        function normalizeSatuanName(value) {
            return String(value || '').trim().replace(/\s+/g, ' ');
        }

        function refreshSatuanSelects(targetSelect = null, selectedValue = '') {
            document.querySelectorAll('select[name$="[satuan]"]').forEach(select => {
                const keep = select === targetSelect ? selectedValue : select.value;
                select.innerHTML = `<option value="">-- Pilih --</option>${buildSatOpts(keep)}`;
                if (keep && keep !== ADD_SATUAN_VALUE) select.value = keep;
            });
        }

        async function quickAddSatuan(selectEl) {
            const previousValue = selectEl.dataset.previousValue || '';
            const result = await Swal.fire({
                title: 'Tambah satuan baru',
                html: '<div class="text-sm text-slate-600 dark:text-slate-300">Masukkan satuan yang belum ada, misalnya <b>Roll</b>, <b>Lot</b>, atau <b>Dus</b>.</div>',
                input: 'text',
                inputPlaceholder: 'Contoh: Roll',
                showCancelButton: true,
                confirmButtonText: 'Simpan Satuan',
                cancelButtonText: 'Batal',
                customClass: { popup: 'rounded-2xl' },
                inputValidator: value => {
                    const name = normalizeSatuanName(value);
                    if (!name) return 'Nama satuan wajib diisi.';
                    if (name.length > 100) return 'Nama satuan maksimal 100 karakter.';
                    if (SATUANS.some(v => normalizeSatuanName(v).toLowerCase() === name.toLowerCase())) return 'Satuan ini sudah ada.';
                    return null;
                }
            });

            if (!result.isConfirmed) {
                selectEl.value = previousValue;
                return;
            }

            const satuanName = normalizeSatuanName(result.value);

            try {
                const response = await fetch(SATUAN_STORE_URL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || SPPH_PAGE_CONFIG.csrfToken || ''
                    },
                    body: new URLSearchParams({ nama_satuan: satuanName })
                });

                if (!response.ok) {
                    const error = await response.json().catch(() => ({}));
                    throw new Error(error?.message || error?.errors?.nama_satuan?.[0] || 'Satuan gagal disimpan.');
                }

                if (!SATUANS.some(v => normalizeSatuanName(v).toLowerCase() === satuanName.toLowerCase())) {
                    SATUANS.push(satuanName);
                    SATUANS.sort((a, b) => String(a).localeCompare(String(b), 'id', { sensitivity: 'base' }));
                }

                refreshSatuanSelects(selectEl, satuanName);
                Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `Satuan "${satuanName}" ditambahkan`, showConfirmButton: false, timer: 2200 });
            } catch (error) {
                selectEl.value = previousValue;
                Swal.fire('Gagal menambah satuan', error.message || 'Silakan coba lagi.', 'error');
            }
        }

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
        function attachCheck(inputId, statusId, getExcId, dateInputId = null) {
            const inp = document.getElementById(inputId), st = document.getElementById(statusId);
            const runCheck = () => {
                const v = inp.value.trim();
                if (!v) { setStatus(inp, st, null, ''); return; }
                setStatus(inp, st, 'checking', 'Memeriksa...');
                clearTimeout(checkTimer);
                checkTimer = setTimeout(async () => {
                    try {
                        const url = new URL(CHECK_URL, window.location.origin);
                        url.searchParams.set('nomor', v);
                        url.searchParams.set('exclude_id', getExcId());
                        const tanggal = dateInputId ? document.getElementById(dateInputId)?.value : '';
                        if (tanggal) url.searchParams.set('tanggal', tanggal);
                        const r = await fetch(url.toString());
                        const d = await r.json();
                        if (d.normalized_nomor && inp.value.trim() !== d.normalized_nomor) {
                            inp.value = d.normalized_nomor;
                        }
                        if (d.status === 'duplicate') setStatus(inp, st, 'duplicate', d.message);
                        else if (d.warning) setStatus(inp, st, 'warn', d.warning);
                        else {
                            setStatus(inp, st, 'ok', 'Tersedia ✓');
                            setTimeout(() => { if (st.textContent.includes('tersedia')) setStatus(inp, st, null, ''); }, 2000);
                        }
                    } catch { setStatus(inp, st, null, ''); }
                }, 400);
            };
            inp.addEventListener('input', runCheck);
            if (dateInputId) document.getElementById(dateInputId)?.addEventListener('change', runCheck);
        }
        function getSuggestionUrl() { const url = new URL(SUGGEST_URL, window.location.origin); const tanggal = document.getElementById('tanggalSpphInput')?.value; if (tanggal) url.searchParams.set('tanggal', tanggal); return url.toString(); }
        async function loadSuggestions() { const box = document.getElementById('suggBox'); try { const r = await fetch(getSuggestionUrl()), data = await r.json(); box.innerHTML = data.last ? `<span class="text-xs text-gray-400 dark:text-gray-500 mr-1">Terakhir: <span class="font-mono font-semibold">${data.last}</span> →</span>` : '<span class="text-xs text-gray-400 mr-1">Saran:</span>'; data.suggestions.forEach(s => { const p = document.createElement('span'); p.className = 'suggest-pill'; p.textContent = '✨ ' + s; p.onclick = () => { document.getElementById('nomorSpphInput').value = s; document.getElementById('nomorSpphInput').dispatchEvent(new Event('input')); }; box.appendChild(p); }); } catch { box.innerHTML = '<span class="text-xs text-gray-400">Tidak bisa memuat saran</span>'; } }

        // ════════════════════════════════════════════════════════════
        // PRESENCE & HEARTBEAT
        // ════════════════════════════════════════════════════════════
        async function sendPres(url) { try { await fetch(url, { method: 'POST', headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content } }); } catch { } }
        async function pollPres() { try { const r = await fetch(PRESENCE_URL); if (!r.ok) return; const data = await r.json(), bar = document.getElementById('presenceBar'), txt = document.getElementById('presenceText'); if (data.users.length > 0) { txt.innerHTML = data.users.map(u => `<strong>${escapedHtml(u.name)}</strong>`).join(', ') + ' sedang menambahkan SPPH<span class="animate-pulse">...</span>'; bar.classList.remove('hidden'); } else { bar.classList.add('hidden'); } } catch { } }
        function startHb() { if (hbTimer) return; sendPres(PRES_START); hbTimer = setInterval(() => sendPres(PRES_START), 15000); }
        function stopHb() { if (hbTimer) { clearInterval(hbTimer); hbTimer = null; } sendPres(PRES_STOP); }

        // ════════════════════════════════════════════════════════════
        // POLLING
        // ════════════════════════════════════════════════════════════
        async function pollNow() {
            if (!IS_FIRST || HAS_FILTER) return;
            try {
                const r = await fetch(`${POLL_URL}?last_id=${lastId}`, { headers: { 'Accept': 'application/json' } });
                if (!r.ok) return;
                const data = await r.json();
                if (!data.rows?.length) return;

                const tbody = document.getElementById('spphBody');
                document.getElementById('emptyRow')?.remove();
                data.rows.forEach(row => {
                    if (document.querySelector(`tr[data-id="${Number(row.id)}"]`)) return;
                    lastId = Math.max(lastId, Number(row.id));
                    const tr = document.createElement('tr');
                    tr.className = 'tbl-row-hover new-row-flash';
                    tr.dataset.id = Number(row.id);
                    tr.dataset.pic = String(row.pic || '');
                    const vendorCount = Number(row.vendor_count || 1);
                    const vendorBadge = vendorCount > 1 ? `<span class="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 font-semibold mr-1">${vendorCount} vendor</span>` : '';
                    tr.innerHTML = `<td class="px-4 py-3 text-gray-400 text-xs font-mono">—</td><td class="px-4 py-3"><span class="badge-nomor inline-flex items-center px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">${escapedHtml(row.nomor_spph)}</span></td><td class="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">${escapedHtml(row.tanggal || '-')}</td><td class="px-4 py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">${escapedHtml(row.nomor_pr)}</td><td class="px-4 py-3 text-gray-700 dark:text-gray-200 font-medium text-xs">${escapedHtml(row.nama_vendor)}</td><td class="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs max-w-xs truncate">${escapedHtml(row.deskripsi_pengadaan)}</td><td class="px-4 py-3"><span class="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2 py-0.5 rounded-full">${escapedHtml(row.pic)}</span></td><td class="px-4 py-3 text-center"><button type="button" onclick="shareRecordToChat('spph', ${Number(row.id)})" class="px-2 py-1 rounded-lg text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-xs font-semibold" title="Bagikan SPPH ke Chat Tim">💬</button></td>`;
                    if (tr.children[4]) {
                        tr.children[4].innerHTML = vendorBadge + escapedHtml(row.vendor_label || row.nama_vendor);
                    }
                    tbody.insertBefore(tr, tbody.firstChild);
                    Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: `📋 SPPH baru: ${String(row.nomor_spph || '')}`, showConfirmButton: false, timer: 3000, timerProgressBar: true, background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                });
                const c = document.getElementById('totalCount');
                if (c) c.textContent = parseInt(c.textContent) + data.rows.length;
            } catch { }
        }

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
        function buildSpphPrintUrl(url, signer) {
            const printUrl = new URL(url, window.location.origin);
            printUrl.searchParams.set('penandatangan', signer || 'jumelda');
            return printUrl.toString();
        }

        function openSpphPrint(url) {
            const openWithSigner = signer => window.open(buildSpphPrintUrl(url, signer), '_blank', 'noopener');

            if (typeof Swal === 'undefined') {
                openWithSigner(window.confirm('Gunakan tanda tangan Bambang Harwanta?') ? 'bambang' : 'jumelda');
                return;
            }

            Swal.fire({
                title: 'Pilih penandatangan SPPH',
                text: 'Dokumen akan dicetak sesuai penandatangan yang dipilih.',
                icon: 'question',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Jumelda - Kabid',
                denyButtonText: 'Bambang - Kacab',
                cancelButtonText: 'Batal',
                confirmButtonColor: '#0ea5e9',
                denyButtonColor: '#059669',
                background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827',
            }).then(result => {
                if (result.isConfirmed) openWithSigner('jumelda');
                if (result.isDenied) openWithSigner('bambang');
            });
        }

        function openSpphSelectedVendor(select) {
            if (!select.value) return;
            openSpphPrint(select.value);
            select.value = '';
        }

        const SPPH_VENDOR_STORE_URL = SPPH_PAGE_CONFIG.vendorStoreUrl;

        function resetNewVendorSpphForm() {
            ['newSpphVendorNama', 'newSpphVendorAlamat', 'newSpphVendorTelp', 'newSpphVendorFax', 'newSpphVendorEmail', 'newSpphVendorNpwp', 'newSpphVendorDirektur', 'newSpphVendorJabatan'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
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

        function ensureVendorUsageStats() {
            if (vendorUsageStatsLoaded) {
                return Promise.resolve(VENDOR_USAGE_STATS);
            }

            if (!vendorUsageStatsPromise) {
                vendorUsageStatsPromise = fetch(VENDOR_USAGE_STATS_URL, {
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    credentials: 'same-origin'
                }).then(async response => {
                    const data = await response.json().catch(() => ({}));
                    if (!response.ok) {
                        throw new Error(data.message || 'Statistik vendor gagal dimuat.');
                    }

                    VENDOR_USAGE_STATS = data.stats && typeof data.stats === 'object' ? data.stats : {};
                    vendorUsageStatsLoaded = true;
                    return VENDOR_USAGE_STATS;
                }).catch(error => {
                    console.warn('Statistik vendor belum tersedia:', error);
                    return VENDOR_USAGE_STATS;
                }).finally(() => {
                    vendorUsageStatsPromise = null;
                });
            }

            return vendorUsageStatsPromise;
        }

        function vendorUsageFor(name) {
            const key = vendorUsageKey(name);
            return VENDOR_USAGE_STATS[key] || {
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
            return `${Number(usage.total_count || 0)}x`;
        }

        function vendorUsageOptionTemplate(item) {
            if (!item.id) return item.text || '';
            if (item.id === '__tambah__') return $('<span class="font-semibold text-emerald-600 dark:text-emerald-300">').text(item.text || 'Tambah Vendor Baru...');

            const usage = vendorUsageFor(item.id);
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
            document.getElementById('newVendorBoxSpph')?.classList.add('hidden');
            resetNewVendorSpphForm();
        }

        async function saveNewVendorSpph() {
            const nama = document.getElementById('newSpphVendorNama')?.value.trim() || '';
            const alamat = document.getElementById('newSpphVendorAlamat')?.value.trim() || '';
            const telp = document.getElementById('newSpphVendorTelp')?.value.trim() || '';
            const fax = document.getElementById('newSpphVendorFax')?.value.trim() || '';
            const email = document.getElementById('newSpphVendorEmail')?.value.trim() || '';
            const npwp = document.getElementById('newSpphVendorNpwp')?.value.trim() || '';
            const direktur = document.getElementById('newSpphVendorDirektur')?.value.trim() || '';
            const jabatan = document.getElementById('newSpphVendorJabatan')?.value.trim() || '';

            if (!nama) {
                setNewVendorSpphStatus('❌ Nama vendor wajib diisi.', 'error');
                document.getElementById('newSpphVendorNama')?.focus();
                return;
            }

            document.getElementById('newSpphVendorBtnText').textContent = 'Menyimpan...';
            document.getElementById('newSpphVendorSpinner')?.classList.remove('hidden');
            setNewVendorSpphStatus('', '');

            try {
                const fd = new FormData();
                fd.append('_token', document.querySelector('meta[name="csrf-token"]')?.content || SPPH_PAGE_CONFIG.csrfToken || '');
                fd.append('nama_vendor', nama);
                if (alamat) fd.append('alamat', alamat);
                if (telp) fd.append('telepon', telp);
                if (fax) fd.append('fax', fax);
                if (email) fd.append('email', email);
                if (npwp) fd.append('npwp', npwp);
                if (direktur) fd.append('direktur', direktur);
                if (jabatan) fd.append('jabatan', jabatan);
                fd.append('is_active', '1');

                const response = await fetch(SPPH_VENDOR_STORE_URL, {
                    method: 'POST',
                    body: fd,
                    headers: { 'Accept': 'application/json' }
                });
                const data = await response.json();

                if (!response.ok) {
                    const message = data.errors ? Object.values(data.errors).flat().join(', ') : (data.message || 'Gagal menyimpan vendor.');
                    setNewVendorSpphStatus('❌ ' + message, 'error');
                    return;
                }

                const vendorName = data.nama_vendor || nama;
                const $select = $('#vendorSelect');
                const exists = $select.find('option').filter(function () { return this.value === vendorName; }).length > 0;
                if (!exists) {
                    $select.append(new Option(vendorName, vendorName, true, true));
                }
                const currentValues = $select.val() || [];
                if (!currentValues.includes(vendorName)) {
                    currentValues.push(vendorName);
                }
                $select.val(currentValues).trigger('change');

                cancelNewVendorSpph();
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: `✅ Vendor "${vendorName}" berhasil ditambahkan ke SPPH.`,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
                    color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827'
                });
            } catch (error) {
                setNewVendorSpphStatus('❌ Terjadi kesalahan koneksi.', 'error');
            } finally {
                document.getElementById('newSpphVendorBtnText').textContent = '💾 Simpan Vendor';
                document.getElementById('newSpphVendorSpinner')?.classList.add('hidden');
            }
        }

        $(document).ready(function () {
            initPpbjSelect2('.ppbj-select', 'ppbjInfo', 'ppbjStatus', 'ppbjInfoContent', () => updatePrFinalValue(), 'addDeskripsi', 'addDeskripsiBadge');
            initPpbjSelect2('.edit-ppbj-select', 'editPpbjInfo', 'editPpbjStatus', 'editPpbjInfoContent', () => updateEditPrFinalValue(), 'editDeskripsi', 'editDeskripsiBadge');

            $('#vendorSelect option[value=""], #vendorSelect option[value="__tambah__"], #editVendor option[value=""]').remove();
            $('#newVendorBox').remove();
            $('#toggleNewVendorSpph').on('click', function () {
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

            async function applyLatestNumberSpph(isEdit = false) {
                const input = document.getElementById(isEdit ? 'editNomor' : 'nomorSpphInput');
                const status = document.getElementById(isEdit ? 'editNomorStatus' : 'nomorStatus');
                if (!input) return null;

                try {
                    const response = await fetch(getSuggestionUrl(), {
                        headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
                    });
                    const data = await response.json();
                    const latest = data?.suggestions?.[0] || null;
                    if (latest) {
                        input.value = latest;
                        input.dispatchEvent(new Event('input', { bubbles: true }));
                        if (status) {
                            status.innerHTML = '<span class="text-xs font-semibold text-blue-600 dark:text-blue-300">Nomor terbaru dipakai otomatis</span>';
                        }
                    }
                    return latest;
                } catch (error) {
                    return null;
                }
            }

            async function submitFormAjaxSpph(form, isEdit = false) {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalHtml = submitBtn ? submitBtn.innerHTML : '';
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '⏳ Menyimpan...';
                }

                try {
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: new FormData(form),
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    });

                    const contentType = response.headers.get('content-type') || '';
                    const data = contentType.includes('application/json') ? await response.json() : {};

                    if (response.ok) {
                        Swal.fire({
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
                            html: `<div class="text-left leading-relaxed">${message}<br><br><strong>Solusi cepat:</strong> ambil nomor terbaru tanpa menutup form.</div>`,
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
                    Swal.fire({
                        title: 'Koneksi simpan bermasalah',
                        text: 'Form tetap terbuka. Silakan coba lagi, data yang sudah diketik tidak hilang.',
                        icon: 'error',
                        ...swalThemeSpph()
                    });
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalHtml;
                    }
                }
            }

            document.getElementById('addForm').addEventListener('submit', function (e) {
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
                        Swal.fire({ title: '⚠️ Nomor PR Tidak Valid untuk Manual!', html: `Nomor <strong class="font-mono">${manualVal}</strong> ada di database PPBJ.<br><br>Gunakan mode <strong>"📋 Pilih PPBJ"</strong>.`, icon: 'warning', confirmButtonColor: '#6366f1', confirmButtonText: 'Mengerti', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
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

            document.getElementById('searchInput').addEventListener('input', function () {
                document.getElementById('searchSpinner').classList.remove('hidden');
                clearTimeout(searchTimer);
                searchTimer = setTimeout(() => { document.getElementById('searchSpinner').classList.add('hidden'); doSearch(); }, 500);
            });
            document.getElementById('searchInput').addEventListener('keydown', function (e) {
                if (e.key === 'Enter') { e.preventDefault(); clearTimeout(searchTimer); document.getElementById('searchSpinner').classList.add('hidden'); doSearch(); }
            });

            document.getElementById('filterPic').addEventListener('change', doSearch);
            document.getElementById('filterVendor').addEventListener('change', doSearch);
            document.getElementById('dariInput').addEventListener('change', doSearch);
            document.getElementById('sampaiInput').addEventListener('change', doSearch);

            const BACKGROUND_POLL_INTERVAL = 45000;

            function stopBackgroundPolling() {
                clearInterval(pollTimer);
                clearInterval(presTimer);
                pollTimer = null;
                presTimer = null;
            }

            function startBackgroundPolling() {
                if (document.hidden) return;

                if (IS_FIRST && !HAS_FILTER && !pollTimer) {
                    setTimeout(() => { if (!document.hidden) pollNow(); }, 2500);
                    pollTimer = setInterval(pollNow, BACKGROUND_POLL_INTERVAL);
                }

                if (!presTimer) {
                    setTimeout(() => { if (!document.hidden) pollPres(); }, 3000);
                    presTimer = setInterval(pollPres, BACKGROUND_POLL_INTERVAL);
                }
            }

            startBackgroundPolling();
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) stopBackgroundPolling();
                else startBackgroundPolling();
            });
            window.addEventListener('beforeunload', () => {
                if (modalOpen) {
                    const fd = new FormData();
                    fd.append('_token', document.querySelector('meta[name="csrf-token"]').content);
                    navigator.sendBeacon(PRES_STOP, fd);
                }
            });

            checkOnboardingStatus();
        });
