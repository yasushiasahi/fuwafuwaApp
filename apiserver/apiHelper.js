'use strict'

const formidable = require('formidable')
const crypto = require('crypto')
const path = require('path')
const tmpDir = path.join(__dirname, '../data/tmp/')

const getFormData = request => {
  const form = formidable.IncomingForm()
  form.encoding = 'utf-8'
  form.uploadDir = tmpDir
  return new Promise((resolve, reject) => {
    form.parse(request, (err, fields, files) => {
      if (err) {
        reject({ err, place: getTrace(), errMsg: 'ファイルを保存できませんでした' })
      }
      return resolve({ fields, files })
    })
  })
}

const parseReqBody = request => {
  let reqBody = ''
  request.setEncoding('utf8')
  request.on('data', dataChank => {
    reqBody += dataChank
  })
  return new Promise(resolve => {
    request.on('end', () => {
      resolve(JSON.parse(reqBody))
    })
  })
}

const getHash = password => {
  const salt = 'ifeee:foeaofgi4'
  const hash = crypto.createHash('sha512')
  hash.update(password + salt)
  return hash.digest('hex')
}

const getToken = userName => {
  return getHash(`${userName}: ${new Date().getTime().toString()} `)
}

const getCookieValue = (cookie, key) => {
  const regexp = new RegExp(`${key}=`)
  return cookie
    .replace(/\s/g, '')
    .split(';')
    .find(obj => obj.startsWith(`${key}=`))
    .replace(regexp, '')
}

const checkCookie = async (r, users) => {
  const c = r.headers.cookie
  if (!c) {
    return false
  }
  if (!(c.includes('userName') && c.includes('token'))) {
    return false
  }
  const un = getCookieValue(c, 'userName')
  const t = getCookieValue(c, 'token')
  const i = await users.findIndex(un)
  if (i === -1) {
    return false
  }
  const rs = await users.check(i, { token: t })
  if (!rs) {
    return false
  }
  return true
}

module.exports = { getFormData, parseReqBody, getHash, getToken, checkCookie }

const getTrace = caller => {
  const prepareStackTrace = (error, structuredStackTrace) => {
    var trace = structuredStackTrace[0]
    return {
      name: trace.getMethodName() || trace.getFunctionName() || '<anonymous>',
      file: trace
        .getFileName()
        .split('/')
        .slice(-1)[0],
      line: trace.getLineNumber(),
      column: trace.getColumnNumber()
    }
  }
  var original = Error.prepareStackTrace,
    error = {}
  Error.captureStackTrace(error, caller || getTrace)
  Error.prepareStackTrace = prepareStackTrace
  var stack = error.stack
  Error.prepareStackTrace = original
  return stack
}
