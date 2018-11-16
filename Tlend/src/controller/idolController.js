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

exports.getSupportDetail = async (req, res, next) => {
  try {
    const { option } = req.query
    if (option === 'default') {
      const result = await idolService.getSupportDefault(req, next)
      response.respondJson('Successfully get idol support detail data (default tab)', result, res, 200)
    } else if (option === 'detail') {
      const result = await idolService.getSupportDetail(req, next)
      response.respondJson('Successfully get idol support detail data(detail tab)', result, res, 200)
    } else {
      response.respondOnError('404 NOT FOUND ERROR', res, 404)
    }
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.getRewardDetail = async (req, res, next) => {
  try {
    const { option } = req.query
    console.log('option', option)
    if (option === 'default') {
      const result = await idolService.getRewardDefault(req, next)
      response.respondJson('Successfully get idol reward detail data (default tab)', result, res, 200)
    } else if (option === 'detail') {
      const result = await idolService.getRewardDetail(req, next)
      response.respondJson('Successfully get idol reward detail data (default tab)', result, res, 200)
    } else {
      response.respondOnError('404 NOT FOUND ERROR', res, 404)
    }

  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

exports.getIdol = async (req, res) => {
  try {
    const result = await idolService.getIdol()
    response.respondJson('Successfully get idol group name', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
