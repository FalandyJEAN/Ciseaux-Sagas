// Service Worker
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
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
  '/manifest.json',
  '/IMAGES/computer-solid.svg',
  '/IMAGES/roches.jpeg',
  '/IMAGES/ciseaux.jpeg',
  '/IMAGES/papier.jpeg',
  '/SONS/playerSound.mp3',
  '/SONS/computerSound.wav',
  '/SONS/startSound.wav',
  '/SONS/winner.wav',
  '/SONS/Sad-SoundBible.com-759843766.wav'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request)
      })
  )
})
