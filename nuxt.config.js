const nodeExternals = require('webpack-node-externals')

module.exports = {

  head: {
    title: 'Baby Names',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Crowd source the name of your future love spawn.' },
      { property: "og:image" , content: "/og-image.jpg"},
      { property: "og:image:width", content: "1191"},
      { property: "og:image:height", content: "1786"},
      { property: "og:title", content: "BabyNamer"},
      { property: "og:description", content: "Help decide the name your future descendants."},
      { property: "og:url", content: "http://alhinds.com/baby-names/vote"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  plugins: [
     '~plugins/vue-awesome.js',
     '~plugins/api.js',
     '~plugins/vue-transitions.js',
     '~plugins/social-sharing.js'],
  /*
  ** Build configuration
  */

  build: {
    /*
    ** Run ESLint on save
    */
    vendor: [
      'vue-awesome',
      'vue-loading-spinner',
      'vue-social-sharing'
    ],
    extend (config, { isDev, isClient, isServer }) {
     if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
     }
     if (isServer) {
        config.externals = [
          nodeExternals({
            // default value for `whitelist` is
            // [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i]
            whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^vue-awesome/, /^vue-loading-spinner/]
          })
        ]
     }
    }
  },
  generate: {
    dir: 'docs'
  },
  router: {
    base: '/baby-names/'
  }
}
