import { corsFetch, corsPost } from './helpers'

export default {
  list(id, user) {
    return {
      path: `/list/${id}/${user}`,
      resolve: uri => corsFetch(uri)
    }
  },

  user(id) {
    return {
      path: `/user/${id}`,
      resolve: uri => corsFetch(uri)
    }
  },

  update(data) {
     return {
      path: `/list/update`,
      resolve: uri => corsPost(uri, data)
     }
  },

  delete(data) {
     return {
      path: `/list/delete`,
      resolve: uri => corsPost(uri, data)
     }
  },

  create(data) {
     return {
      path: `/list/create`,
      resolve: uri => {
         return corsPost(uri, data)
         .then(res => res.json())
      }
     }
  },

}
