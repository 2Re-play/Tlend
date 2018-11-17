// 검색 투자상품 정렬
exports.getSearchSupport = (connection, query) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT support_idx, support_title, user_nickname, support_finishDate, support_startDate, support_goalMoney, support_currentMoney FROM SUPPORT JOIN USER USING (user_idx) WHERE support_title LIKE '%${query}%'`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

// 검색 리워드 상품 정렬
exports.getSearchReward = (connection, query) => {
  return new Promise((resolve, reject) => {
    const Query = `    
    SELECT 
    reward_idx,
    reward_title,
    user_nickname,
    reward_finishDate,
    reward_startDate,
    reward_goalMoney,
    reward_currentMoney
FROM
    REWARD
        JOIN
    USER USING (user_idx)
WHERE
    reward_title LIKE '%${query}%'`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
// 투자상품 비디오 키
exports.supportImageKey = (connection, support_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT image_key FROM IMAGE WHERE support_idx =${support_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

// 리워드상품 비디오 키
exports.rewardImageKey = (connection, reward_idx) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT image_key FROM IMAGE WHERE reward_idx =${reward_idx}`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.getSearchIdol = (connection, query) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT DISTINCT idol_idx, idol_name, image_key FROM IDOL JOIN IMAGE USING(idol_idx) WHERE idol_name LIKE'%${query}%'`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
