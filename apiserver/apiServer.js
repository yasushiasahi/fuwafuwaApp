'use strict'

const http = require('http')
const server = http.createServer()
const fs = require('fs')
const path = require('path')
const api = require('./apiHandlers.js')

server.on('request', (request, response) => {
  if (typeof api[request.url.split('/')[2]] === 'function') {
    handleApis(request, response)
  }
})

server.listen(3000)

const handleApis = async (request, response) => {
  const responseBody = await api[request.url.split('/')[2]](request)
    .then(({ body, cookies }) => {
      if (cookies) {
        response.setHeader('Set-Cookie', cookies)
      }
      return { status: true, body }
    })
    .catch(({ err, place, errMsg: body }) => {
      err && logError(err, place)
      return { status: false, body }
    })
  response.end(JSON.stringify(responseBody))
}

const logError = (err, { file, name, line, column }) => {
  const now = new Date()
  const year = now.getFullYear()
  const mon = `0${now.getMonth() + 1}`.slice(-2)
  const day = `0${now.getDate()}`.slice(-2)
  const hour = `0${now.getHours()}`.slice(-2)
  const min = `0${now.getMinutes()}`.slice(-2)
  const sec = `0${now.getSeconds()}`.slice(-2)
  const time = `${year}/${mon}/${day} ${hour}:${min}.${sec}`
  const log = `-----------< ${time} ${file} ${name} ${line}/${column} >--------------\n${err}\n\n`
  fs.appendFile(path.join(__dirname, '../data/logs/errorLog.txt'), log, 'utf8', () => {
    return
  })
}

// const util = require('util')
// const fsReadFileP = util.promisify(fs.readFile)

// server.on('request', (request, response) => {
//   typeof api[request.url.split('/')[2]] === 'function'
//     ? handleApis(request, response)
//     : sendBackStaticFiles(request, response)
// })

// const sendBackStaticFiles = async (request, response) => {
//   const url = `dist${request.url.endsWith('/') ? request.url + 'index.html' : request.url}`
//   const getHeadInfos = url => {
//     const types = {
//       '.html': 'text/html',
//       '.js': 'text/javascript',
//       '.jpg': 'image/jpg',
//       '.ico': 'image/ico'
//     }
//     for (const key in types) {
//       if (url.endsWith(key)) return { statusCode: 200, type: types[key] }
//     }
//     return { statusCode: 404, type: 'text/plain' }
//   }
//   const responseBody = await fsReadFileP(url).catch(() => '404 NOT FOUND')
//   response.writeHead(getHeadInfos(url).statusCode, { 'Content-Type': getHeadInfos(url).type })
//   response.end(responseBody)
// }
