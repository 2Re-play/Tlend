const { Transaction, getConnection } = require('../lib/dbConnection')
const mediaDao = require('../dao/mediaDao')
const rewardDao = require('../dao/rewardDao')
const supportDao = require('../dao/supportDao')
const cloudfront = require('../lib/cloudfront')

// media insert
exports.postMedia = async (req, next) => {
  try {
    await mediaDao.postMedia(Transaction, req, next)
  } catch (e) {
    console.log(e.message)
  }
}
// media get


exports.getMediaDetail = async (req) => {
  const connection = await getConnection()
  let info
  try {
    const media = await mediaDao.getMediaDetail(connection, req)
    media.detail_image = await cloudfront.video(media.detail_image)
    media.video_key = await cloudfront.video(media.video_key)

    const reward = await rewardDao.getReward(connection, media.idol_idx)
    const support = await supportDao.getSupport(connection, media.idol_idx)
    delete media.idol_idx
    const merge = reward.concat(support)
    const array = shuffle(merge)
    const itemList = array.slice(0, 3)

    for (const i in itemList) {
      itemList[i].image_key = await cloudfront.video(itemList[i].image_key)
    }

    info = {
      media,
      itemList,
    }
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  return info
}

// 배열 랜덤 정렬
function shuffle(array) {
  let currentIndex = array.length; let temporaryValue; let
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
