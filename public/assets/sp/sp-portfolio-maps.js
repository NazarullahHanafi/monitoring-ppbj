(function () {
    'use strict';
    const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const key = value => String(value || '').trim().replace(/\s+/g, ' ').toLocaleUpperCase('id-ID');
    async function json(url, options = {}) {
        const response = await fetch(url, {cache:'no-store', ...options, headers:{Accept:'application/json', 'X-Requested-With':'XMLHttpRequest', ...options.headers}});
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(Object.values(data.errors || {}).flat().join(' ') || data.message || 'Pemetaan belum dapat diproses.');
        return data;
    }
    function portfolioChoices(s, context) {
        const selected = s.draft?.portfolio ?? s.edit?.portfolio ?? context.portfolios[0] ?? '';
        const seen = new Set();
        const unique = rows => rows.filter(value => {
            const normalized = key(value);
            if (!normalized || seen.has(normalized)) return false;
            seen.add(normalized);
            return true;
        });
        const current = unique([selected, ...context.portfolios].filter(Boolean));
        const other = unique(s.portfolios);
        const needle = key(s.portfolioQuery);
        const options = rows => rows.filter(value => !needle || key(value).includes(needle) || key(value) === key(selected))
            .map(value => `<option value="${escape(value)}" ${key(value) === key(selected) ? 'selected' : ''}>${escape(value)}</option>`).join('');
        const group = (label, values) => {const html = options(values); return html ? `<optgroup label="${label}">${html}</optgroup>` : '';};
        return '<option value="">Pilih portofolio…</option>' + group('Dari PR SP ini / pilihan saat ini', current) + group('Portofolio lainnya', other);
    }
    window.SPPortfolioMaps = {open: async function (context) {
        const s = {rows:[], fields:[], portfolios:[], optionsLoaded:false, optionsTruncated:false, portfolioQuery:'', manual:false,
            edit:null, draft:null, page:1, last:1, q:'', message:'Memuat pemetaan…', busy:false};
        let closed = false, nonce = 0;
        const capture = () => {
            const portfolio = document.getElementById('spMapPortfolio');
            if (!portfolio) return;
            s.draft = {portfolio:portfolio.value, field_id:document.getElementById('spMapField')?.value || '', is_active:!!document.getElementById('spMapActive')?.checked};
        };
        const draw = () => {if (!closed) Swal.update({html:render(s, context)});};
        async function load() {
            const n = ++nonce;
            try {
                const params = {q:s.q, page:s.page, ...(!s.optionsLoaded && context.can_manage ? {include_options:1} : {})};
                const data = await json('/sp/portfolio-mappings?' + new URLSearchParams(params));
                if (closed || n !== nonce) return;
                s.rows = data.rows; s.last = data.last_page; s.message = '';
                if (Array.isArray(data.portfolio_options)) {
                    s.portfolios = data.portfolio_options; s.optionsLoaded = true; s.optionsTruncated = !!data.options_truncated;
                }
            } catch (error) {s.message = error.message;}
            draw();
        }
        await Swal.fire({title:'Pemetaan portofolio ke bidang PR', width:760, customClass:{popup:'spph-signing-popup'},
            background:document.documentElement.classList.contains('dark') ? '#162034' : '#fff',
            color:document.documentElement.classList.contains('dark') ? '#edf3ff' : '#18253d', html:render(s, context),
            confirmButtonText:'Kembali ke cetak', confirmButtonColor:'#3157d9', focusConfirm:false,
            allowOutsideClick:() => !s.busy, allowEscapeKey:() => !s.busy, preConfirm:() => !s.busy,
            willClose:() => {closed = true; nonce++;},
            didOpen:async () => {
                const root = Swal.getHtmlContainer();
                root.addEventListener('click', event => {
                    const b = event.target.closest('[data-sp-map]');
                    if (!b || s.busy) return;
                    capture();
                    if (b.dataset.spMap === 'edit') {
                        s.edit = s.rows.find(r => Number(r.id) === Number(b.dataset.id)); s.draft = null; s.manual = false; s.portfolioQuery = ''; draw();
                    }
                    if (b.dataset.spMap === 'cancel') {s.edit = null; s.draft = null; s.manual = false; s.portfolioQuery = ''; draw();}
                    if (b.dataset.spMap === 'manual') {s.manual = !s.manual; s.portfolioQuery = ''; draw(); document.getElementById('spMapPortfolio')?.focus();}
                    if (['prev','next'].includes(b.dataset.spMap)) {s.page += b.dataset.spMap === 'next' ? 1 : -1; load();}
                });
                root.addEventListener('change', event => {
                    if (['spMapPortfolio','spMapField','spMapActive'].includes(event.target.id) && !s.busy) capture();
                });
                root.addEventListener('input', event => {
                    if (event.target.id !== 'spMapPortfolioQuery' || s.busy) return;
                    capture(); s.portfolioQuery = event.target.value;
                    // Filter locally without replacing the focused input or making a request.
                    document.getElementById('spMapPortfolio').innerHTML = portfolioChoices(s, context);
                });
                root.addEventListener('submit', async event => {
                    if (!['spMapSearch','spMapForm'].includes(event.target.id)) return;
                    event.preventDefault(); if (s.busy) return; capture();
                    if (event.target.id === 'spMapSearch') {s.q = document.getElementById('spMapQuery').value; s.page = 1; await load(); return;}
                    if (!context.can_manage) return;
                    const row = s.edit, payload = {...s.draft, ...(row ? {version:row.version} : {})};
                    s.busy = true; s.message = 'Menyimpan…'; draw();
                    try {
                        const result = await json('/sp/portfolio-mappings' + (row ? '/' + row.id : ''), {
                            method:row ? 'PUT' : 'POST', headers:{'Content-Type':'application/json','X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').content}, body:JSON.stringify(payload)});
                        s.portfolios = [...new Set([...s.portfolios, payload.portfolio])];
                        s.edit = null; s.draft = null; s.manual = false; s.portfolioQuery = ''; await load(); s.message = result.message;
                    } catch (error) {s.message = error.message;} finally {s.busy = false; draw();}
                });
                try {
                    const choices = await window.SPPHPrintMasters.choices(null, null, null, true);
                    if (closed) return;
                    capture(); s.fields = choices.fields; await load();
                } catch (error) {s.message = error.message; draw();}
            }});
    }};
    function render(s, context) {
        const draft = s.draft || s.edit;
        const selected = draft?.portfolio ?? context.portfolios[0] ?? '';
        return `<div class="spph-signing-content"><span class="sg-eyebrow">PENGATURAN BERSAMA · DIAUDIT</span>
        <ol class="spph-signing-help"><li><strong>Pilih portofolio</strong> dari dropdown, misalnya IT - FERS.</li><li><strong>Pilih bidang pemilik PR</strong> yang sesuai, lalu klik <strong>Simpan pemetaan</strong>.</li><li>Cetak SP berikutnya otomatis mengikuti pemetaan aktif ini.</li></ol><p>Portofolio sudah dipetakan? Gunakan <strong>Edit pemetaan</strong> pada daftar tersimpan, bukan menambah ulang.</p>
        <form id="spMapSearch" class="sp-map-search"><label for="spMapQuery">Cari pemetaan yang sudah disimpan<input id="spMapQuery" maxlength="150" value="${escape(s.q)}" placeholder="Contoh: IT - FERS"></label><button type="submit" class="sg-soft-button">Cari pemetaan</button></form>
        ${context.can_manage ? `<form id="spMapForm" class="sg-master-form"><span class="sg-eyebrow">${s.edit ? 'EDIT PEMETAAN' : 'BUAT PEMETAAN BARU'}</span>
        ${!s.manual ? `<label for="spMapPortfolioQuery">Saring pilihan portofolio <small>(opsional, tanpa request server)</small><input id="spMapPortfolioQuery" maxlength="150" value="${escape(s.portfolioQuery)}" placeholder="Ketik FERS, LAB, QAQC…" autocomplete="off"></label>` : ''}
        <label for="spMapPortfolio">1. ${s.manual ? 'Ketik nama portofolio' : 'Pilih portofolio'} ${s.manual ? `<input id="spMapPortfolio" required maxlength="150" value="${escape(selected)}" placeholder="Gunakan nama persis seperti data PR">` : `<select id="spMapPortfolio" class="sp-map-select" required aria-describedby="spMapPortfolioHelp">${portfolioChoices(s, context)}</select>`}</label>
        <p id="spMapPortfolioHelp">${s.manual ? 'Nama manual harus sama dengan portofolio pada PR agar cocok otomatis.' : 'Klik dropdown untuk membuka daftar. Portofolio dari PR SP ini tersedia di kelompok paling atas.'}</p>
        <button type="button" class="sg-soft-button" data-sp-map="manual">${s.manual ? 'Kembali ke dropdown portofolio' : 'Portofolio belum ada? Isi manual'}</button>
        ${s.optionsTruncated ? '<p>Daftar dibatasi agar tetap ringan. Bila belum tercantum, gunakan Isi manual.</p>' : ''}
        <label for="spMapField">2. Pilih bidang pemilik PR<select id="spMapField" class="sp-map-select" required><option value="">Pilih bidang…</option>${s.fields.map(f => `<option value="${Number(f.id)}" ${Number(f.id) === Number(draft?.field_id) ? 'selected' : ''}>${escape(f.nama)}</option>`).join('')}</select></label>
        <label class="sg-check"><input type="checkbox" id="spMapActive" ${!draft || draft.is_active ? 'checked' : ''}>Pemetaan aktif (dipakai untuk rekomendasi otomatis)</label>
        <div class="sg-inline-actions"><button type="submit" class="sg-primary" ${s.busy || !s.fields.length ? 'disabled' : ''}>${s.busy ? 'Menyimpan…' : s.edit ? 'Simpan perubahan' : 'Simpan pemetaan'}</button>${s.edit ? '<button type="button" class="sg-soft-button" data-sp-map="cancel">Batal edit</button>' : ''}</div></form>` : '<p>Akses baca-saja. Hubungi petugas Umum untuk mengubah pemetaan.</p>'}
        <p class="sg-status" role="status">${escape(s.message)}</p><h3 class="sp-map-list-title">Pemetaan tersimpan</h3>
        ${s.rows.map(r => `<article class="sg-master-row"><strong>${escape(r.portfolio)}</strong><p>${escape(r.field_name || 'Master bidang tidak tersedia')} · ${r.is_active ? 'Aktif' : 'Nonaktif'}</p>${context.can_manage ? `<button type="button" class="sg-soft-button" data-sp-map="edit" data-id="${Number(r.id)}">Edit pemetaan</button>` : ''}</article>`).join('') || '<p>Belum ada pemetaan yang cocok. Pilih portofolio dan bidang pada form di atas untuk menambahkan.</p>'}
        <div class="sg-pagination"><button type="button" class="sg-soft-button" data-sp-map="prev" ${s.page <= 1 ? 'disabled' : ''}>Sebelumnya</button><span>${s.page} / ${s.last}</span><button type="button" class="sg-soft-button" data-sp-map="next" ${s.page >= s.last ? 'disabled' : ''}>Berikutnya</button></div><p class="spph-signing-time">Perubahan dicatat di audit. Nonaktifkan pemetaan yang tidak berlaku melalui Edit; dokumen yang sudah diunduh tidak berubah.</p></div>`;
    }
})();
