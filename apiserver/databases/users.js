'use strict'

const path = require('path')
const DBPath = path.join(__dirname, '../../data/databases/userdata.json')
const { readDB, writeDB } = require('./databaseHelper')

const findIndex = async rUN => {
  const us = await readDB(DBPath)
  const i = us.findIndex(u => u.userName === rUN)
  return i
}

const add = async (un, pw, t) => {
  const us = await readDB(DBPath)
  us.push({ userName: un, password: pw, token: t })
  await writeDB(DBPath, us)
  return
}

const check = async (i, o) => {
  const us = await readDB(DBPath)
  const result = Object.entries(o).map(([k, v]) => us[i][k] === v)
  return result[0]
}

const update = async (targetIndex, obj) => {
  const users = await readDB(DBPath)
  for (const key in obj) {
    users[targetIndex][key] = obj[key]
  }
  await writeDB(DBPath, users)
  return
}

module.exports = { findIndex, add, check, update }
