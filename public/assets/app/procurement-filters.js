(function () {
    'use strict';
    let hint, boundRoot, activeOptions;
    function markDirty() {
        if (hint) hint.textContent = 'Pilihan belum diterapkan. Tekan Enter atau klik Terapkan Filter.';
    }
    function isLocked() { return activeOptions && activeOptions.lockedSearch() !== null; }
    function validDates() {
        const from = boundRoot?.querySelector('#dariInput'), until = boundRoot?.querySelector('#sampaiInput');
        if (from?.value && until?.value && from.value > until.value) {
            if (hint) hint.textContent = 'Tanggal mulai tidak boleh setelah tanggal akhir. Periksa rentang tanggal.';
            from.focus?.();
            return false;
        }
        return true;
    }
    function apply() {
        if (!activeOptions) return;
        const options = activeOptions;
        if (options.lockedSearch() !== null) return;
        if (!validDates()) return;
        boundRoot.querySelector('#searchSpinner')?.classList.remove('hidden');
        options.apply();
    }
    window.ProcurementFilters = {
        markDirty, apply,
        clear(ids) {
            if (!boundRoot || isLocked()) return;
            for (const id of Array.isArray(ids) ? ids : [ids]) {
                const field = boundRoot.querySelector('#' + id);
                if (field) field.value = '';
            }
            apply();
        },
        reset() {
            if (!boundRoot || isLocked()) return;
            boundRoot.querySelectorAll('input, select').forEach(field => { field.value = ''; });
            apply();
        },
        navigate(path, query) {
            if (isLocked() || !validDates()) return;
            const url = new URL(path, window.location.origin);
            if (url.origin !== window.location.origin) return;
            url.search = query || '';
            const current = new URL(window.location.href), frame = current.pathname.match(/^\/virtual-office\/hologram\/(sp|spph)$/);
            // Searches stay in their document frame; exports use the download route.
            if (frame && url.pathname === '/' + frame[1]) {
                url.pathname = current.pathname;
                const channel = current.searchParams.get('office_frame') || '';
                if (/^\d{1,12}$/.test(channel)) url.searchParams.set('office_frame', channel);
            }
            window.location.href = url.pathname + url.search;
        },
        bind(options) {
            const root = document.getElementById('procurementFilters');
            if (!root || root.dataset.manualFilterBound) return;
            root.dataset.manualFilterBound = 'true';
            boundRoot = root;
            activeOptions = options;
            hint = root.querySelector('#filterPendingHint');
            const search = root.querySelector('#searchInput');
            root.querySelectorAll('input, select').forEach(field => {
                field.addEventListener('input', () => {
                    const locked = options.lockedSearch();
                    if (locked !== null) { if (search) search.value = locked; return; }
                    markDirty();
                });
                field.addEventListener('change', markDirty);
                field.addEventListener('keydown', event => {
                    if (event.key === 'Enter' && !event.isComposing) { event.preventDefault(); apply(); }
                });
            });
            root.querySelector('#applyProcurementFilters')?.addEventListener('click', apply);
        }
    };
})();
