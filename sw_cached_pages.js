const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js'
];


// Call Install Event
self.addEventListener('install', (e) => {
    console.log('Service Worker installed')

    e.waitUntil(  // waint until the promise is finished / caches are installed 
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
})


// Call Activate Event
self.addEventListener('activate', (e) => {
    console.log('Service Worker activated')

    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {   // can use filter instead of map function 
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})


// Call Fetch Event 
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching')

    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
        
    )
    // console.log(e.request)
})
