(function () {
    'use strict';
    const labels = {
        tanggal: 'Tanggal SPPH', tanggal_sp: 'Tanggal SP', tgl_sph: 'Tgl SPH',
        promised_date: 'Promised date', tanggal_pemenang: 'Tanggal penetapan pemenang',
        awal_kontrak: 'Awal kontrak', akhir_kontrak: 'Akhir kontrak'
    };
    const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
    function parse(value) {
        const match = /^(\d{4,})-(\d{2})-(\d{2})$/.exec(value || '');
        if (!match) return null;
        const [year, month, day] = match.slice(1).map(Number);
        const date = new Date(0);
        date.setUTCFullYear(year, month - 1, day);
        date.setUTCHours(0, 0, 0, 0);
        if (year < 1 || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
        return {year, time: date.getTime(), display: `${match[3]}/${match[2]}/${match[1]}`};
    }
    function inspect(form, today) {
        let item = 0;
        const fields = Array.from(form.querySelectorAll('input[type="date"][name]'))
            .filter(field => !field.matches(':disabled'))
            .map(field => ({field, date: parse(field.value), item: /^items\[\d+\]\[tgl_pemenuhan\]$/.test(field.name) ? ++item : null}))
            .filter(entry => entry.date);
        const find = name => fields.find(entry => entry.field.name === name)?.date;
        const documentDate = find('tanggal_sp') || find('tanggal');
        const contractStart = find('awal_kontrak');
        const future = new Date(today.time);
        future.setUTCFullYear(today.year + 2);
        return fields.flatMap(({field, date, item}) => {
            const fulfillment = item !== null;
            const label = fulfillment ? `Tanggal pemenuhan · barang ${item}` : labels[field.name] || field.labels?.[0]?.textContent.trim() || 'Tanggal';
            const reasons = [];
            if (date.year < today.year) reasons.push(`Tahun ${date.year} sudah lewat; tahun berjalan ${today.year}.`);
            if (date.time > future.getTime()) reasons.push('Tanggal lebih dari 2 tahun ke depan.');
            if (['tanggal', 'tanggal_sp', 'tgl_sph', 'tanggal_pemenang'].includes(field.name) && date.time > today.time) reasons.push('Tanggal dokumen berada di masa depan.');
            if ((fulfillment || field.name === 'promised_date') && documentDate && date.time < documentDate.time) reasons.push('Tanggal pemenuhan lebih awal dari tanggal dokumen.');
            if (['tgl_sph', 'tanggal_pemenang'].includes(field.name) && documentDate && date.time > documentDate.time) reasons.push('Tanggal ini melewati tanggal SP.');
            if (field.name === 'akhir_kontrak' && contractStart && date.time < contractStart.time) reasons.push('Akhir kontrak lebih awal dari awal kontrak.');
            return reasons.length ? [{label, date: date.display, reasons}] : [];
        });
    }
    window.ProcurementDateWarning = {
        async confirm(form, kind) {
            // Use the application's calendar, not a potentially incorrect device clock.
            const config = kind === 'sp' ? window.SP_PAGE_CONFIG : window.SPPH_PAGE_CONFIG;
            const clock = new Date();
            const localDay = `${clock.getFullYear()}-${String(clock.getMonth() + 1).padStart(2, '0')}-${String(clock.getDate()).padStart(2, '0')}`;
            const today = parse(config?.today) || parse(localDay);
            if (!today) return true;
            const warnings = inspect(form, today);
            if (!warnings.length) return true;
            const title = `Yakin menyimpan ${kind === 'sp' ? 'SP' : 'SPPH'} dengan tanggal ini?`;
            const note = 'Ini hanya pengingat. Jika tanggal sudah benar, pilih Lanjut simpan. Tanggal tetap sesuai isian Anda.';
            if (!window.Swal?.fire) return window.confirm(`${title}\n\n${warnings.map(w => `${w.label}: ${w.date}\n${w.reasons.join(' ')}`).join('\n\n')}\n\n${note}`);
            const result = await window.Swal.fire({
                title, icon: 'info',
                html: `<p>${note}</p>${warnings.map(w => `<div class="pr-row"><strong>${escape(w.label)}: ${escape(w.date)}</strong>${w.reasons.map(reason => `<p class="pr-muted">${escape(reason)}</p>`).join('')}</div>`).join('')}`,
                showCancelButton: true, confirmButtonText: 'Lanjut simpan', cancelButtonText: 'Periksa tanggal',
                focusCancel: true, width: 650, customClass: {popup: 'pr-review'},
                confirmButtonColor: '#3157d9', cancelButtonColor: '#475569'
            });
            return result.isConfirmed === true;
        }
    };
}());
