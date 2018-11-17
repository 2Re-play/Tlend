const { Transaction, getConnection } = require('../lib/dbConnection')
const homeDao = require('../dao/homeDao')
const cloudfront = require('../lib/cloudfront')

// 메인 홈 가져오기
exports.mainHome = async (req, next) => {
  const connection = await getConnection()
  let info
  try {
    const mybaby = await homeDao.myBaby(Transaction, req, next)
    const ranking = await homeDao.ranking(connection)
    for (const i in ranking) {
      const total = ranking[i].reward_currentMoney + ranking[i].support_currentMoney
      ranking[i].reward_currentMoney = total
    }
    const sortingField = 'reward_currentMoney'

    ranking.sort((a, b) => { // 오름차순
      return b[sortingField] - a[sortingField]
    })
    const itemRanking = []
    for (const i in ranking) {
      itemRanking.push(ranking[i].a_idol)
    }

    const idol_rank = await homeDao.idxToName(Transaction, itemRanking, next)
    const media = await homeDao.getMedia(connection, req)
    for (const i in media) {
      console.log(i)
      console.log('123123123213', media)
      media[i].video_key = await cloudfront.video(media[i].video_key)
    }
    info = {
      mybaby,
      idol_rank,
      media,
    }
    console.log(info)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  return info
}
