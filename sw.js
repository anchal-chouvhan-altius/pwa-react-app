var version = 'todo-app_v1';
var cacheName = version;
var assets = [
    '/static/js/bundle.js',
    '/static/js/bundle.js.map',
    '/static/js/main.chunk.js.map',
    '/index.html',
    '/static/js/0.chunk.js',
    '/static/js/0.chunk.js.map',
    '/static/js/1.chunk.js',
    '/static/js/main.chunk.js',
    '/sockjs-node',
    '/manifest.json',
    '/logo192.png',
    '/logo.png',
    '/logo512.png',
    '/static/media/logo.5d5d9eef.svg',
    'favicon.ico'
    // '/'
];

self.addEventListener('install', event => {
    console.log('service worker installed');
    event.waitUntil(
        caches.open(cacheName).then((cahce) => {
            console.log("Going to add assessts")
            cahce.addAll(assets);
        }).then(() => self.skipWaiting())
    )
});
self.addEventListener('activate', function (event) {
    console.log('service worker activated');
    event.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== cacheName)
                .map(key => caches.delete(key))
            );
        })
    );
})

self.addEventListener('fetch', evt => {
    console.log('fetch event', evt);
    const url = new URL(evt.request.url);
    console.log("url.origin---"+url.origin);
    console.log("location.origin---"+location.origin);
    console.log("url.pathname---"+url.pathname);

    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});
self.addEventListener('message', (event) => {
    console.log('[Service Worker] Message Event: ', event.data)
});

/**
 * Listen for incoming Push events
 */
// addEventListener('push', (event) => {
// 	console.log('[Service Worker] Push Received.');
// 	console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

// 	if (!(self.Notification && self.Notification.permission === 'granted'))
// 		return;

// 	var data = {};
//   if (event.data)
//     data = event.data.json();

// 	var title = data.title || "Web Push Notification";
// 	var message = data.message || "New Push Notification Received";
// 	var icon = "images/notification-icon.png";
// 	var badge = 'images/notification-badge.png';
// 	var options = {
// 		body: message,
// 		icon: icon,
// 		badge: badge
// 	};
// 	event.waitUntil(self.registration.showNotification(title,options));
// });

// /**
//  * Handle a notification click
//  */
// addEventListener('notificationclick', (event) => {
// 	console.log('[Service Worker] Notification click: ', event);
// 	event.notification.close();
// 	event.waitUntil(
// 		clients.openWindow('https://aws-amplify.github.io/amplify-js')
// 	);
// });
