(function () {
    'use strict';
    const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const money = value => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:2}).format(Number(value || 0));
    const clone = value => JSON.parse(JSON.stringify(value));
    const allowedUrl = value => {
        try { const url = new URL(value,location.origin); return url.origin === location.origin && ['https:','http:'].includes(url.protocol) ? url.href : null; }
        catch { return null; }
    };
    function favoriteUrl(page, filters, allowed) {
        const params = new URLSearchParams();
        for (const [key,value] of Object.entries(filters)) {
            if (!allowed.includes(key)) continue;
            for (const part of Array.isArray(value) ? value : [value]) params.append(key + (Array.isArray(value) ? '[]' : ''),part);
        }
        return `/${page}${params.size ? `?${params}` : ''}`;
    }
    function applyLayout(table, columns, layout, page) {
        const keys = Object.keys(columns);
        table.dataset.wsDensity = layout.density;
        table.dataset.wsCustom = String(layout.visible.length !== keys.length);
        const rows = [...table.tHead.rows, ...table.tBodies[0].rows];
        for (const row of rows) {
            const cells = [...row.children];
            if (cells.length !== keys.length || cells.some(cell => cell.colSpan > 1)) continue;
            cells.forEach((cell,index) => { if (!cell.dataset.wsColumn) cell.dataset.wsColumn = keys[index]; });
            for (const key of layout.order) {
                const cell = cells.find(candidate => candidate.dataset.wsColumn === key);
                if (!cell) continue;
                cell.classList.toggle('ws-column-hidden', !layout.visible.includes(key) && !['number','actions'].includes(key));
                row.appendChild(cell);
            }
            if (row.parentElement === table.tHead) continue;
            const id = row.dataset.workspaceId || row.dataset.id;
            const cell = cells.find(candidate => candidate.dataset.wsColumn === 'number');
            if (id && cell && !cell.querySelector('[data-ws-detail]')) {
                const button = document.createElement('button');
                button.type = 'button'; button.className = 'ws-peek'; button.dataset.wsDetail = id; button.dataset.wsKind = page;
                button.textContent = 'Rincian cepat'; button.setAttribute('aria-label',`Rincian cepat ${cell.textContent.trim().slice(0,100)}`);
                cell.appendChild(button);
            }
        }
    }
    window.ProcurementWorkspaceUI = {favoriteUrl,applyLayout};
    document.addEventListener('DOMContentLoaded', () => {
        const configEl = document.getElementById('wsConfig');
        if (!configEl) return;
        const config = JSON.parse(configEl.textContent), table = document.querySelector(`[data-workspace-table="${config.page}"]`);
        const dialog = document.getElementById('wsDialog'), body = document.getElementById('wsBody'), status = document.getElementById('wsStatus'), title = document.getElementById('wsDialogTitle');
        let state = config.state, draftLayout, mode, loading, activeDetail, lastFocus, saving = false, deleteId, serial = 0;
        const history = [];
        const updateTable = () => { if (table) applyLayout(table,config.columns,state.settings.layout,config.page); };
        updateTable();
        // Observe row insertions only, not cell reordering or the whole document.
        if (table) new MutationObserver(updateTable).observe(table.tBodies[0],{childList:true});
        const setStatus = message => { status.textContent = message; };
        function open(nextMode, heading) {
            mode = nextMode; dialog.dataset.mode = nextMode; title.textContent = heading; setStatus('');
            if (!dialog.open) { lastFocus = document.activeElement; dialog.showModal(); }
        }
        dialog.addEventListener('cancel', event => { if (saving) event.preventDefault(); });
        dialog.addEventListener('close', () => { serial++; loading?.abort(); history.length=0; activeDetail=null; if (lastFocus?.isConnected) lastFocus.focus(); });
        async function get(url) {
            loading?.abort(); loading = new AbortController();
            const response = await fetch(url,{headers:{Accept:'application/json','X-Requested-With':'XMLHttpRequest'},signal:loading.signal,cache:'no-store'});
            if (!response.ok) throw new Error(response.status === 403 ? 'Anda tidak memiliki akses ke rincian ini.' : response.status === 404 ? 'Dokumen tidak ditemukan atau telah dipindahkan ke Sampah.' : 'Data belum dapat dimuat. Silakan coba lagi.');
            return response.json();
        }
        function fieldsHtml(fields) {
            return `<dl class="ws-grid">${(fields || []).map(field=>`<div class="ws-field"><dt>${escape(field.label)}</dt><dd>${field.type==='money' ? money(field.value) : escape(field.value)}</dd></div>`).join('')}</dl>`;
        }
        function renderDetail(data) {
            let html = `<div class="ws-hero"><h3>${escape(data.number)}</h3><p>${escape(data.title)}</p><div class="ws-buttons">${history.length?'<button type="button" data-ws-back>← Rincian sebelumnya</button>':''}<button type="button" data-ws-refresh>↻ Muat terbaru</button>${data.archive_url ? '<button type="button" data-ws-archive>Muat lampiran PR</button>' : ''}</div></div><div class="ws-note">Panel baca-saja. Cache rincian maksimal ${escape(data.cache_seconds)} detik; gunakan Muat terbaru bila diperlukan. Pengaturan kolom tidak mengubah hak akses atau isi data.</div>`;
            html += fieldsHtml(data.fields);
            if (data.items?.length) html += `<h4>Barang / jasa · ${data.items.length} item ditampilkan</h4>${data.items.map((item,index)=>`<details class="ws-card" ${index===0?'open':''}><summary>${escape(item.number || index+1)}. ${escape(item.name.slice(0,100))}</summary><p>${escape(item.name)}</p><p>Jumlah: ${escape(item.quantity ?? '—')} ${escape(item.unit)}${item.due ? ` · Pemenuhan: ${escape(item.due)}`:''}</p>${item.price!=null ? `<p>Harga satuan: ${money(item.price)} · Subtotal: ${money(item.subtotal)}</p>`:''}</details>`).join('')}`;
            else if (data.kind !== 'ppbj') html += '<div class="ws-note">Belum ada rincian barang/jasa pada dokumen ini.</div>';
            if (data.items_truncated) html += '<p>Ditampilkan 50 item pertama. Buka dokumen lengkap untuk sisanya.</p>';
            if (data.prs?.length) html += `<h4>PR terkait · buka untuk perjalanan dan lampiran</h4>${data.prs.map(pr=>`<div class="ws-card"><strong>${escape(pr.number)}</strong><p>${escape(pr.title)}</p><p>${money(pr.amount)} · ${escape(pr.portfolio || 'Tanpa portofolio')} · ${escape(pr.buyer || 'Buyer belum diisi')}</p><button type="button" data-ws-detail="${Number(pr.id)}" data-ws-kind="ppbj">Rincian & perjalanan PR</button></div>`).join('')}`;
            if (data.prs_truncated) html += '<p>Ditampilkan 20 PR pertama.</p>';
            if (data.manual_pr) html += `<div class="ws-note">PR manual: ${escape(data.manual_pr)}. Belum terhubung ke PPBJ, sehingga perjalanan dan lampiran PR belum dapat ditampilkan.</div>`;
            if (data.documents?.length) html += `<h4>Dokumen terkait</h4><div class="ws-buttons">${data.documents.map(document=>`<button type="button" data-ws-detail="${Number(document.id)}" data-ws-kind="${escape(document.kind)}">${escape(document.number)}</button>`).join('')}</div>`;
            if (data.stages) html += `<h4>Perjalanan PR</h4>${data.stages.map(stage=>`<div class="ws-stage" data-done="${Boolean(stage.done)}">${stage.done?'✓':'○'} ${escape(stage.label)}<span>${escape(stage.date_label || 'Belum tercatat')}</span></div>`).join('')}`;
            if (data.tracking) html += `<h4>Tracking lapangan</h4>${data.tracking.length ? data.tracking.map(item=>`<div class="ws-card"><strong>${escape(item.title)}</strong><p>${escape(item.description)}</p><p>${escape(item.date)}</p></div>`).join('') : '<p>Belum ada catatan tracking.</p>'}`;
            if (data.audit) html += `<h4>Riwayat aktivitas terbaru</h4>${data.audit.length ? data.audit.map(item=>`<div class="ws-card"><strong>${escape(item.title)}</strong><p>${escape(item.actor)} · ${escape(item.date)}</p></div>`).join('') : '<p>Belum ada riwayat aktivitas.</p>'}`;
            body.innerHTML = html + '<div id="wsArchiveResult" aria-live="polite"></div>';
        }
        async function detail(kind,id,fresh=false,back=false) {
            if (!['ppbj','sp','spph'].includes(kind) || !/^\d+$/.test(String(id))) return;
            if (!fresh && !back && activeDetail && dialog.open && mode==='detail') history.push({kind:activeDetail.kind,id:activeDetail.id});
            const requestSerial = ++serial;
            activeDetail = {kind,id}; open('detail','Rincian cepat'); body.innerHTML = '<p>Memuat rincian dokumen…</p>';
            try { const data = await get(`/procurement-quick-detail/${kind}/${id}${fresh?'?fresh=1':''}`); if (!dialog.open || requestSerial!==serial) return; activeDetail.data = data; renderDetail(data); }
            catch(error) { if(error.name!=='AbortError' && requestSerial===serial && dialog.open) { body.innerHTML = '<div class="ws-note">Rincian belum tersedia. Tutup panel atau coba muat kembali.</div><button type="button" data-ws-refresh>Coba lagi</button>'; setStatus(error.message); } }
        }
        function appliedFilters() {
            const filters = {};
            for (const [raw,value] of new URLSearchParams(location.search)) {
                const key = raw.replace(/\[\d*\]$/,'');
                if (!config.filterKeys.includes(key) || value==='') continue;
                if (raw!==key) { (filters[key] ||= []).push(value); } else filters[key] = value;
            }
            if (config.page==='sp' && new URLSearchParams(location.search).get('oracle')==='1') filters.mode='oracle';
            return filters;
        }
        function filterSummary(filters) {
            return Object.entries(filters).map(([key,value])=>`${config.filterLabels?.[key] || key}: ${Array.isArray(value)?value.join(', '):value}`).join(' · ');
        }
        function renderFavorites() {
            open('favorites','Filter favorit pribadi');
            body.innerHTML = `
                <div class="ws-note">Hanya tersimpan untuk akun Anda. Yang disimpan adalah filter yang sudah diterapkan pada halaman, bukan isian yang masih menunggu Enter. Pagination tidak disimpan. Maksimal 10 favorit. Nama yang sama memperbarui favorit; tanggal disimpan sesuai tanggal yang dipilih.</div>
                <form id="wsFavoriteForm">
                    <label for="wsFavoriteName">Nama filter</label>
                    <input type="text" id="wsFavoriteName" name="name" maxlength="50" required placeholder="Contoh: Pengadaan saya bulan ini">
                    <p>${escape(filterSummary(appliedFilters()) || 'Tanpa filter — tampilkan semua data')}</p>
                    <button type="submit" class="ws-primary">Simpan filter halaman ini</button>
                </form>
                <h4>Favorit Anda</h4>
                ${state.settings.favorites.length ? state.settings.favorites.map(favorite=>`
                    <div class="ws-card ws-favorite">
                        <div><strong>${escape(favorite.name)}</strong><p>${escape(filterSummary(favorite.filters) || 'Tanpa filter — semua data')}</p></div>
                        <div class="ws-buttons">
                            <a class="ws-link" href="${escape(favoriteUrl(config.page,favorite.filters,config.filterKeys))}">Gunakan</a>
                            <button type="button" data-ws-delete="${escape(favorite.id)}">${deleteId===favorite.id?'Ya, hapus':'Hapus'}</button>
                        </div>
                    </div>`).join('') : '<p>Belum ada filter favorit.</p>'}`;
        }
        function renderLayout(reset=false) {
            open('layout','Tampilan tabel Anda');
            if (reset || !draftLayout) draftLayout = clone(state.settings.layout);
            body.innerHTML = `<div class="ws-note">Berlaku untuk akun Anda di halaman ini, termasuk perangkat lain. Nomor dokumen dan aksi tetap terlihat. Menyembunyikan kolom hanya mengubah tampilan, bukan izin akses.</div><form id="wsLayoutForm"><label for="wsDensity">Kepadatan baris</label><select id="wsDensity"><option value="comfortable" ${draftLayout.density==='comfortable'?'selected':''}>Nyaman</option><option value="compact" ${draftLayout.density==='compact'?'selected':''}>Ringkas</option></select><h4>Pilih kolom dan urutannya</h4>${draftLayout.order.map((key,index)=>`<div class="ws-column-row"><label><input type="checkbox" data-ws-column="${key}" ${draftLayout.visible.includes(key)?'checked':''} ${['number','actions'].includes(key)?'disabled':''}>${escape(config.columns[key])}${['number','actions'].includes(key)?' · tetap':''}</label><div class="ws-buttons"><button type="button" data-ws-move="${key}" data-ws-direction="-1" aria-label="Naikkan ${escape(config.columns[key])}" ${index===0 || ['number','actions'].includes(key) || ['number','actions'].includes(draftLayout.order[index-1])?'disabled':''}>↑</button><button type="button" data-ws-move="${key}" data-ws-direction="1" aria-label="Turunkan ${escape(config.columns[key])}" ${index===draftLayout.order.length-1 || ['number','actions'].includes(key) || ['number','actions'].includes(draftLayout.order[index+1])?'disabled':''}>↓</button></div></div>`).join('')}<div class="ws-buttons" style="margin-top:20px"><button type="submit" class="ws-primary">Simpan & terapkan tampilan</button><button type="button" data-ws-reset>Reset ke bawaan</button></div></form>`;
        }
        async function save(payload) {
            if (saving) return; saving = true; setStatus('Menyimpan preferensi pribadi…');
            dialog.querySelectorAll('button').forEach(button=>button.disabled=true);
            try {
                const response = await fetch(config.saveUrl,{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json','X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').content},body:JSON.stringify({...payload,version:state.version})});
                const data = await response.json();
                if (!response.ok && response.status!==409) throw new Error(Object.values(data.errors || {}).flat()[0] || data.message || 'Preferensi belum tersimpan.');
                state = {version:data.version,settings:data.settings}; updateTable(); deleteId=null;
                document.getElementById('wsFavoriteCount').textContent = state.settings.favorites.length;
                if(mode==='layout') renderLayout(true); else renderFavorites(); setStatus(data.message);
            } catch(error) { setStatus(error.message || 'Koneksi bermasalah. Periksa kembali sebelum mencoba ulang.'); }
            finally { saving=false; dialog.querySelector('[data-ws-close]').disabled=false; if(mode==='layout') { const message=status.textContent; renderLayoutButtons();setStatus(message); } else dialog.querySelectorAll('button').forEach(button=>button.disabled=false); }
        }
        function renderLayoutButtons() { renderLayout(false); }
        document.addEventListener('change',event=>{
            if (event.target.dataset.wsColumn) {
                const key=event.target.dataset.wsColumn;
                draftLayout.visible=event.target.checked?[...new Set([...draftLayout.visible,key])]:draftLayout.visible.filter(column=>column!==key);
            }
            if(event.target.id==='wsDensity') draftLayout.density=event.target.value;
        });
        document.addEventListener('submit',event=>{
            if(event.target.id==='wsFavoriteForm') { event.preventDefault(); save({action:'favorite_save',name:document.getElementById('wsFavoriteName').value,filters:appliedFilters()}); }
            if(event.target.id==='wsLayoutForm') { event.preventDefault(); save({action:'layout',layout:draftLayout}); }
        });
        document.addEventListener('click',async event=>{
            const button=event.target.closest('button'); if(!button) return;
            if(button.hasAttribute('data-ws-detail')) { event.preventDefault(); detail(button.dataset.wsKind,button.dataset.wsDetail); }
            if(button.dataset.wsOpen==='favorites') { deleteId=null; renderFavorites(); }
            if(button.dataset.wsOpen==='layout') renderLayout(true);
            if(button.hasAttribute('data-ws-close') && !saving) dialog.close();
            if(button.dataset.wsDelete) {
                if(deleteId===button.dataset.wsDelete) save({action:'favorite_delete',favorite_id:deleteId});
                else { deleteId=button.dataset.wsDelete; renderFavorites(); setStatus('Klik Ya, hapus untuk menghapus favorit ini. Data pengadaan tidak berubah.'); }
            }
            if(button.dataset.wsMove) {
                const index=draftLayout.order.indexOf(button.dataset.wsMove), target=index+Number(button.dataset.wsDirection);
                [draftLayout.order[index],draftLayout.order[target]]=[draftLayout.order[target],draftLayout.order[index]]; renderLayout(false);
            }
            if(button.hasAttribute('data-ws-reset')) { draftLayout={visible:Object.keys(config.columns),order:Object.keys(config.columns),density:'comfortable'}; renderLayout(false); setStatus('Pilihan bawaan disiapkan. Klik Simpan & terapkan untuk menyimpan.'); }
            if(button.hasAttribute('data-ws-refresh') && activeDetail) detail(activeDetail.kind,activeDetail.id,true);
            if(button.hasAttribute('data-ws-back') && history.length) { const previous=history.pop();detail(previous.kind,previous.id,false,true); }
            if(button.hasAttribute('data-ws-archive') && activeDetail?.data?.archive_url) {
                const requestSerial=serial;
                const result=document.getElementById('wsArchiveResult'); result.innerHTML='<p>Memeriksa layanan arsip… Rincian utama tetap dapat dibaca.</p>';
                try {
                    const data=await get(activeDetail.data.archive_url);
                    if(!result.isConnected || requestSerial!==serial || !dialog.open) return;
                    result.innerHTML=`<h4>Arsip & lampiran</h4><p>${escape(data.message)}</p>${(data.documents || []).slice(0,50).map(file=>{
                        const preview=allowedUrl(file.preview_gateway_url), download=allowedUrl(file.download_gateway_url);
                        return `<div class="ws-card"><strong>${escape(file.name)}</strong><p>${escape(file.type)} · ${escape(file.size || 'Ukuran belum tercatat')}</p><div class="ws-buttons">${preview?`<a class="ws-link" href="${escape(preview)}" target="_blank" rel="noopener">Buka</a>`:''}${download?`<a class="ws-link" href="${escape(download)}" target="_blank" rel="noopener">Unduh</a>`:''}</div></div>`;
                    }).join('')}`;
                } catch(error) { if(error.name!=='AbortError') result.textContent='Lampiran belum dapat dimuat. '+error.message; }
            }
        });
    });
})();
