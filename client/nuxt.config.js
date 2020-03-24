const pkg = require('./package')
module.exports = {
  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  },

  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: { lang: 'fr' },
    title: pkg.name,

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'apple-mobile-web-app-capable', content: 'yes' }
      // { name: 'apple-mobile-web-app-status-bar-style', content: '#212121' }
    ],

    link: [
      {
        rel: 'stylesheet',
        href: `https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons`
      },
      {
        rel: 'stylesheet',
        href: `https://cdn.jsdelivr.net/npm/vuetify@1.5.7/dist/vuetify.min.css`
      }    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00E676' },

  /*
  ** Global CSS
  */
  css: ['~/assets/style/app.styl'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/vuetify', {src:'~/plugins/webcam'}, '@/plugins/bootstrap-vue', {src: '~/plugins/sharewhatsapp.js', ssr: false}, {src: '~/plugins/sharemail.js', ssr: false}],

  /*
  ** Nuxt.js modules
  */
  modules: [['@nuxtjs/pwa', { icon: true, workbox: false }]],

  /*
  ** Uses manifest module of PWA module
  */
  manifest: {
    name: 'Mecanicus',
    lang: 'fr-FR',
    short_name: 'Mecanicus',
    theme_color: '#18578c',
    background_color: '#ffffff',
    start_url: 'nopath.surge.sh',
    display: 'standalone',
    icons: []
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
