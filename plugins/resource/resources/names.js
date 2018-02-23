import { corsFetch } from './helpers'

export default {
  girls() {
    return {
      path: `girls.json`,
      resolve: () => corsFetch('girls.json')
    }
  },

  boys() {
    return {
      path: `boys.json`,
      resolve: () => corsFetch('boys.json')
    }
  }
}
