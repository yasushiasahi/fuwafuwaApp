const fetchApi = async (url, requestBody) => {
  return await fetch(`/api/${url}`, {
    method: 'POST',
    credentials: 'include',
    body: requestBody.constructor === FormData ? requestBody : JSON.stringify(requestBody)
  })
    .then(res => res.json())
    .catch(() => {
      return { status: false, body: 'サーバーとの通信に失敗' }
    })
}

const apiCheckToken = async () => {
  const cookies = document.cookie.replace(/\s/g, '').split(';')
  let userName = ''
  let token = ''
  for (const cookie of cookies) {
    if (cookie.match(/^userName/)) userName = cookie.replace(/userName=/, '')
    if (cookie.match(/^token/)) token = cookie.replace(/token=/, '') + 'h'
  }
  return await fetchApi('checkToken', { userName, token })
}

const getUserName = () => {
  return document.cookie
    .replace(/\s/g, '')
    .split(';')
    .find(obj => obj.startsWith('userName='))
    .replace(/userName=/, '')
}

export default { fetchApi, apiCheckToken, getUserName }
