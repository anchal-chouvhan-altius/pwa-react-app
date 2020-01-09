var cacheName = 'todo-app-v8';
var assets = [
  '/pwa-react-app/index.html',
  '/pwa-react-app/manifest.json',
  '/pwa-react-app/favicon.ico',
  '/pwa-react-app/logo.png',
  '/pwa-react-app/logo192.png',
  '/pwa-react-app/logo512.png',
  '/pwa-react-app/static/css/main.2a3f1e63.chunk.css',
  '/pwa-react-app/static/js/2.9eb1b836.chunk.js'
];

// '/pwa-react-app/index.html',
//   '/pwa-react-app/manifest.json',
//   '/pwa-react-app/favicon.ico',
//   '/pwa-react-app/logo.png',
//   '/pwa-react-app/logo192.png',
//   '/pwa-react-app/logo512.png',
//   '/pwa-react-app/static/js/main.7d4faf4a.chunk.js',
//   '/pwa-react-app/static/css/main.2a3f1e63.chunk.css',
//   '/pwa-react-app/static/js/2.9eb1b836.chunk.js'

// --    '/static/js/bundle.js',
//   --  '/static/js/bundle.js.map',
//    -- '/static/js/main.chunk.js.map',
// ,
//     --'/static/js/0.chunk.js',
// --     '/static/js/0.chunk.js.map',
//    -- '/static/js/1.chunk.js',
// --    '/static/js/main.chunk.js',
//   --  '/sockjs-node',
//     '/manifest.json',
//     '/logo192.png',
//     '/logo.png',
//     '/logo512.png',
//     '/static/media/logo.5d5d9eef.svg',
//     'favicon.ico'

self.addEventListener('install', event => {
    console.log('service worker installed');
    event.waitUntil(
        caches.open(cacheName).then((cahce) => {
            console.log("Going to add assessts...")
            cahce.addAll(assets);
        }).then(() => self.skipWaiting()).catch(function(err){console.log("Error occured while installing service worker---"+err)})
    )
});
self.addEventListener('activate', function (event) {
    console.log('service worker activated');
   // delete any caches that aren't in expectedCaches
  // which will get rid of static-v1
  // caches.open(cacheName).then(function(cache) {
  //   console.log("going to call fetch ---")
  //   fetch('https://anchalchouvhan.github.io/pwa-react-app/anchallogo.png').then(function(response) {
  //     console.log("response---"+response.statusText);
  //     if (!response.ok) {
  //       // showNotification();
  //       cahce.addAll(assets);
  //     }
  //   }).catch(function(error) {
  //     console.log('Looks like there was a problem: \n', error);
  //   });
  // })

//   caches.open(cacheName).then((cahce) => {
//     console.log("Going to add assessts")
//     cahce.addAll(assets);
// }).then(() => self.skipWaiting()).catch(function(err){console.log("Error occured while installing service worker---"+err)})
// caches.match('https://anchalchouvhan.github.io/pwa-react-app/logo.png').then(function(response) {
// console.log("installation data---"+response);  
// if (!response) {
//   console.log("bad response");
//   }
// }).catch(function(error){
//   console.log("error occured****************"+error);
// })


  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        console.log("key---"+key)
        console.log("cacheName------****"+cacheName)
        if (!cacheName.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('V2 now ready to handle fetches!!!');
    })
  );
})

self.addEventListener('fetch', evt => {
    console.log('fetch event', evt);
    const url = new URL(evt.request.url);
    console.log("url.origin---"+url.origin);
    console.log("location.origin---"+location.origin);
    console.log("url.pathname---"+url.pathname);

// cache.match("https://anchalchouvhan.github.io/pwa-react-app/logo.png")        
       
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
          console.log("cacheRes---"+cacheRes);
          console.log("cacheRes 1---"+fetch(evt.request));
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
self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('https://www.altius.cc/');
    notification.close();
  }
});
// Push messaging
self.addEventListener('push', function(e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: '/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'Explore this new world',
        icon: '/logo.png'},
      {action: 'close', title: 'Close',
        icon: '/logo.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});

function showNotification() {
  // Notification.requestPermission(function(result) {
  //   if (result === 'granted') {
  //     navigator.serviceWorker.ready.then(function(registration) {
  //       registration.showNotification('Vibration Sample', {
  //         body: 'Buzz! Buzz!',
  //         icon: '../images/touch/chrome-touch-icon-192x192.png',
  //         vibrate: [200, 100, 200, 100, 200, 100, 200],
  //         tag: 'vibration-sample'
  //       });
  //     });
  //   }
  // });
  Notification.requestPermission().then(function (permission) {
    // If the user accepts, let's create a notification
    console.log("permissions---"+permission);
    if (permission === "granted") {
      var notification = new Notification("Hi there!");
    }
  }).catch(function(error){
    console.log("error occured while fetching permissions");
  });
}