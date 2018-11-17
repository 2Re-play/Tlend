const { getConnection } = require('../lib/dbConnection')
const { closingDate } = require('../lib/closingDate')
const { percent } = require('../lib/percent')
const searchDao = require('../dao/searchDao')
const cloudfront = require('../lib/cloudfront')


// 검색 키워드 - 투자
exports.getSearchSupport = async (query) => {
  const connection = await getConnection()
  let result
  try {
    const supportItemList = await searchDao.getSearchSupport(connection, query)
    for (const i in supportItemList) {
      const supportListKey = await searchDao.supportImageKey(connection, supportItemList[i].support_idx)
      supportItemList[i].image_key = await cloudfront.video(supportListKey.image_key)
      supportItemList[i].percent = Math.ceil(await percent(supportItemList[i].support_currentMoney, supportItemList[i].support_goalMoney))
      supportItemList[i].d_day = await closingDate(supportItemList[i].support_finishDate)
      delete supportItemList[i].support_currentMoney
      delete supportItemList[i].support_goalMoney
      delete supportItemList[i].support_startDate
      delete supportItemList[i].support_finishDate
    }
    result = {
      supportItemList,
    }
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  return result
}

// 검색 키워드 - 리워드
exports.getSearchReward = async (query) => {
  const connection = await getConnection()
  let result
  try {
    console.log('qeury', query)
    const rewardItemList = await searchDao.getSearchReward(connection, query)
    console.log(rewardItemList)
    for (const i in rewardItemList) {
      const rewardListKey = await searchDao.rewardImageKey(connection, rewardItemList[i].reward_idx)
      rewardItemList[i].image_key = await cloudfront.video(rewardListKey.image_key)
      rewardItemList[i].percent = Math.ceil(await percent(rewardItemList[i].reward_currentMoney, rewardItemList[i].reward_goalMoney))
      rewardItemList[i].d_day = await closingDate(rewardItemList[i].reward_finishDate)
      delete rewardItemList[i].reward_currentMoney
      delete rewardItemList[i].reward_goalMoney
      delete rewardItemList[i].reward_startDate
      delete rewardItemList[i].reward_finishDate
    }
    result = {
      rewardItemList,
    }
    console.log(result)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  console.log(result)
  return result
}

// idol name search
exports.getSearchIdol = async (query) => {
  const connection = await getConnection()
  let result
  try {
    const idolList = await searchDao.getSearchIdol(connection, query)
    console.log(idolList)
    for (const i in idolList) {
      idolList[i].image_key = await cloudfront.video(idolList[i].image_key)
    }
    result = {
      idolList,
    }
    console.log(result)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  console.log(result)
  return result
}
