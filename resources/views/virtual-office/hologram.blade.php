<section class="vo-hologram" id="voHologram" hidden role="dialog" aria-label="Hologram kerja pribadi">
    <div class="vo-holo-top"><span><i></i> SIMONPR · HOLOGRAM</span><button type="button" id="voHologramClose" aria-label="Tutup hologram">×</button></div>
    <div class="vo-holo-heading"><span>BIDANG {{ auth()->user()->department === 'umum' ? 'UMUM' : 'OPERASIONAL' }}</span><h2>Ruang kerja Anda.</h2><p>Pilih pekerjaan. Tetap terhubung dengan ruang Anda.</p></div>
    <div id="voHologramTools" class="vo-holo-tools"></div>
    <footer><i></i> Dokumen pribadi <span>SIMONPR / WORKSPACE</span></footer><div class="vo-holo-stem" aria-hidden="true"></div>
</section>
