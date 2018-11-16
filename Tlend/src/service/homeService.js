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
    console.log(ranking[0].reward_currentMoney + ranking[0].support_currentMoney)
    for (const i in ranking) {
      const total = ranking[i].reward_currentMoney + ranking[i].support_currentMoney
      ranking[i].reward_currentMoney = total
    }
    const sortingField = 'reward_currentMoney'

    ranking.sort((a, b) => { // 오름차순
      return b[sortingField] - a[sortingField]
    })
    console.log('123123', ranking)
    const first_idol = ranking[0].a_idol
    const second_idol = ranking[1].a_idol
    const third_idol = ranking[2].a_idol
    const itemRanking = {
      first: first_idol,
      second: second_idol,
      third: third_idol,
    }
    const idol_rank = await homeDao.idxToName(Transaction, itemRanking, next)
    const media = await homeDao.getMedia(connection)
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
