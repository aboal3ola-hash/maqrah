/* © 2026 أحمد عثمان أبو العُلا — جميع الحقوق محفوظة. */
/* غلاف التطبيق: يحفظ صفحات الغلاف والأيقونات فقط ليفتح فورًا؛ بيانات المقرأة تأتي دائمًا من الإنترنت */
var CACHE = 'maqraah-shell-v3';
var SHELL = ['./', './index.html', './manifest.webmanifest', './admin/', './admin/index.html', './admin/manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-180.png', './icons/favicon-32.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;   // لا يتدخّل في بيانات جوجل
  e.respondWith(fetch(e.request).then(function (r) { var cp = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, cp); }); return r; })
    .catch(function () { return caches.match(e.request).then(function (m) { return m || caches.match('./index.html'); }); }));
});
