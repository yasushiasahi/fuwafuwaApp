export const fetchApi = async (url, requestBody) => {
  return await fetch(`/api/${url}`, {
    method: 'POST',
    body: requestBody.constructor === FormData ? requestBody : JSON.stringify(requestBody)
  })
    .then(res => res.json())
    .catch(() => {
      return { status: false, body: 'サーバーとの通信に失敗' }
    })
}

export const apiCheckToken = async () => {
  const cookies = document.cookie.replace(/\s/g, '').split(';')
  let userName = ''
  let token = ''
  for (const cookie of cookies) {
    if (cookie.match(/^userName/)) userName = cookie.replace(/userName=/, '')
    if (cookie.match(/^token/)) token = cookie.replace(/token=/, '') + 'h'
  }
  return await fetchApi('checkToken', { userName, token })
}

export const getCookie = key => {
  const regexp = new RegExp(`${key}=`)
  return document.cookie
    .replace(/\s/g, '')
    .split(';')
    .find(obj => obj.startsWith(`${key}=`))
    .replace(regexp, '')
}
