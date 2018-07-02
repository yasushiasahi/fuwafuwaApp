'use strict'

const path = require('path')
const usersFilePath = path.join(__dirname, `../data/databases/userdata.json`)
const galleryFilePath = path.join(__dirname, '../data/databases/gallerydata.json')
const pictureDir = path.join(__dirname, '../data/databases/gallery/')
const {
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
} = require('./apiHelper.js')

const balloonTexts = require('./databases/balloonTexts')
const users = require('./databases/users')

const getCookie = (r, key) => {
  const regexp = new RegExp(`${key}=`)
  return r.headers.cookie
    .replace(/\s/g, '')
    .split(';')
    .find(obj => obj.startsWith(`${key}=`))
    .replace(regexp, '')
}

const makeSession = async request => {
  const c = request.headers.cookie
  if (!c) {
    throw { errMsg: null }
  }
  if (!(c.includes('userName') && c.includes('token'))) {
    throw { errMsg: null }
  }
  let regexp = new RegExp(`${'userName'}=`)
  const un = c
    .replace(/\s/g, '')
    .split(';')
    .find(obj => obj.startsWith(`${'userName'}=`))
    .replace(regexp, '')
  regexp = new RegExp(`${'token'}=`)
  const t = c
    .replace(/\s/g, '')
    .split(';')
    .find(obj => obj.startsWith(`${'token'}=`))
    .replace(regexp, '')
  const i = await users.findIndex(un)
  if (i === -1) {
    throw { errMsg: null }
  }
  const r = await users.check(i, { token: t })
  if (!r) {
    throw { errMsg: null }
  }
  return {}
}

const breakSession = async () => {
  return { cookies: ['userName=; max-age=0; path=/', 'token=; max-age=0; path=/'] }
}

const signUp = async request => {
  console.log('/api/SignUpが呼ばれた')

  const { un, pw } = await parseReqBody(request)
  const i = await users.findIndex(un)
  if (i !== -1) {
    throw { errMsg: `${un}は既に登録されています` }
  }
  const hpw = getHash(pw)
  const t = getToken(un)
  await users.add(un, hpw, t)
  return { cookies: [`userName=${un}; path=/`, `token=${t}; path=/`] }
}

const logIn = async request => {
  console.log('/api/LogInが呼ばれた')

  const { un, pw } = await parseReqBody(request)
  const i = await users.findIndex(un)
  if (i === -1) {
    throw { errMsg: `${un}は登録されていません` }
  }
  const hpw = getHash(pw)
  const r = await users.check(i, { password: hpw })
  if (!r) {
    throw { errMsg: `${un}のパスワードと一致しません` }
  }
  const t = getToken(un)
  await users.update(i, { token: t })
  return { cookies: [`userName=${un}; path=/`, `token=${t}; path=/`] }
}

const getBalloonTexts = async () => {
  console.log('/api/getBalloonTextsが呼ばれた')
  const texts = await balloonTexts.get()
  return { body: texts }
}

const addBalloonText = async request => {
  console.log('/api/addBalloonTextsが呼ばれた')

  const text = await parseReqBody(request)
  const texts = await balloonTexts.add(text)
  return { body: texts }
}

const removeBalloonText = async request => {
  console.log('/api/removeBalloonTextsが呼ばれた')

  const targetIndex = await parseReqBody(request)
  const texts = await balloonTexts.remove(targetIndex)
  return { body: texts }
}

const updateBalloonText = async request => {
  console.log('/api/updateBalloonTextsが呼ばれた')

  const { targetIndex, text } = await parseReqBody(request)
  const texts = await balloonTexts.update(targetIndex, text)
  return { body: texts }
}

const checkToken = async request => {
  console.log('/api/checkTokenが呼ばれた')

  const { userName: reqUserName, token: reqToken } = await parseReqBody(request)
  const users = await getDatabase(usersFilePath)
  const targetIndex = users.findIndex(user => user.userName === reqUserName)
  if (users[targetIndex].token !== reqToken) {
    throw { errMsg: `認証期限切れ。ログインし直してください` }
  }
  return null
}

const getGallery = async () => {
  console.log('/api/apiGetGalleryDataが呼ばれた')

  const gallery = await getDatabase(galleryFilePath)
  return gallery
}

const uploadPicture = async request => {
  console.log('/api/UploadPictureが呼ばれた')

  const {
    picture: { path: tmpFilePath, name: originalFileName },
    fields: { userName, title, description }
  } = await getFormData(request)
  const pictureName = `${getUniqueStr()}.${originalFileName.split('.').reverse()[0]}`
  await renameFile(tmpFilePath, `${pictureDir}${pictureName}`)
  let gallery = await getDatabase(galleryFilePath)
  gallery.push({ title, description, pictureName, userName })
  await writeFile(galleryFilePath, gallery)
  return gallery
}

const deletePicture = async request => {
  console.log('/api/deletePictureが呼ばれた')

  const { pictureName } = await parseReqBody(request)
  let { gallery, targetIndex } = await getGalleryDataAndFindTargetIndex(pictureName)
  await removePicture(gallery[targetIndex].pictureName)
  gallery.splice(targetIndex, 1)
  await writeFile(galleryFilePath, gallery)
  return gallery
}

const updatePicture = async request => {
  console.log('/api/updataPictureが呼ばれた')

  const {
    picture: { path: tmpFilePath, name: originalFileName },
    fields: { title, description, pictureName }
  } = await getFormData(request)
  let { gallery, targetIndex } = await getGalleryDataAndFindTargetIndex(pictureName)
  let newPictureName = pictureName
  if (tmpFilePath !== undefined) {
    await removePicture(pictureName)
    newPictureName = `${getUniqueStr()}${originalFileName.match(/(\.jpg|\.jpeg|\.png|\.gif)$/)[0]}`
    await renameFile(tmpFilePath, `${pictureDir}${newPictureName}`)
  }
  gallery.splice(targetIndex, 1, { title, description, pictureName: newPictureName })
  await writeFile(galleryFilePath, gallery)
  return gallery
}

module.exports = {
  makeSession,
  breakSession,
  signUp,
  logIn,
  checkToken,
  getGallery,
  uploadPicture,
  deletePicture,
  updatePicture,
  getBalloonTexts,
  addBalloonText,
  removeBalloonText,
  updateBalloonText
}
