'use strict'

const fs = require('fs')
const util = require('util')
const fsReadFileP = util.promisify(fs.readFile)
const fsWriteFileP = util.promisify(fs.writeFile)
const fsRenameP = util.promisify(fs.rename)
const fsUnlinkP = util.promisify(fs.unlink)

const readDB = async filePath => {
  return JSON.parse(
    await fsReadFileP(filePath, 'utf-8').catch(err => {
      throw { err, place: getTrace(), errMsg: 'データの読み込みに失敗しました' }
    })
  )
}

const writeDB = async (filePath, data) => {
  return fsWriteFileP(filePath, JSON.stringify(data)).catch(err => {
    throw { err, place: getTrace(), errMsg: 'データベースの更新に失敗しました' }
  })
}

const renameFile = async (oldFilePath, newFilePath) => {
  return fsRenameP(oldFilePath, newFilePath).catch(err => {
    throw { err, place: getTrace(), errMsg: 'ファイルの保存に失敗しました' }
  })
}

const removeFile = async path => {
  return fsUnlinkP(path).catch(err => {
    throw { err, place: getTrace(), errMsg: 'ファイルの削除に失敗しました' }
  })
}

module.exports = { readDB, writeDB, renameFile, removeFile }

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
