'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "1cd8bec7207a54c368f820dec9d1adde",
"assets/assets/icons/ic_all_products.svg": "d1c9ecce43665adbc0349279872489af",
"assets/assets/icons/ic_cart.svg": "b4f50a328065e9eebbf1f0a770845079",
"assets/assets/icons/ic_collections.svg": "0f3efa279c4e7318b167498bbc3a4965",
"assets/assets/icons/ic_filter.svg": "da03a94d354666c609ef611a9aff56d7",
"assets/assets/icons/ic_flash.svg": "6f3d715aff909542fcddd7ae5cc9b8d4",
"assets/assets/icons/ic_heart.svg": "6a8c5ee7645f55fe282d1079719cb04c",
"assets/assets/icons/ic_home.svg": "10e902447c6f7f2c3a754292e7722dd5",
"assets/assets/icons/ic_like.svg": "6a8c5ee7645f55fe282d1079719cb04c",
"assets/assets/icons/ic_log_out.svg": "f026280de5c7a346671da7d45f9a4991",
"assets/assets/icons/ic_men.svg": "bee301d6cf9c59255c43ba41f3fb201d",
"assets/assets/icons/ic_my_account.svg": "7d457974481968069cabfaa928825272",
"assets/assets/icons/ic_profile.svg": "896202e8e780ce061e3c01af3d238ddf",
"assets/assets/icons/ic_search.svg": "07fd750d63e2a0821be23a37a5e4faaa",
"assets/assets/icons/ic_sort.svg": "3fa9248aa5fe6eb4056145342a0ca80a",
"assets/assets/icons/ic_star.svg": "53569acb36468ef627adddfdb27e1c8b",
"assets/assets/icons/ic_women.svg": "1256655bbc7b0bc7b564555ecb85538f",
"assets/assets/logos/logo.png": "d117216c1f920e36a1c2d96130e3b391",
"assets/assets/logos/small_logo.png": "9655ea7cfa77cca5197b301c38f39864",
"assets/assets/mobile/ic_collection.svg": "ecdb7c3590a941ca5a8902b9171ebd57",
"assets/assets/mobile/ic_collection_active.svg": "040a5de8959f6778748b45a3d7199128",
"assets/assets/mobile/ic_home.svg": "b3445bee60aecd903a77d099f273966f",
"assets/assets/mobile/ic_home_active.svg": "d79af884feed6a4e5534f6e0c18c179e",
"assets/assets/mobile/ic_my_account.svg": "dba24422eb997c31bcb2ceae8e043128",
"assets/assets/mobile/ic_my_account_active.svg": "55d277c97a33b43f948fa550e611dcf8",
"assets/assets/mobile/ic_products.svg": "24e15eb5315bc2040dd5417cb6fe95c7",
"assets/assets/mobile/ic_products_active.svg": "afdc448587353f07c9a5f1068627faa4",
"assets/assets/renders/cap.png": "becbcd03a60abf791aef4daeef8221a5",
"assets/assets/renders/mockup.png": "dc5b7a526637cbc291f0f81247cc278b",
"assets/assets/renders/no_way.png": "fe0861a2f3ae27692ce44d5a3c23720b",
"assets/assets/renders/yess.png": "bcf66ad63bce45570dd7dc226a316b9a",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "cbe81ca9a9c003484d7966af90992a33",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "6333b551ea27fd9d8e1271e92def26a9",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "4c28997a65b7f4b3d2a7cd677e2f3be1",
"/": "4c28997a65b7f4b3d2a7cd677e2f3be1",
"main.dart.js": "e2a59452b9134ae784be679b865e1c7b",
"manifest.json": "e980f1b3982505deae160cc6733526bb",
"version.json": "6e2bcd6b84c71efdd2195371cceb329e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
