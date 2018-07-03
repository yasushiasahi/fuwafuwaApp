const url = `https://query.yahooapis.com/v1/public/yql?q=select%20title%2Cdate%2Clink%2Cdescription%20from%20rss%20where%20url%3D'https%3A%2F%2Ffuwafuwayo.exblog.jp%2Findex.xml'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`

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

const getRssFeed = async () => {
  const feeds = await fetch(url)
    .then(res => res.json())
    .then(data => data)
  const blogFeeds = feeds.query.results.item.map((obj, index) => {
    obj.id = index
    obj.isOpen = index === 0 ? true : false
    return obj
  })
  return blogFeeds
}

const getUserName = () => {
  return document.cookie
    .replace(/\s/g, '')
    .split(';')
    .find(obj => obj.startsWith('userName='))
    .replace(/userName=/, '')
}

export default { fetchApi, getRssFeed, getUserName }
