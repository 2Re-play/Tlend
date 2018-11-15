const response = require('../lib/response')
const homeService = require('../service/homeService')

exports.getHome = async (req, res, next) => {
  try {
    const result = await homeService.mainHome(req, next)
    response.respondJson('Successfully get main home', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
