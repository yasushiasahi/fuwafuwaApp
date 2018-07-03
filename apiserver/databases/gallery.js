'use strict'

const path = require('path')
const DBPath = path.join(__dirname, '../../data/databases/gallerydata.json')
const picDirPath = path.join(__dirname, '../../data/databases/gallery')
const { readDB, writeDB, renameFile, removeFile } = require('./databaseHelper')

const get = async () => {
  const gls = await readDB(DBPath)
  return gls
}

const add = async (op, pn, ti, des) => {
  const rsvs = await Promise.all([readDB(DBPath), renameFile(op, `${picDirPath}/${pn}`)])
  let gls = rsvs[0]
  gls.push({ title: ti, description: des, pictureName: pn })
  await writeDB(DBPath, gls)
  return gls
}

const findIndex = async pn => {
  const gls = await readDB(DBPath)
  const i = gls.findIndex(gl => gl.pictureName === pn)
  return i
}

const update = async (path, pn, npn, ti, des, i) => {
  const gls = await readDB(DBPath)
  if (path !== '') {
    await Promise.all([removeFile(`${picDirPath}/${pn}`)], renameFile(path, `${picDirPath}/${npn}`))
    gls[i].pictureName = npn
  }
  gls[i].title = ti
  gls[i].description = des
  await writeDB(DBPath, gls)
  return gls
}

const remove = async (i, pn) => {
  const rsvs = await Promise.all([readDB(DBPath), removeFile(`${picDirPath}/${pn}`)])
  const gls = rsvs[0]
  gls.splice(i, 1)
  await writeDB(DBPath, gls)
  return gls
}

module.exports = { get, add, findIndex, remove, update }
