const SP_PAGE_CONFIG = window.SP_PAGE_CONFIG || {};
        const SATUANS = SP_PAGE_CONFIG.satuans || [];
        const SATUAN_STORE_URL = SP_PAGE_CONFIG.satuanStoreUrl;
        const ADD_SATUAN_VALUE = '__add_satuan__';
        const ITEMS_API = '/sp/';
        const CHECK_URL_SP = SP_PAGE_CONFIG.checkUrl;
        const SUGGEST_URL_SP = SP_PAGE_CONFIG.suggestUrl;
        const POLL_URL_SP = SP_PAGE_CONFIG.pollUrl;
        const PRESENCE_URL = SP_PAGE_CONFIG.presenceUrl;
        const PRESENCE_START = SP_PAGE_CONFIG.presenceStartUrl;
        const PRESENCE_STOP = SP_PAGE_CONFIG.presenceStopUrl;
        const PPBJ_OPTIONS_URL = SP_PAGE_CONFIG.ppbjOptionsUrl;
        const PPBJ_CHECK_URL = SP_PAGE_CONFIG.ppbjCheckUrl;
        const VENDOR_SEARCH_URL = SP_PAGE_CONFIG.vendorSearchUrl;
        const ORACLE_MODE_SP = Boolean(SP_PAGE_CONFIG.oracleMode);
        const SP_AUTO_URL = SP_PAGE_CONFIG.autoUrl;
        const SP_ORACLE_URL = SP_PAGE_CONFIG.oracleUrl;

        let lastIdSp = Number(SP_PAGE_CONFIG.lastId || 0);
        let pollTimer = null, checkTimer = null, searchTimer = null, presenceTimer = null, heartbeatTimer = null, modalOpen = false;
        let currentPrMode = 'ppbj', currentEditPrMode = 'ppbj';
        const IS_FIRST_PAGE = Boolean(SP_PAGE_CONFIG.firstPage);
        const HAS_FILTER = Boolean(SP_PAGE_CONFIG.hasFilter);

        // ── FIX BUG 2: Flag untuk mencegah change handler PPBJ menimpa field saat load edit ──
        let _suppressEditPpbjChange = false;

        // ═══════════════════════════════════════
        // PR MODE TOGGLE
        // ═══════════════════════════════════════
        function updatePrFinalValue() {
            const selected = $('#ppbjSelect').val() || [];
            $('#nomorPrFinal').val(currentPrMode === 'ppbj' ? (Array.isArray(selected) ? (selected[0] || '') : selected) : ($('#nomorPrManual').val() || '').trim());
            $('#nomorPrType').val(currentPrMode);
        }
        function updateEditPrFinalValue() {
            const selected = $('#editPpbjSelect').val() || [];
            $('#editNomorPrFinal').val(currentEditPrMode === 'ppbj' ? (Array.isArray(selected) ? (selected[0] || '') : selected) : ($('#editNomorPrManual').val() || '').trim());
            $('#editNomorPrType').val(currentEditPrMode);
        }

        function setPrMode(mode) {
            currentPrMode = mode;
            const $badge = $('#addDeskripsiBadge');
            const $deskripsi = $('#addDeskripsi');
            const $nilaiPrBadge = $('#addNilaiPrBadge');
            const $nilaiPr = $('#nilaiPrInput');

            if (mode === 'ppbj') {
                $('#ppbjModeBox').removeClass('hidden');
                $('#manualModeBox').addClass('hidden');
                $('#btnPpbjMode').addClass('active-mode');
                $('#btnManualMode').removeClass('active-mode');
                $('#nomorPrManual').val('');
                $('#ppbjSelect').val(null).trigger('change');
                if ($deskripsi.length) $deskripsi.val('');
                if ($badge.length) $badge.addClass('hidden').html('');
                if ($nilaiPrBadge.length) $nilaiPrBadge.addClass('hidden').html('');
                if ($nilaiPr.length) $nilaiPr.val('');
                $('#ppbjInfo').addClass('hidden');
                $('#ppbjStatus').html('');
                updatePrFinalValue();
            } else {
                $('#ppbjModeBox').addClass('hidden');
                $('#manualModeBox').removeClass('hidden');
                $('#btnPpbjMode').removeClass('active-mode');
                $('#btnManualMode').addClass('active-mode');
                $('#ppbjInfo').addClass('hidden');
                $('#ppbjStatus').html('');
                if ($badge.length) $badge.addClass('hidden').html('');
                if ($nilaiPrBadge.length) $nilaiPrBadge.addClass('hidden').html('');
                const s = $('#ppbjSelect').val();
                if (s) { $('#ppbjSelect').val(null).trigger('change'); }
                $('#nomorPrManual').val('');
                renderSpphVendorRecommendation('add', [], null);
                updatePrFinalValue();
            }
        }

        function setEditPrMode(mode) {
            currentEditPrMode = mode;
            const $badge = $('#editDeskripsiBadge');
            const $deskripsi = $('#editDeskripsiSp');
            const $nilaiPrBadge = $('#editNilaiPrBadge');
            const $nilaiPr = $('#editNilaiPr');

            if (mode === 'ppbj') {
                $('#editPpbjModeBox').removeClass('hidden');
                $('#editManualModeBox').addClass('hidden');
                $('#editBtnPpbjMode').addClass('active-mode');
                $('#editBtnManualMode').removeClass('active-mode');
                $('#editNomorPrManual').val('');
                $('#editPpbjSelect').val(null).trigger('change');
                if ($deskripsi.length) $deskripsi.val('');
                if ($badge.length) $badge.addClass('hidden').html('');
                if ($nilaiPrBadge.length) $nilaiPrBadge.addClass('hidden').html('');
                if ($nilaiPr.length) $nilaiPr.val('');
                $('#editPpbjInfo').addClass('hidden');
                $('#editPpbjStatus').html('');
                updateEditPrFinalValue();
            } else {
                $('#editPpbjModeBox').addClass('hidden');
                $('#editManualModeBox').removeClass('hidden');
                $('#editBtnPpbjMode').removeClass('active-mode');
                $('#editBtnManualMode').addClass('active-mode');
                $('#editPpbjInfo').addClass('hidden');
                $('#editPpbjStatus').html('');
                if ($badge.length) $badge.addClass('hidden').html('');
                if ($nilaiPrBadge.length) $nilaiPrBadge.addClass('hidden').html('');
                const s = $('#editPpbjSelect').val();
                if (s) { $('#editPpbjSelect').val(null).trigger('change'); }
                $('#editNomorPrManual').val('');
                renderSpphVendorRecommendation('edit', [], null);
                updateEditPrFinalValue();
            }
        }

        // ═══════════════════════════════════════
        // PPBJ SELECT2
        // ═══════════════════════════════════════
        function initPpbjSelect2(selector, infoId, statusId, contentId, onChangeCb, deskripsiId, badgeId) {
            const $sel = $(selector);
            const vendorPrefix = selector === '.edit-sp-ppbj-select' ? 'edit' : 'add';
            $sel.select2({
                placeholder: $sel.data('placeholder') || 'Pilih No. PPBJ...',
                allowClear: true, width: '100%', closeOnSelect: false, maximumSelectionLength: 20, minimumInputLength: 0,
                ajax: { url: PPBJ_OPTIONS_URL, dataType: 'json', delay: 300, data: p => ({ q: p.term || '' }), processResults: d => ({ results: d.results }), cache: true },
                templateResult: item => {
                    if (item.loading) return 'Mencari...';
                    const $c = $('<div>').append($('<strong class="font-mono">').text(item.id));
                    if (item.uraian) $c.append($('<br>')).append($('<small>').text(item.uraian).css({ color: '#6b7280' }));
                    if (!item.has_spph) $c.append(' <span style="color:#f59e0b;font-size:10px">⚠️ Belum SPPH</span>');
                    if (item.spph_vendors && item.spph_vendors.length) $c.append(' <span style="color:#10b981;font-size:10px">✓ ' + item.spph_vendors.length + ' vendor SPPH</span>');
                    return $c;
                },
                templateSelection: item => item.id ? $('<span class="font-mono font-semibold">').text(item.id) : item.text
            });
            $sel.on('change', function (e) {
                // ── FIX BUG 2: Cek flag suppress — abaikan handler saat load edit modal ──
                if (e._suppressCustom) {
                    if (onChangeCb) onChangeCb();
                    return;
                }

                const rawValue = $(this).val();
                const selectedValues = Array.isArray(rawValue) ? rawValue.filter(Boolean) : (rawValue ? [rawValue] : []);
                const val = selectedValues[0] || '';
                const $info = $('#' + infoId), $status = $('#' + statusId), $content = $('#' + contentId);
                const $deskripsi = deskripsiId ? $('#' + deskripsiId) : null;
                const $badge = badgeId ? $('#' + badgeId) : null;
                if (onChangeCb) onChangeCb(selectedValues);
                if (!val) {
                    $info.addClass('hidden'); $status.html('');
                    if ($badge) $badge.addClass('hidden').html('');
                    if ($deskripsi) $deskripsi.val('');
                    const $npb2 = selector === '.sp-ppbj-select' ? $('#addNilaiPrBadge') : $('#editNilaiPrBadge');
                    if ($npb2) $npb2.addClass('hidden').html('');
                    const $npInput2 = selector === '.sp-ppbj-select' ? $('#nilaiPrInput') : $('#editNilaiPr');
                    if ($npInput2) $npInput2.val('');
                    renderSpphVendorRecommendation(vendorPrefix, [], null);
                    resetSpItemsForPr(vendorPrefix === 'edit' ? 'edit' : 'add');
                    return;
                }
                $status.html('<span class="text-gray-400">🔄 Memeriksa...</span>');
                $.get(PPBJ_CHECK_URL, { ppbj_no: val, ppbj_nos: selectedValues }, function (d) {
                    $status.html('');
                    if (d.status === 'available') {
                        $status.html(`<span class="text-green-600 dark:text-green-400">✅ ${escapedHtml(d.message || 'PPBJ tersedia — akan otomatis terhubung')}</span>`);
                        $info.removeClass('hidden');
                        let html = renderPpbjPackageSummary(d);
                        if (d.spph_nomor) html += `<div><strong>SPPH:</strong> <span class="font-mono">${escapedHtml(d.spph_nomor)}</span></div>`;
                        if (d.spph_vendors && d.spph_vendors.length) html += `<div><strong>Vendor SPPH:</strong> ${d.spph_vendors.map(v => escapedHtml(v)).join(', ')}</div>`;
                        if (d.spph_pic) html += `<div><strong>PIC SPPH:</strong> ${escapedHtml(d.spph_pic)}</div>`;
                        if (d.spph_items && d.spph_items.length) html += `<div><strong>Item SPPH:</strong> ${d.spph_items.length} item siap ditarik otomatis ke SP</div>`;
                        if (d.warnings && d.warnings.length) html += `<div class="text-amber-600 dark:text-amber-400">⚠️ ${d.warnings.map(warning => escapedHtml(warning)).join(', ')}</div>`;
                        $content.html(html);
                        renderSpphVendorRecommendation(vendorPrefix, d.spph_vendors || [], d.spph_nomor || null);
                        applySpphAutoFill(vendorPrefix, d);
                        applyPpbjDescription($deskripsi, $badge, d);
                        if (d.total_sebelum_ppn) {
                            const $nilaiPr = selector === '.sp-ppbj-select' ? $('#nilaiPrInput') : $('#editNilaiPr');
                            const $nilaiPrBadge = selector === '.sp-ppbj-select' ? $('#addNilaiPrBadge') : $('#editNilaiPrBadge');
                            if ($nilaiPr.length) {
                                $nilaiPr.val(formatRupiahFromNumber(d.total_sebelum_ppn));
                                showDeskBadge($nilaiPrBadge, 'Rp ' + number_format_dots(d.total_sebelum_ppn));
                            }
                        } else {
                            const $npb = selector === '.sp-ppbj-select' ? $('#addNilaiPrBadge') : $('#editNilaiPrBadge');
                            if ($npb) $npb.addClass('hidden').html('');
                            const $npInput = selector === '.sp-ppbj-select' ? $('#nilaiPrInput') : $('#editNilaiPr');
                            if ($npInput && !d.total_sebelum_ppn) $npInput.val('');
                        }
                    } else if (d.status === 'already_linked') {
                        $status.html(`<span class="text-amber-600 dark:text-amber-400">⚠️ ${d.message}</span>`);
                        $info.removeClass('hidden');
                        let linkedHtml = renderPpbjPackageSummary(d);
                        if (d.spph_nomor) linkedHtml += `<div><strong>SPPH:</strong> <span class="font-mono">${escapedHtml(d.spph_nomor)}</span></div>`;
                        if (d.spph_vendors && d.spph_vendors.length) linkedHtml += `<div><strong>Vendor SPPH:</strong> ${d.spph_vendors.map(v => escapedHtml(v)).join(', ')}</div>`;
                        if (d.spph_pic) linkedHtml += `<div><strong>PIC SPPH:</strong> ${escapedHtml(d.spph_pic)}</div>`;
                        if (d.spph_items && d.spph_items.length) linkedHtml += `<div><strong>Item SPPH:</strong> ${d.spph_items.length} item siap ditarik otomatis ke SP</div>`;
                        $content.html(linkedHtml);
                        renderSpphVendorRecommendation(vendorPrefix, d.spph_vendors || [], d.spph_nomor || null);
                        applySpphAutoFill(vendorPrefix, d);
                        if (!linkedHtml) $info.addClass('hidden');
                        applyPpbjDescription($deskripsi, $badge, d);
                        if (d.total_sebelum_ppn) {
                            const $nilaiPr = selector === '.sp-ppbj-select' ? $('#nilaiPrInput') : $('#editNilaiPr');
                            const $nilaiPrBadge = selector === '.sp-ppbj-select' ? $('#addNilaiPrBadge') : $('#editNilaiPrBadge');
                            if ($nilaiPr.length) {
                                $nilaiPr.val(formatRupiahFromNumber(d.total_sebelum_ppn));
                                showDeskBadge($nilaiPrBadge, 'Rp ' + number_format_dots(d.total_sebelum_ppn));
                            }
                        } else {
                            const $npb = selector === '.sp-ppbj-select' ? $('#addNilaiPrBadge') : $('#editNilaiPrBadge');
                            if ($npb) $npb.addClass('hidden').html('');
                            const $npInput = selector === '.sp-ppbj-select' ? $('#nilaiPrInput') : $('#editNilaiPr');
                            if ($npInput && !d.total_sebelum_ppn) $npInput.val('');
                        }
                    } else if (d.status === 'cancelled') {
                        $status.html(`<span class="text-red-600 dark:text-red-400">❌ ${d.message}</span>`); $info.addClass('hidden');
                        renderSpphVendorRecommendation(vendorPrefix, [], null);
                    } else { $status.html('<span class="text-blue-600">📝 Manual</span>'); $info.addClass('hidden'); if ($badge) $badge.addClass('hidden').html(''); renderSpphVendorRecommendation(vendorPrefix, [], null); }
                }).fail(() => { $status.html('<span class="text-red-600">❌ Gagal</span>'); $info.addClass('hidden'); renderSpphVendorRecommendation(vendorPrefix, [], null); });
            });
        }

        function showDeskBadge($b, uraian, existing) {
            if (!$b) return;
            const t = uraian.length > 50 ? uraian.substring(0, 50) + '...' : uraian;
            const l = existing ? 'ℹ️ Deskripsi sudah ada' : '✨ Auto-filled dari PPBJ';
            $b.html(`<span class="deskripsi-autofill-badge"><span>${l}: "${escapedHtml(t)}"</span><button type="button" onclick="$(this).closest('.deskripsi-autofill-badge').remove()" title="Hapus">✕</button></span>`).removeClass('hidden');
        }
        function escapedHtml(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

        function renderPpbjPackageSummary(data) {
            const items = Array.isArray(data.package_items) ? data.package_items : [];
            if (!items.length) {
                let html = `<div><strong>Uraian:</strong> ${escapedHtml(data.uraian || '-')}</div>`;
                if (data.portofolio) html += `<div><strong>Portofolio:</strong> ${escapedHtml(data.portofolio)}</div>`;
                if (data.buyer) html += `<div><strong>Buyer:</strong> ${escapedHtml(data.buyer)}</div>`;
                return html;
            }

            let html = `<div class="rounded-xl border border-blue-200 bg-blue-50/80 p-3 dark:border-blue-800 dark:bg-blue-950/30">` +
                `<div class="mb-2 flex flex-wrap items-center justify-between gap-2">` +
                `<strong>Paket ${items.length} PPBJ</strong>` +
                `<span class="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">Total estimasi Rp ${number_format_dots(data.total_sebelum_ppn || 0)}</span>` +
                `</div><div class="space-y-2">`;

            items.forEach((item, index) => {
                html += `<div class="rounded-lg border border-blue-100 bg-white/90 p-2 dark:border-slate-700 dark:bg-slate-900/70">` +
                    `<div class="font-mono text-xs font-bold text-blue-700 dark:text-blue-300">${index + 1}. ${escapedHtml(item.ppbj_no)}</div>` +
                    `<div class="text-xs text-slate-700 dark:text-slate-200">${escapedHtml(item.uraian || 'Tanpa uraian')}</div>` +
                    `<div class="mt-1 text-[11px] text-slate-500 dark:text-slate-400">${escapedHtml(item.portofolio || 'Tanpa portofolio')} · ${escapedHtml(item.buyer || 'Buyer belum ditentukan')} · Rp ${number_format_dots(item.nilai || 0)}</div>` +
                    `</div>`;
            });

            return html + `</div><div class="mt-2 text-[11px] font-semibold text-blue-700 dark:text-blue-300">PPBJ pertama menjadi referensi utama dokumen.</div></div>`;
        }

        function applyPpbjDescription($field, $badge, data) {
            if (!$field || !$field.length) return;
            const candidate = String(data.merged_description || data.uraian || '').trim();
            if (!candidate) return;

            const current = String($field.val() || '').trim();
            const previousAutoValue = String($field.data('ppbjAutoValue') || '').trim();
            if (!current || current === previousAutoValue) {
                $field.val(candidate).data('ppbjAutoValue', candidate);
                showDeskBadge($badge, candidate);
            } else {
                showDeskBadge($badge, candidate, true);
            }
        }

        const spphVendorState = {
            add: { vendors: [], spphNomor: null },
            edit: { vendors: [], spphNomor: null }
        };

        function normalizeVendorName(value) {
            return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
        }

        function getSelectedVendorForPrefix(prefix) {
            return prefix === 'edit' ? ($('#editVendorSp').val() || '') : ($('#vendorSelectSp').val() || '');
        }

        function getVendorRecommendationTarget(prefix) {
            return prefix === 'edit' ? $('#editSpphVendorRecommendation') : $('#addSpphVendorRecommendation');
        }

        function selectRecommendedSpphVendor(prefix, vendor) {
            const selector = prefix === 'edit' ? '#editVendorSp' : '#vendorSelectSp';
            const $select = $(selector);
            let vendorOptionExists = false;
            $select.find('option').each(function () {
                if (String(this.value) === String(vendor)) vendorOptionExists = true;
            });

            if (!vendorOptionExists) {
                const marker = prefix === 'edit' ? null : $select.find('option[value="__tambah__"]');
                const option = new Option(vendor, vendor, true, true);
                if (marker && marker.length) marker.before(option); else $select.append(option);
            }
            $select.val(vendor).trigger('change');
            const input = document.getElementById(prefix === 'edit' ? 'editVendorMismatchConfirmed' : 'addVendorMismatchConfirmed');
            if (input) input.value = '0';
        }

        function ensureSelectHasValue(selector, value) {
            const cleanValue = String(value || '').trim();
            if (!cleanValue) return;

            const $select = $(selector);
            if (!$select.length) return;

            let exists = false;
            $select.find('option').each(function () {
                if (String(this.value) === cleanValue) exists = true;
            });

            if (!exists) {
                $select.append(new Option(cleanValue, cleanValue, false, false));
            }

            $select.val(cleanValue).trigger('change');
        }

        function autoFillPicFromSpph(prefix, pic) {
            const cleanPic = String(pic || '').trim();
            if (!cleanPic) return;
            ensureSelectHasValue(prefix === 'edit' ? '#editPicSp' : '.pic-select-sp', cleanPic);
        }

        function autoFillVendorFromSpph(prefix, vendors) {
            const cleanVendors = Array.isArray(vendors)
                ? vendors.map(v => String(v || '').trim()).filter(Boolean)
                : [];

            if (cleanVendors.length === 1) {
                selectRecommendedSpphVendor(prefix, cleanVendors[0]);
            }
        }

        function hasMeaningfulSpItems(mode) {
            const wrapper = document.getElementById(mode === 'edit' ? 'editRows' : 'addRows');
            if (!wrapper) return false;

            return Array.from(wrapper.querySelectorAll('.item-row')).some(row => {
                const editor = row.querySelector('.rt-editor');
                const editorText = (editor?.innerText || '').trim();
                const editorHtml = (editor?.innerHTML || '')
                    .replace(/<br\s*\/?>/gi, '')
                    .replace(/&nbsp;/g, '')
                    .trim();
                const satuan = row.querySelector('select[name$="[satuan]"]')?.value || '';
                const jumlah = row.querySelector('input[name$="[jumlah]"]')?.value || '';
                const harga = row.querySelector('input[name$="[harga_satuan]"]')?.value || '';

                return Boolean(editorText || editorHtml || satuan || jumlah || harga);
            });
        }

        function resetSpItemsForPr(mode) {
            const wrapper = document.getElementById(mode === 'edit' ? 'editRows' : 'addRows');
            if (!wrapper) return;

            wrapper.innerHTML = '';
            addRow(mode, null);
            updateGrandTotal(mode);
        }

        function autoFillItemsFromSpph(mode, items, forceSync = false) {
            const rows = Array.isArray(items)
                ? items.filter(item => item && (item.nama_barang || item.satuan || item.jumlah))
                : [];
            const wrapper = document.getElementById(mode === 'edit' ? 'editRows' : 'addRows');

            if (!wrapper) return;

            if (!rows.length) {
                if (forceSync) resetSpItemsForPr(mode);
                return;
            }

            if (!forceSync && hasMeaningfulSpItems(mode)) return;

            wrapper.innerHTML = '';
            rows.forEach(item => addRow(mode, {
                nama_barang: item.nama_barang || '',
                satuan: item.satuan || '',
                jumlah: item.jumlah || '',
                harga_satuan: item.harga_satuan || '',
                subtotal: item.subtotal || 0
            }));
            syncSingleItemPriceFromNilaiSp(mode, true);
            updateGrandTotal(mode);
        }

        function applySpphAutoFill(prefix, data) {
            const mode = prefix === 'edit' ? 'edit' : 'add';
            autoFillPicFromSpph(prefix, data?.spph_pic);
            autoFillVendorFromSpph(prefix, data?.spph_vendors || []);
            autoFillItemsFromSpph(mode, data?.spph_items || [], true);
        }

        function renderSpphVendorRecommendation(prefix, vendors, spphNomor) {
            const $box = getVendorRecommendationTarget(prefix);
            spphVendorState[prefix] = {
                vendors: Array.isArray(vendors) ? vendors.filter(Boolean) : [],
                spphNomor: spphNomor || null
            };
            const input = document.getElementById(prefix === 'edit' ? 'editVendorMismatchConfirmed' : 'addVendorMismatchConfirmed');
            if (input) input.value = '0';

            if (!$box.length || !spphVendorState[prefix].vendors.length) {
                $box.addClass('hidden').html('');
                return;
            }

            const selected = normalizeVendorName(getSelectedVendorForPrefix(prefix));
            const isMatched = selected && spphVendorState[prefix].vendors.some(v => normalizeVendorName(v) === selected);
            const badgeClass = isMatched
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-100'
                : selected
                    ? 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100'
                    : 'border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-700 dark:bg-sky-900/30 dark:text-sky-100';

            const vendorButtons = spphVendorState[prefix].vendors.map(v => `
                <button type="button"
                    data-spph-vendor="${escapedHtml(v)}"
                    data-spph-prefix="${prefix}"
                    class="rounded-full border border-current/20 bg-white/70 dark:bg-slate-950/30 px-2.5 py-1 text-[11px] font-extrabold hover:scale-[1.02] transition">
                    ${escapedHtml(v)}
                </button>
            `).join('');

            $box.removeClass('hidden').html(`
                <div class="rounded-2xl border ${badgeClass} p-3 shadow-sm">
                    <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <div class="text-xs font-black uppercase tracking-wide">Rekomendasi vendor dari SPPH</div>
                            <div class="mt-0.5 text-[11px] font-semibold opacity-80">
                                ${spphNomor ? `SPPH: <span class="font-mono">${escapedHtml(spphNomor)}</span>` : 'Vendor ini tercatat pada SPPH terkait.'}
                            </div>
                        </div>
                        <span class="rounded-full px-2 py-1 text-[10px] font-black ${isMatched ? 'bg-emerald-600 text-white' : selected ? 'bg-amber-500 text-white' : 'bg-sky-600 text-white'}">
                            ${isMatched ? 'Sesuai' : selected ? 'Perlu konfirmasi' : 'Pilih salah satu'}
                        </span>
                    </div>
                    <div class="mt-2 flex flex-wrap gap-1.5">${vendorButtons}</div>
                    ${selected && !isMatched ? '<div class="mt-2 text-[11px] font-bold">Vendor yang dipilih berbeda dari SPPH. Sistem akan minta konfirmasi sebelum disimpan.</div>' : ''}
                </div>
            `);
        }

        function updateSpphVendorRecommendation(prefix) {
            renderSpphVendorRecommendation(prefix, spphVendorState[prefix].vendors, spphVendorState[prefix].spphNomor);
        }

        function confirmVendorMismatchBeforeSubmit(prefix, form, event) {
            const state = spphVendorState[prefix] || { vendors: [] };
            if (!state.vendors || !state.vendors.length) return false;
            const input = document.getElementById(prefix === 'edit' ? 'editVendorMismatchConfirmed' : 'addVendorMismatchConfirmed');
            if (input && input.value === '1') return false;

            const selectedVendor = getSelectedVendorForPrefix(prefix);
            const isMatched = state.vendors.some(v => normalizeVendorName(v) === normalizeVendorName(selectedVendor));
            if (!selectedVendor || isMatched) return false;

            event.preventDefault();
            Swal.fire({
                icon: 'warning',
                title: 'Vendor berbeda dari SPPH',
                html: `
                    <div class="text-left text-sm leading-relaxed">
                        <p class="mb-2">Vendor yang dipilih: <strong>${escapedHtml(selectedVendor)}</strong></p>
                        <p class="mb-2">Vendor pada SPPH ${state.spphNomor ? `<strong>${escapedHtml(state.spphNomor)}</strong>` : 'terkait'}:</p>
                        <ul class="list-disc pl-5">${state.vendors.map(v => `<li><strong>${escapedHtml(v)}</strong></li>`).join('')}</ul>
                        <p class="mt-3">Apakah Anda yakin tetap memilih vendor yang berbeda?</p>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'Ya, tetap simpan',
                cancelButtonText: 'Pilih ulang vendor',
                confirmButtonColor: '#f59e0b',
                background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#111827'
            }).then(result => {
                if (result.isConfirmed) {
                    if (input) input.value = '1';
                    form.requestSubmit();
                }
            });
            return true;
        }

        // ═══════════════════════════════════════
        // FILTER HELPERS
        // ═══════════════════════════════════════
        function getFilterParams() { const p = new URLSearchParams(); const q = document.getElementById('searchInput').value.trim(); const pic = document.getElementById('filterPic').value; const d = document.getElementById('dariInput').value; const s = document.getElementById('sampaiInput').value; if (q) p.set('search', q); if (pic) p.set('pic', pic); if (d) p.set('dari', d); if (s) p.set('sampai', s); if (ORACLE_MODE_SP) p.set('mode', 'oracle'); return p.toString(); }
        function doSearch() { const qs = getFilterParams(); window.location.href = qs ? `/sp?${qs}` : '/sp'; }
        function doExport() { const qs = getFilterParams(); window.location.href = qs ? `/sp/export?${qs}` : '/sp/export'; }
        function clearSearch() { document.getElementById('searchInput').value = ''; doSearch(); }
        function clearPic() { document.getElementById('filterPic').value = ''; doSearch(); }
        function clearDate() { document.getElementById('dariInput').value = ''; document.getElementById('sampaiInput').value = ''; doSearch(); }
        function setQuickDate(t) { const dr = document.getElementById('dariInput'), sp = document.getElementById('sampaiInput'), n = new Date(), y = n.getFullYear(), m = String(n.getMonth() + 1).padStart(2, '0'), d = String(n.getDate()).padStart(2, '0'); if (t === 'today') { dr.value = `${y}-${m}-${d}`; sp.value = `${y}-${m}-${d}`; } else if (t === 'month') { dr.value = `${y}-${m}-01`; sp.value = `${y}-${m}-${new Date(y, n.getMonth() + 1, 0).getDate()}`; } else if (t === 'year') { dr.value = `${y}-01-01`; sp.value = `${y}-12-31`; } doSearch(); }
        function resetDate() { clearDate(); }

        // ═══════════════════════════════════════
        // PRESENCE
        // ═══════════════════════════════════════
        async function sendPresence(a) { try { await fetch(a, { method: 'POST', headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content } }); } catch { } }
        async function pollPresence() { try { const r = await fetch(PRESENCE_URL); if (!r.ok) return; const d = await r.json(); const b = document.getElementById('presenceBar'), t = document.getElementById('presenceText'); if (d.users.length > 0) { t.innerHTML = d.users.map(u => `<strong>${escapedHtml(u.name)}</strong>`).join(', ') + ' sedang menambahkan SP<span class="animate-pulse">...</span>'; b.classList.remove('hidden'); } else b.classList.add('hidden'); } catch { } }
        function startHeartbeat() { if (heartbeatTimer) return; sendPresence(PRESENCE_START); heartbeatTimer = setInterval(() => sendPresence(PRESENCE_START), 15000); }
        function stopHeartbeat() { if (heartbeatTimer) { clearInterval(heartbeatTimer); heartbeatTimer = null; } sendPresence(PRESENCE_STOP); }

        // ═══════════════════════════════════════
        // MODAL
        // ═══════════════════════════════════════
        function openModal(id) {
            const modal = document.getElementById(id);
            if (!modal) return;

            modal.classList.remove('hidden');
            modal.classList.add('flex');
            modal.scrollTop = 0;

            const scrollArea = modal.querySelector('.overflow-y-auto');
            if (scrollArea) scrollArea.scrollTop = 0;

            document.body.style.overflow = 'hidden';
            modalOpen = true;
            startHeartbeat();
        }
        function closeModal(id) { document.getElementById(id).classList.add('hidden'); document.getElementById(id).classList.remove('flex'); document.body.style.overflow = ''; modalOpen = false; stopHeartbeat(); }
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
            const csrf = document.querySelector('meta[name="csrf-token"]')?.content || SP_PAGE_CONFIG.csrfToken || '';

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

        document.getElementById('spBody').addEventListener('click', function (e) {
            const b = e.target.closest('.badge-sp');
            if (b) { navigator.clipboard.writeText(b.textContent.trim()); Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Nomor disalin!', showConfirmButton: false, timer: 1500, background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' }); }
        });

        // ═══════════════════════════════════════
        // RUPIAH FORMAT
        // ═══════════════════════════════════════
        function formatRupiah(v) { let n = v.replace(/\D/g, ''); if (n === '') return ''; n = n.replace(/^0+/, '') || '0'; return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
        function stripRupiah(v) { return v.replace(/\./g, '') || ''; }
        function formatRupiahFromNumber(n) { if (!n || n === 0) return ''; return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
        function number_format_dots(n) { if (!n && n !== 0) return '-'; return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
        function initRupiahInput(id) { const el = document.getElementById(id); el.addEventListener('input', function () { const p = this.selectionStart, o = this.value.length; this.value = formatRupiah(this.value); this.setSelectionRange(p + this.value.length - o, p + this.value.length - o); }); el.addEventListener('paste', function () { setTimeout(() => { this.value = formatRupiah(this.value); }, 0); }); }

        function calculateJampelFromNilaiSpInput(inputId) {
            const el = document.getElementById(inputId);
            if (!el) return 0;
            const nilaiSp = parseFloat(stripRupiah(el.value || '0')) || 0;
            const totalDenganPpn = nilaiSp + (nilaiSp * 0.11);
            return Math.round(totalDenganPpn * 0.05);
        }

        function updateJampelPreview(prefix) {
            const inputId = prefix === 'edit' ? 'editNilaiSp' : 'nilaiSpInput';
            const previewId = prefix === 'edit' ? 'editJampelPreview' : 'addJampelPreview';
            const preview = document.getElementById(previewId);
            if (!preview) return;
            const jampel = calculateJampelFromNilaiSpInput(inputId);
            preview.value = jampel > 0 ? 'Rp ' + number_format_dots(jampel) : '';
        }

        function getSpModeGuardValue(prefix) {
            const inputId = prefix === 'edit' ? 'editNilaiSp' : 'nilaiSpInput';
            const rowsId = prefix === 'edit' ? 'editRows' : 'addRows';
            const inputValue = parseFloat(stripRupiah(document.getElementById(inputId)?.value || '0')) || 0;
            if (inputValue > 0) return inputValue;

            let itemsTotal = 0;
            document.getElementById(rowsId)?.querySelectorAll('.subtotal-value').forEach(el => {
                itemsTotal += parseFloat(el.textContent.replace(/[^\d]/g, '')) || 0;
            });
            return itemsTotal;
        }

        function isCalibrationSpDraft(prefix) {
            const isEdit = prefix === 'edit';
            const descId = isEdit ? 'editDeskripsiSp' : 'addDeskripsi';
            const rowsId = isEdit ? 'editRows' : 'addRows';
            const vendorSelect = document.getElementById(isEdit ? 'editVendorSp' : 'vendorSelectSp');
            const texts = [
                document.getElementById(descId)?.value || '',
                vendorSelect?.value || '',
                vendorSelect?.selectedOptions ? Array.from(vendorSelect.selectedOptions).map(option => option.textContent || '').join(' ') : ''
            ];

            document.getElementById(rowsId)?.querySelectorAll('.rt-editor').forEach(editor => {
                texts.push(editor.textContent || '');
            });

            return texts
                .join(' ')
                .toLowerCase()
                .match(/\b(kalibrasi|calibration|calibrate)\b/) !== null;
        }

        function updateSpModeGuard(prefix) {
            const box = document.getElementById(prefix === 'edit' ? 'editModeGuardSp' : 'addModeGuardSp');
            if (!box) return true;

            const value = getSpModeGuardValue(prefix);
            box.className = 'hidden mt-2 text-xs rounded-xl px-3 py-2 border';
            box.innerHTML = '';

            if (!value) return true;

            if (ORACLE_MODE_SP && value <= 50000000) {
                box.className = 'mt-2 text-xs rounded-xl px-3 py-2 border bg-red-50 dark:bg-red-900/25 border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 font-semibold';
                box.innerHTML = '⚠️ Nilai SP harus di atas Rp50.000.000 karena Anda berada di mode Oracle ERP.';
                return false;
            }

            if (!ORACLE_MODE_SP && value > 50000000) {
                box.className = 'mt-2 text-xs rounded-xl px-3 py-2 border bg-amber-50 dark:bg-amber-900/25 border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-200 font-semibold';
                box.innerHTML = '🕶️ Nilai SP di atas Rp50.000.000 harus dibuat lewat mode Oracle ERP agar tidak tercampur dengan penomoran otomatis.';
                return false;
            }

            if (ORACLE_MODE_SP) {
                box.className = 'mt-2 text-xs rounded-xl px-3 py-2 border bg-emerald-50 dark:bg-emerald-900/25 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-200 font-semibold';
                box.innerHTML = '✅ Nilai sesuai untuk mode Oracle ERP.';
            }

            return true;
        }

        // ═══════════════════════════════════════
        // NOMOR CHECK
        // ═══════════════════════════════════════
        function setStatus(inputEl, statusEl, state, msg) { inputEl.classList.remove('nomor-input-ok', 'nomor-input-error', 'nomor-input-warn'); statusEl.innerHTML = ''; if (!msg) return; const i = { ok: '✅', duplicate: '❌', warn: '⚠️', checking: '🔄' }, c = { ok: 'nomor-status-ok', duplicate: 'nomor-status-error', warn: 'nomor-status-warn', checking: 'text-gray-400' }, b = { ok: 'nomor-input-ok', duplicate: 'nomor-input-error', warn: 'nomor-input-warn' }; if (b[state]) inputEl.classList.add(b[state]); statusEl.innerHTML = `<span class="${c[state] || ''}">${i[state] || ''} ${msg}</span>`; }

        const SP_MODE_DRAFT_KEY = 'simonpr_sp_mode_switch_draft';

        function isDarkModeActive() {
            return document.documentElement.classList.contains('dark');
        }

        function setSpModeGuardBox(box, type, title, body, actionLabel = null, actionMode = null, prefix = 'add') {
            const dark = isDarkModeActive();
            const palettes = {
                danger: {
                    bg: dark ? '#3f1218' : '#fff1f2',
                    border: dark ? '#f87171' : '#fecdd3',
                    title: dark ? '#ffffff' : '#881337',
                    body: dark ? '#fecaca' : '#be123c',
                    iconBg: '#dc2626',
                    buttonBg: '#dc2626',
                    buttonHover: '#b91c1c'
                },
                warning: {
                    bg: dark ? '#3b2a08' : '#fff7ed',
                    border: dark ? '#f59e0b' : '#fed7aa',
                    title: dark ? '#ffffff' : '#7c2d12',
                    body: dark ? '#fde68a' : '#9a3412',
                    iconBg: '#f59e0b',
                    buttonBg: '#f59e0b',
                    buttonHover: '#d97706'
                },
                success: {
                    bg: dark ? '#0f2f25' : '#ecfdf5',
                    border: dark ? '#34d399' : '#a7f3d0',
                    title: dark ? '#ffffff' : '#064e3b',
                    body: dark ? '#bbf7d0' : '#047857',
                    iconBg: '#059669',
                    buttonBg: '#059669',
                    buttonHover: '#047857'
                }
            };
            const palette = palettes[type] || palettes.warning;
            const actionHtml = actionLabel && actionMode
                ? `<button type="button" onclick="switchSpModeWithDraft('${prefix}', '${actionMode}')" class="mt-3 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-extrabold shadow-sm transition text-white" style="background:${palette.buttonBg}" onmouseenter="this.style.background='${palette.buttonHover}'" onmouseleave="this.style.background='${palette.buttonBg}'">
                        <span>↗</span><span>${actionLabel}</span>
                   </button>`
                : '';

            box.className = 'mt-3 rounded-2xl border p-3 shadow-sm transition-all';
            box.style.background = palette.bg;
            box.style.borderColor = palette.border;
            box.style.color = palette.title;
            box.innerHTML = `
                <div class="flex gap-3">
                    <div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style="background:${palette.iconBg}">${type === 'success' ? '✓' : '!'}</div>
                    <div class="min-w-0">
                        <div class="text-sm font-black leading-snug" style="color:${palette.title}">${title}</div>
                        <div class="mt-1 text-xs font-semibold leading-relaxed" style="color:${palette.body}">${body}</div>
                        ${actionHtml}
                    </div>
                </div>
            `;
        }

        function collectSpModeDraft(prefix) {
            const isEdit = prefix === 'edit';
            const val = id => document.getElementById(id)?.value || '';
            const selected = selector => $(selector).val() || '';

            return {
                expiresAt: Date.now() + (10 * 60 * 1000),
                nomor_pr: val(isEdit ? 'editNomorPrFinal' : 'nomorPrFinal') || val(isEdit ? 'editNomorPrManual' : 'nomorPrManual'),
                ppbj_id: selected(isEdit ? '#editPpbjSelect' : '#ppbjSelect'),
                tanggal_sp: val(isEdit ? 'editTanggalSp' : 'tanggalSpInput'),
                nilai_sp: val(isEdit ? 'editNilaiSp' : 'nilaiSpInput'),
                nilai_pr: val(isEdit ? 'editNilaiPr' : 'nilaiPrInput'),
                deskripsi: val(isEdit ? 'editDeskripsiSp' : 'addDeskripsi'),
                sph: val(isEdit ? 'editSph' : 'addSph'),
                tgl_sph: val(isEdit ? 'editTglSph' : 'addTglSph'),
                promised_date: val(isEdit ? 'editPromisedDate' : 'addPromisedDate'),
                rfq: val(isEdit ? 'editRfq' : 'addRfq'),
                nomor_pemenang: val(isEdit ? 'editNomorPemenang' : 'addNomorPemenang'),
                tanggal_pemenang: val(isEdit ? 'editTanggalPemenang' : 'addTanggalPemenang'),
                awal_kontrak: val(isEdit ? 'editAwalKontrak' : 'addAwalKontrak'),
                akhir_kontrak: val(isEdit ? 'editAkhirKontrak' : 'addAkhirKontrak'),
                bidang_ip_itu: val(isEdit ? 'editBidangIpItu' : 'addBidangIpItu'),
                penandatangan_sci: val(isEdit ? 'editPenandatanganSci' : 'addPenandatanganSci'),
                jabatan_sci: val(isEdit ? 'editJabatanSci' : 'addJabatanSci')
            };
        }

        function switchSpModeWithDraft(prefix, mode) {
            try {
                sessionStorage.setItem(SP_MODE_DRAFT_KEY, JSON.stringify(collectSpModeDraft(prefix)));
            } catch (err) {
                console.warn('[SP] gagal menyimpan draft pindah mode:', err);
            }
            window.location.href = mode === 'oracle' ? SP_ORACLE_URL : SP_AUTO_URL;
        }

        function restoreSpModeDraftToAdd() {
            let draft = null;
            try {
                const raw = sessionStorage.getItem(SP_MODE_DRAFT_KEY);
                if (!raw) return;
                draft = JSON.parse(raw);
                sessionStorage.removeItem(SP_MODE_DRAFT_KEY);
            } catch (err) {
                sessionStorage.removeItem(SP_MODE_DRAFT_KEY);
                return;
            }

            if (!draft || !draft.expiresAt || draft.expiresAt < Date.now()) return;
            const set = (id, value) => {
                const el = document.getElementById(id);
                if (el && value !== undefined && value !== null && value !== '') el.value = value;
            };

            set('tanggalSpInput', draft.tanggal_sp);
            set('nilaiSpInput', draft.nilai_sp);
            set('nilaiPrInput', draft.nilai_pr);
            set('addDeskripsi', draft.deskripsi);
            set('addSph', draft.sph);
            set('addTglSph', draft.tgl_sph);
            set('addPromisedDate', draft.promised_date);
            set('addRfq', draft.rfq);
            set('addNomorPemenang', draft.nomor_pemenang);
            set('addTanggalPemenang', draft.tanggal_pemenang);
            set('addAwalKontrak', draft.awal_kontrak);
            set('addAkhirKontrak', draft.akhir_kontrak);
            set('addBidangIpItu', draft.bidang_ip_itu);
            set('addPenandatanganSci', draft.penandatangan_sci);
            set('addJabatanSci', draft.jabatan_sci);

            if (draft.ppbj_id) {
                setPrMode('ppbj');
                $('#ppbjSelect').val(draft.ppbj_id).trigger('change');
            } else if (draft.nomor_pr) {
                setPrMode('manual');
                $('#nomorPrManual').val(draft.nomor_pr);
                $('#nomorPrFinal').val(draft.nomor_pr);
            }

            updateJampelPreview('add');
            updateSpModeGuard('add');
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'info',
                title: 'Draft dipulihkan setelah pindah mode',
                showConfirmButton: false,
                timer: 2600,
                timerProgressBar: true,
                background: isDarkModeActive() ? '#111827' : '#ffffff',
                color: isDarkModeActive() ? '#f9fafb' : '#111827'
            });
        }

        updateSpModeGuard = function (prefix) {
            const box = document.getElementById(prefix === 'edit' ? 'editModeGuardSp' : 'addModeGuardSp');
            if (!box) return true;

            const value = getSpModeGuardValue(prefix);
            box.className = 'hidden mt-2 text-xs rounded-xl px-3 py-2 border';
            box.style.cssText = '';
            box.innerHTML = '';

            if (!value) {
                updateOracleReadinessChecklist(prefix);
                return true;
            }

            if (ORACLE_MODE_SP && value <= 50000000) {
                setSpModeGuardBox(
                    box,
                    'danger',
                    'Nilai belum sesuai untuk Mode Oracle ERP',
                    'Mode Oracle dipakai untuk SP di atas Rp50.000.000. Jika nilai ini memang di bawah batas tersebut, pindahkan ke mode SP Otomatis agar penomoran tetap rapi.',
                    'Kembali ke SP Otomatis',
                    'auto',
                    prefix
                );
                updateOracleReadinessChecklist(prefix);
                return false;
            }

            if (!ORACLE_MODE_SP && value > 50000000 && isCalibrationSpDraft(prefix)) {
                setSpModeGuardBox(
                    box,
                    'success',
                    'Khusus kalibrasi boleh memakai SP biasa',
                    'Nilai di atas Rp50.000.000 terdeteksi sebagai pengadaan kalibrasi, sehingga boleh tetap memakai penomoran SP otomatis sesuai arahan user.'
                );
                updateOracleReadinessChecklist(prefix);
                return true;
            }

            if (!ORACLE_MODE_SP && value > 50000000) {
                setSpModeGuardBox(
                    box,
                    'warning',
                    'Nilai masuk kategori Oracle ERP',
                    'SP di atas Rp50.000.000 sebaiknya memakai nomor dari Oracle ERP. Khusus pengadaan kalibrasi boleh tetap memakai SP biasa. Klik tombol di bawah untuk pindah mode tanpa kehilangan draft yang sudah diisi.',
                    'Pindah ke Mode Oracle',
                    'oracle',
                    prefix
                );
                updateOracleReadinessChecklist(prefix);
                return false;
            }

            if (ORACLE_MODE_SP) {
                setSpModeGuardBox(
                    box,
                    'success',
                    'Nilai sesuai untuk Mode Oracle ERP',
                    'Nomor SP dapat diketik manual sesuai nomor yang diterbitkan dari Oracle. Data tetap masuk ke daftar Oracle dan tidak bercampur dengan SP Otomatis.'
                );
            }

            updateOracleReadinessChecklist(prefix);
            return true;
        };

        function getOracleReadiness(prefix) {
            const isEdit = prefix === 'edit';
            const formSelector = isEdit ? '#editFormSp' : '#addFormSp';
            const nomorSp = document.getElementById(isEdit ? 'editNomorSp' : 'nomorSpInput')?.value?.trim() || '';
            const nilaiSp = getSpModeGuardValue(prefix);
            const nomorPr = document.getElementById(isEdit ? 'editNomorPrFinal' : 'nomorPrFinal')?.value?.trim() || '';
            const vendor = isEdit ? $('#editVendorSp').val() : $('#vendorSelectSp').val();
            const pic = isEdit ? $('#editPicSp').val() : $('.pic-select-sp').val();
            const itemReady = Array.from(document.querySelectorAll(`${isEdit ? '#editRows' : '#addRows'} .rt-editor`))
                .some(editor => (editor.textContent || '').trim().length > 0);

            return [
                { label: 'Nomor SP Oracle sudah diisi manual', ok: nomorSp.length > 0 },
                { label: 'Nilai SP di atas Rp50.000.000', ok: nilaiSp > 50000000 },
                { label: 'Nomor PR/PPBJ sudah terhubung atau diisi', ok: nomorPr.length > 0 },
                { label: 'Vendor dan PIC sudah dipilih', ok: !!vendor && vendor !== '__tambah__' && !!pic },
                { label: 'Minimal 1 item barang/jasa sudah ditulis', ok: itemReady }
            ];
        }

        function updateOracleReadinessChecklist(prefix) {
            if (!ORACLE_MODE_SP) return;
            const box = document.getElementById(prefix === 'edit' ? 'editOracleChecklist' : 'addOracleChecklist');
            if (!box) return;

            const items = getOracleReadiness(prefix);
            const readyCount = items.filter(item => item.ok).length;
            const total = items.length;
            const allReady = readyCount === total;

            box.style.background = isDarkModeActive() ? '#111827' : '#fff7ed';
            box.style.borderColor = allReady ? '#34d399' : '#f59e0b';
            box.style.color = isDarkModeActive() ? '#ffffff' : '#111827';
            box.innerHTML = `
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <div class="text-sm font-black" style="color:${isDarkModeActive() ? '#ffffff' : '#111827'}">Checklist Kesiapan Oracle</div>
                        <div class="mt-1 text-xs font-semibold" style="color:${isDarkModeActive() ? '#fde68a' : '#92400e'}">
                            ${readyCount}/${total} syarat siap. Checklist ini membantu mencegah nomor Oracle salah mode sebelum disimpan.
                        </div>
                    </div>
                    <span class="shrink-0 rounded-full px-3 py-1 text-[11px] font-black" style="background:${allReady ? '#10b981' : '#f59e0b'};color:${allReady ? '#ffffff' : '#111827'}">
                        ${allReady ? 'Siap simpan' : 'Perlu cek'}
                    </span>
                </div>
                <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    ${items.map(item => `
                        <div class="flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold"
                            style="background:${item.ok ? (isDarkModeActive() ? '#064e3b' : '#ecfdf5') : (isDarkModeActive() ? '#1f2937' : '#ffffff')};border-color:${item.ok ? '#34d399' : '#f59e0b'};color:${item.ok ? (isDarkModeActive() ? '#d1fae5' : '#065f46') : (isDarkModeActive() ? '#fef3c7' : '#92400e')}">
                            <span class="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black"
                                style="background:${item.ok ? '#10b981' : '#f59e0b'};color:${item.ok ? '#ffffff' : '#111827'}">${item.ok ? '✓' : '!'}</span>
                            <span>${item.label}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        function getSuggestionUrlSp() { const url = new URL(SUGGEST_URL_SP, window.location.origin); const tanggal = document.getElementById('tanggalSpInput')?.value; if (tanggal) url.searchParams.set('tanggal', tanggal); return url.toString(); }
        async function loadSuggestionsSp() { const box = document.getElementById('suggBoxSp'); try { const r = await fetch(getSuggestionUrlSp()); const d = await r.json(); box.innerHTML = d.last ? `<span class="text-xs text-gray-400 dark:text-gray-500 mr-1">Terakhir: <span class="font-mono font-semibold">${d.last}</span> →</span>` : `<span class="text-xs text-gray-400 mr-1">Saran:</span>`; d.suggestions.forEach(s => { const p = document.createElement('span'); p.className = 'suggest-pill'; p.innerHTML = `✨ ${s}`; p.onclick = () => { document.getElementById('nomorSpInput').value = s; document.getElementById('nomorSpInput').dispatchEvent(new Event('input')); }; box.appendChild(p); }); } catch { box.innerHTML = '<span class="text-xs text-gray-400">Tidak bisa memuat saran</span>'; } }

        getSuggestionUrlSp = function () {
            const url = new URL(SUGGEST_URL_SP, window.location.origin);
            const tanggal = document.getElementById('tanggalSpInput')?.value;
            if (tanggal) url.searchParams.set('tanggal', tanggal);
            if (ORACLE_MODE_SP) url.searchParams.set('oracle_mode', '1');
            return url.toString();
        };

        loadSuggestionsSp = async function () {
            const box = document.getElementById('suggBoxSp');
            if (!box) return;
            if (ORACLE_MODE_SP) {
                box.innerHTML = `<span class="text-xs text-amber-700 dark:text-amber-300 font-semibold bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 rounded-full px-3 py-1">Mode Oracle: nomor SP diketik manual dari ERP</span>`;
                return;
            }

            try {
                const r = await fetch(getSuggestionUrlSp());
                const d = await r.json();
                box.innerHTML = d.last ? `<span class="text-xs text-gray-400 dark:text-gray-500 mr-1">Terakhir: <span class="font-mono font-semibold">${d.last}</span> →</span>` : `<span class="text-xs text-gray-400 mr-1">Saran:</span>`;
                d.suggestions.forEach(s => {
                    const p = document.createElement('span');
                    p.className = 'suggest-pill';
                    p.innerHTML = `✨ ${s}`;
                    p.onclick = () => {
                        document.getElementById('nomorSpInput').value = s;
                        document.getElementById('nomorSpInput').dispatchEvent(new Event('input'));
                    };
                    box.appendChild(p);
                });
            } catch {
                box.innerHTML = '<span class="text-xs text-gray-400">Tidak bisa memuat saran</span>';
            }
        };

        function attachNomorCheck(inputId, statusId, getExcludeId, dateInputId = null) {
            const input = document.getElementById(inputId), status = document.getElementById(statusId);
            const runCheck = () => {
                const v = input.value.trim();
                if (!v) { setStatus(input, status, null, ''); return; }
                setStatus(input, status, 'checking', 'Memeriksa...');
                clearTimeout(checkTimer);
                checkTimer = setTimeout(async () => {
                    try {
                        const url = new URL(CHECK_URL_SP, window.location.origin);
                        url.searchParams.set('nomor', v);
                        url.searchParams.set('exclude_id', getExcludeId());
                        if (ORACLE_MODE_SP) url.searchParams.set('oracle_mode', '1');
                        const tanggal = dateInputId ? document.getElementById(dateInputId)?.value : '';
                        if (tanggal) url.searchParams.set('tanggal', tanggal);
                        const r = await fetch(url.toString());
                        const d = await r.json();
                        if (d.normalized_nomor && input.value.trim() !== d.normalized_nomor) {
                            input.value = d.normalized_nomor;
                        }
                        if (d.status === 'duplicate') setStatus(input, status, 'duplicate', d.message);
                        else if (d.warning) setStatus(input, status, 'warn', d.warning);
                        else {
                            setStatus(input, status, 'ok', 'Tersedia ✓');
                            setTimeout(() => { if (status.textContent.includes('Tersedia')) setStatus(input, status, null, ''); }, 400);
                        }
                    } catch { setStatus(input, status, null, ''); }
                }, 400);
            };
            input.addEventListener('input', runCheck);
            if (dateInputId) document.getElementById(dateInputId)?.addEventListener('change', runCheck);
        }

        // ═══════════════════════════════════════
        // OPEN EDIT MODAL
        // ═══════════════════════════════════════
        function openEditModal(
            id,
            nomor,
            tgl,
            nilaiSp,
            nomorPr,
            nilaiPr,
            vendor,
            deskripsi,
            pic,
            sph,
            tglSph,
            promisedDate,
            rfq,
            nomorPemenang,
            tanggalPemenang,
            awalKontrak,
            akhirKontrak,
            bidangIpItu,
            penandatanganSci,
            jabatanSci,
            linkedPpbjNumbers = []
        ) {
            document.getElementById('editFormSp').action = `/sp/${id}`;
            document.getElementById('editIdSp').value = id;
            document.getElementById('editNomorSp').value = nomor;
            document.getElementById('editTanggalSp').value = tgl || '';
            document.getElementById('editNilaiSp').value = formatRupiahFromNumber(nilaiSp);
            document.getElementById('editSph').value = (sph === 'null' || !sph) ? '' : sph;
            document.getElementById('editTglSph').value = tglSph || '';
            document.getElementById('editPromisedDate').value = promisedDate || '';
            document.getElementById('editRfq').value = rfq || '';
            document.getElementById('editNomorPemenang').value = nomorPemenang || '';
            document.getElementById('editTanggalPemenang').value = tanggalPemenang || '';
            document.getElementById('editAwalKontrak').value = awalKontrak || '';
            document.getElementById('editAkhirKontrak').value = akhirKontrak || '';
            document.getElementById('editBidangIpItu').value = bidangIpItu || '';
            document.getElementById('editPenandatanganSci').value = penandatanganSci || '';
            document.getElementById('editJabatanSci').value = jabatanSci || '';
            updateJampelPreview('edit');
            updateSpModeGuard('edit');
            document.getElementById('editDeskripsiBadge').classList.add('hidden');
            document.getElementById('editDeskripsiBadge').innerHTML = '';
            document.getElementById('editNilaiPrBadge').classList.add('hidden');
            document.getElementById('editNilaiPrBadge').innerHTML = '';

            editIdx = 5000;
            document.getElementById('editRows').innerHTML = '<div class="text-center py-4 text-gray-400 text-xs animate-pulse">Membuka data...</div>';
            document.getElementById('editSubtotalDisplay').style.display = 'none';
            document.getElementById('editItemCount').textContent = '0 item';

            // ── Reset UI PPBJ tanpa clear field (pakai helper khusus) ──
            _resetEditPpbjUiOnly();

            // ── Isi field SETELAH reset UI, urutan ini penting ──
            document.getElementById('editDeskripsiSp').value = deskripsi;
            document.getElementById('editNilaiPr').value = formatRupiahFromNumber(nilaiPr);

            // Set PPBJ dropdown — hanya untuk tampilan, tidak timpa field
            const editPpbjNumbers = Array.isArray(linkedPpbjNumbers) && linkedPpbjNumbers.length
                ? linkedPpbjNumbers.filter(Boolean)
                : (nomorPr && nomorPr !== 'null' && nomorPr.trim() ? [nomorPr] : []);

            if (editPpbjNumbers.length) {
                nomorPr = editPpbjNumbers[0];
                // Toggle UI ke mode PPBJ (tanpa clear field)
                _switchEditPpbjUiOnly('ppbj');

                $.get(PPBJ_CHECK_URL, { ppbj_no: nomorPr }, function (d) {
                    if (d.status === 'available' || d.status === 'already_linked') {
                        const o = new Option(
                            nomorPr + (d.uraian ? ' — ' + d.uraian.substring(0, 40) : ''),
                            nomorPr, true, true
                        );
                        $('#editPpbjSelect').append(o);
                        editPpbjNumbers.slice(1).forEach(ppbjNo => {
                            if (!$('#editPpbjSelect option[value="' + CSS.escape(ppbjNo) + '"]').length) {
                                $('#editPpbjSelect').append(new Option(ppbjNo, ppbjNo, true, true));
                            }
                        });
                        $('#editPpbjSelect').val(editPpbjNumbers).trigger({ type: 'change', _suppressCustom: true });
                        updateEditPrFinalValue();
                        $('#editPpbjStatus').html('<span class="text-green-600 dark:text-green-400">✅ Terhubung dengan PPBJ</span>');
                        renderSpphVendorRecommendation('edit', d.spph_vendors || [], d.spph_nomor || null);
                    } else {
                        _switchEditPpbjUiOnly('manual');
                        $('#editNomorPrManual').val(nomorPr);
                        updateEditPrFinalValue();
                        renderSpphVendorRecommendation('edit', [], null);
                    }
                }).fail(() => {
                    _switchEditPpbjUiOnly('manual');
                    $('#editNomorPrManual').val(nomorPr);
                    updateEditPrFinalValue();
                    renderSpphVendorRecommendation('edit', [], null);
                });
            } else {
                _switchEditPpbjUiOnly('ppbj');
                $('#editNomorPrFinal').val('');
                renderSpphVendorRecommendation('edit', [], null);
            }

            const $ev = $('#editVendorSp'), $ep = $('#editPicSp');
            if ($ev.find(`option[value="${vendor}"]`).length === 0) {
                $ev.append(new Option(vendor, vendor, true, true));
            }
            $ev.val(vendor).trigger('change');
            $ep.val(pic).trigger('change');
            document.getElementById('editNomorSp').dispatchEvent(new Event('input'));
            openModal('editModal');
            loadEditItems(id);
            setTimeout(() => updateOracleReadinessChecklist('edit'), 150);
        }

        // ── Helper: reset state PPBJ tanpa menyentuh field deskripsi/nilaiPr ──
        function _resetEditPpbjUiOnly() {
            $('#editPpbjSelect').val(null).trigger('change');
            $('#editNomorPrManual').val('');
            $('#editPpbjInfo').addClass('hidden');
            $('#editPpbjStatus').html('');
            $('#editNomorPrFinal').val('');
            $('#editVendorMismatchConfirmed').val('0');
            renderSpphVendorRecommendation('edit', [], null);
        }

        // ── Helper: toggle UI mode PPBJ/manual tanpa clear field ──
        function _switchEditPpbjUiOnly(mode) {
            currentEditPrMode = mode;
            if (mode === 'ppbj') {
                $('#editPpbjModeBox').removeClass('hidden');
                $('#editManualModeBox').addClass('hidden');
                $('#editBtnPpbjMode').addClass('active-mode');
                $('#editBtnManualMode').removeClass('active-mode');
            } else {
                $('#editPpbjModeBox').addClass('hidden');
                $('#editManualModeBox').removeClass('hidden');
                $('#editBtnPpbjMode').removeClass('active-mode');
                $('#editBtnManualMode').addClass('active-mode');
            }
        }

        // ═══════════════════════════════════════
        // POLLING
        // ═══════════════════════════════════════
        async function pollNow() {
            if (!IS_FIRST_PAGE || HAS_FILTER) return;
            try {
                const r = await fetch(`${POLL_URL_SP}?last_id=${lastIdSp}`, { headers: { 'Accept': 'application/json' } });
                if (!r.ok) return;
                const data = await r.json();
                if (data.rows && data.rows.length > 0) {
                    const tbody = document.getElementById('spBody');
                    const empty = document.getElementById('emptyRow');
                    if (empty) empty.remove();
                    data.rows.forEach(row => {
                        if (document.querySelector(`tr[data-id="${row.id}"]`)) return;
                        lastIdSp = Math.max(lastIdSp, row.id);
                        const tr = document.createElement('tr');
                        tr.className = 'tbl-row-hover new-row-flash';
                        tr.dataset.id = row.id;
                        tr.dataset.pic = row.pic;
                        tr.dataset.search = `${row.nomor_sp} ${row.nomor_pr} ${row.nama_vendor} ${row.deskripsi_pengadaan}`.toLowerCase();
                        tr.innerHTML = `
                                                        <td class="px-3 py-3 text-gray-400 text-xs font-mono">—</td>
                                                        <td class="px-3 py-3"><span class="badge-sp inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">${escapedHtml(row.nomor_sp)}</span></td>
                                                        <td class="px-3 py-3 text-gray-600 dark:text-gray-300 text-xs">${escapedHtml(row.tanggal_sp)}</td>
                                                        <td class="px-3 py-3 text-right"><span class="nilai-badge text-emerald-700 dark:text-emerald-400 font-semibold">${escapedHtml(row.nilai_sp)}</span></td>
                                                        <td class="px-3 py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">${escapedHtml(row.nomor_pr)}</td>
                                                        <td class="px-3 py-3 text-right"><span class="nilai-badge text-indigo-600 dark:text-indigo-400">${escapedHtml(row.nilai_pr)}</span></td>
                                                        <td class="px-3 py-3 text-gray-700 dark:text-gray-200 font-medium text-xs">${escapedHtml(row.nama_vendor)}</td>
                                                        <td class="px-3 py-3 text-gray-600 dark:text-gray-300 text-xs max-w-xs truncate">${escapedHtml(row.deskripsi_pengadaan)}</td>
                                                        <td class="px-3 py-3"><span class="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2 py-0.5 rounded-full">${escapedHtml(row.pic)}</span></td>
                                                        <td class="px-3 py-3 text-center"><button type="button" onclick="shareRecordToChat('sp', ${Number(row.id)})" class="px-2 py-1 rounded-lg text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-xs font-semibold" title="Bagikan SP ke Chat Tim">💬</button></td>`;
                        tbody.insertBefore(tr, tbody.firstChild);
                        Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: `📝 SP baru: ${row.nomor_sp}`, showConfirmButton: false, timer: 3000, timerProgressBar: true, background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                    });
                    const c = document.getElementById('totalCount');
                    if (c) c.textContent = parseInt(c.textContent) + data.rows.length;
                }
            } catch { }
        }

        // ═══════════════════════════════════════
        // VENDOR BARU INLINE
        // ═══════════════════════════════════════
        const VENDOR_STORE_URL = SP_PAGE_CONFIG.vendorStoreUrl;
        const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').content;

        function cancelNewVendor() { $('#vendorSelectSp').val('').trigger('change'); document.getElementById('newVendorBoxSp').classList.add('hidden'); resetNewVendorForm(); }
        function resetNewVendorForm() { ['newVendorNama', 'newVendorAlamat', 'newVendorTelp', 'newVendorFax', 'newVendorEmail', 'newVendorNpwp', 'newVendorDirektur', 'newVendorJabatan'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; }); setVendorStatus('', ''); updateVendorProfileChecklistSp(); }
        function setVendorStatus(msg, type) { const el = document.getElementById('newVendorStatus'); if (!msg) { el.classList.add('hidden'); return; } el.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700', 'dark:bg-red-900/30', 'dark:text-red-400', 'dark:bg-green-900/30', 'dark:text-green-400'); if (type === 'error') el.classList.add('bg-red-100', 'dark:bg-red-900/30', 'text-red-700', 'dark:text-red-400'); else el.classList.add('bg-green-100', 'dark:bg-green-900/30', 'text-green-700', 'dark:text-green-400'); el.textContent = msg; }

        function updateVendorProfileChecklistSp() {
            const box = document.getElementById('newVendorChecklistSp');
            const target = box?.querySelector('[data-vendor-checklist-items]');
            if (!target) return;

            const filled = id => (document.getElementById(id)?.value || '').trim().length > 0;
            const checks = [
                ['Nama wajib', filled('newVendorNama')],
                ['Kontak', filled('newVendorTelp') || filled('newVendorEmail')],
                ['NPWP', filled('newVendorNpwp')],
                ['Penanggung jawab', filled('newVendorDirektur') && filled('newVendorJabatan')],
            ];

            target.innerHTML = checks.map(([label, ok]) =>
                `<span class="${ok ? 'text-emerald-700 dark:text-emerald-300 font-black' : 'text-slate-500 dark:text-slate-300'}">${ok ? '✓' : '○'} ${escapedHtml(label)}</span>`
            ).join('');
        }

        async function saveNewVendor() {
            const nama = document.getElementById('newVendorNama').value.trim();
            const alamat = document.getElementById('newVendorAlamat').value.trim();
            const telp = document.getElementById('newVendorTelp').value.trim();
            const fax = document.getElementById('newVendorFax').value.trim();
            const email = document.getElementById('newVendorEmail').value.trim();
            const npwp = document.getElementById('newVendorNpwp').value.trim();
            const direktur = document.getElementById('newVendorDirektur').value.trim();
            const jabatan = document.getElementById('newVendorJabatan').value.trim();
            if (!nama) { setVendorStatus('❌ Nama vendor wajib diisi!', 'error'); document.getElementById('newVendorNama').focus(); return; }
            document.getElementById('newVendorBtnText').textContent = 'Menyimpan...';
            document.getElementById('newVendorSpinner').classList.remove('hidden');
            setVendorStatus('', '');
            try {
                const fd = new FormData();
                fd.append('_token', CSRF_TOKEN);
                fd.append('nama_vendor', nama);
                if (alamat) fd.append('alamat', alamat);
                if (telp) fd.append('telepon', telp);
                if (fax) fd.append('fax', fax);
                if (email) fd.append('email', email);
                if (npwp) fd.append('npwp', npwp);
                if (direktur) fd.append('direktur', direktur);
                if (jabatan) fd.append('jabatan', jabatan);
                fd.append('is_active', '1');
                const res = await fetch(VENDOR_STORE_URL, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } });
                const data = await res.json();
                if (!res.ok) {
                    const msgs = data.errors ? Object.values(data.errors).flat().join(', ') : (data.message || 'Gagal menyimpan vendor.');
                    setVendorStatus('❌ ' + msgs, 'error'); return;
                }
                const newOption = new Option(data.nama_vendor, data.nama_vendor, true, true);
                const $vendorSelectSp = $('#vendorSelectSp');
                const $addVendorMarker = $vendorSelectSp.find('option[value="__tambah__"]');
                if ($addVendorMarker.length) $addVendorMarker.before(newOption); else $vendorSelectSp.append(newOption);
                $('#vendorSelectSp').val(data.nama_vendor).trigger('change');
                document.getElementById('newVendorBoxSp').classList.add('hidden');
                resetNewVendorForm();
                Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `✅ Vendor "${data.nama_vendor}" berhasil ditambahkan!`, showConfirmButton: false, timer: 3000, timerProgressBar: true, background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
            } catch (err) { setVendorStatus('❌ Terjadi kesalahan koneksi.', 'error'); }
            finally { document.getElementById('newVendorBtnText').textContent = '💾 Simpan Vendor'; document.getElementById('newVendorSpinner').classList.add('hidden'); }
        }

        // ═══════════════════════════════════════
        // MANUAL INPUT CHECK (ADD)
        // ═══════════════════════════════════════
        $('#nomorPrManual').on('input', function () {
            updatePrFinalValue();
            const val = $(this).val().trim();
            const $status = $('#ppbjStatus');
            const $badge = $('#addDeskripsiBadge');
            const $input = $(this);
            if (!val) { $status.html(''); $badge.addClass('hidden').html(''); $input.css({ 'border-color': '' }); return; }
            clearTimeout(window._prManualCheck);
            window._prManualCheck = setTimeout(() => {
                $.get(PPBJ_CHECK_URL, { ppbj_no: val }, function (d) {
                    if (d.status === 'available') {
                        $status.html(`<div class="p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg><div class="text-red-700 dark:text-red-300"><strong class="block text-sm">⚠️ Nomor ini ada di database PPBJ!</strong><p class="text-xs mt-1">Gunakan mode <strong>"📋 Pilih PPBJ"</strong> agar otomatis terhubung.</p></div></div></div>`);
                        $input.css({ 'border-color': '#ef4444' });
                        $badge.addClass('hidden').html('');
                    } else if (d.status === 'already_linked') {
                        $status.html(`<div class="p-2 bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div class="text-amber-700 dark:text-amber-300"><strong class="block text-sm">⚠️ ${d.message}</strong></div></div></div>`);
                        $input.css({ 'border-color': '#f59e0b' });
                        $badge.addClass('hidden').html('');
                    } else if (d.status === 'cancelled') {
                        $status.html(`<div class="p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg><div class="text-red-700 dark:text-red-300"><strong class="block text-sm">❌ ${d.message}</strong></div></div></div>`);
                        $input.css({ 'border-color': '#ef4444' });
                    } else {
                        $status.html(`<div class="p-2 bg-green-50 dark:bg-green-950/60 border border-green-200 dark:border-green-800 rounded-lg"><div class="flex items-center gap-2"><svg class="w-4 h-4 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span class="text-sm font-semibold text-green-700 dark:text-green-300">📝 Manual — aman</span></div></div>`);
                        $input.css({ 'border-color': '#22c55e' });
                        $badge.addClass('hidden').html('');
                    }
                }).fail(() => { $status.html('<span class="text-gray-400 text-sm">📝 Tidak bisa memeriksa</span>'); $input.css({ 'border-color': '' }); });
            }, 500);
        });
        $('#nomorPrManual').on('blur', function () { if (!$(this).val().trim()) { $(this).css({ 'border-color': '' }); $('#ppbjStatus').html(''); } });

        // ═══════════════════════════════════════
        // MANUAL INPUT CHECK (EDIT)
        // ═══════════════════════════════════════
        $('#editNomorPrManual').on('input', function () {
            updateEditPrFinalValue();
            const val = $(this).val().trim();
            const $status = $('#editPpbjStatus');
            const $badge = $('#editDeskripsiBadge');
            const $input = $(this);
            if (!val) { $status.html(''); $badge.addClass('hidden').html(''); $input.css({ 'border-color': '' }); return; }
            clearTimeout(window._editPrManualCheck);
            window._editPrManualCheck = setTimeout(() => {
                $.get(PPBJ_CHECK_URL, { ppbj_no: val }, function (d) {
                    if (d.status === 'available') {
                        $status.html(`<div class="p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg><div class="text-red-700 dark:text-red-300"><strong class="block text-sm">⚠️ Nomor ini ada di database PPBJ!</strong><p class="text-xs mt-1">Gunakan mode <strong>"📋 Pilih PPBJ"</strong>.</p></div></div></div>`);
                        $input.css({ 'border-color': '#ef4444' });
                        $badge.addClass('hidden').html('');
                    } else if (d.status === 'already_linked') {
                        $status.html(`<div class="p-2 bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 rounded-lg"><div class="text-amber-700 dark:text-amber-300"><strong class="text-sm">⚠️ ${d.message}</strong></div></div>`);
                        $input.css({ 'border-color': '#f59e0b' });
                    } else if (d.status === 'cancelled') {
                        $status.html(`<div class="p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg"><div class="text-red-700 dark:text-red-300"><strong class="text-sm">❌ ${d.message}</strong></div></div>`);
                        $input.css({ 'border-color': '#ef4444' });
                    } else {
                        $status.html(`<div class="p-2 bg-green-50 dark:bg-green-950/60 border border-green-200 dark:border-green-800 rounded-lg"><div class="flex items-center gap-2"><svg class="w-4 h-4 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span class="text-sm font-semibold text-green-700 dark:text-green-300">📝 Manual — aman</span></div></div>`);
                        $input.css({ 'border-color': '#22c55e' });
                        $badge.addClass('hidden').html('');
                    }
                }).fail(() => { $status.html('<span class="text-gray-400 text-sm">📝 Tidak bisa memeriksa</span>'); $input.css({ 'border-color': '' }); });
            }, 500);
        });
        $('#editNomorPrManual').on('blur', function () { if (!$(this).val().trim()) { $(this).css({ 'border-color': '' }); $('#editPpbjStatus').html(''); } });

        // ════════════════════════════════════════════════════════════
        // ONBOARDING TUTORIAL (SP)
        // ════════════════════════════════════════════════════════════
        let obCurrentStep = 1, isFirstOpen = true, obFinished = false;
        function getCsrfToken() { const m = document.querySelector('meta[name="csrf-token"]'); return m ? m.content : ''; }

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
                    fetch('/sp/onboarding-view?t=' + Date.now(), { method: 'POST', headers: { 'X-CSRF-TOKEN': getCsrfToken(), 'Content-Type': 'application/json' } })
                        .then(r => r.json()).then(data => { if (data.status === 'finished') { obFinished = true; } }).catch(() => { });
                }
                isFirstOpen = false;
            } catch (e) { console.error('[OB] Error:', e); }
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
                fetch('/sp/onboarding-seen?t=' + Date.now(), { method: 'POST', headers: { 'X-CSRF-TOKEN': getCsrfToken(), 'Content-Type': 'application/json' } }).catch(() => { });
            } catch (e) { console.error('[OB] Error:', e); }
        }

        function finishOnboarding() {
            try {
                const card = document.querySelector('.onboarding-card');
                if (card) {
                    const confetti = document.createElement('div');
                    confetti.className = 'ob-confetti';
                    const colors = ['#0ea5e9', '#6366f1', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444'];
                    for (let i = 0; i < 30; i++) {
                        const p = document.createElement('div');
                        p.className = 'ob-confetti-piece';
                        p.style.left = Math.random() * 100 + '%';
                        p.style.background = colors[Math.floor(Math.random() * colors.length)];
                        p.style.animationDelay = Math.random() * 0.5 + 's';
                        p.style.animationDuration = (2 + Math.random() * 2) + 's';
                        p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                        confetti.appendChild(p);
                    }
                    card.appendChild(confetti);
                }
                setTimeout(() => closeOnboarding(), 600);
            } catch (e) { closeOnboarding(); }
        }

        function nextObStep(s) { obCurrentStep = s; updateObSteps(); }
        function prevObStep(s) { obCurrentStep = s; updateObSteps(); }
        function updateObSteps() {
            document.querySelectorAll('.ob-step').forEach(el => { el.classList.remove('active'); if (parseInt(el.dataset.step) === obCurrentStep) el.classList.add('active'); });
            document.querySelectorAll('.ob-progress-dot').forEach(dot => { const n = parseInt(dot.dataset.dot); dot.classList.remove('active', 'done'); if (n < obCurrentStep) dot.classList.add('done'); if (n === obCurrentStep) dot.classList.add('active'); });
        }

        function showFloatBtn() { const b = document.getElementById('onboardingFloatBtn'); if (b && !obFinished) { b.style.display = 'flex'; b.style.visibility = 'visible'; } }
        function hideFloatBtn() { const b = document.getElementById('onboardingFloatBtn'); if (b) { b.style.display = 'none'; b.style.visibility = 'hidden'; } }

        async function checkOnboardingStatus() {
            try {
                const r = await fetch('/sp/onboarding-status?t=' + Date.now(), { headers: { 'X-CSRF-TOKEN': getCsrfToken() } });
                if (!r.ok) return;
                const data = await r.json();
                if (data.finished) { hideFloatBtn(); return; }
                if (!data.seen) { setTimeout(() => showOnboarding(), 1200); return; }
                if (data.seen && data.left > 0) { showFloatBtn(); return; }
                hideFloatBtn();
            } catch (e) { console.error('[OB] Error:', e); }
        }

        // ════════════════════════════════════════════════════════════
        // RICH TEXT EDITOR (SP)
        // ════════════════════════════════════════════════════════════
        const RT_FONTS = ['Arial', 'Times New Roman', 'Calibri', 'Courier New', 'Verdana', 'Tahoma'];
        const rtSavedSel = {};
        let sizeDebounce = {};

        function rtSaveSel(edId) {
            try {
                const sel = window.getSelection();
                if (sel.rangeCount > 0) {
                    const ed = document.getElementById(edId);
                    if (ed && ed.contains(sel.anchorNode))
                        rtSavedSel[edId] = sel.getRangeAt(0).cloneRange();
                }
            } catch (e) { }
        }

        function rtRestoreSel(edId) {
            try {
                const ed = document.getElementById(edId);
                if (!ed || !rtSavedSel[edId]) return false;
                const range = rtSavedSel[edId];
                if (!ed.contains(range.startContainer) || !ed.contains(range.endContainer)) {
                    delete rtSavedSel[edId];
                    return false;
                }
                ed.focus();
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                return true;
            } catch (e) {
                return false;
            }
        }

        function buildRtToolbar(edId) {
            return `<div class="rt-toolbar" data-rt="${edId}">
                                                    <div class="rt-group">
                                                        <button type="button" class="rt-btn" data-cmd="bold" title="Tebal"><b>B</b></button>
                                                        <button type="button" class="rt-btn" data-cmd="italic" title="Miring"><i>I</i></button>
                                                        <button type="button" class="rt-btn" data-cmd="underline" title="Garis Bawah"><u>U</u></button>
                                                        <button type="button" class="rt-btn" data-cmd="strikeThrough" title="Coret"><s>S</s></button>
                                                    </div>
                                                    <div class="rt-sep"></div>
                                                    <div class="rt-group">
                                                        <button type="button" class="rt-btn" data-cmd="justifyLeft" title="Rata Kiri" style="font-size:10px">◁</button>
                                                        <button type="button" class="rt-btn" data-cmd="justifyCenter" title="Rata Tengah" style="font-size:10px">◧</button>
                                                        <button type="button" class="rt-btn" data-cmd="justifyRight" title="Rata Kanan" style="font-size:10px">▷</button>
                                                    </div>
                                                    <div class="rt-sep"></div>
                                                    <div class="rt-group">
                                                        <button type="button" class="rt-btn" data-cmd="insertUnorderedList" title="Bullet" style="font-size:11px">•≡</button>
                                                        <button type="button" class="rt-btn" data-cmd="insertOrderedList" title="Number" style="font-size:10px">1.</button>
                                                    </div>
                                                    <div class="rt-sep"></div>
                                                    <div class="rt-group">
                                                        <button type="button" class="rt-btn" data-cmd="undo" title="Undo" style="font-size:10px">↩</button>
                                                        <button type="button" class="rt-btn" data-cmd="redo" title="Redo" style="font-size:10px">↪</button>
                                                    </div>
                                                </div>`;
        }

        function initRt(editorId) {
            const ed = document.getElementById(editorId);
            const tb = document.querySelector(`[data-rt="${editorId}"]`);
            if (!ed || !tb) return;

            ed.addEventListener('mouseup', () => rtSaveSel(editorId));
            ed.addEventListener('keyup', () => rtSaveSel(editorId));

            tb.querySelectorAll('[data-cmd]').forEach(btn => {
                btn.addEventListener('mousedown', e => {
                    e.preventDefault();
                    try { document.execCommand(btn.dataset.cmd, false, null); } catch (e2) { }
                    syncHidden(editorId);
                    rtSaveSel(editorId);
                });
            });

            ['keyup', 'mouseup', 'click', 'input'].forEach(ev => {
                ed.addEventListener(ev, () => syncHidden(editorId));
            });

            ed.addEventListener('paste', e => {
                e.preventDefault();
                const html = (e.clipboardData || window.clipboardData).getData('text/html');
                if (html) {
                    document.execCommand('insertHTML', false, html.replace(/<\/?(meta|link|style|script)[^>]*>/gi, ''));
                } else {
                    document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text/plain'));
                }
                syncHidden(editorId);
            });
        }

        function syncHidden(editorId) {
            const ed = document.getElementById(editorId);
            const hd = document.getElementById('hid-' + editorId);
            if (ed && hd) hd.value = ed.innerHTML;
        }

        function syncAll(formEl) {
            formEl.querySelectorAll('.rt-editor').forEach(ed => syncHidden(ed.id));
        }

        function setRt(editorId, html) {
            const ed = document.getElementById(editorId);
            if (ed) {
                ed.innerHTML = html || '';
                syncHidden(editorId);
            }
        }

        // ════════════════════════════════════════════════════════════
        // ITEMS MANAGEMENT (SP)
        // ════════════════════════════════════════════════════════════
        let addIdx = 0, editIdx = 5000;

        function buildSatOpts(s) {
            const options = (typeof SATUANS !== 'undefined' ? SATUANS : []).map(v =>
                `<option value="${escapedHtml(v)}"${v === s ? ' selected' : ''}>${escapedHtml(v)}</option>`
            ).join('');
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
                html: '<div class="text-sm text-slate-600 dark:text-slate-300">Masukkan satuan baru tanpa membuka menu master. Praktis, sat-set, audit tetap rapi.</div>',
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
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
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

        function formatRupiahInput(v) {
            let n = String(v).replace(/\D/g, '');
            if (n === '') return '';
            n = n.replace(/^0+/, '') || '0';
            return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }

        function calculateRowSubtotal(mode, idx) {
            const prefix = mode === 'add' ? 'add' : 'edit';
            const jumlahInput = document.getElementById(`${prefix}-${idx}-jumlah`);
            const hargaInput = document.getElementById(`${prefix}-${idx}-harga`);
            const subtotalEl = document.getElementById(`${prefix}-${idx}-subtotal`);

            if (!jumlahInput || !hargaInput || !subtotalEl) return;

            const jumlah = parseFloat(jumlahInput.value.replace(/\./g, '')) || 0;
            const harga = parseFloat(hargaInput.value.replace(/\./g, '')) || 0;
            const subtotal = jumlah * harga;

            subtotalEl.textContent = subtotal > 0 ? 'Rp ' + formatRupiahInput(subtotal.toString()) : '-';
            subtotalEl.classList.remove('updated');
            void subtotalEl.offsetWidth;
            subtotalEl.classList.add('updated');

            updateGrandTotal(mode);
        }

        function getNilaiSpNumber(mode) {
            const inputId = mode === 'edit' ? 'editNilaiSp' : 'nilaiSpInput';
            return parseFloat(stripRupiah(document.getElementById(inputId)?.value || '0')) || 0;
        }

        function getSpItemTotalInfo(mode) {
            const prefix = mode === 'edit' ? 'edit' : 'add';
            const wrapper = document.getElementById(`${prefix}Rows`);
            let total = 0;
            let filledRows = 0;
            let rows = 0;

            wrapper?.querySelectorAll('.item-row').forEach(row => {
                rows++;
                const editorText = row.querySelector('.rt-editor')?.innerText?.trim() || '';
                const satuan = row.querySelector('select[name*="[satuan]"]')?.value?.trim() || '';
                const jumlah = row.querySelector('input[name*="[jumlah]"]')?.value?.trim() || '';
                const harga = row.querySelector('input[name*="[harga_satuan]"]')?.value?.trim() || '';
                const subtotalText = row.querySelector('.subtotal-value')?.textContent || '';
                const subtotal = parseFloat(subtotalText.replace(/[^\d]/g, '')) || 0;

                if (editorText || satuan || jumlah || harga || subtotal > 0) {
                    filledRows++;
                }
                total += subtotal;
            });

            return { rows, filledRows, total };
        }

        function syncSingleItemPriceFromNilaiSp(mode, force = false) {
            const prefix = mode === 'edit' ? 'edit' : 'add';
            const wrapper = document.getElementById(`${prefix}Rows`);
            const rows = wrapper ? Array.from(wrapper.querySelectorAll('.item-row')) : [];
            const nilaiSp = getNilaiSpNumber(mode);

            if (rows.length !== 1 || nilaiSp <= 0) return false;

            const row = rows[0];
            const idx = row.dataset.idx;
            const jumlahInput = document.getElementById(`${prefix}-${idx}-jumlah`);
            const hargaInput = document.getElementById(`${prefix}-${idx}-harga`);
            if (!jumlahInput || !hargaInput) return false;

            const qty = parseFloat(String(jumlahInput.value || '').replace(/\./g, '').replace(',', '.')) || 0;
            if (qty <= 0) return false;

            const canAutoSync = force || !hargaInput.value.trim() || row.dataset.autoSpPrice === '1';
            if (!canAutoSync) return false;

            const hargaSatuan = Math.round(nilaiSp / qty);
            hargaInput.value = formatRupiahInput(String(hargaSatuan));
            row.dataset.autoSpPrice = '1';
            calculateRowSubtotal(mode, idx);
            return true;
        }

        function handleItemQuantityInput(mode, idx) {
            const synced = syncSingleItemPriceFromNilaiSp(mode);
            if (!synced) calculateRowSubtotal(mode, idx);
        }

        function validateSpItemsTotalBeforeSubmit(prefix, form, event) {
            if (form.dataset.itemTotalConfirmed === '1') return false;

            const info = getSpItemTotalInfo(prefix);
            const nilaiSp = getNilaiSpNumber(prefix);
            if (info.filledRows <= 0 || nilaiSp <= 0 || info.total <= 0) return false;
            if (Math.abs(info.total - nilaiSp) <= 1) return false;

            event.preventDefault();
            const selisih = Math.abs(info.total - nilaiSp);
            const itemText = info.filledRows > 1 ? `${info.filledRows} baris barang` : '1 baris barang';

            Swal.fire({
                icon: 'warning',
                title: 'Total barang beda dari Nilai SP',
                html: `
                    <div class="text-left text-sm leading-relaxed space-y-3">
                        <p>Daftar barang sudah diisi (${itemText}), tetapi totalnya belum sama dengan nilai final SP.</p>
                        <div class="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-600 dark:bg-amber-900/30 dark:text-amber-100">
                            <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
                                <div><div class="text-[10px] font-black uppercase opacity-70">Nilai SP</div><div class="font-black">Rp ${formatRupiahInput(String(nilaiSp))}</div></div>
                                <div><div class="text-[10px] font-black uppercase opacity-70">Total barang</div><div class="font-black">Rp ${formatRupiahInput(String(info.total))}</div></div>
                                <div><div class="text-[10px] font-black uppercase opacity-70">Selisih</div><div class="font-black">Rp ${formatRupiahInput(String(selisih))}</div></div>
                            </div>
                        </div>
                        <p class="text-slate-600 dark:text-slate-300">Saran sistem: samakan total daftar barang dengan Nilai SP agar cetakan dan audit tidak membingungkan.</p>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'Tetap simpan',
                cancelButtonText: 'Perbaiki dulu',
                confirmButtonColor: '#f59e0b',
                cancelButtonColor: '#2563eb',
                background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#111827'
            }).then(result => {
                if (result.isConfirmed) {
                    form.dataset.itemTotalConfirmed = '1';
                    form.requestSubmit();
                }
            });

            return true;
        }

        function updateGrandTotal(mode) {
            const prefix = mode === 'add' ? 'add' : 'edit';
            const wrapper = document.getElementById(`${prefix}Rows`);
            const displayEl = document.getElementById(`${prefix}SubtotalDisplay`);
            const valueEl = document.getElementById(`${prefix}SubtotalValue`);
            const countEl = document.getElementById(`${prefix}ItemCount`);

            if (!wrapper || !displayEl || !valueEl) return;

            let grandTotal = 0;
            let itemCount = 0;

            wrapper.querySelectorAll('.item-row').forEach(row => {
                const subtotalText = row.querySelector('.subtotal-value');
                if (subtotalText) {
                    const val = subtotalText.textContent.replace(/[^\d]/g, '');
                    grandTotal += parseFloat(val) || 0;
                }
                itemCount++;
            });

            if (itemCount > 0) {
                displayEl.style.display = 'flex';
                valueEl.textContent = 'Rp ' + formatRupiahInput(grandTotal.toString());
                // ── FIX BUG 8: Animasikan container (.subtotal-display), bukan hanya value ──
                displayEl.classList.remove('updated');
                void displayEl.offsetWidth;
                displayEl.classList.add('updated');
            } else {
                displayEl.style.display = 'none';
            }

            if (countEl) countEl.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
            scheduleSpModeGuard(mode);
        }

        function addRow(mode, item = null, shouldScroll = false) {
            const wrapper = document.getElementById(mode === 'add' ? 'addRows' : 'editRows');
            const idx = mode === 'add' ? addIdx++ : editIdx++;
            const prefix = mode === 'add' ? 'add' : 'edit';
            const rowNum = wrapper.querySelectorAll('.item-row').length + 1;
            const edId = `rt-${prefix}-${idx}`;

            const jumlah = item?.jumlah || '';
            // ── FIX BUG 5: Format harga dari database ──
            const harga = item?.harga_satuan
                ? formatRupiahInput(String(Math.round(parseFloat(String(item.harga_satuan).replace(/\./g, '').replace(',', '.')))))
                : '';
            const subtotal = item?.subtotal
                ? parseFloat(String(item.subtotal).replace(/\./g, '').replace(',', '.'))
                : 0;

            const rowHtml = `
                                            <div class="item-row" data-idx="${idx}" data-mode="${mode}">
                                                <span class="row-badge">${rowNum}</span>
                                                <button type="button" class="btn-rm" onclick="removeRowSp(this)" title="Hapus baris">×</button>

                                                <div class="mt-1">
                                                    <span class="item-label">Nama Barang / Jasa</span>
                                                    ${buildRtToolbar(edId)}
                                                    <div class="rt-editor" contenteditable="true" id="${edId}"
                                                         data-ph="Ketik nama barang / jasa..."
                                                         onfocus="rtSaveSel('${edId}')"
                                                         oninput="updateOracleReadinessChecklist('${mode}'); scheduleSpModeGuard('${mode}')"></div>
                                                    <input type="hidden" name="items[${idx}][nama_barang]" id="hid-${edId}">
                                                </div>

                                                <div class="item-grid-sp mt-2">
                                                    <div>
                                                        <span class="item-label">Satuan</span>
                                                        <select name="items[${idx}][satuan]" class="m-select">
                                                            <option value="">— Pilih —</option>
                                                            ${buildSatOpts(item?.satuan || '')}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <span class="item-label">Qty</span>
                                                        <input type="text" name="items[${idx}][jumlah]" id="${prefix}-${idx}-jumlah"
                                                               value="${jumlah}" placeholder="1"
                                                               class="m-input" style="text-align:center"
                                                               oninput="handleItemQuantityInput('${mode}', ${idx})">
                                                    </div>
                                                    <div>
                                                        <span class="item-label">Harga Satuan</span>
                                                        <input type="text" name="items[${idx}][harga_satuan]" id="${prefix}-${idx}-harga"
                                                               value="${harga}" placeholder="0"
                                                               class="m-input harga-input"
                                                               oninput="this.closest('.item-row').dataset.autoSpPrice='0';this.value=formatRupiahInput(this.value);calculateRowSubtotal('${mode}', ${idx})">
                                                    </div>
                                                    <div>
                                                        <span class="item-label">Subtotal</span>
                                                        <div id="${prefix}-${idx}-subtotal" class="subtotal-value"
                                                             style="font-size:.78rem; padding:5px 7px; background:#f0fdf4; border-radius:6px; border:1px solid #bbf7d0;">
                                                            ${subtotal > 0 ? 'Rp ' + formatRupiahInput(subtotal.toString()) : '-'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;

            wrapper.insertAdjacentHTML('beforeend', rowHtml);
            initRt(edId);

            if (item?.nama_barang) {
                setRt(edId, item.nama_barang);
            }

            updateGrandTotal(mode);

            const newRow = wrapper.lastElementChild;
            if (newRow && shouldScroll) {
                newRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        function removeRowSp(btn) {
            const row = btn.closest('.item-row');
            const wrapper = row.closest('#addRows, #editRows');
            const mode = row.dataset.mode || 'add';

            if (wrapper.querySelectorAll('.item-row').length <= 1) {
                Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: 'Minimal 1 baris!', showConfirmButton: false, timer: 2000 });
                return;
            }

            const editor = row.querySelector('.rt-editor');
            if (editor) {
                const edId = editor.id;
                delete rtSavedSel[edId];
                if (sizeDebounce[edId]) { clearTimeout(sizeDebounce[edId]); delete sizeDebounce[edId]; }
            }

            row.classList.add('removing');
            setTimeout(() => { row.remove(); renumber(wrapper); updateGrandTotal(mode); }, 350);
        }

        function renumber(w) {
            w.querySelectorAll('.item-row .row-badge').forEach((b, i) => {
                b.textContent = i + 1;
                b.style.transform = 'scale(1.2)';
                setTimeout(() => { b.style.transform = 'scale(1)'; }, 150);
                b.style.transition = 'transform .15s';
            });
        }

        // ── FIX BUG 9: Tambahkan parameter err pada catch ──
        async function loadEditItems(spId) {
            try {
                const r = await fetch(`/sp/${spId}/items`, {
                    headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
                });
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                const data = await r.json();
                document.getElementById('editRows').innerHTML = '';
                (data.length ? data : [null]).forEach(item => addRow('edit', item));
            } catch (err) {
                console.error('[SP] loadEditItems error:', err);
                document.getElementById('editRows').innerHTML = '<p class="text-red-500 text-xs p-2">Gagal memuat data barang.</p>';
            }
        }

        // ═══════════════════════════════════════
        // INIT
        // ═══════════════════════════════════════
        function initVendorAjaxSelectSp(selector, placeholder) {
            const $select = $(selector);
            $select.select2({
                placeholder,
                allowClear: true,
                width: '100%',
                minimumInputLength: 0,
                ajax: {
                    url: VENDOR_SEARCH_URL,
                    dataType: 'json',
                    delay: 250,
                    data: params => ({ q: params.term || '' }),
                    processResults: data => ({
                        results: (Array.isArray(data) ? data : (data.results || [])).map(vendor => {
                            const name = vendor.nama_vendor || vendor.text || vendor.id || '';
                            return {
                                id: name,
                                text: name,
                                alamat: vendor.alamat || '',
                                telepon: vendor.telepon || '',
                                email: vendor.email || '',
                                jabatan: vendor.jabatan || ''
                            };
                        })
                    }),
                    cache: true
                },
                templateResult: item => {
                    if (item.loading) return 'Mencari vendor...';
                    const $row = $('<div class="py-1">')
                        .append($('<div class="font-semibold text-gray-900 dark:text-gray-100">').text(item.text || '-'));
                    const meta = [item.jabatan, item.telepon, item.email].filter(Boolean).join(' • ');
                    if (meta) $row.append($('<div class="text-[11px] text-gray-500 dark:text-gray-400">').text(meta));
                    return $row;
                },
                templateSelection: item => item.text || item.id || ''
            });
        }

        const spModeGuardTimers = {};
        function scheduleSpModeGuard(prefix, delay = 120) {
            clearTimeout(spModeGuardTimers[prefix]);
            spModeGuardTimers[prefix] = setTimeout(() => updateSpModeGuard(prefix), delay);
        }

        $(document).ready(function () {
            const cfg = ph => ({ placeholder: ph, allowClear: true, width: '100%' });
            initVendorAjaxSelectSp('#vendorSelectSp', '-- Pilih Vendor --');
            $('.pic-select-sp').select2(cfg('-- Pilih PIC --'));
            initVendorAjaxSelectSp('#editVendorSp', '-- Pilih Vendor --');
            $('.edit-pic-sp').select2(cfg('-- Pilih PIC --'));

            // Init PPBJ Select2
            initPpbjSelect2('.sp-ppbj-select', 'ppbjInfo', 'ppbjStatus', 'ppbjInfoContent', () => updatePrFinalValue(), 'addDeskripsi', 'addDeskripsiBadge');
            initPpbjSelect2('.edit-sp-ppbj-select', 'editPpbjInfo', 'editPpbjStatus', 'editPpbjInfoContent', () => updateEditPrFinalValue(), 'editDeskripsiSp', 'editDeskripsiBadge');

            // Init rupiah
            initRupiahInput('nilaiSpInput');
            initRupiahInput('nilaiPrInput');
            initRupiahInput('editNilaiSp');
            initRupiahInput('editNilaiPr');

            $('#nilaiSpInput').on('input paste', () => setTimeout(() => { syncSingleItemPriceFromNilaiSp('add'); updateJampelPreview('add'); scheduleSpModeGuard('add', 80); }, 0));
            $('#editNilaiSp').on('input paste', () => setTimeout(() => { syncSingleItemPriceFromNilaiSp('edit'); updateJampelPreview('edit'); scheduleSpModeGuard('edit', 80); }, 0));
            $('#addFormSp').on('input change', 'input, select, textarea', function () {
                if (this.form) this.form.dataset.itemTotalConfirmed = '0';
                setTimeout(() => {
                    updateOracleReadinessChecklist('add');
                    scheduleSpModeGuard('add');
                }, 0);
            });
            $('#editFormSp').on('input change', 'input, select, textarea', function () {
                if (this.form) this.form.dataset.itemTotalConfirmed = '0';
                setTimeout(() => {
                    updateOracleReadinessChecklist('edit');
                    scheduleSpModeGuard('edit');
                }, 0);
            });
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
            $('#toggleNewVendorSp').on('click', function () {
                const box = document.getElementById('newVendorBoxSp');
                if (!box) return;
                box.classList.toggle('hidden');
                if (!box.classList.contains('hidden')) {
                    updateVendorProfileChecklistSp();
                    setTimeout(() => document.getElementById('newVendorNama')?.focus(), 50);
                }
            });
            $('#newVendorBoxSp').on('input', 'input, textarea', updateVendorProfileChecklistSp);
            $('#vendorSelectSp, .pic-select-sp, #editVendorSp, #editPicSp, #ppbjSelect, #editPpbjSelect')
                .on('change select2:select select2:clear', () => {
                    setTimeout(() => {
                        updateOracleReadinessChecklist('add');
                        updateOracleReadinessChecklist('edit');
                        scheduleSpModeGuard('add');
                        scheduleSpModeGuard('edit');
                    }, 0);
                });

            // Tombol Tambah
            document.querySelector('button[onclick="openModal(\'addModal\')"]').addEventListener('click', () => {
                loadSuggestionsSp();
                document.getElementById('nomorSpInput').value = '';
                document.getElementById('nilaiSpInput').value = '';
                document.getElementById('nilaiPrInput').value = '';
                document.getElementById('addSph').value = '';
                document.getElementById('addTglSph').value = '';
                document.getElementById('addPromisedDate').value = '';
                document.getElementById('addRfq').value = '';
                document.getElementById('addNomorPemenang').value = '';
                document.getElementById('addTanggalPemenang').value = '';
                document.getElementById('addAwalKontrak').value = '';
                document.getElementById('addAkhirKontrak').value = '';
                document.getElementById('addBidangIpItu').value = '';
                document.getElementById('addPenandatanganSci').value = '';
                document.getElementById('addJabatanSci').value = '';
                updateJampelPreview('add');
                addIdx = 0;
                document.getElementById('addRows').innerHTML = '';
                document.getElementById('addSubtotalDisplay').style.display = 'none';
                document.getElementById('addItemCount').textContent = '0 item';
                $('#addModeGuardSp').addClass('hidden').html('');
                addRow('add');
                for (let k in rtSavedSel) { if (k.startsWith('rt-add-')) delete rtSavedSel[k]; }
                for (let k in sizeDebounce) { if (k.startsWith('rt-add-')) { clearTimeout(sizeDebounce[k]); delete sizeDebounce[k]; } }
                setStatus(document.getElementById('nomorSpInput'), document.getElementById('nomorStatusSp'), null, '');
                $('#addDeskripsi').val('');
                $('#addDeskripsiBadge').addClass('hidden').html('');
                $('#addNilaiPrBadge').addClass('hidden').html('');
                setPrMode('ppbj');
                $('#ppbjSelect').val(null).trigger('change');
                $('#nomorPrManual').val('');
                $('#ppbjInfo').addClass('hidden');
                $('#ppbjStatus').html('');
                $('#nomorPrFinal').val('');
                $('#addVendorMismatchConfirmed').val('0');
                document.getElementById('newVendorBoxSp')?.classList.add('hidden');
                resetNewVendorForm();
                renderSpphVendorRecommendation('add', [], null);
                restoreSpModeDraftToAdd();
                updateOracleReadinessChecklist('add');
            });

            // Vendor toggle
            $('#vendorSelectSp').on('change', function () {
                if ($(this).val() === '__tambah__') { document.getElementById('newVendorBoxSp').classList.remove('hidden'); document.getElementById('newVendorNama').focus(); }
                else { document.getElementById('newVendorBoxSp').classList.add('hidden'); resetNewVendorForm(); }
                updateSpphVendorRecommendation('add');
            });
            $('#editVendorSp').on('change', function () {
                updateSpphVendorRecommendation('edit');
            });
            $(document).on('click', '[data-spph-vendor]', function () {
                selectRecommendedSpphVendor($(this).data('spph-prefix'), $(this).data('spph-vendor'));
            });

            // Nomor check
            attachNomorCheck('nomorSpInput', 'nomorStatusSp', () => 0, 'tanggalSpInput');
            attachNomorCheck('editNomorSp', 'editNomorStatusSp', () => document.getElementById('editIdSp').value || 0, 'editTanggalSp');
            document.getElementById('tanggalSpInput')?.addEventListener('change', loadSuggestionsSp);

            function swalThemeSp() {
                const dark = document.documentElement.classList.contains('dark');
                return {
                    background: dark ? '#0f172a' : '#ffffff',
                    color: dark ? '#f8fafc' : '#111827',
                    confirmButtonColor: '#2563eb'
                };
            }

            function ajaxErrorMessageSp(data) {
                if (data?.errors) {
                    const first = Object.values(data.errors).flat().find(Boolean);
                    if (first) return first;
                }
                return data?.message || 'Data belum bisa disimpan. Silakan cek kembali isian form.';
            }

            async function applyLatestNumberSp(isEdit = false) {
                const input = document.getElementById(isEdit ? 'editNomorSp' : 'nomorSpInput');
                const status = document.getElementById(isEdit ? 'editNomorStatusSp' : 'nomorStatusSp');
                if (!input) return null;

                try {
                    const response = await fetch(getSuggestionUrlSp(), {
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

            async function submitFormAjaxSp(form, isEdit = false) {
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
                            text: data?.message || 'Data SP berhasil disimpan.',
                            icon: 'success',
                            timer: 900,
                            showConfirmButton: false,
                            ...swalThemeSp()
                        }).then(() => {
                            window.location.href = data?.redirect || window.location.href;
                        });
                        return;
                    }

                    const message = ajaxErrorMessageSp(data);
                    if (data?.conflict || response.status === 409) {
                        const result = await Swal.fire({
                            title: 'Nomor bentrok / data berubah',
                            html: `<div class="text-left leading-relaxed">${message}<br><br><strong>Solusi cepat:</strong> ambil nomor terbaru tanpa menutup form.</div>`,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Ambil Nomor Terbaru',
                            cancelButtonText: 'Tetap di Form',
                            ...swalThemeSp()
                        });

                        if (result.isConfirmed) {
                            const latest = await applyLatestNumberSp(isEdit);
                            Swal.fire({
                                title: latest ? 'Nomor terbaru siap dipakai' : 'Saran nomor belum bisa dimuat',
                                text: latest ? `Nomor diganti ke ${latest}. Silakan cek lalu simpan ulang.` : 'Silakan klik saran nomor atau refresh data jika perlu.',
                                icon: latest ? 'success' : 'info',
                                ...swalThemeSp()
                            });
                        }
                        return;
                    }

                    Swal.fire({
                        title: 'Simpan gagal',
                        text: message,
                        icon: 'error',
                        ...swalThemeSp()
                    });
                } catch (error) {
                    Swal.fire({
                        title: 'Koneksi simpan bermasalah',
                        text: 'Form tetap terbuka. Silakan coba lagi, data yang sudah diketik tidak hilang.',
                        icon: 'error',
                        ...swalThemeSp()
                    });
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalHtml;
                    }
                }
            }

            // ── FIX BUG 4 & Guard submit TAMBAH ──
            document.getElementById('addFormSp').addEventListener('submit', function (e) {
                const $nomorStatus = $('#nomorStatusSp');
                if ($nomorStatus.html().includes('❌')) {
                    e.preventDefault();
                    Swal.fire({ title: 'Nomor Duplikat!', text: 'Nomor SP sudah digunakan.', icon: 'error', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                    return;
                }
                updatePrFinalValue();
                if (confirmVendorMismatchBeforeSubmit('add', this, e)) {
                    return;
                }
                if (!updateSpModeGuard('add')) {
                    e.preventDefault();
                    Swal.fire({
                        title: 'Mode penomoran tidak sesuai',
                        text: ORACLE_MODE_SP ? 'Nilai SP harus di atas Rp50.000.000 karena Anda berada di mode Oracle ERP.' : 'Nilai SP di atas Rp50.000.000 harus dibuat melalui mode Oracle ERP. Khusus kalibrasi boleh tetap memakai SP biasa.',
                        icon: 'warning',
                        background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
                        color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827'
                    });
                    return;
                }
                if (validateSpItemsTotalBeforeSubmit('add', this, e)) {
                    return;
                }
                document.getElementById('nilaiSpInput').value = stripRupiah(document.getElementById('nilaiSpInput').value);
                document.getElementById('nilaiPrInput').value = stripRupiah(document.getElementById('nilaiPrInput').value);

                // ── FIX BUG 4: Strip titik dari semua harga_satuan item sebelum submit ──
                this.querySelectorAll('input[name*="[harga_satuan]"]').forEach(inp => {
                    inp.value = stripRupiah(inp.value);
                });

                syncAll(this);

                const $ppbjStatusEl = $('#ppbjStatus');
                if (currentPrMode === 'manual') {
                    const mv = $('#nomorPrManual').val().trim();
                    if (mv && ($ppbjStatusEl.html().includes('ada di database PPBJ') || $ppbjStatusEl.html().includes('sudah terhubung'))) {
                        e.preventDefault();
                        Swal.fire({ title: '⚠️ Nomor PR Tidak Valid untuk Manual!', html: `Gunakan mode <strong>"📋 Pilih PPBJ"</strong> agar otomatis terhubung.`, icon: 'warning', confirmButtonColor: '#0ea5e9', confirmButtonText: 'Mengerti', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                        return;
                    }
                }
                if ($ppbjStatusEl.html().includes('❌')) {
                    e.preventDefault();
                    Swal.fire({ title: 'PPBJ Tidak Valid!', icon: 'warning', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                    return;
                }
                e.preventDefault();
                submitFormAjaxSp(this, false);
            });

            // ── FIX BUG 3 & 4 & Guard submit EDIT ──
            document.getElementById('editFormSp').addEventListener('submit', function (e) {
                // ── FIX BUG 3: Cek nomor SP duplikat di form edit ──
                if ($('#editNomorStatusSp').html().includes('❌')) {
                    e.preventDefault();
                    Swal.fire({ title: 'Nomor Duplikat!', text: 'Nomor SP sudah digunakan.', icon: 'error', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                    return;
                }

                updateEditPrFinalValue();
                if (confirmVendorMismatchBeforeSubmit('edit', this, e)) {
                    return;
                }
                if (!updateSpModeGuard('edit')) {
                    e.preventDefault();
                    Swal.fire({
                        title: 'Mode penomoran tidak sesuai',
                        text: ORACLE_MODE_SP ? 'Nilai SP harus di atas Rp50.000.000 karena Anda berada di mode Oracle ERP.' : 'Nilai SP di atas Rp50.000.000 harus dibuat melalui mode Oracle ERP. Khusus kalibrasi boleh tetap memakai SP biasa.',
                        icon: 'warning',
                        background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
                        color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827'
                    });
                    return;
                }
                if (validateSpItemsTotalBeforeSubmit('edit', this, e)) {
                    return;
                }
                document.getElementById('editNilaiSp').value = stripRupiah(document.getElementById('editNilaiSp').value);
                document.getElementById('editNilaiPr').value = stripRupiah(document.getElementById('editNilaiPr').value);

                // ── FIX BUG 4: Strip titik dari semua harga_satuan item sebelum submit ──
                this.querySelectorAll('input[name*="[harga_satuan]"]').forEach(inp => {
                    inp.value = stripRupiah(inp.value);
                });

                syncAll(this);

                const $editPpbjStatusEl = $('#editPpbjStatus');
                if (currentEditPrMode === 'manual') {
                    const mv = $('#editNomorPrManual').val().trim();
                    if (mv && ($editPpbjStatusEl.html().includes('ada di database PPBJ') || $editPpbjStatusEl.html().includes('sudah terhubung'))) {
                        e.preventDefault();
                        Swal.fire({ title: '⚠️ Nomor PR Tidak Valid untuk Manual!', html: `Gunakan mode <strong>"📋 Pilih PPBJ"</strong> agar otomatis terhubung.`, icon: 'warning', confirmButtonColor: '#0ea5e9', confirmButtonText: 'Mengerti', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                        return;
                    }
                }
                if ($editPpbjStatusEl.html().includes('❌')) {
                    e.preventDefault();
                    Swal.fire({ title: 'PPBJ Tidak Valid!', icon: 'warning', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                    return;
                }
                e.preventDefault();
                submitFormAjaxSp(this, true);
            });

            // Search
            document.getElementById('searchInput').addEventListener('input', function () {
                document.getElementById('searchSpinner').classList.remove('hidden');
                clearTimeout(searchTimer);
                searchTimer = setTimeout(() => { document.getElementById('searchSpinner').classList.add('hidden'); doSearch(); }, 500);
            });
            document.getElementById('searchInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); clearTimeout(searchTimer); document.getElementById('searchSpinner').classList.add('hidden'); doSearch(); } });
            document.getElementById('filterPic').addEventListener('change', doSearch);
            document.getElementById('dariInput').addEventListener('change', doSearch);
            document.getElementById('sampaiInput').addEventListener('change', doSearch);

            // Polling: mulai setelah render awal supaya halaman SP tidak terasa berat saat pertama dibuka.
            if (IS_FIRST_PAGE && !HAS_FILTER && !document.hidden) {
                setTimeout(() => {
                    if (!document.hidden) pollNow();
                    pollTimer = setInterval(pollNow, 45000);
                }, 2500);
            }

            // Presence: ditunda sebentar agar tidak berebut dengan render tabel/modal.
            if (!document.hidden) {
                setTimeout(() => {
                    if (!document.hidden) pollPresence();
                    presenceTimer = setInterval(pollPresence, 45000);
                }, 3000);
            }
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) { clearInterval(pollTimer); clearInterval(presenceTimer); }
                else {
                    if (IS_FIRST_PAGE && !HAS_FILTER) { pollNow(); pollTimer = setInterval(pollNow, 45000); }
                    pollPresence(); presenceTimer = setInterval(pollPresence, 45000);
                }
            });
            window.addEventListener('beforeunload', () => {
                if (modalOpen) { const fd = new FormData(); fd.append('_token', document.querySelector('meta[name="csrf-token"]').content); navigator.sendBeacon(PRESENCE_STOP, fd); }
            });
            checkOnboardingStatus();
        });
