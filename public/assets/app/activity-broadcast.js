(function () {
    'use strict';

    var root = document.getElementById('activityBroadcast');
    if (!root || root.dataset.initialized === '1') return;
    root.dataset.initialized = '1';

    var endpoint = root.dataset.feedUrl;
    var cacheKey = 'simonpr:activity-broadcast:v2:' + (root.dataset.cacheKey || 'guest');
    var cacheTtl = 60000;
    var track = root.querySelector('[data-broadcast-track]');
    var text = root.querySelector('[data-broadcast-text]');
    var viewport = root.querySelector('[data-broadcast-viewport]');
    var counter = root.querySelector('[data-broadcast-counter]');
    var panel = root.querySelector('[data-broadcast-panel]');
    var list = root.querySelector('[data-broadcast-list]');
    var items = [];
    var activeIndex = 0;
    var fallbackTimer = null;
    var resizeTimer = null;
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

    function stopMotion() {
        if (fallbackTimer) window.clearTimeout(fallbackTimer);
        fallbackTimer = null;
        track.classList.remove('is-scrolling');
    }

    function scheduleNext(delay) {
        if (fallbackTimer) window.clearTimeout(fallbackTimer);
        fallbackTimer = window.setTimeout(function () {
            if (isPaused || document.hidden || root.hidden) return;
            show(activeIndex + 1);
        }, delay);
    }

    function startMotion() {
        stopMotion();

        window.requestAnimationFrame(function () {
            if (isPaused || document.hidden || root.hidden) return;

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                scheduleNext(8000);
                return;
            }

            var viewportWidth = Math.max(1, viewport.clientWidth);
            var textWidth = Math.max(1, track.scrollWidth);
            var distance = viewportWidth + textWidth + 24;
            var seconds = Math.min(34, Math.max(9, distance / 72));

            track.style.setProperty('--broadcast-start', viewportWidth + 'px');
            track.style.setProperty('--broadcast-end', -(textWidth + 24) + 'px');
            track.style.setProperty('--broadcast-duration', seconds.toFixed(2) + 's');

            window.requestAnimationFrame(function () {
                if (!isPaused && !document.hidden && !root.hidden) {
                    track.classList.add('is-scrolling');
                    scheduleNext(Math.ceil(seconds * 1000) + 600);
                }
            });
        });
    }

    function show(index) {
        if (!items.length) return;
        activeIndex = (index + items.length) % items.length;
        var item = items[activeIndex];

        stopMotion();
        text.textContent = displayText(item);
        counter.textContent = (activeIndex + 1) + '/' + items.length;
        root.dataset.severity = item.severity || 'info';

        startMotion();
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
        stopMotion();
    }

    function closePanel() {
        panel.hidden = true;
        isPaused = false;
        show(activeIndex);
    }

    function bindEvents() {
        root.querySelector('[data-broadcast-open]').addEventListener('click', openPanel);
        root.querySelector('[data-broadcast-panel-close]').addEventListener('click', closePanel);
        root.querySelector('[data-broadcast-prev]').addEventListener('click', function () { show(activeIndex - 1); });
        root.querySelector('[data-broadcast-next]').addEventListener('click', function () { show(activeIndex + 1); });
        root.querySelector('[data-broadcast-close]').addEventListener('click', function () {
            stopMotion();
            root.hidden = true;
        });

        track.addEventListener('animationend', function (event) {
            if (event.animationName !== 'broadcast-marquee') return;
            if (!isPaused && !document.hidden && !root.hidden) show(activeIndex + 1);
        });

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) stopMotion(); else if (!isPaused) show(activeIndex);
        });

        document.addEventListener('click', function (event) {
            if (!panel.hidden && !root.contains(event.target)) closePanel();
        });

        window.addEventListener('resize', function () {
            if (resizeTimer) window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(function () {
                if (!isPaused && !root.hidden) show(activeIndex);
            }, 180);
        }, { passive: true });
    }

    function readCache() {
        try {
            var cached = JSON.parse(window.sessionStorage.getItem(cacheKey) || 'null');
            if (!cached || !Array.isArray(cached.items) || !cached.items.length) return null;
            if ((Date.now() - Number(cached.savedAt || 0)) > cacheTtl) return null;
            return cached.items;
        } catch (error) {
            return null;
        }
    }

    function writeCache(feedItems) {
        try {
            window.sessionStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), items: feedItems }));
        } catch (error) {
            // Cache adalah optimasi opsional; feed tetap berfungsi saat storage dibatasi browser.
        }
    }

    function display(feedItems) {
        items = feedItems;
        if (!items.length) return;

        root.hidden = false;
        renderList();
        show(0);
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
                var feedItems = Array.isArray(payload.items) ? payload.items : [];
                if (!feedItems.length) return;
                writeCache(feedItems);
                display(feedItems);
            })
            .catch(function () {
                if (!items.length) root.hidden = true;
            });
    }

    bindEvents();
    var cachedItems = readCache();
    if (cachedItems) {
        display(cachedItems);
    } else {
        window.setTimeout(load, 5000);
    }
})();
