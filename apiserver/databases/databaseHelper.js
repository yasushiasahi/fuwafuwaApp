'use strict'

const fs = require('fs')
const util = require('util')
const fsReadFileP = util.promisify(fs.readFile)
const fsWriteFileP = util.promisify(fs.writeFile)

const readDB = async filePath => {
  console.log('readDB が呼ばれた')
  return JSON.parse(
    await fsReadFileP(filePath, 'utf-8').catch(err => {
      console.log('err = ', err)
      throw { err, place: getTrace(), errMsg: 'データの読み込みに失敗しました' }
    })
  )
}

const writeDB = async (filePath, data) => {
  console.log('writeDB が呼ばれた')
  return fsWriteFileP(filePath, JSON.stringify(data)).catch(err => {
    throw { err, place: getTrace(), errMsg: 'データベースの更新に失敗しました' }
  })
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

module.exports = { readDB, writeDB }
