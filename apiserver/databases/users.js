'use strict'

const path = require('path')
const DBPath = path.join(__dirname, '../../data/databases/userdata.json')
const { readDB, writeDB } = require('./databaseHelper')

const findIndex = async rUN => {
  console.log('users.get が呼ばれた')

  const us = await readDB(DBPath)
  const i = us.findIndex(u => u.userName === rUN)
  return i
}

const add = async (un, pw, t) => {
  console.log('users.add が呼ばれた')

  const us = await readDB(DBPath)
  us.push({ userName: un, password: pw, token: t })
  await writeDB(DBPath, us)
  return
}

const check = async (i, o) => {
  console.log('users.check が呼ばれた')

  const us = await readDB(DBPath)
  const result = Object.entries(o).map(([k, v]) => us[i][k] === v)
  return result[0]
}

const update = async (targetIndex, obj) => {
  console.log('users.remove が呼ばれた')

  const users = await readDB(DBPath)
  for (const key in obj) {
    users[targetIndex][key] = obj[key]
  }
  await writeDB(DBPath, users)
  return
}

const remove = async ti => {
  console.log('users.remove が呼ばれた')

  const texts = await readDB(DBPath)
  texts.splice(ti, 1)
  await writeDB(DBPath, texts)
  return texts
}

module.exports = { findIndex, add, check, update, remove }
