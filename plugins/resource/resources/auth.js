import { corsPost } from './helpers'

export default {
  login(data) {
    return {
      path: '/login',
      resolve: uri => corsPost(uri, data)
                        .then(res => res.json())
    }
  },
  signup(data) {
     return {
      path: '/user',
      resolve: uri => corsPost(uri, data)
                        .then(res => res.json())
    }
  }
}
