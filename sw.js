const staticCacheName = "site-static-v2";
const dynamicCacheName = "site-dynamic-v2";

const limitCacheSize = (cacheName, numberOfAllowedFiles) => {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > numberOfAllowedFiles) {
        cache
          .delete(keys[0])
          .then(() => limitCacheSize(cacheName, numberOfAllowedFiles));
      }
    });
  });
};

const assets = [
  "/",
  "/index.html",
  "/assets/css/main.css",
  "/assets/js/main.js",
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(assets);
    }),
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key)),
      );
    }),
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(event.request).then((fetchRes) => {
          return caches.open(dynamicCacheName).then((cache) => {
            cache.put(event.request.url, fetchRes.clone());
            limitCacheSize(dynamicCacheName, 2);
            return fetchRes;
          });
        })
      );
    }),
  );
});


