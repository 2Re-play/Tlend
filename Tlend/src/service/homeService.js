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

    const idol_name = await homeDao.idxToName(Transaction, itemRanking, next)
    for (const i in idol_name) {
      idol_name[i].idol_idx = itemRanking[i]
    }
    const media = await homeDao.getMedia(connection, req)
    for (const i in media) {
      media[i].image_key = await cloudfront.video(media[i].image_key)
    }
    info = {
      mybaby,
      idol_name,
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
