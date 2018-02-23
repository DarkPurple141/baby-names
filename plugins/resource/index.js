
export default {
  install(Vue, { endpoint = '', resources = {} }) {
    Vue.prototype.$getResource = function(method, options) {
      let name = this.$options.resource
      if (!name || !resources[name] || !resources[name][method]) return;

      // get fetch path and response resolver/mapper
      let { path, resolve } = resources[name][method](options)
      let uri = endpoint + path

      // fetch, parse and cache resource then pass to resolver
      return resolve(uri)
    }
  }
}
