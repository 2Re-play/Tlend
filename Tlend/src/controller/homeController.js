const response = require('../lib/response')
const homeService = require('../service/homeService')

exports.getHome = async (req, res, next) => {
  try {
    if (req.headers.user_idx) {
      const result = await homeService.mainHome(req, next)
      response.respondJson('Successfully get main home', result, res, 200)
    } else {
      response.respondOnError('The user_idx does not exist in the headers', res, 403)
    }

  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
