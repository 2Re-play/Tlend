const response = require('../lib/response')
const idolService = require('../service/idolService')

exports.postIdol = async (req, res, next) => {
  try {
    await idolService.postIdol(req, next)
    response.respondJson2('Successfully insert idol data', res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.postMember = async (req, res, next) => {
  try {
    await idolService.postMember(req, next)
    response.respondJson2('Successfully insert member data', res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.home = async (req, res, next) => {
  try {
    const result = await idolService.getHome(req, next)
    response.respondJson('Successfully get idol group home data', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.getReward = async (req, res, next) => {
  try {
    const result = await idolService.getReward(req, next)
    response.respondJson('Successfully get idol reward data', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.getSupport = async (req, res, next) => {
  try {
    const result = await idolService.getSupport(req, next)
    response.respondJson('Successfully get idol support data', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
