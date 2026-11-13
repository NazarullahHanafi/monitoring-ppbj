(() => {
    'use strict';
    let pending = false;

    window.refreshDashboard = async () => {
        const button = document.getElementById('dashboardRefreshButton');
        if (pending || !button) return;
        pending = true;
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
        const icon = document.getElementById('refreshIcon');
        const originalIcon = icon?.textContent;
        if (icon) icon.textContent = '⏳';
        document.getElementById('dashboardRefreshError')?.remove();
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);
        try {
            const response = await fetch(button.dataset.url, {
                method: 'POST',
                credentials: 'same-origin',
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });
            if (response.status === 429) throw new Error('Refresh terlalu sering. Tunggu sebentar, lalu coba lagi.');
            if (response.status === 403) throw new Error('Akun Anda tidak memiliki izin untuk refresh dashboard.');
            if (!response.ok || response.redirected) throw new Error('Refresh belum terkonfirmasi. Periksa koneksi atau sesi login Anda.');
            const result = await response.json();
            if (typeof result?.message !== 'string') throw new Error('Respons refresh belum dapat dikonfirmasi.');
            window.location.reload();
        } catch (error) {
            const message = error.name === 'AbortError'
                ? 'Refresh belum terkonfirmasi karena koneksi lambat. Muat ulang halaman untuk memeriksa hasilnya.'
                : error instanceof SyntaxError ? 'Respons refresh belum dapat dibaca. Periksa sesi login Anda.'
                    : error.message || 'Refresh belum berhasil. Silakan coba lagi.';
            const notice = document.createElement('p');
            notice.id = 'dashboardRefreshError';
            notice.setAttribute('role', 'alert');
            notice.className = 'mt-2 text-sm text-red-700 dark:text-red-300';
            notice.textContent = message;
            button.parentElement.insertAdjacentElement('afterend', notice);
        } finally {
            clearTimeout(timeout);
            pending = false;
            button.disabled = false;
            button.removeAttribute('aria-busy');
            if (icon) icon.textContent = originalIcon;
        }
    };
})();
