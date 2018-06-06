'use strict'

const fs = require('fs')
const formidable = require('formidable')
const crypto = require('crypto')
const util = require('util')
const path = require('path')
const fsReadFileP = util.promisify(fs.readFile)
const fsWriteFileP = util.promisify(fs.writeFile)
const fsRenameP = util.promisify(fs.rename)
const fsUnlinkP = util.promisify(fs.unlink)
const pictureDir = path.join(__dirname, '../dist/images/gallery/')
const galleryFilePath = path.join(__dirname, 'databases/gallerydata.json')
const tmpDir = path.join(__dirname, 'tmp')

const removePicture = async targetPictureName => {
  console.log('removePicture が呼ばれた')
  return fsUnlinkP(`${pictureDir}${targetPictureName}`).catch(err => {
    throw { err, place: getTrace(), errMsg: 'ファイルの削除に失敗しました' }
  })
}

const getGalleryDataAndFindTargetIndex = async pictureName => {
  console.log('getGalleryDataAndFindTargetIndex が呼ばれた')
  const gallery = await getDatabase(galleryFilePath)
  const targetIndex = gallery.findIndex(obj => obj.pictureName === pictureName)
  if (targetIndex === -1) throw { errMsg: `該当のデータが存在しません` }
  return { gallery, targetIndex }
}

const renameFile = async (oldFilePath, newFilePath) => {
  console.log('renameFile が呼ばれた')
  return fsRenameP(oldFilePath, newFilePath).catch(err => {
    throw { err, place: getTrace(), errMsg: 'ファイルの保存に失敗しました' }
  })
}

const writeFile = async (filePath, saveData) => {
  console.log('writeFile が呼ばれた')
  return fsWriteFileP(filePath, JSON.stringify(saveData)).catch(err => {
    throw { err, place: getTrace(), errMsg: 'データベースの更新に失敗しました' }
  })
}

const getDatabase = async filePath => {
  console.log('getDatabase が呼ばれた')
  return JSON.parse(
    await fsReadFileP(filePath, 'utf-8').catch(err => {
      throw { err, place: getTrace(), errMsg: 'データの読み込みに失敗しました' }
    })
  )
}

const getFormData = request => {
  console.log('getFormData が呼ばれた')
  const form = formidable.IncomingForm()
  form.encoding = 'utf-8'
  form.uploadDir = tmpDir
  return new Promise((resolve, reject) => {
    form.parse(request, (err, fields, files) => {
      if (err) reject({ err, place: getTrace(), errMsg: 'ファイルを保存できませんでした' })
      const { picture = {} } = files
      return resolve({ fields, picture })
    })
  })
}

const parseReqBody = request => {
  console.log('parseReqBody が呼ばれた')
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
  console.log('getHash が呼ばれた')

  const salt = 'ifeee:foeaofgi4'
  const hash = crypto.createHash('sha512')
  hash.update(password + salt)
  return hash.digest('hex')
}

const getToken = userName => {
  console.log('getToken が呼ばれた')

  return getHash(`${userName}: ${new Date().getTime().toString()} `)
}

const getUniqueStr = () => {
  console.log('getUniqueStr が呼ばれた')

  return new Date().getTime().toString(16) + Math.floor(100 * Math.random()).toString(16)
}

const getTrace = caller => {
  const prepareStackTrace = (error, structuredStackTrace) => {
    var trace = structuredStackTrace[0]
    return {
      // method name
      name: trace.getMethodName() || trace.getFunctionName() || '<anonymous>',
      // file name
      file: trace
        .getFileName()
        .split('/')
        .slice(-1)[0],
      // line number
      line: trace.getLineNumber(),
      // column number
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

module.exports = {
  removePicture,
  getGalleryDataAndFindTargetIndex,
  renameFile,
  writeFile,
  getDatabase,
  getFormData,
  parseReqBody,
  getHash,
  getToken,
  getUniqueStr
}
