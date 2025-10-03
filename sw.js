// sw.js
const CACHE_NAME = "jibran-cache-v2";

// List of files to cache
const ASSETS = [
  // ✅ All HTML pages
  "/",
  "/index.html",
  "/About.html",
  "/Blogs.html",
  "/Contact.html",
  "/Home.html",
  "/Projects.html",
  "/404.html",

  // ✅ CSS files
  "/CSS/style.css",
  "/CSS/about.css",
  "/CSS/blog.css",
  "/CSS/contact.css",
  "/CSS/Home.css",
  "/CSS/projects.css",
  "/CSS/404.css",

  // ✅ JS files
  "/JS/script.js",
  "/JS/about.js",
  "/JS/blog.js",
  "/JS/contact.js",
  "/JS/Home.js",
  "/JS/projects.js",
  "/JS/404.js",
  "/JS/lowpoly.js",

  // ✅ Media files (all important images & video)
  "/Media/globe-3.mp4",
  "/Media/ICD.png",
  "/Media/Jibran-Zada.png",
  "/Media/Jibran.png",
  "/Media/JibranZada.png",
  "/Media/navttc.png",
  "/Media/pro.png",
  "/Media/sample.jpg",
];

// Install event = cache all listed files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Fetch event = serve from cache first, then network if not found
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// Activate event = remove old cache versions
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});
