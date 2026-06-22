self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    var targetUrl = event.notification.data && event.notification.data.url
        ? event.notification.data.url
        : '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];

                if ('focus' in client) {
                    client.postMessage({ type: 'OPEN_TEAM_CHAT' });

                    return client.focus();
                }
            }

            return clients.openWindow ? clients.openWindow(targetUrl) : null;
        })
    );
});
