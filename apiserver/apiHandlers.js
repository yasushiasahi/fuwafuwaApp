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

const signIn = async request => {
  console.log('/api/SignInが呼ばれた')

  const { userName: reqUserName, password: reqPassword } = await parseReqBody(request)
  const users = await getDatabase(usersFilePath)
  for (const user of users) {
    if (user.userName === reqUserName) {
      throw { errMsg: `${reqUserName}は既に登録されています` }
    }
  }
  const password = getHash(reqPassword)
  const token = getToken(reqUserName)
  users.push({ userName: reqUserName, password, token })
  await writeFile(usersFilePath, users)
  return { userName: reqUserName, token }
}

const logIn = async request => {
  console.log('/api/LogInが呼ばれた')

  const { userName: reqUserName, password: reqPassword } = await parseReqBody(request)
  const users = await getDatabase(usersFilePath)
  const targetIndex = users.findIndex(user => user.userName === reqUserName)
  if (targetIndex === -1) throw { errMsg: `${reqUserName}は登録されていません` }
  if (users[targetIndex].password !== getHash(reqPassword)) {
    throw { errMsg: `${reqUserName}さんのパスワードと一致しません` }
  }
  const newToken = getToken(reqUserName)
  users[targetIndex].token = newToken
  await writeFile(usersFilePath, users)
  return { userName: reqUserName, token: newToken }
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
  signIn,
  logIn,
  checkToken,
  getGallery,
  uploadPicture,
  deletePicture,
  updatePicture
}
