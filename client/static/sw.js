importScripts('/_nuxt/workbox.5c678697.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/04c537a02053a93e8ede.js",
    "revision": "d0fc22343a55a112ef2873e133e51a9a"
  },
  {
    "url": "/_nuxt/0a2fd1c9304f03a567f8.js",
    "revision": "597f133bbe5efa0e0f1f0e795346ca1a"
  },
  {
    "url": "/_nuxt/121218700ccc627e3b4c.js",
    "revision": "42f41a3d2e7e403ce9268b838720d8eb"
  },
  {
    "url": "/_nuxt/882b756a9589623cd185.js",
    "revision": "257b099b84f82c99ac16a096fb81afea"
  },
  {
    "url": "/_nuxt/a7f4bfd11448ebbbcdc1.js",
    "revision": "4a2e6753b11f39da68af0af3ef6e5db9"
  },
  {
    "url": "/_nuxt/b6f225326107068fccc8.js",
    "revision": "2318f35e809c46c9e33ba89b2b586818"
  },
  {
    "url": "/_nuxt/cef47019eb6a606b166f.js",
    "revision": "e66cdcdde0bf8acf981ca429203e8b8e"
  }
], {
  "cacheId": "Mecanicus",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')





