<section
    id="activityBroadcast"
    class="activity-broadcast"
    data-feed-url="{{ route('activity-broadcast.feed') }}"
    hidden
    aria-label="Informasi aktivitas pengadaan"
>
    <div class="activity-broadcast__bar" data-broadcast-bar>
        <button type="button" class="activity-broadcast__main" data-broadcast-open aria-label="Buka riwayat informasi">
            <span class="activity-broadcast__signal" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5 6 9H3v6h3l5 4V5Zm4.5 4.5a4 4 0 0 1 0 5m2-7a7 7 0 0 1 0 9"/></svg>
            </span>
            <span class="activity-broadcast__label">INFO</span>
            <span class="activity-broadcast__viewport" data-broadcast-viewport aria-live="polite">
                <span class="activity-broadcast__track" data-broadcast-track>
                    <span data-broadcast-text>Memuat informasi terbaru...</span>
                </span>
            </span>
        </button>

        <div class="activity-broadcast__actions">
            <span class="activity-broadcast__counter" data-broadcast-counter>0/0</span>
            <button type="button" class="activity-broadcast__icon-btn" data-broadcast-prev title="Informasi sebelumnya" aria-label="Informasi sebelumnya">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 18-6-6 6-6"/></svg>
            </button>
            <button type="button" class="activity-broadcast__icon-btn" data-broadcast-next title="Informasi berikutnya" aria-label="Informasi berikutnya">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18 6-6-6-6"/></svg>
            </button>
            <button type="button" class="activity-broadcast__icon-btn activity-broadcast__close" data-broadcast-close title="Tutup sampai halaman dimuat ulang" aria-label="Tutup informasi">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12"/></svg>
            </button>
        </div>
    </div>

    <div class="activity-broadcast__panel" data-broadcast-panel hidden>
        <div class="activity-broadcast__panel-head">
            <div>
                <strong>Aktivitas pengadaan terbaru</strong>
                <span>Informasi yang sesuai dengan akses akun Anda</span>
            </div>
            <button type="button" class="activity-broadcast__icon-btn" data-broadcast-panel-close aria-label="Tutup riwayat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12"/></svg>
            </button>
        </div>
        <div class="activity-broadcast__list" data-broadcast-list></div>
    </div>
</section>
