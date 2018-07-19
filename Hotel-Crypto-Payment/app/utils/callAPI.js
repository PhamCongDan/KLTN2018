export function callAPI(url,method='GET',body){
    return fetch(url,{
        headers:{"content-type":"application/json"},
        method,
        body: JSON.stringify(body),
      })
      .then(response => {
      return response.json().then(json => ({ json, response }))})
      .then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return  json;
      })
}
// call API with token
export function callApiRequireAuth(url, method = 'get', token,body) {
    return fetch(url, {
      headers: {
        'content-type': 'application/json',
        'authorization': token
      },
      method,
      body: JSON.stringify(body),
    })
    .then(response => {
    return response.json().then(json => ({ json, response }))})
    .then(({ json, response }) => {
  
      if (!response.ok) {
        return Promise.reject(json);
      }
      return  json;
    })
  }
export function pause(delay) {
  return new Promise(resolve => {
    setTimeout(_ => {
      resolve()
    }, delay)
  })
}
