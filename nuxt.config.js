const nodeExternals = require('webpack-node-externals')

module.exports = {

  head: {
    title: 'Baby Names',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Crowd source the name of your future love spawn.' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  plugins: ['~plugins/vue-awesome.js', '~plugins/api.js', '~plugins/vue-transitions.js'],
  /*
  ** Build configuration
  */

  build: {
    /*
    ** Run ESLint on save
    */
    vendor: [
      'vue-awesome',
      'vue-loading-spinner'
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
