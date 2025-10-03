// sw.js
const CACHE_NAME = "jibran-cache-v1";

// List of files to cache
const ASSETS = [
  "/",
  "/index.html",
  "/About.html",
  "/Blogs.html",
  "/Contact.html",
  "/Home.html",
  "/Projects.html",
  "/404.html",

  // CSS
  "/CSS/style.css",
  "/CSS/about.css",
  "/CSS/blog.css",
  "/CSS/contact.css",
  "/CSS/Home.css",
  "/CSS/projects.css",
  "/CSS/404.css",

  // JS
  "/JS/script.js",
  "/JS/about.js",
  "/JS/blog.js",
  "/JS/contact.js",
  "/JS/Home.js",
  "/JS/projects.js",
  "/JS/404.js",
  "/JS/lowpoly.js",

  // Media (add more if you want ALL images/videos cached)
  "/Media/Jibran.png",
  "/Media/JibranZada.png",
  "/Media/sample.jpg",
  "/Media/globe-3.mp4",
];

// Install event = cache all files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Fetch event = serve from cache first, then network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});

// Activate event = remove old caches when updating
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});
