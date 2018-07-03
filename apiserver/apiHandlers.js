'use strict'

const { getFormData, parseReqBody, getHash, getToken, checkCookie } = require('./apiHelper.js')
const balloonTexts = require('./databases/balloonTexts')
const users = require('./databases/users')
const gallery = require('./databases/gallery')

const makeSession = async request => {
  if (!(await checkCookie(request, users))) {
    throw { errMsg: null }
  }
  return {}
}

const breakSession = async () => {
  return { cookies: ['userName=; max-age=0; path=/', 'token=; max-age=0; path=/'] }
}

const signUp = async request => {
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
  const texts = await balloonTexts.get()
  return { body: texts }
}

const addBalloonText = async request => {
  if (!(await checkCookie(request, users))) {
    throw { errMsg: '認証に失敗しましたログインし直して下さい' }
  }
  const text = await parseReqBody(request)
  const texts = await balloonTexts.add(text)
  return { body: texts }
}

const updateBalloonText = async request => {
  if (!(await checkCookie(request, users))) {
    throw { errMsg: '認証に失敗しましたログインし直して下さい' }
  }
  const { targetIndex, text } = await parseReqBody(request)
  const texts = await balloonTexts.update(targetIndex, text)
  return { body: texts }
}

const removeBalloonText = async request => {
  if (!(await checkCookie(request, users))) {
    throw { errMsg: '認証に失敗しましたログインし直して下さい' }
  }
  const targetIndex = await parseReqBody(request)
  const texts = await balloonTexts.remove(targetIndex)
  return { body: texts }
}

const getGallery = async () => {
  const gls = await gallery.get()
  return { body: gls }
}

const uploadPicture = async request => {
  if (!(await checkCookie(request, users))) {
    throw { errMsg: '認証に失敗しましたログインし直して下さい' }
  }
  const {
    files: {
      pic: { path, name }
    },
    fields: { ti, des }
  } = await getFormData(request)
  const pn = `${path.slice(-32)}.${name.split('.').reverse()[0]}`
  const gls = await gallery.add(path, pn, ti, des)
  return { body: gls }
}

const updatePicture = async request => {
  if (!(await checkCookie(request, users))) {
    throw { errMsg: '認証に失敗しましたログインし直して下さい' }
  }
  const {
    files: { pic = { path: '', name: '' } },
    fields: { ti, des, pn }
  } = await getFormData(request)
  const { path, name } = pic
  const npn = path && `${path.slice(-32)}.${name.split('.').reverse()[0]}`
  const i = await gallery.findIndex(pn)
  const gls = await gallery.update(path, pn, npn, ti, des, i)
  return { body: gls }
}

const deletePicture = async request => {
  if (!(await checkCookie(request, users))) {
    throw { errMsg: '認証に失敗しましたログインし直して下さい' }
  }
  const { tpn } = await parseReqBody(request)
  const i = await gallery.findIndex(tpn)
  const gls = await gallery.remove(i, tpn)
  return { body: gls }
}

module.exports = {
  makeSession,
  breakSession,
  signUp,
  logIn,
  getGallery,
  uploadPicture,
  deletePicture,
  updatePicture,
  getBalloonTexts,
  addBalloonText,
  removeBalloonText,
  updateBalloonText
}
