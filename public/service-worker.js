const CACHE_NAME = "flatmatch-v1";
const RUNTIME_CACHE = "flatmatch-runtime-v1";
const IMAGE_CACHE = "flatmatch-images-v1";

// Assets to cache immediately
const PRECACHE_URLS = ["/", "/offline.html", "/manifest.json"];

// Install event - precache essential assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        cacheNames.filter((cacheName) => !currentCaches.includes(cacheName)),
      )
      .then((cachesToDelete) =>
        Promise.all(
          cachesToDelete.map((cacheToDelete) => caches.delete(cacheToDelete)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle API requests - network only with offline fallback
  if (url.pathname.startsWith("/api/") || url.hostname.includes("supabase")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache successful responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return cached version if offline
          return caches.match(request).then((cached) => {
            if (cached) {
              return cached;
            }
            // Return offline page for navigation requests
            if (request.mode === "navigate") {
              return caches.match("/offline.html");
            }
            return new Response(
              JSON.stringify({
                error: "Offline",
                message: "No connection available",
              }),
              {
                headers: { "Content-Type": "application/json" },
                status: 503,
              },
            );
          });
        }),
    );
    return;
  }

  // Handle images - cache first, fallback to network
  if (request.destination === "image") {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(request).then((response) => {
          // Cache images for future use
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(IMAGE_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      }),
    );
    return;
  }

  // Handle navigation - network first with cache fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful navigation responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match("/offline.html");
          });
        }),
    );
    return;
  }

  // Default strategy - network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => caches.match(request)),
  );
});

// Handle background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-favorites") {
    event.waitUntil(syncFavorites());
  }
});

async function syncFavorites() {
  // Implement sync logic for offline favorites
  // This would sync any favorites added while offline
  console.log("Syncing favorites...");
}

// Handle push notifications
self.addEventListener("push", (event) => {
  const options = {
    actions: [
      {
        action: "explore",
        title: "View",
      },
      {
        action: "close",
        title: "Close",
      },
    ],
    badge: "/icons/icon-72x72.png",
    body: event.data?.text() || "New notification from Flatmatch",
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    icon: "/icons/icon-192x192.png",
    vibrate: [200, 100, 200],
  };

  event.waitUntil(self.registration.showNotification("Flatmatch", options));
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});
