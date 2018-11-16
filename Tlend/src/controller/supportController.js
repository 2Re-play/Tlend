const Joi = require('joi')
const response = require('../lib/response')
const supportService = require('../service/supportService')

exports.postSupport = async (req, res, next) => {
  const {
    user_idx, idol_idx, support_title, support_description, support_startDate, support_finishDate, support_goalMoney, support_schedule,
  } = req.body
  const sheme = {
    user_idx: Joi.number().required(),
    idol_idx: Joi.number().required(),
    support_title: Joi.string().required(),
    support_description: Joi.string().required(),
    support_startDate: Joi.string().required(),
    support_finishDate: Joi.string().required(),
    support_goalMoney: Joi.number().required(),
    support_schedule: Joi.string().required(),
  }
  const validation_data = {
    user_idx,
    idol_idx,
    support_title,
    support_description,
    support_startDate,
    support_finishDate,
    support_goalMoney,
    support_schedule,
  }
  console.log(validation_data)
  const validation = Joi.validate(validation_data, sheme)
  if (validation.error) {
    throw new Error(403)
  }
  try {
    await supportService.postSupport(req, next)
    response.respondJson2('Successfully insert support item', res, 200)
  } catch (e) {
    if (e.message === '403') {
      response.respondOnError('형식이 맞지 않습니다.', res, 403)
    } else {
      response.respondOnError('서버 내부 에러', res, 500)
    }
  }
}

exports.postSupportFund = async (req, res, next) => {
  try {
    await supportService.postSupportFund(req, next)
    response.respondJson2('Successfully post support fund', res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
