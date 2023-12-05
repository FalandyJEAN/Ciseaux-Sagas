const cacheName = 'ciseaux-saga-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/CSS/style.css',
  '/CSS/bouton.css',
  '/app.js',
  '/IMAGES/apple-touch-icon.png',
  '/IMAGES/favicon-32x32.png',
  '/IMAGES/favicon-16x16.png',
  '/IMAGES/site.webmanifest',
  '/IMAGES/safari-pinned-tab.svg',
  '/IMAGES/briquejpeg.jpeg',
  '/IMAGES/computer-solid.svg',
  '/IMAGES/roches.jpeg',
  '/IMAGES/ciseaux.jpeg',
  '/IMAGES/papier.jpeg',
  '/SONS/playerSound.mp3',
  '/SONS/computerSound.wav',
  '/SONS/startSound.wav',
  '/SONS/winner.wav',
  '/SONS/Sad-SoundBible.com-759843766.wav',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request)
    })
  )
})
