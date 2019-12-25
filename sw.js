var cacheName = 'todo-app';
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
self.addEventListener('activate',function(event){
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
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request);
      })
    );
  });
// activate event
// self.addEventListener('activate', evt => {
//     console.log('service worker activated');
//     evt.waitUntil(
//       caches.keys().then(keys => {
//         //console.log(keys);
//         return Promise.all(keys
//           .filter(key => key !== cacheName)
//           .map(key => caches.delete(key))
//         );
//       })
//     );
//   });
// fetch event
// self.addEventListener('fetch', evt => {
//   console.log('fetch event', evt);
//   evt.respondWith(
//     caches.match(evt.request).then(cacheRes => {
//       return cacheRes || fetch(evt.request);
//     })
//   );
// });