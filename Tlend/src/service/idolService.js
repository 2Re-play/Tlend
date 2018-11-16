const { Transaction, getConnection } = require('../lib/dbConnection')
const idolDao = require('../dao/idolDao')
const cloudfront = require('../lib/cloudfront')
const { closingDate } = require('../lib/closingDate')
const { percent } = require('../lib/percent')


// 특정 아이돌 입력하기
exports.postIdol = async (req, next) => {
  try {
    await idolDao.postIdol(Transaction, req, next)
  } catch (e) {
    console.log(e.message)
  }
}
// 특정아이돌 멤버(이름, 이미지)들 가져오기
exports.postMember = async (req, next) => {
  try {
    await idolDao.postMemebr(Transaction, req, next)
  } catch (e) {
    console.log(e.message)
  }
}
// 특정아이돌 홈 가져오기
exports.getHome = async (req, next) => {
  const connection = await getConnection()
  let result
  try {
    const idol_group = await idolDao.getHome(Transaction, req, next)
    const reward = await idolDao.getReward(connection, req)
    const support = await idolDao.getSupport(connection, req)
    idol_group[0].group_titleImg = await cloudfront.video(idol_group[0].group_titleImg)
    for (const i in idol_group[1]) {
      console.log(idol_group[1])
      idol_group[1][i].member_imgKey = await cloudfront.video(idol_group[1][i].member_imgKey)
    }

    for (const i in reward) {
      reward[i].image_key = await cloudfront.video(reward[i].image_key)
    }
    for (const i in support) {
      support[i].image_key = await cloudfront.video(support[i].image_key)
    }
    const merge = reward.concat(support)
    const arr_slice = shuffle(merge)
    const item = arr_slice.slice(0, 6)
    console.log('8888888', item)
    result = {
      idol_group,
      arr_slice,
    }
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  return result
}

// 특정 아이돌 리워드 정보 가져오기
exports.getReward = async (req) => {
  const connection = await getConnection()
  let result
  try {
    const idol_group = await idolDao.getTop(connection, req)
    const reward = await idolDao.getReward(connection, req)
    idol_group[0].group_titleImg = await cloudfront.video(idol_group[0].group_titleImg)
    for (const i in reward) {
      reward[i].image_key = await cloudfront.video(reward[i].image_key)
      reward[i].D_day = await closingDate(reward[i].reward_finishDate)
      reward[i].percent = Math.ceil(await percent(reward[i].reward_currentMoney, reward[i].reward_goalMoney))
      delete reward[i].reward_currentMoney
      delete reward[i].reward_goalMoney
      delete reward[i].reward_finishDate
    }
    result = {
      idol_group,
      reward,
    }
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  return result
}

// 특정 아이돌 서포트 정보 가져오기
exports.getSupport = async (req) => {
  const connection = await getConnection()
  let result
  try {
    const idol_group = await idolDao.getTop(connection, req)
    const support = await idolDao.getSupport(connection, req)
    idol_group[0].group_titleImg = await cloudfront.video(idol_group[0].group_titleImg)
    for (const i in support) {
      support[i].image_key = await cloudfront.video(support[i].image_key)
      support[i].D_day = await closingDate(support[i].support_finishDate)
      support[i].percent = Math.ceil(await percent(support[i].support_currentMoney, support[i].support_goalMoney))
      delete support[i].support_currentMoney
      delete support[i].support_goalMoney
      delete support[i].support_finishDate
    }
    result = {
      idol_group,
      support,
    }
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  return result
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
