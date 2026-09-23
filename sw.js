/* funciona sem internet: guarda o app no aparelho e busca a versão nova quando há conexão (só mexe na própria cópia) */
const CACHE = 'precize-v15';
const BASE = ['./', './index.html', './manifest.webmanifest', './firebase-config.js', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => (k.startsWith('planilha-') || k.startsWith('precize-')) && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if(req.method !== 'GET') return;
  const u = new URL(req.url);
  if(u.hostname.endsWith('googleapis.com') && u.hostname !== 'fonts.googleapis.com') return;   // banco e login: sempre direto na internet
  const mesmo = u.origin === self.location.origin;
  if(mesmo && (req.mode === 'navigate' || u.pathname.endsWith('.html') || u.pathname.endsWith('firebase-config.js'))){
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(req, c)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
    return;
  }
  if(mesmo || u.hostname === 'www.gstatic.com' || u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com'){
    e.respondWith(caches.match(req).then(hit => {
      const rede = fetch(req).then(r => { if(r && (r.ok || r.type === 'opaque')){ const c = r.clone(); caches.open(CACHE).then(k => k.put(req, c)); } return r; }).catch(() => hit);
      return hit || rede;
    }));
  }
});
