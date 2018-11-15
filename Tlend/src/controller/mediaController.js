const response = require('../lib/response')
const mediaService = require('../service/mediaService')

exports.postMedia = async (req, res, next) => {
  try {
    await mediaService.postMedia(req, next)
    response.respondJson2('Successfully insert media content', res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
