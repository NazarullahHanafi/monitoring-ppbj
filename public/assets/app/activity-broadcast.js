(function () {
    'use strict';

    var root = document.getElementById('activityBroadcast');
    if (!root || root.dataset.initialized === '1') return;
    root.dataset.initialized = '1';

    var endpoint = root.dataset.feedUrl;
    var track = root.querySelector('[data-broadcast-track]');
    var text = root.querySelector('[data-broadcast-text]');
    var viewport = root.querySelector('[data-broadcast-viewport]');
    var counter = root.querySelector('[data-broadcast-counter]');
    var panel = root.querySelector('[data-broadcast-panel]');
    var list = root.querySelector('[data-broadcast-list]');
    var items = [];
    var activeIndex = 0;
    var rotateTimer = null;
    var isPaused = false;

    var icons = {
        package: '📦',
        document: '📋',
        contract: '📝',
        check: '✓',
        alert: '!',
        info: 'i'
    };

    function safeText(value) {
        return String(value || '').replace(/\s+/g, ' ').trim();
    }

    function displayText(item) {
        return [item.title, item.number, item.description].filter(Boolean).join('  •  ');
    }

    function relativeTime(value) {
        var date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';

        var seconds = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
        if (seconds < 60) return 'baru saja';
        var minutes = Math.floor(seconds / 60);
        if (minutes < 60) return minutes + ' menit lalu';
        var hours = Math.floor(minutes / 60);
        if (hours < 24) return hours + ' jam lalu';
        var days = Math.floor(hours / 24);
        return days < 30 ? days + ' hari lalu' : safeText(value).slice(0, 10);
    }

    function updateScrolling() {
        track.classList.remove('is-scrolling');
        track.style.removeProperty('--broadcast-duration');

        window.requestAnimationFrame(function () {
            var overflow = track.scrollWidth > viewport.clientWidth + 18;
            if (!overflow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            var seconds = Math.min(32, Math.max(14, Math.round(track.scrollWidth / 55)));
            track.style.setProperty('--broadcast-duration', seconds + 's');
            track.classList.add('is-scrolling');
        });
    }

    function show(index) {
        if (!items.length) return;
        activeIndex = (index + items.length) % items.length;
        var item = items[activeIndex];

        track.classList.remove('is-changing', 'is-scrolling');
        text.textContent = displayText(item);
        counter.textContent = (activeIndex + 1) + '/' + items.length;
        root.dataset.severity = item.severity || 'info';

        void track.offsetWidth;
        track.classList.add('is-changing');
        updateScrolling();
    }

    function stopRotation() {
        if (rotateTimer) window.clearInterval(rotateTimer);
        rotateTimer = null;
    }

    function startRotation() {
        stopRotation();
        if (items.length < 2 || isPaused || document.hidden) return;
        rotateTimer = window.setInterval(function () { show(activeIndex + 1); }, 8000);
    }

    function makeElement(tag, className, value) {
        var element = document.createElement(tag);
        if (className) element.className = className;
        if (value) element.textContent = value;
        return element;
    }

    function renderList() {
        list.replaceChildren();

        items.forEach(function (item) {
            var link = makeElement('a', 'activity-broadcast__item');
            link.href = item.url || '#';
            link.dataset.severity = item.severity || 'info';

            var icon = makeElement('span', 'activity-broadcast__item-icon', icons[item.icon] || icons.info);
            icon.setAttribute('aria-hidden', 'true');

            var body = makeElement('span', 'activity-broadcast__item-body');
            var title = makeElement('span', 'activity-broadcast__item-title', safeText(item.title));
            if (item.number) {
                title.appendChild(document.createTextNode(' · '));
                title.appendChild(makeElement('span', 'activity-broadcast__item-number', safeText(item.number)));
            }
            body.appendChild(title);

            if (item.description) body.appendChild(makeElement('span', 'activity-broadcast__item-desc', safeText(item.description)));
            if (item.next_action) body.appendChild(makeElement('span', 'activity-broadcast__item-next', 'Berikutnya: ' + safeText(item.next_action)));
            body.appendChild(makeElement('span', 'activity-broadcast__item-meta', relativeTime(item.occurred_at) + ' · ' + safeText(item.actor)));

            link.appendChild(icon);
            link.appendChild(body);
            link.appendChild(makeElement('span', 'activity-broadcast__item-open', 'Buka'));
            list.appendChild(link);
        });
    }

    function openPanel() {
        panel.hidden = false;
        isPaused = true;
        stopRotation();
    }

    function closePanel() {
        panel.hidden = true;
        isPaused = false;
        startRotation();
    }

    function bindEvents() {
        root.querySelector('[data-broadcast-open]').addEventListener('click', openPanel);
        root.querySelector('[data-broadcast-panel-close]').addEventListener('click', closePanel);
        root.querySelector('[data-broadcast-prev]').addEventListener('click', function () { show(activeIndex - 1); startRotation(); });
        root.querySelector('[data-broadcast-next]').addEventListener('click', function () { show(activeIndex + 1); startRotation(); });
        root.querySelector('[data-broadcast-close]').addEventListener('click', function () {
            stopRotation();
            root.hidden = true;
        });

        root.addEventListener('mouseenter', function () { isPaused = true; stopRotation(); });
        root.addEventListener('mouseleave', function () {
            if (!panel.hidden) return;
            isPaused = false;
            startRotation();
        });

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) stopRotation(); else startRotation();
        });

        document.addEventListener('click', function (event) {
            if (!panel.hidden && !root.contains(event.target)) closePanel();
        });

        window.addEventListener('resize', updateScrolling, { passive: true });
    }

    function load() {
        if (!endpoint) return;

        fetch(endpoint, {
            headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
            credentials: 'same-origin'
        })
            .then(function (response) {
                if (!response.ok) throw new Error('Feed unavailable');
                return response.json();
            })
            .then(function (payload) {
                items = Array.isArray(payload.items) ? payload.items : [];
                if (!items.length) return;

                root.hidden = false;
                renderList();
                show(0);
                startRotation();
            })
            .catch(function () {
                root.hidden = true;
            });
    }

    bindEvents();
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(load, { timeout: 1200 });
    } else {
        window.setTimeout(load, 120);
    }
})();
