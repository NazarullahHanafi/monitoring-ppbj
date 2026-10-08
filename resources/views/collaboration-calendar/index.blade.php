@extends('layouts.app')

@section('title', 'Collaborative Calendar')

@push('styles')
    <link rel="stylesheet" href="{{ asset('assets/collaboration-calendar/calendar.css') }}?v={{ filemtime(public_path('assets/collaboration-calendar/calendar.css')) }}">
@endpush

@section('content')
    <section
        class="collab-calendar"
        id="collabCalendar"
        data-events-url="{{ route('collaboration-calendar.events') }}"
        data-journey-template="{{ url('/collaboration-calendar/journey/__PPBJ__') }}"
        data-store-url="{{ route('collaboration-calendar.store') }}"
        data-update-template="{{ url('/collaboration-calendar/events/__EVENT__') }}"
        data-status-template="{{ url('/collaboration-calendar/events/__EVENT__/status') }}"
        data-current-user="{{ auth()->id() }}"
        data-department="{{ auth()->user()->department }}"
        data-readonly="{{ auth()->user()->isReadOnly() ? '1' : '0' }}"
    >
        <header class="calendar-hero">
            <div class="calendar-hero-copy">
                <div class="calendar-eyebrow"><span></span> LIVE COLLABORATION SPACE</div>
                <h1>Collaborative Calendar</h1>
                <p>Satu kalender untuk menyatukan agenda Operasional, Umum, SLA, kontrak, dan serah terima.</p>
                <div class="calendar-role-flow" aria-label="Alur kolaborasi">
                    <span class="role-chip role-ops">Operasional</span>
                    <span class="role-line"><i></i><b>↔</b><i></i></span>
                    <span class="role-chip role-umum">Umum</span>
                </div>
            </div>
            <div class="calendar-hero-actions">
                <div class="calendar-live-pill"><span></span> Sinkron saat dibuka</div>
                <button type="button" class="calendar-button calendar-button-ghost" id="calendarFullscreen">⛶ Layar Penuh</button>
                @unless(auth()->user()->isReadOnly())
                    <button type="button" class="calendar-button calendar-button-primary" id="calendarAdd">＋ Agenda Bersama</button>
                @endunless
            </div>
        </header>

        <div class="calendar-stats" id="calendarStats" aria-live="polite">
            <article><span class="stat-orb stat-blue"></span><div><strong id="statTotal">—</strong><small>Agenda terlihat</small></div></article>
            <article><span class="stat-orb stat-violet"></span><div><strong id="statCollab">—</strong><small>Kolaborasi tim</small></div></article>
            <article><span class="stat-orb stat-amber"></span><div><strong id="statDeadline">—</strong><small>Deadline sistem</small></div></article>
            <article><span class="stat-orb stat-rose"></span><div><strong id="statCritical">—</strong><small>Prioritas kritis</small></div></article>
        </div>

        <div class="calendar-toolbar">
            <div class="calendar-navigation">
                <button type="button" class="calendar-icon-button" id="calendarPrev" aria-label="Bulan sebelumnya">←</button>
                <button type="button" class="calendar-button calendar-button-soft" id="calendarToday">Hari Ini</button>
                <button type="button" class="calendar-icon-button" id="calendarNext" aria-label="Bulan berikutnya">→</button>
                <div class="calendar-month-title" id="calendarMonthTitle">Memuat kalender…</div>
            </div>
            <div class="calendar-filters">
                <label>
                    <span>Audiens</span>
                    <select id="calendarAudience">
                        <option value="all">Semua Role</option>
                        <option value="operasional">Operasional</option>
                        <option value="umum">Umum</option>
                    </select>
                </label>
                <label>
                    <span>Jenis Agenda</span>
                    <select id="calendarSource">
                        <option value="all">Semua Agenda</option>
                        <option value="collaboration">Kolaborasi Tim</option>
                        <option value="sla">Target SLA</option>
                        <option value="contract">Batas Kontrak</option>
                        <option value="milestone">Milestone Proses</option>
                    </select>
                </label>
            </div>
        </div>

        <div class="calendar-workspace">
            <div class="calendar-board-wrap">
                <div class="calendar-loading" id="calendarLoading" hidden>
                    <span></span><b>Menyiapkan agenda bersama…</b>
                </div>
                <div class="calendar-weekdays" aria-hidden="true">
                    <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                </div>
                <div class="calendar-grid" id="calendarGrid" role="grid" aria-label="Kalender kolaborasi"></div>
            </div>

            <aside class="calendar-focus-panel">
                <div class="focus-head">
                    <div><span>FOCUS DESK</span><h2 id="focusTitle">Agenda Hari Ini</h2></div>
                    <button type="button" class="calendar-icon-button" id="focusToday" title="Kembali ke hari ini">◎</button>
                </div>
                <p class="focus-subtitle" id="focusSubtitle">Pilih tanggal untuk melihat agenda lintas role.</p>
                <div class="focus-events" id="focusEvents"></div>
                <div class="calendar-legend">
                    <span><i class="legend-collab"></i>Kolaborasi</span>
                    <span><i class="legend-sla"></i>SLA</span>
                    <span><i class="legend-contract"></i>Kontrak</span>
                    <span><i class="legend-milestone"></i>Milestone</span>
                </div>
            </aside>
        </div>

        <div class="calendar-modal" id="calendarFormModal" hidden role="dialog" aria-modal="true" aria-labelledby="calendarFormTitle">
            <div class="calendar-modal-backdrop" data-close-modal></div>
            <form class="calendar-modal-card calendar-form-card" id="calendarForm" novalidate>
                <div class="modal-head">
                    <div><span>AGENDA KOLABORASI</span><h2 id="calendarFormTitle">Buat Agenda Bersama</h2></div>
                    <button type="button" class="modal-close" data-close-modal aria-label="Tutup">×</button>
                </div>
                <input type="hidden" name="event_id" id="eventId">
                <input type="hidden" name="version" id="eventVersion">
                <div class="calendar-form-body">
                    <section class="calendar-form-section">
                        <div class="form-section-heading"><b>01</b><div><h3>Agenda & waktu</h3><p>Tentukan kegiatan, jadwal, dan tingkat prioritas.</p></div></div>
                        <div class="calendar-form-grid">
                            <label class="form-span-2"><span>Judul Agenda</span><input type="text" name="title" maxlength="120" required placeholder="Contoh: Review kelengkapan dokumen PR"></label>
                            <label><span>Mulai</span><input type="datetime-local" name="starts_at" required></label>
                            <label><span>Selesai</span><input type="datetime-local" name="ends_at"></label>
                            <label class="calendar-check"><input type="checkbox" name="all_day" value="1"><span>Agenda sepanjang hari</span></label>
                            <label><span>Prioritas</span><select name="priority" required><option value="low">Rendah</option><option value="normal" selected>Normal</option><option value="high">Tinggi</option><option value="critical">Kritis</option></select></label>
                        </div>
                    </section>

                    <section class="calendar-form-section">
                        <div class="form-section-heading"><b>02</b><div><h3>Kolaborasi lintas role</h3><p>Atur visibilitas, status, dan PIC yang bertanggung jawab.</p></div></div>
                        <div class="calendar-form-grid">
                            <label><span>Status</span><select name="status" required><option value="planned">Direncanakan</option><option value="in_progress">Dikerjakan</option><option value="done">Selesai</option><option value="cancelled">Dibatalkan</option></select></label>
                            <label><span>Dapat Dilihat Oleh</span><select name="audience" required><option value="all">Semua Role</option><option value="operasional">Operasional</option><option value="umum">Umum</option></select></label>
                            <label class="form-span-2"><span>Penanggung Jawab</span><select name="assignee_id"><option value="">Belum ditentukan</option>@foreach($users as $user)<option value="{{ $user->id }}" data-department="{{ $user->department }}">{{ $user->name }} — {{ ucfirst($user->department) }}</option>@endforeach</select></label>
                        </div>
                    </section>

                    <section class="calendar-form-section form-section-context">
                        <div class="form-section-heading"><b>03</b><div><h3>Konteks pengadaan</h3><p>Tautkan agenda ke PR agar perjalanan pengadaan dapat dibuka dari kalender.</p></div></div>
                        <div class="calendar-form-grid">
                            <label class="form-span-2"><span>Nomor PR/PPBJ <small>(opsional, harus sama persis)</small></span><input type="text" name="ppbj_no" maxlength="50" placeholder="PKB/PR-26/CON/0001"></label>
                            <label class="form-span-2"><span>Catatan Kolaborasi</span><textarea name="description" maxlength="2000" rows="3" placeholder="Tuliskan konteks, kebutuhan, dan hasil yang diharapkan…"></textarea></label>
                        </div>
                    </section>
                </div>
                <div class="modal-error" id="calendarFormError" hidden></div>
                <div class="modal-actions">
                    <button type="button" class="calendar-button calendar-button-ghost" data-close-modal>Batal</button>
                    <button type="submit" class="calendar-button calendar-button-primary" id="calendarSave">Simpan Agenda</button>
                </div>
            </form>
        </div>

        <div class="calendar-modal" id="calendarDetailModal" hidden role="dialog" aria-modal="true" aria-labelledby="detailTitle">
            <div class="calendar-modal-backdrop" data-close-detail></div>
            <div class="calendar-modal-card calendar-detail-card" id="calendarDetailCard">
                <div class="modal-head">
                    <div><span id="detailSource">AGENDA</span><h2 id="detailTitle">Detail Agenda</h2></div>
                    <button type="button" class="modal-close" data-close-detail aria-label="Tutup">×</button>
                </div>
                <div class="detail-badges" id="detailBadges"></div>
                <p class="detail-description" id="detailDescription"></p>
                <dl class="detail-grid" id="detailGrid"></dl>
                <section class="pr-journey" id="calendarJourney" hidden aria-live="polite">
                    <div class="journey-loading" id="journeyLoading" hidden><span></span><div><b>Menyiapkan perjalanan PR</b><small>Memuat aktor, dokumen, dan milestone secara aman…</small></div></div>
                    <div id="journeyContent"></div>
                </section>
                <div class="status-quick" id="detailStatusWrap" hidden>
                    <span>Perbarui status</span>
                    <div><button type="button" data-status="planned">Rencana</button><button type="button" data-status="in_progress">Dikerjakan</button><button type="button" data-status="done">Selesai</button><button type="button" data-status="cancelled">Batal</button></div>
                </div>
                <div class="modal-error" id="calendarDetailError" hidden></div>
                <div class="modal-actions">
                    <button type="button" class="calendar-button calendar-button-danger" id="calendarDelete" hidden>Hapus</button>
                    <button type="button" class="calendar-button calendar-button-journey" id="calendarJourneyButton" hidden>◎ Lihat Perjalanan PR</button>
                    <a class="calendar-button calendar-button-soft" id="calendarOpenPr" href="#" hidden rel="noopener">Buka Menu PR</a>
                    <button type="button" class="calendar-button calendar-button-ghost" id="calendarEdit" hidden>Edit</button>
                    <button type="button" class="calendar-button calendar-button-primary" data-close-detail>Tutup</button>
                </div>
            </div>
        </div>
    </section>
@endsection

@push('scripts')
    <script src="{{ asset('assets/collaboration-calendar/calendar.js') }}?v={{ filemtime(public_path('assets/collaboration-calendar/calendar.js')) }}" defer></script>
@endpush
