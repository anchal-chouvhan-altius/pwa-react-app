var cacheName = 'todo-app_v2';
var assets = [
  '/index.html',
  '/manifest.json',
  '/logo192.png'
];

self.addEventListener('install', event => {
    console.log('service worker installed');
    event.waitUntil(
        caches.open(cacheName).then((cahce) => {
            console.log("Going to add assessts")
            cahce.addAll(assets);
        }).then(() => self.skipWaiting()).catch(function(err){console.log("Error occured while installing service worker---"+err)})
    )
});
self.addEventListener('activate', function (event) {
    console.log('service worker activated');
   // delete any caches that aren't in expectedCaches
  // which will get rid of static-v1
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        console.log("key---"+key)
        console.log("cacheName---"+cacheName)
        if (!cacheName.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('V2 now ready to handle fetches!');
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
        }).catch(function(error) {console.log("Error occured while fetching ---"+error)})
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
