/* eslint-disable prefer-regex-literals */
/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js')

if (workbox) { console.log('Workbox berhasil dimuat') } else { console.log('Workbox gagal dimuat') }

workbox.precaching.precacheAndRoute([
  { url: '/js/register-sw.js', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/team.html', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/favicon.ico', revision: '1' },
  { url: '/push.js', revision: '1' },
  { url: '/service-worker.js', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/script.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/pushnotif.js', revision: '1' },
  { url: '/js/addhtml.js', revision: '1' },
  { url: '/js/teambutton.js', revision: '1' },
  { url: '/img/no-image.png', revision: '1' },
  { url: '/img/icons/icon-96x96.png', revision: '1' },
  { url: '/img/icons/icon-72x72.png', revision: '1' },
  { url: '/img/icons/icon-128x128.png', revision: '1' },
  { url: '/img/icons/icon-144x144.png', revision: '1' },
  { url: '/img/icons/icon-152x152.png', revision: '1' },
  { url: '/img/icons/icon-192x192.png', revision: '1' },
  { url: '/img/icons/icon-384x384.png', revision: '1' },
  { url: '/img/icons/icon-512x512.png', revision: '1' },
  { url: '/img/icons/android-chrome-192x192.png', revision: '1' },
  { url: '/img/icons/android-chrome-512x512.png', revision: '1' },
  { url: '/img/icons/apple-touch-icon.png', revision: '1' },
  { url: '/img/icons/favicon-16x16.png', revision: '1' },
  { url: '/img/icons/favicon-32x32.png', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/saved.html', revision: '1' },
  { url: '/pages/teams.html', revision: '1' }
])

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'pages'
  })
)

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'footballapi'
  })
)

workbox.routing.registerRoute(
  new RegExp('https://fonts.googleapis.com/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  })
)

workbox.routing.registerRoute(
  new RegExp('https://fonts.gstatic.com/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-webfonts'
  })
)

// sumber: https://stackoverflow.com/questions/46281732/how-to-ignore-url-querystring-from-cached-urls-when-using-workbox
// agar dapat mengakses page team.html yang memiliki query parameter
const ignoreQueryStringPlugin = {
  cachedResponseWillBeUsed: async ({ cacheName, request, matchOptions, cachedResponse, event }) => {
    console.log(request.url)
    if (cachedResponse) {
      return cachedResponse
    }

    return caches.match(request.url, { ignoreSearch: true })
  }
}

workbox.routing.registerRoute(
  new RegExp('/team.html'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'teampage',
    plugins: [ignoreQueryStringPlugin]
  })
)

self.addEventListener('push', (event) => {
  let body
  if (event.data) {
    body = event.data.text()
  } else {
    body = 'Push message no payload'
  }
  const options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  )
})
