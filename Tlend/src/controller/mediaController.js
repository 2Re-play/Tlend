const response = require('../lib/response')
const mediaService = require('../service/mediaService')

// 미디어 기사 포스타하기 (관리자)
exports.postMedia = async (req, res, next) => {
  try {
    await mediaService.postMedia(req, next)
    response.respondJson2('Successfully insert media content', res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}

// 미디어 기사 디테일 보기
exports.getMedia = async (req, res, next) => {
  try {
    const result = await mediaService.getMediaDetail(req, next)
    response.respondJson('Successfully get media detail content', result, res, 200)
  } catch (e) {
    console.log(e)
    response.respondOnError(e.message, res, 500)
  }
}
