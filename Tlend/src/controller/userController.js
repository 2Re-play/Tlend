const Joi = require('joi')
const response = require('../lib/response')
const userService = require('../service/userService')

exports.signUp = async (req, res, next) => {
  const {
    id, pw, nickname,
  } = req.body
  const sheme = {
    id: Joi.string().required(),
    pw: Joi.string().required(),
    nickname: Joi.string().required(),
  }
  const validation_data = {
    id,
    pw,
    nickname,
  }
  const validation = Joi.validate(validation_data, sheme)
  if (validation.error) {
    throw new Error(403)
  }
  try {
    const result = await userService.signup(req, next)
    response.respondJson('Successfully sign up', result, res, 200)
  } catch (e) {
    if (e.message === '403') {
      response.respondOnError('형식이 맞지 않습니다.', res, 403)
    } else {
      response.respondOnError('서버 내부 에러', res, 500)
    }
  }
}

exports.selectIdol = async (req, res, next) => {

  try {
    if (req.headers.user_idx) {
      await userService.selectIdol(req, next)
      response.respondJson2('Successfully select my baby idol', res, 200)
    } else {
      response.respondOnError('The user_idx does not exist in the headers', res, 403)
    }
  } catch (e) {
    if (e.message === '403') {
      response.respondOnError('형식이 맞지 않습니다.', res, 403)
    } else {
      response.respondOnError('서버 내부 에러', res, 500)
    }
  }
}

exports.signIn = async (req, res) => {
  const {
    id, pw,
  } = req.body
  const sheme = {
    id: Joi.string().required(),
    pw: Joi.string().required(),
  }
  const validation_data = {
    id,
    pw,
  }
  const validation = Joi.validate(validation_data, sheme)
  if (validation.error) {
    throw new Error(403)
  }
  try {
    const signIn = await userService.signIn(req)
    if (!signIn) {
      response.respondJson2('id, pw가 맞지않습니다', res, 401)
    } else {
      response.respondJson('Successfully sign in', signIn, res, 200)
    }
  } catch (e) {
    if (e.message === '403') {
      response.respondOnError('형식이 맞지 않습니다.', res, 403)
    } else {
      response.respondOnError('서버 내부 에러', res, 500)
    }
  }
}

exports.confirmId = async (req, res) => {
  const {
    id,
  } = req.body
  const sheme = {
    id: Joi.string().required(),
  }
  const validation_data = {
    id,
  }
  const validation = Joi.validate(validation_data, sheme)
  if (validation.error) {
    throw new Error(403)
  }
  try {
    const confirmId = await userService.confirmId(req)
    if (!confirmId) {
      response.respondJson2('사용가능한 id입니다', res, 200)
    } else {
      response.respondJson2('이미 사용중인 id입니다.', res, 401)
    }
  } catch (e) {
    if (e.message === '403') {
      response.respondOnError('id값 넣어주세요.', res, 403)
    } else {
      response.respondOnError('서버 내부 에러', res, 500)
    }
  }
}

exports.confirmPw = async (req, res) => {
  const {
    nickname,
  } = req.body
  const sheme = {
    nickname: Joi.string().required(),
  }
  const validation_data = {
    nickname,
  }
  const validation = Joi.validate(validation_data, sheme)
  if (validation.error) {
    throw new Error(403)
  }
  try {
    const confirmId = await userService.confirmPw(req)
    if (!confirmId) {
      response.respondJson2('사용가능한 nickname입니다', res, 200)
    } else {
      response.respondJson2('이미 사용중인 nickname입니다.', res, 401)
    }
  } catch (e) {
    if (e.message === '403') {
      response.respondOnError('not exist value', res, 403)
    } else {
      response.respondOnError('서버 내부 에러', res, 500)
    }
  }
}
