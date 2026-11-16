(() => {
    'use strict';
    const root = document.getElementById('ppbjReport');
    if (!root || root.dataset.reportBound) return;
    root.dataset.reportBound = '1';
    const form = document.getElementById('reportFilters');
    const periodType = document.getElementById('periodType'), startDate = document.getElementById('startDate'), endDate = document.getElementById('endDate');
    const perPage = document.getElementById('reportPerPage'), previous = root.querySelector('[data-report-previous]'), next = root.querySelector('[data-report-next]');
    let current = null, epoch = 0, pagination = null, initial = true, exportTimer = null;
    const numeric = value => Number.isFinite(Number(value)) ? Number(value) : 0;
    function notice(message) {const node = document.getElementById('reportStatus'); node.hidden = !message; node.textContent = message;}
    function hideReportSections() {['statsSection','breakdownSection','dataSection','emptyState'].forEach(id => document.getElementById(id).classList.add('hidden'));}
    function pager(disabled) {previous.disabled = disabled || !pagination || pagination.page <= 1; next.disabled = disabled || !pagination || pagination.page >= pagination.last_page; perPage.disabled = disabled;}
    function release(operation) {if (current !== operation) return; current = null; form.removeAttribute('aria-busy'); document.getElementById('loadingState').classList.add('hidden');}
    function cancel() {epoch++; if (current) {const operation = current; operation.controller.abort(); release(operation);} }
    function invalidate() {cancel(); pagination = null; pager(true); hideReportSections(); notice('Filter berubah. Klik Tampilkan untuk memperbarui laporan.');}
    function today() {
        return new Intl.DateTimeFormat('en-CA', {timeZone:root.dataset.timezone || 'Asia/Jakarta',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
    }
    function configurePeriod() {
        const period = periodType.value, date = today();
        startDate.removeAttribute('min'); startDate.removeAttribute('max'); startDate.required = true;
        if (period === 'yearly') {startDate.type = 'number'; startDate.min = '1000'; startDate.max = '9998'; startDate.step = '1'; startDate.value = date.slice(0,4);}
        else {startDate.type = period === 'monthly' ? 'month' : 'date'; startDate.min = period === 'monthly' ? '1000-01' : '1000-01-01'; startDate.max = period === 'monthly' ? '9998-12' : '9998-12-31'; startDate.value = period === 'monthly' ? date.slice(0,7) : date;}
        endDate.required = period === 'custom'; endDate.value = endDate.required ? date : ''; endDate.min = '1000-01-01'; endDate.max = '9998-12-31';
        document.getElementById('endDateWrapper').classList.toggle('hidden', !endDate.required);
        document.getElementById('startDateLabel').textContent = {yearly:'Tahun',monthly:'Bulan',daily:'Tanggal',custom:'Tanggal Mulai'}[period];
    }
    function reportParams() {
        if (!window.FormUX?.validate(form)) return null;
        if (periodType.value === 'custom' && endDate.value < startDate.value) {window.FormUX.errors(form, {end_date:['Tanggal akhir harus sama dengan atau setelah tanggal awal.']}); return null;}
        const params = new URLSearchParams({period:periodType.value,start_date:startDate.value});
        if (periodType.value === 'custom') params.set('end_date', endDate.value);
        for (const [id,key] of [['portofolioFilter','portofolio[]'],['vendorFilter','vendor[]']]) {
            [...document.getElementById(id).selectedOptions].forEach(option => {if (option.value !== '') params.append(key, option.value);});
        }
        return params;
    }
    function localUrl(url, params) {const target = new URL(url, window.location.href); if (target.origin !== window.location.origin) throw new Error('Tujuan laporan belum valid. Muat ulang halaman.'); target.search = params.toString(); return target.href;}
    async function requestReport(url, controller) {
        if (controller.signal.aborted) throw new DOMException('Aborted','AbortError');
        let timer, onAbort;
        try {
            const aborted = new Promise((_, reject) => {onAbort = () => reject(new DOMException('Aborted','AbortError')); controller.signal.addEventListener('abort',onAbort,{once:true}); if (controller.signal.aborted) onAbort();});
            const deadline = new Promise((_, reject) => {timer = setTimeout(() => {reject(new Error('Laporan belum selesai dibaca. Persempit periode atau klik Tampilkan untuk mencoba kembali.')); controller.abort();},20000);});
            return await Promise.race([aborted,deadline,(async () => {
                const response = await fetch(url, {credentials:'same-origin',cache:'no-store',signal:controller.signal,headers:{Accept:'application/json','X-Requested-With':'XMLHttpRequest'}});
                if (response.redirected || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Respons laporan belum dapat diverifikasi. Muat ulang atau masuk kembali.');
                const data = await response.json().catch(() => null);
                if (!response.ok) {
                    const messages = {401:'Sesi berakhir. Masuk kembali.',403:'Anda tidak memiliki izin membaca laporan ini.',419:'Sesi berakhir. Muat ulang halaman.',422:'Filter laporan belum valid. Periksa isian yang ditandai.',429:'Terlalu banyak pembacaan. Tunggu sebentar sebelum mencoba kembali.'};
                    throw Object.assign(new Error(messages[response.status] || 'Laporan belum dapat dibaca. Silakan coba kembali.'), {status:response.status,fields:response.status===422?data?.errors:null});
                }
                return validateResult(data);
            })()]);
        } finally {clearTimeout(timer); controller.signal.removeEventListener('abort',onAbort);}
    }
    function validateResult(data) {
        const page = data?.pagination, stats = data?.stats;
        const positive = value => Number.isSafeInteger(value) && value > 0;
        const rows = data?.data;
        if (!Array.isArray(rows) || !page || !stats || !positive(page.page) || !positive(page.last_page) || ![25,50,100].includes(page.per_page)
            || !Number.isSafeInteger(stats.total) || stats.total < 0 || page.total !== stats.total || page.last_page !== Math.max(1,Math.ceil(page.total/page.per_page)) || page.page > page.last_page
            || rows.length !== Math.min(page.per_page,Math.max(0,page.total-(page.page-1)*page.per_page)) || rows.some(row => !row || typeof row !== 'object' || Array.isArray(row))
            || page.from !== (rows.length ? (page.page-1)*page.per_page+1 : null) || page.to !== (rows.length ? (page.page-1)*page.per_page+rows.length : null)
            || !['on_track','warning','overdue','cancelled','total_portofolio','total_vendor'].every(key=>Number.isSafeInteger(stats[key])&&stats[key]>=0)
            || !['total_value','total_sp_value','total_bpg_value','avg_progress'].every(key=>typeof stats[key]==='number'&&Number.isFinite(stats[key]))
            || !['portofolio','vendor'].every(key => Array.isArray(data.breakdown?.[key]) && data.breakdown[key].length<=20 && data.breakdown[key].every(row=>row&&typeof row==='object'&&!Array.isArray(row)))) {
            throw new Error('Data laporan belum lengkap. Muat ulang halaman sebelum mencoba kembali.');
        }
        return data;
    }
    async function loadReport(page = 1) {
        initial = false;
        const params = reportParams(); if (!params) {cancel(); pager(true); return;}
        params.set('page',String(page)); params.set('per_page',perPage.value);
        const key = params.toString(); if (current?.key === key) return current.promise;
        cancel(); const operation = {key,epoch,controller:new AbortController()}; current = operation;
        hideReportSections(); pager(true); notice(''); document.getElementById('loadingState').classList.remove('hidden'); form.setAttribute('aria-busy','true');
        operation.promise = (async () => {
            try {
                const result = await requestReport(localUrl(root.dataset.readUrl,params),operation.controller);
                if (current !== operation || epoch !== operation.epoch) return;
                pagination = result.pagination; renderStats(result.stats); renderBreakdown(result.breakdown); renderTable(result.data);
                setText('tableLimitInfo', `${pagination.from ?? 0}–${pagination.to ?? 0} dari ${pagination.total.toLocaleString('id-ID')} data`);
                setText('reportPageInfo', `Halaman ${pagination.page} dari ${pagination.last_page}`);
                document.getElementById('statsSection').classList.remove('hidden');
                document.getElementById('breakdownSection').classList.toggle('hidden',!result.data.length);
                document.getElementById('dataSection').classList.toggle('hidden',!result.data.length);
                document.getElementById('emptyState').classList.toggle('hidden',!!result.data.length); pager(false);
                notice(result.data.length ? '' : 'Tidak ada data yang cocok. Ringkasan menunjukkan total untuk filter ini.');
            } catch (error) {
                if (current !== operation || epoch !== operation.epoch || error.name === 'AbortError') return;
                notice(error instanceof TypeError ? 'Koneksi terputus. Klik Tampilkan untuk mencoba kembali.' : error.message);
                if (error.fields) window.FormUX.errors(form,error.fields);
            } finally {release(operation);}
        })();
        return operation.promise;
    }
    function resetReportFilter() {
        cancel(); window.FormUX?.clear(form); periodType.value = 'monthly'; configurePeriod(); perPage.value = '50';
        for (const id of ['portofolioFilter','vendorFilter']) [...document.getElementById(id).options].forEach(option => option.selected = false);
        return loadReport();
    }
    function exportReport() {
        if (exportTimer !== null) return;
        const params = reportParams(); if (!params) return;
        try {
            const url = localUrl(root.dataset.exportUrl,params); exportTimer = setTimeout(() => {exportTimer=null;},2000);
            notice('Permintaan unduhan dikirim. Periksa daftar unduhan browser; CSV mencakup seluruh hasil filter.'); window.location.href = url;
        } catch (error) {notice(error.message);}
    }
    form.addEventListener('submit',event => {event.preventDefault();loadReport();});
    periodType.addEventListener('change',configurePeriod);
    form.addEventListener('input',invalidate); form.addEventListener('change',invalidate);
    root.querySelector('[data-report-reset]').addEventListener('click',resetReportFilter);
    root.querySelector('[data-report-export]').addEventListener('click',exportReport);
    previous.addEventListener('click',() => {if (pagination && !previous.disabled) loadReport(pagination.page-1);});
    next.addEventListener('click',() => {if (pagination && !next.disabled) loadReport(pagination.page+1);});
    perPage.addEventListener('change',() => loadReport());
    document.addEventListener('visibilitychange',() => {if (document.hidden) {if (current) {cancel();pager(true);notice('Pembacaan dijeda. Klik Tampilkan saat kembali.');}} else if (initial) loadReport();});
    window.addEventListener('pagehide',() => {initial=false;cancel();pager(true);clearTimeout(exportTimer);exportTimer=null;});
    window.loadReport = loadReport; window.resetReportFilter = resetReportFilter; window.exportReport = exportReport;
    function renderStats(stats) {
        setText('statTotal', stats.total || 0);
        setText('statOnTrack', stats.on_track || 0);
        setText('statWarning', stats.warning || 0);
        setText('statOverdue', stats.overdue || 0);
        setText('statTotalValue', formatRupiah(stats.total_value));
        setText('statTotalSpValue', formatRupiah(stats.total_sp_value));
        setText('statTotalBpgValue', formatRupiah(stats.total_bpg_value));
        setText('statTotalPortofolio', stats.total_portofolio || 0);
        setText('statTotalVendor', stats.total_vendor || 0);
    }

    function renderBreakdown(breakdown) {
        renderBreakdownTable('breakdownPortofolioBody', breakdown.portofolio || [], 'Belum ada portofolio');
        renderBreakdownTable('breakdownVendorBody', breakdown.vendor || [], 'Belum ada vendor');
    }

    function renderBreakdownTable(bodyId, rows, emptyLabel) {
        const tbody = document.getElementById(bodyId);
        tbody.innerHTML = '';

        if (!rows.length) {
            tbody.innerHTML = `<tr><td colspan="4" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">${emptyLabel}</td></tr>`;
            return;
        }

        rows.forEach(row => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors';
            tr.innerHTML = `
                <td class="px-4 py-3 font-semibold text-gray-900 dark:text-white">${escapeHtml(row.label || '-')}</td>
                <td class="px-4 py-3 text-center text-gray-600 dark:text-gray-300">${Number(row.total || 0).toLocaleString('id-ID')}</td>
                <td class="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">${formatRupiah(row.total_value)}</td>
                <td class="px-4 py-3 text-right text-gray-600 dark:text-gray-300">${formatRupiah(row.total_sp_value)}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    function renderTable(data) {
        const tbody = document.getElementById('dataTableBody');
        tbody.innerHTML = '';

        data.forEach((row, index) => {
            const statusColor = {
                'ON TRACK': 'bg-emerald-600',
                'WARNING': 'bg-amber-500',
                'OVERDUE': 'bg-red-600',
                'CANCELLED': 'bg-gray-600'
            }[row.status_sla] || 'bg-gray-500';

            const progress = Math.max(0, Math.min(100, numeric(row.progres)));
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors animate-fade-in';
            tr.style.animationDelay = `${Math.min(index, 12) * 0.03}s`;
            tr.innerHTML = `
                <td class="px-4 py-3 font-bold text-gray-900 dark:text-white whitespace-nowrap">${escapeHtml(row.ppbj_no || '-')}</td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">${formatDate(row.created_at)}</td>
                <td class="px-4 py-3 text-gray-900 dark:text-white">${escapeHtml(row.uraian || '-')}</td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-300">${escapeHtml(row.portofolio || '-')}</td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-300">${escapeHtml(row.buyer || '-')}</td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-300">${escapeHtml(row.penyedia_eksternal || '-')}</td>
                <td class="px-4 py-3 text-center">
                    <span class="inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs font-bold text-white ${statusColor}">
                        ${escapeHtml(row.status_sla || '-')}
                    </span>
                </td>
                <td class="px-4 py-3 text-center">
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div class="h-2 rounded-full bg-blue-600 transition-all duration-500" style="width: ${progress}%"></div>
                    </div>
                    <small class="text-gray-600 dark:text-gray-400">${progress}%</small>
                </td>
                <td class="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white whitespace-nowrap">${formatRupiah(row.total_sebelum_ppn)}</td>
                <td class="px-4 py-3 text-right text-gray-600 dark:text-gray-300 whitespace-nowrap">${formatRupiah(row.nilai_sp_spk)}</td>
                <td class="px-4 py-3 text-right text-gray-600 dark:text-gray-300 whitespace-nowrap">${formatRupiah(row.nilai_bpg)}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    function setText(id, value) {
        document.getElementById(id).textContent = value;
    }

    function formatRupiah(value) {
        return 'Rp ' + numeric(value).toLocaleString('id-ID');
    }

    function formatDate(value) {
        const day = typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value) ? new Date(value.slice(0,10)+'T00:00:00Z') : null;
        return day && Number.isFinite(day.getTime()) ? day.toLocaleDateString('id-ID',{timeZone:'UTC',day:'2-digit',month:'short',year:'numeric'}) : '-';
    }
    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
    }
    configurePeriod(); if (!document.hidden) loadReport();
})();
