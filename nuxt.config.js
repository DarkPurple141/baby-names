const nodeExternals = require('webpack-node-externals')

module.exports = {
  /*
  ** Headers of the page
 <link rel="stylesheet" href="css/main.css">
 <script type="text/javascript" src="js/names.js"></script>
 <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
 <script>
   (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-4646707073869632",
      enable_page_level_ads: true
   });
 </script>
  */
  head: {
    title: 'Baby Names',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxtifying an old basic html web project.' },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  plugins: ['~plugins/vue-awesome.js'],
  /*
  ** Build configuration
  */

  build: {
    /*
    ** Run ESLint on save
    */
    vendor: [
      'vue-awesome'
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
            whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^vue-awesome/]
          })
        ]
     }
    }
  },
  generate: {
    dir: 'my-dir-other-than-dist'
  }
}
