(function () {
    'use strict';
    let hint;
    function markDirty() {
        if (hint) hint.textContent = 'Pilihan belum diterapkan. Tekan Enter atau klik Terapkan Filter.';
    }
    window.ProcurementFilters = {
        markDirty,
        bind(options) {
            const root = document.getElementById('procurementFilters');
            if (!root || root.dataset.manualFilterBound) return;
            root.dataset.manualFilterBound = 'true';
            hint = root.querySelector('#filterPendingHint');
            const search = root.querySelector('#searchInput');
            const spinner = root.querySelector('#searchSpinner');
            const apply = () => {
                if (options.lockedSearch() !== null) return;
                if (spinner) spinner.classList.remove('hidden');
                options.apply();
            };
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
