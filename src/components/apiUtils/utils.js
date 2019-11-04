import CONFIG from '../../config.json'
const ENV = CONFIG.env

export const getRequest = (url, data) => {
  const appId = CONFIG[ENV].APPID
  const url2 = `${url}&${appId}`

  const req = new window.Request(url2, {
    method: 'GET'
  })

  return window.fetch(req)
    .then(response => {
      return response.json()
    })
}
