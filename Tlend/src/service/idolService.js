const { Transaction, getConnection } = require('../lib/dbConnection')
const idolDao = require('../dao/idolDao')
const homeDao = require('../dao/homeDao')
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
    // media 콘텐츠 추가하기
    const arr_slice = await homeDao.getIdolMedia(connection, req)
    for (const i in arr_slice) {
      arr_slice[i].image_key = await cloudfront.video(arr_slice[i].image_key)
    }
    const media = arr_slice.slice(0, 6)
    idol_group[0].group_titleImg = await cloudfront.video(idol_group[0].group_titleImg)
    for (const i in idol_group[1]) {
      console.log(idol_group[1])
      idol_group[1][i].member_imgKey = await cloudfront.video(idol_group[1][i].member_imgKey)
    }

    result = {
      idol_group,
      media,
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
    idol_group[0].bannerImage = await cloudfront.video(idol_group[0].image_key)
    for (const i in reward) {
      reward[i].image_key = await cloudfront.video(reward[i].image_key)
      reward[i].D_day = await closingDate(reward[i].reward_finishDate)
      reward[i].percent = Math.ceil(await percent(reward[i].reward_currentMoney, reward[i].reward_goalMoney))
      delete reward[i].reward_finishDate
      delete reward[i].reward_currentMoney
      delete reward[i].reward_goalMoney
    }
    const banner = idol_group[0]
    result = {
      banner,
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

// 특정 아이돌 서포트 정보 가져오기 (기본정보 탭)
exports.getSupportDefault = async (req, next) => {
  // const connection = await getConnection()
  let result
  try {
    const support = await idolDao.getSupportDefault(Transaction, req, next)

    const item_option = ''
    let data3 = ''
    for (const i in support[1]) {
      data3 += item_option.concat(support[1][i].item_title, ',')
    }

    const item_prices = support[1]
    const max = item_prices[0].item_price
    let flag = 0
    for (let i = 1; i < item_prices.length; i++) {
      if (max < item_prices[i]) {
        flag = i
      }
    }
    const lowPrice = item_prices[flag]
    for (const i in support[0]) {
      support[0][i].image_key = await cloudfront.video(support[0][i].image_key)
    }
    support[2][0].D_day = await closingDate(support[2][0].support_finishDate)
    support[2][0].percent = Math.ceil(await percent(support[2][0].support_currentMoney, support[2][0].support_goalMoney))
    support[2][0].option_name = data3.substring(0, data3.length - 1)
    support[2][0].lowPrice = lowPrice.item_price

    const item_detail = support[2]
    const item_images = support[0]

    result = {
      item_images,
      item_detail,
    }
  } catch (e) {
    console.log(e.message)
  } finally {
    // connection.release()
  }
  return result
}

// 특정 아이돌 서포트 정보 가져오기 (상세정보탭)
exports.getSupportDetail = async (req, next) => {
  // const connection = await getConnection()
  let result
  try {
    const support = await idolDao.getSupportDetail(Transaction, req, next)
    console.log(support)
    const item_prices = support[1]
    const max = item_prices[0].item_price
    let flag = 0
    for (let i = 1; i < item_prices.length; i++) {
      if (max < item_prices[i]) {
        flag = i
      }
    }
    const lowPrice = item_prices[flag]
    for (const i in support[0]) {
      support[0][i].image_key = await cloudfront.video(support[0][i].image_key)
    }
    support[3][0].image_key = await cloudfront.video(support[3][0].image_key)
    support[2][0].D_day = await closingDate(support[2][0].support_finishDate)
    support[2][0].percent = Math.ceil(await percent(support[2][0].support_currentMoney, support[2][0].support_goalMoney))
    support[2][0].lowPrice = lowPrice.item_price
    delete support[2][0].support_finishDate
    delete support[2][0].support_goalMoney

    const item_detail = support[2][0]
    const item_images = support[0]
    const detail_image = support[3][0].image_key

    result = {
      item_images,
      item_detail,
      detail_image,
    }
  } catch (e) {
    console.log(e.message)
  } finally {
    // connection.release()
  }
  return result
}

// 특정 아이돌 리워드 정보 가져오기 (기본정보탭)
exports.getRewardDefault = async (req, next) => {
  // const connection = await getConnection()
  let result
  try {
    const reward = await idolDao.getRewardDefault(Transaction, req, next)

    const item_option = ''
    let data3 = ''
    for (const i in reward[1]) {
      data3 += item_option.concat(reward[1][i].item_title, ',')
    }

    const item_prices = reward[1]
    const max = item_prices[0].item_price
    let flag = 0
    for (let i = 1; i < item_prices.length; i++) {
      if (max < item_prices[i]) {
        flag = i
      }
    }
    const lowPrice = item_prices[flag]
    for (const i in reward[0]) {
      reward[0][i].image_key = await cloudfront.video(reward[0][i].image_key)
    }
    reward[2][0].D_day = await closingDate(reward[2][0].reward_finishDate)
    reward[2][0].percent = Math.ceil(await percent(reward[2][0].reward_currentMoney, reward[2][0].reward_goalMoney))
    reward[2][0].option_name = data3.substring(0, data3.length - 1)
    reward[2][0].lowPrice = lowPrice.item_price

    const item_detail = reward[2][0]
    const item_images = reward[0]

    result = {
      item_images,
      item_detail,
    }
  } catch (e) {
    console.log(e.message)
  } finally {
    // connection.release()
  }
  return result
}

// 특정 아이돌 리워드 정보 가져오기 (상세정보탭)
exports.getRewardDetail = async (req, next) => {
  // const connection = await getConnection()
  let result
  try {
    const reward = await idolDao.getRewardDetail(Transaction, req, next)
    console.log(reward)

    const item_prices = reward[1]
    const max = item_prices[0].item_price
    let flag = 0
    for (let i = 1; i < item_prices.length; i++) {
      if (max < item_prices[i]) {
        flag = i
      }
    }
    const lowPrice = item_prices[flag]
    for (const i in reward[0]) {
      reward[0][i].image_key = await cloudfront.video(reward[0][i].image_key)
    }
    reward[3][0].image_key = await cloudfront.video(reward[3][0].image_key)
    reward[2][0].D_day = await closingDate(reward[2][0].reward_finishDate)
    reward[2][0].percent = Math.ceil(await percent(reward[2][0].reward_currentMoney, reward[2][0].reward_goalMoney))
    reward[2][0].lowPrice = lowPrice.item_price
    delete reward[2][0].reward_finishDate
    delete reward[2][0].reward_goalMoney

    const item_detail = reward[2][0]
    const item_images = reward[0]
    const detail_image = reward[3][0].image_key


    result = {
      item_images,
      item_detail,
      detail_image,
    }
  } catch (e) {
    console.log(e.message)
  } finally {
    // connection.release()
  }
  return result
}
// 아이돌 그룹이름 리스트 가져오기

exports.getIdol = async () => {
  const connection = await getConnection()
  let result
  try {
    const idol = await idolDao.getIdol(connection)
    for (const i in idol) {
      idol[i].image_key = await cloudfront.video(idol[i].image_key)
    }
    result = {
      idol,
    }
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
  return result
}


