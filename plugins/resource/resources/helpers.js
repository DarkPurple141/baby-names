export const corsPost = (path, data) => {
   return fetch(path, {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors',
      headers: new Headers({
         'Content-Type': 'application/json'
      })
   })
   .then(res => res.json())
}

export const corsFetch = (path) => {
   return fetch(path, {
      mode: 'cors'
   })
   .then(res => res.json())
   .catch(err => {
      router.push({path: '/400'})
   })
}
