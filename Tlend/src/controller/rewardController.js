const Joi = require('joi')
const response = require('../lib/response')
const rewardService = require('../service/rewardService')

exports.postReward = async (req, res, next) => {
  const {
    user_idx, idol_idx, reward_title, reward_description, reward_startDate, reward_finishDate, reward_goalMoney, reward_shipping, reward_schedule,
  } = req.body
  const sheme = {
    user_idx: Joi.number().required(),
    idol_idx: Joi.number().required(),
    reward_title: Joi.string().required(),
    reward_description: Joi.string().required(),
    reward_startDate: Joi.string().required(),
    reward_finishDate: Joi.string().required(),
    reward_goalMoney: Joi.number().required(),
    reward_shipping: Joi.number().required(),
    reward_schedule: Joi.string().required(),
  }
  const validation_data = {
    user_idx,
    idol_idx,
    reward_title,
    reward_description,
    reward_startDate,
    reward_finishDate,
    reward_goalMoney,
    reward_shipping,
    reward_schedule,
  }
  console.log('배열:', req.body.item)
  const validation = Joi.validate(validation_data, sheme)
  if (validation.error) {
    throw new Error(403)
  }
  try {
    await rewardService.postReward(req, next)
    response.respondJson2('Successfully insert reward item', res, 200)
  } catch (e) {
    if (e.message === '403') {
      response.respondOnError('형식이 맞지 않습니다.', res, 403)
    } else {
      response.respondOnError('서버 내부 에러', res, 500)
    }
  }
}

exports.postRewardFund = async (req, res, next) => {
  try {
    await rewardService.postRewardFund(req, next)
    response.respondJson2('Successfully post reward fund', res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
