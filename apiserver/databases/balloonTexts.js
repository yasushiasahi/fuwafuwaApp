'use strict'

const path = require('path')
const databasePath = path.join(__dirname, '../../data/databases/baloontextdata.json')
const { readDB, writeDB } = require('./databaseHelper')

const get = async () => {
  return await readDB(databasePath)
}

const add = async text => {
  console.log('balloonTexts.add が呼ばれた')

  let newText = { top: '', middle: '', bottom: '' }
  for (const [k, v] of text.split('').entries()) {
    if (k <= 4) newText.top += v
    if (k >= 5 && k <= 9) newText.middle += v
    if (k >= 10) newText.bottom += v
  }
  const texts = await readDB(databasePath)
  texts.push(newText)
  await writeDB(databasePath, texts)
  return texts
}

module.exports = { get, add }
