'use strict'

const path = require('path')
const databasePath = path.join(__dirname, '../../data/databases/baloontextdata.json')
const { readDB, writeDB } = require('./databaseHelper')

const divideText = text => {
  let newText = { top: '', middle: '', bottom: '' }
  for (const [k, v] of text.split('').entries()) {
    if (k <= 4) newText.top += v
    if (k >= 5 && k <= 9) newText.middle += v
    if (k >= 10) newText.bottom += v
  }
  return newText
}

const get = async () => {
  return await readDB(databasePath)
}

const add = async text => {
  const newText = divideText(text)
  const texts = await readDB(databasePath)
  texts.push(newText)
  await writeDB(databasePath, texts)
  return texts
}

const update = async (targetIndex, text) => {
  const newText = divideText(text)
  const texts = await readDB(databasePath)
  texts[targetIndex] = newText
  await writeDB(databasePath, texts)
  return texts
}

const remove = async ti => {
  const texts = await readDB(databasePath)
  texts.splice(ti, 1)
  await writeDB(databasePath, texts)
  return texts
}

module.exports = { get, add, update, remove }
