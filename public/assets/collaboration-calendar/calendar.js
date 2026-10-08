(() => {
    'use strict';

    const root = document.getElementById('collabCalendar');
    if (!root) return;

    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
    const csrf = $('meta[name="csrf-token"]')?.content || '';
    const state = {
        cursor: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        selected: startOfDay(new Date()),
        events: [],
        currentEvent: null,
        cache: new Map(),
        controller: null,
    };

    const els = {
        grid: $('#calendarGrid'),
        loading: $('#calendarLoading'),
        monthTitle: $('#calendarMonthTitle'),
        audience: $('#calendarAudience'),
        source: $('#calendarSource'),
        focusTitle: $('#focusTitle'),
        focusSubtitle: $('#focusSubtitle'),
        focusEvents: $('#focusEvents'),
        formModal: $('#calendarFormModal'),
        detailModal: $('#calendarDetailModal'),
        form: $('#calendarForm'),
        formTitle: $('#calendarFormTitle'),
        formError: $('#calendarFormError'),
        detailError: $('#calendarDetailError'),
        save: $('#calendarSave'),
    };

    const sourceLabels = {
        collaboration: 'Kolaborasi Tim',
        sla: 'Target SLA',
        contract: 'Batas Kontrak',
        milestone: 'Milestone Proses',
    };
    const statusLabels = {
        planned: 'Direncanakan',
        in_progress: 'Dikerjakan',
        done: 'Selesai',
        cancelled: 'Dibatalkan',
    };
    const priorityLabels = { low: 'Rendah', normal: 'Normal', high: 'Tinggi', critical: 'Kritis' };

    function startOfDay(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function addDays(date, amount) {
        const next = new Date(date);
        next.setDate(next.getDate() + amount);
        return next;
    }

    function dateKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function parseDate(value) {
        return value ? new Date(value) : null;
    }

    function gridRange() {
        const first = new Date(state.cursor.getFullYear(), state.cursor.getMonth(), 1);
        const mondayOffset = (first.getDay() + 6) % 7;
        const start = addDays(first, -mondayOffset);
        return { start, end: addDays(start, 41) };
    }

    function eventOccursOn(event, day) {
        const start = startOfDay(parseDate(event.start));
        const end = startOfDay(parseDate(event.end) || start);
        const target = startOfDay(day);
        return target >= start && target <= end;
    }

    function eventsForDay(day) {
        return state.events.filter((event) => eventOccursOn(event, day));
    }

    function element(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined && text !== null) node.textContent = String(text);
        return node;
    }

    function monthLabel(date) {
        return new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(date);
    }

    function longDate(date) {
        return new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    }

    function eventTime(event) {
        if (event.all_day) return 'Sepanjang hari';
        const start = parseDate(event.start);
        const end = parseDate(event.end);
        const formatter = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' });
        return end ? `${formatter.format(start)}–${formatter.format(end)}` : formatter.format(start);
    }

    function sameDay(left, right) {
        return dateKey(left) === dateKey(right);
    }

    function renderGrid() {
        const range = gridRange();
        const today = startOfDay(new Date());
        els.monthTitle.textContent = monthLabel(state.cursor);
        els.grid.replaceChildren();

        for (let index = 0; index < 42; index += 1) {
            const day = addDays(range.start, index);
            const dayEvents = eventsForDay(day);
            const cell = element('div', 'calendar-day');
            cell.dataset.date = dateKey(day);
            cell.setAttribute('role', 'gridcell');
            cell.tabIndex = 0;
            cell.setAttribute('aria-label', `${longDate(day)}, ${dayEvents.length} agenda`);
            if (day.getMonth() !== state.cursor.getMonth()) cell.classList.add('is-outside');
            if (sameDay(day, today)) cell.classList.add('is-today');
            if (sameDay(day, state.selected)) cell.classList.add('is-selected');

            const head = element('div', 'day-head');
            head.append(element('span', 'day-number', day.getDate()));
            if (dayEvents.length) head.append(element('span', 'day-count', `${dayEvents.length} agenda`));
            cell.append(head);

            const list = element('div', 'day-events');
            dayEvents.slice(0, 3).forEach((event) => {
                const item = element('button', `day-event event-${event.source}`, event.title);
                item.type = 'button';
                item.title = event.title;
                item.addEventListener('click', (clickEvent) => {
                    clickEvent.stopPropagation();
                    openDetail(event);
                });
                list.append(item);
            });
            if (dayEvents.length > 3) list.append(element('span', 'day-more', `+${dayEvents.length - 3} agenda lainnya`));
            cell.append(list);
            cell.addEventListener('click', () => selectDay(day));
            cell.addEventListener('keydown', (keyEvent) => {
                if (keyEvent.target !== cell || !['Enter', ' '].includes(keyEvent.key)) return;
                keyEvent.preventDefault();
                selectDay(day);
            });
            cell.addEventListener('dblclick', () => {
                if (root.dataset.readonly !== '1') openForm(null, day);
            });
            els.grid.append(cell);
        }
    }

    function selectDay(day) {
        state.selected = startOfDay(day);
        renderGrid();
        renderFocus();
    }

    function renderFocus() {
        const dayEvents = eventsForDay(state.selected);
        els.focusTitle.textContent = sameDay(state.selected, new Date()) ? 'Agenda Hari Ini' : `Agenda ${state.selected.getDate()} ${monthLabel(state.selected).split(' ')[0]}`;
        els.focusSubtitle.textContent = `${longDate(state.selected)} • ${dayEvents.length} agenda terlihat`;
        els.focusEvents.replaceChildren();

        if (!dayEvents.length) {
            els.focusEvents.append(element('div', 'focus-empty', 'Belum ada agenda pada tanggal ini. Klik dua kali tanggal untuk membuat agenda bersama.'));
            return;
        }

        dayEvents.forEach((event) => {
            const card = element('article', 'focus-event');
            card.tabIndex = 0;
            const top = element('div', 'focus-event-top');
            top.append(element('span', 'focus-event-time', eventTime(event)));
            top.append(element('span', `event-tag priority-${event.priority}`, priorityLabels[event.priority] || event.priority));
            card.append(top, element('h3', '', event.title));
            const owner = event.assignee?.name || event.creator?.name || 'SIMONPR';
            card.append(element('p', '', `${sourceLabels[event.source] || event.source} • ${owner}`));
            card.addEventListener('click', () => openDetail(event));
            card.addEventListener('keydown', (keyEvent) => {
                if (keyEvent.key === 'Enter' || keyEvent.key === ' ') openDetail(event);
            });
            els.focusEvents.append(card);
        });
    }

    function renderStats(meta = {}) {
        $('#statTotal').textContent = meta.total ?? state.events.length;
        $('#statCollab').textContent = meta.collaboration ?? state.events.filter((event) => event.source === 'collaboration').length;
        $('#statDeadline').textContent = meta.deadlines ?? state.events.filter((event) => ['sla', 'contract'].includes(event.source)).length;
        $('#statCritical').textContent = meta.critical ?? state.events.filter((event) => event.priority === 'critical').length;
    }

    async function loadEvents(force = false) {
        const range = gridRange();
        const params = new URLSearchParams({
            start: dateKey(range.start),
            end: dateKey(range.end),
            audience: els.audience.value,
            source: els.source.value,
        });
        const key = params.toString();
        if (!force && state.cache.has(key)) {
            const cached = state.cache.get(key);
            state.events = cached.events;
            renderAll(cached.meta);
            return;
        }

        state.controller?.abort();
        state.controller = new AbortController();
        els.loading.hidden = false;

        try {
            const response = await fetch(`${root.dataset.eventsUrl}?${params}`, {
                headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                credentials: 'same-origin',
                signal: state.controller.signal,
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Kalender gagal dimuat.');
            state.events = Array.isArray(data.events) ? data.events : [];
            state.cache.set(key, { events: state.events, meta: data.meta || {} });
            if (state.cache.size > 8) state.cache.delete(state.cache.keys().next().value);
            renderAll(data.meta || {});
        } catch (error) {
            if (error.name !== 'AbortError') notify(error.message, 'error');
        } finally {
            els.loading.hidden = true;
        }
    }

    function renderAll(meta) {
        renderGrid();
        renderFocus();
        renderStats(meta);
    }

    function clearCacheAndReload() {
        state.cache.clear();
        return loadEvents(true);
    }

    function openForm(event = null, selectedDate = state.selected) {
        state.currentEvent = event;
        els.form.reset();
        els.formError.hidden = true;
        els.formTitle.textContent = event ? 'Edit Agenda Bersama' : 'Buat Agenda Bersama';
        $('#eventId').value = event?.id || '';
        $('#eventVersion').value = event?.version || '';
        els.form.elements.title.value = event?.title || '';
        els.form.elements.description.value = event?.description || '';
        els.form.elements.starts_at.value = event ? toLocalInput(event.start) : toLocalInput(withHour(selectedDate, 8));
        els.form.elements.ends_at.value = event?.end ? toLocalInput(event.end) : toLocalInput(withHour(selectedDate, 9));
        els.form.elements.all_day.checked = Boolean(event?.all_day);
        els.form.elements.priority.value = event?.priority || 'normal';
        els.form.elements.status.value = event?.status || 'planned';
        els.form.elements.audience.value = event?.audience || 'all';
        els.form.elements.assignee_id.value = event?.assignee?.id || '';
        els.form.elements.ppbj_no.value = event?.ppbj?.ppbj_no || '';
        els.formModal.hidden = false;
        document.body.style.overflow = 'hidden';
        setTimeout(() => els.form.elements.title.focus(), 0);
    }

    function closeForm() {
        els.formModal.hidden = true;
        restoreBodyScroll();
    }

    function withHour(date, hour) {
        const value = new Date(date);
        value.setHours(hour, 0, 0, 0);
        return value;
    }

    function toLocalInput(value) {
        const date = value instanceof Date ? value : parseDate(value);
        const offset = date.getTimezoneOffset();
        return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
    }

    function formPayload() {
        const fields = els.form.elements;
        return {
            title: fields.title.value.trim(),
            description: fields.description.value.trim() || null,
            starts_at: fields.starts_at.value,
            ends_at: fields.ends_at.value || null,
            all_day: fields.all_day.checked,
            priority: fields.priority.value,
            status: fields.status.value,
            audience: fields.audience.value,
            assignee_id: fields.assignee_id.value ? Number(fields.assignee_id.value) : null,
            ppbj_no: fields.ppbj_no.value.trim() || null,
            ...(fields.version.value ? { version: Number(fields.version.value) } : {}),
        };
    }

    async function saveEvent(submitEvent) {
        submitEvent.preventDefault();
        const payload = formPayload();
        const id = $('#eventId').value;
        const url = id ? routeTemplate(root.dataset.updateTemplate, id) : root.dataset.storeUrl;
        const method = id ? 'PATCH' : 'POST';
        els.save.disabled = true;
        els.formError.hidden = true;

        try {
            const data = await api(url, method, payload);
            closeForm();
            await clearCacheAndReload();
            notify(data.message || 'Agenda berhasil disimpan.', 'success');
        } catch (error) {
            showError(els.formError, error.message);
        } finally {
            els.save.disabled = false;
        }
    }

    function openDetail(event) {
        state.currentEvent = event;
        $('#detailSource').textContent = sourceLabels[event.source] || 'AGENDA';
        $('#detailTitle').textContent = event.title;
        $('#detailDescription').textContent = event.description || 'Tidak ada catatan tambahan.';
        els.detailError.hidden = true;

        const badges = $('#detailBadges');
        badges.replaceChildren(
            element('span', `event-tag priority-${event.priority}`, priorityLabels[event.priority] || event.priority),
            element('span', 'event-tag event-collaboration', statusLabels[event.status] || event.status),
            element('span', 'event-tag event-milestone', event.audience === 'all' ? 'Semua Role' : capitalize(event.audience))
        );

        const details = [
            ['Waktu', `${longDate(parseDate(event.start))} • ${eventTime(event)}`],
            ['Dibuat oleh', `${event.creator?.name || 'SIMONPR'} • ${capitalize(event.creator?.department || 'system')}`],
            ['Penanggung jawab', event.assignee ? `${event.assignee.name} • ${capitalize(event.assignee.department)}` : 'Belum ditentukan'],
            ['Referensi PR', event.ppbj?.ppbj_no || 'Tidak ditautkan'],
        ];
        const grid = $('#detailGrid');
        grid.replaceChildren();
        details.forEach(([label, value]) => {
            const wrap = element('div');
            wrap.append(element('dt', '', label), element('dd', '', value));
            grid.append(wrap);
        });

        const statusWrap = $('#detailStatusWrap');
        statusWrap.hidden = !event.can_status;
        $$('[data-status]', statusWrap).forEach((button) => button.classList.toggle('is-active', button.dataset.status === event.status));

        const openPr = $('#calendarOpenPr');
        openPr.hidden = !event.url;
        if (event.url) openPr.href = event.url;
        $('#calendarEdit').hidden = !event.can_edit;
        $('#calendarDelete').hidden = !event.can_delete;
        els.detailModal.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeDetail() {
        els.detailModal.hidden = true;
        restoreBodyScroll();
    }

    function restoreBodyScroll() {
        if (els.formModal.hidden && els.detailModal.hidden && !document.body.classList.contains('calendar-fullscreen-fallback')) {
            document.body.style.overflow = '';
        }
    }

    async function updateStatus(status) {
        const event = state.currentEvent;
        if (!event?.can_status) return;
        try {
            const url = routeTemplate(root.dataset.statusTemplate, event.id);
            const data = await api(url, 'PATCH', { status, version: event.version });
            state.currentEvent = data.event;
            closeDetail();
            await clearCacheAndReload();
            notify(data.message, 'success');
        } catch (error) {
            showError(els.detailError, error.message);
        }
    }

    async function deleteEvent() {
        const event = state.currentEvent;
        if (!event?.can_delete) return;
        const confirmed = window.Swal
            ? (await window.Swal.fire({ title: 'Hapus agenda?', text: 'Riwayat penghapusan tetap dicatat di audit log.', icon: 'warning', showCancelButton: true, confirmButtonText: 'Ya, hapus', cancelButtonText: 'Batal', confirmButtonColor: '#dc2626' })).isConfirmed
            : window.confirm('Hapus agenda ini? Riwayatnya tetap dicatat di audit log.');
        if (!confirmed) return;

        try {
            const url = routeTemplate(root.dataset.updateTemplate, event.id);
            const data = await api(url, 'DELETE', { version: event.version });
            closeDetail();
            await clearCacheAndReload();
            notify(data.message, 'success');
        } catch (error) {
            showError(els.detailError, error.message);
        }
    }

    async function api(url, method, payload) {
        const response = await fetch(url, {
            method,
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf,
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            const validation = data.errors ? Object.values(data.errors).flat()[0] : null;
            throw new Error(validation || data.message || 'Permintaan tidak dapat diproses.');
        }
        return data;
    }

    function routeTemplate(template, id) {
        return template.replace('__EVENT__', encodeURIComponent(id));
    }

    function showError(target, message) {
        target.textContent = message;
        target.hidden = false;
    }

    function notify(message, icon = 'info') {
        if (window.Swal) {
            window.Swal.fire({ toast: true, position: 'top-end', icon, title: message, showConfirmButton: false, timer: icon === 'error' ? 6500 : 4500 });
        }
    }

    function capitalize(value) {
        const text = String(value || '');
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    async function toggleFullscreen() {
        try {
            if (document.fullscreenElement === root) {
                await document.exitFullscreen();
            } else if (root.requestFullscreen) {
                await root.requestFullscreen();
            } else {
                document.body.classList.toggle('calendar-fullscreen-fallback');
            }
        } catch (_) {
            document.body.classList.toggle('calendar-fullscreen-fallback');
        }
        syncFullscreenLabel();
    }

    function syncFullscreenLabel() {
        const active = document.fullscreenElement === root || document.body.classList.contains('calendar-fullscreen-fallback');
        $('#calendarFullscreen').textContent = active ? '↙ Keluar Layar Penuh' : '⛶ Layar Penuh';
    }

    $('#calendarPrev').addEventListener('click', () => { state.cursor.setMonth(state.cursor.getMonth() - 1); loadEvents(); });
    $('#calendarNext').addEventListener('click', () => { state.cursor.setMonth(state.cursor.getMonth() + 1); loadEvents(); });
    $('#calendarToday').addEventListener('click', () => { state.cursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1); selectDay(new Date()); loadEvents(); });
    $('#focusToday').addEventListener('click', () => selectDay(new Date()));
    els.audience.addEventListener('change', () => loadEvents());
    els.source.addEventListener('change', () => loadEvents());
    $('#calendarFullscreen').addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', syncFullscreenLabel);
    $('#calendarAdd')?.addEventListener('click', () => openForm());
    els.form.addEventListener('submit', saveEvent);
    $$('[data-close-modal]').forEach((button) => button.addEventListener('click', closeForm));
    $$('[data-close-detail]').forEach((button) => button.addEventListener('click', closeDetail));
    $('#calendarEdit').addEventListener('click', () => { const event = state.currentEvent; closeDetail(); openForm(event); });
    $('#calendarDelete').addEventListener('click', deleteEvent);
    $$('[data-status]', $('#detailStatusWrap')).forEach((button) => button.addEventListener('click', () => updateStatus(button.dataset.status)));
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (!els.formModal.hidden) closeForm();
        else if (!els.detailModal.hidden) closeDetail();
        else if (document.body.classList.contains('calendar-fullscreen-fallback')) {
            document.body.classList.remove('calendar-fullscreen-fallback');
            restoreBodyScroll();
            syncFullscreenLabel();
        }
    });

    loadEvents(true);
})();
