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
        journeyCache: new Map(),
        prSearchCache: new Map(),
        controller: null,
        journeyController: null,
        prSearchController: null,
        prSearchTimer: null,
        selectedPpbj: null,
        linkedPpbj: null,
        prFinderMode: 'browse',
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
        prFinderModal: $('#calendarPrFinderModal'),
        detailModal: $('#calendarDetailModal'),
        form: $('#calendarForm'),
        formTitle: $('#calendarFormTitle'),
        formError: $('#calendarFormError'),
        detailError: $('#calendarDetailError'),
        detailCard: $('#calendarDetailCard'),
        journey: $('#calendarJourney'),
        journeyLoading: $('#journeyLoading'),
        journeyContent: $('#journeyContent'),
        save: $('#calendarSave'),
        prQuery: $('#calendarPrQuery'),
        prPanel: $('#calendarPrPanel'),
        prResults: $('#calendarPrResults'),
        prState: $('#calendarPrState'),
        prSelected: $('#calendarPrSelected'),
        prPortfolio: $('#calendarPrPortfolio'),
        prReceiver: $('#calendarPrReceiver'),
        prDateFrom: $('#calendarPrDateFrom'),
        prDateTo: $('#calendarPrDateTo'),
        prPreview: $('#calendarPrPreview'),
        agendaPrEmpty: $('#calendarAgendaPrEmpty'),
        agendaPrSelected: $('#calendarAgendaPrSelected'),
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

    function openForm(event = null, selectedDate = state.selected, linkedRecord = null) {
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
        resetAgendaPpbj();
        if (event?.ppbj) selectPpbj({
            id: event.ppbj.id,
            ppbj_no: event.ppbj.ppbj_no,
            description: event.ppbj.uraian,
        }, true);
        else if (linkedRecord) selectAgendaPpbj(linkedRecord);
        els.formModal.hidden = false;
        document.body.style.overflow = 'hidden';
        setTimeout(() => els.form.elements.title.focus(), 0);
    }

    function closeForm() {
        state.prSearchController?.abort();
        window.clearTimeout(state.prSearchTimer);
        els.formModal.hidden = true;
        restoreBodyScroll();
    }

    function resetPrPicker() {
        state.selectedPpbj = null;
        els.prQuery.value = '';
        els.prPortfolio.value = '';
        els.prReceiver.value = '';
        els.prDateFrom.value = '';
        els.prDateTo.value = '';
        els.prSelected.hidden = true;
        els.prSelected.replaceChildren();
        els.prPanel.hidden = false;
        els.prResults.replaceChildren();
        els.prState.textContent = 'Ketik minimal 2 karakter atau gunakan filter untuk menemukan PR.';
        $('.pr-preview-empty', els.prPreview).hidden = false;
        $('#calendarPrClear').hidden = true;
        syncPrFinderActions();
    }

    function openPrFinder(mode = 'browse') {
        state.prFinderMode = mode;
        resetPrPicker();
        $('#calendarPrFinderTitle').textContent = mode === 'attach' ? 'Pilih PR untuk Agenda' : 'Cari & Telusuri PR';
        $('#calendarPrFinderHint').textContent = mode === 'attach'
            ? 'Pilih PR lalu tautkan ke agenda yang sedang dibuat.'
            : 'Pencarian dimuat sesuai kebutuhan, bukan seluruh database sekaligus.';
        els.prFinderModal.hidden = false;
        document.body.style.overflow = 'hidden';
        setTimeout(() => els.prQuery.focus(), 0);
    }

    function closePrFinder() {
        state.prSearchController?.abort();
        window.clearTimeout(state.prSearchTimer);
        els.prFinderModal.hidden = true;
        restoreBodyScroll();
    }

    function syncPrFinderActions() {
        const selected = Boolean(state.selectedPpbj?.id);
        const journey = $('#calendarPrJourneyAction');
        const attach = $('#calendarPrAttachAction');
        const create = $('#calendarPrCreateAgenda');
        if (journey) journey.hidden = !selected;
        if (attach) attach.hidden = !selected || state.prFinderMode !== 'attach';
        if (create) create.hidden = !selected || state.prFinderMode === 'attach';
    }

    function schedulePrSearch(immediate = false) {
        window.clearTimeout(state.prSearchTimer);
        const hasQuery = els.prQuery.value.trim().length >= 2;
        const hasFilter = Boolean(els.prPortfolio.value || els.prReceiver.value || els.prDateFrom.value || els.prDateTo.value);
        $('#calendarPrClear').hidden = !els.prQuery.value && !hasFilter && !state.selectedPpbj;
        if (!hasQuery && !hasFilter) {
            els.prPanel.hidden = false;
            els.prResults.replaceChildren();
            els.prState.textContent = 'Ketik minimal 2 karakter atau gunakan filter untuk menemukan PR.';
            return;
        }
        state.prSearchTimer = window.setTimeout(searchPpbj, immediate ? 0 : 320);
    }

    async function searchPpbj() {
        const params = new URLSearchParams();
        const values = {
            q: els.prQuery.value.trim(),
            portfolio: els.prPortfolio.value,
            receiver_id: els.prReceiver.value,
            date_from: els.prDateFrom.value,
            date_to: els.prDateTo.value,
        };
        Object.entries(values).forEach(([key, value]) => { if (value) params.set(key, value); });
        const cacheKey = params.toString();
        els.prPanel.hidden = false;
        els.prState.textContent = 'Mencari PR yang paling relevan…';
        els.prResults.replaceChildren();

        if (state.prSearchCache.has(cacheKey)) {
            renderPrResults(state.prSearchCache.get(cacheKey));
            return;
        }

        state.prSearchController?.abort();
        state.prSearchController = new AbortController();
        try {
            const response = await fetch(`${root.dataset.prSearchUrl}?${params}`, {
                headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                credentials: 'same-origin',
                signal: state.prSearchController.signal,
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(Object.values(data.errors || {}).flat()[0] || data.message || 'Pencarian PR gagal.');
            state.prSearchCache.set(cacheKey, data);
            if (state.prSearchCache.size > 20) state.prSearchCache.delete(state.prSearchCache.keys().next().value);
            renderPrResults(data);
        } catch (error) {
            if (error.name !== 'AbortError') els.prState.textContent = error.message;
        }
    }

    function renderPrResults(data) {
        const results = Array.isArray(data.results) ? data.results : [];
        els.prResults.replaceChildren();
        els.prState.textContent = results.length
            ? `${results.length} PR paling relevan ditemukan. ${state.prFinderMode === 'attach' ? 'Pilih satu untuk ditautkan ke agenda.' : 'Pilih satu untuk melihat detail.'}`
            : 'PR tidak ditemukan. Coba kata kunci atau filter lain.';

        results.forEach((record) => {
            const button = element('button', 'pr-result');
            button.type = 'button';
            button.setAttribute('role', 'option');
            const top = element('div', 'pr-result-top');
            top.append(element('strong', '', record.ppbj_no), element('span', '', record.value || 'Nilai belum diisi'));
            const description = element('p', '', record.description || 'Uraian pengadaan belum tersedia');
            const facts = element('div', 'pr-result-facts');
            [
                `Portofolio: ${record.portfolio || 'Belum diisi'}`,
                `Tanggal PR: ${record.pr_date || 'Belum diisi'}`,
                `Penerima: ${record.receiver?.name || 'Belum tercatat'}`,
                `Tanggal diterima: ${record.received_date || 'Belum tercatat'}`,
                `Buyer: ${record.buyer || 'Belum tercatat'}`,
                `Vendor: ${record.vendor || 'Belum ditetapkan'}`,
            ].forEach((fact) => facts.append(element('span', '', fact)));
            button.append(top, description, facts);
            button.addEventListener('click', () => selectPpbj(record));
            els.prResults.append(button);
        });
    }

    function selectPpbj(record, attachDirectly = false) {
        if (attachDirectly) {
            selectAgendaPpbj(record);
            return;
        }
        state.selectedPpbj = record;
        els.prQuery.value = record.ppbj_no || '';
        $('#calendarPrClear').hidden = false;
        els.prPanel.hidden = false;
        els.prSelected.hidden = false;
        $('.pr-preview-empty', els.prPreview).hidden = true;
        els.prSelected.replaceChildren();

        const heading = element('div', 'pr-selected-head');
        const copy = element('div');
        copy.append(element('small', '', 'PR TERPILIH'), element('strong', '', record.ppbj_no || 'PR'));
        const remove = element('button', '', state.prFinderMode === 'attach' ? 'Ganti / lepas' : 'Bersihkan pilihan');
        remove.type = 'button';
        remove.addEventListener('click', clearSelectedPpbj);
        heading.append(copy, remove);
        const description = element('p', '', record.description || 'Uraian pengadaan belum tersedia');
        const facts = element('div', 'pr-selected-facts');
        [
            ['Nilai PR', record.value || 'Muat detail untuk melihat nilai'],
            ['Portofolio', record.portfolio || 'Belum diisi'],
            ['Tanggal PR', record.pr_date || 'Belum diisi'],
            ['Dibuat oleh', record.creator?.name || record.buyer || 'Belum tercatat'],
            ['Penerima', record.receiver?.name || 'Belum tercatat'],
            ['Tanggal diterima', record.received_date || 'Belum tercatat'],
            ['Buyer/PIC', record.buyer || 'Belum tercatat'],
            ['Registrasi', record.registration_number || 'Belum tersedia'],
            ['Vendor', record.vendor || 'Belum ditetapkan'],
            ['Status SLA', record.sla_status || record.status || 'Belum tersedia'],
        ].forEach(([label, value]) => {
            const item = element('span');
            item.append(element('small', '', label), element('b', '', value));
            facts.append(item);
        });
        els.prSelected.append(heading, description, facts);
        syncPrFinderActions();
    }

    function clearSelectedPpbj() {
        state.selectedPpbj = null;
        els.prSelected.hidden = true;
        els.prSelected.replaceChildren();
        $('.pr-preview-empty', els.prPreview).hidden = false;
        els.prQuery.value = '';
        syncPrFinderActions();
        schedulePrSearch(true);
        els.prQuery.focus();
    }

    function selectAgendaPpbj(record) {
        state.linkedPpbj = record;
        els.form.elements.ppbj_no.value = record.ppbj_no || '';
        els.agendaPrEmpty.hidden = true;
        els.agendaPrSelected.hidden = false;
        els.agendaPrSelected.replaceChildren();

        const copy = element('div');
        copy.append(
            element('small', '', 'PR DITAUTKAN'),
            element('strong', '', record.ppbj_no || 'PR'),
            element('span', '', record.description || 'Uraian pengadaan belum tersedia')
        );
        const actions = element('div', 'agenda-pr-actions');
        const change = element('button', 'calendar-button calendar-button-soft', 'Ganti PR');
        change.type = 'button';
        change.addEventListener('click', () => openPrFinder('attach'));
        const remove = element('button', 'calendar-button calendar-button-ghost', 'Lepas');
        remove.type = 'button';
        remove.addEventListener('click', resetAgendaPpbj);
        actions.append(change, remove);
        els.agendaPrSelected.append(copy, actions);
    }

    function resetAgendaPpbj() {
        state.linkedPpbj = null;
        els.form.elements.ppbj_no.value = '';
        els.agendaPrEmpty.hidden = false;
        els.agendaPrSelected.hidden = true;
        els.agendaPrSelected.replaceChildren();
    }

    function attachSelectedPpbj() {
        if (!state.selectedPpbj) return;
        const record = state.selectedPpbj;
        closePrFinder();
        selectAgendaPpbj(record);
    }

    function createAgendaFromPpbj() {
        if (!state.selectedPpbj) return;
        const record = state.selectedPpbj;
        closePrFinder();
        openForm(null, state.selected, record);
    }

    function openFinderJourney() {
        const record = state.selectedPpbj;
        if (!record?.id) return;
        closePrFinder();
        state.currentEvent = { ppbj: { id: record.id, ppbj_no: record.ppbj_no, uraian: record.description } };
        resetJourney();
        $('#detailSource').textContent = 'DIGITAL PROCUREMENT JOURNEY';
        $('#detailTitle').textContent = record.ppbj_no || 'Perjalanan PR';
        $('#detailDescription').textContent = record.description || 'Rangkaian proses pengadaan lintas role.';
        $('#detailBadges').replaceChildren(
            element('span', 'event-tag event-collaboration', record.portfolio || 'Portofolio belum diisi'),
            element('span', 'event-tag event-milestone', record.value || 'Nilai belum diisi')
        );
        const grid = $('#detailGrid');
        grid.replaceChildren();
        [
            ['Tanggal PR', record.pr_date || 'Belum diisi'],
            ['Penerima Umum', record.receiver?.name || 'Belum tercatat'],
            ['Buyer / PIC', record.buyer || 'Belum tercatat'],
            ['Vendor', record.vendor || 'Belum ditetapkan'],
        ].forEach(([label, value]) => {
            const wrap = element('div');
            wrap.append(element('dt', '', label), element('dd', '', value));
            grid.append(wrap);
        });
        $('#detailStatusWrap').hidden = true;
        $('#calendarEdit').hidden = true;
        $('#calendarDelete').hidden = true;
        const openPr = $('#calendarOpenPr');
        openPr.hidden = false;
        openPr.href = `/ppbj?search=${encodeURIComponent(record.ppbj_no || '')}`;
        const journeyButton = $('#calendarJourneyButton');
        journeyButton.hidden = false;
        journeyButton.disabled = false;
        journeyButton.textContent = '◎ Lihat Perjalanan PR';
        els.detailModal.hidden = false;
        document.body.style.overflow = 'hidden';
        loadJourney();
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
        resetJourney();
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
        const journeyButton = $('#calendarJourneyButton');
        journeyButton.hidden = !event.ppbj?.id;
        journeyButton.disabled = false;
        journeyButton.textContent = '◎ Lihat Perjalanan PR';
        $('#calendarEdit').hidden = !event.can_edit;
        $('#calendarDelete').hidden = !event.can_delete;
        els.detailModal.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeDetail() {
        state.journeyController?.abort();
        resetJourney();
        els.detailModal.hidden = true;
        restoreBodyScroll();
    }

    function resetJourney() {
        els.journey.hidden = true;
        els.journeyLoading.hidden = true;
        els.journeyContent.replaceChildren();
        els.detailCard.classList.remove('is-journey');
    }

    async function loadJourney() {
        const ppbjId = state.currentEvent?.ppbj?.id;
        if (!ppbjId) return;

        const button = $('#calendarJourneyButton');
        els.journey.hidden = false;
        els.detailCard.classList.add('is-journey');
        button.disabled = true;
        button.textContent = 'Memuat perjalanan…';

        const cached = state.journeyCache.get(String(ppbjId));
        if (cached) {
            renderJourney(cached);
            button.textContent = '✓ Perjalanan PR Terbuka';
            return;
        }

        state.journeyController?.abort();
        state.journeyController = new AbortController();
        els.journeyLoading.hidden = false;
        els.journeyContent.replaceChildren();

        try {
            const url = routeTemplate(root.dataset.journeyTemplate, ppbjId, '__PPBJ__');
            const response = await fetch(url, {
                credentials: 'same-origin',
                headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                signal: state.journeyController.signal,
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(data.message || 'Perjalanan PR tidak dapat dimuat.');
            state.journeyCache.set(String(ppbjId), data);
            if (state.journeyCache.size > 12) state.journeyCache.delete(state.journeyCache.keys().next().value);
            renderJourney(data);
            button.textContent = '✓ Perjalanan PR Terbuka';
        } catch (error) {
            if (error.name !== 'AbortError') {
                showError(els.detailError, error.message);
                button.disabled = false;
                button.textContent = 'Coba Lagi Perjalanan PR';
            }
        } finally {
            els.journeyLoading.hidden = true;
        }
    }

    function renderJourney(data) {
        const record = data.record || {};
        const fragment = document.createDocumentFragment();
        const header = element('div', 'journey-overview');
        const heading = element('div', 'journey-overview-copy');
        heading.append(
            element('span', 'journey-kicker', 'DIGITAL PROCUREMENT JOURNEY'),
            element('h3', '', record.ppbj_no || 'Perjalanan PR'),
            element('p', '', record.description || 'Rangkaian proses pengadaan lintas role.')
        );
        const progress = element('div', 'journey-progress');
        const progressValue = record.total_stages ? Math.round((Number(record.completed_stages || 0) / Number(record.total_stages)) * 100) : 0;
        progress.append(element('strong', '', `${record.completed_stages || 0}/${record.total_stages || 0}`), element('span', '', 'tahap lengkap'));
        const progressBar = element('i');
        progressBar.style.setProperty('--journey-progress', `${progressValue}%`);
        progress.append(progressBar);
        header.append(heading, progress);
        fragment.append(header);

        const facts = element('div', 'journey-facts');
        [
            ['Asal / Buyer', record.buyer || 'Belum tercatat'],
            ['Vendor', record.vendor || 'Belum ditentukan'],
            ['Nilai PR', record.pr_value || 'Belum tercatat'],
            ['Nilai SP', record.sp_value || 'Belum tercatat'],
            ['Progress', `${Number(record.progress || 0)}%`],
            ['Status SLA', record.sla_status || 'Belum dihitung'],
        ].forEach(([label, value]) => {
            const fact = element('div');
            fact.append(element('span', '', label), element('b', '', value));
            facts.append(fact);
        });
        fragment.append(facts);

        const rail = element('div', 'journey-rail');
        (data.stages || []).forEach((stage, index) => {
            const item = element('div', `journey-rail-item is-${stage.state}`);
            item.append(element('b', '', stage.state === 'done' ? '✓' : String(index + 1)), element('span', '', stage.label));
            rail.append(item);
        });
        fragment.append(rail);

        const timeline = element('div', 'journey-timeline');
        (data.stages || []).forEach((stage, index) => timeline.append(renderJourneyStage(stage, index)));
        fragment.append(timeline);

        const replay = element('div', 'journey-replay-grid');
        replay.append(
            renderJourneyReplay('TRACKING REAL', data.tracking || [], 'Belum ada pembaruan tracking real.'),
            renderJourneyReplay('AUDIT AKTIVITAS', data.audit || [], 'Belum ada catatan audit untuk PR ini.')
        );
        fragment.append(replay);
        els.journeyContent.replaceChildren(fragment);
    }

    function renderJourneyStage(stage, index) {
        const card = element('article', `journey-stage is-${stage.state}`);
        const marker = element('div', 'journey-stage-marker', stage.state === 'done' ? '✓' : String(index + 1));
        const body = element('div', 'journey-stage-body');
        const head = element('div', 'journey-stage-head');
        const title = element('div');
        title.append(element('h4', '', stage.label), element('span', '', stage.date || (stage.state === 'done' ? 'Tanggal belum tercatat' : 'Menunggu tahap sebelumnya')));
        const actor = element('div', 'journey-actor');
        actor.append(element('b', '', stage.actor?.name || 'Belum tercatat'), element('small', '', capitalize(stage.actor?.department || 'system')));
        head.append(title, actor);
        body.append(head, element('p', 'journey-stage-summary', stage.summary || ''));

        if (Array.isArray(stage.details) && stage.details.length) {
            const list = element('ul', 'journey-detail-list');
            stage.details.forEach((detail) => list.append(element('li', '', detail)));
            body.append(list);
        }

        if (Array.isArray(stage.documents) && stage.documents.length) {
            const documents = element('div', 'journey-documents');
            stage.documents.forEach((document) => {
                const doc = element('div', 'journey-document');
                const docCopy = element('div');
                docCopy.append(element('b', '', document.number || 'Dokumen'), element('span', '', [document.date, document.vendor || document.value].filter(Boolean).join(' • ')));
                const docActor = element('small', '', document.actor?.name || 'Sistem');
                doc.append(docCopy, docActor);
                documents.append(doc);
            });
            body.append(documents);
        }

        card.append(marker, body);
        return card;
    }

    function renderJourneyReplay(title, rows, emptyText) {
        const panel = element('section', 'journey-replay');
        panel.append(element('h4', '', title));
        if (!rows.length) {
            panel.append(element('p', 'journey-replay-empty', emptyText));
            return panel;
        }
        rows.slice(0, 12).forEach((row) => {
            const item = element('div', 'journey-replay-item');
            const copy = element('div');
            copy.append(element('b', '', row.title || 'Aktivitas'), element('span', '', row.description || row.action || ''));
            item.append(copy, element('small', '', [row.date, row.actor?.name].filter(Boolean).join(' • ')));
            panel.append(item);
        });
        return panel;
    }

    function restoreBodyScroll() {
        if (els.formModal.hidden && els.prFinderModal.hidden && els.detailModal.hidden && !document.body.classList.contains('calendar-fullscreen-fallback')) {
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

    function routeTemplate(template, id, placeholder = '__EVENT__') {
        return template.replace(placeholder, encodeURIComponent(id));
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
    $('#calendarPrFinderOpen')?.addEventListener('click', () => openPrFinder('browse'));
    $('#calendarAgendaChoosePr')?.addEventListener('click', () => openPrFinder('attach'));
    els.prQuery?.addEventListener('input', () => {
        if (state.selectedPpbj && els.prQuery.value.trim() !== state.selectedPpbj.ppbj_no) {
            state.selectedPpbj = null;
            els.prSelected.hidden = true;
            els.prSelected.replaceChildren();
            $('.pr-preview-empty', els.prPreview).hidden = false;
            syncPrFinderActions();
        }
        schedulePrSearch();
    });
    els.prQuery?.addEventListener('focus', () => schedulePrSearch());
    [els.prPortfolio, els.prReceiver, els.prDateFrom, els.prDateTo].forEach((control) => control?.addEventListener('change', () => schedulePrSearch(true)));
    $('#calendarPrClear')?.addEventListener('click', clearSelectedPpbj);
    $('#calendarPrFilterReset')?.addEventListener('click', () => {
        els.prPortfolio.value = '';
        els.prReceiver.value = '';
        els.prDateFrom.value = '';
        els.prDateTo.value = '';
        schedulePrSearch(true);
    });
    $('#calendarPrJourneyAction')?.addEventListener('click', openFinderJourney);
    $('#calendarPrAttachAction')?.addEventListener('click', attachSelectedPpbj);
    $('#calendarPrCreateAgenda')?.addEventListener('click', createAgendaFromPpbj);
    $$('[data-close-pr-finder]').forEach((button) => button.addEventListener('click', closePrFinder));
    els.form.addEventListener('submit', saveEvent);
    $$('[data-close-modal]').forEach((button) => button.addEventListener('click', closeForm));
    $$('[data-close-detail]').forEach((button) => button.addEventListener('click', closeDetail));
    $('#calendarEdit').addEventListener('click', () => { const event = state.currentEvent; closeDetail(); openForm(event); });
    $('#calendarDelete').addEventListener('click', deleteEvent);
    $('#calendarJourneyButton').addEventListener('click', loadJourney);
    $$('[data-status]', $('#detailStatusWrap')).forEach((button) => button.addEventListener('click', () => updateStatus(button.dataset.status)));
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (!els.prFinderModal.hidden) closePrFinder();
        else if (!els.formModal.hidden) closeForm();
        else if (!els.detailModal.hidden) closeDetail();
        else if (document.body.classList.contains('calendar-fullscreen-fallback')) {
            document.body.classList.remove('calendar-fullscreen-fallback');
            restoreBodyScroll();
            syncFullscreenLabel();
        }
    });

    loadEvents(true);
})();
